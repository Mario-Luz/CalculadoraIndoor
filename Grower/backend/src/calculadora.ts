import {
  PARAMETROS_CULTIVO,
  PLANTAS_POR_M2,
  CONSUMO_AGUA,
  RENDIMENTO_POR_PLANTA,
  TAMANHOS_VASO,
  PLANTAS_POR_LITRO_VASO,
  EFICIENCIA_LED_UMOL_POR_J,
  FOTOPERIODO_HORAS,
  PPFD_META,
  AREA_POR_PLANTA_VASO_M2,
  CONSUMO_AGUA_MULTIPLICADOR_VASO,
  RENDIMENTO_BASE_POR_VASO,
  LADO_VASO_METROS,
} from './config';

type Etapa = 'germinacao' | 'vegetacao' | 'floracao';

interface Adequacao {
  status: 'insuficiente' | 'adequada' | 'excelente';
  percentual: number;
}

interface ResultadoEtapa {
  etapa: Etapa;
  duracao_dias: number;
  potencia_necessaria_m2: number;
  potencia_disponivel_m2: number;
  adequacao_potencia: Adequacao;
  plantas_totais: number;
  plantas_por_m2: number;
  consumo_agua_diario_litros: number;
  consumo_agua_ciclo_litros: number;
  // Novos campos informativos
  ppfd_meta_umol_m2_s?: number;
  ppfd_estimado_umol_m2_s?: number;
  dli_estimado_mol_m2_dia?: number;
}

interface Resumo {
  ciclo_total_dias: number;
  consumo_agua_total_litros: number;
  plantas_finais: number;
  rendimento_estimado_gramas: number; // base (compatibilidade)
  rendimento_por_m2_gramas: number;   // base (compatibilidade)
  // Novos campos
  energia_total_kwh?: number;
  potencia_ideal_total_w?: number;
  rendimento_ajustado_gramas?: number;
  rendimento_ajustado_por_m2_gramas?: number;
  plantas_finais_ajustadas?: number;
}

interface ValidacaoResultado {
  valido: boolean;
  erros: string[];
}

interface PlanoCompleto {
  sucesso: boolean;
  potencia_painel_w?: number;
  espaco_tenda_m2?: number;
  potencia_por_m2?: number;
  tamanho_vaso_litros?: number;
  plantas_recomendadas?: number;
  etapas?: ResultadoEtapa[];
  resumo?: Resumo;
  erros?: string[];
}

interface ResultadoEtapaOuErro extends Partial<ResultadoEtapa> {
  erro?: string;
}

export class CalculadoraPlanoCultivo {
  potencia_painel_w: number;
  espaco_tenda_m2: number;
  potencia_por_m2: number;
  tamanho_vaso_litros: number;
  eficiencia_led_umol_j: number;
  largura_m?: number;
  comprimento_m?: number;

  constructor(
    potencia_painel_w: number,
    espaco_tenda_m2: number,
    tamanho_vaso_litros: number = 11,
    eficiencia_led_umol_j: number = EFICIENCIA_LED_UMOL_POR_J,
    largura_m?: number,
    comprimento_m?: number,
  ) {
    this.potencia_painel_w = potencia_painel_w;
    this.espaco_tenda_m2 = espaco_tenda_m2;
    this.tamanho_vaso_litros = tamanho_vaso_litros;
    this.eficiencia_led_umol_j = eficiencia_led_umol_j || EFICIENCIA_LED_UMOL_POR_J;
    this.largura_m = largura_m;
    this.comprimento_m = comprimento_m;
    this.potencia_por_m2 =
      espaco_tenda_m2 > 0 ? potencia_painel_w / espaco_tenda_m2 : 0;
  }

  // Método para calcular plantas baseado no tamanho do vaso (legacy - não usado no novo modelo)
  calcularPlantasPorVaso(): number {
    return Math.floor(this.tamanho_vaso_litros * PLANTAS_POR_LITRO_VASO);
  }

  // Capacidade por grade quando dimensões são conhecidas
  private capacidadePorGrade(): number | null {
    if (!this.largura_m || !this.comprimento_m) return null;
    const lado = LADO_VASO_METROS[this.tamanho_vaso_litros as keyof typeof LADO_VASO_METROS];
    if (!lado || lado <= 0) return null;
    const colunas = Math.floor(this.largura_m / lado);
    const linhas = Math.floor(this.comprimento_m / lado);
    const capacidade = colunas * linhas;
    return capacidade > 0 ? capacidade : 0;
  }

