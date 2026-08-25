/* ===== CYCLE TEMPLATES - TEMPLATES DE CICLO ===== */

class CycleTemplates {
  /**
   * Copy entire cycle with new name and optional adjustments
   */
  static copyCycle(athleteId, sourceCycleId, newCycleName, adjustVolume = 100) {
    try {
      const storage = getStorageEngine();
      const athlete = storage.getAthleteSync(athleteId);
      const sourceCycle = athlete.ciclos.find(c => c.id === sourceCycleId);

      if (!sourceCycle) throw new Error('Source cycle not found');

      // Deep clone cycle
      const newCycle = JSON.parse(JSON.stringify(sourceCycle));
      newCycle.id = `ciclo_${Date.now()}`;
      newCycle.nome = newCycleName;
      newCycle.created_at = new Date().toISOString();
      newCycle.created_from = sourceCycleId;

      // Apply volume adjustment
      if (adjustVolume !== 100) {
        newCycle.semanas.forEach(week => {
          week.treinos.forEach(workout => {
            const km = parseFloat(workout.km) || 0;
            workout.km = (km * adjustVolume / 100).toFixed(1);
          });
        });
      }

      // Clear sensitive data
      newCycle.prova = null;
      newCycle.semanas.forEach(week => {
        if (week.treinos) {
          week.treinos.forEach(t => {
            delete t.feedback;
            delete t.completed;
          });
        }
      });

      athlete.ciclos.push(newCycle);
      storage.saveData({ atletas: athlete });

      return newCycle;
    } catch (e) {
      console.error('Error copying cycle:', e);
      throw e;
    }
  }

  /**
   * Create cycle from built-in template
   */
  static createFromTemplate(athleteId, templateType, duration, name, adjustVolume = 100) {
    try {
      const template = this._getTemplate(templateType, duration);
      if (!template) throw new Error(`Template ${templateType} with duration ${duration} not found`);

      const storage = getStorageEngine();
      const athlete = storage.getAthleteSync(athleteId);

      const newCycle = {
        id: `ciclo_${Date.now()}`,
        nome: name || `${templateType} - ${duration}s`,
        semanas: JSON.parse(JSON.stringify(template.weeks)),
        created_at: new Date().toISOString(),
        created_from_template: templateType,
        prova: null
      };

      // Apply volume adjustment
      if (adjustVolume !== 100) {
        newCycle.semanas.forEach(week => {
          week.treinos.forEach(workout => {
            const km = parseFloat(workout.km) || 0;
            workout.km = (km * adjustVolume / 100).toFixed(1);
          });
        });
      }

      athlete.ciclos.push(newCycle);
      storage.saveData({ atletas: athlete });

      return newCycle;
    } catch (e) {
      console.error('Error creating from template:', e);
      throw e;
    }
  }

  /**
   * Get available templates
   */
  static getAvailableTemplates() {
    return {
      'preparatório': ['4', '8', '12'],
      'específico': ['4', '6', '8'],
      'polimento': ['2', '3', '4'],
      'manutenção': ['4', '6', '8']
    };
  }

  /**
   * Built-in template definitions
   */
  static _getTemplate(type, duration) {
    const templates = {
      'preparatório': {
        4: this._createPreparatoryTemplate(4),
        8: this._createPreparatoryTemplate(8),
        12: this._createPreparatoryTemplate(12)
      },
      'específico': {
        4: this._createSpecificTemplate(4),
        6: this._createSpecificTemplate(6),
        8: this._createSpecificTemplate(8)
      },
      'polimento': {
        2: this._createTaperingTemplate(2),
        3: this._createTaperingTemplate(3),
        4: this._createTaperingTemplate(4)
      },
      'manutenção': {
        4: this._createMaintenanceTemplate(4),
        6: this._createMaintenanceTemplate(6),
        8: this._createMaintenanceTemplate(8)
      }
    };

    return templates[type]?.[String(duration)];
  }

