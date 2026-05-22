import SectionHeading from '../ui/SectionHeading'
import { clinicLocations } from '../../data/locationsData'
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa'

const ClinicLocations = ({ className = '' }) => {
  const location = clinicLocations[0]
  const mapEmbedUrl = 'https://maps.google.com/maps?q=Chandigarh,+India&t=&z=12&ie=UTF8&iwloc=&output=embed'

  return (
    <section className={`py-16 md:py-24 bg-white ${className}`}>
      <div className="container-custom">
        <SectionHeading
          label="Our Location"
          title="Visit us at our location"
          subtitle="We are based in Chandigarh, India. Reach out to us to book your consultation today."
        />

        <div className="mt-12 md:mt-16 flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          {/* Location Info */}
          <div className="w-full lg:w-1/2 flex">
            <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-10 hover:shadow-lg transition-all duration-300 group max-w-lg mx-auto lg:mx-0 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-14 h-14 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32] group-hover:scale-110 transition-transform duration-300">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#2E7D32] transition-colors">{location.city}</h3>
                  <p className="text-gray-500 text-sm mt-1">India</p>
                </div>
              </div>

              <p className="text-gray-600 text-base leading-relaxed mb-6">
                {location.address}
              </p>

              <div className="flex items-center gap-3 text-gray-800">
                <FaPhone className="text-gray-400" />
                <a
                  href={`tel:${location.phone.replace(/\s/g, '')}`}
                  className="font-bold text-lg hover:text-[#2E7D32] transition-colors"
                >
                  {location.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Google Map Embed */}
          <div className="w-full lg:w-1/2 min-h-[400px] h-[400px]">
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-gray-100">
              <iframe
                title="Clinic Location Map"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClinicLocations
