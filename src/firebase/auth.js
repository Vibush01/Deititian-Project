import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from './config'
import { COLLECTIONS } from './collections'

/**
 * Sign in with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export async function loginWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

/**
 * Sign out the current user.
 * @returns {Promise<void>}
 */
export async function logout() {
  return signOut(auth)
}

/**
 * Check if a user UID exists in the adminUsers Firestore collection.
 * This is our admin verification — no custom claims needed.
 * @param {string} uid - Firebase Auth UID
 * @returns {Promise<boolean>}
 */
export async function checkIsAdmin(uid) {
  if (!uid) return false
  try {
    const adminDocRef = doc(db, COLLECTIONS.ADMIN_USERS, uid)
    const adminDoc = await getDoc(adminDocRef)
    return adminDoc.exists()
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

/**
 * Subscribe to auth state changes.
 * Callback receives { user, isAdmin } or { user: null, isAdmin: false }.
 * @param {function} callback - Called with { user, isAdmin } on every auth state change.
 * @returns {function} - Unsubscribe function.
 */
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const isAdmin = await checkIsAdmin(user.uid)
      callback({ user, isAdmin })
    } else {
      callback({ user: null, isAdmin: false })
    }
  })
}

/**
 * Get the currently signed-in user (synchronous — may be null on initial load).
 * @returns {import('firebase/auth').User|null}
 */
export function getCurrentUser() {
  return auth.currentUser
}
