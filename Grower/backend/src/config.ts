// Configurações de cultivo
export const PARAMETROS_CULTIVO = {
  germinacao: {
    potencia_minima: 200,
    potencia_ideal: 300,
    dias: 7,
  },
  vegetacao: {
    potencia_minima: 400,
    potencia_ideal: 600,
    dias: 21,
  },
  floracao: {
    potencia_minima: 600,
    potencia_ideal: 900,
    dias: 42,
  },
} as const;

// Plantas por m²
export const PLANTAS_POR_M2 = {
  germinacao: 25,
  vegetacao: 9,
  floracao: 4,
} as const;

// Consumo de água (litros por planta por dia)
export const CONSUMO_AGUA = {
  germinacao: 0.1,
  vegetacao: 0.3,
  floracao: 0.5,
} as const;

// Multiplicador de consumo por tamanho de vaso (impacta volume de água por planta)
export const CONSUMO_AGUA_MULTIPLICADOR_VASO = {
  11: 1.2,
  15: 1.3,
  20: 1.4,
  30: 1.6,
  50: 1.8,
} as const;

// Rendimento esperado em gramas por planta
export const RENDIMENTO_POR_PLANTA = 100; // gramas

// Rendimento base por planta conforme tamanho do vaso (para ajuste fino de precisão)
export const RENDIMENTO_BASE_POR_VASO = {
  11: 100,
  15: 120,
  20: 140,
  30: 160,
  50: 220,
} as const;

// Tamanhos de vasos (litros) - para cálculo de plantas
export const TAMANHOS_VASO = {
  l11: 11,      // 11 litros
  l15: 15,      // 15 litros
  l20: 20,      // 20 litros
  l30: 30,      // 30 litros
  l50: 50,      // 50 litros
} as const;

// Densidade de plantas por litro de vaso (baseline simples)
export const PLANTAS_POR_LITRO_VASO = 1; // 1 planta por litro de vaso

// Eficiência típica de LED (µmol/J). Opcional para cálculos de PPFD/DLI.
export const EFICIENCIA_LED_UMOL_POR_J = 2.5;

// Fotoperíodo por etapa (horas/dia)
export const FOTOPERIODO_HORAS = {
  germinacao: 18,
  vegetacao: 18,
  floracao: 12,
} as const;

// Metas de PPFD por etapa (µmol/m²/s)
export const PPFD_META = {
  germinacao: 200,
  vegetacao: 400,
  floracao: 700,
} as const;

// Área típica ocupada por planta em m² conforme tamanho do vaso (aprox.)
export const AREA_POR_PLANTA_VASO_M2 = {
  11: 0.11,  // 11L (1m² / 0.11 ≈ 9)
  15: 0.14,  // 15L (~7 em 1m²)
  20: 0.20,  // 20L (fallback mais realista)
  30: 0.20,  // 30L (1m² / 0.20 = 5)
  50: 0.36,  // 50L (~2-3 em 1m²)
} as const;

// Lado mínimo (m) para cálculo em grade (colunas x linhas)
export const LADO_VASO_METROS = {
  11: 0.33,
  15: 0.38,
  20: 0.45,
  30: 0.50,
  50: 0.60,
} as const;