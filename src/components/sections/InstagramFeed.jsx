import { FaInstagram } from 'react-icons/fa'
import SectionHeading from '../ui/SectionHeading'
import useSiteSettings from '../../hooks/useSiteSettings'
import { useMediaData } from '../../hooks/usePageData'
import ip1 from '../../assets/images/IP1.webp'
import ip2 from '../../assets/images/IP2.webp'
import ip3 from '../../assets/images/IP3.webp'
import ip4 from '../../assets/images/IP4.webp'
import ip5 from '../../assets/images/IP5.webp'
import ip6 from '../../assets/images/IP6.webp'

const defaultFeedImages = [
  { image: ip1, url: '' },
  { image: ip2, url: '' },
  { image: ip3, url: '' },
  { image: ip4, url: '' },
  { image: ip5, url: '' },
  { image: ip6, url: '' },
]

const InstagramFeed = ({ className = '' }) => {
  const { settings } = useSiteSettings()
  const { instagramPosts } = useMediaData()
  const socialLinks = settings.socialLinks || {}

  // Use Firestore data if available, otherwise fall back to hardcoded defaults
  const feedItems = instagramPosts.length > 0
    ? instagramPosts.map(post => ({ image: post.image, url: post.url || socialLinks.instagram }))
    : defaultFeedImages.map(item => ({ ...item, url: socialLinks.instagram }))

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
          {feedItems.map((item, index) => (
            <a
              key={index}
              href={item.url || socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden group rounded-xl md:rounded-2xl block"
            >
              <img
                src={item.image}
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
