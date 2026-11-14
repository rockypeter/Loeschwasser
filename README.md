# Löschwasserkarte der Feuerwehren im Amt Burg

Web-App für Handy und Tablet. Sie zeigt die Löschwasserentnahmestellen auf einer Karte, hilft beim Erfassen und Prüfen
und führt das Prüfprotokoll für Flachspiegelbrunnen. Sie läuft im Browser und lässt sich zum Startbildschirm hinzufügen.
Ohne Netz bleibt sie benutzbar. Die Oberfläche ist hell und kontrastreich, damit sie draußen im Sonnenlicht lesbar bleibt.

## Karte und Stellen
- Die Stellen kommen aus OpenStreetMap und werden jede Nacht automatisch aktualisiert. Farben zeigen die Art:
  Unterflurhydrant, Überflurhydrant, Flachspiegelbrunnen, Tiefbrunnen, Zisterne/Tank, Löschteich/Saugstelle.
- **Legende als Filter:** Eine Art in der Legende antippen blendet sie aus oder wieder ein. Die Auswahl bleibt gespeichert.
- Punkte außerhalb des Amts (ohne Ortsteil) erscheinen klein und blass. Flachspiegelbrunnen bleiben immer voll sichtbar.
- Bei Flachspiegelbrunnen zeigt ein Ring den Prüfstand: **grün** = dieses Jahr geprüft, **orange** = noch offen.
- Beim Antippen einer Stelle erscheinen ihre Daten und der Prüfstatus.
- **Info-Blatt:** Ein Tipp auf eine Stelle öffnet die Angaben als Blatt von unten mit großen Knöpfen. Ein Tipp auf die Karte oder ✕ schließt es.
- **Prüftag:** Im Protokoll sortiert „Nach Entfernung“ die Brunnen nach dem Abstand zu dir (und zeigt ihn an). Zu jedem Brunnen gibt es eine eigene Stoppuhr (Start/Stopp trägt die Zeit ein). „Zusammenfassung“ zeigt geprüft/offen, Durchschnitt, niedrigste und höchste Leistung, Brunnen unter 800 l/min und Anmerkungen. Sie öffnet sich von selbst, wenn der letzte Brunnen des Ortsteils geprüft ist, und bietet Drucken, CSV und E-Mail an.
- **Foto direkt am Brunnen:** Im Info-Blatt und im Steckbrief öffnet „Foto aufnehmen“ die Kamera. Das Foto bekommt einen Zeitstempel und gehört gleich zum Brunnen.
- **Zuletzt angesehen:** Im Einsatzmodus stehen die letzten fünf angesehenen Stellen oben als Schnellwahl.
- **Karte „Änderung zum Vorjahr“:** Der Leistungsknopf (Tachometer) schaltet durch: aus, Leistung in l/min, Änderung zum Vorjahr in Prozent (grün ab +10 %, rot ab −10 %).
- **Akku und Speicher:** Unter 15 % Akku (ohne Laden) oder bei fast vollem Speicher erscheint ein roter Hinweis mit „Jetzt sichern“.
- **Tastenkürzel (Laptop/Tablet):** Alt+Pfeil rechts/links blättert durch die Brunnen, Alt+S Stoppuhr, Alt+P drucken, Esc schließt das oberste Fenster.
- **Zufahrtshinweis im Sync:** Der Hinweis im Steckbrief wird mit den Trupps der Wehr geteilt (nur eigene Ortsteile).
- **Kurzeinführung:** Beim ersten Start gibt es einen Rundgang in vier Schritten (auch später über Menü → Hilfe → Kurzeinführung). Nach einem Update erscheint einmal „Neu in der App“ mit den Änderungen.
- **Zahlen per Sprache:** Unter Prüfzeit, Leistung und den Drücken gibt es einen Mikrofon-Knopf. Tippen, Zahl sagen („fünf Komma fünf“, „minus null Komma sieben fünf“, „achthundert fünfundneunzig“), die App trägt sie ein. Braucht Netz und Mikrofon-Erlaubnis, die Erkennung übernimmt der Browser (bei Chrome Google).
- **Wasser im Umkreis:** Der Einsatzmodus zeigt oben die Summe der bekannten Leistung aller einsatzbereiten Stellen im Umkreis von 300 m, eingefärbt gegen den Richtwert 800 l/min, plus Vorrat in Behältern und Teichen.
- **Briefkopf im Ausdruck:** Das gedruckte Protokoll beginnt mit Logo, „Freiwillige Feuerwehr … im Amt Burg (Spreewald)“, „BRUNNENPRÜFPROTOKOLL vom (häufigstes Prüfdatum)“ und dem Ortsteil.
- **Steckbrief je Brunnen:** Im Info-Blatt und im Protokoll („Steckbrief“) stehen Leistung, Trend, Verlauf über die Jahre, Anmerkung, letztes Foto, Route und ein eigener Zufahrtshinweis (bleibt auf dem Gerät und in der Sicherung).
- **Prüfernamen als Schnelltasten:** Unter dem Namensfeld stehen die zuletzt benutzten Namen. Ein Tipp trägt den Namen ein, × entfernt ihn aus der Liste.
- **Zurück-Taste (Android):** Sie schließt zuerst das offene Fenster, Menü oder Info-Blatt. Ist nichts offen, erscheint „Zum Beenden nochmal zurück“, und erst ein zweites Zurück beendet die App. Beim Erfassungsformular fragt die App vorher nach.
- **Untere Leiste (Handy):** Bei schmalem Bildschirm liegen unten die vier wichtigsten Knöpfe: Protokoll (öffnet den ersten Ortsteil der eigenen Wehr), Einsatz (nur wo freigeschaltet), Erfassen und Menü. Auf Tablet und Laptop bleiben die Knöpfe oben.
- **Marker beim Zoomen:** Je weiter man hineinzoomt, desto kleiner werden Marker und Ringe (22 px bei weiter Sicht, 12 px ab Zoom 20), damit sie Gebäude und Wege nicht verdecken. Ab Zoom 20 stehen keine Buchstaben mehr in den Markern, nur Punkte.
- **Symbole in den Markern:** Ab Zoom 16 steht ein Buchstabe im Marker, damit die Art auch ohne Farbe erkennbar ist: U Unterflurhydrant, Ü Überflurhydrant, F Flachspiegelbrunnen, T Tiefbrunnen, Z Zisterne/Tank, L Löschteich/Saugstelle. Die Legende zeigt dieselben Buchstaben.
- **Beschriftung:** Ab Zoomstufe 18 steht neben den Punkten im Amt die Ortsangabe (oder Referenz/Name).
- **Darstellung:** Menü → Werkzeuge → Darstellung schaltet zwischen Normal, Hochkontrast (schwarze Ränder und Schrift, für pralle Sonne) und Dunkel (für abends). Der Druck bleibt immer hell.
- **Offene Brunnen pulsieren:** Flachspiegelbrunnen deines Ortsteils, die dieses Jahr noch nicht geprüft sind, blinken am Ring langsam. Sobald ein Wert eingetragen ist, hört es auf. Abschaltbar unter Menü → Werkzeuge → Offene Brunnen hervorheben (auch aus bei „Bewegung reduzieren“ am Handy).
- **Legende anklickbar:** Eine Art antippen blendet sie aus oder wieder ein. Die Auswahl bleibt auf dem Gerät gespeichert.
- **Punkte außerhalb des Amts Burg** (Nachbargemeinden) erscheinen kleiner und blasser, Flachspiegelbrunnen bleiben immer voll sichtbar.
- **Update-Hinweis:** Gibt es eine neue App-Version, erscheint oben ein gelber Balken „Neue Version verfügbar“. Die App prüft beim Öffnen und alle zehn Minuten.
- **Karte offline:** Menü → Karte für eigene Ortsteile offline laden. Das speichert die OSM-Straßenkarte der eigenen Ortsteile
  (Zoom 15 bis 18, höchstens 900 Kacheln) auf dem Gerät. Am besten einmal im WLAN. Das Luftbild wird nicht gespeichert.
