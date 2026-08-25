/* ================= UI.JS - Componentes de Interface ================= */

function showToast(mensagem, tipo = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
  }
  const icons = { sucesso: '✅', erro: '❌', aviso: '⚠️', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${tipo}`;
  toast.innerHTML = `<span>${icons[tipo] || 'ℹ️'}</span><span>${sanitizeHTML(mensagem)}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('saindo');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }, 3200);
}

function showConfirm(mensagem, titulo = 'Confirmar', tipo = 'perigo') {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    const icons = { perigo: '🗑️', atencao: '⚠️', confirmar: '❓' };
    overlay.innerHTML = `
      <div class="modal-box" role="dialog" aria-modal="true">
        <div class="modal-icone">${icons[tipo] || '❓'}</div>
        <div class="modal-titulo" id="modal-titulo">${sanitizeHTML(titulo)}</div>
        <div class="modal-msg">${sanitizeHTML(mensagem)}</div>
        <div class="modal-acoes">
          <button class="modal-btn modal-btn-cancelar" id="modal-nao">Cancelar</button>
          <button class="modal-btn modal-btn-${tipo}" id="modal-sim">Confirmar</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('#modal-sim').focus();
    const close = (r) => { overlay.remove(); resolve(r); };
    overlay.querySelector('#modal-sim').onclick = () => close(true);
    overlay.querySelector('#modal-nao').onclick = () => close(false);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(false); });
    overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(false); });
  });
}

function showSelecaoModal(titulo, opcoes, labelConfirmar = 'Selecionar') {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    const opcoesHTML = opcoes.map((op, i) => `<option value="${i}">${sanitizeHTML(op)}</option>`).join('');
    overlay.innerHTML = `
      <div class="modal-box" role="dialog" aria-modal="true">
        <div class="modal-titulo" id="modal-titulo">${sanitizeHTML(titulo)}</div>
        <select class="modal-select" id="modal-select-op">${opcoesHTML}</select>
        <div class="modal-acoes">
          <button class="modal-btn modal-btn-cancelar" id="modal-nao">Cancelar</button>
          <button class="modal-btn modal-btn-confirmar" id="modal-sim">${sanitizeHTML(labelConfirmar)}</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('#modal-sim').focus();
    const close = (r) => { overlay.remove(); resolve(r); };
    overlay.querySelector('#modal-sim').onclick = () => {
      close(parseInt(overlay.querySelector('#modal-select-op').value));
    };
    overlay.querySelector('#modal-nao').onclick = () => close(null);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(null); });
    overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(null); });
  });
}

function showInputModal(titulo, placeholder = '', valorPadrao = '') {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-box" role="dialog" aria-modal="true">
        <div class="modal-titulo" id="modal-titulo">${sanitizeHTML(titulo)}</div>
        <input type="text" class="modal-input-texto" id="modal-input" placeholder="${sanitizeHTML(placeholder)}" value="${sanitizeHTML(valorPadrao)}" />
        <div class="modal-acoes">
          <button class="modal-btn modal-btn-cancelar" id="modal-nao">Cancelar</button>
          <button class="modal-btn modal-btn-confirmar" id="modal-sim">Confirmar</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const input = overlay.querySelector('#modal-input');
    input.focus(); input.select();
    const close = (r) => { overlay.remove(); resolve(r); };
    overlay.querySelector('#modal-sim').onclick = () => {
      const val = input.value.trim(); if (val) close(val); else input.focus();
    };
    overlay.querySelector('#modal-nao').onclick = () => close(null);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { const v = input.value.trim(); if (v) close(v); }
      if (e.key === 'Escape') close(null);
    });
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(null); });
  });
}

function showExportModal() {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-box" role="dialog" aria-modal="true">
        <div class="modal-icone">📄</div>
        <div class="modal-titulo" id="modal-titulo">Exportar PDF</div>
        <div class="modal-msg">Escolha o que deseja exportar:</div>
        <div class="modal-acoes" style="flex-direction: column; gap: 8px;">
          <button class="modal-btn modal-btn-confirmar" id="exp-completo" style="width: 100%;">📋 Ciclo Completo</button>
          <button class="modal-btn modal-btn-confirmar" id="exp-semana" style="width: 100%; background:#17a2b8;">🗓️ Semana Específica</button>
          <button class="modal-btn modal-btn-cancelar" id="exp-cancelar" style="width: 100%;">Cancelar</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    const close = (r) => { overlay.remove(); resolve(r); };
    overlay.querySelector('#exp-completo').onclick = () => close('completo');
    overlay.querySelector('#exp-semana').onclick = () => close('semana');
    overlay.querySelector('#exp-cancelar').onclick = () => close(null);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(null); });
    overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(null); });
  });
}

function showPDFLoading(mostrar) {
  let el = document.getElementById('pdf-loading');
  if (mostrar) {
    if (!el) {
      el = document.createElement('div');
      el.id = 'pdf-loading';
      el.className = 'pdf-loading';
      el.innerHTML = `<div class="pdf-spinner"></div><div class="pdf-loading-txt">Gerando PDF...</div>`;
      document.body.appendChild(el);
    }
  } else {
    if (el) el.remove();
  }
}

function mostrarLoadingImport(mostrar) {
  let el = document.getElementById('import-loading');
  if (mostrar && !el) {
    el = document.createElement('div');
    el.id = 'import-loading';
    el.className = 'pdf-loading';
    el.innerHTML = `<div class="pdf-spinner"></div><div class="pdf-loading-txt">Importando dados...</div>`;
    document.body.appendChild(el);
  } else if (!mostrar && el) {
    el.remove();
  }
}
