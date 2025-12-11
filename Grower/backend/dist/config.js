"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RENDIMENTO_POR_PLANTA = exports.CONSUMO_AGUA = exports.PLANTAS_POR_M2 = exports.PARAMETROS_CULTIVO = void 0;
// Configurações de cultivo
exports.PARAMETROS_CULTIVO = {
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
};
// Plantas por m²
exports.PLANTAS_POR_M2 = {
    germinacao: 25,
    vegetacao: 9,
    floracao: 4,
};
// Consumo de água (litros por planta por dia)
exports.CONSUMO_AGUA = {
    germinacao: 0.1,
    vegetacao: 0.3,
    floracao: 0.5,
};
// Rendimento esperado em gramas por planta
exports.RENDIMENTO_POR_PLANTA = 100; // gramas
//# sourceMappingURL=config.js.map