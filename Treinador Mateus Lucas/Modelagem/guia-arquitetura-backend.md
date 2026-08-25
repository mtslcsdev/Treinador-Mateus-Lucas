# Backend escalável e durável: o que você precisa saber

Guia pensado pro seu cenário real: app mobile (Expo) + web, alunos reais usando, integração com API de IA (Claude), banco em Supabase/PostgreSQL. O objetivo não é "saber tudo de backend" — é saber o suficiente pra tomar boas decisões de arquitetura desde o início e não precisar reescrever tudo daqui a 1 ano.

---

## 1. Arquitetura de software — a decisão mais importante

**Erro mais comum em projeto solo/pequena equipe:** começar com microsserviços. Não faça isso.

**O que usar:** **Monolito modular**. Um único backend, mas organizado em módulos isolados (ex: `alunos/`, `treinos/`, `pagamentos/`, `notificacoes/`). Cada módulo tem sua própria lógica e só se comunica com os outros através de interfaces bem definidas (services/use cases), nunca acessando direto o banco de outro módulo.

Por quê:
- Microsserviços resolvem problema de **escala de equipe e tráfego**, não problema de organização de código. Você não tem esse problema ainda.
- Monolito modular dá 90% do benefício de organização do DDD/microsserviços com 10% da complexidade operacional (sem orquestração de containers, sem latência de rede entre serviços, sem problema de transação distribuída).
- Se um dia precisar separar um módulo em serviço próprio (ex: o motor de IA do Claude virar um worker separado por volume), a separação já estará pronta — é só "extrair" o módulo.

**Camadas dentro do monolito** (arquitetura em camadas / hexagonal simplificada):

```
┌─────────────────────────────────────┐
│  API Layer (controllers/routes)      │  ← recebe HTTP, valida input, chama use case
├─────────────────────────────────────┤
│  Application Layer (use cases)       │  ← regra de negócio orquestrada
├─────────────────────────────────────┤
│  Domain Layer (entidades, regras)    │  ← regra de negócio pura, sem dependência externa
├─────────────────────────────────────┤
│  Infrastructure (repositories, DB,   │  ← acesso a banco, APIs externas, storage
│  Supabase client, Claude API client) │
└─────────────────────────────────────┘
```

Regra de ouro: **a camada de domínio nunca importa nada de infraestrutura**. Se sua lógica de "calcular plano de treino" depende de saber que o banco é Postgres, você errou a camada.

---

## 2. DDD — use o conceito, não o ritual

DDD completo (bounded contexts, agregados, value objects, event storming) é overkill pra um app solo. Mas **3 ideias do DDD valem ouro** mesmo num projeto pequeno:

1. **Linguagem ubíqua**: os nomes no código devem ser os mesmos que você usa falando com os alunos. Se você chama de "plano de treino", a tabela/classe não pode se chamar `training_data`. Isso evita ambiguidade conforme o projeto cresce.
2. **Agregados leves**: pense em "Aluno" como uma raiz que controla a consistência de "Treinos", "Avaliações", "Assinatura". Mudanças nesses dados sempre passam pelo Aluno, nunca direto na tabela.
3. **Separar regra de negócio de infraestrutura** (já cobri acima — isso é o núcleo prático do DDD que importa aqui).

Não se preocupe com bounded contexts múltiplos, event sourcing, CQRS — isso é pra sistemas com times grandes e domínios complexos demais pra caber na cabeça de uma pessoa.

---

## 3. Autenticação e autorização

Como você já está no ecossistema Supabase, a escolha natural é **Supabase Auth**:

- **JWT** com refresh token automático (Supabase já gerencia isso no SDK do client).
- **Row Level Security (RLS)** do Postgres — esse é o ponto que mais gente solo ignora e se ferra depois. Em vez de confiar só na lógica do backend pra impedir que o Aluno A veja dados do Aluno B, você define a política **no próprio banco**:

```sql
create policy "aluno só vê seus próprios treinos"
on treinos for select
using (auth.uid() = aluno_id);
```

Isso significa que mesmo que haja um bug no seu backend, o banco não vazaria dado de outro aluno. É uma camada de segurança redundante e barata de implementar desde o início — caríssima de adicionar depois com dados de produção.

**Autorização (roles):** defina cedo os papéis: `aluno`, `personal/coach`, `admin`. Não precisa de sistema de permissões granular agora — um enum de role + RLS baseada nele resolve 95% dos casos.

**Mobile específico:** garanta que o token fica em `SecureStore` (Expo) e não em `AsyncStorage` puro — AsyncStorage não é criptografado.

---

## 4. Design de API

Com mobile + web consumindo a mesma API, a API vira contrato — trate como produto.

