/* ================= VALIDADOR.JS - Validação de Ciclo ================= */

function renderValidacaoCiclo() {
  const el = document.getElementById('validacaoCiclo');
  if (!el || !cicloAtual) { if (el) el.innerHTML = ''; return; }

  const validacoes = executarValidacoes();

  if (validacoes.length === 0) {
    el.innerHTML = `
      <div class="validacao-container validacao-ok">
        <div class="validacao-icon">✅</div>
        <div class="validacao-titulo">Ciclo Validado</div>
        <div class="validacao-descricao">Todos os treinos estão preenchidos corretamente!</div>
      </div>
    `;
    return;
  }

  let html = `
    <div class="validacao-container">
      <div class="validacao-header">
        <div class="validacao-icon validacao-warning">⚠️</div>
        <div class="validacao-header-content">
          <div class="validacao-titulo">${validacoes.length} ${validacoes.length === 1 ? 'Problema' : 'Problemas'} Encontrados</div>
          <div class="validacao-descricao">Revise os itens abaixo para melhorar a qualidade do seu ciclo</div>
        </div>
      </div>
      <div class="validacao-lista">
  `;

  validacoes.forEach((v, idx) => {
    const iconClass = v.tipo === 'erro' ? 'validacao-item-erro' : v.tipo === 'aviso' ? 'validacao-item-aviso' : 'validacao-item-info';
    html += `
      <div class="validacao-item ${iconClass}">
        <div class="validacao-item-icon">${v.icon}</div>
        <div class="validacao-item-content">
          <div class="validacao-item-titulo">${sanitizeHTML(v.titulo)}</div>
          <div class="validacao-item-descricao">${sanitizeHTML(v.descricao)}</div>
        </div>
        ${v.semanaIndex !== undefined ? `<button class="validacao-item-btn" data-semana="${v.semanaIndex}" data-treino="${v.treinoIndex || -1}">→</button>` : ''}
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  el.innerHTML = html;

  // Event listeners para navegação
  el.querySelectorAll('.validacao-item-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const semanaIndex = parseInt(btn.dataset.semana);
      if (cicloAtual?.semanas?.[semanaIndex]) {
        document.getElementById(`semanas-tab-${semanaIndex}`).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    };
  });
}

function executarValidacoes() {
  const problemas = [];

  if (!cicloAtual?.semanas) return problemas;

  cicloAtual.semanas.forEach((semana, sIdx) => {
    if (!semana.treinos || semana.treinos.length === 0) {
      problemas.push({
        tipo: 'aviso',
        icon: '📅',
        titulo: `Semana ${semana.semana} vazia`,
        descricao: `Nenhum treino cadastrado para esta semana${semana.nome ? ' (' + semana.nome + ')' : ''}`,
        semanaIndex: sIdx
      });
      return;
    }

    semana.treinos.forEach((treino, tIdx) => {
      // Verificar data
      if (!treino.dia) {
        problemas.push({
          tipo: 'erro',
          icon: '📆',
          titulo: `Data faltando em treino`,
          descricao: `Semana ${semana.semana}: treino sem data definida`,
          semanaIndex: sIdx,
          treinoIndex: tIdx
        });
      }

      // Verificar tipo
      if (!treino.tipo) {
        problemas.push({
          tipo: 'erro',
          icon: '🏷️',
          titulo: `Tipo de treino faltando`,
          descricao: `Semana ${semana.semana}${treino.dia ? ` (${new Date(treino.dia + 'T00:00:00').toLocaleDateString('pt-BR')})` : ''}: tipo não definido`,
          semanaIndex: sIdx,
          treinoIndex: tIdx
        });
      }

      // Verificar especificação
      if (!treino.especificacao || treino.especificacao.trim().length === 0) {
        problemas.push({
          tipo: 'aviso',
          icon: '📝',
          titulo: `Especificação vazia`,
          descricao: `Semana ${semana.semana}: adicione detalhes do treino`,
          semanaIndex: sIdx,
          treinoIndex: tIdx
        });
      }

      // Verificar volume
      const kmManual = parseFloat(treino.km) || 0;
      const kmBlocos = (treino.blocos && treino.blocos.length) ? calcularDistanciaTotalTreino(treino.blocos) : 0;
      const totalKm = kmManual || kmBlocos;
      if (totalKm === 0) {
        problemas.push({
          tipo: 'aviso',
          icon: '📏',
          titulo: `Volume não definido`,
          descricao: `Semana ${semana.semana}: preencha Volume (km) ou adicione blocos`,
          semanaIndex: sIdx,
          treinoIndex: tIdx
        });
      }

      // Verificar fase
      if (!treino.fase) {
        problemas.push({
          tipo: 'info',
          icon: '🎯',
          titulo: `Fase não definida`,
          descricao: `Semana ${semana.semana}: atribua Base, Específico ou Polimento`,
          semanaIndex: sIdx,
          treinoIndex: tIdx
        });
      }
    });
  });

  // Validações gerais do ciclo
  if (!cicloAtual.prova?.nome) {
    problemas.push({
      tipo: 'info',
      icon: '🏁',
      titulo: 'Prova alvo não definida',
      descricao: 'Configure a prova alvo do ciclo para melhor acompanhamento'
    });
  }

  return problemas;
}
