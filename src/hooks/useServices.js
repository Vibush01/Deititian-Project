import useFirestoreDoc from './useFirestoreDoc'
import useFirestoreCollection from './useFirestoreCollection'
import { COLLECTIONS } from '../firebase/collections'
import { serviceCategories, serviceSubPages, homeExpertiseCards } from '../data/servicesData'

/**
 * Hook to get service categories from Firestore with static fallback.
 * @returns {{ categories: Array, loading: boolean }}
 */
export function useServiceCategories() {
  const { data, loading } = useFirestoreCollection(COLLECTIONS.SERVICES)
  return {
    categories: data.length > 0 ? data : serviceCategories,
    loading,
  }
}

/**
 * Hook to get a service sub-page by slug from Firestore with static fallback.
 * @param {string} slug - The service slug (e.g., "pcod-pcos", "thyroid").
 * @returns {{ page: Object|null, loading: boolean }}
 */
export function useServiceSubPage(slug) {
  const { data, loading } = useFirestoreDoc(COLLECTIONS.SERVICE_SUB_PAGES, slug)
  return {
    page: data || serviceSubPages[slug] || null,
    loading,
  }
}

/**
 * Hook to get home expertise cards from Firestore with static fallback.
 * @returns {{ cards: Array, loading: boolean }}
 */
export function useHomeExpertiseCards() {
  const { data, loading } = useFirestoreCollection(COLLECTIONS.HOME_EXPERTISE_CARDS, 'order')
  return {
    cards: data.length > 0 ? data : homeExpertiseCards,
    loading,
  }
}
