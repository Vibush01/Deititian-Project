import { Routes, Route, useLocation } from 'react-router-dom'
import ScrollToTop from './components/common/ScrollToTop'
import BackToTop from './components/common/BackToTop'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { AuthProvider } from './contexts/AuthContext'

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

// Admin imports
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'
import LoginPage from './pages/admin/LoginPage'
import DashboardPage from './pages/admin/DashboardPage'
import SiteSettingsEditor from './pages/admin/SiteSettingsEditor'
import NavigationEditor from './pages/admin/NavigationEditor'
import AboutPageEditor from './pages/admin/AboutPageEditor'
import CareersEditor from './pages/admin/CareersEditor'
import HomePageEditor from './pages/admin/HomePageEditor'
import ServicesEditor from './pages/admin/ServicesEditor'
import ServiceSubPageEditor from './pages/admin/ServiceSubPageEditor'
import TeamEditor from './pages/admin/TeamEditor'
import ExpertsEditor from './pages/admin/ExpertsEditor'
import RecipesEditor from './pages/admin/RecipesEditor'
import SuccessStoriesEditor from './pages/admin/SuccessStoriesEditor'
import LocationsEditor from './pages/admin/LocationsEditor'
import MediaManager from './pages/admin/MediaManager'

import InquiriesManager from './pages/admin/InquiriesManager'

/**
 * PublicLayout — renders the public site with Navbar + Footer.
 */
const PublicLayout = () => (
  <>
    <Navbar />
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

/**
 * AdminRoutes — renders admin pages inside AdminLayout with ProtectedRoute.
 */
const AdminRoutes = () => (
  <AdminLayout>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/site-settings" element={<SiteSettingsEditor />} />
      <Route path="/navigation" element={<NavigationEditor />} />
      
      {/* Pages Content Editors */}
      <Route path="/pages/home" element={<HomePageEditor />} />
      <Route path="/pages/about" element={<AboutPageEditor />} />
      
      {/* Services Editors */}
      <Route path="/services" element={<ServicesEditor />} />
      <Route path="/services/sub-pages" element={<ServiceSubPageEditor />} />
      
      {/* Careers */}
      <Route path="/careers" element={<CareersEditor />} />
      
      {/* Team & Experts */}
      <Route path="/team" element={<TeamEditor />} />
      <Route path="/experts" element={<ExpertsEditor />} />
      <Route path="/recipes" element={<RecipesEditor />} />
      
      {/* Step 8 Editors */}
      <Route path="/success-stories" element={<SuccessStoriesEditor />} />
      <Route path="/locations" element={<LocationsEditor />} />
      <Route path="/media" element={<MediaManager />} />
      
      {/* Step 9 Editors */}
      <Route path="/inquiries" element={<InquiriesManager />} />
    </Routes>
  </AdminLayout>
)

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isLoginRoute = location.pathname === '/admin/login'

  return (
    <AuthProvider>
      <ScrollToTop />
      
      {/* Admin Login — no layout */}
      {isLoginRoute && (
        <Routes>
          <Route path="/admin/login" element={<LoginPage />} />
        </Routes>
      )}

      {/* Admin Panel — AdminLayout + ProtectedRoute */}
      {isAdminRoute && !isLoginRoute && (
        <ProtectedRoute>
          <AdminRoutes />
        </ProtectedRoute>
      )}

      {/* Public Site — Navbar + Footer */}
      {!isAdminRoute && <PublicLayout />}
    </AuthProvider>
  )
}

export default App
