# 07 — Escalabilidade e Performance

Agora que a base (dados, arquitetura, auth, API, IA) está definida, isso aqui é sobre fazer ela aguentar crescer sem reescrever nada.

---

## O que "escalável" significa pro seu projeto, na prática

Não é "aguentar 1 milhão de usuários simultâneos" — é não cair quando você passar de 50 pra 200, de 200 pra 1000 alunos reais usando ao mesmo tempo, principalmente em horários de pico (manhã e fim de tarde, horário típico de corrida).

---

## Backend stateless — pré-requisito pra tudo

Nenhuma informação de sessão guardada em memória do processo do servidor (nada de `let usuarioLogado = {}` global). Toda informação de sessão vive no JWT (já é assim com Supabase Auth) ou no banco. Isso significa que você pode rodar **múltiplas instâncias** do seu backend atrás de um load balancer sem nenhum problema de "o usuário caiu na instância errada" — pré-requisito básico pra qualquer escala horizontal.

---

## Connection pooling no Postgres

Cada conexão ao Postgres tem custo. Com múltiplas instâncias de backend + múltiplos usuários simultâneos, sem pooling você esgota conexões rápido. O Supabase já oferece um **pooler (PgBouncer/Supavisor)** — use a connection string do pooler (modo `transaction`) no seu backend em produção, não a conexão direta.

---

## N+1 queries — o vilão mais comum

Erro clássico: buscar lista de alunos, e pra cada aluno fazer uma query separada buscando os planos dele (loop de queries). Isso funciona com 10 registros de teste e explode com 500.

Errado:
```ts
const alunos = await buscarAlunos();
for (const aluno of alunos) {
  aluno.planos = await buscarPlanosDoAluno(aluno.id); // N queries!
}
```

Certo (usando o `select` aninhado do PostgREST/Supabase, ou um JOIN):
```ts
const alunos = await supabase
  .from('alunos')
  .select('*, planos_treino(*)'); // 1 query
```

---

## Jobs assíncronos pra tudo que não precisa de resposta imediata

Qualquer tarefa pesada ou que não bloqueia a experiência do usuário deve ir pra uma fila, não rodar dentro do request HTTP:

- Geração de PDF de relatório de evolução
- Envio de notificação push/e-mail
- Chamadas longas à API do Claude pra conteúdo extenso
- Processamento de webhook do Hotmart

Não precisa de infraestrutura pesada (RabbitMQ/Kafka) nesse estágio — uma lib como `pg-boss` (fila implementada em cima do próprio Postgres) resolve sem adicionar mais um serviço pra manter.

```ts
// ao invés de gerar o PDF dentro do request:
await fila.enviar('gerar-relatorio-pdf', { alunoId });
// e responde imediato: "relatório sendo gerado, te aviso quando pronto"
```

---

## Cache — adicione quando o custo/latência justificar, não antes

Não comece com Redis no dia 1. Sinais de que é hora de adicionar cache:
- Mesma query pesada rodando repetidamente pros mesmos dados que mudam pouco (ex: template de plano padrão)
- Latência da API do Claude impactando UX em fluxos repetidos

Quando chegar nesse ponto, cache em camadas:
1. **Cache em memória simples** (TTL curto, no próprio processo) — resolve boa parte sem infra nova.
2. **CDN** pra assets estáticos (Supabase Storage já serve via CDN nativamente).
3. **Redis** só quando precisar compartilhar cache entre múltiplas instâncias do backend — nesse ponto você já vai ter dado suficiente de uso real pra saber exatamente o que cachear.

---

## Planejamento de capacidade por fase

| Fase | Alunos | O que importa |
|---|---|---|
| MVP | até ~50 | Schema certo, RLS, sem gambiarra de performance ainda — foco em validar o produto |
| Crescimento | 50–500 | Índices revisados, N+1 eliminado, jobs assíncronos pro que for pesado |
| Escala | 500+ | Cache, pooler bem configurado, monitoramento de query lenta ativo, considerar extrair módulo de IA como serviço próprio se o volume justificar |

Não otimize pra fase 3 enquanto está na fase 1 — isso é o over-engineering que mais atrasa projeto solo.

---

## Como saber que algo está lento (antes do aluno reclamar)

- Ative o **log de queries lentas** do Postgres (`log_min_duration_statement`) — qualquer query acima de, por exemplo, 200ms vira um log que você revisa.
- Monitore tempo de resposta dos seus endpoints (mesmo que simples, um middleware que loga duração de cada request já ajuda muito).

---

## Checklist rápido

- [ ] Backend 100% stateless
- [ ] Conexão ao Postgres via pooler em produção
- [ ] Nenhum loop fazendo N queries — sempre JOIN/select aninhado
- [ ] Tarefas pesadas em fila assíncrona, fora do request HTTP
- [ ] Cache adicionado só quando houver sinal real de necessidade
- [ ] Log de queries lentas ativo desde cedo

---

*Próximo guia: 08 — DevOps, Deploy e Observabilidade.*
