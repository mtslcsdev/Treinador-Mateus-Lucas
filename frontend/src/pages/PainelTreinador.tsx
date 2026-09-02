import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Plus, TrendingUp, Download } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useSupabase } from '../contexts/SupabaseContext'
import AtletasList from '../components/atletasPanel/AtletasList'
import FormNovoAtleta from '../components/atletasPanel/FormNovoAtleta'
import { Atleta } from '../types'
import '../styles/shared.css'
import '../styles/components.css'

export default function PainelTreinador() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const supabase = useSupabase()

  const [atletas, setAtletas] = useState<Atleta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFormNovoAtleta, setShowFormNovoAtleta] = useState(false)
  const [atletaSelecionado, setAtletaSelecionado] = useState<string>()

  useEffect(() => {
    loadAtletas()
  }, [])

  const loadAtletas = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: err } = await supabase
        .from('atletas')
        .select('*')
        .eq('user_id', user?.id)
        .order('nome')

      if (err) throw err

      const mapped = (data || []).map((item: any) => ({
        id: item.id,
        nome: item.nome,
        email: item.email,
        notas: item.notas,
        historicoPaces: item.historicoPaces || [],
        aderencia: item.aderencia,
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at)
      }))

      setAtletas(mapped)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao carregar atletas'
      setError(errorMsg)
      console.error('Erro em loadAtletas:', err)
      setAtletas([])
    } finally {
      setLoading(false)
    }
  }

  const handleNovoAtleta = async (nome: string) => {
    try {
      const { data, error: err } = await supabase
        .from('atletas')
        .insert({
          user_id: user?.id,
          nome,
          historicoPaces: [],
          aderencia: 0
        })
        .select()
        .single()

      if (err) throw err

      const novoAtleta: Atleta = {
        id: data.id,
        nome: data.nome,
        email: data.email,
        notas: data.notas,
        historicoPaces: data.historicoPaces || [],
        aderencia: data.aderencia,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      }

      setAtletas([...atletas, novoAtleta])
      setShowFormNovoAtleta(false)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao criar atleta'
      setError(errorMsg)
      throw err
    }
  }

  const handleSelectAtleta = (atletaId: string) => {
    setAtletaSelecionado(atletaId)
    navigate(`/atleta/${atletaId}`)
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  const mediaAderencia = Math.round(
    atletas.reduce((sum, a) => sum + (a.aderencia || 0), 0) / Math.max(atletas.length, 1)
  )

  return (
    <div className="app-shell">
      <header className="topbar compact-topbar">
        <div>
          <p className="eyebrow">Treinador</p>
          <h1>Mateus Lucas</h1>
        </div>
        <div className="topbar-actions">
          <button type="button" className="subtle-button" onClick={handleLogout}>
            <LogOut size={15} /> Sair
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
            <span>Atletas</span>
            <strong style={{ fontSize: '28px', color: '#0f3a7d' }}>{atletas.length}</strong>
            <small>cadastrados</small>
          </div>
          <div className="stat-card">
            <span>Aderência Média</span>
            <strong style={{ fontSize: '28px', color: '#0f3a7d' }}>{mediaAderencia}%</strong>
            <small>{atletas.filter(a => (a.aderencia || 0) < 60).length} abaixo de 60%</small>
          </div>
          <div className="stat-card">
            <span>Ciclos Ativos</span>
            <strong style={{ fontSize: '28px', color: '#0f3a7d' }}>-</strong>
            <small>total de ciclos</small>
          </div>
        </div>

        {showFormNovoAtleta && (
          <FormNovoAtleta
            onSubmit={handleNovoAtleta}
            onCancel={() => setShowFormNovoAtleta(false)}
            loading={false}
          />
        )}

        <AtletasList
          atletas={atletas}
          atletaSelecionado={atletaSelecionado}
          onSelect={handleSelectAtleta}
          onNovoAtleta={() => setShowFormNovoAtleta(true)}
          loading={loading}
        />
      </main>
    </div>
  )
}
