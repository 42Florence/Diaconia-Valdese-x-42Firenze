// Operatori.js - Gestione operatori di fiducia (accessibile)

Views.operatori = function() {
  const user = Auth.getUser();
  if (!user) return '';

  const isEasy = Accessibility.settings.easyMode;

  // Solo l'assistito può vedere i propri operatori
  if (user.ruolo !== 'assistito') {
    return `
      <div class="container py-5 text-center">
        <i class="fa-solid fa-shield-halved text-muted" style="font-size:3rem" aria-hidden="true"></i>
        <h5 class="mt-3">Accesso riservato</h5>
        <p class="text-muted small">Solo un assistito può visualizzare i propri operatori di fiducia.</p>
        <button class="btn btn-primary mt-3" onclick="Router.navigate('home')">
          <i class="fa-solid fa-house me-1" aria-hidden="true"></i>Home
        </button>
      </div>`;
  }

  // Trova gli operatori abbinati a questo assistito
  const operatoriAssistito = OPERATORI.filter(op => op.assistiti.includes(user.id));

  return `
    <div class="container py-4">
        <button class="btn btn-link text-decoration-none mb-3 ps-0" onclick="Router.navigate('profile')">
          <i class="fa-solid fa-arrow-left me-1" aria-hidden="true"></i>${isEasy ? 'Indietro' : 'Torna al profilo'}
        </button>
      <h1 class="h5 mb-4"><i class="fa-solid fa-user-shield me-2" aria-hidden="true"></i>${isEasy ? 'Operatori di fiducia' : 'Operatori di fiducia'}</h1>

      <p class="text-muted small mb-4">
        ${isEasy ? 'Persone che possono aiutarti a firmare.' : 'Queste sono le persone autorizzate ad assisterti nella firma dei documenti. Puoi revocare la fiducia in qualsiasi momento.'}
      </p>

      ${operatoriAssistito.length > 0 ? operatoriAssistito.map(op => `
        <div class="card mb-3 ${Accessibility.settings.profileADHD ? 'border-0' : ''}">
          <div class="card-body">
            <div class="d-flex align-items-center gap-3">
              <div class="avatar-circle flex-shrink-0" style="width:48px;height:48px" aria-label="${op.alias}">
                ${op.alias.split(' ').map(n => n[0]).join('')}
              </div>
              <div class="flex-grow-1">
                <strong>${op.alias}</strong>
                ${op.badge ? Badge.render(op.badge) : ''}
                <p class="mb-0 small text-muted">
                  ${op.delegaLegale ? (isEasy ? 'Amministratore di sostegno' : 'Amministratore di sostegno con delega legale') : 'Operatore di fiducia'}
                </p>
                <small class="text-muted">
                  Documenti gestiti: ${op.documentiCreati ? op.documentiCreati.length : 0}
                </small>
              </div>
              <button class="btn btn-outline-danger btn-sm" onclick="Views.revocaFiducia(${op.id})" aria-label="Revoca operatore ${op.alias}">
                <i class="fa-solid fa-user-slash me-1" aria-hidden="true"></i>${isEasy ? 'Togli' : 'Revoca'}
              </button>
            </div>
          </div>
        </div>
      `).join('') : `<p class="text-muted">${isEasy ? 'Nessun operatore.' : 'Nessun operatore di fiducia abbinato.'}</p>`}

      ${operatoriAssistito.length === 0 ? `
        <div class="card mt-3" style="background:var(--primary-light);border:none">
          <div class="card-body text-center">
            <i class="fa-solid fa-circle-info mb-2" style="font-size:1.5rem;color:var(--primary)" aria-hidden="true"></i>
            <p class="small mb-0">${isEasy ? 'Contatta l\'amministrazione per aggiungere un operatore.' : 'Contatta l\'amministrazione per abbinare un operatore di fiducia al tuo profilo.'}</p>
          </div>
        </div>
      ` : ''}
    </div>`;
};

// Funzione di revoca fiducia (simulata) - invariata
Views.revocaFiducia = function(opId) {
  const user = Auth.getUser();
  if (!user || user.ruolo !== 'assistito') return;
  
  const operatore = OPERATORI.find(op => op.id === opId);
  if (!operatore) return;

  if (operatore.assistiti) {
    operatore.assistiti = operatore.assistiti.filter(a => a !== user.id);
  }

  if (user.operatoreFiducia === opId) {
    user.operatoreFiducia = null;
  }

  sessionStorage.setItem('OpenSpace_user', JSON.stringify(user));
  alert(`Fiducia revocata a ${operatore.alias}. Non potrà più visualizzare i tuoi documenti.`);
  Router.navigate('operatori');
};