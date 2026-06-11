# TASK 08 — GitHub Actions Deployment

**Phase:** 2 (parallel with TASK_02, TASK_03, TASK_07)
**Depends on:** TASK_01_SCAFFOLD complete
**Blocks:** nothing

---

## Goal

Set up GitHub Actions to automatically build and deploy the site to GitHub Pages on every push to `main`. After this task, the workflow for the site admin to publish new content is:

1. Add/remove/edit files in `public/content/`
2. Commit and push to `main`
3. GitHub Actions automatically rebuilds and redeploys — no manual steps

---

## Full project context

See `docs/PROJECT_SPEC.md` for the complete spec.

**Build process:**
- `npm run build` triggers `prebuild` (which runs `node scripts/build-manifest.js`) then `vite build`
- Output goes to `dist/`
- The site uses `HashRouter`, so there is no need for a custom 404 page redirect trick

---

## File: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Notes on this workflow

- `workflow_dispatch` allows manually triggering a deploy from the GitHub Actions UI — useful for testing
- `concurrency: cancel-in-progress: true` prevents two deploys running simultaneously if commits come in quickly
- Uses the official GitHub Pages deployment actions (`upload-pages-artifact` + `deploy-pages`) — no `gh-pages` branch needed, this is the modern approach

---

## File: `.gitignore`

Ensure these are in `.gitignore` (Vite likely creates this, but verify and supplement):

```
node_modules/
dist/
.DS_Store
*.local
src/generated/manifest.json
```

**Important:** `src/generated/manifest.json` is in `.gitignore` because it is generated at build time. It should not be committed to the repository. The GitHub Actions workflow regenerates it on every build.

**However:** The initial stub `manifest.json` (with empty arrays) must exist in the repo for the TypeScript/Vite import to resolve during development before a build has been run. Handle this by either:
- Keeping `src/generated/manifest.json` tracked (remove from gitignore) — simplest approach, acceptable for this project
- Or adding a `postinstall` script that runs `node scripts/build-manifest.js` so the manifest is always present after `npm install`

**Recommendation:** Keep `src/generated/manifest.json` tracked in git (do not add it to `.gitignore`). The file is small, generated, but safe to commit — it's just JSON. Remove the gitignore entry for it.

---

## GitHub Pages configuration (manual step — document for the site owner)

After the workflow runs for the first time, the site owner must enable GitHub Pages in the repository settings:

1. Go to the repository on GitHub
2. Settings → Pages
3. Source: select "GitHub Actions"
4. Save

This only needs to be done once. After that, every push to `main` auto-deploys.

**Custom domain:** If a custom domain is used, the owner should:
1. Add a `CNAME` file to the `public/` directory containing just the domain name (e.g., `philartist.com`)
2. Configure their DNS to point to GitHub Pages (follow GitHub's documentation)
3. In GitHub Pages settings, enter the custom domain

The `CNAME` file in `public/` will be included in the `dist/` build output automatically by Vite.

---

## `vite.config.js` note on `base`

**Repository:** https://github.com/unlockedSound/phil-art-gallery.git

Without a custom domain, the site will be served at `https://unlockedsound.github.io/phil-art-gallery/` — a project page URL. In that case `vite.config.js` must be:
```js
base: '/phil-art-gallery/'
```

If a custom domain is configured (recommended for a portfolio site), use:
```js
base: '/'
```

**Update TASK_01's `vite.config.js` accordingly** depending on whether a custom domain is in use at deploy time. The scaffold task defaults to `base: '/'` — change it to `'/phil-art-gallery/'` if deploying without a custom domain.

---

## Acceptance Criteria

- `.github/workflows/deploy.yml` exists with the content above
- The workflow uses the official GitHub Pages deployment actions (v3/v4)
- `workflow_dispatch` trigger is present
- The build step runs `npm run build` (which includes the manifest generation `prebuild`)
- `node_modules/` and `dist/` are in `.gitignore`
- `src/generated/manifest.json` is tracked in git (not gitignored)

---

## Files created by this task

- `.github/workflows/deploy.yml` (new file — create the directory if it doesn't exist)
- `.gitignore` (modify to ensure correct entries; do not remove Vite's defaults)
