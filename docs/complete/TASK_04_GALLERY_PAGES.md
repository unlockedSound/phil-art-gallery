# TASK 04 — Gallery Pages (Paintings, Sculptures, Sketches)

**Phase:** 3 (parallel with TASK_05, TASK_06)
**Depends on:** TASK_01_SCAFFOLD, TASK_02_CONTENT_SYSTEM, TASK_03_LAYOUT complete
**Blocks:** nothing

---

## Goal

Build the reusable gallery components and the three gallery pages (Paintings, Sculptures, Sketches). All three pages share the same visual layout — they are just pointed at different sections of the manifest. The gallery displays a grid of artwork covers, and clicking one opens a detail modal.

---

## Full project context

See `docs/PROJECT_SPEC.md` for the complete spec.

**Manifest data shape (from TASK_02):**
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
      "images": ["/content/paintings/sunset-series/sunset-1.jpg"],
      "coverImage": "/content/paintings/sunset-series/sunset-1.jpg"
    }
  ]
}
```

**Content utility (from TASK_02):**
```js
import { getSection } from '../utils/content'
const artworks = getSection('paintings') // array of artwork objects
```

**CSS variables (from TASK_07):**
```
--font-serif, --font-sans
--color-bg, --color-text, --color-subtle
--spacing-xs, --spacing-sm, --spacing-md, --spacing-lg, --spacing-xl
--max-width
```

---

## Component: `GalleryGrid`

**File:** `src/components/GalleryGrid/GalleryGrid.jsx`
**CSS:** `src/components/GalleryGrid/GalleryGrid.module.css`

### Props
- `artworks` — array of artwork objects from the manifest
- `onSelect` — callback `(artwork) => void` called when an artwork is clicked

### Behavior

- Renders a CSS grid of artwork cards
- Each card shows: the cover image, the title below, and a "Sold" badge if `artwork.sold === true`
- Clicking a card calls `onSelect(artwork)`
- If `artworks` is empty, show a simple centered message: "No works to display."
- Images should be displayed at a consistent aspect ratio — do not stretch or squish. Use `object-fit: cover` or `object-fit: contain`. For an art gallery, `contain` is preferred (show the whole work, no cropping), but use a consistent container size.

### Grid layout

- CSS Grid, 3 columns on desktop, 2 on tablet (< 768px), 1 on mobile (< 480px)
- Even column gaps
- Cards are not bordered — image sits on white background directly
- Vertical rhythm: title appears directly below the image, no extra card padding

### Card structure

```jsx
<div className={styles.card} onClick={() => onSelect(artwork)}>
  <div className={styles.imageWrapper}>
    <img src={artwork.coverImage} alt={artwork.title} className={styles.image} />
    {artwork.sold && <SoldBadge />}
  </div>
  <p className={styles.title}>{artwork.title}</p>
</div>
```

### CSS guidance

- Card: no border, no shadow, no background — just image + text floating on white
- `imageWrapper`: `position: relative` (for SoldBadge positioning), consistent height or aspect ratio
- Image: `width: 100%`, `object-fit: contain`, `display: block`
- Title: `font-family: var(--font-sans)`, small, `font-size: 0.8rem`, upper or mixed case, centered or left-aligned
- Cursor: `pointer` on card hover
- Subtle hover effect: slight opacity reduction (`opacity: 0.85`) or nothing — keep it minimal

---

## Component: `ArtworkModal`

**File:** `src/components/ArtworkModal/ArtworkModal.jsx`
**CSS:** `src/components/ArtworkModal/ArtworkModal.module.css`

The modal opens when an artwork is clicked in the gallery grid. It shows the full work (or all images if there are multiple), with metadata below.

### Props
- `artwork` — the selected artwork object, or `null` if closed
- `onClose` — callback `() => void`

### Behavior

- If `artwork` is `null`, renders nothing (`return null`)
- Renders a full-screen overlay with a centered content panel
- Clicking the overlay background calls `onClose`
- Pressing Escape calls `onClose` (add a `keydown` event listener in a `useEffect`, clean up on unmount or when modal closes)
- If the artwork has multiple images, show them stacked vertically (one per row, full width of the modal content area)
- If only one image, show it centered

### Structure

```
<div class="overlay" onClick={handleOverlayClick}>
  <div class="panel" onClick={stopPropagation}>
    <button class="closeButton" onClick={onClose}>✕</button>
    <div class="images">
      {artwork.images.map(src => <img key={src} src={src} alt={artwork.title} />)}
    </div>
    <div class="metadata">
      <h2 class="title">{artwork.title}</h2>
      {artwork.medium && <p class="meta">{artwork.medium}</p>}
      {artwork.size && <p class="meta">{artwork.size}</p>}
      {artwork.year && <p class="meta">{artwork.year}</p>}
      {artwork.sold && <p class="sold">Sold</p>}
    </div>
  </div>
