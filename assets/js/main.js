// Core site enhancements (navigation, theme, analytics events)
(function(){
  const doc = document.documentElement;
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Active link highlighting for new header (fallback if class not already set)
  const current = window.location.pathname.replace(/\/$/,'').split('/').pop() || 'index.html';
  document.querySelectorAll('.primary-nav a, #mobileMenu a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    if ((current === '' || current === 'index.html') && href === 'index.html') link.classList.add('active');
    else if (href.endsWith(current)) link.classList.add('active');
  });

  // Theme initialization (if not already inlined)
  const stored = localStorage.getItem('theme');
  if (stored && !doc.classList.contains('dark') && stored === 'dark') doc.classList.add('dark');

  // Analytics CTA binding (idempotent)
  const bindCTAs = () => {
    document.querySelectorAll('[data-analytics="book_call_click"]').forEach(el => {
      if(el.dataset._bound === '1') return;
      el.addEventListener('click', () => { if(window.plausible) window.plausible('BookCallClick'); });
      el.dataset._bound = '1';
    });
  };
  bindCTAs();

  // Observing dynamically added nodes (future expansions)
  const mo = new MutationObserver(bindCTAs); mo.observe(document.body,{childList:true,subtree:true});
})();
