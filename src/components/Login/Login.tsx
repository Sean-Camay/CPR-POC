import { Alert, Box, Button, Typography } from '@mui/material'
import axios from 'axios'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../CustomHooks/useAuth'
import { useMsal } from '@azure/msal-react'

interface LoginProps {
  onLogin?: (username: string) => void
}

interface LoginResponse {
  personalDataKey?: string
  medicalDataKey?: string
}

export const Login = ({ onLogin }: LoginProps) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { instance, accounts } = useMsal()

  const isAuthenticated = accounts.length > 0

  const handleLogin = () => {
    const cfg = instance.getConfiguration()
    console.log('MSAL Configuration:', cfg)
    console.log('Is Authenticated:', isAuthenticated)
    instance.loginRedirect()
  }

  const handleLogout = () => {
    instance.logoutRedirect()
  }

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    setError(null)
    setLoading(true)

    try {
      // Trigger Azure B2C login flow
      const success = await login()

      if (success) {
        onLogin?.('user@example.com')
        navigate('/')
        // navigate('/legal-consent')
      }
      const apiUrl =
        import.meta.env.VITE_API_URL ||
        'https://cprrestservcies.azurewebsites.net/api/Keys'
      const apiKey = import.meta.env.VITE_API_KEY

      let url = apiUrl
      if (apiKey) {
        url += `?code=${apiKey}`
      }

      const response = await axios.post<LoginResponse>(url)

      console.log('Response from API:', response)

      // I need to store these keys that are in the response on my device's vault or for now, local storage
      // Store keys in local storage if present
      if (response.data.personalDataKey) {
        localStorage.setItem('personalKey', response.data.personalDataKey)
      }
      if (response.data.medicalDataKey) {
        localStorage.setItem('medicalKey', response.data.medicalDataKey)
      }
    } catch (error) {
      console.error('Login error:', error)
      setError(
        error instanceof Error
          ? error.message
          : 'An error occurred during login. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='card'>
        <section className='auth'>
          {!isAuthenticated && instance ? (
            <div className='login'>
              <button onClick={handleLogin}>Login</button>
            </div>
          ) : (
            <div className='logout'>
              <button onClick={handleLogout}>Logout</button>
              <div>Welcome, {accounts[0].username}</div>
            </div>
          )}
        </section>
      </div>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          mx: 'auto',
          mt: 8,
          p: 4,
          boxShadow: 2,
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant='h5' component='h1' gutterBottom>
          Login
        </Typography>

        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in with Azure B2C'}
        </Button>
      </Box>
    </>
  )
}
