function adicionarTreino(semanaIndex) {
  if (!cicloAtual || !cicloAtual.semanas[semanaIndex]) return;
  if (!cicloAtual.semanas[semanaIndex].treinos) cicloAtual.semanas[semanaIndex].treinos = [];
  cicloAtual.semanas[semanaIndex].treinos.push({
    dia: "",
    fase: "",
    tipo: "",
    especificacao: "",
    pace: "",
    obs: "",
    km: "",
    blocos: [],
    zona: "",
    modalidade: "Corrida",
    feedback: { sensacao: '', obs: '' }
  });

  filtroAtivo = { fase: "", busca: "" };
  const selFase = document.getElementById("filtroFase");
  const inpBusca = document.getElementById("filtroBusca");
  if (selFase) selFase.value = "";
  if (inpBusca) inpBusca.value = "";

  salvar();
  renderTreinos(semanaIndex);
  atualizarSumario();
  renderGraficoVolume();
  renderDashboardCiclo();
  renderValidacaoCiclo();
}

function editarTreinoAvancado(semanaIndex, treinoIndex) {
  // Validação cruzada de referências
  if (!cicloAtual || !cicloAtual.semanas || !cicloAtual.semanas[semanaIndex]) {
    showToast('Erro: Ciclo ou semana inválida. Recarregue a página.', 'erro');
    console.error('editarTreinoAvancado: cicloAtual ou semana não encontrado', {cicloAtual, semanaIndex});
    return;
  }

  if (!cicloAtual.semanas[semanaIndex].treinos || !cicloAtual.semanas[semanaIndex].treinos[treinoIndex]) {
    showToast('Erro: Treino não encontrado. Recarregue a página.', 'erro');
    console.error('editarTreinoAvancado: treino não encontrado', {semanaIndex, treinoIndex});
    return;
  }

  const treino = cicloAtual.semanas[semanaIndex].treinos[treinoIndex];
  const nomeSemana = cicloAtual.semanas[semanaIndex].nome || `Semana ${semanaIndex + 1}`;

  let blocosTemp = JSON.parse(JSON.stringify(treino.blocos || []));

  const modal = document.createElement("div");
  modal.className = "modal-overlay drawer-mode";

  const drawer = document.createElement("div");
  drawer.className = "treino-drawer";

  drawer.innerHTML = `
    <div class="treino-drawer-header">
      <div>
        <span class="treino-drawer-titulo">✏️ Editar Treino</span>
        <span class="treino-drawer-sub">${nomeSemana}</span>
      </div>
      <button class="treino-drawer-close" id="td-close">✕</button>
    </div>

    <div class="treino-drawer-body">

      <div class="form-section">
        <div class="form-section-title">📋 Informações Básicas</div>
        <div class="modal-form-grid cols-2">
          <div class="modal-form-group">
            <label>Data do Treino</label>
            <input type="date" id="td-dia" value="${treino.dia || ''}">
          </div>
          <div class="modal-form-group">
            <label>Fase</label>
            <select id="td-fase">
              <option value="">Selecione a fase</option>
              <option value="Base" ${treino.fase === 'Base' ? 'selected' : ''}>Base</option>
              <option value="Específico" ${treino.fase === 'Específico' ? 'selected' : ''}>Específico</option>
              <option value="Polimento" ${treino.fase === 'Polimento' ? 'selected' : ''}>Polimento</option>
            </select>
          </div>
        </div>
        <div class="modal-form-grid cols-2">
          <div class="modal-form-group">
            <label>Tipo de Treino</label>
            <select id="td-tipo">
              <option value="">Selecione o tipo</option>
              ${['Corrida Leve','Fartlek','Progressivo','Intervalado','Repetições','Bloco','Longão','Rodagem','Ritmado','TRT - Teste de Ritmo Total']
                .map(t => `<option value="${t}" ${treino.tipo === t ? 'selected' : ''}>${t}</option>`).join('')}
            </select>
          </div>
          <div class="modal-form-group">
            <label>Zona / Pace</label>
            <select id="td-pace">
              <option value="">Selecione a zona</option>
              ${['Z1 - Corrida Leve','Z2 - Corrida Leve/Moderada','Z3 - Corrida Moderada','Z4 - Corrida Moderada/Intensa','Z5 - Corrida Intensa']
                .map(z => `<option value="${z}" ${treino.pace === z ? 'selected' : ''}>${z}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="modal-form-grid cols-2">
          <div class="modal-form-group">
            <label>Volume (km)</label>
            <input type="number" id="td-km" step="0.1" min="0" placeholder="Ex: 8.5" value="${treino.km || ''}">
          </div>
          <div class="modal-form-group" style="justify-content:flex-end;">
            <label style="opacity:0;">&#8203;</label>
            <small style="color:var(--text-muted);font-size:11px;padding-top:2px;">Km total do treino para o gráfico de volume semanal</small>
          </div>
        </div>
      </div>

      <div class="form-section">
        <div class="form-section-title">📝 Descrição do Treino</div>
        <div class="modal-form-group" style="margin-bottom:12px;">
          <label>Especificação</label>
          <textarea id="td-espec" rows="6" placeholder="Descreva detalhadamente o treino...">${treino.especificacao || ''}</textarea>
        </div>
        <div class="modal-form-group">
          <label>Observações / Instruções</label>
          <textarea id="td-obs" rows="3" placeholder="Dicas, pace médio esperado, instruções especiais...">${treino.obs || ''}</textarea>
        </div>
      </div>

      <div class="form-section">
        <div class="form-section-title">
          🔗 Blocos do Treino
          <span class="form-section-badge" id="td-blocos-count">${blocosTemp.length}</span>
        </div>
        <div id="td-blocos-container"></div>
        <button class="btn-add-bloco" id="td-add-bloco">+ Adicionar Bloco</button>
      </div>

      <div class="form-section">
        <div class="form-section-title">💬 Feedback do Atleta</div>
        <div class="modal-form-grid cols-2">
          <div class="modal-form-group">
            <label>Sensação</label>
            <select id="td-feedback-sensacao">
              <option value="">Sem registro</option>
              <option value="Muito Fácil" ${(treino.feedback?.sensacao === 'Muito Fácil') ? 'selected' : ''}>😀 Muito Fácil</option>
              <option value="Fácil" ${(treino.feedback?.sensacao === 'Fácil') ? 'selected' : ''}>🙂 Fácil</option>
              <option value="Normal" ${(treino.feedback?.sensacao === 'Normal') ? 'selected' : ''}>😐 Normal</option>
              <option value="Difícil" ${(treino.feedback?.sensacao === 'Difícil') ? 'selected' : ''}>😓 Difícil</option>
              <option value="Muito Difícil" ${(treino.feedback?.sensacao === 'Muito Difícil') ? 'selected' : ''}>😰 Muito Difícil</option>
            </select>
          </div>
        </div>
        <div class="modal-form-group" style="margin-top:8px;">
          <label>Observação do Atleta</label>
          <textarea id="td-feedback-obs" rows="3" placeholder="Como o atleta se sentiu no treino...">${treino.feedback?.obs || ''}</textarea>
        </div>
      </div>

    </div>

    <div class="treino-drawer-footer">
      <button class="modal-btn modal-btn-cancelar" id="td-cancelar">Cancelar</button>
      <button class="modal-btn" style="background:#0891b2; color:white;" id="td-biblioteca">📚 Salvar na Biblioteca</button>
      <button class="modal-btn modal-btn-confirmar" id="td-salvar">💾 Salvar Treino</button>
    </div>
  `;

  modal.appendChild(drawer);
  document.body.appendChild(modal);

  function renderBlocos() {
    const container = drawer.querySelector('#td-blocos-container');
    const countEl   = drawer.querySelector('#td-blocos-count');
    countEl.textContent = blocosTemp.length;
    container.innerHTML = '';

    if (blocosTemp.length === 0) {
      container.innerHTML = '<div class="blocos-vazio">Nenhum bloco adicionado ainda</div>';
      return;
    }

    blocosTemp.forEach((bloco, idx) => {
      const blocoDiv = document.createElement('div');
      blocoDiv.className = 'bloco-item';
      blocoDiv.innerHTML = `
        <div class="bloco-item-header">
          <span class="bloco-item-num">Bloco ${idx + 1}</span>
          <button class="btn-remover-bloco" data-idx="${idx}">✕ Remover</button>
        </div>
        <div class="bloco-item-body">
          <div class="modal-form-group bloco-full">
            <label>Descrição</label>
            <input type="text" placeholder="Ex: Aquecimento, Séries, Desaquecimento" value="${bloco.descricao || ''}">
          </div>
          <div class="modal-form-group">
            <label>Distância (km)</label>
            <input type="number" step="0.1" min="0" placeholder="0.0" value="${bloco.distancia || ''}">
          </div>
          <div class="modal-form-group">
            <label>Repetições</label>
            <input type="number" min="1" placeholder="1" value="${bloco.repeticoes || '1'}">
          </div>
          <div class="modal-form-group">
            <label>Pace alvo (MM:SS/km)</label>
            <input type="text" placeholder="04:30" value="${bloco.pace || ''}">
          </div>
          <div class="modal-form-group">
            <label>Intervalo / Recuperação</label>
            <input type="text" placeholder="Ex: 90s caminhada" value="${bloco.intervalo || ''}">
          </div>
        </div>`;

      const inputs = blocoDiv.querySelectorAll('input');
      const campos = ['descricao','distancia','repeticoes','pace','intervalo'];
      inputs.forEach((inp, k) => {
        inp.addEventListener('input', () => { blocosTemp[idx][campos[k]] = inp.value; });
      });

      blocoDiv.querySelector('.btn-remover-bloco').onclick = () => {
        blocosTemp.splice(idx, 1);
        renderBlocos();
      };

      container.appendChild(blocoDiv);
    });
  }

  renderBlocos();

  const fechar = () => {
    drawer.style.animation = 'none';
    drawer.style.transform = 'translateX(100%)';
    drawer.style.opacity   = '0';
    drawer.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
    setTimeout(() => modal.remove(), 200);
  };

  drawer.querySelector('#td-close').onclick    = fechar;
  drawer.querySelector('#td-cancelar').onclick = fechar;
  modal.addEventListener('click', (e) => { if (e.target === modal) fechar(); });
  modal.addEventListener('keydown', (e) => { if (e.key === 'Escape') fechar(); });

  // Validação de datas: alertar se data é anterior à data atual
  const inputData = drawer.querySelector('#td-dia');
  inputData.addEventListener('change', (e) => {
    if (!e.target.value) return; // Permite limpar a data
    const dataSelecionada = new Date(e.target.value + 'T00:00:00');
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    if (dataSelecionada < hoje) {
      const confirmado = confirm(`⚠️ Você selecionou ${e.target.value} (data passada). Tem certeza que deseja usar essa data?`);
      if (!confirmado) {
        e.target.value = '';
      }
    }
  });

  drawer.querySelector('#td-add-bloco').onclick = () => {
    blocosTemp.push({ descricao: '', distancia: '', repeticoes: '1', pace: '', intervalo: '' });
    renderBlocos();
    const container = drawer.querySelector('#td-blocos-container');
    container.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  drawer.querySelector('#td-biblioteca').onclick = () => {
    const template = {
      id: Date.now(),
      nome: drawer.querySelector('#td-tipo').value || 'Treino sem nome',
      tipo: drawer.querySelector('#td-tipo').value,
      fase: drawer.querySelector('#td-fase').value,
      pace: drawer.querySelector('#td-pace').value,
      km: drawer.querySelector('#td-km').value,
      especificacao: drawer.querySelector('#td-espec').value,
      obs: drawer.querySelector('#td-obs').value,
      blocos: JSON.parse(JSON.stringify(blocosTemp))
    };
    dados.biblioteca = dados.biblioteca || [];
    dados.biblioteca.unshift(template);
    salvar();
    showToast(`"${template.nome}" salvo na biblioteca!`, 'sucesso');
  };

  drawer.querySelector('#td-salvar').onclick = () => {
    treino.dia           = drawer.querySelector('#td-dia').value;
    treino.fase          = drawer.querySelector('#td-fase').value;
    treino.tipo          = drawer.querySelector('#td-tipo').value;
    treino.pace          = drawer.querySelector('#td-pace').value;
    treino.km            = drawer.querySelector('#td-km').value;
    treino.especificacao = drawer.querySelector('#td-espec').value;
    treino.obs           = drawer.querySelector('#td-obs').value;
    treino.blocos        = blocosTemp;
    // Feedback
    if (!treino.feedback) treino.feedback = {};
    treino.feedback.sensacao = drawer.querySelector('#td-feedback-sensacao').value;
    treino.feedback.obs      = drawer.querySelector('#td-feedback-obs').value;
    salvar();
    renderTreinos(semanaIndex);
    atualizarSumario();
    renderGraficoVolume();
    renderDashboardCiclo();
    renderValidacaoCiclo();
    fechar();
    showToast('Treino salvo com sucesso!', 'sucesso');
  };
}

function renderTreinos(semanaIndex) {
  const div = document.getElementById(`treinos-${semanaIndex}`);
  if (!div || !cicloAtual) return;
  div.innerHTML = "";

  const treinos = cicloAtual.semanas[semanaIndex].treinos;

  if (treinos.length === 0) {
    if (modoEdicao) {
      div.innerHTML = `<p style="color:var(--text-muted); font-size:13px; padding:8px 0; font-style:italic;">Nenhum treino ainda — clique em ➕ Adicionar Treino para começar.</p>`;
    } else {
      div.innerHTML = `<p style="color:var(--text-muted); font-size:13px; padding:8px 0; font-style:italic;">Nenhum treino cadastrado nesta semana.</p>`;
    }
    return;
  }

  let treinosVisiveis = 0;
  treinos.forEach((treino, i) => {
    const faseAtiva = filtroAtivo.fase === "" || treino.fase === filtroAtivo.fase;
    const buscaAtiva = filtroAtivo.busca === "" || (treino.tipo || "").toLowerCase().includes(filtroAtivo.busca.toLowerCase());
    if (!faseAtiva || !buscaAtiva) return;
    treinosVisiveis++;

    if (modoEdicao) {
      const card = document.createElement("div");
      const vazio = !treino.tipo && !treino.dia && !treino.especificacao;
      card.className = "treino-edit-card" + (vazio ? " vazio" : "");

      const dateDiv = document.createElement("div");
      dateDiv.className = "treino-viz-date";
      dateDiv.style.flexShrink = "0";
      if (treino.dia) {
        const dt = new Date(treino.dia + 'T00:00:00');
        const dias = ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'];
        const meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
        dateDiv.innerHTML = `
          <div class="weekday">${dias[dt.getDay()]}</div>
          <div class="datenum">${String(dt.getDate()).padStart(2,'0')}</div>
          <div class="month">${meses[dt.getMonth()]}</div>`;
      } else {
        dateDiv.className += " no-date";
        dateDiv.innerHTML = `<div style="font-size:11px;color:var(--text-muted);">sem<br>data</div>`;
      }

      const bodyDiv = document.createElement("div");
      bodyDiv.className = "treino-viz-body";
      bodyDiv.style.flex = "1";
      bodyDiv.style.minWidth = "0";

      const topDiv = document.createElement("div");
      topDiv.className = "treino-viz-top";
      if (treino.tipo) {
        const cfg = getTipoConfig(treino.tipo);
        const badge = document.createElement("span");
        badge.className = `treino-tipo-badge ${cfg.cor}`;
        badge.textContent = `${cfg.icon} ${treino.tipo}`;
        topDiv.appendChild(badge);
      }
      if (treino.fase) {
        const faseMap = { 'Base': 'fase-base', 'Específico': 'fase-específico', 'Polimento': 'fase-polimento' };
        const fEl = document.createElement("span");
        fEl.className = `fase-badge ${faseMap[treino.fase] || ''}`;
        fEl.textContent = treino.fase;
        topDiv.appendChild(fEl);
      }
      // Feedback chip
      if (treino.feedback?.sensacao) {
        const fbMap = {
          'Muito Fácil':   { icon: '😀', cls: 'feedback-muito-facil' },
          'Fácil':         { icon: '🙂', cls: 'feedback-facil' },
          'Normal':        { icon: '😐', cls: 'feedback-normal' },
          'Difícil':       { icon: '😓', cls: 'feedback-dificil' },
          'Muito Difícil': { icon: '😰', cls: 'feedback-muito-dificil' }
        };
        const fb = fbMap[treino.feedback.sensacao] || { icon: '💬', cls: '' };
        const fbChip = document.createElement('span');
        fbChip.className = `feedback-chip ${fb.cls}`;
        fbChip.title = `Feedback: ${treino.feedback.sensacao}${treino.feedback.obs ? '\n' + treino.feedback.obs : ''}`;
        fbChip.textContent = `${fb.icon} ${treino.feedback.sensacao}`;
        topDiv.appendChild(fbChip);
      }
      if (!treino.tipo && !treino.fase) {
        topDiv.innerHTML = `<span style="font-size:12px;color:var(--text-muted);font-style:italic;">Treino sem informações — clique em Editar</span>`;
      }
      bodyDiv.appendChild(topDiv);

      if (treino.especificacao) {
        const desc = document.createElement("div");
        desc.className = "treino-viz-desc";
        desc.textContent = treino.especificacao;
        bodyDiv.appendChild(desc);
      }

      if (treino.km || treino.pace || treino.obs) {
        const meta = document.createElement("div");
        meta.className = "treino-viz-meta";
        if (treino.km) {
          const chip = document.createElement("span");
          chip.className = "treino-meta-chip";
          chip.textContent = `📏 ${parseFloat(treino.km).toFixed(1)} km`;
          meta.appendChild(chip);
        }
        if (treino.pace) {
          const chip = document.createElement("span");
          chip.className = "treino-meta-chip";
          chip.textContent = `⚡ ${treino.pace}`;
          meta.appendChild(chip);
        }
        if (treino.obs) {
          const chip = document.createElement("span");
          chip.className = "treino-meta-chip";
          chip.textContent = `💡 ${treino.obs}`;
          meta.appendChild(chip);
        }
        bodyDiv.appendChild(meta);
      }

      const actions = document.createElement("div");
      actions.className = "treino-edit-actions";

      const btnEditar = document.createElement("button");
      btnEditar.className = "btn-edit-treino";
      btnEditar.title = "Editar treino";
      btnEditar.textContent = "✏️";
      btnEditar.onclick = () => editarTreinoAvancado(semanaIndex, i);

      const btnDuplicar = document.createElement("button");
      btnDuplicar.className = "btn-edit-treino";
      btnDuplicar.title = "Duplicar treino";
      btnDuplicar.textContent = "📋";
      btnDuplicar.onclick = () => duplicarTreino(semanaIndex, i);

      const btnDeletar = document.createElement("button");
      btnDeletar.className = "btn-edit-treino danger";
      btnDeletar.title = "Remover treino";
      btnDeletar.textContent = "🗑️";
      btnDeletar.onclick = () => deletarTreino(semanaIndex, i);

      actions.appendChild(btnEditar);
      actions.appendChild(btnDuplicar);
      actions.appendChild(btnDeletar);

      card.draggable = true;
      card.dataset.semanaIndex = semanaIndex;
      card.dataset.treinoIndex = i;

      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({ si: semanaIndex, ti: i }));
        setTimeout(() => card.classList.add('dragging'), 0);
      });
      card.addEventListener('dragend', () => card.classList.remove('dragging'));
      card.addEventListener('dragover', (e) => { e.preventDefault(); card.classList.add('drag-over'); });
      card.addEventListener('dragleave', () => card.classList.remove('drag-over'));
      card.addEventListener('drop', (e) => {
        e.preventDefault();
        card.classList.remove('drag-over');
        try {
          const origem = JSON.parse(e.dataTransfer.getData('text/plain'));
          if (origem.si === semanaIndex && origem.ti !== i) {
            const treinos = cicloAtual.semanas[semanaIndex].treinos;
            const [movido] = treinos.splice(origem.ti, 1);
            treinos.splice(i, 0, movido);
            salvar();
            renderTreinos(semanaIndex);
          }
        } catch {}
      });

      const handle = document.createElement("div");
      handle.className = "drag-handle";
      handle.textContent = "⠿";
      handle.title = "Arrastar para reordenar";
      card.appendChild(handle);
      card.appendChild(dateDiv);
      card.appendChild(bodyDiv);
      card.appendChild(actions);
      div.appendChild(card);

    } else {
      const card = document.createElement("div");
      card.className = "treino-viz-card";

      const dateDiv = document.createElement("div");
      dateDiv.className = "treino-viz-date";
      if (treino.dia) {
        const dt = new Date(treino.dia + 'T00:00:00');
        const dias = ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'];
        const meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
        dateDiv.innerHTML = `
          <div class="weekday">${dias[dt.getDay()]}</div>
          <div class="datenum">${String(dt.getDate()).padStart(2,'0')}</div>
          <div class="month">${meses[dt.getMonth()]}</div>`;
      } else {
        dateDiv.className += " no-date";
        dateDiv.textContent = "—";
      }

      const bodyDiv = document.createElement("div");
      bodyDiv.className = "treino-viz-body";

      const topDiv = document.createElement("div");
      topDiv.className = "treino-viz-top";

      if (treino.tipo) {
        const cfg = getTipoConfig(treino.tipo);
        const badge = document.createElement("span");
        badge.className = `treino-tipo-badge ${cfg.cor}`;
        badge.textContent = `${cfg.icon} ${treino.tipo}`;
        topDiv.appendChild(badge);
      }

      if (treino.fase) {
        const faseMap = { 'Base': 'fase-base', 'Específico': 'fase-específico', 'Polimento': 'fase-polimento' };
        const faseEl = document.createElement("span");
        faseEl.className = `fase-badge ${faseMap[treino.fase] || ''}`;
        faseEl.textContent = treino.fase;
        topDiv.appendChild(faseEl);
      }
      // Feedback chip
      if (treino.feedback?.sensacao) {
        const fbMap = {
          'Muito Fácil':   { icon: '😀', cls: 'feedback-muito-facil' },
          'Fácil':         { icon: '🙂', cls: 'feedback-facil' },
          'Normal':        { icon: '😐', cls: 'feedback-normal' },
          'Difícil':       { icon: '😓', cls: 'feedback-dificil' },
          'Muito Difícil': { icon: '😰', cls: 'feedback-muito-dificil' }
        };
        const fb = fbMap[treino.feedback.sensacao] || { icon: '💬', cls: '' };
        const fbChip = document.createElement('span');
        fbChip.className = `feedback-chip ${fb.cls}`;
        fbChip.title = `Feedback: ${treino.feedback.sensacao}${treino.feedback.obs ? '\n' + treino.feedback.obs : ''}`;
        fbChip.textContent = `${fb.icon} ${treino.feedback.sensacao}`;
        topDiv.appendChild(fbChip);
      }
      bodyDiv.appendChild(topDiv);

      if (treino.especificacao) {
        const desc = document.createElement("div");
        desc.className = "treino-viz-desc";
        desc.textContent = treino.especificacao;
        bodyDiv.appendChild(desc);
      }

      const meta = document.createElement("div");
      meta.className = "treino-viz-meta";
      if (treino.km) {
        const chip = document.createElement("span");
        chip.className = "treino-meta-chip";
        chip.textContent = `📏 ${parseFloat(treino.km).toFixed(1)} km`;
        meta.appendChild(chip);
      }
      if (treino.pace) {
        const chip = document.createElement("span");
        chip.className = "treino-meta-chip";
        chip.textContent = `⚡ ${treino.pace}`;
        meta.appendChild(chip);
      }
      if (treino.obs) {
        const chip = document.createElement("span");
        chip.className = "treino-meta-chip";
        chip.textContent = `💡 ${treino.obs}`;
        meta.appendChild(chip);
      }
      if (meta.children.length) bodyDiv.appendChild(meta);

      card.appendChild(dateDiv);
      card.appendChild(bodyDiv);
      div.appendChild(card);
    }
  });

  if (treinosVisiveis === 0 && treinos.length > 0) {
    div.innerHTML = `<p style="color:var(--text-muted); font-size:13px; padding:8px 0; font-style:italic;">Nenhum treino corresponde ao filtro ativo.</p>`;
  }
}

function atualizarTreino(semanaIndex, treinoIndex, campo, valor) {
  cicloAtual.semanas[semanaIndex].treinos[treinoIndex][campo] = valor;
  salvar();
}

async function deletarTreino(semanaIndex, treinoIndex) {
  const confirmado = await showConfirm(
    'Este treino será removido permanentemente.',
    'Remover Treino?',
    'perigo'
  );
  if (!confirmado) return;
  cicloAtual.semanas[semanaIndex].treinos.splice(treinoIndex, 1);
  salvar();
  renderTreinos(semanaIndex);
  atualizarSumario();
  renderGraficoVolume();
  renderDashboardCiclo();
  renderValidacaoCiclo();
  showToast('Treino removido.', 'info');
}

async function duplicarTreino(semanaIndex, treinoIndex) {
  const semanas = cicloAtual.semanas;
  const opcoes = semanas.map((s, i) =>
    `${i === semanaIndex ? '★ ' : ''}Semana ${s.semana}${s.nome ? ': ' + s.nome : ''}`
  );

  const destino = await showSelecaoModal('📋 Duplicar para qual semana?', opcoes, 'Duplicar');
  if (destino === null) return;

  const copia = JSON.parse(JSON.stringify(semanas[semanaIndex].treinos[treinoIndex]));
  semanas[destino].treinos.push(copia);
  salvar();
  renderTreinos(destino);
  if (destino !== semanaIndex) renderTreinos(semanaIndex);
  atualizarSumario();
  renderGraficoVolume();
  renderDashboardCiclo();
  renderValidacaoCiclo();
  showToast('Treino duplicado!', 'sucesso');
}

function exportarSemanaDireta(semanaIndex) {
  const semana = cicloAtual.semanas[semanaIndex];
  const atletaNome = atletaAtual.nome;
  const cicloNome = cicloAtual.nome;

  let conteudo = `
    <div style="font-family:Arial,sans-serif; width:100%; padding:20px;">
      <div style="background:linear-gradient(135deg,#1a56db,#1e3a8a); color:white; padding:18px 24px; border-radius:8px; margin-bottom:20px;">
        <div style="font-size:11px; opacity:0.8; margin-bottom:4px; text-transform:uppercase; letter-spacing:1px;">Treinador Mateus Lucas</div>
        <div style="font-size:18px; font-weight:800; margin-bottom:2px;">${atletaNome}</div>
        <div style="font-size:12px; opacity:0.9;">${cicloNome} · Semana ${semana.semana}${semana.nome ? ': ' + semana.nome : ''}</div>
        <div style="font-size:11px; opacity:0.7; margin-top:6px;">Gerado em ${new Date().toLocaleDateString('pt-BR')}</div>
      </div>
  `;
  conteudo += gerarHTMLSemanaPDF(semana, 0);
  conteudo += `</div>`;

  const element = document.createElement("div");
  element.innerHTML = conteudo;
  element.style.display = 'none';
  document.body.appendChild(element);

  showPDFLoading(true);

  const opt = {
    margin: [15, 15, 15, 15],
    filename: `${atletaNome}_${cicloNome}_Semana${semana.semana}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
  };

  carregarHtml2Pdf(() => {
    html2pdf().set(opt).from(element).save().then(() => {
      showPDFLoading(false);
      document.body.removeChild(element);
      showToast(`PDF Semana ${semana.semana} gerado!`, 'sucesso');
    }).catch(() => {
      showPDFLoading(false);
      if (document.body.contains(element)) document.body.removeChild(element);
      showToast('Erro ao gerar o PDF.', 'erro');
    });
  });
}

