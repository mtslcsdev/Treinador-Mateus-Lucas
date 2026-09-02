# 🚀 Referência Rápida - Estrutura Implementada

## ✅ Componentes Criados (Prontos para Usar)

### Atletas Panel
```typescript
import AtletasList from '@/components/atletasPanel/AtletasList'
import FormNovoAtleta from '@/components/atletasPanel/FormNovoAtleta'
import AtletaCard from '@/components/atletasPanel/AtletaCard' // (usado internamente)
```

### Ciclos Panel
```typescript
import CiclosList from '@/components/ciclosPanel/CiclosList'
import FormNovoCiclo from '@/components/ciclosPanel/FormNovoCiclo'
import CicloCard from '@/components/ciclosPanel/CicloCard' // (usado internamente)
```

### Treinos Panel
```typescript
import SemanaPanel from '@/components/treinosPanel/SemanaPanel'
import TreinoCard from '@/components/treinosPanel/TreinoCard' // (usado internamente)
import TreinoFilter from '@/components/treinosPanel/TreinoFilter' // (usado internamente)
import ZonasDisplay from '@/components/treinosPanel/ZonasDisplay'
```

---

## 🧠 Contexts para Usar

### CiclosContext
```typescript
import { useCiclos } from '@/contexts/CiclosContext'

// Dentro de um componente
const {
  ciclos,                    // Ciclo[]
  cicloAtual,               // Ciclo | null
  loading,
  error,
  loadCiclos,               // (atletaId) => Promise<void>
  criarCiclo,              // (atletaId, ciclo) => Promise<Ciclo>
  atualizarCiclo,          // (cicloId, updates) => Promise<void>
  removerCiclo,            // (cicloId) => Promise<void>
  selecionarCiclo,         // (cicloId) => void
  duplicarCiclo,           // (cicloId) => Promise<Ciclo>
  salvarComoTemplate,      // (cicloId, nome) => Promise<void>
  carregarTemplate,        // (templateId, atletaId) => Promise<Ciclo>
  listTemplates            // () => Ciclo[]
} = useCiclos()
```

### TreinosContext
```typescript
import { useTreinos } from '@/contexts/TreinosContext'

const {
  loading,
  error,
  filtro,                   // { fase: string, busca: string }
  adicionarTreino,         // (cicloId, semanaIndex, treino) => Promise<void>
  atualizarTreino,         // (cicloId, semanaIndex, treinoIndex, updates) => Promise<void>
  removerTreino,           // (cicloId, semanaIndex, treinoIndex) => Promise<void>
  setFiltro,               // (filtro) => void
  getTreinosFiltrados,     // (semana) => Treino[]
  validarTreino            // (treino) => { valido: boolean, avisos: string[] }
} = useTreinos()
```

---

## 📋 Types Disponíveis

```typescript
import {
  Atleta,
  Ciclo,
  Semana,
  Treino,
  Bloco,
  Feedback,
  ZonaTreino,
  Prova,
  ValidacaoCiclo,
  EstatisticasCiclo,
  TestePeriodico,
  Nota,
  ComparativoCiclos
} from '@/types'
```

---

## 🎨 CSS Classes Principais

### Componentes
- `.atletas-panel` - Container atletas
- `.ciclos-panel` - Container ciclos
- `.semana-panel` - Container semana
- `.atleta-card` / `.ciclo-card` / `.treino-card` - Cards individuais

### Estados
- `.selected` - Card selecionado
- `.error` - Input com erro
- `.loading` - Estado carregando
- `.danger` / `.warning` - Botões com estilos

### Layouts
- `.panel-header` - Cabeçalho de painel
- `.empty-state` - Estado vazio
- `.form-group` - Grupo de form

---

## 🔄 Fluxo de Uso Típico

### 1. Carregar Atletas (PainelTreinador)
```typescript
const [atletas, setAtletas] = useState<Atleta[]>([])

useEffect(() => {
  // Carregar do Supabase aqui
  loadAtletas()
}, [])

return (
  <AtletasList
    atletas={atletas}
    onSelect={(id) => navigate(`/atleta/${id}`)}
    onNovoAtleta={() => setShowForm(true)}
  />
)
```

### 2. Gerenciar Ciclos (DetalheAtleta)
```typescript
const { ciclos, loadCiclos, criarCiclo } = useCiclos()
const [atletaId] = useParams()

useEffect(() => {
  loadCiclos(atletaId)
}, [atletaId])

const handleNovoCiclo = async (nome, qtdSemanas, semanas) => {
  await criarCiclo(atletaId, { nome, semanas, atletaId })
}

return (
  <>
    <CiclosList ciclos={ciclos} onNovoCiclo={...} />
    <ZonasDisplay />
  </>
)
```

### 3. Editar Treinos (DetalheAtleta)
```typescript
const { cicloAtual } = useCiclos()
const { getTreinosFiltrados, setFiltro } = useTreinos()
const [filtroFase, setFiltroFase] = useState('')

return cicloAtual?.semanas.map((semana, idx) => (
  <SemanaPanel
    key={idx}
    semana={semana}
    semanaIndex={idx}
    filtroFase={filtroFase}
    onFaseChange={setFiltroFase}
    getTreinosFiltrados={getTreinosFiltrados}
  />
))
```

