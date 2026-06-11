# TASK 05 — About Page

**Phase:** 3 (parallel with TASK_04, TASK_06)
**Depends on:** TASK_01_SCAFFOLD, TASK_02_CONTENT_SYSTEM, TASK_03_LAYOUT complete
**Blocks:** nothing

---

## Goal

Build the About page. It displays a photo of the artist and a biography text, both sourced from `public/content/about/`. This page is simple and editorial — photo + text, clean layout.

---

## Full project context

See `docs/PROJECT_SPEC.md` for the complete spec.

**Manifest data shape for about (from TASK_02):**
```json
{
  "about": {
    "photo": "/content/about/photo.jpg",
    "name": "Jane Artist",
    "bio": "Jane has been creating art for over twenty years.\n\nA second paragraph starts after a blank line."
  }
}
```

- `photo` may be `null` if no image file exists in the about folder
- `bio` is a plain string; `\n\n` separates paragraphs
- `name` may be `""` if not set in `bio.txt`

**Content utility (from TASK_02):**
```js
import { getAbout } from '../utils/content'
const about = getAbout() // returns the about object, or null
```

**CSS variables (from TASK_07):**
```
--font-serif, --font-sans
--color-bg, --color-text, --color-subtle
--spacing-xs, --spacing-sm, --spacing-md, --spacing-lg, --spacing-xl
--max-width
```

---

## Page Component: `AboutPage`

**File:** `src/pages/AboutPage.jsx`
**CSS:** Create `src/pages/AboutPage.module.css`

### Behavior

- Reads about data using `getAbout()`
- If `about` is `null` or both `photo` and `bio` are empty, show a simple placeholder: "Coming soon."
- The `bio` string is split into paragraphs on `\n\n` and each paragraph is rendered as a `<p>` element
- The `name` field, if present, is rendered as a heading above the bio text
- If `photo` is present, show the image alongside or above the text

### Layout options

There are two acceptable layouts — choose whichever looks best:

**Option A — Side by side (desktop):**
```
[photo left, ~40% width]  [name + bio right, ~60% width]
```
On mobile: stack vertically, photo on top.

**Option B — Stacked:**
```
[photo centered, constrained width]
[name centered below]
[bio text, constrained width, centered or left-aligned]
```

Either way: clean, generous whitespace, editorial feel. The photo should be displayed at a natural size — not stretched to fill. `max-width` on the image to prevent it from being huge.

### Structure (Option A)

```jsx
import styles from './AboutPage.module.css'
import { getAbout } from '../utils/content'

export default function AboutPage() {
  const about = getAbout()

  if (!about || (!about.photo && !about.bio)) {
    return <p className={styles.empty}>Coming soon.</p>
  }

  const paragraphs = about.bio
    ? about.bio.split('\n\n').filter(Boolean)
    : []

  return (
    <div className={styles.page}>
      {about.photo && (
        <div className={styles.photoWrapper}>
          <img src={about.photo} alt={about.name || 'Artist'} className={styles.photo} />
        </div>
      )}
      <div className={styles.textWrapper}>
        {about.name && <h1 className={styles.name}>{about.name}</h1>}
        {paragraphs.map((p, i) => (
          <p key={i} className={styles.bio}>{p}</p>
        ))}
      </div>
    </div>
  )
}
```

### CSS guidance

- `page`: flex row (or column on mobile). Max-width and centered.
- `photoWrapper`: constrain the photo. On side-by-side layout, `flex: 0 0 40%` or similar. On stacked, `max-width: 400px`, centered.
- `photo`: `width: 100%`, `height: auto`, `display: block`. Do not crop or apply border-radius.
- `textWrapper`: remaining width, some left padding on desktop. Full width on mobile.
- `name`: serif font, ~1.8rem, normal weight (not bold — gallery style)
- `bio`: sans-serif, comfortable `line-height: 1.8`, `font-size: 1rem`. Paragraphs have margin-bottom spacing.
- `empty`: centered, muted text color

---

## Acceptance Criteria

- Page renders without errors when `about` data is populated in the manifest
- Page renders a "Coming soon." message when no about content exists
- Bio text is split into paragraphs correctly (each `\n\n` becomes a paragraph break)
- Artist name is displayed as a heading when present
- Photo is displayed when present, with natural proportions (no stretch/crop)
- Page is responsive — looks good on mobile

---

## Files modified by this task

- `src/pages/AboutPage.jsx` (replace stub)
- `src/pages/AboutPage.module.css` (new file)
