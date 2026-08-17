/* =========================================================================
   Canis Anæsthesia · Datensatz (Kleintier-Anästhesie & Notfall)
   ---------------------------------------------------------------------------
   Referenz-Bereiche aus etablierten Quellen (Plumb's Veterinary Drug Handbook,
   BSAVA Small Animal / Exotic Formulary, WSAVA/ACVAA/RECOVER-Leitlinien,
   Carpenter Exotic Animal Formulary). KEINE Einzeldosis-Empfehlung – vor jeder
   Gabe gegen CliniPharm/vetpharm.uzh.ch, Fachinfo und Patient prüfen.
   Dosen v1 (Seed) — werden gegen die adversarial verifizierten Rechercheergebnisse
   abgeglichen.
   ========================================================================= */
window.ANAES = {
  species: [
    { id:'hund',        name:'Hund',            icon:'🐕' },
    { id:'katze',       name:'Katze',           icon:'🐈' },
    { id:'kaninchen',   name:'Kaninchen',       icon:'🐇' },
    { id:'meerschwein', name:'Meerschwein',     icon:'🐹' },
    { id:'chinchilla',  name:'Chinchilla',      icon:'🐭' },
    { id:'degu',        name:'Degu',            icon:'🐀' },
    { id:'maus',          name:'Maus',            icon:'🐁' },
    { id:'ratte',         name:'Ratte',           icon:'🐀' },
    { id:'rennmaus',      name:'Rennmaus',        icon:'🐭' },
    { id:'hamster',       name:'Hamster',         icon:'🐹' },
    { id:'frettchen',   name:'Frettchen',       icon:'🦦' },
    { id:'reptil',      name:'Reptil',          icon:'🦎' }
  ],

  /* Normwerte unter Allgemeinanästhesie (Richtwerte) */
  /* map = MAP-Band; nibp = SYS-Band; dia = DIA-Band. Regel: MAP ≈ DIA + (SYS−DIA)/3 */
  vitals: {
    /* etco2 = Alarmband unter GA (Ziel 35–45, tolerierte permissive Hyperkapnie bis ~55, IPPV >60; Low-Alarm <30). */
    hund:        { hr:[60,140],  rr:[8,20],   spo2:[95,100], etco2:[30,55], map:[70,120], nibp:[90,160],  dia:[55,100], temp:[37.5,39.2] },
    katze:       { hr:[100,180], rr:[8,25],   spo2:[95,100], etco2:[30,55], map:[70,120], nibp:[90,160],  dia:[55,100], temp:[37.5,39.2] },
    kaninchen:   { hr:[130,250], rr:[10,55],  spo2:[95,100], etco2:[28,55], map:[60,90],  nibp:[80,130],  dia:[50,90],  temp:[38.0,40.0] },
    meerschwein: { hr:[180,310], rr:[12,80],  spo2:[95,100], etco2:[28,55], map:[60,90],  nibp:[80,130],  dia:[50,90],  temp:[37.2,39.5] },
    chinchilla:  { hr:[100,150], rr:[15,80],  spo2:[95,100], etco2:[28,55], map:[60,90],  nibp:[80,130],  dia:[50,90],  temp:[36.1,37.8] },
    degu:        { hr:[100,150], rr:[15,90],  spo2:[95,100], etco2:[28,55], map:[60,90],  nibp:[80,130],  dia:[50,90],  temp:[37.5,38.5] },
    maus:        { hr:[300,550], rr:[55,160], spo2:[95,100], etco2:[20,40], map:[60,100], nibp:[80,130], dia:[45,85], temp:[36.5,38] },
    ratte:       { hr:[200,420], rr:[30,90], spo2:[95,100], etco2:[28,45], map:[70,110], nibp:[85,130], dia:[55,95], temp:[36.5,38] },
    rennmaus:    { hr:[230,400], rr:[70,130], spo2:[95,100], etco2:[28,55], map:[50,90], nibp:[60,110], dia:[40,85], temp:[36.5,38.5] },
    hamster:     { hr:[200,450], rr:[30,120], spo2:[95,100], etco2:[28,55], map:[55,95], nibp:[70,120], dia:[45,85], temp:[36,38] },
    frettchen:   { hr:[150,280], rr:[10,40],  spo2:[95,100], etco2:[28,55], map:[60,100], nibp:[80,140],  dia:[50,90],  temp:[37.8,40.0] },
    reptil:      { hr:[10,80],   rr:[2,10],   spo2:[90,100], etco2:[15,45], map:[30,60],  nibp:[30,90],   dia:[20,50],  temp:[24,32] }
  },

  /* =================== MEDIKAMENTE =================== */
  drugs: [
    { id:'atropin', name:'Atropin', icon:'💗', cls:'Anticholinergikum', aliases:['atropinsulfat'],
      sources:['Plumb’s','BSAVA'],
      species:{
        maus:{low:0.04,high:0.25,unit:'mg/kg',route:'IP/SC',conc:'0.05 mg/mL (aus 0.5 mg/mL verduennt)',indication:'Bradykardie, Sekretkontrolle',notes:'Quelle: Illinois ACS - Ketamin 100 + Xylazin 10 + Atropin 0,04-0,25 mg/kg IP/SC bei der Maus.',caution:'Bei 25 g Koerpermasse sind das 1-6 mcg absolut - ohne Verduennung nicht dosierbar. Sekreteindickung kann die 1-1,5 mm weite Trachea verlegen.'},
        ratte:{low:0.05,high:0.1,unit:'mg/kg',route:'SC/IM/IP',conc:'0,05 mg/mL (aus 0.5 mg/mL verduennt)',indication:'Bradykardie, Speichel-/Bronchialsekretion vor Maskennarkose',notes:'Quelle: dvm360 Small Mammal Anesthesia Proceedings (0,05 mg/kg SC); Illinois ACS fuehrt Atropin im Ketamin-Xylazin-Gemisch mit 0,005-0,02 mg/kg. Ratten haben - anders als Kaninchen - keine relevante Atropinesterase.',caution:'Nicht routinemaessig geben: verdickt Sekret und kann winzige Atemwege verlegen. Volumen unbedingt verduennen.'},
        rennmaus:{low:0.05,high:0.2,unit:'mg/kg',route:'SC/IM/IP',conc:'0,05 mg/mL (aus 0,5 mg/mL verduennt)',indication:'Bradykardie, Sekretkontrolle',notes:'Quelle: Kleinnager-Formularien (Carpenter-Linie, Veterian Key Rodents 0,1-0,4 mg/kg SC/IM). Keine rennmausspezifische Studie.',caution:'Verduennt spritzen. Handling zum Injizieren ist bei der Rennmaus selbst ein Krampfausloeser - moeglichst am bereits sedierten Tier geben.'},
        hamster:{low:0.05,high:0.2,unit:'mg/kg',route:'SC/IM/IP',conc:'0,05 mg/mL (aus 0,5 mg/mL verduennt)',indication:'Bradykardie unter Alpha-2-Agonisten, Salivation/Bronchialsekret vor Maskennarkose',notes:'Quelle: Exotic-Formulary-Werte fuer Kleinnager 0,05 mg/kg SC (Carpenter-Linie); Laborformularien nennen bis 0,1-0,4 mg/kg SC/IM. Wirkdauer beim Nager kurz (20-30 min), ggf. wiederholen.',caution:'Nur verduennt spritzen - unverduennt sind 0,01 mL kaum dosierbar. Erhoeht die Herzarbeit; beim alten Goldhamster mit Kardiomyopathie/Vorhofthrombose Nutzen gegen Sauerstoffverbrauch abwaegen. Sekret wird zaeher, nicht weniger.'},
        hund:{low:0.02,high:0.04,unit:'mg/kg',route:'IV/IM/SC',conc:'0.5 mg/mL',indication:'Vagale Bradykardie / Asystolie',notes:'IV wirkt in <1 min. Transiente Tachykardie möglich. Organophosphat-/Carbamat-Vergiftung: 0,2 mg/kg (¼ IV, ¾ IM/SC), alle 10 min wiederholen bis Speichelfluss sistiert.',caution:'Nicht bei Sinustachykardie; kann AV-Block paradox verschlechtern. NICHT gegen eine α2-bedingte Bradykardie bei normalem oder hohem Blutdruck — dort ist die niedrige Frequenz die Antwort auf den hohen Gefäßwiderstand, und ein Anticholinergikum treibt Druck und Sauerstoffbedarf hoch und erzeugt Extrasystolen. Stattdessen abwarten oder Atipamezol. Bei infranodalem AV-Block II° Mobitz II und III° kaum wirksam: einmalig als Test, bei Nichtansprechen nicht nachdosieren.'},
        katze:{low:0.02,high:0.04,unit:'mg/kg',route:'IV/IM/SC',conc:'0.5 mg/mL',indication:'Vagale Bradykardie',notes:'',caution:'Nicht bei Sinustachykardie. NICHT gegen eine α2-bedingte Bradykardie bei normalem oder hohem Blutdruck — dort ist die niedrige Frequenz die Antwort auf den hohen Gefaesswiderstand; ein Anticholinergikum treibt Druck, Sauerstoffbedarf und Extrasystolen hoch. Stattdessen abwarten oder Atipamezol. Bei infranodalem AV-Block II° Mobitz II und III° kaum wirksam.'},
        kaninchen:{low:0.1,high:0.5,unit:'mg/kg',route:'SC/IM/IV',conc:'0.5 mg/mL',indication:'Bradykardie',notes:'Höhere Dosis nötig – bis 60 % haben Atropinesterase.',caution:'Glycopyrrolat oft zuverlässiger.'},
        meerschwein:{low:0.05,high:0.2,unit:'mg/kg',route:'SC/IM',conc:'0.5 mg/mL',indication:'Bradykardie/Speichel',notes:'',caution:''},
        reptil:{low:0.01,high:0.04,unit:'mg/kg',route:'IM/IV/IO',conc:'0.5 mg/mL',indication:'Bradykardie',notes:'',caution:'Temperaturabhängige Wirkung.'}
      }},
    { id:'glyco', name:'Glycopyrrolat', icon:'💗', cls:'Anticholinergikum', aliases:['glycopyrronium'],
      sources:['Plumb’s','BSAVA'],
      species:{
        maus:{low:0.01,high:0.02,unit:'mg/kg',route:'SC/IM',conc:'0.02 mg/mL (aus 0.2 mg/mL verduennt)',indication:'Bradykardie, Antisialogogum',notes:'Fuer die Maus liegt keine eigene belegte Dosis vor; der Bereich stammt aus der Kleinsaeuger-Empfehlung (dvm360, 0,01-0,02 mg/kg SC/IM) und wird auf die Maus uebertragen.',caution:'EXTRAPOLIERT. Langsamer Wirkeintritt - im Notfall Atropin.'},
        ratte:{low:0.01,high:0.02,unit:'mg/kg',route:'SC/IM',conc:'0.2 mg/mL',indication:'Bradykardie, Antisialogogum; passiert die Blut-Hirn-Schranke nicht',notes:'Quelle: dvm360 Small Mammal Anesthesia Proceedings (0,01-0,02 mg/kg SC/IM fuer Kleinsaeuger inkl. Nager).',caution:'Langsamerer Wirkeintritt als Atropin - im akuten Bradykardie-Notfall Atropin bevorzugen.'},
        rennmaus:{low:0.01,high:0.02,unit:'mg/kg',route:'SC/IM',conc:'0,2 mg/mL',indication:'Antisialagogum, Bradykardieprophylaxe',notes:'Quelle: Exotic-Anaesthesie-Kapitel (Veterian Key), Kleinnager-Sammeldosis.',caution:'Verduennen. Keine rennmausspezifischen Daten.'},
        hamster:{low:0.01,high:0.02,unit:'mg/kg',route:'SC/IM',conc:'0,2 mg/mL',indication:'Antisialagogum, Bradykardieprophylaxe; passiert die Blut-Hirn-Schranke nicht',notes:'Quelle: Exotic-Anaesthesie-Kapitel (Veterian Key) 0,01-0,02 mg/kg SC fuer Kleinnager.',caution:'Bei 40 g Koerpergewicht sind das 0,4-0,8 µg absolut - ohne Verduennung auf 0,02 mg/mL nicht dosierbar. Langsamerer Wirkeintritt als Atropin.'},
        hund:{low:0.005,high:0.01,unit:'mg/kg',route:'IV/IM',conc:'0.2 mg/mL',indication:'Bradykardie',notes:'Langsamerer Anschlag, längere Wirkung als Atropin; kein ZNS-Übertritt.',caution:'Wie Atropin: nicht gegen eine α2-bedingte Bradykardie bei erhaltenem Blutdruck, nicht bei Tachykardie. Langsamerer Wirkungseintritt als Atropin — im akuten Notfall Atropin.'},
        katze:{low:0.005,high:0.01,unit:'mg/kg',route:'IV/IM',conc:'0.2 mg/mL',indication:'Bradykardie',notes:'',caution:'Wie Atropin: nicht gegen eine α2-bedingte Bradykardie bei erhaltenem Blutdruck (AAFP/ISFM 2018), nicht bei Tachykardie. Langsamerer Wirkungseintritt — im akuten Notfall Atropin.'},
        kaninchen:{low:0.01,high:0.02,unit:'mg/kg',route:'SC/IM/IV',conc:'0.2 mg/mL',indication:'Bradykardie',notes:'Bevorzugt (kein Atropinesterase-Problem).',caution:''},
        meerschwein:{low:0.01,high:0.02,unit:'mg/kg',route:'SC/IM',conc:'0.2 mg/mL',indication:'Bradykardie',notes:'',caution:''},
        reptil:{low:0.01,high:0.02,unit:'mg/kg',route:'IM/IV',conc:'0.2 mg/mL',indication:'Bradykardie',notes:'',caution:''}
      }},
    { id:'adrenalin', name:'Adrenalin (Epinephrin)', icon:'⚡', cls:'Notfall/Katecholamin', aliases:['epinephrin','suprarenin'],
      sources:['RECOVER 2024','Plumb’s'],
      species:{
        maus:{low:0.01,high:0.1,unit:'mg/kg',route:'IV/IO/intrakardial',conc:'1 mg/mL (1:1000), fuer die Maus 1:100 ve',indication:'Kreislaufstillstand',notes:'Keine mausspezifische CPR-Dosis in den geprueften Quellen; uebertragen aus dem Rattenmodell (beste ROSC-Rate bei 0,04 mg/kg IV).',caution:'EXTRAPOLIERT. Ein Gefaesszugang ist bei der Maus im Notfall praktisch nicht zu legen - Reanimation der Maus ist nahezu aussichtslos, der Schwerpunkt gehoert auf Praevention (Waerme, O2, Dosisgenauigkeit).'},
        ratte:{low:0.01,high:0.1,unit:'mg/kg',route:'IV/IO/intratracheal',conc:'1 mg/mL (1:1000), fuer die Ratte 1:10 ve',indication:'Asystolie, Kreislaufstillstand',notes:'Quelle: Rattenmodell-CPR-Studien (0,04 / 0,2 / 0,4 mg/kg IV geprueft; beste ROSC-Rate bei 0,04 mg/kg, 9/10 Tiere). Praktisch: mit 0,01-0,04 mg/kg beginnen.',caution:'Hochdosis verschlechtert das Ergebnis. Ohne sicheren IV/IO-Zugang bei Ratte kaum applizierbar - Reanimation ist bei dieser Art selten erfolgreich.'},
        rennmaus:{low:0.01,high:0.1,unit:'mg/kg',route:'IV/IO/intratracheal',conc:'0,1 mg/mL (aus 1 mg/mL verduennt)',indication:'Herzstillstand',notes:'Quelle: CPR-Empfehlungen fuer Exoten (LafeberVet). Extrapoliert, keine rennmausspezifische Evidenz.',caution:'Extrapoliert. Zugang nur IO oder intratracheal realistisch.'},
        hamster:{low:0.01,high:0.1,unit:'mg/kg',route:'IV/IO/intratracheal',conc:'0,1 mg/mL (aus 1 mg/mL (1:1000) verduennt)',indication:'Herzstillstand (Asystolie, PEA). Niedrigdosis 0,01 mg/kg alle 3-5 min, Hochdosis 0,1 mg/kg',notes:'Quelle: CPR-Empfehlungen fuer Exoten (LafeberVet, RECOVER-adaptiert) - Niedrig-/Hochdosisschema. Keine hamsterspezifische Studie; extrapoliert.',caution:'Extrapoliert. IV-Zugang beim Hamster praktisch nicht zu legen - realistisch ist der intraossaere Weg (proximaler Femur, 25-27 G) oder intratracheal (dann 2-3-fache Dosis in 0,2 mL NaCl). Nicht intrakardial.'},
        hund:{low:0.01,high:0.01,unit:'mg/kg',route:'IV/IO',conc:'1 mg/mL (1:1000)',indication:'CPR (Niedrigdosis)',notes:'0,01 mg/kg IV/IO jeden 2. Zyklus (alle 3–5 min), die GANZE Reanimation über. Hochdosis 0,1 mg/kg wird NICHT mehr empfohlen (RECOVER 2024 – schlechteres Überleben/Neurologie). Alternative: Vasopressin 0,8 U/kg.',caution:'Nicht bei tachykardem Rhythmus ohne Stillstand.'},
        katze:{low:0.01,high:0.01,unit:'mg/kg',route:'IV/IO',conc:'1 mg/mL',indication:'CPR',notes:'0,01 mg/kg jeden 2. Zyklus; keine Hochdosis mehr (RECOVER 2024).',caution:''},
        kaninchen:{low:0.01,high:0.02,unit:'mg/kg',route:'IV/IO',conc:'1 mg/mL',indication:'CPR',notes:'',caution:''},
        meerschwein:{low:0.01,high:0.02,unit:'mg/kg',route:'IV/IO',conc:'1 mg/mL',indication:'CPR',notes:'',caution:''},
        frettchen:{low:0.01,high:0.02,unit:'mg/kg',route:'IV/IO',conc:'1 mg/mL',indication:'CPR',notes:'',caution:''},
        reptil:{low:0.01,high:0.1,unit:'mg/kg',route:'IV/IO',conc:'1 mg/mL',indication:'CPR',notes:'Bevorzugt IV/IO; nach Intubation intratracheal (etwas höher). Intrakardial NUR als letzte Option ohne Gefäß-/IO-Zugang.',caution:'Intrakardial: Arrhythmie-, Myokardblutungs- und Hämoperikard-Risiko – vermeiden wenn möglich.'}
      }},
    { id:'vasopressin', name:'Vasopressin (ADH)', icon:'⚡', cls:'Notfall/Katecholamin', aliases:['adh','argipressin'],
      sources:['RECOVER 2024','Plumb’s'],
      species:{
        hund:{low:0.8,high:0.8,unit:'U/kg',route:'IV/IO',conc:'20 U/mL',indication:'CPR (Alternative zu Adrenalin)',notes:'Alle 3–5 min (jeder 2. Zyklus); bei refraktärem Kammerflimmern bevorzugt (RECOVER 2024). Konzentration je Präparat prüfen.',caution:'Nur im Kreislaufstillstand/schweren Schock.'},
        katze:{low:0.8,high:0.8,unit:'U/kg',route:'IV/IO',conc:'20 U/mL',indication:'CPR',notes:'Wie Hund.',caution:'Bei katecholaminrefraktaerer Hypotonie als Dauertropf 0,5–2 mU/kg/min; kein Erstlinienmittel bei der Hypotonie unter Inhalationsnarkose. Austritt aus der Vene fuehrt zur Nekrose.'}
      }},
    { id:'noradrenalin', name:'Noradrenalin', icon:'⚡', cls:'Vasopressor', aliases:['norepinephrin'],
      sources:['ACVAA'],
      species:{
        hund:{low:0.05,high:2,unit:'mcg/kg/min',route:'CRI IV',conc:'',indication:'Vasodilatatorische Hypotension',notes:'CRI, nach MAP titrieren. Zentraler/gut laufender Zugang.',caution:'Extravasation → Nekrose.'},
        katze:{low:0.05,high:2,unit:'mcg/kg/min',route:'CRI IV',conc:'',indication:'Hypotension',notes:'CRI titrieren.',caution:'Austritt aus der Vene fuehrt zur Nekrose — sicherer Zugang, moeglichst zentral. Kein Ersatz fuer Volumen bei Hypovolaemie.'}
      }},
    { id:'ephedrin', name:'Ephedrin', icon:'⚡', cls:'Vasopressor',
      sources:['Plumb’s'],
      species:{
        hund:{low:0.05,high:0.25,unit:'mg/kg',route:'IV Bolus',conc:'50 mg/mL',indication:'Anästhesie-Hypotension',notes:'Bolus (0,06–0,2 typisch), hebt Herzzeitvolumen und Gefäßtonus. Der Blutdruckeffekt hält beim Hund oft unter 5 Minuten; eine Wiederholung nach 10 Minuten wirkt wegen Tachyphylaxie meist nicht mehr — dann auf einen Dauertropf wechseln.',caution:'Der Blutdruckeffekt haelt oft unter 5 Minuten; eine zweite Gabe nach 10 Minuten wirkt wegen Tachyphylaxie meist nicht mehr. Nicht bei Tachyarrhythmie. Bei Blutung ist Volumen und Blutstillung die Antwort, nicht der Vasopressor.'},
        katze:{low:0.05,high:0.25,unit:'mg/kg',route:'IV Bolus',conc:'50 mg/mL',indication:'Hypotension',notes:'',caution:'Wie beim Hund: kurze Wirkung, Tachyphylaxie bei Wiederholung. Nicht bei Tachyarrhythmie oder HCM mit Ausflusstraktobstruktion.'}
      }},
    { id:'dopamin', name:'Dopamin', icon:'⚡', cls:'Vasopressor/Inotropikum',
      sources:['ACVAA'],
      species:{
        hund:{low:2,high:20,unit:'mcg/kg/min',route:'CRI IV',conc:'',indication:'Hypotension / niedriges HZV',notes:'~2–3 dopaminerg, 3–10 β1-inotrop, 10–20 α1-vasopressorisch. Start 5, alle 15–30 min um ~2,5 titrieren (Praxis 5–15). Nur CRI, kein Bolus.',caution:'Tachyarrhythmien.'},
        katze:{low:2,high:5,unit:'mcg/kg/min',route:'CRI IV',conc:'',indication:'Hypotension',notes:'Niedriger Bereich (2–5), Start ~5, vorsichtig titrieren.',caution:'Arrhythmie- und Krampfrisiko höher, deshalb höchstens 5 µg/kg/min. VAA 2021: Dopamin verhindert die Isofluran-Hypotonie der Katze NICHT — Noradrenalin oder Phenylephrin bevorzugen.'}
      }},
    { id:'dobutamin', name:'Dobutamin', icon:'⚡', cls:'Inotropikum',
      sources:['ACVAA'],
      species:{
        /* DIE DREI OBSTRUKTIONS-GEGENANZEIGEN, nachgetragen am 15.08.2026
           (Praxis der Kardiologie S.436/437). Sie fehlten, und die Luecke lag genau auf dem
           haeufigsten Weg: die HCM-Katze mit SAM, die unter Isofluran hypoton wird, ist der
           Standardanlass fuer Dobutamin. Mehr Kontraktilitaet verengt bei ihr die Ausflussbahn
           weiter - das Mittel verschlimmert, was es beheben soll. Es kostet nichts, die Sperre
           zu setzen: Phenylephrin, Noradrenalin und Volumen stehen bereits im Katalog. */
        hund:{low:2,high:10,unit:'mcg/kg/min',route:'CRI IV',conc:'',indication:'Myokard-Depression / niedriges HZV',notes:'CRI titrieren.',caution:'VERBOTEN bei hypertroph-obstruktiver Kardiomyopathie, Aorten- und Pulmonalstenose — mehr Kontraktilität verengt die Ausflussbahn zusätzlich (Praxis der Kardiologie S.436/437). Kann ventrikuläre Extrasystolen verstärken (β1) — bei bestehender Ektopie nur unter EKG und erst nach Behebung der Ursache. Bei Hypovolämie wirkungslos: zuerst Volumen.'},
        katze:{low:1,high:5,unit:'mcg/kg/min',route:'CRI IV',conc:'',indication:'niedriges HZV',notes:'Niedriger dosieren.',caution:'VERBOTEN bei HOCM/SAM, Aorten- und Pulmonalstenose — mehr Kontraktilität verengt die Ausflussbahn zusätzlich (Praxis der Kardiologie S.436/437). Das betrifft gerade die HCM-Katze, die unter Isofluran hypoton wird. Katze: Krampf-/Erregungsrisiko höher.'}
      }},
    { id:'lidocain_iv', name:'Lidocain (i.v. Antiarrhythmikum)', icon:'💓', cls:'Antiarrhythmikum',
      sources:['Plumb’s','RECOVER'],
      species:{
        hund:{low:2,high:2,unit:'mg/kg',route:'langsam IV',conc:'20 mg/mL (2%)',indication:'Ventrikuläre Tachykardie/VES',notes:'Bolus über 1–2 min, ggf. wiederholen (max ~8 mg/kg), dann CRI 25–75 mcg/kg/min.',caution:'ZNS-Zeichen / Hypotension bei Überdosis.'},
        katze:{low:0.25,high:0.5,unit:'mg/kg',route:'sehr langsam IV',conc:'20 mg/mL',indication:'VT (nur wenn nötig)',notes:'Katzen sehr empfindlich – niedrig, langsam, EKG.',caution:'Hohe Toxizität (Bradykardie, Krampf, Tod) – Zurückhaltung.'}
      }},
    { id:'amiodaron', name:'Amiodaron', icon:'💓', cls:'Antiarrhythmikum',
      sources:['RECOVER 2024','Hoehne et al. 2020 (SAT)'],
      species:{
        hund:{low:2.5,high:5,unit:'mg/kg',route:'IV/IO',conc:'50 mg/mL',indication:'Defibrillations-resistentes Kammerflimmern / pulslose VT (CPR)',notes:'Mittel der 1. Wahl bei >3–5 erfolglosen Defibrillationen (vor Lidocain).',caution:'Anaphylaxie durch Polysorbat-Trägerlösung möglich (Hund) – nach ROSC beobachten. Hypotension bei schneller Gabe.'},
        katze:{low:5,high:5,unit:'mg/kg',route:'IV/IO',conc:'50 mg/mL',indication:'Defibrillations-resistente VF/VT',notes:'Wenig Katzendaten – zurückhaltend.',caution:'Bei der Katze laut RECOVER 2024 das Mittel der Wahl bei defibrillationsresistentem Kammerflimmern oder pulsloser Kammertachykardie (5 mg/kg IV/IO) — Lidocain ist hier die falsche Wahl. Langsam geben, ausserhalb der Reanimation ueber 30–60 min: als Schnellbolus faellt der Blutdruck.'}
      }},
    /* ---- Sechs Mittel, die der Katalog bis 1.4.6 nicht kannte (Arzneimittel-Durchgang 06.08.2026)
     * Zwei davon waren nicht nur eine Luecke, sondern eine Sackgasse:
     *  - ohne MAGNESIUMSULFAT endet die Kammertachykardie nach 8 mg/kg Lidocain im Nichts;
     *  - ohne TERBUTALIN verwies die Bronchospasmus-Karte auf einen "β2-Bronchodilatator",
     *    den dieses Programm gar nicht fuehrte. Ein Rat auf ein Mittel, das im Katalog fehlt,
     *    ist am OP-Tisch kein Rat. */
    { id:'magnesiumsulfat', name:'Magnesiumsulfat', icon:'🧂', cls:'Antiarrhythmikum / Elektrolyt', aliases:['mgso4','magnesium'],
      sources:['Schoeller JVECC 2020','Ranninger Vet Rec Case Rep 2019','Humphrey JVECC 2015'],
      species:{
        hund:{low:0.15,high:0.3,unit:'mEq/kg',route:'langsam IV über 5–15 min',conc:'500 mg/mL (50 %) = 4 mEq/mL — VERDÜNNEN',indication:'Lidocain-refraktäre ventrikuläre Arrhythmie, Torsade, Magnesiummangel',notes:'In NaCl 0,9 % oder Glukose 5 % verdünnen. Schoeller 2020 (16 Hunde) 0,2 mEq/kg über 5 min; Ranninger 2019 beschreibt die Konversion 20 min nach Magnesium, nachdem Lidocain-Boli und Dauertropf versagt hatten. Bei bekanntem Calciummangel Magnesiumchlorid statt -sulfat.',caution:'Zu schnell gegeben: Blutdruckabfall, AV-Block, Atemdepression. Nicht bei Anurie oder schwerer Niereninsuffizienz. Nicht mit Calcium in derselben Leitung.'},
        katze:{low:0.15,high:0.3,unit:'mEq/kg',route:'langsam IV über 5–15 min',conc:'500 mg/mL (50 %) — VERDÜNNEN',indication:'wie Hund',notes:'Kaum Katzendaten — vom Hund übertragen.',caution:'Wie Hund, noch langsamer geben.'}
      }},
    /* VERFÜGBARKEIT IST KEINE PHARMAKOLOGIE (15.08.2026, beim Buchabgleich geprüft).
       Killich, Kleintierkardiologie 2019, S. 227 schreibt, Klasse 1A werde "nicht mehr
       eingesetzt und ist nicht mehr erhältlich". Merck 2024 führt die Dosis weiter — beides
       ist richtig, es sind zwei verschiedene Fragen. Nachgesehen bei CliniPharm/vetpharm
       (v_takwir/00000061): "Zur Zeit sind in der Schweiz keine Tierarzneimittel, welche
       diesen Wirkstoff enthalten, zugelassen." Die Dosis bleibt deshalb stehen, aber der
       Anwender erfährt es, BEVOR er nach der Ampulle greift, die er nicht hat. */
    { id:'procainamid', name:'Procainamid', icon:'💓', cls:'Antiarrhythmikum (Klasse Ia)',
      sources:['Merck Veterinary Manual 2024','CliniPharm/vetpharm.uzh.ch (Zulassungsstand)'],
      species:{
        hund:{low:2,high:2,unit:'mg/kg',route:'langsam IV Bolus',conc:'100 mg/mL',indication:'Ventrikuläre Tachykardie, wenn Lidocain versagt',notes:'2 mg/kg als langsame Boli bis kumulativ höchstens 25 mg/kg über 10–15 min, danach Dauertropf 25–40 µg/kg/min. Alternativ 10–20 mg/kg IM/SC alle 6–8 h. VERFÜGBARKEIT PRÜFEN: als Tierarzneimittel im deutschsprachigen Raum nicht zugelassen (CliniPharm: in der Schweiz kein zugelassenes Präparat) — nur über Import oder Umwidmung eines Humanpräparats. Wer im Notfall damit rechnet, muss es vorher im Schrank haben.',caution:'Negativ inotrop, Blutdruckabfall bei schneller Gabe — Blutdruck durchgehend messen. QT-Verlängerung. NICHT bei AV-Block oder ventrikulärem Ersatzrhythmus. Nicht mit einem zweiten Klasse-I-Mittel stapeln.'},
        katze:{low:null,high:null,unit:'mg/kg',route:'',conc:'',indication:'',notes:'',caution:'Für die Katze gibt es keine belegte Antiarrhythmika-Dosis — nicht verwenden. Bei der Katze Amiodaron 5 mg/kg IV/IO (RECOVER 2024).'}
      }},
    { id:'esmolol', name:'Esmolol', icon:'💓', cls:'Antiarrhythmikum (β1-Blocker, ultrakurz)',
      sources:['RECOVER 2024','JVECC 2021','Plumbs Veterinary Drug Handbook'],
      species:{
        hund:{low:0.1,high:0.5,unit:'mg/kg',route:'langsam IV über 1–5 min',conc:'10 mg/mL',indication:'Supraventrikuläre oder Sinustachykardie mit Kreislaufwirkung; in der Reanimation bei defibrillationsresistentem Rhythmus (RECOVER 2024: 0,5 mg/kg über 3–5 min, dann 50 µg/kg/min)',notes:'Dauertropf 25–200 µg/kg/min, in Schritten von 50 steigern. Halbwertszeit rund 9 min — die Wirkung ist wieder weg, bevor ein Schaden bleibt.',caution:'Negativ inotrop: bei Hypotonie, Herzinsuffizienz, AV-Block und Bradykardie KONTRAINDIZIERT. Nicht bei ventrikulärem Ersatzrhythmus. Nicht mit einem α2-Agonisten stapeln.'},
        katze:{low:0.05,high:0.5,unit:'mg/kg',route:'langsam IV über 1 min',conc:'10 mg/mL',indication:'Supraventrikuläre Tachykardie bei normalem Blutdruck',notes:'50–500 µg/kg über 1 min, Dauertropf 50–200 µg/kg/min. Wegen der kurzen Wirkdauer bei eingeschränkter Pumpfunktion bevorzugt.',caution:'Bei Hypotonie kontraindiziert. Bei HCM mit Ausflusstraktobstruktion nur unter Blutdruckkontrolle.'}
      }},
    { id:'kaliumchlorid', name:'Kaliumchlorid', icon:'🧂', cls:'Elektrolyt',
      sources:['AAHA Fluid Therapy Guidelines 2024','Plumbs Veterinary Drug Handbook'],
      species:{
        hund:{low:0.25,high:0.5,unit:'mmol/kg/h',route:'Dauertropf IV, nur verdünnt in der Trägerinfusion',conc:'2 mmol/mL (7,45 %) — NIE unverdünnt',indication:'Kaliummangel, besonders bei Ektopie, die auf Klasse-I-Antiarrhythmika nicht anspricht',notes:'Nach Serumkalium ersetzen. Ein Kaliummangel macht das Herz unempfindlich gegen Lidocain und Procainamid — ohne Kaliumausgleich wirkt kein Klasse-I-Mittel.',caution:'ABSOLUTE Obergrenze 0,5 mmol/kg/h — darüber Bradykardie, AV-Block, Asystolie. Niemals als Bolus, niemals unverdünnt, immer über Spritzenpumpe und mit EKG.'},
        katze:{low:0.25,high:0.5,unit:'mmol/kg/h',route:'Dauertropf IV, nur verdünnt',conc:'2 mmol/mL — NIE unverdünnt',indication:'Kaliummangel',notes:'Wie Hund.',caution:'Wie Hund; bei Harnröhrenverschluss vorher eine Hyperkaliämie ausschließen.'}
      }},
    { id:'phenylephrin', name:'Phenylephrin', icon:'⚡', cls:'Vasopressor (reiner α1)',
      sources:['AJVR 2023','VAA 2021 (Katze)'],
      species:{
        hund:{low:0.5,high:3,unit:'mcg/kg/min',route:'Dauertropf IV',conc:'10 mg/mL — verdünnen',indication:'Hypotonie durch Gefäßerweiterung, besonders nach Acepromazin',notes:'Bolus 1–3 µg/kg IV zur Überbrückung. Steht Acepromazin im Protokoll, wirkt ein reiner α1-Stoff besser als Mittel mit β2-Anteil.',caution:'Reflexbradykardie und Abfall des Herzzeitvolumens — kein Mittel bei geschwächtem Herzmuskel oder niedrigem Auswurf. Austritt aus der Vene führt zur Nekrose.'},
        katze:{low:0.5,high:3,unit:'mcg/kg/min',route:'Dauertropf IV',conc:'10 mg/mL — verdünnen',indication:'Hypotonie unter Isofluran',notes:'Bei der Katze wirksam, Dopamin dagegen nicht (VAA 2021).',caution:'Reflexbradykardie.'}
      }},
    { id:'terbutalin', name:'Terbutalin', icon:'🫁', cls:'β2-Bronchodilatator', aliases:['bricanyl'],
      sources:['Plumbs Veterinary Drug Handbook','VIN/WSAVA 2006'],
      species:{
        hund:{low:0.01,high:0.01,unit:'mg/kg',route:'SC/IM/langsam IV',conc:'0.5 mg/mL — für IV verdünnen',indication:'Akuter Bronchospasmus unter Narkose (Kapno-Haifischflosse)',notes:'Alle 4–6 h wiederholbar. Alternativ Salbutamol 4 µg/kg IV, bis 8 µg/kg; bei liegendem Tubus ist die Inhalation über Tubus und Spacer vorzuziehen.',caution:'Tachykardie, Muskelzittern, Kaliumabfall. Bei bestehender Tachyarrhythmie oder ventrikulärer Ektopie zurückhaltend — β2 verstärkt beides. Zuerst die mechanischen Ursachen ausschließen: Tubus, Sekret, Lagerung.'},
        katze:{low:0.01,high:0.01,unit:'mg/kg',route:'SC/IM/langsam IV',conc:'0.5 mg/mL — verdünnen',indication:'Bronchospasmus / Asthmakrise',notes:'Bei der Katze das Standard-Notfall-β2; 0,01 mg/kg SC, Wirkung in 5–15 min.',caution:'Tachykardie; bei HCM Blutdruck und Frequenz überwachen.'}
      }},
    { id:'calcium', name:'Calciumgluconat 10 %', icon:'🧂', cls:'Notfall/Elektrolyt', aliases:['calciumgluconat','ca'],
      sources:['Plumb’s','Praxis'],
      species:{
        hund:{low:50,high:150,unit:'mg/kg',route:'langsam IV',conc:'100 mg/mL',indication:'Hyperkaliämie (Myokard-Stabilisierung) / Hypokalzämie',notes:'10 % = 100 mg/mL → 0,5–1,5 mL/kg. Langsam über 5–10 min unter EKG.',caution:'Zu schnell → Bradykardie/Arrhythmie/Asystolie – EKG-Kontrolle! Nicht mit Bikarbonat mischen (Ausfällung).'},
        katze:{low:50,high:150,unit:'mg/kg',route:'langsam IV',conc:'100 mg/mL',indication:'Hyperkaliämie/Hypokalzämie',notes:'0,5–1,5 mL/kg langsam.',caution:'EKG-Kontrolle.'}
      }},
    { id:'propranolol', name:'Propranolol (Dociton)', icon:'💓', cls:'Antiarrhythmikum (β-Blocker)',
      sources:['Plumb’s','Praxis'],
      species:{
        hund:{low:0.02,high:0.1,unit:'mg/kg',route:'langsam IV',conc:'1 mg/mL',indication:'Supraventrikuläre Tachyarrhythmie',notes:'Langsam titrieren (0,02–0,1 IV); p.o. höher, 3× tägl.',caution:'Negativ inotrop/chronotrop – nicht bei Herzinsuffizienz/Bradykardie/AV-Block; nicht mit α2. Katze/Asthma Vorsicht.'},
        katze:{low:0.02,high:0.06,unit:'mg/kg',route:'langsam IV',conc:'1 mg/mL',indication:'SVT / Hyperthyreose-Tachykardie',notes:'p.o. 0,5–1 mg/kg 2–3× tägl.',caution:'Vorsicht bei Asthma/Herzinsuffizienz.'}
      }},
    { id:'furosemid', name:'Furosemid (Dimazon)', icon:'💧', cls:'Diuretikum', aliases:['dimazon','lasix'],
      sources:['Plumb’s','Praxis'],
      species:{
        ratte:{low:1,high:4,unit:'mg/kg',route:'SC/IM/PO, q8-12h',conc:'10 mg/mL',indication:'Lungenoedem, Pleuraerguss bei Herzinsuffizienz',notes:'Fuer die Ratte liegt in den geprueften Quellen KEINE speziesspezifische Dosisangabe vor. Der Bereich ist aus der Kleintier-Herzinsuffizienztherapie (1-4 mg/kg/Tag Erhaltung, akut hoeher) auf die Ratte uebertragen; Fallberichte zu dilatativer Kardiomyopathie bei Heimtierratten (J ',caution:'EXTRAPOLIERT. Bei der Ratte bedeutet ein Dosierfehler von 0,1 ml schnell das Mehrfache der Dosis - unbedingt verduennen. Bei gleichzeitiger Nierenerkrankung Dehydratation und Azotaemie provozierbar.'},
        rennmaus:{low:1,high:4,unit:'mg/kg',route:'SC/IM/IV alle 8-12 h',conc:'10 mg/mL (verduennen)',indication:'Lungenoedem, Volumenueberladung',notes:'Quelle: Exoten-Notfalldosen fuer Kleinsaeuger 1-4 mg/kg. Keine rennmausspezifische Studie.',caution:'Wuestentier mit hoher Konzentrationsleistung und geringer Wasserreserve - Furosemid dehydriert die Rennmaus sehr schnell. Nur mit gleichzeitiger Fluessigkeitsbilanz.'},
        hamster:{low:1,high:4,unit:'mg/kg',route:'SC/IM/IV alle 8-12 h',conc:'1 mg/mL (aus 10 mg/mL verduennt)',indication:'Lungenoedem/Stauungsinsuffizienz beim alten Goldhamster mit Kardiomyopathie und Vorhofthro',notes:'Quelle: Exoten-Notfalldosen (LafeberVet/Veterian Key, Kaninchen und Kleinsaeuger 1-4 mg/kg IV/SC/IM); klinische Berichte zur Herzinsuffizienztherapie des Hamsters nennen Furosemid plus ACE-Hemmer als symptomatische Therapie.',caution:'Bei Amyloidose/Niereninsuffizienz und beim dehydrierten Tier vorsichtig - Hypovolaemie und Elektrolytentgleisung. Auf Kaliumverlust achten. Der Hamster mit Vorhofthrombose ist unter Narkose ohnehin hoechstgefaehrdet; Furosemid ersetzt keine'},
        /* GEGENANZEIGE NACHGETRAGEN AM 15.08.2026 (Praxis der Kardiologie S.422, dort zweimal).
           Das Wort "Perikard" kam in dieser ganzen Datei vorher NICHT EIN EINZIGES MAL vor.
           Der Punkt ist klinisch scharf: die dyspnoeische Katze mit Perikarderguss sieht aus
           wie ein Lungenoedem, und die Station hat ihr bis hierher wortlos eine
           Furosemid-Milliliterzahl ausgerechnet. Bei der Tamponade traegt die Fuellung den
           Kreislauf - Entwaesserung nimmt genau das weg.
           BEWUSST "Tamponade/Perikarderguss" und NICHT blosses "Erguss": sonst unterbliebe
           Furosemid beim gleichzeitig bestehenden Linksherzversagen, und das waere der
           Fehler in die andere Richtung. */
        hund:{low:2,high:4,unit:'mg/kg',route:'IV/IM',conc:'50 mg/mL',indication:'Lungenödem / Volumenüberladung',notes:'Notfall bis 4 mg/kg, ggf. wiederholen/CRI. Dimazon 50 mg/mL.',caution:'ABSOLUT VERBOTEN bei Herzbeuteltamponade/Perikarderguss — dort ist die Füllung das Einzige, was den Kreislauf noch trägt (Praxis der Kardiologie S.422). Bei Mitralstenose droht Vorwärtsversagen (low output). Relativ: Nieren-/Leberinsuffizienz, Erbrechen/Durchfall, Diabetes. Dehydratation/Hypokaliämie – mit NSAID Nierenperfusion beachten.'},
        katze:{low:1,high:2,unit:'mg/kg',route:'IV/IM',conc:'50 mg/mL',indication:'Lungenödem',notes:'Katze empfindlicher – niedriger. Die Praxis der Kardiologie nennt für das akute kongestive Herzversagen der Katze höhere Werte (S.377/423); dieser Station bleibt bewusst der niedrigere Bereich, weil das Buch sich an dieser Stelle selbst widerspricht.',caution:'ABSOLUT VERBOTEN bei Herzbeuteltamponade/Perikarderguss — dort ist die Füllung das Einzige, was den Kreislauf noch trägt (Praxis der Kardiologie S.422). Relativ: Nieren-/Leberinsuffizienz, Erbrechen/Durchfall, Diabetes. Hypokaliämie/Dehydratation.'}
      }},
    { id:'apomorphin', name:'Apomorphin', icon:'🤮', cls:'Emetikum',
      sources:['Plumb’s','Praxis'],
      species:{
        hund:{low:0.03,high:0.1,unit:'mg/kg',route:'IV/SC/konjunktival',indication:'Emesis-Induktion (Giftaufnahme, präop. Magenentleerung)',conc:'',notes:'Praxis: 0,2 mL/10 kg s.c. IV wirkt schnellster; konjunktival gut steuerbar (nach Erbrechen ausspülen).',caution:'NICHT bei bewusstseinsgetrübtem/krampfendem Tier, Aspirationsgefahr, ätzenden/scharfen Giften. Nicht bei Katze (dort α2/Xylazin bevorzugt).'},
        katze:{low:null,high:null,unit:'mg/kg',route:'',conc:'',indication:'',notes:'',caution:'Bei der Katze nicht empfohlen – zur Emesis Dexmedetomidin/Xylazin verwenden.'}
      }},
    { id:'vitk', name:'Vitamin K1 (Konakion/Phytomenadion)', icon:'🩸', cls:'Antidot/Vitamin', aliases:['konakion','konaktion','phytomenadion'],
      sources:['Plumb’s'],
      species:{
        hund:{low:2.5,high:5,unit:'mg/kg',route:'SC/PO (nicht IV)',conc:'10 mg/mL',indication:'Antikoagulanzien-Rodentizid-Vergiftung',notes:'Praxis-Notiz 1 mL/10 kg (≈1 mg/kg); Standard-Therapie 2,5–5 mg/kg/Tag über 3–4 Wo (langwirksame Rodentizide). Mit fettreichem Futter besser resorbiert.',caution:'IV → Anaphylaxie-Risiko → SC/PO bevorzugt. Wirkt erst nach 6–12 h – bei akuter Blutung Plasma/Vollblut.'},
        katze:{low:2.5,high:5,unit:'mg/kg',route:'SC/PO',conc:'10 mg/mL',indication:'Rodentizid-Vergiftung',notes:'',caution:'Wie Hund.'}
      }},
    { id:'dexamethason', name:'Dexamethason (Hexadreson)', icon:'💊', cls:'Kortikosteroid',
      sources:['Plumb’s','Praxis'],
      species:{
        ratte:{low:0.1,high:0.5,unit:'mg/kg',route:'SC/IM',conc:'0.4 mg/mL (aus 4 mg/mL verduennt)',indication:'Hirnoedem/Druckentlastung bei Hypophysenadenom, schwerer Schock',notes:'Fuer die Ratte liegt in den geprueften Quellen KEINE belegte mg/kg-Angabe vor. Kortikosteroide werden in der Literatur zum Hypophysenadenom der Ratte (zusammen mit Cabergolin) ausdruecklich empfohlen, aber ohne Dosis. Der Bereich ist aus der Kleintiermedizin uebertragen.',caution:'EXTRAPOLIERT. Niemals mit einem NSAID kombinieren (GI-Ulzera). Steroide beguenstigen bei Ratten mit Mycoplasmose eine Verschlechterung der Atemwegsinfektion.'},
        rennmaus:{low:0.5,high:2,unit:'mg/kg',route:'IV/IM/SC einmalig',conc:'2 mg/mL bzw. 4 mg/mL',indication:'Nur ausgewaehlte Notfaelle',notes:'EXTRAPOLIERT aus Exoten-Notfalldosen. Keine Rennmausdaten.',caution:'Extrapoliert. Steroide beguenstigen bei der Rennmaus Immunsuppression und GI-Ulzeration; nicht mit NSAID kombinieren.'},
        hamster:{low:0.5,high:2,unit:'mg/kg',route:'IV/IM/SC einmalig',conc:'2 mg/mL bzw. 4 mg/mL',indication:'Nur ausgewaehlte Notfaelle (anaphylaktoide Reaktion, schwerer Schock nach Versagen der Vol',notes:'EXTRAPOLIERT aus Exoten-Notfalldosen (Kaninchen 2 mg/kg IV). Keine hamsterspezifische Studie.',caution:'Extrapoliert und in der modernen Schocktherapie umstritten. Nager sind stark steroidempfindlich: Immunsuppression, GI-Ulzeration, verzoegerte Wundheilung, Hyperglykaemie. Beim Campbell-Zwerghamster mit Diabetes und beim Hamster mit Wet Tail'},
        hund:{low:0.1,high:0.2,unit:'mg/kg',route:'IV/IM',conc:'2 mg/mL',indication:'Antiinflammatorisch / Anaphylaxie (adjuvant)',notes:'Praxis 0,05 mL/kg (Hexadreson 2 mg/mL ≈ 0,1 mg/kg). Bei Anaphylaxie: Adrenalin ist Erstlinie, Steroid nur ergänzend.',caution:'Nicht mit NSAID (GI-Ulkus). Verzögert – kein Notfall-Erstmittel.'},
        katze:{low:0.1,high:0.2,unit:'mg/kg',route:'IV/IM',conc:'2 mg/mL',indication:'Antiinflammatorisch/Anaphylaxie',notes:'',caution:'Wie Hund.'}
      }},
    { id:'methylpred', name:'Methylprednisolon-Na-Succinat (Medrate Solubite)', icon:'💊', cls:'Kortikosteroid',
      sources:['Plumb’s'],
      species:{
        hund:{low:15,high:30,unit:'mg/kg',route:'langsam IV',conc:'',indication:'(historische Schock-/Rückenmark-Hochdosis)',notes:'Praxis-Wert 15–30 mg/kg.',caution:'⚠ Hochdosis-Steroide bei Schock/Trauma/CPR werden NICHT mehr empfohlen (kein Nutzen, GI-/Immun-Schaden; RECOVER: keine Routine-Steroide). Nur nach individueller Indikation.'},
        katze:{low:15,high:30,unit:'mg/kg',route:'langsam IV',conc:'',indication:'(historische Hochdosis)',notes:'',caution:'Wie Hund – kritisch abwägen.'}
      }},
    { id:'heparin', name:'Heparin', icon:'🩸', cls:'Antikoagulans',
      sources:['Plumb’s','Praxis'],
      species:{
        hund:{low:100,high:200,unit:'IU/kg',route:'IV, dann SC',conc:'5000 IU/mL',indication:'Thromboembolie-Prophylaxe/-Therapie',notes:'Praxis: 100–200 IE/kg IV, dann 75–100 IE/kg 3–4× tägl. s.c.',caution:'Blutungsrisiko; aPTT/anti-Xa steuern. Antidot Protamin.'},
        katze:{low:200,high:200,unit:'IU/kg',route:'IV, dann SC',conc:'5000 IU/mL',indication:'ATE-Prophylaxe',notes:'200 IE/kg IV, dann alle 8 h s.c. (an anti-Xa titrieren).',caution:'Blutungsrisiko.'}
      }},
    { id:'lidocain_lok', name:'Lidocain (Lokalanästhesie)', icon:'💉', cls:'Lokalanästhetikum',
      sources:['BSAVA'],
      species:{
        maus:{low:2,high:4,unit:'mg/kg',route:'lokale Infiltration',conc:'10 mg/mL (1 %), zur Anwendung auf 1-2 mg',indication:'Infiltration Schnittrand, Ringblock',notes:'Quelle: Illinois ACS (2-4 mg/kg, Anschlag 5-10 min, Dauer 1-2 h); Ohio State 2 mg/kg, Obergrenze 7 mg/kg.',caution:'Bei 25 g Maus sind 4 mg/kg nur 0,1 mg = 0,01 ml einer 1%igen Loesung. Ohne Verduennung ist eine toedliche Ueberdosis unvermeidbar.'},
        ratte:{low:2,high:4,unit:'mg/kg',route:'lokale Infiltration',conc:'10 mg/mL (1 %) oder 20 mg/mL (2 %), zur ',indication:'Infiltration Schnittrand, Ringblock, Zahnextraktion',notes:'Quelle: Illinois ACS (2-4 mg/kg, Anschlag 5-10 min, Dauer 1-2 h); Ohio State nennt 2 mg/kg und Obergrenze 7 mg/kg.',caution:'Gesamtdosis 7 mg/kg nicht ueberschreiten. Unverduennt reicht bei 300 g Ratte schon ein Tropfen an die toxische Grenze.'},
        rennmaus:{low:1,high:7,unit:'mg/kg',route:'lokale Infiltration / Inzisionslinie',conc:'20 mg/mL (2 %) - auf 5 mg/mL (0,5 %) ver',indication:'Duftdruesentumor-Exzision, Schwanzamputation nach Degloving, Ovarialzysten-OP',notes:'Quelle: UBC Rodent Local Anesthetic SOP (max. 7 mg/kg, 0,5 % verduennt).',caution:'Lokalanaesthesie ist bei der Rennmaus doppelt wertvoll, weil sie den Inhalationsbedarf und damit die Kreislaufdepression senkt. Trotzdem: Gesamtdosis strikt einhalten, Krampfschwelle dieser Art ist ohnehin niedrig.'},
        hamster:{low:1,high:7,unit:'mg/kg',route:'lokale Infiltration / Splash / Inzisionslini',conc:'20 mg/mL (2 %) - zwingend auf 5 mg/mL (0',indication:'Inzisionslinienblock, Backentaschenchirurgie, Duftdruesen-/Hautexzision, Zahnextraktion; s',notes:'Quelle: UBC Animal Care, Local Analgesia/Anesthesia for Adult Rodents SOP: 2 % Lidocain auf 0,5 % verduennen, Gesamtdosis 7 mg/kg nicht ueberschreiten. In der Kleinnagerchirurgie war beim Goldhamster Lidocain-Ergaenzung noetig, um Peritonealschnitte unter Ketamin/Xylazin schmerzf',caution:'7 mg/kg ist bei 100 g Hamster 0,7 mg = 0,14 mL der 0,5-%-Loesung. Ueberschreitung fuehrt zu Krampf und Herzstillstand. Bei Kombination mit Bupivacain die Gesamtmenge der Lokalanaesthetika addieren (Bupivacain max. 2 mg/kg).'},
        hund:{low:1,high:4,unit:'mg/kg',route:'lokal/Infiltration',conc:'20 mg/mL (2%)',indication:'Lokal-/Leitungsanästhesie',notes:'Maximale Gesamtdosis ~4 mg/kg (mit Adrenalin ~6).',caution:'Nicht intravasal. LA-Toxizität ist ADDITIV: Lidocain + Bupivacain zusammen zählen (Summe der Dosis-Anteile ≤ 1) – LA-Gesamtdosis-Rechner nutzen.'},
        katze:{low:1,high:2,unit:'mg/kg',route:'lokal',conc:'20 mg/mL',indication:'Lokalanästhesie',notes:'Max ~2 mg/kg.',caution:'Toxizität beachten – Gesamtdosis limitieren.'},
        kaninchen:{low:1,high:2,unit:'mg/kg',route:'lokal',conc:'2–10 mg/mL',indication:'Lokal',notes:'Verdünnen für kleine Patienten.',caution:'Kleine Gesamtdosis.'}
      }},
    { id:'bupivacain', name:'Bupivacain', icon:'💉', cls:'Lokalanästhetikum',
      sources:['BSAVA'],
      species:{
        hund:{low:1,high:2,unit:'mg/kg',route:'lokal/Nervenblock',conc:'5 mg/mL (0.5%)',indication:'Länger wirkende Lokalanästhesie',notes:'Wirkdauer 4–8 h.',caution:'NIE i.v. (kardiotoxisch). Mit Lidocain kombiniert ist die Toxizität ADDITIV – Dosis-Anteile summieren (≤ 1), LA-Gesamtdosis-Rechner nutzen.'},
        katze:{low:1,high:1,unit:'mg/kg',route:'lokal',conc:'5 mg/mL',indication:'Lokal',notes:'Max ~1–2 mg/kg.',caution:'Kardiotoxizität.'}
      }},
    { id:'propofol', name:'Propofol', icon:'💤', cls:'Injektionsnarkotikum',
      sources:['Plumb’s','BSAVA'],
      species:{
        maus:{low:10,high:26,unit:'mg/kg',route:'IV (Schwanzvene)',conc:'10 mg/mL',indication:'Einleitung bei liegendem IV-Zugang',notes:'Quelle: Veterian Key Rodents-Kapitel (Maus 12-26 mg/kg IV); experimentell HD50 10,5 mg/kg IV Schwanzvene.',caution:'IV-Zugang bei der Maus ist Speziallabor-Technik, in der Heimtierpraxis unrealistisch. Ausgepraegte Apnoe.'},
        ratte:{low:7.5,high:10,unit:'mg/kg',route:'IV (Schwanzvene), langsam über 30-60 s',conc:'10 mg/mL',indication:'Einleitung bei liegendem IV-Zugang, Vertiefung',notes:'Quelle: Veterian Key Rodents-Kapitel (Ratte 7,5-10 mg/kg IV); experimentell LORR ab 7,0 mg/kg IV in < 15 s.',caution:'Nur IV wirksam - Schwanzvenenzugang bei der Ratte technisch anspruchsvoll und bei schwanzlosen Tieren unmoeglich. Ausgepraegte Apnoe, ohne Beatmungsmoeglichkeit nicht verwenden.'},
        rennmaus:{low:5,high:10,unit:'mg/kg',route:'IV/IO',conc:'10 mg/mL',indication:'Einleitung bei liegendem Zugang',notes:'EXTRAPOLIERT aus der Ratte. Keine rennmausspezifische Dosis publiziert.',caution:'Extrapoliert. Apnoerisiko, kein Atemweg sicherbar. Praktisch fast nie indiziert.'},
        hamster:{low:5,high:10,unit:'mg/kg',route:'IV (langsam ueber 30-60 s), IO',conc:'10 mg/mL',indication:'Einleitung, wenn ausnahmsweise ein IV/IO-Zugang liegt',notes:'EXTRAPOLIERT aus der Ratte (Verlust des Stellreflexes ab ca. 7-10 mg/kg IV). Es existiert KEINE publizierte Propofoldosis fuer Hamster oder Zwerghamster.',caution:'Extrapoliert - im Zweifel nicht verwenden. Apnoe ist bei Propofol die Regel, nicht die Ausnahme, und beim Hamster kann man nicht intubieren. Nur mit Beatmungsmoeglichkeit (Maske + IPPV) und nur, wenn Isofluran keine Option ist.'},
        hund:{low:4,high:6,unit:'mg/kg',route:'IV nach Wirkung',conc:'10 mg/mL',indication:'Einleitung',notes:'IMMER direkt i.v. Prämediziert 1–4 mg/kg; langsam titrieren. Bolus-Erhaltung 1,25–2,5 mg/kg (0,12–0,25 mL/kg) alle 4–5 min nach Wirkung ODER CRI 0,1–0,4 mg/kg/min.',caution:'Atemdepression/Apnoe, Hypotension – langsam geben, O₂ bereit.'},
        katze:{low:4,high:8,unit:'mg/kg',route:'IV nach Wirkung',conc:'10 mg/mL',indication:'Einleitung',notes:'Prämediziert weniger.',caution:'Heinz-Körper bei wiederholter Gabe (Katze); Apnoe.'},
        kaninchen:{low:5,high:15,unit:'mg/kg',route:'langsam IV',conc:'10 mg/mL',indication:'Einleitung',notes:'Zu Wirkung titrieren.',caution:'Apnoe – langsam.'},
        reptil:{low:5,high:15,unit:'mg/kg',route:'IV/IO',conc:'10 mg/mL',indication:'Einleitung',notes:'',caution:'Apnoe – beatmen können.'}
      }},
    { id:'alfaxalon', name:'Alfaxalon', icon:'💤', cls:'Injektionsnarkotikum', aliases:['alfaxan'],
      sources:['Plumb’s','BSAVA'],
      species:{
        maus:{low:50,high:50,unit:'mg/kg',route:'SC (in Kombination)',conc:'10 mg/mL',indication:'Chirurgische Narkose in Kombination',notes:'Quelle: JAALAS 2024 - Alfaxalon 50 mg/kg + Xylazin 10 mg/kg + Buprenorphin 0,1 mg/kg SC ergab chirurgische Narkose ueber 48,6 ± 4,7 min (weiblich) bzw. 60,8 ± 9,6 min (maennlich).',caution:'Belegt nur in dieser Dreierkombination, nicht als Monosubstanz. Grosses Injektionsvolumen fuer eine Maus - auf mehrere SC-Depots verteilen.'},
        ratte:{low:5,high:30,unit:'mg/kg',route:'IM 5 (Sedation) / IP 20-30 (Narkose) / IV 5-',conc:'10 mg/mL',indication:'Sedation fuer Roentgen (IM), Einleitung/Narkose (IP)',notes:'Quelle: J Exot Pet Med 2024 - 5 mg/kg IM zur Sedation fuer Thoraxroentgen bei Heimtierratten; JAALAS - 20 mg/kg IP Sedation, 30 mg/kg IP + Dexmedetomidin 0,05 mg/kg chirurgische Narkose (weibliche SD-Ratten), LORR 0-9 min; 10 mg/kg/h IV als CRI belegt.',caution:'Deutlicher Geschlechtsunterschied: maennliche Ratten brauchen teils die doppelte bis dreifache Dosis (bis 75 mg/kg IP). Apnoe bei schneller IV-Gabe.'},
        rennmaus:{low:5,high:20,unit:'mg/kg',route:'SC/IM',conc:'10 mg/mL',indication:'Sedierung, Ergaenzung zur Inhalationsnarkose',notes:'EXTRAPOLIERT aus Ratte/Meerschweinchen (5 mg/kg IM Sedation) und dem Kleinsaeuger-Sammelbereich 2-20 mg/kg. Keine Rennmausdaten.',caution:'Extrapoliert. Vorteil bei der Rennmaus: Alfaxalon senkt die Krampfschwelle nicht und ist damit theoretisch guenstiger als Ketamin - belegt ist das fuer diese Art aber nicht.'},
        hamster:{low:5,high:20,unit:'mg/kg',route:'SC/IM (IP in Studien)',conc:'10 mg/mL',indication:'Sedierung fuer Roentgen/Untersuchung, Ergaenzung zur Maskennarkose',notes:'EXTRAPOLIERT: Exotic-Anaesthesie-Kapitel nennt fuer Kleinsaeuger 2-20 mg/kg SC/IM; bei Ratte und Meerschweinchen sind 5 mg/kg IM als Sedation validiert (Wirkbeginn ~4 min, Dauer ~30 min); bei Maeusen wurden 40-120 mg/kg IP mit Xylazin verwendet. Keine hamsterspezifische Studie.',caution:'Extrapoliert. Grosses Injektionsvolumen bei 10 mg/mL - bei 20 mg/kg und 100 g sind das 0,2 mL IM, das ist fuer einen Hamstermuskel zu viel; auf zwei Stellen aufteilen oder SC geben. Beim Zwerghamster am unteren Rand.'},
        hund:{low:2,high:3,unit:'mg/kg',route:'IV nach Wirkung',conc:'10 mg/mL',indication:'Einleitung',notes:'Prämediziert 1–2 mg/kg. Langsam titrieren. TIVA-Erhaltung ~0,1 mg/kg/min (prämed.) bis 0,15–0,2 (leicht/unprämed.) ≈ 6–12 mg/kg/h; O₂ ± IPPV bereithalten (dosisabhängige Apnoe).',caution:'Apnoe möglich.'},
        katze:{low:2,high:5,unit:'mg/kg',route:'IV/IM',conc:'10 mg/mL',indication:'Einleitung',notes:'IM möglich (höheres Volumen). TIVA-Erhaltung ~0,12–0,2 mg/kg/min (≈ 7–12 mg/kg/h), nach Prämed. niedriger; O₂ ± IPPV.',caution:'Apnoe.'},
        kaninchen:{low:2,high:4,unit:'mg/kg',route:'IV',conc:'10 mg/mL',indication:'Einleitung',notes:'Auch IM in Kombination.',caution:''},
        meerschwein:{low:5,high:10,unit:'mg/kg',route:'IM/IV',conc:'10 mg/mL',indication:'Sedation/Einleitung',notes:'',caution:''},
        reptil:{low:5,high:15,unit:'mg/kg',route:'IV/IM',conc:'10 mg/mL',indication:'Einleitung',notes:'',caution:'Lange Erholung möglich.'}
      }},
    { id:'ketamin', name:'Ketamin', icon:'💤', cls:'Dissoziativ-Anästhetikum',
      sources:['Plumb’s','Carpenter'],
      species:{
        maus:{low:50,high:150,unit:'mg/kg',route:'IP',conc:'10 mg/mL (aus 100 mg/mL (10 %) verduennt)',indication:'Einleitung und Narkose, immer in Kombination',notes:'Quelle: Ohio State (80-110 mg/kg IP mit Xylazin), Illinois ACS (50-100 mg/kg IP/SC mit Xylazin; 100 mg/kg mit Diazepam), Queen’s SOP (150 mg/kg mit Xylazin 10 mg/kg IP bzw. 75 mg/kg mit Medetomidin). Nachdosierung 1/3 bis 1/2 der Ketamindosis allein.',caution:'Die Empfindlichkeit schwankt zwischen Staemmen, Geschlechtern und Altersgruppen so stark, dass eine Dosis, die den einen Stamm nur leicht narkotisiert, einen anderen toeten kann. Immer mit Sauerstoffvorlage.'},
        ratte:{low:40,high:100,unit:'mg/kg',route:'IP (bevorzugt), SC',conc:'10 mg/mL (aus 100 mg/mL (10 %) verduennt)',indication:'Einleitung und Narkose, praktisch immer in Kombination',notes:'Quelle: Ohio State (40-80 mg/kg IP mit Xylazin), Illinois ACS (40-100 mg/kg in Kombination, mit Atropin bis 75-100 mg/kg), Veterian Key (75-95 mg/kg mit Xylazin). Nachdosierung: 1/3 bis 1/2 der Initialdosis, Ketamin allein.',caution:'CliniPharm Universitaet Zuerich: nach IM-Injektion von Ketamin-Xylazin sind Muskelnekrosen an der Injektionsstelle beschrieben - deshalb IP applizieren, nicht IM. Ketamin allein erzeugt keine ausreichende Muskelrelaxation und keine viszeral'},
        rennmaus:{low:40,high:200,unit:'mg/kg',route:'IM/IP',conc:'100 mg/mL (10 %)',indication:'Immobilisation/Narkose in Kombination; 40-60 mg/kg IM ergibt leichte, hoehere Dosen tiefe ',notes:'Quelle: Quesenberry/Carpenter Gerbils - Ketamin 100-200 mg/kg IM zur chemischen Immobilisation; Veterian Key Rodents - Ketamin 40-60 mg/kg IM leichte Sedierung; University of Kentucky DLAR - Ketamin 75 mg/kg IP + Medetomidin 0,5 mg/kg IP.',caution:'NIEMALS mit Acepromazin kombinieren - Acepromazin loest bei der Rennmaus Kraempfe aus und ist bei dieser Art kontraindiziert. Ketamin selbst senkt die Krampfschwelle nicht, das Handling zur Injektion aber schon.'},
        hamster:{low:40,high:200,unit:'mg/kg',route:'IM/IP (SC bei hoher Dosis)',conc:'100 mg/mL (10 %)',indication:'Immobilisation/Narkose, praktisch immer in Kombination. Solo 20-40 mg/kg IM ergibt nur ein',notes:'Quelle: Curl & Peters, Lab Anim 1983 - 50-200 mg/kg Ketamin + 10 mg/kg Xylazin IP war beim Goldhamster ein brauchbares Allgemeinanaesthetikum, wobei 50 mg/kg keine verlaessliche Immobilisation ergab und 150 mg/kg + 10 mg/kg Xylazin IP eine adaequate Narkose ohne Gewebeschaden lie',caution:'Ketamin 10 % ist gewebstoxisch - IM nur kleine Volumina, bei hoher Dosis SC oder IP. ZWERGHAMSTER: die hohen Goldhamsterdosen NICHT uebertragen - 200 mg/kg Ketamin + 10 mg/kg Xylazin toeteten 13 von 24 Dsungarischen Zwerghamstern. Ketamin a'},
        hund:{low:2,high:5,unit:'mg/kg',route:'IV (Kombi)',conc:'100 mg/mL',indication:'Einleitung/Kombi',notes:'Immer mit Benzodiazepin/α2. IM in Kombi 5–10. Analgesie-CRI (sub-anästhetisch, MAC-sparend): Bolus 0,25–0,5 mg/kg IV, dann intraop ~10 µg/kg/min (2–10), postop 1–2 µg/kg/min – NICHT mit der Anästhesie-Dosis verwechseln (µg vs mg).',caution:'Nicht als Monoanästhetikum.'},
        /* AUS EINEM KUERZEL WIRD EINE ENTSCHEIDUNG (15.08.2026, Santilli 2018 S.318).
           "HKM-Vorsicht" liest sich am OP-Tisch wie ein Nebensatz. Der Mechanismus dahinter ist
           der Grund: Ketamin hebt den myokardialen Sauerstoffverbrauch, und die hoehere Frequenz
           verkuerzt bei der HCM genau die Diastole, in der die Koronarperfusion stattfindet.
           Dazu die Regel, die hinter allen Einzelverboten steht: beim kritisch kranken Tier
           bleibt die sympathische Gegenregulation aus - dann ueberwiegt die negativ inotrope
           Wirkung, und Herzzeitvolumen und Blutdruck FALLEN. Genau dort gilt Ketamin
           gemeinhin als "kreislaufschonend". Es kommt keine Zahl hinzu, nur die Begruendung. */
        katze:{low:2,high:10,unit:'mg/kg',route:'IV/IM (Kombi)',conc:'100 mg/mL',indication:'Einleitung/Kombi',notes:'Häufig mit Midazolam/Dexmedetomidin. Analgesie-CRI wie Hund: 0,25–0,5 mg/kg Bolus, dann ~2–10 µg/kg/min.',caution:'Bei HCM gefährlich: Ketamin erhöht den myokardialen Sauerstoffverbrauch, und die höhere Frequenz verkürzt die diastolische Koronarperfusionszeit — Dekompensation möglich (Santilli 2018 S.318). Beim kritisch kranken Tier fehlt die sympathische Gegenregulation; dann überwiegt die negativ inotrope Wirkung und der Blutdruck FÄLLT. Renal-/HKM-Vorsicht.'},
        kaninchen:{low:15,high:35,unit:'mg/kg',route:'IM (Kombi)',conc:'100 mg/mL',indication:'Kombi mit Medetomidin/Midazolam',notes:'',caution:''},
        meerschwein:{low:20,high:40,unit:'mg/kg',route:'IM (Kombi)',conc:'100 mg/mL',indication:'Kombi',notes:'',caution:''},
        reptil:{low:10,high:40,unit:'mg/kg',route:'IM/IV',conc:'100 mg/mL',indication:'Kombi',notes:'',caution:'Sehr lange Erholung; POTZ halten.'}
      }},
    { id:'etomidat', name:'Etomidat', icon:'💤', cls:'Injektionsnarkotikum',
      sources:['Plumb’s'],
      species:{
        hund:{low:0.5,high:2,unit:'mg/kg',route:'IV',conc:'2 mg/mL',indication:'Einleitung bei Herzpatient',notes:'Minimale kardiovaskuläre Depression; mit Prämed/Benzo.',caution:'Nebennieren-Suppression; Hämolyse.'},
        katze:{low:0.5,high:2,unit:'mg/kg',route:'IV',conc:'2 mg/mL',indication:'Herzpatient',notes:'',caution:''}
      }},
    { id:'dexmedetomidin', name:'Dexmedetomidin', icon:'😴', cls:'Alpha-2-Agonist', aliases:['dexdomitor'],
      sources:['Plumb’s','BSAVA'],
      species:{
        maus:{low:0.1,high:0.5,unit:'mg/kg',route:'IP/SC',conc:'0.05 mg/mL (aus 0.5 mg/mL verduennt)',indication:'Partner von Ketamin',notes:'Keine direkt belegte Mausdosis in den geprueften Quellen. Abgeleitet als die Haelfte der belegten Medetomidin-Dosis (0,2-1,0 mg/kg) - das ist die allgemein anerkannte Umrechnung, da Dexmedetomidin das aktive Enantiomer ist.',caution:'EXTRAPOLIERT aus Medetomidin. Sonst wie Medetomidin: Bradykardie, Hypothermie. Antagonist Atipamezol.'},
        ratte:{low:0.015,high:0.05,unit:'mg/kg',route:'IP/SC/IM',conc:'0.05 mg/mL (aus 0.5 mg/mL verduennt)',indication:'Sedation, Partner von Ketamin oder Alfaxalon',notes:'Quelle: JAALAS - Alfaxalon 30 mg/kg IP + Dexmedetomidin 0,05 mg/kg IP fuer chirurgische Narkose bei SD-Ratten; dvm360: 0,01-0,02 mg/kg IM mit Ketamin 2-5 mg/kg bei Kleinsaeugern. Dexmedetomidin = halbe Medetomidin-Dosis.',caution:'Wie Medetomidin: Bradykardie, Vasokonstriktion, Hypothermie. Antagonist Atipamezol.'},
        rennmaus:{low:0.25,high:1,unit:'mg/kg',route:'IP/SC',conc:'0,5 mg/mL',indication:'Narkose in Kombination mit Ketamin 50-75 mg/kg IP fuer Eingriffe unter 1 h',notes:'Quelle: universitaere Versuchstier-Formularien nennen fuer die Rennmaus Ketamin 50-75 mg/kg + Dexmedetomidin 0,5-1,0 mg/kg IP. Das ist deutlich mehr als bei Maus/Ratte ueblich (dort 0,25-0,5 mg/kg).',caution:'Die obere Grenze 1,0 mg/kg ist hoch. In der Praxis mit 0,25-0,5 mg/kg beginnen und mit Isofluran vertiefen statt die Alpha-2-Dosis auszureizen. Immer mit Atipamezol 0,5-1,0 mg/kg SC antagonisieren.'},
        hamster:{low:0.05,high:0.25,unit:'mg/kg',route:'IM/SC/IP',conc:'0,5 mg/mL',indication:'wie Medetomidin, halbe Dosis',notes:'ABGELEITET: Dexmedetomidin ist das aktive Enantiomer, Dosis = halbe Medetomidin-Dosis. Aus der belegten Hamsterdosis Medetomidin 0,15 mg/kg IM folgt Dexmedetomidin ~0,075 mg/kg IM. Es gibt keine eigene Dexmedetomidin-Studie am Hamster.',caution:'Abgeleitet, nicht direkt gemessen. Gleiche Warnungen wie Medetomidin: Bradykardie, Hypothermie, Hyperglykaemie. Antagonisierbar mit Atipamezol (5-facher Dexmedetomidin-Menge in mg).'},
        hund:{low:1,high:5,unit:'mcg/kg',route:'IV (3–10 IM)',conc:'0.5 mg/mL',indication:'Sedation/Prämedikation',notes:'Antagonist: Atipamezol. Niedrige Dosis + Opioid.',caution:'Bradykardie, Vasokonstriktion, MAP-Anstieg dann -abfall; nicht bei Herz-/Schockpatient.'},
        katze:{low:1,high:5,unit:'mcg/kg',route:'IV (5–20 IM, bis 40 tief)',conc:'0.5 mg/mL',indication:'Sedation',notes:'IM 5–20 Routine (mit Opioid), bis 40 µg/kg für tiefe Sedation/Analgesie; 5–10 bei Herzpatient.',caution:'Wie Hund; Erbrechen.'},
        kaninchen:{low:25,high:100,unit:'mcg/kg',route:'IM/SC (Kombi)',conc:'0.5 mg/mL',indication:'Sedation (Kombi)',notes:'Als Kombi mit Ketamin/Opioid/Midazolam; tief bis 125–250 µg/kg IM. Entspricht ≈ halber Medetomidin-µg-Dosis.',caution:'Ausgeprägte Bradykardie.'},
        meerschwein:{low:10,high:50,unit:'mcg/kg',route:'IM/SC',conc:'0.5 mg/mL',indication:'Sedation (Kombi)',notes:'',caution:''}
      }},
    { id:'medetomidin', name:'Medetomidin', icon:'😴', cls:'Alpha-2-Agonist',
      sources:['Plumb’s'],
      species:{
        maus:{low:0.2,high:1,unit:'mg/kg',route:'IP/SC',conc:'0.1 mg/mL (aus 1 mg/mL verduennt)',indication:'Partner von Ketamin, Bestandteil der MMF-Narkose',notes:'Quelle: Queen’s SOP (Ketamin 75 mg/kg + Medetomidin 1 mg/kg IP, ca. 30 min); MMF-Maus 0,5 mg/kg (Fleischmann, Lab Anim 2016) bzw. 0,2 mg/kg im GV-SOLAS-nahen Schema.',caution:'Starke Bradykardie und Vasokonstriktion, Pulsoxymetrie wird unzuverlaessig. Vollstaendig antagonisierbar mit Atipamezol.'},
        ratte:{low:0.15,high:0.5,unit:'mg/kg',route:'IP/SC',conc:'0.1 mg/mL (aus 1 mg/mL verduennt)',indication:'Sedation, Partner von Ketamin, Bestandteil der MMF-Narkose',notes:'Quelle: MMF-Protokoll Ratte 0,15 mg/kg (Albrecht BMC Vet Res 2014); Kombination Ketamin-Medetomidin 0,25-0,5 mg/kg (Veterian Key Rodents 0,5-1 mg/kg mit Ketamin 75-90 mg/kg).',caution:'Bradykardie und massive periphere Vasokonstriktion - Pulsoxymeter misst dann unzuverlaessig. Vollstaendig antagonisierbar mit Atipamezol.'},
        rennmaus:{low:0.1,high:0.5,unit:'mg/kg',route:'IP/SC/IM',conc:'1 mg/mL',indication:'Sedierung solo; Narkose in Kombination mit Ketamin',notes:'Quelle: Quesenberry/Carpenter Gerbils - Medetomidin 100-200 µg/kg IP oder SC zur chemischen Immobilisation; University of Kentucky DLAR - Medetomidin 0,5 mg/kg IP mit Ketamin 75 mg/kg IP.',caution:'Bradykardie und Hypothermie. Die Rennmaus kuehlt bei 80 g extrem schnell aus - Waermematte ab Injektion, nicht erst ab Schnitt. Immer mit Atipamezol antagonisieren statt ausschlafen lassen.'},
        hamster:{low:0.1,high:0.2,unit:'mg/kg',route:'IM/SC/IP',conc:'1 mg/mL',indication:'Sedierung, Narkosekomponente, Analgesie-Anteil; Bestandteil der MMB-Mischung',notes:'Quelle: Nakamura et al., J Vet Med Sci 2017 - Medetomidin 0,15 mg/kg IM als Teil der Mischung mit Midazolam 2,0 und Butorphanol 2,5 mg/kg; Wirkbeginn <5 min, Narkosedauer ~100 min, voll antagonisierbar mit 0,15 mg/kg Atipamezol.',caution:'Ausgepraegte Bradykardie, Vasokonstriktion, Hypothermie und massive Hyperglykaemie mit Insulinabfall. Beim Campbell-Zwerghamster mit Diabetesneigung deshalb kritisch - Blutzucker vorher und nachher messen. Bei Herzkranken meiden.'},
        hund:{low:5,high:20,unit:'mcg/kg',route:'IV/IM',conc:'1 mg/mL',indication:'Sedation',notes:'Antagonist Atipamezol.',caution:'Bradykardie.'},
        katze:{low:5,high:20,unit:'mcg/kg',route:'IM',conc:'1 mg/mL',indication:'Sedation',notes:'',caution:''},
        kaninchen:{low:0.1,high:0.5,unit:'mg/kg',route:'IM/SC',conc:'1 mg/mL',indication:'Kombi',notes:'⚠ Einheit mg/kg (= 100–500 µg/kg) – Hund/Katze stehen in µg/kg! Kaninchen sind α2-resistenter, brauchen höhere mg/kg. Mit Ketamin.',caution:'Bradykardie; Einheit beachten.'}
      }},
    { id:'xylazin', name:'Xylazin', icon:'😴', cls:'Alpha-2-Agonist', aliases:['rompun'],
      sources:['Plumb’s'],
      species:{
        maus:{low:5,high:15,unit:'mg/kg',route:'IP',conc:'1 mg/mL (aus 20 mg/mL (2 %) verduennt)',indication:'Partner von Ketamin oder Alfaxalon',notes:'Quelle: Illinois ACS (5-15 mg/kg IP/SC), Ohio State (5-10 mg/kg), Queen’s SOP (10 mg/kg).',caution:'Bradykardie, Hypothermie, Hyperglykaemie, Diurese. Antagonist Atipamezol. Ketamin-Xylazin verursacht bei der Maus regelmaessig Hypoxie - Sauerstoff ist Pflicht.'},
        ratte:{low:5,high:12,unit:'mg/kg',route:'IP (bevorzugt), IM',conc:'2 mg/mL (aus 20 mg/mL (2 %) verduennt)',indication:'Partner von Ketamin; Sedation, Relaxation, Analgesie',notes:'Quelle: Illinois ACS (5-12 mg/kg IP/IM mit Ketamin), Ohio State (5-10 mg/kg), Queen’s/UBC-Formulare gleicher Bereich.',caution:'Bradykardie, Hypotension, Hypothermie, Hyperglykaemie und deutliche Diurese - Blase vor dem Aufwachen ausdruecken. Antagonisierbar mit Atipamezol. Muskelnekrose bei IM-Gabe im Gemisch mit Ketamin.'},
        rennmaus:{low:2,high:5,unit:'mg/kg',route:'IM/IP',conc:'20 mg/mL (2 %)',indication:'Kombinationspartner zu Ketamin',notes:'Quelle: Quesenberry/Carpenter Gerbils - Xylazin 2 mg/kg IM; Veterian Key Rodents - Ketamin 50 + Xylazin 2 mg/kg IP fuer die Rennmaus.',caution:'Deutlich niedriger dosieren als beim Goldhamster. Bradykardie und Hypothermie; die Rennmaus kuehlt sehr schnell aus.'},
        hamster:{low:5,high:10,unit:'mg/kg',route:'IP/IM',conc:'20 mg/mL (2 %)',indication:'Kombinationspartner zu Ketamin',notes:'Quelle: Curl & Peters, Lab Anim 1983 - 10 mg/kg Xylazin mit 50-200 mg/kg Ketamin IP beim Goldhamster; University of Kentucky DLAR - 10 mg/kg mit Ketamin 150-200 mg/kg IP; Veterian Key Rodents - Ketamin 80 + Xylazin 5 mg/kg IM/IP.',caution:'Beim ZWERGHAMSTER maximal 5-10 mg/kg und nur mit maximal 100 mg/kg Ketamin - die Kombination 200/10 hatte am Dsungaren 54 % Mortalitaet. Bradykardie, Hypothermie, Hyperglykaemie, Diurese. Mit Atipamezol antagonisierbar (off-label, aber wirk'},
        hund:{low:0.5,high:1,unit:'mg/kg',route:'IM/IV',conc:'20 mg/mL',indication:'Sedation (älter)',notes:'Antagonist Atipamezol/Yohimbin.',caution:'Deutliche Bradykardie/AV-Block, Erbrechen; modernere α2 bevorzugt.'},
        katze:{low:0.5,high:1,unit:'mg/kg',route:'IM',conc:'20 mg/mL',indication:'Sedation',notes:'Löst Erbrechen aus.',caution:''},
        kaninchen:{low:1,high:5,unit:'mg/kg',route:'IM (Kombi)',conc:'20 mg/mL',indication:'Kombi mit Ketamin',notes:'',caution:''},
        reptil:{low:1,high:1,unit:'mg/kg',route:'IM',conc:'20 mg/mL',indication:'Kombi',notes:'',caution:''}
      }},
    { id:'midazolam', name:'Midazolam', icon:'🧊', cls:'Benzodiazepin',
      sources:['Plumb’s','BSAVA'],
      species:{
        maus:{low:1,high:5,unit:'mg/kg',route:'IP/SC',conc:'0.5 mg/mL (aus 5 mg/mL verduennt)',indication:'Relaxation, Bestandteil der MMF-Narkose',notes:'Quelle: MMF-Maus 5 mg/kg (Fleischmann, Lab Anim 2016) bzw. 1 mg/kg im niedriger dosierten Schema.',caution:'Allein nicht narkotisch. Antagonist Flumazenil.'},
        ratte:{low:2,high:5,unit:'mg/kg',route:'IP/SC/IM',conc:'1 mg/mL (aus 5 mg/mL verduennt)',indication:'Anxiolyse, Relaxation, Bestandteil der MMF-Narkose',notes:'Quelle: MMF-Protokoll Ratte 2,0 mg/kg (Albrecht BMC Vet Res 2014); dvm360 nennt 3-5 mg/kg IM/IV zur Beruhigung von Nagern.',caution:'Allein kaum sedierend, nur in Kombination sinnvoll. Antagonist Flumazenil.'},
        rennmaus:{low:2,high:5,unit:'mg/kg',route:'IM/IP/SC (intranasal moeglich)',conc:'5 mg/mL',indication:'Sedierung; bei der Rennmaus zusaetzlich als Krampfprophylaxe und Krampfdurchbrechung vor/w',notes:'Quelle: Quesenberry/Carpenter Gerbils - Midazolam 5 mg/kg IM oder IP zur chemischen Immobilisation.',caution:'Erste Wahl bei dieser Art, gerade weil Benzodiazepine antikonvulsiv wirken - Acepromazin ist das genaue Gegenteil und verboten. Solo keine Analgesie.'},
        hamster:{low:1,high:5,unit:'mg/kg',route:'IM/IP/SC (intranasal moeglich)',conc:'5 mg/mL',indication:'Sedierung, Anxiolyse, Muskelrelaxation, Narkosekomponente; Bestandteil der MMB-Mischung',notes:'Quelle: Nakamura et al. 2017 - Midazolam 2,0 mg/kg IM in der Hamster-MMB-Mischung; Kleinsaeuger-Formularien 0,5-2 mg/kg SC bis 5 mg/kg IM/IP.',caution:'Solo keine Analgesie. Atemdepression in Kombination mit Opioid. Antagonisierbar mit Flumazenil.'},
        hund:{low:0.1,high:0.3,unit:'mg/kg',route:'IV/IM',conc:'5 mg/mL',indication:'Ko-Induktion/Sedation/Krampf',notes:'Antagonist Flumazenil. Gute kardiovask. Stabilität.',caution:'Allein evtl. Erregung bei gesunden Tieren.'},
        katze:{low:0.1,high:0.3,unit:'mg/kg',route:'IV/IM',conc:'5 mg/mL',indication:'Ko-Induktion',notes:'',caution:''},
        kaninchen:{low:0.5,high:2,unit:'mg/kg',route:'IM/IV',conc:'5 mg/mL',indication:'Sedation (Kombi)',notes:'',caution:''},
        meerschwein:{low:0.5,high:2,unit:'mg/kg',route:'IM',conc:'5 mg/mL',indication:'Sedation',notes:'',caution:''},
        reptil:{low:0.5,high:2,unit:'mg/kg',route:'IM/IV',conc:'5 mg/mL',indication:'Sedation',notes:'',caution:''}
      }},
    { id:'diazepam', name:'Diazepam', icon:'🧊', cls:'Benzodiazepin',
      sources:['Plumb’s'],
      species:{
        maus:{low:5,high:5,unit:'mg/kg',route:'IP',conc:'5 mg/mL',indication:'Partner von Ketamin, Krampfdurchbrechung',notes:'Quelle: Illinois ACS - Ketamin 100 mg/kg + Diazepam 5 mg/kg IP bei der Maus; Vet Clin North Am Exot Anim Pract: Ketamin 40-150 + Diazepam 3-5 mg/kg IM.',caution:'Loesungsmittel reizt bei IP-Gabe; Midazolam ist vertraeglicher. Nicht in einer Spritze mit Ketamin mischen.'},
        ratte:{low:3,high:10,unit:'mg/kg',route:'IP',conc:'5 mg/mL',indication:'Partner von Ketamin, Krampfdurchbrechung',notes:'Quelle: Illinois ACS - Ketamin 40-60 mg/kg + Diazepam 5-10 mg/kg IP; Vet Clin North Am Exot Anim Pract: Ketamin 40-100 + Diazepam 3-5 mg/kg IM.',caution:'Oelige/propylenglykolhaltige Formulierung reizt bei IP-Gabe stark; Midazolam ist die vertraeglichere Alternative. Nicht mit Ketamin in einer Spritze mischen (Ausfaellung).'},
        rennmaus:{low:3,high:5,unit:'mg/kg',route:'IM/IP',conc:'5 mg/mL',indication:'Sedierung; Durchbrechen eines Krampfanfalls',notes:'Quelle: Quesenberry/Carpenter Gerbils - Diazepam 5 mg/kg IM oder IP.',caution:'Injektionsschmerz durch Propylenglykol - beim krampfenden Tier kann der Reiz den Anfall verstaerken; Midazolam bevorzugen, notfalls rektal/intranasal.'},
        hamster:{low:3,high:5,unit:'mg/kg',route:'IM/IP',conc:'5 mg/mL',indication:'Sedierung, Krampfdurchbrechung, wenn kein Midazolam verfuegbar',notes:'Quelle: Kleinnager-Formularien (analog zur Rennmausdosis 5 mg/kg IM/IP nach Quesenberry/Carpenter).',caution:'Propylenglykol-Traeger reizt bei IM-Gabe stark - Midazolam ist beim Kleinnager klar vorzuziehen. Nicht mit anderen Substanzen in einer Spritze mischen (faellt aus).'},
        hund:{low:0.2,high:0.5,unit:'mg/kg',route:'langsam IV',conc:'5 mg/mL',indication:'Krampf/Ko-Induktion',notes:'Nicht IM (unregelmäßige Resorption). Nicht mit wässrigen Lösungen mischen.',caution:''},
        katze:{low:0.2,high:0.5,unit:'mg/kg',route:'IV',conc:'5 mg/mL',indication:'Krampf',notes:'',caution:'Orales Diazepam → Lebernekrose (Katze) – nicht chronisch oral.'}
      }},
    { id:'acepromazin', name:'Acepromazin', icon:'🌀', cls:'Phenothiazin-Sedativum', aliases:['acp'],
      sources:['Plumb’s'],
      species:{
        hund:{low:0.01,high:0.05,unit:'mg/kg',route:'IV/IM',conc:'10 mg/mL',indication:'Sedation/Prämed',notes:'Max-Gesamtdosis ~3 mg. Kein Antidot, keine Analgesie. Nach Magergewicht dosieren.',caution:'Hypotension (α-Block); nicht bei Schock/Hypovolämie/Kollaps/Anämie. Rassesensibilität: MDR1/ABCB1-Hütehunde (Collie ~70 %, Aussie, Sheltie, Border/Old English) ~25 % reduzieren & eng überwachen; Boxer & brachyzephal → vagale Bradykardie/Synkope, 0,01–0,025 mg/kg; Sighthounds/Riesenrassen niedriger (0,02–0,03 bzw. 0,01–0,025 mg/kg).'},
        katze:{low:0.02,high:0.05,unit:'mg/kg',route:'IV/IM',conc:'10 mg/mL',indication:'Sedation',notes:'',caution:'Hypotension.'}
      }},
    { id:'methadon', name:'Methadon', icon:'💊', cls:'Opioid (µ-Agonist)',
      sources:['Plumb’s','WSAVA Pain'],
      species:{
        hund:{low:0.1,high:0.5,unit:'mg/kg',route:'IV/IM',conc:'10 mg/mL',indication:'Analgesie/Prämed',notes:'Gute intraop. Analgesie; NMDA-Effekt. Antagonist Naloxon.',caution:'Atemdepression, Bradykardie.'},
        katze:{low:0.1,high:0.5,unit:'mg/kg',route:'IV/IM/OTM',conc:'10 mg/mL',indication:'Analgesie',notes:'IM/Prämed 0,3–0,6 mg/kg (EU-Zulassung), IV niedriger (0,1–0,3). Gut verträglich bei Katze.',caution:''},
        kaninchen:{low:0.3,high:0.5,unit:'mg/kg',route:'SC/IM',conc:'10 mg/mL',indication:'Analgesie',notes:'',caution:''}
      }},
    { id:'polamivet', name:'Polamivet (L-Methadon + Fenpipramid)', icon:'💊', cls:'Opioid-Kombination',
      sources:['Fachinfo Polamivet'],
      species:{
        hund:{low:0.25,high:1,unit:'mg/kg',route:'IV/IM/SC',conc:'L-Methadon 2.5 mg/mL',indication:'Analgesie/Prämed (Hund)',notes:'Dosis als L-Methadon-Anteil (SPC 0,25–1 mg/kg, immer mit Sedativum – allein Exzitation). Fenpipramid = Parasympatholytikum-Zusatz. L-Methadon ≈ 2× Potenz von razem. Methadon – NICHT mit der Methadon-Zeile gleichsetzen.',caution:'Beim Hund zugelassen; Atemdepression/Bradykardie.'},
        katze:{low:null,high:null,unit:'mg/kg',route:'',conc:'',indication:'',notes:'',caution:'In DE/CH i.d.R. nicht für die Katze empfohlen – Fachinfo prüfen; alternativ reines Methadon.'}
      }},
    { id:'buprenorphin', name:'Buprenorphin', icon:'💊', cls:'Opioid (Partialagonist)',
      sources:['Plumb’s','WSAVA Pain'],
      species:{
        maus:{low:0.05,high:0.1,unit:'mg/kg',route:'SC',conc:'0.03 mg/mL (aus 0.3 mg/mL verduennt)',indication:'Standardanalgetikum peri- und postoperativ',notes:'Quelle: Ohio State (0,1 mg/kg SC q4-8h), Illinois ACS (0,01-0,1 mg/kg SC q6-12h). Wirkdauer bei der Maus nur 3-5 h (Ratte 6-8 h). Depot: Ethiqa XR 3,25 mg/kg SC q72h, compounded ER 1 mg/kg SC q48h.',caution:'Kuerzere Wirkung als bei der Ratte - fruehere Nachdosierung. Antagonist Naloxon.'},
        ratte:{low:0.05,high:0.1,unit:'mg/kg',route:'SC (auch IP/IV)',conc:'0.03 mg/mL (aus 0.3 mg/mL verduennt)',indication:'Standardanalgetikum peri- und postoperativ',notes:'Quelle: UW-Madison RARC (0,05-0,1 mg/kg SC, Wirkdauer 6-8 h), Ohio State (0,05 mg/kg SC q6-8h), Illinois ACS (0,01-0,05 mg/kg q6-12h). Depotformen: Ethiqa XR 0,65 mg/kg SC q72h, compounded ER 1,2 mg/kg SC q48h.',caution:'Bei der Ratte dosisabhaengig Pica (Streu-/Kotfressen) beschrieben. Antagonisierbar mit Naloxon, dann aber auch Analgesie weg.'},
        rennmaus:{low:0.05,high:0.1,unit:'mg/kg',route:'SC/IM alle 8-12 h',conc:'0,3 mg/mL',indication:'Perioperative Analgesie (Duftdruesenexzision, Ovariektomie, Schwanzamputation)',notes:'Quelle: Kleinnager-Standard aus Versuchstier-Formularien; multimodales Schema aus der Nagerpraxis: Buprenorphin praeoperativ + Lidocain/Bupivacain lokal + Meloxicam postoperativ.',caution:'Verduennen. Schmerz ist bei der Rennmaus selbst ein Krampfausloeser - eine unterdosierte Analgesie ist hier nicht nur ein Tierschutz-, sondern ein Anfallsproblem.'},
        hamster:{low:0.05,high:0.1,unit:'mg/kg',route:'SC/IM alle 8-12 h',conc:'0,3 mg/mL',indication:'Perioperative Analgesie, Praemedikation 30 min vor Schnitt (spart Isofluran)',notes:'Quelle: Kleinnager-Standard aus Versuchstier-Formularien (0,05-0,1 mg/kg SC q8-12h); Exotic-Anaesthesie-Kapitel nennt fuer Nager 0,05-0,5 mg/kg SC. Buprenorphin 30 min praeoperativ senkt beim Nager den Isofluranbedarf um 0,25-0,5 %.',caution:'Bei 0,3 mg/mL und 100 g Hamster sind 0,05 mg/kg = 0,017 mL - verduennen. Ceiling-Effekt, mit Butorphanol nicht kombinierbar (Konkurrenz am Rezeptor). Kann Futteraufnahme daempfen - Gewicht kontrollieren.'},
        hund:{low:0.01,high:0.03,unit:'mg/kg',route:'IV/IM',conc:'0.3 mg/mL',indication:'Mild-mäßige Analgesie',notes:'Wirkeintritt langsam (30–45 min), Dauer 6–8 h.',caution:'Nur teilweise mit Naloxon antagonisierbar.'},
        katze:{low:0.02,high:0.03,unit:'mg/kg',route:'IV/IM/OTM',conc:'0.3 mg/mL',indication:'Analgesie',notes:'OTM (bukkal) bei Katze gut wirksam.',caution:''},
        kaninchen:{low:0.03,high:0.05,unit:'mg/kg',route:'SC/IV',conc:'0.3 mg/mL',indication:'Analgesie',notes:'',caution:''},
        meerschwein:{low:0.03,high:0.05,unit:'mg/kg',route:'SC',conc:'0.3 mg/mL',indication:'Analgesie',notes:'',caution:''}
      }},
    { id:'butorphanol', name:'Butorphanol', icon:'💊', cls:'Opioid (κ-Agonist/µ-Antag.)',
      sources:['Plumb’s'],
      species:{
        maus:{low:1,high:5,unit:'mg/kg',route:'SC/IP',conc:'1 mg/mL (aus 10 mg/mL verduennt)',indication:'Kurze viszerale Analgesie',notes:'Quelle: Vergleichsstudie Morphin/Butorphanol/Buprenorphin bei Ratte und Maus - Maus 5,0 mg/kg, Analgesie 1-2 h (schwaechster und kuerzester Effekt der drei).',caution:'Alle 2-4 h nachdosieren; fuer chirurgischen Schmerz allein nicht ausreichend.'},
        ratte:{low:1,high:2,unit:'mg/kg',route:'SC/IP',conc:'1 mg/mL (aus 10 mg/mL verduennt)',indication:'Kurze viszerale Analgesie, Sedationspartner',notes:'Quelle: Vergleichsstudie Morphin/Butorphanol/Buprenorphin bei Ratte und Maus (Ratte 2,0 mg/kg); Vet Clin North Am Exot Anim Pract 2,0 mg/kg SC/IP.',caution:'Kuerzeste und schwaechste Analgesie der drei Opioide (1-2 h) - fuer chirurgischen Schmerz allein nicht ausreichend, alle 2-4 h nachdosieren.'},
        rennmaus:{low:1,high:5,unit:'mg/kg',route:'SC/IM alle 2-4 h',conc:'10 mg/mL',indication:'Kurzanalgesie, Sedierungskomponente mit Midazolam',notes:'Quelle: Versuchstier-Formularien fuer Hamster/Rennmaus 1-5 mg/kg SC q2-4h.',caution:'Kurze Wirkdauer, fuer postoperative Analgesie auf Buprenorphin/Meloxicam umstellen.'},
        hamster:{low:1,high:5,unit:'mg/kg',route:'SC/IM alle 2-4 h',conc:'10 mg/mL',indication:'Kurzanalgesie, Sedierungskomponente; Bestandteil der MMB-Mischung (2,5 mg/kg IM)',notes:'Quelle: Versuchstier-Formularien fuer Hamster und Rennmaus 1-5 mg/kg SC q2-4h; Nakamura et al. 2017 - 2,5 mg/kg IM in der validierten MMB-Mischung.',caution:'Sehr kurze Wirkdauer - als alleinige postoperative Analgesie ungeeignet. Nicht mit Buprenorphin kombinieren. Antagonisierbar mit Naloxon.'},
        hund:{low:0.1,high:0.4,unit:'mg/kg',route:'IV/IM',conc:'10 mg/mL',indication:'Sedation/milde Analgesie',notes:'Kurze Wirkdauer (~1 h); gut für Sedationskombis.',caution:'Schwache Analgesie – nicht für starke Schmerzen.'},
        katze:{low:0.1,high:0.4,unit:'mg/kg',route:'IV/IM',conc:'10 mg/mL',indication:'Sedation',notes:'',caution:''},
        kaninchen:{low:0.1,high:0.5,unit:'mg/kg',route:'SC/IM',conc:'10 mg/mL',indication:'Sedation/Analgesie',notes:'',caution:''},
        meerschwein:{low:0.2,high:2,unit:'mg/kg',route:'SC',conc:'10 mg/mL',indication:'Analgesie',notes:'',caution:''}
      }},
    { id:'fentanyl', name:'Fentanyl', icon:'💊', cls:'Opioid (µ, kurz)',
      sources:['Plumb’s','ACVAA'],
      species:{
        maus:{low:25,high:50,unit:'mcg/kg',route:'SC/IP (als Teil der MMF-Kombination)',conc:'0.05 mg/mL (50 mcg/mL), fuer die Maus 1:',indication:'Analgetische Komponente der vollstaendig antagonisierbaren Injektionsnarkose',notes:'Quelle: MMF-Maus 0,05 mg/kg = 50 mcg/kg (Fleischmann, Lab Anim 2016); niedriger dosiertes Schema 25 mcg/kg IP.',caution:'Starke Atemdepression, bei der Maus regelmaessig Hypoxie ohne Sauerstoffvorlage. Bei maennlichen C57BL/6 ist nach Fentanyl-Midazolam-Medetomidin eine akute obstruktive Uropathie beschrieben - Blase nach der Narkose kontrollieren. Antagonist'},
        ratte:{low:5,high:10,unit:'mcg/kg',route:'SC/IP (als Teil der MMF-Kombination)',conc:'0.05 mg/mL (50 mcg/mL), fuer die Ratte 1',indication:'Analgetische Komponente der vollstaendig antagonisierbaren Injektionsnarkose',notes:'Quelle: MMF-Protokoll Ratte 0,005 mg/kg = 5 mcg/kg (Albrecht BMC Vet Res 2014; GV-SOLAS-Schema).',caution:'Starke Atemdepression - nur mit Sauerstoffvorlage. Antagonist Naloxon 0,12 mg/kg SC; damit faellt aber auch die Analgesie weg, deshalb vorher ein NSAID oder Buprenorphin geben.'},
        hund:{low:2,high:5,unit:'mcg/kg',route:'IV Bolus',conc:'0.05 mg/mL (50 µg/mL)',indication:'Intraop. Analgesie',notes:'Danach CRI: intraop ~10–40 µg/kg/h (MAC-sparend; 0,17–0,7 µg/kg/min), postop/leicht 3–10 µg/kg/h. ~20–45 min vor Extubation reduzieren (Dysphorie/Bradykardie). Sehr kurz als Bolus.',caution:'Atemdepression/Bradykardie – Beatmung bereithalten.'},
        katze:{low:1,high:3,unit:'mcg/kg',route:'IV Bolus',conc:'0.05 mg/mL',indication:'Analgesie',notes:'CRI 2–5 µg/kg/h.',caution:'Bei der Katze niedriger dosieren als beim Hund (1–3 µg/kg). Atemdepression und Bradykardie — Beatmung und Anticholinergikum bereithalten. Nicht mit einem zweiten µ-Agonisten stapeln.'}
      }},
    { id:'morphin', name:'Morphin', icon:'💊', cls:'Opioid (µ-Agonist)',
      sources:['Plumb’s'],
      species:{
        maus:{low:2,high:10,unit:'mg/kg',route:'SC',conc:'1 mg/mL (aus 10 mg/mL verduennt)',indication:'Starker akuter Schmerz',notes:'Quelle: Vergleichsstudie Morphin/Butorphanol/Buprenorphin (10 mg/kg bei Maus; hoechster analgetischer Effekt, Dauer 2-3 h).',caution:'Atemdepression. Kurze Wirkdauer. Antagonist Naloxon.'},
        ratte:{low:2,high:10,unit:'mg/kg',route:'SC/IM',conc:'10 mg/mL',indication:'Starker akuter Schmerz',notes:'Quelle: Vergleichsstudie Morphin/Butorphanol/Buprenorphin (10 mg/kg bei Ratte und Maus; hoechster analgetischer Effekt, Dauer 2-3 h). Klinisch werden 2-5 mg/kg SC q4h eingesetzt.',caution:'Atemdepression, Ileusneigung. Kurze Wirkdauer erzwingt haeufiges Nachdosieren - fuer die Praxis ist Buprenorphin meist die bessere Wahl. Antagonist Naloxon.'},
        hund:{low:0.1,high:0.5,unit:'mg/kg',route:'IM/langsam IV',conc:'10 mg/mL',indication:'Analgesie',notes:'Langsam IV (Histaminfreisetzung).',caution:'Erbrechen; Bradykardie.'},
        katze:{low:0.1,high:0.2,unit:'mg/kg',route:'IM',conc:'10 mg/mL',indication:'Analgesie',notes:'Niedriger dosieren.',caution:'Exzitation bei Überdosis.'}
      }},
    { id:'naloxon', name:'Naloxon', icon:'🔄', cls:'Opioid-Antagonist',
      sources:['Plumb’s','RECOVER'],
      species:{
        maus:{low:0.1,high:1.2,unit:'mg/kg',route:'SC',conc:'0.04 mg/mL (aus 0.4 mg/mL verduennt)',indication:'Opioidantagonist, Bestandteil der AFN-Antagonisierung',notes:'Quelle: AFN-Antagonisierung Maus - 0,3 mg/kg SC zum niedrig dosierten MMF (Fentanyl 25 mcg/kg); zum hoeher dosierten MMF (Fentanyl 50 mcg/kg) wird 1,2 mg/kg SC verwendet. Antagonistendosis skaliert mit der Agonistendosis.',caution:'Hebt die Analgesie vollstaendig auf - vorher Meloxicam oder Buprenorphin. Kuerzere Halbwertszeit als Fentanyl, Nachschlafen moeglich.'},
        ratte:{low:0.1,high:0.2,unit:'mg/kg',route:'SC/IV/IP',conc:'0.04 mg/mL (aus 0.4 mg/mL verduennt)',indication:'Opioidantagonist bei Apnoe, Bestandteil der AFN-Antagonisierung',notes:'Quelle: AFN-Antagonisierung Ratte 0,12 mg/kg SC (MMF-Protokoll); experimentell 0,1 mg/kg IV volle Erholung in 11,4 min, 0,2 mg/kg in 4,8 min.',caution:'Kuerzere Halbwertszeit als die meisten Opioide - Nachschlafen moeglich, Tier weiter ueberwachen. Hebt die Analgesie vollstaendig auf.'},
        rennmaus:{low:0.01,high:0.1,unit:'mg/kg',route:'IV/IO/IM/SC',conc:'0,4 mg/mL',indication:'Opioid-Ueberhang mit Atemdepression',notes:'EXTRAPOLIERT aus Kleinsaeuger-/Exotenempfehlungen. Keine Rennmausdaten.',caution:'Extrapoliert. Analgesieverlust und akuter Schmerz koennen bei dieser Art einen Anfall ausloesen - nur bei echter Atemdepression einsetzen, nicht zur Beschleunigung des Aufwachens.'},
        hamster:{low:0.01,high:0.1,unit:'mg/kg',route:'IV/IO/IM/SC',conc:'0,4 mg/mL',indication:'Opioid-Ueberhang mit Apnoe/schwerer Atemdepression',notes:'EXTRAPOLIERT aus Kleinsaeuger-/Exotenempfehlungen (0,01-0,1 mg/kg). Keine hamsterspezifische Studie.',caution:'Extrapoliert. Hebt auch die Analgesie auf - danach sofort NSAID/Lokalanaesthesie nachlegen. Wirkdauer kuerzer als die von Buprenorphin, Rebound moeglich, Tier nachbeobachten. Gegen Buprenorphin wirkt Naloxon nur bedingt und nur in hoher Dos'},
        hund:{low:0.01,high:0.04,unit:'mg/kg',route:'IV/IM/IO',conc:'0.4 mg/mL',indication:'Opioid-Überhang/Atemdepression',notes:'Titrieren; kurze Wirkung → ggf. wiederholen/CRI. Verdünnen für Titration.',caution:'Hebt auch Analgesie auf; akute Schmerzen/Aufregung.'},
        katze:{low:0.01,high:0.04,unit:'mg/kg',route:'IV/IM',conc:'0.4 mg/mL',indication:'Opioid-Antagonisierung',notes:'',caution:''},
        kaninchen:{low:0.01,high:0.1,unit:'mg/kg',route:'IV/IM',conc:'0.4 mg/mL',indication:'Antagonisierung',notes:'',caution:''}
      }},
    { id:'atipamezol', name:'Atipamezol', icon:'🔄', cls:'Alpha-2-Antagonist', aliases:['antisedan'],
      sources:['Plumb’s'],
      species:{
        maus:{low:1,high:2.5,unit:'mg/kg',route:'SC/IP',conc:'0.5 mg/mL (aus 5 mg/mL verduennt)',indication:'Antagonist von Xylazin, Medetomidin, Dexmedetomidin',notes:'Quelle: AFN-Antagonisierung Maus 1,0 mg/kg SC (zu Medetomidin 0,2 mg/kg) bzw. 2,5 mg/kg (zu Medetomidin 0,5 mg/kg); Ohio State nennt allgemein 0,5-2 mg/kg IP/SC, Queen’s SOP 0,1-5,0 mg/kg SC/IP. Faustregel: 5-faches der Medetomidin-mg-Dosis.',caution:'Antagonisiert auch die Analgesie. Blutdruckabfall kurz nach Gabe; Maus warm halten, sonst Auskuehlung im Aufwachen.'},
        ratte:{low:0.5,high:1,unit:'mg/kg',route:'SC/IP/IM',conc:'0.5 mg/mL (aus 5 mg/mL verduennt)',indication:'Antagonist von Xylazin, Medetomidin und Dexmedetomidin',notes:'Quelle: Ohio State (0,5-2 mg/kg IP/SC), AFN-Antagonisierung Ratte 0,75 mg/kg SC. Faustregel: das 5-fache der Medetomidin-mg-Dosis.',caution:'Antagonisiert auch die Analgesie des Alpha-2-Agonisten - vorher Analgetikum geben. Nach Gabe faellt der Blutdruck innerhalb weniger Minuten deutlich ab, Tier warm und ruhig halten.'},
        rennmaus:{low:0.5,high:1,unit:'mg/kg',route:'SC/IM',conc:'5 mg/mL (verduennen)',indication:'Antagonisierung von Medetomidin/Dexmedetomidin/Xylazin',notes:'Quelle: universitaere Versuchstier-Formularien fuer die Rennmaus - Atipamezol 0,5 mg/kg SC zur Umkehr von Dexmedetomidin; allgemein 5-fache Dexmedetomidin-Menge.',caution:'Analgesieverlust - Schmerz kann bei dieser Art einen Anfall triggern. Erst Analgesie sichern, dann antagonisieren. Waermezufuhr weiterlaufen lassen.'},
        hamster:{low:0.15,high:1,unit:'mg/kg',route:'SC/IM (IV nur im Notfall, langsam)',conc:'0,5 mg/mL (aus 5 mg/mL verduennt)',indication:'Antagonisierung von Medetomidin/Dexmedetomidin/Xylazin; Notfallmassnahme bei Alpha-2-bedin',notes:'Quelle: Nakamura et al., J Vet Med Sci 2017 - 0,15 mg/kg Atipamezol (dieselbe mg-Menge wie Medetomidin) liess Hamster rasch aufwachen und normalisierte auch die anaesthesiebedingte Hyperglykaemie/Insulinstoerung innerhalb von ~10 min. Faustregel sonst: 5-fache mg-Menge des gegebe',caution:'Zu schnelle IV-Gabe verursacht Tachykardie, Erregung und Blutdruckabfall - SC/IM bevorzugen. Hebt auch die Analgesie des Alpha-2 auf: vorher Buprenorphin/Meloxicam geben. Waermezufuhr nach Antagonisierung fortsetzen, sonst kuehlt das erwach'},
        hund:{low:0.05,high:0.2,unit:'mg/kg',route:'IM',conc:'5 mg/mL',indication:'Umkehr Medetomidin/Dexmed.',notes:'Faustregel: gleiches Volumen wie das gegebene Domitor/Dexdomitor (Antisedan 5 mg/mL) = 5× Medetomidin-µg = 10× Dexmedetomidin-µg. Katze: HALBES Volumen. IM, nicht IV (außer Notfall langsam).',caution:'Nicht < 30–40 min nach Ketamin (Exzitation/Krämpfe). Rasche Erweckung; Vasodilatation/Hypotension bei IV.'},
        katze:{low:0.025,high:0.1,unit:'mg/kg',route:'IM',conc:'5 mg/mL',indication:'Umkehr α2',notes:'',caution:'Bei der Katze etwa halbes Volumen. Nach der Umkehr faellt der Blutdruck ab und die Analgesie des α2 endet — Schmerzmittel bereithalten. Nicht bei Hypovolaemie ohne Volumenersatz.'},
        kaninchen:{low:0.1,high:1,unit:'mg/kg',route:'IM/SC',conc:'5 mg/mL',indication:'Umkehr α2',notes:'',caution:''}
      }},
    { id:'flumazenil', name:'Flumazenil', icon:'🔄', cls:'Benzodiazepin-Antagonist',
      sources:['Plumb’s'],
      species:{
        maus:{low:0.1,high:0.5,unit:'mg/kg',route:'SC',conc:'0.1 mg/mL',indication:'Benzodiazepin-Antagonist, Bestandteil der AFN-Antagonisierung',notes:'Quelle: AFN-Antagonisierung Maus 0,1 mg/kg SC (zu Midazolam 1 mg/kg) bzw. 0,5 mg/kg (zu Midazolam 5 mg/kg).',caution:'Kurze Wirkdauer, Resedierung moeglich. Nur im AFN-Verbund sinnvoll.'},
        ratte:{low:0.1,high:0.2,unit:'mg/kg',route:'SC/IV',conc:'0.1 mg/mL',indication:'Benzodiazepin-Antagonist, Bestandteil der AFN-Antagonisierung',notes:'Quelle: AFN-Antagonisierung Ratte 0,2 mg/kg SC (MMF-Protokoll, GV-SOLAS-Schema).',caution:'Kurze Wirkdauer, Resedierung moeglich. Nur zusammen mit Atipamezol und Naloxon sinnvoll, wenn MMF antagonisiert wird.'},
        rennmaus:{low:0.05,high:0.1,unit:'mg/kg',route:'IV/IO/IM',conc:'0,1 mg/mL',indication:'Benzodiazepin-Ueberhang',notes:'EXTRAPOLIERT aus Kleinsaeugerempfehlungen. Keine Rennmausdaten.',caution:'Extrapoliert. ACHTUNG bei dieser Art: Flumazenil hebt den antikonvulsiven Schutz des Midazolams auf und kann bei krampfneigenden Zuchtlinien einen Anfall demaskieren. Nur bei echter Atemdepression.'},
        hamster:{low:0.05,high:0.1,unit:'mg/kg',route:'IV/IO/IM',conc:'0,1 mg/mL',indication:'Benzodiazepin-Ueberhang (Midazolam/Diazepam)',notes:'EXTRAPOLIERT aus Kleinsaeugerempfehlungen (0,05-0,1 mg/kg). Keine hamsterspezifische Studie; in der MMB-Studie wurde nur Atipamezol untersucht und reichte fuer das Aufwachen aus.',caution:'Extrapoliert. Kurze Wirkdauer, Resedierung moeglich. Bei Mischnarkosen zuerst Atipamezol geben - oft ist Flumazenil dann gar nicht noetig.'},
        hund:{low:0.01,high:0.01,unit:'mg/kg',route:'IV',conc:'0.1 mg/mL',indication:'Umkehr Midazolam/Diazepam',notes:'Titrieren; kurze Wirkung.',caution:''},
        katze:{low:0.01,high:0.01,unit:'mg/kg',route:'IV',conc:'0.1 mg/mL',indication:'Umkehr Benzo',notes:'',caution:''}
      }},
    { id:'meloxicam', name:'Meloxicam', icon:'🌡️', cls:'NSAID',
      sources:['Plumb’s','WSAVA'],
      species:{
        maus:{low:5,high:5,unit:'mg/kg',route:'SC/PO',conc:'5 mg/mL (Injektion) bzw. 1.5 mg/mL (Susp',indication:'Perioperative und chronische Analgesie',notes:'Quelle: Ohio State (5 mg/kg SC q12h bzw. PO q24h), Illinois ACS (5 mg/kg SC q24h). Die Maus braucht deutlich mehr mg/kg als die Ratte (dort 1-2 mg/kg).',caution:'Nicht bei Dehydratation, Hypotension oder Nierenschaden. Nicht mit einem zweiten NSAID oder mit Dexamethason kombinieren.'},
        ratte:{low:1,high:2,unit:'mg/kg',route:'SC/PO',conc:'5 mg/mL (Injektion) bzw. 1.5 mg/mL (Susp',indication:'Perioperative und chronische Analgesie, Entzuendung',notes:'Quelle: Ohio State (2 mg/kg SC/PO q24h), UW-Madison RARC (1 mg/kg SC q12-24h), Illinois ACS (1-2 mg/kg SC q24h).',caution:'Bei chronischer Nierenerkrankung - bei alten Ratten sehr haeufig - Dosis reduzieren oder meiden, immer erst Volumenstatus sichern. Nicht bei Hypotension geben.'},
        rennmaus:{low:1,high:2,unit:'mg/kg',route:'SC/PO alle 24 h',conc:'5 mg/mL bzw. 1,5 mg/mL',indication:'Postoperative Analgesie',notes:'Quelle: universitaere Versuchstier-Formularien fuer die Rennmaus - Meloxicam 2 mg/kg Ladedosis, dann 1 mg/kg q24h.',caution:'Chronische Glomerulonephropathie ist bei aelteren Rennmaeusen haeufig - bei Tieren ueber ca. 2 Jahren nur nach Nierenwertkontrolle und mit Fluessigkeitsunterstuetzung. Nie am dehydrierten Tier.'},
        hamster:{low:1,high:2,unit:'mg/kg',route:'SC/PO alle 24 h',conc:'5 mg/mL (Injektion) bzw. 1,5 mg/mL (Susp',indication:'Postoperative und entzuendliche Analgesie; Basisanalgetikum nach jedem Eingriff',notes:'Quelle: Kleinnager-Standard aus Versuchstier-Formularien (Ladedosis 2 mg/kg, dann 1 mg/kg q24h); in der Nagerpraxis Teil des multimodalen Schemas mit Buprenorphin und Lokalanaesthesie.',caution:'Erst nach gesichertem Volumenstatus geben - beim dehydrierten oder hypotensiven Tier Nierenschaden. Beim alten Goldhamster mit Amyloidose/Niereninsuffizienz Dosis halbieren oder verzichten. Injektionsloesung 5 mg/mL bei 40 g Zwerghamster ve'},
        hund:{low:0.1,high:0.2,unit:'mg/kg',route:'SC/IV/PO',conc:'5 mg/mL (Inj.)',indication:'Perioperative Analgesie',notes:'Erstgabe 0.2, dann 0.1 mg/kg/Tag. Nur bei normovolämem, normotensivem Patienten.',caution:'NIE bei Hypotension/Hypovolämie/Nieren-/GI-Erkrankung; nicht mit anderen NSAID/Kortison.'},
        katze:{low:0.1,high:0.2,unit:'mg/kg',route:'SC',conc:'5 mg/mL',indication:'Analgesie (Einmalgabe)',notes:'Perioperativ 0.2 mg/kg einmalig; Folgegaben nur streng nach Fachinfo.',caution:'Katze NSAID-empfindlich – nur normovoläm/normoton, nicht wiederholt ohne Kontrolle.'},
        kaninchen:{low:0.5,high:1,unit:'mg/kg',route:'SC/PO',conc:'5 mg/mL',indication:'Analgesie',notes:'Chirurgisch/periop. Ziel ~1 mg/kg q24h (kurzfristig bis 1,5); 0,3 mg/kg nur für langfristig/renal reduziert – subtherapeutisch für akuten OP-Schmerz. Kaninchen brauchen höhere mg/kg.',caution:''}
      }},
    { id:'carprofen', name:'Carprofen', icon:'🌡️', cls:'NSAID',
      sources:['Plumb’s'],
      species:{
        maus:{low:5,high:10,unit:'mg/kg',route:'SC',conc:'5 mg/mL (aus 50 mg/mL verduennt)',indication:'Perioperative Analgesie',notes:'Quelle: Ohio State - 5 mg/kg SC q12-24h bzw. 5 mg/kg/Tag ueber Trinkwasser. Einzelne Universitaetsformulare nennen deutlich hoehere Werte; hier bewusst der konservative, mehrfach bestaetigte Bereich.',caution:'Gleiche NSAID-Vorbehalte. Bei 25 g Maus unbedingt verduennen.'},
        ratte:{low:5,high:5,unit:'mg/kg',route:'SC',conc:'5 mg/mL (aus 50 mg/mL verduennt)',indication:'Perioperative Analgesie',notes:'Quelle: Ohio State und UW-Madison RARC uebereinstimmend 5 mg/kg SC q24h; auch 5 mg/kg/Tag ueber Trinkwasser beschrieben.',caution:'Gleiche Nierenvorbehalte wie Meloxicam. Nicht mit einem zweiten NSAID kombinieren.'},
        rennmaus:{low:5,high:10,unit:'mg/kg',route:'SC/PO alle 12-24 h',conc:'50 mg/mL (verduennen)',indication:'Alternative zu Meloxicam',notes:'Quelle: Kleinnager-Formularien, aus Ratte/Chinchilla uebertragen. Keine Rennmausdaten.',caution:'Verduennen. Bei Nierenerkrankung meiden. Nicht mit Meloxicam kombinieren.'},
        hamster:{low:5,high:10,unit:'mg/kg',route:'SC/PO alle 12-24 h',conc:'50 mg/mL (stark verduennen)',indication:'Alternative zu Meloxicam bei postoperativer Analgesie',notes:'Quelle: Kleinnager-Formularien (Ratte 5-10 mg/kg PO/SC q24h; Chinchilla 4 mg/kg SC q24h). Keine hamsterspezifische Studie.',caution:'50 mg/mL sind fuer einen 100-g-Hamster nicht direkt dosierbar - auf 5 mg/mL verduennen. Gleiche Nieren-/GI-Vorbehalte wie Meloxicam. Nicht mit Meloxicam kombinieren.'},
        hund:{low:2,high:4,unit:'mg/kg',route:'SC/IV',conc:'50 mg/mL',indication:'Perioperative Analgesie',notes:'4 mg/kg einmalig oder 2 mg/kg 2×/Tag.',caution:'Wie NSAID: nur normovoläm/normoton.'},
        katze:{low:2,high:4,unit:'mg/kg',route:'SC',conc:'50 mg/mL',indication:'Analgesie (Einmalgabe)',notes:'Einmalig perioperativ.',caution:'Katze: nicht wiederholen ohne strenge Indikation.'}
      }},
    { id:'metamizol', name:'Metamizol (Dipyron)', icon:'🌡️', cls:'Nicht-Opioid-Analgetikum', aliases:['novaminsulfon','novalgin'],
      sources:['Plumb’s','Fachinfo'],
      species:{
        hund:{low:20,high:50,unit:'mg/kg',route:'langsam IV/SC/PO',conc:'500 mg/mL',indication:'Analgesie/Spasmolyse/Antipyrese',notes:'IV sehr langsam (Blutdruckabfall). 2–3×/Tag.',caution:'Schnelle IV-Gabe → Hypotension/Kollaps.'},
        katze:{low:20,high:25,unit:'mg/kg',route:'langsam IV/SC',conc:'500 mg/mL',indication:'Analgesie',notes:'Vorsichtiger dosieren/Intervall.',caution:'Fachinfo beachten – zurückhaltend bei Katze.'}
      }},
    { id:'robenacoxib', name:'Robenacoxib', icon:'🌡️', cls:'NSAID (COX-2)', aliases:['onsior'],
      sources:['Fachinfo Onsior'],
      species:{
        hund:{low:1,high:2,unit:'mg/kg',route:'SC',conc:'20 mg/mL',indication:'Perioperative Analgesie',notes:'',caution:'NSAID-Kautelen wie Meloxicam.'},
        katze:{low:1,high:2,unit:'mg/kg',route:'SC',conc:'20 mg/mL',indication:'Analgesie',notes:'Für Katze zugelassen.',caution:''}
      }}
  ],

  /* =================== ZWISCHENFÄLLE =================== */
  incidents: [
    { id:'bradykardie', name:'Bradykardie', icon:'💗', cls:'Kreislauf', color:'#66a6ff', tag:'HF ↓', short:'Herzfrequenz zu niedrig',
      thresholds:{ hund:'HF < 60–70/min', katze:'HF < 100/min', kaninchen:'HF < 120/min', meerschwein:'HF < 150/min', reptil:'temperatur-/speziesabhängig, Trend beachten', all:'HF unter arttypischem Normbereich mit Hypotension' },
      causes:['Zu tiefe Narkose (Iso ↑)','Vagaler Reiz (Augen/Zug/Larynx)','Opioide, α2-Agonisten','Hypothermie','Hypoxie (spät → präterminal)','Hyperkaliämie'],
      steps:['Narkosetiefe prüfen – Isofluran reduzieren.','O₂ auf 100 % erhöhen, Ventilation/Tubuslage prüfen.','Chirurgischen Reiz stoppen lassen (Zug/Vagusreiz).','Ursache behandeln: Wärme bei Hypothermie.','Bei vagaler/absoluter Bradykardie + Hypotension: Anticholinergikum.','α2-bedingt: Dexmed/Med reduzieren, ggf. Atipamezol; opioidbedingt Dosis bedenken.'],
      machine:'Isofluran senken (z.B. −0.5 Vol%); O₂-Fluss/FiO₂ 100 %; bei Hypoventilation auf IPPV/Manual umschalten.',
      drugs:[ {id:'atropin',low:0.02,high:0.04,unit:'mg/kg',route:'IV',note:'Erste Wahl bei vagaler Bradykardie.'},
              {id:'glyco',low:0.005,high:0.01,unit:'mg/kg',route:'IV',note:'Alternative, längere Wirkung.'} ],
      speciesNotes:{ kaninchen:'Glycopyrrolat bevorzugen (Atropinesterase). Stress minimieren.', reptil:'Zuerst Körpertemperatur/POTZ prüfen – „Bradykardie" oft temperaturbedingt.' },
      red:['Bradykardie + Hypotension ist ein Warnsignal – rasch handeln','HF-Abfall spät bei Hypoxie = präterminal → CPR-Bereitschaft','AV-Block II° Mobitz II und III° sind infranodal — Atropin einmalig als Test, bei Nichtansprechen NICHT nachdosieren; Dopamin 5–10 µg/kg/min als Dauertropf und Bereitschaft zum Pacing'] },

    { id:'tachykardie', name:'Tachykardie', icon:'💓', cls:'Kreislauf', color:'#ff8c6b', tag:'HF ↑', short:'Herzfrequenz zu hoch',
      thresholds:{ hund:'HF > 160–180/min', katze:'HF > 200/min', kaninchen:'HF > 300/min', all:'anhaltend über arttypischem Bereich' },
      causes:['Zu flache Narkose / Schmerz','Hypovolämie / Blutverlust','Hyperkapnie / Hypoxie','Hyperthermie','Anticholinergika, Katecholamine, Ketamin','ventrikuläre Arrhythmie'],
      steps:['Narkosetiefe + Analgesie prüfen – bei Schmerz Opioid geben.','Volumenstatus prüfen: Blutverlust? → Kristalloid-Bolus.','Kapnografie/SpO₂ prüfen (Hyperkapnie/Hypoxie).','Temperatur prüfen (Hyperthermie).','EKG: Sinustachykardie vs. ventrikuläre Tachykardie unterscheiden.','Bei anhaltender VT mit Auswirkung: Lidocain (Hund).'],
      machine:'Bei Hyperkapnie Ventilation erhöhen (AF/AZV, IPPV); Iso ggf. anpassen; O₂ 100 %.',
      drugs:[ {id:'fentanyl',low:null,high:null,unit:'mcg/kg',route:'IV',note:'Wenn Ursache Schmerz oder zu flache Narkose. Katze niedriger als Hund.'},
              {id:'methadon',low:0.1,high:0.3,unit:'mg/kg',route:'IV',note:'Analgesie-Alternative.'},
              {id:'lidocain_iv',low:null,high:null,unit:'mg/kg',route:'langsam IV',note:'HUND: 2 mg/kg über 1–2 min, alle 5–10 min bis kumulativ höchstens 8 mg/kg, dann Dauertropf 25–75 µg/kg/min. KATZE: RECOVER 2024 rät ab — stattdessen Amiodaron 5 mg/kg IV/IO. VERBOTEN bei ventrikulärem Ersatzrhythmus (HF < 45/min) und bei AV-Block II°/III°.'} ],
      speciesNotes:{ katze:'Bei der Katze KEIN Standard-Lidocain (RECOVER 2024). Zuerst die Ursachenkette: Oxygenierung, EtCO₂, Narkosetiefe, Analgesie, Volumen, Temperatur, Kalium und Magnesium. Bleibt eine kreislaufwirksame Kammertachykardie: Amiodaron 5 mg/kg IV/IO.', all:'Immer erst Ursache (Schmerz/Volumen/CO₂) – nicht „blind" β-Blocker.' },
      red:['Sinustachykardie ist meist Symptom – Ursache suchen, nicht nur Frequenz senken'] },

    { id:'tachypnoe', name:'Tachypnoe / hohe Atemfrequenz', icon:'🌬️', cls:'Atmung', color:'#ffd166', tag:'AF ↑', short:'Atemfrequenz zu hoch',
      thresholds:{ hund:'AF > 20–30/min unter Narkose', katze:'AF > 30/min', kaninchen:'AF > 60/min', all:'anhaltend erhöht + flach' },
      causes:['Zu flache Narkose / Schmerz','Hyperkapnie (CO₂-Rückatmung, erschöpfter Atemkalk)','Hypoxie','Hyperthermie','Atelektase / Lungenerkrankung','Zu leichte Beatmung'],
      steps:['Narkosetiefe + Analgesie prüfen.','Kapnografie ansehen: EtCO₂ hoch → Ventilation verbessern.','Atemkalk-Farbe prüfen (verbraucht → wechseln), Frischgasfluss erhöhen.','Tubus/Kreissystem auf Verlegung/Diskonnektion prüfen.','Temperatur prüfen (Hyperthermie kühlen).','Bei Erschöpfung/flacher Atmung: kontrollierte Beatmung (IPPV) starten.'],
      machine:'Frischgas-O₂ erhöhen; Atemkalk wechseln wenn umgeschlagen; auf Manual/IPPV umstellen, AZV 10–15 mL/kg, AF art-typisch.',
      drugs:[ {id:'methadon',low:0.1,high:0.3,unit:'mg/kg',route:'IV',note:'Wenn schmerz-/stressbedingt.'} ],
      speciesNotes:{ reptil:'Reptilien atmen physiologisch sehr langsam – „Tachypnoe" selten; eher IPPV-Bedarf.', all:'Hohe AF + hohe EtCO₂ = Hypoventilation trotz schneller Atmung → assistiert beatmen.' },
      red:['Schnelle flache Atmung kann Hypoventilation sein – Kapnografie entscheidet'] },

    { id:'hypoxaemie', name:'Hypoxämie (niedrige SpO₂)', icon:'🫁', cls:'Atmung', color:'#ff4d4d', tag:'SpO₂ ↓', short:'Sauerstoffsättigung niedrig',
      thresholds:{ all:'SpO₂ < 95 % → handeln; < 90 % = kritisch (PaO₂ stark erniedrigt)' },
      causes:['Diskonnektion / leere O₂-Quelle','Ösophageale/einseitige Intubation, Tubus verlegt','Hypoventilation / Apnoe','Atelektase','Bronchospasmus / Lungenödem','Sensorartefakt (Perfusion/kalt)'],
      steps:['O₂ auf 100 %, Frischgasfluss hoch – O₂-Quelle & Vapor prüfen.','Tubuslage & Kreissystem prüfen (Kapnografie bestätigt Intubation).','Manuell/IPPV beatmen. Rekrutierung 15 cmH₂O über 30 s — nicht höher, 25 und 35 blähen über; danach PEEP 3–5 cmH₂O stehen lassen, sonst fällt die Lunge in Minuten wieder zusammen.','SpO₂-Sensor umplatzieren (Zunge), Puls/Perfusion prüfen.','Auskultation: einseitig? Bronchospasmus? Sekret absaugen.','Ursache behandeln; wenn keine Besserung → Narkose beenden/CPR-Bereitschaft.'],
      machine:'O₂-Fluss maximal, FiO₂ 100 %; Vapor kurz reduzieren; O₂-Flush nutzen; auf Manual/IPPV. PIP kontrolliert (Hund/Katze ≤ 15–20, Exoten niedriger).',
      drugs:[],   /* Adrenalin steht in der CPR-Karte. Hier stand es als erste Dosis des Zwischenfalls "Hypoxaemie" — ein Tier mit SpO2 94 und tastbarem Puls bekam damit eine ausgerechnete Adrenalin-Milliliterzahl. Am schlagenden, hypoxischen Herzen ist das der Weg ins Kammerflimmern. */
      speciesNotes:{ reptil:'Pulsoxymetrie oft unzuverlässig – klinisch (Farbe, Doppler) beurteilen; bei O₂-Beatmung Atemantrieb sinkt.', kaninchen:'Immer präoxygenieren; Intubation schwierig → Larynxmaske/Maske.' },
      red:['SpO₂ < 90 % ist ein Notfall – zuerst Gerät/Tubus, dann Patient','Erst nach Beatmung an Medikamente denken'] },

    { id:'hypoventilation', name:'Hypoventilation / hohes EtCO₂', icon:'☁️', cls:'Atmung', color:'#a78bfa', tag:'EtCO₂ ↑', short:'CO₂-Anstieg',
      thresholds:{ all:'EtCO₂ 45–55 mmHg unter GA meist tolerierbar (permissive Hyperkapnie); WARNUNG > 55; HANDELN/IPPV > 60 mmHg' },
      causes:['Zu tiefe Narkose (Atemdepression)','Opioide/Propofol-Bolus','Zwerchfelldruck (Lagerung/OP)','Erschöpfter Atemkalk (Rückatmung)','Zu geringer Frischgasfluss'],
      steps:['Narkosetiefe prüfen – Iso reduzieren.','Kontrollierte Beatmung (IPPV) beginnen: AF ↑, AZV 10–15 mL/kg.','Atemkalk prüfen/wechseln, Frischgasfluss erhöhen.','Lagerung/abdominalen Druck reduzieren lassen.'],
      machine:'Auf VCV/PCV oder Manual umschalten; AF art-typisch, AZV 10–15 mL/kg (Exoten weniger), PIP-Grenze beachten; Kapnografie bis EtCO₂ 35–45.',
      drugs:[ {id:'naloxon',low:0.01,high:0.04,unit:'mg/kg',route:'IV',note:'Nur wenn opioidbedingte Atemdepression überwiegt (titrieren, Analgesie geht verloren).'} ],
      speciesNotes:{ reptil:'Physiologisch niedriges EtCO₂; Beatmung 2–4/min genügt oft.' },
      red:['Hyperkapnie unbehandelt → Azidose, Arrhythmien'] },

    { id:'hypotension', name:'Hypotension', icon:'📉', cls:'Kreislauf', color:'#ff4d4d', tag:'MAP ↓', short:'Blutdruck zu niedrig',
      thresholds:{ all:'WARNUNG MAP < 70 mmHg (SAP < 90) → Ursache suchen · HANDELN MAP < 60 → Organperfusion gefährdet, jetzt behandeln. Ziel MAP 60–70+.' },
      causes:['Zu tiefe Narkose (Iso-Vasodilatation/Kardiodepression)','Hypovolämie / Blutverlust','Bradykardie','α2-/Ace-bedingte Vasodilatation','ACE-Hemmer am OP-Tag gegeben','Sepsis/Anaphylaxie'],
      /* DER ACE-HEMMER-SATZ IST NEU (15.08.2026, Praxis der Kardiologie S.426) und steht
         bewusst NICHT AN ERSTER STELLE - obwohl der Vorschlag genau das wollte.
         tools/vollauslesung-test.js verlangt, dass der erste Schritt einer Zwischenfall-Karte
         eine SOFORTMASSNAHME ist und keine Feststellung, und der Test hat recht: wer
         "Hypotension" aufschlaegt, steht am Tisch. Dort hilft "Isofluran reduzieren", nicht
         ein Blick in den Vorbericht. Die Erkenntnis bleibt trotzdem wertvoll - sie steht
         deshalb am Ende als Lehre fuer das naechste Mal, und die Ursachenliste nennt sie oben.
         WORTLAUT GENAU SO: es geht um die EINZELGABE am Operationstag, nicht um das Absetzen
         der Therapie - das waere ein ganz anderer und gefaehrlicher Rat. */
      steps:['Isofluran reduzieren (häufigste Ursache!).','Volumenstatus: Kristalloid-Bolus geben.','Bradykardie? → Anticholinergikum (siehe Bradykardie).','Wenn trotz Volumen + weniger Iso: Vasopressor/Inotropikum.','Blutverlust kontrollieren; Wärme halten; MAP-Ziel > 60–70.','Fürs nächste Mal: ACE-Hemmer (Benazepril/Enalapril/Imidapril/Ramipril) am Tag der Narkose nicht geben — die Dauertherapie bleibt, nur die Gabe am OP-Tag entfällt (Praxis der Kardiologie S.426).'],
      machine:'Isofluran senken; O₂ 100 %; ggf. IPPV mit niedrigem Mitteldruck (hoher PIP senkt Vorlast).',
      drugs:[ {id:'ephedrin',low:0.05,high:0.2,unit:'mg/kg',route:'IV Bolus',note:'Schneller Bolus bei Anästhesie-Hypotension.'},
              {id:'noradrenalin',low:null,high:null,unit:'mcg/kg/min',route:'CRI',note:'Bei vasodilatatorischer Hypotension, titrieren.'},
              {id:'dopamin',low:null,high:null,unit:'mcg/kg/min',route:'CRI',note:'Inotrop und gefäßverengend. Katze höchstens 5 µg/kg/min; bei der Katze verhindert Dopamin die Isofluran-Hypotonie nicht (VAA 2021) — dort Noradrenalin oder Phenylephrin.'},
              {id:'dobutamin',low:null,high:null,unit:'mcg/kg/min',route:'CRI',note:'Bei Myokarddepression oder niedrigem Herzzeitvolumen. NICHT bei HOCM/SAM, Aorten- oder Pulmonalstenose — dort verschlimmert mehr Kontraktilität die Obstruktion (Praxis der Kardiologie S.436/437). Kann ventrikuläre Extrasystolen verstärken — bei bestehender Ektopie nur unter EKG.'} ],
      speciesNotes:{ all:'Kristalloid-Bolus Hund 10–20 mL/kg / Katze 5–10 mL/kg über 10–15 min, dann re-evaluieren (siehe Einstellungen/Infusion).' },
      red:['Iso zu hoch ist die häufigste Narkose-Hypotension – zuerst Verdampfer runter','Niemals einen Vasopressor auf einen unbestätigten Manschettenwert — am kalten oder engstellten Tier zuerst Manschettengröße, Sitz und Doppler prüfen'] },

    { id:'apnoe', name:'Apnoe / Atemstillstand', icon:'⛔', cls:'Atmung', color:'#ff4d4d', tag:'AF 0', short:'keine Spontanatmung',
      thresholds:{ all:'keine Atembewegung / EtCO₂-Kurve flach' },
      causes:['Zu tiefe Narkose','Propofol/Alfaxalon-Bolus','Opioid-Überhang','Hypokapnie nach Hyperventilation','Präterminal (Hypoxie)'],
      steps:['Sofort 100 % O₂ + manuell/IPPV beatmen (10–15/min).','Narkose reduzieren (Vapor aus/niedrig).','Tubuslage & Kreislauf prüfen (Puls/EKG) – Stillstand? → CPR.','Antagonisieren wenn passend (Opioid→Naloxon, α2→Atipamezol, Benzo→Flumazenil).','Bis Spontanatmung zurückkehrt kontrolliert beatmen.'],
      machine:'Manual/IPPV, AF 10–15/min (Exoten 2–6), AZV 10–15 mL/kg, PIP-Grenze; Vapor reduzieren.',
      drugs:[ {id:'naloxon',low:0.01,high:0.04,unit:'mg/kg',route:'IV',note:'Opioid-Überhang.'},
              {id:'atipamezol',low:null,high:null,unit:'mg/kg',route:'IM',note:'α2-Überhang. Katze etwa halbes Volumen.'},
              {id:'flumazenil',low:0.01,high:0.01,unit:'mg/kg',route:'IV',note:'Benzodiazepin-Überhang.'} ],
      speciesNotes:{ reptil:'Apnoe/„Breath-Hold" häufig – IPPV 2–4/min, Raumluft kann Atemantrieb fördern als 100 % O₂.' },
      red:['Kein Puls → sofort CPR (siehe 🚨)'] },

    { id:'asystolie', name:'Herzstillstand / CPR (RECOVER)', icon:'🚨', cls:'Reanimation', color:'#ff2d2d', tag:'CPR', short:'Asystolie / PEA / Kammerflimmern',
      thresholds:{ all:'kein Puls / keine Herzaktion / EtCO₂-Abfall + flache Kurve' },
      causes:['Schwere Hypoxie/Hypoventilation','Überdosis Anästhetikum','Hypovolämie/Blutverlust','Elektrolyt (K⁺)','Vagal/Reflex'],
      steps:['Hilfe rufen, Zeit notieren. Vapor AUS, 100 % O₂.','Thoraxkompressionen 100–120/min, 2 min ununterbrochen, dann Kompressor wechseln; Seitenlage, Herzhöhe.','Beatmung 10/min (nicht hyperventilieren).','Zugang legen; Adrenalin 0,01 mg/kg IV/IO jeden 2. Zyklus (alle 3–5 min) – die ganze CPR über. Alternative: Vasopressin 0,8 U/kg. KEINE Hochdosis (RECOVER 2024).','Bei nicht-defibrillierbarem Rhythmus (Asystolie/PEA), v.a. hoher Vagotonus: Atropin 0,04 mg/kg IV/IO EINMALIG (nicht wiederholen).','EKG alle 2 min prüfen; Kammerflimmern/pulslose VT → Defibrillation biphasisch 2–4 J/kg (monophasisch 4–6 J/kg), danach sofort 2 min CPR; nach >3–5 erfolglosen Schocks: HUND Lidocain 2 mg/kg IV/IO, KATZE Amiodaron 5 mg/kg IV/IO über 2–4 min; zusätzlich Esmolol 0,5 mg/kg über 3–5 min, dann 50 µg/kg/min (RECOVER 2024); reversible Ursachen (Hypovolämie/Hypoxie/K⁺/Azidose) behandeln.'],
      machine:'Verdampfer AUS. O₂ 100 %, Manual-Beatmung 10/min. Kapnografie als CPR-Qualität (EtCO₂ ≥ 18 mmHg anstreben [RECOVER 2024]; <12 → Tubuslage prüfen; plötzlicher Anstieg = ROSC).',
      drugs:[ {id:'adrenalin',low:0.01,high:0.01,unit:'mg/kg',route:'IV/IO',note:'Standarddosis 0,01 mg/kg jeden 2. Zyklus (alle 3–5 min) die ganze CPR über. Hochdosis 0,1 mg/kg NICHT mehr empfohlen (RECOVER 2024).'},
              {id:'vasopressin',low:0.8,high:0.8,unit:'U/kg',route:'IV/IO',note:'Alternative/Ergänzung zu Adrenalin, alle 3–5 min. Bei refraktärem Kammerflimmern (RECOVER 2024) bevorzugt.'},
              {id:'amiodaron',low:2.5,high:5,unit:'mg/kg',route:'IV/IO',note:'Bei defibrillations-resistentem VF/pulsloser VT (>3–5 erfolglose Schocks) – vor Lidocain. Polysorbat-Anaphylaxie beim Hund möglich.'},
              {id:'atropin',low:0.04,high:0.04,unit:'mg/kg',route:'IV/IO',note:'EINMALIG bei nicht-defibrillierbarem Rhythmus (Asystolie/PEA), v.a. hoher Vagotonus; so früh wie möglich. NICHT wiederholen (lange HWZ; wiederholte/höhere Dosen mit schlechterem Outcome assoziiert).'},
              {id:'naloxon',low:0.04,high:0.04,unit:'mg/kg',route:'IV/IO',note:'Wenn opioidassoziiert.'} ],
      speciesNotes:{ katze:'Kleine Hände – Thorax mit einer Hand umgreifend komprimieren.', kaninchen:'Sehr fragiler Thorax – vorsichtig, hohe Frequenz.', reptil:'CPR wenig etabliert; beatmen, Adrenalin IV/IO (intratracheal möglich; intrakardial nur ohne anderen Zugang), langer Versuch (kältetolerant).' },
      red:['Kompressionen früh & ununterbrochen','Verdampfer AUS nicht vergessen','Nach ROSC: Nachsorge, Ursache, Wärme, Monitoring'] },

    { id:'hyperthermie', name:'Hyperthermie', icon:'🔥', cls:'Temperatur', color:'#ff8c6b', tag:'T ↑', short:'Körpertemperatur zu hoch',
      thresholds:{ hund:'> 39.5 °C', katze:'> 39.5 °C', all:'anhaltend > arttypisch; > 41 °C = Notfall' },
      causes:['Zu warme Wärmeunterstützung / Abdeckung','Opioid-bedingt (v.a. Katze)','Zu flache Narkose/Muskelaktivität','selten maligne Hyperthermie'],
      steps:['Aktive Wärmezufuhr stoppen, abdecken reduzieren.','Aktiv kühlen (feuchte Tücher, Luft) – nicht unter-kühlen.','Narkosetiefe/Analgesie prüfen.','Infusion (Raumtemperatur), Monitoring; bei rasantem Anstieg an maligne Hyperthermie denken.'],
      machine:'Wärmematte reduzieren; Frischgas-O₂ hoch (bei malignem Verdacht Kreislauf spülen).',
      drugs:[],
      speciesNotes:{ katze:'Opioide (v.a. Hydromorphon) können bei Katzen Hyperthermie auslösen.' },
      red:['> 41 °C → aggressiv kühlen, Organschäden drohen'] },

    { id:'hypothermie', name:'Hypothermie', icon:'❄️', cls:'Temperatur', color:'#66a6ff', tag:'T ↓', short:'Körpertemperatur zu niedrig',
      thresholds:{ hund:'< 37 °C', katze:'< 37 °C', kaninchen:'< 38 °C', all:'unter arttypisch' },
      causes:['Kleiner Patient / große Oberfläche','Kaltes OP-Feld / Spülung','Lange Narkose','Vasodilatation (Iso/Ace)'],
      steps:['Aktiv wärmen (Warmluft, Wärmematte, warme Infusion).','Isofluran-Bedarf sinkt bei Hypothermie → Vapor reduzieren, sonst Überdosis.','Nasse Abdeckungen entfernen; Extremitäten/Pfoten einpacken.','Temperatur kontinuierlich messen; langsam auf-wärmen.'],
      machine:'Warmluftgebläse/Wärmematte; MAC/Iso-Bedarf sinkt – Verdampfer entsprechend zurück.',
      drugs:[],
      speciesNotes:{ kaninchen:'Sehr rasche Auskühlung – von Beginn an aktiv wärmen.', meerschwein:'Wie Kaninchen; kleine Masse.', reptil:'„Hypothermie" ist Zieltemperatur-Problem – POTZ-Bereich sichern (Reptil braucht Wärme für Metabolismus/Aufwachen).' },
      red:['Hypothermie verlängert Aufwachphase & verstärkt Iso-Wirkung'] },

    { id:'hypertension', name:'Hypertonie (Blutdruck zu hoch)', icon:'📈', cls:'Kreislauf', color:'#ff8c6b', tag:'MAP ↑', short:'Blutdruck zu hoch',
      thresholds:{ all:'SAP > 160–180 mmHg oder MAP > 120–130 mmHg. Interventionsbedürftig ab anhaltend MAP > 130–140; hypertensive Krise SAP > 180 mmHg (Organgefährdung).' },
      causes:['Zu flache Narkose / Schmerz (Nozizeption)','α2-Agonist (Xylazin/Medetomidin) Frühphase – meist transient','Ketamin (sympathomimetisch)','Hyperkapnie / Hypoxämie (Sympathikus ↑)','Hypervolämie (Infusion zu schnell)','selten Phäochromozytom / Hyperthyreose'],
      steps:['ZUERST Ursache klären – nicht blind vasodilatieren.','Zu flach/Schmerz → Analgesie + Narkosetiefe anpassen (Opioidbolus, ggf. vertiefen).','Hyperkapnie → beatmen/IPPV, EtCO₂ Richtung 35–45 senken.','Hypervolämie → Infusionsrate reduzieren.','α2-bedingt → meist selbstlimitierend, abwarten; KEIN Atropin (verstärkt Hypertonie + O₂-Bedarf); bei Bedarf Atipamezol.','Nur bei schwerer/persistierender Hypertonie gezielte Vasodilatation (titriert, unter Blutdruckmonitoring).'],
      machine:'Bei Hyperkapnie beatmen (IPPV), EtCO₂ senken. Verdampfer/Analgesie an Ursache anpassen. Kein Atropin in der α2-Hypertonie-Phase.',
      drugs:[ {id:'fentanyl',low:null,high:null,unit:'mcg/kg',route:'IV',note:'Bei Schmerz oder zu flacher Narkose – behebt die häufigste Ursache. Katze niedriger als Hund.'},
              {id:'acepromazin',low:0.005,high:0.01,unit:'mg/kg',route:'IV',note:'Niedrig, titriert; senkt Druck (nicht antagonisierbar, Vorsicht Spät-Hypotonie).'} ],
      speciesNotes:{ all:'Vasodilatatoren nur titriert unter Blutdruckmonitoring – können in Hypotonie umschlagen. Bei α2-Hypertonie zuerst Zeit/Antagonist statt Atropin. Refraktär: Labetalol (α/β) oder Na-Nitroprussid 0,5–5 µg/kg/min CRI durch Anästhesist.' },
      red:['NICHT blind senken – erst Ursache (zu flach/Schmerz, Hyperkapnie, α2) klären.','Kein Anticholinergikum bei α2-bedingter Hypertonie.'] }
  ],

  /* =================== GERÄT =================== */
  machine: {
    controls: [
      { id:'flowmeter', name:'O₂-Flowmeter (0–4 L/min)', icon:'🟦',
        fn:'Stellt den Frischgas-/Sauerstofffluss ein (Schwimmerkugel = aktueller Fluss in L/min).',
        setting:'Erhaltung ~200–300 mL/kg/min im Nicht-Rückatemsystem bzw. niedriger im Kreissystem (siehe „Einstellungen"). Einleitung/Präoxygenierung höher.',
        incident:'Bei Hypoxie/Notfall: Fluss hoch + 100 % O₂.' },
      { id:'vapor', name:'V60 Isofluran-Verdampfer (0–6 Vol%)', icon:'⚪',
        fn:'Dosiert die Isofluran-Konzentration im Frischgas (Vol%). Rad drehen = Narkosetiefe.',
        setting:'Einleitung 3–5 %, Erhaltung meist 1.5–2.5 % (MAC Hund ~1.3, Katze ~1.6, Kaninchen ~2). An Klinik anpassen.',
        incident:'Bei Hypotension/Bradykardie/tiefer Narkose: Vol% senken. Bei CPR: AUS.' },
      { id:'apl', name:'APL-Ventil (Pop-off / Überdruck)', icon:'🔵',
        fn:'Begrenzt den Druck im Kreissystem und lässt überschüssiges Gas ab.',
        setting:'Bei Spontanatmung offen; für Handbeatmung kurz schließen/anheben, Beutel drücken, danach wieder öffnen. Grenzdruck beachten.',
        incident:'NIE geschlossen lassen (Barotrauma!). Nach Blähmanöver sofort öffnen.' },
      { id:'automanual', name:'Auto / Manual-Umschalter', icon:'🔀',
        fn:'Schaltet zwischen maschineller Beatmung (Auto/Ventilator) und Handbeatmung mit Beutel (Manual).',
        setting:'Manual für Einleitung/Blähmanöver; Auto (VCV/PCV) für kontrollierte Beatmung längerer OPs.',
        incident:'Bei Apnoe/Hypoventilation → sofort beatmen (Manual oder Auto/IPPV).' },
      { id:'o2flush', name:'O₂-Flush (O₂+)', icon:'⏩',
        fn:'Liefert schnellen, hohen O₂-Fluss direkt ins System (umgeht den Verdampfer).',
        setting:'Kurz nutzen, um Beutel zu füllen / System zu spülen.',
        incident:'Bei Hypoxie/CPR schnelles Auffüllen mit reinem O₂ (keine Narkosegas-Zufuhr dabei).' },
      { id:'bag', name:'Rückatembeutel / Handbeutel', icon:'🎈',
        fn:'Reservoir + Handbeatmung; Größe nach Körpergewicht.',
        setting:'Beutelgröße grob: <10 kg → 0.5–1 L; 10–30 kg → 2 L; >30 kg → 3 L. Nur ⅓–½ Volumen als Atemzug.',
        incident:'Handbeatmung bei Apnoe/Hypoventilation; Bewegung = Spontanatmung sichtbar.' },
      { id:'absorber', name:'Atemkalk / CO₂-Absorber', icon:'🧪',
        fn:'Bindet ausgeatmetes CO₂ im Kreissystem (Rückatmung möglich).',
        setting:'Farbumschlag (z.B. weiß→violett) = verbraucht → wechseln. Frischgasfluss entsprechend anpassen.',
        incident:'Erschöpfter Kalk → CO₂-Rückatmung (EtCO₂/Inspir.-CO₂ steigt) → wechseln, Fluss erhöhen.' },
      { id:'monitor', name:'uMEC12 Vet Monitor', icon:'🖥️',
        fn:'Überwacht EKG, SpO₂ (Pleth), EtCO₂ (Kapnografie), NIBP (Blutdruck), Atemfrequenz, Temperatur.',
        setting:'Gewicht & Tierart eingeben; Alarmgrenzen art-/gewichtsgerecht. Kapnografie ist Frühwarner (Diskonnektion, Hypoventilation, CPR-Qualität).',
        incident:'Alarm = zuerst Patient & Gerät ansehen (Artefakt?), dann handeln (siehe Zwischenfälle).' },
      { id:'ventscreen', name:'Ventilator-Touchscreen (Standby/Modi)', icon:'📟',
        fn:'Steuert die maschinelle Beatmung: Standby, VS, VS+, VCV, PCV, SIMV, Manuell.',
        setting:'„Fall starten", Gewicht eingeben; Modus wählen; AF, AZV/PIP, I:E einstellen; Alarme „On".',
        incident:'Für kontrollierte Beatmung IPPV starten; Standby zwischen Fällen.' }
    ],
    ventModes: [
      { id:'vs',     name:'VS',      full:'Volumen-Support',                    tag:'Spontan/assistiert', spontaneous:true,  params:['vt','minaf','peep','trigger'],
        desc:'Druckunterstützung für JEDEN Spontanatemzug bis zum Ziel-Vt; Backup-Frequenz (Min. AF), falls das Tier zu selten atmet.',
        whenToUse:'Spontan atmendes Tier mit etwas Unterstützungsbedarf; Aufwachen/Weaning.' },
      { id:'vsplus', name:'VS+',     full:'Volumen-Support Plus (adaptiv)',     tag:'Spontan adaptiv',    spontaneous:true,  params:['vtref','minaf','maxaf','peep'],
        desc:'Wie VS, passt den Unterstützungsdruck automatisch an, um das Ziel-Vt (VtRef) zwischen Min. und Max. AF zu halten.',
        whenToUse:'Spontan atmendes Tier mit schwankender Atmung; sanftes Weaning.' },
      { id:'psv',    name:'PSV',     full:'Pressure Support Ventilation (Druckunterstützung)', tag:'Spontan · druckunterstützt', spontaneous:true, params:['psupp','peep','minaf','trigger'],
        desc:'Jeder SPONTANE Atemzug wird mit einem festen Unterstützungsdruck (ΔPsupp) über PEEP verstärkt; das Tier bestimmt Frequenz & Timing selbst. Backup-Frequenz (Min. AF) als Sicherheitsnetz.',
        whenToUse:'Spontan atmendes Tier, Weaning/Aufwachen, Atemarbeit senken (druckbasiert statt volumenbasiert wie VS).' },
      { id:'cpap',   name:'CPAP/PEEP', full:'Continuous Positive Airway Pressure / PEEP', tag:'Spontan · nur PEEP', spontaneous:true, params:['peep','trigger'],
        desc:'Kontinuierlicher positiver Atemwegsdruck (PEEP) bei reiner Spontanatmung – KEINE maschinellen Hübe. Hält Alveolen offen, verbessert Oxygenierung/FRC, senkt Atelektasen.',
        whenToUse:'Spontan atmendes Tier mit Oxygenierungsproblem/Atelektase (adipös, nach Recruitment); assistierte Präoxygenierung.' },
      { id:'vcv',    name:'VCV',     full:'Volumenkontrolliert (IPPV/CMV)',     tag:'Volumen · IPPV/CMV', spontaneous:false, params:['vt','af','ie','peep','trigger'],
        desc:'Fixes Atemzugvolumen pro Hub, Druck variiert. Sichere, konstante Ventilation – Standard für die meisten Hunde/Katzen. Druckalarm setzen.',
        whenToUse:'Routine-IPPV, Apnoe, Hypoventilation, Muskelrelaxation.' },
      { id:'pcv',    name:'PCV',     full:'Druckkontrolliert (IPPV/CMV)',       tag:'Druck · IPPV/CMV',   spontaneous:false, params:['pinsp','af','ie','peep','trigger'],
        desc:'Fester Inspirationsdruck, Volumen variiert. Lungenschonend (begrenzter Spitzendruck); ideal für kleine Patienten/Exoten, schlechte Compliance, Laparoskopie. Volumen überwachen.',
        whenToUse:'Kleine/nicht-compliante Lunge, Exoten, Recruitment, Laparoskopie, BOAS.' },
      { id:'simv',   name:'SIMV',    full:'Synchronisiert intermittierend + Druckunterstützung', tag:'Weaning', spontaneous:false, params:['vt','af','tinsp','peep','psupp','trigger'],
        desc:'Feste Maschinenhübe synchron zur Eigenatmung, dazwischen druckunterstützte Spontanatmung (ΔPsupp). Gut zum Entwöhnen/Aufwachen.',
        whenToUse:'Übergang von kontrolliert zu spontan; Aufwachphase.' },
      { id:'manual', name:'Manuell', full:'Handbeutel',                         tag:'Notfall/Recruitment', spontaneous:false, params:[],
        desc:'Beatmung von Hand über den Beutel – volles Gefühl/Kontrolle. Für Einleitung, Blähmanöver/Recruitment, CPR, Notfall. APL offen halten (nur zum Hub kurz schließen).',
        whenToUse:'Notfall, CPR, Recruitment, Einleitung, Gerät nicht verfügbar.' }
    ],

    /* Parameter-Metadaten (Bereiche + Empfehlungshinweise + Auswahloptionen) */
    ventParams: {
      vt:     { label:'Vt',      unit:'ml',    hint:'Atemzugvolumen lungenschonend 8–12 ml/kg (kranke Lunge 6–8); Plateaudruck ≤ 15–20 cmH₂O, Driving Pressure (Pplat−PEEP) niedrig halten. [AAHA/ACVAA]', range:'6–12 ml/kg' },
      vtref:  { label:'VtRef',   unit:'ml',    hint:'Ziel-Atemzugvolumen, adaptiv gehalten.',            range:'8–15 ml/kg' },
      af:     { label:'AF',      unit:'/min',  hint:'Atemfrequenz (Beatmungshübe/min).',                 range:'art-abhängig' },
      minaf:  { label:'Min. AF', unit:'/min',  hint:'Minimale Backup-Frequenz, falls das Tier zu selten atmet.', range:'art-abhängig' },
      maxaf:  { label:'Max. AF', unit:'/min',  hint:'Obergrenze der unterstützten Frequenz.',            range:'art-abhängig' },
      ie:     { label:'I:E',     unit:'',      hint:'Inspiration:Exspiration. Routine 1:2; bei Obstruktion/Air-Trapping 1:3+.', range:'1:1–1:4', options:['1:1','1:1.5','1:2','1:3','1:4'] },
      tinsp:  { label:'Tinsp',   unit:'s',     hint:'Inspirationszeit (Hund/Katze ca. 0,8–1,2 s).',      range:'0,4–1,5 s' },
      peep:   { label:'PEEP',    unit:'cmH₂O', hint:'Positiver end-exspiratorischer Druck. Routine 0–5; Hypoxämie/Atelektase 5–10.', range:'0–10', options:['OFF','2','3','4','5','6','8','10'] },
      pinsp:  { label:'Pinsp',   unit:'cmH₂O', hint:'Inspirationsdruck (PCV). Hund/Katze 8–12, Spitzendruck ≤ 15–20; Exoten/Neonaten niedriger.', range:'6–20' },
      psupp:  { label:'ΔPsupp',  unit:'cmH₂O', hint:'Druckunterstützung über PEEP für Spontanhübe.',     range:'3–12' },
      trigger:{ label:'Trigger', unit:'',      hint:'Auslöseschwelle für assistierte Hübe.',             range:'Auto/Flow/Druck', options:['Auto','Flow','Druck','Aus'] }
    },

    /* Empfohlener Modus + Einstellungen je Fall/Situation (mit Begründung) */
    ventScenarios: {
      routine:       { mode:'vcv', title:'Routine (stabil, ASA I–II)', o2:'Kreissystem Low-Flow (Auswaschen 10–20 ml/kg/min; <5–7 kg Nicht-Rückatem 200–300)', iso:'~1 MAC – atemdepressiv, daher IPPV', vt:'10 ml/kg (8–12)', af:'Hund 8–12, Katze 10–15', ie:'1:2', peep:'3–5', trigger:'Auto', why:'VCV garantiert das Minutenvolumen gegen die volatil-bedingte Hypoventilation; moderater PEEP wirkt Atelektasen entgegen. Ziel EtCO₂ 35–45, Spitzendruck 8–12 (max < 15–20).' },
      apnoe:         { mode:'vcv', incident:'apnoe', title:'Apnoe / kein Eigenatem', o2:'100 %', vt:'10 ml/kg', af:'10–15 (nach EtCO₂)', ie:'1:2', peep:'3–5', trigger:'kontrolliert', why:'Ohne Atemantrieb liefert der Ventilator das gesamte Minutenvolumen (vollkontrolliert). Ursache suchen (zu tief, Opioid, Hypokapnie). Spitzendruck begrenzen; bei Spontan-/SIMV-Modus Apnoe-Backup an.' },
      hypoventilation:{ mode:'vcv', incident:'hypoventilation', title:'Hypoventilation / EtCO₂ hoch', vt:'bis 12 ml/kg', af:'zuerst ↑ auf 15–20', ie:'1:2', peep:'3–5', why:'Alveoläre Ventilation ∝ 1/PaCO₂: zuerst Frequenz erhöhen (Minutenvolumen ohne Drucksteigerung), dann Vt. Rückatmung (erhöhte Basislinie) ausschließen. Plateaudruck ≤ 15–16. EtCO₂ > 60 → kontrolliert beatmen.' },
      tachypnoe:     { mode:'simv', incident:'tachypnoe', title:'Tachypnoe / Gegenatmen', vt:'10 ml/kg mandatorisch', af:'8–12 mandatorisch', tinsp:'1,0', peep:'3–5', psupp:'5–8', trigger:'F-Trig 1–2 L/min', o2:'100 % bis Ursache geklärt', why:'Statt gegen das Tier zu beatmen mit SIMV/VS synchronisieren (empfindlicher Trigger, Druckunterstützung). Auslöser behandeln (Tiefe/Schmerz/CO₂/O₂). Ohne SIMV am Gerät → Frequenz anpassen oder vertiefen und voll übernehmen.' },
      hypoxaemie:    { mode:'pcv', incident:'hypoxaemie', title:'Hypoxämie / Atelektase', o2:'FiO₂ 1,0, danach senken (Resorptionsatelektasen)', pinsp:'auf Vt 6–8 ml/kg, Plateau ≤ 15–16', af:'nach EtCO₂', ie:'1:2 (bis 1:1)', peep:'nach Recruitment 5–10', why:'Narkose/Lagerung kollabieren abhängige Areale; Recruitment eröffnet, PEEP hält offen (ohne PEEP Rekollaps in Minuten). Lungenprotektiv (kleines Vt, Plateau begrenzt). Blutdruck während RM überwachen; Tubuslage/einseitige Intubation prüfen.' },
      recruitment:   { mode:'pcv', title:'Alveoläres Recruitment', af:'10–15', ie:'1:2', pinsp:'schrittweise bis Paw ~30 (transpulmonal < 25)', peep:'stufenweise 0→5→10→15, dann dekremental auf Best-PEEP 5–10', o2:'FiO₂ niedrig halten', why:'HÄMODYNAMIK ZUERST sichern – Recruitment senkt venösen Rückstrom (MAP↓, HF↑). Best-PEEP = dekrementell mit höchster Compliance; danach PEEP halten. Bei EtCO₂-/BD-Abfall SOFORT abbrechen.' },
      hypotension:   { mode:'pcv', incident:'hypotension', title:'Hypotension', o2:'100 %', pinsp:'auf Vt 6–8 ml/kg, Spitzendruck ≤ 12–15', af:'leicht ↑ für Normokapnie', ie:'1:2 bis 1:3', peep:'0–3 (niedrigst wirksam)', iso:'Isofluran minimieren (Vasodilatation/Myokarddepression)', why:'Überdruckbeatmung erhöht den intrathorakalen Druck → weniger venöser Rückstrom/HZV. Mittleren Atemwegsdruck NIEDRIG halten (wenig PEEP, kurze Tinsp, moderates Vt). Blutdruck mit Volumen/Inotropika stützen, nicht über den Ventilator.' },
      bradykardie:   { mode:'vcv', incident:'bradykardie', title:'Bradykardie', o2:'100 %', vt:'10 ml/kg', af:'10–15 (Normokapnie)', ie:'1:2', peep:'0–3', why:'Bradykardie ist selten ein primäres Beatmungsproblem, kann aber hypoxiebedingt sein → Oxygenierung mit FiO₂ 1,0 sichern, Normokapnie. Mittleren Atemwegsdruck niedrig halten, um den Herzauswurf nicht weiter zu senken; kausal behandeln.' },
      tachykardie:   { mode:'vcv', incident:'tachykardie', title:'Tachykardie', o2:'100 %', vt:'10 ml/kg', af:'an EtCO₂ anpassen', ie:'1:2', peep:'3–5', why:'Kapnografie prüfen: Hyperkapnie treibt häufig die Tachykardie – bei EtCO₂ ↑ Minutenvolumen steigern (zuerst Frequenz). Sonst Ursache (Tiefe/Schmerz/Hypovolämie) behandeln; Beatmung ist selten die primäre Korrektur.' },
      hypertension:  { mode:'vcv', incident:'hypertension', title:'Hypertonie', o2:'100 %', vt:'10 ml/kg', af:'10–15 (Normokapnie)', ie:'1:2', peep:'3–5', why:'Hypertonie ist primär kein Beatmungsproblem – Normokapnie (35–45) halten, Hyperkapnie meiden (treibt Sympathikus/Blutdruck). Ursache (Tiefe/Schmerz/Katecholamine) behandeln.' },
      asystolie:     { mode:'manual', incident:'asystolie', title:'Herzstillstand / CPR', o2:'100 %', af:'~10/min (NICHT überbeatmen)', iso:'Isofluran SOFORT AUS', why:'Ventilatoreinstellungen lösen es nicht: Tubuslage/Konnektion prüfen, CPR beginnen. Manuell mit 100 % O₂ bei niedriger Frequenz (~10/min) – Hyperventilation senkt den koronaren Perfusionsdruck. Ansteigendes EtCO₂ = ROSC-Zeichen.' },
      hyperthermie:  { mode:'vcv', incident:'hyperthermie', title:'Hyperthermie', o2:'100 %, hoher Frischgasfluss', vt:'10–12 ml/kg', af:'deutlich ↑ (bis 20+)', ie:'1:2', peep:'3–5', iso:'Bei MH-Verdacht Volatil SOFORT absetzen (Trigger!)', why:'Stark erhöhte CO₂-Produktion braucht deutlich mehr Minutenvolumen (Frequenz zuerst, dann Vt). CO₂-Absorber prüfen/wechseln, aktiv kühlen. Bei maligner Hyperthermie ist das Absetzen des Triggergases zentral.' },
      hypothermie:   { mode:'vcv', incident:'hypothermie', title:'Hypothermie', o2:'100 %', vt:'10 ml/kg', af:'eher niedriger, an EtCO₂', ie:'1:2', peep:'3–5', iso:'Kälte senkt MAC-Bedarf → Isofluran reduzieren (Überdosierung meiden)', why:'Hypothermie senkt Metabolismus/CO₂-Produktion (niedriges EtCO₂) und verzögert die Clearance. Minutenvolumen nicht überschießend senken, an EtCO₂ titrieren und aktiv wärmen. Ursache ist systemisch, nicht der Ventilator.' },
      boas:          { mode:'pcv', title:'Brachyzephal (BOAS)', o2:'100 %, präoxygenieren, Flow-by beim Aufwachen', af:'10–15', ie:'1:2', pinsp:'auf Vt 8–10 ml/kg, Spitzendruck ≤ 15', peep:'3–5', why:'Nach Intubation ist die Beatmung Routine – der Ventilator behebt die obere Atemwegsobstruktion nicht. Entscheidend: Atemwegsmanagement, verzögerte Extubation (erst voll wach), Reintubationsbesteck bereit, niedrige Drücke.' },
      thorakotomie:  { mode:'pcv', title:'Thorakotomie / offener Thorax', o2:'100 %', af:'12–18', ie:'1:2', pinsp:'auf Vt 8–10 ml/kg, Plateau ≤ 15–20', peep:'3–5', why:'Der offene Thorax hebt den negativen Pleuradruck auf → Überdruckbeatmung mit PEEP ist zwingend. Kontrolliert erlaubt Koordination mit dem Chirurgen; Blähmanöver zur Wiederausdehnung vor Thoraxverschluss.' },
      laparoskopie:  { mode:'pcv', title:'Laparoskopie / Kapnoperitoneum', o2:'100 %', af:'um 20–50 % ↑ (zuerst Frequenz)', ie:'1:2', pinsp:'auf Vt 6–8 ml/kg, Plateau ≤ 18–20', peep:'5', why:'CO₂-Insufflation erhöht die CO₂-Last (mehr Minutenvolumen, EtCO₂ ≤ 45–50 anstreben); erhöhter Bauchdruck verlagert das Zwerchfell und senkt Compliance/FRC. Kleines Vt + PEEP, Recruitment nach Desufflation.' },
      hirndruck:     { mode:'vcv', title:'Erhöhter Hirndruck / SHT', o2:'100 %, Hypoxämie strikt meiden', af:'auf EtCO₂ 35–40 (Normoventilation)', ie:'1:2', pinsp:'auf Vt 8–10 ml/kg', peep:'niedrig 3–5', iso:'Volatil minimieren (zerebraler Vasodilatator); balanciert/partiell i.v.', why:'Standard ist NORMOventilation (EtCO₂ 35–40). Milde Hyperventilation (30–35) nur kurzfristig bei akutem Hirndruckanstieg – exzessiv (PaCO₂ < 25) macht Ischämie. Niedriger mittlerer Atemwegsdruck erhält den venösen Abfluss.' },
      bronchospasmus:{ mode:'pcv', title:'Bronchospasmus / Air-Trapping (Haifischflosse)', o2:'100 %', af:'niedrig 8–12', ie:'1:3 bis 1:4 (lange Exspiration)', pinsp:'auf Vt 6–8 ml/kg', peep:'minimal/AUS (außer titriert)', iso:'Iso/Sevofluran bronchodilatatorisch – Vertiefen kann helfen; Bronchodilatator ergänzen', why:'Obstruierte Exspiration → dynamische Überblähung. Verlängerte Exspiration + niedrigere Frequenz/Vt verhindern Breath-Stacking/Auto-PEEP. Permissive Hyperkapnie (EtCO₂ bis ~55–60) akzeptieren, um Drücke niedrig zu halten.' },
      neonat:        { mode:'pcv', title:'Neonat / Pädiatrie / Kleinst-Exot', o2:'Nicht-Rückatem 200–300 ml/kg/min, 100 % O₂', af:'hoch: Neonat 20–40', ie:'1:2', pinsp:'niedrig, gedeckelt ~8–12 (nie > 15–20)', peep:'2–3', iso:'sehr volatilsensibel, hypothermie-/hypoglykämiegefährdet – niedrigste MAC, warmhalten', why:'Kleine Lungen sind leicht überbläht → Druckbegrenzung deckelt den Alveolardruck (Volutrauma-Schutz, wenn kleine Vt schwer messbar). Höhere Frequenz kompensiert das kleine Vt und die hohe CO₂-Produktion.' },
      weaning:       { mode:'simv', title:'Weaning / Aufwachen', o2:'100 % während Weaning, danach Maske/Flow-by', vt:'10 ml/kg mandatorisch', af:'schrittweise 8→6→4→2', tinsp:'1,0', peep:'3–5', psupp:'5–8', trigger:'F-Trig 1–2 L/min', iso:'gegen OP-Ende reduzieren/aus, damit Antrieb/CO₂-Antwort zurückkehren; Analgesie über Opioide', why:'Gestufte Übergabe der Atemarbeit an den Patienten (SIMV → VS → spontan) bestätigt Antrieb und Mechanik vor der Extubation. Apnoe-Backup durchgehend AN. Extubieren, wenn spontanes EtCO₂ ≤ 50, ausreichendes Vt/SpO₂ und Schluckreflex.' }
    },
    settingsBySpecies: {
      hund:        { rebreatheMin:7, o2:{mlkg:[30,100],min:0.5,note:'Kreissystem-Erhaltung: Low-Flow ~20–50, semi-geschlossen bis ~100 mL/kg/min; Einleitung/Wash-in & Nicht-Rückatmung höher'}, o2Induction:'2–3 L/min bzw. 3–5 min präoxygenieren', iso:{mac:1.3,maint:'1.5–2.5',induction:'3–5 %'}, tvMlKg:[10,15], rr:[8,12], pip:15, apl:'offen bei Spontanatmung; für Handbeatmung kurz schließen', fluidMlKgH:5, fluid:'VEL/Ringer-Laktat' },
      katze:       { rebreatheMin:7, o2:{mlkg:[30,100],min:0.3,note:'Kreissystem-Erhaltung Low-Flow ~20–50; kleine Patienten oft Nicht-Rückatmung (dann höher)'}, o2Induction:'1–2 L/min bzw. 3–5 min präoxygenieren', iso:{mac:1.6,maint:'1.5–2.5',induction:'3–5 %'}, tvMlKg:[10,15], rr:[8,14], pip:12, apl:'offen; Handbeatmung vorsichtig (kleiner Thorax)', fluidMlKgH:3, fluid:'VEL/Ringer-Laktat' },
      kaninchen:   { rebreatheMin:999, o2:{mlkg:[200,300],min:0.5,note:'Nicht-Rückatmung (Bain/T-Stück)'}, o2Induction:'Immer präoxygenieren 3–5 min (Maske)', iso:{mac:2.0,maint:'1.5–3',induction:'per Maske langsam steigern'}, tvMlKg:[8,12], rr:[20,40], pip:8, apl:'niedriger Druck – Barotrauma vermeiden', fluidMlKgH:4, fluid:'VEL/Ringer-Laktat (warm)' },
      meerschwein: { rebreatheMin:999, o2:{mlkg:[200,300],min:0.4,note:'Nicht-Rückatmung; Kammereinleitung möglich'}, o2Induction:'Präoxygenieren; Intubation schwierig → Maske/Larynxmaske', iso:{mac:1.15,maint:'1.5–3',induction:'per Maske/Kammer'}, tvMlKg:[8,12], rr:[20,60], pip:8, apl:'niedriger Druck', fluidMlKgH:4, fluid:'VEL/Ringer-Laktat (warm)' },
      chinchilla:  { rebreatheMin:999, o2:{mlkg:[200,300],min:0.3,note:'Nicht-Rückatmung; sehr narkoseanfällig'}, o2Induction:'Präoxygenieren; Masken-/Kammereinleitung (Intubation schwierig)', iso:{mac:1.4,maint:'1–3',induction:'per Maske/Kammer (bevorzugt)'}, tvMlKg:[8,12], rr:[40,80], pip:8, apl:'sehr niedriger Druck', fluidMlKgH:4, fluid:'VEL/Ringer-Laktat (warm)' },
      degu:        { rebreatheMin:999, o2:{mlkg:[200,300],min:0.2,note:'Sehr klein – Nicht-Rückatmung; Inhalation bevorzugt'}, o2Induction:'INHALATIONSNARKOSE bevorzugt (Kammer/Maske, Isofluran); Injektion nur wenn nötig', iso:{mac:1.4,maint:'1–3',induction:'per Kammer/Maske'}, tvMlKg:[8,12], rr:[40,90], pip:6, apl:'sehr niedriger Druck', fluidMlKgH:4, fluid:'VEL/Ringer-Laktat (warm)' },
      maus:        { rebreatheMin:999, o2:{mlkg:[200,400],min:0.5,note:'Sehr klein - Nicht-Rueckatmung; Inhalation bevorzugt'}, o2Induction:'3-5 % per Kammer oder Maske, dann Kammer 30 s mit 4 l/min spülen', iso:{mac:1.35,maint:'1.5-2.0',induction:'3-5 % per Kammer oder Maske, dann Kammer 30 s mit 4 l/min spülen'}, tvMlKg:[8,12], rr:[100,150], pip:12, apl:'sehr niedriger Druck', fluidMlKgH:10, fluid:'Ringer-Laktat oder NaCl 0,9 %, auf 35-36 °C angewärmt, ggf. mit Glukose 5 %. Praxis: 0,5-1 ml pro Tier s.c. (entspricht 20-40 ml/kg), Wieder' },
      ratte:       { rebreatheMin:999, o2:{mlkg:[200,300],min:0.3,note:'Sehr klein - Nicht-Rueckatmung; Inhalation bevorzugt'}, o2Induction:'3-5 % per Kammer oder Maske', iso:{mac:1.4,maint:'1.5-2.5',induction:'3-5 % per Kammer oder Maske'}, tvMlKg:[6,10], rr:[50,80], pip:12, apl:'sehr niedriger Druck', fluidMlKgH:10, fluid:'Ringer-Laktat oder NaCl 0,9 %, auf 35-36 °C angewärmt; bei Narkose > 60 min oder Jungtier Glukose 2,5-5 % zusetzen. Praxis: 10 ml/kg warm s.' },
      rennmaus:    { rebreatheMin:999, o2:{mlkg:[200,300],min:0.3,note:'Sehr klein - Nicht-Rueckatmung; Inhalation bevorzugt'}, o2Induction:'Kammer 4-5 % in 100 % O2, danach Maske 2-3 %, dann Erhaltung. Wegen der Krampfneigung: Tier ruhig und ohne Zwang in die Kammer setzen, kein Festhalten, kein lautes Zuschlagen des Deckels.', iso:{mac:1.55,maint:'1.2-2.5',induction:'Kammer 4-5 % in 100 % O2, danach Maske 2-3 %, dann Erhaltung. Wegen der Krampfneigung: Tie'}, tvMlKg:[8,12], rr:[60,110], pip:10, apl:'sehr niedriger Druck', fluidMlKgH:5, fluid:'Ringer-Laktat oder NaCl 0,9 %, koerperwarm. Erhaltung 75-100 mL/kg/Tag. Achtung: die Rennmaus ist ein Wuestentier mit stark konzentrierendem' },
      hamster:     { rebreatheMin:999, o2:{mlkg:[200,300],min:0.3,note:'Sehr klein - Nicht-Rueckatmung; Inhalation bevorzugt'}, o2Induction:'Kammer 4-5 % in 100 % O2 bis Kipplage (meist 60-120 s), danach Maske 2-3 % und zuegig auf Erhaltung zurueck; alternativ Maskeneinleitung ab 2 % in 0,5-%-Schritten', iso:{mac:1.62,maint:'1.5-3',induction:'Kammer 4-5 % in 100 % O2 bis Kipplage (meist 60-120 s), danach Maske 2-3 % und zuegig auf '}, tvMlKg:[8,12], rr:[50,100], pip:10, apl:'sehr niedriger Druck', fluidMlKgH:5, fluid:'Ringer-Laktat oder NaCl 0,9 %, koerperwarm (38 °C); Erhaltung 75-100 mL/kg/Tag = 3-4 mL/kg/h, intraoperativ 5-10 mL/kg/h. SC nur kleine Depo' },
      frettchen:   { rebreatheMin:999, o2:{mlkg:[200,300],min:0.3,note:'Nicht-Rückatmung (klein)'}, o2Induction:'Präoxygenieren; Masken-/Injektionseinleitung (Intubation mit kleinem Tubus möglich)', iso:{mac:1.5,maint:'1.5–3',induction:'per Maske / injektabel'}, tvMlKg:[8,12], rr:[15,30], pip:10, apl:'niedriger Druck', fluidMlKgH:4, fluid:'VEL/Ringer-Laktat (warm)' },
      reptil:      { rebreatheMin:999, o2:{mlkg:[100,300],min:0.2,note:'Sehr niedrige Ventilationsraten; oft Raumluft-Anteil'}, o2Induction:'POTZ-Temperatur sichern; Einleitung oft injektabel', iso:{mac:2.0,maint:'1–3',induction:'variabel'}, tvMlKg:[10,20], rr:[2,4], pip:6, apl:'sehr niedriger Druck', fluidMlKgH:2, fluid:'Reptilien-Ringer / warm' }
    }
  },

  /* =================== INFUSIONEN =================== */
  fluids: [
    { id:'vel', name:'Vollelektrolyt / Ringer-Laktat', use:'Standard-Kristalloid intraoperativ', rate:{hund:'3–5 mL/kg/h',katze:'2–3 mL/kg/h',exot:'2–4 mL/kg/h'}, bolus:{hund:'10–20 mL/kg über 10–15 min',katze:'5–10 mL/kg über 10–15 min'}, notes:'Erste Wahl bei Anästhesie-Hypotension/Volumenmangel; nach Bolus re-evaluieren.' },
    { id:'nacl', name:'NaCl 0.9 %', use:'Isotone Kochsalzlösung', rate:{hund:'wie VEL',katze:'wie VEL'}, bolus:{hund:'wie VEL'}, notes:'Bei Hyponatriämie-Vorsicht / spezielle Indikationen; kann hyperchlorämische Azidose machen.' },
    { id:'glucose', name:'Glukose 5 % / 2.5 %', use:'Bei Hypoglykämie / Neonaten / kleine Exoten', rate:{all:'als Zusatz zur Erhaltung'}, bolus:{all:'Dextrose 0.5–1 g/kg langsam IV bei Hypoglykämie'}, notes:'Nicht als alleinige Volumentherapie; BZ kontrollieren.' }
  ],

  info: 'Canis Anæsthesia ist ein multifunktioneller Notfall- und Dosierungs-Assistent für die Kleintier-Anästhesie (Hund, Katze, Kaninchen, Meerschweinchen, Reptil). Gib Tierart, Gewicht und Alter oben ein – alle Zwischenfall-Protokolle, Geräte-Einstellungen und Medikamenten-Dosen (mg und mL) werden für den Patienten berechnet. Das Modul bildet das Praxis-Gerät (Mindray Veta 5 Plus + uMEC12 Vet) als 3D-Scan ab und erklärt jedes Bedienelement. Es ist mit dem Blutwerte-Atlas, den Reiseerkrankungen und dem Stoffwechsel-Modul verknüpft.',
  sources: [
    { title:'ACVAA Small Animal Anesthesia and Sedation Monitoring Guidelines (2025), Veterinary Anaesthesia and Analgesia' },
    { title:'RECOVER 2024 — CPR-Leitlinien Kleintier, J Vet Emerg Crit Care (Burkitt-Creedon 10.1111/vec.13391; Wolf 10.1111/vec.13389)', url:'https://recoverinitiative.org/2024-guidelines/' },
    { title:'AAFP/ISFM Feline Anaesthesia Guidelines (2018), J Feline Med Surg' },
    { title:'Lumb & Jones Veterinary Anesthesia and Analgesia, 6. Auflage 2024' },
    { title:'Merck Veterinary Manual (2024) — Antiarrhythmics' },
    { title:'Côté E. — This Dog Has Ventricular Arrhythmias, WSAVA/VIN 2009 (AIVR: Frequenz entscheidet, nicht die Form)' },
    { title:'Piemontese u. a., The Veterinary Journal 2024 — 654 Hunde: SpO₂ < 95 % entspricht PaO₂ < 80 mmHg' },
    { title:'Rivas u. a., JVECC 2025 — SpO₂/FiO₂ beim beatmeten Hund; Calabro JVECC 2013 — oberhalb FiO₂ 0,3 sagt die SpO₂ wenig über den PaO₂' },
    { title:'JAVMA 2023;261(12) — 514 Splenektomien, 28 % ventrikuläre Arrhythmien' },
    { title:'Schoeller JVECC 2020 / Ranninger Vet Rec Case Rep 2019 — Magnesium bei Lidocain-refraktärer Ektopie' },
    { title:'Vet Anaesth Analg 2022 — Rekrutierung 15 cmH₂O über 30 s ebenso wirksam wie 25/35' },

    { title:'CliniPharm/CliniTox – vetpharm.uzh.ch (Universität Zürich)', url:'https://www.vetpharm.uzh.ch/' },
    { title:'Plumb’s Veterinary Drug Handbook' },
    { title:'BSAVA Small Animal Formulary / BSAVA Exotic Pets' },
    { title:'WSAVA Global Pain Council – Analgesie-Leitlinien' },
    { title:'ACVAA / AVA Anästhesie-Monitoring-Leitlinien' },
    { title:'RECOVER Initiative – CPR-Leitlinien Kleintier (2012, aktualisiert 2024)', url:'https://recoverinitiative.org/2024-guidelines/' },
    { title:'AAHA 2020 Anesthesia & Monitoring Guidelines (Dogs & Cats)', url:'https://www.aaha.org/resources/2020-aaha-anesthesia-and-monitoring-guidelines-for-dogs-and-cats/' },
    { title:'Clinician’s Brief – Anticholinergika + α2-Agonisten: Bradykardie NICHT mit Atropin/Glyco behandeln (Reflexbradykardie)', url:'https://www.cliniciansbrief.com/article/preanesthetic-drug-combinations' },
    { title:'Dexmedetomidin-Bradykardie im Kleintier (Clinician’s Brief) – Mechanismus & Management', url:'https://www.cliniciansbrief.com/article/heart-rate-veterinary-dexmedetomidine' },
    { title:'Lungenschonende Beatmung Kleintier – Tidalvolumen & Driving Pressure (J Vet Sci 2019)', url:'https://vetsci.org/DOIx.php?id=10.4142/jvs.2019.20.e21' },
    { title:'Carpenter – Exotic Animal Formulary' },
    { title:'Mindray Veta 5 Plus / uMEC12 Vet – Bedienungshandbücher' }
  ]
};

