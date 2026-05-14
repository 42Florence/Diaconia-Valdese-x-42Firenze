// Appointment dropdown functions
let currentDropdown = null;

function openAppointmentDropdown(event, appointment) {
  const reminderEl = event.currentTarget;
  
  // Check if this reminder already has a dropdown
  let dropdown = reminderEl.nextElementSibling;
  
  if(dropdown && dropdown.classList.contains('appointment-dropdown')) {
    // Dropdown exists, toggle it
    if(dropdown.classList.contains('open')) {
      dropdown.classList.remove('open');
      setTimeout(() => dropdown.remove(), 200);
      currentDropdown = null;
    } else {
      dropdown.classList.add('open');
      currentDropdown = reminderEl;
    }
    return;
  }
  
  // Close any other open dropdown first
  if(currentDropdown && currentDropdown !== reminderEl) {
    closeAppointmentDropdown();
  }
  
  // Create dropdown element
  dropdown = document.createElement('div');
  dropdown.className = 'appointment-dropdown open';
  dropdown.setAttribute('role', 'region');
  dropdown.setAttribute('aria-label', `Dettagli: ${appointment.title}`);
  
  dropdown.innerHTML = `
    <div class="appointment-dropdown-content">
      <div class="appointment-dropdown-body">
        <div class="appointment-detail">
          <h3 class="appointment-detail-label">Luogo</h3>
          <div class="appointment-detail-value" tabindex="0" role="region" aria-label="Luogo: ${appointment.location}">
            ${appointment.location}
          </div>
        </div>
        <div class="appointment-detail">
          <h3 class="appointment-detail-label">Descrizione</h3>
          <div class="appointment-detail-value" tabindex="0" role="region" aria-label="Descrizione: ${appointment.description}">
            ${appointment.description}
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Insert dropdown after reminder element
  reminderEl.insertAdjacentElement('afterend', dropdown);
  currentDropdown = reminderEl;
}

function closeAppointmentDropdown() {
  if(currentDropdown) {
    const dropdown = currentDropdown.nextElementSibling;
    if(dropdown && dropdown.classList.contains('appointment-dropdown')) {
      dropdown.classList.remove('open');
      setTimeout(() => dropdown.remove(), 200);
    }
    currentDropdown = null;
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if(!e.target.closest('.reminder-item') && !e.target.closest('.appointment-dropdown')) {
    closeAppointmentDropdown();
  }
});

// Close dropdown on Escape key
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') {
    closeAppointmentDropdown();
  }
});
