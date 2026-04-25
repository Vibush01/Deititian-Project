import { Link } from 'react-router-dom'
import { FaFacebookF, FaYoutube, FaInstagram } from 'react-icons/fa'
import { siteInfo, socialLinks, footerLinks } from '../../data/siteData'

const Footer = () => {
  return (
    <footer className="bg-primary-lighter">
      {/* Main Footer Content */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1: Logo + Tagline + Socials */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-primary leading-tight">
                  Dietitian Shreya&apos;s<sup className="text-xs">®</sup>
                </span>
                <span className="text-sm font-semibold text-dark-soft leading-tight">
                  Family <span className="text-primary">Diet</span> Clinic
                </span>
              </div>
            </Link>

            <p className="text-sm text-gray-text leading-relaxed mb-6 max-w-xs">
              {siteInfo.tagline}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-sm" />
              </a>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-colors duration-300"
                aria-label="YouTube"
              >
                <FaYoutube className="text-sm" />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="text-sm" />
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="text-base font-bold mb-4 text-dark">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  {link.path.startsWith('#') ? (
                    <span className="text-sm text-gray-text cursor-default">{link.label}</span>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-sm text-gray-text hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Wellness Programs */}
          <div>
            <h3 className="text-base font-bold mb-4 text-dark">Wellness Programs</h3>
            <ul className="space-y-2.5">
              {footerLinks.wellnessPrograms.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-text hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Explore */}
          <div>
            <h3 className="text-base font-bold mb-4 text-dark">Explore</h3>
            <ul className="space-y-2.5">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  {link.path.startsWith('#') ? (
                    <span className="text-sm text-gray-text cursor-default">{link.label}</span>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-sm text-gray-text hover:text-primary transition-colors duration-200"
                    >
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
      <div className="border-t border-primary/10">
        <div className="container-custom py-5 text-center">
          <p className="text-xs text-gray-text">
            {siteInfo.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
