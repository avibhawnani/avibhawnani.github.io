/* ============================================
   render.js — fills the shared identity rail on
   every page, plus whichever content containers
   exist on the current page. Edit data.js, not here.
   ============================================ */

(function () {

  var ICON = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0024 12.5C24 5.87 18.63.5 12 .5z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0z"/></svg>',
    leetcode: '<span class="social-mask" aria-hidden="true"></span>',
  };

  function wireCopy(el, hooks) {
    if (!el) return;
    el.addEventListener('click', function (e) {
      e.preventDefault();
      navigator.clipboard.writeText(PROFILE.email).then(function () { hooks.done(); setTimeout(hooks.revert, 1800); });
    });
  }

  /* ---- Shared identity rail ---- */
  function renderRail() {
    var el = document.getElementById('rail-inner');
    if (!el) return;
    el.innerHTML =
      '<div class="rail-photo"><img src="' + PROFILE.photo + '" alt="' + PROFILE.name + '" />' +
        '<span class="rail-status"><span class="chip-dot"></span>open to work</span></div>' +
      '<h1 class="rail-name">' + PROFILE.name + '</h1>' +
      '<p class="rail-role">' + PROFILE.craft + '<span class="rail-aside"> · ' + PROFILE.tagline + '</span></p>' +
      (PROFILE.current ? '<p class="rail-current"><span class="chip-dot"></span><strong>' + PROFILE.current + '</strong></p>' : '') +
      '<p class="rail-intro">' + PROFILE.intro + '</p>' +
      '<div class="rail-socials">' +
        '<a class="social" href="' + PROFILE.github   + '" target="_blank" rel="noopener" aria-label="GitHub">'   + ICON.github   + '</a>' +
        '<a class="social" href="' + PROFILE.linkedin + '" target="_blank" rel="noopener" aria-label="LinkedIn">' + ICON.linkedin + '</a>' +
        '<a class="social" href="' + PROFILE.leetcode + '" target="_blank" rel="noopener" aria-label="LeetCode">' + ICON.leetcode + '</a>' +
      '</div>' +
      '<button class="rail-email btn btn--primary" id="rail-email">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>' +
        rollerHTML("Let's talk") + '</button>';

    var btn = document.getElementById('rail-email');
    wireCopy(btn, {
      done:   function () { btn.classList.add('btn--copied'); setRoller(btn, '✓ Email copied'); },
      revert: function () { btn.classList.remove('btn--copied'); setRoller(btn, "Let's talk"); },
    });
  }

  /* roller: two stacked labels; on hover the stack rolls up (text flips) */
  function rollerHTML(text) {
    return '<span class="roller"><span class="roller-in"><span>' + text + '</span><span>' + text + '</span></span></span>';
  }
  function setRoller(btn, text) {
    var inner = btn.querySelector('.roller-in');
    if (inner) inner.innerHTML = '<span>' + text + '</span><span>' + text + '</span>';
  }

  /* ---- Home: LAYN intro ---- */
  function renderHome() { renderLaynIntro(); }

  /* ---- LAYN intro — the real LAYN map (ported) + a radar sweep ---- */
  function renderLaynIntro() {
    var el = document.getElementById('layn-mini');
    if (!el || typeof NOW === 'undefined') return;
    var host = NOW.url ? NOW.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';
    el.innerHTML =
      '<div class="scope" aria-hidden="true">' +
        '<canvas id="layn-map"></canvas>' +
        '<span class="radar-sweep"></span>' +
        '<span class="scope-ring sr1"></span><span class="scope-ring sr2"></span>' +
        '<span class="scope-me"></span>' +
        '<span class="scope-pin p-games">⚽</span>' +
        '<span class="scope-pin p-music">🎧</span>' +
        '<span class="scope-pin p-food">🍽️</span>' +
        '<span class="scope-pin p-rides">🚴</span>' +
      '</div>' +
      '<div class="layn-mini-text">' +
        '<span class="layn-mini-top"><span class="layn-mini-name">' + NOW.name + '</span>' +
          '<span class="layn-mini-badge"><span class="chip-dot"></span>' + NOW.status + '</span></span>' +
        '<h3 class="layn-moves">' + NOW.tagline + '</h3>' +
        '<p class="layn-mini-sub">' + NOW.steps[0].d + '</p>' +
        (NOW.url ? '<a class="layn-mini-link" href="' + NOW.url + '" target="_blank" rel="noopener">' + host + ' ↗</a>' : '') +
      '</div>';
  }

  /* ---- About me ---- */
  function renderAbout() {
    var el = document.getElementById('about-bio');
    if (!el || typeof ABOUT === 'undefined') return;
    el.innerHTML = ABOUT.map(function (p) { return '<p class="bio-p">' + p + '</p>'; }).join('');
  }

  /* ---- My journey — accordion; details hidden until clicked ---- */
  function renderExperience() {
    var el = document.getElementById('exp-list');
    if (!el) return;
    el.innerHTML = '<div class="acc-list">' + EXPERIENCE.map(function (e) {
      var logo = e.logo ? '<img class="acc-logo" src="' + e.logo + '" alt="" />' : '<span class="acc-mark">' + e.company.charAt(0) + '</span>';
      var now = e.current ? '<span class="work-now">Now</span>' : '';
      var pills = (e.highlights || []).filter(function (h) { return h.m; })
        .map(function (h) { return '<span class="work-pill">' + h.m + '</span>'; }).join('');
      return '<div class="acc-item" data-open="false">' +
          '<button class="acc-head" aria-expanded="false">' + logo +
            '<span class="acc-main"><span class="acc-title">' + e.company + now + '</span>' +
              '<span class="acc-sub">' + e.role + (e.team ? ' · ' + e.team : '') + '</span></span>' +
            '<span class="acc-right"><span class="acc-period">' + e.period + '</span>' + CHEV + '</span>' +
          '</button>' +
          '<div class="acc-body"><div class="acc-body-in">' +
            (e.summary ? '<p class="work-summary">' + e.summary + '</p>' : '') +
            (pills ? '<div class="work-pills">' + pills + '</div>' : '') +
            '<div class="tag-row">' + e.tags.map(tag).join('') + '</div>' +
            '<p class="acc-loc">' + e.location + '</p>' +
          '</div></div>' +
        '</div>';
    }).join('') + '</div>';
    wireAcc(el);
  }

  /* ---- Projects — minimal list with accordions ---- */
  function renderProjects() {
    var el = document.getElementById('proj-list');
    if (!el) return;
    el.innerHTML = '<div class="acc-list">' + PROJECTS.map(function (p, i) {
      var num = ('0' + (i + 1)).slice(-2);
      var meta = (p.kind ? p.kind + ' · ' : '') + p.year;
      var host = p.url.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0];
      return '<div class="acc-item" data-open="false">' +
          '<button class="acc-head" aria-expanded="false">' +
            '<span class="acc-index">' + num + '</span>' +
            '<span class="acc-main"><span class="acc-title">' + p.name + '</span>' +
              '<span class="acc-sub">' + meta + '</span></span>' +
            '<span class="acc-right">' +
              (p.live ? '<a class="acc-ext" href="' + p.url + '" target="_blank" rel="noopener" aria-label="Visit ' + host + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5h5v5M19 5l-8 8M10 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-4"/></svg></a>' : '') +
              CHEV + '</span>' +
          '</button>' +
          '<div class="acc-body"><div class="acc-body-in">' +
            '<p class="proj-blurb">' + (p.blurb || '') + '</p>' +
            '<div class="tag-row">' + p.tags.map(tag).join('') + '</div>' +
            '<a class="acc-link" href="' + p.url + '" target="_blank" rel="noopener">' + host + ' ↗</a>' +
          '</div></div>' +
        '</div>';
    }).join('') + '</div>';
    wireAcc(el);
  }

  /* ---- Skills — capability cards (icon + descriptor + stack) ---- */
  var SKILL_ICONS = {
    'Languages':    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3M13 5l-2 14"/></svg>',
    'Backend':      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><path stroke-linecap="round" d="M7 7h.01M7 17h.01"/></svg>',
    'Messaging':    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M21 11.5a8.4 8.4 0 01-11.9 7.6L3 21l1.9-6.1A8.4 8.4 0 1121 11.5z"/></svg>',
    'Data & Search':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="5" rx="8" ry="3"/><path stroke-linecap="round" d="M4 5v6c0 1.66 3.6 3 8 3s8-1.34 8-3V5M4 11v6c0 1.66 3.6 3 8 3s8-1.34 8-3v-6"/></svg>',
    'Architecture': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path stroke-linecap="round" d="M10 6.5h5a2 2 0 012 2v5"/></svg>',
    'Tooling':      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M14.7 6.3a4 4 0 00-5.4 5.1L4 16.7 7.3 20l5.3-5.3a4 4 0 005.1-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/></svg>',
  };
  function renderSkills() {
    var el = document.getElementById('skills-wrap');
    if (!el) return;
    el.innerHTML = '<div class="acc-list">' + SKILLS.map(function (g) {
      var ic = SKILL_ICONS[g.category] || '';
      return '<div class="acc-item" data-open="false">' +
          '<button class="acc-head" aria-expanded="false">' +
            '<span class="cap-icon">' + ic + '</span>' +
            '<span class="acc-main"><span class="acc-title">' + g.category + '</span>' +
              (g.desc ? '<span class="acc-sub">' + g.desc + '</span>' : '') + '</span>' +
            '<span class="acc-right"><span class="acc-count">' + g.items.length + '</span>' + CHEV + '</span>' +
          '</button>' +
          '<div class="acc-body"><div class="acc-body-in"><div class="tag-row">' + g.items.map(tag).join('') + '</div></div></div>' +
        '</div>';
    }).join('') + '</div>';
    wireAcc(el);
  }

  /* ---- Education — same minimal row language as the accordions ---- */
  function renderEducation() {
    var el = document.getElementById('edu-list');
    if (!el) return;
    var GRAD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3l10 5-10 5L2 8l10-5zM6 10.5V15c0 1.3 2.7 2.5 6 2.5s6-1.2 6-2.5v-4.5M21 9v4"/></svg>';
    el.innerHTML = '<div class="acc-list">' + EDUCATION.map(function (e) {
      return '<div class="edu-row">' +
          '<span class="cap-icon">' + GRAD + '</span>' +
          '<span class="acc-main"><span class="acc-title">' + e.degree + '</span>' +
            '<span class="acc-sub">' + e.institute + ' · ' + e.location + '</span></span>' +
          '<span class="acc-right"><span class="acc-period">' + e.period + '</span></span>' +
        '</div>';
    }).join('') + '</div>';
  }

  function tag(t) { return '<span class="tag">' + t + '</span>'; }
  var CHEV = '<span class="acc-chev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg></span>';
  function wireAcc(root) {
    root.querySelectorAll('.acc-head').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        var item = btn.closest('.acc-item');
        var open = item.getAttribute('data-open') === 'true';
        item.setAttribute('data-open', open ? 'false' : 'true');
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderRail();
    renderHome();
    renderAbout();
    renderExperience();
    renderProjects();
    renderSkills();
    renderEducation();
  });

})();
