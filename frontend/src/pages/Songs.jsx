import React, { useState, useEffect, useContext } from 'react'
import { MyScoreContext } from '../context/MyContext'
import Button from '../components/Button.jsx'
import TableSongs from '../components/Songs/TableSongs.jsx'
import HeaderTypeArticle from '../components/Headers/HeaderTypeArticle.jsx'
import QuerySongs from '../components/Querys/QuerySongs.jsx'

import { MdAddShoppingCart } from "react-icons/md"
import '../sass/componentsSass/Songs/Songs.scss'


function Songs() {
  const textQuery = "Songs Querys"
  const arrayImag1 = ['Beatlesforsale.jpg', 'CoverLetItBe.jpg']
  const arrayImag2 = ['betlesMov2.gif', 'Revolver.jpg']

  const [errors, setErrors] = useState([])
  const [isToggle, setIsToggle] = useState(false)

  const { SC_State, setSC_State, setTypeArticle, totalArticlesInSC, setTotalArticlesInSC,
    songMouseOver, setSongOverMouse, iniSongMouseOver, songsOfBeatles, setSongsOfBeatles } = useContext(MyScoreContext)

  useEffect(() => {
    fecthOfSongs()
    setTypeArticle('song')
    setSongOverMouse(songMouseOver)
    setIsToggle(false)
  }, [])

  async function fecthOfSongs() {
    setIsToggle(!isToggle)
    const fetchDataSongs = await fetch('http://127.0.0.1:3001/songs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const response = await fetchDataSongs.json()
    const { message, songs } = response

    if (response.status === 200) {
      console.log('All OK:  ', message)
      setSongsOfBeatles(songs)
    } else if (response.status === 400) {
      const result = await response.json()
      for (const row of result.message) {
        for (const key in row) {
          errors.push(row[key])
        }
      }
      setErrors(errors)
    } else {
      setErrors(['Etwas ist schief gelaufen'])
    }
  }

  function resetSongsList() {
    setSongOverMouse(iniSongMouseOver)
  }

  const handleSongs = async function fetchDataSongs() {
    fecthOfSongs()
  }

  function handleButtonAddToCart(parId) {
    setTypeArticle('song')
    const newSongIn_SC = songsOfBeatles.find(element => element._id === songMouseOver._id)
    const isIn_SC = SC_State.find((song) => song.articleInSC._id === parId)

    if (isIn_SC === undefined) {
      setSC_State([...SC_State, { articleInSC: newSongIn_SC, amountOfArticle: 1 }])
    } else {
      newSongIn_SC.amountOfArticle++
    }
    setTotalArticlesInSC(totalArticlesInSC + 1)
  }


  return (
    <div className="contShowSongs">
      <HeaderTypeArticle
        article={'Songs'}
        isToggle={isToggle}
        handleArticles={handleSongs}
        arrayImgs={[arrayImag1, arrayImag2]}
      />
      {
        isToggle &&
        <>
          <QuerySongs
            titleQuery={textQuery}
          />

          <div className="contOfTable">
            <div className="contMainResultLeft">
              <div className="contButton">
                <Button
                  handleButton={resetSongsList}
                  text={'Delete'}
                />
              </div>
              <div className="contImagenResultSearch">
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
              <TableSongs
              />
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default Songs