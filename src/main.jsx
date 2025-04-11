import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useState } from 'react'
import MobileOTPLogin from './login.jsx'
import SetProfile from './SetProfile.jsx' // Make sure this import is included
import './LoginPage.css'
import './SetProfile.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const handleLoginSuccess = () => {
    console.log("Login success triggered!") // Add debugging log
    setIsLoggedIn(true)
  }
  
  return (
    <>
      {!isLoggedIn ? (
        <MobileOTPLogin onLoginSuccess={handleLoginSuccess} />
      ) : (
        <SetProfile />
      )}
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)