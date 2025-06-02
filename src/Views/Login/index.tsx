import { Navigate } from 'react-router-dom'
import { Login } from '../../components/Login/Login'
import { useAuth } from '../../CustomHooks/useAuth'

export const LoginView = () => {
  const { isAuthenticated } = useAuth()

  // if already authenticated, redirect to main view
  if (isAuthenticated) {
    return <Navigate to='/' replace />
  }

  const handleSuccessfulLogin = (email: string) => {
    console.log('User logged in:', email)
  }

  return (
    <div>
      <h1>Login Page</h1>
      <p>This is where the login form will be implemented.</p>
      {/* Future implementation of login form goes here */}
      <Login onLogin={handleSuccessfulLogin} />
    </div>
  )
}
