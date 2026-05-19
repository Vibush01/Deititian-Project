import { useState } from 'react'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import ConsultationCTA from '../components/sections/ConsultationCTA'
import InstagramFeed from '../components/sections/InstagramFeed'
import ContactCTA from '../components/sections/ContactCTA'
import ClinicLocations from '../components/sections/ClinicLocations'

const ContactHero = () => (
  <section className="py-12 md:py-20 bg-[#2E7D32] text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
    <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
        Let's Start Your Health Journey
      </h1>
      <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
        We're here to help you start your health journey with the right guidance. Contact the FitJeeva team for appointments or support.
      </p>
    </div>
  </section>
)

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  })

  const serviceOptions = [
    'Weight Management', 'Disease Management', 'PCOD / PCOS', 'Thyroid', 'Diabetes', 'Lifestyle Management', 'Other',
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for reaching out! Our team will contact you shortly.')
    setFormData({ name: '', email: '', phone: '', service: '', message: '' })
  }

  const inputClasses = 'w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] focus:bg-white transition-all text-sm'

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8F5E9]/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0"></div>
          
          <div className="relative z-10 text-center mb-10">
            <span className="inline-block bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
              Get in Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Fill out the form</h2>
            <p className="text-gray-600">Our team will contact you shortly to understand your health concerns and guide you to the right program.</p>
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required className={inputClasses} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" required className={inputClasses} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your contact number" required className={inputClasses} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Service Interested In <span className="text-red-500">*</span></label>
                <select name="service" value={formData.service} onChange={handleChange} required className={`${inputClasses} appearance-none cursor-pointer`}>
                  <option value="">Select a service</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Your Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your health goals or any specific concerns..." rows={4} className={`${inputClasses} resize-none`} />
            </div>

            <div className="pt-4 flex justify-center">
              <Button type="submit" className="w-full md:w-auto px-10 bg-[#2E7D32] hover:bg-[#1B5E20] py-3.5">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

const ContactPage = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <ContactHero />
      <ContactForm />
      <ConsultationCTA />
      <InstagramFeed />
      <ContactCTA />
      <ClinicLocations />
    </div>
  )
}

export default ContactPage