/* =================== MONITOR (uMEC12 Vet) =================== */
window.ANAES.monitor = {
  params: [
    { id:'hr',   name:'Herzfrequenz (EKG)',          abbr:'HF',    unit:'/min', color:'#28e07a', vital:'hr',
      explain:'EKG-Ableitung II – Rhythmus + Frequenz. Achte auf Arrhythmien (VES, AV-Block, Vorhofflimmern). Frequenz-Normbereich ist art- & gewichtsabhängig.',
      lowInc:'bradykardie', highInc:'tachykardie' },
    { id:'spo2', name:'Sauerstoffsättigung (Pleth)', abbr:'SpO₂',  unit:'%',    color:'#00d8ff', vital:'spo2',
      explain:'Pulsoxymetrie (Zunge/Ohr/Pfote). ≥ 95 % (auf 100 % O₂ ~99 %). Das Plethysmogramm zeigt die Perfusion; SpO₂ reagiert verzögert (~30 s) → Kapnograf ist schneller.',
      lowInc:'hypoxaemie' },
    { id:'etco2',name:'End-CO₂ (Kapnograf)',         abbr:'EtCO₂', unit:'mmHg', color:'#ffd166', vital:'etco2',
      explain:'Sidestream-Kapnografie – bestätigt Intubation + Ventilation. Die KURVENFORM ist der wichtigste Frühwarner (Diskonnektion, Rückatmung, Obstruktion). Ziel 35–45 mmHg; unter GA ist permissive Hyperkapnie bis ~55 tolerierbar, ab >60 kontrolliert beatmen (IPPV). Low-Alarm <30 (Hyperventilation/niedriges HZV/Diskonnektion/Apnoe). EtCO₂ liegt ~5–10 mmHg unter PaCO₂. Reptil: nur Trend (unzuverlässig).',
      lowInc:'apnoe', highInc:'hypoventilation' },
    { id:'nibp', name:'Blutdruck (NIBP)',            abbr:'MAP',   unit:'mmHg', color:'#f35588', vital:'map',
      explain:'Oszillometrische Manschette (Pfote/Schwanz). SYS/DIA eingeben – MAP = DIA + (SYS−DIA)/3. Zweistufig: WARNUNG MAP < 70 / SAP < 90 (Ursache suchen, Iso senken, Volumen/Bradykardie prüfen) · HANDELN MAP < 60 (Kristalloid-Bolus, Verdampfer runter, ggf. Anticholinergikum, dann Inotropikum/Vasopressor). Ziel MAP 60–70+. MAP > 120–130 = Hypertonie. Oszillometrie unzuverlässig bei sehr niedrigem/hohem Druck, Arrhythmie & Bewegung; Manschettenbreite ≈ 30–40 % des Umfangs, auf Herzhöhe halten; bei zweifelhaftem Wert Trend + Doppler/arteriell. Häufigste Narkose-Hypotension: Isofluran zu hoch → zuerst Verdampfer runter.',
      lowInc:'hypotension', highInc:'hypertension' },
    { id:'rr',   name:'Atemfrequenz (Resp)',         abbr:'AF',    unit:'/min', color:'#a78bfa', vital:'rr',
      explain:'Spontan oder beatmet. Hohe AF + hohes EtCO₂ = Hypoventilation trotz schneller Atmung → assistiert beatmen.',
      lowInc:'apnoe', highInc:'tachypnoe' },
    { id:'temp', name:'Temperatur',                  abbr:'Temp',  unit:'°C',   color:'#ff8c6b', vital:'temp',
      explain:'Ösophageal/rektal. Fällt unter Narkose rasch (v.a. kleine Patienten & Exoten) → Isofluran-Bedarf sinkt, sonst relative Überdosis.',
      lowInc:'hypothermie', highInc:'hyperthermie' }
  ],
  /* Szenarien: morphen Kurven + Werte, feuern Alarm, verlinken ins Protokoll.
     hr/rr: 'brady'|'tachy'|'asys'|'normal'|Zahl · spo2/etco2/nibp: 'normal'|Zahl */
  scenarios: [
    { id:'normal',  name:'Normal / stabil',              incident:null,           alarm:'',
      hr:'normal', rr:'normal', spo2:'normal', etco2:'normal', nibp:'normal', ekg:'normal', pleth:'normal', capno:'normal' },
    { id:'brady',   name:'Bradykardie',                  incident:'bradykardie',  alarm:'HF NIEDRIG',
      hr:'brady', rr:'normal', spo2:'normal', etco2:'normal', nibp:60, ekg:'slow', pleth:'normal', capno:'normal' },
    { id:'tachy',   name:'Tachykardie',                  incident:'tachykardie',  alarm:'HF HOCH',
      hr:'tachy', rr:'normal', spo2:'normal', etco2:'normal', nibp:'normal', ekg:'fast', pleth:'normal', capno:'normal' },
    { id:'hypox',   name:'Hypoxämie (SpO₂ ↓)',           incident:'hypoxaemie',   alarm:'SpO₂ NIEDRIG',
      hr:'tachy', rr:'normal', spo2:85, etco2:'normal', nibp:'normal', ekg:'fast', pleth:'weak', capno:'normal' },
    { id:'hypovent',name:'Hypoventilation (EtCO₂ ↑)',    incident:'hypoventilation', alarm:'EtCO₂ HOCH',
      hr:'normal', rr:6, spo2:'normal', etco2:62, nibp:'normal', ekg:'normal', pleth:'normal', capno:'high' },
    { id:'rebreath',name:'CO₂-Rückatmung (Atemkalk?)',   incident:'hypoventilation', alarm:'FiCO₂ ERHÖHT',
      hr:'normal', rr:'normal', spo2:'normal', etco2:54, nibp:'normal', ekg:'normal', pleth:'normal', capno:'baseline' },
    { id:'obstruct',name:'Obstruktion / Bronchospasmus', incident:'hypoxaemie',   alarm:'KAPNO: HAIFISCH',
      hr:'tachy', rr:'normal', spo2:92, etco2:50, nibp:'normal', ekg:'fast', pleth:'weak', capno:'shark' },
    { id:'diskon',  name:'Diskonnektion / Apnoe',        incident:'apnoe',        alarm:'APNOE – KEIN CO₂',
      hr:'normal', rr:0, spo2:88, etco2:0, nibp:'normal', ekg:'normal', pleth:'normal', capno:'flat' },
    { id:'hypoton', name:'Hypotension (MAP ↓)',          incident:'hypotension',  alarm:'MAP NIEDRIG',
      hr:'normal', rr:'normal', spo2:'normal', etco2:'normal', nibp:45, ekg:'normal', pleth:'weak', capno:'normal' },
    { id:'cpr',     name:'Herzstillstand',               incident:'asystolie',    alarm:'ASYSTOLIE → CPR',
      hr:0, rr:0, spo2:70, etco2:8, nibp:0, ekg:'asys', pleth:'flat', capno:'low' }
  ]
};

