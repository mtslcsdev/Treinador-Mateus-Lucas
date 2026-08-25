function toggleNovoAtletaForm() {
  const form = document.getElementById("formNovoAtleta");
  const input = document.getElementById("nomeAtleta");

  if (form.style.display === "none" || !form.style.display) {
    form.style.display = "block";
    input.focus();
  } else {
    form.style.display = "none";
    input.value = "";
  }
}

function criarAtleta() {
  const input = document.getElementById("nomeAtleta");
  const nome = input.value.trim();
  const errorEl = document.getElementById("erroNomeAtleta");

  if (!nome) {
    input.classList.add('invalid');
    if (errorEl) { errorEl.textContent = 'Digite o nome do atleta.'; errorEl.classList.add('visible'); }
    return;
  }
  if (nome.length > 60) {
    input.classList.add('invalid');
    if (errorEl) { errorEl.textContent = 'Nome deve ter no máximo 60 caracteres.'; errorEl.classList.add('visible'); }
    return;
  }
  input.classList.remove('invalid');
  if (errorEl) errorEl.classList.remove('visible');

  dados.atletas.push({
    id: gerarIDUnico(),
    nome,
    ciclos: [],
    notas: '',
    historicoPaces: []
  });

  input.value = "";
  toggleNovoAtletaForm();
  salvar();
  renderAtletas();
}

function renderAtletas() {
  const container = document.getElementById("listaAtletas");
  const emptyDiv  = document.getElementById("emptyAthletes");
  container.innerHTML = "";

  if (dados.atletas.length === 0) {
    emptyDiv.style.display = "block";
    const sub = document.getElementById("atletasSubtitle");
    if (sub) sub.textContent = "Cadastre o primeiro atleta para começar";
    return;
  }

  emptyDiv.style.display = "none";

  const sub = document.getElementById("atletasSubtitle");
  if (sub) sub.textContent = `${dados.atletas.length} atleta${dados.atletas.length !== 1 ? 's' : ''} cadastrado${dados.atletas.length !== 1 ? 's' : ''}`;

  dados.atletas.forEach(atleta => {
    const totalCiclos  = atleta.ciclos.length;
    const totalTreinos = atleta.ciclos.reduce((s, c) =>
      s + c.semanas.reduce((ss, sem) => ss + sem.treinos.length, 0), 0);

    const card = document.createElement("div");
    card.className = "atleta-card" + (atletaAtual && atletaAtual.id === atleta.id ? " selected" : "");
    card.id = `atleta-${atleta.id}`;
    card.title = `Abrir ciclos de ${atleta.nome}`;

    const temNotas = atleta.notas && atleta.notas.trim().length > 0;
    card.innerHTML = `
      <div class="atleta-actions">
        <button class="btn-notas-atleta" title="Notas do atleta" aria-label="Notas de ${sanitizeHTML(atleta.nome)}"
          onclick="event.stopPropagation(); abrirNotasAtleta(${atleta.id})">${temNotas ? '📋' : '📝'}</button>
        <button class="btn-icon" title="Editar nome" aria-label="Editar nome de ${sanitizeHTML(atleta.nome)}" ${!modoEdicao ? 'disabled' : ''}
          onclick="event.stopPropagation(); editarAtleta(${atleta.id})">✏️</button>
        <button class="btn-icon btn-icon-danger" title="Remover atleta" aria-label="Remover ${sanitizeHTML(atleta.nome)}" ${!modoEdicao ? 'disabled' : ''}
          onclick="event.stopPropagation(); removerAtleta(${atleta.id})">🗑️</button>
      </div>
      <div class="atleta-avatar">${iniciais(atleta.nome)}</div>
      <div>
        <div class="atleta-nome">${sanitizeHTML(atleta.nome)}</div>
        <div class="atleta-meta">${totalCiclos} ciclo${totalCiclos !== 1 ? 's' : ''} · ${totalTreinos} treino${totalTreinos !== 1 ? 's' : ''}${temNotas ? ' · 📋 notas' : ''}</div>
      </div>`;

    card.addEventListener('click', () => selecionarAtleta(atleta.id));
    container.appendChild(card);
  });

  atualizarEditsDisabled();
}

function selecionarAtleta(id) {
  atletaAtual = dados.atletas.find(a => a.id === id);
  if (!atletaAtual) return;
  if (!atletaAtual.ciclos) atletaAtual.ciclos = [];
  cicloAtual = null;

  document.getElementById("tituloAtleta").textContent = `📋 ${atletaAtual.nome}`;

  // Mostra ciclos
  document.getElementById("areaCiclos").classList.remove("hidden");

  // Esconde semanas e limpa conteúdo
  document.getElementById("areaSemanas").classList.add("hidden");
  document.getElementById("tituloCiclo").textContent = "";
  document.getElementById("semanas").innerHTML = "";

  // Carrega zonas do atleta
  carregarZonas();

  // Redesenha lista de atletas para destacar selecionado
  renderAtletas();
  renderCiclos();
  atualizarBreadcrumb();
}

