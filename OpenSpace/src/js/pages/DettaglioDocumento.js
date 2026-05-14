// DettaglioDocumento.js

Views.dettaglioDocumento = function(id) {
  const doc = DOCUMENTI.find(d => d.id == id);
  if (!doc) return '<div class="container py-4"><div class="alert alert-danger">Documento non trovato.</div></div>';

  const user = Auth.getUser();
  const isAssistito = user && user.ruolo === 'assistito';
  const puoFirmare = isAssistito && doc.stato === 'in_attesa';

  let firmaHTML = '';
  if (puoFirmare) {
    firmaHTML = FirmaWidget.render(doc);
  } else if (doc.stato === 'firmato') {
    firmaHTML = `<div class="alert alert-success"><i class="fa-solid fa-circle-check me-2"></i>Documento già firmato il ${new Date(doc.dataFirma).toLocaleDateString()} con modalità <strong>${doc.modalitaFirma || 'non specificata'}</strong>.</div>`;
  }

  return `
    <div class="container py-4">
      <button class="btn btn-link text-decoration-none mb-3 ps-0" onclick="Router.navigate('documenti')">
        <i class="fa-solid fa-arrow-left me-1"></i>Torna ai documenti
      </button>

      <h1 class="h4 mb-3">${Accessibility.settings.easyMode && doc.titoloSemplice ? doc.titoloSemplice : doc.titolo}</h1>
      <p class="mb-4">${Accessibility.settings.easyMode && doc.descrizioneSemplice ? doc.descrizioneSemplice : doc.descrizione}</p>

      <div class="card mb-4">
        <div class="card-body">
          <h6 class="card-title">Dettagli</h6>
          <ul class="list-unstyled small">
            <li><strong>Mittente:</strong> ${doc.mittente}</li>
            <li><strong>Destinatario:</strong> ${doc.destinatario}</li>
            <li><strong>Data invio:</strong> ${new Date(doc.dataInvio).toLocaleString()}</li>
            ${doc.dataFirma ? `<li><strong>Data firma:</strong> ${new Date(doc.dataFirma).toLocaleString()}</li>` : ''}
          </ul>
        </div>
      </div>

      ${firmaHTML}
    </div>
  `;
};

// Inizializzazione dopo il rendering (chiamata dal router per questa vista)
Views.initDettaglioDocumento = function(id) {
  const doc = DOCUMENTI.find(d => d.id == id);
  if (!doc) return;

  const user = Auth.getUser();
  if (user && user.ruolo === 'assistito' && doc.stato === 'in_attesa') {
    FirmaWidget.init(doc, (modalita) => {
      // Aggiorna lo stato del documento (demo)
      doc.stato = 'firmato';
      doc.dataFirma = new Date().toISOString();
      doc.modalitaFirma = modalita;
      // Aggiungi log
      doc.logAccessi.push({
        utente: user.nome,
        azione: 'firma',
        data: new Date().toISOString(),
        ip: '192.168.1.1' // simulato
      });
      alert(`Documento firmato con modalità: ${modalita}! ✅`);
      Router.navigate('documenti'); // Torna alla lista
    });
  }
};