/* ================= DASHBOARD.JS - Dashboard Ciclo ================= */

function renderDashboardCiclo() {
  const el = document.getElementById('dashboardCiclo');
  if (!el || !cicloAtual) { if (el) el.innerHTML = ''; return; }

  const stats = calcularStatsCiclo();

  el.innerHTML = `
    <div class="dashboard-container">
      <div class="dashboard-titulo">📊 Dashboard do Ciclo</div>

      <div class="dashboard-grid">
        <!-- Total Volume -->
        <div class="dashboard-card">
          <div class="dashboard-card-icon">📏</div>
          <div class="dashboard-card-content">
            <div class="dashboard-card-label">Volume Total</div>
            <div class="dashboard-card-valor">${stats.totalKm.toFixed(1)} <span style="font-size:12px;color:var(--text-muted);">km</span></div>
            <div class="dashboard-card-meta">${stats.mediaKmSemana.toFixed(1)} km/semana</div>
          </div>
        </div>

        <!-- Distribuição de Fases -->
        <div class="dashboard-card">
          <div class="dashboard-card-icon">🎯</div>
          <div class="dashboard-card-content">
            <div class="dashboard-card-label">Distribuição Fases</div>
            <div class="dashboard-card-valor">${stats.treinos.total}</div>
            <div class="dashboard-card-meta">
              <span style="color:#15803d;">Base: ${stats.treinos.base}</span> ·
              <span style="color:#92400e;">Esp: ${stats.treinos.especifico}</span> ·
              <span style="color:#991b1b;">Pol: ${stats.treinos.polimento}</span>
            </div>
          </div>
        </div>

        <!-- Feedback Média -->
        <div class="dashboard-card">
          <div class="dashboard-card-icon">💬</div>
          <div class="dashboard-card-content">
            <div class="dashboard-card-label">Feedback Médio</div>
            <div class="dashboard-card-valor">${stats.feedbackIcon}</div>
            <div class="dashboard-card-meta">${stats.feedbackTexto}</div>
          </div>
        </div>

        <!-- Prova Alvo -->
        <div class="dashboard-card">
          <div class="dashboard-card-icon">🏁</div>
          <div class="dashboard-card-content">
            <div class="dashboard-card-label">Prova Alvo</div>
            <div class="dashboard-card-valor">${stats.provaTexto}</div>
            <div class="dashboard-card-meta">${stats.provaMeta}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function calcularStatsCiclo() {
  const stats = {
    totalKm: 0,
    treinos: { total: 0, base: 0, especifico: 0, polimento: 0 },
    feedbacks: [],
    provaTexto: 'Não definida',
    provaMeta: '—'
  };

  if (!cicloAtual?.semanas) return stats;

  cicloAtual.semanas.forEach(semana => {
    if (!semana.treinos) return;
    semana.treinos.forEach(treino => {
      // Volume
      const kmManual = parseFloat(treino.km) || 0;
      const kmBlocos = (treino.blocos && treino.blocos.length) ? calcularDistanciaTotalTreino(treino.blocos) : 0;
      stats.totalKm += kmManual || kmBlocos;

      // Contagem de fases
      stats.treinos.total++;
      if (treino.fase === 'Base') stats.treinos.base++;
      else if (treino.fase === 'Específico') stats.treinos.especifico++;
      else if (treino.fase === 'Polimento') stats.treinos.polimento++;

      // Feedback
      if (treino.feedback?.sensacao) {
        stats.feedbacks.push(treino.feedback.sensacao);
      }
    });
  });

  // Calcular média de km por semana
  stats.mediaKmSemana = cicloAtual.semanas.length > 0 ? stats.totalKm / cicloAtual.semanas.length : 0;

  // Feedback dominante
  if (stats.feedbacks.length > 0) {
    const fbMap = { 'Muito Fácil': 1, 'Fácil': 2, 'Normal': 3, 'Difícil': 4, 'Muito Difícil': 5 };
    const fbIcons = { 'Muito Fácil': '😀', 'Fácil': '🙂', 'Normal': '😐', 'Difícil': '😓', 'Muito Difícil': '😰' };
    const media = stats.feedbacks.reduce((sum, fb) => sum + (fbMap[fb] || 0), 0) / stats.feedbacks.length;
    const chave = Object.keys(fbMap).find(k => Math.abs(fbMap[k] - media) < 0.5);
    stats.feedbackIcon = fbIcons[chave] || '💬';
    stats.feedbackTexto = chave || 'Sem dado';
    stats.feedbackTexto += ` (${stats.feedbacks.length} registros)`;
  } else {
    stats.feedbackIcon = '—';
    stats.feedbackTexto = 'Sem feedback registrado';
  }

  // Prova alvo
  if (cicloAtual.prova?.nome) {
    stats.provaTexto = sanitizeHTML(cicloAtual.prova.nome);
    if (cicloAtual.prova.distancia) {
      stats.provaMeta = cicloAtual.prova.distancia;
    }
  }

  return stats;
}
