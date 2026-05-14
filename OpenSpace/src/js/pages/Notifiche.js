Views.notifiche = function() {
  const user = Auth.getUser();
  const mieNotifiche = NOTIFICHE.filter(n => n.utenteId === user.id);
  
  let html = '<div class="container py-4"><h5><i class="fa-solid fa-bell me-2"></i>Notifiche</h5>';
  if (mieNotifiche.length === 0) {
    html += '<p class="text-muted">Nessuna notifica.</p>';
  } else {
    html += mieNotifiche.map(n => `
      <div class="card mb-2 ${n.letta ? 'bg-light' : 'border-primary'}">
        <div class="card-body">
          <p class="mb-0">${n.messaggio}</p>
          <small class="text-muted">${new Date(n.data).toLocaleString('it-IT')}</small>
        </div>
      </div>
    `).join('');
  }
  html += '</div>';
  return html;
};