// Main JS for Promepy MVP
(function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Highlight active nav link more robustly if needed
  const path = window.location.pathname.replace(/\/index\.html$/,'');
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    if (href === 'index.html' && window.location.pathname.endsWith('/index.html')) {
      a.classList.add('active');
    }
  });
})();