/* =================== KAPNOGRAF-MUSTER =================== */
window.ANAES.capno = [
  { id:'normal',   name:'Normal',                          etco2:'35–45', incident:null,
    meaning:'Rechteckige Kurve: rascher exspiratorischer Anstieg, ebenes alveoläres Plateau, Rückkehr auf 0. Intubation + Ventilation in Ordnung.', react:'Alles gut – weiter überwachen.' },
  { id:'high',     name:'Hypoventilation',                 etco2:'> 45–55', incident:'hypoventilation',
    meaning:'Normale Form, aber erhöhtes Plateau. Zu flache Atmung, zu tiefe Narkose, Opioid, Zwerchfelldruck.', react:'Kontrolliert beatmen (IPPV), Isofluran reduzieren.' },
  { id:'low',      name:'Hyperventilation',                etco2:'< 35', incident:'tachypnoe',
    meaning:'Normale Form, niedriges Plateau. Zu schnelle/tiefe Beatmung, Hypothermie, niedriges Herzzeitvolumen.', react:'Beatmung reduzieren; Kreislauf/Temperatur prüfen.' },
  { id:'baseline', name:'Rückatmung (Atemkalk erschöpft)', etco2:'Basis > 0', incident:'hypoventilation',
    meaning:'Kurve kehrt nicht auf 0 zurück (FiCO₂ ↑) – eingeatmetes CO₂. Atemkalk verbraucht, zu geringer Frischgasfluss oder defektes Ventil.', react:'Atemkalk wechseln, Frischgasfluss erhöhen, Ventile prüfen.' },
  { id:'shark',    name:'Obstruktion / Bronchospasmus',    etco2:'variabel', incident:'hypoxaemie',
    meaning:'„Haifischflosse": verzögerter, schräger Anstieg, kein scharfes Plateau. Bronchospasmus, geknickter/teilverlegter Tubus, felines Asthma.', react:'Tubus prüfen/absaugen; Bronchospasmus behandeln; O₂ 100 %.' },
  { id:'flat',     name:'Nulllinie – Apnoe / Diskonnektion / ösophageal', etco2:'0', incident:'apnoe',
    meaning:'Kein CO₂. Diskonnektion, Apnoe, Herzstillstand, ösophageale Intubation oder komplett verlegter Tubus.', react:'SOFORT Tubuslage + Kreissystem prüfen, beatmen; kein Puls → CPR.' },
  { id:'cleft',    name:'Curare-Kerbe (Eigenatmung)',      etco2:'35–45', incident:'tachypnoe',
    meaning:'Einkerbung im Plateau: Patient versucht selbst zu atmen (nachlassende Relaxierung / zu flach).', react:'Narkosetiefe / Relaxierung prüfen.' },
  { id:'rise',     name:'Plötzlicher EtCO₂-Anstieg',       etco2:'↑', incident:'asystolie',
    meaning:'Sprunghafter Anstieg: Wiederkehr des Kreislaufs (ROSC) unter CPR – oder plötzliche Hypoventilation/Hyperthermie.', react:'Unter CPR: gutes Zeichen (ROSC) – Puls prüfen.' }
];

