# 📖 GUIA RÁPIDO - NOVO MENU & DASHBOARD

**Tudo sobre as mudanças implementadas**

---

## 🎯 O QUE MUDOU?

### 1. **Menu Hamburger** ☰
- **Antes**: Apenas botões espalhados no header
- **Agora**: Menu lateral profissional tipo SisRUN
- **Localização**: Clique no ☰ no canto superior esquerdo

### 2. **Header Limpo**
- **Antes**: "🏃 Treinador Mateus Lucas" + 5 botões
- **Agora**: "🏃 Treinador Mateus Lucas" + hamburger button
- **Resultado**: Mais espaço, design mais limpo

### 3. **Dashboard de Gráficos**
- **Novo**: Seção inteira dedicada a visualização de dados
- **Gráficos**: Volume, Pace, Progresso, Comparação, Evolução
- **Acesso**: Menu → 📊 Dashboard

### 4. **Análises Avançadas**
- **Novo**: Seção de analytics com gráficos comparativos
- **Dados**: Comparação entre atletas, evolução de pace, tabela resumida
- **Acesso**: Menu → 📈 Análises

---

## 🚀 COMO USAR?

### Abrir o Menu
```
1. Clique no ☰ (canto superior esquerdo)
2. Menu desliza suavemente pela esquerda
3. Escolha uma opção
4. Menu fecha automaticamente
```

### Fechar o Menu
```
Opção 1: Clique em uma seção
Opção 2: Clique no ✕ (fechar)
Opção 3: Clique fora do menu (backdrop)
Opção 4: Pressione ESC
```

### Acessar o Dashboard
```
Menu ☰ → 📊 Dashboard → Veja os gráficos
- Gráfico de Volume (lado esquerdo)
- Gráfico de Pace (lado direito)
- Gráfico de Progresso (largura total)
```

### Acessar Análises
```
Menu ☰ → 📈 Análises → Veja comparações
- Comparação entre atletas (Radar)
- Evolução de Pace (Line chart)
- Tabela resumida (grid)
```

### Voltar para Atletas
```
Menu ☰ → 👥 Atletas
Ou: Clique em "← Atletas" no rodapé
```

---

## 🎨 COMPONENTES DO MENU

### 📍 Navegação
```
👥 Atletas      → Volta para lista de atletas
📊 Dashboard    → Visualizar gráficos de progresso
📈 Análises     → Ver comparações e métricas
```

### ⚙️ Configurações
```
💾 Exportar Backup    → Salvar dados em arquivo .json
📥 Importar Backup    → Restaurar dados de arquivo
✔️ Validar Dados      → Verificar integridade
🗑️ Limpar Dados       → Apagar TUDO (atenção!)
```

### 🎨 Aparência
```
🌙 Dark Mode    → Toggle tema claro/escuro
                  (também disponível na barra de tarefas)
```

### ❓ Ajuda
```
❓ Guia Rápido   → Instruções rápidas
ℹ️ Sobre         → Info da versão
```

---

## 📊 ENTENDENDO OS GRÁFICOS

### Dashboard
#### 1. Volume Total (Gráfico de Barras)
- **O que mostra**: KM acumulado por atleta
- **Como ler**: Quanto maior a barra, mais treino foi feito
- **Para quem**: Avaliar carga de treino

#### 2. Pace Médio (Gráfico de Linhas)
- **O que mostra**: Velocidade média de cada atleta
- **Como ler**: Linha mais baixa = corredor mais rápido
- **Para quem**: Avaliar velocidade geral

#### 3. Progresso (Gráfico Horizontal)
- **O que mostra**: Quantos ciclos cada atleta completou
- **Como ler**: Comparar número de ciclos entre atletas
- **Para quem**: Saber quem tem mais experiência

### Análises
#### 1. Comparação (Gráfico Radar)
- **O que mostra**: 3 dimensões: Testes, Ciclos, Semanas
- **Como ler**: Quanto maior a área, mais ativo o atleta
- **Para quem**: Visão geral do engajamento

#### 2. Evolução de Pace (Gráfico de Linhas)
- **O que mostra**: Como o pace mudou ciclo a ciclo
- **Como ler**: Linha descendo = melhorando
- **Para quem**: Acompanhar progresso individual

#### 3. Tabela de Atletas
- **O que mostra**: Resumo final com todos os dados
- **Colunas**: Atleta, Ciclos, Total KM, Pace, Testes
- **Para quem**: Referência rápida de dados

---

## 🌙 DARK MODE

### Como Ativar
```
Opção 1: Menu ☰ → 🌙 Dark Mode
Opção 2: Header (canto superior) → 🌙
Opção 3: Sistema operacional (sincroniza automaticamente)
```

