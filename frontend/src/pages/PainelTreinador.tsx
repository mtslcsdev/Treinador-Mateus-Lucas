import { useEffect, useState } from 'react'
import { ArrowUpRight, CalendarRange, Download, LogOut, Plus, Target, TrendingUp } from 'lucide-react'
import { useSupabase } from '../contexts/SupabaseContext'
import { useAuth } from '../contexts/AuthContext'
import '../styles/shared.css'

interface Atleta {
  id: number
  nome: string
  linha: string
  aderencia: number
  ciclos: number
  teste: string
}

export default function PainelTreinador() {
  const [atletas, setAtletas] = useState<Atleta[]>([])
  const [loading, setLoading] = useState(true)
  const { logout } = useAuth()
  const supabase = useSupabase()

  useEffect(() => {
    loadAtletas()
  }, [])

  const loadAtletas = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('atletas')
        .select('*')
        .order('nome')

      if (error) throw error

      const mapped = (data || []).length > 0
        ? (data as any[]).map((item, index) => ({
            id: Number(item.id ?? index + 1),
            nome: item.nome ?? 'Atleta',
            linha: item.email ?? 'Ciclo ativo',
            aderencia: Number(item.aderencia ?? 80),
            ciclos: Number(item.ciclos ?? 2),
            teste: item.teste ?? '05:00/km'
          }))
        : [
            { id: 1, nome: 'Allan e Pedro Henrique', linha: 'Ciclo 21km · Meia Maratona da PF', aderencia: 78, ciclos: 2, teste: '05:00/km' },
            { id: 2, nome: 'Jessyka Carvalho', linha: 'Ciclo base · 3 treinos semanais', aderencia: 92, ciclos: 2, teste: '05:40/km' },
            { id: 3, nome: 'Suzy', linha: 'Fase de retorno e volume', aderencia: 45, ciclos: 1, teste: '06:10/km' },
            { id: 4, nome: 'Amanda Sousa', linha: 'Treino específico · ritmo', aderencia: 86, ciclos: 4, teste: '04:50/km' }
          ]

      setAtletas(mapped)
    } catch (error) {
      console.error('Erro ao carregar atletas:', error)
      setAtletas([
        { id: 1, nome: 'Allan e Pedro Henrique', linha: 'Ciclo 21km · Meia Maratona da PF', aderencia: 78, ciclos: 2, teste: '05:00/km' },
        { id: 2, nome: 'Jessyka Carvalho', linha: 'Ciclo base · 3 treinos semanais', aderencia: 92, ciclos: 2, teste: '05:40/km' },
        { id: 3, nome: 'Suzy', linha: 'Fase de retorno e volume', aderencia: 45, ciclos: 1, teste: '06:10/km' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  const media = Math.round(atletas.reduce((sum, atleta) => sum + atleta.aderencia, 0) / Math.max(atletas.length, 1))

  return (
    <div className="app-shell">
      <header className="topbar compact-topbar">
        <div>
          <p className="eyebrow">Treinador</p>
          <h1>Treinador Mateus Lucas</h1>
        </div>
        <div className="topbar-actions">
          <button type="button" className="subtle-button"><Download size={15} /> Relatório</button>
          <button type="button" className="subtle-button"><CalendarRange size={15} /> Exportar</button>
          <button type="button" className="primary-action"><Plus size={15} /> Novo atleta</button>
          <button type="button" className="logout-button" onClick={handleLogout}><LogOut size={15} /> Sair</button>
        </div>
      </header>

      <main className="content-area">
        <div className="dashboard-header">
          <div>
            <h1>Visão geral</h1>
            <p>{atletas.length} atletas · {atletas.reduce((sum, atleta) => sum + atleta.ciclos, 0)} ciclos ativos</p>
          </div>
          <div className="header-actions">
            <button type="button" className="subtle-button"><TrendingUp size={15} /> Relatório</button>
            <button type="button" className="subtle-button"><Download size={15} /> Exportar</button>
            <button type="button" className="primary-action"><Plus size={15} /> Novo atleta</button>
          </div>
        </div>

        <div className="week-strip">
          <div>
            <span>03/08/2026 até 09/08/2026</span>
            <strong>Semana 1 de 8 · Ciclo 21km · Período Base</strong>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Aderência média</span>
            <strong>{media}%</strong>
            <small>{atletas.filter((atleta) => atleta.aderencia < 60).length} atletas abaixo de 60%</small>
          </div>
          <div className="stat-card primary">
            <span>Volume da semana</span>
            <strong>168.8 km</strong>
            <small>somando todos os atletas</small>
          </div>
          <div className="stat-card">
            <span>Treinos prescritos</span>
            <strong>34</strong>
            <small>22 feitos · 12 pendentes</small>
          </div>
          <div className="stat-card">
            <span>Semanas vazias</span>
            <strong>2</strong>
            <small>Semanas 3 e 4 do ciclo ativo</small>
          </div>
        </div>

        <div className="panel-card">
          <div className="panel-header">
            <h2>Atletas</h2>
          </div>

          {loading ? (
            <div className="page-loading">Carregando atletas...</div>
          ) : atletas.length > 0 ? (
            <div className="atletas-grid">
              {atletas.map((atleta) => (
                <div key={atleta.id} className="atleta-card">
                  <div className="atleta-card-header">
                    <div className="avatar-circle">{atleta.nome.split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase()}</div>
                    <span className="chip">{atleta.aderencia}%</span>
                  </div>
                  <h3>{atleta.nome}</h3>
                  <p>{atleta.linha}</p>
                  <div className="metric-row">
                    <span>{atleta.teste}</span>
                    <span>{atleta.ciclos} ciclos</span>
                  </div>
                  <div className="card-actions">
                    <button type="button" className="secondary-button"><Target size={14} /> Detalhes</button>
                    <button type="button" className="primary-button"><ArrowUpRight size={14} /> Abrir</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="page-empty">Nenhum atleta cadastrado ainda.</div>
          )}
        </div>
      </main>
    </div>
  )
}
