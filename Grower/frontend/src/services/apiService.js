const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const planoCultivoService = {
  async calcularPlano(potencia, espaco, tamanhoVaso) {
    try {
      console.log('Enviando para API:', { potencia, espaco, tamanhoVaso });
      
      const response = await fetch(`${API_BASE_URL}/plano-cultivo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          potencia_painel_w: Number(potencia),
          espaco_tenda_m2: Number(espaco),
          tamanho_vaso_litros: Number(tamanhoVaso),
        }),
      });

      if (!response.ok) {
        let message = `Erro HTTP ${response.status}`;
        try {
          const errBody = await response.json();
          if (errBody?.detalhes?.length) {
            message = `${errBody.erro || 'Erro na requisição'}: ${errBody.detalhes.join('; ')}`;
          } else if (errBody?.erro) {
            message = errBody.erro;
          }
        } catch (_) {
          try {
            const text = await response.text();
            if (text) message = text;
          } catch {}
        }
        throw new Error(message);
      }

      const resultado = await response.json();
      console.log('Resultado da API:', resultado);
      return resultado;
    } catch (error) {
      console.error('Erro ao chamar API:', error);
      throw error;
    }
  },

  async calcularEtapa(etapa, potencia, espaco, tamanhoVaso) {
    try {
      const response = await fetch(`${API_BASE_URL}/etapa/${etapa}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          potencia_painel_w: parseFloat(potencia),
          espaco_tenda_m2: parseFloat(espaco),
          tamanho_vaso_litros: parseFloat(tamanhoVaso),
        }),
      });

      if (!response.ok) {
        let message = `Erro HTTP ${response.status}`;
        try {
          const errBody = await response.json();
          if (errBody?.detalhes?.length) {
            message = `${errBody.erro || 'Erro na requisição'}: ${errBody.detalhes.join('; ')}`;
          } else if (errBody?.erro) {
            message = errBody.erro;
          }
        } catch (_) {
          try {
            const text = await response.text();
            if (text) message = text;
          } catch {}
        }
        throw new Error(message);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao chamar API:', error);
      throw error;
    }
  },
};
