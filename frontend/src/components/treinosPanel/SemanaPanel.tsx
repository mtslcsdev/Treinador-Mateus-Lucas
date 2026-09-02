import { Plus } from 'lucide-react'
import { Semana, Treino } from '../../types'
import TreinoCard from './TreinoCard'
import TreinoFilter from './TreinoFilter'
import '../components.css'

interface SemanaPanelProps {
  semana: Semana
  semanaIndex: number
  filtroFase: string
  filtroBusca: string
  onFaseChange: (fase: string) => void
  onBuscaChange: (busca: string) => void
  onLimparFiltro: () => void
  onNovoTreino: () => void
  onEditarTreino: (treinoIndex: number) => void
  onRemoverTreino: (treinoIndex: number) => void
  getTreinosFiltrados: (semana: Semana) => Treino[]
}

export default function SemanaPanel({
  semana,
  semanaIndex,
  filtroFase,
  filtroBusca,
  onFaseChange,
  onBuscaChange,
  onLimparFiltro,
  onNovoTreino,
  onEditarTreino,
  onRemoverTreino,
  getTreinosFiltrados
}: SemanaPanelProps) {
  const treinosFiltrados = getTreinosFiltrados(semana)
  const totalKm = treinosFiltrados.reduce((sum, t) => sum + (t.km || 0), 0)

  return (
    <div className="semana-panel">
      <div className="semana-header">
        <div>
          <h3 className="semana-title">
            📅 Semana {semana.semana}
          </h3>
          <p className="semana-subtitle">{semana.nome}</p>
        </div>
        <div className="semana-stats">
          <span>🏃 {treinosFiltrados.length} treinos</span>
          <span>📏 {totalKm.toFixed(1)} km</span>
        </div>
      </div>

      <TreinoFilter
        fase={filtroFase}
        busca={filtroBusca}
        onFaseChange={onFaseChange}
        onBuscaChange={onBuscaChange}
        onLimpar={onLimparFiltro}
      />

      <div className="treinos-container">
        {treinosFiltrados.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏃</div>
            <p className="empty-title">Nenhum treino nesta semana</p>
            <p className="empty-sub">Clique em "Adicionar Treino" para começar</p>
          </div>
        ) : (
          <div className="treinos-list">
            {treinosFiltrados.map((treino, index) => (
              <TreinoCard
                key={index}
                treino={treino}
                semanaIndex={semanaIndex}
                treinoIndex={index}
                onEditar={() => onEditarTreino(index)}
                onRemover={() => onRemoverTreino(index)}
              />
            ))}
          </div>
        )}
      </div>

      <button className="btn-adicionar-treino" onClick={onNovoTreino}>
        <Plus size={16} /> Adicionar Treino
      </button>
    </div>
  )
}
