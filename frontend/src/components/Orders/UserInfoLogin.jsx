import React, { useState, useContext } from 'react'
import Button from '../Button.jsx'
import CategoryDataEdited from './CategoryDataEdited.jsx'
import CategoryDataEditable from './CategoryDataEditable.jsx'
import AvatarFigure from '../Avatar/AvatarFigure.jsx'
import Orders from './Orders.jsx'
import { MyScoreContext } from '../../context/MyContext.jsx'
import '../../sass/componentsSass/Orders/UserInfoLogin.scss'


function UserInfoLogin() {
  const messageTitelOfUserCustomer = {
    textTitelCustomer: ['User Registration Information', 'Your Orders'],
    titelDataGeneral: ['Internal Registry Data', 'Customer Data', 'Delivery Data', 'Payment Method'],
    textUpdate: 'Update',
    textAccept: 'Accept',
    textDelete: 'Delete',
    textSubmit: 'Submit'
  }
  const [editable, setEditable] = useState(false)
  const { userCustomer, setUserCustomer } = useContext(MyScoreContext)
  const [userDataToModify, setUserDataToModify] = useState(userCustomer)
  const [successUpdate, setSuccessUpdate] = useState(false)

  const dataEdited = [
    {
      titleDataCategory: messageTitelOfUserCustomer.titelDataGeneral[0],
      arrayRow: [
        {
          arrayTitleData: [
            { titleOfLi: 'Id:', dataOfLi: userCustomer._id },
            { titleOfLi: 'Date register', dataOfLi: userCustomer.registrationDate }]
        }
      ]
    },
    {
      titleDataCategory: messageTitelOfUserCustomer.titelDataGeneral[1],
      arrayRow: [
        {
          arrayTitleData: [
            { titleOfLi: 'Treament:', dataOfLi: userCustomer.treament },
            { titleOfLi: 'First name:', dataOfLi: userCustomer.firstName },
            { titleOfLi: 'Last name:', dataOfLi: userCustomer.lastName },
            { titleOfLi: 'Age:', dataOfLi: userCustomer.age }
          ]
        },
        {
          arrayTitleData: [
            { titleOfLi: 'Phone number:', dataOfLi: userCustomer.phoneNumber },
            { titleOfLi: 'Email:', dataOfLi: userCustomer.email }
          ]
        }
      ]
    },
    {
      titleDataCategory: messageTitelOfUserCustomer.titelDataGeneral[2],
      arrayRow: [
        {
          arrayTitleData: [
            { titleOfLi: 'Street:', dataOfLi: userCustomer.street },
            { titleOfLi: 'N°:', dataOfLi: userCustomer.streetNumber }

          ]
        },
        {
          arrayTitleData: [
            { titleOfLi: 'City:', dataOfLi: userCustomer.city },
            { titleOfLi: 'State/Prov:', dataOfLi: userCustomer.state_Province },
            { titleOfLi: 'Zip Code:', dataOfLi: userCustomer.post_ZipCode },
            { titleOfLi: 'Country:', dataOfLi: userCustomer.country }
          ]
        }
      ]
    },
    {
      titleDataCategory: messageTitelOfUserCustomer.titelDataGeneral[3],
      arrayRow: [
        {
          arrayTitleData: [
            { titleOfLi: 'Card:', dataOfLi: userCustomer.cardType },
            { titleOfLi: 'Holder:', dataOfLi: `${userCustomer.cardHolderFirstName} ${userCustomer.cardHolderLastName}` },
            { titleOfLi: 'Card N°:', dataOfLi: '- ** - ' + userCustomer.cardNumber.substring(27) },
            { titleOfLi: 'Exp. Date:', dataOfLi: userCustomer.expirationData.toString().substring(0, 10) }
          ]
        }
      ]
    }
  ]
  const [dropdownToggled, setDropdownToggled] = useState(false)
  const [dropdownToggled2, setDropdownToggled2] = useState(false)

  async function fechtPATCH_ToUser() {
    const urlBackendUpdate = 'http://127.0.0.1:3001/users/user'

    const fetchDataPATCHOfUser = await fetch(urlBackendUpdate,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ userDataToModify })
      }
    )
    console.log('fetchDataPATCHOfUser.status:  ', fetchDataPATCHOfUser.status)
    const response = await fetchDataPATCHOfUser.json()
    const { message, user } = response

    if (fetchDataPATCHOfUser.status === 200) {
      setUserCustomer(user)
      setSuccessUpdate(!successUpdate)
      console.log(`All Ok. ${message}`)
    } else {
      console.error('all bad !!')
      // navigate(-1)
    }
  }

  async function handleButtonSubmit(ev) {
    fechtPATCH_ToUser(ev)
    setEditable(!editable)
  }

  function uploadAvatar() {
    const imgAvatarURL = userCustomer.avatar_url
    return imgAvatarURL
  }
  function handleButtonUpload() {
    setEditable(!editable)
    setSuccessUpdate(false)
  }

  function handleButtonAccept(ev) {
    setSuccessUpdate(false)
    setDropdownToggled(false)
  }

  function handleAccordion() {
    setDropdownToggled(!dropdownToggled)
  }
  function handleAccordion2() {
    setDropdownToggled2(!dropdownToggled2)
  }

  return (
    <div className="contOutRegister">
      <div className="contButtomAcc">
        <button className={`accordion ${dropdownToggled ? 'active' : 'inactive'}`} onClick={(handleAccordion)}>
          <header className="headerTitelRegister">
            <h3 className="textTitelRegister">{messageTitelOfUserCustomer.textTitelCustomer[0]}</h3>
          </header>
        </button>
        <button className={`accordion ${dropdownToggled2 ? 'active' : 'inactive'}`} onClick={(handleAccordion2)}>
          <header className="headerTitelRegister">
            <h3 className="textTitelRegister">{messageTitelOfUserCustomer.textTitelCustomer[1]}</h3>
          </header>
        </button>
      </div>
      {
        dropdownToggled &&
        <main className="contShowRegisterData">
          <ul className="UlDataOfCustomer">
            <AvatarFigure
              avatarURL={uploadAvatar()}
              nameAvatar={userCustomer.firstName}
            />
            <div className="contDataGeneral">
              <CategoryDataEdited
                titleDataCategory={dataEdited[0].titleDataCategory}
                arrayRow={dataEdited[0].arrayRow}
              />
              <CategoryDataEdited
                titleDataCategory={dataEdited[1].titleDataCategory}
                arrayRow={dataEdited[1].arrayRow}
              />
              {!editable
                ? <>
                  <CategoryDataEdited
                    titleDataCategory={dataEdited[2].titleDataCategory}
                    arrayRow={dataEdited[2].arrayRow}
                  />
                  <CategoryDataEdited
                    titleDataCategory={dataEdited[3].titleDataCategory}
                    arrayRow={dataEdited[3].arrayRow}
                  />
                </>
                : <>
                  <CategoryDataEditable
                    titleDataCategory={dataEdited[2].titleDataCategory}
                    arrayRow={dataEdited[2].arrayRow}
                    userDataToModify={userDataToModify}
                    setUserDataToModify={setUserDataToModify}
                  />
                  <CategoryDataEditable
                    titleDataCategory={dataEdited[3].titleDataCategory}
                    arrayRow={dataEdited[3].arrayRow}
                    userDataToModify={userDataToModify}
                    setUserDataToModify={setUserDataToModify}
                  />
                </>
              }
            </div>
          </ul>

          <div className="contGruppeButtons">
            {!editable ? <>
              {successUpdate &&
                <p className="SuccessMessage">Data successfully modified</p>
              }
              <Button
                handleButton={handleButtonUpload}
                text={messageTitelOfUserCustomer.textUpdate}
              />
              <Button
                handleButton={handleButtonAccept}
                text={messageTitelOfUserCustomer.textAccept}
              />
            </>
              : <>
                <Button
                  handleButton={handleButtonUpload}
                  text={messageTitelOfUserCustomer.textDelete}
                />
                <Button
                  handleButton={handleButtonSubmit}
                  text={messageTitelOfUserCustomer.textSubmit}
                />
              </>
            }
          </div>
        </main>
      }
      {
        dropdownToggled2 &&
        <div className="contInfoOrders">
          <Orders
            dropdownToggled2={dropdownToggled2}
            setDropdownToggled2={setDropdownToggled2}
          />
        </div>
      }
    </div>
  )
}

export default UserInfoLogin

