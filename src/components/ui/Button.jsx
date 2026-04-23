import { Link } from 'react-router-dom'

/**
 * Reusable Button component with multiple variants.
 * 
 * @param {string} variant - 'primary' | 'secondary' | 'ghost' | 'white'
 * @param {string} href - External link (renders <a>)
 * @param {string} to - Internal route (renders <Link>)
 * @param {function} onClick - Click handler (renders <button>)
 * @param {string} className - Additional classes
 * @param {React.ReactNode} icon - Optional icon element
 * @param {React.ReactNode} children - Button text/content
 * @param {string} size - 'sm' | 'md' | 'lg'
 */
const Button = ({
  children,
  variant = 'primary',
  href,
  to,
  onClick,
  className = '',
  icon,
  size = 'md',
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 cursor-pointer border-none'

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white',
    ghost: 'bg-transparent text-primary hover:bg-primary-light',
    white: 'bg-white text-primary hover:bg-primary-lighter hover:shadow-lg hover:-translate-y-0.5',
  }

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`

  // External link
  if (href) {
    return (
      <a
        href={href}
        className={combinedStyles}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {icon && <span className="text-lg">{icon}</span>}
        {children}
      </a>
    )
  }

  // Internal route
  if (to) {
    return (
      <Link to={to} className={combinedStyles} {...props}>
        {icon && <span className="text-lg">{icon}</span>}
        {children}
      </Link>
    )
  }

  // Regular button
  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedStyles}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  )
}

export default Button
