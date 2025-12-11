#!/bin/bash
# Script para rodar a aplicação completa Grower

echo "════════════════════════════════════════════════════════════"
echo "🌱 INICIANDO APLICAÇÃO GROWER (Frontend + API Backend)"
echo "════════════════════════════════════════════════════════════"
echo ""

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}1️⃣  Iniciando API Backend (TypeScript)...${NC}"
cd "$(dirname "$0")"
npm run dev &
API_PID=$!
echo -e "${GREEN}✓ API iniciada (PID: $API_PID)${NC}"
echo ""

sleep 3

echo -e "${BLUE}2️⃣  Iniciando Frontend (React)...${NC}"
cd frontend
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend iniciado (PID: $FRONTEND_PID)${NC}"
echo ""

echo "════════════════════════════════════════════════════════════"
echo -e "${GREEN}✓ APLICAÇÃO INICIADA COM SUCESSO!${NC}"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "🌐 Acesse:"
echo "  Frontend:  http://localhost:5173"
echo "  API:       http://localhost:5000"
echo ""
echo "Pressione Ctrl+C para parar"
echo ""

# Wait for processes
wait $API_PID $FRONTEND_PID
