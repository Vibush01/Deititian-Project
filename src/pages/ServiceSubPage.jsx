import { useParams, Link } from 'react-router-dom'
import { FaPhoneAlt, FaCheck, FaArrowRight } from 'react-icons/fa'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import ConsultationCTA from '../components/sections/ConsultationCTA'
import InstagramFeed from '../components/sections/InstagramFeed'
import ContactCTA from '../components/sections/ContactCTA'
import ConsultationForm from '../components/sections/ConsultationForm'
import { serviceSubPages, serviceCategories } from '../data/servicesData'
import { siteInfo } from '../data/siteData'

/* =========================================================
   ServiceSubPage — Dynamic template for all 6 service routes
   ========================================================= */
const ServiceSubPage = () => {
  const { slug } = useParams()
  const page = serviceSubPages[slug]

  // 404 fallback
  if (!page) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-3xl font-bold text-dark mb-4">Service Not Found</h1>
        <p className="text-gray-text mb-6">The service you&apos;re looking for doesn&apos;t exist.</p>
        <Button to="/service">View All Services</Button>
      </div>
    )
  }

  // Find related services (same category or other categories)
  const relatedServices = serviceCategories
    .flatMap((cat) => cat.services || [])
    .filter((s) => s.id !== slug && s.path)
    .slice(0, 3)

  return (
    <div>
      {/* 1. Hero */}
      <section className="bg-primary-lighter overflow-hidden">
        <div className="container-custom py-12 md:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-primary leading-tight">
                {page.heroTitle}
              </h1>
              <p className="mt-5 text-base md:text-lg text-gray-text leading-relaxed max-w-xl mx-auto lg:mx-0">
                {page.heroSubtitle}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
                <Button
                  href={`tel:${siteInfo.phone.replace(/\s/g, '')}`}
                  icon={<FaPhoneAlt />}
                  size="lg"
                >
                  Talk to us
                </Button>
                <Button to="/contact-us" variant="outline" size="lg">
                  Book a session
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-primary overflow-hidden shadow-xl">
                  <img
                    src={page.image}
                    alt={page.title}
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

      {/* 2. Content Sections (alternating) */}
      <section className="section-padding bg-white">
        <div className="container-custom space-y-16">
          {page.sections.map((section, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                i % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } items-center gap-8 lg:gap-12`}
            >
              {/* Image */}
              <div className="flex-1">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full rounded-2xl shadow-lg object-cover max-h-72 lg:max-h-80"
                />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-dark mb-4">
                  {section.title}
                </h2>
                <p className="text-base text-gray-text leading-relaxed">
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Benefits Grid */}
      <section className="section-padding bg-gray-light">
        <div className="container-custom">
          <SectionHeading
            label="Why Choose Us"
            title={`Benefits of Our ${page.title} Program`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto">
            {page.benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm"
              >
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FaCheck className="text-white text-xs" />
                </span>
                <p className="text-sm text-dark leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Related Services */}
      {relatedServices.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <SectionHeading
              label="Explore More"
              title="Related Services"
              subtitle="Discover our other specialized nutrition programs designed to transform your health."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {relatedServices.map((service) => (
                <Link
                  key={service.id}
                  to={service.path}
                  className="group bg-gray-light rounded-2xl p-6 hover:bg-primary-lighter hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-text leading-relaxed mb-3">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Learn more <FaArrowRight className="text-xs" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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

export default ServiceSubPage
