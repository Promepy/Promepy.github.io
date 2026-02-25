// ============================================
// Projects Listing - Render from JSON + filter
// ============================================
(function () {
    'use strict';

    const CATEGORIES = ['All', 'AI/ML', 'Automation', 'Data Engineering', 'Open Source'];
    let allProjects = [];
    let activeCategory = 'All';

    async function init() {
        const grid = document.getElementById('projectsGrid');
        const tabsContainer = document.getElementById('filterTabs');
        if (!grid || !tabsContainer) return;

        // Render tabs
        tabsContainer.innerHTML = CATEGORIES.map(cat =>
            `<button class="filter-tab ${cat === 'All' ? 'active' : ''}" data-category="${cat}">${cat}</button>`
        ).join('');

        // Load data
        try {
            const resp = await fetch('data/projects.json');
            allProjects = await resp.json();
            renderProjects(allProjects);
        } catch (e) {
            grid.innerHTML = '<p class="text-muted text-center">Could not load projects.</p>';
        }

        // Tab click handler
        tabsContainer.addEventListener('click', function (e) {
            const tab = e.target.closest('.filter-tab');
            if (!tab) return;

            activeCategory = tab.dataset.category;
            tabsContainer.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filtered = activeCategory === 'All'
                ? allProjects
                : allProjects.filter(p => p.category === activeCategory);

            renderProjects(filtered);
        });
    }

    function renderProjects(projects) {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;

        if (!projects.length) {
            grid.innerHTML = '<p class="text-muted text-center" style="grid-column:1/-1;">No projects in this category yet. More coming soon!</p>';
            return;
        }

        grid.innerHTML = projects.map(p => `
      <div class="project-card" onclick="window.location='${p.link}'">
        <div class="project-meta">
          <span class="badge">${p.category}</span>
          <span class="text-xs text-muted">${new Date(p.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
        </div>
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="pill">${t}</span>`).join('')}
        </div>
        <a href="${p.link}" class="project-link">
          Explore Case Study
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    `).join('');

        // Re-trigger animation
        grid.classList.remove('visible');
        requestAnimationFrame(() => grid.classList.add('visible'));
    }

    document.addEventListener('DOMContentLoaded', init);
})();