  /**
   * Preparatory phase template
   */
  static _createPreparatoryTemplate(weeks) {
    const template = { weeks: [] };

    for (let w = 1; w <= weeks; w++) {
      const baseKm = 10 + (w * 3);
      const treinos = [
        {
          tipo: 'Recuperação',
          km: '5',
          zona: 'Z1',
          obs: 'Recuperação ativa leve'
        },
        {
          tipo: 'Fundo',
          km: String(baseKm),
          zona: 'Z2',
          obs: 'Longo moderado'
        },
        {
          tipo: 'Fundo',
          km: String(Math.round(baseKm * 0.7)),
          zona: 'Z2',
          obs: 'Médio aeróbio'
        },
        {
          tipo: 'Qualidade',
          km: String(Math.round(baseKm * 0.6)),
          zona: 'Z3',
          obs: 'Ritmo fácil com variações'
        },
        {
          tipo: 'Fundo',
          km: String(Math.round(baseKm * 0.5)),
          zona: 'Z2',
          obs: 'Leve para recuperação'
        }
      ];

      template.weeks.push({
        semana: w,
        nome: `Semana ${w} - Preparatória`,
        treinos
      });
    }

    return template;
  }

  /**
   * Specific (intenso) phase template
   */
  static _createSpecificTemplate(weeks) {
    const template = { weeks: [] };

    for (let w = 1; w <= weeks; w++) {
      const baseKm = 15;
      const treinos = [
        {
          tipo: 'Recuperação',
          km: '4',
          zona: 'Z1',
          obs: 'Recuperação ativa'
        },
        {
          tipo: 'Longo',
          km: String(baseKm + (w * 2)),
          zona: 'Z2',
          obs: 'Longo moderado progressivo'
        },
        {
          tipo: 'Intervalo',
          km: String(baseKm),
          zona: 'Z4',
          obs: '6x1000m no ritmo de teste'
        },
        {
          tipo: 'Fundo',
          km: String(baseKm),
          zona: 'Z2',
          obs: 'Recuperação aeróbia'
        },
        {
          tipo: 'Qualidade',
          km: String(baseKm - 2),
          zona: 'Z3',
          obs: 'Trabalho de força'
        }
      ];

      template.weeks.push({
        semana: w,
        nome: `Semana ${w} - Específico`,
        treinos
      });
    }

    return template;
  }

  /**
   * Tapering phase template
   */
  static _createTaperingTemplate(weeks) {
    const template = { weeks: [] };
    const baseKm = 25;

    for (let w = 1; w <= weeks; w++) {
      const reduction = Math.pow(0.7, weeks - w);
      const treinos = [
        {
          tipo: 'Recuperação',
          km: String(Math.round(5 * reduction)),
          zona: 'Z1',
          obs: 'Recuperação leve'
        },
        {
          tipo: 'Longo',
          km: String(Math.round(baseKm * reduction)),
          zona: 'Z2',
          obs: 'Longo reduzindo'
        },
        {
          tipo: 'Qualidade',
          km: String(Math.round(10 * reduction)),
          zona: 'Z4',
          obs: '4x800m no ritmo'
        },
        {
          tipo: 'Fundo',
          km: String(Math.round(8 * reduction)),
          zona: 'Z2',
          obs: 'Leve para puxar as pernas'
        }
      ];

      template.weeks.push({
        semana: w,
        nome: `Semana ${w} - Polimento`,
        treinos
      });
    }

    return template;
  }

  /**
   * Maintenance phase template
   */
  static _createMaintenanceTemplate(weeks) {
    const template = { weeks: [] };

    for (let w = 1; w <= weeks; w++) {
      const treinos = [
        {
          tipo: 'Recuperação',
          km: '5',
          zona: 'Z1',
          obs: 'Recuperação ativa'
        },
        {
          tipo: 'Longo',
          km: '18',
          zona: 'Z2',
          obs: 'Longo steady'
        },
        {
          tipo: 'Qualidade',
          km: '12',
          zona: 'Z3',
          obs: 'Ritmo moderado com variaçõs'
        },
        {
          tipo: 'Fundo',
          km: '10',
          zona: 'Z2',
          obs: 'Médio aeróbio'
        },
        {
          tipo: 'Fundo',
          km: '8',
          zona: 'Z2',
          obs: 'Leve recuperação'
        }
      ];

      template.weeks.push({
        semana: w,
        nome: `Semana ${w} - Manutenção`,
        treinos
      });
    }

    return template;
  }

