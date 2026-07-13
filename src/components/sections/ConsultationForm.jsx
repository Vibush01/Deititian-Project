import { useState } from 'react'
import { FaUserMd, FaClipboardList, FaHeadset } from 'react-icons/fa'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import { submitConsultationInquiry } from '../../services/inquiryService'
import { useLocations } from '../../hooks/usePageData'
import fitjeevaDietitian from '../../assets/images/fitjeeva-dietitian.webp'

const featureBadges = [
  { icon: <FaUserMd className="text-xl" />, label: 'Expert Nutritionists' },
  { icon: <FaClipboardList className="text-xl" />, label: 'Personalized Plans' },
  { icon: <FaHeadset className="text-xl" />, label: '24/7 Support' },
]

const initialFormState = {
  name: '', email: '', phone: '', whatsapp: '', age: '', gender: '',
  weight: '', height: '', hasConcern: 'no', medicalConcern: '',
  location: '', clinicLocation: '', consultationDate: '', consultationTime: '',
  botField: '' // Honeypot field
}

const clinicOptionsStatic = [
  'Chandigarh', 'Mohali', 'Amritsar', 'Jalandhar', 'Ludhiana',
  'Patiala', 'New Delhi', 'Dubai', 'Mumbai',
]

const ConsultationForm = ({ className = '' }) => {
  const { locations } = useLocations()
  
  // Extract city names from Firestore locations, or fallback to static list
  const clinicOptions = locations.length > 0 
    ? locations.map(loc => loc.city).filter(Boolean)
    : clinicOptionsStatic

  const [formData, setFormData] = useState(initialFormState)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Honeypot check for bots
    if (formData.botField) {
      console.warn('Bot detected by honeypot field.')
      return // Silently reject
    }

    // Phone validation
    const phoneRegex = /^[0-9+\-\s()]{10,20}$/
    if (!phoneRegex.test(formData.phone)) {
      alert('Please enter a valid phone number (at least 10 digits).')
      return
    }

    // Email validation (if provided)
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address.')
        return
      }
    }

    setSubmitting(true)
    try {
      // Try to save to Firestore
      if (import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        // Exclude botField from submission payload
        const { botField, ...submitData } = formData
        await submitConsultationInquiry(submitData)
      }
      setSubmitted(true)
      setFormData(initialFormState)
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Thank you! Your consultation request has been noted. We will contact you shortly.')
      setFormData(initialFormState)
    } finally {
      setSubmitting(false)
    }
  }

  const inputClasses = 'w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] transition-all duration-200'
  const labelClasses = 'block text-sm font-bold text-gray-700 mb-1.5'

  return (
    <section id="contact" className={`py-16 md:py-24 bg-white ${className}`}>
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">
          
          {/* Left Side — Image + Badges */}
          <div className="w-full lg:w-1/2 flex flex-col hidden lg:block">
            <SectionHeading
              label="Get Started"
              title="Transform Your Health Journey"
              subtitle="Experience personalized nutrition guidance tailored to your unique needs."
              align="left"
            />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8 group">
              <img
                src={fitjeevaDietitian}
                alt="Transform Your Health"
                loading="lazy"
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col gap-4">
                  {featureBadges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-4 text-white">
                      <div className="w-10 h-10 rounded-full bg-[#2E7D32] flex items-center justify-center shrink-0 shadow-lg">
                        {badge.icon}
                      </div>
                      <span className="font-bold tracking-wide">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side — Form */}
          <div className="w-full lg:w-1/2 bg-white rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-gray-100 p-6 md:p-10 lg:p-12">
            <div className="lg:hidden mb-8 text-center">
              <span className="inline-block bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                Get Started
              </span>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Transform Your Health</h2>
              <p className="text-gray-600 text-sm">Book a consultation with our experts.</p>
            </div>

            <div className="hidden lg:block mb-8">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Book Your Session</h3>
              <p className="text-gray-500">One change today. A healthier you tomorrow.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot Field (Hidden) */}
              <div className="hidden" aria-hidden="true">
                <label>Do not fill this out if you are human:</label>
                <input type="text" name="botField" value={formData.botField} onChange={handleChange} tabIndex="-1" autoComplete="off" />
              </div>

              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClasses}>Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" className={inputClasses} required />
                </div>
                <div>
                  <label className={labelClasses}>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className={inputClasses} />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClasses}>Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" min="1" max="120" className={inputClasses} />
                </div>
                <div>
                  <label className={labelClasses}>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className={inputClasses}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClasses}>Weight (kg)</label>
                  <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight in kg" className={inputClasses} />
                </div>
                <div>
                  <label className={labelClasses}>Height (cm)</label>
                  <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="Height in cm" className={inputClasses} />
                </div>
              </div>

              {/* Row 4 */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <label className={labelClasses}>Any Medical Concern?</label>
                <div className="flex gap-6 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="hasConcern" value="yes" checked={formData.hasConcern === 'yes'} onChange={handleChange} className="w-4 h-4 text-[#2E7D32]" />
                    <span className="text-sm font-semibold text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="hasConcern" value="no" checked={formData.hasConcern === 'no'} onChange={handleChange} className="w-4 h-4 text-[#2E7D32]" />
                    <span className="text-sm font-semibold text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {formData.hasConcern === 'yes' && (
                <div>
                  <label className={labelClasses}>Describe Concern</label>
                  <textarea name="medicalConcern" value={formData.medicalConcern} onChange={handleChange} placeholder="Describe your medical concern..." rows={3} className={`${inputClasses} resize-none`} />
                </div>
              )}

              {/* Row 5 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClasses}>Contact Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className={inputClasses} required />
                </div>
                <div>
                  <label className={labelClasses}>WhatsApp Number</label>
                  <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className={inputClasses} />
                </div>
              </div>

              {/* Row 6 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClasses}>Your Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="City / Area" className={inputClasses} />
                </div>
                <div>
                  <label className={labelClasses}>Select Clinic</label>
                  <select name="clinicLocation" value={formData.clinicLocation} onChange={handleChange} className={inputClasses}>
                    <option value="">Online / Virtual</option>
                    {clinicOptions.map((clinic) => (
                      <option key={clinic} value={clinic}>{clinic}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Success Message */}
              {submitted && (
                <div className="bg-[#E8F5E9] border border-[#2E7D32]/30 text-[#2E7D32] rounded-xl p-4 text-center font-bold text-sm">
                  ✓ Thank you! Your consultation request has been submitted. We will contact you shortly.
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <Button type="submit" disabled={submitting} className="w-full text-lg py-4 shadow-lg shadow-[#2E7D32]/30 hover:shadow-[#2E7D32]/50 disabled:opacity-60 disabled:cursor-not-allowed">
                  {submitting ? 'Submitting...' : 'Book Consultation Now'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConsultationForm
