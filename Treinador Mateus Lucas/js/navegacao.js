function voltarParaCiclos() {
  cicloAtual = null;
  document.getElementById("areaSemanas").classList.add("hidden");
  document.getElementById("semanas").innerHTML = "";
  document.getElementById("sumarioCiclo").style.display = "none";
  document.getElementById("filtrosCiclo").style.display = "none";
  filtroAtivo = { fase: "", busca: "" };
  carregarZonas();
  atualizarBreadcrumb();
}

function voltarParaAtletas() {
  atletaAtual = null;
  cicloAtual  = null;
  document.getElementById("areaCiclos").classList.add("hidden");
  document.getElementById("areaSemanas").classList.add("hidden");
  document.getElementById("tituloAtleta").textContent = "";
  document.getElementById("tituloCiclo").textContent  = "";
  document.getElementById("semanas").innerHTML = "";
  document.getElementById("filtrosCiclo").style.display = "none";
  document.getElementById("sumarioCiclo").style.display = "none";
  document.getElementById("containerZonas").innerHTML = "";
  document.getElementById("paceTeste5km").value = "";
  document.getElementById("historicoPaces").innerHTML = "";
  filtroAtivo = { fase: "", busca: "" };
  zonasCalculadas = null;
  renderAtletas();
  atualizarBreadcrumb();
}

function atualizarBreadcrumb() {
  const el = document.getElementById("breadcrumb");
  if (!el) return;

  if (!atletaAtual) {
    el.classList.remove("visible");
    el.innerHTML = "";
    return;
  }

  el.classList.add("visible");
  el.innerHTML = "";

  const makeBtn = (label, onclick) => {
    const btn = document.createElement("button");
    btn.className = "breadcrumb-item breadcrumb-btn";
    btn.textContent = label;
    btn.onclick = onclick;
    return btn;
  };
  const makeSep = () => { const s = document.createElement("span"); s.className = "breadcrumb-sep"; s.textContent = "›"; return s; };
  const makeCurrent = (label) => { const s = document.createElement("span"); s.className = "breadcrumb-item current"; s.textContent = label; return s; };

  el.appendChild(makeBtn("Atletas", voltarParaAtletas));

  if (cicloAtual) {
    el.appendChild(makeSep());
    el.appendChild(makeBtn(atletaAtual.nome, voltarParaCiclos));
    el.appendChild(makeSep());
    el.appendChild(makeCurrent(cicloAtual.nome));
  } else {
    el.appendChild(makeSep());
    el.appendChild(makeCurrent(atletaAtual.nome));
  }
}

function atualizarSumario() {
  if (!cicloAtual) return;

  let totalTreinos = 0, totalEspecifico = 0, totalPolimento = 0, totalKm = 0;

  cicloAtual.semanas.forEach(semana => {
    semana.treinos.forEach(treino => {
      totalTreinos++;
      if (treino.fase === "Específico") totalEspecifico++;
      else if (treino.fase === "Polimento") totalPolimento++;
      const kmManual = parseFloat(treino.km) || 0;
      const kmBlocos = (treino.blocos && treino.blocos.length) ? calcularDistanciaTotalTreino(treino.blocos) : 0;
      totalKm += kmManual || kmBlocos;
    });
  });

  document.getElementById("totalSemanas").textContent    = cicloAtual.semanas.length;
  document.getElementById("totalTreinos").textContent    = totalTreinos;
  document.getElementById("totalEspecifico").textContent = totalEspecifico;
  document.getElementById("totalPolimento").textContent  = totalPolimento;
  const kmEl = document.getElementById("totalKm");
  if (kmEl) kmEl.textContent = totalKm > 0 ? `${totalKm.toFixed(1)}` : '—';
}

function aplicarFiltros() {
  filtroAtivo.fase = document.getElementById("filtroFase").value;
  filtroAtivo.busca = document.getElementById("filtroBusca").value;

  if (cicloAtual) {
    cicloAtual.semanas.forEach((semana, index) => {
      renderTreinos(index);
    });
  }
}