</div>
```

### CSS guidance

- Overlay: `position: fixed`, full viewport, `background: rgba(255,255,255,0.95)`, high `z-index`
- Panel: centered vertically and horizontally, `max-width: 700px`, scrollable if content is tall (`overflow-y: auto`, `max-height: 90vh`)
- Images: `max-width: 100%`, `height: auto`, `display: block`
- Title: serif, ~1.5rem
- Meta text: sans-serif, small, muted (`var(--color-subtle)`)
- "Sold": sans-serif, small, black, simple — not a badge, just text
- Close button: top-right of panel, minimal — just `✕`, no border, cursor pointer

---

## Component: `SoldBadge`

**File:** `src/components/SoldBadge/SoldBadge.jsx`
**CSS:** `src/components/SoldBadge/SoldBadge.module.css`

A small, unobtrusive "Sold" label that overlays the bottom of the artwork card image.

### Props
(none)

### Structure

```jsx
<span className={styles.badge}>Sold</span>
```

### CSS guidance

- `position: absolute`, bottom-left of the image wrapper
- Small sans-serif text, `font-size: 0.65rem`, uppercase, `letter-spacing: 0.05em`
- White text on a dark semi-transparent background — or black text, whatever reads better against the artwork
- Keep it minimal — this should be noticeable but not dominating

---

## Page Components

All three gallery pages follow the same pattern. They differ only in which section they pull from.

### `PaintingsPage.jsx`

```jsx
import { useState } from 'react'
import GalleryGrid from '../components/GalleryGrid/GalleryGrid'
import ArtworkModal from '../components/ArtworkModal/ArtworkModal'
import { getSection } from '../utils/content'

export default function PaintingsPage() {
  const [selected, setSelected] = useState(null)
  const artworks = getSection('paintings')

  return (
    <>
      <GalleryGrid artworks={artworks} onSelect={setSelected} />
      <ArtworkModal artwork={selected} onClose={() => setSelected(null)} />
    </>
  )
}
```

### `SculpturesPage.jsx`

Same pattern as PaintingsPage, using `getSection('sculptures')`.

### `SketchesPage.jsx`

Same pattern as PaintingsPage, using `getSection('sketches')`.

---

## Acceptance Criteria

- `GalleryGrid` renders a grid when given artwork data, and shows "No works to display." when the array is empty
- Clicking an artwork card opens the `ArtworkModal` with the correct artwork data
- The modal closes when clicking the overlay, clicking ✕, or pressing Escape
- Artworks with `sold: true` show a "Sold" indicator in the grid card
- Modal shows all images if multiple exist, stacked vertically
- All three page components (`PaintingsPage`, `SculpturesPage`, `SketchesPage`) render without errors
- Grid is responsive: 3 columns → 2 → 1 at appropriate breakpoints
- No console errors or React warnings
- Images do not stretch or squish (aspect ratios preserved)

---

## Files modified by this task

- `src/components/GalleryGrid/GalleryGrid.jsx` (replace stub)
- `src/components/GalleryGrid/GalleryGrid.module.css` (replace empty)
- `src/components/ArtworkModal/ArtworkModal.jsx` (replace stub)
- `src/components/ArtworkModal/ArtworkModal.module.css` (replace empty)
- `src/components/SoldBadge/SoldBadge.jsx` (replace stub)
- `src/components/SoldBadge/SoldBadge.module.css` (replace empty)
- `src/pages/PaintingsPage.jsx` (replace stub)
- `src/pages/SculpturesPage.jsx` (replace stub)
- `src/pages/SketchesPage.jsx` (replace stub)
