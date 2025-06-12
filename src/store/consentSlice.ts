import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ConsentState {
  fullName: string
  consentDate: string
  consentGiven: boolean
  isSubmitted: boolean
}

// initial state
const initialState: ConsentState = {
  fullName: '',
  consentDate: '',
  consentGiven: false,
  isSubmitted: false,
}

// Redux slice for managing consent form state
export const consentSlice = createSlice({
  name: 'consent',
  initialState,
  reducers: {
    updateFullName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload
    },
    updateConsentDate: (state, action: PayloadAction<string>) => {
      state.consentDate = action.payload
    },
    updateConsentGiven: (state, action: PayloadAction<boolean>) => {
      state.consentGiven = action.payload
    },
    submitConsentForm: (
      state,
      action: PayloadAction<{
        fullName: string
        consentDate: string
        consentGiven: boolean
      }>
    ) => {
      const { fullName, consentDate, consentGiven } = action.payload
      state.fullName = fullName
      state.consentDate = consentDate
      state.consentGiven = consentGiven
      state.isSubmitted = true
    },
    resetConsentForm: () => {
      return initialState
    },
  },
})

// export actions
export const {
  updateFullName,
  updateConsentDate,
  updateConsentGiven,
  submitConsentForm,
  resetConsentForm,
} = consentSlice.actions

// export reducer
export default consentSlice.reducer
