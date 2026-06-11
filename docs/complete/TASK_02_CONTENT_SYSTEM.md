# TASK 02 — Content System (Manifest Generator + Utils)

**Phase:** 2 (parallel with TASK_03, TASK_07, TASK_08)
**Depends on:** TASK_01_SCAFFOLD complete
**Blocks:** TASK_04_GALLERY_PAGES, TASK_05_ABOUT, TASK_06_CONTACT

---

## Goal

Build the two-part content system:
1. `scripts/build-manifest.js` — a Node.js script that scans `public/content/` at build time and writes `src/generated/manifest.json`
2. `src/utils/content.js` — React-side helpers that the page components use to read from the manifest

The admin (a non-technical person) manages all content by adding/removing image files and `info.txt` files in `public/content/`. They never touch JSON, code, or the manifest.

---

## Full project context

See `docs/PROJECT_SPEC.md` for the complete spec.

**Content folder structure:**
```
public/content/
  paintings/
    [set-name]/
      image1.jpg
      image2.jpg
      info.txt
  sculptures/
    [set-name]/
      image.jpg
      info.txt
  sketches/
    [set-name]/
      image.jpg
      info.txt
  about/
    photo.jpg
    bio.txt
  contact/
    contact.txt
```

**`info.txt` format (for gallery sets):**
```
Title: Sunset Over the Hills
Medium: Oil on canvas
Size: 24" x 36"
Year: 2023
Sold: Yes
```

**`bio.txt` format (for about page):**
```
Name: Jane Artist
Bio: Jane has been creating art for over twenty years.

     A second paragraph starts after a blank line.
```

**`contact.txt` format:**
```
Email: phil@example.com
Instagram: https://instagram.com/philartist
Website: https://philartist.com
```

- Each non-blank line is `Label: value`
- If the value contains `@` and does not start with `http`, prepend `mailto:` automatically
- Otherwise use the value as-is as the href
- Order is preserved from the file

---

## Part 1: `scripts/build-manifest.js`

This is a plain Node.js script (no transpilation, no imports — use `require` / CommonJS). It runs via `node scripts/build-manifest.js`.

### What it does

1. Defines the three gallery sections: `paintings`, `sculptures`, `sketches`
2. For each section, scans `public/content/[section]/` for subdirectories
3. For each subdirectory (artwork set):
   - Reads `info.txt` if it exists (parse key-value pairs)
   - Finds all image files (`.jpg`, `.jpeg`, `.png`, `.webp`, case-insensitive)
   - Sorts image filenames alphabetically
   - Builds an entry object
4. Scans `public/content/about/` for the about data:
   - Finds the first image file (sorted alphabetically) — this is the artist photo
   - Reads `bio.txt` if it exists
5. Reads `public/content/contact/contact.txt` for the contact links
6. Writes the result to `src/generated/manifest.json`
7. Logs a summary to stdout: how many sets per section, whether about was found, how many contact links

### `info.txt` parsing rules

- Split file content by newlines
- For each line, split on the first `:` only
- Trim key and value
- Keys are case-insensitive for parsing, normalize to lowercase in the output
- `Sold: Yes` (case-insensitive comparison) → `"sold": true`, anything else or missing → `"sold": false`
- Unknown keys are ignored

### Manifest output shape

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
      "images": [
        "/content/paintings/sunset-series/sunset-1.jpg",
        "/content/paintings/sunset-series/sunset-2.jpg"
      ],
      "coverImage": "/content/paintings/sunset-series/sunset-1.jpg"
    }
  ],
  "sculptures": [],
  "sketches": [],
  "about": {
    "photo": "/content/about/photo.jpg",
    "name": "Jane Artist",
    "bio": "Jane has been creating art for over twenty years.\n\nA second paragraph starts after a blank line."
  },
  "contact": [
    { "label": "Email", "href": "mailto:phil@example.com" },
    { "label": "Instagram", "href": "https://instagram.com/philartist" }
  ]
}
```

Notes:
- `id` is the folder name (already URL-safe by convention)
- `title` falls back to the folder name (title-cased, hyphens replaced with spaces) if `info.txt` has no Title field
- `images` paths start with `/content/...` (root-relative, matches where Vite serves `public/` files)
- `coverImage` is always `images[0]`
- If `about/` has no image, `photo` is `null`
- If `about/` has no `bio.txt`, `bio` is `""` and `name` is `""`
- If a section folder does not exist, its array is `[]` (do not throw)
- If `contact/contact.txt` does not exist or is empty, `contact` is `[]`

### Error handling

- If `public/content/` does not exist at all, write the empty manifest and exit cleanly (do not throw)
- If an `info.txt` cannot be parsed, skip gracefully and use defaults
- Always write a valid manifest even if content is missing

### Implementation sketch

```js
const fs = require('fs')
const path = require('path')

const CONTENT_DIR = path.resolve(__dirname, '../public/content')
const OUTPUT_FILE = path.resolve(__dirname, '../src/generated/manifest.json')
const GALLERY_SECTIONS = ['paintings', 'sculptures', 'sketches']
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

function parseInfoTxt(filePath) { ... }
function getImages(dir, urlPrefix) { ... }
function buildSection(section) { ... }
function buildAbout() { ... }
function buildContact() { ... }

const manifest = {
  paintings: buildSection('paintings'),
  sculptures: buildSection('sculptures'),
  sketches: buildSection('sketches'),
  about: buildAbout(),
  contact: buildContact(),
}

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true })
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2))
console.log('Manifest written:', OUTPUT_FILE)
```

---

## Part 2: `src/utils/content.js`

This file exports helper functions that page components use to access manifest data. It imports from `../generated/manifest.json` (static JSON import — no fetching).

### Exports

```js
import manifest from '../generated/manifest.json'

// Returns array of artwork set objects for a gallery section.
// section: 'paintings' | 'sculptures' | 'sketches'
export function getSection(section) {
  return manifest[section] ?? []
}

// Returns the about data object, or null if not present.
export function getAbout() {
  return manifest.about ?? null
}

// Returns array of contact link objects: [{ label, href }]
export function getContact() {
  return manifest.contact ?? []
}
```

Keep this file minimal. Page components can destructure what they need from the returned objects.

---

## Acceptance Criteria

- Running `node scripts/build-manifest.js` from the project root completes without errors even when `public/content/` is empty
- After running the script, `src/generated/manifest.json` contains valid JSON matching the shape above
- If you create a folder `public/content/paintings/test-work/` with a `.jpg` and a valid `info.txt`, running the script produces an entry in `manifest.paintings`
- `Sold: Yes` in info.txt → `"sold": true` in manifest; `Sold: No` or omitted → `"sold": false`
- `src/utils/content.js` exports `getSection`, `getAbout`, and `getContact` with the signatures above
- An email value in `contact.txt` (containing `@`, not starting with `http`) becomes `mailto:` href in the manifest
- If `contact/contact.txt` is missing, `manifest.contact` is `[]`
- Importing `content.js` in a React component does not cause a compile error

---

## Files modified by this task

- `scripts/build-manifest.js` (replace empty stub)
- `src/utils/content.js` (replace empty stub)
- `src/generated/manifest.json` (updated by running the script — do not manually edit)
