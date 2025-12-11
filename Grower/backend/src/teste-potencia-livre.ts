// Teste rápido para validar que qualquer potência é permitida
import { CalculadoraPlanoCultivo } from './calculadora';

console.log('🧪 TESTE: Qualquer valor é permitido na potência');
console.log('='.repeat(60));

const testCases = [
  // Potências predefinidas
  { potencia: 60, espaco: 1.0, descricao: 'LED 60W' },
  { potencia: 120, espaco: 1.0, descricao: 'LED 120W' },
  { potencia: 240, espaco: 1.0, descricao: 'LED 240W' },
  { potencia: 480, espaco: 2.0, descricao: 'LED 480W' },
  { potencia: 720, espaco: 2.0, descricao: 'LED 720W' },
  { potencia: 820, espaco: 3.0, descricao: 'LED 820W' },
  
  // Combinações com tendas predefinidas
  { potencia: 720, espaco: 0.24, descricao: 'Tenda 60x40x40 (0.24m²) + 720W' },
  { potencia: 240, espaco: 0.16, descricao: 'Tenda 40x40x140 (0.16m²) + 240W' },
  { potencia: 480, espaco: 0.36, descricao: 'Tenda 60x60x160 (0.36m²) + 480W' },
  { potencia: 720, espaco: 0.64, descricao: 'Tenda 80x80x180 (0.64m²) + 720W' },
  { potencia: 720, espaco: 1.0, descricao: 'Tenda 100x100x200 (1.0m²) + 720W' },
  { potencia: 820, espaco: 1.44, descricao: 'Tenda 120x120x200 (1.44m²) + 820W' },
  { potencia: 820, espaco: 2.25, descricao: 'Tenda 150x150x200 (2.25m²) + 820W' },
  { potencia: 820, espaco: 2.88, descricao: 'Tenda 240x120x200 (2.88m²) + 820W' },
  { potencia: 820, espaco: 5.76, descricao: 'Tenda 240x240x200 (5.76m²) + 820W' },
];

let sucessos = 0;
let falhas = 0;

testCases.forEach((test) => {
  try {
    const calc = new CalculadoraPlanoCultivo(test.potencia, test.espaco);
    const validacao = calc.validarEntrada();
    
    if (validacao.valido) {
      const plano = calc.calcularPlanoCompleto();
      const potenciaM2 = (test.potencia / test.espaco).toFixed(2);
      
      console.log(`✅ ${test.descricao}`);
      console.log(`   Potência: ${test.potencia}W | Área: ${test.espaco}m² | ${potenciaM2}W/m²`);
      console.log(`   Status: CALCULADO COM SUCESSO`);
      console.log();
      
      sucessos++;
    } else {
      console.log(`❌ ${test.descricao}`);
      console.log(`   Erros: ${validacao.erros.join(', ')}`);
      console.log();
      
      falhas++;
    }
  } catch (erro) {
    console.log(`❌ ${test.descricao}`);
    console.log(`   Erro: ${erro instanceof Error ? erro.message : 'Erro desconhecido'}`);
    console.log();
    
    falhas++;
  }
});

console.log('='.repeat(60));
console.log(`📊 RESULTADO: ${sucessos} sucessos, ${falhas} falhas`);

if (falhas === 0) {
  console.log('✨ TUDO FUNCIONA! Qualquer valor de potência é aceito!');
} else {
  console.log('⚠️ Ainda há validações restritas');
}
