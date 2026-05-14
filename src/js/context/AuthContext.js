// AuthContext.js - Gestione autenticazione per OpenSpace

const Auth = {
  _user: null,

  init() {
    const saved = sessionStorage.getItem('OpenSpace_user');
    if (saved) {
      try {
        this._user = JSON.parse(saved);
      } catch (e) {
        this._user = null;
      }
    }
    return this._user;
  },

  getUser() {
    const saved = sessionStorage.getItem('OpenSpace_user');
    if (saved) {
      try {
        this._user = JSON.parse(saved);
      } catch (e) {
        this._user = null;
      }
    }
    return this._user;
  },

  isLoggedIn() {
    return sessionStorage.getItem('OpenSpace_user') !== null;
  },

  login(email, password) {
    if (password !== 'demo') {
      return { success: false, error: 'Password non corretta. Per la demo, usa: demo' };
    }
    
    // 1. Controlla se esiste già una sessione salvata
    const existing = sessionStorage.getItem('OpenSpace_user');
    if (existing) {
      try {
        this._user = JSON.parse(existing);
        return { success: true };
      } catch (e) {
        this._user = null;
      }
    }
    
    // 2. Cerca tra i profili demo predefiniti
    if (DEMO_USERS && DEMO_USERS[email]) {
      this._user = { ...DEMO_USERS[email] };
      sessionStorage.setItem('OpenSpace_user', JSON.stringify(this._user));
      return { success: true };
    }
    
    // 3. Email non trovata
    return { success: false, error: 'Email non riconosciuta. Prova: mario@OpenSpace.it, operatore@OpenSpace.it o supervisore@OpenSpace.it' };
  },

  register(nome, email, password) {
    const nuovoUtente = {
      id: Date.now(),
      nome: nome.trim(),
      alias: nome.trim().split(' ')[0],
      email: email.trim(),
      avatar: nome.trim().split(' ').map(n => n[0]).join('').toUpperCase(),
      ruolo: 'assistito',
      accessibilita: {
        modalitaFacile: false,
        textToSpeech: false,
        contrastoAlto: false
      }
    };
    
    this._user = nuovoUtente;
    sessionStorage.setItem('OpenSpace_user', JSON.stringify(this._user));
    return { success: true };
  },

  logout() {
    this._user = null;
    sessionStorage.removeItem('OpenSpace_user');
  }
};