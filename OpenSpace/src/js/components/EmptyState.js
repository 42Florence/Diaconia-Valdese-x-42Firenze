// EmptyState.js - Componente per stati vuoti

const EmptyState = {
  render(icon, titolo, messaggio, azione = null) {
    let bottone = '';
    if (azione) {
      bottone = `
        <button class="btn btn-outline-primary btn-sm mt-3" onclick="${azione.onClick}">
          ${azione.icon ? `<i class="fa-solid ${azione.icon} me-1"></i>` : ''}${azione.testo}
        </button>`;
    }
    
    return `
      <div class="text-center py-5">
        <div style="font-size:2.5rem; opacity:0.6">
          <i class="fa-solid ${icon}"></i>
        </div>
        <h6 class="mt-3 mb-2">${titolo}</h6>
        <p class="text-muted small mb-0">${messaggio}</p>
        ${bottone}
      </div>`;
  }
};