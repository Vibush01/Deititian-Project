import { useState, useEffect } from 'react'
import { FaSave, FaBriefcase, FaSpinner, FaPlus, FaTrash, FaGripVertical, FaImage } from 'react-icons/fa'
import { getDocument, setDocument, COLLECTIONS } from '../../firebase/collections'
import ImageUploader from '../../components/admin/ImageUploader'

const CareersEditor = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [data, setData] = useState({
    hero: { title: '', ctaText: '' },
    companyValues: [],
    jobPositions: [],
    teamImages: [],
  })

  // Track which array image is being edited
  const [uploadingTarget, setUploadingTarget] = useState(null)

  useEffect(() => {
    const fetchCareersData = async () => {
      try {
        if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
          setLoading(false)
          return
        }

        const docData = await getDocument(COLLECTIONS.CAREERS, 'main')
        if (docData) {
          setData({
            hero: docData.hero || { title: '', ctaText: '' },
            companyValues: docData.companyValues || [],
            jobPositions: docData.jobPositions || [],
            teamImages: docData.teamImages || [],
          })
        } else {
          const { careersHero, companyValues, jobPositions, teamImages } = await import('../../data/careersData')
          setData({
            hero: careersHero,
            companyValues,
            jobPositions,
            teamImages,
          })
        }
      } catch (error) {
        console.error('Failed to fetch careers data', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCareersData()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setSaveMessage('')
    try {
      if (import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        await setDocument(COLLECTIONS.CAREERS, 'main', data)
      }
      setSaveMessage('Careers page content saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      console.error('Error saving careers data', error)
      setSaveMessage('Error saving content. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // --- Hero Handlers ---
  const handleHeroChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      hero: { ...prev.hero, [name]: value }
    }))
  }

  // --- Company Values Handlers ---
  const handleValueChange = (index, field, value) => {
    setData(prev => {
      const newValues = [...prev.companyValues]
      newValues[index] = { ...newValues[index], [field]: value }
      return { ...prev, companyValues: newValues }
    })
  }

  const handleAddValue = () => {
    setData(prev => ({
      ...prev,
      companyValues: [
        ...prev.companyValues,
        { number: String(prev.companyValues.length + 1).padStart(2, '0'), title: 'New Value', description: '' }
      ]
    }))
  }

  const handleRemoveValue = (index) => {
    setData(prev => {
      const newValues = [...prev.companyValues]
      newValues.splice(index, 1)
      newValues.forEach((val, i) => val.number = String(i + 1).padStart(2, '0'))
      return { ...prev, companyValues: newValues }
    })
  }

  // --- Job Positions Handlers ---
  const handlePositionChange = (index, value) => {
    setData(prev => {
      const newPositions = [...prev.jobPositions]
      newPositions[index] = value
      return { ...prev, jobPositions: newPositions }
    })
  }

  const handleAddPosition = () => {
    setData(prev => ({
      ...prev,
      jobPositions: [...prev.jobPositions, 'New Position']
    }))
  }

  const handleRemovePosition = (index) => {
    setData(prev => {
      const newPositions = [...prev.jobPositions]
      newPositions.splice(index, 1)
      return { ...prev, jobPositions: newPositions }
    })
  }

  // --- Team Images Handlers ---
  const handleAddTeamImage = (url) => {
    if (uploadingTarget === 'team') {
      setData(prev => ({
        ...prev,
        teamImages: [...prev.teamImages, url]
      }))
      setUploadingTarget(null)
    }
  }

  const handleRemoveTeamImage = (index) => {
    setData(prev => {
      const newImages = [...prev.teamImages]
      newImages.splice(index, 1)
      return { ...prev, teamImages: newImages }
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
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaBriefcase className="text-[#2E7D32]" />
            Careers Page Editor
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage the content displayed on the Careers page.</p>
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
        <h2 className="text-lg font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">Hero Section</h2>
        <div className="space-y-4">
          <div>
            <label className={labelClasses}>Main Title</label>
            <input type="text" name="title" value={data.hero.title} onChange={handleHeroChange} className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>CTA Button Text</label>
            <input type="text" name="ctaText" value={data.hero.ctaText} onChange={handleHeroChange} className={inputClasses} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Positions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Open Positions</h2>
            <button onClick={handleAddPosition} className="text-sm font-bold text-[#2E7D32] hover:bg-[#E8F5E9] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
              <FaPlus className="text-xs" /> Add Position
            </button>
          </div>
          
          <div className="space-y-3">
            {data.jobPositions.map((position, index) => (
              <div key={index} className="flex gap-2 items-center">
                <FaGripVertical className="text-gray-400 cursor-grab" />
                <input type="text" value={position} onChange={(e) => handlePositionChange(index, e.target.value)} className={inputClasses} placeholder="Position Name" />
                <button onClick={() => handleRemovePosition(index)} className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors shrink-0">
                  <FaTrash />
                </button>
              </div>
            ))}
            {data.jobPositions.length === 0 && (
              <p className="text-sm text-gray-500 italic text-center py-4">No positions added.</p>
            )}
          </div>
        </div>

        {/* Team Images */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Hero Images grid</h2>
            <button onClick={() => setUploadingTarget('team')} className="text-sm font-bold text-[#2E7D32] hover:bg-[#E8F5E9] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
              <FaPlus className="text-xs" /> Add Image
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {data.teamImages.map((img, index) => (
              <div key={index} className="relative group rounded-xl overflow-hidden border border-gray-200 h-28">
                <img src={img} alt={`Team ${index}`} className="w-full h-full object-cover" />
                <button 
                  onClick={() => handleRemoveTeamImage(index)}
                  className="absolute top-2 right-2 bg-white/90 text-red-500 hover:bg-red-50 p-1.5 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
            ))}
          </div>
          {data.teamImages.length === 0 && (
            <p className="text-sm text-gray-500 italic text-center py-4 mt-2 border-t border-gray-100">No images added to the grid.</p>
          )}
        </div>
      </div>

      {/* Company Values */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Company Values</h2>
          <button onClick={handleAddValue} className="text-sm font-bold text-[#2E7D32] hover:bg-[#E8F5E9] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
            <FaPlus className="text-xs" /> Add Value
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.companyValues.map((value, index) => (
            <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 group">
              <div className="pt-2"><FaGripVertical className="text-gray-400 cursor-grab" /></div>
              <div className="flex-1 space-y-3 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-1 rounded text-xs shrink-0">{value.number}</span>
                  <input type="text" value={value.title} onChange={(e) => handleValueChange(index, 'title', e.target.value)} className={inputClasses} placeholder="Value Title" />
                </div>
                <textarea value={value.description} onChange={(e) => handleValueChange(index, 'description', e.target.value)} rows={3} className={`${inputClasses} resize-none`} placeholder="Value Description" />
              </div>
              <button onClick={() => handleRemoveValue(index)} className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors h-10 shrink-0">
                <FaTrash />
              </button>
            </div>
          ))}
          {data.companyValues.length === 0 && (
            <p className="text-sm text-gray-500 italic text-center py-4 md:col-span-2">No company values added.</p>
          )}
        </div>
      </div>

      {/* Image Upload Modal */}
      {uploadingTarget && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Team Grid Image</h3>
            <ImageUploader onUpload={handleAddTeamImage} />
            <button 
              onClick={() => setUploadingTarget(null)}
              className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CareersEditor
