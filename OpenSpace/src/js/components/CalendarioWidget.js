var CalendarioWidget = CalendarioWidget || {};

CalendarioWidget.currentYear = null;
CalendarioWidget.currentMonth = null;

/**
 * Renderizza la griglia mensile grande (per la pagina Calendario).
 */
CalendarioWidget.render = function(appuntamenti = [], anno, mese) {
  const today = new Date();
  const y = anno !== undefined ? anno : today.getFullYear();
  const m = mese !== undefined ? mese : today.getMonth();
  const nomeMese = new Date(y, m, 1).toLocaleString('it-IT', { month: 'long' });
  const oggiISO = today.toISOString().slice(0,10);
  const selectedDate = window.calSelectedDate || oggiISO;

  const primoGiorno = new Date(y, m, 1).getDay();
  const giorniNelMese = new Date(y, m + 1, 0).getDate();
  const offset = primoGiorno === 0 ? 6 : primoGiorno - 1; // lunedì=0

  const appPerGiorno = {};
  appuntamenti.forEach(a => {
    const key = a.data;
    if (!appPerGiorno[key]) appPerGiorno[key] = [];
    appPerGiorno[key].push(a);
  });

  const giorniSettimana = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
  const headerGiorni = giorniSettimana.map(g => `<div class="cal-head">${g}</div>`).join('');

  const celle = [];
  for (let i = 0; i < offset; i++) {
    celle.push(`<div class="cal-day muted" aria-hidden="true"></div>`);
  }

  for (let giorno = 1; giorno <= giorniNelMese; giorno++) {
    const dataISO = `${y}-${String(m+1).padStart(2,'0')}-${String(giorno).padStart(2,'0')}`;
    const isToday = dataISO === oggiISO;
    const isSelected = dataISO === selectedDate;
    const eventiGiorno = appPerGiorno[dataISO] || [];

    let classi = 'cal-day';
    if (isToday) classi += ' today';
    if (isSelected) classi += ' selected';

    const dayNum = `<span class="day-num">${giorno}</span>`;

    let eventiHTML = '';
    const maxEventi = 3;
    eventiGiorno.slice(0, maxEventi).forEach(ev => {
      const colore = ev.tipo === 'video' ? 'violet' : ev.tipo === 'presenza' ? 'green' : 'blue';
      eventiHTML += `<div class="ev ${colore}" title="${ev.descrizione} (${ev.ora})">${ev.descrizione}</div>`;
    });
    if (eventiGiorno.length > maxEventi) {
      eventiHTML += `<div class="more">+ ${eventiGiorno.length - maxEventi} altri</div>`;
    }

    celle.push(`
      <div class="${classi}" data-date="${dataISO}" role="button" tabindex="0"
           onclick="CalendarioWidget.selectDay('${dataISO}')"
           aria-label="${giorno} ${nomeMese}">
        ${dayNum}
        ${eventiHTML}
      </div>
    `);
  }

  return `
    <div class="cal-grid" role="grid" aria-label="Calendario ${nomeMese} ${y}">
      ${headerGiorni}
      ${celle.join('')}
    </div>
  `;
};

/**
 * Mini-calendario (dashboard e laterale)
 */
