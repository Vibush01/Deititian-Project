import { useState, useEffect, useRef } from 'react'

/**
 * Animated counter card that counts up when scrolled into view.
 *
 * @param {number} number - Target number to count to
 * @param {string} suffix - Text after the number (e.g. "+", "%", " Lakh+")
 * @param {string} label - Description text below the number
 * @param {number} decimals - Decimal places (default 0)
 * @param {number} duration - Animation duration in ms (default 2000)
 */
const CounterCard = ({
  number,
  suffix = '',
  label,
  decimals = 0,
  duration = 2000,
}) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          animateCount()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasAnimated])

  const animateCount = () => {
    const startTime = performance.now()
    const step = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * number)
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }

  const formatNumber = (num) => {
    if (decimals > 0) {
      return num.toFixed(decimals)
    }
    return Math.floor(num).toLocaleString()
  }

  return (
    <div ref={ref} className="text-center px-4 py-3">
      <div className="text-3xl md:text-4xl font-extrabold text-primary leading-none">
        {formatNumber(count)}
        <span className="text-2xl md:text-3xl">{suffix}</span>
      </div>
      <p className="mt-2 text-sm md:text-base text-gray-text font-medium">{label}</p>
    </div>
  )
}

export default CounterCard
