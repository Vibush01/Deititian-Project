import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import HeroSection from '../components/sections/HeroSection'
import StatsCounter from '../components/sections/StatsCounter'
import ConsultationCTA from '../components/sections/ConsultationCTA'
import InstagramFeed from '../components/sections/InstagramFeed'
import ContactCTA from '../components/sections/ContactCTA'
import ClinicLocations from '../components/sections/ClinicLocations'
import ConsultationForm from '../components/sections/ConsultationForm'
import { homeExpertiseCards } from '../data/servicesData'

/* =========================================================
   Home-Page-Only Sections
   ========================================================= */

/* --- Quick-link pills (PCOD | Thyroid | Diabetes | Explore) --- */
const QuickLinks = () => (
  <div className="flex flex-wrap justify-center gap-3 mt-8">
    {[
      { label: 'PCOD', to: '/service/pcod-pcos' },
      { label: 'Thyroid', to: '/service/thyroid' },
      { label: 'Diabetes', to: '/service/diabetes' },
      { label: 'Explore All', to: '/service/disease-management' },
    ].map((link) => (
      <Link
        key={link.label}
        to={link.to}
        className="px-5 py-2 rounded-full border-2 border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300"
      >
        {link.label}
      </Link>
    ))}
  </div>
)

/* --- Expertise / "Our Diet Clinic Chain" grid --- */
const ExpertiseSection = () => (
  <section className="section-padding bg-gray-light">
    <div className="container-custom">
      <SectionHeading
        label="Our Diet Clinic Chain"
        title="Dietitian Shreya: India's Top Medical Diet Clinic"
        subtitle="Our medical diet clinic in India specializes in medical nutrition science that heals from the root. We focus on personalized diet plans using real Indian food and millet based diets, never shortcuts."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 mt-10">
        {homeExpertiseCards.map((card, i) => (
          <div
            key={i}
            className="group bg-white rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="overflow-hidden h-56 md:h-64">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-primary mb-2">{card.title}</h3>
              <p className="text-sm text-gray-text leading-relaxed">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

/* --- Client Spotlight / Success Stories --- */
const ClientSpotlight = () => {
  const transformations = [
    { name: 'Rahul', lost: '14.3 KG', duration: '2 Months', imgBefore: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop', imgAfter: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop' },
    { name: 'Gurpreet', lost: '55 KG', duration: '5 Months', imgBefore: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', imgAfter: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
    { name: 'Priya', lost: '37 KG', duration: '7 Months', imgBefore: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop', imgAfter: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop' },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading
          label="Client Spotlight"
          title="Our Weight Loss Success Stories"
          subtitle="Real people. Real transformations. Every personalized diet plan we design at our medical diet clinic in India is rooted in everyday Indian food and medical nutrition science."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {transformations.map((t, i) => (
            <div
              key={i}
              className="relative bg-gradient-to-b from-primary/5 to-primary/10 rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Before & After images */}
              <div className="flex justify-center gap-3 mb-4">
                <div className="relative">
                  <img
                    src={t.imgBefore}
                    alt={`${t.name} before`}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-3 border-white shadow-md"
                  />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gray-text text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    Before
                  </span>
                </div>
                <div className="relative">
                  <img
                    src={t.imgAfter}
                    alt={`${t.name} after`}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-3 border-primary shadow-md"
                  />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    After
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-text italic mb-2">{t.name}</p>
              <p className="text-2xl md:text-3xl font-extrabold text-primary leading-tight">
                Lost {t.lost}
              </p>
              <p className="text-sm font-semibold text-dark mt-1">
                in <span className="text-primary">{t.duration}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --- Media Spotlight --- */
const MediaSpotlight = () => (
  <section className="section-padding bg-white">
    <div className="container-custom text-center">
      <SectionHeading
        label="Media Spotlight"
        title=""
      />
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
   HomePage — Full Composition
   ========================================================= */
const HomePage = () => {
  return (
    <div>
      {/* 1. Hero Section */}
      <HeroSection
        title={
          <>
            India&apos;s <span className="text-primary">#1</span> Medical Diet Clinic Chain
          </>
        }
        subtitle="Evidence before trends. Beyond calorie counting. Personalized diet plans for PCOD, thyroid, diabetes & sustainable weight loss."
        ctaText="Book a session"
        ctaLink="/contact-us"
        image="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=600&h=700&fit=crop"
        bgColor="bg-primary-lighter"
      >
        <QuickLinks />
      </HeroSection>

      {/* 2. Stats Counter */}
      <StatsCounter />

      {/* 3. Expertise / Diet Clinic Chain */}
      <ExpertiseSection />

      {/* 4. Client Spotlight */}
      <ClientSpotlight />

      {/* 5. Consultation Form */}
      <ConsultationForm />

      {/* 6. Media Spotlight */}
      <MediaSpotlight />

      {/* 7. Consultation CTA Banner */}
      <ConsultationCTA />

      {/* 8. Instagram Feed */}
      <InstagramFeed />

      {/* 9. Contact CTA */}
      <ContactCTA />

      {/* 10. Clinic Locations */}
      <ClinicLocations />
    </div>
  )
}

export default HomePage
