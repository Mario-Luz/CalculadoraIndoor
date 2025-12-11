import { CalculadoraPlanoCultivo } from './calculadora';

describe('CalculadoraPlanoCultivo', () => {
  test('inicializacao basica', () => {
    const calc = new CalculadoraPlanoCultivo(1000, 2.0);
    expect(calc.potencia_painel_w).toBe(1000);
    expect(calc.espaco_tenda_m2).toBe(2.0);
    expect(calc.potencia_por_m2).toBe(500);
  });

  test('validacao potencia zero', () => {
    const calc = new CalculadoraPlanoCultivo(0, 2.0);
    const resultado = calc.validarEntrada();
    expect(resultado.valido).toBe(false);
    expect(resultado.erros.some((e) =>
      e.includes('Potência do painel deve ser maior que 0W')
    )).toBe(true);
  });

  test('validacao espaco zero', () => {
    const calc = new CalculadoraPlanoCultivo(1000, 0);
    const resultado = calc.validarEntrada();
    expect(resultado.valido).toBe(false);
  });

  test('validacao potencia insuficiente', () => {
    // Agora aceita qualquer valor de potência
    const calc = new CalculadoraPlanoCultivo(100, 1.0);
    const resultado = calc.validarEntrada();
    expect(resultado.valido).toBe(true); // Potência 100W em 1m² agora é válida
  });

  test('calculo etapa germinacao', () => {
    const calc = new CalculadoraPlanoCultivo(1000, 2.0);
    const resultado = calc.calcularEtapa('germinacao');

    expect('erro' in resultado).toBe(false);
    if (!('erro' in resultado)) {
      expect(resultado.etapa).toBe('germinacao');
      expect(resultado.duracao_dias).toBe(7);
      expect(resultado.plantas_totais).toBe(50);
      expect(resultado.adequacao_potencia).toBeDefined();
    }
  });

  test('calculo etapa vegetacao', () => {
    const calc = new CalculadoraPlanoCultivo(1000, 2.0);
    const resultado = calc.calcularEtapa('vegetacao');

    expect('erro' in resultado).toBe(false);
    if (!('erro' in resultado)) {
      expect(resultado.etapa).toBe('vegetacao');
      expect(resultado.duracao_dias).toBe(21);
      expect(resultado.plantas_totais).toBe(18);
    }
  });

  test('calculo etapa floracao', () => {
    const calc = new CalculadoraPlanoCultivo(1000, 2.0);
    const resultado = calc.calcularEtapa('floracao');

    expect('erro' in resultado).toBe(false);
    if (!('erro' in resultado)) {
      expect(resultado.etapa).toBe('floracao');
      expect(resultado.duracao_dias).toBe(42);
      expect(resultado.plantas_totais).toBe(8);
    }
  });

  test('etapa invalida', () => {
    const calc = new CalculadoraPlanoCultivo(1000, 2.0);
    const resultado = calc.calcularEtapa('etapa_inexistente' as any);

    expect('erro' in resultado).toBe(true);
  });

  test('plano completo', () => {
    const calc = new CalculadoraPlanoCultivo(1000, 2.0);
    const plano = calc.calcularPlanoCompleto();

    expect(plano.sucesso).toBe(true);
    expect(plano.etapas).toHaveLength(3);
    expect(plano.resumo).toBeDefined();
    expect(plano.resumo!.ciclo_total_dias).toBe(70);
  });

  test('plano com parametros invalidos', () => {
    // Agora com validação removida, esse plano é válido
    const calc = new CalculadoraPlanoCultivo(100, 1.0);
    const plano = calc.calcularPlanoCompleto();

    expect(plano.sucesso).toBe(true);
    expect(plano.etapas).toHaveLength(3);
    expect(plano.resumo).toBeDefined();
  });

  test('consumo agua etapas', () => {
    const calc = new CalculadoraPlanoCultivo(1000, 2.0);

    const germinacao = calc.calcularEtapa('germinacao');
    const vegetacao = calc.calcularEtapa('vegetacao');
    const floracao = calc.calcularEtapa('floracao');

    expect('erro' in germinacao).toBe(false);
    expect('erro' in vegetacao).toBe(false);
    expect('erro' in floracao).toBe(false);

    if (
      !('erro' in germinacao) &&
      !('erro' in vegetacao) &&
      !('erro' in floracao)
    ) {
      expect(germinacao.consumo_agua_ciclo_litros).toBeCloseTo(35.0, 1);
      expect(vegetacao.consumo_agua_ciclo_litros).toBeCloseTo(113.4, 1);
      expect(floracao.consumo_agua_ciclo_litros).toBeCloseTo(168.0, 1);
    }
  });

  test('adequacao potencia insuficiente', () => {
    const calc = new CalculadoraPlanoCultivo(300, 2.0);
    const resultado = calc.calcularEtapa('germinacao');

    expect('erro' in resultado).toBe(false);
    if (!('erro' in resultado)) {
      const adequacao = resultado.adequacao_potencia!;
      expect(adequacao.status).toBe('insuficiente');
      expect(adequacao.percentual).toBeLessThan(100);
    }
  });

  test('adequacao potencia excelente', () => {
    const calc = new CalculadoraPlanoCultivo(2000, 2.0);
    const resultado = calc.calcularEtapa('floracao');

    expect('erro' in resultado).toBe(false);
    if (!('erro' in resultado)) {
      const adequacao = resultado.adequacao_potencia!;
      expect(['adequada', 'excelente']).toContain(adequacao.status);
    }
  });

  test('resumo rendimento', () => {
    const calc = new CalculadoraPlanoCultivo(1000, 2.0);
    const plano = calc.calcularPlanoCompleto();

    expect(plano.resumo!.rendimento_estimado_gramas).toBe(800);
    expect(plano.resumo!.rendimento_por_m2_gramas).toBe(400.0);
  });

  test('calculo plantas por vaso', () => {
    const calc = new CalculadoraPlanoCultivo(1000, 2.0, 5); // 5 litros
    const plantasPorVaso = calc.calcularPlantasPorVaso();
    expect(plantasPorVaso).toBe(5); // 1 planta por litro
  });

  test('plantas recomendadas com vaso', () => {
    const calc = new CalculadoraPlanoCultivo(1000, 2.0, 11); // 11 litros
    const plantasRecomendadas = calc.calcularPlantasRecomendadas();
    expect(plantasRecomendadas).toBeGreaterThan(0);
  });

  test('plano completo com tamanho vaso', () => {
    const calc = new CalculadoraPlanoCultivo(1000, 2.0, 5);
    const plano = calc.calcularPlanoCompleto();

    expect(plano.sucesso).toBe(true);
    expect(plano.tamanho_vaso_litros).toBe(5);
    expect(plano.plantas_recomendadas).toBeGreaterThan(0);
  });
});
