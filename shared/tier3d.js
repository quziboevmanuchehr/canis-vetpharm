/*
 * tier3d.js — drehbares 3D-Modell des Patienten mit den Anlegepunkten der EKG-Elektroden.
 *
 * WARUM ES DIESE DATEI GIBT (09.08.2026):
 * Die Anlegegrafik war ein flacher Umriss von der Seite. Damit laesst sich die eine Frage,
 * an der beim EKG wirklich etwas haengt, gar nicht beantworten: WELCHE SEITE IST DAS?
 * Auf einem Seitenriss sieht die rechte Vordergliedmasse genauso aus wie die linke - sie
 * liegt nur dahinter. Genau diese Verwechslung ist der gefaehrlichste Bedienfehler am EKG:
 * wer RA und LA vertauscht, bekommt eine Kurve, die tadellos aussieht und in Ableitung I
 * gespiegelt ist. Ein Modell, das man DREHEN kann, zeigt die Seite statt sie zu behaupten.
 *
 * WARUM OHNE FREMDBIBLIOTHEK: Der Praxis-PC hat kein npm und kein Node im PATH; die
 * Oberflaeche ist reines ES5 ohne Bauschritt. Eine 3D-Bibliothek waere hier eine halbe
 * Megabyte Fremdcode fuer vier Kugeln und acht Roehren. Was gebraucht wird, sind eine
 * Drehmatrix, eine Projektion und eine Tiefensortierung - zusammen keine hundert Zeilen.
 *
 * WAS DIESES MODELL IST UND WAS NICHT:
 * Es ist ein STILISIERTES anatomisches Modell aus Grundkoerpern, kein Scan und kein
 * Abbild eines bestimmten Tieres. Es soll die LAGE der Gelenke und die SEITE zeigen -
 * dafuer sind die Verhaeltnisse (Rumpflaenge zu Beinlaenge, Hoehe von Ellbogen und Knie)
 * artgerecht gewaehlt, die Oberflaeche nicht. Ein huebscheres Modell mit falsch sitzendem
 * Ellbogen waere schaedlich, ein schlichtes mit richtigem Ellbogen ist brauchbar.
 *
 * DIE ANLEGEPUNKTE SIND NICHT AUFGEMALT, SONDERN SIND DIE GELENKE.
 * Die Beine entstehen aus zwei Abschnitten, die sich am Ellbogen bzw. am Knie treffen.
 * Der Anlegepunkt IST dieser Treffpunkt. Damit kann er gar nicht vom Gelenk abweichen -
 * anders als bei der frueheren Grafik, wo Umriss und Punkte zwei getrennte Zahlenreihen
 * waren und beim Anpassen auseinanderlaufen konnten.
 *
 * ACHSEN (rechtshaendig, aus Sicht des TIERES):
 *      x  Schwanz (-) nach Nase (+)          - Laengsachse
 *      y  Bauch   (-) nach Ruecken (+)       - Hochachse
 *      z  RECHTS  (-) nach LINKS  (+)        - Querachse
 * Daraus folgt unmittelbar und pruefbar: RA und RL haben z < 0, LA und LL haben z > 0;
 * RA und LA haben x > 0 (vorn), LL und RL haben x < 0 (hinten).
 *
 * Reines ES5, keine Abhaengigkeiten. Laeuft im Browser (window.VS.tier3d) und in Node.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.VS = root.VS || {}; root.VS.tier3d = factory(); }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ==========================================================================================
   * 1. GRUNDKOERPER
   * ========================================================================================== */

  /* Eine Kugel/Ellipsoid als Gitter aus Vierecken. rings = Breitengrade, segs = Laengengrade.
   * Grob genug, dass es auf einem Kiosk-i3 fluessig bleibt, fein genug, dass es rund aussieht. */
  function ellipsoid(mitte, radien, rings, segs, farbe) {
    var pts = [], faces = [], i, j;
    for (i = 0; i <= rings; i++) {
      var phi = Math.PI * i / rings;                 /* 0 = oben, PI = unten */
      var sy = Math.cos(phi), sr = Math.sin(phi);
      for (j = 0; j < segs; j++) {
        var th = 2 * Math.PI * j / segs;
        pts.push([
          mitte[0] + radien[0] * sr * Math.cos(th),
          mitte[1] + radien[1] * sy,
          mitte[2] + radien[2] * sr * Math.sin(th)
        ]);
      }
    }
    for (i = 0; i < rings; i++) {
      for (j = 0; j < segs; j++) {
        var a = i * segs + j, b = i * segs + (j + 1) % segs;
        var c = (i + 1) * segs + (j + 1) % segs, d = (i + 1) * segs + j;
        faces.push([a, b, c, d]);
      }
    }
    return { pts: pts, faces: faces, farbe: farbe };
  }

  /* Ein sich verjuengender Zylinder zwischen zwei Punkten - Beine, Hals, Schwanz.
   * Der Ring wird um die Verbindungsachse gelegt; dafuer braucht es zwei Vektoren senkrecht
   * dazu. Der Hilfsvektor wird gewechselt, wenn die Achse fast parallel dazu liegt - sonst
   * entartet das Kreuzprodukt zu null und das Glied wird zu einer Linie. */
  function roehre(von, bis, r1, r2, segs, farbe) {
    var ax = [bis[0] - von[0], bis[1] - von[1], bis[2] - von[2]];
    var len = Math.sqrt(ax[0] * ax[0] + ax[1] * ax[1] + ax[2] * ax[2]) || 1e-6;
    var e = [ax[0] / len, ax[1] / len, ax[2] / len];
    var hilf = (Math.abs(e[1]) > 0.9) ? [1, 0, 0] : [0, 1, 0];
    var u = kreuz(e, hilf); u = norm(u);
    var v = norm(kreuz(e, u));
    var pts = [], faces = [], j;
    for (j = 0; j < segs; j++) {
      var th = 2 * Math.PI * j / segs, c = Math.cos(th), s = Math.sin(th);
      pts.push([von[0] + r1 * (u[0] * c + v[0] * s), von[1] + r1 * (u[1] * c + v[1] * s), von[2] + r1 * (u[2] * c + v[2] * s)]);
    }
    for (j = 0; j < segs; j++) {
      var t2 = 2 * Math.PI * j / segs, c2 = Math.cos(t2), s2 = Math.sin(t2);
      pts.push([bis[0] + r2 * (u[0] * c2 + v[0] * s2), bis[1] + r2 * (u[1] * c2 + v[1] * s2), bis[2] + r2 * (u[2] * c2 + v[2] * s2)]);
    }
    for (j = 0; j < segs; j++) {
      var n = (j + 1) % segs;
      faces.push([j, n, segs + n, segs + j]);
    }
    /* Deckel, damit ein Bein von vorn nicht hohl wirkt. */
    var oben = [], unten = [];
    for (j = 0; j < segs; j++) { oben.push(j); unten.push(2 * segs - 1 - j); }
    faces.push(oben); faces.push(unten);
    return { pts: pts, faces: faces, farbe: farbe };
  }

  function kreuz(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function norm(a) {
    var l = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]) || 1e-6;
    return [a[0] / l, a[1] / l, a[2] / l];
  }

  /* Teile zu EINEM Netz zusammenlegen; die Punktnummern der Folgeteile werden verschoben. */
  function fuege(teile) {
    var pts = [], faces = [], k, i, off = 0;
    for (k = 0; k < teile.length; k++) {
      var t = teile[k];
      for (i = 0; i < t.pts.length; i++) pts.push(t.pts[i]);
      for (i = 0; i < t.faces.length; i++) {
        var f = t.faces[i], g = [];
        for (var j = 0; j < f.length; j++) g.push(f[j] + off);
        g.farbe = t.farbe;
        faces.push(g);
      }
      off += t.pts.length;
    }
    return { pts: pts, faces: faces };
  }

  /* ==========================================================================================
   * 2. KOERPERBAU JE TIERART
   *
   * Die Zahlen sind VERHAELTNISSE, keine Zentimeter. Massgeblich ist, wo Ellbogen und Knie
   * relativ zum Rumpf sitzen - daran haengt der Anlegepunkt. Ein Frettchen ist ein Schlauch
   * auf sehr kurzen Beinen: sein Ellbogen liegt fast auf der Unterlinie und weiter vorn als
   * beim Hund. Wer die Punkte eines Hundes auf ein Frettchen uebertraegt, klemmt am Bauch.
   * ========================================================================================== */
  var BAU = {
    hund: {
      name: 'Hund',
      rumpf: { mitte: [0, 0, 0], r: [1.05, 0.42, 0.34] },
      brust: { mitte: [0.45, -0.05, 0], r: [0.5, 0.42, 0.36] },
      hals: { von: [0.95, 0.18, 0], bis: [1.45, 0.5, 0], r1: 0.24, r2: 0.17 },
      kopf: { mitte: [1.62, 0.55, 0], r: [0.32, 0.24, 0.22] },
      schnauze: { von: [1.8, 0.5, 0], bis: [2.12, 0.44, 0], r1: 0.15, r2: 0.1 },
      /* HAENGEOHR. Die erste Fassung hatte auch beim Hund ein Stehohr - im gerenderten Bild
       * las sich das Tier dadurch eher wie ein Reh als wie ein Hund. Das ist keine Eitelkeit:
       * wer die Art auf dem Modell nicht wiedererkennt, glaubt auch den Anlegepunkten nicht. */
      ohr: { art: 'haenge', laenge: 0.3, z: 0.17, x: 1.56, y: 0.7, r1: 0.11, r2: 0.06 },
      schwanz: { von: [-1.0, 0.25, 0], bis: [-1.6, 0.55, 0], r1: 0.1, r2: 0.04 },
      /* Schulter/Huefte oben, Ellbogen/Knie in der Mitte, Pfote unten. */
      vorn: { schulter: [0.62, 0.1, 0.3], ellbogen: [0.6, -0.42, 0.3], pfote: [0.62, -1.0, 0.3], r: [0.15, 0.11, 0.09] },
      hinten: { huefte: [-0.68, 0.14, 0.3], knie: [-0.62, -0.38, 0.3], pfote: [-0.7, -1.0, 0.3], r: [0.18, 0.12, 0.09] },
      lage: 'Die Klemmen sitzen vorn am Ellbogen und hinten am Knie — auf der Haut, nicht im Fell.'
    },
    katze: {
      name: 'Katze',
      rumpf: { mitte: [0, 0, 0], r: [0.92, 0.34, 0.27] },
      brust: { mitte: [0.4, -0.03, 0], r: [0.42, 0.33, 0.28] },
      hals: { von: [0.82, 0.14, 0], bis: [1.2, 0.42, 0], r1: 0.19, r2: 0.14 },
      kopf: { mitte: [1.34, 0.48, 0], r: [0.26, 0.22, 0.21] },
      schnauze: { von: [1.48, 0.44, 0], bis: [1.66, 0.4, 0], r1: 0.13, r2: 0.1 },
      ohr: { art:'steh', laenge: 0.3, z: 0.13, x: 1.3, y: 0.64, r1: 0.11, r2: 0.02 },   /* gross und spitz */
      schwanz: { von: [-0.88, 0.2, 0], bis: [-1.62, 0.46, 0], r1: 0.08, r2: 0.05 },
      vorn: { schulter: [0.54, 0.06, 0.24], ellbogen: [0.52, -0.34, 0.24], pfote: [0.54, -0.82, 0.24], r: [0.12, 0.085, 0.07] },
      hinten: { huefte: [-0.58, 0.1, 0.24], knie: [-0.54, -0.3, 0.24], pfote: [-0.6, -0.82, 0.24], r: [0.14, 0.095, 0.07] },
      lage: 'Bei der Katze sind die Ausschläge klein — auf sauberen Hautkontakt achten und die Verstärkung erhöhen, statt zu klemmen.'
    },
    frettchen: {
      name: 'Frettchen',
      /* Sehr langer, walzenfoermiger Rumpf auf sehr kurzen Beinen. Der Ellbogen liegt fast
       * auf der Unterlinie - das ist der Grund, warum dieses Tier ein eigenes Modell braucht. */
      rumpf: { mitte: [0, 0, 0], r: [1.15, 0.26, 0.22] },
      brust: { mitte: [0.5, -0.02, 0], r: [0.42, 0.25, 0.23] },
      hals: { von: [1.05, 0.06, 0], bis: [1.4, 0.16, 0], r1: 0.17, r2: 0.14 },
      kopf: { mitte: [1.55, 0.2, 0], r: [0.24, 0.16, 0.15] },
      schnauze: { von: [1.7, 0.17, 0], bis: [1.92, 0.14, 0], r1: 0.11, r2: 0.07 },
      ohr: { art:'steh', laenge: 0.1, z: 0.11, x: 1.5, y: 0.28, r1: 0.08, r2: 0.05 },   /* klein und rund */
      schwanz: { von: [-1.1, 0.06, 0], bis: [-1.85, 0.2, 0], r1: 0.1, r2: 0.05 },
      vorn: { schulter: [0.6, -0.02, 0.19], ellbogen: [0.6, -0.24, 0.19], pfote: [0.6, -0.46, 0.19], r: [0.09, 0.07, 0.06] },
      hinten: { huefte: [-0.72, 0.0, 0.19], knie: [-0.7, -0.22, 0.19], pfote: [-0.72, -0.46, 0.19], r: [0.1, 0.075, 0.06] },
      lage: 'Beim Frettchen liegen Ellbogen und Knie dicht an der Unterlinie — die Klemmen sitzen tiefer und weiter vorn als beim Hund.'
    },
    kaninchen: {
      name: 'Kaninchen',
      /* Die Kraft liegt in der Hinterhand: die Huefte steht hoch, das Knie weit oben und
       * deutlich weiter vorn als bei Hund und Katze. */
      rumpf: { mitte: [0, 0, 0], r: [0.9, 0.4, 0.32] },
      brust: { mitte: [0.42, -0.06, 0], r: [0.38, 0.32, 0.28] },
      hals: { von: [0.8, 0.14, 0], bis: [1.08, 0.34, 0], r1: 0.2, r2: 0.17 },
      kopf: { mitte: [1.24, 0.42, 0], r: [0.28, 0.2, 0.19] },
      schnauze: { von: [1.4, 0.36, 0], bis: [1.56, 0.32, 0], r1: 0.12, r2: 0.09 },
      ohr: { art:'steh', laenge: 0.66, z: 0.11, x: 1.16, y: 0.56, r1: 0.09, r2: 0.05 },  /* die Ohren machen die Art erkennbar */
      schwanz: { von: [-0.86, 0.16, 0], bis: [-1.02, 0.26, 0], r1: 0.09, r2: 0.07 },
      vorn: { schulter: [0.5, 0.0, 0.26], ellbogen: [0.5, -0.34, 0.26], pfote: [0.5, -0.72, 0.26], r: [0.11, 0.08, 0.07] },
      hinten: { huefte: [-0.5, 0.2, 0.28], knie: [-0.36, -0.24, 0.28], pfote: [-0.62, -0.72, 0.28], r: [0.22, 0.12, 0.08] },
      lage: 'Beim Kaninchen sitzt das Knie durch die kräftige Hinterhand weit vorn und hoch — nicht am Sprunggelenk klemmen.'
    }
  };

  /* ==========================================================================================
   * 3. DAS NETZ BAUEN
   * ========================================================================================== */
  var HAUT = '#c9a074', BEIN = '#b98f66', OHR = '#a87a55';

  function netz(art) {
    var b = BAU[art] || null;
    if (!b) return null;
    var teile = [];
    teile.push(ellipsoid(b.rumpf.mitte, b.rumpf.r, 8, 14, HAUT));
    teile.push(ellipsoid(b.brust.mitte, b.brust.r, 7, 12, HAUT));
    teile.push(roehre(b.hals.von, b.hals.bis, b.hals.r1, b.hals.r2, 10, HAUT));
    teile.push(ellipsoid(b.kopf.mitte, b.kopf.r, 7, 12, HAUT));
    teile.push(roehre(b.schnauze.von, b.schnauze.bis, b.schnauze.r1, b.schnauze.r2, 8, HAUT));
    teile.push(roehre(b.schwanz.von, b.schwanz.bis, b.schwanz.r1, b.schwanz.r2, 8, HAUT));
    /* Nasenspiegel: eine kleine Kugel an der Schnauzenspitze. Sie kostet zwoelf Vierecke
     * und macht auf einen Blick klar, wo vorn ist - beim gedrehten Modell ist das die
     * Frage, die man am haeufigsten stellt. */
    teile.push(ellipsoid([b.schnauze.bis[0] + b.schnauze.r2 * 0.4, b.schnauze.bis[1], 0],
      [b.schnauze.r2 * 0.8, b.schnauze.r2 * 0.7, b.schnauze.r2 * 0.8], 4, 7, '#5a4436'));
    /* Ohren beidseits. Stehohr oder Haengeohr - das entscheidet mehr ueber die
     * Wiedererkennung der Art als der ganze Rumpf: mit senkrechten Spiessen las sich der
     * Hund im ersten Bild wie ein Reh. Wer die Art nicht wiedererkennt, glaubt auch den
     * Anlegepunkten nicht. */
    var s, o = b.ohr;
    for (s = -1; s <= 1; s += 2) {
      var fuss = [o.x, o.y, s * o.z], spitze;
      if (o.art === 'haenge') spitze = [o.x - o.laenge * 0.55, o.y - o.laenge * 0.75, s * (o.z + o.laenge * 0.35)];
      else spitze = [o.x - o.laenge * 0.18, o.y + o.laenge, s * (o.z + o.laenge * 0.12)];
      teile.push(roehre(fuss, spitze, o.r1, o.r2, 6, OHR));
    }
    /* Beine: zwei Abschnitte je Bein, gespiegelt auf beide Seiten. Der Treffpunkt der
     * Abschnitte IST der Anlegepunkt (siehe Dateikopf). */
    var marken = [];
    for (s = -1; s <= 1; s += 2) {
      var rechts = (s < 0);
      var v = b.vorn, h = b.hinten;
      teile.push(roehre(sp3(v.schulter, s), sp3(v.ellbogen, s), v.r[0], v.r[1], 8, BEIN));
      teile.push(roehre(sp3(v.ellbogen, s), sp3(v.pfote, s), v.r[1], v.r[2], 8, BEIN));
      teile.push(roehre(sp3(h.huefte, s), sp3(h.knie, s), h.r[0], h.r[1], 8, BEIN));
      teile.push(roehre(sp3(h.knie, s), sp3(h.pfote, s), h.r[1], h.r[2], 8, BEIN));
      /* PFOTEN. Ohne sie enden die Beine als abgeschnittene Roehren - das Tier sieht aus,
       * als stuende es auf Stelzen, und der Blick bleibt an der falschen Stelle haengen.
       * Sie liegen etwas VOR der Beinachse, weil eine Pfote nach vorn zeigt. */
      teile.push(pfote(sp3(v.pfote, s), v.r[2]));
      teile.push(pfote(sp3(h.pfote, s), h.r[2]));
      /* p ist das GELENK (die anatomische Verankerung), haut der Punkt auf der Aussenseite
       * der Gliedmasse - dort sitzt die Klemme wirklich. Der Unterschied ist nicht Kosmetik:
       * die Verdeckungspruefung weiter unten braucht einen Punkt auf der OBERFLAECHE. Laege
       * die Marke in der Beinachse, waere sie von der eigenen Beinvorderseite immer verdeckt
       * und das Modell zeigte nie eine Klemme. */
      marken.push({
        k: rechts ? 'RA' : 'LA', p: sp3(v.ellbogen, s),
        haut: hautpunkt(sp3(v.ellbogen, s), s, v.r[1]),
        aussen: [0, -0.2, s], gelenk: 'Ellbogen',
        wo: (rechts ? 'rechte' : 'linke') + ' Vordergliedmaße, Höhe Ellbogen'
      });
      marken.push({
        k: rechts ? 'RL' : 'LL', p: sp3(h.knie, s),
        haut: hautpunkt(sp3(h.knie, s), s, h.r[1]),
        aussen: [0, -0.2, s], gelenk: 'Knie',
        wo: (rechts ? 'rechte' : 'linke') + ' Hintergliedmaße, Höhe Knie' + (rechts ? ' (Neutral/Erde)' : '')
      });
    }
    var m = fuege(teile);
    m.marken = marken;
    m.art = art;
    m.name = b.name;
    m.lage = b.lage;
    /* AUF DIE EIGENE MITTE SCHIEBEN (gemessen im Browser, 09.08.2026: 56 px Rand links,
     * 19 px rechts). Der Bauplan ist um den Rumpfmittelpunkt herum geschrieben, das Tier
     * reicht mit der Nase aber weiter nach vorn als mit dem Schwanz nach hinten. Ohne diese
     * Verschiebung steht das Modell schief im Bild UND dreht sich um einen Punkt hinter
     * seinem Koerpermittelpunkt - beim Ziehen wandert es dann seitlich aus dem Bild.
     * Die Marken werden mitgeschoben; ihre Lage ZUEINANDER und die Vorzeichen von x und z
     * bleiben davon unberuehrt, und genau die prueft der Test. */
    m.mitte = schwerpunkt(m.pts);
    verschiebe(m.pts, m.mitte);
    var i;
    for (i = 0; i < marken.length; i++) {
      marken[i].p = minus(marken[i].p, m.mitte);
      marken[i].haut = minus(marken[i].haut, m.mitte);
    }
    m.ausdehnung = ausdehnungMessen(m, marken);
    return m;
  }
  /* Mitte der Huellquader-Ausdehnung, nicht Mittel der Punkte: ein fein aufgeloester Kopf
   * haette sonst mehr Gewicht als der grobe Rumpf und zoege die Mitte nach vorn. */
  function schwerpunkt(pts) {
    var lo = [1e9, 1e9, 1e9], hi = [-1e9, -1e9, -1e9], i, k;
    for (i = 0; i < pts.length; i++) for (k = 0; k < 3; k++) {
      if (pts[i][k] < lo[k]) lo[k] = pts[i][k];
      if (pts[i][k] > hi[k]) hi[k] = pts[i][k];
    }
    return [(lo[0] + hi[0]) / 2, (lo[1] + hi[1]) / 2, 0];   /* z bleibt 0: die Seiten sind symmetrisch */
  }
  function verschiebe(pts, m) {
    for (var i = 0; i < pts.length; i++) { pts[i][0] -= m[0]; pts[i][1] -= m[1]; pts[i][2] -= m[2]; }
  }
  function minus(p, m) { return [p[0] - m[0], p[1] - m[1], p[2] - m[2]]; }

  /* ------------------------------------------------------------------------------------------
   * ausdehnungMessen — wie weit reicht das Modell im Bild, waagerecht und senkrecht?
   *
   * EINMAL FUER ALLE DREHWINKEL, und das ist der Punkt. Ein Massstab, der aus der gerade
   * eingestellten Ansicht folgt, laesst das Tier beim Drehen wachsen und schrumpfen - und
   * wer ein Modell dreht, um eine Seite zu suchen, verliert dabei den Vergleich.
   *
   * Und nicht ueber EINEN Radius: der erste Entwurf nahm den groessten Abstand vom Drehpunkt
   * und teilte die KLEINERE Kantenlaenge dadurch. Gemessen im Browser belegte der Hund
   * daraufhin 5 Prozent der Flaeche - denn er ist gut dreimal so lang wie hoch, und die
   * kurze Kante bestimmte den Massstab fuer beide Richtungen. Waagerecht und senkrecht
   * werden deshalb getrennt gemessen.
   * ---------------------------------------------------------------------------------------- */
  var NICK_GRENZE = 80;      /* so weit laesst die Oberflaeche kippen - genau so weit wird gemessen */
  var NICK_STUFE = 10;       /* Rasterweite der Tabelle */

  /* EINE TABELLE UEBER DEN KIPPWINKEL, NICHT EINE EINZIGE ZAHL.
   *
   * Zweiter gemessener Fehlversuch (Browser, 09.08.2026): eine gemeinsame Zahl ueber ALLE
   * Winkel liess den Hund 8 Prozent der Flaeche belegen. Der Grund ist einsichtig, wenn man
   * ihn einmal gesehen hat: bei Blick von vorn UND starker Kippung steht die Koerperlaenge
   * senkrecht im Bild. Dieser eine, selten benutzte Winkel bestimmte dann den Massstab fuer
   * die Seitenansicht, die man staendig braucht.
   *
   * Der Massstab haengt jetzt nur noch vom KIPPWINKEL ab, und zwar als Hoechstwert ueber
   * alle Drehwinkel. Damit bleibt die Groesse beim Herumgehen um das Tier - der haeufigen
   * Bewegung - vollkommen fest, und nur beim Kippen passt sie sich an. */
  function ausdehnungMessen(m, marken) {
    var alle = m.pts.slice(), i;
    for (i = 0; i < marken.length; i++) alle.push(marken[i].haut);
    var tab = [], n;
    for (n = -NICK_GRENZE; n <= NICK_GRENZE; n += NICK_STUFE) {
      var nr = n * Math.PI / 180, h = 0, v = 0, g;
      for (g = 0; g < 360; g += 10) {
        var gr = g * Math.PI / 180;
        for (i = 0; i < alle.length; i++) {
          var q = drehe(alle[i], gr, nr);
          var f = KAMERA / Math.max(0.5, KAMERA - q[2]);      /* dieselbe Perspektive wie beim Zeichnen */
          var ax = Math.abs(q[0]) * f, ay = Math.abs(q[1]) * f;
          if (ax > h) h = ax;
          if (ay > v) v = ay;
        }
      }
      tab.push({ nick: n, h: h, v: v });
    }
    return tab;
  }
  /* Der Eintrag fuer diesen Kippwinkel - aufgerundet auf die naechste Stufe, damit das
   * Modell zwischen zwei Stufen eher zu klein als zu gross ist. */
  function ausdehnungBei(tab, nickGrad) {
    if (!tab || !tab.length) return { h: 2.6, v: 1.6 };
    var n = Math.max(-NICK_GRENZE, Math.min(NICK_GRENZE, nickGrad || 0));
    var beste = tab[0], i;
    for (i = 0; i < tab.length; i++) {
      if (Math.abs(tab[i].nick - n) <= NICK_STUFE / 2 + 1e-9) {
        if (tab[i].h * tab[i].v > beste.h * beste.v || beste === tab[0]) beste = tab[i];
      }
    }
    /* Beide Nachbarstufen beruecksichtigen, damit beim Ziehen zwischen zwei Stufen nichts
     * ueber den Rand rutscht. */
    var h = 0, v = 0;
    for (i = 0; i < tab.length; i++) {
      if (Math.abs(tab[i].nick - n) <= NICK_STUFE) { h = Math.max(h, tab[i].h); v = Math.max(v, tab[i].v); }
    }
    return { h: h || beste.h, v: v || beste.v };
  }
  /* Spiegelt einen Punkt auf die andere Koerperseite: nur z wechselt das Vorzeichen. */
  function sp3(p, s) { return [p[0], p[1], s * Math.abs(p[2])]; }
  function pfote(p, r) {
    return ellipsoid([p[0] + r * 0.7, p[1] - r * 0.55, p[2]], [r * 1.5, r * 0.75, r * 1.05], 4, 8, BEIN);
  }
  /* Der Punkt auf der AUSSENhaut der Gliedmasse. Etwas mehr als der Radius, damit die Marke
   * bei der Verdeckungspruefung nicht mit der eigenen Beinoberflaeche zusammenfaellt. */
  function hautpunkt(p, s, r) { return [p[0], p[1], p[2] + s * r * 1.25]; }

  /* ==========================================================================================
   * 4. DREHEN UND PROJIZIEREN
   *
   * gier  dreht um die Hochachse (y)  - man laeuft um das Tier herum
   * nick  dreht um die Querachse (z)  - man schaut von oben oder von unten
   * Die Reihenfolge ist festgelegt: erst gier, dann nick. Andersherum kaeme bei gleichen
   * Reglerwerten ein anderes Bild heraus, und der Nutzer haette keine Chance zu verstehen,
   * warum sein Modell "springt".
   * ========================================================================================== */
  function drehe(p, gier, nick) {
    var cg = Math.cos(gier), sg = Math.sin(gier);
    var x1 = p[0] * cg + p[2] * sg;
    var z1 = -p[0] * sg + p[2] * cg;
    var y1 = p[1];
    var cn = Math.cos(nick), sn = Math.sin(nick);
    var y2 = y1 * cn - z1 * sn;
    var z2 = y1 * sn + z1 * cn;
    return [x1, y2, z2];
  }

  var KAMERA = 6.5;      /* Abstand der Kamera; gross genug, dass die Perspektive nicht verzerrt */

  /* Ein gedrehter Punkt auf die Zeichenflaeche. Rueckgabe traegt die Tiefe mit - sie
   * entscheidet ueber die Zeichenreihenfolge und darueber, ob eine Marke verdeckt ist. */
  function projiziere(p, opt) {
    var f = KAMERA / (KAMERA - p[2]);
    return {
      x: opt.mx + p[0] * opt.skala * f,
      y: opt.my - p[1] * opt.skala * f,
      z: p[2]
    };
  }

  /* ------------------------------------------------------------------------------------------
   * ansicht(netz, opt) — alles, was zum Zeichnen EINES Bildes noetig ist.
   *
   * opt: { gierGrad, nickGrad, breite, hoehe, zoom }
   * Rueckgabe:
   *   flaechen: nach Tiefe sortiert, HINTEN ZUERST (Maler-Verfahren), mit Helligkeit
   *   marken:   Bildkoordinaten und - der eigentliche Punkt - ob sie zum Betrachter zeigen
   *
   * WARUM DIE SICHTBARKEIT DER MARKEN ZAEHLT: Wer das Modell so dreht, dass er die rechte
   * Seite sieht, darf die linken Klemmen nicht genauso hell sehen. Sonst zeigt das Bild vier
   * Punkte auf einer Seite - und es waere schlimmer als die alte flache Grafik, weil es
   * Raeumlichkeit vortaeuscht, die es nicht einhaelt.
   * ---------------------------------------------------------------------------------------- */
  function ansicht(m, opt) {
    opt = opt || {};
    var gier = (opt.gierGrad || 0) * Math.PI / 180;
    var nick = (opt.nickGrad || 0) * Math.PI / 180;
    var breite = opt.breite || 420, hoehe = opt.hoehe || 300;
    /* MASSSTAB AUS DER GEMESSENEN AUSDEHNUNG (siehe ausdehnungMessen).
     * Waagerecht und senkrecht getrennt, dann die engere der beiden Vorgaben - so fuellt
     * das Modell die Flaeche und ragt trotzdem bei keinem Drehwinkel heraus. */
    var A = ausdehnungBei(m.ausdehnung, opt.nickGrad || 0);
    var skala = (opt.zoom || 1) * Math.min(
      (breite / 2 * 0.95) / Math.max(0.1, A.h),
      (hoehe / 2 * 0.95) / Math.max(0.1, A.v));
    var po = { mx: breite / 2, my: hoehe / 2, skala: skala };

    var gp = [], i;
    for (i = 0; i < m.pts.length; i++) gp.push(drehe(m.pts[i], gier, nick));
    var pp = [];
    for (i = 0; i < gp.length; i++) pp.push(projiziere(gp[i], po));

    var out = [];
    for (i = 0; i < m.faces.length; i++) {
      var f = m.faces[i], n = f.length, tiefe = 0, j;
      var eck = [];
      for (j = 0; j < n; j++) { eck.push(pp[f[j]]); tiefe += gp[f[j]][2]; }
      tiefe /= n;
      /* Flaechennormale aus den ersten drei Ecken im GEDREHTEN Raum: sie gibt die
       * Helligkeit und erlaubt, die Rueckseite wegzulassen. */
      var a = gp[f[0]], b = gp[f[1]], c = gp[f[2]];
      var nv = kreuz([b[0] - a[0], b[1] - a[1], b[2] - a[2]], [c[0] - a[0], c[1] - a[1], c[2] - a[2]]);
      nv = norm(nv);
      if (nv[2] < 0) continue;                      /* zeigt von der Kamera weg */
      /* Licht von links oben vorn - dieselbe Richtung wie in der uebrigen Oberflaeche. */
      var lic = nv[0] * (-0.35) + nv[1] * 0.5 + nv[2] * 0.79;
      out.push({ eck: eck, tiefe: tiefe, hell: Math.max(0.28, Math.min(1, 0.42 + 0.58 * lic)), farbe: f.farbe || HAUT });
    }
    out.sort(function (p, q) { return p.tiefe - q.tiefe; });

    var mk = [];
    for (i = 0; i < m.marken.length; i++) {
      var s = m.marken[i];
      var gpt = drehe(s.haut, gier, nick);
      var gn = norm(drehe(s.aussen, gier, nick));
      var pr = projiziere(gpt, po);
      /* ZWEI BEDINGUNGEN, UND DIE ZWEITE WAR DER FEHLER DER ERSTEN FASSUNG.
       *
       * (a) Die Aussenrichtung des Gelenks muss zur Kamera zeigen - sonst schaut man auf die
       *     Rueckseite des eigenen Beins.
       * (b) Vor der Marke darf keine Koerperflaeche liegen. Ohne (b) galten beim Blick VON
       *     VORN alle vier Marken als sichtbar: die Aussenrichtungen der Hinterbeine zeigen
       *     dann seitlich, also nicht weg - verdeckt sind die Knie trotzdem, naemlich vom
       *     Rumpf. Gemessen: ueber 72 Drehwinkel waren zeitweise 4 von 4 Marken "sichtbar".
       *     Das ist genau die vorgetaeuschte Raeumlichkeit, vor der der Dateikopf warnt.
       *
       * Die Pruefung ist ein Punkt-in-Vieleck ueber die vorderen Flaechen. Sie laeuft nur
       * viermal je Bild und kostet deshalb nichts Nennenswertes. */
      mk.push({
        k: s.k, x: pr.x, y: pr.y, tiefe: gpt[2],
        vorn: (gn[2] > -0.1) && !verdeckt(pr, gpt[2], out),
        wo: s.wo, gelenk: s.gelenk
      });
    }
    mk.sort(function (p, q) { return p.tiefe - q.tiefe; });
    return { flaechen: out, marken: mk, skala: skala };
  }

  /* Liegt an dieser Bildstelle eine Flaeche VOR dem Punkt? Kamera steht auf +z, groesseres
   * z heisst also naeher. Der Zuschlag von 0,04 laesst die Flaeche durchgehen, auf der die
   * Marke selbst sitzt - ohne ihn verdeckte jedes Bein seine eigene Klemme. */
  function verdeckt(pr, tiefe, flaechen) {
    for (var i = 0; i < flaechen.length; i++) {
      var f = flaechen[i];
      if (f.tiefe <= tiefe + 0.04) continue;
      if (imVieleck(pr.x, pr.y, f.eck)) return true;
    }
    return false;
  }
  /* Strahlverfahren: waagerechter Strahl nach rechts, Kanten zaehlen. */
  function imVieleck(x, y, eck) {
    var drin = false, n = eck.length, i, j;
    for (i = 0, j = n - 1; i < n; j = i++) {
      var yi = eck[i].y, yj = eck[j].y;
      if ((yi > y) === (yj > y)) continue;
      var xs = eck[i].x + (y - yi) / (yj - yi) * (eck[j].x - eck[i].x);
      if (xs > x) drin = !drin;
    }
    return drin;
  }

  /* Welche Arten haben ein Modell? Steuert, ob das 3D-Bild ueberhaupt angeboten wird -
   * eine Hundevorlage fuer einen Vogel waere eine Anleitung zu einer Ableitung, die so
   * niemand macht. */
  function arten() { var a = [], k; for (k in BAU) if (Object.prototype.hasOwnProperty.call(BAU, k)) a.push(k); return a; }
  function hatModell(art) { return !!BAU[art]; }

  return {
    netz: netz, ansicht: ansicht, arten: arten, hatModell: hatModell,
    BAU: BAU, drehe: drehe, KAMERA: KAMERA
  };
}));
