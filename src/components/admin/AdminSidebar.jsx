import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  FaTachometerAlt, FaCog, FaCompass, FaFileAlt, FaConciergeBell,
  FaUsers, FaUserMd, FaUtensils, FaTrophy, FaEnvelope, FaMapMarkerAlt, FaSignOutAlt, FaChevronLeft, FaBriefcase, FaImage, FaChevronDown, FaChevronRight
} from 'react-icons/fa'

const sidebarGroups = [
  {
    links: [
      { label: 'Dashboard', path: '/admin', icon: <FaTachometerAlt />, end: true },
    ]
  },
  {
    title: 'CONTENT',
    links: [
      { 
        label: 'Pages', 
        icon: <FaFileAlt />, 
        subLinks: [
          { label: 'Home Page', path: '/admin/pages/home' },
          { label: 'About Page', path: '/admin/pages/about' },
          { label: 'Contact Page', path: '/admin/pages/contact' },
          { label: 'Privacy Policy', path: '/admin/pages/privacy' },
        ]
      },
      { label: 'Services', path: '/admin/services', icon: <FaConciergeBell /> },
      { label: 'Careers', path: '/admin/careers', icon: <FaBriefcase /> },
    ]
  },
  {
    title: 'PEOPLE',
    links: [
      { label: 'Team & Experts', path: '/admin/team', icon: <FaUsers /> },
    ]
  },
  {
    title: 'SHOWCASE',
    links: [
      { label: 'Success Stories', path: '/admin/success-stories', icon: <FaTrophy /> },
      { label: 'Recipes', path: '/admin/recipes', icon: <FaUtensils /> },
      { label: 'Media', path: '/admin/media', icon: <FaImage /> },
    ]
  },
  {
    title: 'MANAGEMENT',
    links: [
      { label: 'Locations', path: '/admin/locations', icon: <FaMapMarkerAlt /> },
      { label: 'Inquiries', path: '/admin/inquiries', icon: <FaEnvelope /> },
      { label: 'Site Settings', path: '/admin/site-settings', icon: <FaCog /> },
    ]
  }
]

const AdminSidebar = ({ sidebarOpen, setSidebarOpen, collapsed, setCollapsed, onLogout }) => {
  const location = useLocation()
  
  // Track open state of dropdowns (by label)
  const [openGroups, setOpenGroups] = useState({
    'Pages': location.pathname.includes('/admin/pages')
  })

  const toggleGroup = (label) => {
    if (collapsed) {
      setCollapsed(false)
      setOpenGroups({ [label]: true })
    } else {
      setOpenGroups(prev => ({ ...prev, [label]: !prev[label] }))
    }
  }

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
          <nav className="space-y-6 px-3">
            {sidebarGroups.map((group, groupIdx) => (
              <div key={groupIdx}>
                {group.title && !collapsed && (
                  <div className="px-3 mb-2 text-[10px] font-bold tracking-widest text-gray-500">
                    {group.title}
                  </div>
                )}
                {group.title && collapsed && groupIdx > 0 && (
                  <div className="px-3 mb-2 text-center text-gray-500 border-t border-white/5 pt-4 mt-2">
                    <span className="w-4 h-0.5 bg-white/10 block mx-auto rounded-full"></span>
                  </div>
                )}
                <div className="space-y-1">
                  {group.links.map((link) => {
                    if (link.subLinks) {
                      const isActiveGroup = link.subLinks.some(sub => location.pathname === sub.path)
                      const isOpen = openGroups[link.label]
                      return (
                        <div key={link.label} className="space-y-1">
                          <button
                            onClick={() => toggleGroup(link.label)}
                            className={`
                              w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors
                              ${isActiveGroup && !isOpen
                                ? 'bg-white/5 text-white font-medium' 
                                : 'text-gray-400 hover:bg-white/10 hover:text-white'
                              }
                              ${collapsed ? 'justify-center' : ''}
                            `}
                            title={collapsed ? link.label : ''}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`${collapsed ? 'text-xl' : 'text-lg'} ${isActiveGroup ? 'text-[#4CAF50]' : ''}`}>
                                {link.icon}
                              </div>
                              {!collapsed && <span>{link.label}</span>}
                            </div>
                            {!collapsed && (
                              <div className="text-xs text-gray-500">
                                {isOpen ? <FaChevronDown /> : <FaChevronRight />}
                              </div>
                            )}
                          </button>
                          
                          {isOpen && !collapsed && (
                            <div className="pl-11 pr-2 py-1 space-y-1">
                              {link.subLinks.map(sub => (
                                <NavLink
                                  key={sub.path}
                                  to={sub.path}
                                  onClick={() => setSidebarOpen(false)}
                                  className={({ isActive }) => `
                                    block px-3 py-2 rounded-md text-sm transition-colors
                                    ${isActive 
                                      ? 'bg-[#2E7D32] text-white font-medium shadow-sm shadow-[#2E7D32]/20' 
                                      : 'text-gray-400 hover:bg-white/10 hover:text-white'
                                    }
                                  `}
                                >
                                  {sub.label}
                                </NavLink>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    }
                    
                    return (
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
                    )
                  })}
                </div>
              </div>
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
