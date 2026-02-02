## Repo snapshot

- Type: Static personal site (plain HTML/CSS/JS) with a tiny Node proxy and a couple of helper scripts.
- Key areas:
  - `blog/` — static blog posts (one folder per post) and `blog/posts.json` which drives the blog index.
  - `assets/` — images, CSS, vendor libs and client JS (`assets/js`, `assets/css`, `assets/vendor`).
  - `server.js` (root) — small Express proxy used to fetch Medium RSS feeds.
  - `medium-proxy/package.json` — lists Express and Axios as dependencies (note: `server.js` is in repo root).
  - `books.py` and `books.json` — Python scraper that generates book data used by the site.

## Big-picture architecture & why

- This is a static site meant to be served from GitHub Pages (no build step). Content is plain HTML, images and small client-side JS.
- The blog listing is driven by `blog/posts.json`. Blog post content is stored as static HTML under `blog/<slug>/index.html` (example: `blog/solution-stopped-being-the-point/index.html`).
- `server.js` is a convenience Node proxy to fetch Medium feeds. It is not required to serve the static site, but used by pages that proxy Medium. Dependencies for the proxy are listed in `medium-proxy/package.json`.
- `books.py` scrapes Goodreads and writes `books.json`; this is an auxiliary data-generation script, not part of the production server.

## When editing content vs code

- Content edits (posts, images, static pages):
  - Add a new blog post by creating `blog/<slug>/index.html` and adding a corresponding entry in `blog/posts.json` (include `slug`, `title`, `date`, optionally `readingTime`, `length`, `featured`, or `external:true` with `url`).
  - Place images under `assets/img/` (or a subfolder) and reference them with the same relative paths used elsewhere.
- Code edits (JS/CSS/scripts):
  - Client JS is in `assets/js/main.js` (global behaviors) and individual page scripts may be inline.
  - Vendor libraries live in `assets/vendor/` — avoid editing those files unless updating a library intentionally.

## Running & debugging locally

- Serve the static site:
  - Quick: from repo root run a static file server (example) `python -m http.server 8000` then open `http://localhost:8000/`.
  - This mirrors GitHub Pages behavior (no build step required).
- Medium proxy (optional):
  - To run the Express proxy used for Medium feeds: install dependencies then run the server.
    - From repo root: `npm install express axios` then `node server.js` — the proxy listens on port 3000 by default.
  - Note: there is a `medium-proxy/package.json` listing dependencies; the actual `server.js` file is in the repo root. If you prefer, add a root `package.json` or install dependencies at the repo root.

## Patterns and conventions agents should follow

- Posts are static HTML; there is no templating engine. Keep markup consistent with existing posts (`blog/_templates/` contains sample layouts like `long-form.html`, `standard.html`). Copy structure from those templates when adding posts.
- `blog/posts.json` is the single source for the blog index. Update it for both internal and external posts (`external: true` with `url` is used for links to Medium).
- Use relative URLs across the site (site is served from the repo root). Example: image in `blog/solution-stopped-being-the-point` uses `images/Figure 3.jpg` relative to the post folder.

## Integration points & things to watch

- `server.js` (root) + `medium-proxy/package.json`: inconsistency — dependencies live in `medium-proxy` but server file is at repo root. Be conservative: don’t move files unless necessary; prefer installing deps at root for local testing.
- `books.py` writes `books.json`; if you update the scraper, re-run the script and commit the generated `books.json` if intended.

## Examples

- Add a new post:
  1. Create `blog/my-new-post/index.html` (copy `blog/_templates/standard.html` structure).
  2. Add entry in `blog/posts.json`: { "slug": "my-new-post", "title": "My New Post", "date": "2026-01-30", "readingTime": 3 }

- Run medium proxy locally:
  - `npm install express axios` (root) && `node server.js` (then request `http://localhost:3000/medium/<username>`).

## Keep PRs small

- This repo is content-heavy and lightly automated. Prefer tiny, focused PRs: content updates in one PR, CSS/JS changes in another.

If anything in these notes is unclear or you'd like examples expanded (e.g., a sample `package.json` at repo root or a script to preview the site + proxy together), tell me which area to expand and I’ll update this file.
