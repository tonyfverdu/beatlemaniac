import React from 'react'
import '../../sass/componentsSass/Orders/CategoryDataEditable.scss'

function CategoryDataEditable({ titleDataCategory, arrayRow, userDataToModify, setUserDataToModify }) {
function handleUserModifyData(ev) {
  const { name, value } = ev.target
  setUserDataToModify({ ...userDataToModify, [name]: value })
}


return (
  <div className="contCategoryDataEdited">
    <header className="headerDataGeneral">
      <h5 className="titleDataGeneral">{titleDataCategory}</h5>
    </header>
    {
      arrayRow.map((row, num) => {
        return (
          <div className="contRow" key={num}>
            <div className="contLIData">
              {
                row.arrayTitleData.map((element, index) => {
                  return (
                    <li className={`LI_OfDataRegister ${element.titleOfLi === 'Street:'
                      ? 'street'
                      : element.titleOfLi === 'N°:'
                        ? 'numStreet'
                        : element.titleOfLi === 'City:'
                          ? 'city'
                          : element.titleOfLi === 'State/Prov:'
                            ? 'stateProv'
                            : element.titleOfLi === 'Zip Code:'
                              ? 'zipCode'
                              : element.titleOfLi === 'Country:'
                                ? 'country'
                                : element.titleOfLi === 'Card:'
                                  ? 'card'
                                  : element.titleOfLi === 'Holder:'
                                    ? 'holder'
                                    : element.titleOfLi === 'Card N°:'
                                      ? 'cardNumber'
                                      : element.titleOfLi === 'Exp. Date:'
                                        ? 'expData'
                                        : ''
                      }`} key={index} >
                      <span className='titleOfLi' >{element.titleOfLi}</span>
                      {
                        element.titleOfLi === 'Card:'
                          ? <select name="cardType" id="typePay" className="selectTypePay"
                            checked={userDataToModify.cardType} onChange={(ev) => handleUserModifyData(ev)}>
                            <option value={"American Express"} >American Express</option>
                            <option value={"Master Card"}>Master Card</option>
                            <option value={"VISA card"}>Visa Card</option>
                            <option value={"Giropay"}>Giropay</option>
                            <option value={"PayPal"}>PayPal</option>
                          </select>
                          : element.titleOfLi === 'Exp. Date:'
                            ? <input id="expirationData" type="date" className="inputText" value={userDataToModify.expirationData}
                              onChange={(ev) => handleUserModifyData(ev)} name="expirationData"
                              placeholder={element.dataOfLi} required />
                            : <input type="text" className='inputText' value={userDataToModify.dataOfLi} placeholder={element.dataOfLi}
                              onChange={(ev) => handleUserModifyData(ev)} autoComplete='on' required
                              name={`${element.titleOfLi === 'Street:' ? 'street'
                                : element.titleOfLi === 'N°:' ? 'streetNumber'
                                  : element.titleOfLi === 'City:' ? 'city'
                                    : element.titleOfLi === 'State/Prov:' ? 'state_Province'
                                      : element.titleOfLi === 'Zip Code:' ? 'post_ZipCode'
                                        : element.titleOfLi === 'Country:' ? 'country'
                                          : element.titleOfLi === 'Holder:' ? 'cardHolderFirstName'
                                            : element.titleOfLi === 'Card N°:' ? 'cardNumber'
                                              : ''
                                }`}
                            />
                      }
                    </li>
                  )
                })
              }
            </div>
          </div>
        )
      })
    }
  </div>
)
}

export default CategoryDataEditable
