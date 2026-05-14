Views.videochiamata = function() {
  const user = Auth.getUser();
  const nome = user ? (user.alias || user.nome.split(' ')[0]) : 'Utente';
  return `
    <div class="container py-5">
      <div class="text-center">
        <i class="fa-solid fa-shield-halved fa-3x text-primary mb-3"></i>
        <h2 class="h4 fw-bold">Videochiamata confidenziale</h2>
        <p class="text-muted">Connessione crittografata punto-punto in corso...</p>
        <div class="spinner-border text-primary my-4" role="status">
          <span class="visually-hidden">In attesa di connessione...</span>
        </div>
        <p class="small">La sessione è protetta da cifratura end-to-end e non viene registrata.</p>
        <button class="btn btn-outline-secondary" onclick="alert('Simulazione: chiamata terminata.'); Router.navigate('home')">
          <i class="fa-solid fa-xmark me-1"></i> Termina
        </button>
      </div>
    </div>
  `;
};