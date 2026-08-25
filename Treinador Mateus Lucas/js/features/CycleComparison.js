/* ===== COMPARAÇÃO DE CICLOS ===== */

class CycleComparison {
  /**
   * Comparar 2 ciclos
   */
  static compareCycles(athleteId, cycleId1, cycleId2) {
    try {
      const storage = getStorageEngine();
      const athlete = storage.getAthleteSync(athleteId);

      if (!athlete) throw new Error('Atleta não encontrado');

      const cycle1 = athlete.ciclos.find(c => c.id === cycleId1);
      const cycle2 = athlete.ciclos.find(c => c.id === cycleId2);

      if (!cycle1 || !cycle2) throw new Error('Um ou ambos ciclos não encontrados');

      return {
        cycle1: this._extractStats(cycle1),
        cycle2: this._extractStats(cycle2),
        comparison: this._compareStats(
          this._extractStats(cycle1),
          this._extractStats(cycle2)
        )
      };
    } catch (e) {
      console.error('Erro ao comparar ciclos:', e);
      throw e;
    }
  }

  /**
   * Extrair estatísticas de um ciclo
   */
  static _extractStats(cycle) {
    const totalKm = cycle.semanas?.reduce((sum, w) =>
      sum + (w.treinos?.reduce((s, t) => s + (parseFloat(t.km) || 0), 0) || 0), 0
    ) || 0;

    const totalTreinos = cycle.semanas?.reduce((sum, w) =>
      sum + (w.treinos?.length || 0), 0
    ) || 0;

    const zonas = {};
    cycle.semanas?.forEach(week => {
      week.treinos?.forEach(t => {
        const zone = t.zona || 'Recuperação';
        zonas[zone] = (zonas[zone] || 0) + (parseFloat(t.km) || 0);
      });
    });

    return {
      nome: cycle.nome || cycle.name,
      id: cycle.id,
      semanas: cycle.semanas?.length || 0,
      treinos: totalTreinos,
      totalKm: parseFloat(totalKm.toFixed(1)),
      kmMedia: parseFloat((totalKm / (cycle.semanas?.length || 1)).toFixed(1)),
      zonas,
      prova: cycle.prova?.data || null
    };
  }

  /**
   * Comparar estatísticas
   */
  static _compareStats(stats1, stats2) {
    const compare = (val1, val2) => {
      if (val1 === val2) return { diff: 0, percent: 0, symbol: '=' };
      const diff = val2 - val1;
      const percent = ((diff / val1) * 100).toFixed(1);
      const symbol = diff > 0 ? '↑' : '↓';
      return { diff: Math.abs(diff), percent, symbol };
    };

    return {
      semanas: compare(stats1.semanas, stats2.semanas),
      treinos: compare(stats1.treinos, stats2.treinos),
      totalKm: compare(stats1.totalKm, stats2.totalKm),
      kmMedia: compare(stats1.kmMedia, stats2.kmMedia)
    };
  }

