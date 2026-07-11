import { useState, useEffect } from 'react'
import { FaSave, FaTrophy, FaSpinner, FaPlus, FaTrash, FaEdit, FaImage } from 'react-icons/fa'
import { getCollection, addDocument, removeDocument, updateDocument, COLLECTIONS } from '../../firebase/collections'
import ItemModal from '../../components/admin/ItemModal'
import ImageUploader from '../../components/admin/ImageUploader'

const SuccessStoriesEditor = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [stories, setStories] = useState([])
  const [itemsToDelete, setItemsToDelete] = useState([])
  
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [editingIndex, setEditingIndex] = useState(-1)
  
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        setLoading(false)
        return
      }
      const data = await getCollection(COLLECTIONS.SUCCESS_STORIES, 'order')
      if (data && data.length > 0) {
        setStories(data)
      } else {
        const { defaultStories } = await import('../../pages/SuccessStoriesPage')
        setStories(defaultStories)
      }
    } catch (error) {
      console.error('Failed to fetch success stories', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAll = async () => {
    setSaving(true)
    setSaveMessage('')
    try {
      if (import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        for (const id of itemsToDelete) {
          await removeDocument(COLLECTIONS.SUCCESS_STORIES, id)
        }
        
        for (let i = 0; i < stories.length; i++) {
          const story = { ...stories[i], order: i }
          if (story.id) {
            const { id, ...data } = story
            await updateDocument(COLLECTIONS.SUCCESS_STORIES, id, data)
          } else {
            await addDocument(COLLECTIONS.SUCCESS_STORIES, story)
          }
        }
        
        setItemsToDelete([])
        await fetchStories() 
      }
      setSaveMessage('Success stories saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      console.error('Error saving success stories', error)
      setSaveMessage('Error saving content. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleRemove = (index) => {
    const item = stories[index]
    if (item.id) {
      setItemsToDelete(prev => [...prev, item.id])
    }
    setStories(prev => prev.filter((_, i) => i !== index))
  }

  const moveItem = (index, direction) => {
    if (
      (direction === -1 && index === 0) || 
      (direction === 1 && index === stories.length - 1)
    ) return
    
    setStories(prev => {
      const newItems = [...prev]
      const temp = newItems[index]
      newItems[index] = newItems[index + direction]
      newItems[index + direction] = temp
      return newItems
    })
  }

  const openAddModal = () => {
    setEditingItem({ name: '', achievement: '', image: '', story: '' })
    setEditingIndex(-1)
    setModalOpen(true)
  }

  const openEditModal = (index) => {
    setEditingItem({ ...stories[index] })
    setEditingIndex(index)
    setModalOpen(true)
  }

  const handleModalSave = () => {
    if (editingIndex >= 0) {
      setStories(prev => {
        const newArr = [...prev]
        newArr[editingIndex] = editingItem
        return newArr
      })
    } else {
      setStories(prev => [...prev, editingItem])
    }
    setModalOpen(false)
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
            <FaTrophy className="text-[#2E7D32]" />
            Success Stories Editor
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage client transformations and success stories.</p>
        </div>
        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-sm transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {saveMessage && (
        <div className={`p-4 rounded-lg font-bold text-sm ${saveMessage.includes('Error') ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-[#E8F5E9] text-[#2E7D32] border border-[#2E7D32]/30'}`}>
          {saveMessage}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Success Stories List</h2>
          <button onClick={openAddModal} className="text-sm font-bold bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#C8E6C9] px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <FaPlus className="text-xs" /> Add Story
          </button>
        </div>
        
        <div className="space-y-3">
          {stories.map((story, index) => (
            <div key={story.id || index} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 items-center group">
              <div className="flex flex-col gap-1 text-gray-300">
                <button onClick={() => moveItem(index, -1)} className="hover:text-[#2E7D32]" disabled={index === 0}>▲</button>
                <button onClick={() => moveItem(index, 1)} className="hover:text-[#2E7D32]" disabled={index === stories.length - 1}>▼</button>
              </div>
              
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 shrink-0 border-2 border-white shadow-sm">
                {story.image ? (
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                ) : (
                  <FaTrophy className="w-full h-full p-4 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 truncate">{story.name || 'Unnamed Client'}</h3>
                <p className="text-sm text-[#2E7D32] font-semibold truncate">{story.achievement}</p>
                <p className="text-xs text-gray-500 truncate mt-1">{story.story}</p>
              </div>
              
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEditModal(index)} className="w-10 h-10 flex items-center justify-center text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                  <FaEdit />
                </button>
                <button onClick={() => handleRemove(index)} className="w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          {stories.length === 0 && (
            <p className="text-sm text-gray-500 italic text-center py-8">No success stories added yet.</p>
          )}
        </div>
      </div>

      <ItemModal 
        isOpen={modalOpen} 
        onClose={() => { setModalOpen(false); setUploadingImage(false) }}
        title={editingIndex >= 0 ? 'Edit Success Story' : 'Add Success Story'}
        onSave={handleModalSave}
      >
        {editingItem && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Client Name</label>
                <input 
                  type="text" 
                  value={editingItem.name} 
                  onChange={e => setEditingItem({...editingItem, name: e.target.value})} 
                  className={inputClasses} 
                  placeholder="e.g. Priya Sharma" 
                />
              </div>
              <div>
                <label className={labelClasses}>Achievement</label>
                <input 
                  type="text" 
                  value={editingItem.achievement} 
                  onChange={e => setEditingItem({...editingItem, achievement: e.target.value})} 
                  className={inputClasses} 
                  placeholder="e.g. Lost 15kg in 6 months" 
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Their Story / Review</label>
              <textarea 
                value={editingItem.story} 
                onChange={e => setEditingItem({...editingItem, story: e.target.value})} 
                rows={4} 
                className={`${inputClasses} resize-none`} 
                placeholder="Client's testimonial or success story..." 
              />
            </div>

            <div>
              <label className={labelClasses}>Transformation Image</label>
              {!uploadingImage ? (
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                    {editingItem.image ? (
                      <img src={editingItem.image} alt="Client" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                        <FaImage className="text-2xl mb-1" />
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => setUploadingImage(true)}
                    className="px-4 py-2 text-sm font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div className="p-4 border border-dashed border-gray-300 rounded-xl bg-gray-50">
                  <ImageUploader onUpload={(url) => {
                    setEditingItem({...editingItem, image: url})
                    setUploadingImage(false)
                  }} />
                  <button onClick={() => setUploadingImage(false)} className="mt-3 text-xs font-bold text-gray-500 hover:text-gray-800">
                    Cancel Upload
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </ItemModal>
    </div>
  )
}

export default SuccessStoriesEditor
