import { Fragment } from 'react'
import styles from './GalleryGrid.module.css'

function groupArtworks(artworks) {
  const rows = []
  let i = 0
  while (i < artworks.length) {
    const art = artworks[i]
    if (art.group) {
      const row = [art]
      let j = i + 1
      while (j < artworks.length && artworks[j].group === art.group) {
        row.push(artworks[j])
        j++
      }
      rows.push(row)
      i = j
    } else {
      rows.push([art])
      i++
    }
  }
  return rows
}

function ArtworkFigure({ artwork }) {
  return (
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
            {[artwork.medium, artwork.size, artwork.year].filter(Boolean).join(' · ')}
          </div>
        )}
      </figcaption>
    </figure>
  )
}

export default function GalleryGrid({ artworks }) {
  if (!artworks || artworks.length === 0) {
    return <p className={styles.empty}>No works to display.</p>
  }

  const rows = groupArtworks(artworks)

  return (
    <div className={styles.list}>
      {rows.map((row, rowIdx) => (
        <Fragment key={row[0].id}>
          {rowIdx > 0 && <hr className={styles.divider} />}
          <section className={styles.band}>
            <div className={row.length > 1 ? styles.rowMulti : styles.row}>
              {row.map((artwork) => (
                <ArtworkFigure key={artwork.id} artwork={artwork} />
              ))}
            </div>
          </section>
        </Fragment>
      ))}
    </div>
  )
}
