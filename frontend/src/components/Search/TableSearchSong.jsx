import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import Accordion from 'react-bootstrap/Accordion'
import 'bootstrap/dist/css/bootstrap.min.css'
import { MyScoreContext } from '../../context/MyContext.jsx'
import ButtonKlein from '../ButtonKlein.jsx'

import { IconContext } from "react-icons"
import { TbListDetails } from 'react-icons/tb'
import { MdAddShoppingCart } from 'react-icons/md'
import { FaShoppingCart, FaPlayCircle } from 'react-icons/fa'

import '../../sass/componentsSass/Songs/TableSearchSongs.scss'


function TableSearchSongs({ parSongs }) {
  const { articlesFilterd, SC_State, setSC_State,
    totalArticlesInSC, setTotalArticlesInSC, setSongOverMouse,
    songsOfBeatles, setSongsOfBeatles, setIndexCurrentSong, setCurrentSong, setTypeArticle } = useContext(MyScoreContext)

  const [errors, setErrors] = useState([])
  const [songsSorted, setSongsSorted] = useState(articlesFilterd)
  const [toggleSortIdSec, setToogleSortIdSec] = useState(false)
  const [toggleSortString, setToogleSortString] = useState(false)
  const [toggleSortYear, setToogleSortYear] = useState(false)
  const [toggleSortPrice, setToogleSortPrice] = useState(false)

  const navigate = useNavigate()

  async function fecthOfSongs() {
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

  useEffect(() => {
    fecthOfSongs()
    setTypeArticle("song")
  }, [])

  function handleMouseOver(parId) {
    const itemOfArticle = songsOfBeatles.find((elem) => elem._id === parId)
    setSongOverMouse(itemOfArticle)
  }

  function handlePlaySong(parId) {
    const itemOfArticle = articlesFilterd.find(elementArticle => elementArticle._id === parId)
    const indexOfArticle = articlesFilterd.findIndex(elementArticle => elementArticle._id === parId)
    setCurrentSong(itemOfArticle)
    setIndexCurrentSong(indexOfArticle)
    navigate("/player", { replace: false })
  }

  function handleButtonAddToCart(parId) {
    const newSongIn_SC = songsOfBeatles.find(song => song._id === parId)
    if (!newSongIn_SC) return
    const isIn_SC = SC_State.find(song => song.articleInSC._id === parId)

    if (isIn_SC === undefined) {
      setSC_State([...SC_State, { articleInSC: newSongIn_SC, amountOfArticle: 1 }])
    } else {
      isIn_SC.amountOfArticle++
    }
    setTotalArticlesInSC(totalArticlesInSC + 1)
  }

  // /////////////////////////////
  function sortByIdSec(parArray) {
    let resultArraySort = []
    if (Array.isArray(parArray)) {
      resultArraySort = parArray.sort((a, b) => {
        if (!toggleSortIdSec) {
          return (b.idSec - a.idSec)
        } else {
          return (a.idSec - b.idSec)
        }
      })
    } else {
      console.error('The argument of the function "sortByIdSec" must be an array')
    }
    setToogleSortIdSec(!toggleSortIdSec)
    setSongsSorted(resultArraySort)
  }
  function sortByString(parArray, parKey) {
    let resultArraySort = []
    if (Array.isArray(parArray) || typeof parKey === 'string') {
      resultArraySort = parArray.sort((a, b) => {
        if (toggleSortString) {
          if (a[parKey].toLowerCase() > b[parKey].toLowerCase()) {
            return -1
          } else if (a[parKey].toLowerCase() < b[parKey].toLowerCase()) {
            return 1
          } else {
            return 0
          }
        } else {
          if (a[parKey].toLowerCase() < b[parKey].toLowerCase()) {
            return -1
          } else if (a[parKey].toLowerCase() > b[parKey].toLowerCase()) {
            return 1
          } else {
            return 0
          }
        }
      })
    } else {
      return null
    }
    setToogleSortString(!toggleSortString)
    setSongsSorted(resultArraySort)
  }
  function sortByYear(parArray) {
    setToogleSortYear(!toggleSortYear)
    let resultArraySort = []
    if (Array.isArray(parArray)) {
      resultArraySort = parArray.sort((a, b) => {
        if (!toggleSortYear) {
          return (b.year - a.year)
        } else {
          return (a.year - b.year)
        }
      })
    } else {
      console.error('The argument of the function "sortByYear" must be an array')
    }
    setSongsSorted(resultArraySort)
  }
  function sortByPrice(parArray) {
    setToogleSortPrice(!toggleSortPrice)
    let resultArraySort = []
    if (Array.isArray(parArray)) {
      resultArraySort = parArray.sort((a, b) => {
        if (!toggleSortPrice) {
          return (b.price - a.price)
        } else {
          return (a.price - b.price)
        }
      })
    } else {
      console.error('The argument of the function "sortByPrice" must be an array')
    }
    setSongsSorted(resultArraySort)
  }

  return (
    <table striped='on' className="contTableStripedSongs" >
      <thead className="tableHeadSongs">
        <tr>
          <th>
            <ButtonKlein
              handleButton={() => sortByIdSec(articlesFilterd)}
              text={'N°'}
              parW={'34px'}
              parH={'auto'}
              parFS={'0.9rem'}
            />
          </th>
          <th></th>
          <th>
            <ButtonKlein
              handleButton={() => sortByString(articlesFilterd, 'title')}
              text={'Song'}
              parW={'72px'}
              parH={'auto'}
              parFS={'0.9rem'}
            />
          </th>
          <th>Album(s)</th>
          <th>
            <ButtonKlein
              handleButton={() => sortByYear(articlesFilterd)}
              text={'Year'}
              parW={'72px'}
              parH={'auto'}
              parFS={'0.9rem'}
            />
          </th>
          <th>Vocal(s)</th>
          <th>
            <ButtonKlein
              handleButton={() => sortByString(articlesFilterd, 'duration')}
              text={'Duration'}
              parW={'72px'}
              parH={'auto'}
              parFS={'0.9rem'}
            />
          </th>
          <th>
            <ButtonKlein
              handleButton={() => sortByPrice(articlesFilterd, 'price')}
              text={'Price (€)'}
              parW={'72px'}
              parH={'auto'}
              parFS={'0.9rem'}
            />
          </th>
          <th>
            <i>
              <TbListDetails
              />
            </i>
          </th>
          <th>
            <i className="icoShoppingCart">
              <FaShoppingCart
              />
            </i>
          </th>
        </tr>
      </thead>
      <tbody className="tableBodySongs">
        {
          //  ATENCION HAGO EL CAMBIO AQUI DE ARRAY DE SONGS A SOLO LOS FILTRADOS
          articlesFilterd.map((resultArticle, index) => {
            return (
              <tr key={index} className="containerArticleItem" onDoubleClick={(id) => handlePlaySong(resultArticle._id)} onMouseEnter={() => handleMouseOver(resultArticle._id)} >
                <td>{resultArticle.idSec}</td>
                <td>
                  <figure className="containerFigureTableResultSearch">
                    <ul className="UlImage" name={resultArticle.title} >
                      {resultArticle.image.length >= 0
                        ? resultArticle.image.map((img, index) => {
                          return (
                            <li className="liImage" key={index} value={resultArticle.album} >
                              <img className="imageTableResultSearch" src={`../src/images/theBeatles/portadas/${img}`} alt={resultArticle.title} />
                            </li>
                          )
                        })
                        : undefined
                      }
                    </ul>
                  </figure>
                </td>
                <td>{resultArticle.title}</td>
                <td>
                  <Accordion className="w-75 contAccordionAlbums">
                    <Accordion.Item key={index} className="ItemAccordionAlbums" eventKey="0">
                      <Accordion.Header className="w-100 headerAccordionAlbums">
                        <h6 className="albumsLabel w-100 fs-6"> </h6>
                      </Accordion.Header>
                      <Accordion.Body className="my-2 accordionBody">
                        {Array.isArray(resultArticle.album)
                          ? resultArticle.album.map((album, index) => {
                            return (
                              <p key={index} className="dataAlbums">{album}</p>
                            )
                          })
                          : null
                        }
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </td>
                <td>{resultArticle.year}</td>
                <td>{resultArticle.vocals}</td>
                <td>{resultArticle.duration}</td>
                <td>{resultArticle.price}</td>
                <td>
                  {/* <Button
                    handleButton={(id) => handlePlaySong(resultArticle._id)}
                    text={'Details'}
                  /> */}
                  <IconContext.Provider
                    value={{ color: "green", size: "1.2rem", className: "global-class-name" }}
                  >
                    <div id="contIcoPlay" onClick={(id) => handlePlaySong(resultArticle._id)}>
                      <FaPlayCircle />
                    </div>
                  </IconContext.Provider>
                </td>
                <td>
                  <i>
                    <MdAddShoppingCart
                      onClick={() => handleButtonAddToCart(resultArticle._id)} onDoubleClick={() => handleButtonAddToCart(resultArticle._id)}
                    />
                  </i>
                </td>
              </tr>
            )
          })
        }
      </tbody >
    </table >
  )
}

export default TableSearchSongs