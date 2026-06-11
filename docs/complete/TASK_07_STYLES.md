# TASK 07 — Global Styles & Theme

**Phase:** 2 (parallel with TASK_02, TASK_03, TASK_08)
**Depends on:** TASK_01_SCAFFOLD complete
**Blocks:** nothing (but other tasks reference these variables — do this early)

---

## Goal

Define the global CSS reset, base styles, and CSS custom properties (variables) that all components reference. This task produces the design token layer that gives the site its minimal gallery aesthetic — white background, black text, clean serif display, generous whitespace.

---

## Full project context

See `docs/PROJECT_SPEC.md` for the complete spec.

**Design principles:**
- White background (`#ffffff`), black text (`#000000`)
- Simple and classic — no gradients, shadows, or decorative elements
- Serif font for display/headings; system sans-serif for nav and body text
- Art gallery whitespace — breathe, don't crowd
- Responsive — works on mobile without horizontal scroll

---

## File: `src/styles/variables.css`

Define all CSS custom properties on `:root`. Every component that needs a design token uses `var(--name)` rather than a hardcoded value.

```css
:root {
  /* Colors */
  --color-bg: #ffffff;
  --color-text: #000000;
  --color-subtle: #6b6b6b;
  --color-overlay: rgba(255, 255, 255, 0.95);

  /* Typography */
  --font-serif: 'Georgia', 'Times New Roman', Times, serif;
  --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-base: 16px;
  --line-height-base: 1.6;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;
  --spacing-xl: 64px;

  /* Layout */
  --max-width: 900px;
  --header-padding-v: var(--spacing-lg);
  --content-padding-v: var(--spacing-xl);
}
```

---

## File: `src/styles/global.css`

This file is imported in `src/App.jsx`. It imports `variables.css` first, then defines global resets and base styles.

```css
@import './variables.css';

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: var(--font-size-base);
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: var(--line-height-base);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

ul {
  list-style: none;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-serif);
  font-weight: normal;
  line-height: 1.3;
}

button {
  cursor: pointer;
  background: none;
  border: none;
  font: inherit;
  color: inherit;
}
```

**Notes:**
- `h1–h6` use serif by default with `font-weight: normal` — this is intentional. Gallery headings are elegant, not heavy.
- The `button` reset is important — modal close button and other interactive elements inherit this baseline.
- No `max-width` or centering on `body` — that's handled per-component (Layout sets the max-width container).

---

## Acceptance Criteria

- `src/styles/variables.css` exports all variables listed above on `:root`
- `src/styles/global.css` imports `variables.css` and applies the reset + base styles
- The site renders with a white background and black text immediately after TASK_01 + this task
- No default browser margins on the body/headings
- Images in the CSS reset have `display: block` and `max-width: 100%`
- All variable names match exactly what other task files reference: `--font-serif`, `--font-sans`, `--color-bg`, `--color-text`, `--color-subtle`, `--spacing-xs/sm/md/lg/xl`, `--max-width`

---

## Files modified by this task

- `src/styles/variables.css` (replace empty file)
- `src/styles/global.css` (replace empty file)
