import React, { useContext } from 'react'
import { MyScoreContext } from '../../context/MyContext.jsx'

import { FcHighBattery } from "react-icons/fc"
import { MdRemoveShoppingCart } from "react-icons/md"

import '../../sass/componentsSass/ShoppingCard/CardArticleInSCard.scss'


function CardArticleInSCart({ article }) {
  const { SC_State, setSC_State, typeArticle, setTotalArticlesInSC } = useContext(MyScoreContext)

  function getIndexInShoppingCart(parIDArticle) {
    const indexSC = SC_State.findIndex(art => art.articleInSC._id === parIDArticle)
    return indexSC
  }

  function handleArticleOutOfShoppingCart(parIndex) {
    const index = getIndexInShoppingCart(parIndex)
    const newArray = []
    SC_State.map((art, ind) => {
      if (ind !== index) {
        newArray.push(art)
      }
      return newArray
    })
    setSC_State(newArray)
    setTotalArticlesInSC((totalArticlesInSC) => totalArticlesInSC - 1)
  }


  return (
    <div className="containerCardArticleSC">
      <div className="containerTopCard">
        <header className="headerNameArticleInCard">
          <h3 className="NameArticleInCard">{article.title}</h3>
        </header>
      </div>
      <div className="containerDownCard">
        <div className="containerLeftCard">
          <figure className="containerFigureArticleSC">
            <img className="imageArticleSC" src={`../../src/images/theBeatles/portadas/${article.image[0]}`} alt={article.title} />
          </figure>
        </div>
        <div className="containerRigthCard">
          <div className="containerIconShoppingCartOut" onClick={() => handleArticleOutOfShoppingCart(article._id)}>
            <i className="iconRemoveSC">
              <MdRemoveShoppingCart />
            </i>
          </div>
          <div className="stockArticle">
            {
              typeArticle === 'record'
                ? <>
                  {/* <span className="Stock">Stock:</span> */}
                  <div className="contIcovalue">
                    <i><FcHighBattery /></i>
                    <span className="valueStock">{article.stock}</span>
                  </div>
                </>
                : <></>
            }
          </div>
          <div className="containerPrice">
            <span className="Price">Price:<span className="valuePrice">{article.price}</span></span>
            <span className="Tax">(IVA)<span className="valueTax">{(article.price * 0.19).toFixed(2)}</span></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardArticleInSCart