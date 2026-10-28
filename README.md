# FFW Schmogrow – Löschwasserkarte auf GitHub Pages

Einmalige Einrichtung (geht auch am Handy im Browser):

1. github.com → **New repository**. Name z. B. `loeschwasser`, **Public**, ohne README anlegen.
2. **uploading an existing file**: diese 5 Dateien hochladen und mit **Commit** speichern:
   `index.html`, `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`
3. **Add file → Create new file**. Als Dateiname genau `.github/workflows/pages.yml` eintippen (die Schrägstriche legen die Ordner an). Den Inhalt der mitgelieferten `pages.yml` einfügen, **Commit**.
4. **Settings → Pages → Source: GitHub Actions**.
5. **Actions → „Punkte aktualisieren und veröffentlichen“ → Run workflow**. Nach einigen Minuten ist die Seite online, danach läuft es jede Nacht automatisch.
6. Adresse: `https://DEIN-NAME.github.io/loeschwasser/` – im Handy-Browser öffnen und „Zum Startbildschirm hinzufügen“.

Hinweise
- Die Datei `points.json` entsteht beim ersten Lauf im Repository. Schlägt ein nächtlicher Abruf fehl, bleibt die letzte gute Liste online.
- Das Repository ist öffentlich, damit Pages kostenlos läuft. Der Web3Forms-Key in `index.html` ist dadurch öffentlich sichtbar. Das ist bei diesem Dienst vorgesehen, er verrät die Mailadresse nicht.
- Neue Version der App: `index.html` im Repository öffnen, Stift-Symbol, Inhalt ersetzen, Commit.
- GitHub schaltet geplante Läufe nach 60 Tagen ohne Aktivität ab. Die tägliche Aktualisierung von `points.json` zählt als Aktivität.
