/*
 * rasse-herz.js — die EKG-Schicht ueber den Rassekatalog.
 *
 * WARUM ES DIESE DATEI GIBT (09.08.2026):
 * Der Rassekatalog (shared/breed-katalog.js, 747 Rassen) fuehrt bereits zwei Dutzend
 * HERZerkrankungen mit ihrer Rassezuordnung - belegt, gepflegt und von der Narkoseabteilung
 * genutzt. Was fehlte, war die Bruecke zum EKG: der Katalog sagt, WELCHE Rasse WELCHE
 * Herzerkrankung haeufiger hat, aber nicht, ob und wie man das in einem EKG sieht.
 *
 * Diese Datei legt genau diese Schicht darueber und NICHTS SONST. Sie wiederholt keine
 * Krankheitsbeschreibung - die steht im Katalog und ist dort belegt. Sie beantwortet drei
 * Fragen je Erkrankung:
 *      1. Ist davon in EINER Ableitung II ueberhaupt etwas zu sehen?
 *      2. In welchem Alter ist es relevant?
 *      3. Was tut die Tieraerztin daraufhin?
 *
 * DIE HAERTESTE REGEL DIESER DATEI:
 * Dieses Geraet zeichnet EINE Ableitung auf (beim Pferd Basis-Spitze). Die uebrigen fuenf
 * werden gerechnet und sind so gekennzeichnet. Deshalb darf hier NICHTS versprochen werden,
 * was eine Achsenbestimmung, eine Schenkelblockzuordnung oder Brustwandableitungen braucht.
 * Wo das EKG nichts beitraegt, steht das ausdruecklich da - "ekgSichtbar:false". Ein Programm,
 * das eine Erkrankung ankuendigt, die es gar nicht sehen kann, ist gefaehrlicher als eines,
 * das schweigt: der Untersucher glaubt dann, das Thema sei abgehandelt.
 *
 * WAS DAS HIER NICHT IST: keine Diagnose und keine Aussage ueber DIESES Tier. Eine
 * Praedisposition sagt, worauf man bei dieser Rasse besonders schaut - nicht, dass etwas
 * vorliegt. Die Texte sind entsprechend formuliert.
 *
 * Reines ES5, keine Abhaengigkeiten. Laeuft im Browser (window.VS.rasseHerz) und in Node.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else { root.VS = root.VS || {}; root.VS.rasseHerz = factory(); }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ==========================================================================================
   * 1. DIE EKG-SCHICHT — je Katalogschluessel
   *
   * schluessel     : der Schluessel aus breed-katalog.js (CONDITIONS). Aendert er sich dort,
   *                  faellt der Eintrag hier still aus - deshalb prueft tools/rasse-herz-test.js
   *                  jeden Schluessel gegen den Katalog.
   * ekgSichtbar    : ist in Ableitung II etwas zu sehen?
   * ekg            : was - oder woertlich, dass nichts zu sehen ist.
   * vorgehen       : ein Satz fuer den Untersucher.
   * vonJahre/bisJahre : Altersfenster in Jahren; null = offen. NUR wo belegt.
   * stufe          : 'wichtig' steht oben im Befund, 'beachten' darunter, 'hintergrund' klappt zu.
   * beleg          : woher die EKG-Aussage stammt (die Krankheitsbeschreibung belegt der Katalog).
   * ========================================================================================== */
  /* ==========================================================================================
   * SCHLUESSEL DES KATALOGS, DIE ABSICHTLICH KEINE EKG-SCHICHT HABEN
   *
   * Diese Liste ist kein Beiwerk, sondern die Gegenprobe zur Vollstaendigkeit. Der Test
   * verlangt, dass JEDE Herzbedingung des Katalogs entweder eine Schicht hat ODER hier mit
   * Begruendung steht. Ohne diese zweite Richtung faellt eine neue Katalogbedingung STILL
   * durch - genau so ist am 09.08.2026 die haeufigste Herzerkrankung des Hundes durchgefallen
   * (mmvd-cavalier, 13 Rassen): der Test prueft nur, ob es jeden Eintrag HIER auch dort gibt,
   * und war deshalb gruen ueber einer Luecke.
   * ========================================================================================== */
  var OHNE_SCHICHT = {
    'boxer-ace': 'Arzneimittelempfindlichkeit, kein EKG-Befund. Sie gehoert in die Narkoseplanung, wo der Katalog sie auch fuehrt.',
    'acepromazin-idiosynkrasie-boxer': 'wie boxer-ace: eine Reaktion auf ein Mittel, nichts, was ein Ruhestreifen zeigt.',
    'hypothyreose': 'keine primaere Herzerkrankung. Bradykardie und flache Komplexe kommen vor - sie stehen als Differenzialdiagnose beim Perikarderguss, nicht als eigene Rassedisposition.',
    'muskeldystrophie-dmd': 'die Herzbeteiligung ist beschrieben, ein rassebezogener EKG-Hinweis daraus ist es nicht.',
    'atropin-limitierung': 'betrifft die Wirkung eines Mittels beim Reptil, nicht die Aufzeichnung.'
  };

  var SCHICHT = [
    /* ---------------------------------------------------------------- Kardiomyopathien Hund */
    {
      schluessel: 'dcm-dobermann', thema: 'dcm', rang: 1, ekgSichtbar: true, stufe: 'wichtig',
      vonJahre: 3, altersGrund: 'Screening-Empfehlung ab dem dritten Lebensjahr, jaehrlich',
      ekg: 'Der Ruhestreifen ist in der okkulten Phase meistens unauffällig. Sichtbar werden können einzelne ventrikuläre Extrasystolen - ihr Fehlen sagt nichts.',
      /* DIE ZAHL, DIE DEN SATZ TRAEGT (Gegenpruefung 09.08.2026, JVIM 2010, PMID 20136711):
       * Das 5-Minuten-EKG hat gegen das 24-Stunden-EKG eine Sensitivitaet von 64 %, aber eine
       * SPEZIFITAET von 97 %. Daraus folgt beides: ein sauberer Kurzstreifen entlastet nicht
       * (bei 204 Hunden mit ueber 100 VES/24 h fand der Kurzstreifen in 36 % gar nichts) -
       * eine einzelne VES darin ist dagegen hochverdaechtig. Ohne diese Zahlen waere die
       * Aufforderung zum Holter eine Behauptung; mit ihnen ist sie begruendet. */
      vorgehen: 'Schon eine einzelne Kammerextrasystole ist bei dieser Rasse ein Anlass für ein 24-Stunden-EKG: der Kurzstreifen ist wenig empfindlich (64 %), aber sehr spezifisch (97 %). Umgekehrt entlastet ein sauberer Streifen nicht — bei Hunden mit über 100 Extrasystolen in 24 Stunden fand ein 5-Minuten-EKG in gut einem Drittel der Fälle gar nichts.',
      beleg: 'ACVIM-Konsens zur DCM des Dobermanns; JVIM 2010 (PMID 20136711): 5-min-EKG Sens. 64,2 %, Spez. 96,7 %'
    },
    /* ==========================================================================================
     * DIE HAEUFIGSTE HERZERKRANKUNG DES HUNDES - und sie hat hier zunaechst GEFEHLT.
     *
     * Gemessen bei der Gegenpruefung am 09.08.2026: der Katalogschluessel 'mmvd-cavalier'
     * haengt an 13 Rassen, hatte aber keine EKG-Schicht. Dackel, Whippet und King Charles
     * Spaniel bekamen dadurch NULL Hinweise - der Kasten "Zur Rasse" erschien gar nicht,
     * und beim Cavalier stand nur die pulmonale Hypertonie da, nicht die Klappe.
     * Ein Tierarzt, der einen Kasten "Zur Rasse" sieht und die Erkrankung NICHT liest,
     * deretwegen diese Rasse beruehmt ist, zieht daraus den falschen Schluss.
     * ========================================================================================== */
    {
      schluessel: 'mmvd-cavalier', thema: 'mmvd', rang: 1, ekgSichtbar: true, stufe: 'wichtig',
      /* KEIN Altersfenster: der Schluessel traegt 13 sehr verschiedene Rassen. Beim Cavalier
       * treten Geraeusche oft schon im jungen Erwachsenenalter auf, bei den uebrigen kleinen
       * Rassen erst spaeter. Eine gemeinsame Jahreszahl waere fuer beide Gruppen falsch -
       * das Alter steht deshalb im Text und nicht als Schranke. */
      ekg: 'Bei Vergrößerung des linken Vorhofs kann die P-Welle in Ableitung II verbreitert sein (P mitrale), dazu hohe R-Zacken. Im fortgeschrittenen Stadium supraventrikuläre Extrasystolen bis hin zu Vorhofflimmern. Ein unauffälliges EKG ist bei leichter Erkrankung die Regel und schließt nichts aus.',
      vorgehen: 'Das Leitzeichen ist das systolische Herzgeräusch über der Mitralklappe, nicht das EKG. Bei Geräusch: Echokardiographie zur Stadieneinteilung; Röntgen für die Größe. Eine neu aufgetretene supraventrikuläre Tachykardie oder Vorhofflimmern bei bekannter Klappenerkrankung ist ein dringlicher Befund.',
      beleg: 'ACVIM-Konsens zur myxomatösen Mitralklappenerkrankung; P mitrale und Vorhofflimmern bei linksatrialer Vergrößerung'
    },
    {
      /* Zweiter, allgemeiner DCM-Schluessel des Katalogs (Dobermann, Deutsche Dogge,
       * Neufundlaender). Er unterscheidet sich vom Schluessel des Dobermanns um EIN "n" -
       * wer beim Pflegen den falschen setzt, erzeugt sonst genau den stillen Ausfall, den
       * diese Datei verhindern soll. Ueber "thema" faellt er weg, wo ein genauerer Eintrag
       * schon greift; allein steht er fuer die uebrigen Rassen. */
      schluessel: 'dcm-doberman', thema: 'dcm', rang: 3, ekgSichtbar: true, stufe: 'wichtig',
      ekg: 'Sichtbar ist die Rhythmusstörung, nicht der Muskelschaden: ventrikuläre Extrasystolen, bei fortgeschrittener Erkrankung Vorhofflimmern. Ein unauffälliger Ruhestreifen schließt eine dilatative Kardiomyopathie nicht aus.',
      vorgehen: 'Bei ventrikulärer Ektopie oder Vorhofflimmern dieser Rassen: Echokardiographie und 24-Stunden-EKG.',
      beleg: 'dilatative Kardiomyopathie des Hundes, allgemeiner Katalogschlüssel'
    },
    {
      schluessel: 'arvc-boxer', thema: 'arvc', rang: 1, ekgSichtbar: true, stufe: 'wichtig',
      ekg: 'Kammerextrasystolen, typischerweise monomorph. Ihre Form lässt sich mit EINER aufgezeichneten Ableitung nicht sicher zuordnen - dafür braucht es echt abgeleitete II, III und aVF.',
      vorgehen: 'Ventrikuläre Ektopie beim Boxer gehört ins 24-Stunden-EKG, nicht auf den Kurzstreifen.',
      beleg: 'ARVC-Diagnosekriterien des Boxers (Holter-basiert)'
    },
    {
      schluessel: 'dcm-riesenrassen', thema:'dcm', rang:2, ekgSichtbar: true, stufe: 'wichtig',
      /* Der eine Fall dieser Gruppe, in dem ein KURZER Streifen wirklich etwas leistet - weil
       * Vorhofflimmern meist dauerhaft anliegt und kein Anfallsereignis ist. Die f-Wellen sind
       * beim Hund oft zu fein, um sichtbar zu sein; ihr Fehlen spricht deshalb NICHT dagegen. */
      ekg: 'Vorhofflimmern zeigt sich in Ableitung II als unregelmäßig unregelmäßige RR-Abstände ohne erkennbare P-Wellen — ein echtes Einableitungs-Merkmal. Eine flimmernde Grundlinie fehlt beim Hund oft; ihr Ausbleiben spricht nicht dagegen.',
      vorgehen: 'Fehlende P-Wellen mit unregelmäßigem Rhythmus bei einer Riesenrasse: Echokardiographie veranlassen.',
      beleg: 'Kleintierkardiologie, DCM der Riesen- und Großrassen; Vorhofflimmern als Erstmanifestation'
    },
    {
      schluessel: 'dcm-juvenil', thema:'dcm-juv', rang:1, ekgSichtbar: true, stufe: 'wichtig',
      bisJahre: 2, altersGrund: 'juvenile Form; betroffen sind Welpen und Junghunde',
      ekg: 'Beim Jungtier: Tachykardie, ventrikuläre Ektopie. Ein unauffälliger Streifen schließt nichts aus.',
      vorgehen: 'Bei einem Junghund dieser Rassen mit Rhythmusstörung oder Leistungsschwäche gehört das Echo an den Anfang, nicht ans Ende.',
      beleg: 'juvenile DCM des Portugiesischen Wasserhundes und des Toller'
    },
    {
      schluessel: 'dcm-taurin', thema:'dcm-taurin', rang:1, ekgSichtbar: false, stufe: 'beachten',
      ekg: 'Am EKG ist diese Form nicht von einer anderen DCM zu unterscheiden - es gibt kein eigenes Bild.',
      vorgehen: 'Der Punkt dieser Rassezuordnung liegt nicht im EKG: Taurin- und Carnitinspiegel bestimmen, denn diese Form ist teilweise rückläufig.',
      beleg: 'taurinresponsive DCM bei Cocker Spaniel und Golden Retriever'
    },
    /* ---------------------------------------------------------------- Kardiomyopathie Katze */
    {
      schluessel: 'hcm-mybpc3-a31p', thema:'hcm', rang:1, ekgSichtbar: false, stufe: 'beachten',
      ekg: 'Das EKG ist für die Erkennung einer HCM bei der Katze schlecht geeignet: ein völlig unauffälliger Streifen ist bei nachgewiesener HCM häufig.',
      vorgehen: 'Die Diagnose hängt am Echokardiogramm. Der Gentest prüft EINE Variante - ein negatives Ergebnis schließt eine HCM nicht aus.',
      beleg: 'MYBPC3-A31P der Maine Coon; unvollständige Penetranz'
    },
    {
      schluessel: 'hcm-mybpc3-r820w', thema:'hcm', rang:1, ekgSichtbar: false, stufe: 'beachten',
      ekg: 'Wie bei jeder HCM der Katze: das EKG kann völlig unauffällig sein.',
      vorgehen: 'Echokardiographie. Der Gentest prüft EINE Variante und schließt eine HCM nicht aus.',
      beleg: 'MYBPC3-R820W der Ragdoll'
    },
    {
      schluessel: 'hcm-alms1', thema:'hcm', rang:1, ekgSichtbar: false, stufe: 'beachten',
      ekg: 'Das EKG trägt zur Erkennung nichts Verlässliches bei.',
      vorgehen: 'Echokardiographie; beim Sphynx zusätzlich die Wärmeregulation im Blick behalten.',
      beleg: 'ALMS1-Variante des Sphynx'
    },
    {
      schluessel: 'hcm-rasse', thema:'hcm', rang:2, ekgSichtbar: false, stufe: 'beachten',
      ekg: 'Ein unauffälliger Streifen schließt eine HCM nicht aus. Was auffallen kann, sind Tachyarrhythmien und ventrikuläre Ektopie - beides unspezifisch.',
      vorgehen: 'Bei Herzgeräusch, Galopprhythmus oder Rhythmusstörung: Echokardiographie. Das EKG ersetzt sie nicht.',
      beleg: 'rassepräedisponierte HCM ohne bekannte Mutation'
    },
    {
      /* Zweiter HCM-Schluessel des Katalogs (4 Katzenrassen). Wie bei dcm-doberman: er faellt
       * ueber "thema" weg, wo ein genauerer Eintrag greift, und traegt sonst allein. */
      schluessel: 'hcm-cat', thema: 'hcm', rang: 3, ekgSichtbar: false, stufe: 'beachten',
      ekg: 'Das EKG ist für die Erkennung einer HCM bei der Katze schlecht geeignet: ein völlig unauffälliger Streifen ist bei nachgewiesener Erkrankung häufig.',
      vorgehen: 'Echokardiographie. Bei Herzgeräusch, Galopprhythmus oder Rhythmusstörung nicht auf das EKG warten.',
      beleg: 'hypertrophe Kardiomyopathie der Katze, allgemeiner Katalogschlüssel'
    },
    {
      schluessel: 'sam-lvoto', thema: 'sam', rang: 1, ekgSichtbar: false, stufe: 'hintergrund',
      ekg: 'Die dynamische Ausflusstraktobstruktion selbst ist im EKG nicht zu sehen.',
      vorgehen: 'Bedeutsam für die Narkose: Volumenmangel und Tachykardie verstärken die Obstruktion.',
      beleg: 'SAM/HOCM der Katze'
    },
    /* ---------------------------------------------------------------- angeborene Herzfehler */
    {
      schluessel: 'subaortenstenose', ekgSichtbar: true, stufe: 'wichtig',
      ekg: 'Das Ruhe-EKG ist häufig unauffällig. Ventrikuläre Extrasystolen kommen vor und sind hier bedeutsam, weil sie mit plötzlichem Herztod in Verbindung gebracht werden.',
      vorgehen: 'Herzgeräusch beim Jungtier dieser Rassen: Echokardiographie mit Doppler. Kammerextrasystolen sind ein Warnzeichen, kein Nebenbefund.',
      beleg: 'Subaortenstenose des Hundes; ventrikuläre Arrhythmie als Risikomerkmal'
    },
    {
      schluessel: 'pulmonalstenose', ekgSichtbar: false, stufe: 'beachten',
      ekg: 'Die Rechtsherzvergrößerung zeigt sich vor allem als Drehung der elektrischen Achse. Eine Achsenbestimmung braucht mehrere ECHT abgeleitete Ableitungen - dieses Gerät zeichnet eine auf und kann sie deshalb nicht leisten.',
      vorgehen: 'Herzgeräusch links basal beim Jungtier: Echokardiographie. Vom EKG ist hier keine Antwort zu erwarten.',
      beleg: 'Pulmonalstenose; rechtsventrikuläre Hypertrophie mit Achsendrehung'
    },
    {
      schluessel: 'pda', ekgSichtbar: true, stufe: 'beachten',
      ekg: 'Bei linksseitiger Volumenbelastung können eine verbreiterte P-Welle und hohe R-Zacken auffallen - beides in Ableitung II sichtbar, aber unspezifisch.',
      vorgehen: 'Durchgehendes Maschinengeräusch beim Welpen: sofort Echokardiographie; der Verschluss ist die Behandlung.',
      beleg: 'PDA des Hundes; linksatriale und linksventrikuläre Volumenbelastung'
    },
    {
      schluessel: 'ventrikelseptumdefekt', ekgSichtbar: false, stufe: 'hintergrund',
      ekg: 'Meistens nichts: die Mehrzahl der isolierten Defekte ist klein und bleibt ohne Beschwerden (43 von 53 in einer Kohorte von 109 Tieren). Das EKG ist dann normal — und ein normales EKG sagt weder über das Vorhandensein noch über die Größe des Defekts etwas.',
      vorgehen: 'Systolisches Geräusch rechts: Echokardiographie. Vom EKG ist hier keine Antwort zu erwarten.',
      beleg: 'JAVMA 2015 (PubMed 26133216), 109 Tiere: 43/53 isolierte Defekte subklinisch. Die Arbeit enthält keine EKG-Daten.'
    },
    {
      schluessel: 'trikuspidaldysplasie', ekgSichtbar: true, stufe: 'beachten',
      ekg: 'Die Vergrößerung des rechten Vorhofs kann eine hohe, spitze P-Welle machen - das ist in Ableitung II erkennbar. Vorhofflimmern kommt bei starker Vergrößerung vor.',
      vorgehen: 'Beim Labrador mit rechtsseitigem Systolikum an die Trikuspidaldysplasie denken und echokardiographieren.',
      beleg: 'Trikuspidalklappendysplasie; rechtsatriale Vergrößerung'
    },
    /* ---------------------------------------------------------------- erworben, EKG traegt */
    {
      schluessel: 'sick-sinus-syndrom', ekgSichtbar: true, stufe: 'wichtig',
      ekg: 'Hier trägt das Ruhe-EKG wirklich etwas bei: Sinusbradykardie, lange Pausen mit oder ohne Ersatzschläge, teils abwechselnd mit supraventrikulärer Tachykardie.',
      vorgehen: 'Pausen bei einer dieser Rassen mit Synkopenanamnese: Langzeit-EKG und kardiologische Vorstellung. Die Schrittmacherfrage steht im Raum.',
      beleg: 'Sinusknotendysfunktion; Bradykardie-Tachykardie-Syndrom'
    },
    {
      schluessel: 'perikarderguss-haemangiosarkom', ekgSichtbar: true, stufe: 'wichtig',
      /* ZWEI KORREKTUREN AUS DER GEGENPRUEFUNG (09.08.2026), beide sicherheitsrelevant:
       * (1) Der elektrische Alternans ist ABLEITUNGSABHAENGIG - er kann in II fehlen und in
       *     einer anderen Ableitung deutlich sein. An einem Geraet, das nur II aufzeichnet,
       *     ist seine ohnehin niedrige Empfindlichkeit also noch geringer als in der Literatur.
       * (2) Niedrige Ausschlaege haben haeufigere Ursachen als einen Perikarderguss. Wer sie
       *     ohne diese Differenzialdiagnosen meldet, schickt Tiere in einen Ultraschall, den
       *     sie nicht brauchen - und lernt, der Meldung nicht mehr zu glauben. */
      ekg: 'Zwei Zeichen wären in Ableitung II erkennbar: durchgehend niedrige Ausschläge und ein von Schlag zu Schlag wechselnder Ausschlag (elektrischer Alternans). Der Alternans ist ableitungsabhängig und kann gerade in II fehlen — mit nur einer aufgezeichneten Ableitung ist er noch unempfindlicher als in der Literatur. Ihr Ausbleiben schließt einen Erguss nicht aus.',
      vorgehen: 'Niedrige Ausschläge zusammen mit schwachem Puls und gestauten Halsvenen: sofort Ultraschall, eine Tamponade ist ein Notfall. Ohne diese Klinik zuerst die häufigeren Ursachen flacher Komplexe bedenken — Übergewicht, Pleuraerguss, Hypothyreose, falsch gewählte Verstärkung.',
      beleg: 'Perikarderguss; Niedervoltage und elektrischer Alternans (Alternans ableitungsabhängig)'
    },
    {
      schluessel: 'pulmonale-hypertonie', ekgSichtbar: false, stufe: 'beachten',
      ekg: 'Die Rechtsherzbelastung zeigt sich vor allem in der Achse und in den Brustwandableitungen - beides ist hier nicht zu haben.',
      vorgehen: 'Beim brachyzephalen Tier mit Belastungsintoleranz oder Synkope an die pulmonale Hypertonie denken; Echokardiographie mit Trikuspidalinsuffizienz-Doppler.',
      beleg: 'pulmonale Hypertonie bei BOAS'
    },
    /* ---------------------------------------------------------------- Heimtiere und Exoten */
    {
      schluessel: 'kardiomyopathie', ekgSichtbar: true, stufe: 'beachten',
      ekg: 'Beim Kaninchen ist ein EKG technisch möglich, aber anspruchsvoll: die Herzfrequenz liegt hoch, die Ausschläge sind klein. Ohne hohe Papiergeschwindigkeit und hohe Verstärkung ist der Streifen nicht auswertbar.',
      vorgehen: 'Vorschub auf 50 mm/s und Verstärkung erhöhen. Ein unauffälliger Streifen sagt beim Kaninchen wenig.',
      beleg: 'Kardiomyopathie und Klappenerkrankung des Kaninchens'
    },
    {
      schluessel: 'atriale-thrombose', ekgSichtbar: true, stufe: 'beachten',
      vonJahre: 1, altersGrund: 'Erkrankung des alten Goldhamsters',
      ekg: 'Beim Hamster ist ein verwertbares EKG praktisch kaum zu bekommen: die Herzfrequenz liegt weit über dem, was dieses Gerät sinnvoll auflöst.',
      vorgehen: 'Die Beurteilung stützt sich hier auf Klinik und Ultraschall, nicht auf das EKG.',
      beleg: 'Vorhofthrombose des alten Goldhamsters'
    },
    {
      schluessel: 'herz-shunt', ekgSichtbar: false, stufe: 'beachten',
      ekg: 'Der Rechts-links-Shunt des Reptils ist eine Eigenschaft des gesunden Kreislaufs, keine Rhythmusstörung - im EKG ist er nicht zu sehen.',
      vorgehen: 'Wichtig für die Narkose, nicht für das EKG: der Shunt verlangsamt die Aufnahme von Inhalationsanästhetika unvorhersehbar. Eine flache Narkose ist hier kein Zeichen zu geringer Dosis.',
      beleg: 'intrakardialer Shunt der Reptilien'
    }
  ];

  /* ==========================================================================================
   * 2. RASSEGRUPPEN ALS NORMVARIANTEN
   *
   * DIESE SIND DER WICHTIGERE TEIL DER DATEI, auch wenn es weniger Zeilen sind. Sie
   * verhindern FEHLALARME: ein Greyhound hat hohe R-Zacken, ein Mops eine ausgepraegte
   * Sinusarrhythmie - beides ist bei diesen Tieren normal. Wer das als Befund meldet,
   * erzeugt Misstrauen gegen die Anzeige, und dann wird auch der echte Befund nicht geglaubt.
   *
   * UND DIE GEGENRICHTUNG, die genauso wichtig ist: jede Normvariante hat eine Grenze, ab
   * der auch bei dieser Gruppe ein echter Befund vorliegt. Sie steht in "grenze". Eine zu
   * weit gefasste Normvariante redet einen echten Befund weg, und das waere der schlimmere
   * der beiden Fehler.
   * ========================================================================================== */
  /* WELCHE GRUPPEN HIER *NICHT* STEHEN, UND WARUM (nachgesehen im Katalog, 09.08.2026):
   *
   * Der Katalog fuehrt ausserdem "giant" und "toy". Beide sahen zunaechst wie die passende
   * Grundlage fuer breitere QRS-Grenzen bzw. eine hoehere Frequenzobergrenze aus. Der Blick
   * in die Mitgliederliste hat das widerlegt: "giant" enthaelt 75 Rassen, darunter Boxer,
   * Dobermann, Akita - und den Affenpinscher mit vier Kilogramm. Ihre Beschreibung im Katalog
   * lautet "Kardiomyopathie- und GDV-Neigung; Anaesthetika nach Magermasse dosieren". Es ist
   * also eine NARKOSERISIKO-Gruppe und keine Groessenklasse.
   *
   * Haette diese Datei daraus eine weitere QRS-Grenze abgeleitet, waere fuer einen Boxer und
   * selbst fuer einen Affenpinscher die Grenze auf Riesenrassenmass gestiegen - und ein
   * wirklich verbreiterter Kammerkomplex waere unauffaellig geblieben. Genau das ist der
   * Fehler, den Normvarianten verhindern sollen, nur in die andere Richtung: nicht ein
   * Fehlalarm, sondern ein weggeredeter Befund.
   *
   * Die Koerpergroesse steuert die QRS- und R-Grenzen deshalb weiterhin ueber das GEWICHT
   * (normFuer() im EKG-Submodul, drei belegte Stufen). Fuer eine hoehere Frequenzobergrenze
   * bei Zwergrassen fehlt eine belegte Kilogrammgrenze - also gibt es sie hier nicht.
   */
  var GRUPPEN = [
    {
      gruppe: 'sighthound', name: 'Windhundtyp', arten: ['hund'],
      was: 'Hohe R-Ausschläge sind beim Windhund die Regel und kein Hinweis auf eine Vergrößerung — das Herz ist im Verhältnis zum Körper größer als bei anderen Rassen.',
      grenze: 'Die Ausnahme betrifft nur die AMPLITUDE. Rhythmus, QRS-Dauer und Pausen werden unverändert bewertet: eine Arrhythmie ist auch beim Windhund eine Arrhythmie.',
      wirkt: ['rAmp'],
      beleg: 'veröffentlichte Referenzintervalle für Greyhound und Whippet'
    },
    {
      gruppe: 'brachy', name: 'brachyzephale Rasse', arten: ['hund'],
      was: 'Hoher Vagotonus: eine ausgeprägte atemabhängige Sinusarrhythmie und ein wandernder Schrittmacher sind beim brachyzephalen Hund häufig und ohne eigenständigen Krankheitswert.',
      grenze: 'Eine Pause über das Doppelte des mittleren RR-Abstands hinaus ist auch hier ein Befund, ebenso jeder vorzeitige Schlag.',
      wirkt: ['sinusarrhythmie'],
      beleg: 'vagal bedingte Sinusarrhythmie bei brachyzephalen Rassen'
    }
  ];

  /* Nachschlagen ohne Schleife bei jedem Aufruf. */
  var _ix = null;
  function ixSchicht() {
    if (!_ix) { _ix = {}; for (var i = 0; i < SCHICHT.length; i++) _ix[SCHICHT[i].schluessel] = SCHICHT[i]; }
    return _ix;
  }

  /* Traegt diese Rasse ueberhaupt eine Herzbedingung? Steuert den Punkt in der Trefferliste. */
  function hatHerz(breed) {
    if (!breed || !breed.conditions) return false;
    var ix = ixSchicht();
    for (var i = 0; i < breed.conditions.length; i++) if (ix[breed.conditions[i]]) return true;
    return false;
  }

  /* ==========================================================================================
   * fuerPatient({ breed, alter, VB }) — was gilt fuer DIESES Tier?
   *
   * "alter" ist das Objekt aus shared/patient-alter.js oder null. UND DAS IST DER PUNKT, an
   * dem die Datei sich zurueckhaelt: ist das Alter unbekannt, wird ein Eintrag mit
   * Altersfenster TROTZDEM gezeigt - nur eben mit dem Vermerk, dass das Alter fehlt. Ihn
   * wegzulassen waere die gefaehrlichere Wahl: dann verschwaende ein Hinweis, weil ein Feld
   * leer ist, und niemand wuesste davon.
   * ========================================================================================== */
  function fuerPatient(opt) {
    opt = opt || {};
    var b = opt.breed, VB = opt.VB || null, alter = opt.alter || null;
    var out = { praedispositionen: [], normvarianten: [], rasse: b ? b.name : '', ohneAlter: false };
    if (!b) return out;
    var ix = ixSchicht(), i;

    for (i = 0; i < (b.conditions || []).length; i++) {
      var s = ix[b.conditions[i]];
      if (!s) continue;
      var kat = (VB && VB.CONDITIONS) ? VB.CONDITIONS[s.schluessel] : null;
      var e = {
        schluessel: s.schluessel,
        name: kat ? kat.name : s.schluessel,
        kurz: kat ? kat.short : '',
        ekgSichtbar: s.ekgSichtbar, ekg: s.ekg, vorgehen: s.vorgehen,
        stufe: s.stufe, beleg: s.beleg, thema: s.thema || null, rang: s.rang || 9,
        vonJahre: (s.vonJahre == null ? null : s.vonJahre),
        bisJahre: (s.bisJahre == null ? null : s.bisJahre),
        altersGrund: s.altersGrund || '',
        /* DREI ZUSTAENDE, NICHT ZWEI (berichtigt 09.08.2026):
         *   true  - der Eintrag gilt jetzt (kein Fenster, oder das Alter liegt darin)
         *   false - das Alter liegt ausserhalb des Fensters
         *   null  - es GIBT ein Fenster, aber kein Alter; also unbekannt
         * Die erste Fassung liess "kein Fenster" ebenfalls auf null stehen. Damit waeren
         * genau die Eintraege ohne Altersgrenze - darunter die Mitralklappenerkrankung und
         * die ARVC des Boxers - fuer jede Regel dauerhaft unentschieden gewesen und haetten
         * nie gegriffen. */
        hatFenster: (s.vonJahre != null || s.bisJahre != null),
        imFenster: true
      };
      if (e.hatFenster) {
        if (!alter || !alter.gueltig) { e.imFenster = null; out.ohneAlter = true; }
        else {
          var j = alter.dezimalJahre;
          e.imFenster = !((e.vonJahre != null && j < e.vonJahre) || (e.bisJahre != null && j > e.bisJahre));
        }
      }
      out.praedispositionen.push(e);
    }
    /* ==========================================================================================
     * EIN THEMA, EIN EINTRAG (09.08.2026)
     *
     * Der Katalog fuehrt fuer dieselbe Erkrankung teils zwei Schluessel - "dcm-dobermann" und
     * "dcm-doberman" unterscheiden sich um ein einziges "n", "hcm-rasse" und "hcm-cat" gar
     * nicht inhaltlich. Ein Dobermann traegt beide DCM-Schluessel; ohne diese Zusammenlegung
     * stuenden zwei fast gleichlautende Kaesten untereinander, und eine Britisch Kurzhaar
     * bekaeme drei HCM-Eintraege.
     *
     * Das ist nicht nur unschoen: die Forderung an diesen Befundteil lautet, NUR zu zeigen,
     * wo wirklich etwas ist. Wer dreimal dasselbe liest, liest beim vierten Kasten nicht mehr.
     * Behalten wird der Eintrag mit dem kleinsten "rang" - also der genaueste.
     * ========================================================================================== */
    var beiThema = {}, gefiltert = [];
    for (i = 0; i < out.praedispositionen.length; i++) {
      var e2 = out.praedispositionen[i];
      if (!e2.thema) { gefiltert.push(e2); continue; }
      var alt = beiThema[e2.thema];
      if (!alt) { beiThema[e2.thema] = e2; gefiltert.push(e2); continue; }
      if ((e2.rang || 9) < (alt.rang || 9)) {
        gefiltert[gefiltert.indexOf(alt)] = e2;
        beiThema[e2.thema] = e2;
      }
    }
    out.praedispositionen = gefiltert;

    /* Reihenfolge: was das EKG zeigen kann, zuerst - und darin das Wichtige zuerst.
     * Ein Eintrag, zu dem das EKG nichts beitraegt, gehoert nicht an den Anfang der Liste. */
    var rang = { wichtig: 0, beachten: 1, hintergrund: 2 };
    out.praedispositionen.sort(function (a, z) {
      if (a.ekgSichtbar !== z.ekgSichtbar) return a.ekgSichtbar ? -1 : 1;
      return (rang[a.stufe] || 3) - (rang[z.stufe] || 3);
    });

    /* DIE ART MUSS PASSEN. Die Gruppe "brachy" enthaelt auch Perser und Britisch Kurzhaar -
     * die Aussage ueber den hohen Vagotonus und die atemabhaengige Sinusarrhythmie ist aber
     * eine HUNDE-Aussage. Bei der Katze ist eine ausgepraegte Sinusarrhythmie gerade NICHT
     * die Regel; sie dort als normal auszugeben, waere ein weggeredeter Befund. */
    for (i = 0; i < GRUPPEN.length; i++) {
      var g = GRUPPEN[i];
      if ((b.groups || []).indexOf(g.gruppe) < 0) continue;
      if (g.arten && g.arten.length && g.arten.indexOf(b.sp) < 0) continue;
      out.normvarianten.push(g);
    }
    return out;
  }

  /* Welche Rassen einer Art tragen ueberhaupt eine hinterlegte Herzbedingung?
   * Fuer die Uebersicht im Nachschlageteil - und um im Test zu pruefen, dass die
   * Schluessel dieser Datei im Katalog wirklich vorkommen. */
  function rassenMitHerz(VB, sp) {
    if (!VB || !VB.BREEDS) return [];
    var ix = ixSchicht();
    return VB.BREEDS.filter(function (b) {
      if (sp && b.sp !== sp) return false;
      return (b.conditions || []).some(function (c) { return !!ix[c]; });
    });
  }

  return {
    SCHICHT: SCHICHT, GRUPPEN: GRUPPEN, OHNE_SCHICHT: OHNE_SCHICHT,
    hatHerz: hatHerz, fuerPatient: fuerPatient, rassenMitHerz: rassenMitHerz,
    schluessel: function () { return SCHICHT.map(function (s) { return s.schluessel; }); }
  };
}));
