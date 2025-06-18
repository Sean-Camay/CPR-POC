// src/hooks/useApiToken.ts
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../authConfig'
import { useState } from 'react'

export const useApiToken = () => {
  const { instance, accounts } = useMsal()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const getAccessToken = async () => {
    if (accounts.length === 0) {
      setError(new Error('No authenticated account found'))
      return null
    }

    setIsLoading(true)
    setError(null)

    try {
      const tokenResponse = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
        scopes: ['https://your-api-scope.com/user_impersonation'], // Adjust scopes as needed
      })
      return tokenResponse.accessToken
    } catch (error) {
      // Token acquisition failed silently, try interactive
      console.error('Silent token acquisition failed:', error)
      try {
        const tokenResponse = await instance.acquireTokenPopup({
          ...loginRequest,
          scopes: ['https://your-api-scope.com/user_impersonation'],
        })
        return tokenResponse.accessToken
      } catch (interactiveError) {
        console.error('Failed to acquire token:', interactiveError)
        setError(interactiveError as Error)
        return null
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    getAccessToken,
    isLoading,
    error,
  }
}
