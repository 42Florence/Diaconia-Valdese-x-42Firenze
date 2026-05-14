// Messaggi.js - Interfaccia messaggistica (accessibile)

Views.messaggi = function() {
  const user = Auth.getUser();
  if (!user) return '';

  const isEasy = Accessibility.settings.easyMode;

  const conversazioni = [
    {
      id: 1,
      con: 'Laura Rossi',
      alias: 'Laura',
      ultimoMessaggio: 'Ti ho inviato il documento per la firma. Appena puoi, dagli un\'occhiata.',
      ultimoMessaggioEasy: 'Documento da firmare.',
      ora: '10:33',
      nonLetto: 1,
      ruolo: 'operatore'
    },
    {
      id: 2,
      con: 'Mario Bianchi',
      alias: 'Mario',
      ultimoMessaggio: 'Grazie, ho firmato il documento!',
      ora: 'Ieri',
      nonLetto: 0,
      ruolo: 'assistito'
    },
    {
      id: 3,
      con: 'Giovanni Verdi',
      alias: 'Giovanni',
      ultimoMessaggio: 'Confermo che l\'amministrazione di sostegno è attiva.',
      ultimoMessaggioEasy: 'Amministrazione di sostegno attiva.',
      ora: 'Lun',
      nonLetto: 0,
      ruolo: 'amministratore'
    }
  ];

  return `
    <div class="container py-4">
      <h1 class="h5 mb-4"><i class="fa-solid fa-comments me-2" aria-hidden="true"></i>Messaggi</h1>

      ${conversazioni.length > 0 ? conversazioni.map(c => `
        <div class="card mb-2" style="cursor:pointer" onclick="Views.apriChat('${c.alias}')" tabindex="0" role="button" aria-label="Chat con ${c.alias}">
          <div class="card-body d-flex align-items-center gap-3 py-3">
            <div class="avatar-circle flex-shrink-0" style="width:48px;height:48px" aria-label="${c.alias}">
              ${c.alias.split(' ').map(n=>n[0]).join('')}
            </div>
            <div class="flex-grow-1 min-width-0">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <strong class="small">${c.alias}</strong>
                <small class="text-muted">${c.ora}</small>
              </div>
              <p class="small text-muted mb-0 text-truncate">
                ${isEasy && c.ultimoMessaggioEasy ? c.ultimoMessaggioEasy : c.ultimoMessaggio}
              </p>
            </div>
            ${c.nonLetto > 0 ? `
              <span class="badge rounded-pill bg-primary flex-shrink-0" aria-label="${c.nonLetto} nuovo messaggio">${c.nonLetto}</span>
            ` : ''}
          </div>
        </div>
      `).join('') : `<p class="text-muted">${isEasy ? 'Nessuna chat.' : 'Nessuna conversazione.'}</p>`}
    </div>`;
};

// Apre una chat (simulata) con la persona
Views.apriChat = function(alias) {
  const isEasy = Accessibility.settings.easyMode;

  const chatHTML = `
    <div class="container py-4">
      <button class="btn btn-link text-decoration-none mb-3 ps-0" onclick="Router.navigate('messaggi')">
        <i class="fa-solid fa-arrow-left me-1" aria-hidden="true"></i>${isEasy ? 'Indietro' : 'Indietro'}
      </button>
      <h5>Chat con ${alias}</h5>
      <div class="card">
        <div class="card-body" style="height:400px;overflow-y:auto;">
          <p class="text-muted text-center mt-5">Chat simulata con ${alias}.</p>
          <p class="text-muted text-center">In una versione reale, qui ci sarebbero i messaggi.</p>
        </div>
        <div class="card-footer bg-white">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="${isEasy ? 'Scrivi...' : 'Scrivi un messaggio...'}" aria-label="Messaggio">
            <button class="btn btn-primary" aria-label="Invia messaggio"><i class="fa-solid fa-paper-plane" aria-hidden="true"></i></button>
            <button class="btn btn-outline-success" onclick="Views.avviaVideochiamata('${alias}')" aria-label="Avvia videochiamata con ${alias}">
              <i class="fa-solid fa-video" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>`;
  
  document.getElementById('app-content').innerHTML = chatHTML;
  // Se TTS attivo, leggi la chat
  if (Accessibility.settings.ttsEnabled) {
    Accessibility.tts.readCurrentPage();
  }
};