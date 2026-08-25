/* ===== DATA MIGRATION HELPER ===== */

class DataMigration {
  /**
   * Migra dados do localStorage para estrutura Supabase
   * @param {Object} localData - Dados do localStorage (dados.atletas)
   * @returns {Object} { athletes, cycles, weeks, workouts }
   */
  static migrateToSupabase(localData) {
    if (!localData || !localData.atletas) {
      throw new Error('Dados inválidos para migração');
    }

    const athletes = [];
    const cycles = [];
    const weeks = [];
    const workouts = [];

    localData.atletas.forEach(atleta => {
      // Criar atleta
      const athleteModel = new Athlete({
        id: atleta.id,
        coach_id: null,
        name: atleta.nome,
        level: atleta.level || 'intermediario',
        notes: atleta.notas || '',
        created_at: new Date().toISOString()
      });

      athletes.push(athleteModel.toDatabase());

      // Migrar ciclos
      if (Array.isArray(atleta.ciclos)) {
        atleta.ciclos.forEach(ciclo => {
          const cycleModel = new Cycle({
            id: ciclo.id,
            athlete_id: atleta.id,
            name: ciclo.nome,
            status: 'ativo',
            race_date: ciclo.prova?.data || null,
            created_at: new Date().toISOString()
          });

          cycles.push(cycleModel.toDatabase());

          // Migrar semanas e treinos
          if (Array.isArray(ciclo.semanas)) {
            ciclo.semanas.forEach((semana, semanaIdx) => {
              const weekId = `week_${ciclo.id}_${semanaIdx}`;

              weeks.push({
                id: weekId,
                cycle_id: ciclo.id,
                week_number: semana.semana || semanaIdx + 1,
                name: semana.nome
              });

              // Migrar treinos
              if (Array.isArray(semana.treinos)) {
                semana.treinos.forEach((treino, treinoIdx) => {
                  workouts.push({
                    id: generateUUID(),
                    week_id: weekId,
                    type: treino.tipo,
                    distance: parseFloat(treino.km) || 0,
                    pace_zone: treino.zona || '',
                    phase: treino.fase || '',
                    notes: treino.obs || '',
                    feedback: treino.feedback || {},
                    created_at: new Date().toISOString()
                  });
                });
              }
            });
          }
        });
      }
    });

    return {
      athletes,
      cycles,
      weeks,
      workouts,
      totalAthletes: athletes.length,
      totalCycles: cycles.length,
      totalWeeks: weeks.length,
      totalWorkouts: workouts.length
    };
  }

  /**
   * Valida se a migração foi bem-sucedida
   * @param {Object} source - Dados originais (localStorage)
   * @param {Object} target - Dados migrados
   * @returns {boolean}
   */
  static validateMigration(source, target) {
    if (!source || !source.atletas || !target) {
      throw new Error('Dados de validação inválidos');
    }

    const sourceAthleteCount = source.atletas.length;
    const targetAthleteCount = target.athletes?.length || 0;

    if (sourceAthleteCount !== targetAthleteCount) {
      throw new Error(
        `Mismatch na contagem de atletas: ${sourceAthleteCount} → ${targetAthleteCount}`
      );
    }

    // Validar que cada atleta foi migrado
    source.atletas.forEach((atleta, idx) => {
      if (!target.athletes[idx]) {
        throw new Error(`Atleta ${idx} não encontrado na migração`);
      }
      if (target.athletes[idx].id !== atleta.id) {
        throw new Error(`ID mismatch no atleta ${idx}`);
      }
    });

    return true;
  }

  /**
   * Gera relatório de migração
   * @param {Object} migrationResult - Resultado da migraçáo
   * @returns {string}
   */
  static generateReport(migrationResult) {
    return `
    === RELATÓRIO DE MIGRAÇÃO ===
    Atletas: ${migrationResult.totalAthletes}
    Ciclos: ${migrationResult.totalCycles}
    Semanas: ${migrationResult.totalWeeks}
    Treinos: ${migrationResult.totalWorkouts}

    Status: ✅ MIGRAÇÃO COMPLETA
    `;
  }

  /**
   * Rollback: converte dados Supabase de volta para localStorage
   * (Implementar quando necessário)
   */
  static migrateFromSupabase(supabaseData) {
    // TODO: Implementar quando Supabase estiver em produção
    throw new Error('migrateFromSupabase() será implementado em breve');
  }
}
