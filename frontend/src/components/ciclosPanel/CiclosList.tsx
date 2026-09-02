import { Plus } from 'lucide-react'
import { Ciclo } from '../../types'
import CicloCard from './CicloCard'
import '../components.css'

interface CiclosListProps {
  ciclos: Ciclo[]
  cicloSelecionado?: string
  onSelect: (cicloId: string) => void
  onNovoCiclo: () => void
  onEditar?: (cicloId: string) => void
  onDuplicar?: (cicloId: string) => void
  onTemplate?: (cicloId: string) => void
  onRemover?: (cicloId: string) => void
  loading?: boolean
}

export default function CiclosList({
  ciclos,
  cicloSelecionado,
  onSelect,
  onNovoCiclo,
  onEditar,
  onDuplicar,
  onTemplate,
  onRemover,
  loading
}: CiclosListProps) {
  const ciclosAtivos = ciclos.filter(c => !c.isTemplate)

  if (loading) {
    return (
      <div className="ciclos-panel loading">
        <div className="spinner">Carregando ciclos...</div>
      </div>
    )
  }

  return (
    <div className="ciclos-panel">
      <div className="panel-header">
        <h2>📋 Ciclos</h2>
        <button onClick={onNovoCiclo} className="primary-action">
          <Plus size={16} /> Novo Ciclo
        </button>
      </div>

      {ciclosAtivos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <p className="empty-title">Nenhum ciclo criado</p>
          <p className="empty-sub">Clique em "Novo Ciclo" para começar</p>
        </div>
      ) : (
        <div className="ciclos-grid">
          {ciclosAtivos.map(ciclo => (
            <CicloCard
              key={ciclo.id}
              ciclo={ciclo}
              isSelected={cicloSelecionado === ciclo.id}
              onSelect={() => onSelect(ciclo.id)}
              onEditar={onEditar ? () => onEditar(ciclo.id) : undefined}
              onDuplicar={onDuplicar ? () => onDuplicar(ciclo.id) : undefined}
              onTemplate={onTemplate ? () => onTemplate(ciclo.id) : undefined}
              onRemover={onRemover ? () => onRemover(ciclo.id) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  )
}
