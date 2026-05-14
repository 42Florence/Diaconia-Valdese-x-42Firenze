// DashboardOperatore.js - Gestione gruppi per profilo professionista

Views.dashboardOperatore = function() {
  const user = Auth.getUser();
  if (!user || user.ruolo !== 'operatore') {
    return '<div class="container py-5 text-center"><h5>Accesso riservato ai professionisti ESP</h5></div>';
  }
  
  return `
    <div class="container py-4">
      <h1 class="h5 mb-4"><i class="fa-solid fa-gauge me-2"></i>Dashboard Operatore</h1>
      
      <!-- Statistiche rapide -->
      <div class="row g-2 mb-4">
        <div class="col-6">
          <div class="card text-center p-3" style="background:var(--primary-light)">
            <small class="text-muted">Assistiti gestiti</small>
          </div>
        </div>
        <div class="col-6">
          <div class="card text-center p-3" style="background:var(--secondary-light)">
            <small class="text-muted">Assistiti totali</small>
          </div>
        </div>
      </div>
    </div>`;
};