// AccessibilityContext.js
const Accessibility = (() => {
  // Stato interno
  let settings = {
    ttsEnabled: false,
    easyMode: false,
    highContrast: false,
    profileDyslexia: false,
    profileADHD: false,
    profileAutism: false,
    profileDyscalculia: false,
    iaSimplification: false,
    notifichePush: true  // default attivo per tutti
  };

  // Carica da localStorage (se presente)
  function load() {
    const saved = localStorage.getItem('OpenSpace_accessibility');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        Object.assign(settings, parsed);
      } catch (e) {}
    }
    applyAll();
  }

  // Nuovo metodo: carica le preferenze da un oggetto utente e sovrascrivi
  function loadFromUser(user) {
    if (user && user.accessibilita) {
      Object.assign(settings, user.accessibilita);
      save();
      applyAll();
    }
  }

  // Salva su localStorage
  function save() {
    localStorage.setItem('OpenSpace_accessibility', JSON.stringify(settings));
  }

  // Applica tutte le classi al body
  function applyAll() {
    const body = document.body;
    // Rimuovi tutte le classi che potremmo aver aggiunto
    body.classList.remove(
      'dyslexia-friendly', 'adhd-friendly', 'autism-friendly',
      'dyscalculia-friendly', 'easy-mode', 'high-contrast'
    );

    if (settings.profileDyslexia) body.classList.add('dyslexia-friendly');
    if (settings.profileADHD) body.classList.add('adhd-friendly');
    if (settings.profileAutism) body.classList.add('autism-friendly');
    if (settings.profileDyscalculia) body.classList.add('dyscalculia-friendly');
    if (settings.easyMode) body.classList.add('easy-mode');
    if (settings.highContrast) body.classList.add('high-contrast');
  }

  // Aggiorna una singola impostazione
  function setSetting(key, value) {
    settings[key] = value;
    save();
    applyAll();
    const labelMap = {
      ttsEnabled: 'Lettura automatica',
      easyMode: 'Modalità facile',
      highContrast: 'Contrasto alto',
      profileDyslexia: 'Profilo dislessia',
      profileADHD: 'Profilo ADHD',
      profileAutism: 'Profilo autismo',
      profileDyscalculia: 'Profilo discalculia',
      iaSimplification: 'Semplificazione IA'
    };
    const message = value ? `${labelMap[key]} attivato` : `${labelMap[key]} disattivato`;
    announce(message);
  }

  // Funzione per annunciare cambiamenti agli screen reader
  function announce(message) {
    let announcer = document.getElementById('a11y-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'a11y-announcer';
      announcer.className = 'sr-only';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      document.body.appendChild(announcer);
    }
    announcer.textContent = '';
    setTimeout(() => { announcer.textContent = message; }, 50);
  }

  // TTS Manager
  const tts = {
    synth: window.speechSynthesis,
    speaking: false,
    speak: (text, options = {}) => {
      if (tts.synth.speaking) tts.synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options.rate || 0.9;
      utterance.pitch = options.pitch || 1;
      utterance.lang = 'it-IT';
      const voices = tts.synth.getVoices().filter(v => v.lang.startsWith('it'));
      if (voices.length) utterance.voice = voices[0];
      tts.synth.speak(utterance);
      tts.speaking = true;
    },
    stop: () => {
      tts.synth.cancel();
      tts.speaking = false;
    },
    readCurrentPage: () => {
      const content = document.getElementById('app-content');
      if (content && settings.ttsEnabled) {
        const text = content.innerText;
        if (text.trim()) tts.speak(text);
      }
    }
  };

  // Inizializzazione
  document.addEventListener('DOMContentLoaded', load);

  // Esponi API pubblica
  return {
    settings,
    load,
    loadFromUser,
    setSetting,
    applyAll,
    announce,
    tts
  };
})();