import React from 'react'
import '../../sass/componentsSass/Orders/CategoryDataEdited.scss'

function CategoryDataEdited({ titleDataCategory, arrayRow }) {
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
                      <li className={`LI_OfDataRegister ${element.titleOfLi === 'Treament:'
                        ? 'treament'
                        : element.titleOfLi === 'First name:' || element.titleOfLi === 'Last name:'
                          ? 'anyName'
                          : element.titleOfLi === 'Age:'
                            ? 'age'
                            : element.titleOfLi === 'Phone number:' || element.titleOfLi === 'Email:'
                              ? 'phoneEmail'
                              : element.titleOfLi === 'Street:'
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
                        <span className="dataOfLi ">{element.dataOfLi}</span>
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

export default CategoryDataEdited