/* =================== EKG-RHYTHMEN (Station 31) ===================
   w = Wellenform-Flags für den Generator wEkg():
     p:P-Welle · pq:PQ-Faktor(1|Zahl|'inc'Wenckebach|'diss'AV-Dissoziation) ·
     qrs:Breitenfaktor(1 schmal, ~2.4 breit) · drop:'wenckebach'|'mobitz2'|null ·
     ratio:Ausfall alle n · rate:Frequenzfaktor · ectopic:'ves'|'sves' ·
     irregular:VHF · flutter:Sägezahn · chaos:Kammerflimmern · flat:Asystolie */
window.ANAES.ekg = [
  { id:'sinus', name:'Sinusrhythmus', kind:'normal', incident:null, severity:1, emergency:false,
    recognize:'Vor jedem QRS eine P-Welle, PQ konstant, QRS schmal, RR regelmäßig.',
    cause:'Physiologisch / adäquate Narkosetiefe.', w:{p:true,pq:1,qrs:1,drop:null,rate:1} },
  { id:'sinusbrady', name:'Sinusbradykardie', kind:'brady', incident:'bradykardie', severity:3, emergency:false,
    recognize:'Wie Sinus, aber RR deutlich verlängert, HF unter Norm.',
    cause:'Zu tiefe Narkose (Iso hoch), Opioide/α2, Vagotonus, Hypothermie, Hyperkaliämie.', w:{p:true,pq:1,qrs:1,drop:null,rate:0.45} },
  { id:'sinustachy', name:'Sinustachykardie', kind:'tachy', incident:'tachykardie', severity:2, emergency:false,
    recognize:'Regelmäßig, P vor QRS, QRS schmal, RR kurz, HF über Norm.',
    cause:'Zu flache Narkose/Schmerz, Hypovolämie, Hyperkapnie, Hyperthermie, Katecholamine.', w:{p:true,pq:1,qrs:1,drop:null,rate:1.9} },
  { id:'avb1', name:'AV-Block I°', kind:'block', incident:'bradykardie', severity:2, emergency:false,
    recognize:'PQ-Zeit konstant VERLÄNGERT, aber jedem P folgt ein QRS. Meist benigne, beobachten.',
    cause:'Vagotonus, α2-Agonisten/Opioide, AV-Knoten-Erkrankung, Elektrolyte.', w:{p:true,pq:2.1,qrs:1,drop:null,rate:0.8} },
  { id:'avb2a', name:'AV-Block II° Mobitz I (Wenckebach)', kind:'block', incident:'bradykardie', severity:3, emergency:false,
    recognize:'PQ wird von Schlag zu Schlag LÄNGER, bis ein QRS ausfällt (Lücke).',
    cause:'Hoher Vagotonus, α2-Agonisten, tiefe Narkose.', w:{p:true,pq:'inc',qrs:1,drop:'wenckebach',ratio:4,rate:0.7} },
  { id:'avb2b', name:'AV-Block II° Mobitz II', kind:'block', incident:'bradykardie', severity:4, emergency:false,
    recognize:'PQ KONSTANT, dann fällt unvermittelt ein QRS aus. Kaum Atropin-responsiv (infranodal, His-Purkinje); kann plötzlich in III° kippen → EKG-Wachsamkeit + Pacing-Bereitschaft (transkutan/temporär), elektiv-symptomatisch Kardio-Konsil.',
    cause:'His-Purkinje-/Myokarderkrankung, Medikamenten-/Elektrolyteffekt.', w:{p:true,pq:1.3,qrs:1,drop:'mobitz2',ratio:3,rate:0.75} },
  { id:'avb3', name:'AV-Block III° (total)', kind:'block', incident:'bradykardie', severity:5, emergency:true,
    recognize:'P-Wellen und QRS ohne festen Bezug (Dissoziation), QRS langsam & oft breit. NOTFALL.',
    cause:'Fortgeschrittene Leitungserkrankung, schwere Hyperkaliämie, Digoxin-Toxizität.', w:{p:true,pq:'diss',qrs:2.2,drop:null,rate:0.35} },
  { id:'sves', name:'Supraventrikuläre Extrasystole (SVES)', kind:'ectopic', incident:null, severity:2, emergency:false,
    recognize:'Vorzeitiger, SCHMALER QRS; P abnorm/versteckt; keine voll kompensatorische Pause.',
    cause:'Vorhofdehnung, Elektrolyte, Katecholamine – meist wenig bedrohlich.', w:{p:true,pq:1,qrs:1,drop:null,rate:1,ectopic:'sves'} },
  { id:'ves', name:'Ventrikuläre Extrasystole (VES/PVC)', kind:'ectopic', incident:'tachykardie', severity:3, emergency:false,
    recognize:'BREITER, vorzeitiger QRS OHNE P, T entgegengesetzt, danach kompensatorische Pause.',
    cause:'Hypoxie/Hyperkapnie, falsche Narkosetiefe, Elektrolyte (K⁺/Mg²⁺), Myokardreizung (GDV/Milz), Katecholamine.', w:{p:true,pq:1,qrs:1,drop:null,rate:0.9,ectopic:'ves'} },
  { id:'vtach', name:'Ventrikuläre Tachykardie', kind:'tachy', incident:'tachykardie', severity:5, emergency:true,
    recognize:'Schnelle, regelmäßige, BREITE QRS-Serie ohne P-Wellen; RR kurz. Perfusion prüfen!',
    cause:'Wie VES, ausgeprägter; Myokardhypoxie/-erkrankung, schwere Elektrolytstörung.', w:{p:false,pq:1,qrs:2.4,drop:null,rate:2.2} },
  { id:'afib', name:'Vorhofflimmern', kind:'tachy', incident:'tachykardie', severity:3, emergency:false,
    recognize:'KEINE P-Wellen (flimmernde Grundlinie), QRS schmal, RR unregelmäßig-unregelmäßig.',
    cause:'Vorhofdilatation (DCM/Klappe), große Rassen; kein Akut-Sofortmedikament intraop.', w:{p:false,pq:1,qrs:1,drop:null,rate:1.6,irregular:true} },
  { id:'aflutter', name:'Vorhofflattern', kind:'tachy', incident:'tachykardie', severity:3, emergency:false,
    recognize:'SÄGEZAHN-Grundlinie (Flatterwellen), QRS schmal, oft regelmäßige Überleitung (2:1).',
    cause:'Vorhoferkrankung, Reentry, strukturelle Herzerkrankung.', w:{p:false,pq:1,qrs:1,drop:null,rate:1.4,flutter:true} },
  { id:'vfib', name:'Kammerflimmern', kind:'arrest', incident:'asystolie', severity:5, emergency:true,
    recognize:'CHAOTISCHE, unregelmäßige Grundlinie ohne abgrenzbare QRS. Kein Puls → CPR + Defibrillation.',
    cause:'Myokardhypoxie, schwere Elektrolytstörung, Endpunkt vieler Notfälle.', w:{p:false,pq:1,qrs:1,drop:null,rate:1,chaos:true} },
  { id:'asys', name:'Asystolie', kind:'arrest', incident:'asystolie', severity:5, emergency:true,
    recognize:'Flache NULLLINIE (keine P, kein QRS). Sofort CPR.',
    cause:'Endpunkt schwerer Hypoxie/Hyperkaliämie/tiefer Narkose, progrediente Bradykardie.', w:{p:false,pq:1,qrs:1,drop:null,rate:1,flat:true} }
];

