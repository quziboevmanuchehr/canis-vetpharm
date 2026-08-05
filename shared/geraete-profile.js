/* ============================================================================
   shared/geraete-profile.js  ·  VetStation / Canis Anæsthesia
   DAS UNIVERSELLE VIRTUELLE GERAET  ·  root.VETGERAET
   ----------------------------------------------------------------------------
   WARUM ES DIESE DATEI GIBT (Wunsch 05.08.2026, woertlich):
   "Es muss eine universale Monitor und kapnograph Virtuell sein, damit fuer alle
    Monitorgeraete und auch kapnograph und Narkosegeraete passt."

   Bis hierher war das virtuelle Geraet FEST verdrahtet: im Bild stand "mindray
   uMEC12 Vet" und "mindray Veta 5 Plus", es hatte GENAU sechs Messkanaele
   (HF/SpO2/EtCO2/NIBP/AF/Temp) und GENAU drei Kurvenbahnen (EKG/Pleth/Kapno).
   Wer einen Draeger, einen Bionet, einen EDAN oder einen SurgiVet vor sich hat,
   sah trotzdem ein Mindray — und wer einen Veta 5 Plus vor sich hat, sah nur die
   HAELFTE dessen, was auf dem echten Bildschirm steht: FiCO2, Paw-Kurve, Ppeak,
   PEEP, gemessenes Vt, MV und die Alarmgrenzen neben jeder Zahl fehlten alle.

   Diese Datei ist die EINE Quelle fuer die Frage "was kann dieses Geraet, und wie
   sieht es aus?". Sie ist reine Daten plus reine Funktionen — kein DOM, keine
   Netzverbindung, kein require. Deshalb laeuft sie identisch
     * im Kiosk-Browser der Station   (ui/app/index.html)
     * in der Fern-Web-App            (canis-vetpharm/canis-anaesthesie)
     * in der Bridge unter Node       (bridge/src/*)
   Genau das ist die Bedingung dafuer, dass "die Kurven und Werte und Einstellungen
   ueberall gleich sind": es gibt nur eine Beschreibung, nicht drei Kopien.

   >>> DIE LEHRE, DIE HIER VERBAUT IST (Befund 04.08.2026):
   `bridge/src/anaes.js` zog jahrelang `ui/vendor/anaes-data.js`, waehrend der
   Browser `ui/app/anaes-data.js` lud — eine Kopie neben dem Original ist eine
   Zeitbombe mit Zufallszuender. Von dieser Datei darf es deshalb NIE eine zweite
   Fassung geben. Wer sie in die Web-App bringt, KOPIERT die Datei, er schreibt sie
   nicht ab.

   >>> READ-ONLY, WIE DIE GANZE STATION:
   Kein Eintrag hier beschreibt je einen Weg, an einem echten Geraet etwas zu
   VERSTELLEN. Profile beschreiben, WAS ein Geraet anzeigt und liefert — mehr nicht.

   >>> EHRLICHKEIT VOR VOLLSTAENDIGKEIT:
   `vertrauen` sagt dasselbe wie im Geraetekatalog:
     'belegt'         am echten Geraet gesehen / im Herstellerdokument nachgelesen
     'wahrscheinlich' gut begruendet (Baugleichheit), aber nicht nachgemessen
     'unbestaetigt'   Hinweis aus zweiter Hand — wird dem Anwender AUCH SO angezeigt
   Ein geratener Messwert am narkotisierten Tier ist der schlimmste Fehler, den
   dieses Programm machen kann. Ein Kanal, den ein Geraet nicht hat, steht deshalb
   NICHT im Profil — dann zeigt das virtuelle Geraet dort auch nichts, statt eine
   Messung vorzutaeuschen (siehe LifeVet M: kein CO2-Modul verbaut).
   ============================================================================ */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.VETGERAET = factory(); }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ==========================================================================
   * 1) MESSKANAELE — alles, was ein virtuelles Geraet als ZAHL zeigen kann.
   *
   * Aufbau eines Kanals:
   *   id        eindeutig; identisch zum Feldnamen im Bridge-Datenmodell
   *   abbr      Kurzname wie er am Geraet steht ("EtCO₂", "MAX", "Vt")
   *   name      Klartext fuer die Detailansicht
   *   unit      Einheit wie am Geraet
   *   color     Kachelfarbe (Mindray-nah, damit das Bild wiedererkennbar bleibt)
   *   art       'kreislauf' | 'atmung' | 'beatmung' | 'gas' | 'temperatur'
   *   quelle    'monitor' | 'narkose' | 'beides'  — welches Geraet es normalerweise misst
   *   vital     Schluessel in ANAES.vitals[art] (Normband der Tierart), sonst null
   *   band(ctx) eigenes Normband, wenn es NICHT aus der Tierart-Tabelle kommt.
   *             ctx = { sp, wt, vitals, spSet, dev } — spSet = settingsBySpecies[sp]
   *   eingabe   true = der Tierarzt kann den Wert im Ist-Modus eintippen
   *   dez       Nachkommastellen der Anzeige
   *   lowInc/highInc  Zwischenfall-Protokoll, in das die Kachel verlinkt
   *   explain   was der Wert bedeutet (Detailansicht)
   *
   * Die ersten sechs Kanaele sind ABSICHTLICH id-gleich mit ANAES.monitor.params —
   * die App verschmilzt beide, damit die dort gepflegten langen Erklaertexte
   * erhalten bleiben und nicht doppelt gepflegt werden muessen.
   * ========================================================================== */

  function z(x) { return (x == null || isNaN(x)) ? null : x; }
  function rnd(x, d) { var f = Math.pow(10, d || 0); return Math.round(x * f) / f; }

  /*
   * vtSpanne(ctx) -> [ml unten, ml oben] fuer DIESEN Patienten.
   *
   * LUNGENSCHONEND 8–12 ml/kg (AAHA/ACVAA 2020, J Vet Sci 2019) — dieselbe Zahl, die in
   * ANAES.machine.ventParams.vt.hint steht. Bewusst NICHT die aeltere Vorgabe
   * settingsBySpecies[art].tvMlKg (10–15): mit deren Untergrenze haette das virtuelle Geraet die
   * 36 ml vom Veta-5-Foto (= 8,4 ml/kg bei 4,3 kg Katze) als "Vt zu tief" alarmiert — also
   * ausgerechnet eine lungenschonende Einstellung angemahnt.
   *
   * EINE Funktion, weil das Minutenvolumen dasselbe Band braucht: MV = Vt x AF. Zwei getrennte
   * Rechnungen hatten genau den Widerspruch erzeugt, den der Test jetzt verhindert.
   */
  function vtSpanne(c) {
    var tv = (c && c.spSet && c.spSet.tvMlKg) || [8, 12], w = (c && c.wt) || 0;
    var lo = Math.min(8, tv[0]), hi = Math.min(12, Math.max(tv[1], 12));
    return [lo * w, hi * w];
  }

  var KANAELE = [
    /* ---------------- Kreislauf (Monitor) ---------------- */
    {
      id: 'hr', abbr: 'HF', name: 'Herzfrequenz (EKG)', unit: '/min', color: '#28e07a',
      art: 'kreislauf', quelle: 'monitor', vital: 'hr', eingabe: true, dez: 0,
      lowInc: 'bradykardie', highInc: 'tachykardie',
      explain: 'EKG-Ableitung II – Rhythmus + Frequenz. Achte auf Arrhythmien (VES, AV-Block, Vorhofflimmern).',
    },
    {
      id: 'spo2', abbr: 'SpO₂', name: 'Sauerstoffsättigung (Pleth)', unit: '%', color: '#00d8ff',
      art: 'kreislauf', quelle: 'monitor', vital: 'spo2', eingabe: true, dez: 0,
      lowInc: 'hypoxaemie',
      explain: 'Pulsoxymetrie (Zunge/Ohr/Pfote). ≥ 95 %. SpO₂ reagiert verzögert (~30 s) → der Kapnograf ist schneller.',
    },
    {
      id: 'nibp', abbr: 'MAP', name: 'Blutdruck (NIBP)', unit: 'mmHg', color: '#f35588',
      art: 'kreislauf', quelle: 'monitor', vital: 'map', eingabe: true, dez: 0, paar: ['sys', 'dia'],
      lowInc: 'hypotension', highInc: 'hypertension',
      explain: 'Oszillometrische Manschette. SYS/DIA eingeben – MAP = DIA + (SYS−DIA)/3. Ziel MAP 60–70+.',
    },
    {
      /* start: 0 -> die Kachel bleibt "– –", solange kein Katheter misst. Den invasiven Druck
       * aus der Manschette abzuleiten waere eine erfundene Messung: er ist die GENAUERE
       * Zahl und wuerde eine Genauigkeit vortaeuschen, die es ohne Katheter nicht gibt. */
      id: 'ibp', abbr: 'ART', name: 'Arterieller Druck (invasiv, IBP)', unit: 'mmHg', color: '#ff5d7a',
      art: 'kreislauf', quelle: 'monitor', vital: 'map', eingabe: true, dez: 0, start: 0,
      lowInc: 'hypotension', highInc: 'hypertension',
      explain: 'Invasiv über Arterienkatheter — Schlag-für-Schlag statt alle paar Minuten. Nullabgleich auf Herzhöhe; ' +
        'gedämpfte Kurve (Luftblase/Thrombus) täuscht zu niedrige Werte vor. Bei Widerspruch zur Manschette gilt die Kurve.',
    },
    {
      id: 'pi', abbr: 'PI', name: 'Perfusionsindex (Pleth)', unit: '%', color: '#6ee7ff',
      art: 'kreislauf', quelle: 'monitor', eingabe: true, dez: 1, start: 3,
      band: function () { return [0.6, 20]; },
      explain: 'Stärke des pulsatilen Anteils am Pleth-Signal. Fällt bei Vasokonstriktion, Hypothermie und niedrigem ' +
        'Herzauswurf — ein SpO₂-Wert bei sehr niedrigem PI ist unzuverlässig.',
    },

    /* ---------------- Atmung / Kapnograf ---------------- */
    {
      id: 'etco2', abbr: 'EtCO₂', name: 'End-CO₂ (Kapnograf)', unit: 'mmHg', color: '#ffd166',
      art: 'atmung', quelle: 'beides', vital: 'etco2', eingabe: true, dez: 0,
      lowInc: 'apnoe', highInc: 'hypoventilation',
      explain: 'Bestätigt Intubation + Ventilation. Die KURVENFORM ist der wichtigste Frühwarner. Ziel 35–45 mmHg.',
    },
    {
      id: 'fico2', abbr: 'FiCO₂', name: 'Eingeatmetes CO₂ (inspiratorisch)', unit: 'mmHg', color: '#ffb020',
      art: 'atmung', quelle: 'beides', eingabe: true, dez: 0, highInc: 'hypoventilation', start: 0,
      band: function () { return [0, 3]; },
      /* Am echten Veta 5 Plus (Foto 30.07.2026) stand FiCO2 = 8 mit gruen hinterlegtem Alarm
       * "FiCO2 zu hoch" und einer Kapnokurve, deren Grundlinie NICHT mehr auf 0 zurueckging.
       * Genau das ist Rueckatmung — und genau dieser Kanal fehlte dem virtuellen Geraet. */
      explain: 'CO₂ am ENDE der Einatmung. Muss ~0 sein. Über 3–5 mmHg = RÜCKATMUNG: Atemkalk erschöpft, ' +
        'Ventil im Kreissystem defekt/klemmend, Frischgasfluss zu niedrig oder Totraum zu groß. ' +
        'Die Kapnokurve zeigt es als angehobene Grundlinie — der EtCO₂ steigt dann mit, ohne dass die ' +
        'Ventilation schlechter geworden wäre. Erst Kalk/Ventile/Flow prüfen, nicht einfach mehr beatmen.',
    },
    {
      id: 'rr', abbr: 'AF', name: 'Atemfrequenz', unit: '/min', color: '#a78bfa',
      art: 'atmung', quelle: 'beides', vital: 'rr', eingabe: true, dez: 0,
      lowInc: 'apnoe', highInc: 'tachypnoe',
      explain: 'Spontan oder beatmet. Hohe AF + hohes EtCO₂ = Hypoventilation trotz schneller Atmung.',
    },

    /* ---------------- Temperatur ---------------- */
    {
      id: 'temp', abbr: 'T1', name: 'Temperatur (Sonde 1)', unit: '°C', color: '#ff8c6b',
      art: 'temperatur', quelle: 'monitor', vital: 'temp', eingabe: true, dez: 1,
      lowInc: 'hypothermie', highInc: 'hyperthermie',
      explain: 'Ösophageal/rektal. Fällt unter Narkose rasch (v. a. kleine Patienten & Exoten).',
    },
    {
      id: 'temp2', abbr: 'T2', name: 'Temperatur (Sonde 2)', unit: '°C', color: '#ffab8b',
      art: 'temperatur', quelle: 'monitor', vital: 'temp', eingabe: true, dez: 1,
      lowInc: 'hypothermie', highInc: 'hyperthermie',
      explain: 'Zweite Sonde (z. B. peripher). Die DIFFERENZ zur Kerntemperatur ist das eigentlich Interessante: ' +
        'ein großer Spalt spricht für Zentralisation/schlechte periphere Durchblutung.',
    },

    /* ---------------- Beatmung (Narkosegeraet / Ventilator) ----------------
     * Alle folgenden Kanaele stehen so auf dem Bildschirm des Veta 5 Plus
     * (Fotos 30.07. und 04.08.2026) und auf jedem gleichwertigen Ventilator. */
    {
      id: 'ppeak', abbr: 'MAX', name: 'Spitzendruck im Atemweg (Ppeak / Pmax)', unit: 'cmH₂O', color: '#ffd166',
      art: 'beatmung', quelle: 'narkose', eingabe: true, dez: 0, highInc: 'hypoxaemie',
      band: function (c) { var pip = (c.spSet && c.spSet.pip) || 15; return [Math.max(3, Math.round(pip * 0.4)), pip]; },
      explain: 'Höchster Druck, der im Atemweg wirklich erreicht wird. Steigt bei Tubusknick/Sekret, Bronchospasmus, ' +
        'schlechter Compliance (Kapnoperitoneum, Lagerung) — und bei zu großem Vt. Kleintier-Ziel 8–12, ' +
        'Grenze 15–20 cmH₂O; Exoten/Neonaten deutlich niedriger. Am Veta 5 heißt dieser Wert "MAX".',
    },
    {
      id: 'pmean', abbr: 'Pmean', name: 'Mittlerer Atemwegsdruck', unit: 'cmH₂O', color: '#e0c060',
      art: 'beatmung', quelle: 'narkose', eingabe: false, dez: 1,
      band: function (c) { var pip = (c.spSet && c.spSet.pip) || 15; return [1, Math.round(pip * 0.5)]; },
      explain: 'Der über den ganzen Atemzyklus gemittelte Druck. Er — nicht der Spitzendruck — bestimmt, wie stark ' +
        'die Beatmung den venösen Rückstrom und damit den Blutdruck drückt. Bei Hypotension niedrig halten.',
    },
    {
      id: 'peep', abbr: 'PEEP', name: 'Positiver end-exspiratorischer Druck (gemessen)', unit: 'cmH₂O', color: '#7fd4ff',
      art: 'beatmung', quelle: 'narkose', eingabe: true, dez: 0,
      band: function () { return [0, 8]; },
      explain: 'Restdruck am Ende der Ausatmung. Hält Alveolen offen (Atelektase-Schutz). Ein GEMESSENER PEEP, der ' +
        'deutlich über dem eingestellten liegt, ist Auto-PEEP/Air-Trapping → Exspiration verlängern (I:E 1:3–1:4).',
    },
    {
      id: 'vte', abbr: 'Vt', name: 'Ausgeatmetes Atemzugvolumen (gemessen)', unit: 'ml', color: '#00d8ff',
      art: 'beatmung', quelle: 'narkose', eingabe: true, dez: 0,
      band: function (c) { var b = vtSpanne(c); return [Math.max(1, Math.round(b[0])), Math.max(2, Math.round(b[1]))]; },
      explain: 'Was wirklich zurückkommt. Lungenschonend 8–12 ml/kg (kranke Lunge 6–8). Liegt es deutlich unter dem ' +
        'eingestellten Vt: Leck (Cuff, Schlauch, Absorberdichtung) oder — in PCV — schlechte Compliance.',
    },
    {
      id: 'mv', abbr: 'MV', name: 'Atemminutenvolumen', unit: 'L/min', color: '#00c2e8',
      art: 'beatmung', quelle: 'narkose', eingabe: false, dez: 2,
      band: function (c) {
        /* MV = Vt x AF, also ist sein Band das Produkt der BEIDEN Baender, die daneben stehen.
         * Beide werden aus derselben Quelle geholt wie die jeweilige Kachel: das Volumen aus
         * vtSpanne(), die Frequenz aus ANAES.vitals[art].rr. Sonst widersprechen sich zwei
         * Kacheln desselben Bildes — gemessen am 05.08.2026 bei der Katze: die AF stand im
         * gruenen Bereich (Norm bis 25) und das daraus gerechnete MV schlug Alarm (Beatmungs-
         * vorgabe bis 14). Ein Alarm, dessen Ursache daneben als normal gilt, wird zu Recht
         * ignoriert — und dann werden auch die echten ignoriert. */
        var vt = vtSpanne(c);
        var rr = (c.vitals && c.vitals.rr) || (c.spSet && c.spSet.rr) || [8, 14];
        return [rnd(vt[0] * rr[0] / 1000, 2), rnd(vt[1] * rr[1] / 1000, 2)];
      },
      explain: 'Vt × AF. Die eigentliche Stellgröße für das EtCO₂: alveoläre Ventilation ∝ 1/PaCO₂. Bei Hyperkapnie ' +
        'ZUERST die Frequenz erhöhen (mehr Minutenvolumen ohne höheren Druck), erst dann das Vt.',
    },
    {
      id: 'compl', abbr: 'Cdyn', name: 'Dynamische Compliance', unit: 'ml/cmH₂O', color: '#9ae6b4',
      art: 'beatmung', quelle: 'narkose', eingabe: false, dez: 1,
      band: function (c) { var w = c.wt || 0; return [rnd(0.6 * w, 1), rnd(2.5 * w, 1)]; },
      explain: 'Vt geteilt durch (Ppeak − PEEP) — wie „weich" die Lunge ist. Fällt bei Atelektase, Kapnoperitoneum, ' +
        'Lungenödem und einseitiger Intubation. Der Trend ist aussagekräftiger als der Absolutwert.',
    },
    {
      id: 'ie', abbr: 'I:E', name: 'Atemzeitverhältnis (gemessen)', unit: '', color: '#c0a8ff',
      art: 'beatmung', quelle: 'narkose', eingabe: false, dez: 1, text: true,
      explain: 'Verhältnis Einatmung : Ausatmung. Routine 1:2; bei Obstruktion/Air-Trapping 1:3 bis 1:4.',
    },

    /* ---------------- Gase (Narkosegeraet / Gasmodul) ---------------- */
    {
      id: 'fio2', abbr: 'FiO₂', name: 'Eingeatmete Sauerstoffkonzentration', unit: '%', color: '#8fe3ff',
      art: 'gas', quelle: 'narkose', eingabe: true, dez: 0, lowInc: 'hypoxaemie', start: 95,
      band: function () { return [30, 100]; },
      explain: 'Sauerstoffanteil im Frischgas. Unter 30 % ist im Kreissystem ein Alarm (Lachgas/Luftbeimischung, ' +
        'O₂-Ausfall). Dauerhaft 100 % begünstigt Resorptionsatelektasen — nach der Einleitung senken, wenn SpO₂ es zulässt.',
    },
    {
      id: 'etAgent', abbr: 'EtAA', name: 'Ausgeatmete Narkosegaskonzentration', unit: 'Vol%', color: '#f0f0f0',
      art: 'gas', quelle: 'narkose', eingabe: true, dez: 2,
      band: function (c) {
        var mac = macFuer(c.gas, c.sp, c.spSet);
        return mac ? [rnd(mac * 0.7, 2), rnd(mac * 1.4, 2)] : null;
      },
      explain: 'Was das Tier WIRKLICH ausatmet — die einzige belastbare Zahl für die Narkosetiefe. Der Verdampfer sagt ' +
        'nur, was hineingeht; im Kreissystem mit niedrigem Flow liegt die tatsächliche Konzentration lange darunter. ' +
        'Zielbereich rund 0,8–1,3 MAC der Tierart, bei Opioid-/α2-Begleitmedikation weniger.',
    },
    {
      id: 'fiAgent', abbr: 'FiAA', name: 'Eingeatmete Narkosegaskonzentration', unit: 'Vol%', color: '#d8dde4',
      art: 'gas', quelle: 'narkose', eingabe: false, dez: 2,
      explain: 'Konzentration am Ende der Einatmung. Die Differenz Fi−Et zeigt die Aufnahme: groß bei der Einleitung, ' +
        'klein im Gleichgewicht.',
    },
    {
      id: 'mac', abbr: 'MAC', name: 'MAC-Vielfaches (artbezogen)', unit: '×', color: '#ffe08a',
      art: 'gas', quelle: 'narkose', eingabe: false, dez: 2,
      band: function () { return [0.8, 1.3]; },
      explain: 'Ausgeatmete Gaskonzentration geteilt durch den MAC-Wert DIESER Tierart und DIESES Gases. 1,0 MAC = ' +
        'die Hälfte der Tiere reagiert nicht mehr auf einen chirurgischen Reiz. Ein Humanmonitor rechnet mit ' +
        'Menschen-MAC — hier wird artspezifisch gerechnet.',
    },
    {
      id: 'etn2o', abbr: 'EtN₂O', name: 'Ausgeatmetes Lachgas', unit: '%', color: '#a3e6ff',
      art: 'gas', quelle: 'narkose', eingabe: false, dez: 0, start: 0,
      explain: 'Lachgas senkt den Bedarf am Volatil, ist im Kleintier aber unüblich; nach dem Abstellen droht ' +
        'Diffusionshypoxie → einige Minuten 100 % O₂ nachgeben.',
    },
    {
      id: 'o2flow', abbr: 'O₂', name: 'Frischgasfluss O₂', unit: 'L/min', color: '#66d9ff',
      art: 'gas', quelle: 'narkose', eingabe: false, dez: 1,
      explain: 'Frischgas ins System. Im Kreissystem niedrig (Low-Flow), im Nicht-Rückatemsystem hoch ' +
        '(200–300 ml/kg/min) — dort ist der Fluss die einzige CO₂-Auswaschung.',
    },
  ];

  var KANAL_NACH_ID = {};
  KANAELE.forEach(function (k) { KANAL_NACH_ID[k.id] = k; });

  /* ==========================================================================
   * 2) KURVENBAHNEN
   *
   * Der virtuelle Monitor zeichnete bisher FEST drei Bahnen. Der Veta 5 Plus
   * zeigt zwei ganz andere (CO2 und Paw), ein reiner Kapnograf zeigt eine, ein
   * Grossmonitor bis zu sechs. Die Bahnen kommen deshalb aus dem Profil.
   *
   *   id       Schluessel, auch im Kurven-Datenstrom der Bridge
   *   name     Beschriftung links oben in der Bahn (wie am Geraet)
   *   color    Linienfarbe (Mindray-nah)
   *   quelle   welches Geraet die Bahn normalerweise liefert
   *   takt     'herz' = an die Herzfrequenz gekoppelt, 'atem' = an die Atemfrequenz
   * ========================================================================== */
  var KURVEN = [
    { id: 'ekg', name: 'EKG II', color: '#28e07a', quelle: 'monitor', takt: 'herz',
      erklaerung: 'Ableitung II — Rhythmus, QRS-Form, Extrasystolen.' },
    { id: 'pleth', name: 'Pleth', color: '#00d8ff', quelle: 'monitor', takt: 'herz',
      erklaerung: 'Pulswelle des Pulsoxymeters — Perfusion und Signalgüte.' },
    { id: 'capno', name: 'CO₂', color: '#7fe3ff', quelle: 'beides', takt: 'atem',
      erklaerung: 'Kapnogramm. Grundlinie ≠ 0 heißt Rückatmung, fehlendes Plateau heißt Obstruktion.' },
    { id: 'paw', name: 'Paw', color: '#ffd166', color2: '#8b6cff', quelle: 'narkose', takt: 'atem',
      erklaerung: 'Atemwegsdruck über die Zeit. Gelb = spontaner/getriggerter Atemzug, ' +
        'violett = maschineller Pflichthub — so steht es auch auf dem Veta 5.' },
    { id: 'flow', name: 'Flow', color: '#9ae6b4', quelle: 'narkose', takt: 'atem',
      erklaerung: 'Atemfluss. Erreicht der exspiratorische Fluss vor dem nächsten Hub nicht die Nulllinie, ' +
        'liegt Air-Trapping vor.' },
    { id: 'resp', name: 'Resp', color: '#c0a8ff', quelle: 'monitor', takt: 'atem',
      erklaerung: 'Thorax-Impedanz. Zählt Atemzüge ohne CO₂-Modul — kann aber Herzschläge als Atmung ' +
        'fehldeuten und erkennt eine Verlegung NICHT (Thorax bewegt sich weiter).' },
  ];
  var KURVE_NACH_ID = {};
  KURVEN.forEach(function (k) { KURVE_NACH_ID[k.id] = k; });

  /* ==========================================================================
   * 3) NARKOSEGASE + MAC JE TIERART
   *
   * Der Verdampfer war fest "Isofluran V60, 0–6 Vol%". Es gibt in der Praxis
   * Sevofluran (andere Skala, anderer MAC) und in Altbestaenden Halothan; in
   * Ueberweisungskliniken auch Desfluran. Ein MAC-Vielfaches, das mit dem
   * FALSCHEN Gas gerechnet ist, ist schlimmer als gar keines.
   *
   * QUELLENLAGE, ehrlich:
   *   mac[art] = veroeffentlichter Wert fuer diese Tierart.
   *   Fehlt er, wird ueber `faktor` aus dem Iso-MAC DERSELBEN Art gerechnet
   *   (Verhaeltnis beim Hund). Das Ergebnis wird als `abgeleitet` gekennzeichnet
   *   und in der Oberflaeche auch so beschriftet — es ist eine Groessenordnung,
   *   kein artspezifischer Beleg.
   * ========================================================================== */
  var GASE = [
    {
      id: 'iso', name: 'Isofluran', kurz: 'ISO', farbe: '#8f4fbf', flasche: '#a259c8',
      max: 6, schritt: 0.1, faktor: 1,
      /* Iso-MAC steht bereits artspezifisch in ANAES.machine.settingsBySpecies[..].iso.mac —
       * von dort wird er geholt, damit es AUCH hier keine zweite Zahlenquelle gibt. */
      ausSpSet: true,
      quelle: 'settingsBySpecies[art].iso.mac (gepflegt in anaes-data.js)',
    },
    {
      id: 'sevo', name: 'Sevofluran', kurz: 'SEV', farbe: '#d8b400', flasche: '#f4d03f',
      max: 8, schritt: 0.1, faktor: 1.84,
      mac: { hund: 2.36, katze: 2.58, kaninchen: 3.70, ratte: 2.40, maus: 2.70, meerschwein: 2.50 },
      quelle: 'Grimm/Lumb & Jones Veterinary Anesthesia; Steffey & Mama, Inhalation Anesthetics',
    },
    {
      id: 'des', name: 'Desfluran', kurz: 'DES', farbe: '#1f7ac4', flasche: '#3498db',
      max: 18, schritt: 0.5, faktor: 5.63,
      mac: { hund: 7.20, katze: 9.79, kaninchen: 8.90, ratte: 6.50, maus: 7.10 },
      hinweis: 'Braucht einen beheizten Spezialverdampfer — nie in einen Iso-/Sevo-Verdampfer füllen.',
      quelle: 'Grimm/Lumb & Jones Veterinary Anesthesia; Steffey & Mama, Inhalation Anesthetics',
    },
    {
      id: 'halo', name: 'Halothan', kurz: 'HAL', farbe: '#c0392b', flasche: '#e74c3c',
      max: 5, schritt: 0.1, faktor: 0.68,
      mac: { hund: 0.87, katze: 1.19, kaninchen: 1.39, ratte: 1.10, maus: 0.95 },
      hinweis: 'Sensibilisiert das Myokard für Katecholamine (Arrhythmien) und ist lebertoxisch — in Europa ' +
        'praktisch verlassen; nur für Altgeräte im Bestand aufgeführt.',
      quelle: 'Grimm/Lumb & Jones Veterinary Anesthesia',
    },
  ];
  var GAS_NACH_ID = {};
  GASE.forEach(function (g) { GAS_NACH_ID[g.id] = g; });

  /*
   * macFuer(gasId, art, spSet) -> { wert, abgeleitet, gas } | null
   * spSet = ANAES.machine.settingsBySpecies[art] (fuer den artspezifischen Iso-MAC).
   */
  function macInfo(gasId, art, spSet) {
    var g = GAS_NACH_ID[gasId] || GAS_NACH_ID.iso;
    var isoMac = (spSet && spSet.iso && typeof spSet.iso.mac === 'number') ? spSet.iso.mac : null;
    if (g.ausSpSet) return isoMac ? { wert: isoMac, abgeleitet: false, gas: g } : null;
    if (g.mac && typeof g.mac[art] === 'number') return { wert: g.mac[art], abgeleitet: false, gas: g };
    if (isoMac) return { wert: rnd(isoMac * g.faktor, 2), abgeleitet: true, gas: g };
    return null;
  }
  function macFuer(gasId, art, spSet) { var m = macInfo(gasId, art, spSet); return m ? m.wert : null; }

  /* ==========================================================================
   * 4) GERAETEPROFILE
   *
   * Aufbau:
   *   id         eindeutig
   *   katalogId  Verweis auf bridge/src/geraetekatalog.js — dort steht, WIE man
   *              das Geraet ansteckt. Hier steht, WAS es zeigt. Getrennt, weil
   *              beide Fragen getrennt beantwortet werden muessen: ein Geraet kann
   *              alles messen und trotzdem keine Buchse haben (Veta 5).
   *   rolle      'monitor' | 'narkose' | 'kapno' | 'kombi'  — bestimmt, in welcher
   *              der beiden Modellwahlen es auftaucht. 'kapno' steht in derselben
   *              Wahl wie 'narkose' (es ist das zweite Geraet am Arbeitsplatz), ist
   *              aber ausdruecklich KEIN Ventilator: ein eigenstaendiger Kapnograf
   *              misst nur, er beatmet nicht.
   *   marke/typ  Aufdruck auf dem Geraetebild
   *   kanaele[]  Messkanal-IDs, in Anzeigereihenfolge
   *   kurven[]   Kurvenbahn-IDs, in Anzeigereihenfolge
   *   ventModi[] Beatmungsmodus-IDs (= ANAES.machine.ventModes[].id), leer = kein Ventilator
   *   ventFelder[] Einstellzeile unten am Geraet (= ANAES.machine.ventParams-Schluessel)
   *   gase[]     welche Verdampfer/Gase moeglich sind
   *   o2Max      Endwert des Flowmeters (L/min)
   *   grenzen    true = das Geraet zeigt die Alarmgrenzen NEBEN dem Wert (Mindray-Stil)
   *   fallTimer  true = "Fall starten/beenden" + Falluhr im Kopf (Veta-5-Stil)
   *   inspHold   true = Knopf "Insp. Hold"
   *   beschriftung {kanalId: 'Text'} — Abweichungen der Anzeige ("MAX" statt "Ppeak")
   *   haut       Farbschema des Bildschirms
   *   vertrauen  siehe Kopf
   *   hinweis    der eine Satz, den man wissen muss
   *
   * DIE REIHENFOLGE IST DIE ANZEIGEREIHENFOLGE. Die ersten beiden Eintraege sind
   * die universellen Vorgaben — sie zeigen ALLES und passen damit auf jedes Geraet,
   * das nirgends im Katalog steht.
   * ========================================================================== */

  var ALLE_MON = ['hr', 'spo2', 'nibp', 'ibp', 'etco2', 'fico2', 'rr', 'temp', 'temp2', 'pi'];
  var ALLE_VENT = ['ppeak', 'pmean', 'peep', 'vte', 'mv', 'compl'];
  var ALLE_GAS = ['fio2', 'etAgent', 'fiAgent', 'mac', 'etn2o'];
  var ALLE_MODI = ['vs', 'vsplus', 'psv', 'cpap', 'vcv', 'pcv', 'simv', 'manual'];

  var PROFILE = [
    /* ================= UNIVERSAL — die Vorgabe ================= */
    {
      id: 'universal-monitor', rolle: 'monitor', katalogId: null,
      hersteller: 'Universal', marke: 'VetStation', typ: 'Universal-Monitor',
      aliase: ['universal', 'allgemein', 'standard', 'beliebig', 'unbekannt'],
      kanaele: ALLE_MON.slice(),
      kurven: ['ekg', 'pleth', 'capno', 'resp'],
      ventModi: [], ventFelder: [], gase: [],
      grenzen: true, fallTimer: false, inspHold: false,
      haut: 'mindray', vertrauen: 'belegt',
      hinweis: 'Zeigt jeden Kanal, den irgendein Gerät liefern kann. Vorgabe, solange kein Modell gewählt ist — ' +
        'ein Kanal ohne Messwert bleibt leer ("– –"), es wird nie etwas erfunden.',
    },
    {
      id: 'universal-narkose', rolle: 'narkose', katalogId: null,
      hersteller: 'Universal', marke: 'VetStation', typ: 'Universal-Narkosegerät',
      aliase: ['universal', 'allgemein', 'standard', 'beliebig', 'unbekannt'],
      kanaele: ['etco2', 'fico2', 'rr'].concat(ALLE_VENT, ALLE_GAS),
      kurven: ['capno', 'paw', 'flow'],
      ventModi: ALLE_MODI.slice(),
      ventFelder: ['vt', 'af', 'ie', 'peep', 'pinsp', 'psupp', 'trigger', 'tinsp'],
      gase: ['iso', 'sevo', 'des', 'halo'], o2Max: 10,
      grenzen: true, fallTimer: true, inspHold: true,
      haut: 'mindray', vertrauen: 'belegt',
      hinweis: 'Zeigt jeden Beatmungs- und Gaskanal. Vorgabe für jedes Narkosegerät, das nicht im Katalog steht.',
    },

    /* ================= MINDRAY / EICKEMEYER (die Geraete dieser Praxis) ================= */
    {
      /* DAS GERAET AUF DEN FOTOS. Jede Zeile hier steht so auf dem Bildschirm:
       * Kopf mit Tiersymbol + Falluhr + Modus, Alarmband, CO2- und Paw-Kurve,
       * Zahlenspalte EtCO2/FiCO2/MAX/PEEP/Vt/MV/AF je mit Alarmgrenzen daneben,
       * Knopfspalte Audio-Pause / Alarm Setup / Insp. Hold Start / Fall beenden,
       * Modusleiste VS · VS+ · VCV · PCV · SIMV und darunter die Einstellzeile
       * Gewicht · Vt bzw. Pinsp · AF · I:E · PEEP · Trigger. */
      id: 'mindray-veta-5-plus', rolle: 'narkose', katalogId: 'mindray-veta-5',
      hersteller: 'Mindray Animal Care', marke: 'mindray', typ: 'Veta 5 Plus',
      aliase: ['veta5', 'veta 5 plus', 'veta5plus', 'veta 5+', 'eickemeyer veta 5'],
      kanaele: ['etco2', 'fico2', 'ppeak', 'peep', 'vte', 'mv', 'rr'],
      kurven: ['capno', 'paw'],
      ventModi: ['vs', 'vsplus', 'vcv', 'pcv', 'simv', 'manual'],
      ventFelder: ['vt', 'pinsp', 'af', 'ie', 'peep', 'trigger'],
      gase: ['iso', 'sevo'], o2Max: 5,
      grenzen: true, fallTimer: true, inspHold: true,
      beschriftung: { ppeak: 'MAX', vte: 'Vt', rr: 'AF' },
      haut: 'mindray', vertrauen: 'belegt',
      quellen: ['eigene Fotos des Praxisgeräts 30.07.2026 und 04.08.2026', 'Mindray Veta 5 Plus Operator\'s Manual'],
      hinweis: 'Das Gerät ZEIGT alles davon, gibt aber nichts heraus: sein Netzmenü kennt nur MD2 (Mindray-eigen), ' +
        'kein HL7. Die Werte kommen deshalb aus der Eingabe oder vom Kapnograf-Kanal des Monitors — ' +
        'siehe Gerätekatalog, Eintrag mindray-veta-5.',
    },
    {
      id: 'mindray-veta-3', rolle: 'narkose', katalogId: 'mindray-veta-3',
      hersteller: 'Mindray Animal Care', marke: 'mindray', typ: 'Veta 3',
      aliase: ['veta3', 'veta 3'],
      kanaele: ['ppeak', 'peep', 'vte', 'rr'],
      kurven: ['paw'],
      ventModi: ['vcv', 'pcv', 'manual'],
      ventFelder: ['vt', 'pinsp', 'af', 'ie', 'peep'],
      gase: ['iso'], o2Max: 5,
      grenzen: false, fallTimer: false, inspHold: false,
      haut: 'mindray', vertrauen: 'wahrscheinlich',
      hinweis: 'Kleinere Bauform ohne Kapnograf-Modul: EtCO₂/FiCO₂ kommen dort vom Monitor, nicht vom Narkosegerät.',
    },
    {
      id: 'mindray-wato-ex35-vet', rolle: 'narkose', katalogId: 'mindray-wato-ex35-vet',
      hersteller: 'Mindray', marke: 'mindray', typ: 'WATO EX-35Vet',
      aliase: ['wato', 'wato ex-35', 'ex35vet', 'wato ex35 vet'],
      kanaele: ['etco2', 'fico2', 'ppeak', 'pmean', 'peep', 'vte', 'mv', 'compl', 'rr', 'fio2', 'etAgent', 'fiAgent', 'mac'],
      kurven: ['capno', 'paw', 'flow'],
      ventModi: ['vcv', 'pcv', 'simv', 'psv', 'cpap', 'manual'],
      ventFelder: ['vt', 'pinsp', 'af', 'ie', 'peep', 'psupp', 'trigger'],
      gase: ['iso', 'sevo', 'des'], o2Max: 10,
      grenzen: true, fallTimer: true, inspHold: true,
      haut: 'mindray', vertrauen: 'belegt',
      quellen: ['Mindray WATO EX-35Vet Operator\'s Manual (Rückseite: "Network port … through HL7 protocol")'],
      hinweis: 'Das EINZIGE Vet-Narkosegerät mit belegtem offenem Datenausgang (HL7 über Netz, zusätzlich RS-232) — ' +
        'hier lohnt der Anschluss wirklich.',
    },
    {
      id: 'mindray-umec12-vet', rolle: 'monitor', katalogId: 'mindray-umec12-vet',
      hersteller: 'Mindray Animal Medical', marke: 'mindray', typ: 'uMEC12 Vet',
      aliase: ['umec', 'umec12', 'umec 12 vet', 'umec12vet'],
      kanaele: ['hr', 'spo2', 'nibp', 'etco2', 'rr', 'temp', 'temp2'],
      kurven: ['ekg', 'pleth', 'capno', 'resp'],
      ventModi: [], ventFelder: [], gase: [],
      grenzen: true, fallTimer: false, inspHold: false,
      haut: 'mindray', vertrauen: 'belegt',
      quellen: ['eigene Messung am Praxisgerät SN V7-53011693A, 24.–26.07.2026'],
      hinweis: 'Über HL7 liefert dieses Exemplar nur Blutdruck (aperiodisch) und Alarmtexte — HF/SpO₂/Temp misst es, ' +
        'sendet sie aber nicht. Die Kacheln bleiben dann leer; das ist kein Fehler der Station.',
    },
    {
      id: 'eickemeyer-lifevet-10c', rolle: 'monitor', katalogId: 'eickemeyer-lifevet-10c',
      hersteller: 'Eickemeyer (Mindray ePM 10 Vet)', marke: 'LifeVet', typ: '10C',
      aliase: ['lifevet', 'lifevet10c', 'lifevet 10 c', 'epm 10 vet', 'epm10vet', '321920'],
      kanaele: ['hr', 'spo2', 'nibp', 'ibp', 'etco2', 'fico2', 'rr', 'temp', 'temp2', 'pi'],
      kurven: ['ekg', 'pleth', 'capno', 'resp'],
      ventModi: [], ventFelder: [], gase: [],
      grenzen: true, fallTimer: false, inspHold: false,
      haut: 'mindray', vertrauen: 'belegt',
      quellen: ['eigene Messung Praxis-PC 2026-07 (docs/MINDRAY-HL7.md)'],
      hinweis: 'Das Gerät, das in dieser Praxis nachweislich ALLES liefert: Zahlen, Alarme und echte Kurven ' +
        '(EKG 256 Hz, CO₂ 40 Hz). Es ist die dokumentierte Zahlenquelle.',
    },
    {
      id: 'eickemeyer-lifevet-m', rolle: 'monitor', katalogId: 'eickemeyer-lifevet-m',
      hersteller: 'Eickemeyer (EDAN iM8 Vet)', marke: 'LifeVet', typ: 'M',
      aliase: ['lifevet m', 'lifevetm', 'lifevet c', 'im8 vet', '321870'],
      /* KEIN etco2/fico2: am Praxisgeraet steht im Modulverzeichnis CO2(C5) = "-.-",
       * es ist schlicht kein CO2-Modul verbaut (Fotos 31.07.2026). Ein Kapno-Kanal
       * im Profil wuerde eine Messung vortaeuschen, die diese Hardware nicht kann. */
      kanaele: ['hr', 'spo2', 'nibp', 'ibp', 'rr', 'temp', 'temp2'],
      kurven: ['ekg', 'pleth', 'resp'],
      ventModi: [], ventFelder: [], gase: [],
      grenzen: true, fallTimer: false, inspHold: false,
      haut: 'edan', vertrauen: 'belegt',
      quellen: ['eigene Fotos des Praxisgeräts 31.07.2026 (Firmware 1.21 VET, Module ECG/SpO2/NIBP/RESP/TEMP 1.82, CO2 nicht verbaut)'],
      hinweis: 'KEIN CO₂-Modul verbaut — dieses Gerät kann EtCO₂ nicht messen, egal welche Einstellung. Es spricht ' +
        'außerdem EDAN-MFM-CMS, nicht HL7.',
    },
    {
      id: 'mindray-epm-n-serie', rolle: 'monitor', katalogId: 'mindray-epm-n-serie',
      hersteller: 'Mindray', marke: 'mindray', typ: 'ePM / N-Serie',
      aliase: ['epm', 'epm 10', 'epm 12', 'n-serie', 'n12', 'n15', 'benevision'],
      kanaele: ALLE_MON.slice(),
      kurven: ['ekg', 'pleth', 'capno', 'resp'],
      ventModi: [], ventFelder: [], gase: ['iso', 'sevo', 'des', 'halo'],
      grenzen: true, fallTimer: false, inspHold: false,
      haut: 'mindray', vertrauen: 'wahrscheinlich',
      hinweis: 'Humanplattform mit vollem Gasmodul-Ausbau (AG-Modul). Die Vet-Firmware derselben Geräte hat den ' +
        'HL7-Reiter NICHT — der Unterschied liegt in der Firmware, nicht in der Hardware.',
    },
    {
      id: 'mindray-vs900', rolle: 'monitor', katalogId: 'mindray-vs900',
      hersteller: 'Mindray', marke: 'mindray', typ: 'VS-900 / Accutorr',
      aliase: ['vs900', 'vs-900', 'accutorr'],
      kanaele: ['hr', 'spo2', 'nibp', 'temp', 'pi'],
      kurven: ['pleth'],
      ventModi: [], ventFelder: [], gase: [],
      grenzen: true, fallTimer: false, inspHold: false,
      haut: 'mindray', vertrauen: 'wahrscheinlich',
      hinweis: 'Vitalzeichen-Monitor ohne EKG-Kurve und ohne Kapnograf — für Aufwachraum/Station, nicht für die Narkose.',
    },

    /* ================= ANDERE HERSTELLER · MONITORE ================= */
    {
      id: 'bionet-bm-vet', rolle: 'monitor', katalogId: 'bionet-bm-vet-pro',
      hersteller: 'Bionet', marke: 'BIONET', typ: 'BM Vet Pro / Elite',
      aliase: ['bionet', 'bm3vet', 'bm5vet', 'bm7vet', 'bm vet pro', 'bm vet elite'],
      kanaele: ['hr', 'spo2', 'nibp', 'ibp', 'etco2', 'fico2', 'rr', 'temp', 'temp2'],
      kurven: ['ekg', 'pleth', 'capno', 'resp'],
      ventModi: [], ventFelder: [], gase: [],
      grenzen: true, fallTimer: false, inspHold: false,
      haut: 'bionet', vertrauen: 'belegt',
      quellen: ['Bionet BM Vet HL7-Dokumentation (Ziel-IP und Port frei einstellbar)'],
      hinweis: 'HL7 mit frei wählbarer Zieladresse UND Port — kürzestes Sendeintervall aber 10 s. Die alte BM5Vet ' +
        'Rev. 2.x hat KEIN HL7.',
    },
    {
      id: 'edan-im-vet', rolle: 'monitor', katalogId: 'edan-im-serie',
      hersteller: 'EDAN', marke: 'EDAN', typ: 'iM Vet-Serie',
      aliase: ['edan', 'im50', 'im60', 'im70', 'im80', 'im8 vet', 'elite v'],
      kanaele: ['hr', 'spo2', 'nibp', 'ibp', 'etco2', 'fico2', 'rr', 'temp', 'temp2'],
      kurven: ['ekg', 'pleth', 'capno', 'resp'],
      ventModi: [], ventFelder: [], gase: [],
      grenzen: true, fallTimer: false, inspHold: false,
      haut: 'edan', vertrauen: 'belegt',
      hinweis: 'HL7 vorhanden, ab Werk aber mit TLS-Verschlüsselung: Menü Maintenance → User Maintain (Passwort ABC) ' +
        '→ Security. Ohne diese Umstellung kommt beim PC nur unlesbares Rauschen an.',
    },
    {
      id: 'surgivet-advisor', rolle: 'monitor', katalogId: 'surgivet-advisor',
      hersteller: 'Smiths Medical / SurgiVet', marke: 'SurgiVet', typ: 'Advisor V9200/V9203',
      aliase: ['surgivet', 'advisor', 'v9200', 'v9203', 'smiths'],
      kanaele: ['hr', 'spo2', 'nibp', 'ibp', 'etco2', 'fico2', 'rr', 'temp', 'temp2'],
      kurven: ['ekg', 'pleth', 'capno'],
      ventModi: [], ventFelder: [], gase: ['iso', 'sevo', 'halo'],
      grenzen: false, fallTimer: false, inspHold: false,
      haut: 'dunkel', vertrauen: 'belegt',
      quellen: ['SurgiVet Advisor Service Manual (RS-232 115200 8N1, 25-Spalten-CSV, Service-Passwort ADVISOR)'],
      hinweis: 'Liefert über RS-232 eine dokumentierte 25-Spalten-CSV. WARNUNG: Pin 6 der Buchse führt +5 V — ' +
        'nur drei Adern (2/3/5) verwenden, sonst Schaden am PC.',
    },
    {
      id: 'midmark-multiparameter', rolle: 'monitor', katalogId: 'midmark-multiparameter',
      hersteller: 'Midmark', marke: 'MIDMARK', typ: 'Multiparameter-Monitor',
      aliase: ['midmark', 'cardell touch', 'midmark multiparameter'],
      kanaele: ['hr', 'spo2', 'nibp', 'ibp', 'etco2', 'rr', 'temp', 'temp2'],
      kurven: ['ekg', 'pleth', 'capno'],
      ventModi: [], ventFelder: [], gase: [],
      grenzen: true, fallTimer: false, inspHold: false,
      haut: 'dunkel', vertrauen: 'wahrscheinlich',
      hinweis: 'Sendet auf Port 2528, Servicepasswort 2013, KEIN DHCP — die feste Adresse muss ins Praxisnetz passen.',
    },
    {
      id: 'midmark-cardell', rolle: 'monitor', katalogId: 'midmark-cardell',
      hersteller: 'Midmark', marke: 'CARDELL', typ: 'Insight / Veterinary Monitor',
      aliase: ['cardell', 'insight', 'cardell insight'],
      kanaele: ['hr', 'spo2', 'nibp', 'rr', 'temp'],
      kurven: ['pleth'],
      ventModi: [], ventFelder: [], gase: [],
      grenzen: false, fallTimer: false, inspHold: false,
      haut: 'dunkel', vertrauen: 'wahrscheinlich',
      hinweis: '„Digitalanzeige" heißt bei diesem Gerät Ziffernanzeige, nicht Schnittstelle — die Werte müssen ' +
        'von Hand eingetragen werden.',
    },
    {
      id: 'contec-cms-vet', rolle: 'monitor', katalogId: 'contec-cms-vet',
      hersteller: 'Contec', marke: 'CONTEC', typ: 'CMS6000/8000 Vet',
      aliase: ['contec', 'cms6000', 'cms8000', 'cms 8000 vet'],
      kanaele: ['hr', 'spo2', 'nibp', 'etco2', 'rr', 'temp', 'temp2'],
      kurven: ['ekg', 'pleth', 'resp'],
      ventModi: [], ventFelder: [], gase: [],
      grenzen: false, fallTimer: false, inspHold: false,
      haut: 'dunkel', vertrauen: 'unbestaetigt',
      hinweis: 'SICHERHEITSHINWEIS: Für das Humanmodell CMS8000 ist eine fest einprogrammierte Hintertür belegt ' +
        '(CISA, CVE-2025-0626/0683) — das Gerät sendet selbsttätig an eine fremde Adresse. Für die Vet-Variante ' +
        'ist das weder belegt noch widerlegt. Nicht ins Praxisnetz mit Internetzugang hängen.',
    },
    {
      id: 'comen-c50v', rolle: 'monitor', katalogId: 'comen-c50v',
      hersteller: 'Comen', marke: 'COMEN', typ: 'C50 Vet / C60 Vet',
      aliase: ['comen', 'c50v', 'c60 vet'],
      kanaele: ['hr', 'spo2', 'nibp', 'etco2', 'rr', 'temp', 'temp2'],
      kurven: ['ekg', 'pleth', 'capno', 'resp'],
      ventModi: [], ventFelder: [], gase: [],
      grenzen: false, fallTimer: false, inspHold: false,
      haut: 'dunkel', vertrauen: 'unbestaetigt',
      hinweis: 'Kein belegter HL7-Weg. Zeigt viel, gibt (Stand der Recherche) nichts heraus.',
    },
    {
      id: 'digicare-lifewindow', rolle: 'monitor', katalogId: 'digicare-lifewindow',
      hersteller: 'Digicare', marke: 'LifeWindow', typ: 'LW9x / One',
      aliase: ['digicare', 'lifewindow', 'lw9', 'lw one'],
      kanaele: ['hr', 'spo2', 'nibp', 'ibp', 'etco2', 'fico2', 'rr', 'temp', 'temp2', 'fio2', 'etAgent', 'mac'],
      kurven: ['ekg', 'pleth', 'capno', 'resp'],
      ventModi: [], ventFelder: [], gase: ['iso', 'sevo', 'des', 'halo'],
      grenzen: true, fallTimer: false, inspHold: false,
      haut: 'dunkel', vertrauen: 'unbestaetigt',
      hinweis: 'Einer der wenigen Vet-Monitore mit echtem Narkosegasmodul (Agent-Identifikation + MAC). Der ' +
        'Datenausgang ist nicht belegt.',
    },
    {
      id: 'philips-intellivue', rolle: 'monitor', katalogId: 'philips-intellivue',
      hersteller: 'Philips', marke: 'PHILIPS', typ: 'IntelliVue MP/MX',
      aliase: ['philips', 'intellivue', 'mp50', 'mp70', 'mx450'],
      kanaele: ALLE_MON.concat(['fio2', 'etAgent', 'fiAgent', 'mac', 'etn2o']),
      kurven: ['ekg', 'pleth', 'capno', 'resp', 'paw', 'flow'],
      ventModi: [], ventFelder: [], gase: ['iso', 'sevo', 'des', 'halo'],
      grenzen: true, fallTimer: false, inspHold: false,
      haut: 'philips', vertrauen: 'belegt',
      hinweis: 'Data Export läuft über UDP 24105 — ein TCP-Lauscher empfängt dort NIE ein Byte und meldet trotzdem ' +
        '"die Station hört zu". Deshalb ist UDP im Katalog ein eigener Transportweg.',
    },
    {
      id: 'ge-datex-s5', rolle: 'monitor', katalogId: 'ge-datex-s5',
      hersteller: 'GE / Datex-Ohmeda', marke: 'GE', typ: 'S/5 · Carescape',
      aliase: ['datex', 'ge', 's5', 'as3', 'carescape', 'aisys'],
      kanaele: ALLE_MON.concat(ALLE_VENT, ['fio2', 'etAgent', 'fiAgent', 'mac', 'etn2o']),
      kurven: ['ekg', 'pleth', 'capno', 'paw', 'flow', 'resp'],
      ventModi: ['vcv', 'pcv', 'simv', 'psv', 'cpap', 'manual'],
      ventFelder: ['vt', 'pinsp', 'af', 'ie', 'peep', 'psupp', 'trigger'],
      gase: ['iso', 'sevo', 'des', 'halo'], o2Max: 10,
      grenzen: true, fallTimer: false, inspHold: true,
      haut: 'ge', vertrauen: 'belegt',
      hinweis: 'Über VSCapture auslesbar (Datex-Ohmeda-Protokoll, seriell oder Netz). Vollständigstes Kanalbild ' +
        'aller hier gelisteten Geräte.',
    },
    {
      id: 'petmap', rolle: 'monitor', katalogId: null,
      hersteller: 'Ramsey Medical', marke: 'petMAP', typ: 'graphic II',
      aliase: ['petmap', 'pet map'],
      kanaele: ['nibp', 'hr'],
      kurven: [],
      ventModi: [], ventFelder: [], gase: [],
      grenzen: false, fallTimer: false, inspHold: false,
      haut: 'hell', vertrauen: 'wahrscheinlich',
      hinweis: 'Reines Blutdruckgerät (oszillometrisch, für Kleintiere kalibriert). Kein Datenausgang — die ' +
        'gemessenen Werte werden eingetippt.',
    },

    /* ================= KAPNOGRAFEN (eigenstaendig) ================= */
    {
      id: 'kapnograf-standalone', rolle: 'kapno', katalogId: null,
      hersteller: 'Universal', marke: 'Kapnograf', typ: 'eigenständig (Mainstream/Sidestream)',
      aliase: ['kapnograf', 'kapnograph', 'capnograph', 'emma', 'capnostream', 'nonin', 'lifesense', 'microcap'],
      kanaele: ['etco2', 'fico2', 'rr', 'spo2'],
      kurven: ['capno', 'pleth'],
      ventModi: [], ventFelder: [], gase: [],
      grenzen: true, fallTimer: false, inspHold: false,
      haut: 'dunkel', vertrauen: 'belegt',
      hinweis: 'Ein eigenständiger Kapnograf misst EtCO₂, FiCO₂ und die Atemfrequenz aus der CO₂-Kurve. Diese ' +
        'Atemfrequenz ist genauer als die Impedanz-Atmung des Monitors und hat in der Station deshalb Vorrang. ' +
        'Mainstream-Küvetten wiegen am Tubus — bei Kleinsttieren Totraum und Zug beachten.',
    },

    /* ================= ANDERE HERSTELLER · NARKOSE / BEATMUNG ================= */
    {
      id: 'draeger-narkose', rolle: 'narkose', katalogId: 'draeger-medibus-narkose',
      hersteller: 'Dräger', marke: 'Dräger', typ: 'Fabius / Primus (MEDIBUS)',
      aliase: ['draeger', 'dräger', 'fabius', 'primus', 'medibus', 'tiro'],
      kanaele: ['etco2', 'fico2', 'ppeak', 'pmean', 'peep', 'vte', 'mv', 'compl', 'rr', 'fio2', 'etAgent', 'fiAgent', 'mac'],
      kurven: ['capno', 'paw', 'flow'],
      ventModi: ['vcv', 'pcv', 'simv', 'psv', 'cpap', 'manual'],
      ventFelder: ['vt', 'pinsp', 'af', 'ie', 'peep', 'psupp', 'trigger', 'tinsp'],
      gase: ['iso', 'sevo', 'des'], o2Max: 12,
      grenzen: true, fallTimer: false, inspHold: true,
      haut: 'draeger', vertrauen: 'belegt',
      hinweis: 'FALLE: Die Fabius-Werkseinstellung der Schnittstelle ist VITALINK, nicht MEDIBUS. Wer das übersieht, ' +
        'bekommt plausible, aber FALSCHE Zahlen — am Gerät ausdrücklich auf MEDIBUS umstellen.',
    },
    {
      id: 'datex-7900', rolle: 'narkose', katalogId: 'datex-7900-smartvent',
      hersteller: 'Datex-Ohmeda', marke: 'Datex-Ohmeda', typ: '7900 SmartVent',
      aliase: ['7900', 'smartvent', 'aestiva', 'excel'],
      kanaele: ['ppeak', 'pmean', 'peep', 'vte', 'mv', 'compl', 'rr', 'fio2'],
      kurven: ['paw', 'flow'],
      ventModi: ['vcv', 'pcv', 'simv', 'psv', 'manual'],
      ventFelder: ['vt', 'pinsp', 'af', 'ie', 'peep', 'psupp'],
      gase: ['iso', 'sevo', 'des', 'halo'], o2Max: 10,
      grenzen: false, fallTimer: false, inspHold: false,
      haut: 'ge', vertrauen: 'belegt',
      hinweis: 'Seriell 19200 mit ungewöhnlichem Rahmen 7-O-1 (nicht 8-N-1) — mit den Standardeinstellungen kommt ' +
        'nur Zeichensalat an.',
    },
    {
      id: 'hallowell-2000', rolle: 'narkose', katalogId: 'mechanische-vet-narkose',
      hersteller: 'Hallowell EMC', marke: 'Hallowell', typ: '2000 / 2002 Ventilator',
      aliase: ['hallowell', '2000 ventilator', 'anesthesia workstation'],
      kanaele: ['ppeak', 'rr'],
      kurven: ['paw'],
      ventModi: ['vcv', 'manual'],
      ventFelder: ['vt', 'af', 'ie'],
      gase: ['iso', 'sevo'], o2Max: 5,
      grenzen: false, fallTimer: false, inspHold: false,
      haut: 'hell', vertrauen: 'wahrscheinlich',
      hinweis: 'Kleintier-Ventilator mit Druckbegrenzung und Manometer, ohne Datenausgang. Die Zahlen werden ' +
        'abgelesen und eingetippt.',
    },
    {
      id: 'mechanisch-vet-narkose', rolle: 'narkose', katalogId: 'mechanische-vet-narkose',
      hersteller: 'verschiedene', marke: 'Narkosegerät', typ: 'rein mechanisch (ohne Ventilator)',
      aliase: ['matrx', 'vms', 'moduflex', 'vetland', 'rwd', 'dre', 'supera', 'eickemeyer basic', 'tischgerät'],
      kanaele: [],
      kurven: [],
      ventModi: ['manual'],
      ventFelder: [],
      gase: ['iso', 'sevo', 'halo'], o2Max: 5,
      grenzen: false, fallTimer: false, inspHold: false,
      haut: 'hell', vertrauen: 'belegt',
      hinweis: 'Flowmeter, Verdampfer, Kreissystem, APL — mehr nicht. Diese Geräte MESSEN nichts und haben keine ' +
        'Buchse; wer dort nach einer Schnittstelle sucht, sucht ohne Ende. Beatmung ist Handbetrieb am Beutel.',
    },
    {
      id: 'tafonius', rolle: 'narkose', katalogId: 'tafonius',
      hersteller: 'Hallowell / Vetronic', marke: 'Tafonius', typ: 'Großtier-Narkosesystem',
      aliase: ['tafonius', 'grosstier', 'pferd', 'equine'],
      kanaele: ['ppeak', 'pmean', 'peep', 'vte', 'mv', 'compl', 'rr', 'fio2', 'etco2', 'fico2'],
      kurven: ['paw', 'flow', 'capno'],
      ventModi: ['vcv', 'pcv', 'simv', 'manual'],
      ventFelder: ['vt', 'pinsp', 'af', 'ie', 'peep'],
      gase: ['iso', 'sevo'], o2Max: 15,
      grenzen: true, fallTimer: true, inspHold: true,
      haut: 'dunkel', vertrauen: 'wahrscheinlich',
      hinweis: 'Großtier (Pferd): Kolbenventilator mit PC-Steuerung, Aufzeichnung als CSV über USB. Die Normbänder ' +
        'dieser App sind für Kleintiere — für das Pferd gelten andere.',
    },
  ];

  var PROFIL_NACH_ID = {};
  PROFILE.forEach(function (p) { PROFIL_NACH_ID[p.id] = p; });

  /* ==========================================================================
   * 5) NACHSCHLAGEN
   * ========================================================================== */
  function normText(s) { return String(s == null ? '' : s).toLowerCase().replace(/[\s._\-/+()]/g, ''); }

  function alle(rolle) {
    if (!rolle) return PROFILE.slice();
    /* Der Arbeitsplatz hat ZWEI Waehler: links der Monitor, rechts das zweite Geraet.
     * Ein eigenstaendiger Kapnograf gehoert in den rechten — er steht am selben
     * Schlauch wie das Narkosegeraet und liefert dieselben Atemkanaele. */
    return PROFILE.filter(function (p) {
      if (p.rolle === 'kombi') return true;
      if (rolle === 'narkose') return p.rolle === 'narkose' || p.rolle === 'kapno';
      return p.rolle === rolle;
    });
  }
  function nachId(id) { return PROFIL_NACH_ID[id] || null; }
  function kanal(id) { return KANAL_NACH_ID[id] || null; }
  function kurve(id) { return KURVE_NACH_ID[id] || null; }
  function gas(id) { return GAS_NACH_ID[id] || null; }

  function suche(text, rolle) {
    var q = normText(text);
    var basis = alle(rolle);
    if (!q) return basis;
    return basis.filter(function (p) {
      var felder = [p.hersteller, p.marke, p.typ, p.id].concat(p.aliase || []);
      return felder.some(function (f) { return normText(f).indexOf(q) >= 0; });
    });
  }

  /*
   * erkenne(text, rolle) — aus einem Modellnamen, wie ihn ein GERAET selbst meldet
   * (HL7 MSH-3/OBR-4, Katalogeintrag, devices.json), das passende Profil finden.
   *
   * Bewusst KEIN Raten: es wird nur getroffen, was als Alias/Modell/Hersteller
   * wirklich drinsteht. Kein Treffer -> null, und die Oberflaeche nimmt das
   * Universalprofil. Ein falsch erkanntes Geraet waere schlimmer als keines:
   * es wuerde Kanaele ausblenden, die das echte Geraet sehr wohl liefert.
   */
  function erkenne(text, rolle) {
    var q = normText(text);
    if (!q) return null;
    var kand = alle(rolle).filter(function (p) { return p.katalogId !== null || p.id.indexOf('universal') !== 0; });
    var best = null, bestLen = 0;
    kand.forEach(function (p) {
      var felder = [p.id, p.typ].concat(p.aliase || []);
      felder.forEach(function (f) {
        var n = normText(f);
        if (n.length >= 3 && q.indexOf(n) >= 0 && n.length > bestLen) { best = p; bestLen = n.length; }
      });
    });
    return best;
  }

  /* Profil zu einem Katalogeintrag (bridge/src/geraetekatalog.js) — die Brücke
   * zwischen "wie schließe ich es an" und "was zeigt es". */
  function nachKatalogId(katalogId, rolle) {
    if (!katalogId) return null;
    var t = alle(rolle).filter(function (p) { return p.katalogId === katalogId; });
    return t.length ? t[0] : null;
  }

  function standard(rolle) {
    return rolle === 'narkose' ? PROFIL_NACH_ID['universal-narkose'] : PROFIL_NACH_ID['universal-monitor'];
  }

  /* ==========================================================================
   * 6) ZUSAMMENFUEHREN — aus Monitorprofil + Narkoseprofil EIN virtuelles Geraet
   *
   * Am Arbeitsplatz stehen zwei Geraete nebeneinander; die App zeigt EIN Bild.
   * Welcher Kanal von welchem Geraet kommt, entscheidet dieselbe Regel wie in
   * bridge/src/matching.js: der Monitor liefert bevorzugt den Kreislauf, der
   * Kapnograf/das Narkosegeraet die Atmung. Die Reihenfolge bleibt klinisch
   * sinnvoll (Kreislauf, Atmung, Beatmung, Gas, Temperatur) und nicht zufaellig.
   * ========================================================================== */
  var ART_RANG = { kreislauf: 1, atmung: 2, beatmung: 3, gas: 4, temperatur: 5 };

  function zusammen(monProfil, narkProfil) {
    var m = monProfil || standard('monitor');
    var n = narkProfil || null;
    var kanaele = [], gesehen = {};
    function add(liste) {
      (liste || []).forEach(function (id) { if (KANAL_NACH_ID[id] && !gesehen[id]) { gesehen[id] = 1; kanaele.push(id); } });
    }
    add(m.kanaele); if (n) add(n.kanaele);
    /* Zweitschluessel = Reihenfolge in KANAELE. Ohne ihn haengt die Reihenfolge INNERHALB
     * einer Gruppe davon ab, welches Geraet zuerst gewaehlt wurde — dann steht FiCO2 mal
     * neben EtCO2 und mal hinter der Atemfrequenz. Ein Monitorbild, das sich bei gleicher
     * Geraetelage anders sortiert, ist am OP-Tisch nicht lesbar. */
    var pos = {}; KANAELE.forEach(function (k, i) { pos[k.id] = i; });
    kanaele.sort(function (a, b) {
      var ra = ART_RANG[KANAL_NACH_ID[a].art] || 9, rb = ART_RANG[KANAL_NACH_ID[b].art] || 9;
      return (ra - rb) || (pos[a] - pos[b]);
    });

    var kurven = [], kg = {};
    function addK(liste) { (liste || []).forEach(function (id) { if (KURVE_NACH_ID[id] && !kg[id]) { kg[id] = 1; kurven.push(id); } }); }
    addK(m.kurven); if (n) addK(n.kurven);
    /* Bahnenreihenfolge wie an einem echten Geraet: Herz oben, Atmung darunter,
     * Druck/Fluss unten. Sonst springt das Bild bei jedem Modellwechsel. */
    var reihe = ['ekg', 'pleth', 'capno', 'paw', 'flow', 'resp'];
    kurven.sort(function (a, b) { return reihe.indexOf(a) - reihe.indexOf(b); });

    var beschriftung = {};
    [m, n].forEach(function (p) { if (p && p.beschriftung) Object.keys(p.beschriftung).forEach(function (k) { beschriftung[k] = p.beschriftung[k]; }); });

    return {
      monitor: m, narkose: n,
      kanaele: kanaele,
      kurven: kurven,
      ventModi: (n && n.ventModi && n.ventModi.length) ? n.ventModi.slice() : [],
      ventFelder: (n && n.ventFelder) ? n.ventFelder.slice() : [],
      gase: (n && n.gase && n.gase.length) ? n.gase.slice() : ((m.gase && m.gase.length) ? m.gase.slice() : ['iso']),
      o2Max: (n && n.o2Max) || 5,
      grenzen: !!(m.grenzen || (n && n.grenzen)),
      fallTimer: !!(n && n.fallTimer),
      inspHold: !!(n && n.inspHold),
      beschriftung: beschriftung,
      haut: m.haut || 'mindray',
      monName: (m.marke || '') + ' ' + (m.typ || ''),
      narkName: n ? ((n.marke || '') + ' ' + (n.typ || '')) : null,
      hinweise: [m.hinweis, n && n.hinweis].filter(Boolean),
      vertrauen: minVertrauen(m, n),
    };
  }
  function minVertrauen(a, b) {
    var rang = { belegt: 0, wahrscheinlich: 1, unbestaetigt: 2 };
    var va = (a && a.vertrauen) || 'belegt', vb = (b && b.vertrauen) || 'belegt';
    return (rang[va] >= rang[vb]) ? va : vb;
  }

  /* Beschriftung eines Kanals im aktuellen Geraet ("MAX" statt "Ppeak"). */
  function abbrFuer(geraet, kanalId) {
    var k = KANAL_NACH_ID[kanalId]; if (!k) return kanalId;
    return (geraet && geraet.beschriftung && geraet.beschriftung[kanalId]) || k.abbr;
  }

  /* Hat das zusammengefuehrte Geraet diesen Kanal / diese Bahn? */
  function hatKanal(geraet, id) { return !!(geraet && geraet.kanaele && geraet.kanaele.indexOf(id) >= 0); }
  function hatKurve(geraet, id) { return !!(geraet && geraet.kurven && geraet.kurven.indexOf(id) >= 0); }

  /*
   * bandFuer(kanalId, ctx) -> [lo, hi] | null
   * ctx = { sp, wt, vitals, spSet, gas }
   * vitals = ANAES.vitals[sp]. Zuerst das artspezifische Band aus der gepflegten
   * Tabelle, sonst das kanaleigene band(ctx). Nie geraten.
   */
  function bandFuer(kanalId, ctx) {
    var k = KANAL_NACH_ID[kanalId]; if (!k) return null;
    if (k.vital && ctx && ctx.vitals && ctx.vitals[k.vital]) return ctx.vitals[k.vital].slice();
    if (typeof k.band === 'function') { var b = k.band(ctx || {}); return (b && b.length === 2) ? b : null; }
    return null;
  }

  /*
   * ableiten(werte, ctx) — was sich aus anderen Werten RECHNEN laesst.
   *
   * Regel: nur rechnen, wenn ALLE Eingangswerte wirklich da sind. Ein aus einem
   * fehlenden Wert "geschaetztes" Minutenvolumen waere eine erfundene Messung.
   * Rueckgabe: nur die abgeleiteten Felder, damit der Aufrufer sieht, was gemessen
   * und was gerechnet ist.
   */
  function ableiten(w, ctx) {
    var out = {};
    w = w || {}; ctx = ctx || {};
    if (z(w.vte) != null && z(w.rr) != null && w.rr > 0) out.mv = rnd(w.vte * w.rr / 1000, 2);
    if (z(w.ppeak) != null && z(w.peep) != null && (w.ppeak - w.peep) > 0 && z(w.vte) != null) {
      out.compl = rnd(w.vte / (w.ppeak - w.peep), 1);
    }
    /* Mittlerer Atemwegsdruck: PEEP + (Ppeak−PEEP) × Ti/Ttot. Ti/Ttot folgt aus dem
     * eingestellten I:E (1:2 -> 1/3). Das ist die Naeherung fuer eine RECHTECKIGE
     * Druckkurve (PCV); in VCV mit Rampe liegt der echte Wert etwas niedriger. Wird
     * deshalb nur gerechnet, wenn Ppeak UND PEEP wirklich gemessen sind. */
    if (z(w.ppeak) != null && z(w.peep) != null && w.ppeak >= w.peep) {
      var ie = String(ctx.ie == null ? '1:2' : ctx.ie).replace(',', '.').split(':');
      var i = parseFloat(ie[0]), e = parseFloat(ie[1]);
      var anteil = (i > 0 && e > 0) ? i / (i + e) : (1 / 3);
      out.pmean = rnd(w.peep + (w.ppeak - w.peep) * anteil, 1);
    }
    if (z(w.etAgent) != null) {
      var m = macInfo(ctx.gas || 'iso', ctx.sp, ctx.spSet);
      if (m && m.wert > 0) { out.mac = rnd(w.etAgent / m.wert, 2); out.macAbgeleitet = m.abgeleitet; }
    }
    if (z(w.sys) != null && z(w.dia) != null && w.sys > 0 && w.dia > 0) out.nibp = Math.round(w.dia + (w.sys - w.dia) / 3);
    return out;
  }

  /*
   * pruefe() — Selbstpruefung. Wird vom Test UND beim Laden aufgerufen, damit ein
   * Tippfehler sofort auffaellt und nicht erst, wenn ein Tierarzt das Modell waehlt.
   */
  function pruefe() {
    var fehler = [];
    var ids = {};
    KANAELE.forEach(function (k, i) {
      var wo = 'Kanal ' + i + ' (' + (k.id || 'ohne id') + ')';
      if (!k.id || !/^[a-zA-Z0-9]+$/.test(k.id)) fehler.push(wo + ': id fehlt oder unerlaubte Zeichen');
      if (ids[k.id]) fehler.push(wo + ': id doppelt');
      ids[k.id] = true;
      if (!k.abbr) fehler.push(wo + ': abbr fehlt');
      if (!k.name) fehler.push(wo + ': name fehlt');
      if (k.unit == null) fehler.push(wo + ': unit fehlt');
      if (['kreislauf', 'atmung', 'beatmung', 'gas', 'temperatur'].indexOf(k.art) < 0) fehler.push(wo + ': unbekannte art "' + k.art + '"');
      if (!k.explain) fehler.push(wo + ': keine Erklaerung — dann kann die Detailansicht nichts sagen');
      if (!k.vital && typeof k.band !== 'function' && ['fiAgent', 'etn2o', 'o2flow', 'ie'].indexOf(k.id) < 0) {
        fehler.push(wo + ': weder vital noch band() — ohne Normband gibt es keinen Alarm');
      }
    });
    var kids = {};
    KURVEN.forEach(function (k, i) {
      var wo = 'Kurve ' + i + ' (' + (k.id || 'ohne id') + ')';
      if (!k.id) fehler.push(wo + ': id fehlt');
      if (kids[k.id]) fehler.push(wo + ': id doppelt');
      kids[k.id] = true;
      if (!k.name) fehler.push(wo + ': name fehlt');
      if (['herz', 'atem'].indexOf(k.takt) < 0) fehler.push(wo + ': takt muss herz oder atem sein');
      if (!k.erklaerung) fehler.push(wo + ': keine Erklaerung');
    });
    var gids = {};
    GASE.forEach(function (g, i) {
      var wo = 'Gas ' + i + ' (' + (g.id || 'ohne id') + ')';
      if (!g.id) fehler.push(wo + ': id fehlt');
      if (gids[g.id]) fehler.push(wo + ': id doppelt');
      gids[g.id] = true;
      if (!(g.max > 0)) fehler.push(wo + ': max fehlt');
      if (!g.quelle) fehler.push(wo + ': keine Quelle — ein MAC-Wert ohne Quelle ist ein Geruecht');
      if (!g.ausSpSet && !(g.faktor > 0)) fehler.push(wo + ': faktor fehlt (fuer die Ableitung bei fehlender Art)');
    });
    var pids = {};
    PROFILE.forEach(function (p, i) {
      var wo = 'Profil ' + i + ' (' + (p.id || 'ohne id') + ')';
      if (!p.id || !/^[a-z0-9-]+$/.test(p.id)) fehler.push(wo + ': id fehlt oder unerlaubte Zeichen');
      if (pids[p.id]) fehler.push(wo + ': id doppelt');
      pids[p.id] = true;
      if (['monitor', 'narkose', 'kapno', 'kombi'].indexOf(p.rolle) < 0) fehler.push(wo + ': unbekannte rolle "' + p.rolle + '"');
      if (!p.hersteller || !p.typ) fehler.push(wo + ': hersteller/typ fehlt');
      if (['belegt', 'wahrscheinlich', 'unbestaetigt'].indexOf(p.vertrauen) < 0) fehler.push(wo + ': unbekanntes vertrauen');
      if (!p.hinweis) fehler.push(wo + ': kein Hinweis — der Anwender muss die haeufigste Enttaeuschung vorher kennen');
      (p.kanaele || []).forEach(function (k) { if (!KANAL_NACH_ID[k]) fehler.push(wo + ': unbekannter Kanal "' + k + '"'); });
      (p.kurven || []).forEach(function (k) { if (!KURVE_NACH_ID[k]) fehler.push(wo + ': unbekannte Kurve "' + k + '"'); });
      (p.gase || []).forEach(function (g) { if (!GAS_NACH_ID[g]) fehler.push(wo + ': unbekanntes Gas "' + g + '"'); });
      if (p.beschriftung) Object.keys(p.beschriftung).forEach(function (k) {
        if (!KANAL_NACH_ID[k]) fehler.push(wo + ': Beschriftung fuer unbekannten Kanal "' + k + '"');
        if ((p.kanaele || []).indexOf(k) < 0) fehler.push(wo + ': Beschriftung fuer Kanal "' + k + '", den das Profil gar nicht hat');
      });
      if (p.rolle === 'narkose' && (p.ventModi || []).length === 0 && (p.kanaele || []).length > 0) {
        fehler.push(wo + ': Narkoseprofil mit Kanaelen, aber ohne einen einzigen Beatmungsmodus');
      }
      /* Ein Narkoseprofil ohne Kanaele (rein mechanisch) ist gueltig und wichtig —
       * es sagt dem Tierarzt, dass es dort NICHTS abzulesen gibt. */
    });
    return fehler;
  }

  return {
    KANAELE: KANAELE, KURVEN: KURVEN, GASE: GASE, PROFILE: PROFILE,
    alle: alle, nachId: nachId, nachKatalogId: nachKatalogId, suche: suche, erkenne: erkenne, standard: standard,
    kanal: kanal, kurve: kurve, gas: gas,
    zusammen: zusammen, abbrFuer: abbrFuer, hatKanal: hatKanal, hatKurve: hatKurve,
    bandFuer: bandFuer, macInfo: macInfo, macFuer: macFuer, ableiten: ableiten,
    normText: normText, pruefe: pruefe,
    VERSION: '1.0.0',
  };
}));
