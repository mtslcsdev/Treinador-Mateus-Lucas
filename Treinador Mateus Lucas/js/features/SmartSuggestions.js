/* ===== SUGESTÕES INTELIGENTES ===== */

class SmartSuggestions {
  /**
   * Gerar sugestões para um ciclo
   */
  static generateSuggestions(athleteId, cycleId) {
    try {
      const storage = getStorageEngine();
      const athlete = storage.getAthleteSync(athleteId);
      const cycle = athlete.ciclos.find(c => c.id === cycleId);

      if (!cycle) throw new Error('Ciclo não encontrado');

      const suggestions = [];

      // Análise de volume
      suggestions.push(...this._volumeSuggestions(cycle));

      // Análise de zonas
      suggestions.push(...this._zoneSuggestions(cycle));

      // Análise de progressão
      suggestions.push(...this._progressionSuggestions(cycle));

      // Análise de recuperação
      suggestions.push(...this._recoverySuggestions(cycle));

      // Análise de variedade
      suggestions.push(...this._varietySuggestions(cycle));

      return suggestions.sort((a, b) => b.priority - a.priority);
    } catch (e) {
      console.error('Erro ao gerar sugestões:', e);
      return [];
    }
  }

  /**
   * Sugestões de volume
   */
  static _volumeSuggestions(cycle) {
    const suggestions = [];
    const volumes = cycle.semanas.map(w =>
      w.treinos.reduce((sum, t) => sum + (parseFloat(t.km) || 0), 0)
    );

    const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;
    const maxVolume = Math.max(...volumes);
    const minVolume = Math.min(...volumes);

    // Volume muito alto
    if (maxVolume > avgVolume * 1.5) {
      suggestions.push({
        type: 'volume',
        priority: 3,
        icon: '⚠️',
        title: 'Volume muito alto em uma semana',
        description: `Semana com ${maxVolume.toFixed(0)}km é ${((maxVolume/avgVolume - 1) * 100).toFixed(0)}% acima da média. Risco de overtraining.`,
        action: 'Considere reduzir volume ou distribuir melhor.'
      });
    }

    // Progressão linear recomendada
    if (maxVolume - minVolume < avgVolume * 0.2) {
      suggestions.push({
        type: 'volume',
        priority: 2,
        icon: '📈',
        title: 'Adicionar progressão de volume',
        description: `Ciclo sem progressão clara. Volume varia pouco (${minVolume.toFixed(0)}-${maxVolume.toFixed(0)}km).`,
        action: 'Aumente volume gradualmente nas últimas semanas.'
      });
    }

    return suggestions;
  }

  /**
   * Sugestões de zonas
   */
  static _zoneSuggestions(cycle) {
    const suggestions = [];
    const zones = {};

    cycle.semanas.forEach(w => {
      w.treinos.forEach(t => {
        const zone = t.zona || 'Recuperação';
        zones[zone] = (zones[zone] || 0) + (parseFloat(t.km) || 0);
      });
    });

    const totalKm = Object.values(zones).reduce((a, b) => a + b, 0);
    const z2Percent = ((zones['Z2'] || 0) / totalKm) * 100;
    const z4Percent = ((zones['Z4'] || 0) / totalKm) * 100;

    if (z2Percent < 40) {
      suggestions.push({
        type: 'zone',
        priority: 3,
        icon: '🏃',
        title: 'Pouco treino de fundo (Z2)',
        description: `Z2 é apenas ${z2Percent.toFixed(0)}% do volume. Recomendado: 40-60%.`,
        action: 'Aumente treinos de fundo aeróbio (Z2) para construir base.'
      });
    }

    if (z4Percent > 25) {
      suggestions.push({
        type: 'zone',
        priority: 3,
        icon: '⚡',
        title: 'Muito trabalho de intensidade (Z4)',
        description: `Z4 é ${z4Percent.toFixed(0)}% do volume. Risco de queimação.`,
        action: 'Reduza treinos Z4/Z5 ou aumente treinos de recuperação.'
      });
    }

    if (!zones['Recuperação'] || zones['Recuperação'] < totalKm * 0.1) {
      suggestions.push({
        type: 'zone',
        priority: 2,
        icon: '😴',
        title: 'Falta recuperação ativa',
        description: 'Pouco ou nenhum treino de recuperação (Z1).',
        action: 'Adicione 1-2 treinos de recuperação por semana.'
      });
    }

    return suggestions;
  }

