// DocumentCard.js

const DocumentCard = {
  /**
   * Renderizza una card documento ============================
   * @param {Object} doc - Oggetto documento dai dati mock ----
   * @returns {string}   - HTML della card --------------------
   */
  render(doc) {
    const isEasy = Accessibility.settings.easyMode;
    const isADHD = Accessibility.settings.profileADHD;
    
    const titolo = isEasy && doc.titoloSemplice ? doc.titoloSemplice : doc.titolo;
    const descrizione = isEasy && doc.descrizioneSemplice ? doc.descrizioneSemplice : doc.descrizione;
    
    const statoBadge = {
      'firmato': 'success',
      'in_attesa': 'warning',
      'rifiutato': 'danger'
    };
    const badgeColor = statoBadge[doc.stato] || 'secondary';
    
    return `
      <div class="card document-card mb-3 ${isADHD ? 'border-0 shadow-sm' : ''}" 
           data-id="${doc.id}" 
           tabindex="0" 
           role="button" 
           aria-label="${titolo} - ${doc.stato === 'firmato' ? 'Firmato' : 'In attesa'}"
           style="cursor:pointer">
        <div class="card-body">
          <h5 class="card-title ${isEasy ? 'fs-4' : ''}">${titolo}</h5>
          <p class="card-text text-muted ${isEasy ? 'fs-5' : ''}">${descrizione}</p>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">${doc.dataInvio ? new Date(doc.dataInvio).toLocaleDateString() : ''}</small>
            <span class="badge bg-${badgeColor}">${doc.stato === 'firmato' ? 'Firmato' : 'In attesa'}</span>
          </div>
        </div>
      </div>
    `;
  }
};