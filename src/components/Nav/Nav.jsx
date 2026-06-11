import { NavLink } from 'react-router-dom'
import styles from './Nav.module.css'

const links = [
  { to: '/paintings', label: 'Paintings' },
  { to: '/sculptures', label: 'Sculptures' },
  { to: '/sketches', label: 'Sketches' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <nav className={styles.nav}>
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
