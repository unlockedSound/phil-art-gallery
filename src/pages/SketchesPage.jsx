import GalleryGrid from '../components/GalleryGrid/GalleryGrid'
import { getSection } from '../utils/content'

export default function SketchesPage() {
  const artworks = getSection('sketches')
  return <GalleryGrid artworks={artworks} />
}
