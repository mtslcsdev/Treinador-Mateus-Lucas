import { Edit2, Trash2 } from 'lucide-react'
import { Treino } from '../../types'
import '../components.css'

interface TreinoCardProps {
  treino: Treino
  semanaIndex: number
  treinoIndex: number
  onEditar?: () => void
  onRemover?: () => void
}

function formatDate(dateStr: string): string {
  if (!dateStr) return 'Sem data'
  try {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString('pt-BR', { weekday: 'short', month: 'short', day: 'numeric' })
  } catch {
    return dateStr
  }
}

export default function TreinoCard({
  treino,
  semanaIndex,
  treinoIndex,
  onEditar,
  onRemover
}: TreinoCardProps) {
  const getFaseColor = (fase: string) => {
    const colors: { [key: string]: string } = {
      Base: 'var(--color-base)',
      Específico: 'var(--color-specifico)',
      Polimento: 'var(--color-polimento)'
    }
    return colors[fase] || 'var(--gray-400)'
  }

  return (
    <div className="treino-card">
      <div className="treino-header">
        <div className="treino-date">{formatDate(treino.dia)}</div>
        <div className="treino-tipo">
          <span className="tipo-badge" style={{ borderLeftColor: getFaseColor(treino.fase) }}>
            {treino.tipo}
          </span>
        </div>
      </div>

      <div className="treino-info">
        <div className="treino-meta">
          <span>📏 {treino.km} km</span>
          <span>⚡ {treino.zona}</span>
          <span style={{ color: getFaseColor(treino.fase) }}>📍 {treino.fase}</span>
        </div>

        {treino.obs && <p className="treino-obs">{treino.obs}</p>}

        {treino.blocos && treino.blocos.length > 0 && (
          <div className="blocos-mini">
            <small>Blocos: {treino.blocos.map(b => `${b.tempo} (${b.pace})`).join(', ')}</small>
          </div>
        )}
      </div>

      <div className="treino-actions">
        {onEditar && (
          <button
            onClick={onEditar}
            className="treino-action-btn"
            title="Editar treino"
          >
            <Edit2 size={16} />
          </button>
        )}
        {onRemover && (
          <button
            onClick={onRemover}
            className="treino-action-btn danger"
            title="Remover treino"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  )
}
