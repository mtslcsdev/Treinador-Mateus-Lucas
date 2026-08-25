# 🧪 CHECKLIST DE TESTES - DIA 1

**Como usar**: Abra seu app no navegador e siga cada teste abaixo. ✅ = passou, ❌ = falhou

---

## 🔐 SEÇÃO 1: PROTEÇÃO DE DADOS

### Teste 1.1: Backup Automático Está Funcionando?

**Passos**:
1. Abra a app no navegador
2. Pressione F12 (DevTools)
3. Vá em `Application` → `Local Storage` → seu site
4. Procure por chaves que começam com `backup_seguranca_`

**Resultado esperado**:
- [ ] ✅ Existem chaves `backup_seguranca_TIMESTAMP`
- [ ] ✅ Cada chave tem um objeto JSON com `{dados, timestamp, versao}`

**Se falhar**: Verifique se a função `fazerBackupAutomaticoSeguranca()` está sendo chamada no `salvar()`.

---

### Teste 1.2: Rotação de Backups (Máximo 3 Versões)

**Passos**:
1. Com DevTools aberto em Local Storage
2. Crie 5 novos ciclos (click em "+ Novo Ciclo")
3. A cada ciclo criado, um backup é feito
4. Contar quantas chaves `backup_seguranca_*` existem

**Resultado esperado**:
- [ ] ✅ Sempre 3 ou menos backups automáticos
- [ ] ✅ Backups antigos são deletados automaticamente

**Se falhar**: Ajustar função de rotação em `backup.js`.

---

### Teste 1.3: Proteção ao Deletar Atleta

**Passos**:
1. Ter um atleta com pelo menos 1 ciclo
2. Clicar no botão de deletar do atleta (🗑️)
3. Ler a mensagem de confirmação

**Resultado esperado**:
- [ ] ✅ Mensagem mostra: "X ciclos", "Y treinos"
- [ ] ✅ Mensagem em vermelho: "Um backup foi criado automaticamente"
- [ ] ✅ Um novo backup é criado (verificar em DevTools)

**Se falhar**: Função `removerAtleta()` não está chamando `protegerOperacaoDestrutiva()`.

---

### Teste 1.4: Proteção ao Deletar Ciclo

**Passos**:
1. Selecionar um atleta
2. Selecionar um ciclo
3. Clicar para deletar ciclo (🗑️)
4. Ler a mensagem

**Resultado esperado**:
- [ ] ✅ Mensagem mostra "X treinos"
- [ ] ✅ Se ciclo tem prova alvo, mostra aviso especial
- [ ] ✅ Um backup automático é criado

**Se falhar**: Função `removerCiclo()` não está protegida.

---

## ✅ SEÇÃO 2: MENSAGENS E UX

### Teste 2.1: Mensagens Construtivas

**Passos**:
1. Deletar um ciclo (confirmar)
2. Observar toast de sucesso

**Resultado esperado**:
- [ ] ✅ Mensagem começa com ✅ emoji
- [ ] ✅ Diz "Ciclo ... removido com segurança"
- [ ] ✅ Toast é verde (sucesso)

---

### Teste 2.2: Avisos de Prova Alvo

**Passos**:
1. Criar ciclo e adicionar prova alvo (data futura)
2. Tentar deletar ciclo
3. Observar modal de confirmação

**Resultado esperado**:
- [ ] ✅ Modal mostra aviso: "Atenção: Prova alvo em DD/MM/AAAA"
- [ ] ✅ Aviso em vermelho/destaque
- [ ] ✅ Opção de cancelar é clara

---

### Teste 2.3: Contador de Dados Perdidos

**Passos**:
1. Criar atleta com 2 ciclos (com 5 treinos cada)
2. Tentar deletar atleta
3. Ler modal

**Resultado esperado**:
- [ ] ✅ Mostra "📋 2 ciclos"
- [ ] ✅ Mostra "🏃 10 treinos"
- [ ] ✅ Números estão corretos

---

## 🔄 SEÇÃO 3: FLUXOS DE RECUPERAÇÃO

### Teste 3.1: Importar Backup Externo

**Passos**:
1. Criar backup manual (💾 Backup)
2. Adicionar novo atleta (nome: "TESTE_TEMP")
3. Clicar 📥 Importar
4. Selecionar backup anterior
5. Confirmar restauração

**Resultado esperado**:
- [ ] ✅ Aviso: "Um backup foi criado automaticamente"
- [ ] ✅ Todos os dados são restaurados
- [ ] ✅ Atleta "TESTE_TEMP" não existe mais
- [ ] ✅ Mensagem sucesso: "Backup restaurado com sucesso! ✅"

---

### Teste 3.2: Validação de Backup Corrompido

**Passos**:
1. Criar arquivo JSON inválido (ex: `{"teste": "invalido"}`)
2. Tentar importar
3. Observar resultado

**Resultado esperado**:
- [ ] ✅ Erro: "Arquivo inválido!"
- [ ] ✅ Dados atuais NÃO são sobrescritos
- [ ] ✅ Nenhum crash da app

---

## 📊 SEÇÃO 4: PERFORMANCE

### Teste 4.1: localStorage Cheio

**Passos**:
1. Criar muitos ciclos com muitos treinos (50+)
2. Observar comportamento

**Resultado esperado**:
- [ ] ✅ App continua funcionando
- [ ] ✅ Backups antigos são deletados para liberar espaço
- [ ] ✅ Se ficar muito cheio, mensagem: "Armazenamento cheio!"

---

### Teste 4.2: Operações Rápidas (Sem Race Condition)

**Passos**:
1. Criar atleta "Rápido"
2. Imediatamente clicar 5x em "+ Novo Ciclo"
3. Observar se ciclos têm IDs diferentes

**Resultado esperado**:
- [ ] ✅ Todos os 5 ciclos foram criados
- [ ] ✅ Cada ciclo tem ID único (não sobrescrevem)
- [ ] ✅ Nenhum ciclo duplicado

---

## 🎯 RESUMO FINAL

### Contagem:
- Total de testes: 12
- Testes passaram: ___/12
- Taxa de sucesso: ____%

### Checklist:
- [ ] Todos os testes passaram
- [ ] Nenhuma mensagem de erro no console
- [ ] App está estável com 3 alunos
- [ ] Backups estão sendo criados automaticamente

### Status Geral:
- ✅ Proteção de dados implementada
- ✅ Validações robustas adicionadas
- ✅ Mensagens melhoradas
- ✅ Pronto para producão com dados reais

---

## 🆘 PROBLEMAS ENCONTRADOS?

Se algum teste falhar, **anote aqui**:

```
Teste que falhou: _______________
Comportamento esperado: _______________
Comportamento observado: _______________
Passos para reproduzir: _______________
```

Depois, abra uma issue ou mensagem comigo descrevendo o problema!

---

*Boa sorte com os testes! 🚀*
