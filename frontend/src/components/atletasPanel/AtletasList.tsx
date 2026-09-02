import { Plus, Edit2, Trash2, FileText } from 'lucide-react'
import { Atleta } from '../../types'
import AtletaCard from './AtletaCard'
import '../components.css'

interface AtletasListProps {
  atletas: Atleta[]
  atletaSelecionado?: string
  onSelect: (atletaId: string) => void
  onNovoAtleta: () => void
  onEditar?: (atletaId: string) => void
  onRemover?: (atletaId: string) => void
  onNotas?: (atletaId: string) => void
  loading?: boolean
}

export default function AtletasList({
  atletas,
  atletaSelecionado,
  onSelect,
  onNovoAtleta,
  onEditar,
  onRemover,
  onNotas,
  loading
}: AtletasListProps) {
  if (loading) {
    return (
      <div className="atletas-panel loading">
        <div className="spinner">Carregando atletas...</div>
      </div>
    )
  }

  return (
    <div className="atletas-panel">
      <div className="panel-header">
        <h2>👥 Atletas</h2>
        <button onClick={onNovoAtleta} className="primary-action">
          <Plus size={16} /> Novo Atleta
        </button>
      </div>

      {atletas.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏃</div>
          <p className="empty-title">Nenhum atleta cadastrado</p>
          <p className="empty-sub">Clique em "Novo Atleta" para começar</p>
        </div>
      ) : (
        <div className="atletas-grid">
          {atletas.map(atleta => (
            <AtletaCard
              key={atleta.id}
              atleta={atleta}
              isSelected={atletaSelecionado === atleta.id}
              onSelect={() => onSelect(atleta.id)}
              onEditar={onEditar ? () => onEditar(atleta.id) : undefined}
              onRemover={onRemover ? () => onRemover(atleta.id) : undefined}
              onNotas={onNotas ? () => onNotas(atleta.id) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  )
}
