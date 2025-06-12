import { Box, Typography, Paper } from '@mui/material'
import { useAppSelector } from '../../store/hooks'

export const ConsentStatus = () => {
  const { fullName, consentDate, consentGiven, isSubmitted } = useAppSelector(
    (state) => state.consent
  )

  if (!isSubmitted) {
    return (
      <Paper
        sx={{ p: 3, bgcolor: 'warning.light', color: 'warning.contrastText' }}
      >
        <Typography variant='h6'>Consent Status</Typography>
        <Typography variant='body1'>
          Consent has not been submitted yet.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper
      sx={{ p: 3, bgcolor: 'success.light', color: 'success.contrastText' }}
    >
      <Typography variant='h6'>Consent Status</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography>
          <strong>Name:</strong> {fullName}
        </Typography>
        <Typography>
          <strong>Date:</strong> {consentDate}
        </Typography>
        <Typography>
          <strong>Consent Given:</strong> {consentGiven ? 'Yes' : 'No'}
        </Typography>
      </Box>
    </Paper>
  )
}
