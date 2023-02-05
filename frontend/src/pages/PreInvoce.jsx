import React, { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import { useReactToPrint } from 'react-to-print'
import { MyScoreContext } from '../context/MyContext.jsx'
import Table from 'react-bootstrap/Table'
import Button from '../components/Button.jsx'
// import PrintInvoce from '../components/Orders/PrintInvoce.jsx'

import '../sass/componentsSass/Orders/PreInvoce.scss'


const PreInvoce = () => {
  const messagePreInvoce = {
    titelOfOrder: 'Pre-Invoce',
    Thakyou: 'Thank you for you buy with us !!',
    sectionOrderGeneralData: 'General data of the purchase order',
    titlePreInvoceInterData: {
      keyNumberPreInvoce: 'Invoce N°:',
      keyDataPreInvoce: "Date:"
    },
    DataCompany: {
      nameCompany: 'Beatlemania Online Shop',
      nameCompanyFull: 'Beatlemania Online Shop Mini GmbH',
      logoOfCompany: 'BeatlesManic2.jpg',
      titleAddress: 'Address:',
      street: 'Altona',
      numStreet: 46,
      zipCode: '22467',
      city: 'Hamburg',
      StateProv: 'Hamburg',
      country: 'Deutschland',
      phoneCompany: '0049-678567567',
      emailCompany: 'beatlemania@company.de'
    },
    deliveryCompany: 'UPS',
    termCoditions: {
      titleTermsConditions: 'Terms & Conditions',
      terms: ['All payments must be made through bank depositit, credit card or Paypal.',
        'The payment of the invoice will be made directly by the bank card accepted by the customer, or by Paypal procedure.',
        'The warranty period is in accordance with the law, with a free return of goods procedure also established by law of 15 days.',
        'The prices in this shop on-lie and in this sales order may change after 2 February 2023.'
      ]
    },
    numberOfArticlesInOrder: 'Articles in Order',
    id_OfOrder: 'Id of Order: ',
    orderData: ' Order Data: ',
    customerOfOrder: {
      idOfCustomer: 'Id: ',
      treament: 'Treament: ',
      fullName: 'Full Name:'
    },
    theStateOfOrder: 'The state of order: ',
    stateOfOrderArray: ['In warehouse', 'Dispatched', 'In delivery', 'Delivery'],
    articlesInOrder: 'Articles in order: '
  }
  const textButtons = {
    print: 'Print',
    return: 'Return'
  }
  const { order, userCustomer } = useContext(MyScoreContext)

  const componentRef = useRef()

  const productsInInvoce = order.records
  const [stateArrayProducts, setStateArrayProduct] = useState([])

  useEffect(() => {
    getProducts(productsInInvoce)
  }, [])

  const navigate = useNavigate()

  function getProducts(parProductId) {
    const urlBackedGetProduct = `http://127.0.0.1/records/record`
    let arrayProducts = []

    if (Array.isArray(parProductId)) {
      arrayProducts = parProductId.map((prodId) => {
        const _id = prodId._id
        console.log('prodId:  ', prodId)
        const urlQuery = `?${'prodId'}=${_id}`
        fetch(`${urlBackedGetProduct}/${urlQuery}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            response = response.json()
            const { message, record } = response
            console.log('All Ok:  ', message)
            return record
          })
          .catch(err => console.error('All bad', err))


        // if (response.status === 200) {
        //   console.log('All Ok:  ', message)
        //   return record
        // } else {
        //   console.error('All bad')
        // }
      })
    } else {
      console.error('There is an error: The argument of the function "getProducts" must be a string!!')
    }
    setStateArrayProduct(arrayProducts)
  }

  const handleButtonPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Document Pre-Invoce: ${order._id}`,
  })

  function handleButtonReturn() {
    navigate('/purchaseorder', { replace: false })
  }


  return (
    <>
      <div className="contMainPI" ref={componentRef} style={{ width: '100%', height: window.innerHeight }}>
        <section className="topHeader">
          <div className="contLeftHeader">
            <figure className="figureCompanyLogo">
              <img className='imageCompanyLogo' src={`../src/images/theBeatles/BeatlesManiac/${messagePreInvoce.DataCompany.logoOfCompany}`} alt={`Image of Produt of Shopping Cart: ${messagePreInvoce.DataCompany.nameCompany}`} />
            </figure>
            <header className="headerCompanyName">
              <h4 className="titleCompanyName">{messagePreInvoce.DataCompany.nameCompany}</h4>
            </header>
          </div>
          <div className="contRightHeader">
            <header className="headerTitlePreInvoce">
              <h6 className="titlePreInvoce">{messagePreInvoce.titelOfOrder}</h6>
            </header>
            <div className="contPreInvoceDatas">
              <div className="cont2Fields">
                <span className="titleField">{messagePreInvoce.titlePreInvoceInterData.keyNumberPreInvoce}</span>
                <span className="field">{order._id}</span>
              </div>
              <div className="cont2Fields">
                <span className="titleField">{messagePreInvoce.titlePreInvoceInterData.keyDataPreInvoce}</span>
                <span className="field">{order.invoceDate}</span>
              </div>
            </div>
          </div>
        </section>

        <main className="mainSections">
          <section className="sellerAndBuyer">
            <div className="contSB">
              <header className="headerSB">
                <h2 className="titleSB">Seller</h2>
              </header>
              <div className="addressSB">
                <div className="contHeaderAddress">
                  <header className="headerAddress">
                    <h3 className="address">{messagePreInvoce.DataCompany.titleAddress} </h3>
                  </header>
                  <div className="dataSB">
                    <div className="contRowSB">
                      <span className='name'>Company:</span>
                      <span className='data'>{messagePreInvoce.DataCompany.nameCompanyFull}</span>
                    </div>
                  </div>
                </div>
                <div className="dataSB">
                  <ul className="ulDataSB">
                    <li className="liData">
                      <div className="dataAddress ">
                        <span className='invoceName'>Street:</span>
                        <span className='invoceData'>{messagePreInvoce.DataCompany.street}</span>
                        <span className='invoceName'>N°:</span>
                        <span className='invoceData'>{messagePreInvoce.DataCompany.numStreet}</span>
                        <span className='invoceName'>Post:</span>
                        <span className='invoceData'>{messagePreInvoce.DataCompany.zipCode}</span>
                        <span className='invoceName'>City:</span>
                        <span className='invoceData'>{messagePreInvoce.DataCompany.city}</span>
                      </div>
                    </li>
                    <li className="liData">
                      <div className="dataAddress">
                        <span className='invoceName'>State:</span>
                        <span className='invoceData'>{messagePreInvoce.DataCompany.StateProv}</span>
                        <span className='invoceName'>Country:</span>
                        <span className='invoceData'>{messagePreInvoce.DataCompany.country}</span>
                      </div>
                    </li>
                    <li className="liData">
                      <div className="dataAddress">
                        <span className='invoceName'>Phone:</span>
                        <span className='invoceData phoneEmail'>{messagePreInvoce.DataCompany.phoneCompany}</span>
                        <span className='invoceName'>Email:</span>
                        <span className='invoceData phoneEmail'>{messagePreInvoce.DataCompany.emailCompany}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="contSB">
              <header className="headerSB">
                <h2 className="titleSB">Buyer</h2>
              </header>
              <div className="addressSB">
                <div className="contHeaderAddress">
                  <header className="headerAddress">
                    <h3 className="address">{messagePreInvoce.DataCompany.titleAddress} </h3>
                  </header>
                  <div className="dataSB">
                    <div className="contRowSB">
                      <span className='name'>Name:</span>
                      <span className='data'>{userCustomer.treament}</span>
                      <span className='data'>{userCustomer.firstName}</span>
                      <span className='data'>{userCustomer.lastName}</span>
                    </div>
                    <div className="contRowSB">
                      <span className='name'>Id:</span>
                      <span className='data'>{userCustomer._id}</span>
                    </div>
                  </div>
                </div>
                <div className="dataSB">
                  <ul className="ulDataSB">
                    <li className="liData">
                      <div className="dataAddress">
                        <span className='invoceName'>Street:</span>
                        <span className='invoceData'>{userCustomer.street}</span>
                        <span className='invoceName'>N°:</span>
                        <span className='invoceData'>{userCustomer.streetNumber}</span>

                      </div>
                    </li>
                    <li className="liData">
                      <div className="dataAddress">
                        <span className='invoceName'>Post:</span>
                        <span className='invoceData'>{userCustomer.post_ZipCode}</span>
                        <span className='invoceName'>City:</span>
                        <span className='invoceData'>{userCustomer.city}</span>
                      </div>
                    </li>
                    <li className="liData">
                      <div className="dataAddress">
                        <span className='invoceName'>State:</span>
                        <span className='invoceData'>{userCustomer.state_Province}</span>
                        <span className='invoceName'>Country:</span>
                        <span className='invoceData'>{userCustomer.country}</span>
                      </div>
                    </li>
                    <li className="liData">
                      <div className="dataAddress">
                        <span className='invoceName'>Phone:</span>
                        <span className='invoceData phoneEmail'>{userCustomer.phoneNumber}</span>
                        <span className='invoceName'>Email:</span>
                        <span className='invoceData phoneEmail'>{userCustomer.email}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="orderArticles">
            <Table striped className="contTableStriped" >
              <thead className="orderTableHead">
                <tr>
                  <th>N°</th>
                  <th>Article</th>
                  <th>Reference</th>
                  <th>Quantify</th>
                  <th>Price Unit (€)</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody className="orderTableBody">
                {
                  order.records.map((art, index) => {
                    return (
                      <>
                        <tr key={art._id} className="contArticleItem" >  {/* onMouseEnter={() => handleMouseOver(resultArticle._id)} */}
                          <td>{index + 1}</td>
                          <td>{art.articleInSC.title}</td>
                          <td>{art._id}</td>
                          <td>{art.amountOfArticle}</td>
                          <td>{art.articleInSC.price}</td>
                          <td>{art.articleInSC.price * art.amountOfArticle}</td>
                        </tr>
                      </>
                    )
                  })
                }
              </tbody>
              <tfoot className="orderTableFoot">
                <Table striped className="containerTableResults" >
                  <tbody className="tableBody">
                    <tr>
                      <td>Subtotal:</td>
                      <td>{order.toPay.subtotal}</td>
                    </tr>
                    <tr>
                      <td colSpan={4}>VAT (19%):</td>
                      <td>{order.toPay.VAT}</td>
                    </tr>
                    <tr>
                      <td colSpan={4}>Delivery Cost:</td>
                      <td>{order.toPay.deliveryCost}</td>
                    </tr>
                    <tr>
                      <td colSpan={4} id="titleTheTotal">Total (€):</td>
                      <td id="theTotal">{order.toPay.totalToPay}</td>
                    </tr>
                  </tbody>
                </Table>
              </tfoot>
            </Table>
          </section>

          <section className="deliverySection section">
            <header className="headerSection">
              <h4 className="titleSection">Transport & delivery</h4>
            </header>
            <div className="contDataSection">
              <div className="contDeliveryData">
                <div className="topData">
                  <div className="contSide">
                    <span className='name'>Delivery Company:</span>
                    <span className='data'>{messagePreInvoce.deliveryCompany}</span>
                  </div>
                  <div className="contSide">
                    <span className='name'>Estimated date of delivery:</span>
                    <span className='data'>{order.dueDataDelivery}</span>
                  </div>
                </div>
                <div className="downData">
                  <header className="headerDeliveryAddress">
                    <h4 className="titleDeliveryAddress">Delivery Address:</h4>
                  </header>
                  <ul className="ul">
                    <li>
                      <div className="dataAddress">
                        <span className='invoceName'>Street:</span>
                        <span className='invoceData'>{userCustomer.street}</span>
                        <span className='invoceName'>N°:</span>
                        <span className='invoceData'>{userCustomer.streetNumber}</span>
                        <span className='invoceName'>Post:</span>
                        <span className='invoceData'>{userCustomer.state_Province}</span>
                        <span className='invoceName'>City:</span>
                        <span className='invoceData'>{userCustomer.city}</span>
                        <span className='invoceName'>State:</span>
                        <span className='invoceData'>{userCustomer.state_Province}</span>
                        <span className='invoceName'>Country:</span>
                        <span className='invoceData'>{userCustomer.country}</span>
                      </div>
                    </li>
                    <li>
                      <div className="dataAddress">
                        <span className='invoceName'>Phone:</span>
                        <span className='invoceData phoneEmail'>{messagePreInvoce.DataCompany.phoneCompany}</span>
                        <span className='invoceName'>Email:</span>
                        <span className='invoceData phoneEmail'>{messagePreInvoce.DataCompany.emailCompany}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="payMethodSection section">
            <header className="headerSection">
              <h4 className="titleSection">Payment</h4>
            </header>
            <div className="contDataSection">
              <div className="contPaymentData">
                <div className="contLeftSide">
                  <div className="cont2Fields">
                    <span className="titleData">By Card:</span>
                    <span className="dataData">{userCustomer.cardType}</span>
                  </div>
                </div>
                <div className="contRightSide">
                  <ul>
                    <li>
                      <span className="titleData">Holder:</span>
                      <span className="dataData">{userCustomer.cardHolderFirstName}</span>
                      <span className="dataData">{userCustomer.cardHolderLastName}</span>
                    </li>
                    <li>
                      <span className="titleData">Card N°:</span>
                      <span className="dataData">{`..-***-**${userCustomer.cardNumber.substring(27, 32)}`}</span>
                      <span className="titleData">Exp. Data:</span>
                      <span className="dataData">{userCustomer.expirationData.substring(0, 10)}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="termsFooter">
          <div className="terms_Conditions">
            <header className="headerTermsConditions">
              <h3 className="titleTermsConditions">{messagePreInvoce.termCoditions.titleTermsConditions}</h3>
            </header>
            <div className="divTermsConditions">
              <ul className="ulConditionsOfOrder">
                {messagePreInvoce.termCoditions.terms.map((term, index) => {
                  return (
                    <li className="liTermCondition" key={index}>
                      <span className='textTermCondition'>{`N°: ${index}     ✅     ${term}`}</span>
                    </li>
                  )
                })
                }
              </ul>
            </div>
            <p className="thankyou">{messagePreInvoce.Thakyou}</p>
          </div>
        </footer>
      </div>
      <div className="contButtons">
        <Button
          handleButton={handleButtonPrint}
          text={textButtons.print}
        />
        <Button
          handleButton={handleButtonReturn}
          text={textButtons.return}
        />
      </div>
    </>
  )
}

export default PreInvoce
