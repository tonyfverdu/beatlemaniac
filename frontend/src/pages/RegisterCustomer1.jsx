import React, { useEffect, useContext } from 'react'
import { MyScoreContext } from '../context/MyContext.jsx'

import { useNavigate } from "react-router-dom"

import Button from '../components/Button.jsx'
import Swal from 'sweetalert2'

import FormRegTop from '../components/FormRegister/FormRegTop.jsx'
import FormRegHalf from '../components/FormRegister/FormRegHalf.jsx'

import ValidatePassword from '../functions/ValidatePassword.js'

import '../sass/componentsSass/RegisterCustomer1.scss'

let timerInterval = 0
function windowsAlertProcessBy(parMessage) {
  Swal.fire({
    title: parMessage,
    html: 'I will close in <b>5</b> second.',
    timer: 5000,
    timerProgressBar: true,
    width: 400,
    position: 'center',
    padding: '1.2em',
    color: 'rgb(9, 9, 9)',
    background: 'linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)), url("../src/images/thebeatles/BeatlesPortada");',
    backdrop: `
      rgba(0,0,123,0.4)
      url("../src/images/theBeatles/beatlemaniac2.jpg")
      left top
      no-repeat
    `,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
    icon: 'error',
    imageUrl: 'https://unsplash.it/200/100',
    imageWidth: 200,
    imageHeight: 100,
    imageAlt: 'Custom image',
    showCloseButton: true,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
}


function RegisterCustomer1() {
  const messageFormRegister = {
    titelFormular: 'Registration Form',
    subtitelCreateAcount: 'Create Account',
    deleteButton: 'Delete',
    submitData: 'Submit'
  }
  const { iniUserCustomer, userCustomer, setUserCustomer, isEqual, imgPreview,
    registered, setRegistered } = useContext(MyScoreContext)
  const navigate = useNavigate()

  useEffect(() => {
    ValidatePassword()
    // uploadAvatar()
  }, [userCustomer.password, registered])

  function uploadAvatar() {
    const imgAvatarURL = userCustomer.avatar_url
    return imgAvatarURL
  }

  function handleButtonSubmit() {
    if (!isEqual) {
      windowsAlertProcessBy('Error: There is an error in the confirm of the password !!')
      console.error('Error: There is an error in the confirm of the password !!')
    }
  }

  function handleButtonDeleteData(ev) {
    setUserCustomer(iniUserCustomer)
  }

  async function handleSubmitForm(ev) {
    ev.preventDefault()
    const urlBackendRegister = 'http://127.0.0.1:3001/users/register'

    if (isEqual) {
      const fetchDataOfUser = await fetch(urlBackendRegister,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ ...userCustomer, avatar: imgPreview })
        }
      )
      console.log('fetchDataOfUser.status:  ', fetchDataOfUser.status)
      const response = await fetchDataOfUser.json()
      const { message, user, cart } = response
      console.log('response:  ', response)

      if (fetchDataOfUser.status === 200) {
        setRegistered(true)
        setUserCustomer(user)
        // fetchData()
        console.log(`All Ok. ${message}`)
        navigate('/customerRegistered', { replace: false })
      } else {
        console.error('all bad !!')
        // navigate(-1)
      }
    } else {
      console.error('The password is not equal to confirm !!')
      windowsAlertProcessBy('The password is not equal to confirm !!')
    }
  }


  return (
    <div className='contFormularRegister'>
      <header className='headerTitelRegister'>
        <h3 className='titelFormularRegisterCustomer'>{messageFormRegister.titelFormular}</h3>
        {registered &&
          <div className="contWelcome">
            <h6 className="titelWillkommen" style={{ color: 'white' }}>{`Welcome ${userCustomer.treament + ' ' + userCustomer.firstName + ' ' + userCustomer.firstName}`}</h6>
            <span>'You are already registered'</span>
            <figure className="figImgAvatar">
              {console.log('The user is:  ', userCustomer)}
              <img className="imgAvatar" src={uploadAvatar()} with="100px" alt={'Person Avatar'} />
            </figure>
          </div>
        }
      </header>
      <div className="contForm">
        <form className="formRegister" onSubmit={(ev) => handleSubmitForm(ev)}>
          <header className='headerSubtitelCreateAccount'>
            <h3 className='subtitelCreateAccount'>{messageFormRegister.subtitelCreateAcount}</h3>
          </header>

          <FormRegTop />
          <FormRegHalf />

          <div className="containerButtons">
            <Button
              handleButton={(ev) => handleButtonDeleteData(ev)}
              text={messageFormRegister.deleteButton}
            />
            <Button
              handleButton={handleButtonSubmit}
              text={messageFormRegister.submitData}
            />
          </div>

        </form>
      </div>
    </div>
  )
}

export default RegisterCustomer1