import React, { useState, useContext } from 'react'
import { MyScoreContext } from '../../context/MyContext.jsx'

import '../../sass/componentsSass/FormRegHalf.scss'


export default function FormRegHalf() {
  const messageFormularRegisterAddress = {
    customerAddress: 'Address',
    labelStreet: 'Street:',
    placeHolderStreet: 'Please. Enter your street',
    labelOfStreetNumber: 'N°:',
    labelCity: 'City:',
    placeHolderCity: 'Hamburg',
    labelState_Province: 'State:',
    placeholderState_Province: 'Hamburg',
    labelPost_ZipCode: 'Post/Zip Code:',
    labelCountry: 'Country:',
    placeholderCountry: 'Deutschland'
  }
  const messageFormularDataOfPay = {
    titelFormPayment: 'Data of pay',
    labelCardHolder: 'Card Holder:',
    labelFirstName: 'First name:',
    labelLastName: 'Last name:',
    labelHolderType: 'Type Pay:',
    placeholderCardHolderFirstName: '',
    placeholderCardHolderLastName: '',
    labelCardNumber: 'Card number:',
    placeholderCardNumber: 'DE31-1345-6789-2345-0077-12',
    labelExpirationData: 'Data expiration:',
    placeholderExpirationData: '',
    labelSecurityCode: 'Security Code:',
    placeholderSecurityCode: '12345',
    textAcceptpay: 'Accept pay?'
  }
  const [payAccept, setPayAccept] = useState(false)
  const { userCustomer, setUserCustomer } = useContext(MyScoreContext)

  function handlePayAccept(ev) {
    setPayAccept(!payAccept)
    let value = ""
    const { name } = ev.target
    if (!payAccept) {
      value = 'on'
    } else if (payAccept) {
      value = "off"
    }
    setUserCustomer({ ...userCustomer, [name]: value })
  }
  function handleUserDatas(ev) {
    const { name, value } = ev.target
    setUserCustomer({ ...userCustomer, [name]: value })
  }

  return (
    <>
      <div className="containerRegDataHalf">
        <header className='headerOfCreateAccount'>
          <h3 className='titelOfCreateAccount'>{messageFormularRegisterAddress.customerAddress}</h3>
        </header>
        <div className="dataOfAddress">
          <div className="container2Fields">
            <div className="containerInputLabel">
              <label className="labelInput" htmlFor='streetDelivery'>{messageFormularRegisterAddress.labelStreet}</label>
              <input id="streetDelivery" type="text" className="inputText inputStreet" value={userCustomer.street}
               onChange={(ev) => handleUserDatas(ev)} name="street"
                placeholder={messageFormularRegisterAddress.placeHolderStreet} maxLength={50} minLength={3} autoComplete='on' required />
            </div>
            <div className="containerInputLabel">
              <label className="labelInput" htmlFor='streetNumberDelivery'>{messageFormularRegisterAddress.labelOfStreetNumber}</label>
              <input id="streetNumberDelivery" type="number" className="inputText inputNumberStreet" value={userCustomer.streetNumber} onChange={(ev) => handleUserDatas(ev)} name="streetNumber"
                maxLength={5} minLength={0} autoComplete='on' />
            </div>
          </div>

          <div className="container2Fields">
            <div className="containerInputLabel">
              <label className="labelInput" htmlFor='cityOfDelivery'>{messageFormularRegisterAddress.labelCity}</label>
              <input id="cityOfDelivery" type="text" className="inputText inputCity" value={userCustomer.city} onChange={(ev) => handleUserDatas(ev)} name="city"
                placeholder={messageFormularRegisterAddress.placeHolderCity} maxLength={20} minLength={3} autoComplete='on' required />
            </div>
            <div className="containerInputLabel">
              <label className="labelInput" htmlFor='state_ProvinceDelivery'>{messageFormularRegisterAddress.labelState_Province}</label>
              <input id="state_ProvinceDelivery" type="text" className="inputText inputState" value={userCustomer.state_Province} onChange={(ev) => handleUserDatas(ev)} name="state_Province"
                placeholder={messageFormularRegisterAddress.placeholderState_Province} maxLength={20} minLength={3} autoComplete='on' required />
            </div>
            <div className="containerInputLabel">
              <label className="labelInput postCode" htmlFor='post_ZipCodeDelivery'>{messageFormularRegisterAddress.labelPost_ZipCode}</label>
              <input id="post_ZipCodeDelivery" type="number" className="inputText inputZip" value={userCustomer.post_ZipCode} onChange={(ev) => handleUserDatas(ev)} name="post_ZipCode"
                maxLength={5} minLength={1} autoComplete='on' required />
            </div>
            <div className="containerInputLabel">
              <label className="labelInput" htmlFor='countryrDelivery'>{messageFormularRegisterAddress.labelCountry}</label>
              <input id="countryrDelivery'" type="text" className="inputText inputCountry" value={userCustomer.country} onChange={(ev) => handleUserDatas(ev)} name="country"
                placeholder={messageFormularRegisterAddress.placeholderCountry} maxLength={20} minLength={3} autoComplete='on' required />
            </div>
          </div>
        </div>
      </div>

      <div className="dataOfPay">
        <header className='headerSubtitelFormPay'>
          <h3 className='titelSubtitelFormPay'>{messageFormularDataOfPay.titelFormPayment}</h3>
        </header>
        <div className="containerCreditDebitCard">
          <div className="container3Fields">
            <label className="labelHolder" htmlFor=''>{messageFormularDataOfPay.labelCardHolder}</label>
            <div className="fullname">
              <div className="container2Fields">
                <div className="containerInputLabel">
                  <label className="labelInput" htmlFor='firstNameHolder'>{messageFormularDataOfPay.labelFirstName}</label>
                  <input id="firstNameHolder" type="text" className="inputText inputFirstNameHolder" value={userCustomer.cardHolderFirstName} onChange={(ev) => { handleUserDatas(ev) }} name='cardHolderFirstName'
                    placeholder={messageFormularDataOfPay.placeholderCardHolderFirstName} maxLength={30} required />
                </div>
                <div className="containerInputLabel">
                  <label className="labelInput" htmlFor='lastNameHolder'>{messageFormularDataOfPay.labelLastName}</label>
                  <input id="lastNameHolder" type="text" className="inputText inputLastNameHolder" value={userCustomer.cardHolderLastName} onChange={(ev) => handleUserDatas(ev)} name='cardHolderLastName'
                    placeholder={messageFormularDataOfPay.placeholderCardHolderLastName} maxLength={30} required />
                </div>
              </div>
            </div>
            <div className="containerTypePay">
              <div className="containerInputLabel">
                <label className="labelInput" htmlFor='typePay'>{messageFormularDataOfPay.labelHolderType}</label>
                <select name="cardType" id="typePay" className="selectTypePay" checked={userCustomer.cardType} onChange={(ev) => handleUserDatas(ev)}>
                  <option value={"American Express"} >American Express</option>
                  <option value={"Master Card"}>Master Card</option>
                  <option value={"VISA card"}>Visa Card</option>
                  <option value={"Giropay"}>Giropay</option>
                  <option value={"PayPal"}>PayPal</option>
                </select>
              </div>
            </div>
          </div>

          <div className="container1Field">
            <div className="containerInputLabel">
              <label className="labelInput" htmlFor='cardNumber'>{messageFormularDataOfPay.labelCardNumber}</label>
              <input id="cardNumber" type="text" className="inputText" value={userCustomer.cardNumber} onChange={(ev) => handleUserDatas(ev)} name="cardNumber"
                placeholder={messageFormularDataOfPay.placeholderCardNumber} maxLength={28} minLength={20} required />
            </div>
            <div className="containerInputLabel">
              <label className="labelInput" htmlFor='expirationData'>{messageFormularDataOfPay.labelExpirationData}</label>
              <input id="expirationData" type="date" className="inputText" value={userCustomer.expirationData} onChange={(ev) => handleUserDatas(ev)} name="expirationData"
                placeholder={messageFormularDataOfPay.placeholderExpirationData} required />
            </div>
            <div className="container1Field securityCode">
              <div className="containerInputLabel">
                <label className="labelInput" htmlFor='securityCode'>{messageFormularDataOfPay.labelSecurityCode}</label>
                <input id="securityCode" type="password" className="inputText" value={userCustomer.securityCode} onChange={(ev) => handleUserDatas(ev)} name="securityCode"
                  placeholder={messageFormularDataOfPay.placeholderSecurityCode} maxLength={5} minLength={5} required />
              </div>
            </div>
            <div className="containerInputLabel acceptConditions">
              <div className="containerInputLabel">
                <input id="acceptPay" type="checkbox" className="inputText" checked={payAccept} onChange={(ev) => handlePayAccept(ev)} name="acceptPay" required />
                <label className="labelInput" htmlFor='acceptPay'>{messageFormularDataOfPay.textAcceptpay}</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <figure className="figureImageCreditCard">
        <span className="textAccept">We accept:</span>
        <img className='imageCardCreditst' src={`../../src/images/CreditDebitCards.png`} alt={'Image of Credit Cards'} />
      </figure>
    </>
  )
}