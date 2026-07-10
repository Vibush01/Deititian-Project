import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaChevronDown, FaHeartbeat, FaStethoscope, FaPills, FaWeight, FaRunning, FaCalendarWeek, FaFireAlt } from 'react-icons/fa'
import useNavigation from '../../hooks/useNavigation'
import useSiteSettings from '../../hooks/useSiteSettings'
import Button from '../ui/Button'
import logoImg from '../../assets/images/logo.png'

// Helper for mapping titles to icons
const getIcon = (title) => {
  if (title.includes('PCOD')) return <FaHeartbeat className="text-[#2E7D32] text-xl" />
  if (title.includes('Thyroid')) return <FaStethoscope className="text-[#2E7D32] text-xl" />
  if (title.includes('Diabetes')) return <FaPills className="text-[#2E7D32] text-xl" />
  if (title.includes('Weight Loss')) return <FaWeight className="text-[#2E7D32] text-xl" />
  if (title.includes('Weight Gain')) return <FaWeight className="text-[#2E7D32] text-xl" />
  if (title.includes('Lifestyle')) return <FaRunning className="text-[#2E7D32] text-xl" />
  return <FaHeartbeat className="text-[#2E7D32] text-xl" />
}

const Navbar = () => {
  const { navLinks } = useNavigation()
  const { settings } = useSiteSettings()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const dropdownRef = useRef(null)
  const location = useLocation()

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
    setOpenDropdown(null)
  }, [location.pathname])

  const isActiveLink = (path) => {
    if (path === '/') return location.pathname === '/'
    if (path.startsWith('#')) return false
    return location.pathname.startsWith(path)
  }

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <nav ref={dropdownRef} className="container-custom flex items-center justify-between h-16 md:h-20">
        {/* Left Column (Logo) */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center">
            <img src={settings.siteInfo?.logoUrl || logoImg} alt="FitJeeva Logo" className="h-10 md:h-14 w-auto object-contain" />
          </Link>
        </div>

        {/* Center Column (Navigation - Desktop) */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div 
              key={link.label} 
              className="relative group"
              onMouseEnter={() => setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {link.megaMenu ? (
                <Link 
                  to={link.path}
                  className={`flex items-center gap-1.5 text-sm font-bold transition-colors py-8 ${isActiveLink(link.path) || openDropdown === link.label ? 'text-[#2E7D32]' : 'text-gray-700 group-hover:text-[#2E7D32]'}`}
                >
                  {link.label}
                  <FaChevronDown className={`text-[10px] mt-0.5 transition-transform duration-200 ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                </Link>
              ) : link.path.startsWith('#') ? (
                <a href={link.path} className="text-sm font-bold text-gray-700 hover:text-[#2E7D32] transition-colors py-8 block">
                  {link.label}
                </a>
              ) : (
                <NavLink 
                  to={link.path} 
                  className={({isActive}) => `text-sm font-bold transition-colors py-8 block ${isActive ? 'text-[#2E7D32]' : 'text-gray-700 hover:text-[#2E7D32]'}`}
                >
                  {link.label}
                </NavLink>
              )}

              {/* Mega Menu Dropdown */}
              {link.megaMenu && openDropdown === link.label && (
                <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[1000px] bg-white shadow-2xl border border-gray-100 rounded-xl p-8 z-50">
                  <div className="grid grid-cols-3 gap-8">
                    
                    {/* Column 1: Disease Management */}
                    <div className="border-r border-gray-100 pr-6">
                      <h3 className="font-bold text-lg text-gray-700 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                        <FaHeartbeat className="text-[#2E7D32]" /> {link.megaMenu.column1.title}
                      </h3>
                      <ul className="space-y-6">
                        {link.megaMenu.column1.items.map(item => (
                          <li key={item.label}>
                            <Link to={item.path} className="flex items-start gap-3 group/item">
                              <div className="w-10 h-10 rounded-lg bg-[#E8F5E9] flex items-center justify-center shrink-0 group-hover/item:bg-[#C8E6C9] transition-colors">
                                {getIcon(item.label)}
                              </div>
                              <div>
                                <span className="block font-bold text-gray-800 text-sm mb-1">{item.label}</span>
                                <span className="text-xs text-gray-500 leading-tight block">{item.desc}</span>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6">
                        <Link to={link.megaMenu.column1.action.path} className="inline-block bg-[#E8F5E9] text-[#2E7D32] font-bold text-sm px-6 py-2 rounded-lg hover:bg-[#C8E6C9] transition-colors">
                          {link.megaMenu.column1.action.label}
                        </Link>
                      </div>
                    </div>

                    {/* Column 2: Weight & Lifestyle Management */}
                    <div className="border-r border-gray-100 pr-6">
                      {link.megaMenu.column2.map((section, idx) => (
                        <div key={idx} className={idx > 0 ? "mt-8" : ""}>
                          <h3 className="font-bold text-lg text-gray-700 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                            {idx === 0 ? <FaFireAlt className="text-[#2E7D32]" /> : <FaHeartbeat className="text-[#2E7D32]" />}
                            {section.title}
                          </h3>
                          <ul className="space-y-6">
                            {section.items.map(item => (
                              <li key={item.label}>
                                <Link to={item.path} className="flex items-start gap-3 group/item">
                                  <div className="w-10 h-10 rounded-lg bg-[#E8F5E9] flex items-center justify-center shrink-0 group-hover/item:bg-[#C8E6C9] transition-colors">
                                    {getIcon(item.label)}
                                  </div>
                                  <div>
                                    <span className="block font-bold text-gray-800 text-sm mb-1">{item.label}</span>
                                    <span className="text-xs text-gray-500 leading-tight block">{item.desc}</span>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Column 3: Success Stories */}
                    <div>
                      <h3 className="font-bold text-lg text-gray-700 border-b border-gray-100 pb-3 mb-4 flex items-center gap-2">
                        <FaStethoscope className="text-[#2E7D32]" /> {link.megaMenu.column3.title}
                      </h3>
                      <div className="rounded-xl overflow-hidden mb-4 border border-gray-200 bg-gray-50 flex items-center justify-center h-48 p-2">
                        <img src={link.megaMenu.column3.image} alt="Success Story" className="w-full h-full object-contain rounded-lg shadow-sm" />
                      </div>
                      <div className="flex gap-2 mb-4">
                        {link.megaMenu.column3.buttons.map((btn, idx) => (
                          <Link 
                            key={idx} 
                            to={btn.path} 
                            className={`flex-1 text-center text-xs font-bold py-2 rounded-lg transition-colors ${btn.type === 'primary' ? 'bg-[#2E7D32] text-white hover:bg-[#1B5E20]' : 'bg-[#2E7D32] text-white hover:bg-[#1B5E20]'}`}
                          >
                            {btn.label}
                          </Link>
                        ))}
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 mb-1">{link.megaMenu.column3.storyTitle}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{link.megaMenu.column3.storyDesc}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Column (Button & Mobile Toggle) */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <Link to="/contact-us" className="inline-flex items-center gap-2 bg-[#2E7D32] text-white font-bold text-sm px-6 py-2.5 rounded-full hover:bg-[#1B5E20] transition-colors shadow-md">
              <FaCalendarWeek />
              Book a session
            </Link>
          </div>
          
          <button 
            className="lg:hidden text-2xl text-gray-800 p-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 p-4 max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <div key={link.label} className="border-b border-gray-100 last:border-0 pb-2">
                <div className="flex items-center justify-between">
                  <Link 
                    to={link.path || '#'} 
                    onClick={() => setIsMobileOpen(false)}
                    className="block flex-grow font-bold text-gray-800 py-3 px-2 hover:text-[#2E7D32] hover:bg-gray-50 rounded"
                  >
                    {link.label}
                  </Link>
                  {link.megaMenu && (
                    <button 
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                      className="p-3 text-gray-500 hover:text-[#2E7D32]"
                    >
                      <FaChevronDown className={`transition-transform duration-200 ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
                
                {/* Mobile Subservices Accordion */}
                {link.megaMenu && openDropdown === link.label && (
                  <div className="pl-4 pb-3 space-y-4 bg-gray-50 p-3 rounded-lg mb-2">
                    <div>
                      <h4 className="font-bold text-sm text-[#2E7D32] mb-2">{link.megaMenu.column1.title}</h4>
                      <ul className="space-y-2 pl-2">
                        {link.megaMenu.column1.items.map(item => (
                          <li key={item.label}>
                            <Link to={item.path} onClick={() => setIsMobileOpen(false)} className="text-sm text-gray-600 hover:text-[#2E7D32] block py-1">{item.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {link.megaMenu.column2.map((section, idx) => (
                      <div key={idx}>
                        <h4 className="font-bold text-sm text-[#2E7D32] mb-2">{section.title}</h4>
                        <ul className="space-y-2 pl-2">
                          {section.items.map(item => (
                            <li key={item.label}>
                              <Link to={item.path} onClick={() => setIsMobileOpen(false)} className="text-sm text-gray-600 hover:text-[#2E7D32] block py-1">{item.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Link to="/contact-us" onClick={() => setIsMobileOpen(false)} className="flex items-center justify-center gap-2 bg-[#2E7D32] text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-[#1B5E20] transition-colors shadow-md w-full">
                <FaCalendarWeek />
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
