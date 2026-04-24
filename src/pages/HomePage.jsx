import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import HomeHero from '../components/sections/HomeHero'
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

/* --- Quick-link icon cards (PCOD | Thyroid | Diabetes | Explore) --- */
const quickLinks = [
  {
    label: 'PCOD',
    to: '/service/pcod-pcos',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14 mx-auto">
        <circle cx="32" cy="32" r="28" fill="#FCE4EC" />
        <path d="M32 18c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7zm-10 14c-3 0-5.5 2.5-5.5 5.5S19 43 22 43s5.5-2.5 5.5-5.5S25 32 22 32zm20 0c-3 0-5.5 2.5-5.5 5.5S39 43 42 43s5.5-2.5 5.5-5.5S45 32 42 32z" fill="#E91E63"/>
      </svg>
    ),
  },
  {
    label: 'Thyroid',
    to: '/service/thyroid',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14 mx-auto">
        <circle cx="32" cy="32" r="28" fill="#FCE4EC" />
        <path d="M32 16c-2 0-3 1-3 3v6c-4 1-7 5-7 9 0 6 4 10 10 14 6-4 10-8 10-14 0-4-3-8-7-9v-6c0-2-1-3-3-3z" fill="#E91E63"/>
      </svg>
    ),
  },
  {
    label: 'Diabetes',
    to: '/service/diabetes',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14 mx-auto">
        <circle cx="32" cy="32" r="28" fill="#FCE4EC" />
        <path d="M32 14l-2 4h-6l2 6-4 4 6 2v6h4v-6l6-2-4-4 2-6h-6l2-4z" fill="#E91E63"/>
        <circle cx="32" cy="36" r="5" fill="#C2185B" opacity="0.6"/>
      </svg>
    ),
  },
  {
    label: 'Explore All',
    to: '/service',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14 mx-auto">
        <circle cx="32" cy="32" r="28" fill="#FCE4EC" />
        <path d="M24 22h16v4H24zM22 30h20v4H22zM26 38h12v4H26z" fill="#E91E63"/>
        <path d="M38 42l6 6" stroke="#E91E63" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const QuickLinkCards = () => (
  <section className="py-8 md:py-10 bg-white">
    <div className="container-custom">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {quickLinks.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className="group flex flex-col items-center p-6 md:p-8 bg-white rounded-2xl border border-gray-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
              {link.icon}
            </div>
            <span className="text-sm md:text-base font-bold text-primary">
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
)

/* --- Expertise / "Our Diet Clinic Chain" grid --- */
const ExpertiseSection = () => (
  <section className="section-padding" style={{ background: 'linear-gradient(180deg, #eef2f7 0%, #f0f4f8 100%)' }}>
    <div className="container-custom">
      <SectionHeading
        label="Our Diet Clinic Chain"
        title="Dietitian Shreya: India's Top Medical Diet Clinic"
        subtitle="Our medical diet clinic in India specializes in medical nutrition science that heals from the root. We focus on personalized diet plans using real Indian food and millet based diets, never shortcuts."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-14 mt-12">
        {homeExpertiseCards.map((card, i) => (
          <div key={i} className="group">
            {/* Image — tall, rounded corners */}
            <div className="overflow-hidden rounded-xl mb-5">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-64 md:h-72 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Title — centered, large, pink, bold */}
            <h3 className="text-xl md:text-2xl lg:text-[1.65rem] font-bold text-primary text-center leading-snug mb-3">
              {card.title}
            </h3>

            {/* Description — justified text */}
            <p className="text-sm md:text-base text-gray-text leading-relaxed text-justify">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

/* --- Client Spotlight / Success Stories --- */
const ClientSpotlight = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Split heading: title left, description right */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-16">
          {/* Left: label + heading */}
          <div className="lg:max-w-md flex-shrink-0">
            <span className="section-label">Client Spotlight</span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-dark leading-tight mt-2">
              Our Weight Loss
              <br />
              Success Stories
            </h2>
          </div>

          {/* Right: description text */}
          <div className="lg:max-w-lg lg:pt-8">
            <p className="text-base md:text-lg text-gray-text leading-relaxed text-justify">
              Real people. Real transformations. Every personalized diet plan we design at our medical diet clinic in India is rooted in everyday Indian food and medical nutrition science. Whether you need a PCOD diet plan, diabetes management, or a millet based diet plan, our mindful coaching ensures your results don&apos;t just come—they stay.
            </p>
          </div>
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
      {/* 1. Hero Section — Full-width carousel style matching original */}
      <HomeHero />

      {/* 2. Stats Counter */}
      <StatsCounter />

      {/* 3. Quick-link icon cards (PCOD, Thyroid, Diabetes, Explore) */}
      <QuickLinkCards />

      {/* 4. Expertise / Diet Clinic Chain */}
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
