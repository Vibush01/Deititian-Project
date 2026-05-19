import { useState, useEffect, useRef } from 'react'

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
    <div ref={ref} className="flex flex-col items-center justify-center p-6 text-center group">
      <div className="text-3xl md:text-4xl lg:text-5xl font-black text-[#2E7D32] mb-2 tracking-tight group-hover:scale-110 transition-transform duration-300">
        {formatNumber(count)}
        <span className="text-[#4CAF50]">{suffix}</span>
      </div>
      <p className="text-sm md:text-base font-bold text-gray-700 uppercase tracking-wider">{label}</p>
    </div>
  )
}

export default CounterCard
