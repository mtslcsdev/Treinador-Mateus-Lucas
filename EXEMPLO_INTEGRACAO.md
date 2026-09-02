# 📚 Exemplo de Integração - PainelTreinador + Componentes

## Situação Atual
`PainelTreinador.tsx` usa dados mock. Vamos integrá-lo com `AtletasList` + `FormNovoAtleta`.

---

## Código Exemplo (Implementação Rápida)

```typescript
// PainelTreinador.tsx - EXEMPLO BÁSICO
import { useState } from 'react'
import { LogOut, Plus, Target, TrendingUp } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import AtletasList from '../components/atletasPanel/AtletasList'
import FormNovoAtleta from '../components/atletasPanel/FormNovoAtleta'
import '../styles/shared.css'
import '../styles/components.css'

export default function PainelTreinador() {
  const { logout, user } = useAuth()
  const [atletas, setAtletas] = useState([
    {
      id: '1',
      nome: 'Allan e Pedro Henrique',
      email: 'allan@example.com',
      notas: 'Ciclo 21km ativo',
      historicoPaces: [305, 300, 295],
      createdAt: new Date(),
      updatedAt: new Date(),
      aderencia: 78
    },
    // ... mais atletas
  ])
  
  const [showFormNovoAtleta, setShowFormNovoAtleta] = useState(false)
  const [atletaSelecionado, setAtletaSelecionado] = useState<string | undefined>()

  const handleNovoAtleta = async (nome: string) => {
    const novoAtleta = {
      id: Date.now().toString(),
      nome,
      historicoPaces: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setAtletas([...atletas, novoAtleta])
    // Aqui você chamaria: await atletasService.criar(nome)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Treinador</p>
          <h1>Mateus Lucas</h1>
        </div>
        <button onClick={() => logout()} className="subtle-button">
          <LogOut size={16} /> Sair
        </button>
      </header>

      <main className="content-area">
        {/* Cards de resumo */}
        <div className="summary-grid">
          <div className="summary-card">
            <div className="summary-metric">
              <TrendingUp size={20} />
              <div>
                <span className="metric-label">Aderência Média</span>
                <span className="metric-value">82%</span>
              </div>
            </div>
          </div>
          {/* ... mais cards */}
        </div>

        {/* Formulário de novo atleta */}
        {showFormNovoAtleta && (
          <FormNovoAtleta
            onSubmit={handleNovoAtleta}
            onCancel={() => setShowFormNovoAtleta(false)}
          />
        )}

        {/* Lista de atletas */}
        <AtletasList
          atletas={atletas}
          atletaSelecionado={atletaSelecionado}
          onSelect={setAtletaSelecionado}
          onNovoAtleta={() => setShowFormNovoAtleta(true)}
          loading={false}
        />
      </main>
    </div>
  )
}
```

---

## Passo a Passo para Refatorar

### 1️⃣ **Imports** (adicione no topo)
```typescript
import AtletasList from '../components/atletasPanel/AtletasList'
import FormNovoAtleta from '../components/atletasPanel/FormNovoAtleta'
import '../styles/components.css'
```

### 2️⃣ **State** (adicione)
```typescript
const [showFormNovoAtleta, setShowFormNovoAtleta] = useState(false)
const [atletaSelecionado, setAtletaSelecionado] = useState<string | undefined>()
```

### 3️⃣ **Handler** (adicione)
```typescript
const handleNovoAtleta = async (nome: string) => {
  try {
    // Opção 1: Mock local (para testes)
    const novoAtleta = {
      id: Date.now().toString(),
      nome,
      historicoPaces: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setAtletas([...atletas, novoAtleta])

    // Opção 2: Chamar service (implementar depois)
    // await atletasService.criarAtleta(nome)
  } catch (error) {
    console.error('Erro ao criar atleta:', error)
  }
}
```

### 4️⃣ **Renderizar** (substitua a seção de atletas)
```typescript
{/* Form novo atleta */}
{showFormNovoAtleta && (
  <FormNovoAtleta
    onSubmit={handleNovoAtleta}
    onCancel={() => setShowFormNovoAtleta(false)}
  />
)}

{/* Lista de atletas */}
<AtletasList
  atletas={atletas}
  atletaSelecionado={atletaSelecionado}
  onSelect={setAtletaSelecionado}
  onNovoAtleta={() => setShowFormNovoAtleta(true)}
  loading={false}
/>
```

---

## Para DetalheAtleta (Próximo)

