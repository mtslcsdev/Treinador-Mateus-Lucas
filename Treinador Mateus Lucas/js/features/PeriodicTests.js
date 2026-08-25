/* ===== SISTEMA DE TESTES PERIÓDICOS ===== */

class PeriodicTests {
  /**
   * Registrar novo teste de pace
   */
  static registerTest(athleteId, distance, time, notes = '') {
    if (!athleteId || !distance || !time) {
      throw new Error('Dados obrigatórios: athleteId, distance, time');
    }

    try {
      const storage = getStorageEngine();
      const athlete = storage.getAthlete(athleteId);

      if (!athlete) throw new Error('Atleta não encontrado');

      // Calcular pace (min/km)
      const distKm = parseFloat(distance);
      const timeMin = this.timeToMinutes(time);
      const paceMin = timeMin / distKm;
      const paceFormatted = this.minutesToPaceFormat(paceMin);

      const test = {
        id: generateUUID(),
        data: new Date().toISOString().split('T')[0],
        distancia: distance + 'km',
        tempo: time,
        pace: paceFormatted,
        paceSegundos: Math.round(paceMin * 60),
        notas: notes
      };

      if (!athlete.historicoPaces) {
        athlete.historicoPaces = [];
      }

      athlete.historicoPaces.push(test);

      // Manter apenas últimos 20 testes
      if (athlete.historicoPaces.length > 20) {
        athlete.historicoPaces = athlete.historicoPaces.slice(-20);
      }

      storage.updateAthlete(athleteId, athlete);

      return test;
    } catch (e) {
      console.error('Erro ao registrar teste:', e);
      throw e;
    }
  }

  /**
   * Obter histórico de testes
   */
  static getTestHistory(athleteId) {
    try {
      const storage = getStorageEngine();
      const athlete = storage.getAthlete(athleteId);

      if (!athlete) return [];

      return athlete.historicoPaces || [];
    } catch (e) {
      console.error('Erro ao obter histórico de testes:', e);
      return [];
    }
  }

  /**
   * Obter último teste
   */
  static getLatestTest(athleteId) {
    const history = this.getTestHistory(athleteId);
    return history.length > 0 ? history[history.length - 1] : null;
  }

  /**
   * Calcular evolução (comparar com anterior)
   */
  static getTestEvolution(athleteId) {
    const history = this.getTestHistory(athleteId);

    if (history.length < 2) return null;

    const latest = history[history.length - 1];
    const previous = history[history.length - 2];

    const improvementSecs = previous.paceSegundos - latest.paceSegundos;
    const improvementPercent = (improvementSecs / previous.paceSegundos * 100).toFixed(1);

    return {
      previous: previous.pace,
      latest: latest.pace,
      improvementSecs,
      improvementPercent,
      improved: improvementSecs > 0
    };
  }

  /**
   * Obter alerta se teste desatualizado
   */
  static getTestAlert(athleteId) {
    const latest = this.getLatestTest(athleteId);

    if (!latest) {
      return {
        status: 'nao-testado',
        message: '⚠️ Nenhum teste registrado ainda',
        severity: 'warning'
      };
    }

    const testDate = new Date(latest.data);
    const today = new Date();
    const daysSinceTest = Math.floor((today - testDate) / (1000 * 60 * 60 * 24));

    if (daysSinceTest > 30) {
      return {
        status: 'desatualizado',
        message: `⚠️ Teste desatualizado há ${daysSinceTest} dias`,
        daysSince: daysSinceTest,
        severity: 'warning'
      };
    }

    return {
      status: 'atualizado',
      message: `✅ Teste de há ${daysSinceTest} dia(s)`,
      daysSince: daysSinceTest,
      severity: 'success'
    };
  }

