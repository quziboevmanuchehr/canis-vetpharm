/* ============================================================================
   shared/narkose-risiko.js  ·  Canis VET-PHARM / VetStation
   ERSTWAHL-NARKOSE und RETTUNGSWEGE zu den rassespezifischen Risikolagen.
   Haengt sich ueber VETBREED.register() in shared/breed-genetics.js ein.
   ----------------------------------------------------------------------------
   WARUM EIGENE DATEI: breed-genetics.js beantwortet „was hat diese Rasse".
   Hier steht die Antwort auf die zwei Fragen, die im OP wirklich gestellt werden:
     1. Welche Narkose nehme ich bei diesem Tier ZUERST?
     2. Es ist schon das Falsche drin — wie bekomme ich den Patienten stabil?
   Der Rassekatalog (breed-katalog.js) verweist nur noch auf die Schluessel hier,
   damit dieselbe Aussage nicht an 300 Rassen einzeln haengt und auseinanderlaeuft.

   ALLE DOSEN SIND RICHTWERTE fuer Hund/Katze, sofern nicht anders genannt. Die
   artspezifische Zahl rechnet das Modul selbst (anaes-data.js + Dosisrechner);
   vor jeder Gabe gegen Fachinformation und Patient pruefen.

   Quellen: ACVAA/AVA, AAHA Anesthesia & Monitoring Guidelines 2020, WSAVA,
   BSAVA Manual of Canine and Feline Anaesthesia and Analgesia, BSAVA Manual of
   Rodents and Ferrets / Rabbit Medicine, RECOVER CPR Guidelines, Plumb's
   Veterinary Drug Handbook, CliniPharm/CliniTox (vetpharm.uzh.ch), Vetidata,
   Carpenter Exotic Animal Formulary, ACVIM-Konsensus (MMVD, DCM).
   ============================================================================ */
