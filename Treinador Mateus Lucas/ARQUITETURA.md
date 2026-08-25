# 🏗️ ARQUITETURA REFATORADA - Dia 3

**Status**: ✅ Implementado  
**Data**: 20/08/2026  
**Objetivo**: Preparar código para escalar a Supabase sem reescrever

---

## 📊 VISÃO GERAL

A aplicação agora segue um padrão **Storage Layer + Models + Migration Helper** que permite trocar o backend sem modificar a lógica de negócio.

```
┌─────────────────────────────────┐
│   UI Layer (componentes)        │  (não muda)
├─────────────────────────────────┤
│   Service Layer (regra negócio) │  (a implementar)
├─────────────────────────────────┤
│   Model Layer (validação)       │  ✅ Athlete, Cycle
├─────────────────────────────────┤
│   Storage Layer (abstrato)      │  ✅ Interface genérica
├─────────────────────────────────┤
│   Implementação (localStorage)  │  ✅ LocalStorageImpl
│   Implementação (Supabase)      │  🚧 SupabaseStorageImpl
└─────────────────────────────────┘
```

---

## 📁 NOVA ESTRUTURA DE PASTAS

```
js/
├── storage/                    ⬅️ NOVO
│   ├── Storage.js             # Interface base
│   ├── LocalStorageImpl.js     # Implementação localStorage
│   └── SupabaseStorageImpl.js  # Stub Supabase (futuro)
├── models/                     ⬅️ NOVO
│   ├── Athlete.js             # Model com validação
│   └── Cycle.js               # Model com validação
├── migration/                  ⬅️ NOVO
│   └── DataMigration.js       # Helper de migração
├── storage.init.js            ⬅️ NOVO
│── init.js                    (modificado)
├── data.js                    (compatível)
├── ui.js
└── ... (resto do código)
```

---

## 🔌 COMO USAR - STORAGE LAYER

### Inicializar (Automático)

```javascript
// storage.init.js é carregado automaticamente
// Inicializa LocalStorageImpl por padrão

const engine = getStorageEngine();
```

### Usar Storage

```javascript
// Buscar atletas
const athletes = await storageEngine.getAthletes();

// Criar atleta
const athlete = await storageEngine.createAthlete({
  id: generateUUID(),
  nome: "João Silva",
  ciclos: []
});

// Atualizar ciclo
await storageEngine.updateCycle(athleteId, cycleId, {
  nome: "Novo nome"
});

// Deletar atleta
await storageEngine.deleteAthlete(athleteId);

// Backup completo
const allData = await storageEngine.getAllData();

// Restaurar backup
await storageEngine.restoreData(backupData);

// Validar integridade
const isValid = await storageEngine.validate();
```

---

## 📋 MODELS - VALIDAÇÃO & LÓGICA

### Athlete Model

```javascript
// Criar novo atleta
const athlete = Athlete.create("João Silva", "intermediario");

// Com dados existentes
const athlete = new Athlete({
  id: "abc123",
  name: "João",
  cycles: [...]
});

// Validar antes de usar
Athlete.validate({ name: "João" });

// Métodos úteis
athlete.addCycle(cycle);           // Adicionar ciclo
athlete.removeCycle(cycleId);      // Remover ciclo
athlete.getTotalCycles();          // Contar ciclos
athlete.getTotalWorkouts();        // Contar todos os treinos

// Salvar em banco
const dbFormat = athlete.toDatabase();
const jsonFormat = athlete.toJSON();
```

### Cycle Model

```javascript
// Criar novo ciclo
const cycle = Cycle.create(athleteId, "21km - Maratona", 6);

// Métodos úteis
cycle.addWeek("Semana de Base");
cycle.getTotalWorkouts();
cycle.getTotalDistance();
cycle.setRaceDate("2026-09-15");
cycle.getDaysUntilRace();           // Dias até a prova

// Salvar em banco
const dbFormat = cycle.toDatabase();
```

---

## 🔄 MIGRAÇÃO - localStorage → Supabase

### Quando você estiver pronto para Supabase:

**PASSO 1**: Exportar dados do localStorage

```javascript
const localData = {
  atletas: dados.atletas
};
```

**PASSO 2**: Migrar para estrutura Supabase

```javascript
const migrationResult = DataMigration.migrateToSupabase(localData);

console.log(migrationResult);
// {
//   athletes: [...],
//   cycles: [...],
//   weeks: [...],
//   workouts: [...],
//   totalAthletes: 3,
//   totalCycles: 5,
//   totalWorkouts: 60
// }
```

**PASSO 3**: Validar migração

```javascript
DataMigration.validateMigration(localData, migrationResult);
```

**PASSO 4**: Gerar relatório

```javascript
const report = DataMigration.generateReport(migrationResult);
console.log(report);
```

**PASSO 5**: Inserir em Supabase (manual via dashboard ou script SQL)

```sql
INSERT INTO alunos (id, coach_id, name, level, created_at) 
VALUES (...);

INSERT INTO planos_treino (id, aluno_id, name, status, created_at)
VALUES (...);

-- etc...
```

**PASSO 6**: Trocar storage engine em tempo de execução

```javascript
const supabaseClient = createClient(URL, KEY);
switchStorageEngine('supabase', { supabaseClient });
```

---

## 🔄 COMPATIBILIDADE COM CÓDIGO ANTIGO

