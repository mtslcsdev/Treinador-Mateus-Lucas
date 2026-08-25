# 09 — Testes e Qualidade

Como não quebrar o que já funciona conforme o projeto cresce.

---

## A pirâmide de testes — pro seu caso, simplificada

```
        ▲
       /E2E\          poucos, só os fluxos mais críticos
      /------\
     /Integra-\       moderado, testa módulos com banco real (ou de teste)
    /  ção     \
   /------------\
  /   Unitários   \    muitos, rápidos, testam regra de negócio pura
 /------------------\
```

Não tente ter 100% de cobertura — isso é desperdício de tempo num projeto solo. Foque nos testes que protegem o que mais dói quebrar.

---

## Testes unitários — onde focar primeiro

As funções puras de domínio do guia 02 (`calculo-progressao.ts`, cálculo de pace, validação de regras de negócio) são as candidatas perfeitas: rápidas, sem dependência de banco, fáceis de escrever.

```ts
describe('calcularProgressaoDeCarga', () => {
  it('aumenta volume gradualmente quando aluno completa treinos consistentemente', () => {
    const resultado = calcularProgressaoDeCarga({ historico: [...] });
    expect(resultado.proximaSemana.volumeKm).toBeGreaterThan(resultado.semanaAtual.volumeKm);
  });
});
```

Priorize testar: cálculo de plano de treino, validação de dados de execução, regras de elegibilidade de assinatura/pagamento.

---

## Testes de integração — módulos com banco

Use um banco de teste (Supabase local via `supabase start`, ou um banco Postgres separado de teste) pra validar que o usecase + repository + RLS funcionam juntos como esperado:

```ts
it('aluno não consegue ver execucoes de outro aluno (RLS)', async () => {
  const resultado = await buscarExecucoes({ alunoId: outroAlunoId }, tokenDoAlunoA);
  expect(resultado).toEqual([]);
});
```

Esse tipo de teste é especialmente importante pra **validar RLS de fato** — é fácil escrever uma policy errada que parece certa só lendo o SQL.

---

## Testes E2E — só os fluxos mais críticos

E2E é caro de manter (lento, frágil). Reserve pra 3-5 fluxos que, se quebrarem, são catastróficos:
- Cadastro + primeiro login
- Compra de um produto (Hotmart → liberação de acesso)
- Registro de uma execução de treino completa

Ferramentas: **Maestro** (mais simples de configurar que Detox, boa opção pra Expo) pro mobile; **Playwright** pra web.

---

## Testes manuais de regressão antes de cada release

Mesmo com automação, mantenha uma checklist curta (10-15 itens) dos fluxos principais pra testar manualmente antes de cada deploy de produção — cobre os casos que a automação ainda não chegou a cobrir.

---

## Code review — mesmo sozinho

Se for só você no projeto por enquanto, simule revisão: **deixe um PR "descansar" e revise no dia seguinte** antes de fazer merge na main, em vez de commitar direto. Isso pega uma quantidade surpreendente de erro óbvio que passa batido na hora de escrever.

Checklist de revisão própria:
- [ ] A regra de negócio está no usecase/domínio, não no controller?
- [ ] Tem teste cobrindo a parte nova?
- [ ] RLS foi considerada se mexeu em tabela nova?
- [ ] Migration foi criada se mexeu em schema?

---

## Lint e formatação — padronize cedo

Configure ESLint + Prettier (ou Biome, mais rápido) desde o commit #1, com regras rodando automaticamente no CI (guia 08). Código formatado de forma consistente reduz ruído visual no diff e facilita muito review (mesmo que seja revisão sua própria, depois).

---

## Checklist rápido

- [ ] Testes unitários cobrindo as regras de negócio centrais (cálculo de treino, validações)
- [ ] Testes de integração validando que RLS funciona como esperado
- [ ] 3-5 fluxos E2E cobrindo os caminhos mais críticos (cadastro, compra, registro de treino)
- [ ] CI rodando lint + testes antes de qualquer deploy
- [ ] Checklist de review própria usada antes de merge

---

*Fim da série. Releia na ordem: 01 → 09. A base (modelagem + arquitetura + segurança) é o que mais vale revisar com calma antes de escrever código — o resto se ajusta conforme o projeto cresce.*
