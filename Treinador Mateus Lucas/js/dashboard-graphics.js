/* ===== DASHBOARD GRAPHICS & ANALYTICS ===== */
/* Gráficos de volume, pace e progressão usando Chart.js */

class DashboardGraphics {
  constructor() {
    this.charts = {};
    this.loadChartJS();
  }

  loadChartJS() {
    // Verificar se Chart.js já está carregado
    if (typeof Chart !== 'undefined') {
      this.init();
      return;
    }

    // Carregar Chart.js dinamicamente
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js';
    script.onload = () => this.init();
    document.head.appendChild(script);
  }

  init() {
    // Inicialização completa após Chart.js estar disponível
    console.warn('Chart.js loaded, dashboard graphics ready');
  }

  async atualizarDashboardGrafico() {
    try {
      const service = getAthleteService();
      const athletes = await service.getAthletes();

      if (athletes.length === 0) {
        this.renderEmptyState();
        return;
      }

      // Gráfico de Volume Total
      this.renderVolumeChart(athletes);

      // Gráfico de Pace Médio
      this.renderPaceChart(athletes);

      // Gráfico de Progresso
      this.renderProgressChart(athletes);
    } catch (e) {
      console.error('Erro ao atualizar dashboard:', e);
    }
  }

  async atualizarAnalytics() {
    try {
      const service = getAthleteService();
      const athletes = await service.getAthletes();

      if (athletes.length === 0) {
        this.renderEmptyStateAnalytics();
        return;
      }

      // Gráfico de Comparação
      this.renderComparisonChart(athletes);

      // Gráfico de Evolução de Pace
      this.renderPaceEvolutionChart(athletes);

      // Tabela de atletas
      this.renderAthletesTable(athletes);
    } catch (e) {
      console.error('Erro ao atualizar analytics:', e);
    }
  }

