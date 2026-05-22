import { Link } from 'react-router-dom'
import { FaFacebookF, FaYoutube, FaInstagram } from 'react-icons/fa'
import { siteInfo, socialLinks, footerLinks } from '../../data/siteData'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 md:pt-24 border-t-4 border-[#2E7D32]">
      {/* Main Footer Content */}
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-gray-800">

          {/* Column 1: Logo + Tagline + Socials */}
          <div className="flex flex-col">
            <Link to="/" className="inline-block mb-6">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🌿</span>
                <div className="flex flex-col">
                  <span className="text-2xl font-extrabold text-[#4CAF50] leading-none tracking-tight">
                    FitJeeva
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mt-0.5">
                    Nourish | Transform | Thrive
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-8 pr-4">
              {siteInfo.tagline}
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#4CAF50] hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                <FaFacebookF />
              </a>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                <FaYoutube />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-500 hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-[#4CAF50] after:rounded-full">Company</h3>
            <ul className="flex flex-col gap-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  {link.path.startsWith('#') ? (
                    <span className="text-gray-400 hover:text-white transition-colors cursor-not-allowed">{link.label}</span>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#4CAF50] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Wellness Programs */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-[#4CAF50] after:rounded-full">Wellness Programs</h3>
            <ul className="flex flex-col gap-4">
              {footerLinks.wellnessPrograms.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#4CAF50] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Explore */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-[#4CAF50] after:rounded-full">Explore</h3>
            <ul className="flex flex-col gap-4">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  {link.path.startsWith('#') ? (
                    <span className="text-gray-400 hover:text-white transition-colors cursor-not-allowed">{link.label}</span>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#4CAF50] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#111] py-6">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center md:text-left text-gray-500 text-sm font-medium">
            {siteInfo.copyright}
          </p>
          <p className="text-center md:text-right text-gray-500 text-sm font-medium">
            Developed by <a href="https://vibush01.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-[#4CAF50] hover:text-white transition-colors">Vivek Kumar</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
