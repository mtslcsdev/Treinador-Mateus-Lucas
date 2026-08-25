/* ===== ATHLETE SERVICE ===== */

class AthleteService {
  constructor(storage) {
    this.storage = storage;
  }

  /**
   * Criar novo atleta
   */
  async createAthlete(name, level = 'intermediario') {
    if (!name || name.length < 3) {
      throw new Error('Nome deve ter pelo menos 3 caracteres');
    }

    const athlete = Athlete.create(name, level);

    try {
      return await this.storage.createAthlete(athlete.toJSON());
    } catch (e) {
      console.error('Erro ao criar atleta:', e);
      throw new Error(`Não foi possível criar atleta: ${e.message}`);
    }
  }

  /**
   * Buscar todos os atletas
   */
  async getAllAthletes() {
    try {
      return await this.storage.getAthletes();
    } catch (e) {
      console.error('Erro ao buscar atletas:', e);
      return [];
    }
  }

  /**
   * Alias para getAllAthletes
   */
  async getAthletes() {
    return this.getAllAthletes();
  }

  /**
   * Buscar atleta por ID
   */
  async getAthleteById(id) {
    if (!id) throw new Error('ID obrigatório');

    try {
      return await this.storage.getAthlete(id);
    } catch (e) {
      console.error('Erro ao buscar atleta:', e);
      return null;
    }
  }

  /**
   * Alias para getAthleteById
   */
  async getAthlete(id) {
    return this.getAthleteById(id);
  }

  /**
   * Atualizar atleta
   */
  async updateAthlete(id, updates) {
    if (!id) throw new Error('ID obrigatório');

    const athlete = await this.getAthleteById(id);
    if (!athlete) throw new Error('Atleta não encontrado');

    try {
      return await this.storage.updateAthlete(id, updates);
    } catch (e) {
      console.error('Erro ao atualizar atleta:', e);
      throw e;
    }
  }

  /**
   * Deletar atleta (com proteção)
   */
  async deleteAthlete(id) {
    if (!id) throw new Error('ID obrigatório');

    const athlete = await this.getAthleteById(id);
    if (!athlete) throw new Error('Atleta não encontrado');

    // Backup automático antes de deletar
    try {
      if (typeof fazerBackupAutomaticoSeguranca === 'function') {
        fazerBackupAutomaticoSeguranca();
      }
    } catch (e) {
      console.warn('Erro ao criar backup de segurança:', e);
    }

    try {
      return await this.storage.deleteAthlete(id);
    } catch (e) {
      console.error('Erro ao deletar atleta:', e);
      throw e;
    }
  }

  /**
   * Obter total de ciclos de um atleta
   */
  async getTotalCycles(athleteId) {
    const athlete = await this.getAthleteById(athleteId);
    return athlete?.ciclos?.length || 0;
  }

  /**
   * Obter total de treinos de um atleta
   */
  async getTotalWorkouts(athleteId) {
    const athlete = await this.getAthleteById(athleteId);
    return athlete?.ciclos?.reduce((acc, c) =>
      acc + (c.semanas?.reduce((s, w) => s + (w.treinos?.length || 0), 0) || 0), 0
    ) || 0;
  }

  /**
   * Buscar estatísticas do atleta
   */
  async getAthleteStats(athleteId) {
    const athlete = await this.getAthleteById(athleteId);
    if (!athlete) return null;

    const totalCycles = athlete.ciclos?.length || 0;
    const totalWorkouts = await this.getTotalWorkouts(athleteId);
    const totalDistance = athlete.ciclos?.reduce((acc, c) =>
      acc + (c.semanas?.reduce((s, w) =>
        s + (w.treinos?.reduce((t, tr) => t + (parseFloat(tr.km) || 0), 0) || 0), 0) || 0), 0
    ) || 0;

    return {
      name: athlete.nome,
      level: athlete.level || 'intermediario',
      totalCycles,
      totalWorkouts,
      totalDistance: parseFloat(totalDistance.toFixed(2)),
      created_at: athlete.created_at
    };
  }
}
