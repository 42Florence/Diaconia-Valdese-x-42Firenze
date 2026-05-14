Views.calendario = function() {
  const user = Auth.getUser();
  if (!user) return '';

  // Filtra appuntamenti per ruolo
  let appuntamenti = [];
  if (user.ruolo === 'assistito') {
    appuntamenti = APPUNTAMENTI.filter(a => a.assistitoId === user.id);
  } else if (user.ruolo === 'operatore') {
    const assistitiIds = user.assistiti || [];
    appuntamenti = APPUNTAMENTI.filter(a => a.operatoreId === user.id || assistitiIds.includes(a.assistitoId));
  } else if (user.ruolo === 'supervisore') {
    appuntamenti = APPUNTAMENTI.slice();
  }

  const oggi = new Date();
  const calAnno = window.calAnno !== undefined ? window.calAnno : oggi.getFullYear();
  const calMese = window.calMese !== undefined ? window.calMese : oggi.getMonth();
  const oggiISO = oggi.toISOString().slice(0,10);

  // Giorno selezionato (oggi di default)
  const selDate = window.calSelectedDate || oggiISO;
  const appSel = APPUNTAMENTI.filter(a => a.data === selDate).sort((a,b) => a.ora.localeCompare(b.ora));

  // Calcolo mese precedente e successivo (per la toolbar)
  const prevDate = new Date(calAnno, calMese - 1, 1);
  const nextDate = new Date(calAnno, calMese + 1, 1);
  const prevYear = prevDate.getFullYear();
  const prevMonth = prevDate.getMonth();
  const nextYear = nextDate.getFullYear();
  const nextMonth = nextDate.getMonth();

  // Prossimi appuntamenti (fino a 5)
  const prossimi = appuntamenti.filter(a => a.data >= oggiISO && a.stato !== 'annullato')
    .sort((a,b) => a.data.localeCompare(b.data) || a.ora.localeCompare(b.ora))
    .slice(0, 5);

  // Nome del giorno selezionato in formato esteso
  const giornoSelezionato = new Date(selDate + 'T00:00:00').toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });

  return `
    <div class="container py-4">
      <button class="btn btn-link text-decoration-none mb-3 ps-0" onclick="Router.navigate('home')">
        <i class="fa-solid fa-arrow-left me-1"></i>Torna alla dashboard
      </button>

      <section class="page-head d-flex flex-wrap justify-content-between align-items-start mb-4">
        <div>
          <h1 class="h3 fw-bold mb-1">Calendario</h1>
          <p class="text-muted mb-0">Gestisci i tuoi appuntamenti e firme programmate.</p>
        </div>
        <div class="d-flex gap-2 mt-2 mt-md-0">
          <div class="view-switch" role="tablist" aria-label="Vista">
            <button class="btn btn-sm btn-outline-secondary active" disabled>Giorno</button>
            <button class="btn btn-sm btn-outline-secondary" disabled>Settimana</button>
            <button class="btn btn-sm btn-outline-secondary" disabled>Mese</button>
          </div>
          <button class="btn btn-primary" onclick="Views.mostraRichiediAppuntamento()">
            <i class="fa-solid fa-plus me-1"></i>Nuovo appuntamento
          </button>
        </div>
      </section>

      <!-- Toolbar con navigazione mese e giorno selezionato -->
      <div class="cal-toolbar mb-4">
        <div class="d-flex align-items-center gap-2 mb-2">
          <button class="btn btn-sm btn-outline-secondary" onclick="CalendarioWidget.changeMonthCal(${prevYear}, ${prevMonth})">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <span class="fw-semibold fs-5">${new Date(calAnno, calMese).toLocaleString('it-IT', { month: 'long', year: 'numeric' })}</span>
          <button class="btn btn-sm btn-outline-secondary" onclick="CalendarioWidget.changeMonthCal(${nextYear}, ${nextMonth})">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
          <button class="btn btn-sm btn-outline-secondary" onclick="CalendarioWidget.goToday()">Oggi</button>
        </div>
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div class="fw-semibold text-dark">
            <i class="fa-regular fa-calendar-check me-1"></i>${giornoSelezionato}
          </div>
          <div class="legend d-flex gap-3 small">
            <span><span class="dot" style="background:var(--accent)"></span>Firma</span>
            <span><span class="dot" style="background:var(--success)"></span>In presenza</span>
            <span><span class="dot" style="background:var(--violet, #8E5BD8)"></span>Videocall</span>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <!-- Colonna principale: eventi del giorno -->
        <div class="col-lg-8">
          <div class="card">
            <div class="card-header bg-white border-0 pt-3 pb-0">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <div class="fw-semibold">${giornoSelezionato}</div>
                  <small class="text-muted">${appSel.length} appuntament${appSel.length !== 1 ? 'i' : 'o'}</small>
                </div>
                <button class="btn btn-sm btn-outline-primary" onclick="Views.mostraRichiediAppuntamento()">+ Aggiungi</button>
              </div>
            </div>
            <div class="card-body pt-2">
              ${appSel.length > 0 ? appSel.map(a => {
                const [oraInizio, oraFine] = a.ora.split('-');
                const op = OPERATORI.find(o => o.id === a.operatoreId) || {};
                const assistito = Object.values(DEMO_USERS).find(u => u.id === a.assistitoId) || {};
                const tipoTag = a.tipo === 'video' ? 'Videocall' : a.tipo === 'presenza' ? 'In presenza' : 'Firma';
                const tagClass = a.tipo === 'video' ? 'violet' : a.tipo === 'presenza' ? 'green' : 'blue';
                return `
                  <div class="schedule-item py-2 border-bottom">
                    <div class="sch-time me-3 text-end">
                      <div class="fw-bold">${oraInizio || a.ora}</div>
                      ${oraFine ? `<small class="text-muted">${oraFine}</small>` : ''}
                    </div>
                    <div class="sch-bar ${tagClass}"></div>
                    <div>
                      <div class="fw-semibold">${a.descrizione}</div>
                      <div class="small text-muted">con ${op.alias || assistito.alias || assistito.nome || 'Operatore'}</div>
                      <span class="sch-tag" style="background:${tagClass==='blue'?'var(--accent-soft)':'#F1E8FB'}; color:${tagClass==='blue'?'var(--accent)':'#6A3FB0'}">${tipoTag}</span>
                    </div>
                  </div>
                `;
              }).join('') : '<p class="text-muted">Nessun appuntamento in questo giorno.</p>'}
            </div>
          </div>
        </div>

        <!-- Colonna laterale: mini calendario + prossimi eventi -->
        <div class="col-lg-4 d-flex flex-column gap-3">
          <div class="card">
            <div class="card-body">
              ${CalendarioWidget.renderMini(appuntamenti, calAnno, calMese)}
            </div>
          </div>

          <div class="card">
            <div class="card-header bg-white border-0 pt-3 pb-0">
              <h2 class="h5 fw-semibold mb-0">Prossimi appuntamenti</h2>
            </div>
            <div class="card-body pt-2">
              ${prossimi.length > 0 ? prossimi.map(a => {
                const dataApp = new Date(a.data + 'T00:00:00');
                const giorno = dataApp.getDate();
                const mese = dataApp.toLocaleDateString('it-IT', { month: 'short' });
                return `
                  <div class="d-flex align-items-center py-2 border-bottom">
                    <div class="up-date me-3 text-center p-1 rounded-2 bg-light" style="min-width:42px">
                      <div class="fw-bold">${giorno}</div>
                      <small class="text-muted">${mese}</small>
                    </div>
                    <div>
                      <div class="fw-semibold">${a.descrizione}</div>
                      <small class="text-muted">${a.ora}</small>
                    </div>
                  </div>
                `;
              }).join('') : '<p class="text-muted">Nessun appuntamento futuro.</p>'}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

// Helper invariati
CalendarioWidget.changeMonthCal = function(anno, mese) {
  window.calAnno = anno;
  window.calMese = mese;
  document.getElementById('app-content').innerHTML = Views.calendario();
  if (Accessibility && Accessibility.settings.ttsEnabled) Accessibility.tts.readCurrentPage();
};

CalendarioWidget.goToday = function() {
  const oggi = new Date();
  window.calAnno = oggi.getFullYear();
  window.calMese = oggi.getMonth();
  delete window.calSelectedDate;
  document.getElementById('app-content').innerHTML = Views.calendario();
  if (Accessibility && Accessibility.settings.ttsEnabled) Accessibility.tts.readCurrentPage();
};

Views.mostraDettaglioGiorno = function(dataISO) {
  window.calSelectedDate = dataISO;
  document.getElementById('app-content').innerHTML = Views.calendario();
  if (Accessibility && Accessibility.settings.ttsEnabled) Accessibility.tts.readCurrentPage();
};