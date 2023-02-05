import React, { useState, useContext } from 'react'
import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'
import 'bootstrap/dist/css/bootstrap.min.css'
import ButtonKlein from '../ButtonKlein'
import { useNavigate } from "react-router-dom"
import { MyScoreContext } from '../../context/MyContext.jsx'

import { TbListDetails } from 'react-icons/tb'
import { MdAddShoppingCart } from 'react-icons/md'
import { FaShoppingCart } from 'react-icons/fa'
import { FcHighBattery } from 'react-icons/fc'

import '../../sass/componentsSass/Search/RegistroArticleItem.scss'


function RegistroArticleItem() {
  const { articlesFilterd,
    setPuchaseItemSelect, SC_State, setSC_State, totalArticlesInSC,
    setTotalArticlesInSC, setArticleMouseOver, recordsOfBeatles } = useContext(MyScoreContext)

  const [recordSorted, setRecordSorted] = useState(articlesFilterd)
  const [toggleSortIdSec, setToogleSortIdSec] = useState(false)
  const [toggleSortString, setToogleSortString] = useState(false)
  const [toggleSortPrice, setToogleSortPrice] = useState(false)
  const navigate = useNavigate()


  function handleViewDetails(parId) {
    const itemArticle = articlesFilterd.find(elementArticle => elementArticle._id === parId)
    setPuchaseItemSelect(itemArticle)
    navigate(`/shop/articledetail:${itemArticle._id}`, { replace: false })
  }

  function handleButtonAddToCart(parId) {
    const newAlbumIn_SC = recordsOfBeatles.find((album) => album._id === parId)
    const isIn_SC = SC_State.find((album) => album.articleInSC._id === parId)

    if (isIn_SC === undefined) {
      setSC_State([...SC_State, { articleInSC: newAlbumIn_SC, amountOfArticle: 1 }])
    } else {
      isIn_SC.amountOfArticle++
    }
    setTotalArticlesInSC(totalArticlesInSC + 1)
  }

  function handleMouseOver(parId) {
    const itemArticle = articlesFilterd.find((element) => element._id === parId)
    setArticleMouseOver(itemArticle)
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
    setRecordSorted(resultArraySort)
    setToogleSortIdSec(!toggleSortIdSec)
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
    setRecordSorted(resultArraySort)
    setToogleSortString(!toggleSortString)
  }
  function sortByPrice(parArray) {
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
    setRecordSorted(resultArraySort)
    setToogleSortPrice(!toggleSortPrice)
  }


  return (
    <Table striped className="contTableStripedAlbums" >
      <thead className="tableHead">
        <tr>
          <th>
            <ButtonKlein
              handleButton={() => sortByIdSec(articlesFilterd)}
              text={'N°'}
              parW={'34px'}
              parH={'auto'}
              parFS={'0.8rem'}
            />
          </th>
          <th></th>
          <th>
            <ButtonKlein
              handleButton={() => sortByString(articlesFilterd, 'title')}
              text={'Album'}
              parW={'72px'}
              parH={'auto'}
              parFS={'0.8rem'}
            />
          </th>
          <th>
            <ButtonKlein
              handleButton={() => sortByString(articlesFilterd, 'label')}
              text={'Label'}
              parW={'72px'}
              parH={'auto'}
              parFS={'0.8rem'}
            />
          </th>
          <th>
            <ButtonKlein
              handleButton={() => sortByString(articlesFilterd, 'released')}
              text={'Released'}
              parW={'72px'}
              parH={'auto'}
              parFS={'0.8rem'}
            />
          </th>
          <th>
            Comments
          </th>
          <th>
            <i className="icoDiscount">
              <FcHighBattery />
            </i>
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
      <tbody className="tableBodyAlbums">
        {
          articlesFilterd.map((art, index) => {
            return (
              <tr key={index} className="contArticleItem" onDoubleClick={(id) => handleViewDetails(art._id)} onMouseEnter={() => handleMouseOver(art._id)} >
                <td>{art.idSec}</td>
                <td>
                  <figure className="figureTableSearchAlbum">
                    <img className="imgSearchAlbum" src={`../../src/images/theBeatles/portadas/${art.image}`} alt={art.title} />
                  </figure>
                </td>
                <td>{art.title}</td>
                <td>{art.label}</td>
                <td>{art.released.slice(0, 10)}</td>
                <td>
                  <Accordion className="w-75 contAccordion">
                    <Accordion.Item className="ItemAccordion" eventKey="0">
                      <Accordion.Header className="w-100 headerAccordion bg-secondary">
                        <span className="titleComments w-100 fs-6"></span>
                      </Accordion.Header>
                      <Accordion.Body className="my-2 accordionBody">
                        <span className="comments">{art.comments}</span>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </td>
                <td>{art.stock}</td>
                <td>{art.price}</td>
                <td>
                  <ButtonKlein
                    handleButton={(id) => handleViewDetails(art._id)}
                    text={'Details'}
                    parW={'58px'}
                    parH={'auto'}
                    parFS={'0.8rem'}
                  />
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
  )
}

export default RegistroArticleItem

