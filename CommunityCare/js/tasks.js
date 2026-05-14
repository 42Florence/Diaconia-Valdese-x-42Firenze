const tabs=['tasks','agenda','premi','notifiche','anonymous','profilo'];

function switchTab(name){
  tabs.forEach(t=>{
    const p=document.getElementById('panel-'+t);
    const n=document.getElementById('nav-'+t);
    if(p) p.className='panel'+(t===name?' active':'');
    if(n){
      n.className='nav-item'+(t===name?' active':'');
      n.setAttribute('aria-selected', t===name ? 'true' : 'false');
      n.setAttribute('tabindex', t===name ? '0' : '-1');
    }
  });
  if(name==='agenda') renderAgenda();
  document.getElementById('nav-'+name)?.focus();
}

function handleTabKeydown(event, tabName){
  if(event.key==='ArrowLeft' || event.key==='ArrowRight'){
    event.preventDefault();
    const currentIndex=tabs.indexOf(tabName);
    const nextIndex=event.key==='ArrowRight'?(currentIndex+1)%tabs.length:(currentIndex-1+tabs.length)%tabs.length;
    switchTab(tabs[nextIndex]);
  }
}

// Task management
const todayTaskList = document.getElementById('today-task-list');
const todayTaskCount = document.getElementById('today-task-count');

function updateTodayTaskCount(){
  const rows = todayTaskList.querySelectorAll('[data-task-row]');
  const completed = todayTaskList.querySelectorAll('[data-task-row].done').length;
  todayTaskCount.textContent = `${completed}/${rows.length} fatte`;
}

function initTodayTasks(){
  todayTaskList.querySelectorAll('[data-task-row]').forEach(row => {
    const updateAriaLabel = () => {
      const taskText = row.querySelector('.task-text')?.textContent || 'Task';
      const status = row.classList.contains('done') ? 'Completato' : 'Non completato';
      row.setAttribute('aria-label', `${taskText} - ${status}`);
    };

    const toggleTask = () => {
      row.classList.toggle('done');
      row.dataset.completed = row.classList.contains('done') ? 'true' : 'false';

      const xpTag = row.querySelector('.xp-tag');
      if(xpTag){
        xpTag.classList.toggle('earned', row.classList.contains('done'));
      }

      updateAriaLabel();
      updateTodayTaskCount();
    };

    row.addEventListener('click', toggleTask);
    row.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTask();
      }
    });

    updateAriaLabel();
  });
}

updateTodayTaskCount();
initTodayTasks();

// Tasks view toggle (Da fare / Extra)
document.querySelectorAll('.tasks-view-toggle .vt-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const section = btn.dataset.section;
    document.querySelectorAll('.tasks-view-toggle .vt-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    
    const tasksList = document.getElementById('today-task-list');
    const extraList = document.getElementById('extra-task-list');
    const sectionHead = document.querySelector('#panel-tasks .section-head');
    const sectionTitle = sectionHead.querySelector('.section-title');
    const sectionCount = sectionHead.querySelector('.section-count');
    
    if(section==='tasks-list'){
      tasksList.style.display='';
      extraList.style.display='none';
      sectionTitle.innerHTML='<i class="ti ti-clipboard-check"></i>Cose da fare oggi';
      sectionCount.id='today-task-count';
      sectionCount.textContent='2/5 fatte';
    } else {
      tasksList.style.display='none';
      extraList.style.display='';
      sectionTitle.innerHTML='<i class="ti ti-sparkles" style="color:var(--gold)"></i>Attività extra';
      sectionCount.id='extra-task-count';
      sectionCount.textContent='1/4 completati';
    }
  });
});

// Extra activities interactivity
function initExtraTasks(){
  const extraList = document.getElementById('extra-task-list');
  if(extraList){
    extraList.querySelectorAll('[data-task-row]').forEach(row=>{
      const updateAriaLabel = () => {
        const taskText = row.querySelector('.task-text')?.textContent || 'Task';
        const status = row.classList.contains('done') ? 'Completato' : 'Non completato';
        row.setAttribute('aria-label', `${taskText} - ${status}`);
      };

      const toggleTask = () => {
        row.classList.toggle('done');
        row.dataset.completed = row.classList.contains('done') ? 'true' : 'false';

        const xpTag = row.querySelector('.xp-tag');
        if(xpTag){
          xpTag.classList.toggle('earned', row.classList.contains('done'));
        }

        updateAriaLabel();

        const completed = extraList.querySelectorAll('[data-task-row].done').length;
        const total = extraList.querySelectorAll('[data-task-row]').length;
        const sectionCount = document.querySelector('#extra-task-count');
        if(sectionCount) sectionCount.textContent=`${completed}/${total} completati`;
      };

      row.addEventListener('click', toggleTask);
      row.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTask();
        }
      });

      updateAriaLabel();
    });
  }
}

initExtraTasks();

// Mood selector interactivity
document.querySelectorAll('.mood-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
