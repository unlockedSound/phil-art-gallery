import { useState } from 'react'
import GalleryGrid from '../components/GalleryGrid/GalleryGrid'
import ArtworkModal from '../components/ArtworkModal/ArtworkModal'
import { getSection } from '../utils/content'

export default function SculpturesPage() {
  const [selected, setSelected] = useState(null)
  const artworks = getSection('sculptures')

  return (
    <>
      <GalleryGrid artworks={artworks} onSelect={setSelected} />
      <ArtworkModal artwork={selected} onClose={() => setSelected(null)} />
    </>
  )
}
