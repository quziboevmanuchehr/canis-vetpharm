/*
 * PLATZHALTER — erzeugt von tools/web-app-bauen.js, nicht von Hand aendern.
 *
 * Das Literatur-Nachschlagewerk steht NUR an der Station. Es ist ein Auszug aus den
 * Fachbuechern des Praxisinhabers; diese Web-App ist oeffentlich zugaenglich, und die
 * Vorlagen sind ausdruecklich nur fuer den persoenlichen Gebrauch lizenziert.
 *
 * Diese Datei besetzt die Stelle, damit das <script src> in index.html kein 404 wirft,
 * und setzt EIN Merkmal, an dem die Oberflaeche den Unterschied zwischen "fehlt" und
 * "steht nur an der Station" erkennt. Buchwissen enthaelt sie nicht.
 */
(function (root) {
  'use strict';
  root.VS = root.VS || {};
  root.VS.literaturNurLokal = true;
}(typeof self !== 'undefined' ? self : this));
