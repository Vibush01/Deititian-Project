import { FaHeartbeat, FaDumbbell, FaSpa } from 'react-icons/fa'

/**
 * Service card for displaying individual service items.
 *
 * @param {string} icon - Icon type: 'heart' | 'dumbbell' | 'spa' | custom
 * @param {string} title - Service title
 * @param {string} description - Service description
 * @param {function} onClick - Optional click handler
 */

const iconMap = {
  heart: FaHeartbeat,
  dumbbell: FaDumbbell,
  spa: FaSpa,
  'heart-pulse': FaHeartbeat,
}

const ServiceCard = ({ icon, title, description, onClick }) => {
  const IconComponent = iconMap[icon] || FaHeartbeat

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-xl hover:bg-primary-lighter transition-all duration-300 group ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-light flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
        <IconComponent className="text-lg text-primary group-hover:text-white transition-colors duration-300" />
      </div>
      <div>
        <h4 className="font-bold text-dark text-base mb-1">{title}</h4>
        <p className="text-sm text-gray-text leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export default ServiceCard
