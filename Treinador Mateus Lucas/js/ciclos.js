function criarCiclo() {
  const nome = document.getElementById("nomeCiclo").value;
  const qtdSemanas = document.getElementById("qtdSemanas").value;

  if (!nome || !qtdSemanas || !atletaAtual) return;

  const semanas = [];
  const opcoesSemanasBase = [
    "Semana Ordinária - Período Base",
    "Semana de Choque - Período Base",
    "Semana de Recuperação - Período Base",
    "Semana Ordinária - Período Específico",
    "Semana de Choque - Período Específico",
    "Semana de Recuperação - Período Específico",
    "Semana de Polimento",
    "Semana de Prova",
  ];

  for (let i = 1; i <= qtdSemanas; i++) {
    const nomeSemanaPadrao = opcoesSemanasBase[i - 1] || "";
    semanas.push({
      semana: i,
      nome: nomeSemanaPadrao,
      treinos: []
    });
  }

  atletaAtual.ciclos.push({
    id: gerarIDUnico(),
    nome,
    prova: null,
    semanas
  });

  document.getElementById("nomeCiclo").value = "";
  document.getElementById("qtdSemanas").value = "";

  salvar();
  renderCiclos();
}

function renderCiclos() {
  const container = document.getElementById("listaCiclos");
  container.innerHTML = "";

  if (!atletaAtual || !atletaAtual.ciclos) {
    atualizarEditsDisabled();
    return;
  }

  if (atletaAtual.ciclos.length === 0) {
    container.innerHTML = `<div class="empty-state" style="grid-column:1/-1;">
      <div class="empty-icon">📋</div>
      <p class="empty-title">Nenhum ciclo criado ainda</p>
      <p class="empty-sub">Preencha os campos acima e clique em "Criar Ciclo"</p>
    </div>`;
    atualizarEditsDisabled();
    return;
  }

  atletaAtual.ciclos.forEach(ciclo => {
    if (!ciclo.id) ciclo.id = Date.now() + Math.random();
    if (!ciclo.semanas) ciclo.semanas = [];
    ciclo.semanas.forEach(s => { if (!s.treinos) s.treinos = []; });
    const totalSemanas = ciclo.semanas.length;
    const totalTreinos = ciclo.semanas.reduce((s, sem) => s + sem.treinos.length, 0);

    const card = document.createElement("div");
    card.className = "ciclo-card";

    const provaChip = ciclo.prova && ciclo.prova.nome
      ? `<span class="ciclo-prova-chip">🎯 ${sanitizeHTML(ciclo.prova.nome)}${ciclo.prova.data ? ' · ' + new Date(ciclo.prova.data + 'T00:00:00').toLocaleDateString('pt-BR') : ''}</span>`
      : '';
    card.innerHTML = `
      <div class="ciclo-card-header">
        <div class="ciclo-icon">📋</div>
        <div style="flex:1; min-width:0;">
          <div class="ciclo-nome">${sanitizeHTML(ciclo.nome)}</div>
          <div class="ciclo-stats">
            <span class="ciclo-stat">📅 ${totalSemanas} sem.</span>
            <span class="ciclo-stat">🏃 ${totalTreinos} trei.</span>
          </div>
          ${provaChip}
        </div>
      </div>
      <div class="ciclo-actions">
        <button class="btn-editar" style="flex:1; font-size:11px;" ${!modoEdicao ? 'disabled' : ''}
          onclick="event.stopPropagation(); editarCiclo(${ciclo.id})">✏️ Editar</button>
        <button class="btn-editar" style="background:var(--warning); font-size:11px;" title="Duplicar ciclo" ${!modoEdicao ? 'disabled' : ''}
          onclick="event.stopPropagation(); duplicarCiclo(${ciclo.id})">📋</button>
        <button class="btn-editar" style="background:#0891b2; font-size:11px;" title="Salvar como template" ${!modoEdicao ? 'disabled' : ''}
          onclick="event.stopPropagation(); salvarCicloComoTemplate(${ciclo.id})">⭐</button>
        <button class="btn-remover" style="font-size:11px;" ${!modoEdicao ? 'disabled' : ''}
          onclick="event.stopPropagation(); removerCiclo(${ciclo.id})">🗑️</button>
      </div>`;

    card.addEventListener('click', () => selecionarCiclo(ciclo.id));
    container.appendChild(card);
  });

  atualizarEditsDisabled();
}

