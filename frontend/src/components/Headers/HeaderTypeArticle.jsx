import React from 'react'
import { RiFolderMusicFill } from "react-icons/ri"

import '../../sass/componentsSass/Headers/HeaderTypeArticles.scss'

function HeaderTypeArticle({ article, isToggle, handleArticles, arrayImgs }) {
  function handleHeader() {
    handleArticles()
  }
  return (
    <header className={`headerTypeArticle ${!isToggle ? 'colorRed' : 'colorGreen'}`} onClick={handleHeader}>
      <figure className="figuresArticles">
        <ul className="ulImgs">
          {
            arrayImgs[0].map((image, index) => {
              return (
                <li key={index} className="liImgs">
                  <img className={`image ${!isToggle ? 'imgColorRed' : 'imgColorGreen'}`} src={`./src/images/theBeatles/${image}`} alt={`Image ${index}`} />
                </li>
              )
            })
          }
        </ul>
      </figure>
      <h4 className="titleTypeArticle">
        <span className="text">The Beatles</span>
        <i id="ico" className={`${!isToggle ? 'icoColorRed' : 'icoColorGreen'}`}><RiFolderMusicFill /></i>
        <span className="text">{article}</span>
      </h4>
      <figure className="figuresArticles">
        <ul className="ulImgs">
          {
            arrayImgs[1].map((image, index) => {
              return (
                <li key={index} className="liImgs liAnimated">
                  <img className={`image ${!isToggle ? 'imgColorRed' : 'imgColorGreen'}`} src={`./src/images/theBeatles/${image}`} alt={`Image ${index}`} />
                </li>
              )
            })
          }
        </ul>
      </figure>
    </header>
  )
}

export default HeaderTypeArticle