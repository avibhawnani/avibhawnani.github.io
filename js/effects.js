/* ============================================
   effects.js — scroll progress, cursor spotlight,
   scroll reveal, live IST clock. Reduced-motion safe.
   ============================================ */

(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine   = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---- Scroll progress ---- */
  var bar = document.getElementById('scroll-progress');
  function onScroll() {
    var top = window.scrollY || document.documentElement.scrollTop;
    var h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (bar) bar.style.width = (h > 0 ? (top / h) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Cursor spotlight ---- */
  var spot = document.getElementById('spotlight');
  if (spot && fine && !reduce) {
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
    function loop() {
      cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
      spot.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) raf = requestAnimationFrame(loop);
      else raf = null;
    }
    window.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      document.body.classList.add('spotlight-on');
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    window.addEventListener('mouseleave', function () { document.body.classList.remove('spotlight-on'); });
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- Live IST clock ---- */
  var clock = document.getElementById('footer-clock');
  if (clock) {
    function tick() {
      var t = new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      clock.innerHTML = 'IST <span class="tick">' + t + '</span>';
    }
    tick(); setInterval(tick, 1000);
  }
})();
