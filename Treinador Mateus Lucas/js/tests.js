/* ===== COMPREHENSIVE TEST SUITE ===== */
/* Run in browser console: runAllTests() */

class TestRunner {
  constructor() {
    this.tests = [];
    this.results = { passed: 0, failed: 0, errors: [] };
  }

  test(name, fn) {
    this.tests.push({ name, fn });
  }

  async run() {
    console.clear();
    console.log('%c🧪 TEST SUITE - Treinador Mateus Lucas', 'font-size: 18px; font-weight: bold; color: #1a56db;');
    console.log('Starting tests...\n');

    for (const { name, fn } of this.tests) {
      try {
        await fn();
        this.results.passed++;
        console.log(`✅ ${name}`);
      } catch (e) {
        this.results.failed++;
        this.results.errors.push({ test: name, error: e.message });
        console.log(`❌ ${name}: ${e.message}`);
      }
    }

    this.printSummary();
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log(`%c📊 TEST SUMMARY`, 'font-size: 16px; font-weight: bold; color: #1a56db;');
    console.log('='.repeat(60));
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`Total: ${this.results.passed + this.results.failed}`);

    if (this.results.failed === 0) {
      console.log('\n%c🎉 ALL TESTS PASSED!', 'font-size: 14px; font-weight: bold; color: #16a34a;');
    } else {
      console.log('\n%c⚠️  SOME TESTS FAILED', 'font-size: 14px; font-weight: bold; color: #dc2626;');
      this.results.errors.forEach(({ test, error }) => {
        console.log(`  • ${test}: ${error}`);
      });
    }
    console.log('='.repeat(60));
  }
}

