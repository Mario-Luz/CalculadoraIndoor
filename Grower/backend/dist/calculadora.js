"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculadoraPlanoCultivo = void 0;
const config_1 = require("./config");
class CalculadoraPlanoCultivo {
    constructor(potencia_painel_w, espaco_tenda_m2) {
        this.potencia_painel_w = potencia_painel_w;
        this.espaco_tenda_m2 = espaco_tenda_m2;
        this.potencia_por_m2 =
            espaco_tenda_m2 > 0 ? potencia_painel_w / espaco_tenda_m2 : 0;
    }
    validarEntrada() {
        const erros = [];
        if (this.potencia_painel_w <= 0) {
            erros.push('Potência do painel deve ser maior que 0W');
        }
        if (this.espaco_tenda_m2 <= 0) {
            erros.push('Espaço da tenda deve ser maior que 0m²');
        }
        if (this.potencia_por_m2 < 200) {
            erros.push(`Potência insuficiente (${this.potencia_por_m2.toFixed(1)} W/m²). Mínimo recomendado: 200 W/m²`);
        }
        return {
            valido: erros.length === 0,
            erros,
        };
    }
    calcularEtapa(etapa) {
        const etapas = ['germinacao', 'vegetacao', 'floracao'];
        if (!etapas.includes(etapa)) {
            return { erro: `Etapa '${etapa}' não reconhecida` };
        }
        const params = config_1.PARAMETROS_CULTIVO[etapa];
        const plantas_por_m2 = config_1.PLANTAS_POR_M2[etapa];
        const consumo_agua = config_1.CONSUMO_AGUA[etapa];
        const total_plantas = Math.floor(this.espaco_tenda_m2 * plantas_por_m2);
        const agua_por_dia = total_plantas * consumo_agua;
        const agua_por_ciclo = agua_por_dia * params.dias;
        const adequacao = this.calcularAdequacao(this.potencia_por_m2, params.potencia_minima, params.potencia_ideal);
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
        };
    }
    calcularAdequacao(potencia_atual, minima, ideal) {
        let percentual;
        let status;
        if (potencia_atual < minima) {
            percentual = (potencia_atual / minima) * 100;
            status = 'insuficiente';
        }
        else if (potencia_atual < ideal) {
            percentual = (potencia_atual / ideal) * 100;
            status = 'adequada';
        }
        else {
            percentual = 100;
            status = 'excelente';
        }
        return {
            status,
            percentual: Math.round(percentual * 100) / 100,
        };
    }
    calcularResumoCompleto() {
        const etapas = ['germinacao', 'vegetacao', 'floracao'];
        const dias_totais = etapas.reduce((sum, etapa) => sum + config_1.PARAMETROS_CULTIVO[etapa].dias, 0);
        let agua_total = 0;
        for (const etapa of etapas) {
            const consumo = config_1.CONSUMO_AGUA[etapa];
            const plantas = Math.floor(this.espaco_tenda_m2 * config_1.PLANTAS_POR_M2[etapa]);
            const dias = config_1.PARAMETROS_CULTIVO[etapa].dias;
            agua_total += plantas * consumo * dias;
        }
        const plantas_finais = Math.floor(this.espaco_tenda_m2 * config_1.PLANTAS_POR_M2['floracao']);
        const rendimento_estimado = plantas_finais * config_1.RENDIMENTO_POR_PLANTA;
        return {
            ciclo_total_dias: dias_totais,
            consumo_agua_total_litros: Math.round(agua_total * 100) / 100,
            plantas_finais,
            rendimento_estimado_gramas: rendimento_estimado,
            rendimento_por_m2_gramas: Math.round((rendimento_estimado / this.espaco_tenda_m2) * 100) / 100,
        };
    }
    calcularPlanoCompleto() {
        const validacao = this.validarEntrada();
        if (!validacao.valido) {
            return {
                sucesso: false,
                erros: validacao.erros,
            };
        }
        const etapas = ['germinacao', 'vegetacao', 'floracao'];
        const plano = {
            sucesso: true,
            potencia_painel_w: this.potencia_painel_w,
            espaco_tenda_m2: this.espaco_tenda_m2,
            potencia_por_m2: Math.round(this.potencia_por_m2 * 100) / 100,
            etapas: [],
            resumo: this.calcularResumoCompleto(),
        };
        for (const etapa of etapas) {
            const resultado = this.calcularEtapa(etapa);
            if (!('erro' in resultado)) {
                plano.etapas.push(resultado);
            }
        }
        return plano;
    }
}
exports.CalculadoraPlanoCultivo = CalculadoraPlanoCultivo;
//# sourceMappingURL=calculadora.js.map