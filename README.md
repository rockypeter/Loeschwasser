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

## Weitere Feuerwehren im Amt Burg

Alle Wehren öffnen dieselbe Adresse und wählen beim ersten Start ihre Feuerwehr. Die Liste steht in `wehren.json`.

- `ortsteile`: Nur Stellen in diesen Ortsteilen sind bearbeitbar. Erlaubt sind Briesen, Burg, Burg-Kauper, Dissen, Fehrow, Guhrow, Müschen, Ruben, Schmogrow (mit Saccasne), Striesow, Werben (mit Brahmow). Guhrow gehört zur FFW Briesen.
- `gps`: `true` heißt, bearbeiten geht nur, wenn das Handy höchstens 150 m von der Stelle entfernt ist. Zum Testen am Schreibtisch kurz auf `false` setzen.
- `reportKey`: Web3Forms-Key der Wehr für ihren eigenen Bericht. Ohne Key fragt die App nach der Mailadresse und öffnet das Mailprogramm.
- `start`: optional, `[Breite, Länge]` des Gerätehauses, z. B. `[51.85, 14.21]`. Ohne Angabe startet die Karte in der Mitte der eigenen Stellen.
- `logo`: optional, Pfad zur Wappen-Datei, z. B. `logos/burg.png` (Datei im Ordner `logos` hochladen).
- `aktiv`: `false` blendet eine Wehr aus.
- `zentral`: Die Zentrale (Schmogrow) bekommt Meldungen neuer Stellen der anderen Wehren per E-Mail. Diese Wehr sendet selbst nur OSM-Notizen.

Änderungen an `wehren.json` sind nach dem nächsten Lauf für alle da. Die Datei wird beim Start geladen, ein Neustart der App genügt.
