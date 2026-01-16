import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootElement = document.getElementById('root')

if (!rootElement) {
  document.body.innerHTML = '<h1>Error: No se encontró el elemento root</h1>'
} else {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  } catch (error) {
    console.error('Error al renderizar la aplicación:', error)
    rootElement.innerHTML = `<h1>Error en la aplicación</h1><p>${error.message}</p>`
  }
}

