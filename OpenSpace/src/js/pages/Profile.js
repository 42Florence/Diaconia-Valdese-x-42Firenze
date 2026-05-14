// Profile.js - Profilo utente con statistiche e operatori di fiducia (accessibile)

Views.profile = function() {
  const user = Auth.getUser();
  if (!user) return '';

  const isEasy = Accessibility.settings.easyMode;
  const isDyscalculia = Accessibility.settings.profileDyscalculia;

  // Statistiche personali
  const documentiTotali = DOCUMENTI.filter(d => d.destinatario === user.nome || d.mittente === user.nome).length;
  const documentiFirmati = DOCUMENTI.filter(d => d.destinatario === user.nome && d.stato === 'firmato').length;
  const documentiInAttesa = DOCUMENTI.filter(d => d.destinatario === user.nome && d.stato === 'in_attesa').length;
  const operatoriFiducia = OPERATORI.filter(op => op.assistiti && op.assistiti.includes(user.id)).length;

  // Funzione per rendere un numero accessibile alla discalculia
  const numeroAccessibile = (num, testo) => {
    if (isDyscalculia) {
      return `<span class="number-replace" data-text-label="${testo}" aria-label="${testo}">${num}</span>`;
    }
    return num;
  };

  // Testo etichette per discalculia
  const etichette = {
    totali: 'Totale documenti',
    firmati: 'Firmati',
    inAttesa: 'In attesa',
    operatori: 'Operatori'
  };

  // Recupera lo stato dell'accessibilità (da Accessibility, non user.accessibilita)
  const s = Accessibility.settings;

  return `
    <div class="container py-4">
      <!-- Copertina e avatar -->
      <div class="card mb-4 border-0 shadow-sm">
        <div class="card-body text-center position-relative" style="background: linear-gradient(135deg, var(--primary-light, #E8F0F7), var(--secondary-light, #F3EEF7)); min-height: 140px; border-radius: 12px 12px 0 0;">
          <div class="mt-4">
            <div class="avatar-large mb-3" style="border: 4px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" aria-label="Avatar di ${user.alias || user.nome}">${user.avatar}</div>
            <h4 class="mb-0">${user.alias || user.nome}</h4>
            <p class="text-muted small mb-1">${user.email}</p>
            ${Badge.render(user.ruolo)}
            ${user.badge ? Badge.render(user.badge) : ''}
          </div>
          <button class="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-3" onclick="alert('Funzione demo: cambia immagine profilo')" aria-label="Modifica immagine profilo">
            <i class="fa-solid fa-camera me-1" aria-hidden="true"></i>${isEasy ? 'Modifica' : 'Modifica'}
          </button>
        </div>
      </div>

      <!-- Statistiche -->
      <div class="row g-2 mb-4">
        <div class="col-6">
          <div class="card text-center p-3 bg-light">
            <h3 class="mb-0" style="color:var(--primary)">${numeroAccessibile(documentiTotali, etichette.totali)}</h3>
            <small class="text-muted">${isEasy ? 'Documenti' : 'Documenti totali'}</small>
          </div>
        </div>
        <div class="col-6">
          <div class="card text-center p-3 bg-light">
            <h3 class="mb-0" style="color:var(--success)">${numeroAccessibile(documentiFirmati, etichette.firmati)}</h3>
            <small class="text-muted">${isEasy ? 'Firmati' : 'Firmati'}</small>
          </div>
        </div>
        <div class="col-6">
          <div class="card text-center p-3 bg-light">
            <h3 class="mb-0" style="color:var(--warning)">${numeroAccessibile(documentiInAttesa, etichette.inAttesa)}</h3>
            <small class="text-muted">${isEasy ? 'In attesa' : 'In attesa'}</small>
          </div>
        </div>
        <div class="col-6">
          <div class="card text-center p-3 bg-light">
            <h3 class="mb-0" style="color:var(--secondary)">${numeroAccessibile(operatoriFiducia, etichette.operatori)}</h3>
            <small class="text-muted">${isEasy ? 'Operatori' : 'Operatori'}</small>
          </div>
        </div>
      </div>

      <!-- Operatori di fiducia (solo assistito) -->
      ${user.ruolo === 'assistito' ? `
        <div class="card mb-4">
          <div class="card-body">
            <h6 class="card-title"><i class="fa-solid fa-user-shield me-2" aria-hidden="true"></i>Operatori di fiducia</h6>
            ${operatoriFiducia > 0 ? `
              <ul class="list-unstyled small mb-2">
                ${OPERATORI.filter(op => op.assistiti && op.assistiti.includes(user.id)).map(op => `
                  <li class="mb-2 d-flex justify-content-between align-items-center">
                    <span><i class="fa-solid fa-circle text-success me-1" style="font-size:0.4rem" aria-hidden="true"></i>${op.alias} ${op.badge ? Badge.render(op.badge) : ''}</span>
                      <button 
                        class="btn btn-outline-primary btn-sm"
                        onclick="Router.navigate('publicProfile', { id: ${op.id} })"
                        aria-label="Apri profilo ${op.alias}">

                        <i class="fa-solid fa-user me-1"></i>
                        ${isEasy ? 'Dettagli' : 'Profilo'}
                      </button>
                  </li>
                `).join('')}
              </ul>
            ` : `<p class="text-muted small">${isEasy ? 'Nessun operatore.' : 'Nessun operatore abbinato.'}</p>`}
            <a href="#" onclick="Router.navigate('operatori');return false" class="btn btn-outline-primary btn-sm">
              <i class="fa-solid fa-gear me-1" aria-hidden="true"></i>${isEasy ? 'Gestisci' : 'Gestisci operatori'}
            </a>
          </div>
        </div>
      ` : ''}

      <!-- Assistiti (solo operatore) -->
      ${user.ruolo === 'operatore' && user.assistiti ? `
        <div class="card mb-4">
          <div class="card-body">
            <h6 class="card-title"><i class="fa-solid fa-people-roof me-2" aria-hidden="true"></i>Assistiti abbinati</h6>
            <ul class="list-unstyled small mb-0">
              ${user.assistiti.map(id => {
                const assistito = Object.values(DEMO_USERS).find(u => u.id === id);
                return assistito ? `<li>${assistito.alias || assistito.nome}</li>` : '';
              }).join('')}
            </ul>
          </div>
        </div>
      ` : ''}

      <!-- Accessibilità rapida -->
      <div class="card mb-4">
        <div class="card-body">
          <h6 class="card-title"><i class="fa-solid fa-universal-access me-2" aria-hidden="true"></i>Accessibilità</h6>
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="small">Modalità facile</span>
            <span class="badge ${s.easyMode ? 'bg-success' : 'bg-secondary'}">${s.easyMode ? 'Attiva' : 'Disattiva'}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="small">Text-to-Speech</span>
            <span class="badge ${s.ttsEnabled ? 'bg-success' : 'bg-secondary'}">${s.ttsEnabled ? 'Attivo' : 'Disattivo'}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <span class="small">Contrasto alto</span>
            <span class="badge ${s.highContrast ? 'bg-success' : 'bg-secondary'}">${s.highContrast ? 'Attivo' : 'Disattivo'}</span>
          </div>
        </div>
      </div>

      <!-- Feedback sui servizi -->
      <h6 class="section-title mb-3"><i class="fa-solid fa-star me-2" aria-hidden="true"></i>Valutazione servizi</h6>
      ${typeof FeedbackWidget !== 'undefined' ? FeedbackWidget.render('Complessivamente, come valuti OpenSpace?', 
        (feedback) => console.log('Feedback profilo:', feedback)) : ''}

      <!-- Pulsanti -->
      <button class="btn btn-outline-secondary w-100 mt-3 mb-2" onclick="Router.navigate('impostazioni')">
        <i class="fa-solid fa-gear me-1" aria-hidden="true"></i>${isEasy ? 'Impostazioni' : 'Impostazioni generali'}
      </button>

      <div class="text-center mt-4">
        <button class="btn btn-outline-danger btn-sm" onclick="Auth.logout();App.checkAuth()" aria-label="Logout">
          <i class="fa-solid fa-arrow-right-from-bracket me-1" aria-hidden="true"></i>Logout
        </button>
      </div>
    </div>`;
};