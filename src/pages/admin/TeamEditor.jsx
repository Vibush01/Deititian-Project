import { useState, useEffect } from 'react'
import { FaSave, FaUsers, FaSpinner, FaPlus, FaTrash, FaEdit, FaGripVertical, FaImage } from 'react-icons/fa'
import { getCollection, addDocument, removeDocument, updateDocument, COLLECTIONS } from '../../firebase/collections'
import ItemModal from '../../components/admin/ItemModal'
import ImageUploader from '../../components/admin/ImageUploader'

const TeamEditor = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [team, setTeam] = useState([])
  const [itemsToDelete, setItemsToDelete] = useState([])
  
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [editingIndex, setEditingIndex] = useState(-1)
  
  // separate image uploader state just for the modal
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    fetchTeam()
  }, [])

  const fetchTeam = async () => {
    try {
      if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        setLoading(false)
        return
      }
      const data = await getCollection(COLLECTIONS.TEAM, 'order')
      setTeam(data)
    } catch (error) {
      console.error('Failed to fetch team', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAll = async () => {
    setSaving(true)
    setSaveMessage('')
    try {
      if (import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        // Delete items
        for (const id of itemsToDelete) {
          await removeDocument(COLLECTIONS.TEAM, id)
        }
        
        // Save (Update/Add) items with their current array order
        for (let i = 0; i < team.length; i++) {
          const member = { ...team[i], order: i }
          if (member.id) {
            const { id, ...data } = member
            await updateDocument(COLLECTIONS.TEAM, id, data)
          } else {
            await addDocument(COLLECTIONS.TEAM, member)
          }
        }
        
        setItemsToDelete([])
        await fetchTeam() // refetch to get IDs
      }
      setSaveMessage('Team members saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      console.error('Error saving team', error)
      setSaveMessage('Error saving content. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // List Handlers
  const handleRemove = (index) => {
    const item = team[index]
    if (item.id) {
      setItemsToDelete(prev => [...prev, item.id])
    }
    setTeam(prev => prev.filter((_, i) => i !== index))
  }

  const moveItem = (index, direction) => {
    if (
      (direction === -1 && index === 0) || 
      (direction === 1 && index === team.length - 1)
    ) return
    
    setTeam(prev => {
      const newItems = [...prev]
      const temp = newItems[index]
      newItems[index] = newItems[index + direction]
      newItems[index + direction] = temp
      return newItems
    })
  }

  // Modal Handlers
  const openAddModal = () => {
    setEditingItem({ name: '', role: '', image: '', bio: '' })
    setEditingIndex(-1)
    setModalOpen(true)
  }

  const openEditModal = (index) => {
    setEditingItem({ ...team[index] })
    setEditingIndex(index)
    setModalOpen(true)
  }

  const handleModalSave = () => {
    if (editingIndex >= 0) {
      setTeam(prev => {
        const newTeam = [...prev]
        newTeam[editingIndex] = editingItem
        return newTeam
      })
    } else {
      setTeam(prev => [...prev, editingItem])
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
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaUsers className="text-[#2E7D32]" />
            Team Editor
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage team members, roles, and bios.</p>
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
          <h2 className="text-lg font-bold text-gray-900">Team Members List</h2>
          <button onClick={openAddModal} className="text-sm font-bold bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#C8E6C9] px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <FaPlus className="text-xs" /> Add Member
          </button>
        </div>
        
        <div className="space-y-3">
          {team.map((member, index) => (
            <div key={member.id || index} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 items-center group">
              <div className="flex flex-col gap-1 text-gray-300">
                <button onClick={() => moveItem(index, -1)} className="hover:text-[#2E7D32]" disabled={index === 0}>▲</button>
                <button onClick={() => moveItem(index, 1)} className="hover:text-[#2E7D32]" disabled={index === team.length - 1}>▼</button>
              </div>
              
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 shrink-0 border-2 border-white shadow-sm">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <FaUserMd className="w-full h-full p-3 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 truncate">{member.name || 'Unnamed Member'}</h3>
                <p className="text-sm text-[#2E7D32] font-semibold truncate">{member.role}</p>
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
          {team.length === 0 && (
            <p className="text-sm text-gray-500 italic text-center py-8">No team members added yet.</p>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit */}
      <ItemModal 
        isOpen={modalOpen} 
        onClose={() => { setModalOpen(false); setUploadingImage(false) }}
        title={editingIndex >= 0 ? 'Edit Team Member' : 'Add Team Member'}
        onSave={handleModalSave}
      >
        {editingItem && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Name</label>
                <input 
                  type="text" 
                  value={editingItem.name} 
                  onChange={e => setEditingItem({...editingItem, name: e.target.value})} 
                  className={inputClasses} 
                  placeholder="e.g. Dr. Anjali Sharma" 
                />
              </div>
              <div>
                <label className={labelClasses}>Role</label>
                <input 
                  type="text" 
                  value={editingItem.role} 
                  onChange={e => setEditingItem({...editingItem, role: e.target.value})} 
                  className={inputClasses} 
                  placeholder="e.g. Chief Clinical Nutritionist" 
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Bio</label>
              <textarea 
                value={editingItem.bio} 
                onChange={e => setEditingItem({...editingItem, bio: e.target.value})} 
                rows={3} 
                className={`${inputClasses} resize-none`} 
                placeholder="Short biography..." 
              />
            </div>

            <div>
              <label className={labelClasses}>Profile Image</label>
              {!uploadingImage ? (
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                    {editingItem.image ? (
                      <img src={editingItem.image} alt="Profile" className="w-full h-full object-cover" />
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

export default TeamEditor