  // Método para obter plantas recomendadas: usa grade se dimensões, senão fallback por área
  calcularPlantasRecomendadas(): number {
    const porGrade = this.capacidadePorGrade();
    if (porGrade !== null) return Math.max(1, porGrade);
    const espacoDisponivel = this.espaco_tenda_m2;
    const areaPorVaso = AREA_POR_PLANTA_VASO_M2[this.tamanho_vaso_litros as keyof typeof AREA_POR_PLANTA_VASO_M2] || 0.11;
    const porArea = Math.floor(espacoDisponivel / areaPorVaso);
    return Math.max(1, porArea);
  }

  validarEntrada(): ValidacaoResultado {
    const erros: string[] = [];

    if (this.potencia_painel_w <= 0) {
      erros.push('Potência do painel deve ser maior que 0W');
    }

    if (this.espaco_tenda_m2 <= 0) {
      erros.push('Espaço da tenda deve ser maior que 0m²');
    }

    return {
      valido: erros.length === 0,
      erros,
    };
  }

  calcularEtapa(etapa: Etapa): ResultadoEtapaOuErro {
    const etapas: Etapa[] = ['germinacao', 'vegetacao', 'floracao'];

    if (!etapas.includes(etapa)) {
      return { erro: `Etapa '${etapa}' não reconhecida` };
    }

    const params = PARAMETROS_CULTIVO[etapa];
    const plantas_por_m2 = PLANTAS_POR_M2[etapa];
    const consumo_agua = CONSUMO_AGUA[etapa];

    // Usar grade quando possível; senão, fallback por área
    const porGrade = this.capacidadePorGrade();
    let total_plantas = 0;
    if (porGrade !== null) {
      total_plantas = Math.max(1, porGrade);
    } else {
      const areaPorVaso = AREA_POR_PLANTA_VASO_M2[this.tamanho_vaso_litros as keyof typeof AREA_POR_PLANTA_VASO_M2] || 0.11;
      total_plantas = Math.max(1, Math.floor(this.espaco_tenda_m2 / areaPorVaso));
    }
    const multVasoEtapa = CONSUMO_AGUA_MULTIPLICADOR_VASO[this.tamanho_vaso_litros as keyof typeof CONSUMO_AGUA_MULTIPLICADOR_VASO] || 1.0;
    const agua_por_dia = total_plantas * consumo_agua * multVasoEtapa;
    const agua_por_ciclo = agua_por_dia * params.dias;

    const adequacao = this.calcularAdequacao(
      this.potencia_por_m2,
      params.potencia_minima,
      params.potencia_ideal
    );

    // Cálculo estimado de PPFD e DLI com base em eficiência e potência por m²
    const ppfdEstimado = Math.round((this.potencia_por_m2 * this.eficiencia_led_umol_j) * 100) / 100; // µmol/m²/s
    const fotoperiodo = FOTOPERIODO_HORAS[etapa];
    const dliEstimado = Math.round(((ppfdEstimado * 3600 * fotoperiodo) / 1_000_000) * 100) / 100; // mol/m²/dia

    return {
      etapa,
      duracao_dias: params.dias,
      potencia_necessaria_m2: params.potencia_ideal,
      potencia_disponivel_m2: Math.round(this.potencia_por_m2 * 100) / 100,
      adequacao_potencia: adequacao,
      plantas_totais: total_plantas,
      plantas_por_m2,
      consumo_agua_diario_litros: Math.round(agua_por_dia * 100) / 100,
      consumo_agua_ciclo_litros: Math.round(agua_por_ciclo * 100) / 100,
      ppfd_meta_umol_m2_s: PPFD_META[etapa],
      ppfd_estimado_umol_m2_s: ppfdEstimado,
      dli_estimado_mol_m2_dia: dliEstimado,
    };
  }

  private calcularAdequacao(
    potencia_atual: number,
    minima: number,
    ideal: number
  ): Adequacao {
    let percentual: number;
    let status: 'insuficiente' | 'adequada' | 'excelente';

    if (potencia_atual < minima) {
      percentual = (potencia_atual / minima) * 100;
      status = 'insuficiente';
    } else if (potencia_atual < ideal) {
      percentual = (potencia_atual / ideal) * 100;
      status = 'adequada';
    } else {
      percentual = 100;
      status = 'excelente';
    }

    return {
      status,
      percentual: Math.round(percentual * 100) / 100,
    };
  }

