import React, { useContext } from 'react'
import { MyScoreContext } from '../../context/MyContext.jsx'
import RegistroArticleItem from './RegistroArticleItem.jsx'
import Button from '../Button'

import { FcHighBattery } from "react-icons/fc"
import { MdAddShoppingCart } from "react-icons/md"
// import Swal from 'sweetalert2'

import '../../sass/componentsSass/Search/ResultRecords.scss'


function ResultRecords() {
  const {
    SC_State, setSC_State, totalArticlesInSC, setTotalArticlesInSC, articlesFilterd, setArticlesFilterd,
    typeArticle, articleMouseOver, setArticleMouseOver, iniArticleMouseOver } = useContext(MyScoreContext)

  function resetSearch() {
    setArticlesFilterd([])
    setArticleMouseOver(iniArticleMouseOver)
  }

  function handleButtonAddToCart(parId) {
    const newAlbumIn_SC = articlesFilterd.find(element => element._id === articleMouseOver._id)
    const isIn_SC = SC_State.find((album) => album.articleInSC._id === parId)

    if (isIn_SC === undefined) {
      setSC_State([...SC_State, { articleInSC: newAlbumIn_SC, amountOfArticle: 1 }])
    } else {
      newAlbumIn_SC.amountOfArticle++
    }
    setTotalArticlesInSC(totalArticlesInSC + 1)
  }


  return (
    <div className="contMainResultSearchRecords">
      <div className="contMainResultLeft">
        <div className="contCard">
          <div className="contButton">
            <Button
              handleButton={resetSearch}
              text={'Delete'}
            />
          </div>
          <div className="contImageResultSearch">
            <figure className="contFigureResultSearch">
              <img className="imageResultSearch" src={`../../src/images/theBeatles/portadas/${articleMouseOver.image[0]}`} alt={articleMouseOver.title} />
            </figure>
          </div>
          <div className="contInfoResultSearch">
            <header className="headerTitleAlbum">
              <h5 className="titleAlbum">{articleMouseOver.title}</h5>
            </header>
            <div className="contLabelInfoAlbum">
              <div className="contLabelText">
                <span className="label">Label:</span>
                <span className="textInfo">{articleMouseOver.label}</span>
              </div>
              <div className="contLabelText released">
                <span className="label">Released:</span>
                <span className="textInfo">{articleMouseOver.released.toString().substring(0, 10)}</span>
              </div>
            </div>
            <div className="contStockPrice">
              {
                typeArticle === 'record' &&
                <div className="stockArticle">
                  <span className="stockSpan">
                    <i><FcHighBattery /></i>
                    {articleMouseOver.stock}
                  </span>
                </div>
              }
              <div className="containerPriceTax">
                <span className="Price">Price:<span className="valuePrice">{articleMouseOver.price}</span></span>
                <span className="Tax">(IVA) <span className="valueTax">{(articleMouseOver.price) * 0.19.toFixed(2)}</span></span>
              </div>
            </div>
          </div>
          <div className="contShoppingCart">
            <i className='iconAddToShoopingCart' onClick={() => handleButtonAddToCart(articleMouseOver._id)}>
              <MdAddShoppingCart />
            </i>
          </div>
        </div>
      </div >

      <div className="contMainResultRigth">
        <header className="headerResultSearch" >
          <h4 className="titleResultSearch">
            <span className="text">{`Result of Search ${typeArticle}s`}</span>
          </h4>
        </header>
        <RegistroArticleItem
        />
      </div>
    </div >
  )
}

export default ResultRecords