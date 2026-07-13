import { useState, useEffect } from 'react'
import { FaSave, FaFileAlt, FaSpinner, FaPlus, FaTrash, FaGripVertical, FaImage } from 'react-icons/fa'
import { getDocument, setDocument, COLLECTIONS } from '../../firebase/collections'
import ImageUploader from '../../components/admin/ImageUploader'
import fitjeevaClinical from '../../assets/images/fitjeeva-clinical.webp'
import fitjeevaMillet from '../../assets/images/fitjeeva-millet.webp'
import fitjeevaHomevisit from '../../assets/images/fitjeeva-homevisit.webp'
import fitjeevaBanner from '../../assets/images/fitjeeva-banner-1.webp'
import fitjeevaDietitian from '../../assets/images/fitjeeva-dietitian.webp'

const defaultPhilosophyImages = [
  fitjeevaClinical,
  fitjeevaMillet,
  fitjeevaHomevisit,
  fitjeevaBanner,
  fitjeevaDietitian,
]

const AboutPageEditor = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [data, setData] = useState({
    aboutIntro: { title: '', subtitle: '', bio: '' },
    philosophySections: [],
    coreServices: [],
  })
  
  // Track which service image is being edited
  const [editingImageIndex, setEditingImageIndex] = useState(null)
  const [editingPhilosophyImageIndex, setEditingPhilosophyImageIndex] = useState(null)

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
          setLoading(false)
          return
        }

        const docData = await getDocument(COLLECTIONS.PAGES, 'about')
        const { aboutIntro, philosophySections, coreServices } = await import('../../data/aboutData')
        
        if (docData) {
          const mergedPhilosophy = (docData.philosophySections || []).map((section, idx) => {
            if (!section.image) {
              return { ...section, image: defaultPhilosophyImages[idx] || '' }
            }
            return section
          })

          const mergedServices = (docData.coreServices || []).map((service, idx) => {
            if (!service.image && coreServices[idx]?.image) {
              return { ...service, image: coreServices[idx].image }
            }
            return service
          })

          setData({
            aboutIntro: docData.aboutIntro || { title: '', subtitle: '', bio: '' },
            philosophySections: mergedPhilosophy,
            coreServices: mergedServices,
          })
        } else {
          const mappedPhilosophy = philosophySections.map((section, idx) => ({
            ...section,
            image: defaultPhilosophyImages[idx] || ''
          }))
          setData({ aboutIntro, philosophySections: mappedPhilosophy, coreServices })
        }
      } catch (error) {
        console.error('Failed to fetch about data', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAboutData()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setSaveMessage('')
    try {
      if (import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        await setDocument(COLLECTIONS.PAGES, 'about', data)
      }
      setSaveMessage('About page content saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      console.error('Error saving about data', error)
      setSaveMessage('Error saving content. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // --- Intro Handlers ---
  const handleIntroChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      aboutIntro: { ...prev.aboutIntro, [name]: value }
    }))
  }

  // --- Philosophy Handlers ---
  const handlePhilosophyChange = (index, field, value) => {
    setData(prev => {
      const newSections = [...prev.philosophySections]
      newSections[index] = { ...newSections[index], [field]: value }
      return { ...prev, philosophySections: newSections }
    })
  }

  const handleAddPhilosophy = () => {
    setData(prev => ({
      ...prev,
      philosophySections: [
        ...prev.philosophySections,
        { number: prev.philosophySections.length + 1, title: 'New Philosophy', description: '', image: '' }
      ]
    }))
  }

  const handleRemovePhilosophy = (index) => {
    setData(prev => {
      const newSections = [...prev.philosophySections]
      newSections.splice(index, 1)
      // re-number
      newSections.forEach((sec, i) => sec.number = i + 1)
      return { ...prev, philosophySections: newSections }
    })
  }

  // --- Core Services Handlers ---
  const handleServiceChange = (index, field, value) => {
    setData(prev => {
      const newServices = [...prev.coreServices]
      newServices[index] = { ...newServices[index], [field]: value }
      return { ...prev, coreServices: newServices }
    })
  }

  const handleAddService = () => {
    setData(prev => ({
      ...prev,
      coreServices: [
        ...prev.coreServices,
        { number: prev.coreServices.length + 1, title: 'New Service', description: '', image: '' }
      ]
    }))
  }

  const handleRemoveService = (index) => {
    setData(prev => {
      const newServices = [...prev.coreServices]
      newServices.splice(index, 1)
      newServices.forEach((sec, i) => sec.number = i + 1)
      return { ...prev, coreServices: newServices }
    })
  }

  const handleServiceImageUpload = (url) => {
    if (editingImageIndex !== null) {
      handleServiceChange(editingImageIndex, 'image', url)
      setEditingImageIndex(null)
    }
  }

  const handlePhilosophyImageUpload = (url) => {
    if (editingPhilosophyImageIndex !== null) {
      handlePhilosophyChange(editingPhilosophyImageIndex, 'image', url)
      setEditingPhilosophyImageIndex(null)
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
    <div className="max-w-5xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaFileAlt className="text-[#2E7D32]" />
            About Page Editor
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage the content displayed on the About Us page.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-sm transition-colors flex w-full sm:w-auto justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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

      {/* Intro Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">Hero & Introduction</h2>
        <div className="space-y-4">
          <div>
            <label className={labelClasses}>Main Title</label>
            <input type="text" name="title" value={data.aboutIntro.title} onChange={handleIntroChange} className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>Subtitle</label>
            <input type="text" name="subtitle" value={data.aboutIntro.subtitle} onChange={handleIntroChange} className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>Bio / Main Description</label>
            <textarea name="bio" value={data.aboutIntro.bio} onChange={handleIntroChange} rows={5} className={`${inputClasses} resize-none`} />
          </div>
        </div>
      </div>

      {/* Philosophy Sections */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Philosophy Sections</h2>
          <button onClick={handleAddPhilosophy} className="text-sm font-bold text-[#2E7D32] hover:bg-[#E8F5E9] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
            <FaPlus className="text-xs" /> Add Section
          </button>
        </div>
        
        <div className="space-y-4">
          {data.philosophySections.map((section, index) => (
            <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 group">
              <div className="pt-2"><FaGripVertical className="text-gray-400 cursor-grab" /></div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-1 rounded text-xs">{section.number}</span>
                    <input type="text" value={section.title} onChange={(e) => handlePhilosophyChange(index, 'title', e.target.value)} className={inputClasses} placeholder="Section Title" />
                  </div>
                  <textarea value={section.description} onChange={(e) => handlePhilosophyChange(index, 'description', e.target.value)} rows={3} className={`${inputClasses} resize-none`} placeholder="Section Description" />
                </div>
                
                <div className="flex flex-col gap-2 border border-gray-200 rounded-lg p-2 bg-white justify-center items-center relative overflow-hidden h-32 md:h-auto">
                  {section.image ? (
                    <>
                      <img src={section.image} alt="Philosophy" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                      <button 
                        onClick={() => handlePhilosophyChange(index, 'image', '')}
                        className="relative z-10 bg-white/90 text-red-500 hover:bg-red-50 p-2 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove Image"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => setEditingPhilosophyImageIndex(index)}
                      className="flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-[#2E7D32] w-full h-full transition-colors"
                    >
                      <FaImage className="text-2xl" />
                      <span className="text-xs font-medium">Add Image</span>
                    </button>
                  )}
                </div>
              </div>
              <button onClick={() => handleRemovePhilosophy(index)} className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors h-10">
                <FaTrash />
              </button>
            </div>
          ))}
          {data.philosophySections.length === 0 && (
            <p className="text-sm text-gray-500 italic text-center py-4">No philosophy sections added.</p>
          )}
        </div>
      </div>

      {/* Core Services */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Core Features</h2>
          <button onClick={handleAddService} className="text-sm font-bold text-[#2E7D32] hover:bg-[#E8F5E9] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
            <FaPlus className="text-xs" /> Add Feature
          </button>
        </div>
        
        <div className="space-y-4">
          {data.coreServices.map((service, index) => (
            <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 group">
              <div className="pt-2"><FaGripVertical className="text-gray-400 cursor-grab" /></div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-1 rounded text-xs">{service.number}</span>
                    <input type="text" value={service.title} onChange={(e) => handleServiceChange(index, 'title', e.target.value)} className={inputClasses} placeholder="Feature Title" />
                  </div>
                  <textarea value={service.description} onChange={(e) => handleServiceChange(index, 'description', e.target.value)} rows={3} className={`${inputClasses} resize-none`} placeholder="Feature Description" />
                </div>
                
                <div className="flex flex-col gap-2 border border-gray-200 rounded-lg p-2 bg-white justify-center items-center relative overflow-hidden h-32 md:h-auto">
                  {service.image ? (
                    <>
                      <img src={service.image} alt="Feature" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                      <button 
                        onClick={() => setEditingImageIndex(index)}
                        className="relative z-10 bg-white/90 px-3 py-1.5 text-xs font-bold rounded-md shadow-sm border border-gray-200 hover:bg-white"
                      >
                        Change Image
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => setEditingImageIndex(index)}
                      className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-[#2E7D32] hover:bg-gray-50 transition-colors rounded-md"
                    >
                      <FaImage className="text-2xl mb-1" />
                      <span className="text-xs font-bold">Add Image</span>
                    </button>
                  )}
                </div>
              </div>
              <button onClick={() => handleRemoveService(index)} className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors h-10 shrink-0">
                <FaTrash />
              </button>
            </div>
          ))}
          {data.coreServices.length === 0 && (
            <p className="text-sm text-gray-500 italic text-center py-4">No core features added.</p>
          )}
        </div>
      </div>

      {/* Upload Modals */}
      {editingImageIndex !== null && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Feature Image</h3>
            <ImageUploader onUpload={handleServiceImageUpload} />
            <button onClick={() => setEditingImageIndex(null)} className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors text-sm">Cancel</button>
          </div>
        </div>
      )}

      {editingPhilosophyImageIndex !== null && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Philosophy Image</h3>
            <ImageUploader onUpload={handlePhilosophyImageUpload} />
            <button onClick={() => setEditingPhilosophyImageIndex(null)} className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors text-sm">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AboutPageEditor
