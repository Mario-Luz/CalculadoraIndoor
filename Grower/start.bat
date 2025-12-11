@echo off
echo.
echo ================================================================
echo  GROWER - APLICACAO DE PLANO DE CULTIVO
echo ================================================================
echo.

echo [1/2] Iniciando API Backend (TypeScript - porta 5000)...
start "Grower API" cmd /k "npm run dev"
echo.

timeout /t 3

echo [2/2] Iniciando Frontend (React - porta 5173)...
start "Grower Frontend" cmd /k "cd frontend && npm run dev"
echo.

echo ================================================================
echo  APLICACAO INICIADA COM SUCESSO!
echo ================================================================
echo.
echo Acesse:
echo   Frontend:  http://localhost:5173
echo   API:       http://localhost:5000
echo.
echo Feche as janelas para parar a aplicacao.
echo.
pause
