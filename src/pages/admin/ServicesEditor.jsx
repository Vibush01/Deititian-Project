import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaSave, FaConciergeBell, FaSpinner, FaPlus, FaTrash, FaGripVertical, FaImage, FaHeart, FaDumbbell, FaHeartbeat, FaEdit, FaChevronUp, FaChevronDown } from 'react-icons/fa'
import { getCollection, addDocument, removeDocument, updateDocument, COLLECTIONS } from '../../firebase/collections'
import ImageUploader from '../../components/admin/ImageUploader'

const AVAILABLE_ICONS = [
  { id: 'heart', component: <FaHeart /> },
  { id: 'dumbbell', component: <FaDumbbell /> },
  { id: 'heart-pulse', component: <FaHeartbeat /> }
]

const ServicesEditor = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [categories, setCategories] = useState([])
  const [itemsToDelete, setItemsToDelete] = useState([])
  const [uploadingTarget, setUploadingTarget] = useState(null) // { index: number }
  const [uploadingFeatureTarget, setUploadingFeatureTarget] = useState(null) // { catIndex, featIndex }
  const [uploadingSubServiceTarget, setUploadingSubServiceTarget] = useState(null) // { catIndex, subIndex }

  useEffect(() => {
    const fetchServices = async () => {
      try {
        if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
          setLoading(false)
          return
        }

        const data = await getCollection(COLLECTIONS.SERVICES, 'order')
        const { serviceCategories } = await import('../../data/servicesData')
        
        if (data && data.length > 0) {
          // Merge in missing images from defaults so they show up for existing documents
          const mergedData = data.map(dbCat => {
            const defaultCat = serviceCategories.find(c => c.id === dbCat.id)
            if (!defaultCat) return { ...dbCat, _docId: dbCat.id }
            
            const features = (dbCat.features || []).map(feat => {
              const defaultFeat = defaultCat.features?.find(f => f.title === feat.title)
              if (!feat.image && defaultFeat?.image) {
                return { ...feat, image: defaultFeat.image }
              }
              return feat
            })
            
            const services = (dbCat.services || []).map(sub => {
              const defaultSub = defaultCat.services?.find(s => s.id === sub.id)
              if (!sub.image && defaultSub?.image) {
                return { ...sub, image: defaultSub.image }
              }
              return sub
            })
            
            return { ...dbCat, features, services, _docId: dbCat.id }
          })
          setCategories(mergedData)
        } else {
          setCategories(serviceCategories.map(c => ({ ...c, _docId: c.id })))
        }
      } catch (error) {
        console.error('Failed to fetch services', error)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setSaveMessage('')
    try {
      if (import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        for (const id of itemsToDelete) {
          await removeDocument(COLLECTIONS.SERVICES, id)
        }
        
        for (let i = 0; i < categories.length; i++) {
          const category = { ...categories[i], order: i }
          // If editing ID directly, we shouldn't overwrite the document ID, but the 'id' field is used for paths.
          // In Firebase, doc.id is usually auto-generated if we use addDoc, but we can store custom slug in 'id' field.
          if (category._docId) {
            const { _docId, ...dataToSave } = category
            await updateDocument(COLLECTIONS.SERVICES, _docId, dataToSave)
          } else {
            // new category
            const docId = await addDocument(COLLECTIONS.SERVICES, category)
            category._docId = docId
          }
        }
        
        setItemsToDelete([])
        // Refetch to ensure state matches DB exactly
        const data = await getCollection(COLLECTIONS.SERVICES, 'order')
        setCategories(data.map(d => ({ ...d, _docId: d.id })))
      }
      setSaveMessage('Services saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      console.error('Error saving services', error)
      setSaveMessage('Error saving content. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleCategoryChange = (index, field, value) => {
    setCategories(prev => {
      const newCat = [...prev]
      newCat[index] = { ...newCat[index], [field]: value }
      // Auto-update path if id (slug) changes
      if (field === 'id') {
        newCat[index].path = `/service/${value}`
      }
      return newCat
    })
  }

  const handleAddCategory = () => {
    setCategories(prev => [
      ...prev,
      {
        id: 'new-category',
        title: 'New Service Category',
        icon: 'heart',
        path: '/service/new-category',
        image: '',
        heroTitle: '',
        heroDescription: '',
        features: [],
        services: []
      }
    ])
  }

  const handleRemoveCategory = (index) => {
    const cat = categories[index]
    if (cat._docId) {
      setItemsToDelete(prev => [...prev, cat._docId])
    }
    setCategories(prev => {
      const newCat = [...prev]
      newCat.splice(index, 1)
      return newCat
    })
  }

  // Features Handlers
  const handleAddFeature = (catIndex) => {
    setCategories(prev => {
      const newCat = [...prev]
      if (!newCat[catIndex].features) newCat[catIndex].features = []
      newCat[catIndex].features.push({ title: 'New Feature', description: '', image: '' })
      return newCat
    })
  }

  const handleFeatureChange = (catIndex, featIndex, field, value) => {
    setCategories(prev => {
      const newCat = [...prev]
      newCat[catIndex].features[featIndex][field] = value
      return newCat
    })
  }

  const handleRemoveFeature = (catIndex, featIndex) => {
    setCategories(prev => {
      const newCat = [...prev]
      newCat[catIndex].features.splice(featIndex, 1)
      return newCat
    })
  }

  const handleMoveFeature = (catIndex, featIndex, direction) => {
    setCategories(prev => {
      const newCat = [...prev]
      const features = newCat[catIndex].features
      if (direction === 'up' && featIndex > 0) {
        [features[featIndex - 1], features[featIndex]] = [features[featIndex], features[featIndex - 1]]
      } else if (direction === 'down' && featIndex < features.length - 1) {
        [features[featIndex + 1], features[featIndex]] = [features[featIndex], features[featIndex + 1]]
      }
      return newCat
    })
  }

  // Sub-services Handlers
  const handleAddSubService = (catIndex) => {
    setCategories(prev => {
      const newCat = [...prev]
      if (!newCat[catIndex].services) newCat[catIndex].services = []
      newCat[catIndex].services.push({ id: 'new-sub', title: 'New Sub-Service', description: '', image: '' })
      return newCat
    })
  }

  const handleSubServiceChange = (catIndex, subIndex, field, value) => {
    setCategories(prev => {
      const newCat = [...prev]
      newCat[catIndex].services[subIndex][field] = value
      return newCat
    })
  }

  const handleRemoveSubService = (catIndex, subIndex) => {
    setCategories(prev => {
      const newCat = [...prev]
      newCat[catIndex].services.splice(subIndex, 1)
      return newCat
    })
  }

  const handleMoveSubService = (catIndex, subIndex, direction) => {
    setCategories(prev => {
      const newCat = [...prev]
      const services = newCat[catIndex].services
      if (direction === 'up' && subIndex > 0) {
        [services[subIndex - 1], services[subIndex]] = [services[subIndex], services[subIndex - 1]]
      } else if (direction === 'down' && subIndex < services.length - 1) {
        [services[subIndex + 1], services[subIndex]] = [services[subIndex], services[subIndex + 1]]
      }
      return newCat
    })
  }

  const handleImageUpload = (url) => {
    if (uploadingTarget !== null) {
      handleCategoryChange(uploadingTarget.index, 'image', url)
      setUploadingTarget(null)
    }
  }

  const handleFeatureImageUpload = (url) => {
    if (uploadingFeatureTarget !== null) {
      handleFeatureChange(uploadingFeatureTarget.catIndex, uploadingFeatureTarget.featIndex, 'image', url)
      setUploadingFeatureTarget(null)
    }
  }

  const handleSubServiceImageUpload = (url) => {
    if (uploadingSubServiceTarget !== null) {
      handleSubServiceChange(uploadingSubServiceTarget.catIndex, uploadingSubServiceTarget.subIndex, 'image', url)
      setUploadingSubServiceTarget(null)
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
    <div className="max-w-5xl space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaConciergeBell className="text-[#2E7D32]" />
            Service Categories Editor
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage main service categories and their highlights.</p>
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

      <div className="flex justify-end">
        <button onClick={handleAddCategory} className="text-sm font-bold bg-white text-[#2E7D32] border border-[#2E7D32]/20 hover:bg-[#E8F5E9] px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
          <FaPlus /> Add New Category
        </button>
      </div>

      {categories.map((category, catIndex) => (
        <div key={category._docId || catIndex} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <FaGripVertical className="text-gray-400 cursor-grab" />
              Category: {category.title || 'Untitled'}
            </h2>
            <button onClick={() => handleRemoveCategory(catIndex)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
              <FaTrash />
            </button>
          </div>

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Category Title</label>
                <input type="text" value={category.title} onChange={e => handleCategoryChange(catIndex, 'title', e.target.value)} className={inputClasses} />
              </div>
              <div>
                <label className={labelClasses}>Slug ID (URL Path)</label>
                <input type="text" value={category.id} onChange={e => handleCategoryChange(catIndex, 'id', e.target.value)} className={inputClasses} placeholder="e.g. disease-management" />
              </div>
              <div>
                <label className={labelClasses}>Icon</label>
                <select value={category.icon} onChange={e => handleCategoryChange(catIndex, 'icon', e.target.value)} className={inputClasses}>
                  {AVAILABLE_ICONS.map(i => <option key={i.id} value={i.id}>{i.id}</option>)}
                </select>
              </div>
            </div>

            {/* Hero Section */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wider">Hero Section</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className={labelClasses}>Hero Title</label>
                    <input type="text" value={category.heroTitle} onChange={e => handleCategoryChange(catIndex, 'heroTitle', e.target.value)} className={inputClasses} />
                  </div>
                  <div>
                    <label className={labelClasses}>Hero Description</label>
                    <textarea value={category.heroDescription} onChange={e => handleCategoryChange(catIndex, 'heroDescription', e.target.value)} rows={4} className={`${inputClasses} resize-none`} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClasses}>Hero Image</label>
                  <div className="border border-gray-200 rounded-lg p-2 bg-white flex-1 relative overflow-hidden min-h-[150px]">
                    {category.image ? (
                      <>
                        <img src={category.image} alt="Category hero" className="absolute inset-0 w-full h-full object-cover opacity-70" />
                        <button 
                          onClick={() => setUploadingTarget({ index: catIndex })}
                          className="absolute bottom-2 right-2 bg-white/90 px-3 py-1.5 text-xs font-bold rounded-md shadow-sm border border-gray-200"
                        >
                          Change
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => setUploadingTarget({ index: catIndex })}
                        className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-[#2E7D32] hover:bg-gray-50 transition-colors rounded-md"
                      >
                        <FaImage className="text-2xl mb-1" />
                        <span className="text-xs font-bold">Add Image</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Features & Sub-services Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Features */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Key Features</h3>
                  <button onClick={() => handleAddFeature(catIndex)} className="text-[#2E7D32] text-xs font-bold hover:underline">+ Add Feature</button>
                </div>
                <div className="space-y-3">
                  {(category.features || []).map((feature, featIndex) => (
                    <div key={featIndex} className="bg-gray-50 border border-gray-100 rounded-lg p-3 relative pr-10">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="w-16 h-16 shrink-0 rounded-md border border-gray-200 overflow-hidden relative bg-white flex items-center justify-center">
                          {feature.image ? (
                            <>
                              <img src={feature.image} alt="Feature" className="w-full h-full object-cover" />
                              <button 
                                onClick={() => handleFeatureChange(catIndex, featIndex, 'image', '')}
                                className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                              >
                                <FaTrash size={12} />
                              </button>
                            </>
                          ) : (
                            <button 
                              onClick={() => setUploadingFeatureTarget({ catIndex, featIndex })}
                              className="text-gray-400 hover:text-[#2E7D32]"
                            >
                              <FaImage size={20} />
                            </button>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 space-y-1.5 w-full">
                          <input type="text" value={feature.title} onChange={e => handleFeatureChange(catIndex, featIndex, 'title', e.target.value)} className="w-full bg-transparent font-bold text-sm focus:outline-none focus:text-[#2E7D32]" placeholder="Feature Title" />
                          <textarea value={feature.description} onChange={e => handleFeatureChange(catIndex, featIndex, 'description', e.target.value)} rows={2} className="w-full bg-transparent text-sm text-gray-600 focus:outline-none resize-none leading-snug" placeholder="Feature Description" />
                        </div>
                      </div>
                      <div className="absolute right-2 top-2 flex flex-col gap-1 text-gray-400">
                        <button onClick={() => handleMoveFeature(catIndex, featIndex, 'up')} disabled={featIndex === 0} className="hover:text-gray-700 disabled:opacity-30"><FaChevronUp size={12} /></button>
                        <button onClick={() => handleMoveFeature(catIndex, featIndex, 'down')} disabled={featIndex === (category.features || []).length - 1} className="hover:text-gray-700 disabled:opacity-30"><FaChevronDown size={12} /></button>
                        <button onClick={() => handleRemoveFeature(catIndex, featIndex)} className="hover:text-red-500 mt-1"><FaTrash size={12} /></button>
                      </div>
                    </div>
                  ))}
                  {(!category.features || category.features.length === 0) && <p className="text-xs text-gray-400 italic">No features added.</p>}
                </div>
              </div>

              {/* Sub-services */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Sub-Services List</h3>
                  <button onClick={() => handleAddSubService(catIndex)} className="text-[#2E7D32] text-xs font-bold hover:underline">+ Add Sub-service</button>
                </div>
                <div className="space-y-3">
                  {(category.services || []).map((sub, subIndex) => (
                    <div key={subIndex} className="bg-gray-50 border border-gray-100 rounded-lg p-3 relative pr-10">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="w-16 h-16 shrink-0 rounded-md border border-gray-200 overflow-hidden relative bg-white flex items-center justify-center">
                          {sub.image ? (
                            <>
                              <img src={sub.image} alt="Sub-service" className="w-full h-full object-cover" />
                              <button 
                                onClick={() => handleSubServiceChange(catIndex, subIndex, 'image', '')}
                                className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                              >
                                <FaTrash size={12} />
                              </button>
                            </>
                          ) : (
                            <button 
                              onClick={() => setUploadingSubServiceTarget({ catIndex, subIndex })}
                              className="text-gray-400 hover:text-[#2E7D32]"
                            >
                              <FaImage size={20} />
                            </button>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 space-y-1.5 w-full">
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <input type="text" value={sub.title} onChange={e => handleSubServiceChange(catIndex, subIndex, 'title', e.target.value)} className="flex-1 min-w-0 bg-transparent font-bold text-sm focus:outline-none focus:text-[#2E7D32]" placeholder="Sub-service Title" />
                            <input type="text" value={sub.id} onChange={e => handleSubServiceChange(catIndex, subIndex, 'id', e.target.value)} className="w-full sm:w-24 shrink-0 bg-transparent text-xs text-gray-500 border-b border-gray-300 focus:outline-none focus:border-[#2E7D32]" placeholder="slug-id" />
                          </div>
                          <textarea value={sub.description} onChange={e => handleSubServiceChange(catIndex, subIndex, 'description', e.target.value)} rows={2} className="w-full bg-transparent text-sm text-gray-600 focus:outline-none resize-none leading-snug" placeholder="Short Description" />
                        </div>
                      </div>
                      
                      {/* Link to sub-page content editor */}
                      <div className="mt-2 flex justify-end">
                        <Link 
                          to={`/admin/services/sub-pages?slug=${sub.id}`}
                          className="text-xs bg-white text-[#2E7D32] border border-[#2E7D32]/20 hover:bg-[#E8F5E9] px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold transition-colors"
                        >
                          <FaEdit /> Edit Full Content
                        </Link>
                      </div>

                      <div className="absolute right-2 top-2 flex flex-col gap-1 text-gray-400">
                        <button onClick={() => handleMoveSubService(catIndex, subIndex, 'up')} disabled={subIndex === 0} className="hover:text-gray-700 disabled:opacity-30"><FaChevronUp size={12} /></button>
                        <button onClick={() => handleMoveSubService(catIndex, subIndex, 'down')} disabled={subIndex === (category.services || []).length - 1} className="hover:text-gray-700 disabled:opacity-30"><FaChevronDown size={12} /></button>
                        <button onClick={() => handleRemoveSubService(catIndex, subIndex)} className="hover:text-red-500 mt-1"><FaTrash size={12} /></button>
                      </div>
                    </div>
                  ))}
                  {(!category.services || category.services.length === 0) && <p className="text-xs text-gray-400 italic">No sub-services added.</p>}
                </div>
              </div>
            </div>

          </div>
        </div>
      ))}
      {categories.length === 0 && (
        <div className="text-center py-10 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <FaConciergeBell className="text-4xl text-gray-200 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No service categories found.</p>
        </div>
      )}

      {/* Image Upload Modal */}
      {uploadingTarget !== null && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Hero Image</h3>
            <ImageUploader onUpload={handleImageUpload} />
            <button onClick={() => setUploadingTarget(null)} className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors text-sm">Cancel</button>
          </div>
        </div>
      )}

      {uploadingFeatureTarget !== null && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Feature Image</h3>
            <ImageUploader onUpload={handleFeatureImageUpload} />
            <button onClick={() => setUploadingFeatureTarget(null)} className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors text-sm">Cancel</button>
          </div>
        </div>
      )}

      {uploadingSubServiceTarget !== null && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Sub-Service Image</h3>
            <ImageUploader onUpload={handleSubServiceImageUpload} />
            <button onClick={() => setUploadingSubServiceTarget(null)} className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors text-sm">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ServicesEditor
