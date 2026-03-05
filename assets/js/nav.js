(function () {
  'use strict';

  var NAV_LINKS = [
    { label: 'Home', href: 'index.html' },
    { label: 'Services', href: 'services.html' },
    { label: 'Projects', href: 'projects.html' },
    { label: 'Blog', href: 'blog/index.html' },
    { label: 'YouTube', href: 'youtube.html' },
    { label: 'About', href: 'about.html' },
    { label: 'Contact', href: 'contact.html' }
  ];

  function getSiteRoot(scriptFile) {
    var scripts = document.querySelectorAll('script[src]');
    for (var i = scripts.length - 1; i >= 0; i -= 1) {
      var rawSrc = scripts[i].getAttribute('src') || '';
      if (rawSrc.indexOf('assets/js/' + scriptFile) === -1) continue;

      try {
        var absolute = new URL(rawSrc, window.location.href).href;
        var marker = 'assets/js/' + scriptFile;
        var index = absolute.indexOf(marker);
        if (index !== -1) return absolute.slice(0, index);
      } catch (error) {
        console.warn('Failed to resolve site root from script src.', error);
      }
    }

    try {
      return new URL('./', window.location.href).href;
    } catch (fallbackError) {
      return '/';
    }
  }

  function toHref(root, relPath) {
    try {
      return new URL(relPath, root).href;
    } catch (error) {
      return relPath;
    }
  }

  function getCurrentPage() {
    var path = window.location.pathname;
    var page = path.split('/').pop();
    return page || 'index.html';
  }

  function isActive(linkHref) {
    var path = window.location.pathname;
    var page = getCurrentPage();

    if (linkHref === 'index.html') {
      return (
        (page === 'index.html' || page === '') &&
        !path.includes('/blog/') &&
        !path.includes('/projects/')
      );
    }
    if (linkHref === 'blog/index.html' && path.includes('/blog/')) return true;
    if (linkHref === 'projects.html' && path.includes('/projects/')) return true;
    return page === linkHref;
  }

  function renderLinks(root) {
    return NAV_LINKS.map(function (link) {
      var cls = isActive(link.href) ? ' class="active"' : '';
      return '<a href="' + toHref(root, link.href) + '"' + cls + '>' + link.label + '</a>';
    }).join('');
  }

  function createNav() {
    var root = getSiteRoot('nav.js');
    var header = document.createElement('header');
    header.className = 'site-header';
    header.id = 'siteHeader';
    var mobileNav = document.createElement('nav');
    mobileNav.className = 'mobile-nav';
    mobileNav.id = 'mobileNav';
    mobileNav.setAttribute('aria-label', 'Mobile Navigation');
    mobileNav.innerHTML =
      renderLinks(root) +
      '<a href="' + toHref(root, 'contact.html') + '" class="mobile-cta">Book a Free Discovery Call</a>';

    header.innerHTML =
      '<div class="header-inner">' +
        '<a href="' + toHref(root, 'index.html') + '" class="site-brand">Gowtham <span>M.</span></a>' +
        '<nav class="desktop-nav" aria-label="Primary">' + renderLinks(root) + '</nav>' +
        '<div class="header-actions">' +
          '<a href="' + toHref(root, 'contact.html') + '" class="btn btn-primary btn-nav-cta">Book a Free Call</a>' +
          '<button class="mobile-toggle" id="mobileNavToggle" aria-label="Menu" aria-expanded="false">' +
            '<svg id="navIconMenu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
            '<svg id="navIconClose" style="display:none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>';

    document.body.insertBefore(header, document.body.firstChild);
    document.body.insertBefore(mobileNav, header.nextSibling);

    var toggle = document.getElementById('mobileNavToggle');
    var mobileNavEl = document.getElementById('mobileNav');
    var iconMenu = document.getElementById('navIconMenu');
    var iconClose = document.getElementById('navIconClose');

    if (toggle && mobileNavEl) {
      toggle.addEventListener('click', function () {
        var isOpen = mobileNavEl.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        iconMenu.style.display = isOpen ? 'none' : 'block';
        iconClose.style.display = isOpen ? 'block' : 'none';
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      mobileNavEl.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mobileNavEl.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          iconMenu.style.display = 'block';
          iconClose.style.display = 'none';
          document.body.style.overflow = '';
        });
      });
    }

    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    }, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', createNav);
})();
