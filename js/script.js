// script.js - splash control, theme toggle, responsive nav
(function(){
  const html = document.documentElement;
  const splash = document.getElementById('splash');
  const main = document.getElementById('main');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const themeToggle = document.getElementById('themeToggle');

  // Theme: prefer saved or system
  const saved = localStorage.getItem('theme');
  if(saved) html.setAttribute('data-theme', saved);
  else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches){
    html.setAttribute('data-theme','light');
  } else {
    html.setAttribute('data-theme','dark');
  }

  function setTheme(t){
    html.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    if(themeToggle) themeToggle.setAttribute('aria-pressed', t==='dark' ? 'false' : 'true');
  }
  if(themeToggle) themeToggle.addEventListener('click', ()=>{
    const cur = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(cur);
  });

  // Splash hide after animation / time
  window.addEventListener('load', ()=>{
    // Minimum splash time + allow animation finish
    setTimeout(()=>{
      if(splash) splash.classList.add('hidden');
      if(main) main.classList.remove('hidden');
    }, 1700);
  });

  // Mobile nav toggle
  if(menuToggle && mainNav){
    menuToggle.addEventListener('click', ()=>{
      mainNav.classList.toggle('open');
      menuToggle.classList.toggle('open');
    });
    // Close nav on link click
    mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=> mainNav.classList.remove('open')));
  }
})();