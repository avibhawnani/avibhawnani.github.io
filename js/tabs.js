/* ============================================
   tabs.js — tab switching logic
   Reads data-target on each .tab-btn,
   shows matching #panel-{target}
   ============================================ */

(function () {
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Deactivate all
      tabBtns.forEach(b   => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      // Activate clicked
      btn.classList.add('active');
      const target = document.getElementById('panel-' + btn.dataset.target);
      if (target) target.classList.add('active');
    });
  });
})();
