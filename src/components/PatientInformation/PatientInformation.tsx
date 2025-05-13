import axios from 'axios'
import { useEffect, useState } from 'react'

interface Patient {
  id: number
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
}

interface MockData {
  patients: Patient[]
  doctors: {
    id: number
    firstName: string
    lastName: string
    specialty: string
    email: string
    phone: string
  }[]
  appointments: {
    id: number
    patientId: number
    doctorId: number
    date: string
    time: string
    reason: string
  }[]
  prescriptions: {
    id: number
    patientId: number
    medication: string
    dosage: string
    frequency: string
    startDate: string
    endDate?: string
  }[]
}

export const PatientInformation = () => {
  const [mockData, setMockData] = useState<MockData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<MockData>('/src/data/mockData.json')
        console.log('Data fetched successfully:', response.data)
        setMockData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      {mockData && (
        <div className='mb-4 text-black'>
          <p>Loaded {mockData.patients.length} patients from mock data</p>
          {mockData.patients.map((patient) => (
            <div key={patient.id} className='mb-2'>
              <h2 className='text-lg font-bold'>
                {patient.firstName} {patient.lastName}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
