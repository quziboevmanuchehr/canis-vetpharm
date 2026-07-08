/* =========================================================================
   Canis Reiseerkrankungen – Zusatz-Datensatz (reise-extra.js)
   Wird NACH dem Haupt-Script geladen und ergänzt weitere Reise-/Import- und
   Viruserkrankungen des Hundes im gleichen Schema (Felder, Labor-Links zu
   Canis Hæmatica). Rein additiv – die bestehende Logik bleibt unverändert.
   Fachliche Orientierung: ESCCAP GL5, LABOKLIN-Reiseprofile, IDEXX, MSD/Merck
   Vet Manual, CABI/CAPC. Werte sind orientierend und laborabhängig.
   ========================================================================= */
(function () {
  "use strict";
  if (typeof diseases === "undefined" || !Array.isArray(diseases)) return;

  var extra = [
    { id: "bartonella", name: "Bartonellose", agent: "Bartonella henselae / B. vinsonii", cat: "Bakterium", color: "#e879f9",
      regions: "Weltweit, v. a. floh-/zeckenreiche und mediterrane Regionen; Import-/Tierschutzhunde.",
      vector: "Flöhe, evtl. Zecken; Kratz-/Bisskontakt (zoonotisch).",
      age: "Alle Altersgruppen; schwerer bei Immunsuppression.",
      incubation: "Wochen bis Monate; oft chronisch-latent.",
      symptoms: ["Fieber", "Endokarditis/Herzgeräusch", "Lahmheit/Polyarthritis", "Lymphadenopathie", "Uveitis", "Epistaxis"],
      labs: [["Thrombozyten", "down", "variabel"], ["CRP", "up", "Entzündung"], ["Globuline", "up", "chronisch"], ["Albumin", "down", "Entzündung"], ["Gerinnung", "up", "bei Vaskulitis/Endokarditis"]],
      diagnostics: "Serologie plus PCR/Anreicherungskultur (BAPGM); Echokardiografie bei Endokarditisverdacht; Ko-Infektionen prüfen.",
      metabolism: "Endotheliale/erythrozytäre Infektion mit chronischer Immunaktivierung, Vaskulitis und Akute-Phase-Antwort.",
      retest: "Bei Verdacht und negativem Erstbefund Serologie/PCR wiederholen; Endokarditis-Verlauf kontrollieren.",
      media: ["Kein frei einbettbares Erreger-Video; Name + Klinik bleiben sichtbar."] },

    { id: "haemoplasma", name: "Hämoplasmose (hämotrope Mykoplasmose)", agent: "Mycoplasma haemocanis / Candidatus M. haematoparvum", cat: "Bakterium", color: "#fb7185",
      regions: "Weltweit; Zecken-/Bluttransfer-Regionen, splenektomierte/immunsupprimierte Hunde besonders.",
      vector: "Zecken (Rhipicephalus) vermutet; Bluttransfer, Bissverletzungen.",
      age: "Alle Altersgruppen; klinisch v. a. ohne Milz oder immunsupprimiert.",
      incubation: "Tage bis Wochen.",
      symptoms: ["Blasse Schleimhäute", "Schwäche", "Fieber", "Anämiezeichen", "oft subklinisch bei intakter Milz"],
      labs: [["Hämatokrit", "down", "hämolytische Anämie"], ["Retikulozyten", "up", "Regeneration"], ["Bilirubin", "up", "Hämolyse"], ["Thrombozyten", "down", "möglich"]],
      diagnostics: "PCR (sensitiver als Ausstrich), Blutausstrich (Epi-Erythrozyten-Organismen), Coombs/Ausschluss IMHA, Ko-Infektionen.",
      metabolism: "Erythrozyten-assoziierte Erreger fördern Hämolyse, Häm-/Bilirubinumsatz und immunvermittelten Erythrozytenabbau.",
      retest: "Nach Therapie PCR-Verlauf; bei rezidivierender Anämie erneut testen.",
      media: ["Mikroskopie möglich, PCR zuverlässiger; kein Erreger-Video hinterlegt."] },

    { id: "acantho", name: "Acanthocheilonemose", agent: "Acanthocheilonema (Dipetalonema) reconditum", cat: "Helminth", color: "#22d3ee",
      regions: "Mediterranraum, Süd-/Osteuropa, weltweit warme Regionen; wichtig zur Abgrenzung von D. immitis.",
      vector: "Flöhe/Läuse; subkutane adulte Würmer, Mikrofilarien im Blut.",
      age: "Alle Altersgruppen.",
      incubation: "Monate; meist apathogen.",
      symptoms: ["Meist symptomlos", "selten Hautreaktionen", "Mikrofilarämie als Zufallsbefund"],
      labs: [["Eosinophile", "up", "gelegentlich"], ["Routineblut", "none", "meist unauffällig"]],
      diagnostics: "Mikrofilarien-Differenzierung (Knott, Morphologie/Beweglichkeit), PCR zur Artbestimmung; Herzwurm sicher abgrenzen.",
      metabolism: "Geringe systemische Störung; klinische Bedeutung v. a. als Differenzialdiagnose zum Herzwurm.",
      retest: "Bei unklaren Mikrofilarien Artbestimmung vor Therapieentscheidung.",
      media: ["Mikrofilarien mikroskopisch; kein Erreger-Video hinterlegt."] },

    { id: "trypanosoma", name: "Trypanosomose (Chagas / Surra)", agent: "Trypanosoma cruzi / T. evansi", cat: "Protozoon", color: "#f97316",
      regions: "Süd-/Mittelamerika (T. cruzi), Afrika/Asien/Südamerika (T. evansi); Import-/Reiseanamnese.",
      vector: "Raubwanzen (T. cruzi), Stechfliegen/Bremsen (T. evansi); auch oral/Bluttransfer.",
      age: "Alle Altersgruppen; akut schwerer bei Welpen.",
      incubation: "Tage (akut) bis Monate/Jahre (chronisch, Herz).",
      symptoms: ["Fieber", "Lymphadenopathie", "Apathie", "Herzinsuffizienz/Arrhythmie (chronisch)", "Anämie", "neurologische Zeichen"],
      labs: [["Hämatokrit", "down", "Anämie"], ["Thrombozyten", "down", "möglich"], ["ALT/AST", "up", "Myokard-/Leberbeteiligung"], ["BNP/Troponin", "up", "Myokarditis"], ["Globuline", "up", "chronisch"]],
      diagnostics: "Blutausstrich/Dicker Tropfen, PCR, Serologie; EKG/Echo bei Herzbeteiligung.",
      metabolism: "Intrazelluläre/extrazelluläre Parasitämie schädigt Myokard und Energiestoffwechsel; chronische Immunaktivierung.",
      retest: "Bei Reise-/Importanamnese und Herzzeichen gezielt testen; Verlauf kardial überwachen.",
      media: ["Trypomastigoten mikroskopisch; kein Erreger-Video hinterlegt."] },

    { id: "lepto", name: "Leptospirose", agent: "Leptospira interrogans (versch. Serovare)", cat: "Bakterium", color: "#34d399",
      regions: "Weltweit, auch Deutschland; warme/feuchte Regionen und Reisehunde mit Wasserkontakt.",
      vector: "Kein Arthropod; Urin infizierter Tiere, kontaminiertes Wasser/Boden (zoonotisch).",
      age: "Alle Altersgruppen; oft junge, aktive Hunde.",
      incubation: "Etwa 4–12 Tage.",
      symptoms: ["Fieber", "Erbrechen", "Ikterus", "akutes Nierenversagen (PU/PD, Anurie)", "Blutungsneigung", "Lungenblutung (LPHS)"],
      labs: [["Kreatinin/SDMA", "up", "akute Nierenschädigung"], ["Harnstoff", "up", "Azotämie"], ["Bilirubin", "up", "Leber-/Cholestase"], ["ALT/AST", "up", "Hepatopathie"], ["Thrombozyten", "down", "häufig"], ["UPC/Proteinurie", "up", "tubuläre/glomeruläre Schädigung"], ["Phosphat", "up", "Niereninsuffizienz"]],
      diagnostics: "MAT (Titerverlauf), PCR aus Blut (früh) und Urin (später), Klinik; Niere/Leber/Gerinnung überwachen.",
      metabolism: "Endothel-/Tubulus-/Hepatozytenschädigung stört Nieren-, Bilirubin- und Gerinnungsstoffwechsel; Azidose/Elektrolytentgleisung.",
      retest: "MAT nach 1–2 Wochen (Titeranstieg); Nierenwerte im Verlauf. Impfung schützt nur gegen enthaltene Serovare.",
      media: ["Dunkelfeld/PCR diagnostisch; kein Erreger-Video hinterlegt."] },

    { id: "toxoplasma", name: "Toxoplasmose", agent: "Toxoplasma gondii", cat: "Protozoon", color: "#a3e635",
      regions: "Weltweit; Rohfütterung/Jagd, Katzenkontakt; Reise spielt geringere Rolle als Exposition.",
      vector: "Oozysten (Katzenkot), Gewebezysten in rohem Fleisch (zoonotisch relevant für Mensch).",
      age: "Welpen und immunsupprimierte Hunde stärker (oft mit Neospora/Staupe).",
      incubation: "Tage bis Wochen.",
      symptoms: ["Fieber", "Muskelschmerz/Lahmheit", "neurologische Zeichen", "Husten/Dyspnoe", "Uveitis"],
      labs: [["CK", "up", "Myositis"], ["ALT/AST", "up", "Muskel-/Leberbeteiligung"], ["Leukozyten", "up", "Entzündung"], ["Globuline", "up", "chronisch"]],
      diagnostics: "Serologie (IgM/IgG, Titerdynamik), PCR; Abgrenzung zu Neospora; Bildgebung bei ZNS-/Lungenbeteiligung.",
      metabolism: "Intrazelluläre Vermehrung in Muskel/ZNS erhöht Muskel- und Proteinumsatz, fördert Entzündung.",
      retest: "Titerverlauf (vierfacher Anstieg) zur aktiven Infektion; bei Risikotieren erneut prüfen.",
      media: ["Tachyzoiten/Zysten mikroskopisch; kein Erreger-Video hinterlegt."] },

    { id: "neospora", name: "Neosporose", agent: "Neospora caninum", cat: "Protozoon", color: "#84cc16",
      regions: "Weltweit; Rinderkontakt/Rohfütterung; Hund ist Endwirt.",
      vector: "Aufnahme von Gewebezysten (rohes Fleisch/Nachgeburt); transplazentar.",
      age: "Welpen/junge Hunde mit aufsteigender Lähmung typisch; adulte mit Polymyositis.",
      incubation: "Wochen.",
      symptoms: ["aufsteigende Hinterhandparese", "Muskelatrophie/-kontraktur", "Schluckstörung", "Myositis"],
      labs: [["CK", "up", "Myositis"], ["ALT/AST", "up", "Muskelbeteiligung"], ["Leukozyten", "up", "variabel"]],
      diagnostics: "Serologie, PCR (Liquor/Muskel), Klinik/EMG; Abgrenzung zu Toxoplasma.",
      metabolism: "Myositis und Neuritis erhöhen Muskel-/Proteinumsatz; fortschreitende Muskeldegeneration.",
      retest: "Titerverlauf; frühe Behandlung verbessert Prognose, daher zeitnah testen.",
      media: ["Serologie/PCR diagnostisch; kein Erreger-Video hinterlegt."] },

    { id: "ancylostoma", name: "Ancylostomose (Hakenwurm)", agent: "Ancylostoma caninum / A. tubaeforme", cat: "Helminth", color: "#fca5a5",
      regions: "Weltweit, v. a. warm-feucht; Tierheime, Sammeltransporte, Welpen.",
      vector: "Orale/perkutane Larvenaufnahme, Muttermilch; Boden/Umgebung.",
      age: "Welpen besonders gefährdet (schwere Anämie).",
      incubation: "2–3 Wochen bis Patenz.",
      symptoms: ["blutiger Durchfall/Teerstuhl", "Anämie", "Gewichtsverlust", "Hautläsionen bei perkutaner Larvenwanderung"],
      labs: [["Hämatokrit", "down", "Eisenmangel-/Blutungsanämie"], ["Eosinophile", "up", "Parasitose"], ["Albumin", "down", "Eiweißverlust"], ["Gesamtprotein", "down", "enteraler Verlust"]],
      diagnostics: "Kot-Flotation (Eier), ggf. PCR; bei Welpen frühe Behandlung wegen Blutverlust.",
      metabolism: "Blutsaugende Würmer verursachen Eisen-/Eiweißverlust und Anämie; gestörter Eisen- und Proteinhaushalt.",
      retest: "Kotkontrolle nach Entwurmung; Sammelkot bei negativem Erstbefund.",
      media: ["Eier/Larven mikroskopisch; kein Erreger-Video hinterlegt."] },

    { id: "strongyloides", name: "Strongyloidose", agent: "Strongyloides stercoralis", cat: "Helminth", color: "#60a5fa",
      regions: "Warm-feuchte Regionen, Sammelhaltung, Importwelpen; zoonotisch.",
      vector: "Perkutane/orale Larven; Autoinfektion möglich (schwer bei Immunsuppression).",
      age: "Welpen/Junghunde; Immunsupprimierte mit Hyperinfektion.",
      incubation: "1–2 Wochen.",
      symptoms: ["wässriger Durchfall", "Husten (Lungenwanderung)", "Gewichtsverlust", "Dehydratation"],
      labs: [["Eosinophile", "up", "möglich"], ["Albumin", "down", "Verlust"], ["Elektrolyte", "down", "Durchfall/Dehydratation"], ["Hämatokrit", "up", "Dehydratation"]],
      diagnostics: "Baermann-Larvenauswanderung (frischer Sammelkot), PCR; an Hyperinfektion bei Immunsuppression denken.",
      metabolism: "Malabsorption und Larvenwanderung stören Wasser-/Elektrolyt- und Proteinhaushalt.",
      retest: "Mehrtägige Baermann-Untersuchung wegen intermittierender Larvenausscheidung.",
      media: ["Larven mikroskopisch; kein Erreger-Video hinterlegt."] },

    { id: "spirocerca", name: "Spirozerkose", agent: "Spirocerca lupi", cat: "Helminth", color: "#f59e0b",
      regions: "Mittelmeer, Afrika, Asien, warme Regionen; Reise-/Importhunde.",
      vector: "Mistkäfer (Zwischenwirt), paratenische Wirte; Knoten in Ösophaguswand.",
      age: "Alle Altersgruppen.",
      incubation: "Monate; neoplastische Entartung möglich (Sarkom).",
      symptoms: ["Regurgitation/Schluckbeschwerden", "Abmagerung", "Erbrechen", "hypertrophe Osteopathie", "Speichelfluss"],
      labs: [["Hämatokrit", "down", "chronisch"], ["Globuline", "up", "chronisch"], ["Albumin", "down", "Entzündung"], ["CRP", "up", "Entzündung"]],
      diagnostics: "Endoskopie/Röntgen-Thorax (Ösophagusknoten), Kot (Eier, oft niedrig), Bildgebung auf Aortennarben/Spondylose.",
      metabolism: "Chronische Granulome/Sarkomgefahr und Aortenschädigung; chronische Entzündung und Eiweißverschiebung.",
      retest: "Bei Regurgitation nach Auslandsaufenthalt Endoskopie; Verlaufskontrolle nach Therapie.",
      media: ["Endoskopie/Bildgebung diagnostisch; kein Erreger-Video hinterlegt."] },

    { id: "staupe", name: "Staupe", agent: "Canines Staupevirus (CDV)", cat: "Virus", color: "#ef4444",
      regions: "Weltweit; ungeimpfte Import-/Tierschutzhunde, Sammeltransporte.",
      vector: "Aerosol/Sekrete; hoch ansteckend.",
      age: "Welpen/ungeimpfte Junghunde besonders; jedes ungeimpfte Tier.",
      incubation: "1–4 Wochen, mehrphasig.",
      symptoms: ["Fieber", "eitriger Nasen-/Augenausfluss", "Husten/Pneumonie", "Durchfall", "Krämpfe/Myoklonien", "Hyperkeratose (Hard Pad)"],
      labs: [["Leukozyten", "down", "Lymphopenie initial"], ["Thrombozyten", "down", "möglich"], ["ALT/AST", "up", "variabel"], ["Routineblut", "none", "Klinik/PCR entscheidend"]],
      diagnostics: "RT-PCR (Konjunktiva/Blut/Urin/Liquor), Klinik, Impfanamnese; Einschlusskörperchen selten sichtbar.",
      metabolism: "Multisystemische Virusinfektion (Epithel, Lymphsystem, ZNS) mit Immunsuppression und neuronaler Schädigung.",
      retest: "Impfstatus prüfen; bei ZNS-Spätfolgen Verlauf. Prävention v. a. Impfung.",
      media: ["RT-PCR diagnostisch; kein Erreger-Video hinterlegt."] },

    { id: "parvo", name: "Parvovirose", agent: "Canines Parvovirus (CPV-2)", cat: "Virus", color: "#dc2626",
      regions: "Weltweit; ungeimpfte Welpen, Tierheime, Importketten.",
      vector: "Fäkal-oral, sehr umweltstabil.",
      age: "Welpen 6 Wochen–6 Monate besonders gefährdet.",
      incubation: "3–7 Tage.",
      symptoms: ["blutiger Durchfall", "Erbrechen", "Apathie", "Dehydratation/Schock", "Sepsisgefahr"],
      labs: [["Leukozyten", "down", "Panleukopenie typisch"], ["Albumin", "down", "enteraler Verlust"], ["Glucose", "down", "Sepsis/Welpen"], ["Elektrolyte", "down", "Verluste"], ["Hämatokrit", "up", "Dehydratation"]],
      diagnostics: "Antigen-Schnelltest/PCR aus Kot, Blutbild (Leukopenie), Klinik; Intensivüberwachung.",
      metabolism: "Zerstörung der Darmkrypten und des Knochenmarks stört Barriere, Immunabwehr, Energie- und Elektrolythaushalt.",
      retest: "Verlauf Blutbild/Elektrolyte/Glucose; Prävention durch Impfung und Hygiene.",
      media: ["Antigentest/PCR diagnostisch; kein Erreger-Video hinterlegt."] },

    { id: "hcc", name: "Hepatitis contagiosa canis", agent: "Canines Adenovirus CAV-1", cat: "Virus", color: "#b91c1c",
      regions: "Weltweit selten durch Impfung; ungeimpfte Import-/Streunerhunde.",
      vector: "Sekrete/Urin, fäkal-oral.",
      age: "Junge ungeimpfte Hunde besonders.",
      incubation: "4–7 Tage.",
      symptoms: ["Fieber", "Apathie", "Bauchschmerz", "Ikterus", "Blutungsneigung", "'Blue Eye' (Hornhautödem)"],
      labs: [["ALT/AST", "up", "akute Hepatitis"], ["Bilirubin", "up", "Leberschädigung"], ["Thrombozyten", "down", "DIC möglich"], ["Gerinnung", "up", "Leber-/Verbrauchskoagulopathie"], ["Albumin", "down", "Leber/Entzündung"]],
      diagnostics: "PCR, Serologie, Klinik/Leberwerte; Abgrenzung anderer Hepatopathien.",
      metabolism: "Hepatozyten- und Endothelschädigung stört Eiweißsynthese, Gerinnung und Bilirubinstoffwechsel.",
      retest: "Leberwerte/Gerinnung im Verlauf; Prävention durch CAV-2-Kombinationsimpfung.",
      media: ["PCR/Serologie diagnostisch; kein Erreger-Video hinterlegt."] },

    { id: "herpes", name: "Herpesvirus-Infektion", agent: "Canines Herpesvirus (CHV-1)", cat: "Virus", color: "#9d174d",
      regions: "Weltweit verbreitet; Zucht/Welpenbestände.",
      vector: "Kontakt-/Tröpfchen, transplazentar/perinatal.",
      age: "Neugeborene Welpen (oft tödlich); adulte meist mild/latent.",
      incubation: "Tage; Reaktivierung bei Stress.",
      symptoms: ["Welpensterben", "Schwäche/Schmerz", "Nasenausfluss", "bei adulten oft mild/genital"],
      labs: [["Routineblut", "none", "wenig spezifisch"], ["Thrombozyten", "down", "bei schwerem Verlauf"]],
      diagnostics: "PCR (Sektion/Sekrete), Serologie im Bestand; Wärmemanagement der Welpen wichtig.",
      metabolism: "Temperaturabhängige Virusvermehrung schädigt Organe der Welpen (Niere/Leber/Lunge) mit Blutungen.",
      retest: "Bestandsserologie bei Zuchtproblemen; Hygiene-/Wärmemaßnahmen.",
      media: ["PCR diagnostisch; kein Erreger-Video hinterlegt."] },

    { id: "fsme", name: "FSME (Frühsommer-Meningoenzephalitis)", agent: "TBE-Virus (Flavivirus)", cat: "Virus", color: "#7c3aed",
      regions: "Endemiegebiete Mittel-/Ost-/Nordeuropa; Zeckenexposition.",
      vector: "Ixodes-Zecken; selten Rohmilch.",
      age: "Alle Altersgruppen; klinische Fälle beim Hund selten, aber schwer.",
      incubation: "1–2 Wochen.",
      symptoms: ["Fieber", "neurologische Ausfälle", "Krämpfe", "Verhaltensänderung", "Schmerzüberempfindlichkeit"],
      labs: [["Routineblut", "none", "unspezifisch"], ["Leukozyten", "up", "variabel"]],
      diagnostics: "Serologie (IgM/IgG), Liquor, Bildgebung; Abgrenzung anderer ZNS-Ursachen (Staupe, Toxoplasma, Neospora).",
      metabolism: "Neurotrope Virusinfektion mit Enzephalitis; Routinechemie wenig wegweisend.",
      retest: "Serologischer Titerverlauf; Zeckenprophylaxe als Prävention.",
      media: ["Serologie/Liquor diagnostisch; kein Erreger-Video hinterlegt."] },

    { id: "westnil", name: "West-Nil-Virus-Infektion", agent: "West-Nil-Virus (Flavivirus)", cat: "Virus", color: "#6d28d9",
      regions: "Süd-/Südosteuropa, Naher Osten, Amerika; zunehmend nördlicher; Mückenexposition.",
      vector: "Stechmücken (Culex).",
      age: "Alle Altersgruppen; klinische Fälle beim Hund selten.",
      incubation: "Tage bis ~2 Wochen.",
      symptoms: ["meist subklinisch", "Fieber", "neurologische Zeichen bei schwerem Verlauf", "Schwäche"],
      labs: [["Routineblut", "none", "unspezifisch"], ["Leukozyten", "up", "variabel"]],
      diagnostics: "Serologie/PCR; Abgrenzung anderer Arbo-/ZNS-Erkrankungen; epidemiologischer Kontext.",
      metabolism: "Neurotrope Flavivirus-Infektion; systemische Stoffwechselstörung meist gering.",
      retest: "Bei ZNS-Zeichen nach Mückenexposition serologisch abklären.",
      media: ["Serologie/PCR diagnostisch; kein Erreger-Video hinterlegt."] }
  ];

  var have = {};
  diseases.forEach(function (d) { have[d.id] = true; });
  extra.forEach(function (d) { if (!have[d.id]) diseases.push(d); });

  /* einige Länder-Hotspots inhaltlich anreichern (nur ids, additiv) */
  try {
    var addIds = function (mapKey, country, ids) {
      var arr = (typeof hotspots !== "undefined" && hotspots[mapKey]) || [];
      var p = arr.find(function (h) { return h.name === country; });
      if (p) ids.forEach(function (i) { if (p.ids.indexOf(i) < 0) p.ids.push(i); });
    };
    addIds("europe", "Deutschland", ["lepto", "fsme"]);
    addIds("europe", "Spanien/Portugal", ["lepto", "bartonella", "acantho", "spirocerca"]);
    addIds("europe", "Italien", ["lepto", "bartonella", "acantho", "toxoplasma"]);
    addIds("europe", "Griechenland", ["lepto", "spirocerca", "acantho"]);
    addIds("europe", "Balkan", ["lepto", "westnil", "spirocerca"]);
    addIds("europe", "Türkei", ["spirocerca", "westnil", "lepto"]);
    addIds("europe", "Rumänien/Bulgarien", ["westnil", "lepto"]);
    addIds("europe", "Frankreich", ["lepto", "bartonella", "fsme"]);
    addIds("europe", "Ungarn", ["westnil", "fsme", "lepto"]);
    addIds("europe", "Polen/Osteuropa", ["fsme", "lepto", "westnil"]);
    addIds("world", "Mittelmeer", ["lepto", "bartonella", "acantho", "spirocerca"]);
    addIds("world", "Türkei/Nahost", ["spirocerca", "westnil", "lepto"]);
    addIds("world", "Nordafrika", ["spirocerca", "lepto"]);
    addIds("world", "USA/Kanada", ["lepto", "bartonella", "trypanosoma"]);
    addIds("world", "Südamerika", ["trypanosoma", "lepto", "bartonella"]);
    addIds("world", "Südostasien", ["trypanosoma", "lepto", "spirocerca"]);
  } catch (e) {}

  /* neu rendern, damit Liste, Matrix, Karte und Video die Erweiterung zeigen */
  try { if (typeof renderAll === "function") renderAll(); } catch (e) {}
  try { if (typeof renderMatrix === "function") renderMatrix(); } catch (e) {}
  try { if (typeof renderMap === "function") renderMap(); } catch (e) {}
})();

/* Deep-Link ?d=<id> — Erkrankung direkt öffnen (z. B. aus Canis Anæsthesie) */
;(function(){try{var d=new URLSearchParams(location.search).get("d");if(d&&typeof selectDisease==="function"&&typeof diseases!=="undefined"&&diseases.some(function(x){return x.id===d;})){selectDisease(d);}}catch(e){}})();
