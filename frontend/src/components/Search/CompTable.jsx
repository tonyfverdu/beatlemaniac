import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { MyScoreContext } from '../../context/MyContext.jsx'
import Table from 'react-bootstrap/Table'
import Button from '../Button'
import ButtonKlein from '../ButtonKlein'

import { TbListDetails } from 'react-icons/tb'
import { MdAddShoppingCart } from 'react-icons/md'
import { FaShoppingCart } from 'react-icons/fa'

import '../../sass/componentsSass/Search/CompTable.scss'


function CompTable() {
  const { articlesFilterd, SC_State, setSC_State, setTypeArticle,
    totalArticlesInSC, setTotalArticlesInSC, setSongOverMouse,
    songsOfBeatles, setIndexCurrentSong, setCurrentSong  } = useContext(MyScoreContext)

  const [songsSorted, setSongsSorted] = useState(songsOfBeatles)
  const [toggleSortIdSec, setToogleSortIdSec] = useState(false)
  const [toggleSortString, setToogleSortString] = useState(false)
  const [toggleSortYear, setToogleSortYear] = useState(false)
  const [toggleSortPrice, setToogleSortPrice] = useState(false)

  const navigate = useNavigate()

  // async function fecthOfSongs() {
  //   setIsToggle(!isToggle)
  //   const response = await fetch('http://127.0.0.1:3001/songs', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(data => data.json())
  //     .catch(err => console.log('Error in fetch:  ', err))

  //   if (response.status === 200) {
  //     const { songs } = response
  //     // eslint-disable-next-line no-const-assign
  //     // const dataRecords = response.recordsFound.map(elem => elem)
  //     setSongsFound(songs)
  //     setSongsOfBeatles(songs)
  //   } else if (response.status === 400) {
  //     const result = await response.json()
  //     for (const row of result.message) {
  //       for (const key in row) {
  //         errors.push(row[key])
  //       }
  //     }
  //     setErrors(errors)
  //   } else {
  //     setErrors(['Etwas ist schief gelaufen'])
  //   }
  // }

  // useEffect(() => {
  //   fecthOfSongs()
  //   setTypeArticle("song")
  // }, [])

  function handleMouseOver(parId) {
    const itemOfArticle = articlesFilterd.find((elem) => elem._id === parId)
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
    setTypeArticle("song")
    const newSongIn_SC = articlesFilterd.find(song => song._id === parId)
    const isIn_SC = SC_State.find(song => song.articleInSC._id === parId)

    if (isIn_SC === undefined) {
      setSC_State([...SC_State, { articleInSC: newSongIn_SC, amountOfArticle: 1 }])
    } else {
      isIn_SC.amountOfArticle++
    }
    setTotalArticlesInSC(totalArticlesInSC + 1)
    setTypeArticle("")
  }

  // /////////////////////////////
  function sortByIdSec(parArray) {
    setToogleSortIdSec(!toggleSortIdSec)
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
    <div className="contTableResultSong">
      <Table striped="on" className="containerTableStriped" >
        <thead className="tableHead">
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
        <tbody className="tableBody">
          {
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
                    <ol className="OlAlbum" name={resultArticle.title} >
                      {resultArticle.album.length >= 0

                        ? resultArticle.album.map((album, index) => {
                          return (
                            <li key={index} className="liAlbum">
                              <span className="nameAlbum">{`${album}`}</span>
                            </li>
                          )
                        })
                        : undefined
                      }
                    </ol>
                  </td>
                  <td>{resultArticle.year}</td>
                  <td>{resultArticle.vocals}</td>
                  <td>{resultArticle.duration}</td>
                  <td>{resultArticle.price}</td>
                  <td>
                    <Button
                      handleButton={(id) => handleViewDetails(resultArticle._id)}
                      text={'Details'}
                    />
                  </td>
                  <td>
                    <i>
                      <MdAddShoppingCart
                        onClick={() => handleButtonAddToCart(resultArticle._id)}
                      />
                    </i>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

export default CompTable