  /**
   * Render template selection modal
   */
  static async renderTemplateSelector(containerId, athleteId) {
    try {
      const container = document.getElementById(containerId);
      if (!container) throw new Error(`Container ${containerId} not found`);

      const templates = this.getAvailableTemplates();

      let html = `
        <div class="template-selector">
          <div class="template-header">
            <h3>📋 Usar Template de Ciclo</h3>
            <p>Escolha um template base e customize</p>
          </div>

          <div class="template-tabs">
      `;

      Object.entries(templates).forEach(([type, durations]) => {
        html += `
          <div class="template-tab">
            <h4>${this._getTemplateLabel(type)}</h4>
            <div class="template-buttons">
        `;
        durations.forEach(duration => {
          html += `
            <button class="btn-template" onclick="CycleTemplates.showTemplatePreview('${type}', '${duration}', '${athleteId}')">
              ${duration} semanas
            </button>
          `;
        });
        html += `
            </div>
          </div>
        `;
      });

      html += `
          </div>

          <div id="templatePreview"></div>
        </div>
      `;

      container.innerHTML = html;
    } catch (e) {
      console.error('Error rendering template selector:', e);
      throw e;
    }
  }

  /**
   * Show template preview
   */
  static async showTemplatePreview(type, duration, athleteId) {
    const template = this._getTemplate(type, duration);
    if (!template) return;

    const preview = document.getElementById('templatePreview');
    const totalKm = template.weeks.reduce((sum, w) =>
      sum + (w.treinos.reduce((s, t) => s + (parseFloat(t.km) || 0), 0) || 0), 0
    );

    const html = `
      <div class="template-preview">
        <h4>Prévia: ${this._getTemplateLabel(type)} (${duration} semanas)</h4>

        <div class="preview-stats">
          <div class="stat">
            <span class="label">Semanas</span>
            <span class="value">${duration}</span>
          </div>
          <div class="stat">
            <span class="label">Total KM</span>
            <span class="value">${totalKm.toFixed(0)}</span>
          </div>
          <div class="stat">
            <span class="label">Média/Semana</span>
            <span class="value">${(totalKm / duration).toFixed(0)}</span>
          </div>
        </div>

        <div class="preview-weeks">
          ${template.weeks.slice(0, 3).map((w, idx) => {
            const weekKm = w.treinos.reduce((s, t) => s + (parseFloat(t.km) || 0), 0);
            return `
              <div class="preview-week">
                <strong>Semana ${idx + 1}</strong>: ${weekKm.toFixed(0)}km, ${w.treinos.length} treinos
              </div>
            `;
          }).join('')}
          ${duration > 3 ? '<div class="preview-week">...</div>' : ''}
        </div>

        <div class="preview-form">
          <input type="text" id="templateName" placeholder="Nome do ciclo (ex: Prep Jan 2025)" />
          <div class="form-group">
            <label>Ajustar volume (%)</label>
            <input type="range" id="volumeAdjust" min="50" max="150" value="100" step="10" />
            <span id="volumeValue">100%</span>
          </div>

          <button class="btn-create-template" onclick="CycleTemplates.createFromTemplateUI('${type}', '${duration}', '${athleteId}')">
            ✨ Criar Ciclo do Template
          </button>
        </div>
      </div>
    `;

    preview.innerHTML = html;

    // Update volume value on change
    const volumeInput = document.getElementById('volumeAdjust');
    if (volumeInput) {
      volumeInput.addEventListener('input', (e) => {
        document.getElementById('volumeValue').textContent = e.target.value + '%';
      });
    }
  }

  /**
   * Create from template UI helper
   */
  static createFromTemplateUI(type, duration, athleteId) {
    try {
      const nameInput = document.getElementById('templateName');
      const volumeInput = document.getElementById('volumeAdjust');

      if (!nameInput.value.trim()) {
        showToast('Por favor, dê um nome ao ciclo', 'aviso');
        return;
      }

      const volume = parseFloat(volumeInput.value) || 100;
      this.createFromTemplate(athleteId, type, duration, nameInput.value, volume);
      showToast(`✅ Ciclo criado com sucesso!`, 'sucesso');
      setTimeout(() => location.reload(), 1000);
    } catch (e) {
      showToast(`Erro: ${e.message}`, 'erro');
    }
  }

  /**
   * Get template display label
   */
  static _getTemplateLabel(type) {
    const labels = {
      'preparatório': '🏗️ Preparatório',
      'específico': '⚡ Específico',
      'polimento': '✨ Polimento',
      'manutenção': '🔄 Manutenção'
    };
    return labels[type] || type;
  }
}
