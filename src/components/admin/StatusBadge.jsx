const StatusBadge = ({ status }) => {
  const normalized = (status || 'new').toLowerCase()
  
  let styles = ''
  let label = status || 'New'
  
  switch (normalized) {
    case 'new':
      styles = 'bg-blue-50 text-blue-700 border-blue-200'
      label = 'New'
      break
    case 'contacted':
      styles = 'bg-yellow-50 text-yellow-700 border-yellow-200'
      label = 'Contacted'
      break
    case 'followup':
    case 'follow-up':
      styles = 'bg-purple-50 text-purple-700 border-purple-200'
      label = 'Follow-up'
      break
    case 'closed':
      styles = 'bg-green-50 text-green-700 border-green-200'
      label = 'Closed'
      break
    default:
      styles = 'bg-gray-50 text-gray-700 border-gray-200'
      label = status
  }

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border ${styles}`}>
      {label}
    </span>
  )
}

export default StatusBadge
