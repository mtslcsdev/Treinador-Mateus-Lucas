/* ================= DATA.JS - Estado Global e Persistência ================= */

/* ===== INICIALIZAÇÃO DOS DADOS ===== */
const STORAGE_KEY = "plannerCorrida";
const THEME_STORAGE_KEY = "plannerTema";
const DEFAULT_DATA = { atletas: [], ultimoBackup: null, zonas: null, biblioteca: [], templatesCiclo: [] };

// Verificar se localStorage está disponível
function verificarLocalStorage() {
  try {
    const teste = '__localStorage_test__';
    localStorage.setItem(teste, 'test');
    localStorage.removeItem(teste);
    return true;
  } catch (e) {
    return false;
  }
}

const localStorageDisponivel = verificarLocalStorage();

// Historico de ações (undo/redo)
let historico = {
  snapshots: [],
  index: -1,
  maxSnapshots: 20
};

// Expor globalmente
window.historico = historico;

let dados;
try {
  let stored;
  if (localStorageDisponivel) {
    stored = localStorage.getItem(STORAGE_KEY);
  }
  dados = stored ? JSON.parse(stored) : JSON.parse(JSON.stringify(DEFAULT_DATA));

  // Validar estrutura básica
  if (!dados || typeof dados !== 'object' || !Array.isArray(dados.atletas)) {
    throw new Error('Estrutura de dados inválida');
  }

  // Aplicar migrações de versão
  dados = migrarDados(dados);

  if (!localStorageDisponivel) {
    console.warn("localStorage está desabilitado. Dados não serão persistidos entre sessões.");
    showToast('⚠️ localStorage desabilitado. Dados não serão salvos!', 'aviso');
  }
} catch (e) {
  console.error("Erro ao carregar dados do localStorage. Limpando e reiniciando...", e);
  if (localStorageDisponivel) {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error("Erro ao limpar localStorage:", err);
    }
  }
  dados = JSON.parse(JSON.stringify(DEFAULT_DATA));
  dados = migrarDados(dados);
  showToast('⚠️ Dados foram corrompidos. Restaure um backup ou comece do zero.', 'aviso');
}

/* ===== ESTADO GLOBAL DA APLICAÇÃO ===== */
let atletaAtual = null;
let cicloAtual = null;
let modoEdicao = false;
let modoCalendario = false;
let filtroAtivo = { fase: "", busca: "" };
let zonasCalculadas = null;

/* ===== UNDO/REDO SYSTEM ===== */
let undoStack = [];
let redoStack = [];

function salvarSnapshot() {
  try {
    undoStack.push(JSON.stringify(dados));
    if (undoStack.length > 30) undoStack.shift();
    redoStack = [];
  } catch (e) {
    console.error("Erro ao criar snapshot:", e);
  }
}

function salvar() {
  salvarSnapshot();
  if (!localStorageDisponivel) {
    console.warn('localStorage não disponível. Dados não serão persistidos.');
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
    verificarBackup();
    // Criar backup automático de segurança (3 versões mantidas)
    if (typeof fazerBackupAutomaticoSeguranca === 'function') {
      fazerBackupAutomaticoSeguranca();
    }
  } catch (e) {
    if (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014) {
      showToast('Armazenamento cheio! Exporte um backup e apague dados antigos.', 'erro');
    } else {
      console.error('Erro ao salvar:', e);
    }
  }
}

function desfazer() {
  if (undoStack.length === 0) { showToast('Nada para desfazer.', 'info'); return; }
  redoStack.push(JSON.stringify(dados));
  dados = JSON.parse(undoStack.pop());
  if (localStorageDisponivel) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
    } catch (e) {
      console.error('Erro ao salvar ao desfazer:', e);
    }
  }
  atletaAtual = dados.atletas.find(a => a && a.id === atletaAtual?.id) || null;
  cicloAtual = atletaAtual?.ciclos?.find(c => c && c.id === cicloAtual?.id) || null;
  renderAtletas();
  if (atletaAtual) { renderCiclos(); atualizarBreadcrumb(); }
  if (cicloAtual) { renderSemanas(); atualizarSumario(); renderGraficoVolume(); renderProvaAlvo(); renderDashboardCiclo(); renderValidacaoCiclo(); }
  showToast('Ação desfeita.', 'info');
}

