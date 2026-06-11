import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname, extname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const CONTENT_DIR = resolve(__dirname, '../public/content')
const OUTPUT_FILE = resolve(__dirname, '../src/generated/manifest.json')
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

function isImage(name) {
  return IMAGE_EXTENSIONS.has(extname(name).toLowerCase())
}

function toTitleCase(str) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

function parseInfoTxt(filePath) {
  try {
    const text = readFileSync(filePath, 'utf8')
    const result = {}
    for (const line of text.split('\n')) {
      const i = line.indexOf(':')
      if (i === -1) continue
      const key = line.slice(0, i).trim().toLowerCase()
      const value = line.slice(i + 1).trim()
      if (key && value) result[key] = value
    }
    return result
  } catch {
    return {}
  }
}

function getImages(dir, urlPrefix) {
  try {
    return readdirSync(dir).filter(isImage).sort().map(name => `${urlPrefix}/${name}`)
  } catch {
    return []
  }
}

function buildSection(section) {
  const sectionDir = join(CONTENT_DIR, section)
  if (!existsSync(sectionDir)) return []

  let sets
  try {
    sets = readdirSync(sectionDir).filter(name => {
      try { return statSync(join(sectionDir, name)).isDirectory() } catch { return false }
    })
  } catch {
    return []
  }

  return sets.map(setName => {
    const setDir = join(sectionDir, setName)
    const urlPrefix = `/content/${section}/${setName}`
    const info = parseInfoTxt(join(setDir, 'info.txt'))
    const images = getImages(setDir, urlPrefix)
    return {
      id: setName,
      title: info.title || toTitleCase(setName),
      medium: info.medium || '',
      size: info.size || '',
      year: info.year || '',
      sold: info.sold?.toLowerCase() === 'yes',
      images,
      coverImage: images[0] ?? null,
    }
  })
}

function buildAbout() {
  const aboutDir = join(CONTENT_DIR, 'about')
  if (!existsSync(aboutDir)) return { photo: null, name: '', bio: '' }

  const photoFiles = readdirSync(aboutDir).filter(isImage).sort()
  const photo = photoFiles.length > 0 ? `/content/about/${photoFiles[0]}` : null

  const bioPath = join(aboutDir, 'bio.txt')
  if (!existsSync(bioPath)) return { photo, name: '', bio: '' }

  const text = readFileSync(bioPath, 'utf8')

  const nameMatch = text.match(/^Name:\s*(.+)$/m)
  const name = nameMatch ? nameMatch[1].trim() : ''

  const bioStart = text.search(/^Bio:/m)
  let bio = ''
  if (bioStart !== -1) {
    const raw = text.slice(bioStart + 4) // skip "Bio:"
    const paragraphs = raw
      .split(/\n[ \t]*\n/)
      .map(p => p.split('\n').map(l => l.trim()).filter(Boolean).join(' '))
      .filter(Boolean)
    bio = paragraphs.join('\n\n')
  }

  return { photo, name, bio }
}

function buildContact() {
  const contactPath = join(CONTENT_DIR, 'contact', 'contact.txt')
  if (!existsSync(contactPath)) return []

  const text = readFileSync(contactPath, 'utf8')
  const links = []
  for (const line of text.split('\n')) {
    const i = line.indexOf(':')
    if (i === -1) continue
    const label = line.slice(0, i).trim()
    const value = line.slice(i + 1).trim()
    if (!label || !value) continue
    const href = value.includes('@') && !value.startsWith('http') ? `mailto:${value}` : value
    links.push({ label, href })
  }
  return links
}

const manifest = existsSync(CONTENT_DIR)
  ? {
      paintings: buildSection('paintings'),
      sculptures: buildSection('sculptures'),
      sketches: buildSection('sketches'),
      about: buildAbout(),
      contact: buildContact(),
    }
  : { paintings: [], sculptures: [], sketches: [], about: { photo: null, name: '', bio: '' }, contact: [] }

mkdirSync(dirname(OUTPUT_FILE), { recursive: true })
writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2))

console.log(`Manifest written: ${OUTPUT_FILE}`)
console.log(`  paintings:  ${manifest.paintings.length} sets`)
console.log(`  sculptures: ${manifest.sculptures.length} sets`)
console.log(`  sketches:   ${manifest.sketches.length} sets`)
console.log(`  about:      ${manifest.about?.name || '(none)'}`)
console.log(`  contact:    ${manifest.contact.length} links`)
