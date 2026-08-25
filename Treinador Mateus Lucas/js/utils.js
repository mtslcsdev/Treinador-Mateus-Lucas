/* ================= UTILS.JS - Funções Utilitárias ================= */

/* ===== UUID GERADOR ===== */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/* ===== SEGURANÇA ===== */
function sanitizeHTML(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ===== FUNÇÃO HELPER FOCUS TRAP ===== */
function trapFocus(container) {
  const focusable = container.querySelectorAll(
    'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  container.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}

/* ===== LAZY LOAD HTML2PDF ===== */
function carregarHtml2Pdf(callback, tentativa = 1) {
  // Se biblioteca já carregada, executa callback imediatamente
  if (window.html2pdf) {
    callback();
    return;
  }

  // Mostra feedback ao usuário
  if (tentativa === 1) {
    showToast('📥 Carregando biblioteca de PDF...', 'info');
  }

  // CDNs em ordem de preferência
  const cdns = [
    'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js',
    'https://unpkg.com/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js'
  ];

  if (tentativa > cdns.length) {
    showToast('❌ Não foi possível carregar a biblioteca de PDF. Tente novamente mais tarde.', 'erro');
    return;
  }

  const script = document.createElement('script');
  script.src = cdns[tentativa - 1];
  script.async = true;

  // Sucesso: biblioteca carregada
  script.onload = () => {
    if (window.html2pdf) {
      showToast('✅ Biblioteca carregada!', 'sucesso');
      setTimeout(callback, 100); // Pequeno delay para garantir que a lib está pronta
    } else {
      showToast('⚠️ Erro ao inicializar PDF. Recarregue a página.', 'erro');
    }
  };

  // Erro: falha ao carregar - tenta próximo CDN
  script.onerror = () => {
    if (tentativa < cdns.length) {
      showToast(`⚠️ CDN indisponível, tentando alternativa...`, 'aviso');
      carregarHtml2Pdf(callback, tentativa + 1);
    } else {
      showToast('❌ Falha ao baixar biblioteca PDF. Verifique sua conexão.', 'erro');
    }
  };

  document.head.appendChild(script);
}

/* ===== CONFIGURAÇÃO DE TIPOS DE TREINO ===== */
const TIPO_CONFIG = {
  'Corrida Leve':  { cor: 'tipo-leve',        icon: '🟢' },
  'Fartlek':       { cor: 'tipo-fartlek',      icon: '🔵' },
  'Progressivo':   { cor: 'tipo-progressivo',  icon: '🟡' },
  'Intervalado':   { cor: 'tipo-intervalado',  icon: '🔴' },
  'Repetições':    { cor: 'tipo-repeticoes',   icon: '🟣' },
  'Bloco':         { cor: 'tipo-bloco',        icon: '🟠' },
  'Longão':        { cor: 'tipo-longao',       icon: '🔷' },
  'Rodagem':       { cor: 'tipo-longao',       icon: '🔵' },
  'Ritmado':       { cor: 'tipo-ritmado',      icon: '🟤' },
  'TRT':           { cor: 'tipo-trt',          icon: '⚡' },
  _default:        { cor: 'tipo-default',      icon: '🏃' }
};

function getTipoConfig(tipo) {
  if (!tipo) return TIPO_CONFIG._default;
  const chave = Object.keys(TIPO_CONFIG).find(k =>
    k !== '_default' && tipo.toLowerCase().includes(k.toLowerCase())
  );
  return chave ? TIPO_CONFIG[chave] : TIPO_CONFIG._default;
}

function iniciais(nome) {
  if (!nome) return '?';
  return nome.split(' ').map(p => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
}

/* ===== FORMATAÇÃO DE PACE ===== */
function formatarPace(segundos) {
  if (!segundos) return '—';
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  const s = Math.round(segundos % 60);
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}/km`;
  }
  return `${m}:${String(s).padStart(2, '0')}/km`;
}

function converterPaceParaSegundos(paceFormatado) {
  if (!paceFormatado) return null;
  const partes = paceFormatado.split(':').map(Number);
  if (partes.length === 2) {
    return partes[0] * 60 + partes[1];
  } else if (partes.length === 3) {
    return partes[0] * 3600 + partes[1] * 60 + partes[2];
  }
  return null;
}

function calcularDistanciaTotalTreino(blocos) {
  if (!blocos || !Array.isArray(blocos) || blocos.length === 0) {
    return 0;
  }
  let distanciaTotal = 0;
  blocos.forEach(bloco => {
    const distancia = parseFloat(bloco.distancia) || 0;
    const repeticoes = parseInt(bloco.repeticoes) || 1;
    distanciaTotal += distancia * repeticoes;
  });
  return parseFloat(distanciaTotal.toFixed(2));
}

/* ===== GERADOR DE IDs ÚNICOS ===== */
function gerarIDUnico() {
  // Combina timestamp + random string para garantir unicidade mesmo com múltiplos cliques rápidos
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${Math.random().toString(36).substr(2, 9)}`;
}
