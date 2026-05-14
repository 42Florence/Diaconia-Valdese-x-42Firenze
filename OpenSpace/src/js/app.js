// app.js - Inizializzazione applicazione OpenSpace

const App = {
  init() {
    Auth.init();
    
    // Carica le impostazioni di accessibilità globali (da localStorage)
    if (typeof Accessibility !== 'undefined') {
      Accessibility.load();
    }

    // Attiva i tooltip di Bootstrap (per le credenziali demo)
    this.initTooltips();

    // Listener per sidebar desktop
    document.querySelectorAll('.nav-item-sidebar').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        Router.navigate(item.dataset.view);
      });
    });

    // Listener per bottom nav mobile
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        Router.navigate(item.dataset.view);
      });
    });

    // Listener delegato per card documenti
    const appContent = document.getElementById('app-content');
    if (appContent) {
      appContent.addEventListener('click', (e) => {
        const card = e.target.closest('.document-card');
        if (card) {
          Router.navigate('dettaglioDocumento', { id: card.dataset.id });
        }
      });
    }

    // Gestione login: associa l'evento submit del form (se esiste)
    const loginForm = document.querySelector('#login-modal form');
    if (loginForm) {
      loginForm.addEventListener('submit', App.handleLogin);
    }

    this.checkAuth();
    
    console.log('OpenSpace inizializzato ✨');
    console.log('Canale di fiducia per firme assistite');
  },

  // Inizializza i tooltip Bootstrap (richiede bootstrap.bundle.js)
  initTooltips() {
    if (typeof bootstrap !== 'undefined') {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
  },

  checkAuth() {
    const landingPage = document.getElementById('landing-page');
    const appContainer = document.getElementById('app-container');
    const loginModal = document.getElementById('login-modal');
    
    if (Auth.isLoggedIn()) {
      if (landingPage) landingPage.style.display = 'none';
      if (appContainer) appContainer.style.display = 'block';
      if (loginModal) loginModal.style.display = 'none';
      document.body.classList.remove('landing-mode');
      Router.navigate('home');
    } else {
      if (landingPage) landingPage.style.display = 'block';
      if (appContainer) appContainer.style.display = 'none';
      document.body.classList.add('landing-mode');
    }
  },

  // ========================
  // MODALI
  // ========================

  showLogin() {
    document.getElementById('login-modal').style.display = 'flex';
    document.body.classList.add('modal-open');
  },
  hideLogin() {
    document.getElementById('login-modal').style.display = 'none';
    document.body.classList.remove('modal-open');
  },

  showRegister() {
    document.getElementById('register-modal').style.display = 'flex';
    document.body.classList.add('modal-open');
  },
  hideRegister() {
    document.getElementById('register-modal').style.display = 'none';
    document.body.classList.remove('modal-open');
  },

  showRecupero() {
    // Chiudi eventualmente login prima di aprire recupero
    this.hideLogin();
    document.getElementById('recupero-modal').style.display = 'flex';
    document.body.classList.add('modal-open');
  },
  hideRecupero() {
    document.getElementById('recupero-modal').style.display = 'none';
    document.body.classList.remove('modal-open');
  },

  // Gestione login
  handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email')?.value.trim();
    const password = document.getElementById('login-password')?.value.trim();
    const errorDiv = document.getElementById('login-error');
    
    if (errorDiv) errorDiv.style.display = 'none';
    
    if (!email || !email.includes('@')) {
      if (errorDiv) {
        errorDiv.textContent = 'Inserisci un indirizzo email valido.';
        errorDiv.style.display = 'block';
      }
      return;
    }
    if (!password) {
      if (errorDiv) {
        errorDiv.textContent = 'La password è obbligatoria.';
        errorDiv.style.display = 'block';
      }
      return;
    }
    
    const result = Auth.login(email, password);
    
    if (result.success) {
      const user = Auth.getUser();
      if (user && typeof Accessibility !== 'undefined') {
        Accessibility.loadFromUser(user);
      }
      App.hideLogin();
      App.checkAuth();
    } else {
      if (errorDiv) {
        errorDiv.textContent = result.error || 'Credenziali non valide.';
        errorDiv.style.display = 'block';
      }
    }
  },

  // Gestione recupero credenziali
  handleRecupero(e) {
    e.preventDefault();
    const email = document.getElementById('recupero-email')?.value.trim();
    if (!email || !email.includes('@')) {
      alert('Inserisci un\'email valida.');
      return;
    }
    // Simula invio email
    alert(`Abbiamo inviato un link di recupero a ${email}. Controlla la tua casella di posta (demo)! 📧`);
    this.hideRecupero();
    this.showLogin();
  }
};

// Avvio quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});