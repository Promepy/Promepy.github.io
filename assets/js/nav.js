// ============================================
// Shared Navigation Component
// ============================================
(function () {
    'use strict';

    const NAV_LINKS = [
        { label: 'Home', href: 'index.html' },
        { label: 'Projects', href: 'projects.html' },
        { label: 'Blog', href: 'blog/index.html' },
        { label: 'YouTube', href: 'youtube.html' },
        { label: 'Community', href: 'community.html' },
        { label: 'About', href: 'about.html' },
    ];

    function getBasePath() {
        const path = window.location.pathname;
        // If we're in a subdirectory like /blog/ or /projects/
        if (path.includes('/blog/') || path.includes('/projects/')) {
            return '../';
        }
        return '';
    }

    function isActive(href) {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';

        if (href === 'index.html' && (page === '' || page === 'index.html' || page === '')) return true;
        if (href === 'blog/index.html' && (path.includes('/blog/') || page === 'blog')) return true;
        if (href === 'projects.html' && (path.includes('/projects/') || page === 'projects.html')) return true;
        if (page === href) return true;
        return false;
    }

    function createNav() {
        const base = getBasePath();
        const header = document.createElement('header');
        header.className = 'site-header';
        header.id = 'siteHeader';
        header.setAttribute('role', 'banner');

        const desktopLinks = NAV_LINKS.map(link =>
            `<a href="${base}${link.href}" ${isActive(link.href) ? 'class="active"' : ''}>${link.label}</a>`
        ).join('');

        const mobileLinks = NAV_LINKS.map(link =>
            `<a href="${base}${link.href}" ${isActive(link.href) ? 'class="active"' : ''}>${link.label}</a>`
        ).join('');

        header.innerHTML = `
      <div class="header-inner">
        <a href="${base}index.html" class="site-brand">Gowtham <span>M.</span></a>
        <nav class="desktop-nav" aria-label="Primary">
          ${desktopLinks}
        </nav>
        <div class="header-actions">
          <button class="icon-btn" id="settingsBtn" aria-label="Settings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          </button>
          <a href="${base}contact.html" class="btn btn-primary btn-nav-cta">
            Book a Call
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
          <button class="icon-btn mobile-toggle" id="mobileNavToggle" aria-label="Menu" aria-expanded="false">
            <svg id="navIconMenu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
            <svg id="navIconClose" style="display:none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
      <nav class="mobile-nav" id="mobileNav" aria-label="Mobile Navigation">
        ${mobileLinks}
        <a href="${base}contact.html" class="mobile-cta">Book a Free Discovery Call</a>
      </nav>
    `;

        // Insert at top of body
        document.body.insertBefore(header, document.body.firstChild);

        // Mobile toggle
        const toggle = document.getElementById('mobileNavToggle');
        const mobileNav = document.getElementById('mobileNav');
        const iconMenu = document.getElementById('navIconMenu');
        const iconClose = document.getElementById('navIconClose');

        toggle.addEventListener('click', function () {
            const isOpen = mobileNav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            iconMenu.style.display = isOpen ? 'none' : 'block';
            iconClose.style.display = isOpen ? 'block' : 'none';
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close mobile nav when clicking a link
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                mobileNav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                iconMenu.style.display = 'block';
                iconClose.style.display = 'none';
                document.body.style.overflow = '';
            });
        });

        // Scroll shadow
        window.addEventListener('scroll', function () {
            header.classList.toggle('scrolled', window.scrollY > 10);
        }, { passive: true });
    }

    // Small CTA button style
    const style = document.createElement('style');
    style.textContent = `
    .btn-nav-cta { padding: .5rem 1rem; font-size: .8rem; border-radius: 8px; }
    @media (max-width: 860px) { .btn-nav-cta { display: none; } }
  `;
    document.head.appendChild(style);

    document.addEventListener('DOMContentLoaded', createNav);
})();
