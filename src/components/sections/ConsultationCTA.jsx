import Button from '../ui/Button'

/**
 * Pink gradient CTA banner — "Book a Diet Consultation for Life-Changing Results"
 * Appears on almost every page of the original site.
 *
 * @param {string} className - Additional wrapper classes
 */
const ConsultationCTA = ({ className = '' }) => {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div className="gradient-pink py-12 md:py-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Images - Before/After */}
            <div className="flex gap-4 flex-shrink-0">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&h=280&fit=crop"
                  alt="Before transformation"
                  className="w-36 md:w-44 h-48 md:h-60 object-cover rounded-2xl shadow-lg"
                />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 text-dark text-xs font-bold px-3 py-1 rounded-full">
                  Before
                </span>
              </div>
              <div className="relative mt-6">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=280&fit=crop"
                  alt="After transformation"
                  className="w-36 md:w-44 h-48 md:h-60 object-cover rounded-2xl shadow-lg"
                />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 text-dark text-xs font-bold px-3 py-1 rounded-full">
                  After
                </span>
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center lg:text-left flex-1">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                Book a Diet Consultation for Life-Changing Results
              </h2>
              <p className="mt-4 text-white/80 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                <span className="font-bold text-white">35,000+</span> people have
                transformed their weight loss journeys with Dietitian Shreya.
              </p>
              <div className="mt-6">
                <Button to="/contact-us" variant="white" size="lg">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConsultationCTA
