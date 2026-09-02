import { useEffect, useState } from 'react'
import { useSupabase } from '../contexts/SupabaseContext'
import { useAuth } from '../contexts/AuthContext'
import '../styles/shared.css'

interface Atleta {
  id: number
  nome: string
  email: string
  aderencia: number
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
      setAtletas(data || [])
    } catch (error) {
      console.error('Erro ao carregar atletas:', error)
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

  return (
    <div className="painel-container">
      <header className="painel-header">
        <h1>🏃 Painel do Treinador</h1>
        <button onClick={handleLogout} className="logout-button">
          Sair
        </button>
      </header>

      <main className="painel-main">
        <section>
          <h2>Atletas Cadastrados</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : atletas.length > 0 ? (
            <div className="atletas-grid">
              {atletas.map((atleta) => (
                <div key={atleta.id} className="atleta-card">
                  <h3>{atleta.nome}</h3>
                  <p>{atleta.email}</p>
                  <div className="aderencia">
                    <span>Aderência: {atleta.aderencia || 0}%</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Nenhum atleta cadastrado ainda</p>
          )}
        </section>
      </main>
    </div>
  )
}
