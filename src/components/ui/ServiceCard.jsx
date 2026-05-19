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
      onClick={onClick}
    >
      <div>
        <IconComponent />
      </div>
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default ServiceCard
