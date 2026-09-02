import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Target, TrendingUp } from 'lucide-react'
import { useSupabase } from '../contexts/SupabaseContext'
import { useCiclos } from '../contexts/CiclosContext'
import { useTreinos } from '../contexts/TreinosContext'
import CiclosList from '../components/ciclosPanel/CiclosList'
import FormNovoCiclo from '../components/ciclosPanel/FormNovoCiclo'
import SemanaPanel from '../components/treinosPanel/SemanaPanel'
import ZonasDisplay from '../components/treinosPanel/ZonasDisplay'
import { Atleta, Semana } from '../types'
import '../styles/shared.css'
import '../styles/components.css'

export default function DetalheAtleta() {
  const navigate = useNavigate()
  const { id: atletaId } = useParams<{ id: string }>()
  const supabase = useSupabase()
  const { ciclos, cicloAtual, loadCiclos, criarCiclo, selecionarCiclo } = useCiclos()
  const { filtro, setFiltro, getTreinosFiltrados } = useTreinos()

  const [atleta, setAtleta] = useState<Atleta | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFormNovoCiclo, setShowFormNovoCiclo] = useState(false)

  useEffect(() => {
    if (atletaId) {
      loadAtleta()
      loadCiclos(atletaId)
    }
  }, [atletaId])

  const loadAtleta = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: err } = await supabase
        .from('atletas')
        .select('*')
        .eq('id', atletaId)
        .single()

      if (err) throw err

      setAtleta({
        id: data.id,
        nome: data.nome,
        email: data.email,
        notas: data.notas,
        historicoPaces: data.historicoPaces || [],
        aderencia: data.aderencia,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      })
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao carregar atleta'
      setError(errorMsg)
      console.error('Erro em loadAtleta:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleNovoCiclo = async (nome: string, qtdSemanas: number, semanas: Semana[]) => {
    if (!atletaId) return

    try {
      await criarCiclo(atletaId, {
        atletaId,
        nome,
        semanas,
        prova: null
      })
      setShowFormNovoCiclo(false)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao criar ciclo'
      setError(errorMsg)
    }
  }

  if (loading) {
    return (
      <div className="app-shell">
        <header className="topbar compact-topbar">
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={20} style={{ color: '#0f3a7d' }} />
          </button>
        </header>
        <main className="content-area">
          <div style={{ textAlign: 'center', padding: '40px' }}>Carregando atleta...</div>
        </main>
      </div>
    )
  }

  if (!atleta) {
    return (
      <div className="app-shell">
        <header className="topbar compact-topbar">
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={20} style={{ color: '#0f3a7d' }} />
          </button>
        </header>
        <main className="content-area">
          <div style={{ textAlign: 'center', padding: '40px', color: '#dc2626' }}>
            ⚠️ Atleta não encontrado
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <header className="topbar compact-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <ArrowLeft size={20} style={{ color: '#0f3a7d' }} />
          <div>
            <p className="eyebrow">Atleta</p>
            <h1>{atleta.nome}</h1>
          </div>
        </div>
        <div className="topbar-actions">
          <button type="button" className="subtle-button">
            <TrendingUp size={15} /> Relatório
          </button>
          <button type="button" className="subtle-button">
            <Target size={15} /> Notas
          </button>
          <button type="button" className="primary-action" onClick={() => setShowFormNovoCiclo(true)}>
            <Plus size={15} /> Novo ciclo
          </button>
        </div>
      </header>

      <main className="content-area">
        {error && (
          <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '6px', marginBottom: '16px' }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div className="stat-card">
            <span>Aderência</span>
            <strong style={{ fontSize: '28px', color: '#0f3a7d' }}>{atleta.aderencia || 0}%</strong>
            <small>média</small>
          </div>
          <div className="stat-card">
            <span>Ciclos</span>
            <strong style={{ fontSize: '28px', color: '#0f3a7d' }}>{ciclos.length}</strong>
            <small>total</small>
          </div>
          <div className="stat-card">
            <span>Treinos</span>
            <strong style={{ fontSize: '28px', color: '#0f3a7d' }}>
              {ciclos.reduce((sum, c) => sum + c.semanas.reduce((s, sem) => s + (sem.treinos?.length || 0), 0), 0)}
            </strong>
            <small>prescrito</small>
          </div>
        </div>

        <ZonasDisplay compact={false} />

        {showFormNovoCiclo && (
          <FormNovoCiclo
            onSubmit={handleNovoCiclo}
            onCancel={() => setShowFormNovoCiclo(false)}
          />
        )}

        <CiclosList
          ciclos={ciclos}
          cicloSelecionado={cicloAtual?.id}
          onSelect={selecionarCiclo}
          onNovoCiclo={() => setShowFormNovoCiclo(true)}
        />

        {cicloAtual && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginTop: '32px', marginBottom: '16px', color: '#0f3a7d' }}>
              📅 Semanas & Treinos
            </h2>
            {cicloAtual.semanas.map((semana, idx) => (
              <SemanaPanel
                key={idx}
                semana={semana}
                semanaIndex={idx}
                filtroFase={filtro.fase}
                filtroBusca={filtro.busca}
                onFaseChange={(fase) => setFiltro({ ...filtro, fase })}
                onBuscaChange={(busca) => setFiltro({ ...filtro, busca })}
                onLimparFiltro={() => setFiltro({ fase: '', busca: '' })}
                onNovoTreino={() => console.log('Implementar adicionar treino')}
                onEditarTreino={(idx) => console.log('Implementar editar treino')}
                onRemoverTreino={(idx) => console.log('Implementar remover treino')}
                getTreinosFiltrados={getTreinosFiltrados}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
