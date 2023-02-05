import React, { useState } from 'react'

// import UserDetails from './UserDetails.jsx'
import Button from '../Button.jsx'
import Footer from '../Footer/Footer.jsx'
import { FcAddressBook, FcUnlock } from 'react-icons/fc'
import '../../sass/componentsSass/Login/Login.scss'


{ /* <Login
onRegisterSwitch={() => setMode('register')}
setLoggedIn={setLoggedIn}
/> */ }

export default function Login({ onRegisterSwitch, setLoggedIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])


  const submit = async (ev) => {
    ev.preventDefault()

    const response = await fetch('http://localhost:3001/user/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    if (response.status === 200) {
      setLoggedIn(true)
    } else {
      setErrors(['Email oder Passwort ist falsch'])
    }
  }

  return (
    <div className="contCentral">


    </div>
  )
}

/*
     <div className="containerCentral">
        <div className="containerForm">
          <form className='LoginForm' onSubmit={submit}>
            <h3 className="titleOfLoginForm">Login</h3>
            <div className="containerDataLogin">
              <div className="containerLabel_Input ">
                <label htmlFor='emailUserLogin'>Email:<i><FcAddressBook /></i></label>
                <input type='email' id="emailUserLogin" placeholder='email...' maxLength={35} required="on" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="containerLabel_Input ">
                <label htmlFor='passwordUserLogin'>Password:<i><FcUnlock /></i></label>
                <input type='password' id="passwordUserLogin" placeholder='Password...' required="on" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
            </div>

            <div className="containerButton">
              <Button
                handleButton={() => console.log("Submit Login data")}
                text={"Submit"}
              />
              <Button
                handleButton={() => {
                  setEmail('')
                  setPassword('')
                }}
                text={"Delete"}
              />
            </div>

            <ul className="ulOfErrors">
              {errors.map(error => (
                <li key={error} className='liError'>
                  {error}
                </li>
              ))}
            </ul>
            <label className='register-switch' onClick={onRegisterSwitch}>Noch nicht registriert?</label>
          </form>
        </div>
      </div>
      <Footer
      />
*/