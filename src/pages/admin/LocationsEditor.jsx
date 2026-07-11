import { useState, useEffect } from 'react'
import { FaSave, FaMapMarkerAlt, FaSpinner, FaPlus, FaTrash, FaEdit } from 'react-icons/fa'
import { getCollection, addDocument, removeDocument, updateDocument, COLLECTIONS } from '../../firebase/collections'
import ItemModal from '../../components/admin/ItemModal'

const LocationsEditor = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [locations, setLocations] = useState([])
  const [itemsToDelete, setItemsToDelete] = useState([])
  
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [editingIndex, setEditingIndex] = useState(-1)
  
  const fetchLocations = async () => {
    try {
      if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        setLoading(false)
        return
      }
      const data = await getCollection(COLLECTIONS.LOCATIONS, 'order')
      if (data && data.length > 0) {
        setLocations(data)
      } else {
        const { clinicLocations } = await import('../../data/locationsData')
        setLocations(clinicLocations)
      }
    } catch (error) {
      console.error('Failed to fetch locations', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLocations()
  }, [])


  const handleSaveAll = async () => {
    setSaving(true)
    setSaveMessage('')
    try {
      if (import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        for (const id of itemsToDelete) {
          await removeDocument(COLLECTIONS.LOCATIONS, id)
        }
        
        for (let i = 0; i < locations.length; i++) {
          const loc = { ...locations[i], order: i }
          if (loc.id) {
            const { id, ...data } = loc
            await updateDocument(COLLECTIONS.LOCATIONS, id, data)
          } else {
            await addDocument(COLLECTIONS.LOCATIONS, loc)
          }
        }
        
        setItemsToDelete([])
        await fetchLocations() 
      }
      setSaveMessage('Locations saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      console.error('Error saving locations', error)
      setSaveMessage('Error saving content. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleRemove = (index) => {
    const item = locations[index]
    if (item.id) {
      setItemsToDelete(prev => [...prev, item.id])
    }
    setLocations(prev => prev.filter((_, i) => i !== index))
  }

  const moveItem = (index, direction) => {
    if (
      (direction === -1 && index === 0) || 
      (direction === 1 && index === locations.length - 1)
    ) return
    
    setLocations(prev => {
      const newItems = [...prev]
      const temp = newItems[index]
      newItems[index] = newItems[index + direction]
      newItems[index + direction] = temp
      return newItems
    })
  }

  const openAddModal = () => {
    setEditingItem({ city: '', address: '', phone: '', mapLink: '' })
    setEditingIndex(-1)
    setModalOpen(true)
  }

  const openEditModal = (index) => {
    setEditingItem({ ...locations[index] })
    setEditingIndex(index)
    setModalOpen(true)
  }

  const handleModalSave = () => {
    if (editingIndex >= 0) {
      setLocations(prev => {
        const newArr = [...prev]
        newArr[editingIndex] = editingItem
        return newArr
      })
    } else {
      setLocations(prev => [...prev, editingItem])
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
            <FaMapMarkerAlt className="text-[#2E7D32]" />
            Locations Editor
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage clinic locations and contact details.</p>
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
          <h2 className="text-lg font-bold text-gray-900">Clinic Locations List</h2>
          <button onClick={openAddModal} className="text-sm font-bold bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#C8E6C9] px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <FaPlus className="text-xs" /> Add Location
          </button>
        </div>
        
        <div className="space-y-3">
          {locations.map((loc, index) => (
            <div key={loc.id || index} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 items-center group">
              <div className="flex flex-col gap-1 text-gray-300">
                <button onClick={() => moveItem(index, -1)} className="hover:text-[#2E7D32]" disabled={index === 0}>▲</button>
                <button onClick={() => moveItem(index, 1)} className="hover:text-[#2E7D32]" disabled={index === locations.length - 1}>▼</button>
              </div>
              
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#E8F5E9] flex items-center justify-center shrink-0 border border-[#C8E6C9] shadow-sm">
                <FaMapMarkerAlt className="text-lg text-[#2E7D32]" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 truncate">{loc.city || 'Unnamed City'}</h3>
                <p className="text-sm text-gray-600 truncate">{loc.address}</p>
                <p className="text-xs text-gray-500 mt-1 font-mono">{loc.phone}</p>
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
          {locations.length === 0 && (
            <p className="text-sm text-gray-500 italic text-center py-8">No locations added yet.</p>
          )}
        </div>
      </div>

      <ItemModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        title={editingIndex >= 0 ? 'Edit Location' : 'Add Location'}
        onSave={handleModalSave}
      >
        {editingItem && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>City Name</label>
                <input 
                  type="text" 
                  value={editingItem.city} 
                  onChange={e => setEditingItem({...editingItem, city: e.target.value})} 
                  className={inputClasses} 
                  placeholder="e.g. Chandigarh" 
                />
              </div>
              <div>
                <label className={labelClasses}>Contact Phone</label>
                <input 
                  type="text" 
                  value={editingItem.phone} 
                  onChange={e => setEditingItem({...editingItem, phone: e.target.value})} 
                  className={inputClasses} 
                  placeholder="e.g. +91 9876543210" 
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Full Address</label>
              <textarea 
                value={editingItem.address} 
                onChange={e => setEditingItem({...editingItem, address: e.target.value})} 
                rows={3} 
                className={`${inputClasses} resize-none`} 
                placeholder="Street address..." 
              />
            </div>

            <div>
              <label className={labelClasses}>Google Maps Link</label>
              <input 
                type="url" 
                value={editingItem.mapLink} 
                onChange={e => setEditingItem({...editingItem, mapLink: e.target.value})} 
                className={inputClasses} 
                placeholder="https://maps.app.goo.gl/..." 
              />
            </div>
          </div>
        )}
      </ItemModal>
    </div>
  )
}

export default LocationsEditor
