import { Button, styled } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'
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

export const FilePicker = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
    }
  }

  const uploadFile = async () => {
    if (!selectedFile) return

    const headers = {
      'Content-Type': 'multipart/form-data',
    }

    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await axios.post('/api/upload', formData, { headers })

      console.log('File uploaded successfully:', response.data)
      setSelectedFile(null)
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      setIsUploading(false)
    }
  }
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  })

  return (
    <div>
      {mockData && (
        <div className='mb-4'>
          <p>Loaded {mockData.patients.length} patients from mock data</p>
        </div>
      )}
      <Button
        component='label'
        role={undefined}
        variant='contained'
        tabIndex={-1}
        startIcon={<FileUploadIcon />}
        sx={{ color: 'black', backgroundColor: '#FFFCF9' }}
      >
        {selectedFile ? selectedFile.name : 'Select File'}
        <VisuallyHiddenInput type='file' onChange={handleFileChange} />
      </Button>

      {selectedFile && (
        <Button
          variant='contained'
          onClick={uploadFile}
          disabled={isUploading}
          sx={{ marginLeft: 2 }}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </Button>
      )}
    </div>
  )
}
