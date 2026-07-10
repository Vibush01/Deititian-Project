import useFirestoreDoc from './useFirestoreDoc'
import useFirestoreCollection from './useFirestoreCollection'
import { COLLECTIONS } from '../firebase/collections'

// Import static fallback data
import { aboutIntro, philosophySections, coreServices } from '../data/aboutData'
import { careersHero, companyValues, jobPositions, teamImages } from '../data/careersData'
import { clinicLocations } from '../data/locationsData'

/**
 * Hook to get About page data from Firestore with static fallback.
 */
export function useAboutData() {
  const { data, loading } = useFirestoreDoc(COLLECTIONS.PAGES, 'about')
  return {
    aboutIntro: data?.aboutIntro || aboutIntro,
    philosophySections: data?.philosophySections || philosophySections,
    coreServices: data?.coreServices || coreServices,
    loading,
  }
}

/**
 * Hook to get Careers page data from Firestore with static fallback.
 */
export function useCareersData() {
  const { data, loading } = useFirestoreDoc(COLLECTIONS.CAREERS, 'main')
  return {
    careersHero: data?.hero || careersHero,
    companyValues: data?.companyValues || companyValues,
    jobPositions: data?.jobPositions || jobPositions,
    teamImages: data?.teamImages || teamImages,
    loading,
  }
}

/**
 * Hook to get team members from Firestore with static fallback.
 */
export function useTeamMembers() {
  const { data, loading } = useFirestoreCollection(COLLECTIONS.TEAM, 'order')
  return { members: data, loading }
}

/**
 * Hook to get experts from Firestore with static fallback.
 */
export function useExperts() {
  const { data, loading } = useFirestoreCollection(COLLECTIONS.EXPERTS, 'order')
  return { experts: data, loading }
}

/**
 * Hook to get success stories from Firestore with static fallback.
 */
export function useSuccessStories() {
  const { data, loading } = useFirestoreCollection(COLLECTIONS.SUCCESS_STORIES, 'order')
  return { stories: data, loading }
}

/**
 * Hook to get recipes from Firestore with static fallback.
 */
export function useRecipes() {
  const { data, loading } = useFirestoreCollection(COLLECTIONS.RECIPES, 'order')
  return { recipes: data, loading }
}

/**
 * Hook to get clinic locations from Firestore with static fallback.
 */
export function useLocations() {
  const { data, loading } = useFirestoreCollection(COLLECTIONS.LOCATIONS, 'order')
  return {
    locations: data.length > 0 ? data : clinicLocations,
    loading,
  }
}

/**
 * Hook to get media data from Firestore with static fallback.
 */
export function useMediaData() {
  const { data, loading } = useFirestoreDoc(COLLECTIONS.MEDIA, 'main')
  return {
    mediaLogos: data?.mediaLogos || [],
    instagramPosts: data?.instagramPosts || [],
    heroBanners: data?.heroBanners || [],
    loading,
  }
}