/* =================== BEDIENUNG / STARTSEQUENZ =================== */
window.ANAES.operating = {
  title:'Startsequenz Mindray Veta 5 Plus (Praxis-Ablauf)',
  steps:[
    { t:'Beide Bildschirme einschalten', d:'Monitor oben (uMEC12 Vet) und Narkose-/Ventilator-Bildschirm unten (Veta 5 Plus).' },
    { t:'Monitor: Tierart & Gewicht eingeben', d:'Oben Tierart und Körpergewicht eingeben – bestimmt die Alarmgrenzen und Referenzwerte.' },
    { t:'Ventilator: System-/Dichtheitsprüfung', d:'Unten Systemüberprüfung durchführen. Wenig Zeit → auf Standby → „Fall starten".' },
    { t:'ACGO-Schalter wählen', d:'OFF = großes Kreissystem (Rückatmung, größere Tiere); ON = kleines Nicht-Rückatemsystem (kleine Patienten).' },
    { t:'APL/ABL auf 2–3 (offen)', d:'APL-Ventil normal offen (MIN/2–3). Für Handbeatmung kurz erhöhen, danach sofort wieder öffnen.' },
    { t:'Atembeutel-Volumen anpassen', d:'Beutelgröße nach Gewicht: < 10 kg 0.5–1 L · 10–30 kg 2 L · > 30 kg 3 L.' },
    { t:'Atemkalk prüfen', d:'CO₂-Absorber ansehen – Farbumschlag = verbraucht → Kalk wechseln.' },
    { t:'Balg / Lungenvolumen anpassen (bei Beatmung)', d:'Groß > 30 kg, Klein < 30 kg (Bellows „UNTER 30KG"). Atemzugvolumen 10–15 mL/kg (siehe Einstellungen).' },
    { t:'Sauerstoff einstellen', d:'O₂ an, Frischgasfluss ≈ 1–1.5 L/min – an Patient/System anpassen (siehe Tab „Einstellungen").' },
    { t:'Isofluran einstellen', d:'Verdampfer an, Erhaltung ≈ 1.5–2 Vol% (nach Patient & Narkosetiefe titrieren; Einleitung höher).' },
    { t:'Beatmung: Manuell → ggf. Automatisch', d:'Erst manuell/beobachten; wenn Spontanatmung nicht ausreicht → Auto/IPPV (VCV oder PCV).' }
  ],
  safety:[
    'APL-Ventil NIE geschlossen lassen (Barotrauma-Gefahr).',
    'Vor O₂-Flush den Patienten diskonnektieren (Flush umgeht den Verdampfer, verdünnt Narkosegas).',
    'Absorber-Farbumschlag = Atemkalk sofort wechseln.',
    'Kapnograf ist der schnellste Alarm – bei Nulllinie zuerst Tubus & Kreissystem prüfen.',
    'Vor Extubation: Schluckreflex, Kieferspannung, stabile SpO₂.'
  ]
};

