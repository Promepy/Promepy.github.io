// Projects listing: JSON render + category filtering.
(function () {
  "use strict";

  var CATEGORIES = ["All", "AI/ML", "Automation", "Data Engineering", "Open Source"];
  var allProjects = [];
  var activeCategory = "All";

  async function init() {
    var grid = document.getElementById("projectsGrid");
    var tabsContainer = document.getElementById("filterTabs");
    if (!grid || !tabsContainer) return;

    tabsContainer.innerHTML = CATEGORIES.map(function (category) {
      var activeClass = category === "All" ? " active" : "";
      return '<button class="filter-tab' + activeClass + '" data-category="' + category + '">' + category + "</button>";
    }).join("");

    try {
      var response = await fetch("data/projects.json");
      allProjects = await response.json();
      renderProjects(allProjects);
    } catch (error) {
      grid.innerHTML = '<p class="text-muted text-center" style="grid-column:1/-1;">Could not load projects.</p>';
    }

    tabsContainer.addEventListener("click", function (event) {
      var tab = event.target.closest(".filter-tab");
      if (!tab) return;

      activeCategory = tab.dataset.category;
      tabsContainer.querySelectorAll(".filter-tab").forEach(function (button) {
        button.classList.remove("active");
      });
      tab.classList.add("active");

      var filtered = activeCategory === "All"
        ? allProjects
        : allProjects.filter(function (project) { return project.category === activeCategory; });

      renderProjects(filtered);
    });
  }

  function renderProjects(projects) {
    var grid = document.getElementById("projectsGrid");
    if (!grid) return;

    if (!projects.length) {
      grid.innerHTML = '<p class="text-muted text-center" style="grid-column:1/-1;">No projects in this category yet. More coming soon.</p>';
      return;
    }

    grid.innerHTML = projects.map(function (project) {
      var image = project.thumbnail || ("assets/images/projects/placeholders/" + project.id + "-placeholder.svg");
      var date = new Date(project.date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
      var tags = (project.tags || []).slice(0, 4).map(function (tag) {
        return '<span class="pill">' + tag + "</span>";
      }).join("");

      return '<a class="project-card" href="' + project.link + '">' +
        '<div class="project-media"><img src="' + image + '" alt="' + project.title + '" loading="lazy" /></div>' +
        '<div class="project-meta"><span class="badge">' + project.category + '</span><span class="text-xs text-soft">' + date + "</span></div>" +
        "<h3>" + project.title + "</h3>" +
        '<p class="text-muted">' + project.excerpt + "</p>" +
        '<div class="project-tags">' + tags + "</div>" +
        '<span class="project-link">Open Case Study</span>' +
      "</a>";
    }).join("");

    grid.classList.remove("visible");
    requestAnimationFrame(function () {
      grid.classList.add("visible");
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
