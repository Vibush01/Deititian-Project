import { useState, useEffect } from 'react'
import { FaSave, FaShieldAlt, FaSpinner, FaPlus, FaTrash } from 'react-icons/fa'
import { getDocument, setDocument, COLLECTIONS } from '../../firebase/collections'

export const defaultSections = [
  {
    title: 'Information We Collect',
    content: 'We may collect the following information when you interact with our website or services:\n- Name, phone number, email address\n- Health-related information shared voluntarily through forms\n- Appointment and consultation details\n- Website usage data (cookies, IP address, browser type)'
  },
  {
    title: 'How We Use Your Information',
    content: 'The information collected is used to:\n- Schedule consultations and appointments\n- Provide personalized diet and lifestyle guidance\n- Respond to queries and support requests\n- Improve our services and website experience\n- Send updates, reminders, or health-related communication (with consent)'
  },
  {
    title: 'Medical & Health Information',
    content: 'Any medical or health information shared with us is treated as strictly confidential and is used only for consultation, guidance, and service delivery purposes.'
  },
  {
    title: 'Data Protection & Security',
    content: 'We implement reasonable security measures to protect your personal and health data against unauthorized access, alteration, or disclosure. However, no internet transmission is entirely secure, and we cannot guarantee absolute data security.'
  },
  {
    title: 'Contact Us',
    content: 'If you have any questions or concerns regarding this Privacy Policy or your data, please reach out to us via our Contact Page.'
  }
]

const PrivacyPolicyEditor = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  
  const [pageData, setPageData] = useState({
    heroTitle: 'Privacy Policy',
    heroSubtitle: 'At FitJeeva, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or use our services.',
    sections: defaultSections
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
          setLoading(false)
          return
        }

        const data = await getDocument(COLLECTIONS.PAGES, 'privacy')
        if (data) {
          setPageData(prev => ({
            ...prev,
            ...data,
            sections: data.sections || defaultSections
          }))
        }
      } catch (error) {
        console.error('Failed to fetch privacy policy data', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setSaveMessage('')
    try {
      if (import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        await setDocument(COLLECTIONS.PAGES, 'privacy', pageData)
      }
      setSaveMessage('Privacy policy saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      console.error('Error saving privacy policy', error)
      setSaveMessage('Error saving content. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setPageData(prev => ({ ...prev, [name]: value }))
  }

  const handleSectionChange = (index, field, value) => {
    setPageData(prev => {
      const newSections = [...prev.sections]
      newSections[index] = { ...newSections[index], [field]: value }
      return { ...prev, sections: newSections }
    })
  }

  const addSection = () => {
    setPageData(prev => ({
      ...prev,
      sections: [...prev.sections, { title: 'New Section', content: '' }]
    }))
  }

  const removeSection = (index) => {
    setPageData(prev => {
      const newSections = [...prev.sections]
      newSections.splice(index, 1)
      return { ...prev, sections: newSections }
    })
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaShieldAlt className="text-[#2E7D32]" />
            Privacy Policy Editor
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage the content of your privacy policy page.</p>
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

      {/* Hero Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">Hero Content</h2>
        <div className="space-y-5">
          <div>
            <label className={labelClasses}>Title</label>
            <input
              type="text"
              name="heroTitle"
              value={pageData.heroTitle}
              onChange={handleFieldChange}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Introduction Text</label>
            <textarea
              name="heroSubtitle"
              value={pageData.heroSubtitle}
              onChange={handleFieldChange}
              className={inputClasses}
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Policy Sections</h2>
            <p className="text-xs text-gray-500 mt-1">Add or edit the sections of your privacy policy.</p>
          </div>
          <button onClick={addSection} className="text-sm font-bold text-[#2E7D32] hover:bg-[#E8F5E9] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
            <FaPlus className="text-xs" /> Add Section
          </button>
        </div>

        <div className="space-y-6">
          {pageData.sections.map((section, index) => (
            <div key={index} className="p-5 bg-gray-50 rounded-xl border border-gray-100 relative group">
              <button
                onClick={() => removeSection(index)}
                className="absolute top-4 right-4 text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                title="Remove Section"
              >
                <FaTrash className="text-sm" />
              </button>
              
              <div className="space-y-4 pr-10">
                <div>
                  <label className={labelClasses}>Section Heading</label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Content</label>
                  <textarea
                    value={section.content}
                    onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                    className={inputClasses}
                    rows={4}
                    placeholder="Use - at the beginning of a line to create bullet points"
                  />
                  <p className="text-xs text-gray-500 mt-1">Start a line with "-" to render it as a bullet point.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyEditor
