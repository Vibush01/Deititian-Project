import Card from './Card'

/**
 * Numbered value card used on the Careers page.
 * Displays a number (01-06), title, and description.
 *
 * @param {string} number - Display number (e.g. "01")
 * @param {string} title - Value title
 * @param {string} description - Value description
 */
const ValueCard = ({ number, title, description }) => {
  return (
    <Card className="relative overflow-hidden group">
      {/* Large faded number in background */}
      <span className="absolute top-2 right-4 text-6xl font-extrabold text-primary/8 group-hover:text-primary/15 transition-colors duration-300 select-none">
        {number}
      </span>

      <div className="relative z-10">
        <span className="inline-block text-sm font-bold text-primary bg-primary-light rounded-full px-3 py-1 mb-3">
          {number}
        </span>
        <h3 className="text-lg font-bold text-dark mb-2">{title}</h3>
        <p className="text-sm text-gray-text leading-relaxed">{description}</p>
      </div>
    </Card>
  )
}

export default ValueCard
