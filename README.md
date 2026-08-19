# Gowtham M. - Portfolio Website

Live site: [https://promepy.github.io](https://promepy.github.io)

## Purpose

High-conversion portfolio and client acquisition website for:

- High-performance web development
- Business automation systems
- Custom AI / LLM integrations

## Stack

- Static HTML, CSS, and JavaScript
- Fixed Tech/SaaS design system (no runtime theme customization)
- JSON-driven content for projects/blog/youtube
- Plausible analytics
- GitHub Pages hosting

## Structure

- `index.html` - Primary conversion page
- `services.html` - Service details
- `projects.html` - Project listing (JSON-driven)
- `projects/` - Individual case study pages (with placeholder visuals)
- `about.html` - Brand mission + technical profile
- `contact.html` - Primary inquiry and booking page
- `blog/index.html` - Blog listing (JSON-driven)
- `youtube.html` - YouTube listing (JSON-driven)
- `community.html` - Community/resources page
- `testimonials.html` - Social proof page
- `terms.html` - Terms
- `privacy.html` - Privacy policy
- `data/` - projects.json, blogs.json, youtube.json
- `templates/` - Project/blog page templates
- `assets/css/main.css` - Fixed global design system
- `assets/js/nav.js` - Shared nav injection
- `assets/js/footer.js` - Shared footer injection
- `assets/js/main.js` - Animations + analytics binding
- `assets/js/projects.js` - Projects page filter + render
- `assets/images/projects/placeholders/` - Replaceable project placeholder visuals

## Notes

- `data/projects.json`, `data/blogs.json`, and `data/youtube.json` schemas are unchanged.
- All "Book a Free Discovery Call" actions route to `contact.html`.
- Contact email is `Gowtham.Muraharirao@outlook.com`.

## Local Development

```bash
python3 -m http.server 8080
```