- Die Liste mit Karte (A4) lässt sich pro Ortsteil oder für alle drucken oder als CSV speichern.

## Ansichten auf der Karte
Rechts neben der Karte liegen die Schalter:
- **Leistung (Tachometer):** Flachspiegel- und Tiefbrunnen werden nach der letzten gemessenen Leistung eingefärbt, mit der Zahl im Marker.
  Grün ab 800 l/min (Richtwert), gelb 400 bis 799, rot darunter, grau = noch nicht gemessen.
- **Versorgung (Zielscheibe):** Um jede einsatzbereite Stelle liegt ein grüner Kreis von 300 m. Wo die Karte ungefärbt bleibt, gibt es
  keine Löschwasserstelle in Reichweite.
- **Einsatzmodus (Flamme, zunächst nur bei der FFW Schmogrow sichtbar; für weitere Wehren in `wehren.json` bei der Wehr `"einsatz": true` ergänzen):** zeigt die sechs nächsten einsatzbereiten Stellen zum eigenen Standort oder zu
  einem auf der Karte gewählten Ort, mit Entfernung, Richtung, Leistung, Nennweite und Routenlink. Ist die nächste Stelle weiter als 300 m
  entfernt, erscheint ein Hinweis. Funktioniert auch ohne Netz.
- **Trockenjahr-Übersicht:** Menü → Listen und Karten. Zeigt die Durchschnittsleistung aller Brunnen je Jahr als Diagramm, die Zahl der
  Brunnen unter 800 l/min und die Veränderung zum Vorjahr (nur Brunnen, die in beiden Jahren gemessen wurden).
  Es zählen die Messungen, die auf diesem Gerät vorliegen.

