@echo off
set "PATH=C:\Program Files\nodejs;%APPDATA%\npm;%PATH%"
cd /d "%~dp0..\apps\web"
node "%APPDATA%\npm\node_modules\pnpm\bin\pnpm.cjs" dev
