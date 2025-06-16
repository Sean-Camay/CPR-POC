import { Navigate } from 'react-router-dom'
import { FilePicker } from '../../../src/components/FilePicker/FilePicker'
import { SignOut } from '../../../src/components/SignOut/SignOut'
import { PatientInformation } from '../../../src/components/PatientInformation/PatientInformation'
import { useAuth } from '../../CustomHooks/useAuth'

export const MainView = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  return (
    <>
      <div>
        <SignOut />
      </div>
      <div className='flex flex-col items-center justify-center h-screen w-screen bg-white'>
        <FilePicker />

        <PatientInformation />
      </div>
    </>
  )
}
