// Community.js
// Documenti da firmare, storico e consenso informato con wizard multi-step

Views.community = function () {
  const user = Auth.getUser();
  if (!user) return '';

  const documentiVisibili = DOCUMENTI.filter(doc =>
    doc.destinatario === user.nome ||
    doc.mittente === user.nome ||
    user.ruolo === 'supervisore'
  );

  return `
    <div class="container py-4">
      <h1 class="h5 mb-4">
        <i class="fa-solid fa-people-group me-2" aria-hidden="true"></i>
        Comunità
      </h1>

      <!-- ===== DOCUMENTI DA FIRMARE (solo assistito) ===== -->
      ${user.ruolo === 'assistito' ? `
        <div class="card mb-4">
          <div class="card-body">
            <h2 class="h6 card-title">
              <i class="fa-solid fa-file-signature me-2" aria-hidden="true"></i>
              Documenti da firmare
            </h2>

            ${documentiVisibili.filter(d => d.stato === 'in_attesa').length > 0
              ? documentiVisibili.filter(d => d.stato === 'in_attesa').map(doc => `
                  <!--
                    ACCESSIBILITÀ: <a> invece di <div onclick> → navigabile da tastiera,
                    semantica corretta per SR. href="#" + Router.navigate nell'handler.
                  -->
                  <a
                    href="#"
                    class="d-flex justify-content-between align-items-center py-2 border-bottom text-decoration-none"
                    onclick="event.preventDefault(); Router.navigate('dettaglioDocumento', {id:${doc.id}})"
                    aria-label="Apri documento: ${doc.titolo}, in attesa di firma"
                  >
                    <div>
                      <span class="small fw-semibold" style="color:var(--text-primary)">${doc.titolo}</span>
                      <p class="mb-0 small" style="color:var(--text-muted)">
                        Da: ${doc.mittente} · ${new Date(doc.dataInvio).toLocaleDateString('it-IT')}
                      </p>
                    </div>
                    <!--
                      BADGE: usa classe design system (.badge-warning) invece di
                      Bootstrap bg-warning text-dark → rispetta --warning-light e --warning,
                      funziona con il tema alto contrasto.
                    -->
                    <span class="badge badge-warning">In attesa</span>
                  </a>
                `).join('')
              : '<p class="small mb-0" style="color:var(--text-muted)">Nessun documento in attesa di firma.</p>'
            }
          </div>
        </div>
      ` : ''}

      <!-- ===== STORICO DOCUMENTI ===== -->
      <div class="card mb-4">
        <div class="card-body">
          <h2 class="h6 card-title">
            <i class="fa-solid fa-clock-rotate-left me-2" aria-hidden="true"></i>
            Storico documenti
          </h2>

          <div class="table-responsive">
            <!--
              ACCESSIBILITÀ: caption descrive la tabella agli SR.
              scope="col" sulle <th> → gli SR capiscono che sono header di colonna.
            -->
            <table class="table table-sm small mb-0" aria-label="Storico documenti">
              <caption class="visually-hidden">Elenco degli ultimi 10 documenti</caption>
              <thead class="table-light">
                <tr>
                  <th scope="col">Documento</th>
                  <th scope="col">Stato</th>
                  <th scope="col">Data</th>
                  <th scope="col">
                    <span class="visually-hidden">Azioni</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                ${documentiVisibili.slice(0, 10).map(doc => {
                  // BADGE: classi design system invece di Bootstrap raw
                  const badgeClass = doc.stato === 'firmato'
                    ? 'badge-success'
                    : doc.stato === 'in_attesa'
                      ? 'badge-warning'
                      : 'badge-danger';
                  const badgeLabel = doc.stato === 'firmato'
                    ? 'Firmato'
                    : doc.stato === 'in_attesa'
                      ? 'In attesa'
                      : 'Rifiutato';

                  return `
                    <tr>
                      <td>${doc.titolo}</td>
                      <td><span class="badge ${badgeClass}">${badgeLabel}</span></td>
                      <td>${new Date(doc.dataInvio).toLocaleDateString('it-IT')}</td>
                      <td>
                        <!--
                          ACCESSIBILITÀ: aria-label descrittivo sul bottone icona
                          → senza questo gli SR leggono solo l'icona (silenzio).
                        -->
                        <button
                          class="btn btn-outline-primary btn-sm"
                          onclick="Router.navigate('dettaglioDocumento', {id:${doc.id}})"
                          aria-label="Visualizza documento: ${doc.titolo}"
                        >
                          <i class="fa-solid fa-eye" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ===== CONSENSO INFORMATO ===== -->
      <div class="card mb-4" id="card-consenso">
        <div class="card-body">
          <h2 class="h6 card-title">
            <i class="fa-solid fa-circle-info me-2" aria-hidden="true"></i>
            Consenso informato
          </h2>
          <p class="small mb-3" style="color:var(--text-muted)">
            Prima di firmare un documento, è necessario attraversare un percorso guidato
            di consenso informato. Puoi scegliere la modalità di firma più adatta a te.
          </p>
          <button
            class="btn btn-primary btn-sm"
            onclick="ConsensoWizard.avvia()"
            aria-label="Avvia la procedura guidata di consenso informato"
          >
            <i class="fa-solid fa-play me-1" aria-hidden="true"></i>
            Avvia procedura
          </button>
        </div>
      </div>

      <!-- WIZARD CONSENSO — inizialmente nascosto -->
      <div id="wizard-consenso" style="display:none" aria-live="polite" aria-label="Procedura di consenso informato">
        <!-- Il contenuto viene iniettato da ConsensoWizard.render() -->
      </div>

    </div>
  `;
};


// =============================================================
// CONSENSO WIZARD
// Wizard a 5 step per il consenso informato con multiple
// modalità di firma: SPID, CIE, biometrica, vocale, OTP.
// =============================================================

const ConsensoWizard = (function () {

  // Stato interno del wizard
  let stato = {
    step: 0,
    modalitaFirma: null,   // 'spid' | 'cie' | 'biometrica' | 'vocale' | 'otp'
    comprensione: false,
    log: []
  };

  // Aggiunge una voce al log di tracciabilità
  function logEvent(azione) {
    stato.log.push({
      azione,
      timestamp: new Date().toISOString(),
      utente: Auth.getUser()?.nome || 'sconosciuto'
    });
  }

  // Steps del wizard
  const steps = [
    {
      id: 'spiegazione',
      titolo: 'Spiegazione del documento',
      icona: 'fa-file-lines',
      render: () => `
        <p class="small mb-3" style="color:var(--text-muted)">
          Ti verrà letto e spiegato il documento che stai per firmare.
          Puoi chiedere chiarimenti in qualsiasi momento.
        </p>
        <div class="alert alert-info small py-2" role="note">
          <i class="fa-solid fa-circle-info me-1" aria-hidden="true"></i>
          <strong>Documento:</strong> Consenso al trattamento dati – versione 2.1
        </div>
        <div class="p-3 rounded mb-3" style="background:var(--bg-light); border:1px solid var(--border-soft); font-size:0.85rem; line-height:1.7; color:var(--text-primary)">
          <p class="mb-2">Con la firma di questo documento acconsenti a:</p>
          <ul class="mb-0 ps-3">
            <li>La raccolta e il trattamento dei tuoi dati personali ai sensi del GDPR 2016/679</li>
            <li>La conservazione delle firme e dei log di accesso per 5 anni</li>
            <li>La comunicazione dei tuoi dati agli operatori di fiducia da te designati</li>
          </ul>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="check-letto"
            onchange="ConsensoWizard.setComprensione(this.checked)"
            ${stato.comprensione ? 'checked' : ''}
            aria-required="true"
          >
          <label class="form-check-label small fw-semibold" for="check-letto">
            Ho ascoltato o letto il documento e voglio procedere
          </label>
        </div>
      `,
      puoProcedere: () => stato.comprensione
    },

    {
      id: 'verifica',
      titolo: 'Verifica comprensione',
      icona: 'fa-circle-question',
      render: () => `
        <p class="small mb-3" style="color:var(--text-muted)">
          Per assicurarci che tu abbia compreso il documento, ti chiediamo di rispondere
          a una breve domanda.
        </p>
        <div class="mb-3">
          <label class="form-label small fw-semibold" for="domanda-comprensione">
            Per quanti anni verranno conservati i tuoi dati?
          </label>
          <select
            id="domanda-comprensione"
            class="form-select form-select-sm"
            onchange="ConsensoWizard.verificaRisposta(this.value)"
            aria-required="true"
          >
            <option value="">Scegli una risposta…</option>
            <option value="1">1 anno</option>
            <option value="5">5 anni</option>
            <option value="10">10 anni</option>
            <option value="indeterminato">A tempo indeterminato</option>
          </select>
        </div>
        <div id="feedback-risposta" aria-live="polite"></div>
      `,
      puoProcedere: () => stato.rispostaCorretta === true
    },

    {
      id: 'modalita',
      titolo: 'Scelta modalità di firma',
      icona: 'fa-pen-to-square',
      render: () => `
        <p class="small mb-3" style="color:var(--text-muted)">
          Scegli come vuoi firmare questo documento. Tutte le modalità hanno
          lo stesso valore legale nell'ambito di questa piattaforma.
        </p>

        <div class="row g-2" role="radiogroup" aria-label="Modalità di firma disponibili">

          ${[
            {
              id: 'spid',
              icona: 'fa-id-card',
              colore: 'var(--primary)',
              titolo: 'SPID',
              desc: 'Accesso con identità digitale SPID livello 2. Firma certificata.',
              tag: 'Raccomandata'
            },
            {
              id: 'cie',
              icona: 'fa-credit-card',
              colore: 'var(--success)',
              titolo: 'CIE – Carta d\'Identità',
              desc: 'Firma tramite NFC con la tua Carta d\'Identità Elettronica.',
              tag: null
            },
            {
              id: 'biometrica',
              icona: 'fa-fingerprint',
              colore: 'var(--secondary)',
              titolo: 'Firma biometrica',
              desc: 'Firma con il dito o uno stilo sullo schermo. Con testimone.',
              tag: null
            },
            {
              id: 'vocale',
              icona: 'fa-microphone',
              colore: 'var(--warning)',
              titolo: 'Firma vocale',
              desc: 'Dichiara il tuo consenso a voce. Registrazione con testimone.',
              tag: null
            },
            {
              id: 'otp',
              icona: 'fa-mobile-screen',
              colore: 'var(--info)',
              titolo: 'OTP via SMS',
              desc: 'Ricevi un codice sul telefono e inseriscilo per confermare.',
              tag: null
            }
          ].map(m => `
            <div class="col-12 col-md-6">
              <button
                class="btn w-100 text-start p-3 modalita-btn ${stato.modalitaFirma === m.id ? 'modalita-attiva' : ''}"
                onclick="ConsensoWizard.setModalita('${m.id}')"
                role="radio"
                aria-checked="${stato.modalitaFirma === m.id ? 'true' : 'false'}"
                aria-label="Firma con ${m.titolo}${m.tag ? ', ' + m.tag : ''}"
                style="
                  border: 2px solid ${stato.modalitaFirma === m.id ? 'var(--primary)' : 'var(--border-soft)'};
                  background: ${stato.modalitaFirma === m.id ? 'var(--primary-light)' : 'var(--bg-white)'};
                  border-radius: 10px;
                  transition: border-color 0.15s ease, background 0.15s ease;
                "
              >
                <div class="d-flex align-items-start gap-3">
                  <i class="fa-solid ${m.icona} mt-1" style="color:${m.colore}; font-size:1.3rem; width:22px" aria-hidden="true"></i>
                  <div>
                    <div class="d-flex align-items-center gap-2 mb-1">
                      <span class="fw-semibold small" style="color:var(--text-primary)">${m.titolo}</span>
                      ${m.tag ? `<span class="badge badge-primary" style="font-size:0.65rem">${m.tag}</span>` : ''}
                    </div>
                    <p class="mb-0 small" style="color:var(--text-muted); line-height:1.4">${m.desc}</p>
                  </div>
                </div>
              </button>
            </div>
          `).join('')}

        </div>
      `,
      puoProcedere: () => stato.modalitaFirma !== null
    },

    {
      id: 'firma',
      titolo: 'Firma',
      icona: 'fa-pen-nib',
      render: () => renderStepFirma(),
      puoProcedere: () => stato.firmaCompletata === true
    },

    {
      id: 'conferma',
      titolo: 'Riepilogo e conferma',
      icona: 'fa-circle-check',
      render: () => `
        <div class="text-center mb-4">
          <i class="fa-solid fa-circle-check fa-3x mb-3" style="color:var(--success)" aria-hidden="true"></i>
          <h3 class="h6 fw-bold" style="color:var(--text-primary)">Consenso registrato</h3>
          <p class="small" style="color:var(--text-muted)">
            La tua firma è stata acquisita e il consenso è stato registrato con successo.
          </p>
        </div>

        <div class="p-3 rounded mb-3" style="background:var(--success-light); border:1px solid var(--success); font-size:0.8rem;">
          <p class="mb-1 fw-semibold" style="color:var(--success)">
            <i class="fa-solid fa-shield-halved me-1" aria-hidden="true"></i>
            Log di tracciabilità
          </p>
          ${stato.log.map(e => `
            <div style="color:var(--text-muted)">
              <span class="fw-semibold">${new Date(e.timestamp).toLocaleTimeString('it-IT')}</span>
              — ${e.azione}
            </div>
          `).join('')}
        </div>

        <button
          class="btn btn-primary w-100"
          onclick="ConsensoWizard.chiudi()"
        >
          <i class="fa-solid fa-check me-1" aria-hidden="true"></i>
          Chiudi e torna alla comunità
        </button>
      `,
      puoProcedere: () => false // ultimo step, non ha "Avanti"
    }
  ];

  // Render dello step firma in base alla modalità scelta
  function renderStepFirma() {
    switch (stato.modalitaFirma) {
      case 'spid':
        return `
          <p class="small mb-3" style="color:var(--text-muted)">
            Verrai reindirizzato al portale SPID per autenticarti con il tuo identity provider.
            Dopo l'autenticazione, la firma verrà registrata automaticamente.
          </p>
          <div class="d-flex flex-column gap-2">
            ${[
              { nome: 'Poste Italiane', logo: 'fa-envelope' },
              { nome: 'Aruba', logo: 'fa-building' },
              { nome: 'TIM id', logo: 'fa-sim-card' },
              { nome: 'Namirial', logo: 'fa-shield-halved' }
            ].map(idp => `
              <button
                class="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
                onclick="ConsensoWizard.simulaAutenticazioneSPID('${idp.nome}')"
                aria-label="Accedi con SPID tramite ${idp.nome}"
              >
                <i class="fa-solid ${idp.logo}" aria-hidden="true"></i>
                Accedi con <strong>${idp.nome}</strong>
              </button>
            `).join('')}
          </div>
          <p class="small mt-3 mb-0" style="color:var(--text-muted)">
            Non hai SPID? <a href="#" onclick="ConsensoWizard.setModalita('otp'); ConsensoWizard.render()" class="text-decoration-none" style="color:var(--primary)">Usa un altro metodo</a>
          </p>
        `;

      case 'cie':
        return `
          <p class="small mb-3" style="color:var(--text-muted)">
            Avvicina la tua Carta d'Identità Elettronica al lettore NFC del dispositivo.
          </p>
          <div class="text-center py-4">
            <div class="mb-3" aria-hidden="true" style="font-size:3rem; color:var(--success)">
              <i class="fa-solid fa-credit-card"></i>
            </div>
            <p class="small fw-semibold mb-3" style="color:var(--text-primary)">In attesa del documento NFC…</p>
            <button
              class="btn btn-success btn-sm"
              onclick="ConsensoWizard.simulaFirma('CIE NFC')"
            >
              <i class="fa-solid fa-check me-1" aria-hidden="true"></i>
              Simula lettura CIE riuscita
            </button>
          </div>
        `;

      case 'biometrica':
        return `
          <p class="small mb-3" style="color:var(--text-muted)">
            Firma nello spazio qui sotto con il dito o uno stilo. Un operatore di fiducia
            è presente come testimone.
          </p>
          <div
            id="area-firma"
            style="
              width:100%; height:160px;
              border: 2px dashed var(--border-color);
              border-radius: 10px;
              background: var(--bg-light);
              display:flex; align-items:center; justify-content:center;
              cursor:crosshair;
              color:var(--text-muted);
              font-size:0.85rem;
              user-select:none;
            "
            role="img"
            aria-label="Area di firma biometrica"
            tabindex="0"
          >
            <span id="firma-hint">
              <i class="fa-solid fa-pen-nib me-1" aria-hidden="true"></i>
              Disegna qui la tua firma
            </span>
          </div>
          <button
            class="btn btn-success btn-sm mt-2"
            onclick="ConsensoWizard.simulaFirma('Firma biometrica')"
          >
            <i class="fa-solid fa-check me-1" aria-hidden="true"></i>
            Conferma firma
          </button>
        `;

      case 'vocale':
        return `
          <p class="small mb-3" style="color:var(--text-muted)">
            Premi il pulsante e dichiara ad alta voce:
            <em>"Io [nome], dichiaro di aver letto e compreso il documento e di prestare
            il mio consenso in modo libero e consapevole."</em>
          </p>
          <div class="text-center py-3">
            <button
              id="btn-registra"
              class="btn btn-danger btn-lg rounded-circle mb-3"
              onclick="ConsensoWizard.toggleRegistrazione()"
              aria-label="Avvia registrazione vocale"
              aria-pressed="false"
              style="width:72px; height:72px; font-size:1.5rem"
            >
              <i class="fa-solid fa-microphone" aria-hidden="true"></i>
            </button>
            <p id="stato-registrazione" class="small fw-semibold" style="color:var(--text-muted)" aria-live="polite">
              Premi per registrare
            </p>
          </div>
          <button
            class="btn btn-success btn-sm"
            onclick="ConsensoWizard.simulaFirma('Firma vocale con testimone')"
          >
            <i class="fa-solid fa-check me-1" aria-hidden="true"></i>
            Conferma dichiarazione
          </button>
        `;

      case 'otp':
        return `
          <p class="small mb-3" style="color:var(--text-muted)">
            Abbiamo inviato un codice a 6 cifre al numero associato al tuo account.
            Inseriscilo qui sotto per confermare il consenso.
          </p>
          <div class="mb-3">
            <label class="form-label small fw-semibold" for="input-otp">
              Codice OTP
            </label>
            <input
              type="text"
              id="input-otp"
              class="form-control"
              placeholder="es. 482913"
              maxlength="6"
              inputmode="numeric"
              pattern="[0-9]{6}"
              autocomplete="one-time-code"
              aria-required="true"
              aria-describedby="otp-hint"
            >
            <div id="otp-hint" class="form-text small" style="color:var(--text-muted)">
              Il codice è valido per 10 minuti.
            </div>
          </div>
          <button
            class="btn btn-primary btn-sm"
            onclick="ConsensoWizard.verificaOTP()"
          >
            <i class="fa-solid fa-check me-1" aria-hidden="true"></i>
            Verifica codice
          </button>
          <button
            class="btn btn-link btn-sm ms-2"
            onclick="alert('Nuovo codice inviato.')"
            style="color:var(--primary); text-decoration:none"
          >
            Invia di nuovo
          </button>
        `;

      default:
        return '<p class="small text-muted">Modalità non riconosciuta.</p>';
    }
  }

  // Render completo del wizard
  function render() {
    const container = document.getElementById('wizard-consenso');
    if (!container) return;

    const step = steps[stato.step];
    const isUltimoStep = stato.step === steps.length - 1;
    const isFirstStep = stato.step === 0;

    // Barra di progresso (visiva + SR)
    const progressePct = Math.round(((stato.step + 1) / steps.length) * 100);

    container.innerHTML = `
      <div class="card mb-4">
        <div class="card-body">

          <!-- Intestazione step -->
          <div class="d-flex align-items-center gap-2 mb-3">
            <div style="
              width:36px; height:36px; border-radius:50%;
              background:var(--primary-light);
              display:flex; align-items:center; justify-content:center;
              flex-shrink:0;
            " aria-hidden="true">
              <i class="fa-solid ${step.icona}" style="color:var(--primary); font-size:0.9rem"></i>
            </div>
            <div>
              <p class="mb-0 small fw-semibold" style="color:var(--text-muted)">
                Step ${stato.step + 1} di ${steps.length}
              </p>
              <h2 class="h6 mb-0" style="color:var(--text-primary)">${step.titolo}</h2>
            </div>
          </div>

          <!-- Barra progresso -->
          <div
            class="progress mb-4"
            style="height:6px"
            role="progressbar"
            aria-valuenow="${progressePct}"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Avanzamento procedura: step ${stato.step + 1} di ${steps.length}"
          >
            <div
              class="progress-bar"
              style="width:${progressePct}%; background:var(--primary); transition:width 0.3s ease"
            ></div>
          </div>

          <!-- Contenuto step -->
          <div id="step-content">
            ${step.render()}
          </div>

          <!-- Navigazione -->
          ${!isUltimoStep ? `
            <div class="d-flex justify-content-between align-items-center mt-4 pt-3" style="border-top:1px solid var(--border-soft)">
              <button
                class="btn btn-outline-secondary btn-sm"
                onclick="ConsensoWizard.stepPrecedente()"
                ${isFirstStep ? 'disabled' : ''}
                aria-label="Torna allo step precedente"
              >
                <i class="fa-solid fa-arrow-left me-1" aria-hidden="true"></i>
                Indietro
              </button>
              <button
                id="btn-avanti"
                class="btn btn-primary btn-sm"
                onclick="ConsensoWizard.stepSuccessivo()"
                ${step.puoProcedere() ? '' : 'disabled'}
                aria-label="Procedi allo step successivo"
              >
                Avanti
                <i class="fa-solid fa-arrow-right ms-1" aria-hidden="true"></i>
              </button>
            </div>
          ` : ''}

        </div>
      </div>
    `;

    // Scroll verso il wizard
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // API pubblica
  return {

    avvia() {
      stato = { step: 0, modalitaFirma: null, comprensione: false, log: [], firmaCompletata: false };
      logEvent('Procedura di consenso avviata');

      const cardConsenso = document.getElementById('card-consenso');
      const wizardEl = document.getElementById('wizard-consenso');
      if (cardConsenso) cardConsenso.style.display = 'none';
      if (wizardEl) wizardEl.style.display = 'block';

      render();
    },

    chiudi() {
      const cardConsenso = document.getElementById('card-consenso');
      const wizardEl = document.getElementById('wizard-consenso');
      if (cardConsenso) cardConsenso.style.display = '';
      if (wizardEl) wizardEl.style.display = 'none';
      stato = { step: 0, modalitaFirma: null, comprensione: false, log: [] };
    },

    stepSuccessivo() {
      const step = steps[stato.step];
      if (!step.puoProcedere()) return;
      logEvent(`Step completato: ${step.titolo}`);
      stato.step = Math.min(stato.step + 1, steps.length - 1);
      render();
    },

    stepPrecedente() {
      stato.step = Math.max(stato.step - 1, 0);
      render();
    },

    setComprensione(val) {
      stato.comprensione = val;
      // Sblocca/blocca il bottone Avanti in tempo reale
      const btn = document.getElementById('btn-avanti');
      if (btn) btn.disabled = !val;
    },

    verificaRisposta(val) {
      const feedback = document.getElementById('feedback-risposta');
      if (!feedback) return;
      if (val === '5') {
        stato.rispostaCorretta = true;
        feedback.innerHTML = `<p class="small mt-2 mb-0" style="color:var(--success)"><i class="fa-solid fa-circle-check me-1"></i>Corretto. Puoi procedere.</p>`;
        const btn = document.getElementById('btn-avanti');
        if (btn) btn.disabled = false;
      } else if (val) {
        stato.rispostaCorretta = false;
        feedback.innerHTML = `<p class="small mt-2 mb-0" style="color:var(--danger)"><i class="fa-solid fa-circle-xmark me-1"></i>Risposta non corretta. Rileggi il documento e riprova.</p>`;
        const btn = document.getElementById('btn-avanti');
        if (btn) btn.disabled = true;
      }
    },

    setModalita(id) {
      stato.modalitaFirma = id;
      logEvent(`Modalità di firma scelta: ${id.toUpperCase()}`);
      render();
    },

    simulaAutenticazioneSPID(idp) {
      logEvent(`Autenticazione SPID avviata con: ${idp}`);
      alert(`Demo: reindirizzamento a ${idp} per autenticazione SPID.\nIn produzione si aprirebbe il portale dell'identity provider.`);
      this.simulaFirma(`SPID – ${idp}`);
    },

    simulaFirma(metodo) {
      stato.firmaCompletata = true;
      logEvent(`Firma acquisita con metodo: ${metodo}`);
      const btn = document.getElementById('btn-avanti');
      if (btn) btn.disabled = false;
      // Feedback visivo immediato
      const content = document.getElementById('step-content');
      if (content) {
        const feedback = document.createElement('div');
        feedback.className = 'alert py-2 small mt-3 mb-0';
        feedback.style.cssText = `background:var(--success-light); border:1px solid var(--success); color:var(--success)`;
        feedback.setAttribute('role', 'status');
        feedback.setAttribute('aria-live', 'polite');
        feedback.innerHTML = `<i class="fa-solid fa-circle-check me-1" aria-hidden="true"></i><strong>Firma acquisita</strong> con <em>${metodo}</em>.`;
        content.appendChild(feedback);
      }
    },

    toggleRegistrazione() {
      const btn = document.getElementById('btn-registra');
      const stato_el = document.getElementById('stato-registrazione');
      const isRecording = btn?.getAttribute('aria-pressed') === 'true';

      if (!isRecording) {
        btn?.setAttribute('aria-pressed', 'true');
        btn?.setAttribute('aria-label', 'Interrompi registrazione');
        if (stato_el) stato_el.textContent = 'Registrazione in corso…';
      } else {
        btn?.setAttribute('aria-pressed', 'false');
        btn?.setAttribute('aria-label', 'Avvia registrazione vocale');
        if (stato_el) stato_el.textContent = 'Registrazione completata.';
      }
    },

    verificaOTP() {
      const input = document.getElementById('input-otp');
      if (!input) return;
      // Demo: qualsiasi 6 cifre è accettato
      if (/^\d{6}$/.test(input.value)) {
        this.simulaFirma('OTP via SMS');
      } else {
        alert('Inserisci un codice a 6 cifre valido.');
        input.focus();
      }
    },

    render
  };

})();