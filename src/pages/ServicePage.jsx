import { Link } from 'react-router-dom'
import { FaPhoneAlt, FaHeartbeat, FaDumbbell, FaSpa, FaArrowRight } from 'react-icons/fa'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import StatsCounter from '../components/sections/StatsCounter'
import ConsultationCTA from '../components/sections/ConsultationCTA'
import InstagramFeed from '../components/sections/InstagramFeed'
import ContactCTA from '../components/sections/ContactCTA'
import ConsultationForm from '../components/sections/ConsultationForm'
import { serviceCategories } from '../data/servicesData'
import { siteInfo } from '../data/siteData'

/* Category icons lookup */
const categoryIcons = {
  heart: <FaHeartbeat className="text-3xl" />,
  dumbbell: <FaDumbbell className="text-3xl" />,
  'heart-pulse': <FaSpa className="text-3xl" />,
}

/* =========================================================
   Service Hero
   ========================================================= */
const ServiceHero = () => (
  <section className="bg-primary-lighter overflow-hidden">
    <div className="container-custom py-12 md:py-20">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-primary leading-tight">
            Expert Clinical Diet Plans Personalized for Your Health Revolution
          </h1>
          <p className="mt-5 text-base md:text-lg text-gray-text leading-relaxed max-w-xl mx-auto lg:mx-0">
            Achieve your health goals with personalized diet plans that identify the root cause of weight gain through expert nutrition and lifestyle corrections provided by India&apos;s premier online diet service.
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
                src="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=500&h=500&fit=crop"
                alt="Expert Clinical Diet Plans"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-primary/30" />
            <div className="absolute -bottom-2 -left-6 w-12 h-12 rounded-full bg-primary/20" />
          </div>
        </div>
      </div>
    </div>
  </section>
)

/* =========================================================
   Service Category Cards
   ========================================================= */
const ServiceCategoryCards = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <SectionHeading
        label="Our Services"
        title="Comprehensive Nutrition & Wellness Programs"
        subtitle="We offer specialized nutrition programs across three key areas to address your unique health needs with personalized, science-backed solutions."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-10">
        {serviceCategories.map((category) => (
          <Link
            key={category.id}
            to={category.path}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-2 transition-all duration-300"
          >
            <div className="overflow-hidden h-48 md:h-56">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 md:p-6">
              <div className="w-14 h-14 rounded-xl bg-primary-lighter flex items-center justify-center text-primary mb-4">
                {categoryIcons[category.icon]}
              </div>
              <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">
                {category.title}
              </h3>
              <p className="text-sm text-gray-text leading-relaxed mb-4">
                {category.heroDescription.slice(0, 150)}...
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                Learn more <FaArrowRight className="text-xs" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
)

/* =========================================================
   Detailed Category Sections
   ========================================================= */
const CategoryDetailSections = () => (
  <section className="section-padding bg-gray-light">
    <div className="container-custom space-y-16">
      {serviceCategories.map((category, i) => (
        <div
          key={category.id}
          className={`flex flex-col ${
            i % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'
          } items-center gap-8 lg:gap-12 bg-white rounded-3xl p-6 md:p-10 shadow-[var(--shadow-card)]`}
        >
          {/* Image */}
          <div className="flex-1">
            <img
              src={category.image}
              alt={category.title}
              className="w-full rounded-2xl shadow-md object-cover max-h-72 lg:max-h-80"
            />
          </div>

          {/* Text */}
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-3">
              {category.heroTitle}
            </h3>
            <p className="text-base text-gray-text leading-relaxed mb-4">
              {category.heroDescription}
            </p>
            {/* Sub-services list */}
            <div className="space-y-2 mb-5">
              {category.services.map((service) => (
                <div key={service.id} className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-dark text-sm">{service.title}</span>
                    <span className="text-gray-text text-sm"> — {service.description}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button to={category.path} size="sm">
              Explore {category.title}
            </Button>
          </div>
        </div>
      ))}
    </div>
  </section>
)

/* =========================================================
   Service Page — Full Composition
   ========================================================= */
const ServicePage = () => {
  return (
    <div>
      {/* 1. Hero */}
      <ServiceHero />

      {/* 2. Stats */}
      <StatsCounter />

      {/* 3. Category Cards */}
      <ServiceCategoryCards />

      {/* 4. Detailed Category Sections */}
      <CategoryDetailSections />

      {/* 5. Consultation Form */}
      <ConsultationForm />

      {/* 6. Consultation CTA */}
      <ConsultationCTA />

      {/* 7. Instagram Feed */}
      <InstagramFeed />

      {/* 8. Contact CTA */}
      <ContactCTA />
    </div>
  )
}

export default ServicePage
