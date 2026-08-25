/* ===== CYCLE VALIDATOR - VALIDADOR DE CICLO ===== */

class CycleValidator {
  /**
   * Validate entire cycle and return issues
   */
  static validateCycle(athleteId, cycleId) {
    try {
      const storage = getStorageEngine();
      const athlete = storage.getAthleteSync(athleteId);
      const cycle = athlete.ciclos.find(c => c.id === cycleId);

      if (!cycle) throw new Error('Cycle not found');

      const issues = [];
      const warnings = [];
      const tips = [];

      // Validate structure
      if (!cycle.semanas || cycle.semanas.length === 0) {
        issues.push('Ciclo sem semanas');
      }

      // Analyze each week
      cycle.semanas.forEach((week, idx) => {
        const weekIssues = this._validateWeek(week, idx, cycle.semanas);
        issues.push(...weekIssues.issues);
        warnings.push(...weekIssues.warnings);
        tips.push(...weekIssues.tips);
      });

      // Analyze overall structure
      const overallIssues = this._validateCycleStructure(cycle.semanas);
      issues.push(...overallIssues.issues);
      warnings.push(...overallIssues.warnings);
      tips.push(...overallIssues.tips);

      // Validate zones
      const zoneIssues = this._validateZoneDistribution(cycle.semanas);
      warnings.push(...zoneIssues.warnings);
      tips.push(...zoneIssues.tips);

      return {
        isValid: issues.length === 0,
        issues: [...new Set(issues)],
        warnings: [...new Set(warnings)],
        tips: [...new Set(tips)],
        score: this._calculateScore(issues, warnings),
        summary: this._generateSummary(cycle.semanas)
      };
    } catch (e) {
      console.error('Validation error:', e);
      return {
        isValid: false,
        issues: [e.message],
        warnings: [],
        tips: [],
        score: 0,
        summary: null
      };
    }
  }

  /**
   * Validate individual week
   */
  static _validateWeek(week, idx, allWeeks) {
    const issues = [];
    const warnings = [];
    const tips = [];

    if (!week.treinos || week.treinos.length === 0) {
      warnings.push(`Semana ${idx + 1}: Sem treinos`);
      return { issues, warnings, tips };
    }

    const totalKm = week.treinos.reduce((sum, t) => sum + (parseFloat(t.km) || 0), 0);
    const weekNum = idx + 1;

    // Check volume
    if (totalKm > 80) {
      issues.push(`Semana ${weekNum}: Volume muito alto (${totalKm}km)`);
    } else if (totalKm > 60) {
      warnings.push(`Semana ${weekNum}: Volume elevado (${totalKm}km)`);
    }

    if (totalKm < 10 && idx > 0 && idx < allWeeks.length - 1) {
      warnings.push(`Semana ${weekNum}: Volume baixo (${totalKm}km)`);
    }

    // Check variety
    const zones = week.treinos
      .map(t => t.zona)
      .filter(z => z && z !== 'Recuperação');
    const uniqueZones = new Set(zones);

    if (uniqueZones.size === 0) {
      warnings.push(`Semana ${weekNum}: Falta variedade de zonas`);
    }

    // Check recovery days
    const recoveryDays = week.treinos.filter(t => t.zona === 'Recuperação' || (parseFloat(t.km) || 0) < 5).length;
    if (recoveryDays === 0 && weekNum > 2 && weekNum < allWeeks.length - 1) {
      tips.push(`Semana ${weekNum}: Considere adicionar dias de recuperação`);
    }

    // Check workout count
    if (week.treinos.length > 7) {
      issues.push(`Semana ${weekNum}: Muitos treinos (${week.treinos.length})`);
    } else if (week.treinos.length < 3) {
      warnings.push(`Semana ${weekNum}: Poucos treinos (${week.treinos.length})`);
    }

    return { issues, warnings, tips };
  }

