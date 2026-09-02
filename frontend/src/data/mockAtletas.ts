export interface Treino {
  dia: string
  fase: string
  tipo: string
  especificacao?: string
  pace: string
  obs: string
  blocos?: any[]
  zona?: string
  modalidade: string
  km?: string | number
  feedback?: {
    sensacao: string
    obs: string
  }
}

export interface Semana {
  semana: number
  nome: string
  treinos: Treino[]
}

export interface Ciclo {
  id: string | number
  nome: string
  prova?: string | null
  semanas: Semana[]
}

export interface Atleta {
  id: number | string
  nome: string
  ciclos: Ciclo[]
  notas?: string
  historicoPaces?: any[]
}

export const MOCK_ATLETAS: Atleta[] = [
  {
    id: 1768946735569,
    nome: 'Allan e Pedro Henrique',
    ciclos: [
      {
        id: 1768950965780,
        nome: 'Ciclo 21km - Maratona Piaui Crono',
        semanas: [
          {
            semana: 1,
            nome: 'Semana Ordinária - Periodo Base',
            treinos: [
              {
                dia: '',
                fase: 'Base',
                tipo: '8KM CONTINUO',
                pace: 'Z1 - Corrida Leve',
                obs: '',
                blocos: [],
                modalidade: 'Corrida',
                feedback: { sensacao: '', obs: '' }
              },
              {
                dia: '',
                fase: 'Base',
                tipo: '10KM CONTINUO',
                pace: 'Z1 - Corrida Leve',
                obs: '',
                blocos: [],
                modalidade: 'Corrida',
                feedback: { sensacao: '', obs: '' }
              },
              {
                dia: '',
                fase: 'Base',
                tipo: '14KM CONTINUO',
                pace: 'Z1 - Corrida Leve',
                obs: '',
                blocos: [],
                modalidade: 'Corrida',
                feedback: { sensacao: '', obs: '' }
              }
            ]
          },
          {
            semana: 2,
            nome: 'Semana Ordinária - Periodo Base',
            treinos: [
              {
                dia: '',
                fase: 'Base',
                tipo: '8KM CONTINUO',
                pace: 'Z1 - Corrida Leve',
                obs: 'CORRIDA LEVE',
                blocos: [],
                modalidade: 'Corrida',
                feedback: { sensacao: '', obs: '' }
              },
              {
                dia: '',
                fase: 'Base',
                tipo: '10KM CONTINUO',
                pace: 'Z2 - Corrida Leve/Moderada',
                obs: 'RODAGEM',
                blocos: [],
                modalidade: 'Corrida',
                feedback: { sensacao: '', obs: '' }
              },
              {
                dia: '',
                fase: 'Base',
                tipo: '14KM CONTINUO',
                pace: 'Z2 - Corrida Leve/Moderada',
                obs: 'LONGÃO',
                blocos: [],
                modalidade: 'Corrida',
                feedback: { sensacao: '', obs: '' }
              }
            ]
          }
        ]
      },
      {
        id: '1785716718870-ja4kp9ddm-061wdz3ip',
        nome: '21km - Meia Maratona da PF',
        prova: null,
        semanas: [
          {
            semana: 1,
            nome: 'Semana Ordinária - Período Base',
            treinos: [
              {
                dia: '2026-08-04',
                fase: 'Base',
                tipo: 'Rodagem',
                especificacao: 'Pace (5:10 a 4:50 min/km)',
                pace: 'Z2 - Corrida Leve/Moderada',
                obs: '',
                km: 5,
                blocos: [],
                zona: '',
                modalidade: 'Corrida',
                feedback: { sensacao: '', obs: '' }
              },
              {
                dia: '2026-08-06',
                fase: 'Base',
                tipo: 'Rodagem',
                especificacao: 'Pace (5:10 a 4:50 min/km)',
                pace: 'Z2 - Corrida Leve/Moderada',
                obs: '',
                km: 7,
                blocos: [],
                zona: '',
                modalidade: 'Corrida',
                feedback: { sensacao: '', obs: '' }
              },
              {
                dia: '2026-08-08',
                fase: '',
                tipo: 'Longão',
                especificacao: 'Pace (5:30 a 5:10 min/km)',
                pace: 'Z1 - Corrida Leve',
                obs: '',
                km: 12,
                blocos: [],
                zona: '',
                modalidade: 'Corrida',
                feedback: { sensacao: '', obs: '' }
              }
            ]
          },
          {
            semana: 2,
            nome: 'Semana de Choque - Período Base',
            treinos: [
              {
                dia: '2026-08-18',
                fase: '',
                tipo: '',
                especificacao: '',
                pace: 'Z1 - Corrida Leve',
                obs: '',
                km: 5,
                blocos: [],
                zona: '',
                modalidade: 'Corrida',
                feedback: { sensacao: '', obs: '' }
              },
              {
                dia: '2026-08-21',
                fase: '',
                tipo: '',
                especificacao: '',
                pace: 'Z1 - Corrida Leve',
                obs: '',
                km: 8,
                blocos: [],
                zona: '',
                modalidade: 'Corrida',
                feedback: { sensacao: '', obs: '' }
              },
              {
                dia: '2026-08-23',
                fase: '',
                tipo: '',
                especificacao: '',
                pace: '',
                obs: '',
                km: 5,
                blocos: [],
                zona: '',
                modalidade: 'Corrida',
                feedback: { sensacao: '', obs: '' }
              }
            ]
          }
        ]
      }
    ],
    notas: '',
    historicoPaces: []
  },
  {
    id: 2,
    nome: 'Jessyka Carvalho',
    ciclos: [
      {
        id: 101,
        nome: 'Ciclo Base - 3 treinos semanais',
        semanas: [
          {
            semana: 1,
            nome: 'Semana Ordinária',
            treinos: [
              {
                dia: '',
                fase: 'Base',
                tipo: '6KM CONTINUO',
                pace: 'Z1 - Corrida Leve',
                obs: '',
                blocos: [],
                modalidade: 'Corrida',
                feedback: { sensacao: '', obs: '' }
              },
              {
                dia: '',
                fase: 'Base',
                tipo: '8KM CONTINUO',
                pace: 'Z2 - Corrida Leve/Moderada',
                obs: '',
                blocos: [],
                modalidade: 'Corrida',
                feedback: { sensacao: '', obs: '' }
              },
              {
                dia: '',
                fase: 'Base',
                tipo: '10KM CONTINUO',
                pace: 'Z1 - Corrida Leve',
                obs: '',
                blocos: [],
                modalidade: 'Corrida',
                feedback: { sensacao: '', obs: '' }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    nome: 'Suzy',
    ciclos: [
      {
        id: 102,
        nome: 'Fase de retorno e volume',
        semanas: [
          {
            semana: 1,
            nome: 'Retorno progressivo',
            treinos: [
              {
                dia: '',
                fase: 'Retorno',
                tipo: '3KM CONTINUO',
                pace: 'Z1 - Corrida Leve',
                obs: '',
                blocos: [],
                modalidade: 'Corrida',
                feedback: { sensacao: '', obs: '' }
              },
              {
                dia: '',
                fase: 'Retorno',
                tipo: '4KM CONTINUO',
                pace: 'Z1 - Corrida Leve',
                obs: '',
                blocos: [],
                modalidade: 'Corrida',
                feedback: { sensacao: '', obs: '' }
              },
              {
                dia: '',
                fase: 'Retorno',
                tipo: '5KM CONTINUO',
                pace: 'Z1 - Corrida Leve',
                obs: '',
                blocos: [],
                modalidade: 'Corrida',
                feedback: { sensacao: '', obs: '' }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 4,
    nome: 'Amanda Sousa',
    ciclos: [
      {
        id: 103,
        nome: 'Treino específico - ritmo',
        semanas: [
          {
            semana: 1,
            nome: 'Preparação específica',
            treinos: [
              {
                dia: '',
                fase: 'Específico',
                tipo: '8KM RITMADO',
                pace: 'Z3 - Corrida Moderada',
                obs: '',
                blocos: [],
                modalidade: 'Corrida',
                feedback: { sensacao: '', obs: '' }
              },
              {
                dia: '',
                fase: 'Específico',
                tipo: '10KM CONTINUO',
                pace: 'Z2 - Corrida Leve/Moderada',
                obs: '',
                blocos: [],
                modalidade: 'Corrida',
                feedback: { sensacao: '', obs: '' }
              },
              {
                dia: '',
                fase: 'Específico',
                tipo: '12KM LONGÃO',
                pace: 'Z1 - Corrida Leve',
                obs: '',
                blocos: [],
                modalidade: 'Corrida',
                feedback: { sensacao: '', obs: '' }
              }
            ]
          }
        ]
      }
    ]
  }
]
