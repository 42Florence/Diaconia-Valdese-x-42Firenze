// router.js - Gestione navigazione per OpenSpace

const Router = {
  currentView: null,
  previousView: 'home',

  navigate(viewName, params = {}) {
    this.previousView = this.currentView || 'home';
    this.currentView = viewName;
    
    const container = document.getElementById('app-content');
    const bottomNav = document.getElementById('bottom-nav');

    // Aggiorna active state su sidebar desktop e bottom nav mobile
    document.querySelectorAll('.nav-item-sidebar, .nav-item').forEach(item => {
      item.classList.remove('active');
      if (item.dataset.view === viewName) {
        item.classList.add('active');
        // Aggiorna aria-current per accessibilità
        item.setAttribute('aria-current', 'page');
      } else {
        item.removeAttribute('aria-current');
      }
    });

    // Mostra/nascondi bottom nav in base al dispositivo (Bootstrap lo gestisce, ma rinforziamo)
    if (bottomNav) {
      bottomNav.style.display = 'block'; // Bootstrap la nasconde automaticamente su lg
    }

    // Determina il contenuto della vista
    switch(viewName) {

      case 'home':
        container.innerHTML = Views.home();
        document.title = 'Home - OpenSpace';
        break;

      case 'documenti':
        container.innerHTML = Views.documenti();
        document.title = 'Documenti - OpenSpace';
        break;

      case 'richieste':
        container.innerHTML = Views.richieste();
        document.title = 'Richieste di firma - OpenSpace';
        break;

      case 'dettaglioDocumento':
        container.innerHTML = Views.dettaglioDocumento(params.id);
        if (typeof Views.initDettaglioDocumento === 'function') {
          Views.initDettaglioDocumento(params.id);
        }
        document.title = 'Documento - OpenSpace';
        break;

      case 'operatori':
        container.innerHTML = Views.operatori();
        document.title = 'Operatori di fiducia - OpenSpace';
        break;

      case 'log':
        container.innerHTML = Views.log(params.id || null);
        document.title = 'Registro accessi - OpenSpace';
        break;

      case 'profile':
        container.innerHTML = Views.profile();
        document.title = 'Profilo - OpenSpace';
        break;

      case 'publicProfile':
        container.innerHTML = Views.publicProfile(params.id);
        document.title = 'Profilo pubblico - OpenSpace';
        break;

      case 'impostazioni':
        container.innerHTML = Views.impostazioni();
        document.title = 'Impostazioni - OpenSpace';

        if (typeof Views.initImpostazioni === 'function') {
          Views.initImpostazioni();
        }
        break;

      case 'dashboardSupervisore':
        container.innerHTML = Views.dashboardSupervisore();
        document.title = 'Dashboard Supervisore - OpenSpace';
        break;

      case 'dashboardOperatore':
        container.innerHTML = Views.dashboardOperatore();
        document.title = 'Dashboard Operatore - OpenSpace';
        break;

      case 'messaggi':
        container.innerHTML = Views.messaggi();
        document.title = 'Messaggi - OpenSpace';
        break;

      case 'videochiamata':
        container.innerHTML = Views.videochiamata();
        document.title = 'Teleconferenza - OpenSpace';
        break;

      case 'community':
        container.innerHTML = Views.community();
        document.title = 'Comunità - OpenSpace';
        break;

      case 'calendario':
        container.innerHTML = Views.calendario();
        document.title = 'Calendario - OpenSpace';
        break;
        
      case 'notifiche':
        container.innerHTML = Views.notifiche();
        document.title = 'Notifiche - OpenSpace';
        break;

      default:
        container.innerHTML = Views.home();
        document.title = 'Home - OpenSpace';
    }
    // Focus sul contenuto principale per accessibilità
    // Imposta tabindex=-1 temporaneamente per permettere il focus programmatico
    container.setAttribute('tabindex', '-1');
    container.focus({ preventScroll: true });

    // Leggi automaticamente la pagina se TTS attivo
    if (typeof Accessibility !== 'undefined' && Accessibility.settings.ttsEnabled) {
      Accessibility.tts.readCurrentPage();
    }

    // Scroll in cima
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};