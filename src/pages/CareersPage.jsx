import { useState } from 'react'
import { FaBriefcase } from 'react-icons/fa'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import StatsCounter from '../components/sections/StatsCounter'
import ConsultationCTA from '../components/sections/ConsultationCTA'
import InstagramFeed from '../components/sections/InstagramFeed'
import ContactCTA from '../components/sections/ContactCTA'
import { useCareersData } from '../hooks/usePageData'
import useDocumentMeta from '../hooks/useDocumentMeta'
import fitjeevaClinical from '../assets/images/fitjeeva-clinical.webp'
import fitjeevaBanner from '../assets/images/fitjeeva-banner-1.webp'

const CareersHero = () => {
  const { careersHero, teamImages } = useCareersData()
  return (
  <section className="py-12 md:py-20 bg-gray-50 overflow-hidden relative">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8F5E9]/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
    <div className="container-custom relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        <div className="w-full lg:w-1/2">
          <span className="inline-block bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Careers
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            {careersHero.title}
          </h1>
          <div>
            <Button href="#apply-form" icon={<FaBriefcase />} className="bg-[#2E7D32] hover:bg-[#1B5E20]">
              {careersHero.ctaText}
            </Button>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="grid grid-cols-2 gap-4">
            {teamImages.slice(0,4).map((img, i) => (
              <div key={i} className={`rounded-3xl overflow-hidden shadow-lg border-4 border-white ${i % 2 === 1 ? 'mt-8' : ''}`}>
                <img src={img} alt={`Team photo ${i+1}`} className="w-full h-40 md:h-56 object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
)
}

const AwardsSection = () => {
  const { awardImages } = useCareersData()
  if (!awardImages || awardImages.length === 0) return null

  return (
    <section className="py-12 md:py-16 bg-white border-y border-gray-100">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Recognized Excellence</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          {awardImages.map((img, idx) => (
            <div key={idx} className="rounded-3xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all">
              <img src={img} alt={`Award recognition ${idx + 1}`} className="w-full h-64 object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const CompanyValuesSection = () => {
  const { companyValues } = useCareersData()
  return (
  <section className="py-12 md:py-20 bg-gray-50">
    <div className="container-custom">
      <div className="text-center mb-12">
        <span className="inline-block bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
          Our Culture
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          We See You As Someone Who
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {companyValues.map((value) => (
          <div key={value.number} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <span className="inline-block bg-[#E8F5E9] text-[#2E7D32] font-black text-xl w-12 h-12 flex items-center justify-center rounded-2xl mb-6">
              {value.number}
            </span>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
              {value.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
)
}

const JobOpeningsSection = () => {
  const { jobPositions } = useCareersData()
  return (
    <section className="py-12 md:py-16 bg-white border-b border-gray-100">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Current Openings</h2>
          <p className="text-gray-500 mt-3">Join us in shaping the future of clinical nutrition.</p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobPositions.filter(p => p.toLowerCase() !== 'other').map((position, i) => (
            <div key={i} className="p-5 rounded-2xl border border-gray-200 hover:border-[#2E7D32] hover:shadow-md transition-all flex items-center justify-between group">
              <span className="font-bold text-gray-800 group-hover:text-[#2E7D32] transition-colors">{position}</span>
              <a href="#apply-form" className="text-[#2E7D32] text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">Apply Now &rarr;</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const CareerApplicationForm = () => {
  const { jobPositions } = useCareersData()
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', position: '', message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for applying! Our team will review your application.')
    setFormData({ fullName: '', email: '', phone: '', position: '', message: '' })
  }

  const inputClasses = 'w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] focus:bg-white transition-all text-sm'

  return (
    <section id="apply-form" className="py-12 md:py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8F5E9]/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0"></div>
          
          <div className="relative z-10 text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Apply for a Position</h2>
            <p className="text-gray-600">Fill in your details and our team will get in touch if your profile matches our requirements.</p>
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" required className={inputClasses} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" required className={inputClasses} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your contact number" required className={inputClasses} />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Position Applied For <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {jobPositions.map((position) => (
                  <label key={position} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${formData.position === position ? 'bg-[#E8F5E9] border-[#2E7D32] text-[#2E7D32]' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}`}>
                    <input type="radio" name="position" value={position} checked={formData.position === position} onChange={handleChange} required className="hidden" />
                    <span className="font-bold text-sm">{position}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Why do you want to join us?</label>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about yourself and why you'd be a great fit..." rows={4} className={`${inputClasses} resize-none`} />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] py-3.5">
                Submit Application
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

const CareersPage = () => {
  useDocumentMeta({
    title: 'Careers – Join Our Team of Clinical Nutrition Experts',
    description: 'Join FitJeeva and make a difference in clinical nutrition. Explore career opportunities for dietitians, nutrition coaches, and health professionals. Apply now!',
    canonical: '/careers',
  })

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <CareersHero />
      <StatsCounter />
      <AwardsSection />
      <CompanyValuesSection />
      <JobOpeningsSection />
      <CareerApplicationForm />
      <ConsultationCTA />
      <InstagramFeed />
      <ContactCTA />
    </div>
  )
}

export default CareersPage
