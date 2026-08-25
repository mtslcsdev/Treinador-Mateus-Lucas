# 05 — Frontend: Web + Mobile

Como ter app mobile (Expo) e web sem duplicar metade do trabalho.

---

## Estratégia de compartilhamento de código

Não dá (nem compensa) compartilhar 100% da UI entre web e mobile — componentes visuais são diferentes por natureza (gestos touch vs mouse, navegação por stack vs rotas de URL). Mas o que **deve** ser compartilhado:

- **Tipos de API** (do guia 04, gerados via OpenAPI)
- **Lógica de negócio do client** (ex: cálculo de ritmo de pace, formatação de tempo de corrida) — funções puras, sem dependência de UI
- **Cliente de API** (wrapper das chamadas HTTP/Supabase, com tratamento de erro padronizado)
- **Validação de formulário** (mesmo schema Zod usado no backend pode rodar no front)

Estrutura sugerida (monorepo simples):

```
projeto/
├── apps/
│   ├── mobile/        # Expo
│   └── web/            # Next.js (ou outro framework web)
├── packages/
│   ├── shared-types/    # tipos de API
│   ├── shared-logic/    # cálculos de pace, formatações, validações
│   └── api-client/       # wrapper de chamadas à API/Supabase
```

Ferramenta: `pnpm workspaces` ou `turborepo` pra gerenciar isso sem dor de cabeça.

---

## Gerenciamento de estado: servidor vs cliente

Separe claramente dois tipos de estado:

1. **Estado de servidor** (dados que vêm da API: planos, treinos, execuções) → use **TanStack Query (React Query)**. Ele já resolve cache, revalidação, retry, loading/error state — não reinvente isso com `useState` + `useEffect` manual.
2. **Estado de cliente puro** (ex: aba selecionada, filtro temporário de tela) → `useState`/`useReducer` local, ou Zustand se precisar compartilhar entre componentes distantes.

Erro comum: jogar tudo num Context API gigante ou num Redux pesado demais pro tamanho real do app. Pro seu caso, React Query + Zustand (se precisar) é suficiente e muito mais simples de manter.

---

## Offline-first — essencial pro seu caso de uso

Seus alunos correm. Correm em lugar sem sinal (parques, trilhas). O app **precisa** funcionar localmente durante o treino e sincronizar depois:

- Grave a execução do treino localmente primeiro (SQLite local via `expo-sqlite`, ou mesmo armazenamento simples) e sincronize com o backend quando a conexão voltar.
- Use uma fila de sincronização: ações pendentes ficam numa lista local, e um worker tenta enviar quando detecta conexão (`@react-native-community/netinfo`).
- Trate conflito de forma simples: "last write wins" é aceitável pro seu caso (não é um app colaborativo em tempo real).

Isso é provavelmente o requisito mais importante e mais fácil de esquecer no seu tipo de app especificamente.

---

## Navegação

- **Mobile**: Expo Router (file-based routing, já é o padrão atual do Expo, evita configurar React Navigation na mão).
- **Web**: se usar Next.js, o roteamento já vem de fábrica. Mantenha a estrutura de telas espelhando conceitualmente a do mobile (mesma jornada do aluno), mesmo que os componentes sejam diferentes.

---

## Performance de lista (histórico de treinos)

Conforme o histórico de execuções cresce, listas longas no mobile precisam de virtualização — `FlashList` (da Shopify) é mais performático que `FlatList` puro pra listas grandes. Sem isso, a tela de histórico fica lenta/trava conforme o aluno acumula meses de treino.

---

## Push notifications

Usa o serviço de push do Expo (`expo-notifications`) integrado com o backend — quando um job assíncrono (guia de escalabilidade) gera uma notificação, ele dispara via Expo Push API. Guarde o `push_token` do dispositivo numa tabela vinculada ao aluno, atualizando sempre que o app abrir (tokens podem expirar/mudar).

---

## Design system mínimo

Não precisa de Storybook nem de design system robusto agora — mas tenha desde cedo um conjunto pequeno de componentes base reutilizados (Button, Card, Input, Badge de status de treino) num pacote próprio ou pasta `components/ui/`. Isso evita que cada tela reinvente estilo do zero e mantém consistência visual conforme o app cresce.

---

## Checklist rápido

- [ ] Tipos e lógica de negócio compartilhados entre web e mobile via pacote comum
- [ ] React Query para estado de servidor, estado local simples pro resto
- [ ] Estratégia offline-first para registro de treino
- [ ] Lista de histórico virtualizada (FlashList)
- [ ] Push notifications configuradas com token vinculado ao aluno

---

*Próximo guia: 06 — Integração com IA (Claude API), arquitetura específica pra geração de planos de treino.*
