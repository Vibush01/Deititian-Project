import { useState, useEffect } from 'react'
import { FaEnvelope, FaSpinner, FaSearch, FaFilter, FaFileCsv, FaEye, FaTrash } from 'react-icons/fa'
import { getCollection, removeDocument, COLLECTIONS } from '../../firebase/collections'
import StatusBadge from '../../components/admin/StatusBadge'
import InquiryDetailPanel from '../../components/admin/InquiryDetailPanel'

const InquiriesManager = () => {
  const [loading, setLoading] = useState(true)
  const [inquiries, setInquiries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all')
  
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [panelOpen, setPanelOpen] = useState(false)

  const fetchInquiries = async () => {
    try {
      if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        setLoading(false)
        return
      }
      // order by createdAt desc if possible, else order
      const data = await getCollection(COLLECTIONS.INQUIRIES, 'createdAt', 'desc')
      setInquiries(data)
    } catch (error) {
      console.error('Failed to fetch inquiries', error)
      // fallback if index is missing
      try {
        const fallback = await getCollection(COLLECTIONS.INQUIRIES)
        setInquiries(fallback.sort((a,b) => {
          const timeA = a.createdAt?.seconds || 0
          const timeB = b.createdAt?.seconds || 0
          return timeB - timeA
        }))
      } catch(e) {
        console.error(e)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInquiries()
  }, [])


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry? This cannot be undone.')) {
      try {
        await removeDocument(COLLECTIONS.INQUIRIES, id)
        setInquiries(prev => prev.filter(i => i.id !== id))
        if (selectedInquiry?.id === id) {
          setPanelOpen(false)
        }
      } catch (err) {
        console.error('Failed to delete', err)
        alert('Failed to delete inquiry')
      }
    }
  }

  const exportCSV = () => {
    if (filteredInquiries.length === 0) return alert('No data to export')
    
    const headers = ['Date', 'Name', 'Email', 'Phone', 'Source', 'Service', 'Status', 'Notes']
    const rows = filteredInquiries.map(i => {
      const date = i.createdAt?.toDate ? i.createdAt.toDate().toLocaleDateString() : (i.createdAt ? new Date(i.createdAt).toLocaleDateString() : 'N/A')
      return [
        date,
        `"${i.name || ''}"`,
        `"${i.email || ''}"`,
        `"${i.phone || ''}"`,
        i.source || '',
        `"${i.service || ''}"`,
        i.status || 'new',
        `"${(i.notes || '').replace(/"/g, '""')}"`
      ].join(',')
    })
    
    const csvContent = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `inquiries_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  // Filter logic
  const filteredInquiries = inquiries.filter(i => {
    const matchesSearch = 
      (i.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
      (i.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (i.phone || '').includes(searchTerm)
      
    const matchesStatus = statusFilter === 'all' || (i.status || 'new') === statusFilter
    const matchesSource = sourceFilter === 'all' || i.source === sourceFilter
    
    return matchesSearch && matchesStatus && matchesSource
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <FaSpinner className="text-[#2E7D32] text-3xl animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-7xl space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaEnvelope className="text-[#2E7D32]" />
            Inquiries & Leads
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage consultation requests and contact form submissions.</p>
        </div>
        <button
          onClick={exportCSV}
          className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-bold text-sm shadow-sm transition-colors flex items-center gap-2 self-start md:self-auto"
        >
          <FaFileCsv className="text-lg text-green-600" />
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[70vh] min-h-[500px]">
        {/* Filters Bar */}
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row gap-4 items-center shrink-0">
          <div className="relative flex-1 w-full">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name, email, phone..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2E7D32]/50 focus:border-[#2E7D32] text-sm"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 flex-1 md:flex-none">
              <FaFilter className="text-gray-400 text-sm" />
              <select 
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="w-full md:w-auto px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2E7D32]/50 focus:border-[#2E7D32] text-sm font-medium text-gray-700"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="followup">Follow-up</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="flex items-center flex-1 md:flex-none">
              <select 
                value={sourceFilter}
                onChange={e => setSourceFilter(e.target.value)}
                className="w-full md:w-auto px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2E7D32]/50 focus:border-[#2E7D32] text-sm font-medium text-gray-700"
              >
                <option value="all">All Sources</option>
                <option value="consultation">Consultation Form</option>
                <option value="contact">Contact Form</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Area */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-white sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Date</th>
                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Name</th>
                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Source</th>
                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">Status</th>
                <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map(inquiry => {
                  const dateStr = inquiry.createdAt?.toDate 
                    ? inquiry.createdAt.toDate().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) 
                    : (inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString() : 'N/A')
                  
                  return (
                    <tr key={inquiry.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => { setSelectedInquiry(inquiry); setPanelOpen(true) }}>
                      <td className="py-3 px-4 text-sm text-gray-500 whitespace-nowrap">{dateStr}</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-gray-900">{inquiry.name}</div>
                        <div className="text-xs text-gray-500">{inquiry.email}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${inquiry.source === 'consultation' ? 'bg-indigo-50 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}>
                          {inquiry.source === 'consultation' ? 'Consultation' : 'Contact'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={inquiry.status} />
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            onClick={(e) => { e.stopPropagation(); setSelectedInquiry(inquiry); setPanelOpen(true) }}
                          >
                            <FaEye />
                          </button>
                          <button 
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            onClick={(e) => { e.stopPropagation(); handleDelete(inquiry.id) }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-500 italic">
                    No inquiries found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <InquiryDetailPanel 
        inquiry={selectedInquiry}
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        onUpdated={() => {
          // Refresh list to show updated status
          fetchInquiries()
        }}
      />
    </div>
  )
}

export default InquiriesManager
