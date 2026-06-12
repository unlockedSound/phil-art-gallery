import { Fragment } from 'react'
import styles from './GalleryGrid.module.css'

export default function GalleryGrid({ artworks }) {
  if (!artworks || artworks.length === 0) {
    return <p className={styles.empty}>No works to display.</p>
  }

  return (
    <div className={styles.list}>
      {artworks.map((artwork, idx) => (
        <Fragment key={artwork.id}>
          {idx > 0 && <hr className={styles.divider} />}
          <section className={styles.band}>
            <figure className={styles.work}>
              <div className={artwork.group ? styles.imagesRow : styles.images}>
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
                </div>
                {(artwork.medium || artwork.size || artwork.year) && (
                  <div className={styles.captionMeta}>
                    {[artwork.medium, artwork.size, artwork.year].filter(Boolean).join(' · ')}
                  </div>
                )}
                {artwork.sold && <span className={styles.soldMark}>Sold</span>}
              </figcaption>
            </figure>
          </section>
        </Fragment>
      ))}
    </div>
  )
}
