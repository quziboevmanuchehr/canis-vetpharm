/* =========================================================================
   CANIS HÆMATICA – Erweiterungsdatensatz (data-plus.js)
   Wird NACH data.js geladen und reichert die bestehenden Parameter an,
   ohne data.js zu verändern:
     • ORGAN3D  – 3D-Koordinaten der Organe im Hund-Modell (Labrador-Pose)
     • EXTRA    – chemische Formeln/Reaktionen, Morphologie, Physiologie,
                  Pathomorphologie und Kaskaden-Effekte (was passiert bei ↑/↓)
     • NEW_PARAMS – zusätzliche Blutwerte (Eisen, B12, Troponin, BGA …)
   Quellen-Orientierung: eClinPath (Cornell), IDEXX, Laboklin, IRIS,
   MSD/Merck Vet Manual. Werte sind labor-/geräteabhängig.
   ========================================================================= */
(function () {
  "use strict";
  const H = window.HAEM; if (!H) return;

  /* -------------------------------------------------------------------------
     1) 3D-ORGAN-KOORDINATEN  (Modellraum: +X = Kopf/vorne, +Y = oben,
        +Z = rechte Körperseite zum Betrachter). Werte grob anatomisch.
        sys = Organsystem (für Färbung/Gruppierung).
     ------------------------------------------------------------------------- */
  const ORGAN3D = {
    schilddruese: { x: 2.55, y: 2.10, z: 0.18, sys: "endokrin" },
    knochenmark:  { x: -1.40, y: 1.95, z: 0.00, sys: "haemato" },
    herz:         { x: 1.45, y: 1.55, z: 0.32, sys: "kreislauf" },
    leber:        { x: 0.70, y: 1.55, z: 0.20, sys: "verdauung" },
    gallenwege:   { x: 0.55, y: 1.22, z: 0.38, sys: "verdauung" },
    milz:         { x: -0.05, y: 1.45, z: -0.55, sys: "haemato" },
    pankreas:     { x: -0.20, y: 1.30, z: 0.28, sys: "verdauung" },
    darm:         { x: -0.70, y: 1.18, z: 0.05, sys: "verdauung" },
    niere:        { x: -0.85, y: 2.02, z: 0.30, sys: "harn" },
    nebenniere:   { x: -0.45, y: 2.05, z: 0.34, sys: "endokrin" },
    muskel:       { x: -1.95, y: 0.95, z: 0.50, sys: "bewegung" },
    gefaess:      { x: 2.15, y: 1.85, z: -0.30, sys: "kreislauf" }
  };

  /* -------------------------------------------------------------------------
     2) ANREICHERUNG bestehender Parameter
        formula  – Summenformel (chemisch definierte Analyte)
        reaktion – katalysierte/biochemische Reaktion (v. a. Enzyme)
        morphologie  – wie es unter dem Mikroskop / strukturell aussieht
        physiologie  – normale Funktion / Regelung
        patho        – pathomorphologische Veränderungen / Befunde
        effectUp/effectDown – Kurz-Folge für die "Was-wäre-wenn"-Kaskade
     ------------------------------------------------------------------------- */
  const EXTRA = {
    /* ---- Rote Reihe ---- */
    hkt: {
      morphologie: "Bikonkave, kernlose Scheibe (⌀ ca. 7 µm beim Hund) mit zentraler Aufhellung; die bikonkave Form maximiert die Oberfläche für den Gasaustausch und die Verformbarkeit in Kapillaren.",
      physiologie: "Anteil der Erythrozyten am Blutvolumen. Bildung in der Niere über Erythropoetin (EPO) gesteuert; Lebensdauer beim Hund ca. 110–120 Tage, Abbau in der Milz.",
      patho: "Anisozytose (RDW↑), Polychromasie (Regeneration), Sphärozyten (IMHA), Schistozyten (DIC/Fragmentation), Akanthozyten (Leber/Hämangiosarkom), Heinz-Körper (Oxidation: Zwiebel/Knoblauch/Paracetamol/Zink), Howell-Jolly-Körper (Milzdysfunktion).",
      effectUp: "Eindickung/Polyzythämie: zähes Blut → Thromboserisiko, schlechtere Mikrozirkulation.",
      effectDown: "Anämie: O₂-Mangel im Gewebe → Schwäche, Tachykardie, blasse Schleimhäute, Laktat↑."
    },
    rbc: {
      morphologie: "Zählung der bikonkaven, kernlosen Erythrozyten; zusammen mit MCV/MCH/MCHC als Index-Bild zu lesen.",
      physiologie: "Häm-Synthese aus Succinyl-CoA (TCA-Zyklus) + Glycin; benötigt Eisen, B12 und Folat.",
      patho: "Rouleaux (Geldrollen) bei Hyperglobulinämie/Entzündung; Agglutination (echte Verklumpung) bei IMHA."
    },
    hb: {
      formula: "Häm (C₃₄H₃₂FeN₄O₄) + Globin",
      reaktion: "Hb + O₂ ⇌ HbO₂ (kooperative O₂-Bindung; sigmoide Sauerstoffbindungskurve)",
      morphologie: "Eisen-Porphyrin-Komplex (Häm) zentral, eingebettet in vier Globin-Ketten (Tetramer).",
      physiologie: "Bindet O₂ in der Lunge, gibt es im Gewebe ab; transportiert CO₂ und puffert H⁺ (Bohr-Effekt).",
      patho: "Methämoglobin (Fe³⁺, oxidiert → schokoladenbraunes Blut), Carboxyhämoglobin (CO); Heinz-Körper bei oxidativer Schädigung."
    },
    mcv: { physiologie: "Mittleres Erythrozytenvolumen – klassifiziert die Anämie in mikro-/normo-/makrozytär." },
    mchc: { physiologie: "Hämoglobinkonzentration je Volumen Erys; hoher Wert fast immer Artefakt (Hämolyse/Lipämie)." },
    retikulozyten: {
      morphologie: "Junge, eben kernlos gewordene Erythrozyten mit RNA-Resten; in Spezialfärbung (Brillantkresylblau) netzartig, im Routineausstrich als Polychromasie sichtbar.",
      physiologie: "Maß der Knochenmark-Antwort: steigt 2–4 Tage nach Blutverlust/Hämolyse (regenerative Anämie).",
      patho: "Fehlende Retikulozytose trotz Anämie = nicht-regenerativ (Niere/EPO↓, Entzündung, Knochenmark)."
    },
    /* ---- Weiße Reihe ---- */
    neutrophile: {
      morphologie: "Segmentkerniger Granulozyt (3–5 durch Brücken getrennte Kernlappen), feine, neutral anfärbbare Granula.",
      physiologie: "Erste zelluläre Abwehr gegen Bakterien (Chemotaxis → Phagozytose → oxidativer Burst). Marginaler und zirkulierender Pool stehen im Austausch.",
      patho: "Toxische Veränderungen (Döhle-Körper, basophiles Zytoplasma, toxische Granula) bei schwerer Entzündung; Linksverschiebung = vermehrt Stabkernige; Hypersegmentierung bei Steroid/Alterung."
    },
    bands: { morphologie: "Stabkerniger (unreifer) Neutrophiler: hufeisenförmiger, nicht segmentierter Kern.", physiologie: "Erscheinen vermehrt bei starkem Verbrauch reifer Neutrophiler = Linksverschiebung." },
    lymphozyten: {
      morphologie: "Kleiner, runder Zellkern mit schmalem blauem Zytoplasmasaum; reaktive Formen größer mit tiefblauem Zytoplasma.",
      physiologie: "Träger der erworbenen Immunität: B-Zellen (Antikörper) und T-Zellen (zellulär).",
      patho: "Blasten/atypische Lymphozyten bei Lymphom/lymphatischer Leukämie; Lymphopenie als zuverlässigster Stress-/Steroidmarker."
    },
    monozyten: { morphologie: "Größter Leukozyt; nieren-/hufeisenförmiger Kern, graublaues, oft vakuolisiertes Zytoplasma.", physiologie: "Wandern ins Gewebe und werden zu Makrophagen (Phagozytose, Antigenpräsentation)." },
    eosinophile: { morphologie: "Meist zweilappiger Kern, kräftig eosinophile (rote) Granula; beim Greyhound oft vakuolisiert/grau.", physiologie: "Abwehr von Parasiten und Modulation allergischer Reaktionen (Histamin-Gegenspieler)." },
    basophile: { morphologie: "Selten; dunkle, basophile Granula (Histamin, Heparin).", physiologie: "Beteiligt an Allergie/Entzündung, oft gemeinsam mit Eosinophilie." },
    /* ---- Thrombozyten & Gerinnung ---- */
    thrombozyten: {
      morphologie: "Kleine kernlose Zellfragmente der Megakaryozyten; im Ausstrich oft in Klumpen (Artefakt). Makrothrombozyten bei Cavalier King Charles.",
      physiologie: "Primäre Hämostase: Adhäsion (über vWF) → Aktivierung → Aggregation zum Plättchenpfropf.",
      patho: "Thrombozytopenie (<30 ×10⁹/L → Spontanblutungen/Petechien). Pseudothrombozytopenie durch Klumpung – immer Ausstrich.",
      effectDown: "Petechien an Haut/Schleimhaut, verlängerte Blutung; <30 ×10⁹/L spontane Blutungsgefahr."
    },
    pt: { reaktion: "Extrinsischer Weg: Gewebsthromboplastin + Faktor VII → … → Thrombin → Fibrin", physiologie: "Misst Faktor VII (kurze Halbwertszeit) → früh verlängert bei Vitamin-K-Mangel/Cumarin." },
    aptt: { reaktion: "Intrinsischer Weg: Faktoren XII→XI→IX→VIII → gemeinsamer Weg", physiologie: "Verlängert bei Hämophilie A/B, Heparin, schwerer Leber-/Faktorenstörung." },
    fibrinogen: { formula: "Faktor I (Glykoprotein, ~340 kDa)", reaktion: "Fibrinogen --(Thrombin)--> Fibrin-Monomere → quervernetztes Fibrinnetz" },
    vwf: { physiologie: "Großes Glykoprotein aus Endothel; vermittelt Plättchenadhäsion und stabilisiert Faktor VIII.", patho: "Erblicher Mangel (von-Willebrand-Krankheit) = häufigste angeborene Gerinnungsstörung des Hundes (Dobermann)." },
    /* ---- Leber & Galle ---- */
    alt: { reaktion: "L-Alanin + α-Ketoglutarat ⇌ Pyruvat + L-Glutamat (Vitamin-B6-/PLP-abhängig)", physiologie: "Zytosolisches, leberzellspezifisches Enzym; tritt bei Membranschaden aus.", patho: "Höhe ≠ Schweregrad; bei Nekrose/Lipidose/Toxinen (Xylit, Aflatoxin) stark erhöht.", effectUp: "Zeigt akute Hepatozytenschädigung an (Leberzell-Leck)." },
    ast: { reaktion: "L-Aspartat + α-Ketoglutarat ⇌ Oxalacetat + L-Glutamat", physiologie: "In Leber UND Muskel; mit CK zusammen lesen, um Quelle zu trennen." },
    alp: { reaktion: "Phosphatmonoester + H₂O → Alkohol + anorganisches Phosphat (alkalisches pH-Optimum)", physiologie: "Isoenzyme: Leber/Galle, Knochen (Wachstum), beim Hund zusätzlich steroidinduziertes Isoenzym.", patho: "Stark erhöht bei Cholestase, Cushing, Welpenwachstum, nodulärer Hyperplasie alter Hunde." },
    ggt: { reaktion: "γ-Glutamyl-Peptid + Akzeptor → γ-Glutamyl-Akzeptor + Peptid (Glutathion-Stoffwechsel)", physiologie: "Gallengangsepithel-Enzym; spezifischer für Cholestase als ALP." },
    bilirubin: {
      formula: "C₃₃H₃₆N₄O₆",
      reaktion: "Häm → Biliverdin → unkonj. Bilirubin → (Leber, UDP-Glucuronyltransferase) Bilirubin-Diglucuronid → Galle",
      physiologie: "Abbauprodukt des Häms; an Albumin transportiert, in der Leber konjugiert und über die Galle ausgeschieden.",
      patho: "Ikterus (Gelbfärbung von Skleren/Schleimhaut) ab ~2 mg/dL; prä-/intra-/posthepatisch unterscheiden.",
      effectUp: "Ikterus; je nach Ursache Hämolyse (prähepatisch) oder Cholestase (posthepatisch)."
    },
    gallensaeuren: { formula: "z. B. Cholsäure C₂₄H₄₀O₅; beim Hund mit Taurin konjugiert → Taurocholsäure", physiologie: "Enterohepatischer Kreislauf; Funktionstest der Leber und der portalen Durchblutung.", patho: "Stark erhöht bei portosystemischem Shunt und Leberinsuffizienz." },
    ammoniak: { formula: "NH₃ / NH₄⁺", reaktion: "2 NH₃ + CO₂ + 3 ATP → Harnstoff + H₂O (Harnstoffzyklus; Arginin beim Hund essenziell)", physiologie: "Hochtoxisch; in der Leber zu Harnstoff entgiftet.", patho: "Hyperammonämie → hepatische Enzephalopathie (Speicheln, Krampf, Apathie nach Mahlzeit).", effectUp: "Neurotoxisch → hepatische Enzephalopathie (Shunt/Leberversagen)." },
    /* ---- Niere & Harn ---- */
    harnstoff: { formula: "CH₄N₂O  (CO(NH₂)₂)", physiologie: "Endprodukt des Eiweißabbaus; in der Leber gebildet, renal ausgeschieden; futter-/hydratationsabhängig.", effectUp: "Azotämie (mit Kreatinin); Urämie-Symptome (Erbrechen, Ulzera) bei starkem Anstieg." },
    kreatinin: { formula: "C₄H₇N₃O", physiologie: "Nichtenzymatischer Abbau von Kreatin(-phosphat) im Muskel mit konstanter Rate ∝ Muskelmasse; glomerulär filtriert.", patho: "Steigt erst bei ~75 % Nephronverlust (späte Anzeige).", effectUp: "Azotämie → IRIS-Stadium prüfen; prärenal/renal/postrenal trennen." },
    sdma: { formula: "C₈H₁₈N₄O₂ (symmetrisches Dimethylarginin)", physiologie: "Methylierter Arginin-Metabolit, rein renal filtriert, kaum muskelabhängig.", effectUp: "Früher Marker für GFR-Verlust (vor Kreatinin)." },
    phosphat: { formula: "PO₄³⁻ / HPO₄²⁻", physiologie: "Energiestoffwechsel (ATP), Knochen; renal reguliert, gegenläufig zu Calcium (Ca×P-Produkt).", effectUp: "Bei CNI → renaler sekundärer Hyperparathyreoidismus, Weichteilverkalkung." },
    usg: { physiologie: "Konzentrationsfähigkeit der Niere – entscheidend, um eine Azotämie als prärenal (USG>1,030) oder renal (isosthenurisch) einzuordnen." },
    /* ---- Elektrolyte & Säure-Basen ---- */
    natrium: { formula: "Na⁺", physiologie: "Wichtigstes osmotisch wirksames Kation; bestimmt das Extrazellulärvolumen; über ADH/Aldosteron geregelt.", effectDown: "Hyponatriämie → Hirnödem-Gefahr; rasche Korrektur vermeiden.", effectUp: "Hypernatriämie → zelluläre Dehydratation, neurologische Zeichen." },
    kalium: { formula: "K⁺", physiologie: "Hauptkation intrazellulär; bestimmt das Ruhemembranpotenzial von Herz und Muskel; Aldosteron-reguliert.", patho: "Pseudohyperkaliämie bei Akita/Hämolyse.", effectUp: "Hyperkaliämie → Bradykardie, zeltförmige T-Wellen, Asystolie-Gefahr (EKG! Notfall).", effectDown: "Hypokaliämie → Muskelschwäche, ventroflexion-ähnliche Schwäche, Arrhythmie." },
    chlorid: { formula: "Cl⁻", physiologie: "Folgt meist dem Natrium; wichtig für die Säure-Basen-Bewertung (korrigiertes Chlorid)." },
    bicarbonat: { formula: "HCO₃⁻", reaktion: "CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻ (Carboanhydrase)", physiologie: "Wichtigster Blutpuffer; sinkt bei metabolischer Azidose, steigt bei Alkalose." },
    anionenluecke: { reaktion: "AG = (Na⁺ + K⁺) − (Cl⁻ + HCO₃⁻)", physiologie: "Deckt unmessbare Anionen (Laktat, Ketone, Urämietoxine, Ethylenglykol-Metabolite) auf." },
    calcium: { formula: "Ca²⁺ (ionisiert) / Gesamt-Ca an Albumin gebunden", physiologie: "Knochen, Muskel-/Nervenerregbarkeit, Gerinnung; durch PTH, Calcitriol (Vit D) und Calcitonin geregelt.", effectUp: "Hyperkalzämie → PU/PD, Nierenschaden, Weichteilverkalkung; Tumorsuche (Lymphom).", effectDown: "Hypokalzämie → Muskelzittern, Tetanie, Krampf (Eklampsie der laktierenden Hündin)." },
    magnesium: { formula: "Mg²⁺", physiologie: "Cofaktor vieler ATP-abhängiger Enzyme; eng mit Kalium/Calcium verknüpft." },
    /* ---- Proteine ---- */
    gesamtprotein: { physiologie: "Albumin + Globuline; bestimmt zusammen mit dem HKT die Hydratationsbewertung; trägt den onkotischen Druck.", effectDown: "Hypoproteinämie → onkotischer Druck↓ → Ödeme/Ergüsse." },
    albumin: { formula: "Globuläres Protein (~66 kDa), in der Leber synthetisiert", physiologie: "Wichtigstes Transport- und Onkotik-Protein; negatives Akute-Phase-Protein.", effectDown: "<1,5 g/dL → onkotischer Druck fällt → Aszites/Ödeme/Pleuraerguss." },
    globulin: { physiologie: "Alpha-/Beta-/Gamma-Fraktion: Transportproteine, Akute-Phase-Proteine und Antikörper.", patho: "Polyklonale Erhöhung (chron. Infektion, Leishmaniose) vs. monoklonal (Myelom) – Elektrophorese." },
    /* ---- Zucker & Fett ---- */
    glucose: { reaktion: "C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O (vollständige Oxidation); Glykolyse/Glukoneogenese", physiologie: "Durch Insulin (senkt) und Glukagon/Cortisol/Adrenalin (heben) geregelt.", effectDown: "Hypoglykämie → Schwäche, Krampf, Kollaps (Welpe/Toy, Insulinom, Xylit, Sepsis).", effectUp: "Hyperglykämie → ab Nierenschwelle (~180–220) Glukosurie, osmotische Diurese (PU/PD)." },
    fruktosamin: { physiologie: "Glykiertes Serumprotein – Langzeitmittel des Blutzuckers über ~2–3 Wochen; unbeeinflusst von akutem Stress." },
    cholesterin: { formula: "C₂₇H₄₆O", physiologie: "Membranbaustein und Vorstufe von Gallensäuren, Steroidhormonen und Vitamin D; lebermetabolisiert.", patho: "Klassisch erhöht bei Hypothyreose, Cushing, Diabetes, Cholestase, nephrotischem Syndrom." },
    triglyceride: { formula: "Triacylglycerin (Glycerin + 3 Fettsäuren)", physiologie: "Speicher- und Transportform von Fett; nüchtern messen.", patho: "Anhaltende Hypertriglyceridämie → Pankreatitis-Risiko (Zwergschnauzer)." },
    /* ---- Enzyme ---- */
    ck: { reaktion: "Kreatin + ATP ⇌ Kreatinphosphat + ADP", physiologie: "Schneller Energiepuffer des Muskels; sehr muskelspezifisch.", patho: "Stark erhöht bei Trauma, langem Liegen, Myositis, Krampf." },
    amylase: { reaktion: "Stärke/Glykogen + H₂O → Maltose + Dextrine", physiologie: "Kohlenhydratverdauung; beim Hund unspezifisch (auch Niere/Darm)." },
    lipase: { reaktion: "Triacylglycerin + 2 H₂O → 2 Fettsäuren + 2-Monoacylglycerin", physiologie: "Fettverdauung; Spec cPL/DGGR-Lipase sind pankreasspezifisch.", patho: "Erhöht bei Pankreatitis (Spec cPL > 400 + Klinik + Sonografie)." },
    /* ---- Hormone ---- */
    t4: { formula: "C₁₅H₁₁I₄NO₄ (Thyroxin, tetra-iodiert)", physiologie: "Steuert den Grundumsatz; Regelkreis Hypophyse(TSH)–Schilddrüse. Beim Hund häufige Hypothyreose.", patho: "Euthyroid-Sick: schwere Begleitkrankheit drückt T4 ohne echte Hypothyreose." },
    ft4: { formula: "freier, nicht proteingebundener Anteil von T4", physiologie: "Biologisch aktive Fraktion; weniger durch Begleitkrankheit verfälscht (Gleichgewichtsdialyse)." },
    tsh: { formula: "Glykoprotein-Hormon der Hypophyse", physiologie: "Steigt bei primärer Hypothyreose (negative Rückkopplung); allein nicht beweisend." },
    cortisol: { formula: "C₂₁H₃₀O₅", physiologie: "Glukokortikoid der Nebennierenrinde; hebt Glucose, wirkt immunsuppressiv und katabol.", patho: "Cushing (↑) vs. Addison (↓) – nur über Funktionstests (LDDS/ACTH) zu sichern." },
    /* ---- Entzündung & Spezial ---- */
    crp: { formula: "Pentameres Akute-Phase-Protein (in der Leber gebildet)", physiologie: "Schneller, sensibler Entzündungsmarker; ideal zur Verlaufskontrolle (sinkt bei Therapieerfolg)." },
    laktat: { reaktion: "Pyruvat + NADH ⇌ L-Laktat + NAD⁺ (Laktatdehydrogenase, anaerob)", physiologie: "Endprodukt der anaeroben Glykolyse; wichtigster Perfusions-/Schockmarker (Cori-Zyklus).", effectUp: "Gewebe-Sauerstoffmangel/Hypoperfusion → Schock; fallendes Laktat = gutes Prognosezeichen." }
  };

  /* -------------------------------------------------------------------------
     3) ZUSÄTZLICHE PARAMETER (gleiches Schema wie PARAMS in data.js,
        inkl. der neuen Felder formula/reaktion/morphologie/physiologie/patho).
     ------------------------------------------------------------------------- */
  const NEW_PARAMS = {
    ldh: { name: "Laktatdehydrogenase", abbr: "LDH", cat: "enzym", unit: "U/L", ref: { lo: 40, hi: 400, txt: "≈ 40–400 U/L (laborabh.)" },
      organs: ["leber", "muskel", "herz"], pathway: "anaerobe Glykolyse (Pyruvat↔Laktat)",
      reaktion: "Pyruvat + NADH ⇌ L-Laktat + NAD⁺",
      physiologie: "Ubiquitäres zytosolisches Enzym (Leber, Muskel, Herz, Erythrozyten) – sehr unspezifisch.",
      meaning: "Unspezifischer Zellschaden-Marker; nur im Kontext (mit CK/ALT) verwertbar.",
      high: ["Muskel-/Leberschaden", "Hämolyse (auch Probenartefakt)", "Neoplasie/Lymphom"],
      low: ["ohne Bedeutung"], diseases: ["Myopathie", "Hepatopathie", "Hämolyse"],
      next: "Isoenzyme oder begleitende CK/ALT zur Lokalisation; hämolytische Probe ausschließen." },

    gldh: { name: "Glutamatdehydrogenase", abbr: "GLDH", cat: "leber", unit: "U/L", ref: { lo: 0, hi: 10, txt: "0–10 U/L (laborabh.)" },
      organs: ["leber"], pathway: "mitochondrialer Aminosäure-/Harnstoff-Stoffwechsel",
      reaktion: "L-Glutamat + H₂O + NAD(P)⁺ ⇌ α-Ketoglutarat + NH₃ + NAD(P)H",
      physiologie: "Mitochondriales Enzym der Hepatozyten – tritt erst bei Zellnekrose (nicht nur Membranleck) aus.",
      meaning: "Marker für hepatozelluläre Nekrose; spezifischer als ALT für echten Zelltod.",
      high: ["Lebernekrose (Toxine, Hypoxie, Hitzschlag)", "schwere Hepatopathie"],
      low: ["ohne Bedeutung"], diseases: ["akute Lebernekrose", "toxische Hepatopathie"],
      next: "Mit ALT/AP/Gallensäuren/Gerinnung kombinieren; bei Nekrose Bildgebung + Toxinanamnese (Xylit, Aflatoxin, Pilze)." },

    eisen: { name: "Serum-Eisen", abbr: "Fe", cat: "spezial", unit: "µg/dL", ref: { lo: 60, hi: 200, txt: "≈ 60–200 µg/dL" },
      organs: ["leber", "knochenmark", "darm"], pathway: "Häm-Synthese; Speicherung als Ferritin",
      formula: "Fe²⁺ / Fe³⁺ (an Transferrin transportiert)",
      physiologie: "Zentral für die Häm- und damit Hämoglobinbildung; tageszeitlich schwankend.",
      meaning: "Eisenhaushalt – v. a. zur Abklärung mikrozytärer Anämien.",
      high: ["Hämolyse/Bluttransfusion", "Lebernekrose", "Eisenüberladung/-supplementierung"],
      low: ["chronische (GI-)Blutung → Eisenmangel", "chronische Entzündung (Eisen-Sequestrierung)"],
      diseases: ["Eisenmangelanämie", "chronische GI-Blutung"],
      next: "Mit Ferritin und Transferrinsättigung sowie MCV/MCH (mikrozytär-hypochrom) interpretieren; Blutungsquelle (Kot okkultes Blut) suchen." },

    ferritin: { name: "Ferritin", abbr: "Ferr", cat: "spezial", unit: "ng/mL", ref: { lo: 80, hi: 800, txt: "stark laborabhängig" },
      organs: ["leber", "knochenmark"], pathway: "intrazellulärer Eisenspeicher; Akute-Phase-Protein",
      physiologie: "Speicherform des Eisens; spiegelt die Eisenreserven wider, steigt aber auch bei Entzündung.",
      meaning: "Eisenspeicher- und (mit) Entzündungsmarker.",
      high: ["Entzündung (Akute-Phase)", "Lebererkrankung", "Histiozytäre Erkrankungen", "Eisenüberladung"],
      low: ["echter Eisenmangel (selten beim Hund, v. a. chronische Blutung)"],
      diseases: ["Eisenmangel", "histiozytäres Sarkom (sehr hoch)"],
      next: "Niedriges Ferritin beweist Eisenmangel; hohes ist unspezifisch (Entzündung vs. Speicherung)." },

    cobalamin: { name: "Cobalamin (Vitamin B12)", abbr: "B12", cat: "spezial", unit: "ng/L", ref: { lo: 250, hi: 900, txt: "≈ 250–900 ng/L (laborabh.)" },
      organs: ["darm", "pankreas", "leber"], pathway: "DNA-Synthese, Methylierung; resorbiert im Ileum (Intrinsic Factor aus Pankreas)",
      formula: "C₆₃H₈₈CoN₁₄O₁₄P",
      physiologie: "Wird im Ileum mit pankreatischem Intrinsic Factor resorbiert; Cobalt-haltiges Vitamin.",
      meaning: "Wichtig bei chronischer Darm-/Pankreaserkrankung (Malabsorption).",
      high: ["Supplementierung"],
      low: ["chronische Enteropathie (IBD)", "exokrine Pankreasinsuffizienz (EPI)", "Dünndarm-Dysbiose", "Ileumerkrankung"],
      diseases: ["chronische Enteropathie", "EPI", "Antibiotika-responsive Enteropathie"],
      next: "Mit Folat und TLI (cTLI für EPI) als GI-/Pankreaspanel; niedriges B12 → supplementieren (Prognosefaktor bei Enteropathie)." },

    folat: { name: "Folat (Vitamin B9)", abbr: "Fol", cat: "spezial", unit: "µg/L", ref: { lo: 7.5, hi: 17, txt: "≈ 7,5–17 µg/L (laborabh.)" },
      organs: ["darm"], pathway: "DNA-Synthese (mit B12); resorbiert im proximalen Dünndarm",
      formula: "C₁₉H₁₉N₇O₆",
      physiologie: "Resorption im proximalen Dünndarm; wird von Darmbakterien produziert.",
      meaning: "Teil des GI-Panels zur Lokalisierung von Resorptionsstörungen.",
      high: ["Dünndarm-Dysbiose (bakterielle Überwucherung)", "EPI"],
      low: ["proximale Dünndarmerkrankung (Malabsorption)"],
      diseases: ["chronische Enteropathie", "Dünndarm-Dysbiose"],
      next: "Folat↑ + B12↓ klassisch bei Dysbiose/EPI; mit cTLI und Klinik einordnen." },

    troponin: { name: "Kardiales Troponin I (cTnI)", abbr: "cTnI", cat: "endokrin", unit: "ng/mL", ref: { lo: 0, hi: 0.06, txt: "< 0,06 ng/mL (hochsensitiv niedriger)" },
      organs: ["herz"], pathway: "Regulatorprotein des Herzmuskel-Sarkomers",
      physiologie: "Strukturprotein des kardialen Sarkomers; wird bei Myokardschaden ins Blut freigesetzt – sehr herzspezifisch.",
      meaning: "Sensitiver, spezifischer Marker für Herzmuskelschaden beim Hund.",
      high: ["Myokarditis/Myokardschaden", "DCM", "Perikarderguss/Hämangiosarkom", "GDV/Sepsis/Schock", "Trauma"],
      low: ["unauffällig"], diseases: ["DCM", "Myokarditis", "Perikarderkrankung"],
      next: "Bei Herzverdacht (Synkope, Arrhythmie, Dobermann) → Echokardiografie, EKG, NT-proBNP; Verlauf bewerten." },

    ntprobnp: { name: "NT-proBNP", abbr: "proBNP", cat: "endokrin", unit: "pmol/L", ref: { lo: 0, hi: 900, txt: "< 900 pmol/L (Graubereich beachten)" },
      organs: ["herz"], pathway: "natriuretisches Peptid bei Volumen-/Drucküberlastung",
      physiologie: "Wird bei Dehnung der Herzmuskelzellen (Volumen-/Druckbelastung) ausgeschüttet.",
      meaning: "Unterscheidet kardiale von respiratorischer Ursache bei Husten/Dyspnoe.",
      high: ["kongestive Herzinsuffizienz", "DCM/Klappenerkrankung (MMVD)", "pulmonale Hypertonie", "Niereninsuffizienz (Clearance↓)"],
      low: ["kardiale Ursache der Dyspnoe unwahrscheinlich"],
      diseases: ["Herzinsuffizienz", "MMVD", "DCM"],
      next: "Hoher Wert bei Dyspnoe → Echokardiografie/Röntgen; normaler Wert macht kardiales Lungenödem unwahrscheinlich." },

    osmolalitaet: { name: "Serum-Osmolalität", abbr: "Osm", cat: "elektro", unit: "mOsm/kg", ref: { lo: 290, hi: 310, txt: "≈ 290–310 mOsm/kg" },
      organs: ["niere", "gefaess"], pathway: "Wasserhaushalt; rechnerisch aus Na, Glucose, Harnstoff",
      reaktion: "Osm ≈ 2×Na⁺ + Glucose/18 + BUN/2,8",
      physiologie: "Maß der gelösten Teilchen; steuert über ADH den Durst und die Wasserrückresorption.",
      meaning: "Wichtig bei Dys-/Hypernatriämie, Diabetes insipidus und Vergiftungen (osmotische Lücke).",
      high: ["Hypernatriämie/Dehydratation", "Hyperglykämie", "Urämie", "Ethylenglykol/Ethanol (osmotische Lücke↑)"],
      low: ["Überwässerung", "Hyponatriämie"],
      diseases: ["Diabetes insipidus", "Ethylenglykolvergiftung", "Hyperosmolares DM-Koma"],
      next: "Gemessene minus berechnete Osmolalität = osmotische Lücke; erhöht → an Frostschutz (Ethylenglykol) denken." },

    ph: { name: "Blut-pH (arteriell)", abbr: "pH", cat: "elektro", unit: "", ref: { lo: 7.35, hi: 7.45, txt: "7,35–7,45" },
      organs: ["niere", "gefaess"], pathway: "Säure-Basen-Haushalt (respiratorisch + metabolisch)",
      reaktion: "pH = 6,1 + log([HCO₃⁻] / (0,03 × pCO₂))  (Henderson-Hasselbalch)",
      physiologie: "Streng geregelt durch Puffer (HCO₃⁻), Lunge (CO₂) und Niere (H⁺/HCO₃⁻).",
      meaning: "Zentraler Wert der Blutgasanalyse; trennt Azidose von Alkalose.",
      high: ["Alkalose (metabolisch: Erbrechen; respiratorisch: Hyperventilation)"],
      low: ["Azidose (metabolisch: Schock/Laktat/DKA/Urämie; respiratorisch: Hypoventilation)"],
      diseases: ["metabolische Azidose", "respiratorische Störung"],
      next: "Mit pCO₂, HCO₃⁻, Anionenlücke und Laktat den Säure-Basen-Status komplett aufschlüsseln (primär vs. kompensatorisch)." },

    pco2: { name: "Kohlendioxid-Partialdruck", abbr: "pCO₂", cat: "elektro", unit: "mmHg", ref: { lo: 35, hi: 45, txt: "≈ 35–45 mmHg (arteriell)" },
      organs: ["gefaess", "niere"], pathway: "respiratorische Komponente des Säure-Basen-Haushalts",
      physiologie: "Spiegelt die alveoläre Ventilation: Hyperventilation senkt, Hypoventilation hebt CO₂.",
      meaning: "Respiratorischer Parameter der Blutgasanalyse.",
      high: ["Hypoventilation (Narkose, Atemdepression, Atemwegsobstruktion)", "respiratorische Azidose"],
      low: ["Hyperventilation (Schmerz, Hypoxie, Aufregung)", "respiratorische Kompensation einer metab. Azidose"],
      diseases: ["respiratorische Azidose/Alkalose"],
      next: "pCO₂ gegen pH/HCO₃⁻ lesen: respiratorisch vs. metabolisch, primär vs. kompensiert." },

    po2: { name: "Sauerstoff-Partialdruck", abbr: "pO₂", cat: "elektro", unit: "mmHg", ref: { lo: 80, hi: 100, txt: "≈ 80–100 mmHg (arteriell, Raumluft)" },
      organs: ["gefaess"], pathway: "Oxygenierung / Lungenfunktion",
      physiologie: "Gelöster Sauerstoff im arteriellen Blut; bestimmt zusammen mit Hb die O₂-Versorgung.",
      meaning: "Maß der Oxygenierung; ergänzt SpO₂ (Pulsoxymetrie).",
      high: ["Sauerstofftherapie/Hyperoxie"],
      low: ["Hypoxämie: Pneumonie, Lungenödem, Thromboembolie, Atemwegsobstruktion, Shunt"],
      diseases: ["Pneumonie", "Lungenödem", "Lungenthromboembolie"],
      next: "Niedriger pO₂ → Bildgebung (Röntgen/CT Thorax), Sauerstoff; mit Hb (Anämie) und Klinik bewerten." },

    antithrombin: { name: "Antithrombin (AT III)", abbr: "AT", cat: "thrombo", unit: "%", ref: { lo: 80, hi: 120, txt: "≈ 80–120 % der Norm" },
      organs: ["leber", "niere"], pathway: "wichtigster körpereigener Gerinnungshemmer",
      physiologie: "In der Leber gebildeter Inhibitor von Thrombin/Faktor Xa; geht bei Proteinverlust (Niere) verloren.",
      meaning: "Niedriges AT erklärt Thromboseneigung (z. B. nephrotisches Syndrom).",
      high: ["selten relevant"],
      low: ["Verbrauch bei DIC", "Verlust über die Niere (PLN, nephrotisches Syndrom)", "Leberinsuffizienz (Synthese↓)"],
      diseases: ["DIC", "nephrotisches Syndrom (Thromboserisiko)", "Leberversagen"],
      next: "Bei Proteinurie/Thrombose AT bestimmen; niedriges AT → Thromboseprophylaxe erwägen, Grundursache (PLN/Leber/DIC) klären." },

    rethe: { name: "Retikulozyten-Hämoglobin", abbr: "RET-He", cat: "ery", unit: "pg", ref: { lo: 22, hi: 28, txt: "≈ 22–28 pg (laborabh.)" },
      organs: ["knochenmark"], pathway: "Hb-Beladung der jüngsten Erythrozyten",
      physiologie: "Hämoglobingehalt der neuesten Erythrozyten – Echtzeit-Fenster der Eisenverfügbarkeit.",
      meaning: "Früher, sensibler Marker für funktionellen Eisenmangel (vor MCV/MCH).",
      high: ["unauffällig"],
      low: ["funktioneller Eisenmangel", "frühe Eisenmangelanämie (vor MCV-Abfall)"],
      diseases: ["Eisenmangelanämie"],
      next: "Niedriges RET-He bei Anämie → Eisenstatus (Fe, Ferritin) und Blutungsquelle prüfen; sehr früher Marker." }
  };

  /* -------------------------------------------------------------------------
     4) MERGE in das bestehende Datenmodell
     ------------------------------------------------------------------------- */
  Object.assign(H.PARAMS, NEW_PARAMS);
  Object.keys(EXTRA).forEach((id) => { if (H.PARAMS[id]) Object.assign(H.PARAMS[id], EXTRA[id]); });
  H.ORGAN3D = ORGAN3D;

  /* Organsystem-Farben für die 3D-Karte */
  H.ORGAN_SYS = {
    haemato:   { name: "Blutbildung", color: "#ff4d4d" },
    kreislauf: { name: "Herz/Kreislauf", color: "#f35588" },
    verdauung: { name: "Verdauung/Leber", color: "#ffd166" },
    harn:      { name: "Harnsystem", color: "#00ff87" },
    endokrin:  { name: "Endokrin", color: "#ffa6c9" },
    bewegung:  { name: "Muskel/Skelett", color: "#4dd4ff" }
  };

  /* Welcher Stoffwechsel läuft im jeweiligen Organ (verknüpft mit Canis Metabolica) */
  H.ORGAN_META = {
    leber:        "Zentrale Stoffwechselfabrik: Glykolyse & Glukoneogenese (Blutzucker), Glykogen-Speicher, Harnstoffzyklus (NH₃→Harnstoff), β-Oxidation & Ketogenese, Cholesterin-/Gallensäuresynthese, Eiweißsynthese (Albumin, Gerinnungsfaktoren) und Entgiftung.",
    niere:        "Filtration & Rückresorption: Ausscheidung von Harnstoff/Kreatinin/SDMA, Säure-Basen-Regulation (H⁺/HCO₃⁻), Elektrolyt- und Wasserhaushalt (ADH), Bildung von Erythropoetin (EPO) für die Blutbildung und Aktivierung von Vitamin D (Calcitriol).",
    herz:         "Aerober Dauerbetrieb: Oxidation von Fettsäuren & Laktat, sehr hoher ATP-Bedarf; Taurin-/Carnitin-abhängiger Muskel (DCM bei Mangel).",
    pankreas:     "Endokrin: Insulin (senkt) & Glukagon (hebt) regeln den Blutzucker. Exokrin: Lipase & Amylase für die Fett-/Kohlenhydratverdauung.",
    darm:         "Resorption von Glucose, Aminosäuren (Arginin!), Fetten sowie B12/Folat; die Pfortader transportiert alle Nährstoffe direkt zur Leber.",
    milz:         "Abbau alter Erythrozyten (Häm → Bilirubin), Eisen-Recycling, Blutspeicher und Immunfunktion.",
    knochenmark:  "Hämatopoese: Bildung von Erythrozyten (Häm aus Succinyl-CoA + Glycin), Leukozyten und Thrombozyten.",
    schilddruese: "Thyroxin (T4) setzt den Grundumsatz – steuert die Geschwindigkeit von Glykolyse, β-Oxidation und Wärmebildung im ganzen Körper.",
    nebenniere:   "Cortisol (Glukoneogenese↑, katabol), Aldosteron (Na⁺/K⁺-Haushalt) und Adrenalin (Glykogenolyse im Stress).",
    muskel:       "Glykogen-Speicher, anaerobe Glykolyse → Laktat (Cori-Zyklus mit der Leber) und Kreatinphosphat als Energiepuffer (CK).",
    gallenwege:   "Speicherung & Transport der Galle (Gallensäuren + Bilirubin) zur Fettverdauung im Darm; enterohepatischer Kreislauf.",
    gefaess:      "Transportraum: verteilt Glucose, Lipoproteine, Hormone und O₂/CO₂; Plasmaproteine (v. a. Albumin) halten den onkotischen Druck."
  };

  /* Metabolische / Blut-Verbindungen zwischen Organen (für die animierten Flüsse) */
  H.ORGAN_LINKS = [
    { a: "darm",         b: "leber",      label: "Nährstoffe & NH₃ (Pfortader)" },
    { a: "leber",        b: "niere",      label: "Harnstoff" },
    { a: "leber",        b: "gefaess",    label: "Glucose · Albumin · Gerinnung" },
    { a: "leber",        b: "gallenwege", label: "Galle-Produktion" },
    { a: "gallenwege",   b: "darm",       label: "Galle → Fettverdauung" },
    { a: "pankreas",     b: "gefaess",    label: "Insulin / Glukagon" },
    { a: "niere",        b: "knochenmark",label: "Erythropoetin (EPO)" },
    { a: "knochenmark",  b: "gefaess",    label: "Blutzellen" },
    { a: "milz",         b: "leber",      label: "Bilirubin (Häm-Abbau)" },
    { a: "muskel",       b: "leber",      label: "Laktat (Cori-Zyklus)" },
    { a: "muskel",       b: "niere",      label: "Kreatinin" },
    { a: "schilddruese", b: "gefaess",    label: "T4 → Grundumsatz" },
    { a: "nebenniere",   b: "niere",      label: "Aldosteron (Na/K)" },
    { a: "nebenniere",   b: "gefaess",    label: "Cortisol / Adrenalin" },
    { a: "herz",         b: "gefaess",    label: "Kreislauf (O₂-Transport)" }
  ];
})();