  /**
   * Renderizar comparação visual
   */
  static async renderComparison(containerId, athleteId, cycleId1, cycleId2) {
    try {
      const container = document.getElementById(containerId);
      if (!container) throw new Error(`Container ${containerId} não encontrado`);

      const comparison = this.compareCycles(athleteId, cycleId1, cycleId2);
      const c1 = comparison.cycle1;
      const c2 = comparison.cycle2;
      const comp = comparison.comparison;

      const html = `
        <div class="comparison-container">
          <div class="comparison-header">
            <h3>🔄 Comparação de Ciclos</h3>
          </div>

          <!-- CARDS COMPARAÇÃO -->
          <div class="comparison-grid">
            <div class="comparison-card">
              <h4>${c1.nome}</h4>
              <div class="comparison-stats">
                <div class="stat-row">
                  <span class="label">Semanas:</span>
                  <span class="value">${c1.semanas}</span>
                </div>
                <div class="stat-row">
                  <span class="label">Treinos:</span>
                  <span class="value">${c1.treinos}</span>
                </div>
                <div class="stat-row">
                  <span class="label">Total KM:</span>
                  <span class="value">${c1.totalKm}</span>
                </div>
                <div class="stat-row">
                  <span class="label">Média/sem:</span>
                  <span class="value">${c1.kmMedia}</span>
                </div>
              </div>
            </div>

            <!-- COMPARAÇÃO MEIO -->
            <div class="comparison-middle">
              <div class="comparison-diff">
                <div class="diff-item">
                  <span class="diff-label">Semanas</span>
                  <span class="diff-value ${comp.semanas.symbol === '↑' ? 'positive' : 'negative'}">
                    ${comp.semanas.symbol} ${comp.semanas.diff}
                  </span>
                </div>
                <div class="diff-item">
                  <span class="diff-label">Treinos</span>
                  <span class="diff-value ${comp.treinos.symbol === '↑' ? 'positive' : 'negative'}">
                    ${comp.treinos.symbol} ${comp.treinos.diff}
                  </span>
                </div>
                <div class="diff-item">
                  <span class="diff-label">Total KM</span>
                  <span class="diff-value ${comp.totalKm.symbol === '↑' ? 'positive' : 'negative'}">
                    ${comp.totalKm.symbol} ${comp.totalKm.diff}
                  </span>
                </div>
                <div class="diff-item">
                  <span class="diff-label">Média</span>
                  <span class="diff-value ${comp.kmMedia.symbol === '↑' ? 'positive' : 'negative'}">
                    ${comp.kmMedia.symbol} ${comp.kmMedia.diff}
                  </span>
                </div>
              </div>
            </div>

            <div class="comparison-card">
              <h4>${c2.nome}</h4>
              <div class="comparison-stats">
                <div class="stat-row">
                  <span class="label">Semanas:</span>
                  <span class="value">${c2.semanas}</span>
                </div>
                <div class="stat-row">
                  <span class="label">Treinos:</span>
                  <span class="value">${c2.treinos}</span>
                </div>
                <div class="stat-row">
                  <span class="label">Total KM:</span>
                  <span class="value">${c2.totalKm}</span>
                </div>
                <div class="stat-row">
                  <span class="label">Média/sem:</span>
                  <span class="value">${c2.kmMedia}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- DISTRIBUIÇÃO ZONAS -->
          <div class="zones-comparison">
            <h4>Distribuição de Zonas</h4>
            <div class="zones-row">
              <div class="zone-column">
                <h5>${c1.nome}</h5>
                ${this._renderZones(c1.zonas)}
              </div>
              <div class="zone-column">
                <h5>${c2.nome}</h5>
                ${this._renderZones(c2.zonas)}
              </div>
            </div>
          </div>
        </div>
      `;

      container.innerHTML = html;
    } catch (e) {
      console.error('Erro ao renderizar comparação:', e);
      throw e;
    }
  }

  /**
   * Renderizar zonas em mini gráfico
   */
  static _renderZones(zones) {
    const totalKm = Object.values(zones).reduce((a, b) => a + b, 0);
    if (totalKm === 0) return '<p style="color: var(--text-muted); font-size: 12px;">Sem dados</p>';

    const colors = {
      'Z1': '#16a34a',
      'Z2': '#0891b2',
      'Z3': '#ca8a04',
      'Z4': '#ea580c',
      'Z5': '#dc2626',
      'Recuperação': '#6b7280'
    };

    return `
      <div class="zones-bars">
        ${Object.entries(zones).map(([zone, km]) => {
          const percent = ((km / totalKm) * 100).toFixed(0);
          return `
            <div class="zone-bar-item">
              <span class="zone-name">${zone}</span>
              <div class="zone-bar" style="background: ${colors[zone] || '#999'}; width: ${percent}%;"></div>
              <span class="zone-value">${km.toFixed(0)}km</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
}
