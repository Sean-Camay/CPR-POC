import { Alert, Box, Button, TextField, Typography } from '@mui/material'
import { FormEvent, useState } from 'react'

interface LoginProps {
  onLogin?: (username: string, password: string) => void
}

export const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!email || !password) {
      setError('Please fill in both fields.')
      return
    }
    setError(null)
    onLogin?.(email, password)
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

      <Button
        type='submit'
        variant='contained'
        color='primary'
        fullWidth
        sx={{ mt: 3 }}
      >
        Sign In
      </Button>
    </Box>
  )
}
