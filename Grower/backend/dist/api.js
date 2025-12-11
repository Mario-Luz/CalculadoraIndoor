"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const calculadora_1 = require("./calculadora");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// CORS configuration
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
app.post('/api/plano-cultivo', (req, res) => {
    try {
        const dados = req.body;
        if (!dados) {
            res.status(400).json({ erro: 'Nenhum dado fornecido' });
            return;
        }
        const { potencia_painel_w, espaco_tenda_m2 } = dados;
        if (potencia_painel_w === undefined || espaco_tenda_m2 === undefined) {
            res.status(400).json({
                erro: "Campos obrigatórios: 'potencia_painel_w' e 'espaco_tenda_m2'",
            });
            return;
        }
        const potencia = Number(potencia_painel_w);
        const espaco = Number(espaco_tenda_m2);
        if (isNaN(potencia) || isNaN(espaco)) {
            res
                .status(400)
                .json({ erro: 'Potência e espaço devem ser números válidos' });
            return;
        }
        const calculadora = new calculadora_1.CalculadoraPlanoCultivo(potencia, espaco);
        const plano = calculadora.calcularPlanoCompleto();
        res.status(200).json(plano);
    }
    catch (error) {
        res.status(500).json({ erro: String(error) });
    }
});
app.post('/api/etapa/:etapa', (req, res) => {
    try {
        const etapa = req.params.etapa;
        const dados = req.body;
        if (!dados) {
            res.status(400).json({ erro: 'Nenhum dado fornecido' });
            return;
        }
        const { potencia_painel_w, espaco_tenda_m2 } = dados;
        if (potencia_painel_w === undefined || espaco_tenda_m2 === undefined) {
            res.status(400).json({
                erro: "Campos obrigatórios: 'potencia_painel_w' e 'espaco_tenda_m2'",
            });
            return;
        }
        const potencia = Number(potencia_painel_w);
        const espaco = Number(espaco_tenda_m2);
        if (isNaN(potencia) || isNaN(espaco)) {
            res
                .status(400)
                .json({ erro: 'Potência e espaço devem ser números válidos' });
            return;
        }
        const calculadora = new calculadora_1.CalculadoraPlanoCultivo(potencia, espaco);
        const resultado = calculadora.calcularEtapa(etapa);
        if ('erro' in resultado) {
            res.status(400).json(resultado);
            return;
        }
        res.status(200).json(resultado);
    }
    catch (error) {
        res.status(500).json({ erro: String(error) });
    }
});
app.get('/health', (_req, res) => {
    res
        .status(200)
        .json({
        status: 'ok',
        servico: 'API de Plano de Cultivo',
    });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
exports.default = app;
//# sourceMappingURL=api.js.map