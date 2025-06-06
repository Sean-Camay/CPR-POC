import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an Authentication provider')
  }
  return context
}
