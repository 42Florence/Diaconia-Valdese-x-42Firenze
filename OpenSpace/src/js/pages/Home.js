// ===============================================================
// Home.js - Dashboard per assistito, operatore o supervisore
// ===============================================================

Views.home = function() {
  const user = Auth.getUser();
  if (!user) return '';

  // Inizializza variabili globali del calendario se non presenti
  if (window.calAnno === undefined) {
    const oggi = new Date();
    window.calAnno = oggi.getFullYear();
    window.calMese = oggi.getMonth();
  }

  if (Accessibility.settings.ttsEnabled) {
    setTimeout(() => Accessibility.tts.readCurrentPage(), 200);
  }

  if (user.ruolo === 'assistito') {
    return Views.homeAssistito(user);
  } else if (user.ruolo === 'operatore') {
    return Views.homeOperatore(user);
  } else if (user.ruolo === 'supervisore') {
    return Views.homeSupervisore(user);
  }

  return `<div class="container py-5"><p>Ruolo non riconosciuto.</p></div>`;
};

// ===================== ASSISTITO =====================
Views.homeAssistito = function(user) {
  const documentiInAttesa = DOCUMENTI.filter(d => d.destinatario === user.nome && d.stato === 'in_attesa');
  const operatoriFiducia = OPERATORI.filter(op => op.assistiti.includes(user.id));
  const appuntamenti = APPUNTAMENTI.filter(a => a.assistitoId === user.id);
  const notificheNonLette = NOTIFICHE ? NOTIFICHE.filter(n => n.letta === false && n.utenteId === user.id) : [];

  const oggi = new Date();
  const dataFormattata = oggi.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const oggiISO = oggi.toISOString().slice(0,10);

  // Attività recente
  const attivita = [];
  if (LOG_GENERALE) {
    LOG_GENERALE.filter(log => log.utenteId === user.id).slice(-4).forEach(log => attivita.push({ tipo: 'log', ...log }));
  }
  notificheNonLette.slice(0,2).forEach(n => attivita.push({ tipo: 'notifica', ...n }));
  attivita.sort((a,b) => new Date(b.data || b.timestamp) - new Date(a.data || a.timestamp));
  const attivitaRecente = attivita.slice(0, 4);

  // Appuntamenti di oggi
  const appOggi = appuntamenti.filter(a => a.data === oggiISO).sort((a,b) => a.ora.localeCompare(b.ora));

  const calAnno = window.calAnno;
  const calMese = window.calMese;

  return `
    <div class="container py-4">
      <!-- Welcome -->
      <section class="welcome-section d-flex flex-wrap justify-content-between align-items-start mb-4">
        <div>
          <h1 class="h3 fw-bold mb-1">Benvenuto, ${user.alias || user.nome.split(' ')[0]}</h1>
          <p class="text-muted mb-0">${dataFormattata} – Ecco un riepilogo della tua situazione.</p>
        </div>
        <button class="btn btn-primary mt-2 mt-md-0" onclick="Views.mostraRichiediAppuntamento()">
          <i class="fa-solid fa-calendar-plus me-2"></i>Richiedi appuntamento
        </button>
      </section>

      <!-- Stat cards -->
      <div class="row row-cols-2 row-cols-md-4 g-3 mb-4">
        <div class="col">
          <div class="card stat-card h-100">
            <div class="card-body">
              <div class="icon-tile bg-primary-light text-primary rounded-3 mb-3"><i class="fa-solid fa-file-signature"></i></div>
              <div class="stat-label text-uppercase text-muted small fw-semibold">Da firmare</div>
              <div class="stat-value h2 mb-0">${documentiInAttesa.length}</div>
              <div class="small text-success mt-1"><i class="fa-solid fa-arrow-up me-1"></i>+${documentiInAttesa.length} in attesa</div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card stat-card h-100">
            <div class="card-body">
              <div class="icon-tile bg-success-light text-success rounded-3 mb-3"><i class="fa-solid fa-calendar-check"></i></div>
              <div class="stat-label text-uppercase text-muted small fw-semibold">Appuntamenti</div>
              <div class="stat-value h2 mb-0">${appuntamenti.length}</div>
              <div class="small text-muted mt-1">${appuntamenti.filter(a => a.stato === 'confermato').length} confermati</div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card stat-card h-100">
            <div class="card-body">
              <div class="icon-tile bg-secondary-light text-secondary rounded-3 mb-3"><i class="fa-solid fa-user-group"></i></div>
              <div class="stat-label text-uppercase text-muted small fw-semibold">Operatori</div>
              <div class="stat-value h2 mb-0">${operatoriFiducia.length}</div>
              <div class="small text-muted mt-1">di fiducia</div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card stat-card h-100">
            <div class="card-body">
              <div class="icon-tile bg-warning-light text-warning rounded-3 mb-3"><i class="fa-solid fa-bell"></i></div>
              <div class="stat-label text-uppercase text-muted small fw-semibold">Notifiche</div>
              <div class="stat-value h2 mb-0">${notificheNonLette.length}</div>
              <div class="small text-muted mt-1">non lette</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Due colonne: attività + agenda/mini-cal -->
      <div class="row g-4 mb-4">
        <div class="col-lg-8">
          <div class="card h-100">
            <div class="card-header d-flex justify-content-between align-items-center bg-white border-0 pt-3 pb-0">
              <h2 class="h5 fw-semibold mb-0">Attività recente</h2>
              <a href="#" onclick="Router.navigate('notifiche'); return false;" class="small text-decoration-none">Vedi tutto</a>
            </div>
            <div class="card-body pt-0">
              <ul class="activity-list list-unstyled mb-0">
                ${attivitaRecente.length > 0 ? attivitaRecente.map(a => {
                  const icona = a.tipo === 'log' ? 'fa-file-lines' : 'fa-bell';
                  const descrizione = a.azione || a.testo || 'Attività';
                  const tempo = a.data ? new Date(a.data).toLocaleTimeString('it-IT', {hour:'2-digit', minute:'2-digit'}) : '';
                  return `<li class="d-flex align-items-center py-2 border-bottom">
                    <div class="activity-icon me-3 bg-light rounded-3 p-2 text-muted"><i class="fa-solid ${icona}"></i></div>
                    <div class="flex-grow-1"><div class="fw-semibold">${descrizione}</div><div class="small text-muted">${a.dettaglio || ''}</div></div>
                    <div class="text-muted small">${tempo}</div>
                  </li>`;
                }).join('') : '<li class="text-muted py-2">Nessuna attività recente.</li>'}
              </ul>
            </div>
          </div>
        </div>

        <div class="col-lg-4 d-flex flex-column gap-3">
          <!-- Agenda di oggi -->
          <div class="card h-100">
            <div class="card-header d-flex justify-content-between align-items-center bg-white border-0 pt-3 pb-0">
              <h2 class="h5 fw-semibold mb-0">Agenda di oggi</h2>
              <a href="#" onclick="Router.navigate('calendario'); return false;" class="small text-decoration-none">Calendario</a>
            </div>
            <div class="card-body pt-0">
              ${appOggi.length > 0 ? appOggi.map(a => {
                const [oraInizio, oraFine] = a.ora.split('-');
                const op = OPERATORI.find(o => o.id === a.operatoreId) || {};
                const tipoTag = a.tipo === 'video' ? 'Videocall' : 'In presenza';
                const tagClass = a.tipo === 'video' ? 'schedule-tag call' : 'schedule-tag';
                return `<div class="d-flex align-items-start py-2 border-bottom">
                  <div class="schedule-time me-3 text-end"><div class="fw-bold">${oraInizio || a.ora}</div>${oraFine ? `<small class="text-muted">${oraFine}</small>` : ''}</div>
                  <div><div class="fw-semibold">${a.descrizione}</div><div class="small text-muted">con ${op.alias || 'Operatore'}</div><span class="${tagClass}">${tipoTag}</span></div>
                </div>`;
              }).join('') : '<p class="text-muted pt-2">Nessun appuntamento oggi.</p>'}
            </div>
          </div>

          <!-- Mini calendario -->
          <div class="card">
            <div class="card-body">
              ${CalendarioWidget.renderMini(appuntamenti, calAnno, calMese)}
            </div>
          </div>
        </div>
      </div>

      <!-- Accesso rapido alle richieste -->
      <button class="btn btn-outline-primary w-100" onclick="Router.navigate('richieste')">
        <i class="fa-solid fa-envelope me-2"></i> Vedi tutte le richieste
      </button>
    </div>
  `;
};

