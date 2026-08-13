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
 * ------------------------------------------------------------------------------------------
 * NEUFASSUNG 12.08.2026 — WARUM DAS ERSTE MODELL ERSETZT WURDE
 *
 * Die erste Fassung baute jedes Tier aus zwei Ellipsoiden (Rumpf, Brust) und geraden Roehren.
 * Sie war geometrisch richtig und trotzdem unbrauchbar, und zwar aus drei Gruenden, die alle
 * am gerenderten Bild abgelesen wurden:
 *
 *   1. DIE HINTERGLIEDMASSE HATTE KEIN SPRUNGGELENK. Sie lief in EINER Geraden von der
 *      Huefte ueber das Knie zur Pfote. Ein Vierbeiner hat dort einen deutlichen Knick:
 *      Oberschenkel nach vorn-unten zum Knie, Unterschenkel nach hinten-unten zum
 *      Sprunggelenk, Mittelfuss senkrecht zur Pfote. Ohne diesen Knick steht das Tier auf
 *      vier senkrechten Stelzen und sieht aus wie ein Tisch mit Kopf.
 *      Das ist hier NICHT nur haesslich, sondern fachlich schaedlich: die Warnung "nicht am
 *      Sprunggelenk klemmen" steht im Anlegetext, aber das Modell zeigte gar kein
 *      Sprunggelenk. Wer den Unterschied zwischen Knie und Sprunggelenk am Bild nicht sehen
 *      kann, kann ihn auch nicht einhalten.
 *   2. DER RUMPF WAR EIN ZYLINDER. Zwei ineinandergeschobene Ellipsoide ergeben keine
 *      Ruecken-, Brust- und Bauchlinie. Es fehlten Widerrist, tiefster Brustkorb und die
 *      aufgezogene Lende - also genau die Umrisse, an denen man ein Tier erkennt.
 *   3. DIE OHREN WAREN ROEHREN. Ein Katzenohr ist eine flache dreieckige Platte, kein Stab.
 *
 * Die Neufassung baut Rumpf, Hals, Kopf, Schwanz und JEDE Gliedmasse mit EINER Funktion:
 * loft() legt Ringe entlang einer Mittellinie und verbindet sie. Damit ist ein Bein eine
 * durchgehende Kette mit Gelenken statt vier abgeschnittener Roehren mit Deckeln, und der
 * Rumpf bekommt an jeder Station seine eigene Hoehe, Tiefe und Breite.
 *
 * WAS SICH NICHT GEAENDERT HAT: die Achsen, die Bedeutung der Marken, die Verdeckungspruefung
 * und die Massstabstabelle. Alle Befunde, die unten stehen, sind gemessen und gelten weiter.
 * ------------------------------------------------------------------------------------------
 *
 * WARUM OHNE FREMDBIBLIOTHEK: Der Praxis-PC hat kein npm und kein Node im PATH; die
 * Oberflaeche ist reines ES5 ohne Bauschritt. Eine 3D-Bibliothek waere hier eine halbe
 * Megabyte Fremdcode fuer ein Tier mit vier Klemmen. Was gebraucht wird, sind eine
 * Drehmatrix, eine Projektion und eine Tiefensortierung - zusammen keine hundert Zeilen.
 *
 * WAS DIESES MODELL IST UND WAS NICHT:
 * Es ist ein anatomisch aufgebautes Modell aus Grundkoerpern, kein Scan und kein Abbild
 * eines bestimmten Tieres. Es soll die LAGE der Gelenke und die SEITE zeigen - dafuer sind
 * die Verhaeltnisse (Rumpflaenge zu Beinlaenge, Hoehe von Ellbogen, Knie und Sprunggelenk)
 * artgerecht gewaehlt. Ein huebscheres Modell mit falsch sitzendem Ellbogen waere schaedlich,
 * ein schlichtes mit richtigem Ellbogen ist brauchbar. Beides zugleich ist besser - deshalb
 * die Neufassung.
 *
 * DIE ANLEGEPUNKTE SIND NICHT AUFGEMALT, SONDERN SIND DIE GELENKE.
 * Die Gliedmasse entsteht als Kette ueber ihre Gelenkpunkte. Der Anlegepunkt IST einer
 * dieser Punkte. Damit kann er gar nicht vom Gelenk abweichen - anders als bei der frueheren
 * flachen Grafik, wo Umriss und Punkte zwei getrennte Zahlenreihen waren und beim Anpassen
 * auseinanderlaufen konnten.
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
   *
   * Jeder Bauteil liefert { pts, faces, farbe }. Die Flaechen tragen zusaetzlich ein Feld
   * `innen`: einen Punkt, der INNERHALB des Koerpers liegt. Daraus wird beim Zusammenlegen
   * die Umlaufrichtung berichtigt (siehe richteAus). Das ist kein Luxus:
   *
   * WARUM DIE UMLAUFRICHTUNG AUTOMATISCH BERICHTIGT WIRD (12.08.2026):
   * ansicht() laesst Flaechen weg, deren Normale von der Kamera wegzeigt. Die Normale folgt
   * aus der Reihenfolge der Eckpunkte. Wer beim Anlegen eines neuen Bauteils die Reihenfolge
   * verdreht, bekommt ein Tier, das VON INNEN gezeichnet wird - und das sieht auf den ersten
   * Blick nur "etwas komisch" aus, nicht falsch. Genau solche Fehler bleiben liegen.
   * Mit `innen` kann sich das Bauteil nicht mehr verdrehen: die Richtung wird gerechnet,
   * nicht behauptet.
   * ========================================================================================== */

  function kreuz(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function norm(a) {
    var l = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
    if (l < 1e-9) return [0, 0, 0];
    return [a[0] / l, a[1] / l, a[2] / l];
  }
  function plus(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function minus(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function mal(a, f) { return [a[0] * f, a[1] * f, a[2] * f]; }

  /* ------------------------------------------------------------------------------------------
   * loft — DIE Arbeitsfunktion. Legt Ringe entlang einer Mittellinie und verbindet sie.
   *
   * stationen: [{ p:[x,y,z], oben, unten, breit }, ...]
   *   p      Mittelpunkt des Rings
   *   oben   Hoehe ueber der Mittellinie   (Ruecken)
   *   unten  Tiefe unter der Mittellinie   (Bauch)
   *   breit  halbe Breite                  (Flanke)
   *
   * WARUM OBEN UND UNTEN GETRENNT: Ein Brustkorb ist nach unten viel tiefer als nach oben
   * hoch. Mit einem einzigen Radius je Station bekaeme man eine Wurst; die Bauchlinie, an der
   * man einen Hund von einer Katze unterscheidet, entstuende gar nicht erst.
   *
   * DIE QUERSCHNITTSFORM ist bewusst KEINE Fallunterscheidung "oberhalb/unterhalb". Die
   * erste Fassung dieser Funktion rechnete y = (sin t >= 0 ? oben : unten) * sin t. Das ist
   * an der Stelle sin t = 0 zwar stetig, aber nicht mehr glatt: die Steigung springt von
   * `oben` auf `unten`. Im Bild lief dadurch eine harte Kante die ganze Flanke entlang.
   * Statt dessen:
   *      y = A*sin t + B*sin^2 t     mit A = (oben+unten)/2,  B = (oben-unten)/2
   * Bei t = 90 Grad ergibt das +oben, bei 270 Grad -unten, bei 0 und 180 Grad null - und es
   * ist ein Polynom in sin t, also ueberall glatt.
   *
   * DIE RINGE STEHEN SENKRECHT AUF DER MITTELLINIE, nicht senkrecht auf der x-Achse. Nur so
   * traegt dieselbe Funktion auch Hals, Schwanz und Gliedmassen: dort laeuft die Mittellinie
   * schraeg oder im Bogen. Die Richtung an einer Station ist die MITTLERE Richtung ihrer
   * beiden Nachbarn - dadurch rundet sich ein Gelenkknick von selbst ab, statt zu knicken.
   * ---------------------------------------------------------------------------------------- */
  function loft(stationen, segs, farbe) {
    var n = stationen.length, pts = [], faces = [], i, j;
    /* Richtung je Station: zentrale Differenz, an den Enden einseitig. */
    var richt = [];
    for (i = 0; i < n; i++) {
      var vor = stationen[Math.max(0, i - 1)].p, nach = stationen[Math.min(n - 1, i + 1)].p;
      var e = norm(minus(nach, vor));
      if (!e[0] && !e[1] && !e[2]) e = [1, 0, 0];       /* zwei gleiche Stationen: nicht entarten */
      richt.push(e);
    }
    /* ------------------------------------------------------------------------------------
     * DAS RINGKREUZ WIRD MITGEFUEHRT, NICHT JE STATION NEU GERECHNET (paralleler Transport):
     * das erste Kreuz bestimmt die Ausrichtung, jedes weitere ist die Projektion des vorigen
     * auf die neue Ringebene. Damit kann sich der Ring zwischen zwei Stationen nicht
     * verdrehen, gleichgueltig wie die Mittellinie verlaeuft.
     *
     * WAS HIER GEMESSEN WURDE UND WAS NICHT (12.08.2026) - der Unterschied ist wichtig:
     * Anlass war ein flach schattiertes Bild, auf dem die Hintergliedmassen zerrissen
     * WIRKTEN. Die Nachmessung hat das WIDERLEGT: der Bruch war der weisse Hintergrund
     * zwischen den beiden Hinterbeinen, kein Loch. Punktsumme und laengste Kante des
     * Hundenetzes sind mit und ohne Transport praktisch gleich (1688,74 gegen 1688,71;
     * laengste Kante beide Male 0,331). Fuer die heutigen Mittellinien aendert der Transport
     * also NICHTS - wer ihn herausnimmt, bekommt dasselbe Netz.
     *
     * WARUM ER TROTZDEM STEHT: Die alte Regel waehlte je Station einen Hilfsvektor nach
     * "steht die Mittellinie steil, nimm [1,0,0], sonst [0,1,0]". Solange eine Mittellinie in
     * der xy-Ebene liegt (z konstant), liefern beide Zweige denselben Vektor (0,0,1) - darum
     * faellt es heute nicht auf. Sobald eine Mittellinie die Ebene VERLAESST - ein
     * eingerollter Schwanz, eine abgespreizte Gliedmasse, ein Kopf zur Seite - springt der
     * Hilfsvektor an der Schwelle und der Ring dreht sich um 90 Grad. Der Transport nimmt
     * dieser Falle die Grundlage, kostet nichts und bindet keine Annahme ueber die Bahn.
     *
     * Fuer den RUMPF bleibt die Ausrichtung erhalten (u nach links, v nach oben) - die
     * Wirbelsaeule liegt in der xy-Ebene. Genau darauf beruht die Bedeutung von `oben`/`unten`.
     * ---------------------------------------------------------------------------------- */
    var uVor = null;
    for (i = 0; i < n; i++) {
      var st = stationen[i], e2 = richt[i], u;
      if (uVor) {
        var d = uVor[0] * e2[0] + uVor[1] * e2[1] + uVor[2] * e2[2];
        u = norm([uVor[0] - d * e2[0], uVor[1] - d * e2[1], uVor[2] - d * e2[2]]);
      }
      /* Erste Station - oder Kehrtwende um 180 Grad, bei der die Projektion zu null wird. */
      if (!u || (!u[0] && !u[1] && !u[2])) {
        var hilf = (Math.abs(e2[1]) > 0.9) ? [1, 0, 0] : [0, 1, 0];
        u = norm(kreuz(e2, hilf));                      /* quer - zeigt nach LINKS (+z) */
      }
      uVor = u;
      var v = norm(kreuz(u, e2));                       /* hoch - zeigt nach OBEN  (+y) */
      var A = (st.oben + st.unten) / 2, B = (st.oben - st.unten) / 2;
      for (j = 0; j < segs; j++) {
        var t = 2 * Math.PI * j / segs, s = Math.sin(t), c = Math.cos(t);
        var h = A * s + B * s * s;
        pts.push([
          st.p[0] + st.breit * c * u[0] + h * v[0],
          st.p[1] + st.breit * c * u[1] + h * v[1],
          st.p[2] + st.breit * c * u[2] + h * v[2]
        ]);
      }
    }
    for (i = 0; i < n - 1; i++) {
      var mitte = mal(plus(stationen[i].p, stationen[i + 1].p), 0.5);
      for (j = 0; j < segs; j++) {
        var jn = (j + 1) % segs;
        var f = [i * segs + j, (i + 1) * segs + j, (i + 1) * segs + jn, i * segs + jn];
        f.innen = mitte;
        faces.push(f);
      }
    }
    /* Deckel an beiden Enden - ohne sie wirkt ein Bein von vorn hohl. Der Bezugspunkt liegt
     * jeweils eine Station weiter innen, damit richteAus() die Richtung eindeutig bestimmt. */
    var d1 = [], d2 = [];
    for (j = 0; j < segs; j++) { d1.push(j); d2.push((n - 1) * segs + j); }
    d1.innen = stationen[Math.min(1, n - 1)].p;
    d2.innen = stationen[Math.max(0, n - 2)].p;
    faces.push(d1); faces.push(d2);
    return { pts: pts, faces: faces, farbe: farbe };
  }

  /* Bequemer Aufruf fuer runde Querschnitte (Schwanz, Gliedmassen): eine Zahl je Station. */
  function rund(punkte, radien, segs, farbe) {
    var st = [], i;
    for (i = 0; i < punkte.length; i++) st.push({ p: punkte[i], oben: radien[i], unten: radien[i], breit: radien[i] });
    return loft(st, segs, farbe);
  }

  /* ------------------------------------------------------------------------------------------
   * kette — eine Gliedmasse aus ihren Gelenkpunkten.
   *
   * WARUM ZWISCHENPUNKTE EINGEFUEGT WERDEN: An einem Gelenk mit ~110 Grad Innenwinkel
   * (Sprunggelenk!) steht der Ring quer zur Winkelhalbierenden. Ohne Zwischenpunkte greift
   * die Mittelung ueber die volle Segmentlaenge und der Knick wird zu einer Beule, die
   * halb so lang ist wie der Unterschenkel. Mit zwei Zwischenpunkten je Abschnitt wirkt die
   * Mittelung nur noch ueber ein Drittel - das Gelenk rundet sich, der Abschnitt bleibt gerade.
   * ---------------------------------------------------------------------------------------- */
  function kette(gelenke, radien, segs, farbe) {
    var punkte = [], r = [], i, k;
    var UNTER = 3;                              /* Unterteilungen je Abschnitt */
    for (i = 0; i < gelenke.length - 1; i++) {
      for (k = 0; k < UNTER; k++) {
        var t = k / UNTER;
        punkte.push([
          gelenke[i][0] + (gelenke[i + 1][0] - gelenke[i][0]) * t,
          gelenke[i][1] + (gelenke[i + 1][1] - gelenke[i][1]) * t,
          gelenke[i][2] + (gelenke[i + 1][2] - gelenke[i][2]) * t
        ]);
        r.push(radien[i] + (radien[i + 1] - radien[i]) * t);
      }
    }
    punkte.push(gelenke[gelenke.length - 1]);
    r.push(radien[radien.length - 1]);
    return rund(punkte, r, segs, farbe);
  }

  /* Eine Kugel/Ellipsoid - Augen, Nasenspiegel, Pfotenballen. rings = Breitengrade,
   * segs = Laengengrade. Grob genug, dass es auf einem Kiosk-i3 fluessig bleibt. */
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
        var f = [a, b, c, d];
        f.innen = mitte;
        faces.push(f);
      }
    }
    return { pts: pts, faces: faces, farbe: farbe };
  }

  /* ------------------------------------------------------------------------------------------
   * platte — ein flacher Koerper aus zwei deckungsgleichen Vielecken (Ohren).
   *
   * WARUM OHREN KEINE ROEHREN SIND: Ein Katzenohr ist eine duenne, breite, dreieckige Platte.
   * Als Roehre gebaut sah es aus wie ein Horn - und die erste Fassung dieses Modells wurde
   * deshalb im Bild fuer ein Reh gehalten. Das ist nicht Eitelkeit: wer die Art auf dem
   * Modell nicht wiedererkennt, glaubt auch den Anlegepunkten nicht.
   *
   * `polygon` liegt in der xy-Ebene und wird auf beide Koerperseiten gespiegelt; `zi` ist der
   * z-Abstand der inneren, `za` der der aeusseren Flaeche.
   *
   * DIE NEIGUNG (`kipp`) LEHNT DAS OHR NACH AUSSEN, und zwar staerker, je hoeher der Punkt
   * ueber der Ohrbasis liegt. Sie ist nicht Zierde: eine Platte genau in der Laengsebene
   * steht bei der Ansicht VON VORN exakt hochkant und ist dann unsichtbar. Am gerenderten
   * Bild vom 12.08.2026 hatte die Katze von vorn keine Ohren - also gerade in der Ansicht,
   * in der man Rechts und Links vergleicht, fehlte ihr Erkennungsmerkmal. Ohren stehen
   * ohnehin schraeg nach aussen; die Neigung ist damit zugleich richtiger und sichtbarer.
   * ---------------------------------------------------------------------------------------- */
  function platte(polygon, zi, za, seite, farbe, kipp) {
    var n = polygon.length, pts = [], faces = [], i;
    var mx = 0, my = 0, basis = 1e9;
    for (i = 0; i < n; i++) if (polygon[i][1] < basis) basis = polygon[i][1];
    var neig = function (y) { return (kipp || 0) * Math.max(0, y - basis); };
    for (i = 0; i < n; i++) {
      pts.push([polygon[i][0], polygon[i][1], seite * (zi + neig(polygon[i][1]))]);
      mx += polygon[i][0]; my += polygon[i][1];
    }
    for (i = 0; i < n; i++) pts.push([polygon[i][0], polygon[i][1], seite * (za + neig(polygon[i][1]))]);
    mx /= n; my /= n;
    var innen = [mx, my, seite * (zi + za) / 2];
    var a = [], b = [];
    for (i = 0; i < n; i++) { a.push(i); b.push(n + i); }
    a.innen = innen; b.innen = innen;
    faces.push(a); faces.push(b);
    for (i = 0; i < n; i++) {
      var j = (i + 1) % n;
      var f = [i, j, n + j, n + i];
      f.innen = innen;
      faces.push(f);
    }
    return { pts: pts, faces: faces, farbe: farbe };
  }

  /* ------------------------------------------------------------------------------------------
   * richteAus — jede Flaeche so herumdrehen, dass ihre Normale nach AUSSEN zeigt.
   * Aussen heisst: weg von dem Punkt, den das Bauteil als `innen` mitgegeben hat.
   * Siehe die Begruendung im Kopf von Abschnitt 1.
   * ---------------------------------------------------------------------------------------- */
  function richteAus(teil) {
    var i, k;
    for (i = 0; i < teil.faces.length; i++) {
      var f = teil.faces[i];
      if (!f.innen || f.length < 3) continue;
      var p0 = teil.pts[f[0]], p1 = teil.pts[f[1]], p2 = teil.pts[f[2]];
      var nv = kreuz(minus(p1, p0), minus(p2, p0));
      /* Bei entarteten Flaechen (Pol eines Ellipsoids) ist die Normale null - dort gibt es
       * nichts zu drehen, und ansicht() laesst sie ohnehin weg. */
      if (Math.abs(nv[0]) + Math.abs(nv[1]) + Math.abs(nv[2]) < 1e-12) continue;
      var raus = minus(p0, f.innen);
      if (nv[0] * raus[0] + nv[1] * raus[1] + nv[2] * raus[2] < 0) {
        var g = [];
        for (k = f.length - 1; k >= 0; k--) g.push(f[k]);
        g.innen = f.innen;
        teil.faces[i] = g;
      }
    }
    return teil;
  }

  /* Teile zu EINEM Netz zusammenlegen; die Punktnummern der Folgeteile werden verschoben. */
  function fuege(teile) {
    var pts = [], faces = [], k, i, off = 0;
    for (k = 0; k < teile.length; k++) {
      var t = richteAus(teile[k]);
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
   *
   * DER RUMPF steht als Liste [x, Ruecken, Bauch, halbe Breite] von HINTEN nach VORN.
   *
   * RUMPF, HALS UND KOPF SIND EINE EINZIGE KETTE. Sie stehen nur der Lesbarkeit halber in
   * zwei Listen und werden in netz() aneinandergehaengt. Getrennt gebaut klaffte an der Naht
   * eine Luecke - am flach schattierten Bild vom 12.08.2026 sass der Kopf sichtbar NEBEN dem
   * Hals statt daran. Der Grund war banal: die letzte Halsstation lag bei x = 1,36, die erste
   * Kopfstation bei x = 1,46, und dazwischen gab es kein Dreieck. Wer Kopf und Hals als zwei
   * Koerper baut, muss diese Naht jedes Mal von Hand schliessen. Als eine Kette kann sie gar
   * nicht mehr aufgehen.
   *
   * DIE GLIEDMASSE steht als Kette ihrer Gelenke:
   *   vorn:   Schulterblatt - Buggelenk - ELLBOGEN - Vorderfusswurzel - Pfote
   *   hinten: Huefte - KNIE - SPRUNGGELENK - Pfote
   * Die gross geschriebenen sind die Anlegepunkte bzw. das Gelenk, das man mit ihnen
   * verwechseln kann. Der Zickzack ist nicht Zierde: er IST der Unterschied zwischen Knie
   * und Sprunggelenk, und dieser Unterschied steht als Warnung im Anlegetext.
   * ========================================================================================== */
  var BAU = {
    hund: {
      name: 'Hund',
      laenge: 1.9,
      /* GEMESSEN AM GERENDERTEN BILD (12.08.2026, tools/tier3d-bild.js): die erste Fassung
       * dieser Zahlen ergab einen Schlauch mit einem winzigen Kopf an einem duennen Hals.
       * Drei Verhaeltnisse wurden danach berichtigt, alle drei nachpruefbar:
       *   Kopfbreite/Brustbreite   0,49 -> 0,59  (Schaedel war halb so breit wie der Brustkorb)
       *   Kopfhoehe/Brusttiefe     0,37 -> 0,46
       *   Lendenbreite/Brustbreite 0,73 -> 0,65  (ohne Taille wirkt jeder Vierbeiner wie ein Rohr)
       * Die Zahlen stehen in tools/tier3d-test.js als Pruefung, damit sie nicht zurueckdriften. */
      rumpf: [
        [-1.10, 0.32, -0.02, 0.150],  /* Schwanzwurzel - rund, nicht spitz auslaufend */
        [-0.98, 0.42, -0.17, 0.230],  /* Kruppe */
        [-0.80, 0.46, -0.30, 0.300],  /* Becken */
        [-0.56, 0.45, -0.34, 0.280],
        [-0.30, 0.44, -0.31, 0.225],  /* Lende - aufgezogen UND schmal: das macht die Taille */
        [-0.04, 0.45, -0.42, 0.290],  /* letzte Rippen */
        [0.22, 0.47, -0.48, 0.330],   /* tiefster Punkt des Brustkorbs, auf Ellbogenhoehe */
        [0.48, 0.48, -0.47, 0.345],   /* hinter der Schulter - breiteste Stelle */
        [0.70, 0.50, -0.38, 0.305],   /* Widerrist */
        [0.88, 0.50, -0.24, 0.245],   /* Halsansatz */
        [1.06, 0.55, -0.06, 0.215],
        [1.22, 0.63, 0.13, 0.200],
        [1.36, 0.72, 0.29, 0.190]     /* Genick */
      ],
      kopf: [
        [1.48, 0.820, 0.420, 0.180],  /* Hinterhaupt */
        [1.62, 0.855, 0.430, 0.205],  /* Schaedel, breiteste Stelle */
        [1.78, 0.735, 0.395, 0.160],  /* Stop - der Absatz zwischen Stirn und Nasenruecken */
        [1.94, 0.645, 0.405, 0.115],  /* Nasenruecken */
        [2.10, 0.600, 0.410, 0.098],
        [2.19, 0.570, 0.437, 0.068]   /* Nasenspitze */
      ],
      nase: { p: [2.220, 0.506, 0], r: 0.062 },
      auge: { p: [1.790, 0.665, 0.142], r: 0.040 },
      /* HAENGEOHR als flache Platte laengs der Schlaefe, vom Scheitel bis unter das Jochbein.
       * Die erste Fassung dieses Modells hatte auch beim Hund ein Stehohr - im gerenderten
       * Bild las sich das Tier dadurch eher wie ein Reh. Das ist keine Eitelkeit: wer die
       * Art auf dem Modell nicht wiedererkennt, glaubt auch den Anlegepunkten nicht. */
      ohr: [[1.70, 0.800], [1.56, 0.840], [1.46, 0.740], [1.44, 0.500], [1.54, 0.400], [1.66, 0.480]],
      ohrZ: [0.175, 0.245], ohrKipp: 0.10,   /* Haengeohr liegt fast an */
      schwanz: { p: [[-1.06, 0.30, 0], [-1.26, 0.40, 0], [-1.46, 0.52, 0], [-1.64, 0.60, 0], [-1.78, 0.62, 0], [-1.88, 0.60, 0]],
        r: [0.105, 0.088, 0.070, 0.052, 0.034, 0.018] },
      /* Die oberen Kettenglieder liegen bewusst WEITER INNEN (z 0,215) als der Ellbogen
       * (z 0,300): Schulterblatt und Oberarm stecken im Rumpf, sichtbar wird die Gliedmasse
       * erst ab dem Ellbogen. Ohne diese Verjuengung stand das Schulterblatt als harte Kante
       * quer ueber der Flanke - im Bild deutlich zu sehen. */
      vorn: {
        schulter: [0.72, 0.36, 0.150], buggelenk: [0.64, -0.06, 0.215],
        ellbogen: [0.54, -0.43, 0.285], carpus: [0.585, -0.80, 0.295], pfote: [0.605, -1.06, 0.295],
        r: [0.130, 0.150, 0.132, 0.090, 0.080]
      },
      hinten: {
        huefte: [-0.78, 0.32, 0.150], knie: [-0.54, -0.28, 0.255],
        sprung: [-0.785, -0.70, 0.295], pfote: [-0.765, -1.06, 0.295],
        r: [0.200, 0.150, 0.086, 0.074]
      },
      lage: 'Die Klemmen sitzen vorn am Ellbogen und hinten am Knie — auf der Haut, nicht im Fell.'
    },

    katze: {
      name: 'Katze',
      laenge: 1.6,
      /* Flacherer Brustkorb als beim Hund, deutlich staerker aufgezogene Lende, kuerzerer
       * Hals, runderer Schaedel. Die Katze ist nicht "ein kleiner Hund": ihr Brustkorb reicht
       * viel weniger tief herab, der Ellbogen liegt deshalb naeher an der Unterlinie. */
      /* WAS DIE KATZE VOM HUND UNTERSCHEIDEN MUSS, und im ersten Bild nicht tat: Am
       * gerenderten Streifen waren Hund und Katze nur am Schwanz zu unterscheiden. Wer zwei
       * Arten anbietet und dasselbe Tier zeigt, hat eine Auswahl ohne Inhalt. Vier
       * Verhaeltnisse tragen den Unterschied - alle vier sind belegbar und alle vier werden
       * geprueft:
       *   Schaedel rund statt keilfoermig  (Kopfbreite/Kopflaenge  Hund 0,49 / Katze 0,95)
       *   Schnauze kurz                    (Schnauzenanteil        Hund 0,44 / Katze 0,26)
       *   Ohren gross und aufrecht         (Ohrhoehe/Kopfhoehe     Hund liegt an, Katze 0,77)
       *   Taille auffallend schmal         (Lende/Brust            Hund 0,65 / Katze 0,66 -> 0,60) */
      rumpf: [
        [-0.96, 0.28, -0.02, 0.115],
        [-0.86, 0.36, -0.13, 0.180],
        [-0.70, 0.39, -0.24, 0.235],
        [-0.50, 0.38, -0.27, 0.220],
        [-0.28, 0.36, -0.25, 0.155],   /* Taille - bei der Katze auffallend schmal */
        [-0.04, 0.37, -0.32, 0.215],
        [0.18, 0.39, -0.37, 0.250],
        [0.40, 0.40, -0.36, 0.258],
        [0.60, 0.42, -0.28, 0.228],
        [0.76, 0.42, -0.16, 0.185],
        [0.90, 0.47, 0.00, 0.170],
        [1.02, 0.55, 0.16, 0.165],
        [1.12, 0.64, 0.30, 0.165]      /* Genick - der Hals ist bei der Katze kurz */
      ],
      kopf: [
        [1.20, 0.740, 0.410, 0.165],   /* Hinterhaupt */
        [1.33, 0.760, 0.370, 0.200],   /* runder, breiter Schaedel - fast so breit wie lang */
        [1.45, 0.665, 0.370, 0.150],
        [1.55, 0.590, 0.390, 0.105],   /* sehr kurze Schnauze, kein Stop wie beim Hund */
        [1.62, 0.553, 0.420, 0.070]
      ],
      nase: { p: [1.648, 0.485, 0], r: 0.052 },
      auge: { p: [1.465, 0.585, 0.132], r: 0.050 },        /* gross im Verhaeltnis zum Schaedel */
      /* STEHOHR als grosses Dreieck mit breiter Basis, oben auf dem Schaedel - das Merkmal,
       * an dem die Katze im Bild sofort erkennbar ist. Umlauf: Basis vorn, Vorderkante,
       * Spitze, Basis hinten. */
      ohr: [[1.415, 0.700], [1.395, 0.845], [1.290, 1.030], [1.215, 0.690]],
      ohrZ: [0.090, 0.155], ohrKipp: 0.38,   /* Stehohr steht deutlich schraeg nach aussen */
      schwanz: { p: [[-0.92, 0.26, 0], [-1.16, 0.32, 0], [-1.40, 0.40, 0], [-1.62, 0.50, 0], [-1.80, 0.62, 0], [-1.92, 0.76, 0], [-1.98, 0.88, 0]],
        r: [0.082, 0.074, 0.066, 0.058, 0.048, 0.036, 0.022] },
      vorn: {
        schulter: [0.62, 0.30, 0.115], buggelenk: [0.56, -0.04, 0.170],
        ellbogen: [0.47, -0.35, 0.225], carpus: [0.51, -0.67, 0.232], pfote: [0.53, -0.90, 0.230],
        r: [0.100, 0.118, 0.098, 0.066, 0.060]
      },
      hinten: {
        huefte: [-0.68, 0.26, 0.115], knie: [-0.46, -0.22, 0.195],
        sprung: [-0.685, -0.58, 0.232], pfote: [-0.67, -0.90, 0.230],
        r: [0.155, 0.115, 0.064, 0.056]
      },
      lage: 'Bei der Katze sind die Ausschläge klein — auf sauberen Hautkontakt achten und die Verstärkung erhöhen, statt zu klemmen.'
    },

    frettchen: {
      name: 'Frettchen',
      laenge: 2.2,
      /* Sehr langer, walzenfoermiger Rumpf ohne Taille auf sehr kurzen Beinen. Der Ellbogen
       * liegt fast auf der Unterlinie - das ist der Grund, warum dieses Tier ein eigenes
       * Modell braucht und nicht als kleiner Hund durchgeht. */
      rumpf: [
        [-1.22, 0.16, 0.00, 0.075],
        [-1.06, 0.24, -0.06, 0.135],
        [-0.86, 0.26, -0.14, 0.175],
        [-0.55, 0.26, -0.16, 0.185],
        [-0.20, 0.26, -0.16, 0.185],
        [0.15, 0.26, -0.18, 0.195],
        [0.48, 0.27, -0.20, 0.205],
        [0.75, 0.27, -0.19, 0.200],
        [0.98, 0.26, -0.14, 0.175],
        [1.16, 0.26, -0.06, 0.155],
        [1.34, 0.28, 0.03, 0.140],
        [1.50, 0.335, 0.115, 0.130]    /* Genick */
      ],
      kopf: [
        [1.63, 0.360, 0.080, 0.145],   /* Schaedel - beim Frettchen kaum vom Hals abgesetzt */
        [1.74, 0.298, 0.098, 0.105],
        [1.85, 0.250, 0.110, 0.075],
        [1.93, 0.222, 0.126, 0.052]
      ],
      nase: { p: [1.955, 0.174, 0], r: 0.046 },
      auge: { p: [1.685, 0.250, 0.098], r: 0.032 },
      ohr: [[1.598, 0.362], [1.533, 0.354], [1.520, 0.432], [1.590, 0.441]],   /* klein und rund */
      ohrZ: [0.090, 0.140], ohrKipp: 0.55,   /* sitzt fast waagerecht seitlich am Kopf */
      schwanz: { p: [[-1.18, 0.10, 0], [-1.42, 0.14, 0], [-1.66, 0.19, 0], [-1.86, 0.24, 0]],
        r: [0.085, 0.078, 0.062, 0.038] },
      vorn: {
        schulter: [0.62, 0.02, 0.140], buggelenk: [0.60, -0.12, 0.172],
        ellbogen: [0.60, -0.24, 0.185], carpus: [0.615, -0.38, 0.185], pfote: [0.625, -0.46, 0.182],
        r: [0.088, 0.092, 0.074, 0.054, 0.050]
      },
      hinten: {
        huefte: [-0.78, 0.02, 0.140], knie: [-0.66, -0.14, 0.172],
        sprung: [-0.79, -0.32, 0.185], pfote: [-0.775, -0.46, 0.182],
        r: [0.105, 0.082, 0.055, 0.050]
      },
      lage: 'Beim Frettchen liegen Ellbogen und Knie dicht an der Unterlinie — die Klemmen sitzen tiefer und weiter vorn als beim Hund.'
    },

    kaninchen: {
      name: 'Kaninchen',
      laenge: 1.7,
      /* Die Kraft liegt in der Hinterhand: die Huefte steht hoch, das Knie weit oben und
       * deutlich weiter vorn als bei Hund und Katze - es liegt fast an der Bauchwand. Wer
       * dort das Sprunggelenk fuer das Knie haelt, klemmt eine ganze Gliedmassenlaenge zu tief. */
      rumpf: [
        [-0.96, 0.30, 0.00, 0.100],
        [-0.82, 0.44, -0.14, 0.210],
        [-0.62, 0.50, -0.28, 0.300],   /* Becken sehr kraeftig */
        [-0.38, 0.47, -0.32, 0.285],
        [-0.14, 0.42, -0.30, 0.255],
        [0.12, 0.40, -0.32, 0.255],
        [0.36, 0.39, -0.33, 0.250],
        [0.58, 0.38, -0.30, 0.235],
        [0.76, 0.38, -0.22, 0.200],
        [0.92, 0.40, -0.10, 0.175],
        [1.04, 0.45, 0.05, 0.168],
        [1.16, 0.54, 0.19, 0.162]      /* Genick */
      ],
      kopf: [
        [1.26, 0.625, 0.295, 0.170],   /* Hinterhaupt */
        [1.38, 0.635, 0.275, 0.185],   /* Schaedel */
        [1.48, 0.550, 0.290, 0.135],
        [1.57, 0.478, 0.302, 0.098],
        [1.64, 0.436, 0.306, 0.066]
      ],
      nase: { p: [1.665, 0.372, 0], r: 0.052 },
      auge: { p: [1.465, 0.520, 0.135], r: 0.050 },
      /* Die langen Ohren machen die Art auf einen Blick erkennbar - sie sind hier das, was
       * beim Hund das Haengeohr ist: das Merkmal, ohne das man dem Modell nicht glaubt. */
      ohr: [[1.395, 0.640], [1.385, 0.930], [1.345, 1.170], [1.275, 1.158], [1.268, 0.910], [1.292, 0.625]],
      ohrZ: [0.075, 0.135], ohrKipp: 0.22,
      schwanz: { p: [[-0.92, 0.24, 0], [-1.03, 0.30, 0], [-1.09, 0.34, 0]], r: [0.085, 0.085, 0.055] },
      vorn: {
        schulter: [0.56, 0.06, 0.175], buggelenk: [0.52, -0.14, 0.220],
        ellbogen: [0.50, -0.34, 0.235], carpus: [0.515, -0.58, 0.235], pfote: [0.525, -0.76, 0.230],
        r: [0.115, 0.120, 0.094, 0.064, 0.058]
      },
      hinten: {
        huefte: [-0.58, 0.34, 0.195], knie: [-0.18, -0.16, 0.250],
        sprung: [-0.52, -0.50, 0.265], pfote: [-0.60, -0.76, 0.260],
        r: [0.265, 0.155, 0.082, 0.070]
      },
      lage: 'Beim Kaninchen sitzt das Knie durch die kräftige Hinterhand weit vorn und hoch — nicht am Sprunggelenk klemmen.'
    }
  };

  /* ==========================================================================================
   * 3. DAS NETZ BAUEN
   * ========================================================================================== */
  var HAUT = '#c9a074', BEIN = '#b98f66', OHR = '#a87a55', DUNKEL = '#5a4436';

  /* Aufloesung. Sie ist gemessen, nicht geraten (12.08.2026, Node): mit diesen Werten hat der
   * Hund 1016 Punkte und 1042 Flaechen, ein Bild kostet 1,7 ms und der Bau des Netzes samt
   * Massstabstabelle 41 ms. Bei doppelter Aufloesung waeren es 6,4 ms je Bild - beim Ziehen
   * auf einem Kiosk-i3 spuerbar. Der Gewinn im Bild ist ab hier gering. */
  var SEGS_RUMPF = 14, SEGS_KOPF = 12, SEGS_BEIN = 8, SEGS_SCHWANZ = 8;

  /* Spiegelt einen Punkt auf die andere Koerperseite: nur z wechselt das Vorzeichen. */
  function sp3(p, s) { return [p[0], p[1], s * Math.abs(p[2])]; }

  /* Der Punkt auf der AUSSENhaut der Gliedmasse. Etwas mehr als der Radius, damit die Marke
   * bei der Verdeckungspruefung nicht mit der eigenen Beinoberflaeche zusammenfaellt. */
  function hautpunkt(p, s, r) { return [p[0], p[1], p[2] + s * r * 1.25]; }

  /* Aus [x, Ruecken, Bauch, breit] eine Loft-Station machen.
   * DIE MITTELLINIE liegt bei 52 % der Hoehe, nicht bei 50: der Querschnitt eines Rumpfes
   * ist unten etwas voller als oben. Das ist eine kleine Zahl mit sichtbarer Wirkung - bei
   * 50 % wirkt der Ruecken aufgeblasen und die Bauchlinie zu flach. */
  function station(z) {
    var top = z[1], bot = z[2], cy = bot + 0.52 * (top - bot);
    return { p: [z[0], cy, 0], oben: top - cy, unten: cy - bot, breit: z[3] };
  }

  /* Eine Pfote: liegt etwas VOR der Beinachse, weil eine Pfote nach vorn zeigt. Ohne sie
   * enden die Beine als abgeschnittene Roehren und das Tier steht auf Stelzen.
   * Die Groesse ist am Bild nachgestellt (12.08.2026): mit dem urspruenglichen Faktor 1,7 x
   * 0,8 x 1,1 waren die Pfoten kleiner als der Fesselquerschnitt und wirkten wie Haken. */
  function pfote(p, r) {
    return ellipsoid([p[0] + r * 0.75, p[1] - r * 0.35, p[2]], [r * 1.9, r * 1.0, r * 1.25], 4, 8, BEIN);
  }

  function netz(art) {
    var b = BAU[art] || null;
    if (!b) return null;
    var teile = [], i, s;

    /* Rumpf, Hals UND Kopf in EINEM Zug - siehe Begruendung im Kopf von Abschnitt 2.
     * Die beiden Listen werden hier nur aneinandergehaengt; getrennt stehen sie, damit man
     * die Verhaeltnisse Kopf zu Rumpf lesen und pruefen kann. */
    var stationen = [], kette2 = b.rumpf.concat(b.kopf);
    for (i = 0; i < kette2.length; i++) stationen.push(station(kette2[i]));
    teile.push(loft(stationen, SEGS_RUMPF, HAUT));

    /* Nasenspiegel: macht auf einen Blick klar, wo vorn ist - beim gedrehten Modell ist das
     * die Frage, die man am haeufigsten stellt. */
    teile.push(ellipsoid(b.nase.p, [b.nase.r * 0.9, b.nase.r * 0.8, b.nase.r], 4, 8, DUNKEL));
    teile.push(rund(b.schwanz.p, b.schwanz.r, SEGS_SCHWANZ, HAUT));

    /* Augen und Ohren beidseits. */
    for (s = -1; s <= 1; s += 2) {
      teile.push(ellipsoid(sp3(b.auge.p, s), [b.auge.r * 0.85, b.auge.r, b.auge.r * 0.85], 4, 7, DUNKEL));
      teile.push(platte(b.ohr, b.ohrZ[0], b.ohrZ[1], s, OHR, b.ohrKipp));
    }

    /* Gliedmassen: je Seite eine durchgehende Kette. Der Anlegepunkt IST ein Kettenglied. */
    var marken = [];
    for (s = -1; s <= 1; s += 2) {
      var rechts = (s < 0);
      var v = b.vorn, h = b.hinten;
      teile.push(kette(
        [sp3(v.schulter, s), sp3(v.buggelenk, s), sp3(v.ellbogen, s), sp3(v.carpus, s), sp3(v.pfote, s)],
        v.r, SEGS_BEIN, BEIN));
      teile.push(kette(
        [sp3(h.huefte, s), sp3(h.knie, s), sp3(h.sprung, s), sp3(h.pfote, s)],
        h.r, SEGS_BEIN, BEIN));
      teile.push(pfote(sp3(v.pfote, s), v.r[v.r.length - 1]));
      teile.push(pfote(sp3(h.pfote, s), h.r[h.r.length - 1]));
      /* p ist das GELENK (die anatomische Verankerung), haut der Punkt auf der Aussenseite
       * der Gliedmasse - dort sitzt die Klemme wirklich. Der Unterschied ist nicht Kosmetik:
       * die Verdeckungspruefung weiter unten braucht einen Punkt auf der OBERFLAECHE. Laege
       * die Marke in der Beinachse, waere sie von der eigenen Beinvorderseite immer verdeckt
       * und das Modell zeigte nie eine Klemme. */
      marken.push({
        k: rechts ? 'RA' : 'LA', p: sp3(v.ellbogen, s),
        haut: hautpunkt(sp3(v.ellbogen, s), s, v.r[2]),
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
    /* ------------------------------------------------------------------------------------
     * DAS SKELETT wird mitgegeben, damit der Test die Dichtheit des Netzes pruefen kann.
     *
     * WARUM AUSGERECHNET DAS: Jeder dieser Punkte liegt INNERHALB des Koerpers - auf der
     * Achse einer Gliedmasse oder auf der Wirbelsaeule. Ein Punkt im Inneren eines
     * geschlossenen Koerpers muss sich bei JEDER Blickrichtung auf eine Stelle abbilden, die
     * von mindestens einer sichtbaren Flaeche bedeckt ist. Ist er es nicht, hat das Netz an
     * dieser Stelle ein Loch.
     *
     * Diese Pruefung entstand aus einem VERDACHT, der sich nicht bestaetigt hat: auf einem
     * flach schattierten Bild sahen die Hinterbeine zerrissen aus; nachgemessen war es der
     * Hintergrund zwischen ihnen. Sie ist trotzdem geblieben, weil zwei absichtliche
     * Beschaedigungen zeigen, dass sie echte Risse findet: ein fehlender Flaechenring des
     * Lofts (32 von 590 Punkten unbedeckt) und eine um ein Glied verkuerzte Gliedmasse
     * (24 von 590). Ohne Beschaedigung sind es null.
     *
     * Sichtpruefung am Bild bleibt trotzdem noetig: dass ein Tier DICHT ist, heisst nicht,
     * dass es wie ein Tier aussieht. Dafuer gibt es tools/tier3d-bild.js.
     * ---------------------------------------------------------------------------------- */
    m.skelett = [];
    /* `innen` sagt, ob der Punkt ECHT im Koerper liegt. Die beiden ENDEN einer Kette liegen
     * das nicht: dort schliesst der Deckel ab, und der Endpunkt ist genau dessen Mittelpunkt,
     * also ein Punkt AUF der Oberflaeche. Ein Test, der von ihm eine Flaeche davor verlangt,
     * misst nicht die Dichtheit, sondern stolpert ueber seine eigene Randbedingung -
     * gemessen am 12.08.2026: die Flaeche an dieser Bildstelle hatte exakt dieselbe Tiefe
     * wie der Punkt. Zusaetzlich werden die MITTEN der Abschnitte aufgenommen; sie liegen
     * immer im Inneren und decken auch einen Riss mitten in einem Glied auf. */
    function kettePunkte(name, gelenke) {
      var j;
      for (j = 0; j < gelenke.length; j++) {
        m.skelett.push({ was: name + j, p: gelenke[j], innen: (j > 0 && j < gelenke.length - 1) });
        if (j < gelenke.length - 1) {
          m.skelett.push({
            was: name + j + 'mitte', innen: true,
            p: mal(plus(gelenke[j], gelenke[j + 1]), 0.5)
          });
        }
      }
    }
    var wirbel = [];
    for (i = 0; i < kette2.length; i++) wirbel.push(station(kette2[i]).p);
    kettePunkte('wirbel', wirbel);
    for (s = -1; s <= 1; s += 2) {
      var seit = (s < 0 ? 'r' : 'l');
      kettePunkte(seit + 'vorn', [sp3(b.vorn.schulter, s), sp3(b.vorn.buggelenk, s),
        sp3(b.vorn.ellbogen, s), sp3(b.vorn.carpus, s), sp3(b.vorn.pfote, s)]);
      kettePunkte(seit + 'hinten', [sp3(b.hinten.huefte, s), sp3(b.hinten.knie, s),
        sp3(b.hinten.sprung, s), sp3(b.hinten.pfote, s)]);
    }
    /* AUF DIE EIGENE MITTE SCHIEBEN (gemessen im Browser, 09.08.2026: 56 px Rand links,
     * 19 px rechts). Der Bauplan ist um den Rumpfmittelpunkt herum geschrieben, das Tier
     * reicht mit der Nase aber weiter nach vorn als mit dem Schwanz nach hinten. Ohne diese
     * Verschiebung steht das Modell schief im Bild UND dreht sich um einen Punkt hinter
     * seinem Koerpermittelpunkt - beim Ziehen wandert es dann seitlich aus dem Bild.
     * Die Marken werden mitgeschoben; ihre Lage ZUEINANDER und die Vorzeichen von x und z
     * bleiben davon unberuehrt, und genau die prueft der Test. */
    m.mitte = schwerpunkt(m.pts);
    verschiebe(m.pts, m.mitte);
    for (i = 0; i < marken.length; i++) {
      marken[i].p = minus(marken[i].p, m.mitte);
      marken[i].haut = minus(marken[i].haut, m.mitte);
    }
    for (i = 0; i < m.skelett.length; i++) m.skelett[i].p = minus(m.skelett[i].p, m.mitte);
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
   *
   * DIE DREHUNG STEHT HIER AUSGESCHRIEBEN statt drehe() aufzurufen (12.08.2026). Der Grund
   * ist gemessen: die Schleife laeuft 17 Kippwinkel x 36 Drehwinkel x ~1000 Punkte = ueber
   * 600 000 Mal. drehe() rechnet bei jedem Aufruf vier Winkelfunktionen aus, obwohl sie
   * innerhalb eines Winkelpaares gleich bleiben. Vorgezogen kostet der Bau des Hundenetzes
   * 41 ms statt 214 ms. Das faellt beim Wechsel der Tierart auf, nicht im Test.
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
    var tab = [], n, g;
    for (n = -NICK_GRENZE; n <= NICK_GRENZE; n += NICK_STUFE) {
      var nr = n * Math.PI / 180, cn = Math.cos(nr), sn = Math.sin(nr);
      var hmax = 0, vmax = 0;
      for (g = 0; g < 360; g += 10) {
        var gr = g * Math.PI / 180, cg = Math.cos(gr), sg = Math.sin(gr);
        for (i = 0; i < alle.length; i++) {
          var p = alle[i];
          var x1 = p[0] * cg + p[2] * sg;
          var z1 = -p[0] * sg + p[2] * cg;
          var y2 = p[1] * cn - z1 * sn;
          var z2 = p[1] * sn + z1 * cn;
          var f = KAMERA / Math.max(0.5, KAMERA - z2);      /* dieselbe Perspektive wie beim Zeichnen */
          var ax = (x1 < 0 ? -x1 : x1) * f, ay = (y2 < 0 ? -y2 : y2) * f;
          if (ax > hmax) hmax = ax;
          if (ay > vmax) vmax = ay;
        }
      }
      tab.push({ nick: n, h: hmax, v: vmax });
    }
    return tab;
  }
  /* Der Eintrag fuer diesen Kippwinkel - beide Nachbarstufen werden beruecksichtigt, damit
   * beim Ziehen zwischen zwei Stufen nichts ueber den Rand rutscht. */
  function ausdehnungBei(tab, nickGrad) {
    if (!tab || !tab.length) return { h: 2.6, v: 1.6 };
    var n = Math.max(-NICK_GRENZE, Math.min(NICK_GRENZE, nickGrad || 0));
    var h = 0, v = 0, i;
    for (i = 0; i < tab.length; i++) {
      if (Math.abs(tab[i].nick - n) <= NICK_STUFE) { h = Math.max(h, tab[i].h); v = Math.max(v, tab[i].v); }
    }
    if (!h || !v) { h = tab[0].h; v = tab[0].v; }
    return { h: h, v: v };
  }

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
      var eck = [], x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
      for (j = 0; j < n; j++) {
        var e = pp[f[j]];
        eck.push(e); tiefe += gp[f[j]][2];
        if (e.x < x0) x0 = e.x;
        if (e.x > x1) x1 = e.x;
        if (e.y < y0) y0 = e.y;
        if (e.y > y1) y1 = e.y;
      }
      tiefe /= n;
      /* Flaechennormale aus den ersten drei Ecken im GEDREHTEN Raum: sie gibt die
       * Helligkeit und erlaubt, die Rueckseite wegzulassen. */
      var a = gp[f[0]], b = gp[f[1]], c = gp[f[2]];
      var nv = kreuz([b[0] - a[0], b[1] - a[1], b[2] - a[2]], [c[0] - a[0], c[1] - a[1], c[2] - a[2]]);
      nv = norm(nv);
      /* Entartete Flaeche (die Polkappe eines Ellipsoids faellt zu einem Punkt zusammen):
       * norm() liefert dort den Nullvektor. Sie hat keine Vorder- und keine Rueckseite und
       * gehoert weggelassen - ohne diese Pruefung entschied das Vorzeichen von 0 darueber,
       * ob sie gezeichnet wird, und das ist Zufall. */
      if (!nv[0] && !nv[1] && !nv[2]) continue;
      if (nv[2] < 0) continue;                      /* zeigt von der Kamera weg */
      /* Licht von links oben vorn - dieselbe Richtung wie in der uebrigen Oberflaeche. */
      var lic = nv[0] * (-0.35) + nv[1] * 0.5 + nv[2] * 0.79;
      out.push({
        eck: eck, tiefe: tiefe, hell: Math.max(0.28, Math.min(1, 0.42 + 0.58 * lic)),
        farbe: f.farbe || HAUT, x0: x0, x1: x1, y0: y0, y1: y1
      });
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
       *     Das ist genau die vorgetaeuschte Raeumlichkeit, vor der der Dateikopf warnt. */
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
   * Marke selbst sitzt - ohne ihn verdeckte jedes Bein seine eigene Klemme.
   *
   * DIE HUELLRECHTECK-ABFRAGE ZUERST (12.08.2026): Diese Schleife laeuft viermal je Bild
   * ueber alle sichtbaren Flaechen. Seit der Neufassung sind das rund 500 statt 250, und
   * imVieleck() kostet je Flaeche vier bis vierzehn Kantenschnitte. Der Vergleich der vier
   * Randwerte wirft ueber 90 Prozent davon vorher weg und kostet fast nichts. */
  function verdeckt(pr, tiefe, flaechen) {
    for (var i = 0; i < flaechen.length; i++) {
      var f = flaechen[i];
      if (f.tiefe <= tiefe + 0.04) continue;
      if (pr.x < f.x0 || pr.x > f.x1 || pr.y < f.y0 || pr.y > f.y1) continue;
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
