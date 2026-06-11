import styles from './ContactPage.module.css'
import { getContact } from '../utils/content'

export default function ContactPage() {
  const links = getContact()

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Contact</h1>
      {links.length === 0 ? (
        <p className={styles.empty}>No contact information available.</p>
      ) : (
        <ul className={styles.links}>
          {links.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className={styles.link}
                {...(href.startsWith('mailto:')
                  ? {}
                  : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
