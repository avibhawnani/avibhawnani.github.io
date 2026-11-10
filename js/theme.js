/* ============================================
   theme.js — the site is light-only now.
   (Dark toggle was removed from the nav.)
   ============================================ */

(function () {
  document.documentElement.setAttribute('data-theme', 'light');
  try { localStorage.setItem('theme', 'light'); } catch (e) {}
})();
