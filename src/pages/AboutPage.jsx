import { FaPhoneAlt } from 'react-icons/fa'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import StatsCounter from '../components/sections/StatsCounter'
import ConsultationCTA from '../components/sections/ConsultationCTA'
import InstagramFeed from '../components/sections/InstagramFeed'
import ContactCTA from '../components/sections/ContactCTA'
import ConsultationForm from '../components/sections/ConsultationForm'
import { aboutIntro, philosophySections, coreServices } from '../data/aboutData'
import { siteInfo } from '../data/siteData'

/* =========================================================
   About Page — Hero Section
   ========================================================= */
const AboutHero = () => (
  <section className="bg-primary-lighter overflow-hidden">
    <div className="container-custom py-12 md:py-20">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-primary leading-tight">
            {aboutIntro.title}
          </h1>
          <p className="mt-5 text-base md:text-lg text-gray-text leading-relaxed max-w-xl mx-auto lg:mx-0">
            As a premier clinical nutrition expert and the renowned Millet Girl Dietitian, Shreya Goel brings over 20 years of experience to the forefront of global wellness. Recognized as a leading clinical dietitian in India, she has dedicated her career to disease management and lifestyle transformation through a signature farm-to-plate nutrition philosophy.
          </p>
          <p className="mt-4 text-base md:text-lg text-gray-text leading-relaxed max-w-xl mx-auto lg:mx-0">
            She is the visionary founder behind India&apos;s most trusted nutrition clinic chain, boasting 20+ centers across India and Dubai. Her approach is defined by an ethical, medicine-free diet and kitchen-based nutrition expert care, proving that true healing begins at home.
          </p>
          <div className="mt-6">
            <Button
              href={`tel:${siteInfo.phone.replace(/\s/g, '')}`}
              icon={<FaPhoneAlt />}
              size="lg"
            >
              Talk to us
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-primary overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=500&fit=crop"
                alt="Dietitian Shreya Goel"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative pink dots */}
            <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-primary/30" />
            <div className="absolute -bottom-2 -left-6 w-12 h-12 rounded-full bg-primary/20" />
          </div>
        </div>
      </div>
    </div>
  </section>
)

/* =========================================================
   Subtitle Intro
   ========================================================= */
const SubtitleIntro = () => (
  <section className="section-padding bg-white">
    <div className="container-custom max-w-4xl text-center">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-dark leading-tight">
        {aboutIntro.subtitle}
      </h2>
      <p className="mt-5 text-base md:text-lg text-gray-text leading-relaxed">
        {aboutIntro.bio}
      </p>
    </div>
  </section>
)

/* =========================================================
   Philosophy Sections (1–5 numbered, alternating layout)
   ========================================================= */
const philosophyImages = [
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=400&fit=crop',
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=400&fit=crop',
  'https://images.unsplash.com/photo-1547592180-85f173990554?w=500&h=400&fit=crop',
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&h=400&fit=crop',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop',
]

const PhilosophySection = () => (
  <section className="section-padding bg-gray-light">
    <div className="container-custom space-y-16 md:space-y-20">
      {philosophySections.map((section, i) => {
        const isReversed = i % 2 !== 0
        return (
          <div
            key={section.number}
            className={`flex flex-col ${
              isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
            } items-center gap-8 lg:gap-12`}
          >
            {/* Text */}
            <div className="flex-1">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-lg mb-4">
                {section.number}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-dark leading-snug mb-4">
                {section.title}
              </h3>
              <p className="text-base text-gray-text leading-relaxed">
                {section.description}
              </p>
            </div>

            {/* Image */}
            <div className="flex-1">
              <img
                src={philosophyImages[i]}
                alt={section.title}
                className="w-full rounded-2xl shadow-lg object-cover max-h-72 lg:max-h-80"
              />
            </div>
          </div>
        )
      })}
    </div>
  </section>
)

/* =========================================================
   Core Services (4 numbered cards with images)
   ========================================================= */
const CoreServicesSection = () => (
  <section className="section-padding bg-white">
    <div className="container-custom space-y-12 md:space-y-16">
      {coreServices.map((service, i) => {
        const isReversed = i % 2 !== 0
        return (
          <div
            key={service.number}
            className={`flex flex-col ${
              isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
            } items-center gap-8 lg:gap-12`}
          >
            {/* Image */}
            <div className="flex-1">
              <img
                src={service.image}
                alt={service.title}
                className="w-full rounded-2xl shadow-lg object-cover max-h-72 lg:max-h-80"
              />
            </div>

            {/* Text */}
            <div className="flex-1">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-lg mb-4">
                {service.number}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-dark leading-snug mb-4">
                {service.title}
              </h3>
              <p className="text-base text-gray-text leading-relaxed">
                {service.description}
              </p>
              {service.number === 4 && (
                <div className="mt-5">
                  <Button to="/careers" size="md">
                    Join now
                  </Button>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  </section>
)

/* =========================================================
   Join Our Mission CTA
   ========================================================= */
const JoinMissionCTA = () => (
  <section className="section-padding bg-gray-light">
    <div className="container-custom">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 bg-white rounded-3xl p-8 md:p-12 shadow-[var(--shadow-card)]">
        {/* Text */}
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-extrabold text-dark leading-tight">
            Are you passionate about making healthier living accessible for all?
          </h2>
          <p className="mt-4 text-base text-gray-text leading-relaxed">
            Join our mission to help the world lead happier, healthier lives through good habits and better nutrition.
          </p>
          <div className="mt-6">
            <Button to="/careers" size="lg">
              Apply Now
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=500&h=400&fit=crop"
            alt="Join our team"
            className="w-full rounded-2xl shadow-lg object-cover max-h-72 lg:max-h-80"
          />
        </div>
      </div>
    </div>
  </section>
)

/* =========================================================
   Media Spotlight
   ========================================================= */
const MediaSpotlight = () => (
  <section className="section-padding bg-white">
    <div className="container-custom text-center">
      <SectionHeading label="Media Spotlight" title="" />
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-dark-soft leading-snug max-w-4xl mx-auto -mt-4">
        Featured in Hindustan Times, Chandigarh Tribune &amp; Yugmarg for outstanding contributions to clinical nutrition and wellness education.
      </h3>
      <p className="mt-4 text-gray-text text-base max-w-2xl mx-auto">
        Want to join them? Reach out to our diet expert now to chart the best weight loss journey to your fitness goals!
      </p>
      <div className="mt-6">
        <Button to="/contact-us" size="md">
          Join now
        </Button>
      </div>
    </div>
  </section>
)

/* =========================================================
   About Page — Full Composition
   ========================================================= */
const AboutPage = () => {
  return (
    <div>
      {/* 1. Hero */}
      <AboutHero />

      {/* 2. Subtitle / Intro */}
      <SubtitleIntro />

      {/* 3. Philosophy Sections (5 numbered) */}
      <PhilosophySection />

      {/* 4. Core Services (4 numbered) */}
      <CoreServicesSection />

      {/* 5. Join Our Mission CTA */}
      <JoinMissionCTA />

      {/* 6. Consultation Form */}
      <ConsultationForm />

      {/* 7. Media Spotlight */}
      <MediaSpotlight />

      {/* 8. Consultation CTA Banner */}
      <ConsultationCTA />

      {/* 9. Instagram Feed */}
      <InstagramFeed />

      {/* 10. Contact CTA */}
      <ContactCTA />
    </div>
  )
}

export default AboutPage
