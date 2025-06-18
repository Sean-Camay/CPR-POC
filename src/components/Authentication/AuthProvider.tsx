import { useMsal } from '@azure/msal-react'
import { ReactNode, useState, useEffect, useCallback } from 'react'
import { AuthError, InteractionRequiredAuthError } from '@azure/msal-browser'
import { loginRequest } from '../../authConfig'
import { AuthContext } from '../../Context/AuthContext'

interface UserData {
  name?: string
  username?: string
  email?: string
  idTokenClaims?: Record<string, unknown>
  [key: string]: unknown
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { instance, accounts } = useMsal()
  const [isAuthenticated, setIsAuthenticated] = useState(accounts.length > 0)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsAuthenticated(accounts.length > 0)
    setUserData(accounts[0] || null)
  }, [accounts])

  // Handle token acquisition
  const getAccessToken = useCallback(async () => {
    if (accounts.length === 0) {
      throw new Error('No authenticated account found')
    }

    try {
      const result = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      return result.accessToken
    } catch (error) {
      // If silent token acquisition fails, fallback to interactive
      if (error instanceof InteractionRequiredAuthError) {
        try {
          const result = await instance.acquireTokenPopup(loginRequest)
          return result.accessToken
        } catch (interactiveError) {
          console.error(
            'Interactive token acquisition failed',
            interactiveError
          )
          throw interactiveError
        }
      }
      console.error('Token acquisition failed', error)
      throw error
    }
  }, [instance, accounts])

  const login = async () => {
    if (isLoading) return false

    setIsLoading(true)
    try {
      const result = await instance.loginPopup(loginRequest)
      if (result) {
        console.log('Login successful')
        return true
      }
      return false
    } catch (error) {
      console.error(
        'Login failed:',
        error instanceof AuthError ? error.errorMessage : error
      )
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    instance.logout()
  }

  // Create context value
  const contextValue = {
    isAuthenticated,
    login,
    logout,
    userData,
    isLoading,
    getAccessToken,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
