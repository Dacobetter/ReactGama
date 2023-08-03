import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { getFireStoreApp } from './firebase/config.js'

getFireStoreApp()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)