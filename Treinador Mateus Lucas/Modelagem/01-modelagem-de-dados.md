# 01 — Modelagem de Dados

Esse é o guia mais importante de todos. Erro de modelagem cedo custa caro tarde — migração de dado em produção com alunos reais é sempre mais difícil do que parece.

---

## Por que começar aqui (e não pelo código)

Antes de escrever uma linha de backend, desenhe as entidades no papel/Excalidraw. O código muda fácil; o schema do banco, com dados reais dentro, não.

---

## Entidades centrais do seu projeto

Pensando no "Guia do Corredor Recreativo" (ebooks + coaching + app):

| Entidade | O que representa |
|---|---|
| `alunos` | usuário final, ligado ao `auth.users` do Supabase |
| `planos_treino` | um plano gerado (5km/10km/21km), versionado |
| `treinos` | sessões individuais dentro de um plano |
| `execucoes_treino` | registro de quando o aluno de fato executou (data, distância, tempo, percepção de esforço) |
| `avaliacoes` | avaliações físicas periódicas (peso, tempo em distância padrão, etc.) |
| `produtos` | ebooks/produtos vendidos (Hotmart) |
| `assinaturas` | vínculo aluno ↔ produto/plano pago, com status e vigência |
| `interacoes_ia` | histórico de prompts/respostas do Claude (pra auditoria e cache) |
| `notificacoes` | fila de push/e-mail |

---

## Regra de ouro: cada tabela representa UMA coisa

Erro comum: criar uma tabela `treinos` com 40 colunas genéricas tentando cobrir todo tipo de treino (corrida, força, mobilidade). Resultado: metade das colunas sempre `null`.

Melhor: tabela `treinos` com campos comuns (data, tipo, status, plano_id) + tabela `treinos_corrida` ou um campo `detalhes jsonb` para o que é específico do tipo. Use `jsonb` no Postgres para dados semi-estruturados que variam (ex: estrutura de um treino intervalado vs treino contínuo), mas **nunca** para dados que você vai filtrar/buscar com frequência — isso aí é coluna normal com índice.

---

## Exemplo de schema (simplificado, ponto de partida)

```sql
create table alunos (
  id uuid primary key references auth.users(id),
  nome text not null,
  nivel text check (nivel in ('iniciante','intermediario','avancado')),
  objetivo_distancia text check (objetivo_distancia in ('5k','10k','21k')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table planos_treino (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid not null references alunos(id) on delete cascade,
  versao int not null default 1,
  status text not null check (status in ('ativo','concluido','pausado')),
  distancia_alvo text not null,
  data_inicio date not null,
  data_fim date,
  created_at timestamptz not null default now()
);

create table treinos (
  id uuid primary key default gen_random_uuid(),
  plano_id uuid not null references planos_treino(id) on delete cascade,
  semana int not null,
  dia_semana int not null,
  tipo text not null check (tipo in ('corrida_leve','intervalado','longo','descanso','forca')),
  detalhes jsonb,
  created_at timestamptz not null default now()
);

create table execucoes_treino (
  id uuid primary key default gen_random_uuid(),
  treino_id uuid not null references treinos(id) on delete cascade,
  aluno_id uuid not null references alunos(id),
  data_execucao date not null,
  distancia_km numeric(5,2),
  tempo_segundos int,
  percepcao_esforco int check (percepcao_esforco between 1 and 10),
  created_at timestamptz not null default now()
);
```

Repare:
- **UUID como chave primária**, não `serial`. Isso evita que alguém adivinhe IDs sequenciais (`/aluno/1`, `/aluno/2`...) e facilita merge de dados entre ambientes.
- **`timestamptz`**, nunca `timestamp` sem timezone — seus alunos podem estar em fusos diferentes, e bug de timezone é dos mais difíceis de rastrear depois.
- **`check constraints`** pros enums de status/tipo — o banco recusa dado inválido antes mesmo de chegar no seu código.
- **`on delete cascade`** pensado conscientemente: se um aluno for removido, os planos dele devem ir junto. Decida isso por tabela, não por padrão.

---

## Versionamento de plano de treino

Ponto que muita gente esquece: o plano de treino de um aluno **muda ao longo do tempo** (você ajusta conforme a evolução dele). Não dá pra simplesmente fazer `UPDATE` no plano antigo — você perde o histórico de "o que esse aluno realmente seguiu". Por isso `versao` na tabela `planos_treino`: cada ajuste relevante gera uma nova versão, e o histórico fica rastreável (importante pro seu lado de Educação Física também — análise de evolução real).

---

## Soft delete vs hard delete

- **Hard delete** (`DELETE FROM`) para dados sem valor histórico (ex: rascunho de notificação).
- **Soft delete** (coluna `deleted_at timestamptz`) para qualquer coisa ligada à jornada do aluno (execuções de treino, avaliações). Você nunca quer perder histórico de progresso de um aluno por engano — e pode precisar disso pra relatório/cobrança depois.

---

## Auditoria mínima em toda tabela

Padronize em **todas** as tabelas:
```sql
created_at timestamptz not null default now(),
updated_at timestamptz not null default now()
```
E um trigger genérico no Postgres pra atualizar `updated_at` automaticamente — não confie em fazer isso manualmente em cada update do código.

---

## Índices — onde colocar desde o início

Toda foreign key usada em filtro frequente precisa de índice (no Postgres, FK não cria índice automático):

```sql
create index idx_treinos_plano_id on treinos(plano_id);
create index idx_execucoes_aluno_id on execucoes_treino(aluno_id);
create index idx_execucoes_data on execucoes_treino(data_execucao);
```

Sem isso, a query "me mostre o histórico de execuções do aluno X" funciona rápido com 10 alunos de teste e fica lenta com 500 alunos reais — e você só vai notar o problema tarde.

---

## Migrations — disciplina desde o commit #1

- Toda alteração de schema é um arquivo de migration versionado no Git (Supabase CLI: `supabase migration new nome_da_mudanca`).
- **Nunca** altere uma tabela direto pelo dashboard do Supabase em produção sem isso virar um arquivo de migration depois — senão seu schema de produção diverge do que está no código, e ninguém mais sabe reproduzir o ambiente do zero.

---

## Erros mais comuns que você deve evitar

1. **Campo genérico demais** (`tipo_generico text`, `dados jsonb` pra tudo) — parece flexível, mas tira a capacidade do banco de garantir integridade. Use isso só onde o dado é genuinamente variável.
2. **Não pensar em quem é o "dono" do dado** — toda tabela sensível precisa de uma FK clara pra `aluno_id`, porque é nisso que a Row Level Security (próximo guia) vai se basear.
3. **Misturar dado transacional com dado de configuração** — ex: não guarde "regras do plano de 5km" como linha solta numa tabela de treinos; isso é configuração/template, deveria estar separado (`templates_plano`).
4. **Esquecer constraint de unicidade** — ex: um aluno não pode ter duas `execucoes_treino` pro mesmo `treino_id` no mesmo dia, a não ser que isso seja uma regra de negócio real. Se não for, `unique(treino_id, data_execucao)`.

---

*Próximo guia: 02 — Arquitetura de Software (estrutura de pastas), que organiza o código em cima desse schema.*
