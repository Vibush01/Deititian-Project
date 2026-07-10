import { useState, useEffect } from 'react'
import { FaSave, FaHome, FaSpinner, FaPlus, FaTrash, FaGripVertical, FaImage, FaInstagram } from 'react-icons/fa'
import { getDocument, setDocument, getCollection, addDocument, removeDocument, updateDocument, COLLECTIONS } from '../../firebase/collections'
import ImageUploader from '../../components/admin/ImageUploader'

const HomePageEditor = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  
  // Media data
  const [mediaData, setMediaData] = useState({
    mediaLogos: [],
    instagramPosts: [],
    heroBanners: [],
  })

  // Expertise Cards
  const [expertiseCards, setExpertiseCards] = useState([])
  const [cardsToDelete, setCardsToDelete] = useState([]) // keep track of deleted IDs

  // Uploading state
  const [uploadingTarget, setUploadingTarget] = useState(null) // { type: 'expertise'|'mediaLogo'|'instagram', index?: number }

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
          setLoading(false)
          return
        }

        // Fetch Media
        const mediaDoc = await getDocument(COLLECTIONS.MEDIA, 'main')
        if (mediaDoc) {
          setMediaData({
            mediaLogos: mediaDoc.mediaLogos || [],
            instagramPosts: mediaDoc.instagramPosts || [],
            heroBanners: mediaDoc.heroBanners || [],
          })
        }

        // Fetch Expertise Cards
        const cards = await getCollection(COLLECTIONS.HOME_EXPERTISE_CARDS, 'order')
        setExpertiseCards(cards)
      } catch (error) {
        console.error('Failed to fetch home data', error)
      } finally {
        setLoading(false)
      }
    }
    fetchHomeData()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setSaveMessage('')
    try {
      if (import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        // 1. Save Media
        await setDocument(COLLECTIONS.MEDIA, 'main', mediaData)

        // 2. Save Expertise Cards
        // First delete removed cards
        for (const id of cardsToDelete) {
          await removeDocument(COLLECTIONS.HOME_EXPERTISE_CARDS, id)
        }
        
        // Then add or update existing cards, also updating their 'order' based on array index
        for (let i = 0; i < expertiseCards.length; i++) {
          const card = { ...expertiseCards[i], order: i }
          if (card.id) {
            const { id, ...cardData } = card
            await updateDocument(COLLECTIONS.HOME_EXPERTISE_CARDS, id, cardData)
          } else {
            await addDocument(COLLECTIONS.HOME_EXPERTISE_CARDS, card)
          }
        }
        
        // Clear deleted array
        setCardsToDelete([])
        // Refresh cards to get new IDs
        const newCards = await getCollection(COLLECTIONS.HOME_EXPERTISE_CARDS, 'order')
        setExpertiseCards(newCards)
      }
      setSaveMessage('Home page content saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      console.error('Error saving home data', error)
      setSaveMessage('Error saving content. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // --- Expertise Cards Handlers ---
  const handleCardChange = (index, field, value) => {
    setExpertiseCards(prev => {
      const newCards = [...prev]
      newCards[index] = { ...newCards[index], [field]: value }
      return newCards
    })
  }

  const handleAddCard = () => {
    setExpertiseCards(prev => [
      ...prev,
      { title: 'New Expertise Area', description: '', image: '' }
    ])
  }

  const handleRemoveCard = (index) => {
    const card = expertiseCards[index]
    if (card.id) {
      setCardsToDelete(prev => [...prev, card.id])
    }
    setExpertiseCards(prev => {
      const newCards = [...prev]
      newCards.splice(index, 1)
      return newCards
    })
  }

  // --- Media Logos Handlers ---
  const handleRemoveMediaLogo = (index) => {
    setMediaData(prev => {
      const newLogos = [...prev.mediaLogos]
      newLogos.splice(index, 1)
      return { ...prev, mediaLogos: newLogos }
    })
  }

  // --- Hero Banners Handlers ---
  const handleRemoveHeroBanner = (index) => {
    setMediaData(prev => {
      const newBanners = [...prev.heroBanners]
      newBanners.splice(index, 1)
      return { ...prev, heroBanners: newBanners }
    })
  }

  // --- Instagram Posts Handlers ---
  const handleInstagramChange = (index, value) => {
    setMediaData(prev => {
      const newPosts = [...prev.instagramPosts]
      newPosts[index] = { ...newPosts[index], link: value }
      return { ...prev, instagramPosts: newPosts }
    })
  }

  const handleAddInstagramPost = () => {
    setMediaData(prev => ({
      ...prev,
      instagramPosts: [...prev.instagramPosts, { image: '', link: '' }]
    }))
  }

  const handleRemoveInstagramPost = (index) => {
    setMediaData(prev => {
      const newPosts = [...prev.instagramPosts]
      newPosts.splice(index, 1)
      return { ...prev, instagramPosts: newPosts }
    })
  }

  // --- Global Image Upload Handler ---
  const handleImageUpload = (url) => {
    if (!uploadingTarget) return

    const { type, index } = uploadingTarget

    if (type === 'expertise' && index !== undefined) {
      handleCardChange(index, 'image', url)
    } else if (type === 'mediaLogo') {
      setMediaData(prev => ({
        ...prev,
        mediaLogos: [...prev.mediaLogos, url]
      }))
    } else if (type === 'heroBanner') {
      setMediaData(prev => ({
        ...prev,
        heroBanners: [...prev.heroBanners, url]
      }))
    } else if (type === 'instagram' && index !== undefined) {
      setMediaData(prev => {
        const newPosts = [...prev.instagramPosts]
        newPosts[index] = { ...newPosts[index], image: url }
        return { ...prev, instagramPosts: newPosts }
      })
    }

    setUploadingTarget(null)
  }

  const inputClasses = 'w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/50 focus:border-[#2E7D32] transition-colors text-sm'

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
            <FaHome className="text-[#2E7D32]" />
            Home Page Editor
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage expertise cards and media appearances on the home page.</p>
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

      {/* Expertise Cards */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Medical Expertise Cards</h2>
            <p className="text-xs text-gray-500 mt-1">The 4 main cards displayed on the homepage</p>
          </div>
          <button onClick={handleAddCard} className="text-sm font-bold text-[#2E7D32] hover:bg-[#E8F5E9] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
            <FaPlus className="text-xs" /> Add Card
          </button>
        </div>
        
        <div className="space-y-4">
          {expertiseCards.map((card, index) => (
            <div key={card.id || index} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 group">
              <div className="pt-2"><FaGripVertical className="text-gray-400 cursor-grab" /></div>
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-3">
                  <input type="text" value={card.title} onChange={(e) => handleCardChange(index, 'title', e.target.value)} className={inputClasses} placeholder="Card Title" />
                  <textarea value={card.description} onChange={(e) => handleCardChange(index, 'description', e.target.value)} rows={3} className={`${inputClasses} resize-none`} placeholder="Card Description" />
                </div>
                
                <div className="flex flex-col gap-2 border border-gray-200 rounded-lg p-2 bg-white justify-center items-center relative overflow-hidden h-32 md:h-auto">
                  {card.image ? (
                    <>
                      <img src={card.image} alt="Card feature" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                      <button 
                        onClick={() => setUploadingTarget({ type: 'expertise', index })}
                        className="relative z-10 bg-white/90 px-3 py-1.5 text-xs font-bold rounded-md shadow-sm border border-gray-200 hover:bg-white"
                      >
                        Change Image
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => setUploadingTarget({ type: 'expertise', index })}
                      className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-[#2E7D32] hover:bg-gray-50 transition-colors rounded-md"
                    >
                      <FaImage className="text-2xl mb-1" />
                      <span className="text-xs font-bold">Add Image</span>
                    </button>
                  )}
                </div>
              </div>
              <button onClick={() => handleRemoveCard(index)} className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors h-10 shrink-0">
                <FaTrash />
              </button>
            </div>
          ))}
          {expertiseCards.length === 0 && (
            <p className="text-sm text-gray-500 italic text-center py-4">No expertise cards added.</p>
          )}
        </div>
      </div>

      {/* Hero Banners */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Home Hero Banners</h2>
            <p className="text-xs text-gray-500 mt-1">Upload up to 5 images for the hero carousel</p>
          </div>
          <button 
            onClick={() => setUploadingTarget({ type: 'heroBanner' })} 
            disabled={mediaData.heroBanners.length >= 5}
            className="text-sm font-bold text-[#2E7D32] hover:bg-[#E8F5E9] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPlus className="text-xs" /> Add Banner
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mediaData.heroBanners.map((img, index) => (
            <div key={index} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-video bg-gray-50">
              <img src={img} alt={`Banner ${index}`} className="w-full h-full object-cover" />
              <button 
                onClick={() => handleRemoveHeroBanner(index)}
                className="absolute top-2 right-2 bg-white/90 text-red-500 hover:bg-red-50 p-2 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FaTrash className="text-xs" />
              </button>
            </div>
          ))}
        </div>
        {mediaData.heroBanners.length === 0 && (
          <p className="text-sm text-gray-500 italic text-center py-4 border-t border-gray-100 mt-2">No hero banners added. Static defaults will be used.</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Media Logos */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Media Appearances</h2>
              <p className="text-xs text-gray-500 mt-1">Logos of publications</p>
            </div>
            <button onClick={() => setUploadingTarget({ type: 'mediaLogo' })} className="text-sm font-bold text-[#2E7D32] hover:bg-[#E8F5E9] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
              <FaPlus className="text-xs" /> Add Logo
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {mediaData.mediaLogos.map((img, index) => (
              <div key={index} className="relative group rounded-xl overflow-hidden border border-gray-200 h-20 bg-gray-50 flex items-center justify-center p-2">
                <img src={img} alt={`Media ${index}`} className="max-w-full max-h-full object-contain" />
                <button 
                  onClick={() => handleRemoveMediaLogo(index)}
                  className="absolute top-1 right-1 bg-white/90 text-red-500 hover:bg-red-50 p-1.5 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
            ))}
          </div>
          {mediaData.mediaLogos.length === 0 && (
            <p className="text-sm text-gray-500 italic text-center py-4 border-t border-gray-100 mt-2">No media logos added.</p>
          )}
        </div>

        {/* Instagram Posts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Instagram Posts</h2>
              <p className="text-xs text-gray-500 mt-1">Featured IG content</p>
            </div>
            <button onClick={handleAddInstagramPost} className="text-sm font-bold text-[#2E7D32] hover:bg-[#E8F5E9] px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
              <FaPlus className="text-xs" /> Add Post
            </button>
          </div>
          
          <div className="space-y-4">
            {mediaData.instagramPosts.map((post, index) => (
              <div key={index} className="flex gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div className="w-16 h-16 rounded-lg border border-gray-200 bg-white relative overflow-hidden shrink-0">
                  {post.image ? (
                    <img src={post.image} alt="IG Post" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <FaInstagram className="text-2xl" />
                    </div>
                  )}
                  <button 
                    onClick={() => setUploadingTarget({ type: 'instagram', index })}
                    className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-[10px] font-bold"
                  >
                    Upload
                  </button>
                </div>
                
                <div className="flex-1">
                  <input 
                    type="url" 
                    value={post.link} 
                    onChange={(e) => handleInstagramChange(index, e.target.value)} 
                    className={`${inputClasses} py-1.5 text-xs h-8 mb-2`} 
                    placeholder="Instagram URL" 
                  />
                  <div className="flex justify-end">
                    <button 
                      onClick={() => handleRemoveInstagramPost(index)}
                      className="text-xs text-red-500 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {mediaData.instagramPosts.length === 0 && (
              <p className="text-sm text-gray-500 italic text-center py-4">No Instagram posts added.</p>
            )}
          </div>
        </div>
      </div>

      {/* Image Upload Modal */}
      {uploadingTarget && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Upload {uploadingTarget.type === 'expertise' ? 'Card Image' : uploadingTarget.type === 'mediaLogo' ? 'Media Logo' : uploadingTarget.type === 'heroBanner' ? 'Hero Banner' : 'Instagram Image'}
            </h3>
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

export default HomePageEditor
