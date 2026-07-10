import { useState, useEffect } from 'react'
import { FaSave, FaCog, FaSpinner } from 'react-icons/fa'
import { getDocument, setDocument, COLLECTIONS } from '../../firebase/collections'

const SiteSettingsEditor = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [settings, setSettings] = useState({
    siteInfo: {
      name: '', email: '', phone: '', whatsapp: '', address: '', supportHours: '',
    },
    socialLinks: {
      facebook: '', instagram: '', linkedin: '', youtube: '',
    },
    statsData: {
      happyClients: '', successStories: '', clinicLocations: '',
    },
    spotlightStats: [
      { number: "1,00,000+", label: "Lives Transformed" },
      { number: "35,000+", label: "Weight Loss Journeys" },
      { number: "Chandigarh", label: "Based in India" },
    ],
    spotlightTestimonial: {
      name: "Simran K.",
      review: "“Lost 18 kg in 4 months with FitJeeva's personalized plan. The diet was entirely home-cooked Indian food. No supplements, no shortcuts!”"
    },
    ctaHeading: "Book a Diet Consultation for Life-Changing Results",
    ctaStat: "35,000+",
    ctaSubtext: "people have transformed their weight loss journeys with FitJeeva.",
    contactCtaTitle: "Start Your Transformation: Contact FitJeeva for Expert Guidance",
    contactCtaSubtitle: "The first step to a healthier you starts here. Book a diet consultation and talk to a diet expert now to begin your transformation. Connect with our team through the channel you love — our responses are always personalised and judgment-free."
  })

  // We fetch initial data. We don't necessarily need real-time updates while editing.
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
          setLoading(false)
          return
        }
        
        const data = await getDocument(COLLECTIONS.SITE_SETTINGS, 'main')
        if (data) {
          // Merge with default structure to prevent undefined errors
          setSettings(prev => ({
            ...prev,
            ...data,
            siteInfo: { ...prev.siteInfo, ...data.siteInfo },
            socialLinks: { ...prev.socialLinks, ...data.socialLinks },
            statsData: { ...prev.statsData, ...data.statsData },
            spotlightStats: data.spotlightStats || prev.spotlightStats,
            spotlightTestimonial: data.spotlightTestimonial || prev.spotlightTestimonial,
            ctaHeading: data.ctaHeading || prev.ctaHeading,
            ctaStat: data.ctaStat || prev.ctaStat,
            ctaSubtext: data.ctaSubtext || prev.ctaSubtext,
            contactCtaTitle: data.contactCtaTitle || prev.contactCtaTitle,
            contactCtaSubtitle: data.contactCtaSubtitle || prev.contactCtaSubtitle,
          }))
        }
      } catch (error) {
        console.error('Failed to fetch site settings', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleInfoChange = (e) => {
    const { name, value } = e.target
    setSettings(prev => ({
      ...prev,
      siteInfo: { ...prev.siteInfo, [name]: value }
    }))
  }

  const handleSocialChange = (e) => {
    const { name, value } = e.target
    setSettings(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value }
    }))
  }

  const handleStatsChange = (e) => {
    const { name, value } = e.target
    setSettings(prev => ({
      ...prev,
      statsData: { ...prev.statsData, [name]: value }
    }))
  }

  const handleSpotlightStatChange = (index, field, value) => {
    setSettings(prev => {
      const newStats = [...prev.spotlightStats]
      newStats[index] = { ...newStats[index], [field]: value }
      return { ...prev, spotlightStats: newStats }
    })
  }

  const handleTestimonialChange = (e) => {
    const { name, value } = e.target
    setSettings(prev => ({
      ...prev,
      spotlightTestimonial: { ...prev.spotlightTestimonial, [name]: value }
    }))
  }

  const handleSettingsChange = (e) => {
    const { name, value } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setSaveMessage('')

    try {
      if (import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        await setDocument(COLLECTIONS.SITE_SETTINGS, 'main', settings)
      }
      setSaveMessage('Settings saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      console.error('Error saving settings', error)
      setSaveMessage('Error saving settings. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const inputClasses = 'w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/50 focus:border-[#2E7D32] transition-colors text-sm'
  const labelClasses = 'block text-sm font-semibold text-gray-700 mb-1.5'

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <FaSpinner className="text-[#2E7D32] text-3xl animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaCog className="text-[#2E7D32]" />
            Site Settings
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage global website information, social links, and statistics.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-sm transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {saveMessage && (
        <div className={`mb-6 p-4 rounded-lg font-bold text-sm ${saveMessage.includes('Error') ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-[#E8F5E9] text-[#2E7D32] border border-[#2E7D32]/30'}`}>
          {saveMessage}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">General Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClasses}>Site/Business Name</label>
              <input type="text" name="name" value={settings.siteInfo.name} onChange={handleInfoChange} className={inputClasses} placeholder="FitJeeva" />
            </div>
            <div>
              <label className={labelClasses}>Contact Email</label>
              <input type="email" name="email" value={settings.siteInfo.email} onChange={handleInfoChange} className={inputClasses} placeholder="info@fitjeeva.com" />
            </div>
            <div>
              <label className={labelClasses}>Contact Phone</label>
              <input type="text" name="phone" value={settings.siteInfo.phone} onChange={handleInfoChange} className={inputClasses} placeholder="+91 1234567890" />
            </div>
            <div>
              <label className={labelClasses}>WhatsApp Number</label>
              <input type="text" name="whatsapp" value={settings.siteInfo.whatsapp} onChange={handleInfoChange} className={inputClasses} placeholder="911234567890" />
            </div>
            <div>
              <label className={labelClasses}>Support Hours</label>
              <input type="text" name="supportHours" value={settings.siteInfo.supportHours} onChange={handleInfoChange} className={inputClasses} placeholder="Mon-Sat, 9AM-6PM" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClasses}>Primary Address</label>
              <textarea name="address" value={settings.siteInfo.address} onChange={handleInfoChange} className={`${inputClasses} resize-none h-20`} placeholder="Full address" />
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">Homepage Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className={labelClasses}>Happy Clients</label>
              <input type="text" name="happyClients" value={settings.statsData.happyClients} onChange={handleStatsChange} className={inputClasses} placeholder="e.g. 10k+" />
            </div>
            <div>
              <label className={labelClasses}>Success Stories</label>
              <input type="text" name="successStories" value={settings.statsData.successStories} onChange={handleStatsChange} className={inputClasses} placeholder="e.g. 500+" />
            </div>
            <div>
              <label className={labelClasses}>Clinic Locations</label>
              <input type="text" name="clinicLocations" value={settings.statsData.clinicLocations} onChange={handleStatsChange} className={inputClasses} placeholder="e.g. 10+" />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">Social Media Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClasses}>Instagram URL</label>
              <input type="url" name="instagram" value={settings.socialLinks.instagram} onChange={handleSocialChange} className={inputClasses} placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className={labelClasses}>Facebook URL</label>
              <input type="url" name="facebook" value={settings.socialLinks.facebook} onChange={handleSocialChange} className={inputClasses} placeholder="https://facebook.com/..." />
            </div>
            <div>
              <label className={labelClasses}>LinkedIn URL</label>
              <input type="url" name="linkedin" value={settings.socialLinks.linkedin} onChange={handleSocialChange} className={inputClasses} placeholder="https://linkedin.com/..." />
            </div>
            <div>
              <label className={labelClasses}>YouTube URL</label>
              <input type="url" name="youtube" value={settings.socialLinks.youtube} onChange={handleSocialChange} className={inputClasses} placeholder="https://youtube.com/..." />
            </div>
          </div>
        </div>

        {/* Client Spotlight Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
            Client Spotlight Settings
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3">Spotlight Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {settings.spotlightStats.map((stat, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
                    <div>
                      <label className={labelClasses}>Number {index + 1}</label>
                      <input
                        type="text"
                        value={stat.number}
                        onChange={(e) => handleSpotlightStatChange(index, 'number', e.target.value)}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>Label {index + 1}</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => handleSpotlightStatChange(index, 'label', e.target.value)}
                        className={inputClasses}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClasses}>Testimonial Name</label>
                <input
                  type="text"
                  name="name"
                  value={settings.spotlightTestimonial.name}
                  onChange={handleTestimonialChange}
                  className={inputClasses}
                  placeholder="Simran K."
                />
              </div>
              <div>
                <label className={labelClasses}>Testimonial Review</label>
                <textarea
                  name="review"
                  value={settings.spotlightTestimonial.review}
                  onChange={handleTestimonialChange}
                  className={inputClasses}
                  rows={3}
                  placeholder="Lost 18 kg in 4 months..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Call To Action (CTA) Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
            Call To Action (CTA) Settings
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className={labelClasses}>CTA Heading</label>
              <input
                type="text"
                name="ctaHeading"
                value={settings.ctaHeading}
                onChange={handleSettingsChange}
                className={inputClasses}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>CTA Highlight Stat (e.g., 35,000+)</label>
                <input
                  type="text"
                  name="ctaStat"
                  value={settings.ctaStat}
                  onChange={handleSettingsChange}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>CTA Subtext</label>
                <input
                  type="text"
                  name="ctaSubtext"
                  value={settings.ctaSubtext}
                  onChange={handleSettingsChange}
                  className={inputClasses}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
            Contact Call To Action (Contact Page)
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className={labelClasses}>Contact CTA Title</label>
              <input
                type="text"
                name="contactCtaTitle"
                value={settings.contactCtaTitle}
                onChange={handleSettingsChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Contact CTA Subtitle</label>
              <textarea
                name="contactCtaSubtitle"
                value={settings.contactCtaSubtitle}
                onChange={handleSettingsChange}
                className={inputClasses}
                rows={3}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SiteSettingsEditor