function abrirBiblioteca(semanaIndex) {
  const biblioteca = dados.biblioteca || [];

  const overlay = document.createElement('div');
  overlay.className = 'biblioteca-overlay';

  const drawer = document.createElement('div');
  drawer.className = 'biblioteca-drawer';

  drawer.innerHTML = `
    <div class="biblioteca-header">
      <div>
        <div class="biblioteca-titulo">📚 Biblioteca de Treinos</div>
        <div class="biblioteca-sub">${biblioteca.length} template${biblioteca.length !== 1 ? 's' : ''} salvo${biblioteca.length !== 1 ? 's' : ''}</div>
      </div>
      <button class="treino-drawer-close" id="bib-close">✕</button>
    </div>
    <div class="biblioteca-body" id="bib-body"></div>`;

  overlay.appendChild(drawer);
  document.body.appendChild(overlay);

  function renderItems() {
    const body = drawer.querySelector('#bib-body');
    const bib = dados.biblioteca || [];
    if (bib.length === 0) {
      body.innerHTML = `
        <div class="biblioteca-vazia">
          <div class="biblioteca-vazia-icon">📚</div>
          <div class="biblioteca-vazia-txt">Nenhum template salvo ainda.<br>Abra um treino para editar e clique em<br><strong>"📚 Salvar na Biblioteca"</strong>.</div>
        </div>`;
      return;
    }
    body.innerHTML = '';
    bib.forEach((item, idx) => {
      const el = document.createElement('div');
      el.className = 'biblioteca-item';
      const cfg = getTipoConfig(item.tipo);
      el.innerHTML = `
        <span style="font-size:20px;">${cfg.icon}</span>
        <div class="biblioteca-item-info">
          <div class="biblioteca-item-nome">${item.nome}</div>
          <div class="biblioteca-item-meta">${[item.fase, item.pace, item.km ? item.km + 'km' : ''].filter(Boolean).join(' · ') || 'Sem detalhes'}</div>
        </div>
        <button class="btn-del-biblioteca" data-idx="${idx}" title="Remover da biblioteca">🗑️</button>`;

      el.querySelector('.btn-del-biblioteca').onclick = (e) => {
        e.stopPropagation();
        dados.biblioteca.splice(idx, 1);
        salvar();
        renderItems();
      };

      el.addEventListener('click', () => {
        const copia = JSON.parse(JSON.stringify(item));
        delete copia.id;
        cicloAtual.semanas[semanaIndex].treinos.push({
          dia: '', fase: copia.fase || '', tipo: copia.tipo || '', especificacao: copia.especificacao || '',
          pace: copia.pace || '', obs: copia.obs || '', km: copia.km || '', blocos: copia.blocos || [], zona: '', modalidade: 'Corrida'
        });
        salvar();
        renderTreinos(semanaIndex);
        atualizarSumario();
        renderGraficoVolume();
        fechar();
        showToast(`"${item.nome}" inserido na semana!`, 'sucesso');
      });

      body.appendChild(el);
    });
  }

  renderItems();

  const fechar = () => {
    drawer.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
    drawer.style.transform = 'translateX(100%)';
    drawer.style.opacity = '0';
    setTimeout(() => overlay.remove(), 200);
  };

  drawer.querySelector('#bib-close').onclick = fechar;
  overlay.addEventListener('click', (e) => { if (e.target === overlay) fechar(); });
  overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') fechar(); });
}
