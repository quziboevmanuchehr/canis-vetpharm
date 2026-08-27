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
REM  KEIN NODE MEHR NOETIG (27.08.2026): frueher stand hier "Voraussetzung: Node.js
REM  von nodejs.org". Das war eine unnoetige Huerde - im Nachbarordner liegt seit
REM  jeher ein portables Node, das dieselbe Arbeit tut. Wer diese Datei von Hand in
REM  PowerShell nachbauen wollte, stolperte ausserdem zweimal: ein Befehl, der mit
REM  einem Anfuehrungszeichen beginnt, ist dort eine ZEICHENKETTE und kein Aufruf
REM  (es fehlt das &), und "--yes" liest PowerShell als Operator. In einer .bat
REM  gibt es beide Fallen nicht. Deshalb ist der Doppelklick der richtige Weg.
REM ---------------------------------------------------------------------------
setlocal
cd /d "%~dp0"

REM  1. Node suchen: erst das im System, dann das portable im Nachbarordner.
REM     Der relative Weg haelt die Datei frei von Benutzernamen - canis-vetpharm
REM     und VetStation liegen nebeneinander.
set "NPX="
where npx >nul 2>&1
if not errorlevel 1 set "NPX=npx"

if not defined NPX (
  if exist "%~dp0..\VetStation\werkzeuge\node-v20.18.1-win-x64\npx.cmd" (
    set "PATH=%~dp0..\VetStation\werkzeuge\node-v20.18.1-win-x64;%PATH%"
    set "NPX=%~dp0..\VetStation\werkzeuge\node-v20.18.1-win-x64\npx.cmd"
    echo.
    echo   Kein Node im System - das portable aus werkzeuge\ wird benutzt.
  )
)

if not defined NPX (
  echo.
  echo   Es wurde kein Node gefunden - weder im System noch unter
  echo       ..\VetStation\werkzeuge\node-v20.18.1-win-x64\
  echo.
  echo   Zwei Wege: entweder Node.js von https://nodejs.org installieren ^(LTS^),
  echo   oder den Ordner werkzeuge\ aus der Sicherung zurueckspielen.
  echo.
  pause
  exit /b 1
)

REM  2. Steht die Konfiguration ueberhaupt daneben? Ohne firebase.json wuerde der
REM     Befehl unten mit einer wenig hilfreichen Meldung abbrechen.
if not exist "%~dp0firebase.json" (
  echo.
  echo   firebase.json fehlt neben dieser Datei. Ohne sie weiss Firebase nicht,
  echo   was veroeffentlicht werden soll.
  echo.
  pause
  exit /b 1
)

echo.
REM  Fehlercode zuruecksetzen. "where npx" hinterlaesst oben eine 1, wenn kein Node im
REM  System liegt - und "if errorlevel 1" weiter unten wuerde die dann dem Anmeldebefehl
REM  anlasten und abbrechen, obwohl gar nichts schiefging. Beim Trockenlauf am 27.08.2026
REM  genau so passiert.
ver >nul

echo   1/2  Anmeldung bei Firebase
echo        Es oeffnet sich der Browser. Mit dem Google-Konto anmelden, das das
echo        Projekt vet-station besitzt. Nur beim ersten Mal noetig.
echo.
call "%NPX%" --yes firebase-tools login
if errorlevel 1 goto fehler

echo.
echo   2/2  Veroeffentlichen ^(rund 5 MB; der Update-Kanal bleibt aussen vor^)
call "%NPX%" --yes firebase-tools deploy --only hosting
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
echo   Abgebrochen. Die Meldung darueber sagt, woran es lag.
echo.
echo   Haeufigster Fall: bei der Anmeldung wurde ein Google-Konto gewaehlt, dem
echo   das Projekt vet-station nicht gehoert. Dann "firebase-tools logout" und
echo   diese Datei erneut doppelklicken.
echo.
pause
exit /b 1
