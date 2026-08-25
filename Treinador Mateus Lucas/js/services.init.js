/* ===== SERVICES INITIALIZATION ===== */

// Instâncias globais dos serviços
let athleteService = null;
let cycleService = null;

/**
 * Inicializar serviços (automático)
 */
function initializeServices() {
  try {
    const storage = getStorageEngine();

    athleteService = new AthleteService(storage);
    cycleService = new CycleService(storage);

    return true;
  } catch (e) {
    console.error('Erro ao inicializar services:', e);
    return false;
  }
}

/**
 * Obter serviço de atleta
 */
function getAthleteService() {
  if (!athleteService) {
    console.warn('AthleteService não inicializado, inicializando agora...');
    initializeServices();
  }
  return athleteService;
}

/**
 * Obter serviço de ciclo
 */
function getCycleService() {
  if (!cycleService) {
    console.warn('CycleService não inicializado, inicializando agora...');
    initializeServices();
  }
  return cycleService;
}

// Inicializar automaticamente quando storage estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => initializeServices(), 100);
});

// Fallback: inicializar mesmo que não houver DOMContentLoaded
if (document.readyState === 'complete') {
  initializeServices();
}
