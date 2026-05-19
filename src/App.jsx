import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/common/ScrollToTop'
import BackToTop from './components/common/BackToTop'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Page imports
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicePage from './pages/ServicePage'
import ServiceSubPage from './pages/ServiceSubPage'
import CareersPage from './pages/CareersPage'
import ContactPage from './pages/ContactPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import BmiCalculatorPage from './pages/BmiCalculatorPage'
import SuccessStoriesPage from './pages/SuccessStoriesPage'
import RecipesPage from './pages/RecipesPage'
import ExpertsPage from './pages/ExpertsPage'
import TeamPage from './pages/TeamPage'

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
          
          {/* Newly Added Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/bmi-calculator" element={<BmiCalculatorPage />} />
          <Route path="/success-stories" element={<SuccessStoriesPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/experts" element={<ExpertsPage />} />
          <Route path="/team" element={<TeamPage />} />

          {/* Service Sub-Pages — single dynamic route */}
          <Route path="/service/:slug" element={<ServiceSubPage />} />
        </Routes>
      </main>

      <Footer />
      <BackToTop />
    </>
  )
}

export default App
