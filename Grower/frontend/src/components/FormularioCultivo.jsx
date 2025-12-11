import React, { useState } from 'react';
import '../styles/FormularioCultivo.css';

export function FormularioCultivo({ onSubmit, carregando }) {
  const [potencia, setPotencia] = useState('720');
  const [espaco, setEspaco] = useState('100x100x200');
  const [tamanhoVaso, setTamanhoVaso] = useState('11');
  const [erro, setErro] = useState('');

  // Presets de potência padrão
  const potenciasPreset = [
    { valor: 60, label: '60W' },
    { valor: 120, label: '120W' },
    { valor: 240, label: '240W' },
    { valor: 480, label: '480W' },
    { valor: 720, label: '720W' },
    { valor: 820, label: '820W' },
  ];

  // Presets de tenda padrão
  const tendasPreset = [
    { dimensoes: '60x40x40', label: '60x40x40', area: 0.24 },
    { dimensoes: '40x40x140', label: '40x40x140', area: 0.16 },
    { dimensoes: '60x60x160', label: '60x60x160', area: 0.36 },
    { dimensoes: '80x80x180', label: '80x80x180', area: 0.64 },
    { dimensoes: '100x100x200', label: '100x100x200', area: 1.0 },
    { dimensoes: '120x120x200', label: '120x120x200', area: 1.44 },
    { dimensoes: '150x150x200', label: '150x150x200', area: 2.25 },
    { dimensoes: '240x120x200', label: '240x120x200', area: 2.88 },
    { dimensoes: '240x240x200', label: '240x240x200', area: 5.76 },
  ];

  // Presets de tamanho de vaso
  const vasosPreset = [
    { valor: 2, label: '2L', descricao: 'Pequeno' },
    { valor: 5, label: '5L', descricao: 'Médio' },
    { valor: 11, label: '11L', descricao: 'Grande' },
    { valor: 20, label: '20L', descricao: 'Extra Grande' },
  ];

  // Função para calcular m² a partir de dimensões (L x W x H em cm)
  const calcularAreaDimensoes = (dimensoes) => {
    const regex = /^(\d+(?:[.,]\d+)?)\s*[xX]\s*(\d+(?:[.,]\d+)?)\s*[xX]?\s*(\d+(?:[.,]\d+)?)?$/;
    const match = dimensoes.trim().match(regex);
    
    if (!match) return null;
    
    const comprimento = parseFloat(match[1].replace(',', '.'));
    const largura = parseFloat(match[2].replace(',', '.'));
    
    // Converter cm² para m² (dividir por 10000)
    const areaCm2 = (comprimento * largura);
    const areaM2 = areaCm2 / 10000;
    
    return areaM2;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulário submetido');
    setErro('');

    const potenciaNum = parseFloat(potencia);
    const tamanhoVasoNum = parseFloat(tamanhoVaso);

    if (isNaN(potenciaNum)) {
      setErro('Potência deve ser um número válido');
      return;
    }

    if (isNaN(tamanhoVasoNum) || tamanhoVasoNum <= 0) {
      setErro('Tamanho do vaso deve ser um número maior que 0');
      return;
    }

    // Tenta processar espaço como dimensões (100x100x200)
    const areaCalculada = calcularAreaDimensoes(espaco);
    let espacoFinal;

    if (areaCalculada) {
      // Processou como dimensões, usa a área calculada
      espacoFinal = areaCalculada;
      if (espacoFinal <= 0) {
        setErro('Dimensões inválidas - resultam em área zerada');
        return;
      }
    } else {
      // Tenta processar como número direto (m²)
      const espacoNum = parseFloat(espaco);
      if (isNaN(espacoNum) || espacoNum <= 0) {
        setErro('Espaço deve ser um número (m²) ou dimensões no formato 100x100x200 (cm)');
        return;
      }
      espacoFinal = espacoNum;
    }

    console.log('Chamando onSubmit com:', { potencia, espacoFinal, tamanhoVaso });
    onSubmit(potencia, espacoFinal, tamanhoVaso);
  };

  const handleSelecionarPreset = (valor) => {
    setPotencia(valor.toString());
    setErro('');
  };

  const handleSelecionarTenda = (dimensoes) => {
    setEspaco(dimensoes);
    setErro('');
  };

  const handleSelecionarVaso = (tamanho) => {
    setTamanhoVaso(tamanho.toString());
    setErro('');
  };

  return (
    <form className="formulario-cultivo" onSubmit={handleSubmit}>
      <h2>📋 Calculadora de Plano de Cultivo</h2>

      <div className="form-group">
        <label htmlFor="potencia">
          ⚡ Potência do Painel LED (W)
        </label>
        <input
          type="number"
          id="potencia"
          value={potencia}
          onChange={(e) => setPotencia(e.target.value)}
          placeholder="Ex: 1000"
          min="1"
          disabled={carregando}
        />
        <small>Qualquer valor de potência é aceito</small>

        <div className="presets-potencia">
          <p className="presets-label">💡 Presets Populares:</p>
          <div className="presets-buttons">
            {potenciasPreset.map((preset) => (
              <button
                key={preset.valor}
                type="button"
                className={`preset-btn ${potencia === preset.valor.toString() ? 'ativo' : ''}`}
                onClick={() => handleSelecionarPreset(preset.valor)}
                disabled={carregando}
                title={preset.descricao}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="espaco">
          📐 Espaço da Tenda
        </label>
        <input
          type="text"
          id="espaco"
          value={espaco}
          onChange={(e) => setEspaco(e.target.value)}
          placeholder="Ex: 100x100x200 (cm) ou 2.0 (m²)"
          disabled={carregando}
        />
        <small>Dimensões em cm (100x100x200) ou área em m² (2.0)</small>

        <div className="presets-tenda">
          <p className="presets-label">🏠 Modelos de Tenda:</p>
          <div className="presets-grid">
            {tendasPreset.map((tenda) => (
              <button
                key={tenda.dimensoes}
                type="button"
                className={`preset-tenda-btn ${espaco === tenda.dimensoes ? 'ativo' : ''}`}
                onClick={() => handleSelecionarTenda(tenda.dimensoes)}
                disabled={carregando}
                title={`${tenda.label} - ${tenda.area}m²`}
              >
                <span className="tenda-dims">{tenda.label}</span>
                <span className="tenda-area">{tenda.area}m²</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="tamanhoVaso">
          🪴 Tamanho do Vaso (Litros)
        </label>
        <input
          type="number"
          id="tamanhoVaso"
          value={tamanhoVaso}
          onChange={(e) => setTamanhoVaso(e.target.value)}
          placeholder="Ex: 11"
          min="1"
          disabled={carregando}
        />
        <small>Tamanho do vaso em litros para calcular quantidade de plantas</small>

        <div className="presets-vaso">
          <p className="presets-label">🪴 Tamanhos Padrão:</p>
          <div className="presets-buttons">
            {vasosPreset.map((vaso) => (
              <button
                key={vaso.valor}
                type="button"
                className={`preset-btn ${tamanhoVaso === vaso.valor.toString() ? 'ativo' : ''}`}
                onClick={() => handleSelecionarVaso(vaso.valor)}
                disabled={carregando}
                title={vaso.descricao}
              >
                {vaso.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {erro && <div className="erro-alert">{erro}</div>}

      <button 
        type="submit" 
        className="btn-calcular"
        disabled={carregando}
      >
        {carregando ? 'Calculando...' : '🚀 Calcular Plano'}
      </button>

      <div className="info-box">
        <h4>💡 Dicas:</h4>
        <ul>
          <li>Potência: qualquer valor em watts (ex: 500, 1000, 2000)</li>
          <li>Espaço em dimensões: 100x100x200 (comprimento x largura x altura em cm)</li>
          <li>Espaço em área: 2.0 (área em m²)</li>
          <li>Ciclo total: 70 dias (7 + 21 + 42)</li>
          <li>Rendimento esperado: ~100g por planta</li>
        </ul>
      </div>
    </form>
  );
}
