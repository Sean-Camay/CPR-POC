import { ReactNode, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState<unknown | null>(null)

  const login = async (email: string, password: string) => {
    try {
      if (email && password) {
        setIsAuthenticated(true)
        setUserData({ email }) // Simulate user data
        return true
      }
      return false
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUserData(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  )
}

// useAuth hook has been moved to useAuth.ts
