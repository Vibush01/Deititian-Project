import { useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-[#2E7D32] text-white rounded-full shadow-lg hover:bg-[#1B5E20] hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#2E7D32]/50"
          aria-label="Back to top"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}
    </>
  )
}

export default BackToTop
