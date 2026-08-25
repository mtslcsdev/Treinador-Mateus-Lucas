# 08 — DevOps, Deploy e Observabilidade

Como colocar no ar e saber o que está acontecendo quando algo der errado.

---

## Ambientes — separe desde o início

Tenha pelo menos dois ambientes distintos, com bancos diferentes:
- **Desenvolvimento/staging**: onde você testa antes de liberar pros alunos.
- **Produção**: dados reais dos alunos.

No Supabase, isso significa **dois projetos Supabase separados** (não use o mesmo projeto pra dev e produção — risco real de testar algo e mexer em dado de aluno de verdade).

---

## Deploy do backend

Pro seu estágio, não precisa de Kubernetes nem infra complexa. Opções simples e baratas que escalam bem o suficiente:
- **Railway** ou **Render** — deploy direto do GitHub, escala vertical/horizontal simples, bom custo-benefício pro início.
- **Fly.io** — se precisar de mais controle de região (ex: latência menor pros seus alunos no Brasil).

Configure deploy automático: todo merge na branch `main` dispara deploy (CI/CD via GitHub Actions). Isso elimina o "esqueci de subir a versão certa".

---

## Deploy do app mobile

- **EAS Build** (Expo Application Services) — builda o app pra iOS/Android sem precisar de Mac local pro build de iOS.
- **EAS Submit** — automatiza o envio pra App Store/Play Store.
- **EAS Update** (OTA — over the air) — pra mudanças de JS/lógica (não nativas), você consegue atualizar o app **sem passar pela revisão da loja**, o que é enorme pra corrigir bug rápido. Mudanças que envolvem código nativo (nova lib nativa) ainda exigem build novo e revisão da loja.

---

## CI — o que rodar antes de qualquer deploy

Pipeline mínimo (GitHub Actions):
1. Lint (formato de código consistente)
2. Type check (TypeScript)
3. Testes (guia 09)
4. Build
5. Só então deploy

Se qualquer etapa falhar, o deploy não acontece. Isso é barato de configurar e evita "subiu quebrado porque esqueci de rodar teste local".

---

## Versionamento semântico e changelog

Use `MAJOR.MINOR.PATCH` (ex: `1.4.2`) tanto pro backend quanto pro app mobile. Mantenha um `CHANGELOG.md` simples — quando um aluno reportar bug, você consegue saber rapidamente em qual versão ele está e o que mudou desde então.

---

## Backups do banco

O Supabase já faz backup automático nos planos pagos — **confirme a frequência e teste pelo menos uma vez um restore** (muita gente só descobre que o backup não funcionava na hora que precisou). Pra plano free, configure um backup manual periódico (`pg_dump` agendado) — não confie só no que vem por padrão sem verificar.

---

## Logging estruturado

Logue em formato estruturado (JSON), não `console.log` solto com texto livre:

```ts
logger.info('plano_gerado', { alunoId, planoId, duracaoMs, tokensUsados });
```

Isso permite filtrar/buscar logs depois (ex: "todos os erros de geração de plano na última semana") em vez de vasculhar texto solto.

---

## Error tracking (Sentry)

Configure Sentry (free tier já cobre bem o início) tanto no backend quanto no app mobile/web. Sem isso, "o app travou" vira um mistério que só o aluno consegue (mal) descrever. Com Sentry, você recebe automaticamente: stack trace, contexto do usuário, passos que levaram ao erro.

---

## Métricas e alertas mínimos

Não precisa de Grafana/Datadog complexo agora. O mínimo que importa:
- Alerta se a taxa de erro 5xx passar de um limiar (ex: Sentry já notifica isso)
- Alerta se o uso da API do Claude (custo) passar de um teto mensal definido
- Healthcheck simples (`/health`) que a plataforma de deploy usa pra saber se o backend está de pé

---

## Checklist rápido

- [ ] Ambientes de dev/staging e produção totalmente separados (projetos Supabase diferentes)
- [ ] Deploy automático via CI/CD a partir da branch principal
- [ ] EAS configurado pro mobile, com OTA update habilitado
- [ ] Backup do banco confirmado e testado (restore já validado uma vez)
- [ ] Logging estruturado + Sentry configurado em backend e apps
- [ ] Alerta de custo da API de IA configurado

---

*Próximo guia: 09 — Testes e Qualidade.*
