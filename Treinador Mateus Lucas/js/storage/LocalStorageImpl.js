/* ===== LOCALSTORAGE IMPLEMENTATION ===== */

class LocalStorageImpl extends Storage {
  constructor() {
    super();
    this.STORAGE_KEY = 'plannerCorrida';
    this.data = this.loadData();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) {
        return { atletas: [], templatesCiclo: [], biblioteca: [] };
      }
      return JSON.parse(stored);
    } catch (e) {
      console.error('Erro ao carregar localStorage:', e);
      return { atletas: [], templatesCiclo: [], biblioteca: [] };
    }
  }

  persist() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        console.error('localStorage cheio:', e);
        throw new Error('Armazenamento local cheio');
      }
      console.error('Erro ao salvar localStorage:', e);
      throw e;
    }
  }

  // ATLETAS
  async getAthletes() {
    return this.data.atletas || [];
  }

  async getAthlete(id) {
    return this.data.atletas?.find(a => a.id === id) || null;
  }

  async createAthlete(athlete) {
    if (!this.data.atletas) this.data.atletas = [];
    this.data.atletas.push(athlete);
    this.persist();
    return athlete;
  }

  async updateAthlete(id, athlete) {
    const idx = this.data.atletas?.findIndex(a => a.id === id) ?? -1;
    if (idx >= 0) {
      this.data.atletas[idx] = { ...this.data.atletas[idx], ...athlete };
      this.persist();
      return this.data.atletas[idx];
    }
    throw new Error('Atleta não encontrado');
  }

  async deleteAthlete(id) {
    const initialLength = this.data.atletas?.length ?? 0;
    this.data.atletas = this.data.atletas?.filter(a => a.id !== id) ?? [];
    if (this.data.atletas.length < initialLength) {
      this.persist();
      return true;
    }
    throw new Error('Atleta não encontrado');
  }

  // CICLOS
  async getCycles(athleteId) {
    const athlete = await this.getAthlete(athleteId);
    return athlete?.ciclos ?? [];
  }

  async getCycle(athleteId, cycleId) {
    const athlete = await this.getAthlete(athleteId);
    return athlete?.ciclos?.find(c => c.id === cycleId) ?? null;
  }

  async createCycle(athleteId, cycle) {
    const athlete = await this.getAthlete(athleteId);
    if (!athlete) throw new Error('Atleta não encontrado');

    if (!athlete.ciclos) athlete.ciclos = [];
    athlete.ciclos.push(cycle);
    this.persist();
    return cycle;
  }

  async updateCycle(athleteId, cycleId, cycle) {
    const athlete = await this.getAthlete(athleteId);
    if (!athlete) throw new Error('Atleta não encontrado');

    const idx = athlete.ciclos?.findIndex(c => c.id === cycleId) ?? -1;
    if (idx >= 0) {
      athlete.ciclos[idx] = { ...athlete.ciclos[idx], ...cycle };
      this.persist();
      return athlete.ciclos[idx];
    }
    throw new Error('Ciclo não encontrado');
  }

  async deleteCycle(athleteId, cycleId) {
    const athlete = await this.getAthlete(athleteId);
    if (!athlete) throw new Error('Atleta não encontrado');

    const initialLength = athlete.ciclos?.length ?? 0;
    athlete.ciclos = athlete.ciclos?.filter(c => c.id !== cycleId) ?? [];
    if (athlete.ciclos.length < initialLength) {
      this.persist();
      return true;
    }
    throw new Error('Ciclo não encontrado');
  }

  // BACKUP
  async getAllData() {
    return JSON.parse(JSON.stringify(this.data));
  }

  async restoreData(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Dados inválidos');
    }
    if (!Array.isArray(data.atletas)) {
      throw new Error('Estrutura de dados inválida');
    }

    this.data = data;
    this.persist();
    return true;
  }

  // VALIDAÇÃO
  async validate() {
    if (!this.data || typeof this.data !== 'object') {
      throw new Error('Dados não é um objeto');
    }

    if (!Array.isArray(this.data.atletas)) {
      throw new Error('Atletas não é um array');
    }

    // Validar estrutura de cada atleta
    for (const athlete of this.data.atletas) {
      if (!athlete.id || !athlete.nome) {
        throw new Error('Atleta inválido: falta id ou nome');
      }
      if (!Array.isArray(athlete.ciclos)) {
        throw new Error(`Atleta "${athlete.nome}": ciclos não é array`);
      }
    }

    return true;
  }

  // SAVE DATA
  saveData(data) {
    if (data && data.atletas) {
      this.data.atletas = data.atletas;
      this.persist();
    }
  }

  // SYNC VERSIONS (para uso imediato sem await)
  getAthleteSync(id) {
    return this.data.atletas?.find(a => a.id === id) || null;
  }
}
