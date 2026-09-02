import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Treino, Semana } from '../types'
import { useCiclos } from './CiclosContext'

interface TreinosContextType {
  loading: boolean
  error: string | null
  filtro: { fase: string; busca: string }

  // Treinos
  adicionarTreino: (cicloId: string, semanaIndex: number, treino: Treino) => Promise<void>
  atualizarTreino: (cicloId: string, semanaIndex: number, treinoIndex: number, updates: Partial<Treino>) => Promise<void>
  removerTreino: (cicloId: string, semanaIndex: number, treinoIndex: number) => Promise<void>

  // Filtros
  setFiltro: (filtro: { fase: string; busca: string }) => void
  getTreinosFiltrados: (semana: Semana) => Treino[]

  // Validação
  validarTreino: (treino: Treino) => { valido: boolean; avisos: string[] }
}

const TreinosContext = createContext<TreinosContextType | undefined>(undefined)

export function TreinosProvider({ children }: { children: ReactNode }) {
  const { cicloAtual, atualizarCiclo } = useCiclos()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filtro, setFiltro] = useState({ fase: '', busca: '' })

  const adicionarTreino = useCallback(
    async (cicloId: string, semanaIndex: number, treino: Treino) => {
      try {
        setError(null)

        if (!cicloAtual || cicloAtual.id !== cicloId) {
          throw new Error('Ciclo não selecionado')
        }

        if (!cicloAtual.semanas[semanaIndex]) {
          throw new Error('Semana não encontrada')
        }

        const novasSemanas = [...cicloAtual.semanas]
        novasSemanas[semanaIndex] = {
          ...novasSemanas[semanaIndex],
          treinos: [...(novasSemanas[semanaIndex].treinos || []), treino]
        }

        await atualizarCiclo(cicloId, { semanas: novasSemanas })
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Erro ao adicionar treino'
        setError(errorMsg)
        throw err
      }
    },
    [cicloAtual, atualizarCiclo]
  )

  const atualizarTreino = useCallback(
    async (cicloId: string, semanaIndex: number, treinoIndex: number, updates: Partial<Treino>) => {
      try {
        setError(null)

        if (!cicloAtual || cicloAtual.id !== cicloId) {
          throw new Error('Ciclo não selecionado')
        }

        if (!cicloAtual.semanas[semanaIndex]?.treinos[treinoIndex]) {
          throw new Error('Treino não encontrado')
        }

        const novasSemanas = [...cicloAtual.semanas]
        novasSemanas[semanaIndex].treinos[treinoIndex] = {
          ...novasSemanas[semanaIndex].treinos[treinoIndex],
          ...updates
        }

        await atualizarCiclo(cicloId, { semanas: novasSemanas })
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Erro ao atualizar treino'
        setError(errorMsg)
        throw err
      }
    },
    [cicloAtual, atualizarCiclo]
  )

  const removerTreino = useCallback(
    async (cicloId: string, semanaIndex: number, treinoIndex: number) => {
      try {
        setError(null)

        if (!cicloAtual || cicloAtual.id !== cicloId) {
          throw new Error('Ciclo não selecionado')
        }

        if (!cicloAtual.semanas[semanaIndex]) {
          throw new Error('Semana não encontrada')
        }

        const novasSemanas = [...cicloAtual.semanas]
        novasSemanas[semanaIndex] = {
          ...novasSemanas[semanaIndex],
          treinos: novasSemanas[semanaIndex].treinos.filter((_, i) => i !== treinoIndex)
        }

        await atualizarCiclo(cicloId, { semanas: novasSemanas })
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Erro ao remover treino'
        setError(errorMsg)
        throw err
      }
    },
    [cicloAtual, atualizarCiclo]
  )

  const getTreinosFiltrados = useCallback(
    (semana: Semana) => {
      let treinos = semana.treinos || []

      if (filtro.fase) {
        treinos = treinos.filter(t => t.fase === filtro.fase)
      }

      if (filtro.busca) {
        const buscaLower = filtro.busca.toLowerCase()
        treinos = treinos.filter(
          t =>
            t.tipo.toLowerCase().includes(buscaLower) ||
            t.obs?.toLowerCase().includes(buscaLower) ||
            t.especificacao?.toLowerCase().includes(buscaLower)
        )
      }

      return treinos
    },
    [filtro]
  )

  const validarTreino = useCallback((treino: Treino) => {
    const avisos: string[] = []
    let valido = true

    // Validação de campos obrigatórios
    if (!treino.dia) {
      avisos.push('Data do treino é obrigatória')
    }
    if (!treino.tipo) {
      avisos.push('Tipo de treino é obrigatório')
    }
    if (!treino.fase) {
      avisos.push('Fase de treino é obrigatória')
    }
    if (!treino.pace) {
      avisos.push('Zona/Pace é obrigatória')
    }
    if (treino.km <= 0) {
      avisos.push('Quilometragem deve ser maior que zero')
    }

    // Avisos (não invalidam, apenas alertam)
    if (treino.tipo === 'Intervalado' && treino.blocos.length === 0) {
      avisos.push('Treino intervalado sem blocos definidos')
    }

    if (treino.tipo === 'Longão' && treino.km < 15) {
      avisos.push('Longão com menos de 15km pode ser insuficiente')
    }

    if (treino.km > 30) {
      avisos.push('Quilometragem acima de 30km - verificar se é intencional')
    }

    return { valido: avisos.length === 0, avisos }
  }, [])

  return (
    <TreinosContext.Provider
      value={{
        loading,
        error,
        filtro,
        adicionarTreino,
        atualizarTreino,
        removerTreino,
        setFiltro,
        getTreinosFiltrados,
        validarTreino
      }}
    >
      {children}
    </TreinosContext.Provider>
  )
}

export function useTreinos() {
  const context = useContext(TreinosContext)
  if (!context) {
    throw new Error('useTreinos deve ser usado dentro de TreinosProvider')
  }
  return context
}
