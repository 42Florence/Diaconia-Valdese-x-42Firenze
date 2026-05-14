// FirmaWidget.js - Componente di firma assistita accessibile

const FirmaWidget = {
  /**
   * Renderizza l'interfaccia di firma per un documento.
   * @param {Object} doc - Documento da firmare
   * @returns {string} HTML del widget
   */
  render(doc) {
    const isEasy = Accessibility.settings.easyMode;
    const isADHD = Accessibility.settings.profileADHD;
    const isAutism = Accessibility.settings.profileAutism;
    
    const btnClass = `btn btn-lg ${isEasy ? 'fs-3 py-3 px-4' : ''}`;
    const containerClass = `p-4 ${isADHD ? 'bg-light' : ''}`;
    
    return `
      <div class="firma-widget ${containerClass}" role="region" aria-label="Sezione di firma">
        ${isADHD ? '<div class="progress-indicator mb-3">Passo 1: scegli come firmare</div>' : ''}
        
        <p class="mb-4 ${isEasy ? 'fs-5' : ''}">
          <i class="fa-solid fa-pen-to-square me-2" aria-hidden="true"></i>
          ${isEasy ? 'Come vuoi firmare?' : 'Come vuoi firmare il documento?'}
        </p>
        
        <div class="d-grid gap-3 ${isEasy ? '' : 'd-md-flex'}">
          <button class="${btnClass} btn-success" id="btn-firma-pollice" aria-label="Firma con un tocco">
            <i class="fa-solid fa-hand-pointer me-2" aria-hidden="true"></i>
            ${isEasy ? 'Tocca per firmare' : 'Firma con un pollice'}
          </button>
          
          <button class="${btnClass} btn-primary" id="btn-firma-vocale" aria-label="Firma con la voce">
            <i class="fa-solid fa-microphone me-2" aria-hidden="true"></i>
            ${isEasy ? 'Parla per firmare' : 'Firma con la voce'}
          </button>
          
          <button class="${btnClass} btn-secondary" id="btn-firma-differita" aria-label="Firma più tardi">
            <i class="fa-solid fa-clock me-2" aria-hidden="true"></i>
            ${isEasy ? 'Più tardi' : 'Firma in differita'}
          </button>
        </div>
        
        <!-- Area per la registrazione vocale (nascosta di default) -->
        <div id="voice-area" class="mt-3 p-3 bg-light rounded-3" style="display:none" aria-live="polite">
          <div class="d-flex align-items-center gap-3">
            <i class="fa-solid fa-microphone-lines fa-2x text-danger" aria-hidden="true"></i>
            <span id="voice-status">Ascolto... dì "Sì, accetto" per firmare.</span>
          </div>
          <button class="btn btn-sm btn-outline-danger mt-2" id="btn-annulla-voce">Annulla</button>
        </div>
      </div>
    `;
  },

  /**
   * Inizializza gli event listener dopo il rendering.
   * @param {Object} doc - Documento corrente
   * @param {Function} onFirmaCallback - Funzione da chiamare dopo la firma (con modalità)
   */
  init(doc, onFirmaCallback) {
    // Pulsante pollice
    const btnPollice = document.getElementById('btn-firma-pollice');
    if (btnPollice) {
      btnPollice.addEventListener('click', () => {
        Accessibility.announce('Documento firmato con tocco.');
        if (onFirmaCallback) onFirmaCallback('pollice');
      });
    }

    // Pulsante vocale (simulazione)
    const btnVocale = document.getElementById('btn-firma-vocale');
    const voiceArea = document.getElementById('voice-area');
    if (btnVocale && voiceArea) {
      btnVocale.addEventListener('click', () => {
        voiceArea.style.display = 'block';
        Accessibility.announce('Registrazione vocale avviata. Di sì, accetto per firmare.');
        // Simuliamo la registrazione: dopo 3 secondi conferma
        window._firmaVocaleTimer = setTimeout(() => {
          voiceArea.style.display = 'none';
          Accessibility.announce('Documento firmato con voce.');
          if (onFirmaCallback) onFirmaCallback('vocale');
        }, 3000);
      });
      
      // Annulla registrazione
      const btnAnnulla = document.getElementById('btn-annulla-voce');
      if (btnAnnulla) {
        btnAnnulla.addEventListener('click', () => {
          clearTimeout(window._firmaVocaleTimer);
          voiceArea.style.display = 'none';
          Accessibility.announce('Firma vocale annullata.');
        });
      }
    }

    // Pulsante differita
    const btnDifferita = document.getElementById('btn-firma-differita');
    if (btnDifferita) {
      btnDifferita.addEventListener('click', () => {
        Accessibility.announce('Documento salvato, potrai firmarlo più tardi.');
        if (onFirmaCallback) onFirmaCallback('differita');
      });
    }

    // Se TTS è attivo, leggi il consenso all'apertura
    if (Accessibility.settings.ttsEnabled) {
      const testoConsenso = `Stai per firmare: ${doc.titolo}. ${doc.descrizione}`;
      Accessibility.tts.speak(testoConsenso);
    }
  }
};