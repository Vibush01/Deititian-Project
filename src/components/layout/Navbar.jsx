import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaChevronDown, FaChevronRight } from 'react-icons/fa'
import { navLinks } from '../../data/siteData'
import Button from '../ui/Button'

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
    return location.pathname.startsWith(path)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-[var(--shadow-navbar)]' : ''
      }`}
    >
      <nav className="container-custom flex items-center justify-between h-16 md:h-20" ref={dropdownRef}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-extrabold text-primary leading-tight">
              Dietitian Shreya&apos;s<sup className="text-xs">®</sup>
            </span>
            <span className="text-xs md:text-sm font-semibold text-dark-soft leading-tight">
              Family <span className="text-primary">Diet</span> Clinic
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div key={link.label} className="relative">
              {link.dropdown ? (
                /* Dropdown trigger */
                <button
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                    isActiveLink(link.path)
                      ? 'text-primary'
                      : 'text-dark-soft hover:text-primary'
                  }`}
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  onMouseEnter={() => setOpenDropdown(link.label)}
                >
                  {link.label.replace('-', ' ').toUpperCase()}
                  <FaChevronDown className={`text-xs transition-transform duration-200 ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 block ${
                      isActive ? 'text-primary' : 'text-dark-soft hover:text-primary'
                    }`
                  }
                >
                  {link.label.replace('-', ' ').toUpperCase()}
                </NavLink>
              )}

              {/* Dropdown menu */}
              {link.dropdown && openDropdown === link.label && (
                <div
                  className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-border py-2 min-w-[220px] animate-fade-in"
                  onMouseLeave={() => {
                    setOpenDropdown(null)
                    setOpenSubDropdown(null)
                  }}
                >
                  {link.dropdown.map((item) => (
                    <div key={item.label} className="relative">
                      {item.subItems ? (
                        <div
                          className="flex items-center justify-between px-4 py-2.5 text-sm text-dark-soft hover:text-primary hover:bg-primary-lighter cursor-pointer transition-all"
                          onMouseEnter={() => setOpenSubDropdown(item.label)}
                        >
                          <Link to={item.path} className="flex-1">{item.label}</Link>
                          <FaChevronRight className="text-xs ml-2" />

                          {/* Sub-dropdown */}
                          {openSubDropdown === item.label && (
                            <div className="absolute left-full top-0 ml-1 bg-white rounded-xl shadow-lg border border-gray-border py-2 min-w-[180px] animate-fade-in">
                              {item.subItems.map((sub) => (
                                <Link
                                  key={sub.label}
                                  to={sub.path}
                                  className="block px-4 py-2.5 text-sm text-dark-soft hover:text-primary hover:bg-primary-lighter transition-all"
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
                          className="block px-4 py-2.5 text-sm text-dark-soft hover:text-primary hover:bg-primary-lighter transition-all"
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

        {/* Desktop CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Button to="/contact-us" size="sm" className="hidden lg:inline-flex animate-pulse-glow">
            Book a session
          </Button>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-dark text-xl cursor-pointer"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto animate-fade-in">
          <div className="p-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.dropdown ? (
                  <>
                    <button
                      className="w-full flex items-center justify-between py-3 px-4 text-base font-semibold text-dark-soft rounded-lg hover:bg-primary-lighter transition-all cursor-pointer"
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    >
                      {link.label.replace('-', ' ').toUpperCase()}
                      <FaChevronDown className={`text-sm transition-transform duration-200 ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>

                    {openDropdown === link.label && (
                      <div className="ml-4 border-l-2 border-primary-light pl-4 mb-2">
                        {link.dropdown.map((item) => (
                          <div key={item.label}>
                            <Link
                              to={item.path}
                              className="block py-2.5 text-sm text-gray-text hover:text-primary transition-colors"
                            >
                              {item.label}
                            </Link>
                            {item.subItems && (
                              <div className="ml-4 border-l-2 border-primary-light/50 pl-3">
                                {item.subItems.map((sub) => (
                                  <Link
                                    key={sub.label}
                                    to={sub.path}
                                    className="block py-2 text-sm text-gray-text hover:text-primary transition-colors"
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
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block py-3 px-4 text-base font-semibold rounded-lg transition-all ${
                        isActive ? 'text-primary bg-primary-lighter' : 'text-dark-soft hover:bg-primary-lighter'
                      }`
                    }
                  >
                    {link.label.replace('-', ' ').toUpperCase()}
                  </NavLink>
                )}
              </div>
            ))}

            {/* Mobile CTA */}
            <div className="mt-4 pt-4 border-t border-gray-border">
              <Button to="/contact-us" className="w-full animate-pulse-glow">
                Book a session
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
