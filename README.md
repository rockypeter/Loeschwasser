# Löschwasserkarte der Feuerwehren im Amt Burg

Web-App für Handy und Tablet: Löschwasserstellen auf der Karte, Erfassen und Prüfen, Prüfprotokoll für Flachspiegelbrunnen.
Läuft im Browser, lässt sich zum Startbildschirm hinzufügen und bleibt ohne Netz benutzbar. Die Oberfläche ist hell und
kontrastreich für draußen (Menü → Werkzeuge → Darstellung: Normal, Hochkontrast, Dunkel).

## Karte
- Stellen aus OpenStreetMap, jede Nacht aktualisiert. Farbe und Buchstabe zeigen die Art (U, Ü, F, T, Z, L).
- Legende antippen blendet eine Art aus oder ein. Punkte außerhalb des Amts erscheinen klein und blass.
- Ring um Flachspiegelbrunnen: **grün** = im aktuellen Durchgang geprüft, **orange** = offen (pulsiert, abschaltbar im Menü).
- Tipp auf eine Stelle öffnet ein Info-Blatt mit Angaben, Steckbrief (Leistungsverlauf, Foto, Zufahrt) und Route.
- Schalter rechts: Ortung, Neu laden, Einsatzmodus (nur Schmogrow), Leistung (nach l/min oder Änderung zum Vorjahr),
  Versorgung (300-m-Kreise), Karte/Luftbild.
- Menü → Karte offline laden speichert die OSM-Karte der eigenen Ortsteile (einmal im WLAN).

## Zuständigkeit
Beim ersten Start wählt jede Wehr ihre Feuerwehr. Bearbeiten geht nur in den eigenen Ortsteilen und höchstens 150 m von der
Stelle entfernt (Prüfung im Browser, kein Ersatz für organisatorische Kontrolle). Alles andere ist „nur Ansicht“.

## Erfassen und melden
Neue Stellen anlegen oder bestehende prüfen (Art, Nennweite, Ertrag, Zustand, Hinweis, Foto). Die Meldung geht per E-Mail an
die Zentrale (FFW Schmogrow) und als OSM-Notiz; ohne Netz wird sie gespeichert und später gesendet. Der Tagesbericht geht
höchstens einmal täglich. Alle Änderungen stehen im Änderungsprotokoll (Menü).

## Prüfprotokoll Flachspiegelbrunnen
Menü → Prüfprotokolle → Ortsteil. Am Handy eine Karte pro Brunnen (Wischen oder Pfeile), am Tablet die ganze Tabelle.

- **Prüfdurchgänge:** Frühjahr (März bis Juni) und Herbst (September bis November) zählen getrennt. In dieser Zeit erscheint
  oben „Prüfung fällig“, solange eigene Brunnen offen sind (pro Tag einmal wegklickbar).
- **Felder:** Datum und Prüfer füllen sich selbst. Pumpe und Aufbau (bis 3 Strahlrohre) lassen sich vom Vorjahr per Tipp
  übernehmen. Die Leistung wird aus Aufbau und Ausgangsdruck berechnet und ist von Hand korrigierbar.
  Eingangsdruck ist bei Brunnen immer negativ.
- **Zeit:** Stoppuhr je Brunnen (Start/Stopp trägt die Prüfzeit ein), dazu eine globale Stoppuhr mit Zielzeit-Signal.
- **Mehr:** Hinter „Mehr“ (je Brunnen und in der Werkzeugleiste) liegen Steckbrief, „Ich prüfe diesen“, Sprachein­gabe,
  Namens-Schnelltasten, CSV, E-Mail, Sortierung nach Entfernung und Zusammenfassung.
- **Vorjahre:** Graue Zahlen zeigen die letzte Messung, Trendpfeil und Diagramm den Verlauf. Beim ersten Eintrag im neuen
  Jahr wandern die alten Werte in die Historie.
- **Hinweise:** Auffällige Werte werden orange markiert, eingetragen werden kann trotzdem alles.
- **Drucken:** „Drucken / PDF“ mit Briefkopf und Unterschriftszeile (Unterschrift mit dem Finger, bleibt auf dem Gerät).
  Menü → Listen und Karten → **Leeres Prüfformular (Papier)** druckt ein leeres Formular, wahlweise mit der Brunnenliste
  des Ortsteils.

### Berechnung der Leistung
Nennwerte bei 5 bar: B mit Mundstück 400, B ohne 800, C mit 100, C ohne 200 l/min. Bei anderem Druck gilt
`Q = Nennwert × √(Druck ÷ 5)`, als Druck zählt der Ausgangsdruck. Strahlrohre werden addiert, „Sonstiges“ unverändert.
Richtwert für die Färbung: 800 l/min.

## Sync zwischen den Trupps
Menü → Protokoll-Sync, einmal mit dem Passwort der Wehr anmelden (läuft nach 12 Stunden ab). Danach erscheinen Eingaben
anderer Trupps sofort, jede Zelle wird einzeln gespeichert (gleiche Zelle: letzte Änderung gilt). „Anderes Gerät prüft
gerade“ verhindert Doppelarbeit. Offline Erfasstes wird später hochgeladen, Fotos bleiben auf dem Gerät. Ein gelbes Band
warnt, wenn Eingaben nur lokal liegen.

## Sicherheit und Sicherung
- **Systemcheck** (Menü → Technik) prüft Wehr, Netz, Version, Sync, wartende Änderungen, Standort, Karte, Speicher, Sicherung.
- **Sicherung:** Die App legt selbst die letzten fünf Stände auf dem Gerät ab (Menü → Automatische Sicherungen).
  Dazu Sicherung als Datei speichern und einspielen (ohne Fotos und Unterschrift). Die Datei enthält Prüfernamen und
  Koordinaten und gehört nicht ins Repository (steht in `.gitignore`).
- **Datenschutz:** Menü → Hilfe → Datenschutz beschreibt die Datenwege. Ansprechperson und Rechtsgrundlage muss die
  Wehrführung ergänzen. Mail-Berichte laufen über Web3Forms, Diktieren über den Browser (Chrome: Google).
- Die Datenbankregeln liegen in `database.rules.json` (Zugriff nur mit Anmeldung, Prüfung der Formate, Zeitstempel vom Server).

## Technik und Einrichtung
- Statische Seite auf GitHub Pages. Der Workflow `.github/workflows/pages.yml` holt nachts die Punkte von Overpass und
  baut Tailwind, Leaflet, FontAwesome und QR-Bibliothek lokal (`build/package.json`, optional mit `package-lock.json`).
- Firebase und Zugangsdaten: siehe `FIREBASE-SETUP.md`. Die Konfiguration kommt aus dem GitHub-Secret `FIREBASE_CONFIG`.
- Wehren, Ortsteile und Berichtsschlüssel stehen in `wehren.json`.
- Bei Problemen: Menü → Technik → Systemcheck, Server testen oder App neu laden. Fehler und Ideen lassen sich über
  „Fehler oder Idee melden“ schicken.

Stellendaten © OpenStreetMap-Mitwirkende, Luftbild © GeoBasis-DE/LGB.
