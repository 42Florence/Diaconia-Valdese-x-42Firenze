function initProfileEditor(){
  const storageKey = 'ccGuestProfile';
  const imageKey = 'ccGuestProfileImage';
  const defaults = {
    firstName: 'Marco',
    lastName: 'Bianchi',
    email: 'marco.bianchi@communitycare.it',
    phone: '+39 333 987 6543',
    structure: 'Struttura Azzurra',
    room: 'Camera 1',
    address: 'Via delle Ginestre 12, Torino',
    bio: 'Mi piace partecipare alle attività di gruppo, ascoltare musica e tenere traccia dei miei progressi quotidiani.'
  };

  const fields = {
    firstName: document.getElementById('profile-first-name'),
    lastName: document.getElementById('profile-last-name'),
    email: document.getElementById('profile-email'),
    phone: document.getElementById('profile-phone'),
    structure: document.getElementById('profile-structure'),
    room: document.getElementById('profile-room'),
    address: document.getElementById('profile-address'),
    bio: document.getElementById('profile-bio')
  };
  const preview = document.getElementById('profile-image-preview');
  const imageInput = document.getElementById('profile-image-input');
  const resetImageBtn = document.getElementById('profile-image-reset');
  const saveBtn = document.getElementById('profile-save');
  const resetFieldsBtn = document.getElementById('profile-reset-fields');
  const headerName = document.getElementById('profile-header-name');
  const headerSub = document.getElementById('profile-header-sub');

  if(!preview || !imageInput) return;

  const persistState = () => {
    const state = {
      firstName: fields.firstName.value.trim(),
      lastName: fields.lastName.value.trim(),
      email: fields.email.value.trim(),
      phone: fields.phone.value.trim(),
      structure: fields.structure.value.trim(),
      room: fields.room.value.trim(),
      address: fields.address.value.trim(),
      bio: fields.bio.value.trim()
    };
    localStorage.setItem(storageKey, JSON.stringify(state));
    headerName.textContent = `${state.firstName} ${state.lastName}`.trim();
    headerSub.textContent = `${state.structure} · ${state.room}`.trim();
  };

  const applyDefaults = () => {
    Object.entries(defaults).forEach(([key, value]) => {
      if(fields[key]) fields[key].value = value;
    });
    persistState();
  };

  const saved = localStorage.getItem(storageKey);
  if(saved){
    try{
      const parsed = JSON.parse(saved);
      Object.entries(defaults).forEach(([key, value]) => {
        if(fields[key]) fields[key].value = parsed[key] || value;
      });
    } catch {
      applyDefaults();
    }
  }

  const savedImage = localStorage.getItem(imageKey);
  if(savedImage){
    preview.textContent = '';
    preview.style.backgroundImage = `url(${savedImage})`;
    preview.classList.add('has-image');
  }

  Object.values(fields).forEach(field => {
    field.addEventListener('input', persistState);
  });

  imageInput.addEventListener('change', () => {
    const file = imageInput.files && imageInput.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      preview.textContent = '';
      preview.style.backgroundImage = `url(${result})`;
      preview.classList.add('has-image');
      localStorage.setItem(imageKey, result);
    };
    reader.readAsDataURL(file);
  });

  resetImageBtn.addEventListener('click', () => {
    preview.style.backgroundImage = '';
    preview.classList.remove('has-image');
    preview.textContent = '👦';
    imageInput.value = '';
    localStorage.removeItem(imageKey);
  });

  saveBtn.addEventListener('click', persistState);

  resetFieldsBtn.addEventListener('click', () => {
    localStorage.removeItem(storageKey);
    applyDefaults();
  });

  persistState();
}

// Initialize on load
initProfileEditor();