// ===================== OPERATORE =====================
Views.homeOperatore = function(user) {
  const assistitiIds = user.assistiti || [];
  const mieiAssistiti = assistitiIds.map(id => {
    const found = Object.values(DEMO_USERS).find(u => u.id === id);
    return found ? { id, nome: found.alias || found.nome } : { id, nome: 'Assistito #' + id };
  });
  const documentiInviati = DOCUMENTI.filter(d => d.mittente === user.nome || d.operatoreId === user.id);
  const appuntamenti = APPUNTAMENTI.filter(a => a.operatoreId === user.id);
  const notifiche = NOTIFICHE ? NOTIFICHE.filter(n => n.utenteId === user.id && !n.letta) : [];

  const oggi = new Date();
  const dataFormattata = oggi.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const oggiISO = oggi.toISOString().slice(0,10);

  // Attività recente
  const attivita = [];
  if (LOG_GENERALE) {
    LOG_GENERALE.filter(log => log.utenteId === user.id).slice(-4).forEach(log => attivita.push({ tipo: 'log', ...log }));
  }
  notifiche.slice(0,2).forEach(n => attivita.push({ tipo: 'notifica', ...n }));
  attivita.sort((a,b) => new Date(b.data || b.timestamp) - new Date(a.data || a.timestamp));
  const attivitaRecente = attivita.slice(0, 4);

  // Appuntamenti di oggi
  const appOggi = appuntamenti.filter(a => a.data === oggiISO).sort((a,b) => a.ora.localeCompare(b.ora));

  // Richieste in sospeso
  const richieste = appuntamenti.filter(a => a.stato === 'richiesto');

  const calAnno = window.calAnno;
  const calMese = window.calMese;

  return `
    <div class="container py-4">
      <!-- Welcome -->
      <section class="welcome-section d-flex flex-wrap justify-content-between align-items-start mb-4">
        <div>
          <h1 class="h3 fw-bold mb-1">Dashboard Operatore</h1>
          <p class="text-muted mb-0">${dataFormattata} — Benvenutə, ${user.alias || user.nome.split(' ')[0]}</p>
        </div>
        <button class="btn btn-primary mt-2 mt-md-0" onclick="Router.navigate('documenti')">
          <i class="fa-solid fa-file-circle-plus me-2"></i>Nuovo documento
        </button>
      </section>

      <!-- Stat cards -->
      <div class="row row-cols-2 row-cols-md-4 g-3 mb-4">
        <div class="col">
          <div class="card stat-card h-100">
            <div class="card-body">
              <div class="icon-tile bg-primary-light text-primary rounded-3 mb-3"><i class="fa-solid fa-people-roof"></i></div>
              <div class="stat-label text-uppercase text-muted small fw-semibold">Assistiti</div>
              <div class="stat-value h2 mb-0">${mieiAssistiti.length}</div>
              <div class="small text-muted mt-1">abbinati</div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card stat-card h-100">
            <div class="card-body">
              <div class="icon-tile bg-success-light text-success rounded-3 mb-3"><i class="fa-solid fa-file-signature"></i></div>
              <div class="stat-label text-uppercase text-muted small fw-semibold">Doc. inviati</div>
              <div class="stat-value h2 mb-0">${documentiInviati.length}</div>
              <div class="small text-muted mt-1">${documentiInviati.filter(d => d.stato === 'in_attesa').length} in attesa di firma</div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card stat-card h-100">
            <div class="card-body">
              <div class="icon-tile bg-warning-light text-warning rounded-3 mb-3"><i class="fa-solid fa-calendar-plus"></i></div>
              <div class="stat-label text-uppercase text-muted small fw-semibold">Richieste</div>
              <div class="stat-value h2 mb-0">${richieste.length}</div>
              <div class="small text-muted mt-1">da confermare</div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card stat-card h-100">
            <div class="card-body">
              <div class="icon-tile bg-info-light text-info rounded-3 mb-3"><i class="fa-solid fa-bell"></i></div>
              <div class="stat-label text-uppercase text-muted small fw-semibold">Notifiche</div>
              <div class="stat-value h2 mb-0">${notifiche.length}</div>
              <div class="small text-muted mt-1">non lette</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pannelli: Attività recente + Agenda/mini-cal -->
      <div class="row g-4 mb-4">
        <div class="col-lg-8">
          <div class="card h-100">
            <div class="card-header d-flex justify-content-between align-items-center bg-white border-0 pt-3 pb-0">
              <h2 class="h5 fw-semibold mb-0">Attività recente</h2>
              <a href="#" onclick="Router.navigate('log'); return false;" class="small text-decoration-none">Vedi tutto</a>
            </div>
            <div class="card-body pt-0">
              <ul class="activity-list list-unstyled mb-0">
                ${attivitaRecente.length > 0 ? attivitaRecente.map(a => {
                  const icona = a.tipo === 'log' ? 'fa-file-lines' : 'fa-bell';
                  const descrizione = a.azione || a.testo || 'Attività';
                  const tempo = a.data ? new Date(a.data).toLocaleTimeString('it-IT', {hour:'2-digit', minute:'2-digit'}) : '';
                  return `<li class="d-flex align-items-center py-2 border-bottom">
                    <div class="activity-icon me-3 bg-light rounded-3 p-2 text-muted"><i class="fa-solid ${icona}"></i></div>
                    <div class="flex-grow-1"><div class="fw-semibold">${descrizione}</div><div class="small text-muted">${a.dettaglio || ''}</div></div>
                    <div class="text-muted small">${tempo}</div>
                  </li>`;
                }).join('') : '<li class="text-muted py-2">Nessuna attività recente.</li>'}
              </ul>
            </div>
          </div>
        </div>

        <div class="col-lg-4 d-flex flex-column gap-3">
          <!-- Agenda di oggi -->
          <div class="card h-100">
            <div class="card-header d-flex justify-content-between align-items-center bg-white border-0 pt-3 pb-0">
              <h2 class="h5 fw-semibold mb-0">Agenda di oggi</h2>
              <a href="#" onclick="Router.navigate('calendario'); return false;" class="small text-decoration-none">Calendario</a>
            </div>
            <div class="card-body pt-0">
              ${appOggi.length > 0 ? appOggi.map(a => {
                const [oraInizio, oraFine] = a.ora.split('-');
                const assistito = Object.values(DEMO_USERS).find(u => u.id === a.assistitoId) || {};
                const tipoTag = a.tipo === 'video' ? 'Videocall' : 'In presenza';
                const tagClass = a.tipo === 'video' ? 'schedule-tag call' : 'schedule-tag';
                return `<div class="d-flex align-items-start py-2 border-bottom">
                  <div class="schedule-time me-3 text-end"><div class="fw-bold">${oraInizio || a.ora}</div>${oraFine ? `<small class="text-muted">${oraFine}</small>` : ''}</div>
                  <div><div class="fw-semibold">${a.descrizione}</div><div class="small text-muted">con ${assistito.alias || assistito.nome || 'Assistito'}</div><span class="${tagClass}">${tipoTag}</span></div>
                </div>`;
              }).join('') : '<p class="text-muted pt-2">Nessun appuntamento oggi.</p>'}
            </div>
          </div>

          <!-- Mini calendario -->
          <div class="card">
            <div class="card-body">
              ${CalendarioWidget.renderMini(appuntamenti, calAnno, calMese)}
            </div>
          </div>
        </div>
      </div>

      <!-- Videochiamata legale -->
      <div class="card mb-3 border-0" style="background:linear-gradient(135deg,#1e293b,#0f172a); color:white;">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <div class="d-flex align-items-center mb-1">
              <i class="fa-solid fa-shield-halved me-2"></i>
              <strong class="small">Videochiamata legale</strong>
            </div>
            <small style="opacity:.8">Sessione crittografata per convalida documenti e verifica operazioni.</small>
          </div>
          <button class="btn btn-light btn-sm" onclick="Router.navigate('videochiamata')">
            <i class="fa-solid fa-video me-1"></i> Avvia
          </button>
        </div>
      </div>

      <!-- Richieste in evidenza -->
      ${richieste.length > 0 ? `
      <div class="card mb-4">
        <div class="card-header bg-white border-0 pt-3 pb-0">
          <h2 class="h5 fw-semibold mb-0">Richieste di appuntamento</h2>
        </div>
        <div class="card-body">
          <div class="list-group list-group-flush">
            ${richieste.map(a => {
              const assistito = Object.values(DEMO_USERS).find(u => u.id === a.assistitoId) || {};
              return `
                <div class="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>${a.descrizione}</strong><br>
                    <small class="text-muted">${a.data} alle ${a.ora} — da ${assistito.alias || assistito.nome}</small>
                  </div>
                  <div>
                    <button class="btn btn-sm btn-success me-1" onclick="Views.confermaAppuntamento(${a.id})">Conferma</button>
                    <button class="btn btn-sm btn-danger" onclick="Views.annullaAppuntamento(${a.id})">Rifiuta</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
      ` : ''}

      <!-- Dashboard avanzata -->
      <button class="btn btn-primary w-100" onclick="Router.navigate('dashboardOperatore')">
        <i class="fa-solid fa-chart-pie me-2"></i> Dashboard operatore avanzata
      </button>
    </div>
  `;
};

// ===================== SUPERVISORE =====================
Views.homeSupervisore = function(user) {
  const oggi = new Date();
  const dataFormattata = oggi.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const oggiISO = oggi.toISOString().slice(0,10);

  const totDocumenti = DOCUMENTI.length;
  const docInAttesa = DOCUMENTI.filter(d => d.stato === 'in_attesa').length;
  const totOperatori = Object.values(DEMO_USERS).filter(u => u.ruolo === 'operatore').length;
  const totAppuntamenti = APPUNTAMENTI.length;
  const appOggi = APPUNTAMENTI.filter(a => a.data === oggiISO).sort((a,b) => a.ora.localeCompare(b.ora));
  const attivitaRecente = LOG_GENERALE ? LOG_GENERALE.slice(-5).reverse() : [];

  const calAnno = window.calAnno;
  const calMese = window.calMese;

  return `
    <div class="container py-4">
      <!-- Welcome -->
      <section class="welcome-section d-flex flex-wrap justify-content-between align-items-start mb-4">
        <div>
          <h1 class="h3 fw-bold mb-1">Dashboard Supervisore</h1>
          <p class="text-muted mb-0">${dataFormattata} — Monitoraggio globale della piattaforma</p>
        </div>
        <button class="btn btn-primary mt-2 mt-md-0" onclick="Router.navigate('documenti')">
          <i class="fa-solid fa-file-circle-plus me-2"></i>Nuovo documento
        </button>
      </section>

      <!-- Stat cards -->
      <div class="row row-cols-2 row-cols-md-4 g-3 mb-4">
        <div class="col">
          <div class="card stat-card h-100">
            <div class="card-body">
              <div class="icon-tile bg-primary-light text-primary rounded-3 mb-3"><i class="fa-solid fa-file-lines"></i></div>
              <div class="stat-label text-uppercase text-muted small fw-semibold">Documenti</div>
              <div class="stat-value h2 mb-0">${totDocumenti}</div>
              <div class="small text-muted mt-1">${docInAttesa} in attesa</div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card stat-card h-100">
            <div class="card-body">
              <div class="icon-tile bg-success-light text-success rounded-3 mb-3"><i class="fa-solid fa-user-tie"></i></div>
              <div class="stat-label text-uppercase text-muted small fw-semibold">Operatori</div>
              <div class="stat-value h2 mb-0">${totOperatori}</div>
              <div class="small text-muted mt-1">attivi</div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card stat-card h-100">
            <div class="card-body">
              <div class="icon-tile bg-warning-light text-warning rounded-3 mb-3"><i class="fa-solid fa-calendar"></i></div>
              <div class="stat-label text-uppercase text-muted small fw-semibold">Appuntamenti</div>
              <div class="stat-value h2 mb-0">${totAppuntamenti}</div>
              <div class="small text-muted mt-1">totali</div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card stat-card h-100">
            <div class="card-body">
              <div class="icon-tile bg-danger-light text-danger rounded-3 mb-3"><i class="fa-solid fa-triangle-exclamation"></i></div>
              <div class="stat-label text-uppercase text-muted small fw-semibold">Alert</div>
              <div class="stat-value h2 mb-0">0</div>
              <div class="small text-muted mt-1">nessuna anomalia</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pannelli: Attività globale + Agenda/mini-cal -->
      <div class="row g-4 mb-4">
        <div class="col-lg-8">
          <div class="card h-100">
            <div class="card-header d-flex justify-content-between align-items-center bg-white border-0 pt-3 pb-0">
              <h2 class="h5 fw-semibold mb-0">Attività globale recente</h2>
              <a href="#" onclick="Router.navigate('log'); return false;" class="small text-decoration-none">Log completo</a>
            </div>
            <div class="card-body pt-0">
              <ul class="activity-list list-unstyled mb-0">
                ${attivitaRecente.length > 0 ? attivitaRecente.map(log => {
                  const tempo = log.data ? new Date(log.data).toLocaleTimeString('it-IT', {hour:'2-digit', minute:'2-digit'}) : '';
                  return `<li class="d-flex align-items-center py-2 border-bottom">
                    <div class="activity-icon me-3 bg-light rounded-3 p-2 text-muted"><i class="fa-solid fa-clock-rotate-left"></i></div>
                    <div class="flex-grow-1"><div class="fw-semibold">${log.utente} — ${log.azione}</div><div class="small text-muted">${log.dettaglio || ''}</div></div>
                    <div class="text-muted small">${tempo}</div>
                  </li>`;
                }).join('') : '<li class="text-muted py-2">Nessuna attività registrata.</li>'}
              </ul>
            </div>
          </div>
        </div>

        <div class="col-lg-4 d-flex flex-column gap-3">
          <!-- Panoramica oggi -->
          <div class="card h-100">
            <div class="card-header d-flex justify-content-between align-items-center bg-white border-0 pt-3 pb-0">
              <h2 class="h5 fw-semibold mb-0">Panoramica oggi</h2>
              <a href="#" onclick="Router.navigate('calendario'); return false;" class="small text-decoration-none">Calendario</a>
            </div>
            <div class="card-body pt-0">
              ${appOggi.length > 0 ? appOggi.map(a => {
                const [oraInizio] = a.ora.split('-');
                const op = OPERATORI.find(o => o.id === a.operatoreId) || {};
                const assistito = Object.values(DEMO_USERS).find(u => u.id === a.assistitoId) || {};
                return `<div class="d-flex align-items-start py-2 border-bottom">
                  <div class="schedule-time me-3 text-end"><div class="fw-bold">${oraInizio || a.ora}</div></div>
                  <div><div class="fw-semibold">${a.descrizione}</div><div class="small text-muted">Op. ${op.alias || '—'} con ${assistito.alias || assistito.nome}</div></div>
                </div>`;
              }).join('') : '<p class="text-muted pt-2">Nessun appuntamento oggi.</p>'}
            </div>
          </div>

          <!-- Mini calendario -->
          <div class="card">
            <div class="card-body">
              ${CalendarioWidget.renderMini(APPUNTAMENTI, calAnno, calMese)}
            </div>
          </div>
        </div>
      </div>

      <!-- Videochiamata di controllo -->
      <div class="card mb-3 border-0" style="background:linear-gradient(135deg,#1e293b,#0f172a); color:white;">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <div class="d-flex align-items-center mb-1">
              <i class="fa-solid fa-shield-halved me-2"></i>
              <strong class="small">Videochiamata di controllo</strong>
            </div>
            <small style="opacity:.8">Accesso a sessioni di verifica legale tra operatori e assistiti.</small>
          </div>
          <button class="btn btn-light btn-sm" onclick="Router.navigate('videochiamata')">
            <i class="fa-solid fa-video me-1"></i> Monitora
          </button>
        </div>
      </div>

      <!-- Dashboard supervisore completa -->
      <button class="btn btn-primary w-100" onclick="Router.navigate('dashboardSupervisore')">
        <i class="fa-solid fa-chart-pie me-2"></i> Dashboard supervisore completa
      </button>
    </div>
  `;
};