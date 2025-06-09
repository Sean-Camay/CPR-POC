import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../CustomHooks/useAuth'

interface LoginProps {
  onLogin?: (username: string, password: string) => void
}

interface LoginResponse {
  personalDataKey?: string
  medicalDataKey?: string
}

export const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!email || !password) {
      setError('Please fill in both fields.')
      return
    }
    setError(null)
    setLoading(true)

    // in Azure create a B2C Tenent for Entra, make Darryl and I admins, create a secret, set up the secret in part of the login process

    try {
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

      // Store keys in local storage if present
      if (response.data.personalDataKey) {
        localStorage.setItem('personalKey', response.data.personalDataKey)
      }
      if (response.data.medicalDataKey) {
        localStorage.setItem('medicalKey', response.data.medicalDataKey)
      }

      // I need to store these keys that are in the response on my device's vault or for now, local storage

      const success = await login(email, password)

      if (success) {
        // Call onLogin callback if provided
        onLogin?.(email, password)

        // Redirect to main view after successful login
        navigate('/')
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

      <TextField
        label='Email Address'
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin='normal'
        required
      />

      <TextField
        label='Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin='normal'
        required
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
        }
        label='Remember Me'
      />

      <Button
        type='submit'
        variant='contained'
        color='primary'
        fullWidth
        sx={{ mt: 3 }}
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
    </Box>
  )
}
