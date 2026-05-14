// mock.js - Dati dimostrativi per OpenSpace

var DEMO_USERS = {
  'mario@OpenSpace.it': {
    id: 1,
    nome: 'Mario Bianchi',
    alias: 'Mario',
    email: 'mario@OpenSpace.it',
    avatar: 'MB',
    ruolo: 'assistito',
    operatoreFiducia: 2,
    accessibilita: {
      easyMode: true,
      ttsEnabled: true,
      highContrast: false,
      profileDyslexia: false,
      profileADHD: false,
      profileAutism: false,
      profileDyscalculia: false,
      iaSimplification: false
    }
  },
  'operatore@OpenSpace.it': {
    id: 2,
    nome: 'Laura Rossi',
    alias: 'Laura',
    email: 'operatore@OpenSpace.it',
    avatar: 'LR',
    ruolo: 'operatore',
    assistiti: [1, 4],   // aggiunto assistito extra per test
    documentiCreati: [101, 102],
    accessibilita: {
      easyMode: false,
      ttsEnabled: false,
      highContrast: true,
      profileDyslexia: false,
      profileADHD: false,
      profileAutism: false,
      profileDyscalculia: false,
      iaSimplification: false
    }
  },
  'supervisore@OpenSpace.it': {
    id: 3,
    nome: 'Dott. Controlli',
    alias: 'Supervisore',
    email: 'supervisore@OpenSpace.it',
    avatar: 'SV',
    ruolo: 'supervisore',
    accessibilita: {
      easyMode: false,
      ttsEnabled: false,
      highContrast: false,
      profileDyslexia: false,
      profileADHD: false,
      profileAutism: false,
      profileDyscalculia: false,
      iaSimplification: false
    }
  },
  // Assistito fittizio per test operatore/supervisore
  'giulia@OpenSpace.it': {
    id: 4,
    nome: 'Giulia Verdi',
    alias: 'Giulia',
    email: 'giulia@OpenSpace.it',
    avatar: 'GV',
    ruolo: 'assistito',
    operatoreFiducia: 2,
    accessibilita: {
      easyMode: false,
      ttsEnabled: false,
      highContrast: false,
      profileDyslexia: false,
      profileADHD: false,
      profileAutism: false,
      profileDyscalculia: false,
      iaSimplification: false
    }
  }
};

var DOCUMENTI = [
  {
    id: 101,
    titolo: 'Consenso trattamento dati',
    titoloSemplice: 'Permesso uso dati',
    descrizione: 'Autorizzazione al trattamento dei dati personali per il servizio di assistenza.',
    descrizioneSemplice: 'Ti chiediamo il permesso di usare i tuoi dati per aiutarti.',
    stato: 'in_attesa',
    mittente: 'Laura Rossi',
    destinatario: 'Mario Bianchi',
    dataInvio: '2026-05-13T10:00:00',
    dataFirma: null,
    modalitaFirma: null,
    hash: 'a1b2c3d4',
    logAccessi: [
      { utente: 'Laura Rossi', azione: 'invio', data: '2026-05-13T10:00:00' },
      { utente: 'Mario Bianchi', azione: 'visualizzazione', data: '2026-05-13T11:00:00' }
    ]
  },
  {
    id: 102,
    titolo: 'Delega accompagnamento',
    titoloSemplice: 'Delega per visita medica',
    descrizione: 'Delega per accompagnamento a visita medica specialistica.',
    descrizioneSemplice: 'Autorizzi qualcuno ad andare con te dal dottore.',
    stato: 'firmato',
    mittente: 'Laura Rossi',
    destinatario: 'Mario Bianchi',
    dataInvio: '2026-05-10T09:00:00',
    dataFirma: '2026-05-10T14:30:00',
    modalitaFirma: 'pollice',
    hash: 'e5f6g7h8',
    logAccessi: [
      { utente: 'Laura Rossi', azione: 'invio', data: '2026-05-10T09:00:00' },
      { utente: 'Mario Bianchi', azione: 'visualizzazione', data: '2026-05-10T14:00:00' },
      { utente: 'Mario Bianchi', azione: 'firma', data: '2026-05-10T14:30:00', ip: '192.168.1.1' }
    ]
  }
];

