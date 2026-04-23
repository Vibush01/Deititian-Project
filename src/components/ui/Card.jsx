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
      className={`
        bg-white rounded-2xl shadow-[var(--shadow-card)]
        ${padding}
        ${hover ? 'hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default Card
