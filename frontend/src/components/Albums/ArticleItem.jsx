import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom"

import { MyScoreContext } from '../../context/MyContext.jsx'

import Button from '../Button'
import { FcHighBattery } from "react-icons/fc"

import '../../sass/componentsSass/ArticleItem.scss'


function ArticleItem({ idArticle }) {
  const text = 'Add'
  const [itemOfRecord, setItemOfRecord] = useState({})

  const { setPuchaseItemSelect, SC_State, setSC_State,
    totalArticlesInSC, setTotalArticlesInSC, setTypeArticle, recordsOfBeatles } = useContext(MyScoreContext)

  const navigate = useNavigate()

  useEffect(() => {
    setItemOfRecord(recordsOfBeatles.find((record) => record._id === idArticle))
    setTypeArticle('record')
  }, [])

  function handleButtonAddToCart(parId) {
    setTypeArticle('record')
    const newAlbumIn_SC = recordsOfBeatles.find((album) => album._id === parId)
    const isIn_SC = SC_State.find((album) => album.articleInSC._id === parId)

    if (isIn_SC === undefined) {
      setSC_State([...SC_State, { articleInSC: newAlbumIn_SC, amountOfArticle: 1 }])
    } else {
      isIn_SC.amountOfArticle++
    }
    setTotalArticlesInSC(totalArticlesInSC + 1)
    setTypeArticle('')
  }

  function handleDoubleClic() {
    setPuchaseItemSelect(itemOfRecord)
    navigate(`/shop/articledetail:${itemOfRecord._id}`, { replace: false })
  }


  return (
    <div className="containerMainArticleItem" onDoubleClick={handleDoubleClic}>
      <header className="headerArticle">
        <header className="headerArtickleBrand">
          <h3 className="titleBand">{itemOfRecord.author_band}</h3>
          <h3 className="titleBrand">{itemOfRecord.label}</h3>
        </header>
        <h5 className="departamentArticle">{itemOfRecord.title}</h5>
      </header>
      <div className="bodyArticle">
        <figure className="figureArticle">
          <img className="imageArticle" src={`../src/images/theBeatles/portadas/${itemOfRecord.image}`} alt={itemOfRecord.title} />
        </figure>
        <div className="infoArticle">
          <div className="descriptionArticle">
            <span className="descriptionShort">
              {itemOfRecord.comments}
            </span>
          </div>
        </div>
      </div>

      <div className="footerArticle">
        <div className="containerStock">
          <i><FcHighBattery /></i>
          <span className="Stock">Stock:<span className="valueStock">{itemOfRecord.stock}</span></span>
          <div className="containerOfButton">
            <Button className="buttonAddToCart"
              handleButton={() => handleButtonAddToCart(itemOfRecord._id)}
              text={text}
            />
          </div>
        </div>
        <div className="containerPriceTax">
          <span className="Price">Price:<span className="valuePrice">{itemOfRecord.price}</span></span>
          <span className="Tax"><span className="titleTax">VAT-19%</span><span className="valueTax">{itemOfRecord.price * 0.19}</span></span>
        </div>
      </div>
    </div>
  )
}

export default ArticleItem