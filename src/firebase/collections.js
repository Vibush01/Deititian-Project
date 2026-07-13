import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  orderBy,
  where,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './config'

// ===========================
// Collection Name Constants
// ===========================
export const COLLECTIONS = {
  SITE_SETTINGS: 'siteSettings',
  NAVIGATION: 'navigation',
  PAGES: 'pages',
  SERVICES: 'services',
  SERVICE_SUB_PAGES: 'serviceSubPages',
  TEAM: 'team',
  EXPERTS: 'experts',
  SUCCESS_STORIES: 'successStories',
  RECIPES: 'recipes',
  CAREERS: 'careers',
  LOCATIONS: 'locations',
  INQUIRIES: 'inquiries',
  ADMIN_USERS: 'adminUsers',
  HOME_EXPERTISE_CARDS: 'homeExpertiseCards',
  MEDIA: 'media',
}

// ===========================
// Single Document Operations
// (for collections with one "main" doc like siteSettings, navigation, careers, media)
// ===========================

/**
 * Get a single document by collection and doc ID.
 * @param {string} collectionName
 * @param {string} docId
 * @returns {Promise<Object|null>}
 */
export async function getDocument(collectionName, docId) {
  const docRef = doc(db, collectionName, docId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }
  }
  return null
}

/**
 * Set (create or overwrite) a document.
 * @param {string} collectionName
 * @param {string} docId
 * @param {Object} data
 * @param {boolean} merge - If true, merges with existing data instead of overwriting.
 */
export async function setDocument(collectionName, docId, data, merge = true) {
  const docRef = doc(db, collectionName, docId)
  await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge })
}

/**
 * Update specific fields in a document.
 * @param {string} collectionName
 * @param {string} docId
 * @param {Object} data
 */
export async function updateDocument(collectionName, docId, data) {
  const docRef = doc(db, collectionName, docId)
  await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() })
}

// ===========================
// Collection Operations
// (for collections with multiple docs like team, experts, successStories, etc.)
// ===========================

/**
 * Get all documents from a collection, optionally ordered.
 * @param {string} collectionName
 * @param {string} [orderByField] - Field to order by (e.g., "order", "createdAt")
 * @param {string} [orderDirection] - "asc" or "desc"
 * @returns {Promise<Array<Object>>}
 */
export async function getCollection(collectionName, orderByField = null, orderDirection = 'asc') {
  const colRef = collection(db, collectionName)
  const q = orderByField
    ? query(colRef, orderBy(orderByField, orderDirection))
    : colRef
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}

/**
 * Add a new document to a collection (auto-generated ID).
 * @param {string} collectionName
 * @param {Object} data
 * @returns {Promise<string>} - The new document ID.
 */
export async function addDocument(collectionName, data) {
  const colRef = collection(db, collectionName)
  const docRef = await addDoc(colRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

/**
 * Delete a document from a collection.
 * @param {string} collectionName
 * @param {string} docId
 */
export async function removeDocument(collectionName, docId) {
  const docRef = doc(db, collectionName, docId)
  await deleteDoc(docRef)
}

// ===========================
// Real-Time Listeners
// ===========================

/**
 * Subscribe to real-time updates on a single document.
 * @param {string} collectionName
 * @param {string} docId
 * @param {function} callback - Called with the document data on every update.
 * @returns {function} - Unsubscribe function.
 */
export function subscribeToDocument(collectionName, docId, callback) {
  const docRef = doc(db, collectionName, docId)
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback({ id: docSnap.id, ...docSnap.data() })
    } else {
      callback(null)
    }
  })
}

/**
 * Subscribe to real-time updates on a collection.
 * @param {string} collectionName
 * @param {function} callback - Called with array of documents on every update.
 * @param {string} [orderByField]
 * @param {string} [orderDirection]
 * @returns {function} - Unsubscribe function.
 */
export function subscribeToCollection(collectionName, callback, orderByField = null, orderDirection = 'asc') {
  const colRef = collection(db, collectionName)
  const q = orderByField
    ? query(colRef, orderBy(orderByField, orderDirection))
    : colRef
  return onSnapshot(q, (snapshot) => {
    const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    callback(docs)
  })
}