### O Que Muda
- ✅ Fundo escuro em tudo
- ✅ Cores adaptadas para legibilidade
- ✅ Gráficos com cores apropriadas
- ✅ Menu também em dark mode

---

## 📱 RESPONSIVIDADE

### Desktop (1024px+)
- Menu é opcional (desktop geralmente não usa)
- Hamburger button desaparece
- Navegação pode ser por breadcrumbs

### Tablet (768px - 1024px)
- Menu hamburger sempre visível
- Ocupa 260px da tela
- Gráficos em coluna única

### Mobile (< 768px)
- Menu hamburger sempre visível
- Menu ocupa 80% da tela
- Gráficos empilhados
- Tabelas scrolláveis

---

## 🐛 TROUBLESHOOTING

### Menu não abre?
```
✓ Verifique se o arquivo js/sidebar.js foi carregado
✓ Abra DevTools (F12) e procure por erros
✓ Recarregue a página (Ctrl+R)
```

### Gráficos não aparecem?
```
✓ Verifique se Chart.js foi carregado
✓ Adicione pelo menos 1 atleta com dados
✓ Clique em "Dashboard" novamente
✓ Abra console (F12) procure por erros
```

### Dark mode não funciona?
```
✓ Verifique se body.dark existe no CSS
✓ Clique no toggle 2x para resetar
✓ Limpe cache (Ctrl+Shift+R)
```

### Dados sumindo?
```
✓ Use Menu → Validar Dados
✓ Verifique localStorage (F12 → Storage)
✓ Faça backup antes de limpar dados
```

---

## 🔒 SEGURANÇA & BACKUP

### Exportar Dados (Regular)
```
Menu ☰ → 💾 Exportar Backup
→ Arquivo "backup_YYYY-MM-DD.json" baixa automaticamente
→ Salve em lugar seguro
```

### Restaurar Dados
```
Menu ☰ → 📥 Importar Backup
→ Selecione arquivo .json
→ Dados são restaurados
→ Página recarrega automaticamente
```

### ⚠️ LIMPAR DADOS
```
Menu ☰ → 🗑️ Limpar Dados
→ Confirme 2x
→ TUDO é apagado (não é reversível!)
→ App recarrega vazio
```

---

## 📞 SUPORTE RÁPIDO

| Problema | Solução |
|----------|---------|
| Menu não abre | Recarregue página (Ctrl+R) |
| Gráficos vazios | Adicione atletas com dados |
| Cores estranhas | Toggle dark mode 2x |
| App lento | Limpe cache (Ctrl+Shift+R) |
| Dados perdidos | Verifique backup na pasta Downloads |
| Botões não funcionam | F12 → Console → veja erros |

---

## 💡 DICAS PRO

### Workflow Recomendado
```
1. Menu ☰ → 👥 Atletas → Adicione 3 atletas
2. Registre ciclos e treinos
3. Menu ☰ → 📊 Dashboard → Veja evolução
4. Menu ☰ → 📈 Análises → Compare atletas
5. Menu ☰ → 💾 Exportar Backup → Salve seus dados
```

### Melhor Performance
```
✓ Mantenha menos de 10 ciclos por atleta
✓ Limpe dados antigos mensalmente
✓ Faça backup regular (1x por semana)
✓ Use dark mode para economizar bateria (OLED)
```

### Análise de Dados
```
✓ Verifique Dashboard toda semana
✓ Compare atletas em Análises
✓ Use gráfico de pace para validar treinos
✓ Tabela de resumo para relatórios
```

---

## ✨ NOVIDADES TÉCNICAS

### Menu Lateral
- 🎯 **Componente**: `SidebarMenu` (class)
- 🎨 **Estilos**: `css/sidebar.css`
- 📁 **Arquivo**: `js/sidebar.js`
- ⌨️ **Keyboard**: ESC para fechar
- 📱 **Responsive**: Sim (80vw em mobile)

### Dashboard
- 📊 **Gráficos**: Chart.js v4.4
- 🎯 **Componente**: `DashboardGraphics` (class)
- 📁 **Arquivo**: `js/dashboard-graphics.js`
- 🔄 **Dados**: Carregam em tempo real
- 🎨 **Cores**: Adaptam ao tema

### Cores
- **Light**: Azul Escuro (#0f3a7d) + Branco
- **Dark**: Azul (#1e3a8a) + Cinza escuro
- **Gráficos**: Variações automáticas

---

## 🎓 PRÓXIMAS FEATURES

- [ ] Export de gráficos (PNG/PDF)
- [ ] Comparação lado-a-lado de atletas
- [ ] Previsões de performance (IA)
- [ ] Integração com Strava
- [ ] Notificações de milestone

---

**Bom uso! 🚀**

*Guia versão 1.0 - 20 de Agosto, 2026*
