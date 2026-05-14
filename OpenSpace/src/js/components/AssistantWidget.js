// AssistantWidget.js - Assistente guidato (non IA reale)

const AssistantWidget = {
  isOpen: false,
  currentView: 'menu', // 'menu' | 'response'

  render() {
    // Bottone flottante
    const fab = document.createElement('button');
    fab.className = 'assistant-fab';
    fab.id = 'assistant-fab';
    fab.innerHTML = '<i class="fa-solid fa-hand-sparkles"></i>';
    fab.title = 'Come posso aiutarti?';
    fab.addEventListener('click', () => this.toggle());
    document.body.appendChild(fab);

    // Pannello
    const panel = document.createElement('div');
    panel.className = 'assistant-panel';
    panel.id = 'assistant-panel';
    panel.innerHTML = this.renderMenu();
    document.body.appendChild(panel);

    // Chiudi click fuori
    document.addEventListener('click', (e) => {
      if (this.isOpen && !panel.contains(e.target) && e.target !== fab) {
        this.close();
      }
    });

    // Event delegation per opzioni e back
    panel.addEventListener('click', (e) => {
      const option = e.target.closest('.assistant-option');
      const backBtn = e.target.closest('.assistant-back');
      const closeBtn = e.target.closest('.assistant-close');

      if (option) {
        const key = option.dataset.key;
        this.showResponse(key);
      }
      if (backBtn) {
        this.showMenu();
      }
      if (closeBtn) {
        this.close();
      }
    });
  },

  toggle() {
    this.isOpen ? this.close() : this.open();
  },

  open() {
    this.isOpen = true;
    this.showMenu();
    document.getElementById('assistant-panel').classList.add('open');
  },

  close() {
    this.isOpen = false;
    document.getElementById('assistant-panel').classList.remove('open');
  },

  showMenu() {
    this.currentView = 'menu';
    document.getElementById('assistant-panel').innerHTML = this.renderMenu();
  },

  showResponse(key) {
    this.currentView = 'response';
    const risposta = ASSISTANT_RISPOSTE[key];
    document.getElementById('assistant-panel').innerHTML = this.renderResponse(risposta);
  },

  renderMenu() {
    return `
      <div class="assistant-header">
        <span><i class="fa-solid fa-hand-sparkles me-2"></i><strong>Come posso aiutarti?</strong></span>
        <button class="btn btn-sm text-white assistant-close" style="padding:0;line-height:1">&times;</button>
      </div>
      <div class="assistant-body">
        <button class="assistant-option" data-key="cercaGruppo">
          <i class="fa-solid fa-compass me-2"></i>Cerco un gruppo vicino a me
        </button>
        <button class="assistant-option" data-key="comeFunziona">
          <i class="fa-solid fa-circle-question me-2"></i>Come funziona il supporto tra pari?
        </button>
        <button class="assistant-option" data-key="tipoGruppo">
          <i class="fa-solid fa-layer-group me-2"></i>Che tipo di gruppo fa per me?
        </button>
        <button class="assistant-option" data-key="parlare">
          <i class="fa-solid fa-comment-dots me-2"></i>Ho bisogno di parlare con qualcuno
        </button>
      </div>`;
  },

  renderResponse(risposta) {
    return `
      <div class="assistant-header">
        <span><strong>${risposta.titolo}</strong></span>
        <button class="btn btn-sm text-white assistant-close" style="padding:0;line-height:1">&times;</button>
      </div>
      <div class="assistant-body assistant-response">
        <p>${risposta.testo}</p>
        <button class="btn btn-sm btn-outline-light assistant-back" style="color:var(--secondary);border-color:var(--secondary)">
          <i class="fa-solid fa-arrow-left me-1"></i>Torna alle domande
        </button>
      </div>`;
  }
};