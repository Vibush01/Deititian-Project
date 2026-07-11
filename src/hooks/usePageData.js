import useFirestoreDoc from './useFirestoreDoc'
import useFirestoreCollection from './useFirestoreCollection'
import { COLLECTIONS } from '../firebase/collections'

// Import static fallback data
import { aboutIntro, philosophySections, coreServices } from '../data/aboutData'
import { careersHero, companyValues, jobPositions, teamImages } from '../data/careersData'
import { clinicLocations } from '../data/locationsData'
import { defaultExperts, defaultTeamMembers } from '../data/peopleData'
import { defaultRecipes } from '../data/recipesData'
import { defaultPrivacySections } from '../data/privacyData'

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
  return { 
    members: data.length > 0 ? data : defaultTeamMembers, 
    loading 
  }
}

/**
 * Hook to get experts from Firestore with static fallback.
 */
export function useExperts() {
  const { data, loading } = useFirestoreCollection(COLLECTIONS.EXPERTS, 'order')
  return { 
    experts: data.length > 0 ? data : defaultExperts, 
    loading 
  }
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
  return { 
    recipes: data.length > 0 ? data : defaultRecipes, 
    loading 
  }
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

/**
 * Hook to get home page specific data (e.g. Quick Links) from Firestore.
 */
export function useHomePageData() {
  const { data, loading } = useFirestoreDoc(COLLECTIONS.PAGES, 'home')
  return {
    quickLinks: data?.quickLinks || null,
    loading,
  }
}

/**
 * Hook to get contact page specific data from Firestore.
 */
export function useContactPageData() {
  const { data, loading } = useFirestoreDoc(COLLECTIONS.PAGES, 'contact')
  return {
    heroTitle: data?.heroTitle || 'Get in Touch',
    heroSubtitle: data?.heroSubtitle || "Whether you're ready to start your journey or just have a few questions, we're here to help.",
    loading,
  }
}

/**
 * Hook to get privacy policy specific data from Firestore.
 */
export function usePrivacyPolicyData() {
  const { data, loading } = useFirestoreDoc(COLLECTIONS.PAGES, 'privacy')
  return {
    heroTitle: data?.heroTitle || 'Privacy Policy',
    heroSubtitle: data?.heroSubtitle || "At FitJeeva, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or use our services.",
    sections: data?.sections || defaultPrivacySections,
    loading,
  }
}
