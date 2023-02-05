import React from 'react'
import ButtonKlein from '../ButtonKlein.jsx'
import { FaHeart } from "react-icons/fa"


import '../../sass/componentsSass/Home/CustomAlbum.scss'


function CustomAlbum() {
  const imagesComp = {
    movement: 'beatlesMovement1.gif'
  }
  function goCustomRecord() {
    console.log('ya voyyyyyyyyyy')
  }


  return (
    <div className="contCustomRecord">
      <div className="contCustomUp">
        <header className="headerTitleComp">
          <h4 className="textTitleComp">You own Beatles' Record</h4>
        </header>
        <div className="contOfButton">
          <ButtonKlein
            handleButton={goCustomRecord}
            text={'Create now'}
            parW={'6rem'}
            parH={'2rem'}
            parFS={'0.9rem'}
          />
        </div>
        <div className="contTextCustom">
          <span className="textCustom">
            Your own record whith the songs you love
          </span>
          <i className="iconHeart"><FaHeart /></i>
        </div>
      </div>

      <div className="contHalfInfo">
        <div className="sandwichQuadrat">
          <span className="textSandwich">
            <q>That is amazing, at last I can have my own <strong>Beatles albums</strong></q>
            <q>in the format I want and with the images I wish !!</q>
          </span>
        </div>
      </div>
      <div className="contImgMovement">
        <figure className="figureImgMovement">
          <img className="imgMovement" src={`src/images/theBeatles/${imagesComp.movement}`} alt={'Image of movement'} />
        </figure>
      </div>

      <div className="contPricesInfo">
        <header className="headerPricesInfo">
          <h4 className="titlePricesInfo">Prices of Custom Record</h4>
        </header>
        <div className="contPriceByRecord">
          <span className="priceByRecord">49€</span>
          <span className="explanationPrice">(one price by record)</span>
        </div>
        <ul className="ulFormatPrices">
          <li className="liFormatPrices">
            <span className="format">Format:</span>
            <span className="typeFormat">Viny</span>
            <span className="formatPrice">+ 6€</span>
          </li>
          <li className="liFormatPrices">
            <span className="format">Format:</span>
            <span className="typeFormat">CD</span>
            <span className="formatPrice">+ 3€</span>
          </li>
          <li className="liFormatPrices">
            <span className="format">Format:</span>
            <span className="typeFormat">MP3 (USB)</span>
            <span className="formatPrice">+ 2€</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CustomAlbum