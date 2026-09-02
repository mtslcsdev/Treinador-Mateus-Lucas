import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import '../components.css'

interface FormNovoAtletaProps {
  onSubmit: (nome: string) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

export default function FormNovoAtleta({ onSubmit, onCancel, loading }: FormNovoAtletaProps) {
  const [nome, setNome] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const nomeTrimmed = nome.trim()

    if (!nomeTrimmed) {
      setError('Digite o nome do atleta')
      return
    }

    if (nomeTrimmed.length > 60) {
      setError('Nome deve ter no máximo 60 caracteres')
      return
    }

    try {
      setIsSubmitting(true)
      await onSubmit(nomeTrimmed)
      setNome('')
      onCancel()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar atleta')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="form-novo-atleta" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nome-atleta">Nome do Atleta</label>
        <input
          id="nome-atleta"
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          placeholder="Ex: Allan e Pedro Henrique"
          maxLength={60}
          disabled={isSubmitting}
          className={error ? 'error' : ''}
          autoFocus
        />
        {error && <span className="form-error">{error}</span>}
        <span className="char-count">{nome.length}/60</span>
      </div>

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
          <Plus size={16} /> {isSubmitting ? 'Criando...' : 'Criar Atleta'}
        </button>
      </div>
    </form>
  )
}
