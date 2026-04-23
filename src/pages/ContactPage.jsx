import { useState } from 'react'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import ConsultationCTA from '../components/sections/ConsultationCTA'
import InstagramFeed from '../components/sections/InstagramFeed'
import ContactCTA from '../components/sections/ContactCTA'
import ClinicLocations from '../components/sections/ClinicLocations'

/* =========================================================
   Contact Hero — Centered quote card
   ========================================================= */
const ContactHero = () => (
  <section className="bg-gradient-to-b from-blue-50 via-white to-white">
    <div className="container-custom py-12 md:py-16">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-[var(--shadow-card)] border border-gray-border p-8 md:p-12 lg:p-16">
        <p className="text-xl md:text-2xl lg:text-[1.7rem] text-gray-600 font-medium leading-relaxed text-center italic">
          We&apos;re here to help you start your health journey with the right
          guidance. Contact Dietitian Shreya team for appointments or support.
        </p>
      </div>
    </div>
  </section>
)

/* =========================================================
   Contact Form — "Fill out the form"
   ========================================================= */
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  const serviceOptions = [
    'Weight Management',
    'Disease Management',
    'PCOD / PCOS',
    'Thyroid',
    'Diabetes',
    'Lifestyle Management',
    'Other',
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    alert('Thank you for reaching out! Our team will contact you shortly.')
    setFormData({ name: '', email: '', phone: '', service: '', message: '' })
  }

  const inputClasses =
    'w-full px-4 py-3 rounded-full border border-gray-border bg-white text-dark placeholder:text-gray-text/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors text-sm'

  return (
    <section className="section-padding bg-white">
      <div className="container-custom max-w-3xl">
        <SectionHeading
          label="Get in Touch"
          title="Fill out the form"
          subtitle="Our team will contact you shortly to understand your health concerns and guide you to the right program."
        />

        <form onSubmit={handleSubmit} className="space-y-5 mt-8">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">
              Full Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
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

          {/* Service */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">
              Service Interested In <span className="text-primary">*</span>
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className={`${inputClasses} appearance-none cursor-pointer`}
            >
              <option value="">Select a service</option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">
              Your Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your health goals or any specific concerns..."
              rows={4}
              className="w-full px-4 py-3 rounded-2xl border border-gray-border bg-white text-dark placeholder:text-gray-text/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors text-sm resize-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

/* =========================================================
   Contact Page — Full Composition
   ========================================================= */
const ContactPage = () => {
  return (
    <div>
      {/* 1. Hero — centered quote card */}
      <ContactHero />

      {/* 2. Contact Form */}
      <ContactForm />

      {/* 3. Consultation CTA */}
      <ConsultationCTA />

      {/* 4. Instagram Feed */}
      <InstagramFeed />

      {/* 5. Contact CTA (WhatsApp/Call/Book) */}
      <ContactCTA />

      {/* 6. Clinic Locations */}
      <ClinicLocations />
    </div>
  )
}

export default ContactPage