```typescript
// DetalheAtleta.tsx - COM CICLOS E TREINOS
import { useState } from 'react'
import { useCiclos } from '../contexts/CiclosContext'
import { useTreinos } from '../contexts/TreinosContext'
import CiclosList from '../components/ciclosPanel/CiclosList'
import FormNovoCiclo from '../components/ciclosPanel/FormNovoCiclo'
import ZonasDisplay from '../components/treinosPanel/ZonasDisplay'

export default function DetalheAtleta() {
  const { ciclos, cicloAtual, criarCiclo } = useCiclos()
  const { getTreinosFiltrados } = useTreinos()
  const [showFormNovoCiclo, setShowFormNovoCiclo] = useState(false)

  const handleNovoCiclo = async (nome: string, qtdSemanas: number, semanas: any[]) => {
    await criarCiclo('atleta-123', {
      atletaId: 'atleta-123',
      nome,
      semanas,
      prova: null
    })
    setShowFormNovoCiclo(false)
  }

  return (
    <div className="app-shell">
      {/* Zonas de treino */}
      <ZonasDisplay />

      {/* Form novo ciclo */}
      {showFormNovoCiclo && (
        <FormNovoCiclo
          onSubmit={handleNovoCiclo}
          onCancel={() => setShowFormNovoCiclo(false)}
        />
      )}

      {/* Lista de ciclos */}
      <CiclosList
        ciclos={ciclos}
        cicloSelecionado={cicloAtual?.id}
        onSelect={(id) => console.log('Selecionar ciclo', id)}
        onNovoCiclo={() => setShowFormNovoCiclo(true)}
      />

      {/* Treinos do ciclo selecionado */}
      {cicloAtual && (
        <div>
          <h2>Semanas e Treinos</h2>
          {/* Implementar SemanaPanel aqui */}
        </div>
      )}
    </div>
  )
}
```

---

## Dados de Teste (Mock)

```typescript
const MOCK_ATLETAS = [
  {
    id: '1',
    nome: 'Allan e Pedro Henrique',
    email: 'allan@example.com',
    notas: 'Ciclo 21km - Meia Maratona da PF',
    historicoPaces: [305, 300, 295, 290],
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-08-20'),
    aderencia: 78
  },
  {
    id: '2',
    nome: 'Jessyka Carvalho',
    email: 'jessyka@example.com',
    notas: 'Ciclo base - 3 treinos semanais',
    historicoPaces: [340, 335, 330],
    createdAt: new Date('2026-02-10'),
    updatedAt: new Date('2026-08-25'),
    aderencia: 92
  },
  {
    id: '3',
    nome: 'Suzy',
    email: 'suzy@example.com',
    notas: 'Fase de retorno',
    historicoPaces: [370, 365],
    createdAt: new Date('2026-06-01'),
    updatedAt: new Date('2026-08-28'),
    aderencia: 45
  }
]

const MOCK_CICLOS = [
  {
    id: '1',
    atletaId: '1',
    nome: '21km - Maratona Piauí Crono',
    prova: {
      nome: 'Meia Maratona da PF',
      data: '2026-09-15',
      distancia: 21
    },
    semanas: [
      { semana: 1, nome: 'Semana Ordinária - Base', treinos: [] },
      { semana: 2, nome: 'Semana de Choque - Base', treinos: [] },
      // ... mais semanas
    ],
    createdAt: new Date('2026-06-01'),
    updatedAt: new Date('2026-08-20')
  }
]

const MOCK_TREINOS = [
  {
    dia: '2026-09-02',
    fase: 'Base',
    tipo: 'Corrida Leve',
    especificacao: '5km moderado',
    pace: 'Z2 - Corrida Leve/Moderada',
    obs: 'Sem pressa, recuperação',
    km: 5,
    blocos: [],
    zona: 'Z2',
    modalidade: 'Corrida',
    feedback: { sensacao: 'Leve', obs: '' }
  }
]
```

---

## Estrutura de Arquivo Após Integração

```
frontend/src/
├── components/
│   ├── atletasPanel/
│   │   ├── AtletasList.tsx ✅
│   │   ├── AtletaCard.tsx ✅
│   │   └── FormNovoAtleta.tsx ✅
│   ├── ciclosPanel/
│   │   ├── CiclosList.tsx ✅
│   │   ├── CicloCard.tsx ✅
│   │   └── FormNovoCiclo.tsx ✅
│   └── treinosPanel/
│       ├── ZonasDisplay.tsx ✅
│       ├── TreinoCard.tsx ✅
│       └── TreinoFilter.tsx ✅
├── contexts/
│   ├── AuthContext.tsx ✅
│   ├── SupabaseContext.tsx ✅
│   ├── CiclosContext.tsx ✅
│   └── TreinosContext.tsx ✅
├── types/
│   └── index.ts ✅
├── pages/
│   ├── LoginPage.tsx ✅
│   ├── PainelTreinador.tsx 🔄 (refatorar)
│   ├── DetalheAtleta.tsx 🔄 (refatorar)
│   └── RelatorioAtleta.tsx ⏳ (implementar depois)
└── styles/
    ├── shared.css ✅
    └── components.css ✅
```

---

## 🔗 Links Úteis

- **Componentes criados:** Todos em `src/components/`
- **Types:** `src/types/index.ts`
- **Contexts:** `src/contexts/`
- **CSS:** `src/styles/components.css`
- **Análise completa:** `ANALISE_MIGRACAO.md`

---

**Próximo passo:** Refatorar `PainelTreinador.tsx` com esses componentes! 🚀
