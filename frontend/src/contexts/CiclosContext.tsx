import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Ciclo, Semana } from '../types'
import { useSupabase } from './SupabaseContext'

interface CiclosContextType {
  ciclos: Ciclo[]
  cicloAtual: Ciclo | null
  loading: boolean
  error: string | null

  // Ciclos
  loadCiclos: (atletaId: string) => Promise<void>
  criarCiclo: (atletaId: string, ciclo: Omit<Ciclo, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Ciclo>
  atualizarCiclo: (cicloId: string, updates: Partial<Ciclo>) => Promise<void>
  removerCiclo: (cicloId: string) => Promise<void>
  selecionarCiclo: (cicloId: string) => void
  duplicarCiclo: (cicloId: string) => Promise<Ciclo>

  // Templates
  salvarComoTemplate: (cicloId: string, nome: string) => Promise<void>
  carregarTemplate: (templateId: string, atletaId: string) => Promise<Ciclo>
  listTemplates: () => Ciclo[]

  // Semanas
  adicionarSemana: (cicloId: string, semana: Semana) => Promise<void>
  atualizarSemana: (cicloId: string, semanaIndex: number, updates: Partial<Semana>) => Promise<void>
}

const CiclosContext = createContext<CiclosContextType | undefined>(undefined)

export function CiclosProvider({ children }: { children: ReactNode }) {
  const supabase = useSupabase()
  const [ciclos, setCiclos] = useState<Ciclo[]>([])
  const [cicloAtual, setCicloAtual] = useState<Ciclo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadCiclos = useCallback(
    async (atletaId: string) => {
      try {
        setLoading(true)
        setError(null)

        const { data, error: err } = await supabase
          .from('ciclos')
          .select('*')
          .eq('atleta_id', atletaId)
          .order('created_at', { ascending: false })

        if (err) throw err

        const ciclosFormatados = (data || []).map((ciclo: any) => ({
          id: ciclo.id,
          atletaId: ciclo.atleta_id,
          nome: ciclo.nome,
          prova: ciclo.prova,
          semanas: ciclo.semanas || [],
          isTemplate: ciclo.is_template,
          createdAt: new Date(ciclo.created_at),
          updatedAt: new Date(ciclo.updated_at)
        }))

        setCiclos(ciclosFormatados)
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Erro ao carregar ciclos'
        setError(errorMsg)
        console.error('Erro em loadCiclos:', err)
      } finally {
        setLoading(false)
      }
    },
    [supabase]
  )

  const criarCiclo = useCallback(
    async (atletaId: string, cicloData: Omit<Ciclo, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        setError(null)

        const { data, error: err } = await supabase
          .from('ciclos')
          .insert({
            atleta_id: atletaId,
            nome: cicloData.nome,
            prova: cicloData.prova,
            semanas: cicloData.semanas,
            is_template: false
          })
          .select()
          .single()

        if (err) throw err

        const novoCiclo: Ciclo = {
          id: data.id,
          atletaId: data.atleta_id,
          nome: data.nome,
          prova: data.prova,
          semanas: data.semanas || [],
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at)
        }

        setCiclos([novoCiclo, ...ciclos])
        return novoCiclo
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Erro ao criar ciclo'
        setError(errorMsg)
        throw err
      }
    },
    [supabase, ciclos]
  )

  const atualizarCiclo = useCallback(
    async (cicloId: string, updates: Partial<Ciclo>) => {
      try {
        setError(null)

        const { error: err } = await supabase
          .from('ciclos')
          .update({
            nome: updates.nome,
            prova: updates.prova,
            semanas: updates.semanas,
            updated_at: new Date().toISOString()
          })
          .eq('id', cicloId)

        if (err) throw err

        setCiclos(
          ciclos.map(c =>
            c.id === cicloId
              ? { ...c, ...updates, updatedAt: new Date() }
              : c
          )
        )

        if (cicloAtual?.id === cicloId) {
          setCicloAtual({ ...cicloAtual, ...updates, updatedAt: new Date() })
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Erro ao atualizar ciclo'
        setError(errorMsg)
        throw err
      }
    },
    [supabase, ciclos, cicloAtual]
  )

  const removerCiclo = useCallback(
    async (cicloId: string) => {
      try {
        setError(null)

        const { error: err } = await supabase
          .from('ciclos')
          .delete()
          .eq('id', cicloId)

        if (err) throw err

        setCiclos(ciclos.filter(c => c.id !== cicloId))
        if (cicloAtual?.id === cicloId) {
          setCicloAtual(null)
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Erro ao remover ciclo'
        setError(errorMsg)
        throw err
      }
    },
    [supabase, ciclos, cicloAtual]
  )

  const selecionarCiclo = useCallback((cicloId: string) => {
    const ciclo = ciclos.find(c => c.id === cicloId)
    setCicloAtual(ciclo || null)
  }, [ciclos])

  const duplicarCiclo = useCallback(
    async (cicloId: string) => {
      try {
        const cicloOriginal = ciclos.find(c => c.id === cicloId)
        if (!cicloOriginal) throw new Error('Ciclo não encontrado')

        const cicloClone = {
          ...cicloOriginal,
          nome: `${cicloOriginal.nome} (Cópia)`,
          id: undefined,
          createdAt: new Date(),
          updatedAt: new Date()
        }

        return await criarCiclo(cicloOriginal.atletaId, cicloClone)
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Erro ao duplicar ciclo'
        setError(errorMsg)
        throw err
      }
    },
    [ciclos, criarCiclo]
  )

  const salvarComoTemplate = useCallback(
    async (cicloId: string, nome: string) => {
      try {
        setError(null)

        const cicloOriginal = ciclos.find(c => c.id === cicloId)
        if (!cicloOriginal) throw new Error('Ciclo não encontrado')

        const { data, error: err } = await supabase
          .from('ciclos')
          .insert({
            atleta_id: cicloOriginal.atletaId,
            nome: nome || `Template: ${cicloOriginal.nome}`,
            prova: cicloOriginal.prova,
            semanas: cicloOriginal.semanas,
            is_template: true
          })
          .select()
          .single()

        if (err) throw err

        const novoTemplate: Ciclo = {
          id: data.id,
          atletaId: data.atleta_id,
          nome: data.nome,
          prova: data.prova,
          semanas: data.semanas || [],
          isTemplate: true,
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at)
        }

        setCiclos([novoTemplate, ...ciclos])
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Erro ao salvar template'
        setError(errorMsg)
        throw err
      }
    },
    [supabase, ciclos]
  )

  const carregarTemplate = useCallback(
    async (templateId: string, atletaId: string) => {
      try {
        const template = ciclos.find(c => c.id === templateId)
        if (!template) throw new Error('Template não encontrado')

        return await criarCiclo(atletaId, {
          atletaId,
          nome: template.nome.replace('Template: ', ''),
          prova: template.prova,
          semanas: JSON.parse(JSON.stringify(template.semanas))
        })
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Erro ao carregar template'
        setError(errorMsg)
        throw err
      }
    },
    [ciclos, criarCiclo]
  )

  const listTemplates = useCallback(() => {
    return ciclos.filter(c => c.isTemplate)
  }, [ciclos])

  const adicionarSemana = useCallback(
    async (cicloId: string, semana: Semana) => {
      try {
        setError(null)

        const ciclo = ciclos.find(c => c.id === cicloId)
        if (!ciclo) throw new Error('Ciclo não encontrado')

        const novasSemanas = [...ciclo.semanas, semana]
        await atualizarCiclo(cicloId, { semanas: novasSemanas })
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Erro ao adicionar semana'
        setError(errorMsg)
        throw err
      }
    },
    [ciclos, atualizarCiclo]
  )

  const atualizarSemana = useCallback(
    async (cicloId: string, semanaIndex: number, updates: Partial<Semana>) => {
      try {
        setError(null)

        const ciclo = ciclos.find(c => c.id === cicloId)
        if (!ciclo || !ciclo.semanas[semanaIndex]) throw new Error('Ciclo ou semana não encontrado')

        const novasSemanas = [...ciclo.semanas]
        novasSemanas[semanaIndex] = { ...novasSemanas[semanaIndex], ...updates }

        await atualizarCiclo(cicloId, { semanas: novasSemanas })
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Erro ao atualizar semana'
        setError(errorMsg)
        throw err
      }
    },
    [ciclos, atualizarCiclo]
  )

  return (
    <CiclosContext.Provider
      value={{
        ciclos,
        cicloAtual,
        loading,
        error,
        loadCiclos,
        criarCiclo,
        atualizarCiclo,
        removerCiclo,
        selecionarCiclo,
        duplicarCiclo,
        salvarComoTemplate,
        carregarTemplate,
        listTemplates,
        adicionarSemana,
        atualizarSemana
      }}
    >
      {children}
    </CiclosContext.Provider>
  )
}

export function useCiclos() {
  const context = useContext(CiclosContext)
  if (!context) {
    throw new Error('useCiclos deve ser usado dentro de CiclosProvider')
  }
  return context
}
