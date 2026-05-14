// FirmaWidget.js - Pulsanti di firma accessibili

const FirmaWidget = {
  render(docId) {
    const idUnivoco = 'firma-' + docId;
    
    // Attacca eventi dopo il render
    setTimeout(() => {
      this.attachEvents(idUnivoco, docId);
    }, 10);

    return `
      <div class="card mb-4 border-success" id="${idUnivoco}">
        <div class="card-body text-center">
          <h6 class="card-title mb-3"><i class="fa-solid fa-pen-to-square me-2"></i>Firma il documento</h6>
          <p class="small text-muted mb-3">Scegli come vuoi firmare:</p>

          <!-- Pulsanti principali -->
          <div class="d-grid gap-3 mb-3">
            <button class="btn btn-success btn-lg firma-pulsante" data-azione="firma" data-doc="${docId}" style="min-height:56px;font-size:1.3rem">
              <i class="fa-solid fa-check me-2"></i>Firma ✅
            </button>
            <button class="btn btn-outline-danger btn-lg firma-pulsante" data-azione="rifiuta" data-doc="${docId}" style="min-height:56px;font-size:1.3rem">
              <i class="fa-solid fa-xmark me-2"></i>Rifiuta ❌
            </button>
          </div>

          <!-- Firma vocale -->
          <div class="mb-3">
            <button class="btn btn-outline-primary btn-lg w-100 firma-pulsante" data-azione="firmaVocale" data-doc="${docId}">
              <i class="fa-solid fa-microphone me-2"></i>Firma vocale (registra "Sì, accetto")
            </button>
          </div>

          <!-- Firma differita -->
          <button class="btn btn-outline-secondary w-100 firma-pulsante" data-azione="differisci" data-doc="${docId}">
            <i class="fa-solid fa-clock me-2"></i>Firma in un secondo momento
          </button>

          <!-- Stato feedback -->
          <div class="firma-feedback mt-3" style="display:none"></div>
        </div>
      </div>`;
  },

  attachEvents(idWidget, docId) {
    const widget = document.getElementById(idWidget);
    if (!widget) return;

    widget.querySelectorAll('.firma-pulsante').forEach(btn => {
      btn.addEventListener('click', () => {
        const azione = btn.dataset.azione;
        this.eseguiAzione(azione, docId, widget);
      });
    });
  },

  eseguiAzione(azione, docId, widget) {
    const doc = DOCUMENTI.find(d => d.id === docId);
    if (!doc) return;

    const user = Auth.getUser();
    const feedbackDiv = widget.querySelector('.firma-feedback');

    switch(azione) {
      case 'firma':
        doc.stato = 'firmato';
        doc.dataFirma = new Date().toISOString();
        doc.modalitaFirma = 'pollice';
        doc.logAccessi.push({ utente: user.nome, azione: 'firma', data: new Date().toISOString(), ip: '192.168.1.1' });
        LOG_GENERALE.unshift({ id: Date.now(), utente: user.nome, azione: 'Firma documento #' + docId, data: new Date().toISOString(), ip: '192.168.1.1' });
        this.mostraFeedback(feedbackDiv, 'success', 'Documento firmato con successo! ✅');
        break;

      case 'rifiuta':
        doc.stato = 'rifiutato';
        doc.dataFirma = new Date().toISOString();
        doc.modalitaFirma = 'rifiuto';
        doc.logAccessi.push({ utente: user.nome, azione: 'rifiuto', data: new Date().toISOString(), ip: '192.168.1.1' });
        this.mostraFeedback(feedbackDiv, 'danger', 'Documento rifiutato. ❌');
        break;

      case 'firmaVocale':
        doc.stato = 'firmato';
        doc.dataFirma = new Date().toISOString();
        doc.modalitaFirma = 'vocale';
        doc.logAccessi.push({ utente: user.nome, azione: 'firma vocale', data: new Date().toISOString(), ip: '192.168.1.1' });
        LOG_GENERALE.unshift({ id: Date.now(), utente: user.nome, azione: 'Firma vocale documento #' + docId, data: new Date().toISOString(), ip: '192.168.1.1' });
        this.mostraFeedback(feedbackDiv, 'success', 'Firma vocale registrata: "Sì, accetto" 🎤');
        break;

      case 'differisci':
        this.mostraFeedback(feedbackDiv, 'info', 'Documento salvato. Potrai firmarlo più tardi. ⏳');
        break;
    }

    // Aggiorna sessionStorage se l'utente è l'assistito
    if (user.ruolo === 'assistito') {
      sessionStorage.setItem('OpenSpace_user', JSON.stringify(user));
    }

    // Ricarica la vista dopo 1.5 secondi
    setTimeout(() => {
      Router.navigate('dettaglioDocumento', { id: docId });
    }, 1500);
  },

  mostraFeedback(div, tipo, messaggio) {
    const classi = {
      success: 'alert alert-success',
      danger: 'alert alert-danger',
      info: 'alert alert-info'
    };
    div.className = 'firma-feedback mt-3 ' + classi[tipo];
    div.innerHTML = messaggio;
    div.style.display = 'block';
  }
};