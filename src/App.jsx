import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import PaintingsPage from './pages/PaintingsPage'
import SculpturesPage from './pages/SculpturesPage'
import SketchesPage from './pages/SketchesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import './styles/global.css'

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/paintings" replace />} />
          <Route path="/paintings" element={<PaintingsPage />} />
          <Route path="/sculptures" element={<SculpturesPage />} />
          <Route path="/sketches" element={<SketchesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}
