# TASK 06 — Contact Page

**Phase:** 3 (parallel with TASK_04, TASK_05)
**Depends on:** TASK_01_SCAFFOLD, TASK_02_CONTENT_SYSTEM, TASK_03_LAYOUT complete
**Blocks:** nothing

---

## Goal

Build the Contact page. Contact links are managed by the site admin via `public/content/contact/contact.txt` — no code changes are needed when links change. The page reads from the manifest and renders each link in order.

---

## Full project context

See `docs/PROJECT_SPEC.md` for the complete spec.

**Manifest data shape for contact (from TASK_02):**
```json
{
  "contact": [
    { "label": "Email", "href": "mailto:phil@example.com" },
    { "label": "Instagram", "href": "https://instagram.com/philartist" }
  ]
}
```

- `label` is the display text shown as the link
- `href` is the resolved URL (email addresses have `mailto:` already prepended by the manifest builder)
- The array may be empty if `contact.txt` is missing or empty

**Content utility (from TASK_02):**
```js
import { getContact } from '../utils/content'
const links = getContact() // array of { label, href }
```

**CSS variables (from TASK_07):**
```
--font-serif, --font-sans
--color-bg, --color-text, --color-subtle
--spacing-xs, --spacing-sm, --spacing-md, --spacing-lg, --spacing-xl
--max-width
```

---

## Page Component: `ContactPage`

**File:** `src/pages/ContactPage.jsx`
**CSS:** Create `src/pages/ContactPage.module.css`

### Behavior

- Reads contact links using `getContact()`
- If the array is empty, show a simple placeholder: "No contact information available."
- Renders each link as a list item, in the order they appear in the array
- Email links (`href` starting with `mailto:`) open the user's mail client
- All other links open in a new tab with `rel="noopener noreferrer"`

### Structure

```jsx
import styles from './ContactPage.module.css'
import { getContact } from '../utils/content'

export default function ContactPage() {
  const links = getContact()

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Contact</h1>
      {links.length === 0 ? (
        <p className={styles.empty}>No contact information available.</p>
      ) : (
        <ul className={styles.links}>
          {links.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className={styles.link}
                {...(href.startsWith('mailto:')
                  ? {}
                  : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

### CSS guidance

- `page`: generous top padding, left-aligned within the content max-width
- `heading`: serif font, ~2rem, normal weight — understated, not a banner
- `links`: list-style none, no bullets, `padding: 0`, `margin: 0`
- Each `li`: `margin-bottom: var(--spacing-sm)` for vertical spacing between links
- `link`: sans-serif, clean. No underline by default; underline on hover. Color: `var(--color-text)` (black).
- `empty`: muted color (`var(--color-subtle)`), same font-size as body
- Keep the whole page visually quiet — this is a minimal contact card, not a form

---

## Acceptance Criteria

- Page renders without errors when contact data is present in the manifest
- Page renders "No contact information available." when `getContact()` returns `[]`
- Email links (`mailto:`) open the mail client, not a new tab
- Non-email links open in a new tab with `rel="noopener noreferrer"`
- Links display their label text, not the raw URL
- Page matches the overall gallery aesthetic (white bg, black text, minimal)

---

## Files modified by this task

- `src/pages/ContactPage.jsx` (replace stub)
- `src/pages/ContactPage.module.css` (new file)
