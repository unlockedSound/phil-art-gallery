import { Fragment, useState } from 'react'
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
              {artwork.group ? (
                <ImageRow artwork={artwork} />
              ) : (
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
              )}
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

// Side-by-side images are all drawn at the same height, each keeping its own
// shape, so their top and bottom edges line up without stretching or cropping
// (e.g. a portrait next to a landscape). Each image's width is its share of the
// row in proportion to its aspect ratio.
function ImageRow({ artwork }) {
  const [ratios, setRatios] = useState({})
  const known = Object.values(ratios)
  const allKnown = known.length === artwork.images.length
  const aspectSum = allKnown ? known.reduce((a, b) => a + b, 0) : undefined

  return (
    <div
      className={styles.imagesRow}
      style={{ '--image-count': artwork.images.length, '--aspect-sum': aspectSum }}
    >
      {artwork.images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? artwork.title : `${artwork.title}, detail`}
          className={styles.image}
          style={allKnown ? { '--aspect': ratios[src] } : undefined}
          onLoad={e => {
            const { naturalWidth: w, naturalHeight: h } = e.currentTarget
            if (w && h) setRatios(r => ({ ...r, [src]: w / h }))
          }}
        />
      ))}
    </div>
  )
}
