import { ReactNode } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { SupabaseProvider } from './contexts/SupabaseContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import PainelTreinador from './pages/PainelTreinador'
import DetalheAtleta from './pages/DetalheAtleta'
import RelatorioAtleta from './pages/RelatorioAtleta'

interface ProtectedRouteProps {
  children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f4f8' }}>
        <div style={{ textAlign: 'center', color: '#0f3a7d', fontWeight: 700 }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>🏃</div>
          <div>Carregando painel...</div>
        </div>
      </div>
    )
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <SupabaseProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <PainelTreinador />
                </ProtectedRoute>
              }
            />
            <Route
              path="/atleta/:id"
              element={
                <ProtectedRoute>
                  <DetalheAtleta />
                </ProtectedRoute>
              }
            />
            <Route
              path="/relatorio/:id"
              element={
                <ProtectedRoute>
                  <RelatorioAtleta />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </SupabaseProvider>
  )
}
