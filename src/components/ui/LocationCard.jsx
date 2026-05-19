import { FaMapMarkerAlt, FaPhone, FaDirections } from 'react-icons/fa'

const LocationCard = ({ city, address, phone, mapLink }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 h-full flex flex-col group">
      {/* City header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32] group-hover:scale-110 transition-transform duration-300">
          <FaMapMarkerAlt />
        </div>
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#2E7D32] transition-colors">{city}</h3>
      </div>

      {/* Address */}
      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
        {address}
      </p>

      <div className="flex flex-col gap-4 mt-auto">
        {/* Phone */}
        <div className="flex items-center gap-3 text-gray-800">
          <FaPhone className="text-gray-400" />
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="font-bold hover:text-[#2E7D32] transition-colors"
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
            className="flex items-center justify-center gap-2 w-full py-3 bg-gray-50 text-[#2E7D32] font-semibold rounded-xl hover:bg-[#2E7D32] hover:text-white transition-all duration-300"
          >
            <FaDirections />
            Get directions
          </a>
        )}
      </div>
    </div>
  )
}

export default LocationCard
