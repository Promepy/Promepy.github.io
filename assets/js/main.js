// ============================================
// Main JS — Scroll animations, smooth scroll, analytics
// ============================================
(function () {
  'use strict';

  // ---- Scroll-triggered reveal animations ----
  function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal, .stagger');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  // ---- Smooth scroll for anchor links ----
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // ---- Analytics CTA binding (Plausible) ----
  function initAnalytics() {
    document.querySelectorAll('[data-analytics]').forEach(function (el) {
      if (el.dataset._bound === '1') return;
      el.addEventListener('click', function () {
        if (window.plausible) window.plausible(el.dataset.analytics);
      });
      el.dataset._bound = '1';
    });
  }

  // ---- Init ----
  document.addEventListener('DOMContentLoaded', function () {
    initRevealAnimations();
    initSmoothScroll();
    initAnalytics();

    // Re-bind analytics on dynamic content
    const mo = new MutationObserver(initAnalytics);
    mo.observe(document.body, { childList: true, subtree: true });
  });
})();
