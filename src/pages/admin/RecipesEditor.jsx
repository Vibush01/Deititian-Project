import { useState, useEffect } from 'react'
import { FaSave, FaUtensils, FaSpinner, FaPlus, FaTrash, FaEdit, FaImage } from 'react-icons/fa'
import { getCollection, addDocument, removeDocument, updateDocument, COLLECTIONS } from '../../firebase/collections'
import ItemModal from '../../components/admin/ItemModal'
import ImageUploader from '../../components/admin/ImageUploader'

const RecipesEditor = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [recipes, setRecipes] = useState([])
  const [itemsToDelete, setItemsToDelete] = useState([])
  
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [editingIndex, setEditingIndex] = useState(-1)
  
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    fetchRecipes()
  }, [])

  const fetchRecipes = async () => {
    try {
      if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        setLoading(false)
        return
      }
      const data = await getCollection(COLLECTIONS.RECIPES, 'order')
      if (data && data.length > 0) {
        setRecipes(data)
      } else {
        setRecipes([{
          id: 'sample-recipe-1',
          title: 'High-Protein Moong Dal Chilla',
          time: '15 mins',
          for: 'Weight Loss & PCOS',
          ingredients: ['1 cup Moong Dal (soaked)', '1 green chilli', '1/2 inch ginger', 'Salt to taste', '1/2 tsp cumin seeds'],
          instructions: '1. Blend soaked dal, chilli, and ginger into a smooth batter.\n2. Add salt and cumin seeds.\n3. Pour a ladle of batter on a hot non-stick pan.\n4. Cook until golden brown on both sides.',
          image: ''
        }])
      }
    } catch (error) {
      console.error('Failed to fetch recipes', error)
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
          await removeDocument(COLLECTIONS.RECIPES, id)
        }
        
        for (let i = 0; i < recipes.length; i++) {
          const recipe = { ...recipes[i], order: i }
          if (recipe.id) {
            const { id, ...data } = recipe
            await updateDocument(COLLECTIONS.RECIPES, id, data)
          } else {
            await addDocument(COLLECTIONS.RECIPES, recipe)
          }
        }
        
        setItemsToDelete([])
        await fetchRecipes() 
      }
      setSaveMessage('Recipes saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      console.error('Error saving recipes', error)
      setSaveMessage('Error saving content. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleRemove = (index) => {
    const item = recipes[index]
    if (item.id) {
      setItemsToDelete(prev => [...prev, item.id])
    }
    setRecipes(prev => prev.filter((_, i) => i !== index))
  }

  const moveItem = (index, direction) => {
    if (
      (direction === -1 && index === 0) || 
      (direction === 1 && index === recipes.length - 1)
    ) return
    
    setRecipes(prev => {
      const newItems = [...prev]
      const temp = newItems[index]
      newItems[index] = newItems[index + direction]
      newItems[index + direction] = temp
      return newItems
    })
  }

  const openAddModal = () => {
    setEditingItem({ title: '', for: '', time: '', image: '', ingredients: [], instructions: '' })
    setEditingIndex(-1)
    setModalOpen(true)
  }

  const openEditModal = (index) => {
    setEditingItem({ ...recipes[index] })
    setEditingIndex(index)
    setModalOpen(true)
  }

  const handleModalSave = () => {
    if (editingIndex >= 0) {
      setRecipes(prev => {
        const newArr = [...prev]
        newArr[editingIndex] = editingItem
        return newArr
      })
    } else {
      setRecipes(prev => [...prev, editingItem])
    }
    setModalOpen(false)
  }

  const handleIngredientsChange = (e) => {
    const array = e.target.value.split('\n').map(s => s.trim()).filter(s => s)
    setEditingItem({ ...editingItem, ingredients: array })
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
            <FaUtensils className="text-[#2E7D32]" />
            Recipes Editor
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage diet-friendly recipes and meals.</p>
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
          <h2 className="text-lg font-bold text-gray-900">Recipes List</h2>
          <button onClick={openAddModal} className="text-sm font-bold bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#C8E6C9] px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <FaPlus className="text-xs" /> Add Recipe
          </button>
        </div>
        
        <div className="space-y-3">
          {recipes.map((recipe, index) => (
            <div key={recipe.id || index} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 items-center group">
              <div className="flex flex-col gap-1 text-gray-300">
                <button onClick={() => moveItem(index, -1)} className="hover:text-[#2E7D32]" disabled={index === 0}>▲</button>
                <button onClick={() => moveItem(index, 1)} className="hover:text-[#2E7D32]" disabled={index === recipes.length - 1}>▼</button>
              </div>
              
              <div className="w-20 h-16 rounded-lg overflow-hidden bg-gray-200 shrink-0 border border-gray-200 shadow-sm">
                {recipe.image ? (
                  <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                ) : (
                  <FaUtensils className="w-full h-full p-4 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 truncate">{recipe.title || 'Unnamed Recipe'}</h3>
                <div className="flex gap-3 mt-1 text-xs text-gray-500 font-medium">
                  <span className="bg-gray-200 px-2 py-0.5 rounded text-gray-700">{recipe.time}</span>
                  <span className="truncate">For: {recipe.for}</span>
                </div>
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
          {recipes.length === 0 && (
            <p className="text-sm text-gray-500 italic text-center py-8">No recipes added yet.</p>
          )}
        </div>
      </div>

      <ItemModal 
        isOpen={modalOpen} 
        onClose={() => { setModalOpen(false); setUploadingImage(false) }}
        title={editingIndex >= 0 ? 'Edit Recipe' : 'Add Recipe'}
        onSave={handleModalSave}
      >
        {editingItem && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Recipe Title</label>
                <input 
                  type="text" 
                  value={editingItem.title} 
                  onChange={e => setEditingItem({...editingItem, title: e.target.value})} 
                  className={inputClasses} 
                  placeholder="e.g. Millet Khichdi" 
                />
              </div>
              <div>
                <label className={labelClasses}>Cooking Time</label>
                <input 
                  type="text" 
                  value={editingItem.time} 
                  onChange={e => setEditingItem({...editingItem, time: e.target.value})} 
                  className={inputClasses} 
                  placeholder="e.g. 30 mins" 
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Good For (Target Audience/Diet)</label>
              <input 
                type="text" 
                value={editingItem.for} 
                onChange={e => setEditingItem({...editingItem, for: e.target.value})} 
                className={inputClasses} 
                placeholder="e.g. Diabetes & Weight Loss" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Ingredients (1 per line)</label>
                <textarea 
                  value={(editingItem.ingredients || []).join('\n')} 
                  onChange={handleIngredientsChange}
                  rows={6} 
                  className={`${inputClasses} resize-none`} 
                  placeholder="1 cup Oats&#10;1/2 cup Milk..." 
                />
              </div>
              <div>
                <label className={labelClasses}>Instructions</label>
                <textarea 
                  value={editingItem.instructions} 
                  onChange={e => setEditingItem({...editingItem, instructions: e.target.value})} 
                  rows={6} 
                  className={`${inputClasses} resize-none`} 
                  placeholder="Step by step instructions..." 
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Recipe Image</label>
              {!uploadingImage ? (
                <div className="flex items-center gap-4">
                  <div className="w-32 h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                    {editingItem.image ? (
                      <img src={editingItem.image} alt="Recipe" className="w-full h-full object-cover" />
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

export default RecipesEditor
