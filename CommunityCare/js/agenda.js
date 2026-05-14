// Agenda data and functionality
let agendaView = 'week';

const reminders = [
  {date:'2026-05-09',time:'08:45',title:'Controllo pressione',location:'Infermeria',description:'Misurazione della pressione arteriosa con registrazione dei dati.',icon:'🩺',color:'#6C63FF'},
  {date:'2026-05-09',time:'10:00',title:'Appuntamento medico',location:'Studio medico Dott. Rossi',description:'Visita medica generale di controllo. Portare tessera sanitaria.',icon:'📋',color:'#6C63FF'},
  {date:'2026-05-09',time:'15:30',title:'Laboratorio musicale',location:'Sala musica',description:'Sessione di ascolto e pratica musicale con gli educatori.',icon:'🎵',color:'#4ECDC4'},
  {date:'2026-05-10',time:'09:30',title:'Attivita motoria',location:'Palestra',description:'Esercizi fisici guidati per il benessere e il movimento.',icon:'🏃',color:'#27C17B'},
  {date:'2026-05-10',time:'14:30',title:'Visita cardiologica',location:'Ospedale San Luigi',description:'Visita dal cardiologo con esami strumentali previsti.',icon:'💓',color:'#FF6B6B'},
  {date:'2026-05-11',time:'09:00',title:'Lezione di inglese',location:'Aula studio',description:'Lezione di lingua inglese con insegnante certificato.',icon:'📚',color:'#4ECDC4'},
  {date:'2026-05-11',time:'17:00',title:'Chiamata con famiglia',location:'Salotto',description:'Videochiamata con i familiari per gli aggiornamenti settimanali.',icon:'📞',color:'#8B5CF6'},
  {date:'2026-05-12',time:'10:30',title:'Colloquio educatore',location:'Ufficio educatori',description:'Incontro individuale per discutere i progressi e gli obiettivi.',icon:'🗣️',color:'#FFB800'},
  {date:'2026-05-12',time:'16:00',title:'Psicoterapia',location:'Studio psicologo',description:'Sessione di psicoterapia individuale con la psicologa della struttura.',icon:'🧠',color:'#8B5CF6'},
  {date:'2026-05-13',time:'11:00',title:'Laboratorio creativo',location:'Sala laboratori',description:'Attività artistica: disegno, pittura e manipolazione creativa.',icon:'🎨',color:'#FFB800'},
  {date:'2026-05-13',time:'18:15',title:'Incontro gruppo',location:'Sala riunioni',description:'Riunione di gruppo con tutti gli ospiti e gli educatori della struttura.',icon:'👥',color:'#6C63FF'},
  {date:'2026-05-14',time:'09:15',title:'Allenamento memoria',location:'Sala multimediale',description:'Esercizi cognitivi e giochi per lo sviluppo della memoria.',icon:'🧩',color:'#4ECDC4'},
  {date:'2026-05-14',time:'15:00',title:'Merenda condivisa',location:'Sala comune',description:'Pausa merenda conviviale con gli altri ospiti e staff.',icon:'☕',color:'#FF6B6B'},
  {date:'2026-05-15',time:'13:00',title:'Sessione fisioterapia',location:'Sala riabilitazione',description:'Seduta di fisioterapia personalizzata con il fisioterapista.',icon:'💪',color:'#27C17B'},
  {date:'2026-05-15',time:'19:00',title:'Serata cinema',location:'Sala cinema',description:'Proiezione di film a scelta con popcorn e bevande per tutti.',icon:'🎬',color:'#8B5CF6'}
];

function renderAgenda(){
  const weekView = document.getElementById('week-view');
  const monthView = document.getElementById('month-view');
  
  if(agendaView==='week') renderWeekView(weekView);
  else renderMonthView(monthView);
}

