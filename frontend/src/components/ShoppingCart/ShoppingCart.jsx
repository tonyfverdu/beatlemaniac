import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { MyScoreContext } from '../../context/MyContext.jsx'

import CardArticleInSCart from './CardArticleInSCart'
import Button from '../Button'

import { MdAddShoppingCart } from "react-icons/md"

import Swal from 'sweetalert2'
import '../../sass/componentsSass/ShoppingCard/ShoppingCart.scss'


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


function ShoppingCart() {
  const textBuy = 'Buy'
  const textDelete = 'Delete'

  const [isToggleOpen, setIsToggleOpen] = useState(false)
  const [isToggleViewSC, setsToggleViewSC] = useState(true)

  const { SC_State, setSC_State, totalArticlesInSC, setTotalArticlesInSC,
    totalOfPriceOfSC, setTotalOfPriceOfSC } = useContext(MyScoreContext)

  const navigate = useNavigate()

  function handleMousePestShoppingCart() {
    setIsToggleOpen(isTogglePest => (!isTogglePest))
  }

  function handleClickShoppingCart() {
    if (isToggleViewSC) {
      navigate(`/viewShoppingCart`, { replace: false })
    } else {
      navigate(-1)
    }
    setsToggleViewSC(isToggleViewSC => !isToggleViewSC)
  }

  function handleButtonDelete() {
    setSC_State([])
    setTotalArticlesInSC(0)
    setTotalOfPriceOfSC(0)
  }

  function handleButtonBuy() {    //  <<==  Aqui se produce la creacion de la orden de pedido, se vacia la Shopping Cart
    //  y se suma 1 al id de la shoppingCart
    setSC_State([])
    setTotalArticlesInSC(0)
    setTotalOfPriceOfSC(0)
    windowsAlertProcessBy()
  }

  return (
    <div className="containerSC">
      <div className={`containerCart ${isToggleOpen ? 'jaIstOpen' : 'neinIstClose'}`} >
        <header className="headerShoppingCart" onMouseEnter={handleMousePestShoppingCart}>
          <h3 className="titleShoppingCart">Shopping Cart</h3>
          <figure className='figureShoppingCartPest' onClick={handleClickShoppingCart}>
            <img className='imageShoppingCartPest' src={`../src/images/theBeatles/recordOfBeatles.webp`} alt={'Image of Shopping Cart'} />
          </figure>
        </header>
        <div className="containerOfArticles">
          <ul>
            {
              SC_State.map((article, index) => {
                return (
                  <li key={index}>
                    <CardArticleInSCart
                      article={article.articleInSC}
                      indexInShoppingCart={index}
                    />
                    <div className="containerAmountArticle">
                      <span className="amountTitle">Amount:</span>
                      <span className="amountArticle">{article.amountOfArticle}</span>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="containerInfoShoppingCart">
          <header className="headerTotalArticle">
            <div className="containerTotales">
              <h3 className="Total">Articles:</h3>
              <span className="resultTotal">{totalArticlesInSC}</span>
            </div>
            <div className="containerTotales">
              <h3 className="Total">Total:</h3>
              <span className="resultTotal">{totalOfPriceOfSC}</span>
            </div>

          </header>
          <div className="containerButtonsOfShoppingCart">
            <div className="containerButton">
              <Button
                id='buttonBuy'
                handleButton={handleButtonDelete}
                text={textDelete}
              />
            </div>
            <div className="containerButton">
              <i><MdAddShoppingCart /></i>
              <Button
                id='buttonBuy'
                handleButton={handleButtonBuy}
                text={textBuy}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart