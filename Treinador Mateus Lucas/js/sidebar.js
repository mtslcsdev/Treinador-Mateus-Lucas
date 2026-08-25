/* ===== SIDEBAR MENU SYSTEM ===== */
/* Menu lateral tipo SisRUN com navegação e configurações */

class SidebarMenu {
  constructor() {
    this.isOpen = false;
    this.currentView = 'athletes';
    this.init();
  }

  init() {
    this.createSidebar();
    this.attachEventListeners();
  }

  createSidebar() {
    // Verificar se já existe
    if (document.getElementById('sidebar-container')) return;

    const sidebar = document.createElement('div');
    sidebar.id = 'sidebar-container';
    sidebar.className = 'sidebar-container';
    sidebar.innerHTML = `
      <!-- Sidebar backdrop (fecha ao clicar) -->
      <div class="sidebar-backdrop" id="sidebarBackdrop"></div>

      <!-- Sidebar menu -->
      <nav class="sidebar-menu" id="sidebarMenu">
        <!-- Header da sidebar -->
        <div class="sidebar-header">
          <h3>⚙️ Menu</h3>
          <button class="sidebar-close-btn" id="closeSidebarBtn" aria-label="Fechar menu">✕</button>
        </div>

        <!-- Menu items -->
        <ul class="sidebar-items">
          <!-- Seção: Navegação Principal -->
          <li class="sidebar-section-title">Navegação</li>

          <li class="sidebar-item" data-view="athletes">
            <button class="sidebar-link" onclick="sidebarMenu.navigateTo('athletes')">
              <span class="sidebar-icon">👥</span>
              <span class="sidebar-label">Atletas</span>
            </button>
          </li>

          <li class="sidebar-item" data-view="dashboard">
            <button class="sidebar-link" onclick="sidebarMenu.navigateTo('dashboard')">
              <span class="sidebar-icon">📊</span>
              <span class="sidebar-label">Dashboard</span>
            </button>
          </li>

          <li class="sidebar-item" data-view="analytics">
            <button class="sidebar-link" onclick="sidebarMenu.navigateTo('analytics')">
              <span class="sidebar-icon">📈</span>
              <span class="sidebar-label">Análises</span>
            </button>
          </li>

          <!-- Seção: Configurações -->
          <li class="sidebar-section-title" style="margin-top: 20px;">Configurações</li>

          <li class="sidebar-item">
            <button class="sidebar-link" onclick="exportarBackup(); sidebarMenu.close()">
              <span class="sidebar-icon">💾</span>
              <span class="sidebar-label">Exportar Backup</span>
            </button>
          </li>

          <li class="sidebar-item">
            <button class="sidebar-link" onclick="importarBackup(); sidebarMenu.close()">
              <span class="sidebar-icon">📥</span>
              <span class="sidebar-label">Importar Backup</span>
            </button>
          </li>

          <li class="sidebar-item">
            <button class="sidebar-link" onclick="validarIntegridadeDados(); sidebarMenu.close()">
              <span class="sidebar-icon">✔️</span>
              <span class="sidebar-label">Validar Dados</span>
            </button>
          </li>

          <li class="sidebar-item">
            <button class="sidebar-link" onclick="abrirDialogoLimparDados(); sidebarMenu.close()">
              <span class="sidebar-icon">🗑️</span>
              <span class="sidebar-label">Limpar Dados</span>
            </button>
          </li>

          <!-- Seção: Tema -->
          <li class="sidebar-section-title" style="margin-top: 20px;">Aparência</li>

          <li class="sidebar-item">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; color: var(--text-primary);">
              <span class="sidebar-label">🌙 Dark Mode</span>
              <div class="toggle-switch" id="toggleDarkModeSidebar" onclick="toggleDarkMode()" style="width: 44px; height: 22px;"></div>
            </div>
          </li>

          <!-- Seção: Ajuda -->
          <li class="sidebar-section-title" style="margin-top: 20px;">Ajuda</li>

          <li class="sidebar-item">
            <button class="sidebar-link" onclick="mostrarGuiaRapida(); sidebarMenu.close()">
              <span class="sidebar-icon">❓</span>
              <span class="sidebar-label">Guia Rápido</span>
            </button>
          </li>

          <li class="sidebar-item">
            <button class="sidebar-link" onclick="mostrarSobreApp(); sidebarMenu.close()">
              <span class="sidebar-icon">ℹ️</span>
              <span class="sidebar-label">Sobre</span>
            </button>
          </li>
        </ul>

        <!-- Footer -->
        <div class="sidebar-footer">
          <p style="font-size: 12px; color: var(--text-muted); margin: 0;">v1.0.0 • Treinador Mateus Lucas</p>
        </div>
      </nav>
    `;

    document.body.insertBefore(sidebar, document.body.firstChild);
  }

