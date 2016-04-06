# FB klapp

### Klapp nervige Facebook-Posts einfach automatisch zu!

* Deine Pinnwand besteht zu 50% aus diesen total unkreativen "Hans Wurst hat das und das geteilt" Meldungen? Einfach zuklappen!
* Dich interessiert nicht, dass schon wieder jemand sein Profilbild geändert hat? Zuklappen!
* Dich interessiert nicht, was dauernd irgendwem "gefällt"? Klappe zu!
* Das neue Profilbild von Petra Pusemuckel interessiert dich aber doch? Einfach die Meldung wieder aufklappen!

*(Dies ist ein Greasemonkey-Script, es wird also nur im Firefox funktionieren. Eventuell auch mit Tampermonkey in Chrome.)*

![Screenshot](https://raw.githubusercontent.com/koem/fb-klapp/master/screenshot.png)

## Installieren

1. Installier das Greasemonkey Addon in deinen Firefox: https://addons.mozilla.org/de/firefox/addon/greasemonkey/
1. Starte Firefox neu
1. Öffne die Datei **fb-klapp.user.js**: https://github.com/koem/fb-klapp/blob/master/fb-klapp.user.js
1. Klick auf "Raw"
1. Klick auf "Installieren"

## Ruhe genießen

Öffne Facebook: https://www.facebook.com/?sk=h_chr

Zugeklappte Meldungen kannst du nun mit dem Doppelpfeil-Symbol auf- und wieder zuklappen.

## Konfigurieren

So kannst du einstellen, was zugeklappt werden soll und was nicht:

1. Wähl im Firefox-Menü: Extras &gt; Greasemonkey &gt; Benutzerskripte verwalten
1. Klick auf "Einstellungen" neben "FB klapp"
1. Klick auf "Dieses Benutzerscript bearbeiten" - ein Editor geht auf
1. In der Zeile "nicht_ausblenden = ...": trage hier die Namen der FB Freunde und Seiten ein, die von FB klapp ignoriert werden sollen. Jeder Name muss genau so wie in FB geschrieben werden und in doppelte Hochkommata (Gänsefüßchen) eingefasst werden. Hinter jeden Namen gehört ein Komma. Alles was diese Leute / Seiten / Gruppen posten wird also nicht zugeklappt, sondern bleibt so wie gehabt.
1. In den Zeilen ab "hat_geteilt" kannst du bestimmen, welche Arten von Meldungen zugeklappt werden sollen (= 1), und welche nicht (= 0).
1. Klick auf "Speichern" und schließ das Editor-Fenster
1. Die Änderungen werden erst wirksam, wenn du deine Facebook-Seite erneut lädst (F5 drücken).
