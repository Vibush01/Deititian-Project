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
    <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center text-center hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-300 group h-full">
      {/* Icon */}
      <div className="w-20 h-20 bg-[#F1F8E9] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
        <span className="text-3xl text-[#2E7D32]">{icon}</span>
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
        {description}
      </p>

      {/* CTA Button */}
      <a
        href={ctaLink}
        target={ctaLink.startsWith('http') || ctaLink.startsWith('tel') ? '_blank' : '_self'}
        rel="noopener noreferrer"
        className="w-full inline-flex justify-center items-center py-4 px-6 bg-gray-50 text-[#2E7D32] font-bold rounded-xl group-hover:bg-[#2E7D32] group-hover:text-white transition-colors duration-300 shadow-sm"
      >
        {ctaText}
      </a>
    </div>
  )
}

export default ContactMethodCard