async function editarCiclo(id) {
  const ciclo = atletaAtual.ciclos.find(c => c.id === id);
  const novoNome = await showInputModal("Editar Nome do Ciclo", "Nome do ciclo", ciclo.nome);

  if (novoNome && novoNome.trim()) {
    ciclo.nome = novoNome.trim();
    salvar();
    renderCiclos();
    if (cicloAtual && cicloAtual.id === id) {
      document.getElementById("tituloCiclo").textContent = ciclo.nome;
    }
  }
}

async function removerCiclo(id) {
  const ciclo = atletaAtual.ciclos.find(c => c.id === id);
  if (!ciclo) {
    showToast('Ciclo não encontrado.', 'erro');
    return;
  }

  const nome = ciclo.nome;
  const totalTreinos = ciclo.semanas.reduce((acc, s) => acc + (s.treinos?.length || 0), 0);

  let mensagem = `O ciclo <strong>${nome}</strong> será removido.<br>`;
  mensagem += `📊 ${totalTreinos} treinos serão excluídos.`;

  // Aviso especial se ciclo tem prova alvo
  if (ciclo.prova && ciclo.prova.data) {
    const dataProva = new Date(ciclo.prova.data + 'T00:00:00').toLocaleDateString('pt-BR');
    mensagem += `<br><br>⚠️ <strong>Atenção: Prova alvo em ${dataProva}</strong>. Tem certeza?`;
  }

  const confirmado = await showConfirm(
    mensagem,
    'Remover Ciclo?',
    'perigo'
  );
  if (!confirmado) return;

  // Usar função de proteção para operação destrutiva
  const sucesso = protegerOperacaoDestrutiva('remover ciclo', () => {
    atletaAtual.ciclos = atletaAtual.ciclos.filter(c => c.id !== id);
    if (cicloAtual && cicloAtual.id === id) {
      cicloAtual = null;
      voltarParaCiclos();
    }
  });

  if (sucesso) {
    renderCiclos();
    showToast(`✅ Ciclo "${nome}" removido com segurança.`, 'sucesso');
  }
}

function selecionarCiclo(id) {
  cicloAtual = atletaAtual.ciclos.find(c => c.id === id);
  if (!cicloAtual) {
    showToast('Erro: ciclo não encontrado. Tente recarregar a página.', 'erro');
    return;
  }

  document.getElementById("tituloCiclo").textContent = cicloAtual.nome;

  document.getElementById("areaSemanas").classList.remove("hidden");
  document.getElementById("sumarioCiclo").style.display = "flex";
  document.getElementById("filtrosCiclo").style.display = "flex";

  modoCalendario = false;
  renderSemanas();
  atualizarSumario();
  renderGraficoVolume();
  renderProvaAlvo();
  renderDashboardCiclo();
  renderValidacaoCiclo();
  atualizarBreadcrumb();
}

async function duplicarCiclo(id) {
  const cicloOriginal = atletaAtual.ciclos.find(c => c.id === id);

  if (!cicloOriginal) return;

  const novoNome = await showInputModal("Duplicar Ciclo", "Nome do novo ciclo", cicloOriginal.nome + " (Cópia)");

  if (!novoNome) return;

  const novoCiclo = JSON.parse(JSON.stringify(cicloOriginal));
  novoCiclo.id = Date.now();
  novoCiclo.nome = novoNome;
  novoCiclo.prova = novoCiclo.prova || null;

  atletaAtual.ciclos.push(novoCiclo);
  salvar();
  renderCiclos();
}

async function copiarCicloTemplate() {
  let todosCiclos = [];
  dados.atletas.forEach(atleta => {
    atleta.ciclos.forEach(ciclo => {
      todosCiclos.push({ cicloId: ciclo.id, cicloNome: ciclo.nome, atletaNome: atleta.nome, semanas: ciclo.semanas });
    });
  });

  if (todosCiclos.length === 0) {
    showToast("Nenhum ciclo disponível para copiar!", 'aviso');
    return;
  }

  const opcoesTexto = todosCiclos.map(item => `${item.cicloNome} (${item.atletaNome})`);
  const index = await showSelecaoModal('🔍 Copiar de Ciclo Existente', opcoesTexto, 'Selecionar');
  if (index === null) return;

  const cicloSelecionado = todosCiclos[index];
  const novoNome = await showInputModal('Nome do novo ciclo:', 'Ex: Específico 2025', cicloSelecionado.cicloNome + ' (Cópia)');
  if (!novoNome) return;

  const novoCiclo = {
    id: gerarIDUnico(),
    nome: novoNome,
    semanas: cicloSelecionado.semanas.map(semana => ({
      semana: semana.semana,
      nome: semana.nome,
      treinos: semana.treinos.map(treino => ({
        dia: treino.dia,
        fase: treino.fase,
        tipo: treino.tipo,
        pace: treino.pace,
        obs: treino.obs
      }))
    }))
  };

  atletaAtual.ciclos.push(novoCiclo);
  salvar();
  showToast(`Ciclo "${novoNome}" criado com sucesso!`, 'sucesso');
  renderCiclos();
}

