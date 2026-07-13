import { useState, useEffect } from 'react'
import { FaSave, FaImage, FaSpinner, FaPlus, FaTrash, FaInstagram, FaNewspaper, FaImages, FaChevronUp, FaChevronDown } from 'react-icons/fa'
import { getDocument, setDocument, COLLECTIONS } from '../../firebase/collections'
import ImageUploader from '../../components/admin/ImageUploader'

import fitjeevaBanner1 from '../../assets/images/fitjeeva-banner-1.webp'
import fitjeevaBanner2 from '../../assets/images/fitjeeva-banner-2.webp'
import fitjeevaBanner3 from '../../assets/images/fitjeeva-banner-3.webp'
import fitjeevaBanner4 from '../../assets/images/fitjeeva-banner-4.webp'
import fitjeevaBanner5 from '../../assets/images/fitjeeva-banner-5.webp'

import ip1 from '../../assets/images/IP1.webp'
import ip2 from '../../assets/images/IP2.webp'
import ip3 from '../../assets/images/IP3.webp'
import ip4 from '../../assets/images/IP4.webp'
import ip5 from '../../assets/images/IP5.webp'
import ip6 from '../../assets/images/IP6.webp'

const MediaManager = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [media, setMedia] = useState({ mediaLogos: [], instagramPosts: [], heroBanners: [] })
  const fetchMedia = async () => {
    try {
      if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        setLoading(false)
        return
      }
      const data = await getDocument(COLLECTIONS.MEDIA, 'main')
      if (data && (data.mediaLogos?.length > 0 || data.instagramPosts?.length > 0)) {
        setMedia({
          // Ensure strings are mapped to objects if they were saved as strings
          mediaLogos: (data.mediaLogos || []).map(logo => typeof logo === 'string' ? { name: logo } : logo),
          instagramPosts: data.instagramPosts || [],
          heroBanners: data.heroBanners || [],
        })
      } else {
        setMedia({
          mediaLogos: [
            { name: "The Times of India" },
            { name: "Hindustan Times" },
            { name: "Health Magazine" },
            { name: "Wellness Daily" }
          ],
          instagramPosts: [
            { image: ip1, url: '' },
            { image: ip2, url: '' },
            { image: ip3, url: '' },
            { image: ip4, url: '' },
            { image: ip5, url: '' },
            { image: ip6, url: '' },
          ],
          heroBanners: [
            fitjeevaBanner1,
            fitjeevaBanner2,
            fitjeevaBanner3,
            fitjeevaBanner4,
            fitjeevaBanner5,
          ],
        })
      }
    } catch (error) {
      console.error('Failed to fetch media data', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMedia()
  }, [])

  const handleSaveAll = async () => {
    setSaving(true)
    setSaveMessage('')
    try {
      if (import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        await setDocument(COLLECTIONS.MEDIA, 'main', media)
      }
      setSaveMessage('Media settings saved successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      console.error('Error saving media data', error)
      setSaveMessage('Error saving content. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  // --- Handlers for Logos ---
  const addLogo = () => setMedia(prev => ({ ...prev, mediaLogos: [...prev.mediaLogos, { name: '' }] }))
  const updateLogo = (index, val) => {
    const newLogos = [...media.mediaLogos]
    newLogos[index] = { ...newLogos[index], name: val }
    setMedia({ ...media, mediaLogos: newLogos })
  }
  const removeLogo = (index) => {
    setMedia(prev => ({ ...prev, mediaLogos: prev.mediaLogos.filter((_, i) => i !== index) }))
  }

  // --- Handlers for Instagram Posts ---
  const addPost = () => setMedia(prev => ({ ...prev, instagramPosts: [...prev.instagramPosts, { image: '', link: '' }] }))
  const updatePost = (index, field, val) => {
    const newPosts = [...media.instagramPosts]
    newPosts[index] = { ...newPosts[index], [field]: val }
    setMedia({ ...media, instagramPosts: newPosts })
  }
  const removePost = (index) => {
    setMedia(prev => ({ ...prev, instagramPosts: prev.instagramPosts.filter((_, i) => i !== index) }))
  }
  const movePost = (index, direction) => {
    setMedia(prev => {
      const newPosts = [...prev.instagramPosts]
      if (direction === 'up' && index > 0) {
        [newPosts[index - 1], newPosts[index]] = [newPosts[index], newPosts[index - 1]]
      } else if (direction === 'down' && index < newPosts.length - 1) {
        [newPosts[index + 1], newPosts[index]] = [newPosts[index], newPosts[index + 1]]
      }
      return { ...prev, instagramPosts: newPosts }
    })
  }

  // --- Handlers for Hero Banners ---
  const [uploadingBanner, setUploadingBanner] = useState(false)
  const removeBanner = (index) => {
    setMedia(prev => ({ ...prev, heroBanners: prev.heroBanners.filter((_, i) => i !== index) }))
  }
  const moveBanner = (index, direction) => {
    setMedia(prev => {
      const newBanners = [...prev.heroBanners]
      if (direction === 'up' && index > 0) {
        [newBanners[index - 1], newBanners[index]] = [newBanners[index], newBanners[index - 1]]
      } else if (direction === 'down' && index < newBanners.length - 1) {
        [newBanners[index + 1], newBanners[index]] = [newBanners[index], newBanners[index + 1]]
      }
      return { ...prev, heroBanners: newBanners }
    })
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
    <div className="max-w-5xl space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaImage className="text-[#2E7D32]" />
            Media Manager
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage publications spotlight and Instagram feed.</p>
        </div>
        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-sm transition-colors flex w-full sm:w-auto justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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

      {/* Media Spotlight */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FaNewspaper className="text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Media Spotlight</h2>
              <p className="text-xs text-gray-500">Publications where you have been featured.</p>
            </div>
          </div>
          <button onClick={addLogo} className="text-sm font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <FaPlus className="text-xs" /> Add Publication
          </button>
        </div>
        
        <div className="space-y-3">
          {media.mediaLogos.map((logo, index) => (
            <div key={index} className="flex gap-4 items-center">
              <div className="flex-1">
                <input 
                  type="text" 
                  value={logo.name} 
                  onChange={e => updateLogo(index, e.target.value)} 
                  className={inputClasses} 
                  placeholder="e.g. The Times of India" 
                />
              </div>
              <button onClick={() => removeLogo(index)} className="w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0">
                <FaTrash />
              </button>
            </div>
          ))}
          {media.mediaLogos.length === 0 && (
            <p className="text-sm text-gray-500 italic text-center py-4">No publications added yet.</p>
          )}
        </div>
      </div>

      {/* Hero Banners */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FaImages className="text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Home Hero Banners</h2>
              <p className="text-xs text-gray-500">Upload up to 5 images for the hero carousel on the home page.</p>
            </div>
          </div>
          <button 
            onClick={() => setUploadingBanner(true)} 
            disabled={media.heroBanners.length >= 5}
            className="text-sm font-bold bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPlus className="text-xs" /> Add Banner
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {media.heroBanners.map((img, index) => (
            <div key={index} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-video bg-gray-50">
              <img src={img} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button onClick={() => moveBanner(index, 'up')} disabled={index === 0} className="w-8 h-8 flex items-center justify-center text-gray-500 bg-white shadow-sm hover:bg-gray-50 rounded-md disabled:opacity-50"><FaChevronUp className="text-xs" /></button>
                <button onClick={() => moveBanner(index, 'down')} disabled={index === media.heroBanners.length - 1} className="w-8 h-8 flex items-center justify-center text-gray-500 bg-white shadow-sm hover:bg-gray-50 rounded-md disabled:opacity-50"><FaChevronDown className="text-xs" /></button>
                <button 
                  onClick={() => removeBanner(index)}
                  className="w-8 h-8 flex items-center justify-center text-red-500 bg-white shadow-sm hover:bg-red-50 rounded-md transition-colors"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {media.heroBanners.length === 0 && (
          <p className="text-sm text-gray-500 italic text-center py-4 border-t border-gray-100 mt-2">No hero banners added. Static default images will be used.</p>
        )}

        {/* Upload Banner Modal */}
        {uploadingBanner && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Hero Banner</h3>
              <ImageUploader onUpload={(url) => {
                setMedia(prev => ({ ...prev, heroBanners: [...prev.heroBanners, url] }))
                setUploadingBanner(false)
              }} />
              <button 
                onClick={() => setUploadingBanner(false)}
                className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Instagram Posts */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-pink-50 text-pink-500 flex items-center justify-center">
              <FaInstagram className="text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Instagram Posts</h2>
              <p className="text-xs text-gray-500">Curate images for your home page Instagram feed grid.</p>
            </div>
          </div>
          <button onClick={addPost} className="text-sm font-bold bg-pink-50 text-pink-600 hover:bg-pink-100 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <FaPlus className="text-xs" /> Add Post
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {media.instagramPosts.map((post, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col relative group">
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button onClick={() => movePost(index, 'up')} disabled={index === 0} className="w-8 h-8 flex items-center justify-center text-gray-500 bg-white shadow-sm hover:bg-gray-50 rounded-full disabled:opacity-50"><FaChevronUp className="text-xs" /></button>
                <button onClick={() => movePost(index, 'down')} disabled={index === media.instagramPosts.length - 1} className="w-8 h-8 flex items-center justify-center text-gray-500 bg-white shadow-sm hover:bg-gray-50 rounded-full disabled:opacity-50"><FaChevronDown className="text-xs" /></button>
                <button 
                  onClick={() => removePost(index)} 
                  className="w-8 h-8 flex items-center justify-center text-red-500 bg-white shadow-sm hover:bg-red-50 rounded-full transition-colors"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
              
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-200 mb-4 border border-gray-200 relative">
                {post.image ? (
                  <img src={post.image} alt="Instagram post" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <ImageUploader onUpload={(url) => updatePost(index, 'image', url)} />
                  </div>
                )}
                {post.image && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white p-2 rounded-lg scale-75">
                      <ImageUploader onUpload={(url) => updatePost(index, 'image', url)} />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-auto">
                <input 
                  type="url" 
                  value={post.link} 
                  onChange={e => updatePost(index, 'link', e.target.value)} 
                  className={inputClasses} 
                  placeholder="Instagram Post URL..." 
                />
              </div>
            </div>
          ))}
          {media.instagramPosts.length === 0 && (
            <div className="col-span-full py-8 text-center text-sm text-gray-500 italic">
              No Instagram posts curated yet. Add at least 6 for a full grid.
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default MediaManager
