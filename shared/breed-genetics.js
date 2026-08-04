/* ============================================================================
   shared/breed-genetics.js  ·  Canis VET-PHARM
   Rassespezifische Genetik & Arzneimittel-/Narkose-Warnungen  ·  root.VETBREED
   ----------------------------------------------------------------------------
   Von ALLEN Modulen genutzt (Anästhesie, Blutwerte, Stoffwechsel, Reise, Hub).
   Quellen: CliniPharm/CliniTox – vetpharm.uzh.ch (Pharmakogenetik MDR1/ABCB1),
   Washington State University VCPL (MDR1 Problem-Wirkstoffe), Plumb's Veterinary
   Drug Handbook, WSAVA/ACVAA/AAHA-Anästhesie-Leitlinien, BSAVA, UC Davis VGL,
   PennGen. ALLES Referenz-/Lernhilfe – kein Ersatz für klinisches Urteil.
   ============================================================================ */
(function (root) {
  'use strict';

  /* ---- Pharmakologisch/klinisch sinnvolle Rassegruppen (steuern Regeln) ---- */
  var GROUPS = {
    mdr1:       { name: 'MDR1/ABCB1', icon: '🧬', color: '#e23b6d',
      desc: 'P-Glykoprotein-Defekt der Blut-Hirn-Schranke – zahlreiche Wirkstoffe treten ins ZNS über (bis 100-fache Anreicherung im Gehirn).' },
    sighthound: { name: 'Windhund-Typ', icon: '🐆', color: '#8b7cf6',
      desc: 'Geringer Körperfettanteil, hoher Hämatokrit, veränderte Anästhetika-Kinetik (CYP2B11), verzögerte Aufwachphase, Hypothermie-Neigung.' },
    brachy:     { name: 'Brachyzephal', icon: '👃', color: '#0aa2c4',
      desc: 'Brachyzephales obstruktives Atemwegssyndrom (BOAS) – hohes Atemwegs- und Regurgitations-/Aspirationsrisiko peri-anästhetisch.' },
    giant:      { name: 'Riesenrasse', icon: '🐕', color: '#16a06a',
      desc: 'Kardiomyopathie- und GDV-Neigung; Anästhetika nach Magermasse dosieren (nicht nach absolutem Gewicht).' },
    toy:        { name: 'Zwerg-/Toy-Rasse', icon: '🐩', color: '#e0a020',
      desc: 'Hypoglykämie- und Hypothermie-Risiko, kleine Atemwege, leichte Überdosierung – exakt dosieren, aktiv wärmen.' }
  };

  /* --------------------------- Erkrankungen/Merkmale --------------------------- */
  var CONDITIONS = {
    mdr1: {
      name: 'MDR1/ABCB1-Defekt (P-Glykoprotein)', gene: 'ABCB1 (MDR1) · Deletion 4 bp (Δ)',
      cat: 'Pharmakogenetik', icon: '🧬',
      short: 'P-Glykoprotein an der Blut-Hirn-Schranke fehlt → Arzneistoffe reichern sich bis zu 100-fach im Gehirn an.',
      anesth: 'Acepromazin & Opioide (Butorphanol, Methadon, Morphin, Fentanyl) niedriger dosieren + engmaschig überwachen (CliniPharm Kat. 2). Makrozyklische Laktone (Ivermectin, Moxidectin, Milbemycinoxim hochdosiert, Selamectin, Doramectin), Loperamid, Emodepsid, Ondansetron, Apomorphin, Vincristin/Vinblastin/Doxorubicin/Paclitaxel = neurotoxisch (Kat. 1, meiden). Homozygot (−/−) klinisch am stärksten, heterozygot (+/−) abgeschwächt.',
      sources: ['CliniPharm vetpharm.uzh.ch – Pharmakogenetik MDR1/ABCB1', 'WSU-VCPL Problem-Wirkstoffe', 'Mealey et al.'],
      links: { blut: ['albumin'], q: 'p-glykoprotein' }
    },
    'mdr1-cat': {
      name: 'ABCB1-Defekt der Katze', gene: 'ABCB1 (ABCB11930_1931delTC)',
      cat: 'Pharmakogenetik', icon: '🧬',
      short: 'Seltener P-Glykoprotein-Defekt einiger Katzenrassen – Ivermectin-/Eprinomectin-Empfindlichkeit.',
      anesth: 'Makrozyklische Laktone meiden: Eprinomectin ist KONTRAINDIZIERT (schon in zugelassener Dosis), Ivermectin niedrige Label-Dosis meist sicher, hohe/extralabel meiden (Kat. 1). Bei ZNS-gängigen Sedativa/Opioiden vorsichtig titrieren und überwachen.',
      sources: ['CliniPharm vetpharm.uzh.ch – ABCB1 Katze', 'Mealey 2022'] },
    sighthound: {
      name: 'Windhund-Pharmakologie', gene: 'CYP2B11-Low-Activity-Phänotyp',
      cat: 'Pharmakogenetik', icon: '🐆',
      short: 'Wenig Körperfett, hoher Hämatokrit, langsamere Verstoffwechslung von Propofol/Thiobarbituraten → verzögerte Aufwachphase.',
      anesth: 'Thiobarbiturate (Thiopental) meiden. Propofol-Induktionsbolus ~25–30 % reduzieren, langsam titrieren, KEINE Propofol-CRI/TIVA (deutlich verlängerte Aufwachphase, ~70 % geringere CYP2B11-Aktivität) – Alfaxalon oder Inhalationserhalt bevorzugen. Aktiv wärmen (wenig Fett → Hypothermie). Hoher HKT, niedrige Thrombozyten/T4 und niedriges Albumin sind rassetypisch (Referenzwerte anpassen), nicht pathologisch.',
      sources: ['ACVAA', 'Plumb’s – Greyhound anesthesia', 'Court 1999 (CYP2B11)'],
      links: { blut: ['hkt', 'thrombozyten', 'gesamtprotein'] } },
    boas: {
      name: 'Brachyzephales Atemwegssyndrom (BOAS)', gene: 'Rassemerkmal (polygen)',
      cat: 'Atemweg', icon: '👃',
      short: 'Enge Nasenöffnungen, langes Gaumensegel, hypoplastische Trachea → obstruktive Atemwege.',
      anesth: 'Präoxygenieren; zügige, kontrollierte i.v.-Einleitung mit sofortiger Intubation; schwieriger Atemweg vorbereiten. Regurgitations-/Aspirationsprophylaxe (Maropitant, Omeprazol; nüchtern). Tubus lange belassen – erst bei voll wachem Schluckreflex extubieren. Hoher Vagotonus → Bradykardie-Neigung. Postoperativ überwachen (erneute Obstruktion).',
      sources: ['WSAVA/ACVAA', 'BSAVA – brachycephalic anaesthesia'],
      links: { blut: ['spo2'] } },
    'boxer-ace': {
      name: 'Boxer – Acepromazin-Empfindlichkeit', gene: 'Rasseassoziiert (Vagotonus)',
      cat: 'Herz/Kreislauf', icon: '💗',
      short: 'Boxer neigen unter Acepromazin zu ausgeprägter Bradykardie, Hypotension und Synkopen (hoher Vagotonus).',
      anesth: 'Acepromazin niedrig dosieren oder meiden; Anticholinergikum bereithalten. Auf Boxer-Kardiomyopathie (ARVC) und Subaortenstenose achten (EKG/Auskultation prä-OP).',
      sources: ['Plumb’s', 'ACVAA'],
      links: { blut: ['kalium'] } },
    'dcm-doberman': {
      name: 'Dilatative Kardiomyopathie (DCM)', gene: 'PDK4/TTN-assoziiert (Dobermann)',
      cat: 'Herz/Kreislauf', icon: '💔',
      short: 'Dobermann (u. a.) mit oft okkulter DCM – Arrhythmien und reduzierte Kontraktilität.',
      anesth: 'Prä-OP-Screening (EKG/Holter/Echo). Negativ-inotrope/vasodilatierende Anästhetika vorsichtig; α2-Agonisten in Hochdosis meiden. Ventrikuläre Arrhythmien → Lidocain bereit.',
      sources: ['ACVAA', 'Plumb’s'],
      links: { blut: ['troponin', 'kalium'] } },
    'vwd': {
      name: 'Von-Willebrand-Erkrankung (vWD Typ I)', gene: 'VWF',
      cat: 'Gerinnung', icon: '🩸',
      short: 'Häufigste erbliche Gerinnungsstörung – verminderter/defekter von-Willebrand-Faktor (Dobermann u. a.).',
      anesth: 'Prä-OP Blutungsanamnese, bukkale Blutungszeit / vWF:Ag. Desmopressin (DDAVP) präoperativ erwägen; thrombozytenhemmende Medikamente (NSAID) peri-OP meiden; Blutprodukte bereitstellen.',
      sources: ['PennGen', 'Plumb’s'],
      links: { blut: ['thrombozyten'] } },
    'mmvd-cavalier': {
      name: 'Myxomatöse Mitralklappen-Erkrankung (MMVD)', gene: 'Polygen (Cavalier)',
      cat: 'Herz/Kreislauf', icon: '💗',
      short: 'Frühe degenerative Mitralklappenerkrankung – Cavalier King Charles Spaniel.',
      anesth: 'Normofrequenz und Nachlast erhalten, Volumenüberladung und Bradykardie meiden. Balancierte Anästhesie, Blutdruck überwachen.',
      sources: ['ACVAA'],
      links: { blut: ['troponin'] } },
    'malignant-hyperthermia': {
      name: 'Maligne Hyperthermie (MH)', gene: 'RYR1',
      cat: 'Pharmakogenetik', icon: '🔥',
      short: 'Seltener, lebensbedrohlicher hypermetaboler Zustand, ausgelöst durch volatile Inhalationsanästhetika und Succinylcholin.',
      anesth: 'ALLE volatilen Inhalationsanästhetika (Halothan/Isofluran/Sevofluran/Desfluran) und Succinylcholin meiden. Sichere Narkose: TIVA mit Propofol/Ketamin/Alfaxalon/Opioiden/Benzodiazepinen + Lokal-/Regionalanästhesie; nicht-depolarisierende Muskelrelaxanzien (Atracurium/Rocuronium) sind sicher. Frühestes Zeichen: plötzlicher EtCO₂-Anstieg VOR der Hyperthermie, dann Tachykardie, Muskelrigidität, Azidose, Hyperkaliämie. Sofort: Trigger stoppen, 100 % O₂/Hyperventilation, aktiv kühlen, Dantrolen 1–3 mg/kg i.v.',
      sources: ['ACVAA', 'Plumb’s'],
      links: {} },
    'pfk-deficiency': {
      name: 'Phosphofruktokinase-Mangel (PFK)', gene: 'PFKM',
      cat: 'Erythrozyten-Enzym', icon: '🧪',
      short: 'Erythrozytäre Enzymstörung (English Springer/American Cocker Spaniel) – alkalämie-/belastungsinduzierte Hämolyse.',
      anesth: 'Hyperventilation/Alkalose, Stress, Hyperthermie meiden (Trigger der Hämolyse). Hämolysekrisen können mit Hämoglobinurie einhergehen – Hydratation, ggf. Transfusion.',
      sources: ['PennGen', 'UC Davis VGL'],
      links: { blut: ['hkt'] } },
    'pk-deficiency': {
      name: 'Pyruvatkinase-Mangel (PK)', gene: 'PKLR',
      cat: 'Erythrozyten-Enzym', icon: '🧪',
      short: 'Erythrozytäre Enzymstörung mit chronischer hämolytischer Anämie (Basenji, Beagle, WHWT; Abessinier/Somali/Bengal bei Katzen).',
      anesth: 'Chronische Anämie – O₂-Trägerkapazität eingeschränkt; HKT prä-OP prüfen, Transfusion planen, Hypoxämie strikt vermeiden.',
      sources: ['PennGen', 'UC Davis VGL'],
      links: { blut: ['hkt'] } },
    'hcm-cat': {
      name: 'Hypertrophe Kardiomyopathie (HCM)', gene: 'MYBPC3 (Maine Coon A31P / Ragdoll R820W)',
      cat: 'Herz/Kreislauf', icon: '🐈',
      short: 'Häufigste Herzerkrankung der Katze – verdickter linker Ventrikel, oft okkult (Maine Coon, Ragdoll u. a.).',
      anesth: 'Tachykardie und Hypotension meiden (verkürzte Füllung, dynamische LVOT-Obstruktion/SAM). Ketamin als alleiniges Anästhetikum meiden (Frequenz-/Kontraktilitätsanstieg → fulminante Dekompensation möglich) – Etomidat/Alfaxalon bevorzugen. α2-Agonisten nur niedrigste Dosis (Nachlast↑, kontrovers). Vorsichtige Volumengabe (Lungenödem). Anticholinergika (Frequenzanstieg) zurückhaltend.',
      sources: ['ACVAA', 'Fossum/feline cardiology'],
      links: { blut: ['troponin'] } },
    'pkd-cat': {
      name: 'Polyzystische Nierenerkrankung (PKD)', gene: 'PKD1',
      cat: 'Niere', icon: '🫘',
      short: 'Erbliche Nierenzysten mit fortschreitender Niereninsuffizienz (Perser, Exotic/British Shorthair).',
      anesth: 'Nierenfunktion prä-OP prüfen; nephrotoxische/renale eliminierte Medikamente (NSAID!) meiden bzw. anpassen, Blutdruck/Perfusion und Hydratation sichern.',
      sources: ['UC Davis VGL', 'IRIS'],
      links: { blut: ['harnstoff', 'kreatinin'] } },
    'hyperuricosuria': {
      name: 'Hyperurikosurie (Urat-Steine)', gene: 'SLC2A9',
      cat: 'Stoffwechsel', icon: '🪨',
      short: 'Gestörter Purinstoffwechsel → Uratsteine (Dalmatiner; auch English Bulldog).',
      anesth: 'Perioperativ Hydratation/Diurese sichern; harnsäurebeeinflussende Faktoren beachten.',
      sources: ['UC Davis VGL'],
      links: { q: 'harnsäure' } },
    'hk-erythrozyten': {
      name: 'Kaliumreiche Erythrozyten (HK-Typ)', gene: 'Rassemerkmal (Akita/Shiba u. a.)',
      cat: 'Erythrozyten-Enzym', icon: '🧪',
      short: 'Erythrozyten mit hohem intrazellulärem Kalium → bei Hämolyse der Probe falsch hohes Serum-Kalium (Pseudohyperkaliämie); oft zusätzlich Mikrozytose.',
      anesth: 'Peri-operativ gemessenes Kalium bei hämolytischer Probe kritisch prüfen (Pseudohyperkaliämie) – nicht überstürzt behandeln; EKG/Klinik entscheiden. Niedriges MCV ist Normvariante.',
      sources: ['eClinPath', 'CliniPharm'],
      links: { blut: ['kalium'] } }
  };

  /* ------------------------------ Rassen ------------------------------ */
  /* freq = MDR1-Allelhäufigkeit laut CliniPharm (vetpharm.uzh.ch), wo zutreffend. */
  var BREEDS = [
    /* --- MDR1-Hütehunde (CliniPharm-Häufigkeiten) --- */
    { id:'collie', name:'Collie (Langhaar)', sp:'hund', aliases:['collie','langhaarcollie','rough collie'], groups:['mdr1'], conditions:['mdr1'], freq:'55–57 % MDR1-Allel', note:'Klassischer „Ivermectin-sensibler" Collie – höchste MDR1-Prävalenz.' },
    { id:'collie-kurz', name:'Kurzhaarcollie', sp:'hund', aliases:['kurzhaarcollie','smooth collie'], groups:['mdr1'], conditions:['mdr1'], freq:'68 % MDR1-Allel', note:'Höchste dokumentierte MDR1-Allelhäufigkeit.' },
    { id:'aussie', name:'Australian Shepherd', sp:'hund', aliases:['aussie','australian shepherd','australischer schaeferhund'], groups:['mdr1'], conditions:['mdr1'], freq:'17–46 % MDR1-Allel', note:'Häufig betroffen; Miniature-Variante bis 50 %.' },
    { id:'mini-aussie', name:'Miniature Australian Shepherd', sp:'hund', aliases:['mini aussie','miniature australian shepherd'], groups:['mdr1'], conditions:['mdr1'], freq:'20–50 % MDR1-Allel', note:'' },
    { id:'sheltie', name:'Shetland Sheepdog (Sheltie)', sp:'hund', aliases:['sheltie','shetland sheepdog'], groups:['mdr1'], conditions:['mdr1'], freq:'7–35 % MDR1-Allel', note:'' },
    { id:'whippet-lang', name:'Langhaar-Whippet', sp:'hund', aliases:['langhaar whippet','longhaired whippet'], groups:['mdr1','sighthound'], conditions:['mdr1','sighthound'], freq:'42–65 % MDR1-Allel', note:'Windhund + hohe MDR1-Prävalenz.' },
    { id:'silken', name:'Silken Windhound', sp:'hund', aliases:['silken windhound','silken'], groups:['mdr1','sighthound'], conditions:['mdr1','sighthound'], freq:'18–30 % MDR1-Allel', note:'' },
    { id:'mcnab', name:'McNab', sp:'hund', aliases:['mcnab'], groups:['mdr1'], conditions:['mdr1'], freq:'17–30 % MDR1-Allel', note:'' },
    { id:'waeller', name:'Wäller', sp:'hund', aliases:['waeller','waller'], groups:['mdr1'], conditions:['mdr1'], freq:'17–19 % MDR1-Allel (meist heterozygot)', note:'' },
    { id:'wss', name:'Weisser Schweizer Schäferhund', sp:'hund', aliases:['weisser schweizer schaeferhund','white swiss shepherd','berger blanc'], groups:['mdr1'], conditions:['mdr1'], freq:'14 % MDR1-Allel', note:'' },
    { id:'oes', name:'Old English Sheepdog (Bobtail)', sp:'hund', aliases:['old english sheepdog','bobtail'], groups:['mdr1'], conditions:['mdr1'], freq:'1–11 % MDR1-Allel', note:'' },
    { id:'english-shepherd', name:'Englischer Schäferhund', sp:'hund', aliases:['english shepherd','englischer schaeferhund'], groups:['mdr1'], conditions:['mdr1'], freq:'7–15 % MDR1-Allel', note:'' },
    { id:'dsh', name:'Deutscher Schäferhund', sp:'hund', aliases:['deutscher schaeferhund','german shepherd','dsh','schaeferhund'], groups:['mdr1'], conditions:['mdr1'], freq:'6–10 % MDR1-Allel', note:'Niedrigere, aber relevante MDR1-Prävalenz; DM (SOD1) möglich.' },
    { id:'border-collie', name:'Border Collie', sp:'hund', aliases:['border collie'], groups:['mdr1'], conditions:['mdr1'], freq:'1–2 % MDR1-Allel', note:'Niedrige MDR1-Prävalenz – Test dennoch sinnvoll.' },
    { id:'huetehund-mix', name:'Hütehund-Mischling', sp:'hund', aliases:['huetehund mischling','herding mix','mischling huetehund'], groups:['mdr1'], conditions:['mdr1'], freq:'6–7 % MDR1-Allel', note:'MDR1 bei Hütehund-Abstammung testen.' },

    /* --- Windhunde --- */
    { id:'greyhound', name:'Greyhound', sp:'hund', aliases:['greyhound','windhund'], groups:['sighthound'], conditions:['sighthound'], note:'Prototyp der Windhund-Anästhesie; hoher HKT, wenig Fett, MH-Fälle beschrieben.' },
    { id:'whippet', name:'Whippet', sp:'hund', aliases:['whippet'], groups:['sighthound'], conditions:['sighthound'], note:'MDR1 nur bei Langhaar-Whippet relevant.' },
    { id:'galgo', name:'Galgo Español', sp:'hund', aliases:['galgo','galgo espanol','spanischer windhund'], groups:['sighthound'], conditions:['sighthound'], note:'' },
    { id:'saluki', name:'Saluki', sp:'hund', aliases:['saluki'], groups:['sighthound'], conditions:['sighthound'], note:'' },
    { id:'barsoi', name:'Barsoi (Borzoi)', sp:'hund', aliases:['barsoi','borzoi'], groups:['sighthound'], conditions:['sighthound'], note:'' },
    { id:'afghane', name:'Afghanischer Windhund', sp:'hund', aliases:['afghane','afghan hound','afghanischer windhund'], groups:['sighthound'], conditions:['sighthound'], note:'' },
    { id:'wolfshund', name:'Irischer Wolfshund', sp:'hund', aliases:['irischer wolfshund','irish wolfhound'], groups:['sighthound','giant'], conditions:['sighthound'], note:'Windhund + Riesenrasse (DCM/GDV).' },
    { id:'deerhound', name:'Deerhound', sp:'hund', aliases:['deerhound','scottish deerhound'], groups:['sighthound','giant'], conditions:['sighthound'], note:'' },
    { id:'windspiel', name:'Italienisches Windspiel', sp:'hund', aliases:['italienisches windspiel','italian greyhound','piccolo levriero'], groups:['sighthound','toy'], conditions:['sighthound'], note:'Sehr klein → zusätzlich Hypothermie/Hypoglykämie.' },

    /* --- Brachyzephale --- */
    { id:'franz-bulldogge', name:'Französische Bulldogge', sp:'hund', aliases:['franzoesische bulldogge','french bulldog','frenchie','franzbulldogge'], groups:['brachy'], conditions:['boas'], note:'Höchstes BOAS-/Anästhesierisiko; Regurgitation häufig.' },
    { id:'bulldogge', name:'Englische Bulldogge', sp:'hund', aliases:['englische bulldogge','english bulldog','bulldog','bulldogge'], groups:['brachy'], conditions:['boas','hyperuricosuria'], note:'BOAS + Hyperurikosurie; hypoplastische Trachea.' },
    { id:'mops', name:'Mops (Pug)', sp:'hund', aliases:['mops','pug'], groups:['brachy'], conditions:['boas'], note:'Ausgeprägtes BOAS; Präoxygenierung essenziell.' },
    { id:'boston', name:'Boston Terrier', sp:'hund', aliases:['boston terrier','boston'], groups:['brachy'], conditions:['boas'], note:'' },
    { id:'pekinese', name:'Pekingese', sp:'hund', aliases:['pekinese','pekingese'], groups:['brachy'], conditions:['boas'], note:'' },
    { id:'shih-tzu', name:'Shih Tzu', sp:'hund', aliases:['shih tzu','shihtzu'], groups:['brachy'], conditions:['boas'], note:'' },
    { id:'boxer', name:'Boxer', sp:'hund', aliases:['boxer','deutscher boxer'], groups:['brachy'], conditions:['boas','boxer-ace'], note:'Acepromazin-Empfindlichkeit (Bradykardie/Synkope) + BOAS + Boxer-Kardiomyopathie (ARVC).' },
    { id:'cavalier', name:'Cavalier King Charles Spaniel', sp:'hund', aliases:['cavalier','cavalier king charles','ckcs'], groups:['brachy'], conditions:['boas','mmvd-cavalier'], note:'Frühe Mitralklappenerkrankung (MMVD) + brachyzephale Züge.' },

    /* --- Herz/Gerinnung/Stoffwechsel-Rassen --- */
    { id:'dobermann', name:'Dobermann', sp:'hund', aliases:['dobermann','doberman','doberman pinscher'], groups:[], conditions:['dcm-doberman','vwd'], note:'DCM (oft okkult) + von-Willebrand-Typ-I – prä-OP Herz + Gerinnung abklären.' },
    { id:'deutsche-dogge', name:'Deutsche Dogge (Great Dane)', sp:'hund', aliases:['deutsche dogge','great dane','dogge'], groups:['giant'], conditions:['dcm-doberman'], note:'Riesenrasse: DCM/GDV; nach Magermasse dosieren.' },
    { id:'bernhardiner', name:'Bernhardiner', sp:'hund', aliases:['bernhardiner','saint bernard'], groups:['giant'], conditions:[], note:'Riesenrasse – Dosierung nach Magermasse, Hypothermie beachten.' },
    { id:'neufundlaender', name:'Neufundländer', sp:'hund', aliases:['neufundlaender','newfoundland'], groups:['giant'], conditions:['dcm-doberman'], note:'Subaortenstenose/DCM möglich.' },
    { id:'springer', name:'English Springer Spaniel', sp:'hund', aliases:['english springer spaniel','springer spaniel','springer'], groups:[], conditions:['pfk-deficiency'], note:'PFK-Mangel – alkalämie-/belastungsinduzierte Hämolyse.' },
    { id:'cocker', name:'American Cocker Spaniel', sp:'hund', aliases:['american cocker spaniel','cocker spaniel','cocker'], groups:[], conditions:['pfk-deficiency'], note:'PFK-Mangel möglich.' },
    { id:'basenji', name:'Basenji', sp:'hund', aliases:['basenji'], groups:[], conditions:['pk-deficiency'], note:'PK-Mangel (hämolytische Anämie).' },
    { id:'beagle', name:'Beagle', sp:'hund', aliases:['beagle'], groups:[], conditions:['pk-deficiency'], note:'PK-Mangel-Linien beschrieben.' },
    { id:'whwt', name:'West Highland White Terrier', sp:'hund', aliases:['west highland white terrier','westie','whwt'], groups:[], conditions:['pk-deficiency'], note:'' },
    { id:'scottish-terrier', name:'Scottish Terrier', sp:'hund', aliases:['scottish terrier','scottie'], groups:[], conditions:['vwd'], note:'von-Willebrand-Prädisposition.' },
    { id:'deutsch-kurzhaar', name:'Deutsch Kurzhaar', sp:'hund', aliases:['deutsch kurzhaar','german shorthaired pointer','dk'], groups:[], conditions:['vwd'], note:'vWD Typ 2 (schwer, qualitativ) beschrieben – DDAVP unzuverlässig.' },
    { id:'berner', name:'Berner Sennenhund', sp:'hund', aliases:['berner sennenhund','bernese mountain dog','berner'], groups:['giant'], conditions:['vwd'], note:'vWD + Riesenrasse.' },
    { id:'dalmatiner', name:'Dalmatiner', sp:'hund', aliases:['dalmatiner','dalmatian'], groups:[], conditions:['hyperuricosuria'], note:'Hyperurikosurie/Uratsteine – peri-OP Diurese.' },
    { id:'akita', name:'Akita', sp:'hund', aliases:['akita','akita inu'], groups:[], conditions:['hk-erythrozyten'], note:'HK-Typ-Erythrozyten (Pseudohyperkaliämie bei Hämolyse), Mikrozytose als Normvariante.' },
    { id:'shiba', name:'Shiba Inu', sp:'hund', aliases:['shiba','shiba inu'], groups:[], conditions:['hk-erythrozyten'], note:'Wie Akita: HK-Erythrozyten, Mikrozytose (niedriges MCV).' },

    /* --- Katzen --- */
    { id:'maine-coon', name:'Maine Coon', sp:'katze', aliases:['maine coon','mainecoon'], groups:[], conditions:['hcm-cat','mdr1-cat'], note:'HCM (MYBPC3 A31P); ABCB1-Ivermectin-Empfindlichkeit möglich.' },
    { id:'ragdoll', name:'Ragdoll', sp:'katze', aliases:['ragdoll'], groups:[], conditions:['hcm-cat','mdr1-cat'], note:'HCM (MYBPC3 R820W).' },
    { id:'perser', name:'Perser', sp:'katze', aliases:['perser','persian','perserkatze'], groups:['brachy'], conditions:['pkd-cat','boas'], note:'PKD (PKD1) + brachyzephale Atemwege.' },
    { id:'britisch-kh', name:'Britisch Kurzhaar', sp:'katze', aliases:['britisch kurzhaar','british shorthair','bkh'], groups:[], conditions:['pkd-cat','hcm-cat'], note:'PKD/HCM möglich.' },
    { id:'siam', name:'Siamkatze', sp:'katze', aliases:['siam','siamese','siamkatze'], groups:[], conditions:['mdr1-cat'], note:'ABCB1-Defekt beschrieben (Ivermectin/Eprinomectin meiden).' },
    { id:'russisch-blau', name:'Russisch Blau', sp:'katze', aliases:['russisch blau','russian blue'], groups:[], conditions:['mdr1-cat'], note:'' },
    { id:'abessinier', name:'Abessinier', sp:'katze', aliases:['abessinier','abyssinian'], groups:[], conditions:['pk-deficiency'], note:'PK-Mangel (hämolytische Anämie).' },
    { id:'bengal', name:'Bengal', sp:'katze', aliases:['bengal','bengalkatze'], groups:[], conditions:['pk-deficiency'], note:'' },
    { id:'sphynx', name:'Sphynx', sp:'katze', aliases:['sphynx','sphinx'], groups:[], conditions:['hcm-cat'], note:'HCM-Prädisposition; Wärmemanagement (haarlos).' }
  ];

  /* ------------------------- Wirkstoff-Regeln ------------------------- */
  /* drugs = App-Wirkstoff-IDs / Namensteile (Substring-Match).
     scope  = {groups|conditions|breeds}. level: avoid|reduce|caution|monitor. */
  var DRUG_RULES = [
    /* MDR1 – Kat. 2 (Dosisreduktion + Überwachung; CliniPharm) */
    { id:'mdr1-ace', rescue: ['ace-hypotension', 'nicht-aufwachen'], drugs:['acepromazin'], scope:{conditions:['mdr1']}, level:'reduce', factor:'−25 % (heterozygot) bis −30–50 % (homozygot)', cond:'mdr1',
      text:'MDR1: Acepromazin dosisreduzieren + engmaschig überwachen – verstärkte/verlängerte Sedation (belegt v. a. homozygot mut/mut, Deshpande 2016). Keine Kontraindikation.',
      sources:['CliniPharm MDR1/ABCB1','WSU-VCPL','Deshpande 2016 (JVIM)'] },
    { id:'mdr1-butor', rescue: ['opioid-ueberhang', 'nicht-aufwachen'], drugs:['butorphanol'], scope:{conditions:['mdr1']}, level:'reduce', factor:'−25 % (het) bis −30–50 % (homozygot); homozygot möglichst ganz meiden', cond:'mdr1',
      text:'MDR1: Butorphanol reduzieren + überwachen. Fallbericht (homozygoter Collie): schwere Neurotoxikose nach 0,2 mg/kg (Sedation, Ataxie, Hypersalivation, Krampf) – bei homozygot besser meiden (BSAVA).',
      sources:['CliniPharm MDR1/ABCB1','WSU-VCPL','Fallbericht PMC12159028'] },
    { id:'mdr1-opioid', rescue: ['opioid-ueberhang', 'nicht-aufwachen'], drugs:['methadon','polamivet','morphin','fentanyl'], scope:{conditions:['mdr1']}, level:'caution', factor:'Dosisvorgaben strikt einhalten, titrieren, Naloxon bereit', cond:'mdr1',
      text:'MDR1: reine µ-Opioide (Methadon/Morphin/Fentanyl) sind P-gp-Substrate (CliniPharm Kat. 2) – mögliche verstärkte/verlängerte ZNS-/Atemdepression bei mut/mut. Nicht kontraindiziert: enge Dosis, titrieren, engmaschig überwachen.',
      sources:['CliniPharm MDR1/ABCB1'] },
    { id:'mdr1-apomorphin', rescue: ['nicht-aufwachen'], drugs:['apomorphin'], scope:{conditions:['mdr1']}, level:'avoid', cond:'mdr1',
      text:'MDR1: Apomorphin ist Kat.-1-Wirkstoff (P-gp-Substrat) → verstärkte/verlängerte ZNS-Wirkung möglich. Zurückhaltend/meiden, Alternative erwägen, überwachen.',
      sources:['CliniPharm MDR1/ABCB1'] },

    /* Windhund-Typ */
    { id:'sight-propofol', rescue: ['propofol-apnoe', 'nicht-aufwachen', 'hypothermie'], drugs:['propofol'], scope:{groups:['sighthound']}, level:'caution', factor:'Bolus −25–30 %, langsam titrieren, KEINE Propofol-CRI/TIVA', cond:'sighthound',
      text:'Windhund: Propofol-Induktionsbolus ~25–30 % reduzieren, langsam titrieren – deutlich verlängerte Aufwachphase (~70 % geringere CYP2B11-Aktivität). KEINE Propofol-Dauertropfinfusion/TIVA; Alfaxalon oder Inhalationserhalt bevorzugen.',
      sources:['Court 2019 (PMC6952448)','ACVAA'] },
    { id:'sight-alfax', rescue: ['hypothermie'], drugs:['alfaxalon'], scope:{groups:['sighthound']}, level:'monitor', factor:'Induktion ~1–2 mg/kg i.v. langsam, titrieren', cond:'sighthound',
      text:'Windhund: Alfaxalon ist eine gut geeignete, sichere Induktions-Alternative (Propofol bleibt ebenfalls sicher). Titrieren, aktiv wärmen (Hypothermie-Neigung).',
      sources:['ACVAA'] },
    { id:'sight-ace', rescue: ['ace-hypotension', 'hypothermie'], drugs:['acepromazin'], scope:{groups:['sighthound']}, level:'reduce', factor:'0,02–0,03 mg/kg (niedrig)', cond:'sighthound',
      text:'Windhund: erhöhte Phenothiazin-Empfindlichkeit (klinische Beobachtung) + Hypotension/Hypothermie-Neigung → Acepromazin niedrig dosieren (0,02–0,03 mg/kg). Nicht generell absetzen (hebt Arrhythmie-Schwelle).',
      sources:['Court 1999','Clinician’s Brief'] },
    { id:'sight-ketamin', rescue: ['nicht-aufwachen', 'hypothermie'], drugs:['ketamin'], scope:{groups:['sighthound']}, level:'monitor', cond:'sighthound',
      text:'Windhund: verlängerte Ketamin-Aufwachphase möglich (Metabolismus) – niedrig halten, Aufwachen ruhig gestalten.',
      sources:['Plumb’s'] },

    /* Boxer – Acepromazin */
    { id:'boxer-ace', rescue: ['ace-hypotension'], drugs:['acepromazin'], scope:{conditions:['boxer-ace']}, level:'caution', cond:'boxer-ace',
      text:'Boxer: Acepromazin kann ausgeprägte Bradykardie/Hypotension/Synkope auslösen (Vagotonus) – niedrig dosieren oder meiden, Anticholinergikum bereit.',
      sources:['Plumb’s','ACVAA'] },
    { id:'boxer-a2', rescue: ['alpha2-ueberdosis'], drugs:['dexmedetomidin','medetomidin','xylazin'], scope:{conditions:['boxer-ace']}, level:'caution', cond:'boxer-ace',
      text:'Boxer: α2-Agonisten verstärken Vagotonus/Bradykardie (ARVC beachten) – niedrigste Dosis, HF/EKG überwachen; gegen Bradykardie bevorzugt Atipamezol statt Routine-Anticholinergikum.',
      sources:['ACVAA'] },

    /* MDR1-Katze */
    { id:'mdr1cat-ivermectin', rescue: ['ivermectin-mdr1'], drugs:['ivermectin','eprinomectin'], scope:{conditions:['mdr1-cat']}, level:'avoid', cond:'mdr1-cat',
      text:'ABCB1-Katze: makrozyklische Laktone neurotoxisch – Eprinomectin KONTRAINDIZIERT (schon in zugelassener Dosis), Ivermectin niedrige Label-Dosis meist sicher, hohe/extralabel meiden. CliniPharm Kat. 1.',
      sources:['CliniPharm ABCB1 Katze','WSU'] },

    /* HCM-Katze */
    { id:'hcm-ketamin', rescue: ['ketamin-hcm', 'cpr'], drugs:['ketamin'], scope:{conditions:['hcm-cat']}, level:'avoid', cond:'hcm-cat',
      text:'HCM-Katze: Ketamin steigert Herzfrequenz/Kontraktilität + myokardialen O₂-Bedarf → dynamische LVOT-Obstruktion (SAM) verschlimmern; besonders als alleiniges Anästhetikum meiden (fulminante Dekompensation beschrieben). Etomidat/Alfaxalon bevorzugen.',
      sources:['ACVAA','Martin-Flores'] },
    { id:'hcm-a2', rescue: ['alpha2-ueberdosis', 'ketamin-hcm'], drugs:['dexmedetomidin','medetomidin','xylazin'], scope:{conditions:['hcm-cat']}, level:'caution', factor:'falls überhaupt nur niedrigste Dosis', cond:'hcm-cat',
      text:'HCM-Katze: α2-Agonisten kontrovers – periphere Vasokonstriktion erhöht Nachlast/SVR. Falls eingesetzt, nur niedrigste Dosis, Herz/Blutdruck überwachen, Atipamezol bereit.',
      sources:['ACVAA'] },
    { id:'hcm-anticholinergic', rescue: ['ketamin-hcm'], drugs:['atropin','glyco'], scope:{conditions:['hcm-cat']}, level:'caution', cond:'hcm-cat',
      text:'HCM-Katze: Anticholinergika (Frequenzanstieg) zurückhaltend – Tachykardie verkürzt die Füllung und verschlechtert die dynamische Obstruktion.',
      sources:['ACVAA'] },

    /* MH – volatile Trigger */
    { id:'mh-volatile', rescue: ['mh-krise'], drugs:['isofluran','sevofluran','vapor','succinylcholin'], scope:{conditions:['malignant-hyperthermia']}, level:'avoid', cond:'malignant-hyperthermia',
      text:'MH-Risiko: ALLE volatilen Inhalationsanästhetika (Iso-/Sevofluran) und Succinylcholin sind Trigger – meiden. Sichere TIVA (Propofol/Ketamin/Alfaxalon/Opioide/Benzos), nicht-depol. Relaxanzien (Atracurium/Rocuronium) sicher. Dantrolen 1–3 mg/kg i.v. bereit. Frühzeichen: EtCO₂-Anstieg VOR Hyperthermie.',
      sources:['Merck Vet Manual','ACVAA'] },

    /* NSAID bei Niere/Gerinnung */
    { id:'nsaid-pkd', rescue: ['nsaid-ueberdosis', 'hyperkaliaemie'], drugs:['meloxicam','carprofen','robenacoxib'], scope:{conditions:['pkd-cat','pk-deficiency']}, level:'caution', cond:'pkd-cat',
      text:'Bei Nierenerkrankung/chronischer Anämie: NSAID nur bei normaler Nierenfunktion, Hydratation und Blutdruck – sonst meiden.',
      sources:['IRIS','WSAVA'] },
    { id:'nsaid-vwd', rescue: ['blutung-vwd', 'nsaid-ueberdosis'], drugs:['meloxicam','carprofen','robenacoxib'], scope:{conditions:['vwd']}, level:'avoid', cond:'vwd',
      text:'von-Willebrand/Gerinnungsstörung: NSAID und v. a. ASS/Aspirin peri-operativ meiden (Thrombozytenfunktionshemmung zusätzlich zum vWF-Defekt). Analgesie: Opioide first-line. Prä-OP bukkale Blutungszeit/vWF, DDAVP (Typ 1) erwägen; keine i.m.-Injektionen.',
      sources:['Plumb’s','eClinPath'] },

    /* DCM – negativ inotrop / α2 */
    { id:'cardiac-a2', rescue: ['alpha2-ueberdosis', 'cpr'], drugs:['dexmedetomidin','medetomidin','xylazin'], scope:{conditions:['dcm-doberman','mmvd-cavalier']}, level:'avoid', factor:'meiden; falls unumgänglich Mikrodosis + Atipamezol bereit', cond:'dcm-doberman',
      text:'Herzerkrankung (DCM/MMVD): α2-Agonisten erhöhen die Nachlast, HZV kann 30–50 % fallen → meiden. WICHTIG: gegen α2-Bradykardie KEINE routinemäßigen Anticholinergika (Atropin/Glyco steigern bei fortbestehender α2-Vasokonstriktion die Nachlast, proarrhythmisch) – stattdessen mit Atipamezol antagonisieren.',
      sources:['ACVAA'] },
    { id:'boas-induction', rescue: ['regurgitation', 'propofol-apnoe'], drugs:['propofol','alfaxalon','etomidat','ketamin'], scope:{conditions:['boas']}, level:'caution', factor:'präoxygenieren 3–5 min, langsam >60 s titrieren, sofort intubationsbereit', cond:'boas',
      text:'Brachyzephal (BOAS): Einleitungsboli → Apnoe (Propofol/Alfaxalon zusätzlich Hypotension). 3–5 min präoxygenieren, langsam auf Wirkung titrieren, sofort intubieren (mehrere Tubusgrößen + Absaugung). Etomidat kreislaufstabiler, braucht Benzodiazepin-Co-Induktion. Hohes Regurgitations-/Aspirationsrisiko (Propofol > Alfaxalon). Erst bei voll wachem Schluckreflex extubieren.',
      sources:['AAHA','Today’s Vet Practice'] },
    { id:'mmvd-ace', rescue: ['ace-hypotension'], drugs:['acepromazin'], scope:{conditions:['mmvd-cavalier']}, level:'caution', factor:'nur unteres Dosisende, nur bei kompensierter Erkrankung', cond:'mmvd-cavalier',
      text:'MMVD (Cavalier): niedrig dosiertes Acepromazin senkt günstig die Nachlast (weniger Regurgitation) bei kompensierter Erkrankung (B1/B2); hohe Dosen und dekompensierte Herzinsuffizienz (C/D) meiden (lang wirksam, nicht antagonisierbar).',
      sources:['ACVIM','cavalierhealth.org'] }
  ];

  /* ------------------------- Erstwahl-Protokolle -------------------------
     Bausteine einer Narkose fuer eine RISIKOLAGE (nicht fuer eine Rasse) — eine Rasse erbt sie
     ueber ihre Erkrankungen. Wird vom Rassekatalog (breed-katalog.js) befuellt.
     Aufbau je Eintrag: { name, praemed, einleitung, erhalt, analgesie, ziele, nicht[], sources[] } */
  var PROTOCOLS = {};

  /* --------------------------- Rettungswege ---------------------------
     Was tun, wenn das FALSCHE Mittel schon im Tier ist. Schluessel = Lage (z. B. 'alpha2-ueberdosis')
     oder Wirkstoff-Token. Aufbau: { name, zeichen, schritte[], nicht[], sources[] } */
  var RESCUE = {};

  /* --------------------------- Engine / API --------------------------- */
  var SEV = { avoid: 3, reduce: 2, caution: 1, monitor: 0 };
  var RISK = { hoch: 3, mittel: 2, niedrig: 1 };
  function norm(s) { return (s == null ? '' : String(s)).toLowerCase()
      .replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss')
      .replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim(); }

  /* ---------------------------------------------------------------------------
     register(pack) — der Rassekatalog und spaetere Nachtraege haengen sich hier ein,
     statt diese Datei aufzublaehen. Alles ADDITIV: ein vorhandener, handgepflegter
     Eintrag wird NIE geloescht, nur um Felder ergaenzt, die er noch nicht hat.
     Grund: die Texte hier sind einzeln gegen Quellen geprueft; ein generierter
     Katalog darf sie ergaenzen, aber nicht ueberschreiben.
     --------------------------------------------------------------------------- */
  var _breedIx = null;                       /* id -> Rasse, wird bei Aenderung verworfen */
  function _mergeObj(ziel, pack, hart) {
    if (!pack) return;
    Object.keys(pack).forEach(function (k) {
      if (!ziel[k]) { ziel[k] = pack[k]; return; }
      var alt = ziel[k], neu = pack[k], out = {};
      Object.keys(neu).forEach(function (f) { out[f] = neu[f]; });
      Object.keys(alt).forEach(function (f) {
        var leer = out[f] == null || out[f] === '' || (Array.isArray(out[f]) && !out[f].length);
        if (!hart || leer) out[f] = alt[f];                    /* Handgepflegtes gewinnt */
      });
      ziel[k] = out;
    });
  }
  function register(pack) {
    if (!pack) return root.VETBREED;
    _mergeObj(GROUPS, pack.groups);
    _mergeObj(CONDITIONS, pack.conditions);
    _mergeObj(PROTOCOLS, pack.protocols);
    _mergeObj(RESCUE, pack.rescue);
    (pack.breeds || []).forEach(function (b) {
      if (!b || !b.id) return;
      var alt = byId(b.id);
      if (!alt) { BREEDS.push(b); return; }
      /* gleiche id: Mengen vereinen, Text der gepflegten Fassung behalten */
      ['groups', 'conditions', 'aliases'].forEach(function (f) {
        var m = (alt[f] || []).slice();
        (b[f] || []).forEach(function (x) { if (m.indexOf(x) < 0) m.push(x); });
        alt[f] = m;
      });
      ['freq', 'note', 'fci', 'size'].forEach(function (f) { if (!alt[f] && b[f]) alt[f] = b[f]; });
      delete alt.__ct;                                  /* Suchtext neu bauen lassen */
    });
    (pack.rules || []).forEach(function (r) {
      if (!r || !r.id) return;
      for (var i = 0; i < DRUG_RULES.length; i++) if (DRUG_RULES[i].id === r.id) return;
      DRUG_RULES.push(r);
    });
    _breedIx = null;
    return root.VETBREED;
  }

  function bySpecies(sp) { return BREEDS.filter(function (b) { return !sp || b.sp === sp; }); }
  function byId(id) {
    if (!_breedIx) { _breedIx = {}; for (var i = 0; i < BREEDS.length; i++) _breedIx[BREEDS[i].id] = BREEDS[i]; }
    return _breedIx[id] || null;
  }
  function resolve(text, sp) {
    if (!text) return null;
    var tr = search(text, sp, 1);
    return tr.length ? tr[0].breed : null;
  }
  /* ---------------------------------------------------------------------------
     search(text, sp, limit) — Sofortsuche fuer das Rassefeld.
     Rangfolge, damit beim Tippen das Erwartete OBEN steht und nicht irgendein
     Zufallstreffer: exakt > Namensanfang > Anfang eines Wortes im Namen > Alias-Anfang
     > irgendwo im Namen > irgendwo im Alias > Treffer ueber eine Erkrankung ("HCM", "MDR1").
     Der Erkrankungstreffer ist bewusst der schwaechste: wer "Perser" tippt, will die Rasse,
     nicht jede Katze mit PKD. Ohne Eingabe kommt die nach Namen sortierte Artenliste.
     --------------------------------------------------------------------------- */
  /* Bei jedem Tastendruck ueber mehrere hundert Rassen laufen — der Erkrankungstext wird deshalb
   * einmal je Rasse gebaut und behalten. Ohne das entstuende er pro Buchstabe neu. */
  function _condText(b) {
    if (b.__ct != null) return b.__ct;
    var t = '';
    /* Ohne c.gene — dort stehen Rassenamen drin ("MYBPC3 Maine Coon A31P / Ragdoll R820W").
     * Sonst faende die Eingabe „ragdoll" jede Katze mit HCM statt der Ragdoll. */
    (b.conditions || []).forEach(function (k) { var c = CONDITIONS[k]; if (c) t += ' ' + k + ' ' + c.name; });
    (b.groups || []).forEach(function (k) { var g = GROUPS[k]; if (g) t += ' ' + k + ' ' + g.name; });
    b.__ct = norm(t);
    return b.__ct;
  }
  function _wortAnfang(hay, nadel) {
    var i = hay.indexOf(nadel);
    while (i >= 0) { if (i === 0 || hay.charAt(i - 1) === ' ') return true; i = hay.indexOf(nadel, i + 1); }
    return false;
  }
  function search(text, sp, limit) {
    var pool = bySpecies(sp), t = norm(text || ''), max = limit || 40, out = [];
    if (!t) {
      out = pool.slice().sort(function (a, z) { return norm(a.name) < norm(z.name) ? -1 : 1; });
      return out.slice(0, max).map(function (b) { return { breed: b, score: 0 }; });
    }
    var ueberErkrankung = [];
    pool.forEach(function (b) {
      var n = norm(b.name), al = (b.aliases || []).map(norm), s = 0;
      if (n === t || b.id === t || al.indexOf(t) >= 0) s = 100;
      else if (n.indexOf(t) === 0) s = 80;
      else if (al.some(function (a) { return a.indexOf(t) === 0; })) s = 70;
      else if (_wortAnfang(n, t)) s = 60;
      else if (al.some(function (a) { return _wortAnfang(a, t); })) s = 50;
      else if (n.indexOf(t) >= 0) s = 40;
      else if (al.some(function (a) { return a.indexOf(t) >= 0; })) s = 30;
      else if (_condText(b).indexOf(t) >= 0) { ueberErkrankung.push({ breed: b, score: 12 }); return; }
      if (s) out.push({ breed: b, score: s });
    });
    /* Erkrankungstreffer NUR, wenn der Name gar nichts hergibt. Wer „hcm" oder „mdr1" tippt,
     * sucht die betroffenen Rassen; wer „ragdoll" tippt, sucht die Ragdoll und nicht die
     * dreiundzwanzig anderen Katzen, bei denen HCM hinterlegt ist. */
    if (!out.length) out = ueberErkrankung;
    out.sort(function (a, z) {
      if (z.score !== a.score) return z.score - a.score;
      var an = norm(a.breed.name), zn = norm(z.breed.name);
      if (an.length !== zn.length) return an.length - zn.length;   /* kuerzerer Name zuerst */
      return an < zn ? -1 : 1;
    });
    return out.slice(0, max);
  }
  /* Welche Tierarten haben ueberhaupt Rassen im Katalog? (steuert die Sichtbarkeit des Feldes) */
  function speciesWithBreeds() {
    var m = {}; BREEDS.forEach(function (b) { m[b.sp] = (m[b.sp] || 0) + 1; }); return m;
  }
  function conditionsOf(b) {
    if (!b) return [];
    return (b.conditions || []).map(function (k) { var c = CONDITIONS[k]; return c ? Object.assign({ key: k }, c) : null; }).filter(Boolean);
  }
  function groupsOf(b) {
    if (!b) return [];
    return (b.groups || []).map(function (k) { var g = GROUPS[k]; return g ? Object.assign({ key: k }, g) : null; }).filter(Boolean);
  }
  function profile(id) { var b = typeof id === 'object' ? id : byId(id); if (!b) return null; return { breed: b, conditions: conditionsOf(b), groups: groupsOf(b) }; }

  function inScope(b, scope) {
    if (!scope) return false;
    if (scope.breeds && scope.breeds.indexOf(b.id) >= 0) return true;
    if (scope.groups && scope.groups.some(function (g) { return (b.groups || []).indexOf(g) >= 0; })) return true;
    if (scope.conditions && scope.conditions.some(function (c) { return (b.conditions || []).indexOf(c) >= 0; })) return true;
    return false;
  }
  function isWord(ch) { return /[a-z0-9]/.test(ch); }
  function drugMatch(ruleDrugs, drugId) {
    var d = norm(drugId);
    return (ruleDrugs || []).some(function (r) {
      r = norm(r);
      if (d === r) return true;
      /* Regel-Token als ganzes Wort im Wirkstoff-String (Wortgrenzen) –
         verhindert Fehltreffer wie "apomorphin" ⊃ "morphin". */
      var i = d.indexOf(r);
      if (i >= 0) {
        var okB = (i === 0) || !isWord(d.charAt(i - 1));
        var okA = (i + r.length >= d.length) || !isWord(d.charAt(i + r.length));
        if (okB && okA) return true;
      }
      /* Abkürzung als Präfix des Regel-Tokens, z. B. "med" → "medetomidin" */
      if (d.length >= 3 && r.indexOf(d) === 0) return true;
      return false;
    });
  }
  /* Alle Warnungen einer Rasse für einen Wirkstoff (App-ID/Name). */
  function drugWarnings(breedRef, drugId) {
    var b = typeof breedRef === 'object' ? breedRef : byId(breedRef);
    if (!b || !drugId) return [];
    var out = [];
    DRUG_RULES.forEach(function (r) {
      if (!inScope(b, r.scope)) return;
      if (!drugMatch(r.drugs, drugId)) return;
      /* rescue MUSS mit: checkGabe() entscheidet daran, WELCHER Notfallablauf zu DIESEM Wirkstoff
       * gezeigt wird. Fehlte es hier, fiel checkGabe auf die Wege der Erkrankung zurueck — und
       * unter „Butorphanol gebucht" stand der Ivermectin-Ablauf. */
      out.push({ id: r.id, level: r.level, factor: r.factor, text: r.text, sources: r.sources, cond: r.cond, rescue: r.rescue });
    });
    out.sort(function (a, z) { return (SEV[z.level] || 0) - (SEV[a.level] || 0); });
    return out;
  }
  /* Gibt es für diese Rasse überhaupt eine Regel zu diesem Wirkstoff? (schnell) */
  function anyWarning(breedRef, drugId) { return drugWarnings(breedRef, drugId).length > 0; }
  /* Anzahl betroffener App-Wirkstoffe (für Badges). drugIds = Liste vorhandener IDs. */
  function affectedDrugs(breedRef, drugIds) {
    var b = typeof breedRef === 'object' ? breedRef : byId(breedRef);
    if (!b) return [];
    return (drugIds || []).filter(function (id) { return anyWarning(b, id); });
  }
  function hasAirwayRisk(breedRef) { var b = typeof breedRef === 'object' ? breedRef : byId(breedRef); return !!(b && (b.groups || []).indexOf('brachy') >= 0); }

  /* Gesamtrisiko einer Rasse: die schwerste hinterlegte Erkrankung entscheidet. */
  function riskOf(breedRef) {
    var b = typeof breedRef === 'object' ? breedRef : byId(breedRef);
    if (!b) return null;
    var hoch = 0;
    (b.conditions || []).forEach(function (k) { var c = CONDITIONS[k]; if (c) hoch = Math.max(hoch, RISK[c.risk] || 1); });
    (b.groups || []).forEach(function (k) { if (k === 'brachy') hoch = Math.max(hoch, 3); if (k === 'sighthound' || k === 'toy' || k === 'giant') hoch = Math.max(hoch, 2); });
    return hoch >= 3 ? 'hoch' : hoch === 2 ? 'mittel' : hoch === 1 ? 'niedrig' : null;
  }

  /* ---------------------------------------------------------------------------
     plan(breedRef) — der NARKOSEPLAN dieser Rasse: was als erstes waehlen, was
     weglassen, worauf schauen, und was tun, wenn es kippt. Er entsteht NICHT neu,
     sondern setzt sich aus den Erkrankungen der Rasse und ihren Protokollen
     zusammen — jede Zeile bleibt damit auf ihre Quelle rueckfuehrbar.
     Doppelte Nennungen (zwei Erkrankungen mit demselben Protokoll) fallen weg.
     --------------------------------------------------------------------------- */
  function plan(breedRef) {
    var b = typeof breedRef === 'object' ? breedRef : byId(breedRef);
    if (!b) return null;
    var erst = [], meiden = [], monitor = [], rettung = [], gesehen = {}, mGes = {}, rGes = {};
    /* Ein Protokoll darf artgebunden sein (sp). Zeigt eine Erkrankung, die es bei mehreren Arten
     * gibt (BOAS, MDR1), auf ein Hundeprotokoll, bekaeme ein Perser sonst die Hundeanleitung.
     * Dann wird die Artfassung <schluessel>-<art> genommen — und wenn es die nicht gibt, gar
     * nichts. Lieber keine Empfehlung als die einer anderen Tierart. */
    function protoAdd(pk, quelleName) {
      var p = PROTOCOLS[pk];
      if (p && p.sp && p.sp !== b.sp) {
        var alt = PROTOCOLS[pk + '-' + b.sp];
        if (!alt) return;
        pk = pk + '-' + b.sp; p = alt;
      }
      if (!p || gesehen[pk]) return; gesehen[pk] = 1;
      erst.push({ key: pk, name: p.name || quelleName, praemed: p.praemed, einleitung: p.einleitung,
        erhalt: p.erhalt, analgesie: p.analgesie, ziele: p.ziele, warum: p.warum, rang: p.rang || 0,
        nicht: p.nicht || [], sources: p.sources || [] });
      (p.nicht || []).forEach(function (x) { var k = norm(x); if (!mGes[k]) { mGes[k] = 1; meiden.push({ text: x, von: p.name || quelleName }); } });
      if (p.ziele) { var zk = norm(p.ziele); if (!mGes['z' + zk]) { mGes['z' + zk] = 1; monitor.push({ text: p.ziele, von: p.name || quelleName }); } }
    }
    /* Dieselbe Artbindung wie bei den Protokollen — und aus demselben Grund. Eine Maine Coon
     * traegt die ABCB1-Variante der Katze und landete darueber in der Gruppe „MDR1"; von dort
     * bekam sie den Rettungsweg „Makrozyklisches Lakton beim MDR1-HUND" angehaengt. Ein
     * Notfallablauf der falschen Tierart ist schlimmer als keiner: er liest sich vollkommen
     * plausibel. */
    function rescueAdd(rk, quelleName) {
      var r = RESCUE[rk]; if (!r || rGes[rk]) return;
      if (r.sp && r.sp !== b.sp) {
        var alt = RESCUE[rk + '-' + b.sp];
        if (!alt) return;
        rk = rk + '-' + b.sp; r = alt;
        if (rGes[rk]) return;
      }
      rGes[rk] = 1;
      rettung.push({ key: rk, name: r.name || quelleName, zeichen: r.zeichen, schritte: r.schritte || [],
        nicht: r.nicht || [], sources: r.sources || [] });
    }
    /* Schwerste Erkrankung zuerst: bei einer BKH mit PKD UND HCM muss die Herzempfehlung oben
     * stehen, nicht die Niere — sonst liest der Tierarzt im Ernstfall die falsche Zeile zuerst. */
    var conds = (b.conditions || []).slice().sort(function (a, z) {
      return (RISK[(CONDITIONS[z] || {}).risk] || 0) - (RISK[(CONDITIONS[a] || {}).risk] || 0);
    });
    /* Erst die gepflegten Protokolle (Gruppe + Erkrankung), dann erst die Einzelhinweise aus
     * den Erkrankungen selbst. Sonst steht bei einem Mops „Stenotische Nasenlöcher" ueber dem
     * vollstaendigen BOAS-Protokoll — richtig, aber nicht das, was man zuerst lesen will. */
    conds.forEach(function (k) {
      var c = CONDITIONS[k]; if (!c) return;
      if (c.protocol) [].concat(c.protocol).forEach(function (p) { protoAdd(p, c.name); });
    });
    /* Gruppenprotokolle NACH den Erkrankungen: eine Britisch Kurzhaar ist auch etwas
     * kurzköpfig — aber wer sie vor sich hat, muss zuerst die HCM lesen und nicht den
     * Atemwegshinweis. Ohne eingetragene Erkrankung bleibt die Gruppe die einzige Quelle. */
    (b.groups || []).forEach(function (k) {
      var g = GROUPS[k]; if (!g) return;
      if (g.protocol) [].concat(g.protocol).forEach(function (p) { protoAdd(p, g.name); });
    });
    conds.forEach(function (k) {
      var c = CONDITIONS[k]; if (!c) return;
      /* rescueOnly = Eintrag, der in Wahrheit ein Notfallablauf ist (kein Narkoseplan) —
       * seine Schritte gehoeren unter „stabilisieren", nicht unter „erste Wahl". */
      if (c.first && !c.rescueOnly) { var fk = 'c:' + k; if (!gesehen[fk]) { gesehen[fk] = 1;
        erst.push({ key: fk, name: c.name, einleitung: c.first, warum: c.short, rang: 5, nicht: c.avoid || [], sources: c.sources || [] }); } }
      (c.avoid || []).forEach(function (x) { var kk = norm(x); if (!mGes[kk]) { mGes[kk] = 1; meiden.push({ text: x, von: c.name }); } });
      if (c.monitor) { var mk = norm(c.monitor); if (!mGes['m' + mk]) { mGes['m' + mk] = 1; monitor.push({ text: c.monitor, von: c.name }); } }
      if (c.rescue) [].concat(c.rescue).forEach(function (r) { rescueAdd(r, c.name); });
    });
    /* Gruppen-Rettungswege ZULETZT. Die der Art (Reanimation, Hypothermie, Unterzucker,
     * Regurgitation, wacht nicht auf …) gelten fuer jedes Tier und duerfen deshalb nie die
     * rassespezifischen aus der Liste draengen — die Liste ist gedeckelt. */
    (b.groups || []).forEach(function (k) {
      var g = GROUPS[k]; if (!g || !g.rescue) return;
      [].concat(g.rescue).forEach(function (r) { rescueAdd(r, g.name); });
    });
    /* Reihenfolge: erkrankungsspezifisches Protokoll → Einzelhinweis der Erkrankung →
     * Artgrundsatz (rang 9). Die Artgrundsätze gelten immer, aber wer eine BKH mit HCM vor sich
     * hat, will nicht zuerst „Katze — Narkosegrundsätze" lesen. Stabil sortiert (Index als
     * Zweitschlüssel), damit die Reihenfolge innerhalb einer Stufe erhalten bleibt. */
    erst.forEach(function (e, i) { e.__i = i; });
    erst.sort(function (a, z) { return (a.rang || 0) - (z.rang || 0) || a.__i - z.__i; });
    erst.forEach(function (e) { delete e.__i; });
    return { breed: b, risk: riskOf(b),
      erstwahl: erst.slice(0, 8), meiden: meiden.slice(0, 24),
      monitoring: monitor.slice(0, 12), rettung: rettung.slice(0, 10) };
  }

  /* Rettungswege zu einem Schluessel oder zu einem Wirkstoff (fuer den Notfallknopf). */
  function rescueFor(keys, sp) {
    var out = [], seen = {};
    [].concat(keys || []).forEach(function (k) {
      var r = RESCUE[k]; if (!r) return;
      if (sp && r.sp && r.sp !== sp) { var alt = RESCUE[k + '-' + sp]; if (!alt) return; k = k + '-' + sp; r = alt; }
      if (seen[k]) return; seen[k] = 1;
      out.push({ key: k, name: r.name, zeichen: r.zeichen, schritte: r.schritte || [], nicht: r.nicht || [], sources: r.sources || [] });
    });
    return out;
  }

  /* ---------------------------------------------------------------------------
     checkGabe(breedRef, drugName) — die Pruefung im Augenblick der BESTAETIGTEN Gabe.
     Liefert die schwerste Warnung dieser Rasse zu diesem Wirkstoff und gleich den
     passenden Rettungsweg dazu. Genau das ist der Fall, den der Tierarzt braucht:
     das Mittel ist schon drin, jetzt zaehlt nur noch, wie das Tier stabil wird.
     --------------------------------------------------------------------------- */
  function checkGabe(breedRef, drugName) {
    var b = typeof breedRef === 'object' ? breedRef : byId(breedRef);
    if (!b || !drugName) return null;
    var ws = drugWarnings(b, drugName);
    if (!ws.length) return null;
    /* WELCHER Rettungsweg gezeigt wird, haengt am WIRKSTOFF, nicht an der Erkrankung.
     * Die Erkrankung „MDR1" fuehrt drei Wege (Ivermectin-Toxikose, Opioid-Ueberhang, wacht nicht
     * auf). Wer Butorphanol bucht, bekam bisher den Ivermectin-Ablauf zuerst — richtig zur Rasse,
     * falsch zum Mittel. Traegt die Wirkstoffregel einen eigenen Weg, gilt nur dieser; erst wenn
     * keine der Warnungen einen mitbringt, wird auf die Wege der Erkrankung zurueckgegriffen. */
    var top = ws[0], rk = [], eigene = [];
    ws.forEach(function (w) {
      if (w.rescue) [].concat(w.rescue).forEach(function (x) { if (eigene.indexOf(x) < 0) eigene.push(x); });
    });
    if (eigene.length) rk = eigene;
    else ws.forEach(function (w) {
      var c = CONDITIONS[w.cond];
      if (c && c.rescue) [].concat(c.rescue).forEach(function (x) { if (rk.indexOf(x) < 0) rk.push(x); });
    });
    return { breed: b, drug: drugName, level: top.level, warnungen: ws, rettung: rescueFor(rk, b.sp) };
  }

  root.VETBREED = {
    version: 2, GROUPS: GROUPS, CONDITIONS: CONDITIONS, BREEDS: BREEDS, DRUG_RULES: DRUG_RULES,
    PROTOCOLS: PROTOCOLS, RESCUE: RESCUE,
    SEV: SEV, norm: norm, register: register,
    bySpecies: bySpecies, byId: byId, resolve: resolve, search: search, speciesWithBreeds: speciesWithBreeds,
    conditionsOf: conditionsOf, groupsOf: groupsOf, profile: profile,
    drugWarnings: drugWarnings, anyWarning: anyWarning, affectedDrugs: affectedDrugs, hasAirwayRisk: hasAirwayRisk,
    riskOf: riskOf, plan: plan, rescueFor: rescueFor, checkGabe: checkGabe
  };
  if (typeof module === 'object' && module.exports) module.exports = root.VETBREED;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
