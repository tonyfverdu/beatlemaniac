import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import { FcAddressBook, FcUnlock } from "react-icons/fc"

import { MyScoreContext } from '../context/MyContext.jsx'
import '../sass/componentsSass/Login/LoginCustomer.scss'


function LoginOfCustomer() {
  const messageOfComponent = {
    titelFormLogin: 'Login Form',
    titelFormLogout: 'Logout Form',
    titleOfFormular: 'Login',
    textLogout: 'Logout',
    textLogin: 'Login',
    titleOfRegisterNewCustomer: 'New with us?  Create a new account.',
    textCreateNewCustomer: 'New Account',
    titelDataOfdelivery: 'Data for delivery order'
  }

  const [toogleCheckBox, setToogleCheckBox] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [mode, setMode] = useState('login')

  const { userCustomer, setUserCustomer, setNameOfUserLogin, isLoggedin, setLoggedin } = useContext(MyScoreContext)

  const navigate = useNavigate()

  async function handleButtonLogout() {
    const _id = userCustomer._id
    const urlBackendOfLogout = 'http://127.0.0.1:3001/users/logout'
    const fetchDataOfUser = await fetch(urlBackendOfLogout, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(
        { _id }
      )
    })

    const response = await fetchDataOfUser.json()
    const { message } = response

    if (fetchDataOfUser.status === 200) {
      setNameOfUserLogin('Login')
      setLoggedin(false)
      console.log(`Logout.  All Ok. ${message}`)
    } else {
      setLoggedin(true)
      console.error('Logout. All bad !!')
      navigate(-1)
    }
    handleDelete()
  }

  function uploadAvatar() {
    const imgAvatarURL = userCustomer.avatar_url
    return imgAvatarURL
  }

  async function handleSubmitForm(ev) {
    ev.preventDefault()

    const urlBackendOfLogin = 'http://127.0.0.1:3001/users/login'

    const fetchDataOfUser = await fetch(urlBackendOfLogin,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(
          { email, password }
        )
      })

    const response = await fetchDataOfUser.json()
    const { message, token, user } = response

    if (fetchDataOfUser.status === 200) {
      setUserCustomer(user)
      setLoggedin(true)
      setNameOfUserLogin(user.firstName)
      console.log(`All Ok. ${message}`)
      // navigate('/home', { replace: false })
    } else {
      setLoggedin(false)
      console.error('all bad !!')
      navigate(-1)
    }
    handleDelete()
  }

  function handleDelete() {
    setEmail('')
    setPassword('')
  }

  function handleReturn() {
    handleDelete()
    navigate('/home', { replace: false })
  }

  function handleButtonLogin() {
    // console.log('Submitiendooooo !!!')
    // console.log({ email, password })
    //  Hacemos el codigo aqui
    // stateCustomersRegisterd.find(customer => {
    //   if (customer.personalDataOfCustomer === parEmail && customer.personalDataOfCustomer.ThePasswordOfCustomer === parPassword) {
    //     return customer
    //   }
    //   setCustomersRegistratedOnLine(customer)
    //   navigate(`/home`, { replace: false })
    // })
  }

  function handleButtonCreateNewCustomer() {
    setMode('login')
    navigate(`/registerOfCustomer`, { replace: false })
  }

  function tooglePassword() {
    const elementInputPassword = document.querySelector('#passwordUserLogin')
    setToogleCheckBox(!toogleCheckBox)

    if (toogleCheckBox === false) {
      elementInputPassword.type = "text"
    } else {
      elementInputPassword.type = "password"
    }
  }


  return (
    <div className="contCentral">
      {isLoggedin &&
        <div className="contMessageLogin">
          <figure className="figImgAvatar">
            {console.log('The user is:  ', userCustomer)}
            <img className="imgAvatar" src={uploadAvatar()} with="100px" alt={'Person Avatar'} />
          </figure>
          <div className="contWelcome">
            <h6 className="titleWillkommen" style={{ color: 'white' }}>
              {`Welcome ${userCustomer.treament + ' ' + userCustomer.firstName + ' ' + userCustomer.lastName}`}
            </h6>
            <div className="contAnimationSpan">
              <span className="textIsLoggend">You are already loggend</span>
            </div>
          </div>
        </div>
      }
      <header className={`headerLogin ${!isLoggedin ? 'colorGreen' : 'colorRed'}`}>
        <h3 className='titleFormularLogin'>{!isLoggedin ? messageOfComponent.titelFormLogin : messageOfComponent.titelFormLogout}</h3>
      </header>

      {!isLoggedin &&
        <div className="contFormLogin">
          <form className="formLogin" onSubmit={(ev) => handleSubmitForm(ev)}>
            <header className='headerFormLogin'>
              <h3 className="titleOfFormular">{messageOfComponent.titleOfFormular}</h3>
            </header>

            <div className="contDataLogIn">
              <div className="contLabel_Input">
                <label htmlFor='emailUserLogin'>Email:<i className="ico"><FcAddressBook /></i></label>
                <input type='email' id="emailUserLogin" placeholder='Your Email account here...' size="30" minLength={6} maxLength={40} required="on"
                  autoComplete='on' value={email} onChange={e => setEmail(e.target.value)} validate='true' />
              </div>
              <div className="contLabel_Input">
                <label htmlFor='passwordUserLogin'>Password:<i className="ico"><FcUnlock /></i></label>
                <input type='password' id="passwordUserLogin" placeholder='Your password account ...' minLength={6} maxLength={24}
                  required="on" value={password} name='passwordOfCustomer' onChange={e => setPassword(e.target.value)}
                  autoComplete='off' />
                <div className="contCheckBox">
                  <label>
                    <input type="checkbox" id="idViewPassword" className="viewPassword" checked={toogleCheckBox} onChange={tooglePassword} />
                  </label>
                </div>
              </div>
            </div>
            <div className="contButtons">
              <Button
                handleButton={handleDelete}
                text={"Delete"}
              />
              <Button
                handleButton={handleButtonLogin}
                text={"Login"}
              />
            </div>

            <ul className="ulOfErrors">
              {errors.map(error => (
                <li key={error} className='liError'>
                  {error}
                </li>
              ))}
            </ul>
          </form>
          <div className="contNewCustormerRegister">
            <header className='headerFormRegisterNewCustomer'>
              <h3 className="titleOfRegisterNewCustomer">{messageOfComponent.titleOfRegisterNewCustomer}</h3>
            </header>
            <div className="contButtonCreateNewCustomer">
              <Button
                handleButton={handleButtonCreateNewCustomer}
                text={messageOfComponent.textCreateNewCustomer}
              />
            </div>
          </div>
        </div>
      }

      {isLoggedin &&
        <div className="contFormLogout">
          <div className="contButtonsLogout">
            <Button
              handleButton={handleReturn}
              text={"Return"}
            />
            <Button
              handleButton={handleButtonLogout}
              text={"Logout"}
            />
          </div>
        </div>
      }
    </div>
  )
}

export default LoginOfCustomer
