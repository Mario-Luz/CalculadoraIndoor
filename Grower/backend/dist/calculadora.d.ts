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
}
interface Resumo {
    ciclo_total_dias: number;
    consumo_agua_total_litros: number;
    plantas_finais: number;
    rendimento_estimado_gramas: number;
    rendimento_por_m2_gramas: number;
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
    etapas?: ResultadoEtapa[];
    resumo?: Resumo;
    erros?: string[];
}
interface ResultadoEtapaOuErro extends Partial<ResultadoEtapa> {
    erro?: string;
}
export declare class CalculadoraPlanoCultivo {
    potencia_painel_w: number;
    espaco_tenda_m2: number;
    potencia_por_m2: number;
    constructor(potencia_painel_w: number, espaco_tenda_m2: number);
    validarEntrada(): ValidacaoResultado;
    calcularEtapa(etapa: Etapa): ResultadoEtapaOuErro;
    private calcularAdequacao;
    private calcularResumoCompleto;
    calcularPlanoCompleto(): PlanoCompleto;
}
export {};
//# sourceMappingURL=calculadora.d.ts.map