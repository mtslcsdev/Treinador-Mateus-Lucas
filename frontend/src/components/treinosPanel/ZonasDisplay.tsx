import { ZonaTreino } from '../../types'
import '../components.css'

const ZONAS_PADRAO: ZonaTreino[] = [
  {
    zona: 'Z1',
    pace: '05:00 a 05:20/km',
    speed: '11.25 a 12.00 km/h',
    descricao: 'Corrida Leve'
  },
  {
    zona: 'Z2',
    pace: '05:20 a 05:40/km',
    speed: '10.50 a 11.25 km/h',
    descricao: 'Corrida Leve/Moderada'
  },
  {
    zona: 'Z3',
    pace: '05:40 a 06:00/km',
    speed: '10.00 a 10.50 km/h',
    descricao: 'Corrida Moderada'
  },
  {
    zona: 'Z4',
    pace: '06:00 a 06:20/km',
    speed: '9.50 a 10.00 km/h',
    descricao: 'Corrida Moderada/Intensa'
  },
  {
    zona: 'Z5',
    pace: '06:20 a 06:40/km',
    speed: '9.00 a 9.50 km/h',
    descricao: 'Corrida Intensa'
  }
]

interface ZonasDisplayProps {
  zonas?: ZonaTreino[]
  compact?: boolean
}

export default function ZonasDisplay({ zonas = ZONAS_PADRAO, compact = false }: ZonasDisplayProps) {
  if (compact) {
    return (
      <div className="zonas-display compact">
        {zonas.map(zona => (
          <div key={zona.zona} className="zona-badge">
            <strong>{zona.zona}</strong>
            <small>{zona.pace}</small>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="zonas-display full">
      {zonas.map(zona => (
        <div key={zona.zona} className="zona-card">
          <div className="zona-header">
            <strong>{zona.zona}</strong>
            <span className="zona-desc">{zona.descricao}</span>
          </div>
          <div className="zona-stats">
            <div className="zona-stat">
              <small>Pace</small>
              <span>{zona.pace}</span>
            </div>
            <div className="zona-stat">
              <small>Velocidade</small>
              <span>{zona.speed}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
