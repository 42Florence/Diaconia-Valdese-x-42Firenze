// Impostazioni.js - Impostazioni generali e accessibilità (neurodivergenze)

Views.impostazioni = function() {
  const user = Auth.getUser();
  if (!user) return '';

  // Leggiamo lo stato attuale da Accessibility, non più da user.accessibilita
  const s = Accessibility.settings; // { ttsEnabled, easyMode, profileDyslexia, profileADHD, profileAutism, profileDyscalculia }

  return `
    <div class="container py-4">
      <button class="btn btn-link text-decoration-none mb-3 ps-0" onclick="Router.navigate('profile')">
        <i class="fa-solid fa-arrow-left me-1"></i>Torna al profilo
      </button>

      <h1 class="h5 mb-4"><i class="fa-solid fa-gear me-2"></i>Impostazioni</h1>

      <!-- Dati personali -->
      <div class="card mb-4">
        <div class="card-body">
          <h6 class="card-title"><i class="fa-solid fa-user-pen me-2"></i>Dati personali</h6>
          
          <div class="mb-3">
            <label class="form-label small fw-semibold">Nome completo</label>
            <input type="text" class="form-control form-control-sm" id="settings-nome" value="${user.nome || ''}">
          </div>
          
          <div class="mb-3">
            <label class="form-label small fw-semibold">Email</label>
            <input type="email" class="form-control form-control-sm" id="settings-email" value="${user.email || ''}">
          </div>
          
          <div class="mb-3">
            <label class="form-label small fw-semibold">Nuova password</label>
            <input type="password" class="form-control form-control-sm" id="settings-password" placeholder="Lascia vuoto per non cambiare">
          </div>
        </div>
      </div>

      <!-- Accessibilità -->
      <div class="card mb-4">
        <div class="card-body">
          <h6 class="card-title"><i class="fa-solid fa-universal-access me-2"></i>Accessibilità</h6>
          
          <!-- Modalità facile -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <strong class="small">Modalità facile</strong>
              <p class="text-muted small mb-0">Interfaccia semplificata, pulsanti grandi, solo funzioni essenziali.</p>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="switch-easy" ${s.easyMode ? 'checked' : ''}>
            </div>
          </div>

          <!-- Text-to-Speech (lettura automatica) -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <strong class="small">Lettura automatica (Text-to-Speech)</strong>
              <p class="text-muted small mb-0">Legge automaticamente il contenuto delle pagine.</p>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="switch-tts" ${s.ttsEnabled ? 'checked' : ''}>
            </div>
          </div>

          <!-- Contrasto alto – opzionale, non gestito dalle classi neuro ma possiamo aggiungerlo -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <strong class="small">Contrasto alto</strong>
              <p class="text-muted small mb-0">Aumenta il contrasto per ipovedenti e affaticamento visivo.</p>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="switch-contrast" ${s.highContrast ? 'checked' : ''}>
            </div>
          </div>

          <hr>

          <!-- Neurodivergenze -->
          <h6 class="small fw-bold mb-3"><i class="fa-solid fa-brain me-1"></i>Adattamenti per neurodivergenze</h6>

          <!-- Dislessia -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <strong class="small">Font accessibile (Dislessia)</strong>
              <p class="text-muted small mb-0">Utilizza font ad alta leggibilità e spaziatura aumentata.</p>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="switch-dyslexia" ${s.profileDyslexia ? 'checked' : ''}>
            </div>
          </div>

          <!-- ADHD -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <strong class="small">Riduzione distrazioni (ADHD)</strong>
              <p class="text-muted small mb-0">Nasconde animazioni, banner e contenuti secondari.</p>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="switch-adhd" ${s.profileADHD ? 'checked' : ''}>
            </div>
          </div>

          <!-- Autismo -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <strong class="small">Layout prevedibile (Autismo)</strong>
              <p class="text-muted small mb-0">Mantiene la struttura dell'interfaccia coerente e prevedibile.</p>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="switch-autism" ${s.profileAutism ? 'checked' : ''}>
            </div>
          </div>

          <!-- Discalculia -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <strong class="small">Etichette testuali (Discalculia)</strong>
              <p class="text-muted small mb-0">Mostra descrizioni testuali accanto ai numeri.</p>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="switch-dyscalculia" ${s.profileDyscalculia ? 'checked' : ''}>
            </div>
          </div>
        </div>
      </div>

      <!-- IA Text-to-Speech (solo demo) -->
      <div class="card mb-4">
        <div class="card-body">
          <h6 class="card-title"><i class="fa-solid fa-robot me-2"></i>Assistente vocale IA</h6>
          <p class="small text-muted">Utilizza la sintesi vocale del browser (gratuita) per leggere i documenti. L'IA Claude può semplificare il testo prima della lettura.</p>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="small">Semplificazione testo con IA (non implementata nel mockup)</span>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="switch-ia" ${s.iaSimplification ? 'checked' : ''}>
            </div>
          </div>
          <button class="btn btn-outline-primary btn-sm w-100" id="btn-prova-lettura">
            <i class="fa-solid fa-play me-1"></i>Prova lettura della pagina corrente
          </button>
        </div>
      </div>

      <!-- Pulsanti -->
      <button class="btn btn-primary w-100 mb-2" onclick="Views.salvaImpostazioni()">
        <i class="fa-solid fa-floppy-disk me-1"></i>Salva dati personali
      </button>
      <button class="btn btn-outline-secondary w-100" onclick="Router.navigate('profile')">
        Annulla
      </button>
    </div>`;
};

// Inizializzazione degli event listener dopo il rendering
Views.initImpostazioni = function() {
  // Collega gli switch a Accessibility.setSetting
  const bindSwitch = (id, key) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', function() {
        Accessibility.setSetting(key, this.checked);
        // Se attivo il TTS, leggi immediatamente la pagina corrente
        if (key === 'ttsEnabled' && this.checked) {
          Accessibility.tts.readCurrentPage();
        } else if (key === 'ttsEnabled' && !this.checked) {
          Accessibility.tts.stop();
        }
      });
    }
  };

  bindSwitch('switch-easy', 'easyMode');
  bindSwitch('switch-tts', 'ttsEnabled');
  bindSwitch('switch-contrast', 'highContrast');
  bindSwitch('switch-dyslexia', 'profileDyslexia');
  bindSwitch('switch-adhd', 'profileADHD');
  bindSwitch('switch-autism', 'profileAutism');
  bindSwitch('switch-dyscalculia', 'profileDyscalculia');
  bindSwitch('switch-ia', 'iaSimplification');

  // Pulsante di prova lettura
  const btnProva = document.getElementById('btn-prova-lettura');
  if (btnProva) {
    btnProva.addEventListener('click', () => {
      Accessibility.tts.readCurrentPage();
    });
  }
};

Views.salvaImpostazioni = function() {
  const user = Auth.getUser();
  if (!user) return;

  // Dati personali (rimangono separati)
  const nome = document.getElementById('settings-nome')?.value?.trim();
  const email = document.getElementById('settings-email')?.value?.trim();
  const password = document.getElementById('settings-password')?.value;

  if (!nome) { alert('Il nome è obbligatorio.'); return; }
  if (!email || !email.includes('@')) { alert('Inserisci un\'email valida.'); return; }

  user.nome = nome;
  user.email = email;
  // Le impostazioni di accessibilità sono già salvate in tempo reale via Accessibility
  if (password) {
    console.log('Password cambiata (simulato)');
  }

  sessionStorage.setItem('OpenSpace_user', JSON.stringify(user));
  alert('Dati personali salvati! ✅');
  Router.navigate('profile');
};