  /**
   * Sugestões de progressão
   */
  static _progressionSuggestions(cycle) {
    const suggestions = [];
    const volumes = cycle.semanas.map(w =>
      w.treinos.reduce((sum, t) => sum + (parseFloat(t.km) || 0), 0)
    );

    // Verificar progressão
    let hasProgression = false;
    for (let i = 1; i < volumes.length; i++) {
      if (volumes[i] > volumes[i-1]) {
        hasProgression = true;
        break;
      }
    }

    if (!hasProgression && volumes.length > 3) {
      suggestions.push({
        type: 'progression',
        priority: 2,
        icon: '📉',
        title: 'Sem progressão clara',
        description: 'Ciclo não mostra aumento de volume ao longo do tempo.',
        action: 'Considere aumentar volume gradualmente para estímulo contínuo.'
      });
    }

    // Verificar deload week
    const sorted = [...volumes].sort((a, b) => a - b);
    const minVolume = sorted[0];
    const deloadWeeks = volumes.filter(v => v <= minVolume * 1.1).length;

    if (deloadWeeks === 0) {
      suggestions.push({
        type: 'progression',
        priority: 1,
        icon: '🔄',
        title: 'Adicionar semana de redução',
        description: 'Ciclo sem semanas de recuperação ativa (deload).',
        action: 'Adicione 1 semana com 30-50% do volume normal para recuperação.'
      });
    }

    return suggestions;
  }

  /**
   * Sugestões de recuperação
   */
  static _recoverySuggestions(cycle) {
    const suggestions = [];

    // Verificar dias sem treino
    const treinos = cycle.semanas.reduce((sum, w) => sum + (w.treinos?.length || 0), 0);
    const semanas = cycle.semanas.length;
    const treinosPorSemana = treinos / semanas;

    if (treinosPorSemana > 6) {
      suggestions.push({
        type: 'recovery',
        priority: 3,
        icon: '😴',
        title: 'Muitos treinos por semana',
        description: `Média de ${treinosPorSemana.toFixed(1)} treinos/semana. Alto risco de overtraining.`,
        action: 'Reduza para 4-6 treinos/semana, adicione dias de descanso.'
      });
    }

    return suggestions;
  }

  /**
   * Sugestões de variedade
   */
  static _varietySuggestions(cycle) {
    const suggestions = [];
    const tipos = new Set();

    cycle.semanas.forEach(w => {
      w.treinos.forEach(t => {
        if (t.tipo) tipos.add(t.tipo);
      });
    });

    if (tipos.size < 4) {
      suggestions.push({
        type: 'variety',
        priority: 1,
        icon: '🎯',
        title: 'Adicionar variedade de treinos',
        description: `Apenas ${tipos.size} tipos de treino. Recomendado: 5+.`,
        action: 'Adicione: Fundo, Intervalo, Progressivo, Ritmo, Recuperação.'
      });
    }

    return suggestions;
  }

  /**
   * Renderizar sugestões
   */
  static async renderSuggestions(containerId, athleteId, cycleId) {
    try {
      const container = document.getElementById(containerId);
      if (!container) throw new Error(`Container ${containerId} não encontrado`);

      const suggestions = this.generateSuggestions(athleteId, cycleId);

      if (suggestions.length === 0) {
        container.innerHTML = '<div class="suggestions-empty">✅ Ciclo otimizado! Sem sugestões.</div>';
        return;
      }

      const html = `
        <div class="suggestions-container">
          <div class="suggestions-header">
            <h3>💡 Sugestões Inteligentes (${suggestions.length})</h3>
          </div>

          <div class="suggestions-list">
            ${suggestions.map((s, idx) => `
              <div class="suggestion-card priority-${s.priority}">
                <div class="suggestion-header">
                  <span class="suggestion-icon">${s.icon}</span>
                  <h4>${s.title}</h4>
                </div>
                <p class="suggestion-desc">${s.description}</p>
                <p class="suggestion-action">💬 ${s.action}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      container.innerHTML = html;
    } catch (e) {
      console.error('Erro ao renderizar sugestões:', e);
      throw e;
    }
  }
}
