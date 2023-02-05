import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import Button from '../Button.jsx'
// import CompTable from './CompTable.jsx'
import TableSearchSong from './TableSearchSong.jsx'

import { MdAddShoppingCart } from "react-icons/md"
import { MyScoreContext } from '../../context/MyContext.jsx'

import '../../sass/componentsSass/Search/ResultSongs.scss'


function ResultSongs() {
  const { SC_State, setSC_State, totalArticlesInSC, setTotalArticlesInSC,
    articlesFilterd, setArticlesFilterd,
    typeArticle,
    songMouseOver, setSongMouseOver, iniSongMouseOver } = useContext(MyScoreContext)

  const navigate = useNavigate()

  function resetSearch() {
    setArticlesFilterd([])
    setSongMouseOver(iniSongMouseOver)
    navigate(-1)
  }

  function handleButtonAddToCart(parId) {
    const newSongIn_SC = articlesFilterd.find(song => song._id === songMouseOver._id)
    const isIn_SC = SC_State.find((song) => song.articleInSC._id === parId)

    if (isIn_SC === undefined) {
      setSC_State([...SC_State, { articleInSC: newSongIn_SC, amountOfArticle: 1 }])
    } else {
      newSongIn_SC.amountOfArticle++
    }
    setTotalArticlesInSC(totalArticlesInSC + 1)
  }


  return (
    <div className="contMainResultSearch">
      <div className="contGlobalSongs">
        <div className="contMainResultLeft">
          <div className="contButton">
            <Button
              handleButton={resetSearch}
              text={'Delete'}
            />
          </div>
          <div className="contImageResultSearch">
            <figure className="contFigureResultSearch">
              <img className="imgResultSearch" src={`../src/images/theBeatles/portadas/${songMouseOver.image[0]}`} alt={songMouseOver.title} />
            </figure>
          </div>
          <div className="contInfoResultSearch">
            <header className="headerTitleSong">
              <h5 className="titleSong">{songMouseOver.title}</h5>
            </header>
            <div className="contAlbumDuration">
              <div className="contLabelText">
                <span className="label">Album(s):</span>
                <span className="textInfo">{songMouseOver.album}</span>
              </div>
              <div className="contLabelText duration">
                <span className="label">Duration:</span>
                <span className="textInfo">{songMouseOver.duration}</span>
              </div>
            </div>
            <div className="contPriceTax">
              <span className="Price">Price (€):</span><span className="valuePrice">{songMouseOver.price}</span>
              <span className="Tax">(IVA) <span className="valueTax">{(songMouseOver.price * 0.19).toFixed(2)}</span></span>
            </div>
          </div>
          <div className="contShoppingCart">
            <i className='iconAddToShoopingCart' onClick={() => handleButtonAddToCart(songMouseOver._id)}>
              <MdAddShoppingCart />
            </i>
          </div>
        </div>

        <div className="contMainResultRigth">
          <header className="headerResultSearch" >
            <h4 className="titleResultSearch">
              <span className="text">{`Result of Search ${typeArticle}s`}</span>
            </h4>
          </header>
          <TableSearchSong
            // parSongs={articlesFilterd}
          />
        </div>
      </div>
    </div >
  )
}

export default ResultSongs