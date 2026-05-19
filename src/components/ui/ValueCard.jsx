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
    <Card>
      {/* Large faded number in background */}
      <span>
        {number}
      </span>

      <div>
        <span>
          {number}
        </span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Card>
  )
}

export default ValueCard
