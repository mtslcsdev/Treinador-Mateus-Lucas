# Treinador Mateus Lucas — Guia completo de replicação

Documento único e autossuficiente para reconstruir **todo** este projeto em outro
ambiente (VS Code / Claude Code / Cursor): tokens, componentes, telas, ações,
regras de conteúdo, lógica de domínio e o relatório imprimível.

> **Como usar:** cole este arquivo na raiz do novo projeto como `REPLICAR-PROJETO.md`
> e dê ao agente a instrução: *"Leia REPLICAR-PROJETO.md por inteiro e implemente o
> projeto exatamente como especificado, na ordem da seção 12."*
>
> **Atalho recomendado:** o CSS de tokens da seção 3 é literal — copie e cole, não
> reescreva. Os componentes da seção 5 são o único trabalho real de implementação.

---

## 1. O produto

App web de página única, **desktop-first**, em **português do Brasil**, usado por um
treinador de corrida para planejar e acompanhar o treino de um grupo pequeno de atletas.
Usuário único (o treinador); os atletas recebem PDFs.

Arquitetura de informação — um drill-down de quatro níveis, e todo o design existe para servi-lo:

```
Atletas → Ciclos (bloco periodizado de N semanas) → Semanas → Treinos
```

Superfícies de apoio: dashboard de aderência, planilha do ciclo, biblioteca de treinos,
notas do atleta, validador do ciclo, testes de 3 km que recalculam as zonas, backup
export/import, undo/redo, modo escuro e o relatório A4 da semana.

O conceito de domínio que define a identidade visual é o **sistema de zonas**: um teste
de 3 km define Z4 (limiar); cada outra zona se afasta 20 segundos por quilômetro. Z1→Z5
têm cores fixas que não aparecem em nenhum outro lugar.

### Stack alvo

| Camada | Escolha |
| --- | --- |
| Runtime | HTML + React 18 UMD + Babel standalone (sem build) **ou** Vite + React se o projeto novo tiver build |
| Estilo | CSS puro com custom properties (os tokens da seção 3). Sem Tailwind, sem CSS-in-JS |
| Componentes | React function components, um arquivo `.jsx` por componente + `.d.ts` de contrato |
| Ícones | Lucide `0.469.0` (CDN UMD ou `lucide-react`), stroke `1.75` |
| Fonte | Inter 400–800 (Google Fonts) + `Courier New` só para pace |
| Dados | `localStorage` (mock em memória serve para o protótipo) |
| Idioma | pt-BR em toda a UI, incluindo rótulos de código |

### Estrutura de pastas a criar

```
styles.css                  # só @import dos tokens
tokens/
  fonts.css colors.css typography.css spacing.css
  radius.css shadows.css motion.css zones.css dark.css
components/
  core/        Button IconButton Icon Input Select Toggle Card SectionHeader EmptyState
  data/        AthleteCard CycleCard WorkoutCard ZoneCard DayCard CycleGrid StatItem
               DashboardStatCard VolumeChart Sparkline ProgressRing ExecutionStats WorkoutsTable
  feedback/    TrainingTypeBadge PhaseBadge FeedbackChip Toast ConfirmModal
               RaceTargetBanner ValidationItem
  forms/       WorkoutBuilder QuickAdd WorkoutLibrary CopyWorkoutDialog WorkoutFeedbackForm
  navigation/  AppHeader Breadcrumb WeekNav Sidebar Drawer
app/
  data.js      # roster, semanas, grade, biblioteca, série de volume
  screens.jsx  # DashboardScreen RosterScreen AthleteScreen + matemática de zonas
  planilha.jsx # PlanilhaView (a planilha do ciclo)
  cycle.jsx    # CycleScreen + StatusChip + ExecutionStrip
  app.jsx      # shell: header, breadcrumb, sidebar, drawer de notas, toasts, dark mode
  index.html
relatorio/     # a página A4 do relatório (seção 10)
```

`styles.css` é o único arquivo que o consumidor linka:

```css
/* Treinador Mateus Lucas — global entry point. Imports only. */
@import url("tokens/fonts.css");
@import url("tokens/colors.css");
@import url("tokens/typography.css");
@import url("tokens/spacing.css");
@import url("tokens/radius.css");
@import url("tokens/shadows.css");
@import url("tokens/motion.css");
@import url("tokens/zones.css");
@import url("tokens/dark.css");
```

---

## 2. Reset e base da página

Todo HTML de entrada usa este bloco depois de linkar `styles.css`:

```css
html,body{margin:0;min-height:100%}
body{font-family:var(--font-sans);font-size:var(--text-base);background:var(--bg-app);
  color:var(--text-primary);line-height:var(--leading-body)}
*,*::before,*::after{box-sizing:border-box}
a{color:var(--primary);text-decoration:none}
a:hover{color:var(--primary-dark);text-decoration:underline}
svg{display:block}
```

Ordem de carregamento do `index.html` (React UMD, sem build):

```html
<link rel="stylesheet" href="../styles.css">
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>
<script src="https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js"></script>
<script src="data.js"></script>
<!-- depois, em ordem: screens.jsx, planilha.jsx, cycle.jsx, app.jsx -->
```

Cada `<script type="text/babel">` tem escopo próprio: exporte os componentes
compartilhados no fim do arquivo com `Object.assign(window,{...})`.

---

## 3. Tokens — CSS literal

Copie cada bloco para o arquivo indicado. **Não invente valores novos.**

### `tokens/fonts.css`
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");
```
Se preferir auto-hospedar, coloque os `.woff2` em `assets/fonts/` e troque por `@font-face`.
Nas páginas, injete também `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
para a fonte baixar em paralelo com o CSS.

### `tokens/colors.css`
```css
:root{
  /* Brand — azul escuro profissional */
  --primary:#0f3a7d;
  --primary-dark:#061e3e;
  --primary-light:#e8f0ff;
  --primary-border:#1a5ab8;
  --primary-on-tint:#0f3a7d;  /* texto/ícone sobre --primary-light */
  --accent:#1873d4;
  --header-gradient-from:#0f3a7d;
  --header-gradient-to:#051b2f;
  --header-rule:#1873d4;

  /* Status */
  --success:#10b981;
  --success-light:#ecfdf5;
  --success-on-fill:#052e21;
  --warning:#f59e0b;
  --warning-light:#fffbeb;
  --danger:#ef4444;
  --danger-light:#fef2f2;
  --danger-on-fill:#2d0505;
  --info:#06b6d4;

  /* Neutrals */
  --gray-50:#f8fafc;
  --gray-100:#f1f5f9;
  --gray-200:#e2e8f0;
  --gray-300:#cbd5e1;
  --gray-400:#94a3b8;
  --gray-500:#64748b;
  --fill-neutral:#64748b;
  --fill-neutral-hover:#475569;
  --gray-600:#475569;
  --gray-700:#334155;
  --gray-800:#1e293b;
  --gray-900:#0f172a;

  /* Surfaces */
  --bg-app:#f0f4f8;
  --bg-surface:#ffffff;
  --bg-muted:#f1f5f9;
  --card-bg:#ffffff;
  --input-bg:#ffffff;
  --bg-primary:#ffffff;
  --bg-secondary:#f1f5f9;

  /* Borders */
  --border:#e2e8f0;
  --border-focus:#1a5ab8;
  --border-color:#e2e8f0;
  --input-border:#e2e8f0;

  /* Text */
  --text-primary:#0f172a;
  --text-secondary:#64748b;
  --text-muted:#94a3b8;
  --text-on-primary:#ffffff;

  --focus-ring:0 0 0 3px rgba(15,58,125,0.1);
}
```

**Papéis que existem por causa de bugs reais de contraste — não os colapse:**

