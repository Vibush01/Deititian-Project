import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  FaBars, FaTimes, FaTachometerAlt, FaCog, FaCompass,
  FaFileAlt, FaConciergeBell, FaUsers, FaUserMd,
  FaUtensils, FaTrophy, FaEnvelope, FaMapMarkerAlt,
  FaSignOutAlt, FaChevronLeft,
} from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const sidebarLinks = [
  { label: 'Dashboard', path: '/admin', icon: <FaTachometerAlt />, end: true },
  { label: 'Site Settings', path: '/admin/site-settings', icon: <FaCog /> },
  { label: 'Navigation', path: '/admin/navigation', icon: <FaCompass /> },
  { label: 'Pages', path: '/admin/pages', icon: <FaFileAlt /> },
  { label: 'Services', path: '/admin/services', icon: <FaConciergeBell /> },
  { label: 'Team', path: '/admin/team', icon: <FaUsers /> },
  { label: 'Experts', path: '/admin/experts', icon: <FaUserMd /> },
  { label: 'Recipes', path: '/admin/recipes', icon: <FaUtensils /> },
  { label: 'Success Stories', path: '/admin/success-stories', icon: <FaTrophy /> },
  { label: 'Inquiries', path: '/admin/inquiries', icon: <FaEnvelope /> },
  { label: 'Locations', path: '/admin/locations', icon: <FaMapMarkerAlt /> },
]

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 bg-[#111827] text-white flex flex-col
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
          ${collapsed ? 'lg:w-20' : 'lg:w-64'}
          w-72
        `}
      >
        {/* Sidebar Header */}
        <div className={`flex items-center justify-between p-4 border-b border-white/10 ${collapsed ? 'lg:justify-center' : ''}`}>
          {!collapsed && (
            <Link to="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2E7D32] rounded-lg flex items-center justify-center font-black text-sm">
                FJ
              </div>
              <span className="font-bold text-lg tracking-tight">Admin</span>
            </Link>
          )}
          {collapsed && (
            <Link to="/admin" className="hidden lg:flex">
              <div className="w-8 h-8 bg-[#2E7D32] rounded-lg flex items-center justify-center font-black text-sm">
                FJ
              </div>
            </Link>
          )}

          {/* Close (mobile) */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden w-8 h-8 flex items-center justify-center text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <FaTimes />
          </button>

          {/* Collapse (desktop) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`hidden lg:flex w-8 h-8 items-center justify-center text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-all ${collapsed ? 'rotate-180' : ''}`}
          >
            <FaChevronLeft className="text-xs" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-[#2E7D32] text-white shadow-lg shadow-[#2E7D32]/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
                ${collapsed ? 'lg:justify-center lg:px-0' : ''}
                `
              }
            >
              <span className="text-base shrink-0">{link.icon}</span>
              {!collapsed && <span className="lg:block">{link.label}</span>}
              <span className="lg:hidden block">{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Section */}
        <div className={`p-4 border-t border-white/10 ${collapsed ? 'lg:px-2' : ''}`}>
          <div className={`flex items-center gap-3 mb-3 ${collapsed ? 'lg:justify-center' : ''}`}>
            <div className="w-9 h-9 bg-[#2E7D32] rounded-full flex items-center justify-center font-bold text-sm shrink-0 uppercase">
              {user?.email?.[0] || 'A'}
            </div>
            {!collapsed && (
              <div className="min-w-0 hidden lg:block">
                <p className="text-sm font-bold truncate">{user?.email || 'Admin'}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            )}
            <div className="min-w-0 lg:hidden">
              <p className="text-sm font-bold truncate">{user?.email || 'Admin'}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all ${collapsed ? 'lg:justify-center' : ''}`}
          >
            <FaSignOutAlt className="shrink-0" />
            {!collapsed && <span className="hidden lg:block">Sign Out</span>}
            <span className="lg:hidden">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <FaBars className="text-lg" />
            </button>

            <Link to="/" className="text-sm text-gray-500 hover:text-[#2E7D32] transition-colors font-medium flex items-center gap-1.5">
              ← Back to Website
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs bg-[#E8F5E9] text-[#2E7D32] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              Admin Panel
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