  /**
   * Validate overall cycle structure
   */
  static _validateCycleStructure(weeks) {
    const issues = [];
    const warnings = [];
    const tips = [];

    if (weeks.length < 3) {
      issues.push('Ciclo muito curto (menos de 3 semanas)');
    } else if (weeks.length > 20) {
      issues.push('Ciclo muito longo (mais de 20 semanas)');
    }

    // Check if there's progression
    const volumes = weeks.map(w =>
      w.treinos.reduce((sum, t) => sum + (parseFloat(t.km) || 0), 0)
    );

    const avgFirst3 = volumes.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
    const avgLast3 = volumes.slice(-3).reduce((a, b) => a + b, 0) / 3;

    if (avgLast3 > avgFirst3 * 1.3) {
      tips.push('Ciclo tem boa progressão de volume');
    } else if (avgLast3 < avgFirst3 * 0.7) {
      warnings.push('Ciclo tem redução drástica no final (checar se é intencional)');
    }

    // Check for deload weeks
    const sortedVolumes = [...volumes].sort((a, b) => a - b);
    const minVolume = sortedVolumes[0];
    const deloadWeeks = volumes.filter(v => v <= minVolume * 1.2).length;

    if (deloadWeeks === 0) {
      tips.push('Adicionar semana de redução para recuperação');
    }

    // Check balance
    const hardWeeks = volumes.filter(v => v > 60).length;
    const totalWeeks = weeks.length;
    const hardPercentage = (hardWeeks / totalWeeks) * 100;

    if (hardPercentage > 70) {
      warnings.push('Muitas semanas pesadas (risco de overtraining)');
    }

    return { issues, warnings, tips };
  }

  /**
   * Validate zone distribution
   */
  static _validateZoneDistribution(weeks) {
    const warnings = [];
    const tips = [];

    const zoneCount = {
      'Z1': 0,
      'Z2': 0,
      'Z3': 0,
      'Z4': 0,
      'Z5': 0,
      'Recuperação': 0
    };

    let totalKm = 0;
    const zoneTotals = {
      'Z1': 0,
      'Z2': 0,
      'Z3': 0,
      'Z4': 0,
      'Z5': 0,
      'Recuperação': 0
    };

    weeks.forEach(week => {
      week.treinos.forEach(t => {
        const zone = t.zona || 'Recuperação';
        const km = parseFloat(t.km) || 0;
        zoneCount[zone] = (zoneCount[zone] || 0) + 1;
        zoneTotals[zone] = (zoneTotals[zone] || 0) + km;
        totalKm += km;
      });
    });

    // Validate distribution
    const z2Percentage = (zoneTotals['Z2'] / totalKm) * 100;
    const z4Percentage = (zoneTotals['Z4'] / totalKm) * 100;

    if (z2Percentage < 40) {
      tips.push(`Aumentar volume Z2 (aeróbio fácil): ${z2Percentage.toFixed(0)}%`);
    }

    if (z4Percentage > 25) {
      warnings.push(`Volume Z4 alto: ${z4Percentage.toFixed(0)}% (risco de burnout)`);
    }

    if (zoneTotals['Recuperação'] === 0) {
      tips.push('Adicionar treinos de recuperação (Z1)');
    }

    return { warnings, tips };
  }

  /**
   * Calculate validation score (0-100)
   */
  static _calculateScore(issues, warnings) {
    let score = 100;
    score -= issues.length * 20;
    score -= warnings.length * 5;
    return Math.max(0, score);
  }

  /**
   * Generate cycle summary
   */
  static _generateSummary(weeks) {
    const stats = {
      totalWeeks: weeks.length,
      totalWorkouts: weeks.reduce((sum, w) => sum + (w.treinos?.length || 0), 0),
      totalKm: weeks.reduce((sum, w) =>
        sum + (w.treinos?.reduce((s, t) => s + (parseFloat(t.km) || 0), 0) || 0), 0
      ),
      avgKmPerWeek: 0,
      zones: {}
    };

    stats.avgKmPerWeek = stats.totalKm / stats.totalWeeks;

    // Calculate zones
    const zones = {};
    weeks.forEach(week => {
      week.treinos?.forEach(t => {
        const zone = t.zona || 'Recuperação';
        zones[zone] = (zones[zone] || 0) + (parseFloat(t.km) || 0);
      });
    });
    stats.zones = zones;

    return stats;
  }

