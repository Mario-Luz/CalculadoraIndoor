import { useState } from 'react'
import { FormularioCultivo } from './components/FormularioCultivo'
import { ResultadoPlano } from './components/ResultadoPlano'
import { planoCultivoService } from './services/apiService'
import './App.css'

function App() {
  const [plano, setPlano] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  const handleCalcular = async (potencia, espaco, tamanhoVaso) => {
    console.log('handleCalcular chamado com:', { potencia, espaco, tamanhoVaso });
    setCarregando(true)
    setErro('')
    
    try {
      const resultado = await planoCultivoService.calcularPlano(potencia, espaco, tamanhoVaso)
      console.log('Resultado recebido:', resultado);
      setPlano(resultado)
    } catch (e) {
      console.error('Erro capturado:', e);
      const msg = e && typeof e.message === 'string' && e.message.trim().length > 0
        ? e.message
        : 'Erro ao conectar com a API. Certifique-se de que o servidor está rodando em http://localhost:5000';
      setErro(msg);
      setPlano(null)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>🌱 Grower - Calculadora de Plano de Cultivo</h1>
          <p>Calcule o plano de cultivo ideal para sua tenda de cultivo</p>
        </div>
      </header>

      <main className="app-main">
        <div className="content-wrapper">
          <FormularioCultivo 
            onSubmit={handleCalcular}
            carregando={carregando}
          />
          
          {plano && (
            <ResultadoPlano 
              plano={plano}
              carregando={carregando}
              erro={erro}
            />
          )}

          {erro && (
            <div className="erro-container">
              <div className="erro-box">
                <h3>❌ Erro de Conexão</h3>
                <p>{erro}</p>
                <p className="dica">
                  💡 Dica: Certifique-se de que o servidor está rodando com <code>npm run backend:dev</code>
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>🚀 Grower v1.0 • Calculadora de Plano de Cultivo</p>
          <p>Frontend em React + TypeScript API Backend</p>
        </div>
      </footer>
    </div>
  )
}

export default App
