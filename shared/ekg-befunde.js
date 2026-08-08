/*
 * ekg-befunde.js — Wissensbasis des Diagnostik-EKG (203 Befundregeln).
 *
 * WOHER: systematische Fachrecherche (08.08.2026) zu Rhythmusstoerungen, krankheitsbezogenen
 * EKG-Zeichen, Kurvenmorphologie, Rasse-/Art-/Altersbesonderheiten und zur Gestaltung
 * automatischer EKG-Auswertungen. Leitquellen sind die Standardwerke der Kleintierkardiologie
 * (Tilley; Kresken/Wendt/Modler "Praxis der Kardiologie Hund und Katze"; Thieme
 * "Kleintierkardiologie"; Ettinger/Feldman; Willis/Oliveira/Schwartz), ACVIM-Konsenspapiere
 * und Fachartikel. Jede Regel traegt ihre Quelle mit.
 *
 * ERZEUGT, NICHT ABGESCHRIEBEN (tools/../befunde-bauen.js). 203 Regeln von Hand zu tippen
 * waere eine Fehlerquelle mit Zufallszuender.
 *
 * WAS DIESE DATEI IST UND WAS NICHT:
 * Sie ist ein NACHSCHLAGEWERK und eine Regelgrundlage — KEINE Diagnosemaschine. Ein Teil der
 * Regeln laesst sich mit den heute gemessenen Groessen automatisch pruefen; die uebrigen
 * verlangen Messungen, die die Station (noch) nicht erhebt (P-Welle, PQ, QT, QRS-Form).
 * Diese stehen dem Untersucher zum Nachschlagen zur Verfuegung und werden ausdruecklich
 * NICHT automatisch behauptet. Welche Groessen eine Regel braucht, steht in 'mess'.
 *
 * Felder je Regel:
 *   id, name, art (hund|katze|beide|pferd|heimtier|alle), bedingung (messbar formuliert),
 *   mess (benoetigte Messgroessen), hinweis (Text fuer den Untersucher), dd (Differenzial),
 *   sicher (gesichert|wahrscheinlich|Verdacht), quelle
 *
 * Reines ES5, keine Abhaengigkeiten. Laeuft im Browser (window.VS.befunde) und in Node.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.VS = root.VS || {}; root.VS.befunde = factory(); }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var REGELN = [
 {
  "id": "sinusarrhythmie-hund",
  "name": "Respiratorische Sinusarrhythmie (Hund)",
  "art": "hund",
  "bedingung": "Vor jedem QRS eine positive P in Ableitung II; PQ konstant (Schwankung <= 20 ms); QRS < 70 ms; mittlere HF 60-160/min (Zwergrassen bis 180, Welpen bis 220); RR-Schwankung (RRmax - RRmin)/RRmittel > 10 %, typisch 20-50 %, mit zyklischem, atemsynchronem Muster",
  "mess": [
   "hf",
   "rr",
   "rrschwankung",
   "p",
   "pq",
   "qrs"
  ],
  "hinweis": "Regelmaessig-unregelmaessiger Sinusrhythmus mit atemabhaengiger Frequenzschwankung. Beim Hund ein Ausdruck hohen Vagotonus und ohne eigenstaendigen Krankheitswert; er verschwindet typischerweise bei Aufregung, Belastung oder nach Atropin. Auffaellig waere eher sein Fehlen bei einem ruhigen Hund.",
  "dd": "Sinusarrest (Pause > 2 x RR), SA-Block, Vorhofflimmern (dort fehlen die P-Wellen), haeufige SVES",
  "sicher": "gesichert",
  "quelle": "Clinician's Brief, Top 5 Arrhythmias in Dogs & Cats (>10 % RR-Variation); Merck Vet Manual, Conduction Abnormalities in Dogs and Cats"
 },
 {
  "id": "sinusarrhythmie-katze",
  "name": "Sinusarrhythmie bei der Katze",
  "art": "katze",
  "bedingung": "RR-Schwankung > 10 % bei erhaltener Sinus-P vor jedem QRS; HF 140-220/min; QRS < 40 ms; Aufzeichnung in der Praxis/Klinik",
  "mess": [
   "hf",
   "rr",
   "rrschwankung",
   "p",
   "qrs"
  ],
  "hinweis": "Bei der Katze ist eine ausgepraegte Sinusarrhythmie in der Klinik ungewoehnlich - dort ueberwiegt der Sympathikotonus. Sie kann fuer einen hohen Vagotonus sprechen (Atemwegs- oder Abdominalerkrankung, erhoehter Hirndruck, Sedation) oder auf eine Sinusknotenstoerung hinweisen. In der haeuslichen Aufzeichnung ist sie deutlich haeufiger und dann weniger bedeutsam.",
  "dd": "Sedativa/Opioide, Hyperkaliaemie, Sinusknotenerkrankung, artefaktbedingte RR-Schwankung bei schlechter QRS-Detektion",
  "sicher": "wahrscheinlich",
  "quelle": "Clinician's Brief, Top 5 Arrhythmias in Dogs & Cats (Sinusarrhythmie bei Katzen in der Klinik abnormal, zu Hause haeufiger)"
 },
 {
  "id": "sinusbradykardie-hund",
  "name": "Sinusbradykardie (Hund)",
  "art": "hund",
  "bedingung": "Mittlere HF ueber >= 10 s < 70/min (Riesenrassen < 60/min; einige Quellen setzen generell < 60/min an), P vor jedem QRS, PQ konstant 60-130 ms, QRS < 70 ms",
  "mess": [
   "hf",
   "rr",
   "p",
   "pq",
   "qrs"
  ],
  "hinweis": "Sinusrhythmus mit niedriger Frequenz. Haeufige Hintergruende: hoher Vagotonus, Schlaf, Sedation (v. a. Alpha-2-Agonisten), Hypothermie, Hypothyreose, Hyperkaliaemie, erhoehter Hirndruck, Sinusknotenerkrankung. Ein schlafender Hund kann Frequenzen im Bereich um 30/min erreichen, ohne krank zu sein - der Kontext der Aufnahme entscheidet mit.",
  "dd": "AV-Block II/III, Sinusarrest mit Ersatzrhythmus, Vorhofstillstand bei Hyperkaliaemie, Medikamentenwirkung",
  "sicher": "gesichert",
  "quelle": "Veteriankey/ScienceDirect, Bradyarrhythmias (HF < 70/min Hund, < 60/min Riesenrassen); VIN EVECC 2022 Congress (Bradykardie Hund < 60-70/min)"
 },
 {
  "id": "sinusbradykardie-katze",
  "name": "Sinusbradykardie (Katze)",
  "art": "katze",
  "bedingung": "Mittlere HF ueber >= 10 s < 120/min bei Sinus-P vor jedem QRS und QRS < 40 ms. Achtung Quellenspanne: 120/min, 140/min und 150/min werden je nach Lehrbuch genannt",
  "mess": [
   "hf",
   "rr",
   "p",
   "pq",
   "qrs"
  ],
  "hinweis": "Fuer eine Katze ungewoehnlich niedrige Frequenz. Erste Ueberlegungen sind Hyperkaliaemie (Harnroehrenverschluss), Sedation/Narkose, Hypothermie, Endstadien systemischer Erkrankungen und hoher Vagotonus. Die Schwelle selbst ist quellenabhaengig; zwischen 120 und 150/min ist der Befund unscharf.",
  "dd": "AV-Block, Vorhofstillstand, junktionaler Ersatzrhythmus (80-140/min, ebenfalls schmal)",
  "sicher": "wahrscheinlich",
  "quelle": "Veteriankey/ScienceDirect, Bradyarrhythmias (Katze < 120/min); VIN EVECC 2022 (Katze < 140/min) - Quellen uneinheitlich"
 },
 {
  "id": "sinustachykardie-hund",
  "name": "Sinustachykardie (Hund)",
  "art": "hund",
  "bedingung": "Mittlere HF > 160/min (Zwergrassen > 180/min, Welpen > 220/min), P vor jedem QRS in fester Beziehung, RR-Schwankung < 10 %, QRS < 70 ms. Obere Plausibilitaetsgrenze eines reinen Sinusursprungs ca. 250/min",
  "mess": [
   "hf",
   "rr",
   "rrschwankung",
   "p",
   "pq",
   "qrs"
  ],
  "hinweis": "Sinusrhythmus mit erhoehter Frequenz - in aller Regel eine Reaktion (Schmerz, Angst, Fieber, Anaemie, Hypovolaemie, Hyperthyreose, Medikamente) und keine eigene Herzrhythmusstoerung. Oberhalb von etwa 250/min ist beim Hund ein Sinusursprung unwahrscheinlich; dann kommt eine supraventrikulaere Tachykardie in Betracht.",
  "dd": "SVT (> 180/min, meist abrupter Beginn/Ende, P oft nicht abgrenzbar), Vorhofflattern mit fester Ueberleitung",
  "sicher": "gesichert",
  "quelle": "VIN EVECC 2022 Congress (Tachykardie Hund > 160/min, maximale Sinusfrequenz ca. 250/min); Merck Vet Manual"
 },
 {
  "id": "sinustachykardie-katze",
  "name": "Sinustachykardie (Katze)",
  "art": "katze",
  "bedingung": "Mittlere HF > 220/min mit P vor jedem QRS und QRS < 40 ms",
  "mess": [
   "hf",
   "rr",
   "p",
   "qrs"
  ],
  "hinweis": "Katzen erreichen allein durch die Untersuchungssituation Ruhefrequenzen bis 240/min. Als alleiniger Befund hat eine Sinustachykardie bei der Katze in der Praxis daher wenig Aussagekraft; erst zusammen mit Fieber, Schmerz, Hyperthyreose, Anaemie oder Hypovolaemie wird sie deutbar.",
  "dd": "SVT (> 220/min, RR streng regelmaessig, P nicht abgrenzbar), Sinustachykardie durch Stress",
  "sicher": "gesichert",
  "quelle": "Merck Vet Manual (Katzen bis 240/min in Ruhe im Untersuchungsraum); VIN EVECC 2022 (Katze > 220/min)"
 },
 {
  "id": "sinusarrest-pause",
  "name": "Sinusarrest / Sinuspause",
  "art": "beide",
  "bedingung": "Pause ohne P und ohne QRS > 2 x dem unmittelbar vorangehenden RR UND absolut > 1500 ms. Ist die Pause ein exaktes Vielfaches des normalen P-P, spricht das eher fuer einen SA-Block als fuer einen Sinusarrest",
  "mess": [
   "rr",
   "p",
   "hf",
   "rrschwankung"
  ],
  "hinweis": "Pause laenger als die Sinusarrhythmie erklaert. Beim Hund mit ausgepraegter Sinusarrhythmie ueberlappen Pausen dieser Laenge mit dem Normalen; bei der Katze ist jede solche Pause ungewoehnlich. Haeufige Hintergruende: hoher Vagotonus, Medikamente, Sinusknotenerkrankung. Die Unterscheidung Sinusarrest gegen SA-Block ist am Oberflaechen-EKG kaum moeglich und klinisch ohne Folge.",
  "dd": "ausgepraegte Sinusarrhythmie, blockierte SVES (versteckte P in der T-Welle!), AV-Block II mit nicht erkannter P",
  "sicher": "wahrscheinlich",
  "quelle": "Merck Vet Manual (Pause > 2 x P-P); Clinician's Brief, Interpreting ECGs with Confidence Part 2 (> 2 RR-Intervalle, praktisch > 1,5 s)"
 },
 {
  "id": "sinusarrest-synkopenrelevant",
  "name": "Lange Asystoliepause (synkopenrelevant)",
  "art": "beide",
  "bedingung": "Pause ohne jede Kammeraktion >= 6000 ms (6 s), kein Ersatzschlag innerhalb der Pause",
  "mess": [
   "rr",
   "hf",
   "p",
   "signalguete"
  ],
  "hinweis": "Pausen dieser Laenge gehen typischerweise mit Schwaeche oder Synkope einher. Dass innerhalb von 6 s kein junktionaler oder ventrikulaerer Ersatzschlag einspringt, spricht gegen eine rein vagale Ursache und fuer eine Erkrankung mehrerer Schrittmacherebenen. Vor der Wertung ist ein abgefallenes Kabel auszuschliessen - das sieht identisch aus.",
  "dd": "Elektrodenabriss/Artefakt, Asystolie, Sick-Sinus-Syndrom, hochgradiger AV-Block ohne Ersatzrhythmus",
  "sicher": "gesichert",
  "quelle": "ScienceDirect Topics, Sinus Arrest (Synkope typischerweise bei Pausen > 6 s); ScienceDirect, Sick sinus syndrome (Pausen bis 10-12 s bei fehlendem Ersatzrhythmus)"
 },
 {
  "id": "sick-sinus-syndrom-verdacht",
  "name": "Sick-Sinus-Syndrom / Sinusknotendysfunktion (Verdacht)",
  "art": "hund",
  "bedingung": "Auf demselben Streifen zwei Komponenten: (a) mittlere HF < 60/min ODER mindestens eine Pause > 2000 ms, UND (b) mindestens eine Phase mit HF > 180/min bei schmalem QRS (< 70 ms) = Bradykardie-Tachykardie-Muster. Berichtete Pausendauer 2,5 +/- 1,3 s, im Extremfall 10-12 s; tachykarde Phasen bis 220/min",
  "mess": [
   "hf",
   "rr",
   "rrschwankung",
   "qrs",
   "p"
  ],
  "hinweis": "Das Wechselmuster aus Bradykardie/Pausen und supraventrikulaerer Tachykardie passt zu einer Sinusknotenerkrankung. Ueberdurchschnittlich betroffen sind West Highland White Terrier, Zwergschnauzer, Dackel, Cocker Spaniel und Dobermann, oft aeltere Huendinnen. Ein Ruhestreifen kann das nicht sichern - Langzeit-EKG und ein Atropintest (0,04 mg/kg, Beurteilung nach 20-30 min; Anstieg auf > 150-160/min spricht fuer eine rein vagale Ursache) grenzen ab.",
  "dd": "hoher Vagotonus (atropinresponsiv), AV-Knoten-Erkrankung, Medikamentenwirkung, Hyperkaliaemie",
  "sicher": "Verdacht",
  "quelle": "DocCheck Flexikon, Sick-Sinus-Syndrom (Hund) (Pausen bis 10 s, Tachykardie bis 220/min, Rassen); ScienceDirect, Outcome and survival in canine sick sinus syndrome, 93 Faelle (Pausendauer 2,5 +/- 1,3 s); Clinician's Brief (Atropintest 0,04 mg/kg, Zielfrequenz >"
 },
 {
  "id": "vorhofstillstand-hyperkaliaemie",
  "name": "Vorhofstillstand / sinoventrikulaerer Rhythmus bei Hyperkaliaemie",
  "art": "beide",
  "bedingung": "Ueber >= 10 aufeinanderfolgende Kammerkomplexe in allen 6 Extremitaetenableitungen keine erkennbare P-Welle; RR weitgehend regelmaessig (RR-Schwankung < 10 %); mittlere HF < 60/min (Hund) bzw. < 140/min (Katze); QRS >= 70 ms (Hund) bzw. >= 40 ms (Katze); QT eher verkuerzt",
  "mess": [
   "p",
   "rr",
   "rrschwankung",
   "hf",
   "qrs",
   "qt",
   "signalguete"
  ],
  "hinweis": "Bild eines Vorhofstillstands mit sinoventrikulaerer Leitung, wie es bei Hyperkaliaemie vorkommt. Berichtete EKG-Veraenderungen setzen meist oberhalb von 6,0-6,5 mmol/L ein, ein Vorhofstillstand meist erst um 8,0 mmol/L und darueber. Ein Kaliumwert laesst sich aus dem EKG jedoch nicht ableiten: es gibt keine feste Zuordnung, und das EKG kann bei lebensbedrohlicher Hyperkaliaemie normal aussehen. Serumkalium ist der einzige Weg, das zu klaeren; bei der Katze gehoert die Blase in die Ueberlegung.",
  "dd": "persistierender Vorhofstillstand (Atriomyopathie) bei normalem Kalium, feines Vorhofflimmern, Sinusarrest mit Ersatzrhythmus, unerkannte P-Welle bei schlechter Signalguete",
  "sicher": "Verdacht",
  "quelle": "Tag & Day 2008, J Vet Emerg Crit Care 18(1):61-67 (keine feste K-EKG-Zuordnung; 59 % der EKGs normal oder nicht vorbeschrieben); Clinician's Brief, Management of Potassium Disorders (> 5,5 mEq/L Hyperkaliaemie, > 6,5 mit EKG-Veraenderungen behandelt, > 7,5 leb"
 },
 {
  "id": "hyperkaliaemie-fruehzeichen",
  "name": "EKG-Konstellation vereinbar mit beginnender Hyperkaliaemie",
  "art": "beide",
  "bedingung": "P noch vorhanden, aber Amplitude <= 0,10 mV (Hund) bzw. <= 0,05 mV (Katze) UND P-Dauer > 40 ms UND mittlere HF unterhalb der Artnorm UND QT verkuerzt (Hund < 150 ms bei HF < 100/min; Katze < 120 ms)",
  "mess": [
   "p",
   "hf",
   "qt",
   "qrs",
   "rr"
  ],
  "hinweis": "Verbreiterte und abgeflachte P-Welle, Bradykardie und kurzes QT sind eine Konstellation, die zu einer Hyperkaliaemie passt. Die klassisch zuerst genannte spitze, schmale T-Welle wird von dieser Anwendung nicht vermessen und fehlt daher in der Bewertung - der Befund ist deshalb unvollstaendig. Die Bestaetigung ist eine Blutgas- oder Elektrolytmessung, nicht die Kurve.",
  "dd": "Vagotonus, Sedation, Hypothermie, Vorhofvergroesserung (dort P verbreitert, aber nicht abgeflacht)",
  "sicher": "Verdacht",
  "quelle": "Clinician's Brief, Management of Potassium Disorders; Merck Vet Manual (EKG-Veraenderungen ab ca. 6-6,5 mmol/L: spitze T, kurzes QT, P verlaengert und amplitudengemindert)"
 },
 {
  "id": "weitkomplex-tachykardie-katze",
  "name": "Weitkomplex-Tachykardie bei der Katze - nicht automatisch VT",
  "art": "katze",
  "bedingung": "HF > 180/min, QRS > 40 ms (oft > 60 ms), keine erkennbare P-Welle, RR regelmaessig (RR-Schwankung < 10 %)",
  "mess": [
   "hf",
   "qrs",
   "p",
   "rr",
   "rrschwankung"
  ],
  "hinweis": "Breiter Kammerkomplex bei hoher Frequenz. Bei der Katze erzeugt eine schwere Hyperkaliaemie (typisch bei Harnroehrenverschluss) genau dieses Bild, ohne dass eine ventrikulaere Tachykardie vorliegt - beschrieben in einer Fallserie von drei Katzen. Kalium und Blasenstatus sind daher zu klaeren, bevor das Bild als rein ventrikulaer gewertet wird; Antiarrhythmika wuerden hier nicht am Problem ansetzen.",
  "dd": "ventrikulaere Tachykardie, SVT mit Schenkelblock/aberranter Leitung, schwere Hyperkaliaemie",
  "sicher": "Verdacht",
  "quelle": "Norman BC, Cote E, Barrett KA 2006, J Feline Med Surg: Wide-complex tachycardia associated with severe hyperkalemia in three cats"
 },
 {
  "id": "persistierender-vorhofstillstand",
  "name": "Persistierender Vorhofstillstand (Atriomyopathie)",
  "art": "hund",
  "bedingung": "Ueber den gesamten Streifen in allen 6 Ableitungen keine P-Welle; regelmaessiger Ersatzrhythmus mit HF 40-60/min bei schmalem QRS (< 70 ms, junktional) oder 20-40/min bei breitem QRS (> 70 ms, ventrikulaer); keine Frequenzvariation",
  "mess": [
   "p",
   "hf",
   "rr",
   "rrschwankung",
   "qrs"
  ],
  "hinweis": "Bild eines Vorhofstillstands. Bleibt es bei normalem Serumkalium bestehen, kommt eine Atriomyopathie (fibrofettiger Umbau des Vorhofmyokards) in Betracht. Gehaeuft beschrieben bei English Springer Spaniel, Old English Sheepdog, Shih Tzu und Deutsch Kurzhaar. Auf dem Streifen ist diese Form von der hyperkaliaemischen nicht zu unterscheiden - nur das Kalium trennt sie.",
  "dd": "Hyperkaliaemie (reversibel!), Vorhofflimmern mit sehr feinen f-Wellen, unerkannte P bei schlechter Signalguete",
  "sicher": "Verdacht",
  "quelle": "MSD Vet Manual, Persistent Atrial Standstill in Dogs and Cats; ScienceDirect, Pathological Features of Persistent Atrial Standstill Syndrome in Three Dogs"
 },
 {
  "id": "supraventrikulaere-extrasystole",
  "name": "Supraventrikulaere Extrasystole (SVES)",
  "art": "beide",
  "bedingung": "Vorzeitiger Komplex mit Kopplungsintervall <= 80 % des lokalen Median-RR; QRS-Breite < 70 ms (Hund) bzw. < 40 ms (Katze) UND formgleich zum Sinus-QRS; P vorzeitig, verformt oder nicht abgrenzbar (haeufig in der vorangehenden T verborgen); Summe aus Vor- und Nachintervall < 2 x lokalem Median-RR (nicht voll kompensatorische Pause)",
  "mess": [
   "rr",
   "kopplungsintervall",
   "qrs",
   "qrsform",
   "p",
   "pq"
  ],
  "hinweis": "Vorzeitiger Schlag mit supraventrikulaerem Ursprung. Einzelne SVES kommen auch bei Herzgesunden vor. Gehaeuft treten sie bei Vorhofdehnung (Mitralklappenerkrankung, Kardiomyopathie), bei der Katze auch bei Hyperthyreose sowie bei extrakardialen Reizen auf. Haeufung kann einem Vorhofflimmern vorausgehen.",
  "dd": "VES (dort QRS breit und formfremd, voll kompensatorische Pause), Sinusarrhythmie mit vorgezogenem Schlag, SVES mit aberranter Leitung (breiter QRS!)",
  "sicher": "wahrscheinlich",
  "quelle": "VIN EVECC 2022 Congress (supraventrikulaere Komplexe schmal: < 70 ms Hund, < 40 ms Katze); Merck Vet Manual"
 },
 {
  "id": "supraventrikulaere-tachykardie",
  "name": "Supraventrikulaere Tachykardie (SVT)",
  "art": "beide",
  "bedingung": ">= 3 aufeinanderfolgende supraventrikulaere Komplexe; HF > 180/min (Hund) bzw. > 220/min (Katze und Welpe); QRS < 70 ms (Hund) bzw. < 40 ms (Katze); RR-Schwankung < 10 % (streng regelmaessig); P nicht sicher abgrenzbar, in QRS oder T verborgen oder retrograd (negativ in II)",
  "mess": [
   "hf",
   "rr",
   "rrschwankung",
   "qrs",
   "p"
  ],
  "hinweis": "Regelmaessige Schmalkomplex-Tachykardie. Beim Hund liegt die maximale Sinusfrequenz bei etwa 250/min; darueber ist ein Sinusursprung unwahrscheinlich. Merck nennt fuer SVT beim Hund einen Bereich von 200-350/min. Anhaltend hohe Frequenzen koennen eine tachykardieinduzierte Kardiomyopathie nach sich ziehen; abrupter Beginn und abruptes Ende sprechen fuer SVT und gegen Sinustachykardie.",
  "dd": "Sinustachykardie (P vor jedem QRS, allmaehlicher An- und Abstieg), Vorhofflattern mit fester Ueberleitung, VT mit ungewoehnlich schmalem QRS, Praeexzitationstachykardie",
  "sicher": "wahrscheinlich",
  "quelle": "VIN EVECC 2022 Congress (SVT > 180/min Hund, > 220/min Welpe und Katze; QRS < 70/< 40 ms); Merck Vet Manual (200-350/min Hund)"
 },
 {
  "id": "vorhofflimmern",
  "name": "Vorhofflimmern",
  "art": "beide",
  "bedingung": "In allen 6 Ableitungen keine abgrenzbare P-Welle; unregelmaessig-unregelmaessiger RR ohne wiederkehrendes Muster (RR-Schwankung > 10 % UND keine periodische Struktur der RR-Folge); QRS schmal (< 70 ms Hund, < 40 ms Katze) sofern kein Schenkelblock; fein undulierende Grundlinie (f-Wellen 400-700/min)",
  "mess": [
   "p",
   "rr",
   "rrschwankung",
   "hf",
   "qrs",
   "signalguete"
  ],
  "hinweis": "Bild eines Vorhofflimmerns: fehlende P-Wellen und ein Kammerrhythmus ohne jede Periodik. Beim Hund liegt die Kammerfrequenz meist ueber 160/min (berichtete Spanne 130-260/min), bei der Katze 200-280/min. Beim Hund fast immer mit deutlicher Vorhofvergroesserung verbunden; bei Riesenrassen kommt auch ein Lone-AF ohne strukturelle Erkrankung vor.",
  "dd": "ausgepraegte Sinusarrhythmie (P vorhanden!), haeufige SVES, Vorhofflattern mit wechselnder Ueberleitung, Muskelzittern auf der Grundlinie",
  "sicher": "wahrscheinlich",
  "quelle": "VIN EVECC 2022 Congress (Kammerantwort Hund 130-260/min, Katze 200-280/min, f-Wellen 400-600/min); Merck Vet Manual (> 600-700 atriale Depolarisationen/min, Kammerantwort 80-300/min Hund)"
 },
 {
  "id": "vorhofflimmern-frequenzkontrolle",
  "name": "Vorhofflimmern - Frequenzeinordnung",
  "art": "hund",
  "bedingung": "Vorhofflimmern erfuellt UND mittlere HF im Ruhe-EKG > 150/min",
  "mess": [
   "hf",
   "rr",
   "p"
  ],
  "hinweis": "In der ORCA-Studie war eine im 24-h-EKG gemittelte Frequenz <= 125/min mit deutlich laengerer Ueberlebenszeit verbunden (608 gegenueber 33 Tagen). Eine Ruhe-EKG-Frequenz > 150/min entspricht dort meist einer Holter-Mittelfrequenz > 140/min und gilt als Anlass, ohne vorherige Langzeitmessung taetig zu werden. Unterhalb 150/min im Ruhe-EKG laesst sich die Frequenzkontrolle nur im Langzeit-EKG beurteilen - ein Streifen kann das nicht leisten.",
  "dd": "Stress-/Schmerz-bedingt erhoehte Frequenz bei sonst kontrolliertem AF; die Praxismessung liegt systematisch ueber der Holter-Mittelfrequenz",
  "sicher": "gesichert",
  "quelle": "Pedro B et al. 2023, J Vet Intern Med, ORCA-Studie: Optimal rate control in dogs with atrial fibrillation (Ziel-Mittelfrequenz < 125/min; Ruhe-EKG-Schwelle 150/min)"
 },
 {
  "id": "vorhofflattern",
  "name": "Vorhofflattern",
  "art": "beide",
  "bedingung": "Keine normalen P-Wellen, stattdessen regelmaessige saegezahnartige Vorhofausschlaege mit konstantem F-F-Intervall entsprechend 250-500/min (F-F 120-240 ms); Kammerantwort entweder regelmaessig bei festem Ueberleitungsverhaeltnis (2:1, 3:1, 4:1) oder unregelmaessig bei wechselndem Verhaeltnis; QRS schmal",
  "mess": [
   "p",
   "pfrequenz",
   "rr",
   "rrschwankung",
   "hf",
   "qrs",
   "ueberleitungsverhaeltnis"
  ],
  "hinweis": "Regelmaessige Vorhofaktivitaet weit oberhalb der Kammerfrequenz mit saegezahnfoermiger Grundlinie. Das Unterscheidungsmerkmal zum Vorhofflimmern ist die Konstanz des F-F-Intervalls. Vorhofflattern kann in Vorhofflimmern uebergehen und umgekehrt.",
  "dd": "Vorhofflimmern (F-F nicht konstant), SVT mit sichtbaren retrograden P, 50-Hz-Netzeinstreuung (regelmaessig, aber 50/s = 3000/min)",
  "sicher": "Verdacht",
  "quelle": "Merck Vet Manual (atriale Entladungsrate > 400/min); ScienceDirect Topics, Atrial Flutter (regelmaessige Vorhoffrequenz 250-350/min, Berichte bis 400-500/min)"
 },
 {
  "id": "ventrikulaere-extrasystole",
  "name": "Ventrikulaere Extrasystole (VES)",
  "art": "beide",
  "bedingung": "Vorzeitiger Komplex mit Kopplungsintervall <= 80 % des lokalen Median-RR; QRS > 70 ms (Hund) bzw. > 40 ms (Katze) UND formfremd zum Sinus-QRS; keine zugehoerige vorangehende P in fester Beziehung; T-Welle entgegengesetzt zum QRS-Hauptausschlag; voll kompensatorische Pause (Vor- + Nachintervall = 2 x lokales Median-RR +/- 10 %)",
  "mess": [
   "rr",
   "kopplungsintervall",
   "qrs",
   "qrsform",
   "p",
   "ramp"
  ],
  "hinweis": "Vorzeitiger Schlag ventrikulaeren Ursprungs. Beim Hund liegt die Ursache haeufiger ausserhalb des Herzens (Milztumor, Magendrehung, Trauma, Pankreatitis, Sepsis, Schmerz), bei der Katze eher im Herzen selbst. Wichtig ist die Unterscheidung von einem Ersatzschlag: dieser sieht genauso aus, kommt aber ZU SPAET statt zu frueh.",
  "dd": "ventrikulaerer Ersatzschlag (spaet statt vorzeitig - Unterdrueckung waere hier schaedlich), SVES mit aberranter Leitung/Schenkelblock, Bewegungs- oder Kabelartefakt",
  "sicher": "wahrscheinlich",
  "quelle": "VIN EVECC 2022 Congress (QRS > 70 ms Hund, > 40 ms Katze); Merck Vet Manual"
 },
 {
  "id": "ves-couplet-triplet",
  "name": "Couplet / Triplet",
  "art": "beide",
  "bedingung": "Genau 2 (Couplet) bzw. genau 3 (Triplet) unmittelbar aufeinanderfolgende ventrikulaere Komplexe zwischen supraventrikulaeren Schlaegen; jeder Komplex erfuellt die VES-Kriterien",
  "mess": [
   "qrs",
   "qrsform",
   "rr",
   "kopplungsintervall",
   "hf"
  ],
  "hinweis": "Couplets und Triplets gelten als hoehergradige Form ventrikulaerer Ektopie als Einzelextrasystolen. Zusammen mit polymorpher Form, hoher Frequenz und R-auf-T zaehlen sie zu den Merkmalen, die in der Literatur als Warnzeichen fuer den Uebergang in Kammerflimmern gefuehrt werden - besonders bei Rassen mit Praedisposition fuer den ploetzlichen Herztod.",
  "dd": "kurze VT-Salve (ab 3-4 Komplexen ist die Zaehlung quellenabhaengig), Artefaktserie",
  "sicher": "gesichert",
  "quelle": "VIN WSAVA 2009, This Dog Has Ventricular Arrhythmias - What Do I Do? (Couplets/Triplets als Behandlungsindikation); VIN EVECC 2022 Congress"
 },
 {
  "id": "ves-bigeminus-trigeminus",
  "name": "Ventrikulaerer Bigeminus / Trigeminus",
  "art": "beide",
  "bedingung": "Ueber >= 6 aufeinanderfolgende Komplexe ist jeder zweite (Bigeminus) bzw. jeder dritte (Trigeminus) Komplex ventrikulaer, mit konstantem Kopplungsintervall (Schwankung <= 40 ms)",
  "mess": [
   "qrs",
   "qrsform",
   "kopplungsintervall",
   "rr",
   "hf"
  ],
  "hinweis": "Feste Kopplung ventrikulaerer an supraventrikulaere Schlaege. Bei Bigeminus liegt die effektive Auswurffrequenz oft nur bei der Haelfte der gezaehlten Herzfrequenz, weil die ventrikulaeren Schlaege kaum Auswurf erzeugen - Pulsdefizit ist zu erwarten. Die aus dem EKG berechnete Frequenz ueberschaetzt hier die tatsaechliche Kreislaufleistung.",
  "dd": "SVES-Bigeminus (schmaler QRS), 2:1-Ueberleitung mit Aberration",
  "sicher": "gesichert",
  "quelle": "Merck Vet Manual; VIN EVECC 2022 Congress"
 },
 {
  "id": "r-auf-t",
  "name": "R-auf-T-Konstellation",
  "art": "beide",
  "bedingung": "Kopplungsintervall der VES <= QT-Dauer des unmittelbar vorangehenden Komplexes, d. h. die R-Zacke der VES faellt in die T-Welle des Vorschlags",
  "mess": [
   "kopplungsintervall",
   "qt",
   "qrs",
   "qrsform",
   "rr"
  ],
  "hinweis": "Der vorzeitige Schlag faellt in die vulnerable Phase der Repolarisation. Diese Konstellation wird als Ausloeser fuer Kammerflimmern gefuehrt; fuer den Hund ist ein ploetzlicher Herztod unter Langzeit-EKG mit genau diesem Mechanismus dokumentiert. Je hoeher die Frequenz der ventrikulaeren Ektopie, desto wahrscheinlicher trifft ein Schlag dieses Fenster.",
  "dd": "scheinbares R-auf-T bei fehlerhafter T-Ende-Bestimmung; bei hoher Frequenz verschmelzen T und folgender QRS ohnehin",
  "sicher": "gesichert",
  "quelle": "Santilli RA et al. 2016, J Vet Cardiol: Sudden cardiac death in a dog during Holter recording - R on T phenomenon; Clinician's Brief, Top 5 Arrhythmias"
 },
 {
  "id": "ventrikulaere-tachykardie-hund",
  "name": "Ventrikulaere Tachykardie (Hund)",
  "art": "hund",
  "bedingung": ">= 3 (nach anderen Quellen >= 4) aufeinanderfolgende ventrikulaere Komplexe (QRS > 70 ms, formfremd, keine zugehoerige P) mit HF > 160/min. Andere Quellen setzen die Grenze bei 150-180/min",
  "mess": [
   "hf",
   "rr",
   "qrs",
   "qrsform",
   "p",
   "kopplungsintervall"
  ],
  "hinweis": "Salve ventrikulaeren Ursprungs oberhalb der AIVR-Grenze. In der Literatur gelten als Warnzeichen: Frequenz > 180-200/min, wechselnde QRS-Formen (polymorph), R-auf-T sowie eine Rasse mit Praedisposition fuer den ploetzlichen Herztod. Entscheidend ist neben der Zahl die haemodynamische Auswirkung - Pulsqualitaet, Schleimhautfarbe, Blutdruck und Bewusstsein sagen mehr als die Frequenz allein. Beim Hund liegt die Ursache haeufiger ausserhalb des Herzens als bei der Katze.",
  "dd": "AIVR (<= 160/min), SVT mit Schenkelblock oder aberranter Leitung, schwere Hyperkaliaemie, Artefaktserie",
  "sicher": "wahrscheinlich",
  "quelle": "VIN EVECC 2022 Congress (VT > 160/min Hund, AIVR <= 160/min); Veteriankey, Ventricular Tachyarrhythmias (150-180/min); VIN WSAVA 2009 (Warnzeichen > 180-200/min, polymorph, R-auf-T)"
 },
 {
  "id": "ventrikulaere-tachykardie-katze",
  "name": "Ventrikulaere Tachykardie (Katze)",
  "art": "katze",
  "bedingung": ">= 3 aufeinanderfolgende ventrikulaere Komplexe (QRS > 40 ms, formfremd, keine zugehoerige P) mit HF > 220/min. Einzelne Quellen setzen bereits ab > 180/min an",
  "mess": [
   "hf",
   "rr",
   "qrs",
   "qrsform",
   "p"
  ],
  "hinweis": "Bei der Katze liegt einer ventrikulaeren Tachykardie haeufiger eine primaere Herzerkrankung zugrunde (Kardiomyopathie), waehrend beim Hund extrakardiale Ursachen ueberwiegen. Die Frequenzgrenze ist bei der Katze schwaecher belegt als beim Hund: die Angaben in der Literatur reichen von 180 bis 220/min. Vor der Wertung als VT ist eine schwere Hyperkaliaemie auszuschliessen, die dasselbe Bild erzeugen kann.",
  "dd": "Hyperkaliaemie mit Weitkomplex-Tachykardie, SVT mit Schenkelblock, Sinustachykardie mit Schenkelblock",
  "sicher": "Verdacht",
  "quelle": "Veteriankey, Ventricular Tachyarrhythmias (Katze > 220/min); ScienceDirect Topics, Accelerated Idioventricular Rhythm (Katze: AIVR < 220/min); Grenze quellenabhaengig"
 },
 {
  "id": "vt-anhaltend-nichtanhaltend",
  "name": "Anhaltende gegen nicht anhaltende VT",
  "art": "beide",
  "bedingung": "Ununterbrochene ventrikulaere Salve mit Dauer >= 30 s = anhaltend (sustained); Dauer < 30 s = nicht anhaltend (non-sustained). Streifen kuerzer als 30 s koennen 'anhaltend' grundsaetzlich nicht belegen",
  "mess": [
   "dauer",
   "hf",
   "rr",
   "qrs",
   "qrsform"
  ],
  "hinweis": "Die 30-Sekunden-Grenze ist die uebliche Trennung zwischen anhaltender und nicht anhaltender ventrikulaerer Tachykardie und wird in der Tiermedizin aus der Humanmedizin uebernommen. Ist die Aufzeichnung kuerzer als 30 s oder endet die Salve am Streifenrand, ist die Einordnung offen - das sollte so gesagt und nicht geraten werden.",
  "dd": "abgeschnittene Salve am Aufzeichnungsende, Artefaktserie",
  "sicher": "gesichert",
  "quelle": "Veteriankey, Ventricular Tachyarrhythmias (nonsustained < 30 s, sustained > 30 s); VIN WSAVA 2009"
 },
 {
  "id": "aivr-hund",
  "name": "Akzelerierter idioventrikulaerer Rhythmus (Hund)",
  "art": "hund",
  "bedingung": ">= 4 aufeinanderfolgende ventrikulaere Komplexe (QRS > 70 ms, formfremd, keine zugehoerige P) mit HF 60-160/min - also oberhalb der ventrikulaeren Ersatzfrequenz (20-40/min) und unterhalb der VT-Grenze von 160/min. Die Frequenz liegt typischerweise innerhalb +/- 10 % der begleitenden Sinusfrequenz; am Uebergang sind Fusionsschlaege typisch (Kopplungsintervall etwa gleich dem Sinus-RR)",
  "mess": [
   "hf",
   "rr",
   "qrs",
   "qrsform",
   "p",
   "kopplungsintervall"
  ],
  "hinweis": "Ventrikulaerer Rhythmus mit normaler Frequenz. Die Abgrenzung zur ventrikulaeren Tachykardie ist beim Hund allein die Frequenz - die Grenze von 160/min ist in der Literatur ausdruecklich als willkuerlich gesetzt bezeichnet. Der AIVR ist wegen der laengeren Fuellungszeit meist haemodynamisch stabil, geht selten von einer strukturellen Herzerkrankung aus und begleitet typischerweise extrakardiale Probleme (Magendrehung, Milztumor, Trauma, Pankreatitis, Sepsis, Intensivpatienten). In der Literatur wird beschrieben, dass er sich haeufig innerhalb von 48-72 h von selbst legt und nicht mit ploetzlichem Herztod einhergeht. Ein 'Ablesen und Unterdruecken' waere hier deshalb eine andere Entscheidung als bei einer VT.",
  "dd": "ventrikulaere Tachykardie (> 160/min), ventrikulaerer Ersatzrhythmus (20-40/min, tritt nur bei Ausfall uebergeordneter Schrittmacher auf), Schenkelblock bei Sinusrhythmus (dort P vor jedem QRS)",
  "sicher": "wahrscheinlich",
  "quelle": "ScienceDirect Topics, Accelerated Idioventricular Rhythm (Hund 80-160/min, VT > 160/min); VIN EVECC 2022 Congress (AIVR <= 160/min bzw. innerhalb 10 % der Sinusfrequenz); LeadER Animal Specialty Hospital, Accelerated Idioventricular Rhythm"
 },
 {
  "id": "aivr-katze",
  "name": "Akzelerierter idioventrikulaerer Rhythmus (Katze)",
  "art": "katze",
  "bedingung": ">= 4 aufeinanderfolgende ventrikulaere Komplexe (QRS > 40 ms) mit HF 100-220/min; eine Quelle grenzt enger auf 100-159/min ein. Die Untergrenze liegt oberhalb der felinen Ersatzfrequenz (80-140/min)",
  "mess": [
   "hf",
   "rr",
   "qrs",
   "qrsform",
   "p"
  ],
  "hinweis": "Bei der Katze ueberlappen die Zahlenbereiche stark: die ventrikulaere Ersatzfrequenz reicht bis etwa 140/min, der normale Sinusrhythmus beginnt bei etwa 140/min, und die VT-Grenze wird zwischen 180 und 220/min angegeben. Der AIVR ist bei der Katze selten und seine Frequenzgrenzen sind deutlich schwaecher belegt als beim Hund. Eine automatische Einordnung sollte hier ausdruecklich als unsicher gekennzeichnet werden.",
  "dd": "ventrikulaerer Ersatzrhythmus (80-140/min), ventrikulaere Tachykardie (> 180-220/min), Hyperkaliaemie",
  "sicher": "Verdacht",
  "quelle": "ScienceDirect Topics, Accelerated Idioventricular Rhythm (Katze: < 220/min, oberhalb Ersatzrhythmus 100-120/min; andernorts 100-159/min) - Quellen uneinheitlich"
 },
 {
  "id": "kammerflimmern",
  "name": "Kammerflimmern",
  "art": "alle",
  "bedingung": "Ueber >= 4 s kein abgrenzbarer QRS; chaotisch wechselnde Grundlinienausschlaege mit staendig wechselnder Amplitude und Zykluslaenge (grob 300-500/min); kein messbares RR; keine P; Signalguete jedoch intakt (Elektrodenkontakt vorhanden)",
  "mess": [
   "qrs",
   "rr",
   "p",
   "signalguete",
   "ramp"
  ],
  "hinweis": "Bild eines Kammerflimmerns - das entspricht einem Kreislaufstillstand. Vor jeder Wertung muss ausgeschlossen sein, dass es sich um ein abgefallenes Kabel, Muskelzittern, Transport oder Manipulation am Tier handelt; diese Artefakte sind auf der Kurve praktisch nicht zu unterscheiden. Der Patient am Tisch entscheidet, nicht die Kurve. Grobes Flimmern (hohe Amplitude) geht in feines ueber, je laenger der Zustand besteht.",
  "dd": "Muskelzittern/Schuetteln, Elektrodenabriss, Reanimationsartefakt, sehr schnelle polymorphe VT / Kammerflattern",
  "sicher": "Verdacht",
  "quelle": "Merck Vet Manual, Conduction Abnormalities in Dogs and Cats; VIN EVECC 2022 Congress (Defibrillation 2-5 J/kg)"
 },
 {
  "id": "asystolie",
  "name": "Asystolie",
  "art": "alle",
  "bedingung": "Flache Grundlinie ohne P und ohne QRS ueber >= 4 s bei intakter Signalguete (Rauschamplitude < 0,05 mV, kein Kabelabriss detektiert)",
  "mess": [
   "qrs",
   "p",
   "rr",
   "signalguete"
  ],
  "hinweis": "Keine elektrische Herzaktion ueber die gemessene Dauer. Der haeufigste Grund fuer dieses Bild am Geraet ist ein geloester Elektrodenkontakt - deshalb gehoert die Signalguetepruefung vor die Meldung. Eine Nulllinie in nur einer Ableitung bei erhaltenem Signal in anderen spricht fuer ein Elektrodenproblem.",
  "dd": "Elektrodenabriss/Kabelbruch, Verstaerkung zu niedrig eingestellt, feines Kammerflimmern",
  "sicher": "Verdacht",
  "quelle": "Merck Vet Manual; allgemeine EKG-Technik"
 },
 {
  "id": "av-block-1-hund",
  "name": "AV-Block I. Grades (Hund)",
  "art": "hund",
  "bedingung": "PQ > 130 ms bei JEDEM Schlag, jede P von einem QRS gefolgt, HF im Artbereich, QRS < 70 ms. Normbereich Hund: PQ 60-130 ms",
  "mess": [
   "pq",
   "p",
   "qrs",
   "hf",
   "rr"
  ],
  "hinweis": "Verlaengerte Ueberleitungszeit ohne Schlagausfall. Haeufig Ausdruck erhoehten Vagotonus oder Medikamentenwirkung (Digoxin, Betablocker, Kalziumantagonisten, Alpha-2-Agonisten wie Medetomidin), daneben AV-Knoten-Fibrose. Fuer sich genommen ohne haemodynamische Folge; bedeutsam ist er vor allem als Begleitbefund oder wenn er neu auftritt.",
  "dd": "Medikamentenwirkung, Vagotonus, Elektrolytstoerung, beginnende AV-Knoten-Erkrankung",
  "sicher": "gesichert",
  "quelle": "ScienceDirect Topics, First Degree Atrioventricular Block (PR > 130 ms Hund, > 90 ms Katze); Tilley, Essentials of Canine and Feline Electrocardiography (Normbereich PQ Hund 60-130 ms)"
 },
 {
  "id": "av-block-1-katze",
  "name": "AV-Block I. Grades (Katze)",
  "art": "katze",
  "bedingung": "PQ > 90 ms bei jedem Schlag, jede P von einem QRS gefolgt, QRS < 40 ms. Normbereich Katze: PQ 50-90 ms",
  "mess": [
   "pq",
   "p",
   "qrs",
   "hf",
   "rr"
  ],
  "hinweis": "Verlaengerte Ueberleitungszeit bei der Katze. Bei einer Katzenherzfrequenz von 200/min betraegt der gesamte Zyklus 300 ms - eine PQ-Verlaengerung ist hier schwer zu messen und wird leicht ueber- oder unterschaetzt. Bei 25 mm/s entspricht die Schwelle von 90 ms nur 2,25 mm Papier; 50 mm/s ist fuer diese Messung die brauchbare Einstellung.",
  "dd": "Messfehler bei hoher Frequenz, Medikamente, Vagotonus, Kardiomyopathie",
  "sicher": "gesichert",
  "quelle": "ScienceDirect Topics, First Degree Atrioventricular Block (PR > 90 ms Katze); Tilley (Normbereich PQ Katze 50-90 ms)"
 },
 {
  "id": "av-block-2-mobitz1",
  "name": "AV-Block II. Grades, Typ Mobitz I (Wenckebach)",
  "art": "beide",
  "bedingung": "Einzelne P ohne folgenden QRS; in den >= 3 Schlaegen davor nimmt PQ von Schlag zu Schlag um jeweils >= 10 ms zu; das PQ des ersten Schlags NACH der Pause ist das kuerzeste der Sequenz; P-P-Intervall bleibt konstant",
  "mess": [
   "pq",
   "p",
   "rr",
   "qrs",
   "hf"
  ],
  "hinweis": "Blockmuster mit zunehmender Ueberleitungszeit vor dem Schlagausfall. Der Block liegt hier typischerweise im AV-Knoten und ist haeufig vagal bedingt; er verschwindet meist bei Frequenzanstieg (Belastung, Atropin). Beim Pferd ist dieses Muster ein Normalbefund. Zur Klassifikation werden mindestens drei uebergeleitete Schlaege vor dem Ausfall benoetigt - bei einem einzelnen Ausfall ist die Unterscheidung von Mobitz II nicht moeglich.",
  "dd": "Mobitz II (PQ konstant), blockierte SVES (dort P vorzeitig!), Sinusarrest (dort fehlt auch die P)",
  "sicher": "wahrscheinlich",
  "quelle": "ScienceDirect Topics, Second-Degree Atrioventricular Block; dvm360, Get with the beat (Mobitz I mit progressiver PR-Verlaengerung, Mobitz II mit konstantem PR)"
 },
 {
  "id": "av-block-2-mobitz2",
  "name": "AV-Block II. Grades, Typ Mobitz II",
  "art": "beide",
  "bedingung": "Einzelne P ohne folgenden QRS; PQ aller uebergeleiteten Schlaege konstant (Schwankung <= 10 ms bzw. innerhalb der Abtastaufloesung); P-P konstant; QRS haeufig verbreitert (> 70 ms Hund, > 40 ms Katze)",
  "mess": [
   "pq",
   "p",
   "rr",
   "qrs",
   "hf"
  ],
  "hinweis": "Schlagausfall ohne vorherige Zunahme der Ueberleitungszeit. Der Block liegt hier eher unterhalb des AV-Knotens (His-Purkinje-Ebene). Das gilt in der Literatur als unguenstiger als Wenckebach, weil ein Uebergang in einen kompletten Block wahrscheinlicher ist und der Ersatzrhythmus dann tiefer und langsamer liegt. Bei einem breiten QRS ist die Wahrscheinlichkeit einer infranodalen Lage hoeher.",
  "dd": "Mobitz I bei zu kurzer Sequenz, blockierte SVES, Vagotonus-bedingter Block (dann meist Mobitz I)",
  "sicher": "wahrscheinlich",
  "quelle": "ScienceDirect Topics, Second-Degree Atrioventricular Block; dvm360, Get with the beat"
 },
 {
  "id": "av-block-2-hochgradig",
  "name": "Hochgradiger AV-Block II. Grades",
  "art": "beide",
  "bedingung": ">= 2 aufeinanderfolgende blockierte P ODER festes Ueberleitungsverhaeltnis 2:1 oder schlechter ueber >= 6 P-Wellen; resultierende Kammerfrequenz meist < 60/min (Hund) bzw. < 120/min (Katze)",
  "mess": [
   "p",
   "pfrequenz",
   "rr",
   "hf",
   "pq",
   "ueberleitungsverhaeltnis",
   "qrs"
  ],
  "hinweis": "Mehrere aufeinanderfolgende nicht uebergeleitete Vorhofaktionen. Bei 2:1-Ueberleitung ist die Typisierung nach Mobitz I oder II grundsaetzlich nicht moeglich, weil nie zwei uebergeleitete Schlaege hintereinander zum Vergleich der PQ-Zeit vorliegen. Klinisch relevant ist hier die resultierende Kammerfrequenz und ob Synkopen oder Schwaeche berichtet werden.",
  "dd": "AV-Block III (dort keinerlei feste P-QRS-Beziehung), Sinusbradykardie mit unerkannten P",
  "sicher": "gesichert",
  "quelle": "ScienceDirect Topics, Second-Degree Atrioventricular Block; Merck Vet Manual"
 },
 {
  "id": "av-block-3",
  "name": "AV-Block III. Grades (kompletter Block)",
  "art": "beide",
  "bedingung": "P-Frequenz > QRS-Frequenz; PQ-Abstand von Schlag zu Schlag zufaellig wechselnd (keine feste Beziehung, Schwankung > 40 ms); P-P regelmaessig UND R-R regelmaessig, aber unabhaengig voneinander (RR-Schwankung < 5 %); Kammerfrequenz Hund 20-40/min bei breitem QRS (> 70 ms, ventrikulaerer Ersatz) bzw. 40-65/min bei schmalem QRS (junktionaler Ersatz); Katze 80-140/min",
  "mess": [
   "p",
   "pfrequenz",
   "pq",
   "rr",
   "rrschwankung",
   "hf",
   "qrs",
   "qrsform"
  ],
  "hinweis": "Vollstaendige Entkopplung von Vorhof und Kammer. Der sichtbare Kammerrhythmus ist ein Ersatzrhythmus und die einzige verbliebene Antriebsquelle - Medikamente, die ventrikulaere Aktivitaet unterdruecken, wuerden dem Patienten genau diesen Antrieb nehmen. Bei der Katze liegt die Ersatzfrequenz mit 80-140/min deutlich hoeher als beim Hund, wodurch ein kompletter Block dort leicht uebersehen wird. Bei Hunden ist dies die haeufigste Indikation fuer eine Schrittmacherversorgung.",
  "dd": "hochgradiger AV-Block II mit 3:1/4:1, Vorhofstillstand mit Ersatzrhythmus (dort fehlen die P ganz), AV-Dissoziation bei AIVR (dort ist die Kammerfrequenz die schnellere)",
  "sicher": "gesichert",
  "quelle": "ScienceDirect Topics, Third-Degree Atrioventricular Block (Ersatzfrequenz Katze 80-140/min gegen Hund 20-60/min); VIN EVECC 2022 Congress (Hund < 40-60/min, Katze 80-140/min)"
 },
 {
  "id": "av-block-2-pferd-physiologisch",
  "name": "AV-Block II. Grades beim Pferd - Normalbefund",
  "art": "pferd",
  "bedingung": "Einzelne blockierte P bei Ruhe-HF 24-44/min; P-P regelmaessig; PQ 210-410 ms (Pferdenorm); kein Blockmuster ueber 2 aufeinanderfolgende Zyklen hinaus; QRS 70-170 ms",
  "mess": [
   "p",
   "pq",
   "rr",
   "hf",
   "qrs",
   "ueberleitungsverhaeltnis"
  ],
  "hinweis": "Beim Pferd ist der AV-Block II. Grades der haeufigste physiologische Rhythmusbefund; in 24-Stunden-Aufzeichnungen zeigen ihn ueber 40 % gesunder Pferde. Er ist Ausdruck des hohen Vagotonus in Ruhe. Entscheidend fuer die Einordnung ist, ob er bei Belastung verschwindet - genau das kann ein Ruhestreifen nicht zeigen. Ein Blockmuster, das bei steigender Frequenz bestehen bleibt oder mit Kollaps einhergeht, waere anders zu bewerten. Auskultatorisch wird er regelmaessig mit Vorhofflimmern verwechselt.",
  "dd": "Vorhofflimmern (dort keine P und unregelmaessig-unregelmaessiger RR), pathologischer AV-Block bei struktureller Erkrankung",
  "sicher": "gesichert",
  "quelle": "Frontiers in Cardiovascular Medicine 2023, Muscarinic acetylcholine receptors M2 in the AV nodal tract in horses (> 40 % gesunder Pferde im 24-h-EKG); dvm360, A guide to differential diagnosis of arrhythmias in horses; Pferde-Normwerte aus Lusitano-Referenzstu"
 },
 {
  "id": "ersatzrhythmus-ventrikulaer",
  "name": "Ventrikulaerer Ersatzrhythmus / Ersatzschlag",
  "art": "beide",
  "bedingung": "Verbreiterter, formfremder QRS (> 70 ms Hund, > 40 ms Katze), der NICHT vorzeitig, sondern VERSPAETET auftritt: Kopplungsintervall >= 1,2 x lokales Median-RR; Frequenz Hund 20-40/min, Katze 80-140/min; keine zugehoerige vorangehende P",
  "mess": [
   "kopplungsintervall",
   "rr",
   "hf",
   "qrs",
   "qrsform",
   "p"
  ],
  "hinweis": "Der Komplex sieht aus wie eine ventrikulaere Extrasystole, ist aber das Gegenteil: er springt ein, weil die uebergeordneten Schrittmacher ausfallen. Das einzige Unterscheidungsmerkmal auf der Kurve ist die Zeitlage - spaet statt vorzeitig. Diese Unterscheidung entscheidet ueber die Richtung jeder weiteren Ueberlegung, denn ein Ersatzrhythmus ist die letzte verbliebene Antriebsquelle.",
  "dd": "VES (vorzeitig!), AIVR (schneller: 60-160/min beim Hund), Schenkelblock bei Sinusrhythmus",
  "sicher": "gesichert",
  "quelle": "Merck Vet Manual (ventrikulaerer Ersatzrhythmus 20-40/min); ScienceDirect Topics, Third-Degree Atrioventricular Block (Katze 80-140/min)"
 },
 {
  "id": "ersatzrhythmus-junktional",
  "name": "Junktionaler Ersatzrhythmus",
  "art": "beide",
  "bedingung": "Schmaler QRS (< 70 ms Hund, < 40 ms Katze), formgleich zum Sinus-QRS, ohne vorangehende P ODER mit negativer (retrograder) P in Ableitung II; Frequenz Hund 40-65/min, Katze 80-140/min; RR regelmaessig (RR-Schwankung < 5 %)",
  "mess": [
   "qrs",
   "qrsform",
   "p",
   "rr",
   "rrschwankung",
   "hf",
   "pq"
  ],
  "hinweis": "Rhythmus aus dem AV-Knotenbereich, der einspringt, wenn der Sinusknoten ausfaellt oder zu langsam wird. Der schmale QRS zeigt an, dass die Erregung ueber das normale Reizleitungssystem laeuft. Eine negative P in Ableitung II bei kurzem oder fehlendem PQ spricht fuer retrograde Vorhoferregung.",
  "dd": "Sinusbradykardie mit sehr kleiner P, Vorhofstillstand, akzelerierter junktionaler Rhythmus (schneller als die Ersatzfrequenz)",
  "sicher": "gesichert",
  "quelle": "ScienceDirect Topics, Junctional Rhythm (Hund 40-65/min, Katze 80-120/min); Merck Vet Manual"
 },
 {
  "id": "rechtsschenkelblock",
  "name": "Rechtsschenkelblock (RSB)",
  "art": "beide",
  "bedingung": "QRS > 70 ms (Hund; einzelne Quellen bereits > 60 ms) bzw. > 40 ms (Katze) bei JEDEM uebergeleiteten Schlag, dabei P vor jedem QRS in fester Beziehung; breite tiefe S-Zacken in I, II, III und aVF; Achse rechtsverschoben (Hund ausserhalb +40 bis +100 Grad, meist -90 bis +/-180 Grad); Rhythmus selbst unveraendert",
  "mess": [
   "qrs",
   "qrsform",
   "achse",
   "p",
   "pq",
   "rr"
  ],
  "hinweis": "RSB-Muster. Ein Schenkelblock ist keine Rhythmusstoerung, sondern eine Leitungsstoerung - der zugrunde liegende Rhythmus (z. B. Sinusrhythmus) wird zusaetzlich benannt. Beim Hund kommt ein RSB auch ohne fassbare Herzerkrankung vor; er kann aber auf rechtsventrikulaere Belastung oder Myokarderkrankung hinweisen. Wichtig fuer die Kurvenauswertung: mit einem RSB werden QRS-basierte Vergroesserungskriterien und die Unterscheidung supraventrikulaer/ventrikulaer unbrauchbar.",
  "dd": "ventrikulaerer Ersatz- oder Ektopierhythmus (dort keine feste P-QRS-Beziehung), rechtsventrikulaere Vergroesserung ohne Block, Hyperkaliaemie",
  "sicher": "wahrscheinlich",
  "quelle": "ScienceDirect Topics, Right Bundle Branch Block (QRS > 0,06 s Hund, > 0,04 s Katze; breite S in I, II, III, aVF)"
 },
 {
  "id": "linksschenkelblock",
  "name": "Linksschenkelblock (LSB)",
  "art": "beide",
  "bedingung": "QRS > 70 ms (Hund) bzw. > 40 ms (Katze) bei jedem uebergeleiteten Schlag mit P vor jedem QRS; breiter, oft gekerbter positiver R in I, II, aVF ohne tiefe S; Achse normal bis linksverschoben",
  "mess": [
   "qrs",
   "qrsform",
   "achse",
   "p",
   "pq",
   "ramp"
  ],
  "hinweis": "LSB-Muster. Beim Hund ist ein Linksschenkelblock im Unterschied zum Rechtsschenkelblock fast immer mit einer strukturellen Myokarderkrankung verbunden (dilatative Kardiomyopathie, Myokarditis, subaortenstenotische Belastung, Neoplasie) - eine weitergehende Herzabklaerung liegt daher naeher als beim RSB. Auch hier gilt: Rhythmus zusaetzlich benennen.",
  "dd": "ventrikulaere Ektopie aus dem rechten Ventrikel (dort keine feste P-Beziehung), linksventrikulaere Vergroesserung, Praeexzitation",
  "sicher": "wahrscheinlich",
  "quelle": "ScienceDirect Topics, Bundle Branch Block (allgemeine Kriterien Hund/Katze); Merck Vet Manual"
 },
 {
  "id": "linksanteriorer-faszikelblock",
  "name": "Linksanteriorer Faszikelblock (LAFB)",
  "art": "katze",
  "bedingung": "Elektrische Achse -45 bis -90 Grad; QRS nur gering verbreitert (Katze <= 40-60 ms); kleine Q und hohe R in I und aVL; tiefe S in II, III und aVF",
  "mess": [
   "achse",
   "qrs",
   "qrsform",
   "ramp"
  ],
  "hinweis": "LAFB-Muster mit ausgepraegter Linksachsenabweichung. Bei Katzen mit hypertropher Kardiomyopathie ist dieses Muster in etwa 28 % (17 von 61 Katzen) beschrieben und wird mit duennen, hypokinetischen Myokardsegmenten in Verbindung gebracht. Es ist ein Hinweis auf ein Myokardproblem, kein eigenstaendiger Rhythmusbefund - eine Echokardiografie klaert mehr als jede weitere EKG-Messung. Die Katzenachse ist normal 0 bis +160 Grad, also viel weiter gefasst als beim Hund.",
  "dd": "linksventrikulaere Hypertrophie ohne Faszikelblock, falsche Elektrodenlage, Achsenfehler durch nicht korrigierte aVF-Skalierung",
  "sicher": "wahrscheinlich",
  "quelle": "Wiley, Fascicular Blocks in: Interpretation of the Electrocardiogram in Small Animals, Kap. 7; PMC-Studie zu Conduction block and thin/hypokinetic myocardial segments in feline HCM (28 % der HCM-Katzen)"
 },
 {
  "id": "praeexzitation-wpw",
  "name": "Ventrikulaere Praeexzitation / WPW-Muster",
  "art": "beide",
  "bedingung": "PQ kuerzer als die untere Artnorm: < 60 ms (Hund) bzw. < 50 ms (Katze); verwaschener, traeger QRS-Anstieg (Deltawelle) und dadurch verbreiterter QRS bei ansonsten normalem Sinusrhythmus mit P vor jedem QRS. Von WPW-SYNDROM spricht man erst, wenn zusaetzlich eine Tachykardie dokumentiert ist",
  "mess": [
   "pq",
   "qrs",
   "qrsform",
   "p",
   "hf",
   "rr"
  ],
  "hinweis": "Muster einer ventrikulaeren Praeexzitation ueber eine akzessorische Leitungsbahn. Ohne begleitende Tachykardie ist es ein reiner EKG-Befund ohne unmittelbare Folge; kommt eine regelmaessige Schmalkomplex-Tachykardie hinzu, entspricht das dem WPW-Syndrom. Die haeufigste zugehoerige Tachykardieform ist eine AV-Reentry-Tachykardie. Wichtig fuer die Programmierung: die humanmedizinische PQ-Grenze von 120 ms ist hier bedeutungslos, weil sie oberhalb der gesamten Normspanne von Hund (60-130 ms) und Katze (50-90 ms) liegt - sie wuerde jedes Tier als praeexzitiert melden.",
  "dd": "kurzes PQ ohne Deltawelle (junktionaler Rhythmus, Lown-Ganong-Levine-artig), Messfehler bei hoher Frequenz, Schenkelblock ohne verkuerztes PQ",
  "sicher": "Verdacht",
  "quelle": "ScienceDirect Topics, Wolff-Parkinson-White Syndrome (kurzes PR mit Deltawelle und verbreitertem QRS bei Hund und Katze); Tilley (Normbereiche PQ Hund 60-130 ms, Katze 50-90 ms)"
 },
 {
  "id": "pferd-vorhofflimmern",
  "name": "Vorhofflimmern beim Pferd",
  "art": "pferd",
  "bedingung": "Keine abgrenzbaren P-Wellen in allen Ableitungen; unregelmaessig-unregelmaessiger RR ohne Periodik; feine f-Wellen auf der Grundlinie; Ruhefrequenz haeufig NORMAL (28-44/min) - eine normale Frequenz schliesst Vorhofflimmern beim Pferd also nicht aus",
  "mess": [
   "p",
   "rr",
   "rrschwankung",
   "hf",
   "qrs",
   "signalguete"
  ],
  "hinweis": "Beim Pferd ist Vorhofflimmern die haeufigste leistungsrelevante Rhythmusstoerung. Es wird bei der Auskultation regelmaessig mit dem physiologischen AV-Block II verwechselt - das EKG trennt beides: beim AV-Block bleiben die P-Wellen erhalten und die Pausen sind Vielfache des P-P, beim Vorhofflimmern fehlen die P und die Unregelmaessigkeit hat kein Muster. Eine Ruhefrequenz deutlich ueber 50-60/min bei Vorhofflimmern spricht fuer eine zugrunde liegende Herzerkrankung; anhaltend > 100/min gilt in der Literatur zur Kardioversion als Warnschwelle.",
  "dd": "AV-Block II (P erhalten), Vorhofflattern, haeufige SVES, Bewegungsartefakt beim stehenden Pferd",
  "sicher": "wahrscheinlich",
  "quelle": "PMC, The diagnosis and management of atrial fibrillation in the horse; Zuku/dvm360, Equine ECG: second-degree AV block vs atrial fibrillation; JAVMA 2018, Quinidine/Flecainide in Thoroughbred racehorses (anhaltende Tachykardie > 100/min, Kammerfrequenz > 150/m"
 },
 {
  "id": "pferd-frequenzrahmen",
  "name": "Frequenzrahmen Pferd",
  "art": "pferd",
  "bedingung": "Ruhe-HF normal 28-44/min (Medianwert einer Referenzstudie: 39/min). HF < 24/min = Bradykardie; HF > 50/min beim ausgeruhten Pferd auffaellig; anhaltend > 100/min deutlich pathologisch",
  "mess": [
   "hf",
   "rr",
   "p",
   "pq",
   "qrs",
   "qt"
  ],
  "hinweis": "Der Frequenzrahmen des Pferdes liegt vollstaendig unterhalb des Hunde- und Katzenbereichs; jede aus der Kleintiermedizin uebernommene Bradykardieschwelle wuerde beim gesunden Pferd dauerhaft ausloesen. Ergaenzende Pferde-Normwerte (Basis-Apex-Ableitung): P 90-170 ms, PQ 210-410 ms, QRS 70-170 ms, QT 330-670 ms. Die Frontalachse sagt beim Pferd wegen des abweichenden Erregungsausbreitungsmusters nichts ueber die Kammer aus und sollte dort nicht bewertet werden.",
  "dd": "trainingsbedingte Bradykardie beim Sportpferd, Schmerz/Kolik als Tachykardieursache, Sedation",
  "sicher": "gesichert",
  "quelle": "Referenzstudie Lusitanos (n=82, 25 mm/s, 10 mm/mV): HF-Median 39/min, P 90-170 ms, PQ 210-410 ms, QRS 70-170 ms, QT 330-670 ms; dvm360, A guide to differential diagnosis of arrhythmias in horses (Ruhe-HF 28-44/min)"
 },
 {
  "id": "heimtier-frequenzrahmen",
  "name": "Frequenzrahmen und Normwerte Heimtiere",
  "art": "heimtier",
  "bedingung": "Kaninchen HF 180-330/min, Frettchen 180-250/min, Meerschweinchen 230-300/min. Kaninchen-EKG-Normwerte (publizierte Studie): P-Dauer 10-50 ms und 0,04-0,12 mV, PQ 40-80 ms, QRS 20-60 ms, R 0,03-0,39 mV, QT 80-160 ms, T 0,05-0,17 mV, elektrische Achse -43 bis +80 Grad",
  "mess": [
   "hf",
   "rr",
   "p",
   "pq",
   "qrs",
   "qt",
   "ramp",
   "achse"
  ],
  "hinweis": "Fuer Heimtiere liegt in dieser Recherche nur fuer das Kaninchen eine publizierte Normwertreihe vor. Fuer Frettchen und Meerschweinchen waren belastbare Intervallnormwerte NICHT zu finden - dort ist nur der Frequenzrahmen aus Vitalparameter-Tabellen belegt, und diese sind keine EKG-Studien. Rhythmusregeln, die fuer Hund und Katze formuliert sind, sollten bei Heimtieren nicht automatisch feuern; die Frequenzen liegen um ein Vielfaches hoeher und die QRS-Breiten deutlich darunter. Fuer Kammertachykardie-, Bradykardie- und AIVR-Grenzen dieser Arten gibt es keine belegten Zahlen: unbelegt.",
  "dd": "stressbedingte Frequenzsteigerung (bei Beutetieren die Regel), Narkoseeinfluss, Elektrodenprobleme bei kleinem Koerper und dichtem Fell",
  "sicher": "Verdacht",
  "quelle": "Lord B et al. 2010, Veterinary Record: Electrocardiography of the normal domestic pet rabbit (HF 198-330/min und Intervallnormwerte); LafeberVet und VetTechPrep Vitalparameter-Tabellen (Frettchen 180-250/min, Meerschweinchen 230-300/min) - Frettchen/Meerschwei"
 },
 {
  "id": "holter-vorbehalt-rasse",
  "name": "Rassebezogene VES-Grenzwerte sind Langzeit-EKG-Werte",
  "art": "hund",
  "bedingung": ">= 1 VES auf dem Ruhestreifen bei Dobermann, Boxer oder anderer fuer ploetzlichen Herztod praedisponierter Rasse",
  "mess": [
   "qrs",
   "qrsform",
   "kopplungsintervall",
   "rr",
   "hf"
  ],
  "hinweis": "Die etablierten Zahlen zu ventrikulaerer Ektopie sind 24-Stunden-Werte und auf einem Ruhestreifen grundsaetzlich nicht pruefbar: gesunde Hunde zeigen < 50 VES/24 h; beim Dobermann gelten > 300 VES/24 h oder zweimal 50-300 VES/24 h innerhalb eines Jahres als vereinbar mit okkulter DCM; beim Boxer werden > 100-300 VES/24 h als vereinbar mit ARVC gefuehrt. Ein Streifen kann diese Einordnung weder belegen noch ausschliessen - er kann nur zeigen, dass ueberhaupt ventrikulaere Ektopie vorliegt.",
  "dd": "Einzel-VES ohne Krankheitswert; umgekehrt schliesst ein unauffaelliger Streifen eine hohe 24-h-Last nicht aus",
  "sicher": "gesichert",
  "quelle": "Wess G et al. 2017, J Vet Cardiol: ESVC screening guidelines for DCM in Doberman Pinschers (> 300 VES/24 h bzw. zweimal 50-300/24 h); Merck Vet Manual, ARVC in Dogs and Cats (Boxer > 100-300 VES/24 h)"
 },
 {
  "id": "signalguete-sperre",
  "name": "Signalguete-Sperre vor jeder Rhythmusregel",
  "art": "alle",
  "bedingung": "Wenn Grundlinienwanderung > 0,5 mV Spitze-Spitze ODER Muskelartefaktanteil > 20 % der Aufzeichnungsdauer ODER R-Amplitude < 0,2 mV ODER weniger als 5 sicher detektierte QRS im Auswertefenster: keine Rhythmusregel auswerten, nur Signalguete melden",
  "mess": [
   "signalguete",
   "ramp",
   "qrs",
   "rr"
  ],
  "hinweis": "Bei schlechter Signalguete darf kein Rhythmusbefund angezeigt werden. Muskelzittern imitiert Vorhofflimmern und Kammerflimmern, Grundlinienwanderung imitiert ST-Veraenderungen, ein wackelndes Kabel imitiert Extrasystolen und Asystolie, und Netzeinstreuung imitiert Vorhofflattern. Eine falsch positive Meldung 'Kammerflimmern' bei einem zitternden Patienten waere der teuerste Fehler, den diese Anwendung machen kann.",
  "dd": "Elektrodenkontakt, Fell/Alkohol/Gel, Hecheln, Muskelzittern durch Kaelte oder Angst, 50-Hz-Netzeinstreuung",
  "sicher": "gesichert",
  "quelle": "Allgemeine EKG-Technik; Filterregel aus der Geraetepraxis: Diagnostik 0,05-150 Hz, Notch 50 Hz (EU); Merck Vet Manual (Artefakte als haeufigste Fehlerquelle)"
 },
 {
  "id": "p-detektion-vorbehalt-katze",
  "name": "P-Wellen-Erkennung bei der Katze - Vorbehalt fuer alle 'keine P'-Regeln",
  "art": "katze",
  "bedingung": "P-Amplitude der Katze normal <= 0,2 mV; bei 10 mm/mV entspricht das <= 2 mm Papierhoehe. Wenn die gemessene Rauschamplitude > 0,05 mV betraegt, ist das Signal-Rausch-Verhaeltnis der P-Welle < 4:1 - dann darf 'keine P-Welle' nicht als Befund ausgegeben werden",
  "mess": [
   "p",
   "signalguete",
   "ramp"
  ],
  "hinweis": "Jede Regel, die auf dem Fehlen der P-Welle beruht - Vorhofflimmern, Vorhofstillstand, ventrikulaere Tachykardie, junktionaler Rhythmus - steht und faellt bei der Katze mit der P-Erkennung. Bei 25 mm/s und 10 mm/mV ist eine Katzen-P kaum von Rauschen zu trennen; 50 mm/s und 20 mm/mV sind hier die brauchbare Einstellung. Bei einer Katze mit 220/min faellt die P zusaetzlich haeufig in die vorangehende T-Welle.",
  "dd": "echtes Fehlen der P (Vorhofflimmern, Vorhofstillstand) gegen technisch nicht aufloesbare P",
  "sicher": "gesichert",
  "quelle": "Tilley, Essentials of Canine and Feline Electrocardiography (P Katze <= 0,2 mV, <= 40 ms); Geraetespezifikation Grimed EKG 2000 (5/10/20/40 mm/mV, 10-100 mm/s)"
 },
 {
  "id": "frequenzmittelung",
  "name": "Frequenzberechnung bei unregelmaessigem Rhythmus",
  "art": "alle",
  "bedingung": "Bei RR-Schwankung > 10 % darf die Herzfrequenz nicht aus einem einzelnen RR berechnet werden (HF = 60000/RR in ms), sondern muss ueber >= 10 s oder >= 10 aufeinanderfolgende RR gemittelt werden. Bei Vorhofflimmern und Bigeminus ist zusaetzlich anzugeben, dass die elektrische Frequenz die mechanische ueberschaetzt",
  "mess": [
   "hf",
   "rr",
   "rrschwankung"
  ],
  "hinweis": "Bei einem Hund mit ausgepraegter Sinusarrhythmie schwankt die aus einzelnen RR-Abstaenden berechnete Momentanfrequenz zwischen etwa 60 und 150/min. Eine Bradykardie- oder Tachykardieregel, die auf einen einzelnen RR-Abstand angewandt wird, feuert bei demselben gesunden Hund je nach Atemphase in beide Richtungen. Bei Bigeminus und Vorhofflimmern erzeugt nicht jede elektrische Aktion einen fuehlbaren Puls - das erklaert das Pulsdefizit und ist im Befund erwaehnenswert.",
  "dd": "Momentanfrequenz gegen Mittelfrequenz; elektrische gegen mechanische Frequenz",
  "sicher": "gesichert",
  "quelle": "Messtechnische Konsequenz aus der Sinusarrhythmie-Definition (> 10 % RR-Variation, Clinician's Brief Top 5 Arrhythmias); Merck Vet Manual (Holter-Mittelwert Hund 75/min, Katze ca. 165/min)"
 },
 {
  "id": "messunsicherheit-schwellen",
  "name": "Messunsicherheit an Schwellenwerten",
  "art": "alle",
  "bedingung": "Bei einer Abtastrate von 256 Hz betraegt dt = 3,91 ms; ein Intervall hat zwei Endpunkte, also +/- 3,91 ms Worst Case. Liegt ein Messwert naeher als 2 x dt an einer Regelgrenze (z. B. PQ 129 gegen 131 ms beim Hund; QRS 69 gegen 71 ms), muss der Befund als grenzwertig gekennzeichnet und nicht binaer entschieden werden",
  "mess": [
   "pq",
   "qrs",
   "qt",
   "rr",
   "p"
  ],
  "hinweis": "Die Regelgrenzen dieses Katalogs sind auf 10 ms genau formuliert, die Messung ist es nicht. An jeder Grenze existiert ein Unsicherheitsband; ein Wert darin sollte als 'im Grenzbereich' gezeigt werden statt als erfuellt oder nicht erfuellt. Feiner als +/- 4 ms darf bei 256 Hz keine Zahl ausgegeben werden. Bei der Katze, deren gesamter QRS nur 40 ms dauert, betraegt diese Unsicherheit bereits 10 % der Messgroesse.",
  "dd": "echte Grenzwertueberschreitung gegen Abtastunsicherheit gegen Fehler bei der Onset-/Offset-Bestimmung",
  "sicher": "gesichert",
  "quelle": "Messtechnische Herleitung aus der Abtastrate; Geraetespezifikation Grimed EKG 2000"
 },
 {
  "id": "gate-echte-ableitungen",
  "name": "Sperre: Achsen- und Morphologieregeln nur bei echt aufgezeichneten Ableitungen",
  "art": "alle",
  "bedingung": "Achsenbasierte und lead-morphologische Regeln (Achse, LAFB, Schenkelblock, VES-Morphologie, S-Zacken-Kriterien) NUR auswerten, wenn mindestens ZWEI unabhaengig aufgezeichnete Extremitaetenableitungen vorliegen (z. B. I und II, oder I und III). Aus einem einzelnen Ableitung-II-Streifen ist kein Winkel bestimmbar.",
  "mess": [
   "anzahlechtaufgezeichneterableitungen",
   "achse"
  ],
  "hinweis": "Aus Ableitung II allein laesst sich die elektrische Achse nicht bestimmen. Nach Einthoven gilt II = I + III; bei bekanntem II bleibt ein Freiheitsgrad offen, jede daraus 'abgeleitete' Ableitung I oder III ist eine Annahme. Solange nur II aufgezeichnet wurde, werden Achse, Faszikelblock, Schenkelblock und VES-Morphologie nicht ausgegeben.",
  "dd": "Keine - dies ist eine Rechen-, keine Befundregel.",
  "sicher": "gesichert",
  "quelle": "Einthoven-Dreieck (mathematisch zwingend); Skalenkorrektur aVF x 2/sqrt(3) siehe Projektnotiz vetstation-ekg-normwerte.md"
 },
 {
  "id": "gate-signalguete",
  "name": "Sperre: Befunde nur bei ausreichender Signalguete und Streifenlaenge",
  "art": "alle",
  "bedingung": "Keine Befundausgabe, wenn Streifendauer < 10 s ODER < 10 auswertbare Schlaege ODER Grundlinienwanderung > 0,10 mV ODER Muskelartefaktamplitude > 0,05 mV ODER 50-Hz-Netzanteil > 0,05 mV. Verstaerkung und Vorschub muessen bekannt und protokolliert sein.",
  "mess": [
   "signalguete",
   "streifendauer",
   "schlagzahl",
   "verstaerkung",
   "vorschub"
  ],
  "hinweis": "Die Aufzeichnung erlaubt keine belastbare Messung. Amplituden- und Zeitregeln werden ausgesetzt, bis Elektrodenkontakt, Lagerung und Filter geklaert sind.",
  "dd": "Zittern, Hecheln, Muskelzittern bei Hypothermie, loser Elektrodenclip, Netzbrumm.",
  "sicher": "gesichert",
  "quelle": "Programmierentscheidung - eine tiermedizinische Zahlenvorgabe fuer Signalguete ist unbelegt. Begruendet ueber die Messunsicherheit +/-3,91 ms bei 256 Hz Abtastrate."
 },
 {
  "id": "p-mitrale-hund",
  "name": "P mitrale - verbreiterte P-Welle, Hinweis auf linksatriale Vergroesserung (MMVD)",
  "art": "hund",
  "bedingung": "P vorhanden vor jedem QRS UND pDauer > 40 ms in Ableitung II. Stufe 2: pDauer > 43,5 ms. Stufe 3: pDauer > 50 ms oder gekerbte/M-foermige P-Welle. Verstaerkung 10 mm/mV, Vorschub >= 25 mm/s.",
  "mess": [
   "pdauer",
   "pvorhanden",
   "hf",
   "verstaerkung",
   "vorschub"
  ],
  "hinweis": "Die P-Welle ist verbreitert (P mitrale). Das passt zu einem vergroesserten linken Vorhof, wie er bei Mitralklappenendokardiose vorkommt. Belegte Trennschaerfe: bei 43,5 ms gegen ein echokardiografisches LA/Ao >= 1,6 rund 70 % Empfindlichkeit und 90 % Spezifitaet; bei 50 ms 75 % / 68 % (AUC 0,70). Eine unauffaellige P-Dauer schliesst einen vergroesserten Vorhof also nicht aus - die Vorhofgroesse wird im Echo gemessen, nicht im EKG.",
  "dd": "Interatriale Leitungsverzoegerung ohne Vergroesserung; Vorhofvergroesserung anderer Ursache (DCM, Links-Rechts-Shunt, Mitraldysplasie); Messfehler bei flachem P, Muskelzittern oder Grundlinienwanderung.",
  "sicher": "wahrscheinlich",
  "quelle": "Tilley, Essentials of Canine and Feline Electrocardiography (Grenze 0,04 s Hund und Katze); Kim et al., J Vet Sci 2021 (PMC8451713): P-Dauer 34,2 ms in ACVIM B1, 40,3 ms in B2, 49,2 ms in C; Cut-off 43,5 ms gegen LA/Ao >= 1,6 Sens 70 % / Spez 90 %; Noh et al. "
 },
 {
  "id": "qrs-verbreiterung-links-hund",
  "name": "QRS-Verbreiterung - Hinweis auf linksventrikulaere Umbauvorgaenge (Hund)",
  "art": "hund",
  "bedingung": "qrs > 47 ms (Studiengrenze) bzw. Lehrbuchgrenze qrs > 50 ms bei Koerpermasse < 15 kg und qrs > 60 ms bei > 15 kg, bei erhaltenem Sinusrhythmus (P vor jedem QRS, pq 60-130 ms).",
  "mess": [
   "qrs",
   "pvorhanden",
   "pq",
   "koerpermasse"
  ],
  "hinweis": "Der QRS-Komplex ist breiter als erwartet. Bei erhaltenem Sinusrhythmus passt das zu einer linksventrikulaeren Vergroesserung oder zu einer intraventrikulaeren Leitungsverzoegerung. Belegt fuer 47 ms: 71 % Empfindlichkeit / 70 % Spezifitaet gegen echokardiografischen Linksumbau (AUC 0,76) - fuer sich genommen zu unscharf fuer eine Aussage ueber die Kammergroesse.",
  "dd": "Schenkelblock; ventrikulaerer Ursprung des Schlages (dann fehlt das vorangehende P); Hyperkaliaemie; Antiarrhythmika der Klasse I; Messfehler bei unscharfem QRS-Ende.",
  "sicher": "wahrscheinlich",
  "quelle": "Noh et al. 2022 (PMC9615506), Cut-off 0,047 s, Sens 71,2 % / Spez 70,4 %, AUC 0,76; Groessengrenzen 0,05 / 0,06 s nach Tilley und LMU Tierkardiologie"
 },
 {
  "id": "linksherzvergroesserung-hund",
  "name": "Hohe R-Zacke - Hinweis auf Linksherzvergroesserung (Hund)",
  "art": "hund",
  "bedingung": "rAmp in Ableitung II > 2,5 mV bei Koerpermasse < 15 kg ODER > 3,0 mV bei > 15 kg, bei nachgewiesener Verstaerkung 10 mm/mV. Zwischenstufe: rAmp > 2,67 mV.",
  "mess": [
   "ramp",
   "koerpermasse",
   "verstaerkung"
  ],
  "hinweis": "Die R-Zacke ist hoch. Das kann zu einer exzentrischen Linksherzvergroesserung passen (z. B. bei Mitralklappenendokardiose, Shunt, Aorteninsuffizienz). Die Trennschaerfe ist schwach: bei 2,67 mV nur 50 % Empfindlichkeit und 69 % Spezifitaet gegen den Echobefund. Schlanke, tiefbrustige Rassen (Windhunde, Deutscher Schaeferhund) haben auch ohne Erkrankung hohe R-Zacken.",
  "dd": "Rasse- und Konstitutionsvariante; duenne Brustwand, Kachexie; falsch gewaehlte Verstaerkung (20 mm/mV verdoppelt jede Amplitude); Sympathikustonus.",
  "sicher": "Verdacht",
  "quelle": "Tilley (R > 2,5 mV kleine / > 3,0 mV grosse Rassen); LMU Tierkardiologie EKG-Morphologie; Noh et al. 2022 (PMC9615506), Cut-off 2,67 mV, Sens 50 % / Spez 68,5 %, AUC 0,58"
 },
 {
  "id": "verlauf-pq-ramp-hund",
  "name": "Verlaufsaenderung von PQ und R-Amplitude beim selben Tier",
  "art": "hund",
  "bedingung": "Gegenueber einer frueheren Aufnahme desselben Tieres unter gleichen Bedingungen (gleiche Verstaerkung, gleicher Vorschub, gleiche Elektrodenlage, gleiche Lagerung): pq-Zunahme > 9,7 % ODER rAmp-Zunahme > 6,7 %.",
  "mess": [
   "pq",
   "ramp",
   "voraufnahmepq",
   "voraufnahmeramp",
   "verstaerkung",
   "vorschub"
  ],
  "hinweis": "Im Vergleich zur Voraufnahme haben sich PQ und/oder R-Amplitude deutlich veraendert. Die Verlaufsaenderung trennt in der Literatur besser als jeder Einzelwert (PQ +9,7 %: 87 % Empfindlichkeit / 82 % Spezifitaet; R +6,7 %: 87 % / 65 %) und passt zu einem fortschreitenden Linksumbau. Voraussetzung ist, dass beide Aufnahmen technisch identisch entstanden sind.",
  "dd": "Geaenderte Elektrodenlage oder Lagerung; geaenderte Verstaerkung; Gewichts- oder Fellaenderung; Medikamentenwirkung (Digoxin, Betablocker verlaengern PQ); Sympathikustonus.",
  "sicher": "wahrscheinlich",
  "quelle": "Noh et al. 2022 (PMC9615506): PQ-Aenderungsrate 9,7 % Sens 86,7 % / Spez 82,4 % (AUC 0,82); R-Amplituden-Aenderungsrate 6,7 % Sens 86,7 % / Spez 64,7 % (AUC 0,74)"
 },
 {
  "id": "vorhofflimmern-hund",
  "name": "Vorhofflimmern (Hund)",
  "art": "hund",
  "bedingung": "Ueber >= 10 aufeinanderfolgende Schlaege KEINE abgrenzbare P-Welle vor irgendeinem QRS UND RR unregelmaessig-unregelmaessig (Streuung der RR-Abstaende > 10 % OHNE wiederkehrende Periodik, kein Atemmuster) UND qrs schmal (<= 70 ms) UND hf meist > 140/min.",
  "mess": [
   "pvorhanden",
   "rr",
   "rrschwankung",
   "rrperiodizitaet",
   "qrs",
   "hf"
  ],
  "hinweis": "Kein P vor den Kammerkomplexen, dazu ein unregelmaessig-unregelmaessiger Rhythmus mit schmalen QRS - das entspricht dem Bild eines Vorhofflimmerns. In einer Kohorte mit Mitralklappenendokardiose lag die Haeufigkeit bei 0,3 % in ACVIM B1/B2, aber 16,3 % in C/D; die mittlere Frequenz betrug 187 +/- 41/min gegenueber 128 +/- 31/min ohne Flimmern. Groessere Hunde sind haeufiger betroffen (17,3 vs. 10,7 kg im Mittel; +9 % Risiko je kg). Ein linker Vorhof > 3,45 cm bzw. LA/Ao > 1,8 im Echo geht dem meist voraus.",
  "dd": "Ausgepraegte Sinusarrhythmie beim Hund - dort ist vor JEDEM QRS ein P und die Schwankung folgt periodisch der Atmung; Vorhofstillstand bei Hyperkaliaemie - dort fehlt das P ebenfalls, der Rhythmus ist aber REGELMAESSIG und langsam; multifokale atriale Tachykardie; Vorhofflattern mit wechselnder Ueberleitung; P im QRS oder T verborgen bei hoher Frequenz.",
  "sicher": "wahrscheinlich",
  "quelle": "Guglielmini et al. 2020, Prevalence and risk factors for atrial fibrillation in dogs with MMVD (PMC7694843): Praevalenz 2,7 % gesamt, 0,3 % B1/B2, 16,3 % C/D; HF 187 +/- 41/min; LA > 3,45 cm Sens 98,3 % / Spez 89,8 %"
 },
 {
  "id": "kammerektopie-holter-anlass-hund",
  "name": "Ventriculaere Extrasystole im Ruhestreifen - Anlass fuer Langzeit-EKG (Zuchtrassen)",
  "art": "hund",
  "bedingung": ">= 1 vorzeitiger QRS (RR < 0,80 x mittleres RR) OHNE vorangehende P-Welle UND qrs > 70 ms, bei Dobermann, Boxer, Irischem Wolfshund, Deutscher Dogge oder Neufundlaender ab 3 Jahren.",
  "mess": [
   "qrs",
   "pvorhanden",
   "rr",
   "veszahl",
   "streifendauer",
   "rasse",
   "alter"
  ],
  "hinweis": "Im Streifen ist mindestens ein Kammerextraschlag zu sehen. Bei diesen Rassen sind das die Zahlen aus der Langzeit-Literatur, an denen sich die Bewertung orientiert: Dobermann - unter 50 VES/24 h gilt als unauffaellig, 50 bis 300 VES/24 h in zwei Aufnahmen innerhalb eines Jahres bzw. ueber 300 VES/24 h in einer Aufnahme gelten als Kriterium fuer eine okkulte DCM; ueber 100 VES/24 h oder Couplets, Triplets und Laeufe gelten als auffaellig. Boxer - Median gesunder erwachsener Tiere 10 VES/24 h, ueber 100/24 h auffaellig, ueber 1000/24 h mit linksschenkelblockartiger Form als klinisches ARVC-Kriterium. Diese Zahlen beziehen sich auf 24 Stunden und lassen sich aus einem Kurzstreifen nicht hochrechnen.",
  "dd": "Elektrolytstoerung (Kalium, Magnesium); Schmerz, Angst, Katecholamine; Hypoxie, Anaemie; extrakardiale Ursache (Milztumor, Magendrehung, Trauma, Sepsis); Digoxin; Artefakt bei Bewegung.",
  "sicher": "Verdacht",
  "quelle": "Wess et al., European Society of Veterinary Cardiology screening guidelines for DCM in Doberman Pinschers, J Vet Cardiol 2017 (PMID 28965673); Mõtsküla et al., J Vet Intern Med 2013;27:904-912 (Boxer, < 50 VES/24 h und Alter < 4,5 J. mit unauffaelligem Echo = "
 },
 {
  "id": "ves-lsb-morphologie-boxer",
  "name": "Kammerextrasystole mit linksschenkelblockartiger Form (Boxer, ARVC-Muster)",
  "art": "hund",
  "bedingung": "Rasse Boxer UND vorzeitiger QRS ohne vorangehende P-Welle UND qrs > 70 ms UND QRS in II, III und aVF POSITIV (kaudal gerichteter Hauptvektor, linksschenkelblockartige Form). Erfordert echt aufgezeichnete Ableitungen II, III und aVF (siehe gate-echte-ableitungen).",
  "mess": [
   "qrs",
   "pvorhanden",
   "qrspolaritaetii",
   "qrspolaritaetiii",
   "qrspolaritaetavf",
   "rasse"
  ],
  "hinweis": "Die Extraschlaege sind breit, haben kein vorangehendes P und sind in den kaudalen Ableitungen positiv - das entspricht der linksschenkelblockartigen Form, die bei der arrhythmogenen rechtsventrikulaeren Kardiomyopathie des Boxers beschrieben ist. Das klinische Kriterium in der Literatur lautet ueber 1000 solcher Extraschlaege in 24 Stunden, gegebenenfalls zusammen mit Synkopen; ueber 100/24 h beim erwachsenen Boxer gilt bereits als auffaellig, der Median gesunder Tiere liegt bei 10/24 h. Ein Ruhestreifen kann diese Zahl weder belegen noch widerlegen. Polymorphe Extraschlaege und Kammertachykardien waren in der Verlaufsstudie mit kuerzerer Ueberlebenszeit verbunden.",
  "dd": "Sonstige Kammerektopie ohne ARVC (Elektrolyt, Hypoxie, extrakardial); rechtsventrikulaerer Ausflusstrakt-Ursprung ohne Strukturerkrankung; supraventrikulaerer Schlag mit aberranter Leitung (dort ist ein P zu finden); Artefakt.",
  "sicher": "Verdacht",
  "quelle": "Merck Veterinary Manual, ARVC in Dogs and Cats (> 1000 VES/24 h mit LSB-Morphologie, > 100-300/24 h diagnostisch wegweisend, Median gesunder Boxer 10/24 h); Mõtsküla et al., J Vet Intern Med 2013;27:904-912"
 },
 {
  "id": "kammertachykardie",
  "name": "Kammertachykardie",
  "art": "beide",
  "bedingung": ">= 3 (Lehrbuchdefinition; manche Quellen >= 4) aufeinanderfolgende QRS OHNE vorangehende P-Welle, qrs > 70 ms (Hund) bzw. > 40 ms (Katze), mit hf > 160/min (Hund) bzw. > 240/min (Katze). Anhaltend, wenn die Episode > 30 s dauert.",
  "mess": [
   "qrs",
   "pvorhanden",
   "hf",
   "lauflaenge",
   "laufdauer"
  ],
  "hinweis": "Mehrere breite Kammerkomplexe in Folge ohne vorangehende P-Wellen und mit hoher Frequenz entsprechen dem Bild einer Kammertachykardie. Die Frequenzgrenze ist zu beachten: ein normaler Sinusrhythmus erreicht beim Hund 150 bis 180/min, die Breite des QRS allein trennt nicht. Bei Formwechsel von Schlag zu Schlag (polymorph) und bei anhaltenden Episoden wird in der Literatur ein hoeheres Risiko beschrieben.",
  "dd": "Supraventrikulaere Tachykardie mit Schenkelblock oder aberranter Leitung - dort ist vor jedem QRS ein P; Sinustachykardie bei Schenkelblock; Artefakt durch Muskelzittern; beschleunigter Kammerrhythmus (langsamer, siehe eigene Regel).",
  "sicher": "wahrscheinlich",
  "quelle": "Merck Veterinary Manual, Conduction Abnormalities in Dogs and Cats; Veterian Key, Ventricular Tachyarrhythmias (>= 3 aufeinanderfolgende Schlaege, Behandlungsdiskussion ab > 160/min anhaltend)"
 },
 {
  "id": "beschleunigter-kammerrhythmus",
  "name": "Beschleunigter Kammerrhythmus (AIVR) - typisch bei extrakardialer Ursache",
  "art": "hund",
  "bedingung": ">= 4 aufeinanderfolgende QRS ohne vorangehende P-Welle, qrs > 70 ms, hf 60-160/min, oft mit Fusions- und Ueberleitungsschlaegen an den Raendern des Laufes.",
  "mess": [
   "qrs",
   "pvorhanden",
   "hf",
   "lauflaenge"
  ],
  "hinweis": "Ein Kammerrhythmus mit dieser Frequenz liegt zwischen Ersatzrhythmus und Kammertachykardie. Dieses Muster ist typisch fuer eine Ursache ausserhalb des Herzens - Milzmasse, Magendrehung, Thoraxtrauma, Sepsis, Pankreatitis. Zur Groessenordnung aus der Literatur: bei Magendrehung werden Herzrhythmusstoerungen in bis zu 40 % der Faelle beschrieben, in Serien bis 50 % und vor allem um 36 Stunden nach der Operation; nach Milzentfernung zeigten im Langzeit-EKG 22 von 50 Hunden schnelle Kammertachykardien, bei rupturierter Milzmasse 16 von 23 gegenueber 1 von 17 ohne Ruptur.",
  "dd": "Kammertachykardie (schneller, > 160/min); Kammerersatzrhythmus bei AV-Block III (langsamer, mit unabhaengigen P-Wellen); Elektrolytstoerung; Digoxin; primaere Kardiomyopathie.",
  "sicher": "wahrscheinlich",
  "quelle": "Veterian Key, Ventricular Tachyarrhythmias (AIVR 60-160/min); Merck Veterinary Manual, Gastric Dilation and Volvulus (Arrhythmien bis 40 %); Marino et al., Ventricular arrhythmias in dogs undergoing splenectomy (Holter: 22/50 mit schneller VT, 16/23 bei Ruptur"
 },
 {
  "id": "linksherzvergroesserung-katze",
  "name": "Hohe R-Zacke bei der Katze - Hinweis auf Linksherzvergroesserung",
  "art": "katze",
  "bedingung": "rAmp in Ableitung II > 0,9 mV bei Verstaerkung 10 mm/mV; empfohlener Vorschub 50 mm/s. Zusatzkriterium: qrs > 40 ms.",
  "mess": [
   "ramp",
   "qrs",
   "verstaerkung",
   "vorschub"
  ],
  "hinweis": "Die R-Zacke liegt ueber dem Katzengrenzwert von 0,9 mV, das kann zu einer linksventrikulaeren Vergroesserung passen. Wichtig fuer die Einordnung: das 6-Kanal-EKG ist bei der Katze ein schlechter Suchtest fuer eine subklinische hypertrophe Kardiomyopathie. In einer aktuellen Untersuchung erreichte die R-Amplitude als alleiniges Merkmal nur eine AUC von 0,64; bei > 0,26 mV lagen Empfindlichkeit und Spezifitaet bei 65 % und 62 %, bei > 0,1 mV bei 90 % und 11,5 %. QRS-Dauer, P-Dauer und QT unterschieden sich zwischen gesunden Katzen und HCM-Katzen nicht.",
  "dd": "Rasse- und Konstitutionsvariante; Hyperthyreose; systemische Hypertonie; Akromegalie; falsch gewaehlte Verstaerkung; Aufregung.",
  "sicher": "Verdacht",
  "quelle": "Tilley (R > 0,9 mV Katze); Accuracy of 6-lead electrocardiography in identifying subclinical hypertrophic cardiomyopathy in cats, J Vet Intern Med 2026;40:aalaf009 (R > 0,26 mV Sens 65 % / Spez 62 %, AUC 0,64; QRS 51 vs. 51 ms n. s.; P-Dauer 48,7 vs. 48,0 ms n"
 },
 {
  "id": "ekg-schliesst-hcm-nicht-aus-katze",
  "name": "Unauffaelliges EKG bei der Katze - kein Ausschluss einer Kardiomyopathie",
  "art": "katze",
  "bedingung": "Alle gemessenen Werte im Katzennormbereich: hf 120-240/min, pDauer <= 40 ms, pAmp <= 0,2 mV, pq 50-90 ms, qrs <= 40 ms, rAmp <= 0,9 mV, qt 120-180 ms, keine Extrasystolen im Streifen.",
  "mess": [
   "hf",
   "pdauer",
   "pamp",
   "pq",
   "qrs",
   "ramp",
   "qt",
   "veszahl"
  ],
  "hinweis": "Alle Messwerte liegen im Normbereich der Katze. Das bedeutet ausdruecklich NICHT, dass das Herz unauffaellig ist. Das 6-Kanal-Oberflaechen-EKG hat fuer die linksventrikulaere Hypertrophie und die Vorhofvergroesserung der Katze eine niedrige Empfindlichkeit und wird in den ACVIM-Leitlinien 2020 nicht als Suchtest empfohlen; das Vorliegen einer Rhythmusstoerung im Zweiminutenstreifen erreichte gegen eine echokardiografisch gesicherte Hypertrophie 31 % Empfindlichkeit bei 100 % Spezifitaet. Die Beurteilung der Wanddicke erfolgt im Echo.",
  "dd": "Entfaellt - dies ist ein Hinweis auf die Grenze der Methode.",
  "sicher": "gesichert",
  "quelle": "Luis Fuentes et al., ACVIM consensus statement guidelines for the classification, diagnosis, and management of cardiomyopathies in cats, J Vet Intern Med 2020;34:1062-1077 (PMC7255676): Empfindlichkeit des 6-Kanal-EKG fuer LV-Hypertrophie und LA-Vergroesserung"
 },
 {
  "id": "qt-verlaengerung-katze-lvh",
  "name": "Verlaengertes QT bei der Katze - schwacher Hinweis auf linksventrikulaere Hypertrophie",
  "art": "katze",
  "bedingung": "qt > 170 ms bei hf im Normbereich 120-240/min. Zweite Stufe: qt > 180 ms (Katzenobergrenze nach Lehrbuch).",
  "mess": [
   "qt",
   "hf"
  ],
  "hinweis": "Das QT-Intervall ist verlaengert. In einer Untersuchung an Katzen mit linksventrikulaerer Hypertrophie war das QT der einzige Wellenwert, der sich von gesunden Katzen unterschied; ein Grenzwert von 170 ms erreichte 48 % Empfindlichkeit bei 91 % Spezifitaet. Ein verlaengertes QT war in dieser Arbeit mit kuerzerer Ueberlebenszeit verbunden. Eine frequenzkorrigierte QT-Zahl wird bei der Katze bewusst NICHT ausgegeben - die gebraeuchlichen Korrekturformeln sind fuer den Hund abgeleitet und fuer die Katze nicht belegt.",
  "dd": "Hypokalzaemie; Hypokaliaemie; Antiarrhythmika der Klasse III, Sotalol; Hypothermie; Messfehler beim T-Ende bei hoher Frequenz (bei 240/min betraegt ein RR nur 250 ms).",
  "sicher": "Verdacht",
  "quelle": "Romito et al., Diagnostic and prognostic utility of surface electrocardiography in cats with left ventricular hypertrophy, J Vet Cardiol 2018 (PMID 30082249): QT > 170 ms Sens 48,3 % / Spez 91 %, QTc > 188 ms Sens 62 % / Spez 77 %; QTc-Formeln fuer die Katze: "
 },
 {
  "id": "lafb-katze",
  "name": "Linksanteriorer Faszikelblock (Katze)",
  "art": "katze",
  "bedingung": "achse zwischen -30 Grad und -90 Grad in der Frontalebene UND qrs <= 40 ms (NICHT verbreitert) UND R in I und aVL positiv und hoeher als in II UND tiefe S-Zacken in II, III und aVF. Erfordert echt aufgezeichnete Ableitungen (siehe gate-echte-ableitungen).",
  "mess": [
   "achse",
   "qrs",
   "rampi",
   "rampavl",
   "sampii",
   "sampiii",
   "sampavf"
  ],
  "hinweis": "Linksachsenabweichung bei normal breitem QRS mit kleinen R- und tiefen S-Zacken in den kaudalen Ableitungen entspricht dem Bild eines linksanterioren Faszikelblocks. Das ist die konsistenteste EKG-Auffaelligkeit bei der Kardiomyopathie der Katze; EKG-Veraenderungen werden bei 35 bis 70 % der betroffenen Katzen berichtet. Der Befund kommt aber auch ohne Kardiomyopathie vor und sein Fehlen sagt nichts aus. Achtung beim Normbereich: die Katzenachse reicht regulaer von 0 bis +160 Grad, deshalb ist der Hundemassstab hier unbrauchbar.",
  "dd": "Rechtsherzvergroesserung mit veraenderter Achse; Hyperkaliaemie; Lagerungsartefakt und falsche Elektrodenzuordnung (vertauschte Vorderextremitaeten kehren Ableitung I um); Thoraxerguss.",
  "sicher": "Verdacht",
  "quelle": "Conduction block and thin and hypokinetic myocardial segments in feline hypertrophic cardiomyopathy (PMC12456267); Wiley, Interpretation of the Electrocardiogram in Small Animals, Kapitel Fascicular Blocks"
 },
 {
  "id": "niedervoltage",
  "name": "Niedervoltage - kleine QRS-Amplituden",
  "art": "beide",
  "bedingung": "rAmp in Ableitung II < 1,0 mV beim Hund bzw. < 0,2 mV bei der Katze, bei nachgewiesener Verstaerkung 10 mm/mV. Strengere Stufe: rAmp < 0,5 mV (Hund).",
  "mess": [
   "ramp",
   "verstaerkung",
   "koerpermasse"
  ],
  "hinweis": "Die Kammerkomplexe sind auffallend klein. Das kommt vor, wenn zwischen Herz und Hautelektrode zusaetzliches Material liegt - Perikarderguss, Pleuraerguss, Adipositas, Pneumothorax, Lungenoedem, Hautoedem - und auch bei Hypothyreose. Zur Groessenordnung: rund die Haelfte der Hunde mit Perikarderguss zeigt Niedervoltage, die andere Haelfte nicht. Ein normal grosses QRS spricht also nicht gegen einen Erguss.",
  "dd": "Perikarderguss; Pleuraerguss; Adipositas; Pneumothorax; schweres Lungenoedem; subkutanes Oedem; Hypothyreose; schlechter Elektrodenkontakt; falsch eingestellte Verstaerkung (5 mm/mV halbiert jede Amplitude).",
  "sicher": "wahrscheinlich",
  "quelle": "Tilley (R < 1,0 mV Hund, < 0,2 mV Katze); Merck Veterinary Manual, Pericardial Disease in Dogs and Cats; Today's Veterinary Practice, Pericardial Effusion in Canine Patients (Niedervoltage bei ca. 50 % der Hunde mit Perikarderguss)"
 },
 {
  "id": "elektrischer-alternans",
  "name": "Elektrischer Alternans - wechselnde R-Amplitude von Schlag zu Schlag",
  "art": "beide",
  "bedingung": "Ueber >= 10 aufeinanderfolgende Schlaege wechselt die R-Amplitude in einem regelmaessigen 2:1-Muster; Amplitudenunterschied >= 0,10 mV oder >= 10 % der mittleren R-Amplitude, bei regelmaessigem RR (rrSchwankung < 10 %).",
  "mess": [
   "ramp",
   "rampalternans",
   "rrschwankung",
   "hf",
   "verstaerkung"
  ],
  "hinweis": "Die Hoehe der R-Zacke wechselt von Schlag zu Schlag im festen Wechsel. Das entsteht, wenn das Herz im Beutel schwingt, und wird beim Perikarderguss beschrieben - allerdings sehr uneinheitlich: die Angaben reichen von 6 bis 60 % der betroffenen Hunde. Die meisten Perikardergusspatienten zeigen keinen Alternans, und die meisten Alternans-Befunde beruhen nicht auf einem Perikarderguss. Der hier verwendete Amplitudenschwellenwert ist eine Programmierentscheidung; eine tiermedizinisch belegte Zahlengrenze fuer den Alternans gibt es nicht.",
  "dd": "Atembedingte Schwankung der Herzlage (Hecheln, tiefe Atmung); Elektrodenbewegung; wechselnde Ueberleitung bei supraventrikulaerer Tachykardie; Kammerbigeminus (dort wechseln aber auch Breite und Form, nicht nur die Hoehe); schwere Kardiomyopathie.",
  "sicher": "Verdacht",
  "quelle": "Amplitudenkriterium unbelegt (Programmierentscheidung). Haeufigkeit: Today's Veterinary Practice, Pericardial Effusion in Canine Patients und Merck Veterinary Manual (6-60 %); Mechanismus: Schwingen des Herzens im Erguss"
 },
 {
  "id": "perikarderguss-trias",
  "name": "Kombination Tachykardie plus Niedervoltage plus Alternans",
  "art": "beide",
  "bedingung": "hf > 140/min (Hund) bzw. > 220/min (Katze) UND rAmp < 1,0 mV (Hund) bzw. < 0,2 mV (Katze) UND R-Amplituden-Alternans im 2:1-Muster ueber >= 10 Schlaege - alle drei Bedingungen gleichzeitig.",
  "mess": [
   "hf",
   "ramp",
   "rampalternans",
   "verstaerkung"
  ],
  "hinweis": "Sinustachykardie, kleine Kammerkomplexe und wechselnde R-Hoehe treten zusammen auf. Diese Kombination ist das klassisch beschriebene Bild eines groesseren Perikardergusses, gegebenenfalls mit Tamponade. Die drei Zeichen sind einzeln unscharf, gemeinsam sind sie deutlich aussagekraeftiger - eine objektive Risikoabschaetzung erlauben sie trotzdem nicht. Ein Ultraschall des Herzbeutels klaert die Frage direkt.",
  "dd": "Schwerer Pleuraerguss mit Tachykardie; Adipositas mit Schmerz oder Aufregung; schwere Kardiomyopathie im Endstadium; Kombination aus Adipositas und Sinustachykardie ohne Erguss.",
  "sicher": "wahrscheinlich",
  "quelle": "Klassische Trias: Merck Veterinary Manual, Pericardial Disease in Dogs and Cats; Today's Veterinary Practice, Pericardial Effusion in Canine Patients"
 },
 {
  "id": "p-pulmonale",
  "name": "P pulmonale - hohe P-Welle, Hinweis auf rechtsatriale Belastung",
  "art": "beide",
  "bedingung": "pAmp in Ableitung II > 0,4 mV beim Hund bzw. > 0,2 mV bei der Katze, bei Verstaerkung 10 mm/mV, bei pDauer <= 40 ms.",
  "mess": [
   "pamp",
   "pdauer",
   "verstaerkung",
   "hf"
  ],
  "hinweis": "Die P-Welle ist hoch (P pulmonale). Das passt zu einer Belastung oder Vergroesserung des rechten Vorhofs, wie sie bei chronischer Atemwegs- oder Lungenerkrankung, Pulmonalstenose, Trikuspidalinsuffizienz, Dirofilariose oder pulmonaler Hypertonie vorkommt. Zu beachten: eine chronische Lungenerkrankung kann ein P pulmonale erzeugen, ohne dass eine Herzerkrankung vorliegt, und Aufregung hebt die P-Amplitude voruebergehend an. Eine Wiederholungsmessung am ruhigen Tier ordnet den Befund besser ein.",
  "dd": "Sympathikustonus, Aufregung, Schmerz, Fieber, Anaemie; chronische Bronchitis, Trachealkollaps, Lungenfibrose; Pulmonalstenose; Dirofilariose, Angiostrongylose; falsch gewaehlte Verstaerkung.",
  "sicher": "Verdacht",
  "quelle": "Tilley (P > 0,4 mV Hund, > 0,2 mV Katze); Veterian Key, Electrocardiography; LMU Tierkardiologie EKG-Morphologie"
 },
 {
  "id": "rechtsachsenabweichung-hund",
  "name": "Rechtsachsenabweichung (Hund)",
  "art": "hund",
  "bedingung": "achse > +100 Grad (Normbereich Hund +40 bis +100 Grad; je nach Quelle wird die Grenze bei +100 bis +103 Grad gezogen). Erfordert echt aufgezeichnete Ableitungen und die Skalenkorrektur y = Netto_aVF x 2/sqrt(3) vor atan2.",
  "mess": [
   "achse",
   "qrs",
   "sampi",
   "sampii",
   "sampiii"
  ],
  "hinweis": "Die mittlere elektrische Achse ist nach rechts verschoben. Das kann zu einer Rechtsherzvergroesserung passen, etwa bei Pulmonalstenose, Dirofilariose, pulmonaler Hypertonie oder chronischer Lungenerkrankung. Wichtig fuer die Einordnung: nur rund ein Drittel der Hunde mit echokardiografisch gesicherter Rechtsherzvergroesserung zeigt ueberhaupt eine Rechtsverschiebung (Empfindlichkeit 33 %), die Spezifitaet liegt allerdings bei 95 %. Eine normale Achse spricht also nicht gegen eine Rechtsherzbelastung. Die ACVIM-Konsensusleitlinie zur pulmonalen Hypertonie des Hundes von 2020 nennt keine EKG-Kriterien fuer die Diagnose - dort gibt es keine belegten Zahlenwerte.",
  "dd": "Rechtsschenkelblock; ventrikulaerer Ursprung des Schlages; vertauschte Extremitaetenelektroden; Lagerungsartefakt; fehlende aVF-Skalenkorrektur im Rechenweg (macht jede Achse zu flach, verdeckt also eher).",
  "sicher": "Verdacht",
  "quelle": "Achsennormbereich Hund +40 bis +100 Grad: Tilley. Empfindlichkeit: Evaluation of a Novel Precordial Lead System for the Electrocardiographic Diagnosis of Right Ventricular Enlargement in Dogs, Vet Sci 2022 (PMC9416239): Rechtsverschiebung bei 9/27 = 33 %, Spez"
 },
 {
  "id": "tiefe-s-zacken-rechtsherz-hund",
  "name": "Tiefe S-Zacken in I, II und III (Hund)",
  "art": "hund",
  "bedingung": "S-Zacke in Ableitung I, II UND III vorhanden (sAmp > 0 in allen drei) UND sAmp in Ableitung II > 0,35 mV. Erfordert echt aufgezeichnete Ableitungen.",
  "mess": [
   "sampi",
   "sampii",
   "sampiii",
   "sampavf",
   "qrs"
  ],
  "hinweis": "In allen drei Standardableitungen sind S-Zacken zu sehen, in Ableitung II tiefer als 0,35 mV. Das ist das klassische Extremitaetenableitungs-Kriterium fuer eine Rechtsherzvergroesserung beim Hund. Es stammt aus einer Arbeit von 1971 und ist bis heute das gebraeuchlichste, aber wenig empfindlich: in einer neueren Untersuchung zeigte nur ein Teil der Hunde mit gesicherter Rechtsherzvergroesserung ueberhaupt eine Auffaelligkeit in den Extremitaetenableitungen, waehrend Brustwandableitungen deutlich mehr Faelle erfassten.",
  "dd": "Rechtsschenkelblock; schmalbrustige Konstitution; Lagerungs- und Elektrodenfehler; Kammerextrasystolen im Auswertefenster.",
  "sicher": "Verdacht",
  "quelle": "Hill 1971, referiert in Evaluation of a Novel Precordial Lead System for the Electrocardiographic Diagnosis of Right Ventricular Enlargement in Dogs, Vet Sci 2022;9:399 (PMC9416239): S in II > 0,35 mV als weiterhin gebraeuchliches Hauptkriterium; nur 44 % der "
 },
 {
  "id": "achse-katze-nicht-uebertragen",
  "name": "Achsenbewertung bei der Katze - eigener Normbereich",
  "art": "katze",
  "bedingung": "Achsenwarnung bei der Katze nur ausserhalb 0 bis +160 Grad. Der Hundebereich +40 bis +100 Grad darf bei der Katze NICHT angewendet werden.",
  "mess": [
   "achse"
  ],
  "hinweis": "Bei der Katze reicht der normale Achsenbereich von 0 bis +160 Grad und ist damit weit groesser als beim Hund. Eine Rechtsachsenabweichung ist bei der Katze deshalb praktisch nicht sinnvoll abgrenzbar; nur eine Linksverschiebung unter 0 Grad wird als Auffaelligkeit ausgegeben (siehe Faszikelblock-Regel).",
  "dd": "Entfaellt - Normbereichsregel.",
  "sicher": "gesichert",
  "quelle": "Tilley (MEA Katze 0 bis +160 Grad); siehe Projektnotiz vetstation-ekg-normwerte.md"
 },
 {
  "id": "schenkelblock-rechts",
  "name": "Rechtsschenkelblock-Muster",
  "art": "beide",
  "bedingung": "P vor JEDEM QRS mit konstantem pq (60-130 ms Hund, 50-90 ms Katze) UND qrs > 70 ms (Hund) bzw. > 60 ms (Katze) UND QRS in I, II, III und aVF negativ UND in aVR und aVL positiv. Erfordert echt aufgezeichnete Ableitungen.",
  "mess": [
   "qrs",
   "pvorhanden",
   "pq",
   "qrspolaritaeti",
   "qrspolaritaetii",
   "qrspolaritaetiii",
   "qrspolaritaetavr",
   "qrspolaritaetavl",
   "qrspolaritaetavf"
  ],
  "hinweis": "Breite Kammerkomplexe mit negativem Ausschlag in den linken und kaudalen Ableitungen bei erhaltenem Sinusrhythmus entsprechen dem Bild eines Rechtsschenkelblocks. Ein Rechtsschenkelblock kommt beim Hund auch ohne strukturelle Herzerkrankung vor. Entscheidend fuer die Abgrenzung zur Kammertachykardie ist nicht die QRS-Breite - in einer 12-Kanal-Untersuchung waren die Breiten in Ableitung II fast gleich (Schenkelblock 98 ms, Kammertachykardie mit gleicher Form 87 ms) - sondern die P-Welle vor jedem QRS und die Uebereinstimmung der Extremitaetenableitungen untereinander (bei Schenkelblock 100 %, bei Kammertachykardie 55 bis 71 %).",
  "dd": "Kammertachykardie oder Kammerextrasystolie mit rechtsschenkelblockartiger Form; Hyperkaliaemie mit verbreitertem QRS; Schrittmacherrhythmus; vertauschte Elektroden.",
  "sicher": "wahrscheinlich",
  "quelle": "Kresken/Wendt/Modler, Praxis der Kardiologie Hund und Katze (QRS > 0,07 s Hund, > 0,06 s Katze, negativ in I/II/III/aVF, positiv in aVR/aVL); QRS complex configurations in 12-lead electrocardiograms of dogs with monomorphic ventricular tachycardia or complete "
 },
 {
  "id": "av-block-3-grades",
  "name": "AV-Block III. Grades (vollstaendige Blockierung)",
  "art": "beide",
  "bedingung": "P-Wellen regelmaessig mit eigener Frequenz (P-P konstant +/- 10 %) UND QRS regelmaessig mit niedrigerer Frequenz UND KEINE feste Beziehung zwischen P und QRS (pq schwankt um > 40 ms von Schlag zu Schlag). Kammerfrequenz beim Hund typisch 30-50/min, bei der Katze 60-130/min; qrs meist > 70 ms (Hund).",
  "mess": [
   "pvorhanden",
   "ppabstand",
   "rr",
   "pq",
   "hf",
   "qrs"
  ],
  "hinweis": "Vorhoefe und Kammern schlagen unabhaengig voneinander - P-Wellen laufen in eigenem Takt durch, die Kammern folgen einem langsameren Ersatzrhythmus. Das entspricht dem Bild eines vollstaendigen AV-Blocks. Wichtig fuer die Abgrenzung zur Hyperkaliaemie: dort verschwindet die P-Welle ganz, hier ist sie vorhanden, nur ohne Bezug zum QRS.",
  "dd": "Hyperkaliaemie mit Vorhofstillstand (P fehlt vollstaendig); AV-Block II. Grades hohen Grades (dort besteht noch eine feste Beziehung fuer die uebergeleiteten Schlaege); Sinusarrest mit Ersatzrhythmus; Digoxinwirkung; Vagotonie beim Hund; entzuendliche oder fibrotische Erkrankung des Reizleitungssystems.",
  "sicher": "wahrscheinlich",
  "quelle": "Merck Veterinary Manual, Conduction Abnormalities in Dogs and Cats (AV-Block III beim Hund typische Kammerfrequenz im Bereich um 40/min)"
 },
 {
  "id": "hypothyreose-hinweis-hund",
  "name": "Bradykardie mit kleiner R-Zacke - Hinweis unter anderem auf Hypothyreose (Hund)",
  "art": "hund",
  "bedingung": "hf < 70/min UND rAmp < 1,0 mV (Verstaerkung 10 mm/mV) bei erhaltenem Sinusrhythmus (P vor jedem QRS). Verstaerkendes Zusatzkriterium: pq > 130 ms (AV-Block I. Grades).",
  "mess": [
   "hf",
   "ramp",
   "pvorhanden",
   "pq",
   "verstaerkung"
  ],
  "hinweis": "Langsame Frequenz zusammen mit kleinen Kammerkomplexen. Bei hypothyreoten Hunden werden genau diese Zeichen beschrieben: eine verminderte R-Amplitude bei bis zu 58 % der Tiere, Niedervoltage als Hauptbefund bei rund 44 %, dazu Sinusbradykardie und selten ein AV-Block I. Grades. Die Frequenz lag in einer Vergleichsuntersuchung im Median bei 80/min (50-160) gegenueber 100/min (80-200) bei gesunden Hunden. Unter Substitution bilden sich Bradykardie und AV-Block in den meisten Faellen innerhalb von 9 bis 19 Wochen zurueck. Das EKG ersetzt keine Schilddruesenwertbestimmung.",
  "dd": "Vagotonie (Sinusarrhythmie, Schmerz, Augen- oder Halsdruck, brachyzephale Rassen); Perikard- oder Pleuraerguss; Adipositas; Hyperkaliaemie; Hypothermie; Betablocker, Digoxin; erhoehter Hirndruck; Sinusknotenerkrankung.",
  "sicher": "Verdacht",
  "quelle": "Guglielmini et al., Electrocardiographic and echocardiographic evaluation in dogs with hypothyroidism before and after levothyroxine supplementation, J Vet Intern Med 2019;33:1935-1943 (HF-Median 80 vs. 100/min); Conditions Associated with Canine Hypothyroidis"
 },
 {
  "id": "hyperkaliaemie-fruehzeichen-2",
  "name": "Hohe, spitze T-Welle - moegliches Fruehzeichen einer Hyperkaliaemie",
  "art": "beide",
  "bedingung": "tAmp > 0,5 x rAmp in Ableitung II ODER tAmp in absoluten Zahlen groesser als der Vorbefund desselben Tieres, bei sonst normaler QRS-Breite und erhaltener P-Welle. Klinischer Bezugsbereich in der Literatur: Kalium 5,2-5,9 mmol/l.",
  "mess": [
   "tamp",
   "ramp",
   "qrs",
   "pvorhanden",
   "hf"
  ],
  "hinweis": "Die T-Welle ist hoch und spitz. Das wird als fruehes Zeichen einer Hyperkaliaemie beschrieben. Dieses Zeichen allein traegt beim Hund wenig: die T-Welle ist beim Hund in Polaritaet und Hoehe von Natur aus sehr wechselhaft und darf normalerweise bis etwa ein Viertel der R-Amplitude erreichen. Erst der Verlust der P-Welle mit Bradykardie ist ein tragfaehiges EKG-Bild (siehe eigene Regel). Ausserdem gilt: es gibt keine feste Zuordnung zwischen einem Kaliumwert und einem EKG-Bild - bei lebensbedrohlicher Hyperkaliaemie kann das EKG normal aussehen. Die Blutuntersuchung entscheidet.",
  "dd": "Normvariante der T-Welle beim Hund; Ischaemie; Anaesthesie und Lagewechsel; Hypoxie; T-Wellen-Aenderung nach Extrasystole.",
  "sicher": "Verdacht",
  "quelle": "Clinician's Brief, Management of Potassium Disorders in Dogs & Cats; Merck Veterinary Manual, Overview of Disorders of Potassium Metabolism; Today's Veterinary Practice, Evaluation and Management of the Hyperkalemic Patient (kein fester Zusammenhang zwischen K"
 },
 {
  "id": "vorhofstillstand-hyperkaliaemie-2",
  "name": "Vorhofstillstand - fehlende P-Welle bei REGELMAESSIGEM langsamem Rhythmus",
  "art": "beide",
  "bedingung": "Ueber >= 10 aufeinanderfolgende Schlaege KEINE abgrenzbare P-Welle UND RR regelmaessig (rrSchwankung < 10 %) UND hf < 60/min (Hund) bzw. < 120/min (Katze). Verstaerkende Zusatzkriterien: qrs > 70 ms (Hund) bzw. > 40 ms (Katze); tAmp > 0,5 x rAmp.",
  "mess": [
   "pvorhanden",
   "rr",
   "rrschwankung",
   "hf",
   "qrs",
   "tamp",
   "ramp"
  ],
  "hinweis": "Es fehlen die P-Wellen, der Rhythmus ist dabei regelmaessig und langsam - das ist das Bild eines Vorhofstillstands, wie er bei Hyperkaliaemie auftritt. Typische Ausloeser sind Harnroehrenverschluss der Katze, Hypoadrenokortizismus, akutes Nierenversagen und Reperfusion nach Gefaessverschluss. Zur Groessenordnung bei der Katze mit Harnroehrenverschluss: in einer Serie hatten 46 % eine Hyperkaliaemie und 33,5 % eine Rhythmusstoerung, davon 88,5 % Bradykardien; die Kombination aus Bradykardie unter 120/min und Untertemperatur war zu 98 % spezifisch fuer ein Kalium ueber 8 mmol/l. Das Unterscheidungsmerkmal zum Vorhofflimmern ist die REGELMAESSIGKEIT des Rhythmus.",
  "dd": "Vorhofflimmern (P fehlt ebenfalls, Rhythmus aber unregelmaessig-unregelmaessig und meist schnell); AV-Block III. Grades (P vorhanden, nur ohne Bezug zum QRS); Sinusarrest mit junktionalem Ersatzrhythmus; anhaltender Vorhofstillstand bei Muskeldystrophie (z. B. English Springer Spaniel) ohne Elektrolytstoerung; P im vorangehenden T verborgen.",
  "sicher": "wahrscheinlich",
  "quelle": "Clinician's Brief, Stabilization of Cats With Urethral Obstruction (Bradykardie < 120/min plus Hypothermie 98 % spezifisch fuer Kalium > 8 mEq/l); Biochemical, electrolytic, and cardiovascular evaluations in cats with urethral obstruction (PMC8448651): 46 % Hy"
 },
 {
  "id": "hypokaliaemie",
  "name": "Verlaengertes QT mit ST-Senkung - moeglicher Hinweis auf Hypokaliaemie",
  "art": "beide",
  "bedingung": "qt > 250 ms (Hund) bzw. > 180 ms (Katze) bei hf im Normbereich UND st-Senkung > 0,2 mV (Hund, Bezug PQ-Strecke) bzw. jede messbare ST-Senkung (Katze) UND tAmp abnehmend/abgeflacht gegenueber der R-Amplitude. Zusatzkriterium: erkennbare U-Welle nach der T-Welle; wenn die U-Welle die T-Welle ueberragt, wird in der Literatur ein Kalium unter 3 mmol/l beschrieben.",
  "mess": [
   "qt",
   "hf",
   "st",
   "tamp",
   "ramp",
   "uwelle"
  ],
  "hinweis": "Verlaengertes QT mit gesenkter ST-Strecke und flacher T-Welle. Das passt zu einer Hypokaliaemie, wie sie bei chronischer Nierenerkrankung, Erbrechen, Diuretikatherapie oder Hyperaldosteronismus vorkommt. Der Befund ist unscharf: die tiermedizinische Datenlage zu Hypokaliaemie-EKG-Zeichen ist duenn, eine U-Welle ist beim Hund selten sicher abgrenzbar, und die ST-Grenzwerte selbst sind schwach belegt - auch gesunde Hunde ueberschreiten sie. Die Kaliumbestimmung im Blut entscheidet.",
  "dd": "Hypokalzaemie (ebenfalls QT-Verlaengerung); Antiarrhythmika Klasse III, Sotalol; Hypothermie; Hypomagnesiaemie; Grundlinienwanderung als Scheinsenkung; Messfehler beim T-Ende.",
  "sicher": "Verdacht",
  "quelle": "Merck Veterinary Manual, Overview of Disorders of Potassium Metabolism in Animals; ScienceDirect Veterinary Science, Hypokalemia (ST-Senkung, QT-Verlaengerung, P-Amplitudenanstieg, PQ-Verlaengerung); U-Welle > T-Welle bei Kalium < 3 mEq/l: humanmedizinisch bel"
 },
 {
  "id": "hyperkalzaemie",
  "name": "Verkuerztes QT - moeglicher Hinweis auf Hyperkalzaemie",
  "art": "beide",
  "bedingung": "qt < 150 ms (Hund) bzw. < 120 ms (Katze) bei hf im artspezifischen Normbereich (Hund 70-160/min, Katze 120-240/min) und normaler QRS-Breite.",
  "mess": [
   "qt",
   "hf",
   "qrs"
  ],
  "hinweis": "Das QT-Intervall ist verkuerzt. Eine Hyperkalzaemie verkuerzt die Repolarisation und damit das QT; sie kommt beim Hund unter anderem bei Lymphom, Analbeutel-Adenokarzinom, primaerem Hyperparathyreoidismus und Vitamin-D-Vergiftung vor. Die Zahlenbasis fuer diese Regel ist schwach: der Zusammenhang QT-Verkuerzung und Kalzium ist beim Hund und bei der Katze nicht mit belastbaren Grenzwerten hinterlegt, die Zahlen stammen aus der artspezifischen QT-Untergrenze, nicht aus einer Kalziumstudie. Die Kalziumbestimmung, moeglichst ionisiert, entscheidet.",
  "dd": "Tachykardie mit physiologischer QT-Verkuerzung (deshalb ist die Frequenzbedingung Teil der Regel); Digoxinwirkung; Hyperthermie; Messfehler beim T-Ende bei hoher Frequenz.",
  "sicher": "Verdacht",
  "quelle": "Zusammenhang qualitativ belegt (Merck Veterinary Manual; Starcare, Changes in Electrolyte Levels and ECG in Dogs and Cats). Zahlenmaessige QT-Grenzwerte fuer Hyperkalzaemie bei Hund und Katze: UNBELEGT - hier wird die artspezifische QT-Untergrenze verwendet."
 },
 {
  "id": "hypokalzaemie",
  "name": "Verlaengertes QT bei normaler QRS-Breite - moeglicher Hinweis auf Hypokalzaemie",
  "art": "beide",
  "bedingung": "qt > 250 ms (Hund) bzw. > 180 ms (Katze) bei hf im Normbereich, qrs normal breit, ST-Strecke verlaengert ohne Niveauverschiebung.",
  "mess": [
   "qt",
   "hf",
   "qrs",
   "st"
  ],
  "hinweis": "Verlaengertes QT bei normal breitem QRS mit gestreckter ST-Strecke. Das passt zu einer Hypokalzaemie, etwa bei Eklampsie, Hypoparathyreoidismus, akutem Nierenversagen oder Ethylenglykolvergiftung. Bei ionisiertem Kalzium unter 0,8 mmol/l werden Bradykardie, verlaengertes QT, breite tiefe T-Wellen und AV-Blockierungen beschrieben. Die Kalziumbestimmung entscheidet.",
  "dd": "Hypokaliaemie; Hypomagnesiaemie; Antiarrhythmika Klasse III; Hypothermie; Messfehler beim T-Ende.",
  "sicher": "Verdacht",
  "quelle": "Vetlexicon Canis, Hypocalcemia (ionisiertes Kalzium < 0,8 mmol/l: Bradykardie, verlaengertes QT, breite tiefe T, AV-Block); Severity of Ionized Hypercalcemia and Hypocalcemia Is Associated With Etiology in Dogs and Cats (PMC6714612)"
 },
 {
  "id": "digoxin-wirkung-und-ueberdosierungsverdacht",
  "name": "EKG-Zeichen unter Digoxin",
  "art": "beide",
  "bedingung": "Bekannte Digoxingabe UND mindestens eines von: pq > 130 ms (Hund) bzw. > 90 ms (Katze); hf < 60/min (Hund) bzw. < 120/min (Katze); muldenfoermige ST-Senkung > 0,2 mV; Bigeminus (jeder zweite Schlag eine Kammerextrasystole); multiforme Kammerextrasystolen; AV-Block II. oder III. Grades.",
  "mess": [
   "pq",
   "hf",
   "st",
   "veszahl",
   "vesmorphologie",
   "bigeminus",
   "avblockgrad",
   "medikation"
  ],
  "hinweis": "Unter Digoxin sind diese EKG-Veraenderungen zu erwarten. Wichtig ist die Trennung zweier Dinge: die muldenfoermige ST-Senkung und eine leichte PQ-Verlaengerung sind eine Digoxin-WIRKUNG und kein Beweis fuer eine Ueberdosierung. AV-Blockierungen, Bigeminus, multiforme Kammerextrasystolen und Vorhoftachykardien mit Blockierung werden dagegen als Zeichen einer Ueberdosierung beschrieben. Zahlen aus der Literatur: als therapeutischer Serumbereich gelten bei Hund und Katze 0,8 bis 1,2 ng/ml, gemessen 8 bis 12 Stunden nach der letzten Gabe und 2 bis 7 Tage nach Therapiebeginn; ab etwa 2,5 ng/ml gilt der Wert als toxisch. Vergiftungszeichen kommen aber auch im therapeutischen Bereich vor - etwa jeder vierte Hund unter Digoxin ist betroffen. Eine begleitende Hypokaliaemie verstaerkt die Wirkung. Der Serumspiegel klaert die Frage.",
  "dd": "Vagotonie; gleichzeitige Betablocker- oder Diltiazemgabe; Hypokaliaemie; Nierenfunktionsstoerung mit Akkumulation; primaere Reizleitungserkrankung; Kammerektopie aus anderer Ursache.",
  "sicher": "Verdacht",
  "quelle": "Merck Veterinary Manual, Positive Inotropes for Use in Animals (Zielbereich 0,8-1,2 ng/ml, >= 2,5 ng/ml toxisch, Probenzeitpunkt 8-12 h nach Gabe, Toxizitaet bei ca. 25 % der Hunde, Toxizitaet auch im therapeutischen Bereich moeglich); BSAVA Library, Digoxin"
 },
 {
  "id": "av-block-2-grades-pferd",
  "name": "AV-Block II. Grades beim Pferd - meist physiologisch",
  "art": "pferd",
  "bedingung": "Regelmaessige P-Wellen (P-P konstant +/- 10 %) mit einzelnen ausfallenden QRS UND hf in Ruhe 28-44/min UND die Blockierung verschwindet bei Erregung oder Belastung (Anstieg der Frequenz). Auffaellig wird es bei >= 2 aufeinanderfolgend blockierten P-Wellen oder wenn die Blockierung bei erhoehter Frequenz bestehen bleibt.",
  "mess": [
   "pvorhanden",
   "ppabstand",
   "rr",
   "hf",
   "blockiertep",
   "hfunterbelastung"
  ],
  "hinweis": "Einzelne P-Wellen ohne folgenden Kammerkomplex bei niedriger Ruhefrequenz. Beim Pferd ist das der haeufigste Rhythmusbefund ueberhaupt und wird - je nach Rasse bei 40 bis 90 % der Tiere - als vagal bedingt und ruhebedingt eingeordnet; er verschwindet unter Belastung. Als abklaerungsbeduerftig gilt er, wenn mehrere P-Wellen hintereinander blockiert sind, wenn er unter Belastung oder bei hoher Frequenz bestehen bleibt, oder wenn es Kollapsereignisse gab.",
  "dd": "AV-Block hohen Grades oder III. Grades; Sinusarrest; Vorhofflimmern (dort fehlen die P-Wellen ganz und der Rhythmus ist unregelmaessig-unregelmaessig - die beiden werden bei der Auskultation regelmaessig verwechselt); Elektrolytstoerung; Erkrankung des AV-Knotens.",
  "sicher": "gesichert",
  "quelle": "Maas et al., Cardiac arrhythmia prevalence and risk factors in 24-h electrocardiograms of sedentary horses, Equine Vet J (Haeufigkeit); Auburn University, Arrhythmias Beyond AV Block and A Fib; dvm360, A guide to differential diagnosis of arrhythmias in horses"
 },
 {
  "id": "vorhofflimmern-pferd",
  "name": "Vorhofflimmern beim Pferd",
  "art": "pferd",
  "bedingung": "Ueber >= 10 aufeinanderfolgende Schlaege KEINE P-Welle UND RR unregelmaessig-unregelmaessig (Streuung > 20 %, keine wiederkehrende Periodik) UND qrs im Normbereich 70-170 ms UND unruhige Grundlinie mit f-Wellen. Die Ruhefrequenz kann dabei voellig normal sein (28-44/min).",
  "mess": [
   "pvorhanden",
   "rr",
   "rrschwankung",
   "rrperiodizitaet",
   "qrs",
   "hf",
   "grundlinie"
  ],
  "hinweis": "Keine P-Wellen bei unregelmaessig-unregelmaessigem Rhythmus mit normal breiten Kammerkomplexen - das entspricht dem Bild eines Vorhofflimmerns. Beim Pferd ist das die wichtigste leistungsmindernde Rhythmusstoerung. Zu beachten: die Ruhefrequenz ist beim Pferd mit Vorhofflimmern haeufig ganz normal, die Frequenz allein deckt also nichts auf; und die Abgrenzung zum AV-Block II. Grades gelingt bei der Auskultation regelmaessig nicht, sondern erst im EKG.",
  "dd": "AV-Block II. Grades (P-Wellen vorhanden, Ausfaelle regelmaessig); Vorhofflattern; supraventrikulaere Extrasystolen in Salven; Sinusarrhythmie; Bewegungsartefakt.",
  "sicher": "wahrscheinlich",
  "quelle": "Vetlexicon Equis, Heart: atrial fibrillation; Mad Barn, Electrocardiogram for Horses; Normwerte QRS 70-170 ms aus Basis-Apex-Referenzdaten (n=82 Lusitanos), siehe Projektnotiz vetstation-ekg-normwerte.md"
 },
 {
  "id": "kammerektopie-pferd",
  "name": "Kammerextrasystolen beim Pferd",
  "art": "pferd",
  "bedingung": "Vorzeitiger QRS ohne vorangehende P-Welle mit qrs > 170 ms. Bewertungsschwellen: > 7 Extrasystolen pro Minute in Ruhe, oder Auftreten unter oder unmittelbar nach Belastung.",
  "mess": [
   "qrs",
   "pvorhanden",
   "rr",
   "veszahl",
   "streifendauer",
   "belastungszustand"
  ],
  "hinweis": "Breiter vorzeitiger Kammerkomplex ohne vorangehende P-Welle. Vereinzelte Kammerextrasystolen kommen bei rund 14 % der klinisch gesunden Pferde im 24-Stunden-EKG vor und werden gelegentlich auch unmittelbar nach Belastung gesehen. Als abklaerungsbeduerftig gelten in der Literatur eine Haeufung ueber etwa 7 pro Minute sowie Extrasystolen, die unter Belastung auftreten.",
  "dd": "Supraventrikulaere Extrasystole mit aberranter Leitung (P vorhanden); Elektrolytstoerung, besonders Kalium und Kalzium bei Kolik; Bewegungsartefakt; myokardiale Erkrankung; Kolik mit Endotoxaemie.",
  "sicher": "Verdacht",
  "quelle": "ScienceDirect Veterinary Science, Premature Ventricular Contraction (ca. 14 % gesunder Pferde im 24-h-EKG; > 7 VES/min als auffaellig); Maas et al., Equine Vet J, 24-h-EKG bei Freizeitpferden"
 },
 {
  "id": "achse-pferd-unterdruecken",
  "name": "Frontalachse beim Pferd nicht ausgeben",
  "art": "pferd",
  "bedingung": "art = pferd: Achsenberechnung und alle achsenbasierten Befundregeln werden unterdrueckt.",
  "mess": [
   "achse"
  ],
  "hinweis": "Beim Pferd durchdringen die Purkinje-Fasern die gesamte Kammerwand; die Erregungsausbreitung folgt deshalb nicht wie bei Hund und Katze einem Hauptvektor, der die Kammergroesse abbildet. Eine Frontalachse laesst beim Pferd keinen Rueckschluss auf die Kammer zu und wird deshalb gar nicht erst berechnet.",
  "dd": "Entfaellt - Methodenregel.",
  "sicher": "gesichert",
  "quelle": "Etabliertes Lehrbuchwissen zur equinen Erregungsausbreitung; siehe Projektnotiz vetstation-ekg-normwerte.md (im Code achse:null fuer Pferd)"
 },
 {
  "id": "heimtier-kaninchen-normbereich",
  "name": "Kaninchen - Normbereiche, keine krankheitsbezogenen Regeln",
  "art": "heimtier",
  "bedingung": "Kaninchen: hf 198-330/min, pDauer 10-50 ms, pAmp 0,04-0,12 mV, pq 40-80 ms, qrs 20-60 ms, rAmp 0,03-0,39 mV, qt 80-160 ms, tAmp 0,05-0,17 mV, achse -43 bis +80 Grad. Werte ausserhalb dieser Bereiche werden als abweichend markiert - ohne Krankheitszuordnung.",
  "mess": [
   "hf",
   "pdauer",
   "pamp",
   "pq",
   "qrs",
   "ramp",
   "qt",
   "tamp",
   "achse"
  ],
  "hinweis": "Der Messwert liegt ausserhalb des Referenzbereichs, der an 46 gesunden Heimkaninchen erhoben wurde. Eine Zuordnung zu einer bestimmten Herzerkrankung ist beim Kaninchen aus dem EKG nicht belegt und wird deshalb nicht vorgenommen. Zu beachten: die R-Amplitude haengt beim Kaninchen quadratisch vom Koerpergewicht ab.",
  "dd": "Handling-Stress mit hoher Frequenz; Narkose; Lagerung; Muskelartefakt durch Fell und duenne Haut.",
  "sicher": "gesichert",
  "quelle": "Lord et al., Electrocardiography of the normal domestic pet rabbit, Vet Rec 2010 (PMID 21262711), n = 46 gesunde Heimkaninchen"
 },
 {
  "id": "heimtier-keine-krankheitsregeln",
  "name": "Uebrige Heimtiere - keine belegten krankheitsbezogenen EKG-Kriterien",
  "art": "heimtier",
  "bedingung": "art = heimtier und Spezies nicht Kaninchen (Frettchen, Meerschweinchen, Chinchilla, Ratte, Degu u. a.): es werden nur Messwerte und der Rhythmus beschrieben, keine Befundregeln ausgeloest.",
  "mess": [
   "hf",
   "pdauer",
   "pamp",
   "pq",
   "qrs",
   "ramp",
   "qt",
   "achse"
  ],
  "hinweis": "Fuer diese Tierart liegen keine belastbaren, krankheitsbezogenen EKG-Grenzwerte vor. Die Anwendung gibt die Messwerte und den Rhythmus wieder und verzichtet bewusst auf eine Befundzuordnung.",
  "dd": "Entfaellt.",
  "sicher": "gesichert",
  "quelle": "UNBELEGT - fuer Frettchen, Meerschweinchen, Chinchilla und weitere Heimtiere wurden keine krankheitsbezogenen EKG-Kriterien mit belastbaren Zahlen gefunden. Fuer das Meerschweinchen existieren Einzelarbeiten zu Normwerten (u. a. PMC9202081), aber keine Krankhe"
 },
 {
  "id": "p-fehlt-keine-vor-qrs",
  "name": "Keine P-Welle vor den QRS-Komplexen",
  "art": "alle",
  "bedingung": "Über ≥ 10 s zusammenhängender Aufzeichnung bei Signalgüte ≥ 'brauchbar': in KEINEM Zyklus eine Auslenkung ≥ 0,05 mV innerhalb von 20–250 ms vor QRS-Beginn (Hund/Pferd) bzw. 20–150 ms (Katze).",
  "mess": [
   "pvorhanden",
   "pamp",
   "rr",
   "rrschwankung",
   "hf",
   "signalguete"
  ],
  "hinweis": "In diesem Streifen ist vor den Kammerkomplexen keine P-Welle erkennbar. Das kann heißen: Vorhofflimmern, Vorhofstillstand (u.a. bei Hyperkaliämie), sinuventrikulärer Rhythmus, Ersatzrhythmus aus AV-Knoten oder Kammer — oder die P-Welle liegt in der vorangehenden T-Welle bzw. ist zu klein für die eingestellte Verstärkung. Ein Blick auf Kalium und eine zweite Ableitung mit 20 mm/mV können weiterhelfen.",
  "dd": "Vorhofflimmern (RR unregelmäßig, wellige Grundlinie) · Vorhofstillstand/Hyperkaliämie (RR regelmäßig, HF meist 40–65/min beim Hund) · junktionaler Ersatzrhythmus · P im T versteckt bei hoher Frequenz · zu geringe Verstärkung · Grundlinienrauschen > 0,05 mV verdeckt die P",
  "sicher": "gesichert",
  "quelle": "Tilley, Essentials of Canine and Feline Electrocardiography; MSD/Merck Vet Manual, Persistent Atrial Standstill in Dogs and Cats (Ersatzfrequenz 40–65/min Hund); Tag & Day, Electrocardiographic assessment of hyperkalemia in dogs and cats, JVECC 2008"
 },
 {
  "id": "p-breit-hund",
  "name": "Verbreiterte P-Welle beim Hund (Muster 'P mitrale')",
  "art": "hund",
  "bedingung": "P-Dauer in Ableitung II > 40 ms (Riesenrassen > 50 ms), gemessen bei ≥ 50 mm/s, in ≥ 3 aufeinanderfolgenden Sinuszyklen; P-Amplitude ≤ 0,4 mV.",
  "mess": [
   "pdauer",
   "pamp",
   "signalguete"
  ],
  "hinweis": "Die P-Welle ist breiter als der Referenzbereich. Das passt zu einer verzögerten Vorhofleitung, klassisch bei Vergrößerung des linken Vorhofs (z.B. bei Mitralklappenendokardiose), kommt aber auch ohne Vorhofvergrößerung vor. Als alleiniger Wert trägt die P-Dauer wenig: bei einem Grenzwert von 40 ms liegen Sensitivität bei rund 68 % und Spezifität bei rund 64 % gegenüber echokardiographisch bestimmter Vorhofgröße.",
  "dd": "linksatriale Vergrößerung · interatrialer Leitungsblock · Vorhoffibrose · unscharf gesetzter P-Endpunkt bei wandernder Grundlinie · Messung bei 25 mm/s (1 mm = 40 ms — die Grenze ist dann nicht auflösbar)",
  "sicher": "wahrscheinlich",
  "quelle": "Tilley (P ≤ 0,04 s Hund, 0,05 s Riesenrassen); Diagnostic performance of P wave duration in the identification of left atrial enlargement in dogs, J Small Anim Pract 2012 (PMID 22512699): AUC 0,70; 40 ms → Sens 68 % / Spez 64 %, 50 ms → Sens 40 % / Spez 93 %"
 },
 {
  "id": "p-breit-katze",
  "name": "Verbreiterte P-Welle bei der Katze",
  "art": "katze",
  "bedingung": "P-Dauer in Ableitung II > 40 ms bei ≥ 50 mm/s in ≥ 3 aufeinanderfolgenden Sinuszyklen.",
  "mess": [
   "pdauer",
   "signalguete"
  ],
  "hinweis": "Die P-Welle liegt über dem Referenzbereich der Katze. Möglich sind eine linksatriale Vergrößerung oder eine verzögerte Vorhofleitung. Bei der Katze ist das Zeitfenster sehr klein — bei 25 mm/s entspricht die Grenze 1 mm Papier; eine Aufzeichnung mit 50 mm/s macht die Aussage erst belastbar.",
  "dd": "linksatriale Vergrößerung (u.a. HCM) · Messfehler durch zu geringen Vorschub · Muskelzittern/Schnurren überlagert den P-Beginn",
  "sicher": "Verdacht",
  "quelle": "Tilley, Essentials of Canine and Feline Electrocardiography (Katze P ≤ 0,04 s); Veterian Key, Electrocardiography (Referenztabelle Hund/Katze)"
 },
 {
  "id": "p-hoch-hund",
  "name": "Überhöhte P-Welle beim Hund (Muster 'P pulmonale')",
  "art": "hund",
  "bedingung": "P-Amplitude in Ableitung II > 0,4 mV bei 10 mm/mV, in ≥ 3 aufeinanderfolgenden Sinuszyklen, P-Dauer ≤ 40 ms.",
  "mess": [
   "pamp",
   "pdauer",
   "hf",
   "signalguete"
  ],
  "hinweis": "Die P-Welle ist höher als der Referenzbereich. Das Muster wird mit einer Vergrößerung des rechten Vorhofs in Verbindung gebracht (z.B. bei Trikuspidaldysplasie, Pulmonalstenose, chronischer Lungenerkrankung). Zu bedenken: hoher Sympathikotonus, Aufregung und Tachykardie erhöhen die P-Amplitude ebenfalls, ohne dass eine Vergrößerung vorliegt.",
  "dd": "rechtsatriale Vergrößerung · Sympathikotonus/Aufregung/Schmerz · Hypoxie · Verstärkung versehentlich auf 20 mm/mV (verdoppelt jede Amplitude) · Kalibrierimpuls prüfen",
  "sicher": "Verdacht",
  "quelle": "Tilley (Hund P ≤ 0,4 mV); VIN/WSAVA 2007, ECG Interpretation; Veterian Key, Electrocardiography"
 },
 {
  "id": "p-hoch-katze",
  "name": "Überhöhte P-Welle bei der Katze",
  "art": "katze",
  "bedingung": "P-Amplitude in Ableitung II > 0,2 mV bei 10 mm/mV in ≥ 3 aufeinanderfolgenden Sinuszyklen.",
  "mess": [
   "pamp",
   "hf",
   "signalguete"
  ],
  "hinweis": "Die P-Welle überschreitet den Katzen-Referenzwert von 0,2 mV. Denkbar ist eine rechtsatriale Vergrößerung; ebenso kommen Stress und hohe Herzfrequenz in Frage. Der Grenzwert der Katze ist nur halb so hoch wie beim Hund — der Hundewert würde hier nichts anzeigen.",
  "dd": "rechtsatriale Vergrößerung · Stress/Tachykardie in der Praxis · falsche Verstärkung",
  "sicher": "Verdacht",
  "quelle": "Tilley, Essentials of Canine and Feline Electrocardiography (Katze P ≤ 0,2 mV); Veterian Key, Electrocardiography"
 },
 {
  "id": "p-negativ-in-ii",
  "name": "Negative P-Welle in Ableitung II bei positivem QRS",
  "art": "beide",
  "bedingung": "P-Amplitude in Ableitung II ≤ −0,05 mV (also nach unten gerichtet), während der QRS-Hauptausschlag in II positiv ist, in ≥ 3 Zyklen; PQ konstant.",
  "mess": [
   "pamp",
   "pform",
   "pq",
   "qrsform"
  ],
  "hinweis": "Die P-Welle ist in Ableitung II negativ. Das spricht für eine Erregung, die den Vorhof nicht vom Sinusknoten her, sondern von kaudal/vom AV-Bereich her durchläuft — z.B. ektoper Vorhoffokus, Koronarsinus-Rhythmus oder retrograde Vorhoferregung. Vor der Deutung lohnt der Blick auf die Elektroden: vertauschte Arm-Elektroden erzeugen dasselbe Bild.",
  "dd": "ektoper atrialer/junktionaler Rhythmus · Koronarsinusrhythmus · VERTAUSCHTE ELEKTRODEN (dann ist auch der QRS in I invertiert) · Dextrokardie",
  "sicher": "wahrscheinlich",
  "quelle": "MSD Vet Manual, Heart Disease: Conduction Abnormalities in Dogs and Cats; ScienceDirect Vet Sci Topics, Junctional Rhythm"
 },
 {
  "id": "p-wechselform-hund-normal",
  "name": "Wechselnde P-Form/-Höhe beim Hund (wandernder Schrittmacher)",
  "art": "hund",
  "bedingung": "P-Amplitude schwankt zyklisch um ≥ 0,05 mV bzw. ≥ 25 % zwischen aufeinanderfolgenden Zyklen, P bleibt in II positiv, jedes P wird von genau einem QRS gefolgt, PQ innerhalb ±10 ms konstant, gleichzeitig RR-Schwankung > 10 % (atemsynchron).",
  "mess": [
   "pamp",
   "pform",
   "pq",
   "rrschwankung",
   "hf"
  ],
  "hinweis": "Die P-Wellen ändern zyklisch Höhe und Form, gekoppelt an die Atmung, bei sonst regelrechter Überleitung. Beim Hund ist das ein wandernder Schrittmacher und gilt zusammen mit der respiratorischen Sinusarrhythmie als normale Variante bei hohem Vagotonus. Kein Befund im eigentlichen Sinn.",
  "dd": "echter wandernder Schrittmacher (normal) · multifokale atriale Extrasystolen (dann ändert sich auch das PQ und das RR springt) · Grundlinienwandern täuscht P-Höhenänderung vor (dann ändert sich die Amplitude auch bei T und QRS gleichsinnig)",
  "sicher": "gesichert",
  "quelle": "MSD/Merck Vet Manual, Heart Disease: Conduction Abnormalities in Dogs and Cats; ScienceDirect Vet Sci Topics, Wandering Pacemaker; Clinician's Brief, Interpreting ECGs With Confidence"
 },
 {
  "id": "p-wechselform-katze-auffaellig",
  "name": "Wechselnde P-Form/RR-Schwankung bei der Katze",
  "art": "katze",
  "bedingung": "Bei der Katze: RR-Schwankung > 10 % über ≥ 10 s UND/ODER P-Amplitudenschwankung ≥ 25 % zwischen benachbarten Zyklen.",
  "mess": [
   "rrschwankung",
   "pamp",
   "pform",
   "hf"
  ],
  "hinweis": "Bei der Katze sind ausgeprägte Sinusarrhythmie und wandernder Schrittmacher — anders als beim Hund — ungewöhnlich. Meist liegt hoher Vagotonus vor (Sedation, Erkrankung der Atemwege oder des Bauchraums, intrakranieller Druck); auch eine Sinusknotenstörung ist möglich. Dieselbe Beobachtung wäre beim Hund unauffällig.",
  "dd": "hoher Vagotonus · Sinusknotendysfunktion · Sedierung/Narkose · Artefakt durch Bewegung (dann RR-Sprünge ohne P-Bezug)",
  "sicher": "wahrscheinlich",
  "quelle": "MSD/Merck Vet Manual (Sinusarrhythmie normal beim Hund, abnorm bei der Katze); ScienceDirect Vet Sci Topics, Respiratory Sinus Arrhythmia (> 10 % RR-Variation)"
 },
 {
  "id": "p-nach-qrs-retrograd",
  "name": "P-Welle nach dem QRS (retrograde Vorhoferregung)",
  "art": "beide",
  "bedingung": "Negative Auslenkung ≥ 0,05 mV in Ableitung II innerhalb von 0–200 ms NACH dem QRS-Ende, in ≥ 3 Zyklen mit konstantem RP-Intervall, und keine P vor dem QRS.",
  "mess": [
   "pvorhanden",
   "pamp",
   "qrs",
   "rr",
   "hf"
  ],
  "hinweis": "Die Vorhofwelle folgt dem Kammerkomplex und ist in Ableitung II negativ, das RP-Intervall bleibt konstant. Das spricht für eine Erregung, die von unten nach oben zurück in die Vorhöfe läuft — junktionaler Rhythmus/junktionale Tachykardie oder ventrikulärer Ursprung mit retrograder Leitung. Die QRS-Breite hilft weiter: schmal spricht eher für junktional, breit eher für ventrikulär.",
  "dd": "junktionaler Ersatzrhythmus (Hund ca. 40–60/min) bzw. akzelerierter junktionaler Rhythmus (60–100/min) oder junktionale Tachykardie (> 100/min) · ventrikulärer Rhythmus mit retrograder Leitung · T-Wellen-Kerbe als Pseudo-P (dann Frequenzabhängigkeit prüfen)",
  "sicher": "wahrscheinlich",
  "quelle": "ScienceDirect Vet Sci Topics, Junctional Rhythm (Frequenzstufen Hund; P′ vor/in/nach QRS, RP konstant); Veterian Key, Systematic Reading of an Electrocardiogram"
 },
 {
  "id": "p-fehlt-flimmerwellen",
  "name": "Flimmerwellen statt P-Wellen",
  "art": "alle",
  "bedingung": "Keine P-Welle nachweisbar, Grundlinie unregelmäßig moduliert mit 0,05–0,2 mV, KEINE feste Periodizität (Autokorrelation der Grundlinie ohne Gipfel), UND RR-Schwankung > 15 % ohne atemsynchrones Muster.",
  "mess": [
   "pvorhanden",
   "rr",
   "rrschwankung",
   "hf",
   "signalguete"
  ],
  "hinweis": "Statt P-Wellen zeigt die Grundlinie unregelmäßige Wellen bei unregelmäßiger Kammerfolge — das Bild passt zu Vorhofflimmern. Beim Pferd ist das die häufigste behandlungsrelevante Rhythmusstörung und tritt auch am ansonsten gesunden Herzen auf; bei Hund und Katze liegt meist eine deutliche Vorhofvergrößerung zugrunde.",
  "dd": "Vorhofflimmern · Vorhofflattern mit wechselnder Überleitung (dann regelmäßige Sägezahn-Periodik) · 50-Hz-Einstreuung oder Muskelzittern täuscht Flimmerwellen vor (dann ist die Modulation streng periodisch bzw. auch außerhalb der TP-Strecke gleich stark) · Multifokale atriale Tachykardie",
  "sicher": "wahrscheinlich",
  "quelle": "Reef/Marr et al., The diagnosis and management of atrial fibrillation in the horse, Vet Med Res Rep 2018 (PMC6067668); Merck Vet Manual, ECG atrial fibrillation dog"
 },
 {
  "id": "p-saegezahn-flattern",
  "name": "Sägezahn-Grundlinie (Vorhofflattern)",
  "art": "hund",
  "bedingung": "Keine abgrenzbaren P-Wellen, aber regelmäßige Vorhofauslenkungen mit Periode 133–240 ms (entspricht 250–450/min) beim Hund, Amplitude ≥ 0,05 mV, Periodizität über ≥ 2 s stabil (Autokorrelationsgipfel > 0,7).",
  "mess": [
   "pvorhanden",
   "rr",
   "hf",
   "signalguete"
  ],
  "hinweis": "Die Grundlinie zeigt regelmäßige, sägezahnartige Vorhofwellen mit etwa 250–450/min. Das passt zu Vorhofflattern. Der Unterschied zum Vorhofflimmern liegt in der Regelmäßigkeit der Vorhofwellen; die Kammerantwort kann je nach Überleitungsverhältnis (1:1, 2:1, 3:1) regelmäßig oder wechselnd sein.",
  "dd": "Vorhofflattern · Vorhofflimmern mit groben Flimmerwellen · 50-Hz-Netzeinstreuung (Periode exakt 20 ms — außerhalb dieses Fensters) · Muskelzittern mit rhythmischem Tremor (typisch 4–12 Hz, also 240–720/min: Überschneidung möglich, daher Ableitungsvergleich nötig)",
  "sicher": "wahrscheinlich",
  "quelle": "ScienceDirect Vet Sci Topics, Atrial Flutter (Vorhoffrequenz 250–350/min, bis 440/min beim Hund); Merck Vet Manual, ECG atrial flutter dog"
 },
 {
  "id": "p-pferd-bifid-normal",
  "name": "Zweigipflige (bifide) P-Welle beim Pferd",
  "art": "pferd",
  "bedingung": "Pferd: P-Welle in Basis-Apex-Ableitung mit zwei Gipfeln, P-Dauer 90–170 ms, P-Amplitude im Referenzbereich.",
  "mess": [
   "pform",
   "pdauer",
   "pamp"
  ],
  "hinweis": "Beim Pferd ist die zweigipflige (bifide) P-Welle die Regel, nicht die Ausnahme; auch eingipflige, diphasische und mehrgipflige Formen kommen am gesunden Pferd vor und wechseln mit dem Vagotonus. Diese Form allein rechtfertigt keinen Befund. Erst eine P-Dauer über 170 ms wäre auffällig.",
  "dd": "physiologische bifide P (Regelfall) · verlängerte Vorhofleitung bei > 170 ms · wandernder Schrittmacher mit wechselnder P-Form (ebenfalls normal) · Grundlinienrauschen erzeugt Scheinkerbe",
  "sicher": "gesichert",
  "quelle": "van Loon/Patteson, Electrocardiography in horses – Part 2: How to read the equine ECG; Mitchell, ECG Interpretation in Equine Practice, CABI 2020; VetStation-Referenz Lusitanos n=82 (P 90–170 ms)"
 },
 {
  "id": "p-dispersion-hund",
  "name": "P-Wellen-Dispersion beim Hund erhöht",
  "art": "hund",
  "bedingung": "Hund, wenn ≥ 6 Extremitätenableitungen tatsächlich getrennt aufgezeichnet wurden: Pd = P-Dauer_max − P-Dauer_min über alle Ableitungen > 24 ms (Referenz gesund: 16,8 ± 3,5 ms).",
  "mess": [
   "pdauer",
   "ableitungen",
   "signalguete"
  ],
  "hinweis": "Die Streuung der P-Dauer zwischen den Ableitungen liegt über dem Referenzbereich gesunder Hunde. Erhöhte P-Dispersion wird mit inhomogener Vorhofleitung in Verbindung gebracht und ist bei Endokardiose und supraventrikulären Leitungsstörungen beschrieben. Wichtig: der Referenzwert stammt aus einer Messung über neun Ableitungen einschließlich Brustwandableitungen — mit sechs Extremitätenableitungen ist der Wert nicht deckungsgleich.",
  "dd": "inhomogene Vorhofleitung · reine Messstreuung bei unscharfem P-Ende (die Streuung des Ablesers kann die Größenordnung des Befundes erreichen) · unterschiedliche Signalgüte einzelner Ableitungen",
  "sicher": "Verdacht",
  "quelle": "Nogueira Noronha de Oliveira et al., Comparison of P-wave dispersion in healthy dogs, dogs with chronic valvular disease and dogs with disturbances of supraventricular conduction, Acta Vet Scand 2011;53:18 (PMC3061947): Pmax 63,4 ± 12,7 ms, Pmin 46,6 ± 11,5 ms"
 },
 {
  "id": "pq-kurz-praeexzitation-hund",
  "name": "Verkürztes PQ mit trägem QRS-Anstieg (Präexzitationsmuster) beim Hund",
  "art": "hund",
  "bedingung": "Hund: PQ < 60 ms UND QRS ≥ 70 ms UND träger Anstiegsbeginn des QRS (Anstiegsdauer der ersten 25 % der R-Amplitude > 12 ms), P-Welle regelrecht und jedem QRS vorausgehend, in ≥ 3 Zyklen.",
  "mess": [
   "pq",
   "qrs",
   "qrsform",
   "pvorhanden",
   "hf"
  ],
  "hinweis": "Das PQ ist kurz und der QRS-Anstieg beginnt träge (Delta-Wellen-Muster) — das entspricht einer ventrikulären Präexzitation über eine akzessorische Leitungsbahn. Bei Hunden mit nachgewiesener akzessorischer Bahn lag das präexzitierte PQ im Median bei 59 ms (40–90 ms), die QRS-Dauer bei 80 ms (55–120 ms). Die Präexzitation kann auch nur zeitweise auftreten; ein unauffälliger Streifen schließt sie nicht aus.",
  "dd": "akzessorische AV-Bahn (manifest oder intermittierend) · junktionaler Rhythmus mit P kurz vor QRS (dann P-Form/Polarität verändert) · falsch gesetzter QRS-Beginn bei verrauschter Grundlinie · Fusion mit ventrikulärer Extrasystole",
  "sicher": "wahrscheinlich",
  "quelle": "Santilli et al., Atrioventricular accessory pathways in 89 dogs: clinical features and outcome after radiofrequency catheter ablation, JVIM 2018;32:1517 (präexzitiertes PR Median 59 ms, Bereich 40–90 ms; nicht-präexzitiertes PR Median 110 ms, 80–140 ms; QRS Me"
 },
 {
  "id": "pq-lang-hund",
  "name": "Verlängertes PQ beim Hund",
  "art": "hund",
  "bedingung": "Hund: PQ > 130 ms in ≥ 3 aufeinanderfolgenden Sinuszyklen, jedes P wird von einem QRS gefolgt, PQ konstant (Streuung ≤ 10 ms).",
  "mess": [
   "pq",
   "pvorhanden",
   "hf",
   "rr"
  ],
  "hinweis": "Das PQ-Intervall liegt über dem Referenzbereich (60–130 ms beim Hund) bei erhaltener 1:1-Überleitung — das Muster eines AV-Blocks I. Grades. Häufige Auslöser sind hoher Vagotonus, Medikamente mit AV-verzögernder Wirkung (Digoxin, Betablocker, Calciumkanalblocker), Elektrolytstörungen und Erkrankungen des AV-Knotens. Isoliert ist der Befund oft ohne Krankheitswert.",
  "dd": "hoher Vagotonus · Digoxin/Betablocker/Diltiazem · Hyperkaliämie (PQ steigt ab ca. 6,6 mmol/l) · AV-Knotenerkrankung · P-Beginn zu früh gesetzt bei wandernder Grundlinie",
  "sicher": "gesichert",
  "quelle": "Tilley (Hund PQ 0,06–0,13 s); Veterian Key, Electrocardiography; Tag & Day, JVECC 2008 (PQ-Verlängerung bei K 6,6–7,0 mmol/l)"
 },
 {
  "id": "pq-lang-katze",
  "name": "Verlängertes PQ bei der Katze",
  "art": "katze",
  "bedingung": "Katze: PQ > 90 ms in ≥ 3 aufeinanderfolgenden Sinuszyklen bei 1:1-Überleitung.",
  "mess": [
   "pq",
   "pvorhanden",
   "hf"
  ],
  "hinweis": "Das PQ überschreitet den Katzen-Referenzbereich (50–90 ms). Zu bedenken sind Vagotonus, AV-verzögernde Medikamente, Hyperkaliämie und eine Erkrankung des AV-Knotens. Der Hundegrenzwert von 130 ms würde diesen Befund verdecken.",
  "dd": "Vagotonus · Diltiazem/Atenolol · Hyperkaliämie · AV-Knotenerkrankung · Messfehler bei 25 mm/s",
  "sicher": "gesichert",
  "quelle": "Tilley (Katze PQ 0,05–0,09 s); Veterian Key, Electrocardiography"
 },
 {
  "id": "pq-zunehmend-wenckebach",
  "name": "Von Schlag zu Schlag zunehmendes PQ mit Ausfall",
  "art": "alle",
  "bedingung": "PQ nimmt über ≥ 3 aufeinanderfolgende Zyklen jeweils um ≥ 5 ms zu, danach folgt ein P ohne QRS; anschließend beginnt die Reihe mit dem kürzesten PQ von neuem.",
  "mess": [
   "pq",
   "pvorhanden",
   "rr",
   "hf"
  ],
  "hinweis": "Das PQ verlängert sich stufenweise, bis eine Überleitung ausfällt, danach beginnt die Reihe von vorn — das Muster eines AV-Blocks II. Grades vom Typ Mobitz I (Wenckebach). Beim Hund und besonders beim Pferd ist dieses Muster bei hohem Vagotonus in Ruhe häufig und verschwindet typischerweise bei Belastung oder Aufregung.",
  "dd": "vagal bedingter Wenckebach (verschwindet unter Belastung/Atropin) · AV-Knotenerkrankung · Medikamente · beim Pferd in Ruhe sehr häufig und meist ohne Krankheitswert",
  "sicher": "gesichert",
  "quelle": "MSD/Merck Vet Manual, Heart Disease: Conduction Abnormalities in Dogs and Cats; Mitchell, ECG Interpretation in Equine Practice, CABI 2020"
 },
 {
  "id": "pq-wechselnd-ohne-muster",
  "name": "Wechselndes PQ ohne erkennbares Muster",
  "art": "alle",
  "bedingung": "Streuung des PQ über 10 aufeinanderfolgende Zyklen > 20 ms (Hund/Pferd) bzw. > 15 ms (Katze), ohne monoton steigenden Trend und ohne ausgefallene Überleitung.",
  "mess": [
   "pq",
   "pvorhanden",
   "rr",
   "hf"
  ],
  "hinweis": "Das PQ schwankt unsystematisch. Das kann bedeuten, dass P-Wellen und QRS-Komplexe voneinander unabhängig laufen (AV-Dissoziation, AV-Block III. Grades) oder dass mehrere Vorhoffoki abwechselnd feuern. Ein Prüfpunkt: Bleibt der Abstand der P-Wellen untereinander regelmäßig, während sich der Abstand zum QRS ständig ändert, spricht das für Dissoziation.",
  "dd": "AV-Dissoziation/AV-Block III. Grades · isorhythmische Dissoziation · wandernder Vorhofschrittmacher mit unterschiedlichen Leitungswegen · unsicher gesetzter P-Beginn (Messrauschen kann bei ±3,9 ms Abtastauflösung nicht 20 ms erklären — also prüfen, ob die P-Erkennung greift)",
  "sicher": "Verdacht",
  "quelle": "Veterian Key, Systematic Reading of an Electrocardiogram; MSD/Merck Vet Manual, Conduction Abnormalities"
 },
 {
  "id": "qrs-breit-hund",
  "name": "Verbreiterter QRS-Komplex beim Hund",
  "art": "hund",
  "bedingung": "Hund > 20 kg: QRS-Dauer > 60 ms; Hund ≤ 20 kg: QRS-Dauer > 50 ms — gemessen bei ≥ 50 mm/s über ≥ 3 Zyklen.",
  "mess": [
   "qrs",
   "qrsform",
   "pvorhanden",
   "pq",
   "ramp"
  ],
  "hinweis": "Der Kammerkomplex ist breiter als der Referenzbereich. Möglich sind eine intraventrikuläre Leitungsstörung (Schenkelblock), eine Vergrößerung/Umbau der Kammer, ein ventrikulärer Ursprung des Schlages, Hyperkaliämie oder eine Wirkung natriumkanalblockierender Medikamente. Der humanmedizinische Grenzwert von 120 ms ist hier ohne Bedeutung — er wäre beim Hund doppelt so weit wie der Referenzbereich.",
  "dd": "Rechts-/Linksschenkelblock · ventrikulärer Ersatz-/Extrarhythmus (dann keine zugehörige P) · linksventrikuläre Vergrößerung · Hyperkaliämie (ab ca. 6,6 mmol/l) · Antiarrhythmika Klasse I · Präexzitation (dann PQ kurz) · Muskelzittern verwischt QRS-Ende und täuscht Verbreiterung vor",
  "sicher": "gesichert",
  "quelle": "Tilley (Hund QRS ≤ 0,05 s klein / ≤ 0,06 s groß); Veterian Key, Electrocardiography; Tag & Day, JVECC 2008"
 },
 {
  "id": "qrs-breit-katze",
  "name": "Verbreiterter QRS-Komplex bei der Katze",
  "art": "katze",
  "bedingung": "Katze: QRS-Dauer > 40 ms bei ≥ 50 mm/s über ≥ 3 Zyklen.",
  "mess": [
   "qrs",
   "qrsform",
   "pvorhanden",
   "achse"
  ],
  "hinweis": "Der Kammerkomplex überschreitet den Katzen-Referenzwert von 40 ms. In Frage kommen Schenkelblock, ventrikulärer Ursprung, Kammerumbau, Hyperkaliämie oder Medikamentenwirkung. Bei 25 mm/s ist der Katzen-QRS nur 1 mm breit — die Messung wird erst bei 50 mm/s belastbar.",
  "dd": "Schenkelblock · ventrikulärer Rhythmus · HCM/RCM mit Leitungsverzögerung · Hyperkaliämie · Vorschub 25 mm/s (Messung nicht auflösbar)",
  "sicher": "gesichert",
  "quelle": "Tilley (Katze QRS ≤ 0,04 s); ScienceDirect Vet Sci Topics, Bundle Branch Block (Katze > 0,04 s)"
 },
 {
  "id": "qrs-breit-pferd",
  "name": "Verbreiterter QRS-Komplex beim Pferd",
  "art": "pferd",
  "bedingung": "Pferd, Basis-Apex-Ableitung: QRS-Dauer > 170 ms.",
  "mess": [
   "qrs",
   "qrsform",
   "pvorhanden"
  ],
  "hinweis": "Der Kammerkomplex liegt über dem beim gesunden Pferd beschriebenen Bereich (70–170 ms). Möglich sind eine intraventrikuläre Leitungsstörung, ein ventrikulärer Ursprung oder eine Elektrolytstörung. Die Referenz stammt aus einer Basis-Apex-Ableitung an 82 Lusitanos — bei anderer Elektrodenlage gelten andere Zahlen.",
  "dd": "ventrikulärer Ursprung · Leitungsstörung · Elektrolytstörung · abweichende Elektrodenposition (die Referenz gilt nur für Basis-Apex)",
  "sicher": "wahrscheinlich",
  "quelle": "VetStation-Referenz: Lusitanos n=82, 25 mm/s, 10 mm/mV (QRS 70–170 ms, PQ 210–410 ms, QT 330–670 ms); Mitchell, ECG Interpretation in Equine Practice, CABI 2020"
 },
 {
  "id": "qrs-rechtsschenkelblock-muster",
  "name": "Muster eines Rechtsschenkelblocks",
  "art": "beide",
  "bedingung": "NUR wenn Ableitung I und II getrennt aufgezeichnet wurden: QRS über der artspezifischen Breitengrenze (Hund > 60/50 ms, Katze > 40 ms) UND breite, tiefe S-Zacke in I, II, III und aVF (S-Amplitude ≥ R-Amplitude in II) UND Achse nach rechts verschoben (Hund > +100°).",
  "mess": [
   "qrs",
   "qrsform",
   "ramp",
   "samp",
   "achse",
   "ableitungen"
  ],
  "hinweis": "Der Komplex ist verbreitert und zeigt in den kaudalen Ableitungen breite S-Zacken bei rechtsverschobener Achse — das Muster eines Rechtsschenkelblocks. Beim Hund kommt es auch ohne fassbare Herzerkrankung vor. Denkbar sind außerdem rechtsseitige Belastung, Kardiomyopathie oder Zustand nach Trauma/Eingriff.",
  "dd": "Rechtsschenkelblock · rechtsventrikuläre Vergrößerung (Achse allein ist unzuverlässig: nur 33 % der Hunde mit RV-Vergrößerung zeigten eine Rechtsverschiebung) · ventrikuläre Extrasystolen linksventrikulären Ursprungs · vertauschte Elektroden",
  "sicher": "Verdacht",
  "quelle": "ScienceDirect Vet Sci Topics, Right Bundle Branch Block (Hund > 0,06 s, Katze > 0,04 s); Bagardi et al., Evaluation of a Novel Precordial Lead System for the Electrocardiographic Diagnosis of Right Ventricular Enlargement in Dogs, Vet Sci 2022 (PMC9416239)"
 },
 {
  "id": "qrs-linksachse-katze-lafb",
  "name": "Ausgeprägte Linksverschiebung der Achse bei der Katze (LAFB-Muster)",
  "art": "katze",
  "bedingung": "Katze: mittlere elektrische Achse zwischen −30° und −90° (mit korrekter Skalenkorrektur berechnet, nur bei getrennt aufgezeichneten Ableitungen I und II gültig), QRS ≤ 40 ms oder gering verbreitert.",
  "mess": [
   "achse",
   "qrs",
   "ramp",
   "ableitungen"
  ],
  "hinweis": "Die elektrische Achse ist deutlich nach links verschoben — das bei der Katze beschriebene Muster eines linksanterioren Faszikelblocks. Es wird gehäuft bei hypertropher Kardiomyopathie und bei Hyperthyreose gefunden, kommt aber ausdrücklich auch bei Katzen mit echokardiographisch unauffälligem Herzen vor. Der Referenzbereich der Katze reicht regulär von 0° bis +160°.",
  "dd": "linksanteriorer Faszikelblock · HCM · Hyperthyreose · Normvariante (beschrieben bei herzgesunden Katzen) · Rechenfehler in der Achsenberechnung (aVF ist gegenüber I um Faktor √3/2 skaliert — ohne Korrektur wird jede Achse zu flach)",
  "sicher": "Verdacht",
  "quelle": "ScienceDirect Vet Sci Topics, Left Anterior Fascicular Block (Katze, MEA 0° bis −90°, Assoziation HCM/Hyperthyreose, auch bei echokardiographisch normalen Katzen); Tilley (Katze MEA 0 bis +160°)"
 },
 {
  "id": "qrs-hoch-hund",
  "name": "Überhöhte R-Amplitude beim Hund",
  "art": "hund",
  "bedingung": "Hund > 20 kg: R-Amplitude in Ableitung II > 3,0 mV; Hund ≤ 20 kg: > 2,5 mV — bei 10 mm/mV, Kalibrierimpuls geprüft, über ≥ 3 Zyklen.",
  "mess": [
   "ramp",
   "qrs",
   "achse",
   "signalguete"
  ],
  "hinweis": "Die R-Zacke ist höher als der Referenzbereich. Klassisch wird das mit einer linksventrikulären Vergrößerung in Verbindung gebracht — die Aussagekraft ist aber begrenzt: in einer Studie an Hunden mit Mitralklappenendokardiose erreichte die R-Amplitude nur eine AUC von 0,58 für linksseitigen Umbau. Trainierte Windhunde (Whippets: R in II im Mittel 1,66 mV, bis 3,0 mV) liegen regelmäßig hoch, ohne krank zu sein.",
  "dd": "linksventrikuläre Vergrößerung · Sportlerherz bei Windhunden/Schlittenhunden · schlanker Brustkorb/geringe Fettauflage · Verstärkung auf 20 mm/mV statt 10 mm/mV · Elektrodenposition und Lagerung",
  "sicher": "Verdacht",
  "quelle": "Tilley (Hund R ≤ 2,5 mV klein / ≤ 3,0 mV groß); Kim et al., Evaluation of the association between electrocardiogram parameters and left cardiac remodeling in dogs with MMVD, 2022 (PMC9615506): R-Grenzwert 2,67 mV, Sens 50 % / Spez 68,5 %, AUC 0,58; Bavegems et"
 },
 {
  "id": "qrs-hoch-katze",
  "name": "Überhöhte R-Amplitude bei der Katze",
  "art": "katze",
  "bedingung": "Katze: R-Amplitude in Ableitung II > 0,9 mV bei 10 mm/mV über ≥ 3 Zyklen.",
  "mess": [
   "ramp",
   "qrs",
   "achse",
   "st"
  ],
  "hinweis": "Die R-Zacke überschreitet den Katzen-Referenzwert. Traditionell gilt das als Hinweis auf eine linksventrikuläre Vergrößerung — als Suchtest taugt es kaum: für die Erkennung einer subklinischen HCM erreichte die R-Amplitude allein eine AUC von 0,64, beim besten Grenzwert (> 0,26 mV) nur 65 % Sensitivität und 62 % Spezifität. Die Autoren dieser Arbeit stufen das 6-Kanal-EKG als schlechtes Screening-Werkzeug für die HCM ein; ein unauffälliges EKG schließt eine HCM nicht aus.",
  "dd": "linksventrikuläre Hypertrophie (HCM) · Hyperthyreose · systemische Hypertonie · Normvariante · falsche Verstärkung",
  "sicher": "Verdacht",
  "quelle": "Tilley (Katze R ≤ 0,9 mV in II); Accuracy of 6-lead electrocardiography in identifying subclinical hypertrophic cardiomyopathy in cats, JVIM 2026;40(1):aalaf009 (n=112; R-Amplitude allein AUC 0,64; > 0,26 mV → Sens 65 %/Spez 62 %; Modell R + ST-Hebung ≥ 0,04 m"
 },
 {
  "id": "qrs-niedervoltage-hund",
  "name": "Niedervoltage beim Hund",
  "art": "hund",
  "bedingung": "Hund: R-Amplitude < 0,5 mV in ALLEN sechs Extremitätenableitungen (nur prüfbar, wenn diese getrennt aufgezeichnet wurden), bei 10 mm/mV, geprüftem Kalibrierimpuls und Diagnostikfilter (0,05–150 Hz), über ≥ 5 Zyklen.",
  "mess": [
   "ramp",
   "ableitungen",
   "signalguete"
  ],
  "hinweis": "Alle Extremitätenableitungen zeigen sehr kleine Kammerkomplexe. Ursachen liegen meist zwischen Herz und Hautelektrode: Perikarderguss, Pleuraerguss, Pneumothorax, ausgeprägte Adipositas, subkutanes Ödem. Auch eine schwere Herzmuskelerkrankung oder eine Hypothyreose kommen in Frage. Bei Hunden mit Perikarderguss wurde Niedervoltage in etwa der Hälfte der Fälle gefunden — sie fehlt also häufig, obwohl ein Erguss vorliegt.",
  "dd": "Perikarderguss/Tamponade · Pleuraerguss · Pneumothorax · Adipositas/Ödem · dilatative Kardiomyopathie · Hypothyreose · TECHNISCH: Verstärkung auf 5 mm/mV, aktivierter Muskelfilter (35-Hz-Tiefpass senkt R-Amplituden), lose Elektroden — vor jeder Deutung Kalibrierimpuls und Filtereinstellung prüfen",
  "sicher": "wahrscheinlich",
  "quelle": "Veterian Key, Electrocardiography; Tilley; Merck/MSD Vet Manual, pericardial effusion in dogs (Niedervoltage in ca. 50 % der Fälle, elektrischer Alternans in 6–60 %)"
 },
 {
  "id": "qrs-niedervoltage-katze",
  "name": "Niedervoltage bei der Katze — nur relativ beurteilbar",
  "art": "katze",
  "bedingung": "Katze: R-Amplitude in Ableitung II unter 0,2 mV in allen Zyklen ODER Abfall der mittleren R-Amplitude um > 50 % gegenüber einer früheren Untersuchung desselben Tieres.",
  "mess": [
   "ramp",
   "ableitungen",
   "signalguete"
  ],
  "hinweis": "Die Kammerkomplexe sind sehr klein. Wichtig zur Einordnung: bei der Katze sind niedrige Amplituden auch am gesunden Herzen häufig — ein fester unterer Grenzwert für die Katze ist in der Fachliteratur nicht belastbar hinterlegt. Aussagekräftiger ist der Vergleich mit einer früheren Aufzeichnung desselben Tieres. Ergüsse, Adipositas und technische Ursachen bleiben trotzdem zu bedenken.",
  "dd": "Pleura-/Perikarderguss · Adipositas · Normvariante (kleine Komplexe sind bei der Katze häufig) · zu geringe Verstärkung · Muskelfilter aktiv — DER ABSOLUTE GRENZWERT FÜR DIE KATZE IST UNBELEGT",
  "sicher": "Verdacht",
  "quelle": "unbelegt für einen absoluten Grenzwert; qualitativ: Veterian Key, Electrocardiography in Cats ('QRS may be of low voltage in some normal cats')"
 },
 {
  "id": "qrs-gekerbt",
  "name": "Gekerbter QRS-Komplex",
  "art": "hund",
  "bedingung": "Zusätzliche Auslenkung innerhalb des QRS, die die Grundlinie NICHT durchquert (zusätzliche R′-Zacke, Kerbe im Gipfel der R-Zacke oder im Tiefpunkt der S-Zacke), Kerbtiefe ≥ 0,05 mV, bei ≥ 50 mm/s und 10–20 mm/mV, in ≥ 3 aufeinanderfolgenden Komplexen reproduzierbar.",
  "mess": [
   "qrsform",
   "qrs",
   "ableitungen",
   "signalguete"
  ],
  "hinweis": "Der Kammerkomplex zeigt eine Kerbe. Das wird mit umschriebener Narbenbildung/Fibrose und daraus folgender Leitungsverzögerung in Verbindung gebracht. Zur Einordnung der Wertigkeit: eine Kerbe in nur einer Ableitung fand sich auch bei 24 % herzgesunder Kontrollhunde. Erst mit steigender Zahl betroffener Ableitungen wächst die Aussagekraft — bei mehr als einer Ableitung lag die Odds Ratio für eine Herzerkrankung bei 3,97.",
  "dd": "myokardiale Fibrose/Narbe · Endokardiose, Shunt, Trikuspidaldysplasie, Pulmonalstenose, ARVC, Myokarditis, Neoplasie · NORMALVARIANTE (24 % gesunder Hunde mit Kerbe in ≥ 1 Ableitung) · ARTEFAKT: Muskelzittern und 50-Hz-Einstreuung erzeugen Scheinkerben — echte Kerben liegen in jedem Komplex an derselben Stelle und verschwinden nicht mit dem Notch-Filter",
  "sicher": "Verdacht",
  "quelle": "Winter & Bates, Retrospective evaluation of notched QRS complexes in dogs: 85 cases, J Vet Cardiol 2018;20:13–19 (69,4 % mit Herzerkrankung; OR 3,97 bei > 1 Ableitung); Santarelli et al., Retrospective evaluation of notched and fragmented QRS complex in dogs w"
 },
 {
  "id": "qrs-fragmentiert",
  "name": "Fragmentierter QRS-Komplex (fQRS)",
  "art": "hund",
  "bedingung": "Gekerbte QRS-Komplexe (Definition wie oben) in ZWEI benachbarten Ableitungen derselben Region: entweder I und aVL (linksanteriore Wand) oder zwei aus II/III/aVF (posteriore Wand). Nur prüfbar bei getrennt aufgezeichneten Ableitungen; Aufnahme mit 50 mm/s, Auswertung mit erhöhtem Vorschub/Verstärkung.",
  "mess": [
   "qrsform",
   "ableitungen",
   "signalguete"
  ],
  "hinweis": "Kerben treten in zwei benachbarten Ableitungen derselben Herzregion auf — das Muster eines fragmentierten QRS. Bei Hunden mit Mitralklappenendokardiose fand es sich in 27 % gegenüber 5,9 % bei gesunden Kontrollen. Ein Zusammenhang mit dem Krankheitsstadium (ACVIM-Klasse) oder der Vorhofgröße ließ sich in dieser Arbeit nicht zeigen — es ist also ein Hinweis auf regionale Leitungsstörung, kein Schweregradmaß.",
  "dd": "regionale myokardiale Fibrose/Narbe · auch bei 5,9 % gesunder Hunde vorhanden · Artefakt bei schlechtem Elektrodenkontakt in einer Region · Filterartefakt",
  "sicher": "Verdacht",
  "quelle": "Santarelli et al., Retrospective evaluation of notched and fragmented QRS complex in dogs with naturally occurring myxomatous mitral valve disease, Vet Q 2021 (PMC8547883): Definition nQRS/fQRS, fQRS 27 % MMVD vs. 5,9 % Kontrollen, kein Zusammenhang zu ACVIM-K"
 },
 {
  "id": "elektrischer-alternans-2",
  "name": "Elektrischer Alternans (2:1-Wechsel der QRS-Amplitude)",
  "art": "beide",
  "bedingung": "Über ≥ 10 aufeinanderfolgende Schläge wechselt die R-Amplitude streng von Schlag zu Schlag (Periode exakt 2 Schläge) mit einem Unterschied ≥ 0,1 mV oder ≥ 20 % der mittleren R-Amplitude, bei gleichzeitig stabilem RR (RR-Schwankung < 10 %), unveränderter QRS-Breite und ohne atemsynchrone Kopplung.",
  "mess": [
   "ramp",
   "rr",
   "rrschwankung",
   "hf",
   "qrs"
  ],
  "hinweis": "Die Höhe der Kammerkomplexe wechselt regelmäßig von Schlag zu Schlag — elektrischer Alternans. Zusammen mit Sinustachykardie und niedrigen Amplituden gilt diese Kombination als Hinweis auf einen hämodynamisch wirksamen Perikarderguss; sie wird bei 6–60 % der Hunde mit Perikarderguss beschrieben. Eine Ultraschalluntersuchung des Herzbeutels klärt das rasch.",
  "dd": "Perikarderguss/beginnende Tamponade · schwere Herzmuskelerkrankung · sehr schnelle supraventrikuläre Tachykardie · ATEMBEDINGTE AMPLITUDENSCHWANKUNG (folgt der Atemfrequenz, nicht dem 2:1-Takt — das ist das entscheidende Unterscheidungsmerkmal) · Grundlinienwandern (verschiebt Basis und Gipfel gleichsinnig; Alternans verändert die Amplitude gegenüber der eigenen Grundlinie) · Bigeminus mit ventrikulären Extrasystolen (dann wechselt auch die QRS-BREITE und das RR springt) — EIN NUMERISCHER GRENZW",
  "sicher": "wahrscheinlich",
  "quelle": "Merck/MSD Vet Manual und Klinikliteratur zum kaninen Perikarderguss (Alternans 6–60 %, zyklischer 1:1/2:1-Wechsel der R-Amplitude durch Herzbewegung im Erguss); StatPearls, Electrical Alternans (Definition: Schlag-zu-Schlag-Variation von Amplitude, Achse oder "
 },
 {
  "id": "r-verlust-einzelschlag",
  "name": "Plötzlicher Verlust bzw. Einbruch der R-Zacke",
  "art": "alle",
  "bedingung": "Einzelne Zyklen mit R-Amplitude < 30 % des Medians der umgebenden 10 Zyklen, bei erhaltener P-Welle und regelrechtem PQ, ohne begleitende Änderung der QRS-Breite.",
  "mess": [
   "ramp",
   "qrs",
   "pvorhanden",
   "pq",
   "ableitungen",
   "signalguete"
  ],
  "hinweis": "Einzelne Kammerkomplexe fallen deutlich kleiner aus als die übrigen. Bevor an eine Ursache am Herzen gedacht wird, lohnt der technische Blick: ein kurzzeitig gelöster Elektrodenkontakt, eine Bewegung des Tieres oder eine tiefe Atembewegung erzeugen genau dieses Bild. Bleiben P-Welle und PQ unverändert und tritt der Einbruch nur in einer Ableitung auf, spricht das stark für ein Artefakt.",
  "dd": "ARTEFAKT durch Elektrodenkontakt/Bewegung/Atmung (häufigste Ursache; betrifft meist nur eine Ableitung) · elektrischer Alternans (dann streng 2:1) · Fusionsschlag · wechselnde Herzlage bei Erguss · echter R-Verlust bei Infarkt/Narbe (bleibt dann dauerhaft und in mehreren Ableitungen bestehen)",
  "sicher": "Verdacht",
  "quelle": "Small Animal ECGs, Kapitel Artefacts, Wiley; allgemeine Artefaktlehre (Bewegungs- und Kontaktartefakte); spezifischer tiermedizinischer Grenzwert: unbelegt"
 },
 {
  "id": "st-senkung-hund",
  "name": "ST-Senkung beim Hund",
  "art": "hund",
  "bedingung": "Hund: ST-Abweichung nach unten > 0,2 mV (Lehrbuchgrenze) bzw. > 0,3 mV (studienbasierte Verdachtsschwelle), gemessen gegen die PQ-Strecke als Bezugslinie, 40 ms nach dem QRS-Ende (NICHT J+60/80 ms — die ST-Strecke dauert beim Hund nur 40–100 ms), Signalgüte ≥ 'gut', über ≥ 3 Zyklen.",
  "mess": [
   "st",
   "ramp",
   "qrs",
   "hf",
   "signalguete"
  ],
  "hinweis": "Die ST-Strecke verläuft unterhalb der Bezugslinie. Möglich sind Sauerstoffmangel des Herzmuskels, Elektrolytstörungen (Kalium in beide Richtungen), Digoxinwirkung oder eine Kammervergrößerung. Zur Einordnung: bei 180 herzgesunden Hunden fand sich in 23,9 % eine ST-Abweichung (36 Senkungen, Median 0,1 mV, bis 0,3 mV) — eine Senkung bis 0,3 mV liegt also im Bereich des am Gesunden Beobachteten. Als Verdachtsschwelle schlagen die Autoren erst > 0,3 mV vor.",
  "dd": "Myokardhypoxie/Ischämie · Hypo- oder Hyperkaliämie · Digoxin · Kammervergrößerung (dann oft mit Ausziehen der S-Zacke in die T-Welle) · NORMALBEFUND (23,9 % gesunder Hunde) · ARTEFAKT: Grundlinienwandern und Hochpassfilter über 0,05 Hz verschieben die ST-Strecke — nur mit Diagnostikfilter 0,05–150 Hz messen",
  "sicher": "Verdacht",
  "quelle": "Romito et al., Retrospective evaluation of the ST segment electrocardiographic features in 180 healthy dogs, J Small Anim Pract 2022 (43/180 = 23,9 % mit Abweichung; 36 Senkungen, Median 0,1 mV, Bereich 0,05–0,3 mV; Verdachtsschwelle Senkung > 0,3 mV); Tilley "
 },
 {
  "id": "st-hebung-hund",
  "name": "ST-Hebung beim Hund",
  "art": "hund",
  "bedingung": "Hund: ST-Abweichung nach oben > 0,15 mV (Lehrbuchgrenze) bzw. > 0,2 mV (studienbasierte Verdachtsschwelle), gemessen gegen die PQ-Strecke, 40 ms nach QRS-Ende, Signalgüte ≥ 'gut', über ≥ 3 Zyklen.",
  "mess": [
   "st",
   "qrs",
   "hf",
   "signalguete"
  ],
  "hinweis": "Die ST-Strecke verläuft oberhalb der Bezugslinie. In Frage kommen Myokardhypoxie, ein transmuraler Infarkt, eine Perikarderkrankung oder eine Perikarditis. Zur Einordnung: bei gesunden Hunden traten Hebungen vor (7 von 180; Mittel 0,136 ± 0,055 mV, meist konkav geformt). Als Verdachtsschwelle wird erst > 0,2 mV vorgeschlagen.",
  "dd": "Myokardhypoxie · transmuraler Infarkt · Perikarderguss/Perikarditis · Normvariante (konkave Hebung bei gesunden Hunden) · ARTEFAKT durch Grundlinienwandern oder falschen Filter",
  "sicher": "Verdacht",
  "quelle": "Romito et al., J Small Anim Pract 2022 (7/180 Hebungen, Mittel 0,136 ± 0,055 mV, überwiegend konkav; Verdachtsschwelle Hebung > 0,2 mV); Tilley (Lehrbuchgrenze 0,15 mV)"
 },
 {
  "id": "st-abweichung-katze",
  "name": "ST-Abweichung bei der Katze",
  "art": "katze",
  "bedingung": "Katze: jede messbare ST-Abweichung gegen die PQ-Strecke ≥ 0,04 mV, gemessen 30 ms nach QRS-Ende (die ST-Strecke der Katze dauert nur 60–80 ms), Signalgüte 'gut', über ≥ 3 Zyklen.",
  "mess": [
   "st",
   "ramp",
   "qrs",
   "signalguete"
  ],
  "hinweis": "Bei der Katze gilt jede messbare ST-Abweichung als beachtenswert. Eine ST-Hebung ab 0,04 mV war in einer Untersuchung an 112 Katzen neben der R-Amplitude der zweite unabhängige Faktor, der mit einer subklinischen HCM einherging (Odds Ratio 8,3). Das gemeinsame Modell erreichte eine AUC von 0,86 — die Autoren betonen dennoch, dass das EKG die Echokardiographie nicht ersetzt.",
  "dd": "HCM · Myokardhypoxie · Elektrolytstörung · Hyperthyreose · ARTEFAKT: bei Amplituden dieser Größenordnung ist jedes Grundlinienwandern und jeder Muskelfilter relevant — Kalibrierimpuls, Filter und Ruhelage müssen dokumentiert sein",
  "sicher": "wahrscheinlich",
  "quelle": "Accuracy of 6-lead electrocardiography in identifying subclinical hypertrophic cardiomyopathy in cats, JVIM 2026;40(1):aalaf009 (ST-Hebung ≥ 0,04 mV OR 8,3; 95 % KI 2,9–27,4; Modell mit R-Amplitude AUC 0,86); Tilley (Katze: keine ST-Abweichung akzeptabel)"
 },
 {
  "id": "st-verkuerzt",
  "name": "Verkürzte ST-Strecke mit kurzem QT",
  "art": "beide",
  "bedingung": "Hund: QT < 150 ms bei HF < 160/min (bzw. QTcV nach Van de Water < 200 ms); Katze: QT < 120 ms bei HF < 200/min — jeweils bei erhaltener T-Wellen-Breite, d.h. die Verkürzung entfällt auf die ST-Strecke.",
  "mess": [
   "qt",
   "st",
   "hf",
   "tform"
  ],
  "hinweis": "Die ST-Strecke ist kurz und das QT damit unter dem Referenzbereich, während die T-Welle unverändert bleibt. Dieses Muster passt zu einer Hyperkalzämie; auch Digoxinwirkung und Hyperthermie kommen in Frage. Eine Bestimmung des ionisierten Calciums kann das rasch einordnen.",
  "dd": "Hyperkalzämie · Digoxin · Hyperthermie · Hyperkaliämie · frequenzbedingte Verkürzung (deshalb frequenzkorrigiert prüfen — beim Hund mit Van de Water, bei der Katze steht keine belegte Korrekturformel zur Verfügung) · falsch gesetztes T-Ende bei flacher T-Welle",
  "sicher": "Verdacht",
  "quelle": "Tilley (Hund QT 0,15–0,25 s, Katze 0,12–0,18 s); ScienceDirect Vet Sci Topics, QT Interval; Merck Vet Manual, Hypercalcemia in Dogs and Cats"
 },
 {
  "id": "st-verlaengert-qt-lang",
  "name": "Verlängerte ST-Strecke / verlängertes QT",
  "art": "beide",
  "bedingung": "Hund: QTcV (Van de Water) > 270 ms; zusätzlich Rohwert QT > 250 ms bei HF im Referenzbereich. Katze: QT > 180 ms bei HF < 200/min (Rohwert; eine belegte Korrekturformel für die Katze existiert nicht).",
  "mess": [
   "qt",
   "hf",
   "st",
   "tform",
   "signalguete"
  ],
  "hinweis": "Die Repolarisation dauert länger als der Referenzbereich. In Frage kommen Hypokalzämie, Hypokaliämie, Hypomagnesiämie, Hypothermie, zentralnervöse Erkrankungen sowie Medikamente, die die Repolarisation verlängern (Klasse-IA- und Klasse-III-Antiarrhythmika, u.a. Sotalol). Beim Hund wurde als obere Referenzgrenze für QTcV in einer Arbeit an wachen Beagles ein Bereich von 246–270 ms ermittelt.",
  "dd": "Hypokalzämie/Hypokaliämie/Hypomagnesiämie · Hypothermie · Sotalol, Chinidin, Procainamid · ZNS-Erkrankung · MESSPROBLEM: das T-Ende ist bei flacher oder biphasischer T-Welle die unsicherste Marke im EKG — bei 256 Hz beträgt die Auflösung ±3,9 ms je Endpunkt; DIE BAZETT-FORMEL DARF HIER NICHT VERWENDET WERDEN (sie überkorrigiert bei hohen Frequenzen); für Katze, Pferd und Heimtiere ist keine Korrekturformel belegt",
  "sicher": "wahrscheinlich",
  "quelle": "Miyazaki & Tagawa, Simple-to-use reference criteria for revealing drug-induced QT interval prolongation in conscious dogs (PMID 17112506): Van-de-Water-Korrektur, QTc(maxR) 246–270 ms an 6 wachen Beagles; Tilley (Referenzbereiche); van de Water et al. (QTcV = "
 },
 {
  "id": "t-gross-hund",
  "name": "Große T-Welle beim Hund",
  "art": "hund",
  "bedingung": "Hund: |T-Amplitude| > 25 % der |R-Amplitude| desselben Komplexes ODER |T-Amplitude| > 1,0 mV in irgendeiner Ableitung, über ≥ 3 Zyklen.",
  "mess": [
   "tamp",
   "ramp",
   "qrs",
   "hf",
   "signalguete"
  ],
  "hinweis": "Die T-Welle ist im Verhältnis zur R-Zacke ungewöhnlich groß. Beschrieben ist das bei Sauerstoffmangel des Herzmuskels, intraventrikulären Leitungsstörungen, Kammervergrößerung, Hypothermie, Bradykardie und Hyperkaliämie. Wichtig zur Einordnung: die T-Welle ist beim Tier ausgesprochen unspezifisch — beim Hund sind positive, negative und biphasische T-Wellen alle als normal beschrieben, und T-Veränderungen sind häufig nur Folge eines veränderten QRS.",
  "dd": "Hyperkaliämie · Myokardhypoxie · intraventrikuläre Leitungsstörung · Kammervergrößerung · Hypothermie · Bradykardie · Anämie/Fieber/Schock · Digitalis, Chinidin, Procainamid · sekundäre T-Änderung bei breitem QRS (dann keine eigenständige Bedeutung)",
  "sicher": "Verdacht",
  "quelle": "Tilley, Essentials of Canine and Feline Electrocardiography (T ≤ ¼ der R-Zacke bzw. ≤ 1,0 mV); ScienceDirect Vet Sci Topics, T Wave; Today's Veterinary Nurse, Overview of Electrocardiogram Interpretation"
 },
 {
  "id": "t-gross-katze",
  "name": "Große T-Welle bei der Katze",
  "art": "katze",
  "bedingung": "Katze: |T-Amplitude| > 0,3 mV ODER > 25 % der |R-Amplitude| desselben Komplexes, über ≥ 3 Zyklen.",
  "mess": [
   "tamp",
   "ramp",
   "hf"
  ],
  "hinweis": "Die T-Welle liegt über dem für die Katze beschriebenen Bereich. Bei der Katze ist die T-Welle üblicherweise positiv und klein. Denkbar sind Hyperkaliämie, Myokardhypoxie oder eine Kammerhypertrophie. Wie beim Hund gilt: die T-Welle allein trägt wenig.",
  "dd": "Hyperkaliämie · Myokardhypoxie · Hypertrophie · Normvariante · Grundlinienwandern verschiebt den T-Gipfel",
  "sicher": "Verdacht",
  "quelle": "Veterian Key, Electrocardiography (Katze: T meist positiv, < 0,3 mV, nicht über ¼ der R-Amplitude)"
 },
 {
  "id": "t-zeltfoermig-hyperkaliaemie",
  "name": "Spitze, zeltförmige T-Welle — Kaliummuster",
  "art": "beide",
  "bedingung": "T-Welle schmal und spitz (T-Basisbreite < 40 % der QT-Dauer) mit |T| > 25 % von |R|, UND mindestens eines von: R-Amplitude gegenüber Voraufnahme gefallen, QRS-Breite über der artspezifischen Grenze, PQ verlängert, P-Amplitude < 0,1 mV oder P fehlend, HF unter dem artspezifischen Referenzbereich.",
  "mess": [
   "tamp",
   "tform",
   "ramp",
   "qrs",
   "pq",
   "pamp",
   "pvorhanden",
   "hf",
   "qt",
   "st"
  ],
  "hinweis": "Das Bild aus spitzer, zeltförmiger T-Welle zusammen mit kleineren R-Zacken, breiterem QRS oder schwächer werdender P-Welle entspricht dem beschriebenen Verlauf bei steigendem Kalium: zeltförmige T ab etwa 5,5–6,5 mmol/l; abnehmende R-Amplitude, breiterer QRS, längeres PQ und ST-Senkung bei 6,6–7,0 mmol/l; kleinere und breitere P-Wellen sowie längeres QT bei 7,1–8,5 mmol/l; fehlende P-Wellen (Vorhofstillstand, sinuventrikulärer Rhythmus) bei 8,6–10,0 mmol/l; darüber sinuswellenartige Verbreiterung. Eine Kaliumbestimmung klärt das. Wichtig: kein Kaliumwert ist fest an ein bestimmtes EKG-Bild gekoppelt, und das EKG kann bei lebensbedrohlicher Hyperkaliämie unauffällig sein — ein normales EKG schließt sie nicht aus.",
  "dd": "Hyperkaliämie (Urethraverschluss, Hypoadrenokortizismus, Niereninsuffizienz, Reperfusion, ausgedehnte Gewebeschäden) · Myokardhypoxie · Bradykardie mit großer T-Welle · Normvariante mit hoher T-Welle · ARTEFAKT: eine überlagerte P-Welle des nächsten Zyklus kann die T spitz erscheinen lassen",
  "sicher": "Verdacht",
  "quelle": "Tag & Day, Electrocardiographic assessment of hyperkalemia in dogs and cats, J Vet Emerg Crit Care 2008 (Stufen 5,5–6,5 / 6,6–7,0 / 7,1–8,5 / 8,6–10,0 / > 10,1 mmol/l); Today's Veterinary Practice, Evaluation and Management of the Hyperkalemic Patient (2022); "
 },
 {
  "id": "t-wechselnd-alternans",
  "name": "Wechselnde T-Wellen-Amplitude oder -Polarität",
  "art": "alle",
  "bedingung": "|T-Amplitude| wechselt über ≥ 10 Schläge streng von Schlag zu Schlag (Periode 2 Schläge) um ≥ 0,1 mV, bei stabilem RR (< 10 % Schwankung) und unveränderter QRS-Breite; ODER Polaritätswechsel der T-Welle innerhalb desselben Streifens ohne Änderung von QRS-Form und Achse.",
  "mess": [
   "tamp",
   "tform",
   "rr",
   "rrschwankung",
   "qrs"
  ],
  "hinweis": "Die T-Welle ändert von Schlag zu Schlag Höhe oder Richtung. Ein sichtbarer T-Alternans gilt als Zeichen einer instabilen Repolarisation. Zugleich ist die T-Welle beim Tier sehr wechselhaft: beim Pferd ändert sie Polarität und Dauer stark mit Vagotonus und Herzfrequenz, ohne dass daraus ein Befund folgt. Ohne begleitende Auffälligkeit in QRS, Frequenz oder Elektrolyten trägt dieser Punkt wenig.",
  "dd": "elektrische Instabilität der Repolarisation · Elektrolytstörung · sehr hohe Frequenz · beim PFERD Normalvariante (T-Morphologie stark vagotonusabhängig) · Atemschwankung (folgt der Atemfrequenz, nicht dem 2:1-Takt) · Grundlinienwandern",
  "sicher": "Verdacht",
  "quelle": "van Loon/Patteson, Electrocardiography in horses – Part 2 (T-Morphologie beim Pferd extrem labil, Änderungen unter Belastung ohne klinische Bedeutung); StatPearls, Electrical Alternans; quantitativer tiermedizinischer Grenzwert: unbelegt"
 },
 {
  "id": "t-negativ",
  "name": "Negative T-Welle",
  "art": "hund",
  "bedingung": "T-Amplitude in Ableitung II ≤ −0,05 mV bei positiver R-Zacke, über ≥ 3 Zyklen, ohne gleichzeitige QRS-Verbreiterung.",
  "mess": [
   "tamp",
   "tform",
   "ramp",
   "qrs"
  ],
  "hinweis": "Die T-Welle ist in Ableitung II negativ. Für sich genommen sagt das beim Hund wenig: positive, negative und biphasische T-Wellen sind alle als normal beschrieben. Aussagekraft entsteht erst, wenn sich die T-Polarität gegenüber einer FRÜHEREN Aufzeichnung desselben Tieres geändert hat oder wenn weitere Auffälligkeiten hinzukommen.",
  "dd": "Normvariante (häufigster Fall beim Hund) · sekundäre Änderung bei verbreitertem QRS · Myokardhypoxie · Elektrolytstörung · Hypothyreose · vertauschte Elektroden (dann ist auch der QRS invertiert)",
  "sicher": "Verdacht",
  "quelle": "Tilley (T des Hundes positiv, negativ oder diphasisch — alle normal); Romito et al., The canine T wave: retrospective analysis in 129 healthy dogs and proposed reference intervals, J Vet Cardiol 2022;42:52–64 (positive T am häufigsten, asymmetrische Form überw"
 },
 {
  "id": "t-unspezifisch-meta",
  "name": "Grundsatz zur T-Welle beim Tier (Meta-Regel)",
  "art": "alle",
  "bedingung": "Wird als einzige Auffälligkeit eine T-Wellen-Veränderung gefunden (Amplitude, Polarität oder Form), ohne Abweichung bei P, PQ, QRS, ST, QT, Achse und Frequenz: Hinweis nur mit ausdrücklicher Unsicherheitsangabe ausgeben.",
  "mess": [
   "tamp",
   "tform",
   "qrs",
   "st",
   "qt",
   "pq",
   "hf",
   "achse"
  ],
  "hinweis": "Es ist ausschließlich die T-Welle auffällig. Isolierte T-Veränderungen sind beim Tier sehr unspezifisch: sie treten bei Stoffwechselstörungen (Unterzucker, Anämie, Schock, Fieber), unter Medikamenten (Digitalis, Chinidin, Procainamid), bei neurologischen Erkrankungen und ohne fassbare Ursache auf — und sind häufig nur eine Folgeerscheinung eines veränderten QRS. Ein Vergleich mit einer früheren Aufzeichnung desselben Tieres ist aussagekräftiger als jeder absolute Grenzwert.",
  "dd": "Stoffwechsel (Hypoglykämie, Anämie, Schock, Fieber) · Medikamente · neurologische Erkrankung · sekundär zu verändertem QRS · Normvariante · Artefakt",
  "sicher": "Verdacht",
  "quelle": "Today's Veterinary Nurse, Overview of Electrocardiogram Interpretation ('T wave changes are relatively nonspecific and often the consequence of an abnormal QRS complex'); ScienceDirect Vet Sci Topics, T Wave"
 },
 {
  "id": "grundlinie-netz-50hz",
  "name": "Netzeinstreuung 50 Hz (bzw. 60 Hz)",
  "art": "alle",
  "bedingung": "Spektrale Leistungsdichte im Band 49–51 Hz (EU) bzw. 59–61 Hz (US) > 20 % der Gesamtleistung des Signals, oder Amplitude der 50-Hz-Komponente ≥ 0,05 mV; Muster über den GESAMTEN Streifen gleichmäßig, auch in der TP-Strecke.",
  "mess": [
   "signalguete"
  ],
  "hinweis": "Über dem gesamten Streifen liegt eine gleichmäßige Schwingung mit exakt 50 Hz — Netzeinstreuung, kein Herzsignal. Typische Ursachen sind schlechter Elektrodenkontakt, trockene Klemmen, ungeerdete Geräte oder Kabel in der Nähe von Netzleitungen. Zu prüfen sind Kontaktgel/Alkohol, Klemmendruck, Abstand zu anderen Geräten und ein Netzfilter. Solange dieses Muster besteht, sind Kerben, kleine ST-Abweichungen und die P-Erkennung nicht beurteilbar.",
  "dd": "Netzeinstreuung (Periode exakt 20 ms bei 50 Hz, gleichmäßig über den ganzen Streifen, auch zwischen den Schlägen) · Muskelzittern (unregelmäßige Amplituden, breitbandig, schwankt mit der Anspannung) · Vorhofflattern (Periode 133–240 ms — Größenordnungen entfernt) · Vorhofflimmern (unregelmäßig, dazu unregelmäßiges RR)",
  "sicher": "gesichert",
  "quelle": "Small Animal ECGs, Kapitel Artefacts, Wiley; allgemeine EKG-Artefaktlehre (Netzfrequenz 50 Hz EU / 60 Hz US); VetStation-Filterregel: Diagnostik 0,05–150 Hz, Notch 50 Hz"
 },
 {
  "id": "grundlinie-muskelzittern",
  "name": "Muskelzittern / Schnurren / Frieren",
  "art": "alle",
  "bedingung": "Anteil der Signalleistung im Band 20–40 Hz > 30 % bei gleichzeitig UNGLEICHMÄSSIGER Verteilung über die Zeit (Streuung der Bandleistung zwischen aufeinanderfolgenden 250-ms-Fenstern > 50 %), Grundlinienrauschen in der TP-Strecke > 0,05 mV.",
  "mess": [
   "signalguete",
   "ramp"
  ],
  "hinweis": "Die Grundlinie zeigt unregelmäßige, zackige Auslenkungen wechselnder Stärke — typisch für Muskelzittern, Frieren, Hecheln, Kauen oder Schnurren. Anders als bei Netzeinstreuung ist das Muster nicht gleichmäßig, sondern kommt und geht. Meist helfen ruhige Lagerung auf einer Isoliermatte, eine warme Unterlage und ein Moment Wartezeit. Ein Muskelfilter (Tiefpass 35 Hz) glättet das Bild, senkt aber auch echte R-Amplituden und kann eine Niedervoltage vortäuschen — der gefilterte Streifen taugt daher nicht zur Amplitudenmessung.",
  "dd": "Muskelzittern/Schnurren/Hecheln · Netzeinstreuung (streng periodisch, gleichmäßig) · Vorhofflimmern (dann zusätzlich unregelmäßiges RR und fehlende P) · Kammerflimmern (dann keine erkennbaren QRS mehr und Tier bewusstlos — klinischer Zustand entscheidet)",
  "sicher": "gesichert",
  "quelle": "Small Animal ECGs, Kapitel Artefacts, Wiley; VetStation-Filterregel (Muskelfilter Tiefpass 35 Hz; Monitorfilter nie zur Diagnostik)"
 },
 {
  "id": "grundlinie-wandern",
  "name": "Wandernde Grundlinie",
  "art": "alle",
  "bedingung": "Verschiebung der isoelektrischen Linie (PQ-Strecke) um > 0,1 mV zwischen aufeinanderfolgenden Zyklen ODER Leistung unter 0,5 Hz > 25 % der Gesamtleistung; typische Periodizität entspricht der Atemfrequenz.",
  "mess": [
   "signalguete",
   "st",
   "pdauer",
   "tamp"
  ],
  "hinweis": "Die Grundlinie driftet, meist im Takt der Atmung oder durch Bewegung und schlechten Elektrodenkontakt. Solange sie wandert, sind ST-Abweichungen, P-Dauer und T-Amplitude nicht verwertbar: der Bezugspunkt für die Messung verschiebt sich mit. Vor jeder ST-Beurteilung sollten Lagerung, Elektrodenkontakt und Atemruhe stimmen. Wichtig: ein Hochpassfilter über 0,05 Hz beruhigt zwar die Grundlinie, verfälscht aber die ST-Strecke — für die ST-Messung muss der Diagnostikfilter (0,05–150 Hz) eingestellt sein.",
  "dd": "Atembewegung · Bewegung des Tieres · loser oder ausgetrockneter Elektrodenkontakt · Kabelzug · falsch gewählter Hochpassfilter (erzeugt selbst ST-Verschiebungen)",
  "sicher": "gesichert",
  "quelle": "Small Animal ECGs, Kapitel Artefacts, Wiley; VetStation-Filterregel: Diagnostik 0,05–150 Hz — der Monitorfilter (0,5–40 Hz) darf nie zur ST-Beurteilung dienen"
 },
 {
  "id": "artefakt-durchmarschierender-grundrhythmus",
  "name": "Artefakt statt Rhythmusstörung erkennen (Grundrhythmus marschiert durch)",
  "art": "alle",
  "bedingung": "In einem Abschnitt mit scheinbar breiten, schnellen Komplexen lassen sich in regelmäßigem Abstand die normalen QRS-Komplexe des Grundrhythmus wiederfinden: Abstand dieser Zacken entspricht dem RR VOR und NACH dem Abschnitt (±10 %); zusätzlich: die Störung ist nur in EINER Ableitung sichtbar; nach dem Abschnitt fehlt eine kompensatorische Pause.",
  "mess": [
   "rr",
   "qrs",
   "qrsform",
   "ableitungen",
   "signalguete",
   "hf"
  ],
  "hinweis": "In diesem Abschnitt lässt sich der ursprüngliche Rhythmus in unverändertem Takt durch die Störung hindurch weiterverfolgen, die Auffälligkeit betrifft nur eine Ableitung und es folgt keine kompensatorische Pause. Das spricht dafür, dass es sich um ein Artefakt handelt und nicht um eine Kammertachykardie. Der klinische Zustand des Tieres in diesem Moment (Puls tastbar, wach) entscheidet die Frage sicherer als jeder Messwert.",
  "dd": "Bewegungs-/Muskelartefakt (Grundrhythmus marschiert durch, nur eine Ableitung betroffen, keine kompensatorische Pause, Puls bleibt tastbar) · echte ventrikuläre Tachykardie (in ALLEN Ableitungen, Grundrhythmus nicht durchverfolgbar, kompensatorische Pause, hämodynamische Folgen) · Elektrodenschütteln durch Zittern",
  "sicher": "wahrscheinlich",
  "quelle": "Two Cases of Intraoperative ECG Artifact Mimicking Ventricular Tachycardia and How to Know When It Is Real (PMC10168523) — 'Notch Sign': normale QRS im Artefakt im Takt des Grundrhythmus; Small Animal ECGs, Kapitel Artefacts, Wiley"
 },
 {
  "id": "signalguete-sperre-2",
  "name": "Messsperre bei unzureichender Signalgüte (Meta-Regel)",
  "art": "alle",
  "bedingung": "Grundlinienrauschen in der TP-Strecke > 0,05 mV (Hund/Pferd) bzw. > 0,025 mV (Katze/Heimtier) ODER 50-Hz-Anteil > 20 % ODER Grundliniendrift > 0,1 mV/Zyklus ODER Vorschub < 50 mm/s bei Katze/Heimtier: dann KEINE Ausgabe von Befundregeln zu P-Dauer, ST, T-Amplitude, Kerbung und Achse.",
  "mess": [
   "signalguete",
   "st",
   "pdauer",
   "tamp",
   "qrsform",
   "achse"
  ],
  "hinweis": "Die Signalgüte reicht für Messungen an P-Dauer, ST-Strecke, T-Amplitude, QRS-Kerbung und elektrischer Achse nicht aus. Diese Punkte werden deshalb nicht bewertet. Frequenz und Rhythmus lassen sich weiterhin beurteilen. Für die Feinmessung wären ein besserer Elektrodenkontakt, ruhige Lagerung, der Diagnostikfilter (0,05–150 Hz) und bei Katze und Heimtier ein Vorschub von 50 mm/s hilfreich.",
  "dd": "— (technische Sperre, kein klinischer Befund)",
  "sicher": "gesichert",
  "quelle": "VetStation-Messgrundlagen (Messunsicherheit ±3,91 ms bei 256 Hz je Intervallendpunkt; Katzen-QRS 0,04 s = 1 mm bei 25 mm/s; Filterregel Diagnostik 0,05–150 Hz); Small Animal ECGs, Kapitel Artefacts, Wiley"
 },
 {
  "id": "heimtier-referenz-kaninchen",
  "name": "Kaninchen — Referenzbereiche für die Kurvenformbeurteilung",
  "art": "heimtier",
  "bedingung": "Kaninchen (wach): HF 198–330/min · P-Dauer 10–50 ms · P-Amplitude 0,04–0,12 mV · PQ 40–80 ms · QRS 20–60 ms · R-Amplitude 0,03–0,39 mV · QT 80–160 ms · T-Amplitude 0,05–0,17 mV · elektrische Achse −43° bis +80°. Werte außerhalb dieser Bereiche kennzeichnen.",
  "mess": [
   "hf",
   "pdauer",
   "pamp",
   "pq",
   "qrs",
   "ramp",
   "qt",
   "tamp",
   "achse"
  ],
  "hinweis": "Für das Kaninchen liegen eigene Referenzbereiche vor; die Hunde- und Katzengrenzwerte passen nicht. Auffällig ist besonders die sehr kleine R-Amplitude (bis etwa 0,39 mV) — der Niedervoltage-Grenzwert des Hundes von 0,5 mV würde beim gesunden Kaninchen immer ansprechen. Wegen der hohen Frequenz und der kleinen Amplituden sind 50 mm/s Vorschub und 20 mm/mV Verstärkung sinnvoll.",
  "dd": "— (Referenzbereich, kein Befund); zu beachten: Stress und Handling verändern beim Kaninchen Frequenz und Amplituden erheblich; für Kaninchen ist KEINE QT-Korrekturformel belegt",
  "sicher": "wahrscheinlich",
  "quelle": "Lord B, Boswood A, Petrie A, Electrocardiography of the normal domestic pet rabbit, Vet Rec 2010 (PMID 21262711)"
 },
 {
  "id": "heimtier-referenz-frettchen-meerschwein",
  "name": "Frettchen und Meerschweinchen — Grenzen der Beurteilbarkeit",
  "art": "heimtier",
  "bedingung": "Frettchen: HF um 300/min, mittlere elektrische Achse etwa +86° ± 6,6° (Referenz an narkotisierten Tieren erhoben; Lagerung ändert Achse, P- und R-Amplituden signifikant). Meerschweinchen (wach): P-Dauer 37,3–50,3 ms, QRS-Dauer 52,7–74,8 ms. Für beide Arten KEINE Anwendung von Hunde- oder Katzengrenzwerten.",
  "mess": [
   "hf",
   "pdauer",
   "pamp",
   "qrs",
   "ramp",
   "achse"
  ],
  "hinweis": "Für Frettchen und Meerschweinchen liegen nur wenige Referenzarbeiten vor, und die veröffentlichten Werte wurden unter unterschiedlichen Bedingungen (Narkose, Lagerung, Vorschub) erhoben. Für das Frettchen ist belegt, dass allein der Wechsel zwischen Seiten- und Brustlage die elektrische Achse sowie P- und R-Amplituden verändert. Grenzwerte für ST, T-Amplitude, Niedervoltage und QT-Korrektur sind für diese Arten nicht belastbar hinterlegt — entsprechende Hinweise sollten hier unterbleiben.",
  "dd": "— ; ausdrücklich UNBELEGT für Frettchen/Meerschweinchen: ST-Grenzwerte, T-Amplituden-Grenzwerte, Niedervoltage-Grenzwert, QT-Korrekturformel, Kerbungskriterien",
  "sicher": "Verdacht",
  "quelle": "Bublot I, Randolph RW, Chalvet-Monfray K, Sawaya S, The surface electrocardiogram in domestic ferrets, J Vet Cardiol 2006 (n=80, Ketamin/Diazepam, Lagerungseffekt auf MEA, P- und R-Amplituden); Edwards NJ 1985 zu Frettchen-MEA +86° ± 6,6°; Computerized electro"
 },
 {
  "id": "pferd-achse-nicht-auswertbar",
  "name": "Beim Pferd keine Kammeraussage aus Achse und Amplitude (Sperr-Regel)",
  "art": "pferd",
  "bedingung": "Tierart = Pferd: Regeln zu mittlerer elektrischer Achse, R-Amplitudengrenzen und Kammervergrößerung nicht anwenden; ausgegeben werden nur Frequenz, Rhythmus, P-Form/-Dauer, PQ, QRS-Dauer, QT und Grundlinienbefunde.",
  "mess": [
   "achse",
   "ramp",
   "qrs"
  ],
  "hinweis": "Beim Pferd erlaubt die Ausbreitung der Erregung im Kammermyokard (Purkinje-Fasern durchziehen die gesamte Kammerwand) keinen Rückschluss von Achse oder Amplitude auf die Kammergröße. Aussagen zu Kammervergrößerung werden deshalb nicht angeboten — dafür ist die Echokardiographie das Mittel der Wahl. Frequenz, Rhythmus, Vorhofwelle und Leitungszeiten bleiben beurteilbar.",
  "dd": "— (Sperr-Regel)",
  "sicher": "gesichert",
  "quelle": "van Loon/Patteson, Electrocardiography in horses – Part 2: How to read the equine ECG; Mitchell, ECG Interpretation in Equine Practice, CABI 2020; VetStation-Referenz (achse:null beim Pferd bewusst hinterlegt)"
 },
 {
  "id": "hund-normwerte-groessenabhaengig",
  "name": "Hunde-Normbereich Ableitung II, koerpermassenabhaengig",
  "art": "hund",
  "bedingung": "Art = Hund UND HF 70-160/min (Rassen < 7 kg: 70-180/min) UND P-Dauer <= 40 ms UND P-Amplitude <= 0.4 mV UND PQ 60-130 ms UND QRS-Dauer <= 50 ms bei KM < 15 kg bzw. <= 60 ms bei KM >= 15 kg UND R-Amplitude Abl. II <= 2.5 mV bei KM < 15 kg bzw. <= 3.0 mV bei KM >= 15 kg UND elektrische Achse +40 bis +100 Grad UND ST-Senkung <= 0.2 mV UND ST-Hebung <= 0.15 mV",
  "mess": [
   "hf",
   "p",
   "pq",
   "qrs",
   "ramp",
   "achse",
   "st"
  ],
  "hinweis": "Alle Messwerte liegen im publizierten Bereich fuer den Hund. Die Grenzen fuer QRS-Dauer und R-Amplitude haengen von der Koerpergroesse ab - ein und derselbe Wert kann beim Zwergrassenhund auffaellig und beim Grossrassenhund unauffaellig sein. Bei Windhunden und Riesenrassen gelten zusaetzlich eigene Regeln.",
  "dd": "bei Grenzwertueberschreitung: Kalibrierung (10 mm/mV) und Papiervorschub pruefen, bevor ein Vergroesserungshinweis ausgegeben wird",
  "sicher": "gesichert",
  "quelle": "Tilley LP, Essentials of Canine and Feline Electrocardiography, 3. Aufl.; Veterian Key 'Normal Electrocardiogram' (HF Welpe bis 220/min, Zwergrassen 80-180/min, MEA +40 bis +100 Grad)"
 },
 {
  "id": "windhund-hohe-r-amplitude",
  "name": "Hohe R-Amplitude beim Windhund - rassetypisch, kein Vergroesserungsbeleg",
  "art": "hund",
  "bedingung": "Art = Hund UND Rasse in {Greyhound, Whippet, Galgo Espanol, Saluki, Barsoi, Afghanischer Windhund, Podenco, Magyar Agar, Irischer Wolfshund-Windhundkreuzung} UND R-Amplitude Abl. II 3.0-5.0 mV UND QRS-Dauer <= 60 ms UND P-Dauer <= 40 ms UND elektrische Achse +40 bis +100 Grad",
  "mess": [
   "ramp",
   "qrs",
   "p",
   "achse"
  ],
  "hinweis": "Die R-Amplitude liegt ueber dem allgemeinen Hunde-Richtwert von 3.0 mV. Bei Windhunden sind erhoehte R-Amplituden in Abl. II und in den linken Brustwandableitungen als Rassemerkmal beschrieben; in einer Untersuchung an 105 gesunden Whippets lag ein erheblicher Teil der Tiere ueber den publizierten Maximalwerten fuer die Hundepopulation, das Muster entspricht dem 'Sportlerherz' des Menschen. Das reine Voltagekriterium fuer eine linksventrikulaere Vergroesserung traegt bei dieser Rassegruppe daher nicht.",
  "dd": "echte linksventrikulaere Hypertrophie oder Volumenbelastung; schmaler Thorax mit herznaher Elektrodenlage; zu hohe Verstaerkereinstellung",
  "sicher": "wahrscheinlich",
  "quelle": "Bavegems V et al., Electrocardiographic reference values in whippets. Res Vet Sci 2009 (105 gesunde Whippets), PMID 19524205; Greyhound-spezifische Referenzintervalle: unbelegt (nur narrative Quellen zur herznahen Lage und zum grossen Herzen)"
 },
 {
  "id": "sportrasse-sinusbradykardie",
  "name": "Ruhebradykardie bei trainierten Rassen",
  "art": "hund",
  "bedingung": "Art = Hund UND Rasse Windhund ODER ausdauertrainierte Arbeits-/Schlittenhundrasse UND Ruhe-HF 40-60/min UND P-Welle vor jedem QRS UND PQ 60-130 ms UND RR-Schwankung > 10 %",
  "mess": [
   "hf",
   "rr",
   "rrschwankung",
   "p",
   "pq"
  ],
  "hinweis": "Sinusbradykardie mit Sinusarrhythmie. Bei trainierten Hunden wird das als Ausdruck eines hohen Vagotonus eingeordnet; im 24-h-EKG klinisch gesunder Hunde reicht das Referenzintervall der minimalen Herzfrequenz von 15 bis 42/min, niedrige Ruhefrequenzen sind also fuer sich genommen kein Krankheitszeichen. Ein Atropintest kann vagalen von intrinsischem Ursprung trennen.",
  "dd": "Sick-Sinus-Syndrom, Hypothyreose, Hyperkaliaemie, erhoehter Hirndruck, Medikamentenwirkung (Alpha-2-Agonisten, Betablocker, Opioide)",
  "sicher": "wahrscheinlich",
  "quelle": "Bavegems V et al., Res Vet Sci 2009; Vigeral M et al., Twenty-four hour ambulatory electrocardiography in healthy dogs: reference intervals and measurement variability. J Small Anim Pract 2026 (min./mittlere/max. HF 15-42, 50-93, 194-294/min)"
 },
 {
  "id": "dobermann-ves-ab-3-jahren",
  "name": "Ventrikulaere Extrasystole beim Dobermann ab 3 Jahren",
  "art": "hund",
  "bedingung": "Art = Hund UND Rasse Dobermann UND Alter >= 3 Jahre UND >= 1 vorzeitiger Komplex mit QRS-Dauer > 70 ms UND keine vorausgehende P-Welle",
  "mess": [
   "qrs",
   "p",
   "rr",
   "hf"
  ],
  "hinweis": "Beim Dobermann ab 3 Jahren ist jede ventrikulaere Extrasystole ein Anlass zur weiteren Abklaerung. Die ESVC-Screeningleitlinie setzt < 50 VES/24 h als normal an; >= 300 VES/24 h oder zweimal 50-300 VES/24 h innerhalb eines Jahres gelten unabhaengig vom Echobefund als Beleg einer okkulten DCM. Ein Ruhestreifen kann diese Frage nicht beantworten - ein 24-h-Holter zusammen mit einer Echokardiografie (Simpson-Scheibchenmethode) waere der naheliegende naechste Schritt.",
  "dd": "Elektrolytstoerung, Milz-/Magenerkrankung, Trauma, Sepsis, Schmerz, Medikamente; beim aelteren Dobermann auch nicht-kardiale Ursachen",
  "sicher": "gesichert",
  "quelle": "Wess G et al., European Society of Veterinary Cardiology screening guidelines for dilated cardiomyopathy in Doberman Pinschers. J Vet Cardiol 2017;19:405-415, PMID 28965673"
 },
 {
  "id": "boxer-bulldogge-ves-rv-morphologie",
  "name": "Rechtsventrikulaer konfigurierte Extrasystolen bei Boxer und Bulldogge",
  "art": "hund",
  "bedingung": "Art = Hund UND Rasse in {Boxer, Englische Bulldogge, Franzoesische Bulldogge} UND Alter >= 1 Jahr UND vorzeitige Komplexe mit QRS-Dauer > 70 ms UND aufrecht (positiv) in Abl. II, III und aVF UND keine vorausgehende P-Welle",
  "mess": [
   "qrs",
   "p",
   "rr",
   "achse"
  ],
  "hinweis": "Die Morphologie passt zu einem rechtsventrikulaeren Ursprung (linksschenkelblockartig). In diesen Rassen ist die arrhythmogene rechtsventrikulaere Kardiomyopathie die haeufigste Ursache solcher Extrasystolen; etwa ein Drittel der betroffenen Boxer zeigt Synkopen, die systolische Funktion ist haeufig normal. Als Bewertungsschwelle wird >= 300 VES/24 h im Holter verwendet. Die Tag-zu-Tag-Schwankung der Arrhythmielast ist hoch - ein unauffaelliger Kurzstreifen schliesst nichts aus.",
  "dd": "gastrointestinale/splenische Erkrankung, Elektrolytstoerung, DCM-Form des Boxers, Neoplasie (Haemangiosarkom), Myokarditis",
  "sicher": "wahrscheinlich",
  "quelle": "Motsküla PF et al., Prognostic value of 24-hour ambulatory ECG (Holter) monitoring in Boxer dogs. JVIM 2013;27:904-912; ARCH/ACVIM-Forum-Kriterium 2009 (>= 300 VES/24 h); Santilli R et al., ARVC in Bulldogs: 71 dogs (2004-2016). J Vet Cardiol 2021"
 },
 {
  "id": "schaeferhund-jung-ventrikulaere-arrhythmie",
  "name": "Ventrikulaere Arrhythmie beim jungen Deutschen Schaeferhund",
  "art": "hund",
  "bedingung": "Art = Hund UND Rasse Deutscher Schaeferhund UND Alter 3-18 Monate UND vorzeitige Komplexe mit QRS-Dauer > 70 ms ODER >= 3 aufeinanderfolgende weite Komplexe mit HF > 180/min",
  "mess": [
   "qrs",
   "hf",
   "rr",
   "p"
  ],
  "hinweis": "In dieser Rasse ist eine erbliche ventrikulaere Arrhythmie mit Risiko fuer ploetzlichen Herztod beschrieben. Das Zeitfenster liegt zwischen etwa 3 und 18 Lebensmonaten mit Haeufigkeitsgipfel um 22-26 Lebenswochen; die Ereignisse treten bevorzugt in Ruhe, im Schlaf und in der Erholungsphase nach Belastung auf. Bei Tieren, die das 2. Lebensjahr erreichen, bildet sich die Arrhythmie meist ohne Therapie zurueck. Ein Ruhe-EKG bildet die Last nicht ab - ein 24-h-Holter waere der naechste Schritt.",
  "dd": "Myokarditis (viral, Parvovirose), Trauma, angeborener Herzfehler mit Ausflusstraktobstruktion, Elektrolytstoerung",
  "sicher": "gesichert",
  "quelle": "Moise NS et al., Inherited ventricular arrhythmias and sudden death in German shepherd dogs. J Am Coll Cardiol 1994;24:233-243, PMID 8006271; Cruickshank J et al., Genetic analysis of ventricular arrhythmia in young German Shepherd Dogs. JVIM 2009, PMID 192103"
 },
 {
  "id": "riesenrasse-vorhofflimmern",
  "name": "Vorhofflimmern bei Riesenrassen - auch ohne Vorhofvergroesserung moeglich",
  "art": "hund",
  "bedingung": "Art = Hund UND KM > 40 kg (z. B. Deutsche Dogge, Irish Wolfhound, Neufundlaender, Mastiff, Dogue de Bordeaux) UND keine erkennbaren P-Wellen UND RR-Abstaende voellig unregelmaessig ohne Periodik (RR-Schwankung > 15 %) UND HF 120-250/min UND QRS-Dauer <= 70 ms",
  "mess": [
   "p",
   "rr",
   "rrschwankung",
   "hf",
   "qrs"
  ],
  "hinweis": "Das Bild passt zu Vorhofflimmern. Bei Riesenrassen kommt es auch bei normal grossen Vorhoefen vor ('lone AF'), weil hohe Koerpermasse und der beim Hund physiologisch hohe Vagotonus allein ausreichen koennen. Koerpermasse und linksatrialer Durchmesser sind in Studien die staerksten Risikofaktoren (linksatrialer Durchmesser > 4.66 cm mit hoher Trennschaerfe). Beim Irish Wolfhound liegt die Praevalenz bei 8.9-12 %, bei Tieren ab 8 Jahren bei etwa 28 %; Wolfshunde mit Vorhofflimmern entwickeln 3.7-fach haeufiger eine DCM.",
  "dd": "Vorhofflattern mit wechselnder Ueberleitung, hochfrequente supraventrikulaere Extrasystolie, ausgepraegte Sinusarrhythmie mit Sinusarrest (dort bleiben P-Wellen erkennbar)",
  "sicher": "wahrscheinlich",
  "quelle": "Guglielmini C et al., Influence of left atrial enlargement and body weight on the development of atrial fibrillation: 205 dogs. J Vet Cardiol 2000, PMID 11061960; Tyrrell WD et al., Echocardiographic and electrocardiographic evaluation of North American Irish "
 },
 {
  "id": "riesenrasse-p-dauer-toleranz",
  "name": "P-Dauer bei Riesenrassen - hoehere Obergrenze",
  "art": "hund",
  "bedingung": "Art = Hund UND KM > 40 kg UND P-Dauer 41-50 ms UND P-Amplitude <= 0.4 mV",
  "mess": [
   "p"
  ],
  "hinweis": "Bei Riesenrassen wird eine P-Dauer bis 50 ms noch als normal angesehen, waehrend fuer den uebrigen Hund 40 ms die Obergrenze ist. Ein Hinweis auf linksatriale Vergroesserung ('P mitrale') sollte hier deshalb erst oberhalb von 50 ms erscheinen.",
  "dd": "beginnende linksatriale Vergroesserung, interatriale Leitungsverzoegerung",
  "sicher": "wahrscheinlich",
  "quelle": "Tilley LP, Essentials of Canine and Feline Electrocardiography, 3. Aufl."
 },
 {
  "id": "kleinrasse-mmvd-p-mitrale",
  "name": "Verbreiterte P-Welle bei praedisponierten kleinen Rassen",
  "art": "hund",
  "bedingung": "Art = Hund UND Rasse in {Cavalier King Charles Spaniel, Dackel, Chihuahua, Zwergpudel, Toypudel, Malteser, Yorkshire Terrier, Zwergschnauzer} UND Alter >= 5 Jahre UND P-Dauer > 40 ms in Abl. II",
  "mess": [
   "p",
   "hf",
   "rr"
  ],
  "hinweis": "Eine verbreiterte P-Welle ist mit linksatrialer Vergroesserung vereinbar und in diesen Rassen am ehesten Folge einer myxomatoesen Mitralklappenerkrankung. Zur Vortestwahrscheinlichkeit: beim Cavalier King Charles Spaniel sind etwa 50 % mit 6-7 Jahren und nahezu alle Tiere mit 11 Jahren betroffen, beim Dackel etwa 50 % mit 10 Jahren, beim Chihuahua 50 % ab 6.4 Jahren mit 80 % in der Altersgruppe 9-10 Jahre; beim Zwergpudel liegt das mittlere Erkrankungsalter dagegen erst bei etwa 11 Jahren. Das EKG ist fuer Vorhofvergroesserungen wenig sensitiv - eine unauffaellige P-Welle schliesst nichts aus.",
  "dd": "interatriale Leitungsverzoegerung ohne Vergroesserung, Riesenrassennorm (siehe eigene Regel), Messfehler bei niedriger Signalguete",
  "sicher": "Verdacht",
  "quelle": "Keene BW et al., ACVIM consensus guidelines for the diagnosis and treatment of myxomatous mitral valve disease in dogs. JVIM 2019;33:1127-1140; Chihuahua-Praevalenzstudie J Vet Cardiol 2025; Dachshund-Kohorte Pol J Vet Sci (PMC3723884); Miniature-Poodle-Studie"
 },
 {
  "id": "kleinrasse-verlust-sinusarrhythmie",
  "name": "Fehlende Sinusarrhythmie bei hoher Frequenz",
  "art": "hund",
  "bedingung": "Art = Hund UND Alter >= 5 Jahre UND HF > 160/min UND RR-Schwankung < 10 % UND P-Welle vor jedem QRS UND PQ konstant",
  "mess": [
   "hf",
   "rr",
   "rrschwankung",
   "p",
   "pq"
  ],
  "hinweis": "Beim Hund ist die atemabhaengige Sinusarrhythmie der Normalfall. Ihr Wegfall bei gleichzeitig hoher Frequenz spricht fuer einen erhoehten Sympathikotonus. Bei praedisponierten kleinen Rassen mit Mitralklappenerkrankung begleitet das haeufig eine Dekompensation, ebenso kommen Schmerz, Aufregung, Fieber, Anaemie, Hyperthyreose und Hypovolaemie in Frage. Der Befund ist unspezifisch und gewinnt erst zusammen mit Klinik und Ruheatemfrequenz an Gewicht.",
  "dd": "Stress/Aufregung in der Praxis, Schmerz, Fieber, Anaemie, Hyperthyreose, Hypovolaemie, Sympathomimetika",
  "sicher": "Verdacht",
  "quelle": "Keene BW et al., ACVIM MMVD Consensus, JVIM 2019; Tilley LP, Essentials of Canine and Feline Electrocardiography"
 },
 {
  "id": "brachyzephal-sinusarrhythmie-wanderpacemaker",
  "name": "Ausgepraegte Sinusarrhythmie mit wanderndem Schrittmacher bei brachyzephalen Hunden",
  "art": "hund",
  "bedingung": "Art = Hund UND brachyzephale Rasse in {Franzoesische Bulldogge, Englische Bulldogge, Mops, Boston Terrier, Boxer, Shih Tzu, Pekingese, Cavalier King Charles Spaniel} UND HF 50-100/min UND RR-Schwankung > 15 % mit atemsynchroner Periodik UND P-Welle vor jedem QRS UND P-Amplitude schwankt um > 0.05 mV zwischen schnellen und langsamen Phasen",
  "mess": [
   "hf",
   "rr",
   "rrschwankung",
   "p"
  ],
  "hinweis": "Ausgepraegte Sinusarrhythmie mit wanderndem Schrittmacher. Bei brachyzephalen Hunden und bei Tieren mit Atemwegserkrankung ist der Vagotonus hoch; dieses Muster gilt dort als erwartbar und nicht krankhaft. Ein Frequenzanstieg bei Aufregung oder leichter Belastung stuetzt den vagalen Ursprung.",
  "dd": "Sick-Sinus-Syndrom (dort Pausen ohne Ersatzschlaege, Synkope), Hyperkaliaemie, erhoehter Hirndruck",
  "sicher": "gesichert",
  "quelle": "Merck Veterinary Manual, Heart Disease: Conduction Abnormalities in Dogs and Cats; Santilli R, Perego M, Bradyarrhythmias (Veterian Key); 24-h-Holter bei Franzoesischen Bulldoggen vor/nach Rhinoplastik, Vet Res Commun 2026"
 },
 {
  "id": "brachyzephal-av-block2-typ1",
  "name": "AV-Block II. Grades Typ Wenckebach bei hohem Vagotonus",
  "art": "hund",
  "bedingung": "Art = Hund UND (brachyzephale Rasse ODER bekannte Atemwegs-, Augen-, Magen-Darm- oder ZNS-Erkrankung) UND einzelne P-Wellen ohne folgendes QRS UND PQ nimmt vor dem Ausfall um > 10 ms zu UND HF < 100/min UND Ausfaelle nur in Ruhephasen",
  "mess": [
   "p",
   "pq",
   "rr",
   "hf"
  ],
  "hinweis": "AV-Block II. Grades vom Typ Mobitz I. Bei diesen Tieren ist er vagal vermittelt und ein erwartbarer Befund; erst- und zweitgradige Blockierungen dieses Typs gelten dann als unauffaellig. Zur Abgrenzung von einer intrinsischen AV-Knoten-Erkrankung eignen sich Frequenzanstieg unter Erregung/Belastung oder ein Atropintest (regelmaessige Sinustachykardie > 140/min ohne Blockierungen spricht fuer vagalen Ursprung).",
  "dd": "intrinsische AV-Knoten-Erkrankung (Typ Mobitz II, konstantes PQ), Hyperkaliaemie, Digoxin, Alpha-2-Agonisten, Opioide, Borreliose-Myokarditis",
  "sicher": "gesichert",
  "quelle": "Merck Veterinary Manual, Conduction Abnormalities in Dogs and Cats; IDEXX Telemedicine Consultants, Atropine response test protocol"
 },
 {
  "id": "hund-sinuspause-vagal",
  "name": "Sinusarrest / Sinusblock bei hohem Vagotonus",
  "art": "hund",
  "bedingung": "Art = Hund UND RR-Pause > 2x mittleres RR ODER Pause > 2.0 s UND P-Welle vor jedem sichtbaren QRS UND HF ausserhalb der Pause 50-120/min",
  "mess": [
   "rr",
   "hf",
   "p"
  ],
  "hinweis": "Sinusarrest bzw. Sinusblock. Bei brachyzephalen Hunden, bei Atemwegserkrankungen und generell bei hohem Vagotonus ist das ein haeufiger Befund ohne eigenen Krankheitswert; im 24-h-EKG gesunder Hunde liegt die minimale Herzfrequenz zwischen 15 und 42/min. Klinisch bedeutsam wird der Befund bei Synkope, Schwaeche oder wenn Ersatzschlaege ausbleiben.",
  "dd": "Sick-Sinus-Syndrom (praedisponiert: Zwergschnauzer, West Highland White Terrier, Cocker Spaniel, Dackel), Vorhofstillstand bei Hyperkaliaemie (dort keine P-Wellen), atriale Standstill bei Muskeldystrophie (Springer Spaniel)",
  "sicher": "wahrscheinlich",
  "quelle": "Vigeral M et al., J Small Anim Pract 2026 (Referenzintervall min. HF 15-42/min); Merck Veterinary Manual, Conduction Abnormalities"
 },
 {
  "id": "welpe-hohe-herzfrequenz",
  "name": "Hohe Herzfrequenz beim Welpen ist altersnormal",
  "art": "hund",
  "bedingung": "Art = Hund UND Alter < 6 Monate UND HF 160-220/min UND P-Welle vor jedem QRS UND QRS-Dauer <= 60 ms UND PQ 60-130 ms",
  "mess": [
   "hf",
   "p",
   "qrs",
   "pq"
  ],
  "hinweis": "Fuer Welpen altersnormal - beim erwachsenen Hund waere derselbe Wert eine Sinustachykardie. Referenz: Welpen bis etwa 220/min, erwachsene Hunde 70-160/min, Zwergrassen bis 180/min. Im 24-h-EKG klinisch gesunder Welpen (12-51 Lebenswochen) lagen die Mediane bei 51/min (Minimum), 99/min (Mittel) und 274/min (Maximum) - durchweg hoeher als beim erwachsenen Hund.",
  "dd": "Schmerz, Fieber, Dehydratation, Anaemie, Aufregung; bei > 250/min supraventrikulaere Tachykardie erwaegen",
  "sicher": "gesichert",
  "quelle": "Tilley LP, Essentials of Canine and Feline Electrocardiography; Establishing 24-hour Holter reference intervals for clinically healthy puppies. Res Vet Sci 2019, PMID 31325639 (44 Welpen)"
 },
 {
  "id": "welpe-vereinzelte-extrasystolen",
  "name": "Vereinzelte Extrasystolen und AV-Block II beim Welpen",
  "art": "hund",
  "bedingung": "Art = Hund UND Alter 3-12 Monate UND < 1 vorzeitiger Komplex pro Minute ODER einzelner AV-Block II. Grades UND Rasse nicht Deutscher Schaeferhund UND Rasse nicht Dobermann/Boxer/Bulldogge",
  "mess": [
   "qrs",
   "p",
   "pq",
   "rr"
  ],
  "hinweis": "Im 24-h-EKG klinisch gesunder Welpen fanden sich bei 9 % ventrikulaere und bei 13 % supraventrikulaere Extrasystolen (Median jeweils 0) sowie bei 5 % ein AV-Block II. Grades. Einzelne Ereignisse sind daher fuer sich genommen kein Krankheitsbeleg. Bei Rassen mit eigener Praedisposition (junger Deutscher Schaeferhund, Dobermann, Boxer, Bulldogge) gelten die dortigen Regeln vorrangig.",
  "dd": "Myokarditis (Parvovirose), angeborener Herzfehler, Elektrolytstoerung, Anaemie",
  "sicher": "gesichert",
  "quelle": "Establishing 24-hour Holter reference intervals for clinically healthy puppies. Res Vet Sci 2019, PMID 31325639"
 },
 {
  "id": "junghund-p-pulmonale-tvd",
  "name": "Erhoehte P-Amplitude beim jungen Hund praedisponierter Rassen",
  "art": "hund",
  "bedingung": "Art = Hund UND Alter < 2 Jahre UND P-Amplitude Abl. II > 0.4 mV UND Rasse in {Labrador Retriever, Deutscher Schaeferhund, Boxer, Deutsche Dogge, Neufundlaender, Old English Sheepdog, Mastiff, Irish Setter, Great Pyrenees}",
  "mess": [
   "p",
   "achse",
   "ramp"
  ],
  "hinweis": "Eine erhoehte P-Amplitude ('P pulmonale') ist mit rechtsatrialer Vergroesserung vereinbar. In diesem Alter und diesen Rassen kommen angeborene Ursachen in Frage - beim Labrador Retriever insbesondere die Trikuspidalklappendysplasie (in einem grossen Pedigree autosomal dominant), daneben Pulmonalstenose. Das EKG ist fuer Vorhofvergroesserungen wenig sensitiv; Auskultation und Echokardiografie klaeren die Frage.",
  "dd": "Pulmonalstenose, Trikuspidaldysplasie, pulmonale Hypertonie, Tachykardie-bedingt erhoehte P-Amplitude, Messfehler bei Grundlinienschwankung",
  "sicher": "Verdacht",
  "quelle": "Merck Veterinary Manual, Dysplasia and Stenosis of Atrioventricular Valves in Animals; NC State CVM / AKC CHF, Labrador Retriever Tricuspid Valve Dysplasia; Tilley LP (P-pulmonale-Kriterium > 0.4 mV)"
 },
 {
  "id": "junghund-sas-ventrikulaere-es",
  "name": "Ventrikulaere Extrasystolen beim jungen Hund mit SAS-Praedisposition",
  "art": "hund",
  "bedingung": "Art = Hund UND Alter < 3 Jahre UND Rasse in {Golden Retriever, Neufundlaender, Rottweiler, Bullmastiff, Boxer, Deutscher Schaeferhund, Dogue de Bordeaux} UND vorzeitige Komplexe mit QRS-Dauer > 70 ms UND keine vorausgehende P-Welle",
  "mess": [
   "qrs",
   "p",
   "rr",
   "hf"
  ],
  "hinweis": "In diesen Rassen ist die Subaortenstenose die haeufigste angeborene Herzerkrankung (fuer Golden Retriever, Neufundlaender und Rottweiler am besten belegt, Pedigree-Analysen sprechen fuer autosomal rezessive bzw. komplexe Vererbung). Ventrikulaere Extrasystolen bei jungen Tieren dieser Rassen sind mit subendokardialer Ischaemie bei Ausflusstraktobstruktion vereinbar - besonders wenn zusaetzlich ein basales Systolikum links besteht.",
  "dd": "Myokarditis, DCM-Fruehform, Elektrolytstoerung, Trauma, Aortenstenose valvulaerer Form",
  "sicher": "Verdacht",
  "quelle": "Genetics of canine subvalvular aortic stenosis (SAS). Canine Med Genet 2021 (PMC8103588); Golden Retriever Club of America, Heart Disease: Subvalvular Aortic Stenosis"
 },
 {
  "id": "cocker-dcm-hinweis",
  "name": "Niedervoltage, breites QRS oder Vorhofflimmern beim Cocker Spaniel",
  "art": "hund",
  "bedingung": "Art = Hund UND Rasse American Cocker Spaniel ODER English Cocker Spaniel UND ((R-Amplitude Abl. II < 0.8 mV UND QRS-Dauer > 65 ms) ODER (keine erkennbaren P-Wellen UND RR-Schwankung > 15 % ohne Periodik))",
  "mess": [
   "ramp",
   "qrs",
   "p",
   "rr",
   "rrschwankung"
  ],
  "hinweis": "Beim American Cocker Spaniel ist eine taurin- und carnitinresponsive Form der dilatativen Kardiomyopathie beschrieben; niedrige QRS-Amplituden, verbreitertes QRS und Vorhofflimmern sind mit DCM vereinbar. Eine Bestimmung von Taurin im Plasma und eine Echokardiografie waeren naheliegend, weil sich die Myokardfunktion in der MUST-Studie unter Supplementierung so weit besserte, dass die Herzmedikation abgesetzt werden konnte. Niedervoltage hat viele Ursachen und ist fuer sich allein kein DCM-Beleg.",
  "dd": "Perikard-/Pleuraerguss, Adipositas, Hypothyreose, Fehlkalibrierung des Geraets, dickes Fell/schlechter Elektrodenkontakt",
  "sicher": "Verdacht",
  "quelle": "Kittleson MD et al., Results of the Multicenter Spaniel Trial (MUST): taurine- and carnitine-responsive dilated cardiomyopathy in American Cocker Spaniels. JVIM 1997;11:204-211"
 },
 {
  "id": "altershund-niedrige-r-amplitude",
  "name": "Abnehmende R-Amplitude mit steigendem Alter",
  "art": "hund",
  "bedingung": "Art = Hund UND Alter > 8 Jahre UND R-Amplitude Abl. II 0.5-1.0 mV UND QRS-Dauer <= 60 ms UND uebrige Messwerte im Normbereich",
  "mess": [
   "ramp",
   "qrs",
   "alter"
  ],
  "hinweis": "In einer Untersuchung an Diensthunden nahm die R-Amplitude mit steigendem Alter signifikant ab. Eine niedrige Amplitude beim aelteren Tier ist daher nicht zwangslaeufig pathologisch. Bevor ein Hinweis auf Erguss oder Myokardschaden ausgegeben wird, sollten Kalibrierung, Elektrodenkontakt und Ernaehrungszustand geprueft werden.",
  "dd": "Perikarderguss, Pleuraerguss, Adipositas, Hypothyreose, Fehlkalibrierung",
  "sicher": "Verdacht",
  "quelle": "The effects of breed, age, sex, and body weight on electrocardiographic parameters in military working dogs (PMC7311871), 30 Hunde (16 Labrador Retriever, 14 Deutsche Schaeferhunde)"
 },
 {
  "id": "katze-normwerte-abl2",
  "name": "Katzen-Normbereich Ableitung II",
  "art": "katze",
  "bedingung": "Art = Katze UND HF 140-220/min UND P-Dauer <= 40 ms UND P-Amplitude <= 0.2 mV UND PQ 50-90 ms UND QRS-Dauer <= 40 ms UND R-Amplitude Abl. II 0.1-0.9 mV UND QT 120-180 ms UND elektrische Achse 0 bis +160 Grad",
  "mess": [
   "hf",
   "p",
   "pq",
   "qrs",
   "ramp",
   "qt",
   "achse"
  ],
  "hinweis": "Alle Messwerte liegen im publizierten Katzenbereich. Hunde-Grenzwerte duerfen hier nicht angelegt werden: die Komplexe sind deutlich kleiner, die Intervalle kuerzer, die Frequenz hoeher, und ein niedervoltiges QRS kommt auch bei gesunden Katzen vor. Der zulaessige Achsenbereich ist bei der Katze mit 0 bis +160 Grad viel weiter als beim Hund.",
  "dd": "bei Grenzwertueberschreitung zuerst Signalguete, Lagerung und Kalibrierung pruefen",
  "sicher": "gesichert",
  "quelle": "Tilley LP, Essentials of Canine and Feline Electrocardiography; Veterian Key, Electrocardiography in Cats"
 },
 {
  "id": "katze-stress-sinustachykardie",
  "name": "Hohe Herzfrequenz der Katze in der Praxis",
  "art": "katze",
  "bedingung": "Art = Katze UND HF 180-240/min UND P-Welle vor jedem QRS UND RR-Schwankung < 10 % UND QRS-Dauer <= 40 ms",
  "mess": [
   "hf",
   "rr",
   "rrschwankung",
   "p",
   "qrs",
   "signalguete"
  ],
  "hinweis": "In der Praxis gemessene Frequenzen liegen bei der Katze systematisch ueber den Werten zu Hause: im Mittel 132 +/- 19/min zu Hause, 150 +/- 23/min in der Klinik und 187 +/- 25/min unter manueller Fixierung. Eine Frequenz in diesem Bereich ist deshalb zuerst als Stressreaktion zu lesen; erst danach kommen Fieber, Schmerz, Anaemie, Hyperthyreose oder Herzinsuffizienz in Betracht. Bei > 240/min lohnt die Frage, ob die P-Welle noch von der vorhergehenden T-Welle abgrenzbar ist.",
  "dd": "supraventrikulaere Tachykardie, Hyperthyreose, Anaemie, Schmerz, Fieber, Hypovolaemie",
  "sicher": "gesichert",
  "quelle": "Abbott JA, Heart rate and heart rate variability of healthy cats in home and hospital environments. J Feline Med Surg 2005;7:195-202, PMID 15922226"
 },
 {
  "id": "katze-sinusarrhythmie-ungewoehnlich",
  "name": "Sinusarrhythmie bei der Katze in der Klinik",
  "art": "katze",
  "bedingung": "Art = Katze UND RR-Schwankung > 15 % mit atemsynchroner Periodik UND P-Welle vor jedem QRS UND HF < 160/min",
  "mess": [
   "rr",
   "rrschwankung",
   "hf",
   "p"
  ],
  "hinweis": "Anders als beim Hund ist eine deutliche Sinusarrhythmie bei der Katze in der Klinik ungewoehnlich, weil dort der Sympathikotonus dominiert; in der haeuslichen Umgebung ist sie dagegen haeufig. In der Praxis kann sie fuer einen erhoehten Vagotonus sprechen - etwa bei Atemwegs- oder Bauchraumerkrankung, unter Sedierung, oder schlicht bei einer sehr entspannten Katze.",
  "dd": "Sedierung (Alpha-2-Agonisten, Opioide), Atemwegserkrankung, erhoehter Hirndruck, Hyperkaliaemie",
  "sicher": "wahrscheinlich",
  "quelle": "Abbott JA, J Feline Med Surg 2005; Merck Veterinary Manual, Conduction Abnormalities in Dogs and Cats"
 },
 {
  "id": "katze-ekg-schliesst-hcm-nicht-aus",
  "name": "Unauffaelliges EKG schliesst eine Kardiomyopathie der Katze nicht aus",
  "art": "katze",
  "bedingung": "Art = Katze UND QRS-Dauer <= 40 ms UND R-Amplitude <= 0.9 mV UND QT <= 170 ms UND elektrische Achse 0 bis +160 Grad UND keine vorzeitigen Komplexe UND (Rasse mit HCM-Praedisposition ODER Herzgeraeusch/Galopprhythmus bekannt)",
  "mess": [
   "qrs",
   "ramp",
   "qt",
   "achse",
   "rr"
  ],
  "hinweis": "Ein unauffaelliges EKG schliesst eine Kardiomyopathie bei der Katze nicht aus. Die ACVIM-Konsensusleitlinie 2020 fuehrt das 6-Kanal-EKG ausdruecklich nicht als Screeningverfahren; in einer HCM-Kohorte war das EKG bei 42.6 % der Tiere voellig unauffaellig. Arrhythmien im EKG hatten fuer den Nachweis linksventrikulaerer Hypertrophie eine Sensitivitaet von nur 31 % bei einer Spezifitaet von 100 %. Zur Klaerung ist die Echokardiografie das geeignete Verfahren.",
  "dd": "entfaellt - die Regel ist eine Negativaussage zur Aussagekraft des Verfahrens",
  "sicher": "gesichert",
  "quelle": "Luis Fuentes V et al., ACVIM consensus statement guidelines for the classification, diagnosis, and management of cardiomyopathies in cats. JVIM 2020;34:1062-1077; The Unseen Side of Feline HCM: Diagnostic and Prognostic Utility of ECG and Holter Monitoring. An"
 },
 {
  "id": "katze-lafb-linksachse",
  "name": "Linksanteriorer Faszikelblock bei der Katze",
  "art": "katze",
  "bedingung": "Art = Katze UND elektrische Achse -30 bis -90 Grad UND QRS-Dauer <= 40 ms UND R in Abl. I und aVL hoch UND tiefe S-Zacken in Abl. II, III und aVF",
  "mess": [
   "achse",
   "qrs",
   "ramp"
  ],
  "hinweis": "Muster eines linksanterioren Faszikelblocks: deutliche Linksachsenabweichung bei normal breitem QRS. Bei der Katze ist er mit hypertropher Kardiomyopathie assoziiert; die Blockareale entsprechen duennen, hypokinetischen, fibrosierten Myokardabschnitten. Der Befund ist relativ spezifisch, aber nicht beweisend - Hyperthyreose und Hyperkaliaemie koennen ein aehnliches Bild erzeugen. Die Echokardiografie klaert.",
  "dd": "Hyperkaliaemie, Hyperthyreose, kongenitaler Herzfehler, andere Kardiomyopathieformen (RCM, ACM), Messartefakt durch fehlerhafte Elektrodenzuordnung",
  "sicher": "wahrscheinlich",
  "quelle": "Santilli R et al., Interpretation of the Electrocardiogram in Small Animals, Kap. Fascicular Blocks, Wiley 2018; Conduction block and thin/hypokinetic myocardial segments in feline HCM (PMC12456267, 2025)"
 },
 {
  "id": "katze-qt-verlaengert",
  "name": "Verlaengerte QT-Zeit bei der Katze",
  "art": "katze",
  "bedingung": "Art = Katze UND QT > 170 ms bei HF 140-220/min (bzw. frequenzkorrigiert QTc > 188 ms, Korrekturformel dokumentiert)",
  "mess": [
   "qt",
   "hf",
   "rr"
  ],
  "hinweis": "In einer Untersuchung zur linksventrikulaeren Hypertrophie bei der Katze war QT > 170 ms mit einer Sensitivitaet von 48.3 % und einer Spezifitaet von 91 % verbunden, QTc > 188 ms mit 62 % bzw. 77 %. Als alleiniges Screening reicht das nicht, als Zusatzbeobachtung neben Klinik und Echokardiografie ist es brauchbar. Hypokalzaemie, Hypokaliaemie, Hypothermie und QT-verlaengernde Medikamente kommen ebenso in Frage. Der QTc-Wert ist nur verwertbar, wenn die verwendete Korrekturformel mit angegeben wird.",
  "dd": "Hypokalzaemie, Hypokaliaemie, Hypothermie, Sedativa/Anaesthetika (Alpha-2-Agonisten, Methadon, Isofluran), Messfehler bei flacher T-Welle",
  "sicher": "wahrscheinlich",
  "quelle": "Diagnostic and prognostic utility of surface electrocardiography in cats with left ventricular hypertrophy. J Vet Cardiol 2017 (Grenzwerte QT > 170 ms, QTc > 188 ms)"
 },
 {
  "id": "katze-r-amplitude-kein-screening",
  "name": "R-Amplitude taugt bei der Katze nicht als HCM-Screening",
  "art": "katze",
  "bedingung": "Art = Katze UND R-Amplitude Abl. II > 0.26 mV UND alle uebrigen Messwerte im Normbereich",
  "mess": [
   "ramp"
  ],
  "hinweis": "Als alleiniges Screening auf eine subklinische hypertrophe Kardiomyopathie erreichte ein Grenzwert von R > 0.26 mV nur 65 % Sensitivitaet bei 62 % Spezifitaet - das trennt gesunde und erkrankte Katzen praktisch nicht. Aus diesem Wert sollte deshalb kein Hypertrophiehinweis abgeleitet werden. Erst oberhalb von 0.9 mV liegt die R-Amplitude ausserhalb des publizierten Normbereichs der Katze.",
  "dd": "entfaellt - Negativaussage zur Aussagekraft des Messwerts",
  "sicher": "gesichert",
  "quelle": "Accuracy of 6-lead electrocardiography in identifying subclinical hypertrophic cardiomyopathy in cats. JVIM 2026 (aalaf009)"
 },
 {
  "id": "katzenrasse-hcm-vortestwahrscheinlichkeit",
  "name": "Rassebedingt erhoehte HCM-Vortestwahrscheinlichkeit bei der Katze",
  "art": "katze",
  "bedingung": "Art = Katze UND Rasse in {Maine Coon, Ragdoll, Sphynx, Britisch Kurzhaar, Perser, Bengal, Norwegische Waldkatze, Sibirische Katze, Cornish Rex, Devon Rex, Chartreux, American Shorthair} UND Alter >= 1 Jahr",
  "mess": [
   "hf",
   "qrs",
   "ramp",
   "qt",
   "achse",
   "rr"
  ],
  "hinweis": "Erhoehte Vortestwahrscheinlichkeit fuer eine hypertrophe Kardiomyopathie: in der Mischlingspopulation liegt die Praevalenz bei etwa 16 %, beim Maine Coon bei etwa 26 %, und in einer neuseelaendischen Sphynx-Kohorte bei 40 % bei einem Medianalter von 5.8 Jahren. Etablierte Gentests gibt es nur fuer Maine Coon (MYBPC3 A31P) und Ragdoll (MYBPC3 R820W/R818W); fuer die uebrigen Rassen ist die kausale Variante nicht identifiziert. Das EKG kann die Frage nicht beantworten und dient hier allein der Rhythmusbeurteilung - die Echokardiografie ist das Screeningverfahren.",
  "dd": "sekundaere Hypertrophie bei Hyperthyreose oder systemischer Hypertonie, Akromegalie",
  "sicher": "gesichert",
  "quelle": "Luis Fuentes V et al., ACVIM consensus statement on feline cardiomyopathies. JVIM 2020;34:1062-1077; Prevalence of HCM and ALMS1 variant in Sphynx cats in New Zealand (PMC11428990, 2024); Chetboul V et al., Prospective echocardiographic and tissue Doppler scre"
 },
 {
  "id": "katzenwelpe-achsenwanderung",
  "name": "Rechtsachse beim neugeborenen Katzenwelpen ist altersnormal",
  "art": "katze",
  "bedingung": "Art = Katze UND Alter <= 30 Tage UND elektrische Achse ausserhalb 0 bis +160 Grad, insbesondere -150 bis +180 Grad in der 1. Lebenswoche bzw. +180 bis +120 Grad um den 30. Lebenstag UND HF 190-250/min",
  "mess": [
   "achse",
   "hf",
   "ramp",
   "p",
   "pq",
   "qrs",
   "qt"
  ],
  "hinweis": "Bei neugeborenen Katzen liegt die elektrische Achse zunaechst stark rechts (-150 bis +180 Grad) und wandert bis zum 30. Lebenstag nach links (+180 bis +120 Grad); parallel nimmt die R-Zacke zu und die S-Zacke ab, als Ausdruck der zunehmenden linksventrikulaeren Dominanz. Herzfrequenz 190-250/min, waehrend P-Welle, PQ, QRS-Dauer und QT bereits den Erwachsenenwerten entsprechen. Eine 'Rechtsachse' ist in diesem Alter also kein Hinweis auf eine Rechtsherzbelastung.",
  "dd": "ab dem 2. Lebensmonat: persistierender kongenitaler Rechtsherzfehler (Pulmonalstenose, Trikuspidaldysplasie, Fallot)",
  "sicher": "gesichert",
  "quelle": "Electrocardiographic evolution in cats from birth to 30 days of age (PMC385450)"
 },
 {
  "id": "pferd-av-block2-physiologisch",
  "name": "AV-Block II. Grades beim Pferd - physiologisch",
  "art": "pferd",
  "bedingung": "Art = Pferd UND Ruhe-HF 24-45/min UND einzelne P-Wellen ohne folgendes QRS UND PQ 210-380 ms mit Zunahme vor dem Ausfall UND Ausfaelle vereinzelt und nur in Ruhe",
  "mess": [
   "hf",
   "p",
   "pq",
   "rr"
  ],
  "hinweis": "Der AV-Block II. Grades ist die haeufigste physiologische Arrhythmie des Pferdes: etwa 15 % der Tiere zeigen ihn im Ruhe-EKG, bis zu 44 % im 24-h-EKG. Er verschwindet typischerweise bei leichter Belastung oder Aufregung. Bleibt er unter Belastung bestehen, treten mehrere Ausfaelle hintereinander auf oder liegt die Frequenz auffallend niedrig, verliert die Einordnung 'physiologisch' ihre Grundlage.",
  "dd": "hochgradiger AV-Block, Elektrolytstoerung (Hyperkaliaemie), Digoxin/Alpha-2-Agonisten, Endokarditis/Myokarditis",
  "sicher": "gesichert",
  "quelle": "Marr CM, Bowen IM, Cardiology of the Horse; Electrocardiographic reference values in clinically healthy Lusitano horses. Animals 2023 (PMC10459813); dvm360, A guide to differential diagnosis of arrhythmias in horses"
 },
 {
  "id": "pferd-normwerte-abl2",
  "name": "Pferde-Normbereich Ableitung II",
  "art": "pferd",
  "bedingung": "Art = Pferd UND Ruhe-HF 26-50/min UND P-Dauer 60-150 ms UND PQ 210-380 ms UND QRS-Dauer 40-160 ms UND QT 410-630 ms UND R-Amplitude Abl. II 0.08-1.43 mV",
  "mess": [
   "hf",
   "p",
   "pq",
   "qrs",
   "qt",
   "ramp"
  ],
  "hinweis": "Die Werte liegen im Bereich klinisch gesunder Pferde (Referenzintervalle an 82 Lusitanos, Median-Herzfrequenz 39/min, Interquartilsabstand 12). Die P-Welle ist bei etwa 63 % der Tiere in Abl. II zweigipflig - das ist normal und darf nicht als 'P mitrale' gemeldet werden. Die QRS-Konfiguration variiert stark (QR und R in Abl. II, RS in der Basis-Apex-Ableitung). Kleintier-Grenzwerte fuer P-Dauer, PQ, QRS und QT sind hier ohne Aussagekraft.",
  "dd": "bei Ueberschreitung: Vorhofvergroesserung, Leitungsstoerung, Elektrolytstoerung - beim Pferd erst nach Abgleich mit den arteigenen Intervallen zu erwaegen",
  "sicher": "gesichert",
  "quelle": "Electrocardiographic Reference Values in Clinically Healthy Lusitano Horses. Animals 2023 (PMC10459813), 82 Pferde, Abl. II und Basis-Apex"
 },
 {
  "id": "pferd-vorhofflimmern-2",
  "name": "Vorhofflimmern beim Pferd",
  "art": "pferd",
  "bedingung": "Art = Pferd UND keine erkennbaren P-Wellen, stattdessen unregelmaessige f-Wellen UND RR voellig unregelmaessig ohne Periodik (RR-Schwankung > 20 %) UND QRS-Dauer 40-160 ms",
  "mess": [
   "p",
   "rr",
   "rrschwankung",
   "hf",
   "qrs"
  ],
  "hinweis": "Das Bild passt zu Vorhofflimmern - beim Pferd die klinisch wichtigste leistungsmindernde Arrhythmie, die bei grossrahmigen Sportpferden auch ohne strukturelle Herzerkrankung auftreten kann. Abzugrenzen ist der beim Pferd sehr haeufige AV-Block II. Grades: dort bleiben die P-Wellen regelmaessig sichtbar und die Pause entspricht einem Vielfachen des RR-Abstands. Eine Ruhefrequenz ueber 60/min bei Vorhofflimmern spricht fuer eine zugrunde liegende Herzerkrankung.",
  "dd": "AV-Block II. Grades, Vorhofflattern, multiple supraventrikulaere Extrasystolen, ausgepraegte Sinusarrhythmie",
  "sicher": "wahrscheinlich",
  "quelle": "Marr CM, Bowen IM, Cardiology of the Horse; dvm360, A guide to differential diagnosis of arrhythmias in horses; Reef VB, Equine Cardiology"
 },
 {
  "id": "kaninchen-normwerte",
  "name": "Kaninchen-Referenzintervalle (wach)",
  "art": "heimtier",
  "bedingung": "Art = Kaninchen UND HF 198-330/min UND P-Dauer 10-50 ms UND P-Amplitude 0.04-0.12 mV UND PQ 40-80 ms UND QRS-Dauer 20-60 ms UND R-Amplitude 0.03-0.39 mV UND QT 80-160 ms UND elektrische Achse -43 bis +80 Grad",
  "mess": [
   "hf",
   "p",
   "pq",
   "qrs",
   "ramp",
   "qt",
   "achse"
  ],
  "hinweis": "Fuer das Hauskaninchen liegen belastbare Referenzintervalle vor, erhoben an 46 gesunden, wachen Tieren; das Verfahren wurde gut toleriert. Rasse und Koerpermasse hatten keinen wesentlichen Einfluss - Ausnahme: die R-Amplitude haengt quadratisch von der Koerpermasse ab. Hunde- oder Katzengrenzwerte sind hier nicht anwendbar, insbesondere nicht der Achsenbereich, der beim Kaninchen bis in den negativen Bereich reicht.",
  "dd": "bei Ueberschreitung: Kardiomyopathie, Stress-/Katecholamin-bedingte Tachykardie, Elektrolytstoerung; Signalguete bei zappelnden Tieren pruefen",
  "sicher": "gesichert",
  "quelle": "Lord B, Boswood A, Petrie A. Electrocardiography of the normal domestic pet rabbit. Vet Rec 2010;167:961-965, PMID 21262711"
 },
 {
  "id": "meerschweinchen-normwerte",
  "name": "Meerschweinchen-Orientierungswerte (wach)",
  "art": "heimtier",
  "bedingung": "Art = Meerschweinchen UND HF 190-240/min UND PQ 60-75 ms UND QRS-Dauer 25-35 ms UND QT 145-170 ms",
  "mess": [
   "hf",
   "pq",
   "qrs",
   "qt",
   "rr"
  ],
  "hinweis": "Werte aus wachen Meerschweinchen (Mittelwerte: HF 213 +/- 16/min, PQ 68 +/- 6 ms, QRS 30 +/- 5 ms, QT 157 +/- 10 ms). Fuer die Frequenzkorrektur der QT-Zeit erwies sich unter den geprueften Formeln die Van-de-Water-Korrektur als die stabilste (QTcV 185.7-195.2 ms, 95-%-Konfidenzintervall); die Beziehung QT = 44.7 x ln(RR) - 132.9 wurde beschrieben. Die Datenbasis ist deutlich schmaler als bei Hund und Katze, Amplitudengrenzwerte sind nicht belastbar publiziert.",
  "dd": "Stress-Tachykardie bei Fixation; Amplitudenbeurteilung: unbelegt",
  "sicher": "wahrscheinlich",
  "quelle": "Computerized electrocardiography in healthy conscious guinea pigs (Cavia porcellus). Pesq Vet Bras (SciELO); ECG telemetry in conscious guinea pigs. J Pharmacol Toxicol Methods 2016"
 },
 {
  "id": "frettchen-normwerte",
  "name": "Frettchen-Orientierungswerte - lagerungs- und sedierungsabhaengig",
  "art": "heimtier",
  "bedingung": "Art = Frettchen UND HF 200-400/min UND elektrische Achse +70 bis +100 Grad",
  "mess": [
   "hf",
   "achse",
   "p",
   "ramp"
  ],
  "hinweis": "Fuer das Frettchen werden eine Herzfrequenz um 300/min und eine mittlere elektrische Achse von +86 +/- 6.6 Grad angegeben; juengere Tiere liegen deutlich hoeher. Zu beachten: die publizierten Referenzwerte wurden unter Ketamin/Diazepam-Sedierung und in definierter Lagerung erhoben, und zwischen den Lagerungsarten unterschieden sich Achse sowie P-, R- und Q/S-Amplituden signifikant. Werte aus abweichender Lagerung oder von wachen Tieren sind daher nicht direkt vergleichbar. Bei Frettchen sind dilatative Kardiomyopathie und Klappenerkrankungen haeufig; erhoehte Gesamtvoltage wurde bei rechtsventrikulaerer Hypertrophie beschrieben.",
  "dd": "Hinterhandschwaeche als Leitsymptom kardialer Erkrankung beim Frettchen; Sedierungseffekt",
  "sicher": "wahrscheinlich",
  "quelle": "Bublot I, Randolph RW, Chalvet-Monfray K, Metzger N. The surface electrocardiogram in domestic ferrets. J Vet Cardiol 2006;8:87-93, PMID 19083342; Smith SH, Bishop SP. The electrocardiogram of normal ferrets and ferrets with right ventricular hypertrophy. Lab "
 },
 {
  "id": "chinchilla-orientierungswerte",
  "name": "Chinchilla-Orientierungswerte (wach, keine validierten Referenzintervalle)",
  "art": "heimtier",
  "bedingung": "Art = Chinchilla UND HF 170-240/min UND P-Dauer 17-33 ms UND P-Amplitude 0.02-0.05 mV UND PQ 40-80 ms UND QRS-Dauer 39-49 ms UND R-Amplitude 0.03-0.22 mV UND QT etwa 100 ms",
  "mess": [
   "hf",
   "p",
   "pq",
   "qrs",
   "ramp",
   "qt",
   "achse"
  ],
  "hinweis": "Orientierungswerte aus 45 wachen Chinchillas in vertikaler Haltung ohne chemische Fixation (HF 205 +/- 18/min, P 0.035 +/- 0.019 mV / 25 +/- 8 ms, PQ 60 +/- 20 ms, QRS 44 +/- 5 ms, R 0.126 +/- 0.098 mV, QT 0.100 s). Die elektrische Achse streute extrem (69 +/- 62 Grad) und ist damit nicht verwertbar; Abl. I und aVR waren besser ablesbar als Abl. II. Die Autoren bezeichnen die Zahlen ausdruecklich als Anhaltspunkte, nicht als validierte Referenzintervalle.",
  "dd": "Achsenbestimmung beim Chinchilla: unbelegt",
  "sicher": "Verdacht",
  "quelle": "Lead II Electrocardiographic Measurements Recorded in Chinchilla lanigera. WSAVA 2017 Congress (VIN), 45 Tiere"
 },
 {
  "id": "vogel-normwerte",
  "name": "Vogel - eigene Physiologie, Saeugerkriterien nicht anwendbar",
  "art": "heimtier",
  "bedingung": "Art = Vogel (Papagei, Sittich, Taube, Greifvogel) UND HF 200-600/min UND elektrische Achse negativ (etwa -80 bis -100 Grad)",
  "mess": [
   "hf",
   "achse",
   "qrs",
   "p",
   "st",
   "rr",
   "rrschwankung"
  ],
  "hinweis": "Bei Aras und Kakadus wurden Herzfrequenzen von 231-571/min gemessen; die mittlere elektrische Achse ist beim Vogel negativ (beim Hund positiv), das QRS in Abl. II, III und aVF meist RS-konfiguriert, die P-Welle in allen Ableitungen ueberwiegend positiv. Eine Sinusarrhythmie fand sich bei 32 % der Aras und 23 % der Kakadus. ST-Hebungen und -Verschleifungen kommen physiologisch vor. Achsen-, ST- und Amplitudenkriterien aus der Saeugermedizin duerfen hier nicht angewandt werden.",
  "dd": "artspezifische Unterschiede zwischen Psittaziden, Tauben und Greifvoegeln - Werte einer Art nicht auf andere uebertragen",
  "sicher": "wahrscheinlich",
  "quelle": "Electrocardiographic reference values for macaws (Ara spp.) and cockatoos (Cacatua spp.); The normal electrocardiogram of four species of conscious raptors. Res Vet Sci 2007, PMID 17451765; Lumeij JT, Ritchie BW, Electrocardiography in psittacine birds and fer"
 },
 {
  "id": "reptil-keine-referenzwerte",
  "name": "Reptil - keine belastbaren EKG-Referenzintervalle",
  "art": "heimtier",
  "bedingung": "Art = Reptil (Schildkroete, Schlange, Echse) UND beliebige Messwerte",
  "mess": [
   "hf",
   "rr",
   "qrs",
   "p",
   "qt"
  ],
  "hinweis": "Fuer Reptilien liegen keine belastbaren artspezifischen EKG-Referenzintervalle vor. Die Herzfrequenz haengt unmittelbar von der Koerper- bzw. Umgebungstemperatur ab (Bradykardie bei Abkuehlung, Tachykardie bei Erwaermung), die Untersuchung sollte innerhalb der artspezifischen Vorzugstemperatur erfolgen. Das Reptilien-EKG zeigt zusaetzlich eine SV-Welle aus dem Sinus venosus, die Amplituden sind sehr klein und P- sowie T-Wellen oft nicht abgrenzbar. Eine automatische Befundbewertung nach Saeugerkriterien waere hier nicht begruendbar; sinnvoll ist die Dokumentation von Frequenz und Rhythmus zusammen mit der Koerpertemperatur.",
  "dd": "unbelegt",
  "sicher": "gesichert",
  "quelle": "Mitchell MA, Reptile Cardiology: A Review of Anatomy and Physiology, Diagnostics (Univ. of Illinois); LafeberVet, Electrocardiography in Exotic Animal Species. Praezise Referenzintervalle: unbelegt"
 },
 {
  "id": "nager-keine-klinischen-referenzwerte",
  "name": "Ratte, Maus, Hamster, Degu - keine klinischen Referenzintervalle",
  "art": "heimtier",
  "bedingung": "Art in {Ratte, Maus, Hamster, Degu, Rennmaus} UND beliebige Messwerte",
  "mess": [
   "hf",
   "pq",
   "qrs",
   "qt",
   "ramp"
  ],
  "hinweis": "Fuer diese Arten gibt es keine klinisch validierten EKG-Referenzintervalle aus wachen Heimtieren. Die verfuegbaren Zahlen stammen aus der Sicherheitspharmakologie an narkotisierten oder telemetrierten Labortieren - z. B. Ratte unter Pentobarbital: QRS 15-30 ms, PQ 25-60 ms - und sind auf das Praxistier nicht uebertragbar. Belastbar sind allein die Frequenzspannen (Ratte etwa 250-400/min, Hamster und Degu deutlich hoeher). Fuer diese Arten sollte die Anwendung nur Frequenz und Rhythmus dokumentieren und keine Amplituden- oder Intervallbewertung ausgeben.",
  "dd": "unbelegt",
  "sicher": "gesichert",
  "quelle": "Sicherheitspharmakologische Nagerdaten (narkotisiert/telemetriert); klinische Referenzintervalle fuer Heimtier-Nager: unbelegt"
 },
 {
  "id": "alpha2-sedierung-bradykardie-avblock",
  "name": "Bradykardie und AV-Blockierungen unter Alpha-2-Agonisten",
  "art": "beide",
  "bedingung": "Medetomidin, Dexmedetomidin, Romifidin oder Xylazin innerhalb der letzten 60 Minuten gegeben UND (HF < 60/min beim Hund bzw. < 100/min bei der Katze) UND (PQ > 130 ms beim Hund bzw. > 90 ms bei der Katze ODER P-Wellen ohne folgendes QRS ODER RR-Pause > 2.0 s)",
  "mess": [
   "hf",
   "pq",
   "p",
   "rr",
   "rrschwankung",
   "qt"
  ],
  "hinweis": "Erwartete Wirkung von Alpha-2-Agonisten und nicht als eigenstaendiger Befund zu werten. Beim Hund traten 5 Minuten nach Dexmedetomidin bei 5 von 6 Tieren AV-Blockierungen auf, Bradykardie in bis zu 80 % der Faelle; im Holter wurden Minimalfrequenzen bis 29/min beschrieben. Bei der Katze zeigten 18 % Frequenzen von 70/min oder darunter, dazu AV-Dissoziation, Ersatzrhythmen, Sinusarrhythmie, verlaengerte QT-Zeit, Sinuspausen und einzelne Extrasystolen. Die Veraenderungen bilden sich mit Abklingen der Sedierung bzw. nach Antagonisierung zurueck. Eine Rhythmusbeurteilung unter Alpha-2 traegt keine Aussage ueber den Wachzustand.",
  "dd": "vorbestehende AV-Knoten-Erkrankung, Hyperkaliaemie, gleichzeitige Opioid- oder Digoxingabe",
  "sicher": "gesichert",
  "quelle": "Zoetis Dexdomitor Fachinformation / EMA-SPC (Bradykardie, AV-Block I. und II. Grades, Sinusarrest); Clinician's Brief, Treatment of Dexmedetomidine-Induced Bradycardia in Dogs; 24-hour Holter-monitoring in the perianaesthetic period in dogs premedicated with d"
 },
 {
  "id": "opioid-pq-qt-verlaengerung",
  "name": "PQ- und QT-Verlaengerung unter Opioiden",
  "art": "beide",
  "bedingung": "Methadon, Hydromorphon, Morphin, Fentanyl oder Butorphanol innerhalb der letzten 60 Minuten gegeben UND HF gegenueber Ausgangswert gesunken UND PQ verlaengert UND QT verlaengert UND ausgepraegte atemsynchrone RR-Schwankung > 15 %",
  "mess": [
   "hf",
   "pq",
   "qt",
   "rr",
   "rrschwankung"
  ],
  "hinweis": "Unter Methadon und Hydromorphon sind beim Hund Frequenzabfall sowie Verlaengerung von PQ und QT beschrieben, verstaerkt in Kombination mit Inhalationsanaesthesie; die groesste QT-Verlaengerung trat unter Methadon plus Sevofluran auf. Als Rhythmusaenderung traten nur Bradykardie und respiratorische Sinusarrhythmie auf. Die Messwerte sind damit nicht mit Wachreferenzwerten vergleichbar.",
  "dd": "gleichzeitige Alpha-2- oder Anticholinergikagabe, Hypothermie, Elektrolytstoerung",
  "sicher": "gesichert",
  "quelle": "Effect of Methadone or Hydromorphone on Cardiac Conductivity in Dogs Before and During Sevoflurane Anesthesia. Front Vet Sci 2020;7:573706 (PMC7541965)"
 },
 {
  "id": "propofol-inhalation-qt",
  "name": "Intervallverlaengerung unter Propofol und Inhalationsanaesthetika",
  "art": "beide",
  "bedingung": "Propofol-Induktion ODER laufende Isofluran-/Sevofluran-/Desfluran-Narkose UND PQ und QRS gegenueber der Wachaufnahme verlaengert UND QTc verlaengert",
  "mess": [
   "pq",
   "qrs",
   "qt",
   "hf"
  ],
  "hinweis": "Nach Propofol-Induktion sind beim Hund verlaengerte PQ- und QRS-Dauern sowie ein hoeheres frequenzkorrigiertes QT beschrieben; volatile Anaesthetika (Isofluran, Desfluran, Sevofluran) verlaengern QTc ebenfalls. Eine QT-Beurteilung unter Narkose sollte deshalb nicht gegen Wachreferenzwerte gestellt werden; sinnvoll ist der Vergleich mit einer Ausgangsaufnahme desselben Tieres.",
  "dd": "Hypothermie, Elektrolytstoerung, gleichzeitige Opioidgabe, Antiarrhythmika",
  "sicher": "wahrscheinlich",
  "quelle": "Comparison of the effects of propofol and alfaxalone on the electrocardiogram of dogs, with particular reference to QT interval (PMC10800659); Staikou C et al., Impact of anaesthetic drugs and adjuvants on ECG markers of torsadogenicity. Br J Anaesth"
 },
 {
  "id": "lagerung-signalguete-amplituden",
  "name": "Lagerung und Signalguete begrenzen Amplituden- und Achsenbefunde",
  "art": "alle",
  "bedingung": "Signalguete unterhalb Schwelle (Grundlinienschwankung > 0.1 mV ODER Muskelzitterartefakt erkannt) ODER Lagerung nicht rechte Seitenlage dokumentiert",
  "mess": [
   "signalguete",
   "ramp",
   "achse",
   "p",
   "st"
  ],
  "hinweis": "Amplituden und die berechnete elektrische Achse haengen von der Lagerung ab; die publizierten Kleintier-Referenzwerte gelten fuer die rechte Seitenlage. Beim Frettchen wurden signifikante Unterschiede der Achse sowie der P-, R- und Q/S-Amplituden zwischen Lagerungspositionen nachgewiesen. Bei unruhigen Tieren, Muskelzittern (haeufig bei Katze, Kaninchen, Meerschweinchen) und Hecheln sind Amplituden-, ST- und Achsenbefunde nicht belastbar. Die Rhythmus- und Frequenzbeurteilung bleibt in aller Regel moeglich.",
  "dd": "echte Amplitudenminderung durch Erguss, Adipositas oder Hypothyreose - erst nach Ausschluss technischer Ursachen zu erwaegen",
  "sicher": "gesichert",
  "quelle": "Bublot I et al., J Vet Cardiol 2006 (Lagerungsabhaengigkeit beim Frettchen); Tilley LP, Essentials of Canine and Feline Electrocardiography (rechte Seitenlage als Standard)"
 },
 {
  "id": "achse-nur-aus-zwei-unabhaengigen-ableitungen",
  "name": "Elektrische Achse ist aus Ableitung II allein nicht berechenbar",
  "art": "alle",
  "bedingung": "Zahl der TATSAECHLICH aufgezeichneten Extremitaetenableitungen < 2 (z. B. nur Ableitung II) → Achsenwert und jeder achsenabhaengige Hinweis (Links-/Rechtsschub, Hypertrophiemuster, Lagetyp) werden NICHT ausgegeben, sondern als 'nicht bestimmbar' gefuehrt. Erst ab 2 unabhaengig gemessenen Ableitungen (z. B. I und II) wird die Achse berechnet.",
  "mess": [
   "anzahlgemesseneableitungen",
   "achse"
  ],
  "hinweis": "Die elektrische Achse laesst sich aus einem einzelnen Ableitung-II-Streifen nicht bestimmen. Nach Einthoven gilt II = I + III — eine Gleichung mit zwei Unbekannten. Fuer eine Achsenangabe waeren mindestens zwei unabhaengig aufgezeichnete Extremitaetenableitungen noetig, etwa I und II.",
  "dd": "Aus I und II lassen sich III, aVR, aVL, aVF vollstaendig rechnen (III = II - I; aVR = -(I+II)/2; aVL = I - II/2; aVF = II - I/2). Aus II allein keine davon.",
  "sicher": "gesichert",
  "quelle": "Einthoven-Beziehung / Goldberger-Formeln, Grundlage der Extremitaetenableitungen; AHA/ACCF/HRS Recommendations Part I (Kligfield et al., Circulation 2007)"
 },
 {
  "id": "abgeleitete-kurven-als-berechnet-kennzeichnen",
  "name": "Gerechnete Ableitungen werden im Raster als gerechnet beschriftet",
  "art": "alle",
  "bedingung": "Fuer jede der 6 Extremitaetenableitungen wird gefuehrt, ob sie gemessen oder gerechnet ist. Gerechnete Kurven erhalten im Ableitungsraster den Zusatz 'berechnet' und werden von Amplituden-Grenzwertpruefungen ausgenommen (keine R-Amplituden-Bewertung, keine ST-Bewertung).",
  "mess": [
   "anzahlgemesseneableitungen",
   "ramp",
   "st"
  ],
  "hinweis": "Diese Kurve wurde aus den gemessenen Ableitungen gerechnet, nicht am Tier abgeleitet. Amplituden und ST-Strecken werden darin nicht bewertet.",
  "dd": "",
  "sicher": "gesichert",
  "quelle": "Philips DXL ECG Algorithm Physician's Guide Ed. 2, Kap. 1 (Umgang mit nicht aufgezeichneten Ableitungen: 'Incomplete analysis due to missing data in lead(s)')"
 },
 {
  "id": "hinweis-immer-als-unbestaetigt-kennzeichnen",
  "name": "Jeder automatische Hinweis traegt bis zur Freigabe die Marke unbestaetigt",
  "art": "alle",
  "bedingung": "Anzahl automatisch erzeugter Hinweise >= 1 UND Freigabe durch den Tierarzt = nein → Kopfzeile am Bildschirm UND Fusszeile jeder PDF-Seite tragen 'Automatischer Hinweis — unbestaetigt'. Die Marke entfaellt erst nach einer ausdruecklichen Freigabehandlung und wird durch Name und Zeitpunkt der Freigabe ersetzt.",
  "mess": [
   "anzahlhinweise"
  ],
  "hinweis": "Automatischer Hinweis — unbestaetigt. Aus den Messwerten dieses Streifens erzeugt, nicht durch eine tieraerztliche Beurteilung bestaetigt.",
  "dd": "",
  "sicher": "gesichert",
  "quelle": "GE Marquette 12SL Statement of Validation: alle Interpretationen sind als 'unconfirmed' gekennzeichnet, bis ein Arzt sie bearbeitet hat; Philips DXL Tab. 5-5 Label 'Unconfirmed Diagnosis'"
 },
 {
  "id": "begruendung-mit-zahlen-immer-mitliefern",
  "name": "Kein Hinweis ohne die ausloesenden Messwerte",
  "art": "alle",
  "bedingung": "Zu jedem angezeigten Hinweis wird zwingend eine Begruendungszeile mit Zahl und Einheit ausgegeben, z. B. 'QRS 92 ms (Hund: bis 70 ms), P vor 1 von 9 QRS, RR-Schwankung 34 %'. Fehlt diese Zeile, wird der Hinweis gar nicht erst angezeigt.",
  "mess": [
   "hf",
   "rr",
   "qrs",
   "p",
   "pq",
   "qt",
   "ramp",
   "st",
   "rrschwankung"
  ],
  "hinweis": "Grundlage dieses Hinweises: die hier genannten Messwerte. Bitte pruefen Sie sie an der Kurve nach.",
  "dd": "",
  "sicher": "gesichert",
  "quelle": "Philips DXL 'Reason Statements' (Kap. 5-3); Mortara/Welch Allyn VERITAS Physician's Guide (Interpretativtext + Reason Statement); FDA-Leitlinie Clinical Decision Support Software (Kriterium: unabhaengige Nachpruefbarkeit der Grundlage)"
 },
 {
  "id": "signalguete-harte-sperre",
  "name": "Unter der Guetegrenze wird gar nichts behauptet",
  "art": "alle",
  "bedingung": "R-Amplitude / Grundrauschen (Spitze-Spitze im TP-Abschnitt) < 3 ODER Anteil ungueltiger Abtastwerte > 20 % ODER Streifenlaenge < 2,0 s ODER erkannte R-Zacken < 3 → kein Rhythmus- und kein Formbefund; ausgegeben wird ausschliesslich 'nicht beurteilbar' mit dem zutreffenden Grund.",
  "mess": [
   "signalguete",
   "rrschwankung",
   "hf"
  ],
  "hinweis": "Dieser Streifen laesst keine Aussage zu (Grund wird genannt). Bitte neu aufzeichnen — Klemmen umsetzen, Tier ruhig lagern, Kontaktgel erneuern.",
  "dd": "",
  "sicher": "gesichert",
  "quelle": "Philips DXL Anhang B: 'Poor-quality data - please repeat ECG!' und '...no analysis performed'; Glasgow Physician's Guide Abschn. 4.4 'Restricted analysis': '--- Technically unsatisfactory tracing ---'"
 },
 {
  "id": "signalguete-abstufung-verdacht",
  "name": "Mittelmaessiges Signal deckelt die Sicherheitsstufe",
  "art": "alle",
  "bedingung": "R-Amplitude / Grundrauschen zwischen 3 und 5 → jeder Hinweis wird hoechstens auf Stufe 'Verdacht' gefuehrt, nie rot eingestuft, und traegt den Zusatz 'Signal nur maessig (Faktor X ueber dem Rauschen)'.",
  "mess": [
   "signalguete"
  ],
  "hinweis": "Das Signal liegt nur maessig ueber dem Grundrauschen. Der Hinweis wird deshalb nur als Verdacht gefuehrt.",
  "dd": "",
  "sicher": "gesichert",
  "quelle": "Muster nach Philips DXL Severity-Leiter mit eigener Stufe 'Defective ECG' (DE); Glasgow: Vorabkommentare in --- Klammern --- vor dem eigentlichen Befund"
 },
 {
  "id": "hund-rr-schwankung-ist-kein-vorhofflimmern",
  "name": "Beim Hund ist die atemabhaengige Sinusarrhythmie ein Normalbefund",
  "art": "hund",
  "bedingung": "RR-Schwankung > 10 % UND vor >= 90 % der QRS eine P-Welle UND PQ-Streuung <= 20 ms → Befund 'Sinusarrhythmie, regelmaessig unregelmaessig'. Ein Vorhofflimmern-Hinweis wird in dieser Konstellation ausdruecklich NICHT erzeugt.",
  "mess": [
   "rrschwankung",
   "p",
   "pq",
   "hf"
  ],
  "hinweis": "Die Abstaende schwanken atemabhaengig, vor jedem Schlag steht eine P-Welle mit gleichbleibendem PQ. Beim Hund ist das ein haeufiger Normalbefund (hoher Vagotonus). Er verschwindet typischerweise bei Aufregung, Belastung oder nach Vagolyse.",
  "dd": "Wandernder Schrittmacher (P-Amplitude schwankt mit der Frequenz) gehoert zum selben vagalen Bild und ist ebenfalls kein Vorhofflimmern.",
  "sicher": "gesichert",
  "quelle": "MSD/Merck Veterinary Manual, Conduction Abnormalities in Dogs and Cats: Sinusarrhythmie beim Hund normal, > 10 % RR-Variation; Clinician's Brief, Top 5 Arrhythmias in Dogs & Cats"
 },
 {
  "id": "vorhofflimmern-nur-mit-vier-bedingungen",
  "name": "Vorhofflimmern-Hinweis nur bei gleichzeitig erfuellten Bedingungen",
  "art": "beide",
  "bedingung": "Hinweis 'Verdacht auf Vorhofflimmern' nur wenn ALLE vier gelten: keine erkennbare P-Welle in >= 90 % der Schlaege UND RR-Schwankung > 15 % ohne wiederkehrendes Muster UND R-Amplitude/Grundrauschen >= 5 UND Streifenlaenge >= 10 s. Andernfalls hoechstens 'Rhythmus unregelmaessig, Vorhofaktivitaet nicht sicher beurteilbar'.",
  "mess": [
   "p",
   "rrschwankung",
   "signalguete",
   "rr",
   "hf"
  ],
  "hinweis": "Kein P vor den Schlaegen, die Abstaende schwanken unregelmaessig ohne Muster. Das koennte Vorhofflimmern sein. Ebenso in Frage kommen dichte supraventrikulaere Extrasystolie und Artefakt.",
  "dd": "Extrasystolen und Artefakt sind in der Humanmedizin die beiden haeufigsten Ursachen falsch positiver Flimmer-Befunde (53 % bzw. 39 %).",
  "sicher": "wahrscheinlich",
  "quelle": "Fehlalarm-Muster aus Lindow et al., Scand J Prim Health Care 2019 (PMC6883419): 9,0 % der Computer-Flimmerbefunde falsch, Ursachen Extrasystolen 53 %, Artefakt 39 %; Schwellenwerte fuer Hund/Katze selbst gesetzt — unbelegt"
 },
 {
  "id": "katze-rr-schwankung-ist-auffaellig",
  "name": "Bei der Katze ist Sinusarrhythmie in der Praxis ungewoehnlich",
  "art": "katze",
  "bedingung": "RR-Schwankung > 10 % UND P vor >= 90 % der QRS UND Aufzeichnung in der Praxis → Hinweis 'Sinusarrhythmie — bei der Katze in der Klinik ungewoehnlich' auf Stufe auffaellig (gelb), nicht als Normalbefund.",
  "mess": [
   "rrschwankung",
   "p",
   "pq",
   "hf"
  ],
  "hinweis": "Die Abstaende schwanken atemabhaengig. Anders als beim Hund ist das bei der Katze in der Klinik ungewoehnlich, weil die Katzenfrequenz dort meist sympathisch getrieben ist. Ein erhoehter Vagotonus koennte dahinterstehen.",
  "dd": "Erhoehter Vagotonus bei Erkrankungen von Atemwegen, Schaedel, Auge, Magen-Darm; zu Hause aufgezeichnet ist Sinusarrhythmie auch bei der Katze haeufiger.",
  "sicher": "wahrscheinlich",
  "quelle": "MSD/Merck Veterinary Manual: Sinusarrhythmie beim Hund normal, bei der Katze in der Klinik abnorm, zu Hause haeufiger"
 },
 {
  "id": "artefakt-vor-arrhythmie-pruefen",
  "name": "Rauschen in Hoehe der P-Welle sperrt alle Vorhofbefunde",
  "art": "alle",
  "bedingung": "Grundlinienrauschen im TP-Abschnitt (Spitze-Spitze) >= gemessene P-Amplitude → alle vorhofbezogenen Hinweise (P fehlt, Flimmern, Flattern, Vorhofstillstand) werden unterdrueckt und durch 'Vorhofaktivitaet im Rauschen nicht beurteilbar' ersetzt.",
  "mess": [
   "p",
   "signalguete",
   "rrschwankung"
  ],
  "hinweis": "Das Grundrauschen ist so gross wie eine P-Welle. Ob P-Wellen vorhanden sind, laesst sich hier nicht entscheiden.",
  "dd": "Schnurren der Katze erzeugt eine feine Grundlinienwelle, die Vorhofflimmern oder -flattern taeuschend aehnlich sieht; ebenso Muskelzittern, Kaeltezittern und Bewegung.",
  "sicher": "gesichert",
  "quelle": "Artefakte in der Kleintier-EKG-Literatur (Small Animal ECGs, Kap. Artefacts; VIN/WSAVA Clinical Approach to Arrhythmias): Schnurren und Zittern imitieren Flimmern/Flattern; Philips DXL Quality Monitor 'Artifact in lead(s) **'"
 },
 {
  "id": "drei-stufen-prioritaet-mit-genormten-farben",
  "name": "Genau drei Stufen, Farben nach Alarmnorm",
  "art": "alle",
  "bedingung": "Jeder Hinweis erhaelt genau eine von drei Stufen: kritisch (rot), auffaellig (gelb), unauffaellig (neutral/grau). Farbzuordnung nach IEC 60601-1-8: rot = hohe Prioritaet, gelb = mittlere, cyan/blau = niedrige. Rot wird nie fuer reine Messwertabweichungen vergeben und nie bei Signalguete < 5.",
  "mess": [
   "signalguete",
   "anzahlhinweise"
  ],
  "hinweis": "Die Farbe sagt, wie schnell hingesehen werden sollte — nicht, wie sicher der Befund ist. Die Sicherheit steht als eigenes Wort daneben.",
  "dd": "",
  "sicher": "gesichert",
  "quelle": "IEC 60601-1-8 (Alarmsysteme in medizinischen elektrischen Geraeten): rot hohe, gelb mittlere, cyan niedrige Prioritaet; Philips DXL 'Critical Values' als geschlossene Hoechststufe"
 },
 {
  "id": "kritische-liste-geschlossen-halten",
  "name": "Die rote Stufe bleibt eine kurze geschlossene Liste",
  "art": "beide",
  "bedingung": "Zahl der rot einstufbaren Befundarten <= 5. Vorschlag Hund: (a) HF < 50/min mit P-QRS-Dissoziation, (b) Pause > 2x mittleres RR UND > 4 s, (c) QRS > 80 ms bei HF > 180/min (Breitkomplex-Tachykardie), (d) HF > 250/min, (e) keine erkennbare elektrische Aktivitaet > 4 s. Katze entsprechend mit HF < 100/min bzw. HF > 300/min und QRS > 60 ms.",
  "mess": [
   "hf",
   "rr",
   "qrs",
   "p",
   "rrschwankung"
  ],
  "hinweis": "Dieser Messwert liegt in einem Bereich, den die Station als dringend ansieht. Bitte zuerst die Kurve selbst ansehen und die Markierungen der gezaehlten Schlaege pruefen.",
  "dd": "Jede dieser fuenf Konstellationen kann auch durch Artefakt oder Fehlzaehlung entstehen — deshalb Schlagmarkierungen zwingend mit anzeigen.",
  "sicher": "Verdacht",
  "quelle": "Muster (genau 4 Critical Values) nach Philips DXL Anhang D; die tiermedizinischen Zahlenwerte sind hier selbst gesetzt — unbelegt, muessen vor Einsatz gegen Tilley bzw. Kresken/Wendt/Modler geprueft werden"
 },
 {
  "id": "normalbefund-nur-mit-vorbehalt",
  "name": "Kein gruenes Herz-in-Ordnung",
  "art": "alle",
  "bedingung": "Anzahl ausgeloester Hinweise = 0 → ausgegeben wird NICHT 'Herz unauffaellig', sondern 'In den gemessenen Groessen kein auffaelliger Wert' zusammen mit dem Vorbehaltssatz. Die Farbe ist neutral/grau, nicht gruen.",
  "mess": [
   "hf",
   "rr",
   "qrs",
   "p",
   "pq",
   "qt",
   "st",
   "signalguete"
  ],
  "hinweis": "In den gemessenen Groessen faellt nichts auf. Das schliesst eine Herzerkrankung nicht aus: der Streifen zeigt nur diesen Zeitraum und nur die elektrische Aktivitaet — nicht Pumpfunktion, Klappen oder Herzgroesse.",
  "dd": "",
  "sicher": "gesichert",
  "quelle": "AliveCor KardiaMobile IFU, CAUTION: ein als normal eingestuftes EKG garantiert nicht die Abwesenheit einer Arrhythmie; Glasgow Physician's Guide WARNING: Beurteilung noetig vor Behandlung ODER Nichtbehandlung"
 },
 {
  "id": "normbasis-und-messbedingungen-anzeigen",
  "name": "Der Kopf nennt, auf welcher Grundlage gerechnet wurde",
  "art": "alle",
  "bedingung": "Kopf jeder Befundseite nennt: Tierart, Papiergeschwindigkeit (mm/s), Verstaerkung (mm/mV), Abtastrate (Hz), ausgewertete Ableitung und Lagerung. Fehlt eine dieser Angaben, wird eine eigene Zeile gedruckt, z. B. 'Auswertung ohne Angabe der Lagerung' bzw. 'Auswertung nach Normwerten Hund'.",
  "mess": [
   "signalguete"
  ],
  "hinweis": "Die verwendeten Normwerte gelten fuer die genannte Tierart und Lagerung. Weicht die Aufnahme davon ab, verschieben sich die Grenzen.",
  "dd": "Die gaengigen Kleintier-Normwerte sind an Ableitung II in rechter Seitenlage gewonnen; andere Lagerung veraendert Amplituden und Achse.",
  "sicher": "gesichert",
  "quelle": "Glasgow Physician's Guide Abschn. 4.3: '--- Interpretation made without knowing patient's age ---' und '--- Interpretation based on pediatric criteria ---'; Tilley, Essentials of Canine and Feline Electrocardiography (Normwerte aus Ableitung II, rechte Seitenl"
 },
 {
  "id": "keine-scheingenauigkeit-bei-zeiten",
  "name": "Anzeigeschritt darf die Abtastrate nicht ueberholen",
  "art": "alle",
  "bedingung": "Anzeigeschritt fuer Zeitwerte >= 1000/Abtastrate ms, mindestens jedoch 5 ms. Bei 256 Hz entspricht ein Abtastwert 3,9 ms → Anzeige in 5-ms-Schritten (also 'PQ 95 ms', nicht 'PQ 97,3 ms'). Amplituden werden nur in mV ausgegeben, wenn die Verstaerkung des Geraets bekannt ist; sonst Ausgabe in Rohwerten mit dem Vermerk 'Verstaerkung unbekannt'.",
  "mess": [
   "qrs",
   "pq",
   "qt",
   "p",
   "ramp",
   "st"
  ],
  "hinweis": "Die Zeitwerte werden in 5-ms-Schritten angezeigt. Feiner ist bei dieser Abtastrate nicht belegbar.",
  "dd": "",
  "sicher": "gesichert",
  "quelle": "IEC 60601-2-25 Ed. 2 (integriert das frueher eigenstaendige IEC 60601-2-51): Pruefung der Messgenauigkeit gegen CTS-/CSE-Datenbanken; Abtasttheorem"
 },
 {
  "id": "messwerttabelle-mit-artnorm-und-quelle",
  "name": "Jede Zahl steht neben ihrer Artnorm und deren Quelle",
  "art": "alle",
  "bedingung": "Jede Zeile der Messwerttabelle zeigt: Messwert + Einheit, Normbereich der eingestellten Tierart, Quelle des Normbereichs, Markierung innerhalb/ausserhalb. Messgroessen ohne belegten Artnormbereich werden ohne Bewertung gezeigt und ausdruecklich als 'kein Normbereich hinterlegt' gekennzeichnet.",
  "mess": [
   "hf",
   "rr",
   "qrs",
   "p",
   "pq",
   "qt",
   "ramp",
   "st",
   "achse"
  ],
  "hinweis": "Fuer diese Groesse ist bei dieser Tierart kein belegter Normbereich hinterlegt. Der Wert wird gezeigt, aber nicht bewertet.",
  "dd": "",
  "sicher": "gesichert",
  "quelle": "FDA-Leitlinie Clinical Decision Support Software (Offenlegung von Eingangsgroessen, Methode und Grenzen, damit die Fachperson die Grundlage unabhaengig pruefen kann)"
 },
 {
  "id": "schlagmarken-und-rhythmusstreifen-zwingend",
  "name": "Jede Rhythmusaussage nur mit markierten Schlaegen",
  "art": "alle",
  "bedingung": "Eine Rhythmusaussage wird nur zusammen mit dem Streifen ausgegeben, in dem jede gezaehlte R-Zacke markiert ist; darunter eine Leiste mit den RR-Werten in ms. Ohne sichtbare Schlagmarkierung wird keine Rhythmusaussage angezeigt.",
  "mess": [
   "rr",
   "rrschwankung",
   "hf"
  ],
  "hinweis": "Die Markierungen zeigen, welche Ausschlaege als Schlag gezaehlt wurden. Stimmt die Zaehlung nicht, stimmen Frequenz und Rhythmusaussage auch nicht.",
  "dd": "Doppelzaehlung hoher T-Wellen und Nichtzaehlung kleiner QRS sind die haeufigsten stillen Fehlerquellen.",
  "sicher": "gesichert",
  "quelle": "Schläpfer & Wellens, JACC 2017;70(9):1183-1192 (Computer-Interpreted ECGs: Benefits and Limitations); Frontiers in Physiology 2025, 'The most common errors in automatic ECG interpretation': Artefakte werden als Wellen gezaehlt, Frequenz wird dadurch falsch"
 },
 {
  "id": "mittelwertkomplex-als-kuenstlich-kennzeichnen",
  "name": "Der gemittelte Musterkomplex ist ein Rechenergebnis, kein Schlag",
  "art": "alle",
  "bedingung": "Ein gemittelter Musterkomplex traegt die Beschriftung 'gerechneter Mittelwert aus n Schlaegen' und wird nie ohne den zugehoerigen Rhythmusstreifen gezeigt. Betraegt die Streuung der QRS-Dauer zwischen den Einzelschlaegen > 15 ms, wird kein Mittelwertkomplex erzeugt, weil kein repraesentativer Schlag existiert.",
  "mess": [
   "qrs",
   "ramp",
   "p",
   "st"
  ],
  "hinweis": "Dieser Komplex ist aus mehreren Schlaegen gerechnet und entspricht keinem einzelnen echten Schlag. Extrasystolen und wechselnde Formen verschwinden darin.",
  "dd": "",
  "sicher": "gesichert",
  "quelle": "Philips DXL Physician's Guide Anhang E, 'Representative Beat Formation': gemittelte Komplexe sind kuenstliche Schlaege; bei zu grosser Streuung existiert kein repraesentativer Schlag und die Ableitung wird von der Auswertung ausgeschlossen"
 },
 {
  "id": "keine-inhaltsleeren-hinweise",
  "name": "Aussagen ohne pruefbaren Inhalt werden weggelassen",
  "art": "alle",
  "bedingung": "Hinweistexte ohne pruefbaren Inhalt ('Rhythmus unklar', 'unspezifische Veraenderung', 'grenzwertiges EKG' ohne Zahl) werden nicht ausgegeben. Stattdessen wird die betroffene Messgroesse mit Wert und Artnorm gezeigt und die Deutung offen gelassen.",
  "mess": [
   "hf",
   "qrs",
   "p",
   "pq",
   "qt",
   "st"
  ],
  "hinweis": "Fuer diese Groesse liegt der Wert ausserhalb der hinterlegten Norm, ohne dass sich daraus ein bestimmter Befund ableiten laesst. Wert und Norm stehen daneben.",
  "dd": "",
  "sicher": "gesichert",
  "quelle": "Chiu et al., Eur Heart J Digital Health 2026 (ztaf119), 159.630 EKGs: 31,3 % der Automatenbefunde wurden vom Arzt geaendert; unbestimmte Aussagen wie 'undetermined rhythm' wurden in ueber 82 % der Faelle geloescht"
 },
 {
  "id": "vergleich-nur-bei-gleichen-bedingungen",
  "name": "Vorher/Nachher nur bei identischen Aufnahmebedingungen",
  "art": "alle",
  "bedingung": "Ein Vorher/Nachher-Vergleich mit Differenzbewertung wird nur erzeugt, wenn Tierart, ausgewertete Ableitung, Lagerung, Papiergeschwindigkeit und Verstaerkung uebereinstimmen UND beide Streifen R-Amplitude/Grundrauschen >= 5 haben. Sonst werden die Werte nur nebeneinandergestellt, ohne Differenz und ohne Trendaussage.",
  "mess": [
   "hf",
   "qrs",
   "pq",
   "qt",
   "ramp",
   "st",
   "signalguete"
  ],
  "hinweis": "Die beiden Aufnahmen unterscheiden sich in den Aufnahmebedingungen. Die Werte stehen nebeneinander; eine Differenz wird bewusst nicht gebildet, weil sie hier auch von der Aufnahme kommen koennte.",
  "dd": "Schon zwei verschiedene Geraete liefern am selben Hund klinisch bedeutsam verschiedene Werte und daraus verschiedene Referenzbereiche.",
  "sicher": "gesichert",
  "quelle": "Am J Vet Res 2026 (ajvr.26.04.0146): zwei digitale Elektrokardiografen und ihre Auswerteprogramme erzeugen bei Hunden klinisch bedeutsame Unterschiede in Werten und Referenzbereichen"
 },
 {
  "id": "keine-behandlungsanweisung-im-hinweistext",
  "name": "Der Hinweistext ordnet nichts an",
  "art": "alle",
  "bedingung": "Der Hinweistext enthaelt keine Anordnungsverben (geben, dosieren, sofort, muss, verabreichen) und keinen Wirkstoffnamen. Fester Aufbau in drei Teilen: (1) was gemessen wurde, mit Zahl und Einheit, (2) was das sein KOENNTE, (3) was es sonst sein koennte.",
  "mess": [
   "hf",
   "rr",
   "qrs",
   "p",
   "pq",
   "qt",
   "st",
   "rrschwankung"
  ],
  "hinweis": "Beispiel: 'QRS 96 ms bei HF 210/min, keine P vor den Schlaegen. Das koennte eine ventrikulaere Tachykardie sein. Ebenso moeglich: supraventrikulaere Tachykardie mit Schenkelblock oder ein Bewegungsartefakt.'",
  "dd": "",
  "sicher": "gesichert",
  "quelle": "Cardiologs ECG Analysis Platform, FDA 510(k) K170568: Ergebnisse sind nicht alleiniges Diagnosemittel und werden ausschliesslich beratend bereitgestellt; Glasgow Physician's Guide WARNING"
 },
 {
  "id": "uebernahme-erfordert-aktive-handlung",
  "name": "Befundtext wird nie vorbestaetigt uebernommen",
  "art": "alle",
  "bedingung": "Der uebernehmbare Befundtext ist bearbeitbar und nie vorab als bestaetigt markiert; die Freigabe erfordert eine eigene Handlung. Im Protokoll wird je Zeile festgehalten, ob sie vom Automaten stammt, geaendert oder geloescht wurde, samt Name und Zeitpunkt.",
  "mess": [
   "anzahlhinweise"
  ],
  "hinweis": "Der Text ist ein Vorschlag aus den Messwerten. Bitte aendern oder loeschen Sie, was nicht passt — die Aenderung wird mitprotokolliert.",
  "dd": "In der Humanmedizin blieb knapp die Haelfte der falschen Computer-Flimmerbefunde vom befundenden Arzt unkorrigiert.",
  "sicher": "gesichert",
  "quelle": "Lindow et al., Scand J Prim Health Care 2019 (PMC6883419): 36 von 77 falschen Computerbefunden blieben unkorrigiert; Automation-Bias-Studie, J Electrocardiol 2019 (S0022073618303327): falsche Automatenbefunde senken die Treffsicherheit des Befunders, weniger e"
 },
 {
  "id": "hf-ausserhalb-des-analysebereichs-offenlegen",
  "name": "Ausserhalb des Auslegungsbereichs wird nicht geraten",
  "art": "beide",
  "bedingung": "Hund HF > 200/min bzw. Katze HF > 260/min ODER RR < 180 ms → keine Aussage zu P-Vorhandensein, P-Dauer und PQ; ausgegeben wird 'bei dieser Frequenz faellt die P-Welle in die vorangehende T-Welle, Vorhofaktivitaet nicht abgrenzbar'. Frequenz und Rhythmusregelmaessigkeit duerfen weiterhin gezeigt werden.",
  "mess": [
   "hf",
   "rr",
   "p",
   "pq"
  ],
  "hinweis": "Bei dieser Frequenz laesst sich die P-Welle nicht von der vorangehenden T-Welle trennen. Frequenz und Regelmaessigkeit stehen unten, eine Aussage zur Vorhofaktivitaet unterbleibt.",
  "dd": "",
  "sicher": "Verdacht",
  "quelle": "Muster nach Apple Watch EKG (ausserhalb definierter Frequenzgrenzen wird 'nicht schluessig' statt einer Klassifikation ausgegeben) und AliveCor 'Unclassified'; die tierartlichen Frequenzgrenzen sind hier selbst gesetzt — unbelegt"
 },
 {
  "id": "bekannte-blinde-flecken-benennen",
  "name": "Die eigenen bekannten Fehlklassifikationen stehen im Dokument",
  "art": "alle",
  "bedingung": "Es existiert eine im Programm abrufbare Liste der bekannten Fehlklassifikationen mit Bedingung, z. B. 'Bigeminus wird bei Signalguete < 5 haeufig als unregelmaessig ohne Muster gefuehrt', 'Schnurren der Katze kann als Vorhofflimmern erscheinen'. Beim Anzeigen eines betroffenen Hinweises wird auf den zutreffenden Eintrag verwiesen.",
  "mess": [
   "signalguete",
   "rrschwankung",
   "p"
  ],
  "hinweis": "Fuer diese Konstellation ist eine bekannte Fehlerquelle hinterlegt — bitte den Eintrag mitlesen.",
  "dd": "",
  "sicher": "gesichert",
  "quelle": "AliveCor KardiaMobile IFU: die bekannten Fehlklassifikationen (ventrikulaeres Flattern, Bigeminus, Trigeminus werden als 'unreadable' gefuehrt) stehen ausdruecklich in der Gebrauchsanweisung"
 }
];

  /* Welche Messgroessen erhebt die Station heute? Danach entscheidet sich, ob eine Regel
   * automatisch geprueft werden kann oder nur zum Nachschlagen dasteht. */
  function machbar(regel, vorhanden) {
    if (!regel.mess || !regel.mess.length) return false;
    for (var i = 0; i < regel.mess.length; i++) {
      var gebraucht = regel.mess[i], da = false;
      for (var j = 0; j < vorhanden.length; j++) {
        if (gebraucht.indexOf(vorhanden[j]) >= 0) { da = true; break; }
      }
      if (!da) return false;
    }
    return true;
  }

  function fuerArt(sp) {
    var out = [];
    for (var i = 0; i < REGELN.length; i++) {
      var r = REGELN[i];
      if (r.art === 'alle') { out.push(r); continue; }
      if (r.art === 'beide' && (sp === 'hund' || sp === 'katze')) { out.push(r); continue; }
      if (r.art === sp) out.push(r);
    }
    return out;
  }

  function suche(text, sp) {
    var t = String(text || '').toLowerCase().trim();
    var liste = sp ? fuerArt(sp) : REGELN;
    if (!t) return liste;
    var out = [];
    for (var i = 0; i < liste.length; i++) {
      var r = liste[i];
      var heu = (r.name + ' ' + r.hinweis + ' ' + r.bedingung + ' ' + r.dd + ' ' + r.quelle).toLowerCase();
      if (heu.indexOf(t) >= 0) out.push(r);
    }
    return out;
  }

  return { REGELN: REGELN, fuerArt: fuerArt, suche: suche, machbar: machbar, anzahl: REGELN.length };
}));
