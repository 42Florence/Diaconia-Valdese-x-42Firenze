// Anonymous messaging functionality
let anonMessages = [
  {time:'Oggi, 11:30', text:'Mi sento un po\' stanco ultimamente, potremmo ridurre gli esercizi?', status:'Consegnato'}
];

function sendAnonMessage(){
  const textarea = document.getElementById('anon-message');
  const message = textarea.value.trim();
  
  if(!message){
    alert('Per favore scrivi un messaggio');
    return;
  }
  
  const now = new Date();
  const hours = String(now.getHours()).padStart(2,'0');
  const mins = String(now.getMinutes()).padStart(2,'0');
  const timeStr = `Oggi, ${hours}:${mins}`;
  
  anonMessages.push({time:timeStr, text:message, status:'Consegnato'});
  textarea.value = '';
  
  const list = document.getElementById('anon-sent-list');
  list.innerHTML = anonMessages.map(msg => `
    <article class="anon-msg-item" role="listitem" aria-label="Messaggio anonimo inviato ${msg.time}. Testo: ${msg.text}. Stato: ${msg.status}">
      <time class="anon-msg-time">${msg.time}</time>
      <p class="anon-msg-text">${msg.text}</p>
      <span class="anon-msg-status" aria-label="Stato messaggio">✓ ${msg.status}</span>
    </article>
  `).join('');
}
