import { useState, useEffect } from 'react'
import { FaSave, FaFileMedical, FaSpinner, FaPlus, FaTrash, FaImage, FaListUl } from 'react-icons/fa'
import { getCollection, setDocument, removeDocument, COLLECTIONS } from '../../firebase/collections'
import ImageUploader from '../../components/admin/ImageUploader'

const ServiceSubPageEditor = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [subPages, setSubPages] = useState([])
  const [itemsToDelete, setItemsToDelete] = useState([])
  
  // Active page being edited for better UI handling since these are large
  const [activePageIndex, setActivePageIndex] = useState(0)
  
  // Uploading state: { pageIndex, sectionIndex?: number }
  const [uploadingTarget, setUploadingTarget] = useState(null)

  useEffect(() => {
    const fetchSubPages = async () => {
      try {
        if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
          setLoading(false)
          return
        }

        const data = await getCollection(COLLECTIONS.SERVICE_SUB_PAGES)
        if (data && data.length > 0) {
          // Since we use ID as slug (e.g. "pcod-pcos"), we track the original id to know if it's new or existing
          setSubPages(data.map(d => ({ ...d, _originalId: d.id })))
        } else {
          // Fallback to hardcoded services data
          const { serviceSubPages } = await import('../../data/servicesData')
          const fallbackData = Object.keys(serviceSubPages).map(key => ({
            id: key,
            _originalId: key,
            ...serviceSubPages[key]
          }))
          setSubPages(fallbackData)
        }
      } catch (error) {
        console.error('Failed to fetch sub-pages', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSubPages()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setSaveMessage('')
    try {
      if (import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        // Delete removed pages
        for (const id of itemsToDelete) {
          await removeDocument(COLLECTIONS.SERVICE_SUB_PAGES, id)
        }
        
        // Save existing/new pages
        for (const page of subPages) {
          const { _originalId, ...dataToSave } = page
          
          // We use page.id as the document ID in firestore so URLs like /service/pcod-pcos can easily lookup by ID
          if (!page.id) continue // skip if no slug provided
          
          // If original ID exists and doesn't match new ID, we have to delete old and create new
          if (_originalId && _originalId !== page.id) {
            await removeDocument(COLLECTIONS.SERVICE_SUB_PAGES, _originalId)
          }
          
          // Set doc with custom ID (the slug)
          // Actually, our collections.js doesn't have a direct setDoc with custom ID in the exports besides setDocument
          // We'll use setDocument from collections.js to enforce custom ID
          await setDocument(COLLECTIONS.SERVICE_SUB_PAGES, page.id, dataToSave)
        }
        
        setItemsToDelete([])
        // Refetch
        const data = await getCollection(COLLECTIONS.SERVICE_SUB_PAGES)
        setSubPages(data.map(d => ({ ...d, _originalId: d.id })))
      }
      setSaveMessage('Sub-pages saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      console.error('Error saving sub-pages', error)
      setSaveMessage('Error saving content. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handlePageChange = (field, value) => {
    if (activePageIndex === -1) return
    setSubPages(prev => {
      const newPages = [...prev]
      newPages[activePageIndex] = { ...newPages[activePageIndex], [field]: value }
      return newPages
    })
  }

  const handleAddPage = () => {
    const newPage = {
      id: `new-page-${Date.now()}`,
      title: 'New Service Page',
      heroTitle: '',
      heroSubtitle: '',
      image: '',
      sections: [],
      benefits: []
    }
    setSubPages(prev => [...prev, newPage])
    setActivePageIndex(subPages.length)
  }

  const handleRemovePage = () => {
    if (activePageIndex === -1) return
    const page = subPages[activePageIndex]
    if (page._originalId) {
      setItemsToDelete(prev => [...prev, page._originalId])
    }
    
    setSubPages(prev => {
      const newPages = [...prev]
      newPages.splice(activePageIndex, 1)
      return newPages
    })
    setActivePageIndex(Math.max(0, activePageIndex - 1))
  }

  // Sections Handlers
  const handleAddSection = () => {
    setSubPages(prev => {
      const newPages = [...prev]
      if (!newPages[activePageIndex].sections) newPages[activePageIndex].sections = []
      newPages[activePageIndex].sections.push({ title: 'New Section', description: '', image: '' })
      return newPages
    })
  }

  const handleSectionChange = (sectionIndex, field, value) => {
    setSubPages(prev => {
      const newPages = [...prev]
      newPages[activePageIndex].sections[sectionIndex][field] = value
      return newPages
    })
  }

  const handleRemoveSection = (sectionIndex) => {
    setSubPages(prev => {
      const newPages = [...prev]
      newPages[activePageIndex].sections.splice(sectionIndex, 1)
      return newPages
    })
  }

  // Benefits Handlers
  const handleAddBenefit = () => {
    setSubPages(prev => {
      const newPages = [...prev]
      if (!newPages[activePageIndex].benefits) newPages[activePageIndex].benefits = []
      newPages[activePageIndex].benefits.push('New Benefit')
      return newPages
    })
  }

  const handleBenefitChange = (benefitIndex, value) => {
    setSubPages(prev => {
      const newPages = [...prev]
      newPages[activePageIndex].benefits[benefitIndex] = value
      return newPages
    })
  }

  const handleRemoveBenefit = (benefitIndex) => {
    setSubPages(prev => {
      const newPages = [...prev]
      newPages[activePageIndex].benefits.splice(benefitIndex, 1)
      return newPages
    })
  }

  // Image Upload
  const handleImageUpload = (url) => {
    if (!uploadingTarget) return
    
    const { pageIndex, sectionIndex } = uploadingTarget
    
    if (sectionIndex !== undefined) {
      setSubPages(prev => {
        const newPages = [...prev]
        newPages[pageIndex].sections[sectionIndex].image = url
        return newPages
      })
    } else {
      setSubPages(prev => {
        const newPages = [...prev]
        newPages[pageIndex].image = url
        return newPages
      })
    }
    setUploadingTarget(null)
  }

  const inputClasses = 'w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/50 focus:border-[#2E7D32] transition-colors text-sm'
  const labelClasses = 'block text-sm font-semibold text-gray-700 mb-1.5'
  
  const activePage = subPages[activePageIndex]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <FaSpinner className="text-[#2E7D32] text-3xl animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-6xl flex flex-col md:flex-row gap-6 pb-12">
      {/* Sidebar List */}
      <div className="w-full md:w-64 shrink-0 space-y-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 className="font-extrabold text-gray-900 mb-4 flex items-center gap-2">
            <FaFileMedical className="text-[#2E7D32]" /> Pages
          </h2>
          <div className="space-y-1">
            {subPages.map((page, index) => (
              <button
                key={index}
                onClick={() => setActivePageIndex(index)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors truncate ${
                  activePageIndex === index ? 'bg-[#2E7D32] text-white shadow-md shadow-[#2E7D32]/20' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page.title || page.id || 'Untitled Page'}
              </button>
            ))}
            {subPages.length === 0 && (
              <p className="text-xs text-gray-500 italic px-2 py-1">No pages found.</p>
            )}
          </div>
          <button
            onClick={handleAddPage}
            className="mt-4 w-full text-sm font-bold text-[#2E7D32] bg-[#E8F5E9] hover:bg-[#C8E6C9] py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <FaPlus className="text-xs" /> New Page
          </button>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between mb-2 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">
              {activePage ? `Editing: ${activePage.title}` : 'Select a page'}
            </h1>
            <p className="text-gray-500 text-xs mt-0.5">Manage detailed content for specific service treatments.</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || !activePage}
            className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
            {saving ? 'Saving...' : 'Save All'}
          </button>
        </div>

        {saveMessage && (
          <div className={`p-4 rounded-lg font-bold text-sm ${saveMessage.includes('Error') ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-[#E8F5E9] text-[#2E7D32] border border-[#2E7D32]/30'}`}>
            {saveMessage}
          </div>
        )}

        {activePage ? (
          <div className="space-y-6">
            {/* Meta Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 uppercase tracking-wider text-sm">Page Details</h3>
                <button onClick={handleRemovePage} className="text-red-500 text-xs font-bold hover:underline">Delete Page</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Page Title</label>
                  <input type="text" value={activePage.title} onChange={e => handlePageChange('title', e.target.value)} className={inputClasses} placeholder="e.g. Weight Management" />
                </div>
                <div>
                  <label className={labelClasses}>Slug (URL Path ID)</label>
                  <input type="text" value={activePage.id} onChange={e => handlePageChange('id', e.target.value)} className={inputClasses} placeholder="e.g. weight-management" />
                  <p className="text-[10px] text-gray-500 mt-1">Must match the ID used in main Services categories.</p>
                </div>
              </div>
            </div>

            {/* Hero Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-800 uppercase tracking-wider text-sm mb-4 pb-3 border-b border-gray-100">Hero Section</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <label className={labelClasses}>Hero Title</label>
                    <input type="text" value={activePage.heroTitle} onChange={e => handlePageChange('heroTitle', e.target.value)} className={inputClasses} />
                  </div>
                  <div>
                    <label className={labelClasses}>Hero Subtitle</label>
                    <textarea value={activePage.heroSubtitle} onChange={e => handlePageChange('heroSubtitle', e.target.value)} rows={4} className={`${inputClasses} resize-none`} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClasses}>Hero Background Image</label>
                  <div className="border border-gray-200 rounded-lg p-2 bg-gray-50 flex-1 relative overflow-hidden min-h-[150px]">
                    {activePage.image ? (
                      <>
                        <img src={activePage.image} alt="Hero bg" className="absolute inset-0 w-full h-full object-cover opacity-70" />
                        <button 
                          onClick={() => setUploadingTarget({ pageIndex: activePageIndex })}
                          className="absolute bottom-2 right-2 bg-white/90 px-3 py-1.5 text-xs font-bold rounded-md shadow-sm border border-gray-200 hover:bg-white"
                        >
                          Change
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => setUploadingTarget({ pageIndex: activePageIndex })}
                        className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-[#2E7D32] transition-colors rounded-md"
                      >
                        <FaImage className="text-2xl mb-1" />
                        <span className="text-xs font-bold">Add Image</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 uppercase tracking-wider text-sm">Content Sections</h3>
                <button onClick={handleAddSection} className="text-[#2E7D32] text-xs font-bold hover:underline">+ Add Section</button>
              </div>
              <div className="space-y-4">
                {(activePage.sections || []).map((section, secIndex) => (
                  <div key={secIndex} className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col md:flex-row gap-4 relative">
                    <button onClick={() => handleRemoveSection(secIndex)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1 bg-white rounded shadow-sm border border-gray-100 z-10"><FaTrash size={12} /></button>
                    <div className="flex-1 space-y-3">
                      <input type="text" value={section.title} onChange={e => handleSectionChange(secIndex, 'title', e.target.value)} className={inputClasses} placeholder="Section Title" />
                      <textarea value={section.description} onChange={e => handleSectionChange(secIndex, 'description', e.target.value)} rows={3} className={`${inputClasses} resize-none`} placeholder="Section Description" />
                    </div>
                    <div className="w-full md:w-48 h-32 md:h-auto border border-gray-200 rounded-lg p-1 bg-white relative overflow-hidden shrink-0">
                      {section.image ? (
                        <>
                          <img src={section.image} alt={`Section ${secIndex}`} className="absolute inset-0 w-full h-full object-cover" />
                          <button 
                            onClick={() => setUploadingTarget({ pageIndex: activePageIndex, sectionIndex: secIndex })}
                            className="absolute bottom-1 right-1 bg-white/90 px-2 py-1 text-[10px] font-bold rounded shadow-sm border border-gray-200"
                          >
                            Change
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => setUploadingTarget({ pageIndex: activePageIndex, sectionIndex: secIndex })}
                          className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-[#2E7D32] transition-colors rounded-md bg-gray-50"
                        >
                          <FaImage className="text-xl mb-1" />
                          <span className="text-[10px] font-bold">Add Image</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {(!activePage.sections || activePage.sections.length === 0) && (
                  <p className="text-sm text-gray-500 italic text-center py-4">No sections added to this page.</p>
                )}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 uppercase tracking-wider text-sm">Key Benefits List</h3>
                <button onClick={handleAddBenefit} className="text-[#2E7D32] text-xs font-bold hover:underline">+ Add Benefit</button>
              </div>
              <div className="space-y-3">
                {(activePage.benefits || []).map((benefit, benIndex) => (
                  <div key={benIndex} className="flex gap-2 items-center">
                    <FaListUl className="text-[#2E7D32]/50 text-sm" />
                    <input type="text" value={benefit} onChange={e => handleBenefitChange(benIndex, e.target.value)} className={`${inputClasses} py-2`} placeholder="e.g. Personalized meal plans" />
                    <button onClick={() => handleRemoveBenefit(benIndex)} className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors shrink-0">
                      <FaTrash size={14} />
                    </button>
                  </div>
                ))}
                {(!activePage.benefits || activePage.benefits.length === 0) && (
                  <p className="text-sm text-gray-500 italic py-2">No benefits added.</p>
                )}
              </div>
            </div>
            
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <FaFileMedical className="text-4xl text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">No Page Selected</h3>
            <p className="text-sm text-gray-500">Select a page from the sidebar to edit its content, or create a new one.</p>
          </div>
        )}
      </div>

      {/* Image Upload Modal */}
      {uploadingTarget !== null && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Image</h3>
            <ImageUploader onUpload={handleImageUpload} />
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

export default ServiceSubPageEditor
