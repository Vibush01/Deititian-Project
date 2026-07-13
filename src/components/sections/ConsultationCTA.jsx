import Button from '../ui/Button'
import useSiteSettings from '../../hooks/useSiteSettings'
import fitjeevaDietitian from '../../assets/images/fitjeeva-dietitian.webp'
import fitjeevaClinical from '../../assets/images/fitjeeva-clinical.webp'

const ConsultationCTA = ({ className = '' }) => {
  const { settings } = useSiteSettings()
  
  const ctaHeading = settings.ctaHeading || "Book a Diet Consultation for Life-Changing Results"
  const ctaStat = settings.ctaStat || "35,000+"
  const ctaSubtext = settings.ctaSubtext || "people have transformed their weight loss journeys with FitJeeva."
  
  return (
    <section className={`py-12 md:py-20 px-4 md:px-8 ${className}`}>
      <div className="container-custom">
        <div className="bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 overflow-hidden relative shadow-2xl">
          {/* Decorative background shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1B5E20] opacity-30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
            {/* Images - Before/After */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative flex items-center justify-center">
                <div className="relative z-10 -mr-6 md:-mr-12 hover:z-30 hover:scale-105 transition-transform duration-300">
                  <img src={fitjeevaDietitian} alt="Before transformation" loading="lazy" className="w-40 md:w-56 h-40 md:h-56 object-cover rounded-full border-4 border-white shadow-xl grayscale" />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">Before</span>
                </div>
                <div className="relative z-20">
                  <div className="absolute inset-0 bg-[#A5D6A7] rounded-full blur-xl opacity-60"></div>
                  <img src={fitjeevaClinical} alt="After transformation" loading="lazy" className="w-48 md:w-64 h-48 md:h-64 object-cover rounded-full border-4 border-white shadow-2xl" />
                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#2E7D32] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider">After</span>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
                {ctaHeading}
              </h2>
              <p className="text-white/90 text-lg md:text-xl font-medium mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                <span className="font-black text-white bg-white/20 px-2 py-0.5 rounded mr-1">{ctaStat}</span> 
                {ctaSubtext}
              </p>
              <div>
                <Button to="/contact-us" variant="white" className="text-lg md:text-xl py-4 md:py-5 px-10 md:px-12 shadow-xl shadow-black/10">
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
