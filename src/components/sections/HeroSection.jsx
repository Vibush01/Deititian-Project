import Button from '../ui/Button'

/**
 * Reusable Hero Section component used across multiple pages.
 * Supports left-text/right-image layout or centered text with background.
 *
 * @param {string} title - Main heading
 * @param {string} subtitle - Sub-heading text
 * @param {string} ctaText - CTA button text
 * @param {string} ctaLink - CTA button link (internal route)
 * @param {string} ctaHref - CTA button link (external URL)
 * @param {string} image - Hero image URL
 * @param {string} bgColor - Background color class
 * @param {string} layout - 'split' (text left, image right) | 'centered' | 'full'
 * @param {React.ReactNode} children - Optional extra content
 * @param {string} className - Additional wrapper classes
 */
const HeroSection = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  ctaHref,
  image,
  bgColor = 'bg-primary-lighter',
  layout = 'split',
  children,
  className = '',
}) => {
  if (layout === 'centered') {
    return (
      <section className={`${bgColor} ${className}`}>
        <div className="container-custom py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark leading-tight max-w-4xl mx-auto">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-text max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
          {ctaText && (
            <div className="mt-6 md:mt-8">
              <Button to={ctaLink} href={ctaHref} size="lg">
                {ctaText}
              </Button>
            </div>
          )}
          {children}
        </div>
      </section>
    )
  }

  if (layout === 'full') {
    return (
      <section
        className={`relative overflow-hidden ${bgColor} ${className}`}
        style={image ? { backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        {image && <div className="absolute inset-0 bg-black/40" />}
        <div className="container-custom py-20 md:py-32 relative z-10 text-center">
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight max-w-4xl mx-auto ${image ? 'text-white' : 'text-dark'}`}>
            {title}
          </h1>
          {subtitle && (
            <p className={`mt-4 md:mt-6 text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${image ? 'text-white/80' : 'text-gray-text'}`}>
              {subtitle}
            </p>
          )}
          {ctaText && (
            <div className="mt-6 md:mt-8">
              <Button to={ctaLink} href={ctaHref} variant={image ? 'white' : 'primary'} size="lg">
                {ctaText}
              </Button>
            </div>
          )}
          {children}
        </div>
      </section>
    )
  }

  // Default: split layout (text left, image right)
  return (
    <section className={`${bgColor} overflow-hidden ${className}`}>
      <div className="container-custom py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-text leading-relaxed max-w-xl mx-auto lg:mx-0">
                {subtitle}
              </p>
            )}
            {ctaText && (
              <div className="mt-6 md:mt-8">
                <Button to={ctaLink} href={ctaHref} size="lg">
                  {ctaText}
                </Button>
              </div>
            )}
            {children}
          </div>

          {/* Hero Image */}
          {image && (
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-lg">
                <div className="absolute -top-4 -right-4 w-full h-full bg-primary/10 rounded-3xl" />
                <img
                  src={image}
                  alt={title}
                  className="relative z-10 w-full h-auto rounded-3xl object-cover shadow-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
