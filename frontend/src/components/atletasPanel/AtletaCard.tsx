import { Edit2, Trash2, FileText } from 'lucide-react'
import { Atleta } from '../../types'
import '../components.css'

interface AtletaCardProps {
  atleta: Atleta
  isSelected?: boolean
  onSelect?: () => void
  onEditar?: () => void
  onRemover?: () => void
  onNotas?: () => void
}

function iniciais(nome: string): string {
  return nome
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function AtletaCard({
  atleta,
  isSelected,
  onSelect,
  onEditar,
  onRemover,
  onNotas
}: AtletaCardProps) {
  return (
    <div
      className={`atleta-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="card-header">
        <div className="card-avatar">{iniciais(atleta.nome)}</div>
        <div className="card-info">
          <h3 className="card-title">{atleta.nome}</h3>
          <p className="card-meta">
            {atleta.aderencia ? `${atleta.aderencia}% aderência` : 'Novo atleta'}
          </p>
        </div>
      </div>

      {atleta.notas && <div className="card-badge">📋 Notas</div>}

      <div className="card-actions">
        {onNotas && (
          <button
            onClick={e => {
              e.stopPropagation()
              onNotas()
            }}
            className="card-action-btn"
            title="Notas do atleta"
          >
            <FileText size={16} />
          </button>
        )}
        {onEditar && (
          <button
            onClick={e => {
              e.stopPropagation()
              onEditar()
            }}
            className="card-action-btn"
            title="Editar atleta"
          >
            <Edit2 size={16} />
          </button>
        )}
        {onRemover && (
          <button
            onClick={e => {
              e.stopPropagation()
              onRemover()
            }}
            className="card-action-btn danger"
            title="Remover atleta"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  )
}
