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
  function grundlinieAbziehen(werte, hz, fensterS) {
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
  function qrsBreiteMs(werte, r, hz) {
    if (werte[r] == null) return null;
    var spitze = Math.abs(werte[r]);
    if (!spitze) return null;
    var grenze = spitze * 0.15;
    var maxHalb = Math.round(hz * 0.09);   // 90 ms - mehr ist bei Hund/Katze kein QRS mehr
    var links = r, rechts = r, k;
    for (k = 1; k <= maxHalb; k++) {
      var li = r - k;
      if (li < 0 || werte[li] == null) break;
      links = li;
      if (Math.abs(werte[li]) < grenze) break;
    }
    for (k = 1; k <= maxHalb; k++) {
      var re = r + k;
      if (re >= werte.length || werte[re] == null) break;
      rechts = re;
      if (Math.abs(werte[re]) < grenze) break;
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
  function tAuswertung(werte, zacken, hz, rausch, rAmp, art, hf) {
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
    return {
      messbar: true, anteil: Math.round(anteil * 100), schlaege: funde.length,
      qtMs: Math.round(qtMed),
      qtMinMs: Math.round(Math.min.apply(null, qts)),
      qtMaxMs: Math.round(Math.max.apply(null, qts)),
      qtcMs: qtc, qtcFormel: qtc != null ? 'Van de Water' : null,
      negativ: median(amps) < 0,
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

  function formVergleich(werte, zacken, hz) {
    var vor = Math.round(hz * 0.06), nach = Math.round(hz * 0.08);
    var breite = vor + nach + 1;
    var bloecke = [], i, j;
    for (i = 0; i < zacken.length; i++) {
      var r = zacken[i];
      if (r - vor < 0 || r + nach >= werte.length) continue;
      var b = [];
      for (j = r - vor; j <= r + nach; j++) b.push(werte[j] == null ? 0 : werte[j]);
      bloecke.push({ idx: i, r: r, w: b });
    }
    if (bloecke.length < 3) return { messbar: false, warum: 'zu wenige vollständige Komplexe für einen Formvergleich' };
    // Vorlage: punktweiser Median
    var vorlage = [];
    for (j = 0; j < breite; j++) {
      var spalte = [];
      for (i = 0; i < bloecke.length; i++) spalte.push(bloecke[i].w[j]);
      vorlage.push(median(spalte));
    }
    var fremd = [], konform = 0, rWerte = [];
    for (i = 0; i < bloecke.length; i++) {
      var rk = korrelation(bloecke[i].w, vorlage);
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
        if (korrelation(fremd[i].w, klassen[j].w) >= 0.95) { passt = j; break; }
      }
      if (passt < 0) klassen.push({ w: fremd[i].w, n: 1 });
      else klassen[passt].n++;
    }
    return {
      messbar: true,
      schlaege: bloecke.length,
      konform: konform,
      fremd: fremd.length,
      fremdAnteil: Math.round(fremd.length / bloecke.length * 100),
      formen: klassen.length,                       // Zahl verschiedener fremder Formen
      rMin: Math.min.apply(null, rWerte),
      vorlage: vorlage,
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

    var breit = endlich(qrsMs) && qrsMs > 80;   // fuer Hund/Katze bereits deutlich verbreitert

    if (hf != null && bandHr && hf > bandHr[1] && breit) {
      return { id: 'vtach', name: 'Verdacht auf ventrikuläre Tachykardie', sicherheit: 'Verdacht',
        begruendung: 'schnelle Folge (' + hf + '/min) mit verbreitertem QRS (' + qrsMs + ' ms)' };
    }
    // Ein vorzeitiger Schlag zaehlt fuer sich - er darf NICHT zusaetzlich von einer hohen
    // Gesamtschwankung abhaengen, sonst faellt die einzelne Extrasystole wieder durch.
    // Eine Extrasystolen-Aussage nur bei sauberem Signal. Bei maessiger Guete bleibt es bei der
    // reinen Messung "unregelmaessig" - das ist wahr und verleitet zu keiner Behandlung.
    var guete = (opts && endlich(opts.guete)) ? opts.guete : 99;
    if (vorzeitig > 0 && guete < 5) {
      return { id: null, name: 'unregelmäßig, Signal nur mäßig', sicherheit: 'Messung',
        begruendung: 'Abstände schwanken, aber der Ausschlag liegt nur ' + guete + '-fach über der ' +
          'Grundlinie — für die Aussage "Extrasystole" ist das zu unsicher. Elektrodensitz prüfen.' };
    }
    if (vorzeitig > 0) {
      return { id: 'ves', name: 'unregelmäßig mit vorzeitigen Schlägen', sicherheit: 'Verdacht',
        begruendung: vorzeitig + ' vorzeitige(r) Schlag/Schläge (kürzester Abstand ' + Math.round(kleinste) +
          ' ms gegen ' + Math.round(mittel) + ' ms im Mittel)' +
          (breit ? ', dabei verbreiterter QRS ' + qrsMs + ' ms — ventrikulärer Ursprung möglich' : '') };
    }
    if (schwankung > 0.25) {
      return { id: null, name: 'unregelmäßig, Ursache offen', sicherheit: 'Messung',
        begruendung: 'Schwankung der Abstände ' + Math.round(schwankung * 100) + ' % — für die Unterscheidung (z. B. Vorhofflimmern) ist die P-Wellen-Beurteilung nötig, die dieser Streifen nicht hergibt' };
    }
    if (hf != null && bandHr && hf < bandHr[0]) {
      return { id: 'sinusbrady', name: 'regelmäßig, langsam', sicherheit: 'Messung',
        begruendung: hf + '/min bei gleichmäßigen Abständen' };
    }
    if (hf != null && bandHr && hf > bandHr[1]) {
      return { id: 'sinustachy', name: 'regelmäßig, schnell', sicherheit: 'Messung',
        begruendung: hf + '/min bei gleichmäßigen Abständen' };
    }
    return { id: 'sinus', name: 'regelmäßig', sicherheit: 'Messung',
      begruendung: 'gleichmäßige Abstände' + (hf != null ? ', ' + hf + '/min' : '') };
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
    var breiten = [];
    for (i = 0; i < zacken.length; i++) {
      var b = qrsBreiteMs(werte, zacken[i], hz);
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
    ergebnis.rhythmus = rhythmus(rrMs, qrsM, opts.bandHr || null, { guete: ergebnis.guete });
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
    ergebnis.p = pAuswertung(werte, zacken, hz, pRausch, spitze, kurve.skala, opts.einheit || 'uV', art);
    ergebnis.t = tAuswertung(werte, zacken, hz, pRausch, spitze, art, ergebnis.hf);
    /* QRS-Form am REPRAESENTATIVEN Schlag (mittlerer der Reihe) und der Formvergleich ueber
     * alle Schlaege. Beides einkanalig zulaessig - im Gegensatz zur Schenkelblock-Zuordnung. */
    var kal = endlich(kurve.skala) && kurve.skala > 0 && /uv|µv|mv/i.test(String(opts.einheit || 'uV'));
    ergebnis.qrsForm = qrsForm(werte, zacken[Math.floor(zacken.length / 2)], hz, kal, kurve.skala, opts.einheit || 'uV');
    ergebnis.form = formVergleich(werte, zacken, hz);
    return ergebnis;
  }

  return {
    analysiere: analysiere,
    // fuer die Selbsttests einzeln pruefbar:
    findeQRS: findeQRS, qrsBreiteMs: qrsBreiteMs, grundlinieAbziehen: grundlinieAbziehen,
    rhythmus: rhythmus, stMessung: stMessung, median: median,
    qrsBeginn: qrsBeginn, qrsEnde: qrsEnde, findeP: findeP, pAuswertung: pAuswertung, perzentil: perzentil,
    findeT: findeT, tAuswertung: tAuswertung,
    qrsForm: qrsForm, formVergleich: formVergleich, korrelation: korrelation,
    wechselVerdacht: wechselVerdacht,
    P_ART: P_ART, T_ART: T_ART,
    MIN_SEKUNDEN: MIN_SEKUNDEN, MIN_SCHLAEGE: MIN_SCHLAEGE,
    P_MIN_HZ: P_MIN_HZ, P_MIN_SCHLAEGE: P_MIN_SCHLAEGE, P_ANTEIL: P_ANTEIL,
  };
}));
