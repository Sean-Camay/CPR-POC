import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

export const SignOut = () => {
  const navigate = useNavigate()
  const handleSignOut = () => {
    // Clear local storage
    localStorage.removeItem('personalKey')
    localStorage.removeItem('medicalKey')

    // Optionally, redirect to login or home page
    navigate('/login')
  }

  return (
    <>
      <Button
        onClick={handleSignOut}
        type='submit'
        variant='contained'
        color='primary'
        fullWidth
        sx={{ mt: 3 }}
      >
        Sign Out
      </Button>
    </>
  )
}
