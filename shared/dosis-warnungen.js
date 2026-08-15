/*
 * dosis-warnungen.js — Richtigstellungen zu Stellen des Nachschlagewerks, an denen die
 * VORLAGE SELBST falsch ist.
 *
 * ERZEUGT von tools/ekg-literatur-bauen.js am 2026-08-15. NICHT von Hand aendern —
 * die Quelldaten liegen in docs/ekg-quellen/literatur-2026-08.json (Feld "warnung").
 *
 * WARUM ES DIESE DATEI GETRENNT VON ekg-literatur.js GIBT (15.08.2026):
 * Das Nachschlagewerk ist ein Auszug aus lizenzierten Fachbuechern und geht seit 1.18.1 nicht
 * mehr ins oeffentliche Update-Paket. Der Updater loescht nichts (robocopy /E, ohne /MIR),
 * eine laufende Station behaelt also ihre ALTE Fassung — und die kennt die Warnungen nicht:
 * 1.12.0 bis 1.17.0 tragen nachgemessen NULL, erst 1.18.0 zwei. Die Warnung muss die Station
 * deshalb auf einem anderen Weg erreichen als die Daten, die sie kommentiert.
 *
 * ZUORDNUNG UEBER EINEN EXAKTEN SCHLUESSEL aus werk|seite|zahlen — keine Teilzeichenkette,
 * damit nie eine fremde Stelle mitmarkiert wird. Gemessen am 15.08.2026 an allen sechs
 * veroeffentlichten Fassungen (1.12.0-1.18.0): beide Schluessel treffen dort je GENAU EINE
 * Stelle. werk+seite allein reicht nicht — 266 Schluessel sind dort mehrfach belegt.
 *
 * DER SCHLUESSEL STEHT ALS HASH DA, NICHT IM KLARTEXT: "zahlen" ist die abgeschriebene
 * Dosiszeile der Buchseite, und diese Datei geht ins oeffentliche Paket. Der Hash trifft
 * dieselbe Stelle, ohne den Satz mitzuliefern. werk und seite bleiben lesbar — eine
 * Quellenangabe ist kein Auszug, und die Belegpflicht des Projekts verlangt sie.
 *
 * Diese Datei enthaelt KEIN Buchwissen, nur eigene Richtigstellungen mit oeffentlichen
 * Gegenquellen. Reines ES5, keine Abhaengigkeiten.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.VS = root.VS || {}; root.VS.dosisWarnungen = factory(); }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var WARNUNGEN = [
    {"werk":"EKG-Interpretation in der Kleintierpraxis","seite":"PDF 44 (Buch 232)","kennung":"35a8d324","warnung":"EINHEIT DER VORLAGE IST UM DEN FAKTOR 1000 ZU HOCH. Die Buchseite druckt fuer Dopamin, Dobutamin und Nitroprussid-Natrium mg/kg/min; richtig ist ug/kg/min. Belegt am 14.08.2026: CliniPharm/vetpharm.uzh.ch (Dopamin 1-3 / 3-10 / ueber 10 ug/kg/min) und Killich, Kleintierkardiologie 2019, S. 216 (Dopamin ab 2 ug/kg/min) und S. 221 (Nitroprussid 0,5-5 ug/kg/min). NICHT nach der gedruckten Einheit dosieren."},
    {"werk":"Kompakt Kleintierkardiologie","seite":"PDF 118 = Buchseite 118","kennung":"dd5d5028","warnung":"BEZUGSGROESSE: die Angabe \"mg pro Tier\" gilt fuer die KATZE. Beim HUND wird Amlodipin nach Koerpergewicht dosiert - CliniPharm/vetpharm nennt 0,05-0,25 mg/kg 1x taeglich, der ACVIM-Konsensus 2018 0,1-0,25 mg/kg. Fuer einen 30-kg-Hund waeren 0,625-1,25 mg pro Tier rund ein Fuenftel bis ein Sechstel der belegten Dosis, also praktisch wirkungslos. Geprueft am 15.08.2026 gegen vetpharm und Killich, Kleintierkardiologie 2019, S. 221."}
  ];

  /* FNV-1a ueber die UTF-16-Einheiten. Kein Sicherheitsverfahren - er soll nur eindeutig
   * zuordnen, und tools/ekg-modul-test.js erzwingt, dass jeder Wert genau eine Stelle trifft.
   * Eine Kollision faerbt diese Pruefung also rot, statt still zu warnen. */
  function schluessel(s) {
    var t = String((s && s.werk) || '') + '|' + String((s && s.seite) || '') + '|' + String((s && s.zahlen) || '');
    var h = 0x811c9dc5, i;
    for (i = 0; i < t.length; i++) {
      h ^= t.charCodeAt(i);
      h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
    }
    return ('0000000' + h.toString(16)).slice(-8);
  }
  var KARTE = {};
  for (var i = 0; i < WARNUNGEN.length; i++) KARTE[WARNUNGEN[i].kennung] = WARNUNGEN[i].warnung;

  /* Der Rueckfall auf stelle.warnung ist Absicht: eine NEUERE Fassung des Nachschlagewerks
   * darf eine Warnung mitbringen, die diese Datei noch nicht kennt. Die Reihenfolge sagt,
   * wer im Streitfall gewinnt — die eigene Karte, weil sie ueberall ankommt. */
  function fuer(stelle) {
    if (!stelle) return '';
    return KARTE[schluessel(stelle)] || String(stelle.warnung || '');
  }

  return {
    WARNUNGEN: WARNUNGEN, fuer: fuer, schluessel: schluessel, anzahl: WARNUNGEN.length,
  };
}));
