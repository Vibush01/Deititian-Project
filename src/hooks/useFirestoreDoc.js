import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config'

/**
 * Hook to subscribe to a single Firestore document in real-time.
 * Returns { data, loading, error }.
 * Falls back gracefully if Firebase is not configured.
 *
 * @param {string} collectionName - The Firestore collection name.
 * @param {string} docId - The document ID to subscribe to.
 * @returns {{ data: Object|null, loading: boolean, error: string|null }}
 */
export default function useFirestoreDoc(collectionName, docId) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Skip if Firebase is not configured
    if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
      setLoading(false)
      return
    }

    if (!collectionName || !docId) {
      setLoading(false)
      return
    }

    const docRef = doc(db, collectionName, docId)
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setData({ id: docSnap.id, ...docSnap.data() })
        } else {
          setData(null)
        }
        setLoading(false)
        setError(null)
      },
      (err) => {
        console.error(`Firestore error [${collectionName}/${docId}]:`, err)
        setError(err.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [collectionName, docId])

  return { data, loading, error }
}
