import { addDocument } from '../firebase/collections'
import { COLLECTIONS } from '../firebase/collections'

/**
 * Submit a contact form inquiry to Firestore.
 * @param {Object} formData - The form data.
 * @returns {Promise<string>} - The new document ID.
 */
export async function submitContactInquiry(formData) {
  return addDocument(COLLECTIONS.INQUIRIES, {
    ...formData,
    source: 'contact',
    status: 'new',
    notes: '',
  })
}

/**
 * Submit a consultation form inquiry to Firestore.
 * @param {Object} formData - The form data.
 * @returns {Promise<string>} - The new document ID.
 */
export async function submitConsultationInquiry(formData) {
  return addDocument(COLLECTIONS.INQUIRIES, {
    ...formData,
    source: 'consultation',
    status: 'new',
    notes: '',
  })
}
