import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { z } from 'zod';
import { CalculadoraPlanoCultivo } from './calculadora';

dotenv.config();

const app = express();

// Middlewares básicos
app.use(express.json());
app.use(helmet());
app.use(compression());

// CORS configurável via ambiente
const ALLOWED_ORIGIN = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: ALLOWED_ORIGIN === '*' ? true : ALLOWED_ORIGIN }));

// Rate limit básico (proteção contra abuso)
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000), // 1 min
  max: Number(process.env.RATE_LIMIT_MAX || 120), // 120 req/min por IP
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Swagger (OpenAPI)
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Grower API',
      version: '1.0.0',
      description: 'API para cálculo de plano de cultivo',
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 5000}` },
    ],
  },
  apis: [],
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

interface RequisicaoPlanoCultivo {
  potencia_painel_w?: number;
  espaco_tenda_m2?: number;
  tamanho_vaso_litros?: number;
  eficiencia_led_umol_j?: number;
  largura_m?: number;
  comprimento_m?: number;
}

// Schemas de validação (zod)
const PlanoCultivoSchema = z.object({
  potencia_painel_w: z.number().positive({ message: 'Potência deve ser maior que 0' }),
  espaco_tenda_m2: z.number().positive({ message: 'Espaço deve ser maior que 0' }),
  tamanho_vaso_litros: z.number().positive({ message: 'Tamanho do vaso deve ser maior que 0' }).default(11),
  eficiencia_led_umol_j: z.number().positive({ message: 'Eficiência do LED deve ser > 0' }).optional(),
  largura_m: z.number().positive().optional(),
  comprimento_m: z.number().positive().optional(),
});

 type PlanoCultivoInput = z.infer<typeof PlanoCultivoSchema>;

app.post('/api/plano-cultivo', (req: Request<{}, {}, RequisicaoPlanoCultivo>, res: Response) => {
  try {
    const dados = req.body;

    if (!dados) {
      res.status(400).json({ erro: 'Nenhum dado fornecido' });
      return;
    }

    // Normaliza tipos numéricos (caso venham como string)
    const normalizado: PlanoCultivoInput = {
      potencia_painel_w: Number(dados.potencia_painel_w),
      espaco_tenda_m2: Number(dados.espaco_tenda_m2),
      tamanho_vaso_litros: dados.tamanho_vaso_litros !== undefined ? Number(dados.tamanho_vaso_litros) : 11,
      eficiencia_led_umol_j: dados.eficiencia_led_umol_j !== undefined ? Number(dados.eficiencia_led_umol_j) : undefined,
      largura_m: dados.largura_m !== undefined ? Number(dados.largura_m) : undefined,
      comprimento_m: dados.comprimento_m !== undefined ? Number(dados.comprimento_m) : undefined,
    } as PlanoCultivoInput;

    const parse = PlanoCultivoSchema.safeParse(normalizado);
    if (!parse.success) {
      const erros = parse.error.issues.map(i => i.message);
      res.status(400).json({ erro: 'Parâmetros inválidos', detalhes: erros });
      return;
    }

    const { potencia_painel_w, espaco_tenda_m2, tamanho_vaso_litros, eficiencia_led_umol_j, largura_m, comprimento_m } = parse.data;

    const calculadora = new CalculadoraPlanoCultivo(potencia_painel_w, espaco_tenda_m2, tamanho_vaso_litros, eficiencia_led_umol_j, largura_m, comprimento_m);
    const plano = calculadora.calcularPlanoCompleto();

    res.status(200).json(plano);
  } catch (error) {
    res.status(500).json({ erro: String(error) });
  }
});

app.post(
  '/api/etapa/:etapa',
  (
    req: Request<
      { etapa?: string },
      {},
      RequisicaoPlanoCultivo
    >,
    res: Response
  ) => {
    try {
      const etapa = req.params.etapa as any;
      const dados = req.body;

      if (!dados) {
        res.status(400).json({ erro: 'Nenhum dado fornecido' });
        return;
      }

      const normalizado: PlanoCultivoInput = {
        potencia_painel_w: Number(dados.potencia_painel_w),
        espaco_tenda_m2: Number(dados.espaco_tenda_m2),
        tamanho_vaso_litros: dados.tamanho_vaso_litros !== undefined ? Number(dados.tamanho_vaso_litros) : 11,
        eficiencia_led_umol_j: dados.eficiencia_led_umol_j !== undefined ? Number(dados.eficiencia_led_umol_j) : undefined,
        largura_m: dados.largura_m !== undefined ? Number(dados.largura_m) : undefined,
        comprimento_m: dados.comprimento_m !== undefined ? Number(dados.comprimento_m) : undefined,
      } as PlanoCultivoInput;

      const parse = PlanoCultivoSchema.safeParse(normalizado);
      if (!parse.success) {
        const erros = parse.error.issues.map(i => i.message);
        res.status(400).json({ erro: 'Parâmetros inválidos', detalhes: erros });
        return;
      }

      const { potencia_painel_w, espaco_tenda_m2, tamanho_vaso_litros, eficiencia_led_umol_j, largura_m, comprimento_m } = parse.data;

      const calculadora = new CalculadoraPlanoCultivo(potencia_painel_w, espaco_tenda_m2, tamanho_vaso_litros, eficiencia_led_umol_j, largura_m, comprimento_m);
      const resultado = calculadora.calcularEtapa(etapa);

      if ('erro' in resultado) {
        res.status(400).json(resultado);
        return;
      }

      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ erro: String(error) });
    }
  }
);

app.get('/health', (_req: Request, res: Response) => {
  res
    .status(200)
    .json({
      status: 'ok',
      servico: 'API de Plano de Cultivo',
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Servidor rodando em http://localhost:${PORT} | Docs: http://localhost:${PORT}/docs`
  );
});

export default app;
