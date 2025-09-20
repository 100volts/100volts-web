@echo off

REM Change directory to your Astro project folder
cd /d "C:\path\to\your\astro\project"

REM Install dependencies (if not already installed)
npm install

REM Start the Astro development server
npx astro dev

REM Pause to keep the terminal open after the server stops
pause