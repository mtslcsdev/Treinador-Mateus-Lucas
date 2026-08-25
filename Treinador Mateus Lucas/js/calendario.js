function toggleCalendario() {
  modoCalendario = !modoCalendario;
  const btn = document.getElementById('btnCalendario');
  if (btn) {
    btn.classList.toggle('ativo', modoCalendario);
    btn.textContent = modoCalendario ? '📋 Lista' : '📆 Calendário';
  }
  renderSemanas();
  if (!modoCalendario) {
    renderGraficoVolume();
  } else {
    document.getElementById('graficoVolume').innerHTML = '';
  }
}

function renderCalendario() {
  const container = document.getElementById('semanas');
  container.innerHTML = '';

  const dias = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];

  const wrap = document.createElement('div');
  wrap.className = 'cal-grid';

  const table = document.createElement('table');
  table.className = 'cal-table';

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.className = 'cal-header-row';
  const thLabel = document.createElement('th');
  thLabel.textContent = 'Semana';
  headerRow.appendChild(thLabel);
  dias.forEach(d => {
    const th = document.createElement('th');
    th.textContent = d;
    headerRow.appendChild(th);
  });
  const thSemData = document.createElement('th');
  thSemData.textContent = '∗';
  thSemData.title = 'Treinos sem data';
  headerRow.appendChild(thSemData);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  cicloAtual.semanas.forEach((semana, sIdx) => {
    const tr = document.createElement('tr');
    tr.className = 'cal-semana-row';

    const tdLabel = document.createElement('td');
    tdLabel.className = 'cal-semana-label';
    tdLabel.innerHTML = `
      <div class="cal-semana-nome">S${semana.semana}</div>
      ${semana.nome ? `<span class="cal-semana-sub" title="${semana.nome}">${semana.nome}</span>` : ''}`;
    tr.appendChild(tdLabel);

    const porDia = Array.from({length: 7}, () => []);
    const semData = [];
    semana.treinos.forEach(t => {
      if (t.dia) {
        const dt = new Date(t.dia + 'T00:00:00');
        const dow = dt.getDay();
        const colIdx = dow === 0 ? 6 : dow - 1;
        porDia[colIdx].push(t);
      } else {
        semData.push(t);
      }
    });

    for (let d = 0; d < 7; d++) {
      const td = document.createElement('td');
      td.className = 'cal-dia-cell' + (porDia[d].length > 0 ? ' has-treino' : '');
      porDia[d].forEach(t => {
        const cfg = getTipoConfig(t.tipo);
        const mini = document.createElement('div');
        mini.className = 'cal-treino-mini';
        mini.innerHTML = `
          <div class="cal-treino-tipo">${cfg.icon} ${t.tipo || '—'}</div>
          ${t.km ? `<div class="cal-treino-meta">📏 ${parseFloat(t.km).toFixed(1)}km</div>` : ''}
          ${t.pace ? `<div class="cal-treino-meta">⚡ ${t.pace.split(' - ')[0]}</div>` : ''}`;
        td.appendChild(mini);
      });
      tr.appendChild(td);
    }

    const tdSemData = document.createElement('td');
    tdSemData.className = 'cal-dia-cell' + (semData.length > 0 ? ' has-treino' : '');
    semData.forEach(t => {
      const cfg = getTipoConfig(t.tipo);
      const mini = document.createElement('div');
      mini.className = 'cal-treino-mini';
      mini.innerHTML = `<div class="cal-treino-tipo">${cfg.icon} ${t.tipo || '—'}</div>`;
      tdSemData.appendChild(mini);
    });
    if (semData.length === 0 && semana.treinos.length === 0) {
      tdSemData.innerHTML = '<div class="cal-semana-nao-datada">vazia</div>';
    }
    tr.appendChild(tdSemData);

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  wrap.appendChild(table);
  container.appendChild(wrap);
}
