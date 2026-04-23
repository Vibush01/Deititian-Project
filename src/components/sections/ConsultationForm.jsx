import { useState } from 'react'
import { FaUserMd, FaClipboardList, FaHeadset } from 'react-icons/fa'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'

/**
 * Consultation booking form — split layout with left image + right form.
 * "Transform Your Health Journey" section.
 *
 * @param {string} className - Additional wrapper classes
 */

const featureBadges = [
  { icon: <FaUserMd />, label: 'Expert Nutritionists' },
  { icon: <FaClipboardList />, label: 'Personalized Plans' },
  { icon: <FaHeadset />, label: '24/7 Support' },
]

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  whatsapp: '',
  age: '',
  gender: '',
  weight: '',
  height: '',
  hasConcern: 'no',
  medicalConcern: '',
  location: '',
  clinicLocation: '',
  consultationDate: '',
  consultationTime: '',
}

const clinicOptions = [
  'Chandigarh',
  'Mohali',
  'Amritsar',
  'Jalandhar',
  'Ludhiana',
  'Patiala',
  'New Delhi',
  'Dubai',
  'Mumbai',
]

const ConsultationForm = ({ className = '' }) => {
  const [formData, setFormData] = useState(initialFormState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Form submission will be integrated with external service later
    console.log('Form submitted:', formData)
    alert('Thank you! Your consultation request has been submitted. We will contact you shortly.')
    setFormData(initialFormState)
  }

  const inputClasses = 'w-full px-4 py-3 rounded-xl border border-gray-border bg-white text-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200'
  const labelClasses = 'block text-sm font-semibold text-dark mb-1.5'

  return (
    <section id="contact" className={`section-padding bg-gray-light ${className}`}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Left Side — Image + Badges */}
          <div className="hidden lg:block">
            <SectionHeading
              label="Get Started"
              title="Transform Your Health Journey"
              subtitle="Experience personalized nutrition guidance tailored to your unique needs."
              align="left"
            />

            <div className="relative mt-6">
              <img
                src="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=500&h=600&fit=crop"
                alt="Transform Your Health"
                className="w-full max-w-md rounded-3xl shadow-lg object-cover"
              />
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-3 mt-6">
              {featureBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm"
                >
                  <span className="text-primary text-sm">{badge.icon}</span>
                  <span className="text-xs font-semibold text-dark">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side — Form */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[var(--shadow-card)]">
            {/* Mobile-only heading */}
            <div className="lg:hidden mb-6">
              <SectionHeading
                label="Get Started"
                title="Transform Your Health Journey"
                subtitle="Book a consultation with our experts."
                align="center"
              />
            </div>

            <h3 className="text-lg font-bold text-dark mb-1 hidden lg:block">
              One change today. A healthier you tomorrow
            </h3>
            <p className="text-sm text-gray-text mb-6 hidden lg:block">
              Book a consultation with our experts.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={inputClasses}
                    required
                  />
                </div>
                <div>
                  <label className={labelClasses}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Row 2: Age + Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                    min="1"
                    max="120"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={inputClasses}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Weight + Height */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Weight in kg"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Height in cm"
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Row 4: Concern */}
              <div>
                <label className={labelClasses}>Any Concern?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasConcern"
                      value="yes"
                      checked={formData.hasConcern === 'yes'}
                      onChange={handleChange}
                      className="accent-primary"
                    />
                    <span className="text-sm text-dark">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasConcern"
                      value="no"
                      checked={formData.hasConcern === 'no'}
                      onChange={handleChange}
                      className="accent-primary"
                    />
                    <span className="text-sm text-dark">No</span>
                  </label>
                </div>
              </div>

              {formData.hasConcern === 'yes' && (
                <div>
                  <label className={labelClasses}>Medical Concern</label>
                  <textarea
                    name="medicalConcern"
                    value={formData.medicalConcern}
                    onChange={handleChange}
                    placeholder="Describe your medical concern..."
                    rows={3}
                    className={`${inputClasses} resize-none`}
                  />
                </div>
              )}

              {/* Row 5: Phone + WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Contact Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className={inputClasses}
                    required
                  />
                </div>
                <div>
                  <label className={labelClasses}>WhatsApp Number</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Row 6: Location + Clinic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Your Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City / Area"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Select Clinic</label>
                  <select
                    name="clinicLocation"
                    value={formData.clinicLocation}
                    onChange={handleChange}
                    className={inputClasses}
                  >
                    <option value="">Select Clinic Location</option>
                    {clinicOptions.map((clinic) => (
                      <option key={clinic} value={clinic}>{clinic}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 7: Date + Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Consultation Date</label>
                  <input
                    type="date"
                    name="consultationDate"
                    value={formData.consultationDate}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Consultation Time</label>
                  <input
                    type="time"
                    name="consultationTime"
                    value={formData.consultationTime}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full mt-2" size="lg">
                Book a Consultation Now
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConsultationForm
