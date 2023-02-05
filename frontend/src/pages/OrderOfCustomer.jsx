import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { MyScoreContext } from '../context/MyContext.jsx'
import currentDate from '../functions/currentDate.js'
import Button from '../components/Button'
import UserInfoLogin from '../components/Orders/UserInfoLogin.jsx'
import addDays from '../functions/addDays.js'

import Swal from 'sweetalert2'
import Table from 'react-bootstrap/Table'
import { GoListUnordered } from 'react-icons/go'

import '../sass/componentsSass/Orders/OrderOfCustomer.scss'

let timerInterval = 0
function windowsAlertProcessBy() {
  Swal.fire({
    title: 'Process Buy. Order of ShoppingCart created. LocalStorage empty',
    html: 'I will close in <b>3</b> second.',
    timer: 3000,
    timerProgressBar: true,
    width: 400,
    position: 'top-end',
    padding: '2em',
    color: 'rgb(9, 9, 9)',
    background: '#aaa url("../images/fondos/logoTransparent1.jpg")',
    backdrop: `
      rgba(0,0,123,0.4)
      url("../images/fondos/logoBuy1.jpg")
      center
      no-repeat
    `,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
    icon: 'success',
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


function OrderOfCustomer() {
  const messagesOfOrder = {
    titelOfOrder: 'Sales Order Confirmation',
    sectionOrderGeneralData: 'General Data of the Purchase Order',
    DataCompany: {
      nameCompany: 'Beatlemania Online Shop Mini GmbH',
      logoOfCompany: 'logo1.svg',
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
    termCoditions: {
      titleTermsConditions: 'Terms & Conditions',
      terms: ['All payments must be made through bank depositit, credit card or paypal',
        'The prices in this shop on-lie and in this sales order may change after 2 February 2023']
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
    stateOfOrder: ['In warehouse', 'Dispatched', 'In delivery', 'Delivery'],
    articlesInOrder: 'Articles in order: '
  }
  const [orderData, setOrderData] = useState('')
  const [stateOfOrder, setStateOfOrder] = useState(messagesOfOrder.stateOfOrder[0])

  const { SC_State, setSC_State, totalArticlesInSC, setTotalArticlesInSC, totalOfPriceOfSC,
    resultDeliveryCost, setResultDeliveryCost, userCustomer, order, setOrder,
    setStateArticlesOfOrder,
    setStateTotalArticlesInOrder,
    setStateTotalOfOrder } = useContext(MyScoreContext)

  const navigate = useNavigate()

  useEffect(() => {
    /* *************   Ini of stateVariables of Order    ***************** */
    setOrderData(currentDate())
    setStateOfOrder(messagesOfOrder.stateOfOrder[0])
    setStateArticlesOfOrder(SC_State)
    setStateTotalArticlesInOrder(totalArticlesInSC)
    setStateTotalOfOrder(totalOfPriceOfSC)
  }, [])

  function handleButtonReturn() {
    navigate(`/home`, { replace: false })
  }

  async function handleButtonAccept(ev) {
    const userId = userCustomer._id
    const invoceDate = new Date()
    const dueDataDelivery = addDays(new Date(), 3)
    const records = SC_State
    const toPay = {
      subtotal: Number(totalOfPriceOfSC),
      VAT: Number(totalOfPriceOfSC * 0.19).toFixed(2),
      deliveryCost: Number(resultDeliveryCost).toFixed(2),
      discount: 0,
      totalToPay: Number(totalOfPriceOfSC) + Number(resultDeliveryCost)
    }

    const urlBackendOfAddNewOrder = 'http://127.0.0.1:3001/cart/addNewOrder'

    const fetchNewOrderInCart = await fetch(urlBackendOfAddNewOrder, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        invoceDate,
        dueDataDelivery,
        records,
        toPay
      })
    })

    const response = await fetchNewOrderInCart.json()
    const { message, newOrder } = response

    // console.log('fetchNewOrderInCart.status:  ', fetchNewOrderInCart.status)
    // console.log('En OrderOfCustomer:  newOrder:  ', newOrder)
    if (fetchNewOrderInCart.status === 200) {
      //  "setter" of newOrder variable
      setOrder(newOrder)
      console.log('Order en OrderOfCustomer:  ', order)

      // I empty the shopping cart and initialise global variables.
      setSC_State([])
      setTotalArticlesInSC(0)
      setResultDeliveryCost(0)
      localStorage.setItem('SC_Storage', JSON.stringify(SC_State))
      localStorage.setItem('Number_ArticleInSC_Storage', JSON.stringify(totalArticlesInSC))

      console.log(`All Ok. ${message}`)
      // navigate('/preInvoce', { replace: true })
    } else {
      console.error('all bad !!')
      navigate(-1)
    }
  }


  return (
    <div className="contMainOrder">
      <div className="contResultOrder">
        <header className="headerOrder">
          <h3 className="titleOrder">{messagesOfOrder.titelOfOrder}</h3>
          <div className="contIconOrder">
            <i className="iconOrder">
              <GoListUnordered />
            </i>
          </div>
          <div className="contSubtitles">
            <p className="subtitleOrder">{messagesOfOrder.sectionOrderGeneralData}</p>
            <span className="subtitleOrder"><b>{totalArticlesInSC}</b>{messagesOfOrder.numberOfArticlesInOrder}</span>
          </div>
        </header>

        <div className="bodyOrder">
          <div className='purchaseOrder'>
            <section className="TopOfOrder">
              <div className="firstLine">
                <header className="headerTitelOfOrder">
                  <h3 className="companyName">{messagesOfOrder.DataCompany.nameCompany}</h3>
                  <figure className="logoOfCompany">
                    <img className='imagefigureOfProduct' src={`../src/images/theBeatles/${messagesOfOrder.DataCompany.logoOfCompany}`} alt={`Image of Produt of Shopping Cart: ${messagesOfOrder.DataCompany.nameCompany}`} />
                  </figure>
                </header>
                <div className="dataOrder">
                  <span className='OrderTitle'>N° Order:</span>
                  <span className='OrderData'>{'pending'}</span>
                </div>
                <div className="dataOrder">
                  <span className='OrderTitle'>Date:</span>
                  <span className='OrderData'>{currentDate()}</span>
                </div>
              </div>
              <div className="addressCompany">
                <div className="contHeaderCompany">
                  <header className="headerAddressOfCompany">
                    <h3 className="addresOfCompany">{messagesOfOrder.DataCompany.titleAddress} </h3>
                  </header>
                  <div className="dataCompany">
                    <span className='name'>Company:</span>
                    <span className='data'>{messagesOfOrder.DataCompany.nameCompany}</span>
                  </div>
                </div>
                <div className="dataOfCompany">
                  <ul className="ulDataOfCompany">
                    <li className="liData">
                      <div className="dataAddress">
                        <span className='orderName'>Street:</span>
                        <span className='orderData'>{messagesOfOrder.DataCompany.street}</span>
                        <span className='orderName'>N°:</span>
                        <span className='orderData'>{messagesOfOrder.DataCompany.numStreet}</span>
                        <span className='orderName'>Zip Code:</span>
                        <span className='orderData'>{messagesOfOrder.DataCompany.zipCode}</span>
                        <span className='orderName'>City:</span>
                        <span className='orderData'>{messagesOfOrder.DataCompany.city}</span>
                        <span className='orderName'>State:</span>
                        <span className='orderData'>{messagesOfOrder.DataCompany.StateProv}</span>
                        <span className='orderName'>Country:</span>
                        <span className='orderData'>{messagesOfOrder.DataCompany.country}</span>
                      </div>
                    </li>
                    <li className="liDataOfContact">
                      <div className="dataOfContact">
                        <span className='orderName'>Phone:</span>
                        <span className='orderData'>{messagesOfOrder.DataCompany.phoneCompany}</span>
                        <span className='orderName'>Email:</span>
                        <span className='orderData'>{messagesOfOrder.DataCompany.emailCompany}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="terms_Conditions">
                <header className="headerTermsConditions">
                  <h3 className="titleTermsConditions">{messagesOfOrder.termCoditions.titleTermsConditions}</h3>
                </header>
                <div className="divTermsConditions">
                  <ul className="ulConditionsOfOrder">
                    {messagesOfOrder.termCoditions.terms.map((term, index) => {
                      return (
                        <li className="liTermCondition" key={index}>
                          <span className='textTermCondition'>{`N°: ${index}     ✅     ${term}`}</span>
                        </li>
                      )
                    })
                    }
                  </ul>
                </div>
              </div>
            </section>

            <section className="HalfOfOrder">
              <div className="tableOfOrder">
                <Table striped className="contTableStriped" >
                  <thead className="orderTableHead">
                    <tr>
                      <th>N°</th>
                      <th>Article Description</th>
                      <th>Reference number</th>
                      <th>Quantify</th>
                      <th>Price Unit (€)</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="orderTableBody">
                    {
                      SC_State.map((resultArticle, index) => {
                        return (
                          <tr key={resultArticle.articleInSC._id} className="contArticleItem" >
                            <td>{index + 1}</td>
                            <td>{resultArticle.articleInSC.title}</td>
                            <td>{resultArticle.articleInSC._id}</td>
                            <td>{resultArticle.amountOfArticle}</td>
                            <td>{resultArticle.articleInSC.price}</td>
                            <td>{resultArticle.articleInSC.price * resultArticle.amountOfArticle}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                  <tfoot className="orderTableFoot">
                    <Table striped className="containerTableResults" >
                      <tbody className="tableBody">
                        <tr>
                          <td>Subtotal:</td>
                          <td>{totalOfPriceOfSC}</td>
                        </tr>
                        <tr>
                          <td colSpan={4}>VAT (19%):</td>
                          <td>{Number((totalOfPriceOfSC * 19 / 119).toFixed(2))}</td>
                        </tr>
                        <tr>
                          <td colSpan={4}>Delivery Cost:</td>
                          <td>{Number(resultDeliveryCost.toFixed(2))}</td>
                        </tr>
                        <tr>
                          <td colSpan={4} id="titleTheTotal">Total (€):</td>
                          <td id="theTotal">{totalOfPriceOfSC + resultDeliveryCost}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </tfoot>
                </Table>
              </div>
            </section>

            <section className="BottomsOfOrder">
              <div className="containerButtons">
                <Button
                  handleButton={handleButtonReturn}
                  text={"Return"}
                />
                <Button
                  handleButton={(ev) => handleButtonAccept(ev)}
                  text={"Accept"}
                />
              </div>
            </section>

          </div>
        </div>
      </div >

      <div className="contInfo">
        <div className="contInfoClient">
          <UserInfoLogin
          />
        </div>
      </div>
    </div >
  )
}

export default OrderOfCustomer