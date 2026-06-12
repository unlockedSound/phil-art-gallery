import GalleryGrid from '../components/GalleryGrid/GalleryGrid'
import { getSection } from '../utils/content'

export default function SculpturesPage() {
  const artworks = getSection('sculptures')
  return <GalleryGrid artworks={artworks} />
}
