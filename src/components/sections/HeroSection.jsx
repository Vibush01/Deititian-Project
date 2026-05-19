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
      <section>
        <div>
          <h1>
            {title}
          </h1>
          {subtitle && (
            <p>
              {subtitle}
            </p>
          )}
          {ctaText && (
            <div>
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
        style={image ? { backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        {image && <div />}
        <div>
          <h1>
            {title}
          </h1>
          {subtitle && (
            <p>
              {subtitle}
            </p>
          )}
          {ctaText && (
            <div>
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
    <section>
      <div>
        <div>
          {/* Text Content */}
          <div>
            <h1>
              {title}
            </h1>
            {subtitle && (
              <p>
                {subtitle}
              </p>
            )}
            {ctaText && (
              <div>
                <Button to={ctaLink} href={ctaHref} size="lg">
                  {ctaText}
                </Button>
              </div>
            )}
            {children}
          </div>

          {/* Hero Image */}
          {image && (
            <div>
              <div>
                <div />
                <img
                  src={image}
                  alt={title}
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
