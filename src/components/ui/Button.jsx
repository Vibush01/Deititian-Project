import { Link } from 'react-router-dom'

const Button = ({
  children,
  variant = 'primary',
  href,
  to,
  onClick,
  icon,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all duration-300 px-6 py-3 md:px-8 md:py-3.5 text-sm md:text-base cursor-pointer"
  
  const variants = {
    primary: "bg-[#2E7D32] text-white hover:bg-[#1B5E20] hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-transparent text-[#2E7D32] border-2 border-[#2E7D32] hover:bg-[#2E7D32] hover:text-white",
    ghost: "bg-transparent text-[#2E7D32] hover:bg-[#E8F5E9]",
    white: "bg-white text-[#2E7D32] hover:bg-[#F1F8E9] shadow-md hover:shadow-lg hover:-translate-y-0.5"
  }

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={combinedStyles} {...props}>
        {icon && <span className="text-lg">{icon}</span>}
        {children}
      </a>
    )
  }

  if (to) {
    return (
      <Link to={to} className={combinedStyles} {...props}>
        {icon && <span className="text-lg">{icon}</span>}
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={combinedStyles} {...props}>
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  )
}

export default Button