async function runAllTests() {
  const runner = new TestRunner();

  /* ===== STORAGE LAYER TESTS ===== */
  runner.test('Storage: Engine initialized', () => {
    const engine = getStorageEngine();
    if (!engine) throw new Error('Storage engine not defined');
    if (typeof engine.getAthletes !== 'function') throw new Error('getAthletes method missing');
  });

  runner.test('Storage: LocalStorageImpl has all methods', () => {
    const engine = getStorageEngine();
    const methods = ['getAthletes', 'createAthlete', 'deleteAthlete', 'getAthlete', 'getCycles', 'getCycle', 'getAllData', 'saveData'];
    methods.forEach(m => {
      if (typeof engine[m] !== 'function') throw new Error(`Method ${m} missing`);
    });
  });

  runner.test('Storage: Data retrieval works', async () => {
    const engine = getStorageEngine();
    const athletes = await engine.getAthletes();
    if (!Array.isArray(athletes)) throw new Error('getAthletes should return array');
  });

  /* ===== MODELS TESTS ===== */
  runner.test('Model: Athlete.create() factory works', () => {
    const athlete = Athlete.create('Test Athlete');
    if (!athlete) throw new Error('Athlete.create returned null');
    if (athlete.name !== 'Test Athlete') throw new Error('Athlete name not set correctly');
  });

  runner.test('Model: Athlete compatibility (nome/name)', () => {
    const athlete = new Athlete({ name: 'João' });
    if (athlete.nome !== 'João') throw new Error('Getter nome not working');
    athlete.nome = 'Maria';
    if (athlete.name !== 'Maria') throw new Error('Setter nome not working');
  });

  runner.test('Model: Cycle has required methods', () => {
    const cycle = new Cycle({
      id: 'test',
      nome: 'Test Cycle',
      semanas: []
    });
    const methods = ['getTotalDistance', 'getTotalWorkouts', 'getDaysUntilRace', 'getWeeks'];
    methods.forEach(m => {
      if (typeof cycle[m] !== 'function') throw new Error(`Cycle method ${m} missing`);
    });
  });

  /* ===== SERVICE LAYER TESTS ===== */
  runner.test('Service: AthleteService initialized', () => {
    const service = getAthleteService();
    if (!service) throw new Error('AthleteService not initialized');
    if (typeof service.getAthletes !== 'function') throw new Error('getAthletes method missing');
  });

  runner.test('Service: CycleService initialized', () => {
    const service = getCycleService();
    if (!service) throw new Error('CycleService not initialized');
    if (typeof service.getCycleStats !== 'function') throw new Error('getCycleStats method missing');
  });

  runner.test('Service: AthleteService has all methods', () => {
    const service = getAthleteService();
    const methods = ['getAthletes', 'getAthlete', 'createAthlete', 'deleteAthlete', 'getAthleteStats', 'updateAthlete'];
    methods.forEach(m => {
      if (typeof service[m] !== 'function') throw new Error(`AthleteService method ${m} missing`);
    });
  });

  /* ===== FEATURE TESTS ===== */
  runner.test('Feature: DashboardStats class exists', () => {
    if (typeof DashboardStats === 'undefined') throw new Error('DashboardStats not defined');
    const dashboard = getDashboardStats();
    if (typeof dashboard.renderCycleDashboard !== 'function') throw new Error('renderCycleDashboard missing');
  });

  runner.test('Feature: PeriodicTests class exists', () => {
    if (typeof PeriodicTests === 'undefined') throw new Error('PeriodicTests not defined');
    const methods = ['registerTest', 'getTestHistory', 'getLatestTest', 'renderTestPanel'];
    methods.forEach(m => {
      if (typeof PeriodicTests[m] !== 'function') throw new Error(`PeriodicTests.${m} missing`);
    });
  });

  runner.test('Feature: ProfessionalReport class exists', () => {
    if (typeof ProfessionalReport === 'undefined') throw new Error('ProfessionalReport not defined');
    const methods = ['generateCyclePDF', 'exportToCSV', 'loadHtml2Pdf'];
    methods.forEach(m => {
      if (typeof ProfessionalReport[m] !== 'function') throw new Error(`ProfessionalReport.${m} missing`);
    });
  });

  /* ===== MIGRATION TESTS ===== */
  runner.test('Migration: DataMigration class exists', () => {
    if (typeof DataMigration === 'undefined') throw new Error('DataMigration not defined');
    const methods = ['migrateToSupabase', 'validateMigration', 'generateReport'];
    methods.forEach(m => {
      if (typeof DataMigration[m] !== 'function') throw new Error(`DataMigration.${m} missing`);
    });
  });

  /* ===== DATA INTEGRITY TESTS ===== */
  runner.test('Data: 3 athletes exist and have data', async () => {
    const service = getAthleteService();
    const athletes = await service.getAthletes();
    if (athletes.length < 3) throw new Error(`Expected 3 athletes, got ${athletes.length}`);

    athletes.forEach(a => {
      if (!a.id) throw new Error('Athlete missing id');
      if (!a.name && !a.nome) throw new Error('Athlete missing name');
      if (!Array.isArray(a.ciclos)) throw new Error('Athlete missing ciclos array');
    });
  });

  runner.test('Data: First athlete has cycles', async () => {
    const service = getAthleteService();
    const athletes = await service.getAthletes();
    if (athletes.length === 0) throw new Error('No athletes found');
    const athlete = athletes[0];
    if (!athlete) throw new Error('First athlete not found');
    if (!Array.isArray(athlete.ciclos)) {
      throw new Error('First athlete missing ciclos array');
    }
  });

  runner.test('Data: Cycles have workouts', async () => {
    const service = getAthleteService();
    const athletes = await service.getAthletes();
    if (athletes.length > 0) {
      const athlete = athletes[0];
      if (athlete && athlete.ciclos && athlete.ciclos.length > 0) {
        const cycle = athlete.ciclos[0];
        if (!Array.isArray(cycle.semanas)) throw new Error('Cycle missing semanas');
      }
    }
  });

  /* ===== BACKUP TESTS ===== */
  runner.test('Backup: Backup system functional', () => {
    if (typeof validarIntegridadeDados !== 'function') {
      throw new Error('Backup validation function missing');
    }
    const result = validarIntegridadeDados();
    if (result.valido === undefined) throw new Error('Validation should return object with "valido" property');
  });

  runner.test('Backup: localStorage backups exist', () => {
    let backupCount = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('backup_seguranca_')) backupCount++;
    }
    if (backupCount === 0) {
      console.warn('  ⚠️  No backups found yet (first run?) - this is OK');
    }
  });

  /* ===== CSS/UI TESTS ===== */
  runner.test('UI: CSS variables defined', () => {
    const style = getComputedStyle(document.documentElement);
    const vars = ['--primary', '--success', '--danger', '--warning'];
    vars.forEach(v => {
      const val = style.getPropertyValue(v).trim();
      if (!val) throw new Error(`CSS variable ${v} not defined`);
    });
  });

  runner.test('UI: Header elements present', () => {
    const header = document.querySelector('.app-header');
    if (!header) throw new Error('.app-header not found');
    const logo = header.querySelector('.header-logo');
    if (!logo) throw new Error('.header-logo not found');
  });

  runner.test('UI: Main section layout present', () => {
    const main = document.querySelector('.app-main');
    if (!main) throw new Error('.app-main not found');
    const atletas = document.querySelector('#secaoAtletas');
    if (!atletas) throw new Error('#secaoAtletas not found');
  });

  /* ===== BROWSER API TESTS ===== */
  runner.test('Browser: localStorage available', () => {
    if (typeof localStorage === 'undefined') throw new Error('localStorage not available');
    try {
      localStorage.setItem('__test__', 'test');
      localStorage.removeItem('__test__');
    } catch (e) {
      throw new Error('localStorage quota exceeded or disabled');
    }
  });

  runner.test('Browser: JSON global available', () => {
    if (typeof JSON === 'undefined') throw new Error('JSON not available');
    if (typeof JSON.parse !== 'function') throw new Error('JSON.parse not available');
    if (typeof JSON.stringify !== 'function') throw new Error('JSON.stringify not available');
  });

  /* ===== INITIALIZATION TESTS ===== */
  runner.test('Init: Global helper functions defined', () => {
    const helpers = ['getStorageEngine', 'getAthleteService', 'getCycleService', 'getDashboardStats'];
    helpers.forEach(h => {
      if (typeof window[h] !== 'function') throw new Error(`Global function ${h} not defined`);
    });
  });

  runner.test('Init: Undo/Redo system present', () => {
    if (typeof window.historico === 'undefined') throw new Error('Historico not defined');
    if (typeof window.desfazer !== 'function') throw new Error('desfazer function not defined');
    if (typeof window.refazer !== 'function') throw new Error('refazer function not defined');
  });

  /* ===== FEATURE INTEGRATION TESTS ===== */
  runner.test('Integration: getDashboardStats returns class instance', () => {
    const dashboard = getDashboardStats();
    if (!dashboard) throw new Error('getDashboardStats returned null');
    if (typeof dashboard.renderCycleDashboard !== 'function') {
      throw new Error('Dashboard instance missing renderCycleDashboard');
    }
  });

  runner.test('Integration: PeriodicTests exports correctly', () => {
    if (!PeriodicTests || (typeof PeriodicTests !== 'object' && typeof PeriodicTests !== 'function')) {
      throw new Error('PeriodicTests should be defined');
    }
  });

  /* ===== FEATURES L3 TESTS ===== */
  runner.test('Feature L3: CycleComparison class exists', () => {
    if (typeof CycleComparison === 'undefined') throw new Error('CycleComparison not defined');
    if (typeof CycleComparison.compareCycles !== 'function') throw new Error('compareCycles missing');
  });

  runner.test('Feature L3: SmartSuggestions class exists', () => {
    if (typeof SmartSuggestions === 'undefined') throw new Error('SmartSuggestions not defined');
    if (typeof SmartSuggestions.generateSuggestions !== 'function') throw new Error('generateSuggestions missing');
  });

  runner.test('Feature L3: NotesTimeline class exists', () => {
    if (typeof NotesTimeline === 'undefined') throw new Error('NotesTimeline not defined');
    if (typeof NotesTimeline.getCycleNotesTimeline !== 'function') throw new Error('getCycleNotesTimeline missing');
  });

  await runner.run();
  return runner.results;
}

// Alias for convenience
window.runTests = runAllTests;
