/*
 * anaes-exotic-doses.js — PROVISORISCHE Exoten-Notfalldosen (Paket E), quellenbelegt +
 * adversarial 2-fach verifiziert (Carpenter Exotic Animal Formulary 5th ed. / BSAVA Exotic /
 * Plumb's / CliniPharm). ADDITIV: patcht NUR fehlende drug.species[art] (ueberschreibt nie Geprueftes).
 * Jede Dosis prov:true + Quelle/Konfidenz/Warnung -> TIERAERZTLICH PRUEFEN. Details: docs/EXOTEN-NOTFALLDOSEN.md
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else { root.ANAES_EXOTIC_DOSES = factory(); if (root.ANAES) root.ANAES_EXOTIC_DOSES.apply(root.ANAES); }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  var PATCH = {
    "atropin": {
      "chinchilla": {
        "low": 0.05,
        "high": 0.2,
        "unit": "mg/kg",
        "conc": "0.5 mg/mL",
        "route": "IV/IO/IM/SC (Notfall: IV/IO bevorzugt)",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "high",
        "notes": "Quelle: Morrisey & Carpenter, Exotic Animal Formulary (Morrisey 2004; Fehr 2005); Schweigart 1995 – zusammengefasst in vetpharm.uzh.ch/CliniPharm (Atropinsulfat, Chinchilla adult)",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz high – tierärztlich prüfen. Direkt fuer Chinchilla belegt"
      },
      "degu": {
        "low": 0.05,
        "high": 0.1,
        "unit": "mg/kg",
        "conc": "0.5 mg/mL",
        "route": "IV/IO/IM/SC (Notfall: IV/IO bevorzugt)",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "low",
        "notes": "Quelle: Keine Degu-spezifische Quelle vorhanden; Extrapolation von nahverwandten Hystricomorpha (Chinchilla/Meerschweinchen), Morrisey & Carpenter Exotic Animal Formulary / vetpharm.uzh.ch CliniPharm",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz low (EXTRAPOLATION) – tierärztlich prüfen. EXTRAPOLATION - keine art-spezifische Atropin-Dosis fuer Degu (Octodon degus) in Carpenter, BSAVA, Plumb's oder CliniPharm auffindbar"
      },
      "frettchen": {
        "low": 0.04,
        "high": 0.05,
        "unit": "mg/kg",
        "conc": "0.5 mg/mL",
        "route": "IV/IO/IM/SC/IT (Notfall/CPR: IV/IO bevorzugt)",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "high",
        "notes": "Quelle: Morrisey & Carpenter, Exotic Animal Formulary (Morrisey 2004: 0,04 mg/kg; Morrisey 1996: 0,05 mg/kg); vetpharm.uzh.ch CliniPharm (Atropinsulfat, Frettchen & Marder adult)",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz high – tierärztlich prüfen. Direkt fuer Frettchen belegt (0,04-0,05 mg/kg), entspricht der Kleintier-/RECOVER-Notfalldosis fuer vagale Bradykardie/Asystolie"
      }
    },
    "glyco": {
      "frettchen": {
        "low": 0.01,
        "high": 0.02,
        "unit": "mg/kg",
        "conc": "0.2 mg/mL",
        "route": "IV/IO/IM/SC",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "high",
        "notes": "Quelle: Carpenter Exotic Animal Formulary 5th ed. (Ferret section) / Vetlexicon Exotis Ferrets (Glycopyrrolate)",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz high – tierärztlich prüfen. Direkt fuer Frettchen belegt"
      },
      "chinchilla": {
        "low": 0.01,
        "high": 0.02,
        "unit": "mg/kg",
        "conc": "0.2 mg/mL",
        "route": "IV/IO/IM/SC",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "medium",
        "notes": "Quelle: Carpenter Exotic Animal Formulary 5th ed. (Rodents/Chinchilla-Konsens) / BSAVA Manual of Rodents & Ferrets",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz medium – tierärztlich prüfen. Formulary-Konsens fuer kleine Nager (0,01-0,02 mg/kg SC/IM), keine chinchilla-spezifische Einzelstudie"
      },
      "degu": {
        "low": 0.01,
        "high": 0.02,
        "unit": "mg/kg",
        "conc": "0.2 mg/mL",
        "route": "IM/SC (IV/IO bei Zugang)",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "low",
        "notes": "Quelle: Extrapolation von Hystricomorpha (Chinchilla/Meerschwein), Carpenter Exotic Animal Formulary 5th ed. Rodent-Konsens",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz low (EXTRAPOLATION) – tierärztlich prüfen. Keine degu-spezifische (Octodon degus) Dosis in Standardquellen"
      }
    },
    "adrenalin": {
      "chinchilla": {
        "low": 0.01,
        "high": 0.1,
        "unit": "mg/kg",
        "conc": "1 mg/mL (1:1000)",
        "route": "IV/IO (alternativ IT/intratracheal)",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "medium",
        "notes": "Quelle: Carpenter Exotic Animal Formulary 5th ed. (Emergency/CPR-Dosen Kleinsaeuger) + RECOVER-Konsens; keine chinchilla-spezifische Studie",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz medium – tierärztlich prüfen. Keine artspezifische Dosis publiziert; Formulary-/RECOVER-Konsens fuer Exoten-Kleinsaeuger, konsistent mit Hund/Kaninchen"
      },
      "degu": {
        "low": 0.01,
        "high": 0.1,
        "unit": "mg/kg",
        "conc": "1 mg/mL (1:1000)",
        "route": "IV/IO (alternativ IT/intratracheal)",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "low",
        "notes": "Quelle: Extrapolation (kein Degu-Datensatz); abgeleitet von Chinchilla/Meerschwein/Ratte + RECOVER-Konsens",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz low (EXTRAPOLATION) – tierärztlich prüfen. Keine belastbare Degu-spezifische Quelle vorhanden"
      }
    },
    "atipamezol": {
      "meerschwein": {
        "low": 0.1,
        "high": 1,
        "unit": "mg/kg",
        "conc": "5 mg/mL",
        "route": "SC/IM",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "high",
        "notes": "Quelle: Carpenter Exotic Animal Formulary 5th ed. (2018); Antisedan/Rodent-Formulary-Konsens",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz high – tierärztlich prüfen. Zur Aufhebung von (Dex)Medetomidin"
      },
      "chinchilla": {
        "low": 0.1,
        "high": 1,
        "unit": "mg/kg",
        "conc": "5 mg/mL",
        "route": "SC/IM",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "medium",
        "notes": "Quelle: Carpenter Exotic Animal Formulary 5th ed. (2018) / Formulary-Konsens (Rodentia)",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz medium – tierärztlich prüfen. Aufhebung Medetomidin/Dexmedetomidin nach 5x-Regel bzw"
      },
      "degu": {
        "low": 0.5,
        "high": 1,
        "unit": "mg/kg",
        "conc": "5 mg/mL",
        "route": "SC/IM",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "low",
        "notes": "Quelle: Extrapolation von Meerschwein/Chinchilla (Carpenter Exotic Animal Formulary 5th ed.); keine art-spezifische Publikation",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz low (EXTRAPOLATION) – tierärztlich prüfen. EXTRAPOLATION: Fuer Degu (Octodon degus) existiert keine belastbare eigene Atipamezol-Dosis"
      },
      "frettchen": {
        "low": 0.5,
        "high": 1,
        "unit": "mg/kg",
        "conc": "5 mg/mL",
        "route": "IM/SC",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "high",
        "notes": "Quelle: Carpenter Exotic Animal Formulary 5th ed. (2018) / BSAVA Manual of Ferrets",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz high – tierärztlich prüfen. Aufhebung (Dex)Medetomidin; 5x die Medetomidin-mg bzw"
      },
      "reptil": {
        "low": 0.25,
        "high": 0.5,
        "unit": "mg/kg",
        "conc": "5 mg/mL",
        "route": "IM/SC",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "low",
        "notes": "Quelle: Carpenter Exotic Animal Formulary 5th ed. (2018), Reptilien-Abschnitt (Regel: 4-5x Medetomidin-Dosis)",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz low (EXTRAPOLATION) – tierärztlich prüfen. Massgebliche Regel bei Reptilien: 4-5x die verabreichte Medetomidin-mg (mg/kg-Spanne ist ableitend, je nach Medetomidin-Dosis)"
      }
    },
    "flumazenil": {
      "meerschwein": {
        "low": 0.05,
        "high": 0.1,
        "unit": "mg/kg",
        "conc": "0.1 mg/mL",
        "route": "IV/IM",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "medium",
        "notes": "Quelle: Carpenter Exotic Animal Formulary 5th ed. (Kleinsaeuger-/Nager-Konsens); keine meerschwein-spezifische PK-Studie",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz medium – tierärztlich prüfen. Kein Meerschwein-spezifischer Beleg"
      },
      "chinchilla": {
        "low": 0.05,
        "high": 0.1,
        "unit": "mg/kg",
        "conc": "0.1 mg/mL",
        "route": "IV/IM",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "medium",
        "notes": "Quelle: Carpenter Exotic Animal Formulary 5th ed. (Kleinsaeuger-Konsens); Extrapolation, keine chinchilla-spezifische Studie",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz medium – tierärztlich prüfen. Keine chinchilla-spezifische Dosisstudie"
      },
      "degu": {
        "low": 0.05,
        "high": 0.1,
        "unit": "mg/kg",
        "conc": "0.1 mg/mL",
        "route": "IV/IM",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "low",
        "notes": "Quelle: Extrapolation vom Meerschwein/Kleinsaeuger-Konsens (Carpenter Exotic Animal Formulary 5th ed.); keine degu-spezifische Quelle",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz low (EXTRAPOLATION) – tierärztlich prüfen. Keine degu-spezifische Quelle vorhanden"
      },
      "frettchen": {
        "low": 0.05,
        "high": 0.05,
        "unit": "mg/kg",
        "conc": "0.1 mg/mL",
        "route": "IM",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "high",
        "notes": "Quelle: BSAVA Manual/Formulary of Exotic Pets (Part B, Exotic Pets); Carpenter Exotic Animal Formulary 5th ed.",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz high – tierärztlich prüfen. 0.05 mg/kg kehrt Midazolam wirksam um; IM oder intranasal belegt, IV moeglich"
      },
      "kaninchen": {
        "low": 0.05,
        "high": 0.1,
        "unit": "mg/kg",
        "conc": "0.1 mg/mL",
        "route": "IV",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "high",
        "notes": "Quelle: PK/PD-Studie IV Midazolam+Flumazenil beim Kaninchen, Comp Med (PMC8145127, 2021); Carpenter Exotic Animal Formulary 5th ed.",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz high – tierärztlich prüfen. 0.05 mg/kg IV direkt belegt: Aufhebung des Righting-Reflex-Verlusts in ~23 s (25x schneller als Kontrolle)"
      },
      "reptil": {
        "low": 0.05,
        "high": 0.05,
        "unit": "mg/kg",
        "conc": "0.1 mg/mL",
        "route": "SC/IM/IV",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "medium",
        "notes": "Quelle: Carpenter Exotic Animal Formulary 5th ed.; ARAV Reptile Sedation/Anesthesia Proceedings 2015; Midazolam/Flumazenil-Studien Ball Python (Python regius) 2019, Kornnatter/Kingsnake",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz medium – tierärztlich prüfen. 0.05 mg/kg SC/IM/IV kehrt Midazolam um; in Ball Python, Kornnatter, Mexican Black Kingsnake belegt, keine adversen kardiorespiratorischen Effekte"
      }
    },
    "naloxon": {
      "meerschwein": {
        "low": 0.01,
        "high": 0.04,
        "unit": "mg/kg",
        "conc": "0.4 mg/mL",
        "route": "IV/IM/SC",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "low",
        "notes": "Quelle: Carpenter Exotic Animal Formulary (5th ed., 2018) / Plumb's Veterinary Drug Handbook — Kleinsaeuger-Konsens",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz low (EXTRAPOLATION) – tierärztlich prüfen. Keine meerschwein-spezifische PK; Dosis aus Kleinsaeuger-/Nager-Formularkonsens"
      },
      "chinchilla": {
        "low": 0.01,
        "high": 0.04,
        "unit": "mg/kg",
        "conc": "0.4 mg/mL",
        "route": "IV/IM/SC",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "low",
        "notes": "Quelle: Carpenter Exotic Animal Formulary (5th ed., 2018) / Plumb's — Kleinsaeuger-Konsens",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz low (EXTRAPOLATION) – tierärztlich prüfen. Keine chinchilla-spezifische Quelle; Extrapolation vom Kleinsaeuger-/Nagerkonsens"
      },
      "degu": {
        "low": 0.01,
        "high": 0.04,
        "unit": "mg/kg",
        "conc": "0.4 mg/mL",
        "route": "IV/IM/SC",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "low",
        "notes": "Quelle: Extrapolation vom Meerschwein/Nager-Konsens (Carpenter Exotic Animal Formulary 5th ed.); keine degu-spezifische Publikation",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz low (EXTRAPOLATION) – tierärztlich prüfen. Keine belastbare degu-spezifische Dosis in der Literatur"
      },
      "frettchen": {
        "low": 0.01,
        "high": 0.04,
        "unit": "mg/kg",
        "conc": "0.4 mg/mL",
        "route": "IV/IM/SC",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "medium",
        "notes": "Quelle: Carpenter Exotic Animal Formulary (5th ed., 2018) / Plumb's Veterinary Drug Handbook",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz medium – tierärztlich prüfen. In Exoten-Formularen fuer Frettchen gelistet; Dosis wie Hund/Katze"
      },
      "reptil": {
        "low": 0.04,
        "high": 0.2,
        "unit": "mg/kg",
        "conc": "0.4 mg/mL",
        "route": "SC/IM",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "low",
        "notes": "Quelle: ARAV / ExoticsCon Reptile Sedation, Anesthesia & Analgesia Proceedings (Sladky/Mans); reptile-spezifische Reversal-Empfehlung",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz low (EXTRAPOLATION) – tierärztlich prüfen. Hoehere Dosis als bei Saeugern noetig (Reptilien-mu-Rezeptorbindung)"
      }
    },
    "ephedrin": {
      "meerschwein": {
        "low": 0.05,
        "high": 0.2,
        "unit": "mg/kg",
        "conc": "50 mg/mL",
        "route": "IV (alt. IO)",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "low",
        "notes": "Quelle: Keine artspezifische Quelle; Carpenter's Exotic Animal Formulary (5th/6th ed.) fuehrt kein Ephedrin fuer Nager. Extrapolation der Hund/Katze-Dosis (0,05-0,2 mg/kg IV, Kleintier-Anaesthesie-Konsens, WSAVA/dvm360)",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz low (EXTRAPOLATION) – tierärztlich prüfen. Extrapolation vom Hund/Katze - keine belegte Meerschwein-Dosis"
      },
      "chinchilla": {
        "low": 0.05,
        "high": 0.2,
        "unit": "mg/kg",
        "conc": "50 mg/mL",
        "route": "IV (alt. IO)",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "low",
        "notes": "Quelle: Keine artspezifische Quelle; kein Ephedrin-Eintrag in Carpenter/BSAVA fuer Chinchilla. Extrapolation der Hund/Katze-Dosis (0,05-0,2 mg/kg IV)",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz low (EXTRAPOLATION) – tierärztlich prüfen. Reine Extrapolation vom Hund/Katze - keine belegte Chinchilla-Dosis"
      },
      "degu": {
        "low": 0.05,
        "high": 0.2,
        "unit": "mg/kg",
        "conc": "50 mg/mL",
        "route": "IV (alt. IO)",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "low",
        "notes": "Quelle: Keine belastbare artspezifische Quelle; Degu in keinem Formulary mit Ephedrin gelistet. Extrapolation der Hund/Katze-Dosis bzw. vom Meerschwein (0,05-0,2 mg/kg IV)",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz low (EXTRAPOLATION) – tierärztlich prüfen. Schwaechste Datenlage der Nager - Extrapolation vom Meerschwein/Hund"
      },
      "frettchen": {
        "low": 0.05,
        "high": 0.2,
        "unit": "mg/kg",
        "conc": "50 mg/mL",
        "route": "IV (alt. IO)",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "low",
        "notes": "Quelle: Keine ferret-spezifische Ephedrin-Vasopressor-Dosis publiziert; Frettchen-Anaesthesie extrapoliert ueblicherweise Katzen-Werte. Extrapolation Hund/Katze (0,05-0,2 mg/kg IV)",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz low (EXTRAPOLATION) – tierärztlich prüfen. Extrapolation von der Katze (physiologisch naeheliegend), aber keine direkt belegte Frettchen-Dosis"
      },
      "kaninchen": {
        "low": 0.05,
        "high": 0.2,
        "unit": "mg/kg",
        "conc": "50 mg/mL",
        "route": "IV (alt. IO)",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "low",
        "notes": "Quelle: Keine im Formulary verankerte Ephedrin-Dosis; Extrapolation Hund/Katze (0,05-0,2 mg/kg IV). Kaninchen-Anaesthesie-Literatur (ExoticsCon 2020; Clinician's Brief - Anesthesia in Small Mammals)",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz low (EXTRAPOLATION) – tierärztlich prüfen. Extrapolation vom Hund/Katze"
      }
    },
    "lidocain_iv": {
      "frettchen": {
        "low": 0.25,
        "high": 1,
        "unit": "mg/kg",
        "conc": "20 mg/mL (2%)",
        "route": "IV (langsamer Bolus, auf Wirkung titriert)",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "low",
        "notes": "Quelle: Ferret Cardiology, Vet Clin North Am Exot Anim Pract 2022; Carpenter Exotic Animal Formulary 5th ed.",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz low (EXTRAPOLATION) – tierärztlich prüfen. Bei ventrikulaerer Tachykardie einsetzbar, aber Dosis UNTER die Katzendosis (0,25-1 mg/kg) reduzieren und langsam i.v"
      },
      "kaninchen": {
        "low": 1,
        "high": 2,
        "unit": "mg/kg",
        "conc": "20 mg/mL (2%)",
        "route": "IV (langsamer Bolus, ggf. + CRI 50 ug/kg/min)",
        "indication": "Exoten-Notfall",
        "prov": true,
        "conf": "low",
        "notes": "Quelle: Carpenter Exotic Animal Formulary 5th ed.; rabbit lidocaine literature (Bolus 1-2 mg/kg + CRI ~50 ug/kg/min)",
        "caution": "⚠ PROVISORISCH – Exoten-Recherche, Konfidenz low (EXTRAPOLATION) – tierärztlich prüfen. Beim Kaninchen ist Lidocain v.a"
      }
    }
  };
  function apply(ANAES) {
    if (!ANAES || !ANAES.drugs) return 0; var n = 0;
    ANAES.drugs.forEach(function (d) { var p = PATCH[d.id]; if (!p) return; d.species = d.species || {};
      Object.keys(p).forEach(function (sp) { if (d.species[sp] == null || d.species[sp].low == null) { d.species[sp] = p[sp]; n++; } }); });
    return n;
  }
  return { patch: PATCH, apply: apply };
});