## Feuerwehr und Zuständigkeit
- Beim ersten Start wählt jede Wehr ihre Feuerwehr. Bearbeiten lassen sich nur Stellen in den eigenen Ortsteilen,
  die übrigen sind „nur Ansicht“.
- Bearbeiten ist nur möglich, wenn das Gerät höchstens 150 m von der Stelle entfernt ist.

## Stellen erfassen und melden
- Neue Stellen anlegen oder bestehende Stellen prüfen: Typ, Nennweite, Ertrag, einsatzbereit/eingeschränkt/defekt,
  Hinweis, Foto.
- Die Meldung geht als OSM-Notiz an OpenStreetMap. Ohne Netz wird sie gespeichert und später gesendet.
- Meldungen anderer Wehren bekommt zusätzlich die Zentrale (FFW Schmogrow) per E-Mail.
- Alle Änderungen stehen im **Änderungsprotokoll** (Menü), mit Zeit, Wehr, Prüfer und Abstand zur Stelle.

## Prüfprotokoll Flachspiegelbrunnen
Menü → Prüfprotokolle → Ortsteil. Pro Brunnen eine Zeile:

| Spalte | Inhalt |
|---|---|
| Brunnen / Ortsangabe | Bezeichnung, eigene Ortsangabe (z. B. „Wendeplatz“), Koordinaten |
| Datum, Prüfer | Werden beim ersten Eintrag automatisch gesetzt |
| Pumpe | Magirus TS, Ziegler TS, Fahrzeugpumpe oder Andere (Freitext) |
| Aufbau | Bis zu 3 Strahlrohre: B oder C, jeweils mit oder ohne Mundstück, oder „Sonstiges“ mit eigener Leistung in l/min |
| Prüfzeit (min) | Dauer der Prüfung. Der Knopf „übernehmen“ trägt die Zeit der Stoppuhr ein (auf 0,5 min gerundet) |
| Leistung (l/min) | Wird automatisch berechnet, kann von Hand korrigiert werden |
| Eingangsdruck (bar) | Bei Brunnen immer negativ (Unterdruck). Positive Eingaben werden automatisch negativ. Unter −1 bar erscheint eine Warnung. |
| Ausgangsdruck (bar) | Druck am Pumpenausgang |
| Anmerkung | Freitext je Brunnen, z. B. Mängel (bis 300 Zeichen). Wird synchronisiert, gedruckt, in der CSV und in der Sicherung gespeichert und wandert mit der Historie ins nächste Jahr |
| Foto | Zum Brunnen, bleibt auf dem Gerät. Unten im Bild stehen Brunnen, Ortsangabe, Datum und Uhrzeit |

**Vorjahreswerte:** Ist die Zeile für das neue Jahr noch leer, stehen die Werte der letzten Messung als graue Zahlen in den Feldern
Prüfzeit, Leistung, Eingangs- und Ausgangsdruck (beim Drucken unsichtbar). Ein grauer Knopf „Wie 2025: …“ in der Aufbau-Zelle
übernimmt Pumpe und Strahlrohre vom Vorjahr.

**Am Handy:** Bei schmalem Bildschirm zeigt das Protokoll eine Karte pro Brunnen statt der breiten Tabelle. Oben stehen Pfeile (oder Wischen nach links und rechts) und der Fortschritt („Brunnen 3 von 9 · 5 geprüft“). Die Karte öffnet sich beim ersten noch nicht geprüften Brunnen. Bei Prüfzeit und den beiden Drücken gibt es −/+-Tasten, und jede Eingabe bestätigt die App mit grünem Rahmen und kurzem Vibrieren. Tablets und Drucke zeigen weiter die ganze Tabelle.