function renderWeekView(container){
  container.innerHTML='';
  const today = new Date(2026,4,9);
  const weekDays=['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica'];
  const monthNames=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
  
  const calendarGrid = document.createElement('div');
  calendarGrid.className='agenda-week';
  
  for(let i=0;i<7;i++){
    const d = new Date(today);
    d.setDate(d.getDate()+i);
    const dateStr = d.toISOString().split('T')[0];
    const dayReminders = reminders
      .filter(r=>r.date===dateStr)
      .sort((a,b)=>a.time.localeCompare(b.time));
    
    const dayCard = document.createElement('div');
    dayCard.className='agenda-day';
    const isToday = i===0;
    if(isToday) dayCard.classList.add('today');
    
    const dayHeader = document.createElement('div');
    dayHeader.className='day-header';
    dayHeader.innerHTML=`
      <div class="day-head-top">
        <div class="day-name">${weekDays[i]} ${d.getDate()} ${monthNames[d.getMonth()]}</div>
      </div>
    `;
    
    const remindersContainer = document.createElement('div');
    remindersContainer.className='reminders-container';
    
    if(dayReminders.length>0){
      dayReminders.forEach(r=>{
        const reminderEl = document.createElement('div');
        reminderEl.className='reminder-item';
        reminderEl.style.borderLeft=`3px solid ${r.color}`;
        reminderEl.setAttribute('data-reminder', JSON.stringify(r));
        reminderEl.setAttribute('role', 'button');
        reminderEl.setAttribute('tabindex', '0');
        reminderEl.setAttribute('aria-label', `${r.title} alle ${r.time}`);
        reminderEl.innerHTML=`<span class="reminder-icon">${r.icon}</span><div class="reminder-info"><div class="reminder-time">${r.time}</div><div class="reminder-title">${r.title}</div></div>`;
        reminderEl.addEventListener('click', (e) => openAppointmentDropdown(e, r));
        reminderEl.addEventListener('keydown', (e) => {
          if(e.key==='Enter' || e.key===' ') {
            e.preventDefault();
            openAppointmentDropdown(e, r);
          }
        });
        remindersContainer.appendChild(reminderEl);
      });
    } else {
      remindersContainer.innerHTML='<div class="no-reminders">Libero</div>';
    }
    
    dayCard.appendChild(dayHeader);
    dayCard.appendChild(remindersContainer);
    calendarGrid.appendChild(dayCard);
  }
  
  container.appendChild(calendarGrid);
}

function renderMonthView(container){
  container.innerHTML='';
  const year = 2026;
  const month = 4;
  const monthNames=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
  const weekDays=[
    {short:'Lun', long:'Lunedì'},
    {short:'Mar', long:'Martedì'},
    {short:'Mer', long:'Mercoledì'},
    {short:'Gio', long:'Giovedì'},
    {short:'Ven', long:'Venerdì'},
    {short:'Sab', long:'Sabato'},
    {short:'Dom', long:'Domenica'}
  ];
  
  const monthGrid = document.createElement('div');
  monthGrid.className='agenda-month';
  
  const monthHeader = document.createElement('div');
  monthHeader.className='month-header';
  monthHeader.innerHTML=`<h3>${monthNames[month]} ${year}</h3>`;
  monthGrid.appendChild(monthHeader);
  
  const weekdayRow = document.createElement('div');
  weekdayRow.className='month-weekdays';
  weekDays.forEach(d=>{
    const cell = document.createElement('div');
    cell.className='month-weekday';
    cell.textContent=d.short; // visual abbreviation
    cell.setAttribute('aria-label', d.long); // full name for screen readers
    cell.setAttribute('role', 'columnheader');
    weekdayRow.appendChild(cell);
  });
  monthGrid.appendChild(weekdayRow);
  
  const firstDay = new Date(year,month,1);
  const lastDay = new Date(year,month+1,0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate()-firstDay.getDay()+1);
  
  const daysGrid = document.createElement('div');
  daysGrid.className='month-days';
  
  let currentDate = new Date(startDate);
  for(let i=0;i<42;i++){
    const dayCell = document.createElement('div');
    dayCell.className='month-day';
    
    if(currentDate.getMonth()!==month) dayCell.classList.add('other-month');
    if(currentDate.toISOString().split('T')[0]==='2026-05-09') dayCell.classList.add('today');
    
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayReminders = reminders.filter(r=>r.date===dateStr);
    
    const dayNum = document.createElement('div');
    dayNum.className='month-day-num';
    dayNum.textContent=currentDate.getDate();
    dayCell.appendChild(dayNum);
    
    if(dayReminders.length>0){
      const dotContainer = document.createElement('div');
      dotContainer.className='month-day-dots';
      dayReminders.forEach(r=>{
        const dot = document.createElement('div');
        dot.className='reminder-dot';
        dot.style.backgroundColor=r.color;
        dotContainer.appendChild(dot);
      });
      dayCell.appendChild(dotContainer);
    }
    
    daysGrid.appendChild(dayCell);
    currentDate.setDate(currentDate.getDate()+1);
  }
  
  monthGrid.appendChild(daysGrid);
  container.appendChild(monthGrid);
}

// Agenda view toggle
document.querySelectorAll('.view-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.view-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    agendaView = btn.dataset.view;
    
    const weekView = document.getElementById('week-view');
    const monthView = document.getElementById('month-view');
    weekView.classList.toggle('active',agendaView==='week');
    monthView.classList.toggle('active',agendaView==='month');
    
    renderAgenda();
  });
});

// Add reminder button
document.querySelector('.add-reminder-btn').addEventListener('click',()=>{
  const title = prompt('Titolo promemoria:');
  if(!title) return;
  const date = prompt('Data (YYYY-MM-DD):');
  if(!date) return;
  const time = prompt('Orario (HH:MM):');
  if(!time) return;
  
  reminders.push({date,time,title,icon:'📌',color:'#6C63FF'});
  reminders.sort((a,b)=>new Date(a.date)- new Date(b.date));
  renderAgenda();
});
