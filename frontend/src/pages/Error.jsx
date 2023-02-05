import React from 'react'
import '../sass/componentsSass/Error.scss'
import { Link } from 'react-router-dom'


function Error({ messageError }) {
  const text = 'The Beatles tell you:  "Go Home"'
  const messageOfError = ['Error 404: file not found!!', 'We’re really sorry!  You appear to have discovered a broken link, or mistyped an address.',
    'Please try again. If you think there’s a problem with the site, please contact us and let us know.',
    'Otherwise, please return to the homepage or use the search function in the sidebar.']

  return (
    <div className="containerErrorGlobal">
      <div className="containerMessage">
        {
          messageOfError.map((element, index) => <span key={index}>{element}</span>)
        }
      </div>
      <div className="containerError">
        <div className="containerErrorPage">
          <header className="containerHeaderError">
            <h1 className='containerName'>Error: {messageError}</h1>
          </header>
          <div className="containerLink">
            <Link to="/Home"><span className="messageError">{text}</span></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error