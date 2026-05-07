(function () {
  "use strict";

  var NAV_LINKS = [
    { label: "Home", href: "index.html" },
    { label: "Services", href: "services.html" },
    { label: "Projects", href: "projects.html" },
    { label: "Blog", href: "blog/index.html" },
    { label: "YouTube", href: "youtube.html" },
    { label: "About", href: "about.html" },
    { label: "Contact", href: "contact.html" }
  ];

  function getSiteRoot(scriptFile) {
    var scripts = document.querySelectorAll("script[src]");
    for (var i = scripts.length - 1; i >= 0; i -= 1) {
      var rawSrc = scripts[i].getAttribute("src") || "";
      if (rawSrc.indexOf("assets/js/" + scriptFile) === -1) continue;

      try {
        var absolute = new URL(rawSrc, window.location.href).href;
        var marker = "assets/js/" + scriptFile;
        var index = absolute.indexOf(marker);
        if (index !== -1) return absolute.slice(0, index);
      } catch (error) {
        console.warn("Failed to resolve site root from script src.", error);
      }
    }

    try {
      return new URL("./", window.location.href).href;
    } catch (fallbackError) {
      return "/";
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
    var page = path.split("/").pop();
    return page || "index.html";
  }

  function isActive(linkHref) {
    var path = window.location.pathname;
    var page = getCurrentPage();

    if (linkHref === "index.html") {
      return (
        (page === "index.html" || page === "") &&
        !path.includes("/blog/") &&
        !path.includes("/projects/") &&
        !path.includes("/Resume/") &&
        !path.includes("/Quotes/") &&
        !path.includes("/GlassBreak/")
      );
    }

    if (linkHref === "blog/index.html" && path.includes("/blog/")) return true;
    if (linkHref === "projects.html" && path.includes("/projects/")) return true;
    return page === linkHref;
  }

  function renderDesktopLinks(root) {
    return NAV_LINKS.map(function (link) {
      var cls = isActive(link.href) ? ' class="active"' : "";
      return '<a href="' + toHref(root, link.href) + '"' + cls + ">" + link.label + "</a>";
    }).join("");
  }

  function renderMobileLinks(root) {
    return NAV_LINKS.map(function (link) {
      var cls = isActive(link.href) ? ' class="active"' : "";
      return '<a href="' + toHref(root, link.href) + '"' + cls + ">" + link.label + "</a>";
    }).join("");
  }

  function createNav() {
    if (document.querySelector(".site-header")) return;

    var root = getSiteRoot("nav.js");
    var header = document.createElement("header");
    header.className = "site-header";
    header.id = "siteHeader";

    var mobileNav = document.createElement("nav");
    mobileNav.className = "mobile-nav";
    mobileNav.id = "mobileNav";
    mobileNav.setAttribute("aria-label", "Mobile Navigation");
    mobileNav.innerHTML =
      '<div class="mobile-nav-links">' +
        renderMobileLinks(root) +
        '<a href="' + toHref(root, "contact.html") + '" class="btn btn-primary mobile-cta">Start a Project</a>' +
      "</div>" +
      '<div class="mobile-nav-meta">Web platforms, automation systems, and private AI workflows.</div>';

    header.innerHTML =
      '<div class="header-inner">' +
        '<a href="' + toHref(root, "index.html") + '" class="site-brand" aria-label="Go to homepage">Gowtham <span>M.</span></a>' +
        '<nav class="desktop-nav" aria-label="Primary">' + renderDesktopLinks(root) + "</nav>" +
        '<div class="header-actions">' +
          '<a href="' + toHref(root, "contact.html") + '" class="btn btn-primary btn-nav-cta">Start a Project</a>' +
          '<button class="mobile-toggle" id="mobileNavToggle" aria-label="Toggle menu" aria-expanded="false">' +
            '<svg id="navIconMenu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg>' +
            '<svg id="navIconClose" style="display:none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>' +
          "</button>" +
        "</div>" +
      "</div>";

    document.body.insertBefore(header, document.body.firstChild);
    document.body.insertBefore(mobileNav, header.nextSibling);

    var toggle = document.getElementById("mobileNavToggle");
    var mobileNavEl = document.getElementById("mobileNav");
    var iconMenu = document.getElementById("navIconMenu");
    var iconClose = document.getElementById("navIconClose");

    function setMenuState(isOpen) {
      mobileNavEl.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      iconMenu.style.display = isOpen ? "none" : "block";
      iconClose.style.display = isOpen ? "block" : "none";
      document.body.classList.toggle("nav-open", isOpen);
    }

    if (toggle && mobileNavEl) {
      toggle.addEventListener("click", function () {
        setMenuState(!mobileNavEl.classList.contains("open"));
      });

      mobileNavEl.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          setMenuState(false);
        });
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") setMenuState(false);
      });

      window.addEventListener("resize", function () {
        if (window.innerWidth > 920) setMenuState(false);
      });
    }

    window.addEventListener("scroll", function () {
      header.classList.toggle("scrolled", window.scrollY > 10);
    }, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", createNav);
})();
