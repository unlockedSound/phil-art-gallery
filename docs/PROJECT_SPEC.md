# Project Spec: Phil Gallery

## Overview

A personal art gallery website for a visual artist. Static site hosted on GitHub Pages with a custom domain. Designed to be fully maintainable by a layperson with no coding knowledge — content is managed entirely by adding or removing files in specific folders.

Design inspiration: https://www.pemakongpo.com/ — clean, minimal, gallery-style. White background, black text, typography-forward, artwork-first.

**Repository:** https://github.com/unlockedSound/phil-art-gallery.git

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Frontend | React + Vite | Fast builds, great static output, simple |
| Routing | React Router v6 (HashRouter) | Required for GitHub Pages (no server routing) |
| Styling | Plain CSS (CSS Modules per component) | Matches minimal aesthetic, zero overhead |
| Content | File-based + build-time manifest | Layperson edits files; manifest auto-generated at build |
| Hosting | GitHub Pages | Free, simple, custom domain support |
| CI/CD | GitHub Actions | Auto-rebuild and deploy on push to `main` |

**No backend. No database. No CMS. No authentication.**

> **Deployment note for agents:** The GitHub repo name is `phil-art-gallery` (not `phil-gallery`). Without a custom domain the site is served at `https://unlockedsound.github.io/phil-art-gallery/`, which requires `base: '/phil-art-gallery/'` in `vite.config.js`. With a custom domain, `base: '/'` is correct. TASK_01 scaffolds `base: '/'`; TASK_08 says to update it — make sure the right value is set before the first deploy.

---

## Pages

| Route | Page | Default |
|---|---|---|
| `/#/` | Redirects to `/#/paintings` | Yes |
| `/#/paintings` | Paintings gallery | — |
| `/#/sculptures` | Sculptures gallery | — |
| `/#/sketches` | Sketches gallery | — |
| `/#/about` | About the artist | — |
| `/#/contact` | Contact & links | — |

The `#` prefix is required by HashRouter for GitHub Pages compatibility.

---

## Repository Structure

```
phil-gallery/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← Auto-build + deploy to GitHub Pages
├── docs/                       ← Agent task files (not shipped to production)
├── public/
│   └── content/                ← ALL editable content lives here
│       ├── paintings/
│       │   └── [set-name]/
│       │       ├── [image files]
│       │       └── info.txt
│       ├── sculptures/
│       │   └── [set-name]/
│       │       ├── [image files]
│       │       └── info.txt
│       ├── sketches/
│       │   └── [set-name]/
│       │       ├── [image files]
│       │       └── info.txt
│       ├── about/
│       │   ├── [photo file]
│       │   └── bio.txt
│       └── contact/
│           └── contact.txt
├── scripts/
│   └── build-manifest.js       ← Scans public/content/, writes src/generated/manifest.json
├── src/
│   ├── generated/
│   │   └── manifest.json       ← Auto-generated, do not edit manually
│   ├── components/
│   │   ├── Layout/
│   │   ├── Nav/
│   │   ├── GalleryGrid/
│   │   ├── ArtworkModal/
│   │   └── SoldBadge/
│   ├── pages/
│   │   ├── PaintingsPage.jsx
│   │   ├── SculpturesPage.jsx
│   │   ├── SketchesPage.jsx
│   │   ├── AboutPage.jsx
│   │   └── ContactPage.jsx
│   ├── utils/
│   │   └── content.js          ← Helpers for reading manifest data
│   ├── styles/
│   │   ├── global.css
│   │   └── variables.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## Content Management (for the admin)

The site admin manages all content by adding or removing files inside `public/content/`. No code changes are ever needed.

### Gallery pages (paintings, sculptures, sketches)

Each page has its own folder under `public/content/`. Inside that folder, each **set of works** gets its own sub-folder. The sub-folder name is used internally (it should be URL-safe: lowercase, hyphens instead of spaces).

Each set folder must contain:
- One or more image files (`.jpg`, `.jpeg`, `.png`, `.webp` — any mix)
- One `info.txt` file

**`info.txt` format:**
```
Title: Sunset Over the Hills
Medium: Oil on canvas
Size: 24" x 36"
Year: 2023
Sold: Yes
```

- All fields are optional except `Title`.
- If `Sold: Yes` (case-insensitive), the site displays a "Sold" indicator. Any other value (or omitting the field) shows nothing.
- Field order does not matter.
- Extra whitespace around `:` is ignored.

**Example folder structure:**
```
public/content/paintings/
  sunset-series/
    sunset-1.jpg
    sunset-2.jpg
    info.txt
  mountain-views/
    mountain-large.jpg
    info.txt
