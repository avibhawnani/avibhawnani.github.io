/* ============================================
   render.js — reads data.js constants and
   injects all dynamic content into the DOM.
   
   You should not need to edit this file unless
   you want to change the HTML structure of a
   section. For content, edit data.js instead.
   ============================================ */

(function () {

  /* ---- Profile / Nav ---- */
  function renderProfile() {
    document.title = PROFILE.name;

    const emailLink = document.getElementById('nav-email');
    if (emailLink) {
      emailLink.href = '#';
      emailLink.addEventListener('click', function (e) {
        e.preventDefault();
        navigator.clipboard.writeText(PROFILE.email).then(function () {
          var dot = document.querySelector('.nav-dot');
          emailLink.textContent = '✓ Copied!';
          emailLink.classList.add('nav-email--copied');
          if (dot) dot.classList.add('nav-dot--copied');
          setTimeout(function () {
            emailLink.textContent = 'Write to me via email';
            emailLink.classList.remove('nav-email--copied');
            if (dot) dot.classList.remove('nav-dot--copied');
          }, 2000);
        });
      });
    }

    const links = {
      'nav-twitter':  PROFILE.twitter,
      'nav-github':   PROFILE.github,
      'nav-linkedin': PROFILE.linkedin,
    };
    Object.entries(links).forEach(([id, url]) => {
      const el = document.getElementById(id);
      if (el) el.href = url;
    });

    const footer = document.getElementById('footer-tagline');
    if (footer) footer.textContent = PROFILE.footerTagline;
  }

  /* ---- Footer ---- */
  function renderFooter() {
    const el = document.getElementById('footer-clock');
    if (el && PROFILE.lastUpdated) {
      el.textContent = `last updated · ${PROFILE.lastUpdated.toLowerCase()}`;
    }
  }

  /* ---- Hero ---- */
  function renderHero() {
    const h1 = document.getElementById('hero-headline');
    if (h1) h1.textContent = PROFILE.headline;

    const statusEl = document.getElementById('hero-status');
    if (statusEl && PROFILE.status) {
      statusEl.innerHTML = `<span class="status-dot"></span><span class="status-text">${PROFILE.status}</span>`;
    }

    const blurb = document.getElementById('work-blurb');
    if (blurb) blurb.innerHTML = WORK_BLURB.description;

    const statsContainer = document.getElementById('stats-row');
    if (!statsContainer) return;
    statsContainer.innerHTML = STATS.map(s => `
      <div class="stat">
        <span class="stat-value">${s.value}</span>
        <span class="stat-label">${s.label}</span>
      </div>
    `).join('');
  }

  /* ---- Tab counts ---- */
  function renderTabCounts() {
    const counts = {
      'tab-skills':     SKILLS.length,
      'tab-experience': EXPERIENCE.length,
      'tab-projects':   PROJECTS.length,
      'tab-education':  EDUCATION.length,
      'tab-writings':   WRITINGS.length,
    };
    Object.entries(counts).forEach(([id, count]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = el.dataset.label + ` (${count})`;
    });
  }

  /* ---- Skills ---- */
  function renderSkills() {
    const container = document.getElementById('panel-skills');
    if (!container) return;

    container.innerHTML = `
      <div class="skills-list">
        ${SKILLS.map(group => `
          <div class="skills-group">
            <div class="skills-group-header">
              <div class="skills-category">${group.category}</div>
              <span class="skills-count">${group.items.length}</span>
            </div>
            <div class="tag-row">
              ${group.items.map(item => `<span class="tag">${item}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* ---- Experience ---- */
  /* ---- Experience ---- */
  function renderExperience() {
    const container = document.getElementById('panel-experience');
    if (!container) return;

    container.innerHTML = `
      <div class="exp-list">
        ${EXPERIENCE.map((e, i) => `
          <div class="exp-item" data-expanded="${i === 0 ? 'true' : 'false'}">
            <div class="exp-clickable">
              <div class="exp-title-row">
                <span class="exp-role">${e.role}</span>
                <button class="toggle-btn" aria-label="Toggle details">${i === 0 ? '−' : '+'}</button>
              </div>
              <div class="exp-company-row">
                <span class="exp-company-name">${e.company}</span>
                <span class="exp-location">${e.location} · ${e.period}</span>
              </div>
              <div class="tag-row">
                ${e.tags.map(t => `<span class="tag">${t}</span>`).join('')}
              </div>
            </div>
            <div class="exp-body">
              <div class="exp-desc">${e.description}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.exp-clickable').forEach(function (el) {
      el.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        var item = el.closest('.exp-item');
        var expanded = item.getAttribute('data-expanded') === 'true';
        item.setAttribute('data-expanded', expanded ? 'false' : 'true');
        el.querySelector('.toggle-btn').textContent = expanded ? '+' : '−';
      });
    });
  }

  /* ---- Education ---- */
  function renderEducation() {
    const container = document.getElementById('panel-education');
    if (!container) return;

    container.innerHTML = `
      <div class="edu-list">
        ${EDUCATION.map(e => `
          <div class="edu-item">
            <div class="edu-header">
              <div class="edu-degree-row">
                <span class="edu-badge">B.Tech</span>
                <span class="edu-degree">${e.degree}</span>
              </div>
              <span class="edu-period">${e.period}</span>
            </div>
            <div class="edu-institute-row">
              <span class="edu-institute">${e.institute}</span>
              <span class="edu-location">${e.location}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
  function renderWritings() {
    const container = document.getElementById('panel-writings');
    if (!container) return;

    container.innerHTML = `
      <div class="writing-list">
        ${WRITINGS.map(w => `
          <div class="writing-item">
            <div class="writing-title">${w.title}</div>
            <div class="writing-desc">${w.description}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /* ---- Projects ---- */
  function renderProjects() {
    const container = document.getElementById('panel-projects');
    if (!container) return;

    container.innerHTML = `
      <div class="proj-list">
        ${PROJECTS.map(p => `
          <div class="proj-item" data-expanded="false">
            <div class="proj-clickable">
              <div class="proj-header">
                <a class="proj-name" href="${p.url}" target="_blank" rel="noopener noreferrer">${p.name} ↗</a>
                <div class="proj-header-right">
                  ${p.featured ? `<span class="proj-featured">Featured</span>` : ''}
                  <span class="proj-year">${p.year}</span>
                  <button class="toggle-btn" aria-label="Toggle details">+</button>
                </div>
              </div>
              <div class="tag-row">
                ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
              </div>
            </div>
            <div class="proj-body">
              <div class="proj-desc">${p.description}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.proj-clickable').forEach(function (el) {
      el.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        var item = el.closest('.proj-item');
        var expanded = item.getAttribute('data-expanded') === 'true';
        item.setAttribute('data-expanded', expanded ? 'false' : 'true');
        el.querySelector('.toggle-btn').textContent = expanded ? '+' : '−';
      });
    });
  }

  /* ---- Boot ---- */
  document.addEventListener('DOMContentLoaded', () => {
    renderProfile();
    renderHero();
    renderTabCounts();
    renderSkills();
    renderExperience();
    renderProjects();
    renderEducation();
    renderWritings();
    renderFooter();
  });

})();
