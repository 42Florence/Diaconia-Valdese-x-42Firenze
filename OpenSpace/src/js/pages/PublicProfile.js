// PublicProfile.js

Views.publicProfile = function(id) {

  const persona = Object.values(DEMO_USERS)
    .find(u => u.id === parseInt(id));

  if (!persona) {
    return `
      <div class="container py-5 text-center">
        <h4>Utente non trovato</h4>
      </div>
    `;
  }

  // documenti collegati
  const documenti = DOCUMENTI.filter(d =>
    d.destinatario === persona.nome ||
    d.mittente === persona.nome
  );

  // appuntamenti collegati
  const appuntamenti = APPUNTAMENTI.filter(a =>
    a.assistitoId === persona.id ||
    a.operatoreId === persona.id
  );

  return `
    <div class="container py-4">

      <button class="btn btn-link text-decoration-none mb-3 ps-0"
        onclick="history.back()">

        <i class="fa-solid fa-arrow-left me-1"></i>
        Indietro
      </button>

      <!-- Header -->
      <div class="card mb-4 border-0 shadow-sm">

        <div class="card-body text-center position-relative"
          style="
            background: linear-gradient(
              135deg,
              var(--primary-light, #E8F0F7),
              var(--secondary-light, #F3EEF7)
            );
            min-height:140px;
          ">

          <div class="mt-4">

            <div class="avatar-large mb-3"
              style="
                border:4px solid white;
                box-shadow:0 2px 8px rgba(0,0,0,0.1);
              ">

              ${persona.avatar}
            </div>

            <h4 class="mb-0">
              ${persona.alias || persona.nome}
            </h4>

            <p class="text-muted small mb-1">
              ${persona.ruolo}
            </p>

            ${Badge.render(persona.ruolo)}

          </div>
        </div>
      </div>

      <!-- Statistiche -->
      <div class="row g-2 mb-4">

        <div class="col-6">
          <div class="card text-center p-3 bg-light">
            <h3 style="color:var(--primary)">
              ${documenti.length}
            </h3>
            <small class="text-muted">
              Documenti
            </small>
          </div>
        </div>

        <div class="col-6">
          <div class="card text-center p-3 bg-light">
            <h3 style="color:var(--success)">
              ${appuntamenti.length}
            </h3>
            <small class="text-muted">
              Appuntamenti
            </small>
          </div>
        </div>

      </div>

      <!-- Documenti recenti -->
      <div class="card mb-4">
        <div class="card-body">

          <h6 class="card-title">
            <i class="fa-solid fa-file-signature me-2"></i>
            Attività recente
          </h6>

          ${documenti.length > 0
            ? documenti.slice(0,3).map(doc => `
              <div class="py-2 border-bottom">

                <div class="fw-semibold">
                  ${doc.titolo}
                </div>

                <small class="text-muted">
                  Stato: ${doc.stato}
                </small>

              </div>
            `).join('')
            : `
              <p class="small text-muted mb-0">
                Nessuna attività disponibile
              </p>
            `
          }

        </div>
      </div>

      <!-- Appuntamenti -->
      <div class="card mb-4">
        <div class="card-body">

          <h6 class="card-title">
            <i class="fa-solid fa-calendar-days me-2"></i>
            Appuntamenti
          </h6>

          ${appuntamenti.length > 0
            ? appuntamenti.map(app => `
              <div class="py-2 border-bottom">

                <div class="fw-semibold">
                  ${app.descrizione}
                </div>

                <small class="text-muted">
                  ${app.data} · ${app.ora}
                </small>

              </div>
            `).join('')
            : `
              <p class="small text-muted mb-0">
                Nessun appuntamento
              </p>
            `
          }

        </div>
      </div>

      <!-- CTA -->
      <button class="btn btn-primary w-100">

        <i class="fa-solid fa-comment-dots me-2"></i>
        Contatta ${persona.alias || persona.nome}

      </button>

    </div>
  `;
};