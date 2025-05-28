import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'

export interface ConsentFormProps {
  onSubmit?: (data: {
    fullName: string
    consentDate: string
    consentGiven: boolean
  }) => void
}

export const ConsentForm = ({ onSubmit }: ConsentFormProps) => {
  const [fullName, setFullName] = useState('')
  const [consentDate, setConsentDate] = useState('')
  const [consentGiven, setConsentGiven] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault()
    if (!fullName || !consentDate || !consentGiven) {
      setError('Please fill in all fields.')
      return
    }
    setError(null)
    onSubmit?.({
      fullName,
      consentDate,
      consentGiven,
    })
  }

  return (
    <Box
      component='form'
      onSubmit={submitForm}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        p: 3,
        boxShadow: 1,
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant='h5' component='h2' gutterBottom>
        Legal Consent Form
      </Typography>

      <TextField
        label='Full Name'
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        fullWidth
        margin='normal'
        required
      />

      <TextField
        label='Date'
        type='date'
        value={consentDate}
        onChange={(e) => setConsentDate(e.target.value)}
        fullWidth
        margin='normal'
        sx={{
          '& .MuiInputLabel-root': {
            transform: 'translate(14px, -9px) scale(0.75)',
          },
        }}
        required
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={consentGiven}
            onChange={(e) => setConsentGiven(e.target.checked)}
          />
        }
        label='I hereby consent to the collection and use of my health information for the purposes described.'
      />

      {error && (
        <Alert severity='error' sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        type='submit'
        variant='contained'
        color='primary'
        fullWidth
        sx={{ mt: 3 }}
        disabled={!consentGiven || !fullName || !consentDate}
      >
        Submit Consent
      </Button>
    </Box>
  )
}