- `--primary-on-tint` é o texto **sobre** `--primary-light`; `--primary` é o preenchimento sólido sob rótulo branco. Usar `--primary` como texto no tint lia 1.6:1 no modo escuro.
- `--success-on-fill` / `--danger-on-fill`: branco sobre `--success` lia **2.54:1** e sobre `--danger` **3.76:1** — falhava nos dois modos. Os preenchimentos mantêm o valor (também são a cor de *texto* do chip sobre o tint claro) e o rótulo ganhou token próprio: 5.83:1 e 4.91:1.
- `--fill-neutral` / `--fill-neutral-hover`: preenchimento do `Button variant="back"`. Antes usava `--gray-500/600`, o que travava a rampa neutra. **Um degrau da rampa é uma posição numa escala, não o preenchimento de um componente.**
- `--focus-ring` no claro é navy a 10% — invisível no escuro, por isso o escuro tem anel próprio a 35%.
- **A regra que saiu da auditoria:** `gray-*` cru para preenchimento, `--text-*` semântico para texto.

### `tokens/typography.css`
```css
:root{
  --font-sans:'Inter','Segoe UI',system-ui,-apple-system,sans-serif;
  --font-mono:'Courier New',monospace; /* pace values only */

  --text-base:14px;      /* body */
  --text-9:9.5px;        /* chart labels */
  --text-10:10px;        /* micro labels, badges */
  --text-11:11px;        /* uppercase eyebrows */
  --text-12:12px;        /* chips, meta */
  --text-13:13px;        /* buttons, subtitles */
  --text-13-5:13.5px;    /* inputs, toasts */
  --text-15:15px;        /* drawer titles */
  --text-16:1rem;        /* h2 / section title */
  --text-17:17px;        /* modal title */
  --text-20:1.25rem;     /* app header h1 */
  --text-22:22px;        /* zone pace */
  --text-27:1.7rem;      /* stat value */

  --weight-regular:400;
  --weight-medium:500;
  --weight-semibold:600;
  --weight-bold:700;
  --weight-black:800;

  --leading-tight:1.3;
  --leading-body:1.5;
  --leading-relaxed:1.6;

  --tracking-eyebrow:0.5px;
  --tracking-eyebrow-wide:0.7px;
  --tracking-title:-0.5px;
}
```

### `tokens/spacing.css`
```css
:root{
  --max-width-desktop:1400px;
  --padding-desktop:3rem;
  --padding-tablet:2rem;
  --padding-mobile:1rem;
  --gap-sections:2rem;

  --space-2:2px;  --space-4:4px;  --space-6:6px;  --space-8:8px;
  --space-10:10px; --space-12:12px; --space-14:14px; --space-16:16px;
  --space-18:18px; --space-20:20px; --space-24:24px; --space-32:32px;

  --card-padding:2rem;
  --card-padding-compact:16px;
  --sidebar-width:280px;
  --sidebar-width-mobile:80vw;
}
```

### `tokens/radius.css`
```css
:root{
  --radius-xs:4px;
  --radius-sm:6px;
  --radius-md:10px;
  --radius-lg:14px;
  --radius-xl:18px;
  --radius-card:12px;         /* .card */
  --radius-card-athlete:16px; /* .atleta-card */
  --radius-pill:99px;
  --radius-round:50%;
}
```

### `tokens/shadows.css`
```css
:root{
  --shadow-xs:0 1px 2px rgba(0,0,0,0.06);
  --shadow-sm:0 1px 3px rgba(0,0,0,0.08),0 1px 2px rgba(0,0,0,0.05);
  --shadow-md:0 4px 12px rgba(0,0,0,0.09),0 2px 4px rgba(0,0,0,0.05);
  --shadow-lg:0 10px 28px rgba(0,0,0,0.11),0 4px 10px rgba(0,0,0,0.06);
  --shadow-xl:0 20px 50px rgba(0,0,0,0.14),0 8px 20px rgba(0,0,0,0.08);

  --shadow-card:0 2px 8px rgba(0,0,0,0.05);
  --shadow-card-athlete:0 4px 12px rgba(0,0,0,0.06);
  --shadow-card-athlete-hover:0 16px 40px rgba(15,58,125,0.15),0 4px 12px rgba(0,0,0,0.08);
  --shadow-header:0 8px 32px rgba(15,58,125,0.3),0 2px 8px rgba(0,0,0,0.1);
  --shadow-button-hover:0 4px 12px rgba(15,58,125,0.25);
  --shadow-modal:0 20px 50px rgba(15,58,125,0.15),0 8px 20px rgba(0,0,0,0.08);
  --shadow-drawer:-8px 0 40px rgba(15,23,42,0.18);
}
```

### `tokens/motion.css`
```css
:root{
  --duration-fast:0.15s;
  --duration-base:0.2s;
  --duration-slow:0.3s;
  --duration-drawer:0.25s;

  --ease-standard:cubic-bezier(0.4,0,0.2,1);
  --ease-drawer:cubic-bezier(0.16,1,0.3,1);
  --ease-overshoot:cubic-bezier(0.34,1.56,0.64,1); /* crescimento das barras */

  --lift-hover:-1px;         /* botões */
  --lift-card-hover:-2px;    /* cards de ciclo */
  --lift-card-hover-lg:-6px; /* cards de atleta */

  --overlay-scrim:rgba(15,23,42,0.6);
  --overlay-scrim-light:rgba(15,23,42,0.55);
  --overlay-scrim-heavy:rgba(15,23,42,0.78);
}
```

### `tokens/zones.css`
```css
:root{
  /* Z1 mais lenta → Z5 mais rápida. Valores sólidos em superfície clara. */
  --z1:#16a34a;
  --z2:#0891b2;
  --z3:#ca8a04;
  --z4:#ea580c;
  --z5:#dc2626;

  /* Variantes claras, usadas sobre o painel navy */
  --z1-on-dark:#4ade80;
  --z2-on-dark:#38bdf8;
  --z3-on-dark:#fbbf24;
  --z4-on-dark:#fb923c;
  --z5-on-dark:#f87171;
}
```
As cinco cores de zona **não aparecem em nenhum outro lugar do produto**.

### `tokens/dark.css`
```css
body.dark{
  /* Superfícies */
  --bg-app:#1a1f2e;
  --bg-surface:#252d3d;
  --bg-muted:#2a3342;
  --bg-primary:#252d3d;
  --bg-secondary:#2a3342;
  --card-bg:#252d3d;
  --input-bg:#1f2633;

  /* Bordas e foco */
  --border:#3d4758;
  --border-color:#3d4758;
  --input-border:#3d4758;
  --border-focus:#4d8fe8;
  --focus-ring:0 0 0 3px rgba(77,143,232,0.35);

  /* Texto */
  --text-primary:#e8ecf1;
  --text-secondary:#b0b8c3;
  --text-muted:#9ba3b0;

  /* Marca */
  --primary-light:#2d4a7f;
  --primary-border:#2563eb;
  --primary-on-tint:#a9c9f5;

  /* Tintas de status — equivalentes escuros das pastéis claras */
  --success-light:#12352a;
  --warning-light:#3a2e12;
  --danger-light:#251212;

  /* Neutros: escala monotônica, escuro → claro, sem degrau repetido */
  --gray-50:#252d3d;
  --gray-100:#2f3846;
  --gray-200:#3d4758;
  --gray-300:#4a5568;
  --gray-400:#64748b;
  --gray-500:#7c8797;
  --gray-600:#97a1af;
  --gray-700:#c3cad4;
  --gray-800:#dde2e9;
  --gray-900:#eef1f5;

  --fill-neutral:#4a5568;
  --fill-neutral-hover:#5a6577;

  --header-gradient-from:#1e3a8a;
  --header-gradient-to:#0f172a;
}
```
O modo escuro é ativado com `document.body.classList.toggle('dark', dark)`.
As cores de zona **não mudam** no escuro (só se usa a variante `-on-dark` sobre o painel navy).

---

## 4. Fundamentos visuais

