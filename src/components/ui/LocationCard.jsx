import { FaMapMarkerAlt, FaPhone, FaDirections } from 'react-icons/fa'

/**
 * Location card displaying a clinic city, address, phone, and directions link.
 *
 * @param {string} city - City name
 * @param {string} address - Full address
 * @param {string} phone - Phone number
 * @param {string} mapLink - Google Maps directions URL
 */
const LocationCard = ({ city, address, phone, mapLink }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:-translate-y-1">
      {/* City header */}
      <div className="flex items-center gap-2 mb-3">
        <FaMapMarkerAlt className="text-primary text-lg flex-shrink-0" />
        <h3 className="text-lg font-bold text-dark">{city}</h3>
      </div>

      {/* Address */}
      <p className="text-sm text-gray-text leading-relaxed mb-3 pl-7">
        {address}
      </p>

      {/* Phone */}
      <div className="flex items-center gap-2 mb-3 pl-7">
        <FaPhone className="text-primary text-xs" />
        <a
          href={`tel:${phone.replace(/\s/g, '')}`}
          className="text-sm text-gray-text hover:text-primary transition-colors"
        >
          {phone}
        </a>
      </div>

      {/* Directions link */}
      {mapLink && (
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors pl-7"
        >
          <FaDirections className="text-base" />
          Get directions
        </a>
      )}
    </div>
  )
}

export default LocationCard
