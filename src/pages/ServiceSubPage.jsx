import { useParams, Link } from 'react-router-dom'
import { FaPhoneAlt, FaCheck, FaArrowRight } from 'react-icons/fa'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import ConsultationCTA from '../components/sections/ConsultationCTA'
import InstagramFeed from '../components/sections/InstagramFeed'
import ContactCTA from '../components/sections/ContactCTA'
import ConsultationForm from '../components/sections/ConsultationForm'
import { useServiceSubPage, useServiceCategories } from '../hooks/useServices'
import useSiteSettings from '../hooks/useSiteSettings'
import useDocumentMeta from '../hooks/useDocumentMeta'

const ServiceSubPage = () => {
  const { slug } = useParams()
  const { page } = useServiceSubPage(slug)
  const { categories: serviceCategories } = useServiceCategories()
  const { settings } = useSiteSettings()

  useDocumentMeta({
    title: page ? `${page.heroTitle}` : 'Service Not Found',
    description: page ? page.heroSubtitle : 'The requested service page was not found.',
    canonical: `/service/${slug}`,
  })

  if (!page) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Service Not Found</h1>
        <p className="text-gray-600 mb-8 text-lg">The service you're looking for doesn't exist.</p>
        <Button to="/service" className="bg-[#2E7D32] hover:bg-[#1B5E20]">View All Services</Button>
      </div>
    )
  }

  const relatedServices = serviceCategories
    .flatMap((cat) => cat.services || [])
    .filter((s) => s.id !== slug && s.path)
    .slice(0, 3)

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <section className="py-12 md:py-20 bg-gray-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8F5E9]/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="w-full lg:w-1/2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                {page.heroTitle}
              </h1>
              <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
                {page.heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href={`tel:${settings.phone.replace(/\s/g, '')}`} icon={<FaPhoneAlt />} className="bg-[#2E7D32] hover:bg-[#1B5E20]">
                  Talk to us
                </Button>
                <Button to="/contact-us" variant="outline">
                  Book a session
                </Button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white z-10">
                <img src={page.image} alt={page.title} className="w-full h-auto object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#C8E6C9] rounded-full blur-2xl -z-10"></div>
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-[#A5D6A7] rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="container-custom space-y-16 md:space-y-24">
          {page.sections.map((section, i) => (
            <div key={i} className={`flex flex-col ${i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-16`}>
              <div className="w-full md:w-1/2">
                <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white transform transition-transform hover:scale-105 duration-500">
                  <img src={section.image} alt={section.title} className="w-full h-[300px] md:h-[400px] object-cover" />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-50 border-y border-gray-100">
        <div className="container-custom">
          <SectionHeading
            label="Why Choose Us"
            title={`Benefits of Our ${page.title} Program`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10">
            {page.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <span className="w-8 h-8 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center shrink-0 mt-0.5">
                  <FaCheck className="text-xs" />
                </span>
                <p className="text-gray-700 font-medium leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="py-12 md:py-20 bg-white">
          <div className="container-custom">
            <SectionHeading
              label="Explore More"
              title="Related Services"
              subtitle="Discover our other specialized nutrition programs designed to transform your health."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-10">
              {relatedServices.map((service) => (
                <Link key={service.id} to={service.path} className="group flex flex-col bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:border-[#2E7D32]/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#2E7D32] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
                    {service.description}
                  </p>
                  <span className="text-[#2E7D32] font-bold text-sm flex items-center gap-1">
                    Learn more <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ConsultationForm />
      <ConsultationCTA />
      <InstagramFeed />
      <ContactCTA />
    </div>
  )
}

export default ServiceSubPage