async function editarAtleta(id) {
  const atleta = dados.atletas.find(a => a.id === id);
  const novoNome = await showInputModal("Editar Nome do Atleta", "Nome do atleta", atleta.nome);

  if (novoNome && novoNome.trim()) {
    atleta.nome = novoNome.trim();
    salvar();
    renderAtletas();
    if (atletaAtual && atletaAtual.id === id) {
      document.getElementById("tituloAtleta").textContent = atleta.nome;
    }
  }
}

async function removerAtleta(id) {
  const atleta = dados.atletas.find(a => a.id === id);
  if (!atleta) {
    showToast('Atleta não encontrado.', 'erro');
    return;
  }

  const nome = atleta.nome;
  const totalCiclos = atleta.ciclos?.length || 0;
  const totalTreinos = atleta.ciclos?.reduce((acc, c) =>
    acc + (c.semanas?.reduce((s, w) => s + (w.treinos?.length || 0), 0) || 0), 0
  ) || 0;

  let mensagem = `O atleta <strong>${nome}</strong> será removido permanentemente.<br><br>`;
  mensagem += `📋 ${totalCiclos} ciclos<br>`;
  mensagem += `🏃 ${totalTreinos} treinos<br><br>`;
  mensagem += `<strong style="color: #dc2626;">Todos os dados serão perdidos! Um backup foi criado automaticamente.</strong>`;

  const confirmado = await showConfirm(
    mensagem,
    `Remover ${nome}?`,
    'perigo'
  );
  if (!confirmado) return;

  // Usar função de proteção para operação destrutiva
  const sucesso = protegerOperacaoDestrutiva('remover atleta', () => {
    dados.atletas = dados.atletas.filter(a => a.id !== id);
    if (atletaAtual && atletaAtual.id === id) {
      atletaAtual = null;
      cicloAtual = null;
      document.getElementById("areaCiclos").classList.add("hidden");
      document.getElementById("areaSemanas").classList.add("hidden");
      document.getElementById("tituloAtleta").textContent = "";
      document.getElementById("tituloCiclo").textContent = "";
      document.getElementById("semanas").innerHTML = "";
    }
  });

  if (sucesso) {
    renderAtletas();
    showToast(`✅ ${nome} removido com segurança (backup criado).`, 'sucesso');
  }
}

function abrirNotasAtleta(atletaId) {
  const atleta = dados.atletas.find(a => a.id === atletaId);
  if (!atleta) return;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.cssText = 'align-items:flex-start; justify-content:flex-end; padding:0;';

  const drawer = document.createElement('div');
  drawer.className = 'notas-drawer';
  drawer.innerHTML = `
    <div class="notas-header">
      <div>
        <div style="font-size:15px; font-weight:700;">📋 Notas — ${sanitizeHTML(atleta.nome)}</div>
        <div style="font-size:11px; opacity:0.75; margin-top:2px;">Histórico, lesões, objetivos, características</div>
      </div>
      <button class="treino-drawer-close" id="notas-close">✕</button>
    </div>
    <div class="notas-body">
      <small style="color:var(--text-muted); font-size:11.5px;">Use este espaço para anotar qualquer informação relevante sobre o atleta.</small>
      <textarea class="notas-textarea" id="notas-textarea" placeholder="Ex:
• PRs: 5km 22min, 10km 48min
• Lesão no joelho direito em 2024 — evitar impacto excessivo
• Treina 5x por semana, prefere manhãs
• Objetivo: primeira meia maratona em 2025">${atleta.notas || ''}</textarea>
    </div>
    <div class="notas-footer">
      <button class="modal-btn modal-btn-cancelar" id="notas-cancelar">Cancelar</button>
      <button class="modal-btn modal-btn-confirmar" id="notas-salvar">💾 Salvar Notas</button>
    </div>`;

  overlay.appendChild(drawer);
  document.body.appendChild(overlay);
  drawer.querySelector('#notas-textarea').focus();

  const fechar = () => {
    drawer.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
    drawer.style.transform = 'translateX(100%)';
    drawer.style.opacity = '0';
    setTimeout(() => overlay.remove(), 200);
  };

  drawer.querySelector('#notas-close').onclick = fechar;
  drawer.querySelector('#notas-cancelar').onclick = fechar;
  overlay.addEventListener('click', (e) => { if (e.target === overlay) fechar(); });
  overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') fechar(); });

  drawer.querySelector('#notas-salvar').onclick = () => {
    atleta.notas = drawer.querySelector('#notas-textarea').value;
    salvar();
    renderAtletas();
    fechar();
    showToast('Notas salvas!', 'sucesso');
  };
}
