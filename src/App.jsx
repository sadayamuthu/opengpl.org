import { useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Spec from './pages/Spec'
import Schema from './pages/Schema'
import Sdk from './pages/Sdk'
import Sidecar from './pages/Sidecar'

function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.scrollTo(0, 0)
  }, [pathname, hash, key])
  return null
}

export function AppRoutes() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spec" element={<Spec />} />
        <Route path="/schema" element={<Schema />} />
        <Route path="/sdk" element={<Sdk />} />
        <Route path="/sidecar" element={<Sidecar />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
