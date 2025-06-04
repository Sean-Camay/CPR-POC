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
    <div className='flex flex-col items-center justify-center h-screen w-screen bg-white text-black'>
      <Login onLogin={handleSuccessfulLogin} />
    </div>
  )
}
