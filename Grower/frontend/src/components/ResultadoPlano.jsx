import React from 'react';
import '../styles/ResultadoPlano.css';

export function ResultadoPlano({ plano, carregando, erro }) {
  if (carregando) {
    return (
      <div className="resultado-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Calculando plano de cultivo...</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="resultado-container">
        <div className="erro-message">
          <h3>❌ Erro ao calcular</h3>
          <p>{erro}</p>
        </div>
      </div>
    );
  }

  if (!plano) {
    return null;
  }

  if (!plano.sucesso) {
    return (
      <div className="resultado-container">
        <div className="erro-message">
          <h3>⚠️ Parâmetros inválidos</h3>
          {plano.erros && plano.erros.map((err, idx) => (
            <p key={idx}>• {err}</p>
          ))}
        </div>
      </div>
    );
  }

  const resumo = plano.resumo || {};

  return (
    <div className="resultado-container">
      <div className="resumo-principal">
        <h2>📊 Plano de Cultivo Completo</h2>
        
        <div className="info-grid">
          <div className="info-card potencia">
            <h4>⚡ Potência</h4>
            <p className="valor">{plano.potencia_painel_w}W</p>
            <p className="detalhe">{plano.potencia_por_m2?.toFixed(1)} W/m²</p>
          </div>

          <div className="info-card espaco">
            <h4>📐 Espaço</h4>
            <p className="valor">{plano.espaco_tenda_m2}m²</p>
          </div>

          <div className="info-card ciclo">
            <h4>📅 Ciclo Total</h4>
            <p className="valor">{resumo.ciclo_total_dias}</p>
            <p className="detalhe">dias</p>
          </div>

          <div className="info-card agua">
            <h4>💧 Água Total</h4>
            <p className="valor">{resumo.consumo_agua_total_litros}</p>
            <p className="detalhe">litros</p>
          </div>

          <div className="info-card plantas">
            <h4>🌱 Plantas</h4>
            <p className="valor">{typeof resumo.plantas_finais_ajustadas !== 'undefined' ? resumo.plantas_finais_ajustadas : resumo.plantas_finais}</p>
            <p className="detalhe">na colheita {typeof resumo.plantas_finais_ajustadas !== 'undefined' ? `(base: ${resumo.plantas_finais})` : ''}</p>
          </div>

          <div className="info-card vaso">
            <h4>🪴 Tamanho Vaso</h4>
            <p className="valor">{plano.tamanho_vaso_litros}L</p>
          </div>

          <div className="info-card recomendado">
            <h4>✅ Plantas Recomendadas</h4>
            <p className="valor">{plano.plantas_recomendadas}</p>
            <p className="detalhe">com este vaso</p>
          </div>

          <div className="info-card rendimento">
            <h4>🎯 Rendimento (Base)</h4>
            <p className="valor">{resumo.rendimento_estimado_gramas}g</p>
            <p className="detalhe">{resumo.rendimento_por_m2_gramas} g/m²</p>
          </div>

          {typeof resumo.rendimento_ajustado_gramas !== 'undefined' && (
            <div className="info-card recomendado">
              <h4>🎯 Rendimento (Ajustado)</h4>
              <p className="valor">{resumo.rendimento_ajustado_gramas}g</p>
              <p className="detalhe">{resumo.rendimento_ajustado_por_m2_gramas} g/m²</p>
            </div>
          )}

          {typeof resumo.energia_total_kwh !== 'undefined' && (
            <div className="info-card agua">
              <h4>🔌 Energia do Ciclo</h4>
              <p className="valor">{resumo.energia_total_kwh}</p>
              <p className="detalhe">kWh</p>
            </div>
          )}

          {typeof resumo.potencia_ideal_total_w !== 'undefined' && (
            <div className="info-card potencia">
              <h4>⚙️ Potência Ideal (Total)</h4>
              <p className="valor">{resumo.potencia_ideal_total_w}W</p>
              <p className="detalhe">para a área</p>
            </div>
          )}
        </div>
      </div>

      <div className="etapas-container">
        <h3>🌿 Etapas do Cultivo</h3>
        <div className="etapas-grid">
          {plano.etapas && plano.etapas.map((etapa) => (
            <div key={etapa.etapa} className="etapa-card">
              <div className="etapa-header">
                <h4>{etapa.etapa.toUpperCase()}</h4>
                <span className="dias-badge">{etapa.duracao_dias}d</span>
              </div>

              <div className="etapa-info">
                <div className="info-row">
                  <span className="label">Plantas:</span>
                  <span className="value">{etapa.plantas_totais}</span>
                </div>

                <div className="info-row">
                  <span className="label">Densidade:</span>
                  <span className="value">{etapa.plantas_por_m2}/m²</span>
                </div>

                <div className="info-row">
                  <span className="label">Potência necessária:</span>
                  <span className="value">{etapa.potencia_necessaria_m2}W/m²</span>
                </div>

                <div className="info-row">
                  <span className="label">Potência disponível:</span>
                  <span className="value">{etapa.potencia_disponivel_m2}W/m²</span>
                </div>

                <div className={`adequacao-row adequacao-${etapa.adequacao_potencia.status}`}>
                  <span className="label">Adequação:</span>
                  <span className="value">
                    {etapa.adequacao_potencia.status} ({etapa.adequacao_potencia.percentual}%)
                  </span>
                </div>

                <div className="info-row">
                  <span className="label">Água por dia:</span>
                  <span className="value">{etapa.consumo_agua_diario_litros}L</span>
                </div>

                <div className="info-row">
                  <span className="label">Água do ciclo:</span>
                  <span className="value">{etapa.consumo_agua_ciclo_litros}L</span>
                </div>

                {typeof etapa.ppfd_meta_umol_m2_s !== 'undefined' && (
                  <div className="info-row">
                    <span className="label">PPFD (meta/est.):</span>
                    <span className="value">{etapa.ppfd_meta_umol_m2_s} / {etapa.ppfd_estimado_umol_m2_s} µmol/m²/s</span>
                  </div>
                )}

                {typeof etapa.dli_estimado_mol_m2_dia !== 'undefined' && (
                  <div className="info-row">
                    <span className="label">DLI estimado:</span>
                    <span className="value">{etapa.dli_estimado_mol_m2_dia} mol/m²/dia</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
