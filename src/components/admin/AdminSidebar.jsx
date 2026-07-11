import { Link, NavLink } from 'react-router-dom'
import {
  FaTachometerAlt, FaCog, FaCompass, FaFileAlt, FaConciergeBell,
  FaUsers, FaUserMd, FaUtensils, FaTrophy, FaEnvelope, FaMapMarkerAlt, FaSignOutAlt, FaChevronLeft, FaBriefcase, FaImage
} from 'react-icons/fa'

const sidebarLinks = [
  { label: 'Dashboard', path: '/admin', icon: <FaTachometerAlt />, end: true },
  { label: 'Site Settings', path: '/admin/site-settings', icon: <FaCog /> },
  { label: 'Home Page', path: '/admin/pages/home', icon: <FaFileAlt /> },
  { label: 'About Page', path: '/admin/pages/about', icon: <FaFileAlt /> },
  { label: 'Services', path: '/admin/services', icon: <FaConciergeBell /> },
  { label: 'Careers', path: '/admin/careers', icon: <FaBriefcase /> },
  { label: 'Team', path: '/admin/team', icon: <FaUsers /> },
  { label: 'Experts', path: '/admin/experts', icon: <FaUserMd /> },
  { label: 'Recipes', path: '/admin/recipes', icon: <FaUtensils /> },
  { label: 'Success Stories', path: '/admin/success-stories', icon: <FaTrophy /> },
  { label: 'Inquiries', path: '/admin/inquiries', icon: <FaEnvelope /> },
  { label: 'Locations', path: '/admin/locations', icon: <FaMapMarkerAlt /> },
  { label: 'Media', path: '/admin/media', icon: <FaImage /> },
]

const AdminSidebar = ({ sidebarOpen, setSidebarOpen, collapsed, setCollapsed, onLogout }) => {
  return (
    <>
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
              <div className="w-8 h-8 bg-[#2E7D32] rounded-lg flex items-center justify-center font-bold text-lg">
                F
              </div>
              <span className="font-bold text-xl tracking-wide">FitJeeva</span>
            </Link>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-[#2E7D32] rounded-lg flex items-center justify-center font-bold text-lg">
              F
            </div>
          )}
          
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-8 h-8 items-center justify-center rounded hover:bg-white/10 text-gray-400 transition-colors"
          >
            <FaChevronLeft className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <nav className="space-y-1 px-3">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-[#2E7D32] text-white font-medium shadow-md shadow-[#2E7D32]/20' 
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                  }
                  ${collapsed ? 'justify-center' : ''}
                `}
                title={collapsed ? link.label : ''}
              >
                <div className={`${collapsed ? 'text-xl' : 'text-lg'}`}>
                  {link.icon}
                </div>
                {!collapsed && <span>{link.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer / User area */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={onLogout}
            className={`
              flex items-center gap-3 w-full px-3 py-2.5 rounded-lg
              text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors
              ${collapsed ? 'justify-center' : ''}
            `}
            title={collapsed ? 'Logout' : ''}
          >
            <FaSignOutAlt className={`${collapsed ? 'text-xl' : 'text-lg'}`} />
            {!collapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar
