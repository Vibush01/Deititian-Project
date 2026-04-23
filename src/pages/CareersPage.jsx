import { useState } from 'react'
import { FaBriefcase } from 'react-icons/fa'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import StatsCounter from '../components/sections/StatsCounter'
import ConsultationCTA from '../components/sections/ConsultationCTA'
import InstagramFeed from '../components/sections/InstagramFeed'
import ContactCTA from '../components/sections/ContactCTA'
import { careersHero, companyValues, jobPositions, teamImages } from '../data/careersData'

/* =========================================================
   Careers Hero — Team collage + headline
   ========================================================= */
const CareersHero = () => (
  <section className="bg-primary-lighter overflow-hidden">
    <div className="container-custom py-12 md:py-20">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-primary leading-tight">
            {careersHero.title}
          </h1>
          <div className="mt-8">
            <Button href="#apply-form" icon={<FaBriefcase />} size="lg">
              {careersHero.ctaText}
            </Button>
          </div>
        </div>

        {/* Team photo collage */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {teamImages.map((img, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden shadow-lg ${
                  i === 0 ? 'row-span-1' : ''
                } ${i === 1 ? 'translate-y-4' : ''} ${
                  i === 2 ? '-translate-y-2' : ''
                } ${i === 3 ? 'translate-y-2' : ''}`}
              >
                <img
                  src={img}
                  alt={`Team photo ${i + 1}`}
                  className="w-full h-40 md:h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
)

/* =========================================================
   Awards Section
   ========================================================= */
const AwardsSection = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-card)] border border-gray-border">
          <img
            src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&h=400&fit=crop"
            alt="Award recognition"
            className="w-full h-56 md:h-72 object-cover"
          />
        </div>
        <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-card)] border border-gray-border">
          <img
            src="https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=600&h=400&fit=crop"
            alt="Certificate of honour"
            className="w-full h-56 md:h-72 object-cover"
          />
        </div>
      </div>
    </div>
  </section>
)

/* =========================================================
   "We See You As Someone Who" — Company Values
   ========================================================= */
const CompanyValuesSection = () => (
  <section className="section-padding bg-gray-light">
    <div className="container-custom">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-primary mb-10 text-center lg:text-left">
        We See You As Someone Who
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {companyValues.map((value) => (
          <div
            key={value.number}
            className="bg-primary rounded-2xl p-6 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <span className="text-3xl md:text-4xl font-extrabold text-white/30 block mb-2">
              {value.number}
            </span>
            <h3 className="text-lg md:text-xl font-bold mb-2">
              {value.title}
            </h3>
            <p className="text-sm text-white/85 leading-relaxed">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

/* =========================================================
   Career Application Form
   ========================================================= */
const CareerApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // External service integration placeholder
    console.log('Career application submitted:', formData)
    alert('Thank you for applying! Our team will review your application.')
    setFormData({ fullName: '', email: '', phone: '', position: '', message: '' })
  }

  const inputClasses =
    'w-full px-4 py-3 rounded-full border border-gray-border bg-white text-dark placeholder:text-gray-text/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors text-sm'

  return (
    <section id="apply-form" className="section-padding bg-gray-light">
      <div className="container-custom max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-2">
          Apply for a Position
        </h2>
        <p className="text-gray-text text-base mb-8">
          Fill in your details and our team will get in touch if your profile matches our requirements.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">
              Full Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className={inputClasses}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">
              Email Address <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
              className={inputClasses}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">
              Phone Number <span className="text-primary">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your contact number"
              required
              className={inputClasses}
            />
          </div>

          {/* Position Applied For — Radio Buttons */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-3">
              Position Applied For <span className="text-primary">*</span>
            </label>
            <div className="space-y-2.5">
              {jobPositions.map((position) => (
                <label
                  key={position}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="position"
                    value={position}
                    checked={formData.position === position}
                    onChange={handleChange}
                    required
                    className="w-4 h-4 text-primary border-gray-border focus:ring-primary/40 accent-primary"
                  />
                  <span className="text-sm text-dark group-hover:text-primary transition-colors">
                    {position}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">
              Why do you want to join us?
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about yourself and why you'd be a great fit..."
              rows={4}
              className="w-full px-4 py-3 rounded-2xl border border-gray-border bg-white text-dark placeholder:text-gray-text/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors text-sm resize-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Submit Application
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

/* =========================================================
   Careers Page — Full Composition
   ========================================================= */
const CareersPage = () => {
  return (
    <div>
      {/* 1. Hero */}
      <CareersHero />

      {/* 2. Stats */}
      <StatsCounter />

      {/* 3. Awards */}
      <AwardsSection />

      {/* 4. Company Values */}
      <CompanyValuesSection />

      {/* 5. Consultation CTA */}
      <ConsultationCTA />

      {/* 6. Instagram Feed */}
      <InstagramFeed />

      {/* 7. Contact CTA */}
      <ContactCTA />

      {/* 8. Career Application Form */}
      <CareerApplicationForm />

      {/* 9. Instagram Feed (second instance like original) */}
      <InstagramFeed />
    </div>
  )
}

export default CareersPage
