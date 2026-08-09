/*
 * patient-alter.js — Alter eines Patienten: aus dem Geburtsdatum gerechnet oder geschaetzt.
 *
 * WARUM ES DIESE DATEI GIBT (09.08.2026):
 * Das EKG-Submodul hatte fuer das Alter EIN Textfeld ("z. B. 9 J"). Damit war das Alter eine
 * Zeichenkette und fuer keine Regel benutzbar - obwohl fast jede rassebedingte Herzerkrankung
 * ein Altersfenster hat (okkulte DCM des Dobermanns ab etwa 4 Jahren, erbliche ventrikulaere
 * Arrhythmie des Deutschen Schaeferhundes zwischen 12 Wochen und 2 Jahren, HCM der Katze
 * ueberwiegend ab dem mittleren Alter). Ein Programm, das "9 J" nur abdruckt, kann daraus
 * nichts folgern.
 *
 * ZWEI EINGABEWEGE, WEIL ES ZWEI WIRKLICHKEITEN GIBT:
 *   1. GEBURTSDATUM bekannt (Zuchttier, Impfpass, Chipregister) -> auf den Tag genau.
 *   2. GEBURTSDATUM UNBEKANNT (Fundtier, Tierschutz, Zweitbesitzer) -> geschaetzte Angabe.
 * Der zweite Fall ist in der Kleintierpraxis der haeufigere. Ein Programm, das ein
 * Geburtsdatum ERZWINGT, bekommt deshalb erfundene Datumsangaben - und die sehen hinterher
 * genauso genau aus wie die echten. Die Herkunft wird deshalb MITGEFUEHRT (feld "quelle")
 * und in der Oberflaeche und auf dem Ausdruck angezeigt.
 *
 * WARUM KALENDERRECHNUNG UND NICHT TAGE/365:
 * Ein Tierarzt schreibt "3 Jahre 4 Monate" in die Akte, nicht "3,34 Jahre". Ueber
 * Tage/365,25 kaeme am eigenen Geburtstag je nach Schaltjahrlage 2,999 heraus - und eine
 * Regel "ab 3 Jahren" haette dann einen Tag zu spaet gegriffen. Gerechnet wird deshalb im
 * Kalender: volle Jahre, volle Restmonate, Resttage. dezimalJahre ist daraus abgeleitet und
 * am Geburtstag exakt ganzzahlig.
 *
 * Reines ES5, keine Abhaengigkeiten. Laeuft im Browser (window.VS.alter) und in Node.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.VS = root.VS || {}; root.VS.alter = factory(); }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var MAX_JAHRE = 60;          // aelter wird kein Patient dieser Anwendung (Papagei, Schildkroete: siehe unten)

  /* Ein Datum aus "JJJJ-MM-TT" - genau die Form, die <input type="date"> liefert.
   * ABSICHTLICH NICHT new Date(text): das liest "2020-03-01" als UTC-Mitternacht und ergibt
   * in westlichen Zeitzonen den 29.02. Ein um einen Tag verschobenes Geburtsdatum faellt
   * niemandem auf und verschiebt jede Altersgrenze. */
  function ausIso(text) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(text || '').trim());
    if (!m) return null;
    var j = +m[1], mo = +m[2], t = +m[3];
    if (mo < 1 || mo > 12 || t < 1 || t > 31) return null;
    var d = new Date(j, mo - 1, t);
    /* Faengt den 31.02.: JavaScript rollt still auf den 03.03. weiter. */
    if (d.getFullYear() !== j || d.getMonth() !== mo - 1 || d.getDate() !== t) return null;
    return d;
  }

  function alsIso(d) {
    if (!d) return '';
    function z(n) { return (n < 10 ? '0' : '') + n; }
    return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate());
  }

  /* Ein Datum um n Monate weiterstellen, mit Anschlag am Monatsende.
   * Der 31. Januar plus einen Monat ist der 28. (oder 29.) Februar - nicht der 3. Maerz,
   * den JavaScript von selbst daraus macht. Genau daran ist die erste Fassung dieser
   * Datei gescheitert: sie kam auf "1 Monat MINUS 2 Tage". */
  function plusMonate(d, n) {
    var j = d.getFullYear(), mo = d.getMonth() + n, t = d.getDate();
    var letzter = new Date(j, mo + 1, 0).getDate();
    return new Date(j, mo, Math.min(t, letzter));
  }
  var MS_TAG = 86400000;
  /* Math.round, weil die Sommerzeitumstellung zwischen zwei lokalen Mitternachten eine
   * Stunde verschluckt oder hinzufuegt - der Abstand ist dann 30,958 statt 31 Tage. */
  function tageZwischen(a, b) { return Math.round((b.getTime() - a.getTime()) / MS_TAG); }

  /* ---------------------------------------------------------------------------
     ausDatum(geburtIso, heute) — das genaue Alter.
     "heute" ist einspeisbar, damit der Test nicht vom Kalender des Rechners abhaengt;
     ohne Angabe gilt der heutige Tag.
     Rueckgabe null, wenn das Datum unbrauchbar ist - MIT Grund, denn eine stille
     Null waere in der Oberflaeche nicht von "noch nichts eingegeben" zu unterscheiden.
     --------------------------------------------------------------------------- */
  function ausDatum(geburtIso, heute) {
    var g = ausIso(geburtIso);
    if (!g) return { gueltig: false, warum: 'Kein gültiges Datum.' };
    var h = heute ? (typeof heute === 'string' ? ausIso(heute) : heute) : new Date();
    if (!h) return { gueltig: false, warum: 'Kein gültiges Datum.' };
    h = new Date(h.getFullYear(), h.getMonth(), h.getDate());
    if (g.getTime() > h.getTime()) return { gueltig: false, warum: 'Das Geburtsdatum liegt in der Zukunft.' };

    /* ZUERST DIE VOLLEN MONATE, DANN DIE RESTTAGE DARAUS - nicht umgekehrt.
     * Ein Monat ist voll, wenn der Tag des Monats wieder erreicht ist; wo es diesen Tag
     * nicht gibt (31. Januar -> Februar), zaehlt das Monatsende. Die Resttage sind dann
     * schlicht der Abstand zum letzten Monatstag und koennen gar nicht negativ werden. */
    var jahre = h.getFullYear() - g.getFullYear();
    var monate = h.getMonth() - g.getMonth();
    if (h.getDate() < g.getDate()) monate--;
    if (monate < 0) { monate += 12; jahre--; }
    var anker = plusMonate(g, jahre * 12 + monate);
    var tage = tageZwischen(anker, h);

    if (jahre > MAX_JAHRE) {
      return { gueltig: false, warum: 'Über ' + MAX_JAHRE + ' Jahre — bitte das Geburtsdatum prüfen.' };
    }
    return bau(jahre, monate, tage, 'datum', alsIso(g), tageZwischen(g, h));
  }

  /* ---------------------------------------------------------------------------
     ausUngefaehr(jahre, monate) — die geschaetzte Angabe.
     Sie ist gleichwertig nutzbar, wird aber ueberall als geschaetzt gekennzeichnet.
     --------------------------------------------------------------------------- */
  function ausUngefaehr(jahre, monate) {
    var j = zahl(jahre), m = zahl(monate);
    if (j == null && m == null) return { gueltig: false, warum: 'Keine Altersangabe.' };
    j = j || 0; m = m || 0;
    if (j < 0 || m < 0) return { gueltig: false, warum: 'Negatives Alter.' };
    /* "0 Jahre 18 Monate" ist eine ganz normale Eingabe - sie wird umgerechnet statt abgelehnt. */
    j += Math.floor(m / 12); m = m % 12;
    if (j > MAX_JAHRE) return { gueltig: false, warum: 'Über ' + MAX_JAHRE + ' Jahre — bitte prüfen.' };
    if (j === 0 && m === 0) return { gueltig: false, warum: 'Keine Altersangabe.' };
    return bau(j, m, 0, 'ungefaehr', null);
  }

  function zahl(v) {
    if (v == null || v === '') return null;
    var n = parseFloat(String(v).replace(',', '.'));
    return isFinite(n) ? n : null;
  }

  function bau(jahre, monate, tage, quelle, geburt, tageGesamt) {
    /* dezimalJahre ist die Zahl, mit der Altersfenster verglichen werden. Am Geburtstag ist
     * sie exakt ganzzahlig - eine Regel "ab 4 Jahren" greift also genau am vierten
     * Geburtstag und nicht einen Tag davor oder danach. */
    var dez = jahre + monate / 12 + tage / 365.2425;
    var tg = (tageGesamt != null) ? tageGesamt : Math.round((jahre * 12 + monate) * 30.44 + tage);
    return {
      gueltig: true, jahre: jahre, monate: monate, tage: tage,
      dezimalJahre: Math.round(dez * 1000) / 1000,
      monateGesamt: jahre * 12 + monate,
      tageGesamt: tg,
      quelle: quelle,                       // 'datum' | 'ungefaehr' | 'text'
      geburt: geburt || null,
      geschaetzt: quelle !== 'datum',
      text: text(jahre, monate, tage, quelle, tg),
      kurz: kurz(jahre, monate, quelle)
    };
  }

  /* EIN JUNGTIER WIRD IN WOCHEN GEMESSEN, ein alter Hund in Jahren.
   * Die Grenze liegt bei drei Monaten, und das ist keine Geschmacksfrage: bis dahin
   * aendern sich Herzfrequenz, Normwerte und Dosis von Woche zu Woche. "1 Monat 4 Tage"
   * zwingt den Tierarzt zum Kopfrechnen, "5 Wochen" nicht. */
  var WOCHEN_BIS_TAGE = 92;
  function text(jahre, monate, tage, quelle, tageGesamt) {
    var v = (quelle === 'datum') ? '' : 'ca. ';
    if (jahre === 0 && tageGesamt != null && tageGesamt < WOCHEN_BIS_TAGE) {
      if (tageGesamt < 14) return v + tageGesamt + (tageGesamt === 1 ? ' Tag' : ' Tage');
      var w = Math.floor(tageGesamt / 7);
      return v + w + (w === 1 ? ' Woche' : ' Wochen');
    }
    if (jahre === 0) {
      return v + monate + (monate === 1 ? ' Monat' : ' Monate') + (tage ? ' ' + tage + ' T' : '');
    }
    return v + jahre + (jahre === 1 ? ' Jahr' : ' Jahre') + (monate ? ' ' + monate + ' Mon.' : '');
  }

  function kurz(jahre, monate, quelle) {
    var v = (quelle === 'datum') ? '' : '~';
    if (jahre === 0) return v + monate + ' M';
    return v + jahre + ' J' + (monate ? ' ' + monate + ' M' : '');
  }

  /* ---------------------------------------------------------------------------
     parse(text) — eine von Hand getippte Altersangabe verstehen.

     WOZU: Bis heute stand im Feld eine freie Zeichenkette ("9 J", "ca. 7", "8 Monate").
     Diese Angaben liegen in gespeicherten Patientendaten bereits vor. Sie einfach zu
     verwerfen, hiesse den Bestand wegzuwerfen; sie zu RATEN waere schlimmer. Deshalb:
     verstanden wird nur, was eindeutig ist, alles andere gibt null.
     --------------------------------------------------------------------------- */
  function parse(txt) {
    var t = String(txt == null ? '' : txt).toLowerCase().trim();
    if (!t) return null;
    var geschaetzt = /(^|\W)(ca\.?|circa|etwa|ungef|~|>|<)/.test(t);
    t = t.replace(/[~<>]/g, ' ').replace(/\b(ca\.?|circa|etwa|ungefaehr|ungefähr)\b/g, ' ');
    /* Eine Spanne ("5-6 Jahre") wird auf den UNTEREN Wert gelegt und als geschaetzt
     * gefuehrt. Die Mitte zu nehmen waere eine erfundene Genauigkeit. */
    var spanne = /(\d+)\s*[-–bis]+\s*(\d+)/.exec(t);
    if (spanne) { t = t.replace(spanne[0], spanne[1]); geschaetzt = true; }

    var jahre = 0, monate = 0, tage = 0, gefunden = false;
    var re = /(\d+(?:[.,]\d+)?)\s*(jahre|jahr|j|monate|monat|mon|m|wochen|woche|w|tage|tag|t)?\b/g, m;
    while ((m = re.exec(t))) {
      var n = parseFloat(m[1].replace(',', '.')), e = m[2] || '';
      if (!isFinite(n)) continue;
      gefunden = true;
      if (/^(jahre|jahr|j)$/.test(e) || e === '') {
        jahre += Math.floor(n);
        monate += Math.round((n - Math.floor(n)) * 12);       // "7,5 J" -> 7 J 6 M
      } else if (/^(monate|monat|mon|m)$/.test(e)) { monate += Math.round(n); }
      else if (/^(wochen|woche|w)$/.test(e)) { tage += Math.round(n * 7); }
      else { tage += Math.round(n); }
    }
    if (!gefunden) return null;
    monate += Math.floor(tage / 30); tage = tage % 30;
    jahre += Math.floor(monate / 12); monate = monate % 12;
    if (jahre === 0 && monate === 0 && tage === 0) return null;
    if (jahre > MAX_JAHRE) return null;
    var out = bau(jahre, monate, tage, geschaetzt ? 'ungefaehr' : 'text', null);
    out.geschaetzt = true;      // eine getippte Angabe ist NIE auf den Tag genau
    out.text = text(jahre, monate, tage, 'ungefaehr', out.tageGesamt);
    out.kurz = kurz(jahre, monate, 'ungefaehr');
    return out;
  }

  /* ---------------------------------------------------------------------------
     imFenster(alter, von, bis) — faellt das Alter in ein Regelfenster?

     Beide Grenzen in JAHREN, null heisst "offen". Ohne gueltiges Alter kommt null
     zurueck und NICHT false: "wir wissen es nicht" und "trifft nicht zu" sind zwei
     verschiedene Dinge, und nur beim ersten darf die Anwendung schweigen statt zu verneinen.
     --------------------------------------------------------------------------- */
  function imFenster(alter, von, bis) {
    if (!alter || !alter.gueltig) return null;
    var j = alter.dezimalJahre;
    if (von != null && j < von) return false;
    if (bis != null && j > bis) return false;
    return true;
  }

  return {
    ausDatum: ausDatum, ausUngefaehr: ausUngefaehr, parse: parse,
    imFenster: imFenster, ausIso: ausIso, alsIso: alsIso, MAX_JAHRE: MAX_JAHRE
  };
}));
