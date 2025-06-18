import { useMsal } from '@azure/msal-react'
import { ReactNode, useState, useEffect } from 'react'
import { loginRequest } from '../../authConfig'
import { AuthContext } from '../../Context/AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { instance, accounts } = useMsal()
  const [isAuthenticated, setIsAuthenticated] = useState(accounts.length > 0)
  const [userData, setUserData] = useState<unknown | null>(accounts[0] || null)

  useEffect(() => {
    setIsAuthenticated(accounts.length > 0)
    setUserData(accounts[0] || null)
  }, [accounts])

  const login = async () => {
    try {
      await instance.loginPopup(loginRequest)
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const logout = () => {
    instance.logout()
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  )
}
