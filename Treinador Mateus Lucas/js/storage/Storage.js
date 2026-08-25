/* ===== STORAGE INTERFACE (BASE CLASS) ===== */

class Storage {
  // Atletas / Athletes
  async getAthletes() {
    throw new Error('getAthletes() não implementado');
  }

  async getAthlete(id) {
    throw new Error('getAthlete() não implementado');
  }

  async createAthlete(athlete) {
    throw new Error('createAthlete() não implementado');
  }

  async updateAthlete(id, athlete) {
    throw new Error('updateAthlete() não implementado');
  }

  async deleteAthlete(id) {
    throw new Error('deleteAthlete() não implementado');
  }

  // Ciclos / Cycles
  async getCycles(athleteId) {
    throw new Error('getCycles() não implementado');
  }

  async getCycle(athleteId, cycleId) {
    throw new Error('getCycle() não implementado');
  }

  async createCycle(athleteId, cycle) {
    throw new Error('createCycle() não implementado');
  }

  async updateCycle(athleteId, cycleId, cycle) {
    throw new Error('updateCycle() não implementado');
  }

  async deleteCycle(athleteId, cycleId) {
    throw new Error('deleteCycle() não implementado');
  }

  // Backups
  async getAllData() {
    throw new Error('getAllData() não implementado');
  }

  async restoreData(data) {
    throw new Error('restoreData() não implementado');
  }

  // Validação
  async validate() {
    throw new Error('validate() não implementado');
  }
}
