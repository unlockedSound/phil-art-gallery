import { Link } from 'react-router-dom'
import Nav from '../Nav/Nav'
import styles from './Layout.module.css'

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/paintings" className={styles.siteTitle}>Philippe Berhault</Link>
          <Nav />
        </div>
      </header>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  )
}
