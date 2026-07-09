import useFirestoreDoc from './useFirestoreDoc'
import { COLLECTIONS } from '../firebase/collections'
import { siteInfo, socialLinks, statsData } from '../data/siteData'

/**
 * Hook to get site-wide settings from Firestore with static fallback.
 * @returns {{ settings: Object, loading: boolean }}
 */
export default function useSiteSettings() {
  const { data, loading } = useFirestoreDoc(COLLECTIONS.SITE_SETTINGS, 'main')

  // Merge Firestore data with static fallback
  const settings = {
    ...siteInfo,
    socialLinks: { ...socialLinks },
    statsData: [...statsData],
    ...(data || {}),
  }

  // If Firestore has socialLinks/statsData, use those
  if (data?.socialLinks) settings.socialLinks = data.socialLinks
  if (data?.statsData) settings.statsData = data.statsData

  return { settings, loading }
}
