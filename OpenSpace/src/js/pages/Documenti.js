// Documenti.js - Lista documenti per assistito o operatore (versione accessibile)

Views.documenti = function() {
  const user = Auth.getUser();
  if (!user) return '';

  const isEasy = Accessibility.settings.easyMode;
  let documentiMostrati = [];
  let titoloPagina = '';

  if (user.ruolo === 'assistito') {
    documentiMostrati = DOCUMENTI.filter(doc => doc.destinatario === user.nome);
    titoloPagina = isEasy ? 'I tuoi documenti' : 'I miei documenti';
  } else if (user.ruolo === 'operatore') {
    documentiMostrati = DOCUMENTI.filter(doc => doc.mittente === user.nome);
    titoloPagina = isEasy ? 'Documenti inviati' : 'Documenti inviati';
  } else {
    documentiMostrati = DOCUMENTI;
    titoloPagina = isEasy ? 'Tutti i documenti' : 'Tutti i documenti';
  }

  return `

    <button class="btn btn-link text-decoration-none mb-3 ps-0" onclick="Router.navigate('home')">
      <i class="fa-solid fa-arrow-left me-1" aria-hidden="true"></i>${isEasy ? 'Indietro' : 'Torna alla Home'}
    </button>
    <div class="container py-4">
      <h1 class="h5 mb-4"><i class="fa-solid fa-folder-open me-2" aria-hidden="true"></i>${titoloPagina}</h1>

      ${documentiMostrati.length > 0
        ? documentiMostrati.map(doc => DocumentCard.render(doc)).join('')
        : `<p class="text-muted">${isEasy ? 'Nessun documento trovato.' : 'Nessun documento trovato.'}</p>`
      }
    </div>`;
};