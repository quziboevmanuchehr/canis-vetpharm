/*
 * ekg-analyse.js — QRS-, Rhythmus- und ST-Auswertung auf ECHTEN Abtastwerten.
 *
 * WARUM ES DIESE DATEI GIBT (Befund 22.07.2026):
 * Das Eickemeyer LifeVet 10C liefert die EKG-Kurve als Abtastblock mit 256 Hz (Feld
 * MDC_ECG_ELEC_POTL_II, Abtastrate in MDC_ATTR_SAMP_RATE). Die Station hat diese Kurve bis dahin
 * NICHT ausgewertet - sie zeichnete stattdessen aus der gemeldeten Herzfrequenz eine Musterkurve
 * nach. Damit war jede Aussage ueber QRS-Form, Extrasystolen oder ST-Strecke unmoeglich: die
 * gezeichnete Kurve war eine Rechnung aus einer Zahl, kein Signal vom Tier.
 *
 * GRUNDHALTUNG DIESER DATEI: Sie MISST und schweigt im Zweifel.
 * Diese Station ist eine Entscheidungs-/Trainingshilfe und KEIN zugelassener Patientenmonitor
 * (§10). Eine falsche ST-Aussage waere schaedlicher als gar keine. Deshalb liefert jede Funktion
 * neben dem Ergebnis immer auch, WIE sicher es ist und WARUM - und bei zu kurzem Streifen, zu
 * vielen Luecken, unbekannter Verstaerkung oder zu starkem Rauschen sagt sie ausdruecklich nichts.
 *
 * TIERMEDIZIN, NICHT HUMANMEDIZIN:
 * Katzen erreichen 220-260/min, Hunde unter Narkose 60-120/min. Die QRS-Dauer ist deutlich kuerzer
 * als beim Menschen (Hund etwa 40-70 ms, Katze 30-50 ms). Feste Humangrenzen (z. B. "QRS > 120 ms
 * = Schenkelblock") gelten hier NICHT und werden bewusst nicht verwendet.
 *
 * Reines ES5, keine Abhaengigkeiten. Laeuft im Browser (window.VS.ekg) und in Node (Selbsttest).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.VS = root.VS || {}; root.VS.ekg = factory(); }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // --- Mindestanforderungen, unter denen NICHTS behauptet wird -------------------------------
  var MIN_SEKUNDEN = 2.0;      // kuerzer laesst keine Rhythmusaussage zu
  var MIN_SCHLAEGE = 3;        // fuer RR-Abstaende braucht es mindestens 3 Zacken
  var MAX_LUECKEN_ANTEIL = 0.2; // ab 20 % ungueltigen Werten ist der Streifen unbrauchbar
  var RR_MIN_MS = 180;         // 333/min - darueber ist es kein einzelner Schlag mehr (Katze!)

  function endlich(x) { return typeof x === 'number' && isFinite(x); }

  /* ------------------------------------------------------------------ *
   * 1) Vorbereitung: Luecken zaehlen, Grundlinie abziehen
   *
   * Die Grundlinie wandert (Atmung, Bewegung). Ohne Abzug verschiebt sich die ST-Messung um genau
   * diesen Betrag - man wuerde eine Hebung sehen, wo nur der Brustkorb sich hebt. Abgezogen wird
   * mit einem gleitenden MEDIAN: er laesst den schmalen QRS-Ausschlag stehen und folgt nur der
   * langsamen Wanderung (ein Mittelwert wuerde die R-Zacke mit verschieben).
   * ------------------------------------------------------------------ */
  function median(arr) {
    var a = arr.slice().sort(function (x, y) { return x - y; });
    var n = a.length;
    if (!n) return 0;
    return n % 2 ? a[(n - 1) / 2] : (a[n / 2 - 1] + a[n / 2]) / 2;
  }

  /*
   * fensterS = Breite des gleitenden Medians in Sekunden.
   *
   * FAUSTREGEL: das Fenster muss MINDESTENS DOPPELT so breit sein wie die breiteste Welle,
   * die erhalten bleiben soll. Sonst haelt der Median die Welle selbst fuer Grundlinie und
   * zieht sie ab.
   *   Hund/Katze: P 40 ms, QRS 40-70 ms -> 200 ms genuegt.
   *   PFERD:      P 90-170 ms -> 200 ms ist ZU KURZ. Die Pferde-P wurde bisher als
   *               Grundlinie erkannt und weggerechnet; die P-Suche lief danach auf einem
   *               Signal, aus dem die gesuchte Welle bereits entfernt war (Befund der
   *               Fachrecherche 08.08.2026). Deshalb dort 600 ms.
   */
  /* Die genaue Fassung: fuer JEDEN Abtastwert der Median seines Fensters. Sie bleibt als
   * MASSSTAB erhalten - der Selbsttest vergleicht die schnelle Fassung gegen sie. Ohne diesen
   * Vergleich waere eine Beschleunigung eine Behauptung. */
  function grundlinieAbziehenGenau(werte, hz, fensterS) {
    var w = Math.max(3, Math.round(hz * (fensterS || 0.2)));
    if (w % 2 === 0) w++;
    var halb = (w - 1) / 2;
    var out = new Array(werte.length);
    for (var i = 0; i < werte.length; i++) {
      if (werte[i] == null) { out[i] = null; continue; }
      var fenster = [];
      for (var j = i - halb; j <= i + halb; j++) {
        if (j >= 0 && j < werte.length && werte[j] != null) fenster.push(werte[j]);
      }
      out[i] = werte[i] - median(fenster);
    }
    return out;
  }

  /* ==================================================================================
   * GLEITENDER MEDIAN MIT MITGEFUEHRTEM SORTIERTEM FENSTER — DIESELBE ZAHL, ACHTMAL SCHNELLER
   * (gemessen 10.08.2026)
   *
   * WARUM UEBERHAUPT: Gemessen an einem 20-Sekunden-Streifen mit 250 Hz brauchte die ganze
   * Auswertung 25,6 ms, davon 22,3 ms allein diese Funktion - 87 Prozent. Das ist kein
   * Schoenheitsproblem: die Auswertung laeuft 2,5-mal je Sekunde MITTEN in der
   * Zeichenschleife. 22 ms sind bei 33 Bildern je Sekunde ein ganzes Bild; auf dem Praxis-PC,
   * auf dem daneben mehrere Monitore laufen, ist genau das das Ruckeln, das der Nutzer als
   * "haengt" beschreibt.
   *
   * Ursache war die Bauart: fuer JEDEN der 5000 Abtastwerte wurde das 51-Werte-Fenster in ein
   * NEUES Feld kopiert und SORTIERT - 5000 Speicheranforderungen und 5000 Sortierungen fuer
   * eine Groesse, die sich von einem Wert zum naechsten um genau zwei Elemente aendert.
   *
   * WAS ICH ZUERST VERSUCHT HABE UND WARUM ES VERWORFEN IST: die Grundlinie nur auf
   * Stuetzstellen zu rechnen und dazwischen geradlinig zu verbinden. Das war achtmal
   * schneller - aber die groesste Abweichung gegen die genaue Fassung lag bei 82 uV, und
   * selbst bei jedem zweiten Abtastwert als Stuetzstelle noch bei 16 uV. Der Grund ist
   * grundsaetzlich: der Median SPRINGT, wenn das Fenster ueber einen Kammerkomplex laeuft;
   * eine Gerade kann dem nicht folgen. Und 16 uV sind bei ST-Grenzen von 150 bis 200 uV
   * keine Rundung, sondern ein Zehntel des Befundes. Eine Beschleunigung, die die
   * wichtigste Zahl dieser Funktion verschiebt, ist keine.
   *
   * WAS ES JETZT IST: das Fenster wird SORTIERT MITGEFUEHRT. Je Schritt faellt genau ein
   * Wert heraus und genau einer kommt hinzu, beide ueber eine Binaersuche an ihrer Stelle
   * eingefuegt bzw. entfernt. Der Median ist dann ein Griff in die Mitte. Die Menge der
   * Werte im Fenster ist Element fuer Element dieselbe wie vorher - das Ergebnis ist
   * deshalb nicht "fast gleich", sondern GLEICH. Der Selbsttest vergleicht beide Fassungen
   * wertweise gegen null Abweichung.
   * ================================================================================== */
  function grundlinieAbziehen(werte, hz, fensterS) {
    var n = werte.length;
    var w = Math.max(3, Math.round(hz * (fensterS || 0.2)));
    if (w % 2 === 0) w++;
    var halb = (w - 1) / 2;
    var out = new Array(n);
    if (!n) return out;
    var sortiert = [];                 // die Werte des Fensters, aufsteigend
    function stelleFuer(v) {           // erste Stelle, an der v stehen duerfte
      var lo = 0, hi = sortiert.length;
      while (lo < hi) { var m = (lo + hi) >> 1; if (sortiert[m] < v) lo = m + 1; else hi = m; }
      return lo;
    }
    function einfuegen(v) { sortiert.splice(stelleFuer(v), 0, v); }
    function entfernen(v) {
      var p = stelleFuer(v);
      /* Bei gleichen Werten trifft die Binaersuche irgendeinen von ihnen - das genuegt,
       * weil sie ununterscheidbar sind. Gleitkommareste gibt es hier nicht: es wird genau
       * der Wert entfernt, der vorher eingefuegt wurde. */
      if (sortiert[p] === v) sortiert.splice(p, 1);
      else { var q = sortiert.indexOf(v); if (q >= 0) sortiert.splice(q, 1); }
    }
    var i, j;
    for (j = 0; j <= halb && j < n; j++) if (werte[j] != null) einfuegen(werte[j]);
    for (i = 0; i < n; i++) {
      if (werte[i] == null) out[i] = null;
      else {
        var m2 = sortiert.length;
        var med = !m2 ? 0 : (m2 % 2 ? sortiert[(m2 - 1) / 2] : (sortiert[m2 / 2 - 1] + sortiert[m2 / 2]) / 2);
        out[i] = werte[i] - med;
      }
      var raus = i - halb, rein = i + halb + 1;
      if (raus >= 0 && werte[raus] != null) entfernen(werte[raus]);
      if (rein < n && werte[rein] != null) einfuegen(werte[rein]);
    }
    return out;
  }

  /* ------------------------------------------------------------------ *
   * 2) QRS-Zacken finden
   *
   * Verfahren in der Art von Pan-Tompkins, aber bewusst schlank:
   *   Ableitung -> Quadrieren -> gleitende Summe -> Schwelle -> Refraktaerzeit.
   * Die Ableitung hebt den steilen QRS gegenueber der flachen T-Welle hervor; das Quadrieren
   * verstaerkt diesen Unterschied. Die Refraktaerzeit verhindert, dass eine hohe T-Welle als
   * zweiter Schlag gezaehlt wird - der haeufigste Fehler einer zu einfachen Erkennung.
   * ------------------------------------------------------------------ */
  function findeQRS(werte, hz) {
    var n = werte.length, i;
    var abl = new Array(n);
    for (i = 0; i < n; i++) {
      var a = werte[i], b = i > 0 ? werte[i - 1] : null;
      abl[i] = (a == null || b == null) ? 0 : (a - b);
    }
    var quad = abl.map(function (x) { return x * x; });
    // Gleitende Summe ueber ~40 ms: fasst den ganzen QRS zu einem Berg zusammen.
    var w = Math.max(2, Math.round(hz * 0.04));
    var glatt = new Array(n), summe = 0;
    for (i = 0; i < n; i++) {
      summe += quad[i];
      if (i >= w) summe -= quad[i - w];
      glatt[i] = summe;
    }
    // Schwelle aus dem Signal selbst: Median + Abstand zum Hoechstwert. Ein fester Wert waere
    // von der Verstaerkung abhaengig und damit von Geraet zu Geraet verschieden.
    var hoch = 0;
    for (i = 0; i < n; i++) if (glatt[i] > hoch) hoch = glatt[i];
    /*
     * Grundrauschen ueber ALLE Werte schaetzen, nicht nur ueber die positiven.
     * Vorher stand hier .filter(x > 0). Zwischen zwei Schlaegen ist die Huellkurve aber genau 0 -
     * der Filter warf also die Ruhephasen weg und bildete den Median aus den AKTIVEN Abschnitten.
     * Die geschaetzte Grundlinie lag dadurch fast so hoch wie ein QRS selbst (gemessen 14882 bei
     * Spitzen von 40452), und die flachere ventrikulaere Extrasystole (17410) blieb darunter -
     * sie wurde uebersehen. Der Median ueber alle Werte ist das tatsaechliche Grundrauschen.
     */
    var basis = median(glatt);
    if (!hoch || hoch <= basis) return [];
    var schwelle = basis + (hoch - basis) * 0.25;
    var refrakt = Math.round(hz * RR_MIN_MS / 1000);

    function suche(vonIdx, bisIdx, grenze, bereits) {
      var treffer = [], letzte = bereits;
      for (var i2 = Math.max(1, vonIdx); i2 < Math.min(n - 1, bisIdx); i2++) {
        if (glatt[i2] < grenze) continue;
        if (!(glatt[i2] >= glatt[i2 - 1] && glatt[i2] >= glatt[i2 + 1])) continue;
        if (i2 - letzte < refrakt) continue;
        // Auf die tatsaechliche R-Spitze zuruecklaufen (der Gipfel der Huellkurve liegt spaeter).
        var von = Math.max(0, i2 - w), bis = Math.min(n - 1, i2 + 2);
        var beste = von, betrag = -1;
        for (var j = von; j <= bis; j++) {
          var v = werte[j] == null ? 0 : Math.abs(werte[j]);
          if (v > betrag) { betrag = v; beste = j; }
        }
        treffer.push(beste);
        letzte = i2;
      }
      return treffer;
    }

    var zacken = suche(1, n - 1, schwelle, -1e9);

    /*
     * NACHSUCHE IN GROSSEN LUECKEN (Pan-Tompkins "search back") — klinisch der wichtigste Teil.
     *
     * Ein VENTRIKULAERER Schlag ist breit und steigt deshalb FLACHER an als ein normaler. Die
     * Erkennung arbeitet aber ueber die Steilheit: mit einer festen Schwelle faellt ausgerechnet
     * die ventrikulaere Extrasystole durch - also genau der Schlag, auf den es ankommt.
     * Im Selbsttest (22.07.2026) wurde ein 90-ms-Schlag zwischen zwei normalen glatt uebersehen;
     * aus "unregelmaessig mit vorzeitigen Schlaegen" wurde ein beruhigendes "regelmaessig".
     * Deshalb: wo eine Luecke deutlich groesser ist als der bisherige mittlere Abstand, wird sie
     * mit halbierter Schwelle erneut abgesucht.
     */
    if (zacken.length >= 3) {
      var abst = [];
      for (i = 1; i < zacken.length; i++) abst.push(zacken[i] - zacken[i - 1]);
      var mitte = median(abst);
      if (mitte > 0) {
        var ergaenzt = [];
        for (i = 1; i < zacken.length; i++) {
          var luecke = zacken[i] - zacken[i - 1];
          if (luecke <= mitte * 1.5) continue;
          var nach = suche(zacken[i - 1] + refrakt, zacken[i] - refrakt,
            basis + (hoch - basis) * 0.15, zacken[i - 1]);
          for (var q = 0; q < nach.length; q++) {
            if (nach[q] - zacken[i - 1] >= refrakt && zacken[i] - nach[q] >= refrakt) ergaenzt.push(nach[q]);
          }
        }
        if (ergaenzt.length) {
          zacken = zacken.concat(ergaenzt).sort(function (a, b) { return a - b; });
        }
      }
    }
    return zacken;
  }

  /* ------------------------------------------------------------------ *
   * 3) QRS-Breite: von Beginn bis Ende des Ausschlags um die R-Zacke.
   * Grenze ist ein Bruchteil des Spitzenbetrags; gesucht wird beidseitig die Rueckkehr zur Ruhe.
   * ------------------------------------------------------------------ */
  /* ==================================================================================
   * DIE QRS-BREITE ENDETE AM ERSTEN NULLDURCHGANG — ALSO NACH DER R-ZACKE (Befund 10.08.2026)
   *
   * WAS WAR: der Suchlauf brach ab, sobald EIN Abtastwert unter 15 % der Spitze lag. Ein
   * Kammerkomplex durchquert die Grundlinie aber MITTEN in sich - zwischen R und S, und beim
   * Hund oft auch zwischen Q und R. Gemessen wurde damit die Breite der R-ZACKE, nicht die
   * des Komplexes.
   *
   * Am nachgebildeten Streifen nachgemessen: Vorgabe 50 ms, gemeldet 20 ms. Am echten Signal
   * ist der Fehler derselbe, nur faellt er dort niemandem auf, weil es keine Vorgabe gibt.
   *
   * WARUM DAS KLINISCH ZAEHLT: die Normbaender (Hund bis 60 ms, Katze bis 40) gelten fuer den
   * GANZEN Komplex. Wer die R-Zacke dagegen haelt, meldet zu selten "QRS verbreitert" - und
   * genau daran haengen ventrikulaerer Ursprung, Schenkelblock und Hyperkaliaemie. Der Fehler
   * ging also in die gefaehrliche Richtung: er beruhigt.
   *
   * WAS JETZT GILT: der Lauf endet erst, wenn das Signal HALT_MS lang unter der Schwelle
   * geblieben ist. Ein kurzer Durchgang durch die Grundlinie innerhalb des Komplexes beendet
   * ihn nicht mehr, ein echtes Zurueckkehren zur Grundlinie schon. 12 ms sind bewusst kurz
   * gewaehlt: die ST-Strecke dauert beim Hund 40 bis 100 ms, bei der Katze 60 bis 80 - der
   * Lauf kann also nicht in die T-Welle hineinlaufen.
   * ================================================================================== */
  /* ==================================================================================
   * DIE SCHWELLE: 15 % -> 8 % DER SPITZE (10.08.2026, an Modellstreifen ausgemessen)
   *
   * Q- und S-Zacke sind beim Tier regelmaessig KLEINER als 15 % der R-Zacke (im geeichten
   * Modell: Q 0,10 mV und S 0,25 mV gegen R 1,00 mV). Mit 15 % lag die Schwelle also ueber
   * der halben Q-Zacke - der Lauf endete, bevor er sie ueberhaupt erreichte.
   *
   * Gemessen an einem Streifen mit bekannter Vorgabe (Hund 50 ms, Katze 35 ms), rein und
   * mit Rauschen:
   *      15 %  Hund 28 ms   Katze 16 ms      (weit zu kurz)
   *      10 %  Hund 28-32   Katze 20-24
   *       8 %  Hund 36-40   Katze 20-28      <- gewaehlt
   *       5 %  Hund 44      Katze 28, verrauscht 44   (faengt an zu wandern)
   *       3 %  Hund 44-48   Katze verrauscht 104      (unbrauchbar)
   * 8 % ist der Punkt, an dem die Messung deutlich naeher an der Wahrheit liegt und noch
   * NICHT vom Rauschen getrieben wird.
   *
   * EINE SCHWELLENMESSUNG BLEIBT SYSTEMATISCH ZU KURZ - rund 20 % gegenueber der gezeichneten
   * Dauer. Das ist bekannt, gilt fuer echte Streifen genauso und steht in der Eichpruefung
   * ausdruecklich dabei. Wichtig ist die Richtung des frueheren Fehlers: er BERUHIGTE (eine
   * verbreiterte Kammer sah schmal aus), und genau das ist jetzt kleiner geworden.
   * ================================================================================== */
  /* DIE SCHWELLE HAENGT AN ZWEI DINGEN, NICHT NUR AN DER R-HOEHE.
   *
   * Ein Anteil der R-Zacke allein ist als Kriterium falsch: Q und S sind beim Tier
   * regelmaessig kleiner als dieser Anteil, der Lauf endete also VOR ihnen. Wo der Komplex
   * wirklich anfaengt und aufhoert, entscheidet der Abstand zur GRUNDLINIE - so liest es
   * auch ein Mensch am Papier. Deshalb:
   *     grenze = max(5 % der Spitze, 2,5 x Grundlinienunruhe)
   * Der erste Teil haelt die Messung bei ruhigem Signal nahe an der wahren Dauer, der zweite
   * verhindert, dass sie bei unruhigem Signal ins Rauschen laeuft (gemessen 10.08.2026: mit
   * 3 % ohne Rauschterm mass eine verrauschte Katze 104 ms statt 35).
   * Ohne uebergebenes Rauschmass bleibt es beim reinen Anteil - dann ist die Zahl wie bisher
   * eher zu klein, und das ist die vorsichtigere Richtung. */
  /* 8 % UND NICHT 5 % — gemessen, nicht gewaehlt (10.08.2026).
   * Mit 5 % lief die Messung auf Signalen mit sehr ruhiger Grundlinie (synthetische
   * Pruefstreifen, stark gefilterte Geraete) so weit aus, dass ein schmaler Sinuskomplex
   * als verbreitert galt - die Auswertung meldete daraufhin einen idioventrikulaeren
   * Rhythmus, wo ein Sinusrhythmus war. Das ist die gefaehrliche Richtung: ein erfundener
   * Befund. 8 % war in der Messreihe der Punkt, an dem die Breite deutlich naeher an der
   * Wahrheit liegt und die Deutung stabil bleibt. */
  var QRS_HALT_MS = 12;
  var QRS_SCHWELLE = 0.08;
  function qrsBreiteMs(werte, r, hz, rausch) {
    if (werte[r] == null) return null;
    var spitze = Math.abs(werte[r]);
    if (!spitze) return null;
    var grenze = spitze * QRS_SCHWELLE;
    if (endlich(rausch) && rausch > 0) grenze = Math.max(grenze, rausch * 2.5);
    var maxHalb = Math.round(hz * 0.09);   // 90 ms - mehr ist bei Hund/Katze kein QRS mehr
    var halt = Math.max(1, Math.round(hz * QRS_HALT_MS / 1000));
    var links = r, rechts = r, k, unten;
    unten = 0;
    for (k = 1; k <= maxHalb; k++) {
      var li = r - k;
      if (li < 0 || werte[li] == null) break;
      if (Math.abs(werte[li]) < grenze) { unten++; if (unten >= halt) break; }
      else { unten = 0; links = li; }
    }
    unten = 0;
    for (k = 1; k <= maxHalb; k++) {
      var re = r + k;
      if (re >= werte.length || werte[re] == null) break;
      if (Math.abs(werte[re]) < grenze) { unten++; if (unten >= halt) break; }
      else { unten = 0; rechts = re; }
    }
    return Math.round((rechts - links) / hz * 1000);
  }

  /* ------------------------------------------------------------------ *
   * 4) ST-Strecke
   *
   * Bezugslinie ist das PQ-Stueck VOR dem QRS (dort ruht das Herz elektrisch), Messpunkt liegt
   * hinter dem QRS-Ende. Beim Tier wird wegen der hohen Frequenz frueher gemessen als beim
   * Menschen: J+40 ms statt J+60/80 ms - bei 200/min waere J+80 ms schon in der T-Welle.
   *
   * WICHTIG: Ohne bekannte Verstaerkung (skala/Einheit) gibt es KEINE Angabe in mV. Eine Zahl
   * ohne Kalibrierung waere eine Scheingenauigkeit. Dann wird nur die Richtung genannt - oder gar
   * nichts.
   * ------------------------------------------------------------------ */
  function stMessung(werte, zacken, hz, skala, einheit) {
    if (zacken.length < 2) return { messbar: false, warum: 'zu wenige Herzschlaege im Streifen' };
    var pqVor = Math.round(hz * 0.06);     // 60 ms vor der R-Zacke
    var jNach = Math.round(hz * 0.04);     // J-Punkt etwa 40 ms nach der R-Zacke
    var messNach = Math.round(hz * 0.08);  // Messpunkt 80 ms nach R (= J + 40 ms)
    var werteST = [];
    for (var i = 0; i < zacken.length; i++) {
      var r = zacken[i];
      var pq = r - pqVor, mp = r + messNach;
      if (pq < 0 || mp >= werte.length) continue;
      if (werte[pq] == null || werte[mp] == null) continue;
      werteST.push(werte[mp] - werte[pq]);
    }
    if (werteST.length < 2) return { messbar: false, warum: 'zu wenige vollstaendige Herzschlaege' };
    var mittel = median(werteST);

    // Ohne Kalibrierung keine Zahl in mV.
    var kalibriert = endlich(skala) && skala > 0 && /uv|µv|mv/i.test(String(einheit || ''));
    if (!kalibriert) {
      return {
        messbar: false,
        richtung: mittel > 0 ? 'angehoben' : (mittel < 0 ? 'gesenkt' : 'auf Höhe der Grundlinie'),
        warum: 'Verstärkung des Geräts unbekannt — eine Angabe in mV wäre nicht belegbar',
      };
    }
    // In mV umrechnen: skala ist der Faktor je Rohwert, Einheit uV oder mV.
    var mv = mittel * skala * (/mv/i.test(String(einheit)) ? 1 : 0.001);
    return {
      messbar: true,
      mv: Math.round(mv * 1000) / 1000,
      richtung: mv > 0.02 ? 'angehoben' : (mv < -0.02 ? 'gesenkt' : 'unauffällig'),
      schlaege: werteST.length,
    };
  }

  /* ================================================================================ *
   * 4b) P-WELLE UND PQ-ZEIT  (08.08.2026)
   *
   * WARUM DAS DER HEIKELSTE TEIL DIESER DATEI IST:
   * Die P-Welle ist klein. Beim Hund rund 0,2-0,4 mV, bei der KATZE bis 0,2 mV - also in
   * derselben Groessenordnung wie Muskelzittern und 50-Hz-Brumm. Wer sie zu eifrig sucht,
   * findet sie ueberall: in der T-Welle des vorigen Schlages, im Rauschen, in einer
   * flimmernden Grundlinie. Und jede erfundene P erzeugt Folgefehler, die klinisch etwas
   * bedeuten - "P vorhanden" schliesst Vorhofflimmern faelschlich aus, eine erfundene
   * PQ-Zeit macht aus einem gesunden Tier einen AV-Block I.
   *
   * DESHALB IST DIESES VERFAHREN ABSICHTLICH ZURUECKHALTEND:
   *   - Es sucht nur in einem Fenster, das die T-Welle des vorigen Schlages AUSSCHLIESST.
   *   - Es verlangt einen Mindestabstand zur Grundlinie (Vielfaches des Rauschens).
   *   - Es verlangt die P in der MEHRZAHL der Schlaege, nicht in einem.
   *   - Unter 100 Hz Abtastrate sagt es gar nichts: eine 40-ms-P haette dort 4 Punkte.
   *   - Es meldet ausdruecklich "keine P nachweisbar" statt "keine P" - das ist ein
   *     Unterschied, an dem eine Vorhofflimmern-Diagnose haengt.
   * ================================================================================ */

  var P_MIN_HZ = 100;          // darunter ist eine 40-ms-Welle nicht darstellbar
  var P_MIN_SCHLAEGE = 3;      // in weniger Schlaegen wird nichts behauptet
  var P_ANTEIL = 0.6;          // in so vielen Schlaegen muss sie stehen, sonst "nicht nachweisbar"

  /*
   * QRS-BEGINN. Die PQ-Zeit endet nicht an der R-Spitze, sondern am ANFANG des Kammerkomplexes.
   * Wer bis zur R-Spitze misst, bekommt beim breiten QRS eine zu lange PQ-Zeit - und damit
   * einen AV-Block, den es nicht gibt. Gesucht wird nach links, bis das Signal zur Ruhe kommt.
   */
  function qrsBeginn(werte, r, hz) {
    var spitze = werte[r] == null ? 0 : Math.abs(werte[r]);
    if (!spitze) return r;
    var grenze = spitze * 0.15;
    var max = Math.round(hz * 0.09);      // mehr als 90 ms ist bei Hund/Katze kein QRS
    var i = r;
    for (var k = 1; k <= max; k++) {
      var li = r - k;
      if (li < 0 || werte[li] == null) break;
      i = li;
      if (Math.abs(werte[li]) < grenze) break;
    }
    return i;
  }

  /*
   * Sucht EINE P-Welle vor dem Kammerkomplex bei r.
   * fensterVon/fensterBis begrenzen die Suche so, dass die T-Welle des VORIGEN Schlages
   * draussen bleibt: sie endet erfahrungsgemaess bei rund 55 % des RR-Abstandes.
   * Rueckgabe: { beginn, ende, gipfel, amp, dauerMs, pqMs } oder null.
   */
  /*
   * PERZENTIL — gebraucht fuer die Rauschschaetzung.
   * Der MEDIAN taugt dafuer NICHT: er liegt mitten im Signal, und ausserhalb des QRS besteht
   * das Signal ganz wesentlich aus der T-Welle (beim Hund 300 uV). Gemessen 08.08.2026 an
   * einem sauberen Streifen: Median 95 uV, aber die stille Grundlinie liegt bei 11 uV. Mit dem
   * Median als Rauschmass wurde die Schwelle 286 uV — hoeher als die gesuchte P (204 uV), und
   * das Verfahren fand in einem einwandfreien Signal NICHTS. Das 25. Perzentil trifft die
   * ruhige Strecke zwischen den Wellen und ist das richtige Mass.
   */
  function perzentil(arr, p) {
    if (!arr.length) return 0;
    var a = arr.slice().sort(function (x, y) { return x - y; });
    var i = Math.floor(a.length * p);
    if (i >= a.length) i = a.length - 1;
    return a[i];
  }

  /*
   * TIERARTLICHE SUCHFENSTER UND DAUERBAENDER (Fachrecherche 08.08.2026).
   * wHinten = wie weit vor dem QRS-Beginn gesucht wird (obere PQ-Norm + Toleranz),
   * wVorn   = Mindestabstand zum QRS-Beginn,
   * dauer   = zulaessige P-Breite. SIE ist das eigentliche Unterscheidungsmerkmal zur
   *           T-Welle: eine Hunde-/Katzen-P ist <= 40-50 ms, eine T-Welle 60-120 ms.
   *           Beim PFERD trennt die Dauer NICHT (P 90-170 ms, T ebenfalls breit) - dort
   *           traegt allein die Lage (PQ 210-410 ms) und der RR/2-Deckel.
   */
  var P_ART = {
    hund:     { wHinten: 0.190, wVorn: 0.015, dauer: [15, 60] },
    katze:    { wHinten: 0.135, wVorn: 0.012, dauer: [15, 55] },
    pferd:    { wHinten: 0.500, wVorn: 0.060, dauer: [50, 220] },
    standard: { wHinten: 0.190, wVorn: 0.015, dauer: [15, 60] }
  };
  function pArt(art) { return P_ART[art] || P_ART.standard; }

  function findeP(werte, r, hz, vorigesR, schwelle, art) {
    var A = pArt(art);
    var qb = qrsBeginn(werte, r, hz);
    var von = qb - Math.round(hz * A.wHinten);
    var bis = qb - Math.max(2, Math.round(hz * A.wVorn));
    if (vorigesR != null) {
      /*
       * RR/2-DECKEL — die tragende Sperre gegen die T-Welle des VORIGEN Schlages.
       * Belegte Regel der Wavelet-Delineation: das Suchfenster reicht hoechstens bis zur
       * HAELFTE des letzten RR-Abstandes zurueck, weil die T-Welle in dessen erster Haelfte
       * liegt. Vorher stand hier 0,55*RR - fast dasselbe, aber ohne Beleg und ohne die
       * tierartliche Fensterlaenge daneben.
       * Wirkung: Katze 240/min (RR 250 ms) -> RR/2 = 125 ms greift vor den 135 ms.
       */
      var haelfte = vorigesR + Math.round((r - vorigesR) / 2);
      if (von < haelfte) von = haelfte;
    }
    if (von < 0) von = 0;
    if (bis - von < Math.max(3, Math.round(hz * 0.02))) return null;   // Fenster zu schmal

    /*
     * DER DEM QRS NAECHSTE GUELTIGE KANDIDAT — NICHT DER GROESSTE (Befund 08.08.2026).
     * Erst wurde hier schlicht das Maximum im Fenster genommen. Die Fachrecherche nennt
     * genau das als systematischen Fehler: "Die T-Welle ist im Hund oft hoeher als die
     * P-Welle - eine Maximumsuche greift systematisch daneben." Gesucht wird deshalb von
     * der QRS-Seite her rueckwaerts der ERSTE Gipfel, der Schwelle UND Dauerband besteht.
     * Das Vorzeichen ist ausdruecklich KEIN Kriterium: die P kann positiv, negativ oder
     * biphasisch sein, und die T-Welle des Hundes ist es ebenso.
     */
    var kand = [];
    for (var i = bis - 1; i > von; i--) {
      var w = werte[i];
      if (w == null) continue;
      if (Math.abs(w) < schwelle) continue;
      // lokaler Gipfel im Betrag
      var vor = werte[i - 1], nach = werte[i + 1];
      if (vor == null || nach == null) continue;
      if (!(Math.abs(w) >= Math.abs(vor) && Math.abs(w) >= Math.abs(nach))) continue;
      kand.push(i);
    }
    if (!kand.length) return null;
    // Kandidaten der Reihe nach pruefen - der erste (QRS-naechste) gueltige gewinnt.
    for (var k = 0; k < kand.length; k++) {
      var treffer = pruefeKandidat(werte, kand[k], von, bis, qb, hz, A);
      if (treffer) return treffer;
    }
    return null;
  }

  /* Prueft einen einzelnen Gipfel auf Rand, Dauer und Lage. Ausgelagert, damit findeP die
   * Kandidaten der Reihe nach durchgehen kann, ohne sich zu verschachteln. */
  function pruefeKandidat(werte, gi, von, bis, qb, hz, A) {
    var gv = werte[gi];
    if (gv == null) return null;
    /* Die Schwelle ist bereits bei der Kandidatenwahl in findeP geprueft (sie wird EINMAL
     * in pAuswertung gebildet: Rauschen UND Mindesthoehe relativ zur R-Zacke). */

    // Beginn und Ende: wo faellt die Welle unter 20 % ihres Gipfels?
    var schw = Math.abs(gv) * 0.2;
    var b = gi, e = gi, j;
    var randLinks = false, randRechts = false;
    for (j = gi; j >= von; j--) { if (werte[j] == null || Math.abs(werte[j]) < schw) break; b = j; }
    if (b <= von) randLinks = true;
    for (j = gi; j <= bis; j++) { if (werte[j] == null || Math.abs(werte[j]) < schw) break; e = j; }
    if (e >= bis) randRechts = true;
    /*
     * EINE AM FENSTERRAND ABGESCHNITTENE WELLE WIRD VERWORFEN (Befund 08.08.2026).
     * Reicht die Auslenkung bis an den Rand des Suchfensters, ist ihr Anfang (oder Ende) gar
     * nicht im Bild - dann laesst sich weder die Dauer noch die PQ-Zeit bestimmen. Vor allem
     * aber ist das der typische Fall der T-WELLE des vorigen Schlages: von ihr ragt bei hoher
     * Frequenz nur der Auslaeufer ins Fenster, und genau der wurde im Test als "P" mit 14 ms
     * Dauer gemeldet. Wer nur die Fenstergrenze verschiebt, verschiebt das Problem mit.
     */
    if (randLinks || randRechts) return null;
    var dauer = (e - b) / hz * 1000;
    /*
     * DIE DAUER IST DAS EIGENTLICHE UNTERSCHEIDUNGSMERKMAL ZUR T-WELLE (Befund 08.08.2026).
     * Erst stand hier ein Band von 10-220 ms - so weit, dass jede T-Welle hineinpasste.
     * Belegt ist: Hund/Katze P <= 40-50 ms, T dagegen 60-120 ms. Das Band ist deshalb
     * tierartlich eng gefuehrt. Beim PFERD trennt die Dauer NICHT (P 90-170 ms, T ebenso
     * breit) - dort traegt allein die Lage und der RR/2-Deckel, und das Band ist bewusst weit.
     */
    if (dauer < A.dauer[0] || dauer > A.dauer[1]) return null;

    return {
      beginn: b, ende: e, gipfel: gi, amp: gv,
      dauerMs: Math.round(dauer),
      pqMs: Math.round((qb - b) / hz * 1000),
    };
  }

  /*
   * Wertet die P-Wellen ueber ALLE Schlaege aus und gibt einen zurueckhaltenden Befund.
   * skala/einheit werden nur gebraucht, um die Amplitude in mV zu benennen; ohne sie gibt es
   * keine mV-Zahl (dieselbe Regel wie bei der ST-Strecke).
   */
  function pAuswertung(werte, zacken, hz, rausch, rAmp, skala, einheit, art) {
    if (!hz || hz < P_MIN_HZ) {
      return { messbar: false, warum: 'Abtastrate ' + Math.round(hz || 0) + ' Hz zu niedrig für die P-Welle (mindestens ' + P_MIN_HZ + ' Hz nötig)' };
    }
    if (zacken.length < P_MIN_SCHLAEGE) {
      return { messbar: false, warum: 'zu wenige Herzschläge für eine P-Aussage' };
    }
    /*
     * DIE SCHWELLE HAT ZWEI TEILE, und beide werden gebraucht:
     *   3 x Grundlinienunruhe  - haelt Rauschen und Flimmerwellen draussen
     *   4 % der R-Amplitude    - haelt die Schwelle auch dann sinnvoll, wenn die Grundlinie
     *                            ungewoehnlich still ist (synthetische oder stark gefilterte
     *                            Signale); ohne diesen Teil waere dort jede Regung eine P.
     * Gemessen 08.08.2026: Hund P 204 uV gegen Schwelle 147 -> erkannt; Vorhofflimmern
     * (Flimmerwellen 60 uV) gegen Schwelle 92 -> abgewiesen.
     */
    var schwelle = Math.max(rausch * 3, (rAmp || 0) * 0.04);
    var funde = [], i;
    for (i = 0; i < zacken.length; i++) {
      var p = findeP(werte, zacken[i], hz, i > 0 ? zacken[i - 1] : null, schwelle, art);
      if (p) funde.push(p);
    }
    var anteil = funde.length / zacken.length;
    if (funde.length < P_MIN_SCHLAEGE || anteil < P_ANTEIL) {
      /*
       * "NICHT NACHWEISBAR" IST NICHT DASSELBE WIE "KEINE P".
       * An diesem Unterschied haengt die Vorhofflimmern-Aussage. Die Station darf ihn nicht
       * einebnen: sie sagt, was sie NICHT gefunden hat, und nennt den Anteil dazu.
       */
      return {
        messbar: false, vorhanden: false, anteil: Math.round(anteil * 100),
        warum: 'in nur ' + funde.length + ' von ' + zacken.length + ' Schlägen eine P-Welle abgrenzbar' +
          ' — das kann an Vorhofflimmern/-stillstand liegen, ebenso an Überlagerung durch die T-Welle,' +
          ' an zu kleiner P (Katze) oder an Störung. Zur Abgrenzung eine Brustwandableitung erwägen.',
      };
    }
    var dauern = [], pqs = [], amps = [];
    for (i = 0; i < funde.length; i++) {
      dauern.push(funde[i].dauerMs); pqs.push(funde[i].pqMs); amps.push(funde[i].amp);
    }
    var pqMed = median(pqs);
    /* PQ-VERLAUF: nimmt die Ueberleitungszeit zu (Wenckebach) oder ist sie konstant
     * (Mobitz II)? Das ist der EINZIGE Weg, die beiden zu unterscheiden - und genau der,
     * den die Station bisher nicht gehen konnte. Gemessen wird die Spannweite; ausserdem,
     * ob die Werte MONOTON steigen (ein blosses Schwanken ist kein Wenckebach). */
    var pqMin = pqs[0], pqMax = pqs[0], steigend = 0;
    for (i = 1; i < pqs.length; i++) {
      if (pqs[i] < pqMin) pqMin = pqs[i];
      if (pqs[i] > pqMax) pqMax = pqs[i];
      if (pqs[i] > pqs[i - 1] + 4) steigend++;
    }
    var kalibriert = endlich(skala) && skala > 0 && /uv|µv|mv/i.test(String(einheit || ''));
    var ampMv = null;
    if (kalibriert) {
      ampMv = Math.round(median(amps.map(Math.abs)) * skala * (/mv/i.test(String(einheit)) ? 1 : 0.001) * 1000) / 1000;
    }
    return {
      messbar: true, vorhanden: true,
      anteil: Math.round(anteil * 100),
      schlaege: funde.length,
      dauerMs: Math.round(median(dauern)),
      pqMs: Math.round(pqMed),
      pqMinMs: Math.round(pqMin), pqMaxMs: Math.round(pqMax),
      pqSpanneMs: Math.round(pqMax - pqMin),
      /* "zunehmend" nur, wenn die Mehrzahl der Schritte WIRKLICH steigt UND die Spannweite
       * deutlich ist. Sonst waere jede Messschwankung ein Wenckebach. */
      pqVerlauf: (steigend >= Math.max(2, Math.floor((pqs.length - 1) * 0.6)) && (pqMax - pqMin) >= 15)
        ? 'zunehmend' : ((pqMax - pqMin) <= 20 ? 'konstant' : 'schwankend'),
      ampMv: ampMv,
      negativ: median(amps) < 0,
    };
  }

  /* ================================================================================ *
   * 4c) T-WELLE UND QT-ZEIT  (08.08.2026)
   *
   * DAS T-ENDE NACH DEM TANGENTENVERFAHREN.
   * Die T-Welle laeuft flach aus - es gibt keinen Punkt, an dem sie "aufhoert". Wer das Ende
   * ueber eine Schwelle sucht, bekommt eine Zahl, die allein von der Schwelle abhaengt.
   * Das anerkannte Verfahren legt stattdessen die TANGENTE an die steilste Stelle des
   * absteigenden Schenkels und nimmt deren Schnittpunkt mit der Grundlinie:
   *     t_s   = Stelle der steilsten Flanke nach dem Gipfel (Extremum von dy/dt)
   *     y(t)  = y(t_s) + m * (t - t_s),  m = dy/dt an t_s
   *     T_ende = Nullstelle dieser Geraden
   * Das Verfahren liefert bewusst ein etwas FRUEHERES Ende als der geometrische Auslauf
   * (bei einer glatten Welle rund 9 % ihrer Dauer). Das ist bekannt und gewollt: es ist
   * reproduzierbar und unabhaengig von der Verstaerkung.
   *
   * QT = QRS-BEGINN bis T-ENDE. Nicht ab der R-Spitze - derselbe Fehler wie bei der PQ-Zeit.
   *
   * WOFUER DIE T-WELLE HIER NICHT BENUTZT WIRD:
   * Ihre FORM (spitz, breit, negativ) ist beim Tier ausgesprochen unspezifisch - sie
   * wechselt mit Lage, Atmung, Frequenz und Tageszeit, ohne dass etwas krank waere.
   * Es wird deshalb NUR die Zeit gemessen, keine Formaussage getroffen. Eine Ausnahme
   * bleibt bewusst offen: die Bewertung von QT-Verlaengerung/-Verkuerzung.
   * ================================================================================ */

  /* Suchfenster und QT-Baender je Tierart.
   * qt = plausibler QT-Bereich; ausserhalb wird der Schlag verworfen, weil dann mit hoher
   * Wahrscheinlichkeit nicht die T-Welle vermessen wurde. */
  var T_ART = {
    hund:     { abQrs: 0.030, bisRR: 0.62, qt: [120, 320] },
    katze:    { abQrs: 0.025, bisRR: 0.62, qt: [90, 240] },
    pferd:    { abQrs: 0.080, bisRR: 0.62, qt: [280, 760] },
    standard: { abQrs: 0.030, bisRR: 0.62, qt: [100, 340] }
  };
  function tArt(art) { return T_ART[art] || T_ART.standard; }

  /* Ende des Kammerkomplexes - von dort an wird die T-Welle gesucht. */
  function qrsEnde(werte, r, hz) {
    var spitze = werte[r] == null ? 0 : Math.abs(werte[r]);
    if (!spitze) return r;
    var grenze = spitze * 0.15;
    var max = Math.round(hz * 0.09);
    var i = r;
    for (var k = 1; k <= max; k++) {
      var re = r + k;
      if (re >= werte.length || werte[re] == null) break;
      i = re;
      if (Math.abs(werte[re]) < grenze) break;
    }
    return i;
  }

  /*
   * Sucht die T-Welle nach dem Kammerkomplex bei r und misst das Ende per Tangente.
   * Anders als bei der P-Welle wird hier der GROESSTE Ausschlag genommen - die T ist die
   * beherrschende Welle nach dem QRS, und es gibt keine hoehere Nachbarwelle, die sie
   * verdraengen koennte (das war bei der P die T selbst).
   * Rueckgabe { gipfel, ende, amp, qtMs, tEndeIdx } oder null.
   */
  function findeT(werte, r, hz, naechstesR, schwelle, art) {
    var A = tArt(art);
    var qb = qrsBeginn(werte, r, hz);
    var qe = qrsEnde(werte, r, hz);
    var von = qe + Math.max(2, Math.round(hz * A.abQrs));
    var bis;
    if (naechstesR != null) bis = r + Math.round((naechstesR - r) * A.bisRR);
    else bis = r + Math.round(hz * 0.5);
    if (bis >= werte.length) bis = werte.length - 2;
    if (bis - von < Math.max(4, Math.round(hz * 0.03))) return null;

    // Gipfel der T-Welle (Betrag - die T darf negativ sein, das ist beim Tier haeufig)
    var gi = -1, gv = 0;
    for (var i = von; i <= bis; i++) {
      var w = werte[i];
      if (w == null) continue;
      if (Math.abs(w) > Math.abs(gv)) { gv = w; gi = i; }
    }
    if (gi < 0 || !(Math.abs(gv) >= schwelle)) return null;
    if (gi >= bis - 2) return null;                 // Gipfel am Fensterrand: Ende nicht messbar

    /* Steilste Stelle des ABSTEIGENDEN Schenkels: Extremum der Ableitung nach dem Gipfel.
     * Vorzeichenabhaengig - bei negativer T ist der "Abstieg" ein Anstieg zur Grundlinie. */
    var vorz = gv >= 0 ? 1 : -1;
    var ts = -1, beste = 0;
    for (i = gi + 1; i < bis; i++) {
      var a = werte[i + 1], b = werte[i - 1];
      if (a == null || b == null) continue;
      var m = (a - b) / 2;                          // diskrete Ableitung je Abtastschritt
      var gerichtet = -vorz * m;                    // Rueckkehr zur Grundlinie = positiv
      if (gerichtet > beste) { beste = gerichtet; ts = i; }
    }
    if (ts < 0 || beste <= 0) return null;

    /* Tangente: y = y(ts) + m*(t-ts), Nullstelle t0 = ts - y(ts)/m.
     * m ist hier die Steigung JE ABTASTSCHRITT, also ist t0 direkt ein Index. */
    var mSteig = -vorz * beste;                     // tatsaechliche (vorzeichenbehaftete) Steigung
    var yts = werte[ts];
    if (yts == null || mSteig === 0) return null;
    var t0 = ts - yts / mSteig;
    if (!(t0 > gi)) return null;                    // Ende muss NACH dem Gipfel liegen
    if (t0 > bis) return null;                      // laeuft aus dem Fenster: nicht messbar

    var qt = (t0 - qb) / hz * 1000;
    if (qt < A.qt[0] || qt > A.qt[1]) return null;  // ausserhalb plausibler QT: verworfen

    return {
      gipfel: gi, amp: gv, tEndeIdx: t0,
      qtMs: Math.round(qt),
      negativ: gv < 0,
    };
  }

  /*
   * Wertet die T-Wellen ueber alle Schlaege aus. Wie bei der P-Welle gilt: erst ab einem
   * Mindestanteil auswertbarer Schlaege wird ueberhaupt etwas gesagt.
   */
  function tAuswertung(werte, zacken, hz, rausch, rAmp, art, hf, skala, einheit) {
    if (!hz || hz < P_MIN_HZ) {
      return { messbar: false, warum: 'Abtastrate zu niedrig für die T-Welle' };
    }
    if (zacken.length < P_MIN_SCHLAEGE) {
      return { messbar: false, warum: 'zu wenige Herzschläge für eine QT-Aussage' };
    }
    /* Schwelle wie bei der P: Rauschen ODER Mindesthoehe relativ zur R-Zacke. Die T ist
     * groesser als die P, die Schwelle darf hier deshalb ruhig dieselbe sein. */
    var schwelle = Math.max(rausch * 3, (rAmp || 0) * 0.04);
    var funde = [], i;
    for (i = 0; i < zacken.length; i++) {
      var t = findeT(werte, zacken[i], hz, i + 1 < zacken.length ? zacken[i + 1] : null, schwelle, art);
      if (t) funde.push(t);
    }
    var anteil = funde.length / zacken.length;
    if (funde.length < P_MIN_SCHLAEGE || anteil < P_ANTEIL) {
      return {
        messbar: false, anteil: Math.round(anteil * 100),
        warum: 'in nur ' + funde.length + ' von ' + zacken.length + ' Schlägen ein T-Ende bestimmbar' +
          ' — bei hoher Frequenz, flacher T-Welle oder unruhiger Grundlinie ist das erwartbar.',
      };
    }
    var qts = [], amps = [];
    for (i = 0; i < funde.length; i++) { qts.push(funde[i].qtMs); amps.push(funde[i].amp); }
    var qtMed = median(qts);
    var qtc = null;
    /* QT-KORREKTUR nur beim HUND: Van de Water wurde an narkotisierten Hunden abgeleitet und
     * an Beagles bestaetigt; fuer Katze, Pferd und Heimtiere ist sie NICHT belegt. Bazett
     * wird bewusst nirgends angeboten - er ueberkorrigiert bei hoher Frequenz. */
    if (art === 'hund' && hf > 0) {
      qtc = Math.round((qtMed / 1000 - 0.087 * ((60 / hf) - 1)) * 1000);
    }
    /* T-HOEHE IN MILLIVOLT (10.08.2026) - und zwar nur bei bekannter Verstaerkung, dieselbe
     * Regel wie bei P und ST. Gebraucht wird sie fuer EINEN belegten Zusammenhang: die
     * hohe, zeltfoermige T-Welle der Hyperkaliaemie. Ohne die Zahl blieb dieser Befund
     * unpruefbar, obwohl er der einzige EKG-Befund ist, der unmittelbar lebensbedrohlich
     * werden kann. Ausserdem als VERHAELTNIS zur R-Zacke: die Werke nennen "T groesser als
     * ein Viertel der R" als Faustmass, und das ist von der Verstaerkung unabhaengig. */
    var kalT = endlich(skala) && skala > 0 && /uv|µv|mv/i.test(String(einheit || ''));
    var tAmpMv = null;
    var betrAmp = [];
    for (i = 0; i < amps.length; i++) betrAmp.push(Math.abs(amps[i]));
    var tBetrag = median(betrAmp);
    if (kalT) tAmpMv = Math.round(tBetrag * skala * (/mv/i.test(String(einheit)) ? 1 : 0.001) * 1000) / 1000;
    return {
      messbar: true, anteil: Math.round(anteil * 100), schlaege: funde.length,
      qtMs: Math.round(qtMed),
      qtMinMs: Math.round(Math.min.apply(null, qts)),
      qtMaxMs: Math.round(Math.max.apply(null, qts)),
      qtcMs: qtc, qtcFormel: qtc != null ? 'Van de Water' : null,
      negativ: median(amps) < 0,
      ampMv: tAmpMv,
      anteilVonR: (rAmp > 0) ? Math.round(tBetrag / rAmp * 100) / 100 : null,
    };
  }

  /* ================================================================================ *
   * 4f) HERZFREQUENZVARIABILITAET (HRV)  — 09.08.2026
   *
   * WARUM SIE HIER GUT AUFGEHOBEN IST: HRV braucht AUSSCHLIESSLICH die RR-Abstaende. Die
   * hat diese Datei ohnehin schon. Anders als fast alles andere, was fremde Geraete mehr
   * koennen als wir, verlangt sie KEINE zweite Ableitung - sie ist reine Arithmetik ueber
   * vorhandene Daten. (Recherche 09.08.2026: Norav PC-ECG 1200 fuehrt HRV als
   * lizenzpflichtige Zusatzoption; Televet 100 ebenso.)
   *
   * WAS BERECHNET WIRD (die Zeitbereichsmasse, die jedes System nennt):
   *   SDNN   Standardabweichung ALLER RR-Abstaende. Mass fuer die Gesamtvariabilitaet.
   *   RMSSD  Wurzel aus dem Mittel der quadrierten Unterschiede AUFEINANDERFOLGENDER RR.
   *          Bildet die schnelle, atemgekoppelte Schwankung ab - beim Hund also genau das,
   *          was die respiratorische Sinusarrhythmie erzeugt.
   *   pNN50  Anteil benachbarter RR-Paare, die sich um mehr als 50 ms unterscheiden.
   *
   * WAS AUSDRUECKLICH NICHT GELIEFERT WIRD: eine BEWERTUNG. Fuer Hund, Katze und die
   * uebrigen Arten sind keine belastbaren HRV-Normbereiche belegt, die diese Anwendung
   * nennen duerfte - und HRV haengt zusaetzlich an Narkosetiefe, Alter und Rasse. Die Zahlen
   * werden gemessen und angezeigt; ob sie hoch oder tief sind, sagt hier niemand.
   *
   * EINE HARTE SPERRE: Extrasystolen und Aussetzer verfaelschen jedes HRV-Mass massiv (ein
   * einziger vorzeitiger Schlag erzeugt einen kurzen und einen langen RR). Deshalb wird
   * gemeldet, wenn der Streifen formfremde Schlaege enthaelt - dann sind die Zahlen nur
   * beschreibend und nicht mit einem Ruhewert vergleichbar.
   * ================================================================================ */
  var HRV_MIN_RR = 20;   // unter 20 Abstaenden ist SDNN Zufall, kein Mass

  function hrv(rrMs, opts) {
    opts = opts || {};
    if (!rrMs || rrMs.length < HRV_MIN_RR) {
      return { messbar: false, warum: 'zu wenige Herzschläge für die Variabilität (mindestens ' +
        (HRV_MIN_RR + 1) + ' Schläge nötig)' };
    }
    var i, n = rrMs.length, summe = 0;
    for (i = 0; i < n; i++) summe += rrMs[i];
    var mittel = summe / n;

    var abw = 0;
    for (i = 0; i < n; i++) { var d = rrMs[i] - mittel; abw += d * d; }
    /* Stichprobenstandardabweichung (n-1): die Abstaende sind eine Stichprobe aus dem
     * laufenden Rhythmus, nicht die Grundgesamtheit. */
    var sdnn = Math.sqrt(abw / (n - 1));

    var quad = 0, ueber50 = 0;
    for (i = 1; i < n; i++) {
      var u = rrMs[i] - rrMs[i - 1];
      quad += u * u;
      if (Math.abs(u) > 50) ueber50++;
    }
    var rmssd = Math.sqrt(quad / (n - 1));
    var pnn50 = (n > 1) ? (ueber50 / (n - 1) * 100) : 0;

    return {
      messbar: true,
      schlaege: n + 1,
      mittelRrMs: Math.round(mittel),
      minRrMs: Math.round(Math.min.apply(null, rrMs)),
      maxRrMs: Math.round(Math.max.apply(null, rrMs)),
      sdnnMs: Math.round(sdnn * 10) / 10,
      rmssdMs: Math.round(rmssd * 10) / 10,
      pnn50: Math.round(pnn50 * 10) / 10,
      /* Ohne diese Kennzeichnung waere die Zahl irrefuehrend: ein einziger vorzeitiger
       * Schlag hebt SDNN und RMSSD deutlich an. */
      durchEktopieVerfaelscht: !!opts.ektopie,
      bewertet: false,
      warum: 'Für Hund, Katze und die übrigen Arten sind keine belastbaren HRV-Normbereiche ' +
        'belegt, die hier genannt werden dürften. Die Zahlen werden gemessen, nicht bewertet.',
    };
  }

  /* ================================================================================ *
   * 4e) WECHSELVERDACHT: sprach die Erkennung abwechselnd auf P-WELLE und R-ZACKE an?
   *
   * WOHER DIESER FEHLERMODUS BEKANNT IST (Quellen, 08.08.2026):
   * Zwei voneinander unabhaengige veterinaermedizinische Dissertationen der LMU Muenchen
   * (Schultheiss 2011, linker Vorhof in 3D; Penzl, linke Kammer in 3D gegen MRT) beschreiben
   * denselben Ausfall der automatischen EKG-Triggerung eines Ultraschallgeraets: der Trigger
   * loeste ABWECHSELND auf P-Welle und R-Zacke aus, bevorzugt bei Hunden mit HOHER P-Welle -
   * und zwar bei normalem Sinusrhythmus und ausreichender QRS-Amplitude. Bei einem Dackel war
   * die Untersuchung deshalb ueberhaupt nicht auswertbar; die Ursache blieb dort offen.
   *
   * Warum uns das angeht: unsere Zackensuche arbeitet nach demselben Grundprinzip
   * (Ableitung, Quadrat, gleitende Summe, Schwelle). Eine hohe P-Welle kann auch hier ueber
   * die Schwelle kommen. Das Ergebnis waere ein Streifen mit ABWECHSELND kurzen und langen
   * Abstaenden - und genau so sieht auch eine echte ventrikulaere Bigeminie aus.
   *
   * DESHALB WIRD HIER NICHTS BEHAUPTET, SONDERN UNTERSCHIEDEN:
   *   - Bei einer echten Bigeminie sind BEIDE Ausschlaege Kammerkomplexe, also aehnlich hoch.
   *   - Spricht die Erkennung dagegen abwechselnd auf P und R an, ist jeder zweite Ausschlag
   *     deutlich KLEINER (eine P-Welle liegt beim Hund im Zehntel-Millivolt-Bereich, eine
   *     R-Zacke im Millivolt-Bereich).
   * Zusaetzlich muessen die PAARSUMMEN konstant sein: kurz + lang ergibt dann zusammen genau
   * einen echten Herzschlag. Bei einer Bigeminie mit kompensatorischer Pause ist das nicht
   * zwingend so, aber es kann vorkommen - deshalb ist die Paarsumme allein kein Beweis.
   *
   * Rueckgabe: null (kein Verdacht) oder ein Befund, der BEIDE Deutungen nennt.
   * ================================================================================ */
  function wechselVerdacht(werte, zacken, rrMs) {
    var i;
    if (!rrMs || rrMs.length < 6 || !zacken || zacken.length < 7) return null;
    /* Die Trennlinie zwischen "kurz" und "lang" ist das arithmetische MITTEL, nicht der
     * Median (Befund im Selbsttest 08.08.2026): bei einem stark ungleichen Wechsel wie
     * 110/490/110/490 liegt der Median genau AUF dem kurzen Wert, und die Gruppe "kurz"
     * bleibt leer - der Verdacht waere ausgerechnet im deutlichsten Fall nie entstanden. */
    var mittel = 0;
    for (i = 0; i < rrMs.length; i++) mittel += rrMs[i];
    mittel /= rrMs.length;
    if (!(mittel > 0)) return null;

    /* (1) Wechseln sich kurz und lang wirklich ab? Mindestens 80 % der Uebergaenge. */
    var wechsel = 0;
    for (i = 0; i + 1 < rrMs.length; i++) {
      var a = rrMs[i] - mittel, b = rrMs[i + 1] - mittel;
      if ((a < 0 && b > 0) || (a > 0 && b < 0)) wechsel++;
    }
    if (wechsel / (rrMs.length - 1) < 0.8) return null;

    /* (2) Ist der Unterschied deutlich? Sonst ist es blosse Schwankung (beim Hund normal).
     * Schwelle 1,35 und nicht 1,5: eine ventrikulaere Bigeminie hat typischerweise ein
     * Kopplungsintervall um 40 % des Grundabstands, also genau das Verhaeltnis 1,5 - eine
     * Schwelle bei 1,5 haette den haeufigsten echten Fall knapp verfehlt. Gegen Fehlalarme
     * tragen die Pruefungen (1) und (3), nicht diese Zahl. */
    var kurzW = [], langW = [];
    for (i = 0; i < rrMs.length; i++) (rrMs[i] < mittel ? kurzW : langW).push(rrMs[i]);
    if (kurzW.length < 2 || langW.length < 2) return null;
    var mk = median(kurzW), ml = median(langW);
    if (!(mk > 0) || ml / mk < 1.35) return null;

    /* (3) Ergeben kurz + lang immer denselben Gesamtabstand? Dann war es EIN Schlag,
     * der in zwei Teile zerlegt wurde. */
    var summen = [];
    for (i = 0; i + 1 < rrMs.length; i += 2) summen.push(rrMs[i] + rrMs[i + 1]);
    if (summen.length < 3) return null;
    var msum = median(summen), maxAbw = 0;
    for (i = 0; i < summen.length; i++) maxAbw = Math.max(maxAbw, Math.abs(summen[i] - msum));
    if (!(msum > 0) || maxAbw / msum > 0.15) return null;

    /* (4) Sind beide Ausschlaege gleich hoch (Bigeminie) oder jeder zweite viel kleiner
     * (P-Welle mitgezaehlt)? */
    var gerade = [], ungerade = [];
    for (i = 0; i < zacken.length; i++) {
      var w = werte[zacken[i]];
      if (w == null) continue;
      (i % 2 === 0 ? gerade : ungerade).push(Math.abs(w));
    }
    if (gerade.length < 3 || ungerade.length < 3) return null;
    var hg = median(gerade), hu = median(ungerade);
    var gross = Math.max(hg, hu), klein = Math.min(hg, hu);
    var verhaeltnis = klein > 0 ? gross / klein : 99;

    var pVerdacht = verhaeltnis >= 2;
    return {
      kurzMs: Math.round(mk),
      langMs: Math.round(ml),
      paarsummeMs: Math.round(msum),
      hoehenverhaeltnis: Math.round(verhaeltnis * 10) / 10,
      deutung: pVerdacht ? 'p-mitgezaehlt' : 'offen',
      hinweis: pVerdacht
        ? ('Die Abstaende wechseln regelmaessig zwischen ' + Math.round(mk) + ' und ' +
           Math.round(ml) + ' ms, und jeder zweite Ausschlag ist nur ' +
           (Math.round(100 / verhaeltnis)) + ' % so hoch wie der andere. Das spricht dafuer, ' +
           'dass die Erkennung abwechselnd die P-Welle mitzaehlt (bei Hunden mit hoher P-Welle ' +
           'beschrieben) - und NICHT fuer eine Bigeminie. Bitte den Streifen ansehen.')
        : ('Die Abstaende wechseln regelmaessig zwischen ' + Math.round(mk) + ' und ' +
           Math.round(ml) + ' ms; beide Ausschlaege sind aehnlich hoch. Das passt zu einer ' +
           'echten Bigeminie, kann aber auch eine Erkennung sein, die die P-Welle mitzaehlt. ' +
           'Bitte den Streifen ansehen, bevor ein Befund gestellt wird.'),
    };
  }

  /* ================================================================================ *
   * 4d) QRS-MORPHOLOGIE UND SCHLAGVERGLEICH  (08.08.2026)
   *
   * WAS HIER BEWUSST *NICHT* GEMACHT WIRD: SCHENKELBLOCK-ZUORDNUNG.
   * Die Kriterien fuer Rechts- und Linksschenkelblock verweisen samtlich auf MEHRERE
   * Ableitungen (RSB: tiefe S in I, II, III, aVL, CV6; LSB: breiter, oft gekerbter R in
   * I, II, aVF OHNE tiefe S). Diese Station misst EINE Ableitung (II) - die uebrigen fuenf
   * sind daraus gerechnet. Aus einer Ableitung laesst sich die Blockart nicht bestimmen;
   * das ist keine Bequemlichkeit, sondern eine Folge des Einthoven-Dreiecks. Gemeldet wird
   * deshalb die VERBREITERUNG mit dem ausdruecklichen Zusatz, was zur Zuordnung fehlt.
   *
   * WAS EINKANALIG SEHR WOHL GEHT und hier gebaut ist:
   *   - Polaritaet, R- und S-Anteil, Q-Zacke, R/S-Verhaeltnis in Ableitung II
   *   - KERBUNG des Kammerkomplexes (belegtes Kriterium: zusaetzliche Auslenkung INNERHALB
   *     des QRS, die die Grundlinie nicht durchquert, Kerbtiefe >= 0,05 mV)
   *   - SCHLAGVERGLEICH ueber Kreuzkorrelation gegen die dominante Vorlage. Damit wird aus
   *     "vorzeitiger Schlag" ein "vorzeitiger UND FORMFREMDER Schlag" - genau das
   *     unterscheidet die ventrikulaere von der supraventrikulaeren Extrasystole. Und die
   *     Zahl der verschiedenen fremden Formen trennt UNIFORME von MULTIFORMER Ektopie,
   *     was klinisch verschieden schwer wiegt.
   * ================================================================================ */

  /*
   * Form eines einzelnen Kammerkomplexes in Ableitung II.
   * kerben zaehlt zusaetzliche Umkehrpunkte INNERHALB des QRS, die die Grundlinie nicht
   * durchqueren - das belegte Kerbungskriterium. Ohne Kalibrierung wird die Kerbtiefe
   * relativ zur R-Zacke gemessen statt in mV (0,05 mV entspricht bei einer 1,5-mV-R rund
   * 3 % - dieser Anteil wird dann als Ersatzmass benutzt und ausdruecklich so benannt).
   */
  function qrsForm(werte, r, hz, kalibriert, skala, einheit) {
    var qb = qrsBeginn(werte, r, hz), qe = qrsEnde(werte, r, hz);
    if (qe - qb < 2) return null;
    var hoch = 0, tief = 0, i;
    for (i = qb; i <= qe; i++) {
      var w = werte[i];
      if (w == null) continue;
      if (w > hoch) hoch = w;
      if (w < tief) tief = w;
    }
    var inMv = function (x) {
      if (!kalibriert) return null;
      return x * skala * (/mv/i.test(String(einheit)) ? 1 : 0.001);
    };
    /* KERBEN: Vorzeichenwechsel der Steigung innerhalb des QRS, deren Ausschlag gegen den
     * benachbarten Extremwert gross genug ist. Die Grundlinie darf dabei NICHT durchquert
     * werden - sonst waere es eine eigene Zacke (R', S) und keine Kerbe. */
    var spanne = hoch - tief;
    var mindest = spanne * 0.03;                 // Ersatzmass, wenn nicht kalibriert
    if (kalibriert) {
      var mv005 = 0.05 / (skala * (/mv/i.test(String(einheit)) ? 1 : 0.001));
      if (mv005 > 0) mindest = mv005;            // belegte Kerbtiefe 0,05 mV
    }
    /*
     * EINE KERBE IST DAS TAL, NICHT DER GIPFEL.
     * Erste Fassung zaehlte alle Umkehrpunkte und zog einen ab. Eine M-foermige R-Zacke hat
     * aber DREI Extrema (Gipfel - Tal - Gipfel) und haette damit ZWEI Kerben ergeben, obwohl
     * es eine ist. Gezaehlt wird deshalb genau das, was die Definition meint: die zusaetzliche
     * Auslenkung INNERHALB des Komplexes - bei positivem Hauptausschlag also die
     * Zwischen-MINIMA, bei negativem die Zwischen-MAXIMA. Wer die Grundlinie durchquert, ist
     * keine Kerbe, sondern eine eigene Zacke (R', S).
     */
    var positiv = (hoch >= Math.abs(tief));
    var kerben = 0, letzteRichtung = 0, letztesExtrem = werte[qb];
    for (i = qb + 1; i <= qe; i++) {
      var a = werte[i], b = werte[i - 1];
      if (a == null || b == null) continue;
      var richtung = (a > b) ? 1 : (a < b ? -1 : 0);
      if (richtung === 0) continue;
      if (letzteRichtung !== 0 && richtung !== letzteRichtung) {
        // b ist ein Extrem: Minimum wenn es jetzt wieder steigt, sonst Maximum.
        var istMinimum = (richtung === 1);
        var zaehlt = positiv ? istMinimum : !istMinimum;
        var tiefGenug = Math.abs(b - letztesExtrem) >= mindest;
        var ohneNulldurchgang = !((b > 0 && letztesExtrem < 0) || (b < 0 && letztesExtrem > 0));
        if (zaehlt && tiefGenug && ohneNulldurchgang) kerben++;
        letztesExtrem = b;
      }
      letzteRichtung = richtung;
    }
    return {
      beginn: qb, ende: qe,
      rAmp: hoch, sAmp: tief,
      rAmpMv: inMv(hoch), sAmpMv: inMv(Math.abs(tief)),
      polaritaet: (hoch >= Math.abs(tief)) ? 'positiv' : 'negativ',
      rsVerhaeltnis: (Math.abs(tief) > 0) ? Math.round(hoch / Math.abs(tief) * 100) / 100 : null,
      kerben: kerben,
      kerbMassMv: kalibriert,
    };
  }

  /*
   * SCHLAGVERGLEICH ueber Kreuzkorrelation.
   * Vorlage ist der punktweise MEDIAN aller an der R-Zacke ausgerichteten Schlaege - der
   * Median wird von der Mehrheitsform bestimmt, ein paar abweichende Schlaege kippen ihn
   * nicht (ein Mittelwert wuerde von einer grossen Extrasystole verzogen).
   * Aufnahmekriterium r >= 0,95 gegen die Vorlage; darunter gilt ein Schlag als FORMFREMD.
   */
  function korrelation(a, b) {
    var n = Math.min(a.length, b.length), i, sa = 0, sb = 0;
    if (n < 4) return 0;
    for (i = 0; i < n; i++) { sa += a[i]; sb += b[i]; }
    var ma = sa / n, mb = sb / n, za = 0, na = 0, nb = 0;
    for (i = 0; i < n; i++) {
      var da = a[i] - ma, db = b[i] - mb;
      za += da * db; na += da * da; nb += db * db;
    }
    if (na <= 0 || nb <= 0) return 0;
    return za / Math.sqrt(na * nb);
  }

  /* ==================================================================================
   * SCHLAEGE MUESSEN VOR DEM VERGLEICH AUSGERICHTET WERDEN (Befund 11.08.2026)
   *
   * Die Zackensuche trifft die R-Spitze auf einen Abtastwert genau - und der liegt bei jedem
   * Schlag ein bisschen anders im Raster, weil Herzzyklus und Abtasttakt nicht aufgehen.
   * Bei 250 Hz sind das bis zu 4 ms Versatz. Auf einem SCHMALEN Komplex (Katze, 35 ms) ist
   * das ein Achtel der Breite, und die Kreuzkorrelation faellt dadurch unter 0,95, obwohl
   * die Form dieselbe ist.
   *
   * Gemessen an einem vollkommen regelmaessigen Katzenstreifen mit 180/min: die Auswertung
   * meldete einen TRIGEMINUS - jeder dritte Schlag galt als formfremd, weil die Schwebung
   * zwischen Zyklus und Abtasttakt gerade jeden dritten traf. Ein erfundener Rhythmusbefund
   * aus reiner Abtastung; auf einem echten Streifen passiert dasselbe.
   *
   * Deshalb wird jeder Schlag gegen die Vorlage in einem Fenster von +-2 Abtastwerten
   * verschoben und die BESTE Uebereinstimmung genommen. Das ist das uebliche Vorgehen beim
   * Schlagvergleich und aendert an einer wirklich anderen Form nichts: ein ventrikulaerer
   * Komplex passt auch verschoben nicht.
   * ================================================================================== */
  /* DIE VERSCHIEBUNG MUSS FEINER SEIN ALS EIN ABTASTWERT (nachgemessen 11.08.2026).
   * Mit ganzzahligen Schritten blieb der Fehlbefund bestehen: 16 von 48 Katzenschlaegen
   * galten weiter als formfremd, kleinste Korrelation 0,894, bei identischer QRS-Breite.
   * Der Grund ist ein UNTERabtastiger Versatz - Herzzyklus und Abtasttakt gehen nicht auf,
   * die R-Spitze liegt mal auf, mal zwischen zwei Rasterpunkten. Ein ganzzahliger Schritt
   * kann das nicht ausgleichen. Deshalb wird in Vierteln eines Abtastwerts verschoben und
   * zwischen den Nachbarwerten geradlinig gemittelt. */
  var FORM_SCHIEBUNG = 2;
  var FORM_SCHRITT = 0.25;
  function korrelationVerschoben(werte, r, vorlage, vor, nach) {
    var beste = -2, s, j2;
    for (s = -FORM_SCHIEBUNG; s <= FORM_SCHIEBUNG + 1e-9; s += FORM_SCHRITT) {
      var a = r + s - vor, b2 = r + s + nach;
      if (a < 1 || b2 >= werte.length - 1) continue;
      var blk = [];
      for (j2 = 0; j2 < vorlage.length; j2++) {
        var pos = a + j2, i0 = Math.floor(pos), f = pos - i0;
        var v0 = werte[i0] == null ? 0 : werte[i0];
        var v1 = werte[i0 + 1] == null ? 0 : werte[i0 + 1];
        blk.push(v0 + (v1 - v0) * f);
      }
      var k = korrelation(blk, vorlage);
      if (k > beste) beste = k;
    }
    return beste;
  }
  function formVergleich(werte, zacken, hz, breitenJe) {
    var vor = Math.round(hz * 0.06), nach = Math.round(hz * 0.08);
    var breite = vor + nach + 1;
    var bloecke = [], i, j;
    for (i = 0; i < zacken.length; i++) {
      var r = zacken[i];
      if (r - vor - FORM_SCHIEBUNG < 0 || r + nach + FORM_SCHIEBUNG >= werte.length) continue;
      var b = [];
      for (j = r - vor; j <= r + nach; j++) b.push(werte[j] == null ? 0 : werte[j]);
      bloecke.push({ idx: i, r: r, w: b });
    }
    if (bloecke.length < 3) return { messbar: false, warum: 'zu wenige vollständige Komplexe für einen Formvergleich' };
    /* ---------------------------------------------------------------------------------
     * DIE VORLAGE IST DIE GROESSTE FORMKLASSE, NICHT DER MEDIAN ALLER SCHLAEGE
     * (Befund beim Schreiben von tools/rhythmus-test.js, 10.08.2026)
     *
     * Vorher war die Vorlage der punktweise Median ueber ALLE Schlaege. Bei einem BIGEMINUS
     * ist aber jeder zweite Schlag ektop - der Median lief damit genau zwischen den beiden
     * Formen hindurch, und BEIDE korrelierten mit ihm ueber 0,95. Gemessen an einem
     * synthetischen Bigeminus mit 10 schmalen und 10 breiten Komplexen: kleinste Korrelation
     * 0,956, also NULL formfremde Schlaege. Der haeufigste und klinisch bedeutsamste Fall
     * von Ektopie war der einzige, den der Formvergleich nicht sehen konnte.
     *
     * Jetzt werden zuerst ALLE Schlaege in Formklassen sortiert; die groesste ist die
     * Vorlage. Bei zwei etwa gleich grossen Klassen (genau der 50:50-Fall des Bigeminus)
     * entscheidet die QRS-BREITE: der schmalere Komplex ist der uebergeleitete, der breitere
     * der ventrikulaere. Das ist keine Bequemlichkeit, sondern das Kriterium selbst.
     * --------------------------------------------------------------------------------- */
    var klassenAlle = [];
    for (i = 0; i < bloecke.length; i++) {
      var trifft = -1;
      for (j = 0; j < klassenAlle.length; j++) {
        if (korrelationVerschoben(werte, bloecke[i].r, klassenAlle[j].w, vor, nach) >= 0.95) { trifft = j; break; }
      }
      if (trifft < 0) klassenAlle.push({ w: bloecke[i].w, mitglieder: [i] });
      else klassenAlle[trifft].mitglieder.push(i);
    }
    function breiteDerKlasse(kl) {
      if (!breitenJe) return null;
      var b = [];
      for (var q = 0; q < kl.mitglieder.length; q++) {
        var bw = breitenJe[bloecke[kl.mitglieder[q]].idx];
        if (endlich(bw)) b.push(bw);
      }
      return b.length ? median(b) : null;
    }
    klassenAlle.sort(function (a, b) { return b.mitglieder.length - a.mitglieder.length; });
    var domIdx = 0;
    if (klassenAlle.length > 1 &&
        klassenAlle[1].mitglieder.length >= klassenAlle[0].mitglieder.length * 0.8) {
      var b0 = breiteDerKlasse(klassenAlle[0]), b1 = breiteDerKlasse(klassenAlle[1]);
      if (b0 != null && b1 != null && b1 < b0) domIdx = 1;
    }
    var dom = klassenAlle[domIdx];
    /* WENN KEINE FORM UEBERWIEGT, GIBT ES KEINE VORLAGE — und dann auch keine Aussage.
     * Bei einem stark gestoerten Streifen aehnelt kein Schlag dem anderen; jeder wird zu
     * seiner eigenen Klasse, die groesste haette einen einzigen Schlag, und alle uebrigen
     * waeren "formfremd". Daraus wuerde eine multiforme Ektopie mit 95 % Anteil - der
     * gefaehrlichste denkbare Fehlbefund aus reinem Rauschen. Ein Drittel ist die Grenze:
     * ein Bigeminus (50 %) bleibt darueber, ein zerfallener Streifen nicht. */
    if (dom.mitglieder.length < 2 || dom.mitglieder.length / bloecke.length <= 0.34) {
      return { messbar: false, schlaege: bloecke.length,
        warum: 'kein Schlag gleicht dem anderen (größte Formgruppe nur ' + dom.mitglieder.length +
          ' von ' + bloecke.length + ') — für einen Formvergleich braucht es eine überwiegende Form. ' +
          'Meist ist der Streifen gestört; Elektrodensitz und Kontakt prüfen.' };
    }
    // Vorlage: punktweiser Median INNERHALB der dominanten Klasse
    var vorlage = [];
    for (j = 0; j < breite; j++) {
      var spalte = [];
      for (i = 0; i < dom.mitglieder.length; i++) spalte.push(bloecke[dom.mitglieder[i]].w[j]);
      vorlage.push(median(spalte));
    }
    var fremd = [], konform = 0, rWerte = [];
    for (i = 0; i < bloecke.length; i++) {
      var rk = korrelationVerschoben(werte, bloecke[i].r, vorlage, vor, nach);
      rWerte.push(Math.round(rk * 1000) / 1000);
      if (rk >= 0.95) konform++; else fremd.push(bloecke[i]);
    }
    /* WIEVIELE VERSCHIEDENE fremde Formen? Die fremden Schlaege werden untereinander
     * verglichen: was zueinander passt (r >= 0,95), ist dieselbe Form. Eine Form =
     * UNIFORME Ektopie (ein Ursprungsort), mehrere = MULTIFORME (mehrere Orte) - das ist
     * klinisch der Unterschied. */
    var klassen = [];
    for (i = 0; i < fremd.length; i++) {
      var passt = -1;
      for (j = 0; j < klassen.length; j++) {
        if (korrelationVerschoben(werte, fremd[i].r, klassen[j].w, vor, nach) >= 0.95) { passt = j; break; }
      }
      if (passt < 0) klassen.push({ w: fremd[i].w, n: 1 });
      else klassen[passt].n++;
    }
    /* WELCHE Schlaege fremd sind, nicht nur wieviele (10.08.2026). Ohne die Indizes laesst
     * sich das MUSTER nicht bestimmen - und ob die fremden Schlaege einzeln liegen, jeden
     * zweiten treffen (Bigeminus) oder vier hintereinander stehen (Salve), ist genau der
     * Unterschied, an dem die klinische Bedeutung haengt. */
    var fremdIdx = [];
    for (i = 0; i < fremd.length; i++) fremdIdx.push(fremd[i].idx);
    return {
      messbar: true,
      schlaege: bloecke.length,
      konform: konform,
      fremd: fremd.length,
      fremdIdx: fremdIdx,
      fremdAnteil: Math.round(fremd.length / bloecke.length * 100),
      formen: klassen.length,                       // Zahl verschiedener fremder Formen
      rMin: Math.min.apply(null, rWerte),
      vorlage: vorlage,
    };
  }

  /* ================================================================================ *
   * 4e) MUSTER IM SCHLAGVERBAND  (10.08.2026)
   *
   * WARUM ES DIESEN ABSCHNITT GIBT: Bis hierher konnte die Station sagen "es gibt
   * vorzeitige, formfremde Schlaege" und "sie haben eine oder mehrere Formen". Was sie
   * NICHT sagen konnte, ist genau das, woran sich die klinische Bedeutung entscheidet:
   * WIE die fremden Schlaege im Streifen liegen. Ein Einzelner alle paar Sekunden ist
   * etwas anderes als jeder zweite Schlag (Bigeminus) und wieder etwas anderes als vier
   * hintereinander (Salve). Die Lehrbuecher gliedern genau danach.
   *
   * ALLE FUNKTIONEN HIER SIND REINE RECHNUNGEN AUF DEN ZACKEN-INDIZES. Sie behaupten
   * nichts, sie zaehlen - die Deutung passiert eine Ebene hoeher und traegt dort ihre
   * Sicherheit und ihre Quelle.
   * ================================================================================ */

  /* Artabhaengige Schwellen der Rhythmusdeutung.
   *
   * qrsBreit: ab wann ein Kammerkomplex als VERBREITERT gilt. Vorher stand hier EINE feste
   * Zahl (80 ms) fuer alle Arten - beim Hund liegt die Artgrenze bei 60-65 ms, bei der
   * Katze bei 40. Ein Katzen-QRS von 60 ms ist um die Haelfte zu breit und waere mit der
   * festen Grenze als schmal durchgegangen; damit waere eine ventrikulaere Tachykardie der
   * Katze als supraventrikulaer eingestuft worden. Genommen ist jeweils die Artgrenze mit
   * einem Zuschlag, damit eine Messunschaerfe von 4 ms (250 Hz) nicht schon reicht.
   *
   * pauseS: ab welcher absoluten Pausenlaenge von einer "langen Pause" gesprochen wird.
   * Die Katze hat die kuerzeren Grundabstaende, dort faellt eine Pause frueher ins Gewicht. */
  var R_ART = {
    hund:     { qrsBreit: 70,  pauseS: 2.0 },
    katze:    { qrsBreit: 50,  pauseS: 1.6 },
    pferd:    { qrsBreit: 180, pauseS: 4.0 },
    standard: { qrsBreit: 70,  pauseS: 2.0 }
  };
  function rArt(art) { return R_ART[art] || R_ART.standard; }

  /*
   * PAUSEN. Zwei Groessen entscheiden: das VERHAELTNIS zum uebrigen Abstand (ein
   * ausgefallener Kammerkomplex ergibt etwa das Doppelte) und die ABSOLUTE Laenge (ab
   * einigen Sekunden ist eine Pause unabhaengig vom Verhaeltnis bedeutsam).
   * "etwa doppelt" ist bewusst ein Band (1,8 bis 2,4) und keine Zahl: die Sinusfrequenz
   * schwankt atemabhaengig, ein exaktes 2,0 gibt es am lebenden Tier nicht.
   */
  function pausen(rrMs, art) {
    if (!rrMs || rrMs.length < 2) return { messbar: false };
    var A = rArt(art);
    var mittel = median(rrMs), i;
    if (!(mittel > 0)) return { messbar: false };
    var maxMs = rrMs[0], maxIdx = 0;
    for (i = 1; i < rrMs.length; i++) if (rrMs[i] > maxMs) { maxMs = rrMs[i]; maxIdx = i; }
    var verhaeltnis = maxMs / mittel;
    var doppelt = 0, ueberlang = 0;
    for (i = 0; i < rrMs.length; i++) {
      var v = rrMs[i] / mittel;
      if (v >= 1.8 && v <= 2.4) doppelt++;
      if (rrMs[i] >= A.pauseS * 1000) ueberlang++;
    }
    return {
      messbar: true,
      mittelMs: Math.round(mittel),
      maxMs: Math.round(maxMs), maxIndex: maxIdx,
      verhaeltnis: Math.round(verhaeltnis * 100) / 100,
      ausfallAehnlich: doppelt,        // Pausen von etwa doppelter Laenge
      ueberlang: ueberlang,            // Pausen ueber der artabhaengigen Sekundengrenze
      grenzeS: A.pauseS
    };
  }

  /*
   * MUSTER DER FORMFREMDEN SCHLAEGE.
   *   fremdIdx  Indizes (in der Zackenreihe) der Schlaege, die formfremd sind
   *   n         Zahl der verglichenen Schlaege
   * Erkannt wird, was ohne weitere Annahme aus der REIHENFOLGE folgt:
   *   Bigeminus   jeder zweite Schlag fremd
   *   Trigeminus  jeder dritte
   *   Couplet     zwei fremde unmittelbar hintereinander
   *   Triplett    drei
   *   Salve       vier oder mehr in Folge  (ab hier sprechen die Werke von einer Salve
   *               bzw. bei entsprechender Frequenz von einer ventrikulaeren Tachykardie)
   * Ein Muster wird nur benannt, wenn es sich WIEDERHOLT (mindestens zwei Perioden) - ein
   * einzelnes "fremd, normal, fremd" ist noch kein Bigeminus.
   */
  function ektopieMuster(fremdIdx, n, opts) {
    if (!fremdIdx || !fremdIdx.length || !n) return { messbar: false };
    opts = opts || {};
    var ist = {}, i;
    for (i = 0; i < fremdIdx.length; i++) ist[fremdIdx[i]] = true;
    /* Laufen: aufeinanderfolgende fremde Schlaege zusammenfassen. */
    var laeufe = [], k = 0;
    var sortiert = fremdIdx.slice().sort(function (a, b) { return a - b; });
    while (k < sortiert.length) {
      var von = sortiert[k], laenge = 1;
      while (k + 1 < sortiert.length && sortiert[k + 1] === sortiert[k] + 1) { k++; laenge++; }
      laeufe.push({ von: von, laenge: laenge });
      k++;
    }
    var couplets = 0, tripletts = 0, salven = [], einzeln = 0, laengste = 0;
    for (i = 0; i < laeufe.length; i++) {
      var L = laeufe[i].laenge;
      if (L > laengste) laengste = L;
      if (L === 1) einzeln++;
      else if (L === 2) couplets++;
      else if (L === 3) tripletts++;
      else salven.push(laeufe[i]);
    }
    /* Bigeminus/Trigeminus: die Abstaende ZWISCHEN den fremden Schlaegen sind konstant 2
     * bzw. 3. Verlangt werden mindestens drei fremde Schlaege in diesem Takt, also zwei
     * vollstaendige Perioden - sonst ist jede zufaellige Folge ein "Bigeminus". */
    function taktreihe(schritt) {
      var beste = 0, lauf, j;
      for (i = 0; i < sortiert.length; i++) {
        lauf = 1;
        for (j = i; j + 1 < sortiert.length; j++) {
          if (sortiert[j + 1] - sortiert[j] === schritt) lauf++; else break;
        }
        if (lauf > beste) beste = lauf;
      }
      return beste;
    }
    var bi = taktreihe(2), tri = taktreihe(3);
    return {
      messbar: true,
      fremd: fremdIdx.length, verglichen: n,
      anteil: Math.round(fremdIdx.length / n * 100),
      einzeln: einzeln, couplets: couplets, tripletts: tripletts,
      salven: salven.length, laengsterLauf: laengste,
      bigeminusLaeufe: bi >= 3 ? bi : 0,
      trigeminusLaeufe: tri >= 3 ? tri : 0,
      /* DIE BREITE DER FREMDEN SCHLAEGE, nicht die des ganzen Streifens (Befund beim
       * Schreiben des Selbsttests 10.08.2026): eine Salve von vier breiten Komplexen in
       * einem sonst schmalen Sinusstreifen laesst den MEDIAN der QRS-Breite schmal - genau
       * die Salve, um die es geht, waere damit als "schmal" durchgegangen und nicht als
       * ventrikulaer erkannt worden. Beurteilt werden muss der fremde Schlag selbst. */
      qrsFremdMs: endlich(opts.qrsFremdMs) ? opts.qrsFremdMs : null,
      qrsNormalMs: endlich(opts.qrsNormalMs) ? opts.qrsNormalMs : null
    };
  }

  /*
   * ELEKTRISCHER ALTERNANS: die Hoehe des Kammerkomplexes wechselt von Schlag zu Schlag,
   * waehrend der Rhythmus regelmaessig bleibt. Das ist ein belegtes Zeichen eines
   * Perikardergusses (das Herz schwingt im Erguss).
   *
   * DREI BEDINGUNGEN, und alle drei sind noetig:
   *   1. REGELMAESSIGER Rhythmus. Bei wechselnden Abstaenden wechselt die Hoehe ohnehin
   *      (unterschiedliche Fuellung) - dann waere jede Sinusarrhythmie ein Alternans.
   *   2. Der Wechsel muss ABWECHSELN, nicht nur schwanken: mindestens 80 % der Uebergaenge
   *      wechseln die Richtung.
   *   3. Der Unterschied muss deutlich sein. Die Werke nennen ~10 % Hoehenunterschied als
   *      Schwelle; hier wird 15 % verlangt, weil eine einkanalige Messung mit Atmung
   *      allein schon einige Prozent schwankt.
   * Ohne diese Zurueckhaltung meldete die Anwendung bei jedem atmenden Hund einen
   * Perikarderguss-Verdacht.
   */
  function alternans(werte, zacken, rrMs) {
    if (!zacken || zacken.length < 6 || !rrMs || rrMs.length < 5) {
      return { messbar: false, warum: 'zu wenige Schläge für einen Höhenvergleich' };
    }
    var mittelRR = median(rrMs), i;
    if (!(mittelRR > 0)) return { messbar: false };
    var kleinste = rrMs[0], groesste = rrMs[0];
    for (i = 1; i < rrMs.length; i++) {
      if (rrMs[i] < kleinste) kleinste = rrMs[i];
      if (rrMs[i] > groesste) groesste = rrMs[i];
    }
    var schwankung = (groesste - kleinste) / mittelRR;
    if (schwankung > 0.15) {
      return { messbar: false, warum: 'Rhythmus zu unregelmäßig (' + Math.round(schwankung * 100) +
        ' %) — Höhenunterschiede sind dann nicht als Alternans zu deuten' };
    }
    var hoehen = [];
    for (i = 0; i < zacken.length; i++) {
      var w = werte[zacken[i]];
      hoehen.push(w == null ? 0 : Math.abs(w));
    }
    var mh = 0;
    for (i = 0; i < hoehen.length; i++) mh += hoehen[i];
    mh /= hoehen.length;
    if (!(mh > 0)) return { messbar: false };
    var wechselN = 0;
    for (i = 0; i + 1 < hoehen.length; i++) {
      var a = hoehen[i] - mh, b = hoehen[i + 1] - mh;
      if ((a < 0 && b > 0) || (a > 0 && b < 0)) wechselN++;
    }
    var gerade = [], ungerade = [];
    for (i = 0; i < hoehen.length; i++) (i % 2 === 0 ? gerade : ungerade).push(hoehen[i]);
    var hg = median(gerade), hu = median(ungerade);
    var gross = Math.max(hg, hu), klein = Math.min(hg, hu);
    var unterschied = gross > 0 ? (gross - klein) / gross : 0;
    var wechselAnteil = wechselN / (hoehen.length - 1);
    return {
      messbar: true,
      vorhanden: (wechselAnteil >= 0.8 && unterschied >= 0.15),
      unterschied: Math.round(unterschied * 100),
      wechselAnteil: Math.round(wechselAnteil * 100),
      regelmaessig: Math.round(schwankung * 100)
    };
  }

  /*
   * P-WELLEN IN DER PAUSE — der einzige Weg, "ausgefallener Kammerkomplex" von
   * "Sinusarrest" zu trennen, und die Grundlage jeder Aussage ueber einen AV-Block.
   *
   *   Vorhof schlaegt, Kammer nicht   -> P in der Pause  -> AV-Blockierung
   *   Vorhof schlaegt auch nicht      -> keine P         -> Sinusarrest / SA-Block
   *
   * Gesucht wird NUR in Pausen, die deutlich laenger sind als der uebrige Abstand
   * (>= 1,5-fach). Das ist Absicht: eine Suche ueber den ganzen Streifen wuerde T-Wellen
   * mitzaehlen, und dann stuende hier eine Vorhoffrequenz, die es nicht gibt.
   *
   * WAS DIESE FUNKTION NICHT KANN und was deshalb dabeisteht: eine P-Welle, die IN einer
   * T-Welle verborgen liegt, findet sie nicht. Ein negativer Befund heisst also
   * "nicht nachweisbar", nicht "nicht vorhanden".
   */
  function pausenP(werte, zacken, hz, schwelle, art, rrMs) {
    if (!zacken || zacken.length < 3 || !rrMs || rrMs.length < 2 || !hz) {
      return { messbar: false, warum: 'zu wenige Schläge' };
    }
    var mittel = median(rrMs);
    if (!(mittel > 0)) return { messbar: false };
    var A = pArt(art);
    var pausenGefunden = 0, mitP = 0, pGesamt = 0, i;
    for (i = 0; i < rrMs.length; i++) {
      if (rrMs[i] < mittel * 1.5) continue;
      pausenGefunden++;
      /* Fenster: vom Ende des T-Fensters des vorigen Schlages bis kurz vor den naechsten
       * QRS. Der Anfang laesst die T-Welle aus, das Ende die naechste regulaere P. */
      var von = zacken[i] + Math.round(hz * 0.20);
      var bis = zacken[i + 1] - Math.round(hz * A.wHinten);
      if (bis - von < Math.round(hz * 0.05)) continue;
      /* Auslenkungen zaehlen, die ueber der P-Schwelle liegen und die Dauer einer P haben. */
      var n = 0, j = von;
      while (j <= bis) {
        var v = werte[j];
        if (v != null && Math.abs(v) >= schwelle) {
          var gi = j, beste = Math.abs(v);
          while (j <= bis && werte[j] != null && Math.abs(werte[j]) >= schwelle) {
            if (Math.abs(werte[j]) > beste) { beste = Math.abs(werte[j]); gi = j; }
            j++;
          }
          var dauer = 0, b = gi, e = gi, schw = beste * 0.2, k2;
          for (k2 = gi; k2 >= von && werte[k2] != null && Math.abs(werte[k2]) >= schw; k2--) b = k2;
          for (k2 = gi; k2 <= bis && werte[k2] != null && Math.abs(werte[k2]) >= schw; k2++) e = k2;
          dauer = (e - b) / hz * 1000;
          if (dauer >= A.dauer[0] && dauer <= A.dauer[1]) n++;
        } else j++;
      }
      if (n > 0) { mitP++; pGesamt += n; }
    }
    if (!pausenGefunden) return { messbar: false, warum: 'keine Pause im Streifen' };
    return {
      messbar: true,
      pausen: pausenGefunden,
      pausenMitP: mitP,
      pWellen: pGesamt,
      deutung: mitP > 0 ? 'vorhof-schlaegt-weiter' : 'keine-p-nachweisbar'
    };
  }

  /* ------------------------------------------------------------------ *
   * 5) Rhythmus aus den RR-Abstaenden
   *
   * Bewusst zurueckhaltend: benannt wird nur, was aus RR-Abstaenden und QRS-Breite wirklich
   * folgt. "Vorhofflimmern" etwa braucht die P-Wellen-Beurteilung - hier steht deshalb
   * "unregelmaessig, Ursache offen" statt einer Diagnose, die der Streifen nicht hergibt.
   * ------------------------------------------------------------------ */
  function rhythmus(rrMs, qrsMs, bandHr, opts) {
    if (rrMs.length < MIN_SCHLAEGE - 1) {
      return { id: null, name: 'nicht beurteilbar', sicherheit: 'keine', begruendung: 'zu wenige Herzschläge im Streifen' };
    }
    var mittel = median(rrMs);
    var hf = mittel > 0 ? Math.round(60000 / mittel) : null;
    /*
     * SCHWANKUNG ueber die SPANNWEITE, nicht ueber den Median der Abstandsunterschiede.
     * Der Median ist unempfindlich gegen Ausreisser - genau deshalb war er hier falsch: eine
     * EINZELNE Extrasystole IST der Ausreisser. Im Selbsttest (22.07.2026) blieb die Schwankung
     * bei 0 %, obwohl die Abstaende zwischen 598 und 1000 ms lagen, und der Befund lautete
     * beruhigend "regelmaessig".
     */
    var i, kleinste = rrMs[0], groesste = rrMs[0];
    for (i = 1; i < rrMs.length; i++) { if (rrMs[i] < kleinste) kleinste = rrMs[i]; if (rrMs[i] > groesste) groesste = rrMs[i]; }
    var schwankung = mittel > 0 ? ((groesste - kleinste) / mittel) : 0;
    /*
     * Vorzeitige Schlaege: deutlich kuerzerer Abstand als der Mittelwert - ABER nur zaehlen, wenn
     * der vorgezogene Schlag auch die Hoehe eines echten QRS hat.
     *
     * Ohne diese Pruefung meldete ein verrauschter, voellig regelmaessiger Streifen im Selbsttest
     * (22.07.2026) "vorzeitige Schlaege": eine Rauschspitze wird als Zacke gezaehlt und verkuerzt
     * damit rechnerisch einen Abstand. Eine erfundene Extrasystole ist schlimmer als keine Aussage -
     * sie verleitet zu einer Behandlung.
     */
    var vorzeitig = 0;
    for (i = 0; i < rrMs.length; i++) {
      if (rrMs[i] >= mittel * 0.8) continue;
      /*
       * KOMPENSATORISCHE PAUSE VERLANGEN.
       * Ein vorgezogener Schlag entlaedt das Herz frueh; der naechste regulaere Schlag faellt in
       * die Refraktaerzeit aus, und es entsteht eine PAUSE. Kurz-lang ist das Kennzeichen der
       * Extrasystole. Ein blosses "einmal kuerzer" ist es nicht: im Selbsttest (22.07.2026)
       * erzeugte RAUSCHEN in 5 von 12 Laeufen eine zusaetzliche Zacke und damit einen verkuerzten
       * Abstand - die Station meldete Extrasystolen in einem voellig regelmaessigen Streifen.
       * Eine erfundene Extrasystole verleitet zu einer Behandlung; deshalb wird hier das
       * vollstaendige Muster verlangt und im Zweifel geschwiegen.
       */
      var pauseDanach = (i + 1 < rrMs.length) ? rrMs[i + 1] : null;
      if (pauseDanach == null) continue;               // am Streifenrand nicht beurteilbar
      if (pauseDanach <= mittel * 1.1) continue;       // keine Pause -> kein sicherer Hinweis
      vorzeitig++;
    }

    /*
     * "VERBREITERT" IST ARTABHAENGIG (berichtigt 10.08.2026).
     * Hier stand eine feste Grenze von 80 ms fuer jede Tierart. Beim Hund liegt die Artgrenze
     * bei 60-65 ms, bei der Katze bei 40 - ein Katzen-Kammerkomplex von 60 ms ist also um die
     * Haelfte zu breit und waere mit der festen Grenze als SCHMAL durchgegangen. Damit haette
     * die Anwendung eine ventrikulaere Tachykardie der Katze als supraventrikulaer eingeordnet;
     * das ist genau die Verwechslung, an der die Behandlung haengt.
     */
    var A = rArt(opts && opts.art);
    var breit = endlich(qrsMs) && qrsMs > A.qrsBreit;

    var guete = (opts && endlich(opts.guete)) ? opts.guete : 99;
    var p = (opts && opts.p) || null;                    // pAuswertung
    var muster = (opts && opts.muster) || null;          // ektopieMuster
    var pau = (opts && opts.pausen) || null;             // pausen()
    var pP = (opts && opts.pausenP) || null;             // pausenP()
    var pSicher = !!(p && p.messbar && p.vorhanden);
    /* ==================================================================================
     * EIN ZUGESCHALTETER FILTER DARF KEINE FEHLENDE P-WELLE ERZEUGEN (10.08.2026)
     *
     * Aus der Fachliteratur: "Filter sind grundsaetzlich nicht zu empfehlen: sie
     * unterdruecken zwar Stoerungen, verkleinern aber gleichzeitig die P-QRS-T-Ausschlaege,
     * sodass kleine P-Wellen unterdrueckt und nicht mehr sichtbar sind." Genau darauf
     * beruhen aber die schwersten Aussagen dieser Datei: Vorhofflimmern und der
     * idioventrikulaere Rhythmus werden ueber das FEHLEN der P begruendet. Ohne diese
     * Sperre koennte die Anwendung ein Vorhofflimmern melden, das ihr eigener Filter
     * erzeugt hat - dieselbe Falle, die bei den Amplituden schon einmal zugeschlagen hat.
     * ================================================================================== */
    var filterAktiv = !!(opts && opts.filterAktiv);
    var pFehlt = !filterAktiv && !!(p && p.messbar === false && endlich(p.anteil) && p.anteil < 40);
    var sauber = guete >= 5;

    /* ---------------------------------------------------------------------------------
     * REIHENFOLGE: das Dringlichste zuerst, und in jeder Stufe nur, was der Streifen
     * WIRKLICH hergibt. Jede neue Stufe traegt ihre Bedingung im Text mit - der
     * Untersucher soll nachvollziehen koennen, WORAUF sich die Aussage stuetzt.
     * --------------------------------------------------------------------------------- */

    /* (1) SALVE / VENTRIKULAERE TACHYKARDIE.
     * Vier und mehr formfremde Schlaege in Folge sind eine Salve; haelt sie ueber 30 s an,
     * spricht man von anhaltender ventrikulaerer Tachykardie - das kann ein 10-s-Streifen
     * nicht entscheiden, und genau das steht dann da. */
    /* Beurteilt wird die Breite der FREMDEN Schlaege, nicht der Median des Streifens -
     * sonst faellt eine kurze Salve in einem sonst schmalen Sinusstreifen durch. */
    var fremdBreit = !!(muster && endlich(muster.qrsFremdMs) && muster.qrsFremdMs > A.qrsBreit);
    if (sauber && muster && muster.messbar && muster.laengsterLauf >= 4 && (fremdBreit || breit)) {
      return { id: 'vtach', name: 'Salve breiter Kammerkomplexe (ventrikuläre Tachykardie)',
        sicherheit: 'Verdacht',
        begruendung: muster.laengsterLauf + ' formfremde, verbreiterte Komplexe (' +
          (muster.qrsFremdMs != null ? muster.qrsFremdMs : qrsMs) +
          ' ms) unmittelbar hintereinander' +
          '. Ob sie ANHALTEND ist (über 30 s), lässt dieser Streifen nicht entscheiden — ' +
          'Puls und Blutdruck am Tier prüfen.' };
    }
    /* "SCHNELL UND BREIT" IST KEINE VT, WENN ES EIN BIGEMINUS IST (Befund 10.08.2026).
     * Bei einem Bigeminus zaehlt die Erkennung ALLE Komplexe - Sinusschlag und Extrasystole -
     * und kommt damit auf die doppelte Frequenz; der Median der QRS-Breite liegt zwischen dem
     * schmalen und dem breiten Komplex und damit oft ueber der Artgrenze. Beide Bedingungen
     * waren also erfuellt, ohne dass eine ventrikulaere Tachykardie vorlag. Aufgefallen ist
     * das erst, als die QRS-Messung genauer wurde (Schwelle 15 % -> 8 %): davor war der
     * Median knapp schmal genug, und der Fehlbefund blieb zufaellig aus.
     * Ein regelmaessiger Zweier- oder Dreiertakt ist per Definition keine Salve; er wird
     * weiter unten als das benannt, was er ist. */
    var taktMuster = !!(muster && muster.messbar &&
      (muster.bigeminusLaeufe >= 3 || muster.trigeminusLaeufe >= 3));
    if (hf != null && bandHr && hf > bandHr[1] && breit && !taktMuster) {
      return { id: 'vtach', name: 'Verdacht auf ventrikuläre Tachykardie', sicherheit: 'Verdacht',
        begruendung: 'schnelle Folge (' + hf + '/min) mit verbreitertem QRS (' + qrsMs + ' ms)' };
    }

    /* (2) BREITE KOMPLEXE OHNE TACHYKARDIE = AKZELERIERTER IDIOVENTRIKULAERER RHYTHMUS.
     * Der klassische Fall nach Trauma, Milztorsion und Magendrehung. Er wird oft uebersehen,
     * weil die Frequenz unauffaellig ist - nur die BREITE und die fehlende P verraten ihn.
     * Verlangt werden: verbreiterter QRS, regelmaessige Abstaende, keine P vor den Komplexen
     * und eine Frequenz unter der Tachykardiegrenze. */
    if (sauber && breit && pFehlt && schwankung <= 0.25 && hf != null &&
        bandHr && hf <= bandHr[1] && hf >= 50) {
      return { id: 'aivr', name: 'Breite Kammerkomplexe ohne P — idioventrikulärer Rhythmus möglich',
        sicherheit: 'Verdacht',
        begruendung: 'regelmäßige Folge verbreiterter Komplexe (' + qrsMs + ' ms) mit ' + hf +
          '/min, ohne abgrenzbare P-Welle. Das Muster passt zu einem akzelerierten ' +
          'idioventrikulären Rhythmus (typisch nach Trauma, Magendrehung, Milzerkrankung) — ' +
          'er ist oft selbstlimitierend und wird nicht allein wegen der Kurve behandelt.' };
    }

    /* (3) PAUSE MIT ODER OHNE VORHOFTAETIGKEIT — der Unterschied, an dem alles haengt.
     * P in der Pause  = die Vorhoefe schlagen weiter, die Ueberleitung faellt aus (AV-Block).
     * Keine P         = auch der Vorhof schweigt (Sinusarrest / SA-Block).
     * Ohne diese Unterscheidung konnte die Station nur "ausgefallener Kammerkomplex" sagen.
     *
     * DIE SPERRE DAVOR IST DER WICHTIGERE TEIL (Befund im eigenen Selbsttest, 10.08.2026).
     * Ein BIGEMINUS erzeugt lauter kurz-lang-Paare. Der Median der RR-Abstaende faellt dabei
     * auf den KURZEN Wert (bei zehn kurzen und neun langen Abstaenden liegt die Mitte der
     * sortierten Reihe im kurzen Block), und die kompensatorische Pause steht dann rechnerisch
     * mit dem 2,3-fachen des "mittleren" Abstands da. Der erste Entwurf meldete an einem
     * sauberen synthetischen Bigeminus prompt einen SINUSARREST - eine erfundene, klinisch
     * schwerwiegende Diagnose aus einem harmlosen Rechenartefakt.
     * wechselVerdacht() erkennt genau dieses kurz-lang-Muster (gleichbleibende Paarsummen)
     * und wird hier zum Vetorecht: solange die Abstaende regelmaessig zwischen kurz und lang
     * wechseln, ist die lange Strecke die Pause NACH einem vorgezogenen Schlag und nicht der
     * Ausfall eines erwarteten. */
    var wechselMuster = !!(opts && opts.wechsel);
    if (sauber && !wechselMuster && pau && pau.messbar && pau.verhaeltnis >= 1.8 && pP && pP.messbar) {
      if (pP.deutung === 'vorhof-schlaegt-weiter') {
        var typ = (p && p.pqVerlauf === 'zunehmend')
          ? 'Die PQ-Zeit nimmt vor dem Ausfall zu — das ist das Muster des Typs Mobitz I (Wenckebach), meist vagal und gutartig.'
          : ((p && p.pqVerlauf === 'konstant')
            ? 'Die PQ-Zeit bleibt dabei konstant — das ist das Muster des Typs Mobitz II. Er sitzt unterhalb des AV-Knotens, spricht kaum auf Atropin an und kann in einen totalen Block übergehen.'
            : 'Welcher Typ vorliegt, ist aus dem PQ-Verlauf dieses Streifens nicht zu entscheiden.');
        return { id: 'avblock2', name: 'P-Welle ohne folgenden Kammerkomplex (AV-Block II°)',
          sicherheit: 'Verdacht',
          begruendung: 'In ' + pP.pausenMitP + ' von ' + pP.pausen + ' Pausen ist eine P-Welle ' +
            'nachweisbar, der KEIN Kammerkomplex folgt (längste Pause ' + pau.maxMs + ' ms gegen ' +
            pau.mittelMs + ' ms im Mittel). ' + typ };
      }
      return { id: 'sinusarrest', name: 'Pause ohne nachweisbare Vorhoftätigkeit (Sinusarrest/SA-Block)',
        sicherheit: 'Verdacht',
        begruendung: 'Pause von ' + pau.maxMs + ' ms gegen ' + pau.mittelMs + ' ms im Mittel, ' +
          'und in der Pause ist KEINE P-Welle nachweisbar. Das trennt den Sinusarrest von der ' +
          'AV-Blockierung. Achtung: eine in der T-Welle verborgene P findet diese Messung nicht — ' +
          '"nicht nachweisbar" ist nicht dasselbe wie "nicht vorhanden".' };
    }

    /* (4) VORHOFFLIMMERN. Die Werke nennen drei Merkmale zusammen: sehr unregelmaessig,
     * KEINE abgrenzbaren P-Wellen, schmaler Kammerkomplex. Sind P-Wellen zu sehen, ist es
     * KEIN Vorhofflimmern - deshalb ist pFehlt Bedingung und nicht bloss ein Zusatz.
     *
     * "UNREGELMAESSIG" HEISST HIER: DURCHGEHEND, NICHT EINMAL (Befund 10.08.2026).
     * Die Spannweite (groesster minus kleinster Abstand) reicht dafuer NICHT aus - eine
     * EINZIGE Extrasystole mit ihrer kompensatorischen Pause treibt sie ueber jede Schwelle.
     * Der alte Selbsttest der Extrasystole (tools/ekg-analyse-test.js, seit 22.07.2026)
     * schlug prompt an: aus einem Streifen mit genau einem vorzeitigen Schlag machte der
     * erste Entwurf ein "Vorhofflimmern moeglich". Das ist der gefaehrlichste Fehlbefund
     * dieser ganzen Datei - er fuehrt zu einer Behandlung.
     * Gemessen wird deshalb die AUFEINANDERFOLGENDE Aenderung - genau das, was "irregulaer
     * irregulaer" beschreibt: beim Vorhofflimmern unterscheidet sich fast jeder Abstand vom
     * vorigen, bei einer Extrasystole nur die zwei um sie herum. Am Beispiel gerechnet:
     * ein vorzeitiger Schlag unter zehn ergibt 2 von 9 Spruengen (22 %), ein Vorhofflimmern
     * rund 65 %. Die Grenze liegt bei 50 % und trennt beides deutlich.
     * Zusaetzlich mindestens acht Abstaende, damit die Quote ueberhaupt eine Aussage ist. */
    var spruenge = 0;
    for (i = 0; i + 1 < rrMs.length; i++) {
      if (Math.abs(rrMs[i + 1] - rrMs[i]) > mittel * 0.15) spruenge++;
    }
    var abwAnteil = (rrMs.length > 1) ? (spruenge / (rrMs.length - 1)) : 0;
    if (sauber && pFehlt && !breit && schwankung > 0.30 &&
        rrMs.length >= 8 && abwAnteil >= 0.5 &&
        !(muster && muster.messbar && muster.bigeminusLaeufe)) {
      return { id: 'vhf', name: 'Unregelmäßig ohne abgrenzbare P — Vorhofflimmern möglich',
        sicherheit: 'Verdacht',
        begruendung: 'Bei ' + Math.round(abwAnteil * 100) + ' % der Schläge ist der Abstand ein ' +
          'anderer als beim vorigen (Spanne ' + Math.round(schwankung * 100) + ' %), ohne erkennbares Muster; in nur ' +
          p.anteil + ' % der Schläge ist eine P-Welle abgrenzbar, ' +
          'und der Kammerkomplex ist schmal (' + qrsMs + ' ms). Das ist die Merkmalskombination ' +
          'des Vorhofflimmerns' + (hf != null ? ' (hier ' + hf + '/min)' : '') + '. Zur Sicherung ' +
          'gehört ein längerer Streifen und die Auskultation (Pulsdefizit).' };
    }

    // Ein vorzeitiger Schlag zaehlt fuer sich - er darf NICHT zusaetzlich von einer hohen
    // Gesamtschwankung abhaengen, sonst faellt die einzelne Extrasystole wieder durch.
    // Eine Extrasystolen-Aussage nur bei sauberem Signal. Bei maessiger Guete bleibt es bei der
    // reinen Messung "unregelmaessig" - das ist wahr und verleitet zu keiner Behandlung.
    if (vorzeitig > 0 && guete < 5) {
      return { id: null, name: 'unregelmäßig, Signal nur mäßig', sicherheit: 'Messung',
        begruendung: 'Abstände schwanken, aber der Ausschlag liegt nur ' + guete + '-fach über der ' +
          'Grundlinie — für die Aussage "Extrasystole" ist das zu unsicher. Elektrodensitz prüfen.' };
    }

    /* (5) BIGEMINUS / TRIGEMINUS — dasselbe Ereignis, aber in einem Takt, der klinisch
     * schwerer wiegt als vereinzelte Extrasystolen. */
    if (sauber && muster && muster.messbar && muster.bigeminusLaeufe >= 3) {
      return { id: 'bigeminus', name: 'Bigeminus — jeder zweite Schlag ist formfremd',
        sicherheit: 'Verdacht',
        begruendung: muster.bigeminusLaeufe + ' Schläge im Zweiertakt (' + muster.fremd + ' von ' +
          muster.verglichen + ' Schlägen formfremd, ' + muster.anteil + ' %)' +
          (breit ? ', dabei verbreiterter QRS ' + qrsMs + ' ms — ventrikulärer Ursprung' : '') +
          '. Ein Bigeminus halbiert den wirksamen Auswurf, wenn der eingeschobene Schlag keinen ' +
          'Puls erzeugt — deshalb den Puls am Tier zählen, nicht am Monitor.' };
    }
    if (sauber && muster && muster.messbar && muster.trigeminusLaeufe >= 3) {
      return { id: 'trigeminus', name: 'Trigeminus — jeder dritte Schlag ist formfremd',
        sicherheit: 'Verdacht',
        begruendung: muster.trigeminusLaeufe + ' Schläge im Dreiertakt (' + muster.fremd + ' von ' +
          muster.verglichen + ' Schlägen formfremd)' +
          (breit ? ', dabei verbreiterter QRS ' + qrsMs + ' ms' : '') + '.' };
    }
    if (sauber && muster && muster.messbar && (muster.couplets > 0 || muster.tripletts > 0)) {
      return { id: 'couplet', name: 'Formfremde Schläge in Paaren' + (muster.tripletts ? ' und Dreiergruppen' : ''),
        sicherheit: 'Verdacht',
        begruendung: muster.couplets + ' Paar(e)' + (muster.tripletts ? ' und ' + muster.tripletts + ' Dreiergruppe(n)' : '') +
          ' formfremder Schläge. Gehäufte und gruppierte Extrasystolen wiegen schwerer als ' +
          'vereinzelte; über Häufigkeit und Verlauf entscheidet das Langzeit-EKG, nicht der Kurzstreifen.' };
    }

    if (vorzeitig > 0) {
      return { id: 'ves', name: 'unregelmäßig mit vorzeitigen Schlägen', sicherheit: 'Verdacht',
        begruendung: vorzeitig + ' vorzeitige(r) Schlag/Schläge (kürzester Abstand ' + Math.round(kleinste) +
          ' ms gegen ' + Math.round(mittel) + ' ms im Mittel)' +
          (breit ? ', dabei verbreiterter QRS ' + qrsMs + ' ms — ventrikulärer Ursprung möglich' : '') };
    }
    /* (6) LANGE PAUSE OHNE AUSFALLMUSTER: benennen, aber nicht deuten. Auch hier gilt das
     * Veto des kurz-lang-Musters — sonst waere die kompensatorische Pause eines Bigeminus
     * eine "lange Pause zwischen zwei Schlaegen". */
    if (sauber && !wechselMuster && pau && pau.messbar && pau.ueberlang > 0) {
      return { id: 'pause', name: 'Lange Pause zwischen zwei Schlägen', sicherheit: 'Messung',
        begruendung: 'Längster Abstand ' + pau.maxMs + ' ms (über der Grenze von ' + pau.grenzeS +
          ' s für diese Tierart). Sinusarrest, Vorhofstillstand und höhergradige AV-Blockierung ' +
          'kommen in Frage; bei hohem Vagotonus (brachyzephale Rassen) auch ohne Krankheitswert.' };
    }
    if (schwankung > 0.25) {
      return { id: null, name: 'unregelmäßig, Ursache offen', sicherheit: 'Messung',
        begruendung: 'Schwankung der Abstände ' + Math.round(schwankung * 100) + ' %' +
          (p && p.messbar === false
            ? ' — und in nur ' + p.anteil + ' % der Schläge ist eine P-Welle abgrenzbar. Für ' +
              'die Unterscheidung (Vorhofflimmern, Vorhofstillstand) braucht es einen längeren, ' +
              'ruhigeren Streifen oder eine Brustwandableitung.'
            : ' bei erhaltenen P-Wellen — beim Hund ist eine atemabhängige Sinusarrhythmie ' +
              'physiologisch, bei der Katze nicht.') };
    }
    /* ---------------------------------------------------------------------------------
     * REGELMAESSIG — UND ERST DIE P-WELLE MACHT DARAUS "SINUS" (10.08.2026)
     *
     * Bis hierher hiess ein regelmaessiger Streifen schlicht "regelmaessig". Das war
     * ehrlich, aber es liess die wichtigste Zusatzinformation liegen, die inzwischen
     * gemessen wird: liegt vor JEDEM Kammerkomplex eine P-Welle? Genau das ist die
     * Definition des Sinusrhythmus, und genau daran trennt sich eine Sinustachykardie von
     * einer supraventrikulaeren Tachykardie (dort verschmilzt die P mit der vorangehenden
     * T oder fehlt). Steht keine P zur Verfuegung, bleibt es beim alten, zurueckhaltenden
     * Wortlaut - eine Sinusaussage ohne P waere eine Behauptung.
     * --------------------------------------------------------------------------------- */
    var mitP = pSicher ? ', vor jedem Kammerkomplex eine P-Welle' : '';
    var ohneP = (!pSicher && p && p.messbar === false)
      ? ' — eine P-Welle ist nicht sicher abgrenzbar, deshalb bleibt offen, ob der Rhythmus vom Sinusknoten ausgeht'
      : '';
    if (hf != null && bandHr && hf < bandHr[0]) {
      return { id: 'sinusbrady', name: pSicher ? 'Sinusbradykardie' : 'regelmäßig, langsam',
        sicherheit: 'Messung',
        begruendung: hf + '/min bei gleichmäßigen Abständen' + mitP + ohneP };
    }
    if (hf != null && bandHr && hf > bandHr[1]) {
      /* Die Abgrenzung, die ohne P-Welle unmoeglich war: bei erhaltener P vor jedem Komplex
       * ist es eine Sinustachykardie, ohne P eher supraventrikulaer. Behauptet wird nur die
       * erste Richtung; die zweite wird als Moeglichkeit genannt. */
      if (pSicher) {
        return { id: 'sinustachy', name: 'Sinustachykardie', sicherheit: 'Messung',
          begruendung: hf + '/min bei gleichmäßigen Abständen, vor jedem Kammerkomplex eine ' +
            'P-Welle. Schmerz, zu flache Narkose, Hypovolämie, Hyperkapnie, Fieber und ' +
            'Katecholamine kommen als Ursache in Frage.' };
      }
      return { id: 'sinustachy', name: 'regelmäßig, schnell', sicherheit: 'Messung',
        begruendung: hf + '/min bei gleichmäßigen Abständen' +
          (p && p.messbar === false
            ? '. Eine P-Welle ist nicht abgrenzbar — bei dieser Frequenz kann sie in der ' +
              'vorangehenden T-Welle verborgen liegen. Damit ist eine supraventrikuläre ' +
              'Tachykardie nicht auszuschließen; sie ist typischerweise starr regelmäßig ' +
              'und beginnt/endet abrupt.'
            : '') };
    }
    return { id: 'sinus', name: pSicher ? 'Sinusrhythmus' : 'regelmäßig', sicherheit: 'Messung',
      begruendung: 'gleichmäßige Abstände' + (hf != null ? ', ' + hf + '/min' : '') + mitP + ohneP };
  }

  /* ------------------------------------------------------------------ *
   * 6) Hauptfunktion
   * ------------------------------------------------------------------ */
  function analysiere(kurve, opts) {
    opts = opts || {};
    var roh = (kurve && kurve.samples) || [];
    var hz = (kurve && kurve.hz) || 0;
    var ergebnis = {
      brauchbar: false, warum: null, hz: hz, sekunden: hz ? Math.round(roh.length / hz * 10) / 10 : 0,
      schlaege: 0, hf: null, qrsBreiteMs: null, rr: null, rhythmus: null, st: null, luecken: 0,
    };
    if (!roh.length || !hz) { ergebnis.warum = 'keine Kurvendaten vom Gerät'; return ergebnis; }

    var luecken = 0;
    for (var i = 0; i < roh.length; i++) if (roh[i] == null) luecken++;
    ergebnis.luecken = luecken;
    if (luecken / roh.length > MAX_LUECKEN_ANTEIL) {
      ergebnis.warum = 'zu viele fehlende Messpunkte im Streifen (' +
        Math.round(luecken / roh.length * 100) + ' %) — meist liegt die Ableitung ab';
      return ergebnis;
    }
    if (ergebnis.sekunden < MIN_SEKUNDEN) {
      ergebnis.warum = 'Streifen zu kurz (' + ergebnis.sekunden + ' s) — für eine Rhythmusaussage sind mindestens ' + MIN_SEKUNDEN + ' s nötig';
      return ergebnis;
    }

    /* Tierart steuert Grundlinienfenster, Suchfenster und Dauerband der P-Welle. Fehlt sie,
     * wird der Kleintier-Standard genommen - beim Pferd MUSS sie gesetzt sein, sonst loescht
     * der zu kurze Grundlinienmedian die P-Welle. */
    var art = opts.art || null;
    var werte = grundlinieAbziehen(roh, hz, art === 'pferd' ? 0.6 : 0.2);
    var zacken = findeQRS(werte, hz);
    ergebnis.schlaege = zacken.length;
    if (zacken.length < MIN_SCHLAEGE) {
      ergebnis.warum = zacken.length === 0
        ? 'keine QRS-Zacken erkennbar — bei flacher Linie an Asystolie denken und den Patienten prüfen, nicht den Monitor'
        : 'nur ' + zacken.length + ' Herzschlag/Herzschläge im Streifen — zu wenig für eine Aussage';
      return ergebnis;
    }

    /*
     * SIGNALGUETE — die wichtigste Schweigeregel.
     *
     * Im Selbsttest (22.07.2026) wurde REINES RAUSCHEN als "unregelmaessig mit vorzeitigen
     * Schlaegen" gemeldet: die Zackensuche findet in Rauschen immer irgendwelche Gipfel, und die
     * Abstaende sind dann naturgemaess unregelmaessig. Aus Rauschen wurde so ein Arrhythmie-Befund -
     * die gefaehrlichste Art von Fehlalarm, weil sie zu einer Behandlung verleitet.
     *
     * Ein echter QRS ragt um ein Vielfaches aus der Grundlinie. Verhaeltnis unter 3 heisst:
     * hier ist kein verwertbares EKG, sondern Stoerung.
     */
    var spitzen = [], ruhe = [];
    var qrsNah = Math.round(hz * 0.05);
    for (i = 0; i < zacken.length; i++) {
      var wq = werte[zacken[i]];
      if (wq != null) spitzen.push(Math.abs(wq));
    }
    for (i = 0; i < werte.length; i++) {
      if (werte[i] == null) continue;
      var nah = false;
      for (var z = 0; z < zacken.length; z++) { if (Math.abs(i - zacken[z]) <= qrsNah) { nah = true; break; } }
      if (!nah) ruhe.push(Math.abs(werte[i]));
    }
    var spitze = median(spitzen), grund = median(ruhe);
    var guete = grund > 0 ? (spitze / grund) : (spitze > 0 ? 99 : 0);
    ergebnis.guete = Math.round(guete * 10) / 10;
    if (guete < 3) {
      ergebnis.brauchbar = false;
      ergebnis.warum = 'Signal zu verrauscht für eine Aussage (Ausschlag nur ' + ergebnis.guete +
        '-fach über der Grundlinie) — Elektrodensitz, Kabel und Störquellen prüfen';
      return ergebnis;
    }

    var rrMs = [];
    for (i = 1; i < zacken.length; i++) rrMs.push((zacken[i] - zacken[i - 1]) / hz * 1000);
    /* Die Breite JE SCHLAG bleibt erhalten (10.08.2026) - nicht nur ihr Median. Ohne die
     * Zuordnung Schlag -> Breite laesst sich nicht sagen, ob die FORMFREMDEN Schlaege breit
     * sind; und genau das unterscheidet die ventrikulaere von der supraventrikulaeren
     * Extrasystole. Der Index zaehlt wie in zacken, damit beides zusammenpasst. */
    /* Das Rauschmass fuer die Breitenmessung ist DASSELBE, das schon die Signalguete und die
     * P-Schwelle bestimmt - eine Zahl, damit die drei nicht auseinanderlaufen. Es steht hier
     * schon fest (grund), muss aber vor der Breitenmessung gebildet werden. */
    var rauschFuerBreite = grund;
    var breiten = [], breitenJe = [];
    for (i = 0; i < zacken.length; i++) {
      var b = qrsBreiteMs(werte, zacken[i], hz, rauschFuerBreite);
      breitenJe.push(endlich(b) ? b : null);
      if (endlich(b)) breiten.push(b);
    }
    var qrsM = breiten.length ? Math.round(median(breiten)) : null;
    var mittelRR = median(rrMs);

    ergebnis.brauchbar = true;
    ergebnis.hf = mittelRR > 0 ? Math.round(60000 / mittelRR) : null;
    ergebnis.qrsBreiteMs = qrsM;
    ergebnis.rr = {
      mittelMs: Math.round(mittelRR),
      minMs: Math.round(Math.min.apply(null, rrMs)),
      maxMs: Math.round(Math.max.apply(null, rrMs)),
    };
    /* Vor jeder Rhythmusaussage: koennte das Wechselmuster von der Erkennung selbst stammen?
     * Siehe Kopf von wechselVerdacht() - zwei Dissertationen beschreiben genau diesen Ausfall. */
    ergebnis.wechsel = wechselVerdacht(werte, zacken, rrMs);
    ergebnis.st = stMessung(werte, zacken, hz, kurve.skala, opts.einheit || 'uV');
    /*
     * P-WELLE UND PQ-ZEIT. Als Rauschmass dient dieselbe Grundlinienunruhe (grund), die schon
     * die Signalguete bestimmt - EINE Zahl, damit Guete und P-Schwelle nicht auseinanderlaufen.
     * Ist die Grundlinie exakt still (synthetisches Signal), wird ein winziger Ersatzwert aus
     * der Spitzenhoehe genommen: sonst waere die Schwelle 0 und JEDE Regung eine P.
     */
    /* Rauschmass fuer die P-Suche: das 25. PERZENTIL der Ruhestrecken, NICHT ihr Median.
     * Der Median liegt mitten in der T-Welle (siehe Kommentar bei perzentil()). */
    var pRausch = perzentil(ruhe, 0.25);
    var pSchwelle = Math.max(pRausch * 3, spitze * 0.04);
    ergebnis.p = pAuswertung(werte, zacken, hz, pRausch, spitze, kurve.skala, opts.einheit || 'uV', art);
    ergebnis.t = tAuswertung(werte, zacken, hz, pRausch, spitze, art, ergebnis.hf,
      kurve.skala, opts.einheit || 'uV');
    /* QRS-Form am REPRAESENTATIVEN Schlag (mittlerer der Reihe) und der Formvergleich ueber
     * alle Schlaege. Beides einkanalig zulaessig - im Gegensatz zur Schenkelblock-Zuordnung. */
    var kal = endlich(kurve.skala) && kurve.skala > 0 && /uv|µv|mv/i.test(String(opts.einheit || 'uV'));
    ergebnis.qrsForm = qrsForm(werte, zacken[Math.floor(zacken.length / 2)], hz, kal, kurve.skala, opts.einheit || 'uV');
    ergebnis.form = formVergleich(werte, zacken, hz, breitenJe);
    /* ---------------------------------------------------------------------------------
     * DIE REIHENFOLGE IST DER EIGENTLICHE ZUGEWINN (10.08.2026)
     *
     * Bis hierher wurde rhythmus() VOR der P-Wellen-Auswertung aufgerufen. Die P-Erkennung
     * lief also, ihr Ergebnis erschien in der Messwertspalte - aber die Rhythmusdeutung
     * bekam es nie zu sehen. Deshalb stand dort woertlich "fuer die Unterscheidung (z. B.
     * Vorhofflimmern) ist die P-Wellen-Beurteilung noetig, die dieser Streifen nicht
     * hergibt", obwohl er sie zwei Zeilen weiter unten sehr wohl hergab. Vorhofflimmern,
     * AV-Block II, Sinusarrest und die Trennung Sinus-/supraventrikulaere Tachykardie
     * haengen alle an genau dieser Information.
     * Jetzt laufen erst alle Messungen, dann die Deutung.
     * --------------------------------------------------------------------------------- */
    var fremdIdx = (ergebnis.form && ergebnis.form.messbar && ergebnis.form.fremdIdx) || [];
    var brFremd = [], brNormal = [];
    for (i = 0; i < breitenJe.length; i++) {
      if (breitenJe[i] == null) continue;
      (fremdIdx.indexOf(i) >= 0 ? brFremd : brNormal).push(breitenJe[i]);
    }
    ergebnis.muster = ektopieMuster(fremdIdx,
      (ergebnis.form && ergebnis.form.schlaege) || zacken.length,
      { qrsFremdMs: brFremd.length ? Math.round(median(brFremd)) : null,
        qrsNormalMs: brNormal.length ? Math.round(median(brNormal)) : null });
    ergebnis.pausen = pausen(rrMs, art);
    ergebnis.pausenP = pausenP(werte, zacken, hz, pSchwelle, art, rrMs);
    ergebnis.alternans = alternans(werte, zacken, rrMs);
    ergebnis.rhythmus = rhythmus(rrMs, qrsM, opts.bandHr || null, {
      guete: ergebnis.guete, art: art, p: ergebnis.p, muster: ergebnis.muster,
      pausen: ergebnis.pausen, pausenP: ergebnis.pausenP, wechsel: ergebnis.wechsel,
      filterAktiv: !!opts.filterAktiv
    });
    /* HRV zuletzt: sie braucht die Formauswertung, um zu wissen, ob Extrasystolen die
     * Zahlen verfaelschen. */
    ergebnis.hrv = hrv(rrMs, { ektopie: !!(ergebnis.form && ergebnis.form.messbar && ergebnis.form.fremd > 0) });
    return ergebnis;
  }

  return {
    analysiere: analysiere,
    // fuer die Selbsttests einzeln pruefbar:
    findeQRS: findeQRS, qrsBreiteMs: qrsBreiteMs, grundlinieAbziehen: grundlinieAbziehen,
    grundlinieAbziehenGenau: grundlinieAbziehenGenau,
    rhythmus: rhythmus, stMessung: stMessung, median: median,
    qrsBeginn: qrsBeginn, qrsEnde: qrsEnde, findeP: findeP, pAuswertung: pAuswertung, perzentil: perzentil,
    findeT: findeT, tAuswertung: tAuswertung,
    qrsForm: qrsForm, formVergleich: formVergleich, korrelation: korrelation,
    wechselVerdacht: wechselVerdacht, hrv: hrv, HRV_MIN_RR: HRV_MIN_RR,
    pausen: pausen, ektopieMuster: ektopieMuster, alternans: alternans, pausenP: pausenP,
    P_ART: P_ART, T_ART: T_ART, R_ART: R_ART,
    MIN_SEKUNDEN: MIN_SEKUNDEN, MIN_SCHLAEGE: MIN_SCHLAEGE,
    P_MIN_HZ: P_MIN_HZ, P_MIN_SCHLAEGE: P_MIN_SCHLAEGE, P_ANTEIL: P_ANTEIL,
  };
}));
