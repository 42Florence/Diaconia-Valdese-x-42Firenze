// Blog.js - Articoli / novità dalla comunità

Views.blog = function(articoloId = null) {
  // Dettaglio articolo
  if (articoloId) {
    const art = ARTICOLI.find(a => a.id === parseInt(articoloId));
    if (!art) return '<div class="container py-5"><h5>Articolo non trovato</h5></div>';
    
    return `
      <div class="container py-4">
        <button class="btn btn-link text-decoration-none mb-3 ps-0" onclick="Router.navigate('blog')">
          <i class="fa-solid fa-arrow-left me-1"></i>Tutti gli articoli
        </button>
        <span class="badge bg-light text-dark border mb-2">${art.categoria}</span>
        <h1 class="h5 mb-2">${art.titolo}</h1>
        <small class="text-muted"><i class="fa-solid fa-calendar me-1"></i>${new Date(art.data).toLocaleDateString('it-IT', {day:'numeric', month:'long', year:'numeric'})}</small>
        <hr>
        <div class="blog-content">${art.contenuto}</div>
      </div>`;
  }
  
  // Lista articoli
  return `
    <div class="container py-4">
      <h1 class="h5 mb-4"><i class="fa-solid fa-newspaper me-2"></i>Novità dalla comunità</h1>
      ${ARTICOLI.map(a => `
        <div class="card mb-3" style="cursor:pointer" onclick="Router.navigate('blog', {id:${a.id}})">
          <div class="card-body">
            <span class="badge bg-light text-dark border mb-2">${a.categoria}</span>
            <h5 class="card-title h6">${a.titolo}</h5>
            <p class="card-text small text-muted">${a.anteprima}</p>
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted"><i class="fa-solid fa-calendar me-1"></i>${new Date(a.data).toLocaleDateString('it-IT', {day:'numeric', month:'long', year:'numeric'})}</small>
              <button class="btn btn-outline-primary btn-sm">Leggi <i class="fa-solid fa-arrow-right ms-1"></i></button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>`;
};