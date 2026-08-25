# 🔥 QUICK REFERENCE - Features L2 (Atalho Rápido)

**Tempo**: 2 minutos para aprender tudo  
**Propósito**: Referência rápida sem ler 50+ páginas

---

## 1️⃣ ANOTAÇÕES POR TREINO

### Em 10 segundos:
```javascript
// Adicionar nota
WorkoutNotes.addNote(athleteId, cycleId, weekIdx, workoutIdx, "Seu feedback aqui");

// Ver nota
const note = WorkoutNotes.getNote(athleteId, cycleId, weekIdx, workoutIdx);
console.log(note.text);
```

### UI no navegador:
- Selecione atleta → ciclo → semana
- Clique no treino
- Escreva anotação
- Clique "Salvar"

**Útil para**: Feedback pós-treino, alertas, progressão

---

## 2️⃣ VALIDADOR DE CICLO

### Em 10 segundos:
```javascript
// Validar
const result = CycleValidator.validateCycle(athleteId, cycleId);
console.log(`Score: ${result.score}, Problemas: ${result.issues.length}`);
```

### Resultado:
- **Score 80+**: ✅ Ciclo bom
- **Score 60-79**: 🟡 Precisa ajustes
- **Score < 60**: 🔴 Problemas sérios

**Verifica**: Volume, zonas, progressão, recuperação

---

## 3️⃣ TEMPLATES DE CICLO

### Em 10 segundos:
```javascript
// Criar do template
const cycle = CycleTemplates.createFromTemplate(
  athleteId,
  'específico',  // ou: 'preparatório', 'polimento', 'manutenção'
  6,             // semanas
  'Meu Ciclo',
  100            // volume (100 = normal, 80 = -20%, 150 = +50%)
);
```

### Templates:
- **Preparatório**: Base aeróbia (4/8/12 sem)
- **Específico**: Velocidade (4/6/8 sem)
- **Polimento**: Recuperação (2/3/4 sem)
- **Manutenção**: Off-season (4/6/8 sem)

---

## 🚀 TESTE AGORA

```javascript
// No console (F12), execute:
runAllTests()

// Esperado: ✅ Passed: 30+, Failed: 0
```

---

## 📚 LEITURA

| Quer... | Leia | Tempo |
|--------|------|-------|
| Detalhes técnicos | `GUIA_FEATURES_L2.md` | 20 min |
| Validar tudo | `GUIA_VALIDACAO.md` | 15 min |
| Resumo projeto | `RESUMO_CONTINUACAO_20AGO.md` | 10 min |
| Exemplos código | Este arquivo + GUIA_FEATURES_L2.md | 5 min |

---

## 🎯 WORKFLOW RECOMENDADO

```
1. Criar ciclo de template
   └─ CycleTemplates.createFromTemplate()
       
2. Validar ciclo
   └─ CycleValidator.validateCycle()
   
3. Se problemas, ajustar volume
   └─ Criar novamente com volume diferente
   
4. Usar ciclo com atletas
   └─ Registrar anotações após cada treino
   └─ WorkoutNotes.addNote()
```

---

## ⚡ ATALHOS ÚTEIS

```javascript
// Obter último teste
PeriodicTests.getLatestTest(athleteId);

// Validar dados
validarIntegridadeDados();

// Exportar backup
exportarBackup();

// Undo/Redo
desfazer();  // Ctrl+Z
refazer();   // Ctrl+Y
```

---

## 📊 CHECKLIST INICIAL

- [ ] Rode `runAllTests()` → OK?
- [ ] Leia este arquivo
- [ ] Teste `CycleTemplates.createFromTemplate()`
- [ ] Teste `CycleValidator.validateCycle()`
- [ ] Teste `WorkoutNotes.addNote()`
- [ ] Pronto!

---

**Ponto de partida perfeito!** 🎉
