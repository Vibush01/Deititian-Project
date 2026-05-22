import { useEffect } from 'react'

/**
 * useDocumentMeta — Sets page-specific <title>, meta description, and canonical URL.
 * Works for client-side rendered React SPAs.
 *
 * @param {Object} options
 * @param {string} options.title - Page title (appended with site name)
 * @param {string} options.description - Meta description for the page
 * @param {string} [options.canonical] - Canonical URL path (e.g. "/about-us")
 */
const useDocumentMeta = ({ title, description, canonical }) => {
  useEffect(() => {
    // Update document title
    const fullTitle = title
      ? `${title} | FitJeeva – Medical Nutrition Clinic`
      : 'FitJeeva | Medical Nutrition Clinic – PCOD, Thyroid, Diabetes & Weight Loss Diet Plans'
    document.title = fullTitle

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc && description) {
      metaDesc.setAttribute('content', description)
    }

    // Update OG title
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', fullTitle)
    }

    // Update OG description
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc && description) {
      ogDesc.setAttribute('content', description)
    }

    // Update Twitter title
    const twTitle = document.querySelector('meta[name="twitter:title"]')
    if (twTitle) {
      twTitle.setAttribute('content', fullTitle)
    }

    // Update Twitter description
    const twDesc = document.querySelector('meta[name="twitter:description"]')
    if (twDesc && description) {
      twDesc.setAttribute('content', description)
    }

    // Update canonical URL
    const canonicalUrl = canonical
      ? `https://www.fitjeeva.com${canonical}`
      : 'https://www.fitjeeva.com/'
    let link = document.querySelector('link[rel="canonical"]')
    if (link) {
      link.setAttribute('href', canonicalUrl)
    }

    // Update OG URL
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalUrl)
    }

    // Cleanup: restore defaults on unmount
    return () => {
      document.title = 'FitJeeva | Medical Nutrition Clinic – PCOD, Thyroid, Diabetes & Weight Loss Diet Plans'
    }
  }, [title, description, canonical])
}

export default useDocumentMeta
