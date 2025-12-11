# 🌱 Grower - Calculadora de Plano de Cultivo

Aplicação fullstack para calcular o plano de cultivo ideal baseado na potência do painel LED e espaço da tenda.

## 🏗️ Arquitetura

```
Grower/
├── backend/
│   ├── src/
│   │   ├── config.ts
│   │   ├── calculadora.ts
│   │   ├── api.ts
│   │   └── demo.ts
│   ├── dist/
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.jsx
│   ├── package.json
│   └── README.md
├── package.json
└── README.md
```

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- npm 9+

### 1. Clonar / Preparar

```bash
cd Grower
```

### 2. Instalar Dependências

```bash
npm run install:all
```

### 3. Iniciar Backend

```bash
npm run backend:dev
```

API rodará em `http://localhost:5000`

### 4. Iniciar Frontend (outro terminal)

```bash
npm run frontend:dev
```

Frontend rodará em `http://localhost:5173`

## 📚 Documentação

- **[Backend](./backend/README.md)** - API TypeScript + Express
- **[Frontend](./frontend/README.md)** - React + Vite

## 🧪 Testes

```bash
npm run backend:test
```

## 🏗️ Build para Produção

```bash
# Backend
npm run backend:build
npm run backend:start

# Frontend
npm run frontend:build
```

## 📊 Funcionalidades

### Cálculo de Plano de Cultivo

- ✅ 3 etapas (germinação, vegetação, floração)
- ✅ Cálculo de adequação de potência
- ✅ Estimativa de rendimento
- ✅ Consumo de água por etapa
- ✅ Validação de parâmetros

### API REST

- `POST /api/plano-cultivo` - Calcular plano completo
- `POST /api/etapa/{etapa}` - Calcular etapa específica  
- `GET /health` - Health check

### Interface

- Formulário de entrada intuitivo
- Cards informativos
- Design responsivo
- Animações suaves
- Tratamento de erros

## 🔌 Integração

A aplicação usa uma arquitetura separada:

- **Backend**: TypeScript + Express rodando em 5000
- **Frontend**: React + Vite rodando em 5173
- **Comunicação**: HTTP REST com CORS habilitado

## 📦 Dependências

### Backend
- Express 5.x
- TypeScript 5.x
- Jest + ts-jest

### Frontend
- React 18.x
- Vite 5.x

## 🛠️ Scripts Úteis

```bash
# Backend
npm run backend:dev      # Desenvolvimento
npm run backend:build    # Compilar
npm run backend:test     # Testes

# Frontend
npm run frontend:dev     # Desenvolvimento
npm run frontend:build   # Build

# Root
npm run install:all      # Instalar tudo
```

## 📝 Exemplo de Uso

### Via cURL

```bash
curl -X POST http://localhost:5000/api/plano-cultivo \
  -H "Content-Type: application/json" \
  -d '{
    "potencia_painel_w": 1000,
    "espaco_tenda_m2": 2.0
  }'
```

### Via Interface

1. Abra http://localhost:5173
2. Preencha potência e espaço
3. Clique em "Calcular Plano"
4. Veja os resultados

## 🎯 Parâmetros Recomendados

- **Potência mínima**: 200 W/m²
- **Etapa de Germinação**: 300 W/m², 7 dias, 25 plantas/m²
- **Etapa de Vegetação**: 600 W/m², 21 dias, 9 plantas/m²
- **Etapa de Floração**: 900 W/m², 42 dias, 4 plantas/m²

## 🌐 Deploy

### Backend (Heroku/Railway)

```bash
cd backend
npm run build
npm start
```

### Frontend (Vercel/Netlify)

```bash
cd frontend
npm run build
# Upload pasta 'dist'
```

## 🤝 Contribuindo

Sugestões e melhorias são bem-vindas!

## 📄 Licença

MIT

## 📞 Suporte

Para problemas ou dúvidas:
1. Verifique que ambos servidores estão rodando
2. Confirme as portas (5000 e 5173)
3. Cheque o console do navegador para erros
4. Verifique o terminal do backend para logs

---

**Desenvolvido com ❤️ para otimizar cultivos** 🌱