function refazer() {
  if (redoStack.length === 0) { showToast('Nada para refazer.', 'info'); return; }
  undoStack.push(JSON.stringify(dados));
  dados = JSON.parse(redoStack.pop());
  if (localStorageDisponivel) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
    } catch (e) {
      console.error('Erro ao salvar ao refazer:', e);
    }
  }
  atletaAtual = dados.atletas.find(a => a && a.id === atletaAtual?.id) || null;
  cicloAtual = atletaAtual?.ciclos?.find(c => c && c.id === cicloAtual?.id) || null;
  renderAtletas();
  if (atletaAtual) { renderCiclos(); atualizarBreadcrumb(); }
  if (cicloAtual) { renderSemanas(); atualizarSumario(); renderGraficoVolume(); renderProvaAlvo(); renderDashboardCiclo(); renderValidacaoCiclo(); }
  showToast('Ação refeita.', 'info');
}

/* ===== VALIDAÇÃO DE BACKUP ===== */
function validarBackup(obj) {
  if (!obj || typeof obj !== 'object') return false;
  if (!Array.isArray(obj.atletas)) return false;
  return obj.atletas.every(a =>
    a && a.id && typeof a.nome === 'string' && Array.isArray(a.ciclos)
  );
}

/* ===== MIGRAÇÃO DE DADOS ENTRE VERSÕES ===== */
function migrarDados(dados) {
  // Versão 1.0: estrutura inicial
  if (!dados.versao) {
    dados.versao = '1.0';
  }

  // Adicionar campos padrão se faltarem
  if (!dados.biblioteca) dados.biblioteca = [];
  if (!dados.templatesCiclo) dados.templatesCiclo = [];
  if (!dados.ultimoBackup) dados.ultimoBackup = null;

  // Validar e corrigir ciclos
  if (Array.isArray(dados.atletas)) {
    dados.atletas.forEach(atleta => {
      if (!Array.isArray(atleta.ciclos)) atleta.ciclos = [];
      if (!atleta.historicoPaces) atleta.historicoPaces = [];
      if (!atleta.notas) atleta.notas = '';

      atleta.ciclos.forEach(ciclo => {
        if (!Array.isArray(ciclo.semanas)) ciclo.semanas = [];
        ciclo.semanas.forEach(semana => {
          if (!Array.isArray(semana.treinos)) semana.treinos = [];
          semana.treinos.forEach(treino => {
            if (!treino.blocos) treino.blocos = [];
            if (!treino.modalidade) treino.modalidade = 'Corrida';
            if (!treino.feedback) treino.feedback = { sensacao: '', obs: '' };
          });
        });
      });
    });
  }

  return dados;
}

/* ===== VALIDAÇÕES ROBUSTAS ===== */
function validarIntegridadeDados() {
  try {
    if (!dados || typeof dados !== 'object') {
      throw new Error('Dados não é um objeto válido');
    }

    if (!Array.isArray(dados.atletas)) {
      throw new Error('Atletas não é um array');
    }

    // Validar cada atleta
    dados.atletas.forEach((atleta, idx) => {
      if (!atleta || typeof atleta !== 'object') {
        throw new Error(`Atleta ${idx} é inválido`);
      }
      if (!atleta.id || !atleta.nome) {
        throw new Error(`Atleta ${idx} falta id ou nome`);
      }
      if (!Array.isArray(atleta.ciclos)) {
        throw new Error(`Atleta ${idx} ciclos não é array`);
      }

      // Validar ciclos
      atleta.ciclos.forEach((ciclo, cidx) => {
        if (!ciclo || typeof ciclo !== 'object') {
          throw new Error(`Atleta ${idx} ciclo ${cidx} é inválido`);
        }
        if (!ciclo.id) {
          throw new Error(`Atleta ${idx} ciclo ${cidx} falta id`);
        }
        if (!Array.isArray(ciclo.semanas)) {
          throw new Error(`Atleta ${idx} ciclo ${cidx} semanas não é array`);
        }
      });
    });

    return { valido: true, erros: [], avisos: [] };
  } catch (e) {
    console.error('Erro na integridade dos dados:', e);
    return { valido: false, erros: [e.message], avisos: [] };
  }
}

function protegerOperacaoDestrutiva(operacao, callback) {
  const validation = validarIntegridadeDados();
  if (!validation.valido) {
    showToast('⚠️ Dados estão corrompidos. Restaure um backup.', 'erro');
    return false;
  }

  // Fazer backup de segurança antes da operação
  if (typeof fazerBackupAutomaticoSeguranca === 'function') {
    fazerBackupAutomaticoSeguranca();
  }

  try {
    callback();
    salvar();
    return true;
  } catch (e) {
    console.error(`Erro durante operação ${operacao}:`, e);
    showToast(`❌ Erro: ${operacao} falhou. Tente novamente.`, 'erro');
    return false;
  }
}
