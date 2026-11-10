/* ============================================
   command.js — ⌘K / Ctrl-K command palette.
   Jump to sections, copy email, open links,
   toggle theme. Built from data.js + the DOM.
   ============================================ */

(function () {
  var overlay = document.getElementById('cmdk');
  var input   = document.getElementById('cmdk-input');
  var list    = document.getElementById('cmdk-list');
  var openBtn = document.getElementById('cmdkOpen');
  if (!overlay || !input || !list) return;

  var ICON = {
    jump:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M4 12h15"/></svg>',
    mail:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
    link:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5h5v5M19 5l-7 7M10 5H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5"/></svg>',
    theme:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/></svg>',
  };

  function build() {
    return [
      { group: 'Go to', icon: ICON.jump, label: 'Home',     hint: '/',            act: function () { go('/', 'home'); } },
      { group: 'Go to', icon: ICON.jump, label: 'About',    hint: 'me & journey', act: function () { go('/about/', 'about'); } },
      { group: 'Go to', icon: ICON.jump, label: 'Projects', hint: 'selected work',act: function () { go('/projects/', 'projects'); } },
      { group: 'Go to', icon: ICON.jump, label: 'Skills',   hint: 'the stack',    act: function () { go('/skills/', 'skills'); } },
      { group: 'Actions', icon: ICON.mail, label: 'Copy email', hint: PROFILE.email, act: function () { navigator.clipboard.writeText(PROFILE.email); } },
      { group: 'Links', icon: ICON.link, label: 'LAYN · layn.in', hint: '↗', act: function () { window.open(NOW.url, '_blank'); } },
      { group: 'Links', icon: ICON.link, label: 'GitHub',   hint: '↗', act: function () { window.open(PROFILE.github, '_blank'); } },
      { group: 'Links', icon: ICON.link, label: 'LinkedIn', hint: '↗', act: function () { window.open(PROFILE.linkedin, '_blank'); } },
      { group: 'Links', icon: ICON.link, label: 'LeetCode', hint: '↗', act: function () { window.open(PROFILE.leetcode, '_blank'); } },
    ];
  }

  var ALL = build();
  var filtered = ALL.slice();
  var active = 0;

  function go(url, page) {
    if (page && document.body.dataset.page === page) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    window.location.href = url;
  }

  function render() {
    if (!filtered.length) { list.innerHTML = '<div class="cmdk-empty">No matches.</div>'; return; }
    var html = '', lastGroup = null;
    filtered.forEach(function (it, i) {
      if (it.group !== lastGroup) { html += '<div class="cmdk-group-label">' + it.group + '</div>'; lastGroup = it.group; }
      html += '<div class="cmdk-item' + (i === active ? ' active' : '') + '" data-i="' + i + '">' +
                '<span class="ci-icon">' + it.icon + '</span>' + it.label +
                (it.hint ? '<span class="ci-hint">' + it.hint + '</span>' : '') +
              '</div>';
    });
    list.innerHTML = html;
    list.querySelectorAll('.cmdk-item').forEach(function (el) {
      el.addEventListener('click', function () { run(parseInt(el.dataset.i, 10)); });
      el.addEventListener('mousemove', function () { active = parseInt(el.dataset.i, 10); paint(); });
    });
  }

  function paint() {
    list.querySelectorAll('.cmdk-item').forEach(function (el) {
      el.classList.toggle('active', parseInt(el.dataset.i, 10) === active);
    });
  }

  function filter() {
    var q = input.value.trim().toLowerCase();
    filtered = q ? ALL.filter(function (it) { return (it.label + ' ' + it.group + ' ' + it.hint).toLowerCase().indexOf(q) !== -1; }) : ALL.slice();
    active = 0;
    render();
  }

  function run(i) {
    var it = filtered[i];
    if (!it) return;
    close();
    setTimeout(it.act, 120);
  }

  function open() {
    filtered = ALL.slice(); active = 0;
    overlay.classList.add('open');
    input.value = '';
    render();
    setTimeout(function () { input.focus(); }, 30);
  }
  function close() { overlay.classList.remove('open'); }
  function isOpen() { return overlay.classList.contains('open'); }

  if (openBtn) openBtn.addEventListener('click', open);
  input.addEventListener('input', filter);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });

  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); isOpen() ? close() : open(); return; }
    if (!isOpen()) return;
    if (e.key === 'Escape') { close(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(active + 1, filtered.length - 1); paint(); scrollActive(); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); active = Math.max(active - 1, 0); paint(); scrollActive(); }
    else if (e.key === 'Enter')     { e.preventDefault(); run(active); }
  });

  function scrollActive() {
    var el = list.querySelector('.cmdk-item.active');
    if (el) el.scrollIntoView({ block: 'nearest' });
  }
})();
