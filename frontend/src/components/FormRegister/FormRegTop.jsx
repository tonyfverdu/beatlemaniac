import React, { useState, useEffect, useContext } from 'react'
import { MyScoreContext } from '../../context/MyContext.jsx'

import BoxSelectAvatar from '../Avatar/BoxSelectAvatar.jsx'

import { MdAlternateEmail } from 'react-icons/md'
import { FcPrivacy } from 'react-icons/fc'
import { RiLockPasswordFill } from 'react-icons/ri'
import { FaPhoneSquareAlt } from 'react-icons/fa'

import '../../sass/componentsSass/FormRegTop.scss'


export default function FormRegTop() {
  const messageFormularRegisterCustomer = {
    customerTitel: 'Customer:',
    Mr: 'Mr.',
    Mrs: 'Mrs.',
    labelFirstName: 'First name:',
    placeHolderFirstName: 'Please. Enter your first name ...',
    labelLastName: 'Last name:',
    placeHolderLastName: 'Please. Enter your last name ...',
    labelAge: 'Age:',
    labelPhoneNumber: 'Phone number:',
    labelEmail: 'Email:',
    placeHolderEmail: 'Please. Enter your email ...',
    labelPassword: 'Password:',
    placeHolderPassport: 'Please. Enter your password ...',
    labelConfirmPassword: 'Confirm:',
    placeHolderConfirmPassport: 'Please. Confirm your password ...'
  }
  const [toogleCheckBoxA, setToogleCheckBoxA] = useState(false)
  const [toogleCheckBoxB, setToogleCheckBoxB] = useState(false)
  const { userCustomer, setUserCustomer, passwordConfirm, setPasswordConfirm, isPasswordOk } = useContext(MyScoreContext)

  function handleConfirmPassword(ev) {
    setPasswordConfirm(ev.target.value)
  }

  useEffect(() => {
    isPasswordOk(userCustomer.password, passwordConfirm)
  }, [passwordConfirm])

  function handleUserDatas(ev) {
    const { name, value } = ev.target
    setUserCustomer({ ...userCustomer, [name]: value })
  }

  function tooglePassword() {
    const elementInputPassword = document.querySelector('#password')
    setToogleCheckBoxA(!toogleCheckBoxA)

    if (toogleCheckBoxA === false) {
      elementInputPassword.type = "text"
    } else {
      elementInputPassword.type = "password"
    }
  }

  function tooglePasswordConf() {
    const elementInputPassword = document.querySelector('#confirmPassword')
    setToogleCheckBoxB(!toogleCheckBoxB)

    if (toogleCheckBoxB === false) {
      elementInputPassword.type = "text"
    } else {
      elementInputPassword.type = "password"
    }
  }

  return (
    <>
      <div className="containerRegDataTop">
        <header className='headerOfCreateAccount'>
          <h3 className='titelOfCreateAccount'>{messageFormularRegisterCustomer.customerTitel}</h3>
        </header>

        <div className="containerNameOfCustomer">
          <select className='selectTratament' name="treament" value={userCustomer.treament} onChange={(ev) => handleUserDatas(ev)} >
            <option value={'Mr.'}>{messageFormularRegisterCustomer.Mr}</option>
            <option value={'Mrs.'}>{messageFormularRegisterCustomer.Mrs}</option>
          </select>
          <div className="containerInputLabel">
            <label className="labelInput" htmlFor='firstName'>{messageFormularRegisterCustomer.labelFirstName}</label>
            <input id="firstName" type="text" className="inputText" value={userCustomer.firstName} onChange={(ev) => handleUserDatas(ev)} name="firstName"
              placeholder={messageFormularRegisterCustomer.placeHolderFirstName} maxLength={20} minLength={4} autoComplete='on' required />
          </div>

          <div className="containerInputLabel">
            <label className="labelInput" htmlFor='lastName'>{messageFormularRegisterCustomer.labelLastName}</label>
            <input id="lastName" type="text" className="inputText" value={userCustomer.lastName} onChange={(ev) => handleUserDatas(ev)} name="lastName"
              placeholder={messageFormularRegisterCustomer.placeHolderLastName} maxLength={20} minLength={4} autoComplete='on' required />
          </div>

          <div className="containerInputLabel">
            <label className="labelInput" htmlFor='age'>{messageFormularRegisterCustomer.labelAge}</label>
            <input id="age" type="number" className="inputText" value={userCustomer.age} onChange={(ev) => handleUserDatas(ev)} name="age"
              maxLength={3} min="1" />
          </div>

        </div>
      </div>
      <div className="containerDataOfRegister_2">
        <div className="containerInputLabel">
          <label className="labelInput" htmlFor='phoneNumber'>{messageFormularRegisterCustomer.labelPhoneNumber}</label>
          <i><FaPhoneSquareAlt /></i>
          <input id='phoneNumber' type="tel" className="inputText" value={userCustomer.phoneNumber} onChange={(ev) => handleUserDatas(ev)} name="phoneNumber"
            placeholder={messageFormularRegisterCustomer.placeHolderPhoneNumber} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" maxLength={15} minLength={8} autoComplete='on' required />
        </div>

        <div className="containerEmail_Password">
          <div className="containerInputLabel">
            <label className="labelInput" htmlFor='eMail'>{messageFormularRegisterCustomer.labelEmail}</label>
            <i><MdAlternateEmail /></i>
            <input id="eMail" type="email" className="inputText" value={userCustomer.email} onChange={(ev) => handleUserDatas(ev)}
              name="email" placeholder={messageFormularRegisterCustomer.placeHolderEmail} maxLength={30} minLength={4} autoComplete='on' required />
          </div>

          <div className="containerInputLabel">
            <label className="labelInput" htmlFor='password'>{messageFormularRegisterCustomer.labelPassword}</label>
            <i><FcPrivacy /></i>
            <input id="password" type="password" className="inputText" value={userCustomer.password} onChange={(ev) => handleUserDatas(ev)} name="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              placeholder={messageFormularRegisterCustomer.placeHolderPassport} maxLength={20} minLength={4} required />
            <div className="containerCheckbox">
              <label>
                <input type="checkbox" id="idViewPassword" className="viewPassword" checked={toogleCheckBoxA} onChange={tooglePassword} />
              </label>
            </div>
          </div>

          <div className="containerInputLabel">
            <label className="labelInput" htmlFor='confirmPassword'>{messageFormularRegisterCustomer.labelConfirmPassword}</label>
            <i><RiLockPasswordFill /></i>
            <input id="confirmPassword" type="password" className="inputText" value={passwordConfirm} onChange={(ev) => handleConfirmPassword(ev)}
              name="confirmPassword" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              placeholder={messageFormularRegisterCustomer.placeHolderConfirmPassport} maxLength={20} minLength={4} required />
            <div className="containerCheckbox">
              <label>
                <input type="checkbox" id="idViewPasswordConf" className="viewPassword" checked={toogleCheckBoxB} onChange={tooglePasswordConf} />
              </label>
            </div>
          </div>
        </div>

        <div id='message' className='regelOfPassword'>
          <h3 className='messageOfRegelOfPassword'>The password must contain:</h3>
          <p id="letter" className="invalid">A <span>lowercase</span> letter</p>
          <p id="capital" className="invalid">A <span>capital (uppercase)</span> letter</p>
          <p id="number" className="invalid">A <span>number</span></p>
          <p id="length" className="invalid">Minimum <span>8 characters</span></p>
          <p id="special" className="invalid">Minimum <span>1 special character</span></p>
        </div>

        <div className="containerOfSelectAvatar">
          <BoxSelectAvatar
          />
        </div>
      </div>
    </>
  )
}

