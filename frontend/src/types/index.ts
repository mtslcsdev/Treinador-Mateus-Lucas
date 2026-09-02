// ============= ATLETA =============
export interface Atleta {
  id: string
  nome: string
  email?: string
  notas?: string
  historicoPaces: number[]
  createdAt: Date
  updatedAt: Date
  aderencia?: number
}

// ============= PROVA =============
export interface Prova {
  nome: string
  data: string
  distancia?: number
  local?: string
}

// ============= CICLO =============
export interface Ciclo {
  id: string
  atletaId: string
  nome: string
  prova?: Prova | null
  semanas: Semana[]
  isTemplate?: boolean
  createdAt: Date
  updatedAt: Date
}

// ============= SEMANA =============
export interface Semana {
  id?: string
  semana: number
  nome: string
  treinos: Treino[]
}

// ============= BLOCO (para treinos intervalados) =============
export interface Bloco {
  tempo: string
  pace: string
  km: number
}

// ============= FEEDBACK PÓS-TREINO =============
export interface Feedback {
  sensacao?: string
  obs?: string
  completado?: boolean
}

// ============= TREINO =============
export interface Treino {
  id?: string
  dia: string
  fase: 'Base' | 'Específico' | 'Polimento'
  tipo:
    | 'Corrida Leve'
    | 'Fartlek'
    | 'Progressivo'
    | 'Intervalado'
    | 'Repetições'
    | 'Bloco'
    | 'Longão'
    | 'Rodagem'
    | 'Ritmado'
    | 'TRT'
  especificacao?: string
  pace: string
  obs?: string
  km: number
  blocos: Bloco[]
  zona: string
  modalidade: 'Corrida' | 'Musculação' | 'Flexibilidade' | 'Natação'
  feedback: Feedback
}

// ============= ZONA DE TREINO =============
export interface ZonaTreino {
  zona: string
  pace: string
  speed: string
  descricao: string
}

// ============= VALIDAÇÃO DE CICLO =============
export interface ValidacaoCiclo {
  valido: boolean
  avisos: string[]
  erros: string[]
}

// ============= ESTATÍSTICAS =============
export interface EstatisticasCiclo {
  totalSemanas: number
  totalTreinos: number
  totalKm: number
  mediaKmSemanal: number
  diasAteProva?: number
  distribuicaoZonas: {
    [key: string]: number
  }
  fases: {
    Base: number
    Específico: number
    Polimento: number
  }
}

// ============= TESTE PERIÓDICO =============
export interface TestePeriodico {
  id?: string
  atletaId: string
  tipo: 'TRT' | 'Z4' | 'Z5'
  data: string
  resultado: {
    pace: string
    distancia: number
    tempo: string
    sensacao?: string
  }
  createdAt: Date
}

// ============= NOTA (Timeline) =============
export interface Nota {
  id?: string
  atletaId: string
  cicloId?: string
  data: string
  conteudo: string
  tipo: 'feedback' | 'lesão' | 'ajuste' | 'geral'
  tags?: string[]
  createdAt: Date
  updatedAt: Date
}

// ============= COMPARAÇÃO DE CICLOS =============
export interface ComparativoCiclos {
  ciclo1: Ciclo
  ciclo2: Ciclo
  diferencasKm: number
  diferencasZonas: { [key: string]: number }
  diferencasFases: {
    Base: number
    Específico: number
    Polimento: number
  }
}
