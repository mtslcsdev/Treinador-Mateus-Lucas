import React, { createContext, useContext, useState } from 'react'
import { MOCK_ATLETAS, Atleta, Ciclo } from '../data/mockAtletas'

interface AtletasContextType {
  atletas: Atleta[]
  atletaSelecionado: Atleta | null
  cicloSelecionado: Ciclo | null
  selecionarAtleta: (id: string | number) => void
  selecionarCiclo: (id: string | number) => void
}

const AtletasContext = createContext<AtletasContextType | undefined>(undefined)

export function AtletasProvider({ children }: { children: React.ReactNode }) {
  const [atletaSelecionado, setAtletaSelecionado] = useState<Atleta | null>(MOCK_ATLETAS[0])
  const [cicloSelecionado, setCicloSelecionado] = useState<Ciclo | null>(MOCK_ATLETAS[0].ciclos[0])

  const selecionarAtleta = (id: string | number) => {
    const atleta = MOCK_ATLETAS.find((a) => a.id === id)
    if (atleta) {
      setAtletaSelecionado(atleta)
      setCicloSelecionado(atleta.ciclos[0] || null)
    }
  }

  const selecionarCiclo = (id: string | number) => {
    if (atletaSelecionado) {
      const ciclo = atletaSelecionado.ciclos.find((c) => c.id === id)
      if (ciclo) {
        setCicloSelecionado(ciclo)
      }
    }
  }

  return (
    <AtletasContext.Provider
      value={{
        atletas: MOCK_ATLETAS,
        atletaSelecionado,
        cicloSelecionado,
        selecionarAtleta,
        selecionarCiclo
      }}
    >
      {children}
    </AtletasContext.Provider>
  )
}

export function useAtletas() {
  const context = useContext(AtletasContext)
  if (!context) {
    throw new Error('useAtletas deve ser usado dentro de AtletasProvider')
  }
  return context
}
