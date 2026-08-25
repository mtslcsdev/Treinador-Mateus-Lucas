# 03 — Autenticação e Segurança

Aplicando direto no schema que você já desenhou no guia 01.

---

## Fluxo de autenticação com Supabase Auth

1. Aluno se cadastra (e-mail/senha ou login social — Google é o mais usado por alunos comuns).
2. Supabase Auth cria o registro em `auth.users` e devolve um JWT (access token) + refresh token.
3. Seu app (mobile ou web) guarda esse token e o `client SDK` do Supabase já lida com renovação automática do token.
4. Toda chamada à sua API ou ao banco carrega esse JWT, que contém o `auth.uid()` usado nas políticas de RLS.

**Você não precisa reinventar login, hash de senha, nem fluxo de "esqueci minha senha"** — isso é exatamente o que o Supabase Auth resolve. Não construa isso do zero.

---

## Row Level Security (RLS) — aplicando nas tabelas do guia 01

RLS é a parte que mais protege você de erro humano. A regra é: **toda tabela com dado de aluno tem RLS ativada por padrão**, e só abre acesso explicitamente.

```sql
-- ativa RLS na tabela (sem isso, qualquer policy criada é ignorada)
alter table treinos enable row level security;
alter table execucoes_treino enable row level security;
alter table planos_treino enable row level security;

-- aluno só vê/edita os próprios dados
create policy "aluno ve proprios planos"
on planos_treino for select
using (auth.uid() = aluno_id);

create policy "aluno ve proprias execucoes"
on execucoes_treino for select
using (auth.uid() = aluno_id);

create policy "aluno insere proprias execucoes"
on execucoes_treino for insert
with check (auth.uid() = aluno_id);
```

Para o papel de **coach/personal** (você), que precisa ver dados de todos os alunos:

```sql
create policy "coach ve tudo"
on planos_treino for select
using (
  exists (
    select 1 from alunos
    where alunos.id = auth.uid() and alunos.role = 'coach'
  )
);
```

Isso assume uma coluna `role` na tabela `alunos` (ou uma tabela separada de roles, se a lista de permissões crescer).

---

## Autorização por papel (roles)

Pro tamanho do seu projeto, 3 papéis resolvem:

| Role | Pode |
|---|---|
| `aluno` | ver/editar só os próprios dados |
| `coach` | ver dados de todos os alunos vinculados a ele, editar planos |
| `admin` | acesso total, gestão de produtos/pagamentos |

Não crie sistema de permissão granular (tipo "pode editar treino mas não pode editar avaliação") a não ser que um caso de uso real exija — começa simples, RLS por role resolve a maioria dos casos.

---

## Onde NUNCA deixar a chave da API do Claude

A chave da API do Claude **fica só no backend**, nunca no app mobile nem no bundle web. Se ela estiver no client (mesmo "escondida" em variável de ambiente do Expo), ela pode ser extraída do binário do app.

Fluxo certo:
```
App (mobile/web) → seu backend → API do Claude
```
Nunca:
```
App (mobile/web) → API do Claude diretamente
```

O mesmo vale pra `service_role key` do Supabase (a chave com acesso total, que ignora RLS) — essa fica só em ambiente de servidor seguro, nunca em app cliente.

---

## Armazenamento seguro de token no mobile

No Expo, use `expo-secure-store` pra guardar o token de sessão — ele usa Keychain (iOS) e Keystore (Android), com criptografia nativa. `AsyncStorage` puro não é criptografado e não deve guardar nada sensível.

---

## Rate limiting

Dois lugares prioritários:
1. **Endpoints de autenticação** (login, recuperação de senha) — evita brute force.
2. **Endpoints que chamam a API do Claude** — evita custo descontrolado se alguém abusar (ou se um bug no app gerar loop de chamadas).

Mesmo um rate limit simples (ex: 10 requisições/minuto por usuário usando uma lib como `express-rate-limit`) já cobre a maior parte do risco real pro seu estágio atual.

---

## LGPD — o que você precisa cuidar desde já

Como você lida com dados de saúde/desempenho físico de pessoas reais (peso, frequência cardíaca, desempenho) — isso é dado sensível pela LGPD:

- Tenha uma política de privacidade clara, mesmo que simples, acessível no app.
- Implemente endpoint de **exclusão de conta** que de fato apaga (ou anonimiza) os dados do aluno — é direito garantido por lei.
- Não envie dado de aluno pra terceiros (incluindo a API do Claude) sem deixar claro isso na política — tecnicamente o prompt que você manda pro Claude com dados do aluno é um compartilhamento de dado com terceiro.
- Logs de `interacoes_ia` (guia 01) ajudam você a auditar exatamente o que foi compartilhado, caso precise responder uma solicitação de um aluno sobre os dados dele.

---

## Checklist de segurança mínimo

- [ ] RLS ativada em toda tabela com dado de aluno
- [ ] Chave do Claude e service_role key só no backend
- [ ] Token guardado com SecureStore no mobile
- [ ] Rate limit em login e em chamadas de IA
- [ ] Validação de input repetida no backend (nunca confiar só no client)
- [ ] Política de privacidade e fluxo de exclusão de conta implementados

---

*Próximo guia: 04 — Design de API, o contrato entre backend, web e mobile.*
