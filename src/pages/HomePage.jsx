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
