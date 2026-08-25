function criarSemana() {
  const numero = document.getElementById("numeroSemana").value;
  if (!numero || !cicloAtual) return;

  cicloAtual.semanas.push({
    semana: numero,
    treinos: []
  });

  document.getElementById("numeroSemana").value = "";
  salvar();
  renderSemanas();
}

function renderSemanas() {
  const container = document.getElementById("semanas");
  container.innerHTML = "";

  if (cicloAtual.semanas.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:32px; font-size:14px;">Nenhuma semana neste ciclo.</p>`;
    return;
  }

  if (modoCalendario) {
    renderCalendario();
    return;
  }

  cicloAtual.semanas.forEach((semana, index) => {
    const div = document.createElement("div");
    div.className = modoEdicao ? "secao-semana" : "secao-semana modo-viz";

    const titulo = document.createElement("h3");

    const spanTitulo = document.createElement("span");
    spanTitulo.textContent = semana.nome
      ? `Semana ${semana.semana}: ${semana.nome}`
      : `Semana ${semana.semana}`;

    const acoesTitulo = document.createElement("div");
    acoesTitulo.style.display = "flex";
    acoesTitulo.style.gap = "4px";

    const btnEditar = document.createElement("button");
    btnEditar.className = "btn-editar";
    btnEditar.textContent = "✏️ Editar";
    btnEditar.title = "Editar nome da semana";
    btnEditar.disabled = !modoEdicao;
    btnEditar.onclick = () => editarSemana(index);
    btnEditar.style.cssText = "padding:4px 10px; font-size:11px; margin:0;";

    const btnCopiarSemana = document.createElement("button");
    btnCopiarSemana.className = "btn-editar";
    btnCopiarSemana.textContent = "📋 Copiar";
    btnCopiarSemana.title = "Copiar treinos de outra semana";
    btnCopiarSemana.disabled = !modoEdicao;
    btnCopiarSemana.onclick = () => copiarSemanaDeTreino(index);
    btnCopiarSemana.style.cssText = "padding:4px 10px; font-size:11px; margin:0; background:var(--accent,#0891b2);";

    const btnPdfSemana = document.createElement("button");
    btnPdfSemana.textContent = "📥 PDF";
    btnPdfSemana.title = "Exportar PDF desta semana";
    btnPdfSemana.style.cssText = "padding:4px 10px; font-size:11px; margin:0; background:var(--success);";
    btnPdfSemana.onclick = () => exportarSemanaDireta(index);

    acoesTitulo.appendChild(btnEditar);
    acoesTitulo.appendChild(btnCopiarSemana);
    acoesTitulo.appendChild(btnPdfSemana);

    titulo.appendChild(spanTitulo);
    titulo.appendChild(acoesTitulo);
    div.appendChild(titulo);

    const botoesRow = document.createElement("div");
    botoesRow.style.cssText = "display:flex; gap:8px; margin-bottom:12px; flex-wrap:wrap;";

    const btnAdicionar = document.createElement("button");
    btnAdicionar.textContent = "➕ Adicionar Treino";
    btnAdicionar.disabled = !modoEdicao;
    btnAdicionar.style.cssText = "font-size:13px;";
    btnAdicionar.onclick = () => adicionarTreino(index);

    const btnBiblioteca = document.createElement("button");
    btnBiblioteca.textContent = "📚 Da Biblioteca";
    btnBiblioteca.disabled = !modoEdicao;
    btnBiblioteca.style.cssText = "font-size:13px; background:#0891b2;";
    btnBiblioteca.onclick = () => abrirBiblioteca(index);

    botoesRow.appendChild(btnAdicionar);
    botoesRow.appendChild(btnBiblioteca);
    div.appendChild(botoesRow);

    const treinos = document.createElement("div");
    treinos.id = `treinos-${index}`;
    div.appendChild(treinos);

    container.appendChild(div);
    renderTreinos(index);
  });
}

function editarSemana(index) {
  const semana = cicloAtual.semanas[index];
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

  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  const conteudo = document.createElement("div");
  conteudo.className = "modal-box";
  conteudo.style.textAlign = "left";
  conteudo.style.maxWidth = "480px";

  const titulo = document.createElement("div");
  titulo.className = "modal-titulo";
  titulo.textContent = `📅 Semana ${semana.semana} — Editar Nome`;
  titulo.style.textAlign = "left";
  conteudo.appendChild(titulo);

  const labelSelect = document.createElement("div");
  labelSelect.textContent = "Escolha um tipo predefinido:";
  labelSelect.style.cssText = "font-size:13px; font-weight:600; color:var(--text-secondary); margin:14px 0 6px;";
  conteudo.appendChild(labelSelect);

  const select = document.createElement("select");
  select.className = "modal-select";
  select.style.marginBottom = "10px";

  const optionVazia = document.createElement("option");
  optionVazia.value = "";
  optionVazia.textContent = "Selecione uma opção...";
  select.appendChild(optionVazia);

  opcoesSemanasBase.forEach(opcao => {
    const option = document.createElement("option");
    option.value = opcao;
    option.textContent = opcao;
    option.selected = semana.nome === opcao;
    select.appendChild(option);
  });
  conteudo.appendChild(select);

  const labelInput = document.createElement("div");
  labelInput.textContent = "Ou escreva um nome personalizado:";
  labelInput.style.cssText = "font-size:13px; font-weight:600; color:var(--text-secondary); margin:0 0 6px;";
  conteudo.appendChild(labelInput);

  const inputPersonalizado = document.createElement("input");
  inputPersonalizado.type = "text";
  inputPersonalizado.placeholder = "Nome personalizado para esta semana";
  inputPersonalizado.className = "modal-input-texto";
  inputPersonalizado.value = semana.nome && !opcoesSemanasBase.includes(semana.nome) ? semana.nome : "";
  conteudo.appendChild(inputPersonalizado);

  const containerBotoes = document.createElement("div");
  containerBotoes.className = "modal-acoes";

  const btnCancelar = document.createElement("button");
  btnCancelar.className = "modal-btn modal-btn-cancelar";
  btnCancelar.textContent = "Cancelar";
  btnCancelar.onclick = () => modal.remove();

  const btnConfirmar = document.createElement("button");
  btnConfirmar.className = "modal-btn modal-btn-confirmar";
  btnConfirmar.textContent = "Salvar";
  btnConfirmar.onclick = () => {
    const novoNome = select.value || inputPersonalizado.value.trim();
    if (novoNome) {
      semana.nome = novoNome;
      salvar();
      renderSemanas();
    }
    modal.remove();
  };

  containerBotoes.appendChild(btnCancelar);
  containerBotoes.appendChild(btnConfirmar);
  conteudo.appendChild(containerBotoes);

  modal.appendChild(conteudo);
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
  modal.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.remove(); });
  document.body.appendChild(modal);
  inputPersonalizado.focus();
}

