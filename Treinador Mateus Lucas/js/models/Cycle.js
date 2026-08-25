/* ===== CYCLE MODEL ===== */

class Cycle {
  constructor(data = {}) {
    this.id = data.id || generateUUID();
    this.athlete_id = data.athlete_id || null;
    this.name = data.name || data.nome || '';
    this.status = data.status || 'ativo'; // ativo, pausado, concluido
    this.target_distance = data.target_distance || '21km';
    this.race_date = data.race_date || null;
    this.prova = data.prova || null;
    this.weeks = data.weeks || data.semanas || [];
    this.version = data.version || 1;
    this.created_at = data.created_at || new Date().toISOString();
    this.updated_at = data.updated_at || new Date().toISOString();
    this.deleted_at = data.deleted_at || null; // Soft delete
  }

  static validate(data) {
    if (!data) throw new Error('Dados do ciclo obrigatório');
    if (!data.athlete_id) throw new Error('athlete_id obrigatório');
    if (!data.name && !data.nome) throw new Error('Nome do ciclo obrigatório');
    return true;
  }

  static create(athleteId, name, weeks = 6) {
    Cycle.validate({ athlete_id: athleteId, name });

    const cycle = new Cycle({
      athlete_id: athleteId,
      name,
      created_at: new Date().toISOString()
    });

    // Criar semanas
    const defaultWeekNames = [
      'Semana Ordinária - Período Base',
      'Semana de Choque - Período Base',
      'Semana de Recuperação - Período Base',
      'Semana Ordinária - Período Específico',
      'Semana de Choque - Período Específico',
      'Semana de Recuperação - Período Específico'
    ];

    for (let i = 1; i <= weeks; i++) {
      const weekName = defaultWeekNames[i - 1] || `Semana ${i}`;
      cycle.addWeek(weekName);
    }

    return cycle;
  }

  addWeek(weekName, dayOfWeek = 1) {
    const week = {
      semana: (this.weeks?.length || 0) + 1,
      nome: weekName,
      treinos: []
    };
    if (!Array.isArray(this.weeks)) {
      this.weeks = [];
    }
    this.weeks.push(week);
    this.updated_at = new Date().toISOString();
    return week;
  }

  getWeek(index) {
    return this.weeks?.[index] || null;
  }

  getWeeks() {
    return this.weeks || [];
  }

  removeWeek(index) {
    if (index >= 0 && index < this.weeks?.length) {
      this.weeks.splice(index, 1);
      this.updated_at = new Date().toISOString();
      return true;
    }
    return false;
  }

  getTotalWorkouts() {
    return this.weeks?.reduce((acc, w) => acc + (w.treinos?.length || 0), 0) || 0;
  }

  getTotalDistance() {
    return this.weeks?.reduce((acc, w) =>
      acc + (w.treinos?.reduce((sum, t) => sum + (parseFloat(t.km) || 0), 0) || 0), 0
    ) || 0;
  }

  setRaceDate(date) {
    this.race_date = date;
    this.prova = { data: date };
    this.updated_at = new Date().toISOString();
    return this;
  }

  getDaysUntilRace() {
    if (!this.race_date) return null;
    const raceDate = new Date(this.race_date + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = raceDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  toDatabase() {
    return {
      id: this.id,
      athlete_id: this.athlete_id,
      name: this.name,
      status: this.status,
      target_distance: this.target_distance,
      race_date: this.race_date,
      version: this.version,
      created_at: this.created_at,
      updated_at: new Date().toISOString(),
      deleted_at: this.deleted_at
    };
  }

  toJSON() {
    return {
      id: this.id,
      athlete_id: this.athlete_id,
      name: this.name,
      status: this.status,
      target_distance: this.target_distance,
      race_date: this.race_date,
      prova: this.prova,
      weeks: this.weeks,
      version: this.version,
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

  get semanas() {
    return this.weeks;
  }

  set semanas(value) {
    this.weeks = value;
  }
}