**Cor.** Um navy de marca (`#0f3a7d`) com um tom escuro, um tint claro e um azul de
acento. Rampa neutra slate 50→900. Quatro cores semânticas (verde/âmbar/vermelho/ciano),
cada uma com um tint claríssimo. Cinco cores de zona, só para zonas. Fundo do app
`#f0f4f8`; cards brancos puros. **Essa é a paleta inteira** — sem roxo, sem gradientes
decorativos, sem terceira família de matiz.

**Gradientes são estruturais, não decorativos.** Exatamente quatro usos:
1. header/painel navy a 135° (`#0f3a7d → #051b2f`);
2. régua de 5px no topo de cada card de atleta, 90° navy→azul;
3. quadrado do avatar, 135° navy→acento;
4. preenchimento das barras de volume, 180° acento→navy.

Banners âmbar usam um 135° suave `#fef9c3 → #fefce8`. Nunca gradiente multi-matiz.

**Tipografia.** Inter apenas, 400–800. `Courier New` só em pace e tempo, com 1px de
letter-spacing. Escala compacta: 14px corpo, 1rem títulos de seção, 1.25rem header,
13px botões, 12px chips, 11px eyebrows, 9.5px rótulos de gráfico. O único tipo grande
do produto é um número: valores de stat 1.7rem/800 e pace de zona 22px/800. Títulos 700
com line-height 1.3; corpo 1.5; descrição 1.6.

**Layout.** Centralizado, `max-width: 1400px`, gutter 3rem no desktop (2rem tablet,
1rem mobile), 2rem entre seções. Tudo mora em cards brancos empilhados. Todos os grids
são `auto-fit/auto-fill minmax()`: atletas 340px/gap 2rem, ciclos 220px/14px, zonas
140px/10px, cards de dashboard 200px/12px. O header é `position: sticky`; nada mais é fixo.

**Fundos.** Sem foto, sem ilustração, sem textura, sem padrão. Profundidade vem só de
cor de superfície e sombra. O único momento "hero" é o painel navy de Zonas de Treino.

**Bordas.** Presentes em quase toda superfície: 1px `#e2e8f0` em cards e linhas de tabela,
**1.5px** em inputs, cards de ciclo e de treino, **2px** em cards de atleta, 2px na régua
sob títulos de dashboard. Réguas de 3–4px à esquerda marcam significado: 4px navy/acento
em seções de semana, 3px colorido em linhas do validador e em blocos. Bordas tracejadas
1.5px significam "vazio, adicione algo aqui".

**Cantos.** 4/6/10/12/14/16/18px: 6px em botões e inputs, 10px em cards de ciclo e de
treino, 12px em cards de seção e avatares, 16px em cards de atleta, 20px/99px em pills e
chips, 50% só no círculo de score do validador e no botão do toggle.

**Sombras.** Contidas e cinza-frias, nunca coloridas fora do hover. Cards em repouso
`0 2px 8px rgba(0,0,0,0.05)`, sobem para `--shadow-md` no hover; cards de atleta saltam
para a sombra grande com tom navy. O header carrega `0 8px 32px rgba(15,58,125,0.3)`.
Botões ganham sombra colorida combinando com o preenchimento no hover. Drawers projetam
para a esquerda. Sombra interna aparece só no hover de linha de tabela
(`inset 0 0 8px rgba(15,58,125,0.06)`) e nos anéis de foco.

**Estados de interação.**
- *Hover* — botões escurecem e sobem 1px com sombra colorida; cards ganham borda navy, sobem 2px (ciclo) ou 6px (atleta) e adensam a sombra; tiles de zona sobem 3px e clareiam o vidro; icon buttons trocam para preenchimento tinto ou sólido; barras clareiam 12% (`filter: brightness(1.12)`); linhas de tabela tingem 3% navy; links escurecem e sublinham.
- *Press* — não existe estado próprio. O transform é o feedback.
- *Focus* — outline navy 2px com offset 2px em botões e links; inputs trocam a borda para `#1a5ab8` mais anel de 3px. No painel navy, o anel é branco a 15%.
- *Disabled* — preenchimento `--gray-200`, texto `--gray-400`, opacidade 0.45, sem transform.
- *Invalid* — borda vermelha + anel vermelho de 3px, mensagem abaixo do campo.

