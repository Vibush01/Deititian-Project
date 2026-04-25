import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/common/ScrollToTop'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Page imports
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicePage from './pages/ServicePage'
import ServiceSubPage from './pages/ServiceSubPage'
import CareersPage from './pages/CareersPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      {/* Main content */}
      <main>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact-us" element={<ContactPage />} />

          {/* Service Sub-Pages — single dynamic route */}
          <Route path="/service/:slug" element={<ServiceSubPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