/* =================== INJEKTIONSNARKOSE (ohne Narkosegerät) ===================
   Kombinationen für Einleitung / Nachdosierung / Sedierung pro Tierart.
   comp: {n:Name, mgkg:[lo,hi], conc:mg/mL, u} ODER {n, mlkg:[lo,hi]} (Fertigpräparat).
   Quellen: Plumb's, BSAVA/Carpenter Exotic Formulary, Fachinfos (Ketamin 10%,
   L-Polamivet, Narketan, Domitor/Antisedan), Hedenqvist u.a. (siehe Recherche).
   Reine Spontanatmung → O₂ + Monitoring + Antagonisten bereithalten. */
window.ANAES.injection = [
  { id:'h-xylpola', sp:'hund', kind:'Einleitung', name:'Xylazin + L-Polamivet', route:'IM (Mischspritze)', onset:'5–10 min', duration:'30–60 min (langer Nachschlaf)',
    indication:'Neuroleptanalgesie / operationsfähiger Zustand ohne Gerät (Praxis-Wandprotokoll). Beide Med. in EINER Mischspritze i.m.; IV möglich, dann erst ½–⅔ nach Wirkung.',
    comp:[ {n:'Xylazin (Rompun 2%) · 0,1 mL/kg', mgkg:[2,2], conc:20},
           {n:'L-Polamivet (Levometh. 2,5 mg/mL + Fenpipramid) · 0,2 mL/kg (immer ausdosiert)', mlkg:[0.2,0.2]} ],
    expect:'HF: Xylazin-Bradykardie, durch Fenpipramid abgepuffert (oft normal/leicht ↑). Atmung: langsam & flach (Opioid+α2). BD: initial ↑ (α2), später ↓. SpO₂: bei Raumluft ↓ → O₂ geben!',
    topup:'h-topup', reversal:['atipamezol','naloxon'],
    cautions:'⚠ Xylazin-Gesamtdosis kappen: max 2,0 mL (>40 kg 2,5 mL; >60 kg 3,0 mL). Ausnahmen – nur ½–⅔ der Spritze i.m. (oder nach Wirkung i.v.): Boxer, Bulldoggen, Hunde <7 Monate, Herzpatienten. Bei MANIFESTER Herzerkrankung/Arrhythmie α2 ganz meiden (Xylazin laut SPC kontraindiziert) – Anticholinergikum bereit. α2+µ-Opioid = ausgeprägte Bradykardie/AV-Block; Naloxon demaskiert Fenpipramid → massive Tachykardie. Langer Nachschlaf, Hypothermie. (SPC-konforme Neuroleptanalgesie.)' },
  { id:'h-ketxyl', sp:'hund', kind:'Einleitung', name:'Ketamin + Xylazin (IM)', route:'IM', onset:'3–7 min', duration:'~20–30 min',
    indication:'Feld-Standard; Ketamin gleicht α2-Bradykardie teils aus, erhält Reflexe.',
    comp:[ {n:'Ketamin 10%', mgkg:[6,10], conc:100}, {n:'Xylazin (Rompun 2%)', mgkg:[2,2], conc:20} ],
    expect:'HF: eher gehalten/leicht ↑ (Ketamin sympathomimetisch). BD: ↑ (Ketamin). Atmung: apneustisch (unregelmäßig), Reflexe erhalten. Kein Aspirationsschutz.',
    topup:'h-topup', reversal:['atipamezol'],
    cautions:'Ketamin beim Hund NIE allein (Rigidität/Krämpfe). Keine Muskelrelaxation ohne α2. Bei Überdosis Ketamin → Diazepam 0,5 mg/kg IV.' },
  { id:'h-xylketiv', sp:'hund', kind:'Einleitung', name:'Xylazin → Ketamin (IV)', route:'IV', onset:'sofort', duration:'12–15 min',
    indication:'IV-Einleitung bei liegendem Zugang; kurze chirurgische Toleranz.',
    comp:[ {n:'Xylazin (zuerst)', mgkg:[1.1,1.1], conc:20}, {n:'Ketamin (nach 2–3 min, langsam)', mgkg:[1.65,2.2], conc:100} ],
    expect:'Wirkung praktisch sofort; IV-Dosis nur ¼–⅓ der IM-Dosis. Atemdepression bei zu schneller Gabe.',
    topup:'h-topup', reversal:['atipamezol'],
    cautions:'Ketamin langsam über ~60 s IV – zu schnell → Apnoe. Ruhe bei Ein-/Ausleitung.' },
  { id:'h-topup', sp:'hund', kind:'Nachdosierung', name:'Narkodorm (Pentobarbital) mit NaCl verdünnt', route:'IV, titriert', onset:'—', duration:'verlängert je Bolus',
    indication:'Vertiefung mit Barbiturat, in 0,9 % NaCl verdünnt, nach Wirkung titriert.',
    comp:[ {n:'Narkodorm (Pentobarbital) verdünnt', titr:'Nach Wirkung titrieren (kein fixes Schema) – stark atemdepressiv, kumulativ, KEIN Antidot.'} ],
    expect:'HF gehalten/↓. Atmung langsam & flach → EtCO₂ ↑ (Hypoventilation). BD ↓. SpO₂ bei Raumluft ↓. Ohne Gerät staut sich CO₂!',
    scenario:{hr:72,spo2:93,etco2:66,rr:6,sys:104,dia:66,rhythm:'sinus'}, reversal:[], incident:'hypoventilation',
    cautions:'Barbiturat hat KEIN Antidot → bei EtCO₂ ↑ beatmen (intubieren + Beutel/Ambu), NICHT weiter nachlegen. Kumulativ, enge therapeutische Breite.' },
  { id:'h-topup2', sp:'hund', kind:'Nachdosierung', name:'2 Spritzen: Xylazin (NaCl) + Narkodorm (NaCl)', route:'IV, getrennt titriert', onset:'—', duration:'verlängert',
    indication:'Xylazin (verdünnt) in einer Spritze, Narkodorm (verdünnt) in zweiter Spritze – getrennt nach Wirkung.',
    comp:[ {n:'Xylazin (reduziert, verdünnt)', mgkg:[0.5,1], conc:20}, {n:'Narkodorm (Pentobarbital) verdünnt', titr:'nach Wirkung – kein Antidot, kumulativ.'} ],
    expect:'Additiv: Xylazin-Bradykardie + Barbiturat-Atemdepression → EtCO₂ ↑↑, HF ↓↓, BD ↓, SpO₂ ↓. Höchstes Hypoventilations-Risiko.',
    scenario:{hr:46,spo2:90,etco2:72,rr:5,sys:96,dia:58,rhythm:'sinusbrady'}, reversal:['atipamezol'], incident:'hypoventilation',
    cautions:'Xylazin antagonisierbar (Atipamezol/Yohimbin), Barbiturat NICHT → Beatmung tragend. Bradykardie: erst Hypoxie/Hyperkapnie/Tiefe beheben, dann ggf. Anticholinergikum.' },
  { id:'h-topupk', sp:'hund', kind:'Nachdosierung', name:'Ketamin (± Xylazin) mit NaCl verdünnt', route:'IV/IM', onset:'—', duration:'verlängert',
    indication:'Alternative: ⅓–½ der Einleitungsdosis, v. a. Ketamin.',
    comp:[ {n:'Ketamin (verdünnt)', mgkg:[2,5], conc:100} ],
    expect:'Ketamin hält HF/BD eher; bei Wiederholung Xylazin reduzieren (kumuliert → Bradykardie/Aufwachverzögerung).',
    reversal:['atipamezol'],
    cautions:'NICHT nachdosieren bei EtCO₂ >55–60, flacher Atmung, SpO₂ <95 % oder Hypotonie → beatmen/antagonisieren.' },
  { id:'h-medbut', sp:'hund', kind:'Sedierung', name:'Medetomidin + Butorphanol', route:'IM (IV niedriger)', onset:'5–10 min', duration:'~30–60 min (reversibel)',
    indication:'Tiefe reversible Analgosedierung (Diagnostik, Röntgen, kleine Wundversorgung).',
    comp:[ {n:'Medetomidin (Domitor)', mgkg:[0.005,0.02], conc:1}, {n:'Butorphanol', mgkg:[0.1,0.4], conc:10} ],
    expect:'HF: ausgeprägte Bradykardie/AV-Block (α2). BD: initial ↑ dann ↓. Atmung: mild deprimiert. Voll reversibel (Atipamezol).',
    reversal:['atipamezol'],
    cautions:'Nicht bei kardiovaskulär instabilen Tieren. Dexmedetomidin = halbe µg-Dosis. Atipamezol = gleiches Volumen wie Domitor.' },
  { id:'h-dexbutor', sp:'hund', kind:'Sedierung', name:'Dexdomitor + Butorphanol (tiefe Sedation)', route:'IM', onset:'5–10 min', duration:'~30–60 min (reversibel)',
    indication:'Tiefe Sedation & Analgesie ohne Gerät (Praxis-Wandtabelle Dexdomitor 300 µg/m²). Kombination wirkt tiefer & analgetischer als Dexdomitor allein.',
    comp:[ {n:'Dexmedetomidin (Dexdomitor 0,5 mg/mL) 300 µg/m² IM', titr:'Nach Körperoberfläche (Wandtabelle, NICHT linear zum kg): 2–3 kg 0,12 · 4–5 kg 0,2 · 5–10 kg 0,25 · 10–13 kg 0,3 · 15–20 kg 0,4 · 20–25 kg 0,5 · 30–33 kg 0,6 · 37–45 kg 0,7 · 45–50 kg 0,8 · 60–65 kg 0,95 · 70–80 kg 1,1 · >80 kg 1,2 mL'},
           {n:'Butorphanol · 0,1 mg/kg (0,01 mL/kg)', mgkg:[0.1,0.1], conc:10} ],
    expect:'Ausgeprägte Bradykardie/AV-Block + initiale Hypertonie, dann ↓MAP (α2), blasse Schleimhäute; mild atemdeprimiert; voll reversibel.',
    reversal:['atipamezol'],
    cautions:'Nicht bei Herz-/Schock-/Hypovolämiepatient. Atipamezol (Antisedan 5 mg/mL) = GLEICHES Volumen wie Dexdomitor i.m. – hebt Sedation, Analgesie UND kardiovaskuläre Effekte auf. O₂ bereithalten.' },

  { id:'k-medket', sp:'katze', kind:'Einleitung', name:'Medetomidin + Ketamin', route:'IM', onset:'3–4 min', duration:'30–60 min',
    indication:'Standard-Injektionsnarkose der Katze; oft + Opioid (Kastration). Praxis-Wandtabelle: Domitor 0,08 + Ketamin 0,05 + Antisedan 0,04 mL/kg.',
    comp:[ {n:'Medetomidin (Domitor 1 mg/mL) · 0,08 mL/kg', mgkg:[0.08,0.08], conc:1}, {n:'Ketamin 10% · 0,05 mL/kg', mgkg:[5,5], conc:100} ],
    expect:'HF: Bradykardie, blasse Schleimhäute (Vasokonstriktion). Atmung: deprimiert, Apnoe/Hypoxämie möglich → O₂! Erbrechen bei Injektion häufig.',
    topup:'k-topup', reversal:['atipamezol'],
    cautions:'Atipamezol Katze = HALBES Volumen (2,5× Med-µg) = 0,04 mL/kg. O₂ (Maske/Sonde) bereithalten.' },
  { id:'k-dexket', sp:'katze', kind:'Einleitung', name:'Dexdomitor + Ketamin (Zoetis-Label)', route:'IM', onset:'Einleitung ~10 min nach Prämed', duration:'30–45 min',
    indication:'Praxis-Wandtabelle (Zoetis): Dexdomitor 40 µg/kg (0,08 mL/kg) als Prämed, 10 min später Ketamin 5 mg/kg (0,05 mL/kg) einleiten. Optional Butorphanol 0,4 mg/kg für mehr Analgesie. Dexdomitor ALLEIN (0,08 mL/kg) = Sedation/Analgesie.',
    comp:[ {n:'Dexmedetomidin (Dexdomitor 0,5 mg/mL) · 0,08 mL/kg', mgkg:[0.04,0.04], conc:0.5}, {n:'Ketamin 10% · 0,05 mL/kg (10 min später)', mgkg:[5,5], conc:100}, {n:'Butorphanol (optional) · 0,04 mL/kg', mgkg:[0.4,0.4], conc:10} ],
    expect:'Bradykardie/AV-Block + initiale Hypertonie → dann ↓MAP (α2), blasse Schleimhäute; Apnoe/Hypoxämie möglich → O₂.',
    topup:'k-topup', reversal:['atipamezol'],
    cautions:'Antisedan (5 mg/mL) = HALBES Volumen des Dexdomitor i.m. Nach Ketamin-Kombi erst ~30 min warten (bis Ketamin größtenteils eliminiert). Tier vor der Injektion beruhigen, ruhige Umgebung. ⚠ Butorphanol-Zusatz ist bei der Katze OFF-LABEL – FDA-Warnung: Todesfälle bei Dexmed+Ketamin+Butorphanol gemeldet → nur gesundes Tier, volle Überwachung/Antagonist bereit. Butorphanol nur milde/kurze Analgesie – für schmerzhafte Eingriffe µ-Opioid (Methadon/Buprenorphin) ergänzen.' },
  { id:'k-xylket', sp:'katze', kind:'Einleitung', name:'Xylazin + Ketamin', route:'IM/IV', onset:'3–5 min', duration:'20–40 min',
    indication:'Praxis: Xylazin 0,2 mL + Ketamin 0,3 mL i.m. PRO KATZE (dicke Kater 0,3/0,4 mL) – Fixvolumen. Nachdosierung: gleiche Menge verdünnt mit NaCl → 1/3.',
    comp:[ {n:'Xylazin (Rompun 2%) · 0,2 mL (dick 0,3)', mgkg:[1,1], conc:20}, {n:'Ketamin 10% · 0,3 mL (dick 0,4)', mgkg:[7.5,7.5], conc:100} ],
    expect:'Wie Med/Ket, stärkere Hypotonie. Nachdosierung Ketamin (verdünnt).',
    topup:'k-topup', reversal:['atipamezol','yohimbin'],
    cautions:'Fixvolumen pro Katze (≈ Xyl 1 / Ket 7,5 mg/kg bei 4 kg); an Gewicht/Zustand anpassen. Xylazin nicht nachdosieren (Hypotonie). Katze empfindlich – niedrig/langsam.' },
  { id:'k-kittymagic', sp:'katze', kind:'Einleitung', name:'„Kitty Magic" (Dexmedetomidin + Ket + Butorphanol)', route:'IM', onset:'3–5 min', duration:'30–45 min',
    indication:'Immobilisation/kurze Eingriffe, eine Injektion (1:1:1-Gemisch, ~0,022 mL/kg).',
    comp:[ {n:'Dexmedetomidin (0,5 mg/mL)', mgkg:[0.011,0.011], conc:0.5}, {n:'Ketamin 10%', mgkg:[2.2,2.2], conc:100}, {n:'Butorphanol', mgkg:[0.22,0.22], conc:10} ],
    expect:'Gleiche Volumina Dex(0,5)/Ket(100)/Butorphanol(10) = MODERATE Sedation. Bradykardie, Hypoxämie möglich → O₂ obligat.',
    topup:'k-topup', reversal:['atipamezol'],
    cautions:'Dies ist eine Sedations-, KEINE volle Chirurgie-Dosis. Für chirurgische Anästhesie höher: Dexmedetomidin 0,02–0,04 + Ketamin 4–5 + Butorphanol 0,3–0,4 mg/kg IM (bzw. Medetomidin ~2× die Dex-µg). Atipamezol = HALBES Dexdomitor-Volumen; nicht < 30–40 min nach Ketamin.' },
  { id:'k-topup', sp:'katze', kind:'Nachdosierung', name:'Xylazin + Ketamin mit NaCl verdünnt', route:'IV/IM, titriert', onset:'—', duration:'verlängert',
    indication:'Praxis: Xylazin + Ketamin (reduziert) in NaCl verdünnt nachdosieren.',
    comp:[ {n:'Xylazin (reduziert)', mgkg:[0.5,1], conc:20}, {n:'Ketamin (verdünnt)', mgkg:[2,5], conc:100} ],
    expect:'Ketamin hält HF/BD, Xylazin bremst wieder → EtCO₂ kann ↑, Bradykardie möglich.',
    scenario:{hr:150,spo2:95,etco2:52,rr:10,sys:120,dia:80,rhythm:'sinus'}, reversal:['atipamezol','yohimbin'], incident:'hypoventilation',
    cautions:'Xylazin nicht kumulieren (Hypotonie/Bradykardie). NICHT nachdosieren bei Hypoventilation/Hypoxämie/Hypotonie.' },

  { id:'f-xylket', sp:'frettchen', kind:'Einleitung', name:'Xylazin + Ketamin (schmerzhafte OP)', route:'IM (Praxis) / SC bevorzugt', onset:'3–5 min', duration:'20–40 min',
    indication:'Praxis Nager/Frettchen: Xylazin 0,15 + Ketamin 0,25 mL/kg. Nachdosierung: gleiche Menge verdünnt mit NaCl → 1/3 bzw. 1/2.',
    comp:[ {n:'Ketamin 10% · 0,25 mL/kg', mgkg:[20,25], conc:100}, {n:'Xylazin (Rompun 2%) · 0,15 mL/kg', mgkg:[3,3], conc:20} ],
    expect:'Deutliche Hypotonie/Bradykardie (Xylazin). Erbrechen/Hypersalivation bei Einleitung. O₂ + Wärme.',
    topup:'f-topup', reversal:['yohimbin','atipamezol'],
    cautions:'ÄLTERES Protokoll – Ketamin+(Dex)Medetomidin bevorzugen (besser steuer-/antagonisierbar). Anticholinergikum-Prämed (Atropin 0,04 / Glycopyrrolat), O₂; Xylazin nicht nachdosieren (Arrhythmie/Hypotonie), mit Atipamezol/Yohimbin antagonisieren. Hypoglykämie (Insulinom!) + Hypothermie beachten; nur 3–4 h nüchtern.' },
  { id:'f-medket', sp:'frettchen', kind:'Einleitung', name:'Medetomidin + Ketamin (± Butorphanol)', route:'IM', onset:'3–5 min', duration:'20–40 min (reversibel)',
    indication:'Gut steuerbare, antagonisierbare Kurznarkose; oft + Iso-Erhaltung.',
    comp:[ {n:'Ketamin 10%', mgkg:[5,8], conc:100}, {n:'Medetomidin', mgkg:[0.08,0.1], conc:1}, {n:'Butorphanol (opt.)', mgkg:[0.1,0.2], conc:10} ],
    expect:'Bradykardie (α2), Hypoxämie/Arrhythmien möglich → O₂.',
    topup:'f-topup', reversal:['atipamezol'],
    cautions:'Atipamezol = 5× Med-Dosis. Blutzucker messen (Insulinom).' },
  { id:'f-dexket', sp:'frettchen', kind:'Einleitung', name:'Ketamin + Dexmedetomidin SC (Praxis)', route:'SC (Mischspritze) – NICHT IM', onset:'3–5 min', duration:'20–40 min (reversibel)',
    indication:'Praxis-Wandprotokoll Frettchen: Ketamin 10–20 mg/kg + Dexmedetomidin 0,03–0,06 mg/kg in EINER Mischspritze SC (= Ketamin 0,1–0,2 + Dexdomitor 0,06–0,12 mL/kg). Nachdosierung 1/3 der Initialdosis.',
    comp:[ {n:'Ketamin 10% · 0,1–0,2 mL/kg', mgkg:[10,20], conc:100}, {n:'Dexmedetomidin (Dexdomitor 0,5 mg/mL) · 0,06–0,12 mL/kg', mgkg:[0.03,0.06], conc:0.5} ],
    expect:'Recht atem- & kreislaufdepressiv (bei jungen gesunden Tieren unkritisch) → Temperatur überwachen + O₂ geben. Bradykardie (α2).',
    topup:'f-topup', reversal:['atipamezol'],
    cautions:'SUBKUTAN, nicht i.m. (IM → zu schnelle/starke Kreislaufdepression). Antisedan frühestens 40 min. NICHT nüchtern lassen (kurzer Verdauungstrakt → Hypoglykämie). Bei Insulinom-Verdacht (Glukose <70 mg/dl) BZ engmaschig messen: α2 STEIGERN die Glukose (Insulin-Suppression) → intraop Hyperglykämie, nach Antagonisierung Rebound-HYPOglykämie möglich – α2 zurückhaltend/meiden.' },
  { id:'f-topup', sp:'frettchen', kind:'Nachdosierung', name:'Ketamin (NaCl-verdünnt)', route:'IM/IV', onset:'—', duration:'verlängert',
    indication:'Nur Ketamin ~⅓ der Initialdosis; α2 nicht wiederholen.', comp:[ {n:'Ketamin (verdünnt)', mgkg:[3,8], conc:100} ],
    expect:'Kreislauf schonen.', reversal:['atipamezol','yohimbin'], cautions:'Nicht bei Hypoventilation/Hypotonie.' },

  { id:'r-triple', sp:'kaninchen', kind:'Einleitung', name:'Bsp1: Medetomidin + Butorphanol (± Ketamin)', route:'SC (bevorzugt) / IM', onset:'3–5 min', duration:'20–40 min',
    indication:'Praxis Bsp1 (Mischspritze): Medetomidin 0,06–0,15 mg/kg (oder Dexmed. 0,03–0,075) + Butorphanol 0,2–0,5 ± Ketamin 10–40 mg/kg.',
    comp:[ {n:'Medetomidin (od. Dexmed. 0,03–0,075)', mgkg:[0.06,0.15], conc:1}, {n:'Butorphanol', mgkg:[0.2,0.5], conc:10}, {n:'Ketamin (opt.)', mgkg:[10,40], conc:100} ],
    expect:'Mäßige Hypoxämie → Präoxygenierung + O₂ obligat! Bradykardie (α2). Hypothermie-Schutz, Augensalbe.',
    topup:'r-topup', reversal:['atipamezol'],
    cautions:'Ketamin SC statt IM (Muskelnekrose); <100 g kein Ketamin. Atropin unzuverlässig (40–60 % Atropinesterase) → Glycopyrrolat. α2 nach 40 min mit gleichem Volumen Atipamezol antagonisieren. Warm halten; nie alleine aufwachen lassen. Nüchtern nur 30–60 min.' },
  { id:'r-domket', sp:'kaninchen', kind:'Einleitung', name:'Praxis-Tabelle: Domitor + Ketamin (+ Antisedan)', route:'SC/IM', onset:'3–5 min', duration:'20–40 min',
    indication:'Praxis-Wandtabelle (in g dosiert): Domitor 0,25 + Ketamin 0,35 mL/kg; Antisedan 0,2 mL/kg zur Umkehr.',
    comp:[ {n:'Medetomidin (Domitor 1 mg/mL) · 0,25 mL/kg', mgkg:[0.25,0.25], conc:1}, {n:'Ketamin 10% · 0,35 mL/kg', mgkg:[35,35], conc:100} ],
    expect:'Ausgeprägte Bradykardie + Hypoxämie → Präoxygenieren + O₂ obligat. Augensalbe (Ketamin-Exophthalmus).',
    topup:'r-topup', reversal:['atipamezol'],
    cautions:'Ketamin 35 mg/kg ist am OBEREN Ende – mit Medetomidin 0,25 mg/kg reichen meist 15–25 mg/kg (O₂ + engmaschiges Monitoring). Ketamin SC statt IM (Muskelnekrose). Warm halten (<38,5 °C = Untertemperatur). Antisedan = gleiches Volumen wie Domitor, frühestens 40 min nach Domitor.' },
  { id:'r-bsp2', sp:'kaninchen', kind:'Einleitung', name:'Bsp2: Midazolam + Butorphanol (± Ketamin)', route:'SC/IM (Mischspritze)', onset:'5–10 min', duration:'kurz–mittel (reversibel)',
    indication:'Praxis Bsp2: kreislaufschonender (kein α2) – für kränkere/kardiale Kaninchen.',
    comp:[ {n:'Midazolam', mgkg:[0.2,0.5], conc:5}, {n:'Butorphanol', mgkg:[0.2,0.5], conc:10}, {n:'Ketamin (opt.)', mgkg:[10,40], conc:100} ],
    expect:'Geringere Kreislaufdepression als α2-Protokolle; oft flachere Sedation → ggf. Iso ergänzen. O₂.',
    reversal:['flumazenil','naloxon'],
    cautions:'Ketamin SC statt IM. Butorphanol nur partiell antagonisierbar. Warm halten; Augensalbe; nie alleine aufwachen lassen.' },
  { id:'r-bsp3', sp:'kaninchen', kind:'Einleitung', name:'Bsp3: Medetomidin + Midazolam + Fentanyl (komplett antagonisierbar)', route:'IM (Mischspritze)', onset:'3–5 min', duration:'reversibel',
    indication:'Praxis Bsp3: alle drei Komponenten voll antagonisierbar – schonend & gut steuerbar.',
    comp:[ {n:'Medetomidin (od. Dexmed. 0,1 mg/kg)', mgkg:[0.2,0.2], conc:1}, {n:'Midazolam', mgkg:[1,1], conc:5}, {n:'Fentanyl', mgkg:[0.02,0.02], conc:0.05} ],
    expect:'Bradykardie (α2) + Atemdepression (Opioid) → O₂/IPPV bereit. Voll umkehrbar.',
    reversal:['atipamezol','flumazenil','naloxon'],
    cautions:'Antagonisierung (Mischspritze SC/IM): Atipamezol 1 mg/kg + Flumazenil 0,1 mg/kg + Naloxon 0,03 mg/kg. Nach SCHMERZHAFTEN Eingriffen auf Naloxon verzichten (hebt Analgesie auf). Warm halten; nie alleine aufwachen lassen.' },
  { id:'r-topup', sp:'kaninchen', kind:'Nachdosierung', name:'Nur Ketamin (NaCl-verdünnt)', route:'IM/IV/SC', onset:'—', duration:'verlängert',
    indication:'Vertiefung: nur Ketamin ⅓–½ (α2 nicht wiederholen); alternativ Iso-Erhaltung.',
    comp:[ {n:'Ketamin (verdünnt)', mgkg:[5,7], conc:100} ],
    expect:'α2 nicht kumulieren (Bradykardie/Hypotonie/Hypoxämie).', reversal:['atipamezol'],
    cautions:'Narkosetiefe engmaschig (Zwischenzehenreflex). O₂ weiter.' },

  { id:'ha-isofluran0', sp:'hamster', kind:'Einleitung', name:'Isofluran Kammer- bzw. Maskeneinleitung (Verfahren der Wahl)', route:'Inhalation', onset:'Kammer 4-5 %: Kipplage nach 60-120 s; Ma', duration:'beliebig steuerbar, Aufwachen 2-5 min nach A',
    indication:'Nahezu jeder Eingriff beim Hamster. Beste Steuerbarkeit, keine Injektion, kein Antagonist noetig. Erste Wahl beim alten, herzkranken oder sehr kleinen Tier.',
    comp:[ {n:'Isofluran (Einleitung)', mgkg:[4,5], conc:0}, {n:'Isofluran (Erhaltung)', mgkg:[1.5,3], conc:0}, {n:'Sauerstoff', mgkg:[200,300], conc:0} ],
    expect:'MAC 1,62 % beim gesunden Hamster (95-%-KI 1,54-1,69), beim kardiomyopathischen nur 1,39 %. Erhaltung meist 1,5-2,5 %. Atemfrequenz faellt, Koerpertemperatur faellt ohne aktive Waerme innerhalb von 10 min messbar ab.',
    cautions:'Backentaschen VOR der Einleitung leeren (angefeuchtete Wattetraeger, Spuelung) - gefuellte Taschen behindern die Maske, koennen bei Ruecken-/Seitenlage entleert und aspiriert werden. Nicht-rueckatmendes System. Isofluran reizt die Atemwege: bei sehr steilem Anfluten Atemanhalten und paradoxe Vertief' },
  { id:'ha-mmbmedeto1', sp:'hamster', kind:'Einleitung', name:'MMB - Medetomidin / Midazolam / Butorphanol', route:'IM (M. quadriceps oder Lum', onset:'unter 5 Minuten', duration:'ca. 100 Minuten',
    indication:'Injektionsnarkose fuer Eingriffe bis ca. 1,5 h, wenn keine Inhalationsanlage verfuegbar ist oder das Gesicht frei bleiben muss. Vollstaendig antagonisierbar.',
    comp:[ {n:'Medetomidin', mgkg:[0.15,0.15], conc:1}, {n:'Midazolam', mgkg:[2,2], conc:5}, {n:'Butorphanol', mgkg:[2.5,2.5], conc:10} ],
    expect:'Zuverlaessige chirurgische Toleranz, Wirkbeginn <5 min, Dauer ~100 min. Nach 0,15 mg/kg Atipamezol rasches Erwachen; auch die stark veraenderten Stoffwechselwerte normalisieren sich innerhalb von ca. 10 min.',
    reversal:['atipamezol','flumazenil','naloxon'],
    cautions:'Die Mischung verursacht eine ausgepraegte Hyperglykaemie mit Insulinabfall - beim Campbell-Zwerghamster mit Diabetesneigung und beim Chinesischen Streifenhamster nur mit Blutzuckerkontrolle. Bradykardie und Hypothermie durch Medetomidin: Waermematte und Temperatursonde obligat. Bei Verdacht auf Kard' },
  { id:'ha-ketaminxy2', sp:'hamster', kind:'Einleitung', name:'Ketamin / Xylazin (klassische Injektionsnarkose Goldhamster)', route:'IP (rechter kaudaler Quadr', onset:'3-10 Minuten', duration:'30-45 Minuten chirurgische Toleranz, Schlafd',
    indication:'Goldhamster, wenn kein Isofluran verfuegbar. Fuer Bauchhoehleneingriffe reicht sie ohne Lokalanaesthesie nicht aus.',
    comp:[ {n:'Ketamin 10 %', mgkg:[100,150], conc:100}, {n:'Xylazin 2 %', mgkg:[5,10], conc:20} ],
    expect:'150 mg/kg Ketamin + 10 mg/kg Xylazin IP ergaben beim Goldhamster eine adaequate Narkose ohne Gewebeschaden fuer die meisten Eingriffe. 50 mg/kg Ketamin + 10 mg/kg Xylazin reichten NICHT fuer verlaessliche Immobilisation.',
    reversal:['atipamezol'],
    cautions:'ZWERGHAMSTER: 200 mg/kg Ketamin + 10 mg/kg Xylazin toeteten 13 von 24 Dsungarischen Zwerghamstern (54 %). Bei allen Phodopus- und Cricetulus-Arten maximal 100 mg/kg Ketamin + 5-10 mg/kg Xylazin. Fuer die Eroeffnung des Peritoneums war zusaetzliche Lidocain-Infiltration noetig. Ketamin 10 % ist geweb' },
  { id:'ha-midazolam3', sp:'hamster', kind:'Sedierung', name:'Midazolam / Butorphanol (Untersuchung, Roentgen, Backentaschenkontroll', route:'SC oder IM', onset:'5-10 Minuten', duration:'20-40 Minuten',
    indication:'Nicht-schmerzhafte Massnahmen am wachen, gestressten oder aggressiven Hamster; Praemedikation vor Maskeneinleitung, senkt den Isofluranbedarf deutlich.',
    comp:[ {n:'Midazolam', mgkg:[1,2], conc:5}, {n:'Butorphanol', mgkg:[1,2], conc:10} ],
    expect:'Gute Ruhigstellung ohne chirurgische Toleranz, Kreislauf weitgehend stabil, keine relevante Bradykardie. Fuer Schmerzhaftes nicht ausreichend.',
    reversal:['flumazenil','naloxon'],
    cautions:'Keine chirurgische Analgesie. Atemdepression in Kombination moeglich - Sauerstoff vorlegen. Waermezufuhr auch bei kurzer Sedierung, der Hamster kuehlt sofort aus.' },
  { id:'ha-vertiefun4', sp:'hamster', kind:'Nachdosierung', name:'Vertiefung bei zu flacher Narkose', route:'Inhalation bevorzugt; sons', onset:'Isofluran 30-60 s, Ketamin 2-5 min', duration:'Isofluran sofort steuerbar, Ketamin-Nachschl',
    indication:'Reaktion auf Schmerzreiz, Anstieg von Atem- und Herzfrequenz, Zwinkerreflex zurueck',
    comp:[ {n:'Isofluran (Erhoehung)', mgkg:[0.5,1], conc:0}, {n:'Ketamin 10 % (Nachschlag)', mgkg:[10,20], conc:100}, {n:'Lidocain 0,5 % lokal', mgkg:[1,7], conc:5} ],
    expect:'Erste Massnahme ist immer Isofluran +0,5 % und die Lokalanaesthesie nachlegen, nicht das Injektionsanaesthetikum aufstocken. Ketamin-Nachschlag nur ein Drittel bis ein Viertel der Ausgangsdosis.',
    reversal:['atipamezol'],
    cautions:'Alpha-2-Agonisten NICHT nachdosieren - Bradykardie und Hypothermie summieren sich. Vor jeder Vertiefung pruefen: ist es wirklich zu flach, oder ist es Hypothermie/Hypoglykaemie/Hypoxie, die eine Unruhe vortaeuscht?' },
  { id:'re-isofluran5', sp:'rennmaus', kind:'Einleitung', name:'Isofluran Kammer- bzw. Maskeneinleitung (Verfahren der Wahl)', route:'Inhalation', onset:'Kammer 4-5 %: 60-120 s; Maske: 2-4 min', duration:'beliebig steuerbar, Aufwachen 2-5 min',
    indication:'Nahezu jeder Eingriff. Bei der Rennmaus zusaetzlich wertvoll, weil sie ohne Festhalten und ohne Injektionsstress ausgeloest werden kann - und Stress ist bei dieser Art der Hauptausloeser von Krampfanfaellen.',
    comp:[ {n:'Isofluran (Einleitung)', mgkg:[4,5], conc:0}, {n:'Isofluran (Erhaltung)', mgkg:[1.2,2.5], conc:0}, {n:'Sauerstoff', mgkg:[200,300], conc:0} ],
    expect:'MAC Isofluran 1,55 ± 0,08 %, Sevofluran 2,90 ± 0,12 %, Halothan 1,06 ± 0,11 %. Bei 1 MAC Isofluran gemessen: HF 288 ± 29/min, AF 104 ± 13/min, systolisch 79 ± 20, MAP 68 ± 22, diastolisch 61 ± 23 mmHg, Temperatur 37,8 ± 0,4 °C.',
    cautions:'Der MAP der narkotisierten Rennmaus liegt physiologisch bei 65-70 mmHg - nicht mit Hypotension verwechseln und nicht ’nachbehandeln’. Kammer ruhig, ohne Schuetteln, ohne lautes Zuschlagen bestuecken. Aktive Waerme ab Einleitung; 80 g kuehlen extrem schnell aus.' },
  { id:'re-ketaminme6', sp:'rennmaus', kind:'Einleitung', name:'Ketamin / Medetomidin', route:'IP', onset:'3-8 Minuten', duration:'30-45 Minuten',
    indication:'Injektionsnarkose fuer kuerzere Eingriffe; antagonisierbar',
    comp:[ {n:'Ketamin 10 %', mgkg:[60,75], conc:100}, {n:'Medetomidin', mgkg:[0.3,0.5], conc:1} ],
    expect:'Chirurgische Toleranz fuer Eingriffe unter 45 min; mit Isofluran 0,5-1 % problemlos nachfuehrbar. Antagonisierung mit Atipamezol 0,5-1,0 mg/kg SC.',
    reversal:['atipamezol'],
    cautions:'Ausgepraegte Bradykardie und Hypothermie durch Medetomidin. Kein Acepromazin dazu (loest bei der Rennmaus Kraempfe aus). Bei aelteren Tieren mit Nierenerkrankung Volumen sichern, bevor NSAID nachgelegt werden.' },
  { id:'re-ketaminde7', sp:'rennmaus', kind:'Einleitung', name:'Ketamin / Dexmedetomidin', route:'IP', onset:'3-8 Minuten', duration:'unter 60 Minuten',
    indication:'Eingriffe unter einer Stunde; direkt aus universitaeren Rennmaus-Protokollen',
    comp:[ {n:'Ketamin 10 %', mgkg:[50,75], conc:100}, {n:'Dexmedetomidin', mgkg:[0.25,0.5], conc:0.5} ],
    expect:'Narkose fuer Eingriffe bis ca. 1 h. Antagonisierung mit Atipamezol 0,5 mg/kg SC.',
    reversal:['atipamezol'],
    cautions:'Die Quellprotokolle nennen Dexmedetomidin 0,5-1,0 mg/kg IP - das liegt deutlich ueber dem, was bei Maus und Ratte ueblich ist. Praktisch mit 0,25-0,5 mg/kg starten und mit Isofluran vertiefen, statt den Alpha-2-Anteil zu erhoehen. Bradykardie, Hypothermie.' },
  { id:'re-ketaminxy8', sp:'rennmaus', kind:'Einleitung', name:'Ketamin / Xylazin', route:'IP oder IM', onset:'3-10 Minuten', duration:'25-40 Minuten',
    indication:'Wenn kein Medetomidin/Dexmedetomidin verfuegbar ist',
    comp:[ {n:'Ketamin 10 %', mgkg:[50,75], conc:100}, {n:'Xylazin 2 %', mgkg:[2,5], conc:20} ],
    expect:'Immobilisation und flache chirurgische Toleranz; fuer schmerzhafte Eingriffe Lokalanaesthesie ergaenzen.',
    reversal:['atipamezol'],
    cautions:'Deutlich niedrigere Xylazin-Dosis als beim Goldhamster (dort 5-10 mg/kg). Bradykardie und schneller Temperaturabfall. Kein Acepromazin.' },
  { id:'re-midazolam9', sp:'rennmaus', kind:'Sedierung', name:'Midazolam / Butorphanol (krampfarme Sedierung)', route:'SC oder IM', onset:'5-10 Minuten', duration:'20-40 Minuten',
    indication:'Untersuchung, Roentgen, Wundversorgung; besonders geeignet bei Tieren aus krampfneigenden Zuchtlinien, weil Midazolam antikonvulsiv wirkt. Auch als Praemedikation vor der Kammereinleitung.',
    comp:[ {n:'Midazolam', mgkg:[2,5], conc:5}, {n:'Butorphanol', mgkg:[1,2], conc:10} ],
    expect:'Ruhige Sedierung ohne chirurgische Toleranz, Kreislauf stabil, Krampfschwelle angehoben.',
    reversal:['flumazenil','naloxon'],
    cautions:'Flumazenil nur bei echter Atemdepression - es hebt auch den Krampfschutz auf. Acepromazin ist bei dieser Art VERBOTEN. Waermezufuhr ab Beginn.' },
  { id:'re-vertiefun10', sp:'rennmaus', kind:'Nachdosierung', name:'Vertiefung bei zu flacher Narkose', route:'Inhalation bevorzugt; sons', onset:'Isofluran 30-60 s, Ketamin 2-5 min', duration:'Isofluran sofort steuerbar, Ketamin-Nachschl',
    indication:'Reaktion auf Schmerzreiz, Frequenzanstieg, Reflexrueckkehr',
    comp:[ {n:'Isofluran (Erhoehung)', mgkg:[0.3,0.5], conc:0}, {n:'Ketamin 10 % (Nachschlag)', mgkg:[10,20], conc:100}, {n:'Lidocain 0,5 % lokal', mgkg:[1,7], conc:5} ],
    expect:'Weil der MAC bei 1,55 % gemessen ist, reichen bei der Rennmaus 0,3-0,5-%-Schritte. Lokalanaesthesie ist der wirksamste Isofluran-Sparer.',
    reversal:['atipamezol'],
    cautions:'Alpha-2 nicht nachdosieren. Zu flach wirkende Narkose zuerst gegen Hypothermie und Hypoglykaemie pruefen. Lidocain-Gesamtdosis 7 mg/kg einhalten.' },
  { id:'ra-isofluran11', sp:'ratte', kind:'Einleitung', name:'Isofluran per Kammer bzw. Maske', route:'Inhalation', onset:'1-3 min bis Verlust des Stellreflexes', duration:'beliebig steuerbar, Aufwachen 2-5 min nach A',
    indication:'Standardverfahren fuer nahezu jede Ratte, besonders bei Atemwegs-, Nieren- oder Herzvorerkrankung - weil steuerbar und nicht auf Organelimination angewiesen',
    comp:[ {n:'Isofluran Einleitung', mgkg:[3,5], conc:0}, {n:'Isofluran Erhaltung', mgkg:[1.5,2.5], conc:0}, {n:'Sauerstoff', mgkg:[0.3,1], conc:0} ],
    expect:'Rasche, glatte Einleitung. MAC der Ratte 1,4 Vol%. Unter 2-3 Vol% liegt der MAP bei etwa 89 mmHg (milde Hypotension), die Herzfrequenz bleibt mit ca. 400/min erhalten. Keinerlei postoperative Analgesie.',
    cautions:'Kammer nach der Einleitung 30 s mit hohem Fluss spuelen, bevor man sie oeffnet. Isofluran allein ist KEINE Analgesie - vor dem Schnitt Meloxicam 1-2 mg/kg SC und/oder Buprenorphin 0,05-0,1 mg/kg SC. Auskuehlung beginnt sofort: Waermematte ab der ersten Minute. Augensalbe.' },
  { id:'ra-ketaminxy12', sp:'ratte', kind:'Einleitung', name:'Ketamin + Xylazin', route:'IP', onset:'3-5 min', duration:'chirurgische Toleranz 20-45 min, Gesamtschla',
    indication:'Klassische Injektionsnarkose ohne Narkosegeraet; kurze chirurgische Eingriffe',
    comp:[ {n:'Ketamin 10 %', mgkg:[40,80], conc:100}, {n:'Xylazin 2 %', mgkg:[5,10], conc:20} ],
    expect:'Gute Relaxation und somatische Analgesie. Deutliche Bradykardie und Hypotension, regelmaessig Hypoxie ohne Sauerstoffvorlage, rasche Auskuehlung, ausgepraegte Diurese.',
    reversal:['atipamezol','yohimbin'],
    cautions:'IP applizieren, nicht IM: nach IM-Gabe von Ketamin-Xylazin sind Muskelnekrosen an der Injektionsstelle beschrieben (CliniPharm Universitaet Zuerich). Immer Sauerstoff per Maske vorlegen. Nachdosierung nur mit Ketamin (1/3 bis 1/2 der Initialdosis), niemals Xylazin nachlegen. Atipamezol hebt nur den ' },
  { id:'ra-ketaminme13', sp:'ratte', kind:'Einleitung', name:'Ketamin + Medetomidin', route:'IP oder SC', onset:'3-7 min', duration:'chirurgische Toleranz 20-40 min',
    indication:'Wie Ketamin-Xylazin, aber mit besser steuerbarem und vollstaendig antagonisierbarem Alpha-2-Anteil',
    comp:[ {n:'Ketamin 10 %', mgkg:[75,90], conc:100}, {n:'Medetomidin', mgkg:[0.25,0.5], conc:1} ],
    expect:'Tiefere und verlaesslichere Sedation als mit Xylazin, gleiche kardiovaskulaere Nebenwirkungen (Bradykardie, Vasokonstriktion). Aufwachen nach Atipamezol innerhalb weniger Minuten.',
    reversal:['atipamezol'],
    cautions:'Sauerstoff obligat. Atipamezol 0,5-1 mg/kg SC/IP erst geben, wenn der Ketaminanteil weitgehend abgebaut ist, sonst Exzitation. Vasokonstriktion macht die Pulsoxymetrie unzuverlaessig - EKG und Atmung zusaetzlich beurteilen. Vor Antagonisierung Analgetikum geben, weil auch die Analgesie aufgehoben wi' },
  { id:'ra-mmfmedeto14', sp:'ratte', kind:'Einleitung', name:'MMF - Medetomidin + Midazolam + Fentanyl (vollstaendig antagonisierbar', route:'SC oder IP', onset:'ca. 5 min bis Verlust aller Reflexe', duration:'ohne Antagonisierung ca. 120 min bis Rueckke',
    indication:'Laengere Eingriffe ohne Narkosegeraet, wenn ein definiertes, planbares Narkoseende gebraucht wird',
    comp:[ {n:'Medetomidin', mgkg:[0.15,0.15], conc:1}, {n:'Midazolam', mgkg:[2,2], conc:5}, {n:'Fentanyl', mgkg:[0.005,0.005], conc:0.05} ],
    expect:'Zuverlaessige chirurgische Toleranz mit guter Relaxation und echter Analgesie. Ausgepraegte Atemdepression und Bradykardie - Sauerstoff und Waerme sind Pflicht, nicht optional.',
    reversal:['atipamezol','flumazenil','naloxon'],
    cautions:'Antagonisierung (AFN) als Mischspritze SC: Atipamezol 0,75 mg/kg + Flumazenil 0,2 mg/kg + Naloxon 0,12 mg/kg. Etwa 3 min nach der AFN-Gabe faellt der Blutdruck massiv ab - Tier in dieser Phase warm, ruhig und unter Sauerstoff halten. Mit Naloxon faellt auch die Analgesie weg: vorher Meloxicam 1-2 mg' },
  { id:'ra-alfaxalon15', sp:'ratte', kind:'Einleitung', name:'Alfaxalon + Dexmedetomidin', route:'IP', onset:'Verlust des Stellreflexes innerhalb 0-9 ', duration:'chirurgische Toleranz ca. 30-45 min',
    indication:'Alternative fuer Tiere, bei denen Ketamin unerwuenscht ist; gute Wahl bei geplanter Antagonisierung des Alpha-2-Anteils',
    comp:[ {n:'Alfaxalon', mgkg:[30,30], conc:10}, {n:'Dexmedetomidin', mgkg:[0.05,0.05], conc:0.5} ],
    expect:'Rasche Einleitung, chirurgische Narkose. Atemdepression, Bradykardie, Hypothermie.',
    reversal:['atipamezol'],
    cautions:'Die belegten Daten stammen von WEIBLICHEN Sprague-Dawley-Ratten. Maennliche Ratten brauchen deutlich mehr Alfaxalon (bis 75 mg/kg IP) - Dosis nicht ungeprueft auf Rueden uebertragen. Alfaxalon allein (20 mg/kg IP) reicht nur zur Sedation, nicht zur Chirurgie. Sauerstoff vorlegen.' },
  { id:'ra-alfaxalon16', sp:'ratte', kind:'Sedierung', name:'Alfaxalon IM zur Sedation', route:'IM', onset:'ca. 5 min', duration:'15-25 min',
    indication:'Roentgen, Ultraschall, Untersuchung des dyspnoeischen Tieres, Blutentnahme - ohne volle Narkose',
    comp:[ {n:'Alfaxalon', mgkg:[5,5], conc:10} ],
    expect:'Ausreichende Sedation fuer Lagerung und Thoraxaufnahmen bei erhaltener Spontanatmung.',
    cautions:'Nicht antagonisierbar. Sauerstoff bereithalten. Muskelmasse der Ratte ist klein - Volumen auf zwei Stellen verteilen. Gerade bei Mycoplasma-Ratten ist dies oft die sicherste Variante, um ueberhaupt ein Roentgenbild zu bekommen.' },
  { id:'ra-ketaminna17', sp:'ratte', kind:'Nachdosierung', name:'Ketamin-Nachschlag bzw. Isofluran-Vertiefung', route:'IP bzw. Inhalation', onset:'2-4 min (IP), 1-2 min (Isofluran)', duration:'10-20 min zusaetzlich',
    indication:'Tier wird waehrend des Eingriffs zu flach (Ohrkneifreflex kehrt zurueck, Atmung flach und > 110/min)',
    comp:[ {n:'Ketamin 10 % (1/3 bis 1/2 der Initialdosis)', mgkg:[15,40], conc:100}, {n:'alternativ Isofluran', mgkg:[0.5,1], conc:0} ],
    expect:'Erneute chirurgische Toleranz ohne die kardiovaskuelle Belastung eines zweiten Alpha-2-Agonisten.',
    cautions:'Niemals Xylazin, Medetomidin oder Dexmedetomidin nachdosieren - kumulierende Bradykardie und Hypotension. Nachdosierung verlaengert die Aufwachphase und damit das Auskuehlungsrisiko ueberproportional.' },
  { id:'ma-isofluran18', sp:'maus', kind:'Einleitung', name:'Isofluran per Kammer bzw. Maske', route:'Inhalation', onset:'30-90 s bis Verlust des Stellreflexes', duration:'beliebig steuerbar, Aufwachen 1-3 min nach A',
    indication:'Verfahren der ersten Wahl fuer praktisch jede Maus - grosse Sicherheitsspanne, schnelle Titrierbarkeit, kurze Erholung',
    comp:[ {n:'Isofluran Einleitung', mgkg:[3,5], conc:0}, {n:'Isofluran Erhaltung', mgkg:[1.5,2], conc:0}, {n:'Sauerstoff Einleitung', mgkg:[1,1.5], conc:0}, {n:'Sauerstoff Erhaltung', mgkg:[0.5,1], conc:0} ],
    expect:'Sehr schnelle Einleitung und Erholung. MAC der Maus 1,34-1,3 Vol%. Herzfrequenz unter 1,5 Vol% um 390/min, Atemfrequenz um 120/min. Keine postoperative Analgesie.',
    cautions:'Kammer nach der Einleitung 30 s mit 4 l/min spuelen, bevor sie geoeffnet wird. Waermematte ab Minute 1: die Maus verliert unter Narkose 4-10 °C Kerntemperatur in 15-20 min. Augensalbe. Analgesie separat: Meloxicam 5 mg/kg SC und/oder Buprenorphin 0,05-0,1 mg/kg SC vor dem Schnitt.' },
  { id:'ma-ketaminxy19', sp:'maus', kind:'Einleitung', name:'Ketamin + Xylazin', route:'IP', onset:'3-5 min', duration:'chirurgische Toleranz 20-30 min',
    indication:'Injektionsnarkose ohne Narkosegeraet, kurze Eingriffe',
    comp:[ {n:'Ketamin 10 %', mgkg:[80,110], conc:100}, {n:'Xylazin 2 %', mgkg:[5,10], conc:20} ],
    expect:'Chirurgische Toleranz 20-30 min. Regelmaessig Hypoxie, deutliche Bradykardie, sehr schnelle Auskuehlung.',
    reversal:['atipamezol'],
    cautions:'Die Empfindlichkeit unterscheidet sich zwischen Staemmen, Geschlechtern und Altersgruppen so stark, dass dieselbe Dosis den einen Stamm nur leicht narkotisiert und den naechsten toetet - immer am unteren Rand beginnen. Hypoxie ist bei dieser Kombination die Regel: Sauerstoff per Nasenkonus obligat. ' },
  { id:'ma-ketaminme20', sp:'maus', kind:'Einleitung', name:'Ketamin + Medetomidin', route:'IP', onset:'3-5 min', duration:'ca. 30 min',
    indication:'Injektionsnarkose mit antagonisierbarem Alpha-2-Anteil',
    comp:[ {n:'Ketamin 10 %', mgkg:[75,75], conc:100}, {n:'Medetomidin', mgkg:[0.5,1], conc:1} ],
    expect:'Chirurgische Toleranz ca. 30 min, verlaesslicher als Ketamin-Xylazin. Bradykardie und starke periphere Vasokonstriktion.',
    reversal:['atipamezol'],
    cautions:'Atipamezol 1-2,5 mg/kg SC/IP zur Umkehr, aber erst wenn der Ketaminanteil abgebaut ist. Sauerstoff obligat. Nachdosierung nur mit Ketamin 75 mg/kg IP.' },
  { id:'ma-mmfmedeto21', sp:'maus', kind:'Einleitung', name:'MMF - Medetomidin + Midazolam + Fentanyl (vollstaendig antagonisierbar', route:'IP oder SC', onset:'Verlust des Stellreflexes nach 330 ± 47 ', duration:'ca. 30-60 min; mit AFN Aufwachen in wenigen ',
    indication:'Laengere Eingriffe ohne Narkosegeraet mit planbarem Narkoseende und echter Analgesie',
    comp:[ {n:'Medetomidin', mgkg:[0.5,0.5], conc:1}, {n:'Midazolam', mgkg:[5,5], conc:5}, {n:'Fentanyl', mgkg:[0.05,0.05], conc:0.05} ],
    expect:'Chirurgische Toleranz mit Relaxation und Analgesie. Deutliche Atemdepression und Bradykardie.',
    reversal:['atipamezol','flumazenil','naloxon'],
    cautions:'Antagonisierung (AFN) SC als Mischspritze: Atipamezol 2,5 mg/kg + Flumazenil 0,5 mg/kg + Naloxon 1,2 mg/kg. Fuer das niedriger dosierte Schema (Medetomidin 0,2 + Midazolam 1,0 + Fentanyl 0,025 mg/kg IP) gilt AFN 1,0 / 0,1 / 0,3 mg/kg SC - die Antagonistendosis muss zur verwendeten Agonistendosis pas' },
  { id:'ma-alfaxalon22', sp:'maus', kind:'Einleitung', name:'Alfaxalon + Xylazin + Buprenorphin', route:'SC', onset:'5-10 min', duration:'chirurgische Toleranz 48,6 ± 4,7 min (weibli',
    indication:'Laengere chirurgische Eingriffe an der Maus mit integrierter Analgesie, ohne IP-Injektion',
    comp:[ {n:'Alfaxalon', mgkg:[50,50], conc:10}, {n:'Xylazin 2 %', mgkg:[10,10], conc:20}, {n:'Buprenorphin', mgkg:[0.1,0.1], conc:0.3} ],
    expect:'Verlaessliche chirurgische Narkose ueber ca. 50-60 min inklusive Analgesie; in der Quellstudie fuer Echokardiographie validiert.',
    reversal:['atipamezol','naloxon'],
    cautions:'Relativ grosses SC-Volumen fuer eine Maus - auf zwei bis drei Depots verteilen. Xylazinanteil mit Atipamezol antagonisierbar. Sauerstoff und aktive Waermezufuhr ueber die gesamte Dauer.' },
  { id:'ma-ketaminna23', sp:'maus', kind:'Nachdosierung', name:'Ketamin-Nachschlag bzw. Isofluran-Vertiefung', route:'IP bzw. Inhalation', onset:'2-4 min (IP), unter 1 min (Isofluran)', duration:'10-15 min zusaetzlich',
    indication:'Maus wird waehrend des Eingriffs zu flach (Zehenkneifreflex kehrt zurueck, Lidreflex, Bewegung)',
    comp:[ {n:'Ketamin 10 % (1/3 bis 1/2 der Initialdosis)', mgkg:[25,55], conc:100}, {n:'alternativ Isofluran', mgkg:[0.5,1], conc:0} ],
    expect:'Erneute chirurgische Toleranz ohne zusaetzliche Alpha-2-Belastung.',
    cautions:'Niemals Xylazin oder Medetomidin nachdosieren. Bei der Maus ist die Isofluran-Vertiefung fast immer die sicherere Option, weil jede weitere Injektion die Aufwachphase und damit das Auskuehlungsfenster verlaengert.' },
  { id:'m-ketxyl', sp:'meerschwein', kind:'Einleitung', name:'Ketamin + Xylazin', route:'IP/IM', onset:'5–10 min', duration:'60–90 min',
    indication:'Gängigste Meerschwein-Injektionskombi; Ansprechen sehr variabel.',
    comp:[ {n:'Ketamin 10%', mgkg:[40,50], conc:100}, {n:'Xylazin (Rompun 2%)', mgkg:[5,5], conc:20} ],
    expect:'Variables Ansprechen → titrieren, Supplement einplanen. O₂ + Wärme. Schwierige Intubation.',
    topup:'m-topup', reversal:['atipamezol','yohimbin'],
    cautions:'Xylazin nicht nachdosieren. Maul vor Einleitung von Futter befreien; nicht lange nüchtern.' },
  { id:'m-ketmed', sp:'meerschwein', kind:'Einleitung', name:'Ketamin + Medetomidin', route:'IP/IM', onset:'5–10 min', duration:'40–60 min (reversibel)',
    indication:'Antagonisierbare Alternative.', comp:[ {n:'Ketamin 10%', mgkg:[40,40], conc:100}, {n:'Medetomidin', mgkg:[0.5,0.5], conc:1} ],
    expect:'Bradykardie (α2), Hypoxämie möglich → O₂.', topup:'m-topup', reversal:['atipamezol'],
    cautions:'Sedations-Variante niedriger (Ket 3–5 + Med 0,1). Bordetella-Risiko.' },
  { id:'m-domket', sp:'meerschwein', kind:'Einleitung', name:'Praxis-Tabelle: Domitor + Ketamin (+ Antisedan)', route:'SC/IM', onset:'5–10 min', duration:'40–60 min (reversibel)',
    indication:'Praxis-Wandtabelle Nager (in g dosiert): Domitor 0,3 + Ketamin 0,2 mL/kg; Antisedan 0,3 mL/kg zur Umkehr.',
    comp:[ {n:'Medetomidin (Domitor 1 mg/mL) · 0,3 mL/kg', mgkg:[0.3,0.3], conc:1}, {n:'Ketamin 10% · 0,2 mL/kg', mgkg:[20,20], conc:100} ],
    expect:'Bradykardie + Hypoxämie → O₂ + Wärme. Intubation schwierig. Augensalbe (Ketamin-Exophthalmus).',
    topup:'m-topup', reversal:['atipamezol'],
    cautions:'Med-Ket ergibt beim Meerschwein oft nur Immobilisation/leichte Narkose → Inhalations-/Lokal-Ergänzung einplanen. Ketamin SC statt IM (Muskelnekrose); Tiere <100 g komplett auf Ketamin verzichten. Antisedan = gleiches Volumen wie Domitor. Warm halten.' },
  { id:'m-sedmedbut', sp:'meerschwein', kind:'Sedierung', name:'Medetomidin + Butorphanol (Sedation)', route:'SC/IM', onset:'5–10 min', duration:'reversibel',
    indication:'Praxis MS-Sedierung: Medetomidin 0,08–0,15 + Butorphanol 0,2–0,5 mg/kg.',
    comp:[ {n:'Medetomidin (od. Dexmed. halbe Dosis)', mgkg:[0.08,0.15], conc:1}, {n:'Butorphanol', mgkg:[0.2,0.5], conc:10} ],
    expect:'Bradykardie (α2), mild atemdeprimiert; reversibel. O₂ + Wärme.',
    reversal:['atipamezol'], cautions:'⚠ Meerschwein sehr narkoseanfällig (hohe Mortalität!) – engmaschig überwachen. Antisedan = gleiches Volumen wie Medetomidin.' },
  { id:'m-sedmidbut', sp:'meerschwein', kind:'Sedierung', name:'Midazolam + Butorphanol (Sedation)', route:'SC/IM', onset:'5–10 min', duration:'kurz–mittel (reversibel)',
    indication:'Praxis MS-Sedierung, kreislaufschonend: Midazolam 0,5 + Butorphanol 0,5 mg/kg.',
    comp:[ {n:'Midazolam', mgkg:[0.5,0.5], conc:5}, {n:'Butorphanol', mgkg:[0.5,0.5], conc:10} ],
    expect:'Geringe Kreislaufdepression; flachere Sedation. O₂ + Wärme.',
    reversal:['flumazenil','naloxon'], cautions:'⚠ Meerschwein sehr narkoseanfällig – überwachen. Butorphanol nur partiell antagonisierbar.' },
  { id:'m-kmb', sp:'meerschwein', kind:'Einleitung', name:'Bsp1: Ketamin + Medetomidin + Butorphanol', route:'SC/IM', onset:'5–10 min', duration:'20–40 min',
    indication:'Praxis MS-Einleitung Bsp1: Ketamin 15–40 + Medetomidin 0,08–0,15 (Dexmed 0,05–0,075) + Butorphanol 0,2–0,5 mg/kg.',
    comp:[ {n:'Ketamin 10%', mgkg:[15,40], conc:100}, {n:'Medetomidin (od. Dexmed. 0,05–0,075)', mgkg:[0.08,0.15], conc:1}, {n:'Butorphanol', mgkg:[0.2,0.5], conc:10} ],
    expect:'Bradykardie + Hypoxämie → O₂ + Wärme obligat. Augensalbe. Intubation schwierig.',
    topup:'m-topup', reversal:['atipamezol'], cautions:'⚠ Meerschwein sehr narkoseanfällig (hohe Mortalität!). Ketamin SC statt IM; <100 g kein Ketamin. Antisedan = gleiches Volumen wie Medetomidin.' },
  { id:'m-mmf', sp:'meerschwein', kind:'Einleitung', name:'Bsp2: Medetomidin + Midazolam + Fentanyl (antagonisierbar)', route:'SC/IM (Mischspritze)', onset:'5–10 min', duration:'reversibel',
    indication:'Praxis MS-Einleitung Bsp2: Medetomidin 0,2 (Dexmed 0,1) + Midazolam 1 + Fentanyl 0,025 mg/kg – voll antagonisierbar.',
    comp:[ {n:'Medetomidin (od. Dexmed. 0,1 mg/kg)', mgkg:[0.2,0.2], conc:1}, {n:'Midazolam', mgkg:[1,1], conc:5}, {n:'Fentanyl', mgkg:[0.025,0.025], conc:0.05} ],
    expect:'Bradykardie (α2) + Atemdepression (Opioid) → O₂ + Wärme. Voll umkehrbar.',
    reversal:['atipamezol','flumazenil','naloxon'], cautions:'⚠ Meerschwein sehr narkoseanfällig! Antagonisieren: Atipamezol + Flumazenil + Naloxon. Nach schmerzhaften Eingriffen Naloxon weglassen.' },
  { id:'c-ketmedbut', sp:'chinchilla', kind:'Einleitung', name:'Ketamin + Medetomidin + Butorphanol', route:'SC/IM', onset:'5–10 min', duration:'20–40 min',
    indication:'Praxis Chinchilla 1: Ketamin 10 + Medetomidin 0,1 + Butorphanol 1,5 mg/kg.',
    comp:[ {n:'Ketamin 10%', mgkg:[10,10], conc:100}, {n:'Medetomidin', mgkg:[0.1,0.1], conc:1}, {n:'Butorphanol', mgkg:[1.5,1.5], conc:10} ],
    expect:'Bradykardie + Hypoxämie → O₂ + Wärme. Augensalbe.',
    topup:'c-topup', reversal:['atipamezol'], cautions:'Sehr narkoseanfällig. Butorphanol 1,5 mg/kg ist hoch (üblicher Zusatz 0,1–0,5 mg/kg; Ceiling-Effekt) – bewusst wählen. Ketamin SC statt IM; <100 g kein Ketamin. Antisedan = gleiches Volumen wie Medetomidin (Henke et al. 2004).' },
  { id:'c-ketmed', sp:'chinchilla', kind:'Sedierung', name:'Ketamin + Medetomidin (leicht)', route:'SC/IM', onset:'5–10 min', duration:'kurz',
    indication:'Praxis Chinchilla 2: Ketamin 5 + Medetomidin 0,06 mg/kg (leichte Sedation).',
    comp:[ {n:'Ketamin 10%', mgkg:[5,5], conc:100}, {n:'Medetomidin', mgkg:[0.06,0.06], conc:1} ],
    expect:'Leichte Sedation/Immobilisation; O₂ + Wärme.',
    reversal:['atipamezol'], cautions:'Ketamin SC statt IM. Für tiefere Narkose Inhalation ergänzen.' },
  { id:'c-ketmid', sp:'chinchilla', kind:'Sedierung', name:'Ketamin + Midazolam', route:'SC/IM', onset:'5–10 min', duration:'kurz',
    indication:'Praxis Chinchilla 3: Ketamin 5–10 + Midazolam 0,5–1 mg/kg (kreislaufschonend, kein α2).',
    comp:[ {n:'Ketamin 10%', mgkg:[5,10], conc:100}, {n:'Midazolam', mgkg:[0.5,1], conc:5} ],
    expect:'Geringere Kreislaufdepression; flachere Narkose. O₂ + Wärme.',
    reversal:['flumazenil'], cautions:'Ketamin SC statt IM. Midazolam mit Flumazenil antagonisierbar.' },
  { id:'c-mmf', sp:'chinchilla', kind:'Einleitung', name:'Midazolam + Medetomidin + Fentanyl (antagonisierbar)', route:'SC/IM (Mischspritze)', onset:'5–10 min', duration:'reversibel',
    indication:'Praxis Chinchilla 4: Midazolam 1 + Medetomidin 0,05 (Dexmed halbe Dosis) + Fentanyl 0,02 mg/kg – voll antagonisierbar.',
    comp:[ {n:'Midazolam', mgkg:[1,1], conc:5}, {n:'Medetomidin (od. Dexmed. 0,025)', mgkg:[0.05,0.05], conc:1}, {n:'Fentanyl', mgkg:[0.02,0.02], conc:0.05} ],
    expect:'Bradykardie (α2) + Atemdepression (Opioid) → O₂ + Wärme. Voll umkehrbar.',
    reversal:['atipamezol','flumazenil','naloxon'], cautions:'Antagonisieren: Atipamezol + Flumazenil + Naloxon. Nach schmerzhaften Eingriffen Naloxon weglassen.' },
  { id:'c-topup', sp:'chinchilla', kind:'Nachdosierung', name:'Ketamin (reduziert)', route:'SC/IM', onset:'—', duration:'verlängert',
    indication:'Vertiefung: reduzierte Ketamin-Dosis; α2 nicht wiederholen.', comp:[ {n:'Ketamin (verdünnt)', mgkg:[3,5], conc:100} ],
    expect:'α2 nicht kumulieren.', reversal:['atipamezol'], cautions:'O₂/Wärme fortführen. Ketamin SC.' },
  { id:'m-topup', sp:'meerschwein', kind:'Nachdosierung', name:'Ketamin (reduziert)', route:'IP/IM', onset:'—', duration:'verlängert',
    indication:'Reduzierte Ketamin-Dosis nachtitrieren.', comp:[ {n:'Ketamin (verdünnt)', mgkg:[10,20], conc:100} ],
    expect:'Nicht α2 wiederholen.', reversal:['atipamezol'], cautions:'O₂/Wärme fortführen.' },

  { id:'k-medbut', sp:'katze', kind:'Sedierung', name:'Medetomidin + Butorphanol', route:'IM', onset:'5–10 min', duration:'~30–45 min (reversibel)',
    indication:'Reversible Analgosedierung (Diagnostik/kleine Eingriffe).',
    comp:[ {n:'Medetomidin (Domitor)', mgkg:[0.005,0.02], conc:1}, {n:'Butorphanol', mgkg:[0.1,0.4], conc:10} ],
    expect:'Bradykardie (α2), mild atemdeprimiert; voll reversibel.',
    reversal:['atipamezol'], cautions:'Katze: Atipamezol HALBES Domitor-Volumen. Nicht bei kardial instabilen Tieren.' },
  { id:'r-topup2', sp:'kaninchen', kind:'Nachdosierung', name:'Praxis: Triple nachlegen (Med+Ket s.c. + Butorphanol i.m.)', route:'SC + IM', onset:'—', duration:'verlängert',
    indication:'Praxis-Variante: Medetomidin+Ketamin subkutan + Butorphanol intramuskulär nachdosieren.',
    comp:[ {n:'Medetomidin s.c. (reduziert)', mgkg:[0.1,0.15], conc:1}, {n:'Ketamin s.c.', mgkg:[5,7], conc:100}, {n:'Butorphanol i.m.', mgkg:[0.2,0.4], conc:10} ],
    expect:'Kreislaufdepression kann kumulieren – O₂ + Wärme + Monitoring Pflicht.',
    reversal:['atipamezol'], cautions:'α2 nur reduziert wiederholen (Standard: nur Ketamin) – engmaschig überwachen; alternativ auf Iso-Erhaltung wechseln.' },
  { id:'m-topup2', sp:'meerschwein', kind:'Nachdosierung', name:'Praxis: Triple (Med+Ket+Butorphanol) mit NaCl verdünnt i.m.', route:'IM', onset:'—', duration:'verlängert',
    indication:'Wie Einleitung: Medetomidin + Ketamin + Butorphanol, in NaCl verdünnt, intramuskulär nachgelegt.',
    comp:[ {n:'Medetomidin (reduziert)', mgkg:[0.1,0.2], conc:1}, {n:'Ketamin (verdünnt)', mgkg:[10,20], conc:100}, {n:'Butorphanol', mgkg:[0.2,0.4], conc:10} ],
    expect:'Variables Ansprechen; α2 + Butorphanol atemdepressiv-additiv → SpO₂/EtCO₂ überwachen, O₂ + Wärme.',
    scenario:{hr:230,spo2:92,etco2:52,rr:30,sys:80,dia:50,rhythm:'sinus'}, reversal:['atipamezol'], incident:'hypoventilation',
    cautions:'α2 nicht voll kumulieren; Hypoxämie-Risiko (alle Protokolle) → Präoxygenierung + O₂. Intubation schwierig.' }
];