  attachEventListeners() {
    // Hamburger button no header
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    if (hamburgerBtn) {
      hamburgerBtn.addEventListener('click', () => this.toggle());
    }

    // Close button
    const closeBtn = document.getElementById('closeSidebarBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Backdrop click para fechar
    const backdrop = document.getElementById('sidebarBackdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => this.close());
    }

    // ESC key para fechar
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    const container = document.getElementById('sidebar-container');
    if (container) {
      container.classList.add('open');
      this.isOpen = true;
      document.body.style.overflow = 'hidden'; // Prevent scroll
    }
  }

  close() {
    const container = document.getElementById('sidebar-container');
    if (container) {
      container.classList.remove('open');
      this.isOpen = false;
      document.body.style.overflow = '';
    }
  }

  navigateTo(view) {
    this.currentView = view;

    // Atualizar active state
    document.querySelectorAll('.sidebar-item[data-view]').forEach(item => {
      item.classList.remove('active');
    });
    const activeItem = document.querySelector(`.sidebar-item[data-view="${view}"]`);
    if (activeItem) {
      activeItem.classList.add('active');
    }

    // Navegar
    switch (view) {
      case 'athletes':
        mostrarAreaAtletas();
        break;
      case 'dashboard':
        mostrarDashboard();
        break;
      case 'analytics':
        mostrarAnalytics();
        break;
    }

    this.close();
  }
}

// Instância global
let sidebarMenu;

// Inicializar quando document carrega
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    sidebarMenu = new SidebarMenu();
  });
} else {
  sidebarMenu = new SidebarMenu();
}

// Funções de navegação
function mostrarAreaAtletas() {
  const atletas = document.getElementById('secaoAtletas');
  const ciclos = document.getElementById('areaCiclos');
  const semanas = document.getElementById('areaSemanas');
  const dashboardArea = document.getElementById('dashboardArea');
  const analyticsArea = document.getElementById('analyticsArea');

  if (atletas) atletas.classList.remove('hidden');
  if (ciclos) ciclos.classList.add('hidden');
  if (semanas) semanas.classList.add('hidden');
  if (dashboardArea) dashboardArea.classList.add('hidden');
  if (analyticsArea) analyticsArea.classList.add('hidden');
}

function mostrarDashboard() {
  const atletas = document.getElementById('secaoAtletas');
  const ciclos = document.getElementById('areaCiclos');
  const semanas = document.getElementById('areaSemanas');
  const dashboardArea = document.getElementById('dashboardArea');
  const analyticsArea = document.getElementById('analyticsArea');

  if (atletas) atletas.classList.add('hidden');
  if (ciclos) ciclos.classList.add('hidden');
  if (semanas) semanas.classList.add('hidden');
  if (analyticsArea) analyticsArea.classList.add('hidden');
  if (dashboardArea) {
    dashboardArea.classList.remove('hidden');
    atualizarDashboardGrafico();
  }
}

function mostrarAnalytics() {
  const atletas = document.getElementById('secaoAtletas');
  const ciclos = document.getElementById('areaCiclos');
  const semanas = document.getElementById('areaSemanas');
  const dashboardArea = document.getElementById('dashboardArea');
  const analyticsArea = document.getElementById('analyticsArea');

  if (atletas) atletas.classList.add('hidden');
  if (ciclos) ciclos.classList.add('hidden');
  if (semanas) semanas.classList.add('hidden');
  if (dashboardArea) dashboardArea.classList.add('hidden');
  if (analyticsArea) {
    analyticsArea.classList.remove('hidden');
    atualizarAnalytics();
  }
}

// Stubs para futuras implementações
function mostrarGuiaRapida() {
  alert('Guia Rápido:\n\n1. Adicione atletas\n2. Crie ciclos de treino\n3. Registre treinos\n4. Acompanhe progresso no Dashboard');
}

function mostrarSobreApp() {
  alert('Treinador Mateus Lucas v1.0.0\n\nApp profissional para gerenciamento de ciclos de treinamento de corrida.\n\n© 2026 • Desenvolvido por Claude Code');
}

function abrirDialogoLimparDados() {
  if (confirm('⚠️ AVISO: Isso apagará TODOS os dados do app!\n\nDeseja continuar?')) {
    if (confirm('Tem certeza? Esta ação não pode ser desfeita!')) {
      localStorage.clear();
      alert('✅ Dados apagados. Recarregando...');
      location.reload();
    }
  }
}
