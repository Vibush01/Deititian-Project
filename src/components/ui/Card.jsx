/**
 * Generic Card wrapper with consistent styling.
 *
 * @param {React.ReactNode} children
 * @param {string} className - Additional classes
 * @param {boolean} hover - Enable hover lift effect
 * @param {string} padding - Tailwind padding class override
 */
const Card = ({
  children,
  className = '',
  hover = true,
  padding = 'p-6',
}) => {
  return (
    <div
    >
      {children}
    </div>
  )
}

export default Card
