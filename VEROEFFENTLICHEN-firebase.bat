@echo off
REM ---------------------------------------------------------------------------
REM  Web-App zusaetzlich unter vet-station.web.app veroeffentlichen.
REM
REM  WOFUER: Nur dort gehoert die Anmeldung (Google / Microsoft) zur SELBEN Adresse
REM  wie die Seite. Auf github.io ist sie eine fremde Adresse - moderne Browser
REM  trennen deren Speicher ab, und eine Anmeldung ohne eigenes Fenster kommt leer
REM  zurueck. github.io bleibt bestehen; das hier ist eine ZWEITE Adresse.
REM
REM  DOPPELKLICKEN. Sonst nichts.
REM
REM  KEIN NODE AUS DEM INTERNET NOETIG (27.08.2026): frueher stand hier
REM  "Voraussetzung: Node.js von nodejs.org". Das war eine unnoetige Huerde - im
REM  Nachbarordner VetStation\werkzeuge\ liegt ein portables Node, und firebase-tools
REM  ist seit dem 27.08.2026 fest daneben installiert.
REM ---------------------------------------------------------------------------
setlocal
cd /d "%~dp0"

set "TRAGBAR=%~dp0..\VetStation\werkzeuge\node-v20.18.1-win-x64"

REM  Firebase-Werkzeug suchen, nach Verlaesslichkeit geordnet:
REM    a) fest installiert neben dem portablen Node -> schnell, saubere Ausgabe
REM    b) fest installiert im System
REM    c) npx  -> laedt bei JEDEM Aufruf neu
REM
REM  WARUM NPX ZULETZT (Befund 27.08.2026): ueber npx kam die Anmeldung gar nicht
REM  erst zum Vorschein. npx installierte, meldete EPERM beim Aufraeumen seines
REM  Zwischenspeichers und kehrte zurueck, ohne dass firebase auch nur EINE Zeile
REM  ausgab - keine Rueckfrage, kein Browser, keine Fehlermeldung. Hinterher stand
REM  in der Konfigurationsdatei nur {} und "firebase login:list" meldete "No
REM  authorized accounts". Es war also nichts geschehen, und nichts sah danach aus.
set "FB="
set "VOR="

if exist "%TRAGBAR%\firebase.cmd" set "FB=%TRAGBAR%\firebase.cmd"

if not defined FB (
  where firebase >nul 2>&1
  if not errorlevel 1 set "FB=firebase"
)

if not defined FB (
  if exist "%TRAGBAR%\npx.cmd" (
    set "FB=%TRAGBAR%\npx.cmd"
    set "VOR=--yes firebase-tools"
  )
)

if not defined FB (
  where npx >nul 2>&1
  if not errorlevel 1 (
    set "FB=npx"
    set "VOR=--yes firebase-tools"
  )
)

if not defined FB (
  echo.
  echo   Es wurde kein Firebase-Werkzeug und kein Node gefunden - weder im System
  echo   noch im Nachbarordner werkzeuge\
  echo.
  echo   Einmalig nachholen:
  echo       "..\VetStation\werkzeuge\node-v20.18.1-win-x64\npm.cmd" install -g firebase-tools
  echo.
  pause
  exit /b 1
)

REM  Steht die Konfiguration ueberhaupt daneben? Ohne firebase.json wuesste
REM  Firebase nicht, was veroeffentlicht werden soll.
if not exist "%~dp0firebase.json" (
  echo.
  echo   firebase.json fehlt neben dieser Datei. Ohne sie weiss Firebase nicht,
  echo   was veroeffentlicht werden soll.
  echo.
  pause
  exit /b 1
)

REM  Fehlercode zuruecksetzen. "where firebase" bzw. "where npx" hinterlaesst oben
REM  eine 1, wenn nichts gefunden wurde - und "if errorlevel 1" weiter unten wuerde
REM  die dann dem Anmeldebefehl anlasten und abbrechen, obwohl gar nichts schiefging.
REM  Beim Trockenlauf am 27.08.2026 genau so beobachtet.
ver >nul

echo.
echo   1/3  Bisheriger Anmeldestand
call "%FB%" %VOR% login:list

echo.
echo   2/3  Anmeldung bei Firebase
echo        Es oeffnet sich der Browser. Mit dem Google-Konto anmelden, dem das
echo        Projekt vet-station gehoert. Steht oben schon ein Konto, ist dieser
echo        Schritt nur eine Bestaetigung.
echo.
call "%FB%" %VOR% login
if errorlevel 1 goto fehler

echo.
echo   3/3  Veroeffentlichen ^(rund 5 MB; der Update-Kanal bleibt aussen vor^)
call "%FB%" %VOR% deploy --only hosting
if errorlevel 1 goto fehler

echo.
echo   Fertig. Die Web-App laeuft jetzt zusaetzlich unter:
echo       https://vet-station.web.app/canis-anaesthesie/
echo.
echo   Diese Adresse an die Praxen geben - dort funktioniert die Anmeldung
echo   auf JEDEM Geraet, auch ohne eigenes Anmeldefenster.
echo.
echo   GitHub Pages laeuft unveraendert weiter. Der Update-Kanal der Stationen
echo   zeigt weiterhin dorthin und darf NICHT umziehen.
echo.
pause
exit /b 0

:fehler
echo.
echo   Abgebrochen. Die Meldung darueber sagt, woran es lag. Zwei haeufige Faelle:
echo.
echo   "Requested entity was not found" oder Fehler 404 beim Veroeffentlichen:
echo       Fuer dieses Projekt ist Hosting noch nie eingeschaltet worden, es gibt
echo       also gar keine Zieladresse. Einmalig im Browser einschalten:
echo       https://console.firebase.google.com/project/vet-station/hosting
echo       Danach diese Datei erneut doppelklicken.
echo.
echo   Keine Berechtigung / falsches Konto:
echo       Bei der Anmeldung wurde ein Google-Konto gewaehlt, dem das Projekt
echo       vet-station nicht gehoert. Dann abmelden und neu anmelden.
echo.
pause
exit /b 1
