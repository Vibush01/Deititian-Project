import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaChevronDown, FaCalendarWeek, FaHeartbeat, FaStethoscope, FaPills, FaWeight, FaRunning } from 'react-icons/fa'
import { navLinks } from '../../data/siteData'

// Helper for mapping titles to icons
const getIcon = (title) => {
  if (title.includes('PCOD')) return <FaHeartbeat className="text-[#D61F69] text-xl" />
  if (title.includes('Thyroid')) return <FaStethoscope className="text-[#D61F69] text-xl" />
  if (title.includes('Diabetes')) return <FaPills className="text-[#D61F69] text-xl" />
  if (title.includes('Weight')) return <FaWeight className="text-[#D61F69] text-xl" />
  if (title.includes('Lifestyle')) return <FaRunning className="text-[#D61F69] text-xl" />
  return <FaHeartbeat className="text-[#D61F69] text-xl" />
}

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const dropdownRef = useRef(null)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false)
    setOpenDropdown(null)
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
    if (path.startsWith('#')) return false
    return location.pathname.startsWith(path)
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <nav className="container-custom flex items-center h-20 md:h-24" ref={dropdownRef}>
        
        {/* Left Column (Logo) */}
        <div className="w-1/4 flex-shrink-0 flex items-center">
          <Link to="/" className="flex items-center">
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

        {/* Center Column (Navigation) */}
        <div className="hidden lg:flex flex-1 justify-center items-center">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <div key={link.label} className="relative">
                {link.megaMenu ? (
                  /* Dropdown trigger */
                  <button
                    className={`flex items-center gap-1 py-6 text-[15px] font-bold rounded transition-colors duration-200 cursor-pointer ${
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
                      className="py-6 text-[15px] font-bold text-gray-700 hover:text-[#D61F69] rounded transition-colors duration-200 block"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `py-6 text-[15px] font-bold rounded transition-colors duration-200 block ${
                          isActive ? 'text-[#D61F69]' : 'text-gray-700 hover:text-[#D61F69]'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  )
                )}

                {/* Mega Menu Dropdown */}
                {link.megaMenu && openDropdown === link.label && (
                  <div
                    className="fixed left-0 top-[80px] md:top-[96px] w-full bg-white shadow-[0_10px_40px_rgb(0,0,0,0.1)] border-t-[1px] border-gray-100 animate-fade-in z-50 overflow-y-auto max-h-[calc(100vh-96px)]"
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div className="container-custom py-10">
                      <div className="grid grid-cols-3 gap-12">
                        
                        {/* Column 1 */}
                        <div>
                          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
                            <FaHeartbeat className="text-[#D61F69] text-2xl" />
                            <h3 className="text-xl font-bold text-gray-800">{link.megaMenu.column1.title}</h3>
                          </div>
                          <div className="flex flex-col gap-6">
                            {link.megaMenu.column1.items.map(item => (
                              <Link key={item.label} to={item.path} className="group flex gap-4 hover:bg-gray-50 p-2 rounded-lg transition-colors -ml-2">
                                <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-pink-100 transition-colors">
                                  {getIcon(item.label)}
                                </div>
                                <div>
                                  <h4 className="font-bold text-gray-800 text-[15px] mb-1 group-hover:text-[#D61F69] transition-colors">{item.label}</h4>
                                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <Link to={link.megaMenu.column1.action.path} className="inline-block mt-6 bg-[#FFF0F5] text-[#D61F69] font-bold px-6 py-2.5 rounded-md hover:bg-[#FFE4EE] transition-colors text-sm">
                            {link.megaMenu.column1.action.label}
                          </Link>
                        </div>

                        {/* Column 2 */}
                        <div className="border-l border-r border-gray-100 px-12">
                          {link.megaMenu.column2.map((section, idx) => (
                            <div key={section.title} className={idx > 0 ? "mt-10" : ""}>
                              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
                                {idx === 0 ? <FaWeight className="text-[#D61F69] text-2xl" /> : <FaHeartbeat className="text-[#D61F69] text-2xl" />}
                                <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
                              </div>
                              <div className="flex flex-col gap-6">
                                {section.items.map(item => (
                                  <Link key={item.label} to={item.path} className="group flex gap-4 hover:bg-gray-50 p-2 rounded-lg transition-colors -ml-2">
                                    <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-pink-100 transition-colors">
                                      {getIcon(item.label)}
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-gray-800 text-[15px] mb-1 group-hover:text-[#D61F69] transition-colors">{item.label}</h4>
                                      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Column 3 */}
                        <div>
                          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
                            <FaStethoscope className="text-[#D61F69] text-2xl" />
                            <h3 className="text-xl font-bold text-gray-800">{link.megaMenu.column3.title}</h3>
                          </div>
                          <div className="rounded-2xl overflow-hidden mb-6 shadow-md border border-gray-100">
                            <img src={link.megaMenu.column3.image} alt="Success Stories" className="w-full h-48 object-cover" />
                          </div>
                          <div className="flex gap-3 mb-6">
                            {link.megaMenu.column3.buttons.map(btn => (
                              <Link key={btn.label} to={btn.path} className={`text-xs font-bold px-4 py-2 rounded-md text-white transition-opacity hover:opacity-90 ${btn.type === 'pink' ? 'bg-[#D61F69]' : 'bg-green-600'}`}>
                                {btn.label}
                              </Link>
                            ))}
                          </div>
                          <h4 className="font-bold text-gray-800 text-[16px] mb-2">{link.megaMenu.column3.storyTitle}</h4>
                          <p className="text-sm text-gray-500 leading-relaxed">{link.megaMenu.column3.storyDesc}</p>
                        </div>

                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Button) */}
        <div className="w-1/4 flex justify-end items-center gap-3">
          <Link 
            to="/contact-us" 
            className="hidden lg:flex items-center gap-2 bg-[#D61F69] text-white border-2 border-[#D61F69] px-6 py-2.5 rounded-full text-sm font-bold tracking-wide hover:bg-white hover:text-[#D61F69] transition-all duration-300 shadow-[0_4px_14px_rgba(214,31,105,0.39)]"
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
                {link.megaMenu ? (
                  <>
                    <button
                      className="w-full flex items-center justify-between py-3 px-4 text-base font-bold text-gray-800 border-b border-gray-100 cursor-pointer"
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    >
                      {link.label}
                      <FaChevronDown className={`text-sm transition-transform duration-200 ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>

                    {openDropdown === link.label && (
                      <div className="bg-gray-50 flex flex-col border-b border-gray-100 p-4 gap-6">
                        {/* Simple mobile mapping of mega menu items */}
                        <div>
                          <h3 className="font-bold text-[#D61F69] mb-3">{link.megaMenu.column1.title}</h3>
                          {link.megaMenu.column1.items.map(item => (
                            <Link key={item.label} to={item.path} className="block py-2 text-sm text-gray-600 font-medium border-b border-gray-200 last:border-0" onClick={() => setIsMobileOpen(false)}>
                              {item.label}
                            </Link>
                          ))}
                        </div>
                        {link.megaMenu.column2.map(section => (
                          <div key={section.title}>
                            <h3 className="font-bold text-[#D61F69] mb-3">{section.title}</h3>
                            {section.items.map(item => (
                              <Link key={item.label} to={item.path} className="block py-2 text-sm text-gray-600 font-medium border-b border-gray-200 last:border-0" onClick={() => setIsMobileOpen(false)}>
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  link.path.startsWith('#') ? (
                    <a
                      href={link.path}
                      className="block py-3 px-4 text-base font-bold text-gray-800 border-b border-gray-100"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <NavLink
                      to={link.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={({ isActive }) =>
                        `block py-3 px-4 text-base font-bold border-b border-gray-100 ${
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
            <div className="p-4 mt-4">
               <Link 
                to="/contact-us" 
                onClick={() => setIsMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#D61F69] text-white py-3 rounded-full text-base font-bold tracking-wide"
              >
                Book a session
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
