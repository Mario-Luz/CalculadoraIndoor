# 🌱 GROWER - Aplicação Completa de Plano de Cultivo

## 📋 Resumo do Projeto

Aplicação full-stack para calcular o plano de cultivo ideal:
- **Backend**: API TypeScript com Express
- **Frontend**: Interface React com Vite
- **Funcionalidade**: Calcula etapas de cultivo baseado em potência do painel e espaço da tenda

## 🚀 Como Iniciar

### Opção 1: Scripts Automáticos (Windows)
```bash
start.bat
```

### Opção 2: Scripts Automáticos (Linux/Mac)
```bash
chmod +x start.sh
./start.sh
```

### Opção 3: Manual
**Terminal 1 - API Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## 🌐 Acessar a Aplicação

- **Frontend**: http://localhost:5173
- **API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 📦 Estrutura do Projeto

```
Grower/
├── src/                    # API TypeScript
│   ├── config.ts
│   ├── calculadora.ts
│   ├── calculadora.test.ts
│   ├── api.ts
│   └── demo.ts
│
├── frontend/              # React Vite
│   ├── src/
│   │   ├── components/    # FormularioCultivo, ResultadoPlano
│   │   ├── services/      # apiService
│   │   ├── styles/        # CSS components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── package.json           # API deps
├── tsconfig.json
├── jest.config.js
├── README_TYPESCRIPT.md
├── GUIA_RAPIDO.md
└── start.bat / start.sh
```

## 🔧 Comandos Disponíveis

### Backend (Raiz do projeto)
```bash
npm run dev      # Inicia API em desenvolvimento
npm run build    # Compila TypeScript
npm start        # Inicia API compilada
npm test         # Executa testes
npm run demo     # Demo da calculadora
```

### Frontend
```bash
cd frontend
npm run dev      # Inicia dev server
npm run build    # Build para produção
npm run preview  # Preview do build
```

## 🎯 Fluxo de Dados

```
Cliente (React)
    ↓
[FormularioCultivo - entrada de dados]
    ↓
[apiService - POST /api/plano-cultivo]
    ↓
Backend API (Express + TypeScript)
    ↓
[CalculadoraPlanoCultivo - processamento]
    ↓
JSON Response (plano completo)
    ↓
[ResultadoPlano - exibição]
    ↓
Usuário visualiza resultado
```

## 📊 Funcionalidades Implementadas

### Backend
✅ Cálculo de plano de cultivo com 3 etapas
✅ Validação de parâmetros
✅ Cálculo de consumo de água
✅ Análise de adequação de potência
✅ Estimativa de rendimento
✅ 14 testes unitários (100% cobertura)
✅ API REST com 3 endpoints
✅ CORS habilitado para frontend

### Frontend
✅ Formulário com validação
✅ Exibição de resultados em cards
✅ Layout responsivo (mobile/desktop)
✅ Integração completa com API
✅ Estados de carregamento
✅ Tratamento de erros
✅ Design moderno com gradientes

## 🧪 Testando a Aplicação

### 1. Teste com valores padrão
Clique em "Calcular Plano" com os valores padrão:
- Potência: 1000W
- Espaço: 2.0m²

### 2. Teste com valores customizados
Exemplo:
- Potência: 1600W
- Espaço: 3.0m²

### 3. Teste de validação
Tente valores inválidos:
- Potência: -100
- Espaço: 0

## 🛠️ Troubleshooting

### "Erro ao conectar com a API"
- Verifique se a API está rodando em http://localhost:5000
- Execute: `npm run dev` na raiz do projeto
- Aguarde "Running on http://127.0.0.1:5000"

### Porta 5173 em uso
```bash
# Encontre e encerre o processo
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Porta 5000 em uso
```bash
# Encontre e encerre o processo
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Erro de CORS
- Verifique se o middleware CORS está no `src/api.ts`
- Recompile: `npm run build`
- Reinicie a API

## 📈 Exemplo de Uso

### Entrada
```json
{
  "potencia_painel_w": 1000,
  "espaco_tenda_m2": 2.0
}
```

### Saída
```json
{
  "sucesso": true,
  "potencia_por_m2": 500,
  "etapas": [
    {
      "etapa": "germinacao",
      "duracao_dias": 7,
      "plantas_totais": 50,
      "potencia_necessaria_m2": 300,
      "adequacao_potencia": {
        "status": "excelente",
        "percentual": 100
      },
      ...
    },
    ...
  ],
  "resumo": {
    "ciclo_total_dias": 70,
    "consumo_agua_total_litros": 316.4,
    "plantas_finais": 8,
    "rendimento_estimado_gramas": 800,
    "rendimento_por_m2_gramas": 400
  }
}
```

## 📚 Documentação

- **Backend**: Veja `README_TYPESCRIPT.md`
- **Frontend**: Veja `frontend/README.md`
- **Guia Rápido**: Veja `GUIA_RAPIDO.md`

## 🔐 Segurança

- Validação de entrada em ambos os lados
- CORS configurado
- Tipagem completa com TypeScript
- Tratamento de erros robusto

## 🚀 Deploy

### Frontend (Vercel/Netlify)
1. `npm run build` em `frontend/`
2. Deploy pasta `frontend/dist`

### Backend (Heroku/Railway)
1. `npm run build`
2. Defina variável de ambiente `NODE_ENV=production`
3. Execute: `npm start`

## 📝 Notas

- Potência mínima recomendada: 200W/m²
- Ciclo total: 70 dias (7+21+42)
- Rendimento esperado: ~100g por planta
- Validação de entrada em tempo real

## 🤝 Contribuindo

Sugestões de melhorias:
- Adicionar autenticação
- Persistência de dados
- Gráficos de evolução
- Multi-idioma
- Progressive Web App (PWA)

## 📞 Suporte

Se encontrar problemas:
1. Verifique se ambos os servidores estão rodando
2. Limpe o cache do navegador (Ctrl+Shift+Delete)
3. Verifique a porta (5173 e 5000)
4. Verifique os logs no console (F12)

## ✨ Versão

- **Grower**: v1.0
- **Frontend**: React 18 + Vite 5
- **Backend**: TypeScript + Express 5
- **Data**: Dezembro 2025

---

🌱 **Feliz cultivo!** 🌱
