/**
 * Reusable section heading with optional pink label tag and subtitle.
 * Matches the pattern used across all pages on dietitianshreya.com.
 *
 * @param {string} label - Pink uppercase tag text (e.g. "OUR DIET CLINIC CHAIN")
 * @param {string} title - Large bold heading
 * @param {string} subtitle - Optional paragraph below heading
 * @param {string} align - 'left' | 'center' | 'right'
 * @param {boolean} dark - If true, uses white text (for dark/gradient backgrounds)
 * @param {string} className - Additional wrapper classes
 */
const SectionHeading = ({
  label,
  title,
  subtitle,
  align = 'center',
  dark = false,
  className = '',
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <div className={`mb-8 md:mb-12 ${alignClasses[align]} ${className}`}>
      {label && (
        <span className="section-label">
          {label}
        </span>
      )}
      {title && (
        <h2
          className={`text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mt-2 ${
            dark ? 'text-white' : 'text-dark'
          }`}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={`mt-4 text-base md:text-lg max-w-3xl leading-relaxed ${
            align === 'center' ? 'mx-auto' : ''
          } ${dark ? 'text-white/80' : 'text-gray-text'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