function copiarSemanaDeTreino(indexDestino) {
  if (!cicloAtual) return;

  const semanas = cicloAtual.semanas;

  if (semanas.length <= 1) {
    showToast("Nenhuma outra semana disponível para copiar!", 'aviso');
    return;
  }

  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  const conteudo = document.createElement("div");
  conteudo.className = "modal-box";
  conteudo.style.cssText = "max-width:560px; max-height:85vh; overflow-y:auto; text-align:left;";

  const titulo = document.createElement("div");
  titulo.className = "modal-titulo";
  titulo.textContent = `📋 Copiar Treinos → Semana ${semanas[indexDestino].semana}`;
  titulo.style.textAlign = "left";
  conteudo.appendChild(titulo);

  const inputBusca = document.createElement("input");
  inputBusca.type = "text";
  inputBusca.placeholder = "🔍 Buscar semana por nome...";
  inputBusca.className = "modal-input-texto";
  inputBusca.style.marginTop = "12px";
  conteudo.appendChild(inputBusca);

  const containerSemanas = document.createElement("div");
  containerSemanas.style.cssText = "max-height:320px; overflow-y:auto; margin:4px 0 16px;";
  conteudo.appendChild(containerSemanas);

  function renderizarLista(termo = "") {
    containerSemanas.innerHTML = "";
    semanas.forEach((semana, idx) => {
      if (idx === indexDestino) return;
      const nomeSemana = semana.nome || `Semana ${semana.semana}`;
      if (termo && !nomeSemana.toLowerCase().includes(termo.toLowerCase())) return;

      const item = document.createElement("div");
      item.className = "semana-opcao-item";

      const textoDiv = document.createElement("div");
      textoDiv.innerHTML = `<strong style="font-size:13px">Semana ${semana.semana}</strong>
        <br><span style="font-size:12px; color:var(--text-secondary)">${nomeSemana}</span>
        <br><span style="font-size:11px; color:var(--text-muted)">${semana.treinos.length} treino(s)</span>`;

      const btnCopiar = document.createElement("button");
      btnCopiar.className = "btn-editar";
      btnCopiar.textContent = "✓ Copiar";
      btnCopiar.style.whiteSpace = "nowrap";
      btnCopiar.onclick = () => {
        if (semana.treinos.length === 0) {
          showToast("Esta semana não tem treinos para copiar!", 'aviso');
          return;
        }
        const treinosCopia = semana.treinos.map(t => ({
          dia: t.dia, fase: t.fase, tipo: t.tipo,
          especificacao: t.especificacao, pace: t.pace, obs: t.obs,
          blocos: t.blocos ? JSON.parse(JSON.stringify(t.blocos)) : []
        }));
        cicloAtual.semanas[indexDestino].treinos = treinosCopia;
        salvar();
        renderTreinos(indexDestino);
        modal.remove();
        showToast(`${treinosCopia.length} treino(s) copiado(s) com sucesso!`, 'sucesso');
      };

      item.appendChild(textoDiv);
      item.appendChild(btnCopiar);
      containerSemanas.appendChild(item);
    });

    if (!containerSemanas.children.length) {
      containerSemanas.innerHTML = `<p style="text-align:center; color:var(--text-muted); font-size:13px; padding:16px;">Nenhuma semana encontrada</p>`;
    }
  }

  renderizarLista();
  inputBusca.oninput = () => renderizarLista(inputBusca.value);

  const containerBotoes = document.createElement("div");
  containerBotoes.className = "modal-acoes";

  const btnFechar = document.createElement("button");
  btnFechar.className = "modal-btn modal-btn-cancelar";
  btnFechar.textContent = "Fechar";
  btnFechar.onclick = () => modal.remove();
  containerBotoes.appendChild(btnFechar);
  conteudo.appendChild(containerBotoes);

  modal.appendChild(conteudo);
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
  modal.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.remove(); });
  document.body.appendChild(modal);
  inputBusca.focus();
}
