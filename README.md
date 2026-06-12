# VET-PHARM · Canis — Änderungen & Anleitung

Verbesserte Version deiner App (drei Module: **Canis Metabolica**, **Canis Hæmatica**,
**Canis Reise**). Die bestehende Logik, die Karten, das Hundebild und die Daten wurden
**nicht verändert** – alle Neuerungen sind additiv über zwei gemeinsame Dateien gelöst.

## Was ist neu

1. **Heller „Liquid-Glass"-Modus (Apple-2026-Stil)** zusätzlich zum bestehenden dunklen Modus.
   - Umschalter (☾ / ☀︎) oben rechts in jeder Ansicht, auf Handy und PC.
   - Auswahl wird gespeichert (`localStorage`). **Standard ist jetzt der helle Glass-Modus**;
     der Dunkelmodus (das Originaldesign) ist per Schalter erreichbar und blieb unangetastet.
   - Die zentralen Visualisierungen (Stoffwechsel-Karte, Hundebild/Anatomie, 3D, Welt-/Europakarte)
     bleiben in **beiden** Modi dunkel und unverändert – nur der Rahmen (Header, Menüs, Karten-Panels,
     Seitenleisten) wird im Hellmodus zu mattem Glas.
2. **Ein einziges, identisches Menü auf allen Seiten.** Header bekommt überall denselben Menü-Button
   und Theme-Schalter; das Menü listet **Metabolica · Hæmatica · Reise · Startseite** plus
   „Zusammenhang & Schnellzugriff"-Querverweise. Native Einzelmenüs wurden ausgeblendet, damit überall
   das gleiche aussieht.
3. **Karte korrigiert (Reise-Modul).**
   - Alle Länderpunkte wurden mit einem Prozent-Raster direkt auf den echten Karten neu vermessen.
     **Deutschland** sitzt jetzt mittig in Deutschland – Europa `[38,49]`, **Welt** `[47,28]`
     (vorher in der Welt-Karte fälschlich im Atlantik bei `[50,33]`/`[44,28]`).
   - Die **Routen-Animationen** nach Deutschland sind deutlich **dünner** (Linienstärke 2.8 → 0.7).

## Dateien

| Datei | Zweck |
|---|---|
| `shared/glass.css` | Kompletter heller Glass-Modus (nur aktiv bei `html[data-theme="light"]`; Dunkelmodus unverändert). |
| `shared/vetpharm-ui.js` | Fügt jeder Seite den Hell/Dunkel-Schalter hinzu, ergänzt den fehlenden Reise-Link im Menü und baut auf Start-/Reise-Seite ein passendes Menü. |
| `index.html` | Startseite – nur 2 Zeilen ergänzt (CSS + JS einbinden). |
| `canis-*/index.html` | Je 2 Zeilen ergänzt (CSS + JS). Reise zusätzlich: Karten-Koordinaten + dünnere Routen. |

## In dein GitHub-Repo übernehmen

Diese Dateien entsprechen 1:1 deiner Repo-Struktur (`canis-metabolica/`, `canis-haematica/`,
`canis-reise/`, plus neuer Ordner `shared/`). Lade den Ordner herunter und kopiere den Inhalt in dein
`VET-PHARM`-Repo, dann committen & pushen (`git add . && git commit -m "Heller Glass-Modus + Menü + Karte" && git push`).
