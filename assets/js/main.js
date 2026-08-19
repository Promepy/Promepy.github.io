// Shared behaviors: subtle reveal animation, anchor smoothing, analytics binding.
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function initRevealAnimations() {
    var reveals = document.querySelectorAll(".reveal, .stagger");
    if (!reveals.length) return;

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      reveals.forEach(function (element) {
        element.classList.add("visible");
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -60px 0px"
    });

    reveals.forEach(function (element) {
      observer.observe(element);
    });
  }

  function initSmoothScroll() {
    if (reduceMotion.matches) return;

    document.addEventListener("click", function (event) {
      var link = event.target.closest('a[href^="#"]');
      if (!link) return;

      var href = link.getAttribute("href");
      if (!href || href === "#") return;

      var target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function initAnalytics() {
    document.querySelectorAll("[data-analytics]").forEach(function (element) {
      if (element.dataset.analyticsBound === "1") return;

      element.addEventListener("click", function () {
        if (window.plausible) window.plausible(element.dataset.analytics);
      });

      element.dataset.analyticsBound = "1";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initRevealAnimations();
    initSmoothScroll();
    initAnalytics();

    var observer = new MutationObserver(function () {
      initAnalytics();
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
