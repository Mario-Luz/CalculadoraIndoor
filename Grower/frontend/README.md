# Frontend - Grower (React + Vite)

Aplicação React moderna para calcular o plano de cultivo ideal com integração à API TypeScript.

## 🚀 Início Rápido

### 1. Instalar Dependências

```bash
cd frontend
npm install
```

### 2. Iniciar Dev Server

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

### 3. Build para Produção

```bash
npm run build
```

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/
│   │   ├── FormularioCultivo.jsx    # Formulário de entrada
│   │   └── ResultadoPlano.jsx       # Exibição de resultados
│   ├── services/
│   │   └── apiService.js            # Integração com API
│   ├── styles/
│   │   ├── FormularioCultivo.css    # Estilos do formulário
│   │   └── ResultadoPlano.css       # Estilos dos resultados
│   ├── App.jsx                      # Componente principal
│   ├── App.css                      # Estilos da app
│   ├── index.css                    # Estilos globais
│   └── main.jsx                     # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## 🔧 Configuração

Para usar uma API diferente, edite `src/services/apiService.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## 📊 Funcionalidades

- **FormularioCultivo**: Entrada de dados com validação
- **ResultadoPlano**: Exibição de resultados com cards interativos
- **Responsivo**: Mobile-first design
- **Integração API**: Conexão automática com backend TypeScript

## 🎨 Design

- Cores: Gradientes modernos (roxo/azul)
- Icons: Emojis para melhor UX
- Responsivo: Adapta-se a qualquer tamanho de tela

## 🛠️ Scripts

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
