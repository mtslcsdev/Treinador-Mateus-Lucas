# 04 — Design de API

A API é o contrato entre seu backend, o app web e o app mobile. Trate como produto — não como detalhe de implementação.

---

## REST é suficiente — não precisa de GraphQL

Com Supabase/PostgREST disponível, você já consegue buscar dados relacionados numa única chamada (`select=*,treinos(*)`) sem precisar da complexidade de montar um servidor GraphQL. Reserve GraphQL pra quando tiver um problema real de "client precisa de combinações muito variáveis de dados" — não é o seu caso agora.

---

## Estrutura de endpoints

```
GET    /api/v1/alunos/:id
GET    /api/v1/alunos/:id/planos
GET    /api/v1/planos/:id/treinos
POST   /api/v1/treinos/:id/execucoes
GET    /api/v1/alunos/:id/execucoes?page=1&cursor=...
POST   /api/v1/ia/gerar-plano
POST   /api/v1/webhooks/hotmart
```

Convenções:
- **Substantivos no plural**, não verbos (`/treinos`, não `/buscarTreinos`).
- **Recursos aninhados só 1 nível** (`/planos/:id/treinos` ok; `/alunos/:id/planos/:id/treinos/:id/execucoes` não — vira ilegível, prefira `/execucoes?treino_id=...`).
- Ações que não são CRUD puro (ex: "gerar plano com IA") viram um verbo claro no final: `/ia/gerar-plano`.

---

## Versionamento desde o primeiro endpoint

`/api/v1/...` — mesmo sozinho, mesmo no MVP. Apps mobile não atualizam na hora; se você mudar o formato de resposta sem versão, quebra o app na mão de quem não atualizou ainda. Trocar de `v1` pra `v2` só quando o contrato realmente quebrar (não pra toda mudança pequena — campo novo opcional não quebra contrato).

---

## Formato de erro padronizado

Defina um único formato, usado em toda a API:

```json
{
  "error": {
    "code": "ALUNO_NAO_ENCONTRADO",
    "message": "Aluno não encontrado",
    "details": null
  }
}
```

`code` é o que o app usa pra decidir o que fazer (ex: mostrar tela específica); `message` é o que pode aparecer pro usuário. Isso evita que cada tela do app trate erro de um jeito diferente, espiando o texto da mensagem.

Status HTTP corretos importam:
- `400` — input inválido
- `401` — não autenticado
- `403` — autenticado mas sem permissão (RLS barrou, por exemplo)
- `404` — recurso não existe
- `409` — conflito (ex: tentar criar execução duplicada)
- `429` — rate limit estourado
- `500` — erro inesperado do servidor

---

## Paginação obrigatória em listas

Nunca devolva "todos os registros" de uma vez. Pra histórico de execuções (que só cresce), prefira **cursor-based pagination** em vez de offset/limit:

```
GET /api/v1/alunos/:id/execucoes?cursor=2026-05-01T10:00:00Z&limit=20
```

Offset/limit (`?page=2`) fica inconsistente quando novos registros são inseridos entre uma página e outra — cursor evita isso.

---

## Idempotência em endpoints sensíveis

O endpoint de webhook do Hotmart (você já mexeu com isso no N8N) e qualquer endpoint de pagamento precisam ser **idempotentes** — se a mesma notificação chegar duas vezes (comum em webhooks, eles reenviam em caso de timeout), processar duas vezes não pode duplicar uma assinatura ou cobrar duas vezes.

Solução prática: guarde o `id` do evento recebido numa tabela `eventos_processados` e cheque antes de processar:

```sql
create table eventos_processados (
  evento_id text primary key,
  processado_em timestamptz not null default now()
);
```

---

## Documentação — OpenAPI/Swagger

Mesmo sozinho, documentar a API formalmente compensa: vira a fonte da verdade do contrato entre você (backend) e você-do-futuro (front mobile/web), e gera automaticamente os tipos compartilhados do guia 02. Ferramentas tipo `zod-to-openapi` (se usar Zod pra validação) geram a doc a partir do mesmo schema que já valida o input — sem manter dois lugares sincronizados manualmente.

---

## Checklist rápido

- [ ] Endpoints versionados desde o início (`/v1/`)
- [ ] Formato de erro único em toda a API
- [ ] Paginação por cursor em listas que crescem
- [ ] Webhooks idempotentes (Hotmart, pagamentos)
- [ ] Documentação OpenAPI gerada junto com a validação de input

---

*Próximo guia: 05 — Frontend (Web + Mobile), como compartilhar lógica entre Expo e web.*
