import {
  ConsentForm,
  ConsentFormProps,
} from '../../components/LegalConsentForm/ConsentForm'

export const LegalConsentView = () => {
  const handleConsentSubmit: ConsentFormProps['onSubmit'] = (data) => {
    console.log('Consent data submitted:', data)
    // Here you would typically send the data to your backend or handle it as needed
  }
  return (
    <div>
      <ConsentForm onSubmit={handleConsentSubmit} />
    </div>
  )
}
