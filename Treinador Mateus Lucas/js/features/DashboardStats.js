/* ===== DASHBOARD COM ESTATÍSTICAS ===== */

class DashboardStats {
  constructor() {
    this.chartInstances = {};
  }

  /**
   * Renderizar dashboard de ciclo
   */
  async renderCycleDashboard(athleteId, cycleId) {
    try {
      const cycleService = getCycleService();
      const stats = await cycleService.getCycleStats(athleteId, cycleId);

      if (!stats) {
        console.error('Ciclo não encontrado');
        return;
      }

      const html = `
        <div class="dashboard-container">
          <h3 style="margin-bottom: 1.5rem;">📊 Estatísticas do Ciclo</h3>

          <!-- Cards de resumo -->
          <div class="dashboard-cards">
            <div class="stat-card">
              <div class="stat-card-label">Semanas</div>
              <div class="stat-card-value">${stats.totalWeeks}</div>
              <div class="stat-card-sub">semanas planejadas</div>
            </div>

            <div class="stat-card">
              <div class="stat-card-label">Treinos</div>
              <div class="stat-card-value">${stats.totalWorkouts}</div>
              <div class="stat-card-sub">sessões de treino</div>
            </div>

            <div class="stat-card">
              <div class="stat-card-label">Quilometragem</div>
              <div class="stat-card-value">${stats.totalDistance.toFixed(1)}</div>
              <div class="stat-card-sub">km totais</div>
            </div>

            <div class="stat-card">
              <div class="stat-card-label">Prova</div>
              <div class="stat-card-value">${stats.daysUntilRace !== null ? stats.daysUntilRace : '—'}</div>
              <div class="stat-card-sub">${stats.daysUntilRace !== null ? 'dias até prova' : 'sem data'}</div>
            </div>
          </div>

          <!-- Gráficos -->
          <div class="dashboard-charts">
            <div class="chart-wrapper" id="chartVolume" style="margin-bottom: 2rem;">
              <h4>📈 Volume de Treinos (Semana a Semana)</h4>
              <canvas id="volumeChart" width="400" height="150"></canvas>
            </div>

            <div class="chart-wrapper" id="chartZonas" style="margin-bottom: 2rem;">
              <h4>⚡ Distribuição de Zonas</h4>
              <canvas id="zonasChart" width="400" height="150"></canvas>
            </div>
          </div>

          <!-- Alerta de prova -->
          ${stats.daysUntilRace !== null ? `
            <div class="prova-alerta" style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: #92400e; padding: 1rem; border-radius: 8px; margin-top: 1.5rem;">
              <strong>🎯 Prova Alvo:</strong> ${stats.raceDate} (${stats.daysUntilRace} dias)
            </div>
          ` : ''}
        </div>
      `;

      const container = document.getElementById('dashboardCiclo');
      if (container) {
        container.innerHTML = html;
        // Renderizar gráficos após inserir no DOM
        await this.renderGraphs(athleteId, cycleId, stats);
      }
    } catch (e) {
      console.error('Erro ao renderizar dashboard:', e);
    }
  }

  /**
   * Renderizar gráficos com Chart.js
   */
  async renderGraphs(athleteId, cycleId, stats) {
    // Carregar Chart.js se não estiver carregado
    if (typeof Chart === 'undefined') {
      await this.loadChartJS();
    }

    // Obter dados do ciclo
    const storage = getStorageEngine();
    const cycle = await storage.getCycle(athleteId, cycleId);

    if (!cycle || !cycle.semanas) return;

    // Dados de volume por semana
    const volumeData = cycle.semanas.map(semana => {
      const distancia = semana.treinos?.reduce((acc, t) => acc + (parseFloat(t.km) || 0), 0) || 0;
      return distancia;
    });

    // Dados de zonas
    const zonasCounts = {
      'Z1': 0,
      'Z2': 0,
      'Z3': 0,
      'Z4': 0,
      'Z5': 0
    };

    cycle.semanas.forEach(semana => {
      semana.treinos?.forEach(treino => {
        if (treino.zona) {
          zonasCounts[treino.zona] = (zonasCounts[treino.zona] || 0) + 1;
        }
      });
    });

    // Gráfico de Volume
    this.renderVolumeChart(cycle.semanas.map((_, i) => `Sem ${i + 1}`), volumeData);

    // Gráfico de Zonas
    this.renderZonasChart(Object.keys(zonasCounts), Object.values(zonasCounts));
  }

  /**
   * Renderizar gráfico de volume
   */
  renderVolumeChart(labels, data) {
    const ctx = document.getElementById('volumeChart');
    if (!ctx) return;

    // Destruir gráfico anterior se existir
    if (this.chartInstances.volume) {
      this.chartInstances.volume.destroy();
    }

    this.chartInstances.volume = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'km por semana',
          data,
          backgroundColor: [
            '#1a56db', '#0ea5e9', '#06b6d4', '#14b8a6', '#10b981',
            '#84cc16', '#eab308', '#f59e0b', '#f97316', '#ef4444'
          ].slice(0, labels.length),
          borderRadius: 4,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => value + ' km'
            }
          }
        }
      }
    });
  }

  /**
   * Renderizar gráfico de zonas
   */
  renderZonasChart(labels, data) {
    const ctx = document.getElementById('zonasChart');
    if (!ctx) return;

    // Destruir gráfico anterior se existir
    if (this.chartInstances.zonas) {
      this.chartInstances.zonas.destroy();
    }

    const colors = {
      'Z1': '#16a34a', // Verde
      'Z2': '#0891b2', // Azul
      'Z3': '#ca8a04', // Amarelo
      'Z4': '#ea580c', // Laranja
      'Z5': '#dc2626'  // Vermelho
    };

    this.chartInstances.zonas = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: labels.map(z => colors[z] || '#999'),
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    });
  }

  /**
   * Carregar Chart.js via CDN
   */
  loadChartJS() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js@3/dist/chart.min.js';
      script.onload = resolve;
      script.onerror = () => {
        console.error('Erro ao carregar Chart.js');
        reject(new Error('Chart.js não carregou'));
      };
      document.head.appendChild(script);
    });
  }

  /**
   * Destruir todos os gráficos
   */
  destroy() {
    Object.values(this.chartInstances).forEach(chart => {
      if (chart && typeof chart.destroy === 'function') {
        chart.destroy();
      }
    });
    this.chartInstances = {};
  }
}

// Instância global
let dashboardStats = null;

function getDashboardStats() {
  if (!dashboardStats) {
    dashboardStats = new DashboardStats();
  }
  return dashboardStats;
}
