/* ===== ATHLETE MODEL ===== */

class Athlete {
  constructor(data = {}) {
    this.id = data.id || generateUUID();
    this.coach_id = data.coach_id || null;  // Para autenticação futura
    this.name = data.name || data.nome || '';
    this.level = data.level || 'intermediario';
    this.cycles = data.cycles || data.ciclos || [];
    this.notes = data.notes || data.notas || '';
    this.historic_paces = data.historic_paces || data.historicoPaces || [];
    this.created_at = data.created_at || new Date().toISOString();
    this.updated_at = data.updated_at || new Date().toISOString();
    this.deleted_at = data.deleted_at || null; // Soft delete
  }

  static validate(data) {
    if (!data) throw new Error('Dados de atleta obrigatório');
    if (!data.name && !data.nome) throw new Error('Nome do atleta obrigatório');
    if (data.name && data.name.length < 3) throw new Error('Nome deve ter pelo menos 3 caracteres');
    return true;
  }

  static create(name, level = 'intermediario') {
    Athlete.validate({ name });
    return new Athlete({
      name,
      level,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }

  addCycle(cycle) {
    if (!Array.isArray(this.cycles)) {
      this.cycles = [];
    }
    this.cycles.push(cycle);
    this.updated_at = new Date().toISOString();
    return this;
  }

  removeCycle(cycleId) {
    const initialLength = this.cycles?.length ?? 0;
    this.cycles = this.cycles?.filter(c => c.id !== cycleId) ?? [];
    if (this.cycles.length < initialLength) {
      this.updated_at = new Date().toISOString();
      return true;
    }
    return false;
  }

  getCycle(cycleId) {
    return this.cycles?.find(c => c.id === cycleId) || null;
  }

  getTotalCycles() {
    return this.cycles?.length ?? 0;
  }

  getTotalWorkouts() {
    return this.cycles?.reduce((acc, c) =>
      acc + (c.semanas?.reduce((s, w) => s + (w.treinos?.length || 0), 0) || 0), 0
    ) || 0;
  }

  toDatabase() {
    return {
      id: this.id,
      coach_id: this.coach_id,
      name: this.name,
      level: this.level,
      notes: this.notes,
      created_at: this.created_at,
      updated_at: new Date().toISOString(),
      deleted_at: this.deleted_at
    };
  }

  toJSON() {
    return {
      id: this.id,
      coach_id: this.coach_id,
      name: this.name,
      level: this.level,
      cycles: this.cycles,
      notes: this.notes,
      historic_paces: this.historic_paces,
      created_at: this.created_at,
      updated_at: this.updated_at,
      deleted_at: this.deleted_at
    };
  }

  // Compatibilidade com código antigo
  get nome() {
    return this.name;
  }

  set nome(value) {
    this.name = value;
  }

  get ciclos() {
    return this.cycles;
  }

  set ciclos(value) {
    this.cycles = value;
  }

  get notas() {
    return this.notes;
  }

  set notas(value) {
    this.notes = value;
  }

  get historicoPaces() {
    return this.historic_paces;
  }

  set historicoPaces(value) {
    this.historic_paces = value;
  }
}
