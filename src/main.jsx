import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginPage from './login.jsx'
import Setprofile from './setprofile.jsx'
import './login.css';
import './ProfileSetupForm.css';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginPage />
    <Setprofile />

  </StrictMode>,
)
