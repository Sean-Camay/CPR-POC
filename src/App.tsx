import { Routes, Route } from 'react-router-dom'
import { MainView } from './Views/Main-View'
import { LegalConsentView } from './Views/LegalConsent'
import './App.css'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainView />} />
        <Route path='/legal-consent' element={<LegalConsentView />} />
      </Routes>
    </>
  )
}

export default App
