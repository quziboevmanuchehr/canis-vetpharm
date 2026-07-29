@echo off
REM ---------------------------------------------------------------------------
REM  Web-App zusaetzlich unter vet-station.web.app veroeffentlichen.
REM
REM  WOFUER: Nur dort gehoert die Anmeldung (Google / Microsoft) zur SELBEN Adresse
REM  wie die Seite. Auf github.io ist sie eine fremde Adresse - moderne Browser
REM  trennen deren Speicher ab, und eine Anmeldung ohne eigenes Fenster kommt leer
REM  zurueck. github.io bleibt bestehen; das hier ist eine ZWEITE Adresse.
REM
REM  VORAUSSETZUNG: Node.js (nodejs.org, LTS). Danach reicht dieser Doppelklick.
REM ---------------------------------------------------------------------------
setlocal
cd /d "%~dp0"

where npx >nul 2>&1
if errorlevel 1 (
  echo.
  echo   Node.js fehlt. Bitte einmalig von https://nodejs.org installieren ^(LTS^),
  echo   dieses Fenster schliessen und die Datei erneut doppelklicken.
  echo.
  pause
  exit /b 1
)

echo.
echo   1/2  Anmeldung bei Firebase ^(oeffnet den Browser; nur beim ersten Mal noetig^)
call npx --yes firebase-tools login
if errorlevel 1 goto fehler

echo.
echo   2/2  Veroeffentlichen
call npx --yes firebase-tools deploy --only hosting
if errorlevel 1 goto fehler

echo.
echo   Fertig. Die Web-App laeuft jetzt zusaetzlich unter:
echo       https://vet-station.web.app/canis-anaesthesie/
echo.
echo   Diese Adresse an die Praxen geben - dort funktioniert die Anmeldung
echo   auf JEDEM Geraet, auch ohne eigenes Anmeldefenster.
echo.
pause
exit /b 0

:fehler
echo.
echo   Abgebrochen. Die Meldung darueber sagt, woran es lag.
echo.
pause
exit /b 1
