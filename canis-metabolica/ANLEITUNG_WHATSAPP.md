# Canis Metabolica in WhatsApp teilen

Diese App ist eine statische Web-App. WhatsApp kann sie nicht als native App direkt in den Chat einbetten, aber WhatsApp öffnet einen HTTPS-Link im In-App-Browser auf Android und iPhone.

## Schnellster Weg

1. Lade den ganzen Ordner `canis-metabolica-whatsapp` zu einem kostenlosen Hoster hoch:
   - GitHub Pages
   - Netlify
   - Cloudflare Pages
2. Öffne die veröffentlichte HTTPS-Adresse auf dem Handy.
3. Tippe in der App auf `Teilen`.
4. Wähle WhatsApp und sende den Link an die Kollegen.

## In diesem GitHub-Repo

Die App wurde nach `quziboevmanuchehr/VET-PHARM` in den Ordner `canis-metabolica/` gepusht.

Damit der WhatsApp-Link live wird:

1. Öffne `https://github.com/quziboevmanuchehr/VET-PHARM/settings/pages`.
2. Stelle `Build and deployment` auf `Deploy from a branch`.
3. Wähle Branch `main` und Ordner `/ (root)`.
4. Speichern und 1-3 Minuten warten.
5. Danach ist die App hier erreichbar:
   `https://quziboevmanuchehr.github.io/VET-PHARM/canis-metabolica/`

## Wichtig

- Ein lokaler `file://` Link funktioniert bei Kollegen nicht zuverlässig, weil er nur auf deinem Computer existiert.
- Nach dem Hosting kann die App auf Android und iPhone im Browser laufen.
- Android/Chrome kann sie als PWA installieren. iPhone/Safari kann sie über `Teilen` -> `Zum Home-Bildschirm` speichern.

## Wissenschaftlicher Hinweis

Die Karte ist eine deutschsprachige, didaktisch verdichtete Übersicht auf Basis von KEGG cfa01100, Reactome Canis familiaris und Roche/Expasy Biochemical Pathways. Sie ersetzt keine vollständige Datenbankauswertung und keine veterinärmedizinische Diagnostik.
