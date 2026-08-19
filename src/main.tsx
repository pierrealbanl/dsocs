import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { uiContent } from './data/uiContent'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error(uiContent.missingRootElement)

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
