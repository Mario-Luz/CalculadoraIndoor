import { CalculadoraPlanoCultivo } from './calculadora';

function exibirResultado(titulo: string, dados: any): void {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`  ${titulo}`);
  console.log(`${'='.repeat(70)}\n`);
  console.log(JSON.stringify(dados, null, 2));
}

function demonstracaoCompleta(): void {
  console.log('\n' + '='.repeat(70));
  console.log('  🌱 DEMONSTRAÇÃO - CALCULADORA DE PLANO DE CULTIVO');
  console.log('='.repeat(70));

  // Cenário 1: Configuração ideal
  console.log(
    '\n\n📊 CENÁRIO 1: Painel de 1000W em tenda de 2m² com vaso de 11L'
  );
  const calc1 = new CalculadoraPlanoCultivo(1000, 2.0, 11);
  const plano1 = calc1.calcularPlanoCompleto();
  exibirResultado('Plano Completo', plano1);

  // Cenário 2: Painel mais potente
  console.log(
    '\n\n📊 CENÁRIO 2: Painel de 1600W em tenda de 2m² com vaso de 5L'
  );
  const calc2 = new CalculadoraPlanoCultivo(1600, 2.0, 5);
  const plano2 = calc2.calcularPlanoCompleto();
  exibirResultado('Plano Completo', plano2);

  // Cenário 3: Tenda maior
  console.log(
    '\n\n📊 CENÁRIO 3: Painel de 1200W em tenda de 3m² com vaso de 20L'
  );
  const calc3 = new CalculadoraPlanoCultivo(1200, 3.0, 20);
  const plano3 = calc3.calcularPlanoCompleto();
  exibirResultado('Plano Completo', plano3);

  // Cenário 4: Potência insuficiente
  console.log(
    '\n\n📊 CENÁRIO 4: Painel de 200W em tenda de 2m² com vaso de 2L'
  );
  const calc4 = new CalculadoraPlanoCultivo(200, 2.0, 2);
  const plano4 = calc4.calcularPlanoCompleto();
  exibirResultado('Plano Completo', plano4);

  // Resumo comparativo
  console.log('\n\n' + '='.repeat(70));
  console.log('  📈 RESUMO COMPARATIVO DOS CENÁRIOS');
  console.log('='.repeat(70) + '\n');

  const cenarios: Array<[string, any]> = [
    ['Cenário 1 (1000W, 2m²)', plano1],
    ['Cenário 2 (1600W, 2m²)', plano2],
    ['Cenário 3 (1200W, 3m²)', plano3],
    ['Cenário 4 (200W, 2m²)', plano4],
  ];

  console.log(
    `${'Cenário'.padEnd(25)} ${'Status'.padEnd(15)} ${'Rendimento (g)'.padEnd(20)} ${'Ciclo (dias)'.padEnd(15)}`
  );
  console.log('-'.repeat(75));

  for (const [nome, plano] of cenarios) {
    let status: string;
    let rendimento: string;
    let ciclo: string;

    if (plano.sucesso) {
      rendimento = plano.resumo.rendimento_estimado_gramas.toString();
      ciclo = plano.resumo.ciclo_total_dias.toString();
      status = '✓ Válido';
    } else {
      rendimento = 'N/A';
      ciclo = 'N/A';
      status = '✗ Inválido';
    }

    console.log(
      `${nome.padEnd(25)} ${status.padEnd(15)} ${rendimento.padEnd(20)} ${ciclo.padEnd(15)}`
    );
  }

  // Análise detalhada do Cenário 1
  console.log('\n\n' + '='.repeat(70));
  console.log('  🔍 ANÁLISE DETALHADA - CENÁRIO 1 (1000W, 2m²)');
  console.log('='.repeat(70));

  const calc = new CalculadoraPlanoCultivo(1000, 2.0);

  console.log(`\n📋 INFORMAÇÕES GERAIS:`);
  console.log(`  • Potência do painel: 1000W`);
  console.log(`  • Espaço da tenda: 2.0m²`);
  console.log(`  • Potência por m²: ${calc.potencia_por_m2}W/m²`);

  const etapas: Array<'germinacao' | 'vegetacao' | 'floracao'> = [
    'germinacao',
    'vegetacao',
    'floracao',
  ];

  for (const etapa of etapas) {
    const resultado = calc.calcularEtapa(etapa);
    if (!('erro' in resultado)) {
      const res = resultado as any;
      console.log(`\n🌿 ETAPA: ${res.etapa.toUpperCase()}`);
      console.log(`  • Duração: ${res.duracao_dias} dias`);
      console.log(`  • Plantas totais: ${res.plantas_totais} unidades`);
      console.log(`  • Densidade: ${res.plantas_por_m2} plantas/m²`);
      console.log(
        `  • Potência necessária: ${res.potencia_necessaria_m2}W/m²`
      );
      console.log(
        `  • Potência disponível: ${res.potencia_disponivel_m2}W/m²`
      );
      console.log(
        `  • Adequação: ${res.adequacao_potencia.status} (${res.adequacao_potencia.percentual}%)`
      );
      console.log(
        `  • Consumo diário: ${res.consumo_agua_diario_litros}L/dia`
      );
      console.log(`  • Consumo do ciclo: ${res.consumo_agua_ciclo_litros}L`);
    }
  }

  const plano = calc.calcularPlanoCompleto();
  if (plano.sucesso && plano.resumo) {
    const resumo = plano.resumo;

    console.log(`\n📊 RESUMO FINAL:`);
    console.log(`  • Ciclo completo: ${resumo.ciclo_total_dias} dias`);
    console.log(`  • Consumo total de água: ${resumo.consumo_agua_total_litros}L`);
    console.log(`  • Plantas na colheita: ${resumo.plantas_finais} unidades`);
    console.log(`  • Rendimento total: ${resumo.rendimento_estimado_gramas}g`);
    console.log(
      `  • Rendimento por m²: ${resumo.rendimento_por_m2_gramas}g/m²`
    );
  }

  console.log('\n' + '='.repeat(70) + '\n');
}

demonstracaoCompleta();
