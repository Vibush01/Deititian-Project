/**
 * Contact method card — used in the "Start Your Transformation" section.
 * Displays an icon, title, description, and CTA button.
 *
 * @param {React.ReactNode} icon - Icon element
 * @param {string} title - Card title (e.g. "Whatsapp Us")
 * @param {string} description - Card description
 * @param {string} ctaText - Button text
 * @param {string} ctaLink - Button link URL
 */
const ContactMethodCard = ({ icon, title, description, ctaText, ctaLink }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:-translate-y-1 text-center flex flex-col items-center">
      {/* Icon */}
      <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mb-4">
        <span className="text-2xl text-primary">{icon}</span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-dark mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-text leading-relaxed mb-4 flex-1">{description}</p>

      {/* CTA Button */}
      <a
        href={ctaLink}
        target={ctaLink.startsWith('http') || ctaLink.startsWith('tel') ? '_blank' : '_self'}
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all duration-300 hover:-translate-y-0.5"
      >
        {ctaText}
      </a>
    </div>
  )
}

export default ContactMethodCard
