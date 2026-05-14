function initTypographyPreferences(){
  const storageKey = 'ccTypographyPreferences';
  const root = document.documentElement;
  const fontSelect = document.getElementById('profile-font-family');
  const lineHeightSelect = document.getElementById('profile-line-height');
  const themeLightBtn = document.getElementById('theme-light');
  const themeDarkBtn = document.getElementById('theme-dark');

  if(!fontSelect || !lineHeightSelect || !themeLightBtn || !themeDarkBtn) return;

  const fontFamilies = {
    nunito: "'Nunito', sans-serif",
    lexend: "'Lexend', sans-serif",
    atkinson: "'Atkinson Hyperlegible', sans-serif",
    'open-dyslexic': "'OpenDyslexic', Arial, sans-serif"
  };

  const applyTheme = (theme) => {
    const safeTheme = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = safeTheme;
    themeLightBtn.classList.toggle('active', safeTheme === 'light');
    themeDarkBtn.classList.toggle('active', safeTheme === 'dark');
    themeLightBtn.setAttribute('aria-pressed', safeTheme === 'light' ? 'true' : 'false');
    themeDarkBtn.setAttribute('aria-pressed', safeTheme === 'dark' ? 'true' : 'false');
    return safeTheme;
  };

  const applyPreferences = (prefs) => {
    const safeFont = fontFamilies[prefs.fontFamily] ? prefs.fontFamily : 'nunito';
    const safeLineHeight = ['1.2', '1.45', '1.7'].includes(String(prefs.lineHeight)) ? String(prefs.lineHeight) : '1.45';
    const safeTheme = prefs.theme === 'dark' ? 'dark' : 'light';

    root.style.setProperty('--app-font-family', fontFamilies[safeFont]);
    root.style.setProperty('--app-line-height', safeLineHeight);
    fontSelect.value = safeFont;
    lineHeightSelect.value = safeLineHeight;
    applyTheme(safeTheme);

    const nextPrefs = {
      fontFamily: safeFont,
      lineHeight: safeLineHeight,
      theme: safeTheme
    };
    localStorage.setItem(storageKey, JSON.stringify(nextPrefs));
    return nextPrefs;
  };

  let initialPrefs = {fontFamily: 'nunito', lineHeight: '1.45', theme: 'light'};
  const saved = localStorage.getItem(storageKey);
  if(saved){
    try{
      initialPrefs = JSON.parse(saved);
    } catch {
      initialPrefs = {fontFamily: 'nunito', lineHeight: '1.45', theme: 'light'};
    }
  }
  applyPreferences(initialPrefs);

  fontSelect.addEventListener('change', () => {
    applyPreferences({
      fontFamily: fontSelect.value,
      lineHeight: lineHeightSelect.value,
      theme: root.dataset.theme || 'light'
    });
  });

  lineHeightSelect.addEventListener('change', () => {
    applyPreferences({
      fontFamily: fontSelect.value,
      lineHeight: lineHeightSelect.value,
      theme: root.dataset.theme || 'light'
    });
  });

  themeLightBtn.addEventListener('click', () => {
    applyPreferences({
      fontFamily: fontSelect.value,
      lineHeight: lineHeightSelect.value,
      theme: 'light'
    });
  });

  themeDarkBtn.addEventListener('click', () => {
    applyPreferences({
      fontFamily: fontSelect.value,
      lineHeight: lineHeightSelect.value,
      theme: 'dark'
    });
  });
}

function initFontScaleControls(){
  const key='ccFontScale';
  const min=0.85;
  const max=1.25;
  const navMax=1.10;
  const step=0.05;
  const root=document.documentElement;
  const decreaseBtn=document.getElementById('font-decrease');
  const increaseBtn=document.getElementById('font-increase');
  const resetBtn=document.getElementById('font-reset');
  const valueEl=document.getElementById('font-scale-value');
  if(!decreaseBtn||!increaseBtn||!resetBtn||!valueEl) return;

  const clamp=(v)=>Math.min(max,Math.max(min,v));
  const clampNav=(v)=>Math.min(navMax,Math.max(min,v));
  const applyScale=(scale)=>{
    const safe=clamp(scale);
    const safeNav=clampNav(scale);
    root.style.setProperty('--user-font-scale',safe.toFixed(2));
    root.style.setProperty('--nav-font-scale',safeNav.toFixed(2));
    valueEl.textContent=`${Math.round(safe*100)}%`;
    localStorage.setItem(key,safe.toFixed(2));
    return safe;
  };

  let current=parseFloat(localStorage.getItem(key)||'1');
  if(Number.isNaN(current)) current=1;
  current=applyScale(current);

  decreaseBtn.addEventListener('click',()=>{current=applyScale(current-step);});
  increaseBtn.addEventListener('click',()=>{current=applyScale(current+step);});
  resetBtn.addEventListener('click',()=>{current=applyScale(1);});
}

// Initialize on load
initTypographyPreferences();
initFontScaleControls();
