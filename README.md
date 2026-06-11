# Phil's Art Gallery — Site Update Guide

This guide explains how to update the site using only the GitHub website — no coding or software required.

The site lives at: **https://github.com/unlockedSound/phil-art-gallery**

Every time you save a change on GitHub, the site automatically rebuilds and goes live within a few minutes.

---

## How it works

All content lives in the `public/content/` folder in this repository. You add artwork by uploading image files and a small text file into that folder. You remove artwork by deleting those files. That's it — no code is ever touched.

---

## Adding a new artwork (painting, sculpture, or sketch)

**Step 1 — Go to the right folder**

Navigate to one of these folders depending on the type of work:
- `public/content/paintings/`
- `public/content/sculptures/`
- `public/content/sketches/`

**Step 2 — Create a folder for the new set**

Click **Add file → Create new file**.

In the filename box, type the folder name followed by a slash and a placeholder filename, like:

```
public/content/paintings/my-new-painting/info.txt
```

> Folder names should be lowercase with hyphens instead of spaces (e.g. `winter-series`, `bronze-figure-2024`).

**Step 3 — Fill in the info.txt**

In the file editor, paste the following and fill in your details:

```
Title: Your Artwork Title
Medium: Oil on canvas
Size: 24" x 36"
Year: 2024
Sold: No
```

- Only `Title` is required. You can remove any other line you don't need.
- To mark a piece as sold, change `Sold: No` to `Sold: Yes`.

Click **Commit changes** at the bottom to save.

**Step 4 — Upload the image(s)**

Go into the new folder you just created (e.g. `public/content/paintings/my-new-painting/`).

Click **Add file → Upload files**, drag in your image(s), then click **Commit changes**.

- Accepted formats: `.jpg`, `.jpeg`, `.png`, `.webp`
- If you upload multiple images, they will all appear in the lightbox for that piece. The first image (alphabetically) is used as the cover/thumbnail.

The site will rebuild automatically. Give it 2–3 minutes, then refresh your site to see the new artwork.

---

## Removing an artwork

Navigate to the artwork's folder (e.g. `public/content/paintings/sunset-series/`).

Delete each file inside it: click the file, then click the trash icon (or the **...** menu → **Delete file**), and commit.

Once all files are deleted, GitHub automatically removes the empty folder.

---

## Marking an artwork as sold

Open the `info.txt` file inside the artwork's folder. Click the pencil icon to edit it. Change the `Sold` line to:

```
Sold: Yes
```

Click **Commit changes**. A subtle "Sold" label will appear on the piece after the site rebuilds.

To un-mark it, change the line back to `Sold: No` (or remove the line entirely).

---

## Updating the About page

The About page is controlled by two files in `public/content/about/`:

**Photo** — Upload any image file to `public/content/about/`. The first image file found in that folder is used. To swap the photo, delete the old one and upload the new one.

**Bio** — Edit `public/content/about/bio.txt`. The format is:

```
Name: Phil Artist
Bio: Phil has been painting for over twenty years, working primarily in oil.

     A blank line between paragraphs creates a new paragraph on the page.
```

---

## Updating the Contact page

Edit `public/content/contact/contact.txt`. Each line is a link that appears on the contact page:

```
Email: phil@example.com
Instagram: https://instagram.com/philartist
Website: https://philartist.com
```

- Lines appear on the page in the order you write them.
- The label (e.g. `Instagram`) is the clickable link text.
- Email addresses (anything with `@` that doesn't start with `http`) are automatically linked with `mailto:`.
- Add or remove lines freely to add or remove contact links.

---

## Checking the build status

After committing a change, you can watch the site rebuild:

1. Go to the repository's main page.
2. Click the **Actions** tab.
3. You'll see a running workflow called **Deploy to GitHub Pages**. A yellow dot means it's building; green means it's live; red means something went wrong.

If a build fails (red), click into it to see the error. Most errors are caused by a typo in a file name or a missing `Title` line in `info.txt`.

---

## Quick reference

| What you want to do | Where to go |
|---|---|
| Add a painting | `public/content/paintings/` → create new folder with `info.txt` + upload images |
| Add a sculpture | `public/content/sculptures/` → same as above |
| Add a sketch | `public/content/sketches/` → same as above |
| Remove an artwork | Delete all files inside its folder |
| Mark as sold | Edit `info.txt`, set `Sold: Yes` |
| Update your photo | `public/content/about/` → delete old photo, upload new one |
| Update your bio | Edit `public/content/about/bio.txt` |
| Update contact links | Edit `public/content/contact/contact.txt` |
