import { useState } from 'react'
import GalleryGrid from '../components/GalleryGrid/GalleryGrid'
import ArtworkModal from '../components/ArtworkModal/ArtworkModal'
import { getSection } from '../utils/content'

export default function PaintingsPage() {
  const [selected, setSelected] = useState(null)
  const artworks = getSection('paintings')

  return (
    <>
      <GalleryGrid artworks={artworks} onSelect={setSelected} />
      <ArtworkModal artwork={selected} onClose={() => setSelected(null)} />
    </>
  )
}
