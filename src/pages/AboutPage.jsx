import styles from './AboutPage.module.css'
import { getAbout } from '../utils/content'

export default function AboutPage() {
  const about = getAbout()

  if (!about || (!about.photo && !about.bio)) {
    return <p className={styles.empty}>Coming soon.</p>
  }

  const paragraphs = about.bio
    ? about.bio.split('\n\n').filter(Boolean)
    : []

  return (
    <div className={styles.page}>
      {about.photo && (
        <div className={styles.photoWrapper}>
          <img src={about.photo} alt={about.name || 'Artist'} className={styles.photo} />
        </div>
      )}
      <div className={styles.textWrapper}>
        {about.name && <h1 className={styles.name}>{about.name}</h1>}
        {paragraphs.map((p, i) => (
          <p key={i} className={styles.bio}>{p}</p>
        ))}
      </div>
    </div>
  )
}
