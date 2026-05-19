import { useState } from 'react'
import SectionHeading from '../ui/SectionHeading'
import LocationCard from '../ui/LocationCard'
import { clinicLocations } from '../../data/locationsData'

const ClinicLocations = ({ className = '', showMap = true }) => {
  const [selectedCity, setSelectedCity] = useState(clinicLocations[0])

  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(selectedCity.address)}&output=embed`

  return (
    <section className={`py-16 md:py-24 bg-white ${className}`}>
      <div className="container-custom">
        <SectionHeading
          label="Our Clinics"
          title="Visit us at our locations"
          subtitle="We have clinics across major cities to serve you better. Find the nearest location and book your consultation today."
        />

        <div className="mt-12 md:mt-16 flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Location Cards */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar pb-4">
              {clinicLocations.map((location, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedCity(location)}
                  className={`cursor-pointer transition-transform duration-300 ${selectedCity.city === location.city ? 'ring-2 ring-[#2E7D32] rounded-2xl shadow-md scale-[1.02]' : 'hover:scale-[1.02]'}`}
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
          </div>

          {/* Google Map Embed */}
          {showMap && (
            <div className="w-full lg:w-1/2 h-[400px] lg:h-auto min-h-[400px]">
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-gray-100 relative">
                <iframe
                  title="Clinic Location Map"
                  src={mapEmbedUrl}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
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