  renderVolumeChart(athletes) {
    const container = document.getElementById('graficoVolumeGeral');
    if (!container) return;

    const labels = athletes.map(a => a.name || a.nome);
    const datasets = [];

    // Dados de volume por atleta
    const volumeData = athletes.map(athlete => {
      let totalKm = 0;
      if (athlete.ciclos && Array.isArray(athlete.ciclos)) {
        athlete.ciclos.forEach(ciclo => {
          if (ciclo.semanas && Array.isArray(ciclo.semanas)) {
            ciclo.semanas.forEach(semana => {
              if (semana.treinos && Array.isArray(semana.treinos)) {
                semana.treinos.forEach(treino => {
                  totalKm += parseFloat(treino.km) || 0;
                });
              }
            });
          }
        });
      }
      return totalKm.toFixed(1);
    });

    const ctx = container.innerHTML = '', container;
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Volume Total (km)',
          data: volumeData,
          backgroundColor: [
            'rgba(15, 58, 125, 0.8)',
            'rgba(26, 182, 6, 0.8)',
            'rgba(249, 115, 22, 0.8)',
          ],
          borderColor: [
            'rgba(15, 58, 125, 1)',
            'rgba(26, 182, 6, 1)',
            'rgba(249, 115, 22, 1)',
          ],
          borderWidth: 2,
          borderRadius: 8,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: 'Volume Total de Treinos (km)' }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  renderPaceChart(athletes) {
    const container = document.getElementById('graficoPaceGeral');
    if (!container) return;

    const labels = athletes.map(a => a.name || a.nome);
    const paceData = athletes.map(athlete => {
      const paces = [];
      if (athlete.ciclos && Array.isArray(athlete.ciclos)) {
        athlete.ciclos.forEach(ciclo => {
          if (ciclo.semanas && Array.isArray(ciclo.semanas)) {
            ciclo.semanas.forEach(semana => {
              if (semana.treinos && Array.isArray(semana.treinos)) {
                semana.treinos.forEach(treino => {
                  if (treino.pace) paces.push(treino.pace);
                });
              }
            });
          }
        });
      }
      // Calcular média de pace (assumindo formato MM:SS)
      return paces.length > 0 ? this.averagePace(paces) : '—';
    });

    container.innerHTML = '';
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Pace Médio (MM:SS)',
          data: paceData.map(p => p === '—' ? null : this.paceToMinutes(p)),
          borderColor: 'rgba(24, 115, 212, 1)',
          backgroundColor: 'rgba(24, 115, 212, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: 'rgba(15, 58, 125, 1)',
          pointBorderColor: 'white',
          pointBorderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: 'Pace Médio por Atleta' }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: (value) => {
                const minutes = Math.floor(value);
                const seconds = Math.round((value - minutes) * 60);
                return `${minutes}:${seconds.toString().padStart(2, '0')}`;
              }
            }
          }
        }
      }
    });
  }

  renderProgressChart(athletes) {
    const container = document.getElementById('graficoProgresso');
    if (!container) return;

    const progressData = [];
    const athleteNames = athletes.map(a => a.name || a.nome);

    athletes.forEach((athlete, idx) => {
      let cicloCount = 0;
      if (athlete.ciclos && Array.isArray(athlete.ciclos)) {
        cicloCount = athlete.ciclos.length;
      }
      progressData.push({
        label: athleteNames[idx],
        data: [cicloCount],
        backgroundColor: [
          'rgba(15, 58, 125, 0.8)',
          'rgba(26, 182, 6, 0.8)',
          'rgba(249, 115, 22, 0.8)',
        ][idx % 3],
      });
    });

    container.innerHTML = '';
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Ciclos Completados'],
        datasets: progressData
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: 'Quantidade de Ciclos por Atleta' }
        },
        scales: {
          x: { beginAtZero: true }
        }
      }
    });
  }

  renderComparisonChart(athletes) {
    const container = document.getElementById('graficoComparacao');
    if (!container) return;

    const labels = athletes.map(a => a.name || a.nome);
    const testsData = athletes.map(athlete => {
      let testCount = 0;
      if (athlete.ciclos && Array.isArray(athlete.ciclos)) {
        athlete.ciclos.forEach(ciclo => {
          if (ciclo.testes && Array.isArray(ciclo.testes)) {
            testCount += ciclo.testes.length;
          }
        });
      }
      return testCount;
    });

    container.innerHTML = '';
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    new Chart(canvas, {
      type: 'radar',
      data: {
        labels: ['Testes', 'Ciclos', 'Semanas Planejadas'],
        datasets: athletes.map((athlete, idx) => {
          let cicloCount = athlete.ciclos ? athlete.ciclos.length : 0;
          let semanaCount = 0;
          if (athlete.ciclos) {
            athlete.ciclos.forEach(c => {
              semanaCount += (c.semanas ? c.semanas.length : 0);
            });
          }
          return {
            label: athlete.name || athlete.nome,
            data: [testsData[idx], cicloCount, semanaCount],
            borderColor: ['rgba(15, 58, 125, 1)', 'rgba(26, 182, 6, 1)', 'rgba(249, 115, 22, 1)'][idx % 3],
            backgroundColor: ['rgba(15, 58, 125, 0.2)', 'rgba(26, 182, 6, 0.2)', 'rgba(249, 115, 22, 0.2)'][idx % 3],
            borderWidth: 2,
          };
        })
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: 'Comparação de Metrics' }
        },
        scales: {
          r: { beginAtZero: true }
        }
      }
    });
  }

  renderPaceEvolutionChart(athletes) {
    const container = document.getElementById('graficoPaceEvolution');
    if (!container) return;

    container.innerHTML = '';
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    const datasets = athletes.map((athlete, idx) => {
      const paces = [];
      if (athlete.ciclos && Array.isArray(athlete.ciclos)) {
        athlete.ciclos.forEach(ciclo => {
          let cicloAvgPace = null;
          const allPaces = [];
          if (ciclo.semanas && Array.isArray(ciclo.semanas)) {
            ciclo.semanas.forEach(semana => {
              if (semana.treinos && Array.isArray(semana.treinos)) {
                semana.treinos.forEach(treino => {
                  if (treino.pace) allPaces.push(treino.pace);
                });
              }
            });
          }
          if (allPaces.length > 0) {
            cicloAvgPace = this.paceToMinutes(this.averagePace(allPaces));
          }
          paces.push(cicloAvgPace);
        });
      }
      return {
        label: athlete.name || athlete.nome,
        data: paces,
        borderColor: ['rgba(15, 58, 125, 1)', 'rgba(26, 182, 6, 1)', 'rgba(249, 115, 22, 1)'][idx % 3],
        backgroundColor: ['rgba(15, 58, 125, 0.1)', 'rgba(26, 182, 6, 0.1)', 'rgba(249, 115, 22, 0.1)'][idx % 3],
        borderWidth: 2,
        tension: 0.4,
        fill: false,
      };
    });

    new Chart(canvas, {
      type: 'line',
      data: {
        labels: Array.from({ length: Math.max(...athletes.map(a => a.ciclos ? a.ciclos.length : 0)) }, (_, i) => `Ciclo ${i + 1}`),
        datasets
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: 'Evolução de Pace por Ciclo' }
        },
        scales: {
          y: {
            ticks: {
              callback: (value) => {
                if (value === null) return '—';
                const minutes = Math.floor(value);
                const seconds = Math.round((value - minutes) * 60);
                return `${minutes}:${seconds.toString().padStart(2, '0')}`;
              }
            }
          }
        }
      }
    });
  }

  renderAthletesTable(athletes) {
    const container = document.getElementById('tabelaAtletas');
    if (!container) return;

    let html = '<div style="overflow-x: auto;"><table class="treinos-table" style="margin-top: 20px;"><thead><tr>';
    html += '<th>Atleta</th><th>Ciclos</th><th>Total KM</th><th>Pace Médio</th><th>Testes Realizados</th></tr></thead><tbody>';

    athletes.forEach(athlete => {
      let cicloCount = 0, totalKm = 0, testCount = 0;
      const paces = [];

      if (athlete.ciclos && Array.isArray(athlete.ciclos)) {
        cicloCount = athlete.ciclos.length;
        athlete.ciclos.forEach(ciclo => {
          if (ciclo.testes && Array.isArray(ciclo.testes)) {
            testCount += ciclo.testes.length;
          }
          if (ciclo.semanas && Array.isArray(ciclo.semanas)) {
            ciclo.semanas.forEach(semana => {
              if (semana.treinos && Array.isArray(semana.treinos)) {
                semana.treinos.forEach(treino => {
                  totalKm += parseFloat(treino.km) || 0;
                  if (treino.pace) paces.push(treino.pace);
                });
              }
            });
          }
        });
      }

      const avgPace = paces.length > 0 ? this.averagePace(paces) : '—';

      html += `<tr>
        <td><strong>${athlete.name || athlete.nome}</strong></td>
        <td>${cicloCount}</td>
        <td>${totalKm.toFixed(1)} km</td>
        <td>${avgPace}</td>
        <td>${testCount}</td>
      </tr>`;
    });

    html += '</tbody></table></div>';
    container.innerHTML = html;
  }

  renderEmptyState() {
    const container = document.getElementById('dashboardContent');
    if (container) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <p style="font-size: 16px; color: var(--text-secondary);">📊 Nenhum dado disponível ainda</p>
          <p style="color: var(--text-muted);">Adicione atletas e ciclos para começar a acompanhar o progresso</p>
        </div>
      `;
    }
  }

  renderEmptyStateAnalytics() {
    const container = document.getElementById('analyticsContent');
    if (container) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <p style="font-size: 16px; color: var(--text-secondary);">📈 Nenhum dado para análise</p>
          <p style="color: var(--text-muted);">Registre treinos e testes para visualizar análises</p>
        </div>
      `;
    }
  }

  // Utilitários
  paceToMinutes(pace) {
    if (!pace || pace === '—') return null;
    const parts = pace.split(':');
    return parseInt(parts[0]) + parseInt(parts[1]) / 60;
  }

  averagePace(paces) {
    if (paces.length === 0) return '—';
    const totalSeconds = paces.reduce((sum, pace) => {
      const parts = pace.split(':');
      return sum + (parseInt(parts[0]) * 60 + parseInt(parts[1]));
    }, 0);
    const avgSeconds = Math.round(totalSeconds / paces.length);
    const minutes = Math.floor(avgSeconds / 60);
    const seconds = avgSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

// Instância global
let dashboardGraphics;

// Inicializar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    dashboardGraphics = new DashboardGraphics();
  });
} else {
  dashboardGraphics = new DashboardGraphics();
}

// Funções globais para navegação
function atualizarDashboardGrafico() {
  if (dashboardGraphics) {
    dashboardGraphics.atualizarDashboardGrafico();
  }
}

function atualizarAnalytics() {
  if (dashboardGraphics) {
    dashboardGraphics.atualizarAnalytics();
  }
}