/* =================== ANTAGONISTEN / REVERSAL =================== */
window.ANAES.reversal = [
  { id:'atipamezol', name:'Atipamezol (Antisedan)', conc:5, unit:'mg', target:'α2-Agonisten (Medetomidin/Dexmed/Xylazin)', route:'IM (IV nur Notfall/CPR)',
    sp:{ ratte:[0.5,1], rennmaus:[0.5,1], hamster:[0.15,1], hund:[0.1,0.2], katze:[0.05,0.1], kaninchen:[0.25,1], frettchen:[0.5,1], meerschwein:[0.5,1] },
    rule:'Hund: gleiches Volumen wie das gegebene Domitor/Dexdomitor = 5× Medetomidin-µg = 10× Dexmedetomidin-µg. Katze: HALBES Volumen (= 2,5× Med-µg / 5× Dexmed-µg). Frettchen: 5× Med (= gleiches Volumen). NIE „5× Dexmed-µg" rechnen – das unterdosiert um das 2-Fache.',
    caution:'NICHT < 30–40 min nach Ketamin (unmaskiert Restketamin → Exzitation/Rigidität/Krämpfe). Nicht mit Anticholinergika (Tachy/Hypertonie). Hebt Analgesie mit auf; Resedierung 30–60 min möglich. IV nur Notfall (Kollaps).' },
  { id:'naloxon', name:'Naloxon (Narcan)', conc:0.4, unit:'mg', target:'Opioide (Methadon/Butorphanol/Buprenorphin)', route:'IV/IM/SC – titriert',
    sp:{ ratte:[0.1,0.2], rennmaus:[0.01,0.1], hamster:[0.01,0.1], hund:[0.01,0.04], katze:[0.01,0.04], kaninchen:[0.01,0.04], frettchen:[0.01,0.04] },
    rule:'1 Amp (0,4 mg) in 10 mL NaCl verdünnen, mL-weise IV bis Atmung/Wachheit reichen. CPR/opioid: 0,04 mg/kg.',
    caution:'Kürzer als Opioid → Renarkotisierung (nachdosieren, ggf. CRI 0,02 mg/kg/h). Volle Reversierung → akuter Schmerz, Tachykardie, Hypertonie. Bei Polamivet: Fenpipramid-Überhang → Tachykardie. Buprenorphin nur partiell reversierbar.' },
  { id:'flumazenil', name:'Flumazenil (Anexate)', conc:0.1, unit:'mg', target:'Benzodiazepine (Diazepam/Midazolam)', route:'IV – titriert',
    sp:{ ratte:[0.1,0.2], rennmaus:[0.05,0.1], hamster:[0.05,0.1], hund:[0.01,0.02], katze:[0.01,0.02], kaninchen:[0.01,0.02], frettchen:[0.01,0.02] },
    rule:'~1 mg Flumazenil pro 13 mg Diazepam; titriert. Onset 1–2 min.',
    caution:'Wirkdauer (~1 h) kürzer als Benzodiazepin → Resedierung (nachdosieren/CRI). Selten Krämpfe (v.a. wenn Benzo als Antikonvulsivum diente).' },
  { id:'yohimbin', name:'Yohimbin (Yobine)', conc:2, unit:'mg', target:'Xylazin', route:'langsam IV (IM)',
    sp:{ hund:[0.1,0.11], katze:[0.1,0.5], kaninchen:[0.2,0.5], frettchen:[0.2,0.5], meerschwein:[0.2,0.5] },
    rule:'Primär gegen Xylazin (weniger selektiv als Atipamezol).',
    caution:'ZNS-Exzitation, Muskeltremor, Speicheln, Tachykardie, transiente Hyper- dann Hypotonie. Langsam IV. Nicht zu früh nach Ketamin.' },
  { id:'tolazolin', name:'Tolazolin (Tolazine)', conc:100, unit:'mg', target:'Xylazin (Alternative)', route:'langsam IV',
    sp:{ hund:[4,4], katze:[4,4] },
    rule:'Off-label Kleintier; enge Sicherheitsspanne, immer langsam titrieren.',
    caution:'Schnelle IV → Hypotension, Tachykardie/Arrhythmien, GI-Hypermotilität. Kontraindiziert bei GI-/Nierenerkrankung. Rebound-Sedierung.' }
];

