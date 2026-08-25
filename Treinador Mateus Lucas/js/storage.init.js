/* ===== STORAGE ENGINE INITIALIZATION ===== */

// Instância global do storage engine
let storageEngine = null;

/**
 * Inicializar o engine de storage (localStorage por enquanto)
 * No futuro, pode ser trocado por Supabase mudando apenas esta função
 */
function initializeStorage(type = 'localStorage', config = {}) {
  try {
    if (type === 'localStorage') {
      storageEngine = new LocalStorageImpl();
    } else if (type === 'supabase') {
      if (!config.supabaseClient) {
        throw new Error('supabaseClient obrigatório para tipo supabase');
      }
      storageEngine = new SupabaseStorageImpl(config.supabaseClient);
    } else {
      throw new Error(`Tipo de storage desconhecido: ${type}`);
    }

    return storageEngine;
  } catch (e) {
    console.error('Erro ao inicializar storage:', e);
    throw e;
  }
}

/**
 * Obter instância do storage engine
 */
function getStorageEngine() {
  if (!storageEngine) {
    console.warn('Storage engine não inicializado, usando localStorage por padrão');
    initializeStorage('localStorage');
  }
  return storageEngine;
}

/**
 * Trocar o storage engine em tempo de execução
 * Útil para debugging ou migração
 */
function switchStorageEngine(type, config) {
  const oldEngine = storageEngine;

  try {
    initializeStorage(type, config);
    return true;
  } catch (e) {
    console.error('Erro ao trocar storage engine:', e);
    storageEngine = oldEngine;
    return false;
  }
}

// Inicializar automaticamente ao carregar este arquivo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeStorage('localStorage');
  });
} else {
  initializeStorage('localStorage');
}
