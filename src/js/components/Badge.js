// Badge.js - Componente badge riutilizzabile

const Badge = {
  // Mappa colori basata sul contenuto del badge
  colorMap: {
    'informale': 'badge-success',
    'strutturato': 'badge-primary',
    'tematico': 'badge-warning',
    'Aperto': 'badge-success',
    'Posti limitati': 'badge-warning',
    'peer': 'badge-info',
    'peer-support-formato': 'badge-primary',
    'esperto-supporto-pari': 'badge-primary',
    'ESP': 'badge-primary',
    'facilitatore': 'badge-secondary',
    'utente': 'bg-light text-dark border',
    'in-corso': 'badge-warning',
    'proposta': 'badge-info',
    'completato': 'badge-success',
    'Peer Supporter in formazione': 'badge-info',
    'ESP Certificato': 'badge-primary',
    'Peer Supporter formato': 'badge-primary',
    'Facilitatore familiari': 'badge-secondary'
  },

  render(testo) {
    const classe = this.colorMap[testo] || 'badge-secondary';
    const icon = this.getIcon(testo);
    return `<span class="badge ${classe}" style="font-size:0.75rem">${icon ? `<i class="fa-solid ${icon} me-1"></i>` : ''}${testo}</span>`;
  },

  getIcon(testo) {
    const icons = {
      'Aperto': 'fa-door-open',
      'Posti limitati': 'fa-lock-open',
      'peer': 'fa-user-group',
      'ESP': 'fa-certificate',
      'facilitatore': 'fa-user-tie',
      'in-corso': 'fa-spinner',
      'proposta': 'fa-lightbulb',
      'completato': 'fa-circle-check'
    };
    return icons[testo] || null;
  }
};