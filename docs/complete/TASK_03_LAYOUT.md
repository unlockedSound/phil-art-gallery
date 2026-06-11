# TASK 03 — App Layout & Navigation

**Phase:** 2 (parallel with TASK_02, TASK_07, TASK_08)
**Depends on:** TASK_01_SCAFFOLD complete
**Blocks:** TASK_04_GALLERY_PAGES, TASK_05_ABOUT, TASK_06_CONTACT

---

## Goal

Build the `Layout` and `Nav` components that wrap all pages. Every page on the site shares this shell. The layout should look and feel like a minimal art gallery — the artwork is the focus, the chrome recedes.

---

## Full project context

See `docs/PROJECT_SPEC.md` for the complete spec.

**Pages and routes:**
- `/#/paintings` (default)
- `/#/sculptures`
- `/#/sketches`
- `/#/about`
- `/#/contact`

**Design principles:**
- White background (`#ffffff`), black text (`#000000`)
- Simple, classic — no decorative elements
- Navigation is horizontal at top of page
- Active page indicated by subtle underline (not bold, not color change)
- Artwork content fills the page below the nav
- Mobile-responsive: nav collapses gracefully on narrow screens

**Reference style:** https://www.pemakongpo.com/ — study the overall page structure, header proportions, nav positioning, and whitespace usage.

---

## Component: `Layout`

**File:** `src/components/Layout/Layout.jsx`
**CSS:** `src/components/Layout/Layout.module.css`

The Layout component is a full-page shell. It renders the Nav at the top and the page content below.

### Props
- `children` — the current page component

### Structure

```
<div class="layout">
  <header class="header">
    <div class="siteTitle">
      [artist name — see note below]
    </div>
    <Nav />
  </header>
  <main class="content">
    {children}
  </main>
</div>
```

**Site title note:** Hardcode the artist name as "Phil" for now. This is display text in the header. Use a clean serif font, larger than the nav links. It should link to `/#/paintings` (the home page).

### CSS guidance

- `layout`: full min-height page, flex column
- `header`: horizontal, centered or left-aligned with generous padding. Keep it airy — this is gallery space, not a product nav bar. Max width should be consistent with content area. Suggest: `max-width: 900px`, centered with `margin: 0 auto`.
- `siteTitle`: prominent but not overwhelming. Suggest serif, ~2rem
- `content`: the page content area. Same max-width and margin as header for alignment.
- Use CSS variables from `src/styles/variables.css` for spacing and typography (those variables are defined by TASK_07_STYLES; use them here by name — `var(--font-serif)`, `var(--spacing-lg)`, etc.)

**Variable names to expect from TASK_07:**
```css
--font-serif        /* display serif font stack */
--font-sans         /* body/nav font stack */
--color-bg          /* #ffffff */
--color-text        /* #000000 */
--color-subtle      /* light gray for secondary text */
--spacing-xs        /* 4px */
--spacing-sm        /* 8px */
--spacing-md        /* 16px */
--spacing-lg        /* 32px */
--spacing-xl        /* 64px */
--max-width         /* 900px */
```

If TASK_07 is not yet done when you run, define these variables locally in `Layout.module.css` as fallbacks so the component still compiles.

---

## Component: `Nav`

**File:** `src/components/Nav/Nav.jsx`
**CSS:** `src/components/Nav/Nav.module.css`

### Behavior

- Renders five nav links: Paintings, Sculptures, Sketches, About, Contact
- Uses React Router's `NavLink` for active state detection
- The active link gets an underline style (use the `isActive` prop from `NavLink`'s className function)
- No bold, no color change — just underline for active

### Structure

```jsx
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/paintings', label: 'Paintings' },
  { to: '/sculptures', label: 'Sculptures' },
  { to: '/sketches', label: 'Sketches' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <nav className={styles.nav}>
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
```

### CSS guidance

- Links are displayed inline (flex row), spaced evenly with a small gap
- Font: sans-serif (use `var(--font-sans)`), uppercase tracking is appropriate for a gallery look — try `letter-spacing: 0.08em`, `font-size: 0.8rem`
- No underline by default (`text-decoration: none`)
- Active: `text-decoration: underline`
- Hover: `text-decoration: underline` (same as active, or a lighter opacity)
- Color: `var(--color-text)` — pure black, always
- On mobile (narrow screens, e.g. `< 600px`): stack links vertically, or reduce font size — whichever looks cleaner

---

## Acceptance Criteria

- The app renders a visible header with the artist name and five navigation links on every page
- Navigating to `/#/paintings` underlines the "Paintings" link; navigating to `/#/about` underlines "About", etc.
- The `/#/` route (handled in App.jsx) redirects to `/#/paintings`, so "Paintings" is underlined on load
- Layout is visually clean: white background, black text, ample whitespace
- Content area and header are horizontally aligned (same max-width, same left/right margins)
- No console errors or React warnings
- Page renders correctly at mobile widths (320px–480px)

---

## Files modified by this task

- `src/components/Layout/Layout.jsx` (replace stub)
- `src/components/Layout/Layout.module.css` (replace empty file)
- `src/components/Nav/Nav.jsx` (replace stub)
- `src/components/Nav/Nav.module.css` (replace empty file)