var OPERATORI = [
  {
    id: 2,
    nome: 'Laura Rossi',
    alias: 'Laura',
    badge: 'Operatore di fiducia',
    assistiti: [1, 4],
    documentiCreati: [101, 102]
  },
  {
    id: 4,
    nome: 'Giovanni Verdi',
    alias: 'Giovanni',
    badge: 'Amministratore di sostegno',
    assistiti: [1],
    delegaLegale: true
  }
];

var LOG_GENERALE = [
  {
    id: 1,
    data: '2026-05-14T09:15:00',
    utente: 'Mario Bianchi',
    utenteId: 1,
    azione: 'Accesso al sistema',
    dettaglio: 'Login effettuato con successo',
    ip: '192.168.1.10'
  },
  {
    id: 2,
    data: '2026-05-14T09:30:00',
    utente: 'Mario Bianchi',
    utenteId: 1,
    azione: 'Visualizzazione documento',
    dettaglio: 'Documento #101 - Consenso trattamento dati',
    ip: '192.168.1.10'
  },
  {
    id: 3,
    data: '2026-05-14T09:45:00',
    utente: 'Laura Rossi',
    utenteId: 2,
    azione: 'Invio documento',
    dettaglio: 'Documento #102 inviato a Mario Bianchi',
    ip: '192.168.1.20'
  },
  {
    id: 4,
    data: '2026-05-14T10:00:00',
    utente: 'Laura Rossi',
    utenteId: 2,
    azione: 'Conferma appuntamento',
    dettaglio: 'Appuntamento #1 confermato con Mario Bianchi',
    ip: '192.168.1.20'
  },
  {
    id: 5,
    data: '2026-05-14T10:15:00',
    utente: 'Dott. Controlli',
    utenteId: 3,
    azione: 'Accesso supervisore',
    dettaglio: 'Monitoraggio globale',
    ip: '192.168.1.30'
  }
];

// Appuntamenti con date calcolate dinamicamente per coprire oggi e giorni successivi
(function() {
  var oggi = new Date();
  var oggiISO = oggi.toISOString().slice(0,10);
  var domani = new Date(oggi);
  domani.setDate(domani.getDate() + 1);
  var domaniISO = domani.toISOString().slice(0,10);
  var dopodomani = new Date(oggi);
  dopodomani.setDate(dopodomani.getDate() + 2);
  var dopodomaniISO = dopodomani.toISOString().slice(0,10);

  // Appuntamenti con date fisse per maggio 2026
  window.APPUNTAMENTI = [
    {
      id: 1,
      assistitoId: 1,
      operatoreId: 2,
      data: '2026-05-14',
      ora: '10:00-10:30',
      tipo: 'presenza',
      descrizione: 'Firma consenso trattamento dati',
      stato: 'confermato'
    },
    {
      id: 2,
      assistitoId: 1,
      operatoreId: 2,
      data: '2026-05-15',
      ora: '11:00-11:45',
      tipo: 'video',
      descrizione: 'Revisione documenti',
      stato: 'confermato'
    },
    {
      id: 3,
      assistitoId: 1,
      operatoreId: 2,
      data: '2026-05-16',
      ora: '15:30-16:00',
      tipo: 'presenza',
      descrizione: 'Consegna referto',
      stato: 'richiesto'
    },
    {
      id: 4,
      assistitoId: 4,
      operatoreId: 2,
      data: '2026-05-14',
      ora: '14:00-14:30',
      tipo: 'presenza',
      descrizione: 'Spiegazione procedura',
      stato: 'confermato'
    },
    {
      id: 5,
      assistitoId: 1,
      operatoreId: 4,
      data: '2026-05-15',
      ora: '09:00-09:30',
      tipo: 'video',
      descrizione: 'Verifica identità',
      stato: 'confermato'
    },
    {
      id: 6,
      assistitoId: 1,
      operatoreId: 2,
      data: '2026-05-14',
      ora: '16:00-16:30',
      tipo: 'video',
      descrizione: 'Consulenza legale',
      stato: 'confermato'
    }
  ];
})();

var NOTIFICHE = [
  {
    id: 1,
    utenteId: 2,
    messaggio: 'Nuova richiesta di appuntamento da Mario Bianchi',
    data: '2026-05-13T12:00:00',
    letta: false
  }
];

var Views = {};

console.log('Mock caricati correttamente');