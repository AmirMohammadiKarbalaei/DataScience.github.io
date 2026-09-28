import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// For the technical readers who open devtools: one quiet line in the site's
// console voice, pointing at the real source.
console.log(
  '%c> %camir.data%c · built with React, TypeScript and Vite · source: https://github.com/AmirMohammadiKarbalaei/DataScience.github.io',
  'color:#5bb8cc;font-family:monospace',
  'color:#ffffff;font-family:monospace;font-weight:700',
  'color:#b0b0b0;font-family:monospace'
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
