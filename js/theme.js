/* ============================================
   theme.js — dark / light mode toggle
   Reads from localStorage, persists on toggle
   ============================================ */

(function () {
  const html   = document.documentElement;
  const btn    = document.getElementById('themeToggle');
  const sunIcon  = document.getElementById('icon-sun');
  const moonIcon = document.getElementById('icon-moon');

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
      sunIcon.style.display  = '';
      moonIcon.style.display = 'none';
    } else {
      sunIcon.style.display  = 'none';
      moonIcon.style.display = '';
    }
  }

  // Apply saved theme immediately (prevents flash)
  const saved = localStorage.getItem('theme') || 'dark';
  setTheme(saved);

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
})();
