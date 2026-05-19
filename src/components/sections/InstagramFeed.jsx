import { FaInstagram } from 'react-icons/fa'
import SectionHeading from '../ui/SectionHeading'
import { socialLinks } from '../../data/siteData'
import fitjeevaDietitian from '../../assets/images/fitjeeva-dietitian.jpg'
import fitjeevaClinical from '../../assets/images/fitjeeva-clinical.jpg'
import fitjeevaHomevisit from '../../assets/images/fitjeeva-homevisit.jpg'
import fitjeevaMillet from '../../assets/images/fitjeeva-millet.jpg'
import fitjeevaBanner from '../../assets/images/fitjeeva-banner.jpg'

const feedImages = [
  fitjeevaDietitian, fitjeevaClinical, fitjeevaMillet,
  fitjeevaHomevisit, fitjeevaBanner, fitjeevaDietitian,
]

const InstagramFeed = ({ className = '' }) => {
  return (
    <section className={`py-16 md:py-24 bg-white ${className}`}>
      <div className="container-custom">
        <SectionHeading
          label="Stay Inspired Daily"
          title="Follow us on Instagram"
          subtitle={
            <>
              Follow us on Instagram{' '}
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-[#2E7D32] font-bold hover:underline">
                {socialLinks.instagramHandle}
              </a>{' '}
              for tips, recipes, and real transformation stories.
            </>
          }
        />

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 mt-8 md:mt-12">
          {feedImages.map((img, index) => (
            <a
              key={index}
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden group rounded-xl md:rounded-2xl block"
            >
              <img
                src={img}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <FaInstagram className="text-white text-3xl md:text-4xl transform scale-50 group-hover:scale-100 transition-transform duration-300 delay-100" />
              </div>
            </a>
          ))}
        </div>

        {/* Follow Button */}
        <div className="mt-10 md:mt-12 flex justify-center">
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold rounded-full px-8 py-4 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:-translate-y-1 transition-all duration-300"
          >
            <FaInstagram className="text-xl" />
            Follow {socialLinks.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  )
}

export default InstagramFeed