```

### About page

```
public/content/about/
  photo.jpg          ← Any image file; first image file found is used
  bio.txt
```

**`bio.txt` format:**
```
Name: Jane Artist
Bio: Jane has been painting for over twenty years...
     Paragraphs can span multiple lines.
     Blank lines between paragraphs are preserved.
```

### Contact page

```
public/content/contact/
  contact.txt
```

**`contact.txt` format:**
```
Email: phil@example.com
Instagram: https://instagram.com/philartist
Website: https://philartist.com
```

- Each line is `Label: value`
- If the value contains `@` and does not start with `http`, it is treated as an email address and gets a `mailto:` prefix automatically
- Otherwise the value is used as-is as a URL
- Lines appear on the contact page in the order they appear in the file
- The label is displayed as the link text (e.g., "Instagram", not the raw URL)
- Add or remove lines freely to add or remove contact links

---

## Content Manifest

The script `scripts/build-manifest.js` runs automatically as part of `npm run build`. It:

1. Scans `public/content/` recursively
2. Parses every `info.txt` it finds
3. Collects all image filenames per set
4. Writes the result to `src/generated/manifest.json`

The manifest shape:

```json
{
  "paintings": [
    {
      "id": "sunset-series",
      "title": "Sunset Over the Hills",
      "medium": "Oil on canvas",
      "size": "24\" x 36\"",
      "year": "2023",
      "sold": true,
      "images": ["/content/paintings/sunset-series/sunset-1.jpg", "/content/paintings/sunset-series/sunset-2.jpg"],
      "coverImage": "/content/paintings/sunset-series/sunset-1.jpg"
    }
  ],
  "sculptures": [],
  "sketches": [],
  "about": {
    "photo": "/content/about/photo.jpg",
    "name": "Jane Artist",
    "bio": "Jane has been painting..."
  },
  "contact": [
    { "label": "Email", "href": "mailto:phil@example.com" },
    { "label": "Instagram", "href": "https://instagram.com/philartist" }
  ]
}
```

Image paths are root-relative so the React app can use them directly as `src` attributes.

---

## Design Principles

- **White background (`#ffffff`), black text (`#000000`)**
- Minimal, classic typography — a clean serif for display text, system sans-serif for body/nav
- No gradients, shadows, or decorative elements
- Artwork images are the focal point — UI should recede
- Navigation is horizontal at the top; current page is indicated by underline or similar subtle treatment
- Gallery view: clean grid, images aligned, consistent spacing
- Clicking an artwork opens a modal/lightbox with larger image + metadata
- "Sold" indicator is small, subtle — text label, not a badge or stamp
- Mobile-responsive: single-column stack on narrow screens

---

## Parallel Build Phases

### Phase 1 — Sequential (must complete before anything else)
- **TASK_01_SCAFFOLD**: Project init, dependencies, folder structure, vite config

### Phase 2 — Parallel (can all run after Phase 1)
- **TASK_02_CONTENT_SYSTEM**: Manifest generator script + content utils
- **TASK_03_LAYOUT**: App shell, Nav, routing, Layout component
- **TASK_07_STYLES**: Global CSS variables and base styles
- **TASK_08_DEPLOY**: GitHub Actions workflow, Pages config

### Phase 3 — Parallel (can all run after Phase 2)
- **TASK_04_GALLERY_PAGES**: GalleryGrid, ArtworkModal, SoldBadge, gallery pages (paintings/sculptures/sketches)
- **TASK_05_ABOUT**: About page component
- **TASK_06_CONTACT**: Contact page component