async function salvarCicloComoTemplate(cicloId) {
  const ciclo = atletaAtual.ciclos.find(c => c.id === cicloId);
  if (!ciclo) return;

  const nomeTemplate = await showInputModal('⭐ Salvar como Template', 'Nome do template', ciclo.nome);
  if (!nomeTemplate) return;

  dados.templatesCiclo = dados.templatesCiclo || [];
  dados.templatesCiclo.unshift({
    id: gerarIDUnico(),
    nome: nomeTemplate,
    criadoEm: new Date().toLocaleDateString('pt-BR'),
    semanas: JSON.parse(JSON.stringify(ciclo.semanas.map(s => ({
      ...s,
      treinos: s.treinos.map(t => ({...t}))
    }))))
  });
  if (dados.templatesCiclo.length > 30) dados.templatesCiclo.pop();
  salvar();
  showToast(`Template "${nomeTemplate}" salvo!`, 'sucesso');
}

async function criarCicloDeTemplate() {
  if (!atletaAtual) return;
  const templates = dados.templatesCiclo || [];

  if (templates.length === 0) {
    showToast('Nenhum template salvo ainda. Salve um ciclo como template primeiro.', 'aviso');
    return;
  }

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box" style="max-width:440px; width:92%;">
      <div class="modal-titulo">📋 Criar Ciclo de Template</div>
      <div style="margin:14px 0;">
        <label style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; display:block; margin-bottom:6px;">Selecionar Template</label>
        <select id="tpl-select" style="margin:0; width:100%;">
          ${templates.map((t, i) => `<option value="${i}">${t.nome} (${t.criadoEm})</option>`).join('')}
        </select>
      </div>
      <div style="margin-bottom:14px;">
        <label style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; display:block; margin-bottom:6px;">Nome do Novo Ciclo</label>
        <input type="text" id="tpl-nome" style="margin:0; width:100%;" placeholder="Nome do ciclo" value="${templates[0]?.nome || ''}">
      </div>
      <div style="margin-bottom:14px;">
        <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer;">
          <input type="checkbox" id="tpl-limpar" checked>
          Limpar datas dos treinos no novo ciclo
        </label>
      </div>
      <div class="modal-acoes">
        <button class="modal-btn modal-btn-cancelar" id="tpl-cancelar">Cancelar</button>
        <button class="modal-btn modal-btn-confirmar" id="tpl-criar">Criar Ciclo</button>
      </div>
    </div>`;

  document.body.appendChild(overlay);

  const selTpl = overlay.querySelector('#tpl-select');
  const inpNome = overlay.querySelector('#tpl-nome');

  selTpl.onchange = () => {
    const t = templates[parseInt(selTpl.value)];
    if (t) inpNome.value = t.nome;
  };

  const fechar = () => overlay.remove();
  overlay.querySelector('#tpl-cancelar').onclick = fechar;
  overlay.addEventListener('click', (e) => { if (e.target === overlay) fechar(); });
  overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') fechar(); });

  overlay.querySelector('#tpl-criar').onclick = () => {
    const tpl = templates[parseInt(selTpl.value)];
    const nome = inpNome.value.trim();
    if (!nome) { inpNome.focus(); return; }
    const limpar = overlay.querySelector('#tpl-limpar').checked;

    const novasSemanas = JSON.parse(JSON.stringify(tpl.semanas));
    if (limpar) {
      novasSemanas.forEach(s => s.treinos.forEach(t => { t.dia = ''; }));
    }

    atletaAtual.ciclos.push({
      id: gerarIDUnico(),
      nome,
      prova: null,
      semanas: novasSemanas
    });
    salvar();
    renderCiclos();
    fechar();
    showToast(`Ciclo "${nome}" criado a partir do template!`, 'sucesso');
  };
}
