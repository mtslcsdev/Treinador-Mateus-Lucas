import { CalendarRange, Plus, Target, TrendingUp } from 'lucide-react'

const zoneValues = [
  { zone: 'Z1', pace: '05:00 a 05:20/km', speed: '11.25 a 12.00 km/h' },
  { zone: 'Z2', pace: '05:20 a 05:40/km', speed: '10.50 a 11.25 km/h' },
  { zone: 'Z3', pace: '05:40 a 06:00/km', speed: '10.00 a 10.50 km/h' },
  { zone: 'Z4', pace: '06:00 a 06:20/km', speed: '9.50 a 10.00 km/h' },
  { zone: 'Z5', pace: '06:20 a 06:40/km', speed: '9.00 a 9.50 km/h' }
]

export default function DetalheAtleta() {
  return (
    <div className="app-shell">
      <header className="topbar compact-topbar">
        <div>
          <p className="eyebrow">Atleta</p>
          <h1>Allan e Pedro Henrique</h1>
        </div>
        <div className="topbar-actions">
          <button type="button" className="subtle-button"><TrendingUp size={15} /> Relatório</button>
          <button type="button" className="subtle-button"><Target size={15} /> Notas</button>
          <button type="button" className="primary-action"><Plus size={15} /> Novo ciclo</button>
        </div>
      </header>

      <main className="content-area">
        <div className="summary-card panel-card">
          <div className="summary-main">
            <span className="badge-pill">Ciclo ativo</span>
            <strong>78%</strong>
            <div className="summary-meta">
              <p>2 ciclos · 26 treinos · aderência de 78% nas últimas 8 semanas</p>
            </div>
          </div>
          <div>
            <div className="badge-pill">Meia Maratona da PF</div>
          </div>
        </div>

        <div className="panel-card panel-hero">
          <div className="panel-header panel-header-hero">
            <h2>Zonas de treino</h2>
            <button type="button" className="subtle-button subtle-button-light"><CalendarRange size={15} /> Calcular</button>
          </div>
          <div className="zone-grid">
            {zoneValues.map((item) => (
              <div key={item.zone} className="zone-card">
                <strong>{item.zone}</strong>
                <span>{item.pace}</span>
                <small>{item.speed}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-card">
          <div className="panel-header">
            <h2>Ciclos</h2>
          </div>
          <div className="atletas-grid">
            <div className="atleta-card cycle-card">
              <h3>21km - Maratona Piauí Crono</h3>
              <p>8 semanas · 22 treinos · prova alvo: Meia Maratona da PF</p>
            </div>
            <div className="atleta-card cycle-card">
              <h3>Base de retomada</h3>
              <p>4 semanas · 4 treinos · fase de retorno</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
