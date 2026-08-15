/*
 * herz3d.js — drehbares Herzmodell, das die Erregung SYNCHRON zur EKG-Kurve zeigt.
 *
 * WARUM ES DIESE DATEI GIBT (Nutzerwunsch 13.08.2026):
 * Das Diagnostik-EKG konnte sagen, WAS ihm auffaellt. Es konnte nicht sagen, WO im Herzen
 * das sitzt. Genau das ist aber die Frage, an der die Deutung haengt: eine verlaengerte
 * PQ-Zeit und ein Ausfall bei konstanter PQ-Zeit sehen auf dem Papier aehnlich aus und
 * sitzen an ZWEI VERSCHIEDENEN ORTEN - der eine im AV-Knoten (vagal, atropinempfindlich),
 * der andere darunter im His-Bundel (nicht atropinempfindlich, kann in einen totalen Block
 * uebergehen). Wer den Unterschied am Bild sieht, vergisst ihn nicht wieder.
 *
 * ------------------------------------------------------------------------------------------
 * WAS DIESES MODELL IST UND WAS NICHT
 *
 * Es ist ein LEHR- UND ZUORDNUNGSMODELL: ein anatomisch aufgebautes Herz aus Grundkoerpern,
 * dessen Erregungsablauf aus denselben Zahlen gerechnet wird wie die gezeichnete Kurve.
 * Es ist KEIN Abbild eines bestimmten Herzens, kein Scan, keine Simulation der Elektrophysik
 * und keine Messung. Es behauptet nichts ueber den Patienten, was die Auswertung nicht
 * ohnehin gemessen hat - es zeigt nur, WO das Gemessene entsteht.
 *
 * DIE EINE REGEL, DIE ALLES ZUSAMMENHAELT: die Zeiten kommen aus ekg-modell.js.
 * Vorhoferregung, AV-Verzoegerung, Kammererregung und Repolarisation liegen in genau den
 * Fenstern, aus denen ekgMv() P, PQ, QRS, ST und T zeichnet (VS.modell.QRS_ANTEIL,
 * VS.modell.pBeginnSek). Damit KANN das Bild nicht gegen die Kurve versetzt laufen - und
 * es passt sich der Tierart von selbst an (Katze: QRS 35 ms statt 50 ms, PQ 70 statt 110).
 * Zwei getrennte Zahlenreihen waeren hier der klassische stille Fehler: beide sehen einzeln
 * richtig aus, und nur zusammen sind sie falsch.
 *
 * ------------------------------------------------------------------------------------------
 * WOHER DIE ANATOMIE UND DIE ABLAEUFE STAMMEN
 *
 * Killich M. (Hrsg.), Kleintierkardiologie, Thieme 2019 - Kap. 1.3 (Woelfel, Anatomie des
 * Herzens, S. 26-34) und Kap. 2.7 (Stohrer, Elektrophysiologische Grundlagen, S. 49-55).
 * Die belegten Saetze, auf denen dieses Modell steht, jeweils mit ihrer Folge fuer den Code:
 *
 *   1. "Der Sinusknoten ... im Bereich der Einmuendung der vorderen Hohlvene (V. cava
 *      cranialis) in den rechten Vorhof" (S. 28), "an der Innenseite der hinteren Wand des
 *      rechten Vorhofs" (S. 49).  -> PUNKTE.sinus liegt dort, nicht "oben im Herzen".
 *
 *   2. "Die Reizweiterleitung ueber die Vorhoefe findet in der ARBEITSMUSKULATUR statt.
 *      Hier sind KEINE spezifischen erregungsleitenden Fasern nachzuweisen." (S. 28)
 *      -> Es gibt hier bewusst KEINE gezeichneten internodalen Bahnen und KEIN
 *         Bachmann-Buendel. Die Vorhoferregung laeuft als FLAECHE vom Sinusknoten weg.
 *         Viele Schaubilder zeichnen dort Straenge; dieses Lehrbuch bestreitet sie
 *         ausdruecklich, und eine erfundene Bahn waere genau die Sorte Behauptung, die
 *         dieses Projekt nicht macht.
 *
 *   3. "Der ... AV-Knoten ... am Boden des rechten Vorhofs in der Vorhofscheidewand
 *      (Septum interatriale)", "auf der rechten Seite des Septum interatriale an der Grenze
 *      von Vorhof und Kammer", "beim Hund 3-4 mm lang, 1-2 mm breit" (S. 28, 49).
 *
 *   4. "Die Ventilebene stellt funktionell einen elektrischen ISOLATOR dar." Einziger
 *      Durchtritt: "Lediglich an einer kleinen, umschriebenen Stelle im Trigonum fibrosum
 *      dextrum ziehen Fasern des Erregungsleitungssystems, das His-Buendel, hindurch."
 *      (S. 30, 49)  -> Im Modell gibt es GENAU EINEN Weg von den Vorhoefen in die Kammern.
 *      Daraus folgt unmittelbar, warum ein Block dort alles aufhaelt.
 *
 *   5. "Es verlaeuft im Ventrikelseptum zunaechst auf der RECHTEN Seite herzspitzenwaerts
 *      und verzweigt sich bald in einen rechten und einen linken Tawara-Schenkel. Der linke
 *      Schenkel teilt sich in ein VORDERES und ein HINTERES Hauptbuendel." (S. 49)
 *
 *   6. "Die Papillarmuskeln werden ueber Auslaeufer der Kammerschenkel als ERSTE erreicht
 *      und kontrahieren deshalb auch VOR der uebrigen Kammermuskulatur. Dies verhindert ein
 *      Durchschlagen der Klappen in die Vorhoefe mit Beginn der Systole." (S. 49)
 *      -> Deshalb aktivieren papD/papS im Modell vor der Wand, und deshalb schliessen die
 *         AV-Klappen, BEVOR der Druck steigt.
 *
 *   7. Zuordnung Welle -> Vorgang (S. 54), woertlich die Grundlage von zeitplan():
 *      P     = Erregung der Vorhoefe; danach Nulllinie
 *      PQ    = "Waehrend der Zeit der PQ-Strecke durchlaeuft die Erregung den AV-Knoten und
 *              das His-Buendel" - also LAEUFT dort etwas, obwohl die Kurve flach ist
 *      Q     = "Teile des Septums ... in Richtung zur HERZBASIS erregt"
 *      R     = "die Masse der Ventrikelmuskulatur ... von den INNENschichten zu den
 *              AUSSENschichten", Summationsvektor "in Richtung der HERZSPITZE"
 *      S     = "am Ende kurzzeitig in Richtung der HERZBASIS"
 *      ST    = ganzer Ventrikel erregt -> Summationsvektor NULL -> isoelektrisch
 *      T     = Repolarisation, "beginnt in den AUSSENschichten und laeuft auf die
 *              INNENschichten zu"; gleiches Vorzeichen wie R, weil sie den Weg zurueckgeht
 *      Ta    = "Die Erregungsrueckbildung der Vorhoefe faellt in die Zeit der
 *              Ventrikelerregung und wird von deren elektrischem Signal voellig ueberlagert"
 *
 *   8. "Werden zwei Strukturen gleichzeitig erregt, wie der linke und rechte Ventrikel,
 *      bestimmt die Erregung des zellreichen LINKEN Ventrikels die Gesamtrichtung des
 *      resultierenden Summationsvektors sehr viel deutlicher." (S. 54)  -> richtung() sagt
 *      das als Text; eine gerechnete Achse gibt es hier bewusst NICHT (Begruendung dort).
 *
 *   9. Massen und Wanddicken (S. 26): linke Kammer beim Hund 3-mal, bei der Katze 3,5-mal so
 *      schwer wie die rechte; LV-Wand 2-3-mal so dick wie die RV-Wand; RV-Wand hoechstens
 *      50 % der LV-Wand; Septum zur LV-Wand 1:1 (beide im Hochdrucksystem).
 *      -> BAU.hund/BAU.katze halten genau diese Verhaeltnisse ein, tools/herz3d-test.js
 *         rechnet sie nach.
 *
 *  10. "Die rechte Kammer ... liegt HALBMONDFOERMIG um die linke Kammer und erreicht im
 *      Gegensatz zu dieser NICHT die Herzspitze." - "Die linke Kammer ... reicht bis zur
 *      Herzspitze, die sie ALLEINIG bildet." (S. 30, 32)
 *
 *  11. "Fuellung der Koronararterien waehrend der DIASTOLE" mit etwa 10 % des Auswurfvolumens
 *      (S. 33).  -> fluss() zeigt den Koronarfluss in der Diastole und meldet, wenn die
 *      Diastole zu kurz wird. Das ist der Grund, warum eine Tachykardie das Herz nicht nur
 *      mehr arbeiten laesst, sondern es dabei auch schlechter versorgt.
 *
 *  12. "Waehrend der relativen Refraktaerphase ist die Erregbarkeit im Arbeitsmyokard fuer
 *      kurze Zeit ziemlich inhomogen ... beguenstigt ... die Entstehung von Arrhythmien vom
 *      Typ einer kreisenden Erregung. Man nennt diesen Zeitabschnitt daher auch VULNERABLE
 *      PHASE." (S. 51)  -> vulnerabel() markiert sie; sie ist die Begruendung fuer "R auf T".
 *
 *  13. Parasympathikus (Azetylcholin) wirkt "v. a. auf Sinus-, AV-Knoten und die Vorhoefe"
 *      (S. 55), Sympathikus "auf alle Anteile des Herzens".  -> WIRKORT.vagus/sympathikus;
 *      daraus folgt, warum Atropin einen AV-Block anhebt, aber gegen eine ventrikulaere
 *      Ektopie nichts ausrichtet.
 *
 * ------------------------------------------------------------------------------------------
 * GRENZEN, DIE MAN NENNEN MUSS (sonst waere das Bild eine Behauptung)
 *
 *  - Die MECHANIK (Klappenschluss, Anspannungs-, Austreibungs-, Entspannungs-, Fuellungs-
 *    phase) wird an die ELEKTRISCHEN Zeiten angehaengt, mit den Lehrbuchabstaenden aus
 *    Kap. 2.1.2 (S. 35). Sie ist NICHT gemessen. Ein EKG misst keine Mechanik. Wer
 *    Auswurf, Klappenschluss oder Druck wirklich wissen will, braucht Echokardiografie -
 *    das sagt zustand().mechanikGemessen === false auch der Oberflaeche.
 *  - Die Leitungsgeschwindigkeiten im Reizleitungssystem sind hier NICHT als m/s hinterlegt.
 *    Belegt ist die Reihenfolge und die Gesamtdauer je Abschnitt (aus den EKG-Zeiten der
 *    Art); eine Geschwindigkeit in m/s haette eine Laenge gebraucht, die je Tier verschieden
 *    ist. Das Modell rechnet deshalb in ANTEILEN der belegten Abschnittsdauern.
 *  - Die Zahl der Pulmonalvenen ist 5-8 (S. 32); gezeichnet werden vier. Das ist eine
 *    Vereinfachung der DARSTELLUNG, keine Aussage.
 *  - Das Herz steht im Tier gekippt. Dieses Modell zeigt die HERZEIGENEN Achsen, weil es um
 *    Basis/Spitze und rechts/links geht. Die Lage im Brustkorb zeigt tier3d.js.
 *
 * Reines ES5, keine Abhaengigkeiten. Laeuft im Browser (window.VS.herz3d) und in Node.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./ekg-modell.js'));
  } else {
    root.VS = root.VS || {};
    root.VS.herz3d = factory(root.VS.modell);
  }
}(typeof self !== 'undefined' ? self : this, function (modell) {
  'use strict';

  /* ==========================================================================================
   * ACHSEN (herzeigen, rechtshaendig)
   *      x   kaudal (-)  nach kranial (+)
   *      y   Herzspitze (-1) nach Herzbasis (+1)      - die Herzlaengsachse
   *      z   RECHTS (-)  nach LINKS (+)               - dieselbe Richtung wie in tier3d.js
   * Daraus folgt pruefbar: alles Rechte (RA, RV, Crus dextrum) hat z < 0, alles Linke z > 0.
   * ========================================================================================== */

  function norm(a) {
    var l = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
    return l > 1e-9 ? [a[0] / l, a[1] / l, a[2] / l] : [0, 0, 0];
  }
  function kreuz(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function klemm(v, u, o) { return v < u ? u : (v > o ? o : v); }
  /* Weiche Rampe 0..1 zwischen a und b. Ueberall dort benutzt, wo ein Zustand nicht springen
   * soll - eine harte Kante flackert im Bild und suggeriert eine Genauigkeit, die es nicht gibt. */
  function rampe(t, a, b) { if (b <= a) return t >= b ? 1 : 0; return klemm((t - a) / (b - a), 0, 1); }

  /* ==========================================================================================
   * GEOMETRIE
   *
   * Alles entsteht aus EINER Funktion: schale() legt entlang der Herzlaengsachse Ringe und
   * verbindet sie. Ein Ring hat einen AUSSEN- und einen INNENradius, damit eine Kammer eine
   * echte Wand bekommt statt einer Haut - erst dadurch ist der Schnitt durchs Herz brauchbar,
   * und erst dadurch ist "Innenschicht" ueberhaupt ein Ort, den man einfaerben kann.
   *
   * Ein Ring kann ein WINKELFENSTER haben (a0..a1). Damit wird aus demselben Bauteil die
   * halbmondfoermige rechte Kammer, die sich um die linke legt (Killich S. 30).
   * ========================================================================================== */

  /*
   * DIE HOEHLUNG LAEUFT AM RAND DES FENSTERS AUF NULL AUS (Befund 14.08.2026).
   *
   * Ohne das endet ein Winkelfenster mit einer SENKRECHTEN Schnittwand in voller Wanddicke.
   * Beim Halbmond der rechten Kammer waren das 0,26 - eine Kerbe, die es am Herzen nicht gibt.
   * Gemessen wurde die Folge, nicht vermutet: ein Sichtstrahl von der Scheidewand lief an
   * dieser Kante VORBEI, ohne die Aussenhaut der rechten Kammer je zu treffen, und die
   * Scheidewand stand von aussen sichtbar da (416 Bildpunkte bei gier=330). Vier vorherige
   * Erklaerungsversuche - Kennzeichnung, Abtastung, Sortierung, Saum - trafen es alle nicht;
   * gefunden hat es erst die Liste ALLER Flaechen an EINEM leckenden Bildpunkt.
   *
   * Anatomisch ist der Auslauf das Richtige: am Sulcus interventricularis geht die Hoehlung
   * der rechten Kammer in null ueber, die beiden Wandflaechen treffen sich dort tangential
   * (Killich S. 30 - der Halbmond LIEGT der linken Kammer auf, er ist ihr nicht angesetzt).
   *
   * RAND_ANTEIL: auf welchem Bruchteil des Fensters ausgelaufen wird. 0,18 laesst die mittleren
   * knapp zwei Drittel in voller Tiefe und macht die Kerbe an beiden Enden zu.
   */
  var RAND_ANTEIL = 0.18;
  function randFaktor(winkel, a0, a1) {
    if (a0 == null || a1 == null || (a1 - a0) >= Math.PI * 2 - 1e-6) return 1;
    var p = (winkel - a0) / (a1 - a0);
    var t = klemm(Math.min(p, 1 - p) / RAND_ANTEIL, 0, 1);
    return t * t * (3 - 2 * t);                       /* weich, sonst knickt die Wand sichtbar */
  }

  /* Punkt auf einem Ring. rx wirkt in x (kranial/kaudal), rz in z (rechts/links). */
  function ringpunkt(st, winkel, aussen, a0, a1) {
    var rx = aussen ? st.rxA : st.rxI, rz = aussen ? st.rzA : st.rzI;
    if (aussen && st.auslauf) {
      var t = randFaktor(winkel, a0, a1);
      rx = st.rxI + (st.rxA - st.rxI) * t;
      rz = st.rzI + (st.rzA - st.rzI) * t;
    }
    return [st.cx + rx * Math.cos(winkel), st.y, st.cz + rz * Math.sin(winkel)];
  }

  /*
   * stationen  Ringe von der Basis zur Spitze: {y, cx, cz, rxA, rzA, rxI, rzI, a0, a1}
   * segs       Unterteilung des Winkelfensters
   * opt        {zone, farbe, kappeBasis, kappeSpitze}
   *
   * Rueckgabe {pts, faces}. Jede Flaeche traegt:
   *   zone       welcher Herzabschnitt (steuert die Einfaerbung)
   *   tiefe      0 = Innenschicht (endokardnah), 1 = Aussenschicht (epikardnah)
   *   basisnah   0 = Herzspitze, 1 = Herzbasis
   * tiefe und basisnah sind die beiden Groessen, aus denen zeitplan() die Ankunftszeit JEDER
   * einzelnen Flaeche rechnet. Ohne sie waere "von innen nach aussen" nur ein Satz im Text.
   */
  function schale(stationen, segs, opt) {
    var pts = [], faces = [], i, j;
    var n = stationen.length;
    var voll = [], k;
    for (i = 0; i < n; i++) {
      var st = stationen[i];
      var a0 = (st.a0 == null) ? 0 : st.a0;
      var a1 = (st.a1 == null) ? Math.PI * 2 : st.a1;
      var rund = (a1 - a0) >= Math.PI * 2 - 1e-6;
      var m = rund ? segs : segs + 1;                    /* beim vollen Ring faellt der letzte Punkt auf den ersten */
      var reihe = { aussen: [], innen: [], rund: rund, st: st };
      for (j = 0; j < m; j++) {
        var w = a0 + (a1 - a0) * (rund ? (j / segs) : (j / segs));
        reihe.aussen.push(pts.push(ringpunkt(st, w, true, a0, a1)) - 1);
        reihe.innen.push(pts.push(ringpunkt(st, w, false, a0, a1)) - 1);
      }
      voll.push(reihe);
    }

    /* basisnah aus der y-Lage: die oberste Station ist 1, die unterste 0. */
    var yMax = -1e9, yMin = 1e9;
    for (i = 0; i < n; i++) { if (stationen[i].y > yMax) yMax = stationen[i].y; if (stationen[i].y < yMin) yMin = stationen[i].y; }
    function bn(y) { return yMax > yMin ? klemm((y - yMin) / (yMax - yMin), 0, 1) : 1; }

    function flaeche(a, b, c, d, tiefe, yy) {
      var f = [a, b, c, d];
      f.zone = opt.zone; f.farbe = opt.farbe;
      f.tiefe = tiefe; f.basisnah = bn(yy);
      faces.push(f);
    }

    for (i = 0; i < n - 1; i++) {
      var o = voll[i], u = voll[i + 1];
      var anz = o.aussen.length, letzt = o.rund ? anz : anz - 1;
      var ym = (o.st.y + u.st.y) / 2;
      for (j = 0; j < letzt; j++) {
        var j2 = (j + 1) % anz;
        /* Aussenhaut (Epikardseite) */
        flaeche(o.aussen[j], o.aussen[j2], u.aussen[j2], u.aussen[j], 1, ym);
        /* Innenhaut (Endokardseite) - umgekehrter Umlaufsinn, damit ihre Normale nach innen zeigt */
        flaeche(u.innen[j], u.innen[j2], o.innen[j2], o.innen[j], 0, ym);
      }
      /* Schnittkanten des Winkelfensters: ohne sie steht die halbmondfoermige rechte Kammer
       * als zwei lose Haeute im Raum und man sieht durch die Wand hindurch. */
      if (!o.rund) {
        flaeche(o.aussen[0], o.innen[0], u.innen[0], u.aussen[0], 0.5, ym);
        var e = anz - 1;
        flaeche(u.aussen[e], u.innen[e], o.innen[e], o.aussen[e], 0.5, ym);
      }
    }
    /* Deckel oben (Ventilebene) und unten (Herzspitze) */
    function kappe(reihe, obenHin) {
      var anz = reihe.aussen.length, letzt = reihe.rund ? anz : anz - 1;
      for (var q = 0; q < letzt; q++) {
        var q2 = (q + 1) % anz;
        if (obenHin) flaeche(reihe.aussen[q], reihe.innen[q], reihe.innen[q2], reihe.aussen[q2], 0.5, reihe.st.y);
        else flaeche(reihe.aussen[q2], reihe.innen[q2], reihe.innen[q], reihe.aussen[q], 0.5, reihe.st.y);
        /* Ein Deckel ist WAAGERECHT und damit keine Wand. Wer spaeter Wandeigenschaften
         * vergibt (die Septumkennung tut das), muss ihn ueberspringen koennen - sonst wird
         * die Ventilebene zur Scheidewand erklaert. Genau das war am 14.08.2026 der Fall. */
        faces[faces.length - 1].deckel = true;
      }
    }
    if (opt.kappeBasis) kappe(voll[0], true);
    if (opt.kappeSpitze) kappe(voll[n - 1], false);
    return { pts: pts, faces: faces };
  }

  /* Eine Roehre (Gefaess) - ein Sonderfall der Schale ohne Innenraum, entlang einer Mittellinie. */
  function roehre(bahn, radien, segs, opt) {
    var stationen = [], i;
    for (i = 0; i < bahn.length; i++) {
      stationen.push({
        y: bahn[i][1], cx: bahn[i][0], cz: bahn[i][2],
        rxA: radien[i], rzA: radien[i], rxI: radien[i] * 0.55, rzI: radien[i] * 0.55
      });
    }
    return schale(stationen, segs, opt);
  }

  /* Klappe: ein flacher Ring in der Ventilebene mit Segeln, die sich oeffnen und schliessen.
   * Die Segel entstehen erst beim Zeichnen (sie bewegen sich) - hier steht nur ihr Sitz. */
  function klappenring(mitte, r, segel, name, art) {
    return { mitte: mitte, r: r, segel: segel, name: name, art: art };
  }

  /* ==========================================================================================
   * BAU - die Verhaeltnisse je Tierart.
   *
   * Alle Laengen sind auf die halbe Herzlaenge bezogen (Basis y=+1, Spitze y=-1). Absolute
   * Zentimeter waeren hier eine Scheingenauigkeit: ein Chihuahua-Herz und ein Doggenherz
   * unterscheiden sich um mehr als eine Zehnerpotenz im Volumen, die VERHAELTNISSE aber kaum.
   *
   * wandLV / wandRV / wandSeptum halten die belegten Verhaeltnisse ein (Killich S. 26):
   *   LV : RV = 2..3         RV <= 0,5 * LV        Septum : LV = 1 : 1
   * masseLV / masseRV halten das belegte Gewichtsverhaeltnis fest (Hund 3:1, Katze 3,5:1).
   * Sie rechnen nichts aus - sie sind die Zahl, mit der die Oberflaeche begruenden kann,
   * warum die linke Kammer die Richtung bestimmt, und die der Test nachprueft.
   * ========================================================================================== */
  var BAU = {
    hund: {
      name: 'Hund',
      wandLV: 0.150, wandRV: 0.058, wandSeptum: 0.150,
      masseLV: 3.0, masseRV: 1.0,
      rLV: 0.520, rvTiefe: 0.205,
      /* Der Halbmond der rechten Kammer: Winkelfenster um die linke herum, auf der rechten
       * und kranialen Seite. 0 rad zeigt nach kranial (+x), pi/2 nach links (+z). */
      rvVon: -2.55, rvBis: 0.42,
      rvSpitze: -0.50,          /* so weit reicht die rechte Kammer nach unten - NICHT bis -1 */
      atriumR: 0.32, atriumL: 0.30
    },
    katze: {
      name: 'Katze',
      wandLV: 0.145, wandRV: 0.052, wandSeptum: 0.145,
      masseLV: 3.5, masseRV: 1.0,
      rLV: 0.500, rvTiefe: 0.185,
      rvVon: -2.55, rvBis: 0.40,
      rvSpitze: -0.48,
      atriumR: 0.31, atriumL: 0.29
    }
  };
  function bauFuer(art) { return BAU[art] || BAU.hund; }
  function arten() { var a = [], k; for (k in BAU) if (Object.prototype.hasOwnProperty.call(BAU, k)) a.push(k); return a; }
  function hatModell(art) { return !!BAU[art]; }

  /* ==========================================================================================
   * ZONEN - die Orte, die eingefaerbt, benannt und angesprungen werden koennen.
   *
   * stumm: an der Koerperoberflaeche NICHT sichtbar. Das ist keine Nebensache, sondern der
   * Kern der PQ-Strecke: Sinusknoten, AV-Knoten und His-Buendel bestehen aus wenigen hundert
   * bis wenigen tausend Zellen. "Der resultierende Summationsvektor faellt fuer ... die relativ
   * zellarmen Teile des Erregungsbildungs- und Erregungsleitungssystems" klein aus (Killich
   * S. 54) - die Kurve bleibt flach, WAEHREND dort die Erregung laeuft. Genau das soll man
   * sehen koennen.
   * ========================================================================================== */
  var ZONEN = [
    { id: 'sinus', name: 'Sinusknoten', latein: 'Nodus sinuatrialis', stumm: true,
      wo: 'Rechter Vorhof, an der Einmuendung der V. cava cranialis',
      quelle: 'Killich, Kleintierkardiologie 2019, S. 28 u. 49' },
    { id: 'ra', name: 'Rechter Vorhof', latein: 'Atrium cordis dextrum', stumm: false,
      wo: 'Arbeitsmuskulatur - hier gibt es KEINE eigenen Leitungsbahnen',
      quelle: 'Killich 2019, S. 28' },
    { id: 'la', name: 'Linker Vorhof', latein: 'Atrium cordis sinistrum', stumm: false,
      wo: 'Muendung von 5-8 Pulmonalvenen', quelle: 'Killich 2019, S. 32' },
    { id: 'avk', name: 'AV-Knoten', latein: 'Nodus atrioventricularis', stumm: true,
      wo: 'Boden des rechten Vorhofs, rechte Seite des Septum interatriale; Hund 3-4 mm lang',
      quelle: 'Killich 2019, S. 28 u. 49' },
    { id: 'his', name: 'His-Buendel', latein: 'Truncus fasciculi atrioventricularis', stumm: true,
      wo: 'Einziger Durchtritt durch die Ventilebene - Trigonum fibrosum dextrum',
      quelle: 'Killich 2019, S. 30 u. 49' },
    { id: 'crusD', name: 'Rechter Tawara-Schenkel', latein: 'Crus dextrum', stumm: true,
      wo: 'Rechte Seite des Kammerseptums, herzspitzenwaerts', quelle: 'Killich 2019, S. 49' },
    { id: 'crusS', name: 'Linker Tawara-Schenkel', latein: 'Crus sinistrum', stumm: true,
      wo: 'Linke Septumseite, teilt sich in ein vorderes und ein hinteres Hauptbuendel',
      quelle: 'Killich 2019, S. 49' },
    { id: 'purkinje', name: 'Purkinje-Fasern', latein: 'Rami subendocardiales', stumm: true,
      wo: 'Netzartig subendokardial; hier ist die Leitung am schnellsten',
      quelle: 'Killich 2019, S. 49' },
    { id: 'papD', name: 'Papillarmuskeln rechts', latein: 'Mm. papillares (ventriculus dexter)', stumm: false,
      wo: 'Werden als ERSTE erregt und kontrahieren vor der uebrigen Kammer',
      quelle: 'Killich 2019, S. 49' },
    { id: 'papS', name: 'Papillarmuskeln links', latein: 'Mm. papillares (ventriculus sinister)', stumm: false,
      wo: 'Halten die Mitralklappe - verhindern das Durchschlagen in den Vorhof',
      quelle: 'Killich 2019, S. 30 u. 49' },
    { id: 'septum', name: 'Kammerscheidewand', latein: 'Septum interventriculare', stumm: false,
      wo: 'Q-Zacke: wird zu Beginn Richtung HERZBASIS erregt; Pars membranacea basal',
      quelle: 'Killich 2019, S. 32 u. 54' },
    { id: 'rv', name: 'Rechte Kammer', latein: 'Ventriculus cordis dexter', stumm: false,
      wo: 'Liegt halbmondfoermig um die linke und erreicht die Herzspitze NICHT',
      quelle: 'Killich 2019, S. 30' },
    { id: 'lv', name: 'Linke Kammer', latein: 'Ventriculus cordis sinister', stumm: false,
      wo: 'Bildet die Herzspitze allein; bestimmt die Richtung des Summationsvektors',
      quelle: 'Killich 2019, S. 32 u. 54' }
  ];
  function zone(id) { for (var i = 0; i < ZONEN.length; i++) if (ZONEN[i].id === id) return ZONEN[i]; return null; }

  /* ------------------------------------------------------------------------------------
   * DIE LINKE KAMMER ALS LEITKOERPER - und warum die Scheidewand keine eigene Platte ist.
   *
   * ERSTE FASSUNG UND IHR FEHLER (gemessen 13.08.2026, Block 4 des Tests):
   * Zuerst war das Septum ein duennes, flaches Blatt bei z = 0,06 - also MITTEN IM HOHLRAUM
   * der linken Kammer. Das sah in keiner Ansicht auffaellig aus (es steckte hinter der
   * Kammerwand), war aber anatomisch sinnlos, und die Leitungspunkte hingen daneben im
   * Nichts. Der Test hat es gefunden: im Schnittbild lag das Septum nirgends vorn.
   *
   * RICHTIG IST: die Scheidewand IST der Teil der linken Kammerwand, den die rechte Kammer
   * bedeckt. Genau das sagt auch das Lehrbuch, wenn es Septum und LV-Wand ein
   * Muskeldickenverhaeltnis von 1:1 zuweist und beide dem Hochdrucksystem zuordnet
   * (Killich S. 26). Deshalb wird die linke Kammer als EIN geschlossener Koerper gebaut und
   * der von der rechten Kammer bedeckte Bogen nachtraeglich als 'septum' gekennzeichnet.
   * Damit hat die Scheidewand von selbst eine Innenseite (zum LV-Lumen) und eine Aussenseite
   * (zum RV-Lumen) - und sie kann gar nicht mehr an der falschen Stelle liegen.
   * ---------------------------------------------------------------------------------- */
  /*
   * GESTALT: "annaehernd kugelig bis stumpfkegelfoermig" (Killich S. 26).
   *
   * Die erste Fassung war 1,60 lang bei einem Radius von 0,40 - also rund doppelt so hoch wie
   * breit. Am gerenderten Bild (tools/herz3d-bild.js) sah das aus wie ein Geschoss, nicht wie
   * ein Herz, und keine einzige Zahlpruefung hatte etwas dagegen. Genau der Fall, vor dem die
   * Projektregel warnt: Bild und Messung widerlegen einander gegenseitig.
   * Jetzt ist der Kammerteil etwa so breit wie hoch - stumpfkegelfoermig.
   */
  var LV_BASIS_Y = 0.60, LV_LAENGE = 1.44, LV_CZ = 0.06;
  function lvAnteil(y) { return klemm((LV_BASIS_Y - y) / LV_LAENGE, 0, 1); }   /* 0 Basis .. 1 Spitze */
  function lvRadius(u, B) { return B.rLV * Math.sqrt(Math.max(0, 1 - u * u * 0.94)) * (1 - 0.10 * u); }

  /*
   * Der Winkel, unter dem das Reizleitungssystem an der Scheidewand herunterlaeuft.
   *
   * ER WIRD HERGELEITET, NICHT GESETZT (Befund 13.08.2026): zuerst stand hier ein geschaetzter
   * fester Wert (-1,75 rad). Er lag neben der Mitte des Bogens, den die rechte Kammer bedeckt -
   * also neben der Scheidewand. Das faellt am Bild nicht auf, verschiebt aber jeden
   * Leitungspunkt. Die Mitte des Winkelfensters der rechten Kammer IST die Mitte der
   * Scheidewand; damit kann der Weg gar nicht mehr daneben liegen, auch wenn jemand spaeter
   * das Fenster aendert.
   */
  function septumWinkel(B) { return (B.rvVon + B.rvBis) / 2; }

  /* Welchen Bogen der linken Kammer bedeckt die rechte in der Hoehe y? Der Halbmond wird
   * spitzenwaerts schmaler. DIESE Funktion baut die rechte Kammer UND kennzeichnet die
   * Scheidewand - zwei Fassungen desselben Fensters waren genau der Fehler, den der Test
   * gefunden hat. */
  var RV_VERENGUNG = 0.34;

  /*
   * WIE WEIT DIE RECHTE KAMMER IN DIE LINKE WAND GREIFT - und warum ueberhaupt (14.08.2026).
   *
   * Die Innenhaut der rechten Kammer und die Aussenhaut der linken sind DIESELBE Flaeche:
   * die Scheidewand. Beide werden aber verschieden fein abgetastet - die linke Kammer mit
   * 12 Ringen und 24 Segmenten ueber den vollen Kreis, die rechte mit 10 Ringen und 16
   * Segmenten ueber ein Fenster von 2,97 rad. Zwei Vielecke, die denselben Bogen annaehern,
   * decken sich nur in ihren gemeinsamen Ecken; dazwischen liegt mal das eine, mal das andere
   * weiter aussen. GEMESSEN: an 14,3 % der Septumflaeche stand die linke Wand bis zu 0,00218
   * vor der rechten.
   *
   * Das klingt nach nichts, entscheidet aber alles: der Rasterer sortiert nach MITTLERER
   * TIEFE und hat keinen Tiefenpuffer. Bei zwei fast deckungsgleichen Flaechen bestimmt
   * damit die Rundung, welche oben liegt - und das kippt ueber die Flaeche hin und her.
   * Sichtbar war das als oranges Sprenkeln der Scheidewand AUSSEN am Herzen (5,1 % der
   * Bildflaeche bei 90 Grad), also an einem Ort, an dem anatomisch nur freie linke
   * Kammerwand liegen kann.
   *
   * 0,006 ist das Dreifache des gemessenen groessten Durchstosses und zugleich nur 2,3 % der
   * RV-Wanddicke an ihrer duennsten Stelle - genug, damit die Reihenfolge feststeht, zu wenig,
   * um im Schnittbild aufzufallen. Eine Zahl aus der Messung, nicht aus dem Gefuehl.
   */
  var RV_UEBERLAPP = 0.006;

  function rvFenster(y, B) {
    var u = klemm((0.60 - y) / (0.60 - B.rvSpitze), 0, 1);
    var eng = RV_VERENGUNG * u;
    return [B.rvVon + eng, B.rvBis - eng];
  }

  /*
   * Ein Punkt AUF der Scheidewand in der Hoehe y. seiteRV verschiebt ihn quer, und zwar
   * ENTLANG DER WANDNORMALEN statt in z:
   *   positiv = zur rechten Kammer hin  (His-Buendel und rechter Schenkel liegen dort)
   *   negativ = zur linken Kammer hin   (linker Schenkel mit seinen beiden Hauptbuendeln)
   * In z zu verschieben waere falsch, sobald die Scheidewand nicht mehr senkrecht steht -
   * und sie steht nie senkrecht. Diese eine Funktion ist der Grund, warum die Leitungspunkte
   * gar nicht mehr neben der Wand liegen KOENNEN: sie kommen aus derselben Geometrie wie sie.
   */
  function septumPunkt(y, B, seiteRV, laengs) {
    var r = lvRadius(lvAnteil(y), B);
    var w = septumWinkel(B) + (laengs || 0);
    var rr = r + (seiteRV || 0);
    return [rr * Math.cos(w), y, LV_CZ + rr * Math.sin(w)];
  }

  /*
   * Ein Punkt IM LUMEN einer Kammer, in der Hoehe y, unter dem Winkel w.
   *   anteil  0 = Mitte der Kammer, 1 = an ihrer Wand
   *   rechts  true  -> rechte Kammer: ihr Lumen liegt zwischen LV-Aussenwand und RV-Aussenwand
   *           false -> linke Kammer: ihr Lumen liegt innerhalb der LV-Innenwand
   * Damit kann ein Punkt seine Kammer gar nicht mehr verlassen, egal wie sich die Masse
   * spaeter aendern. Genau das war beim rechten Papillarmuskel passiert.
   */
  function kammerpunkt(y, B, w, anteil, rechts) {
    var rl = lvRadius(lvAnteil(y), B), r;
    if (rechts) {
      var u = klemm((0.60 - y) / (0.60 - B.rvSpitze), 0, 1);
      var tief = B.rvTiefe * Math.sqrt(Math.max(0, 1 - u * u * 0.92));
      r = rl + tief * anteil;
    } else {
      var wand = B.wandLV * (1 - 0.35 * lvAnteil(y));
      r = (rl - wand) * anteil;
    }
    return [r * Math.cos(w), y, LV_CZ + r * Math.sin(w)];
  }

  /* Aus welcher Richtung sieht man den Schnitt an? Der Schnitt nimmt die kraniale Haelfte weg
   * (x > 0); die Schnittflaeche zeigt also nach +x. Wer sie ansehen will, dreht die Kamera
   * dorthin. Die Zahl steht hier, damit Oberflaeche und Test dieselbe benutzen - sonst prueft
   * der Test eine Ansicht, die niemand zu sehen bekommt. */
  var SCHNITT_GIER = -90;

  /* Lage der Leitungspunkte im Herzkoerper. Sie sind KEINE aufgemalten Marken, sondern die
   * Stuetzpunkte, ueber die der Weg der Erregung laeuft - dieselbe Haltung wie in tier3d.js,
   * wo der Anlegepunkt das Gelenk IST. */
  function punkte(art) {
    var B = bauFuer(art);
    /* Der AV-Knoten sitzt UEBER der Kammerscheidewand, im Boden des rechten Vorhofs, in der
     * Vorhofscheidewand und auf deren RECHTER Seite (Killich S. 28 u. 49). Er liegt damit
     * auf der Verlaengerung des Septums nach oben - deshalb derselbe Winkel, nur hoeher. */
    var oben = septumPunkt(LV_BASIS_Y, B, 0.03);
    return [
      /* Sinusknoten: Einmuendung der V. cava cranialis in den rechten Vorhof - also weit
       * rechts, weit basisnah und kranial. */
      { id: 'sinus', p: [0.26, 0.90, -B.atriumR - 0.10] },
      { id: 'ra', p: [0.02, 0.80, -B.atriumR * 0.95] },
      { id: 'la', p: [-0.10, 0.86, B.atriumL * 0.95] },
      { id: 'avk', p: [oben[0] * 0.55, 0.70, oben[2] * 0.55 - 0.02] },
      /* Das His-Buendel durchstoesst die Ventilebene und kommt im Kammerseptum wieder zum
       * Vorschein - zunaechst auf der RECHTEN Seite (Killich S. 49). */
      { id: 'his', p: septumPunkt(0.46, B, 0.035) },
      { id: 'crusD', p: septumPunkt(0.02, B, 0.045) },
      { id: 'crusS', p: septumPunkt(0.02, B, -0.045) },
      /*
       * PAPILLARMUSKELN — im LUMEN ihrer Kammer, nicht auf deren Wand (Befund 13.08.2026).
       *
       * Zuerst standen hier feste Zahlen. Am gerenderten Bild lag der rechte Papillarmuskel
       * dadurch genau AUF der Aussenwand der rechten Kammer und schwebte im dritten Blick
       * sichtbar neben dem Herzen. Keine Zahlpruefung hatte etwas dagegen - es war ein Punkt
       * mit gueltigen Koordinaten. Jetzt werden beide aus derselben Geometrie gerechnet wie
       * die Kammern selbst und koennen die Wand nicht mehr verlassen.
       *
       * Rechts entspringen sie zum groesseren Teil am Septum (Mm. papillares parvi,
       * M. papillaris magnus), links an der Aussenwand (M. papillaris subauricularis und
       * subatrialis) - Killich S. 31 f. Deshalb sitzt papD naeher an der Scheidewand.
       */
      { id: 'papD', p: kammerpunkt(-0.14, B, septumWinkel(B) + 0.55, 0.45, true) },
      { id: 'papS', p: kammerpunkt(-0.20, B, septumWinkel(B) + Math.PI + 0.30, 0.55, false) },
      /* Purkinje-Netz: subendokardial, am weitesten spitzenwaerts. */
      { id: 'purkinje', p: [0.00, LV_BASIS_Y - LV_LAENGE * 0.82, LV_CZ] }
    ];
  }

  /* ==========================================================================================
   * NETZ - das gebaute Herz.
   * ========================================================================================== */
  function netz(art) {
    var B = bauFuer(art);
    var teile = [], klappen = [];

    /* ---- Linke Kammer: von der Ventilebene bis zur Spitze, die sie ALLEIN bildet ----
     * Ein geschlossener Koerper. Welcher Bogen davon die Scheidewand ist, wird unten
     * NACHTRAEGLICH gekennzeichnet - siehe die Begruendung bei septumPunkt(). */
    var lvSt = [], i, u, r;
    var LV_N = 12;
    for (i = 0; i < LV_N; i++) {
      u = i / (LV_N - 1);                                  /* 0 Basis .. 1 Spitze */
      var y = LV_BASIS_Y - LV_LAENGE * u;
      r = lvRadius(u, B);
      var w = B.wandLV * (1 - 0.35 * u);                   /* zur Spitze hin duenner - so ist es auch */
      if (i === LV_N - 1) { r = 0.040; w = 0.032; }        /* die Spitze faellt fast zusammen */
      lvSt.push({ y: y, cx: 0, cz: LV_CZ, rxA: r, rzA: r, rxI: Math.max(0.012, r - w), rzI: Math.max(0.012, r - w) });
    }
    var lvTeil = schale(lvSt, 24, { zone: 'lv', farbe: '#b8434f', kappeBasis: true, kappeSpitze: true });

    /* ---- Rechte Kammer: Halbmond, der der linken AUFLIEGT ----
     * Ihre Innenflaeche sitzt auf der Aussenflaeche der linken Kammer - dazwischen liegt
     * nichts, denn die gemeinsame Wand IST die Scheidewand. Die Hoehlung der rechten Kammer
     * waechst also nach AUSSEN, nicht nach innen. In der ersten Fassung war das umgekehrt,
     * und die rechte Kammer steckte in der linken. */
    var rvSt = [], RV_N = 10;
    for (i = 0; i < RV_N; i++) {
      u = i / (RV_N - 1);
      var yr = 0.60 + (B.rvSpitze - 0.60) * u;
      var rl = lvRadius(lvAnteil(yr), B);                  /* so weit reicht die linke Kammer hier */
      var tief = B.rvTiefe * Math.sqrt(Math.max(0, 1 - u * u * 0.92));   /* Hoehlung der rechten Kammer */
      var wr = B.wandRV * (1 - 0.25 * u);
      var fenR = rvFenster(yr, B);                         /* dieselbe Funktion wie die Septumkennung */
      rvSt.push({
        y: yr, cx: 0, cz: LV_CZ,
        /* greift bewusst ein gemessenes Stueck IN die linke Wand - Begruendung bei RV_UEBERLAPP */
        rxI: rl - RV_UEBERLAPP, rzI: rl - RV_UEBERLAPP,
        rxA: rl + tief + wr, rzA: rl + tief * 0.82 + wr,
        /* laeuft an beiden Enden des Halbmondes auf die linke Wand aus - das sind die beiden
         * Sulci interventriculares. Begruendung bei randFaktor(). */
        auslauf: true,
        a0: fenR[0], a1: fenR[1]
      });
    }
    /* Deckel oben und unten: oben die Ventilebene (das Herzskelett ist eine echte Trennschicht,
     * Killich S. 29), unten der Abschluss des Halbmondes. Ohne sie steht die rechte Kammer als
     * offene Schale im Bild - am gerenderten Bild deutlich als scharfe Kante zu sehen. */
    teile.push(schale(rvSt, 16, { zone: 'rv', farbe: '#8f5f9e', kappeBasis: true, kappeSpitze: true }));

    /* ---- Die Scheidewand kennzeichnen: der Bogen der linken Kammerwand unter der rechten.
     *
     * DAS FENSTER MUSS DASSELBE SEIN WIE OBEN, EINSCHLIESSLICH DER VERENGUNG (Befund
     * 13.08.2026): zuerst stand hier das volle Fenster rvVon..rvBis fuer jede Hoehe. Weil der
     * Halbmond der rechten Kammer spitzenwaerts aber schmaler wird, war die Wand dort als
     * Scheidewand gekennzeichnet, wo gar keine rechte Kammer mehr darueber liegt - und das
     * Septum lag frei an der Aussenseite des Herzens. Der Test hat genau das gefunden
     * ("aus derselben Richtung ist das Septum ohne Schnitt verdeckt" wurde rot).
     * Deshalb steht die Verengung jetzt in EINER Funktion, die beide Stellen benutzen.
     *
     * UND EINE FLAECHE IST KEIN PUNKT (Befund 14.08.2026). Bis hierher entschied der
     * MITTELPUNKT der Flaeche, ob sie Septum ist. Eine Flaeche ist bei 24 Segmenten aber
     * 0,262 rad breit: liegt ihre Mitte 0,002 rad innerhalb der Fensterkante, steht sie
     * 0,129 rad DARUEBER HINAUS - dort, wo keine rechte Kammer mehr darueberliegt. Gemessen
     * waren es 24 Flaechen, die weiteste 0,149 rad frei. Am Bild war das ein oranger Streifen
     * aussen am Herzen, laengs der Kante des Halbmondes; die Scheidewand lag also sichtbar
     * an der Herzoberflaeche, wo anatomisch nur freie linke Kammerwand sein kann.
     *
     * Jetzt wird die GANZE Ausdehnung geprueft, gegen das ENGSTE Fenster, das die Flaeche
     * ueberstreicht. Der Preis ist bewusst gewaehlt: an der Kante bleibt bis zu eine halbe
     * Flaechenbreite echtes Septum als 'lv' gekennzeichnet. Dieser Fehler liegt UNTER der
     * rechten Kammer und ist damit unsichtbar - der umgekehrte stand aussen am Herzen.
     * Von zwei Ungenauigkeiten ist die verdeckte die richtige. */
    for (i = 0; i < lvTeil.faces.length; i++) {
      var f = lvTeil.faces[i], j, wMin = 1e9, wMax = -1e9, yMin = 1e9;
      /* Der Deckel in der Ventilebene ist keine Wand: die rechte Kammer hat dort ihren
       * EIGENEN Deckel daneben, sie liegt nicht darueber. Als Septum gekennzeichnet lag er
       * am 14.08.2026 als breites Band offen unter den Vorhoefen - der groessere Teil des
       * gemessenen Lecks von aussen. */
      if (f.deckel) continue;
      for (j = 0; j < f.length; j++) {
        var pk = lvTeil.pts[f[j]];
        /* atan2 liefert -pi..pi; rvVon ist negativ und liegt in diesem Bereich, deshalb reicht
         * der einfache Vergleich - eine Umlaufkorrektur waere hier eine Falle ohne Fall. Eine
         * Flaeche, die ueber den Sprung bei +-pi laeuft, bekommt so eine Spanne von fast 2pi
         * und faellt aus dem Fenster. Das ist richtig: dort hinten liegt keine rechte Kammer. */
        var wv = Math.atan2(pk[2] - LV_CZ, pk[0]);
        if (wv < wMin) wMin = wv;
        if (wv > wMax) wMax = wv;
        if (pk[1] < yMin) yMin = pk[1];
      }
      if (yMin < B.rvSpitze) continue;                 /* dort unten gibt es keine rechte Kammer mehr */
      var fen = rvFenster(yMin, B);                    /* spitzenwaerts das engste - also massgebend */
      /*
       * SCHEIDEWAND IST NUR, WO DIE RECHTE KAMMER AUCH HOEHLUNG HAT (14.08.2026).
       * Nicht das ganze Fenster: an seinen Enden laeuft die Hoehlung auf null aus - das sind
       * die beiden Sulci interventriculares, dort liegt schon freie Wand. Beide Stellen fragen
       * deshalb DIESELBE Funktion; zwei getrennte Zahlen waeren hier wieder der stille Fehler,
       * bei dem jede fuer sich richtig aussieht und nur zusammen falsch ist.
       */
      if (randFaktor(wMin, fen[0], fen[1]) > 0.999 && randFaktor(wMax, fen[0], fen[1]) > 0.999) {
        f.zone = 'septum'; f.farbe = '#c96a55';
      }
    }
    teile.push(lvTeil);

    /* ---- Vorhoefe. Deutlich duennwandiger als die Kammern (Killich S. 27). ---- */
    function vorhof(id, cz, cx, rad, farbe) {
      var st = [], N = 7, k;
      for (k = 0; k < N; k++) {
        var v = k / (N - 1);                                /* 0 oben .. 1 unten (Ventilebene) */
        var yv = 1.00 - 0.40 * v;
        var rv2 = rad * Math.sqrt(Math.max(0.05, 1 - Math.pow(2 * v - 1, 2) * 0.72));
        st.push({ y: yv, cx: cx, cz: cz, rxA: rv2 * 1.12, rzA: rv2, rxI: Math.max(0.01, rv2 * 1.12 - 0.030), rzI: Math.max(0.01, rv2 - 0.030) });
      }
      return schale(st, 14, { zone: id, farbe: farbe, kappeBasis: true, kappeSpitze: true });
    }
    /* Die Vorhoefe sitzen ueber IHRER Kammer. Ihre Mitten stehen als benannte Groessen da,
     * weil Gefaesse und Klappen sie ebenfalls brauchen - drei Zahlenreihen fuer denselben
     * Ort waeren genau die Sorte Kopie, die beim naechsten Anpassen auseinanderlaeuft. */
    var RA_CZ = -(B.rLV + B.rvTiefe * 0.55), RA_CX = 0.06;
    var LA_CZ = LV_CZ + B.rLV * 0.58, LA_CX = -0.08;
    teile.push(vorhof('ra', RA_CZ, RA_CX, B.atriumR, '#7f5fa8'));
    teile.push(vorhof('la', LA_CZ, LA_CX, B.atriumL, '#a8455a'));

    /* ---- Grosse Gefaesse ---- */
    /* V. cava cranialis: von kranial-dorsal in den rechten Vorhof - HIER sitzt der Sinusknoten. */
    teile.push(roehre([[0.26, 1.36, RA_CZ - 0.12], [0.26, 1.16, RA_CZ - 0.11], [0.24, 1.00, RA_CZ - 0.10]],
      [0.085, 0.088, 0.092], 10, { zone: 'gefaess_vcc', farbe: '#4a6fa5' }));
    /* V. cava caudalis: von kaudal in den rechten Vorhof. */
    teile.push(roehre([[-0.48, 1.16, RA_CZ - 0.08], [-0.36, 1.02, RA_CZ - 0.06], [-0.24, 0.92, RA_CZ - 0.04]],
      [0.080, 0.084, 0.088], 10, { zone: 'gefaess_vcd', farbe: '#4a6fa5' }));
    /* Truncus pulmonalis: aus der Ausstrombahn der rechten Kammer (Conus arteriosus).
     * Er zieht nach kranial-dorsal und kreuzt dabei vor der Aorta - deshalb endet er links. */
    var tpFuss = [0.30, 0.66, -0.12];
    teile.push(roehre([tpFuss, [0.30, 0.94, 0.00], [0.22, 1.22, 0.14]],
      [0.105, 0.100, 0.096], 12, { zone: 'gefaess_tp', farbe: '#5f7fb5' }));
    /* Aorta mit Bulbus: zentral aus der linken Kammer, dann nach dorsal. */
    var aoFuss = [-0.02, 0.62, LV_CZ - 0.02];
    teile.push(roehre([aoFuss, [-0.06, 0.88, LV_CZ - 0.02], [-0.18, 1.16, LV_CZ - 0.04], [-0.36, 1.32, LV_CZ - 0.04]],
      [0.115, 0.098, 0.096, 0.094], 12, { zone: 'gefaess_ao', farbe: '#b03a3a' }));
    /* Pulmonalvenen in den linken Vorhof. GEZEICHNET VIER, ANATOMISCH 5-8 (Killich S. 32) -
     * eine Vereinfachung der Darstellung, die im Beschriftungstext auch so benannt wird. */
    var pv = [[-0.28, 1.06], [-0.08, 1.12], [0.14, 1.08], [0.30, 0.98]];
    for (i = 0; i < pv.length; i++) {
      var pvA = [pv[i][0] * 1.45, pv[i][1] + 0.16, LA_CZ + 0.34];
      var pvM = [pv[i][0] * 1.10, pv[i][1], LA_CZ + 0.20];
      teile.push(roehre([pvA, pvM, [pv[i][0] * 0.60, pv[i][1] - 0.14, LA_CZ + 0.06]],
        [0.040, 0.044, 0.048], 8, { zone: 'gefaess_pv', farbe: '#a04a58' }));
    }

    /* ---- Klappen in der Ventilebene. Sie sitzen dort, wo Vorhof auf Kammer und Kammer auf
     * Gefaess trifft - deshalb aus denselben Groessen gerechnet und nicht frei gesetzt.
     * Segelzahl: Trikuspidalklappe meist 2-5 (haeufig nur 2 deutliche), Mitralklappe 2,
     * beide Taschenklappen je 3 (Killich S. 30-32). Gezeichnet werden drei bzw. zwei. ---- */
    klappen.push(klappenring([RA_CX + 0.06, 0.60, RA_CZ + 0.04], 0.150, 3, 'Trikuspidalklappe', 'av'));
    klappen.push(klappenring([LA_CX + 0.02, 0.60, LA_CZ - 0.04], 0.140, 2, 'Mitralklappe', 'av'));
    klappen.push(klappenring(tpFuss, 0.100, 3, 'Pulmonalklappe', 'semilunar'));
    klappen.push(klappenring(aoFuss, 0.108, 3, 'Aortenklappe', 'semilunar'));

    /* ---- Zusammenfuegen ---- */
    var pts = [], faces = [], t, f, ver;
    for (t = 0; t < teile.length; t++) {
      ver = pts.length;
      for (i = 0; i < teile[t].pts.length; i++) pts.push(teile[t].pts[i]);
      for (i = 0; i < teile[t].faces.length; i++) {
        f = teile[t].faces[i];
        var g = [f[0] + ver, f[1] + ver, f[2] + ver, f[3] + ver];
        g.zone = f.zone; g.farbe = f.farbe; g.tiefe = f.tiefe; g.basisnah = f.basisnah;
        faces.push(g);
      }
    }
    /*
     * MITTE UND GROESSE DES GEBAUTEN KOERPERS.
     *
     * WARUM GEMESSEN UND NICHT ANGENOMMEN (Befund 13.08.2026, im Browser gesehen):
     * Die Ansicht zentrierte auf den Ursprung y = 0. Der liegt aber nicht in der Mitte des
     * Herzens: die Kammern reichen bis y = -0,84, die Hohlvene bis y = +1,36. Das Herz sass
     * dadurch im oberen Drittel des Feldes und darunter blieb ein Drittel leer. Keine
     * Zahlpruefung hatte etwas dagegen - alle Punkte waren gueltig.
     *
     * Der Huellquader wird deshalb GEMESSEN und die Ansicht zentriert darauf. Damit sitzt das
     * Bild auch dann noch richtig, wenn jemand spaeter ein Gefaess verlaengert.
     */
    var min = [1e9, 1e9, 1e9], max = [-1e9, -1e9, -1e9], k2;
    for (i = 0; i < pts.length; i++) {
      for (k2 = 0; k2 < 3; k2++) {
        if (pts[i][k2] < min[k2]) min[k2] = pts[i][k2];
        if (pts[i][k2] > max[k2]) max[k2] = pts[i][k2];
      }
    }
    var mitte = [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2];
    var spanne = Math.max(max[0] - min[0], max[1] - min[1], max[2] - min[2]);

    /*
     * ANKER - ein Punkt je Zone, an dem der Blutfluss ansetzt (14.08.2026).
     *
     * WARUM SIE HIER ENTSTEHEN UND NICHT BEIM ZEICHNEN: aus dem MODELL gerechnet sind sie
     * drehfest. Aus den gerade sichtbaren Flaechen gerechnet waeren sie es nicht - die rechte
     * Kammer zeigt bei gier=0 nur 2,3 % ihrer Aussenhaut, ihr Anker wuerde aus einer Handvoll
     * Randflaechen entstehen und beim Drehen springen. Derselbe Grund wie ueberall in dieser
     * Datei: was stimmen muss, gehoert in eine reine Funktion mit Node-Test, nicht in eine
     * Zeichenroutine.
     *
     * 'myokard' ist keine gebaute Zone, sondern die AUSSENhaut der linken Kammer. Dorthin
     * laeuft die Koronarperfusion - in den Herzmuskel, nicht in den Hohlraum.
     */
    var summe = {}, anker = {}, zk;
    function anteil(schluessel, f) {
      var sx = 0, sy = 0, sz = 0, q;
      for (q = 0; q < f.length; q++) { var pq = pts[f[q]]; sx += pq[0]; sy += pq[1]; sz += pq[2]; }
      if (!summe[schluessel]) summe[schluessel] = [0, 0, 0, 0];
      summe[schluessel][0] += sx / f.length;
      summe[schluessel][1] += sy / f.length;
      summe[schluessel][2] += sz / f.length;
      summe[schluessel][3]++;
    }
    for (i = 0; i < faces.length; i++) {
      if (!faces[i].zone) continue;
      anteil(faces[i].zone, faces[i]);
      if (faces[i].zone === 'lv' && faces[i].tiefe === 1 && !faces[i].deckel) anteil('myokard', faces[i]);
    }
    for (zk in summe) {
      if (Object.prototype.hasOwnProperty.call(summe, zk) && summe[zk][3] > 0) {
        anker[zk] = [summe[zk][0] / summe[zk][3], summe[zk][1] / summe[zk][3], summe[zk][2] / summe[zk][3]];
      }
    }

    return { art: art, pts: pts, faces: faces, klappen: klappen, punkte: punkte(art), bau: B,
      anker: anker, mitte: mitte, spanne: spanne, min: min, max: max };
  }

  /* ==========================================================================================
   * ZEITPLAN - der eine Ort, an dem Kurve und Bild zusammengebunden werden.
   *
   * Alle Zeiten in MILLISEKUNDEN, gezaehlt ab BEGINN DER P-WELLE. Wer sie gegen die gezeichnete
   * Kurve legen will, addiert VS.modell.pBeginnSek(art) - dieselbe Funktion, aus der ekgMv()
   * seine Lage nimmt.
   *
   * Die Anteile innerhalb eines Abschnitts (z. B. dass der AV-Knoten drei Viertel der
   * PQ-Strecke braucht und das His-Buendel den Rest) sind MODELL, nicht Messung. Belegt sind
   * die Reihenfolge und die Gesamtdauer der Abschnitte. Deshalb stehen sie hier als benannte
   * Anteile beisammen und nicht verstreut im Code - wer sie aendern will, sieht sofort alle.
   * ========================================================================================== */
  var ANTEIL = {
    raBisLa: 0.35,      /* wann die Erregung vom rechten auf den linken Vorhof uebergreift (Anteil der P-Dauer) */
    avKnoten: 0.75,     /* Anteil der Strecke zwischen P-Ende und QRS-Beginn, den der AV-Knoten haelt */
    schenkel: 0.10,     /* Anteil der QRS-Dauer, in dem die Schenkel durchlaufen sind (sie sind schnell) */
    papillar: 0.15,     /* bis wann die Papillarmuskeln erregt sind - VOR der uebrigen Kammer */
    tiefeGewicht: 0.60  /* wie stark innen->aussen gegenueber Spitze->Basis den Kammerablauf bestimmt */
  };

  function zeitplan(art) {
    var V = modell.ekgVorgabe(art);
    var A = modell.QRS_ANTEIL;
    var pEnd = V.pMs;
    var qrs0 = V.pqMs;                                  /* PQ ist P-Beginn bis QRS-Beginn */
    var qrs1 = qrs0 + V.qrsMs;
    var st1 = qrs1 + V.stMs;
    var t1 = st1 + V.tMs;
    return {
      art: art,
      pBeginn: 0, pEnde: pEnd,
      raVon: 0, raBis: pEnd * (1 - ANTEIL.raBisLa),
      laVon: pEnd * ANTEIL.raBisLa, laBis: pEnd,
      /* Der AV-Knoten wird am P-Ende erreicht und gibt erst kurz vor dem QRS weiter.
       * Diese Strecke ist die PQ-Strecke: es laeuft etwas, die Kurve ist flach. */
      avVon: pEnd, avBis: pEnd + (qrs0 - pEnd) * ANTEIL.avKnoten,
      hisVon: pEnd + (qrs0 - pEnd) * ANTEIL.avKnoten, hisBis: qrs0,
      schenkelVon: qrs0, schenkelBis: qrs0 + V.qrsMs * ANTEIL.schenkel,
      papillarBis: qrs0 + V.qrsMs * ANTEIL.papillar,
      qrsVon: qrs0, qrsBis: qrs1,
      qVon: qrs0, qBis: qrs0 + V.qrsMs * A.q,                       /* Septum, Richtung Basis */
      rVon: qrs0 + V.qrsMs * A.q, rBis: qrs0 + V.qrsMs * (A.q + A.r), /* Wand innen->aussen, Richtung Spitze */
      sVon: qrs0 + V.qrsMs * (A.q + A.r), sBis: qrs1,               /* basisnahe Anteile, Richtung Basis */
      stVon: qrs1, stBis: st1,
      tVon: st1, tBis: t1,
      /* Die Vorhofrepolarisation liegt im QRS und ist dort nicht zu sehen (Killich S. 54). */
      taVon: qrs0, taBis: qrs1,
      zyklusEnde: t1,
      /* Die vulnerable Phase - relative Refraktaerzeit, in der eine kreisende Erregung
       * entstehen kann. Sie liegt auf dem aufsteigenden Ast und dem Gipfel der T-Welle
       * (Killich S. 51). Daraus folgt die Warnung "R auf T". */
      vulnerabelVon: st1 + V.tMs * 0.15, vulnerabelBis: st1 + V.tMs * 0.65
    };
  }

  /*
   * Ankunftszeit der Erregung fuer EINE Flaeche des Kammermyokards, in ms ab P-Beginn.
   *
   * u fasst die beiden belegten Richtungen zu einer Zahl zusammen:
   *   innen -> aussen   (R-Zacke, Killich S. 54)
   *   Spitze -> Basis   (S-Zacke: "am Ende kurzzeitig in Richtung der Herzbasis")
   * Dieselbe Zahl steuert die Repolarisation RUECKWAERTS - und genau daraus folgt, warum die
   * T-Welle in den meisten Ableitungen dasselbe Vorzeichen hat wie die R-Zacke: die zuletzt
   * erregten Zellen haben die kuerzesten Aktionspotenziale und repolarisieren zuerst.
   * Das ist keine eingebaute Regel, sondern faellt hier heraus.
   */
  function kammerU(f) {
    return klemm(ANTEIL.tiefeGewicht * f.tiefe + (1 - ANTEIL.tiefeGewicht) * f.basisnah, 0, 1);
  }

  /* ==========================================================================================
   * ZUSTAND - was ist zum Zeitpunkt tSek im Zyklus gerade los?
   *
   * tSek    Zeit seit Zyklusbeginn, DIESELBE Groesse, die ekgMv() bekommt
   * rrSek   Dauer dieses Zyklus
   * W       Rhythmusvorgabe (dieselbe wie in ekgMv: flat, chaos, drop, ectopic, pq, flutter)
   * beatN   Schlagzaehler - fuer Muster ueber mehrere Schlaege (Wenckebach, Bigeminus)
   *
   * Rueckgabe: fuer jede Zone ein Erregungsgrad 0..1 und ein Repolarisationsgrad 0..1, dazu
   * der mechanische Abschnitt, die Klappenstellung und der Blutfluss.
   * ========================================================================================== */
  function zustand(tSek, rrSek, W, beatN, art) {
    W = W || {};
    var Z = zeitplan(art);
    var beat = beatN || 0;
    var ms = (tSek - modell.pBeginnSek(art)) * 1000;      /* ab P-Beginn, wie der Zeitplan */
    var rrMs = (rrSek > 0 ? rrSek : 0.6) * 1000;

    var z = {
      msSeitP: ms, plan: Z, art: art,
      erregt: {}, repol: {}, leitet: {},
      halt: null,                 /* wo die Erregung stehen bleibt (Block) */
      ursprung: 'sinus',          /* wo dieser Schlag entsteht */
      breit: false,
      vulnerabel: (ms >= Z.vulnerabelVon && ms <= Z.vulnerabelBis),
      mechanikGemessen: false     /* ausdruecklich: die Mechanik unten ist Modell, nicht Messung */
    };
    var i;
    for (i = 0; i < ZONEN.length; i++) { z.erregt[ZONEN[i].id] = 0; z.repol[ZONEN[i].id] = 0; }

    /* ---- Asystolie: nichts laeuft. Die Nulllinie ist kein "ruhiges Herz". ---- */
    if (W.flat) {
      z.ursprung = 'keiner'; z.halt = 'sinus';
      z.mech = mechanik(ms, Z, 'keine');
      z.fluss = fluss(z.mech, 0);
      return z;
    }

    /* ---- Kammerflimmern: keine geordnete Front. Es gibt keinen Ursprung und keine
     * Reihenfolge - deshalb wird hier auch keine gezeichnet, sondern Unordnung. ---- */
    if (W.chaos) {
      z.ursprung = 'kammer-chaos'; z.breit = true;
      for (i = 0; i < ZONEN.length; i++) {
        var idc = ZONEN[i].id;
        if (idc === 'lv' || idc === 'rv' || idc === 'septum' || idc === 'papD' || idc === 'papS') {
          /* Ein fester, aber ortsabhaengiger Wert: sieht unruhig aus und ist trotzdem
           * reproduzierbar - ein Zufallszahlengenerator waere hier nicht testbar. */
          z.erregt[idc] = 0.35 + 0.45 * Math.abs(Math.sin(ms * 0.07 + i * 2.3 + beat));
        }
      }
      z.mech = mechanik(ms, Z, 'keine');
      z.fluss = fluss(z.mech, 0);
      return z;
    }

    /* ---- Faellt dieser Schlag aus, und WO wird er aufgehalten? ---- */
    var blockiert = null;
    if (W.drop === 'wenckebach') {
      var r1 = W.ratio || 4;
      /* Wenckebach (Mobitz I): der Block sitzt IM AV-KNOTEN. Die PQ-Zeit nimmt vorher zu. */
      if (beat % r1 === r1 - 1) blockiert = 'avk';
    }
    if (W.drop === 'mobitz2') {
      var r2 = W.ratio || 3;
      /* Mobitz II: der Block sitzt UNTERHALB des AV-Knotens, im His-Buendel/Schenkel.
       * Genau das ist der Unterschied, den man am Streifen kaum und am Ort sofort sieht -
       * und er entscheidet ueber Atropinempfindlichkeit und Schrittmacherfrage. */
      if (beat % r2 === r2 - 1) blockiert = 'his';
    }
    if (W.pq === 'diss') blockiert = 'avk';    /* totaler Block: die Kammern laufen fuer sich */

    /* ---- Ektopie: der Schlag entsteht woanders ---- */
    var ektop = null;
    if (W.ectopic && beat % 4 === 3) ektop = (W.ectopic === 'ves') ? 'kammer' : 'vorhof';

    /* ---- Vorhoefe ---- */
    var hatP = !ektop || ektop === 'vorhof';
    if (W.pq === 'diss') hatP = true;          /* die Vorhoefe schlagen weiter, nur unabhaengig */
    if (hatP) {
      z.erregt.sinus = (ms >= 0 && ms < Z.pEnde * 0.25) ? 1 : 0;
      z.erregt.ra = rampe(ms, Z.raVon, Z.raBis);
      z.erregt.la = rampe(ms, Z.laVon, Z.laBis);
      z.repol.ra = rampe(ms, Z.taVon, Z.taBis);
      z.repol.la = rampe(ms, Z.taVon, Z.taBis);
      if (ektop === 'vorhof') z.ursprung = 'vorhof-ektop';
    }
    if (W.flutter) {
      /* Vorhofflattern/-flimmern: kreisende Erregung, die Vorhoefe kommen nicht zur Ruhe.
       * Der AV-Knoten filtert - deshalb erreicht nicht jede Vorhoferregung die Kammer. */
      z.erregt.ra = 0.5 + 0.5 * Math.abs(Math.sin(ms * 0.045 + beat));
      z.erregt.la = 0.5 + 0.5 * Math.abs(Math.sin(ms * 0.045 + 1.4 + beat));
      z.ursprung = 'vorhof-kreisend';
    }

    /* ---- Ueberleitung ---- */
    var pqDehn = (typeof W.pq === 'number') ? W.pq : 1;
    if (W.pq === 'inc') pqDehn = 1 + (beat % (W.ratio || 4)) * 0.27;   /* zunehmende PQ vor dem Ausfall */
    var avBis = Z.avVon + (Z.avBis - Z.avVon) * pqDehn;
    var hisBis = avBis + (Z.hisBis - Z.hisVon) * pqDehn;
    var kammerStart = hisBis;

    if (ektop === 'kammer') {
      /* Ventrikulaere Extrasystole: der Ursprung liegt IM Kammermyokard. Von dort laeuft die
       * Erregung durch die ARBEITSmuskulatur - nicht ueber die schnellen Schenkel. Deshalb
       * ist der Komplex breit, und deshalb steht davor keine P-Welle. */
      z.ursprung = 'kammer-ektop'; z.breit = true;
      z.erregt.avk = 0; z.erregt.his = 0;
      kammerStart = Z.qrsVon;
    } else if (blockiert === 'avk') {
      z.erregt.avk = rampe(ms, Z.avVon, avBis);
      z.halt = 'avk';
    } else if (blockiert === 'his') {
      z.erregt.avk = rampe(ms, Z.avVon, avBis);
      z.erregt.his = rampe(ms, avBis, hisBis) * 0.5;    /* er erreicht ihn und kommt nicht durch */
      z.halt = 'his';
    } else {
      z.erregt.avk = rampe(ms, Z.avVon, avBis) * (1 - rampe(ms, avBis, avBis + 30));
      z.erregt.his = rampe(ms, avBis, hisBis);
      z.leitet.avk = (ms >= Z.avVon && ms <= avBis);
      z.leitet.his = (ms >= avBis && ms <= hisBis);
    }

    /* ---- Kammern ---- */
    var kammerLaeuft = !blockiert || ektop === 'kammer';
    if (W.pq === 'diss') {
      /* Totaler AV-Block: die Kammer schlaegt aus einem Ersatzschrittmacher im
       * Erregungsleitungssystem. Dass sie das UEBERHAUPT kann, liegt am diastolischen
       * Schrittmacherstrom (if) dieser Zellen (Killich S. 53) - sie sind potenzielle
       * Schrittmacher. Ohne diesen Ersatz waere jeder totale Block toedlich. */
      kammerLaeuft = true; z.ursprung = 'ersatz-kammer'; z.breit = true;
      kammerStart = Z.qrsVon;
    }

    if (kammerLaeuft) {
      var dehn = z.breit ? 2.2 : 1;                      /* ohne Schenkel dauert es laenger */
      var qrsDauer = (Z.qrsBis - Z.qrsVon) * dehn;
      if (!z.breit) {
        z.erregt.crusD = rampe(ms, kammerStart, kammerStart + (Z.schenkelBis - Z.schenkelVon));
        z.erregt.crusS = z.erregt.crusD;
        z.erregt.purkinje = rampe(ms, kammerStart, kammerStart + (Z.schenkelBis - Z.schenkelVon) * 1.6);
        z.erregt.papD = rampe(ms, kammerStart, kammerStart + (Z.papillarBis - Z.schenkelVon));
        z.erregt.papS = z.erregt.papD;
      }
      z.erregt.septum = rampe(ms, kammerStart, kammerStart + (Z.qBis - Z.qVon) * dehn);
      var wandVon = kammerStart + (Z.qBis - Z.qVon) * dehn;
      var wandBis = kammerStart + qrsDauer;
      z.erregt.lv = rampe(ms, wandVon, wandBis);
      /* Die rechte Kammerwand ist hoechstens halb so dick wie die linke (Killich S. 26) -
       * ihre Front ist also frueher durch. Deshalb ein eigener, KUERZERER Anteil und nicht
       * ein Bruchteil des Zeitpunkts: "wandBis * 0,85" waere je nach Lage des Nullpunkts
       * etwas anderes und bei einem verschobenen Zyklus schlicht falsch. */
      z.erregt.rv = rampe(ms, wandVon, wandVon + (wandBis - wandVon) * 0.85);
      /* Repolarisation: beginnt aussen und laeuft nach innen - Umkehrung von kammerU(). */
      var repolVon = kammerStart + qrsDauer + (Z.stBis - Z.stVon);
      var repolBis = repolVon + (Z.tBis - Z.tVon);
      z.wand = { von: wandVon, bis: wandBis, repolVon: repolVon, repolBis: repolBis };
      z.repol.lv = rampe(ms, repolVon, repolBis);
      z.repol.rv = z.repol.lv;
      z.repol.septum = z.repol.lv;
      z.repol.papD = z.repol.lv; z.repol.papS = z.repol.lv;
      z.kammerVon = kammerStart; z.kammerBis = wandBis;
    } else {
      z.kammerVon = null; z.kammerBis = null;
    }

    z.mech = mechanik(ms, Z, kammerLaeuft ? (hatP ? 'voll' : 'ohne-vorhof') : 'keine');
    z.fluss = fluss(z.mech, rrMs);
    z.diastoleMs = diastoleDauer(Z, rrMs);
    return z;
  }

  /*
   * Erregungsgrad EINER Flaeche - feiner als die Zone, weil innerhalb der Kammerwand die
   * Richtung zaehlt. Genau hierfuer tragen die Flaechen tiefe und basisnah.
   * Rueckgabe {erregt, repol} je 0..1.
   */
  function flaechenzustand(f, z) {
    var id = f.zone;
    if (id !== 'lv' && id !== 'rv' && id !== 'septum') {
      return { erregt: z.erregt[id] || 0, repol: z.repol[id] || 0 };
    }
    if (id === 'septum') return { erregt: z.erregt.septum || 0, repol: z.repol.septum || 0 };
    if (!z.wand) return { erregt: 0, repol: 0 };
    var u = kammerU(f), ms = z.msSeitP;
    var av = z.wand.von, ab = z.wand.bis;
    /* Die Front laeuft ueber u: eine Flaeche mit kleinem u wird frueh erregt. Die Breite der
     * Front (0,18) ist Darstellung - eine unendlich scharfe Kante gaebe es im Gewebe nicht. */
    var tAkt = av + (ab - av) * u;
    var e = rampe(ms, tAkt - (ab - av) * 0.18, tAkt);
    /* Repolarisation rueckwaerts: grosses u zuerst. */
    var rv2 = z.wand.repolVon, rb = z.wand.repolBis;
    var tRep = rv2 + (rb - rv2) * (1 - u);
    var r = rampe(ms, tRep - (rb - rv2) * 0.18, tRep);
    return { erregt: e, repol: r, u: u };
  }

  /*
   * Was zeigt eine Flaeche GERADE? erregt und repol getrennt zu fuehren ist noetig, weil
   * "schon erregt" und "schon wieder ruhig" zwei verschiedene Dinge sind. Fuer die Farbe
   * braucht die Oberflaeche aber eine Zahl - und die soll nicht an drei Stellen verschieden
   * gerechnet werden.
   *   0 = ruhend (polarisiert)   1 = voll erregt (depolarisiert)
   */
  function aktiv(fz) { return klemm((fz.erregt || 0) * (1 - (fz.repol || 0)), 0, 1); }

  /* ==========================================================================================
   * MECHANIK - die vier Abschnitte des Herzzyklus (Killich, Kap. 2.1.2, S. 35).
   *
   * NOCHMALS AUSDRUECKLICH: das hier ist an die elektrischen Zeiten ANGEHAENGT, nicht gemessen.
   * Die elektromechanische Verzoegerung und die Anspannungszeit sind Lehrbuchgroessen. Ein EKG
   * sagt ueber den Auswurf nichts - genau deshalb steht in der Regelbasis der Anwendung bei
   * jedem Groessenbefund "das EKG kann eine Vergroesserung nicht beweisen".
   * ========================================================================================== */
  var MECH = {
    emVerzugMs: 20,        /* elektromechanische Verzoegerung: Erregung -> Kraftentwicklung */
    anspannungMs: 45,      /* isovolumische Kontraktion, bis der Aortendruck ueberschritten ist */
    entspannungMs: 40      /* isovolumische Relaxation nach Schluss der Taschenklappen */
  };
  function mechanik(ms, Z, modus) {
    var m = {
      abschnitt: 'Fuellungsphase', avOffen: true, semiOffen: false,
      vorhofKontrahiert: false, kammerKontrahiert: false, modus: modus
    };
    if (modus === 'keine') {
      m.abschnitt = 'kein Auswurf'; m.avOffen = true; m.semiOffen = false;
      return m;
    }
    /* Vorhofkontraktion folgt der Vorhoferregung. */
    if (modus === 'voll' && ms >= Z.pBeginn + MECH.emVerzugMs && ms < Z.qrsVon + MECH.emVerzugMs) {
      m.vorhofKontrahiert = true; m.abschnitt = 'Vorhofkontraktion';
    }
    var kBeg = Z.qrsVon + MECH.emVerzugMs;
    var ausVon = kBeg + MECH.anspannungMs;
    var ausBis = Z.tBis;                                  /* Schluss der Taschenklappen ~ T-Ende */
    var entBis = ausBis + MECH.entspannungMs;
    if (ms >= kBeg && ms < ausVon) {
      m.abschnitt = 'Anspannungsphase (isovolumisch)'; m.avOffen = false; m.semiOffen = false; m.kammerKontrahiert = true;
    } else if (ms >= ausVon && ms < ausBis) {
      m.abschnitt = 'Austreibungsphase'; m.avOffen = false; m.semiOffen = true; m.kammerKontrahiert = true;
    } else if (ms >= ausBis && ms < entBis) {
      m.abschnitt = 'Entspannungsphase (isovolumisch)'; m.avOffen = false; m.semiOffen = false;
    } else if (ms >= entBis) {
      m.abschnitt = 'Fuellungsphase'; m.avOffen = true; m.semiOffen = false;
    }
    return m;
  }

  /* Wie lange dauert die Diastole bei dieser Zykluslaenge? Sie ist der Rest, den die Systole
   * uebrig laesst - und sie ist die Zeit, in der die Koronararterien gefuellt werden
   * (Killich S. 33). Deshalb ist sie die klinisch wichtige Zahl bei jeder Tachykardie. */
  function diastoleDauer(Z, rrMs) {
    var systoleMs = (Z.tBis - Z.qrsVon) + MECH.emVerzugMs + MECH.entspannungMs;
    return Math.max(0, rrMs - systoleMs);
  }

  /*
   * Blutfluss: welche Bahn fuehrt gerade Blut, und wie stark.
   * Die Bahnen sind benannt, damit die Oberflaeche sie beschriften kann statt nur Pfeile zu malen.
   */
  function fluss(mech, rrMs) {
    var f = [];
    /*
     * blut: 'venoes' oder 'arteriell'. Es steht HIER und nicht in der Zeichenroutine, weil es
     * eine fachliche Aussage ist und keine Farbwahl - und weil genau hier der Merksatz sitzt,
     * an dem sich Lernende regelmaessig verheddern: der Truncus pulmonalis ist eine ARTERIE,
     * fuehrt aber VENOESES Blut, und die Pulmonalvenen sind VENEN mit arteriellem Blut.
     * Wer das in der Oberflaeche entscheidet, entscheidet es irgendwann zweimal verschieden.
     */
    function bahn(id, von, nach, staerke, blut, text) {
      f.push({ id: id, von: von, nach: nach, staerke: staerke, blut: blut, text: text });
    }
    if (mech.abschnitt === 'kein Auswurf') return f;
    if (mech.avOffen) {
      bahn('fuellung-r', 'ra', 'rv', mech.vorhofKontrahiert ? 1 : 0.6, 'venoes',
        'Venoeses Blut aus beiden Hohlvenen fuellt die rechte Kammer');
      bahn('fuellung-l', 'la', 'lv', mech.vorhofKontrahiert ? 1 : 0.6, 'arteriell',
        'Sauerstoffreiches Blut aus den Pulmonalvenen fuellt die linke Kammer');
    }
    if (mech.semiOffen) {
      bahn('auswurf-r', 'rv', 'gefaess_tp', 1, 'venoes',
        'Rechte Kammer wirft in den Truncus pulmonalis aus - in den Lungenkreislauf');
      bahn('auswurf-l', 'lv', 'gefaess_ao', 1, 'arteriell',
        'Linke Kammer wirft in die Aorta aus - in den Koerperkreislauf');
    }
    /* Koronarfluss: NUR in der Diastole, weil erst die geschlossene Aortenklappe die Zugaenge
     * freigibt. Rund 10 % des linksventrikulaeren Auswurfvolumens (Killich S. 33). */
    if (!mech.semiOffen) {
      bahn('koronar', 'gefaess_ao', 'myokard', 0.8, 'arteriell',
        'Koronarperfusion - sie laeuft in der DIASTOLE, etwa 10 % des Auswurfvolumens');
    }
    return f;
  }

  /*
   * WO EIN TEILCHEN AUF SEINER BAHN GERADE STEHT - und warum das hier steht.
   *
   * Die Teilchen duerfen NICHT an der Uhr haengen, sondern an der Zykluszeit. Sonst laufen sie
   * weiter, waehrend das Bild angehalten ist, und - schlimmer - sie liessen sich nicht pruefen:
   * eine Zeichenroutine kann man nicht mit einem Node-Test befragen, und die Vorschau drosselt
   * ohnehin den Bildtakt (vetstation-leinwand-messfalle.md).
   *
   * Der Rueckgabewert haengt allein vom VERHAELTNIS tSek/rrSek ab. Damit steht ein Teilchen bei
   * gleichem Bruchteil des Zyklus immer an derselben Stelle der Bahn - egal ob das Herz mit 60
   * oder mit 180 Schlaegen laeuft. Genau das macht Bild und Kurve unverrueckbar: beide lesen
   * denselben Bruchteil.
   *
   * FLUSS_TEMPO ist eine ANZEIGEGROESSE und keine Physiologie - sie sagt nur, wie oft ein
   * Teilchen je Herzzyklus seine Bahn durchlaeuft. 1,8 ist gross genug, dass die Bewegung
   * innerhalb eines Zyklus als Bewegung lesbar ist, und klein genug, dass man ein einzelnes
   * Teilchen mit dem Auge verfolgen kann. Die STAERKE der Bahn wird bewusst NICHT in dieses
   * Tempo gerechnet: sie springt beim Vorhofkontrahieren von 0,6 auf 1, und ein Sprung im Tempo
   * waere ein Sprung in der Position. Staerke steuert deshalb Anzahl und Deckkraft der Teilchen.
   */
  var FLUSS_TEMPO = 1.8;
  function flussPhase(tSek, rrSek, k, n) {
    var rr = rrSek > 0 ? rrSek : 0.6;
    var p = (tSek / rr) * FLUSS_TEMPO + (n > 0 ? k / n : 0);
    return p - Math.floor(p);
  }

  /* ==========================================================================================
   * DIE RICHTUNG DES SUMMATIONSVEKTORS - UND WARUM SIE HIER NICHT GERECHNET WIRD
   *
   * Naheliegend waere, den Summationsvektor aus den Flaechen dieses Modells aufzuaddieren.
   * Genau das waere hier aber eine Scheingenauigkeit: das Ergebnis haengt an der Zahl und
   * Verteilung der Dreiecke, nicht am Tier. Ein Modell mit doppelt so feinem Netz gaebe eine
   * andere Achse - und jemand wuerde diese Zahl irgendwann mit der gemessenen vergleichen.
   *
   * Die Anwendung rechnet die mittlere elektrische Achse an anderer Stelle aus ECHTEN
   * Ableitungen (mit der Skalenkorrektur der augmentierten Ableitungen) und sagt ausdruecklich,
   * wenn sie es nicht kann. Eine zweite, geschaetzte Achse daneben waere schaedlich.
   *
   * Was hier steht, ist deshalb die BELEGTE Richtungsaussage je Abschnitt (Killich S. 54) -
   * qualitativ, mit Begruendung. Das ist genau die Aussage, die das Bild tragen soll:
   * "jetzt laeuft es zur Basis" bzw. "jetzt zur Spitze".
   *
   * Der Merksatz zum LV ist dabei der wichtigste: "Werden zwei Strukturen gleichzeitig erregt,
   * wie der linke und rechte Ventrikel, bestimmt die Erregung des zellreichen LINKEN Ventrikels
   * die Gesamtrichtung ... sehr viel deutlicher" (S. 54). Beim Hund wiegt die linke Kammer das
   * Dreifache der rechten, bei der Katze das 3,5-fache (S. 26).
   * ========================================================================================== */
  function richtung(z) {
    var Z = z.plan, ms = z.msSeitP;
    if (z.ursprung === 'kammer-chaos') {
      return { achse: null, text: 'Keine geordnete Front - es gibt keinen Summationsvektor.',
        warum: 'Bei Kammerflimmern laufen viele kleine Erregungen gegeneinander. Ohne gerade Front summiert sich nichts auf.' };
    }
    if (z.ursprung === 'keiner') {
      return { achse: 'keine', text: 'Nichts laeuft - Asystolie',
        warum: 'Es wird kein Impuls gebildet. Die flache Linie ist kein ruhiges Herz, sondern ein stehendes.' };
    }
    /*
     * FAELLT DIESER SCHLAG AUS, GIBT ES AUCH KEINE RICHTUNG (Befund 13.08.2026).
     * Zuerst entschied allein das ZEITFENSTER, was hier steht. Bei einem blockierten Schlag
     * meldete das Feld deshalb weiter "Richtung Herzspitze - R-Zacke", waehrend die Kurve
     * flach war und das Modell daneben voellig richtig eine unerregte Kammer zeigte. Zwei
     * Aussagen im selben Bild, die einander widersprechen - genau das, was diese Anwendung
     * nicht tun darf. Ohne Kammererregung gibt es keinen Kammervektor, und das gehoert gesagt.
     */
    var kammerZeit = (ms >= Z.qrsVon && ms < Z.tBis);
    if (kammerZeit && z.kammerVon == null) {
      var wo = z.halt === 'his' ? 'unterhalb des AV-Knotens, im His-Buendel' : 'im AV-Knoten';
      return { achse: 'keine', text: 'Dieser Schlag kommt nicht in der Kammer an',
        warum: 'Die Vorhoefe haben gearbeitet, die Ueberleitung ist ' + wo + ' stehen geblieben. '
          + 'Ohne Kammererregung gibt es keinen Kammerkomplex - und keine Richtung.' };
    }
    if (kammerZeit && (z.ursprung === 'kammer-ektop' || z.ursprung === 'ersatz-kammer')) {
      var her = z.ursprung === 'kammer-ektop' ? 'Der Schlag entsteht im Kammermyokard selbst'
        : 'Die Kammer schlaegt aus einem Ersatzschrittmacher im Erregungsleitungssystem';
      return { achse: 'ektop', text: 'Die Erregung nimmt NICHT den gewohnten Weg',
        warum: her + '. Von dort laeuft sie durch die Arbeitsmuskulatur statt ueber die schnellen '
          + 'Schenkel - deshalb dauert sie laenger, der Komplex wird breit, und die Richtung des '
          + 'Vektors haengt am Ort des Ursprungs, nicht am Reizleitungssystem.' };
    }
    if (ms >= Z.pBeginn && ms < Z.pEnde) {
      return { achse: 'vorhoefe', text: 'Vorhoferregung - vom Sinusknoten ueber beide Vorhoefe',
        warum: 'Die erste der drei Schleifen des Vektors. Sie erzeugt die P-Welle.' };
    }
    if (ms >= Z.pEnde && ms < Z.qrsVon) {
      return { achse: 'keine', text: 'Kein messbarer Vektor - und trotzdem laeuft die Erregung',
        warum: 'AV-Knoten und His-Buendel sind zellarm; ihr Summationsvektor ist zu klein, um an der Koerperoberflaeche anzukommen. Das ist die PQ-Strecke: flache Kurve bei laufender Ueberleitung.' };
    }
    if (ms >= Z.qVon && ms < Z.qBis) {
      return { achse: 'basis', text: 'Richtung HERZBASIS - Q-Zacke',
        warum: 'Zu Beginn werden Teile des Septums Richtung Herzbasis erregt.' };
    }
    if (ms >= Z.rVon && ms < Z.rBis) {
      return { achse: 'spitze', text: 'Richtung HERZSPITZE - R-Zacke',
        warum: 'Die Masse der Kammermuskulatur wird von den Innenschichten zu den Aussenschichten erregt. Die zellreiche linke Kammer bestimmt die Richtung.' };
    }
    if (ms >= Z.sVon && ms < Z.sBis) {
      return { achse: 'basis', text: 'Richtung HERZBASIS - S-Zacke',
        warum: 'Zuletzt werden die basisnahen Anteile erregt; der Vektor kippt kurz zurueck.' };
    }
    if (ms >= Z.stVon && ms < Z.stBis) {
      return { achse: 'keine', text: 'Summationsvektor NULL - ST-Strecke',
        warum: 'Der ganze Ventrikel ist erregt. Wo kein Unterschied ist, ist kein Dipol - deshalb liegt die Kurve auf der Nulllinie.' };
    }
    if (ms >= Z.tVon && ms < Z.tBis) {
      return { achse: 'spitze', text: 'Repolarisation von aussen nach innen - T-Welle',
        warum: 'Die zuletzt erregten Aussenschichten haben die kuerzesten Aktionspotenziale und repolarisieren zuerst. Weil die Rueckbildung den Weg des Aufbaus zurueckgeht, hat die T-Welle meist DASSELBE Vorzeichen wie die R-Zacke.' };
    }
    return { achse: 'keine', text: 'Herz elektrisch in Ruhe', warum: 'Alles repolarisiert, naechster Impuls steht aus.' };
  }

  /* ==========================================================================================
   * BEFUND -> ORT
   *
   * Fuer jede Regel der Hinweis-Maschine (BEFUNDREGELN in ui/app/index.html) steht hier, WO im
   * Herzen sie entsteht - oder ausdruecklich, dass sie GAR NICHT im Herzen entsteht.
   *
   * DAS ZWEITE IST DER WICHTIGERE FALL. Ein Netzbrumm, eine lose Klemme oder ein
   * eingeschalteter Muskelfilter sehen auf dem Streifen aus wie ein Befund. Ein Herzmodell,
   * das dafuer irgendeine Stelle im Herzen aufleuchten liesse, waere schaedlicher als gar
   * keines: es wuerde eine Krankheit an einen Ort malen, an dem nichts ist. Deshalb hat jeder
   * Eintrag eine ART:
   *   'herz'      -> Ort im Herzen, zonen nennt ihn
   *   'umgebung'  -> zwischen Herz und Elektrode (Erguss, Fett, Lagerung)
   *   'technik'   -> Geraet, Filter, Streifen - kein koerperlicher Ort
   *   'artefakt'  -> Stoerung von aussen - kein koerperlicher Ort
   * Bei 'technik' und 'artefakt' bleibt das Herz ausdruecklich dunkel.
   * ========================================================================================== */
  var ORT = {
    /* --- Technik und Stoerung: das Herz bleibt dunkel --- */
    'guete-niedrig': { art: 'artefakt', zonen: [], was: 'Elektrodensitz, Kontakt, Kabel, Muskelzittern',
      warum: 'Der Ausschlag ragt zu wenig aus der Grundlinie. Das entsteht am Kabel, nicht im Herzen.' },
    'netzeinstreuung': { art: 'artefakt', zonen: [], was: 'Netzeinstreuung 50 Hz',
      warum: 'Eine Stoerfrequenz aus dem Stromnetz. Sie hat keinen Ort im Patienten.' },
    'katze-vorschub': { art: 'technik', zonen: [], was: 'Papiervorschub des Geraets',
      warum: 'Bei 25 mm/s ist ein Katzen-QRS 1 mm breit - daran ist nichts auszumessen.' },
    'unkalibriert': { art: 'technik', zonen: [], was: 'Unbekannte Geraeteverstaerkung',
      warum: 'Ohne belegte Verstaerkung waere jede Angabe in mV erfunden.' },
    'filter-amplitude': { art: 'technik', zonen: [], was: 'Muskelfilter des Geraets',
      warum: 'Ein Tiefpass um 40 Hz SENKT die R-Amplitude. Die kleine Zacke macht der Filter, nicht das Herz.' },
    'zaehlstrecke-kurz': { art: 'technik', zonen: [], was: 'Zu kurzer Streifen',
      warum: 'Fuer eine Rhythmusaussage reicht die Zaehlstrecke nicht.' },
    'lagerung': { art: 'technik', zonen: [], was: 'Lagerung des Tieres',
      warum: 'Amplituden und Achse gelten fuer die rechte Seitenlage; jede andere Lage verschiebt sie.' },

    /* --- Umgebung des Herzens --- */
    'niedervoltage': { art: 'umgebung', zonen: [], was: 'Zwischen Herz und Elektrode: Perikard-, Pleuraerguss, Fett, Myxoedem',
      warum: 'Der Strom muss durch das, was dazwischenliegt. Das Herz selbst kann dabei voellig normal sein - deshalb leuchtet hier keine Herzstelle auf.' },
    'alternans': { art: 'umgebung', zonen: ['lv', 'rv'], was: 'Perikardbeutel - das Herz schwingt im Erguss',
      warum: 'Der elektrische Alternans hat KEINEN elektrischen Ursprung: das ganze Herz bewegt sich von Schlag zu Schlag anders zur Elektrode. Zusammen mit kleinen Komplexen ist das die klassische Kombination beim Perikarderguss.' },

    /* --- Sinusknoten --- */
    'hf-hoch': { art: 'herz', zonen: ['sinus'], was: 'Sinusknoten - schneller getaktet',
      warum: 'Sympathikus/Katecholamine beschleunigen ueber cAMP den Schrittmacherstrom if; die Spontandepolarisation erreicht die Schwelle frueher.' },
    'hf-tief': { art: 'herz', zonen: ['sinus', 'avk'], was: 'Sinusknoten und AV-Knoten - vagal gebremst',
      warum: 'Azetylcholin hemmt if und oeffnet iKach. Der Parasympathikus wirkt v. a. auf Sinus- und AV-Knoten und die Vorhoefe - NICHT auf die Kammern.' },
    'sinusarrhythmie-hund': { art: 'herz', zonen: ['sinus'], was: 'Sinusknoten - atemmodulierter Vagustonus',
      warum: 'Beim Hund physiologisch. Sie verschwindet bei Aufregung und nach Atropin.' },
    'sinusarrhythmie-katze': { art: 'herz', zonen: ['sinus'], was: 'Sinusknoten',
      warum: 'Anders als beim Hund bei der Katze NICHT physiologisch - sie gehoert abgeklaert.' },
    'jungtier-hf': { art: 'herz', zonen: ['sinus'], was: 'Sinusknoten - beim Jungtier hoeher getaktet',
      warum: 'Die Frequenzbaender der Art gelten fuer das erwachsene Tier.' },
    'sinusarrest-erkannt': { art: 'herz', zonen: ['sinus'], was: 'Sinusknoten setzt aus',
      warum: 'Es entsteht gar kein Impuls. Anders als beim Block liegt hier die BILDUNG still, nicht die Leitung.' },
    'brady-qt-lang': { art: 'herz', zonen: ['sinus', 'lv'], was: 'Sinusknoten und Kammerrepolarisation',
      warum: 'Bei langsamem Takt dauert das Aktionspotenzial laenger - die QT-Zeit folgt der Frequenz.' },

    /* --- Vorhoefe --- */
    'keine-p': { art: 'herz', zonen: ['ra', 'la'], was: 'Vorhofmyokard - keine geordnete Vorhoferregung',
      warum: 'Ohne P entsteht in den Vorhoefen keine gerade Front. Bei langsamem Rhythmus ist das das Bild des Vorhofstillstands - an Hyperkaliaemie denken.' },
    'p-breit': { art: 'herz', zonen: ['la'], was: 'Linker Vorhof - die Erregung braucht laenger ueber beide Vorhoefe',
      warum: 'Die Vorhoefe leiten ueber ihre Arbeitsmuskulatur. Ein groesserer linker Vorhof verlaengert diesen Weg.' },
    'p-hoch': { art: 'herz', zonen: ['ra'], was: 'Rechter Vorhof',
      warum: 'Eine hohe P spricht fuer eine rechtsatriale Belastung.' },
    'vhf-verdacht': { art: 'herz', zonen: ['ra', 'la', 'avk'], was: 'Vorhofmyokard mit kreisenden Erregungen; der AV-Knoten filtert',
      warum: 'Die Vorhoefe kommen nicht zur Ruhe. Dass die Kammer trotzdem nicht mitrast, ist die Leistung des AV-Knotens - er laesst nur einen Teil durch. Daher die unregelmaessige Kammerantwort.' },

    /* --- AV-Knoten und darunter: der Unterschied, auf den es ankommt --- */
    'pq-lang': { art: 'herz', zonen: ['avk'], was: 'AV-Knoten - verzoegerte Ueberleitung',
      warum: 'Der AV-Knoten kann die Erregung leiten UND verzoegern. Eine laengere Verzoegerung ist meist vagal oder medikamentoes und dann atropinempfindlich.' },
    'pq-zunehmend': { art: 'herz', zonen: ['avk'], was: 'AV-Knoten (Wenckebach, Mobitz I)',
      warum: 'Die Verzoegerung nimmt von Schlag zu Schlag zu, bis einer haengen bleibt. Der Halt sitzt IM AV-Knoten - oberhalb des His-Buendels.' },
    'pq-konstant-ausfall': { art: 'herz', zonen: ['his', 'crusD', 'crusS'], was: 'UNTERHALB des AV-Knotens: His-Buendel oder Schenkel (Mobitz II)',
      warum: 'Konstante PQ und ploetzlicher Ausfall: der Halt sitzt hinter dem AV-Knoten. Das ist der klinisch entscheidende Unterschied - dieser Block spricht kaum auf Atropin an und kann in einen totalen Block uebergehen.' },
    'avblock2-erkannt': { art: 'herz', zonen: ['avk', 'his'], was: 'Uebergang Vorhof -> Kammer',
      warum: 'Die Ventilebene isoliert elektrisch; es gibt genau EINEN Weg hindurch. Ob der Halt im AV-Knoten oder darunter sitzt, entscheidet die PQ-Zeit vor dem Ausfall.' },
    'schlag-ausgefallen': { art: 'herz', zonen: ['sinus', 'avk'], was: 'Impulsbildung oder Ueberleitung',
      warum: 'Ein fehlender Schlag hat zwei moegliche Orte: der Sinusknoten bildet nichts (Arrest) oder der AV-Knoten laesst nichts durch (Block).' },
    'pause-lang': { art: 'herz', zonen: ['sinus', 'avk'], was: 'Impulsbildung oder Ueberleitung',
      warum: 'Wie beim ausgefallenen Schlag - bei langer Pause entscheidet der Ersatzrhythmus ueber die Gefahr.' },

    /* --- Kammer-Erregungsleitung --- */
    'qrs-breit': { art: 'herz', zonen: ['crusD', 'crusS', 'purkinje', 'lv', 'rv'],
      was: 'Kammer-Erregungsleitung oder Kammermyokard',
      warum: 'Ueber die Schenkel und Purkinje-Fasern laeuft die Erregung am schnellsten. Faellt dieser Weg aus, muss sie durch die Arbeitsmuskulatur - das dauert laenger, und der Komplex wird breit. Die humanmedizinische Grenze von 120 ms gilt hier NICHT.' },
    'block-nicht-klassifizierbar': { art: 'herz', zonen: ['crusD', 'crusS'], was: 'Ein Tawara-Schenkel - welcher, ist mit einer Ableitung nicht zu sagen',
      warum: 'Die Zuordnung vergleicht mehrere Ableitungen. Mit nur Ableitung II bleibt es bei "verbreitert".' },
    'qrs-gekerbt': { art: 'herz', zonen: ['lv', 'rv', 'septum'], was: 'Kammermyokard - die Front laeuft nicht mehr gerade',
      warum: 'Narbe oder Ischaemie verhindern eine geradlinige Erregungsfront; der Summationsvektor bricht auf und die Zacke bekommt eine Kerbe.' },
    'aivr-erkannt': { art: 'herz', zonen: ['crusD', 'crusS', 'purkinje'], was: 'Erregungsleitungssystem als Ersatzschrittmacher',
      warum: 'Die Zellen des ventrikulaeren Leitungssystems haben selbst einen Schrittmacherstrom (if) und springen ein, wenn von oben nichts kommt. Ein beschleunigter Ersatzrhythmus ist meist gutartig - er ist die Rettung, nicht die Krankheit.' },

    /* --- Kammermyokard --- */
    'extrasystolen': { art: 'herz', zonen: ['lv', 'rv', 'ra', 'la'], was: 'Ein Herd ausserhalb des Sinusknotens',
      warum: 'Schmaler Komplex spricht fuer einen Ursprung oberhalb der Kammer, breiter fuer einen im Kammermyokard.' },
    'ektopie-uniform': { art: 'herz', zonen: ['lv', 'rv'], was: 'EIN Herd im Kammermyokard',
      warum: 'Gleich aussehende Komplexe kommen immer wieder vom selben Ort.' },
    'ektopie-multiform': { art: 'herz', zonen: ['lv', 'rv'], was: 'MEHRERE Herde im Kammermyokard',
      warum: 'Verschieden geformte Komplexe entstehen an verschiedenen Orten - das Myokard ist breitflaechig reizbar. Das ist die gefaehrlichere Form.' },
    'vtach-verdacht': { art: 'herz', zonen: ['lv', 'rv'], was: 'Kammermyokard',
      warum: 'Breit und schnell aus der Kammer. Ob es gefaehrlich ist, entscheidet der Kreislauf am Tier - nicht die Kurve.' },
    'bigeminus-erkannt': { art: 'herz', zonen: ['lv', 'rv'], was: 'Ein gekoppelter Herd im Kammermyokard',
      warum: 'Jedem Sinusschlag folgt eine Extrasystole. Sie fuellt die Kammer nicht vollstaendig und erzeugt oft keinen tastbaren Puls - deshalb luegt die gezaehlte Frequenz.' },
    'gruppierte-es': { art: 'herz', zonen: ['lv', 'rv'], was: 'Kammermyokard',
      warum: 'Salven sind ein Warnzeichen; ueber die Zahl je 24 Stunden entscheidet das Langzeit-EKG.' },
    'hf-hoch-ektopie': { art: 'herz', zonen: ['lv', 'rv', 'sinus'], was: 'Ektope Herde neben dem Sinusknoten',
      warum: 'Die gezaehlte Frequenz enthaelt die formfremden Schlaege. Puls am Tier zaehlen - die Differenz ist das Pulsdefizit.' },
    'rasse-ektopie': { art: 'herz', zonen: ['rv'], was: 'Kammermyokard - bei manchen Rassen bevorzugt rechts',
      warum: 'Rassegebundene Kardiomyopathien haben ihren Ort: die arrhythmogene rechtsventrikulaere Kardiomyopathie des Boxers geht von der RECHTEN Kammerwand aus.' },

    /* --- Masse und Repolarisation --- */
    'r-hoch': { art: 'herz', zonen: ['lv'], was: 'Linke Kammerwand',
      warum: 'Mehr Muskelmasse in der Front heisst mehr Dipole in der Summe. Das EKG kann eine Vergroesserung nahelegen, aber nicht beweisen - das Mass liefert der Herzultraschall.' },
    'windhund-normal': { art: 'herz', zonen: ['lv'], was: 'Linke Kammerwand - rassetypisch',
      warum: 'Bei Windhunden und ausdauertrainierten Rassen sind hohe R-Amplituden und eine niedrige Ruhefrequenz normal ("Athletenherz").' },
    'achse-ausserhalb': { art: 'herz', zonen: ['lv', 'rv', 'crusD', 'crusS'], was: 'Kammermasse oder Leitungsweg',
      warum: 'Die Achse zeigt, wohin der Summationsvektor im Mittel weist. Sie verschiebt sich, wenn sich die Masse aendert ODER wenn der Weg der Erregung ein anderer wird.' },
    'qt-lang': { art: 'herz', zonen: ['lv', 'rv'], was: 'Repolarisation des Kammermyokards',
      warum: 'Die QT-Zeit ist die Dauer des Aktionspotenzials im Gewebe. Elektrolyte (Kalzium, Kalium), Hypothermie und Arzneimittel stehen vor einer primaer kardialen Ursache.' },
    'qt-kurz': { art: 'herz', zonen: ['lv', 'rv'], was: 'Repolarisation des Kammermyokards',
      warum: 'Verkuerzte Plateauphase - an Hyperkalzaemie und Digitalis denken.' },
    'hyperkaliaemie-muster': { art: 'herz', zonen: ['ra', 'la', 'avk', 'lv', 'rv'], was: 'Das GANZE Myokard - zuerst schweigen die Vorhoefe',
      warum: 'Erhoehtes Kalium hebt das Ruhemembranpotenzial an. Die Vorhoefe verlieren zuerst ihre Erregbarkeit (P verschwindet), dann verbreitert sich der Kammerkomplex. Das ist keine Stelle, sondern ein Zustand des ganzen Gewebes.' }
  };
  function ortFuer(befundId) { return ORT[befundId] || null; }

  /* Worauf wirkt was? Folgt unmittelbar aus Killich S. 55: der Parasympathikus erreicht
   * v. a. Sinus-, AV-Knoten und Vorhoefe, der Sympathikus alle Anteile. Daraus folgt der
   * klinische Merksatz, den die Anwendung an mehreren Stellen braucht: Atropin hebt einen
   * vagalen AV-Block, gegen eine ventrikulaere Ektopie richtet es nichts aus. */
  var WIRKORT = {
    vagus: { zonen: ['sinus', 'avk', 'ra', 'la'],
      text: 'Der N. vagus (Azetylcholin) erreicht vor allem Sinus- und AV-Knoten und die Vorhoefe - die Kammern kaum.',
      folge: 'Deshalb hebt Atropin eine vagale Bradykardie und einen AV-Block; auf eine ventrikulaere Ektopie wirkt es nicht.',
      quelle: 'Killich, Kleintierkardiologie 2019, S. 52 u. 55' },
    sympathikus: { zonen: ['sinus', 'avk', 'ra', 'la', 'crusD', 'crusS', 'purkinje', 'lv', 'rv', 'septum'],
      text: 'Der Sympathikus (Noradrenalin) erreicht ALLE Anteile des Herzens einschliesslich Kammermyokard und Koronarsystem.',
      folge: 'Positiv chronotrop, dromotrop und inotrop - und er senkt ueber die kuerzere Diastole die Koronarperfusion.',
      quelle: 'Killich 2019, S. 52 u. 55' }
  };

  /* ==========================================================================================
   * ANSICHT - dieselbe Bauart wie tier3d.js: drehen, projizieren, nach Tiefe sortieren.
   * ========================================================================================== */
  var KAMERA = 6.5;
  function drehe(p, gier, nick) {
    var cg = Math.cos(gier), sg = Math.sin(gier), cn = Math.cos(nick), sn = Math.sin(nick);
    var x = p[0] * cg + p[2] * sg;
    var z = -p[0] * sg + p[2] * cg;
    var y = p[1] * cn - z * sn;
    z = p[1] * sn + z * cn;
    return [x, y, z];
  }
  function projiziere(p, po) {
    var f = KAMERA / (KAMERA - p[2]);
    return { x: po.mx + p[0] * po.skala * f, y: po.my - p[1] * po.skala * f };
  }

  /*
   * m       Netz aus netz()
   * opt     {breite, hoehe, gier, nick, zustand, schnitt}
   *         schnitt: schneidet die kraniale Haelfte weg (x > 0), damit Septum, Klappen und
   *         das Reizleitungssystem sichtbar werden. Von aussen ist davon nichts zu sehen -
   *         und genau darum geht es hier.
   */
  function ansicht(m, opt) {
    opt = opt || {};
    var breite = opt.breite || 560, hoehe = opt.hoehe || 420;
    var gier = (opt.gier || 0) * Math.PI / 180, nick = (opt.nick || 0) * Math.PI / 180;
    /* Auf den gemessenen Huellquader zentrieren und danach einpassen, statt auf den Ursprung
     * und eine feste Zahl - Begruendung im Kopf von netz(). */
    var mi = m.mitte || [0, 0, 0];
    var skala = Math.min(breite, hoehe) / ((m.spanne || 2.4) * 1.22);
    var po = { mx: breite / 2, my: hoehe / 2, skala: skala };
    var z = opt.zustand || null;
    var i, j;

    var gp = [];
    for (i = 0; i < m.pts.length; i++) {
      gp.push(drehe([m.pts[i][0] - mi[0], m.pts[i][1] - mi[1], m.pts[i][2] - mi[2]], gier, nick));
    }
    var pp = [];
    for (i = 0; i < gp.length; i++) pp.push(projiziere(gp[i], po));

    var out = [];
    for (i = 0; i < m.faces.length; i++) {
      var f = m.faces[i], n = f.length, tiefe = 0;
      if (opt.schnitt) {
        var mx = 0;
        for (j = 0; j < n; j++) mx += m.pts[f[j]][0];
        if (mx / n > 0.02) continue;
      }
      var eck = [], tiefeNah = -1e9;
      for (j = 0; j < n; j++) {
        eck.push(pp[f[j]]);
        tiefe += gp[f[j]][2];
        if (gp[f[j]][2] > tiefeNah) tiefeNah = gp[f[j]][2];   /* der KAMERANAECHSTE Eckpunkt */
      }
      tiefe /= n;
      var a = gp[f[0]], b = gp[f[1]], c = gp[f[2]];
      var nv = norm(kreuz([b[0] - a[0], b[1] - a[1], b[2] - a[2]], [c[0] - a[0], c[1] - a[1], c[2] - a[2]]));
      if (!nv[0] && !nv[1] && !nv[2]) continue;          /* entartete Flaeche - hat keine Seite */
      var abgewandt = (nv[2] < 0);
      if (abgewandt && !opt.schnitt) continue;            /* zeigt von der Kamera weg */
      var lic = nv[0] * (-0.35) + nv[1] * 0.5 + nv[2] * 0.79;
      /*
       * INNENFLAECHEN GEHOEREN INS HALBDUNKEL (Befund 13.08.2026, im Browser gesehen).
       * Zuerst stand hier Math.abs(lic) - abgewandte Flaechen wurden damit genauso hell wie
       * zugewandte. Im Schnitt sah die AUSGEHOEHLTE Kammer dadurch aus wie ein massiver
       * Koerper: es fehlte der einzige Hinweis, an dem das Auge hohl von voll unterscheidet.
       * Eine Hoehle liegt im Schatten - also wird sie hier auch beschattet.
       */
      var hell = abgewandt
        ? Math.max(0.16, Math.min(0.52, 0.20 + 0.32 * Math.abs(lic)))
        : Math.max(0.30, Math.min(1, 0.42 + 0.58 * lic));
      var zu = z ? flaechenzustand(f, z) : { erregt: 0, repol: 0 };
      out.push({
        eck: eck, tiefe: tiefe, tiefeNah: tiefeNah, zone: f.zone, farbe: f.farbe, hell: hell,
        erregt: zu.erregt, repol: zu.repol, innen: f.tiefe < 0.5, abgewandt: abgewandt
      });
    }
    /*
     * SORTIERT WIRD NACH DEM KAMERANAECHSTEN ECKPUNKT, NICHT NACH DER FLAECHENMITTE
     * (Befund 14.08.2026). Es gibt keinen Tiefenpuffer; wer zuletzt gezeichnet wird, ist zu
     * sehen. Die Tiefe SCHWANKT aber INNERHALB einer Flaeche staerker als der Abstand zweier
     * benachbarter Haeute - ein Mittelwert wirft genau diese Schwankung weg und entscheidet
     * dann per Rundung. Der naechste Eckpunkt wirft sie nicht weg: liegt eine Flaeche ganz
     * vor einer anderen, ist auch ihr naechster Punkt naeher, unabhaengig von der Unterteilung.
     *
     * DASS DIESE ZEILE IHREN PLATZ VERDIENT, IST NACHGEMESSEN - und zwar zweimal mit
     * verschiedenem Ergebnis: solange die Kerbe am Sulcus noch offen war, brachte sie NICHTS
     * (2261 gegen 2260 Bildpunkte). Erst nachdem Deckel, Kennzeichnung und Auslauf stimmten,
     * hing das letzte Bildpunkt-Leck genau an ihr: Mittelwert 1, naechster Eckpunkt 0.
     * Wer sie herausnimmt, macht die Aussenhaut-Pruefung wieder rot.
     *
     * tiefe (der Mittelwert) bleibt erhalten, weil die Oberflaeche damit Marken und Klappen
     * einordnet.
     */
    out.sort(function (p, q) { return p.tiefeNah - q.tiefeNah; });

    /* Leitungspunkte - sie liegen INNEN und werden deshalb ohne Verdeckungspruefung gezeigt.
     * Das ist Absicht und keine Nachlaessigkeit: ein Sinusknoten, den die Vorhofwand verdeckt,
     * waere in einem Lehrmodell nutzlos. Die Schnittansicht zeigt zusaetzlich, wo er wirklich
     * sitzt. */
    var mk = [];
    for (i = 0; i < m.punkte.length; i++) {
      var s = m.punkte[i];
      var g = drehe([s.p[0] - mi[0], s.p[1] - mi[1], s.p[2] - mi[2]], gier, nick);
      var pr = projiziere(g, po);
      mk.push({
        id: s.id, x: pr.x, y: pr.y, tiefe: g[2],
        erregt: z ? (z.erregt[s.id] || 0) : 0,
        halt: !!(z && z.halt === s.id),
        leitet: !!(z && z.leitet && z.leitet[s.id])
      });
    }
    mk.sort(function (p, q) { return p.tiefe - q.tiefe; });

    /* Klappen mit ihrer aktuellen Stellung. */
    var kl = [];
    for (i = 0; i < m.klappen.length; i++) {
      var k = m.klappen[i];
      var gk = drehe([k.mitte[0] - mi[0], k.mitte[1] - mi[1], k.mitte[2] - mi[2]], gier, nick);
      var prk = projiziere(gk, po);
      var offen = z && z.mech ? (k.art === 'av' ? z.mech.avOffen : z.mech.semiOffen) : true;
      kl.push({ name: k.name, art: k.art, x: prk.x, y: prk.y, tiefe: gk[2],
        r: k.r * skala * (KAMERA / (KAMERA - gk[2])), segel: k.segel, offen: !!offen });
    }
    /* Die Anker mitprojizieren. Sie kommen aus dem Modell (siehe netz()) und werden hier nur
     * gedreht - die Oberflaeche bekommt fertige Bildkoordinaten und rechnet keine Geometrie. */
    var ank = {}, ak;
    for (ak in (m.anker || {})) {
      if (!Object.prototype.hasOwnProperty.call(m.anker, ak)) continue;
      var ga = drehe([m.anker[ak][0] - mi[0], m.anker[ak][1] - mi[1], m.anker[ak][2] - mi[2]], gier, nick);
      var pa = projiziere(ga, po);
      ank[ak] = { x: pa.x, y: pa.y, tiefe: ga[2] };
    }

    return { flaechen: out, punkte: mk, klappen: kl, anker: ank, skala: skala,
      richtung: z ? richtung(z) : null };
  }

  return {
    netz: netz, ansicht: ansicht, arten: arten, hatModell: hatModell,
    zeitplan: zeitplan, zustand: zustand, flaechenzustand: flaechenzustand, kammerU: kammerU,
    aktiv: aktiv, mechanik: mechanik, fluss: fluss, diastoleDauer: diastoleDauer, richtung: richtung,
    flussPhase: flussPhase, FLUSS_TEMPO: FLUSS_TEMPO,
    ZONEN: ZONEN, zone: zone, ORT: ORT, ortFuer: ortFuer, WIRKORT: WIRKORT,
    BAU: BAU, bauFuer: bauFuer, punkte: punkte, ANTEIL: ANTEIL, MECH: MECH,
    septumWinkel: septumWinkel, septumPunkt: septumPunkt, kammerpunkt: kammerpunkt,
    lvRadius: lvRadius, lvAnteil: lvAnteil, LV_CZ: LV_CZ, LV_BASIS_Y: LV_BASIS_Y, LV_LAENGE: LV_LAENGE,
    SCHNITT_GIER: SCHNITT_GIER, drehe: drehe, KAMERA: KAMERA
  };
}));
