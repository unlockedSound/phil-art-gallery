import manifest from '../generated/manifest.json'

const base = import.meta.env.BASE_URL.replace(/\/$/, '')

function fixPath(p) {
  return typeof p === 'string' && p.startsWith('/') ? base + p : p
}

function fixImagePaths(item) {
  if (!item || typeof item !== 'object') return item
  const result = { ...item }
  if (result.coverImage) result.coverImage = fixPath(result.coverImage)
  if (result.images) result.images = result.images.map(fixPath)
  if (result.photo) result.photo = fixPath(result.photo)
  return result
}

export function getSection(section) {
  return (manifest[section] ?? []).map(fixImagePaths)
}

export function getAbout() {
  return fixImagePaths(manifest.about ?? null)
}

export function getContact() {
  return manifest.contact ?? []
}