---

## 🔧 Estrutura de Dados

### Criar Ciclo
```typescript
const novosCiclos = Array.from({ length: 8 }, (_, i) => ({
  semana: i + 1,
  nome: TEMPLATE_SEMANAS[i],
  treinos: []
}))

await criarCiclo(atletaId, {
  atletaId,
  nome: 'Novo Ciclo',
  semanas: novosCiclos,
  prova: { nome: 'Meia Maratona', data: '2026-09-15' }
})
```

### Adicionar Treino
```typescript
const novoTreino: Treino = {
  dia: '2026-09-03',
  fase: 'Base',
  tipo: 'Corrida Leve',
  pace: 'Z2 - Corrida Leve/Moderada',
  km: 5,
  zona: 'Z2',
  modalidade: 'Corrida',
  blocos: [],
  feedback: { sensacao: '', obs: '' }
}

await adicionarTreino(cicloAtual.id, semanaIndex, novoTreino)
```

---

## 📱 Componentes Responsivos

Todos os componentes usam:
- Grid responsiva com `minmax(280px, 1fr)`
- Mobile-first approach
- Flex layout adaptativo
- Breakpoint em 768px

---

## 🎯 Próximas Implementações

### Componentes Faltando (Fase 3)
- [ ] `TreinoDrawer.tsx` - Editor avançado em modal
- [ ] `BlocosEditor.tsx` - Editor de blocos intervalados
- [ ] `NotasAtletaModal.tsx` - Modal de notas

### Features Faltando (Fase 4)
- [ ] `CicloValidation.tsx` - Validador de ciclos
- [ ] `SmartSuggestions.tsx` - Recomendações
- [ ] `PeriodicTests.tsx` - Gerenciador de testes
- [ ] `NotesTimeline.tsx` - Timeline de notas
- [ ] `CycleComparison.tsx` - Comparação de ciclos

### Relatórios (Fase 5)
- [ ] `DashboardStats.tsx` - Cards KPI
- [ ] `GraficoVolume.tsx` - Recharts
- [ ] `GraficoZonas.tsx` - Recharts
- [ ] `PDFGenerator.tsx` - Export

---

## 🛠️ Instalação de Dependências Adicionais

```bash
# Gráficos
npm install recharts

# Export PDF
npm install html2pdf

# Forms avançados (opcional)
npm install react-hook-form

# Validações (opcional)
npm install zod
```

---

## 📊 Cheat Sheet de Props

### AtletasList
```typescript
interface AtletasListProps {
  atletas: Atleta[]
  atletaSelecionado?: string
  onSelect: (id: string) => void
  onNovoAtleta: () => void
  onEditar?: (id: string) => void
  onRemover?: (id: string) => void
  onNotas?: (id: string) => void
  loading?: boolean
}
```

### CiclosList
```typescript
interface CiclosListProps {
  ciclos: Ciclo[]
  cicloSelecionado?: string
  onSelect: (id: string) => void
  onNovoCiclo: () => void
  onEditar?: (id: string) => void
  onDuplicar?: (id: string) => void
  onTemplate?: (id: string) => void
  onRemover?: (id: string) => void
  loading?: boolean
}
```

### SemanaPanel
```typescript
interface SemanaPanelProps {
  semana: Semana
  semanaIndex: number
  filtroFase: string
  filtroBusca: string
  onFaseChange: (fase: string) => void
  onBuscaChange: (busca: string) => void
  onLimparFiltro: () => void
  onNovoTreino: () => void
  onEditarTreino: (index: number) => void
  onRemoverTreino: (index: number) => void
  getTreinosFiltrados: (semana: Semana) => Treino[]
}
```

---

## 🚦 Checklist de Páginas

### PainelTreinador
- [ ] Usar `AtletasList`
- [ ] Usar `FormNovoAtleta`
- [ ] Integrar com Supabase
- [ ] Mostrar resumo (cards de métrica)

### DetalheAtleta
- [ ] Usar `CiclosList`
- [ ] Usar `FormNovoCiclo`
- [ ] Usar `ZonasDisplay`
- [ ] Usar `SemanaPanel` (loop por semanas)
- [ ] Implementar `TreinoDrawer` para edição

### RelatorioAtleta
- [ ] Dashboard com estatísticas
- [ ] Gráficos (volume, zonas, progresso)
- [ ] Export PDF

---

## 💡 Dicas

1. **Sempre use `getTreinosFiltrados()`** - Ele respeita o filtro do context
2. **Templates automáticos** - FormNovoCiclo cria nomes de semanas automaticamente
3. **Validação leve** - `validarTreino()` avisa mas não bloqueia
4. **CSS pronto** - Todos os componentes já têm estilos
5. **TypeScript** - Use types para evitar erros

---

**Última atualização:** 2026-09-02  
**Arquitetura pronta:** ✅ Sim  
**Componentes testáveis:** ✅ Sim  
**Integração com BD:** ⏳ Próximo passo
