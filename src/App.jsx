import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/common/ScrollToTop'
import BackToTop from './components/common/BackToTop'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { AuthProvider } from './contexts/AuthContext'

import { lazy, Suspense } from 'react'

// Page imports (HomePage is critical and eagerly loaded)
import HomePage from './pages/HomePage'

// Lazy-loaded client pages
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ServicePage = lazy(() => import('./pages/ServicePage'))
const ServiceSubPage = lazy(() => import('./pages/ServiceSubPage'))
const CareersPage = lazy(() => import('./pages/CareersPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const BmiCalculatorPage = lazy(() => import('./pages/BmiCalculatorPage'))
const SuccessStoriesPage = lazy(() => import('./pages/SuccessStoriesPage'))
const RecipesPage = lazy(() => import('./pages/RecipesPage'))
const ExpertsPage = lazy(() => import('./pages/ExpertsPage'))
const TeamPage = lazy(() => import('./pages/TeamPage'))

// Admin imports
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'
const LoginPage = lazy(() => import('./pages/admin/LoginPage'))
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'))
const SiteSettingsEditor = lazy(() => import('./pages/admin/SiteSettingsEditor'))

const AboutPageEditor = lazy(() => import('./pages/admin/AboutPageEditor'))
const ContactPageEditor = lazy(() => import('./pages/admin/ContactPageEditor'))
const PrivacyPolicyEditor = lazy(() => import('./pages/admin/PrivacyPolicyEditor'))
const CareersEditor = lazy(() => import('./pages/admin/CareersEditor'))
const HomePageEditor = lazy(() => import('./pages/admin/HomePageEditor'))
const ServicesEditor = lazy(() => import('./pages/admin/ServicesEditor'))
const ServiceSubPageEditor = lazy(() => import('./pages/admin/ServiceSubPageEditor'))
const TeamExpertsEditor = lazy(() => import('./pages/admin/TeamExpertsEditor'))
const RecipesEditor = lazy(() => import('./pages/admin/RecipesEditor'))
const SuccessStoriesEditor = lazy(() => import('./pages/admin/SuccessStoriesEditor'))
const LocationsEditor = lazy(() => import('./pages/admin/LocationsEditor'))
const MediaManager = lazy(() => import('./pages/admin/MediaManager'))

const InquiriesManager = lazy(() => import('./pages/admin/InquiriesManager'))

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2E7D32]"></div>
  </div>
)

/**
 * App.jsx - Main Application Component
 */
function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Admin Login — no layout */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Admin Panel — AdminLayout + ProtectedRoute */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/site-settings" element={<SiteSettingsEditor />} />
                    
                    {/* Pages Content Editors */}
                    <Route path="/pages/home" element={<HomePageEditor />} />
                    <Route path="/pages/about" element={<AboutPageEditor />} />
                    <Route path="/pages/contact" element={<ContactPageEditor />} />
                    <Route path="/pages/privacy" element={<PrivacyPolicyEditor />} />
                    
                    {/* Services Editors */}
                    <Route path="/services" element={<ServicesEditor />} />
                    <Route path="/services/sub-pages" element={<ServiceSubPageEditor />} />
                    
                    {/* Careers */}
                    <Route path="/careers" element={<CareersEditor />} />
                    
                    {/* Team & Experts */}
                    <Route path="/team" element={<TeamExpertsEditor />} />
                    <Route path="/recipes" element={<RecipesEditor />} />
                    
                    {/* Showcase & Management */}
                    <Route path="/success-stories" element={<SuccessStoriesEditor />} />
                    <Route path="/locations" element={<LocationsEditor />} />
                    <Route path="/media" element={<MediaManager />} />
                    <Route path="/inquiries" element={<InquiriesManager />} />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            } 
          />

          {/* Public Site — Navbar + Footer (Catch-all for everything else) */}
          <Route 
            path="*" 
            element={
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
                    
                    {/* Additional Pages */}
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
            } 
          />
        </Routes>
      </Suspense>
    </AuthProvider>
  )
}

export default App