**Berechnung der Leistung:** Nennwerte bei 5 bar Strahlrohrdruck: B mit Mundstück 400, B ohne Mundstück 800,
C mit Mundstück 100, C ohne Mundstück 200 l/min. Bei anderem Druck gilt
`Q = Nennwert × √(Druck ÷ 5)`. Als Druck gilt der Ausgangsdruck. Mehrere Strahlrohre werden addiert, „Sonstiges“
wird unverändert dazugezählt. Unter der Leistung steht die Wassermenge aus Leistung und Prüfzeit.

**Verlauf über die Jahre:** Ein Tipp auf Nummer oder Namen des Brunnens zeigt ein Diagramm der Leistung je Jahr
mit Wertetabelle. Unter der Leistung steht ein Trendpfeil gegenüber der letzten Messung: ↑ ab +10 %, ↓ ab −10 %,
dazwischen →. Beim ersten Eintrag in einem neuen Jahr werden die Werte des Vorjahres automatisch in die Historie des
Brunnens übernommen, die Zeile ist dann für das neue Jahr leer. Die Historie wird mit gesichert und zwischen den Trupps
synchronisiert.

**Plausibilitätshinweise:** Auffällige Werte (z. B. Ausgangsdruck über 12 bar, Eingangsdruck unter −0,8 bar, Leistung
weicht mehr als 25 % vom berechneten Wert ab) werden orange markiert. Eintragen lässt sich trotzdem alles.

Das Protokoll lässt sich drucken (PDF), als CSV speichern oder per E-Mail sichern. „Standort prüfen“ aktualisiert
die Entfernung zu den Brunnen, die Stoppuhr hilft bei der Prüfzeit.

## Gemeinsames Protokoll (Sync)
- Mehrere Trupps einer Feuerwehr können im selben Ortsteil gleichzeitig arbeiten. Die Anmeldung erfolgt einmal pro Gerät
  mit der PIN der Feuerwehr (Menü → Protokoll-Sync).
- Jede Zelle wird einzeln gespeichert, Änderungen erscheinen bei den anderen Trupps sofort. Am Ende druckt oder speichert
  ein Gerät das vollständige Protokoll.
- **Wird gerade geprüft:** Im Protokoll zeigt „Ich prüfe diesen“ den anderen Trupps, dass der Brunnen belegt ist („Anderes Gerät prüft gerade“, gelb) und der Brunnen bekommt einen gestrichelten Ring auf der Karte. Das setzt sich auch automatisch, sobald jemand in der Zeile etwas einträgt, und löst sich, wenn die Leistung steht, mit „Fertig, freigeben“ oder wenn das Gerät die Verbindung verliert (oder nach 20 Minuten).
- **Hinweisband „nur auf diesem Gerät“:** Wenn der Sync nicht live ist, zeigt das Protokoll oben ein gelbes Band. Der Sync-Knopf zeigt die Uhrzeit des letzten Abgleichs.
- **Schriftgröße:** Menü → Werkzeuge → Schriftgröße schaltet zwischen normal, groß und sehr groß.
- **Anwesenheit:** Unten links steht, wie viele Geräte gerade die App geöffnet haben (eigene Wehr und im ganzen Amt). Es wird nur eine zufällige Gerätekennung gespeichert, keine Namen, und sie verschwindet beim Schließen der App.
- Der Knopf oben im Protokoll zeigt den Zustand: live, wartet (offline) oder nicht angemeldet.
- Wenn der Sync nicht läuft: Menü → Technik zeigt eine Zeile „Sync“ mit Konfiguration, Konto, Verbindung und blockierten Adressen.
- Offline Erfasstes wird beim nächsten Verbinden hochgeladen. Wird dieselbe Zelle von zwei Trupps geändert, gilt die
  letzte Änderung. Fotos werden nicht synchronisiert.

## Tagesbericht
- Die App sendet höchstens einmal pro Tag automatisch einen Bericht per E-Mail, und nur wenn Stellen neu erfasst oder
  geändert wurden. Prüfprotokoll-Einträge, Fotos und Sicherungen lösen keinen Bericht aus.
- Im Sende-Fenster lässt sich der Bericht jederzeit von Hand senden.

