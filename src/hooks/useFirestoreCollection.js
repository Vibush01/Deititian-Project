import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config'

/**
 * Hook to subscribe to a Firestore collection in real-time.
 * Returns { data, loading, error }.
 * Falls back gracefully if Firebase is not configured.
 *
 * @param {string} collectionName - The Firestore collection name.
 * @param {string} [orderByField] - Field to order results by.
 * @param {string} [orderDirection='asc'] - 'asc' or 'desc'.
 * @returns {{ data: Array, loading: boolean, error: string|null }}
 */
export default function useFirestoreCollection(collectionName, orderByField = null, orderDirection = 'asc') {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Skip if Firebase is not configured
    if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
      setLoading(false)
      return
    }

    if (!collectionName) {
      setLoading(false)
      return
    }

    const colRef = collection(db, collectionName)
    const q = orderByField
      ? query(colRef, orderBy(orderByField, orderDirection))
      : colRef

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
        setData(docs)
        setLoading(false)
        setError(null)
      },
      (err) => {
        console.error(`Firestore error [${collectionName}]:`, err)
        setError(err.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [collectionName, orderByField, orderDirection])

  return { data, loading, error }
}