function renderGraficoVolume() {
  const el = document.getElementById('graficoVolume');
  if (!el || !cicloAtual) { if (el) el.innerHTML = ''; return; }

  const semanas = cicloAtual.semanas;
  const dadosKm = semanas.map(s => {
    let km = 0;
    s.treinos.forEach(t => {
      const kmM = parseFloat(t.km) || 0;
      const kmB = (t.blocos && t.blocos.length) ? calcularDistanciaTotalTreino(t.blocos) : 0;
      km += kmM || kmB;
    });
    return { label: `S${s.semana}`, nome: s.nome || '', km };
  });

  const temDados = dadosKm.some(d => d.km > 0);
  const maxKm = Math.max(...dadosKm.map(d => d.km), 1);
  const maxH = 100;

  el.innerHTML = `
    <div class="grafico-volume-section">
      <div class="grafico-titulo">
        <span>📊 Volume por Semana</span>
        <span class="grafico-titulo-sub">${temDados ? 'em km — preencha o campo Volume (km) no treino' : 'Preencha o campo Volume (km) nos treinos para visualizar'}</span>
      </div>
      <div class="grafico-barras" id="grafico-barras-inner"></div>
    </div>
  `;

  const barrasEl = el.querySelector('#grafico-barras-inner');
  dadosKm.forEach(d => {
    const h = d.km > 0 ? Math.max(Math.round((d.km / maxKm) * maxH), 6) : 4;
    const col = document.createElement('div');
    col.className = 'grafico-barra-col';
    col.title = `${d.label}${d.nome ? ': ' + d.nome : ''} — ${d.km.toFixed(1)} km`;
    col.innerHTML = `
      <div class="grafico-barra-valor">${d.km > 0 ? d.km.toFixed(1) : ''}</div>
      <div class="grafico-barra-fill${d.km === 0 ? ' sem-dados' : ''}" style="height:${h}px;"></div>
      <div class="grafico-barra-label">${d.label}${d.nome ? '\n' + d.nome.substring(0, 8) : ''}</div>
    `;
    barrasEl.appendChild(col);
  });
}

function renderProvaAlvo() {
  const el = document.getElementById('provaAlvo');
  if (!el || !cicloAtual) return;

  if (!cicloAtual.prova || !cicloAtual.prova.nome) {
    el.innerHTML = '';
    return;
  }

  const prova = cicloAtual.prova;
  let countdown = '';
  let diasTexto = '';
  if (prova.data) {
    const hoje = new Date();
    hoje.setHours(0,0,0,0);
    const dataProva = new Date(prova.data + 'T00:00:00');
    const diff = Math.ceil((dataProva - hoje) / (1000 * 60 * 60 * 24));
    if (diff > 0) {
      countdown = `<div class="prova-countdown"><div class="prova-countdown-num">${diff}</div><div class="prova-countdown-label">dias</div></div>`;
    } else if (diff === 0) {
      countdown = `<div class="prova-countdown"><div class="prova-countdown-num" style="color:#dc2626;">HOJE</div></div>`;
    } else {
      countdown = `<div class="prova-countdown"><div class="prova-countdown-num" style="color:var(--text-muted); font-size:14px;">Realizada</div></div>`;
    }
    diasTexto = new Date(prova.data + 'T00:00:00').toLocaleDateString('pt-BR', { day:'2-digit', month:'long', year:'numeric' });
  }

  el.innerHTML = `
    <div class="prova-alvo-banner">
      <div style="font-size:22px;">🎯</div>
      <div class="prova-alvo-info">
        <div class="prova-alvo-nome">${sanitizeHTML(prova.nome)}</div>
        <div class="prova-alvo-detalhe">${[sanitizeHTML(prova.distancia), diasTexto].filter(Boolean).join(' · ')}</div>
      </div>
      ${countdown}
      <button onclick="editarProvaAlvo()" style="background:transparent; border:1px solid rgba(251,191,36,0.5); color:#92400e; padding:5px 10px; border-radius:6px; cursor:pointer; font-size:11px; font-family:inherit; font-weight:600;">✏️ Editar</button>
    </div>`;
}

