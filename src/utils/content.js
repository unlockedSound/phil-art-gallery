import manifest from '../generated/manifest.json'

export function getSection(section) {
  return manifest[section] ?? []
}

export function getAbout() {
  return manifest.about ?? null
}

export function getContact() {
  return manifest.contact ?? []
}
