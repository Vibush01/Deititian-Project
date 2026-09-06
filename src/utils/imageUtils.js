/**
 * Centralized image utility functions.
 * All image validation, extraction, and sanitization logic lives here.
 * Admin editors and display components import from this single file.
 */

/**
 * Check if a string is a valid remote URL (Cloudinary, etc.)
 * Returns false for Vite module paths, [object Object], empty strings, etc.
 */
export function isValidUrl(str) {
  if (typeof str !== 'string') return false
  return str.startsWith('https://') || str.startsWith('http://')
}

/**
 * Extract a clean URL string from an ImageUploader result.
 * ImageUploader may return a string URL or an object { url, publicId, ... }.
 * This normalizes it to always return a string (or empty string if invalid).
 */
export function extractImageUrl(result) {
  if (!result) return ''
  if (typeof result === 'string') return result
  if (typeof result === 'object' && result.url) return result.url
  return ''
}

/**
 * Sanitize a single object before Firestore save.
 * Removes or nullifies image fields that contain invalid URLs (Vite local paths, etc.)
 *
 * @param {Object} obj - The object to sanitize
 * @param {string[]} imageFields - Field names that contain image URLs
 * @returns {Object} - A new object with invalid image fields removed
 */
export function sanitizeImageFields(obj, imageFields = ['image']) {
  if (!obj || typeof obj !== 'object') return obj
  const cleaned = { ...obj }
  for (const field of imageFields) {
    if (cleaned[field] && !isValidUrl(cleaned[field])) {
      delete cleaned[field]
    }
  }
  return cleaned
}

/**
 * Sanitize an array of objects before Firestore save.
 * Each item's image fields are validated; invalid URLs are stripped.
 *
 * @param {Object[]} arr - Array of objects (e.g., experts[], recipes[])
 * @param {string[]} imageFields - Field names that contain image URLs
 * @returns {Object[]} - New array with sanitized objects
 */
export function sanitizeImageArray(arr, imageFields = ['image']) {
  if (!Array.isArray(arr)) return arr
  return arr.map(item => sanitizeImageFields(item, imageFields))
}

/**
 * Deep sanitize a data object for Firestore save.
 * Walks through specified paths and strips invalid image URLs.
 *
 * @param {Object} data - The full data object to save
 * @param {Object} fieldMap - Map of paths to their image fields
 *   e.g., { 'coreServices': ['image'], 'philosophySections': ['image'] }
 * @returns {Object} - Sanitized copy of data
 */
export function sanitizeDataForSave(data, fieldMap) {
  if (!data || typeof data !== 'object') return data
  const cleaned = { ...data }
  for (const [key, imageFields] of Object.entries(fieldMap)) {
    if (Array.isArray(cleaned[key])) {
      cleaned[key] = sanitizeImageArray(cleaned[key], imageFields)
    } else if (cleaned[key] && typeof cleaned[key] === 'object') {
      cleaned[key] = sanitizeImageFields(cleaned[key], imageFields)
    } else if (typeof cleaned[key] === 'string') {
      if (!isValidUrl(cleaned[key])) {
        delete cleaned[key]
      }
    }
  }
  return cleaned
}