/* =================== SPEZIES-BESONDERHEITEN (Praxis-Wandprotokolle) =================== */
window.ANAES.speciesCare = {
  kaninchen: {
    title:'Kaninchen – Narkose-Besonderheiten',
    vitals:'RF 32–100/min · HF 120–300/min · HKT 36–55 % · Glukose 70–160 mg/dl · T 38,5–40 °C (Ziel).',
    depth:'Zeichen ZU TIEFER Narkose: zunehmender Nickhautvorfall · hervortretendes Auge („Fischauge") · unregelmäßige, langsame Atmung · niedrige HF.',
    points:[
      'Warm halten – T <38,5 °C = Untertemperatur.',
      'Nicht nüchtern lassen (Mageninhalt aber reduzieren; kein Gärfutter wie Apfel/Karotte).',
      'Augensalbe wichtig (Ketamin verursacht Exophthalmus).',
      'Glukose-Infusion nur bei gemessener Hypoglykämie – IV (SC wird nicht verstoffwechselt + brennt).',
      'Bei Hypovolämie IV 10 mL/kg/h angewärmt; Kristalloid, am besten 50/50 mit Kolloid.',
      'Max. akzeptabler Blutverlust ~1–3 mL je Größe.',
      '⚠ ~2/3 der Todesfälle NACH der OP – nie alleine aufwachen lassen.',
      'Ketamin SC statt IM (Muskelnekrose); Tiere <100 g komplett auf Ketamin verzichten.'
    ],
    analgesie:'Carprofen 4–5 · Meloxicam 0,2–0,5 (chirurgisch ~1) · Metamizol 20–50 · Buprenorphin 0,01–0,05 · Butorphanol 0,2–0,5 · Methadon bis 0,2 mg/kg.',
    concept:'Jede Narkose = Bewusstlosigkeit (Iso/Propofol/α2) + Analgesie (Opioide/Ketamin/Lokal/NSAID) + Muskelrelaxation (Benzodiazepine).'
  },
  hamster: {
    title:'Hamster – Narkose-Besonderheiten',
    vitals:'HF 250-500/min · RF 35-135/min · T 36.2-38 °C (wach) · Goldhamster 85-150 g (Weibchen groesser als Maennchen); Campbell 25-50 g; Dsungare 30-50 g; Roborowski 20-25 g; Chinesischer Streifenhamster 30-45 g',
    points:[
      'Isofluran-MAC 1,62 % (95-%-KI 1,54-1,69) beim gesunden Hamster, beim kardiomyopathischen Hamster nur 1,39 % (1,30-1,47) - also 14 % weniger Bedarf. Da Kardiomyopathie beim alten Goldhamster sehr haeufig ist, gehoert bei jedem Tier ueber ca. 12 Monaten die niedrigere Konzentration als Startwert eingestellt. Nicht-rueckatmendes System zwingend (Totraum!). Kein Nuechternhalten ueber 1-2 h - Hamster erbrechen nicht, aber Hypoglykaemie kommt schnell.',
      'Atemweg: Endotrachealtubus praktisch nicht praktikabel: Trachea des Goldhamsters ~1,5-2 mm, langer enger Rachen, prall gefuellte Backentaschen verlegen den Zugang. Standard ist Maske oder Kammer. Nur geuebte Anwender: Blindintubation bzw. Otoskop-gefuehrt mit 16-20 G Venenverweilkatheter als Tubus. Larynxmasken/V-gel gibt es in dieser Groesse nicht.',
      'Der Goldhamster ist die einzige gut belegte Art dieser Gruppe. Fuer Campbell-, Dsungarischen, Roborowski- und Chinesischen Zwerghamster gibt es AUSSER der Ketamin/Xylazin-Studie von Curl & Peters am Dsungaren (Lab Anim 1988) praktisch keine eigenen Anaesthesiedaten - die hier genannten Normbaender sind vom Goldhamster uebertragen. Zwerghamster sind kleiner, haben ein hoeheres Oberflaechen-Masse-Verhaeltnis, kuehlen schneller aus und tolerieren dieselben mg/kg-Dosen schlechter'
    ],
    analgesie:'Buprenorphin 0.05-0.1 mg/kg · Butorphanol 1-5 mg/kg · Meloxicam 1-2 mg/kg · Carprofen 5-10 mg/kg'
  },
  rennmaus: {
    title:'Rennmaus – Narkose-Besonderheiten',
    vitals:'HF 260-600/min · RF 70-120/min · T 37-39 °C (wach) · Weibchen 70-100 g, Maennchen 80-130 g',
    points:[
      'MAC-Werte an der Rennmaus direkt gemessen (Tail-Clamp, spontan atmend): Halothan 1,06 ± 0,11 %, Isofluran 1,55 ± 0,08 %, Sevofluran 2,90 ± 0,12 %. Das ist die am besten belegte Geraeteangabe dieses ganzen Datensatzes.',
      'Atemweg: Intubation nicht praktikabel (Koerpergewicht 60-130 g). Maske oder Kammer. Bei Eingriffen im Kopfbereich Maske mit seitlichem Ausschnitt statt Tubus.',
      'Die Kreislaufwerte unter Narkose sind fuer die Rennmaus ungewoehnlich gut belegt: bei 1 MAC Isofluran wurden invasiv gemessen HF 288 ± 29/min, systolisch 79 ± 20, MAP 68 ± 22, diastolisch 61 ± 23 mmHg, AF 104 ± 13/min, Koerpertemperatur 37,8 ± 0,4 °C (Gomez de Segura 2009). Die Alarmbaender oben sind aus diesen Messwerten +/- Streuung gebildet. Der Blutdruck der narkotisierten Rennmaus liegt also deutlich niedriger als bei Hund und Katze - ein MAP von 65 mmHg ist hier normal,'
    ],
    analgesie:'Buprenorphin 0.05-0.1 mg/kg · Butorphanol 1-5 mg/kg · Meloxicam 1-2 mg/kg · Carprofen 5-10 mg/kg'
  },
  ratte: {
    title:'Ratte – Narkose-Besonderheiten',
    vitals:'HF 250-500/min · RF 70-115/min · T 36-38 °C (wach)',
    points:[
      'Atemweg: Standard Maske/Kammer. Intubation ist bei der Ratte machbar, aber nur mit Spezialtechnik (Otoskop/Videolaryngoskop, Draht als Führung) - kein Routineverfahren in der Kleintierpraxis.',
      'HR, RR und Temperatur sind am wachen Tier gemessen und gut belegt (Loyola: HR 250-450, RR 70-115, T 35,9-37,5 °C; andere Quellen bis HR 500 und T 38 °C - die Spanne hier deckt beides ab). MAP unter Narkose ist belegt: 89 ± 12,3 mmHg unter 2-3 Vol% Isofluran (Albrecht 2014), daraus das Band 70-110. Systolisch 90-130 mmHg stammt vom wachen Tier, das Narkoseband ist daraus geschaetzt. Der diastolische Wert ist NICHT speziesspezifisch belegt und rein rechnerisch aus MAP und Systo'
    ],
    analgesie:'Buprenorphin 0.05-0.1 mg/kg · Butorphanol 1-2 mg/kg · Meloxicam 1-2 mg/kg · Carprofen 5-5 mg/kg'
  },
  maus: {
    title:'Maus – Narkose-Besonderheiten',
    vitals:'HF 450-750/min · RF 80-230/min · T 36.5-38 °C (wach)',
    points:[
      'Atemweg: Maske/Kammer - Intubation nur mit Spezialtechnik und Uebung (Trachea nur 1-1,5 mm), in der Heimtierpraxis nicht praktikabel.',
      'Wachwerte HR und RR schwanken bei der Maus extrem mit der Aktivitaet (Telemetrie: 250/min ruhend bis 750/min aktiv, Kerntemperatur 33,5 bis 37 °C) - das Band 450-750 beschreibt die wache, handling-gestresste Maus, wie man sie in der Praxis antrifft. Narkose-HR ist belegt (Sevofluran 1,5 %: 388/min, Injektionsnarkose ca. 352/min), das Band 300-550 deckt Isofluran und Injektion ab. MAP/Systole/Diastole beim wachen Tier stammen aus Telemetriestudien (MAP 90-140 mmHg); ALLE Narko'
    ],
    analgesie:'Buprenorphin 0.05-0.1 mg/kg · Butorphanol 1-5 mg/kg · Meloxicam 5-5 mg/kg · Carprofen 5-10 mg/kg'
  },
  meerschwein: {
    title:'Meerschweinchen – Narkose-Besonderheiten',
    vitals:'HF 240–310/min · RF 40–100/min · T 37,2–39,5 °C · Glukose 60–125 mg/dl.',
    points:[
      '⚠ Sehr narkoseanfällig – Meerschwein hat die HÖCHSTE Narkose-Mortalität der Nager.',
      'Präoxygenieren, O₂ + Wärme obligat; Augensalbe.',
      'Maul vor Einleitung von Futter befreien (Backentaschen); nicht lange nüchtern.',
      'Ketamin SC statt IM; <100 g kein Ketamin.'
    ],
    analgesie:'Meloxicam 0,1–0,3 · Carprofen 1–4 · Buprenorphin 0,02–0,1 · Morphin 2–5 mg/kg.'
  },
  chinchilla: {
    title:'Chinchilla – Narkose-Besonderheiten',
    vitals:'HF 100–150/min · RF 40–80/min · T 36,1–37,8 °C · Glukose 109–193 mg/dl.',
    points:[
      '⚠ Sehr narkoseanfällig – engmaschig überwachen.',
      'O₂ + Wärme; Augensalbe. Intubation schwierig.',
      'Ketamin SC statt IM; <100 g kein Ketamin.'
    ],
    analgesie:'Meloxicam 0,1–0,3 (bis 0,6/Tag) · Carprofen 1–4 · Buprenorphin 0,02–0,1 · Morphin 2–5 mg/kg.'
  },
  degu: {
    title:'Degu – Narkose-Besonderheiten',
    vitals:'HF 100–150/min · RF ~75/min · T ~38 °C.',
    points:[
      '⚠ Sehr narkoseanfällig.',
      'INHALATIONSNARKOSE bevorzugt (Isofluran per Kammer/Maske) – Injektion nur wenn nötig.',
      'O₂ + Wärme; Augensalbe. Diabetes-Neigung (Zucker meiden, BZ beachten).'
    ],
    analgesie:'wie Chinchilla: Meloxicam 0,1–0,3 · Buprenorphin 0,02–0,1 mg/kg.'
  },
  frettchen: {
    title:'Frettchen – Narkose-Besonderheiten',
    vitals:'HF 150–280/min · RF 15–36/min · T 37,8–40 °C.',
    points:[
      'NICHT nüchtern lassen (kurzer Verdauungstrakt → leicht Hypoglykämie).',
      'Insulinom-Verdacht (Glukose <70 mg/dl): BZ engmaschig messen; α2 STEIGERN die Glukose → intraop Hyperglykämie, nach Antagonisierung Rebound-Hypoglykämie – α2 zurückhaltend/meiden.',
      'Ketamin + Dexmedetomidin SC (nicht IM – IM zu starke Kreislaufdepression); Antisedan ≥ 40 min.',
      'Recht atem-/kreislaufdepressiv → Temperatur überwachen + O₂ geben.'
    ]
  }
};