  /**
   * Renderizar painel de testes
   */
  static renderTestPanel(athleteId, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const history = this.getTestHistory(athleteId);
    const alert = this.getTestAlert(athleteId);
    const evolution = this.getTestEvolution(athleteId);

    let html = `
      <div class="test-panel" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;">
        <h3 style="margin-top: 0; margin-bottom: 1rem;">⏱️ Testes Periódicos</h3>

        <!-- Alerta -->
        <div class="test-alert" style="background: ${alert.severity === 'warning' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(22, 163, 74, 0.15)'};
             color: ${alert.severity === 'warning' ? '#92400e' : '#15803d'};
             padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-weight: 500;">
          ${alert.message}
        </div>

        <!-- Último teste e evolução -->
        ${history.length > 0 ? `
          <div class="test-latest" style="background: var(--bg-secondary); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div>
                <span style="font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 600;">Última prova</span>
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">${history[history.length - 1].pace}</div>
                <span style="font-size: 0.8rem; color: var(--text-muted);">${history[history.length - 1].distancia} • ${history[history.length - 1].data}</span>
              </div>
              ${evolution ? `
                <div>
                  <span style="font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 600;">Melhoria</span>
                  <div style="font-size: 1.5rem; font-weight: 700; color: ${evolution.improved ? '#16a34a' : '#dc2626'};">
                    ${evolution.improved ? '↑' : '↓'} ${Math.abs(evolution.improvementSecs)}s
                  </div>
                  <span style="font-size: 0.8rem; color: var(--text-muted);">${evolution.improvementPercent}% desde última</span>
                </div>
              ` : ''}
            </div>
            ${history[history.length - 1].notas ? `
              <div style="font-size: 0.85rem; color: var(--text-secondary); background: rgba(0,0,0,0.1); padding: 0.5rem; border-radius: 4px;">
                📝 ${history[history.length - 1].notas}
              </div>
            ` : ''}
          </div>
        ` : ''}

        <!-- Histórico -->
        ${history.length > 0 ? `
          <div class="test-history">
            <h4 style="margin: 1rem 0 0.5rem 0; font-size: 0.95rem;">Histórico de testes</h4>
            <div style="max-height: 300px; overflow-y: auto;">
              <table style="width: 100%; font-size: 0.85rem; border-collapse: collapse;">
                <thead>
                  <tr style="border-bottom: 1px solid var(--border-color);">
                    <th style="text-align: left; padding: 0.5rem; color: var(--text-secondary); font-weight: 600;">Data</th>
                    <th style="text-align: center; padding: 0.5rem; color: var(--text-secondary); font-weight: 600;">Distância</th>
                    <th style="text-align: right; padding: 0.5rem; color: var(--text-secondary); font-weight: 600;">Pace</th>
                  </tr>
                </thead>
                <tbody>
                  ${history.slice().reverse().map((test, idx) => `
                    <tr style="border-bottom: 1px solid var(--border-color); ${idx % 2 === 0 ? `background: rgba(0,0,0,0.02);` : ''}">
                      <td style="padding: 0.75rem 0.5rem;">${test.data}</td>
                      <td style="text-align: center; padding: 0.75rem 0.5rem;">${test.distancia}</td>
                      <td style="text-align: right; padding: 0.75rem 0.5rem; font-weight: 600; color: var(--primary);">${test.pace}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}

        <!-- Formulário para novo teste -->
        <button id="btnNovoTeste" class="btn-header" onclick="toggleNovoTesteForm()" style="margin-top: 1rem; width: 100%; background: var(--primary); color: white; border: none;">
          + Registrar Novo Teste
        </button>

        <div id="formNovoTeste" style="display: none; margin-top: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: 8px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="display: block; font-size: 0.85rem; margin-bottom: 0.25rem; font-weight: 600;">Distância</label>
              <input type="text" id="inputTesteDist" placeholder="3km" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 4px; box-sizing: border-box;">
            </div>
            <div>
              <label style="display: block; font-size: 0.85rem; margin-bottom: 0.25rem; font-weight: 600;">Tempo (MM:SS)</label>
              <input type="text" id="inputTesteTempo" placeholder="18:30" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 4px; box-sizing: border-box;">
            </div>
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.85rem; margin-bottom: 0.25rem; font-weight: 600;">Notas (opcional)</label>
            <input type="text" id="inputTesteNotas" placeholder="Exemplo: Teste em dia frio, manhã" style="width: 100%; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 4px; box-sizing: border-box;">
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button onclick="saveNovoTeste('${athleteId}')" class="btn-header" style="flex: 1; background: var(--success); color: white; border: none;">Salvar</button>
            <button onclick="toggleNovoTesteForm()" class="btn-header" style="flex: 1; background: var(--text-muted); color: white; border: none;">Cancelar</button>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  /**
   * Converter tempo para minutos
   */
  static timeToMinutes(timeStr) {
    const parts = timeStr.split(':').map(Number);
    if (parts.length === 2) {
      return parts[0] + parts[1] / 60;
    } else if (parts.length === 3) {
      return parts[0] * 60 + parts[1] + parts[2] / 60;
    }
    return 0;
  }

  /**
   * Converter minutos para formato MM:SS
   */
  static minutesToPaceFormat(paceMin) {
    const min = Math.floor(paceMin);
    const sec = Math.round((paceMin - min) * 60);
    return `${min}:${String(sec).padStart(2, '0')}/km`;
  }
}

// Funções globais para UI
function toggleNovoTesteForm() {
  const form = document.getElementById('formNovoTeste');
  if (form) {
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
  }
}

function saveNovoTeste(athleteId) {
  try {
    const dist = document.getElementById('inputTesteDist').value;
    const tempo = document.getElementById('inputTesteTempo').value;
    const notas = document.getElementById('inputTesteNotas').value;

    if (!dist || !tempo) {
      showToast('Preencha distância e tempo', 'erro');
      return;
    }

    const test = PeriodicTests.registerTest(athleteId, dist, tempo, notas);
    showToast(`✅ Teste registrado: ${test.pace}`, 'sucesso');

    // Atualizar painel
    const panelId = `testePanel_${athleteId}`;
    PeriodicTests.renderTestPanel(athleteId, panelId);
  } catch (e) {
    showToast(`Erro: ${e.message}`, 'erro');
  }
}
