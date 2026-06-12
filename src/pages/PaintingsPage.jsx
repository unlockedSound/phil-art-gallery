import GalleryGrid from '../components/GalleryGrid/GalleryGrid'
import { getSection } from '../utils/content'

export default function PaintingsPage() {
  const artworks = getSection('paintings')
  return <GalleryGrid artworks={artworks} />
}
