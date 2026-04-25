import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaChevronDown, FaChevronRight, FaCalendarWeek } from 'react-icons/fa'
import { navLinks } from '../../data/siteData'

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [openSubDropdown, setOpenSubDropdown] = useState(null)
  const dropdownRef = useRef(null)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false)
    setOpenDropdown(null)
    setOpenSubDropdown(null)
  }, [location.pathname])

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null)
        setOpenSubDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  const isActiveLink = (path) => {
    if (path === '/') return location.pathname === '/'
    if (path.startsWith('#')) return false // anchors are handled by scroll
    return location.pathname.startsWith(path)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <nav className="container-custom flex items-center h-20 md:h-24" ref={dropdownRef}>
        
        {/* Left Column (Logo) - ~25% */}
        <div className="w-1/4 flex-shrink-0 flex items-center">
          <Link to="/" className="flex items-center">
            {/* The exact site uses an image. We use text resembling it until they swap image */}
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-extrabold text-[#D61F69] leading-none">
                Dietitian Shreya&apos;s<sup className="text-xs">®</sup>
              </span>
              <span className="text-sm font-semibold text-gray-800 leading-tight">
                Family <span className="text-[#D61F69]">Diet</span> Clinic
              </span>
            </div>
          </Link>
        </div>

        {/* Center Column (Navigation) - ~50% */}
        <div className="hidden lg:flex flex-1 justify-center items-center">
          <div className="flex items-center gap-2">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group">
                {link.dropdown ? (
                  /* Dropdown trigger */
                  <button
                    className={`flex items-center gap-1 px-4 py-2 text-[15px] font-medium rounded transition-colors duration-200 cursor-pointer ${
                      isActiveLink(link.path)
                        ? 'text-[#D61F69]'
                        : 'text-gray-700 hover:text-[#D61F69]'
                    }`}
                    onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    onMouseEnter={() => setOpenDropdown(link.label)}
                  >
                    {link.label}
                    <FaChevronDown className="text-[10px]" />
                  </button>
                ) : (
                  link.path.startsWith('#') ? (
                    <a
                      href={link.path}
                      className="px-4 py-2 text-[15px] font-medium text-gray-700 hover:text-[#D61F69] rounded transition-colors duration-200 block"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `px-4 py-2 text-[15px] font-medium rounded transition-colors duration-200 block ${
                          isActive ? 'text-[#D61F69]' : 'text-gray-700 hover:text-[#D61F69]'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  )
                )}

                {/* Dropdown menu */}
                {link.dropdown && openDropdown === link.label && (
                  <div
                    className="absolute top-full left-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-t-[3px] border-[#D61F69] py-2 min-w-[240px] animate-fade-in"
                    onMouseLeave={() => {
                      setOpenDropdown(null)
                      setOpenSubDropdown(null)
                    }}
                  >
                    {link.dropdown.map((item) => (
                      <div key={item.label} className="relative group/sub">
                        {item.subItems ? (
                          <div
                            className="flex items-center justify-between px-5 py-3 text-[14px] font-medium text-gray-600 hover:text-[#D61F69] hover:bg-gray-50 cursor-pointer transition-colors"
                            onMouseEnter={() => setOpenSubDropdown(item.label)}
                          >
                            <Link to={item.path} className="flex-1">{item.label}</Link>
                            <FaChevronRight className="text-[10px]" />

                            {/* Sub-dropdown */}
                            {openSubDropdown === item.label && (
                              <div className="absolute left-full top-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-t-[3px] border-[#D61F69] py-2 min-w-[220px] animate-fade-in">
                                {item.subItems.map((sub) => (
                                  <Link
                                    key={sub.label}
                                    to={sub.path}
                                    className="block px-5 py-3 text-[14px] font-medium text-gray-600 hover:text-[#D61F69] hover:bg-gray-50 transition-colors"
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            to={item.path}
                            className="block px-5 py-3 text-[14px] font-medium text-gray-600 hover:text-[#D61F69] hover:bg-gray-50 transition-colors"
                          >
                            {item.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Button) - ~25% */}
        <div className="w-1/4 flex justify-end items-center gap-3">
          <Link 
            to="/contact-us" 
            className="hidden lg:flex items-center gap-2 bg-white text-[#D61F69] border-2 border-[#D61F69] px-6 py-2.5 rounded-md text-sm font-bold tracking-wide hover:bg-[#D61F69] hover:text-white transition-all duration-300"
          >
            <FaCalendarWeek className="text-base" />
            Book a session
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-gray-800 text-2xl cursor-pointer ml-auto"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[80px] bg-white z-40 overflow-y-auto animate-fade-in">
          <div className="p-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.dropdown ? (
                  <>
                    <button
                      className="w-full flex items-center justify-between py-3 px-4 text-base font-medium text-gray-800 border-b border-gray-100 cursor-pointer"
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    >
                      {link.label}
                      <FaChevronDown className={`text-sm transition-transform duration-200 ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>

                    {openDropdown === link.label && (
                      <div className="bg-gray-50 flex flex-col border-b border-gray-100">
                        {link.dropdown.map((item) => (
                          <div key={item.label}>
                            <Link
                              to={item.path}
                              className="block py-3 px-8 text-sm font-medium text-gray-600 border-b border-gray-100 last:border-0"
                            >
                              {item.label}
                            </Link>
                            {item.subItems && (
                              <div className="bg-gray-100/50">
                                {item.subItems.map((sub) => (
                                  <Link
                                    key={sub.label}
                                    to={sub.path}
                                    className="block py-3 px-12 text-sm font-medium text-gray-600 border-b border-gray-100 last:border-0"
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  link.path.startsWith('#') ? (
                    <a
                      href={link.path}
                      className="block py-3 px-4 text-base font-medium text-gray-800 border-b border-gray-100"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <NavLink
                      to={link.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={({ isActive }) =>
                        `block py-3 px-4 text-base font-medium border-b border-gray-100 ${
                          isActive ? 'text-[#D61F69]' : 'text-gray-800'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
