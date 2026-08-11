/*
 * ekg-modell.js — die geeichte Vorgabe des VIRTUELLEN GERAETS, in Millivolt und Millisekunden.
 *
 * WARUM ES DIESE DATEI GIBT (Nutzerbefund 11.08.2026):
 * Das virtuelle Monitorgeraet im Geraetemenue zeichnete seine Kurven ueber die PHASE des
 * Herzschlags. Die Phase laeuft in jedem Schlag von 0 bis 1 - ihre Breite in Sekunden haengt
 * also an der Frequenz. Am laufenden Programm nachgemessen:
 *
 *      EKG, Halbwertsbreite des Kammerkomplexes
 *       60/min -> 23 ms      140/min -> 10 ms
 *      100/min -> 14 ms      240/min ->  6 ms      (Faktor 3,8)
 *
 *      Pleth, Anstieg bis zum Gipfel
 *       60/min -> 100 ms     120/min -> 50 ms      200/min -> 30 ms
 *
 * Beides ist falsch. Ein Kammerkomplex ist eine Eigenschaft der Kammer, nicht der Frequenz;
 * und der systolische Anstieg der Pulswelle bleibt bei steigender Frequenz nahezu gleich lang -
 * kuerzer wird die DIASTOLE. Ein virtueller Monitor, der das anders zeigt, bringt beim Ueben
 * genau das Falsche bei, und jede Messung an seiner Kurve misst die Frequenz statt das Herz.
 *
 * WAS DIESE DATEI IST: die eine Quelle fuer die Vorgabewerte und die Kurvenform. Sie rechnet
 * in ECHTEN Einheiten und in der ZEIT seit Zyklusbeginn. Damit ist das virtuelle Geraet
 * eichfaehig: was hier vorgegeben ist, muss die Auswertung wiederfinden
 * (tools/monitor-geraet-test.js).
 *
 * BRAUCHT ES DAFUER EIN ANGESCHLOSSENES GERAET? Nein. Geeicht wird gegen eine BEKANNTE
 * Vorgabe, und die steht hier. Ein Geraet braucht man, um ein TIER zu messen - und sobald
 * eines anliegt, hat sein Signal Vorrang (realVal() spielt dann den echten Streifen ab).
 *
 * Reines ES5, keine Abhaengigkeiten. Laeuft im Browser (window.VS.modell) und in Node.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.VS = root.VS || {}; root.VS.modell = factory(); }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ------------------------------------------------------------------------------------
   * EKG — Vorgabe je Tierart, in Millivolt und Millisekunden.
   *
   * Die Zahlen sind an den Normbaendern der Art ausgerichtet (ui/app/index.html: EKGNORM,
   * Quellen Tilley / Willis / Kresken), damit ein geuebter Blick auf die virtuelle Kurve
   * dasselbe sieht wie am Tier:
   *   Hund  R 1,0 mV (Band 1,0-3,0) · QRS 50 ms (bis 60) · PQ 110 ms (60-130) · QT 230 (150-250)
   *   Katze R 0,7 mV (Band 0,2-0,9) · QRS 35 ms (bis 40) · PQ  70 ms (50-90)  · QT 170 (120-180)
   * QT ergibt sich als qrsMs + stMs + tMs und ist deshalb keine eigene Vorgabe.
   * ---------------------------------------------------------------------------------- */
  var EKG = {
    hund:     { rAmp: 1.00, qAmp: 0.10, sAmp: 0.25, qrsMs: 50, pAmp: 0.15, pMs: 40, pqMs: 110, stMs: 60, tAmp: 0.25, tMs: 120 },
    katze:    { rAmp: 0.70, qAmp: 0.05, sAmp: 0.15, qrsMs: 35, pAmp: 0.10, pMs: 30, pqMs: 70, stMs: 45, tAmp: 0.18, tMs: 90 },
    pferd:    { rAmp: 1.20, qAmp: 0.15, sAmp: 0.60, qrsMs: 110, pAmp: 0.30, pMs: 120, pqMs: 300, stMs: 120, tAmp: 0.40, tMs: 220 },
    standard: { rAmp: 1.00, qAmp: 0.10, sAmp: 0.25, qrsMs: 50, pAmp: 0.15, pMs: 40, pqMs: 110, stMs: 60, tAmp: 0.25, tMs: 120 }
  };
  function ekgVorgabe(art) { return EKG[art] || EKG.standard; }

  /* Erhoehter Kosinus mit EXAKTEM Traeger [t0, t0+dauer]. Anders als eine Gauss-Kurve hat er
   * einen definierten Anfang und ein definiertes Ende - nur dann ist eine Dauer ueberhaupt
   * eine Vorgabe, gegen die sich eichen laesst. */
  function welle(t, t0, dauer) {
    if (!(dauer > 0)) return 0;
    if (t < t0 || t > t0 + dauer) return 0;
    return 0.5 * (1 - Math.cos(2 * Math.PI * (t - t0) / dauer));
  }

  /*
   * EKG-Kurve in MILLIVOLT.
   *   tSek   Zeit seit Beginn des Herzzyklus
   *   rrSek  Dauer dieses Zyklus
   *   W      Formvorgaben des gewaehlten Rhythmus (p, pq, qrs, drop, ectopic, flutter, ...)
   *   beatN  Schlagzaehler (fuer Muster ueber mehrere Schlaege)
   *   art    Tierart
   */
  function ekgMv(tSek, rrSek, W, beatN, art) {
    W = W || {};
    var V = ekgVorgabe(art);
    if (W.flat) return 0;                                   // Asystolie: die Nulllinie
    if (W.chaos) {                                          // Kammerflimmern
      var f = tSek / (rrSek || 0.6);
      return 0.55 * Math.sin(f * 38 + (beatN || 0)) + 0.32 * Math.sin(f * 67 + 2);
    }
    var beat = beatN || 0, y = 0;
    var breit = (W.qrs > 1.5), hatP = (W.p && W.pq !== 'diss'), faelltAus = false, tVz = 1;
    var rAmp = V.rAmp, qrsMs = V.qrsMs;
    if (W.drop === 'wenckebach') { var r1 = W.ratio || 4; if (beat % r1 === r1 - 1) faelltAus = true; }
    if (W.drop === 'mobitz2') { var r2 = W.ratio || 3; if (beat % r2 === r2 - 1) faelltAus = true; }
    if (W.ectopic && beat % 4 === 3) {
      if (W.ectopic === 'ves') { breit = true; hatP = false; tVz = -1; rAmp = V.rAmp * 1.3; }
      else { hatP = true; breit = false; }
    }
    if (breit) qrsMs = V.qrsMs * 2.2;                       // ventrikulaer / Schenkelblock
    var pqMs = V.pqMs;
    if (typeof W.pq === 'number') pqMs = V.pqMs * W.pq;
    else if (W.pq === 'inc') pqMs = V.pqMs + (beat % (W.ratio || 4)) * 30;
    /* Die R-Zacke liegt bei tR: davor Platz fuer P und PQ, danach fuer ST und T. */
    var tR = (pqMs + qrsMs * 0.5) / 1000 + 0.02;
    var t = tSek - tR;
    var qrsS = qrsMs / 1000, q0 = -0.35 * qrsS;
    if (hatP) y += V.pAmp * welle(t, q0 - (pqMs / 1000), V.pMs / 1000);
    if (!faelltAus) {
      y += -V.qAmp * welle(t, q0, 0.20 * qrsS);
      y += rAmp * welle(t, q0 + 0.20 * qrsS, 0.45 * qrsS);
      y += -V.sAmp * welle(t, q0 + 0.65 * qrsS, 0.35 * qrsS);
      y += tVz * V.tAmp * (breit ? 1.4 : 1) * welle(t, q0 + qrsS + (V.stMs / 1000), V.tMs / 1000);
    }
    if (W.flutter) y += 0.15 * (2 * (((tSek / (rrSek || 0.6)) * 4) % 1) - 1);
    if (W.pq === 'diss') y += V.pAmp * welle((tSek * 2) % (rrSek || 0.6), 0.05, V.pMs / 1000);
    return y;
  }

  /* ------------------------------------------------------------------------------------
   * PLETHYSMOGRAMM (SpO2-Kurve)
   *
   * EHRLICHE GRENZE, DIE MAN NENNEN MUSS: ein Plethysmogramm hat KEINE absolute physikalische
   * Einheit. Es misst die Aenderung der Lichtdurchlaessigkeit; Geraetehersteller normieren es
   * auf die Bahnhoehe und stellen die Verstaerkung automatisch nach. Eine Angabe "so und so
   * viele Millivolt" waere hier frei erfunden - und deshalb steht sie nirgends.
   *
   * WAS SEHR WOHL EICHFAEHIG IST, und genau daran hakte es:
   *   1. Die PULSFREQUENZ der Kurve muss die angezeigte Herzfrequenz sein.
   *   2. Die ZEITEN im Puls sind Vorgaben in Millisekunden. Der systolische Anstieg dauert
   *      beim Kleintier rund 100 ms und bleibt bei steigender Frequenz nahezu gleich; kuerzer
   *      wird die DIASTOLE. Vorher war der Anstieg ein fester Anteil der Zykluslaenge und
   *      schrumpfte damit von 100 ms auf 30 ms - das ist die Kurve eines anderen Kreislaufs.
   *   3. Die Dikrotie (Inzisur der Aortenklappe) sitzt nach einem festen Zeitanteil der
   *      Systole, nicht des ganzen Zyklus.
   * Die HOEHE bleibt relativ (0 bis 1 der Bahn) und wird ueber die Perfusion gesteuert -
   * so, wie es ein echtes Geraet auch tut.
   * ---------------------------------------------------------------------------------- */
  var PLETH = {
    anstiegMs: 100,        // Fuss bis Gipfel (systolischer Anstieg)
    inzisurMs: 190,        // Lage der dikroten Inzisur nach dem Fuss
    abfallTau: 0.28,       // Zeitkonstante des diastolischen Abfalls in Sekunden
    amp: { normal: 1.00, weak: 0.40, flat: 0 }
  };
  /*
   * tSek/rrSek wie beim EKG. form: 'normal' | 'weak' | 'flat'.
   * Rueckgabe 0..1 (Anteil der Bahn), 0 = Fusspunkt.
   */
  function plethAnteil(tSek, rrSek, form) {
    var amp = PLETH.amp[form];
    if (amp == null) amp = PLETH.amp.normal;
    if (!amp) return 0;
    var rr = rrSek > 0 ? rrSek : 0.6;
    var t = tSek % rr;
    /* Bei sehr hoher Frequenz kann der Anstieg nicht laenger sein als der halbe Zyklus -
     * sonst begaenne der naechste Puls, bevor dieser seinen Gipfel erreicht hat. */
    var anstieg = Math.min(PLETH.anstiegMs / 1000, rr * 0.45);
    var v;
    if (t < anstieg) {
      v = 0.5 * (1 - Math.cos(Math.PI * (t / anstieg)));            // weicher Anstieg auf 1
    } else {
      var d = t - anstieg;
      v = Math.exp(-d / PLETH.abfallTau);
      /* Dikrote Welle: eine kleine Erhebung nach der Inzisur. Sie sitzt an einer festen ZEIT,
       * nicht an einem Anteil des Zyklus. */
      var inz = (PLETH.inzisurMs / 1000) - anstieg;
      if (inz > 0) v += 0.18 * Math.exp(-Math.pow((d - inz) / 0.06, 2));
    }
    if (v < 0) v = 0;
    if (v > 1.2) v = 1.2;
    return amp * v;
  }

  return {
    EKG: EKG, PLETH: PLETH,
    ekgVorgabe: ekgVorgabe, ekgMv: ekgMv, plethAnteil: plethAnteil, welle: welle,
    /* QT ist keine eigene Vorgabe, sondern folgt aus den dreien - EINE Stelle, damit
     * Anzeige, Eichung und Test nicht verschieden rechnen. */
    qtMs: function (art) { var V = ekgVorgabe(art); return V.qrsMs + V.stMs + V.tMs; }
  };
}));
