import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { MyScoreContext } from '../../context/MyContext.jsx'
import Table from 'react-bootstrap/Table'
import Button from '../Button'
import ButtonKlein from '../ButtonKlein'

import { TbListDetails } from 'react-icons/tb'
import { MdAddShoppingCart } from 'react-icons/md'
import { FaShoppingCart } from 'react-icons/fa'

import '../../sass/componentsSass/Search/CompTable.scss'


function RegistroSongItem() {
  const { articlesFilterd,
    SC_State, setSC_State, totalArticlesInSC,
    setTotalArticlesInSC, setSongOverMouse, songsOfBeatles } = useContext(MyScoreContext)

  const [songsSorted, setSongsSorted] = useState(articlesFilterd)
  const [toggleSortIdSec, setToogleSortIdSec] = useState(false)
  const [toggleSortString, setToogleSortString] = useState(false)
  const [toggleSortYear, setToogleSortYear] = useState(false)
  const [toggleSortPrice, setToogleSortPrice] = useState(false)

  const navigate = useNavigate()

  // useEffect(() => {
  //   setTypeArticle("song")
  // }, [])

  function handleMouseOver(parId) {
    const itemOfArticle = articlesFilterd.find((elem) => elem._id === parId)
    setSongOverMouse(itemOfArticle)
  }

  // function handleViewDetails(parId) {
  //   const itemOfArticle = articlesFilterd.find(elementArticle => elementArticle._id === parId)
  //   setPuchaseItemSelect(itemOfArticle)
  //   console.log(itemOfArticle)
  //   navigate(`/shop/articledetail:${itemOfArticle._id}`, { replace: false })
  // }

  function handleButtonAddToCart(parId) {
    // setTypeArticle("song")
    const newSongIn_SC = songsOfBeatles.find(song => song._id === parId)
    const isIn_SC = SC_State.find(song => song.articleInSC._id === parId)

    if (isIn_SC === undefined) {
      setSC_State([...SC_State, { articleInSC: newSongIn_SC, amountOfArticle: 1 }])
    } else {
      isIn_SC.amountOfArticle++
    }
    setTotalArticlesInSC(totalArticlesInSC + 1)
    // setTypeArticle("")
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
    <div className="contTableRegistroArticleItem">
      <div className="contTableResultSearch">
        <Table striped className="contTableStriped" >
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
                  parFS={'0.8rem'}
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
              articlesFilterd.map((art, index) => {
                return (
                  <tr key={index} className="contArticleItem" onMouseEnter={() => handleMouseOver(art._id)} >
                    <td>{art.idSec}</td>
                    <td>
                      <figure className="contFigureTableResultSearch">
                        <ul className="UlImage" name={art.title} >
                          {art.image.length >= 0
                            ? art.image.map((img, index) => {
                              return (
                                <li className="liImage" key={index} value={art.album} >
                                  <img className="imagTableResultSearch" src={`../src/images/theBeatles/portadas/${img}`} alt={art.title} />
                                </li>
                              )
                            })
                            : undefined
                          }
                        </ul>
                      </figure>
                    </td>
                    <td>{art.title}</td>
                    <td>
                      <ol className="OlAlbum" name={art.title} >
                        {art.album.length >= 0

                          ? art.album.map((album, index) => {
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
                    <td>{art.year}</td>
                    <td>{art.vocals}</td>
                    <td>{art.duration}</td>
                    <td>{art.price}</td>
                    <td>
                      {/* <Button
                        handleButton={(id) => handleViewDetails(art._id)}
                        text={'Details'}
                      /> */}
                    </td>
                    <td>
                      <i>
                        <MdAddShoppingCart
                          onClick={() => handleButtonAddToCart(art._id)}
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
    </div>
  )
}

export default RegistroSongItem