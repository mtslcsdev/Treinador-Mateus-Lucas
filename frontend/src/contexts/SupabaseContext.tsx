import { createContext, useContext, ReactNode } from 'react'
import { supabase } from '../services/supabase'

interface SupabaseContextType {
  client: typeof supabase
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

interface SupabaseProviderProps {
  children: ReactNode
}

export function SupabaseProvider({ children }: SupabaseProviderProps) {
  return (
    <SupabaseContext.Provider value={{ client: supabase }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabase deve ser usado dentro de SupabaseProvider')
  }
  return context.client
}
