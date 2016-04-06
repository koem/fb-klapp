# FB klapp

### Klapp nervige FB Meldungen auf deiner Pinnwand einfach automatisch zu!

(Dies ist ein Greasemonkey-Script, es wird also nur im Firefox funktionieren. Eventuell auch mit Tampermonkey in Chrome.)

## Installation

1. Installier das Greasemonkey Addon in deinen Firefox: https://addons.mozilla.org/de/firefox/addon/greasemonkey/
1. Starte Firefox neu
1. Öffne die Datei fb-klapp.user.js: https://github.com/koem/fb-klapp/blob/master/fb-klapp.user.js
1. Klicke auf "Raw"
1. Klicke auf "Installieren"

## Testen

Öffne Firefox: https://www.facebook.com/?sk=h_chr

Zugeklappte Meldungen kannst du nun mit dem Doppelpfeil-Symbol auf- und wieder zuklappen.

## Konfiguration

So kannst du einstellen, was zugeklappt werden soll und was nicht:

1. Wähle im Firefox-Menü: Extras &gt; Greasemonkey &gt; Benutzerskripte verwalten
1. Klicke auf "Einstellunge" neben "FB klapp"
1. Klicke auf "Dieses Benutzerscript bearbeiten" - ein Editor geht auf
1. In der Zeile "nicht_ausblenden = ...": trage hier die Namen der FB Freunde und Seiten ein, die von FB klapp ignoriert werden sollen. Jeder Name muss genau so wie in FB geschrieben werden und in doppelte Hochkommata (Gänsefüßchen) eingefasst werden. Hinter jeden Namen gehört ein Komma. Alles was diese Leute / Seiten / Gruppen posten wird also nicht zugeklappt, sondern bleibt so wie gehabt.
1. In den Zeilen ab "hat_geteilt" kannst du bestimmen, welche Arten von Meldungen zugeklappt werden sollen (= 1), und welche nicht (= 0).
1. Klick auf "Speichern" und schließ das Editor-Fenster

