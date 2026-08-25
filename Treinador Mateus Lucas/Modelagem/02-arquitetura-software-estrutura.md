# 02 — Arquitetura de Software: Estrutura de Pastas

Esse guia complementa o anterior que já te mandei sobre camadas (API → use cases → domínio → infra). Aqui o foco é: como isso vira pastas e arquivos de verdade no seu projeto.

---

## Estrutura proposta (monolito modular)

```
backend/
├── src/
│   ├── modules/
│   │   ├── alunos/
│   │   │   ├── alunos.controller.ts      # recebe HTTP, valida input
│   │   │   ├── alunos.usecases.ts        # regras de aplicação (orquestra)
│   │   │   ├── alunos.repository.ts      # acesso ao banco (Supabase client)
│   │   │   ├── alunos.types.ts           # tipos/DTOs do módulo
│   │   │   └── alunos.routes.ts          # define os endpoints
│   │   │
│   │   ├── treinos/
│   │   │   └── (mesma estrutura)
│   │   │
│   │   ├── planos/
│   │   │   └── (mesma estrutura)
│   │   │
│   │   ├── pagamentos/
│   │   │   └── (mesma estrutura, integra com Hotmart webhook)
│   │   │
│   │   └── ia/
│   │       ├── ia.controller.ts
│   │       ├── ia.usecases.ts            # ex: "gerarPlanoDeTreino"
│   │       ├── ia.client.ts              # wrapper da chamada à API do Claude
│   │       └── ia.prompts.ts             # templates de prompt versionados
│   │
│   ├── shared/
│   │   ├── database/
│   │   │   └── supabase-client.ts        # client único, reusado por todos repositories
│   │   ├── errors/
│   │   │   └── app-error.ts              # classe de erro padronizada
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts        # valida JWT
│   │   │   └── error-handler.middleware.ts
│   │   └── utils/
│   │
│   ├── config/
│   │   └── env.ts                        # leitura e validação de variáveis de ambiente
│   │
│   └── app.ts                            # monta o servidor, registra rotas dos módulos
│
├── tests/
│   └── (espelha a estrutura de modules/)
│
├── supabase/
│   └── migrations/                       # arquivos de migration versionados
│
└── package.json
```

---

## Regra prática de dependência entre módulos

Um módulo **nunca** importa o `repository` de outro módulo diretamente. Se `pagamentos` precisa saber algo de `alunos`, ele chama o `usecase` público de `alunos`, não acessa a tabela direto.

```ts
// ERRADO — pagamentos acessando direto a tabela de alunos
import { alunosRepository } from '../alunos/alunos.repository';

// CERTO — pagamentos usando a interface pública do módulo alunos
import { buscarAlunoPorId } from '../alunos/alunos.usecases';
```

Isso é o que mantém o monolito "modular" de fato — sem essa disciplina, vira um emaranhado onde mexer em uma tabela quebra três módulos sem aviso.

---

## Onde fica a regra de negócio "pura"

Pra regras mais complexas (ex: "calcular progressão de carga de treino baseado no histórico do aluno"), crie uma camada de domínio separada do usecase, sem nenhuma dependência de banco:

```
modules/treinos/domain/
└── calculo-progressao.ts   # função pura: recebe dados, devolve resultado, sem I/O
```

Isso facilita demais testar essa regra (não precisa de banco rodando pra testar a lógica) e facilita reaproveitar se um dia você expuser isso também num contexto diferente (ex: relatório pro personal trainer).

---

## Controller fino, usecase gordo

Erro comum: colocar lógica de negócio dentro do controller. O controller deve fazer só 3 coisas:
1. Validar o formato do input (schema validation — zod ou similar)
2. Chamar o usecase
3. Formatar a resposta HTTP

Toda decisão de negócio fica no usecase. Isso facilita reusar a mesma lógica em outro contexto (ex: um job assíncrono chamando o mesmo usecase, sem precisar passar por HTTP).

---

## Web e mobile compartilhando contrato

Como você terá app mobile (Expo) e web consumindo a mesma API, vale criar um pacote de tipos compartilhado:

```
packages/
└── shared-types/
    └── api-contracts.ts   # tipos de request/response, gerados a partir do OpenAPI ou escritos a mão
```

Isso evita que o front mobile e o front web tenham definições de tipo divergentes do mesmo dado — um dos bugs mais bobos e mais comuns em projetos com múltiplos clients.

---

## Checklist rápido pra esse guia

- [ ] Pastas organizadas por módulo de negócio, não por tipo técnico (nada de pasta `controllers/` genérica com tudo dentro)
- [ ] Nenhum módulo acessa repository de outro módulo diretamente
- [ ] Regras de negócio complexas isoladas em funções puras testáveis
- [ ] Tipos de API compartilhados entre backend, web e mobile

---

*Próximo guia: 03 — Autenticação e Segurança, aplicando RLS no schema do guia 01.*