  private calcularResumoCompleto(): Resumo {
    const etapas: Etapa[] = ['germinacao', 'vegetacao', 'floracao'];

    const dias_totais = etapas.reduce(
      (sum, etapa) => sum + PARAMETROS_CULTIVO[etapa].dias,
      0
    );

    let agua_total = 0;
    let energia_total_kwh = 0;

    for (const etapa of etapas) {
      const consumo = CONSUMO_AGUA[etapa];
      const plantas = Math.floor(
        this.espaco_tenda_m2 * PLANTAS_POR_M2[etapa]
      );
      const dias = PARAMETROS_CULTIVO[etapa].dias;
      const multVasoResumo = CONSUMO_AGUA_MULTIPLICADOR_VASO[this.tamanho_vaso_litros as keyof typeof CONSUMO_AGUA_MULTIPLICADOR_VASO] || 1.0;
      agua_total += plantas * consumo * multVasoResumo * dias;

      // Energia total estimada por etapa (kWh): Potência total (kW) * horas/dia * dias
      const horasDia = FOTOPERIODO_HORAS[etapa];
      const potenciaTotalKW = (this.potencia_painel_w / 1000);
      energia_total_kwh += potenciaTotalKW * horasDia * dias;
    }

    // Plantas finais base por densidade de floração
    // Plantas finais: usa grade se dimensões disponíveis, senão por área
    const porGrade = this.capacidadePorGrade();
    let plantas_finais = 0;
    if (porGrade !== null) {
      plantas_finais = Math.max(1, porGrade);
    } else {
      const areaPorVaso = AREA_POR_PLANTA_VASO_M2[this.tamanho_vaso_litros as keyof typeof AREA_POR_PLANTA_VASO_M2] || 0.11;
      plantas_finais = Math.max(1, Math.floor(this.espaco_tenda_m2 / areaPorVaso));
    }
    const plantas_finais_ajustadas = plantas_finais;

    // Ajuste de rendimento baseado na adequação na floração
    const adequacaoFlor = this.calcularAdequacao(
      this.potencia_por_m2,
      PARAMETROS_CULTIVO.floracao.potencia_minima,
      PARAMETROS_CULTIVO.floracao.potencia_ideal
    );

    const fatorAjusteRendimento = adequacaoFlor.status === 'excelente'
      ? 1
      : adequacaoFlor.status === 'adequada'
        ? Math.max(0.7, adequacaoFlor.percentual / 100)
        : Math.max(0.4, adequacaoFlor.percentual / 100);

    const rendimento_estimado_base = plantas_finais * RENDIMENTO_POR_PLANTA;
    const rendimento_base_por_vaso = RENDIMENTO_BASE_POR_VASO[this.tamanho_vaso_litros as keyof typeof RENDIMENTO_BASE_POR_VASO] || RENDIMENTO_POR_PLANTA;
    const rendimento_ajustado = Math.round((plantas_finais_ajustadas * rendimento_base_por_vaso) * fatorAjusteRendimento);

    // Potência ideal total (W) para meta da etapa final (900W/m²)
    const potencia_ideal_total_w = PARAMETROS_CULTIVO.floracao.potencia_ideal * this.espaco_tenda_m2;

    return {
      ciclo_total_dias: dias_totais,
      consumo_agua_total_litros: Math.round(agua_total * 100) / 100,
      plantas_finais,
      // Mantém compatibilidade com testes existentes (valores base)
      rendimento_estimado_gramas: rendimento_estimado_base,
      rendimento_por_m2_gramas:
        Math.round((rendimento_estimado_base / this.espaco_tenda_m2) * 100) / 100,
      // Novas métricas
      energia_total_kwh: Math.round(energia_total_kwh * 100) / 100,
      potencia_ideal_total_w: Math.round(potencia_ideal_total_w),
      rendimento_ajustado_gramas: rendimento_ajustado,
      rendimento_ajustado_por_m2_gramas:
        Math.round((rendimento_ajustado / this.espaco_tenda_m2) * 100) / 100,
      plantas_finais_ajustadas,
    };
  }

  calcularPlanoCompleto(): PlanoCompleto {
    const validacao = this.validarEntrada();

    if (!validacao.valido) {
      return {
        sucesso: false,
        erros: validacao.erros,
      };
    }

    const etapas: Etapa[] = ['germinacao', 'vegetacao', 'floracao'];

    const plano: PlanoCompleto = {
      sucesso: true,
      potencia_painel_w: this.potencia_painel_w,
      espaco_tenda_m2: this.espaco_tenda_m2,
      potencia_por_m2: Math.round(this.potencia_por_m2 * 100) / 100,
      tamanho_vaso_litros: this.tamanho_vaso_litros,
      plantas_recomendadas: this.calcularPlantasRecomendadas(),
      etapas: [],
      resumo: this.calcularResumoCompleto(),
    };

    for (const etapa of etapas) {
      const resultado = this.calcularEtapa(etapa);
      if (!('erro' in resultado)) {
        plano.etapas!.push(resultado as ResultadoEtapa);
      }
    }

    return plano;
  }
}
