import styles from './GalleryGrid.module.css'

export default function GalleryGrid({ artworks }) {
  if (!artworks || artworks.length === 0) {
    return <p className={styles.empty}>No works to display.</p>
  }

  return (
    <div className={styles.list}>
      {artworks.map((artwork) => (
        <section key={artwork.id} className={styles.band}>
          <figure className={styles.work}>
            <div className={styles.images}>
              {artwork.images.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={i === 0 ? artwork.title : `${artwork.title}, detail`}
                  className={styles.image}
                />
              ))}
            </div>
            <figcaption className={styles.caption}>
              <div className={styles.captionTitle}>
                &ldquo;{artwork.title}&rdquo;
                {artwork.sold && <span className={styles.soldMark}> — Sold</span>}
              </div>
              {(artwork.medium || artwork.size || artwork.year) && (
                <div className={styles.captionMeta}>
                  {[artwork.medium, artwork.size, artwork.year].filter(Boolean).join(' · ')}
                </div>
              )}
            </figcaption>
          </figure>
        </section>
      ))}
    </div>
  )
}
