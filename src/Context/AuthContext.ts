import { createContext } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  userData: unknown | null
}

export const AuthContext = createContext<AuthContextType | null>(null)
export type { AuthContextType }
