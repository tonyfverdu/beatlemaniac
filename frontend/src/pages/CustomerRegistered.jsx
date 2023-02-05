import React, { useEffect, useContext } from 'react'
import { MyScoreContext } from '../context/MyContext.jsx'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'

import '../sass/componentsSass/CustomerRegistered.scss'
import TitelData from '../components/Register/TitelData.jsx'
import LabelData from '../components/Register/LabelData.jsx'


function CustomerRegistered(props) {
  const messageTitelOfRegister = {
    textTitelRegister: 'Registered User',
    subtitelTitelRegisterd: 'Registered User Data',
    titelDataGeneral: ['Customer', 'Address', 'Delivery data'],
    logoBeatles: 'logo2.png',
    textForLoggin: 'not logged in yet?',
    textLogin: 'Login',
    textAccept: 'Accept'
  }
  const { userCustomer, setUserCustomer, setRegistered, isLogin } = useContext(MyScoreContext)
  const navigate = useNavigate()

  // const DataExp = new Date(userCustomer.expirationData)

  async function fetchData(parEmail) {
    const urlBackendGetUser = `http://127.0.0.1:3001/users/userbyemail/${parEmail}`
    const fetchDataOfUser = await fetch(urlBackendGetUser,
      {
        credentials: 'include'
      }
    )

    if (fetchDataOfUser.status === 200) {
      setRegistered(true)
      const response = await fetchDataOfUser.json()
      const { message, user } = response
      console.log('The user is:', user)
      setUserCustomer(user)
      console.log(`All Ok. ${message}`)
    } else {
      console.error('all bad !!')
      // navigate(-1)
    }
  }

  useEffect(() => {
    fetchData(userCustomer.email)
  }, [])

  function handleGoLogin() {
    navigate('/loginCustomer', { replace: false })
  }
  function handleButtonAccept() {
    // setRegistered(true)
    navigate(`/home`, { replace: false })
  }

  return (
    <div className="contUserRegistered">
      <header className='headerTitelRegister'>
        <h3 className='titelFormularRegisterCustomer'>{messageTitelOfRegister.textTitelRegister}</h3>
      </header>
      <div className="contDataRegisterd">
        <div className="contComponentsData">
          <header className='headerSubtitelTitelRegister'>
            <h3 className='subtitelRegisterd'>{messageTitelOfRegister.subtitelTitelRegisterd}</h3>
          </header>
          {!isLogin &&
            <button type="submit" className="contMessageLogin" onClick={handleGoLogin} >
              <figure className="figureLogoBeatles">
                <img className="logoBeatles" src={`./src/images/theBeatles/${messageTitelOfRegister.logoBeatles}`} alt={`Logo of the Beatles`} />
              </figure>
              <p className="messageLogin">{messageTitelOfRegister.textForLoggin}</p>
            </button>
          }
          <section className="sectionDataRegisterd">
            <div className="contData">
              <figure className="figureAvatar">
                <img className="imgAvatar" src={userCustomer.avatar_url} alt={`Avatar of user`} />
              </figure>
              <div className="contPersonalData">
                {console.log(userCustomer.avatar_url)}
                <div className="contOfDataPers firstPersonalData">
                  <div className="contRowData">
                    <TitelData
                      titel={'Personal Data'}
                    />
                    <span id="treament">
                      <LabelData
                        label={''}
                        data={userCustomer.treament}
                      />
                    </span>
                    <span id="name">
                      <LabelData
                        label={'Name:'}
                        data={userCustomer.firstName + ' ' + userCustomer.lastName}
                      />
                    </span>
                    <span id="age">
                      <LabelData
                        label={'Age:'}
                        data={userCustomer.age}
                      />
                    </span>
                  </div>
                  <div className="contRowData">
                    <span id="id">
                      <LabelData
                        label={'Id:'}
                        data={userCustomer._id}
                      />
                    </span>
                    <span id="regData">
                      <LabelData
                        label={'Registration Date:'}
                        data={userCustomer.registrationDate}
                      />
                    </span>

                  </div>
                  <div className="contRowData">
                    <span id="phone">
                      <LabelData
                        label={'Phone:'}
                        data={userCustomer.phoneNumber}
                      />
                    </span>
                    <span id="email">
                      <LabelData
                        label={'Email:'}
                        data={userCustomer.email}
                      />
                    </span>

                  </div>
                </div>
              </div>
            </div>
            <div className="contData">
              <div className="contPersonalData">
                <div className="contOfDataPers">
                  <div className="contRowData">
                    <TitelData
                      titel={'Address (delivery)'}
                    />
                    <span id="street">
                      <LabelData
                        label={'Street:'}
                        data={userCustomer.street}
                      />
                    </span>
                    <span id="n°">
                      <LabelData
                        label={'N°:'}
                        data={userCustomer.streetNumber}
                      />
                    </span>
                    <span id="postCode">
                      <LabelData
                        label={'Post Code:'}
                        data={userCustomer.post_ZipCode}
                      />
                    </span>
                  </div>
                  <div className="contRowData">
                    <span id="city">
                      <LabelData
                        label={'City:'}
                        data={userCustomer.city}
                      />
                    </span>
                    <span id="state">
                      <LabelData
                        label={'State:'}
                        data={userCustomer.state_Province}
                      />
                    </span>
                    <span id="country">
                      <LabelData
                        label={'Country:'}
                        data={userCustomer.country}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="contData">
              <div className="contPersonalData">
                <div className="contOfDataPers">
                  <div className="contRowData">
                    <TitelData
                      titel={'Payment method'} />
                    <span id="typePay">
                      <LabelData
                        label={'Type Pay:'}
                        data={userCustomer.cardType}
                      />
                    </span>
                    <span id="holder">
                      <LabelData
                        label={'Holder:'}
                        data={userCustomer.cardHolderFirstName + ' ' + userCustomer.cardHolderLastName}
                      />
                    </span>
                  </div>
                  <div className="contRowData">
                    <span id="cardNumber">
                      <LabelData
                        label={'Card number:'}
                        data={'**** - **** - **** - **** - **** - **' + userCustomer.cardNumber.substring(27)}
                      />
                    </span>
                    <span id="dateExp">
                      <LabelData
                        label={'Date expiration:'}
                        data={userCustomer.expirationData}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="containerButtons">
          <Button
            handleButton={(ev) => handleGoLogin(ev)}
            text={messageTitelOfRegister.textLogin}
          />
          <Button
            handleButton={handleButtonAccept}
            text={messageTitelOfRegister.textAccept}
          />
        </div>
      </div>
    </div >
  )
}

export default CustomerRegistered