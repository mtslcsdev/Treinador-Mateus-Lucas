import { Search, X } from 'lucide-react'
import '../components.css'

interface TreinoFilterProps {
  fase: string
  busca: string
  onFaseChange: (fase: string) => void
  onBuscaChange: (busca: string) => void
  onLimpar: () => void
}

const FASES = ['Base', 'Específico', 'Polimento']

export default function TreinoFilter({
  fase,
  busca,
  onFaseChange,
  onBuscaChange,
  onLimpar
}: TreinoFilterProps) {
  return (
    <div className="treino-filter">
      <div className="filter-group">
        <label htmlFor="filtro-fase">Fase</label>
        <select
          id="filtro-fase"
          value={fase}
          onChange={e => onFaseChange(e.target.value)}
        >
          <option value="">Todas as fases</option>
          {FASES.map(f => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="filtro-busca">Buscar</label>
        <div className="search-input-wrapper">
          <Search size={16} />
          <input
            id="filtro-busca"
            type="text"
            placeholder="Tipo, zona, obs..."
            value={busca}
            onChange={e => onBuscaChange(e.target.value)}
          />
          {(fase || busca) && (
            <button
              onClick={onLimpar}
              className="clear-btn"
              title="Limpar filtros"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
