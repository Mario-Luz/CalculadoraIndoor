# 📋 Instruções de Uso - Grower

## 📁 Nova Estrutura do Projeto

```
Grower/
├── backend/              ← API TypeScript + Express
│   ├── src/
│   ├── dist/
│   ├── package.json
│   └── README.md
├── frontend/             ← React + Vite
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── package.json          ← Scripts master
└── README.md
```

## 🚀 Como Começar

### Opção 1: Instalação Completa (Recomendado)

```bash
# Instalar dependências de ambos
npm run install:all
```

### Opção 2: Instalação Manual

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## ▶️ Executar a Aplicação

### Terminal 1 - Backend (API)

```bash
npm run backend:dev
```

Aguarde até ver: "Servidor rodando em http://localhost:5000"

### Terminal 2 - Frontend (React)

```bash
npm run frontend:dev
```

Aguarde até ver: "Local: http://localhost:5173"

### Abrir no Navegador

```
http://localhost:5173
```

## 🧪 Executar Testes

```bash
npm run backend:test
```

## 🏗️ Build para Produção

```bash
# Build Backend
npm run backend:build

# Build Frontend
npm run frontend:build
```

## 📦 Scripts Disponíveis

### Backend
```bash
npm run backend:dev       # Dev com hot reload
npm run backend:build     # Compilar TypeScript
npm run backend:start     # Rodar compilado
npm run backend:test      # Testes Jest
```

### Frontend
```bash
npm run frontend:dev      # Dev com hot reload
npm run frontend:build    # Build otimizado
```

### Root
```bash
npm run install:all       # Instalar ambos
npm run dev              # Atalho para backend:dev
```

## 🔍 Estrutura de Arquivos Detalhada

### Backend (`backend/`)

```
src/
├── config.ts             ← Parâmetros de cultivo
├── calculadora.ts        ← Lógica principal
├── calculadora.test.ts   ← Testes (14 casos)
├── api.ts                ← Express API
└── demo.ts               ← Script de demonstração

dist/                     ← Código compilado (gerado)
package.json             ← Dependências TypeScript
tsconfig.json           ← Configuração TypeScript
jest.config.js          ← Configuração testes
README.md               ← Documentação backend
```

### Frontend (`frontend/`)

```
src/
├── components/
│   ├── FormularioCultivo.jsx    ← Entrada de dados
│   └── ResultadoPlano.jsx       ← Exibição resultados
├── services/
│   └── apiService.js             ← Integração API
├── styles/
│   ├── FormularioCultivo.css
│   └── ResultadoPlano.css
├── App.jsx                       ← App principal
├── main.jsx                      ← Entry point
├── index.css                     ← Estilos globais
└── App.css

public/                  ← Assets estáticos
package.json            ← Dependências React
vite.config.js         ← Configuração Vite
README.md              ← Documentação frontend
```

## 🔗 Integração

- Backend em `http://localhost:5000`
- Frontend em `http://localhost:5173`
- CORS habilitado na API

## 💡 Dicas

1. **Se a API não conectar**, certifique-se de:
   - Backend rodando (`npm run backend:dev`)
   - Porta 5000 disponível
   - CORS habilitado

2. **Se o Frontend não aparecer**, verifique:
   - Frontend rodando (`npm run frontend:dev`)
   - Porta 5173 disponível
   - Console do navegador para erros

3. **Para debug**, abra:
   - DevTools (F12) no navegador
   - Terminal do backend para logs API

## 📝 Notas Importantes

- **node_modules** não está versionado (adicione ao .gitignore)
- **dist/** contém código compilado
- Scripts do `package.json` raiz chamam os scripts das subpastas
- Manter estrutura facilita manutenção e deploy

## 🆘 Troubleshooting

### "Port 5000 already in use"
```bash
# Encontrar e matar processo
lsof -i :5000          # Linux/Mac
netstat -ano | findstr :5000  # Windows
```

### "Cannot find module"
```bash
# Reinstalar dependências
cd backend && rm -rf node_modules && npm install
cd ../frontend && rm -rf node_modules && npm install
```

### "Webpack/Vite not found"
```bash
# Instalar globalmente (opcional)
npm install -g vite
npm install -g typescript
```

## 📚 Referências

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
- [README Principal](./README.md)

---

**Projeto Grower v1.0** | Calculadora de Plano de Cultivo