  /**
   * Render validator report
   */
  static async renderValidationReport(containerId, athleteId, cycleId) {
    try {
      const container = document.getElementById(containerId);
      if (!container) throw new Error(`Container ${containerId} not found`);

      const validation = this.validateCycle(athleteId, cycleId);
      const scoreColor = validation.score >= 70 ? '#16a34a' : validation.score >= 40 ? '#f59e0b' : '#dc2626';

      let html = `
        <div class="validator-report">
          <div class="validator-header">
            <h3>🔍 Validação do Ciclo</h3>
            <div class="validator-score">
              <div class="score-circle" style="background: ${scoreColor};">
                ${validation.score}
              </div>
              <span>${validation.isValid ? '✅ Ciclo válido' : '⚠️ Problemas encontrados'}</span>
            </div>
          </div>

          <!-- SUMMARY -->
          ${validation.summary ? `
            <div class="validator-summary">
              <div class="summary-stat">
                <span class="label">Semanas</span>
                <span class="value">${validation.summary.totalWeeks}</span>
              </div>
              <div class="summary-stat">
                <span class="label">Treinos</span>
                <span class="value">${validation.summary.totalWorkouts}</span>
              </div>
              <div class="summary-stat">
                <span class="label">Total KM</span>
                <span class="value">${validation.summary.totalKm.toFixed(0)}</span>
              </div>
              <div class="summary-stat">
                <span class="label">Média/Semana</span>
                <span class="value">${validation.summary.avgKmPerWeek.toFixed(0)}</span>
              </div>
            </div>

            <div class="zone-distribution">
              <h4>Distribuição de Zonas</h4>
              <div class="zone-bars">
                ${Object.entries(validation.summary.zones).map(([zone, km]) => {
                  const percentage = (km / validation.summary.totalKm) * 100;
                  const zoneColor = this._getZoneColor(zone);
                  return `
                    <div class="zone-bar-item">
                      <span class="zone-name">${zone}</span>
                      <div class="zone-bar" style="width: ${percentage}%; background: ${zoneColor};"></div>
                      <span class="zone-value">${km.toFixed(0)}km</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}

          <!-- ISSUES -->
          ${validation.issues.length > 0 ? `
            <div class="validator-section critical">
              <h4>🔴 Problemas Críticos (${validation.issues.length})</h4>
              <ul class="issue-list">
                ${validation.issues.map(issue => `<li>⚠️ ${issue}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <!-- WARNINGS -->
          ${validation.warnings.length > 0 ? `
            <div class="validator-section warning">
              <h4>🟡 Avisos (${validation.warnings.length})</h4>
              <ul class="issue-list">
                ${validation.warnings.map(w => `<li>ℹ️ ${w}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <!-- TIPS -->
          ${validation.tips.length > 0 ? `
            <div class="validator-section tip">
              <h4>💡 Sugestões (${validation.tips.length})</h4>
              <ul class="issue-list">
                ${validation.tips.map(tip => `<li>✨ ${tip}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      `;

      container.innerHTML = html;
    } catch (e) {
      console.error('Error rendering validation report:', e);
      throw e;
    }
  }

  /**
   * Get zone color
   */
  static _getZoneColor(zone) {
    const colors = {
      'Z1': '#16a34a',
      'Z2': '#0891b2',
      'Z3': '#ca8a04',
      'Z4': '#ea580c',
      'Z5': '#dc2626',
      'Recuperação': '#6b7280'
    };
    return colors[zone] || '#999';
  }
}
