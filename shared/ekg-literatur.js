/*
 * ekg-literatur.js — durchsuchbares Nachschlagewerk aus den Fachbuechern des Nutzers.
 *
 * ERZEUGT von tools/ekg-literatur-bauen.js am 2026-08-10. NICHT von Hand aendern —
 * die Quelldaten liegen in docs/EKG-LITERATUR-2026-08.json.
 *
 * WOHER: systematische Auswertung von fuenf Werken der Kleintierkardiologie
 * (EKG-Interpretation in der Kleintierpraxis Bd. 1-3; Kompakt Kleintierkardiologie;
 * Praxis der Kardiologie Hund und Katze — Anfertigung des EKGs, 24-Stunden-EKG,
 * Antiarrhythmika, Formeln, Referenzwerte, Echokardiografie). Jede Aussage traegt Buch
 * und Seite.
 *
 * WAS SIE IST UND WAS NICHT: ein NACHSCHLAGEWERK. Die Anwendung behauptet weiterhin nur,
 * was sie selbst misst (BEFUNDREGELN in ui/app/index.html, ekg-analyse.js). Was hier steht,
 * schlaegt der Untersucher nach — es loest nichts aus.
 *
 * Reines ES5, keine Abhaengigkeiten. Laeuft im Browser (window.VS.literatur) und in Node.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.VS = root.VS || {}; root.VS.literatur = factory(); }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var THEMEN = [
    [
      "aufnahmetechnik",
      "Aufnahme und Technik"
    ],
    [
      "lagerung",
      "Lagerung und Elektroden"
    ],
    [
      "kalibrierung",
      "Eichung und Verstärkung"
    ],
    [
      "papier-raster",
      "Papier, Raster, Vorschub"
    ],
    [
      "filter",
      "Filter"
    ],
    [
      "artefakte",
      "Artefakte erkennen"
    ],
    [
      "messgroessen",
      "Messgrößen und Vorgehen"
    ],
    [
      "normwerte",
      "Normwerte"
    ],
    [
      "formel",
      "Formeln"
    ],
    [
      "achse",
      "Elektrische Herzachse"
    ],
    [
      "p-welle",
      "P-Welle"
    ],
    [
      "qrs",
      "Kammerkomplex"
    ],
    [
      "st-t",
      "ST-Strecke und T-Welle"
    ],
    [
      "qt",
      "QT-Zeit"
    ],
    [
      "rhythmus-sinus",
      "Sinusrhythmus und -arrhythmie"
    ],
    [
      "rhythmus-supraventrikulaer",
      "Supraventrikuläre Rhythmusstörungen"
    ],
    [
      "rhythmus-ventrikulaer",
      "Ventrikuläre Rhythmusstörungen"
    ],
    [
      "block-av",
      "AV-Blockierungen"
    ],
    [
      "block-sa",
      "SA-Block und Sinusarrest"
    ],
    [
      "schenkelblock",
      "Schenkelblöcke"
    ],
    [
      "praeexzitation",
      "Präexzitation"
    ],
    [
      "schrittmacher",
      "Schrittmacher"
    ],
    [
      "holter-24h",
      "24-Stunden-EKG"
    ],
    [
      "kammergroesse",
      "Vergrößerung von Vorhof und Kammer"
    ],
    [
      "elektrolyt",
      "Elektrolyte"
    ],
    [
      "medikament",
      "Medikamente und Antiarrhythmika"
    ],
    [
      "perikard",
      "Perikard"
    ],
    [
      "echo",
      "Echokardiografie"
    ],
    [
      "befundaufbau",
      "Aufbau eines Befundes"
    ],
    [
      "bedienung",
      "Bedienung"
    ],
    [
      "darstellung-druck",
      "Darstellung und Ausdruck"
    ],
    [
      "sonstiges",
      "Sonstiges"
    ]
  ];

  var STELLEN = [
   {
    "thema": "aufnahmetechnik",
    "text": "Wegen der respiratorischen Sinusarrhythmie muessen beim Hund die Herzschlaege ueber mindestens sechs aufeinander folgende Sekunden der EKG-Kurve gezaehlt werden.",
    "zahlen": "Mindestzaehlstrecke Hund: 6 s",
    "seite": "PDF-Seite 15 (Buchseite 2)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Eine volle Minute auszuzaehlen wird ausdruecklich abgelehnt: in einem so langen Abschnitt treten in der Regel Artefakte auf, die die korrekte Frequenzermittlung stoeren, und der Papierstreifen wird unpraktisch lang.",
    "zahlen": "60 s als Zaehlstrecke: nicht sinnvoll",
    "seite": "PDF-Seite 15 (Buchseite 2)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Die Schreibgeschwindigkeit des EKG muss zwingend bekannt sein, bevor irgendetwas ausgemessen wird. Das Buch kennt genau zwei Werte: 25 mm/s und 50 mm/s.",
    "zahlen": "Papiervorschub: 25 mm/s oder 50 mm/s",
    "seite": "PDF-Seite 18 (Buchseite 5)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Vor jeder Messung von Wellen und Intervallen muessen Papiergeschwindigkeit und Spannungsverstaerkung bekannt sein. Ohne diese beiden Angaben ist keine Messung interpretierbar.",
    "zahlen": "",
    "seite": "PDF 27 (Buch 14)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Fuer EKG bei Hund und Katze betraegt die Papiergeschwindigkeit in der Regel 50 mm/s; manche franzoesische Autoren bevorzugen 25 mm/s.",
    "zahlen": "Regelfall 50 mm/s, Alternative 25 mm/s",
    "seite": "PDF 27 (Buch 14)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Abwaegung der beiden Geschwindigkeiten: bei 50 mm/s laesst sich jede einzelne Welle besser darstellen und genauer messen; bei 25 mm/s ist es einfacher, Rhythmusveraenderungen zu erkennen und Schwankungen den Atmungsphasen bzw. Arrhythmien zuzuordnen.",
    "zahlen": "50 mm/s = Wellenvermessung, 25 mm/s = Rhythmusbeurteilung",
    "seite": "PDF 27 (Buch 14)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Thoraxroentgen in der Kardiologie: hohe Spannung (kV) und niedrige Ladungsmenge (mAs) fuer kontrastarme Aufnahmen, Belichtungszeiten unter 0,02 Sekunden gegen Bewegungsunschaerfe; auf ein Raster wird verzichtet, Folien aus seltenen Erden werden eingesetzt.",
    "zahlen": "Belichtungszeit < 0,02 s",
    "seite": "PDF 59 = Buch 59",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Atemphasen-Kriterium fuer eine verwertbare Seitaufnahme: bei maximaler Inspiration reicht das Lungenfeld bis kaudal des 12. Brustwirbels; am wachen Patienten genuegt meist ein Lungenfeld bis Ende des 11. Brustwirbels. Exspiratorische Aufnahmen taeuschen Kardiomegalie und interstitielle Zeichnung vor.",
    "zahlen": "Lungenfeld bis kaudal Th12 (max. Inspiration) bzw. bis Ende Th11 (ausreichend)",
    "seite": "PDF 60/61 = Buch 60/61",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Inspirationskriterium in der DV/VD-Aufnahme: bei maximaler Inspiration liegt die Zwerchfellkuppel kaudal der Mitte des 8. Brustwirbels und der Zwerchfell-Rippenwinkel kaudal des 10. Brustwirbels.",
    "zahlen": "Zwerchfellkuppel kaudal Mitte Th8; Zwerchfell-Rippenwinkel kaudal Th10",
    "seite": "PDF 61 = Buch 61",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Zur EKG-Aufzeichnung werden meist Dreikanalschreiber genutzt, daneben Einkanal- oder Sechskanalschreiber.",
    "zahlen": "1, 3 oder 6 Kanaele",
    "seite": "22",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Weil Sedation und Narkose die EKG-Parameter erheblich veraendern, muss die Registrierung zu diagnostischen Zwecken stets am wachen Patienten erfolgen.",
    "zahlen": "",
    "seite": "22",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Elektroden: Krokodilklemmen auf die mit Alkohol und/oder Elektrodengel befeuchtete Haut. Anlagestellen sind die Vorderextremitaeten unmittelbar distal des Olekranons und die linke Hinterextremitaet im Bereich der Kniefalte.",
    "zahlen": "distal des Olekranons; Kniefalte linke HE",
    "seite": "22",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Das schwarze Kabel dient der Erdung, kann ueberall am Koerper befestigt werden und wird praktischerweise an einer der beiden Hinterextremitaeten platziert.",
    "zahlen": "schwarz = Erdung",
    "seite": "22",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Nadel- oder Klebeelektroden sind ebenfalls verwendbar, bieten aber bei Registrierung am wachen Tier gegenueber Krokodilklemmen keine Vorteile.",
    "zahlen": "",
    "seite": "22",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Es sollen mindestens sechs Extremitaetenableitungen registriert werden: die drei bipolaren nach Einthoven (I, II, III) und die drei unipolaren nach Goldberger (aVR, aVL, aVF).",
    "zahlen": "mind. 6 Ableitungen: I, II, III, aVR, aVL, aVF",
    "seite": "22",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Kabelfarben und Einthoven-Ableitungen: rote Elektrode = rechte Vorderextremitaet, gelbe Elektrode = linke Vorderextremitaet, gruene Elektrode = linke Hinterextremitaet. Ableitung I = rot-gelb, Ableitung II = rot-gruen, Ableitung III = gelb-gruen.",
    "zahlen": "rot = re VE, gelb = li VE, gruen = li HE; I rot/gelb, II rot/gruen, III gelb/gruen",
    "seite": "22",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Goldberger-Ableitungen: differente Elektrode ist bei aVR die rote (rechte VE), bei aVL die gelbe (linke VE), bei aVF die gruene (linke HE); die jeweils uebrigen beiden Elektroden sind indifferent.",
    "zahlen": "aVR=rot, aVL=gelb, aVF=gruen",
    "seite": "22",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Unipolare Brustwandableitungen mit Anlagepunkten: CV5RL (= rV2) 5. ICR rechts parasternal; CV6LL (= V2) 6. ICR links parasternal; CV6LU (= V4) 6. ICR links auf Hoehe der kostalen Knorpel-Knochen-Grenze; V10 ueber dem Dornfortsatz des 7. Brustwirbels.",
    "zahlen": "CV5RL/rV2: 5. ICR re parasternal; CV6LL/V2: 6. ICR li parasternal; CV6LU/V4: 6. ICR li Knorpel-Knochen-Grenze; V10: Dornfortsatz 7. Brustwirbel",
    "seite": "22",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Das abgedruckte ASD-EKG (Amerikanisch-Kanadischer Schaeferhund, m, 9 Monate) ist ausdruecklich in Einthoven-Ableitungen geschrieben und zeigt einen Rechtsschenkelblock. Andere Ableitungssysteme werden in diesem Seitenbereich nicht benannt, ausser der Brustwandableitung V2 auf Seite 139.",
    "zahlen": "Einthoven-Ableitungen; zusaetzlich V2 (S. 139)",
    "seite": "PDF 129 = Buchseite 129 (Abb. 9.1a)",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Voraussetzung fuer die Bestimmung von PEP und LVET sind ein TM-Mode der Aortenklappen und der linken Kammer sowie ein mitlaufendes EKG. Das EKG dient hier als Zeitbezug fuer die Echomessung.",
    "zahlen": "",
    "seite": "PDF 98 = Buchseite 98",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Die marktueblichen Holter-Rekorder arbeiten ueberwiegend mit 4 Kabeln, die ueber handelsuebliche Klebeelektroden am Thorax befestigt werden.",
    "zahlen": "4 Kabel / 4 Klebeelektroden",
    "seite": "PDF-Seite 1 (Buchseite 179)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Fuer das Holter-EKG wird die Haut an vier Stellen des Thorax rasiert, je zwei Stellen pro Thoraxseite, im Bereich der Interkostalraeume 5 bis 10.",
    "zahlen": "4 Rasurstellen; je 2 pro Thoraxseite; ICR 5-10",
    "seite": "PDF-Seite 1 (Buchseite 179)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Die kraniale Elektrode auf der rechten Thoraxseite gehoert hinter den Ellbogen in einen Bereich, in dem beim Laufen moeglichst keine Hautbewegung entsteht.",
    "zahlen": "",
    "seite": "PDF-Seite 1, Abb. 11.1a (Buchseite 179)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Als ableitende Elektroden eignen sich zahnlose Krokodilklemmen. Die Haut wird vorher mit Gel oder Alkohol benetzt, um den Elektrodenkontakt zu verbessern.",
    "zahlen": "",
    "seite": "PDF 1 (Buch 139)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Mit 4 Elektroden lassen sich die bipolaren Extremitaetenableitungen nach Einthoven und die monopolaren nach Goldberger ableiten. Diese sechs Ableitungen sind heute Standard fuer eine umfassende Diagnostik; unipolare Brustwandableitungen nach Wilson werden in der Veterinaermedizin nur selten verwendet.",
    "zahlen": "4 Elektroden -> 6 Ableitungen (I, II, III, aVR, aVL, aVF)",
    "seite": "PDF 1-2 (Buch 139-140)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Selbstklebeelektroden sind moeglich, erfordern aber Rasur. Bewaehrt hat sich ihr Anbringen an Palmar- und Plantarseite der Pfoten direkt oberhalb des Hauptballens.",
    "zahlen": "",
    "seite": "PDF 1 (Buch 139)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Elektrodenpositionen der 4 Klemmelektroden: Vordergliedmasse links und rechts kurz distal des Olekranons; Hintergliedmasse links und rechts im Bereich des Kniegelenks in Hoehe der Patella.",
    "zahlen": "VG: distal Olekranon; HG: Hoehe Patella",
    "seite": "PDF 2 (Buch 140)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Fuer eine korrekte Dokumentation soll das EKG ueber mindestens 3, besser 5 Minuten geschrieben werden.",
    "zahlen": "min. 3 min, besser 5 min Streifenlaenge",
    "seite": "PDF 3 (Buch 141)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Als ableitende Elektroden eignen sich zahnlose Krokodilklemmen. Die Haut wird vorher mit Gel oder Alkohol benetzt, um den Kontakt zur Koerperoberflaeche zu verbessern.",
    "zahlen": "",
    "seite": "PDF 1 / Buch 139",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Alternativ koennen selbstklebende Elektroden verwendet werden; sie erfordern jedoch eine Rasur. Bewaehrt hat sich das Anbringen der Klebeelektroden an den Palmar- und Plantarseiten der Pfoten direkt oberhalb des Hauptballens.",
    "zahlen": "",
    "seite": "PDF 1 / Buch 139",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Mit diesen 4 Elektroden sind 6 Ableitungen moeglich: die 3 bipolaren Extremitaetenableitungen nach Einthoven (I, II, III) und die 3 monopolaren nach Goldberger (aVR, aVL, aVF).",
    "zahlen": "I, II, III, aVR, aVL, aVF",
    "seite": "PDF 2 / Buch 140",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "aufnahmetechnik",
    "text": "Ankopplung: Haare scheiteln, Haut mit Isopropylalkohol benetzen, dann Ultraschallgel. Alkohol kann die Sonden schaedigen, alternativ nur Gel verwenden.",
    "zahlen": "70 % Isopropylalkohol",
    "seite": "PDF 1 / Buch 95",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "lagerung",
    "text": "Roentgen-Lagerung/Einstellung: erste Rippe und erster Lendenwirbel sollen abgebildet sein; Zentralstrahl seitlich auf den 4.-5. Interkostalraum, in der frontalen (DV/VD-)Aufnahme auf das Ende des Schulterblatts.",
    "zahlen": "Zentralstrahl seitlich 4.-5. ICR",
    "seite": "PDF 59 = Buch 59",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "lagerung",
    "text": "Echo-Lagerung: liegender Patient auf einem Tisch mit Lochaussparungen (Schallkopf von unten) - nur so sind sedierte Tiere untersuchbar, Vorteil geringerer Lungeneinfluss; stehender Patient wird oft besser toleriert, besonders von symptomatischen Tieren. Chetboul et al. (2004) zeigten geringere inter- und intraspezifische Abweichungen der Messdaten am stehenden Tier.",
    "zahlen": "",
    "seite": "PDF 83/84 = Buch 83/84",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "lagerung",
    "text": "Rasur ist nach Auffassung des Autors bei langhaarigen Tieren in 99 % der Untersuchungen ueberfluessig, wenn das Haar gescheitelt, Haut und Haarkleid grosszuegig mit alkoholischem Hautdesinfektionsmittel entfettet und ausreichend Ultraschallgel verwendet wird; fuer Punktionen ist die Rasur unerlaesslich.",
    "zahlen": "99 % der Untersuchungen ohne Rasur",
    "seite": "PDF 84 = Buch 84",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "lagerung",
    "text": "Standardlagerung fuer das diagnostische EKG: rechte Seitenlage, Kopf flach auf der Unterlage, gestreckte Vorderextremitaeten im rechten Winkel zur Koerperlaengsachse, gehalten von einer Hilfsperson.",
    "zahlen": "rechte Seitenlage, Vordergliedmassen 90 Grad zur Koerperlaengsachse",
    "seite": "22",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "lagerung",
    "text": "Eine fehlerhafte Lagerung des Patienten kann die QRS-Komplexe und damit die elektrische Herzachse veraendern.",
    "zahlen": "",
    "seite": "22",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "lagerung",
    "text": "Geht es nur um Rhythmusstoerungen oder Herzfrequenz, ist die Lagerung unwichtig; die Aufzeichnung darf dann in jeder Koerperlage erfolgen (z. B. Narkoseueberwachung, Atemnot). Die abweichende Lage muss aber unbedingt vermerkt und bei der Auswertung beruecksichtigt werden.",
    "zahlen": "",
    "seite": "22",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "lagerung",
    "text": "Fuer die EKG-Aufzeichnung wird der Patient in rechte Seitenlage auf eine nicht leitende Unterlage verbracht. Die Gliedmassen werden rechtwinkelig vom Koerper weggestreckt.",
    "zahlen": "rechte Seitenlage; Gliedmassen im rechten Winkel abgestreckt",
    "seite": "PDF 1 (Buch 139)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "lagerung",
    "text": "Bei Patienten, die sich schwer ablegen lassen, ist die Ableitung auch im Stehen moeglich. Dabei verschiebt sich meist die aufgezeichnete Herzachse und es kommt haeufig zu Artefakten durch Muskelzittern.",
    "zahlen": "",
    "seite": "PDF 1 (Buch 139)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "lagerung",
    "text": "Fuer die EKG-Aufzeichnung wird der Patient in rechte Seitenlage auf eine nichtleitende Unterlage gebracht; die Gliedmassen werden rechtwinkelig vom Koerper weggestreckt.",
    "zahlen": "rechte Seitenlage, Gliedmassen rechtwinkelig",
    "seite": "PDF 1 / Buch 139",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "lagerung",
    "text": "Bei Patienten, die schwer in Seitenlage zu bringen sind, ist die Ableitung auch im Stehen moeglich. Dabei verschiebt sich meist die aufgezeichnete Herzachse und es kommt haeufig zu Artefakten durch Muskelzittern.",
    "zahlen": "",
    "seite": "PDF 1 / Buch 139",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "lagerung",
    "text": "Die Echountersuchung kann am liegenden oder am stehenden Patienten erfolgen; alle Standardebenen lassen sich in beiden Schallpositionen identisch erstellen, die Bilder sind gleich.",
    "zahlen": "",
    "seite": "PDF 1 / Buch 95",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "lagerung",
    "text": "Bei dekompensierten Tieren und bei Orthopnoe ist die Untersuchung im Stehen vorzuziehen, weil Kreislauf geschont und Atmung nicht beeintraechtigt wird.",
    "zahlen": "",
    "seite": "PDF 1 / Buch 95",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "lagerung",
    "text": "Grosse Hunde werden stehend auf dem Fussboden zwischen sitzendem Besitzer und Untersucher untersucht; kleinere Hunde und alle Katzen stehend auf dem Tisch.",
    "zahlen": "grosser Hund ab 30 kg KGW",
    "seite": "PDF 1-3 / Buch 95-97",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "kalibrierung",
    "text": "Umrechnung Kaestchen in Spannung, abhaengig von der Eichzacke: bei 1 cm pro Millivolt (Eichzacke 10 mm/mV) entspricht 1 mm gleich 0,1 mV; bei 5 mm = 1 mV entspricht 1 mm gleich 0,2 mV; bei doppelter Eichzacke 20 mm = 1 mV entspricht 1 mm gleich 0,05 mV.",
    "zahlen": "10 mm/mV -> 1 mm = 0,1 mV; 5 mm/mV -> 1 mm = 0,2 mV; 20 mm/mV -> 1 mm = 0,05 mV",
    "seite": "PDF 27 (Buch 14)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kalibrierung",
    "text": "Bildunterschrift eines VES-Streifens (Hund mit Anaemie): Papiervorschub 5 mm/s, Eichung 1 cm = 1 mV. Der Wert 5 mm/s steht so im Datenstrom des PDF (im Rohstrom geprueft), wirkt aber neben allen anderen Abbildungen des Kapitels wie ein Druckfehler.",
    "zahlen": "5 mm/s; 1 cm = 1 mV",
    "seite": "PDF 48 = Buch 48",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kalibrierung",
    "text": "Im gesamten Arrhythmie-Kapitel werden nur zwei Eichungen verwendet: 1 cm = 1 mV (Normalverstaerkung) und 0,5 cm = 1 mV (halbe Verstaerkung bei hohen Amplituden). Papiervorschub ist mit einer Ausnahme immer 25 mm/s.",
    "zahlen": "25 mm/s; Eichung 1 cm = 1 mV bzw. 0,5 cm = 1 mV",
    "seite": "PDF 48-56 = Buch 48-56",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kalibrierung",
    "text": "Das Geraet wird vor der Aufzeichnung auf 1,0 cm = 1,0 mV geeicht. Bei sehr kleinen Amplituden wird auf 2,0 cm = 1,0 mV umgestellt, bei sehr hohen Ausschlaegen auf 0,5 cm = 1,0 mV.",
    "zahlen": "1,0 cm = 1,0 mV (Standard); 2,0 cm = 1,0 mV; 0,5 cm = 1,0 mV",
    "seite": "22",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kalibrierung",
    "text": "Beispiel linksventrikulaere Vergroesserung: Hund mit PDA, Sinusrhythmus HF 80 bis 100/min, high voltage mit R-Amplituden von 3,6 mV in Abl. II, 4,4 mV in CV6LL und 5,4 mV in CV6LU. Dieser Streifen wurde wegen der hohen Ausschlaege mit halber Verstaerkung geschrieben (0,5 cm = 1 mV) bei 25 mm/s.",
    "zahlen": "R 3,6 / 4,4 / 5,4 mV; HF 80-100/min; 25 mm/s; Eichung 0,5 cm = 1 mV",
    "seite": "31",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kalibrierung",
    "text": "Bildunterschrift eines abgedruckten Katzen-EKG (BKH, m, 7 Wochen, persistierender AV-Kanal): das EKG wurde mit Papiervorschub 25 mm/s und einer Eichung von 1 cm = 1 mV geschrieben. Das ist die einzige Stelle im Seitenbereich, die Vorschub und Verstaerkung ausdruecklich nennt.",
    "zahlen": "25 mm/s; Eichung 1 cm = 1 mV (= 10 mm/mV)",
    "seite": "PDF 139 = Buchseite 139 (Abb. 9.3a)",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kalibrierung",
    "text": "Vertikale Kalibration (Amplitude): ueblich 1 cm = 1 mV, damit entspricht 1 mm = 0,1 mV. Bei grossen Amplituden kann mit 0,5 cm = 1 mV aufgezeichnet werden; das muss bei der Interpretation unbedingt beruecksichtigt werden.",
    "zahlen": "1 cm = 1 mV; 1 mm = 0,1 mV; alternativ 0,5 cm = 1 mV",
    "seite": "PDF 3 (Buch 141)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "kalibrierung",
    "text": "Horizontale Kalibration (Zeit): bei einer Papiergeschwindigkeit von 50 mm/s entspricht 1 mm = 0,02 s.",
    "zahlen": "50 mm/s -> 1 mm = 0,02 s",
    "seite": "PDF 3 (Buch 141)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "kalibrierung",
    "text": "Bei adipoesen Patienten sowie bei Perikard- oder Thoraxerguss ist das Signal haeufig sehr schwach (Hypovoltage), weil es durch die Fluessigkeit gedaempft wird. Dann soll die Eichung auf 2 cm = 1 mV geaendert werden.",
    "zahlen": "Eichung 2 cm = 1 mV bei Hypovoltage",
    "seite": "PDF 6 (Buch 144)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "kalibrierung",
    "text": "Abb. 10.36 nennt ausdruecklich die Bezugsbedingungen fuer die QRS- und R-Zacken-Normwerte in Ableitung II: Vorschub 50 mm/s und Amplitude 10 mm/mV.",
    "zahlen": "50 mm/s; 10 mm/mV",
    "seite": "PDF 28 (Buch 166)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "kalibrierung",
    "text": "Vertikale Kalibration (Amplitude): ueblich 1 cm = 1 mV, also 1 mm = 0,1 mV. Bei grossen Amplituden kann mit 0,5 cm = 1 mV aufgezeichnet werden; das muss bei der Interpretation unbedingt beruecksichtigt werden.",
    "zahlen": "1 cm = 1 mV; 1 mm = 0,1 mV; alternativ 0,5 cm = 1 mV",
    "seite": "PDF 3 / Buch 141",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "kalibrierung",
    "text": "Sind die P-QRS-T-Ausschlaege kaum zu sehen, zuerst die Eichung (1 cm = 1 mV) kontrollieren; weitere Ursache ist eine schlechte Ankopplung der Elektroden, dann Kontaktstelle erneut mit Alkohol oder Kontaktgel befeuchten.",
    "zahlen": "1 cm = 1 mV",
    "seite": "PDF 6 / Buch 144",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "kalibrierung",
    "text": "Bei adipoesen Patienten oder Patienten mit Perikard- bzw. Thoraxerguss ist das Signal haeufig sehr schwach, weil es durch die Fluessigkeit gedaempft wird. In dem Fall sollte die Eichung auf 2 cm = 1 mV geaendert werden.",
    "zahlen": "2 cm = 1 mV (doppelte Verstaerkung)",
    "seite": "PDF 6 / Buch 144",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "papier-raster",
    "text": "Handelsuebliches EKG-Papier traegt am Rand bereits vom Hersteller eingedruckte Markierungen (im gezeigten Beispiel schwarz). Form der Markierungen und ihr Abstand sind je nach Fabrikat und Hersteller unterschiedlich; das Geraet bzw. Papier muss also einzeln geprueft werden.",
    "zahlen": "",
    "seite": "PDF-Seite 16 (Buchseite 3)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "papier-raster",
    "text": "Der Regelabstand zwischen zwei Randmarkierungen betraegt 10 cm. Das entspricht bei 50 mm/s Papiervorschub 2 s und bei 25 mm/s Schreibgeschwindigkeit 4 s.",
    "zahlen": "10 cm Markierungsabstand = 2 s bei 50 mm/s = 4 s bei 25 mm/s",
    "seite": "PDF-Seite 16 (Buchseite 3), Text und Bildunterschrift Abb. 1",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "papier-raster",
    "text": "Zwei Messwerkzeuge fuer den Rhythmus werden genannt: der EKG-Zirkel zum Laengenvergleich einzelner RR-Intervalle und alternativ das Abzaehlen der 1-mm-Quadrate des Millimeterpapiers des EKG-Streifens.",
    "zahlen": "Raster: 1-mm-Quadrate",
    "seite": "PDF-Seite 21 (Buchseite 8)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "papier-raster",
    "text": "Umrechnung Kaestchen in Zeit: bei 25 mm/s entspricht ein kleines Kaestchen (1 mm) 0,04 s, bei 50 mm/s entspricht 1 mm 0,02 s.",
    "zahlen": "25 mm/s: 1 mm = 0,04 s; 50 mm/s: 1 mm = 0,02 s",
    "seite": "PDF 27 (Buch 14)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "papier-raster",
    "text": "In diesem Fall traten die P-Wellen immer 0,08 s vor den QRS-Komplexen auf, und das Buch gibt dafuer als Kaestchenmass 4 mm an. Aus dieser Gleichsetzung folgt rechnerisch eine Papiergeschwindigkeit von 50 mm/s (4 mm / 0,08 s). Die Papiergeschwindigkeit wird auf diesen Seiten nirgends ausdruecklich genannt - das ist eine Ableitung aus den Zahlen des Buches, keine Angabe des Buches.",
    "zahlen": "0,08 s = 4 mm; daraus 50 mm/s",
    "seite": "PDF 3 (gedruckt 92)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "papier-raster",
    "text": "Einzige Stelle im Bereich, die eine Zeitdauer in Millimeter umrechnet: eine P-Welle von 0,06 s wird mit 3 mm angegeben. Daraus folgt rechnerisch 1 mm = 0,02 s, also ein Vorschub von 50 mm/s. Die Papiergeschwindigkeit selbst wird im Text NICHT genannt; der Wert 50 mm/s ist von mir aus dieser Gleichsetzung abgeleitet, nicht abgeschrieben.",
    "zahlen": "0,06 s = 3 mm; daraus abgeleitet 1 mm = 0,02 s bzw. 50 mm/s",
    "seite": "PDF 49 (Buch 138)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "papier-raster",
    "text": "Die Aufzeichnung erfolgt zunaechst mit 25 mm/s Papiergeschwindigkeit und anschliessend mit 50 mm/s.",
    "zahlen": "25 mm/s, dann 50 mm/s",
    "seite": "22",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "papier-raster",
    "text": "Um Papier zu sparen, kann der Vorschub nach der ersten Minute von 50 mm/s auf 10 oder 25 mm/s reduziert werden. Dieser Rhythmusstreifen zeigt Aenderungen der Herzfrequenz und Arrhythmien schneller.",
    "zahlen": "erste Minute 50 mm/s, danach 10 oder 25 mm/s",
    "seite": "PDF 3 (Buch 141)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "papier-raster",
    "text": "Zeitwert von 1 mm Papier je Vorschub (Tab. 10.3): 10 mm/s -> 0,1 s; 25 mm/s -> 0,04 s; 50 mm/s -> 0,02 s; 100 mm/s -> 0,01 s.",
    "zahlen": "1 mm = 0,1 s / 0,04 s / 0,02 s / 0,01 s bei 10 / 25 / 50 / 100 mm/s",
    "seite": "PDF 11 (Buch 149)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "papier-raster",
    "text": "Zeitwert von 150 mm (15 cm) Papier je Vorschub (Tab. 10.3): 10 mm/s -> 15 s; 25 mm/s -> 6 s; 50 mm/s -> 3 s; 100 mm/s -> 1,5 s.",
    "zahlen": "150 mm = 15 s / 6 s / 3 s / 1,5 s bei 10 / 25 / 50 / 100 mm/s",
    "seite": "PDF 11 (Buch 149)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "papier-raster",
    "text": "Um Papier zu sparen, kann der Vorschub nach der ersten Minute von 50 mm/s auf 10 oder 25 mm/s reduziert werden. Dieser Rhythmusstreifen macht Herzfrequenzaenderungen und Arrhythmien schneller erkennbar.",
    "zahlen": "erste Minute 50 mm/s, danach 10 oder 25 mm/s",
    "seite": "PDF 3 / Buch 141",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "papier-raster",
    "text": "Tab. 10.3 Rechenhilfe, Zeit pro Millimeter je Papiervorschub: 10 mm/s -> 1 mm = 0,1 s; 25 mm/s -> 0,04 s; 50 mm/s -> 0,02 s; 100 mm/s -> 0,01 s.",
    "zahlen": "1 mm = 0,1 / 0,04 / 0,02 / 0,01 s bei 10 / 25 / 50 / 100 mm/s",
    "seite": "PDF 11 / Buch 149",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "papier-raster",
    "text": "Tab. 10.3, Zeit fuer 150 mm (15 cm) Papier: 15 s bei 10 mm/s, 6 s bei 25 mm/s, 3 s bei 50 mm/s, 1,5 s bei 100 mm/s.",
    "zahlen": "150 mm = 15 / 6 / 3 / 1,5 s bei 10 / 25 / 50 / 100 mm/s",
    "seite": "PDF 11 / Buch 149",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "filter",
    "text": "Zur Vermeidung von Netzbrummen soll das EKG-Geraet am besten im Akkubetrieb benutzt werden; moderne Geraete bieten hierfuer zusaetzlich eine Filtermoeglichkeit.",
    "zahlen": "",
    "seite": "PDF 6 (Buch 144)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "filter",
    "text": "Eine zitternde Grundlinie kann leicht mit Vorhofflimmern verwechselt werden. Zum Ausschluss empfiehlt sich das Zuschalten eines Filters (AF- oder 50-Hz-Filter) oder Umstellung des Geraets von Netz- auf Batteriebetrieb.",
    "zahlen": "AF-Filter oder 50-Hz-Filter",
    "seite": "PDF 6 (Buch 144)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "filter",
    "text": "Filter sind grundsaetzlich nicht zu empfehlen: sie unterdruecken zwar Stoerungen, verkleinern aber gleichzeitig die P-QRS-T-Ausschlaege, sodass kleine P-Wellen unterdrueckt und nicht mehr sichtbar sein koennen.",
    "zahlen": "",
    "seite": "PDF 6 (Buch 144)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "filter",
    "text": "Bei unsauberer Grundliniendarstellung kann ein 50-Hz-Filter zugeschaltet werden; zusaetzlich sollte das Geraet geerdet werden, um Wechselstromartefakte zu vermeiden.",
    "zahlen": "50-Hz-Filter",
    "seite": "PDF 7 (Buch 145)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "filter",
    "text": "Eine undulierende (zitternde) Grundlinie entsteht durch elektrische Stoerungen wie ein 50-Hz-Wechselstromsignal (Geraet in der Steckdose ohne Filter, elektrisch versorgter Untersuchungstisch, Geraete in der Naehe) oder durch Muskelzittern bei im Stehen aufgezeichnetem EKG. Das EKG-Geraet sollte am besten im Akkubetrieb benutzt werden.",
    "zahlen": "50 Hz",
    "seite": "PDF 6 / Buch 144",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "filter",
    "text": "Eine zitternde Grundlinie als Artefakt kann leicht mit Vorhofflimmern verwechselt werden. Zum Ausschluss einen Filter (AF- oder 50-Hz-Filter) zuschalten oder das Geraet vom Netzstrom nehmen und auf Batteriebetrieb umstellen.",
    "zahlen": "AF-Filter, 50-Hz-Filter",
    "seite": "PDF 6 / Buch 144",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "filter",
    "text": "Filter sind grundsaetzlich nicht zu empfehlen: Sie unterdruecken zwar Stoerungen, haben aber gleichzeitig kleinere P-QRS-T-Ausschlaege zur Folge. Das kann dazu fuehren, dass kleine P-Wellen unterdrueckt und nicht sichtbar sind.",
    "zahlen": "",
    "seite": "PDF 6 / Buch 144",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "filter",
    "text": "Bei unsauberer Grundliniendarstellung kann ein 50-Hz-Filter zugeschaltet werden; zudem sollte das Geraet geerdet werden, um Wechselstromartefakte zu vermeiden.",
    "zahlen": "50 Hz",
    "seite": "PDF 7 / Buch 145",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "artefakte",
    "text": "Das Buch verwendet ausschliesslich unveraenderte Original-EKG ohne Bildbearbeitung; deshalb enthalten viele Kurven technische Artefakte oder solche durch Zittern und Bewegungen des Patienten. Die richtige Unterscheidung zwischen Artefakt und pathologisch veraendertem EKG wird als der schwierigste Punkt der Interpretation bezeichnet, weil Patienten nicht kooperieren.",
    "zahlen": "",
    "seite": "PDF-Seiten 7-8 (Buchseiten VI-VII, Vorwort)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "artefakte",
    "text": "Grundlinienschwankungen und Artefakte koennen die P-Wellen maskieren und ein Vorhofflimmern oder Vorhofflattern vortaeuschen. Ein Fall mit Sinusrhythmus 140 bpm wurde nur dadurch richtig erkannt, dass an anderen Stellen des Streifens doch klare positive P-Wellen sichtbar waren.",
    "zahlen": "HF 140 bpm",
    "seite": "PDF 3 (gedruckt 92)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "artefakte",
    "text": "Vier Massnahmen gegen Artefakte, die das Buch bei zweifelhaftem Streifen empfiehlt: Zittern bzw. Bewegungen des Patienten waehrend der Aufzeichnung verhindern; andere Abschnitte des Streifens auf vorhandene P-Wellen absuchen; alle Geraete, die Interferenzen verursachen koennen, entfernen oder ausstecken; durch klinische Untersuchung pruefen, ob Pulsdefizite oder ein abnormer Auskultationsbefund fuer Vorhofflimmern sprechen.",
    "zahlen": "",
    "seite": "PDF 3 (gedruckt 92)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "artefakte",
    "text": "In demselben Streifen waren abschnittsweise Artefakte zu erkennen, die das Buch ausdruecklich als nicht mit Arrhythmien zu verwechseln kennzeichnet. Die Befundtabelle traegt \"Artefakte\" als eigenen Eintrag in der Zeile Sonstiges - ein Artefaktvermerk gehoert also in den Befund.",
    "zahlen": "HF 40 bpm; P 0,04 s x 0,2 mV; PR 0,14 s; QRS 0,04 s; R 1,0 mV; QT 0,22 s; ST normal; T normal",
    "seite": "PDF 21 (gedruckt 110)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "artefakte",
    "text": "Praktische Hilfsmittel zur Klaerung einer schnellen Tachykardie: Frequenzsenkung durch ein Vagusmanoever mittels Bulbusdruck und Untersuchung aller EKG-Ableitungen statt nur einer.",
    "zahlen": "",
    "seite": "PDF-S. 8 (Buchseite 196), Fall 31",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "artefakte",
    "text": "Artefakte im EKG koennen leicht mit Arrhythmien oder mit verzerrten T-Wellen verwechselt werden. Sie sind extrinsische Aktivitaet, die nichts mit der elektrischen Herzaktivitaet zu tun hat.",
    "zahlen": "",
    "seite": "PDF 35 (Buch 124)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "artefakte",
    "text": "Zwei genannte Ursachen von Artefakten: Bewegungen des Patienten waehrend der Aufzeichnung, oder technische Bedingtheit.",
    "zahlen": "",
    "seite": "PDF 35 (Buch 124)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "artefakte",
    "text": "Pruefbare Abgrenzung Artefakt gegen Arrhythmie: sieht man von den scheinbar veraenderten T-Wellen ab, stellen sich die Komplexe normal dar, wiederholen sich in perfekter Regelmaessigkeit, und es liegen keine kompensatorischen Pausen nach den T-Wellen vor. Fehlt die kompensatorische Pause und bleibt der Abstand regelmaessig, handelt es sich um einen Artefakt und nicht um eine Extrasystole.",
    "zahlen": "keine kompensatorische Pause + regelmaessige RR-Abstaende = Artefakt",
    "seite": "PDF 35 (Buch 124)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "artefakte",
    "text": "Multiple Artefakte um die Grundlinie erschweren die eindeutige Beurteilung der P-Wellen; die Sinuskomplexe mit positiven P-Wellen bleiben dabei klar erkennbar. Ein Auswerter sollte P-Wellen bei unruhiger Grundlinie also als eingeschraenkt beurteilbar kennzeichnen statt als fehlend.",
    "zahlen": "",
    "seite": "PDF 24 (Buch 212)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "artefakte",
    "text": "Bewegungen und Myoklonien des Patienten erzeugen Artefakte, die die Beurteilung der P-Wellen erschweren; der Autor beurteilt die P-Wellen trotzdem, indem er feststellt, dass sie die Normwerte praktisch nie uebersteigen. Ein Auswerter sollte in einem solchen Fall also eine abgestufte Aussage zulassen statt nur bestimmbar/nicht bestimmbar.",
    "zahlen": "",
    "seite": "PDF 44 (Buch 232)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "artefakte",
    "text": "Lagerungspruefung Roentgen: in der Seitaufnahme muessen die Rippen parallel verlaufen und die Rippenknie duerfen nicht ueber die Wirbelsaeule hinausragen - eine verdrehte Aufnahme taeuscht Abrundung des Herzens und Kardiomegalie vor. In der DV/VD-Aufnahme sollen die Dornfortsaetze die Sternebrae ueberlagern; Verkippung taeuscht eine links- oder rechtsseitige Kardiomegalie vor.",
    "zahlen": "",
    "seite": "PDF 61 = Buch 61",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "artefakte",
    "text": "Artefakte der invasiven Druckmessung: zu weiche Katheter, zu schmales Katheterlumen und kleine Luftblasen daempfen die Kurve; lange Verbindungsschlaeuche erzeugen Schleuderzacken. Deshalb duerfen nicht nur die Zahlen, sondern muss auch die Kurvenform beurteilt werden.",
    "zahlen": "",
    "seite": "PDF 76 = Buch 76",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "artefakte",
    "text": "Katheterirritation am Endokard (besonders in der rechten Ausflussbahn) loest haeufig supraventrikulaere oder ventrikulaere Extrasystolen bzw. transiente Salven aus; auch waehrend der Kontrastinjektion treten einzelne Extrasystolen auf. Schwerwiegend sind Vorhof- oder Kammerflimmern, die oft nur durch elektrische Defibrillation zu beenden sind.",
    "zahlen": "",
    "seite": "PDF 76/78 = Buch 76/78",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "artefakte",
    "text": "Dopplerwinkel-Fehler: je groesser der Winkel alpha zwischen Schallstrahl und Blutfluss, desto kleiner die messbare Frequenzverschiebung - die Geschwindigkeit wird unterschaetzt, wenn der Schallstrahl nicht parallel zum Blutfluss laeuft. In der Praxis werden Winkelabweichungen unter 20 Grad toleriert.",
    "zahlen": "Winkelabweichung < 20 Grad tolerierbar",
    "seite": "PDF 87 = Buch 87",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "artefakte",
    "text": "Nyquistgrenze und Aliasing beim PW-Doppler: die messbare Geschwindigkeit liegt im Schnitt bei 1,5-2 m/s; wird sie ueberschritten, erscheint das abgeschnittene Kurvenende auf der anderen Seite der Basislinie, eine Quantifizierung und Richtungsbestimmung ist dann nicht mehr moeglich. Bedingung: Nyquistgrenze = PRF >= 2 x Fd (Dopplerfrequenz ohne Aliasing).",
    "zahlen": "Nyquistgrenze im Schnitt 1,5-2 m/s; PRF >= 2 x Fd",
    "seite": "PDF 89 = Buch 89",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "artefakte",
    "text": "Haeufiger TM-Mode-Messfehler: wird statt der Ebene unterhalb der Mitralklappensegel und zwischen den Papillarmuskeln versehentlich Papillarmuskelgewebe angeschnitten und mitvermessen, entstehen Fehlmessungen bis hin zur kompletten diagnostischen Fehleinschaetzung.",
    "zahlen": "",
    "seite": "PDF 86 = Buch 86",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "artefakte",
    "text": "Beispiel P pulmonale: Hund mit ueberhoehten P-Wellen bis 0,5 mV in Abl. II bei unauffaelliger P-Dauer, PQ-Senkung von 0,15 bis 0,2 mV, Sinustachykardie HF 180/min. Als Artefakt sind Muskelpotenziale in der Nulllinie beschrieben, besonders vor dem 2. und 3. EKG-Komplex.",
    "zahlen": "P 0,5 mV; PQ-Senkung 0,15-0,2 mV; HF 180/min; 25 mm/s; 1 cm = 1 mV",
    "seite": "28",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "artefakte",
    "text": "Echo-Artefakte und ihre Erkennungsmerkmale: Schallschatten (schwarzer Bereich distal eines total reflektierenden Gewebes, haeufigste Ursache sind die Rippen), Reverberations-/Spiegelartefakte (gleichartig bewegte Pseudostruktur in doppelter Tiefe, haeufig diaphragmanah), Uebersteuerung des gain und falscher Fokus (verfaelschen die Thrombus- und Smoke-Diagnostik im Nahfeld), Querartefakte durch Lautaeusserungen winselnder Welpen oder miauender Katzen.",
    "zahlen": "Spiegelartefakt in doppelter Tiefe",
    "seite": "PDF 101-102 = Buchseite 101-102",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "artefakte",
    "text": "Im TM-Mode fuehrt ein schraeges Anschneiden zur Ueberschaetzung ALLER Parameter (z. B. Wandstaerken und linksventrikulaerer Diameter). Papillarmuskeln und verdickte Chordae-tendineae-Anteile duerfen nicht zur Wandstaerke addiert werden; ohne eindeutige Endokarddefinition soll gar nicht gemessen werden.",
    "zahlen": "",
    "seite": "PDF 102-103 = Buchseite 102-103",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "artefakte",
    "text": "Erreichen der Nyquistgrenze kappt die Amplitude des Flusssignals, die Kurvenspitze erscheint am oberen Bildrand; korrigiert wird durch Verschiebung der Null-Linie. Systolische Klicks und angeschnittene aortale Ausstromsignale werden haeufig faelschlich als mitrales Regurgitationssignal gedeutet.",
    "zahlen": "",
    "seite": "PDF 102-103 = Buchseite 102-103",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "artefakte",
    "text": "Nach dem Anbringen werden Elektroden, Kabel und Rekorder mit einem Polsterverband oder einer passgerechten Weste fixiert. Die Kabel muessen dem Thorax fest anliegen, sonst entstehen Bewegungsartefakte und Kontaktverluste der Elektroden.",
    "zahlen": "",
    "seite": "PDF-Seite 1 (Buchseite 179), Abb. 11.1b",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "artefakte",
    "text": "Wird auf einem elektrisch versorgten Behandlungstisch geschrieben, soll der Patient zur Artefaktvermeidung auf einer Gummimatte liegen.",
    "zahlen": "",
    "seite": "PDF 1 (Buch 139)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "artefakte",
    "text": "Vor der Auswertung ist das EKG zuerst auf das Vorliegen von Artefakten zu pruefen.",
    "zahlen": "",
    "seite": "PDF 3 (Buch 141)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "artefakte",
    "text": "Zu starke Ausschlaege entstehen haeufig durch Gliedmassenbewegungen; diese Artefakte aehneln manchmal ventrikulaeren Extrasystolen. Ploetzliche Gliedmassenbewegungen waehrend der Aufzeichnung sind deshalb immer mit dem Schreiberbild zu vergleichen.",
    "zahlen": "",
    "seite": "PDF 3 (Buch 141)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "artefakte",
    "text": "Ein Bewegungsartefakt einer einzelnen Gliedmasse ist nie in allen 3 Ableitungen gleichzeitig zu sehen. Das unterscheidet es von Extrasystolen, die in allen Ableitungen erscheinen.",
    "zahlen": "Pruefbedingung: Stoerung in < 3 Einthoven-Ableitungen -> Artefakt",
    "seite": "PDF 5-6 (Buch 143-144)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "artefakte",
    "text": "Sind die P-QRS-T-Ausschlaege kaum sichtbar, ist zuerst die Eichung (1 cm = 1 mV) zu kontrollieren; zweite Ursache ist eine schlechte Ankopplung der Elektroden, gegen die erneutes Befeuchten mit Alkohol oder Kontaktgel hilft.",
    "zahlen": "Eichung 1 cm = 1 mV",
    "seite": "PDF 6 (Buch 144)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "artefakte",
    "text": "Eine undulierende Grundlinie entsteht durch elektrische Stoerungen wie ein 50-Hz-Wechselstromsignal (Geraet in der Steckdose ohne Filter, elektrisch versorgter Untersuchungstisch, Geraete in der Naehe) oder durch Muskelzittern bei einem im Stehen aufgezeichneten EKG.",
    "zahlen": "50 Hz Wechselstrom",
    "seite": "PDF 6 (Buch 144)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "artefakte",
    "text": "Grobe Schwankungen der Grundlinie sind fast immer Folge starker Atembewegungen bzw. Hechelns. Abhilfe: Fang zuhalten oder die Elektroden weiter distal an den Extremitaeten anbringen.",
    "zahlen": "",
    "seite": "PDF 7 (Buch 145)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "artefakte",
    "text": "Eine verdrehte Orientierung von P-QRS-T entsteht haeufig durch Vertauschen der Extremitaetenelektroden oder Ueberkreuzen der Beine. Negative P-Wellen in den Einthoven-Ableitungen sind fast immer ein sicherer Hinweis auf eine Elektrodenverwechslung.",
    "zahlen": "Pruefbedingung: negative P in Einthoven I/II/III -> Elektrodenverwechslung",
    "seite": "PDF 7 (Buch 145)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "artefakte",
    "text": "Ploetzliche kurzfristige Stoerungen im Hochfrequenzbereich treten fast nur bei Einsatz von Hochfrequenzinstrumenten in der Chirurgie (Elektrokauter) auf; bei Netzbetrieb oder PC-EKG helfen schuetzende Spannungsfilter im Stromkreis.",
    "zahlen": "",
    "seite": "PDF 7 (Buch 145)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "artefakte",
    "text": "PC-EKGs mit drahtloser Uebertragung vom Patienten zum Server werden haeufig durch andere Geraete, insbesondere Mobiltelefone, gestoert.",
    "zahlen": "",
    "seite": "PDF 7 (Buch 145)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "artefakte",
    "text": "Praxistipp: Manche ST-Streckenveraenderungen sind Artefakte der Nulllinie - vor der Bewertung einer ST-Abweichung muss die Grundlinie geprueft werden.",
    "zahlen": "",
    "seite": "PDF 38 (Buch 176)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "artefakte",
    "text": "Abb. 11.1: Die kraniale Elektrode gehoert hinter den Ellbogen in einen Bereich, in dem beim Laufen moeglichst keine Hautbewegung auftritt - Bewegungsartefakte entstehen sonst genau dort.",
    "zahlen": "",
    "seite": "PDF 43 (Buch 179)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "artefakte",
    "text": "Wird das EKG auf einem elektrisch versorgten Behandlungstisch angefertigt, soll der Patient zur Artefaktvermeidung auf einer Gummimatte liegen.",
    "zahlen": "",
    "seite": "PDF 1 / Buch 139",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "artefakte",
    "text": "Bevor das EKG ausgewertet wird, ist es zunaechst auf das Vorliegen von Artefakten zu ueberpruefen.",
    "zahlen": "",
    "seite": "PDF 3 / Buch 141",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "artefakte",
    "text": "Wird nur eine Gliedmasse bewegt, ist das Artefakt nie in allen Ableitungen zu sehen. Im Gegensatz zu Extrasystolen sind Bewegungsartefakte einzelner Gliedmassen nie in allen 3 Ableitungen gleichzeitig sichtbar.",
    "zahlen": "nie in allen 3 Ableitungen gleichzeitig",
    "seite": "PDF 5-6 / Buch 143-144",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "artefakte",
    "text": "Grobe Schwankungen der Grundlinie sind fast immer Folge starker Atembewegungen bzw. Hechelns. Abhilfe: Hecheln durch Zuhalten des Fanges unterdruecken oder die Elektroden weiter distal an den Extremitaeten anbringen.",
    "zahlen": "",
    "seite": "PDF 7 / Buch 145",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "artefakte",
    "text": "Ein haeufiger Fehler ist das Vertauschen von Elektroden an den Extremitaeten oder ein Ueberkreuzen der Beine. Negative P-Wellen in den Einthoven-Ableitungen sind fast immer ein sicherer Hinweis auf eine Elektrodenverwechslung.",
    "zahlen": "negative P in I/II/III = Verdacht Elektrodentausch",
    "seite": "PDF 7 / Buch 145",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "artefakte",
    "text": "Praxistipp: Manche ST-Streckenveraenderungen sind Artefakte der Nulllinie.",
    "zahlen": "",
    "seite": "PDF 38 / Buch 176",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "artefakte",
    "text": "Ausdrueckliche Warnung der Autoren: Die in den Ultraschallbildern mitlaufenden EKG-Spuren korrespondieren nicht in allen Faellen mit dem echokardiografischen Befund (gilt auch fuer Kapitel 14 und 15). Ein im Echo-Standbild sichtbarer EKG-Streifen darf daher nicht als Rhythmusbefund verwertet werden.",
    "zahlen": "",
    "seite": "PDF 1 / Buch 95",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "artefakte",
    "text": "Haeufiger Anschallfehler 4K: Ankopplung einen Interkostalraum zu weit kaudal. Folge: reduzierter Blick auf die rechte Herzhaelfte, teils nur 2 Kammern (linker Vorhof und linke Kammer) sichtbar, rechtes Herz zu klein dargestellt. Korrektur: einen ICR weiter kranial.",
    "zahlen": "",
    "seite": "PDF 2 und 5 / Buch 96 und 99",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "artefakte",
    "text": "Anschallfehler inkorrekte Achse: erkennbar am nicht waagrecht stehenden Vorhofseptum; im linken Ventrikel ist die Herzspitze zu spitz und der Ventrikel zeigt nicht die typische Kastenform mit parallelen Waenden.",
    "zahlen": "",
    "seite": "PDF 5 / Buch 99",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "artefakte",
    "text": "Anschallfehler zu weit sternal: Herzspitze erscheint naeher am Schallkopf als die Herzbasis, Vorhoefe liegen im unteren Bildteil. Ursache ist zu flache Sondenhaltung (Kabel zeigt zum Untersucher); richtig zeigt das Kabel zum untenliegenden Ellbogen.",
    "zahlen": "",
    "seite": "PDF 5 / Buch 99",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "artefakte",
    "text": "Kurzachsenfehler: zu weit sternal angekoppelt zeigt nur die linke Ventrikelspitze; ein oval erscheinender LV bedeutet, die Ebene steht nicht 90 Grad zur Herzachse; zu weit kaudal angekoppelt kippt die Papillarmuskeldarstellung. In der Mitralklappenebene gibt es kaum Fehlerquellen.",
    "zahlen": "",
    "seite": "PDF 17 / Buch 111",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "artefakte",
    "text": "Kurzachsenfehler Herzbasis: Wenn die Aorta waehrend des Herzzyklus ihre Form veraendert (oval bis eifoermig), fehlt Rotation gegen den Uhrzeigersinn oder der Schallkopf ist verkippt.",
    "zahlen": "15 Grad fehlende Rotation gegen den Uhrzeigersinn",
    "seite": "PDF 17 / Buch 111",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "artefakte",
    "text": "Kurzachsenfehler Pulmonalarterie: Ist die Bifurkation nicht einsehbar, ist der Schallkopf zu weit dorsal angekoppelt; er muss weiter zum Sternum gefuehrt und die Ebene nach kranial gekippt werden. Sonst kann das linke Aurikel mit Pulmonalarterienanteilen verwechselt werden.",
    "zahlen": "",
    "seite": "PDF 17-18 / Buch 111-112",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "artefakte",
    "text": "Fehler links apikal: zu weit kaudal angekoppelt reduziert den Blick auf das rechte Herz (teils nur 2 Kammern) - Korrektur ein ICR weiter kranial; zu kraniale und dorsale Ankopplung ohne Kippung zur Wirbelsaeule laesst die Vorhoefe verschwinden (parasternaler statt apikaler Schnitt); zu weit vom Sternum entfernt (dorsal) erscheint der LV verkuerzt und die Herzspitze liegt nicht in der Bildmitte.",
    "zahlen": "",
    "seite": "PDF 21-22 / Buch 115-116",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "messgroessen",
    "text": "Die Herzfrequenz ist definiert als Anzahl der Herzschlaege pro Minute; die Einheit wird im Buch durchgaengig bpm (beats per minute) geschrieben.",
    "zahlen": "Einheit bpm = Schlaege/min",
    "seite": "PDF-Seite 15 (Buchseite 2); Abkuerzungsverzeichnis PDF-Seite 11 (Buchseite X)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Bedienung des EKG-Lineals: das Lineal wird mit dem Pfeil genau an der ersten R-Zacke angelegt, die Herzfrequenz wird als die Zahl abgelesen, die auf Hoehe der naechsten (zweiten) R-Zacke steht. Im Buchbeispiel ergibt das 75 bpm.",
    "zahlen": "Beispielablesung 75 bpm",
    "seite": "PDF-Seite 20 (Buchseite 7), Text und Bildunterschrift Abb. 4/5",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Das EKG-Lineal (Ablesung aus einem einzigen RR-Intervall) ist ausdruecklich nur bei regelmaessigem Herzrhythmus zulaessig. Andernfalls muessen mehrere RR-Intervalle gemessen und daraus das arithmetische Mittel gebildet werden.",
    "zahlen": "",
    "seite": "PDF-Seite 20 (Buchseite 7)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Messregel P-Dauer: die Breite wird innen an der Kurve gemessen, beginnend mit dem Abheben von der isoelektrischen Linie (in der Regel positiv in Ableitung II) bis zu der Stelle, an der die Kurve wieder zur Grundlinie zurueckkehrt. Angabe in Sekunden.",
    "zahlen": "innen an der Kurve, Ableitung II, Einheit s",
    "seite": "PDF 27 (Buch 14), Abb.12a",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Messregel P-Amplitude: in Ableitung II von der isoelektrischen Linie bis zum hoechsten Punkt der Kurve, und zwar sowohl bei positiven als auch bei negativen Wellen. Angabe in Millivolt.",
    "zahlen": "Ableitung II, Betrag, Einheit mV",
    "seite": "PDF 27 (Buch 14), Abb.12a",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Messregel QRS-Dauer: von Beginn der Q-Zacke an - falls keine Q-Zacke vorhanden, von der ersten Abweichung von der Grundlinie an - bis zum Ende der S-Zacke; fehlt die S-Zacke, bis zum Ende der R-Zacke. Angabe in Sekunden.",
    "zahlen": "Einheit s",
    "seite": "PDF 29 (Buch 16), Abb.14a",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Messregel QRS-Amplituden: von der Grundlinie bis zum jeweils hoechsten Punkt, egal ob positiv oder negativ, in Millivolt. In der Regel wird nur die R-Zacke gemessen; Q- und S-Zacken muessen nur als Kriterien einer Rechtsherzvergroesserung beruecksichtigt werden.",
    "zahlen": "Einheit mV; Q und S nur fuer Rechtsherz-Kriterien noetig",
    "seite": "PDF 29 (Buch 16), Abb.14a",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Messregel T-Amplitude: von der isoelektrischen Linie bis zum hoechsten Punkt, egal ob positiv oder negativ, in Millivolt. Grenzwert: die T-Welle soll 25 % der R-Hoehe nicht uebersteigen.",
    "zahlen": "T-Amplitude <= 25 % der R-Amplitude",
    "seite": "PDF 30 (Buch 17), Abb.15",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Messregel PR-Intervall: vom Beginn der P-Welle bis zum Beginn der Q-Zacke; korrekterweise waere die Bezeichnung PQ-Dauer. Ist keine Q-Zacke vorhanden, wird bis zum Beginn der R-Zacke gemessen. Das Intervall beschreibt die Zeit, die der Impuls braucht, um den gesamten supraventrikulaeren Anteil zu durchlaufen (Sinusknoten bis AV-Knoten).",
    "zahlen": "",
    "seite": "PDF 31 (Buch 18), Abb.17",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Messregel QT-Intervall: vom Beginn der Q-Zacke - bzw. der R-Zacke, falls Q fehlt - bis zum Ende der T-Welle. Es umfasst die gesamte De- und Repolarisation der Ventrikel und entspricht der Kammersystole.",
    "zahlen": "",
    "seite": "PDF 31 (Buch 18), Abb.18",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Messregel ST-Strecke: sie ist das Intervall zwischen dem Ende des QRS-Komplexes und dem Beginn der T-Welle und soll auf der Grundlinie liegen. Gemessen wird die positive oder negative Abweichung von der isoelektrischen Linie (Hebung oder Senkung), Angabe in Millivolt.",
    "zahlen": "Einheit mV, Bezug isoelektrische Linie",
    "seite": "PDF 32 (Buch 19)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Normales PR-Intervall Hund laut Normwerttabelle: 0,06-0,13 s.",
    "zahlen": "PR 0,06-0,13 s",
    "seite": "PDF 2 (gedruckt 91)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Messwerte Fall 28: Achse -53 Grad, P 0,04 s x 0,2 mV, PR 0,10 s, QRS 0,06 s, R 1,2 mV, QT 0,22 s, ST normal, T groesser 25 % der R-Hoehe.",
    "zahlen": "Achse -53 Grad; P 0,04s x 0,2mV; PR 0,10s; QRS 0,06s; R 1,2mV; QT 0,22s; T > 25 % R",
    "seite": "PDF-S. 2 (Buchseite 190), Fall 28",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Messwerte Fall 29 (Pudel, 17 Jahre): normaler Sinusrhythmus, HF 160 bpm, P 0,04 s x 0,5 mV, PR 0,10 s, QRS 0,08 s, R 2,2 mV, QT 0,22 s, ST-Senkung 0,25 mV, T groesser 25 % der R-Hoehe, zusaetzlich Kerbung der R-Zacke.",
    "zahlen": "HF 160 bpm; P 0,04s x 0,5mV; PR 0,10s; QRS 0,08s; R 2,2mV; QT 0,22s; ST-Senkung 0,25mV",
    "seite": "PDF-S. 4 (Buchseite 192), Fall 29",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Messwerte Fall 30 (Belgischer Schaeferhund, 3 Jahre, Krampfanfaelle): HF 160 bpm, P 0,04 s x 0,35 mV, PR 0,08 s, QRS 0,04 s, R 0,6 mV, QT 0,18 s, ST normal, T groesser 25 % der R-Hoehe.",
    "zahlen": "HF 160 bpm; P 0,04s x 0,35mV; PR 0,08s; QRS 0,04s; R 0,6mV; QT 0,18s",
    "seite": "PDF-S. 6 (Buchseite 194), Fall 30",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Messwerte Fall 31 (Mischling, 9 Jahre): Grundrhythmus regulaer, HF 290 bpm, P-Welle und PR-Intervall nicht beurteilbar, QRS 0,1 s, R 1,5 mV, QT 0,2 s, ST-Senkung vorhanden aber nicht exakt bestimmbar, T groesser 25 % der R-Hoehe; als Besonderheit eine Kerbung im letzten Drittel des aufsteigenden Schenkels der R-Zacke.",
    "zahlen": "HF 290 bpm; QRS 0,1s; R 1,5mV; QT 0,2s",
    "seite": "PDF-S. 8 (Buchseite 196), Fall 31",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Messwerte Fall 32 (Samojede, 2 Jahre, nach Verkehrsunfall): Sinusrhythmus 80 bpm, P 0,04 s x 0,15 mV, PR 0,08 s, QRS 0,05 s, R 1,9 mV, QT 0,18 s, ST normal, T normal; als Besonderheit tiefe Q-Zacken.",
    "zahlen": "HF 80 bpm; P 0,04s x 0,15mV; PR 0,08s; QRS 0,05s; R 1,9mV; QT 0,18s",
    "seite": "PDF-S. 10 (Buchseite 198), Fall 32",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Messwerte Fall 33 (Pudel, 13 Jahre, systolisches Herzgeraeusch IV/VI): Sinusrhythmus mit SVES, HF 120 bpm, P 0,05 s x 0,2 mV, PR 0,10 s, QRS 0,05 s, R 1,5 mV, QT 0,22 s, ST normal, T normal.",
    "zahlen": "HF 120 bpm; P 0,05s x 0,2mV; PR 0,10s; QRS 0,05s; R 1,5mV; QT 0,22s",
    "seite": "PDF-S. 12 (Buchseite 200), Fall 33",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Messwerte Fall 34 (Dackel, 13 Jahre): respiratorische Sinusarrhythmie, HF 150 bpm, P 0,06 s x 0,6 mV, PR 0,1 s, QRS 0,08 s, R 1,8 mV, QT 0,21 s, ST-Senkung 0,25 mV, T groesser 25 % der R-Hoehe.",
    "zahlen": "HF 150 bpm; P 0,06s x 0,6mV; PR 0,1s; QRS 0,08s; R 1,8mV; QT 0,21s; ST-Senkung 0,25mV",
    "seite": "PDF-S. 14 (Buchseite 202), Fall 34",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Messwerte Fall 35 (Pudel, 13 Jahre): Vorhoftachykardie, HF 320 bpm, P-Welle und PR-Intervall nicht angebbar, QRS 0,05 s, R 2,6 mV, QT 0,15 s, ST normal, T normal; unter Sonstiges ist ausdruecklich \"Artefakte\" vermerkt.",
    "zahlen": "HF 320 bpm; QRS 0,05s; R 2,6mV; QT 0,15s",
    "seite": "PDF-S. 16 (Buchseite 204), Fall 35",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Messwerte Fall 36: HF 120 bpm, P 0,03 s x 0,15 mV, PR 0,08 s, QRS 0,05 s, R 0,8 mV, QT 0,17 s, ST normal, T normal.",
    "zahlen": "HF 120 bpm; P 0,03s x 0,15mV; PR 0,08s; QRS 0,05s; R 0,8mV; QT 0,17s",
    "seite": "PDF-S. 18 (Buchseite 206), Fall 36",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Messwerte Fall 37 (Deutsche Bracke, 9 Jahre): persistierender Vorhofstillstand, HF 80 bpm, keine P-Welle, kein PR-Intervall angebbar, QRS 0,06 s, R 1,6 mV, QT 0,24 s, ST-Hebung 0,2 mV, T groesser 25 % der R-Hoehe.",
    "zahlen": "HF 80 bpm; QRS 0,06s; R 1,6mV; QT 0,24s; ST-Hebung 0,2mV",
    "seite": "PDF-S. 20 (Buchseite 208), Fall 37",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Messwerte Fall 38 (Bretonischer Spaniel, 14 Jahre): atrioventrikulaere Tachykardie, HF 140 bpm, P 0,04 s x (-0,2) mV, PR 0,08 s, QRS 0,06 s, R 1,6 mV, QT 0,20 s, ST-Senkung 0,2 mV, T groesser 25 % der R-Hoehe.",
    "zahlen": "HF 140 bpm; P 0,04s x -0,2mV; PR 0,08s; QRS 0,06s; R 1,6mV; QT 0,20s; ST-Senkung 0,2mV",
    "seite": "PDF-S. 22 (Buchseite 210), Fall 38",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Normbereich des PR-Intervalls beim Hund. Der obere Grenzwert 0,13 s ist zugleich die Schwelle zum AV-Block I. Grades.",
    "zahlen": "PR 0,06-0,13 s",
    "seite": "PDF 28 (Buch 117), wiederholt auf allen Frageseiten",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Belegter Beispielbefund mit P-pulmonale und ueberhoehter T-Welle bei einem Hund. Brauchbar als Pruefdatensatz: P-Hoehe und T-Verhaeltnis liegen ueber Norm, alles andere im Normbereich.",
    "zahlen": "Normaler Sinusrhythmus; HF 130 bpm; P 0,04 s x 0,5 mV; PR 0,08 s; QRS 0,04 s; R 0,9 mV; QT 0,18 s; ST normal; T groesser 25 % der R-Hoehe",
    "seite": "PDF 27 (Buch 116)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Belegter Beispielbefund mit AV-Block I. Grades, ueberhoehter T-Welle und einer S-Zacke in Ableitung II. Das PR-Intervall schwankt und ueberschreitet dabei 0,13 s.",
    "zahlen": "Normaler Sinusrhythmus; HF 130 bpm; P 0,04 s x 0,2 mV; PR 0,12-0,14 s; QRS 0,06 s; R 0,6 mV; QT 0,2 s; ST normal mit diskreter Hebung im Normbereich; T groesser 25 % der R-Hoehe; S-Zacke -0,04 mV",
    "seite": "PDF 29 (Buch 118)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Belegter Beispielbefund einer respiratorischen Sinusarrhythmie ohne pathologische Messgroessen ausser der T-Welle.",
    "zahlen": "Respiratorische Sinusarrhythmie; HF 100 bpm; P 0,04 s x 0,2 mV; PR 0,12 s; QRS 0,05 s; R 1,0 mV; QT 0,20 s; ST normal; T groesser 25 % der R-Hoehe",
    "seite": "PDF 31 (Buch 120)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Belegter Beispielbefund mit inkonstantem P-pulmonale: die P-Wellen wechseln zwischen normaler und erhoehter Amplitude. Frequenz am obersten Rand des Normbereichs.",
    "zahlen": "Normaler Sinusrhythmus; HF 160 bpm; P 0,04 s x 0,5 mV; PR 0,12 s; QRS 0,05 s; R 1,1 mV; QT 0,18 s; ST normal; T normal",
    "seite": "PDF 33 (Buch 122)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Belegter Beispielbefund, in dem alle Messgroessen im Normbereich liegen und die sichtbaren Auffaelligkeiten Artefakte sind.",
    "zahlen": "Normaler Sinusrhythmus; HF 160 bpm; P 0,03 s x 0,15 mV; PR 0,07 s; QRS 0,04 s; R 1,5 mV; QT 0,16 s; ST normal; T normal",
    "seite": "PDF 35 (Buch 124)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Belegter Beispielbefund mit gleichzeitigem P-mitrale und P-pulmonale: die P-Welle ist mit 0,045 s breiter und mit 0,5 mV hoeher als die Norm.",
    "zahlen": "Normaler Sinusrhythmus; HF 160 bpm; P 0,045 s x 0,5 mV; PR 0,09 s; QRS 0,04 s; R 1,2 mV; QT 0,19 s; ST normal; T normal",
    "seite": "PDF 37 (Buch 126)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Belegter Beispielbefund einer Sinustachykardie mit verbreitertem P und verbreitertem QRS sowie tiefen Q-Zacken. QRS 0,065 s liegt knapp ueber der Norm von 0,06 s.",
    "zahlen": "Normaler Sinusrhythmus; HF 180 bpm; P 0,05 s x 0,4 mV; PR 0,10 s; QRS 0,065 s; R 1,5 mV; QT 0,20 s; ST normal; T normal; tiefe Q-Zacken",
    "seite": "PDF 39 (Buch 128)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Belegter Beispielbefund eines vollstaendig normalen EKG bei einem einjaehrigen Boxer mit Herzgeraeusch. R-Zacke 2,3 mV liegt unter der Grenze von 3 mV.",
    "zahlen": "Normaler Sinusrhythmus; HF 160 bpm; P 0,04 s x 0,3 mV; PR 0,08 s; QRS 0,06 s; R 2,3 mV; QT 0,18 s; ST normal; T normal",
    "seite": "PDF 41 (Buch 130)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Belegter Beispielbefund mit P-mitrale von 0,06 s, verbreiterten QRS-Komplexen und tiefen Q-Zacken.",
    "zahlen": "Normaler Sinusrhythmus; HF 160 bpm; P 0,06 s x 0,2 mV; PR 0,12 s; QRS 0,06 s; R 1,6 mV; QT 0,18 s; ST normal; T normal; tiefe Q-Zacken",
    "seite": "PDF 43 (Buch 132)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Belegter Beispielbefund mit Linksachsenabweichung, deutlicher ST-Senkung und ueberhoehter T-Welle bei Niereninsuffizienz. Einziger Fall im Bereich mit angegebener Herzachse.",
    "zahlen": "Respiratorische Sinusarrhythmie; HF 120 bpm; Achse -14 Grad; P 0,03 s x 0,15 mV; PR 0,10 s; QRS 0,04 s; R 1,1 mV; QT 0,18 s; ST-Senkung 0,4 mV; T groesser 25 % der R-Hoehe",
    "seite": "PDF 45 (Buch 134)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Belegter Beispielbefund mit verlaengertem QRS von 0,08 s, tiefen Q-Zacken ueber 0,5 mV, Mikroinfarkt-Einkerbungen der R-Zacke und ueberhoehter T-Welle.",
    "zahlen": "Sinusarrhythmie; HF 100 bpm; P 0,04 s x 0,2 mV; PR 0,12 s; QRS 0,08 s; R 1,1 mV; QT 0,20 s; ST normal; T groesser 25 % der R-Hoehe; tiefe Q-Zacken; Mikroinfarkt-Wellen",
    "seite": "PDF 47 (Buch 136)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Belegter Beispielbefund mit P-mitrale von 0,06 s und AV-Block I. Grades bei PR 0,14 s.",
    "zahlen": "Normaler Sinusrhythmus; HF 150 bpm; P 0,06 s x 0,35 mV; PR 0,14 s; QRS 0,06 s; R 1,7 mV; QT 0,18 s; ST normal; T normal; AV-Block I. Grades",
    "seite": "PDF 49 (Buch 138)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Belegter Beispielbefund eines Sinusrhythmus mit einer einzelnen ventrikulaeren Extrasystole; alle uebrigen Messgroessen im Normbereich.",
    "zahlen": "Sinusrhythmus mit VES; HF 110 bpm; P 0,04 s x 0,3 mV; PR 0,10 s; QRS 0,05 s; R 0,7 mV; QT 0,18 s; ST normal; T normal",
    "seite": "PDF 51 (Buch 140)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Fallbeispiel paroxysmale linksventrikulaere Tachykardie mit VES: gemessen wurden HF 170 bpm, P 0,04 s x 0,1 mV, PR 0,10 s, QRS 0,04 s, R 0,6-0,8 mV, QT 0,18 s, ST und T normal.",
    "zahlen": "170 bpm; P 0,04 s x 0,1 mV; PR 0,10 s; QRS 0,04 s; R 0,6-0,8 mV; QT 0,18 s",
    "seite": "PDF 24 (Buch 212)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Fallbeispiel supraventrikulaere Tachykardie: HF 210 bpm, P-Welle und PR-Intervall nicht bestimmbar, QRS 0,07 s, R 2,7 mV, QT 0,17 s, ST und T normal.",
    "zahlen": "210 bpm; QRS 0,07 s; R 2,7 mV; QT 0,17 s",
    "seite": "PDF 26 (Buch 214)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Fallbeispiel AV-Block III: HF 60 bpm, P 0,04 s x 0,2 mV, PR nicht zu beurteilen, QRS 0,10 s (ueber der Norm), R 1,1 mV, QT 0,28 s (ueber der Norm), ST und T normal, Sonstiges atrioventrikulaerer Ersatzrhythmus.",
    "zahlen": "60 bpm; P 0,04 s x 0,2 mV; QRS 0,10 s; R 1,1 mV; QT 0,28 s",
    "seite": "PDF 28 (Buch 216)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Fallbeispiel Sinusarrhythmie mit ST-Senkung: HF 100 bpm, P 0,04 s x 0,3 mV, PR 0,10 s, QRS 0,05 s, R 1,5 mV, QT 0,24 s, ST-Senkung 0,3 mV, T groesser 25 % der R-Hoehe.",
    "zahlen": "100 bpm; P 0,04 s x 0,3 mV; PR 0,10 s; QRS 0,05 s; R 1,5 mV; QT 0,24 s; ST -0,3 mV",
    "seite": "PDF 30 (Buch 218)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Fallbeispiel Sinustachykardie mit P-mitrale und P-pulmonale: HF 200 bpm, P 0,045 s x 0,6 mV (Breite und Hoehe ueber der Norm), PR 0,06 s, QRS 0,05 s, R 1,4 mV, QT 0,18 s, ST-Senkung 0,5 mV, T groesser 25 % der R-Hoehe.",
    "zahlen": "200 bpm; P 0,045 s x 0,6 mV; PR 0,06 s; QRS 0,05 s; R 1,4 mV; QT 0,18 s; ST -0,5 mV",
    "seite": "PDF 32 (Buch 220)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Fallbeispiel Sinusrhythmus mit VES im Bigeminus: HF 100 bpm, P 0,04 s x 0,2 mV, PR 0,09 s, QRS 0,05 s, R 1,4 mV, QT 0,22 s, ST-Strecke -0,25 mV, T normal.",
    "zahlen": "100 bpm; P 0,04 s x 0,2 mV; PR 0,09 s; QRS 0,05 s; R 1,4 mV; QT 0,22 s; ST -0,25 mV",
    "seite": "PDF 34 (Buch 222)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Fallbeispiel Vorhoftachykardie: HF 220 bpm, P-Welle und PR-Intervall nicht bestimmbar, QRS 0,10 s, R 1,6 mV, QT 0,20 s, ST-Senkung 0,4 mV, T groesser 25 % der R-Hoehe.",
    "zahlen": "220 bpm; QRS 0,10 s; R 1,6 mV; QT 0,20 s; ST -0,4 mV",
    "seite": "PDF 36 (Buch 224)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Fallbeispiel respiratorische Sinusarrhythmie mit wanderndem Schrittmacher: HF 110 bpm, P 0,04 s x 0,2 mV, PR variabel 0,14-0,16 s (ueber der Norm von 0,06-0,13 s), QRS 0,05 s, R 1,8 mV, QT 0,20 s, ST und T normal; Sonstiges: wandernder Schrittmacher Typ A, tiefe Q-Zacken, AV-Block I.",
    "zahlen": "110 bpm; PR variabel 0,14-0,16 s; QRS 0,05 s; R 1,8 mV; QT 0,20 s",
    "seite": "PDF 38 (Buch 226)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Fallbeispiel persistierender Vorhofstillstand: HF 50 bpm, P-Welle und PR-Intervall nicht zu beurteilen, QRS 0,04 s, R 1,0 mV, QT 0,28 s (ueber der Norm), ST normal, T groesser 25 % der R-Hoehe.",
    "zahlen": "50 bpm; QRS 0,04 s; R 1,0 mV; QT 0,28 s",
    "seite": "PDF 40 (Buch 228)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Fallbeispiel Sinusrhythmus mit SVES und Vorhoftachykardie: HF 180 bpm, P 0,04 s x 0,2 mV, PR 0,10 s, QRS 0,04 s, R 1,5 mV, QT 0,18 s, ST und T normal.",
    "zahlen": "180 bpm; P 0,04 s x 0,2 mV; PR 0,10 s; QRS 0,04 s; R 1,5 mV; QT 0,18 s",
    "seite": "PDF 42 (Buch 230)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Fallbeispiel persistierende Sinustachykardie mit tiefen Q-Zacken: HF 200 bpm, P 0,04 s x 0,4 mV, PR 0,10 s, QRS 0,07 s (deutlich ueber dem Referenzmaximum fuer Hunde), R 1,4 mV, QT 0,17 s, ST-Senkung gering und noch im Normbereich, T-Wellen ueberhoeht (groesser 25 % der R-Hoehe).",
    "zahlen": "200 bpm; P 0,04 s x 0,4 mV; PR 0,10 s; QRS 0,07 s; R 1,4 mV; QT 0,17 s; Q -1,2 mV",
    "seite": "PDF 44 (Buch 232)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Fallbeispiel Sinusarrhythmie mit isolierten monofokalen linksventrikulaeren VES: HF 100 bpm, P 0,04 s x 0,4 mV, PR 0,10 s, QRS 0,04 s, R 0,9 mV, QT 0,20 s, ST und T normal.",
    "zahlen": "100 bpm; P 0,04 s x 0,4 mV; PR 0,10 s; QRS 0,04 s; R 0,9 mV; QT 0,20 s",
    "seite": "PDF 46 (Buch 234)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "messgroessen",
    "text": "Herzkatheter-Druckmessung: Nullpunkt-Kalibration des Drucksystems auf Hoehe des Sternums bei seitlicher Lagerung des Patienten; alle haemodynamischen Messungen vor der Angiographie durchfuehren.",
    "zahlen": "",
    "seite": "PDF 76 = Buch 76",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "messgroessen",
    "text": "Deutung intrakardialer Druckkurven: systolische Ventrikeldruckerhoehung MIT Gradient ueber die Ausflussbahn spricht fuer eine Stenose, OHNE Gradient fuer pulmonale bzw. systemische Hypertension; eine enddiastolische Ventrikeldruckerhoehung ist Folge schwerer Herzinsuffizienz, Volumenbelastung oder diastolischer Funktionsstoerung.",
    "zahlen": "",
    "seite": "PDF 76 = Buch 76",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "messgroessen",
    "text": "Vorhofdruckkurve: A-Welle mit der Vorhofkontraktion, V-Welle mit der Ventrikelkontraktion. Hohe A-Welle bei AV-Klappenstenose und Compliance-Minderung des Ventrikels, prominente V-Welle bei AV-Klappeninsuffizienz; der pulmonale Wedge-Druck ist ein indirektes Mass fuer den linken Vorhofdruck.",
    "zahlen": "",
    "seite": "PDF 76 = Buch 76",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "messgroessen",
    "text": "Beispielmessung bei Pulmonal- und Trikuspidalklappenstenose (Hund): systolischer Rueckzugsgradient Pulmonalarterie 25 mmHg gegen rechten Ventrikel 64 mmHg; enddiastolischer Druck im rechten Ventrikel auf 15 mmHg erhoeht; im rechten Vorhof a-Welle 20 mmHg, v-Welle 17 mmHg, Mitteldruck 15 mmHg.",
    "zahlen": "PA 25 mmHg vs. RV 64 mmHg; RVEDP 15 mmHg; RA a 20 / v 17 / mittel 15 mmHg",
    "seite": "PDF 77 = Buch 77",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "messgroessen",
    "text": "Nachweisgrenze der Shuntquantifizierung per Oximetrie: nur verwertbar, wenn der Anstieg des Sauerstoffgehalts mindestens 5 % betraegt; daraus ergibt sich ein minimal detektierbares Shuntvolumen von etwa 20 % des zirkulierenden Volumens.",
    "zahlen": "O2-Anstieg >= 5 %; Shuntvolumen >= ca. 20 %",
    "seite": "PDF 78 = Buch 78",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "messgroessen",
    "text": "Thermodilution zur Bestimmung der Herzleistung: 3-5 ml raumtemperierte oder gekuehlte 0,9 % NaCl- bzw. 5 % Dextroseloesung ueber eine Seitenoeffnung, Berechnung aus katheterabhaengiger Konstante, Injektatvolumen und -temperatur sowie Flaeche unter der Temperaturverlaufskurve; zur Genauigkeit werden 3 bis 7 konsekutive Messungen gemittelt (Beispiel: Mittelwert 1,7 l/min aus 6 Messungen).",
    "zahlen": "3-5 ml Injektat; 3-7 Messungen mitteln; Beispiel CO 1,7 l/min",
    "seite": "PDF 77/78 = Buch 77/78",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "messgroessen",
    "text": "Jedes EKG soll manuell ausgewertet werden, Zirkel oder EKG-Lineal sind hilfreich. Die kleinste messbare Einheit betraegt 0,5 mm; entsprechend werden die Werte auf 0,5 mm gerundet, das sind 0,01 s bzw. 0,05 mV.",
    "zahlen": "kleinste Einheit 0,5 mm = 0,01 s = 0,05 mV",
    "seite": "23",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "messgroessen",
    "text": "Ausgewertet werden die Mittelwerte aus fuenf kompletten Herzaktionen derselben Atemphase, und zwar aus dem mit 50 mm/s geschriebenen Abschnitt.",
    "zahlen": "5 Herzaktionen, 50 mm/s, gleiche Atemphase",
    "seite": "23",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "messgroessen",
    "text": "Die Amplituden (mV) von P-Wellen, QRS-Komplexen und T-Wellen werden in allen Ableitungen gemessen. P-Dauer, QRS-Dauer sowie PQ- und QT-Intervall werden hauptsaechlich in Ableitung II erfasst; nur wenn deren Qualitaet keine genaue Beurteilung zulaesst, wird eine andere Extremitaetenableitung genommen.",
    "zahlen": "Amplituden: alle Ableitungen; Zeiten: Abl. II",
    "seite": "23",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "messgroessen",
    "text": "Wenn Vorhof- und Kammererregungen mit unterschiedlicher Haeufigkeit auftreten (z. B. bei hoehergradigem AV-Block), muessen Vorhof- und Kammerfrequenz getrennt voneinander bestimmt werden.",
    "zahlen": "",
    "seite": "23",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "messgroessen",
    "text": "Die PQ-Dauer liegt zwischen dem Beginn der P-Welle und dem Beginn des Kammerkomplexes; bei fehlenden Q-Zacken spricht man von PR-Dauer bzw. PR-Intervall. Sie entspricht der atrioventrikulaeren Ueberleitungszeit. Je hoeher die Herzfrequenz, desto kuerzer die PQ-Dauer, bei von Komplex zu Komplex relativ konstantem Intervall.",
    "zahlen": "",
    "seite": "36",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "messgroessen",
    "text": "Die linksventrikulaere Prae-Ejektionszeit (PEP) ist definiert als Zeitintervall vom Beginn des QRS-Komplexes im EKG bis zur Oeffnung der Aortenklappen im TM-Mode. Die linksventrikulaere Auswurfzeit (LVET) reicht von der Aortenklappenoeffnung bis zu ihrem Schluss.",
    "zahlen": "",
    "seite": "PDF 98 = Buchseite 98",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "messgroessen",
    "text": "Die LVET ist herzfrequenzabhaengig: sie steigt bei Frequenzsenkung und faellt bei Frequenzsteigerung. Erhoehte Nachlast laesst PEP und LVET steigen, erhoehte Vorlast senkt die PEP und verlaengert die LVET.",
    "zahlen": "",
    "seite": "PDF 98 = Buchseite 98",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "messgroessen",
    "text": "Zeitliche Abgrenzung der Diastole ueber das EKG: sie reicht vom Semilunarklappenschluss (T-Welle im EKG) bis zum AV-Klappenschluss (Beginn des QRS-Komplexes).",
    "zahlen": "",
    "seite": "PDF 99 = Buchseite 99",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "messgroessen",
    "text": "Die Amplituden werden nach Eichung (1 cm = 1 mV) in Ableitung II nach Einthoven gemessen, die Zeiten dagegen in derjenigen Ableitung mit der besten Darstellung.",
    "zahlen": "Amplituden: Einthoven II bei 1 cm = 1 mV; Zeiten: beste Ableitung",
    "seite": "PDF 4 (Buch 142)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "messgroessen",
    "text": "Hilfsmittel der Auswertung: ein Lineal fuer Laenge/Dauer der Komplexe, Hoehe der Amplituden und Herzfrequenz (es gibt Spezial-Lineale mit direkt ablesbarer Frequenzskala) sowie ein Stechzirkel, der das Aufdecken von Rhythmusabweichungen und fehlenden P-Wellen oder QRS-Komplexen vereinfacht.",
    "zahlen": "",
    "seite": "PDF 7-8 (Buch 145-146)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "messgroessen",
    "text": "Pruefung der P-Wellen-Regelmaessigkeit: mit dem Stechzirkel ueber die P-Wellen schreiten oder ein weisses Blatt Papier auflegen, darauf beispielsweise 4 P-Wellen markieren und das Blatt parallel verschieben. Besonders wichtig bei offensichtlichem Fehlen von P-Wellen, die sich in QRS-Komplexen verstecken koennen. Bildparameter: Vorschub 50 mm/s, Amplitude 1 cm/mV, Ableitung aVF.",
    "zahlen": "50 mm/s; 1 cm/mV; 4 P-Wellen als Schablone",
    "seite": "PDF 17 (Buch 155)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "messgroessen",
    "text": "Messung des PQ-Intervalls: mit dem Stechzirkel vom Beginn einer P-Welle bis zum Beginn des QRS-Komplexes messen.",
    "zahlen": "",
    "seite": "PDF 20 (Buch 158)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "messgroessen",
    "text": "Wenn in der II. Ableitung kein eindeutiges Q zu sehen ist, verwendet man statt des PQ- das PR-Intervall bzw. die PR-Strecke. Das abgebildete normale PQ- bzw. PR-Intervall des Hundes betraegt jeweils 0,12 s bei Vorschub 50 mm/s und Amplitude 10 mm/mV.",
    "zahlen": "Beispiel 0,12 s; Hund 0,06 s bis max. 0,13 s; Katze 0,05 s bis max. 0,09 s; 50 mm/s; 10 mm/mV",
    "seite": "PDF 23 (Buch 161)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "messgroessen",
    "text": "Die QRS-Dauer wird mit dem Stechzirkel gemessen: vom ersten negativen oder positiven Ausschlag (Q-Zacke) nach der P-Welle bis zum Beginn der ST-Strecke.",
    "zahlen": "",
    "seite": "PDF 24 (Buch 162)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "messgroessen",
    "text": "Hilfsmittel zur EKG-Auswertung: ein Lineal fuer Laenge/Dauer der Komplexe, Hoehe der Amplituden und Herzfrequenz; es gibt spezielle Lineale mit Skalierungen, auf denen die Herzfrequenz direkt ablesbar ist.",
    "zahlen": "",
    "seite": "PDF 7-8 / Buch 145-146",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "messgroessen",
    "text": "Ein Stechzirkel vereinfacht die Aufdeckung von Rhythmusabweichungen und fehlenden P-Wellen oder QRS-Komplexen.",
    "zahlen": "",
    "seite": "PDF 8 / Buch 146",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "messgroessen",
    "text": "Abb. 10.19 (Vorschub 50 mm/s, Amplitude 1 cm/mV): Zur Pruefung der Regelmaessigkeit der P-Wellen kontrolliert man ihre Abstaende mit einem Stechzirkel oder legt ein weisses Blatt auf und markiert z. B. 4 P-Wellen, dann verschiebt man das Blatt parallel. Besonders wichtig bei offensichtlichem Fehlen von P-Wellen, die sich manchmal in QRS-Komplexen verstecken.",
    "zahlen": "50 mm/s; 1 cm/mV; 4 P-Wellen markieren",
    "seite": "PDF 17 / Buch 155",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "messgroessen",
    "text": "Abb. 10.28 Messung des PQ- und PR-Intervalls bei Vorschub 50 mm/s und Amplitude 10 mm/mV; Beispielwerte je 0,12 s. Hund Dauer 0,06 s bis maximal 0,13 s, Katze 0,05 s bis maximal 0,09 s. Ist in Ableitung II kein eindeutiges Q zu sehen, verwendet man die PR-Strecke.",
    "zahlen": "Beispiel 0,12 s; Hund 0,06-0,13 s; Katze 0,05-0,09 s; 50 mm/s, 10 mm/mV",
    "seite": "PDF 23 / Buch 161",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "messgroessen",
    "text": "Abkuerzungen der beim Hund zu bestimmenden Messgroessen: IVSd/IVSs (interventrikulaeres Septum diastolisch/systolisch), LVDd/LVDs (linksventrikulaerer Durchmesser), LVWd/LVWs (linke freie Ventrikelwand), FS (Verkuerzungsfraktion), EF (Ejektionsfraktion), EPSS (e-point to septal separation), LAD (linksatrialer Durchmesser im rechts parasternalen 4K), EDV/ESV, EDVI/ESVI (Volumen bezogen auf Koerperoberflaeche), RAD (rechtsatrialer Durchmesser), RVd (rechtsventrikulaerer Durchmesser diastolisch).",
    "zahlen": "",
    "seite": "PDF 1 / Buch 448",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "messgroessen",
    "text": "Abkuerzungen bei der Katze: IVSd/IVSs, LVDd/LVDs, LVWd/LVWs, FS, LAD (linksatrialer Durchmesser im rechts parasternalen 4K), LA (linksatrialer Durchmesser in der Kurzachse), AO (Aortendurchmesser in der Kurzachse), LA/AO (Verhaeltnis in der Kurzachse). LA und Ao werden fruehdiastolisch gemessen.",
    "zahlen": "",
    "seite": "PDF 1 und 3 / Buch 461 und 463",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Definierte Maximalwerte fuer die P-Welle (Tabelle im Buch).",
    "zahlen": "Hund: Dauer 0,04 s, Amplitude 0,4 mV. Katze: Dauer 0,04 s, Amplitude 0,2 mV",
    "seite": "PDF 27 (Buch 14)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "normwerte",
    "text": "Definierte Maximalwerte fuer den QRS-Komplex (Tabelle im Buch), getrennt nach kleinen und grossen Hunderassen.",
    "zahlen": "Hund kleine Rassen: QRS-Dauer 0,05 s, R-Amplitude 2,5 mV. Hund grosse Rassen: QRS-Dauer 0,06 s, R-Amplitude 3 mV. Katze: QRS-Dauer 0,04 s, R-Amplitude 0,9 mV",
    "seite": "PDF 29 (Buch 16)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "normwerte",
    "text": "Normbereich fuer das PR-Intervall (Tabelle im Buch).",
    "zahlen": "Hund 0,06 - 0,13 s; Katze 0,05 - 0,09 s",
    "seite": "PDF 31 (Buch 18)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "normwerte",
    "text": "Normbereich fuer das QT-Intervall (Tabelle im Buch).",
    "zahlen": "Hund 0,15 - 0,25 s; Katze 0,12 - 0,18 s",
    "seite": "PDF 31 (Buch 18)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "normwerte",
    "text": "Definierte Maximalwerte fuer die ST-Strecke (Tabelle im Buch). Das Vergleichszeichen in der Tabelle ist ein Kleiner-Zeichen.",
    "zahlen": "Hund: Hebung < 0,15 mV, Senkung < 0,2 mV. Katze: Hebung < 0,1 mV, Senkung < 0,1 mV",
    "seite": "PDF 32 (Buch 19)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "normwerte",
    "text": "Auf jeder Fall-Frageseite steht dieselbe Normwerttabelle fuer den Hund. Grundrhythmus normal: Sinusrhythmus oder Sinusarrhythmie. Diese Tabelle wiederholt sich unveraendert auf allen dreizehn Frageseiten des Abschnitts.",
    "zahlen": "",
    "seite": "PDF 2,4,6,8,10,12,14,16,18,20,22,24,26 (gedruckt 91,93,95,97,99,101,103,105,107,109,111,113,115)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "normwerte",
    "text": "Normale Herzfrequenz Hund laut Normwerttabelle: 70-160 bpm; bei kleinen Rassen bis 180 bpm; bei Welpen bis 220 bpm. Die Software braucht also Rassegroesse und Altersklasse, sonst ist die Frequenzgrenze nicht entscheidbar.",
    "zahlen": "HF 70-160 bpm; kleine Rassen bis 180 bpm; Welpen bis 220 bpm",
    "seite": "PDF 2 (gedruckt 91)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "normwerte",
    "text": "Normaler Grundrhythmus beim Hund laut der auf jeder Fragestellungsseite wiederholten Normwerttabelle: Sinusrhythmus bzw. Sinusarrhythmie.",
    "zahlen": "Sinusrhythmus; Sinusarrhythmie",
    "seite": "PDF-S. 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23 (Buchseiten 189-211)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "normwerte",
    "text": "Normale Herzfrequenz Hund: 70-160 bpm; bei kleinen Rassen bis 180 bpm; bei Welpen bis 220 bpm.",
    "zahlen": "70-160 bpm; kleine Rassen bis 180 bpm; Welpen bis 220 bpm",
    "seite": "PDF-S. 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23 (Buchseiten 189-211)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "normwerte",
    "text": "Normales PR-Intervall beim Hund: 0,06-0,13 s.",
    "zahlen": "0,06-0,13 s",
    "seite": "PDF-S. 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23 (Buchseiten 189-211)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "normwerte",
    "text": "Das Buch legt jeder Fallseite dieselbe Normwerttabelle fuer den Hund bei. Sie hat elf Zeilen und die Spalten Parameter / Patient / Normwerte. Alle folgenden Normzahlen stammen aus dieser Tabelle.",
    "zahlen": "11 Zeilen: Grundrhythmus, Herzfrequenz, Elektrische Herzachse, P-Welle, PR-Intervall, QRS-Komplex, R-Zacke, QT-Intervall, ST-Strecke, T-Welle, Sonstiges",
    "seite": "PDF 28 (Buch 117); identisch wiederholt auf PDF 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "normwerte",
    "text": "Normale Herzfrequenz des Hundes. Fuer kleine Rassen und fuer Welpen gelten hoehere Obergrenzen.",
    "zahlen": "70-160 bpm; bis 180 bpm bei kleinen Rassen; bis 220 bpm bei Welpen",
    "seite": "PDF 28 (Buch 117), wiederholt auf allen Frageseiten",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "normwerte",
    "text": "Der Normbereich der Herzfrequenz beim Hund wird mit 70-160 bpm angegeben; bei kleinen Rassen bis 180 bpm, bei Welpen bis 220 bpm. Diese Zeile steht unveraendert in der Normwertspalte jeder Fallseite dieses Abschnitts.",
    "zahlen": "HF Hund 70-160 bpm; kleine Rassen bis 180 bpm; Welpen bis 220 bpm",
    "seite": "PDF 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45 (Buch 213-233)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "normwerte",
    "text": "Das PR-Intervall (in der Tabelle durchgaengig PR, nicht PQ genannt) betraegt beim Hund normal 0,06-0,13 s.",
    "zahlen": "PR 0,06-0,13 s",
    "seite": "PDF 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45 (Buch 213-233)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "normwerte",
    "text": "VHS-Referenzwerte: gesunder Hund Mittelwert 9,7 +/- 0,5 mit Bereich 8,5-10,5, bei kurzbruestigen Hunden bis 11,0 (Buchanan und Bucheler 1995); gesunde Katze Mittelwert 7,5 +/- 0,3 mit Bereich 6,7-8,1 (Litster und Buchanan 2000). Im Abbildungsbeispiel liegen Hund mit 11,2 und Katze mit 8,8 oberhalb der Referenz.",
    "zahlen": "Hund 9,7 +/- 0,5 (8,5-10,5), kurzbruestig bis 11,0; Katze 7,5 +/- 0,3 (6,7-8,1)",
    "seite": "PDF 62/63 = Buch 62/63",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Vena cava caudalis normal: etwa 75 % bis maximal 100 % der Breite des Wirbelkoerpers ueber der Bifurkation (meist Th5) und etwa gleich breit wie die Aorta thoracica.",
    "zahlen": "75-100 % der Wirbelkoerperbreite ueber Th5",
    "seite": "PDF 62 = Buch 62",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Lungengefaesse normal: seitlich liegt die Arterie dorsal, die Vene ventral des Bronchus, beide etwa gleich breit, im 4. ICR etwa 75 % des Durchmessers der 4. Rippe in ihrem oberen Drittel. In DV/VD liegt die Arterie lateral, die Vene medial; kaudal der 9. Rippe sind beide etwa so breit wie die 9. Rippe selbst.",
    "zahlen": "4. ICR: ca. 75 % des Durchmessers der 4. Rippe; kaudal der 9. Rippe: Breite = 9. Rippe",
    "seite": "PDF 62/63 = Buch 62/63",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Tabelle 5.1, normale Druckwerte (mmHg) bei Hund und Katze unter Allgemeinanaesthesie, Teil 1 - rechtes Herz: rechter Vorhof systolisch 4-6, diastolisch 0-4, Mittelwert 2-5; rechter Ventrikel systolisch 15-30, diastolisch < 5; Pulmonalarterie 15-30 / 5-15 / 8-20; pulmonaler Wedge-Druck 6-12 / 4-8 / 5-10.",
    "zahlen": "RA 4-6 / 0-4 / 2-5; RV 15-30 / <5; PA 15-30 / 5-15 / 8-20; Wedge 6-12 / 4-8 / 5-10 mmHg",
    "seite": "PDF 76 = Buch 76 (Tab. 5.1)",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Tabelle 5.1, Teil 2 - linkes Herz und Gefaesse: linker Vorhof systolisch 5-12, diastolisch < 8, Mittelwert < 10; linker Ventrikel systolisch 95-150, diastolisch < 10; Aorta systolisch 95-50 (so gedruckt, offensichtlicher Druckfehler, vermutlich 95-150), diastolisch 70-100, Mittelwert 80-110; systemische Arterie 110-160 / 80-110 / 90-120.",
    "zahlen": "LA 5-12 / <8 / <10; LV 95-150 / <10; Aorta [95-50] / 70-100 / 80-110; syst. Arterie 110-160 / 80-110 / 90-120 mmHg",
    "seite": "PDF 76 = Buch 76 (Tab. 5.1)",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Echo-Normkriterium: bei herzgesunden Hunden und Katzen sollten die Durchmesser des Aortenbulbus und des linken Atriums annaehernd gleich gross sein (Verhaeltnis LA:Ao).",
    "zahlen": "LA : Ao annaehernd 1",
    "seite": "PDF 93 = Buch 93",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Tabelle 4.3, Herzfrequenz bei gesunden Tieren: Katze 160-240/min, Hund 70-160/min, Zwerghunderassen 70-180/min, Hundewelpe unter 220/min. Die Frequenz unterliegt einer deutlichen biologischen Varianz und wird stark vom Aufregungsgrad beeinflusst.",
    "zahlen": "Katze 160-240/min; Hund 70-160/min; Zwerghunderasse 70-180/min; Hundewelpe < 220/min",
    "seite": "23",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Tabelle 4.4, normale P-Welle: Ausschlagsrichtung gewoehnlich positiv in Abl. I, II, III, aVF, CV6LL, CV6LU. Amplitude Hund unter 0,4 mV, Katze unter 0,2 mV (jeweils in Abl. II, III, aVF). Breite Hund unter 0,04 s, Riesenrassen unter 0,05 s, Katze unter 0,04 s.",
    "zahlen": "P-Amplitude Hund < 0,4 mV, Katze < 0,2 mV (II, III, aVF); P-Breite Hund < 0,04 s, Riesenrassen < 0,05 s, Katze < 0,04 s",
    "seite": "26",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Tabelle 4.6, normale QRS-Dauer: Hund maximal 0,05 s bei kleinen Rassen und maximal 0,06 s bei grossen Rassen; Katze maximal 0,04 s.",
    "zahlen": "QRS-Dauer Hund <= 0,05 s (kleine Rassen), <= 0,06 s (grosse Rassen); Katze <= 0,04 s",
    "seite": "30",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Tabelle 4.6, normale Q-Zacken: Hund maximal 0,5 mV in Abl. I, II und III; Katze maximal 0,5 mV in Abl. I und aVL.",
    "zahlen": "Q <= 0,5 mV (Hund: I, II, III; Katze: I, aVL)",
    "seite": "30",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Tabelle 4.6, normale R-Zacken Hund: maximal 2,5 mV bei kleinen Rassen und maximal 3,0 mV bei grossen Rassen in Abl. II; maximal 2,5 mV bei kleinen Rassen in Abl. CV6LL; maximal 3,0 mV bei grossen Rassen in Abl. CV6LU.",
    "zahlen": "R Hund <= 2,5 mV (klein) bzw. <= 3,0 mV (gross) in Abl. II; <= 2,5 mV in CV6LL; <= 3,0 mV in CV6LU",
    "seite": "30",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Tabelle 4.6, normale R-Zacken Katze: maximal 0,8 mV in Abl. II und maximal 1,0 mV in den Abl. CV6LL und CV6LU.",
    "zahlen": "R Katze <= 0,8 mV (Abl. II); <= 1,0 mV (CV6LL, CV6LU)",
    "seite": "30",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Tabelle 4.6, normale S-Zacken (Spalte Hund): maximal 0,35 mV in Abl. I, maximal 0,5 mV in Abl. II, maximal 0,8 mV in den Abl. CV6LL und CV6LU. Die Katzenspalte enthaelt fuer S-Zacken keine Angabe.",
    "zahlen": "S Hund <= 0,35 mV (I); <= 0,5 mV (II); <= 0,8 mV (CV6LL, CV6LU)",
    "seite": "30",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Tabelle 4.6, normale T-Wellen: Hund maximal 28 % der R-Zacke in Abl. II, Katze maximal 0,3 mV in Abl. II. Bei beiden Tierarten darf die T-Welle positiv, negativ oder biphasisch sein.",
    "zahlen": "T Hund <= 28 % von R (Abl. II); T Katze <= 0,3 mV (Abl. II)",
    "seite": "30",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Tabelle 4.6, normale ST-Strecke: Hund Hebung maximal 0,2 mV und Senkung maximal 0,15 mV; Katze Hebung oder Senkung maximal 0,05 mV.",
    "zahlen": "ST Hund: Hebung <= 0,2 mV, Senkung <= 0,15 mV; Katze: max. 0,05 mV in beide Richtungen",
    "seite": "30",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Tabelle 4.7, physiologische PQ-Dauer: Hund 0,06 bis 0,13 s, Katze 0,05 bis 0,09 s; frequenzabhaengig.",
    "zahlen": "PQ Hund 0,06-0,13 s; Katze 0,05-0,09 s",
    "seite": "36",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Beim Hund gelten als Normvarianten der isoelektrischen Linie ST-Streckensenkungen bis 0,15 mV in den Ableitungen I, II, III und den Brustwandableitungen; Hebungen der ST-Strecke bis 0,20 mV sind ebenfalls noch normal.",
    "zahlen": "Hund: ST-Senkung bis 0,15 mV; ST-Hebung bis 0,20 mV",
    "seite": "36",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Bei Katzen sind ST-Streckenverlagerungen schon ab 0,05 mV als pathologisch anzusehen; sie sind bei dieser Tierart zum Teil die einzige erkennbare Veraenderung im EKG.",
    "zahlen": "Katze: ab 0,05 mV pathologisch",
    "seite": "36",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Richtwerte des Hundes nach Atkins et al. (1992), Tabelle 6.1: LVET 159 +/- 15 ms, PEP 54 +/- 7 ms, Quotient PEP/LVET 0,24 +/- 0,05, gemessen bei einer Herzfrequenz von 124-147/min.",
    "zahlen": "LVET 159 +/- 15 ms; PEP 54 +/- 7 ms; PEP/LVET 0,24 +/- 0,05; HF 124-147/min",
    "seite": "PDF 98 = Buchseite 98 (Tab. 6.1)",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Verkuerzungsfraktion Hund: 27-40 % gelten als physiologisch. Windhunde und Retriever (sowie eine dritte, im Auszug unleserliche Gruppe) fallen mit 25-30 % auf; Werte unter 25 % sind generell kritisch zu betrachten. Die FS ist tierart-, teils rassespezifisch und haltungsabhaengig, aber nicht geschlechts- oder gewichtsspezifisch.",
    "zahlen": "Hund FS 27-40 % normal; Windhunde/Retriever 25-30 %; FS < 25 % kritisch",
    "seite": "PDF 97 = Buchseite 97",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Verkuerzungsfraktion Katze: die Werte liegen hoeher und ueberschreiten durchschnittlich 40 %; Werte ueber 60 % sollten im Kontext kritisch geprueft werden.",
    "zahlen": "Katze FS im Mittel > 40 %; > 60 % kritisch pruefen",
    "seite": "PDF 97 = Buchseite 97",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Physiologische Stroemungsgeschwindigkeiten beim Hund in m/s (Tabelle 6.2), Spalte 1 nach Kirberger et al. (1992), Spalte 2 nach Yuill et al. (1991): Mitralklappe E-Welle 0,59-1,18 bzw. 0,70-1,08; Mitralklappe A-Welle 0,33-0,93 (keine Angabe bei Yuill); Trikuspidalklappe E-Welle 0,49-1,31 bzw. 0,52-0,92; Trikuspidalklappe A-Welle 0,32-0,94 (keine Angabe); Aortenklappe 1,06-2,29 bzw. 1,04-1,38; Pulmonalklappe 0,88-1,61 bzw. 0,76-1,22.",
    "zahlen": "Mitral E 0,59-1,18 / 0,70-1,08 m/s; Mitral A 0,33-0,93 m/s; Trikuspidal E 0,49-1,31 / 0,52-0,92 m/s; Trikuspidal A 0,32-0,94 m/s; Aorta 1,06-2,29 / 1,04-1,38 m/s; Pulmonalis 0,88-1,61 / 0,76-1,22 m/s",
    "seite": "PDF 99 = Buchseite 99 (Tab. 6.2)",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "normwerte",
    "text": "Die Normwerttabelle 10.1 des Buchs gilt ausdruecklich fuer die Ableitung II nach Einthoven bei Hund und Katze; die Werte variieren je nach Koerpergroesse bzw. Alter des Tieres. Quelle der Tabelle ist Smith/Tilley/Oyama/Sleeper, Manual of Canine and Feline Cardiology, 5th ed., 2016.",
    "zahlen": "Bezugsableitung: Einthoven II",
    "seite": "PDF 8-9 (Buch 146-147)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Normale Herzfrequenz Hund nach Tab. 10.1: Welpe 70-220/min, Miniaturrassen 70-180/min, Standardrassen 70-160/min, Riesenrassen 60-140/min, schlafender Hund 35-40/min.",
    "zahlen": "Welpe 70-220; Miniatur 70-180; Standard 70-160; Riese 60-140; schlafend 35-40 Schlaege/min",
    "seite": "PDF 9 (Buch 147)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Normale Herzfrequenz Katze nach Tab. 10.1: 120-220 Schlaege/min.",
    "zahlen": "Katze 120-220 Schlaege/min",
    "seite": "PDF 9 (Buch 147)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Normaler Herzrhythmus laut Tab. 10.1: beim Hund Sinusrhythmus, respiratorische Sinusarrhythmie und wandernder Schrittmacher; bei der Katze nur Sinusrhythmus (die beiden anderen sind in der Katzenspalte mit Strich als nicht zutreffend gekennzeichnet).",
    "zahlen": "",
    "seite": "PDF 9 (Buch 147)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Frequenzvariabilitaet des Sinusknotens: schlafende grosse Hunde 25-40/min, kleine aufgeregte Hunde bis 180/min, Katzen in Ruhe 120-140/min, Katzen bei Stress bis maximal 240/min.",
    "zahlen": "grosse Hunde schlafend 25-40; kleine Hunde aufgeregt bis 180; Katze Ruhe 120-140; Katze Stress max. 240 Schlaege/min",
    "seite": "PDF 10 (Buch 148)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Steckbrief normaler QRS-Komplex, Hund: QRS-Dauer 0,05 s bei kleinen Hunden bis 0,06 s bei grossen Hunden.",
    "zahlen": "Hund QRS-Dauer 0,05 s (klein) bis 0,06 s (gross)",
    "seite": "PDF 24 (Buch 162)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Steckbrief normaler QRS-Komplex, Hund: R-Zacke in Ableitung II +2,5 mV bei kleinen Hunden bis +3,0 mV bei grossen Hunden.",
    "zahlen": "Hund R in Abl. II +2,5 mV (klein) bis +3,0 mV (gross)",
    "seite": "PDF 24 (Buch 162)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Steckbrief normaler QRS-Komplex, Katze: QRS-Dauer maximal 0,04 s, R-Zacke maximal 0,9 mV.",
    "zahlen": "Katze QRS max. 0,04 s; R max. 0,9 mV",
    "seite": "PDF 24 (Buch 162)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Abb. 10.36 wiederholt die Grenzwerte bei 50 mm/s und 10 mm/mV: Hund R-Hoehe maximal 3,0 mV (grosse Hunde) bzw. 2,5 mV (kleine Hunde), QRS-Dauer maximal 0,06 s (grosse) bzw. 0,05 s (kleine); Katze R-Hoehe maximal 0,9 mV, QRS-Dauer maximal 0,04 s.",
    "zahlen": "Hund R max 3,0/2,5 mV, QRS max 0,06/0,05 s; Katze R max 0,9 mV, QRS max 0,04 s",
    "seite": "PDF 28 (Buch 166)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Steckbrief normale ST-Strecke: Hund Hebung bzw. Senkung zwischen -0,2 und 0,15 mV; Katze keine Abweichung.",
    "zahlen": "Hund ST -0,2 bis +0,15 mV; Katze 0",
    "seite": "PDF 38 (Buch 176)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Steckbrief normales QT-Intervall: Hund 0,15-0,25 s bei normaler Herzfrequenz, Katze 0,12-0,18 s bei normaler Herzfrequenz.",
    "zahlen": "Hund QT 0,15-0,25 s; Katze QT 0,12-0,18 s",
    "seite": "PDF 38 (Buch 176)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Steckbrief S-Zacke: Hund kleiner 0,5 mV; fuer die Katze ist laut Buch keine einheitliche Angabe moeglich.",
    "zahlen": "Hund S < 0,5 mV",
    "seite": "PDF 38 (Buch 176)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Steckbrief normale T-Welle: Hund maximal 25 % der R-Amplitude in Ableitung II; Katze Hoehe kleiner 0,3 mV (Abb. 10.54 gibt fuer die Katze ebenfalls Ableitung II an).",
    "zahlen": "Hund T <= 25 % von R (Abl. II); Katze T < 0,3 mV (Abl. II)",
    "seite": "PDF 40 (Buch 178)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Tab. 10.1 (Ableitung II nach Einthoven), Herzfrequenz Hund: Welpe 70-220/min, Miniaturrassen 70-180/min, Standardrassen 70-160/min, Riesenrassen 60-140/min, schlafender Hund 35-40/min.",
    "zahlen": "Welpe 70-220; Miniatur 70-180; Standard 70-160; Riese 60-140; schlafend 35-40 Schlaege/min",
    "seite": "PDF 9 / Buch 147",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Tab. 10.1, Herzfrequenz Katze: 120-220 Schlaege/min.",
    "zahlen": "120-220 Schlaege/min",
    "seite": "PDF 9 / Buch 147",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Tab. 10.1, Herzrhythmus: Beim Hund gelten Sinusrhythmus, respiratorische Sinusarrhythmie und wandernder Schrittmacher als normal; bei der Katze nur der Sinusrhythmus.",
    "zahlen": "",
    "seite": "PDF 9 / Buch 147",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Tab. 10.1, P-Welle Hoehe: Hund bis +0,4 mV, Katze bis +0,2 mV (Ableitung II).",
    "zahlen": "Hund +0,4 mV; Katze +0,2 mV",
    "seite": "PDF 9 / Buch 147",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Tab. 10.1, P-Welle Breite: Hund bis 0,04 s (grosse Hunde 0,05 s), Katze bis 0,04 s.",
    "zahlen": "Hund 0,04 s (gross 0,05 s); Katze 0,04 s",
    "seite": "PDF 9 / Buch 147",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Tab. 10.1, PR-Intervall: Hund 0,06-0,13 s, Katze 0,05-0,09 s; Ausrichtung isoelektrisch.",
    "zahlen": "Hund 0,06-0,13 s; Katze 0,05-0,09 s",
    "seite": "PDF 9 / Buch 147",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Tab. 10.1, QRS-Hoehe (R in Ableitung II): kleine Hunde +2,5 mV, grosse Hunde +3,0 mV; Katze max. 0,9 mV.",
    "zahlen": "kleine Hunde +2,5 mV; grosse Hunde +3,0 mV; Katze max. 0,9 mV",
    "seite": "PDF 9 / Buch 147",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Tab. 10.1, QRS-Breite: kleine Hunde 0,05 s, grosse Hunde 0,06 s; Katze max. 0,04 s.",
    "zahlen": "kleine Hunde 0,05 s; grosse Hunde 0,06 s; Katze max. 0,04 s",
    "seite": "PDF 9 / Buch 147",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Tab. 10.1, ST-Strecke Hund: Hebung kleiner/gleich 0,15 mV, Senkung kleiner/gleich 0,2 mV. Fuer die Katze ist in der Tabelle kein Wert angegeben.",
    "zahlen": "Hund Hebung <= 0,15 mV; Senkung <= 0,2 mV",
    "seite": "PDF 9 / Buch 147",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Tab. 10.1, QT-Intervall bei normaler Herzfrequenz: Hund 0,15-0,25 s, Katze 0,12-0,18 s.",
    "zahlen": "Hund 0,15-0,25 s; Katze 0,12-0,18 s",
    "seite": "PDF 9 / Buch 147",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Tab. 10.1, S-Zacke Hund: Hoehe kleiner 0,5 mV. Fuer die Katze ist kein Wert angegeben.",
    "zahlen": "Hund S < 0,5 mV",
    "seite": "PDF 9 / Buch 147",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Tab. 10.1, T-Welle: Hund positiv, negativ oder biphasisch, Hoehe plus/minus 0,15-1,0 mV, Verhaeltnis zur R-Zacke kleiner als ein Viertel der R-Zacke; Katze ueblicherweise positiv, Hoehe kleiner 0,3 mV.",
    "zahlen": "Hund +/-0,15-1,0 mV und < 1/4 R; Katze < 0,3 mV",
    "seite": "PDF 9 / Buch 147",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Steckbrief normales PQ-Intervall: isoelektrisch (Nulllinie); Hund Dauer 0,06-0,13 s; Katze Dauer 0,05-0,09 s. Das PQ-Intervall verkuerzt sich mit zunehmender Herzfrequenz.",
    "zahlen": "Hund 0,06-0,13 s; Katze 0,05-0,09 s",
    "seite": "PDF 20 / Buch 158",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Abb. 10.36 (normaler Herzzyklus, Vorschub 50 mm/s, Amplitude 10 mm/mV): Hund R-Hoehe maximal 3,0 mV (grosse Hunde) bzw. maximal 2,5 mV (kleine Hunde), QRS-Dauer maximal 0,06 s (grosse Hunde) bzw. maximal 0,05 s (kleine Hunde). Katze R-Hoehe maximal 0,9 mV, QRS-Dauer maximal 0,04 s.",
    "zahlen": "50 mm/s; 10 mm/mV; Hund R max 3,0/2,5 mV, QRS max 0,06/0,05 s; Katze R max 0,9 mV, QRS max 0,04 s",
    "seite": "PDF 28 / Buch 166",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "normwerte",
    "text": "Normalwerte der Ejektionsfraktion; Werte darunter weisen sicher auf eine systolische Dysfunktion hin. Bei Mitralinsuffizienz ist die EF wegen des Rueckflusses in das linke Atrium nicht dem Herzauswurfvolumen gleichzusetzen. Alternative Messung ueber die Teichholzformel (M-Mode-Kapitel S. 120).",
    "zahlen": "EF normal 52-67,3 %; EF < 40 % = sichere systolische Dysfunktion",
    "seite": "PDF 12 / Buch 106",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Verhaeltnis linkes Atrium zu Aortenwurzel (LA/Ao) in der Kurzachse, gemessen am Ende der ventrikulaeren Systole: Grenzwert fuer Hund und Katze.",
    "zahlen": "LA/Ao maximal 1,6 (Hund und Katze)",
    "seite": "PDF 19 / Buch 113",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Grundsatz zur Benutzung von Referenzwerten: Normalwerte umfassen in der Regel 95 % der gesunden Population. Patienten mit Werten ausserhalb sind daher nicht automatisch krank. Messmethodik und Statistik der Quellstudien sind uneinheitlich; Referenzwerte duerfen nie einziges Beurteilungskriterium sein.",
    "zahlen": "95 % der gesunden Population",
    "seite": "PDF 1 / Buch 448 (Datei 3)",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Vorhersageintervalle fuer den Cornell-Index beim Hund (Tab. 22.2), jeweils 95-%- und 90-%-Intervall.",
    "zahlen": "LVDd 1,27-1,85 / 1,35-1,73; LVDs 0,71-1,26 / 0,79-1,14; LVWd 0,29-0,6 / 0,33-0,53; LVWs 0,48-0,87 / 0,53-0,78; IVSd 0,29-0,59 / 0,33-0,52; IVSs 0,43-0,79 / 0,48-0,71",
    "seite": "PDF 1 / Buch 448",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "M-Mode-Mittelwerte und 95-%-Vorhersageintervalle beim Hund nach Koerpermasse (Tab. 22.3, Auszug Randwerte). Werte ohne gedruckte Einheit, der Groessenordnung nach in cm.",
    "zahlen": "3 kg: IVSd 0,5 (0,4-0,8), LVDd 2,1 (1,0-2,6), LVWd 0,5 (0,4-0,8), IVSs 0,8 (0,6-1,0), LVDs 1,3 (1,0-1,8), LVWs 0,8 (0,6-1,1). 30 kg: IVSd 0,9 (0,7-1,3), LVDd 4,2 (3,5-5,0), LVWd 0,9 (0,6-1,3), IVSs 1,3 (1,0-1,8), LVDs 2,8 (2,1-3,7), LVWs 1,4 (1,0-1,9). 70 kg: IVSd 1,1 (0,8-1,6), LVDd 5,3 (4,4-6,5), LVWd 1,1 (0,8-1,6), IVSs 1,6 (1,2-2,2), LVDs 3,6 (2,7-4,8), LVWs 1,6 (1,2-2,2)",
    "seite": "PDF 2 / Buch 449",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Weitere Stuetzstellen derselben Tabelle 22.3 (Mittelwert, 95-%-Intervall) fuer LVDd nach Koerpermasse.",
    "zahlen": "4 kg 2,3 (1,9-2,8); 6 kg 2,6 (2,2-3,1); 9 kg 2,9 (2,4-3,4); 11 kg 3,1 (2,6-3,7); 15 kg 3,4 (2,8-4,1); 20 kg 3,7 (3,1-4,5); 25 kg 3,9 (3,3-4,8); 35 kg 4,4 (3,6-5,3); 40 kg 4,5 (3,8-5,5); 50 kg 4,8 (4,0-5,8); 60 kg 5,1 (4,2-6,2)",
    "seite": "PDF 2 / Buch 449",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Hinweis zu den rassespezifischen Hundetabellen: kleine Rassen wurden bewusst ausgenommen (dort eher Cornell-Index mit 90-%-Intervall). Die angegebenen Intervalle sind Spannweiten und Standardabweichungen, nur vereinzelt 95-%-Vorhersageintervalle, und duerfen nur als grobe Richtwerte gelten. Wo moeglich, haben die Autoren Mittelwert plus/minus 1,96 x Standardabweichung ergaenzt.",
    "zahlen": "Mittelwert plus/minus 1,96 x SD umfasst 95 % normalverteilter Faelle",
    "seite": "PDF 2 / Buch 449",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Rassewerte Afghane (Median und Spannweite), n = 20, Koerpermasse Median 23 kg (17-31 kg).",
    "zahlen": "IVSd 10 (8-12) mm; LVDd 42 (33-52); LVWd 9 (7-11); IVSs 13 (8-18); LVDs 28 (20-37); LVWs 12 (9-18); FS 33 % (24-48); EPSS 4 mm (0-10)",
    "seite": "PDF 2 / Buch 449",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Rassewerte Beagle (Mittelwert, SD, Spannweite), n = 50, Koerpermasse Mittel 8,92 kg (5,49-12,03).",
    "zahlen": "IVSd 6,7 +/- 1,1 (5-11) mm; LVDd 26,3 +/- 3,4 (18-33); LVWd 8,2 +/- 1,9 (6-13); IVSs 9,6 +/- 1,5 (6-12); LVDs 15,7 +/- 3,4 (8-27); LVWs 11,4 +/- 1,9 (7-17); FS 40 +/- 9 % (20-70)",
    "seite": "PDF 3 / Buch 450",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Rassewerte Border Collie (Mittelwert +/- SD), n = 20, Koerpermasse 15-29 kg.",
    "zahlen": "IVSd 10,9 +/- 1,44 mm; LVDd 34,46 +/- 4,02; LVWd 11,84 +/- 1,72; IVSs 10,9 +/- 1,44; LVDs 25,61 +/- 3,19; LVWs 11,84 +/- 1,72; FS 25,64 +/- 4,06 %; EPSS 5,54 +/- 1,54 mm",
    "seite": "PDF 3 / Buch 450",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Rassewerte Bordeaux-Dogge (Mittelwert +/- SD, Spannweite), n = 14, Koerpermasse Mittel 53 kg (38-81).",
    "zahlen": "IVSd 13 +/- 2 (9-17) mm; LVDd 42 +/- 4 (34-49); LVWd 13 +/- 2 (10-16); IVSs 15 +/- 2 (12-18); LVDs 32 +/- 3 (26-37); LVWs 17 +/- 2 (14-20); FS 24 +/- 4 % (18-32); EPSS 6 +/- 1 (4-9); LAD 38 +/- 2 (35,4-42)",
    "seite": "PDF 4 / Buch 451",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Rassewerte Boxer (Median und 5.-95. Perzentile), n = 66, Koerpermasse Median 29 kg (23-36). Die Tabelle ist mit mm beschriftet, die Zahlen entsprechen der Groessenordnung nach cm.",
    "zahlen": "IVSd 0,99 (0,71-1,19); LVDd 4,31 (3,66-5,18); LVWd 0,97 (0,77-1,26); IVSs 1,31 (1,05-1,71); LVDs 2,96 (2,35-3,63); LVWs 1,36 (1,03-1,75); FS 31 % (23-42); Aortenanulus 1,85 (1,65-2,1); LAD 4,33 (3,57-4,91)",
    "seite": "PDF 4 / Buch 451",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Rassewerte Deerhound (Mittelwert +/- SD), n = 54, Koerpermasse 28,5-51 kg; die einzige Tabelle mit Rechtsherzmassen und Volumenindizes.",
    "zahlen": "IVSd 11,84 +/- 1,69 mm; LVDd 49,99 +/- 4,67; LVWd 11,1 +/- 1,87; IVSs 16,44 +/- 2,63; LVDs 34,92 +/- 4,32; LVWs 16,12 +/- 1,96; FS 30,07 +/- 3,04 %; EPSS 5,4 +/- 1,2; LAD 48,52 +/- 3,8; RAD 36,61 +/- 3,87; RVd 26,76 +/- 3,39; ESVI 44,02 +/- 14,78 ml/m2; EDVI 101,04 +/- 24,23 ml/m2",
    "seite": "PDF 5 / Buch 452",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Rassewerte Deutsche Dogge (5.-95. Perzentile, getrennt maennlich/weiblich), n = 40.",
    "zahlen": "LVDd 46,7-58,7 mm (m) bzw. 42,7-61 (w); LVDd Cornell 1,3-1,64; LVDs 33,7-42,5 (m) bzw. 28,8-41,9 (w); LVDs Cornell 0,84-1,11; FS 20-37 %; EPSS 3-8,6 mm; ESVI 21,9-47,0 ml/m2",
    "seite": "PDF 5 / Buch 452",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Rassewerte Deutscher Schaeferhund (Mittelwert +/- SD), n = 60, Koerpermasse 22-37,2 kg.",
    "zahlen": "IVSd 9,6 +/- 0,9 mm; LVDd 41,7 +/- 5; LVWd 8,8 +/- 1,1; IVSs 14 +/- 0,9; LVDs 31 +/- 5,1; LVWs 13 +/- 1,2; FS 28,63 +/- 6,52 %; EPSS 4,9 +/- 1,3",
    "seite": "PDF 6 / Buch 453",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Rassewerte Dobermann (Mittelwert +/- SD), getrennt nach Schnittebene und Geschlecht, n = 110 (50 m, 60 w). Wichtig als Screening-Grundlage fuer die DCM des Dobermanns.",
    "zahlen": "Laengsachse m: LVDd 41,1 +/- 3,5 mm, LVDs 29,4 +/- 3,2, FS 28,43 +/- 3,95 %; Laengsachse w: 39,7 +/- 3,1, 28,7 +/- 2,8, 27,68 +/- 3,92. Kurzachse m: 42,8 +/- 3,1, 30,8 +/- 3,4, 28,69 +/- 5,92; Kurzachse w: 40,9 +/- 3,4, 29,6 +/- 2,8, 27,63 +/- 4,06",
    "seite": "PDF 6 / Buch 453",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Rassewerte Golden Retriever, zwei unabhaengige Quellen. Quelle 1 (Median, Spannweite), n = 20, Koerpermasse 32 kg (23-41); Quelle 2 (Referenzbereich), n = 42, Koerpermasse 31,1 kg (24-42,5).",
    "zahlen": "Quelle 1: IVSd 10 (8-13) mm; LVDd 45 (37-51); LVWd 10 (8-12); IVSs 14; LVDs 27 (18-35); LVWs 15 (10-19); FS 39 % (27-55); EPSS 5 (1-10). Quelle 2: LVDd 33-47; LVDs 20-30; LAD 37-50; FS 25-46 %; EPSS 3-7",
    "seite": "PDF 7 / Buch 454",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Rassewerte Greyhound (Mittelwert +/- SD, Spannweite), n = 16, Koerpermasse 20,7-32,5 kg. Auffallend niedrige FS bei dicken Waenden - typisches Sportlerherz.",
    "zahlen": "IVSd 10,63 +/- 1,72 mm; LVDd 44,12 +/- 2,96; LVWd 12,10 +/- 1,71; IVSs 13,39 +/- 2,55; LVDs 32,51 +/- 3,47; LVWs 15,25 +/- 2,24; FS 25,36 +/- 6,33 % (17-35); EPSS 3,7 +/- 1,2",
    "seite": "PDF 7 / Buch 454",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Rassewerte ungarischer Greyhound (Mittelwert +/- SD, Spannweite), n = 22, Koerpermasse 27,8 kg (23-39,8).",
    "zahlen": "IVSd 11,8 +/- 1,7 mm; LVDd 45,3 +/- 3; LVWd 12,3 +/- 1,5; IVSs 13,9 +/- 2,3; LVDs 28,9 +/- 3,8; LVWs 15,6 +/- 1,8; FS 36,8 +/- 6,3 % (29-51); EPSS 3,7 +/- 1,2; LAD 34,1 +/- 4",
    "seite": "PDF 8 / Buch 455",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Rassewerte Irischer Wolfshund (Mittelwert +/- SD), n = 262, Koerpermasse 65 +/- 8,75 kg. Groesste Rassepopulation der Sammlung, mit Rechtsherzmassen.",
    "zahlen": "IVSd 9,3 +/- 1,8 mm; LVDd 53,4 +/- 2,8; LVWd 9,8 +/- 1,6; IVSs 13,7 +/- 2,4; LVDs 35,4 +/- 2,8; LVWs 14,9 +/- 2,2; FS 34 +/- 4,5 %; EPSS 6,8 +/- 1,6; LAD 47,3 +/- 4,3; RAD 40,4 +/- 7,5; RVd 29,1 +/- 3,9; ESVI 28,7 +/- 5,7 ml/m2",
    "seite": "PDF 8 / Buch 455",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Rassewerte Labrador Retriever (Mittelwert +/- SD, Spannweite), n = 24, Koerpermasse 23,67 kg (18-30).",
    "zahlen": "IVSd 9,06 +/- 0,37 mm (5,6-13,5); LVDd 37,58 +/- 1,05 (29,4-45,3); LVWd 8,75 +/- 0,26; IVSs 14,47 +/- 0,64; LVDs 23,98 +/- 0,97; LVWs 12,08 +/- 0,4; FS 35,89 +/- 1,56 % (18,75-49,66); EPSS 5,2 +/- 0,17",
    "seite": "PDF 9 / Buch 456",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Rassewerte Magyar Vizsla (Mittelwert +/- SD, Spannweite), n = 45, Koerpermasse 24,5 kg (12,5-32,5).",
    "zahlen": "IVSd 10,6 +/- 1,4 mm; LVDd 42,9 +/- 4,9; LVWd 11,1 +/- 1,6; IVSs 12,7 +/- 1,7; LVDs 26,7 +/- 4,3; LVWs 14,7 +/- 1,9; FS 38,6 +/- 5,1 % (29-49); EPSS 2,2 +/- 0,6",
    "seite": "PDF 9 / Buch 456",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Rassewerte Neufundlaender (Mittelwert +/- SD, Spannweite), n = 51, Koerpermasse 54,7 kg (40-72).",
    "zahlen": "IVSd 9,9 +/- 2,7 mm; LVDd 46 +/- 5,0 (37,4-57); LVWd 9 +/- 2,2; IVSs 13,9 +/- 3,4; LVDs 30,8 +/- 4,6 (20-45); LVWs 13,3 +/- 2,9; FS 32,9 +/- 6,4 % (20-48); EPSS 3 +/- 1,5",
    "seite": "PDF 10 / Buch 457",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Rassewerte Saluki: M-Mode als 95-%-Vorhersageintervall (n = 78) und Volumina nach Simpson als 90-%-Referenzintervall (n = 91-93).",
    "zahlen": "IVSd 8,6-13,3 mm; LVDd 40,0-52,0; LVWd 8,3-12,4; IVSs 10,5-17,1; LVDs 27,3-39,5; LVWs 10,0-16,1; FS 20,3-34,6 %; EPSS 4,4-10,2. Simpson: EDV 50-102 ml; ESV 20-52 ml; EDVI 68-126 ml/m2; ESVI 27-64 ml/m2; EF 41-64 %",
    "seite": "PDF 10 / Buch 457",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Rassewerte Whippet nach Koerpermasse (Mittelwert und 95-%-Vorhersageintervall), n = 105, Tabelle in 1-kg-Schritten von 7 bis 19 kg; hier die Randwerte.",
    "zahlen": "7 kg: IVSd 7,5 (5,9-9,5) mm, LVDd 30,4 (25,2-36,5), LVWd 7,0 (5,6-8,7), IVSs 9,8 (7,7-12,5), LVDs 21,0 (16,3-27,0), LVWs 10 (7,9-12,6), LAD 26,2 (22,6-30,5). 19 kg: IVSd 10,6 (8,4-13,5), LVDd 41,9 (34,9-50,2), LVWd 9,9 (7,9-12,5), IVSs 13,4 (10,6-17,1), LVDs 31,0 (24,0-39,9), LVWs 13,9 (11,0-17,6), LAD 35,9 (30,9-41,8)",
    "seite": "PDF 11 / Buch 458",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Whippet-Volumina nach Simpson (90-%-Referenzintervall), n = 80/81. Biplanar bedeutet Mittelwert aus links apikaler und rechts parasternaler Messung.",
    "zahlen": "EDV biplanar 27-67 ml; ESV biplanar 7-33 ml; EDVI 59-109 ml/m2; ESVI 18-53 ml/m2; EF 45-70 %",
    "seite": "PDF 12 / Buch 459",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Groesse des linken Atriums im Verhaeltnis zur Aortenwurzel beim Hund, gemessen in der kurzen Achse im ersten Bild, in dem die Aortenklappe gerade geschlossen ist. Ein pathologisch abnormaler Aortendurchmesser kann die LA-Groesse verfaelschen, daher das linke Atrium immer zusaetzlich im 4-Kammer-Blick beurteilen.",
    "zahlen": "LA/Ao-Verhaeltnis < 1,6",
    "seite": "PDF 12 / Buch 459",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Zweite LA-Kennzahl beim Hund: LAD im rechts parasternalen 4K auf halber Hoehe des linken Atriums parallel zum Mitralklappenring unmittelbar vor Oeffnung der Mitralklappe gemessen, bezogen auf die Aortenwurzel in der kurzen Achse (Aorta im ersten Bild mit gerade geschlossener Klappe).",
    "zahlen": "LAD/Ao 1,11-1,99",
    "seite": "PDF 13 / Buch 460",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Systolische Zeitintervalle und TEI-Index des linken Ventrikels beim gesunden Hund nach Gewichtsklasse (Mittelwert +/- SD). Verhaeltnisse zwischen Preejektionsperiode und linksventrikulaerer Ejektionszeit gelten allgemein als normal im angegebenen Bereich.",
    "zahlen": "PEP/LVET normal 0,24-0,38. PEP: 43,6 +/- 8,7 ms (3-15 kg), 59,6 +/- 11,8 (15,1-35 kg), 66,0 +/- 10,12 (35,1-55 kg). LVET: 172 +/- 18, 173 +/- 16, 170 +/- 17 ms. LV-TEI: 0,380 +/- 0,104, 0,414 +/- 0,102, 0,445 +/- 0,104",
    "seite": "PDF 13 / Buch 460",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Doppler-Referenzwerte am gesunden Hundeherz (Tab. 22.26). Die Maximalgeschwindigkeiten ueber LVOT/Aorta und RVOT/Pulmonalarterie sind in der Literatur nicht konsistent; leicht erhoehte Werte sind nicht zwangslaeufig abnormal.",
    "zahlen": "cw: LVOT-Aorta < 1,8 (< 2) m/s; RVOT-Pulmonalarterie < 1,5 m/s. pw: Mitraleinstrom E 0,5-1 m/s, A 0,3-0,6 m/s, E:A 1-2; IVRT 40-80 ms; Trikuspidaleinstrom E 0,3-0,9 m/s, A 0,3-0,6 m/s",
    "seite": "PDF 13 / Buch 460",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Katze, harte Wanddickengrenzen unabhaengig von der Rasse: Septum- bzw. Hinterwanddicke unter der unteren Grenze ist mit hoher Wahrscheinlichkeit normal, oberhalb der oberen Grenze grundsaetzlich abnormal. Zusaetzlich Obergrenze fuer LA/Ao in der kurzen Achse.",
    "zahlen": "IVSd bzw. LVWd < 5 mm sehr wahrscheinlich normal; > 6 mm grundsaetzlich abnormal; LA/Ao (Kurzachse) soll 1,5 nicht ueberschreiten",
    "seite": "PDF 1 / Buch 461 (Datei 4)",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Haeggstroem-Index: masseabhaengige 95-%-Vorhersageintervalle fuer Rassekatzen aus einer sehr grossen Studienpopulation (19866 Katzen), weshalb die beim Hund beschriebene Unschaerfe hier kaum eine Rolle spielt. Eingeschlossen waren ueberwiegend Maine Coon, Norwegische Waldkatze, British Shorthair, Sibirische Katze, Ragdoll, Sphynx, Birma, Cornish Rex, Bengale, Devon Rex und Perser.",
    "zahlen": "n = 19866",
    "seite": "PDF 1 und 4 / Buch 461 und 464",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Katze, 95-%-Vorhersageintervalle nach Koerpermasse (Tab. 22.29, Auszug). Die Tabelle laeuft in 0,5-kg-Schritten von 1,5 bis 11,0 kg; die Verkuerzungsfraktion bleibt ueber alle Massen konstant.",
    "zahlen": "1,5 kg: IVSd 3,1 (2,3-4,0) mm, LVIDd 11,9 (9,5-15,0), LVWd 2,9 (2,2-3,8), IVSs 4,8 (3,5-6,7), LVIDs 6,4 (4,2-9,6), LVWs 4,8 (3,6-6,5), LA 7,7 (5,8-10,2), Ao 7,0 (5,5-8,8), LA/Ao 1,13 (0,85-1,40). 4,0 kg: IVSd 3,8 (2,8-4,9), LVIDd 15,4 (12,2-19,2), LVWd 3,7 (2,8-4,8), IVSs 6,0 (4,3-8,4), LVIDs 8,3 (5,5-12,6), LVWs 6,3 (4,6-8,5), LA 10,5 (7,9-13,9), Ao 9,1 (7,2-11,6), LA/Ao 1,15 (0,88-1,43). 11,0 kg: IVSd 4,6 (3,5-6,1), LVIDd 20,0 (16,0-25,0), LVWd 4,7 (3,5-6,2), IVSs 7,6 (5,4-10,6), LVIDs 10,8 (7,2-16,5), LVWs 8,1 (6,0-11,0), LA 14,3 (10,8-19,1), Ao 12,1 (9,6-15,3), LA/Ao 1,22 (0,94-1,50). FS durchgehend 45 % (28-62, ab 9,5 kg 28-63)",
    "seite": "PDF 2-3 / Buch 462-463",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Weitere Stuetzstellen derselben Katzentabelle fuer LVIDd (Mittelwert, 95-%-Intervall) in mm.",
    "zahlen": "2,0 kg 12,8 (10,2-16,0); 2,5 kg 13,6 (10,9-17,0); 3,0 kg 14,2 (11,4-17,8); 3,5 kg 14,8 (11,9-18,5); 4,5 kg 15,8 (12,7-19,8); 5,0 kg 16,3 (13,0-20,3); 5,5 kg 16,7 (13,4-20,9); 6,0 kg 17,1 (13,7-21,4); 6,5 kg 17,4 (14,0-21,8); 7,0 kg 17,8 (14,2-22,2); 7,5 kg 18,1 (14,5-22,6); 8,0 kg 18,4 (14,7-23,0); 8,5 kg 18,7 (15,0-23,4); 9,0 kg 19,0 (15,2-23,7); 9,5 kg 19,3 (15,4-24,0); 10,0 kg 19,5 (15,6-24,4); 10,5 kg 19,8 (15,8-24,7)",
    "seite": "PDF 2-3 / Buch 462-463",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Rassewerte Sphynx-Katze (Mittelwert, SD, Spannweite), n = 53, Koerpermasse 2-7,3 kg.",
    "zahlen": "IVSd 4,4 +/- 0,4 (3,2-5,2) mm; LVDd 15,2 +/- 1,6 (12,8-19,2); LVWd 4,2 +/- 0,6 (2,9-5,3); IVSs 7,5 +/- 1,1 (5,5-11,4); LVDs 7,2 +/- 1,5 (3,6-11,4); LVWs 7,8 +/- 1,0 (5,7-10,7); FS 53 +/- 7 % (36-67); LA/Ao 0,9 +/- 0,14 (0,56-1,17)",
    "seite": "PDF 4 / Buch 464",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Rassewerte Bengalkatze (95-%-Vorhersageintervalle nach Koerpermasse, drei Messmodi), n = 60, Koerpermasse 2,8-7,7 kg. Warnung der Autoren: die Intervalle sind sehr weit gefasst und ueberschreiten teils deutlich die 6-mm-Grenze, vermutlich wegen kleiner Studienpopulation; diastolische Werte von Septum und LV-Wand ueber 6 mm sind immer kritisch zu hinterfragen.",
    "zahlen": "2D-Kurzachse bei 3 kg / 7 kg: IVSd 3,4-5,5 / 4,1-6,6 mm; LVDd 12,3-17,6 / 14,7-21,2; LVWd 3,1-4,9 / 4,0-6,2; LVDs 7,1-11,6 / 7,9-12,8. 2D-Laengsachse 3 kg / 7 kg: IVSd 3,8-5,5 / 4,6-6,7; LVDd 12,3-17,3 / 14,3-20,3; LVWd 3,2-4,7 / 4,1-6,0; LVDs 6,1-11,7 / 6,4-12,1. M-Mode Kurzachse 3 kg / 7 kg: IVSd 3,6-5,6 / 4,3-6,7; LVDd 12,3-17,6 / 14,7-20,9; LVWd 3,2-5,0 / 4,3-6,6; LVDs 5,6-12,1 / 6,1-13,5. LAD 11,9-16,6 / 13,5-18,8",
    "seite": "PDF 5 / Buch 465",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Rassewerte Tuerkisch Van (Mittelwert, SD, Spannweite), n = 40, Koerpermasse 2,6-5,5 kg; nur zwei Messgroessen publiziert.",
    "zahlen": "IVSd 3,65 +/- 0,09 mm (2,9-5,3); LVWd 3,66 +/- 0,13 (2,4-6,0)",
    "seite": "PDF 5 / Buch 465",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Doppler-Referenzwerte am gesunden Katzenherz (Tab. 22.33).",
    "zahlen": "cw: LVOT-Aorta < 1,5 m/s; RVOT-Pulmonalarterie < 1,3 m/s. pw: Mitraleinstrom E 0,5-1 m/s, A 0,3-0,6 m/s; IVRT 37-55 (Einheit im Druck als m/s angegeben, gemeint ms); Trikuspidaleinstrom E 0,3-0,9 m/s, A 0,3-0,6 m/s",
    "seite": "PDF 6 / Buch 466",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "normwerte",
    "text": "Warnung zu den rassespezifischen Katzentabellen: die statistische Aufarbeitung der Quellstudien ist uneinheitlich, die angegebenen Intervalle sind Spannweiten und Standardabweichungen und duerfen nur als Richtwerte, nicht als Referenzintervalle verwendet werden. Der Wert 1,96 x Standardabweichung wurde von den Autoren ergaenzt.",
    "zahlen": "Mittelwert +/- 1,96 x SD umfasst 95 % der Population",
    "seite": "PDF 4 / Buch 464",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "formel",
    "text": "Schnellverfahren ueber die Randmarkierungen: die Anzahl der zwischen zwei Markierungen (10 cm) liegenden QRS-Komplexe wird bei 50 mm/s mit 30 multipliziert, um die Herzfrequenz pro Minute zu erhalten.",
    "zahlen": "HF [bpm] = QRS-Anzahl auf 10 cm x 30 (bei 50 mm/s)",
    "seite": "PDF-Seite 16 (Buchseite 3)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "formel",
    "text": "Bei laengeren Aufzeichnungen sollen die Komplexe vorzugsweise ueber 30 cm oder 60 cm gezaehlt werden. Je laenger die ausgezaehlte Strecke, desto kleiner der Fehler durch die respiratorische Sinusarrhythmie des Hundes.",
    "zahlen": "empfohlene Zaehlstrecken bei langen Streifen: 30 cm oder 60 cm",
    "seite": "PDF-Seite 16 (Buchseite 3)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "formel",
    "text": "Umrechnungstabelle Distanz/Zeit/Multiplikator bei 50 mm/s (Spalten der Buchtabelle: Schreibgeschwindigkeit, Distanz in cm, Zeit in s, Herzfrequenz): 5 cm = 1 s, QRS-Anzahl x 60; 10 cm = 2 s, x 30; 15 cm = 3 s, x 20.",
    "zahlen": "50 mm/s: 5 cm=1 s -> x60; 10 cm=2 s -> x30; 15 cm=3 s -> x20",
    "seite": "PDF-Seite 18 (Buchseite 5), Tabelle",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "formel",
    "text": "Umrechnungstabelle Distanz/Zeit/Multiplikator bei 25 mm/s: 5 cm = 2 s, QRS-Anzahl x 30; 10 cm = 4 s, x 15; 15 cm = 6 s, x 10.",
    "zahlen": "25 mm/s: 5 cm=2 s -> x30; 10 cm=4 s -> x15; 15 cm=6 s -> x10",
    "seite": "PDF-Seite 18 (Buchseite 5), Tabelle",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "formel",
    "text": "Als praktisches Standardvorgehen empfiehlt das Buch: bei 50 mm/s eine Strecke von 3 s, also 15 cm, am EKG-Papier markieren, die QRS-Komplexe darin zaehlen und mit 20 multiplizieren. Das Verfahren ist auch bei Arrhythmien anwendbar.",
    "zahlen": "15 cm bei 50 mm/s = 3 s; HF [bpm] = QRS x 20",
    "seite": "PDF-Seite 19 (Buchseite 6)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "formel",
    "text": "Bei regelmaessigem Herzrhythmus entstehen auch bei kurzer Zaehlstrecke keine wesentlichen Fehler. Belegendes Beispiel des Buches: Zaehlung ueber nur 2 s ergab 150 bpm, die tatsaechliche Frequenz betrug 140 bpm.",
    "zahlen": "Zaehlung ueber 2 s: berechnet 150 bpm vs. tatsaechlich 140 bpm",
    "seite": "PDF-Seite 19 (Buchseite 6), Bildunterschrift Abb. 3c",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "formel",
    "text": "Bei Arrhythmien, besonders bei niedriger Herzfrequenz, muss ueber laengere Distanzen gezaehlt werden, sonst entstehen signifikante Fehler. Belegendes Beispiel des Buches: je nach ausgewaehltem Kurvenabschnitt schwankte die berechnete Frequenz zwischen 90 und 135 bpm.",
    "zahlen": "Streubreite im Beispiel: 90 bis 135 bpm je nach Zaehlabschnitt",
    "seite": "PDF-Seite 19 (Buchseite 6), Bildunterschrift Abb. 3d",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "formel",
    "text": "Abgedruckter Ausschnitt der Tilley-Tabelle (Abb.9). Zeilen sind die Summe der Ableitung III, Spalten die Summe der Ableitung I, die Zellen enthalten die MEA in Grad. Die Zeile III=0,0 gibt fuer jedes I>0 den Wert 30 Grad; die Diagonale gleicher Werte gibt 60 Grad; Spalte I=0,0 gibt 90 Grad.",
    "zahlen": "Spalten (Summe Abl. I): 0,0 / 0,5 / 1,0 / 1,5 / 2,0 / 2,5 / 3,0 / 3,5 / 4,0 / 4,5 / 5,0 / 6,0 / 7,0. Zeilen (Summe Abl. III): III=0,0: 30 fuer alle I>0 | III=0,5: 90 60 49 44 41 39 38 37 36 35 35 34 33 | III=1,0: 90 71 60 53 49 46 44 42 41 40 39 38 37 | III=1,5: 90 76 67 60 55 52 49 47 45 44 43 41 39 | III=2,0: 90 79 71 65 60 56 53 51 49 47 46 44 42 | III=2,5: 90 81 74 68 64 60 57 54 52 51 49 47 45 | III=3,0: 90 82 76 71 67 63 60 57 55 53 52 49 47 | III=3,5: 90 83 78 73 69 66 63 60 58 56 54 51 49 | III=4,0: 90 84 79 75 71 68 65 62 60 58 56 53 51 | III=4,5: 90 85 80 76 73 69 67 64 62 60 58 55 53 | III=5,0: 90 85 81 77 74 71 68 66 64 62 60 57 55 | III=6,0: 90 86 82 79 76 73 71 69 67 65 63 60 57 | III=7,0: 90 87 83 81 78 75 73 71 69 67 65 63 60 | III=8,0: 90 87 84 82 79 77 75 73 71 69 68 65 62 | III=9,0: 90 87 85 82 80 78 76 74 73 71 69 67 64 | III=10,0: 90 88 85 83 81 79 77 76 74 72 (Rest abgeschnitten) | III=11,0: 90 88 86 84 82 80 78 (Rest abgeschnitten) | III=12,0 bis 14,0 nur angeschnitten",
    "seite": "PDF 25 (Buch 12), Abb.9",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "formel",
    "text": "Vertebral Heart Size (VHS): Herzhoehe (ventrale Kontur des linken Stammbronchus bis zum entferntesten Punkt der Herzspitze) und Herzbreite (maximale Breite im mittleren Herzdrittel, senkrecht zur Herzhoehe) werden jeweils ab Beginn des 4. Brustwirbels in Wirbelkoerperlaengen auf eine Nachkommastelle abgemessen und summiert.",
    "zahlen": "VHS = Hoehe [Wirbel] + Breite [Wirbel], angelegt ab Th4, eine Nachkommastelle",
    "seite": "PDF 62 = Buch 62",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "formel",
    "text": "Oximetrie-Formeln der Katheterdiagnostik: Sauerstoffgehalt [ml/l] = Sauerstoffsaettigung [%] x Haemoglobinkonzentration [g/l] x 1,34 [ml/g]; nach dem Fickschen Prinzip CO [l/min] = Sauerstoffaufnahme [ml/min] / (arterieller O2-Gehalt - venoeser O2-Gehalt) [ml/l]. Durchschnittlicher Fehler etwa 10 %.",
    "zahlen": "Faktor 1,34 ml O2 pro g Hb; Fehler ca. 10 %",
    "seite": "PDF 78 = Buch 78",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "formel",
    "text": "Shuntquotient aus Saettigungswerten: Qp/Qs = (S_A - S_MV) / (S_PV - S_PA) mit S_A systemische Arterie, S_MV Venenmischblut, S_PV Pulmonalvene, S_PA Pulmonalarterie. Bei reinen Links-Rechts-Shunts wird S_PV durch die Saettigung der systemischen Arterie ersetzt, bei reinen Rechts-Links-Shunts mit 98 % angesetzt.",
    "zahlen": "Qp/Qs = (S_A - S_MV)/(S_PV - S_PA); S_PV = 98 % bei R-L-Shunt",
    "seite": "PDF 78 = Buch 78",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "formel",
    "text": "Nuklearmedizinische Shuntquantifizierung: bei der first pass nuclear angiography errechnet sich Qp/Qs = A1 / (A1 - A2) aus der Flaeche des ersten (A1) und des zweiten Aktivitaets-Peaks (A2) ueber dem kaudalen Lungenfeld. Bei Rechts-Links-Shunts entspricht der Shuntanteil dem Quotienten aus extrapulmonaler Aktivitaet und Gesamtaktivitaet.",
    "zahlen": "Qp/Qs = A1/(A1 - A2)",
    "seite": "PDF 80 = Buch 80",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "formel",
    "text": "Frequenzbestimmung aus Kaestchen: bei 25 mm/s entspricht ein kleines Kaestchen (1,0 mm) 0,04 s. Man zaehlt die Kammerkomplexe auf einer Strecke von 150 mm (= 6 s) und multipliziert mit 10, um die Herzfrequenz pro Minute zu erhalten.",
    "zahlen": "25 mm/s: 1 mm = 0,04 s; 150 mm = 6 s; Anzahl x 10 = HF/min",
    "seite": "23",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "formel",
    "text": "Tabelle 4.2 gibt die Frequenzbestimmung fuer alle Papiergeschwindigkeiten an: 25 mm/s (1 Kaestchen 0,04 s, 150 mm = 6 s, x 10), 50 mm/s (0,02 s, 3 s, x 20), 100 mm/s (0,01 s, 1,5 s, x 40).",
    "zahlen": "25 mm/s: 0,04 s / 6 s / x10 | 50 mm/s: 0,02 s / 3 s / x20 | 100 mm/s: 0,01 s / 1,5 s / x40",
    "seite": "23",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "formel",
    "text": "Achsenbestimmung (modaler QRS-Vektor nach Detweiler 1984): die QRS-Summe der Ableitung I wird auf der x-Achse, die der Ableitung aVF auf der y-Achse eines Koordinatensystems eingetragen. Zur Summenbildung werden die negativen Amplitudenwerte (Q- und/oder S-Zacke) von der positiven R-Zacke abgezogen, unter Beachtung des Vorzeichens. In beiden Punkten wird eine Senkrechte errichtet, deren Schnittpunkt mit dem Nullpunkt verbunden wird; der Winkel dieser Linie zur Achse der Ableitung I ergibt den Frontalvektor.",
    "zahlen": "Summe = R minus (Q + S); x-Achse = Abl. I, y-Achse = aVF; Winkel gegen Abl.-I-Achse",
    "seite": "35",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "formel",
    "text": "Rechenbeispiel Abbildung 4.14: Ableitung I mit Q = minus 0,2 mV und R = plus 0,7 mV, Summe plus 0,3 mV; Ableitung aVF mit Q = minus 0,2 mV und R = plus 1,5 mV, Summe plus 1,3 mV; die elektrische Herzachse liegt danach bei plus 103 Grad.",
    "zahlen": "Abl. I: Q -0,2 mV, R +0,7 mV, Summe +0,3 mV; aVF: Q -0,2 mV, R +1,5 mV, Summe +1,3 mV; Achse +103 Grad",
    "seite": "35",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "formel",
    "text": "Ejektionsfraktion aus dem TM-Mode nach Teichholz: EF = (LVDd - LVDs) / LVDd x 100.",
    "zahlen": "EF [%] = (LVDd - LVDs) / LVDd x 100",
    "seite": "PDF 98 = Buchseite 98",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "formel",
    "text": "Volumenindices nach Teichholz: ESVI = 7 x (LVDs hoch 3) / (2,4 + LVDs) x 1/BSA; EDVI analog mit LVDd. Der Bruchstrich ist im Satz gesetzt, die Zuordnung wurde aus der Zeilenlage rekonstruiert.",
    "zahlen": "ESVI = 7 x LVDs^3 / (2,4 + LVDs) / BSA; EDVI = 7 x LVDd^3 / (2,4 + LVDd) / BSA",
    "seite": "PDF 98 = Buchseite 98",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "formel",
    "text": "Koerperoberflaeche nach dem Anhang in Kirk's Current Veterinary Therapy XIII (Bonagura 2000): BSA (m2) = 10,1 x KM(g) hoch 0,667 x 10 hoch -4.",
    "zahlen": "BSA [m2] = 10,1 x KM[g]^0,667 x 10^-4",
    "seite": "PDF 98 = Buchseite 98",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "formel",
    "text": "Vereinfachte Bernoulli-Gleichung zur Berechnung des Druckgradienten zwischen zwei Kompartimenten: delta p max = 4 x (V max zum Quadrat), Ergebnis in mmHg, V max als Stroemungsgeschwindigkeit. Auf Seite 134 wird dieselbe Formel als P = 4 x v^2 fuer den VSD-Druckgradienten genannt.",
    "zahlen": "dp[mmHg] = 4 x Vmax^2 (Vmax in m/s)",
    "seite": "PDF 100 und 134 = Buchseite 100, 134",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "formel",
    "text": "PISA-Methode zur Refluxberechnung: PISA = 2 x pi x r^2; Regurgitationsflussrate = PISA x V = 2 x pi x r^2 x V, mit V = Schwellengeschwindigkeit in cm/s und r = Jetdurchmesser in mm. Der Farbdoppler muss so eingestellt werden, dass an der Flussbeschleunigung durch Erreichen der Nyquistgrenze ein Farbumschlag entsteht.",
    "zahlen": "PISA = 2*pi*r^2; Flussrate = 2*pi*r^2*V; V in cm/s, r in mm",
    "seite": "PDF 100-101 = Buchseite 100-101",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "formel",
    "text": "Cornell-Index (Hund): Der gemessene M-Mode-Wert wird durch die mit einem messgroessenspezifischen Exponenten potenzierte Koerpermasse geteilt. Das Ergebnis ist masseunabhaengig und wird mit einem Vorhersageintervall verglichen.",
    "zahlen": "a = Y / M^b; Y = M-Mode-Wert (Text: cm), M = Koerpermasse in kg, b = messgroessenabhaengiger Exponent",
    "seite": "PDF-Seite 1 (Buchseite 445)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "formel",
    "text": "Haeggstroem-Index (Katze): baugleich zum Cornell-Index des Hundes, gemessener M-Mode-Wert geteilt durch die potenzierte Koerpermasse.",
    "zahlen": "a = Y / M^b; Y = M-Mode-Wert in mm; M = Koerpermasse; b = messgroessenabhaengiger Exponent",
    "seite": "PDF-Seite 1 (Buchseite 445)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "formel",
    "text": "Linksventrikulaere Verkuerzungsfraktion FS: Verhaeltnis der systolischen Verkuerzung zum enddiastolischen linksventrikulaeren Durchmesser, in Prozent.",
    "zahlen": "FS (%) = 100 x (LVDd - LVDs) / LVDd",
    "seite": "PDF-Seite 1 (Buchseite 445)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "formel",
    "text": "Modifizierte Bernoulli-Gleichung zur Umrechnung einer Dopplergeschwindigkeit in einen Druckgradienten.",
    "zahlen": "PG = 4 x (Vmax)^2",
    "seite": "PDF-Seite 2 (Buchseite 446)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "formel",
    "text": "TEI-Index (Index of Myocardial Performance) als Mass der globalen Herzfunktion; er verrechnet systolische und diastolische Zeitintervalle und laesst sich auf zwei gleichwertige Arten berechnen.",
    "zahlen": "TEI = (IVCT + IVRT) / LVET = (MCOT - LVET) / LVET; Normalwert 0,38 +/- 0,1",
    "seite": "PDF-Seite 2, Abb. 21.1 (Buchseite 446)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "formel",
    "text": "Definition der Zeitintervalle des TEI-Index: IVCT ist die isovolumetrische Kontraktionszeit vom Ende der A-Welle bis zum Beginn des Aortenauswurfs, IVRT die isovolumetrische Relaxationszeit vom Ende des Aortenauswurfs bis zum Beginn der E-Welle, MCOT die Zeit vom Ende der A-Welle bis zum Beginn der naechsten E-Welle und LVET die Dauer des Aortenauswurfs.",
    "zahlen": "IVCT, IVRT, MCOT, LVET (Zeitintervalle)",
    "seite": "PDF-Seite 2 (Buchseite 446)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "formel",
    "text": "Linksventrikulaere Ejektionsfraktion nach Simpson: prozentualer Anteil des Blutvolumens, den die linke Kammer waehrend der Systole verlaesst. Sie wird nur beim Hund gemessen.",
    "zahlen": "EF (%) = 100 x (EDV - ESV) / EDV; normal 50-65 %; < 40 % spricht definitiv fuer eine systolische Funktionsstoerung",
    "seite": "PDF-Seite 2 (Buchseite 446)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "formel",
    "text": "Volumenindizes beziehen das Ventrikelvolumen auf die Koerperoberflaeche. Unter Normalwerte ist im Buch nur die Angabe zum endsystolischen Volumenindex gedruckt.",
    "zahlen": "EDVI = EDV / KOF; ESVI = ESV / KOF; KOF in m2; Normalwert-Angabe im Buch: ESVI > 30 ml/m2",
    "seite": "PDF-Seite 2 (Buchseite 446)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "formel",
    "text": "Effektiver Oeffnungsflaechenindex (indexed effective orifice area) zur Graduierung einer Aortenstenose aus Doppler-Volumen-Zeit-Integralen und der Pulmonalklappenoeffnungsflaeche, bezogen auf die Koerperoberflaeche.",
    "zahlen": "Indexed EOA = (VTIpa x CSApv / VTIao) / KOF; Normalwerte: Hund 1,08 +/- 0,51; adulte Tiere 2,22 +/- 0,76 cm2/m2; Welpen 2,42 +/- 0,85 cm2/m2",
    "seite": "PDF-Seite 2 (Buchseite 446)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "formel",
    "text": "Koerperoberflaeche von Hund und Katze aus der Koerpermasse in Gramm; der Faktor K unterscheidet die beiden Tierarten.",
    "zahlen": "KOF (m2) = (K x KM)^(2/3) / 10^4; KM in g; K = 10,1 fuer Hunde, K = 10 fuer Katzen",
    "seite": "PDF-Seite 3 (Buchseite 447)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "formel",
    "text": "Tabellierte Koerperoberflaeche fuer Hund und Katze im Bereich 1 bis 10 kg; die Werte beider Arten sind fast deckungsgleich.",
    "zahlen": "1 kg 0,10/0,10; 2 kg 0,16/0,16; 3 kg 0,21/0,21; 4 kg 0,25/0,25; 5 kg 0,30/0,29; 6 kg 0,33/0,33; 7 kg 0,37/0,37; 8 kg 0,40/0,40; 9 kg 0,44/0,43; 10 kg 0,47/0,46 m2 (Hund/Katze)",
    "seite": "PDF-Seite 3, Tab. 21.3 (Buchseite 447)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "formel",
    "text": "Tabellierte Koerperoberflaeche des Hundes ueber 10 kg; fuer die Katze sind oberhalb 10 kg keine Werte angegeben.",
    "zahlen": "15 kg 0,61; 20 kg 0,74; 25 kg 0,86; 30 kg 0,98; 35 kg 1,08; 40 kg 1,18; 45 kg 1,28; 50 kg 1,37; 55 kg 1,46; 60 kg 1,55; 65 kg 1,63; 70 kg 1,72 m2",
    "seite": "PDF-Seite 3, Tab. 21.3 (Buchseite 447)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "formel",
    "text": "Frequenzformel aus der Kaestchenzahl (Tab. 10.3): Herzfrequenz = Anzahl der Komplexe auf der Zaehlstrecke mal Faktor X, mit X = 4 bei 10 mm/s, X = 10 bei 25 mm/s, X = 20 bei 50 mm/s und X = 40 bei 100 mm/s. Die Kopfzeile der Tabelle nennt als Zaehlstrecke 10 cm, die Faktoren und der Fliesstext passen jedoch zu 150 mm (15 cm).",
    "zahlen": "HF = Komplexe x X; X = 4 / 10 / 20 / 40 bei 10 / 25 / 50 / 100 mm/s; Zaehlstrecke laut Text 15 cm",
    "seite": "PDF 11 (Buch 149)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "formel",
    "text": "Praktisches Vorgehen zur Frequenzbestimmung: Ableitung II nach Einthoven bei 50 mm/s Papiervorschub; bei gleichmaessigem Rhythmus alle vollstaendigen Komplexe ueber 15 cm (= 3 s) auszaehlen und die Anzahl mit 20 multiplizieren; das ergibt die Schlaege pro Minute.",
    "zahlen": "15 cm = 3 s bei 50 mm/s; HF = Komplexe x 20",
    "seite": "PDF 11 (Buch 149)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "formel",
    "text": "Bei starken Rhythmusabweichungen (Pausen, Tachykardiephasen) soll die Herzfrequenz ueber eine ganze Minute ausgewertet werden: Papiervorschub auf 10 mm/s (Rhythmusstreifen) stellen und die Komplexe auf 60 cm Papier zaehlen.",
    "zahlen": "10 mm/s; 60 cm = 60 s",
    "seite": "PDF 11 (Buch 149)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "formel",
    "text": "Tab. 10.3 Frequenzformel: Herzfrequenz = Anzahl Komplexe auf 10 cm EKG-Papier multipliziert mit X, wobei X = 4 bei 10 mm/s, X = 10 bei 25 mm/s, X = 20 bei 50 mm/s und X = 40 bei 100 mm/s.",
    "zahlen": "HF = Komplexe auf 10 cm x X; X = 4 / 10 / 20 / 40",
    "seite": "PDF 11 / Buch 149",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "formel",
    "text": "Herzfrequenzbestimmung bei gleichmaessigem Rhythmus: in Ableitung II nach Einthoven bei 50 mm/s Papiervorschub alle vollstaendigen Komplexe ueber eine bestimmte Strecke auszaehlen (z. B. 15 cm = 3 s) und die Anzahl mit 20 multiplizieren.",
    "zahlen": "15 cm bei 50 mm/s = 3 s; Anzahl x 20 = Schlaege/min",
    "seite": "PDF 11 / Buch 149",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "formel",
    "text": "Herzfrequenzbestimmung bei starken Abweichungen vom Rhythmus (Pausen, Tachykardiephasen): ueber eine ganze Minute auswerten, dazu Papiervorschub auf 10 mm/s stellen und die Komplexe auf 60 cm Papier zaehlen.",
    "zahlen": "10 mm/s; 60 cm = 60 s",
    "seite": "PDF 11 / Buch 149",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "formel",
    "text": "Sphaerizitaetsindex: enddiastolisches Verhaeltnis von Ventrikellaenge (Mitralklappenebene bis Ventrikelspitze) zum maximalen Ventrikeldurchmesser parallel zur Mitralklappenebene. Je naeher das Verhaeltnis an 1 liegt, desto staerker die Volumenueberladung (Ventrikel wird kugelfoermig).",
    "zahlen": "Sphaerizitaetsindex = Laenge/Durchmesser; soll in jedem Fall > 1,65 sein",
    "seite": "PDF 11 / Buch 105",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "formel",
    "text": "Flaechenmessung nach Simpson: Ventrikelkontur enddiastolisch und endsystolisch umfahren; ein Algorithmus errechnet daraus Ventrikelvolumen und Auswurffraktion (EF = prozentualer Anteil des ausgeworfenen Volumens am enddiastolischen Volumen).",
    "zahlen": "EF = (EDV - ESV)/EDV",
    "seite": "PDF 11-12 / Buch 105-106",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "formel",
    "text": "Wird das Ventrikelvolumen auf die Koerperoberflaeche bezogen, ergibt sich der diastolische bzw. systolische Volumenindex EDVI bzw. ESVI.",
    "zahlen": "EDVI = EDV/KOF; ESVI = ESV/KOF",
    "seite": "PDF 12 / Buch 106",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "formel",
    "text": "Cornell-Index: Koerpermasse und Messwert werden mit dem fuer die jeweilige Messgroesse vorgesehenen Exponenten in die Cornell-Formel (Buch S. 445) eingesetzt; das Ergebnis ist masseunabhaengig. Indizes innerhalb des 90-Prozent-Vorhersageintervalls gelten als normal, ausserhalb des 95-Prozent-Intervalls als abnormal, dazwischen liegt ein Graubereich. Bei kleinen Hunden (Neigung zu degenerativer Mitralklappenerkrankung) ist das 90-Prozent-Intervall geeigneter.",
    "zahlen": "90-%-Vorhersageintervall = normal; ausserhalb 95-%-Intervall = abnormal",
    "seite": "PDF 1 / Buch 448",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "formel",
    "text": "Beim Beagle sind die Ventrikeldurchmesser signifikant von der Koerpermasse abhaengig; das Buch gibt zwei Regressionsformeln an (Ergebnis in mm, Koerpermasse in kg).",
    "zahlen": "LVDd = 1,025 x Koerpermasse + 17,12; LVDs = 0,729 x Koerpermasse + 9,22",
    "seite": "PDF 3 / Buch 450",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "achse",
    "text": "Die mittlere elektrische Herzachse (MEA) liefert zwei Informationen: Hinweis auf eine ventrikulaere Vergroesserung und Beurteilung von Stoerungen der intraventrikulaeren Erregungsausbreitung.",
    "zahlen": "",
    "seite": "PDF 24 (Buch 11)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "achse",
    "text": "Das Buch nennt vier Wege zur Achsenbestimmung: (1) Ableitung mit der hoechsten positiven R-Zacke, (2) isoelektrische Ableitung, (3) Vektorberechnung aus zwei im 90-Grad-Winkel zueinander stehenden Ableitungen, (4) Tilley-Tabelle. Die Tilley-Tabelle wird als genaueste, einfachste und universell gueltige Methode bezeichnet.",
    "zahlen": "",
    "seite": "PDF 24 (Buch 11)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "achse",
    "text": "Vorgehen nach Tilley: die absoluten Werte von Ableitung I und Ableitung III ermitteln, auf x-Achse bzw. y-Achse der Tabelle aufsuchen und den MEA-Wert am Schnittpunkt ablesen.",
    "zahlen": "x-Achse = Summe Ableitung I, y-Achse = Summe Ableitung III",
    "seite": "PDF 24 (Buch 11)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "achse",
    "text": "So wird der Einzelwert je Ableitung gebildet: die positiven Kaestchen des QRS-Komplexes zaehlen, die negativen Kaestchen zaehlen, und beide vorzeichenrichtig addieren. Buchbeispiel Ableitung I: R = zehn positive Kaestchen, Q = zwei negative, S = vier negative, also (+10) + (-6) = +4.",
    "zahlen": "Beispiel Ableitung I: +10 (R) - 2 (Q) - 4 (S) = +4 Kaestchen",
    "seite": "PDF 24 (Buch 11)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "achse",
    "text": "Durchgerechnetes Buchbeispiel: Ableitung I ergibt +4, Ableitung III ergibt +8. Die beiden Koordinaten schneiden sich in der Tilley-Tabelle bei +71 Grad; das ist die MEA dieses Patienten.",
    "zahlen": "I = +4, III = +8 -> MEA = +71 Grad",
    "seite": "PDF 25 (Buch 12), Abb.9",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "achse",
    "text": "Das hexaaxiale System ist ein Kreis mit sechs Achsen, dessen Mittelpunkt schematisch ueber dem Herzen des Patienten liegt und der in Winkelintervallen von 30 Grad in zwoelf Sektoren eingeteilt ist. 0 Grad liegt am rechten Schnittpunkt von Kreishalbierender und Umfang. Die obere Kreishaelfte traegt die Sektoren -30 bis -180 Grad, die untere die entsprechenden positiven Werte. -180 Grad faellt mit +180 Grad zusammen und bleibt immer ohne Vorzeichen.",
    "zahlen": "12 Sektoren zu je 30 Grad; 0 Grad rechts; oben negativ (-30 bis -180), unten positiv; 180 Grad vorzeichenlos",
    "seite": "PDF 25 (Buch 12), Abb.10",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "achse",
    "text": "Normbereich der mittleren elektrischen Herzachse.",
    "zahlen": "Hund +40 Grad bis +100 Grad; Katze 0 Grad bis +160 Grad",
    "seite": "PDF 26 (Buch 13)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "achse",
    "text": "Begriffsdefinition: Linksachsenabweichung ist die Abweichung der elektrischen Herzachse nach links, Rechtsachsenabweichung die Abweichung nach rechts. Beide Begriffe werden spaeter als Kriterium fuer Links- bzw. Rechtsherzvergroesserung wieder aufgegriffen.",
    "zahlen": "",
    "seite": "PDF 26 (Buch 13)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "achse",
    "text": "Normale elektrische Herzachse beim Hund laut Normwerttabelle: +40 Grad bis +100 Grad.",
    "zahlen": "+40 Grad bis +100 Grad",
    "seite": "PDF 2 (gedruckt 91)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "achse",
    "text": "Eine Rechtsverschiebung der Herzachse wird von vielen Autoren erst dann als diagnostisch bedeutsam angesehen, wenn der Wert +160 Grad uebersteigt - obwohl die Grenze des normalen Achsenbereichs schon bei +100 Grad liegt. Fuer die Software heisst das zwei Schwellen: Auffaelligkeit ab +100 Grad, klinische Warnung ab +160 Grad.",
    "zahlen": "Normgrenze +100 Grad; Warnschwelle +160 Grad",
    "seite": "PDF 1 (gedruckt 90)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "achse",
    "text": "Fallbeispiel einer Rechtsverschiebung: elektrische Herzachse +139 Grad in der Frontalebene bei sonst normalem Sinusrhythmus und Herzfrequenz 100 bpm, zusammen mit ueberhoehten T-Wellen.",
    "zahlen": "Achse +139 Grad; HF 100 bpm; P 0,04 s x 0,2 mV; PR 0,10 s; QRS 0,05 s; R 1,2 mV; QT 0,18 s; ST normal; T -0,6 mV (> 25 % der R-Hoehe)",
    "seite": "PDF 1 (gedruckt 90)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "achse",
    "text": "Normale elektrische Herzachse beim Hund: +40 Grad bis +100 Grad.",
    "zahlen": "+40 Grad bis +100 Grad",
    "seite": "PDF-S. 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23 (Buchseiten 189-211)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "achse",
    "text": "Normbereich der elektrischen Herzachse in der Frontalebene beim Hund.",
    "zahlen": "+40 Grad bis +100 Grad",
    "seite": "PDF 28 (Buch 117), wiederholt auf allen Frageseiten",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "achse",
    "text": "Eine elektrische Herzachse von -14 Grad wird als Linksachsenabweichung bezeichnet. Das liegt unterhalb der Normuntergrenze von +40 Grad.",
    "zahlen": "-14 Grad = Linksachsenabweichung; Norm +40 bis +100 Grad",
    "seite": "PDF 45 (Buch 134)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "achse",
    "text": "Definition der elektrischen Herzachse: sie wird durch die Hauptausbreitung der elektrischen Erregung in den Herzkammern bestimmt und stellt den Summationsvektor aller anfallenden Vektoren waehrend eines kompletten Herzzyklus dar. Eine Rechenvorschrift zur Bestimmung wird nicht angegeben.",
    "zahlen": "",
    "seite": "PDF 45 (Buch 134)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "achse",
    "text": "Zu einer Verschiebung der elektrischen Herzachse kommt es bei einer Vergroesserung der Ventrikel oder bei einer Stoerung der Erregungsausbreitung im ventrikulaeren Myokard.",
    "zahlen": "",
    "seite": "PDF 45 (Buch 134)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "achse",
    "text": "Warnung gegen Ueberbewertung: die Herzachse ist ein recht unspezifischer Parameter, der auch bei gesunden Tieren haeufig veraendert ist. Ihre klinische Bedeutung bleibt gering, solange keine weiteren Veraenderungen die Verdachtsdiagnose stuetzen. Eine Achsenabweichung allein sollte deshalb keinen Alarm ausloesen.",
    "zahlen": "",
    "seite": "PDF 45 (Buch 134)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "achse",
    "text": "Die elektrische Herzachse liegt beim Hund normal zwischen +40 Grad und +100 Grad.",
    "zahlen": "+40 Grad bis +100 Grad",
    "seite": "PDF 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45 (Buch 213-233)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "achse",
    "text": "Tabelle 4.6, normaler Frontalvektor (elektrische Herzachse): Hund +40 Grad bis +100 Grad, Katze 0 Grad bis +160 Grad.",
    "zahlen": "Hund +40 bis +100 Grad; Katze +0 bis +160 Grad",
    "seite": "30",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "achse",
    "text": "Rechtsachsenabweichungen infolge rechtsventrikulaerer Vergroesserung finden sich ueberwiegend bei kongenitalen kardiovaskulaeren Erkrankungen, beim Rechtsschenkelblock und beim Myokardinfarkt; bei erworbenen rechtsherzbelastenden Fehlern ist die Rechtsverlagerung oft weniger deutlich oder gar nicht erkennbar.",
    "zahlen": "",
    "seite": "36",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "achse",
    "text": "Linksachsenabweichungen koennen bei linksventrikulaerer Vergroesserung, beim linksanterioren Hemiblock allein oder in Kombination mit einem Rechtsschenkelblock bei der hypertrophen Kardiomyopathie sowie beim Myokardinfarkt auftreten.",
    "zahlen": "",
    "seite": "36",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "achse",
    "text": "Fuer dieselbe Katze wird der Frontalvektor mit +118 Grad angegeben. Die Achse wird im Buch als 'Frontalvektor' in Grad benannt.",
    "zahlen": "Frontalvektor +118 Grad",
    "seite": "PDF 139 = Buchseite 139 (Abb. 9.3a)",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "achse",
    "text": "Beim persistierenden AV-Kanal sind Abweichungen der elektrischen Herzachse in der Frontalebene nach rechts und kranial von -90 Grad bis -180 Grad typisch; selten weicht sie nach links und kranial ab.",
    "zahlen": "Frontalachse -90 Grad bis -180 Grad (rechts/kranial)",
    "seite": "PDF 140 = Buchseite 140",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "achse",
    "text": "Beim VSD mit Rechts-Links-Shunt (Eisenmenger-Reaktion) finden sich Hinweise auf Rechtsherzbelastung und eine Rechtsabweichung des Frontalvektors.",
    "zahlen": "",
    "seite": "PDF 138 = Buchseite 138",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "p-welle",
    "text": "Die P-Welle entsteht durch die Erregungsausbreitung in den Vorhoefen. Sie besteht in der Regel aus einem kleinen, glatten, runden Bogen mit kleiner Amplitude und bleibt in Ableitung II auf einer Seite der isoelektrischen Linie (positiv, monophasisch). Sie kann aber auch biphasisch (positiv und negativ) sein oder positiv mit einer zentralen Eindellung.",
    "zahlen": "",
    "seite": "PDF 27 (Buch 14)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "p-welle",
    "text": "Die Buch-Bildunterschrift rechnet die Grenzwerte in Kaestchen um: beim Hund soll die P-Welle 0,04 s (entspricht 2 mm) und 0,4 mV (entspricht 4 mm) nicht uebersteigen. Aus 0,04 s = 2 mm folgt der Bezug 50 mm/s, aus 0,4 mV = 4 mm der Bezug 10 mm/mV.",
    "zahlen": "Hund: 0,04 s = 2 mm (bei 50 mm/s), 0,4 mV = 4 mm (bei 1 cm = 1 mV)",
    "seite": "PDF 27 (Buch 14), Abb.12b",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "p-welle",
    "text": "Normale P-Welle Hund laut Normwerttabelle: Breite 0,04 s, Hoehe 0,4 mV. Die Tabelle nennt beide Werte als Obergrenze, nicht als Spanne.",
    "zahlen": "P-Breite 0,04 s; P-Hoehe 0,4 mV",
    "seite": "PDF 2 (gedruckt 91)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "p-welle",
    "text": "Normale P-Welle beim Hund: Breite 0,04 s, Hoehe 0,4 mV.",
    "zahlen": "Breite 0,04 s; Hoehe 0,4 mV",
    "seite": "PDF-S. 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23 (Buchseiten 189-211)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "p-welle",
    "text": "Normwerte der P-Welle beim Hund, getrennt nach Breite und Hoehe.",
    "zahlen": "Breite 0,04 s; Hoehe 0,4 mV",
    "seite": "PDF 28 (Buch 117), wiederholt auf allen Frageseiten",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "p-welle",
    "text": "Bei verlaengerter P-Dauer kann eine zentrale Eindellung der P-Welle auftreten. Sie ist aber nicht die Regel: haeufiger zeigt das P-mitrale keine Eindellung. Die Eindellung darf deshalb nicht als notwendiges Kriterium verlangt werden.",
    "zahlen": "",
    "seite": "PDF 43 (Buch 132)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "p-welle",
    "text": "Wichtige Einschraenkung fuer jede automatische P-Bewertung: die P-Wellen neigen zu groesserer Amplitude, je hoeher die Herzfrequenz ist. Bei hoher Frequenz ist ein erhoehtes P deshalb kein aussagekraeftiger Befund.",
    "zahlen": "",
    "seite": "PDF 37 (Buch 126)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "p-welle",
    "text": "Die P-Welle des Hundes darf normal 0,04 s breit und 0,4 mV hoch sein. Beide Werte werden in der Normwerttabelle als Obergrenzen gefuehrt.",
    "zahlen": "P-Breite 0,04 s; P-Hoehe 0,4 mV",
    "seite": "PDF 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45 (Buch 213-233)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "p-welle",
    "text": "Die P-Welle entsteht durch Depolarisation beider Vorhoefe; der Anfangsteil repraesentiert das rechte, der zweite Anteil das linke Atrium. Die Vorhofrepolarisation ist im Oberflaechen-EKG normalerweise nicht erkennbar, weil sie vom hoeheramplitudigen QRS-Komplex ueberdeckt wird.",
    "zahlen": "",
    "seite": "26",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "p-welle",
    "text": "In den Ableitungen II und III sowie in den Brustwandableitungen ist die P-Welle in Inspiration gewoehnlich positiv; in Exspiration kann sie in Ableitung III und CV5RL auch negativ werden. Herzfrequenz und Atmung koennen physiologisch zu Kerbungen und wechselnden Amplituden fuehren.",
    "zahlen": "",
    "seite": "26",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "p-welle",
    "text": "Tabelle 4.5: unregelmaessige oder periodisch veraenderte P-Wellen (gesplittert, gekerbt, doppelhoeckrig, ueberhoeht, erniedrigt, verbreitert, biphasisch) kommen bei rechts-/linksseitiger Vorhofbelastung, intraatrialen Erregungsausbreitungsstoerungen (z. B. ASD), ektopem Erregungsursprung und elektrischem Alternans vor.",
    "zahlen": "",
    "seite": "26",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "p-welle",
    "text": "Negative P-Wellen in Ableitung II sprechen fuer wandernden Schrittmacher, AV-Extrasystolen oder AV-Ersatzrhythmus.",
    "zahlen": "",
    "seite": "26",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "p-welle",
    "text": "Nicht erkennbare P-Wellen, weil Vorhof- und Kammererregung zusammenfallen, sprechen fuer AV-Knotenrhythmus oder AV-Dissoziation. Eine Verschmelzung von P- und T-Wellen ist bei Sinustachykardie und bei AV-Block 1. Grades moeglich.",
    "zahlen": "",
    "seite": "26",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "p-welle",
    "text": "Vollstaendig fehlende P-Wellen (fehlende Sinusfunktion) kommen vor bei Vorhofstillstand, hochgradiger Hyperkaliaemie, Vorhofflimmern/-flattern, SA-Block und vor Extrasystolen.",
    "zahlen": "",
    "seite": "26",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "p-welle",
    "text": "Beispiel P mitrale: Hund mit Mitralinsuffizienz bei chronisch degenerativer Klappenerkrankung, breite P-Wellen bis 0,06 s, Sinustachykardie HF 220/min, P-Welle stoesst an die T-Welle des vorausgehenden Komplexes, ST-Streckensenkung 0,2 mV; 25 mm/s, Eichung 1 cm = 1 mV.",
    "zahlen": "P bis 0,06 s; HF 220/min; ST-Senkung 0,2 mV; 25 mm/s; 1 cm = 1 mV",
    "seite": "27",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "p-welle",
    "text": "Steckbrief P biatriale (P kardiale): gleichzeitig ueberhoehte und verbreiterte P-Wellen, Kerbung und/oder Doppelgipfeligkeit moeglich; Kombination aus P mitrale und P pulmonale bei Ueberlastung beider Vorhoefe.",
    "zahlen": "",
    "seite": "28",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "p-welle",
    "text": "Zeichen einer biatrialen Vergroesserung beim persistierenden AV-Kanal aeussern sich als gleichzeitig ueberhoehte UND verbreiterte P-Wellen. Grenzwerte in mV oder ms werden an dieser Stelle nicht genannt.",
    "zahlen": "",
    "seite": "PDF 140 = Buchseite 140",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "p-welle",
    "text": "Die spaetdiastolische A-Welle des Mitraleinstroms tritt zeitgleich mit der P-Welle im EKG auf. Damit laesst sich die Vorhofkontraktion im Dopplerprofil ueber das EKG zuordnen.",
    "zahlen": "",
    "seite": "PDF 99 = Buchseite 99",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "p-welle",
    "text": "Normale P-Wellen-Hoehe in Ableitung II: Hund + 0,4 mV, Katze + 0,2 mV.",
    "zahlen": "P-Hoehe Hund + 0,4 mV; Katze + 0,2 mV",
    "seite": "PDF 9 (Buch 147)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "p-welle",
    "text": "Normale P-Wellen-Breite in Ableitung II: Hund 0,04 s (grosse Hunde 0,05 s), Katze 0,04 s.",
    "zahlen": "P-Breite Hund 0,04 s (gross 0,05 s); Katze 0,04 s",
    "seite": "PDF 9 (Buch 147)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "p-welle",
    "text": "Steckbrief normale P-Welle: in allen 3 Ableitungen positiv, muss in mindestens einer Ableitung sichtbar sein; Hund Hoehe + 0,4 mV und Breite 0,04 s (grosse Hunde 0,05 s); Katze Hoehe + 0,2 mV und Breite 0,04 s.",
    "zahlen": "Hund + 0,4 mV / 0,04 s (gross 0,05 s); Katze + 0,2 mV / 0,04 s",
    "seite": "PDF 14 (Buch 152)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "p-welle",
    "text": "Bei der Beurteilung der P-Welle ist auf Formveraenderungen in Hoehe und Breite und auf Kerbungen zu achten sowie auf das Verhaeltnis zu den QRS-Komplexen: vor jedem QRS-Komplex eine P-Welle mit normalem und gleichbleibendem PQ-Abstand und nach jeder P-Welle ein QRS-Komplex mit normalem und gleichbleibendem PQ-Abstand.",
    "zahlen": "",
    "seite": "PDF 14 (Buch 152)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "p-welle",
    "text": "Normalkonfiguration der P-Welle in Ableitung II bei Vorschub 50 mm/s und Amplitude 10 mm/mV: Hund Dauer maximal 0,04 s (Riesenrassen maximal 0,05 s) und Hoehe maximal 0,4 mV; Katze Dauer maximal 0,04 s und Hoehe maximal 0,2 mV. Das abgebildete normale P des Hundes misst 0,3 mV bei 0,04 s.",
    "zahlen": "Hund max. 0,04 s / 0,4 mV (Riesenrassen 0,05 s); Katze max. 0,04 s / 0,2 mV; Beispiel 0,3 mV bei 0,04 s",
    "seite": "PDF 16 (Buch 154)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "p-welle",
    "text": "Tab. 10.5 Formveraenderungen der positiven P-Welle: breit gleich P-mitrale bedeutet Vorhofvergroesserung links; hoch gleich P-pulmonale bedeutet Vorhofvergroesserung rechts; hoch und breit gleich P-kardiale bedeutet beidseitige Vorhofvergroesserung.",
    "zahlen": "",
    "seite": "PDF 22 (Buch 160)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "p-welle",
    "text": "Tab. 10.5: periodisch ungleiche P-Wellenhoehe (positiv oder isoelektrisch) spricht fuer einen wandernden Schrittmacher (physiologisch beim Hund) oder polytope SVES; eine negative P-Welle spricht fuer retrograde Erregung, also AV- oder AV-nahe supraventrikulaere Extrasystolen.",
    "zahlen": "",
    "seite": "PDF 22 (Buch 160)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "p-welle",
    "text": "Ladungen, die auf eine positiv gepolte Elektrode zulaufen, werden in der EKG-Ableitung als positiver Ausschlag oberhalb der Grundlinie dargestellt. Deshalb ist die P-Welle bei Sinusursprung immer positiv.",
    "zahlen": "",
    "seite": "PDF 1-2 / Buch 139-140",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "p-welle",
    "text": "Messung der P-Welle: Mit dem Stechzirkel kann man von einer P-Welle zur naechsten gehen, um schnell zu erfassen, ob Unregelmaessigkeiten im Rhythmus vorliegen.",
    "zahlen": "",
    "seite": "PDF 14 / Buch 152",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "p-welle",
    "text": "Steckbrief normale P-Welle: in allen 3 Ableitungen positiv; muss in mindestens einer Ableitung sichtbar sein. Hund Hoehe +0,4 mV, Breite 0,04 s (grosse Hunde 0,05 s). Katze Hoehe +0,2 mV, Breite 0,04 s.",
    "zahlen": "Hund +0,4 mV / 0,04 s (gross 0,05 s); Katze +0,2 mV / 0,04 s",
    "seite": "PDF 14 / Buch 152",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "p-welle",
    "text": "Bei der Beurteilung der P-Welle ist zu achten auf Formveraenderungen in Hoehe und Breite und das Vorliegen von Kerbungen sowie auf das Verhaeltnis zu den QRS-Komplexen: vor jedem QRS eine P-Welle mit normalem und gleichbleibendem PQ-Abstand, nach jeder P-Welle ein QRS mit normalem und gleichbleibendem PQ-Abstand.",
    "zahlen": "",
    "seite": "PDF 14 / Buch 152",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "p-welle",
    "text": "Abb. 10.18 (Normalkonfiguration der P-Welle), Maszstab Vorschub 50 mm/s und Amplitude 10 mm/mV; Beispiel eines normalen P beim Hund: 0,3 mV Hoehe und 0,04 s Dauer. Grenzwerte: Hund Dauer max. 0,04 s (max. 0,05 s Riesenrassen), Hoehe max. 0,4 mV; Katze Dauer max. 0,04 s, Hoehe max. 0,2 mV.",
    "zahlen": "Beispiel 0,3 mV / 0,04 s; Hund max 0,04 s (Riesen 0,05 s) und 0,4 mV; Katze max 0,04 s und 0,2 mV; 50 mm/s, 10 mm/mV",
    "seite": "PDF 16 / Buch 154",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "p-welle",
    "text": "Tab. 10.5: Periodisch ungleiche P-Wellenhoehe bedeutet wandernder Schrittmacher (physiologisch beim Hund) oder polytope SVES.",
    "zahlen": "",
    "seite": "PDF 22 / Buch 160",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "p-welle",
    "text": "Tab. 10.5: Eine negative P-Welle bedeutet retrograde Erregung, also AV-nahe supraventrikulaere Extrasystolen (SVES).",
    "zahlen": "",
    "seite": "PDF 22 / Buch 160",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qrs",
    "text": "Der QRS-Komplex ist Ausdruck der Erregungsausbreitung im Ventrikelmyokard. Definitionen: die Q-Zacke ist die erste Zacke mit negativem Ausschlag und geht der R-Zacke voraus; die R-Zacke ist in Ableitung II die erste positive Zacke des Komplexes; die S-Zacke folgt der positiven R-Zacke und hat negativen Ausschlag.",
    "zahlen": "",
    "seite": "PDF 28 (Buch 15)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qrs",
    "text": "Nicht immer sind alle Zacken vorhanden; am haeufigsten fehlt die Q- oder die S-Zacke oder beide. Ist keine R-Zacke vorhanden und die erste Bewegung im Komplex die Q-Zacke, spricht man von QS-Zacke bzw. QS-Komplex.",
    "zahlen": "",
    "seite": "PDF 28 (Buch 15)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qrs",
    "text": "Nomenklaturregel: Zacken werden mit Grossbuchstaben bezeichnet, es sei denn, ihre Amplitude ist kleiner als 0,5 mV - dann Kleinbuchstabe. Daraus ergeben sich Bezeichnungen wie QRS, qRS, QrS, QRs, RS, QS, QR, rS, qR, Rs, Qr.",
    "zahlen": "Schwelle Gross-/Kleinbuchstabe: 0,5 mV",
    "seite": "PDF 28 (Buch 15), Abb.13",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qrs",
    "text": "Normale QRS-Dauer Hund laut Normwerttabelle: bis zu 0,06 s, bei kleinen Rassen bis 0,05 s.",
    "zahlen": "QRS bis 0,06 s; kleine Rassen bis 0,05 s",
    "seite": "PDF 2 (gedruckt 91)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qrs",
    "text": "Normale R-Zacken-Hoehe Hund laut Normwerttabelle: bis zu 3 mV, bei kleinen Rassen bis 2,5 mV.",
    "zahlen": "R bis 3,0 mV; kleine Rassen bis 2,5 mV",
    "seite": "PDF 2 (gedruckt 91)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qrs",
    "text": "Normale QRS-Dauer beim Hund: bis zu 0,06 s; bei kleinen Rassen bis 0,05 s.",
    "zahlen": "bis 0,06 s; kleine Rassen bis 0,05 s",
    "seite": "PDF-S. 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23 (Buchseiten 189-211)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qrs",
    "text": "Normale R-Zacken-Amplitude beim Hund: bis zu 3 mV; bei kleinen Rassen bis 2,5 mV.",
    "zahlen": "bis 3 mV; kleine Rassen bis 2,5 mV",
    "seite": "PDF-S. 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23 (Buchseiten 189-211)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qrs",
    "text": "Normale Dauer des QRS-Komplexes beim Hund, mit engerem Grenzwert fuer kleine Rassen.",
    "zahlen": "bis 0,06 s; bei kleinen Rassen bis 0,05 s",
    "seite": "PDF 28 (Buch 117), wiederholt auf allen Frageseiten",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qrs",
    "text": "Obergrenze der R-Zacken-Amplitude beim Hund, mit niedrigerem Wert fuer kleine Rassen.",
    "zahlen": "bis 3 mV; bei kleinen Rassen bis 2,5 mV",
    "seite": "PDF 28 (Buch 117), wiederholt auf allen Frageseiten",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qrs",
    "text": "Schwelle fuer die tiefe Q-Zacke: tiefer als normal bedeutet groesser als 0,5 mV.",
    "zahlen": "Q-Amplitude groesser 0,5 mV",
    "seite": "PDF 47 (Buch 136)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qrs",
    "text": "Eine Einkerbung der R-Zacke im letzten Drittel ihres absteigenden Schenkels steht mit Myokardfibrose und multiplen mikroskopischen intramuralen Mikroinfarkten in Zusammenhang. Im Befundraster wird sie als Mikroinfarkt-Welle bezeichnet.",
    "zahlen": "Einkerbung im letzten Drittel des absteigenden R-Schenkels",
    "seite": "PDF 47 (Buch 136)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qrs",
    "text": "S-Zacken sind in Ableitung II normalerweise nicht vorhanden; ihr Auftreten ist selbst ein Befund. Im Beispielfall wird eine S-Zacke von -0,04 mV notiert. Die Formulierung belegt zugleich, dass Ableitung II die Bezugsableitung dieser Befundtabellen ist.",
    "zahlen": "S-Zacke im Beispielfall -0,04 mV; Bezugsableitung II",
    "seite": "PDF 29 (Buch 118)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qrs",
    "text": "Die QRS-Dauer des Hundes darf bis zu 0,06 s betragen, bei kleinen Rassen bis 0,05 s. Die Rassegroesse ist also ein eigener Schwellenschalter.",
    "zahlen": "QRS bis 0,06 s; kleine Rassen bis 0,05 s",
    "seite": "PDF 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45 (Buch 213-233)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qrs",
    "text": "Die R-Zacke darf beim Hund bis zu 3 mV erreichen, bei kleinen Rassen bis 2,5 mV.",
    "zahlen": "R bis 3 mV; kleine Rassen bis 2,5 mV",
    "seite": "PDF 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45 (Buch 213-233)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qrs",
    "text": "Tiefe Q-Zacken weisen auf eine Hypertrophie bzw. Dilatation des rechten Ventrikels hin.",
    "zahlen": "",
    "seite": "PDF 38 (Buch 226)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qrs",
    "text": "In diesem Fall werden Q-Zacken-Amplituden von -1,2 mV als ueber der Norm liegend bewertet. Das ist der einzige Zahlenwert fuer eine Q-Zacken-Grenze in diesem Abschnitt; eine ausdrueckliche Q-Normgrenze steht in der Normwerttabelle nicht.",
    "zahlen": "Q -1,2 mV gilt als ueber der Norm",
    "seite": "PDF 44 (Buch 232)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qrs",
    "text": "Nomenklatur der Kammerkomplexe: hohe Ausschlaege mit Grossbuchstaben, kleine mit Kleinbuchstaben. Erste positive Zacke r/R, weitere positive Zacken r'/R'; negative Zacke vor r/R ist q/Q; negative Zacke nach r/R ist s/S; negative Zacke nach r'/R' ist s'/S'. Fehlt die R-Zacke, liegt ein QS-Komplex vor.",
    "zahlen": "",
    "seite": "30",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "qrs",
    "text": "Die QRS-Dauer wird vom ersten positiven oder negativen Ausschlag nach der P-Welle bis zum Uebergang in die ST-Strecke gemessen.",
    "zahlen": "",
    "seite": "30",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "qrs",
    "text": "Eine Erniedrigung der QRS-Komplexe heisst Niederspannung, Niedervoltage oder low voltage; eine Erhoehung wird als high voltage bezeichnet und ist im Allgemeinen durch Hypertrophie des rechten und/oder linken Ventrikels bedingt.",
    "zahlen": "",
    "seite": "30",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "qrs",
    "text": "Im selben EKG (Katze, 7 Wochen, persistierender AV-Kanal) ueberwiegen die S-Zacken: Ableitung I S = 0,7 mV bei R = 0,4 mV, Ableitung V2 S = 1,2 mV bei R = 0,5 mV. Das S/R-Verhaeltnis dient hier als Beleg der Rechtsbelastung.",
    "zahlen": "I: S 0,7 mV / R 0,4 mV; V2: S 1,2 mV / R 0,5 mV (bei 25 mm/s, 1 cm = 1 mV)",
    "seite": "PDF 139 = Buchseite 139 (Abb. 9.3a)",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "qrs",
    "text": "Beim persistierenden AV-Kanal sind ueberhoehte Amplituden des Kammerkomplexes mit ueberwiegenden Zeichen einer rechtsventrikulaeren Vergroesserung typisch.",
    "zahlen": "",
    "seite": "PDF 140 = Buchseite 140",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "qrs",
    "text": "Bei mittelgrossem und grossem Ventrikelseptumdefekt zeigt das EKG deutlich ueberhoehte R-Amplituden und haeufig verbreiterte Kammerkomplexe als Zeichen einer Linkshypertrophie. Bei sehr grossem Shunt mit Druckgleichheit beider Kammern deutet der Befund auf biventrikulaere Belastung hin.",
    "zahlen": "",
    "seite": "PDF 134 = Buchseite 134",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "qrs",
    "text": "Belegbeispiel Highvoltage: Siamkatze (m, 8 Wochen) mit grossem isolierten VSD zeigt R-Zacken von 1,7 mV bzw. 1,9 mV in den Ableitungen II, III und aVF.",
    "zahlen": "R 1,7 mV bzw. 1,9 mV in II, III, aVF (Katze, 8 Wochen)",
    "seite": "PDF 135 = Buchseite 135 (Abb. 9.2.1b)",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "qrs",
    "text": "Beim kleinen Ventrikelseptumdefekt ist das EKG altersentsprechend normal; Arrhythmien sind beim VSD generell selten.",
    "zahlen": "",
    "seite": "PDF 134 = Buchseite 134",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "qrs",
    "text": "Normale QRS-Hoehe (R-Zacke) in Ableitung II: kleine Hunde bis + 2,5 mV, grosse Hunde bis + 3,0 mV, Katze maximal 0,9 mV.",
    "zahlen": "QRS-Hoehe kleiner Hund + 2,5 mV; grosser Hund + 3,0 mV; Katze max. 0,9 mV",
    "seite": "PDF 9 (Buch 147)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qrs",
    "text": "Normale QRS-Breite: kleine Hunde 0,05 s, grosse Hunde 0,06 s, Katze maximal 0,04 s.",
    "zahlen": "QRS-Breite kleiner Hund 0,05 s; grosser Hund 0,06 s; Katze max. 0,04 s",
    "seite": "PDF 9 (Buch 147)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qrs",
    "text": "Normale S-Zacken-Hoehe beim Hund: kleiner als 0,5 mV. Fuer die Katze macht die Tabelle keine Angabe.",
    "zahlen": "S-Zacke Hund < 0,5 mV",
    "seite": "PDF 9 (Buch 147)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qrs",
    "text": "Der QRS-Komplex bildet die Erregungsausbreitung im Ventrikelmyokard ab; jede Veraenderung des QRS-Komplexes weist auf eine morphologische Veraenderung am Kammermyokard hin.",
    "zahlen": "",
    "seite": "PDF 24 (Buch 162)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qrs",
    "text": "Nomenklatur (bezogen auf Ableitung II): die erste negative Zacke ist die Q- bzw. q-Zacke, die erste positive Zacke die R- bzw. r-Zacke, die erste negative Zacke nach der R-Zacke die S- bzw. s-Zacke.",
    "zahlen": "",
    "seite": "PDF 24 (Buch 162)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qrs",
    "text": "Beim gesunden Herzen ist der QRS-Komplex normal breit und in der Nettoamplitude (Hauptausschlagsrichtung) positiv. Ist die Amplitude niedriger als normal (Hypovoltage), kommen Adipositas, Hypothyreose oder ein Perikarderguss infrage.",
    "zahlen": "",
    "seite": "PDF 24 (Buch 162)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qrs",
    "text": "Kleine Kerbungen im auf- oder absteigenden Schenkel der R-Zacke koennen ein Hinweis auf einen myokardialen Schaden sein.",
    "zahlen": "",
    "seite": "PDF 25 (Buch 163)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qrs",
    "text": "Verbreiterte QRS-Komplexe zeigen eine verlangsamte Depolarisation des Ventrikelmyokards an; als Differenzialdiagnosen kommen ventrikulaere Extrasystole, ventrikulaerer Ersatzschlag und Schenkelblock infrage.",
    "zahlen": "",
    "seite": "PDF 25 (Buch 163)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qrs",
    "text": "Abb. 10.33 (Definition QRS-Komplex): Q ist die negative Zacke vor R und entspricht der Depolarisation des Septums; sie kann in Ableitung II fehlen.",
    "zahlen": "",
    "seite": "PDF 26 (Buch 164)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qrs",
    "text": "Abb. 10.33: R ist die erste positive Zacke und entspricht der Depolarisation des linken Myokardiums; S ist die negative Zacke nach R und entspricht der Depolarisation des rechten Myokardiums, sie kann in Ableitung II fehlen.",
    "zahlen": "",
    "seite": "PDF 26 (Buch 164)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qrs",
    "text": "Tab. 10.7: Nettoamplitude positiv, Breite normal, alle Komplexe gleichmaessig niedrig - Befund Daempfung durch Adipositas oder Erguss bzw. Hypothyreose.",
    "zahlen": "",
    "seite": "PDF 27 (Buch 165)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qrs",
    "text": "Abb. 10.35: Kerbungen bzw. Knotungen liegen meist im auf- und absteigenden Schenkel der R-Zacke; ihre Bedeutung ist umstritten, als pathologische Ursache kommen Myokardschaedigungen infrage.",
    "zahlen": "",
    "seite": "PDF 28 (Buch 166)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qrs",
    "text": "Erregungsfolge im QRS: zuerst das AV-Knoten-nahe interventrikulaere Septum (negative Q-Zacke), dann die grosse Kammerdepolarisation (positive R-Zacke), zuletzt der basale Myokardanteil mit Richtungsumkehr (negative S-Zacke).",
    "zahlen": "",
    "seite": "PDF 1 / Buch 139",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qrs",
    "text": "QRS-Nomenklatur in Bezug auf Ableitung II: erste negative Zacke = Q- oder q-Zacke; erste positive Zacke = R- oder r-Zacke; erste negative Zacke nach der R-Zacke = S- oder s-Zacke.",
    "zahlen": "",
    "seite": "PDF 24 / Buch 162",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qrs",
    "text": "Messung des QRS-Komplexes: mittels Stechzirkel vom ersten negativen oder positiven Ausschlag (Q-Zacke) nach der P-Welle bis zum Beginn der ST-Strecke.",
    "zahlen": "",
    "seite": "PDF 24 / Buch 162",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qrs",
    "text": "Steckbrief normaler QRS-Komplex: Hund QRS-Dauer 0,05 s (kleine Hunde) bis 0,06 s (grosse Hunde), R-Zacke in Ableitung II +2,5 mV (kleine Hunde) bis +3,0 mV (grosse Hunde). Katze QRS max. 0,04 s, R-Zacke max. 0,9 mV.",
    "zahlen": "Hund 0,05-0,06 s und +2,5 bis +3,0 mV; Katze max 0,04 s und max 0,9 mV",
    "seite": "PDF 24 / Buch 162",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qrs",
    "text": "Kleine Kerbungen im auf- oder absteigenden Schenkel der R-Zacke koennen Hinweis auf einen myokardialen Schaden sein. Abb. 10.35 ergaenzt: Die Bedeutung ist umstritten, als pathologische Ursachen kommen Myokardschaedigungen infrage.",
    "zahlen": "",
    "seite": "PDF 25 und 28 / Buch 163 und 166",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qrs",
    "text": "Abb. 10.33 Definition der QRS-Anteile: Q ist die negative Zacke vor R (kann in Ableitung II fehlen) und entspricht der Depolarisation vom Septum; R ist die erste positive Zacke und entspricht der Depolarisation des linken Myokardiums; S ist die negative Zacke nach R (kann in Ableitung II fehlen) und entspricht der Depolarisation des rechten Myokardiums.",
    "zahlen": "",
    "seite": "PDF 26 / Buch 164",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "st-t",
    "text": "Die T-Welle hat nach dem QRS-Komplex die zweitgroesste Amplitude, ist der letzte Ausschlag eines Herzzyklus und stellt die Erregungsrueckbildung im Ventrikelmyokard dar. Sie kann positiv, negativ oder biphasisch ausgepraegt sein.",
    "zahlen": "",
    "seite": "PDF 30 (Buch 17)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Warnung des Buches zur T-Welle: sie ist sehr unterschiedlich ausgepraegt bzw. unspezifisch und kann bei ein und demselben Patienten selbst in kuerzester Zeit ihre Morphologie grundlegend aendern. Eine Software sollte T-Wellen-Aenderungen deshalb nicht als stabiles Merkmal behandeln.",
    "zahlen": "",
    "seite": "PDF 30 (Buch 17), Abb.16",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Zwei im Buch abgebildete Erscheinungsformen der pathologischen ST-Strecke: (a) die isoelektrische Linie senkt sich ab, um den absteigenden Ast der R-Zacke mit der T-Welle zu verbinden; (b) der absteigende Ast der R-Zacke verbindet sich zu frueh mit der T-Welle, anstatt bis auf die isoelektrische Linie abzufallen.",
    "zahlen": "",
    "seite": "PDF 32 (Buch 19), Abb.19 und 20",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Normale ST-Strecke Hund laut Normwerttabelle: Hebung bis zu 0,15 mV; Senkung kleiner als 0,2 mV. Hebung und Senkung haben also unterschiedliche Grenzen, die Bedingung ist nicht symmetrisch.",
    "zahlen": "ST-Hebung bis 0,15 mV; ST-Senkung < 0,2 mV",
    "seite": "PDF 2 (gedruckt 91)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Normale T-Welle Hund laut Normwerttabelle: weniger als 25 Prozent der R-Hoehe. Die T-Amplitude wird also nicht absolut, sondern als Verhaeltnis zur R-Zacke desselben Komplexes bewertet.",
    "zahlen": "T < 25 % der R-Hoehe",
    "seite": "PDF 2 (gedruckt 91)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Differentialdiagnosen einer veraenderten (ueberhoehten) T-Welle: Myokardhypoxie, Myokardinfarkt (beim Hund aeusserst selten), Blockierungen der intraventrikulaeren Erregungsausbreitung, Rechts- oder Linksschenkelblock, Vergroesserung beider Ventrikel.",
    "zahlen": "",
    "seite": "PDF 1 (gedruckt 90)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Eine T-Welle, deren Amplitude 25 Prozent der R-Hoehe uebersteigt, kann mit einer Myokardhypoxie oder mit Veraenderungen im Elektrolythaushalt zusammenhaengen; als Beispiel nennt das Buch ausdruecklich die Hyperkaliaemie. Liegt zusaetzlich eine Hypertrophie oder Dilatation des linken Ventrikels vor, koennen ebenfalls hoehere T-Wellen auftreten.",
    "zahlen": "T-Amplitude > 25 % der R-Hoehe",
    "seite": "PDF 23 (gedruckt 112)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Normale ST-Strecke beim Hund: Hebung bis zu 0,15 mV; Senkung kleiner als 0,2 mV.",
    "zahlen": "Hebung bis 0,15 mV; Senkung < 0,2 mV",
    "seite": "PDF-S. 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23 (Buchseiten 189-211)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Normale T-Welle beim Hund: weniger als 25 % der R-Hoehe. In den Falltabellen wird eine ueberhoehte T-Welle konsequent als \"> 25 % der R-Hoehe\" notiert.",
    "zahlen": "T-Amplitude < 25 % der R-Hoehe (normal); > 25 % = ueberhoeht",
    "seite": "PDF-S. 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23 (Buchseiten 189-211)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Ueberhoehte T-Wellen bei Sinuskomplexen werden als Hinweis auf eine Myokardhypoxie gewertet.",
    "zahlen": "T-Amplitude > 25 % der R-Hoehe",
    "seite": "PDF-S. 2 (Buchseite 190), Fall 28",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Die Kombination aus ST-Strecken-Senkung, tiefen T-Wellen und gekerbten R-Zacken kann mit einer Myokardischaemie zusammenhaengen und spricht fuer eine dekompensierte haemodynamische Situation.",
    "zahlen": "Fall 29: ST-Senkung 0,25 mV (Norm: Senkung < 0,2 mV)",
    "seite": "PDF-S. 4 (Buchseite 192), Fall 29",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Normgrenzen der ST-Strecke, getrennt nach Hebung und Senkung. Die beiden Grenzwerte sind unterschiedlich gross.",
    "zahlen": "Hebung bis 0,15 mV; Senkung kleiner als 0,2 mV",
    "seite": "PDF 28 (Buch 117), wiederholt auf allen Frageseiten",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Die T-Welle wird nicht absolut, sondern relativ zur R-Zacke desselben Komplexes bewertet. Das erfordert eine Verhaeltnismessung, keine Amplitudenschwelle.",
    "zahlen": "T-Amplitude kleiner als 25 % der R-Hoehe",
    "seite": "PDF 28 (Buch 117), wiederholt auf allen Frageseiten",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Ueberhoehte T-Wellen, also mehr als 25 Prozent der R-Hoehe, sprechen fuer eine Stoerung der Sauerstoffversorgung des Myokards.",
    "zahlen": "T groesser 25 % der R-Hoehe",
    "seite": "PDF 29 (Buch 118)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Differentialdiagnosen der erhoehten T-Welle: Myokardhypoxie, Stoerungen des Elektrolythaushalts, Toxikosen; ausserdem kardiale, respiratorische oder andere Erkrankungen.",
    "zahlen": "",
    "seite": "PDF 27 (Buch 116)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Erhoehte T-Wellen und eine deutliche Senkung der ST-Strecke treten meist gleichzeitig auf und bilden zusammen einen typischen Befund zweier grosser Krankheitsgruppen. Die Kombination ist aussagekraeftiger als jeder Einzelbefund.",
    "zahlen": "",
    "seite": "PDF 45 (Buch 134)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Zweite Krankheitsgruppe hinter derselben Kombination: Myokardhypoxie durch kardiale oder respiratorische Insuffizienz, hochgradige Anaemie, Hypovolaemie oder Ventilationsstoerungen.",
    "zahlen": "",
    "seite": "PDF 45 (Buch 134)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Beispiel einer pathologischen ST-Senkung: 0,4 mV, also das Doppelte des Normgrenzwerts von 0,2 mV, wird als deutliche Senkung bewertet.",
    "zahlen": "ST-Senkung 0,4 mV gegen Normgrenze 0,2 mV",
    "seite": "PDF 45 (Buch 134)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Eine diskrete ST-Hebung, die gerade noch an der Grenze des Normbereichs liegt, wird als normal befundet. Der Grenzwert 0,15 mV wird also einschliessend gehandhabt.",
    "zahlen": "ST-Hebung bis 0,15 mV noch normal",
    "seite": "PDF 29 (Buch 118)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Fuer die ST-Strecke gelten beim Hund zwei verschiedene Grenzen je Richtung: Hebung bis zu 0,15 mV, Senkung bis 0,2 mV. Die Pruefung muss also asymmetrisch sein.",
    "zahlen": "ST-Hebung bis 0,15 mV; ST-Senkung bis 0,2 mV",
    "seite": "PDF 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45 (Buch 213-233)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Die T-Welle darf normal weniger als 25 % der R-Zacken-Hoehe betragen. Der Grenzwert ist ein Verhaeltnis, keine absolute Amplitude.",
    "zahlen": "T < 25 % der R-Hoehe",
    "seite": "PDF 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45 (Buch 213-233)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Eine deutliche ST-Senkung zusammen mit T-Wellen, deren Amplitude 25 % der R-Zacke uebersteigt, ist ein unspezifischer, aber aussagekraeftiger Hinweis; die Ursache liegt in der Regel in Elektrolytimbalanzen und/oder einer Myokardhypoxie unterschiedlichen Ursprungs.",
    "zahlen": "T > 25 % der R-Hoehe",
    "seite": "PDF 30 (Buch 218)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Auffaellige Veraenderungen an ST-Strecke und T-Wellen zugleich entstehen in der Regel bei hochgradiger Hypoxie bzw. Ischaemie des Myokards.",
    "zahlen": "",
    "seite": "PDF 32 (Buch 220)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Senkung der ST-Strecke zusammen mit tiefen T-Wellen zeigt sich bei Myokardhypoxie und/oder Stoerungen des Elektrolythaushalts; eine weitere moegliche Ursache ist die Hypertrophie bzw. Dilatation der linken Herzkammer.",
    "zahlen": "",
    "seite": "PDF 36 (Buch 224)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "st-t",
    "text": "Die PQ-Strecke wird vom P-Ende bis zum Q-(RS-)Beginn gemessen und verlaeuft normalerweise isoelektrisch. Veraenderungen sind erkennbare Vorhofrepolarisationen (Ta-Wellen). Senkungen, seltener Hebungen, treten bei Vorhofbelastung auf, z. B. bei rechtsatrialer Vergroesserung, Perikarderguss und Perikarditis; Senkungen auch bei Tachykardien, eine Hebung am ehesten beim AV-Block III. Grades.",
    "zahlen": "",
    "seite": "36",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "st-t",
    "text": "Die ST-Strecke reicht vom Ende der S-Zacke (bei fehlender S-Zacke vom Ende der R-Zacke) bis zum Beginn der T-Welle. Hebung bzw. Senkung werden nach den Empfehlungen des Committee of the American Heart Association (1943) an der RS-T-Junction gemessen, also am Uebergang des steilen QRS-Abschnitts in den waagerechten oder wenig geneigten Abschnitt der ST-Strecke. Als orientierende Nulllinie dient die PQ-Strecke.",
    "zahlen": "Messpunkt RS-T-Junction; Nulllinie = PQ-Strecke",
    "seite": "36",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "st-t",
    "text": "Primaere ST-Streckenverlagerungen gelten als Zeichen einer myokardialen Hypoxie; sekundaere ST-Verlagerungen sind Repolarisationsstoerungen nach veraendertem QRS-Komplex. Bei Sauerstoffmangel, z. B. akuter Anaemie, kann die ST-Strecke gesenkt, abwaerts gerichtet und konkav sein.",
    "zahlen": "",
    "seite": "36",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "st-t",
    "text": "Bei der Katze zeigen sich ST-Abweichungen hauptsaechlich in den Ableitungen II, III, aVF und den linken Brustwandableitungen, meist als Muster gleichzeitiger und gleichsinniger Verlagerungen in II, III und aVF; haeufig zusaetzlich in den Brustwandableitungen oder als Spiegelbildveraenderung in aVR und aVL. Vorkommen bei schweren angeborenen Herzfehlern, HKM, DKM und Dyspnoe unterschiedlicher Genese.",
    "zahlen": "",
    "seite": "36",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "st-t",
    "text": "Beispiel ST-Streckensenkung mit ueberhoehter T-Welle bei myokardialer Hypoxie: Hund mit DKM, Brustwandableitungen mit ST-Senkung von 0,3 mV und spitzen hohen T-Wellen ueber 28 % von R in CV6LU; Sinusrhythmus, HF-Verlangsamung von 160/min auf ca. 60/min nach Karotissinus-Druck; 25 mm/s, 1 cm = 1 mV.",
    "zahlen": "ST-Senkung 0,3 mV; T > 28 % von R; HF 160 -> 60/min",
    "seite": "37",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "st-t",
    "text": "Beispiel ST-Streckenhebung mit ueberhoehter T-Welle bei myokardialer Hypoxie: Katze mit DKM, ST-Hebung von 0,05 bis 0,2 mV in allen Ableitungen; in Ableitung II sind die Amplituden von T-Wellen und R-Zacken nahezu gleich hoch.",
    "zahlen": "ST-Hebung 0,05-0,2 mV",
    "seite": "37",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "st-t",
    "text": "Steckbrief T-Wellen: physiologisch positiv, negativ oder biphasisch, beim Hund bis 28 % der R-Zacke in Abl. II, bei der Katze bis 0,3 mV in Abl. II. Pathologisch sind ueberhoehte, gekerbte oder auffaellig spitze T-Wellen; eine ploetzliche Umkehr der Ausschlagsrichtung waehrend der Registrierung ist moeglich.",
    "zahlen": "T physiologisch Hund <= 28 % von R (II); Katze <= 0,3 mV (II)",
    "seite": "38",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "st-t",
    "text": "Die Repolarisation erfolgt ohne einheitliche Ausrichtung. Deshalb kann die T-Welle positiv, negativ oder biphasisch sein.",
    "zahlen": "",
    "seite": "PDF 2 (Buch 140)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "st-t",
    "text": "Nettobilanz der ST-Strecke beim Hund: Hebung hoechstens 0,15 mV, Senkung hoechstens 0,2 mV. Fuer die Katze macht die Tabelle keine Angabe.",
    "zahlen": "ST-Hebung <= 0,15 mV; ST-Senkung <= 0,2 mV (Hund)",
    "seite": "PDF 9 (Buch 147)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "st-t",
    "text": "Normale T-Welle: beim Hund positiv, negativ oder biphasisch, Hoehe plus/minus 0,15-1,0 mV und kleiner als ein Viertel der R-Zacke; bei der Katze ueblicherweise positiv und kleiner als 0,3 mV.",
    "zahlen": "T Hund +/- 0,15-1,0 mV und < 1/4 R; Katze < 0,3 mV",
    "seite": "PDF 9 (Buch 147)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "st-t",
    "text": "Die ST-Strecke zeichnet die kurze Pause nach der Depolarisation der Kammern und vor der Repolarisation auf (isoelektrische Erregungspause, Abb. 10.51).",
    "zahlen": "",
    "seite": "PDF 38 (Buch 176)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "st-t",
    "text": "Die Bedeutung einer Hebung oder Senkung der ST-Strecke als Hinweis auf Myokardschaeden ist beim Hund - im Gegensatz zum Menschen - umstritten.",
    "zahlen": "",
    "seite": "PDF 38 (Buch 176)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "st-t",
    "text": "Bei der Katze im kongestiven Herzversagen sind ST-Strecken-Hebungen oder -Senkungen regelmaessig als Ausdruck einer myokardialen Hypoxie zu sehen.",
    "zahlen": "",
    "seite": "PDF 38 (Buch 176)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "st-t",
    "text": "Tab. 10.8: ST-Strecken-Hebung (kleiner 0,15 mV) - moegliche Befunde myokardiale Hypoxie, Myokardinfarkt, Perikarderguss, Perikarditis.",
    "zahlen": "Hebung < 0,15 mV",
    "seite": "PDF 39 (Buch 177)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "st-t",
    "text": "Tab. 10.8: ST-Strecken-Senkung (groesser 0,2 mV in den Ableitungen II, III und aVF) - moegliche Befunde myokardiale Hypoxie, Digitalisintoxikation, Hyper- und Hypokaliaemie.",
    "zahlen": "Senkung > 0,2 mV in II, III, aVF",
    "seite": "PDF 39 (Buch 177)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "st-t",
    "text": "Abb. 10.52 (ST-Strecke Hund und Katze): Hund ohne nennenswerte Hebung, maximal 0,15 mV, und ohne nennenswerte Senkung, maximal 0,2 mV; Katze ohne Hebung und ohne Senkung.",
    "zahlen": "Hund Hebung max 0,15 mV, Senkung max 0,2 mV; Katze keine",
    "seite": "PDF 39 (Buch 177)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "st-t",
    "text": "Abb. 10.53: Die T-Welle zeichnet die Repolarisation der Kammern auf und ist immer vorhanden.",
    "zahlen": "",
    "seite": "PDF 39-40 (Buch 177-178)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "st-t",
    "text": "Steckbrief normale T-Welle: die T-Welle kann positiv, negativ oder biphasisch sein (Abb. 10.54 zeigt positiv, negativ, biphasisch +/- und biphasisch -/+). Eine negative T-Welle ist also fuer sich allein kein Befund.",
    "zahlen": "",
    "seite": "PDF 40 (Buch 178)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "st-t",
    "text": "Die Repolarisation erfolgt ohne einheitliche Ausrichtung, daher kann die T-Welle positiv, negativ oder biphasisch sein.",
    "zahlen": "",
    "seite": "PDF 2 / Buch 140",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "st-t",
    "text": "Die ST-Strecke zeichnet die kurze Pause nach der Depolarisation der Kammern und vor der Repolarisation des Herzens auf. Die Bedeutung der Hebung oder Senkung dieser Strecke als Hinweis auf Myokardschaeden ist beim Hund im Gegensatz zum Menschen umstritten.",
    "zahlen": "",
    "seite": "PDF 38 / Buch 176",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "st-t",
    "text": "Steckbrief normale ST-Strecke und normales QT-Intervall: ST-Strecke Hund Hebung bzw. Senkung zwischen -0,2 und 0,15 mV, Katze keine; QT-Intervall Hund 0,15-0,25 s und Katze 0,12-0,18 s bei normaler Herzfrequenz; S-Zacke Hund kleiner 0,5 mV, bei der Katze ist keine einheitliche Angabe moeglich.",
    "zahlen": "ST Hund -0,2 bis +0,15 mV; QT Hund 0,15-0,25 s, Katze 0,12-0,18 s; S Hund < 0,5 mV",
    "seite": "PDF 38 / Buch 176",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "st-t",
    "text": "Tab. 10.8: Eine ST-Strecken-Hebung (kleiner 0,15 mV als Grenze des Normalen) kommt bei myokardialer Hypoxie, Myokardinfarkt, Perikarderguss und Perikarditis vor.",
    "zahlen": "Hebung < 0,15 mV",
    "seite": "PDF 39 / Buch 177",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "st-t",
    "text": "Abb. 10.52 (ST-Strecken-Hebung und -Senkung): Hund ST-Strecke ohne nennenswerte Hebung maximal 0,15 mV und ohne nennenswerte Senkung maximal 0,2 mV; Katze ST-Strecke ohne Hebung und ohne Senkung.",
    "zahlen": "Hund Hebung max 0,15 mV, Senkung max 0,2 mV; Katze weder Hebung noch Senkung",
    "seite": "PDF 39 / Buch 177",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "st-t",
    "text": "Die T-Welle zeichnet die Repolarisation der Kammern auf und ist immer vorhanden bzw. sichtbar.",
    "zahlen": "",
    "seite": "PDF 39-40 / Buch 177-178",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "st-t",
    "text": "Steckbrief normale T-Welle: Die T-Welle kann positiv, negativ oder biphasisch sein. Hund maximal 25 % der R-Amplitude in Ableitung II; Katze Hoehe kleiner 0,3 mV.",
    "zahlen": "Hund T <= 25 % von R in II; Katze T < 0,3 mV",
    "seite": "PDF 40 / Buch 178",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "st-t",
    "text": "Abb. 10.54: Hund T-Hoehe maximal 25 % der R-Hoehe (Ableitung II); Katze T-Hoehe maximal 0,3 mV (Ableitung II). Ueberhoehte T-Wellen deuten auf Sauerstoffmangel hin, schlanke spitze T-Wellen auf Hyperkaliaemie.",
    "zahlen": "Hund max 25 % von R; Katze max 0,3 mV",
    "seite": "PDF 40 / Buch 178",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qt",
    "text": "Die QT-Dauer ist indirekt proportional zur Herzfrequenz: je hoeher die Frequenz, desto kuerzer das QT-Intervall; je niedriger die Frequenz, desto laenger. Eine konkrete Korrekturformel wird auf diesen Seiten NICHT angegeben.",
    "zahlen": "",
    "seite": "PDF 31 (Buch 18)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qt",
    "text": "Normales QT-Intervall Hund laut Normwerttabelle: 0,15-0,25 s. Eine frequenzabhaengige Korrekturformel (QTc) wird in diesem Abschnitt nicht angegeben.",
    "zahlen": "QT 0,15-0,25 s",
    "seite": "PDF 2 (gedruckt 91)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qt",
    "text": "Das Buch schreibt, die Dauer des QT-Intervalls verhalte sich umgekehrt proportional zur Herzfrequenz, formuliert den Folgesatz aber widerspruechlich: \"sodass das QT-Intervall bei erhoehter Herzfrequenz verlaengert ist und umgekehrt\". Der Fall selbst zeigt das Gegenteil des Folgesatzes - Bradykardie 60 bpm mit verlaengertem QT 0,28 s. Die Satzhaelfte ist ein Fehler der Vorlage und darf nicht in eine Regel uebernommen werden.",
    "zahlen": "QT 0,28 s bei HF 60 bpm (Norm 0,15-0,25 s)",
    "seite": "PDF 5 (gedruckt 94)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qt",
    "text": "Normales QT-Intervall beim Hund: 0,15-0,25 s.",
    "zahlen": "0,15-0,25 s",
    "seite": "PDF-S. 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23 (Buchseiten 189-211)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qt",
    "text": "Normbereich des QT-Intervalls beim Hund. Eine frequenzabhaengige Korrektur wird auf diesen Seiten nicht angegeben.",
    "zahlen": "QT 0,15-0,25 s",
    "seite": "PDF 28 (Buch 117), wiederholt auf allen Frageseiten",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qt",
    "text": "Das QT-Intervall liegt beim Hund normal zwischen 0,15 s und 0,25 s. Eine frequenzabhaengige Korrekturformel wird in diesem Abschnitt nicht angegeben.",
    "zahlen": "QT 0,15-0,25 s",
    "seite": "PDF 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45 (Buch 213-233)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "qt",
    "text": "Procainamid kann als Nebenwirkung das QT-Intervall verlaengern, einen AV-Block und eine multiforme ventrikulaere Tachykardie ausloesen. Weitere Nebenwirkungen sind Anorexie, Durchfall, Erbrechen, Schwaeche und Hypotension. Monitoring: EKG, evtl. Blutdruck.",
    "zahlen": "",
    "seite": "PDF-Seite 2 (Buchseite 430)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "qt",
    "text": "Normale QT-Intervall-Dauer bei normaler Herzfrequenz: Hund 0,15-0,25 s, Katze 0,12-0,18 s.",
    "zahlen": "QT Hund 0,15-0,25 s; Katze 0,12-0,18 s (bei normaler HF)",
    "seite": "PDF 9 (Buch 147)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qt",
    "text": "Medikamente, die das QT-Intervall verlaengern, praedisponieren zu Arrhythmien.",
    "zahlen": "",
    "seite": "PDF 38 (Buch 176)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qt",
    "text": "Tab. 10.8: Eine Verlaengerung des QT-Intervalls ist meist medikamentoes bedingt und wirkt vermutlich proarrhythmogen, weil sie die vulnerable Phase verlaengert.",
    "zahlen": "",
    "seite": "PDF 39 (Buch 177)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qt",
    "text": "Medikamente, welche das QT-Intervall verlaengern, praedisponieren zu Arrhythmien.",
    "zahlen": "",
    "seite": "PDF 38 / Buch 176",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "qt",
    "text": "Tab. 10.8: Eine Verlaengerung des QT-Intervalls ist meist medikamentoes bedingt; sie wirkt vermutlich proarrhythmogen durch eine Verlaengerung der vulnerablen Phase.",
    "zahlen": "",
    "seite": "PDF 39 / Buch 177",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Artunterschied, der die Frequenzmessung steuert: bei der Katze (wie beim Menschen) folgen die Herzschlaege regelmaessig aufeinander, die Frequenz laesst sich deshalb rasch und einfach bestimmen. Beim Hund ist der Rhythmus fuer gewoehnlich unregelmaessig (respiratorische Sinusarrhythmie) mit Frequenzvariationen, die je nach ausgewerteter Strecke hoechst signifikant ausfallen koennen.",
    "zahlen": "",
    "seite": "PDF-Seite 15 (Buchseite 2)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Erster Pruefschritt der Rhythmusbestimmung: ist der Abstand zwischen zwei aufeinander folgenden R-Zacken immer gleich (regelmaessig) oder unterschiedlich lang (unregelmaessig)? Nur im zweiten Fall ist weiter zu klaeren, ob eine Sinusarrhythmie vorliegt.",
    "zahlen": "",
    "seite": "PDF-Seite 21 (Buchseite 8)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Grenzwert fuer regelmaessigen Rhythmus beim Hund: die maximal zulaessige Differenz zwischen den RR-Intervallen betraegt 0,12 s. Das entspricht sechs 1-mm-Quadraten bei 50 mm/s bzw. drei 1-mm-Quadraten bei 25 mm/s.",
    "zahlen": "max. RR-Differenz 0,12 s = 6 mm bei 50 mm/s = 3 mm bei 25 mm/s",
    "seite": "PDF-Seite 21 (Buchseite 8)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Pruefbare Bedingung fuer unregelmaessigen Rhythmus: variiert die Laenge der einzelnen RR-Intervalle um mehr als 0,12 s, ist der Herzrhythmus als unregelmaessig zu bezeichnen.",
    "zahlen": "RR-Variation > 0,12 s -> unregelmaessig",
    "seite": "PDF-Seite 21 (Buchseite 8)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Begruendung des Toleranzbandes: die im Sinusknoten entstehenden Impulse sind beim Hund nie wirklich regelmaessig. Der Rhythmus des Hundes gilt deshalb auch dann als regelmaessig, wenn zwischen den RR-Intervallen kleine Unterschiede bestehen (bis zur genannten 0,12-s-Grenze).",
    "zahlen": "Toleranz bis 0,12 s",
    "seite": "PDF-Seite 21 (Buchseite 8)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Ein Herzrhythmus gilt beim Hund noch als regelmaessig, solange die Differenz zwischen zwei RR-Intervallen 0,12 s nicht ueberschreitet. Begruendung des Buches: die Impulse aus dem Sinusknoten sind beim Hund nie wirklich regelmaessig.",
    "zahlen": "RR-Differenz <= 0,12 s = 6 Millimeterkaestchen bei 50 mm/s (bzw. 3 Kaestchen bei 25 mm/s)",
    "seite": "PDF 22 (Buch 9), Abb.7",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Variiert die Laenge der einzelnen RR-Intervalle um mehr als 0,12 s, ist der Rhythmus als unregelmaessig zu bezeichnen. Das ist die Schwelle, ab der weiter differenziert wird.",
    "zahlen": "RR-Schwankung > 0,12 s -> unregelmaessig",
    "seite": "PDF 22 (Buch 9)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Ist der Rhythmus unregelmaessig, wird als naechstes geprueft, ob die Schwankungen periodisch wiederkehren oder in ungeordneter, chaotischer Reihenfolge auftreten. Daraus ergeben sich zwei Klassen: regelmaessige Arrhythmien und unregelmaessige Arrhythmien.",
    "zahlen": "",
    "seite": "PDF 23 (Buch 10)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Pruefbares Unterscheidungsverfahren des Buches: man versucht, das naechste RR-Intervall innerhalb einer Gruppe von Herzzyklen vorherzusagen. Gelingt die Vorhersage, liegen periodische Schwankungen vor (regelmaessige Arrhythmie); gelingt sie nicht, handelt es sich um eine ungeordnete, unvorhersehbare Arrhythmie.",
    "zahlen": "Beispiele im Text: fuenf kurze Intervalle gefolgt von fuenf langen; oder nach je drei normalen Intervallen stets ein laengeres RR-Intervall",
    "seite": "PDF 23 (Buch 10)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Wenn nicht jedem QRS-Komplex eine P-Welle vorausgeht, muessen Vorhofrhythmus (Folge der P-Wellen) und Kammerrhythmus (Folge der QRS-Komplexe) getrennt voneinander beurteilt werden - mit EKG-Zirkel oder durch Abzaehlen der Millimeterquadrate zwischen zwei aufeinanderfolgenden P-Wellen bzw. QRS-Komplexen.",
    "zahlen": "getrennte PP-Reihe und RR-Reihe",
    "seite": "PDF 23 (Buch 10)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Sinusbradykardie wird in einem Fall bei einer Frequenz von 60 bpm diagnostiziert, in einem anderen eine hochgradige Sinusbradykardie bei 40/min. Beide liegen unter der unteren Normgrenze von 70 bpm.",
    "zahlen": "60 bpm = Sinusbradykardie; 40/min = hochgradige Sinusbradykardie; Normuntergrenze 70 bpm",
    "seite": "PDF 5 und 21 (gedruckt 94 und 110)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Die respiratorische Sinusarrhythmie ist beim Hund physiologisch. Sogar eine Herzfrequenz von 140/min kann allein durch den Stress der klinischen Untersuchung und der EKG-Aufzeichnung normal sein - die Software darf eine erhoehte Frequenz also nicht ohne Kontext als Befund werten.",
    "zahlen": "HF 140/min noch stressbedingt normal",
    "seite": "PDF 9 (gedruckt 98)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Bei brachyzephalen Rassen, hier ausdruecklich beim Boxer, kann die respiratorische Sinusarrhythmie besonders ausgepraegt sein. Auch das ist physiologisch.",
    "zahlen": "",
    "seite": "PDF 11 (gedruckt 100)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Eine erhoehte Herzfrequenz bei regelmaessigem Rhythmus weist beim Hund auf eine Aktivierung des sympathischen Nervensystems hin, die auf eine Herzinsuffizienz zurueckgehen kann. Regelmaessigkeit ist hier das mitentscheidende Merkmal, nicht die Frequenz allein.",
    "zahlen": "",
    "seite": "PDF 19 (gedruckt 108)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Jede Erhoehung der Herzfrequenz bei einem herzkranken Patienten gilt als Indikator fuer eine dekompensierte Herzinsuffizienz - vorausgesetzt, die Frequenzerhoehung ist nicht stressbedingt durch die Untersuchung. Die Software muss diese Einschraenkung mitfuehren, sonst erzeugt jeder aufgeregte Patient einen Alarm.",
    "zahlen": "",
    "seite": "PDF 25 (gedruckt 114)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Der \"wandernde Schrittmacher\" erscheint in zwei Faellen als eigener Eintrag in der Zeile Sonstiges, ohne dass ihm eine krankhafte Bedeutung beigemessen wird. Er gehoert damit in die Liste der zu erkennenden, aber nicht alarmierenden Nebenbefunde.",
    "zahlen": "2 von 13 Faellen",
    "seite": "PDF 5 und 25 (gedruckt 94 und 114)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Als normaler Grundrhythmus gelten Sinusrhythmus und Sinusarrhythmie gleichermassen. Die Sinusarrhythmie ist damit ausdruecklich ein Normalbefund, kein Abweichungsbefund.",
    "zahlen": "Grundrhythmus normal = Sinusrhythmus oder Sinusarrhythmie",
    "seite": "PDF 28 (Buch 117), wiederholt auf allen Frageseiten des Bereichs",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Pruefbare Definition des regelmaessigen Sinusrhythmus: die RR-Intervalle gelten als konstant, solange ihre Schwankung hoechstens etwa 0,12 s betraegt. Das ist die einzige Zahlenschwelle fuer Rhythmusregelmaessigkeit im ganzen Bereich.",
    "zahlen": "RR-Variation maximal 0,12 s = regelmaessig",
    "seite": "PDF 33 (Buch 122); gleiche Schwelle nochmals PDF 39 (Buch 128)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Die respiratorische Sinusarrhythmie ist beim Hund physiologisch und fuer sich genommen kein Hinweis auf eine behandlungsbeduerftige Herzveraenderung.",
    "zahlen": "",
    "seite": "PDF 31 (Buch 120)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Mechanismus der respiratorischen Sinusarrhythmie: bei der Inspiration ueberwiegt der Sympathikotonus, der intrathorakale Druck steigt und die Herzfrequenz nimmt zu; bei der Exspiration ueberwiegt der Parasympathikotonus und die Frequenz sinkt leicht.",
    "zahlen": "",
    "seite": "PDF 31 (Buch 120)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Diagnostisch verwertbare Umkehrregel: bei dekompensierter kongestiver Herzinsuffizienz verschwindet die Sinusarrhythmie normalerweise, weil Sympathikotonus und Frequenz reflektorisch steigen. Bleibt die Sinusarrhythmie bestehen, spricht das fuer einen haemodynamisch stabilen Patienten und gegen eine kardiale Dekompensation als Ursache der Symptome.",
    "zahlen": "",
    "seite": "PDF 31 (Buch 120)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Ein praktisch vollkommen regelmaessiger Rhythmus ist beim gesunden Hund in Ruhe untypisch und weist auf erhoehten Sympathikotonus hin, also moeglicherweise auf aktivierte kardiale Kompensationsmechanismen. Fehlende Sinusarrhythmie ist damit selbst ein Befund.",
    "zahlen": "",
    "seite": "PDF 37 (Buch 126)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Eine Herzfrequenz von 160 bpm wird als oberster Rand des Normbereichs bzw. als Grenze zur Tachykardie bezeichnet. Bei herzgesunden Hunden ist sie meist der Aufregung durch die Untersuchung geschuldet, bei kardialer Vorerkrankung kann sie auf Dekompensation hinweisen.",
    "zahlen": "160 bpm = obere Normgrenze",
    "seite": "PDF 33 (Buch 122), PDF 35 (Buch 124), PDF 41 (Buch 130)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Bei einem Pudel wird eine Frequenz von 180 bpm zusammen mit konstanten RR-Intervallen als permanente Sinustachykardie und als Zeichen der Sympathikusaktivierung gewertet, obwohl die Normtabelle fuer kleine Rassen bis 180 bpm zulaesst. Die Bewertung erfolgt also im klinischen Zusammenhang, nicht allein an der Zahl.",
    "zahlen": "180 bpm bei Pudel = Sinustachykardie trotz Tabellengrenze 180 bpm fuer kleine Rassen",
    "seite": "PDF 39 (Buch 128)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Als normaler Grundrhythmus gelten laut Normwertspalte Sinusrhythmus und Sinusarrhythmie gleichermassen. Die Sinusarrhythmie ist damit ausdruecklich kein pathologischer Befund.",
    "zahlen": "",
    "seite": "PDF 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45 (Buch 213-233)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Der wandernde Schrittmacher Typ A ist ein haeufiges und physiologisches Phaenomen im EKG gesunder Hunde: die P-Wellen variieren stark in Amplitude und Form, weil das Schrittmacherzentrum innerhalb des Sinusknotens wechselt. Er stellt keine pathologische Veraenderung dar.",
    "zahlen": "",
    "seite": "PDF 38 (Buch 226)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Bei dekompensierter kongestiver Herzinsuffizienz entwickelt sich wegen des vorherrschenden Sympathikotonus nur selten eine Sinusarrhythmie. Findet man bei einem Hund mit respiratorischer Symptomatik eine Sinusarrhythmie, spricht das eher fuer einen aktiven Prozess in den Atemwegen als fuer eine Herzinsuffizienz.",
    "zahlen": "",
    "seite": "PDF 38 (Buch 226)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Sick-Sinus-Syndrom (Synonyme: Sinusknotensyndrom, Sinusknotenerkrankung): verschiedene Rhythmusstoerungen durch Fehlfunktion des Sinusknotens und der Erregungsleitung auf Vorhofebene, mit wechselndem Vorhofrhythmus (Ermuedungserscheinung des Sinusknotens) und sowohl bradykarden als auch tachykarden supraventrikulaeren Arrhythmien.",
    "zahlen": "",
    "seite": "PDF 56 = Buch 56",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Tachykardie-Bradykardie-Syndrom als Unterform des SSS: Wechsel zwischen persistierender Sinusbradykardie bzw. sinuatrialem Block (bradykarde Phase) und Vorhofflimmern oder Vorhofflattern (tachykarde Phase).",
    "zahlen": "",
    "seite": "PDF 56 = Buch 56",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Sinusstillstand im Rahmen des SSS: allmaehliche Abnahme der Sinusfrequenz, gefolgt von einer Asystolie mit fehlendem Impuls im Sinusknoten, in den Vorhoefen und im AV-Knoten; typisch ist ausserdem kein oder ein unzureichender Frequenzanstieg bei Belastung. Folge sind Ataxie bzw. Synkopen durch zerebrale Minderdurchblutung.",
    "zahlen": "",
    "seite": "PDF 56 = Buch 56",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Bildbeispiel SSS (Hund mit Adams-Stokes-Anfaellen): im Rhythmusstreifen kombiniert Sinusbradykardie und Tachykardie, Sinusknotenstillstand von bis zu 4 s, Vorhof- oder AV-Extrasystolen sowie eine ventrikulaere Extrasystole.",
    "zahlen": "Sinusknotenstillstand bis zu 4 s; Papiervorschub 25 mm/s; Eichung 1 cm = 1 mV",
    "seite": "PDF 56 = Buch 56",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Steckbrief Sinusrhythmus: normale regelmaessige Herzschlagfolge; P-Welle in Abl. II gleichfoermig und positiv; jede normale P-Welle regelmaessig vom Kammerkomplex gefolgt; PQ-Intervall normal und konstant; gleicher RR-Abstand mit maximal 10 % Variation; Kammerkomplexe normal geformt (bei intraventrikulaerer Leitungsstoerung breit und verformt).",
    "zahlen": "PQ Hund 0,06-0,13 s; PQ Katze 0,05-0,09 s; RR-Variation max. 10 %",
    "seite": "24",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Beispielstreifen Sinusrhythmus: herzgesunde Katze HF 220/min; herzgesunder Hund HF 140/min. Aufzeichnung mit 25 mm/s bzw. 50 mm/s, Eichung 1 cm = 1 mV.",
    "zahlen": "Katze 220/min; Hund 140/min; 25 und 50 mm/s; 1 cm = 1 mV",
    "seite": "24",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Steckbrief respiratorische Sinusarrhythmie: atmungsabhaengige, vagal vermittelte Frequenzschwankung. Bei Herzfrequenzen unter 130/min wechseln PP- bzw. RR-Abstaende rhythmisch; in Inspiration steigt die HF mit Herzschlaegen meist in Zweier- oder Dreiergruppen, gefolgt von unterschiedlich langen exspiratorischen Pausen. Normale P-Welle vor jedem QRS, normaler Abstand P zu Kammerkomplex.",
    "zahlen": "physiologisch beim Hund bei HF < 130/min",
    "seite": "25",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Die respiratorische Sinusarrhythmie ist bei Katzen sehr selten, weil deren Herzfrequenz normalerweise hoeher liegt.",
    "zahlen": "",
    "seite": "25",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Auskultatorisch ist die atemabhaengige Frequenzschwankung bei Herzfrequenzen von 140 Schlaegen/min und mehr nicht mehr zu beobachten; da gesunde Katzen im Allgemeinen ueber 140/min liegen, ist die respiratorische Sinusarrhythmie bei dieser Tierart eine Raritaet. Pathologische Arrhythmien sind dagegen atmungsunabhaengig und nehmen in hoeheren Frequenzbereichen sogar zu.",
    "zahlen": "Schwelle 140/min",
    "seite": "17",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Steckbrief wandernder Schrittmacher: uebermaessige vagale Stimulation unterdrueckt den Sinusknoten; das Schrittmacherzentrum wechselt innerhalb des Sinusknotens oder vom Sinusknoten zum AV-Knoten. Kennzeichen sind voruebergehender Form- bzw. Amplitudenwechsel der P-Wellen bei konstanten PQ-Intervallen und unregelmaessigem supraventrikulaerem Rhythmus; frequenz- und atmungsabhaengig.",
    "zahlen": "PQ konstant, P-Form/-Amplitude wechselnd",
    "seite": "25",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Wandernder Schrittmacher kommt bei gesunden Hunden vor, sehr selten bei gesunden Katzen, ausserdem bei Digitalisintoxikation. Er ist eine physiologische Variante und bedarf keiner Therapie.",
    "zahlen": "",
    "seite": "25",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Steckbrief Sinustachykardie: Sinusrhythmus mit einer Herzfrequenz ueber 160/min bei mittelgrossen und grossen Hunderassen, ueber 180/min bei kleinen Hunderassen, ueber 220/min bei Hundewelpen und ueber 240/min bei Katzen und Katzenwelpen. Normale P-Welle gefolgt von schmalem QRS-Komplex, regelmaessiger Rhythmus mit konstanten PP- und PQ-Intervallen; bei verzoegerter Ueberleitung oder schneller Frequenz Verschmelzung von P- und T-Wellen moeglich; PQ-Senkung moeglich.",
    "zahlen": "> 160/min (mittelgrosse/grosse Hunde); > 180/min (kleine Hunde); > 220/min (Hundewelpen); > 240/min (Katzen)",
    "seite": "42",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Vorkommen der Sinustachykardie: kardial bei jeder angeborenen oder erworbenen Herz-Kreislauf-Erkrankung; extrakardial bei Schmerz, Angst, Erregung, Fieber, Schock, Anaemie, Hypoxie, Hyperthyreose; medikamentoes durch Ephedrin, Atropin, Euphyllin, Ketamin.",
    "zahlen": "",
    "seite": "42",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Beispielstreifen von drei Hunden auf einer Seite: oben Sinusrhythmus HF 140/min, Mitte Sinusbradykardie HF 60/min, unten Sinustachykardie HF 280/min mit P auf T. Papiervorschub oben und unten 25 mm/s, Mitte 50 mm/s, Eichung 1 cm = 1 mV.",
    "zahlen": "140 / 60 / 280 pro min",
    "seite": "42",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Steckbrief Sinusbradykardie: Sinusrhythmus mit einer Herzfrequenz unter 70/min bei kleinen und mittelgrossen Hunderassen, unter 60/min bei grossen Hunderassen und unter 100/min bei der Katze. Normale P-Welle gefolgt von schmalem QRS, regelmaessiger Rhythmus mit konstanten PP- und PQ-Intervallen bzw. respiratorische Sinusarrhythmie.",
    "zahlen": "< 70/min (kleine/mittelgrosse Hunde); < 60/min (grosse Hunde); < 100/min (Katze)",
    "seite": "43",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Sinusbradykardie: physiologisch bei gut trainierten Hunden sowie in Ruhe und im Schlaf durch erhoehten Vagotonus; pathologisch bei Hypothyreose, Niereninsuffizienz, Morbus Addison, dekompensierter Herzinsuffizienz im Endstadium, ZNS-Erkrankungen mit erhoehtem Hirndruck und Sick-Sinus-Syndrom; medikamentoes durch Digitalis, Beta-Rezeptorblocker und andere Antiarrhythmika. Bei schwerer Symptomatik Schrittmacherindikation pruefen.",
    "zahlen": "",
    "seite": "43",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Bradykarde und tachykarde Rhythmusstoerungen (genannt werden Adams-Stokes-Anfaelle) senken das Herzminutenvolumen und koennen zur arteriellen Hypotonie fuehren.",
    "zahlen": "",
    "seite": "PDF 119 = Buchseite 119",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Bei Katzen sind E- und A-Welle des Mitraleinstroms aufgrund der hohen Herzfrequenz haeufig fusioniert. Die hohe Katzenfrequenz ist damit auch ein Messproblem der Diastolenbeurteilung.",
    "zahlen": "",
    "seite": "PDF 99 = Buchseite 99",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Bei Hunden mit respiratorischer Arrhythmie variiert die Dauer der Diastole erheblich, weshalb EKG-getriggerte 3D-Volumenscans nur nach zahlreichen Versuchen oder gar nicht gelingen. Hecheln verhindert die Registrierung vollstaendig.",
    "zahlen": "",
    "seite": "PDF 106 = Buchseite 106",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Definition Arrhythmie: Eine Arrhythmie liegt vor, wenn die R-R-Abstaende benachbarter Komplexe um mehr als 10 % voneinander abweichen.",
    "zahlen": "Pruefbedingung: |RR(n) - RR(n-1)| > 10 % -> Arrhythmie",
    "seite": "PDF 9 (Buch 147)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Respiratorische Sinusarrhythmie beim Hund: die Herzfrequenz steigt bei der Inspiration und faellt bei der Exspiration; sie ist physiologisch und entsteht durch Atmung und Schwankungen des vagalen Tonus.",
    "zahlen": "HF steigt inspiratorisch, faellt exspiratorisch",
    "seite": "PDF 9 (Buch 147)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Steckbrief Sinusrhythmus: normale Herzfrequenz, regelmaessiger Rhythmus, positive P-Wellen in I, II, III und aVF, eine P-Welle je QRS-Komplex und ein QRS-Komplex je P-Welle sowie ein konstantes P-R-Intervall (PQ-Dauer).",
    "zahlen": "P:QRS = 1:1; P positiv in I, II, III, aVF; PQ konstant",
    "seite": "PDF 10 (Buch 148)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "In besonderen Situationen (Stress, Angst, Fieber) kann die normale Herzfrequenz hoeher liegen; man spricht dann von einer Sinustachykardie.",
    "zahlen": "",
    "seite": "PDF 10 (Buch 148)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Bei Ausfall des Sinusknotens uebernimmt ein distal gelegenes Sicherheitssystem (ektopischer Schrittmacher, AV-Knoten-Ersatzrhythmus oder ventrikulaerer Ersatzrhythmus). Diese untergeordneten Zentren haben eine niedrigere Frequenz und ein kleineres Frequenzspektrum.",
    "zahlen": "",
    "seite": "PDF 10 (Buch 148)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Kriterien eines normofrequenten Sinusrhythmus (Praxistipp): Frequenz Hund 60-160/min beim grossen Hund bis 180/min beim kleinen Hund; Katze 150 plus/minus 23/min in Ruhe, ab 240/min definitiv erhoeht.",
    "zahlen": "Hund 60-160/min (gross) bis 180/min (klein); Katze 150 +/- 23/min, ab 240/min erhoeht",
    "seite": "PDF 11 (Buch 149)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Weitere Kriterien des normofrequenten Sinusrhythmus (Praxistipp): jeder P-Welle folgt ein QRS-Komplex; positive gleichmaessige P-Wellen in I, II, III und aVF; konstantes PQ-Intervall (Hund 0,06-0,13 s, Katze 0,04-0,09 s); gleichmaessiger RR-Abstand; gleichmaessige QRS-Komplexe. Der hier fuer die Katze genannte Untergrenzwert 0,04 s weicht von Tab. 10.1 und dem Steckbrief (0,05 s) ab.",
    "zahlen": "PQ Hund 0,06-0,13 s; Katze hier 0,04-0,09 s (anderswo 0,05-0,09 s)",
    "seite": "PDF 11 (Buch 149)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Respiratorische Sinusarrhythmie nach Tab. 10.4: Herzfrequenz steigt bei Inspiration und faellt bei Exspiration, Rhythmus regelmaessig bis unregelmaessig, weiterer EKG-Befund atmungssynchron. Ursache: physiologische Schwankungen im Vagotonus und bei Inspiration erhoehter Blutzufluss zum Herzen.",
    "zahlen": "",
    "seite": "PDF 12 (Buch 150)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Wandernder Schrittmacher nach Tab. 10.4: Herzfrequenz normal, Rhythmus regelmaessig, die P-Wellen variieren. Ursache: unterschiedliches Entstehungsgebiet des Impulses innerhalb des Sinusknotens und unterschiedliche Ausbreitungsrichtung ueber das Vorhofmyokard.",
    "zahlen": "Pruefbedingung: HF normal + RR regelmaessig + P-Amplitude wechselnd",
    "seite": "PDF 12 (Buch 150)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Sinusbradykardie nach Tab. 10.4: kleine Hunderassen unter 60-80 Schlaege/min, grosse Hunderassen unter 50-70 Schlaege/min, Katze unter 100 Schlaege/min; Rhythmus unregelmaessig, Pausen kleiner als 2 RR, Verhaeltnis P zu QRS gleich 1.",
    "zahlen": "kleiner Hund < 60-80/min; grosser Hund < 50-70/min; Katze < 100/min; Pausen < 2 RR",
    "seite": "PDF 12 (Buch 150)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Ursachen der Sinusbradykardie nach Tab. 10.4: kardial eine Sinusknotenerkrankung; extrakardial Hyperkaliaemie, erhoehte Vagotonie, Hypothermie und kardial bedingte Hypoxie.",
    "zahlen": "",
    "seite": "PDF 12 (Buch 150)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Sinustachykardie nach Tab. 10.4: kleine und grosse Hunderassen ueber der in der Tabelle mit 180 Schlaege/min angegebenen Grenze, Katze 240 Schlaege/min; Rhythmus regelmaessig, Verhaeltnis P zu QRS gleich 1. Ursachen physiologisch Aufregung, Stress, koerperliche Anstrengung; pathologisch Herzinsuffizienz, Fieber, Anaemie, Hyperthyreose, Schmerz, Hypovolaemie, Hypoxie.",
    "zahlen": "Hund 180 Schlaege/min; Katze 240 Schlaege/min",
    "seite": "PDF 12 (Buch 150)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Bei respiratorischer Sinusarrhythmie sind die R-Amplituden derjenigen Komplexe hoeher, die auf ein laengeres R-R-Intervall folgen; Ursache ist die staerkere Ventrikelfuellung.",
    "zahlen": "Pruefbedingung: R-Amplitude korreliert mit vorangehendem RR",
    "seite": "PDF 12 (Buch 150)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Wandernder Schrittmacher innerhalb eines grossen Sinusknotens (beim Hund): die P-Welle veraendert sich in der Hoehe, weil die Vorhoferregung einen anderen Verlauf nimmt. Das Phaenomen kann leicht mit Vorhofextrasystolen verwechselt werden. Bildparameter: Vorschub 50 mm/s, Amplitude 10 mm/mV, Ableitung II.",
    "zahlen": "50 mm/s; 10 mm/mV",
    "seite": "PDF 13 (Buch 151)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Befund Sinusbradykardie: Sinusknotenrhythmus mit einer Herzfrequenz unter 60 Schlaege/min beim Hund, unter 100 Schlaege/min bei der Katze.",
    "zahlen": "Hund < 60/min; Katze < 100/min",
    "seite": "PDF 13 (Buch 151)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Beispiel normale Sinusbradykardie im Schlaf eines 7-jaehrigen Dobermanns: die RR-Abstaende wechseln atmungsabhaengig, die umgerechnete Herzfrequenz liegt zwischen 48 und 76 Schlaegen/min.",
    "zahlen": "48-76 Schlaege/min",
    "seite": "PDF 13 (Buch 151)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Artspezifisch: Die beim Hund genannten physiologischen Variationen des normalen Herzrhythmus (respiratorische Sinusarrhythmie, wandernder Schrittmacher) kommen bei der Katze unter normalen Bedingungen nicht vor; schlafende Katzen koennen jedoch eine respiratorische Sinusarrhythmie entwickeln.",
    "zahlen": "",
    "seite": "PDF 13 (Buch 151)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Differenzialdiagnose der Sinusbradykardie ist der ventrikulaere Ersatzrhythmus. Eine Behandlung der Sinusbradykardie ist nur bei klinischen Symptomen erforderlich.",
    "zahlen": "",
    "seite": "PDF 14 (Buch 152)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Definitionsschwelle fuer Arrhythmie: Eine Arrhythmie liegt vor, wenn die R-R-Abstaende benachbarter Komplexe um mehr als 10 % voneinander abweichen.",
    "zahlen": "RR-Abweichung > 10 %",
    "seite": "PDF 9 / Buch 147",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Respiratorische Sinusarrhythmie beim Hund: Die Herzfrequenz steigt bei der Inspiration und faellt bei der Exspiration; Ursache sind Atmung und Schwankungen im vagalen Tonus.",
    "zahlen": "",
    "seite": "PDF 9 / Buch 147",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Steckbrief Sinusrhythmus: normale Herzfrequenz, regelmaessiger Rhythmus, positive P-Wellen in I, II, III und aVF, eine P-Welle fuer jeden QRS-Komplex und ein QRS-Komplex fuer jede P-Welle, konstantes P-R-Intervall (PQ-Dauer).",
    "zahlen": "P positiv in I, II, III, aVF; P:QRS = 1:1; PR konstant",
    "seite": "PDF 10 / Buch 148",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "In besonderen Situationen (Stress, Angst, Fieber) kann die normale Herzfrequenz hoeher liegen; dann spricht man von einer Sinustachykardie.",
    "zahlen": "",
    "seite": "PDF 10 / Buch 148",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Der Sinusknoten ist schneller als alle untergeordneten potenziellen Schrittmachersysteme. Faellt er aus, uebernimmt ein distal liegendes Sicherheitssystem (ektopischer Schrittmacher, Ersatzrhythmus des AV-Knotens oder ventrikulaerer Ersatzrhythmus) mit niedrigerer Frequenz und kleinerem Frequenzspektrum.",
    "zahlen": "",
    "seite": "PDF 10 / Buch 148",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Praxistipp Kriterien eines normofrequenten Sinusrhythmus, Frequenz: Hund 60-160 Schlaege/min (grosser Hund) bis 180 Schlaege/min (kleiner Hund); Katze 150 plus/minus 23 Schlaege/min in Ruhe, ab 240 Schlaege/min definitiv erhoeht.",
    "zahlen": "Hund 60-160 bis 180/min; Katze 150+/-23/min, ab 240/min erhoeht",
    "seite": "PDF 11 / Buch 149",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Praxistipp Kriterien eines normofrequenten Sinusrhythmus, weitere Bedingungen: jeder P-Welle folgt ein QRS-Komplex; positive gleichmaessige P-Wellen in I, II, III und aVF; konstantes PQ-Intervall (Hund 0,06-0,13 s, Katze an dieser Stelle mit 0,04-0,09 s angegeben); gleichmaessiger RR-Abstand; gleichmaessige QRS-Komplexe.",
    "zahlen": "PQ Hund 0,06-0,13 s; PQ Katze hier 0,04-0,09 s (abweichend von Tab. 10.1: 0,05-0,09 s)",
    "seite": "PDF 11 / Buch 149",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Der normale Herzrhythmus des Hundes weist zwei physiologische Phaenomene auf: die respiratorische Arrhythmie und den wandernden Schrittmacher.",
    "zahlen": "",
    "seite": "PDF 11 / Buch 149",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Tab. 10.4, respiratorische Sinusarrhythmie: Herzfrequenz steigt bei Inspiration und faellt bei Exspiration, Rhythmus regelmaessig bis unregelmaessig, atmungssynchron. Ursachen: physiologische Schwankungen im Vagotonus; bei Inspiration erhoehter Blutzufluss zum Herzen, Frequenz und Kontraktilitaet werden hochreguliert.",
    "zahlen": "",
    "seite": "PDF 12 / Buch 150",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Tab. 10.4, wandernder Schrittmacher: Herzfrequenz normal, Rhythmus regelmaessig, P-Wellen variieren. Ursache: unterschiedliches Entstehungsgebiet des Impulses innerhalb des Sinusknotens und unterschiedliche Ausbreitungsrichtung ueber das Vorhofmyokard.",
    "zahlen": "",
    "seite": "PDF 12 / Buch 150",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Tab. 10.4, Sinusbradykardie: kleine Hunderassen unter 60-80 Schlaege/min, grosse Hunderassen unter 50-70 Schlaege/min, Katze unter 100 Schlaege/min; Rhythmus unregelmaessig; Pausen kleiner als 2 RR-Abstaende; P-Wellen und QRS-Komplexe im Verhaeltnis 1:1.",
    "zahlen": "kleine Hunde <60-80/min; grosse Hunde <50-70/min; Katze <100/min; Pausen < 2 RR",
    "seite": "PDF 12 / Buch 150",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Tab. 10.4, Ursachen der Sinusbradykardie: kardial eine Sinusknotenerkrankung; extrakardial Hyperkaliaemie, erhoehte Vagotonie, Hypothermie, kardial bedingte Hypoxie.",
    "zahlen": "",
    "seite": "PDF 12 / Buch 150",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Tab. 10.4, Sinustachykardie: kleine und grosse Hunderassen ueber 180 Schlaege/min, Katze 240 Schlaege/min; Rhythmus regelmaessig; P-Welle und QRS im Verhaeltnis 1:1. Ursachen physiologisch (Aufregung, Stress, koerperliche Anstrengung) oder pathologisch (Herzinsuffizienz, Fieber, Anaemie, Hyperthyreose, Schmerz, Hypovolaemie, Hypoxie).",
    "zahlen": "Hund 180/min; Katze 240/min",
    "seite": "PDF 12 / Buch 150",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Bei respiratorischer Sinusarrhythmie sind die R-Amplituden jener Komplexe hoeher, die auf laengere R-R-Intervalle folgen; Ursache ist die staerkere Ventrikelfuellung.",
    "zahlen": "",
    "seite": "PDF 12 / Buch 150",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Sinusbradykardie Befund: Sinusknotenrhythmus mit einer Herzfrequenz unter 60 Schlaegen/min beim Hund, bei der Katze unter 100 Schlaegen/min.",
    "zahlen": "Hund < 60/min; Katze < 100/min",
    "seite": "PDF 13 / Buch 151",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Obwohl schlafende Katzen eine respiratorische Sinusarrhythmie entwickeln koennen, kommen die beim Hund genannten physiologischen Variationen des Herzrhythmus (respiratorische Arrhythmie, wandernder Schrittmacher) bei der Katze unter normalen Bedingungen nicht vor.",
    "zahlen": "",
    "seite": "PDF 13 / Buch 151",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Abb. 10.15: Normale Sinusbradykardie mit wechselnden RR-Abstaenden im Schlaf eines 7-jaehrigen Dobermanns; die RR-Abstaende wechseln atmungsabhaengig in einer umgerechneten Herzfrequenz von 48-76 Schlaegen/min.",
    "zahlen": "48-76 Schlaege/min",
    "seite": "PDF 13 / Buch 151",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-sinus",
    "text": "Bei Katzen hat eine myokardiale Hypoxie haeufig eine Sinusbradykardie zur Folge; diese ist dann Hinweis auf eine besonders schwere Myokarderkrankung. Ausnahme zur Regel: waehrend Herzversagen beim Hund zur Sinustachykardie fuehrt, kann es bei der Katze zur Sinusbradykardie fuehren.",
    "zahlen": "",
    "seite": "PDF 14 / Buch 152",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Pruefbare Abgrenzung Vorhofflimmern: der Rhythmus ist sehr unregelmaessig und die Herzfrequenz sehr hoch, ueber 180/min. Sind im EKG P-Wellen zu erkennen, handelt es sich nicht um ein Vorhofflimmern - das ist ein hartes Ausschlusskriterium.",
    "zahlen": "HF > 180/min; P-Wellen vorhanden = kein Vorhofflimmern",
    "seite": "PDF 3 (gedruckt 92)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Weitere Kennzeichen des Vorhofflimmerns ausserhalb der Kurve: bei der Auskultation eine Abfolge stark desorganisierter Herztoene, dadurch haeufig Pulsdefizite; die Arrhythmie ist dauerhaft und fast immer irreversibel.",
    "zahlen": "",
    "seite": "PDF 3 (gedruckt 92)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Pruefbare Bedingung supraventrikulaere Tachykardie: der ventrikulaere Anteil der Komplexe (QRS, ST-Strecke und T-Welle) ist normal und die Herzfrequenz liegt ueber 180 bpm. Sind P-Wellen vorhanden, kommen Sinustachykardie und supraventrikulaere Tachykardie in Frage.",
    "zahlen": "HF > 180 bpm; QRS/ST/T normal",
    "seite": "PDF 7 (gedruckt 96)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Unterscheidungsmerkmal zur Sinustachykardie: sind die P-Wellen mit der T-Welle des vorangegangenen Komplexes verschmolzen, spricht das fuer eine permanente supraventrikulaere Tachykardie. In dem Fall betrug die Frequenz 240 bpm und die P-Welle war nicht mehr abgrenzbar.",
    "zahlen": "HF 240 bpm; PR 0,10 s; QRS 0,05 s; R 1,9 mV; QT 0,18 s; ST normal; T normal",
    "seite": "PDF 7 (gedruckt 96)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Bigeminus (supraventrikulaer) ist als Muster definiert: auf jeden Sinusschlag folgt eine vorzeitig einfallende Vorhofextrasystole. Als Bedingung pruefbar ueber die Abfolge Sinus-SVES-Sinus-SVES.",
    "zahlen": "Verhaeltnis 1:1 Sinusschlag zu SVES",
    "seite": "PDF-S. 2 (Buchseite 190), Fall 28",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Fall 28 (Mischling, 15 Jahre, Klappenendokardiose): Sinusrhythmus mit Sinuskomplexen einer Frequenz von 60 bpm, dazu einzelne monofokale supraventrikulaere Extrasystolen im Bigeminus. Die Parametertabelle desselben Falles nennt als Herzfrequenz jedoch 120 bpm; beide Zahlen stehen so im Buch.",
    "zahlen": "Sinusfrequenz 60 bpm (Text); Herzfrequenz 120 bpm (Tabelle)",
    "seite": "PDF-S. 2 (Buchseite 190), Fall 28",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Bei einer regelmaessigen Tachykardie ohne erkennbare P-Wellen laesst sich supraventrikulaerer und ventrikulaerer Ursprung nicht sicher trennen. Differentialdiagnosen sind Vorhofflimmern, persistierende Vorhoftachykardie und permanente rechtsventrikulaere Tachykardie.",
    "zahlen": "Fall 31: regelmaessig, 290 bpm, keine P-Wellen",
    "seite": "PDF-S. 8 (Buchseite 196), Fall 31",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Kriterien supraventrikulaerer Extrasystolen (SVES): vorzeitiger Einfall, eine anders konfigurierte P-Welle als die Sinus-P-Welle (im Fall 33 negativ, sogenannte P'-Welle), gefolgt von einer kompensatorischen Pause. Der Ursprung liegt nicht im Sinusknoten, sondern in anderen Vorhofregionen.",
    "zahlen": "",
    "seite": "PDF-S. 12 (Buchseite 200), Fall 33",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Pruefbares Unterscheidungsmerkmal SVES gegen VES: bei SVES ist die QRS-Morphologie fast identisch mit der der Sinuskomplexe, bei VES ist der QRS-Komplex verbreitert und bizarr.",
    "zahlen": "QRS-Morphologie identisch (SVES) vs. verbreitert/bizarr (VES)",
    "seite": "PDF-S. 12 (Buchseite 200), Fall 33",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Vorhoftachykardie mit 320 bpm im Fall 35; zusaetzlich ueberhoehte R-Zacken als Zeichen einer linksventrikulaeren Hypertrophie bzw. Dilatation.",
    "zahlen": "HF 320 bpm; R-Zacke 2,6 mV",
    "seite": "PDF-S. 16 (Buchseite 204), Fall 35",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Bei sehr hoher Frequenz ueberlappen die T-Wellen der vorhergehenden QRS-Komplexe die P-Wellen. Deshalb laesst sich Sinustachykardie/Sinusarrhythmie nicht von einer Vorhoftachykardie aus einem ektopischen atrialen Zentrum unterscheiden.",
    "zahlen": "",
    "seite": "PDF-S. 16 (Buchseite 204), Fall 35",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Persistierender Vorhofstillstand (Vorhofstillstand mit Ersatzrhythmus) ist an zwei Bedingungen erkennbar: vollstaendiges Fehlen von P-Wellen und ein regelmaessiger Ersatzrhythmus mit normal konfigurierten QRS-Komplexen supraventrikulaeren oder ventrikulaeren Ursprungs.",
    "zahlen": "keine P-Wellen + regelmaessiger Ersatzrhythmus",
    "seite": "PDF-S. 20 (Buchseite 208), Fall 37",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Pruefbares Kriterium fuer einen Ursprung im atrioventrikulaeren Uebergang: die P-Wellen sind in Ableitung II negativ, obwohl sie dort positiv sein sollten. Der Impuls laeuft retrograd durch die Vorhoefe, was sich als invertierte P-Welle darstellt.",
    "zahlen": "P in Ableitung II negativ (Fall 38: -0,2 mV)",
    "seite": "PDF-S. 22 (Buchseite 210), Fall 38",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Bei einem Rhythmus aus dem AV-Uebergang bleibt die Erregungsausbreitung in den Ventrikeln normal, deshalb sind die QRS-Komplexe normal konfiguriert.",
    "zahlen": "Fall 38: QRS 0,06 s",
    "seite": "PDF-S. 22 (Buchseite 210), Fall 38",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Die normale Eigenfrequenz des atrioventrikulaeren Uebergangs betraegt 40-60 bpm; das ist die zu erwartende Frequenz eines Ersatzrhythmus aus dieser Region. Deshalb wird ein AV-Junktionsrhythmus mit 140 bpm als atrioventrikulaere (AV-)Tachykardie bezeichnet.",
    "zahlen": "AV-Uebergang Eigenfrequenz 40-60 bpm; Fall 38 gemessen 140 bpm",
    "seite": "PDF-S. 22 (Buchseite 210), Fall 38",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Eine Frequenz von mehr als 160 bpm bei einem Hund dieser (grossen) Groesse wird als Tachykardie gewertet; sind dabei keine P-Wellen zu identifizieren, kommen paroxysmale Vorhoftachykardie und Vorhofflimmern in Betracht.",
    "zahlen": "> 160 bpm bei grossem Hund",
    "seite": "PDF 26 (Buch 214)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Bei paroxysmaler Vorhoftachykardie verschmelzen die P-Wellen mit der T-Welle des vorhergehenden Komplexes; deshalb sind sie nicht als eigene Welle sichtbar.",
    "zahlen": "",
    "seite": "PDF 26 (Buch 214)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Beim Vorhofflimmern stehen anstelle der P-Wellen f-Wellen: kleine zittrige Ausschlaege der Grundlinie. Bei sehr hoher Frequenz sind sie nicht erkennbar, weil das T-QRS-Intervall so stark verkuerzt ist, dass keine Wellenbildung mehr wahrnehmbar ist.",
    "zahlen": "",
    "seite": "PDF 26 (Buch 214)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Die Vorhoftachykardie ist gekennzeichnet durch Fehlen der P-Wellen, erhoehte ventrikulaere Frequenz und einen sehr regelmaessigen Rhythmus. Genau die Regelmaessigkeit unterscheidet sie vom Vorhofflimmern, bei dem die RR-Intervalle sehr unregelmaessig sind. Als Bedingung: keine P-Wellen plus geringe RR-Streuung spricht fuer Vorhoftachykardie, keine P-Wellen plus hohe RR-Streuung fuer Vorhofflimmern.",
    "zahlen": "",
    "seite": "PDF 36 (Buch 224)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Der persistierende Vorhofstillstand ist gekennzeichnet durch vollstaendig fehlende P-Wellen und einen regelmaessigen Ersatzrhythmus mit QRS-Komplexen supraventrikulaeren oder ventrikulaeren Ursprungs; im Beispiel bei 50 bpm. Er entsteht, wenn das Vorhofmyokard nicht zur Depolarisation faehig ist.",
    "zahlen": "HF 50 bpm im Fallbeispiel",
    "seite": "PDF 40 (Buch 228)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Supraventrikulaere Extrasystolen sind vorzeitig einfallende Erregungen aus dem Vorhofgewebe, gekennzeichnet durch P-Wellen, deren Morphologie sich von der der normalen Sinuskomplexe unterscheidet (sogenannte P-Strich-Wellen). Pruefbedingung: vorzeitiger Schlag plus abweichende P-Form bei erhaltener, normal geformter QRS-Kontur.",
    "zahlen": "",
    "seite": "PDF 42 (Buch 230)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Die Vorhoftachykardie ist definiert als eine Serie von drei oder mehr Vorhofextrasystolen. Damit gilt fuer supraventrikulaer dieselbe Dreier-Schwelle wie fuer ventrikulaer.",
    "zahlen": "Vorhoftachykardie ab 3 aufeinanderfolgenden SVES",
    "seite": "PDF 42 (Buch 230)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Steckbrief supraventrikulaere Extrasystolen (SVES): vorzeitig einfallende Erregungen aus Sinusknoten, Voerhoefen, AV-Knoten oder His'schem Buendel, meist gefolgt von einer Kammererregung. Normale Herzfrequenz, schlanke QRS-Komplexe, vorzeitig einfallende Schlaege mit oder ohne sichtbare P-Wellen, jeweils gefolgt von einem normalen schmalen QRS-Komplex; bei refraktaerer Kammer fehlende Ueberleitung; verbreiterte QRS-Komplexe moeglich.",
    "zahlen": "",
    "seite": "43",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "SVES nach Ursprungsort: sinusknotennahe SVES zeigen kaum unterschiedliche P-Wellen; AV-knotennahe SVES zeigen bei retrograder Vorhofdepolarisation eine dem QRS vorangehende oder darin untergehende negative P-Welle; His-Buendel-nahe SVES haben durch retrograde Blockierung in der Regel keine P-Welle, der QRS-Komplex ist schmal und unter Umstaenden etwas deformiert.",
    "zahlen": "",
    "seite": "43",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Gehaeuft auftretende SVES sind moegliche Ausloeser von Vorhoftachykardien, Vorhofflattern oder Vorhofflimmern. Vorkommen bei jeder Erkrankung der Vorhoefe, bei Hyperthyreose, selten bei herzgesunden Hunden.",
    "zahlen": "",
    "seite": "43",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Steckbrief Vorhoftachykardie: drei oder mehr Vorhofextrasystolen in Folge, regelmaessiger Rhythmus, Herzfrequenz normal oder ueber 220/min beim Hund bzw. ueber 240/min bei der Katze; bei zu hoher Schlagfrequenz ist das Auftreten einer AV-Blockierung moeglich.",
    "zahlen": ">= 3 Vorhofextrasystolen in Folge; > 220/min (Hund); > 240/min (Katze)",
    "seite": "44",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Steckbrief Vorhofflattern: sehr seltene Rhythmusstoerung mit ungeklaerter Entstehung, hohe Schlagfrequenz der Vorhoefe. Regelmaessige, hochfrequente Vorhofaktionen als F-Wellen statt P-Wellen; der Rhythmus ist unregelmaessig, weil nicht alle Flatterwellen uebergeleitet werden; QRS-Komplex in der Regel unauffaellig; oft Uebergang in Vorhofflimmern.",
    "zahlen": "F-Wellen statt P-Wellen",
    "seite": "44",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Steckbrief Vorhofflimmern: Flimmerwellen (f-Wellen) statt P-Wellen als hochfrequente, voellig unregelmaessige Vorhofaktionen, am besten in Ableitung II erkennbar. Der Kammerrhythmus ist unregelmaessig, weil nicht alle Flimmerwellen uebergeleitet werden (absolute Arrhythmie); die QRS-Komplexe sind in der Regel unauffaellig, die Kammerfrequenz meist hoch. Praktisch keine Pumpfunktion der Vorhoefe.",
    "zahlen": "f-Wellen statt P-Wellen; absolute Arrhythmie; Erkennung am besten in Abl. II",
    "seite": "45",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Beispiele Vorhofflimmern: Hund mit DKM, HF 200/min, unregelmaessige f-Wellen und unregelmaessige RR-Abstaende (obere Zeile Abl. I, untere Abl. II, 25 mm/s, 1 cm = 1 mV); Katze mit HKM, HF 200/min, Vorhoferregungen nicht erkennbar, Flimmerwellen nur angedeutet, unregelmaessige AV-Ueberleitung, QRS schmal und normal geformt.",
    "zahlen": "HF je 200/min",
    "seite": "45",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Steckbrief AV-Tachykardie: die Sinusknotenfrequenz liegt kurzzeitig unter der AV-Knotenfrequenz, der AV-Knoten uebernimmt die Schrittmacherfunktion; bei Frequenzanstieg uebernimmt wieder der Sinusknoten. Rhythmus meist regelmaessig, beschleunigter AV-Rhythmus; P-Wellen negativ vor dem QRS-Komplex, von ihm ueberlagert oder nach ihm; PQ-Dauer normal oder verlaengert. Vorhoftachykardie und AV-Tachykardie sind in der Regel nicht zu unterscheiden.",
    "zahlen": "",
    "seite": "46",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Ersatzrhythmen nach Tab. 10.2 mit ihrer Ersatzfrequenz und QRS-Form: ektopischer Vorhofschrittmacher (Vorhof, supraventrikulaer) schmaler QRS, 75 Schlaege/min; AV-Knoten-Ersatzrhythmus schmaler QRS, 60 Schlaege/min.",
    "zahlen": "Vorhof 75/min schmal; AV-Knoten 60/min schmal",
    "seite": "PDF 11 (Buch 149)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Abgrenzung Sinustachykardie gegen supraventrikulaere Tachykardie (SVT): bei der SVT liegen ein oder mehrere Schrittmacher im Atrium, die schneller sind als der Sinusknoten, oder es besteht eine kreisfoermige Erregung (Reentry) im Vorhofmyokard bzw. AV-Knoten; die Herzfrequenz ist charakteristischerweise zu hoch fuer den Patienten und die jeweilige Situation.",
    "zahlen": "",
    "seite": "PDF 14 (Buch 152)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Supraventrikulaere Extrasystolen entstehen, wenn Bereiche von Myokardnekrose nach Infektion, eine Kardiomyopathie des Vorhofmyokards oder starke Hypoxie/Ischaemie zu einem ektopischen Schrittmacher werden und den Sinusrhythmus stoeren.",
    "zahlen": "",
    "seite": "PDF 16 (Buch 154)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Nach ihrer Lage im Vorhof unterscheidet man Vorhofextrasystolen (AES) und AV-Extrasystolen. AV-Knoten-assoziierten Extrasystolen geht eine elektrisch negative P-Welle voraus; die P-Welle kann aber auch dem QRS-Komplex folgen oder darin verschwinden. Bei der Vorhofextrasystole kann die P-Wellenform je nach Sitz des Schrittmachers unterschiedlich sein.",
    "zahlen": "AV-ES: negative P vor/nach/im QRS",
    "seite": "PDF 17 (Buch 155)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Vorhofextrasystole (AES): vorzeitig einfallende, deformierte, positive P-Welle, unveraenderter QRS-Komplex und anschliessend eine nicht kompensatorische Pause. Nicht kompensatorisch heisst: das Intervall zwischen dem vorhergehenden und dem auf die AES folgenden QRS-Komplex ist kuerzer als der doppelte R-R-Abstand.",
    "zahlen": "Pruefbedingung: Intervall QRS(vor) bis QRS(nach) < 2 x RR",
    "seite": "PDF 18 (Buch 156)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "AV-Extrasystole: vorzeitig einfallende, negative P-Welle kurz vor dem unveraenderten QRS-Komplex und anschliessend eine nicht kompensatorische Pause; in Ableitung II ist die P-Welle negativ.",
    "zahlen": "Pruefbedingung: negative P in II unmittelbar vor unveraendertem QRS",
    "seite": "PDF 18 (Buch 156)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Sind mehrere Schrittmacher im Vorhof vorhanden, erscheinen die AES polymorph, jede entsprechend der Lokalisation ihres Zentrums mit unterschiedlicher Morphologie und elektrischer Ladung (polytope AES).",
    "zahlen": "",
    "seite": "PDF 18 (Buch 156)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Supraventrikulaere Tachykardie (SVT): entsteht durch gekoppelte AES oder kreisende Erregungen (Reentry). Die Herzfrequenz kann ueber 300 Schlaege/min erreichen. Typisch ist eine Folge schmaler QRS-Komplexe ohne sichtbare P-Wellen, die mit den vorhergehenden T-Wellen verschmelzen. Eine SVT kann haeufig durch ein vagales Manoever (Karotismassage oder Bulbusdruck) terminiert werden.",
    "zahlen": "HF ueber 300 Schlaege/min; QRS schmal; P nicht sichtbar",
    "seite": "PDF 18 (Buch 156)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Vorhofflattern und Vorhofflimmern sind durch zahlreiche Schrittmacherzentren bedingt: beim Flattern entstehen 250-350 Flatterwellen pro Minute, beim Vorhofflimmern 300-600 Flimmer- (f-)Wellen pro Minute.",
    "zahlen": "Flattern 250-350 Wellen/min; Flimmern 300-600 f-Wellen/min",
    "seite": "PDF 18 (Buch 156)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Zu den Ursachen von Vorhofflimmern zaehlen neben den fuer SVES genannten auch genetische Veranlagungen, besonders bei Riesenrassen.",
    "zahlen": "",
    "seite": "PDF 18 (Buch 156)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Vergleichsbild supraventrikulaerer Extrasystolen: oben polytope AES mit positiver AES und einer in die T-Welle verschmolzenen P-Welle; in der Mitte negative P-Wellen bei AV-Extrasystolen; unten normales EKG (Hund, Ableitung II).",
    "zahlen": "",
    "seite": "PDF 19 (Buch 157)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Beispiel supraventrikulaere Tachykardie (Hund, Einthoven II): nach dem dritten Sinuskomplex folgt eine atriale Tachykardie mit schmalen QRS-Komplexen; die P-Wellen verschwinden teilweise in den vorausgehenden T-Wellen. Ploetzlicher Beginn und abruptes Ende sprechen fuer eine Reentry-Tachykardie.",
    "zahlen": "Pruefbedingung Reentry: abrupter Beginn und abruptes Ende",
    "seite": "PDF 19 (Buch 157)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Vorhofflattern im Bild: zahlreiche P-Wellen bis zu 350 Wellen pro Minute (Hund, Ableitung II).",
    "zahlen": "bis 350 Flatterwellen/min",
    "seite": "PDF 20 (Buch 158)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Vorhofflimmern im EKG: Fehlen einer P-Welle und ein mehr oder weniger unregelmaessiger Kammerrhythmus. Die klassischen f-Wellen sind nicht immer und nicht in jeder Ableitung sichtbar. Bildparameter: Papiervorschub 100 mm/s, Hund, Ableitung II.",
    "zahlen": "Pruefbedingung: keine P-Welle + unregelmaessiger Kammerrhythmus; Bild bei 100 mm/s",
    "seite": "PDF 21 (Buch 159)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Differenzialdiagnose zur Sinustachykardie ist die supraventrikulaere Tachykardie (SVT): ein oder mehrere Schrittmacher im Atrium, die schneller sind als der Sinusknoten, oder eine kreisfoermige Erregung (Reentry) im Vorhofmyokard bzw. AV-Knoten. Die Herzfrequenz ist bei der SVT charakteristischerweise zu hoch fuer Patient und Situation.",
    "zahlen": "",
    "seite": "PDF 14 / Buch 152",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Ursachen supraventrikulaerer Extrasystolen (SVES): Bereiche von Myokardnekrose nach Infektion, Kardiomyopathie des Vorhofmyokards oder starke Hypoxie/Ischaemie koennen zum ektopischen Schrittmacher werden und den Sinusrhythmus stoeren.",
    "zahlen": "",
    "seite": "PDF 16 / Buch 154",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "AV-Extrasystolen (AV-Knoten-assoziiert): Ihnen geht eine elektrisch negative P-Welle voraus. Die P-Welle kann allerdings auch dem QRS-Komplex folgen oder darin verschwinden.",
    "zahlen": "",
    "seite": "PDF 17 / Buch 155",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Vorhofextrasystole (AES): Die Form der P-Welle kann je nach Sitz des Schrittmachers unterschiedlich sein. Sind mehrere Schrittmacher im Vorhof vorhanden, erscheinen die AES polymorph, jede gemaess Lokalisation mit unterschiedlicher Morphologie und elektrischer Ladung.",
    "zahlen": "",
    "seite": "PDF 18 / Buch 156",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Supraventrikulaere Tachykardie (SVT): entsteht durch Kopplung mehrerer AES oder durch kreisende Erregung (Reentry). Die Herzfrequenz ist eine der hoechstmoeglichen und kann ueber 300 Schlaege/min erreichen. Typisch ist die Folge schmaler QRS-Komplexe ohne sichtbare P-Wellen, die mit den vorhergehenden T-Wellen verschmelzen. Eine SVT kann haeufig durch ein vagales Manoever (Karotismassage oder Bulbusdruck) terminiert werden.",
    "zahlen": "ueber 300 Schlaege/min; QRS schmal; keine sichtbaren P",
    "seite": "PDF 18 / Buch 156",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Vorhofflattern und Vorhofflimmern sind durch zahlreiche Schrittmacherzentren bedingt: Beim Flattern betraegt die Entladungsfrequenz 250-350 Flatterwellen/min, beim Vorhofflimmern 300-600 Flimmerwellen (f-Wellen)/min.",
    "zahlen": "Flattern 250-350/min; Flimmern 300-600 f-Wellen/min",
    "seite": "PDF 18 / Buch 156",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Ursachen fuer Vorhofflimmern sind neben den fuer SVES genannten auch genetische Veranlagungen, besonders bei Riesenrassen.",
    "zahlen": "",
    "seite": "PDF 18 / Buch 156",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Abb. 10.21 Vorhofextrasystole (AES): vorzeitig einfallende, deformierte positive P-Welle, unveraenderter QRS-Komplex und anschliessend eine NICHT kompensatorische Pause, das heisst das Intervall zwischen dem vorhergehenden und dem auf die AES folgenden QRS ist kuerzer als der doppelte R-R-Abstand.",
    "zahlen": "Intervall vorher-nachher < 2 x RR",
    "seite": "PDF 18 / Buch 156",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Abb. 10.22 AV-Extrasystolen: vorzeitig einfallende, negative P-Welle kurz vor dem unveraenderten QRS-Komplex und anschliessend eine nicht kompensatorische Pause.",
    "zahlen": "negative P vor QRS; nicht kompensatorische Pause",
    "seite": "PDF 18 / Buch 156",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Abb. 10.24 supraventrikulaere Tachykardie (Hund, Einthoven II): Die QRS-Komplexe sind schmal, die P-Wellen verschwinden teilweise in den vorausgehenden T-Wellen. Ein ploetzlicher Beginn und ein abruptes Ende sprechen fuer eine Reentry-Tachykardie.",
    "zahlen": "",
    "seite": "PDF 19 / Buch 157",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Abb. 10.23 Vergleich supraventrikulaerer Extrasystolen: polytope AES koennen positiv sein oder mit der T-Welle verschmelzen; AV-Extrasystolen zeigen negative P-Wellen.",
    "zahlen": "",
    "seite": "PDF 19 / Buch 157",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Abb. 10.25 Vorhofflattern: zahlreiche P-Wellen, bis zu 350 Wellen/min.",
    "zahlen": "bis 350 Wellen/min",
    "seite": "PDF 20 / Buch 158",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-supraventrikulaer",
    "text": "Abb. 10.26 Vorhofflimmern: Fehlen einer P-Welle und mehr oder weniger unregelmaessiger Kammerrhythmus; Papiervorschub 100 mm/s. Die klassischen f-Wellen sind nicht immer und nicht in jeder Ableitung sichtbar.",
    "zahlen": "100 mm/s; keine P-Welle; unregelmaessiger Kammerrhythmus",
    "seite": "PDF 21 / Buch 159",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Der Ersatzrhythmus beim AV-Block III ist vollkommen unabhaengig und hat eine Frequenz unterhalb der normalen; je nach Entstehungsort betraegt sie zwischen 40 und 60 Schlaege pro Minute. Das ist die einzige Frequenzangabe zu Ersatzrhythmen in diesem Abschnitt.",
    "zahlen": "Ersatzrhythmus 40 - 60 Schlaege/min",
    "seite": "PDF 41 (Buch 28)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Drei charakteristische EKG-Zeichen einer ventrikulaeren Extrasystole (VES): (1) Fehlen einer P-Welle vor dem QRS-Komplex; (2) deutliche Verbreiterung und bizarre Konfiguration des QRS-Komplexes; (3) T-Welle mit vergroesserter Amplitude, entgegengesetzt zur Hauptausschlagrichtung des QRS-Komplexes.",
    "zahlen": "3 Kriterien: keine P, QRS verbreitert/bizarr, T diskordant und vergroessert",
    "seite": "PDF-S. 6 (Buchseite 194), Fall 30",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Faellt die P-Welle des Sinuskomplexes in den Beginn einer VES, wird sie von dieser ueberlagert. Das scheinbare PR-Intervall vor der VES ist dann kuerzer als bei den normalen P-QRS-T-Komplexen desselben Streifens.",
    "zahlen": "PR vor VES < PR der Sinuskomplexe",
    "seite": "PDF-S. 6 (Buchseite 194), Fall 30",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Ausloeser fuer VES und andere ventrikulaere Arrhythmien: primaere Kardiopathien (angeboren oder erworben, Myokarditis), Stoffwechselstoerungen (Anaemie, Septikaemie, Azotaemie), Schmerzen/Erregungszustaende/Fieber, Myokardhypoxie oder -ischaemie jeder Ursache, Hyperthyreose, Magendilatation bzw. Magendrehung, Pharmakaintoxikation (Digoxin, Thyroxin).",
    "zahlen": "",
    "seite": "PDF-S. 6 (Buchseite 194), Fall 30",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Therapieschwelle: Das Auftreten einer einzigen ventrikulaeren Extrasystole ist kein Grund fuer eine antiarrhythmische Therapie.",
    "zahlen": "1 VES im Streifen = keine Therapieindikation",
    "seite": "PDF-S. 6 (Buchseite 194), Fall 30",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Fehlen bei einem Tier mit VES sowohl Herzgeraeusche als auch EKG-Zeichen einer Ventrikelvergroesserung, ist die Ursache der Arrhythmie hoechstwahrscheinlich extrakardial.",
    "zahlen": "",
    "seite": "PDF-S. 6 (Buchseite 194), Fall 30",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Klinisches Ausschlusskriterium: Eine rechtsventrikulaere Tachykardie ist haemodynamisch sehr ineffizient und erzeugt rasch schwere Symptome eines niedrigen Herzminutenvolumens. Ein Tier, das trotz hoher Frequenz nicht im Schock ist, hat daher eher eine supraventrikulaere Tachykardie.",
    "zahlen": "",
    "seite": "PDF-S. 8 (Buchseite 196), Fall 31",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Vollstaendiger Merkmalssatz einer linksventrikulaeren Extrasystole am Beispiel Fall 32: breiter QRS-Komplex, in Ableitung II negativ, ueberhoehte T-Welle entgegengesetzt zur QRS-Hauptausschlagrichtung, vorzeitiger Einfall und nachfolgende kompensatorische Pause.",
    "zahlen": "",
    "seite": "PDF-S. 10 (Buchseite 198), Fall 32",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Fall 36 (Boxer, 5 Jahre, Synkopen): regelmaessiger Sinusgrundrhythmus mit 120 bpm und einzelnen monofokalen, relativ haeufigen linksventrikulaeren Extrasystolen bis zu 20 pro Minute, jedoch ohne R-auf-T-Phaenomen. Die uebrigen Wellen, Intervalle und Strecken des Sinusrhythmus sind normal.",
    "zahlen": "Sinus 120 bpm; VES bis 20 pro Minute; kein R-auf-T",
    "seite": "PDF-S. 18 (Buchseite 206), Fall 36",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Bei einem Boxer mit Synkopen und ventrikulaeren Extrasystolen ohne Herzgeraeusch sind dilatative Kardiomyopathie und arrhythmogene Kardiomyopathie des Boxers die wahrscheinlichsten Diagnosen; bei der arrhythmogenen Form gehen die Extrasystolen vom rechten Ventrikel aus. Seltener kommen Endokarditis, kongenitale Ventrikelmyokardanomalien, Myokarditis, akuter Myokardinfarkt (beim Hund sehr selten) und kardiale Neoplasien infrage.",
    "zahlen": "",
    "seite": "PDF-S. 18 (Buchseite 206), Fall 36",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Geht der Ersatzrhythmus beim Vorhofstillstand von den Ventrikeln aus, uebersteigt die Herzfrequenz normalerweise 40-60 bpm nicht. Im gezeigten Fall lag sie mit 80 bpm darueber.",
    "zahlen": "ventrikulaerer Ersatzrhythmus 40-60 bpm; Fall 37 gemessen 80 bpm",
    "seite": "PDF-S. 20 (Buchseite 208), Fall 37",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Definition der ventrikulaeren Extrasystole (VES): eine vorzeitige Erregung der Kammer.",
    "zahlen": "",
    "seite": "PDF 51 (Buch 140)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Erste von vier Bedingungen, unter denen eine VES-Therapie mit Antiarrhythmika gerechtfertigt ist: eine bestimmte VES-Haeufigkeit pro Minute wird ueberschritten.",
    "zahlen": "mehr als 20-30 VES pro Minute",
    "seite": "PDF 51 (Buch 140)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Zweite Therapiebedingung, und zugleich die Definition der ventrikulaeren Tachykardie in diesem Buch: zwei VES in Reihe, oder Phasen ventrikulaerer Tachykardie, worunter drei oder mehr VES in Reihe verstanden werden.",
    "zahlen": "2 VES in Reihe = Paar; 3 oder mehr VES in Reihe = ventrikulaere Tachykardie",
    "seite": "PDF 51 (Buch 140)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Dritte Therapiebedingung: die VES loesen selbst Anzeichen einer Herzinsuffizienz aus, etwa Synkopen oder Schwaeche. Das ist ein klinisches, kein EKG-Kriterium.",
    "zahlen": "",
    "seite": "PDF 51 (Buch 140)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Vierte Therapiebedingung, das R-auf-T-Phaenomen: die VES faellt noch waehrend der T-Welle des vorangehenden Herzzyklus ein. Das ist zeitlich messbar, wenn Ende der vorigen T-Welle und Beginn der VES bekannt sind.",
    "zahlen": "VES-Beginn liegt vor dem Ende der vorangehenden T-Welle",
    "seite": "PDF 51 (Buch 140)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Eine einzelne VES ohne diese vier Bedingungen und bei sekundaerer Ursache rechtfertigt keine antiarrhythmische Therapie.",
    "zahlen": "1 VES im Streifen = keine Therapie",
    "seite": "PDF 51 (Buch 140)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Extrakardiale Ausloeser ventrikulaerer Tachyarrhythmien, die vor einer kardialen Diagnose auszuschliessen sind: Stoffwechselstoerungen wie Anaemie, Septikaemie und Azotaemie; Schmerzen, Erregungszustaende, Fieber; Hypoxie oder Ischaemie des Myokards; Hyperthyreose; Magendilatation und Magendrehung; Vergiftung durch Pharmaka wie Digoxin oder Thyroxin.",
    "zahlen": "",
    "seite": "PDF 51 (Buch 140)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Bei fortgeschrittener Aortenstenose zeigen sich im EKG grundlegend zwei Dinge: ventrikulaere Tachykardie und Zeichen der linksventrikulaeren Hypertrophie beziehungsweise Dilatation, naemlich hohe R-Zacken und breite QRS-Komplexe.",
    "zahlen": "",
    "seite": "PDF 41 (Buch 130)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Die ventrikulaere Tachykardie ist definiert als Folge von drei oder mehr ventrikulaeren Extrasystolen. Das ist als Zaehlbedingung ueber aufeinanderfolgende breite Komplexe unmittelbar pruefbar.",
    "zahlen": "VT ab 3 aufeinanderfolgenden VES",
    "seite": "PDF 24 (Buch 212)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Ventrikulaere Extrasystolen zeigen sich in typisch breiter und bizarrer Form, wobei die T-Welle die entgegengesetzte Ausschlagrichtung des QRS-Komplexes hat. Die Diskordanz von QRS und T ist damit ein eigenstaendiges Erkennungsmerkmal.",
    "zahlen": "",
    "seite": "PDF 24 (Buch 212)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Multifokale ventrikulaere Extrasystolen (VES unterschiedlicher Morphologie innerhalb derselben Aufzeichnung) erhoehen den Schweregrad und begruenden eine spezifische antiarrhythmische Therapie.",
    "zahlen": "",
    "seite": "PDF 24 (Buch 212)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Das R-auf-T-Phaenomen wird definiert als Einfallen der R-Zacke der Extrasystole in die T-Welle der vorhergehenden Herzaktion. Es gehoert zu den Kriterien, die eine antiarrhythmische Therapie ausloesen.",
    "zahlen": "",
    "seite": "PDF 24 (Buch 212)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Eine ventrikulaere Tachykardie mit einer Ventrikelfrequenz von ueber 200 bpm gilt als schwerwiegend und therapiepflichtig.",
    "zahlen": "VT-Kammerfrequenz > 200 bpm",
    "seite": "PDF 24 (Buch 212)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Eine persistierende (anhaltende) ventrikulaere Tachykardie zaehlt ebenfalls zu den Kriterien, bei denen eine spezifische antiarrhythmische Therapie eingeleitet werden muss.",
    "zahlen": "",
    "seite": "PDF 24 (Buch 212)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Als fuenftes Schweregradkriterium gelten Anzeichen signifikanter haemodynamischer Veraenderungen: Schwaeche, anamnestisch belegte Synkopen, Hypotonie, Schock, kongestive Herzinsuffizienz. Dieses Kriterium ist klinisch, nicht aus der Kurve ablesbar.",
    "zahlen": "",
    "seite": "PDF 24 (Buch 212)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Ein Bigeminus wird hier beschrieben als rechtsventrikulaere Extrasystolen in Bigeminus-Konfiguration bei einem Sinusrhythmus von 100 bpm, also als regelmaessiger Wechsel von Sinusaktion und Extrasystole.",
    "zahlen": "",
    "seite": "PDF 34 (Buch 222)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Ursachenliste ventrikulaerer Extrasystolen: fortgeschrittene chronische Klappenendokardiose, idiopathische dilatative Kardiomyopathie, Myokarditis, kongenitale Herzschaeden; alle Vorgaenge mit Myokardhypoxie oder -ischaemie wie schwere Atemwegserkrankungen; ausserdem Magendilatation/Volvulus, Pankreatitis, Anaemie, Elektrolytimbalanzen, Azotaemie, Fieber, Schmerzen und Stress.",
    "zahlen": "",
    "seite": "PDF 34 (Buch 222)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Beschreibungsschema fuer VES im Befund: Grundrhythmus (hier Sinusarrhythmie), Anzahl der Herde (monofokal), Ursprungsseite (linksventrikulaer), Vorliegen oder Fehlen des R-auf-T-Phaenomens und die Haeufigkeit in Extrasystolen pro Minute - hier 20 Extrasystolen pro Minute im betrachteten EKG-Abschnitt.",
    "zahlen": "20 VES/min im betrachteten Abschnitt",
    "seite": "PDF 46 (Buch 234)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Liegen nicht mehr als 20 Extrasystolen pro Minute vor (und fehlen R-auf-T sowie klinische Komplikationen), ist keine spezifische medikamentoese Behandlung erforderlich. Das ist eine direkt implementierbare Zaehlschwelle fuer die Dringlichkeitsstufe.",
    "zahlen": "Schwelle 20 VES/min",
    "seite": "PDF 46 (Buch 234)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Nach Magendrehung koennen VES entstehen durch Reperfusionstrauma nach Zurueckdrehen des Volvulus, Freisetzung freier Radikale, Hypoxie infolge thorakaler Kompression und vaskulaerer Stauung, ausserdem durch die Anaesthesie, Sepsis bei Laesionen des Verdauungstrakts oder schwere Elektrolytimbalanzen.",
    "zahlen": "",
    "seite": "PDF 46 (Buch 234)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Ventrikulaere Extrasystolen (VES) sind verbreitert, weil die Reizleitung im Myokard langsamer ablaeuft als ueber das Reizleitungssystem; deformiert sind sie, weil die Erregungswelle einen anderen Weg nimmt als eine vom AV-Knoten kommende Erregung.",
    "zahlen": "",
    "seite": "PDF 48 = Buch 48",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Zaehlregeln des Buches fuer VES-Folgen: zwei VES in direkter Folge = Couplet, drei VES = Triplet. Bei fixer Kopplung mit Sinusschlaegen: Bigeminus = 1 VES + 1 Normosystole, Trigeminus = 2 VES + 1 Normosystole.",
    "zahlen": "Couplet = 2 VES; Triplet = 3 VES; Bigeminus 1:1; Trigeminus 2 VES : 1 Normosystole",
    "seite": "PDF 48 = Buch 48",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Formunterscheidung: monotope VES haben nur einen Ursprung (gleiche Form), polytope VES mehrere Ursprünge (unterschiedliche Formen). Multifokale VES werden auch polymorph genannt.",
    "zahlen": "",
    "seite": "PDF 48/50 = Buch 48/50",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Steckbrief VES - pruefbare Kriterien: QRS-Komplex vorzeitig, breit und bizarr; T-Welle entgegengesetzt zur Hauptausschlagsrichtung des QRS; QRS unabhaengig von der P-Welle; Rhythmus unregelmaessig; Ursache ist eine fruehzeitige Impulsbildung durch ein ektopes Schrittmacherzentrum in den Ventrikeln.",
    "zahlen": "",
    "seite": "PDF 48 = Buch 48",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Ursprungsseite einer VES am Hauptausschlag in Ableitung II: linksventrikulaere ES = Hauptausschlagsrichtung des QRS negativ in Abl. II; rechtsventrikulaere ES = positiv in Abl. II.",
    "zahlen": "",
    "seite": "PDF 48 = Buch 48",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Sehr frueh einfallende VES treffen die Kammer noch ohne ausreichende Fuellung, erzeugen kaum Auswurfvolumen; die nachfolgende normale Erregung kann auf die noch refraktaere Kammer treffen und wird dann blockiert.",
    "zahlen": "",
    "seite": "PDF 48 = Buch 48",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Vorkommen von VES: primaere Herzerkrankungen (Stauungsinsuffizienz, Kardiomyopathien besonders Boxer und Dobermann, Myokarditis, Perikarditis, Tumoren) sowie sekundaere kardiale Stoerungen (Magendrehung/Volvulus, Hypoxie, Anaemie, Uraemie, schwere Infektionen).",
    "zahlen": "",
    "seite": "PDF 49 = Buch 49",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Bildbeispiel Bigeminus (Katze mit arterieller Hypertonie und HKM): auf jede normale Erregung folgt eine vorzeitig einfallende monotope VES desselben ektopischen Zentrums; zusaetzlich Highvoltage und ST-Senkung.",
    "zahlen": "Papiervorschub 25 mm/s; Eichung 1 cm = 1 mV",
    "seite": "PDF 49 = Buch 49",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Bildbeispiel Triplet (Hund mit Myokardmetastase): auf zwei normale Erregungen folgen drei nahezu gleiche (monotope) VES in Kette hintereinander.",
    "zahlen": "Papiervorschub 25 mm/s; Eichung 0,5 cm = 1 mV",
    "seite": "PDF 50 = Buch 50",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Bildbeispiel multifokale VES (Boxer mit Stauungsinsuffizienz bei DKM): nach der ersten normalen Erregung folgen salvenartig ausschliesslich multifokale (polymorphe) linksventrikulaere Extrasystolen.",
    "zahlen": "Papiervorschub 25 mm/s; Eichung 0,5 cm = 1 mV",
    "seite": "PDF 50 = Buch 50",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Steckbrief ventrikulaere Tachykardie (VT): mehrere hintereinander folgende breite, bizarre QRS-Komplexe; Rhythmus regelmaessig mit einer ventrikulaeren Frequenz ueber 100/min; kein Zusammenhang zwischen P-Welle und den ventrikulaeren Komplexen; vorhandene P-Wellen sind normal geformt.",
    "zahlen": "ventrikulaere Frequenz > 100/min",
    "seite": "PDF 51 = Buch 51",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Definition der VT-Formen: voruebergehende ventrikulaere Tachykardie = drei oder mehr VES in Folge; staendige ventrikulaere Tachykardie = alle Komplexe ventrikulaeren Ursprungs. Uebergang in Kammerflattern bzw. -flimmern moeglich.",
    "zahlen": ">= 3 VES in Folge = voruebergehende VT",
    "seite": "PDF 51 = Buch 51",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Bildbeispiel Rhythmuskontrolle nach Magendrehung: Zeile 1 tachykarder supraventrikulaerer Rhythmus HF 220/min mit normalen QRS und vorhandener, teils von der vorangehenden T-Welle verdeckter P-Welle; Zeile 3 ventrikulaere Tachykardie HF 300/min mit deformierten QRS und nicht erkennbaren P-Wellen.",
    "zahlen": "HF 220/min supraventrikulaer; HF 300/min ventrikulaer; Papiervorschub 25 mm/s",
    "seite": "PDF 51 = Buch 51",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Steckbrief Kammerflattern: gleichmaessige, haarnadelfoermige Kammerkomplexe mit hoher Amplitude und OHNE isoelektrisches Intervall; Frequenz hoeher als bei Kammertachykardie; geht oft in Kammerflimmern ueber; Entstehung durch kreisende Erregung im Ventrikel.",
    "zahlen": "",
    "seite": "PDF 52 = Buch 52",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Steckbrief Kammerflimmern: viele unkoordinierte, unterschiedlich hohe, unregelmaessige Zacken (grob oder fein); Rhythmus unregelmaessig; keine regulaeren Vorhof- oder Kammererregungen erkennbar; keine mechanische Herzarbeit.",
    "zahlen": "",
    "seite": "PDF 52 = Buch 52",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Bildbeispiel (Hund mit Myokarditis): Kammerflattern mit haarnadelfoermigen, anfangs hohen Kammerkomplex-Amplituden ohne isoelektrisches Intervall bei HF 360/min, danach Uebergang in grobes Kammerflimmern mit voellig unregelmaessigen, verschieden grossen Oszillationen.",
    "zahlen": "HF 360/min; Papiervorschub 25 mm/s",
    "seite": "PDF 52 = Buch 52",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Steckbrief Asystolie: keine elektrische Erregungsbildung; bei sterbenden Patienten koennen noch sehr wenige, breite und deformierte QRS-Komplexe auftreten (dying heart).",
    "zahlen": "",
    "seite": "PDF 53 = Buch 53",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Prognostische Einteilung der Arrhythmien, Gruppe 1 (benigne, gelegentlich und voruebergehend): weniger als 10 unifokale ventrikulaere Extrasystolen pro Minute, Sinusbradykardie, Sinustachykardie.",
    "zahlen": "< 10 unifokale VES/min",
    "seite": "42",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Prognostische Einteilung der Arrhythmien, Gruppe 2 (maligne): mindestens 10 ventrikulaere Extrasystolen pro Minute, Bigeminus, anhaltende ventrikulaere Tachykardie, paroxysmale supraventrikulaere Tachykardie, Vorhofflattern, Vorhofflimmern, Kammerflattern, Kammerflimmern, AV-Block Grad II bzw. Grad III.",
    "zahlen": ">= 10 VES/min",
    "seite": "42",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Beim persistierenden AV-Kanal sind Tachykardien und Salven von Extrasystolen moeglich. Die Salve wird hier ohne Zahl der Schlaege definiert.",
    "zahlen": "",
    "seite": "PDF 140 = Buchseite 140",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Ventrikulaere Extrasystolen und andere Arrhythmien sind bei arterieller Hypertonie eher selten; EKG-Veraenderungen sind insgesamt nicht zwangslaeufig zu beobachten. Ein unauffaelliges EKG schliesst eine Hypertonie also nicht aus.",
    "zahlen": "",
    "seite": "PDF 117-118 = Buchseite 117-118",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Digoxin-Nebenwirkungen im EKG: ventrikulaere Arrhythmien, vor allem auf Basis sogenannter Late-Afterdepolarisation, sowie Bradyarrhythmien in Form von AV-Block Grad II oder III, sinuatrialem Block und Sinusbradykardie. Katzen sind fuer die toxische Wirkung von Digitalis besonders empfindlich.",
    "zahlen": "AV-Block Grad II oder III; SA-Block; Sinusbradykardie",
    "seite": "PDF-Seite 7 (Buchseite 435)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "In der Einthoven-II-Ableitung liegt der positive Pol auf der linken Herzseite. Extrasystolen aus der rechten Kammer laufen auf ihn zu und erzeugen einen positiven Ausschlag; Extrasystolen aus der linken Hauptkammer laufen ueberwiegend nach rechts und erzeugen ein negatives Signal. So laesst sich der Ursprungsort einer Rhythmusstoerung zuordnen.",
    "zahlen": "Pruefbedingung in II: VES positiv -> rechte Kammer; VES negativ -> linke Kammer",
    "seite": "PDF 8 (Buch 146)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Ventrikulaere Ersatzrhythmen nach Tab. 10.2, immer mit breitem QRS: oberes Myokard 45 Schlaege/min, mittleres Myokard 40 Schlaege/min, apikales Myokard 30 Schlaege/min.",
    "zahlen": "oberes Myokard 45/min; mittleres 40/min; apikales 30/min; QRS breit",
    "seite": "PDF 11 (Buch 149)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Tab. 10.5, keine P-Welle bei bizarrem QRS-Komplex: ventrikulaere Tachykardie oder Kammerflimmern bzw. Kammerflattern.",
    "zahlen": "Pruefbedingung: keine P + QRS bizarr",
    "seite": "PDF 22 (Buch 160)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Ventrikulaere Extrasystole (VES): verbreiterter/bizarrer Komplex ohne zugehoerige P-Welle, der frueher kommt als der zu erwartende naechste QRS-Komplex; danach folgt in der Regel eine kompensatorische Pause.",
    "zahlen": "",
    "seite": "PDF 25 (Buch 163)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Pruefbedingung fuer die kompensatorische Pause: der R-R-Abstand zwischen dem der Extrasystole vorangehenden und dem ihr folgenden QRS-Komplex entspricht dem doppelten R-R-Abstand zweier benachbarter normaler QRS-Komplexe.",
    "zahlen": "RR(vor-ES bis nach-ES) = 2 x normales RR",
    "seite": "PDF 25 (Buch 163)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Interpolation: eine VES ist zwischen zwei normale QRS-Komplexe mit normalem R-R-Intervall eingeschoben, die kompensatorische Pause fehlt also.",
    "zahlen": "",
    "seite": "PDF 25 (Buch 163)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Ventrikulaerer Ersatzschlag (escape beat): verbreiterter/bizarrer QRS-Komplex ohne zugehoerige P-Welle, der verspaetet auf den vorhergehenden QRS-Komplex folgt.",
    "zahlen": "",
    "seite": "PDF 25 (Buch 163)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Tab. 10.7: Nettoamplitude positiv, QRS-Komplex deutlich verbreitert und zu frueh, Anzahl der P-Wellen kleiner als die der QRS-Komplexe - Befund rechtsseitige ventrikulaere Extrasystolen.",
    "zahlen": "P < QRS (Anzahl)",
    "seite": "PDF 27 (Buch 165)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Tab. 10.7: Nettoamplitude positiv, QRS deutlich verbreitert und zu spaet, P-Wellen weniger als QRS-Komplexe - Befund ventrikulaerer Ersatzrhythmus mit einer Herzfrequenz von 20-40 Schlaegen/min.",
    "zahlen": "HF 20-40/min",
    "seite": "PDF 27 (Buch 165)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Tab. 10.7: Nettoamplitude negativ, QRS deutlich verbreitert und zu frueh, P-Wellen weniger als QRS - Befund linksseitige ventrikulaere Extrasystolen. Zu spaet kommende Komplexe derselben Konstellation ergeben einen ventrikulaeren Ersatzrhythmus mit 20-40 Schlaegen/min.",
    "zahlen": "HF 20-40/min",
    "seite": "PDF 27 (Buch 165)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Abb. 10.37 fasst die Abgrenzung breiter/bizarrer Kammerkomplexe zusammen: die VES schliesst sich mehr oder weniger direkt an einen Sinuskomplex an und wird von einer kompensatorischen Pause gefolgt, vor ihr fehlt die P-Welle.",
    "zahlen": "",
    "seite": "PDF 29 (Buch 167)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Abb. 10.37: Der escape beat folgt auf eine laengere Phase ohne regulaeren Sinuskomplex; eine P-Welle kann vorangehen, das PQ-Intervall ist dann aber abnormal.",
    "zahlen": "",
    "seite": "PDF 29 (Buch 167)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Herkunftsbestimmung der VES: netto-positive VES stammen aus dem Myokard der rechten Herzseite, netto-negative aus dem Myokard der linken Herzseite.",
    "zahlen": "",
    "seite": "PDF 30 (Buch 168)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Gleichartig gestaltete Komplexe stammen aus einem Fokus (monotop, monomorph, unifokal). Aendert sich die Konfiguration mehrfach, liegen mehrere Foci vor (polytop, polymorph, multifokal); letzteres gilt als Hinweis auf einen erheblichen Myokardschaden.",
    "zahlen": "",
    "seite": "PDF 30 (Buch 168)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Faellt eine Ventrikelextrasystole mit einem normalen QRS-Komplex zusammen, entsteht ein Fusionskomplex mit niedrigerer Amplitude.",
    "zahlen": "",
    "seite": "PDF 30 (Buch 168)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Bigeminus ist definiert als Wechsel eines Sinuskomplexes mit einer Extrasystole.",
    "zahlen": "1:1",
    "seite": "PDF 30 (Buch 168)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Trigeminus ist definiert als zwei normale Komplexe und eine VES oder ein normaler Komplex und zwei VES.",
    "zahlen": "2:1 oder 1:2",
    "seite": "PDF 30 (Buch 168)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Doublette = zwei aufeinanderfolgende VES; Triplette = drei aufeinanderfolgende VES.",
    "zahlen": "2 bzw. 3 VES in Folge",
    "seite": "PDF 30 (Buch 168)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Ventrikulaere Tachyarrhythmie (VT): mehr als drei aufeinanderfolgende Komplexserien mit Frequenzen von ueber 180 Schlaegen/min.",
    "zahlen": "> 3 Komplexe in Folge, HF > 180/min",
    "seite": "PDF 30 (Buch 168)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Die VT kann paroxysmal sein (intermittierend und kurz, als run oder Salve) oder durchgaengig (vollstaendige, kontinuierliche VT).",
    "zahlen": "",
    "seite": "PDF 30 (Buch 168)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Akzelerierter idioventrikulaerer Rhythmus (slow VT): alle Charakteristika der VT, aber deutlich langsamer mit 70-160 Schlaegen/min; klinisch meist irrelevant, weil die Diastole nicht verkuerzt ist; Ursachen zumeist extrakardialer Natur.",
    "zahlen": "HF 70-160/min",
    "seite": "PDF 30 (Buch 168)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "R-auf-T-Phaenomen: eine VES faellt in die T-Welle der vorangegangenen VES. Es gilt als sehr gefaehrliches Zeichen, weil die Impulsentstehung in die Refraktaerphase des vorhergehenden Komplexes faellt.",
    "zahlen": "",
    "seite": "PDF 30 (Buch 168)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Torsade de pointes: kontinuierliche VT, bei der die Ausschlaghoehen schraubenfoermig um eine gedachte Nulllinie undulieren; ein isoelektrisches Intervall existiert nicht, die Aufzeichnung bewegt sich zur Gaenze in der vertikalen Ebene; markiert den Uebergang zum Kammerflimmern.",
    "zahlen": "",
    "seite": "PDF 30 (Buch 168)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Kammerflattern: gleichmaessige, sehr rasche Kammerkomplexe ohne isoelektrisches Intervall, wobei die gedachte Nulllinie waagerecht verlaeuft.",
    "zahlen": "",
    "seite": "PDF 30 (Buch 168)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Kammerflimmern: ventrikulaere Fibrillation mit einer Frequenz von 300-800 Schlaegen/min, kein Puls fuehlbar, nur unkoordinierte, unterschiedlich hohe grobe oder feine Zacken; die gedachte Nulllinie steigt kontinuierlich an. Durch die fehlende Diastole naehert sich die Auswurfleistung Null.",
    "zahlen": "HF 300-800/min",
    "seite": "PDF 30 (Buch 168)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Asystolie: primaer als Stillstand der elektrischen und mechanischen Herzaktion, sekundaer als Folge des Kammerflimmerns.",
    "zahlen": "",
    "seite": "PDF 30 (Buch 168)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Warnkasten: die ventrikulaere Tachykardie wird haeufig mit der Sinustachykardie verwechselt. Die VT-Impulse kommen aus ektopischen Schrittmacherzentren des Kammermyokards und haben keine sichtbare P-Welle - das ist das Unterscheidungsmerkmal.",
    "zahlen": "",
    "seite": "PDF 30 (Buch 168)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Abb. 10.38: Eine VES aus der rechten Kammer laeuft auf die positive Elektrode zu, daher ist der bizarre Komplex insgesamt positiv; VES aus dem linken Kammermyokard sind negativ. Kennzeichen der VES bleiben deformierte QRS-Komplexe ohne vorherige P-Welle.",
    "zahlen": "",
    "seite": "PDF 31 (Buch 169)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Abb. 10.40: Ein polymorphes Erscheinungsbild der VES bzw. die unmittelbare Abfolge zweier VES spricht fuer Malignitaet; die Arrhythmie ist dann wahrscheinlich haemodynamisch bedeutsam.",
    "zahlen": "",
    "seite": "PDF 32 (Buch 170)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Abb. 10.39: Einzelne unifokale (monomorphe) VES aus einem Zentrum mit nachfolgender kompensatorischer Pause sind haeufig ohne klinische Bedeutung; erst die Anzahl in 24 Stunden kann eine klinische Relevanz belegen.",
    "zahlen": "",
    "seite": "PDF 32 (Buch 170)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Abb. 10.41: Folgen VES direkt hintereinander, nennt man das Kopplung; zwei aufeinanderfolgende VES heissen Doublette (Couplet); wechseln sich eine normale Herzaktion und eine VES ab, spricht man von Bigeminus (1:1).",
    "zahlen": "Bigeminus = 1:1",
    "seite": "PDF 33 (Buch 171)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Abb. 10.42: Triplet bedeutet, dass drei VES aufeinander folgen.",
    "zahlen": "3 VES in Folge",
    "seite": "PDF 33 (Buch 171)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Abb. 10.44: Eine andauernde Abfolge von VES ist die ventrikulaere Tachykardie; isoelektrische Intervalle sind dabei noch sichtbar (Abgrenzung zu Kammerflattern/Torsade).",
    "zahlen": "",
    "seite": "PDF 34 (Buch 172)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Abb. 10.43: Mehr als drei aufeinanderfolgende VES werden Salve oder run genannt; damit ist eine hochgradige haemodynamische Stoerung verbunden.",
    "zahlen": "> 3 VES in Folge",
    "seite": "PDF 34 (Buch 172)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Abb. 10.46: Das Kennzeichen des Kammerflimmerns ist die vertikale Verschiebung der Nulllinie; der Exitus ist nahezu unausweichlich.",
    "zahlen": "",
    "seite": "PDF 35 (Buch 173)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Abb. 10.45: Kammerflattern entsteht aus der VT und geht kurz vor dem Exitus in Kammerflimmern ueber.",
    "zahlen": "",
    "seite": "PDF 35 (Buch 173)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "In Ableitung II nach Einthoven liegt der positive Pol auf der linken Herzseite. Extrasystolen aus der rechten Herzkammer laufen auf ihn zu und erzeugen einen positiven Ausschlag; Extrasystolen der linken Hauptkammer laufen ueberwiegend nach rechts und erzeugen ein negatives Signal.",
    "zahlen": "",
    "seite": "PDF 8 / Buch 146",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Tab. 10.2, Ersatzrhythmen supraventrikulaer: ektopischer Vorhofschrittmacher (Herkunft Vorhof) mit schmalem QRS und Ersatzfrequenz 75 Schlaege/min; AV-Knoten-Ersatzrhythmus mit schmalem QRS und 60 Schlaege/min.",
    "zahlen": "Vorhof 75/min; AV-Knoten 60/min; QRS schmal",
    "seite": "PDF 11 / Buch 149",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Tab. 10.2, ventrikulaere Ersatzrhythmen mit breitem QRS: oberes Myokard 45 Schlaege/min, mittleres Myokard 40 Schlaege/min, apikales Myokard 30 Schlaege/min. Quelle [21] Dubin DB, Lindner UK: Schnellinterpretation des EKGs, 6. Aufl. Springer 1995.",
    "zahlen": "oberes 45/min; mittleres 40/min; apikales 30/min; QRS breit",
    "seite": "PDF 11 / Buch 149",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Tab. 10.5: Keine P-Welle bei bizarrem QRS-Komplex bedeutet ventrikulaere Tachykardie oder Kammerflimmern bzw. Kammerflattern.",
    "zahlen": "keine P + QRS bizarr",
    "seite": "PDF 22 / Buch 160",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Ventrikelextrasystole (VES): Der verbreiterte/bizarre Komplex ohne zugehoerige P-Welle kommt frueher als der zu erwartende naechste QRS-Komplex, danach folgt in der Regel eine kompensatorische Pause. Damit entspricht der R-R-Abstand zwischen dem vorhergehenden und dem auf die Extrasystole folgenden QRS-Komplex dem doppelten R-R-Abstand zweier benachbarter QRS-Komplexe.",
    "zahlen": "RR(vorher bis nachher) = 2 x RR normal",
    "seite": "PDF 25 / Buch 163",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Interpolation: Ist eine VES zwischen 2 normale QRS-Komplexe mit normalem R-R-Intervall eingeschoben, spricht man von einer Interpolation, das heisst die kompensatorische Pause fehlt.",
    "zahlen": "RR unveraendert trotz VES",
    "seite": "PDF 25 / Buch 163",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Ventrikulaerer Ersatzschlag (escape beat): Ein verbreiterter/bizarrer QRS-Komplex ohne zugehoerige P-Welle folgt VERSPAETET dem vorhergehenden QRS-Komplex. Er folgt auf eine laengere Phase ohne regulaeren Sinuskomplex; eine P-Welle kann vorangehen, das PQ-Intervall ist dann aber abnormal.",
    "zahlen": "QRS breit, ohne P, zu SPAET",
    "seite": "PDF 25 und 29 / Buch 163 und 167",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Tab. 10.7: QRS deutlich verbreitert und zu FRUEH bei weniger P-Wellen als QRS-Komplexen bedeutet ventrikulaere Extrasystolen; bei positiver Nettoamplitude rechtsseitig, bei negativer Nettoamplitude linksseitig.",
    "zahlen": "QRS zu frueh; P < QRS",
    "seite": "PDF 27 / Buch 165",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Tab. 10.7: QRS deutlich verbreitert und zu SPAET bei weniger P-Wellen als QRS-Komplexen bedeutet ventrikulaerer Ersatzrhythmus mit einer Herzfrequenz von 20-40 Schlaegen/min.",
    "zahlen": "QRS zu spaet; P < QRS; HF 20-40/min",
    "seite": "PDF 27 / Buch 165",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Klassifikation der VES nach Herkunftsort: netto-positive VES kommen aus dem Myokard der rechten Herzseite, netto-negative VES aus dem Myokard der linken Herzseite.",
    "zahlen": "",
    "seite": "PDF 30 / Buch 168",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Sind VES-Komplexe gleichartig gestaltet, stammen sie aus einem Fokus (monotop, monomorph, unifokal). Aendert sich die Konfiguration mehrfach, liegen mehrere Foci vor (polytop, polymorph, multifokal); Letzteres gilt als Hinweis auf einen erheblichen Myokardschaden.",
    "zahlen": "",
    "seite": "PDF 30 / Buch 168",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Faellt eine Ventrikelextrasystole mit einem normalen QRS-Komplex zusammen, entsteht ein Fusionskomplex mit niedriger Amplitude.",
    "zahlen": "",
    "seite": "PDF 30 / Buch 168",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Bigeminus: Wechsel eines Sinuskomplexes mit einer Extrasystole (1:1). Trigeminus: 2 normale Komplexe und eine VES oder ein normaler Komplex und 2 VES.",
    "zahlen": "Bigeminus 1:1; Trigeminus 2:1 oder 1:2",
    "seite": "PDF 30 und 33 / Buch 168 und 171",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Zusammenhang der VES zueinander: Doublette (Couplet) sind 2 aufeinanderfolgende VES, Triplette (Triplet) sind 3 aufeinanderfolgende VES. Wenn VES direkt hintereinander folgen, nennt man das Kopplung.",
    "zahlen": "Doublette = 2 VES; Triplette = 3 VES",
    "seite": "PDF 30 und 33 / Buch 168 und 171",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Ventrikulaere Tachyarrhythmie (VT): mehr als 3 aufeinanderfolgende Komplexserien mit Frequenzen von ueber 180 Schlaegen/min. Sie kann paroxysmal sein (intermittierend und kurz, als runs oder Salven) oder durchgaengig (vollstaendige, kontinuierliche VT).",
    "zahlen": "> 3 aufeinanderfolgende Komplexe; > 180 Schlaege/min",
    "seite": "PDF 30 / Buch 168",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Akzelerierter idioventrikulaerer Rhythmus: hat alle Charakteristika der VT, ist aber wesentlich langsamer mit 70-160 Schlaegen/min; wird auch als slow VT bezeichnet; ist klinisch meistens irrelevant, weil die Diastole nicht verkuerzt ist; Ursachen sind zumeist extrakardialer Natur.",
    "zahlen": "70-160 Schlaege/min",
    "seite": "PDF 30 / Buch 168",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "R-auf-T-Phaenomen: Eine VES faellt in die T-Welle der vorherigen VES. Sehr gefaehrliches Anzeichen, weil die Entstehung des Impulses in die Refraktaerphase des vorhergehenden faellt.",
    "zahlen": "",
    "seite": "PDF 30 / Buch 168",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Kammerflattern: gleichmaessige, sehr rasche Kammerkomplexe ohne isoelektrisches Intervall; die gedachte Nulllinie ist waagerecht. Es entsteht aus der VT und geht kurz vor dem Exitus in Kammerflimmern ueber.",
    "zahlen": "gedachte Nulllinie waagerecht; kein isoelektrisches Intervall",
    "seite": "PDF 30 und 35 / Buch 168 und 173",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Kammerflimmern: ventrikulaere Fibrillation mit einer Frequenz von 300-800 Schlaegen/min, kein Puls fuehlbar; lediglich unkoordinierte, unterschiedlich hohe, grobe oder feine Zacken; die gedachte Nulllinie steigt kontinuierlich an bzw. verschiebt sich vertikal. Durch die fehlende Diastole naehert sich die Auswurfleistung Null (Tod des Tieres).",
    "zahlen": "300-800 Schlaege/min; vertikale Verschiebung der Nulllinie",
    "seite": "PDF 30 und 35 / Buch 168 und 173",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Asystolie: primaer der Stillstand der elektrischen und mechanischen Herzaktion, sekundaer die Folge des Kammerflimmerns.",
    "zahlen": "",
    "seite": "PDF 30 / Buch 168",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Warnhinweis: Eine ventrikulaere Tachykardie wird haeufig begrifflich mit der Sinustachykardie verwechselt. Die VT ist eine schwere Arrhythmie, die Impulse kommen aus ektopischen Schrittmacherzentren des Kammermyokards und haben keine sichtbare P-Welle.",
    "zahlen": "keine sichtbare P-Welle",
    "seite": "PDF 30 / Buch 168",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Abb. 10.38: Kennzeichnend fuer VES sind deformierte QRS-Komplexe ohne vorherige P-Welle. Eine VES aus der rechten Kammer laeuft auf die positive Elektrode zu, daher ist der bizarre Komplex insgesamt positiv.",
    "zahlen": "",
    "seite": "PDF 31 / Buch 169",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Abb. 10.40: Ein polymorphes Erscheinungsbild bzw. die unmittelbare Abfolge zweier VES spricht fuer Malignitaet; die Arrhythmie ist wahrscheinlich haemodynamisch bedeutsam.",
    "zahlen": "",
    "seite": "PDF 32 / Buch 170",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Abb. 10.39: Bei einzelnen unifokalen (monomorphen) VES ist nach den VES eine kompensatorische Pause zu sehen, bevor der naechste normale Herzzyklus erscheint; die P-Welle fehlt vor den VES. Eine solche Arrhythmie ist haeufig ohne klinische Bedeutung, lediglich die Anzahl in 24 h kann eine klinische Relevanz beweisen.",
    "zahlen": "Anzahl pro 24 h als Relevanzkriterium",
    "seite": "PDF 32 / Buch 170",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "rhythmus-ventrikulaer",
    "text": "Abb. 10.43: Mehr als 3 aufeinanderfolgende VES werden Salve oder run genannt; damit ist eine hochgradige haemodynamische Stoerung verbunden. Abb. 10.44: Eine andauernde Abfolge von VES nennt man ventrikulaere Tachykardie, isoelektrische Intervalle sind dabei noch sichtbar.",
    "zahlen": "Salve = > 3 aufeinanderfolgende VES",
    "seite": "PDF 34 / Buch 172",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-av",
    "text": "AV-Block ersten Grades ist definiert ueber ein verlaengertes PR-Intervall (genauer: PQ-Dauer), gemessen vom Beginn der P-Welle bis zum Beginn der ersten Welle des QRS-Komplexes.",
    "zahlen": "Hund: PR > 0,13 s; Katze: PR > 0,09 s",
    "seite": "PDF 41 (Buch 28)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "block-av",
    "text": "Beim AV-Block I ist nur die Ueberleitung vom Sinusknoten zum AV-Knoten verzoegert; sobald der Impuls den AV-Knoten erreicht hat, ist die weitere Erregungsausbreitung normal. Der folgende QRS-Komplex ist deshalb normal (sofern nicht zusaetzlich ein Kammerproblem besteht). Pruefbedingung: PR verlaengert BEI normalem QRS.",
    "zahlen": "",
    "seite": "PDF 41 (Buch 28)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "block-av",
    "text": "Buchbeispiel AV-Block I: 12-jaehriger Pekinese, das PR-Intervall misst 0,15 s.",
    "zahlen": "PR = 0,15 s (Norm Hund 0,06 - 0,13 s)",
    "seite": "PDF 41 (Buch 28), Abb.30",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "block-av",
    "text": "AV-Block zweiten Grades Typ Mobitz I: das PR-Intervall wird mit jedem Herzschlag etwas laenger, bis es an einem kritischen Punkt zur vollstaendigen Blockierung kommt. In der Kurve zeigt sich eine schrittweise Verlaengerung aufeinanderfolgender PR-Intervalle, bis eine P-Welle erscheint, der kein QRS-Komplex folgt.",
    "zahlen": "Pruefbedingung: PR(n+1) > PR(n) ueber mehrere Schlaege, dann ein P ohne QRS",
    "seite": "PDF 41 (Buch 28)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "block-av",
    "text": "AV-Block zweiten Grades Typ Mobitz II (Mobitzblock): dasselbe Phaenomen einer blockierten P-Welle, aber mit relativ normalen PR-Intervallen und einer Blockierung ohne Vorzeichen. Unterscheidungsmerkmal zu Mobitz I ist also allein, ob die PR-Intervalle vor dem Ausfall zunehmen oder konstant bleiben.",
    "zahlen": "Pruefbedingung: P ohne QRS BEI konstanten, normalen PR-Intervallen",
    "seite": "PDF 41 (Buch 28)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "block-av",
    "text": "AV-Block dritten Grades (totaler AV-Block): zwischen P-Wellen und QRS-Komplexen ist keinerlei Relation mehr herzustellen, die Ueberleitung von den Vorhoefen zu den Ventrikeln ist vollstaendig blockiert. Ein Ersatzzentrum uebernimmt die Kammerfrequenz. Ein PR-Intervall ist in diesen Faellen nicht messbar.",
    "zahlen": "Pruefbedingung: PP-Reihe und RR-Reihe voneinander unabhaengig; kein PR messbar",
    "seite": "PDF 41 (Buch 28)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "block-av",
    "text": "Klinisch haben alle AV-Bloecke denselben Ursprung, meist extrakardiale Aetiologien. Haeufigste Ursache ist ein gesteigerter Vagotonus, der bei den meisten Tieren physiologisch und ohne klinische Bedeutung ist - vor allem bei Hunden brachyzephaler Rassen.",
    "zahlen": "",
    "seite": "PDF 41 (Buch 28)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "block-av",
    "text": "Weitere Ursachen einer pathologischen vagalen Hypertonie, die bei AV-Bloecken zu bedenken sind: zerebral bedingte Hypertonie, Hypothermie, Kompression des Nervus vagus in der zervikalen, mediastinalen oder retrobulbaeren Region.",
    "zahlen": "",
    "seite": "PDF 42 (Buch 29)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "block-av",
    "text": "Ein AV-Block ersten Grades wird in einem Fall bei einem PR-Intervall von 0,14 s diagnostiziert. Die Normobergrenze der Tabelle liegt bei 0,13 s - die pruefbare Bedingung lautet damit PR > 0,13 s. Der Fall zeigt AV-Block I zusammen mit hochgradiger Sinusbradykardie von 40/min.",
    "zahlen": "PR 0,14 s bei Normobergrenze 0,13 s; HF 40 bpm",
    "seite": "PDF 21 (gedruckt 110)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "block-av",
    "text": "Pruefbare Definition des AV-Blocks I. Grades: das PR-Intervall uebersteigt den oberen Grenzwert von 0,13 s. Im gezeigten Fall betraegt es 0,14 s.",
    "zahlen": "PR groesser 0,13 s; Beispielfall 0,14 s",
    "seite": "PDF 49 (Buch 138); derselbe Block auch PDF 29 (Buch 118)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "block-av",
    "text": "Ein AV-Block I. Grades ist haemodynamisch ohne Relevanz, beeintraechtigt die Funktionsfaehigkeit des Herzens nicht und bedarf in keinem Fall einer spezifischen Behandlung.",
    "zahlen": "",
    "seite": "PDF 49 (Buch 138), PDF 29 (Buch 118)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "block-av",
    "text": "Ursachenliste des AV-Blocks I. Grades: verzoegerte atrioventrikulaere Ueberleitung bei linksatrialer Erweiterung, parasympathische Hypertonie, Medikamente wie Betablocker und Digoxin, Elektrolytstoerungen wie Hyperkaliaemie und Hypokalzaemie, senile Myokardfibrose.",
    "zahlen": "",
    "seite": "PDF 49 (Buch 138)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "block-av",
    "text": "Bei Patienten mit Hinweisen auf linksatriale Erweiterung sind konstante AV-Bloecke I. Grades in der Regel auf die verzoegerte atrioventrikulaere Ueberleitung zurueckzufuehren. Konstant heisst hier: der Block betrifft jeden Schlag gleichermassen.",
    "zahlen": "",
    "seite": "PDF 49 (Buch 138)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "block-av",
    "text": "Ein AV-Block I. Grades ohne haemodynamische Relevanz laesst zugleich den Schluss zu, dass der Vagotonus nicht besonders erhoeht und die kardiale Reserve nicht aktiviert ist.",
    "zahlen": "",
    "seite": "PDF 29 (Buch 118)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "block-av",
    "text": "Beim AV-Block III (totaler AV-Block) besteht keine Assoziation mehr zwischen P-Welle und QRS-Komplex; Vorhof- und Kammerrhythmus laufen voneinander unabhaengig. Das ist als Pruefung auf fehlende Kopplung von P- und R-Zeitpunkten formulierbar.",
    "zahlen": "",
    "seite": "PDF 28 (Buch 216)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "block-av",
    "text": "Im gezeigten AV-Block III betraegt die Sinusknotenfrequenz (P-Wellen) 165 Impulse pro Minute, waehrend der atrioventrikulaere Ersatzrhythmus nur 60 Impulse pro Minute erreicht. Vorhof- und Kammerfrequenz muessen also getrennt gemessen und getrennt ausgewiesen werden.",
    "zahlen": "Vorhoffrequenz 165/min; AV-Ersatzrhythmus 60/min",
    "seite": "PDF 28 (Buch 216)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "block-av",
    "text": "Der AV-Ersatzrhythmus entsteht im AV-Knoten und wird als Schutzmechanismus beschrieben, der eine Asystolie der Ventrikel verhindern soll.",
    "zahlen": "",
    "seite": "PDF 28 (Buch 216)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "block-av",
    "text": "Als kardiale Ursachen eines AV-Blocks III werden infiltrative Myokarditis, Neoplasie, Amyloidose, infektioese Myokarditis, subendokardialer Infarkt, senile Myokardfibrose und Myokardiopathien genannt; als extrakardiale Ursache die Hyperkaliaemie.",
    "zahlen": "",
    "seite": "PDF 28 (Buch 216)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "block-av",
    "text": "Der AV-Block I erfordert keine spezielle Therapie und bleibt ohne haemodynamische Folgen. Ein Auswerter sollte ihn deshalb als Befund melden, aber nicht als Warnung mit Handlungsdruck.",
    "zahlen": "",
    "seite": "PDF 38 (Buch 226)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "block-av",
    "text": "Ursachen eines AV-Blocks I: Erweiterung des linken Vorhofs infolge chronischer Klappenendokardiose, senile Myokardfibrose, parasympathische Hypertonie, iatrogen durch Betablocker oder Digoxin sowie Elektrolytimbalanzen wie Hyperkaliaemie und Hyperkalzaemie.",
    "zahlen": "",
    "seite": "PDF 38 (Buch 226)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "block-av",
    "text": "AV-Block I. Grades - Grenzwerte des PQ-Intervalls: Hund > 0,13 s, Katze > 0,09 s. Unvollstaendiger Block durch Stoerung der Reizleitung im AV-Knoten; QRS-Komplex in der Regel unauffaellig; eine Verschmelzung von P- und T-Welle ist moeglich.",
    "zahlen": "PQ Hund > 0,13 s; PQ Katze > 0,09 s",
    "seite": "PDF 53 = Buch 53",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "block-av",
    "text": "Vorkommen des AV-Blocks I. Grades: Vagotonus, Klappenvitien, Kardiomyopathien, Hyper- oder Hypokaliaemien, Digitalis, Beta-Rezeptorblocker; ausdruecklich auch bei klinisch gesunden Hunden und Katzen moeglich. Therapie: keine bzw. Beseitigung der Ursache.",
    "zahlen": "",
    "seite": "PDF 53 = Buch 53",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "block-av",
    "text": "AV-Block II. Grades allgemein: voruebergehende Unterbrechung der AV-Ueberleitung, P-Wellen werden unregelmaessig von einem QRS-Komplex gefolgt.",
    "zahlen": "",
    "seite": "PDF 54 = Buch 54",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "block-av",
    "text": "AV-Block II. Grades Typ I = Wenckebach-Periodik: Zunahme der Ueberleitungszeit (PQ-Intervall) ueber mehrere Herzaktionen hinweg, bis eine P-Welle gar nicht mehr uebergeleitet wird; QRS-Komplex in der Regel unauffaellig.",
    "zahlen": "PQ nimmt von Schlag zu Schlag zu, bis ein QRS ausfaellt",
    "seite": "PDF 54 = Buch 54",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "block-av",
    "text": "AV-Block II. Grades Typ II = Mobitz Typ II: fixiertes Verhaeltnis zwischen Ueberleitung und Blockierung, d. h. PQ-Intervall konstant mit einzelnen nicht uebergeleiteten P-Wellen; Bradykardie; QRS-Komplex schenkelblockartig oder normal.",
    "zahlen": "PQ konstant; festes Ueberleitungsverhaeltnis (z. B. 2:1)",
    "seite": "PDF 54 = Buch 54",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "block-av",
    "text": "Bildbeispiel AV-Block II. Grades (Hund mit Mitralinsuffizienz): nach jeder zweiten P-Welle faellt ein QRS-Komplex aus (2:1-Ueberleitung), resultierende HF 60/min.",
    "zahlen": "2:1-Ueberleitung; HF 60/min; Papiervorschub 25 mm/s; Eichung 1 cm = 1 mV",
    "seite": "PDF 54 = Buch 54",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "block-av",
    "text": "Vorkommen des AV-Blocks II. Grades: Klappenvitien, HKM (Katze), andere Kardiomyopathien, Hyper- oder Hypokaliaemien, idiopathische Fibrose des AV-Knotens sowie Digitalis, Beta-Rezeptorblocker und Xylazin. Bei Mobitz Typ II unter Umstaenden Schrittmacherimplantation.",
    "zahlen": "",
    "seite": "PDF 54 = Buch 54",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "block-av",
    "text": "AV-Block III. Grades (totaler AV-Block) als pruefbare Bedingung: vollstaendige Dissoziation von Vorhof- und Kammeraktion; PP-Intervalle und RR-Intervalle jeweils relativ konstant, aber P-Wellen und QRS-Komplexe treten unabhaengig voneinander auf.",
    "zahlen": "PP konstant UND RR konstant, ohne feste Beziehung zueinander",
    "seite": "PDF 55 = Buch 55",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "block-av",
    "text": "Lokalisation des Ersatzschrittmachers beim totalen AV-Block an der QRS-Form: normale (schmale) QRS-Komplexe sprechen fuer einen Ersatzschrittmacher im unteren Abschnitt des AV-Knotens, bizarre (breite) QRS-Komplexe fuer einen Ersatzschrittmacher im Ventrikel oder fuer einen gleichzeitig bestehenden Schenkelblock.",
    "zahlen": "",
    "seite": "PDF 55 = Buch 55",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "block-av",
    "text": "Adams-Stokes-Anfaelle beim totalen AV-Block treten bei extremer Bradykardie und diastolischen Pausen ueber 20 s auf sowie bei Anstrengung wegen der fixen Frequenz. (Der Wert '> 20 s' wurde im Rohdatenstrom des PDF geprueft; er steht so im Buch.)",
    "zahlen": "diastolische Pausen > 20 s",
    "seite": "PDF 55 = Buch 55",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "block-av",
    "text": "Bildbeispiel totaler AV-Block (Hund mit AV-Insuffizienz): regelmaessige Vorhofaktionen mit Vorhoffrequenz 120/min, komplette Dissoziation, Ersatzrhythmus mit breiten, bizarren QRS-Komplexen.",
    "zahlen": "Vorhoffrequenz 120/min; Papiervorschub 25 mm/s; Eichung 0,5 cm = 1 mV",
    "seite": "PDF 55 = Buch 55",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "block-av",
    "text": "Tabelle 4.7, Verlaengerung des PQ-Intervalls bei: Sinusbradykardie; periodisch zunehmend beim AV-Block I. Grades; konstant beim AV-Block II. Grades (Wenckebach-Periodik); medikamentoes durch Digitalis, Beta-Rezeptorblocker und Antiarrhythmika; kongenitale Vitien, vor allem ASD; ausgepraegte Vagotonie. (Die Zuordnung periodisch/konstant zu Grad I und II ist im Druck offenbar vertauscht.)",
    "zahlen": "",
    "seite": "36",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "block-av",
    "text": "Ein totaler AV-Block kann - selten - Ursache einer kardio-vaskulaeren Hypertonie sein, ebenso eine Aorteninsuffizienz mit vergroessertem Schlagvolumen.",
    "zahlen": "",
    "seite": "PDF 117 = Buchseite 117",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "block-av",
    "text": "Digoxin (Klasse V) hemmt die Na-K-ATPase und erhoeht die intrazellulaere Kalziumkonzentration. Es steigert die Kontraktilitaet gering, verlangsamt die AV-Ueberleitung, verlaengert die Refraktaerphase und verlaengert im EKG messbar das PQ-Intervall. Zusaetzlich wirkt es diuretisch und senkt den gesteigerten Sympathikotonus.",
    "zahlen": "PQ-Intervall verlaengert",
    "seite": "PDF-Seite 7 (Buchseite 435)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "block-av",
    "text": "Normale PR-Intervall-Dauer nach Tab. 10.1: Hund 0,06-0,13 s, Katze 0,05-0,09 s; die Ausrichtung der PR-Strecke ist bei beiden Arten isoelektrisch.",
    "zahlen": "PR Hund 0,06-0,13 s; Katze 0,05-0,09 s; isoelektrisch",
    "seite": "PDF 9 (Buch 147)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-av",
    "text": "Definition PQ-Intervall: Zeitintervall zwischen dem Beginn der P-Welle und dem Beginn des QRS-Komplexes; es repraesentiert die Dauer der atrioventrikulaeren Ueberleitung. Hier ist keine elektrische Aktivitaet messbar, die EKG-Linie liegt auf der Nulllinie (isoelektrisch).",
    "zahlen": "PQ = Beginn P bis Beginn QRS",
    "seite": "PDF 20 (Buch 158)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-av",
    "text": "Steckbrief normales PQ-Intervall: isoelektrisch auf der Nulllinie; Hund Dauer 0,06-0,13 s; Katze Dauer 0,05-0,09 s. Das PQ-Intervall verkuerzt sich mit zunehmender Herzfrequenz.",
    "zahlen": "Hund 0,06-0,13 s; Katze 0,05-0,09 s; PQ sinkt mit steigender HF",
    "seite": "PDF 20 (Buch 158)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-av",
    "text": "Tab. 10.6, Algorithmus der PQ-Veraenderungen: verlaengertes PQ bedeutet AV-Block Grad I; progressive Verlaengerung bedeutet AV-Block Grad II vom Mobitz-Typ I (Wenckebach); verkuerztes PQ bedeutet Vorhoftachykardien.",
    "zahlen": "",
    "seite": "PDF 22 (Buch 160)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-av",
    "text": "AV-Block Grad I: verlaengerte AV-Ueberleitungszeit, aber auf jede P-Welle folgt ein QRS-Komplex; das Verhaeltnis P-Welle zu QRS-Komplex bleibt 1:1.",
    "zahlen": "Pruefbedingung: PQ verlaengert bei P:QRS = 1:1",
    "seite": "PDF 22 (Buch 160)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-av",
    "text": "Zahlengrenze fuer den AV-Block Grad I aus der Bildlegende: PQ-Intervall groesser als 0,13 s beim Hund bzw. groesser als 0,09 s bei der Katze, bei normalem Verhaeltnis der Anzahl von P-Wellen und QRS-Komplexen.",
    "zahlen": "PQ > 0,13 s (Hund) / > 0,09 s (Katze)",
    "seite": "PDF 23 (Buch 161)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-av",
    "text": "AV-Block Grad II: es kommt immer wieder zu P-Wellen, auf die kein QRS-Komplex folgt.",
    "zahlen": "Pruefbedingung: einzelne P ohne folgenden QRS",
    "seite": "PDF 22 (Buch 160)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-av",
    "text": "AV-Block Grad II Mobitz-Typ I (Wenckebach): das PQ-Intervall wird von einem Herzzyklus zum naechsten stetig laenger, bis nach einer P-Welle der QRS-Komplex ploetzlich fehlt. Es ist eine Pause sichtbar, danach beginnt die naechste Wenckebach-Periodik.",
    "zahlen": "Pruefbedingung: PQ(n+1) > PQ(n) bis QRS-Ausfall, dann Neustart",
    "seite": "PDF 22 (Buch 160)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-av",
    "text": "AV-Block Grad II Mobitz-Typ II: keine voraussehbare Periodik des PQ-Intervalls, aber regelmaessig periodische Blockadeverhaeltnisse. Folgt auf 2 P-Wellen regelmaessig ein QRS-Komplex, nennt man das ein 2:1-Verhaeltnis.",
    "zahlen": "Pruefbedingung: PQ konstant, festes Blockverhaeltnis z. B. 2:1",
    "seite": "PDF 22-23 (Buch 160-161)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-av",
    "text": "High grade AV-Block: schliesst sich nach sehr vielen aufeinanderfolgenden P-Wellen nur ab und an ein QRS-Komplex an, spricht man von einem high grade AV-Block, weil die Haemodynamik durch die Kammerbradykardie nachhaltig gestoert wird.",
    "zahlen": "Pruefbedingung: viele P je einem QRS (Blockverhaeltnis weit ueber 2:1)",
    "seite": "PDF 23 (Buch 161)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-av",
    "text": "AV-Block Grad III ist die vollstaendige Blockade: es besteht keine Zuordnung mehr zwischen den P-Wellen und den QRS-Komplexen.",
    "zahlen": "",
    "seite": "PDF 24 (Buch 162)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-av",
    "text": "Bildunterschrift Abb. 10.30 (Hund, Ableitung II): AV-Block Grad II Typ Mobitz I / Wenckebach-Periodik zeigt eine fortschreitende Verlaengerung des PQ-Intervalls; danach erscheint eine P-Welle, nach der der QRS-Komplex ausfaellt (Ueberleitung blockiert).",
    "zahlen": "",
    "seite": "PDF 24 (Buch 162)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-av",
    "text": "Bildunterschrift Abb. 10.31 (Hund, Ableitung II): AV-Block Grad II Typ Mobitz II ist durch regelmaessige 2:1- oder 3:1-Blockierungen gekennzeichnet.",
    "zahlen": "2:1 bzw. 3:1",
    "seite": "PDF 25 (Buch 163)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-av",
    "text": "Abb. 10.32 (AV-Block Grad III mit Ersatzrhythmus): die P-Wellen sind regelmaessig, koennen aber einzeln durch die T-Welle oder den QRS-Komplex maskiert sein - ein Erkennungsalgorithmus darf fehlende sichtbare P-Wellen daher nicht als Vorhofstillstand werten.",
    "zahlen": "",
    "seite": "PDF 26 (Buch 164)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-av",
    "text": "Das PQ-Intervall repraesentiert die Dauer der atrioventrikulaeren Ueberleitung und ist das Zeitintervall zwischen Beginn der P-Welle und Beginn des QRS-Komplexes. Es ist keine elektrische Aktivitaet messbar, daher liegt die EKG-Linie auf der Nulllinie (isoelektrisch).",
    "zahlen": "",
    "seite": "PDF 20 / Buch 158",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-av",
    "text": "Tab. 10.6 Algorithmus PQ-Intervall: verlaengert bedeutet AV-Block Grad I; progressive Verlaengerung bedeutet AV-Block Grad II Mobitz-Typ I (Wenckebach); verkuerzt bedeutet Vorhoftachykardien.",
    "zahlen": "",
    "seite": "PDF 22 / Buch 160",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-av",
    "text": "AV-Block Grad I: verlaengerte AV-Ueberleitungszeit, aber auf jede P-Welle folgt ein QRS-Komplex, Verhaeltnis P-Welle zu QRS-Komplex 1:1.",
    "zahlen": "P:QRS = 1:1 bei verlaengertem PQ",
    "seite": "PDF 22 / Buch 160",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-av",
    "text": "AV-Block Grad II: Es kommt immer wieder zu P-Wellen, auf die kein QRS-Komplex folgt. Beim Mobitz-Typ I wird das PQ-Intervall von einem Herzzyklus zum naechsten stetig laenger, bis nach der P-Welle der QRS-Komplex ploetzlich fehlt (Wenckebach-Periodik). Es ist eine Pause sichtbar, danach beginnt die naechste Wenckebach-Periodik.",
    "zahlen": "PQ nimmt stetig zu, dann QRS-Ausfall",
    "seite": "PDF 22 / Buch 160",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-av",
    "text": "Abb. 10.29 AV-Block Grad I, konkreter Schwellenwert: PQ-Intervall groesser 0,13 s beim Hund bzw. groesser 0,09 s bei der Katze, bei normalem Verhaeltnis der Anzahl von P-Wellen zu QRS-Komplexen.",
    "zahlen": "PQ > 0,13 s (Hund); PQ > 0,09 s (Katze)",
    "seite": "PDF 23 / Buch 161",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-av",
    "text": "AV-Block Grad II Mobitz-Typ II: Es gibt keine voraussehbare Periodik des PQ-Intervalls, aber regelmaessig periodische Blockadeverhaeltnisse. Folgt auf 2 P-Wellen regelmaessig ein QRS-Komplex, nennt man das ein 2:1-Verhaeltnis. Schliesst sich nach sehr vielen aufeinanderfolgenden P-Wellen nur ab und an ein QRS-Komplex an, spricht man von einem high grade AV-Block, weil die Haemodynamik durch die Kammerbradykardie nachhaltig gestoert wird.",
    "zahlen": "2:1 oder 3:1 Blockierungen; PQ konstant",
    "seite": "PDF 23 und 25 / Buch 161 und 163",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-av",
    "text": "AV-Block Grad III: vollstaendige Blockade, es besteht keine Zuordnung mehr zwischen den P-Wellen und den QRS-Komplexen. Die P-Wellen sind dabei regelmaessig, koennen aber durch die T-Welle oder den QRS-Komplex maskiert sein.",
    "zahlen": "P und QRS voellig unabhaengig",
    "seite": "PDF 24 und 26 / Buch 162 und 164",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "block-sa",
    "text": "SA-Block und Sinusstillstand sind elektrokardiographisch nur schwer voneinander zu unterscheiden; Bewusstseinsverlust und Tod sind moeglich, wenn kein nachgeordnetes Schrittmacherzentrum uebernimmt.",
    "zahlen": "",
    "seite": "PDF 53 = Buch 53",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "block-sa",
    "text": "Steckbrief SA-Block/Sinusstillstand als messbare Bedingung: zugrunde liegender Sinusrhythmus mit Pausen, die einem VIELFACHEN des normalen PP-Intervalls entsprechen; die Herzfrequenz kann dabei variieren. Ursache: Ueberleitungsstoerung zwischen Sinusknoten und Vorhoefen (SA-Block) bzw. Ausfall der Impulsbildung im Sinusknoten (Sinusstillstand).",
    "zahlen": "Pause = ganzzahliges Vielfaches des normalen PP-Intervalls",
    "seite": "PDF 53 = Buch 53",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "block-sa",
    "text": "Vorkommen von SA-Block/Sinusstillstand: Zufallsbefund bei brachyzephalen Rassen moeglich, gehoerlose Dalmatiner, Sick-Sinus-Syndrom besonders bei Zwergschnauzern, Erkrankungen mit Vorhofveraenderungen, Vagusreiz (z. B. Schilddruesenkarzinom), Digitalis- bzw. Propranololintoxikation, Anaesthesie.",
    "zahlen": "",
    "seite": "PDF 53 = Buch 53",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "block-sa",
    "text": "Steckbrief Sinusstillstand: P-Wellen normal, Kammerkomplexe schmal, normaler Abstand zwischen P-Welle und QRS-Komplex; es fehlen einzelne oder mehrere Schlaege. Entscheidendes Merkmal ist, dass die P-Welle NICHT im zwei- bzw. mehrfachen RR-Abstand wieder einsetzt. Bei laengerem Stillstand tritt ein AV-Ersatzrhythmus auf. Wichtigste Differentialdiagnose ist der SA-Block.",
    "zahlen": "Pause kein ganzzahliges Vielfaches des RR-Abstands",
    "seite": "47",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "block-sa",
    "text": "Tab. 10.5: Keine P-Welle bei normalem bis leicht veraendertem QRS-Komplex bedeutet Hyperkaliaemie, permanenter Sinusstillstand mit AV-Ersatzrhythmus, sinuatrialer Block mit Ersatzrhythmus, supraventrikulaere Extrasystolen (P-auf-T-Phaenomen) oder Vorhofstillstand mit Ersatzrhythmus.",
    "zahlen": "keine P + QRS normal",
    "seite": "PDF 22 / Buch 160",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Warnung des Buches bei Rechtsherz-Kriterien: Rechtsabweichung der Herzachse, S-Zacken in den Ableitungen I, II und aVF sowie tiefe S-Zacken in Ableitung II koennen ebenso gut von einem RECHTSSCHENKELBLOCK verursacht sein. Eine Software darf diese Konstellation deshalb nicht ohne Vorbehalt als Rechtsherzhypertrophie melden.",
    "zahlen": "",
    "seite": "PDF 40 (Buch 27), Abb.29",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "schenkelblock",
    "text": "Im Rahmen der Ballondilatation einer Pulmonalstenose kommt es oft zu einem temporaeren Rechtsschenkelblock - der einzige Schenkelblock-Bezug im gelesenen Abschnitt.",
    "zahlen": "",
    "seite": "PDF 76 = Buch 76",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "schenkelblock",
    "text": "Eine Reizleitungsstoerung unterhalb des His'schen Buendels heisst Schenkelblock bzw. intraventrikulaerer Block; dazu zaehlen Rechts- und Linksschenkelblock sowie linksanteriorer und linksposteriorer Hemiblock. Beim kompletten Schenkelblock sind die QRS-Komplexe stets verbreitert, beim inkompletten nicht zwingend.",
    "zahlen": "",
    "seite": "38",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "schenkelblock",
    "text": "Isolierte Rechts- oder Linksschenkelbloecke haben keine haemodynamischen Auswirkungen und beduerfen keiner Behandlung. Bei gleichzeitiger Beteiligung beider Tawara-Schenkel kann jedoch ein totaler AV-Block entstehen, der stets therapiebeduerftig ist.",
    "zahlen": "",
    "seite": "38",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "schenkelblock",
    "text": "Steckbrief Linksschenkelblock: Verzoegerung oder Block im linken Tawara-Schenkel, intermittierend, alternierend oder konstant. QRS-Komplexe weit und bizarr, Knuepfung und/oder Kerbung moeglich, Breite ueber 0,07 s beim Hund und ueber 0,04 s bei der Katze; positiv in Abl. I, II, III, aVF, CV6LL, CV6LU; negativ in aVR, aVL, CV5RL beim Hund bzw. in aVR und CV5RL bei der Katze.",
    "zahlen": "QRS > 0,07 s (Hund); > 0,04 s (Katze)",
    "seite": "39",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "schenkelblock",
    "text": "Linksschenkelblock, weitere Kriterien: Q-Zacken klein in Abl. I, CV6LL, CV6LU beim Hund und fehlend in Abl. I und CV6LU bei der Katze; R-Zacken ueberhoeht in Abl. I und aVL; T-Wellen ueber 28 % der R-Zacke in Abl. II beim Hund und mindestens 0,3 mV in Abl. II bei der Katze. Wichtigste Differentialdiagnose ist die linksventrikulaere Vergroesserung.",
    "zahlen": "T > 28 % von R (Hund, Abl. II); T >= 0,3 mV (Katze, Abl. II)",
    "seite": "39",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "schenkelblock",
    "text": "Beispiel Linksschenkelblock: Katze mit HKM, breite Kammerkomplexe von 0,065 s, hohe R-Zacken in Abl. II, III und aVF, ST-Streckensenkung von 0,15 mV; obere zwei Zeilen 50 mm/s, Rhythmusstreifen 25 mm/s, Eichung 1 cm = 1 mV.",
    "zahlen": "QRS 0,065 s; ST-Senkung 0,15 mV",
    "seite": "39",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "schenkelblock",
    "text": "Steckbrief Rechtsschenkelblock: QRS-Komplexe bizarr mit Kerbung bzw. Knuepfung, Dauer ueber 0,06 s bei Hund und Katze; positiv in Abl. aVR, aVL und CV5RL (Hund) bzw. in aVR und CV5RL (Katze); RSR'- oder rsR'-Form (M-foermig) in Abl. CV5RL.",
    "zahlen": "QRS > 0,06 s (Hund und Katze); M-Form in CV5RL",
    "seite": "40",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "schenkelblock",
    "text": "Rechtsschenkelblock, weitere Kriterien: S-Zacken ueber 0,4 mV in Abl. I, II, III und aVF sowie ueber 0,7 mV in CV6LL und/oder CV6LU; Frontalvektor mit Rechtsachsenabweichung ueber plus 100 Grad bis minus 90 Grad beim Hund und ueber plus 160 Grad bis minus 90 Grad bei der Katze. Wichtigste Differentialdiagnose ist die rechtsventrikulaere Vergroesserung.",
    "zahlen": "S > 0,4 mV (I, II, III, aVF); S > 0,7 mV (CV6LL/CV6LU); Achse > +100 Grad bis -90 Grad (Hund), > +160 Grad bis -90 Grad (Katze)",
    "seite": "40",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "schenkelblock",
    "text": "Vorkommen des Rechtsschenkelblocks: angeborene Herzfehler (z. B. VSD), chronisch degenerative AV-Klappenerkrankungen, Herzmuskelerkrankungen, Herztumoren (z. B. Lymphosarkom), Hyperkaliaemie; er ist auch bei gesunden Hunden und Katzen moeglich.",
    "zahlen": "",
    "seite": "40",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "schenkelblock",
    "text": "Beispiele Rechtsschenkelblock: Hund mit isolierter Trikuspidalinsuffizienz, verbreiterte (0,07 s) negative Kammerkomplexe in Abl. I, II und III, hohe diskordante T-Wellen, HF 70/min bei 50 mm/s; Katze mit HKM, verbreiterte (0,07 s) ueberwiegend negative Kammerkomplexe in I, II, III, aVF, Tachykardie HF 260/min.",
    "zahlen": "QRS 0,07 s; HF 70/min bzw. 260/min",
    "seite": "40",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "schenkelblock",
    "text": "Steckbrief linksanteriorer Hemiblock: Block im linksanterioren Faszikel bei normaler QRS-Dauer; kleine Q-Zacken in Abl. I und aVL (nicht immer); relativ hohe R-Zacken in Abl. I und aVL; tiefe S-Zacken in Abl. II, III und aVF, wobei die S-Zacken groesser sind als die R-Zacken; Linksachsenabweichung.",
    "zahlen": "QRS-Dauer normal; S > R in II, III, aVF",
    "seite": "41",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "schenkelblock",
    "text": "Vorkommen des linksanterioren Hemiblocks: Kardiomyopathien, linksventrikulaere Hypertrophie (z. B. kongenitale Vitien), Hyperthyreoidismus, Nierenerkrankungen, Hyperkaliaemie. Beispiel: Katze mit Hyperthyreose, HF 280/min, normal breite ueberwiegend negative Komplexe in Abl. II, III und aVF, positive Komplexe in Abl. I und aVL.",
    "zahlen": "HF 280/min",
    "seite": "41",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "schenkelblock",
    "text": "Beim persistierenden AV-Kanal koennen Rechts- oder Linksschenkelblock auftreten, ebenso Hinweise auf links-, rechts- oder biventrikulaere Belastung.",
    "zahlen": "",
    "seite": "PDF 140 = Buchseite 140",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "schenkelblock",
    "text": "Beim Atrialen Septumdefekt ist das EKG meist unauffaellig; moeglich sind Vektorabweichung nach rechts, Rechtsschenkelblock oder Vorhofarrhythmien.",
    "zahlen": "",
    "seite": "PDF 128 = Buchseite 128",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "schenkelblock",
    "text": "Bei Katzen mit arterieller Hypertonie (haeufig gemeinsam mit Hypertropher Kardiomyopathie) ist der linksanteriore Hemiblock relativ typisch.",
    "zahlen": "",
    "seite": "PDF 117 = Buchseite 117",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "schenkelblock",
    "text": "Schenkelblock: breite bizarre Komplexe MIT zugehoeriger P-Welle. Ursache ist der Ausfall eines Tawara-Schenkels mit geaenderter Depolarisationsrichtung bzw. verlaengerter Depolarisationszeit.",
    "zahlen": "",
    "seite": "PDF 25 (Buch 163)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Unterscheidung ueber die Nettoamplitude in Ableitung II: ist sie positiv, liegt ein Linksschenkelblock (LBBB) vor, ist sie negativ, ein Rechtsschenkelblock (RBBB).",
    "zahlen": "",
    "seite": "PDF 25 (Buch 163)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Tab. 10.7: Nettoamplitude positiv, Breite deutlich erhoeht (++), P-Wellen vorhanden und P-Welle zu QRS-Komplex im Verhaeltnis 1:1 - Befund Linksschenkelblock (LBBB).",
    "zahlen": "P : QRS = 1 : 1",
    "seite": "PDF 27 (Buch 165)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Tab. 10.7: Nettoamplitude negativ (R-Zacke vermindert, -), Breite deutlich erhoeht (++), P-Welle zu QRS 1:1 - Befund Rechtsschenkelblock (RBBB).",
    "zahlen": "",
    "seite": "PDF 27 (Buch 165)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Tab. 10.7: Nettoamplitude negativ mit tiefer S-Zacke bei normaler Breite, negative Ausschlaege in II, III und aVF, positive in I und aVL - Befund linksanteriorer Faszikelblock.",
    "zahlen": "",
    "seite": "PDF 27 (Buch 165)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Abb. 10.37: Beim Schenkelblock gehen den bizarren Kammerkomplexen regelmaessige P-Wellen in gleichem Abstand mit normalem PQ-Intervall voran - das ist das Trennkriterium gegenueber VES und escape beat.",
    "zahlen": "",
    "seite": "PDF 29 (Buch 167)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Ein Schenkelblock entsteht durch eine Blockade der Ueberleitung distal des AV-Knotens im Bereich der Tawara-Schenkel. Da der Vorhof die Erregung voellig normal zum AV-Knoten transportiert hat, ist die P-Welle immer vor dem breiten Kammerkomplex vorhanden und sichtbar.",
    "zahlen": "",
    "seite": "PDF 31 (Buch 169)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Beim LBBB ist die schnelle Reizleitung der linken Kammer unterbrochen, es depolarisiert zuerst die rechte und dann die linke Kammer. Da die Erregung vom rechten zum linken Ventrikel und damit in Richtung der positiven Elektrode laeuft, ist der (breite) Komplex elektrisch positiv.",
    "zahlen": "",
    "seite": "PDF 31 (Buch 169)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Bei Katzen sind Blockierungen der grossen Buendel extrem selten. Durch Myokardhypertrophie im oberen linken Septum kann es zur Blockade des linksanterioren Faszikels kommen; diese fuehrt NICHT zur Verbreiterung des QRS-Komplexes, sondern nur zu typischen Veraenderungen der Q-, R- und S-Ausschlaege.",
    "zahlen": "",
    "seite": "PDF 31 (Buch 169)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Abb. 10.48 - Kriterien Linksschenkelblock (LBBB): breiter Kammerkomplex mit vorhergehender P-Welle (Unterschied zur VES) und normalem PQ-Intervall; QRS-Breite groesser 0,07 s beim Hund bzw. groesser 0,06 s bei der Katze; positiv in I, II, III und aVF, negativ in aVR und aVL.",
    "zahlen": "QRS > 0,07 s (Hund), > 0,06 s (Katze); pos. I/II/III/aVF, neg. aVR/aVL",
    "seite": "PDF 36 (Buch 174)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Abb. 10.47: Ein Schenkelblock ist eine Leitungsverzoegerung in einem Tawara-Schenkel mit Verbreiterung des QRS-Komplexes.",
    "zahlen": "",
    "seite": "PDF 36 (Buch 174)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Abb. 10.49 - Kriterien Rechtsschenkelblock (RBBB): breiter Kammerkomplex mit vorhergehender P-Welle und normalem PQ-Intervall; QRS-Breite groesser 0,07 s beim Hund bzw. groesser 0,06 s bei der Katze; negativ in I, II, III und aVF, positiv in aVR und aVL.",
    "zahlen": "QRS > 0,07 s (Hund), > 0,06 s (Katze); neg. I/II/III/aVF, pos. aVR/aVL",
    "seite": "PDF 37 (Buch 175)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Abb. 10.50 - linksanteriorer Hemiblock ist die haeufigste Blockade innerhalb der ventrikulaeren Ueberleitung bei der Katze; der Faszikel ist ein Seitenast des linken Tawara-Schenkels. Der QRS-Komplex bleibt normal breit, nur die Zackenausschlaege verschieben sich.",
    "zahlen": "QRS-Breite normal",
    "seite": "PDF 37 (Buch 175)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Abb. 10.50 nennt als Messkriterien des linksanterioren Faszikelblocks: Q-Zacken und hohe R-Zacken in I und aVL sowie tiefe S-Zacken in II, III und aVF. Der einleitende Satz derselben Bildunterschrift spricht dagegen von negativer Hauptausschlagrichtung in Ableitung I, II und aVF, was Tab. 10.7 (II, III, aVF negativ; I und aVL positiv) widerspricht.",
    "zahlen": "",
    "seite": "PDF 37 (Buch 175)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Schenkelblock im Unterschied zur VES: breite bizarre Komplexe MIT zugehoeriger P-Welle. Ist die Nettoamplitude in Ableitung II positiv, spricht man von einem Linksschenkelblock (LBBB); ist sie negativ, liegt ein Rechtsschenkelblock (RBBB) vor.",
    "zahlen": "Netto in II positiv = LBBB; negativ = RBBB",
    "seite": "PDF 25 / Buch 163",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Abb. 10.37: Ein Schenkelblock ist gekennzeichnet durch P-Wellen, welche regelmaessig und in gleichem Abstand (normales PQ-Intervall) den bizarren Kammerkomplexen vorangehen.",
    "zahlen": "PQ normal und konstant vor breitem QRS",
    "seite": "PDF 29 / Buch 167",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Tab. 10.7: R-Zacke hoch, Nettoamplitude positiv, QRS deutlich verbreitert, P-Wellen vorhanden und Anzahl P = Anzahl QRS bedeutet Linksschenkelblock (LBBB).",
    "zahlen": "QRS ++ breit, P vorhanden, P:QRS = 1:1, netto positiv",
    "seite": "PDF 27 / Buch 165",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Tab. 10.7: Nettoamplitude negativ, QRS deutlich verbreitert, Anzahl P = Anzahl QRS bedeutet Rechtsschenkelblock (RBBB).",
    "zahlen": "netto negativ; QRS ++ breit; P:QRS = 1:1",
    "seite": "PDF 27 / Buch 165",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Tab. 10.7: negative Nettoamplitude mit tiefer S-Zacke bei normaler QRS-Breite und negativen Ausschlaegen in II, III und aVF (I und aVL positiv) bedeutet linksanteriorer Faszikelblock.",
    "zahlen": "II, III, aVF negativ; I und aVL positiv; QRS-Breite normal",
    "seite": "PDF 27 / Buch 165",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Entsteht in der Ueberleitung distal des AV-Knotens, also im Bereich der Tawara-Schenkel, eine Blockade, kann es sich um einen Links- oder Rechtsschenkelblock handeln. Da der Vorhof die Erregung voellig normal zum AV-Knoten transportiert hat, ist die P-Welle immer vor dem breiten Kammerkomplex vorhanden und sichtbar.",
    "zahlen": "",
    "seite": "PDF 31 / Buch 169",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Beim LBBB wird die schnelle Reizleitung des linken Kammermyokards unterbrochen, es depolarisiert zuerst die rechte und danach die linke Kammer. Das erzeugt einen breiten QRS-Komplex, vergleichbar mit einer VES. Da die Erregung vom rechten zum linken Ventrikel in Richtung der positiven Elektrode verlaeuft, ist der Komplex elektrisch positiv.",
    "zahlen": "",
    "seite": "PDF 31 / Buch 169",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Abb. 10.48 Linksschenkelblock (LBBB): breiter Kammerkomplex mit vorhergehender P-Welle (Unterschied zur VES) und normalem PQ-Intervall; QRS-Breite groesser 0,07 s beim Hund bzw. groesser 0,06 s bei der Katze; positiv in I, II, III und aVF; negativ in aVR und aVL.",
    "zahlen": "QRS > 0,07 s (Hund) bzw. > 0,06 s (Katze); positiv I, II, III, aVF; negativ aVR, aVL",
    "seite": "PDF 36 / Buch 174",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Abb. 10.49 Rechtsschenkelblock (RBBB): breiter Kammerkomplex mit vorhergehender P-Welle (Unterschied zur VES) und normalem PQ-Intervall; QRS-Breite groesser 0,07 s beim Hund bzw. groesser 0,06 s bei der Katze; negativ in I, II, III und aVF; positiv in aVR und aVL.",
    "zahlen": "QRS > 0,07 s (Hund) bzw. > 0,06 s (Katze); negativ I, II, III, aVF; positiv aVR, aVL",
    "seite": "PDF 37 / Buch 175",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "schenkelblock",
    "text": "Abb. 10.50 Linksanteriorer Hemiblock (Faszikelblock) ist die haeufigste Blockade innerhalb der ventrikulaeren Ueberleitung bei der Katze; der Faszikel ist ein Seitenast des linken Tawara-Schenkels. Folge: normal breiter QRS-Komplex, aber Verschiebung der Zackenausschlaege — Q-Zacken und hohe R-Zacken in I und aVL sowie tiefe S-Zacken in II, III und aVF.",
    "zahlen": "QRS-Breite normal; hohe R in I und aVL; tiefe S in II, III, aVF",
    "seite": "PDF 37 / Buch 175",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "praeexzitation",
    "text": "Praeexzitation/WPW-Syndrom - Grenzwerte der PQ-Dauer: verkuerzt auf < 0,06 s beim Hund und < 0,05 s bei der Katze.",
    "zahlen": "PQ Hund < 0,06 s; PQ Katze < 0,05 s",
    "seite": "PDF 57 = Buch 57",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "praeexzitation",
    "text": "Weitere Steckbrief-Kriterien der Praeexzitation: ausgepraegte Tachykardie bei normalem Rhythmus; P-Wellen normal, aber oft nicht erkennbar; QRS normal oder verbreitert und bizarr; ST-Veraenderungen moeglich.",
    "zahlen": "",
    "seite": "PDF 57 = Buch 57",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "praeexzitation",
    "text": "Deltawelle definiert als Kerbung oder Sockelbildung im Anstieg der R-Zacke, sichtbar in verschiedenen Ableitungen; im Text zusaetzlich beschrieben als Hebung kurz vor der die Q-Zacke ueberlagernden R-Zacke.",
    "zahlen": "",
    "seite": "PDF 57 = Buch 57",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "praeexzitation",
    "text": "Mechanismus des WPW-Syndroms: eine (selten mehrere) akzessorische Leitungsbahn zwischen Vorhof und Kammer, z. B. das Kent-Buendel, aktiviert einen Teil der Kammern vorzeitig unter Umgehung von AV-Knoten und His-Buendel; durch die kreisende Erregung (Re-entry) treten paroxysmale Tachykardien auf.",
    "zahlen": "",
    "seite": "PDF 57 = Buch 57",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "praeexzitation",
    "text": "Vorkommen der Praeexzitation: kongenital isoliert, AV-Klappendysplasie, Mitralinsuffizienz infolge chronisch degenerativer Klappenerkrankung, HKM u. a. Therapie: Schrittmacherimplantation, Katheterablation.",
    "zahlen": "",
    "seite": "PDF 57 = Buch 57",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "praeexzitation",
    "text": "Tabelle 4.7, pathologische PQ-Befunde: Fehlen des PQ-Intervalls beim AV-Ersatzrhythmus; Verkuerzung des PQ-Intervalls bei AV-Ersatzrhythmus, WPW-Syndrom und Tachykardie.",
    "zahlen": "",
    "seite": "36",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "schrittmacher",
    "text": "Bei Vorhofstillstand infolge struktureller kardialer Pathologie kann die Implantation eines permanenten Herzschrittmachers klinische Besserung bringen, weil damit das niedrige Herzminutenvolumen normalisiert wird.",
    "zahlen": "",
    "seite": "PDF-S. 20 (Buchseite 208), Fall 37",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "schrittmacher",
    "text": "Im Befundraster eines Falles steht in der Zeile Sonstiges der Eintrag Ektopischer Schrittmacher. Der Fliesstext derselben Seite spricht an dieser Stelle jedoch nur von zwei Artefakten und kommt zum Schluss eines regelmaessigen, normalen Sinusrhythmus. Der Widerspruch steht so im Buch; die Zeilenzuordnung habe ich ueber die Textkoordinaten geprueft, sie ist korrekt.",
    "zahlen": "",
    "seite": "PDF 35 (Buch 124)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "schrittmacher",
    "text": "Beim AV-Block III laesst sich die Bradyarrhythmie in der Regel nicht durch positiv inotrope Therapie (Theophyllin, Hexoprenalin) beherrschen; bei den meisten Patienten ist die dauerhafte Implantation eines Herzschrittmachers erforderlich.",
    "zahlen": "",
    "seite": "PDF 28 (Buch 216)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "schrittmacher",
    "text": "Beim persistierenden Vorhofstillstand kann die Implantation eines permanenten Schrittmachers das klinische Bild bessern, weil sich das niedrige Herzminutenvolumen normalisiert; langfristig bleibt die Prognose wegen fortschreitender atrioventrikulaerer Regurgitation und ventrikulaerer Funktionsstoerung schlecht.",
    "zahlen": "",
    "seite": "PDF 40 (Buch 228)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "schrittmacher",
    "text": "Beim totalen AV-Block ist die Therapie die Herzschrittmacherimplantation; Praedisposition bestehen fuer Dobermann und Mops. Weitere Ursachen: verschiedene Kardiomyopathieformen, angeborene oder erworbene kardiovaskulaere Erkrankungen, idiopathische Fibrose des AV-Knotens, Hyperkaliaemien, Digitalisintoxikation.",
    "zahlen": "",
    "seite": "PDF 55 = Buch 55",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "schrittmacher",
    "text": "Therapie des Sick-Sinus-Syndroms: akut Atropin, langfristig Schrittmacherindikation bei ausgepraegter Symptomatik; die Erkrankung gilt als idiopathisch.",
    "zahlen": "",
    "seite": "PDF 56 = Buch 56",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "schrittmacher",
    "text": "Vorkommen des Sinusstillstands: intermittierend bei ausgepraegter Vagotonie und bei brachyzephalen Rassen, ferner Vorhofdilatation, Haemangiosarkom, Sinusknotenerkrankungen sowie Digitalis- bzw. Propranololintoxikation. Therapie: bei entsprechend schwerer Symptomatik Schrittmacherindikation.",
    "zahlen": "",
    "seite": "47",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "holter-24h",
    "text": "Langzeit-/Holter-EKG: kontinuierliche EKG-Registrierung ueber 24 Stunden mit Speicherung, waehrend der Patient in gewohnter Umgebung seinen Aktivitaeten nachgeht.",
    "zahlen": "24 Stunden Registrierdauer",
    "seite": "PDF 58 = Buch 58",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "holter-24h",
    "text": "Technische Vorgabe fuer die Holter-Ableitung: Klebeelektroden an fuenf verschiedenen, geschorenen und gereinigten Hautstellen am Thorax; der fixierende und zugleich schuetzende Verband um das zigarettenschachtelgrosse Geraet muss mindestens 24 Stunden halten und vom Patienten toleriert werden.",
    "zahlen": "5 Klebeelektroden; Verband mindestens 24 h",
    "seite": "PDF 58 = Buch 58",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "holter-24h",
    "text": "Der Besitzer soll waehrend der Holter-Registrierung den Tagesablauf des Patienten protokollieren (Ereignisprotokoll zur Zuordnung von Symptomen zu Rhythmusstoerungen).",
    "zahlen": "",
    "seite": "PDF 58 = Buch 58",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "holter-24h",
    "text": "Indikationen des Holter-EKG: Abklaerung von Symptomen, die durch Rhythmusstoerungen entstehen koennen (Verdacht auf Synkopen bzw. Adams-Stokes-Anfaelle), Erfassung nur sporadisch auftretender Arrhythmien, Frueherkennung bei arrhythmiebelasteten Rassehunden in der Zuchtuntersuchung, Entscheidung ueber Behandlungsbeduerftigkeit, Kontrolle einer antiarrhythmischen Therapie und Einschaetzung der Prognose.",
    "zahlen": "",
    "seite": "PDF 58 = Buch 58",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "holter-24h",
    "text": "Das 24-Stunden-EKG hat sich beim Hund innerhalb der letzten zehn Jahre als Routineuntersuchung durchgesetzt. Bei der Katze ist es deutlich schwieriger, ueber 24 Stunden eine qualitativ ausreichende Aufzeichnung zu erhalten.",
    "zahlen": "24 h Aufzeichnungsdauer",
    "seite": "PDF-Seite 1 (Buchseite 179)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "holter-24h",
    "text": "Vor jeder Aufzeichnung sind neue Batterien einzulegen bzw. der Akku vollstaendig zu laden, und der freie Speicher der Karte ist zu pruefen.",
    "zahlen": "",
    "seite": "PDF-Seite 1 (Buchseite 179)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "holter-24h",
    "text": "Die Dateien einer 24-Stunden-Aufzeichnung erreichen ueblicherweise eine Groesse von 170 bis 200 MB; danach richtet sich der noetige freie Speicherplatz.",
    "zahlen": "170-200 MB je 24-h-Aufzeichnung",
    "seite": "PDF-Seite 1 (Buchseite 179)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "holter-24h",
    "text": "Es wird empfohlen, auf der Speicherkarte eine Textdatei mit Patientendaten sowie Datum und Uhrzeit des Aufzeichnungsbeginns abzulegen. Das ist die Zuordnung der Rohaufzeichnung zum Patienten.",
    "zahlen": "",
    "seite": "PDF-Seite 1 (Buchseite 179)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "holter-24h",
    "text": "Wird ein Verband statt einer Weste benutzt, sollen alle Kabel nur auf einer Thoraxseite verlaufen. Die kabelfreie Seite wird gekennzeichnet, damit der Verband dort ohne Durchtrennen von Kabeln aufgeschnitten werden kann.",
    "zahlen": "",
    "seite": "PDF-Seite 1, Abb. 11.1b (Buchseite 179)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "holter-24h",
    "text": "Nach 24 Stunden wird der Rekorder abgenommen. Je nach Batterieleistung und Groesse der SD-Karte sind auch laengere Aufzeichnungszeitraeume moeglich.",
    "zahlen": "Standard 24 h, laenger moeglich",
    "seite": "PDF-Seite 1 (Buchseite 179)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "holter-24h",
    "text": "Das 24-Stunden-EKG hat sich beim Hund in den letzten 10 Jahren als Routineuntersuchung etabliert; bei der Katze ist eine qualitativ ausreichende 24-stuendige Aufzeichnung schwieriger.",
    "zahlen": "",
    "seite": "PDF 43 (Buch 179)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "holter-24h",
    "text": "Die auf dem Markt befindlichen Holter-Geraete arbeiten zumeist mit 4 Kabeln, die mit handelsueblichen Klebeelektroden am Thorax befestigt werden.",
    "zahlen": "4 Kabel",
    "seite": "PDF 43 (Buch 179)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "holter-24h",
    "text": "Geraetevorbereitung: vor jedem 24-Stunden-EKG neue Batterien einlegen oder den Akku komplett aufladen und die Speicherkarte auf freien Platz pruefen; die Dateien eines 24-Stunden-EKGs sind meist zwischen 170 und 200 MB gross.",
    "zahlen": "Dateigroesse 170-200 MB",
    "seite": "PDF 43 (Buch 179)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "holter-24h",
    "text": "Empfehlung: auf der Speicherkarte eine Textdatei mit den Patientendaten sowie Datum und Uhrzeit des Aufzeichnungsbeginns ablegen - direkt uebertragbar auf eine Software, die Holter-Aufzeichnungen einliest.",
    "zahlen": "",
    "seite": "PDF 43 (Buch 179)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "holter-24h",
    "text": "Patientenvorbereitung: Rasur der Haut an 4 Stellen des Thorax zwischen dem 5. und 10. Interkostalraum, jeweils 2 Stellen pro Thoraxseite.",
    "zahlen": "4 Stellen, ICR 5-10, 2 pro Seite",
    "seite": "PDF 43 (Buch 179)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "holter-24h",
    "text": "Nach dem Anbringen der Elektroden werden diese ueber die Kabel mit dem Geraet verbunden, anschliessend wird ein Verband oder eine angepasste Weste angelegt. Die Kabel muessen fest dem Thorax anliegen, um Bewegungsartefakte und Kontaktverluste der Elektroden zu vermeiden. Nach 24 h wird das Geraet entfernt; je nach Batterieleistung und Speichergroesse sind auch laengere Zeitraeume moeglich.",
    "zahlen": "24 h Standarddauer",
    "seite": "PDF 43 (Buch 179)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "holter-24h",
    "text": "Abb. 11.1: Bei Verwendung eines Verbands sollten die Kabel immer nur auf einer Thoraxseite verlaufen; die kabelfreie Seite wird gekennzeichnet, weil man dort den Verband mit der Schere oeffnen kann, ohne Kabel zu durchtrennen.",
    "zahlen": "",
    "seite": "PDF 43 (Buch 179)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "holter-24h",
    "text": "Vorbereitung des Geraetes: vor jedem 24-Stunden-EKG neue Batterien einlegen oder den Akku komplett aufladen; Speicherkarte kontrollieren, da die Dateien meist eine Groesse zwischen 170 und 200 MB haben; empfohlen wird, auf der Karte eine Textdatei mit den Patientendaten sowie Datum und Uhrzeit des Aufzeichnungsbeginns zu speichern.",
    "zahlen": "Dateigroesse 170-200 MB",
    "seite": "PDF 43 / Buch 179",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "holter-24h",
    "text": "Vorbereitung des Patienten: Rasur der Haut an 4 Stellen des Thorax (zwischen dem 5. und 10. Interkostalraum), jeweils 2 pro Thoraxseite. Danach Elektroden ueber die Kabel mit dem Geraet verbinden, anschliessend Verband oder angepasste Weste anlegen. Die Kabel muessen fest dem Thorax anliegen, um Bewegungsartefakte und Kontaktverluste zu vermeiden. Nach 24 h wird das Geraet entfernt; je nach Batterieleistung und Speichergroesse sind laengere Zeitraeume moeglich.",
    "zahlen": "4 Stellen, ICR 5-10, 2 pro Thoraxseite, 24 h",
    "seite": "PDF 43 / Buch 179",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "holter-24h",
    "text": "Abb. 11.1: Die kraniale Elektrode soll hinter dem Ellbogen in einem Bereich kleben, in dem moeglichst keine Hautbewegung beim Laufen auftritt. Bei Verwendung eines Verbandes sollten die Kabel immer nur auf einer Thoraxseite verlaufen; die kabelfreie Seite wird gekennzeichnet, weil man dort den Verband mit der Schere oeffnen kann, ohne Kabel zu durchtrennen.",
    "zahlen": "",
    "seite": "PDF 43 / Buch 179",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "kammergroesse",
    "text": "Fahrplan aus dem Inhaltsverzeichnis fuer die Kammergroessen- und Streckenkriterien (gedruckte Buchseiten): Beurteilung der Veraenderungen an P-QRS-T S. 20, linksatriale Vergroesserung S. 20, rechtsatriale Vergroesserung S. 22, linksventrikulaere Vergroesserung S. 24, rechtsventrikulaere Vergroesserung S. 26, Veraenderungen des PR-Intervalls S. 28, Veraenderungen des QT-Intervalls S. 30, Veraenderungen der ST-Strecke und der T-Welle S. 32. Diese Seiten liegen ausserhalb des hier gelesenen Bereichs.",
    "zahlen": "Buchseiten 20, 20, 22, 24, 26, 28, 30, 32",
    "seite": "PDF-Seite 12 (Buchseite XI)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "P-mitrale bedeutet eine verlaengerte Dauer der P-Welle und steht meist im Zusammenhang mit einer Vergroesserung des linken Vorhofs. Der Name leitet sich von der haeufigsten Ursache ab, der Mitralklappeninsuffizienz mit Regurgitation aus dem linken Ventrikel in den linken Vorhof.",
    "zahlen": "Merkmal ist die P-DAUER (nicht die Amplitude)",
    "seite": "PDF 33 (Buch 20)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Buchbeispiel fuer P-mitrale: die P-Welle misst in dem gezeigten Fall 0,07 s, gegenueber dem Maximalwert 0,04 s beim Hund. Ein zweites Beispiel zeigt breite, doppelgipfelige P-Wellen bei einem Mastino mit Dilatation des linken Vorhofs.",
    "zahlen": "Beispiel P = 0,07 s bei Norm 0,04 s (= 2 Kaestchen bei 50 mm/s)",
    "seite": "PDF 33 (Buch 20), Abb.21a/21b/22",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Charakteristische EKG-Merkmale der linksatrialen Vergroesserung: verbreiterte P-Wellen groesser 0,04 s beim Hund; doppelgipfelige, M-foermige P-Welle (eher selten); zusaetzlich Merkmale einer Linksherzvergroesserung, wenn auch eine Hypertrophie oder Dilatation des linken Ventrikels vorliegt.",
    "zahlen": "P-Dauer > 0,04 s (Hund); M-foermige Doppelgipfeligkeit",
    "seite": "PDF 34 (Buch 21)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Haeufigste Ursachen der linksatrialen Vergroesserung: Mitralklappenendokardiose; angeborene Kardiopathien (Mitralklappeninsuffizienz, Aortenstenose, persistierender Ductus arteriosus, Ventrikelseptumdefekt); dilatative Kardiomyopathie.",
    "zahlen": "",
    "seite": "PDF 34 (Buch 21)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Buchbeispiel: 15-jaehriger Mischlingshund mit Klappenendokardiose, bei dem P-mitrale UND P-pulmonale gleichzeitig vorliegen - das spricht fuer eine Dilatation beider Vorhoefe infolge einer Insuffizienz von Mitral- und Trikuspidalklappe.",
    "zahlen": "",
    "seite": "PDF 34 (Buch 21), Abb.23",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "P-pulmonale bedeutet eine Erhoehung der Amplitude der P-Welle und weist fuer gewoehnlich auf eine Erweiterung des rechten Vorhofs hin. Der Name stammt daher, dass die Veraenderung meist auf chronische Atemwegserkrankungen mit nachfolgender pulmonaler Hypertension zurueckgeht; haeufigste Ursache beim Hund ist der Trachealkollaps.",
    "zahlen": "Merkmal ist die P-AMPLITUDE (nicht die Dauer)",
    "seite": "PDF 35 (Buch 22)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Wichtige Einschraenkung: bei erhoehter Herzfrequenz ist die P-Welle tendenziell ohnehin ueberhoeht. Bei Tachykardien sollte der Verdacht auf eine Erweiterung des rechten Vorhofs deshalb nur mit Vorsicht geaeussert werden. Fuer eine Software heisst das: P-pulmonale nur mit Frequenzvorbehalt melden.",
    "zahlen": "",
    "seite": "PDF 35 (Buch 22)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Der Grenzwert der P-Amplitude beim Hund umgerechnet in Kaestchen: 0,4 mV entsprechen vier Kaestchen bei einer Eichung von 1 cm = 1 mV.",
    "zahlen": "0,4 mV = 4 mm bei 10 mm/mV",
    "seite": "PDF 35 (Buch 22), Abb.24a",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Charakteristische EKG-Merkmale der rechtsatrialen Vergroesserung: erhoehte P-Wellen groesser 0,4 mV, gelegentlich spitz; zusaetzlich Merkmale einer Rechtsherzvergroesserung, wenn auch eine Hypertrophie oder Dilatation des rechten Ventrikels vorliegt.",
    "zahlen": "P-Amplitude > 0,4 mV",
    "seite": "PDF 36 (Buch 23)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Haeufigste Ursachen der rechtsatrialen Vergroesserung: Sinustachykardie; Cor pulmonale (Trachealkollaps, chronische Bronchitis, Bronchopneumonie, Obstruktion der oberen Atemwege); Trikuspidalendokardiose - dort als P-biatriale, also verlaengerte P-Dauer UND erhoehte P-Amplitude zugleich; angeborene Kardiopathien (Trikuspidalklappendysplasie, Pulmonalstenose, Atriumseptumdefekt); Filariose.",
    "zahlen": "P-biatriale = P-Dauer > 0,04 s UND P-Amplitude > 0,4 mV",
    "seite": "PDF 36 (Buch 23)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Grundsaetzliche Einschraenkung des Buches zu allen Kammergroessen-Kriterien: die EKG-Kriterien lassen keine Unterscheidung zwischen Hypertrophie und Dilatation zu, und die Empfindlichkeit des EKG fuer anatomische Veraenderungen am Herzen ist nicht sehr hoch. Die Kriterien sind ausdruecklich nur als mit einer Vergroesserung 'kompatibel' formuliert.",
    "zahlen": "",
    "seite": "PDF 37 (Buch 24)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Kriterium Linksherzvergroesserung, QRS-Dauer.",
    "zahlen": "QRS > 0,05 s; bei grossen Rassen > 0,06 s",
    "seite": "PDF 37 (Buch 24)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Kriterium Linksherzvergroesserung, Hoehe der R-Zacke in Ableitung II.",
    "zahlen": "R in Ableitung II > 2,5 mV; bei grossen Rassen > 3 mV",
    "seite": "PDF 37 (Buch 24)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Kriterium Linksherzvergroesserung, Summenkriterium ueber zwei Ableitungen.",
    "zahlen": "R (Ableitung II) + R (Ableitung aVF) > 4 mV",
    "seite": "PDF 37 (Buch 24)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Kriterium Linksherzvergroesserung, Ableitung I. Im Buch gesetzt als 'In Ableitung I Fehlen von S- und R-Zacken groesser 1,5 mV' - der Satzbau ist im Original unklar (siehe luecken).",
    "zahlen": "Ableitung I: keine S-Zacke, R > 1,5 mV",
    "seite": "PDF 37 (Buch 24)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Kriterium Linksherzvergroesserung, Achse: Linksabweichung der Herzachse. Bezugsgroesse ist der Normbereich Hund +40 bis +100 Grad von PDF-Seite 26.",
    "zahlen": "MEA links des Normbereichs (Hund < +40 Grad)",
    "seite": "PDF 37 (Buch 24)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Kriterium zur Unterscheidung der Hypertrophieform bei Linksherzvergroesserung: bei konzentrischer Hypertrophie ist die R-Zacke in Ableitung I hoeher als in den Ableitungen III und aVF; bei exzentrischer Hypertrophie ist die R-Zacke in den Ableitungen I, II und III erhoeht.",
    "zahlen": "konzentrisch: R(I) > R(III) und R(I) > R(aVF); exzentrisch: R erhoeht in I, II und III",
    "seite": "PDF 37 (Buch 24)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Weitere Kriterien der Linksherzvergroesserung: P-mitrale, falls zusaetzlich eine linksatriale Dilatation besteht; sowie veraenderte ST-Strecke und T-Wellen groesser 25 % der R-Hoehe - letzteres typisch bei Hunden mit dekompensierter kongestiver Herzinsuffizienz.",
    "zahlen": "T > 25 % der R-Hoehe zusammen mit veraenderter ST-Strecke",
    "seite": "PDF 37 (Buch 24)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Haeufigste Ursachen der linksventrikulaeren Vergroesserung: angeborene Kardiopathien (Aortenstenose, persistierender Ductus arteriosus, Mitralklappeninsuffizienz, Ventrikelseptumdefekt); dilatative Kardiomyopathie; Mitralklappenendokardiose; Linksschenkelblock.",
    "zahlen": "",
    "seite": "PDF 38 (Buch 25)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Zwei durchgerechnete Buchbeispiele fuer Linksherzvergroesserung: 15-jaehriger Mischlingshund mit Mitralklappenendokardiose, R-Zacken 3,2 mV und QRS 0,07 s; 12-jaehriger Pekinese mit seniler chronischer atrioventrikulaerer Valvulopathie, QRS groesser 0,07 s, dazu breite und hohe P-Wellen sowie ST-Senkung.",
    "zahlen": "Beispiel 1: R = 3,2 mV, QRS = 0,07 s. Beispiel 2: QRS > 0,07 s",
    "seite": "PDF 38 (Buch 25), Abb.27a/27b",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Grundsatz zur rechten Kammer: die Hauptkomponente des QRS-Komplexes entsteht durch die Depolarisation des LINKEN Ventrikels. Eine Vergroesserung des rechten Ventrikels muss deshalb sehr deutlich sein, um im EKG ueberhaupt sichtbar zu werden.",
    "zahlen": "",
    "seite": "PDF 39 (Buch 26)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Charakteristische EKG-Merkmale der rechtsventrikulaeren Vergroesserung, Amplitudenkriterien.",
    "zahlen": "S-Zacke > 0,5 mV in Ableitung I; S-Zacke > 0,35 mV in Ableitung II; Q-Zacke > 0,5 mV in den Ableitungen I, II, III und aVF",
    "seite": "PDF 39 (Buch 26)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Weitere Merkmale der rechtsventrikulaeren Vergroesserung: ueberhaupt vorhandene S-Zacke in den Ableitungen I, II, III und aVF; Rechtsabweichung der Herzachse; P-pulmonale.",
    "zahlen": "S-Zacke in I, II, III und aVF nachweisbar; MEA rechts des Normbereichs (Hund > +100 Grad)",
    "seite": "PDF 39 (Buch 26)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Haeufigste Ursachen der rechtsventrikulaeren Vergroesserung: angeborene Kardiopathien (Pulmonalstenose, Fallot-Tetralogie, Trikuspidalklappendysplasie); dilatative Kardiomyopathie; Mitral- und Trikuspidalklappenendokardiose; Filariose; Haemangiosarkom des rechten Vorhofs; Cor pulmonale; chronische Atemwegserkrankungen; Rechtsschenkelblock.",
    "zahlen": "",
    "seite": "PDF 40 (Buch 27)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Eine Rechtsabweichung der Achse kann entweder auf einen Defekt der intraventrikulaeren Erregungsausbreitung in der rechten Kammer oder auf eine Hypertrophie des rechten Ventrikels hinweisen. Das EKG kann zwischen beidem nicht unterscheiden.",
    "zahlen": "",
    "seite": "PDF 1 (gedruckt 90)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Anhand des EKG laesst sich nicht erkennen, ob eine ventrikulaere Dilatation oder eine Hypertrophie vorliegt. Das Buch haelt deshalb den Begriff \"Ventrikelvergroesserung\" fuer korrekter. Ein Befundtext der Software sollte diese Unterscheidung entsprechend nicht behaupten.",
    "zahlen": "",
    "seite": "PDF 1 (gedruckt 90)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Befundmuster dilatative Kardiomyopathie (Cocker Spaniel, 10 Jahre): normale P-Wellen, aber tiefe Q-Zacken, verlaengerte QRS-Dauer, ST-Senkung und T-Welle mit erhoehter Amplitude. Erklaert wird das durch Vergroesserung beider Ventrikel und Myokardhypoxie.",
    "zahlen": "HF 140 bpm; P 0,03 s x 0,2 mV; PR 0,08 s; QRS 0,07 s (Norm bis 0,06 s); R 1,4 mV; QT 0,18 s; ST-Senkung 0,2 mV; T > 25 % der R-Hoehe",
    "seite": "PDF 9 (gedruckt 98)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Fehlen EKG-Zeichen einer Vorhoferweiterung, hat das keine definitive Aussagekraft: die Veraenderung kann bestehen und sich im EKG trotzdem nicht widerspiegeln. Ein negativer EKG-Befund ist also kein Ausschluss.",
    "zahlen": "",
    "seite": "PDF 9 (gedruckt 98)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "EKG-Zeichen einer Linksherzhypertrophie durch Drucküberlastung (Beispiel Aortenstenose): R-Zacken mit hoher Amplitude und verbreiterte QRS-Komplexe.",
    "zahlen": "",
    "seite": "PDF 11 (gedruckt 100)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Pruefbare Bedingung P-mitrale (Dilatation des linken Vorhofs): P-Wellen-Dauer ueber 0,04 s. Das Buch wertet in einem Fall bereits 0,05 s und in einem anderen 0,045 s (\"leicht ueber 0,04 s hinaus verlaengert\") als P-mitrale.",
    "zahlen": "P-Dauer > 0,04 s; belegte Fallwerte 0,045 s, 0,05 s, 0,06 s",
    "seite": "PDF 13, 15, 17, 25 (gedruckt 102, 104, 106, 114)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Pruefbare Bedingung P-pulmonale (Vergroesserung des rechten Atriums): P-Wellen-Amplitude von mehr als 0,4 mV. Fallwert 0,5 mV.",
    "zahlen": "P-Amplitude > 0,4 mV; Fallwert 0,5 mV",
    "seite": "PDF 15 (gedruckt 104)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Pruefbare Bedingung P-biatriale (Dilatation beider Vorhoefe): P-mitrale und P-pulmonale zugleich, also verlaengerte P-Dauer UND erhoehte P-Amplitude im selben Komplex. Fallwert 0,06 s x 0,5 mV.",
    "zahlen": "P-Dauer > 0,04 s UND P-Amplitude > 0,4 mV; Fallwert 0,06 s x 0,5 mV",
    "seite": "PDF 17 (gedruckt 106)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Verbreiterte QRS-Komplexe werden durchgaengig als Hinweis auf eine Hypertrophie oder Dilatation des linken Ventrikels gewertet; zusammen mit hohen R-Zacken gilt der Hinweis als deutlicher.",
    "zahlen": "",
    "seite": "PDF 13, 17, 25 (gedruckt 102, 106, 114)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Differentialdiagnosen einer Dilatation des rechten Vorhofs ausser der Klappenendokardiose: chronische Atemwegserkrankungen mit pulmonaler Hypertension (Trachealkollaps, chronische Bronchitis, pulmonale Fibrose) sowie Dirofilariose.",
    "zahlen": "",
    "seite": "PDF 15 und 17 (gedruckt 104 und 106)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Ueberhoehte P-Wellen (P pulmonale) weisen auf eine Dilatation des rechten Vorhofs hin. Als Schwelle gilt die Normwerttabelle mit einer P-Hoehe von 0,4 mV; im Fall 29 wurden 0,5 mV gemessen.",
    "zahlen": "P-Hoehe normal 0,4 mV; Fall 29 gemessen 0,5 mV",
    "seite": "PDF-S. 4 (Buchseite 192), Fall 29",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Verbreiterte QRS-Komplexe koennen entweder durch Hypertrophie/Dilatation des linken Ventrikels bedingt sein oder auf einen Linksschenkelblock zurueckgehen; das EKG allein trennt beides hier nicht.",
    "zahlen": "QRS-Norm bis 0,06 s; Fall 29 gemessen 0,08 s",
    "seite": "PDF-S. 4 (Buchseite 192), Fall 29",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "P mitrale und P pulmonale koennen gleichzeitig vorliegen und sprechen dann fuer eine links- bzw. rechtsatriale Dilatation. Im Fall 34 lag die P-Welle bei 0,06 s x 0,6 mV, also gleichzeitig ueber der Normbreite 0,04 s und ueber der Normhoehe 0,4 mV.",
    "zahlen": "Fall 34: P 0,06 s x 0,6 mV (Norm 0,04 s / 0,4 mV)",
    "seite": "PDF-S. 14 (Buchseite 202), Fall 34",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Stark verbreiterte QRS-Komplexe weisen auf eine Hypertrophie bzw. Dilatation des linken Ventrikels hin; ST-Strecken-Senkung zusammen mit tiefen T-Wellen ist in der Regel Zeichen einer Myokardhypoxie.",
    "zahlen": "Fall 34: QRS 0,08 s; ST-Senkung 0,25 mV",
    "seite": "PDF-S. 14 (Buchseite 202), Fall 34",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "P-pulmonale als pruefbare Bedingung: die P-Welle ist hoeher als der Normwert. Im Beispielfall betraegt sie 0,5 mV bei einer Normhoehe von 0,4 mV. Der Befund weist auf eine Erweiterung des rechten Vorhofs hin.",
    "zahlen": "P-Hoehe groesser 0,4 mV; Beispielfall 0,5 mV",
    "seite": "PDF 27 (Buch 116)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Ursachen eines P-pulmonale: degenerative Klappenveraenderungen, angeborene Anomalien wie Klappendysplasie oder Pulmonalstenose, haeufig aber schwere oder chronische Atemwegserkrankung mit nachfolgender pulmonaler Hypertonie; auch bei der kaninen Filariose zu beobachten.",
    "zahlen": "",
    "seite": "PDF 27 (Buch 116)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "P-mitrale als pruefbare Bedingung: die P-Welle ist breiter als 0,04 s. Der Befund weist auf eine Dilatation des linken Vorhofs hin.",
    "zahlen": "P-Dauer groesser 0,04 s",
    "seite": "PDF 43 (Buch 132); Beispiel mit 0,06 s auf PDF 49 (Buch 138)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Sind die P-Wellen gleichzeitig breiter und hoeher als normal, liegen P-mitrale und P-pulmonale zusammen vor. Das ist ein Kriterium fuer die Dilatation von linkem und rechtem Vorhof.",
    "zahlen": "P-Dauer und P-Hoehe zugleich ueber Norm",
    "seite": "PDF 37 (Buch 126)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Verbreiterte QRS-Komplexe weisen auf eine Hypertrophie oder Dilatation des linken Ventrikels hin. Im zugehoerigen Fall betraegt die QRS-Dauer 0,06 s.",
    "zahlen": "QRS 0,06 s im Beispielfall",
    "seite": "PDF 49 (Buch 138)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Verbreiterte QRS-Komplexe zusammen mit tiefen Q-Zacken sprechen fuer eine Hypertrophie oder Dilatation des linken beziehungsweise rechten Ventrikels.",
    "zahlen": "",
    "seite": "PDF 43 (Buch 132)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Verbreiterte P-Wellen und verbreiterte QRS-Komplexe zusammen weisen auf eine Dilatation von linkem Vorhof und linkem Ventrikel hin.",
    "zahlen": "",
    "seite": "PDF 39 (Buch 128)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "P-mitrale gilt als recht spezifischer Hinweis auf eine Dilatation des linken Vorhofs.",
    "zahlen": "",
    "seite": "PDF 32 (Buch 220)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "P-pulmonale kann sich allein bei erhoehter Herzfrequenz zeigen und ist dann kein Groessenbefund; erst zusammen mit weiteren Veraenderungen spricht es fuer eine rechtsatriale Erweiterung infolge Rechtsherzbelastung. Eine Auswertung darf P-pulmonale bei Tachykardie also nicht ungefiltert als Rechtsvorhofdilatation melden.",
    "zahlen": "",
    "seite": "PDF 32 (Buch 220)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Verbreiterte QRS-Komplexe weisen auf eine Hypertrophie oder Dilatation des linken Ventrikels hin; alternativ koennen sie von einer intraventrikulaeren Leitungsblockierung im linken Tawara-Schenkel (Linksschenkelblock) herruehren. Ein verbreiterter QRS ist damit nie eindeutig, sondern immer eine Zweifach-Differentialdiagnose.",
    "zahlen": "",
    "seite": "PDF 36 (Buch 224)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Sowohl isolierte supraventrikulaere Extrasystolen als auch eine supraventrikulaere Tachykardie weisen auf eine hochgradige Vorhoferweiterung hin, wie sie fuer fortgeschrittene Kardiopathien typisch ist.",
    "zahlen": "",
    "seite": "PDF 42 (Buch 230)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "kammergroesse",
    "text": "Roentgen-Normalbefund seitlich: das Herz steht in etwa 45 Grad zum Sternum; die Herzhoehe nimmt bei Hund und Katze zwei Drittel bis maximal drei Viertel der Thoraxhoehe ein.",
    "zahlen": "ca. 45 Grad; Herzhoehe 2/3 bis max. 3/4 der Thoraxhoehe",
    "seite": "PDF 62 = Buch 62",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Maximale Herzbreite seitlich beim Hund nach Brustkorbform: schmaler Brustkorb bis 2,5 Interkostalraeume, durchschnittlicher Hund bis 3,0 ICR, kleine oder breitbruestige Rassen sowie Junghunde bis 3,5 ICR. Bei der Katze entspricht die Herzbreite der Distanz vom kranialen Rand der 5. Rippe zum kaudalen Rand der 7. Rippe.",
    "zahlen": "Hund 2,5 / 3,0 / 3,5 ICR; Katze 5. bis 7. Rippe",
    "seite": "PDF 62 = Buch 62",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Eine Linie zwischen Bifurkation und Herzspitze trennt den kaudal gelegenen linken vom kranialen rechten Herzanteil; laut Text macht der Abstand der kranialen Herzkontur zu dieser Linie etwa zwei Drittel und der der kaudalen Herzkontur etwa ein Drittel aus. Passend dazu gilt spaeter '> zwei Drittel der Breitendimension' als Zeichen der Rechtsherzvergroesserung.",
    "zahlen": "kranial ca. 2/3, kaudal ca. 1/3; Rechtsherzvergroesserung > 2/3",
    "seite": "PDF 62 und 68 = Buch 62 und 68",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "DV/VD-Normalbefund: maximale Herzbreite beim Hund etwa zwei Drittel des Thoraxdurchmessers auf gleicher Hoehe, bei der Katze zwischen der Haelfte und zwei Dritteln; die Herzflaeche nimmt beim Hund weniger als zwei Drittel der Thoraxflaeche ein. Linke Herzhaelfte birnen-, rechte apfelfoermig, mit gleicher maximaler Breite und gleichem Wandabstand beidseits.",
    "zahlen": "Hund ca. 2/3 des Thoraxdurchmessers, Herzflaeche < 2/3 der Thoraxflaeche; Katze 1/2 bis 2/3",
    "seite": "PDF 62 = Buch 62",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Uhrzeit-Schema der DV/VD-Aufnahme im Buch: linkes Herzohr 2-3 Uhr (im Bildbeispiel 2-4 Uhr), Anfangsteil der Aorta descendens 2-4 Uhr, rechter Vorhof 8-12 Uhr, rechter Ventrikel 6-10 Uhr, Pulmonalarterienstamm 1-3 Uhr (Stammausweitung auch bei 12 Uhr beschrieben), Aorta ascendens 12-1 Uhr (Beispiel 11-1 Uhr), linke Ventrikelkontur 3-6 Uhr.",
    "zahlen": "LAu 2-3 Uhr; Ao desc. 2-4 Uhr; RA 8-12 Uhr; RV 6-10 Uhr; PA 1-3 Uhr; Ao asc. 12-1 Uhr; LV 3-6 Uhr",
    "seite": "PDF 66-69 = Buch 66-69",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Linksatriale Vergroesserung seitlich: Anhebung des kaudalen Trachealanteils und des linken Stammbronchus mit Auseinanderweichen der Bronchien, Winkel zwischen Trachea und kaudaler Herzkontur wird statt leicht flach senkrecht oder leicht spitz, kaudale Herzkontur wird statt leicht konkav gerade, S-foermig oder konvex; DV/VD: Ausweitung des linken Herzohrs zwischen 2 und 3 Uhr und Verschiebung der Herzspitze nach rechts.",
    "zahlen": "",
    "seite": "PDF 66 = Buch 66",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Rechtsventrikulaere Vergroesserung seitlich: vermehrte Woelbung der kranialen Herzkontur vor der Herzspitze, Zunahme des rechten Herzanteils auf mehr als zwei Drittel der Breitendimension, breiter Sternumkontakt, Anhebung von Herzspitze und Trachea ueber dem vorderen Herzanteil; DV/VD Woelbung der rechten Kontur zwischen 6 und 10 Uhr.",
    "zahlen": "rechter Herzanteil > 2/3 der Breitendimension",
    "seite": "PDF 68 = Buch 68",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Steckbrief P mitrale (Synonym P sinistro-atriale): verbreiterte P-Welle, Kerbung moeglich. Grenzwerte: ueber 0,04 s beim Hund, ueber 0,05 s bei Riesenrassen, ueber 0,04 s bei der Katze. Ausdruck einer Ueberlastung des linken Vorhofs.",
    "zahlen": "P-Breite > 0,04 s (Hund), > 0,05 s (Riesenrassen), > 0,04 s (Katze)",
    "seite": "27",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Vorkommen des P mitrale: Linksherzinsuffizienz, Mitralklappenvitien, Aortenvitien, VSD, PDA, Kardiomyopathien, intraatriale Leitungsstoerung.",
    "zahlen": "",
    "seite": "27",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Steckbrief P pulmonale (Synonym P dextro-atriale): erhoehte P-Amplitude in Abl. II, III und aVF, beim Hund ueber 0,4 mV, bei der Katze ueber 0,2 mV. Ausdruck einer Ueberlastung des rechten Vorhofs.",
    "zahlen": "P-Amplitude > 0,4 mV (Hund), > 0,2 mV (Katze) in II, III, aVF",
    "seite": "28",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Vorkommen des P pulmonale: Rechtsherzinsuffizienz, Cor pulmonale, Pulmonalvitien, Trikuspidalklappenvitien, ASD, selten HKM.",
    "zahlen": "",
    "seite": "28",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Ein unauffaelliges EKG schliesst eine ventrikulaere Vergroesserung nicht aus. Mittels EKG ist eine Unterscheidung zwischen Dilatation und Hypertrophie nicht moeglich.",
    "zahlen": "",
    "seite": "30",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Steckbrief linksventrikulaere Vergroesserung Hund, R-Zackenamplituden: ueber 2,5 mV bei Hunden aelter als 2 Jahre in Abl. II, III und aVF; ueber 3,0 mV bei schmalbruestigen Hunden juenger als 2 Jahre in Abl. II und aVF; ueber 2,5 mV in Abl. CV6LL; ueber 3,0 mV in Abl. CV6LU.",
    "zahlen": "R > 2,5 mV (Hund > 2 J.) in II, III, aVF; > 3,0 mV (schmalbruestig < 2 J.) in II, aVF; > 2,5 mV in CV6LL; > 3,0 mV in CV6LU",
    "seite": "31",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Weitere Kriterien der linksventrikulaeren Vergroesserung beim Hund: QRS meist schmal und normal geformt (normal bis 0,05 s kleine bzw. 0,06 s grosse Rassen), Verbreiterung bei hochgradiger Vergroesserung moeglich; QT-Verlaengerung ueber 0,13 s moeglich; Linksachsenabweichung zwischen minus 90 Grad und plus 40 Grad; ST-Streckenverlagerung diskordant zur Hauptausschlagsrichtung der QRS-Komplexe; T-Wellen ueber 28 % der R-Zacken in Abl. II.",
    "zahlen": "QT > 0,13 s; Achse -90 bis +40 Grad; T > 28 % von R (Abl. II)",
    "seite": "31",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Formunterschied: bei konzentrischer Hypertrophie kann die R-Zacke in Abl. I groesser sein als in Abl. III und aVF; bei exzentrischer Hypertrophie und Dilatation ist die R-Zacke in den Abl. I, II und III ueberhoeht.",
    "zahlen": "",
    "seite": "31",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Steckbrief linksventrikulaere Vergroesserung Katze: R-Zacken ueber 0,9 mV in Abl. II und ueber 1,0 mV in Abl. CV6LU; QRS-Breite normal bis 0,04 s, Verbreiterung bei hochgradiger Vergroesserung moeglich; QT-Verlaengerung auf ueber 0,09 s moeglich; Linksachsenabweichung zwischen minus 75 Grad und 0 Grad; T-Wellen ueber 0,3 mV in Abl. II; bei asymmetrischer Septumhypertrophie Q-Zacken ueber 0,5 mV in Abl. I und aVL.",
    "zahlen": "R > 0,9 mV (II), > 1,0 mV (CV6LU); QRS <= 0,04 s; QT > 0,09 s; Achse -75 bis +0 Grad; T > 0,3 mV; Q > 0,5 mV (I, aVL)",
    "seite": "32",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Vorkommen der linksventrikulaeren Vergroesserung bei der Katze zusaetzlich zu den Herzursachen: arterielle Hypertonie, chronische Niereninsuffizienz, chronische Anaemie, Hyperthyreose.",
    "zahlen": "",
    "seite": "32",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Beispiel: Katze mit HKM, Sinusrhythmus HF 160/min, high voltage mit R-Amplituden von 1,5 mV in Abl. II; obere Zeile 50 mm/s, untere 25 mm/s, Eichung 1 cm = 1 mV.",
    "zahlen": "R 1,5 mV; HF 160/min",
    "seite": "32",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Steckbrief rechtsventrikulaere Vergroesserung Hund: eine RV-Vergroesserung ist relativ wahrscheinlich, wenn drei der folgenden Veraenderungen nachweisbar sind - S-Zacke ueber 0,05 mV in Abl. I, ueber 0,35 mV in Abl. II, ueber 0,80 mV in CV6LL, ueber 0,70 mV in CV6LU, gleichzeitiges Auftreten von S-Zacken in I, II, III und aVF; R/S-Verhaeltnis in CV6LU ueber 0,8; Rechtsachsenabweichung von minus 90 Grad bis plus 103 Grad.",
    "zahlen": "3 von: S > 0,05 mV (I); > 0,35 mV (II); > 0,80 mV (CV6LL); > 0,70 mV (CV6LU); S gleichzeitig in I, II, III, aVF; R/S in CV6LU > 0,8; Achse -90 bis +103 Grad",
    "seite": "33",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Weitere Zeichen der rechtsventrikulaeren Vergroesserung beim Hund: Q-Zacken ueber 0,5 mV in Abl. I, II, III und aVL moeglich (Ausnahme schmalbruestige Rassen); R-Zacke in Abl. III groesser als in Abl. II moeglich; QRS-Form und -Breite normal, Verbreiterung moeglich.",
    "zahlen": "Q > 0,5 mV in I, II, III, aVL; R(III) > R(II)",
    "seite": "33",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Vorkommen der rechtsventrikulaeren Vergroesserung: hauptsaechlich kongenitale Vitien (Pulmonalstenose, Fallot'sche Tetralogie, PDA mit Rechts-Links-Shunt, grosser ASD, grosser VSD mit Rechts-Links-Shunt, Trikuspidalklappendysplasie, bei der Katze zusaetzlich Canalis atrioventricularis); seltener erworben bei AV-Klappeninsuffizienz, chronischen Atemwegserkrankungen/Cor pulmonale und Dirofilariose.",
    "zahlen": "",
    "seite": "33",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Steckbrief rechtsventrikulaere Vergroesserung Katze: drei der folgenden Veraenderungen machen sie wahrscheinlich - S-Zacken 0,5 mV in Abl. I, II, III und aVF, S-Zacken 0,7 mV in CV6LL und CV6LU, gleichzeitiges Auftreten in I, II, III und aVF, Rechtsachsenabweichung von minus 90 Grad bis plus 160 Grad; ausserdem Q-Zacken 0,5 mV in Abl. I, II, III, aVL moeglich. In der Druckvorlage fehlt vor diesen Katzenwerten das Vergleichszeichen; nach der parallelen Hundeseite ist ein Groesser-als gemeint.",
    "zahlen": "S 0,5 mV (I, II, III, aVF); S 0,7 mV (CV6LL, CV6LU); Achse -90 bis +160 Grad; Q 0,5 mV (I, II, III, aVL)",
    "seite": "34",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Beispiel rechtsventrikulaere Vergroesserung: Katze mit Pulmonalstenose, negative Kammerkomplexe durch tiefe S-Zacken in Abl. I 0,15 mV, Abl. II 0,5 mV, Abl. III 0,6 mV und aVF 0,5 mV, hohe P-Amplitude 0,25 mV in Abl. II, Sinusrhythmus HF 180/min.",
    "zahlen": "S 0,15 / 0,5 / 0,6 / 0,5 mV; P 0,25 mV; HF 180/min",
    "seite": "34",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Beispiel Hundewelpe mit Pulmonalstenose: ueberwiegend negative Kammerkomplexe (S-Zacken) in Abl. I, II, III, aVL, aVF, CV6LL, CV6LU und V10, positive Kammerkomplexe in aVR und CV5R; 25 mm/s, 1 cm = 1 mV.",
    "zahlen": "",
    "seite": "33",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "Bei arterieller Hypertonie kann die Zunahme der ventrikulaeren Muskelmasse im EKG als Highvoltage erkennbar sein. Ein Zahlenwert fuer 'Highvoltage' wird an dieser Stelle nicht angegeben.",
    "zahlen": "",
    "seite": "PDF 117 = Buchseite 117",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "kammergroesse",
    "text": "P-mitrale ist die Verbreiterung der P-Welle. Sie zeigt, dass der elektrische Strom bei Vorhofvergroesserung durch Mitralinsuffizienz laenger braucht, um den Vorhof vollstaendig zu erregen.",
    "zahlen": "Kriterium: P-Breite erhoeht",
    "seite": "PDF 14 (Buch 152)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "kammergroesse",
    "text": "P-pulmonale tritt mit erhoehter Amplitude in Erscheinung, weil der vergroesserte rechte Vorhof zu Beginn der Depolarisation ein elektrisch starkes Signal an die positive Elektrode sendet.",
    "zahlen": "Kriterium: P-Hoehe erhoeht",
    "seite": "PDF 14/16 (Buch 152/154)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "kammergroesse",
    "text": "P-kardiale: bei generalisierter beidseitiger Vorhofvergroesserung wird die P-Welle breit und hoch und weist im Verlauf regelmaessig eine Kerbe auf, weil die Depolarisationswelle mit Zeit- und Spannungsunterschieden durch beide Atrien laeuft.",
    "zahlen": "Kriterium: P breit UND hoch UND gekerbt",
    "seite": "PDF 16 (Buch 154)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "kammergroesse",
    "text": "Zahlenbeispiele zur P-Wellen-Veraenderung in Ableitung II bei 50 mm/s und 10 mm/mV: normales P des Hundes 0,3 mV bei 0,04 s; breites P gleich P-mitrale 0,3 mV bei 0,06 s als Hinweis auf einen vergroesserten linken Vorhof; hohes P gleich P-pulmonale 0,5 mV bei 0,04 s als Hinweis auf einen vergroesserten rechten Vorhof.",
    "zahlen": "normal 0,3 mV / 0,04 s; P-mitrale 0,3 mV / 0,06 s; P-pulmonale 0,5 mV / 0,04 s",
    "seite": "PDF 17 (Buch 155)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "kammergroesse",
    "text": "Tab. 10.7, Zeile 1: R-Zacke in Ableitung II erhoeht (+), Nettoamplitude positiv, Breite normal, gedruckt als 'R2 > 2,5 (-3) mV (Hypervoltage)' zusammen mit hohen Ausschlaegen in III und aVF - Befund Linksherzvergroesserung.",
    "zahlen": "R (Abl. II) > 2,5 (-3) mV = Hypervoltage",
    "seite": "PDF 27 (Buch 165)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "kammergroesse",
    "text": "Tab. 10.7: Nettoamplitude negativ mit tiefer S-Zacke bei normaler Breite, negative Ausschlaege in I, II, III, aVL und aVF (aVR positiv) - Befund rechtsventrikulaere Vergroesserung.",
    "zahlen": "",
    "seite": "PDF 27 (Buch 165)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "kammergroesse",
    "text": "P-mitrale: eine Verbreiterung der P-Welle. Sie zeigt an, dass der elektrische Strom bei Vorhofvergroesserung durch Mitralinsuffizienz laenger braucht, um den Vorhof vollstaendig zu erregen (linker Vorhof vergroessert).",
    "zahlen": "",
    "seite": "PDF 14 / Buch 152",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "kammergroesse",
    "text": "P-pulmonale: erhoehte Amplitude der P-Welle, weil der vergroesserte rechte Vorhof zu Beginn der Depolarisation ein elektrisch starkes Signal an die positive Elektrode sendet.",
    "zahlen": "",
    "seite": "PDF 14 / Buch 152",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "kammergroesse",
    "text": "Abb. 10.20 mit konkreten Messwerten bei 50 mm/s und 10 mm/mV: normales P beim Hund 0,3 mV / 0,04 s; breites P = P-mitrale 0,3 mV / 0,06 s als Hinweis auf einen vergroesserten linken Vorhof; hohes P = P-pulmonale 0,5 mV / 0,04 s als Hinweis auf einen vergroesserten rechten Vorhof.",
    "zahlen": "normal 0,3 mV/0,04 s; P-mitrale 0,3 mV/0,06 s; P-pulmonale 0,5 mV/0,04 s",
    "seite": "PDF 17 / Buch 155",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "kammergroesse",
    "text": "Tab. 10.5 Formveraenderungen der P-Welle: breit = P-mitrale bedeutet Vorhofvergroesserung links; hoch = P-pulmonale bedeutet Vorhofvergroesserung rechts; hoch und breit = P-kardiale bedeutet beidseitige Vorhofvergroesserung.",
    "zahlen": "",
    "seite": "PDF 22 / Buch 160",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "kammergroesse",
    "text": "Tab. 10.7: R-Zacke in Ableitung II hoch, Nettoamplitude positiv, QRS-Breite normal, R in Ableitung II groesser 2,5 (bis 3) mV (Hypervoltage) sowie hohe Ausschlaege in III und aVF bedeuten Linksherzvergroesserung.",
    "zahlen": "R(II) > 2,5 (-3) mV bei normaler QRS-Breite",
    "seite": "PDF 27 / Buch 165",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "kammergroesse",
    "text": "Tab. 10.7: negative Nettoamplitude mit tiefer S-Zacke bei NORMALER QRS-Breite und negativen Ausschlaegen in I, II, III, aVL und aVF (aVR positiv) bedeutet rechtsventrikulaere Vergroesserung.",
    "zahlen": "I, II, III, aVL, aVF negativ; aVR positiv; QRS-Breite normal",
    "seite": "PDF 27 / Buch 165",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "kammergroesse",
    "text": "2D-Normalbefund (Diastole, 4K): Die freie Wand des rechten Ventrikels ist maximal halb so dick wie das interventrikulaere Septum.",
    "zahlen": "RV-Wand <= 0,5 x Septumdicke",
    "seite": "PDF 6-7 / Buch 100-101",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "kammergroesse",
    "text": "2D-Normalbefund (Diastole): Der Innendurchmesser des rechten Ventrikels betraegt maximal die Haelfte des linksventrikulaeren; der RV passt etwa zweimal in den LV.",
    "zahlen": "RV-Innendurchmesser <= 0,5 x LV; RV:LV etwa 1:2",
    "seite": "PDF 6 / Buch 100",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "kammergroesse",
    "text": "2D-Normalbefund im rechts parasternalen 4K: Das rechte Atrium ist immer kleiner als das linke; das linke Atrium ist geringgradig groesser als das rechte.",
    "zahlen": "",
    "seite": "PDF 6 / Buch 100",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "kammergroesse",
    "text": "2D-Normalbefund: Die Flaeche des linken Atriums ist subjektiv etwa halb so gross wie die des linken Ventrikels; enddiastolisch passt das LA zweimal in das LV-Lumen (Verhaeltnis 2:1).",
    "zahlen": "LA:LV Flaeche etwa 1:2",
    "seite": "PDF 6, 8, 12 / Buch 100, 102, 106",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "kammergroesse",
    "text": "2D-Normalbefund: Das interatriale Septum soll waagerecht und geradlinig verlaufen (wie das Ventrikelseptum). Das ist das Kriterium fuer ausgewogene Druckverhaeltnisse in den Vorhoefen.",
    "zahlen": "",
    "seite": "PDF 6 / Buch 100",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "kammergroesse",
    "text": "2D-Normalbefund: Das interventrikulaere Septum ist etwa gleich stark wie die freie Wand des linken Ventrikels und hat einen geraden Verlauf; Richtung Aorta (Pars membranacea, Teil des Ausflusstrakts) ist es deutlich duenner.",
    "zahlen": "IVS etwa gleich LVW",
    "seite": "PDF 6 / Buch 100",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "kammergroesse",
    "text": "2D-Normalbefund: Das Lumen des linken Ventrikels stellt sich in der Regel kastenfoermig dar; das Perikard liegt als weisse Linie der freien Wand an.",
    "zahlen": "",
    "seite": "PDF 6 / Buch 100",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "kammergroesse",
    "text": "Abweichung Verdickte rechte Ventrikelwand: die rechte freie Wand ist gleich dick oder dicker als die linke freie Wand; das Septum ist dann ebenfalls verdickt. Pathogenese ist konzentrische Hypertrophie durch erhoehte systolische Druckbelastung. Differenzialdiagnosen: Pulmonalstenose, VSD mit Links-Rechts-Shunt, primaere (angeborene) pulmonale Hypertension, sekundaere pulmonale Hypertension.",
    "zahlen": "RV-Wand >= LV-Wand",
    "seite": "PDF 7 / Buch 101",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "kammergroesse",
    "text": "Abweichung Erweiterter rechter Ventrikel: RV-Innendurchmesser nahezu gleich gross wie oder groesser als das LV-Lumen. Pathogenese: Volumenueberlastung (Wand kann duenner werden) oder akute Druckbelastung. Differenzialdiagnosen: Trikuspidaldysplasie, ASD mit Links-Rechts-Shunt, PDA mit Rechts-Links-Shunt, degenerative AV-Klappenerkrankung, akut aufgetretene pulmonale Hypertonie.",
    "zahlen": "RV-Innendurchmesser >= LV-Innendurchmesser",
    "seite": "PDF 7 / Buch 101",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "kammergroesse",
    "text": "Abweichung Vergroessertes rechtes Atrium: RA deutlich groesser als LA. Prozesse, die den maximalen Vorhofdruck dauerhaft uebersteigen, fuehren zur Vorhoferweiterung. Differenzialdiagnosen: ASD mit Links-Rechts-Shunt, Trikuspidalklappenstenose, Trikuspidaldysplasie, degenerative Trikuspidalklappenerkrankung, pulmonaler Hochdruck, Pulmonalstenose.",
    "zahlen": "maximaler physiologischer Vorhofdruck 8 mmHg",
    "seite": "PDF 8 / Buch 102",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "kammergroesse",
    "text": "Abweichung Vergroessertes linkes Atrium: normal ist LA:LV enddiastolisch 1:2; je nach Schwere der Linksherzinsuffizienz naehert sich das Verhaeltnis zugunsten des Vorhofs an. Ursachen sind Volumenmehrbelastung (z. B. Mitralregurgitation) oder gestoerte diastolische LV-Fuellung (z. B. Mitralstenose, HCM). Differenzialdiagnosen: Mitralklappendysplasie/-stenose, DMVD, Kardiomyopathien, Links-Rechts-Shunts.",
    "zahlen": "LA:LV normal 1:2",
    "seite": "PDF 8-9 / Buch 102-103",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "kammergroesse",
    "text": "Begriff relative linksatriale Erweiterung: Volumenabnahme im linken Ventrikel bei normaler Vorhofgroesse, verursacht durch Hypovolaemie oder Lumenreduktion wegen Wandverdickung.",
    "zahlen": "",
    "seite": "PDF 9 / Buch 103",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "kammergroesse",
    "text": "Abweichung Vergroesserter linker Ventrikel: Septum und freie Wand verlaufen nicht mehr parallel, sondern bilden eine kugelige Form, die Apex ist abgerundet. Ursache ist stetig steigende Vorlast. Differenzialdiagnosen: Klappeninsuffizienzen, Links-Rechts-Shunts, Kardiomyopathien.",
    "zahlen": "",
    "seite": "PDF 9 / Buch 103",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "kammergroesse",
    "text": "Abweichung Verdicktes interventrikulaeres Septum: IVS dicker als die freie linke Ventrikelwand. Asymmetrische bzw. regionale Verdickung ist haeufiger als symmetrische; am Septum ist das bei Katzen ein haeufiges Phaenomen. Deutliche Vorwoelbung (Nasenbildung) Richtung LVOT engt den Fluss zur Aorta ein. Differenzialdiagnosen: Subaortenstenose, HCM, Septumverdickung bei Rechtsherz-Drucküberladung, systemische Hypertension, pulmonale Hypertension, Pulmonalstenose, thyreotoxische Kardiomyopathie.",
    "zahlen": "IVS > LVW",
    "seite": "PDF 9 / Buch 103",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "kammergroesse",
    "text": "Abweichung Verdickte freie linke Ventrikelwand: die linke freie Wand ist mehr als doppelt so dick wie die rechte freie Wand. Differenzialdiagnosen: Aortenstenose, HCM, systemische Hypertension; bei Diabetes mellitus, Hyperadrenokortizismus und Nierenerkrankungen dezente symmetrische Verdickung des gesamten LV durch Vor- und Nachlastveraenderungen.",
    "zahlen": "LVW > 2 x RV-Wand",
    "seite": "PDF 9-10 / Buch 103-104",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "kammergroesse",
    "text": "Normalbefunde links apikal (Diastole): RV-Wand maximal halb so dick wie die freie LV-Wand; RV-Lumen maximal die Haelfte des LV-Innendurchmessers; rechtes Atrium nur unwesentlich kleiner als das linke; linkes Atrium etwa halb so gross wie der linke Ventrikel; interatriales Septum senkrecht (Kriterium fuer ausgewogene Vorhofdruecke); IVS etwa gleich stark wie die freie LV-Wand; LV-Lumen kastenfoermig mit nahezu parallelen Waenden.",
    "zahlen": "",
    "seite": "PDF 20 / Buch 114",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "elektrolyt",
    "text": "Bei einem AV-Block III ist besonders auf Erkrankungen zu achten, die mit einer hochgradigen Kaliaemie einhergehen - genannt werden chronische Niereninsuffizienz und vor allem das Addison-Syndrom. Differentialdiagnostisch auszuschliessen sind ausserdem Sick-Sinus-Syndrom und Kardiopathien im weit fortgeschrittenen Stadium; in manchen Faellen sind AV-Bloecke idiopathisch.",
    "zahlen": "",
    "seite": "PDF 42 (Buch 29)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "elektrolyt",
    "text": "Aehnlich veraenderte T-Wellen entstehen bei Elektrolytimbalanzen und Stoffwechselstoerungen: Anaemie, Uraemie, Schock, Ketoazidose, Hypoglykaemie und fieberhaften Zustaenden.",
    "zahlen": "",
    "seite": "PDF 1 (gedruckt 90)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "elektrolyt",
    "text": "Bradykardie mit verlaengertem QT-Intervall ist ein typischer Befund bei Hypokalzaemie (Hypoparathyreoidismus, chronische Niereninsuffizienz, Eklampsie, Pankreatitis, Alkalose) und bei Hypokaliaemie (Cushing-Syndrom, Diuretikagabe).",
    "zahlen": "",
    "seite": "PDF 5 (gedruckt 94)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "elektrolyt",
    "text": "Begleitzeichen im Vorhofstillstand-Fall: fehlende P-Wellen, ueberhoehte T-Wellen und ST-Strecken-Hebung. Als Ursachen werden Digitalisintoxikation, Hyperkaliaemie (Addison-Krankheit, Harnwegsobstruktion) und die hereditaere Muskeldystrophie des Englischen Springer Spaniels mit Fibrose der Vorhofmyozyten genannt.",
    "zahlen": "Fall 37: ST-Hebung 0,2 mV; T > 25 % der R-Hoehe",
    "seite": "PDF-S. 20 (Buchseite 208), Fall 37",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "elektrolyt",
    "text": "Notfallmassnahmen bei Hyperkaliaemie je nach Kaliumspiegel: Fluessigkeitstherapie mit 0,9%iger Kochsalzloesung, Glukokortikoide, Furosemid, Insulin und Dextrose; zusaetzlich Behandlung der Primaerursache (hormonelle Supplementierung mit Gluko- und Mineralokortikoiden, Beheben der Harnwegsobstruktion).",
    "zahlen": "0,9 % NaCl",
    "seite": "PDF-S. 20 (Buchseite 208), Fall 37",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "elektrolyt",
    "text": "Erste Krankheitsgruppe hinter der Kombination aus erhoehter T-Welle und ST-Senkung: Stoerungen des Elektrolyt- und Saeure-Basen-Haushalts, vor allem ein gestoerter Kalzium- und Kaliumhaushalt und dabei insbesondere die Hyperkaliaemie, wie sie haeufig bei Addison-Krankheit oder Niereninsuffizienz vorkommt.",
    "zahlen": "",
    "seite": "PDF 45 (Buch 134)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "elektrolyt",
    "text": "Ein infektioeser Prozess (hier Pyometra) verursacht Stoffwechsel- und Elektrolytveraenderungen, die allein die ST- und T-Auffaelligkeiten erklaeren koennen; vor einer Operation sind Blutbild samt Ionogramm, Fluessigkeitstherapie und Sauerstofftherapie angezeigt.",
    "zahlen": "",
    "seite": "PDF 30 (Buch 218)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "elektrolyt",
    "text": "Bei Hyperkaliaemie liegt das Ruhepotenzial der Zellmembranen der Vorhofmuskulatur so niedrig, dass eine Depolarisation unmoeglich wird - daraus folgt der Vorhofstillstand. Typische Ursachen erhoehter Kaliumspiegel sind Hypoadrenokortizismus (Addison) und Harnwegsobstruktion.",
    "zahlen": "",
    "seite": "PDF 40 (Buch 228)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "elektrolyt",
    "text": "Vorkommen der Asystolie: schwere kardiovaskulaere Erkrankungen, hochgradige Azidose bei Diabetes mellitus, schwere Hyperkaliaemie z. B. bei Harnwegsobstruktion; ein Reanimationsversuch ist meist zwecklos.",
    "zahlen": "",
    "seite": "PDF 53 = Buch 53",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "elektrolyt",
    "text": "Breite und niedrige P-Wellen bzw. kleine P-Amplituden sind ein Zeichen der Hyperkaliaemie; hochgradige Hyperkaliaemie fuehrt zum voelligen Fehlen der P-Wellen (Vorhofstillstand).",
    "zahlen": "",
    "seite": "26",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "elektrolyt",
    "text": "Ursachen pathologischer T-Wellen: akuter Sauerstoffmangel (Narkose), Ischaemie, akute Mitralinsuffizienz, Digitalisintoxikation, Hyper- und Hypokaliaemie, Hypokalzaemie. Therapie: Sauerstoffzufuhr und Behandlung der Grundkrankheit.",
    "zahlen": "",
    "seite": "38",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "elektrolyt",
    "text": "Als Beispiel fuer eine gezielte kardiologische Laborfrage nennt das Buch ausdruecklich den Einfluss der Elektrolytspiegel auf das EKG sowie den Einfluss des Schilddruesenwerts T4 auf Myokardkinetik und Herzfrequenz.",
    "zahlen": "",
    "seite": "PDF 121 = Buchseite 121",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "elektrolyt",
    "text": "Kalium soll bei Herzrhythmusstoerungen und bei laengerfristiger Diurese bestimmt werden, besonders bei Kombination von ACE-Hemmern mit kaliumsparenden Diuretika sowie bei Kaliumbromidtherapie. Boswood (2007) fand bei Hunden unter kaliumsparender Diurese jedoch keine erhoehten Kaliumspiegel.",
    "zahlen": "",
    "seite": "PDF 122 = Buchseite 122",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "elektrolyt",
    "text": "Magnesium soll bei Herzrhythmusstoerungen und bei Dilatativer Kardiomyopathie gemessen werden; eine Hypomagnesaemie zieht eine Hypokalzaemie nach sich.",
    "zahlen": "",
    "seite": "PDF 122 = Buchseite 122",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "elektrolyt",
    "text": "Sinuventrikulaerer Rhythmus bei Hyperkaliaemie: das Vorhofmyokard wird nicht mehr erregt, der Vorhof steht still und die P-Welle fehlt. Die im Sinusknoten erzeugte Erregung wird ueber die internodalen Bahnen auf den AV-Knoten uebergeleitet und loest eine Ventrikelkontraktion aus. Die Herzfrequenz ist meist niedrig, die QRS-Komplexe sind normal geformt.",
    "zahlen": "Pruefbedingung: keine P-Welle + normal geformter QRS + niedrige HF",
    "seite": "PDF 18 (Buch 156)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "elektrolyt",
    "text": "Eine Erhoehung der T-Wellenamplitude im Rahmen der Hyperkaliaemie ist eine der haeufigsten Veraenderungen, die bei Elektrolytstoerungen zu sehen sind.",
    "zahlen": "",
    "seite": "PDF 40 (Buch 178)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "elektrolyt",
    "text": "Tab. 10.9, Zeile 'T-Welle zu hoch': moegliche Befunde myokardiale Hypoxie, intramurale Leitungsstoerungen, Kammervergroesserung und Hyperkaliaemie (z. B. Morbus Addison).",
    "zahlen": "",
    "seite": "PDF 40 (Buch 178)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "elektrolyt",
    "text": "Tab. 10.9, Zeile 'T-Welle zu klein bzw. biphasisch': moeglicher Befund Hypokaliaemie.",
    "zahlen": "",
    "seite": "PDF 40 (Buch 178)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "elektrolyt",
    "text": "Tab. 10.9, Zeile 'alternierend' (T-Wellen-Alternans): moegliche Befunde Hypokalzaemie und erhoehter Sympathikotonus.",
    "zahlen": "",
    "seite": "PDF 40 (Buch 178)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "elektrolyt",
    "text": "Abb. 10.54: Ueberhoehte T-Wellen deuten auf Sauerstoffmangel hin, schlanke und spitze T-Wellen auf Hyperkaliaemie - die Form ist also neben der Hoehe ein eigenes Kriterium.",
    "zahlen": "",
    "seite": "PDF 40 (Buch 178)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "elektrolyt",
    "text": "Sinuventrikulaerer Rhythmus: Durch Hyperkaliaemie wird das Vorhofmyokard nicht mehr erregt. Die im Sinusknoten erzeugte Erregung wird dennoch ueber die internodalen Bahnen auf den AV-Knoten uebergeleitet und loest eine Ventrikelkontraktion aus. Der Vorhof steht still, daher fehlt die P-Welle. Die Herzfrequenz ist meist niedrig, die QRS-Komplexe sind normal geformt.",
    "zahlen": "P fehlt; QRS normal geformt; HF meist niedrig",
    "seite": "PDF 18 / Buch 156",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "elektrolyt",
    "text": "Tab. 10.8: Eine ST-Strecken-Senkung (groesser 0,2 mV in den Ableitungen II, III und aVF) kommt bei myokardialer Hypoxie, Digitalisintoxikation sowie Hyper- und Hypokaliaemie vor.",
    "zahlen": "Senkung > 0,2 mV in II, III, aVF",
    "seite": "PDF 39 / Buch 177",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "elektrolyt",
    "text": "Tab. 10.9: Eine zu hohe T-Welle kommt vor bei myokardialer Hypoxie, intramuralen Leitungsstoerungen, Kammervergroesserung und Hyperkaliaemie (z. B. Morbus Addison). Eine Erhoehung der T-Wellenamplitude im Rahmen der Hyperkaliaemie ist eine der haeufigsten Veraenderungen bei Elektrolytstoerungen.",
    "zahlen": "",
    "seite": "PDF 40 / Buch 178",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "elektrolyt",
    "text": "Tab. 10.9: Eine zu kleine bzw. biphasische T-Welle deutet auf Hypokaliaemie; eine alternierende T-Welle auf Hypokalzaemie oder erhoehten Sympathikotonus.",
    "zahlen": "",
    "seite": "PDF 40 / Buch 178",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "medikament",
    "text": "Als weitere Ursachen von Bradykardien mit Blockierungen der Erregungsleitung nennt das Buch: Hypothyreose, Intoxikationen sowie Nebenwirkungen von Antiarrhythmika und Anaesthetika. Fuer eine Praxis-Software ist das die Bruecke zwischen EKG-Befund und laufender Narkose bzw. Medikation.",
    "zahlen": "",
    "seite": "PDF 42 (Buch 29)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Intoxikationen durch Digitalispraeparate oder bestimmte Antiarrhythmika (Quinidin, Procainamid) koennen ebenfalls T-Wellen-Veraenderungen ausloesen. Auch Atemwegserkrankungen und Erkrankungen des autonomen Nervensystems kommen als Ursache in Frage.",
    "zahlen": "",
    "seite": "PDF 1 (gedruckt 90)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Antiarrhythmische Therapie der supraventrikulaeren Tachykardie: Digitalispraeparate (Herzglykoside), Beta-Blocker (Atenolol, Sotalol, Propranolol, Metoprolol) oder Kalziumkanalblocker (Diltiazem). Im Notfall intravenoese Digitalisierung oder Edrophoniumchlorid wegen seiner vagalen Effekte.",
    "zahlen": "",
    "seite": "PDF 7 (gedruckt 96)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Anaesthesie bei chronischer Klappenendokardiose - fuenf Regeln des Buches: Alpha-2-Rezeptoragonisten (Medetomidin, Xylazin) und Phenothiazinderivate (Acepromazin) in hoher Dosierung vermeiden, da sie Blutdruck und Herzerregbarkeit senken; Isofluran ist zur Aufrechterhaltung besser geeignet als Halothan; vor der Einleitung reinen Sauerstoff geben; rasche Einleitung, freie Atemwege bzw. kuenstliche Beatmung und engmaschige Beobachtung nach dem Extubieren; von Atropin wird generell abgeraten, weil es Herzfrequenz und Sauerstoffverbrauch des Myokards betraechtlich erhoeht.",
    "zahlen": "",
    "seite": "PDF 13 (gedruckt 102)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Sinusbradykardie und AV-Block I koennen direkte Folge von Medetomidin sein. Der Mechanismus: Reduktion der Sympathikusaktivitaet und Steigerung des parasympathischen Tonus auf zentralem Niveau, was zunaechst eine Hypertonie mit daraus folgender Frequenzsenkung und danach eine laengere Phase ausgepraegter Hypotonie bewirkt.",
    "zahlen": "",
    "seite": "PDF 21 (gedruckt 110)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Bradyarrhythmien nach Medetomidin und anderen alpha-2-adrenergen Praeparaten (Xylazin) stellen bei gesundem, klinisch stabilem Tier in der Regel keine ernsthafte hämodynamische Gefahr dar; bei geriatrischen und herzkranken Tieren ist Vorsicht geboten. Eine antiarrhythmische Behandlung ist nicht erforderlich; bei Narkoseproblemen wie schwerer Apnoe wird die Wirkung mit Atipamezol antagonisiert.",
    "zahlen": "",
    "seite": "PDF 21 (gedruckt 110)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Bei supraventrikulaerem Bigeminus infolge Vorhoferweiterung wird neben der Herzinsuffizienztherapie (Diuretika, Vasodilatatoren, Inotropika) antiarrhythmisch behandelt mit Digitalispraeparaten (Digoxin), Betablockern (Sotalol, Atenolol, Propranolol) oder Kalziumkanalblockern (Diltiazem).",
    "zahlen": "",
    "seite": "PDF-S. 2 (Buchseite 190), Fall 28",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Bei hochgradigem Lungenoedem: Sauerstofftherapie, parenteral hochdosiertes Diuretikum (Furosemid), dazu Dobutamin und Venodilatatoren (Nitroprussid); nach Stabilisierung ambulant orale Medikation plus ggf. Pimobendan.",
    "zahlen": "",
    "seite": "PDF-S. 4 (Buchseite 192), Fall 29",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Anaesthesie bei Patienten mit VES: nicht arrhythmogene Narkotika verwenden, das heisst Verzicht auf zentrale alpha-Agonisten (Medetomidin, Detomidin, Xylazin), Pentothal und Halothan; stattdessen Diazepam, Propofol und Isofluran bzw. Sevofluran. Fuer den Fall zunehmender Extrasystolie muss Lidocain ohne Epinephrin zur intravenoesen Gabe bereitliegen.",
    "zahlen": "",
    "seite": "PDF-S. 10 (Buchseite 198), Fall 32",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Digoxin ist das Antiarrhythmikum der Wahl bei supraventrikulaeren Tachyarrhythmien. Dosis Hund: 0,22 mg/m2 Koerperoberflaeche alle 12 h p.o.; bei Digoxin-Elixier wird die Dosis um 10 % reduziert.",
    "zahlen": "Hund 0,22 mg/m2 KOF alle 12 h p.o.; Elixier -10 %",
    "seite": "PDF-S. 12 (Buchseite 200), Fall 33",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Digoxin-Dosierung Katze nach Gewichtsklassen: 2-3 kg 0,0312 mg alle 48 h p.o.; 4-5 kg 0,0312 mg alle 24 h p.o.; ueber 6 kg 0,0312 mg alle 12 h p.o.",
    "zahlen": "2-3 kg: 0,0312 mg/48h; 4-5 kg: 0,0312 mg/24h; >6 kg: 0,0312 mg/12h",
    "seite": "PDF-S. 12 (Buchseite 200), Fall 33",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Der therapeutische Serumdigoxinspiegel liegt bei 1-2 ng/ml und muss regelmaessig kontrolliert werden.",
    "zahlen": "1-2 ng/ml",
    "seite": "PDF-S. 12 (Buchseite 200) und PDF-S. 16 (Buchseite 204)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Grundtherapie der fortgeschrittenen chronischen Klappenendokardiose: Benazepril 0,5 mg/kg SID, Spironolacton 1 mg/kg BID, potente Diuretika (Furosemid, Bumetanid, Torasemid) mit Dosierung nach dem roentgenologisch bestimmten Grad des Lungenoedems; ergaenzend Pimobendan 0,5 mg/kg aufgeteilt auf zwei Gaben BID. Digoxin kommt in der Regel erst bei Auftreten supraventrikulaerer Tachyarrhythmien dazu.",
    "zahlen": "Benazepril 0,5 mg/kg SID; Spironolacton 1 mg/kg BID; Pimobendan 0,5 mg/kg auf 2 Gaben BID",
    "seite": "PDF-S. 14 (Buchseite 202), Fall 34",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Behandlungsziel supraventrikulaerer Arrhythmien ist die Senkung der erhoehten ventrikulaeren Frequenz. Mittel der Wahl ist Digoxin unter engem Spiegelmonitoring; bei unzureichender Kontrolle trotz therapeutischer Spiegel wird zusaetzlich ein Betablocker (Atenolol, Propranolol) gegeben. Ueberdosierung von Digoxin fuehrt zu gastrointestinalen Stoerungen und proarrhythmischen Effekten.",
    "zahlen": "",
    "seite": "PDF-S. 16 (Buchseite 204), Fall 35",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Antiarrhythmische Optionen bei ventrikulaerer Extrasystolie des Boxers: Sotalol (Betablocker) als beste Option, Mexiletin (Klasse I B, Dosierung durch humanmedizinische Handelsformen schwierig, kein belegter Vorteil) und oral verabreichtes Procainamid (Klasse I A).",
    "zahlen": "",
    "seite": "PDF-S. 18 (Buchseite 206), Fall 36",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Die AV-Tachykardie ist sehr selten, steht meist mit Primaererkrankungen des Herzens in Zusammenhang und kann auch bei Digitalisintoxikation auftreten. Therapeutisch wird zunaechst ein Vagusmanoever mittels Bulbusdruck versucht; Antiarrhythmika der Wahl sind Digitalispraeparate, zweite Option sind Betablocker (Propranolol, Atenolol).",
    "zahlen": "",
    "seite": "PDF-S. 22 (Buchseite 210), Fall 38",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Initialdosis von Furosemid beim Hund mit Hinweisen auf ein Lungenoedem, danach absteigend bis zur kleinsten noch wirksamen Dosis. Bei Verdauungsstoerungen oder Anorexie in den ersten 24 bis 48 Stunden kann Furosemid auch intravenoes oder subkutan gegeben werden.",
    "zahlen": "Furosemid 2 mg/kg alle 8 h p.o.",
    "seite": "PDF 39 (Buch 128)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Venenerweiterndes Mittel zur Therapie des Lungenoedems zusaetzlich zur laufenden Behandlung.",
    "zahlen": "Isosorbiddinitrat 1 mg/kg p.o. alle 8 h",
    "seite": "PDF 33 (Buch 122)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Empfohlene Reihenfolge: zuerst Pimobendan zur Besserung des Herzminutenvolumens beginnen; reicht das nicht aus, nach vier bis fuenf Tagen zusaetzlich Isosorbiddinitrat geben.",
    "zahlen": "Pimobendan zuerst, Isosorbiddinitrat nach 4-5 Tagen",
    "seite": "PDF 33 (Buch 122)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Bei Hunden mit mittel- bis hochgradiger Aortenstenose und Symptomen niedrigen Herzminutenvolumens wie Synkopen, oder mit ventrikulaeren Tachyarrhythmien, wird in der Regel eine Therapie mit Betablockern eingeleitet.",
    "zahlen": "Betablocker: Sotalol, Atenolol",
    "seite": "PDF 41 (Buch 130)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Kontrollintervalle nach Therapieanpassung bei kongestiver Herzinsuffizienz: anfangs alle 24 bis 48 Stunden, nach Stabilisierung woechentlich bis zur niedrigsten wirksamen Furosemiddosis, danach alle sechs bis acht Wochen.",
    "zahlen": "24-48 h, dann woechentlich, dann alle 6-8 Wochen",
    "seite": "PDF 39 (Buch 128)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Bei therapiepflichtigen VES bzw. ventrikulaerer Tachykardie sind Lidocain und Procainamid die Antiarrhythmika der Wahl; zweite Option sind Betablocker (Atenolol, Propranolol), dritte Wahl Kalziumkanalblocker (Diltiazem) und Amiodaron.",
    "zahlen": "",
    "seite": "PDF 24 (Buch 212)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Zur Normalisierung der Kammerfrequenz bei supraventrikulaerer Tachykardie werden Digitalispraeparate (Digoxin), Betablocker (Atenolol, Propranolol) oder Kalziumkanalblocker (Diltiazem) genannt.",
    "zahlen": "",
    "seite": "PDF 26 (Buch 214)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Viele Anaesthetika, insbesondere Barbiturate, koennen ventrikulaere Arrhythmien sogar bei gesunden Patienten foerdern; besonders die Kombination von Thiopental mit Halothan verursacht ueber eine Sensibilisierung des Myokards gegenueber endogenen Katecholaminen ventrikulaere Extrasystolen.",
    "zahlen": "",
    "seite": "PDF 34 (Buch 222)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "War vor der Anaesthesie keinerlei Erkrankung erkennbar, ist bei perianaesthetischen VES in der Regel keine antiarrhythmische Behandlung erforderlich; empfohlen werden ausreichende Sauerstoffversorgung waehrend des gesamten Eingriffs und Blutdruckkontrolle. Faellt doch die Entscheidung fuer Antiarrhythmika, sind Lidocain, Procainamid oder Betablocker (Propranolol) die Mittel der Wahl.",
    "zahlen": "",
    "seite": "PDF 34 (Buch 222)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Zur Behandlung supraventrikulaerer Tachyarrhythmien wird Digoxin verwendet: es normalisiert die erhoehte ventrikulaere Frequenz, optimiert das Herzminutenvolumen und senkt Ueberlastung und Sauerstoffverbrauch des Myokards.",
    "zahlen": "",
    "seite": "PDF 36 (Buch 224)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Das Auftreten einer Vorhoftachykardie bei einem herzkranken Patienten gilt als Hinweis auf Dekompensation und erfordert in der Regel eine sofortige antiarrhythmische Therapie; Mittel der Wahl bei Vorhofarrhythmien ist Digoxin.",
    "zahlen": "",
    "seite": "PDF 42 (Buch 230)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Notfallschema beim akuten Lungenoedem: Sauerstofftherapie, Sedierung mit Diazepam und Morphin, Buprenorphin oder Butorphanol, maximale Bewegungsrestriktion, natriumfreie Infusion (Dextrose 5 %), Furosemid 4 mg/kg i.v. alle 2 h bis zur Besserung; ergaenzend Dopamin oder Dobutamin per Dauertropfinfusion 5 mg/kg/min sowie unter Blutdruckueberwachung Nitroprussid-Natrium 5 mg/kg/min. Die Dauertropf-Einheiten sind so gedruckt.",
    "zahlen": "Furosemid 4 mg/kg i.v. alle 2 h; Dextrose 5 %; Dopamin 5 mg/kg/min; Dobutamin 5 mg/kg/min; Nitroprussid-Natrium 5 mg/kg/min",
    "seite": "PDF 44 (Buch 232)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Handelt es sich nicht um einen Notfall, kann eine ambulante antiarrhythmische Behandlung mit oralem Procainamid oder Sotalol erfolgen - bei vorsichtiger, sicherer Dosierung.",
    "zahlen": "",
    "seite": "PDF 46 (Buch 234)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "medikament",
    "text": "Medikamentoese Ausloeser von VES laut Steckbrief: Anaesthetika, Ephedrin, Digitalis und Antiarrhythmika selbst.",
    "zahlen": "",
    "seite": "PDF 49 = Buch 49",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "medikament",
    "text": "Therapie der VES: primaer Behandlung der Grunderkrankung, dann Lidocain, Beta-Rezeptorblocker und andere Antiarrhythmika, unter Umstaenden Elektrolytsubstitution bzw. Ausgleich des Saeure-Basen-Haushalts.",
    "zahlen": "",
    "seite": "PDF 49 = Buch 49",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "medikament",
    "text": "Therapie der VT: umgehender Therapiebeginn, Lidocain, Propranolol, Digitalis i. v., Behandlung der Stauungsinsuffizienz bzw. Grundkrankheit, ggf. Elektrolyt- und Saeure-Basen-Ausgleich.",
    "zahlen": "",
    "seite": "PDF 51 = Buch 51",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "medikament",
    "text": "Kammerflattern/-flimmern ist eine Reanimationssituation: praekordialer Faustschlag, Defibrillation mit vorangehender intrakardialer Epinephrininjektion bzw. mit vorangehender Lidocain- und Natriumbikarbonatinjektion, Lidocain/Propranolol/Digitalis i. v.",
    "zahlen": "",
    "seite": "PDF 52 = Buch 52",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "medikament",
    "text": "Beispiel AV-Tachykardie: Hund mit Digitalisintoxikation, beschleunigter AV-Rhythmus, HF 80/min, P-Wellen durch normal geformte QRS-Komplexe ueberlagert und daher nicht sichtbar; 25 mm/s, 1 cm = 1 mV. Digitalisintoxikation ist auch als Ursache genannt.",
    "zahlen": "HF 80/min",
    "seite": "46",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "medikament",
    "text": "Die bei Katzen vorkommende Hyperthyreose wirkt herzfrequenzsteigernd und pro-arrhythmogen; Hypothyreosen koennen die Myokardkinetik negativ beeinflussen. Beide Schilddruesenstoerungen haben kardiale Auswirkungen.",
    "zahlen": "",
    "seite": "PDF 122 = Buchseite 122",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "medikament",
    "text": "Amlodipin ist bei Hund und Katze mit eindeutigem Bluthochdruck Medikament der Wahl, Dosierung 0,625-1,25 mg pro Tier alle 24 Stunden. Der Blutdruckabfall setzt meist innerhalb von 12 bis 36 Stunden ein; bei Katzen sollten Werte zwischen 160 und 170 mmHg spaetestens eine Woche nach Therapiebeginn erreicht sein.",
    "zahlen": "Amlodipin 0,625-1,25 mg/Tier alle 24 h; Wirkung nach 12-36 h; Zielwert Katze 160-170 mmHg innerhalb 1 Woche",
    "seite": "PDF 118 = Buchseite 118",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "medikament",
    "text": "Therapieueberwachung der Hypertonie: therapeutisches Ziel bei Katzen ist ein systolischer Wert unter 170 mmHg. Bei stabilem Blutdruck sind Kontrollen alle acht bis zwoelf Wochen ratsam, stets mit derselben Messmethode; bei Grenzwerthypertonie Kontrolle nach ein bis acht Wochen; bleibt zwei bis zehn Tage nach Therapiebeginn der Abfall aus, ist an mangelnde Compliance zu denken.",
    "zahlen": "Ziel Katze < 170 mmHg; Kontrollen alle 8-12 Wochen; Grenzwert-Kontrolle nach 1-8 Wochen; Bewertung nach 2-10 Tagen",
    "seite": "PDF 118-119 = Buchseite 118-119",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "medikament",
    "text": "Diltiazem kann bei Katzen mit Hypertonie und ausgepraegter konzentrischer linksventrikulaerer Hypertrophie bzw. Obstruktiver Kardiomyopathie eingesetzt werden und senkt Kontraktilitaet, Herzfrequenz und arteriellen Druck gleichermassen; bei arterieller Hypertonie mit schwerer kongestiver Herzinsuffizienz ist es kontraindiziert. Beta-Rezeptorblocker (z. B. Propranolol) senken den Blutdruck nur maessig, sind aber bei Hypertropher Kardiomyopathie mit ventrikulaeren Arrhythmien sinnvoll.",
    "zahlen": "",
    "seite": "PDF 119 = Buchseite 119",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "medikament",
    "text": "Antiarrhythmika werden nach ihren elektrophysiologischen Eigenschaften traditionell in fuenf Klassen nach Vaughan Williams eingeteilt. Die Einteilung ist stark vereinfachend, da mehrere Wirkstoffe Eigenschaften mehrerer Klassen zeigen.",
    "zahlen": "5 Klassen (I-V, Klasse I unterteilt in Ia, Ib, Ic)",
    "seite": "PDF-Seite 1-2, Tab. 19.1 (Buchseiten 429-430)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Klasse Ia (Natriumkanalblocker) verlangsamt die Depolarisation und verlaengert die Repolarisationsdauer, damit das Aktionspotenzial. Vertreter: Procainamid.",
    "zahlen": "",
    "seite": "PDF-Seite 2, Tab. 19.1 (Buchseite 430)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Klasse Ib verkuerzt das Aktionspotenzial. Vertreter: Lidocain, Mexiletin.",
    "zahlen": "",
    "seite": "PDF-Seite 2, Tab. 19.1 (Buchseite 430)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Klasse Ic verlangsamt die Depolarisation, ohne die Dauer des Aktionspotenzials zu veraendern. Vertreter: Flecainid, Propafenon.",
    "zahlen": "",
    "seite": "PDF-Seite 2, Tab. 19.1 (Buchseite 430)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Klasse II (Betablocker) verlangsamt die AV-Ueberleitung und die Sinusfrequenz und verringert die myokardiale Erregbarkeit. Vertreter: Atenolol, Metoprolol, Propranolol, Esmolol.",
    "zahlen": "",
    "seite": "PDF-Seite 2, Tab. 19.1 (Buchseite 430)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Klasse III (Kaliumkanalblocker) verlaengert Repolarisation und Aktionspotenzial und hat zusaetzlich betablockierende Eigenschaften. Vertreter: Sotalol, Amiodaron.",
    "zahlen": "",
    "seite": "PDF-Seite 2, Tab. 19.1 (Buchseite 430)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Klasse IV (Kalziumkanalblocker) reduziert die Herzfrequenz und verzoegert die Ueberleitung. Vertreter: Diltiazem, Verapamil. Klasse V fasst weitere Mechanismen zusammen, Vertreter Digoxin.",
    "zahlen": "",
    "seite": "PDF-Seite 2, Tab. 19.1 (Buchseite 430)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Procainamid ist ein Antiarrhythmikum der Klasse Ia mit stark schwankender Bioverfuegbarkeit und kurzer Halbwertszeit beim Hund. Indiziert bei supraventrikulaeren und ventrikulaeren (Tachy-)Arrhythmien.",
    "zahlen": "Halbwertszeit Hund 2-3 h",
    "seite": "PDF-Seite 2 (Buchseite 430)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Kontraindikationen von Procainamid: bradykarde Rhythmusstoerungen und Torsades de Pointes; nicht bei digitalisinduzierten Rhythmusstoerungen; nur mit Vorsicht bei schwerer Leber- oder Niereninsuffizienz und bei Patienten im kongestiven Herzversagen.",
    "zahlen": "",
    "seite": "PDF-Seite 2 (Buchseite 430)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Dosierung von Procainamid beim Hund fuer akutes Management supraventrikulaerer und ventrikulaerer Tachykardie sowie fuer die chronische Behandlung. Bei der Katze setzen die Autoren Procainamid nicht ein. Gabe auf nuechternen Magen 0,5 h vor der Fuetterung, gleichmaessige Dosierungsintervalle.",
    "zahlen": "Hund akut 6-8 mg/kg KGW ueber 3 min langsam i.v.; chronisch supraventrikulaer 10-20 (-40) mg/kg 3x taeglich; chronisch ventrikulaer 20 mg/kg 3x taeglich; Katze: nicht eingesetzt",
    "seite": "PDF-Seite 2 (Buchseite 430)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Lidocain ist ein Antiarrhythmikum der Klasse Ib, verringert die Membranerregbarkeit und wirkt zusaetzlich als Radikalfaenger. Die Halbwertszeit beim Hund ist sehr kurz. Hauptindikation sind ventrikulaere Tachyarrhythmien, supraventrikulaere Tachyarrhythmien nur nachrangig (im Buch in Klammern).",
    "zahlen": "Halbwertszeit Hund 0,9 h",
    "seite": "PDF-Seite 3 (Buchseite 431)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Kontraindikationen von Lidocain: Bradyarrhythmien; bei der Katze nur nach strenger Indikationsstellung wegen starker neurologischer Nebenwirkungen und moeglicher systolischer Dysfunktion; Vorsicht bei Leberfunktionsstoerung und kongestivem Herzversagen.",
    "zahlen": "",
    "seite": "PDF-Seite 3 (Buchseite 431)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Nebenwirkungen von Lidocain sind beim Hund meist mild und dosisabhaengig. Bei zu schneller Bolusgabe treten ZNS-Symptome auf (Tremor, Ataxie, Kraempfe, Schwindel), ausserdem Magen-Darm-Symptome, Hypotension und selten eine proarrhythmische Wirkung.",
    "zahlen": "",
    "seite": "PDF-Seite 3 (Buchseite 431)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Lidocain-Dosierschema Hund: initialer langsamer i.v.-Bolus, bei ausbleibendem Effekt innerhalb von 10 Minuten bis zu dreimal wiederholen, danach Dauertropfinfusion.",
    "zahlen": "Hund: Bolus 2 mg/kg KGW langsam i.v., bis zu 3x wiederholen innerhalb 10 min; danach DTI 25-80 ug/kg KGW/min",
    "seite": "PDF-Seite 3 (Buchseite 431)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Lidocain-Dosierschema Katze: deutlich niedrigerer Bolus, Wiederholung alle 5 Minuten bis zu einer kumulativen Hoechstdosis. Monitoring: Toxizitaetszeichen, EKG, evtl. Blutdruck.",
    "zahlen": "Katze: initialer Bolus 0,25-0,5 mg/kg KGW langsam i.v.; Wiederholung alle 5 min bis kumulativ 1,5 mg/kg KGW",
    "seite": "PDF-Seite 3 (Buchseite 431)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Flecainid ist ein Antiarrhythmikum der Klasse Ic, das Erregungsausbreitung und Ueberleitungszeit verlaengert. Es hat an Bedeutung gewonnen, weil Mexiletin am europaeischen Markt nicht mehr verfuegbar ist, wirkt gut gegen ventrikulaere Tachyarrhythmien des Hundes ohne nennenswerten negativ inotropen Effekt und ist i.v. und oral erhaeltlich.",
    "zahlen": "",
    "seite": "PDF-Seite 3 (Buchseite 431)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Flecainid wird nur beim Hund eingesetzt, bei supraventrikulaeren Arrhythmien und ventrikulaeren Tachyarrhythmien. Im kongestiven Herzversagen nur mit Vorsicht. Beschrieben ist eine ausgepraegte proarrhythmische Wirkung, die in der Praxis kaum beobachtet wird; gastrointestinale Nebenwirkungen moeglich. Monitoring: EKG.",
    "zahlen": "Bolus 1-5 mg/kg KGW i.v.; oral 2-5 (-8) mg/kg KGW 2-3x taeglich",
    "seite": "PDF-Seite 3 (Buchseite 431)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Propafenon ist ein Antiarrhythmikum der Klasse Ic, verlaengert die Erregungsausbreitung in Vorhof und Ventrikel und verzoegert die Ueberleitungszeit. Es wird nur beim Hund eingesetzt, bei supraventrikulaeren und ventrikulaeren Tachyarrhythmien.",
    "zahlen": "",
    "seite": "PDF-Seite 3-4 (Buchseiten 431-432)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Propafenon: im kongestiven Herzversagen nur mit Vorsicht und bei strenger Indikationsstellung. Nebenwirkungen sind ZNS-Symptome, vor allem Konvulsionen bei zu rascher Bolusgabe, ausserdem Hypotension, Muedigkeit, Erbrechen und Inappetenz. Monitoring: EKG und Blutdruck.",
    "zahlen": "",
    "seite": "PDF-Seite 4 (Buchseite 432)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Dosierung von Propafenon: bei akuten tachykarden Rhythmusstoerungen langsamer i.v.-Bolus mit anschliessender Erhaltungsinfusion ueber 24 h, fuer die chronische haeusliche Therapie orale Gabe.",
    "zahlen": "akut: Bolus 1 mg/kg KGW langsam i.v., danach 8 ug/kg KGW/min ueber 24 h; chronisch 3-4 mg/kg KGW 2-3x taeglich",
    "seite": "PDF-Seite 4 (Buchseite 432)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Gemeinsame Wirkung der Betablocker (Klasse II): Verringerung der Sinusknotenfrequenz, verlangsamte AV-Ueberleitung, Verringerung von Cardiac Output und myokardialem Sauerstoffverbrauch. Der negative Effekt auf die myokardiale Relaxation wird durch die Verlaengerung der relativen Diastolendauer ausgeglichen. Metoprolol, Esmolol und Atenolol sind beta1-selektiv.",
    "zahlen": "",
    "seite": "PDF-Seite 4 (Buchseite 432)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Esmolol ist ein beta1-selektiver Betablocker zur i.v.-Gabe mit sehr kurzer Halbwertszeit; nach Beendigung einer Dauertropfinfusion endet die Wirkung rasch. Indiziert als DTI zur kurzzeitigen Therapie supraventrikulaerer Tachyarrhythmien und als Test, ob eine Betablocker-Therapie den gewuenschten antiarrhythmischen Effekt hat.",
    "zahlen": "Halbwertszeit 10 min; Wirkungsende 10-20 min nach DTI-Stopp",
    "seite": "PDF-Seite 4 (Buchseite 432)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Kontraindikationen von Esmolol: Myokardversagen, AV-Block Grad II oder III, Sinusbradykardie, kardiogener Schock; bei kongestivem Herzversagen, Bronchokonstriktion oder Diabetes mellitus nur nach Nutzen-Risiko-Abwaegung und unter strenger Ueberwachung.",
    "zahlen": "AV-Block Grad II oder III",
    "seite": "PDF-Seite 4 (Buchseite 432)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Nebenwirkungen von Esmolol: Bradykardie und bradykarde Rhythmusstoerungen, Lethargie, Verschlechterung eines kongestiven Herzversagens, Hypotension, Bronchokonstriktion, Hypoglykaemie, Synkope. Monitoring: Blutdruck, EKG, Herzfrequenz.",
    "zahlen": "",
    "seite": "PDF-Seite 4-5 (Buchseiten 432-433)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Esmolol-Dosierung Hund und Katze: Ladedosis ueber eine Minute, danach Dauertropfinfusion. Beim Hund alternativ steigende Einzeldosen bis zu einer Hoechstdosis. Laesst sich die Arrhythmie nicht konvertieren, sind Kalziumkanalblocker (Diltiazem, Verapamil) 30 Minuten nach Esmololgabe eine Option.",
    "zahlen": "Ladedosis 200-500 ug/kg KGW ueber 1 min i.v., danach 25-200 ug/kg KGW/min (Hund und Katze); Hund alternativ 0,05-0,1 mg/kg alle 5 min langsam i.v. bis max. 0,5 mg/kg i.v.; Kalziumkanalblocker fruehestens 30 min danach",
    "seite": "PDF-Seite 4 (Buchseite 432)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Wechselwirkungen von Esmolol: kann den Digitalisspiegel erhoehen, deshalb bei digitalisierten Patienten aeusserste Vorsicht; gleichzeitige Gabe von Morphin kann die Esmolol-Serumkonzentration erhoehen, daher vorsichtig titrieren.",
    "zahlen": "",
    "seite": "PDF-Seite 5 (Buchseite 433)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Atenolol ist ein beta1-spezifischer Betablocker, der in hoeherer Dosierung zusaetzlich beta2-blockierend wirkt und dann den Blutdruck senkt. Es soll moeglichst nicht abrupt abgesetzt und immer eingeschlichen werden.",
    "zahlen": "Halbwertszeit Hund 3,2 h, Katze 3,7 h; Dauer der Betablockade bei Katzen bis zu 12 h",
    "seite": "PDF-Seite 5 (Buchseite 433)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Indikationen von Atenolol: supraventrikulaere Tachyarrhythmien, ventrikulaere Arrhythmien (Extrasystolie), HCM der Katze, hochgradige Aorten- und Pulmonalstenose sowie die kardiovaskulaeren Auswirkungen der Hyperthyreose bei der Katze.",
    "zahlen": "",
    "seite": "PDF-Seite 5 (Buchseite 433)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Kontraindikationen von Atenolol: Myokardversagen, AV-Block Grad II oder III, Sinusbradykardie; bei bronchokonstriktiver Erkrankung, Diabetes mellitus oder Niereninsuffizienz nur nach strenger Indikationsstellung.",
    "zahlen": "AV-Block Grad II oder III",
    "seite": "PDF-Seite 5 (Buchseite 433)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Atenolol-Dosierung fuer Hund und Katze; die Katzendosis ist eine Dosis je Tier, nicht je Kilogramm. Monitoring: Herzfunktion, Blutdruck, EKG.",
    "zahlen": "Hund 0,25-1,5 mg/kg KGW 2x taeglich; Katze 6,25-12,5 mg/Katze 1-2x taeglich",
    "seite": "PDF-Seite 5 (Buchseite 433)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Nebenwirkungen von Atenolol: Bradykardie und bradykarde Rhythmusstoerungen, Lethargie, Verschlechterung eines kongestiven Herzversagens, Hypotension, Bronchokonstriktion, Hypoglykaemie, Synkope, Diarrhoe sowie Juckreiz bei der Katze.",
    "zahlen": "",
    "seite": "PDF-Seite 5 (Buchseite 433)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Wechselwirkungen von Atenolol: verhindert die Wirksamkeit von Sympathomimetika und darf nicht mit anderen negativ inotropen Substanzklassen (Diltiazem, Verapamil) kombiniert werden. Der Besitzer ist darueber aufzuklaeren, dass die Therapie niemals unterbrochen werden darf und bei Atemnot, Diarrhoe oder Leistungsintoleranz der Tierarzt aufzusuchen ist.",
    "zahlen": "",
    "seite": "PDF-Seite 5 (Buchseite 433)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Sotalol ist ein Antiarrhythmikum der Klasse III mit zusaetzlicher, nicht selektiver betablockierender Wirkung.",
    "zahlen": "Halbwertszeit Hund 5 h",
    "seite": "PDF-Seite 5 (Buchseite 433)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Indikationen von Sotalol: klinisch relevante ventrikulaere (und supraventrikulaere) Tachyarrhythmien bei Hund und Katze sowie subklinische Arrhythmien mit Risiko zum ploetzlichen Herztod, haeufig genetisch bedingt, zum Beispiel bei Dobermann, Boxer und Dogge.",
    "zahlen": "",
    "seite": "PDF-Seite 5 (Buchseite 433)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Kontraindikationen von Sotalol: felines Asthma, Sinusbradykardie, Bradyarrhythmie, Myokardversagen, kardiogener Schock, kongestives Herzversagen. Bei Niereninsuffizienz das Dosierungsintervall verlaengern, bei Diabetes mellitus nur nach strenger Indikationsstellung.",
    "zahlen": "",
    "seite": "PDF-Seite 5-6 (Buchseiten 433-434)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Sotalol: proarrhythmische Wirkung, Bronchospasmus, negativ inotrope Wirkung, Schwaeche, Schwindel und Erbrechen als Nebenwirkungen. Monitoring EKG. Nicht gemeinsam mit Antiarrhythmika der Klasse Ia anwenden.",
    "zahlen": "Dosis 1-3 mg/kg KGW 2x taeglich",
    "seite": "PDF-Seite 6 (Buchseite 434)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Amiodaron: Wirkungsweise nicht vollstaendig geklaert, vermutet werden blockierende Effekte an Kaliumkanaelen sowie an alpha- und beta-Rezeptoren. Die Halbwertszeit steigt bei wiederholter Gabe stark an.",
    "zahlen": "Halbwertszeit Hund initial 7,5 h, bei wiederholter Gabe 11 h bis 3 Tage",
    "seite": "PDF-Seite 6 (Buchseite 434)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Amiodaron wird nur beim Hund eingesetzt, und zwar bei refraktaeren ventrikulaeren Tachyarrhythmien, wenn andere Antiarrhythmika unwirksam sind. Kontraindikationen: Sinusbradykardie, Bradyarrhythmien, Erhoehung der Transaminasen. Nebenwirkungen: Anorexie, Erbrechen, Leberschaedigung.",
    "zahlen": "",
    "seite": "PDF-Seite 6 (Buchseite 434)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Amiodaron-Dosierung bei akuten Rhythmusstoerungen; Formulierungen mit Polysorbat 80 sind zu vermeiden.",
    "zahlen": "Ladebolus 2-5 mg/kg KGW ueber 60 min langsam i.v.; Erhaltungsdosis 10 ug/kg KGW/min als DTI",
    "seite": "PDF-Seite 6 (Buchseite 434)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Amiodaron-Dosierung fuer die chronische haeusliche Therapie sowie das gesonderte Schema fuer die arrhythmogene Form der Dobermann-Kardiomyopathie.",
    "zahlen": "chronisch: 10-20 mg/kg KGW 1x taeglich fuer 7-10 d, danach 7,5 mg/kg 1x taeglich; Dobermann-Kardiomyopathie: 10 mg/kg 2x taeglich fuer 7 d, danach 8 mg/kg 1x taeglich",
    "seite": "PDF-Seite 6 (Buchseite 434)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Amiodaron: Monitoring von EKG, Leberenzymen und Blutdruck. Es kann den Serumspiegel anderer Medikamente erhoehen und darf nicht mit Digoxin kombiniert werden.",
    "zahlen": "",
    "seite": "PDF-Seite 6 (Buchseite 434)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Diltiazem ist ein Kalziumkanalblocker vom Nifedipin-Typ. Die Hauptwirkung liegt in einer Verbesserung der myokardialen Relaxation, der Verlangsamung der AV-Ueberleitung und der Verlaengerung der Refraktaerzeit; der negativ inotrope Effekt ist in ueblichen Dosierungen vernachlaessigbar.",
    "zahlen": "",
    "seite": "PDF-Seite 6 (Buchseite 434)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Indikationen von Diltiazem: HCM der Katze, Arrhythmien allgemein, Vorhofflimmern und supraventrikulaere Tachykardie, insbesondere Reentry-Tachykardien.",
    "zahlen": "",
    "seite": "PDF-Seite 6 (Buchseite 434)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Kontraindikationen von Diltiazem: schwere Hypotension, Sick-Sinus-Syndrom, AV-Block Grad II oder III und akutes Myokardversagen; bei kongestivem Herzversagen sowie Leber- oder Nierenfunktionsstoerung nur nach strenger Indikationsstellung.",
    "zahlen": "systolischer Blutdruck < 90 mmHg; AV-Block Grad II oder III",
    "seite": "PDF-Seite 7 (Buchseite 435)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Diltiazem-Dosierung fuer Hund und Katze; Nebenwirkungen sind Lethargie, Schwaeche, Bradykardie und bradykarde Rhythmusstoerungen, Magen-Darm- und ZNS-Symptomatik. Monitoring: Herzfrequenz und Nebenwirkungen. Nicht gemeinsam mit Betablockern anwenden.",
    "zahlen": "Hund 0,5-1,5 mg/kg KGW 3x taeglich; Katze 7,5-15 mg/Katze 2-3x taeglich",
    "seite": "PDF-Seite 7 (Buchseite 435)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Praktischer Hinweis zu Diltiazem: als langwirksam bezeichnete Retardpraeparate haben in Europa keine veraenderte Zusammensetzung und wirken daher nicht zuverlaessig laenger.",
    "zahlen": "",
    "seite": "PDF-Seite 7 (Buchseite 435)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Indikationen von Digoxin: supraventrikulaere Tachykardie, insbesondere Vorhofflimmern, sowie als Add-on in der Therapie des kongestiven Herzversagens beim Hund.",
    "zahlen": "",
    "seite": "PDF-Seite 7 (Buchseite 435)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Kontraindikationen von Digoxin: Hunde mit MDR-1-Defekt, vaso-vagale Synkopen bzw. erhoehter Vagotonus und Stoerungen des Elektrolythaushalts; bei Niereninsuffizienz Dosis anpassen und Serumkonzentration genau ueberwachen.",
    "zahlen": "",
    "seite": "PDF-Seite 7 (Buchseite 435)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Vorgehen bei Digitalisintoxikation: Praeparat absetzen; haemodynamisch relevante ventrikulaere Arrhythmie mit Lidocain behandeln, AV-Block, Sinusbradykardie und sinuatrialen Block mit Atropin; Elektrolythaushalt ausgleichen und kontinuierlich EKG ueberwachen; Aktivkohle eingeben, da Digoxin enterohepatisch rezirkuliert.",
    "zahlen": "",
    "seite": "PDF-Seite 7 (Buchseite 435)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Nach Abklingen der Intoxikationssymptomatik wird der Digitalisspiegel kontrolliert; bei normalem oder subnormalem Spiegel wird die Therapie mit der Haelfte der Initialdosis fortgesetzt.",
    "zahlen": "Fortsetzung mit 50 % der Initialdosis",
    "seite": "PDF-Seite 7 (Buchseite 435)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Digoxin-Dosierung fuer Hund und Katze.",
    "zahlen": "Hund 0,005 mg/kg KGW 2x taeglich oder 0,01 mg/kg KGW 1x taeglich; Katze 0,007 mg/kg KGW 1x taeglich bis alle 2 Tage",
    "seite": "PDF-Seite 7 (Buchseite 435)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Digoxin-Spiegelkontrolle: Blutentnahme 8 Tage nach Therapiebeginn und 8 Stunden nach der Tablettengabe. Zielspiegel und Anpassungsregel sind vorgegeben. Zusaetzlich Herzfrequenz und EKG ueberwachen, bei gleichzeitigem Diuretikaeinsatz oder erhoehtem Risiko einer Elektrolytimbalance regelmaessig die Elektrolyte kontrollieren.",
    "zahlen": "Spiegel 8 d nach Initialisierung und 8 h nach Tablettengabe; Zielspiegel 1 ng/ml; bei < 0,8 ng/ml Dosis um 30 % erhoehen",
    "seite": "PDF-Seite 8 (Buchseite 436)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Wechselwirkungen von Digoxin: Protonenpumpenhemmer, Metoclopramid und manche Chemotherapeutika verringern die Resorption; Diazepam, Quinidin, Anticholinergika, Tetrazykline und Erythromycin erhoehen das Toxizitaetsrisiko; Thyroxin kann den Serumspiegel veraendern; Diuretika und Spironolacton erhoehen das Intoxikationsrisiko und beeintraechtigen die Effektivitaet.",
    "zahlen": "",
    "seite": "PDF-Seite 8 (Buchseite 436)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Der Besitzer ist darauf hinzuweisen, dass Lethargie, Schwaeche und Magen-Darm-Symptome unter Digoxin auf eine moegliche Intoxikation hindeuten koennen.",
    "zahlen": "",
    "seite": "PDF-Seite 8 (Buchseite 436)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Atropin ist ein Parasympatholytikum und wird eingesetzt bei Sinusbradykardie, sinuatrialem Block und inkomplettem AV-Block, ausserdem als Antidot fuer Organophosphate und cholinerg wirkende Stoffe, fuer den diagnostischen Atropintest und zur Anaesthesie-Praemedikation.",
    "zahlen": "Hund und Katze 0,02-0,04 mg/kg KGW s.c., i.m. oder i.v.",
    "seite": "PDF-Seite 8 (Buchseite 436)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Kontraindikationen von Atropin: Glaukom, Tachykardien jeglicher Art sowie gastrointestinale Obstruktionen bzw. Ileus. Nebenwirkungen: trockenes Maul, Konstipation, Erbrechen, Durst, Ataxien, Anfaelle, Pupillendilatation, Photophobie sowie Hyper- und Hypotension. Monitoring: Herzfrequenz, Herzrhythmus, Urin- und Kotabsatz.",
    "zahlen": "",
    "seite": "PDF-Seite 8 (Buchseite 436)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Dobutamin ist ein direkter beta1-Rezeptor-Agonist mit stark inotroper Wirkung und leichten beta2- und alpha1-adrenergen Effekten. Es ist leicht chronotrop, arrhythmogen und peripher vasodilatatorisch und erhoeht den Cardiac Output ueber Schlagvolumen und Kontraktilitaet. Anders als Dopamin setzt es kein Norepinephrin frei.",
    "zahlen": "",
    "seite": "PDF-Seite 8 (Buchseite 436)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Dobutamin ist indiziert als schnell wirkendes injizierbares positiv inotropes Praeparat zur kurzzeitigen Behandlung des Herzversagens und bei Schockpatienten, wenn Fluessigkeitstherapie allein den arteriellen Blutdruck und die periphere Gewebsperfusion nicht normalisiert. Kontraindiziert bei HOCM, Aortenstenose, Pulmonalstenose und Hypovolaemie ohne vorherige Fluessigkeitssubstitution.",
    "zahlen": "",
    "seite": "PDF-Seite 8 (Buchseite 436)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Pimobendan steigert die kardiale Kontraktilitaet ueber eine erhoehte intrazellulaere Kalziumsensitivitaet, ohne den myokardialen Sauerstoffverbrauch oder die intrazellulaere Kalziumkonzentration zu erhoehen. Ueber vaskulaere Phosphodiesterase-III-Hemmung bewirkt es arterielle und venoese Vasodilatation.",
    "zahlen": "",
    "seite": "PDF-Seite 1 (Buchseite 429)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Kontraindikationen von Pimobendan: hoehergradige Aorten- und Pulmonalstenose, hypertrophe Kardiomyopathie, schwere Leberinsuffizienz und relativ Diabetes mellitus. Nebenwirkungen sind gastrointestinale Symptome.",
    "zahlen": "",
    "seite": "PDF-Seite 1 (Buchseite 429)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Pimobendan-Dosierung in Tablettenform und als Injektionsloesung. Fuer die Katze existiert keine etablierte Dosis, die Autoren geben einen eigenen Bereich an.",
    "zahlen": "Hund oral 0,25 mg/kg KGW 2x taeglich; Katze (RCM, DCM) 0,125-0,25 mg/kg KGW 2x taeglich; Hund i.v. 0,15 mg/kg KGW einmalig, Wiederholung fruehestens nach 12 h",
    "seite": "PDF-Seite 1 (Buchseite 429)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Die positiv inotrope Wirkung von Pimobendan kann durch gleichzeitige Gabe von Betablockern oder Kalziumkanalblockern (Verapamil, Diltiazem) eingeschraenkt werden. Pimobendan soll eine Stunde vor der Fuetterung gegeben werden.",
    "zahlen": "1 h vor der Fuetterung",
    "seite": "PDF-Seite 1 (Buchseite 429)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "medikament",
    "text": "Ursachen einer Sinusbradykardie: erhoehter Vagotonus, Hypothermie, schwere Hypothyreose oder Medikamentengabe (Xylazin, Digitalisglykoside, Beta-Blocker); auch eine Ueberdosierung von Anaesthetika kann den Vagotonus erhoehen. Bei Katzen hat eine myokardiale Hypoxie haeufig eine Sinusbradykardie zur Folge und ist Hinweis auf eine besonders schwere Myokarderkrankung.",
    "zahlen": "",
    "seite": "PDF 14 (Buch 152)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "medikament",
    "text": "Atropintest bei Sinusbradykardie: bei unsedierten Patienten ohne sekundaere Ursache Atropin 0,04 mg/kg i.m. oder i.v. unter EKG-Kontrolle. Nach 5 Minuten (i.v.) bzw. 20 Minuten (i.m.) sollte die Herzfrequenz zwischen 140 und 200 Schlaegen/min liegen. Steigt sie an, spricht das fuer erhoehten Vagotonus; bleibt der Anstieg unzureichend oder aus, besteht Verdacht auf eine Sinusknotenerkrankung.",
    "zahlen": "Atropin 0,04 mg/kg; Kontrolle nach 5 min i.v. / 20 min i.m.; Ziel-HF 140-200/min",
    "seite": "PDF 14 (Buch 152)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "perikard",
    "text": "In der Zeile Sonstiges dieses Falles sind elektrischer Alternans und Artefakte gleichzeitig vermerkt. Der Alternans wird hier also als eigener, in der Befundtabelle festzuhaltender Zusatzbefund gefuehrt.",
    "zahlen": "",
    "seite": "PDF 24 (Buch 212)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "perikard",
    "text": "Perikarderguss im Roentgen: Herzhoehen- und Herzbreitenzunahme mit Abrundung der Konturen bis zur fast runden Herzsilhouette (Kugelherz) in beiden Ebenen, besonders deutlich in der DV/VD-Ebene. Differentialdiagnose zur runden Kontur ist unter anderem die schwere Trikuspidalinsuffizienz durch Dysplasie, die nur in der LL-Ebene rund erscheint.",
    "zahlen": "",
    "seite": "PDF 66 = Buch 66",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "perikard",
    "text": "Verbreiterte Vena cava caudalis kommt unter anderem bei Perikarderguss und konstriktiver Perikarditis vor; eine Hypoperfusion der Lungengefaesse tritt beim Low-Output-Syndrom einschliesslich restriktiver Perikarditis und Perikardtamponade auf.",
    "zahlen": "",
    "seite": "PDF 69/70 = Buch 69/70",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "perikard",
    "text": "Steckbrief elektrischer Alternans: von Herzschlag zu Herzschlag wechselnde Amplituden von P-, QRS- und T-Ausschlaegen in relativ festem Rhythmus, Gestaltveraenderung moeglich, alle Komplexe gehen vom selben Schrittmacher aus.",
    "zahlen": "",
    "seite": "29",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "perikard",
    "text": "Vorkommen des elektrischen Alternans: Perikarderguss kardialer und extrakardialer Genese, Herzbasistumor, supraventrikulaere Tachykardie, alternierender Schenkelblock; bei Katzen unter Umstaenden physiologisch. Therapie: Perikardiozentese zur Entlastung bei groesserer Ergussmenge.",
    "zahlen": "",
    "seite": "29",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "perikard",
    "text": "Beispiel elektrischer Alternans: Katze mit Perikarderguss infolge FIP, regelmaessige P-Wellen, schmaler Kammerkomplex mit rhythmisch wechselnden Amplituden (swinging heart), Sinustachykardie HF 240/min; 25 mm/s, 1 cm = 1 mV.",
    "zahlen": "HF 240/min; 25 mm/s; 1 cm = 1 mV",
    "seite": "29",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "perikard",
    "text": "Beim persistierenden AV-Kanal koennen bei hochgradigem Thorax- und/oder Perikarderguss gedaempfte Herztoene auftreten. Ein elektrischer Alternans wird in diesem Seitenbereich nicht erwaehnt.",
    "zahlen": "",
    "seite": "PDF 140 = Buchseite 140",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "perikard",
    "text": "Beim Perikarderguss tritt meist zusaetzlich ein elektrischer Alternans auf: durch die Undulation des Herzens im Perikard schwankt die Amplitude der R-Zacke mehr oder weniger periodisch.",
    "zahlen": "",
    "seite": "PDF 24-25 (Buch 162-163)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "perikard",
    "text": "Tab. 10.7: Nettoamplitude positiv, Breite normal, Amplituden ungleichmaessig (elektrischer Alternans) - Befund Perikarderguss. Das trennt den Perikarderguss von der gleichmaessigen Hypovoltage.",
    "zahlen": "",
    "seite": "PDF 27 (Buch 165)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "perikard",
    "text": "Ist die QRS-Amplitude niedriger als normal (Hypovoltage), koennen Adipositas, Hypothyreose oder ein Perikarderguss vorliegen. Beim Perikarderguss tritt meist auch ein elektrischer Alternans auf, das heisst durch die Undulation des Herzens im Perikard variiert die Amplitude der R-Zacke mehr oder weniger periodisch.",
    "zahlen": "",
    "seite": "PDF 24-25 / Buch 162-163",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "perikard",
    "text": "Tab. 10.7: positive Nettoamplitude bei normaler Breite und GLEICHMAESSIG niedrigen Ausschlaegen bedeutet Daempfung durch Adipositas oder Erguss bzw. Hypothyreose; UNGLEICHMAESSIGE Ausschlaege (elektrischer Alternans) bedeuten Perikarderguss.",
    "zahlen": "gleichmaessig niedrig = Daempfung; ungleichmaessig = elektrischer Alternans/Perikarderguss",
    "seite": "PDF 27 / Buch 165",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "perikard",
    "text": "Haeufigster Perikardbefund ist der Perikarderguss: deutlicher schwarzer (anechoischer) Fluessigkeitssaum zwischen Perikard und freier linker Ventrikelwand. Ursachen: entzuendliche, neoplastische oder kongestive Erkrankungen.",
    "zahlen": "",
    "seite": "PDF 10 / Buch 104",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "perikard",
    "text": "Unterscheidung kongestiver Erguss versus andere Ursache im Echo: bei Kongestion liegt das Perikard dem Vorhof an und der Erguss erstreckt sich von der Herzspitze bis zum atrioventrikulaeren Uebergang.",
    "zahlen": "",
    "seite": "PDF 10 / Buch 104",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "perikard",
    "text": "Ist der Erguss um das gesamte Herz sichtbar, muss zwischen Thorax- und Perikarderguss unterschieden werden. Hilfsmittel ist der M-Mode, weil das Herz im Herzbeutelerguss frei schwingt.",
    "zahlen": "",
    "seite": "PDF 10-11 / Buch 104-105",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "perikard",
    "text": "Herztamponade im 2D: die rechte Herzhaelfte, vor allem der rechte Vorhof, wird wie ein flatterndes Band wahrgenommen; der linke Ventrikel erscheint durch Volumenmangel pseudohypertroph.",
    "zahlen": "",
    "seite": "PDF 11 / Buch 105",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "perikard",
    "text": "Differenzialdiagnosen des Perikardergusses: kongestives Herzversagen, Neoplasie, infektioes (FIP), Vorhofruptur, entzuendlich, idiopathisch, Gerinnungsstoerung.",
    "zahlen": "",
    "seite": "PDF 11 / Buch 105",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Bei Verdacht auf einen angeborenen Herzfehler ist eine Untersuchung mit Doppler-Ultraschall erforderlich. Erst das Echokardiogramm erlaubt die Beurteilung von genauer Art und Schweregrad des Fehlers; davon haengt die Prognose ab.",
    "zahlen": "",
    "seite": "PDF 41 (Buch 130)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "echo",
    "text": "Zur endgueltigen Abklaerung einer Hypertrophie beziehungsweise Dilatation von linkem Vorhof und linkem Ventrikel, etwa zur Unterscheidung von chronischer Mitralklappenendokardiose und dilatativer Kardiomyopathie, ist die Doppler-Ultraschalluntersuchung erforderlich.",
    "zahlen": "",
    "seite": "PDF 49 (Buch 138), PDF 47 (Buch 136)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "echo",
    "text": "Erster diagnostischer Schritt beim AV-Block III ist eine Doppler-Ultraschalluntersuchung des Herzens zur Abklaerung struktureller Veraenderungen, dazu eine komplette Blutuntersuchung, um schwere Stoffwechselstoerungen wie eine Hyperkaliaemie auszuschliessen.",
    "zahlen": "",
    "seite": "PDF 28 (Buch 216)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "echo",
    "text": "Empfohlene Reihenfolge der echokardiographischen Techniken: 1. zweidimensionales Echokardiogramm, 2. TM-Mode im rechtsparasternalen Kurz- und Laengsachsenblick, 3. Farbdoppler, 4. abschliessend gepulster/kontinuierlicher Doppler; optional Gewebedoppler (TDI), Strain-Rate, Kontrastechokardiographie oder TEE.",
    "zahlen": "",
    "seite": "PDF 85 = Buch 85",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "echo",
    "text": "Schallkopfwahl: in der Veterinaerechokardiographie Sektorschallkoepfe mit 2,5 bis 7,5 MHz; Linear- und Semikonvexsonden eignen sich fuer die Thoraxsonographie nicht. Abbildungsbeispiele: mechanische Sonde 7,5-10 MHz, elektronische Sonden 7-3 MHz und 3,5-2 MHz. Fuer die TEE koennen wegen des Wegfalls des Lungengewebes hochaufloesende 7,5- und 5-MHz-Sonden verwendet werden.",
    "zahlen": "Sektorsonden 2,5-7,5 MHz; Beispiele 7,5-10, 7-3, 3,5-2 MHz; TEE 5 und 7,5 MHz",
    "seite": "PDF 85 = Buch 85",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "echo",
    "text": "Indikationen der Echokardiographie: haeufigste ist ein systolisches, diastolisches oder kontinuierliches Herzgeraeusch; weiter Abklaerung von Veraenderungen in EKG und Roentgenbild, Verdacht auf kardiale Thrombenquelle bei herzfernem Embolus, Differentialdiagnostik bei Anfallsleiden, arterielle Hypertonie der Katze und Ausschluss angeborener Herzmissbildungen bei disponierten Rassen/Zuchtuntersuchung.",
    "zahlen": "",
    "seite": "PDF 84 = Buch 84",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "echo",
    "text": "Farbdoppler-Konvention: Rot fliesst auf den Schallkopf zu, Blau vom Schallkopf weg; je heller die Farbe, desto schneller der Fluss; gruen-gelbe Farbeffekte deuten Turbulenzen an. Die Farbe kodiert Richtung, nicht Sauerstoffsaettigung. Ein blaues Zentrum in rotem Einstrom ist Aliasing und darf nicht mit einem Refluxsignal verwechselt werden.",
    "zahlen": "",
    "seite": "PDF 88/89 = Buch 88/89",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "echo",
    "text": "Arbeitsteilung PW- und CW-Doppler: der PW-Doppler erfasst selektiv ein Flussspektrum in frei waehlbarer Tiefe (sample volume in Lage, Groesse und Winkel veraenderbar) und lokalisiert einen Shunt exakt, ist aber in der messbaren Geschwindigkeit begrenzt; der CW-Doppler nutzt zwei getrennte Kristalle fuer Dauersendung und -empfang, zeigt den maximalen Fluss entlang der Linie ohne Tiefenzuordnung und erfasst hohe Geschwindigkeiten (Klappenstenosen).",
    "zahlen": "",
    "seite": "PDF 89 = Buch 89",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "echo",
    "text": "TM-Mode-Regel: die Anlotung findet IMMER rechts parasternal statt, Voraussetzung ist ein einwandfreier 2D-Schnitt in langer (LAV) oder kurzer Achse (SAV). Lange und kurze Achse liefern nicht vollstaendig identische Messdaten, daher muss fuer Verlaufsvergleiche immer dieselbe Achse und Ebene wiederholt werden.",
    "zahlen": "",
    "seite": "PDF 92 = Buch 92",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "echo",
    "text": "Die drei definierten TM-Mode-Ebenen: 1. Myokardebene unterhalb der Mitralklappensegelspitzen, ueber bzw. zwischen den Papillarmuskeln (rechte Hinterwand, RV, interventrikulaeres Septum, LV, linke Hinterwand); 2. Mitralklappenebene direkt durch die unteren Drittel der Segel (M-foermiges Signal des septalen, W-foermiges des posterioren Segels); 3. Aortenklappenebene im Bulbus aortae (kastenfoermiges Signal der Aortenklappen, linkes Atrium).",
    "zahlen": "3 Standardebenen",
    "seite": "PDF 92/93 = Buch 92/93",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "echo",
    "text": "Im TM-Mode gemessen werden: Aortenwurzel enddiastolisch, linkes Atrium endsystolisch, linker und rechter Ventrikel sowie Myokard jeweils enddiastolisch und endsystolisch, Mitral- und Aortenklappenbewegung sowie der Mitralklappenabstand zum Septum (EPSS). Abgeleitet werden systolische Verkuerzungsfraktion (FS), Ejektionsfraktion, linksventrikulaere Masse, Schlagvolumen sowie end- systolische und enddiastolische Volumenindizes; an den Aortenklappen zusaetzlich LA:Ao und die systolischen Zeitintervalle PEP und LVET.",
    "zahlen": "Zeitpunkte: Ao enddiastolisch, LA endsystolisch; Kenngroessen FS, EF, LV-Masse, SV, EPSS, LA:Ao, PEP, LVET",
    "seite": "PDF 86/93 = Buch 86/93",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "echo",
    "text": "Mitraleinstromprofil im PW-Doppler (sample volume an der Mitralklappenspitze, links apikaler 4-Kammerblick): die fruehdiastolische E-Welle ist normalerweise die erste positive Welle und hat eine hoehere Amplitude und breitere Basis als die nachfolgende A-Welle der Vorhofkontraktion; bei Katzen fusionieren E- und A-Welle haeufig, frequenzabhaengig.",
    "zahlen": "",
    "seite": "PDF 94 = Buch 94",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "echo",
    "text": "Empfohlene 2D-Standardschnittebenen (nach Thomas 1984): rechts parasternal kurze Achse (apikal, Papillarmuskelhoehe, Mitralklappenhoehe, Aorten-/Pulmonalklappenebene), rechts parasternal lange Achse (Einstromtrakt, Ausflusstrakt), apikaler Kammerblick von links (2-, 4-, 5-Kammerblick), Kurzachsenblick von links (Aorta im Querschnitt, Pulmonalarterienstamm im Laengsschnitt) sowie subkostale Anschallung (4- und 5-Kammerblick).",
    "zahlen": "",
    "seite": "PDF 92 = Buch 92",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "echo",
    "text": "Doppleranlotung: in der Regel vom linken Hemithorax im apikalen 2-, 4- und 5-Kammerblick; die A. pulmonalis wird von manchen Untersuchern von rechts angeschallt; die subkostale Anschallung durch den linken Leberlappen ist vorteilhaft zur Ermittlung des Aortenflusses sowie bei Pneumothorax oder Lungenemphysem.",
    "zahlen": "",
    "seite": "PDF 94 = Buch 94",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "echo",
    "text": "Beurteilungsraster des 2D-Echokardiogramms: Kavitaeten nach Groesse, Form und Volumen; Myokard nach Wanddicke und Formabweichung (normotroph, hypertroph, dilatativ; symmetrisch, asymmetrisch, global, fokal) sowie Homogenitaet und Echogenitaet; Kontraktilitaet als normo-, hypo-, hyperkontraktil, akinetisch, dyskinetisch oder paradox; Klappen nach Segelzahl, Verdickung, Verkuerzung, Auflagerung, Verkalkung, Fibrose und Beweglichkeit. Perikard und Endokard sind die echogensten Strukturen.",
    "zahlen": "",
    "seite": "PDF 86 = Buch 86",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "echo",
    "text": "Formel der linksventrikulaeren systolischen Verkuerzungsfraktion: FS = (LVIDd - LVIDs) / LVIDd x 100, mit LVID = linksventrikulaerer Innendurchmesser, s = endsystolisch, d = enddiastolisch.",
    "zahlen": "FS [%] = (LVIDd - LVIDs) / LVIDd x 100",
    "seite": "PDF 97 = Buchseite 97",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "echo",
    "text": "Die FS wird aus dem rechts parasternalen Kurzachsenschnitt zwischen den beiden Papillarmuskeln oder im rechts parasternalen Laengsachsenschnitt unterhalb der Mitralklappe ermittelt. Beide Ebenen sind nicht identisch, die Werte koennen differieren; bei Verlaufskontrollen ist die einmal gewaehlte Methode beizubehalten und die Schnittebene zu dokumentieren.",
    "zahlen": "",
    "seite": "PDF 97-98 = Buchseite 97-98",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "echo",
    "text": "Im gesunden Herzen ist die E-Welle immer hoeher als die A-Welle, das E/A-Verhaeltnis liegt ueber 1,0. Bei abnormaler Muskelrelaxation (Hypertrophe Kardiomyopathie, Hypertonie der Katze) ist die A-Welle erhoeht, E/A faellt unter 1,0 und die isovolumetrische Relaxationszeit steigt an; bei restriktiver Fuellung ergibt sich umgekehrt ein hohes E/A-Verhaeltnis.",
    "zahlen": "E/A > 1,0 gesund; E/A < 1,0 bei Relaxationsstoerung",
    "seite": "PDF 99 = Buchseite 99",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "echo",
    "text": "Gewebedoppler-Beispiel (Irish Setter, m, 9 J, volumenueberladener linker Ventrikel): pathologisch niedrige Fliessgeschwindigkeiten kleiner/gleich 0,12 m/s im proximalen Septum unterhalb der Mitralklappenebene. Das Kurvenbild besteht aus einer positiven systolischen S-Kurve und zwei negativen diastolischen Kurven; das E/A-Verhaeltnis sollte groesser 1 sein.",
    "zahlen": "TDI-Geschwindigkeit <= 0,12 m/s (pathologisch niedrig); E/A > 1",
    "seite": "PDF 105 = Buchseite 105 (Abb. 6.54)",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "echo",
    "text": "Zweidimensionale Vermessungskonventionen: die Quervermessung der Ventrikel erfolgt unterhalb der Klappenebene, der Laengsdurchmesser im 4-Kammerblick von der Herzspitze zu den Beruehrungspunkten der AV-Klappensegel, im Laengsachsenblick von der Herzspitze bis zum Aorten-/Vorhofwinkel. Die Atrien werden im 4-Kammerblick oberhalb der AV-Klappenebene quervermessen, die Laengsvermessung faellt das Lot von den Klappenspitzen zum Vorhofdach.",
    "zahlen": "",
    "seite": "PDF 95-96 = Buchseite 95-96",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "echo",
    "text": "Volumen- und Ejektionsfraktionsbestimmung nach Simpson erfolgt monoplan als Flaechen-Laengen-Methode oder biplan als Scheibchensummationsmethode, beide im apikalen 4-Kammerblick. Perikardveraenderungen werden enddiastolisch am weitesten Punkt ihrer Dimension vermessen.",
    "zahlen": "",
    "seite": "PDF 96 = Buchseite 96",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "echo",
    "text": "Farbkodierung im Doppler: rot ist die Flussrichtung auf den Schallkopf zu, blau die Flussrichtung vom Schallkopf weg; Stenosejets, Regurgitationen und Shuntfluesse werden durch Zumischung gruen-gelber Farbe angezeigt. Im Gewebedoppler gilt dieselbe Rot/Blau-Konvention fuer Myokardbewegungen, je heller die Farbe desto schneller.",
    "zahlen": "",
    "seite": "PDF 98 und 104 = Buchseite 98, 104",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "echo",
    "text": "Bei Hypertropher Kardiomyopathie ist echokardiographisch die Dickenzunahme des interventrikulaeren Septums und/oder der linksventrikulaeren Hinterwand messbar; der linke Vorhof ist infolge relativer Mitralinsuffizienz haeufig, aber nicht zwangslaeufig dilatiert.",
    "zahlen": "",
    "seite": "PDF 118 = Buchseite 118",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "echo",
    "text": "Exponent b und 95-%-Vorhersageintervall des Cornell-Index beim Hund fuer den linksventrikulaeren Durchmesser diastolisch und systolisch.",
    "zahlen": "LVDd: b = 0,294, a = 1,27-1,85; LVDs: b = 0,315, a = 0,71-1,26",
    "seite": "PDF-Seite 1, Tab. 21.1 (Buchseite 445)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "echo",
    "text": "Exponent b und 95-%-Vorhersageintervall des Cornell-Index beim Hund fuer die linke freie Ventrikelwand diastolisch und systolisch.",
    "zahlen": "LVWd: b = 0,232, a = 0,29-0,6; LVWs: b = 0,222, a = 0,48-0,87",
    "seite": "PDF-Seite 1, Tab. 21.1 (Buchseite 445)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "echo",
    "text": "Exponent b und 95-%-Vorhersageintervall des Cornell-Index beim Hund fuer das interventrikulaere Septum. Die letzte Tabellenzeile ist in Tab. 21.1 mit LVSs beschriftet, in Tab. 22.2 steht derselbe Wertebereich unter IVSs.",
    "zahlen": "IVSd: b = 0,241, a = 0,29-0,59; IVSs (in Tab. 21.1 als LVSs): b = 0,240, a = 0,43-0,79",
    "seite": "PDF-Seite 1, Tab. 21.1 (Buchseite 445); PDF-Seite 4, Tab. 22.2 (Buchseite 448)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "echo",
    "text": "90-%-Vorhersageintervalle des Cornell-Index beim Hund, engere Grenzen als das 95-%-Intervall.",
    "zahlen": "LVDd 1,35-1,73; LVDs 0,79-1,14; LVWd 0,33-0,53; LVWs 0,53-0,78; IVSd 0,33-0,52; IVSs 0,48-0,71",
    "seite": "PDF-Seite 4, Tab. 22.2 (Buchseite 448)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "echo",
    "text": "Auslegungsregel fuer den Cornell-Index: innerhalb des 90-%-Vorhersageintervalls gilt der Index als normal, ausserhalb des 95-%-Vorhersageintervalls als abnormal; dazwischen liegt ein Graubereich. Bei kleinen Hunden mit Neigung zur degenerativen Mitralklappenerkrankung erscheint das 90-%-Intervall geeigneter.",
    "zahlen": "90-%-PI = normal; 95-%-PI ueberschritten = abnormal; dazwischen Graubereich",
    "seite": "PDF-Seite 4, Abschnitt 22.1.1 (Buchseite 448)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "echo",
    "text": "Exponenten (mit Konfidenzangabe in Klammern) und 95-%-Vorhersageintervall des Haeggstroem-Index der Katze fuer das interventrikulaere Septum.",
    "zahlen": "IVSd: b = 0,204 (0,197-2,12), a = 2,8-2,87; IVSs: b = 0,227 (0,218-0,236), a = 4,35-4,47",
    "seite": "PDF-Seite 1, Tab. 21.2 (Buchseite 445)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "echo",
    "text": "Exponenten und 95-%-Vorhersageintervall des Haeggstroem-Index der Katze fuer den linksventrikulaeren Durchmesser.",
    "zahlen": "LVDd: b = 0,262 (0,256-0,27), a = 10,6-10,8; LVDs: b = 0,261 (0,250-0,272), a = 5,7-5,89",
    "seite": "PDF-Seite 1, Tab. 21.2 (Buchseite 445)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "echo",
    "text": "Exponenten und 95-%-Vorhersageintervall des Haeggstroem-Index der Katze fuer die linke freie Ventrikelwand.",
    "zahlen": "LVWd: b = 0,244 (0,263-0,251), a = 2,6-2,66; LVWs: b = 0,263 (0,255-0,271), a = 4,3-4,4",
    "seite": "PDF-Seite 1, Tab. 21.2 (Buchseite 445)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "echo",
    "text": "Normalwerte der Verkuerzungsfraktion nach Groesse des Hundes und fuer die Katze. Bei sehr grossen Hunden und Windhunden ist der Bereich 20-25 % ein Graubereich, der ohne andere pathologische Befunde als normal gewertet werden darf.",
    "zahlen": "kleine Hunde 35-50 %; grosse Hunde 25-40 %; sehr grosse Hunde/Windhunde 20-25 % (Graubereich); Katze 39-51 %",
    "seite": "PDF-Seite 1 (Buchseite 445)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "echo",
    "text": "Abkuerzungsschluessel der beim Hund zu bestimmenden echokardiografischen Messgroessen: IVSd/IVSs interventrikulaeres Septum diastolisch/systolisch, LVDd/LVDs linksventrikulaerer Durchmesser diastolisch/systolisch, LVWd/LVWs linke freie Ventrikelwand diastolisch/systolisch.",
    "zahlen": "",
    "seite": "PDF-Seite 4, Tab. 22.1 (Buchseite 448)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "echo",
    "text": "Weitere Messgroessen des Hundes laut Abkuerzungstabelle: FS Verkuerzungsfraktion, EF Ejektionsfraktion, EPSS e-point to septal separation, LAD linksatrialer Durchmesser im rechts parasternalen 4-Kammer-Blick, EDV/ESV linksventrikulaeres end-diastolisches bzw. end-systolisches Volumen, EDVI/ESVI die zugehoerigen Volumenindizes, RAD rechtsatrialer Durchmesser, RVd rechtsventrikulaerer Durchmesser diastolisch.",
    "zahlen": "",
    "seite": "PDF-Seite 4, Tab. 22.1 (Buchseite 448)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "echo",
    "text": "Die Unschaerfe der Cornell-Vorhersageintervalle wird mit der relativ kleinen und heterogen zusammengesetzten Studienpopulation begruendet. Werte ausserhalb der Vorhersagewerte sind sehr wahrscheinlich abnormal, Werte im Grenzbereich muessen aber nicht unbedingt normal sein.",
    "zahlen": "",
    "seite": "PDF-Seite 4 (Buchseite 448)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "echo",
    "text": "Praxistipp: Bei jeder Herzultraschalluntersuchung soll immer ein Sono-EKG angeschlossen sein. Das ist die einzige positive EKG-Vorgabe im ganzen gelesenen Bereich.",
    "zahlen": "",
    "seite": "PDF 1 / Buch 95 (Datei 1 und Datei 2)",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Der rechts parasternale 4-Kammer-Blick (4K-LAX) erlaubt sofort die Einschaetzung, ob ein haemodynamisch relevantes Herzproblem vorliegt. Beurteilt werden Verhaeltnis der 4 Kammern zueinander, Durchmesser der Kammern und Dicke der Herzwaende.",
    "zahlen": "",
    "seite": "PDF 1 / Buch 95",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Schallkopfposition 4K-LAX: hinter dem leicht nach vorn gestellten rechten Oberarm, zu Beginn sternumnah. Empfehlung: Herzspitzenstoss palpieren und einen Interkostalraum kranial davon ankoppeln; danach Kabel Richtung untenliegender Ellbogen anheben (Kippen zum Zwerchfell).",
    "zahlen": "1 Interkostalraum kranial des Herzspitzenstosses",
    "seite": "PDF 2 / Buch 96",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Die Referenzmarke des Schallkopfes (Nut oder LED) definiert zusammen mit der Schallkopf-Laengsachse die Schallebene und die Rechts-Links-Ausrichtung am Monitor. Herstellerseitig wird sie rechts am Monitor dargestellt; da es beim Abdomenschall umgekehrt sein kann, ist die Lage vor der Untersuchung zu pruefen.",
    "zahlen": "",
    "seite": "PDF 2 / Buch 96",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Messung der diastolischen Wanddicke bei Katzen ist nur bei hohen Bildraten sinnvoll; die Wanddicke wird an mehreren Stellen gemessen, um regionale Unterschiede zu erfassen.",
    "zahlen": "Bildrate mindestens 80 % der Herzfrequenz",
    "seite": "PDF 11 und 19 / Buch 105 und 113",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Der absolute linksatriale Durchmesser (ohne Bezug zur Aorta, im 4K parallel zur Klappenebene gemessen) hat eine besonders geringe Variabilitaet, vermeidet Interpolationsfehler der LA/Ao-Messung in der Kurzachse und die anatomisch bedingte Unterschaetzung im M-Mode bzw. 5-Kammer-Blick. Er eignet sich besonders fuer das individuelle Follow-up.",
    "zahlen": "",
    "seite": "PDF 12 / Buch 106",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Die Groessenbestimmung des rechten Vorhofs wird nur beim Irish Wolfhound durchgefuehrt, und zwar von rechts parasternal im abgekippten 4-Kammer-Blick.",
    "zahlen": "",
    "seite": "PDF 12 / Buch 106",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "5-Kammer-Blick (5K-LAX): vom 4K ausgehend das Schallkopfkabel leicht von der Thoraxwand wegbewegen und den Schallkopf gegen den Uhrzeigersinn drehen. Fehler bei staerkerer Rotation: Aorta sichtbar, Ventrikelseptum fast kreisfoermig geschlossen, Mitralklappe verschwindet, Ventrikel verkuerzt; Korrektur meist im Uhrzeigersinn.",
    "zahlen": "Rotation 5-10 Grad gegen den Uhrzeigersinn; Fehler ab mehr als 10 Grad",
    "seite": "PDF 12-13 / Buch 106-107",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Normalbefunde im 5K zusaetzlich zum 4K: Septum am Uebergang in die Aorta duennwandig (Pars membranacea); Aortenbulbus mit Klappensegeln in Diastole und Systole im Lumen unveraendert; Aorta ascendens enger als der Bulbus aortae; rechte Pulmonalarterie verlaeuft ueber dem linken Vorhof im Querschnitt und ist deutlich kleiner als der Aortendurchmesser.",
    "zahlen": "",
    "seite": "PDF 13 / Buch 107",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Abweichung aortennah verdicktes Septum: IVS dicker als die linke freie Wand oder lokale Veraenderungen, die die Ausflussbahn Richtung Aorta einengen. Differenzialdiagnosen: Subaortenstenose (muskulaerer Wulst unterhalb der Aortenklappe), HCM, Tumor im Septum.",
    "zahlen": "",
    "seite": "PDF 13-14 / Buch 107-108",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Abweichung aortennah fehlendes Septum bzw. septales Aneurysma: das interventrikulaere Septum unterhalb der Aortenklappe ist unvollstaendig (vollstaendiger oder unvollstaendiger VSD); beim Aneurysma woelbt sich das Septum scheinbar in den rechten Ventrikel vor. Pathogenese: kongenitale Missbildung.",
    "zahlen": "",
    "seite": "PDF 14 / Buch 108",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Aortenklappenveraenderungen: hyperechogene Klappen, in der Bewegung reduzierte Semilunarklappen, bikuspidal angelegte Aortenklappe, Klappenvegetationen bei Endokarditis. Differenzialdiagnosen: Aortenstenose, Endokarditis, Thrombus, Tumor. Im 5K kann der Durchmesser des Aortenklappenringes bestimmt werden.",
    "zahlen": "",
    "seite": "PDF 14 / Buch 108",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Rechts parasternale Kurzachse (SAX): Ankopplung wie beim 4K, dann Schallebene um 90 Grad zur Laengsachse im Uhrzeigersinn rotieren; Referenzmarke zeigt nach kranial. Beim Hund Kabel moeglichst weit nach kranial richten, dann stehen die Papillarmuskeln auf etwa 5-Uhr- und 7-Uhr-Position; bei der Katze ist diese Korrekturbewegung in der Regel nicht noetig.",
    "zahlen": "Rotation 90 Grad; Papillarmuskeln auf 5:00 und 7:00 Uhr",
    "seite": "PDF 15 / Buch 109",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Vier Kurzachsenschnitte in fester Reihenfolge: Hoehe der Papillarmuskeln, Hoehe der Mitralklappe, Hoehe der Aorta und beider Vorhoefe (Herzbasis), Hoehe des Truncus pulmonalis. Zwischen ihnen wird nur gekippt (Kabel nach dorsal Richtung Wirbelsaeule oder nach ventral Richtung Sternum).",
    "zahlen": "",
    "seite": "PDF 15 / Buch 109",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Kurzachse Herzbasis: Das Verhaeltnis der Innendurchmesser von Aorta und linkem Atrium wird am Ende der ventrikulaeren Systole bestimmt, wenn der Vorhof maximal gefuellt und die Aortenklappe wie ein Mercedes-Stern geschlossen ist.",
    "zahlen": "",
    "seite": "PDF 15 und 19 / Buch 109 und 113",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Kurzachse Herzbasis, Normalbefund interatriales Septum: duenn, etwa so dick wie das Perikard, durchgehend und durch den etwas hoeheren Druck im linken Atrium leicht konvex Richtung rechter Vorhof. In dieser Ebene muendet die V. cava caudalis in den rechten Vorhof.",
    "zahlen": "",
    "seite": "PDF 15 und 18 / Buch 109 und 112",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Kurzachse Truncus pulmonalis: Verhaeltnis der Innendurchmesser von Aorta und Pulmonalarterie auf Hoehe der Pulmonalklappe. Normal ist der Aortenklappenring minimal groesser als der Pulmonalklappenring. Verlauf des Pulmonalarterienstammes bis in die Bifurkation beurteilen.",
    "zahlen": "Aortenklappenring minimal groesser als Pulmonalklappenring",
    "seite": "PDF 15 und 18 / Buch 109 und 112",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Normalbefund Kurzachse Mitralklappenebene: Die Mitralklappe bewegt sich wie ein sich oeffnendes und schliessendes Fischmaul; der Rand ist nahezu glatt, nur an den Muendungspunkten der Chordae tendineae wirkt die Klappe zum Ventrikel hin etwas fransig, zum Vorhof hin ist sie ohne Fransen.",
    "zahlen": "",
    "seite": "PDF 16 und 18 / Buch 110 und 112",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Normalbefund Kurzachse Papillarmuskelebene (Diastole): RV-Wand maximal halb so dick wie das Septum, RV-Lumen maximal die Haelfte des LV-Innendurchmessers, IVS etwa gleich stark wie die freie LV-Wand, LV-Lumen pilzfoermig (Papillarmuskeln), Perikard als weisse Linie.",
    "zahlen": "",
    "seite": "PDF 18 / Buch 112",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Normalbefund Pulmonalklappenebene: Segel duenn und in der Systole vollstaendig oeffnend, keine Einengungen Richtung Bifurkation, beide Pulmonalarterien mit vergleichbarem Durchmesser. Die Bifurkationsmorphologie ist wichtig, um einen PDA zu erkennen.",
    "zahlen": "",
    "seite": "PDF 19 / Buch 113",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Cave zu LA/Ao: bei Aortenhypoplasie ueberschaetzt die Messung die Groesse des linken Vorhofs; die Schnittebene ist grundsaetzlich schlecht reproduzierbar; die LA-Messung wird durch die einmuendenden Pulmonalvenen regelmaessig zur Schaetzung. Die Autoren empfehlen daher, das linke Atrium im 4-Kammer-Blick ohne Verhaeltnisrechnung absolut auszumessen.",
    "zahlen": "",
    "seite": "PDF 19 / Buch 113",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Subxiphoidaler Schnitt: nur fuer die Doppleruntersuchung des linksventrikulaeren Ausflusses, weil Doppler-Messlinie und Blutflussrichtung gut uebereinstimmen. Ankopplung kaudal des Rippenbogens direkt hinter dem Xiphoid, in direkter Verlaengerung der Herzachse.",
    "zahlen": "",
    "seite": "PDF 19-20 / Buch 113-114",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Links apikale Schnitte: Patient wenden; Ankopplung sternumnah im Bereich des Herzspitzenstosses, Referenzmarke kaudodorsal, Schallebene auf die Wirbelsaeule gerichtet; Kabel beim stehenden Hund zum Boden, beim liegenden Richtung Hinterpfoten. Zwischen 4K und 5K wird nur die Anschallung steiler oder flacher gestellt.",
    "zahlen": "Unterschied 4K zu 5K: 10-15 Grad steilere oder flachere Anschallung",
    "seite": "PDF 20-21 / Buch 114-115",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Links parasternaler 2-Kammer-Blick des rechten Herzens beurteilt primaer Morphologie und Bewegung der Trikuspidalklappe. Normalbefund: die Segel entspringen auf gleicher Hoehe, sind nicht in ihrer Bewegung eingeschraenkt und schliessen vollstaendig. Ankopplung ein bis zwei ICR kranial der links apikalen Position, Referenzmarke Richtung Wirbelsaeule, Kabel nach sternal.",
    "zahlen": "1-2 Interkostalraeume weiter kranial",
    "seite": "PDF 22-23 / Buch 116-117",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Links parasternale Darstellung von RVOT, Pulmonalklappe und Pulmonalarterie: dient auch routinemaessig dem Auffinden und Vermessen eines PDA. Rechts und links parasternale Darstellung sind komplementaer. Wird das Signal durch die Inspiration ausgeloescht, hilft es, den Schallkopf weiter zum Sternum zu bewegen und die Schallebene weiter nach dorsal auszurichten.",
    "zahlen": "",
    "seite": "PDF 23-24 / Buch 117-118",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Links parasternale Darstellung des LVOT, Normalbefund: keinerlei Einengung des Ausflusstraktes, Aortenklappensegel zart und vollstaendig oeffnend und schliessend, Bulbus aortae etwas weiter als die Aorta ascendens, diese mit gleichfoermigem Durchmesser. Haeufiger Fehler: Aorta erscheint im Verlauf oval, Aortenwurzel nicht sichtbar - durch Rotation korrigieren.",
    "zahlen": "",
    "seite": "PDF 24 / Buch 118",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Links parasternale Darstellung der Trikuspidalklappe: Klappe frei beweglich und vollstaendig schliessend, kein Tumor darstellbar. In dieser Ebene ist das rechte Herzohr sichtbar; Tumoren des rechten Aurikels sind hier gut zu erkennen.",
    "zahlen": "",
    "seite": "PDF 25 / Buch 119",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Speckle-Tracking analysiert Myokarddeformation und Deformationsgeschwindigkeit (Strain, Strain-Rate) aus den Graustufen des 2D-Bildes. Die Algorithmen sind zwischen den Herstellern uneinheitlich; die Technologie hat derzeit in der Tierkardiologie keinerlei klinische Bedeutung.",
    "zahlen": "",
    "seite": "PDF 25 / Buch 119",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "M-Mode (T-M-Mode, Time-Motion-Mode) ist eine Zeitachsenuntersuchung: eine Messlinie wird ueber definierte Stellen im 2D-Bild gelegt, der Monitor teilt sich in den 2D-Bildabschnitt und den M-Mode, der die Strukturen unterhalb der Linie ueber eine definierte Zeit aufzeichnet.",
    "zahlen": "",
    "seite": "PDF 25 / Buch 119",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Maximale psychische Aufregung erhoeht die Flussgeschwindigkeiten. In Grenzfaellen zusaetzlich heranziehen: zweidimensionales Bild (sichtbare Stenosezeichen), Farb- und pw-Doppler zur Turbulenzdetektion sowie der Vergleich der pw-Geschwindigkeiten im Ausflusstrakt und oberhalb der Semilunarklappen.",
    "zahlen": "Anstieg um mehr als 0,5 m/s ueber die Semilunarklappe ist abnormal",
    "seite": "PDF 13 / Buch 460",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Interpretation der Flussgeschwindigkeit ueber einer Mitralinsuffizienz (Tab. 22.27): im Normbereich sprechen die Werte fuer normale Druckverhaeltnisse; hoehere Werte verlangen Ausschluss von Aortenstenose bzw. systemischer Hypertonie; niedrigere Werte sprechen fuer systemische Hypotonie, hohen linksatrialen Druck oder eine Fehlmessung.",
    "zahlen": "Mitralinsuffizienz 5-6,5 m/s normal; > 6,5 m/s Aortenstenose/systemische Hypertonie ausschliessen; < 5 m/s Hypotonie, hoher LA-Druck oder Fehlmessung",
    "seite": "PDF 14 / Buch 461 (Datei 3) und PDF 1 / Buch 461 (Datei 4)",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "echo",
    "text": "Interpretation der Flussgeschwindigkeit ueber einer Trikuspidalinsuffizienz (Tab. 22.27): darueber liegende Werte weisen auf Double chambered right ventricle, primaere infundibulaere Pulmonalstenose, Pulmonalstenose oder pulmonale Hypertonie hin.",
    "zahlen": "bis 2,8 m/s normale Druckverhaeltnisse; 2,8-3 m/s Grenzbereich (vor allem bei Aufregung); > 3 m/s pathologisch",
    "seite": "PDF 14 / Buch 461 (Datei 3) und PDF 1 / Buch 461 (Datei 4)",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "befundaufbau",
    "text": "Das Buch legt eine feste Reihenfolge fuer jede EKG-Auswertung fest, die immer vollstaendig abgearbeitet werden soll: 1. Herzfrequenz bestimmen, 2. Herzrhythmus bestimmen, 3. mittlere elektrische Herzachse berechnen, 4. Wellen, Zacken und Intervalle messen, 5. Veraenderungen an P-QRS-T beurteilen.",
    "zahlen": "5 Schritte in fester Reihenfolge",
    "seite": "PDF-Seite 15 (Buchseite 2)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Die elektrokardiographische Diagnose darf nie mit der Enddiagnose gleichgesetzt werden. Eine abschliessende Diagnose muss stets auf Anamnese, klinischer Allgemeinuntersuchung und den uebrigen verfuegbaren Untersuchungsbefunden beruhen.",
    "zahlen": "",
    "seite": "PDF-Seite 15 (Buchseite 2)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Bei unregelmaessigem Herzrhythmus verlangt das Buch die Auswertung mehrerer verschiedener Abschnitte des EKG und die Angabe von Maximalwert, Minimalwert und Durchschnittswert der Herzfrequenz sowie der auftretenden Variationen - nicht einer einzelnen Zahl.",
    "zahlen": "Auszugeben sind: HF max, HF min, HF Mittel, Variation",
    "seite": "PDF-Seite 20 (Buchseite 7)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Aufbau eines Fallblattes im Buch, brauchbar als Vorlage fuer eine Befundmaske: rechte Seite mit Kurzinformation zum Patienten, Krankengeschichte, Original-EKG, den zu stellenden Fragen, den Normalwerten der einzelnen elektrokardiographischen Parameter und einer freien Spalte zum Eintragen der selbst ermittelten Werte. Die Folgeseite zeigt denselben Streifen beschriftet (Wellen, Zacken, benannte Arrhythmien) mit einer Tabelle der ermittelten Parameter, hervorgehobenen wichtigen Befunden und dem Antworttext.",
    "zahlen": "",
    "seite": "PDF-Seite 7 (Buchseite VI, Vorwort)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Der Grundlagenteil des Buches deckt genau diese Themen ab: Herzfrequenz, Herzrhythmus, elektrische Herzachse, Wellen, Zacken, Strecken und Intervalle.",
    "zahlen": "",
    "seite": "PDF-Seite 7 (Buchseite VI, Vorwort)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Fahrplan aus dem Inhaltsverzeichnis mit gedruckten Buchseiten - wo die noch fehlenden Zahlenwerte stehen: Bestimmung der Herzfrequenz S. 2, Bestimmung des Herzrhythmus S. 8, Berechnung der mittleren elektrischen Herzachse S. 11, Messung von Wellen/Zacken/Intervallen S. 14, elektrokardiographische Wellen S. 14, Intervalle S. 18, Strecken S. 19.",
    "zahlen": "Buchseiten 2, 8, 11, 14, 14, 18, 19",
    "seite": "PDF-Seite 12 (Buchseite XI)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Das im Buch abgebildete EKG-Befundblatt (je eines fuer Hund und Katze) des kardiologischen Ferndiagnostik-Zentrums der Autoren hat neben der Spalte fuer die Werte des jeweiligen Patienten eine zweite Spalte mit den physiologischen Normwerten. Das ist der Aufbau, den das Buch fuer ein befundfaehiges Blatt zeigt.",
    "zahlen": "zwei Spalten: Patientenwert und Normwert, getrennte Blaetter fuer Hund und Katze",
    "seite": "PDF 26 (Buch 13), Abb.11",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Die Loesungsseiten fuehren eine Befundtabelle \"Untersuchte Parameter\" mit genau elf Zeilen in fester Reihenfolge: Grundrhythmus, Herzfrequenz, Elektrische Herzachse, P-Welle, PR-Intervall, QRS-Komplex, R-Zacke, QT-Intervall, ST-Strecke, T-Welle, Sonstiges. Das ist eine unmittelbar uebernehmbare Vorlage fuer den Befundkopf des Moduls.",
    "zahlen": "11 Zeilen",
    "seite": "PDF 1,3,5,7,9,11,13,15,17,19,21,23,25 (gedruckt 90-114, gerade Buchseiten)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Die P-Welle wird in der Befundtabelle immer als Produkt Dauer mal Amplitude notiert, in der Form \"0,04 s x 0,2 mV\". Alle anderen Zeilen tragen nur eine Groesse.",
    "zahlen": "Format: <Dauer> s x <Amplitude> mV",
    "seite": "PDF 1 (gedruckt 90)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Der Patientenkopf jeder Fallseite hat vier Felder: Rasse, Alter, Geschlecht, Anamnese. Rasse und Alter stehen dort als Freitext (z. B. \"Mischling (6 kg)\", \"5 Monate\"), das Gewicht taucht nur bei Mischlingen als Zusatz auf.",
    "zahlen": "",
    "seite": "PDF 18 (gedruckt 107)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Wo ein Parameter nicht bestimmt wurde, traegt die Befundtabelle einen Gedankenstrich statt einer Zahl. Die elektrische Herzachse ist in zwoelf von dreizehn Loesungen so gefuellt - sie wird also im Routinebefund oft gar nicht bestimmt.",
    "zahlen": "12 von 13 Faellen ohne Achsenangabe",
    "seite": "PDF 3,5,7,9,11,13,15,17,19,21,23,25 (gedruckt 92-114)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Fallbefund Artefaktfall: normaler Sinusrhythmus, alle Messgroessen im Normbereich trotz starker Grundlinienschwankungen.",
    "zahlen": "HF 140 bpm; P 0,04 s x 0,2 mV; PR 0,08 s; QRS 0,05 s; R 1,9 mV; QT 0,22 s; ST normal; T normal",
    "seite": "PDF 3 (gedruckt 92)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Fallbefund puerperale Eklampsie (Yorkshire Terrier, 3 Jahre, weiblich, drei Tage post partum, Schwaeche, Stupor, epileptiforme Episoden): Sinusbradykardie mit wanderndem Schrittmacher.",
    "zahlen": "HF 60 bpm; P 0,03 s x 0,1 mV; PR 0,12 s; QRS 0,04 s; R 1,5 mV; QT 0,28 s; ST normal; T normal",
    "seite": "PDF 5 (gedruckt 94)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Fallbefund Aortenstenose-Verdacht (Boxer, 5 Monate, Herzgeraeusch III/VI, symptomfrei): abgesehen von etwas tieferen T-Wellen unauffaelliges EKG. Ein unauffaelliges EKG schliesst eine angeborene Kardiopathie nicht aus - empfohlen wird Doppler-Ultraschall bei jedem jungen Patienten mit Herzgeraeusch.",
    "zahlen": "HF 150 bpm; P 0,04 s x 0,2 mV; PR 0,10 s; QRS 0,06 s; R 1,7 mV; QT 0,20 s; ST normal; T > 25 % der R-Hoehe",
    "seite": "PDF 10 und 11 (gedruckt 99 und 100)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Fallbefund chronische Klappenendokardiose im fortgeschrittenen Stadium (Jack Russell Terrier, 12 Jahre): P-mitrale plus verbreiterte QRS-Komplexe.",
    "zahlen": "HF 170 bpm; P 0,05 s x 0,3 mV; PR 0,12 s; QRS 0,06 s; R 1,8 mV; QT 0,18 s; ST normal; T > 25 % der R-Hoehe",
    "seite": "PDF 13 (gedruckt 102)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Fallbefund biatriale Dilatation (Zwergspitz, 11 Jahre, systolisches Herzgeraeusch III/VI): P-mitrale und P-pulmonale nebeneinander, zusaetzlich S-Zacken vermerkt. Bemerkenswert ist die kleine R-Zacke von nur 0,6 mV.",
    "zahlen": "HF 150 bpm; P 0,045 s x 0,5 mV; PR 0,09 s; QRS 0,04 s; R 0,6 mV; QT 0,20 s; ST normal; T > 25 % der R-Hoehe; Sonstiges: S-Zacken",
    "seite": "PDF 15 (gedruckt 104)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Fallbefund P-biatriale (Yorkshire Terrier, 13 Jahre, systolisches Herzgeraeusch III/V): Klappenendokardiose zusammen mit Trachealkollaps.",
    "zahlen": "HF 160 bpm; P 0,06 s x 0,5 mV; PR 0,12 s; QRS 0,06 s; R 1,5 mV; QT 0,20 s; ST normal; T normal",
    "seite": "PDF 17 (gedruckt 106)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Ein normales EKG bedeutet nicht, dass keine Herzkrankheit vorliegt. Die chronische Klappenendokardiose ruft vor allem im Anfangsstadium in der Regel keine signifikanten EKG-Veraenderungen hervor; das auskultierte Herzgeraeusch ist eines der sensibelsten Symptome. Diese Einschraenkung gehoert in jeden automatisch erzeugten Befundtext.",
    "zahlen": "",
    "seite": "PDF 19 (gedruckt 108)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Fallbefund unauffaelliges EKG bei Klappenendokardiose (Mischling 6 kg, 11 Jahre, systolisches Herzgeraeusch III/VI, naechtlicher Husten): alle Messgroessen im Normbereich, nur die T-Wellen etwas tiefer.",
    "zahlen": "HF 160 bpm; P 0,04 s x 0,2 mV; PR 0,12 s; QRS 0,04 s; R 1,0 mV; QT 0,18 s; ST normal; T > 25 % der R-Hoehe",
    "seite": "PDF 19 (gedruckt 108)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Fallbefund brachyzephales Syndrom (Bulldogge, 7 Jahre, Roentgen Rechtsherzvergroesserung, kein Herzgeraeusch): einziger auffaelliger Messwert ist die T-Welle ueber 25 Prozent der R-Hoehe. Ohne Herzgeraeusch wurde primaer ein Atemwegsproblem angenommen.",
    "zahlen": "HF 100 bpm; P 0,04 s x 0,1 mV; PR 0,10 s; QRS 0,05 s; R 1,1 mV; QT 0,22 s; ST normal; T > 25 % der R-Hoehe",
    "seite": "PDF 23 (gedruckt 112)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Fallbefund senile chronische Mitralklappeninsuffizienz (Fox-Terrier, 16 Jahre, Herzgeraeusch IV/V): Sinustachykardie mit 180 bpm, P-mitrale und hohe R-Zacke von 2,8 mV bei verbreitertem QRS; als Sonstiges ist ein wandernder Schrittmacher vermerkt. Die 180 bpm werden hier als Tachykardie gewertet, obwohl 180 bei kleinen Rassen noch in der Norm laege - der Fox-Terrier zaehlt fuer das Buch offenbar nicht dazu.",
    "zahlen": "HF 180 bpm; P 0,05 s x 0,2 mV; PR 0,08 s; QRS 0,06 s; R 2,8 mV; QT 0,18 s; ST normal; T normal",
    "seite": "PDF 25 (gedruckt 114)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Die dreizehn Faelle dieses Abschnitts sind ausschliesslich Hunde. Werte fuer Katze, Pferd oder Heimtiere kommen auf den Seiten 90 bis 115 an keiner Stelle vor.",
    "zahlen": "13 Faelle, alle Hund",
    "seite": "PDF 1-26 (gedruckt 90-115)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Aufbau des Buchteils: jede ungerade gedruckte Seite stellt einen Fall mit Anamnese, EKG-Streifen und zwei bis drei Fragen; die folgende gerade Seite bringt Antworttext und Befundtabelle. Ein Modul, das dieses Buch als Lernquelle nutzt, kann diese Paarung uebernehmen.",
    "zahlen": "",
    "seite": "PDF 1-26 (gedruckt 90-115)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Der Seitenbereich gehoert zum Fallteil \"Fall B\" des Buches. PDF-Seite 1 entspricht der gedruckten Buchseite 189, PDF-Seite 23 der Buchseite 211. Es sind die Fallnummern 28 bis 39; jeder Fall belegt zwei Seiten: links Fragestellung + Patientendaten + Normwerttabelle, rechts Loesung + Tabelle \"Untersuchte Parameter\".",
    "zahlen": "PDF-S. 1-23 = Buchseiten 189-211; Faelle 28-39",
    "seite": "PDF-S. 1-23 (Buchseiten 189-211)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Jeder Fall wird nach einem festen Parametersatz befundet. Die Tabelle hat genau diese Zeilen: Grundrhythmus, Herzfrequenz, Elektrische Herzachse, P-Welle, PR-Intervall, QRS-Komplex, R-Zacke, QT-Intervall, ST-Strecke, T-Welle, Sonstiges. Die P-Welle wird als \"Dauer x Amplitude\" angegeben (z. B. 0,04s x 0,2mV).",
    "zahlen": "11 Befundzeilen; P-Welle als Dauer x Amplitude",
    "seite": "PDF-S. 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22 (Buchseiten 190-210)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Zum Patientenkopf jedes Falles gehoeren Rasse, Alter, Geschlecht und Anamnese. Diese vier Angaben stehen auf jeder Fragestellungsseite neben der Normwerttabelle.",
    "zahlen": "",
    "seite": "PDF-S. 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Fall 39 (Irischer Setter, 5 Jahre, weiblich; Anamnese: Erbrechen und Durchfall) beginnt auf der letzten Seite des gelesenen Bereichs. Es steht nur die Fragestellung dort; die Loesung mit Diagnose und Messwerten liegt auf der folgenden Seite ausserhalb des Bereichs.",
    "zahlen": "",
    "seite": "PDF-S. 23 (Buchseite 211), Fall 39",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Auf den Loesungsseiten heisst derselbe Block Untersuchte Parameter und traegt nur die Messwerte des Patienten. Auf den Frageseiten bleibt die Spalte Patient leer, damit der Leser sie ausfuellt.",
    "zahlen": "",
    "seite": "PDF 27 und 28 (Buch 116/117), durchgehend im ganzen Bereich",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Zu jedem Fall gehoert ein Patientenkopf mit vier festen Feldern. Er steht neben der Parametertabelle.",
    "zahlen": "Felder: Rasse, Alter, Geschlecht, Anamnese",
    "seite": "PDF 28 (Buch 117), durchgehend im ganzen Bereich",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Jede Fallseite traegt dieselbe dreispaltige Tabelle: Parameter | Patient | Normwerte, mit den elf Zeilen Grundrhythmus, Herzfrequenz, Elektrische Herzachse, P-Welle, PR-Intervall, QRS-Komplex, R-Zacke, QT-Intervall, ST-Strecke, T-Welle, Sonstiges. Das ist ein direkt uebernehmbares Befundraster.",
    "zahlen": "11 Zeilen, 3 Spalten",
    "seite": "PDF 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45 (Buch 213-233)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Ueber der Messtabelle steht auf jeder Fallseite ein Patientenkopf mit den Feldern Rasse, Alter, Geschlecht und Anamnese. Auf der zugehoerigen Loesungsseite wiederholt sich dieselbe Tabelle unter der Ueberschrift Untersuchte Parameter, dann nur zweispaltig mit den Patientenwerten.",
    "zahlen": "",
    "seite": "PDF 25-46 (Buch 213-234)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Wiederkehrende Struktur der Loesungsseiten: erst die beobachteten EKG-Veraenderungen, dann Ursache bzw. Differentialdiagnose, dann die therapeutische Konsequenz, abschliessend die Messwerttabelle. Genau diese vier Bloecke bilden ein brauchbares Geruest fuer einen automatisch erzeugten Befundtext.",
    "zahlen": "4 Bloecke",
    "seite": "PDF 24-46 (Buch 212-234)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "In der Messwerttabelle wird konsequent zwischen einem Wert, dem Vermerk Normal, dem Vermerk Nicht zu beurteilen und einem Gedankenstrich (nicht vorhanden/nicht anwendbar) unterschieden - zum Beispiel PR Nicht zu beurteilen beim AV-Block III gegenueber P-Welle Gedankenstrich bei supraventrikulaerer Tachykardie. Ein Datenmodell braucht diese drei Nichtwert-Zustaende getrennt.",
    "zahlen": "",
    "seite": "PDF 26, 28, 36, 40 (Buch 214, 216, 224, 228)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "befundaufbau",
    "text": "Das EKG-Kapitel stuetzt sich ausdruecklich auf Tilley (1997), Tilley/Trautvetter/Skrodzki (2003) und Trautvetter et al. (2006); zur ST-Strecken-Verlagerung und QRS-Dauer bei kranken Katzen wird die Dissertation Schwerin (2000, FU Berlin) angefuehrt.",
    "zahlen": "",
    "seite": "PDF 58 = Buch 58",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "befundaufbau",
    "text": "Empfohlener standardisierter Untersuchungsgang der Thoraxaufnahme: Thoraxbegrenzungen, Pleuralraum, Trachea und Bronchien, Mediastinum und Oesophagus, Herzgroesse und -form, Gefaesse, zuletzt Lungenzeichnung.",
    "zahlen": "",
    "seite": "PDF 62 = Buch 62",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "befundaufbau",
    "text": "Empfohlenes Befundungsschema in 11 Schritten: 1. Herzfrequenz (normal/Brady-/Tachykardie), 2. Rhythmus regelmaessig oder unregelmaessig, 3. P-Welle vor jedem QRS?, 4. QRS nach jeder P-Welle?, 5. deskriptive Beurteilung von P-Wellen, QRS-Komplexen, T-Wellen und ST-Segmenten, 6. Vektorbestimmung, 7. PQ-Dauer, 8. QT-Dauer, 9. Extrasystolen (ja/nein, Anzahl pro Minute, Ursprungsorte), 10. andere Abnormitaeten, 11. zusammenfassende Beurteilung.",
    "zahlen": "11 Punkte",
    "seite": "23",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "befundaufbau",
    "text": "Ein von der Norm abweichendes EKG spricht fuer eine primaere oder sekundaere kardiovaskulaere Erkrankung; umgekehrt ist selbst bei schwer herzkranken Patienten ein normales EKG moeglich. Das EKG-Ergebnis ist daher kein alleingueltiges Kriterium und muss durch Roentgen und Echokardiographie ergaenzt werden.",
    "zahlen": "",
    "seite": "21",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "befundaufbau",
    "text": "Inhalt eines Rueckueberweisungsschreibens bzw. Befundbriefs: wiederholte Anamnese, Auskultationsbefund und relevante klinische Befunde, Interpretation mitgegebener Unterlagen (z. B. EKG, Roentgenbilder) aus Sicht des Spezialisten, Befunde der weiterfuehrenden Untersuchungen getrennt von den klinischen Befunden, Diagnose mit Gradeinteilung (CHIEF, NYHA oder ISACHC), Prognose, Therapieempfehlung mit Dosierungshinweisen und Vorschlag fuer den Zeitraum der Kontrolluntersuchungen.",
    "zahlen": "",
    "seite": "5",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "befundaufbau",
    "text": "Teil II des Buches folgt fuer jede Erkrankung einem festen Indexschema mit eigenen Symbolen: Erkrankung, Anamnese, Rassedispositionen, Symptomatik, Auskultationsbefund, typische EKG-Befunde, typische radiologische Befunde, typische Echobefunde (TM, 2DE, PW/CW-Doppler, CFD), Laborergebnisse, Prognose, Therapieprinzipien. Beschriebene Befunde koennen, muessen aber nicht vollstaendig vorliegen.",
    "zahlen": "11 feste Befundrubriken",
    "seite": "PDF 127 = Buchseite 127",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "befundaufbau",
    "text": "Grundsaetzliche Warnung zur Auslegung von Referenzwerten: Normalwerte umfassen in der Regel 95 % der gesunden Population. Ein Patient mit einem Einzelwert ausserhalb des Bereichs ist deshalb nicht automatisch krank. Referenzwerte sind grober Richtwert, nicht alleiniges Beurteilungskriterium.",
    "zahlen": "Referenzbereich = 95 % der gesunden Population",
    "seite": "PDF-Seite 4 (Buchseite 448)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "befundaufbau",
    "text": "Ein EKG soll immer manuell ausgewertet werden, da die Resultate einer vollautomatischen, softwarebasierten Auswertung fehlerhaft sein koennen.",
    "zahlen": "",
    "seite": "PDF 7 (Buch 145)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "befundaufbau",
    "text": "Feste Reihenfolge der Auswertung: 1. Herzfrequenz bestimmen und Rhythmus von Arrhythmie unterscheiden; 2. Verhaeltnis P-Wellen zu QRS-Komplexen bestimmen; 3. Komplexe messen und beurteilen (P-Welle, PQ-Dauer, QRS-Morphologie und -Dauer, ST-Segment und QT-Dauer, T-Welle); 4. Sind Extrasystolen sichtbar? 5. Sind Pausen sichtbar?",
    "zahlen": "5 Auswertungsschritte",
    "seite": "PDF 8 (Buch 146)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "befundaufbau",
    "text": "Tab. 10.5, Verhaeltnis P-Welle zu QRS-Komplex gleich 1: Sinusrhythmus; mit erniedrigter Herzfrequenz Sinusbradykardie; mit erhoehter Herzfrequenz Sinustachykardie; bei periodisch atmungssynchron unregelmaessigen RR-Intervallen respiratorische Sinusarrhythmie.",
    "zahlen": "Pruefbedingung: Anzahl P = Anzahl QRS",
    "seite": "PDF 22 (Buch 160)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "befundaufbau",
    "text": "Tab. 10.5, weniger P-Wellen als QRS-Komplexe: Extrasystolen oder sinuventrikulaerer Rhythmus (Hyperkaliaemie, Hypokalzaemie).",
    "zahlen": "Pruefbedingung: Anzahl P < Anzahl QRS",
    "seite": "PDF 22 (Buch 160)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "befundaufbau",
    "text": "Tab. 10.5, mehr P-Wellen als QRS-Komplexe: AV-Block Grad II und III sowie Vorhofflattern (Flatterwellen) und Vorhofflimmern (f-Wellen).",
    "zahlen": "Pruefbedingung: Anzahl P > Anzahl QRS",
    "seite": "PDF 22 (Buch 160)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "befundaufbau",
    "text": "Tab. 10.5, keine P-Welle bei normalem bis leicht veraendertem QRS-Komplex: Hyperkaliaemie, permanenter Sinusstillstand mit AV-Ersatzrhythmus, sinuatrialer Block mit Ersatzrhythmus, supraventrikulaere Extrasystolen mit P-auf-T-Phaenomen oder Vorhofstillstand mit Ersatzrhythmus.",
    "zahlen": "Pruefbedingung: keine P + QRS normal/leicht veraendert",
    "seite": "PDF 22 (Buch 160)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "befundaufbau",
    "text": "Die Amplituden werden nach Eichung (1 cm = 1 mV) in Ableitung II nach Einthoven gemessen, die Zeiten in derjenigen Ableitung mit der besten Darstellung.",
    "zahlen": "Amplituden in II; Zeiten in bester Ableitung",
    "seite": "PDF 4 / Buch 142",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "befundaufbau",
    "text": "Ein EKG sollte immer manuell ausgewertet werden, da die Resultate einer vollautomatischen, Software-basierten Auswertung fehlerhaft sein koennen.",
    "zahlen": "",
    "seite": "PDF 7 / Buch 145",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "befundaufbau",
    "text": "Vorgegebene Auswertungsreihenfolge: 1. Herzfrequenz bestimmen und Rhythmus von Arrhythmie unterscheiden; 2. Verhaeltnis von P-Wellen zu QRS-Komplexen bestimmen; 3. Messung und Beurteilung von P-Welle, PQ-Dauer, QRS (Morphologie und Dauer), ST-Segment und QT-Dauer, T-Welle; 4. Sind Extrasystolen sichtbar? 5. Sind Pausen sichtbar?",
    "zahlen": "5 Schritte",
    "seite": "PDF 8 / Buch 146",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "befundaufbau",
    "text": "Tab. 10.5, Verhaeltnis P-Welle zu QRS-Komplex: Anzahl P = Anzahl QRS bedeutet Sinusrhythmus; bei niedriger Frequenz Sinusbradykardie, bei hoher Frequenz Sinustachykardie; periodisch atmungssynchron unregelmaessige RR-Intervalle bedeuten respiratorische Sinusarrhythmie.",
    "zahlen": "P:QRS = 1:1",
    "seite": "PDF 22 / Buch 160",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "befundaufbau",
    "text": "Tab. 10.5: Weniger P-Wellen als QRS-Komplexe bedeutet Extrasystolen oder sinuventrikulaerer Rhythmus (Hyperkaliaemie, Hypokalzaemie).",
    "zahlen": "P < QRS",
    "seite": "PDF 22 / Buch 160",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "befundaufbau",
    "text": "Tab. 10.5: Mehr P-Wellen als QRS-Komplexe bedeutet AV-Block Grad II und III oder Vorhofflattern (Flatterwellen) bzw. Vorhofflimmern (f-Wellen).",
    "zahlen": "P > QRS",
    "seite": "PDF 22 / Buch 160",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "befundaufbau",
    "text": "Untersuchungsgang 4K standardisiert und bei jedem Blick streng gleich: im Bild von oben nach unten, also zuerst rechte Herzhaelfte, dann Vorhoefe, dann linker Ventrikel, dann Perikardstruktur.",
    "zahlen": "",
    "seite": "PDF 5-6 / Buch 99-100",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   },
   {
    "thema": "bedienung",
    "text": "Vagusmanoever als diagnostischer Test bei Tachykardie: atriale Tachykardie spricht in der Regel darauf an und laesst sich ueber mehrere Sekunden aufheben. Drei Techniken werden genannt: Druck auf die Augaepfel (Bulbusdruck), Massage des Carotissinus (Carotissinusdruck), Auflegen von Eiswuerfeln auf Gesicht oder Kopf. In den meisten Faellen stellt sich dadurch wieder ein normaler Sinusrhythmus ein.",
    "zahlen": "Wirkdauer mehrere Sekunden",
    "seite": "PDF 7 (gedruckt 96)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "bedienung",
    "text": "Zur Demaskierung der P-Wellen bei hoher Frequenz kann eine Vagusstimulation durch Bulbusdruck oder Karotissinusdruck durchgefuehrt werden; sinken die Frequenz und werden normale P-Wellen sichtbar, spricht das fuer einen Sinusrhythmus hoher Frequenz.",
    "zahlen": "",
    "seite": "PDF-S. 16 (Buchseite 204), Fall 35",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "bedienung",
    "text": "Gegenmassnahmen gegen Aliasing: niedrigere Scannerfrequenz waehlen, PRF ueber neue Messtore in Schallkopfnaehe erhoehen (HPRF, erschwert aber die Jet-Lokalisierung), Nulllinie verschieben oder die Messtiefe verringern. Je tiefer das sample volume liegt, desto niedriger ist die erzielbare Pulsrepetitionsrate.",
    "zahlen": "",
    "seite": "PDF 89 = Buch 89",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "darstellung-druck",
    "text": "Alle im Buch abgebildeten EKG-Streifen sind bewusst einheitlich gestaltet und haben eine Laenge von 15 cm - das ist zugleich die Streifenlaenge, die bei 50 mm/s 3 s abdeckt.",
    "zahlen": "Streifenlaenge 15 cm",
    "seite": "PDF-Seite 7 (Buchseite VI, Vorwort)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "darstellung-druck",
    "text": "Beispielbild Normaler Sinusrhythmus: Hund (Dobermann) mit Vorschub 25 mm/s, Amplitude 10 mm/mV, Einthoven-Gliedmassenableitung II; Katze mit Vorschub 25 mm/s, Amplitude 10 mm/mV, Gliedmassenableitungen I bis III.",
    "zahlen": "25 mm/s; 10 mm/mV",
    "seite": "PDF 10 (Buch 148)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "darstellung-druck",
    "text": "Rechenbeispiel aus der Bildlegende zur respiratorischen Arrhythmie (DSH): Vorschub 25 mm/s, Amplitude 10 mm/mV, Einthoven-Ableitungen II und III; 15 cm entsprechen 6 s; durchschnittliche Herzfrequenz 8 mal 10 gleich 80 Schlaege/min.",
    "zahlen": "25 mm/s; 15 cm = 6 s; 8 Komplexe x 10 = 80/min",
    "seite": "PDF 12 (Buch 150)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "darstellung-druck",
    "text": "Beispiel Sinustachykardie ist einmal mit Papiervorschub 50 mm/s und einmal mit 100 mm/s abgebildet; 100 mm/s wird als Vorschub fuer schnelle Rhythmen verwendet.",
    "zahlen": "50 mm/s und 100 mm/s",
    "seite": "PDF 15 (Buch 153)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "darstellung-druck",
    "text": "Abb. 10.12 (normaler Sinusrhythmus Hund und Katze) wurde mit Vorschub 25 mm/s und Amplitude 10 mm/mV aufgezeichnet; beim Hund Einthoven-Ableitung II, bei der Katze Ableitungen I bis III.",
    "zahlen": "25 mm/s; 10 mm/mV",
    "seite": "PDF 10 / Buch 148",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "darstellung-druck",
    "text": "Abb. 10.13 (respiratorische Arrhythmie, Deutscher Schaeferhund): Vorschub 25 mm/s, Amplitude 10 mm/mV, Einthoven-Ableitungen II und III; 15 cm entsprechen 6 s; durchschnittliche Herzfrequenz 8 x 10 = 80 Schlaege/min.",
    "zahlen": "25 mm/s; 10 mm/mV; 15 cm = 6 s; 8 x 10 = 80/min",
    "seite": "PDF 12 / Buch 150",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "darstellung-druck",
    "text": "Abb. 10.14 (wandernder Schrittmacher innerhalb eines grossen Sinusknotens beim Hund): Die P-Welle veraendert sich in der Hoehe, weil die Vorhoferregung einen anderen Verlauf nimmt. Das Phaenomen kann leicht mit Vorhofextrasystolen verwechselt werden. Vorschub 50 mm/s, Amplitude 10 mm/mV, Ableitung II.",
    "zahlen": "50 mm/s; 10 mm/mV",
    "seite": "PDF 13 / Buch 151",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "darstellung-druck",
    "text": "Abb. 10.16 zeigt eine Sinustachykardie einmal mit Papiervorschub 50 mm/s (a) und einmal mit 100 mm/s (b).",
    "zahlen": "50 mm/s; 100 mm/s",
    "seite": "PDF 15 / Buch 153",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "sonstiges",
    "text": "Grober Aufbau des Bandes nach Inhaltsverzeichnis: EKG-Interpretation ab Buchseite 39, Abschnitt A (haeufig vorkommende, einfachere Faelle) ab S. 39, Abschnitt B (komplexere Faelle) ab S. 135, Anhang ab S. 275, Arzneimitteltabelle S. 276, Literatur S. 285, Sachverzeichnis S. 287.",
    "zahlen": "Buchseiten 39, 39, 135, 275, 276, 285, 287",
    "seite": "PDF-Seite 12 (Buchseite XI)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "sonstiges",
    "text": "Abkuerzungsverzeichnis des Buches, relevant fuer die spaetere Befundschreibung: MEA = mittlere elektrische Herzachse, bpm = Schlaege pro Minute, SVES = supraventrikulaere Extrasystole, VES = ventrikulaere Extrasystole, VT = ventrikulaere Tachykardie, AT = atriale Tachykardie, AVER = AV-Ersatzrhythmus, HCM = hypertrophe Kardiomyopathie, HOCM = hypertrophe obstruktive Kardiomyopathie, KOF = Koerperoberflaeche, KM = Koerpermasse, mEq = Milliaequivalent, mV = Millivolt, DTI = Dauertropfinfusion.",
    "zahlen": "Einheiten: bpm, mV, mEq, mg, ml, ng, µg, s, min, kg",
    "seite": "PDF-Seite 11 (Buchseite X)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "sonstiges",
    "text": "Dosierungskuerzel des Buches fuer die spaetere Arzneimitteltabelle: SID = einmal taeglich, BID = zweimal taeglich, TID = dreimal taeglich, QID = viermal taeglich; ggr. = geringgradig; Applikationswege i.m., i.v., p.o., s.c.",
    "zahlen": "SID=1x/d, BID=2x/d, TID=3x/d, QID=4x/d",
    "seite": "PDF-Seite 11 (Buchseite X)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "sonstiges",
    "text": "Quellenangabe zur Zitierfaehigkeit: Joaquin Bernal, EKG-Interpretation in der Kleintierpraxis, Schluetersche Verlagsgesellschaft Hannover 2011, ISBN 978-3-89993-074-0; deutsche Uebertragung von Gertrude Edtstadtler-Pietsch, mit einem Beitrag von PD Dr. Marianne Skrodzki; spanisches Original 'Manual practico de interpretacion electrocardiografica', Servet 2008, ISBN 978-84-935971-9-1. Das Material stammt aus dem Archiv von Cardiovet (Zentrum fuer kardiologische Ferndiagnostik, Madrid) und besteht aus Hunde-EKG.",
    "zahlen": "",
    "seite": "PDF-Seiten 4-5 und 7 (Buchseiten III-IV, VI)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "sonstiges",
    "text": "Wichtige Einschraenkung fuer die Uebertragung auf ein Praxismodul: die Sammlung ist als repraesentativer Querschnitt durch die Kardiologie des HUNDES angelegt (angestrebt waren 120 repraesentative Hunde-EKG). Aussagen zur Katze kommen im gelesenen Bereich nur als Randbemerkung vor (regelmaessiger Rhythmus), Pferd oder Heimtiere werden auf diesen Seiten nicht erwaehnt.",
    "zahlen": "Zielumfang 120 Hunde-EKG",
    "seite": "PDF-Seite 7 (Buchseite VI, Vorwort)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "sonstiges",
    "text": "Weitere Ursachen von Bradykardie mit QT-Verlaengerung ausser Elektrolytstoerungen: Hypothermie, Ethylenglykol-Intoxikation und die Verabreichung von Antiarrhythmika.",
    "zahlen": "",
    "seite": "PDF 5 (gedruckt 94)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "sonstiges",
    "text": "Weil eine Extrasystole nur eine kurze vorzeitige diastolische Phase hat, fuellt sich der Ventrikel nicht ausreichend und die Kontraktion erzeugt keine ausreichende Pumpaktion. Klinische Folge ist ein Pulsdefizit, das man erkennt, wenn man gleichzeitig das Herz auskultiert und den Puls an der A. femoralis palpiert.",
    "zahlen": "",
    "seite": "PDF-S. 2 (Buchseite 190), Fall 28",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "sonstiges",
    "text": "Die hypokinetische Phase des Schocks geht mit einer niedrigen Herzfrequenz einher; zusammen mit frakturbedingten Schmerzen oder traumatischer Myokardhypoxie bzw. Myokardkontusion erklaert das VES nach einem Unfall.",
    "zahlen": "",
    "seite": "PDF-S. 10 (Buchseite 198), Fall 32",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "sonstiges",
    "text": "Grundsatz zur Empfindlichkeit des EKG: eine chronische Klappenendokardiose kann ganz ohne erkennbare EKG-Veraenderungen bestehen. Lassen sich dagegen EKG-Zeichen einer Hypertrophie oder Dilatation nachweisen, ist der Prozess in der Regel bereits fortgeschritten. Ein unauffaelliges EKG schliesst eine Herzerkrankung also nicht aus.",
    "zahlen": "",
    "seite": "PDF 43 (Buch 132)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "sonstiges",
    "text": "Gleicher Grundsatz fuer die Aortenstenose: in den ersten Phasen muessen sich weder im EKG noch im Roentgenbild Auffaelligkeiten zeigen, da die Druckueberlastung sich als linksventrikulaere Hypertrophie ausdrueckt, die von diesen Untersuchungen nicht unbedingt entdeckt wird.",
    "zahlen": "",
    "seite": "PDF 41 (Buch 130)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "sonstiges",
    "text": "Eine Roentgenuntersuchung des Thorax kann eine Linksherzvergroesserung bestaetigen; typisch fuer eine Mitralklappenendokardiose waeren ein vergroesserter linker Vorhof und ein Lungenoedem. Sie eignet sich ausserdem zum Nachweis von Neoplasien oder Atemwegserkrankungen, die ein P-pulmonale erklaeren wuerden.",
    "zahlen": "",
    "seite": "PDF 37 (Buch 126)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "sonstiges",
    "text": "Die chronische atrioventrikulaere Klappenendokardiose entwickelt sich in der Regel erst ab dem siebten bis achten Lebensjahr; der Cavalier King Charles Spaniel hat jedoch eine Rassepraedisposition fuer eine sehr frueh einsetzende und rasch progrediente Form. Rasse und Alter aendern also die Vortestwahrscheinlichkeit.",
    "zahlen": "ab 7.-8. Lebensjahr",
    "seite": "PDF 32 (Buch 220)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "sonstiges",
    "text": "Differentialdiagnosen des persistierenden Vorhofstillstands: Digitalisintoxikation, Hyperkaliaemie sowie Muskeldystrophie - eine beim Englischen Springer Spaniel und anderen Rassen beschriebene hereditaere Erkrankung mit Fibrose der Vorhofmyozyten, die in der Regel per Ausschluss diagnostiziert wird.",
    "zahlen": "",
    "seite": "PDF 40 (Buch 228)",
    "werk": "EKG-Interpretation in der Kleintierpraxis"
   },
   {
    "thema": "sonstiges",
    "text": "Alters- und Formvariationen: bei der Katze richtet sich das Herz ab einem Alter von etwa 7 Jahren zunehmend horizontal aus, nimmt mehr Sternumkontakt auf und der Aortenbogen tritt kraniodorsal hervor; Jungtiere beider Arten haben etwas groessere Herzen, adipoese Tiere koennen in DV/VD eine Kardiomegalie vortaeuschen.",
    "zahlen": "ab ca. 7 Jahren (Katze)",
    "seite": "PDF 62 = Buch 62",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Pleuralerguss im Roentgen: Pleuralfissuren, unscharfe Abgrenzung von Herz und Zwerchfell, lobaere Lungenzeichnung und vergroesserter Abstand zwischen Zwerchfellslappen und Wirbelsaeule - bei der Katze sind dabei 2 Wirbelkoerper Abstand normal (im Beispiel auf 3 Wirbelkoerper erweitert).",
    "zahlen": "Katze normal 2 Wirbelkoerper Abstand",
    "seite": "PDF 72/73 = Buch 72/73",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Kardiales Lungenoedem: akut beim Hund meist perihilaer, symmetrisch, zur Peripherie abnehmend; bei der Katze fleckig, asymmetrisch und mehr ventral. Chronisch: Maskierung der Gefaesszeichnung und Aerobronchogramme.",
    "zahlen": "",
    "seite": "PDF 71 = Buch 71",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Technische Kenndaten der Herzkatheterisierung: diagnostische Katheter meist 4 bis 7 French (1 French = 0,33 mm) mit 50 bis 110 cm Laenge; Fuehrungsdraehte 100 bis 400 cm; Spuelung mit verduennter Heparinloesung 5000 IE auf 500 ml 0,9 % NaCl; im Bildbeispiel 5 French = 1,6 mm und 4 French = 1,3 mm.",
    "zahlen": "4-7 F; 1 F = 0,33 mm; 50-110 cm; Draht 100-400 cm; Heparin 5000 IE/500 ml NaCl 0,9 %",
    "seite": "PDF 75/76 = Buch 75/76",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Periinterventionelles Vorgehen: mindestens 12 Stunden nuechtern (orale Herzmedikamente weitergeben), Narkoseerhaltung mit Isofluran 1,5-1,7 %, Beatmung meist mit 50 % Sauerstoff, fuer Shuntberechnungen muss FiO2 bei etwa 21 % liegen; postoperativ 8-12 Stunden Druckverband und 12- bis 24-stuendige Ueberwachung von EKG und Blutdruck.",
    "zahlen": "12 h nuechtern; Isofluran 1,5-1,7 %; FiO2 ca. 21 % fuer Shuntrechnung; Druckverband 8-12 h; Monitoring 12-24 h",
    "seite": "PDF 74-76 = Buch 74-76",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Selektive Angiokardiographie: ueber Hochdruckinjektor und Angiographiekatheter muessen 0,5-1,0 ml/kg Koerpermasse Kontrastmittel innerhalb etwa 1 Sekunde injizierbar sein; meist genuegt die Aufzeichnung im latero-lateralen Strahlengang.",
    "zahlen": "0,5-1,0 ml/kg KM in ca. 1 s",
    "seite": "PDF 78 = Buch 78",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Elektrophysiologische Untersuchung: drei Katheter mit jeweils mehreren Elektroden in rechtem Vorhof, rechtem Ventrikel und Sinus coronarius zeichnen die intrakardiale Erregungsausbreitung auf; Anwendung bei Aufdeckung und Therapie akzessorischer Leitungsbahnen.",
    "zahlen": "3 Katheter (RA, RV, Sinus coronarius)",
    "seite": "PDF 78 = Buch 78",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "CT des Herzens: Schichtdicken von etwa 2 mm, Patient mindestens tief sediert; Bewegungsunschaerfe stoert derzeit die Herzbeurteilung, EKG-getriggerte Aufnahmen bzw. Cine-CT sollen das aendern. Beim MRT ermoeglichen EKG-getriggerte Aufnahmen die Erfassung von Kammervolumina, Myokardmasse und funktionellen Indizes.",
    "zahlen": "Schichtdicke ca. 2 mm",
    "seite": "PDF 79/80 = Buch 79/80",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Die in der Humanmedizin uebliche Computerauswertung des EKG ist in der Tiermedizin ueberwiegend unzuverlaessig.",
    "zahlen": "",
    "seite": "23",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Grundlage der EKG-Terminologie: nach Einthoven steht P fuer die Vorhoferregung, QRS fuer die Kammererregung und T fuer die Kammerrepolarisation. Das EKG zeigt nur die Erregungsleitung innerhalb des Herzens, nicht die tatsaechliche Auswurfleistung.",
    "zahlen": "",
    "seite": "21",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Als weiterfuehrende Literatur fuer Terminologie und Interpretation von Hunde- und Katzen-EKGs nennt das Kapitel Tilley (1997), Tilley, Trautvetter und Skrodzki (2003) sowie Trautvetter et al. (2006).",
    "zahlen": "",
    "seite": "21",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Die kapillaere Fuellungszeit (KFZ) soll nach spaetestens zwei Sekunden wieder hergestellt sein; ueber zwei Sekunden verlaengert weist sie auf verminderte Perfusionsleistung, hohen Sympathikotonus, Vasokonstriktion, Dehydratation oder Schock hin. Verkuerzt kann sie bei Anaemien sein.",
    "zahlen": "KFZ Normwert bis 2 s",
    "seite": "14",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Bei klinisch relevanten Arrhythmien, etwa Vorhofflimmern und paroxysmaler Tachykardie, tritt ein Pulsdefizit auf: die ueber dem Herzen auskultierte Frequenz ist hoeher als die peripher an der A. femoralis getasteten, voellig unregelmaessigen Pulsschlaege.",
    "zahlen": "",
    "seite": "15 und 17",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Auskultation: Herz und Lunge werden getrennt und systematisch mindestens zwei Minuten auf beiden Thoraxseiten geprueft, moeglichst am stehenden Tier. Bei Tachykardie kann die Herzfrequenz durch Druck mit der flachen Hand auf beide Augaepfel deutlich gesenkt werden.",
    "zahlen": "mind. 2 Minuten je Thoraxseite",
    "seite": "16",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Tabelle 3.5, Puncta maxima Hund: Pulmonalklappe links 3. ICR parasternal unterhalb der kostalen Knorpel-Knochen-Grenze; Aortenklappe links 3.-4. ICR etwas oberhalb dieser Grenze; Mitralklappe links 5.-6. ICR auf Hoehe der Grenze; Trikuspidalklappe rechts 3.-4. ICR auf Hoehe der Grenze.",
    "zahlen": "Hund: Pulmonalis li 3. ICR; Aorta li 3.-4. ICR; Mitralis li 5.-6. ICR; Trikuspidalis re 3.-4. ICR",
    "seite": "16",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Tabelle 3.5, Puncta maxima Katze: Pulmonalklappe links 2.-3. ICR auf halber dorsoventraler Distanz zwischen Sternum und Wirbelsaeule; Aortenklappe links 3.-4. ICR im oberen Drittel dieser halben Distanz; Mitralklappe links 4.-5. ICR im ventralen Viertel der Distanz; Trikuspidalklappe rechts 4.-5. ICR parasternal.",
    "zahlen": "Katze: Pulmonalis li 2.-3. ICR; Aorta li 3.-4. ICR; Mitralis li 4.-5. ICR; Trikuspidalis re 4.-5. ICR",
    "seite": "16",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Ueber 90 % der bei Hund und Katze auskultierbaren Herzgeraeusche sind systolische Geraeusche.",
    "zahlen": "> 90 %",
    "seite": "18",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Lautstaerkegrade der Herzgeraeusche: Einteilung in fuenf Grade nach Detweiler und Patterson (1965) von 1/5 bis 5/5 sowie Einteilung in sechs Grade von 1/6 bis 6/6, wobei ab Grad 4/6 ein Schwirren an der seitlichen Brustwand tastbar ist. Die Intensitaet korreliert nicht mit dem Schweregrad der Erkrankung.",
    "zahlen": "1/5 bis 5/5; 1/6 bis 6/6; Schwirren ab 4/6",
    "seite": "20",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Ein Herzgeraeusch muss nach sechs Merkmalen beschrieben werden: zeitliches Auftreten im Herzzyklus (systolisch, diastolisch, kontinuierlich), Geraeuschform (spindelfoermig bzw. bandfoermig), zeitliches Auftreten innerhalb von Systole/Diastole (proto = frueh, meso = Mitte, tele = spaet, holo = ganz), Punctum maximum, Ausstrahlung und Lautstaerke.",
    "zahlen": "6 Merkmale",
    "seite": "18",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Differentialdiagnostische Zeitgrenze bei Atemsymptomen: Husten bzw. Dyspnoe von weniger als acht Wochen Dauer gelten als akut, laenger bestehende als chronisch.",
    "zahlen": "8 Wochen",
    "seite": "12",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Kardial bedingte Anfaelle (Adams-Stokes-Anfaelle) koennen durch jede Rhythmusstoerung ausgeloest werden, die zur zentralen Hypoxie fuehrt. Arrhythmogene Ursachen sind Sinusbradykardie, Sick-Sinus-Syndrom, SA- oder hoehergradige AV-Blockierungen, supraventrikulaere Tachykardie und Kammertachykardie; sie treten meist nach physischer oder psychischer Belastung auf, mit sofortiger postiktaler Erholung (Abgrenzung zur Epilepsie).",
    "zahlen": "",
    "seite": "13",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Blutdruck-Referenzwerte in mmHg unter Praxisbedingungen (Tabelle 7.1), Spaltenkopf Katze vor Hund. Katze: Normotonie Doppler-SAD 100-175, oszillometrisch SAD 100-145 und DAD 65-100, Mittelwert 133/75; Grenzbereich 175-185 bzw. 150-160 und 101-115; Hypertonie ueber 185 bzw. ueber 160 und ueber 115; Hypotonie unter 100 bzw. unter 80 und kleiner/gleich 60.",
    "zahlen": "Katze: normal 100-175 (Doppler SAD), 100-145/65-100 (osz.), Mittel 133/75; Grenzbereich 175-185 / 150-160 / 101-115; Hyperton >185 / >160 / >115; Hypoton <100 / <80 / <=60",
    "seite": "PDF 114 = Buchseite 114 (Tab. 7.1)",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Fortsetzung Tabelle 7.1, zweiter Block (Spaltenkopf Hund): Normotonie Doppler-SAD 85-179, oszillometrisch SAD 100-160 und DAD 60-100, Mittelwert 128/84; Grenzbereich 180-200 bzw. 161-170 und 101-110; Hypertonie ueber 200 bzw. ueber 170 und ueber 110; Hypotonie unter 85 bzw. unter 100 und unter 60.",
    "zahlen": "Hund: normal 85-179 (Doppler SAD), 100-160/60-100 (osz.), Mittel 128/84; Grenzbereich 180-200 / 161-170 / 101-110; Hyperton >200 / >170 / >110; Hypoton <85 / <100 / <60",
    "seite": "PDF 114 = Buchseite 114 (Tab. 7.1)",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Der Fliesstext nennt abweichende Hypertoniegrenzen: beim Hund systolisch 175 mmHg (Doppler) bzw. 160 mmHg (Oszillometrie), der oszillometrische diastolische Grenzbereich liegt etwa bei 100-110 mmHg. Bei Katzen gilt Blutdruck als hyperton ueber 180 mmHg systolisch im Doppler bzw. ueber 160/100 mmHg oszillometrisch.",
    "zahlen": "Hund: >175 mmHg Doppler, >160 mmHg oszillometrisch, DAD-Grenzbereich 100-110; Katze: >180 mmHg Doppler, >160/100 mmHg oszillometrisch",
    "seite": "PDF 116 = Buchseite 116",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Arterielle Hypotonie bei Hund und Katze: systolischer Druck unter 100 mmHg gilt als maessige, unter 80 mmHg als schwere Hypotonie. Klinische Zeichen sind schwacher Puls, blasse Schleimhaeute und eine kapillaere Fuellungszeit von 2 Sekunden oder mehr.",
    "zahlen": "SAD < 100 mmHg maessig, < 80 mmHg schwer; KFZ >= 2 s",
    "seite": "PDF 119 = Buchseite 119",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Manschettenwahl bei der indirekten Blutdruckmessung: die Breite des aufblasbaren Teils soll beim Hund 40 %, bei der Katze 30 % des Beinumfangs an der Messstelle betragen; praktisch etwa 5 cm beim Hund am Unterarm, 2 cm (selten 3 cm) bei der Katze. Zu schmale Manschette misst zu hoch, zu breite eher zu niedrig - im Zweifel die breitere waehlen.",
    "zahlen": "Manschettenbreite Hund 40 %, Katze 30 % des Beinumfangs; Hund ca. 5 cm, Katze 2 (selten 3) cm",
    "seite": "PDF 115 = Buchseite 115",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Messprotokoll Blutdruck: pro Untersuchung mindestens fuenf, besser sieben Einzelmessungen, in jedem Fall so viele, bis die Streuung der Einzelwerte unter 10 mmHg liegt. Als Endwert dient der Durchschnitt der drei naechstgelegenen Einzelwerte oder der Median; der Messort soll auf Herzhoehe liegen, guenstig ist Brust-Bauch-Lage.",
    "zahlen": "5-7 Einzelmessungen; Streuung < 10 mmHg; Mittel der 3 naechstliegenden Werte oder Median",
    "seite": "PDF 115 = Buchseite 115",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Doppler-Messung: Manschette in der Mitte des Unterarms bzw. Unterschenkels proximal der Sonde, aufpumpen auf etwa 20 mmHg ueber den Druck, bei dem das Dopplersignal verschwindet; das wiederkehrende Stroemungsgeraeusch beim langsamen Ablassen markiert den systolischen Druck. Nachteil: diastolische Werte und kontinuierliche Messung sind nicht moeglich.",
    "zahlen": "Aufpumpen ca. 20 mmHg ueber Verschwinden des Signals",
    "seite": "PDF 115 = Buchseite 115",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Oszillometrische Messung: der Manschettendruck muss den zur Gefaesskompression noetigen Druck um etwa 30-40 mmHg uebersteigen. Oszillometrisch gemessene systolische Werte liegen bis 180 mmHg rund 15 % niedriger als Dopplerwerte, der Messfehler nimmt mit steigendem Blutdruck zu.",
    "zahlen": "Manschettendruck +30 bis +40 mmHg; oszillometrisch ca. 15 % niedriger als Doppler (bis 180 mmHg)",
    "seite": "PDF 116 = Buchseite 116",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Manschetten- und Sondenpositionen nach Bodey u. Michell 1996 (Tabelle 7.2): Manschette Vordergliedmasse proximal des Karpus - Sonde distal des Karpus palmar - A. mediana; Manschette Hintergliedmasse distal des Tarsus - Sonde distal des Tarsus plantar - A. plantaris mediana; Manschette Hintergliedmasse proximal des Tarsus - Sonde distal des Tarsus dorsomedial - A. saphena; Manschette Schwanzansatz - Sonde am Schwanz distal ventral - A. coccygea mediana.",
    "zahlen": "4 Messorte",
    "seite": "PDF 116 = Buchseite 116 (Tab. 7.2)",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Kardiales Troponin I/T ist ein akutes Diagnostikum und 4 Stunden bis zu 1 Woche nachweisbar. Erhoehungen sind experimentell u. a. bei Myokardinfarkt, Babesiose-assoziierter Myokarditis, Kontusion, Doxorubicin-induzierter DCM, kongestiver Herzinsuffizienz und myokardialer Dysfunktion nach Magendrehung nachgewiesen; beim Menschen auch bei Arrhythmien.",
    "zahlen": "Troponin I/T nachweisbar 4 h bis 1 Woche",
    "seite": "PDF 121 = Buchseite 121",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Fuer die Hypertrophe Kardiomyopathie der Maine-Coon-Katze ist ein autosomal dominanter Erbgang nachgewiesen und das MYBPC-Gen identifiziert. Der Gentest ist nur zusammen mit einem echokardiographischen Status sinnvoll zu interpretieren; moegliche Ergebnisse sind homozygot positiv, heterozygot positiv oder homozygot negativ.",
    "zahlen": "3 moegliche Testergebnisse",
    "seite": "PDF 122 = Buchseite 122",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Auskultationsorte der Shuntvitien: beim Atrialen Septumdefekt entsteht durch die relative Pulmonalstenose ein leises Crescendo-Decrescendo-Systolikum im 3. Interkostalraum, ein gespaltener zweiter Herzton ist moeglich. Beim kleinen VSD ist ein lautes, rau klingendes systolisches Geraeusch am deutlichsten im 4./5. ICR rechts ueber der Herzspitze bzw. parasternal hoerbar, teils als Schwirren tastbar.",
    "zahlen": "ASD: 3. ICR; VSD: 4./5. ICR rechts",
    "seite": "PDF 128 und 134 = Buchseite 128, 134",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Warnung vor Fehlinterpretation traeger Herzen: hypokinetisch wirkende Herzen koennen herzferne Ursachen haben (z. B. Hypothyreose), 'traege' wirken auch bradykarde Herzen und Tiere unter Beta-Rezeptorblockertherapie. Einige Rassen und besonders trainierte Hunde haben physiologisch niedrige Verkuerzungsfraktion - aus einem isoliert betrachteten Wert darf nie eine Diagnose fuer das Gesamtorgan abgeleitet werden.",
    "zahlen": "",
    "seite": "PDF 103 = Buchseite 103",
    "werk": "Kompakt Kleintierkardiologie"
   },
   {
    "thema": "sonstiges",
    "text": "Am Seitenanfang von Buchseite 429 endet die Beschreibung eines auf der vorangehenden Seite begonnenen Wirkstoffs zur Notfalltherapie der systemischen Hypertension. Der Wirkstoffname steht nicht in diesem Auszug; angegeben sind Katzendosis, Monitoring von Blutdruck und Blutbild sowie der Hinweis, dass das Mittel nicht dem Besitzer fuer die haeusliche Therapie mitgegeben werden soll.",
    "zahlen": "Katze 2,5 mg/Katze 2x taeglich (stationaere Therapie der systemischen Hypertension)",
    "seite": "PDF-Seite 1 (Buchseite 429)",
    "werk": "Praxis der Kardiologie: 24-Stunden-EKG"
   },
   {
    "thema": "sonstiges",
    "text": "Ladungen, die auf eine positiv gepolte Elektrode zulaufen, werden als positiver Ausschlag oberhalb der Grundlinie dargestellt. Die P-Welle ist deshalb immer positiv, die Q-Zacke (AV-Knoten-nahes Septum, Ladung laeuft von der positiven Elektrode weg) negativ, die R-Zacke positiv.",
    "zahlen": "",
    "seite": "PDF 1-2 (Buch 139-140)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "sonstiges",
    "text": "Legende zu Tab. 10.7: ++ bedeutet deutlich mehr als normal, + mehr als normal, - weniger als normal.",
    "zahlen": "",
    "seite": "PDF 27 (Buch 165)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "sonstiges",
    "text": "PDF-Seite 42 ist eine ganzseitige Herstelleranzeige (Televet, Dr. Otto Fischer GmbH), kein Buchtext. Genannte Geraetemerkmale: Aufzeichnung bis zu 3 Tage, drahtlose EKG-Uebertragung ueber ca. 100 m, interne Speicherung auf microSD, Nutzung als Ruhe-, Belastungs-, Holter- und Foetus-EKG (Stute), fuer Kleintiere und Pferde.",
    "zahlen": "bis 3 Tage; ca. 100 m Funkreichweite",
    "seite": "PDF 42 (Anzeigenseite ohne Buchpaginierung)",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "sonstiges",
    "text": "Die Normwerttabelle Tab. 10.1 ist im Buch mit Quelle [20] belegt: Smith FWK, Tilley LP, Oyama M, Sleeper MM. Manual of Canine and Feline Cardiology. 5th ed. Toronto: Elsevier; 2016.",
    "zahlen": "",
    "seite": "PDF 9 / Buch 147",
    "werk": "Praxis der Kardiologie: Anfertigung des EKGs"
   },
   {
    "thema": "sonstiges",
    "text": "Aus dem Sachverzeichnis (S. 467) lassen sich die Fundstellen der EKG-Kriterien im selben Buch ablesen, die in den hier gelesenen Abschnitten fehlen. Diese Seiten liegen in anderen Dateien des Ordners.",
    "zahlen": "AV-Block Grad I 160, 334-335, 338; Grad II 160, 334-335, 338; Grad III 162, 334, 336, 338; Mobitz-Typ I 160, 335; Mobitz-Typ II 161, 336; sinuatrialer Block 339; Asystolie 168; Bigeminus 168; Arrhythmien 44, 52, 333, 420; supraventrikulaere Arrhythmien 344; Brustwandableitungen 139; Atrioventrikularknoten 21, 139; Cornell-Index 121, 445; Bernoulli-Formel 129, 446; Auswurffraktion 105; Auswurfzeit 123",
    "seite": "PDF 7 / Buch 467",
    "werk": "Praxis der Kardiologie: Referenzwerte Katze"
   }
  ];

  function themenName(t) {
    for (var i = 0; i < THEMEN.length; i++) if (THEMEN[i][0] === t) return THEMEN[i][1];
    return t;
  }
  /* Suche ueber Text, Zahlen, Thema und Werk. Ohne Suchwort kommt alles. */
  function suche(wort, thema) {
    var w = String(wort || '').trim().toLowerCase();
    var aus = [], i;
    for (i = 0; i < STELLEN.length; i++) {
      var s = STELLEN[i];
      if (thema && s.thema !== thema) continue;
      if (w) {
        var heu = (s.text + ' ' + s.zahlen + ' ' + s.thema + ' ' + themenName(s.thema) + ' ' + s.werk).toLowerCase();
        if (heu.indexOf(w) < 0) continue;
      }
      aus.push(s);
    }
    return aus;
  }
  function themenMitTreffern(wort) {
    var zaehler = {}, i;
    var treffer = suche(wort, null);
    for (i = 0; i < treffer.length; i++) zaehler[treffer[i].thema] = (zaehler[treffer[i].thema] || 0) + 1;
    var aus = [];
    for (i = 0; i < THEMEN.length; i++) {
      if (zaehler[THEMEN[i][0]]) aus.push({ id: THEMEN[i][0], name: THEMEN[i][1], n: zaehler[THEMEN[i][0]] });
    }
    return aus;
  }

  return {
    STELLEN: STELLEN, THEMEN: THEMEN,
    suche: suche, themenMitTreffern: themenMitTreffern, themenName: themenName,
    anzahl: STELLEN.length,
  };
}));
