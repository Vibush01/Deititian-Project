import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/common/ScrollToTop'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Page imports
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicePage from './pages/ServicePage'
import CareersPage from './pages/CareersPage'
import ContactPage from './pages/ContactPage'

// Service sub-page imports
import WeightManagementPage from './pages/services/WeightManagementPage'
import DiseaseManagementPage from './pages/services/DiseaseManagementPage'
import PcodPcosPage from './pages/services/PcodPcosPage'
import ThyroidPage from './pages/services/ThyroidPage'
import DiabetesPage from './pages/services/DiabetesPage'
import LifestyleManagementPage from './pages/services/LifestyleManagementPage'

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      {/* Main content with top padding to account for fixed navbar */}
      <main className="pt-16 md:pt-20">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact-us" element={<ContactPage />} />

          {/* Service Sub-Pages */}
          <Route path="/service/weight-management" element={<WeightManagementPage />} />
          <Route path="/service/disease-management" element={<DiseaseManagementPage />} />
          <Route path="/service/pcod-pcos" element={<PcodPcosPage />} />
          <Route path="/service/thyroid" element={<ThyroidPage />} />
          <Route path="/service/diabetes" element={<DiabetesPage />} />
          <Route path="/service/lifestyle-management" element={<LifestyleManagementPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
