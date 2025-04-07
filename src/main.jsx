import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginPage from './login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginPage />
  </StrictMode>,
)
