import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Spec from './pages/Spec'
import Schema from './pages/Schema'
import Sdk from './pages/Sdk'
import Sidecar from './pages/Sidecar'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/spec" element={<Spec />} />
            <Route path="/schema" element={<Schema />} />
            <Route path="/sdk" element={<Sdk />} />
            <Route path="/sidecar" element={<Sidecar />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
