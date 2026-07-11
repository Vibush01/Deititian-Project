import { Link } from 'react-router-dom'
import { FaPhoneAlt, FaHeartbeat, FaDumbbell, FaSpa, FaArrowRight } from 'react-icons/fa'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import StatsCounter from '../components/sections/StatsCounter'
import ConsultationCTA from '../components/sections/ConsultationCTA'
import InstagramFeed from '../components/sections/InstagramFeed'
import ContactCTA from '../components/sections/ContactCTA'
import ConsultationForm from '../components/sections/ConsultationForm'
import { useServiceCategories } from '../hooks/useServices'
import useSiteSettings from '../hooks/useSiteSettings'
import useDocumentMeta from '../hooks/useDocumentMeta'
import fitjeevaDietitian from '../assets/images/fitjeeva-dietitian.webp'

const categoryIcons = {
  heart: <FaHeartbeat />,
  dumbbell: <FaDumbbell />,
  'heart-pulse': <FaSpa />,
}

const ServiceHero = () => {
  const { settings } = useSiteSettings()
  return (
  <section className="py-12 md:py-20 bg-gray-50 overflow-hidden relative">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8F5E9]/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
    <div className="container-custom relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        <div className="w-full lg:w-1/2">
          <span className="inline-block bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Our Services
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Expert Clinical Diet Plans Personalized for Your Health Revolution
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
            Achieve your health goals with personalized diet plans that identify the root cause of weight gain through expert nutrition and lifestyle corrections provided by India's premier online diet service.
          </p>
          <div>
            <Button href={`tel:${settings.phone.replace(/\s/g, '')}`} icon={<FaPhoneAlt />} className="bg-[#2E7D32] hover:bg-[#1B5E20]">
              Talk to us
            </Button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white z-10">
            <img src={fitjeevaDietitian} alt="Expert Clinical Diet Plans" className="w-full h-auto object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#C8E6C9] rounded-full blur-2xl -z-10"></div>
          <div className="absolute -top-6 -right-6 w-40 h-40 bg-[#A5D6A7] rounded-full blur-3xl -z-10"></div>
        </div>
      </div>
    </div>
  </section>
)}

const ServiceCategoryCards = () => {
  const { categories: serviceCategories } = useServiceCategories()
  return (
  <section className="py-12 md:py-20 bg-white">
    <div className="container-custom">
      <SectionHeading
        label="Our Services"
        title="Comprehensive Nutrition & Wellness Programs"
        subtitle="We offer specialized nutrition programs across three key areas to address your unique health needs with personalized, science-backed solutions."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {serviceCategories.map((category) => (
          <Link key={category.id} to={category.path} className="group bg-gray-50 rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <div className="h-48 overflow-hidden relative">
              <img src={category.image} alt={category.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6 md:p-8 flex flex-col flex-grow relative bg-white">
              <div className="absolute -top-6 right-6 w-12 h-12 bg-[#2E7D32] text-white rounded-xl flex items-center justify-center text-xl shadow-lg transform group-hover:rotate-12 transition-transform">
                {categoryIcons[category.icon]}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#2E7D32] transition-colors">{category.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-grow">{category.heroDescription.slice(0, 150)}...</p>
              <div className="mt-auto flex items-center text-[#2E7D32] font-bold text-sm group-hover:gap-2 transition-all">
                Learn more <FaArrowRight className="ml-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
)
}

const CategoryDetailSections = () => {
  const { categories: serviceCategories } = useServiceCategories()
  return (
  <section className="py-12 md:py-20 bg-gray-50 border-t border-gray-100">
    <div className="container-custom space-y-16 md:space-y-24">
      {serviceCategories.map((category, idx) => (
        <div key={category.id} className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-16`}>
          <div className="w-full md:w-1/2">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white transform transition-transform hover:scale-105 duration-500">
              <img src={category.image} alt={category.title} loading="lazy" className="w-full h-[300px] md:h-[400px] object-cover" />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{category.heroTitle}</h3>
            <p className="text-base text-gray-600 leading-relaxed mb-6">{category.heroDescription}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {category.services.slice(0, 6).map((service) => (
                <span key={service.id} className="bg-white border border-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  {service.title}
                </span>
              ))}
            </div>
            <div>
              <Button to={category.path} size="sm" className="bg-[#2E7D32] hover:bg-[#1B5E20]">
                Explore {category.title}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
)
}

const ServicePage = () => {
  useDocumentMeta({
    title: 'Our Services – PCOD, Thyroid, Diabetes & Weight Loss Diet Plans',
    description: 'Explore FitJeeva\'s expert clinical nutrition services. Personalized diet plans for PCOD/PCOS, thyroid, diabetes, weight loss & lifestyle management. Science-backed, medicine-free nutrition programs.',
    canonical: '/service',
  })

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <ServiceHero />
      <StatsCounter />
      <ServiceCategoryCards />
      <CategoryDetailSections />
      <ConsultationForm />
      <ConsultationCTA />
      <InstagramFeed />
      <ContactCTA />
    </div>
  )
}

export default ServicePage