## Sicherheit und Kontrolle
- **Systemcheck:** Menü → Technik → Systemcheck prüft mit einem Tipp Feuerwehr, Internet, App-Version, Sync, wartende Änderungen, ungesendete Erfassungen, Standort, Punkte, Offline-Karte, Offline-Modus, Speicher und die letzte Sicherung. Grün = in Ordnung, gelb = Hinweis, rot = Problem.
- **Automatische Sicherungen:** Die App legt auf dem Gerät selbst die letzten fünf Stände der Protokolle ab (beim Start, nach Änderungen frühestens alle zwei Stunden, sonst einmal täglich). Menü → Sicherung → Automatische Sicherungen zeigt sie. „Einspielen“ ergänzt fehlende und neuere Werte, „Datei“ speichert den Stand, „Jetzt sichern“ legt von Hand einen an.
- **Wartende Änderungen:** Unten in der Fußzeile steht „⏳ n Änderungen warten“, wenn Eingaben länger als wenige Sekunden nicht beim Server angekommen sind. Nach einer Stunde wird der Hinweis rot.
- **Unterschrift:** Unter dem Protokoll öffnet „Unterschreiben“ ein Feld zum Unterschreiben mit dem Finger. Name und Datum stehen daneben und die Unterschrift kommt in den Ausdruck (Zeile „F.d.R.d.A.“). Sie bleibt wie die Fotos auf diesem Gerät und ist nicht in der Sicherung.
- **Datenschutz:** Menü → Hilfe → Datenschutz beschreibt, was auf dem Gerät, im Sync, bei OSM und per E-Mail gespeichert wird und wie man es löscht. Der Text ist eine technische Beschreibung, Ansprechperson und Rechtsgrundlage muss die Wehrführung bzw. das Amt ergänzen.
- **Pumpenliste:** Menü → Werkzeuge → Pumpenliste: eigene Pumpen (eine pro Zeile) für die Auswahl im Protokoll, nur für dieses Gerät. „Andere“ gibt es immer.

## Weitere Funktionen
- **Sicherung:** Protokolle, Ortsangaben und Änderungsprotokoll lassen sich als Datei speichern und wieder einspielen.
- **Punkte aus Datei importieren:** Für den Einsatz ohne aktuelle Daten.
- **Update-Hinweis:** Gibt es eine neue App-Version, erscheint oben ein gelber Balken mit „Jetzt laden“. Geprüft wird beim Start und alle zehn Minuten.
- **Stoppuhr mit Signal:** Der Knopf „Ziel“ an der Stoppuhr schaltet eine Zielzeit durch (aus, 15, 30, 45, 60 min). Ist sie erreicht, vibriert das Handy,
  es piept dreimal und der Rahmen der Uhr wird rot. Die Uhr läuft weiter. Auf iPhones gibt es keine Vibration.
- **Kompass im Einsatzmodus:** Die Pfeile drehen sich mit dem Handy und zeigen von dir aus zur Stelle. Handy flach halten. Auf dem iPhone fragt die App
  einmal nach der Erlaubnis. Ohne Kompass zeigt der Pfeil die Richtung bezogen auf Norden.
- **Diktieren:** Das Mikrofon-Symbol neben den Textfeldern (Besonderheiten, Ortsangabe, Fehler melden) wandelt gesprochenen Text in Schrift um. Das braucht
  Netz und die Mikrofon-Erlaubnis. Die Spracherkennung übernimmt der Browser (bei Chrome über Google).
- **Startpunkt:** Die Kartenmitte lässt sich als Startansicht merken.
- **QR-Code zur App:** Menü → Hilfe → App aufs Handy. Zum Scannen oder Ausdrucken, damit neue Kameraden die App aufs Handy bekommen.
  Der Code wird beim ersten Öffnen mit Netz erzeugt.
- **Fehler oder Idee melden:** Direkt aus dem Menü.

## Hinweise zu den Daten
- Fotos sind nicht in der Sicherung enthalten. Der Zeitpunkt jedes Fotos steht im Änderungsprotokoll und im Bild selbst.
- Protokolle und Fotos liegen zuerst auf dem Gerät. Bei aktivem Sync liegen die Protokolleinträge (ohne Fotos) zusätzlich
  in der Firebase-Datenbank der Wehr, geschützt durch PIN-Anmeldung. Gespeichert werden auch die Namen der Prüfer.
- Design-Dateien (Tailwind, Leaflet, FontAwesome, QR-Bibliothek) werden beim Veröffentlichen gebaut und mit der Seite ausgeliefert, nicht mehr aus dem Netz geladen. Nach dem ersten Start funktioniert die App deshalb auch ohne Netz mit vollem Design.
- Die Stellendaten stammen aus OpenStreetMap (© OpenStreetMap-Mitwirkende).
