import { useState } from 'react'
import SectionHeading from '../ui/SectionHeading'
import LocationCard from '../ui/LocationCard'
import { clinicLocations } from '../../data/locationsData'

/**
 * Clinic locations section with location cards and embedded Google Map.
 *
 * @param {string} className - Additional wrapper classes
 * @param {boolean} showMap - Whether to show the Google Map embed
 */
const ClinicLocations = ({ className = '', showMap = true }) => {
  const [selectedCity, setSelectedCity] = useState(clinicLocations[0])

  // Google Maps embed URL for the selected location
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(selectedCity.address)}&output=embed`

  return (
    <section className={`section-padding bg-white ${className}`}>
      <div className="container-custom">
        <SectionHeading
          label="Our Clinics"
          title="Visit us at our locations"
          subtitle="We have clinics across major cities to serve you better. Find the nearest location and book your consultation today."
        />

        <div className={`mt-8 ${showMap ? 'grid grid-cols-1 lg:grid-cols-2 gap-8' : ''}`}>
          {/* Location Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {clinicLocations.map((location, index) => (
              <div
                key={index}
                className={`cursor-pointer transition-all duration-200 rounded-xl ${
                  selectedCity.city === location.city && showMap
                    ? 'ring-2 ring-primary'
                    : ''
                }`}
                onClick={() => setSelectedCity(location)}
              >
                <LocationCard
                  city={location.city}
                  address={location.address}
                  phone={location.phone}
                  mapLink={location.mapLink}
                />
              </div>
            ))}
          </div>

          {/* Google Map Embed */}
          {showMap && (
            <div className="sticky top-24 h-fit">
              <div className="bg-gray-light rounded-2xl overflow-hidden shadow-[var(--shadow-card)] h-[400px] lg:h-[500px]">
                <iframe
                  title="Clinic Location Map"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ClinicLocations
