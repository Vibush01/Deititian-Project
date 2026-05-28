import { FaPhoneAlt } from 'react-icons/fa'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import StatsCounter from '../components/sections/StatsCounter'
import ConsultationCTA from '../components/sections/ConsultationCTA'
import InstagramFeed from '../components/sections/InstagramFeed'
import ContactCTA from '../components/sections/ContactCTA'
import ConsultationForm from '../components/sections/ConsultationForm'
import TeamShowcase from '../components/sections/TeamShowcase'
import { aboutIntro, philosophySections, coreServices } from '../data/aboutData'
import { siteInfo } from '../data/siteData'
import useDocumentMeta from '../hooks/useDocumentMeta'
import fitjeevaDietitian from '../assets/images/fitjeeva-dietitian.jpg'
import fitjeevaClinical from '../assets/images/fitjeeva-clinical.jpg'
import fitjeevaHomevisit from '../assets/images/fitjeeva-homevisit.jpg'
import fitjeevaMillet from '../assets/images/fitjeeva-millet.jpg'
import fitjeevaBanner from '../assets/images/fitjeeva-banner-1.jpg'

const AboutHero = () => (
  <section className="py-12 md:py-20 bg-gray-50 overflow-hidden relative">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8F5E9]/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
    <div className="container-custom relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Text */}
        <div className="w-full lg:w-1/2">
          <span className="inline-block bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            About Us
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            {aboutIntro.title}
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-4 leading-relaxed">
            As a premier clinical nutrition practice, FitJeeva brings expert guidance to the forefront of global wellness. We are a Medical Nutrition Clinic dedicated to your well-being, specializing in disease management and lifestyle transformation through a signature farm-to-plate nutrition philosophy.
          </p>
          <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
            FitJeeva is the trusted name behind a growing nutrition clinic chain across India. Our approach is defined by an ethical, medicine-free diet and kitchen-based nutrition expert care, proving that true healing begins at home.
          </p>
          <div>
            <Button
              to="/contact-us"
              icon={<FaPhoneAlt />}
              className="bg-[#2E7D32] hover:bg-[#1B5E20]"
            >
              Talk to us
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white z-10">
            <img
              src={fitjeevaDietitian}
              alt="FitJeeva Team"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#C8E6C9] rounded-full blur-2xl -z-10"></div>
          <div className="absolute -top-6 -right-6 w-40 h-40 bg-[#A5D6A7] rounded-full blur-3xl -z-10"></div>
        </div>
      </div>
    </div>
  </section>
)

const SubtitleIntro = () => (
  <section className="py-12 md:py-16 bg-white">
    <div className="container-custom max-w-4xl text-center">
      <h2 className="text-2xl md:text-3xl font-extrabold text-[#2E7D32] mb-6 leading-tight">
        {aboutIntro.subtitle}
      </h2>
      <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
        {aboutIntro.bio}
      </p>
    </div>
  </section>
)

const philosophyImages = [
  fitjeevaClinical,
  fitjeevaMillet,
  fitjeevaHomevisit,
  fitjeevaBanner,
  fitjeevaDietitian,
]

const PhilosophySection = () => (
  <section className="py-12 md:py-16 bg-gray-50 border-y border-gray-100">
    <div className="container-custom">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Our Philosophy</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">The core principles that guide our approach to holistic health and sustainable nutrition.</p>
      </div>
      <div className="flex flex-col gap-12 md:gap-20">
        {philosophySections.map((section, i) => {
          const isReversed = i % 2 !== 0
          return (
            <div key={section.number} className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16`}>
              <div className="w-full md:w-1/2">
                <span className="text-6xl md:text-8xl font-black text-gray-200/50 block mb-2 -ml-2">{section.number}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 relative z-10 -mt-8">{section.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed">{section.description}</p>
              </div>
              <div className="w-full md:w-1/2">
                <div className="rounded-3xl overflow-hidden shadow-lg border-4 border-white transform transition-transform hover:scale-105 duration-500">
                  <img src={philosophyImages[i]} alt={section.title} className="w-full h-[300px] object-cover" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </section>
)

const CoreServicesSection = () => (
  <section className="py-12 md:py-20 bg-white">
    <div className="container-custom">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Core Services</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive wellness solutions designed to transform your lifestyle.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {coreServices.map((service, i) => (
          <div key={service.number} className="bg-gray-50 rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <div className="h-48 md:h-56 overflow-hidden relative">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#2E7D32] font-black w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                {service.number}
              </div>
            </div>
            <div className="p-6 md:p-8 flex flex-col flex-grow">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#2E7D32] transition-colors">{service.title}</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 flex-grow">{service.description}</p>
              {service.number === '04' && (
                <div className="mt-auto">
                  <Button to="/careers" size="sm" className="bg-[#2E7D32] hover:bg-[#1B5E20]">Join now</Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const JoinMissionCTA = () => (
  <section className="py-12 md:py-20 bg-[#2E7D32] text-white">
    <div className="container-custom">
      <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
            Are you passionate about making healthier living accessible for all?
          </h2>
          <p className="text-white/90 text-lg mb-8 leading-relaxed max-w-lg">
            Join our mission to help the world lead happier, healthier lives through good habits and better nutrition.
          </p>
          <Button to="/careers" variant="white" className="text-[#2E7D32]">
            Apply Now
          </Button>
        </div>
        <div className="w-full md:w-1/2">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
            <img src={fitjeevaHomevisit} alt="Join our team" className="w-full h-[300px] md:h-[400px] object-cover" />
          </div>
        </div>
      </div>
    </div>
  </section>
)

const MediaSpotlight = () => (
  <section className="py-12 md:py-16 bg-gray-50 text-center">
    <div className="container-custom max-w-4xl">
      <span className="inline-block bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">Media Spotlight</span>
      <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
        Featured in Hindustan Times, Chandigarh Tribune & Yugmarg for outstanding contributions to clinical nutrition and wellness education.
      </h3>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-base md:text-lg">
        Want to join them? Reach out to our diet expert now to chart the best weight loss journey to your fitness goals!
      </p>
      <Button to="/contact-us" className="bg-[#2E7D32] hover:bg-[#1B5E20]">Join now</Button>
    </div>
  </section>
)

const AboutPage = () => {
  useDocumentMeta({
    title: 'About Us – Our Story, Philosophy & Mission',
    description: 'Learn about FitJeeva\'s journey as a premier Medical Nutrition Clinic. Our farm-to-plate philosophy, kitchen-based nutrition approach, and clinical expertise help transform lives through food.',
    canonical: '/about-us',
  })

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <AboutHero />
      <SubtitleIntro />
      <PhilosophySection />
      <CoreServicesSection />
      <TeamShowcase />
      <JoinMissionCTA />
      <ConsultationForm />
      <MediaSpotlight />
      <ConsultationCTA />
      <InstagramFeed />
      <ContactCTA />
    </div>
  )
}

export default AboutPage
