// src/context/AuthContext.tsx
import { createContext } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: () => Promise<boolean>
  logout: () => void
  userData: unknown | null
}

export const AuthContext = createContext<AuthContextType | null>(null)
