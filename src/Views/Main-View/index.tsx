import { FilePicker } from '../../../src/components/FilePicker/FilePicker'
import { PatientInformation } from '../../../src/components/PatientInformation/PatientInformation'

export const MainView = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen bg-white'>
      <FilePicker />

      <PatientInformation />
    </div>
  )
}
