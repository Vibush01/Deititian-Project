import { FaInstagram } from 'react-icons/fa'
import SectionHeading from '../ui/SectionHeading'
import { socialLinks } from '../../data/siteData'

/**
 * Instagram feed section with static image grid styled like IG posts.
 * "Follow us on Instagram" section that appears on every page.
 *
 * @param {string} className - Additional wrapper classes
 */

// Placeholder images styled to look like Instagram posts
const instagramImages = [
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1547592180-85f173990554?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=300&h=300&fit=crop',
]

const InstagramFeed = ({ className = '' }) => {
  return (
    <section className={`section-padding bg-white ${className}`}>
      <div className="container-custom">
        <SectionHeading
          label="Stay Inspired Daily"
          title="Follow us on Instagram"
          subtitle={
            <>
              Follow us on Instagram{' '}
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                {socialLinks.instagramHandle}
              </a>{' '}
              for tips, recipes, and real transformation stories.
            </>
          }
        />

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mt-8">
          {instagramImages.map((img, index) => (
            <a
              key={index}
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden"
            >
              <img
                src={img}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-all duration-300 flex items-center justify-center">
                <FaInstagram className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          ))}
        </div>

        {/* Follow Button */}
        <div className="text-center mt-8">
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <FaInstagram className="text-lg" />
            Follow {socialLinks.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  )
}

export default InstagramFeed
