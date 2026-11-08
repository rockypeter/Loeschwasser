# Gemeinsames Prüfprotokoll (Firebase) einrichten

Einmalig, geht komplett im Browser. Die Zugangsdaten stehen danach **nicht im Repository**,
sondern nur als GitHub-Secret. Auf der fertigen Seite sind sie technisch bedingt trotzdem abrufbar
(das ist bei Firebase so vorgesehen). Geschützt sind die Daten durch PIN-Anmeldung und die Regeln unten.

## 1. Firebase-Konsole
1. **Authentication → Anmeldemethode → E-Mail/Passwort** aktivieren.
2. **Authentication → Nutzer → Nutzer hinzufügen**, je Feuerwehr ein Konto:
   E-Mail `<id>@ffw-loeschwasser.de`, Passwort = PIN (mindestens 6 Zeichen, besser 8).
   IDs: `briesen`, `burg`, `burg-kauper`, `dissen`, `fehrow`, `mueschen`, `ruben`, `schmogrow`, `striesow`, `werben`
   (Es werden keine E-Mails verschickt, die Adressen müssen nicht existieren.)
3. **Realtime Database → Regeln**: Inhalt von `database.rules.json` einfügen, **Veröffentlichen**.
4. **Realtime Database → Daten**: beim Wurzelknoten das Menü (⋮) öffnen → **JSON importieren** → `zugang.json`.
   Danach liegt der Knoten `zugang` mit den Ortsteilen jeder Wehr in der Datenbank.
   (Neuer Ortsteil für eine Wehr = dort eine Zeile `"Name": true` ergänzen.)

## 2. GitHub
1. **Settings → Secrets and variables → Actions → New repository secret**
   Name `FIREBASE_CONFIG`, Wert = die Konfiguration als JSON, z. B.
   `{"apiKey":"…","authDomain":"…","databaseURL":"…","projectId":"…","appId":"…"}`
   (Firebase → Projekteinstellungen → Web-App. Anführungszeichen um die Schlüsselnamen nicht vergessen.)
2. Im Repository ersetzen bzw. hinzufügen: `index.html`, `sw.js`, `fb-sync.js`, `.github/workflows/pages.yml`.
3. **Actions → Run workflow**. Im Lauf muss „firebase-config.js erzeugt“ stehen.

## 3. Schlüssel einschränken (empfohlen)
Google Cloud Console → APIs & Dienste → Anmeldedaten → Browser-Schlüssel → **HTTP-Referrer** `https://rockypeter.github.io/*`.
Optional: Firebase App Check aktivieren.

## So arbeiten die Trupps
Menü → **Protokoll-Sync (PIN)** → einmal PIN eingeben, das Gerät bleibt angemeldet.
Im Protokoll zeigt der Knopf oben den Zustand (live / wartet / nur eigene Ortsteile).
Jede Zelle wird einzeln gespeichert; Änderungen anderer Trupps erscheinen sofort. Offline Erfasstes wird
beim nächsten Verbinden hochgeladen. Gedruckt wird der gemeinsame Stand („Drucken / PDF“).
Fotos bleiben auf dem jeweiligen Gerät.

## Nach Updates: Regeln neu veröffentlichen
Wenn sich `database.rules.json` ändert (zuletzt für Anmerkung, Anwesenheit und „Wird gerade geprüft“), den Inhalt in Realtime Database → Regeln
einfügen und **Veröffentlichen**. Ohne die neuen Regeln läuft der Sync weiter, nur die Historie wird nicht zwischen den
Geräten abgeglichen.
