# TASK 01 — Project Scaffold

**Phase:** 1 (must complete before all other tasks)
**Depends on:** nothing
**Blocks:** all other tasks

---

## Goal

Initialize the Vite + React project with all dependencies, folder structure, and config files. Produce a working skeleton that other agents can build on top of — no placeholder content, no lorem ipsum, just the bare structural foundation.

---

## Full project context

See `docs/PROJECT_SPEC.md` for the complete spec. Key points:
- Static site, no backend
- Hosted on GitHub Pages via GitHub Actions
- React Router HashRouter for routing (required for GitHub Pages)
- Plain CSS, no CSS-in-JS or UI component libraries
- Content system: layperson edits files in `public/content/`, build script generates manifest

---

## Steps

### 1. Initialize Vite + React project

In `/Users/key/Documents/phil-gallery/` (the working directory — do NOT create a subfolder):

```bash
npm create vite@latest . -- --template react
```

Accept overwriting if prompted. Then:

```bash
npm install
npm install react-router-dom
```

No other runtime dependencies. No Tailwind, no styled-components, no UI kits.

### 2. Clean up Vite defaults

Remove all boilerplate content Vite generates:
- Delete `src/App.css`
- Delete `src/assets/react.svg`
- Delete `public/vite.svg`
- Clear `src/App.jsx` down to a minimal shell (see content below)
- Clear `src/index.css` — global styles will live in `src/styles/global.css` (created by TASK_07_STYLES)

### 3. Create the full folder structure

Create the following empty directories and placeholder files:

```
public/
  content/
    paintings/
      .gitkeep
    sculptures/
      .gitkeep
    sketches/
      .gitkeep
    about/
      .gitkeep
    contact/
      .gitkeep

scripts/
  build-manifest.js     ← empty for now, populated by TASK_02

src/
  components/
    Layout/
      Layout.jsx        ← empty for now, populated by TASK_03
      Layout.module.css
    Nav/
      Nav.jsx           ← empty for now, populated by TASK_03
      Nav.module.css
    GalleryGrid/
      GalleryGrid.jsx   ← empty for now, populated by TASK_04
      GalleryGrid.module.css
    ArtworkModal/
      ArtworkModal.jsx  ← empty for now, populated by TASK_04
      ArtworkModal.module.css
    SoldBadge/
      SoldBadge.jsx     ← empty for now, populated by TASK_04
      SoldBadge.module.css
  generated/
    manifest.json       ← minimal valid JSON for now (see below)
  pages/
    PaintingsPage.jsx   ← stub for now, populated by TASK_04
    SculpturesPage.jsx  ← stub for now, populated by TASK_04
    SketchesPage.jsx    ← stub for now, populated by TASK_04
    AboutPage.jsx       ← stub for now, populated by TASK_05
    ContactPage.jsx     ← stub for now, populated by TASK_06
  styles/
    global.css          ← empty for now, populated by TASK_07
    variables.css       ← empty for now, populated by TASK_07
  utils/
    content.js          ← empty for now, populated by TASK_02
  App.jsx
  main.jsx
```

### 4. Write `src/generated/manifest.json` (initial stub)

```json
{
  "paintings": [],
  "sculptures": [],
  "sketches": [],
  "about": null
}
```

### 5. Write `src/App.jsx`

```jsx
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import PaintingsPage from './pages/PaintingsPage'
import SculpturesPage from './pages/SculpturesPage'
import SketchesPage from './pages/SketchesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import './styles/global.css'

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/paintings" replace />} />
          <Route path="/paintings" element={<PaintingsPage />} />
          <Route path="/sculptures" element={<SculpturesPage />} />
          <Route path="/sketches" element={<SketchesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}
```

### 6. Write `src/main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### 7. Write stub page files

Each page stub should export a minimal functional component so the app compiles:

```jsx
// Example stub — use appropriate name for each page
export default function PaintingsPage() {
  return <main />
}
```

Apply the same pattern for `SculpturesPage`, `SketchesPage`, `AboutPage`, `ContactPage`.

### 8. Write stub component files

Each component stub should export a minimal component that accepts and renders `children` where appropriate:

```jsx
// Layout stub
export default function Layout({ children }) {
  return <div>{children}</div>
}
```

```jsx
// Nav stub
export default function Nav() {
  return <nav />
}
```

```jsx
// GalleryGrid stub
export default function GalleryGrid() {
  return <div />
}
```

```jsx
// ArtworkModal stub
export default function ArtworkModal() {
  return null
}
```

```jsx
// SoldBadge stub
export default function SoldBadge() {
  return null
}
```

### 9. Write `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
})
```

Note: `base` will be updated to the GitHub repo name (e.g. `/phil-gallery/`) when deploying to GitHub Pages under a project URL. If deploying to a custom root domain, `base: '/'` is correct.

### 10. Update `package.json` build script

Add a `prebuild` script so the manifest generator runs automatically before every build:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "prebuild": "node scripts/build-manifest.js",
    "preview": "vite preview"
  }
}
```

(The `prebuild` script is populated by TASK_02 — just add the entry now.)

### 11. Update `index.html`

Set a proper title and description:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Art gallery — paintings, sculptures, and sketches" />
    <title>Phil Gallery</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## Acceptance Criteria

- `npm install` completes without errors
- `npm run dev` starts the dev server and serves the app without compile errors
- The app renders without crashing (blank pages are fine — stubs just return empty elements)
- `/#/` redirects to `/#/paintings` in the browser
- All folder structure exists as specified above
- No Vite boilerplate files remain (`App.css`, `react.svg`, `vite.svg`)
- `package.json` includes `react-router-dom` as a dependency and has the `prebuild` script entry

---

## Files created by this task

- `index.html`
- `vite.config.js`
- `package.json` (modified)
- `src/App.jsx`
- `src/main.jsx`
- `src/generated/manifest.json`
- `src/styles/global.css` (empty)
- `src/styles/variables.css` (empty)
- `src/utils/content.js` (empty)
- `scripts/build-manifest.js` (empty)
- All stub components and pages listed above
- All `.gitkeep` files in `public/content/` subdirectories
