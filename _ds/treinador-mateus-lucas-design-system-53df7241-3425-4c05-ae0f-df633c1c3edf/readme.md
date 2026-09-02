# Treinador Mateus Lucas — Design System

Design system extracted from **Treinador Mateus Lucas**, a web app a running coach uses to
plan and track training for a small roster of athletes. Everything here comes from the product's
own code — its token block, component classes, copy and emoji vocabulary.

## Product context

One product, one surface: a desktop-first, single-page web app in **Brazilian Portuguese**, built as
plain HTML + CSS + vanilla JS (no framework, no build step) with data in `localStorage` and a
Supabase storage implementation stubbed in. The coach is the only user; athletes receive PDF exports.

The information architecture is a four-level drill-down, and the whole design system exists to serve it:

`Atletas` → `Ciclos` (a periodised block of N weeks) → `Semanas` → `Treinos` (individual workouts)

Supporting surfaces: a **Dashboard de Progresso** and **Análises Avançadas** (Chart.js), a cycle
**validator** that reports problems in a plan, cycle **templates**, athlete **notes**, a workout
**library**, periodic **3km tests** that recompute pace zones, backup export/import, undo/redo,
dark mode, and a **Visualização / Edição** mode toggle that gates every destructive control.

The domain concept that drives the visual identity is the **zone system**: a 3km time trial sets Z4
(limiar); every other zone steps 20 seconds per kilometre away from it. Z1→Z5 own fixed colours that
appear nowhere else.

