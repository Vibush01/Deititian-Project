import { useState, useEffect } from 'react'
import { FaSave, FaCompass, FaSpinner, FaPlus, FaTrash, FaGripVertical } from 'react-icons/fa'
import { getDocument, setDocument, COLLECTIONS } from '../../firebase/collections'

const NavigationEditor = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [navLinks, setNavLinks] = useState([])
  const [footerLinks, setFooterLinks] = useState({
    company: [],
    wellnessPrograms: [],
    explore: [],
  })

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
          setLoading(false)
          return
        }

        const data = await getDocument(COLLECTIONS.NAVIGATION, 'main')
        if (data) {
          if (data.navLinks) setNavLinks(data.navLinks)
          if (data.footerLinks) {
            setFooterLinks(prev => ({
              company: data.footerLinks.company || prev.company,
              wellnessPrograms: data.footerLinks.wellnessPrograms || prev.wellnessPrograms,
              explore: data.footerLinks.explore || prev.explore,
            }))
          }
        }
      } catch (error) {
        console.error('Failed to fetch navigation', error)
      } finally {
        setLoading(false)
      }
    }
    fetchNavigation()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setSaveMessage('')

    try {
      if (import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        await setDocument(COLLECTIONS.NAVIGATION, 'main', { navLinks, footerLinks })
      }
      setSaveMessage('Navigation saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      console.error('Error saving navigation', error)
      setSaveMessage('Error saving navigation. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // Footer Links Handlers
  const handleFooterLinkChange = (section, index, field, value) => {
    setFooterLinks(prev => {
      const newSection = [...prev[section]]
      newSection[index] = { ...newSection[index], [field]: value }
      return { ...prev, [section]: newSection }
    })
  }

  const handleAddFooterLink = (section) => {
    setFooterLinks(prev => ({
      ...prev,
      [section]: [...prev[section], { label: 'New Link', path: '/' }]
    }))
  }

  const handleRemoveFooterLink = (section, index) => {
    setFooterLinks(prev => {
      const newSection = [...prev[section]]
      newSection.splice(index, 1)
      return { ...prev, [section]: newSection }
    })
  }

  const FooterLinkEditor = ({ title, sectionKey }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <button
          onClick={() => handleAddFooterLink(sectionKey)}
          className="text-sm font-bold text-[#2E7D32] hover:text-[#1B5E20] flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#E8F5E9] transition-colors"
        >
          <FaPlus className="text-xs" /> Add Link
        </button>
      </div>

      <div className="space-y-3">
        {footerLinks[sectionKey].map((link, idx) => (
          <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100 group">
            <FaGripVertical className="text-gray-400 cursor-grab active:cursor-grabbing" />
            <input
              type="text"
              value={link.label}
              onChange={(e) => handleFooterLinkChange(sectionKey, idx, 'label', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2E7D32]"
              placeholder="Label"
            />
            <input
              type="text"
              value={link.path}
              onChange={(e) => handleFooterLinkChange(sectionKey, idx, 'path', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#2E7D32]"
              placeholder="Path (e.g., /about)"
            />
            <button
              onClick={() => handleRemoveFooterLink(sectionKey, idx)}
              className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        {footerLinks[sectionKey].length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4 italic">No links added to this section.</p>
        )}
      </div>
    </div>
  )

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
            <FaCompass className="text-[#2E7D32]" />
            Navigation Editor
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage header and footer navigation links across the site.</p>
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

      {/* Main Navigation Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex items-start gap-4">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
          <span className="text-blue-600 font-bold text-lg">i</span>
        </div>
        <div>
          <h3 className="font-bold text-blue-900 mb-1">Main Header Navigation</h3>
          <p className="text-sm text-blue-800 leading-relaxed">
            The main header navigation contains a complex mega-menu structure. For this initial version, header navigation should be edited directly in the database or data files. Advanced UI editor for the mega-menu will be added in a future update.
          </p>
        </div>
      </div>

      {/* Footer Links */}
      <div>
        <h2 className="text-xl font-extrabold text-gray-900 mb-4 mt-8">Footer Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FooterLinkEditor title="Company" sectionKey="company" />
          <FooterLinkEditor title="Wellness Programs" sectionKey="wellnessPrograms" />
          <FooterLinkEditor title="Explore" sectionKey="explore" />
        </div>
      </div>
    </div>
  )
}

export default NavigationEditor