**A direção do hover segue o rótulo.** Preenchimento claro sob rótulo escuro *clareia*
no hover; preenchimento escuro sob rótulo branco *escurece*.
`success` clareia (#10b981 → #34d399, 7.70:1), `danger` clareia (#ef4444 → #f87171, 6.69:1),
`export` — rótulo branco — escurece (#0284c7 → #145fa8, 6.50:1).

**Movimento.** Curto e funcional. 0.15s para cor/borda, 0.2s para sombra e fade-in de card
(`fadeIn`: sobe 6px + opacidade), 0.25s para drawers, 0.3s para sidebar e cards de atleta.
Toasts entram deslizando 50px da direita e escalam de 0.96; modais sobem 20px e escalam de
0.98. O único easing brincalhão é o overshoot da barra de volume ao crescer. Skeletons
brilham em 1.2s. Sem parallax, sem animação de scroll, sem loop.

**Transparência e blur.** Blur aparece **uma vez**: `backdrop-filter: blur(10px)` nos tiles
de zona sobre o gradiente navy. Sobre navy, tudo é branco com alfa —
`rgba(255,255,255,0.1/0.15/0.18/0.25)` para preenchimento e borda,
`rgba(255,255,255,0.6–0.95)` para texto. Scrims: `rgba(15,23,42,0.55–0.78)`.

---

## 5. Iconografia

**Lucide, stroke 1.75, tamanhos 12–20px**, embrulhado por um componente `Icon`.
Nunca misture sets. Nunca use ícone preenchido. Nunca coloque ícone em badge ou chip sem
rótulo de texto ao lado. Botão só-ícone sempre tem `title`.

| Conceito | Ícone |
| --- | --- |
| Marca / corrida | `footprints` |
| Atletas | `users` |
| Ciclo / plano | `clipboard-list` · biblioteca `library` |
| Semanas e calendário | `calendar-days` · semana vazia `calendar-plus` |
| Treino | `activity` · construtor `wand-sparkles` · blocos `layers` |
| Zonas | `zap` |
| Métricas | `bar-chart-3` `trending-up` `route` `gauge` |
| Distância / tempo / FC | `ruler` `timer` `heart-pulse` · relógio `watch` |
| Prova alvo | `target` |
| Dados | `save` `download` `upload` `shield-check` `trash-2` |
| Edição | `pencil` `plus` `copy` `search` `sticky-note` |
| Status | `circle-check` `circle-dashed` `circle-x` `circle` |
| Alertas | `triangle-alert` `info` `circle-help` |
| Tema e chrome | `moon` `sun` `menu` `x` `undo-2` `redo-2` `arrow-left` `chevron-right` `lock` |

**Os cinco pontos de zona (🟢🔵🟡🟠🔴) são o único emoji que fica**, no `ZoneCard`, porque
ali a cor *é* a informação. Todo o resto é ícone de linha.

Caracteres unicode continuam fazendo trabalho tipográfico: `·` separa fatos, `•` abre
bullets de hint, `—` significa "sem valor ainda", `›` separa breadcrumbs.

**Não existe logo.** O header usa o ícone `footprints` ao lado do nome do produto em Inter.
Onde iria um logo, componha o nome como tipo.

---

## 6. Componentes — contratos de props

45 componentes. Cada um é uma função React que aceita `style` e compõe com tokens.
Assinaturas abaixo em TypeScript; implemente em `.jsx` e mantenha o `.d.ts` ao lado.

### core

```ts
// Ação primária. Preenchimento sólido, raio 6px, sobe 1px no hover.
Button({ variant?:'primary'|'success'|'danger'|'ghost'|'back'|'export'|'header'|'template',
  size?:'sm'|'md'|'lg', disabled?, fullWidth?, type?:'button'|'submit', onClick?, children?, style? })

// Botão quadrado de ação em linha/card (editar, remover, notas).
IconButton({ icon, tone?:'neutral'|'danger'|'primary'|'success'|'onDark',
  size?/*28 canto de card, 32 header de drawer, 34 linha de treino*/, title?, disabled?, onClick?, style? })

// Ícone de linha Lucide.
Icon({ name/*kebab-case*/, size?/*16 chip, 18 default, 20 header, 24 métrica*/,
  strokeWidth?/*1.75, nunca abaixo de 1.5*/, color?, style? })

// Campo de texto. Borda 1.5px, raio 6px, anel de foco navy.
Input({ value?, onChange?, placeholder?, label?, error?, disabled?, invalid?,
  mono?/*Courier New + 1px tracking, para pace*/, onDark?/*tratamento sobre navy*/, type?, style? })

Select({ value?, onChange?, options?:Array<string|{value,label}>, placeholder?, disabled?, style? })

// Pill 44×22. Verde quando ligado. Rótulo à ESQUERDA da trilha.
Toggle({ checked?, onChange?:(next:boolean)=>void, label?, onDark? })

// Container primário: branco, raio 12px, borda 1px, padding 2rem.
Card({ children?, padding?, variant?:'surface'|'navy', style? })

// Abre todo Card: título (+subtítulo) à esquerda, ações à direita.
SectionHeader({ title, subtitle?, actions?, style? })

// Vazio de lista: ícone grande centrado + duas linhas de copy que dizem qual botão apertar.
EmptyState({ icon?, title, subtitle?, style? })
```

### data

```ts
// Tile de atleta. Passe os sinais de treino e ele muda para o layout rico.
AthleteCard({ name, cycles?, workouts?, hasNotes?, selected?, onClick?, actions?,
  adherence?/*0–100 → anel*/, trend?:number[]/*km por semana, mais antigo primeiro → sparkline*/,
  nextWorkout?/*"Ter 04/08 · Progressivo 8 km"*/, testPace?/*"05:00/km"*/, style? })

CycleCard({ name, weeks?, workouts?, race?, isTemplate?, onClick?, actions?, style? })

// Um treino dentro de uma semana: régua datada, badge de tipo, badge de fase, prescrição, chips.
WorkoutCard({ weekday?/*"TER"*/, day?, month?/*"AGO"*/, badge?, phase?,
  description?/*newlines preservadas*/, chips?:ReactNode[], actions?, style? })

// Tile de zona — painel de vidro sobre navy, régua colorida 3px no topo, pace monoespaçado.
ZoneCard({ zone?:'Z1'|'Z2'|'Z3'|'Z4'|'Z5', pace, speed?, name?, style? })

DayCard({ weekday, day, status?:'feito'|'parcial'|'perdido'|'prescrito'|'descanso', summary?, selected?, onClick?, style? })

// O ciclo inteiro como planilha: semanas para baixo, dias para o lado, volume à direita.
// Chips de treino arrastáveis entre quaisquer duas células; clicar abre o diálogo copiar/mover.
CycleGrid({ weeks?:Array<{id,nome,sub?,fase?:'Base'|'Específico'|'Polimento',
    dias?:Record<'seg'|'ter'|'qua'|'qui'|'sex'|'sab'|'dom', Array<{tipo?,dist?,zona?,resumo?}>>}>,
  onCellClick?:(week,day)=>void,
  onWorkoutClick?:(week,day,workout,index)=>void,
  onWorkoutMove?:(from:{weekId,day,index},to:{weekId,day},workout)=>void,
  onWeekAction?:(week, action:'duplicar'|'template'|'repetir'|'mover'|'limpar')=>void, style? })

StatItem({ label, value, tone?:'success'|'warning'|'danger', style? })
DashboardStatCard({ icon?, label, value, meta?, style? })

// Gráfico de barras em CSS. Gradiente acento→navy; semana vazia vira stub cinza "sem dados".
VolumeChart({ title?, note?, data?:Array<{label:string,value:number}>, style? })

// Linha de tendência minúscula. Sem eixo, sem rótulo — só forma. 6–12 pontos leem melhor.
Sparkline({ data?:number[], width?, height?, color?, fill?, style? })

// Anel de aderência. A cor é derivada: ≥80 verde, ≥50 âmbar, abaixo vermelho.
ProgressRing({ value?/*0–100*/, size?, thickness?, label?, style? })

ExecutionStats({ data?:{dist?,tempo?,pace?,fc?,cadencia?,calorias?,elevacao?},
  source?/*"Sincronizado do Garmin · 17/08"*/, style? })

// Tabela de relatório com header em gradiente navy e régua de acento 3px.
WorkoutsTable({ columns?:ReactNode[], rows?:ReactNode[][], style? })
```

### feedback

```ts
// Pill do tipo de treino. Cada tipo tem um par pastel/tinta FIXO — nunca recolora.
TrainingTypeBadge({ type?:'leve'|'fartlek'|'progressivo'|'intervalado'|'repeticoes'|'bloco'
  |'longao'|'ritmado'|'trt'|'default', children?, style? })

// Fase de periodização. Raio 4px quadradão, para distinguir da pill redonda de tipo.
PhaseBadge({ phase?:'Base'|'Específico'|'Polimento', style? })

// Esforço percebido pelo atleta num treino concluído. Cinco níveis fixos.
FeedbackChip({ level?:'muito-facil'|'facil'|'normal'|'dificil'|'muito-dificil', children?, style? })

// Confirmação transitória, topo-direito, 3.2s. O ícone vem do kind — não passe o seu.
Toast({ kind?:'sucesso'|'erro'|'aviso'|'info', children?, style? })

// Diálogo central. Substitui window.confirm em todo lugar.
ConfirmModal({ kind?:'perigo'|'atencao'|'confirmar', title, message?, confirmLabel?, cancelLabel?,
  onConfirm?, onCancel?, children?/*um select ou input entre mensagem e botões*/, style? })

// Banner âmbar com a prova alvo do ciclo e a contagem regressiva. Fica logo sob o título do ciclo.
RaceTargetBanner({ name, detail?, days?, actions?, style? })

// Um achado do validador: linha tinta com régua de 3px à esquerda.
ValidationItem({ level?:'erro'|'aviso'|'info', title, description?, action?, style? })
```

### forms

```ts
// Editor estruturado. Blocos entram; texto da prescrição e duração saem — todo pace e toda
// janela de tempo são calculados a partir da tabela de zonas DESTE atleta.
WorkoutBuilder({ zones?/*{Z1:{min,max},…} em s/km*/, athlete?:{nome,teste?},
  value?:WorkoutDraft, onChange?, onSave?/*recebe draft + {dist,min,max,minTxt,maxTxt}*/,
  onSaveToLibrary?/*a biblioteca guarda ZONAS, nunca paces*/, onCancel?, style? })
// WorkoutBlock = {repeticoes?, distancia?, zona?:'Z1'..'Z5', intervalo?/*"2min trote"*/}
// WorkoutDraft = {tipo?, fase?, data?, obs?, blocos?:WorkoutBlock[]}
blockLine(block, index): string
estimate(blocks, zones): {dist,min,max,minTxt,maxTxt}
blockEstimate(block, zones): {km,paceMin,paceMax,min,max,minTxt,maxTxt}
hms(seconds): string   // MM:SS ou HH:MM:SS

// Entrada de uma linha. O treinador digita a taquigrafia, vê preview ao vivo, aperta Enter.
QuickAdd({ zones?, placeholder?, onAdd?:(parsed,raw)=>void, autoFocus?, style? })
parseWorkout(text, zones): ParsedWorkout|null
// ParsedWorkout = {tipo, fase, blocos, dist, minTxt, maxTxt, resumo}

// Seletor de treinos salvos. Clique na linha para inserir na semana em edição.
WorkoutLibrary({ items?:Array<{nome,tipo?,dist?,blocos?,usos?}>, onPick?, onRemove?, query?, onQuery?, style? })

// Manda um treino para outros dias: copiar para vários ou mover para um.
CopyWorkoutDialog({ workout?, origin?:{weekId,weekNome?,dayLabel?}, weeks?:Array<{id,nome,sub?}>,
  onConfirm?:({mode:'copiar'|'mover', weekId, days:string[]})=>void, onEdit?, onRemove?, onCancel?, style? })

// Relato do atleta pós-treino. TODOS os alvos de toque ≥44px — é o único formulário
// usado no celular, na rua.
WorkoutFeedbackForm({ value?:{status?:'feito'|'parcial'|'perdido',
  esforco?/*mesmos níveis do FeedbackChip*/, dist?, tempo?, comentario?},
  onSubmit?, onSync?/*puxar do Garmin/Strava*/, synced?, style? })
```

### navigation

```ts
// Barra navy sticky com a marca, o nome do produto e botões translúcidos.
AppHeader({ title?, logo?, actions?/*Button variant="header" / IconButton tone="onDark"*/,
  onMenu?, showMenu?/*abaixo de 1024px*/, style? })

// Trilha de largura total sob o header. Só aparece quando o usuário está dentro de um atleta.
Breadcrumb({ items?:ReactNode[], onNavigate?:(index)=>void /*o último crumb é inerte*/, style? })

// Paginador de semana: voltar / intervalo de datas / avançar.
WeekNav({ label/*"17/08/2026 até 23/08/2026"*/, sub?/*"Semana 3 de 14 · Período Base"*/,
  onPrev?, onNext?, actions?, style? })

// Menu off-canvas de 280px, header navy, títulos de seção em maiúsculas.
Sidebar({ open?, sections?:Array<{title, items:Array<{id,icon,label}>}>,
  activeId?/*régua navy 4px à esquerda + preenchimento tinto*/, onSelect?, onClose?, footer?, style? })

// Slide-over à direita. tone: primary = editor de treino, info = biblioteca, success = notas.
Drawer({ open?, tone?:'primary'|'info'|'success', title?, subtitle?, onClose?, footer?,
  children?, width?/*600 editor, 520 notas, 480 biblioteca*/, style? })
```

**Ausentes de propósito:** Avatar, Tabs, Tooltip, Pagination, Accordion — o produto não tem.

---

## 7. Lógica de domínio

### 7.1 Tabela de zonas (o coração do produto)

Um teste de 3 km define Z4. Cada zona se afasta **20 s/km**. Entrada `MM:SS`, saída em s/km:

```js
function zoneTable(test){
  if(!test) return null;
  const [m,s]=test.split(':').map(Number); const t=m*60+s;
  return {Z5:{min:t-20,max:t},Z4:{min:t,max:t+20},Z3:{min:t+20,max:t+40},
          Z2:{min:t+40,max:t+60},Z1:{min:t+60,max:t+80}};
}
const fmtPace=(s)=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
```

Exibição no `ZoneCard`: pace `fmtPace(min) + ' a ' + fmtPace(max) + '/km'`;
velocidade `(3600/max).toFixed(2) + ' a ' + (3600/min).toFixed(2) + ' km/h'`.
Validação da entrada: `/^\d{1,2}:\d{2}$/` — falha vira toast `erro`
**"Formato inválido! Use MM:SS (ex: 05:00)"**; sucesso vira toast `sucesso`
**"Zonas calculadas com sucesso!"**.

### 7.2 Estimativa de treino

```js
// distância total e janela min/max de uma lista de blocos, contra a tabela de zonas
estimate(blocos, zonas) → {dist, min, max, minTxt, maxTxt}
// por bloco: km = distancia * repeticoes; min += km*zona.min; max += km*zona.max
// bloco por duração: min e max += duracao*60
// formato: MM:SS abaixo de 1h, HH:MM:SS acima
```

A biblioteca guarda **zonas, nunca paces** — assim um treino salvo recalcula para qualquer atleta.

### 7.3 Taquigrafia do QuickAdd

```js
parseWorkout('6x800 z4 int 2min', zonas)
```

Regras implementadas:

- **Repetições:** `/(\d+)\s*x\s*(\d+(?:[.,]\d+)?)\s*(km|k|m|min)?/g` — unidade padrão metros.
  `6x800` → 6 × 0.8 km. `min` é convertido por `val/6` (placeholder de ~0.167 km/min).
- **Distância única:** `/(\d+(?:[.,]\d+)?)\s*(km|k)\b/` → `8k z2` = 1 bloco de 8 km.
- **Duração única:** `/(\d+)\s*min\b/` → `40min z1` = bloco por duração, distância 0.
- **Zona:** `/\bz([1-5])\b/`. Padrão: Z4 em repetições, Z2 em distância, Z1 em duração.
- **Intervalo:** `/int(?:ervalo)?\s*([0-9]+\s*(?:min|s|')?(?:\s*\w+)?)/` → `"2min trote"`.
- **Fase:** palavras `base`, `especifico`/`específico`, `polimento` → `Base`/`Específico`/`Polimento`; padrão `Base`.
- **Tipo por palavra:** `leve|regenerativo|reg → leve`, `fartlek`, `progressivo|prog`,
  `intervalado|int|tiros → intervalado`, `repeticoes|repetições|rep`, `bloco|blocos`,
  `longao|longão|long → longao`, `ritmado|ritmo → ritmado`, `trt`.
- **Tipo inferido** quando nada foi dito: repetições ≥8 → `repeticoes`, senão `intervalado`;
  bloco único por zona → Z1 `leve`, Z2 `longao`, Z3 `progressivo`, Z4 `ritmado`, Z5 `intervalado`.
- Retorna `null` quando não encontra nada usável (o botão fica desabilitado).
- `resumo` gerado: `"6x800m Z4 int 2min"`, blocos unidos por `" + "`.

### 7.4 Status e aderência

```js
STATUS = {
  feito:     {label:'Feito',    icon:'circle-check',   bg:'#dcfce7', fg:'#15803d'},
  parcial:   {label:'Parcial',  icon:'circle-dashed',  bg:'#fef3c7', fg:'#92400e'},
  prescrito: {label:'Prescrito',icon:'circle',         bg:'var(--bg-muted)', fg:'var(--text-secondary)'},
  perdido:   {label:'Não feito',icon:'circle-x',       bg:'#fee2e2', fg:'#991b1b'}
}
```

Aderência = % de treinos prescritos concluídos, 0–100. Cor derivada: ≥80 `--success`,
≥60 `--accent` (no anel: ≥50 âmbar), abaixo `--danger`. Nunca passe a cor por prop.

### 7.5 Forma dos dados

```js
window.KIT2 = {
  atletas: [{ id, nome, notas?:true, teste:'05:00', aderencia:78,
    trend:[22,28,31,18,0,26,34,24],          // km por semana, mais antigo primeiro
    proximo:'Ter 04/08 · Progressivo 8 km',
    ciclos:[{id, nome, semanas, treinos, template?, prova?}] }],

  biblioteca: [{ nome:'6x800m no limiar', tipo:'intervalado', dist:9.8, usos:14,
    blocos:[{repeticoes:1,distancia:2,zona:'Z2',intervalo:''},
            {repeticoes:6,distancia:0.8,zona:'Z4',intervalo:'2min trote'},
            {repeticoes:1,distancia:3,zona:'Z1',intervalo:''}] }],

  semanas: [{ id:'s1', nome:'Semana 1', sub:'Ordinária · Base', treinos:[
    { weekday:'TER', day:'04', month:'AGO', tipo:'progressivo', fase:'Base', status:'feito',
      desc:'1. Correr por 8km — Intensidade Z2', dist:8, tempo:'53:20 a 56:00',
      feedback:'normal',
      exec:{dist:'8,003 km',tempo:'00:42:21',pace:'05:18/km',fc:'155 bpm',cad:'176 rpm'} }]}],

  grade: [{ id:'g1', nome:'Semana 1', sub:'Ordinária · Base', fase:'Base',
    dias:{ ter:[{tipo:'progressivo',dist:8,zona:'Z2',resumo:'8km Z2'}] } }],

  volume: [{label:'S1',value:33.8},{label:'S2',value:6},{label:'S3',value:0}]
}
```

Duas semanas do mock são **vazias de propósito** (`s3`, `s4` / `g3`, `g4`) — o estado vazio
é a coisa que o treinador precisa resolver, então precisa aparecer no protótipo.

Roster de exemplo (mantenha se quiser paridade visual): Allan e Pedro Henrique (78%, 05:00),
Jessyka Carvalho (92%, 05:40), Suzy (45%, 06:10), Amanda Sousa (86%, 04:50),
Eugênio Gabriel (61%, 05:25).

Dias da semana, sempre nessa ordem e com esses rótulos:
`{seg:'Segunda',ter:'Terça',qua:'Quarta',qui:'Quinta',sex:'Sexta',sab:'Sábado',dom:'Domingo'}`.

---

## 8. Telas e ações

### 8.0 Shell (`app.jsx`)

Estado: `view` (`dashboard|roster|athlete|cycle|library`), `atletaId`, `ciclo`, `dark`,
`menu`, `notes`, `toasts`.

- **AppHeader** navy sticky: marca `footprints` + nome do produto; à direita — pill
  *"Salvo agora"* com `circle-check`, `undo-2`, `redo-2`, alternador de tema (`moon`/`sun`),
  botão **Backup** (`variant="header"`, ícone `save`) → toast `sucesso`
  **"Backup exportado com sucesso!"**. `showMenu` abre a Sidebar.
- **Breadcrumb** aparece só fora do dashboard e com mais de um crumb:
  `['Atletas', nome do atleta, nome do ciclo]`. Índice 0 volta ao roster e limpa a seleção;
  índice 1 volta ao atleta e limpa o ciclo; o último é inerte.
- **Container:** `max-width:1400px; margin:0 auto; padding:2.5rem 3rem 4rem`.
- **Sidebar** (280px, off-canvas), três seções:
  - *Navegação* — Visão geral (`bar-chart-3`), Atletas (`users`), Biblioteca (`library`)
  - *Configurações* — Exportar backup (`download`), Importar backup (`upload`), Validar dados (`shield-check`)
  - *Ajuda* — Guia rápido (`circle-help`), Sobre (`info`)

  Itens de navegação trocam a view; os demais disparam toast `info`. Fechar ao selecionar.
- **Drawer de notas** (`tone="success"`, 520px): título `Notas — <nome>`, subtítulo
  *"Histórico, lesões, objetivos, características"*, textarea de 300px mínimo,
  footer Cancelar / **Salvar notas** → toast **"Notas salvas!"**.
- **Toasts:** pilha fixa em `top:78px; right:20px`, `zIndex:99999`, auto-remoção em **3200 ms**.
- **Dark mode:** `document.body.classList.toggle('dark', dark)`.

### 8.1 Visão geral (`DashboardScreen`) — tela inicial

Cabeçalho `PageTitle`: eyebrow *"Semana de 03 a 09 de agosto"*, título **Visão geral**,
subtítulo `N atletas · N ciclos ativos`, ações **Exportar** (`ghost`, `download`) e
**Novo atleta** (`plus`).

Quatro métricas grandes (`repeat(auto-fit,minmax(210px,1fr))`, gap 16), **todas derivadas do roster**:

| Métrica | Valor | Extra |
| --- | --- | --- |
| Aderência média (`gauge`) | média das aderências, tom por faixa | `ProgressRing` 52px |
| Volume da semana (`route`) | soma do último ponto de `trend` de cada atleta | `Sparkline` 96×34 |
| Treinos prescritos (`calendar-check`) | prescritos, com meta "N feitos · N pendentes" | — |
| Semanas vazias (`triangle-alert`, tom `warning`) | contagem, com quais semanas | — |

Abaixo, grid `1.35fr 1fr`, gap 20:

- **Atletas** (card): subtítulo *"Ordenado por aderência — quem precisa de atenção aparece primeiro"*.
  Cada linha (`AthleteRow`): `ProgressRing` 40px, nome, próxima sessão com `calendar-days`,
  bloco "TESTE 3KM" monoespaçado, `Sparkline` 86×26 colorido pela faixa de aderência,
  `chevron-right`. Hover: borda navy + fundo `--bg-muted`. Clique abre o atleta.
- **Volume por semana**: `VolumeChart` sem moldura própria, subtítulo "Ciclo ativo · N km".
- **Pendências**: `ValidationItem` — `erro` "Semana 3 e 4 sem treinos" com botão **Preencher**;
  `aviso` "Suzy com 45% de aderência" com botão **Ver**; `info` "Teste de 3km vencido".

### 8.2 Atletas (`RosterScreen`)

Um card com `SectionHeader` (`users`, subtítulo `N atletas cadastrados`, ação
**Novo atleta** `variant="success"`), e um grid `repeat(auto-fit,minmax(340px,1fr))` gap 20
de `AthleteCard` — cada um com anel de aderência, sparkline de 8 semanas, próxima sessão e
teste de 3 km. Três `IconButton` no canto, revelados no hover: notas (`sticky-note`, tone
`success`), editar nome (`pencil`), remover (`trash-2`, tone `danger`). Os dois últimos são
desabilitados fora do modo de edição e usam `e.stopPropagation()`.

Remoção usa `ConfirmModal kind="perigo"` listando o que desaparece e afirmando o backup
(ver seção 9).

### 8.3 Atleta (`AthleteScreen`)

`PageTitle`: eyebrow *"Atleta"*, título com o nome, subtítulo
`N ciclos · aderência N% · próximo: <sessão>`, ação **Notas** (`sticky-note`, `ghost`).

**Painel de zonas** — `Card variant="navy"`, o único momento hero do produto:
- Título `zap` **Zonas de treino**, subtítulo *"Incrementos de 20s · Z4 = pace do teste de 3km"*.
- `Input onDark mono label="Teste 3km (MM:SS)"` + botão branco **Calcular** (`calculator`).
- Grid `repeat(auto-fit,minmax(140px,1fr))` gap 10 com **Z5 → Z1** nessa ordem
  (mais rápida primeiro), cada um um `ZoneCard` com pace e faixa de velocidade.
- Sem pace ainda: *"Digite o pace acima e clique Calcular"* centralizado, branco a 60%.

**Ciclos** — card com `SectionHeader` (`clipboard-list`, subtítulo *"Selecione um ciclo para
editar as semanas"*, ações **Copiar existente** (`copy`, `ghost`) e **Novo ciclo** (`plus`),
ambas gated por modo de edição). Grid `repeat(auto-fill,minmax(240px,1fr))` gap 14 de
`CycleCard`, cada um com botão **Abrir ciclo** (`success`, `fullWidth`).

### 8.4 Ciclo (`CycleScreen`)

**Cabeçalho do ciclo:** link de volta (`arrow-left` + nome do atleta), nome do ciclo em
1.35rem/700, linha `N semanas · N treinos · N km prescritos`. Ações: **Prova alvo**
(`target`, ghost), **Calendário** (`calendar-days`, ghost), **Relatório**
(`variant="export"`, `file-text`) → toast `info` *"Gerando PDF do ciclo..."*.

Se o ciclo tem prova: `RaceTargetBanner` com nome, detalhe e dias restantes.

Quatro `DashboardStatCard`: Volume prescrito (`route`), Executados (`check-circle-2`),
Semanas vazias (`triangle-alert`, meta "precisa preencher" / "ciclo completo"),
Prova alvo (`target`, ou "Não definida"). Depois, `VolumeChart` do ciclo.

**Duas abas** (pill group em `--bg-muted`, padding 4, aba ativa com fundo branco + `--shadow-xs`):
`Planilha` (`table-2`, **padrão**) e `Semanas` (`list`). *Planilha é para escrever; a lista de
semanas é para ler e ver detalhe.*

#### Aba Planilha (`PlanilhaView`)

- `SectionHeader` `table-2` **Planilha do ciclo**, subtítulo
  `N semanas · N km · N semana(s) vazia(s)`.
- Faixa de **adição rápida** em `--bg-muted`: `QuickAdd` com placeholder
  *"Adição rápida na 1ª semana vazia: 8k z2"* — insere na **primeira semana vazia** (ou na
  primeira semana), na terça, e dá toast `Treino adicionado em <semana>`.
- `CycleGrid`: semanas para baixo, dias para o lado, barra de volume por linha.
  - **Célula vazia** → hover mostra `+` → abre o drawer de adição naquele dia.
  - **Clique no chip** → `CopyWorkoutDialog`.
  - **Arrastar chip** para qualquer dia de qualquer semana → move, toast
    `Movido para <semana> · <dia>`. A célula alvo fica tracejada em azul acento e uma pill
    sob o grid nomeia o que está sendo arrastado.
  - **Menu da linha (⋮)** → `duplicar` (imediato) · `limpar` (imediato) · `template`,
    `repetir`, `mover` (abrem `ConfirmModal` com um controle extra).
- **Legenda:** régua acento = semana com treinos; régua âmbar = semana vazia;
  "Arraste o treino entre dias e semanas" (`move`); "Clique no treino para copiar em vários dias" (`copy`).

**Ações de semana, comportamento exato:**

| Ação | Efeito | Toast |
| --- | --- | --- |
| `limpar` | zera `dias` da semana | `<Semana> limpa` (info) |
| `duplicar` | insere uma cópia profunda logo abaixo, nomeada `Semana <n+1>` | `<Semana> duplicada` (sucesso) |
| `repetir` | copia os dias nas próximas **N** semanas (input, padrão 3) | `Semana repetida nas próximas N` |
| `template` | escolhe um treino da biblioteca (select) e preenche terça + longão 14 km no sábado | `Template aplicado em <Semana>` |
| `mover` | desloca as datas em **N** dias (input, padrão 7) | `Datas deslocadas em N dia(s)` |

**Drawer de adição** (`tone="primary"`, 620px), título `Adicionar treino · <Semana>`,
subtítulo `<Dia> · <sub da semana>`, **três abas**:

1. **Adição rápida** (`wand-sparkles`, padrão) — `QuickAdd autoFocus`. Texto de ajuda:
   aceita `8k z2`, `6x800 z4 int 2min`, `40min z1`, além de palavras como `longão`,
   `fartlek`, `polimento`. *"Precisa de blocos, observações ou data? Use **Treino completo**."*
2. **Treino completo** (`clipboard-list`) — `WorkoutBuilder`; ao salvar gera `resumo` e `zona`
   a partir dos blocos.
3. **Biblioteca** (`library`) — `WorkoutLibrary`; ao escolher, toast
   `"<nome>" inserido em <Dia>`.

**`CopyWorkoutDialog`:** mostra o treino como linha somente-leitura, a origem no subtítulo,
lista as semanas destino e os dias. `copiar` aceita vários dias; `mover` aceita exatamente um.
Também traz **Editar** (abre o drawer na aba Treino completo) e **Remover** (toast
`Treino removido`, info). Confirmar: `Copiado para <Semana> · <dias>` ou `Movido para …`.

#### Aba Semanas

`SectionHeader` `calendar-days` **Semanas**, subtítulo *"Clique em Adicionar treino ou puxe
um da biblioteca"*, e um `Select` de filtro por fase (*Todas as fases* / Base / Específico /
Polimento).

Cada semana é um bloco com **régua esquerda de 4px**: acento quando tem treinos, **âmbar
quando vazia** (com fundo `rgba(245,158,11,0.04)` e header `0.07`). Header da semana: nome +
`sub`, linha `N treinos · N km`, e os botões **Biblioteca** (`library`, ghost, sm) e
**Adicionar treino** (`plus`, success, sm).

- **Semana vazia:** ícone `calendar-plus`, *"Semana sem treinos"*, *"Monte um treino
  estruturado ou reaproveite um da biblioteca — dois cliques."* e os dois caminhos:
  **Da biblioteca** e **Montar treino** (`wand-sparkles`).
- **Com treinos:** um `WorkoutCard` por treino, com `TrainingTypeBadge` + `StatusChip` no
  badge, `PhaseBadge` na fase, prescrição em `desc` (newlines preservadas), chips
  `ruler N km` e `timer <janela>` (+ `FeedbackChip` quando houver), e `IconButton` de
  editar/remover.
- **Faixa Realizado:** para treinos com `exec`, um eyebrow
  `watch  Realizado · <dia> · sincronizado do relógio` e o `ExecutionStrip` — distância,
  tempo, pace real, FC média, cadência, todos monoespaçados, em `--bg-muted`.

**Drawers da aba:** *Montar treino* (`WorkoutBuilder`, 620px, tone primary) — salvar insere na
semana com toast `Treino adicionado à <Semana>!`; **Salvar na biblioteca** cria a entrada com
`usos:0` e toast *"Treino salvo na biblioteca!"*. *Biblioteca de treinos* (480px, tone info,
subtítulo *"Clique para inserir na semana"*) — escolher insere o treino recalculado por
`estimate` e **incrementa `usos`**.

### 8.5 Biblioteca (view `library`)

`PageTitle`: eyebrow *"Reaproveitar"*, título **Biblioteca de treinos**, subtítulo
*"Treinos salvos, prontos para inserir em qualquer semana"*. Um `Card padding="0.5rem"` com
`WorkoutLibrary` filtrada por busca (case-insensitive sobre `nome`) e remoção por item.

---

## 9. Conteúdo — regras de escrita

**Idioma.** Português do Brasil em tudo, inclusive rótulos internos. O vocabulário de domínio
é fixo e nunca é traduzido nem suavizado: *atleta, ciclo, semana, treino, pace, zona, fase,
prova alvo, polimento, específico, base, longão, fartlek, intervalado, ritmado, repetições, TRT*.

**Voz.** Segunda pessoa, imperativa, treinador falando com o usuário. Instrução diz o que
fazer em seguida: "Selecione um atleta para ver os ciclos", "Digite o pace acima e clique
Calcular para ver suas zonas". O app nunca diz "eu", raramente diz "você" explicitamente
(o imperativo carrega), e nunca se explica em linguagem de marketing.

**Caixa.** Sentence case em tudo legível. MAIÚSCULA é recurso **tipográfico**, nunca
editorial — reservada a eyebrows de 10–11px (`SEMANAS`, `VOLUME TOTAL`, `DATA`) com tracking
0.5–0.7px.

**Números e unidades.** Pace `MM:SS/km` (`05:00/km`), sempre monoespaçado. Distância `8.0 km`
com uma decimal. Totais de volume `24.0`. Faixas usam a palavra "a": "05:00/km a 05:20/km",
"11.25 a 12.00 km/h". Velocidade em `km/h`. Datas `DD/MM/AAAA`. Contagens pluralizadas em
código: "2 ciclos · 26 treinos", "5 atletas cadastrados".

**Copy destrutiva é explícita e tranquilizadora na mesma frase.** O diálogo de exclusão lista
o que desaparece e então diz que houve backup:

> O atleta **Amanda Sousa** será removido permanentemente. 📋 4 ciclos / 🏃 66 treinos /
> **Todos os dados serão perdidos! Um backup foi criado automaticamente.**

Confirmações são curtas e no passado: "Notas salvas!", "Zonas calculadas com sucesso!",
"✅ Amanda Sousa removido com segurança (backup criado)."

**Erros nomeiam a correção.** "Formato inválido! Use MM:SS (ex: 05:00)", "Digite o nome do
atleta.", "Nome deve ter no máximo 60 caracteres.", "Selecione um atleta primeiro!".
Nunca um código de erro, nunca um pedido de desculpas.

**Hints ficam sob o campo.** "Ex: 3:50 · 4:15 · 5:00", "Incrementos de 20s • Z4 = pace do
teste". Ponto médio `·` separa fatos inline; bullet `•` separa cláusulas de hint.

**Vibe.** Prática e um pouco utilitária — ferramenta de trabalho para um profissional, não
app fitness de consumo. Densa, rápida, sem onboarding, sem incentivo, sem gamificação.

---

## 10. Relatório do atleta (A4, imprimível)

A única superfície que sai do app: o que o treinador manda para o atleta toda semana.

- **Uma página A4 retrato**, com botão **Imprimir / Salvar PDF** que existe só na tela
  (nunca imprime: `@media print{display:none}`).
- `document.title` = `Treino da semana — <atleta> — <semana>`, para o arquivo salvo já
  chegar nomeado.
- **Qualquer semana, qualquer atleta.** Roster, ciclos e semanas vêm de um `semanas.js`;
  a página escolhe por parâmetro. **Nada sobre a semana está escrito no markup** —
  distância, pace alvo, tempo por repetição e a janela min/max são todos computados a
  partir do teste de 3 km daquele atleta, bloco por bloco.
- **Conteúdo, na ordem:** header navy (atleta, ciclo, semana, fase, prova alvo, teste de
  3 km) → as cinco zonas com faixas de pace e velocidade, **zonas que a semana não usa
  aparecem esmaecidas** → a semana prescrita dia a dia → total da semana → notas do
  treinador com espaço pautado para escrever de volta.
- **Modo detalhado** adiciona aquecimento e desaquecimento por sessão, o tempo por
  repetição nos intervalados, e a seção *Como ajustar o treino* (calor +10 s/km, o que
  fazer quando o pace não vem, quando encerrar uma série).
- **Uma página é o contrato.** Uma semana pode ter dois treinos ou seis, então a página se
  mede depois que as fontes carregam e **derruba acessórios até o conteúdo caber**, na ordem
  de menor perda para o atleta:
  1. segunda linha pautada
  2. *Como ajustar*
  3. a tabela de zonas (deixando uma linha dizendo que ela continua no app)
  4. aquecimentos
  5. cards compactos

  **Os treinos, o pace alvo e a janela de tempo nunca são derrubados.** Uma semana de seis
  treinos imprime enxuta e completa; uma de dois imprime com tudo.

---

## 11. Sete pontos de partida (templates)

Se o novo projeto também deve oferecer telas iniciais prontas, replique estas sete.
As quatro voltadas ao treinador linkam entre si: **Visão geral → Detalhe do atleta →
Planilha → Biblioteca**, com o **Relatório** alcançável pelas duas primeiras.

| Template | O que traz | Controles |
| --- | --- | --- |
| **Tela em branco** | App bar, breadcrumb, um card vazio. O `estado` cicla os três shells que toda tela acaba precisando — vazio, skeleton de carregamento, erro com repetir | título do header, mostrar breadcrumb, estado |
| **Painel do Treinador** | Shell v1: app bar navy, breadcrumb, roster, grid de ciclos | — |
| **Painel do Treinador v2** | Paginador de semana, quatro tiles de métrica derivados do roster, roster ordenado por aderência, gráfico de volume, lista de pendências, *Salvo agora* + undo/redo | ordem do roster, roster vazio, mostrar pendências |
| **Detalhe do atleta** | Anel de aderência ao lado do nome, banner âmbar da prova com contagem, painel navy de zonas com campo editável de teste de 3 km recalculando os cinco `ZoneCard` ao vivo, ciclos, gráfico de volume, histórico de testes com delta | pace do teste, mostrar histórico |
| **Planilha da semana** | `QuickAdd` no topo com preview do treino e duração, quatro stats derivados (volume, treinos escritos, semanas vazias, maior salto de volume), o ciclo inteiro como `CycleGrid` com arrastar entre dias | pace do teste |
| **Biblioteca de treinos** | Chips de filtro por tipo, busca, painel de preview com o treino como o atleta vai ler, pace alvo, janela de tempo e contagem de usos — tudo recomputado do pace do teste. Três estados de lista: normal, biblioteca genuinamente vazia (mensagem diferente de "sem resultados", e que leva à planilha) e erro com repetir | pace do teste, ordenar por usos/nome, estado |
| **Relatório do atleta** | A página A4 da seção 10 | atleta, semana, override do pace, enxuta/detalhada, mostrar tabela de zonas |

Cada template carrega o design system por um `ds-base.js` de uma linha:

```js
(() => {
  const base = '../..';              // ← única linha a editar no projeto consumidor
  for (const [rel, href] of [
    ['preconnect','https://fonts.gstatic.com'],
    ['stylesheet','https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap']
  ]) { const f=document.createElement('link'); f.rel=rel; f.href=href;
       if(rel==='preconnect') f.crossOrigin='anonymous'; document.head.appendChild(f); }
  for (const p of ['styles.css']) {
    const l=document.createElement('link'); l.rel='stylesheet'; l.href=base+'/'+p;
    document.head.appendChild(l);
  }
})();
```

---

## 12. Ordem de implementação

1. `styles.css` + os nove arquivos de `tokens/` — cole literal da seção 3.
2. O reset da seção 2 e o `index.html` com a ordem de scripts.
3. `components/core/` — `Icon` primeiro (todo o resto depende dele), depois Button,
   IconButton, Input, Select, Toggle, Card (com a variante `navy`), SectionHeader, EmptyState.
4. `components/feedback/` — os badges e chips são pares de cor fixos; Toast e ConfirmModal.
5. `components/data/` — `ZoneCard`, `AthleteCard`, `CycleCard`, `WorkoutCard`,
   `VolumeChart`, `Sparkline`, `ProgressRing`, depois `CycleGrid` (o mais complexo:
   drag-and-drop entre células).
6. `components/forms/` — `WorkoutBuilder` com `estimate`/`blockEstimate`/`hms`,
   `parseWorkout` + `QuickAdd`, `WorkoutLibrary`, `CopyWorkoutDialog`, `WorkoutFeedbackForm`.
7. `components/navigation/` — AppHeader, Breadcrumb, Sidebar, Drawer, WeekNav.
8. `app/data.js` com a forma da seção 7.5 (mantenha as duas semanas vazias).
9. `zoneTable` + `fmtPace` (seção 7.1), depois `screens.jsx`, `planilha.jsx`, `cycle.jsx`, `app.jsx`.
10. O relatório A4 da seção 10, por último — ele reusa `WorkoutsTable` e `ZoneCard`.

### Checklist de aceitação

- [ ] Digitar `05:00` e clicar **Calcular** produz Z5 04:40–05:00 · Z4 05:00–05:20 · Z3 05:20–05:40 · Z2 05:40–06:00 · Z1 06:00–06:20.
- [ ] `06:1` no campo do teste dá toast de erro com o texto exato da seção 9.
- [ ] `6x800 z4 int 2min` no QuickAdd mostra preview com 4.8 km e a janela de tempo do atleta.
- [ ] Arrastar um chip da Semana 1 para a Semana 5 move o treino e dá o toast com semana e dia.
- [ ] Clicar num chip abre copiar/mover; `copiar` aceita vários dias, `mover` só um.
- [ ] Semanas 3 e 4 aparecem com régua **âmbar** nas duas visões e oferecem os dois caminhos de criação.
- [ ] Salvar um treino na biblioteca cria a entrada com `usos:0`; inseri-lo de volta incrementa `usos`.
- [ ] O tema escuro (`body.dark`) não deixa nenhum chip branco-no-branco e o anel de foco fica visível.
- [ ] Nenhuma cor de zona aparece fora de zonas; nenhum gradiente além dos quatro da seção 4.
- [ ] O relatório imprime **uma página** com dois treinos e com seis, derrubando acessórios na ordem da seção 10.

### O que este projeto deliberadamente não tem

Avatar, Tabs, Tooltip, Pagination, Accordion. Dashboards de Chart.js (substituídos por
`VolumeChart` e `Sparkline`). Área do atleta, provas, avaliações, financeiro, calculadoras e
qualquer fluxo OAuth real de Garmin/Strava — dados de relógio aparecem como resultado já
sincronizado, nunca como conexão.
