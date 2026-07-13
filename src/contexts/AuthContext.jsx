import { createContext, useContext, useState, useEffect } from 'react'
import { onAuthChange, loginWithEmail, logout as firebaseLogout } from '../firebase/auth'

const AuthContext = createContext(null)

/**
 * AuthProvider — wraps the app and provides auth state + actions.
 * Exposes: user, isAdmin, loading, login(), logout()
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Skip if Firebase is not configured
    if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthChange(({ user: fbUser, isAdmin: admin }) => {
      const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours
      const lastActivity = localStorage.getItem('admin_last_activity');
      const now = Date.now();

      // Check if session has expired
      if (fbUser && lastActivity && (now - parseInt(lastActivity, 10)) > EXPIRATION_TIME) {
        logout(); // Auto-logout if inactive for 24 hours
        return;
      }

      if (fbUser) {
        localStorage.setItem('admin_last_activity', now.toString());
      } else {
        localStorage.removeItem('admin_last_activity');
      }

      setUser(fbUser)
      setIsAdmin(admin)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email, password) => {
    const credential = await loginWithEmail(email, password)
    localStorage.setItem('admin_last_activity', Date.now().toString());
    return credential
  }

  const logout = async () => {
    localStorage.removeItem('admin_last_activity');
    await firebaseLogout()
    setUser(null)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to access auth context.
 * @returns {{ user: Object|null, isAdmin: boolean, loading: boolean, login: Function, logout: Function }}
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
