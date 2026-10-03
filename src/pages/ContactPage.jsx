import styles from './ContactPage.module.css'
import { getContact } from '../utils/content'

export default function ContactPage() {
  const entries = getContact()
  const links = entries.filter(e => e.href)
  const notes = entries.filter(e => !e.href)

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Contact</h1>
      {links.length === 0 ? (
        <p className={styles.empty}>No contact information available.</p>
      ) : (
        <ul className={styles.links}>
          {links.map(({ label, href, text }) => (
            <li key={label}>
              <a
                href={href}
                className={styles.link}
                {...(href.startsWith('mailto:')
                  ? {}
                  : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {text || label}
              </a>
            </li>
          ))}
        </ul>
      )}
      {notes.map(({ text }, i) => (
        <p key={i} className={styles.note}>{text}</p>
      ))}
    </div>
  )
}