### Sources given to this project
- **GitHub:** [https://github.com/mtslcsdev/Treinador-Mateus-Lucas](https://github.com/mtslcsdev/Treinador-Mateus-Lucas) (branch `main`) — the whole system was read from
  `Treinador Mateus Lucas/style.css` (the product's own "Professional Design System" token block),
  `css/sidebar.css`, `index.html`, and `js/` (`atletas.js`, `ciclos.js`, `zonas.js`, `ui.js`, `sidebar.js`).
  Worth exploring further before designing: the `js/features/` modules and the `Modelagem/` and
  `GUIA_*.md` documents describe features that have styling in CSS but no screenshots.
- **Screenshots** shipped in the repo under `imagens de exemplo de app/`, copied here to
  `assets/reference/` and used only to confirm layout — all values come from the CSS.

No Figma file, brand guide, deck or font binaries were provided.

---

## CONTENT FUNDAMENTALS

**Language.** Brazilian Portuguese throughout, including code-facing labels. Domain vocabulary is
fixed and should never be translated or softened: *atleta, ciclo, semana, treino, pace, zona, fase,
prova alvo, polimento, específico, base, longão, fartlek, intervalado, ritmado, repetições, TRT*.

**Voice.** Second person, imperative, coach-to-user. Instructions tell you what to do next:
"Selecione um atleta para ver os ciclos", "Digite o pace acima e clique Calcular para ver suas zonas",
"Clique em \"+ Novo Atleta\" para começar". The app never says "I", rarely says "você" explicitly
(the imperative carries it), and never explains itself in marketing language.

**Casing.** Sentence case for everything readable. UPPERCASE is a *typographic* device, never an
editorial one — reserved for 10–11px eyebrow labels (`SEMANAS`, `VOLUME TOTAL`, `DATA`) with
0.5–0.7px tracking. Section titles are sentence case with a leading emoji: "👥 Atletas",
"⚡ Zonas de Treino", "📊 Dashboard de Progresso".

**Emoji in copy.** The source product prefixed almost every label with an emoji ("💾 Backup",
"📄 Exportar Relatório"). Those were replaced by line icons — see ICONOGRAPHY — so labels are now plain
text ("Backup", "Relatório", "Novo atleta") with an icon beside them. Zone names keep their coloured dots.

**Numbers and units.** Pace as `MM:SS/km` (`05:00/km`), always monospaced. Distance as `8.0 km`
with one decimal. Volume totals like `24.0`. Ranges use the word "a": "05:00/km a 05:20/km",
"11.25 a 12.00 km/h". Speed in `km/h`. Dates `DD/MM/AAAA`. Counts are pluralised in code:
"2 ciclos · 26 treinos", "1 ciclo · 22 treinos", "5 atletas cadastrados".

**Destructive copy is explicit and reassuring in the same breath.** The delete dialog lists what
disappears and then says a backup was made:
"O atleta **Amanda Sousa** será removido permanentemente. 📋 4 ciclos / 🏃 66 treinos /
**Todos os dados serão perdidos! Um backup foi criado automaticamente.**"
Confirmations are short and past-tense: "Notas salvas!", "Zonas calculadas com sucesso!",
"✅ Amanda Sousa removido com segurança (backup criado)."

**Errors name the fix.** "Formato inválido! Use MM:SS (ex: 05:00)", "Digite o nome do atleta.",
"Nome deve ter no máximo 60 caracteres.", "Selecione um atleta primeiro!". Never an error code,
never an apology.

**Hints sit under the field.** "Ex: 3:50 · 4:15 · 5:00", "Incrementos de 20s • Z4 = pace do teste".
Middle dot `·` separates inline facts; bullet `•` separates hint clauses.

**Vibe.** Practical and a little utilitarian — a working tool for one professional, not a consumer
fitness app. Dense, quick, no onboarding, no encouragement, no gamification.

---

## VISUAL FOUNDATIONS

**Colour.** One navy brand (`#0f3a7d`) with a darker shade (`#061e3e`), a pale tint
(`#e8f0ff`) and a single brighter blue accent (`#1873d4`). A slate neutral ramp (50→900).
Four semantic colours (green/amber/red/cyan) each with a very light background tint. Five zone
colours used only for zones. Background of the app is a cool near-white `#f0f4f8`; cards are pure
white. That is the whole palette — no purple, no gradient washes, no tertiary hues.

**Gradients are structural, not decorative.** Exactly four uses: the 135° navy header/panel gradient
(`#0f3a7d → #051b2f`), the 90° navy→blue 5px rule along the top of every athlete card, the 135°
navy→accent avatar square, and the 180° accent→navy fill of volume bars. Amber banners use a soft
135° `#fef9c3 → #fefce8`. Never a purple or multi-hue gradient.

**Type.** Inter only (`'Inter','Segoe UI',system-ui`), 400–800. Courier New appears only for pace and
time values, with 1px letter-spacing. The scale is compact and functional: 14px body, 1rem (16px)
section titles, 1.25rem app header, 13px buttons, 12px chips, 11px eyebrows, 9.5px chart labels.
The only large type in the product is a number — stat values at 1.7rem/800 and zone paces at 22px/800.
Headings use 700, line-height 1.3; body 1.5; description text 1.6.

**Layout.** Centred 1400px max width, 3rem desktop gutters (2rem tablet, 1rem mobile), 2rem between
sections. Everything lives in stacked white cards. Grids are all `auto-fit/auto-fill minmax()`:
athletes 340px/2rem gap, cycles 220px/14px, zones 140px/10px, dashboard cards 200px/12px. The header
is `position: sticky`, the detail sidebar `position: sticky; top: 120px`; nothing else is pinned.

**Backgrounds.** No photography, no illustration, no texture, no pattern, no full-bleed imagery
anywhere in the product. Depth comes from surface colour and shadow alone. The one "hero" moment is
the navy Zonas de Treino panel.

**Borders.** Present on nearly every surface: 1px `#e2e8f0` on cards and table rows, **1.5px** on
inputs, cycle cards and workout cards, **2px** on athlete cards, 2px section rules under dashboard
titles. Left-accent rules of 3–4px mark meaning: 4px navy/accent on week sections, 3px coloured on
validator rows, timeline items and bloco items. Dashed 1.5px borders mark "empty, add something here".

**Corners.** 4/6/10/12/14/16/18px in use: 6px on buttons and inputs, 10px on cycle and workout cards,
12px on section cards and avatars, 16px on athlete cards, 20px/99px pills on badges and chips,
50% only on the validator score circle and toggle knob.

**Shadows.** Restrained and cool-grey, never coloured except on hover. Cards rest at
`0 2px 8px rgba(0,0,0,0.05)` and rise to `--shadow-md` on hover; athlete cards jump to a large navy-tinted
`0 16px 40px rgba(15,58,125,0.15)`. The header carries `0 8px 32px rgba(15,58,125,0.3)`. Buttons gain a
coloured shadow matched to their fill on hover (navy, green or red). Drawers cast to the left
(`-8px 0 40px`). Inner shadows appear only as table-row hover (`inset 0 0 8px rgba(15,58,125,0.06)`)
and as focus rings.

**Interaction states.**
- *Hover* — buttons darken and lift 1px with a coloured shadow; cards take a navy border, lift 2px
  (cycle) or 6px (athlete), and deepen their shadow; zone tiles lift 3px and lighten their glass fill;
  icon buttons swap to a tinted or solid fill; bars brighten 12% (`filter: brightness(1.12)`);
  table rows tint 3% navy; links darken and underline.
- *Press* — no dedicated press state. The transform is the feedback.
- *Focus* — 2px solid navy outline at 2px offset on buttons and links; inputs switch border to
  `#1a5ab8` plus a 3px `rgba(15,58,125,0.1)` ring. On the navy panel the ring is white at 15%.
- *Disabled* — grey `--gray-200` fill, `--gray-400` text, 0.45 opacity, no transform.
- *Invalid* — red border plus a 3px red ring, with the message below the field.

**Motion.** Short and functional. 0.15s for colour/border, 0.2s for shadow and card fade-in
(`fadeIn`: 6px rise + opacity), 0.25s for drawers (`cubic-bezier(.16,1,.3,1)`), 0.3s for the sidebar
and athlete cards (`cubic-bezier(.4,0,.2,1)`). Toasts slide 50px in from the right and scale from 0.96;
modals rise 20px and scale from 0.98. The single playful easing is the volume bar's
`cubic-bezier(.34,1.56,.64,1)` overshoot as it grows. Skeletons shimmer over 1.2s; the PDF spinner
rotates in 0.8s. No parallax, no scroll animation, no looping motion.

**Transparency and blur.** Blur appears exactly once: `backdrop-filter: blur(10px)` on zone tiles over
the navy gradient. White-alpha layering is the rule for anything sitting on navy —
`rgba(255,255,255,0.1/0.15/0.18/0.25)` for fills and borders, `rgba(255,255,255,0.6–0.95)` for text.
Scrims: `rgba(15,23,42,0.55–0.78)` for overlays, plain `rgba(0,0,0,0.5)` behind the sidebar.
Semantic tints on light surfaces use 5–15% alpha of the semantic hue. There are no protection
gradients — text on navy is placed on solid or alpha panels, never over imagery.

**Dark mode.** `body.dark` repoints surfaces (`#1a1f2e` app, `#252d3d` card, `#2a3342` muted),
borders (`#3d4758`) and text (`#e8ecf1`/`#b0b8c3`/`#9ba3b0`). Brand navy stays; the header gradient
shifts to `#1e3a8a → #0f172a`; semantic chips drop to 15% alpha fills with light ink; links become
`#60a5fa`. Zone hues are untouched.

---

## ICONOGRAPHY

**Current system: Lucide line icons.** The source product used emoji for every glyph; that was replaced
with [Lucide](https://lucide.dev) at stroke weight **1.75**, sizes 12–20px, loaded from CDN
(`https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js`) and wrapped by the `Icon` component. This is a
**deliberate substitution**, requested after review of the original emoji set — flagged here because the
source repo contains no icon assets of any kind (no SVG, no icon font, no PNG icons).

| Concept | Icon |
| --- | --- |
| Brand mark / running | `footprints` |
| Athletes / roster | `users` |
| Cycle / plan | `clipboard-list` · library `library` |
| Weeks & calendar | `calendar-days` · empty week `calendar-plus` |
| Workout / activity | `activity` · builder `wand-sparkles` · blocks `layers` |
| Zones / intensity | `zap` |
| Metrics | `bar-chart-3` `trending-up` `route` `gauge` |
| Distance / time / HR | `ruler` `timer` `heart-pulse` · watch sync `watch` |
| Target race | `target` |
| Data ops | `save` `download` `upload` `shield-check` `trash-2` |
| Editing | `pencil` `plus` `copy` `search` `sticky-note` |
| Status | `circle-check` `circle-dashed` `circle-x` `circle` |
| Alerts | `triangle-alert` `info` `circle-help` |
| Theme & chrome | `moon` `sun` `menu` `x` `undo-2` `redo-2` `arrow-left` `chevron-right` `lock` |

**The five zone dots (🟢🔵🟡🟠🔴) are the one emoji kept**, on `ZoneCard`, because there the colour *is*
the information. Everything else in the UI is a line icon.

**Unicode text characters** still do inline typographic work: `·` separates facts, `•` opens hint bullets,
`—` means "no value yet", `›` separates breadcrumbs.

**No logo exists.** The repository contains no logo file, wordmark or favicon. The header uses the
`footprints` icon next to the product name in plain Inter. Nothing here draws or approximates a mark —
where a logo would go, set the name as type. If a real mark exists, drop it into `assets/` and pass it to
`AppHeader`'s `logo` prop.

**Rules.** Never mix an icon set. Never use a filled icon. Never put an icon in a badge or chip label
without a text label beside it. Icon-only buttons always carry a `title`.

---

## Index

### Root
| File | Purpose |
| --- | --- |
| `readme.md` | This guide: product context, content, visual foundations, iconography, index. |
| `SKILL.md` | Agent-skill front matter so this folder works as a Claude Code skill. |
| `github.md` | Source-repo association and last-sync record. |
| `styles.css` | Global entry point — `@import` lines only. Consumers link this one file. |
| `thumbnail.html` | Homepage tile. |
| `tokens/` | `fonts`, `colors`, `typography`, `spacing`, `radius`, `shadows`, `motion`, `zones`, `dark`. |
| `guidelines/` | 15 specimen cards (Colors, Type, Spacing, Brand groups). |
| `assets/reference/` | The three product screenshots shipped in the source repo. |
| `ui_kits/painel-treinador/` | Interactive recreation of the coach panel (v1, faithful). |
| `ui_kits/painel-treinador-v2/` | Refined coach panel: adherence dashboard, workout builder, library. |
| `templates/painel-treinador/` | Starting template — coach panel shell (v1 direction). |
| `templates/painel-treinador-v2/` | Starting template — **Visão geral** dashboard (v2 direction). |
| `templates/detalhe-atleta/` | Starting template — athlete record: zones, target race, cycles, history. |
| `templates/planilha-semana/` | Starting template — the cycle as an editable spreadsheet. |
| `templates/biblioteca-treinos/` | Starting template — saved-workout library with prescription preview. |
| `templates/relatorio-atleta/` | Starting template — A4 report for any week, print / save as PDF. |

### Components
`components/core/` — **Button**, **IconButton**, **Icon**, **Input**, **Select**, **Toggle**, **Card**,
**SectionHeader**, **EmptyState**

`components/data/` — **AthleteCard**, **CycleCard**, **WorkoutCard**, **ZoneCard**, **DayCard**,
**CycleGrid**, **StatItem**, **DashboardStatCard**, **VolumeChart**, **Sparkline**, **ProgressRing**,
**ExecutionStats**, **WorkoutsTable**

`components/feedback/` — **TrainingTypeBadge**, **PhaseBadge**, **FeedbackChip**, **Toast**,
**ConfirmModal**, **RaceTargetBanner**, **ValidationItem**

`components/forms/` — **WorkoutBuilder**, **QuickAdd**, **WorkoutLibrary**, **CopyWorkoutDialog**,
**WorkoutFeedbackForm**

`components/navigation/` — **AppHeader**, **Breadcrumb**, **WeekNav**, **Sidebar**, **Drawer**

Each directory has a `@dsCard` HTML showing every variant, and each component a `.d.ts` props
contract plus a `.prompt.md` with a usage example.

### UI kits
- `ui_kits/painel-treinador/` — **v1**, faithful recreation of the source app: roster → athlete
  (zones + cycles) → cycle detail (dashboard, validator, filters, volume chart, week sections with
  workouts). Emoji iconography, as the source has it.
- `ui_kits/painel-treinador-v2/` — **v2**, the refined direction: adherence-first **Visão geral**,
  athlete cards carrying adherence rings and 8-week sparklines, the **Montar treino** builder that
  generates the prescription and min/max duration from the athlete's own zones, a reusable
  **Biblioteca de treinos**, workout status (`Feito / Parcial / Prescrito / Não feito`) and a
  *Realizado* strip for watch-synced data. Line icons throughout. See its README for the full diff.

### Intentional additions
The source is vanilla JS with no component layer, so every component here is a *new* factoring of
existing CSS classes rather than a port. These have no direct 1:1 counterpart:
- **Card** merges `.card` and `.card.area-zonas-card` into one component with a `navy` variant.
- **WorkoutsTable** wraps `.treinos-table`, which the product only renders in report/export views.
- **Icon** — wrapper for the substituted Lucide set (the source had no icon layer at all).
- **Sparkline**, **ProgressRing** — added to carry adherence and volume trend, which the source app
  computes but never visualises on a card.
- **WorkoutBuilder**, **WorkoutLibrary** — the source has `blocos` markup and a `biblioteca` drawer in
  CSS plus `CycleTemplates.js`, but no single editor; these compose that behaviour into one flow.
- **CycleGrid**, **QuickAdd**, **CopyWorkoutDialog** — the coach-workflow additions: the cycle as an
  editable spreadsheet with drag-and-drop between days, shorthand workout entry (`8k z2`,
  `6x800 z4 int 2min`), and a copy/move dialog that sends one session to several days at once. The
  source app has none of these; they exist to cut the clicks between an empty week and a written plan.
- **WeekNav**, **DayCard**, **ExecutionStats**, **WorkoutFeedbackForm** — built for the week-scoped and
  athlete-reported flows the source app does not have yet (it prescribes but never records execution).
  `ExecutionStats` and `WorkoutFeedbackForm` are the pair: one shows what happened, the other collects it.

Notably **absent on purpose**: Avatar, Tabs, Tooltip, Pagination, Accordion — the product has none.

### Modo escuro
`tokens/dark.css` re-points the token values under `body.dark`. `tokens/dark.card.html` **mounts the real
`Button` from the bundle** — every variant, resting and hover — and measures each label against its painted
background with `getComputedStyle`, printing the ratio next to the button and a pass/fail verdict for the
set. Hover colours come from the source (`ButtonVariants`, now exported from `Button.jsx`), never recopied
into the card.

That structure is the point, and it was learned the hard way: the card used to be a hand-written CSS
lookalike of `Button`, so a fix to the component was never actually verified by the specimen that claimed to
prove it — a failing hover shipped twice behind a card showing all-green. **A specimen that reimplements what
it documents proves nothing.** These are the token bugs it surfaced:

- **`--primary-on-tint`** (new). `--primary-light` is a tint background in nine places, and in five of them
  the text was `--primary`. That reads at 9:1 on the light tint and 1.6:1 on the dark one. The role now has
  its own token: `--primary` stays the solid fill under white labels, `--primary-on-tint` is what you put
  *on* `--primary-light`.
- **`--focus-ring`**. The light ring is navy at 10% opacity — invisible on a dark surface, so keyboard focus
  simply vanished. Dark mode gets its own ring at 35%.
- **`--success-light` / `--warning-light` / `--danger-light`**. Near-white pastels carrying status text.
  Under `body.dark` the text flipped light and the chips went white-on-white. Now they have dark tints.
- **The neutral ramp.** 50–400 are surface roles and already inverted; 700–900 are text roles and did not,
  so `gray-700` body copy sat on `gray-200` panels at about 1.2:1. The first pass left 500/600 at their light
  values on the theory that they were fill-only — which broke the scale: dark `--gray-400` is `#64748b`,
  exactly the light `--gray-500`, so 400 and 500 collided, and 600 (`#475569`) then stepped *backwards*.
  The ramp is now monotonic end to end. What made that possible is pulling the one fill role out of it:
  `Button variant="back"` was `--gray-500` with a `--gray-600` hover, so in dark mode it darkened on hover
  while every other variant lightened. It now uses **`--fill-neutral` / `--fill-neutral-hover`** (new) —
  identical to the old values in light mode, darker with a lightening hover in dark. **A ramp step is a
  position on a scale, not a component's fill; the moment a component depends on one, the scale can't move.**
- **`--bg-primary` / `--bg-secondary`** were plain `#ffffff`/`#f1f5f9` in both modes. Overridden now, before
  a consuming project finds them.
- **`--success-on-fill` / `--danger-on-fill`** (new), and the failures that were never dark-mode bugs at all:
  `Button variant="success"` put a white label on `--success` (#10b981) at **2.54:1** and `variant="danger"` put
  one on `--danger` (#ef4444) at **3.76:1** — both failing in *both* modes, sitting in the product the whole
  time. Neither token could simply be darkened: each is also its chip's *text* colour on the matching
  `*-light` tint, where darkening breaks dark mode. So the fills keep their values and the label role got its
  own token per hue: success reads 5.83:1, danger 4.91:1. The solid fills were the failure; the chips
  (`--success` on `--success-light` 5.28:1, `--danger` on `--danger-light` 4.75:1) were always fine.

**Hover direction follows the label, and getting that backwards is its own bug class.** A bright fill under a
dark label must *lighten* on hover; a dark fill under a white label must *darken*. The first pass flipped
`success` to a dark label but left the hover darkening — the repaired button broke the moment the cursor
touched it. `success` now lightens (#10b981 → #34d399, 7.70:1), `danger` lightens (#ef4444 → #f87171, 6.69:1),
and `export` — white label — darkens instead of lightening (#0284c7 → #145fa8, 6.50:1).

Two component fixes came out of the same pass: `Button variant="ghost"` used `--gray-700` on `--gray-200`
and `TrainingTypeBadge` used `--gray-600` on `--bg-muted`. Both now use `--text-primary`/`--text-secondary`,
which flip on their own. **The rule the audit produced: raw `gray-*` for fills, semantic `--text-*` for text.**

### Fonts
Inter, loaded from Google Fonts — the source repo ships no font binaries, so nothing is self-hosted and
`check_design_system` reports no registered fonts. That is accurate, not a defect. It is loaded twice on
purpose: `tokens/fonts.css` keeps an `@import` as the safety net for anyone who links only `styles.css`,
and each `ds-base.js` also injects a `<link>` + `preconnect` so the request starts in parallel rather than
at the end of a three-deep import chain. Same URL, so the browser fetches it once. To self-host, drop the
`.woff2` files in `assets/fonts/`, replace that `@import` with real `@font-face` rules, and the compiler
starts registering them.

`--font-mono` is `'Courier New'` and carries every pace value in the product — the numbers a coach reads
most. It is the source app's choice, kept for fidelity, but it is a weak typeface for tabular figures and
worth revisiting with a real monospace that has proper tabular numerals.

### Templates
Seven starting points, each a folder with its own `ds-base.js` (one line to repoint at a consuming
project's bound design system; it also injects the Inter `<link>` + preconnect so the brand font
downloads in parallel with the CSS instead of queueing behind the `@import` chain). The four
coach-facing ones link to each other, so the template set is navigable as a flow: Visão geral →
Detalhe do atleta → Planilha → Biblioteca, with Relatório reachable from the first two.

- `templates/tela-em-branco/` — **Tela em branco.** The blank starting point: app bar, breadcrumb and one
  empty content card. Nothing to delete before you begin. Its `estado` tweak cycles the three shells every
  screen eventually needs — empty, loading skeleton, error with a retry — so a new screen inherits them
  instead of shipping only the happy path. Tweaks: header title, show/hide breadcrumb, content state.

- `templates/painel-treinador/` — **Painel do Treinador.** Coach panel shell: navy app bar, breadcrumb,
  athlete roster card, cycle grid. The v1 direction, emoji mark.
- `templates/painel-treinador-v2/` — **Painel do Treinador v2.** The v2 entry point: week pager, four
  metric tiles (adherence ring, volume sparkline, prescribed vs done, empty weeks) whose numbers are all
  **derived from the roster data**, a roster list sorted by adherence so the athlete needing attention
  comes first, the cycle volume chart and a pending-issues list. Line icons, *Salvo agora* + undo/redo in
  the header, a Relatório button that opens the report template. Tweaks: roster sort order, empty roster,
  show/hide pending issues.
- `templates/detalhe-atleta/` — **Detalhe do atleta.** The athlete record: adherence ring beside the name,
  amber target-race banner with countdown, the navy zones panel with an editable 3km test field that
  recomputes all five `ZoneCard`s live, the athlete's cycles, the volume chart and the 3km test history
  with per-test delta. Tweaks: 3km test pace, show/hide test history.
- `templates/planilha-semana/` — **Planilha da semana.** The primary editing surface: `QuickAdd` shorthand
  entry at the top (`6x800 z4 int 2min`) that previews the parsed workout and its duration from the
  athlete's zones, four derived cycle stats (volume, workouts written, empty weeks, largest volume jump),
  then the whole cycle as `CycleGrid` — weeks down, days across, workouts draggable between cells.
  Tweaks: 3km test pace.
- `templates/biblioteca-treinos/` — **Biblioteca de treinos.** Saved workouts with type filter chips and
  search, and a live preview panel: the selected workout rendered as the athlete will read it
  (`WorkoutCard`) plus its target pace, time window and usage count — all recomputed from the test pace.
  Three list states, all reachable from the `estado` tweak: normal, a genuinely empty library (new coach,
  nothing saved — a different message from "no results", and it routes to the planilha to write the first
  one) and a load error with retry. The preview panel degrades with them instead of reading a workout that
  is not there. Tweaks: 3km test pace, sort by uses or name, list state.
- `templates/relatorio-atleta/` — **Relatório do atleta.** The one surface that leaves the app: what the
  coach sends the athlete each week. A single A4 portrait page with a **Imprimir / Salvar PDF** button
  (screen only — it never prints), and the document title set to
  `Treino da semana — <atleta> — <semana>` so the saved file arrives already named.

  **Any week, any athlete.** The roster, cycles and weeks live in `semanas.js`; the `atleta` and `semana`
  tweaks pick which one the page renders. Nothing about a week is written into the markup — distance,
  target pace, per-repetition time and the min/max time window are all computed from that athlete's 3km
  test, block by block.

  The page: navy header (athlete, cycle, week, phase, target race, 3km test), the five zones with pace and
  speed ranges — zones the week does not use are dimmed — the prescribed week day by day, the week total,
  then coach notes with ruled space to write back. **Detalhada** adds warm-up and cool-down per session,
  the per-repetition time for interval sets, and a *Como ajustar o treino* section (heat +10 s/km, what to
  do when the pace does not come, when to end a set).

  **One page is the contract.** A week can hold two workouts or six, so the page measures itself after the
  fonts land and drops accessories until the content fits, in order of least loss to the athlete: second
  ruled line → *Como ajustar* → the zone table (with a line saying it is still in the app) → warm-ups →
  compact cards. The workouts, their target pace and their time window are never dropped. A six-workout
  week therefore prints as a bare, complete week; a two-workout week prints with everything.

  Tweaks: athlete, week number, 3km test pace override, enxuta/detalhada, show/hide the zone table.

### Substitutions and gaps
- **Inter** is loaded from Google Fonts, exactly as the product does. No font binaries exist in the
  source repo, so nothing was substituted — but there are also no self-hosted files to ship.
- **Lucide icons replace the product's emoji** (requested change). CDN-loaded; no icon assets exist
  in the source to copy in. Reverting means dropping `Icon` and restoring the emoji table from v1.
- **Chart.js** dashboards (`js/dashboard-graphics.js`) are not recreated; the CSS bar chart
  (`VolumeChart`) and `Sparkline` are used in their place.
- Surfaces with CSS but no screenshot — calendar table, cycle comparison, smart suggestions, notes
  timeline — are documented in tokens but have no component of their own yet.
- **Not built at all yet:** the athlete-facing area, provas, avaliações, financeiro, calculadoras, and
  any real Garmin/Strava OAuth flow (v2 shows synced data as a result, not the connection).
