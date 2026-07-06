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
    { id:'reptil',      name:'Reptil',          icon:'🦎' }
  ],

  /* Normwerte unter Allgemeinanästhesie (Richtwerte) */
  vitals: {
    hund:        { hr:[60,140],  rr:[8,20],   spo2:[95,100], etco2:[35,45], map:[70,120], temp:[37.5,39.2] },
    katze:       { hr:[100,180], rr:[8,25],   spo2:[95,100], etco2:[35,45], map:[70,120], temp:[37.5,39.2] },
    kaninchen:   { hr:[130,250], rr:[30,60],  spo2:[95,100], etco2:[30,45], map:[60,90],  temp:[38.0,40.0] },
    meerschwein: { hr:[200,300], rr:[40,100], spo2:[95,100], etco2:[30,45], map:[60,90],  temp:[37.2,39.5] },
    reptil:      { hr:[10,80],   rr:[2,10],   spo2:[90,100], etco2:[15,35], map:[30,60],  temp:[24,32] }
  },

  /* =================== MEDIKAMENTE =================== */
  drugs: [
    { id:'atropin', name:'Atropin', icon:'💗', cls:'Anticholinergikum', aliases:['atropinsulfat'],
      sources:['Plumb’s','BSAVA'],
      species:{
        hund:{low:0.02,high:0.04,unit:'mg/kg',route:'IV/IM/SC',conc:'0.5 mg/mL',indication:'Vagale Bradykardie / Asystolie',notes:'IV wirkt in <1 min. Transiente Tachykardie möglich.',caution:'Nicht bei Sinustachykardie; kann AV-Block paradox verschlechtern.'},
        katze:{low:0.02,high:0.04,unit:'mg/kg',route:'IV/IM/SC',conc:'0.5 mg/mL',indication:'Vagale Bradykardie',notes:'',caution:''},
        kaninchen:{low:0.1,high:0.5,unit:'mg/kg',route:'SC/IM/IV',conc:'0.5 mg/mL',indication:'Bradykardie',notes:'Höhere Dosis nötig – bis 60 % haben Atropinesterase.',caution:'Glycopyrrolat oft zuverlässiger.'},
        meerschwein:{low:0.05,high:0.2,unit:'mg/kg',route:'SC/IM',conc:'0.5 mg/mL',indication:'Bradykardie/Speichel',notes:'',caution:''},
        reptil:{low:0.01,high:0.04,unit:'mg/kg',route:'IM/IV/IO',conc:'0.5 mg/mL',indication:'Bradykardie',notes:'',caution:'Temperaturabhängige Wirkung.'}
      }},
    { id:'glyco', name:'Glycopyrrolat', icon:'💗', cls:'Anticholinergikum', aliases:['glycopyrronium'],
      sources:['Plumb’s','BSAVA'],
      species:{
        hund:{low:0.005,high:0.01,unit:'mg/kg',route:'IV/IM',conc:'0.2 mg/mL',indication:'Bradykardie',notes:'Langsamerer Anschlag, längere Wirkung als Atropin; kein ZNS-Übertritt.',caution:''},
        katze:{low:0.005,high:0.01,unit:'mg/kg',route:'IV/IM',conc:'0.2 mg/mL',indication:'Bradykardie',notes:'',caution:''},
        kaninchen:{low:0.01,high:0.02,unit:'mg/kg',route:'SC/IM/IV',conc:'0.2 mg/mL',indication:'Bradykardie',notes:'Bevorzugt (kein Atropinesterase-Problem).',caution:''},
        meerschwein:{low:0.01,high:0.02,unit:'mg/kg',route:'SC/IM',conc:'0.2 mg/mL',indication:'Bradykardie',notes:'',caution:''},
        reptil:{low:0.01,high:0.02,unit:'mg/kg',route:'IM/IV',conc:'0.2 mg/mL',indication:'Bradykardie',notes:'',caution:''}
      }},
    { id:'adrenalin', name:'Adrenalin (Epinephrin)', icon:'⚡', cls:'Notfall/Katecholamin', aliases:['epinephrin','suprarenin'],
      sources:['RECOVER 2012','Plumb’s'],
      species:{
        hund:{low:0.01,high:0.01,unit:'mg/kg',route:'IV/IO',conc:'1 mg/mL (1:1000)',indication:'CPR (Niedrigdosis)',notes:'Alle 3–5 min während CPR. Hochdosis 0.1 mg/kg erst nach mehreren Zyklen.',caution:'Nicht bei tachykardem Rhythmus ohne Stillstand.'},
        katze:{low:0.01,high:0.01,unit:'mg/kg',route:'IV/IO',conc:'1 mg/mL',indication:'CPR',notes:'',caution:''},
        kaninchen:{low:0.01,high:0.02,unit:'mg/kg',route:'IV/IO',conc:'1 mg/mL',indication:'CPR',notes:'',caution:''},
        meerschwein:{low:0.01,high:0.02,unit:'mg/kg',route:'IV/IO',conc:'1 mg/mL',indication:'CPR',notes:'',caution:''},
        reptil:{low:0.01,high:0.1,unit:'mg/kg',route:'IV/IO/IC',conc:'1 mg/mL',indication:'CPR',notes:'Intrakardial möglich.',caution:''}
      }},
    { id:'noradrenalin', name:'Noradrenalin', icon:'⚡', cls:'Vasopressor', aliases:['norepinephrin'],
      sources:['ACVAA'],
      species:{
        hund:{low:0.05,high:1,unit:'mcg/kg/min',route:'CRI IV',conc:'',indication:'Vasodilatatorische Hypotension',notes:'CRI, nach MAP titrieren. Zentraler/gut laufender Zugang.',caution:'Extravasation → Nekrose.'},
        katze:{low:0.05,high:1,unit:'mcg/kg/min',route:'CRI IV',conc:'',indication:'Hypotension',notes:'CRI titrieren.',caution:''}
      }},
    { id:'ephedrin', name:'Ephedrin', icon:'⚡', cls:'Vasopressor',
      sources:['Plumb’s'],
      species:{
        hund:{low:0.05,high:0.2,unit:'mg/kg',route:'IV Bolus',conc:'50 mg/mL',indication:'Anästhesie-Hypotension',notes:'Bolus, wiederholbar; hebt HZV + Gefäßtonus.',caution:''},
        katze:{low:0.05,high:0.2,unit:'mg/kg',route:'IV Bolus',conc:'50 mg/mL',indication:'Hypotension',notes:'',caution:''}
      }},
    { id:'dopamin', name:'Dopamin', icon:'⚡', cls:'Vasopressor/Inotropikum',
      sources:['ACVAA'],
      species:{
        hund:{low:5,high:10,unit:'mcg/kg/min',route:'CRI IV',conc:'',indication:'Hypotension / niedriges HZV',notes:'CRI; 5–10 inotrop, >10 vasopressorisch.',caution:'Tachyarrhythmien.'},
        katze:{low:5,high:10,unit:'mcg/kg/min',route:'CRI IV',conc:'',indication:'Hypotension',notes:'',caution:''}
      }},
    { id:'dobutamin', name:'Dobutamin', icon:'⚡', cls:'Inotropikum',
      sources:['ACVAA'],
      species:{
        hund:{low:2,high:10,unit:'mcg/kg/min',route:'CRI IV',conc:'',indication:'Myokard-Depression / niedriges HZV',notes:'CRI titrieren.',caution:''},
        katze:{low:1,high:5,unit:'mcg/kg/min',route:'CRI IV',conc:'',indication:'niedriges HZV',notes:'Niedriger dosieren.',caution:'Katze: Krampf-/Erregungsrisiko höher.'}
      }},
    { id:'lidocain_iv', name:'Lidocain (i.v. Antiarrhythmikum)', icon:'💓', cls:'Antiarrhythmikum',
      sources:['Plumb’s','RECOVER'],
      species:{
        hund:{low:2,high:2,unit:'mg/kg',route:'langsam IV',conc:'20 mg/mL (2%)',indication:'Ventrikuläre Tachykardie/VES',notes:'Bolus über 1–2 min, ggf. wiederholen (max ~8 mg/kg), dann CRI 25–75 mcg/kg/min.',caution:'ZNS-Zeichen / Hypotension bei Überdosis.'},
        katze:{low:0.25,high:0.5,unit:'mg/kg',route:'sehr langsam IV',conc:'20 mg/mL',indication:'VT (nur wenn nötig)',notes:'Katzen sehr empfindlich – niedrig, langsam, EKG.',caution:'Hohe Toxizität (Bradykardie, Krampf, Tod) – Zurückhaltung.'}
      }},
    { id:'lidocain_lok', name:'Lidocain (Lokalanästhesie)', icon:'💉', cls:'Lokalanästhetikum',
      sources:['BSAVA'],
      species:{
        hund:{low:1,high:4,unit:'mg/kg',route:'lokal/Infiltration',conc:'20 mg/mL (2%)',indication:'Lokal-/Leitungsanästhesie',notes:'Maximale Gesamtdosis ~4 mg/kg (mit Adrenalin ~6).',caution:'Nicht intravasal.'},
        katze:{low:1,high:2,unit:'mg/kg',route:'lokal',conc:'20 mg/mL',indication:'Lokalanästhesie',notes:'Max ~2 mg/kg.',caution:'Toxizität beachten – Gesamtdosis limitieren.'},
        kaninchen:{low:1,high:2,unit:'mg/kg',route:'lokal',conc:'2–10 mg/mL',indication:'Lokal',notes:'Verdünnen für kleine Patienten.',caution:'Kleine Gesamtdosis.'}
      }},
    { id:'bupivacain', name:'Bupivacain', icon:'💉', cls:'Lokalanästhetikum',
      sources:['BSAVA'],
      species:{
        hund:{low:1,high:2,unit:'mg/kg',route:'lokal/Nervenblock',conc:'5 mg/mL (0.5%)',indication:'Länger wirkende Lokalanästhesie',notes:'Wirkdauer 4–8 h.',caution:'NIE i.v. (kardiotoxisch).'},
        katze:{low:1,high:1,unit:'mg/kg',route:'lokal',conc:'5 mg/mL',indication:'Lokal',notes:'Max ~1–2 mg/kg.',caution:'Kardiotoxizität.'}
      }},
    { id:'propofol', name:'Propofol', icon:'💤', cls:'Injektionsnarkotikum',
      sources:['Plumb’s','BSAVA'],
      species:{
        hund:{low:4,high:6,unit:'mg/kg',route:'IV nach Wirkung',conc:'10 mg/mL',indication:'Einleitung',notes:'Prämediziert 1–4 mg/kg; langsam titrieren. CRI 0.1–0.4 mg/kg/min.',caution:'Atemdepression/Apnoe, Hypotension – langsam geben, O₂ bereit.'},
        katze:{low:4,high:8,unit:'mg/kg',route:'IV nach Wirkung',conc:'10 mg/mL',indication:'Einleitung',notes:'Prämediziert weniger.',caution:'Heinz-Körper bei wiederholter Gabe (Katze); Apnoe.'},
        kaninchen:{low:5,high:15,unit:'mg/kg',route:'langsam IV',conc:'10 mg/mL',indication:'Einleitung',notes:'Zu Wirkung titrieren.',caution:'Apnoe – langsam.'},
        reptil:{low:5,high:15,unit:'mg/kg',route:'IV/IO',conc:'10 mg/mL',indication:'Einleitung',notes:'',caution:'Apnoe – beatmen können.'}
      }},
    { id:'alfaxalon', name:'Alfaxalon', icon:'💤', cls:'Injektionsnarkotikum', aliases:['alfaxan'],
      sources:['Plumb’s','BSAVA'],
      species:{
        hund:{low:2,high:3,unit:'mg/kg',route:'IV nach Wirkung',conc:'10 mg/mL',indication:'Einleitung',notes:'Prämediziert 1–2 mg/kg. Langsam titrieren.',caution:'Apnoe möglich.'},
        katze:{low:2,high:5,unit:'mg/kg',route:'IV/IM',conc:'10 mg/mL',indication:'Einleitung',notes:'IM möglich (höheres Volumen).',caution:'Apnoe.'},
        kaninchen:{low:2,high:4,unit:'mg/kg',route:'IV',conc:'10 mg/mL',indication:'Einleitung',notes:'Auch IM in Kombination.',caution:''},
        meerschwein:{low:5,high:10,unit:'mg/kg',route:'IM/IV',conc:'10 mg/mL',indication:'Sedation/Einleitung',notes:'',caution:''},
        reptil:{low:5,high:15,unit:'mg/kg',route:'IV/IM',conc:'10 mg/mL',indication:'Einleitung',notes:'',caution:'Lange Erholung möglich.'}
      }},
    { id:'ketamin', name:'Ketamin', icon:'💤', cls:'Dissoziativ-Anästhetikum',
      sources:['Plumb’s','Carpenter'],
      species:{
        hund:{low:2,high:5,unit:'mg/kg',route:'IV (Kombi)',conc:'100 mg/mL',indication:'Einleitung/Kombi',notes:'Immer mit Benzodiazepin/α2. IM in Kombi 5–10.',caution:'Nicht als Monoanästhetikum.'},
        katze:{low:2,high:10,unit:'mg/kg',route:'IV/IM (Kombi)',conc:'100 mg/mL',indication:'Einleitung/Kombi',notes:'Häufig mit Midazolam/Dexmedetomidin.',caution:'Renal-/HKM-Vorsicht.'},
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
        hund:{low:1,high:5,unit:'mcg/kg',route:'IV (3–10 IM)',conc:'0.5 mg/mL',indication:'Sedation/Prämedikation',notes:'Antagonist: Atipamezol. Niedrige Dosis + Opioid.',caution:'Bradykardie, Vasokonstriktion, MAP-Anstieg dann -abfall; nicht bei Herz-/Schockpatient.'},
        katze:{low:1,high:5,unit:'mcg/kg',route:'IV (5–20 IM)',conc:'0.5 mg/mL',indication:'Sedation',notes:'',caution:'Wie Hund; Erbrechen.'},
        kaninchen:{low:5,high:20,unit:'mcg/kg',route:'IM/SC',conc:'0.5 mg/mL',indication:'Sedation (Kombi)',notes:'Mit Ketamin/Opioid.',caution:'Bradykardie.'},
        meerschwein:{low:10,high:50,unit:'mcg/kg',route:'IM/SC',conc:'0.5 mg/mL',indication:'Sedation (Kombi)',notes:'',caution:''}
      }},
    { id:'medetomidin', name:'Medetomidin', icon:'😴', cls:'Alpha-2-Agonist',
      sources:['Plumb’s'],
      species:{
        hund:{low:5,high:20,unit:'mcg/kg',route:'IV/IM',conc:'1 mg/mL',indication:'Sedation',notes:'Antagonist Atipamezol.',caution:'Bradykardie.'},
        katze:{low:5,high:20,unit:'mcg/kg',route:'IM',conc:'1 mg/mL',indication:'Sedation',notes:'',caution:''},
        kaninchen:{low:0.1,high:0.5,unit:'mg/kg',route:'IM/SC',conc:'1 mg/mL',indication:'Kombi',notes:'',caution:''}
      }},
    { id:'xylazin', name:'Xylazin', icon:'😴', cls:'Alpha-2-Agonist', aliases:['rompun'],
      sources:['Plumb’s'],
      species:{
        hund:{low:0.5,high:1,unit:'mg/kg',route:'IM/IV',conc:'20 mg/mL',indication:'Sedation (älter)',notes:'Antagonist Atipamezol/Yohimbin.',caution:'Deutliche Bradykardie/AV-Block, Erbrechen; modernere α2 bevorzugt.'},
        katze:{low:0.5,high:1,unit:'mg/kg',route:'IM',conc:'20 mg/mL',indication:'Sedation',notes:'Löst Erbrechen aus.',caution:''},
        kaninchen:{low:1,high:5,unit:'mg/kg',route:'IM (Kombi)',conc:'20 mg/mL',indication:'Kombi mit Ketamin',notes:'',caution:''},
        reptil:{low:1,high:1,unit:'mg/kg',route:'IM',conc:'20 mg/mL',indication:'Kombi',notes:'',caution:''}
      }},
    { id:'midazolam', name:'Midazolam', icon:'🧊', cls:'Benzodiazepin',
      sources:['Plumb’s','BSAVA'],
      species:{
        hund:{low:0.1,high:0.3,unit:'mg/kg',route:'IV/IM',conc:'5 mg/mL',indication:'Ko-Induktion/Sedation/Krampf',notes:'Antagonist Flumazenil. Gute kardiovask. Stabilität.',caution:'Allein evtl. Erregung bei gesunden Tieren.'},
        katze:{low:0.1,high:0.3,unit:'mg/kg',route:'IV/IM',conc:'5 mg/mL',indication:'Ko-Induktion',notes:'',caution:''},
        kaninchen:{low:0.5,high:2,unit:'mg/kg',route:'IM/IV',conc:'5 mg/mL',indication:'Sedation (Kombi)',notes:'',caution:''},
        meerschwein:{low:0.5,high:2,unit:'mg/kg',route:'IM',conc:'5 mg/mL',indication:'Sedation',notes:'',caution:''},
        reptil:{low:0.5,high:2,unit:'mg/kg',route:'IM/IV',conc:'5 mg/mL',indication:'Sedation',notes:'',caution:''}
      }},
    { id:'diazepam', name:'Diazepam', icon:'🧊', cls:'Benzodiazepin',
      sources:['Plumb’s'],
      species:{
        hund:{low:0.2,high:0.5,unit:'mg/kg',route:'langsam IV',conc:'5 mg/mL',indication:'Krampf/Ko-Induktion',notes:'Nicht IM (unregelmäßige Resorption). Nicht mit wässrigen Lösungen mischen.',caution:''},
        katze:{low:0.2,high:0.5,unit:'mg/kg',route:'IV',conc:'5 mg/mL',indication:'Krampf',notes:'',caution:'Orales Diazepam → Lebernekrose (Katze) – nicht chronisch oral.'}
      }},
    { id:'acepromazin', name:'Acepromazin', icon:'🌀', cls:'Phenothiazin-Sedativum', aliases:['acp'],
      sources:['Plumb’s'],
      species:{
        hund:{low:0.01,high:0.05,unit:'mg/kg',route:'IV/IM',conc:'10 mg/mL',indication:'Sedation/Prämed',notes:'Max-Gesamtdosis ~3 mg. Kein Antidot, keine Analgesie.',caution:'Hypotension (α-Block); nicht bei Schock/Hypovolämie/Kollaps.'},
        katze:{low:0.02,high:0.05,unit:'mg/kg',route:'IV/IM',conc:'10 mg/mL',indication:'Sedation',notes:'',caution:'Hypotension.'}
      }},
    { id:'methadon', name:'Methadon', icon:'💊', cls:'Opioid (µ-Agonist)',
      sources:['Plumb’s','WSAVA Pain'],
      species:{
        hund:{low:0.1,high:0.5,unit:'mg/kg',route:'IV/IM',conc:'10 mg/mL',indication:'Analgesie/Prämed',notes:'Gute intraop. Analgesie; NMDA-Effekt. Antagonist Naloxon.',caution:'Atemdepression, Bradykardie.'},
        katze:{low:0.1,high:0.3,unit:'mg/kg',route:'IV/IM/OTM',conc:'10 mg/mL',indication:'Analgesie',notes:'Gut verträglich bei Katze.',caution:''},
        kaninchen:{low:0.3,high:0.5,unit:'mg/kg',route:'SC/IM',conc:'10 mg/mL',indication:'Analgesie',notes:'',caution:''}
      }},
    { id:'polamivet', name:'Polamivet (L-Methadon + Fenpipramid)', icon:'💊', cls:'Opioid-Kombination',
      sources:['Fachinfo Polamivet'],
      species:{
        hund:{low:0.5,high:1,unit:'mg/kg',route:'IV/IM/SC',conc:'L-Methadon 2.5 mg/mL',indication:'Analgesie/Prämed (Hund)',notes:'Dosis als L-Methadon-Anteil. Fenpipramid = Parasympatholytikum-Zusatz.',caution:'Beim Hund zugelassen; Atemdepression/Bradykardie.'},
        katze:{low:null,high:null,unit:'mg/kg',route:'',conc:'',indication:'',notes:'',caution:'In DE/CH i.d.R. nicht für die Katze empfohlen – Fachinfo prüfen; alternativ reines Methadon.'}
      }},
    { id:'buprenorphin', name:'Buprenorphin', icon:'💊', cls:'Opioid (Partialagonist)',
      sources:['Plumb’s','WSAVA Pain'],
      species:{
        hund:{low:0.01,high:0.03,unit:'mg/kg',route:'IV/IM',conc:'0.3 mg/mL',indication:'Mild-mäßige Analgesie',notes:'Wirkeintritt langsam (30–45 min), Dauer 6–8 h.',caution:'Nur teilweise mit Naloxon antagonisierbar.'},
        katze:{low:0.02,high:0.03,unit:'mg/kg',route:'IV/IM/OTM',conc:'0.3 mg/mL',indication:'Analgesie',notes:'OTM (bukkal) bei Katze gut wirksam.',caution:''},
        kaninchen:{low:0.03,high:0.05,unit:'mg/kg',route:'SC/IV',conc:'0.3 mg/mL',indication:'Analgesie',notes:'',caution:''},
        meerschwein:{low:0.03,high:0.05,unit:'mg/kg',route:'SC',conc:'0.3 mg/mL',indication:'Analgesie',notes:'',caution:''}
      }},
    { id:'butorphanol', name:'Butorphanol', icon:'💊', cls:'Opioid (κ-Agonist/µ-Antag.)',
      sources:['Plumb’s'],
      species:{
        hund:{low:0.1,high:0.4,unit:'mg/kg',route:'IV/IM',conc:'10 mg/mL',indication:'Sedation/milde Analgesie',notes:'Kurze Wirkdauer (~1 h); gut für Sedationskombis.',caution:'Schwache Analgesie – nicht für starke Schmerzen.'},
        katze:{low:0.1,high:0.4,unit:'mg/kg',route:'IV/IM',conc:'10 mg/mL',indication:'Sedation',notes:'',caution:''},
        kaninchen:{low:0.1,high:0.5,unit:'mg/kg',route:'SC/IM',conc:'10 mg/mL',indication:'Sedation/Analgesie',notes:'',caution:''},
        meerschwein:{low:0.2,high:2,unit:'mg/kg',route:'SC',conc:'10 mg/mL',indication:'Analgesie',notes:'',caution:''}
      }},
    { id:'fentanyl', name:'Fentanyl', icon:'💊', cls:'Opioid (µ, kurz)',
      sources:['Plumb’s','ACVAA'],
      species:{
        hund:{low:2,high:5,unit:'mcg/kg',route:'IV Bolus',conc:'0.05 mg/mL (50 µg/mL)',indication:'Intraop. Analgesie',notes:'Danach CRI 3–10 µg/kg/h (bis 40 intraop). Sehr kurz als Bolus.',caution:'Atemdepression/Bradykardie – Beatmung bereithalten.'},
        katze:{low:1,high:3,unit:'mcg/kg',route:'IV Bolus',conc:'0.05 mg/mL',indication:'Analgesie',notes:'CRI 2–5 µg/kg/h.',caution:''}
      }},
    { id:'morphin', name:'Morphin', icon:'💊', cls:'Opioid (µ-Agonist)',
      sources:['Plumb’s'],
      species:{
        hund:{low:0.1,high:0.5,unit:'mg/kg',route:'IM/langsam IV',conc:'10 mg/mL',indication:'Analgesie',notes:'Langsam IV (Histaminfreisetzung).',caution:'Erbrechen; Bradykardie.'},
        katze:{low:0.1,high:0.2,unit:'mg/kg',route:'IM',conc:'10 mg/mL',indication:'Analgesie',notes:'Niedriger dosieren.',caution:'Exzitation bei Überdosis.'}
      }},
    { id:'naloxon', name:'Naloxon', icon:'🔄', cls:'Opioid-Antagonist',
      sources:['Plumb’s','RECOVER'],
      species:{
        hund:{low:0.01,high:0.04,unit:'mg/kg',route:'IV/IM/IO',conc:'0.4 mg/mL',indication:'Opioid-Überhang/Atemdepression',notes:'Titrieren; kurze Wirkung → ggf. wiederholen/CRI. Verdünnen für Titration.',caution:'Hebt auch Analgesie auf; akute Schmerzen/Aufregung.'},
        katze:{low:0.01,high:0.04,unit:'mg/kg',route:'IV/IM',conc:'0.4 mg/mL',indication:'Opioid-Antagonisierung',notes:'',caution:''},
        kaninchen:{low:0.01,high:0.1,unit:'mg/kg',route:'IV/IM',conc:'0.4 mg/mL',indication:'Antagonisierung',notes:'',caution:''}
      }},
    { id:'atipamezol', name:'Atipamezol', icon:'🔄', cls:'Alpha-2-Antagonist', aliases:['antisedan'],
      sources:['Plumb’s'],
      species:{
        hund:{low:0.05,high:0.2,unit:'mg/kg',route:'IM',conc:'5 mg/mL',indication:'Umkehr Medetomidin/Dexmed.',notes:'Faustregel: gleiches Volumen wie Medetomidin, bzw. 5× µg-Dexmed-Dosis. IM, nicht IV (außer Notfall langsam).',caution:'Rasche Erweckung; Vasodilatation/Hypotension bei IV.'},
        katze:{low:0.05,high:0.2,unit:'mg/kg',route:'IM',conc:'5 mg/mL',indication:'Umkehr α2',notes:'',caution:''},
        kaninchen:{low:0.1,high:1,unit:'mg/kg',route:'IM/SC',conc:'5 mg/mL',indication:'Umkehr α2',notes:'',caution:''}
      }},
    { id:'flumazenil', name:'Flumazenil', icon:'🔄', cls:'Benzodiazepin-Antagonist',
      sources:['Plumb’s'],
      species:{
        hund:{low:0.01,high:0.01,unit:'mg/kg',route:'IV',conc:'0.1 mg/mL',indication:'Umkehr Midazolam/Diazepam',notes:'Titrieren; kurze Wirkung.',caution:''},
        katze:{low:0.01,high:0.01,unit:'mg/kg',route:'IV',conc:'0.1 mg/mL',indication:'Umkehr Benzo',notes:'',caution:''}
      }},
    { id:'meloxicam', name:'Meloxicam', icon:'🌡️', cls:'NSAID',
      sources:['Plumb’s','WSAVA'],
      species:{
        hund:{low:0.1,high:0.2,unit:'mg/kg',route:'SC/IV/PO',conc:'5 mg/mL (Inj.)',indication:'Perioperative Analgesie',notes:'Erstgabe 0.2, dann 0.1 mg/kg/Tag. Nur bei normovolämem, normotensivem Patienten.',caution:'NIE bei Hypotension/Hypovolämie/Nieren-/GI-Erkrankung; nicht mit anderen NSAID/Kortison.'},
        katze:{low:0.1,high:0.2,unit:'mg/kg',route:'SC',conc:'5 mg/mL',indication:'Analgesie (Einmalgabe)',notes:'Perioperativ 0.2 mg/kg einmalig; Folgegaben nur streng nach Fachinfo.',caution:'Katze NSAID-empfindlich – nur normovoläm/normoton, nicht wiederholt ohne Kontrolle.'},
        kaninchen:{low:0.3,high:1,unit:'mg/kg',route:'SC/PO',conc:'5 mg/mL',indication:'Analgesie',notes:'Kaninchen brauchen höhere mg/kg.',caution:''}
      }},
    { id:'carprofen', name:'Carprofen', icon:'🌡️', cls:'NSAID',
      sources:['Plumb’s'],
      species:{
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
      red:['Bradykardie + Hypotension ist ein Warnsignal – rasch handeln','HF-Abfall spät bei Hypoxie = präterminal → CPR-Bereitschaft'] },

    { id:'tachykardie', name:'Tachykardie', icon:'💓', cls:'Kreislauf', color:'#ff8c6b', tag:'HF ↑', short:'Herzfrequenz zu hoch',
      thresholds:{ hund:'HF > 160–180/min', katze:'HF > 200/min', kaninchen:'HF > 300/min', all:'anhaltend über arttypischem Bereich' },
      causes:['Zu flache Narkose / Schmerz','Hypovolämie / Blutverlust','Hyperkapnie / Hypoxie','Hyperthermie','Anticholinergika, Katecholamine, Ketamin','ventrikuläre Arrhythmie'],
      steps:['Narkosetiefe + Analgesie prüfen – bei Schmerz Opioid geben.','Volumenstatus prüfen: Blutverlust? → Kristalloid-Bolus.','Kapnografie/SpO₂ prüfen (Hyperkapnie/Hypoxie).','Temperatur prüfen (Hyperthermie).','EKG: Sinustachykardie vs. ventrikuläre Tachykardie unterscheiden.','Bei anhaltender VT mit Auswirkung: Lidocain (Hund).'],
      machine:'Bei Hyperkapnie Ventilation erhöhen (AF/AZV, IPPV); Iso ggf. anpassen; O₂ 100 %.',
      drugs:[ {id:'fentanyl',low:2,high:5,unit:'mcg/kg',route:'IV',note:'Wenn Ursache Schmerz/zu flach.'},
              {id:'methadon',low:0.1,high:0.3,unit:'mg/kg',route:'IV',note:'Analgesie-Alternative.'},
              {id:'lidocain_iv',low:2,high:2,unit:'mg/kg',route:'langsam IV',note:'NUR bei ventrikulärer Tachykardie (Hund). Katze extrem vorsichtig.'} ],
      speciesNotes:{ katze:'Lidocain nur im äußersten Fall, sehr niedrig/langsam.', all:'Immer erst Ursache (Schmerz/Volumen/CO₂) – nicht „blind" β-Blocker.' },
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
      steps:['O₂ auf 100 %, Frischgasfluss hoch – O₂-Quelle & Vapor prüfen.','Tubuslage & Kreissystem prüfen (Kapnografie bestätigt Intubation).','Manuell/IPPV beatmen (2–3 Blähmanöver, PIP ≤ Grenze).','SpO₂-Sensor umplatzieren (Zunge), Puls/Perfusion prüfen.','Auskultation: einseitig? Bronchospasmus? Sekret absaugen.','Ursache behandeln; wenn keine Besserung → Narkose beenden/CPR-Bereitschaft.'],
      machine:'O₂-Fluss maximal, FiO₂ 100 %; Vapor kurz reduzieren; O₂-Flush nutzen; auf Manual/IPPV. PIP kontrolliert (Hund/Katze ≤ 15–20, Exoten niedriger).',
      drugs:[ {id:'adrenalin',low:0.01,high:0.01,unit:'mg/kg',route:'IV',note:'Nur bei Kreislaufstillstand (siehe CPR).'} ],
      speciesNotes:{ reptil:'Pulsoxymetrie oft unzuverlässig – klinisch (Farbe, Doppler) beurteilen; bei O₂-Beatmung Atemantrieb sinkt.', kaninchen:'Immer präoxygenieren; Intubation schwierig → Larynxmaske/Maske.' },
      red:['SpO₂ < 90 % ist ein Notfall – zuerst Gerät/Tubus, dann Patient','Erst nach Beatmung an Medikamente denken'] },

    { id:'hypoventilation', name:'Hypoventilation / hohes EtCO₂', icon:'☁️', cls:'Atmung', color:'#a78bfa', tag:'EtCO₂ ↑', short:'CO₂-Anstieg',
      thresholds:{ all:'EtCO₂ > 45–55 mmHg (Hyperkapnie); > 60 → kontrolliert beatmen' },
      causes:['Zu tiefe Narkose (Atemdepression)','Opioide/Propofol-Bolus','Zwerchfelldruck (Lagerung/OP)','Erschöpfter Atemkalk (Rückatmung)','Zu geringer Frischgasfluss'],
      steps:['Narkosetiefe prüfen – Iso reduzieren.','Kontrollierte Beatmung (IPPV) beginnen: AF ↑, AZV 10–15 mL/kg.','Atemkalk prüfen/wechseln, Frischgasfluss erhöhen.','Lagerung/abdominalen Druck reduzieren lassen.'],
      machine:'Auf VCV/PCV oder Manual umschalten; AF art-typisch, AZV 10–15 mL/kg (Exoten weniger), PIP-Grenze beachten; Kapnografie bis EtCO₂ 35–45.',
      drugs:[ {id:'naloxon',low:0.01,high:0.04,unit:'mg/kg',route:'IV',note:'Nur wenn opioidbedingte Atemdepression überwiegt (titrieren, Analgesie geht verloren).'} ],
      speciesNotes:{ reptil:'Physiologisch niedriges EtCO₂; Beatmung 2–4/min genügt oft.' },
      red:['Hyperkapnie unbehandelt → Azidose, Arrhythmien'] },

    { id:'hypotension', name:'Hypotension', icon:'📉', cls:'Kreislauf', color:'#ff4d4d', tag:'MAP ↓', short:'Blutdruck zu niedrig',
      thresholds:{ all:'MAP < 60–70 mmHg (SAP < 90) → Organperfusion gefährdet' },
      causes:['Zu tiefe Narkose (Iso-Vasodilatation/Kardiodepression)','Hypovolämie / Blutverlust','Bradykardie','α2-/Ace-bedingte Vasodilatation','Sepsis/Anaphylaxie'],
      steps:['Isofluran reduzieren (häufigste Ursache!).','Volumenstatus: Kristalloid-Bolus geben.','Bradykardie? → Anticholinergikum (siehe Bradykardie).','Wenn trotz Volumen + weniger Iso: Vasopressor/Inotropikum.','Blutverlust kontrollieren; Wärme halten; MAP-Ziel > 60–70.'],
      machine:'Isofluran senken; O₂ 100 %; ggf. IPPV mit niedrigem Mitteldruck (hoher PIP senkt Vorlast).',
      drugs:[ {id:'ephedrin',low:0.05,high:0.2,unit:'mg/kg',route:'IV Bolus',note:'Schneller Bolus bei Anästhesie-Hypotension.'},
              {id:'noradrenalin',low:0.05,high:1,unit:'mcg/kg/min',route:'CRI',note:'Bei vasodilatatorischer Hypotension, titrieren.'},
              {id:'dopamin',low:5,high:10,unit:'mcg/kg/min',route:'CRI',note:'Inotrop + vasopressorisch.'},
              {id:'dobutamin',low:2,high:10,unit:'mcg/kg/min',route:'CRI',note:'Bei Myokard-Depression / niedrigem HZV.'} ],
      speciesNotes:{ all:'Kristalloid-Bolus Hund 10–20 mL/kg / Katze 5–10 mL/kg über 10–15 min, dann re-evaluieren (siehe Einstellungen/Infusion).' },
      red:['Iso zu hoch ist die häufigste Narkose-Hypotension – zuerst Verdampfer runter'] },

    { id:'apnoe', name:'Apnoe / Atemstillstand', icon:'⛔', cls:'Atmung', color:'#ff4d4d', tag:'AF 0', short:'keine Spontanatmung',
      thresholds:{ all:'keine Atembewegung / EtCO₂-Kurve flach' },
      causes:['Zu tiefe Narkose','Propofol/Alfaxalon-Bolus','Opioid-Überhang','Hypokapnie nach Hyperventilation','Präterminal (Hypoxie)'],
      steps:['Sofort 100 % O₂ + manuell/IPPV beatmen (10–15/min).','Narkose reduzieren (Vapor aus/niedrig).','Tubuslage & Kreislauf prüfen (Puls/EKG) – Stillstand? → CPR.','Antagonisieren wenn passend (Opioid→Naloxon, α2→Atipamezol, Benzo→Flumazenil).','Bis Spontanatmung zurückkehrt kontrolliert beatmen.'],
      machine:'Manual/IPPV, AF 10–15/min (Exoten 2–6), AZV 10–15 mL/kg, PIP-Grenze; Vapor reduzieren.',
      drugs:[ {id:'naloxon',low:0.01,high:0.04,unit:'mg/kg',route:'IV',note:'Opioid-Überhang.'},
              {id:'atipamezol',low:0.05,high:0.2,unit:'mg/kg',route:'IM',note:'α2-Überhang.'},
              {id:'flumazenil',low:0.01,high:0.01,unit:'mg/kg',route:'IV',note:'Benzodiazepin-Überhang.'} ],
      speciesNotes:{ reptil:'Apnoe/„Breath-Hold" häufig – IPPV 2–4/min, Raumluft kann Atemantrieb fördern als 100 % O₂.' },
      red:['Kein Puls → sofort CPR (siehe 🚨)'] },

    { id:'asystolie', name:'Herzstillstand / CPR (RECOVER)', icon:'🚨', cls:'Reanimation', color:'#ff2d2d', tag:'CPR', short:'Asystolie / PEA / Kammerflimmern',
      thresholds:{ all:'kein Puls / keine Herzaktion / EtCO₂-Abfall + flache Kurve' },
      causes:['Schwere Hypoxie/Hypoventilation','Überdosis Anästhetikum','Hypovolämie/Blutverlust','Elektrolyt (K⁺)','Vagal/Reflex'],
      steps:['Hilfe rufen, Zeit notieren. Vapor AUS, 100 % O₂.','Thoraxkompressionen 100–120/min, 2 min ununterbrochen, dann Wechsel; Seitenlage, Herzhöhe.','Beatmung 10/min (nicht hyperventilieren).','Zugang legen; Adrenalin 0.01 mg/kg IV/IO alle 3–5 min (jeder 2. Zyklus).','Bei Vagus/Asystolie: Atropin 0.04 mg/kg IV/IO.','EKG alle 2 min prüfen; Kammerflimmern → Defibrillation falls verfügbar; Ursachen (Hypovolämie/Hypoxie/K⁺) behandeln.'],
      machine:'Verdampfer AUS. O₂ 100 %, Manual-Beatmung 10/min. Kapnografie als CPR-Qualität (EtCO₂ > 15 gut, plötzlicher Anstieg = ROSC).',
      drugs:[ {id:'adrenalin',low:0.01,high:0.01,unit:'mg/kg',route:'IV/IO',note:'Niedrigdosis alle 3–5 min; Hochdosis 0.1 mg/kg erst nach mehreren Zyklen.'},
              {id:'atropin',low:0.04,high:0.04,unit:'mg/kg',route:'IV/IO',note:'Bei Asystolie/vagal, einmalig/Wiederholung.'},
              {id:'naloxon',low:0.04,high:0.04,unit:'mg/kg',route:'IV/IO',note:'Wenn opioidassoziiert.'} ],
      speciesNotes:{ katze:'Kleine Hände – Thorax mit einer Hand umgreifend komprimieren.', kaninchen:'Sehr fragiler Thorax – vorsichtig, hohe Frequenz.', reptil:'CPR wenig etabliert; beatmen, Adrenalin IC möglich, langer Versuch (kältetolerant).' },
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
      red:['Hypothermie verlängert Aufwachphase & verstärkt Iso-Wirkung'] }
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
      { id:'manual', name:'Manuell (Handbeutel)', tag:'Hand', desc:'Beatmung von Hand über den Beutel. Volle Kontrolle & Gefühl; ideal für Einleitung, Blähmanöver, Notfall. APL beachten.' },
      { id:'vcv', name:'VCV – volumenkontrolliert', tag:'Volumen', desc:'Fixes Atemzugvolumen (mL) pro Hub, Druck variiert. Sichere Ventilation; PIP-Alarm setzen. Standard für die meisten Hunde/Katzen.' },
      { id:'pcv', name:'PCV – druckkontrolliert', tag:'Druck', desc:'Fester Inspirationsdruck (cmH₂O), Volumen variiert. Schonend für die Lunge / kleine Patienten & Exoten; Volumen überwachen.' },
      { id:'simv', name:'SIMV – synchronisiert intermittierend', tag:'Weaning', desc:'Maschinenhübe synchron zur Spontanatmung + Eigenatmung dazwischen. Gut zum Entwöhnen/Aufwachen.' },
      { id:'vs', name:'VS / VS+ – Volumen-Support', tag:'Spontan', desc:'Unterstützt jeden Spontanatemzug bis zu einem Zielvolumen. Für spontan atmende Patienten mit assistierter Unterstützung.' }
    ],
    settingsBySpecies: {
      hund:        { rebreatheMin:7, o2:{mlkg:[100,200],min:0.5,note:'Kreissystem: niedriger Erhaltungsfluss möglich'}, o2Induction:'2–3 L/min bzw. 3–5 min präoxygenieren', iso:{mac:1.3,maint:'1.5–2.5',induction:'3–5 %'}, tvMlKg:[10,15], rr:[8,12], pip:15, apl:'offen bei Spontanatmung; für Handbeatmung kurz schließen', fluidMlKgH:5, fluid:'VEL/Ringer-Laktat' },
      katze:       { rebreatheMin:7, o2:{mlkg:[100,200],min:0.3,note:'Kleine Patienten oft Nicht-Rückatmung'}, o2Induction:'1–2 L/min bzw. 3–5 min präoxygenieren', iso:{mac:1.6,maint:'1.5–2.5',induction:'3–5 %'}, tvMlKg:[10,15], rr:[8,14], pip:12, apl:'offen; Handbeatmung vorsichtig (kleiner Thorax)', fluidMlKgH:3, fluid:'VEL/Ringer-Laktat' },
      kaninchen:   { rebreatheMin:999, o2:{mlkg:[200,300],min:0.5,note:'Nicht-Rückatmung (Bain/T-Stück)'}, o2Induction:'Immer präoxygenieren 3–5 min (Maske)', iso:{mac:2.0,maint:'1.5–3',induction:'per Maske langsam steigern'}, tvMlKg:[8,12], rr:[20,40], pip:8, apl:'niedriger Druck – Barotrauma vermeiden', fluidMlKgH:4, fluid:'VEL/Ringer-Laktat (warm)' },
      meerschwein: { rebreatheMin:999, o2:{mlkg:[200,300],min:0.4,note:'Nicht-Rückatmung; Kammereinleitung möglich'}, o2Induction:'Präoxygenieren; Intubation schwierig → Maske/Larynxmaske', iso:{mac:1.5,maint:'1.5–3',induction:'per Maske/Kammer'}, tvMlKg:[8,12], rr:[30,60], pip:8, apl:'niedriger Druck', fluidMlKgH:4, fluid:'VEL/Ringer-Laktat (warm)' },
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
    { title:'CliniPharm/CliniTox – vetpharm.uzh.ch (Universität Zürich)', url:'https://www.vetpharm.uzh.ch/' },
    { title:'Plumb’s Veterinary Drug Handbook' },
    { title:'BSAVA Small Animal Formulary / BSAVA Exotic Pets' },
    { title:'WSAVA Global Pain Council – Analgesie-Leitlinien' },
    { title:'ACVAA / AVA Anästhesie-Monitoring-Leitlinien' },
    { title:'RECOVER Initiative – CPR-Leitlinien Kleintier (2012)' },
    { title:'Carpenter – Exotic Animal Formulary' },
    { title:'Mindray Veta 5 Plus / uMEC12 Vet – Bedienungshandbücher' }
  ]
};