- **REST é suficiente.** GraphQL resolve problema de "preciso buscar dados de várias entidades relacionadas em uma chamada" — que o Supabase já resolve nativamente com `select` aninhado via PostgREST. Não adicione GraphQL só por modismo.
- **Versionamento desde o dia 1**: `/api/v1/...`. Você vai quebrar contrato em algum momento; sem versão, isso vira app mobile quebrado na mão do usuário (apps mobile não atualizam instantaneamente como uma página web).
- **Padronize erros.** Defina um formato único de erro (`{ "error": { "code": "...", "message": "..." } }`) usado em toda a API. Evita gambiarra de tratamento de erro diferente em cada tela do app.
- **Paginação obrigatória** em qualquer lista (histórico de treinos, etc.) — nunca retorne "todos os registros". Cursor-based pagination é mais robusto que offset/limit pra listas que mudam.
- **Rate limiting** principalmente nos endpoints que chamam a API do Claude — isso protege seu bolso, não só o servidor.
- **Documente com OpenAPI/Swagger.** Mesmo sozinho, isso vira a "fonte da verdade" do contrato entre seu app mobile e o backend, e facilita muito se algum dia tiver outro dev no time.

---

## 5. Armazenamento de dados

- **PostgreSQL (via Supabase) é a escolha certa** pro seu caso — dados relacionais (aluno → treinos → avaliações → pagamentos) se beneficiam de integridade referencial real (foreign keys, constraints), que um NoSQL não te dá de graça.
- **Migrations versionadas** desde o primeiro dia (Supabase CLI ou Prisma/Drizzle se for usar Node). Nunca altere schema direto pelo dashboard em produção sem isso ficar registrado em arquivo versionado no Git.
- **Índices**: qualquer coluna usada em `WHERE` ou `JOIN` com frequência (ex: `aluno_id`, `data_treino`) precisa de índice. Sem isso, o app fica "rápido" com 50 alunos de teste e trava com 500 alunos reais.
- **Storage de arquivos** (fotos de progresso, certificados, PDFs de ebook): use o Supabase Storage, não banco — nunca guarde arquivo binário em coluna de banco.
- **Cache**: não precisa de Redis no dia 1. Quando a API do Claude ou queries pesadas começarem a pesar no custo/latência, aí sim adiciona uma camada de cache (mesmo que simples, tipo cache em memória com TTL).

---

## 6. Escalabilidade real (sem over-engineering)

Escalabilidade pra um app de coaching com alunos reais não é sobre "aguentar milhões de usuários" — é sobre não cair quando seus 50, depois 200, depois 1000 alunos usam ao mesmo tempo:

- **Backend stateless**: nenhuma informação de sessão guardada em memória do servidor. Tudo no JWT ou no banco. Isso permite rodar múltiplas instâncias do backend sem dor de cabeça, e é pré-requisito pra qualquer escala horizontal futura.
- **Jobs assíncronos pra tudo que não precisa de resposta imediata**: gerar PDF, mandar notificação push, processar resposta longa da IA → fila (mesmo que simples, tipo `pg-boss` rodando em cima do próprio Postgres, sem precisar de infra extra). Isso evita que o app "trave" esperando uma tarefa pesada.
- **CDN pra assets estáticos** (imagens dos ebooks, ícones) — Supabase Storage já serve via CDN.
- **Observabilidade desde cedo**: log estruturado + uma ferramenta de error tracking (Sentry tem free tier generoso). Sem isso, quando um aluno reportar "o app travou", você vai estar no escuro.

---

## 7. Segurança — checklist mínimo

- Nunca confie em validação feita só no app mobile — toda validação de input se repete no backend (o client pode ser manipulado).
- Variáveis sensíveis (chave da API do Claude, service role key do Supabase) só no backend, nunca no bundle do app mobile.
- Rate limiting nos endpoints de autenticação (evita brute force).
- HTTPS obrigatório em tudo, sem exceção.
- Sanitize qualquer input que vá para prompt da IA — isso evita prompt injection vindo de um campo de texto livre do aluno.

---

## 8. Roteiro prático pra você (alinhado com sua trilha até 2029)

| Fase | Foco |
|---|---|
| **Agora — MVP** | Monolito modular simples, Supabase Auth + RLS, API REST versionada, Postgres bem modelado com migrations |
| **Crescimento (50-500 alunos)** | Observabilidade (Sentry/logs), jobs assíncronos, índices revisados, cache básico |
| **Maturidade** | Extrair módulos que ficarem pesados (ex: motor de IA) em serviço separado se necessário, CI/CD robusto, testes automatizados cobrindo regras de negócio críticas |

A ideia central: **adie complexidade até ela ser realmente necessária**, mas **não adie decisões estruturais baratas de tomar cedo e caras de corrigir depois** (RLS, versionamento de API, separação de camadas, migrations).

---

*Quer que eu desenhe o schema inicial do banco (tabelas de aluno, treino, plano, pagamento) já pensando em RLS e nas relações certas? Ou prefere que eu monte a estrutura de pastas do monolito modular pro seu stack (Node/Express ou Fastify + Supabase)?*
