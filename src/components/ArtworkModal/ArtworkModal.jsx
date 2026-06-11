import { useEffect } from 'react'
import styles from './ArtworkModal.module.css'

export default function ArtworkModal({ artwork, onClose }) {
  useEffect(() => {
    if (!artwork) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [artwork, onClose])

  if (!artwork) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.panel}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">✕</button>
        <div className={styles.images}>
          {artwork.images.map((src) => (
            <img key={src} src={src} alt={artwork.title} className={styles.image} />
          ))}
        </div>
        <div className={styles.metadata}>
          <h2 className={styles.title}>{artwork.title}</h2>
          {artwork.medium && <p className={styles.meta}>{artwork.medium}</p>}
          {artwork.size && <p className={styles.meta}>{artwork.size}</p>}
          {artwork.year && <p className={styles.meta}>{artwork.year}</p>}
          {artwork.sold && <p className={styles.sold}>Sold</p>}
        </div>
      </div>
    </div>
  )
}
