(function () {
  'use strict';

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

  function createFooter() {
    var root = getSiteRoot('footer.js');
    var year = new Date().getFullYear();

    var footer = document.createElement('footer');
    footer.className = 'site-footer';

    footer.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-col">' +
            '<h4>Gowtham M.</h4>' +
            '<p>Agency-level web design powered by backend automation. I build sharp, conversion-ready websites that save businesses 10+ hours a week.</p>' +
            '<div class="footer-social">' +
              '<a href="https://github.com/Promepy" target="_blank" rel="noopener" aria-label="GitHub">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>' +
              '</a>' +
              '<a href="https://www.youtube.com/@gowthammuraharirao" target="_blank" rel="noopener" aria-label="YouTube">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>' +
              '</a>' +
              '<a href="mailto:Gowtham.Muraharirao@outlook.com" aria-label="Email">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>' +
              '</a>' +
            '</div>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4>Pages</h4>' +
            '<a href="' + toHref(root, 'index.html') + '">Home</a>' +
            '<a href="' + toHref(root, 'services.html') + '">Services</a>' +
            '<a href="' + toHref(root, 'projects.html') + '">Projects</a>' +
            '<a href="' + toHref(root, 'about.html') + '">About</a>' +
            '<a href="' + toHref(root, 'contact.html') + '">Contact</a>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4>Resources</h4>' +
            '<a href="' + toHref(root, 'blog/index.html') + '">Blog</a>' +
            '<a href="' + toHref(root, 'youtube.html') + '">YouTube</a>' +
            '<a href="' + toHref(root, 'community.html') + '">Community</a>' +
            '<a href="' + toHref(root, 'testimonials.html') + '">Testimonials</a>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4>Contact</h4>' +
            '<a href="mailto:Gowtham.Muraharirao@outlook.com">Gowtham.Muraharirao@outlook.com</a>' +
            '<a href="' + toHref(root, 'contact.html') + '">Book a Free Discovery Call</a>' +
            '<a href="' + toHref(root, 'terms.html') + '">Terms</a>' +
            '<a href="' + toHref(root, 'privacy.html') + '">Privacy</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<p>&copy; ' + year + ' Gowtham M. All rights reserved.</p>' +
          '<p>Built with precision. Designed for conversion.</p>' +
        '</div>' +
      '</div>';

    document.body.appendChild(footer);
  }

  document.addEventListener('DOMContentLoaded', createFooter);
})();
