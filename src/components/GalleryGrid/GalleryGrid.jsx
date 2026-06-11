import SoldBadge from '../SoldBadge/SoldBadge'
import styles from './GalleryGrid.module.css'

export default function GalleryGrid({ artworks, onSelect }) {
  if (!artworks || artworks.length === 0) {
    return <p className={styles.empty}>No works to display.</p>
  }

  return (
    <div className={styles.grid}>
      {artworks.map((artwork) => (
        <div
          key={artwork.id}
          className={styles.card}
          onClick={() => onSelect(artwork)}
        >
          <div className={styles.imageWrapper}>
            <img
              src={artwork.coverImage}
              alt={artwork.title}
              className={styles.image}
            />
            {artwork.sold && <SoldBadge />}
          </div>
          <p className={styles.title}>{artwork.title}</p>
        </div>
      ))}
    </div>
  )
}
