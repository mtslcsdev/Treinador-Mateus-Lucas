import { Copy, Save, Edit2, Trash2, Target } from 'lucide-react'
import { Ciclo } from '../../types'
import '../components.css'

interface CicloCardProps {
  ciclo: Ciclo
  isSelected?: boolean
  onSelect?: () => void
  onEditar?: () => void
  onDuplicar?: () => void
  onTemplate?: () => void
  onRemover?: () => void
}

export default function CicloCard({
  ciclo,
  isSelected,
  onSelect,
  onEditar,
  onDuplicar,
  onTemplate,
  onRemover
}: CicloCardProps) {
  const totalSemanas = ciclo.semanas.length
  const totalTreinos = ciclo.semanas.reduce((sum, s) => sum + (s.treinos?.length || 0), 0)

  return (
    <div
      className={`ciclo-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="card-header">
        <h3 className="card-title">{ciclo.nome}</h3>
        {ciclo.prova && (
          <div className="card-prova">
            <Target size={14} />
            {ciclo.prova.nome}
            {ciclo.prova.data && ` · ${new Date(ciclo.prova.data).toLocaleDateString('pt-BR')}`}
          </div>
        )}
      </div>

      <div className="card-stats">
        <span>📅 {totalSemanas} semanas</span>
        <span>🏃 {totalTreinos} treinos</span>
      </div>

      <div className="card-actions">
        {onEditar && (
          <button
            onClick={e => {
              e.stopPropagation()
              onEditar()
            }}
            className="card-action-btn"
            title="Editar ciclo"
          >
            <Edit2 size={16} />
          </button>
        )}
        {onDuplicar && (
          <button
            onClick={e => {
              e.stopPropagation()
              onDuplicar()
            }}
            className="card-action-btn"
            title="Duplicar ciclo"
          >
            <Copy size={16} />
          </button>
        )}
        {onTemplate && (
          <button
            onClick={e => {
              e.stopPropagation()
              onTemplate()
            }}
            className="card-action-btn warning"
            title="Salvar como template"
          >
            <Save size={16} />
          </button>
        )}
        {onRemover && (
          <button
            onClick={e => {
              e.stopPropagation()
              onRemover()
            }}
            className="card-action-btn danger"
            title="Remover ciclo"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  )
}
