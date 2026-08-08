/*
 * ekg-skala.js — beschriftete Achsen auf dem Millimeterraster.
 *
 * WARUM ES DIESE DATEI GIBT (Befund 08.08.2026):
 * Das Diagnostik-EKG zeichnete von Anfang an ein massstabsgetreues Millimeterraster und einen
 * Eichzacken - aber KEINE beschrifteten Achsen. Auf Papier hat der Untersucher ein Lineal und
 * zaehlt Kaestchen; am Bildschirm hat er weder das eine noch das andere. Er muss aus "25 mm/s"
 * und der Kaestchenzahl jedes Mal im Kopf umrechnen, und genau dabei entstehen Lesefehler:
 * bei 25 mm/s traegt ein kleines Kaestchen 40 ms, bei 50 mm/s nur 20 ms, bei 100 mm/s 10 ms.
 * Wer den Vorschub uebersieht, misst eine Katze mit doppelter QRS-Dauer.
 *
 * WARUM ALS EIGENE DATEI UND NICHT IN index.html:
 *   1. Bildschirm und PDF muessen DIESELBE Skala zeichnen. Zwei getrennte Rechnungen laufen
 *      frueher oder spaeter auseinander - und dann misst der Tierarzt am Ausdruck etwas anderes
 *      als am Schirm, ohne dass es jemandem auffaellt.
 *   2. Was in index.html steht, ist nur im laufenden Browser pruefbar. Der Bildtakt dort ist
 *      gedrosselt (gemessen 08.08.2026: vier requestAnimationFrame-Takte kamen in 30 s nicht
 *      durch), also misst man alte Bilder und haelt sie fuer das Ergebnis. Hier ist die
 *      Geometrie eine reine Funktion und faellt im Selbsttest auf.
 *
 * EINHEITENFREI: "pmm" ist, wieviel eine Zeichen-Einheit pro Millimeter zaehlt - am Bildschirm
 * Pixel pro mm, im PDF Punkte pro mm (2,8346). Damit passt dieselbe Funktion auf beides.
 *
 * Reines ES5, keine Abhaengigkeiten. Laeuft im Browser (window.VS.skala) und in Node.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.VS = root.VS || {}; root.VS.skala = factory(); }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* Abstand der Zeitmarken in Sekunden. 0,2 s ist bewusst gewaehlt und nicht 0,5 oder 1:
   * das ist bei JEDEM Vorschub genau ein grosses Kaestchen mal (Vorschub/25). Der Untersucher
   * sieht damit unmittelbar, wieviel Zeit ein grosses Kaestchen traegt. */
  var TAKT_S = 0.2;

  /* Wieviel Platz eine Beschriftung mindestens braucht, wenn der Aufrufer nichts sagt.
   *
   * WARUM DER AUFRUFER DAS SAGEN MUSS und es hier keine feste Zahl gibt: ein Millimeter auf
   * dem Schirm (2 Bildpunkte) und ein Millimeter auf Papier sind physisch NICHT gleich gross.
   * Eine Schwelle in "Einheiten je mV" waere deshalb im einen Medium richtig und im anderen
   * falsch - der Ausdruck bekaeme eine andere Teilung als der Schirm, obwohl beide dieselbe
   * Rechnung benutzen. Der Aufrufer kennt seine Schriftgroesse und gibt den Mindestabstand
   * in seinen eigenen Einheiten an. */
  var MIN_ABSTAND = 14;

  /* Moegliche Teilungen der Amplitudenachse, von fein nach grob. Genommen wird die FEINSTE,
   * bei der zwei Beschriftungen noch auseinanderliegen.
   *
   * Warum es 2 und 5 mV ueberhaupt gibt (gemessen 08.08.2026): bei 5 mm/mV auf dem Schirm
   * (2 Bildpunkte je mm) liegt ein Millivolt nur 10 Bildpunkte hoch - die 10 Punkte hohe
   * Beschriftung klebte an der naechsten. Mit 0,5 und 1 mV allein war die Achse dort nicht
   * lesbar zu bekommen. */
  /* Warum die Leiter bis 0,1 mV hinunterreicht (gemessen 08.08.2026): auf dem Ausdruck ist
   * der Rhythmusstreifen 42 mm hoch. Bei 40 mm/mV umfasst diese Bahn nur +-0,5 mV - eine
   * Teilung von 0,5 mV haette dort GAR KEINE Marke mehr innerhalb der Bahn gelassen, und die
   * Amplitudenachse waere auf dem Papier stillschweigend verschwunden. 0,1 mV ist ausserdem
   * eine Groesse, in der man in der Tiermedizin ohnehin denkt (P-Wellen liegen im Zehntelbereich). */
  var STUFEN = [0.1, 0.2, 0.5, 1, 2, 5];

  /* Dasselbe fuer eine Achse in MILLIMETERN Ausschlag. Sie wird gebraucht, wenn die
   * Verstaerkung des Geraets UNBEKANNT ist: dann ist die Kurve nur auf eine ablesbare Hoehe
   * normiert, und eine Zahl in Millivolt waere frei erfunden. Die Anwendung sagt an jeder
   * anderen Stelle genau das ("Verstaerkung des Geraets ist unbekannt, deshalb keine Angabe
   * in mV"), und der Messzirkel gibt dort "mm (unkalibriert)" aus. Die Achse haelt sich an
   * dieselbe Regel. */
  var MM_STUFEN = [1, 2, 5, 10, 20];

  /* Wieviele Schritte je Richtung hoechstens versucht werden. Was ausserhalb der Flaeche
   * liegt, faellt ohnehin weg; die Grenze verhindert nur eine endlose Schleife bei
   * unsinnigen Werten.
   *
   * Warum 40 und nicht 8 (nachgerechnet 08.08.2026): bei 10 mm/mV und 2 Bildpunkten je
   * Millimeter betraegt die Schrittweite 1 mV = 20 Bildpunkte. Acht Schritte reichten damit
   * nur bis 160 Punkte ueber der Grundlinie - auf einer 726 Punkte hohen Flaeche blieb die
   * aeussere Haelfte des Feldes unbeschriftet, und zwar genau dort, wo hohe R-Zacken liegen. */
  var MAX_SCHRITTE = 40;

  /* Wieviele beschriftete Marken je Richtung die Achse HOECHSTENS tragen soll.
   *
   * Warum das zusaetzlich zum Mindestabstand noetig ist (gemessen 08.08.2026): der
   * Mindestabstand kennt nur die Schriftgroesse, nicht die Feldhoehe. Auf einer 726 Punkte
   * hohen Flaeche ergab das 35 Beschriftungen untereinander, alle 20 Punkte eine bei 10
   * Punkten Schrifthoehe - lueckenlos richtig und trotzdem nicht lesbar. Eine Skala, die man
   * nicht mehr ueberblickt, hilft beim Messen nicht.
   * Mit dieser Grenze liegen die Marken bei JEDER Verstaerkung rund 40 Punkte auseinander,
   * weil die Stufe mitwaechst. */
  var MAX_PRO_SEITE = 10;

  /* Der tatsaechlich geforderte Mindestabstand: das Groessere aus "Platz fuer die Schrift"
   * und "Feld nicht ueberfuellen". */
  function abstandsforderung(nutzbar, opts) {
    var vonSchrift = (endlich(opts.minAbstand) && opts.minAbstand >= 0) ? opts.minAbstand : MIN_ABSTAND;
    var vonDichte = nutzbar / (opts.maxProSeite || MAX_PRO_SEITE);
    return Math.max(vonSchrift, vonDichte);
  }

  function endlich(x) { return typeof x === 'number' && isFinite(x); }

  /* --------------------------------------------------------------------------------------
   * ZEITMARKEN: Liste der senkrechten Marken ueber die Breite.
   *   breite  Zeichenflaeche in Einheiten
   *   pmm     Einheiten je Millimeter
   *   speed   Vorschub in mm/s (25 / 50 / 100)
   * Rueckgabe: [{x, sek, voll}]  - "voll" heisst volle Sekunde und wird beschriftet.
   * ------------------------------------------------------------------------------------ */
  function zeitMarken(breite, pmm, speed) {
    if (!endlich(breite) || !endlich(pmm) || !endlich(speed)) return [];
    if (breite <= 0 || pmm <= 0 || speed <= 0) return [];
    var proSek = pmm * speed, schritt = proSek * TAKT_S;
    if (!(schritt > 0)) return [];
    var aus = [], i = 0, x;
    /* Ueber den Index laufen, nicht ueber x aufaddieren: aufaddierte Gleitkommazahlen
     * driften, und die letzte Marke saesse dann nicht mehr auf dem Raster. */
    for (i = 0; ; i++) {
      x = i * schritt;
      if (x > breite + 0.5) break;
      var sek = i * TAKT_S;
      /* Auf Zehntel runden, sonst entscheidet ein Gleitkommarest darueber, ob die Sekunde
       * beschriftet wird (0,2*5 = 1.0000000000000002). */
      aus.push({ x: x, sek: sek, voll: (Math.round(sek * 10) % 10) === 0 });
    }
    return aus;
  }

  /* Schrittweite der Amplitudenteilung in mV: die feinste Stufe, bei der zwei Beschriftungen
   * noch "minAbstand" Einheiten auseinanderliegen.
   *
   * minAbstand 0 heisst ausdruecklich "kein Mindestabstand" und wird NICHT als "nichts
   * angegeben" behandelt. Der Unterschied ist nicht theoretisch: solange die 0 still auf den
   * Vorgabewert zurueckfiel, bekamen Schirm und PDF bei gleicher Verstaerkung verschiedene
   * Teilungen - der Ausdruck war dann anders geteilt als das Bild, aus dem er entstand. */
  function mvSchritt(pmm, gain, minAbstand) {
    var proMv = pmm * gain;
    var min = (endlich(minAbstand) && minAbstand >= 0) ? minAbstand : MIN_ABSTAND;
    for (var i = 0; i < STUFEN.length; i++) {
      if (proMv * STUFEN[i] >= min) return STUFEN[i];
    }
    return STUFEN[STUFEN.length - 1];
  }

  /* --------------------------------------------------------------------------------------
   * AMPLITUDENMARKEN: Liste der waagerechten Marken, von der Grundlinie aus in beide
   * Richtungen.
   *   hoehe   Zeichenflaeche in Einheiten
   *   pmm     Einheiten je Millimeter
   *   gain    Verstaerkung in mm/mV (5 / 10 / 20 / 40)
   *   opts    {oben, unten}  freizuhaltender Rand in Einheiten (Legende, Sekundenbeschriftung)
   *           {minAbstand}   Mindestabstand zweier Beschriftungen in Einheiten
   * Rueckgabe: [{y, mv}] - ohne die Grundlinie selbst, die wird gesondert gezeichnet.
   * ------------------------------------------------------------------------------------ */
  function mvMarken(hoehe, pmm, gain, opts) {
    if (!endlich(hoehe) || !endlich(pmm) || !endlich(gain)) return [];
    if (hoehe <= 0 || pmm <= 0 || gain <= 0) return [];
    opts = opts || {};
    var proMv = pmm * gain, mitte = hoehe / 2;
    var oben = opts.oben || 0, unten = opts.unten || 0;
    var schritt = mvSchritt(pmm, gain, abstandsforderung(mitte - oben, opts));
    var aus = [];
    for (var k = -MAX_SCHRITTE; k <= MAX_SCHRITTE; k++) {
      if (k === 0) continue;
      var mv = k * schritt, y = mitte - mv * proMv;
      if (y < oben || y > hoehe - unten) continue;
      /* Auf drei Stellen runden: 0,5*3 ergibt sonst 1.5000000000000002 in der Beschriftung. */
      aus.push({ y: y, mv: Math.round(mv * 1000) / 1000 });
    }
    return aus;
  }

  /* --------------------------------------------------------------------------------------
   * AMPLITUDENMARKEN OHNE KALIBRIERUNG: dieselbe Achse, aber in Millimetern Ausschlag.
   *
   * Sie haengt NICHT an der Verstaerkung, und das ist kein Versehen: ein Millimeter auf dem
   * Streifen ist ein Millimeter, gleich wie das Signal skaliert wurde. Genau deshalb ist das
   * die einzige Amplitudenangabe, die ohne bekannte Geraeteverstaerkung belegbar bleibt.
   *   hoehe   Zeichenflaeche in Einheiten
   *   pmm     Einheiten je Millimeter
   *   opts    {oben, unten, minAbstand} wie bei mvMarken
   * Rueckgabe: [{y, mm}]
   * ------------------------------------------------------------------------------------ */
  function mmSchritt(pmm, minAbstand) {
    var min = (endlich(minAbstand) && minAbstand >= 0) ? minAbstand : MIN_ABSTAND;
    for (var i = 0; i < MM_STUFEN.length; i++) {
      if (pmm * MM_STUFEN[i] >= min) return MM_STUFEN[i];
    }
    return MM_STUFEN[MM_STUFEN.length - 1];
  }

  function mmMarken(hoehe, pmm, opts) {
    if (!endlich(hoehe) || !endlich(pmm)) return [];
    if (hoehe <= 0 || pmm <= 0) return [];
    opts = opts || {};
    var mitte = hoehe / 2;
    var oben = opts.oben || 0, unten = opts.unten || 0;
    var schritt = mmSchritt(pmm, abstandsforderung(mitte - oben, opts));
    var aus = [];
    for (var k = -MAX_SCHRITTE; k <= MAX_SCHRITTE; k++) {
      if (k === 0) continue;
      var mm = k * schritt, y = mitte - mm * pmm;
      if (y < oben || y > hoehe - unten) continue;
      aus.push({ y: y, mm: mm });
    }
    return aus;
  }

  /* --------------------------------------------------------------------------------------
   * Was EIN kleines Kaestchen (1 mm) bedeutet - die haeufigste Frage am Streifen.
   * ------------------------------------------------------------------------------------ */
  function kaestchen(speed, gain) {
    if (!endlich(speed) || !endlich(gain) || speed <= 0 || gain <= 0) return null;
    return {
      ms: Math.round(1 / speed * 1000),
      mv: Math.round(1 / gain * 1000) / 1000,
    };
  }

  /* kal===false: die Verstaerkung des Geraets ist unbekannt. Dann steht hier KEINE
   * Millivoltzahl - sie waere frei erfunden. Die Zeitangabe bleibt, denn der Vorschub ist
   * eine Einstellung dieser Anwendung und in jedem Fall belegt. */
  function kaestchenText(speed, gain, kal) {
    var k = kaestchen(speed, gain);
    if (!k) return '';
    if (kal === false) return '1 mm = ' + k.ms + ' ms · Höhe nicht kalibriert';
    return '1 mm = ' + k.ms + ' ms · ' + k.mv + ' mV';
  }

  /* --------------------------------------------------------------------------------------
   * WELCHER AUSSCHNITT EINES PUFFERS PASST MASSSTABSGETREU IN EINE FLAECHE?
   *
   * WARUM ES DIESE FUNKTION GIBT (Befund der Freigabepruefung 08.08.2026):
   * Sowohl das Zoomfenster als auch der PDF-Ausdruck haben ihre Abtastwerte bisher ueber die
   * GANZE verfuegbare Flaeche verteilt (dx = breite/(n-1)). Reichte der Puffer nicht aus, war
   * die Kurve damit stillschweigend gedehnt. Das ist kein Randfall: der Puffer ist so lang wie
   * die UEBERSICHTS-Leinwand (gemessen 1081 Werte), das Zoomfenster ist breiter (1265). Bei
   * 25 mm/s in beiden Ansichten sind das 17 % Dehnung, bei Uebersicht 50 und Zoom 25 sind es
   * 134 %. Der Zeit-Messzirkel rechnet Bildpunkte ueber den Vorschub in Millisekunden um und
   * setzt einen echten Massstab voraus - eine um 17 % gedehnte Kurve ergibt eine um 17 % zu
   * lange QRS-Dauer.
   *
   * Deshalb: ein Abtastwert bekommt IMMER genau die Breite, die ihm bei diesem Vorschub
   * zusteht (speed*pmm/hz). Reicht der Puffer nicht, bleibt Flaeche uebrig - das ist die
   * ehrliche Auskunft "so viel Signal habe ich" und nicht "so lange hat es gedauert".
   *
   *   breite     verfuegbare Flaeche in Einheiten
   *   pmm        Einheiten je Millimeter
   *   speed      Vorschub in mm/s
   *   hz         Abtastrate des Puffers
   *   vorhanden  Anzahl Werte im Puffer
   * Rueckgabe: {n, breite, proWert} - n Werte, die zusammen "breite" Einheiten einnehmen.
   * ------------------------------------------------------------------------------------ */
  function kurvenAusschnitt(breite, pmm, speed, hz, vorhanden) {
    var leer = { n: 0, breite: 0, proWert: 0 };
    if (!endlich(breite) || !endlich(pmm) || !endlich(speed) || !endlich(hz) || !endlich(vorhanden)) return leer;
    if (breite <= 0 || pmm <= 0 || speed <= 0 || hz <= 0 || vorhanden < 1) return leer;
    var proWert = speed * pmm / hz;
    if (!(proWert > 0)) return leer;
    /* +1, weil n Werte n-1 Abstaende ergeben: fuer eine Flaeche von genau einem Abstand
     * braucht es zwei Werte. */
    var passt = Math.floor(breite / proWert) + 1;
    var n = Math.min(Math.floor(vorhanden), passt);
    if (n < 2) return { n: n, breite: 0, proWert: proWert };
    return { n: n, breite: Math.min(breite, (n - 1) * proWert), proWert: proWert };
  }

  /* Umrechnung, die Skala und Kurve GEMEINSAM benutzen. Steht hier, damit keine zweite
   * Stelle sie noch einmal aufschreibt: eine Skala, die neben der Kurve gerechnet wird
   * statt aus derselben Formel, waere schlimmer als gar keine. */
  function xVonSekunde(sek, pmm, speed) { return sek * speed * pmm; }
  function yVonMv(mv, hoehe, pmm, gain) { return hoehe / 2 - mv * gain * pmm; }

  return {
    zeitMarken: zeitMarken,
    mvMarken: mvMarken,
    mvSchritt: mvSchritt,
    mmMarken: mmMarken,
    mmSchritt: mmSchritt,
    kaestchen: kaestchen,
    kaestchenText: kaestchenText,
    kurvenAusschnitt: kurvenAusschnitt,
    xVonSekunde: xVonSekunde,
    yVonMv: yVonMv,
    TAKT_S: TAKT_S, MIN_ABSTAND: MIN_ABSTAND, MAX_SCHRITTE: MAX_SCHRITTE,
    MAX_PRO_SEITE: MAX_PRO_SEITE, STUFEN: STUFEN, MM_STUFEN: MM_STUFEN,
  };
}));
