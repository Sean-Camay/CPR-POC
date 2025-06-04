import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/Authentication/AuthProvider'
import { MainView } from './Views/Main-View'
import { LegalConsentView } from './Views/LegalConsent'
import { LoginView } from './Views/Login'
import './App.css'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<MainView />} />
        <Route path='/legal-consent' element={<LegalConsentView />} />
        <Route path='/login' element={<LoginView />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