async function editarProvaAlvo() {
  if (!cicloAtual) return;
  const prova = cicloAtual.prova || {};

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box" style="max-width:420px; width:92%;">
      <div class="modal-titulo">🎯 Prova Alvo</div>
      <div style="display:flex; flex-direction:column; gap:12px; margin-top:14px;">
        <div class="modal-form-group">
          <label style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; margin-bottom:4px; display:block;">Nome da Prova</label>
          <input type="text" id="pa-nome" placeholder="Ex: Meia Maratona de SP" value="${prova.nome || ''}" style="margin:0; width:100%;">
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div class="modal-form-group">
            <label style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; margin-bottom:4px; display:block;">Data</label>
            <input type="date" id="pa-data" value="${prova.data || ''}" style="margin:0; width:100%;">
          </div>
          <div class="modal-form-group">
            <label style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; margin-bottom:4px; display:block;">Distância</label>
            <select id="pa-dist" style="margin:0; width:100%;">
              <option value="">Selecionar</option>
              ${['5km','10km','15km','21km (Meia)','42km (Maratona)','Outra'].map(d =>
                `<option value="${d}" ${prova.distancia === d ? 'selected' : ''}>${d}</option>`
              ).join('')}
            </select>
          </div>
        </div>
      </div>
      <div class="modal-acoes" style="margin-top:20px;">
        <button class="modal-btn modal-btn-cancelar" id="pa-cancelar">Cancelar</button>
        ${prova.nome ? `<button class="modal-btn" style="background:#dc2626;color:white;" id="pa-limpar">🗑️ Remover</button>` : ''}
        <button class="modal-btn modal-btn-confirmar" id="pa-salvar">Salvar</button>
      </div>
    </div>`;

  document.body.appendChild(overlay);
  overlay.querySelector('#pa-nome').focus();

  const fechar = () => overlay.remove();
  overlay.querySelector('#pa-cancelar').onclick = fechar;
  overlay.addEventListener('click', (e) => { if (e.target === overlay) fechar(); });
  overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') fechar(); });

  const btnLimpar = overlay.querySelector('#pa-limpar');
  if (btnLimpar) btnLimpar.onclick = () => {
    cicloAtual.prova = null;
    salvar();
    renderProvaAlvo();
    renderCiclos();
    fechar();
    showToast('Prova alvo removida.', 'info');
  };

  overlay.querySelector('#pa-salvar').onclick = () => {
    const nome = overlay.querySelector('#pa-nome').value.trim();
    if (!nome) { overlay.querySelector('#pa-nome').focus(); return; }
    cicloAtual.prova = {
      nome,
      data: overlay.querySelector('#pa-data').value,
      distancia: overlay.querySelector('#pa-dist').value
    };
    salvar();
    renderProvaAlvo();
    renderCiclos();
    fechar();
    showToast(`Prova alvo definida: ${nome}`, 'sucesso');
  };
}

function alternarModoEdicao() {
  modoEdicao = !modoEdicao;
  const toggle = document.getElementById("toggleModoEdicao");
  const status = document.getElementById("statusModo");

  toggle.classList.toggle("ativo", modoEdicao);

  if (modoEdicao) {
    status.textContent = "✏️ Edição";
    document.body.classList.remove("modo-visualization");
  } else {
    status.textContent = "🔒 Visualização";
    document.body.classList.add("modo-visualization");
  }

  atualizarEditsDisabled();
  if (cicloAtual) {
    renderSemanas();
    renderDashboardCiclo();
    renderValidacaoCiclo();
  }
  else if (atletaAtual) renderCiclos();
}

function atualizarEditsDisabled() {
  document.getElementById("nomeAtleta").disabled = !modoEdicao;
  document.getElementById("nomeCiclo").disabled = !modoEdicao;
  document.getElementById("qtdSemanas").disabled = !modoEdicao;

  document.querySelectorAll("button[onclick*='criar'], button[onclick*='Criar']").forEach(btn => {
    if (!btn.classList.contains("btn-editar") && !btn.classList.contains("btn-remover") && !btn.classList.contains("btn-voltar")) {
      btn.disabled = !modoEdicao;
    }
  });

  const btnCopiarTemplate = document.querySelector(".btn-copiar-template");
  if (btnCopiarTemplate) {
    btnCopiarTemplate.disabled = !modoEdicao;
  }

  document.querySelectorAll(".treino input, .treino select").forEach(input => {
    input.disabled = !modoEdicao;
  });

  document.querySelectorAll(".btn-editar, .btn-remover").forEach(btn => {
    btn.disabled = !modoEdicao;
  });

  const btnImportar = document.getElementById("btnImportar");
  if (btnImportar) {
    btnImportar.disabled = !modoEdicao;
  }
}

function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
  const btn = document.getElementById('btnDarkToggle');
  if (btn) btn.textContent = isDark ? '☀️' : '🌙';
}

function carregarTema() {
  const tema = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // Aplicar dark mode se: salvo como 'dark' OU (não foi salvo E SO prefere dark)
  const shouldBeDark = tema === 'dark' || (!tema && prefersDark);

  if (shouldBeDark) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }

  const btn = document.getElementById('btnDarkToggle');
  if (btn) btn.textContent = shouldBeDark ? '☀️' : '🌙';
}
