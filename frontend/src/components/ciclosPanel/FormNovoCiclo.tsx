import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { Semana } from '../../types'
import '../components.css'

interface FormNovoCicloProps {
  onSubmit: (nome: string, qtdSemanas: number, semanas: Semana[]) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

const TEMPLATES_SEMANAS = [
  'Semana Ordinária - Período Base',
  'Semana de Choque - Período Base',
  'Semana de Recuperação - Período Base',
  'Semana Ordinária - Período Específico',
  'Semana de Choque - Período Específico',
  'Semana de Recuperação - Período Específico',
  'Semana de Polimento',
  'Semana de Prova'
]

export default function FormNovoCiclo({ onSubmit, onCancel, loading }: FormNovoCicloProps) {
  const [nome, setNome] = useState('')
  const [qtdSemanas, setQtdSemanas] = useState('8')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const nomeTrimmed = nome.trim()
    const qty = parseInt(qtdSemanas)

    if (!nomeTrimmed) {
      setError('Digite o nome do ciclo')
      return
    }

    if (qty < 1 || qty > 52) {
      setError('Ciclo deve ter entre 1 e 52 semanas')
      return
    }

    try {
      setIsSubmitting(true)

      // Criar semanas com templates padrão
      const semanas: Semana[] = Array.from({ length: qty }, (_, i) => ({
        semana: i + 1,
        nome: TEMPLATES_SEMANAS[i] || `Semana ${i + 1}`,
        treinos: []
      }))

      await onSubmit(nomeTrimmed, qty, semanas)
      setNome('')
      setQtdSemanas('8')
      onCancel()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar ciclo')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="form-novo-ciclo" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nome-ciclo">Nome do Ciclo</label>
        <input
          id="nome-ciclo"
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          placeholder="Ex: 21km - Meia Maratona"
          disabled={isSubmitting}
          className={error ? 'error' : ''}
          autoFocus
        />
      </div>

      <div className="form-group">
        <label htmlFor="qtd-semanas">Quantidade de Semanas</label>
        <input
          id="qtd-semanas"
          type="number"
          value={qtdSemanas}
          onChange={e => setQtdSemanas(e.target.value)}
          min="1"
          max="52"
          disabled={isSubmitting}
        />
        <small>Mínimo 1, máximo 52 semanas</small>
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
          className="secondary-button"
          disabled={isSubmitting}
        >
          <X size={16} /> Cancelar
        </button>
        <button
          type="submit"
          className="primary-action"
          disabled={isSubmitting || !nome.trim()}
        >
          <Plus size={16} /> {isSubmitting ? 'Criando...' : 'Criar Ciclo'}
        </button>
      </div>
    </form>
  )
}
