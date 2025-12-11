# Aplicação de Plano de Cultivo - Grower (TypeScript)

Uma aplicação Node.js com TypeScript que calcula e retorna o plano de cultivo ideal baseado na potência do painel LED e no espaço disponível da tenda.

## 🎯 Funcionalidades

- **Cálculo de Plano Completo**: Analisa todas as 3 etapas do cultivo (germinação, vegetação e floração)
- **Validação Automática**: Verifica se os parâmetros são adequados
- **Consumo de Água**: Calcula consumo diário e por ciclo
- **Rendimento Estimado**: Projeta produção baseada nos parâmetros
- **Adequação de Potência**: Analisa se a potência é adequada para cada etapa
- **API REST**: Endpoints Express para integração com outras aplicações
- **Testes com Jest**: Suite completa de testes unitários
- **TypeScript**: Type-safe com tipagem completa

## 📊 Etapas do Cultivo

### Germinação (7 dias)
- Potência ideal: 300 W/m²
- 25 plantas por m²
- Consumo de água: 0.1 L/planta/dia

### Vegetação (21 dias)
- Potência ideal: 600 W/m²
- 9 plantas por m²
- Consumo de água: 0.3 L/planta/dia

### Floração (42 dias)
- Potência ideal: 900 W/m²
- 4 plantas por m²
- Consumo de água: 0.5 L/planta/dia

## 🚀 Como Usar

### 1. Instalação

```bash
npm install
```

### 2. Scripts Disponíveis

```bash
# Compilar TypeScript
npm run build

# Rodar demonstração
npm run demo

# Executar API (em desenvolvimento)
npm run dev

# Executar API (em produção)
npm run start

# Rodar testes
npm test

# Rodar testes em modo watch
npm run test:watch
```

### 3. Uso Direto (TypeScript)

```typescript
import { CalculadoraPlanoCultivo } from './src/calculadora';

// Criar calculadora com 1000W de painel e 2 m² de tenda
const calc = new CalculadoraPlanoCultivo(1000, 2.0);

// Calcular plano completo
const plano = calc.calcularPlanoCompleto();

// Ou calcular etapa específica
const germinacao = calc.calcularEtapa('germinacao');
```

### 4. API REST

Iniciar o servidor:

```bash
npm run dev
```

O servidor rodará em `http://localhost:5000`

#### Endpoints

**POST /api/plano-cultivo**

Calcula o plano de cultivo completo.

Request:
```json
{
  "potencia_painel_w": 1000,
  "espaco_tenda_m2": 2.0
}
```

Response:
```json
{
  "sucesso": true,
  "potencia_painel_w": 1000,
  "espaco_tenda_m2": 2.0,
  "potencia_por_m2": 500,
  "etapas": [
    {
      "etapa": "germinacao",
      "duracao_dias": 7,
      "potencia_necessaria_m2": 300,
      "potencia_disponivel_m2": 500,
      "adequacao_potencia": {
        "status": "excelente",
        "percentual": 100
      },
      "plantas_totais": 50,
      "plantas_por_m2": 25,
      "consumo_agua_diario_litros": 5,
      "consumo_agua_ciclo_litros": 35
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

**POST /api/etapa/{etapa}**

Calcula parâmetros de uma etapa específica.

Etapas válidas: `germinacao`, `vegetacao`, `floracao`

Request:
```json
{
  "potencia_painel_w": 1000,
  "espaco_tenda_m2": 2.0
}
```

**GET /health**

Verifica se a aplicação está funcionando.

```bash
curl http://localhost:5000/health
```

Response:
```json
{
  "status": "ok",
  "servico": "API de Plano de Cultivo"
}
```

## 🧪 Testes

Executar todos os testes:

```bash
npm test
```

Executar testes em modo watch (reexecuta ao salvar):

```bash
npm run test:watch
```

### Cobertura de Testes

A suite de testes cobre:
- ✅ Inicialização da calculadora
- ✅ Validação de parâmetros de entrada
- ✅ Cálculo por etapa (germinação, vegetação, floração)
- ✅ Consumo de água
- ✅ Adequação de potência
- ✅ Plano completo
- ✅ Casos de erro

Total: **14 testes** - Todos passando ✓

## 📁 Estrutura do Projeto

```
Grower/
├── src/
│   ├── config.ts              # Configurações e parâmetros de cultivo
│   ├── calculadora.ts         # Lógica principal de cálculo
│   ├── calculadora.test.ts    # Testes unitários com Jest
│   ├── api.ts                 # API REST com Express
│   └── demo.ts                # Script de demonstração
├── dist/                      # Código compilado (após npm run build)
├── package.json               # Dependências e scripts
├── tsconfig.json              # Configuração do TypeScript
├── jest.config.js             # Configuração do Jest
└── README.md                  # Este arquivo
```

## 📈 Exemplo de Uso Completo

```typescript
import { CalculadoraPlanoCultivo } from './src/calculadora';

// Cenário: Painel de 1200W em uma tenda de 3m²
const calc = new CalculadoraPlanoCultivo(1200, 3.0);

// Validar entrada
const validacao = calc.validarEntrada();
if (!validacao.valido) {
  console.log('Erros:', validacao.erros);
} else {
  // Obter plano completo
  const plano = calc.calcularPlanoCompleto();
  
  console.log(`Ciclo total: ${plano.resumo?.ciclo_total_dias} dias`);
  console.log(`Consumo de água: ${plano.resumo?.consumo_agua_total_litros} litros`);
  console.log(`Rendimento esperado: ${plano.resumo?.rendimento_estimado_gramas}g`);
  
  // Analisar cada etapa
  if (plano.etapas) {
    for (const etapa of plano.etapas) {
      console.log(`\n${etapa.etapa.toUpperCase()}`);
      console.log(`  Duração: ${etapa.duracao_dias} dias`);
      console.log(`  Plantas: ${etapa.plantas_totais}`);
      console.log(`  Adequação: ${etapa.adequacao_potencia.status}`);
    }
  }
}
```

## ⚙️ Requisitos Mínimos

- **Node.js**: v18 ou superior
- **npm**: v8 ou superior
- **Potência do painel**: 200 W/m² (mínimo)
- **Espaço da tenda**: > 0 m²

Caso os requisitos mínimos não sejam atendidos, a API retornará um erro de validação.

## 🛠️ Tecnologias Utilizadas

- **TypeScript**: Linguagem com tipos estáticos
- **Express**: Framework para API REST
- **Jest**: Framework de testes
- **ts-node**: Executor de TypeScript direto
- **ts-jest**: Integração Jest com TypeScript

## 📝 Notas

- O rendimento estimado é de 100g por planta na floração
- A densidade de plantas varia por etapa para otimizar espaço e recursos
- Os parâmetros podem ser ajustados no arquivo `src/config.ts`
- Todos os cálculos são feitos em tempo real
- A API é type-safe graças ao TypeScript

## 📦 Compilação

Para compilar o projeto TypeScript em JavaScript:

```bash
npm run build
```

Os arquivos compilados estarão em `dist/`.

## 🚀 Deploy

Para usar em produção:

```bash
# Compilar
npm run build

# Iniciar
npm start
```

Ou usando um gerenciador de processos como PM2:

```bash
pm2 start dist/api.js --name "grower-api"
```
