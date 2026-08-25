/* ===== SUPABASE STORAGE IMPLEMENTATION (STUB) ===== */

class SupabaseStorageImpl extends Storage {
  constructor(supabaseClient) {
    super();
    this.client = supabaseClient;
    this.userId = supabaseClient.auth?.user?.id;

    if (!this.userId) {
      throw new Error('Usuário não autenticado no Supabase');
    }
  }

  // ATLETAS
  async getAthletes() {
    try {
      const { data, error } = await this.client
        .from('alunos')
        .select('*')
        .eq('treinador_id', this.userId);

      if (error) throw error;
      return data || [];
    } catch (e) {
      console.error('Erro ao buscar atletas:', e);
      throw e;
    }
  }

  async getAthlete(id) {
    try {
      const { data, error } = await this.client
        .from('alunos')
        .select('*')
        .eq('id', id)
        .eq('treinador_id', this.userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    } catch (e) {
      console.error('Erro ao buscar atleta:', e);
      throw e;
    }
  }

  async createAthlete(athlete) {
    try {
      const { data, error } = await this.client
        .from('alunos')
        .insert([{
          ...athlete,
          treinador_id: this.userId
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (e) {
      console.error('Erro ao criar atleta:', e);
      throw e;
    }
  }

  async updateAthlete(id, athlete) {
    try {
      const { data, error } = await this.client
        .from('alunos')
        .update({
          ...athlete,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('treinador_id', this.userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (e) {
      console.error('Erro ao atualizar atleta:', e);
      throw e;
    }
  }

  async deleteAthlete(id) {
    try {
      const { error } = await this.client
        .from('alunos')
        .delete()
        .eq('id', id)
        .eq('treinador_id', this.userId);

      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Erro ao deletar atleta:', e);
      throw e;
    }
  }

  // CICLOS
  async getCycles(athleteId) {
    try {
      const { data, error } = await this.client
        .from('planos_treino')
        .select('*')
        .eq('aluno_id', athleteId);

      if (error) throw error;
      return data || [];
    } catch (e) {
      console.error('Erro ao buscar ciclos:', e);
      throw e;
    }
  }

  async getCycle(athleteId, cycleId) {
    try {
      const { data, error } = await this.client
        .from('planos_treino')
        .select('*')
        .eq('id', cycleId)
        .eq('aluno_id', athleteId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    } catch (e) {
      console.error('Erro ao buscar ciclo:', e);
      throw e;
    }
  }

  async createCycle(athleteId, cycle) {
    // Implementação futura quando conectar a Supabase
    throw new Error('createCycle() será implementado em breve');
  }

  async updateCycle(athleteId, cycleId, cycle) {
    // Implementação futura
    throw new Error('updateCycle() será implementado em breve');
  }

  async deleteCycle(athleteId, cycleId) {
    // Implementação futura
    throw new Error('deleteCycle() será implementado em breve');
  }

  // BACKUP
  async getAllData() {
    // No Supabase, teríamos que buscar todas as tabelas
    throw new Error('getAllData() será implementado em breve');
  }

  async restoreData(data) {
    throw new Error('restoreData() será implementado em breve');
  }

  // VALIDAÇÃO
  async validate() {
    try {
      // Verificar conectividade com Supabase
      const { data, error } = await this.client.auth.getSession();
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Erro ao validar Supabase:', e);
      throw e;
    }
  }
}
