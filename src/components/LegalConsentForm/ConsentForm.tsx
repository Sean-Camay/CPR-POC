import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  updateFullName,
  updateConsentDate,
  updateConsentGiven,
  submitConsentForm,
} from '../../store/consentSlice'
import { useState } from 'react'

export interface ConsentFormProps {
  onSubmit?: (data: {
    fullName: string
    consentDate: string
    consentGiven: boolean
  }) => void
}

export const ConsentForm = ({ onSubmit }: ConsentFormProps) => {
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // get consent state from Redux store
  const { fullName, consentDate, consentGiven } = useAppSelector(
    (state) => state.consent
  )

  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFullName(event.target.value))
  }

  const handleConsentDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(updateConsentDate(event.target.value))
  }

  const handleConsentGivenChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(updateConsentGiven(event.target.checked))
  }

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault()
    if (!fullName || !consentDate || !consentGiven) {
      setError('Please fill in all fields.')
      return
    }
    setError(null)

    dispatch(
      submitConsentForm({
        fullName,
        consentDate,
        consentGiven,
      })
    )
    onSubmit?.({
      fullName,
      consentDate,
      consentGiven,
    })

    navigate('/')
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
        onChange={handleFullNameChange}
        fullWidth
        margin='normal'
        required
      />

      <TextField
        label='Date'
        type='date'
        value={consentDate}
        onChange={handleConsentDateChange}
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
            onChange={handleConsentGivenChange}
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
