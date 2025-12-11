# Backend - Grower (TypeScript + Express)

API REST para cálculo de plano de cultivo.

## 🚀 Início Rápido

### 1. Instalar Dependências

```bash
npm install
```

### 2. Iniciar Dev Server

```bash
npm run dev
```

A API estará disponível em `http://localhost:5000`

### 3. Build para Produção

```bash
npm run build
npm start
```

## 📁 Estrutura

```
backend/
├── src/
│   ├── config.ts           # Parâmetros de cultivo
│   ├── calculadora.ts      # Motor de cálculo
│   ├── calculadora.test.ts # Testes Jest
│   ├── api.ts              # API Express
│   └── demo.ts             # Demonstração
├── dist/                   # Código compilado
├── package.json
├── tsconfig.json
└── jest.config.js
```

## 🧪 Testes

```bash
npm test
```

## 🔌 Endpoints

- `POST /api/plano-cultivo` - Calcular plano completo
- `POST /api/etapa/{etapa}` - Calcular etapa específica
- `GET /health` - Health check

## 📝 Exemplos

```bash
# Calcular plano
curl -X POST http://localhost:5000/api/plano-cultivo \
  -H "Content-Type: application/json" \
  -d '{"potencia_painel_w": 1000, "espaco_tenda_m2": 2.0}'
```

## 🛠️ Scripts

```bash
npm run dev      # Desenvolvimento
npm run build    # Compilar
npm run start    # Produção
npm test         # Testes
```

## 📦 Dependências

- TypeScript 5.x
- Express 5.x
- Jest + ts-jest
- ts-node
