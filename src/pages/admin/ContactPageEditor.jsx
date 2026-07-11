import { useState, useEffect } from 'react'
import { FaSave, FaEnvelope, FaSpinner, FaMapMarkerAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { getDocument, setDocument, COLLECTIONS } from '../../firebase/collections'

const ContactPageEditor = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  
  const [pageData, setPageData] = useState({
    heroTitle: 'Get in Touch',
    heroSubtitle: "Whether you're ready to start your journey or just have a few questions, we're here to help.",
  })

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
          setLoading(false)
          return
        }

        const data = await getDocument(COLLECTIONS.PAGES, 'contact')
        if (data) {
          setPageData(prev => ({ ...prev, ...data }))
        }
      } catch (error) {
        console.error('Failed to fetch contact page data', error)
      } finally {
        setLoading(false)
      }
    }
    fetchContactData()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setSaveMessage('')
    try {
      if (import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        await setDocument(COLLECTIONS.PAGES, 'contact', pageData)
      }
      setSaveMessage('Contact page content saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      console.error('Error saving contact data', error)
      setSaveMessage('Error saving content. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setPageData(prev => ({ ...prev, [name]: value }))
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
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaEnvelope className="text-[#2E7D32]" />
            Contact Page Editor
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage the hero content for the Contact page.</p>
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
        <div className={`p-4 rounded-lg font-bold text-sm ${saveMessage.includes('Error') ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-[#E8F5E9] text-[#2E7D32] border border-[#2E7D32]/30'}`}>
          {saveMessage}
        </div>
      )}

      {/* Hero Section Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">Contact Hero Section</h2>
        <div className="space-y-5">
          <div>
            <label className={labelClasses}>Hero Title</label>
            <input
              type="text"
              name="heroTitle"
              value={pageData.heroTitle}
              onChange={handleChange}
              className={inputClasses}
              placeholder="e.g. Get in Touch"
            />
          </div>
          <div>
            <label className={labelClasses}>Hero Subtitle</label>
            <textarea
              name="heroSubtitle"
              value={pageData.heroSubtitle}
              onChange={handleChange}
              className={inputClasses}
              rows={3}
              placeholder="Short description..."
            />
          </div>
        </div>
      </div>

      {/* Helpful Links */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">Other Contact Elements</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div>
              <div className="font-bold text-gray-800 flex items-center gap-2">
                <FaEnvelope className="text-gray-500" /> Form Submissions
              </div>
              <div className="text-sm text-gray-500 mt-1">Read messages submitted through the contact form.</div>
            </div>
            <Link to="/admin/inquiries" className="text-[#2E7D32] hover:underline font-bold text-sm">Go to Inquiries →</Link>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div>
              <div className="font-bold text-gray-800 flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-500" /> Clinic Locations
              </div>
              <div className="text-sm text-gray-500 mt-1">Manage address details shown on the contact page.</div>
            </div>
            <Link to="/admin/locations" className="text-[#2E7D32] hover:underline font-bold text-sm">Go to Locations →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPageEditor
