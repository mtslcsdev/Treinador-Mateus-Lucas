/* ===== CYCLE SERVICE ===== */

class CycleService {
  constructor(storage) {
    this.storage = storage;
  }

  /**
   * Criar novo ciclo
   */
  async createCycle(athleteId, cycleName, weeks = 6) {
    if (!athleteId) throw new Error('athleteId obrigatório');
    if (!cycleName || cycleName.length < 3) {
      throw new Error('Nome do ciclo deve ter pelo menos 3 caracteres');
    }

    const cycle = Cycle.create(athleteId, cycleName, weeks);

    try {
      return await this.storage.createCycle(athleteId, cycle.toJSON());
    } catch (e) {
      console.error('Erro ao criar ciclo:', e);
      throw new Error(`Não foi possível criar ciclo: ${e.message}`);
    }
  }

  /**
   * Buscar ciclos de um atleta
   */
  async getCycles(athleteId) {
    if (!athleteId) throw new Error('athleteId obrigatório');

    try {
      return await this.storage.getCycles(athleteId);
    } catch (e) {
      console.error('Erro ao buscar ciclos:', e);
      return [];
    }
  }

  /**
   * Buscar um ciclo específico
   */
  async getCycleById(athleteId, cycleId) {
    if (!athleteId || !cycleId) throw new Error('athleteId e cycleId obrigatórios');

    try {
      return await this.storage.getCycle(athleteId, cycleId);
    } catch (e) {
      console.error('Erro ao buscar ciclo:', e);
      return null;
    }
  }

  /**
   * Atualizar ciclo
   */
  async updateCycle(athleteId, cycleId, updates) {
    if (!athleteId || !cycleId) throw new Error('athleteId e cycleId obrigatórios');

    const cycle = await this.getCycleById(athleteId, cycleId);
    if (!cycle) throw new Error('Ciclo não encontrado');

    try {
      return await this.storage.updateCycle(athleteId, cycleId, updates);
    } catch (e) {
      console.error('Erro ao atualizar ciclo:', e);
      throw e;
    }
  }

  /**
   * Deletar ciclo (com proteção)
   */
  async deleteCycle(athleteId, cycleId) {
    if (!athleteId || !cycleId) throw new Error('athleteId e cycleId obrigatórios');

    const cycle = await this.getCycleById(athleteId, cycleId);
    if (!cycle) throw new Error('Ciclo não encontrado');

    // Avisar se tem prova alvo
    if (cycle.prova?.data) {
      console.warn(`⚠️ Ciclo tem prova alvo em ${cycle.prova.data}`);
    }

    // Backup automático
    try {
      if (typeof fazerBackupAutomaticoSeguranca === 'function') {
        fazerBackupAutomaticoSeguranca();
      }
    } catch (e) {
      console.warn('Erro ao criar backup:', e);
    }

    try {
      return await this.storage.deleteCycle(athleteId, cycleId);
    } catch (e) {
      console.error('Erro ao deletar ciclo:', e);
      throw e;
    }
  }

  /**
   * Obter estatísticas do ciclo
   */
  async getCycleStats(athleteId, cycleId) {
    const cycle = await this.getCycleById(athleteId, cycleId);
    if (!cycle) return null;

    const totalWeeks = cycle.semanas?.length || 0;
    const totalWorkouts = cycle.semanas?.reduce((acc, w) =>
      acc + (w.treinos?.length || 0), 0
    ) || 0;
    const totalDistance = cycle.semanas?.reduce((acc, w) =>
      acc + (w.treinos?.reduce((sum, t) => sum + (parseFloat(t.km) || 0), 0) || 0), 0
    ) || 0;

    const daysUntilRace = cycle.prova?.data
      ? Math.ceil((new Date(cycle.prova.data + 'T00:00:00') - new Date()) / (1000 * 60 * 60 * 24))
      : null;

    return {
      name: cycle.nome,
      status: cycle.status || 'ativo',
      totalWeeks,
      totalWorkouts,
      totalDistance: parseFloat(totalDistance.toFixed(2)),
      raceDate: cycle.prova?.data || null,
      daysUntilRace,
      created_at: cycle.created_at
    };
  }

  /**
   * Obter próxima prova
   */
  async getNextRace(athleteId) {
    const cycles = await this.getCycles(athleteId);
    const cyclesWithRace = cycles
      .filter(c => c.prova?.data)
      .sort((a, b) => new Date(a.prova.data) - new Date(b.prova.data));

    return cyclesWithRace[0] || null;
  }

  /**
   * Obter ciclos ativos
   */
  async getActiveCycles(athleteId) {
    const cycles = await this.getCycles(athleteId);
    return cycles.filter(c => c.status !== 'concluido');
  }
}
