import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import MyScoreContextProvider from './context/MyContext.jsx'
import App from './App'
import './sass/main.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <MyScoreContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </MyScoreContextProvider>
  </React.StrictMode>
)
