// DashboardSupervisore.js - Monitoraggio globale per supervisore (accessibile)

Views.dashboardSupervisore = function() {
  const user = Auth.getUser();
  if (!user || user.ruolo !== 'supervisore') {
    return `
      <div class="container py-5 text-center">
        <i class="fa-solid fa-lock text-muted" style="font-size:3rem" aria-hidden="true"></i>
        <h5 class="mt-3">Accesso riservato</h5>
        <p class="text-muted">Solo il supervisore può accedere a questa dashboard.</p>
        <button class="btn btn-primary mt-3" onclick="Router.navigate('home')">
          <i class="fa-solid fa-house me-1" aria-hidden="true"></i>Home
        </button>
      </div>`;
  }

  const isEasy = Accessibility.settings.easyMode;
  const isDyscalculia = Accessibility.settings.profileDyscalculia;

  const tuttiUtenti = Object.values(DEMO_USERS);
  const assistiti = tuttiUtenti.filter(u => u.ruolo === 'assistito');
  const operatori = tuttiUtenti.filter(u => u.ruolo === 'operatore');
  const documentiTotali = DOCUMENTI.length;
  const documentiInAttesa = DOCUMENTI.filter(d => d.stato === 'in_attesa').length;
  const documentiFirmati = DOCUMENTI.filter(d => d.stato === 'firmato').length;
  const logRecenti = LOG_GENERALE.slice(0, 10);

  // Funzione per numeri accessibili (discalculia)
  const numeroAccessibile = (num, testo) => {
    if (isDyscalculia) {
      return `<span class="number-replace" data-text-label="${testo}" aria-label="${testo}">${num}</span>`;
    }
    return num;
  };

  // Semplifica il titolo di un documento se modalità facile
  const titoloDoc = (doc) => {
    return isEasy && doc.titoloSemplice ? doc.titoloSemplice : doc.titolo;
  };

  // Badge stato
  const statoBadge = (doc) => {
    if (isEasy) return doc.stato === 'firmato' ? 'Firmato' : doc.stato === 'in_attesa' ? 'In attesa' : 'Rifiutato';
    return doc.stato === 'firmato' ? 'Firmato' : doc.stato === 'in_attesa' ? 'In attesa' : 'Rifiutato';
  };

  return `
    <div class="container py-4">
      <button class="btn btn-link text-decoration-none mb-3 ps-0" onclick="Router.navigate('home')">
        <i class="fa-solid fa-arrow-left me-1" aria-hidden="true"></i>Home
      </button>

      <h1 class="h5 mb-4"><i class="fa-solid fa-chart-line me-2" aria-hidden="true"></i>${isEasy ? 'Dashboard' : 'Dashboard Supervisore'}</h1>

      <!-- Statistiche -->
      <div class="row g-2 mb-4" aria-label="Statistiche globali">
        <div class="col-6">
          <div class="card text-center p-3" style="background:var(--primary-light)">
            <h3 class="mb-0" style="color:var(--primary)">${numeroAccessibile(assistiti.length, 'Assistiti')}</h3>
            <small class="text-muted">Assistiti</small>
          </div>
        </div>
        <div class="col-6">
          <div class="card text-center p-3" style="background:var(--secondary-light)">
            <h3 class="mb-0" style="color:var(--secondary)">${numeroAccessibile(operatori.length, 'Operatori')}</h3>
            <small class="text-muted">Operatori</small>
          </div>
        </div>
        <div class="col-6">
          <div class="card text-center p-3" style="background:var(--warning-light)">
            <h3 class="mb-0" style="color:var(--warning)">${numeroAccessibile(documentiInAttesa, 'In attesa')}</h3>
            <small class="text-muted">In attesa firma</small>
          </div>
        </div>
        <div class="col-6">
          <div class="card text-center p-3" style="background:var(--success-light)">
            <h3 class="mb-0" style="color:var(--success)">${numeroAccessibile(documentiFirmati, 'Firmati')}</h3>
            <small class="text-muted">Firmati</small>
          </div>
        </div>
      </div>

      <!-- Abbinamenti assistiti-operatori -->
      <div class="card mb-4 ${Accessibility.settings.profileADHD ? 'border-0' : ''}">
        <div class="card-body">
          <h6 class="card-title"><i class="fa-solid fa-people-arrows me-2" aria-hidden="true"></i>Abbinamenti</h6>
          <div class="table-responsive">
            <table class="table table-sm small mb-0" aria-label="Abbinamenti assistito-operatore">
              <thead class="table-light">
                <tr><th>Assistito</th><th>Operatore</th><th>Tipo</th></tr>
              </thead>
              <tbody>
                ${assistiti.map(a => {
                  const op = operatori.find(o => o.assistiti && o.assistiti.includes(a.id));
                  return `
                    <tr>
                      <td>${a.alias || a.nome}</td>
                      <td>${op ? (op.alias || op.nome) : '<span class="text-danger">Nessuno</span>'}</td>
                      <td>${op ? (op.ruolo === 'operatore' ? 'Fiducia' : 'Legale') : '-'}</td>
                    </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Documenti recenti -->
      <div class="card mb-4 ${Accessibility.settings.profileADHD ? 'border-0' : ''}">
        <div class="card-body">
          <h6 class="card-title"><i class="fa-solid fa-file-lines me-2" aria-hidden="true"></i>${isEasy ? 'Documenti' : 'Documenti recenti'}</h6>
          <div class="table-responsive">
            <table class="table table-sm small mb-0" aria-label="Documenti recenti">
              <thead class="table-light">
                <tr><th>Documento</th><th>Mittente</th><th>Destinatario</th><th>Stato</th></tr>
              </thead>
              <tbody>
                ${DOCUMENTI.slice(0, 5).map(doc => `
                  <tr style="cursor:pointer" onclick="Router.navigate('dettaglioDocumento', {id:${doc.id}})" tabindex="0" role="button" aria-label="Apri documento ${titoloDoc(doc)}">
                    <td>${titoloDoc(doc)}</td>
                    <td>${doc.mittente}</td>
                    <td>${doc.destinatario}</td>
                    <td><span class="badge bg-${doc.stato === 'firmato' ? 'success' : doc.stato === 'in_attesa' ? 'warning' : 'danger'}">${statoBadge(doc)}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Teleconferenza confidenziale -->
      <h2 class="section-title mb-3 mt-4">Canale riservato</h2>

      <div class="card mb-3 border-0" 
          style="background:linear-gradient(135deg,#1e293b,#0f172a); color:white;">
        <div class="card-body d-flex justify-content-between align-items-center">
          
          <div>
            <div class="d-flex align-items-center mb-1">
              <i class="fa-solid fa-shield-halved me-2"></i>
              <strong class="small">Teleconferenza confidenziale</strong>
            </div>
            
            <small style="opacity:.8">
              Sessione crittografata per convalida documenti e verifica operazioni legali.
            </small>
          </div>

          <button class="btn btn-light btn-sm"
            onclick="alert('Demo: apertura sessione sicura')">
            <i class="fa-solid fa-video me-1"></i>
            Avvia
          </button>

        </div>
      </div>
      
      <!-- Log recente -->
      <div class="card mb-4 ${Accessibility.settings.profileADHD ? 'border-0' : ''}">
        <div class="card-body">
          <h6 class="card-title"><i class="fa-solid fa-clock-rotate-left me-2" aria-hidden="true"></i>${isEasy ? 'Attività' : 'Attività recente'}</h6>
          <div class="table-responsive">
            <table class="table table-sm small mb-0" aria-label="Log attività recente">
              <thead class="table-light">
                <tr><th>Data/Ora</th><th>Utente</th><th>Azione</th><th>IP</th></tr>
              </thead>
              <tbody>
                ${logRecenti.map(log => `
                  <tr>
                    <td>${new Date(log.data).toLocaleString('it-IT')}</td>
                    <td>${log.utente}</td>
                    <td>${log.azione}</td>
                    <td><code>${log.ip || '-'}</code></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Azioni -->
      <button class="btn btn-outline-primary w-100 mb-2" onclick="Router.navigate('log')">
        <i class="fa-solid fa-magnifying-glass me-1" aria-hidden="true"></i>${isEasy ? 'Log completo' : 'Log completo'}
      </button>
    </div>`;
};