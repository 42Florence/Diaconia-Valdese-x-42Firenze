// FeedbackWidget.js - Widget valutazione con emoji

const FeedbackWidget = {
  render(domanda = 'Come ti sei sentito/a?', onSubmit = null) {
    const id = 'fb-' + Math.random().toString(36).substr(2, 6);
    
    // Usa setTimeout per attaccare eventi dopo il render nel DOM
    setTimeout(() => {
      this.attachEvents(id, onSubmit);
    }, 10);
    
    return `
      <div class="card border-0 bg-white" id="${id}">
        <div class="card-body text-center py-3">
          <h6 class="card-title small fw-semibold mb-3">${domanda}</h6>
          <div class="d-flex justify-content-center gap-3 feedback-emojis">
            ${['😔','😕','😐','🙂','😊'].map((em, i) => `
              <button class="btn btn-outline-secondary feedback-emoji" data-value="${i+1}" title="${['Molto male','Non bene','Così così','Bene','Molto bene'][i]}">
                ${em}
              </button>
            `).join('')}
          </div>
          <div class="feedback-extra mt-3" style="display:none">
            <textarea class="form-control form-control-sm" rows="2" placeholder="Vuoi aggiungere qualcosa? (opzionale)" id="${id}-commento"></textarea>
            <button class="btn btn-primary btn-sm mt-2 feedback-submit" id="${id}-submit">
              <i class="fa-solid fa-paper-plane me-1"></i>Invia feedback
            </button>
          </div>
        </div>
      </div>`;
  },

  attachEvents(id, onSubmit) {
    const container = document.getElementById(id);
    if (!container) return;
    
    const emojis = container.querySelectorAll('.feedback-emoji');
    const extra = container.querySelector('.feedback-extra');
    const submitBtn = container.querySelector('.feedback-submit');
    let selectedValue = null;

    emojis.forEach(btn => {
      btn.addEventListener('click', () => {
        // Deseleziona tutti
        emojis.forEach(b => {
          b.classList.remove('btn-primary', 'selected');
          b.classList.add('btn-outline-secondary');
        });
        // Seleziona questo
        btn.classList.remove('btn-outline-secondary');
        btn.classList.add('btn-primary', 'selected');
        selectedValue = btn.dataset.value;
        // Mostra textarea
        if (extra) extra.style.display = 'block';
      });
    });

    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        if (!selectedValue) return;
        const commento = document.getElementById(id + '-commento')?.value || '';
        // Mostra ringraziamento
        container.innerHTML = `
          <div class="card-body text-center py-4">
            <div class="mb-2"><i class="fa-solid fa-circle-check text-success" style="font-size:1.8rem"></i></div>
            <p class="mb-0 small text-muted">Grazie! Il tuo feedback aiuta a migliorare il servizio.</p>
          </div>`;
        if (onSubmit) onSubmit({ punteggio: parseInt(selectedValue), commento });
      });
    }
  }
};