CalendarioWidget.renderMini = function(appuntamenti = [], anno, mese) {
  const today = new Date();
  const y = anno !== undefined ? anno : today.getFullYear();
  const m = mese !== undefined ? mese : today.getMonth();
  const nomeMese = new Date(y, m, 1).toLocaleString('it-IT', { month: 'long' });
  const oggiISO = today.toISOString().slice(0,10);

  const primoGiorno = new Date(y, m, 1).getDay();
  const giorniNelMese = new Date(y, m + 1, 0).getDate();
  const offset = primoGiorno === 0 ? 6 : primoGiorno - 1;

  // Raggruppa appuntamenti per giorno e per tipo
  const appPerGiorno = {};
  appuntamenti.forEach(a => {
    const key = a.data;
    if (!appPerGiorno[key]) appPerGiorno[key] = [];
    appPerGiorno[key].push(a);
  });

  // Mappa tipo → colore
  const coloreTipo = {
    'firma': 'var(--accent)',
    'presenza': 'var(--success)',
    'video': 'var(--violet, #8E5BD8)'
  };

  const giorniSettimana = ['L','M','M','G','V','S','D'];
  const headerGiorni = giorniSettimana.map(g => `<div class="mc-head">${g}</div>`).join('');

  const celle = [];
  for (let i = 0; i < offset; i++) {
    celle.push(`<div class="mc-day muted" aria-hidden="true"></div>`);
  }
  for (let giorno = 1; giorno <= giorniNelMese; giorno++) {
    const dataISO = `${y}-${String(m+1).padStart(2,'0')}-${String(giorno).padStart(2,'0')}`;
    const isToday = dataISO === oggiISO;
    const eventiGiorno = appPerGiorno[dataISO] || [];

    let classi = 'mc-day';
    if (isToday) classi += ' today';

    // Raccogli i tipi unici degli eventi del giorno
    const tipiUnici = [...new Set(eventiGiorno.map(e => e.tipo))];

    // Crea i pallini colorati (massimo 3, altrimenti mettiamo un "+")
    let dotsHTML = '';
    const maxDots = 3;
    tipiUnici.slice(0, maxDots).forEach(tipo => {
      const colore = coloreTipo[tipo] || coloreTipo['firma'];
      dotsHTML += `<span class="mc-dot" style="background:${colore}" title="${tipo}"></span>`;
    });
    if (tipiUnici.length > maxDots) {
      dotsHTML += `<span class="mc-dot-more">+</span>`;
    }

    celle.push(`
      <div class="${classi}" data-date="${dataISO}" role="button" tabindex="0"
           onclick="CalendarioWidget.selectDay('${dataISO}')"
           aria-label="${giorno} ${nomeMese}">
        <span class="mc-num">${giorno}</span>
        <span class="mc-dots">${dotsHTML}</span>
      </div>
    `);
  }

  const prevMonth = m === 0 ? 11 : m-1;
  const nextMonth = m === 11 ? 0 : m+1;
  const prevYear = m === 0 ? y-1 : y;
  const nextYear = m === 11 ? y+1 : y;

  return `
    <div class="mini-calendar" aria-label="Mini calendario ${nomeMese} ${y}">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="fw-semibold">${nomeMese} ${y}</span>
        <div class="d-flex gap-1">
          <button class="btn btn-sm btn-outline-secondary p-0 px-1" onclick="CalendarioWidget.changeMonthMini(${prevYear}, ${prevMonth})" aria-label="Mese precedente"><i class="fa-solid fa-chevron-left fa-xs"></i></button>
          <button class="btn btn-sm btn-outline-secondary p-0 px-1" onclick="CalendarioWidget.changeMonthMini(${nextYear}, ${nextMonth})" aria-label="Mese successivo"><i class="fa-solid fa-chevron-right fa-xs"></i></button>
        </div>
      </div>
      <div class="mini-cal">
        ${headerGiorni}
        ${celle.join('')}
      </div>
      <div class="mc-legend mt-2 small">
        <span><span class="mc-dot-legend" style="background:var(--accent)"></span>Firma</span>
        <span><span class="mc-dot-legend" style="background:var(--success)"></span>In presenza</span>
        <span><span class="mc-dot-legend" style="background:var(--violet, #8E5BD8)"></span>Videocall</span>
      </div>
    </div>
  `;
};

/**
 * Seleziona un giorno: aggiorna la variabile globale e ricarica la vista corrente.
 */
CalendarioWidget.selectDay = function(dataISO) {
  window.calSelectedDate = dataISO;
  const currentView = App.currentView || 'home';
  if (currentView === 'calendario') {
    // Siamo già nella pagina Calendario, rigenera solo il contenuto
    document.getElementById('app-content').innerHTML = Views.calendario();
  } else {
    // Dalla dashboard (o altre viste), naviga alla pagina Calendario
    Router.navigate('calendario');
  }
  if (Accessibility && Accessibility.settings.ttsEnabled) Accessibility.tts.readCurrentPage();
};

/**
 * Cambia il mese nella pagina Calendario (chiamato dalla toolbar).
 */
CalendarioWidget.changeMonthCal = function(anno, mese) {
  window.calAnno = anno;
  window.calMese = mese;
  document.getElementById('app-content').innerHTML = Views.calendario();
  if (Accessibility && Accessibility.settings.ttsEnabled) Accessibility.tts.readCurrentPage();
};

/**
 * Cambia il mese nel mini-calendario della dashboard.
 */
CalendarioWidget.changeMonthMini = function(anno, mese) {
  window.calAnno = anno;
  window.calMese = mese;
  const currentView = App.currentView || 'home';
  if (currentView === 'home') {
    document.getElementById('app-content').innerHTML = Views.home();
    if (Accessibility && Accessibility.settings.ttsEnabled) Accessibility.tts.readCurrentPage();
  }
};

/**
 * Torna alla data odierna.
 */
CalendarioWidget.goToday = function() {
  const oggi = new Date();
  window.calAnno = oggi.getFullYear();
  window.calMese = oggi.getMonth();
  delete window.calSelectedDate;
  const currentView = App.currentView || 'home';
  if (currentView === 'calendario') {
    document.getElementById('app-content').innerHTML = Views.calendario();
  } else {
    document.getElementById('app-content').innerHTML = Views.home();
  }
  if (Accessibility && Accessibility.settings.ttsEnabled) Accessibility.tts.readCurrentPage();
};