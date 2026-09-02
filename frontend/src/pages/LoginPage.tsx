import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './LoginPage.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email.trim(), senha)
      navigate('/')
    } catch (err: any) {
      setError(err?.message || 'Erro ao fazer login. Verifique e-mail e senha.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page-shell">
      <div className="login-visual-panel">
        <div className="login-visual-content">
          <span className="login-badge">Performance coaching</span>
          <h1>Treino inteligente para atletas de alto rendimento.</h1>
          <p>
            Centralize ciclos, seguimento de aderência e relatórios em um único painel.
          </p>
          <ul>
            <li>Planejamento em ciclos</li>
            <li>Monitoramento de aderência</li>
            <li>Relatórios esportivos</li>
          </ul>
        </div>
      </div>

      <div className="login-card-wrap">
        <div className="login-card">
          <div className="login-header">
            <div className="brand-mark">M</div>
            <div>
              <h1>Mateus Lucas</h1>
              <p>Área do treinador</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <div className="password-field">
                <input
                  id="senha"
                  type={showPassword ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  required
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={loading || !email.trim() || !senha.trim()} className="login-button">
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="login-footer">
            <span>Versão 1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  )
}
