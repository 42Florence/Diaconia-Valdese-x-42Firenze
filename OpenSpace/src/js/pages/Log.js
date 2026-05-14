// Log.js - Registro accessi (per documento specifico o globale)

Views.log = function(docId) {
  const user = Auth.getUser();
  if (!user) return '';

  let logEntries = [];
  let titolo = 'Registro accessi';

  // Se è specificato un ID documento, mostra i log di quel documento
  if (docId) {
    const doc = DOCUMENTI.find(d => d.id === parseInt(docId));
    if (!doc) {
      return '<div class="container py-5 text-center"><h5>Documento non trovato</h5></div>';
    }
    logEntries = doc.logAccessi || [];
    titolo = `Log: ${doc.titolo}`;
  } 
  // Altrimenti mostra tutti i log globali (solo supervisore)
  else {
    if (user.ruolo !== 'supervisore') {
      return '<div class="container py-5 text-center"><h5>Accesso riservato al supervisore</h5></div>';
    }
    logEntries = LOG_GENERALE || [];
    titolo = 'Registro attività globale';
  }

  return `
    <div class="container py-4">
      <button class="btn btn-link text-decoration-none mb-3 ps-0" onclick="Router.navigate('home')">
        <i class="fa-solid fa-arrow-left me-1"></i>Indietro
      </button>

      <h1 class="h5 mb-4"><i class="fa-solid fa-clock-rotate-left me-2"></i>${titolo}</h1>

      ${logEntries.length > 0 ? `
        <div class="table-responsive">
          <table class="table table-sm table-hover">
            <thead class="table-light">
              <tr>
                <th>Data/Ora</th>
                <th>Utente</th>
                <th>Azione</th>
                <th>IP</th>
              </tr>
            </thead>
            <tbody>
              ${logEntries.map(entry => `
                <tr>
                  <td class="small">${new Date(entry.data).toLocaleString('it-IT')}</td>
                  <td class="small">${entry.utente}</td>
                  <td class="small">${entry.azione}</td>
                  <td class="small"><code>${entry.ip || '-'}</code></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : '<p class="text-muted">Nessuna voce di log registrata.</p>'}
    </div>`;
};