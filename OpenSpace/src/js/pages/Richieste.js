// Richieste.js - Documenti in attesa di firma per l'assistito

Views.richieste = function() {
  const user = Auth.getUser();
  if (!user) return '';

  const isEasy = Accessibility.settings.easyMode;
  const isADHD = Accessibility.settings.profileADHD;

  // Solo l'assistito ha richieste di firma
  if (user.ruolo !== 'assistito') {
    return `
      <div class="container py-5 text-center">
        <i class="fa-solid fa-envelope-open-text text-muted" style="font-size:3rem" aria-hidden="true"></i>
        <h5 class="mt-3">Accesso riservato</h5>
        <p class="text-muted">Solo un assistito può vedere le richieste di firma.</p>
        <button class="btn btn-primary mt-3" onclick="Router.navigate('home')">
          <i class="fa-solid fa-house me-1" aria-hidden="true"></i>Home
        </button>
      </div>`;
  }

  // Filtra solo i documenti in attesa per questo assistito
  const documentiInAttesa = DOCUMENTI.filter(
    d => d.destinatario === user.nome && d.stato === 'in_attesa'
  );

  return `
    <div class="container py-4">
      <button class="btn btn-link text-decoration-none mb-3 ps-0" onclick="Router.navigate('home')">
        <i class="fa-solid fa-arrow-left me-1" aria-hidden="true"></i>${isEasy ? 'Indietro' : 'Torna alla Home'}
      </button>

      <h1 class="h5 mb-4"><i class="fa-solid fa-envelope me-2" aria-hidden="true"></i>${isEasy ? 'Richieste di firma' : 'Richieste di firma'}</h1>

      ${documentiInAttesa.length > 0 ? 
        documentiInAttesa.map(doc => DocumentCard.render(doc)).join('') : 
        `<div class="text-center py-5">
          <i class="fa-solid fa-circle-check text-success" style="font-size:3rem" aria-hidden="true"></i>
          <p class="mt-3 text-muted">${isEasy ? 'Tutti i documenti sono firmati.' : 'Nessun documento in attesa di firma. Ottimo lavoro!'}</p>
          <button class="btn btn-primary" onclick="Router.navigate('documenti')">
            <i class="fa-solid fa-folder-open me-1" aria-hidden="true"></i>${isEasy ? 'Vedi tutti' : 'Vedi tutti i documenti'}
          </button>
        </div>`
      }

      ${documentiInAttesa.length > 0 ? `
        <div class="text-center mt-4">
          <button class="btn btn-outline-primary" onclick="Router.navigate('documenti')">
            <i class="fa-solid fa-folder-open me-1" aria-hidden="true"></i>${isEasy ? 'Tutti i documenti' : 'Vedi tutti i documenti'}
          </button>
        </div>
      ` : ''}
    </div>`;
};