/* ============================================================================
   shared/breed-genetics.js  ·  Canis VET-PHARM
   Rassespezifische Genetik & Arzneimittel-/Narkose-Warnungen  ·  window.VETBREED
   ----------------------------------------------------------------------------
   Von ALLEN Modulen genutzt (Anästhesie, Blutwerte, Stoffwechsel, Reise, Hub).
   Quellen: CliniPharm/CliniTox – vetpharm.uzh.ch (Pharmakogenetik MDR1/ABCB1),
   Washington State University VCPL (MDR1 Problem-Wirkstoffe), Plumb's Veterinary
   Drug Handbook, WSAVA/ACVAA/AAHA-Anästhesie-Leitlinien, BSAVA, UC Davis VGL,
   PennGen. ALLES Referenz-/Lernhilfe – kein Ersatz für klinisches Urteil.
   ============================================================================ */
(function () {
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
    { id:'mdr1-ace', drugs:['acepromazin'], scope:{conditions:['mdr1']}, level:'reduce', factor:'−25 % (heterozygot) bis −30–50 % (homozygot)', cond:'mdr1',
      text:'MDR1: Acepromazin dosisreduzieren + engmaschig überwachen – verstärkte/verlängerte Sedation (belegt v. a. homozygot mut/mut, Deshpande 2016). Keine Kontraindikation.',
      sources:['CliniPharm MDR1/ABCB1','WSU-VCPL','Deshpande 2016 (JVIM)'] },
    { id:'mdr1-butor', drugs:['butorphanol'], scope:{conditions:['mdr1']}, level:'reduce', factor:'−25 % (het) bis −30–50 % (homozygot); homozygot möglichst ganz meiden', cond:'mdr1',
      text:'MDR1: Butorphanol reduzieren + überwachen. Fallbericht (homozygoter Collie): schwere Neurotoxikose nach 0,2 mg/kg (Sedation, Ataxie, Hypersalivation, Krampf) – bei homozygot besser meiden (BSAVA).',
      sources:['CliniPharm MDR1/ABCB1','WSU-VCPL','Fallbericht PMC12159028'] },
    { id:'mdr1-opioid', drugs:['methadon','polamivet','morphin','fentanyl'], scope:{conditions:['mdr1']}, level:'caution', factor:'Dosisvorgaben strikt einhalten, titrieren, Naloxon bereit', cond:'mdr1',
      text:'MDR1: reine µ-Opioide (Methadon/Morphin/Fentanyl) sind P-gp-Substrate (CliniPharm Kat. 2) – mögliche verstärkte/verlängerte ZNS-/Atemdepression bei mut/mut. Nicht kontraindiziert: enge Dosis, titrieren, engmaschig überwachen.',
      sources:['CliniPharm MDR1/ABCB1'] },
    { id:'mdr1-apomorphin', drugs:['apomorphin'], scope:{conditions:['mdr1']}, level:'avoid', cond:'mdr1',
      text:'MDR1: Apomorphin ist Kat.-1-Wirkstoff (P-gp-Substrat) → verstärkte/verlängerte ZNS-Wirkung möglich. Zurückhaltend/meiden, Alternative erwägen, überwachen.',
      sources:['CliniPharm MDR1/ABCB1'] },

    /* Windhund-Typ */
    { id:'sight-propofol', drugs:['propofol'], scope:{groups:['sighthound']}, level:'caution', factor:'Bolus −25–30 %, langsam titrieren, KEINE Propofol-CRI/TIVA', cond:'sighthound',
      text:'Windhund: Propofol-Induktionsbolus ~25–30 % reduzieren, langsam titrieren – deutlich verlängerte Aufwachphase (~70 % geringere CYP2B11-Aktivität). KEINE Propofol-Dauertropfinfusion/TIVA; Alfaxalon oder Inhalationserhalt bevorzugen.',
      sources:['Court 2019 (PMC6952448)','ACVAA'] },
    { id:'sight-alfax', drugs:['alfaxalon'], scope:{groups:['sighthound']}, level:'monitor', factor:'Induktion ~1–2 mg/kg i.v. langsam, titrieren', cond:'sighthound',
      text:'Windhund: Alfaxalon ist eine gut geeignete, sichere Induktions-Alternative (Propofol bleibt ebenfalls sicher). Titrieren, aktiv wärmen (Hypothermie-Neigung).',
      sources:['ACVAA'] },
    { id:'sight-ace', drugs:['acepromazin'], scope:{groups:['sighthound']}, level:'reduce', factor:'0,02–0,03 mg/kg (niedrig)', cond:'sighthound',
      text:'Windhund: erhöhte Phenothiazin-Empfindlichkeit (klinische Beobachtung) + Hypotension/Hypothermie-Neigung → Acepromazin niedrig dosieren (0,02–0,03 mg/kg). Nicht generell absetzen (hebt Arrhythmie-Schwelle).',
      sources:['Court 1999','Clinician’s Brief'] },
    { id:'sight-ketamin', drugs:['ketamin'], scope:{groups:['sighthound']}, level:'monitor', cond:'sighthound',
      text:'Windhund: verlängerte Ketamin-Aufwachphase möglich (Metabolismus) – niedrig halten, Aufwachen ruhig gestalten.',
      sources:['Plumb’s'] },

    /* Boxer – Acepromazin */
    { id:'boxer-ace', drugs:['acepromazin'], scope:{conditions:['boxer-ace']}, level:'caution', cond:'boxer-ace',
      text:'Boxer: Acepromazin kann ausgeprägte Bradykardie/Hypotension/Synkope auslösen (Vagotonus) – niedrig dosieren oder meiden, Anticholinergikum bereit.',
      sources:['Plumb’s','ACVAA'] },
    { id:'boxer-a2', drugs:['dexmedetomidin','medetomidin','xylazin'], scope:{conditions:['boxer-ace']}, level:'caution', cond:'boxer-ace',
      text:'Boxer: α2-Agonisten verstärken Vagotonus/Bradykardie (ARVC beachten) – niedrigste Dosis, HF/EKG überwachen; gegen Bradykardie bevorzugt Atipamezol statt Routine-Anticholinergikum.',
      sources:['ACVAA'] },

    /* MDR1-Katze */
    { id:'mdr1cat-ivermectin', drugs:['ivermectin','eprinomectin'], scope:{conditions:['mdr1-cat']}, level:'avoid', cond:'mdr1-cat',
      text:'ABCB1-Katze: makrozyklische Laktone neurotoxisch – Eprinomectin KONTRAINDIZIERT (schon in zugelassener Dosis), Ivermectin niedrige Label-Dosis meist sicher, hohe/extralabel meiden. CliniPharm Kat. 1.',
      sources:['CliniPharm ABCB1 Katze','WSU'] },

    /* HCM-Katze */
    { id:'hcm-ketamin', drugs:['ketamin'], scope:{conditions:['hcm-cat']}, level:'avoid', cond:'hcm-cat',
      text:'HCM-Katze: Ketamin steigert Herzfrequenz/Kontraktilität + myokardialen O₂-Bedarf → dynamische LVOT-Obstruktion (SAM) verschlimmern; besonders als alleiniges Anästhetikum meiden (fulminante Dekompensation beschrieben). Etomidat/Alfaxalon bevorzugen.',
      sources:['ACVAA','Martin-Flores'] },
    { id:'hcm-a2', drugs:['dexmedetomidin','medetomidin','xylazin'], scope:{conditions:['hcm-cat']}, level:'caution', factor:'falls überhaupt nur niedrigste Dosis', cond:'hcm-cat',
      text:'HCM-Katze: α2-Agonisten kontrovers – periphere Vasokonstriktion erhöht Nachlast/SVR. Falls eingesetzt, nur niedrigste Dosis, Herz/Blutdruck überwachen, Atipamezol bereit.',
      sources:['ACVAA'] },
    { id:'hcm-anticholinergic', drugs:['atropin','glyco'], scope:{conditions:['hcm-cat']}, level:'caution', cond:'hcm-cat',
      text:'HCM-Katze: Anticholinergika (Frequenzanstieg) zurückhaltend – Tachykardie verkürzt die Füllung und verschlechtert die dynamische Obstruktion.',
      sources:['ACVAA'] },

    /* MH – volatile Trigger */
    { id:'mh-volatile', drugs:['isofluran','sevofluran','vapor','succinylcholin'], scope:{conditions:['malignant-hyperthermia']}, level:'avoid', cond:'malignant-hyperthermia',
      text:'MH-Risiko: ALLE volatilen Inhalationsanästhetika (Iso-/Sevofluran) und Succinylcholin sind Trigger – meiden. Sichere TIVA (Propofol/Ketamin/Alfaxalon/Opioide/Benzos), nicht-depol. Relaxanzien (Atracurium/Rocuronium) sicher. Dantrolen 1–3 mg/kg i.v. bereit. Frühzeichen: EtCO₂-Anstieg VOR Hyperthermie.',
      sources:['Merck Vet Manual','ACVAA'] },

    /* NSAID bei Niere/Gerinnung */
    { id:'nsaid-pkd', drugs:['meloxicam','carprofen','robenacoxib'], scope:{conditions:['pkd-cat','pk-deficiency']}, level:'caution', cond:'pkd-cat',
      text:'Bei Nierenerkrankung/chronischer Anämie: NSAID nur bei normaler Nierenfunktion, Hydratation und Blutdruck – sonst meiden.',
      sources:['IRIS','WSAVA'] },
    { id:'nsaid-vwd', drugs:['meloxicam','carprofen','robenacoxib'], scope:{conditions:['vwd']}, level:'avoid', cond:'vwd',
      text:'von-Willebrand/Gerinnungsstörung: NSAID und v. a. ASS/Aspirin peri-operativ meiden (Thrombozytenfunktionshemmung zusätzlich zum vWF-Defekt). Analgesie: Opioide first-line. Prä-OP bukkale Blutungszeit/vWF, DDAVP (Typ 1) erwägen; keine i.m.-Injektionen.',
      sources:['Plumb’s','eClinPath'] },

    /* DCM – negativ inotrop / α2 */
    { id:'cardiac-a2', drugs:['dexmedetomidin','medetomidin','xylazin'], scope:{conditions:['dcm-doberman','mmvd-cavalier']}, level:'avoid', factor:'meiden; falls unumgänglich Mikrodosis + Atipamezol bereit', cond:'dcm-doberman',
      text:'Herzerkrankung (DCM/MMVD): α2-Agonisten erhöhen die Nachlast, HZV kann 30–50 % fallen → meiden. WICHTIG: gegen α2-Bradykardie KEINE routinemäßigen Anticholinergika (Atropin/Glyco steigern bei fortbestehender α2-Vasokonstriktion die Nachlast, proarrhythmisch) – stattdessen mit Atipamezol antagonisieren.',
      sources:['ACVAA'] },
    { id:'boas-induction', drugs:['propofol','alfaxalon','etomidat','ketamin'], scope:{conditions:['boas']}, level:'caution', factor:'präoxygenieren 3–5 min, langsam >60 s titrieren, sofort intubationsbereit', cond:'boas',
      text:'Brachyzephal (BOAS): Einleitungsboli → Apnoe (Propofol/Alfaxalon zusätzlich Hypotension). 3–5 min präoxygenieren, langsam auf Wirkung titrieren, sofort intubieren (mehrere Tubusgrößen + Absaugung). Etomidat kreislaufstabiler, braucht Benzodiazepin-Co-Induktion. Hohes Regurgitations-/Aspirationsrisiko (Propofol > Alfaxalon). Erst bei voll wachem Schluckreflex extubieren.',
      sources:['AAHA','Today’s Vet Practice'] },
    { id:'mmvd-ace', drugs:['acepromazin'], scope:{conditions:['mmvd-cavalier']}, level:'caution', factor:'nur unteres Dosisende, nur bei kompensierter Erkrankung', cond:'mmvd-cavalier',
      text:'MMVD (Cavalier): niedrig dosiertes Acepromazin senkt günstig die Nachlast (weniger Regurgitation) bei kompensierter Erkrankung (B1/B2); hohe Dosen und dekompensierte Herzinsuffizienz (C/D) meiden (lang wirksam, nicht antagonisierbar).',
      sources:['ACVIM','cavalierhealth.org'] }
  ];

  /* --------------------------- Engine / API --------------------------- */
  var SEV = { avoid: 3, reduce: 2, caution: 1, monitor: 0 };
  function norm(s) { return (s == null ? '' : String(s)).toLowerCase()
      .replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss').replace(/\s+/g,' ').trim(); }

  function bySpecies(sp) { return BREEDS.filter(function (b) { return !sp || b.sp === sp; }); }
  function byId(id) { for (var i = 0; i < BREEDS.length; i++) if (BREEDS[i].id === id) return BREEDS[i]; return null; }
  function resolve(text, sp) {
    if (!text) return null; var t = norm(text);
    var pool = bySpecies(sp);
    var exact = pool.filter(function (b) { return norm(b.name) === t || b.id === t || (b.aliases || []).some(function (a) { return norm(a) === t; }); });
    if (exact.length) return exact[0];
    var part = pool.filter(function (b) { return norm(b.name).indexOf(t) >= 0 || (b.aliases || []).some(function (a) { return norm(a).indexOf(t) >= 0; }); });
    return part[0] || null;
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
      out.push({ id: r.id, level: r.level, factor: r.factor, text: r.text, sources: r.sources, cond: r.cond });
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

  window.VETBREED = {
    version: 1, GROUPS: GROUPS, CONDITIONS: CONDITIONS, BREEDS: BREEDS, DRUG_RULES: DRUG_RULES,
    SEV: SEV, norm: norm,
    bySpecies: bySpecies, byId: byId, resolve: resolve,
    conditionsOf: conditionsOf, groupsOf: groupsOf, profile: profile,
    drugWarnings: drugWarnings, anyWarning: anyWarning, affectedDrugs: affectedDrugs, hasAirwayRisk: hasAirwayRisk
  };
})();
