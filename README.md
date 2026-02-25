# Gowtham M. - Portfolio

Python AI & Automation Specialist. Live at [promepy.github.io](https://promepy.github.io).

## Stack

- **HTML / CSS / JS** - No frameworks, no build step
- **Dark-mode-first** design with light toggle
- **JSON-driven** projects, blog, and YouTube data (`data/`)
- **Plausible** analytics (privacy-friendly)
- **GitHub Pages** hosting

## Structure

```
├── index.html              # Landing page
├── projects.html           # Project listings (filtered from JSON)
├── projects/               # Individual case study pages
├── services.html           # Service offerings
├── contact.html            # Contact form
├── blog/                   # Blog listing + posts
├── youtube.html            # YouTube corner
├── community.html          # Community links
├── about.html              # About & expertise
├── testimonials.html       # Client testimonials
├── data/                   # JSON data (projects, blogs, youtube)
├── templates/              # Reusable page templates
├── assets/css/main.css     # Design system
├── assets/js/              # Shared components (nav, footer, theme)
├── GlassBreak/             # Standalone sub-app
├── Quotes/                 # Standalone sub-app
├── sitemap.xml
└── robots.txt
```

## Adding Content

- **New project** → Copy `templates/project-page-template.html`, edit, add entry to `data/projects.json`
- **New blog post** → Copy `templates/blog-post-template.html`, edit, add entry to `data/blogs.json`
- **New YouTube video** → Add entry to `data/youtube.json`

## Local Dev

```bash
python3 -m http.server 8080
```
