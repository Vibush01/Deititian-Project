import useFirestoreDoc from './useFirestoreDoc'
import { COLLECTIONS } from '../firebase/collections'
import { navLinks, footerLinks } from '../data/siteData'

/**
 * Hook to get navigation data from Firestore with static fallback.
 * @returns {{ navLinks: Array, footerLinks: Object, loading: boolean }}
 */
export default function useNavigation() {
  const { data, loading } = useFirestoreDoc(COLLECTIONS.NAVIGATION, 'main')

  return {
    navLinks: data?.navLinks || navLinks,
    footerLinks: data?.footerLinks || footerLinks,
    loading,
  }
}
