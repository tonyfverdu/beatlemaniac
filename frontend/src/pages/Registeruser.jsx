import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { MyScoreContext } from '../context/MyContext.jsx'
import currentDate from '../functions/currentDate.js'

import Swal from 'sweetalert2'
import { GoListUnordered } from 'react-icons/go'
import { TbDiscount } from "react-icons/tb"

import '../sass/componentsSass/orderOfCustomer.scss'

let timerInterval = 0
function windowsAlertProcessBy() {
  Swal.fire({
    title: 'ShoppingCart empty Shopping Cart. Process of buy',
    html: 'I will close in <b>1</b> second.',
    timer: 1000,
    timerProgressBar: true,
    width: 400,
    position: 'top-end',
    padding: '2em',
    color: 'rgb(9, 9, 9)',
    background: '#aaa url("../images/fondos/logoTransparent1.jpg")',
    backdrop: `
      rgba(0,0,123,0.4)
      url("../images/fondos/logoBuy1.jpg")
      left top
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
    titelOfOrder: 'Order',
    sectionOrderGeneralData: 'General data of the purchase order',
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

  const [idOfOrder, setIdOfOrder] = useState(0)
  const [orderData, setOrderData] = useState(currentDate())
  const [stateOfOrder, setStateOfOrder] = useState(messagesOfOrder.stateOfOrderArray[0])
  const [stateArticlesOfOrder, setStateArticlesOfOrder] = useState([])
  const [stateTotalArticlesInOrder, setStateTotalArticlesInOrder] = useState(0)
  const [stateTotalOfOrder, setStateTotalOfOrder] = useState(0)

  const { shoppingCartState, setShoppingCartState, totalArticlesInSC, setTotalArticlesInSC, totalOfPriceOfSC, setTotalOfPriceOfSC,
    customersRegistratedOnLine } = useContext(MyScoreContext)
  const navigate = useNavigate()

  useEffect(() => {
    /*  Ini od stateVariables of Order */
    setIdOfOrder((idOfOrder) => idOfOrder + 1)
    setOrderData(currentDate())
    setStateOfOrder(messagesOfOrder.stateOfOrderArray[1])
    setStateArticlesOfOrder(shoppingCartState)
    setStateTotalArticlesInOrder(totalArticlesInSC)
    setStateTotalOfOrder(totalOfPriceOfSC)
    setShoppingCartState([])
    setTotalArticlesInSC(0)
    setTotalOfPriceOfSC(0)

    windowsAlertProcessBy()
  }, [])

  return (
    <div className="containerOfOrder">
      <div className="containerHeader">
        <header className="headerOfOrder">
          <h3 className="titleOfOrder">{messagesOfOrder.titelOfOrder}</h3>
          <i className="iconOfOrder"><GoListUnordered /></i>
        </header>
      </div>

      <main className="bodyOfOrder">
        <section className="sectionData dataOfOrder">
          <div className="containerHeaderOfTheOrder">
            <header className="headerOfTheOrder">
              <h3 className="dataGeneralOfOrder">{messagesOfOrder.sectionOrderGeneralData}</h3>
            </header>
          </div>
          <div className="containerRow">
            <div className="containerData">
              <div className="dataLabelText idOrder">
                <span className="titelOfData">{messagesOfOrder.id_OfOrder}</span>
                <span className="dataOfData">{idOfOrder}</span>
              </div>
              <div className="dataLabelText orderData">
                <span className="titelOfData">{messagesOfOrder.orderData}</span>
                <span className="dataOfData">{orderData}</span>
              </div>
              <div className="dataLabelText stateOfOrder">
                <span className="titelOfData">{messagesOfOrder.theStateOfOrder}</span>
                <span className="dataOfData">{stateOfOrder}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sectionData dataOfCustomer">
          <div className="containerRow">
            <div className="containerData">
              <div className="dataLabelText">
                <span className="titelOfData">{messagesOfOrder.customerOfOrder.idOfCustomer}</span>
                <span className="dataOfData">{customersRegistratedOnLine.id_Customer}</span>
              </div>
              <div className="dataLabelText" id="treament">
                <span className="titelOfData">{messagesOfOrder.customerOfOrder.treament}</span>
                <span className="dataOfData">{customersRegistratedOnLine.personalDataOfCustomer.TheTreament}</span>
              </div>
              <div className="dataLabelText">
                <span className="titelOfData">{messagesOfOrder.customerOfOrder.fullName}</span>
                <span className="dataOfData">{customersRegistratedOnLine.personalDataOfCustomer.TheFisrtNameOfCustomer + '  ' + customersRegistratedOnLine.personalDataOfCustomer.TheLastNameOfCustomer}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="dataOfArticle">
          {console.log('stateArticlesOfOrder:  ', stateArticlesOfOrder)}
          {
            stateArticlesOfOrder.map((article, index) => {
              return (
                <div key={index} className="bodyLeftViewShoppingCart">
                  <div className='containerLeftUpViewShoppingCart'>
                    <div className="containerImageLeftUpViewShoppingCart">
                      <figure className='figureImageOfProduct'>
                        <img className='imagefigureImageOfProduct' src={require(`../../images/purchaseItems/${article.image}`)} alt={`Image of Produt of Shopping Cart: ${article.image}`} />
                      </figure>
                    </div>
                    <div className="containerInfoLeftUpViewShoppingCart">
                      <header className="headerTitelProductViewShoppingCart">
                        <h3 className="titleProductViewShoppingCart">{article.nameOfArticle}</h3>
                      </header>
                      <div className="descriptionShortOfProduct">
                        <span className="descriptionShortOfProduct">{article.descriptionShort}</span>
                      </div>
                      <div className='price_discount'>
                        <div className='containerPrice'>
                          <span className='titelPrice'>Price:</span>
                          <span className='price'>{article.price}</span>
                        </div>
                        <div className='containerDiscount'>
                          <div className="containerIconDiscount" >
                            <i className='iconDiscount'>
                              <TbDiscount />
                            </i>
                          </div>
                          <span className='discount'>{article.price}</span>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className='containerLeftDownViewShoppingCart'>
                    <div className="containerImageBrand">
                      <figure className='figureImageBrand'>
                        <img className='imageBrand' src={require(`../../images/purchaseItems/brands/${article.imageOfBrand}`)} alt={`Image of Brand: ${article.brand}`} />
                      </figure>
                    </div>
                  </div>
                </div>
              )
            })
          }

        </section>
      </main>
      <footer className="footerOfOrder">

      </footer>
    </div>
  )
}

export default OrderOfCustomer