import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom"

import { MdRemoveShoppingCart, MdShoppingCart } from "react-icons/md"
import { FcHighBattery } from "react-icons/fc"
import { BsFillCartCheckFill } from "react-icons/bs"
import { FaShoppingBag } from "react-icons/fa"

import { MyScoreContext } from '../context/MyContext.jsx'

import '../sass/componentsSass/ShoppingCard/ViewShoppingCart.scss'


function ViewShoppingCart() {
  const messagesForShoppingCart = {
    titleViewShoppingCart: 'Shopping-Cart',
    products: 'albums.',
    titleSummaryViewShoppingCart: 'Summary',
    paragraphSummaryViewShoppingCart: 'Vouchers can be added in the payment step',
    titleSubtotal: 'Subtotal',
    titleDeliveryCost: 'Delivery cost',
    titleVAT: 'VAT included (19%)',
    ProceedToCheckout: 'Proceed to buy',
    ContinueShopping: 'Continue Shopping'
  }
  const ratiosDeliveryCost = [
    {
      umbral: 50,
      porcen: 0.04
    },
    {
      umbral: 100,
      porcen: 0.03
    },
    {
      umbral: 150,
      porcen: 0.02
    },
    {
      umbral: 200,
      porcen: 0.01
    },
    {
      umbral: 250,
      porcen: 0.00
    }
  ]

  const [toggleBuy, setToggleBuy] = useState(false)

  const { SC_State, totalArticlesInSC, setTotalArticlesInSC, totalOfPriceOfSC, resultDeliveryCost,
    setResultDeliveryCost, isLoggedin, setLoggedin, } = useContext(MyScoreContext)

  const navigate = useNavigate()

  useEffect(() => {
    calculateDeliveryCost()
    totalShoppingCart(totalArticlesInSC, resultDeliveryCost)
  }, [SC_State, totalArticlesInSC])

  function calculateDeliveryCost() {
    switch (totalOfPriceOfSC > 0) {
      case totalOfPriceOfSC <= 0:
        setResultDeliveryCost(totalOfPriceOfSC * 0.00) //  0% of DeliveyCost
        console.log('resultDeliveryCost:  ', resultDeliveryCost)
        break
      case totalOfPriceOfSC > ratiosDeliveryCost[0].umbral && totalOfPriceOfSC <= ratiosDeliveryCost[1].umbral:
        console.log(ratiosDeliveryCost[0])
        setResultDeliveryCost(totalOfPriceOfSC * ratiosDeliveryCost[0].porcen) //  4% of DeliveyCost
        console.log('resultDeliveryCost:  ', resultDeliveryCost)
        break
      case totalOfPriceOfSC > ratiosDeliveryCost[1].umbral && totalOfPriceOfSC <= ratiosDeliveryCost[2].umbral:
        console.log(ratiosDeliveryCost[1])
        setResultDeliveryCost(totalOfPriceOfSC * ratiosDeliveryCost[1].porcen) //  3% of DeliveyCost
        console.log('resultDeliveryCost:  ', resultDeliveryCost)
        break
      case totalOfPriceOfSC > ratiosDeliveryCost[2].umbral && totalOfPriceOfSC <= ratiosDeliveryCost[3].umbral:
        console.log(ratiosDeliveryCost[2])
        setResultDeliveryCost(totalOfPriceOfSC * ratiosDeliveryCost[2].porcen) //  2% of DeliveyCost
        console.log('resultDeliveryCost:  ', resultDeliveryCost)
        break
      case totalOfPriceOfSC > ratiosDeliveryCost[3].umbral && totalOfPriceOfSC <= ratiosDeliveryCost[4].umbral:
        console.log(ratiosDeliveryCost[3])
        setResultDeliveryCost(totalOfPriceOfSC * ratiosDeliveryCost[3].porcen) //  1% of DeliveyCost
        break
      case totalOfPriceOfSC > ratiosDeliveryCost[4].umbral:
        console.log(ratiosDeliveryCost[4])
        setResultDeliveryCost(totalOfPriceOfSC * ratiosDeliveryCost[4].porcen) //  0% of DeliveyCost
        console.log('resultDeliveryCost:  ', resultDeliveryCost)
        break
      default:
        break
    }
    return resultDeliveryCost
  }

  function totalShoppingCart(parTotalOfPriceOfSC, parResultDeliveryCost) {
    let totalWithCostOfDelivery = 0
    if (typeof parTotalOfPriceOfSC === 'number' && !Number.isNaN(parTotalOfPriceOfSC) &&
      typeof parResultDeliveryCost === 'number' && !Number.isNaN(parResultDeliveryCost)) {
      totalWithCostOfDelivery = totalOfPriceOfSC + resultDeliveryCost
    } else {
      alert('Error: The parameters of the function "calculateTotalShoppingCart" must be integer numbers!!')
      totalWithCostOfDelivery = null
    }
    return totalWithCostOfDelivery
  }

  function handleArticleOutOfSC(parArticle) {
    const indexIs = SC_State.findIndex(element => element === parArticle)
    const articleFound = SC_State[indexIs]
    articleFound.amountOfArticle--

    if (articleFound.amountOfArticle === 0) {
      SC_State.splice(indexIs, 1)
    }

    setTotalArticlesInSC((totalArticlesInSC) => totalArticlesInSC - 1)
  }

  function handleArticleInSC(parArticle) {
    const articleFound = SC_State.find(element => element === parArticle)
    articleFound.amountOfArticle++

    setTotalArticlesInSC((totalArticlesInSC) => totalArticlesInSC + 1)
  }

  function handleButtonBuy() {
    if (!isLoggedin) {
      setToggleBuy(!toggleBuy)
    } else {
      navigate(`/purchaseorder`, { replace: false })
    }
  }

  function continueShopping() {
    navigate(-1)
  }


  return (
    <div className="containerMainViewSC" >
      <div className="containerResultSC">
        <header className="headerViewShoppingCart">
          <h3 className="titleViewShoppingCart">{messagesForShoppingCart.titleViewShoppingCart}</h3>
          <div className="containerIconShoppingCart">
            <i className="iconShoppingCart">
              <MdShoppingCart />
            </i>
          </div>
          <span className="subtitleViewShoppingCart"><b>{totalArticlesInSC}</b>{messagesForShoppingCart.products}</span>
        </header>

        <div className="bodyViewShoppingCart">

          <div className='containerRegistersOfArticles'>
            {
              SC_State.map((article, index) => {
                return (
                  <div key={index} className="bodyLeftViewShoppingCart">
                    <div className='containerLeftUpViewShoppingCart'>
                      <div className="containerImageLeftUpViewShoppingCart">
                        <figure className='figureImageOfProduct'>
                          <img className='imagefigureImageOfProduct' src={`../src/images/theBeatles/portadas/${article.articleInSC.image}`} alt={`Image of Produt of Shopping Cart: ${article.articleInSC.title}`} />
                        </figure>
                      </div>
                      <div className="containerInfoLeftUpViewShoppingCart">
                        <header className="headerTitelProductViewShoppingCart">
                          <h3 className="titleProductViewShoppingCart">{article.articleInSC.title}</h3>
                        </header>
                        <div className='price_stock'>
                          <div className='containerPrice'>
                            <span className='titelPrice'>Price:</span>
                            <span className='price'>{article.articleInSC.price} €</span>
                          </div>
                          <div className='containerStock'>
                            <div className="containerIconStock" >
                              <i className='iconStock'>
                                <FcHighBattery />
                              </i>
                            </div>
                            <span className='stock'>{article.articleInSC.stock}</span>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className='containerLeftDownViewShoppingCart'>
                      <div className="containerImageBrand">
                        <figure className='figureImageBrand'>
                          <img className='imageBrand' src={`../src/images/theBeatles/portadas/${article.articleInSC.image}`} alt={`Image of Brand: ${article.articleInSC.title}`} />
                        </figure>
                      </div>
                      <div className="containerIconShoppingCartOut" onClick={() => handleArticleOutOfSC(article)}>
                        <i className='iconShoppingCartOut'>
                          <MdRemoveShoppingCart />
                        </i>
                      </div>
                      <div className="gropuButtonsMoreLess">
                        <button className="isButton less" onClick={() => handleArticleOutOfSC(article)}>-</button>
                        <div className="separator">
                          <span className='textNumberOfArticle'>{article.amountOfArticle}</span>
                        </div>
                        <button className="isButton more" onClick={() => handleArticleInSC(article)}>+</button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>

          <div className="bodyRigthViewShoppingCart">
            <header className="headerSummaryViewShoppingCart">
              <h3 className="titleSummaryViewShoppingCart">{messagesForShoppingCart.titleSummaryViewShoppingCart}</h3>
              <p className="paragraphSummaryViewShoppingCart">{messagesForShoppingCart.paragraphSummaryViewShoppingCart}</p>
            </header>
            <div className="containerRigthUpViewShoppingCart">
              <div className="containerSubtotal_Delibery">
                <div className='containerSubtotalUp'>
                  <span className='titleSubtotal'>{messagesForShoppingCart.titleSubtotal}</span>
                  <span className='subtotal'>{totalOfPriceOfSC}</span>
                </div>
                <div className='containerDeliveryCost'>
                  <span className='titleDeliveryCost'>{messagesForShoppingCart.titleDeliveryCost}</span>
                  <span className='DeliveryCost'>{resultDeliveryCost.toPrecision(2)}</span>
                </div>
              </div>
              <div className="containerTotal_Tax">
                <div className='containerTotal'>
                  <span className='titleTotal'>Total</span>
                  <span className='total'>{totalShoppingCart(totalOfPriceOfSC, resultDeliveryCost)}</span>
                </div>
                <div className='containerTax'>
                  <span className='titleVAT'>{messagesForShoppingCart.titleVAT}</span>
                </div>
              </div>
              <div className="containerButtonCheckOut">
                <button className='buttonCheckOut' type='Submit' onClick={handleButtonBuy} >
                  {messagesForShoppingCart.ProceedToCheckout}
                  <i className='iconShoppingCartCheckOut'>
                    <BsFillCartCheckFill />
                  </i>
                </button>
              </div>
            </div>
            {
              toggleBuy &&
              <span className="textWarnigLogin">You must be logged in to be able to purchase!</span>
            }
            <div className="containerRigthDownViewShoppingCart">
              <div className='containerContinueShopping'>
                <span className='textContinueShopping' onClick={() => continueShopping()}>
                  {messagesForShoppingCart.ContinueShopping}
                </span>
                <i className='iconShoppingCartCheckOut'>
                  <FaShoppingBag />
                </i>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ViewShoppingCart
