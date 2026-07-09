import { useState, useEffect } from 'react'
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaNotesMedical, FaSave, FaSpinner, FaWhatsapp } from 'react-icons/fa'
import { updateDocument, COLLECTIONS } from '../../firebase/collections'
import StatusBadge from './StatusBadge'

const InquiryDetailPanel = ({ inquiry, isOpen, onClose, onUpdated }) => {
  const [status, setStatus] = useState('new')
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  useEffect(() => {
    if (inquiry) {
      setStatus(inquiry.status || 'new')
      setNotes(inquiry.notes || '')
      setSaveMsg('')
    }
  }, [inquiry])

  if (!isOpen || !inquiry) return null

  const handleSave = async () => {
    setSaving(true)
    setSaveMsg('')
    try {
      if (import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        await updateDocument(COLLECTIONS.INQUIRIES, inquiry.id, {
          status,
          notes
        })
      }
      setSaveMsg('Updated!')
      if (onUpdated) onUpdated()
      setTimeout(() => setSaveMsg(''), 2000)
    } catch (err) {
      console.error(err)
      setSaveMsg('Error saving')
    } finally {
      setSaving(false)
    }
  }

  // Formatting date safely
  const formattedDate = inquiry.createdAt?.toDate 
    ? inquiry.createdAt.toDate().toLocaleString() 
    : (inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleString() : 'N/A')

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 z-50 transition-opacity backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Inquiry Details</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500 font-medium">
                {inquiry.source === 'consultation' ? 'Consultation Request' : 'General Contact'}
              </span>
              <span className="text-gray-300">•</span>
              <StatusBadge status={status} />
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
          
          {/* Action Area: Update Status & Notes */}
          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-4">
            <div>
              <label className="block text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">Update Status</label>
              <select 
                value={status} 
                onChange={e => setStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="followup">Follow-up</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">Admin Notes</label>
              <textarea 
                value={notes} 
                onChange={e => setNotes(e.target.value)}
                rows={3}
                placeholder="Add private notes about this client here..."
                className="w-full px-3 py-2 rounded-lg border border-blue-200 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              {saveMsg && <span className={`text-xs font-bold ${saveMsg === 'Error saving' ? 'text-red-500' : 'text-[#2E7D32]'}`}>{saveMsg}</span>}
              <button 
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2 disabled:opacity-70"
              >
                {saving ? <FaSpinner className="animate-spin" /> : <FaSave />} Save Updates
              </button>
            </div>
          </div>

          {/* Details */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
                  <FaUser className="text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Full Name</p>
                  <p className="font-bold text-gray-900">{inquiry.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
                  <FaEnvelope className="text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Email</p>
                  <a href={`mailto:${inquiry.email}`} className="font-bold text-blue-600 hover:underline">{inquiry.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
                  <FaPhone className="text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Phone</p>
                  <div className="flex items-center gap-2">
                    <a href={`tel:${inquiry.phone}`} className="font-bold text-gray-900 hover:text-blue-600">{inquiry.phone}</a>
                    {inquiry.whatsapp && <FaWhatsapp className="text-green-500 text-sm" title="WhatsApp available" />}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center shrink-0">
                  <FaCalendarAlt className="text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Submitted On</p>
                  <p className="font-bold text-gray-900 text-sm">{formattedDate}</p>
                </div>
              </div>
            </div>
          </div>

          {inquiry.source === 'consultation' && (
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Consultation Details</h3>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-3">
                
                {inquiry.service && (
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Service Requested</p>
                    <p className="font-bold text-gray-900 text-sm">{inquiry.service}</p>
                  </div>
                )}
                
                {(inquiry.age || inquiry.gender) && (
                  <div className="grid grid-cols-2 gap-4">
                    {inquiry.age && (
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Age</p>
                        <p className="font-bold text-gray-900 text-sm">{inquiry.age}</p>
                      </div>
                    )}
                    {inquiry.gender && (
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Gender</p>
                        <p className="font-bold text-gray-900 text-sm">{inquiry.gender}</p>
                      </div>
                    )}
                  </div>
                )}

                {(inquiry.weight || inquiry.height) && (
                  <div className="grid grid-cols-2 gap-4">
                    {inquiry.weight && (
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Weight</p>
                        <p className="font-bold text-gray-900 text-sm">{inquiry.weight} kg</p>
                      </div>
                    )}
                    {inquiry.height && (
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">Height</p>
                        <p className="font-bold text-gray-900 text-sm">{inquiry.height} cm</p>
                      </div>
                    )}
                  </div>
                )}

                {inquiry.medicalConcern && (
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Medical Concerns / Goals</p>
                    <p className="font-semibold text-gray-800 text-sm whitespace-pre-wrap">{inquiry.medicalConcern}</p>
                  </div>
                )}

                {inquiry.location && (
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">City/State/Country</p>
                    <p className="font-semibold text-gray-800 text-sm">{inquiry.location}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {inquiry.message && (
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Message</h3>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-sm text-gray-800 whitespace-pre-wrap italic">"{inquiry.message}"</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}

export default InquiryDetailPanel