(function (root) {
  'use strict';
  var VB = root.VETBREED;
  if (!VB || !VB.register) return;   /* ohne Grundmodul kein Nachtrag — nie werfen */

  /* ------------------------------------------------------------------ GRUPPEN
     Die fuenf Grundgruppen gibt es schon in breed-genetics.js — hier bekommen sie nur den
     Verweis auf ihr Protokoll. Damit hat auch eine Rasse OHNE eingetragene Erbkrankheit einen
     Narkoseplan, sobald sie einer Gruppe angehoert (jeder Mops ist brachyzephal, jeder
     Chihuahua ist eine Zwergrasse — dafuer braucht es keinen Gentest). */
  var GROUPS = {
    mdr1:       { protocol: ['mdr1'],               rescue: ['ivermectin-mdr1', 'opioid-ueberhang'] },
    sighthound: { protocol: ['sighthound'],         rescue: ['hypothermie', 'nicht-aufwachen'] },
    brachy:     { protocol: ['boas'],               rescue: ['regurgitation'] },
    giant:      { protocol: ['giant'],              rescue: ['cpr'] },
    toy:        { protocol: ['toy-hypoglykaemie'],  rescue: ['hypoglykaemie', 'hypothermie'] },
    chondro: { name: 'Chondrodystroph', icon: '🦴', color: '#c48a2a',
      desc: 'Verkuerzte Gliedmassen, fruehe Bandscheibendegeneration (CDDY/FGF4) — Lagerung und Wirbelsaeule in Narkose beachten.',
      protocol: ['chondro-ivdd'] },
    riesenkanin: { name: 'Riesenkaninchen', icon: '🐇', color: '#16a06a',
      desc: 'Grosse Kaninchenrassen: Pododermatitis (Lagerung!), Spondylose und Wirbelfraktur beim Handling, hohe Absolutdosen. Eine erhoehte Herzerkrankungsrate ist NICHT belegt.',
      protocol: ['kaninchen'] },
    zwergkanin: { name: 'Zwergkaninchen', icon: '🐰', color: '#e0a020',
      desc: 'Kleiner Koerper, verkuerzter Schaedel, enge Nasengaenge: schwierige Intubation, rasche Auskuehlung, kleines Fehlerfenster bei der Dosis.',
      protocol: ['kaninchen', 'kanin-zwerg'] },
    /* Widder sind NICHT automatisch Zwerge — der Deutsche Widder wiegt 5 kg. Getrennt gefuehrt,
       weil sonst ein Grossrassen-Kaninchen die Zwergrassen-Hinweise bekaeme. */
    widderkanin: { name: 'Widderkaninchen (Lop)', icon: '👂', color: '#c48a2a',
      desc: 'Haengeohr: Gehoergang enger und haeufiger entzuendet (Zerumenstau, Otitis) — das ist der besser belegte Widder-Befund, nicht die oft behauptete Zahnneigung.',
      protocol: ['kaninchen', 'kanin-widder'] },
    langhaar: { name: 'Langhaar-/Wollrasse', icon: '🧶', color: '#8b7cf6',
      desc: 'Dichtes Fell: Waermestau vor der Narkose, danach rascher Waermeverlust am geschorenen Tier.' },
    nackt: { name: 'Nackt-/Haarlos-Rasse', icon: '❄️', color: '#0aa2c4',
      desc: 'Ohne Fell geht Waerme sehr schnell verloren — aktive Waermung ab der Praemedikation, nicht erst im OP.' },
    morph: { name: 'Zuchtform mit Defekt', icon: '⚠️', color: '#e23b6d',
      desc: 'Farb-/Zuchtform, an die ein neurologischer oder struktureller Defekt gekoppelt ist (Reptilien-Morphs, Merle, Letalfaktoren).' }
  };

  /* -------------------------------------------------------------- PROTOKOLLE */
  var Q_AAHA = 'AAHA Anesthesia & Monitoring Guidelines 2020';
  var Q_ACVAA = 'ACVAA/AVA';
  var Q_BSAVA = 'BSAVA Manual of Canine and Feline Anaesthesia and Analgesia';
  var Q_BSAVA_EX = 'BSAVA Manual of Rodents and Ferrets / Rabbit Medicine';
  var Q_PLUMB = 'Plumb’s Veterinary Drug Handbook';
  var Q_CARP = 'Carpenter, Exotic Animal Formulary';
  var Q_CLINI = 'CliniPharm/CliniTox – vetpharm.uzh.ch';
  var Q_RECOVER = 'RECOVER CPR Guidelines';

  var PROTOCOLS = {

    /* ---------------- Artgrundlagen ----------------
       Damit auch eine Rasse ohne eingetragene Erbkrankheit nicht mit leerer Karte dasteht.
       Was hier steht, gilt fuer JEDES Tier dieser Art — die Rasse kann es nur verschaerfen. */
    'hund': {
      name: 'Hund — Narkosegrundsätze (unabhängig von der Rasse)', sp: 'hund', rang: 9,
      praemed: 'Vor der Prämedikation: Gewicht wiegen (nicht schätzen), Untersuchung, ASA-Klasse festlegen, i.v.-Zugang. Nüchtern 6–8 h (Welpen und Zwergrassen kürzer), Wasser bis 2 h vorher. Opioid + Sedativum nach Zustand.',
      einleitung: 'Zu Wirkung titrieren, nicht nach Rechenwert bolusieren — die berechnete Dosis ist die Obergrenze, nicht das Ziel. Präoxygenierung, sofortige Intubationsbereitschaft, Cuff kontrolliert blocken.',
      erhalt: 'Isofluran/Sevofluran so niedrig wie möglich, dafür Opioid und Lokalanästhesie — die volatile Dosis ist der Hauptgrund für Hypotension.',
      analgesie: 'Multimodal: Opioid + NSAID (bei stabilem Kreislauf und Nierenfunktion) + Lokal-/Regionalanästhesie.',
      ziele: 'MAP ≥ 60–70 mmHg, SpO₂ ≥ 95 %, EtCO₂ 35–45 mmHg, Temperatur ≥ 36,5 °C, Kapnografie und Blutdruck ab der Einleitung — nicht erst, wenn es auffällt.',
      warum: 'Die häufigsten vermeidbaren Zwischenfälle sind Hypotension, Hypothermie und Hypoventilation, nicht die Wahl des Anästhetikums. Die Aufwachphase ist die gefährlichste Zeit — dort passieren die meisten Todesfälle.',
      nicht: ['Dosis stur nach Körpergewicht ohne Zustandsbeurteilung', 'Aufwachen unbeaufsichtigt', 'Überwachung erst ab dem Schnitt'],
      sources: [Q_AAHA, Q_ACVAA, Q_BSAVA]
    },
    'katze': {
      name: 'Katze — Narkosegrundsätze (unabhängig von der Rasse)', sp: 'katze', rang: 9,
      praemed: 'Stress ist bei der Katze ein eigener Risikofaktor: ruhiger Raum, Handtuch, abgedunkelte Box, so wenig Fixierung wie möglich. Nüchtern 4–6 h. Opioid (Methadon/Buprenorphin/Butorphanol) ± Midazolam ± Alfaxalon i.m. als Kombination.',
      einleitung: 'Alfaxalon oder Propofol langsam titriert; Larynx VOR der Intubation mit Lidocain besprühen (Katzen neigen zum Larynxkrampf), passender Tubus, Manipulation minimal.',
      erhalt: 'Volatile Dosis niedrig halten, Opioid-gestützt. Infusion zurückhaltend: 2–3 mL/kg/h.',
      analgesie: 'Opioid + NSAID (bei gesicherter Nierenfunktion) + Lokalanästhesie. Kein Paracetamol — für die Katze tödlich.',
      ziele: 'MAP ≥ 60 mmHg, SpO₂ ≥ 95 %, EtCO₂ 35–45 mmHg, Temperatur ≥ 36,5 °C (Katzen kühlen schnell aus), Blutdruck nichtinvasiv am Vorderbein.',
      warum: 'Die Katze hat ein kleines Blutvolumen, eine ausgeprägte Neigung zu Hypothermie und einen empfindlichen Larynx — und eine unerkannte Kardiomyopathie ist bei ihr keine Seltenheit. Auskultation vor jeder Narkose.',
      nicht: ['Paracetamol', 'Volumenüberladung', 'Wiederholte Intubationsversuche ohne Lidocain', 'Auskühlen lassen'],
      sources: [Q_AAHA, Q_ACVAA, 'ISFM/AAFP Feline Anaesthesia Guidelines']
    },

    /* ---------------- Katze · Herz ---------------- */
    'hcm-katze': {
      name: 'HCM-Katze (kompensiert) — Narkose erste Wahl', sp: 'katze',
      praemed: 'Butorphanol 0,2–0,4 mg/kg oder Methadon 0,2–0,3 mg/kg + Midazolam 0,2–0,3 mg/kg i.m./i.v. Ruhig arbeiten, Stress vermeiden (Katzenbox abdunkeln) — Katecholamine sind hier das eigentliche Problem.',
      einleitung: 'Alfaxalon 1–2 mg/kg i.v. langsam über 60 s auf Wirkung ODER Etomidat 0,5–2 mg/kg i.v. nach Benzodiazepin-Co-Induktion. Beides erhält die Kontraktilität besser als eine Ketamin-Kombination und macht keine Tachykardie.',
      erhalt: 'Isofluran/Sevofluran so niedrig wie möglich, ergänzt durch Opioid (Fentanyl-CRI 2–5 µg/kg/h) statt hoher MAC — volatile Anästhetika senken vor allem die Nachlast.',
      analgesie: 'Opioid-basiert; Lokalanästhesie wo möglich. NSAID erst bei gesicherter Nierenfunktion und stabilem Blutdruck.',
      ziele: 'HF 120–160/min (nicht höher), MAP 60–80 mmHg, Normovolämie ohne Volumenüberladung, Kristalloide ≤ 2–3 mL/kg/h, Normothermie.',
      warum: 'Bei HCM ist der linke Ventrikel steif und klein. Tachykardie verkürzt die diastolische Füllung, Hypovolämie und Vasodilatation verstärken eine dynamische Ausflussbahn-Obstruktion (SAM). Beides senkt das Herzzeitvolumen sofort.',
      nicht: ['Ketamin als Einleitung (HF↑, Kontraktilität↑, O₂-Bedarf↑)', 'Anticholinergika (Atropin/Glycopyrrolat) routinemäßig — Tachykardie verkürzt die Füllung', 'Volumenbolus „auf Verdacht" (Lungenödem)', 'α2-Agonisten in Standarddosis (Nachlast↑)'],
      sources: [Q_ACVAA, Q_AAHA, Q_BSAVA]
    },
    'hcm-katze-lvoto': {
      name: 'HCM-Katze mit SAM/LVOT-Obstruktion', sp: 'katze',
      praemed: 'Wie kompensierte HCM, aber ohne jede Substanz, die die Herzfrequenz treibt. Sedierung ausreichend tief — Aufregung erzeugt genau die Obstruktion, die man fürchtet.',
      einleitung: 'Etomidat + Midazolam oder Alfaxalon langsam titriert.',
      erhalt: 'Volatiles Anästhetikum niedrig halten; die Vasodilatation verschlimmert die Obstruktion. Blutdruckabfall NICHT mit Dobutamin behandeln, sondern mit einem reinen Vasokonstriktor (Phenylephrin 1–3 µg/kg Bolus bzw. 0,5–2 µg/kg/min) und behutsamer Volumengabe.',
      ziele: 'HF eher niedrig-normal (100–140/min Katze), MAP ≥ 65 mmHg, Vorlast erhalten.',
      warum: 'Bei SAM verengt das Mitralsegel die Ausflussbahn. Alles, was den Ventrikel kleiner macht (Tachykardie, wenig Vorlast, wenig Nachlast, positive Inotropie), verschlimmert die Obstruktion — genau umgekehrt zur üblichen Hypotonie-Behandlung.',
      nicht: ['Dobutamin/positive Inotropika', 'Ketamin', 'Anticholinergika', 'aggressive Vasodilatation'],
      sources: [Q_ACVAA, 'ACVIM-Konsensus feline Kardiomyopathie 2020']
    },
    'hcm-katze-chf': {
      name: 'HCM-Katze mit Herzinsuffizienz/Lungenödem — Narkose nur bei vitaler Indikation', sp: 'katze',
      praemed: 'Wenn irgend möglich VERSCHIEBEN und erst stabilisieren: O₂-Zufuhr in Ruhe, Furosemid 1–2 mg/kg i.v. (bei fulminantem Ödem wiederholen), Thorakozentese bei Erguss. Sedierung minimal (Butorphanol ± Midazolam), Handling auf ein Minimum.',
      einleitung: 'Etomidat + Benzodiazepin; sofort intubieren, IPPV mit PEEP 3–5 cmH₂O.',
      erhalt: 'So kurz wie möglich, Opioid-lastig, volatile Dosis minimal.',
      ziele: 'SpO₂ ≥ 95 %, MAP ≥ 60 mmHg, KEINE Volumenbolusgaben.',
      warum: 'Ein dekompensiertes Herz mit Lungenödem hat unter Narkose kaum Reserve; die Sterblichkeit steigt erheblich. Jede Stunde Vorbereitung zählt mehr als jedes Narkosemittel.',
      nicht: ['Kristalloid-Bolus', 'α2-Agonisten', 'Ketamin', 'Narkose bei planbarem Eingriff ohne Stabilisierung'],
      sources: [Q_ACVAA, Q_AAHA]
    },

    /* ---------------- Hund · Herz ---------------- */
    'dcm-hund': {
      name: 'DCM (Dobermann, Dogge, Wolfshund …) — Narkose erste Wahl', sp: 'hund',
      praemed: 'Methadon 0,2–0,3 mg/kg i.v./i.m. + Midazolam 0,2 mg/kg. Kein Acepromazin bei eingeschränkter Kontraktilität (nicht antagonisierbare Vasodilatation).',
      einleitung: 'Etomidat 0,5–2 mg/kg i.v. nach Benzodiazepin (kreislaufneutral) oder Alfaxalon langsam titriert. Fentanyl 2–5 µg/kg vorab senkt den Bedarf deutlich.',
      erhalt: 'Balanciert: niedrige volatile Dosis + Fentanyl-CRI 3–10 µg/kg/h; Lidocain-CRI 25–50 µg/kg/min beim Hund gleichzeitig antiarrhythmisch und MAC-sparend.',
      analgesie: 'Opioid + Lokalanästhesie. NSAID nur bei stabilem Kreislauf und guter Nierenperfusion.',
      ziele: 'MAP ≥ 70 mmHg, HF 70–110/min, EKG durchgehend (VES!), Dobutamin 2,5–7,5 µg/kg/min bereitlegen.',
      warum: 'Die Kontraktilität ist bereits reduziert; jedes negativ inotrope Anästhetikum wirkt hier stärker als beim Herzgesunden. Ventrikuläre Arrhythmien sind bei okkulter DCM die Regel, nicht die Ausnahme.',
      nicht: ['α2-Agonisten (Nachlast↑, HZV −30–50 %)', 'Propofol-Bolus in voller Dosis', 'Thiobarbiturate', 'Acepromazin in Standarddosis'],
      sources: [Q_ACVAA, 'ACVIM-Konsensus DCM', Q_BSAVA]
    },
    'mmvd-b2': {
      name: 'Mitralklappenerkrankung Stadium B2 (kompensiert)', sp: 'hund',
      praemed: 'Opioid (Methadon 0,2 mg/kg) + Midazolam; niedrig dosiertes Acepromazin 0,01–0,02 mg/kg ist hier vertretbar und senkt die Nachlast (weniger Regurgitationsvolumen).',
      einleitung: 'Propofol oder Alfaxalon langsam auf Wirkung, nach ausreichender Prämedikation.',
      erhalt: 'Balanciert, volatile Dosis niedrig; Normofrequenz halten.',
      ziele: 'MAP 70–100 mmHg, HF normofrequent, Infusion 3–5 mL/kg/h — Volumenüberladung meiden.',
      warum: 'Eine mäßige Nachlastsenkung ist bei Mitralinsuffizienz günstig; Bradykardie und Volumenüberladung sind es nicht.',
      nicht: ['Bradykardie zulassen', 'hohe Volumenraten', 'α2-Agonisten'],
      sources: ['ACVIM-Konsensus MMVD 2019', Q_ACVAA]
    },
    'mmvd-c': {
      name: 'Mitralklappenerkrankung Stadium C/D (dekompensiert)', sp: 'hund',
      praemed: 'Nur Opioid + Benzodiazepin. Herzmedikation am OP-Tag weitergeben (Pimobendan/Furosemid nach Rücksprache).',
      einleitung: 'Etomidat + Midazolam oder sehr langsam titriertes Alfaxalon.',
      erhalt: 'Opioid-lastig, volatile Dosis minimal, IPPV bei Bedarf.',
      ziele: 'MAP ≥ 65 mmHg, keine Volumenbolusgaben, Lungenauskultation intraoperativ.',
      warum: 'Lungenödem-Gefahr und geringe Reserve — Acepromazin ist hier nicht mehr steuerbar.',
      nicht: ['Acepromazin', 'Volumenbolus', 'α2-Agonisten'],
      sources: ['ACVIM-Konsensus MMVD 2019', Q_ACVAA]
    },
    'sas': {
      name: 'Subaortenstenose (Neufundländer, Boxer, Golden, Rottweiler)', sp: 'hund',
      praemed: 'Opioid + Benzodiazepin, ruhige Umgebung.',
      einleitung: 'Etomidat/Alfaxalon titriert; ausreichende Vorlast VOR der Einleitung sichern.',
      erhalt: 'Volatile Dosis niedrig, Blutdruck mit Vasokonstriktor stützen (Phenylephrin/Noradrenalin), nicht mit Inotropika.',
      ziele: 'MAP ≥ 70 mmHg, HF normofrequent bis niedrig, EKG (VES, plötzlicher Herztod ist rassetypisch).',
      warum: 'Der linke Ventrikel arbeitet gegen eine feste Enge. Tachykardie und Vasodilatation senken den Koronarfluss im hypertrophierten Muskel — Ischämie und Kammerarrhythmien folgen.',
      nicht: ['Ketamin', 'Anticholinergika routinemäßig', 'Inotropika bei Hypotonie'],
      sources: [Q_ACVAA, Q_BSAVA]
    },

    /* ---------------- Atemweg ---------------- */
    'boas': {
      name: 'Brachyzephaler Patient (BOAS) — Narkose erste Wahl', sp: 'hund',
      praemed: 'Maropitant 1 mg/kg s.c. + Omeprazol/Esomeprazol 1 mg/kg i.v. (Regurgitations-/Aspirationsprophylaxe). Sedierung ausreichend, aber NIE unbeaufsichtigt: ein sedierter Brachyzephaler verlegt seinen Atemweg selbst. Methadon 0,2–0,3 mg/kg ± Acepromazin 0,01–0,02 mg/kg (löst den Larynxkrampf, senkt Stress).',
      einleitung: '3–5 min präoxygenieren (Flow-by/Maske, kein Stress). Dann zügige i.v.-Einleitung mit sofortiger Intubation — Propofol 2–4 mg/kg oder Alfaxalon 1–3 mg/kg auf Wirkung. Tubusgrößen eine Nummer kleiner UND größer bereit, Absaugung an, Laryngoskop mit Licht, Notfall-Tracheotomieset erreichbar.',
      erhalt: 'Isofluran/Sevofluran; Kopf-Hals gestreckt lagern, Oberkörper leicht hoch.',
      analgesie: 'Opioid + Lokalanästhesie; NSAID nach Bedarf.',
      ziele: 'SpO₂ ≥ 95 %, EtCO₂ 35–45 mmHg, Extubation ERST bei vollständig wachem Schluckreflex und in Bauch-/Brustlage; danach mindestens 2 h engmaschig beobachten (die Obstruktion kommt beim Aufwachen zurück).',
      warum: 'Das Risiko liegt nicht in der Narkose selbst, sondern in den Minuten vor der Intubation und nach der Extubation. Hoher Vagotonus, enge Nasengänge, langes Gaumensegel, oft hypoplastische Trachea, dazu ein hohes Regurgitationsrisiko.',
      nicht: ['unbeobachtete Sedierung', 'frühe Extubation', 'Maskeneinleitung ohne gesicherten Atemweg', 'lange Nüchternzeit ohne Refluxprophylaxe'],
      sources: [Q_AAHA, Q_ACVAA, Q_BSAVA]
    },
    'larynxparalyse': {
      name: 'Larynxparalyse (Labrador, Bouvier, Setter, Riesenrassen)', sp: 'hund',
      praemed: 'Stressfrei, kühl halten. Acepromazin niedrig + Opioid; Doxapram 0,5–1 mg/kg i.v. NUR zur Beurteilung der Larynxfunktion (verstärkt die Bewegung, nicht als Therapie).',
      einleitung: 'Präoxygenieren, Propofol/Alfaxalon titriert, sofort intubieren.',
      erhalt: 'Wie üblich; die kritische Phase ist die Extubation.',
      ziele: 'Ruhiges, kühles, sauerstoffreiches Aufwachen; Sedierung im Aufwachen bewusst beibehalten (Acepromazin/Dexmedetomidin-Mikrodosis), damit das Tier nicht in die Obstruktion hineinhechelt.',
      warum: 'Der Kollaps tritt beim aufgeregten, hechelnden Tier auf — also genau im Aufwachen.',
      nicht: ['unruhiges, warmes Aufwachen', 'frühe Extubation'],
      sources: [Q_ACVAA, Q_BSAVA]
    },
    'trachealkollaps': {
      name: 'Trachealkollaps (Yorkshire, Zwergspitz, Chihuahua, Mops)', sp: 'hund',
      praemed: 'Hustenreiz dämpfen (Butorphanol 0,2–0,4 mg/kg wirkt hier zusätzlich antitussiv), Stress vermeiden.',
      einleitung: 'Präoxygenieren; kleineren Tubus wählen und nicht zu tief schieben.',
      erhalt: 'Beatmungsdruck niedrig halten.',
      ziele: 'Ruhiges Aufwachen, Halsband gegen Geschirr tauschen, ggf. kurzzeitig Glukokortikoid gegen Schleimhautödem.',
      warum: 'Der kollabierende Anteil liegt oft zervikal (Einatmung) oder intrathorakal (Ausatmung); Husten und Aufregung lösen den Zyklus aus.',
      nicht: ['Husten provozieren', 'zu großer Tubus', 'hektisches Aufwachen'],
      sources: [Q_ACVAA, Q_PLUMB]
    },

    /* Artfassungen: greifen automatisch, wenn eine Erkrankung, die es bei mehreren Arten gibt,
       auf das Hundeprotokoll zeigt (siehe protoAdd in breed-genetics.js). */
    'boas-katze': {
      name: 'Brachyzephale Katze (Perser, Exotic) — Narkose erste Wahl', sp: 'katze',
      praemed: 'Stressfrei arbeiten, Opioid + Midazolam. Tränenwege und Nase sind oft verlegt — das Tier atmet ohnehin schon durch das Maul.',
      einleitung: '3–5 min präoxygenieren, dann i.v. titriert (Alfaxalon/Propofol) und zügig intubieren. Kleinere Tubusgrößen bereit, Larynx mit Lidocain besprühen.',
      erhalt: 'Kopf-Hals gestreckt lagern; auf Sekret im Nasenrachenraum achten (absaugen).',
      ziele: 'SpO₂ ≥ 95 %, Extubation erst bei vollem Schluckreflex, danach beobachten — die Nase bleibt nach der Narkose verlegt.',
      warum: 'Die brachyzephale Katze hat dieselbe Enge wie der brachyzephale Hund, aber einen empfindlicheren Larynx und ein kleineres Fehlerfenster. Beim Perser kommt regelmäßig eine PKD dazu.',
      nicht: ['Maskeneinleitung ohne gesicherten Atemweg', 'Frühe Extubation', 'Wiederholte Intubationsversuche ohne Lidocain'],
      sources: [Q_ACVAA, Q_AAHA, 'ISFM/AAFP Feline Anaesthesia Guidelines']
    },
    'mdr1-katze': {
      name: 'ABCB1-Defekt der Katze — was zu beachten ist', sp: 'katze',
      praemed: 'Für die Narkose selbst ändert sich wenig: ZNS-gängige Sedativa und Opioide vorsichtig titrieren und länger überwachen.',
      erhalt: 'Unauffällig.',
      ziele: 'Aufwachphase länger beobachten als üblich.',
      warum: 'Der Defekt betrifft vor allem Antiparasitika, nicht die Anästhetika — die Konsequenz liegt in der Dauermedikation, nicht im OP.',
      nicht: ['Eprinomectin (kontraindiziert, schon in zugelassener Dosis)', 'Ivermectin in hoher oder extralabel-Dosis', 'Selamectin/Moxidectin in hoher Dosis'],
      sources: [Q_CLINI, 'Mealey 2022']
    },

    /* ---------------- Pharmakogenetik ---------------- */
    'mdr1': {
      name: 'MDR1/ABCB1-Defekt — Narkose erste Wahl', sp: 'hund',
      praemed: 'Dosis der ZNS-gängigen Substanzen reduzieren: Acepromazin −25 % (heterozygot) bis −30–50 % (homozygot), Butorphanol ebenso — bei homozygoten Tieren Butorphanol möglichst ganz meiden. Midazolam ist unauffällig.',
      einleitung: 'Propofol und Alfaxalon sind KEINE relevanten P-gp-Substrate und daher unproblematisch — sie sind die Einleitung der Wahl.',
      erhalt: 'Isofluran/Sevofluran normal. Opioide (Methadon/Fentanyl) sind Kat.-2-Substrate: normale Dosis, aber titrieren und länger überwachen.',
      analgesie: 'Opioide in Standarddosis titriert, Lokalanästhesie großzügig, NSAID unauffällig.',
      ziele: 'Aufwachphase deutlich länger beobachten als üblich; Naloxon und Flumazenil griffbereit.',
      warum: 'Ohne P-Glykoprotein an der Blut-Hirn-Schranke reichern sich Substrate im Gehirn an (bis 100-fach). Das betrifft die Sedierungstiefe und -dauer, nicht die Narkose an sich.',
      nicht: ['Ivermectin, Moxidectin, Selamectin, Doramectin, Milbemycin in hoher Dosis (Kat. 1)', 'Loperamid', 'Emodepsid', 'Apomorphin', 'Vincristin/Vinblastin/Doxorubicin/Paclitaxel', 'Butorphanol bei homozygoten Tieren'],
      sources: [Q_CLINI, 'Washington State University VCPL', 'Mealey et al.']
    },
    'sighthound': {
      name: 'Windhund — Narkose erste Wahl', sp: 'hund',
      praemed: 'Acepromazin 0,02–0,03 mg/kg (niedrig, nicht weglassen: hebt die Arrhythmieschwelle) + Opioid. Aktiv wärmen ab jetzt.',
      einleitung: 'Alfaxalon 1–2 mg/kg i.v. ist hier die sauberste Wahl. Propofol geht auch, aber Bolus 25–30 % reduzieren und langsam titrieren.',
      erhalt: 'Inhalationserhalt. KEINE Propofol-CRI/TIVA — die Aufwachphase verlängert sich erheblich (ca. 70 % geringere CYP2B11-Aktivität).',
      analgesie: 'Wie üblich; Lokalanästhesie großzügig, um volatile Dosis zu sparen.',
      ziele: 'Temperatur ≥ 36,5 °C aktiv halten (wenig Körperfett), MAP ≥ 70 mmHg. Hoher Hämatokrit, niedrige Thrombozyten, niedriges T4 und niedriges Albumin sind rassetypisch — keine Pathologie.',
      warum: 'Wenig Fett zum Umverteilen, langsamerer Abbau lipophiler Injektionsanästhetika, dünne Haut, große Oberfläche.',
      nicht: ['Thiobarbiturate (Thiopental)', 'Propofol-TIVA/CRI', 'passives Auskühlen'],
      sources: [Q_ACVAA, 'Court 1999/2019 (CYP2B11)', Q_PLUMB]
    },
    'mh': {
      name: 'Maligne-Hyperthermie-Risiko (RYR1)',
      praemed: 'Stress vermeiden; kein Succinylcholin einplanen. Dantrolen bereitstellen, aufgelöst und für dieses Tier ausgerechnet, BEVOR die Narkose beginnt: 1–3 mg/kg i.v. (MSD Veterinary Manual), CliniPharm nennt 2–3 mg/kg i.v. bzw. 3,5 mg/kg p.o. alle 12 h.',
      einleitung: 'Reine TIVA: Propofol oder Alfaxalon + Opioid ± Ketamin/Benzodiazepin.',
      erhalt: 'TIVA fortführen. Kein Verdampfer am Kreisteil — bei bekanntem Risiko den Kreisteil vorher mit frischem Absorber und 10 min Hochfluss spülen bzw. eine triggerfreie Maschine nutzen.',
      analgesie: 'Opioid + Lokal-/Regionalanästhesie. Nicht-depolarisierende Relaxanzien (Atracurium, Rocuronium) sind sicher.',
      ziele: 'EtCO₂ und Temperatur ununterbrochen — der EtCO₂-Anstieg kommt VOR der Hyperthermie.',
      warum: 'Alle volatilen Inhalationsanästhetika und Succinylcholin sind Trigger einer unkontrollierten Kalziumfreisetzung aus dem sarkoplasmatischen Retikulum.',
      nicht: ['Isofluran/Sevofluran/Desfluran/Halothan', 'Succinylcholin'],
      sources: ['MSD/Merck Veterinary Manual', Q_ACVAA, Q_PLUMB]
    },

    /* ---------------- Gerinnung / Blut ---------------- */
    'vwd': {
      name: 'Von-Willebrand-Erkrankung / Gerinnungsstörung',
      praemed: 'Präoperativ: Blutungsanamnese, bukkale Blutungszeit, vWF:Ag. Bei Typ 1 Desmopressin (DDAVP) 1 µg/kg s.c./langsam i.v. etwa 30 min vor Schnitt. Blutprodukte (Frischplasma/Kryopräzipitat) bereitstellen — bei Typ 2/3 ist DDAVP unzuverlässig.',
      einleitung: 'Frei wählbar; entscheidend ist die Blutstillung, nicht das Hypnotikum.',
      erhalt: 'Normothermie halten (Hypothermie ist selbst eine Gerinnungsstörung), Blutdruck stabil.',
      analgesie: 'Opioide first line. KEINE NSAID perioperativ (zusätzliche Thrombozytenhemmung). Keine i.m.-Injektionen, keine Blindpunktionen, kein Jugularis-Katheter ohne Not.',
      ziele: 'Temperatur ≥ 37 °C, sorgfältige chirurgische Blutstillung, Tranexamsäure 10–15 mg/kg i.v. erwägen.',
      warum: 'Ein vWF-Mangel fällt oft erst unter der OP auf. Alles, was zusätzlich hemmt (NSAID, Hypothermie, Azidose), addiert sich.',
      nicht: ['NSAID/ASS perioperativ', 'i.m.-Injektionen', 'Hypothermie'],
      sources: ['PennGen', Q_PLUMB, Q_ACVAA]
    },
    'anaemie': {
      name: 'Chronische Anämie (PK-/PFK-Mangel, Blutverlust)',
      praemed: 'Hämatokrit prä-OP; Transfusion planen statt improvisieren. Bei PFK-Mangel zusätzlich: Stress, Hyperventilation und Hyperthermie sind Auslöser einer Hämolysekrise.',
      einleitung: 'Dosis reduzieren (kleineres Verteilungsvolumen bei niedrigem Protein), langsam titrieren.',
      erhalt: 'Hohe inspiratorische O₂-Konzentration, Normokapnie — KEINE Hyperventilation bei PFK-Mangel (Alkalose triggert die Hämolyse).',
      ziele: 'SpO₂ ≥ 97 %, Normokapnie (EtCO₂ 35–45), Normothermie, Blutdruck stabil.',
      warum: 'Die Sauerstofftransportkapazität ist schon vor der Narkose eingeschränkt; jede Hypoxämie wirkt sofort.',
      nicht: ['Hyperventilation (bei PFK-Mangel)', 'Hypothermie', 'unnötig lange Narkose'],
      sources: ['PennGen', 'UC Davis VGL', 'eClinPath']
    },

    /* ---------------- Stoffwechsel / Grösse ---------------- */
    'pss': {
      name: 'Portosystemischer Shunt (Yorkshire, Malteser, Mops, Havaneser …)',
      praemed: 'Blutglukose und Gerinnung vorher messen. Kurz wirksame, wenig lebermetabolisierte Substanzen wählen. Benzodiazepine zurückhaltend (können eine hepatische Enzephalopathie verstärken).',
      einleitung: 'Propofol oder Alfaxalon titriert (extrahepatische Elimination) — nicht Barbiturate.',
      erhalt: 'Inhalation (Isofluran/Sevofluran) — sie umgeht die Leber vollständig.',
      analgesie: 'Opioid titriert; Methadon/Fentanyl mit verlängerter Wirkung rechnen.',
      ziele: 'Glukose ≥ 3,5 mmol/L (regelmäßig messen), Normothermie, aktives Wärmen — diese Patienten sind meist klein und jung.',
      warum: 'Verminderte Leberfunktion, niedriges Albumin (mehr freier Wirkstoff), Hypoglykämie- und Enzephalopathieneigung.',
      nicht: ['Barbiturate', 'hohe Benzodiazepin-Dosen', 'lange Nüchternzeit'],
      sources: [Q_ACVAA, Q_BSAVA]
    },
    'toy-hypoglykaemie': {
      name: 'Zwerg-/Toy-Rasse (< 5 kg)',
      praemed: 'Nüchternzeit kurz halten (3–4 h, Welpen/Toys noch kürzer). Glukose messen. Alles verdünnt aufziehen — bei 1,8 kg entscheidet ein Zehntel Milliliter.',
      einleitung: 'Titriert, Spritzenpumpe oder verdünnte Lösung; Tubusgröße klein, Totraum klein halten.',
      erhalt: 'Aktive Wärmung ab Prämedikation (Wärmematte, Warmluft, warme Infusion), Infusionsrate über Spritzenpumpe.',
      ziele: 'Temperatur ≥ 36,5 °C, Glukose ≥ 3,5 mmol/L, Infusion 2–3 mL/kg/h.',
      warum: 'Große Oberfläche im Verhältnis zur Masse, geringe Glykogenreserve, kleine Atemwege — Überdosierung und Auskühlung sind die zwei häufigsten Zwischenfälle.',
      nicht: ['unverdünnte Boli', 'lange Nüchternzeit', 'passives Auskühlen'],
      sources: [Q_AAHA, Q_BSAVA]
    },
    'giant': {
      name: 'Riesenrasse (> 40 kg)',
      praemed: 'Nach MAGERMASSE dosieren, nicht nach dem Waagenwert — sonst ist die Prämedikation regelhaft zu hoch. Prä-OP EKG/Auskultation (DCM, Perikarderguss).',
      einleitung: 'Titriert; erwarteter Bedarf pro kg liegt unter dem des mittelgroßen Hundes.',
      erhalt: 'Lagerung: Polsterung, Myopathie-/Neuropathieprophylaxe, Magendrehung im Aufwachen bedenken (kein großes Futter davor, kein Wälzen).',
      ziele: 'MAP ≥ 70 mmHg, Lagerungsschäden aktiv vermeiden, Aufwachen ruhig und kontrolliert.',
      warum: 'Riesenrassen haben relativ wenig Muskel-/Fettmasse pro Kilogramm Körpergewicht und eine höhere Kardiomyopathie-Prävalenz.',
      nicht: ['Dosis stur nach Körpergewicht', 'unpolsterte harte Lagerung'],
      sources: [Q_AAHA, Q_ACVAA]
    },
    'chondro-ivdd': {
      name: 'Chondrodystropher Patient / Bandscheibenrisiko (Dackel, Franz. Bulldogge, Beagle, Basset, Corgi)',
      praemed: 'Wie üblich; bei akuter Symptomatik Analgesie vor Lagerung.',
      einleitung: 'Frei wählbar.',
      erhalt: 'ENTSCHEIDEND ist die Lagerung: Wirbelsäule gerade führen, beim Umlagern zu zweit, kein Durchhängen, nicht am Hals ziehen, keine überstreckte Rückenlage ohne Unterstützung.',
      ziele: 'MAP ≥ 70 mmHg (Rückenmarksperfusion), Normothermie.',
      warum: 'Verkalkte Bandscheiben (CDDY/FGF4) können unter dem schlaffen Muskeltonus der Narkose bei ungeschicktem Umlagern vorfallen.',
      nicht: ['Ziehen an Hals/Gliedmaßen', 'Umlagern ohne Wirbelsäulenführung'],
      sources: [Q_ACVAA, 'UC Davis VGL (CDDY/CDPA)']
    },
    'niere': {
      name: 'Eingeschränkte Nierenfunktion (PKD-Katze, CNI)',
      praemed: 'Infusion 1–2 h VOR der Narkose beginnen. Elektrolyte/Kalium messen.',
      einleitung: 'Frei wählbar, titriert.',
      erhalt: 'Blutdruck ist hier das Wichtigste: MAP ≥ 70 mmHg (die Nierenautoregulation endet darunter).',
      analgesie: 'Opioid-lastig. NSAID nur bei gesicherter Nierenfunktion, Normovolämie und stabilem Blutdruck — im Zweifel weglassen.',
      ziele: 'MAP ≥ 70 mmHg, Urinproduktion ≥ 1 mL/kg/h, Kalium im Blick.',
      warum: 'Der häufigste vermeidbare Nierenschaden im OP heißt Hypotension, nicht „falsches Medikament".',
      nicht: ['NSAID bei Hypotension/Dehydratation', 'nephrotoxische Kombinationen', 'MAP < 60 mmHg tolerieren'],
      sources: ['IRIS', Q_AAHA, Q_ACVAA]
    },
    'addison': {
      name: 'Hypoadrenokortizismus (Addison)',
      praemed: 'Elektrolyte (Na/K) und Glukose vorher. Bekannte Addison-Patienten am OP-Tag mit Stressdosis Glukokortikoid versorgen (z. B. Hydrocortison 1–2 mg/kg i.v. bzw. Prednisolon-Äquivalent).',
      einleitung: 'Kreislaufneutral (Etomidat NUR mit Kortisonschutz — es hemmt selbst die Kortisolsynthese).',
      erhalt: 'Volumen und Blutdruck aktiv führen.',
      ziele: 'MAP ≥ 70 mmHg, Kalium < 6,0 mmol/L, Glukose normal.',
      warum: 'Ohne Kortisolantwort fehlt dem Kreislauf die Stressreserve — die Hypotonie spricht dann auf Standardmaßnahmen schlecht an.',
      nicht: ['Etomidat ohne Glukokortikoidgabe', 'Narkose bei unbehandelter Krise'],
      sources: [Q_ACVAA, Q_PLUMB]
    },
    'diabetes': {
      name: 'Diabetes mellitus (auch: Degu, Frettchen-Insulinom umgekehrt)',
      praemed: 'Ersten OP-Termin des Tages wählen. Halbe Insulindosis morgens oder nach Klinikschema, Glukose vor Einleitung messen.',
      einleitung: 'Frei wählbar.',
      erhalt: 'Glukose alle 30–60 min messen; Zielband 5–14 mmol/L (nicht scharf normalisieren).',
      ziele: 'Keine Hypoglykämie — sie ist unter Narkose unsichtbar.',
      warum: 'Die Narkose verdeckt jedes klinische Zeichen einer Unterzuckerung.',
      nicht: ['volle Insulindosis ohne Futter', 'Glukose nur einmal messen'],
      sources: [Q_AAHA, Q_PLUMB]
    },
    'epilepsie': {
      name: 'Krampfanamnese / Epilepsie',
      praemed: 'Antikonvulsiva weitergeben (auch am OP-Tag). Acepromazin ist nach heutiger Datenlage NICHT kontraindiziert, die alte Warnung gilt als überholt.',
      einleitung: 'Propofol/Alfaxalon; beide sind antikonvulsiv wirksam.',
      erhalt: 'Wie üblich.',
      ziele: 'Ruhiges Aufwachen, Midazolam 0,2–0,5 mg/kg i.v. griffbereit.',
      warum: 'Der Krampf tritt fast immer im Aufwachen auf, nicht in der Narkose.',
      nicht: ['Antikonvulsiva pausieren', 'Ketamin bei aktivem Krampfleiden in Hochdosis'],
      sources: [Q_ACVAA, Q_PLUMB]
    },

    /* ---------------- Heimtiere ---------------- */
    'kaninchen': {
      name: 'Kaninchen — Narkose erste Wahl', sp: 'kaninchen',
      praemed: 'NICHT nüchtern setzen (Kaninchen können nicht erbrechen; Fasten schadet nur der Darmmotorik) — nur 1 h vorher Futter entfernen, um den Mundraum frei zu bekommen. Midazolam 0,3–0,5 mg/kg + Butorphanol 0,2–0,4 mg/kg i.m., bei Bedarf + Medetomidin 0,05–0,1 mg/kg. Analgesie früh: Meloxicam 0,5–1 mg/kg s.c. (Kaninchen brauchen die obere Spanne).',
      einleitung: 'Präoxygenieren 3–5 min, dann Alfaxalon 1–3 mg/kg i.v. langsam über 60 s (Ohrvene/V. cephalica) — die kontrollierteste Einleitung. Alternative: Isofluran über Maske NUR nach guter Sedierung (unsediertes Kaninchen hält die Luft an und wehrt sich).',
      erhalt: 'Supraglottische Atemwegshilfe (v-gel) oder Intubation (blind über die Kapnografiekurve bzw. per Endoskop); Isofluran/Sevofluran. Kapnografie ist Pflicht — Apnoephasen sind normal.',
      analgesie: 'Meloxicam 1,0 mg/kg s.c./p.o. alle 24 h (die alten 0,3–0,6 mg/kg sind für das Kaninchen zu niedrig) + Buprenorphin 0,03–0,05 mg/kg s.c. alle 6–8 h; Lokalanästhesie großzügig. Prokinetik und frühes Futterangebot direkt nach dem Aufwachen.',
      ziele: 'Temperatur aktiv halten (37,5–39,5 °C — Kaninchen kühlen sehr schnell aus), SpO₂ ≥ 95 %, EtCO₂ 30–45 mmHg, Blutzucker. Innerhalb von 2–4 h nach dem Aufwachen muss das Tier fressen und Kot absetzen.',
      warum: 'Kaninchen haben die höchste narkosebedingte Sterblichkeit der Kleintiere: 1,39 % (1 von 72) gegenüber 0,17 % beim Hund und 0,24 % bei der Katze — CEPSAF, 8209 Kaninchen aus 117 Praxen. Entscheidend ist der Zustand, nicht die Rasse: gesunde Tiere 0,73 %, kranke 7,37 %. Und fast zwei Drittel der Todesfälle passieren NACH dem Eingriff — Hypothermie, Schmerz, Ileus.',
      nicht: ['Nüchtern setzen über Stunden', 'Atropin ohne Wirkungskontrolle (viele Kaninchen bauen es über Atropinesterase sofort ab — Glycopyrrolat 0,01–0,02 mg/kg ist die verlässliche Alternative)', 'Aufwachen ohne aktive Wärmung', 'Penicilline/Lincosamide oral (tödliche Dysbiose)'],
      sources: [Q_BSAVA_EX, 'CEPSAF (Brodbelt 2008)', Q_CARP, 'AEMV']
    },
    'kanin-zwerg': {
      name: 'Zwerg-/Widderkaninchen — zusätzlich beachten', sp: 'kaninchen',
      einleitung: 'Kleiner Kopf, enge Nasengänge: Intubation deutlich schwieriger — supraglottische Atemwegshilfe (v-gel) bevorzugen, Endoskop bereitlegen. Tubus 2,5–3,0 mm ID.',
      ziele: 'Aktive Wärmung ab der Prämedikation — ein 1-kg-Zwergkaninchen kühlt schneller aus als ein 6-kg-Riese. Dosis verdünnt aufziehen. Nach Zahnbehandlung besonders auf Futteraufnahme achten.',
      warum: 'Das Risiko dieser Tiere ist die Größe, nicht die Kopfform: kleines Fehlerfenster bei der Dosis, große Oberfläche im Verhältnis zur Masse, engerer Atemweg. Beim Widderohr ist zusätzlich der Gehörgang häufiger betroffen (Otitis, Zerumenstau) — das ist besser belegt als der oft behauptete Zusammenhang mit Zahnerkrankungen.',
      nicht: ['Blindes Intubieren erzwingen', 'Unverdünnte Boli', 'Passives Auskühlen'],
      sources: [Q_BSAVA_EX, 'Johnson & Burn 2019 (Ohrbefunde)', 'Jackson et al. 2024, Vet Record']
    },
    'kanin-widder': {
      name: 'Widderkaninchen (Lop) — zusätzlich beachten', sp: 'kaninchen',
      praemed: 'Ohren vor jeder Narkose ansehen: bei Widdern ist der Gehörgang enger und häufiger mit Zerumen gefüllt oder entzündet. Eine schmerzhafte Otitis erklärt oft, warum das Tier vor dem Eingriff schon schlecht frisst.',
      ziele: 'Wenn ohnehin narkotisiert wird: Gelegenheit für die Otoskopie/Ohrspülung nutzen — eine zweite Narkose ist beim Kaninchen das größere Risiko.',
      warum: 'Der gut belegte Widder-Befund ist das Ohr, nicht der Zahn. Zahnerkrankung ist beim Kaninchen häufig (15,4 %), aber die größte Untersuchung findet Schlappohr und Kurzkopf NICHT als Risikofaktor — dafür das Alter.',
      nicht: ['Von der Ohrform auf die Zähne schließen', 'Zwergrassen-Dosisdenken bei einem 5-kg-Widder'],
      sources: ['Johnson & Burn 2019', 'Jackson et al. 2024, Vet Record', Q_BSAVA_EX]
    },
    'meerschwein': {
      name: 'Meerschweinchen — Narkose erste Wahl', sp: 'meerschwein',
      praemed: 'Nicht nüchtern setzen (max. 1 h). Vitamin-C-Status bedenken. Midazolam 0,5–1 mg/kg + Butorphanol 0,2–0,4 mg/kg i.m. Analgesie: Meloxicam 0,5 mg/kg s.c.',
      einleitung: 'Präoxygenieren; Isofluran über Maske nach Sedierung, oder Alfaxalon 2–5 mg/kg i.v./i.m. Ketamin 20–40 mg/kg + Medetomidin 0,3–0,5 mg/kg i.m. ist eine belegte Alternative.',
      erhalt: 'Maske oder supraglottische Hilfe — die Intubation ist wegen des Palatalostiums (Gaumenverschluss) sehr schwierig und sollte nur mit Endoskop versucht werden.',
      analgesie: 'Meloxicam + Buprenorphin 0,03–0,05 mg/kg s.c.',
      ziele: 'Aktive Wärmung, Blutzucker, frühes Futterangebot (Ileusgefahr wie beim Kaninchen).',
      warum: 'Meerschweinchen halten Futter im Rachen zurück — deshalb Mundhöhle vor der Einleitung ausspülen/kontrollieren, sonst Aspiration.',
      nicht: ['Blindintubation', 'Penicillin, Ampicillin, Amoxicillin, Clindamycin, Lincomycin, Erythromycin (tödliche Dysbiose)', 'langes Fasten'],
      sources: [Q_BSAVA_EX, Q_CARP, Q_CLINI]
    },
    'chinchilla': {
      name: 'Chinchilla — Narkose erste Wahl', sp: 'chinchilla',
      praemed: 'Kein langes Fasten. Midazolam 0,5–1 mg/kg + Butorphanol 0,2–0,4 mg/kg i.m.',
      einleitung: 'Isofluran über Maske nach Sedierung oder Alfaxalon i.v./i.m.; Ketamin 20–40 mg/kg + Medetomidin 0,1–0,2 mg/kg i.m.',
      erhalt: 'Maske/supraglottisch; Kapnografie.',
      ziele: 'Temperatur aktiv halten, aber NICHT überwärmen — Chinchillas sind hitzeempfindlich (über 25 °C Umgebungstemperatur droht Hitzschlag). Futter- und Kotkontrolle nach dem Aufwachen.',
      warum: 'Sehr dichtes Fell, kleine Körpermasse, empfindliche Darmflora.',
      nicht: ['Überwärmung', 'Fellrutschen provozieren (grobes Festhalten löst ganze Fellbüschel — Handling minimal)', 'Penicilline/Lincosamide'],
      sources: [Q_BSAVA_EX, Q_CARP]
    },
    'degu': {
      name: 'Degu — Narkose erste Wahl', sp: 'degu',
      praemed: 'Blutzucker VORHER messen: Degus neigen zu spontanem Diabetes mellitus mit Katarakt. Kein langes Fasten. Midazolam + Butorphanol i.m.',
      einleitung: 'Isofluran über Maske nach Sedierung; Alfaxalon i.v. bei Zugang.',
      erhalt: 'Maske; Kapnografie und Temperatur.',
      ziele: 'Glukose engmaschig, Wärmung, frühes Futterangebot.',
      warum: 'Der Diabetes ist bei dieser Art rassetypisch häufig und unter Narkose nicht zu erkennen. Zusätzlich: Schwanzabwurf beim Festhalten am Schwanz.',
      nicht: ['Am Schwanz greifen', 'Zuckerreiche Infusion ohne Messung', 'Penicilline/Lincosamide'],
      sources: [Q_CARP, Q_BSAVA_EX, Q_CLINI]
    },
    'frettchen': {
      name: 'Frettchen — Narkose erste Wahl', sp: 'frettchen',
      praemed: 'Nüchternzeit MAXIMAL 3–4 h (sehr kurze Darmpassage, Hypoglykämiegefahr). Blutzucker vor Einleitung. Prä-OP Auskultation/Echo — Kardiomyopathie ist häufig. Midazolam 0,2–0,3 mg/kg + Butorphanol 0,2–0,4 mg/kg oder Methadon 0,1–0,2 mg/kg i.m.',
      einleitung: 'Alfaxalon 2–4 mg/kg i.v. langsam oder Propofol 2–4 mg/kg i.v.; Maskeneinleitung mit Isofluran nach Sedierung möglich.',
      erhalt: 'Intubation ist gut möglich (Tubus 2,0–3,5 mm ohne Cuff); Isofluran/Sevofluran.',
      analgesie: 'Buprenorphin 0,01–0,03 mg/kg s.c. alle 8–12 h, Meloxicam 0,2 mg/kg.',
      ziele: 'Glukose ≥ 4 mmol/L messen und halten, Temperatur aktiv, Blutdruck. Nach dem Aufwachen früh füttern.',
      warum: 'Insulinom ist beim Frettchen häufig: eine lange Nüchternzeit erzeugt dann eine Hypoglykämie, die in Narkose nicht auffällt und als „wacht nicht auf" endet.',
      nicht: ['Fasten über Nacht', 'Glukose nicht messen', 'Aleutian-Verdacht ignorieren'],
      sources: [Q_BSAVA_EX, Q_CARP, 'AEMV']
    },

    /* ---------------- Reptilien ---------------- */
    'reptil': {
      name: 'Reptil — Narkosegrundsätze (alle Gruppen)', sp: 'reptil',
      praemed: 'Tier VOR und WÄHREND der Narkose in seinem Vorzugstemperaturbereich (POTZ) halten — bei zu kühlem Tier flutet nichts an und nichts wieder ab. Midazolam 0,5–1 mg/kg i.m. ± Butorphanol/Morphin (μ-Opioide wirken bei Schildkröten besser als bei Schlangen).',
      einleitung: 'Alfaxalon 5–10 mg/kg i.v. (Vena coccygea/jugularis) bzw. 10–20 mg/kg i.m. ist das Mittel der Wahl. Propofol 5–10 mg/kg i.v. Ketamin 5–10 mg/kg + Medetomidin 0,05–0,15 mg/kg i.m. bei fehlendem Venenzugang.',
      erhalt: 'IMMER intubieren — die Trachealringe sind vollständig geschlossen, deshalb Tubus OHNE Cuff. IPPV mit 2–6 Atemzügen/min, Druck 4–8 cmH₂O. Isofluran/Sevofluran niedrig.',
      analgesie: 'Lokalanästhesie großzügig; Meloxicam 0,2–0,5 mg/kg.',
      ziele: 'Doppler statt Pulsoxymetrie (SpO₂ ist bei Reptilien unzuverlässig — Blutshunts und andere Hämoglobinaffinität). Herzfrequenz per Doppler/Ultraschall überwachen. Temperatur ist der wichtigste Messwert überhaupt.',
      warum: 'Reptilien vertragen lange Apnoe und haben intrakardiale Shunts. Beides macht die Narkosetiefe schwer steuerbar; Temperatur und Beatmung steuern das Aufwachen mehr als die Dosis.',
      nicht: ['Reine Sauerstoffbeatmung bis zum Schluss (der Atemantrieb ist hypoxisch gesteuert — auf Raumluft umstellen, um das Aufwachen einzuleiten)', 'Tubus mit Cuff', 'Atropin gegen Bradykardie erwarten (wirkt bei vielen Reptilien nicht)', 'Injektion in die hintere Körperhälfte bei renal ausgeschiedenen Wirkstoffen (renales Pfortadersystem)'],
      sources: ['BSAVA Manual of Reptiles', Q_CARP, 'ARAV/ExoticsCon', 'Vet Anaesth Analg – reptile anaesthesia reviews']
    },
    'reptil-schlange': {
      name: 'Schlange — Besonderheiten', sp: 'reptil',
      einleitung: 'Alfaxalon in die vordere Körperhälfte (Herz liegt im ersten Körperdrittel). Zugang über die Vena coccygea (ventral, Schwanz) oder Herzpunktion nur durch Geübte.',
      erhalt: 'Intubation sehr einfach (Glottis weit vorn am Mundboden). IPPV 2–4/min.',
      ziele: 'Aufwachen dauert oft Stunden — Tier warm, feucht und beobachtet halten.',
      warum: 'Der Atemantrieb kehrt erst zurück, wenn der CO₂-Partialdruck steigt.',
      nicht: ['Wirkstoffe in die hintere Körperhälfte', 'zu früh extubieren'],
      sources: ['BSAVA Manual of Reptiles', Q_CARP]
    },
    'reptil-echse': {
      name: 'Echse — Besonderheiten', sp: 'reptil',
      einleitung: 'Alfaxalon i.v. Vena ventralis coccygea oder V. cephalica; i.m. in den Vorderextremitäten-Muskel.',
      erhalt: 'Intubation gut möglich; Vorsicht: Bartagamen/Leguane haben eine sehr kurze Trachea, Tubus nicht zu tief.',
      ziele: 'Temperatur 28–35 °C je nach Art halten.',
      nicht: ['Schwanz beim Handling greifen (Autotomie bei Geckos, Skinken)'],
      sources: ['BSAVA Manual of Reptiles', Q_CARP]
    },
    'reptil-schildkroete': {
      name: 'Schildkröte — Besonderheiten', sp: 'reptil',
      praemed: 'Schildkröten halten die Luft besonders lange an; Maskeneinleitung funktioniert praktisch nicht — immer injizieren.',
      einleitung: 'Alfaxalon 5–10 mg/kg i.v. (Vena jugularis/Sinus subcarapacialis) oder Propofol i.v.; i.m. Alfaxalon 10–20 mg/kg in die Vorderextremität.',
      erhalt: 'Intubieren und IPPV 2–4/min — ohne Beatmung wacht die Schildkröte kaum auf.',
      ziele: 'Kopf muss zum Intubieren aus dem Panzer gezogen werden; Doppler am Vorderbein. Aufwachen kann viele Stunden dauern.',
      warum: 'Ausgeprägte Apnoetoleranz und Rechts-links-Shunt.',
      nicht: ['Maskeneinleitung', 'Beatmung mit reinem Sauerstoff bis zum Schluss'],
      sources: ['BSAVA Manual of Reptiles', Q_CARP, 'ARAV']
    }
  };

  /* ---------------------------------------------------------------- RETTUNG */
  var RESCUE = {
    'alpha2-ueberdosis': {
      name: 'α2-Agonist zu viel (Medetomidin/Dexmedetomidin/Xylazin) — Bradykardie mit hohem Blutdruck',
      zeichen: 'Herzfrequenz stark abgefallen, Blutdruck HOCH (nicht niedrig), blasse bis graue Schleimhäute, verlängerte KFZ, AV-Block II°, Tier tief sediert.',
      schritte: [
        'Erst denken, dann spritzen: hoher Blutdruck + niedrige Frequenz = REFLEX-Bradykardie auf die periphere Gefäßverengung. Das Herz macht hier nichts falsch.',
        '100 % Sauerstoff geben, Narkosegas reduzieren.',
        'Wenn nur die Sedierung stört: abwarten und überwachen — die Frequenz normalisiert sich mit dem Abklingen der Vasokonstriktion.',
        'Wenn Umkehr nötig: Atipamezol i.m. — Faustregel gleiche Volumenmenge wie das gegebene Medetomidin (Antisedan 5 mg/mL gegen Domitor 1 mg/mL), bei Dexmedetomidin etwa das 10-fache der Dexmed-µg/kg-Dosis. I.m. statt i.v.: i.v. erzeugt Blutdruckabfall und Erregung.',
        'Bei Xylazin zusätzlich möglich: Yohimbin 0,1 mg/kg i.v. langsam.',
        'Blutdruck und EKG weiter überwachen — nach der Umkehr kann der Druck rasch abfallen.'
      ],
      nicht: ['Atropin oder Glycopyrrolat! Bei bestehender α2-Vasokonstriktion erzeugt das schwere Hypertonie und ventrikuläre Extrasystolen — die gefährlichste Standardreaktion in dieser Lage.', 'Weitere α2-Gabe „weil es nicht wirkt"'],
      sources: [Q_ACVAA, 'Clinician’s Brief – Anticholinergics with Alpha-2 Agonists', Q_PLUMB]
    },
    'opioid-ueberhang': {
      name: 'Opioid-Überhang — Atemdepression, wacht nicht auf',
      zeichen: 'Atemfrequenz niedrig, EtCO₂ steigt, enge Pupillen (Hund), Bradykardie, tiefe Sedation trotz abgestelltem Narkosegas.',
      schritte: [
        'Beatmen (IPPV) und 100 % Sauerstoff — das behebt das akute Problem sofort, der Antagonist ist der zweite Schritt.',
        'Naloxon verdünnen (1 mL auf 10 mL NaCl) und TITRIEREN: 0,01–0,04 mg/kg i.v. in 0,5-mL-Schritten alle 30–60 s bis die Atmung kommt.',
        'Bei reinem μ-Agonisten und erhaltener Analgesiepflicht: Butorphanol 0,1–0,2 mg/kg i.v. hebt die Atemdepression teilweise auf und lässt eine Restanalgesie stehen.',
        'Naloxon wirkt kürzer als Methadon/Morphin — mindestens 60–90 min weiter überwachen, ggf. nachdosieren oder als CRI.',
        'Wärme halten; Hypothermie verlängert jede Opioidwirkung.'
      ],
      nicht: ['Naloxon als vollen Bolus (schlagartige Schmerzen, Erregung, Katecholaminspitze, Lungenödem beschrieben)', 'Antagonisieren und dann unbeobachtet lassen'],
      sources: [Q_PLUMB, Q_ACVAA, Q_AAHA]
    },
    'benzo-ueberhang': {
      name: 'Benzodiazepin-Überhang (Midazolam/Diazepam)',
      zeichen: 'Anhaltende Sedation, Muskelschwäche, Ataxie im Aufwachen, besonders bei Lebererkrankung oder Katze.',
      schritte: [
        'Sauerstoff, Wärme, abwarten — meist reicht das.',
        'Flumazenil 0,01–0,02 mg/kg i.v. langsam titriert, wenn eine rasche Umkehr nötig ist.',
        'Wirkdauer von Flumazenil ist kurz (ca. 1 h) — Rückfall in die Sedation ist möglich, weiter überwachen.'
      ],
      nicht: ['Flumazenil bei bekanntem Krampfleiden ohne Not (Krampfschwelle sinkt)'],
      sources: [Q_PLUMB, Q_ACVAA]
    },
    'ace-hypotension': {
      name: 'Acepromazin-Hypotension — nicht antagonisierbar',
      zeichen: 'MAP fällt und bleibt tief, Schleimhäute blass, Tier tief sediert; oft Stunden anhaltend.',
      schritte: [
        'Narkosegas so weit wie möglich zurücknehmen (Isofluran ist meist der größere Anteil der Hypotonie).',
        'Kristalloid-Bolus 5–10 mL/kg über 10–15 min beim Hund (Katze 3–5 mL/kg), Wirkung neu messen.',
        'Wenn das nicht reicht: Vasokonstriktor. Phenylephrin 1–3 µg/kg i.v. Bolus oder 0,5–2 µg/kg/min, alternativ Noradrenalin 0,05–0,3 µg/kg/min. Der Wirkmechanismus ist eine α1-Blockade — ein Vasokonstriktor ist die logische Gegenmaßnahme.',
        'Ephedrin 0,05–0,2 mg/kg i.v. ist die einfache Alternative ohne Spritzenpumpe.',
        'Aktiv wärmen; Hypothermie verstärkt die Vasodilatation und verlängert die Wirkung.',
        'Geduld: Acepromazin wirkt 4–8 h und hat KEIN Gegenmittel.'
      ],
      nicht: ['Auf einen Antagonisten warten — es gibt keinen', 'Atropin (behebt die Vasodilatation nicht)'],
      sources: [Q_PLUMB, Q_ACVAA, Q_BSAVA]
    },
    'ketamin-hcm': {
      name: 'Ketamin bei HCM-Katze — Dekompensation / Lungenödem',
      zeichen: 'Herzfrequenz schießt hoch, Blutdruck fällt, Systolikum lauter, EtCO₂ fällt, feuchte Rasselgeräusche, schaumiger Auswurf am Tubus, SpO₂ sinkt.',
      schritte: [
        'Infusion SOFORT stoppen — jeder weitere Milliliter verschlechtert die Lage.',
        '100 % Sauerstoff, beatmen, PEEP 3–5 cmH₂O.',
        'Frequenz senken: Esmolol 0,1–0,5 mg/kg i.v. sehr langsam titriert (kurz wirksam, gut steuerbar), bei Bedarf CRI 25–200 µg/kg/min. Volatile Dosis anpassen.',
        'Furosemid 1–2 mg/kg i.v. bei Lungenödem, bei fulminantem Verlauf nach 20–30 min wiederholen.',
        'Wenn zusätzlich eine Ausflussbahnobstruktion (SAM) besteht: Blutdruck NUR mit Phenylephrin stützen, nicht mit Dobutamin.',
        'Eingriff so schnell wie vertretbar beenden, Katze im Sauerstoffkäfig aufwachen lassen.'
      ],
      nicht: ['Volumenbolus geben', 'Dobutamin/positive Inotropika', 'Atropin/Glycopyrrolat', 'weiteres Ketamin'],
      sources: [Q_ACVAA, 'ACVIM-Konsensus feline Kardiomyopathie 2020', Q_PLUMB]
    },
    'propofol-apnoe': {
      name: 'Apnoe/Hypotension nach Propofol- oder Alfaxalon-Bolus',
      zeichen: 'Keine Atembewegung nach Einleitung, EtCO₂-Kurve fehlt, MAP fällt.',
      schritte: [
        'Intubieren und beatmen — 8–12 mL/kg Atemzugvolumen, 8–12/min, bis der Eigenantrieb zurückkommt.',
        'Keine weitere Bolusgabe; die Apnoe ist dosis- und geschwindigkeitsabhängig.',
        'Blutdruck: Narkosegas reduzieren, Kristalloidbolus 5–10 mL/kg (Hund) bzw. 3–5 mL/kg (Katze).',
        'Nächstes Mal: über 60–90 s titrieren statt als Bolus.'
      ],
      nicht: ['Doxapram als Ersatz für Beatmung (erhöht nur den O₂-Bedarf)'],
      sources: [Q_ACVAA, Q_BSAVA]
    },
    'mh-krise': {
      name: 'Maligne Hyperthermie — Krise',
      zeichen: 'EtCO₂ steigt plötzlich und ist mit Beatmung nicht zu senken (ERSTES Zeichen), dann Tachykardie, Muskelrigidität, Temperatur steigt schnell, dunkles Blut, Azidose, Hyperkaliämie, Myoglobinurie.',
      schritte: [
        'Volatiles Anästhetikum SOFORT abstellen, Verdampfer abnehmen; auf TIVA umstellen.',
        'Frischgasfluss auf Maximum, Schlauchsystem und Absorber wechseln (das alte System gibt weiter Trigger ab).',
        '100 % Sauerstoff, Hyperventilation (2–3-faches Minutenvolumen) gegen die CO₂-Last.',
        'Dantrolen 1–3 mg/kg i.v. (CliniPharm: 2–3 mg/kg), wiederholen bis Wirkung, bis etwa 5–10 mg/kg gesamt — das einzige kausale Mittel.',
        'Aktiv kühlen: kalte Infusion, Alkohol/Wasser an Pfoten und Bauch, Ventilator. Bei 39 °C aufhören zu kühlen (Unterkühlung droht).',
        'Azidose und Hyperkaliämie behandeln (Natriumbicarbonat nach Blutgas, Glukose-Insulin oder Kalziumglukonat bei EKG-Veränderungen).',
        'Eingriff abbrechen; Nierenschutz durch Diurese (Myoglobin).'
      ],
      nicht: ['Weiter mit demselben Kreisteil arbeiten', 'Kühlen erst bei 41 °C beginnen', 'Kalziumkanalblocker zusammen mit Dantrolen'],
      sources: ['MSD/Merck Veterinary Manual', Q_ACVAA, Q_PLUMB]
    },
    'last': {
      name: 'Lokalanästhetika-Intoxikation (LAST) — nach Blocks/Infiltration',
      zeichen: 'Zunge/Gesichtszucken, Unruhe, Krampf, dann Bradykardie, breite QRS, ventrikuläre Arrhythmien, Kreislaufstillstand. Bupivacain ist am gefährlichsten.',
      schritte: [
        'Injektion sofort stoppen, Atemweg sichern, 100 % Sauerstoff, beatmen.',
        'Krampf durchbrechen: Midazolam 0,2–0,5 mg/kg i.v. (nicht Propofol in großer Dosis bei Kreislaufinstabilität).',
        'Lipidemulsion 20 %: Bolus 1,5 mL/kg i.v. über 1 min, danach 0,25 mL/kg/min über 30–60 min. Bei anhaltender Instabilität Bolus einmal wiederholen. Höchstdosis etwa 10 mL/kg in 30 min.',
        'Bei Reanimationsbedarf: RECOVER-Ablauf, Adrenalin in NIEDRIGER Dosis (≤ 0,01 mg/kg) — hohe Dosen verschlechtern das Ergebnis bei LAST.',
        'Lange überwachen: Bupivacain-Kardiotoxizität kann wiederkehren.'
      ],
      nicht: ['Lidocain als Antiarrhythmikum geben (es IST das Problem)', 'Vasopressin, Kalziumkanalblocker, Betablocker in dieser Lage'],
      sources: ['ASRA LAST-Checkliste (auf die Tiermedizin übertragen)', Q_ACVAA, Q_PLUMB]
    },
    'ivermectin-mdr1': {
      name: 'Makrozyklisches Lakton beim MDR1-Hund (Ivermectin/Moxidectin/Selamectin)',
      zeichen: 'Ataxie, Mydriasis, Speicheln, Blindheit, Tremor, Koma, Atemdepression — Beginn oft erst Stunden nach der Gabe, Dauer Tage bis Wochen.',
      schritte: [
        'Bei kürzlich oraler Aufnahme: Aktivkohle 1–2 g/kg, ggf. wiederholt (enterohepatischer Kreislauf).',
        'Lipidemulsion 20 %: Bolus 1,5 mL/kg i.v. über 1 min, dann 0,25 mL/kg/min über 30–60 min; bei Bedarf über Tage wiederholen — bindet den fettlöslichen Wirkstoff.',
        'Intensive Pflegetherapie: Atemweg sichern und beatmen, wenn nötig; Infusion, Ernährung (Sonde), Augensalbe, Umlagern, Blasenmanagement. Die Genesung dauert Tage bis Wochen.',
        'Krampf/Erregung mit Benzodiazepin behandeln.',
        'Beim nächsten Mal MDR1-Test vor der Gabe.'
      ],
      nicht: ['„Abwarten, es wird schon" — die Atemdepression kommt verzögert', 'Weitere ZNS-dämpfende Substanzen ohne Beatmungsmöglichkeit'],
      sources: [Q_CLINI, 'Washington State University VCPL', Q_PLUMB]
    },
    'anaphylaxie': {
      name: 'Anaphylaxie/Anaphylaktoide Reaktion in Narkose',
      zeichen: 'Plötzlicher Blutdruckabfall, Tachykardie, Bronchospasmus (steigender Beatmungsdruck, fallendes EtCO₂), Quaddeln, Gesichtsödem; beim Hund oft Leberstauung/Erbrechen.',
      schritte: [
        'Auslöser stoppen (Infusion, Antibiotikum, Kolloid, Blutprodukt).',
        'Adrenalin 0,01 mg/kg i.v. (1:10 000 verdünnt) langsam, wiederholen alle 2–5 min; bei Herzstillstand nach RECOVER.',
        'Kristalloid-Bolus 10–20 mL/kg (Hund), 5–10 mL/kg (Katze) — bei Anaphylaxie ist Volumen richtig.',
        '100 % Sauerstoff, beatmen; bei Bronchospasmus zusätzlich Salbutamol/Terbutalin.',
        'Zweite Linie: Dexamethason 0,1–0,25 mg/kg i.v. und ein H1-Blocker (Diphenhydramin 1–2 mg/kg i.m.) — beide wirken NICHT akut, sondern gegen die zweite Welle.',
        '12–24 h überwachen (biphasischer Verlauf).'
      ],
      nicht: ['Auf Kortison als Sofortmaßnahme setzen', 'Adrenalin unverdünnt i.v.'],
      sources: [Q_ACVAA, Q_PLUMB, 'MSD Veterinary Manual']
    },
    'hypothermie': {
      name: 'Hypothermie unter 35 °C',
      zeichen: 'Bradykardie, niedriger Blutdruck, Narkose „vertieft sich" von selbst, verzögertes Aufwachen, Gerinnung schlechter, Zittern im Aufwachen.',
      schritte: [
        'Narkosegas reduzieren — der Bedarf sinkt mit der Temperatur (MAC fällt etwa 5 % pro °C).',
        'Warmluftdecke, Wärmematte, warme Infusion (38–40 °C), Kopf und Pfoten abdecken, Atemgas anwärmen/befeuchten.',
        'Nasse Bereiche trocknen; Alkohol/Desinfektion sparsam (Verdunstungskälte).',
        'Aktiv weiterwärmen bis 37 °C, auch im Aufwachraum.',
        'Nicht extubieren, bevor die Temperatur wieder steigt.'
      ],
      nicht: ['Nur passiv zudecken', 'Wärmflasche direkt auf die Haut (Verbrennung beim narkotisierten Tier)'],
      sources: [Q_AAHA, Q_ACVAA]
    },
    'hypoglykaemie': {
      name: 'Hypoglykämie (Zwergrasse, Welpe, Frettchen mit Insulinom, PSS, Degu)',
      zeichen: 'Wacht nicht auf, Muskelzucken, Krampf, Bradykardie — unter Narkose ohne Messung NICHT erkennbar.',
      schritte: [
        'Blutzucker messen (nicht raten).',
        'Glukose 50 % 1:4 verdünnen und 0,5–1 mL/kg der verdünnten Lösung langsam i.v. über 5 min geben (entspricht etwa 0,25–0,5 g/kg).',
        'Danach glukosehaltige Dauerinfusion 2,5–5 % und alle 30 min nachmessen.',
        'Ursache klären: zu lange nüchtern, Insulinom, Leber-Shunt, Sepsis, Insulinüberdosierung.',
        'Beim Frettchen mit Insulinom: nie über Nacht nüchtern, Dextrose-Infusion schon ab Prämedikation.'
      ],
      nicht: ['Unverdünnte 50%-Glukose als Bolus (venöse Reizung, Rebound-Insulinausschüttung)', 'Ohne Messung „vorsichtshalber" Glukose geben und die Ursache nicht suchen'],
      sources: [Q_PLUMB, Q_BSAVA_EX, Q_AAHA]
    },
    'hyperkaliaemie': {
      name: 'Hyperkaliämie / bradykarde Rhythmusstörung',
      zeichen: 'Bradykardie, hohe spitze T-Welle, flache oder fehlende P-Welle, breiter QRS bis zur Sinuswelle — typisch bei Harnröhrenverschluss (Kater), Addison, Reperfusion.',
      schritte: [
        'Kalziumglukonat 10 % 0,5–1,5 mL/kg i.v. langsam über 5–10 min unter EKG — schützt das Herz sofort, senkt aber das Kalium NICHT.',
        'Kalium verschieben: Glukose 0,5 g/kg i.v. ± Regularinsulin 0,25–0,5 IE/kg (danach Glukose weiter infundieren und messen).',
        'Ursache beheben: Blase entlasten, Volumen, bei Addison Glukokortikoid.',
        'Natriumbicarbonat nur bei nachgewiesener schwerer Azidose.'
      ],
      nicht: ['Kaliumhaltige Infusion weiterlaufen lassen', 'Kalzium ohne EKG geben'],
      sources: [Q_PLUMB, 'IRIS', Q_ACVAA]
    },
    'regurgitation': {
      name: 'Regurgitation / Aspiration unter Narkose',
      zeichen: 'Flüssigkeit im Rachen oder aus der Nase, Husten beim Aufwachen, später Fieber und Atemnot. Brachyzephale und große Hunde sind am häufigsten betroffen.',
      schritte: [
        'Kopf tief lagern, sofort absaugen — Tubus NICHT ziehen (der Cuff schützt gerade).',
        'Ösophagus mit lauwarmem Wasser spülen und absaugen, danach mit verdünntem Natriumbicarbonat neutralisieren (gegen Ösophagitis/Striktur).',
        'Erst bei vollem Schluckreflex extubieren, mit teilweise geblocktem Cuff, Kopf tief.',
        'Bei Aspirationsverdacht: Sauerstoff, Röntgen nach 6–12 h, Antibiose NUR bei nachgewiesener Infektion (nicht prophylaktisch).',
        'Prophylaxe fürs nächste Mal: Maropitant, Omeprazol, kürzere Nüchternzeit.'
      ],
      nicht: ['Tubus sofort ziehen', 'Blind mit Antibiotika behandeln', 'Kopf hochlagern'],
      sources: [Q_AAHA, Q_ACVAA, Q_BSAVA]
    },
    'nicht-aufwachen': {
      name: 'Patient wacht nicht auf — geordnet durchgehen',
      zeichen: 'Narkosegas ist aus, aber keine Reflexe, keine Spontanatmung, Zeit vergeht.',
      schritte: [
        'Temperatur messen — Hypothermie ist die häufigste Ursache. Aktiv wärmen.',
        'Blutzucker messen.',
        'Beatmung und EtCO₂ prüfen: hohe CO₂-Werte narkotisieren selbst; zu starke Hyperventilation nimmt den Atemantrieb.',
        'Blutdruck und Perfusion prüfen (MAP ≥ 70 mmHg).',
        'Restwirkung antagonisieren, wo möglich: Atipamezol (α2), Naloxon titriert (Opioid), Flumazenil (Benzodiazepin).',
        'Elektrolyte/Kalzium, Anämie, Leberfunktion bedenken; Windhunde und MDR1-Hunde brauchen schlicht länger.',
        'Neurologische Ursache (Hypoxie, intrakranieller Druck, Krampfstatus) erst zuletzt annehmen — und dann untersuchen, nicht raten.'
      ],
      nicht: ['Doxapram als Standardantwort', 'Warten ohne zu messen'],
      sources: [Q_ACVAA, Q_AAHA, Q_BSAVA]
    },
    'cpr': {
      name: 'Herz-Kreislauf-Stillstand in Narkose (RECOVER)',
      zeichen: 'Kein Puls, EtCO₂ fällt schlagartig unter 10–15 mmHg, keine Herztöne, Agonalatmung.',
      schritte: [
        'Sofort Thoraxkompressionen: 100–120/min, Eindrücktiefe ⅓ bis ½ des Brustkorbdurchmessers, 2-Minuten-Zyklen ohne Unterbrechung. Hund > 15 kg breitseitig über dem Herzen, tonnenförmige Brustkörbe (Bulldogge) in Rückenlage über dem Brustbein, Katze/kleiner Hund einhändig über dem Herzen.',
        'Intubieren und beatmen: 10 Atemzüge/min, NICHT hyperventilieren.',
        'Alle Narkosemittel aus, Gaszufuhr null.',
        'Adrenalin 0,01 mg/kg i.v./i.o. alle 3–5 min (jeder zweite Zyklus). Hohe Dosis (0,1 mg/kg) erst nach längerer erfolgloser Reanimation.',
        'Vasopressin 0,8 IE/kg i.v. ist gleichwertig einsetzbar.',
        'Bei Asystolie/pulsloser elektrischer Aktivität mit vagalem Auslöser: Atropin 0,04 mg/kg i.v.',
        'Bei Kammerflimmern: defibrillieren (monophasisch 4–6 J/kg, biphasisch 2–4 J/kg), sofort danach 2 min weiter komprimieren.',
        'Reversible Ursachen abarbeiten: Hypovolämie, Hypoxie, Hypothermie, Hypo-/Hyperkaliämie, Azidose, Narkoseüberdosierung (antagonisieren!), Spannungspneumothorax, Perikardtamponade.',
        'EtCO₂ ist der beste Erfolgsmesser: unter 15 mmHg ist die Kompression zu schwach, ein plötzlicher Anstieg zeigt den Rückkehr des Kreislaufs.'
      ],
      nicht: ['Beatmung vor Kompression stellen', 'Hyperventilieren', 'Kompressionen für Untersuchungen unterbrechen', 'Kalzium/Bicarbonat routinemäßig'],
      sources: [Q_RECOVER, Q_ACVAA]
    },
    'blutung-vwd': {
      name: 'Unerwartete Blutung intraoperativ (vWD, Gerinnungsstörung)',
      zeichen: 'Diffuses Sickern aus dem gesamten Wundgebiet, Punktionsstellen bluten nach, kein einzelnes Gefäß erkennbar.',
      schritte: [
        'Chirurgisch komprimieren; Eingriff wenn möglich abkürzen.',
        'Normothermie und Normovolämie herstellen — kalte, azidotische Patienten gerinnen nicht.',
        'Desmopressin (DDAVP) 1 µg/kg langsam i.v./s.c. bei vWD Typ 1 (bei Typ 2/3 unzuverlässig).',
        'Frischplasma 10–20 mL/kg oder Kryopräzipitat; Vollblut bei gleichzeitiger Anämie.',
        'Tranexamsäure 10–15 mg/kg i.v. erwägen.',
        'Kein NSAID, keine weiteren i.m.-Injektionen.'
      ],
      nicht: ['NSAID zur Analgesie', 'Weiteroperieren ohne Blutprodukte in Reichweite'],
      sources: ['PennGen', Q_PLUMB, Q_ACVAA]
    },
    'kaninchen-notfall': {
      name: 'Kaninchen: Apnoe, Bradykardie, Kreislaufstillstand',
      zeichen: 'Kein Thoraxheben, EtCO₂ weg, Herzfrequenz unter 120/min, blasse Schleimhäute.',
      schritte: [
        'Narkosegas aus bzw. Injektionsanästhetika antagonisieren; 100 % Sauerstoff.',
        'Atemweg sichern (supraglottische Hilfe oder Tubus) und beatmen: 10–15 mL/kg, 20–40/min.',
        'α2 antagonisieren: Atipamezol i.m./i.v. — das 2,5- bis 5-fache der gegebenen Medetomidin-Dosis, bei Dexmedetomidin das 10-fache.',
        'Bei fortbestehender vagaler Bradykardie GLYCOPYRROLAT 0,01–0,02 mg/kg s.c./i.m. statt Atropin — ein erheblicher Teil der Kaninchen spaltet Atropin über Atropinesterase sofort. Vorher immer die Ursache abstellen: Narkosetiefe, Hypoxie, Hypothermie.',
        'Bleibt die Apnoe: Doxapram 2–5 mg/kg i.v./i.o. — ZUSÄTZLICH zur Beatmung, nie an ihrer Stelle.',
        'Kreislaufstillstand: Kompressionen 100–120/min mit Daumen und Zeigefinger über dem Herzen. Adrenalin 0,01 mg/kg i.v./i.o. alle 3–5 min (RECOVER-Niedrigdosis; ältere Kaninchen-Notfalltabellen nennen 0,2 mg/kg — hoch dosiert erst nach längerer erfolgloser Reanimation).',
        'Ohne liegenden i.v.- oder i.o.-Zugang ist eine wirksame Reanimation kaum möglich: Zugang legen und Notfallspritzen aufziehen, BEVOR eingeleitet wird — das Zeitfenster ist beim Kaninchen kürzer als bei Hund und Katze.',
        'Aktiv wärmen, Glukose messen.',
        'Nach dem Aufwachen: Schmerz behandeln, sofort Futter anbieten, Prokinetik — ein Kaninchen, das 12 h nicht frisst, ist der nächste Notfall.'
      ],
      nicht: ['Auf Atropinwirkung vertrauen', 'Doxapram STATT Beatmung', 'Auskühlen lassen', 'Ohne vorbereiteten Zugang einleiten'],
      sources: ['van Zeeland & Schoemaker 2014, EJCAP 24(4) Teil I+II', 'R(D)SVS Edinburgh CPR-Protokoll', Q_RECOVER, 'CEPSAF – Brodbelt 2008']
    },
    'kaninchen-ileus': {
      name: 'Kaninchen/Nager: postoperativer Ileus (gastrointestinale Stase)',
      zeichen: 'Frisst nicht, kein Kot oder winzige harte Köttel, gekrümmte Haltung, Zähneknirschen, Bauch gespannt.',
      schritte: [
        'Schmerz ist die häufigste Ursache — Analgesie erhöhen (Meloxicam 0,5–1 mg/kg + Buprenorphin), nicht reduzieren.',
        'Wärmen und rehydrieren (Infusion s.c./i.v.).',
        'Zwangsfütterung mit Päppelbrei alle 4–6 h, Heu und Lieblingsgrünfutter anbieten.',
        'Prokinetik (z. B. Metoclopramid 0,5 mg/kg alle 8 h) NUR nach Ausschluss eines echten Verschlusses — Röntgen bei Verdacht.',
        'Kein Zucker, keine Getreidepellets.'
      ],
      nicht: ['Prokinetik bei mechanischem Verschluss', 'Analgesie absetzen, „damit es wieder frisst"'],
      sources: [Q_BSAVA_EX, 'AEMV']
    },
    'reptil-notfall': {
      name: 'Reptil: wacht nicht auf / Apnoe',
      zeichen: 'Keine Spontanatmung nach Stunden, kein Zungenspiel, Herzfrequenz per Doppler niedrig.',
      schritte: [
        'Temperatur prüfen: das Tier muss in seinem Vorzugsbereich liegen (POTZ). Ein kühles Reptil verstoffwechselt nichts — Wärmen ist die wichtigste Maßnahme.',
        'Auf RAUMLUFT umstellen und mit IPPV 2–4/min weiterbeatmen: der Atemantrieb ist hypoxisch gesteuert, reiner Sauerstoff hält die Apnoe aufrecht.',
        'Antagonisieren, was antagonisierbar ist: Atipamezol (5-fache Medetomidin-Dosis) i.m., Flumazenil 0,05 mg/kg, Naloxon 0,05 mg/kg.',
        'Geduld: Aufwachzeiten von mehreren Stunden sind bei Schildkröten normal, nicht pathologisch.',
        'Feucht und dunkel halten, weiter beatmen, Doppler weiterlaufen lassen.'
      ],
      nicht: ['Reinen Sauerstoff bis zum Schluss geben', 'Bei kaltem Tier auf Wirkung warten', 'Atropin gegen Bradykardie erwarten'],
      sources: ['BSAVA Manual of Reptiles', Q_CARP, 'ARAV']
    },
    'frettchen-hypoglykaemie': {
      name: 'Frettchen mit Insulinom: Hypoglykämie-Krise',
      zeichen: 'Speicheln, Pfote am Maul, Hinterhandschwäche, Sternengucken, Krampf, wacht nach der Narkose nicht auf.',
      schritte: [
        'Blutzucker messen.',
        'Glukose 50 % 1:4 verdünnt, 0,25–0,5 mL/kg der verdünnten Lösung langsam i.v. — nur so viel, bis die Klinik verschwindet.',
        'Danach Dauerinfusion mit 2,5–5 % Glukose und alle 30 min nachmessen.',
        'ACHTUNG: ein großer Glukosebolus reizt den Tumor zur Insulinausschüttung und der Zucker fällt danach tiefer — deshalb klein und langsam.',
        'Diazoxid bzw. Prednisolon in der Weiterbehandlung; Fütterung in kleinen, häufigen Portionen.'
      ],
      nicht: ['Großer Glukosebolus', 'Nüchtern über Nacht', 'Ohne Messung wiederholt Zucker geben'],
      sources: [Q_BSAVA_EX, Q_CARP, 'AEMV']
    },
    'nsaid-ueberdosis': {
      name: 'NSAID-Überdosierung / NSAID beim falschen Patienten',
      zeichen: 'Erbrechen (ggf. mit Blut), Teerstuhl, Bauchschmerz, später Nierenwerte steigend, Oligurie.',
      schritte: [
        'Weitere NSAID-Gaben stoppen; kein zweites NSAID und kein Kortison dazu.',
        'Bei kürzlicher oraler Aufnahme: Aktivkohle 1–2 g/kg, ggf. wiederholt.',
        'Magenschutz: Omeprazol 1 mg/kg i.v./p.o. alle 12–24 h + Sucralfat 0,5–1 g p.o. alle 8 h (Sucralfat zeitlich versetzt geben).',
        'Nierenschutz: Infusion mit dem 1,5- bis 2-fachen Erhaltungsbedarf über 48–72 h, Harnproduktion und Kreatinin überwachen.',
        'Misoprostol bei hoher Dosis erwägen.'
      ],
      nicht: ['Kortison zusätzlich geben', 'Weiteres NSAID zur Schmerzbehandlung — auf Opioide umstellen'],
      sources: [Q_PLUMB, Q_CLINI, 'MSD Veterinary Manual']
    }
  };

  /* ------------------------------------------------------------------------
     Nachtrag zu vorhandenen Erkrankungen: Verweis auf Protokoll + Rettungsweg
     und die Risikostufe. Die Beschreibungstexte in breed-genetics.js bleiben
     unangetastet — hier kommen nur die Felder dazu, die es dort noch nicht gibt.
     ------------------------------------------------------------------------ */
  var CONDITIONS = {
    mdr1:                     { risk: 'mittel', protocol: ['mdr1'],            rescue: ['ivermectin-mdr1', 'opioid-ueberhang', 'nicht-aufwachen'] },
    'mdr1-cat':               { risk: 'mittel', protocol: ['mdr1'],            rescue: ['ivermectin-mdr1'] },
    sighthound:               { risk: 'mittel', protocol: ['sighthound'],      rescue: ['hypothermie', 'nicht-aufwachen'] },
    boas:                     { risk: 'hoch',   protocol: ['boas'],            rescue: ['regurgitation'] },
    /* KEIN dcm-hund-Verweis: die Acepromazin-Empfindlichkeit ist auch fuer Rassen ohne
       Kardiomyopathie hinterlegt (Mops, Boxer) — der DCM-Plan gehoert dann nicht dazu. */
    'boxer-ace':              { risk: 'mittel',                                     rescue: ['ace-hypotension', 'alpha2-ueberdosis'] },
    'dcm-doberman':           { risk: 'hoch',   protocol: ['dcm-hund'],        rescue: ['alpha2-ueberdosis', 'cpr'] },
    vwd:                      { risk: 'hoch',   protocol: ['vwd'],             rescue: ['blutung-vwd'] },
    'mmvd-cavalier':          { risk: 'hoch',   protocol: ['mmvd-b2', 'mmvd-c'], rescue: ['ace-hypotension'] },
    'malignant-hyperthermia': { risk: 'hoch',   protocol: ['mh'],              rescue: ['mh-krise'] },
    'pfk-deficiency':         { risk: 'mittel', protocol: ['anaemie'],         rescue: ['nicht-aufwachen'] },
    'pk-deficiency':          { risk: 'mittel', protocol: ['anaemie'],         rescue: ['nicht-aufwachen'] },
    'hcm-cat':                { risk: 'hoch',   protocol: ['hcm-katze', 'hcm-katze-lvoto'], rescue: ['ketamin-hcm', 'cpr'] },
    'pkd-cat':                { risk: 'mittel', protocol: ['niere'],           rescue: ['hyperkaliaemie'] },
    hyperuricosuria:          { risk: 'niedrig' },
    'hk-erythrozyten':        { risk: 'niedrig', rescue: ['hyperkaliaemie'] }
  };

  /* ------------------------------------------------------------- Wirkstoffregeln */
  /* Ergaenzen die vorhandenen Regeln; jede traegt einen Rettungsweg mit, damit die
     Warnung beim Buchen nicht nur sagt „schlecht", sondern auch „und jetzt". */
  var RULES = [
    { id: 'brachy-ace-sed', drugs: ['acepromazin'], scope: { groups: ['brachy'] }, level: 'caution', cond: 'boas',
      factor: 'niedrig dosieren, NIE unbeaufsichtigt sedieren',
      text: 'Brachyzephal: Acepromazin löst zwar den Larynxkrampf und senkt Stress, ein sedierter Brachyzephaler verlegt seinen Atemweg aber selbst. Nur unter Sicht, Sauerstoff und Intubationsbereitschaft.',
      sources: [Q_AAHA, Q_BSAVA], rescue: ['regurgitation'] },
    { id: 'toy-alle', drugs: ['propofol', 'alfaxalon', 'medetomidin', 'dexmedetomidin'], scope: { groups: ['toy'] }, level: 'caution',
      factor: 'verdünnt aufziehen, über 60 s titrieren',
      text: 'Zwergrasse: unverdünnte Boli sind hier die häufigste Überdosierung — bei 2 kg entscheidet ein Zehntelmilliliter. Verdünnen, langsam titrieren, aktiv wärmen, Glukose messen.',
      sources: [Q_AAHA], rescue: ['hypoglykaemie', 'hypothermie'] },
    { id: 'kanin-atropin', drugs: ['atropin'], scope: { conditions: ['atropinesterase'] }, level: 'avoid', cond: 'atropinesterase',
      text: 'Kaninchen: ein erheblicher Teil der Tiere trägt Atropinesterase im Serum und baut Atropin binnen Minuten ab — die Bradykardie bleibt, und man hält sie fälschlich für therapieresistent. Glycopyrrolat 0,01–0,02 mg/kg ist die verlässliche Alternative.',
      sources: [Q_BSAVA_EX, Q_PLUMB, Q_CLINI], rescue: ['kaninchen-notfall'] },
    { id: 'nager-antibiotika', drugs: ['penicillin', 'amoxicillin', 'ampicillin', 'clindamycin', 'lincomycin', 'erythromycin'],
      scope: { conditions: ['nager-dysbiose'] }, level: 'avoid', cond: 'nager-dysbiose',
      text: 'Kaninchen/Meerschweinchen/Chinchilla/Degu: Penicilline, Lincosamide und Makrolide per os zerstören die Dickdarmflora — tödliche Enterotoxämie durch Clostridium spiridiforme/difficile. Auch die perioperative „Sicherheitsantibiose" fällt darunter.',
      sources: [Q_CLINI, Q_BSAVA_EX, Q_PLUMB] },
    { id: 'reptil-atropin', drugs: ['atropin', 'glyco'], scope: { conditions: ['reptil-basis'] }, level: 'monitor', cond: 'reptil-basis',
      text: 'Reptil: Anticholinergika heben die Herzfrequenz oft nicht an — die Bradykardie ist meist Folge von Kälte, Hypoxie oder Narkosetiefe. Erst Temperatur und Beatmung prüfen.',
      sources: ['BSAVA Manual of Reptiles', Q_CARP], rescue: ['reptil-notfall'] }
  ];

  /* --------- Erkrankungen, die es in breed-genetics.js noch nicht gibt --------- */
  var NEUE_CONDITIONS = {
    atropinesterase: {
      name: 'Atropinesterase (Kaninchen)', gene: 'Serumesterase, erblich',
      cat: 'Pharmakogenetik', icon: '🧬', risk: 'mittel',
      short: 'Ein erheblicher Teil der Kaninchen trägt im Plasma Atropinesterase und spaltet Atropin binnen Minuten. Die Angaben schwanken zwischen etwa einem Drittel und rund der Hälfte der Tiere — eine belastbare Zahl gibt es nicht, also bei JEDEM Kaninchen damit rechnen.',
      anesth: 'Atropin wirkt bei diesen Tieren nicht oder nur sehr kurz — man verliert Minuten und hält die Bradykardie fälschlich für therapieresistent. Gegen vagale Bradykardie Glycopyrrolat 0,01–0,02 mg/kg s.c./i.m.; es wird von der Esterase nicht gespalten. Anticholinergika gehören beim Kaninchen ohnehin nicht in die Standard-Prämedikation, sondern sind Reserve.',
      protocol: ['kaninchen'], rescue: ['kaninchen-notfall'],
      sources: ['van Zeeland & Schoemaker 2014, EJCAP 24(4)', 'Olson et al. 1994', Q_BSAVA_EX, Q_PLUMB], links: {}
    },
    'nager-dysbiose': {
      name: 'Antibiotika-Dysbiose (Hasenartige & Nager)', gene: 'Artmerkmal (Hinterdarmfermentierer)',
      cat: 'Stoffwechsel', icon: '☠️', risk: 'hoch',
      short: 'Bei Kaninchen, Meerschweinchen, Chinchilla und Degu töten schmalspektrige Antibiotika gegen grampositive Keime die Dickdarmflora ab.',
      anesth: 'Perioperative Antibiose nur bei echter Indikation und nur mit verträglichen Wirkstoffen (z. B. Enrofloxacin, Trimethoprim-Sulfonamid, Metronidazol). Penicilline, Amoxicillin, Ampicillin, Clindamycin, Lincomycin, Erythromycin oral sind tödlich.',
      /* KEIN Protokollverweis: die Dysbiose betrifft Kaninchen, Meerschweinchen, Chinchilla und
       * Degu gleichermassen — ein Verweis auf das Kaninchenprotokoll haenge einem Meerschweinchen
       * den falschen Narkoseplan an. */
      protocol: [], rescue: ['kaninchen-ileus'],
      sources: [Q_CLINI, Q_BSAVA_EX, Q_PLUMB], links: {}
    },
    'insulinom-frettchen': {
      name: 'Insulinom (Frettchen)', gene: 'Erworben, sehr häufig ab 3 Jahren',
      cat: 'Stoffwechsel', icon: '🍬', risk: 'hoch',
      short: 'Insulinproduzierender Pankreastumor — beim Frettchen die häufigste Ursache für Hypoglykämie und für „wacht nach der Narkose nicht auf".',
      anesth: 'Nüchternzeit maximal 3–4 h. Blutzucker vor Einleitung, alle 30 min intraoperativ und im Aufwachen. Glukosehaltige Infusion ab Prämedikation.',
      protocol: ['frettchen'], rescue: ['frettchen-hypoglykaemie', 'hypoglykaemie'],
      sources: [Q_BSAVA_EX, Q_CARP, 'AEMV'], links: {}
    },
    'kardiomyopathie-frettchen': {
      name: 'Kardiomyopathie (Frettchen)', gene: 'Erworben, hohe Prävalenz',
      cat: 'Herz/Kreislauf', icon: '💔', risk: 'hoch',
      short: 'Dilatative und hypertrophe Kardiomyopathie sind beim Frettchen häufig und oft ohne Vorzeichen.',
      anesth: 'Vor jeder Narkose auskultieren; bei Herzgeräusch, Husten oder Leistungsschwäche Echo. Kreislaufneutral einleiten, Volumen zurückhaltend, Blutdruck messen.',
      protocol: ['frettchen'], rescue: ['cpr'],
      sources: [Q_BSAVA_EX, Q_CARP], links: {}
    },
    'degu-diabetes': {
      name: 'Spontaner Diabetes mellitus (Degu)', gene: 'Artmerkmal (Insulinstruktur)',
      cat: 'Stoffwechsel', icon: '🍬', risk: 'mittel',
      short: 'Degus entwickeln bei zuckerreicher Fütterung sehr häufig einen Diabetes mit Katarakt — die trüben Augen sind oft der erste Hinweis.',
      anesth: 'Blutzucker vor der Narkose messen. Zuckerhaltige Infusionen nur nach Messung, Wundheilung schlechter, Infektionsneigung höher.',
      protocol: ['degu', 'diabetes'], rescue: ['hypoglykaemie'],
      sources: [Q_CARP, Q_CLINI], links: {}
    },
    'satin-osteodystrophie': {
      name: 'Satin-Osteodystrophie (Meerschweinchen)', gene: 'Satin-Fellgen (rezessiv gekoppelt)',
      cat: 'Skelett', icon: '🦴', risk: 'hoch',
      short: 'An das Satin-Fell gekoppelte Störung des Knochenstoffwechsels: brüchige Knochen, schmerzhafte Skelettveränderungen, Zahnwurzelprobleme.',
      anesth: 'Beim Handling und Lagern besteht Frakturgefahr — mit ganzer Hand tragen, nie an einer Gliedmaße fixieren. Schmerzbehandlung großzügig, Röntgen vor Zahnbehandlungen.',
      protocol: ['meerschwein'], rescue: [],
      sources: [Q_BSAVA_EX, 'Zuchtverbands-/Fachliteratur Meerschweinchen'], links: {}
    },
    'fellrutschen': {
      name: 'Fellrutschen (Chinchilla)', gene: 'Artmerkmal',
      cat: 'Haut', icon: '🧶', risk: 'niedrig',
      short: 'Bei grobem Zugriff lösen Chinchillas ganze Fellbüschel ab (Schutzreflex) — die kahle Stelle wächst monatelang nach.',
      anesth: 'Handling minimal und flächig, kein Festhalten am Fell. Auch für die Lagerung in Narkose relevant (Reibung).',
      protocol: ['chinchilla'], rescue: [],
      sources: [Q_BSAVA_EX, Q_CARP], links: {}
    },
    'hitzeempfindlich': {
      name: 'Hitzeempfindlichkeit', gene: 'Artmerkmal (dichtes Fell, keine Schweißdrüsen)',
      cat: 'Temperatur', icon: '🌡️', risk: 'mittel',
      short: 'Chinchillas und dichtfellige Rassen erleiden bereits über 25 °C Umgebungstemperatur einen Hitzschlag.',
      anesth: 'Wärmemanagement in beide Richtungen: aktiv wärmen gegen die narkosebedingte Auskühlung, aber Temperatur messen und nicht überwärmen.',
      protocol: ['chinchilla'], rescue: [],
      sources: [Q_BSAVA_EX, Q_CARP], links: {}
    },
    'reptil-basis': {
      name: 'Reptilien-Narkosephysiologie', gene: 'Artmerkmal',
      cat: 'Grundlagen', icon: '🦎', risk: 'mittel',
      short: 'Wechselwarm, intrakardiale Shunts, hypoxisch gesteuerter Atemantrieb, renales Pfortadersystem, geschlossene Trachealringe.',
      anesth: 'Temperatur im Vorzugsbereich halten, immer intubieren (Tubus ohne Cuff) und mit 2–6/min beatmen, Doppler statt Pulsoxymetrie, zum Aufwachen auf Raumluft umstellen.',
      protocol: ['reptil'], rescue: ['reptil-notfall'],
      sources: ['BSAVA Manual of Reptiles', Q_CARP, 'ARAV'], links: {}
    },
    'morph-neuro': {
      name: 'Morph-gekoppelter neurologischer Defekt (Reptil)', gene: 'Farbzuchtform (z. B. Spider, Jaguar, Enigma)',
      cat: 'Neuro', icon: '⚠️', risk: 'mittel',
      short: 'An bestimmte Farbformen ist ein neurologischer Defekt gekoppelt: Wobble-Syndrom (Spider-Königspython), Jaguar-Carpetpython, Enigma-Syndrom (Leopardgecko).',
      anesth: 'Zittern, Kopfschiefhaltung und Koordinationsstörungen im Aufwachen sind bei diesen Tieren die Regel und KEIN Narkosezwischenfall — vorher wissen, sonst wird unnötig behandelt. Stress verstärkt die Symptome; ruhig, dunkel und warm aufwachen lassen.',
      protocol: ['reptil'], rescue: ['reptil-notfall'],
      sources: ['ARAV/ExoticsCon', 'Fachliteratur Ball-Python-Morphs'], links: {}
    },
    'malokklusion': {
      name: 'Zahnerkrankung / Malokklusion (Kaninchen)', gene: 'erworben – Hauptfaktor ist das Alter',
      cat: 'Skelett', icon: '🦷', risk: 'mittel',
      short: 'Häufigste Einzelerkrankung des Heimtierkaninchens: 15,4 % Ein-Jahres-Prävalenz (RVC VetCompass 2024, n = 161 979), Backenzähne 13,7 %, Schneidezähne 3,1 %. Ab 5 Jahren 7,6-faches Risiko.',
      anesth: 'Häufigster Narkosegrund beim Kaninchen überhaupt — und der Patient ist dabei selten gesund: Zahnschmerz und Anorexie machen aus einem ASA-I- einen ASA-III-Patienten, und damit steigt die narkosebedingte Sterblichkeit von 0,73 % auf 7,37 % (CEPSAF). Also VORHER stabilisieren (Flüssigkeit, Assistenzfütterung), nach der Einleitung die Maulhöhle von Futterresten säubern (Aspirationsschutz), Intubation durch Zahnspitzen erschwert — supraglottische Atemwegshilfe bevorzugen. Danach Futteraufnahme aktiv sicherstellen.',
      /* Bewusst NICHT „Widder- und Kurzkopfrassen haben mehr Zahnprobleme": das ist die
       * verbreitete Annahme, aber die grösste vorliegende Untersuchung findet weder Schlappohr
       * noch brachyzephale Kopfform als Risikofaktor. Belegt sind Alter — und, gegenläufig zur
       * Erwartung, ein NIEDRIGERES Risiko oberhalb 2 kg. Die gegenteilige Aussage stammt aus
       * einer Tierheimstichprobe mit n = 30. */
      protocol: ['kaninchen', 'kanin-zwerg'], rescue: ['kaninchen-ileus'],
      sources: ['Jackson et al. 2024, Vet Record (RVC VetCompass, n=161979)', 'CEPSAF – Brodbelt 2008', Q_BSAVA_EX], links: {}
    },
    'megakolon-letal': {
      name: 'Letalfaktor / Schecken-Megakolon', gene: 'Homozygote Scheckung (En/En, Roan × Roan)',
      cat: 'Stoffwechsel', icon: '⚠️', risk: 'mittel',
      short: 'Aus der Verpaarung zweier gescheckter Tiere entstehen Nachkommen mit Megakolon (Kaninchen) bzw. Mikrophthalmie und Zahndefekten (Meerschweinchen-Dalmatiner/Roan).',
      anesth: 'Chronische Verdauungsstörung: Ileusrisiko nach der Narkose deutlich erhöht, Ernährungszustand oft schlecht. Vor dem Eingriff Gewicht, Kotabsatz und Hydratation beurteilen.',
      protocol: ['kaninchen'], rescue: ['kaninchen-ileus'],
      sources: [Q_BSAVA_EX, 'Fachliteratur Kaninchenzucht'], links: {}
    },
    taubheit: {
      name: 'Angeborene Taubheit', gene: 'Weissscheckung/Merle/Waardenburg-Typ',
      cat: 'Neuro', icon: '👂', risk: 'niedrig',
      short: 'An weiße Zeichnung gekoppelte Innenohrtaubheit — bei Frettchen mit Panda-/Blaze-/Badger-Zeichnung nahezu regelhaft, ebenso bei weißen Katzen und Merle-Hunden.',
      anesth: 'Kein eigenes Narkoserisiko, aber im Aufwachen wichtig: das Tier hört keine Ansprache, erschrickt bei Berührung und wehrt sich. Ruhig und mit Sichtkontakt arbeiten.',
      protocol: [], rescue: [],
      sources: ['OMIA', Q_BSAVA_EX], links: {}
    },
    'merle': {
      name: 'Merle / Doppel-Merle', gene: 'PMEL17 (SILV)',
      cat: 'Neuro', icon: '👁️', risk: 'niedrig',
      short: 'Doppelt merlefarbene Hunde sind häufig taub und/oder hochgradig sehbehindert; Augenfehlbildungen sind häufig.',
      anesth: 'Kein spezielles Narkoserisiko. Im Aufwachen berücksichtigen: taube und sehbehinderte Tiere erschrecken leicht. Merle tritt oft bei Hütehunden auf — MDR1 mitprüfen.',
      protocol: [], rescue: [],
      sources: ['UC Davis VGL', 'OMIA'], links: {}
    }
  };

  Object.keys(NEUE_CONDITIONS).forEach(function (k) { if (!CONDITIONS[k]) CONDITIONS[k] = NEUE_CONDITIONS[k]; });

  VB.register({ groups: GROUPS, conditions: CONDITIONS, protocols: PROTOCOLS, rescue: RESCUE, rules: RULES });
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