Os models têm **getters/setters** para manter compatibilidade:

```javascript
const athlete = new Athlete({ name: "João" });

// Novo (preferred)
athlete.name = "Maria";

// Antigo (ainda funciona)
athlete.nome = "Maria";

// Ambos retornam o mesmo valor
console.log(athlete.name);  // "Maria"
console.log(athlete.nome);  // "Maria"
```

O mesmo vale para `ciclos`, `notas`, `historicoPaces`, etc.

---

## 🔌 PRÓXIMO PASSO: SERVICE LAYER

Quando implementar Service Layer, será assim:

```javascript
class AthleteService {
  constructor(storage) {
    this.storage = storage;
  }

  async createAthlete(name, level) {
    // Validação
    Athlete.validate({ name, level });

    // Criar model
    const athlete = Athlete.create(name, level);

    // Persistir
    return this.storage.createAthlete(athlete.toJSON());
  }

  async deleteAthlete(id) {
    // Validar que existe
    const athlete = await this.storage.getAthlete(id);
    if (!athlete) throw new Error('Atleta não encontrado');

    // Backup automático
    const backup = await this.storage.getAllData();
    await createSecurityBackup(backup);

    // Deletar
    return this.storage.deleteAthlete(id);
  }
}

// Usar
const athleteService = new AthleteService(storageEngine);
await athleteService.createAthlete("João", "intermediario");
```

---

## 📝 DOCUMENTAÇÃO DE SCHEMA FUTURO

Quando conectar a Supabase, o schema será:

```sql
-- Atletas
CREATE TABLE alunos (
  id UUID PRIMARY KEY,
  coach_id UUID REFERENCES auth.users(id),
  name VARCHAR(60),
  level VARCHAR(20),
  notes TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ  -- Soft delete
);

-- Ciclos
CREATE TABLE planos_treino (
  id UUID PRIMARY KEY,
  aluno_id UUID REFERENCES alunos(id) ON DELETE CASCADE,
  name VARCHAR(100),
  status VARCHAR(20),
  target_distance VARCHAR(10),
  race_date DATE,
  version INT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ
);

-- Semanas
CREATE TABLE semanas (
  id UUID PRIMARY KEY,
  plano_id UUID REFERENCES planos_treino(id) ON DELETE CASCADE,
  week_number INT,
  name VARCHAR(255),
  created_at TIMESTAMPTZ
);

-- Treinos
CREATE TABLE treinos (
  id UUID PRIMARY KEY,
  semana_id UUID REFERENCES semanas(id) ON DELETE CASCADE,
  type VARCHAR(50),
  distance DECIMAL(5,2),
  pace_zone VARCHAR(5),
  phase VARCHAR(50),
  notes TEXT,
  feedback JSONB,
  created_at TIMESTAMPTZ
);

-- Row Level Security (RLS)
CREATE POLICY "aluno_vê_seus_dados" ON alunos
  FOR SELECT USING (auth.uid() = coach_id);

CREATE POLICY "aluno_edita_seus_dados" ON alunos
  FOR UPDATE USING (auth.uid() = coach_id);
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

- [x] Storage interface base criada
- [x] LocalStorageImpl implementado
- [x] SupabaseStorageImpl stub criado
- [x] Athlete model com validação
- [x] Cycle model com validação
- [x] DataMigration helper
- [x] storage.init.js automatizado
- [ ] Service layer (próximo)
- [ ] Integração com Supabase real (mês 2)
- [ ] Testes unitários
- [ ] Documentação de API

---

## 🧪 TESTES RECOMENDADOS

### Teste 1: Validação de Athlete

```javascript
try {
  Athlete.validate({ name: "Jo" }); // Deve falhar
} catch (e) {
  console.log('✅ Validação funcionando');
}
```

### Teste 2: Criar e Salvar Atleta

```javascript
const athlete = Athlete.create("João Silva");
const saved = await storageEngine.createAthlete(athlete.toJSON());
console.log('✅ Atleta salvo:', saved.id);
```

### Teste 3: Migração de Dados

```javascript
const localData = { atletas: dados.atletas };
const migrated = DataMigration.migrateToSupabase(localData);
DataMigration.validateMigration(localData, migrated);
console.log('✅ Migração validada');
```

### Teste 4: Trocar Storage Engine

```javascript
// Criar novo engine
const newEngine = new LocalStorageImpl();

// Buscar dados
const athletes = await newEngine.getAthletes();
console.log('✅ Novo engine funcionando');
```

---

## 📊 BENEFÍCIOS DA NOVA ARQUITETURA

| Aspecto | Antes | Depois |
|---|---|---|
| **Trocar localStorage por Supabase** | Refatorar tudo | Só mudar `initializeStorage()` |
| **Validar dados** | Espalhado em vários arquivos | Models centralizados |
| **Migrar dados** | Manual e arriscado | Helper automático |
| **Testabilidade** | Difícil (acoplado) | Fácil (desacoplado) |
| **Manutenção** | Complexa | Simples e modular |

---

## 🚀 PRÓXIMO SPRINT

**Semana 4**:
1. Implementar Service Layer
2. Conectar models ao código existente
3. Testes de integração
4. Documentação de API

**Mês 2**:
1. Backend Node.js + Supabase
2. Integração com SupabaseStorageImpl
3. Migração de dados reais
4. Testes em produção

---

*Código pronto para escalar! 🎯*
