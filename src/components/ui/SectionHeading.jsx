const SectionHeading = ({
  label,
  title,
  subtitle,
  align = 'center',
  dark = false,
  className = '',
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right',
  }

  return (
    <div className={`mb-8 md:mb-12 ${alignClasses[align]} ${className}`}>
      {label && (
        <span className="inline-block bg-[#E8F5E9] text-[#2E7D32] text-xs md:text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-3">
          {label}
        </span>
      )}
      {title && (
        <h2 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mt-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg max-w-3xl leading-relaxed ${dark ? 'text-white/80' : 'text-gray-600'} ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
