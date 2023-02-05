import React, { useState, useEffect, useContext } from 'react'
import { MyScoreContext } from '../../../../context/MyContext.jsx'
import ButtonKlein from '../../../ButtonKlein.jsx'
import Accordion from 'react-bootstrap/Accordion'

import { TbListDetails } from 'react-icons/tb'
import { MdAddShoppingCart } from 'react-icons/md'
import { FaShoppingCart } from 'react-icons/fa'

import '../../../../sass/componentsSass/Player/PlayerMusic/TableSongsOfAlbum.scss'


function TableSongsOfAlbum() {
  const { songsOfBeatles, articlesFilterd, setIndexCurrentSong, setCurrentSong, selectedAlbum } = useContext(MyScoreContext)
  const [toggleSortIdSec, setToogleSortIdSec] = useState(false)
  const [toggleSortString, setToogleSortString] = useState(false)
  const [toggleSortYear, setToogleSortYear] = useState(false)
  const [songsSorted, setSongsSorted] = useState(songsOfBeatles)

  //  3.-  Show songs of albums
  const [songsInAlbum, setSongsInAlbum] = useState([])

  //  6.-  Search songs in album
  function searchElementInArrayByName(parArrayBase, parName) {
    const elementsFounds = []
    function checkAlbum(parAlbumName) {
      return parAlbumName === selectedAlbum.title
    }
    if (Array.isArray(parArrayBase) && typeof parName === 'string') {
      parArrayBase.map(item => {
        //  algoritmo particular to Problem
        if (item.album.some(checkAlbum)) {
          elementsFounds.push(item)
          return item
        }
      })
      setSongsInAlbum(elementsFounds)
    } else {
      console.error('Error:  The arguments of the function "searchElementInArrayByName" must be an array and a string !!')
      setSongsInAlbum(null)
    }
  }

  useEffect(() => {
    searchElementInArrayByName(songsOfBeatles, selectedAlbum.title)
  }, [selectedAlbum])

  function handlePlaySong(parId) {
    const itemOfArticle = articlesFilterd.find(elementArticle => elementArticle._id === parId)
    // const indexOfArticle = articlesFilterd.findIndex(elementArticle => elementArticle._id === parId)
    setCurrentSong(itemOfArticle)
    // setIndexCurrentSong(indexOfArticle)
  }

  // /////////////////////////////
  function sortById(parArray) {
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
    setToogleSortString(!toggleSortString)
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


  return (
    <table striped='on' className="tableSongsOfAlbum" >
      <thead className="tableHeadSongs">
        <tr>
          <th>
            <ButtonKlein
              handleButton={() => sortById(songsInAlbum)}
              text={'N°'}
              parW={'24px'}
              parH={'auto'}
              parFS={'0.7rem'}
            />
          </th>
          <th></th>
          <th>
            <ButtonKlein
              handleButton={() => sortByString(songsInAlbum, 'title')}
              text={'Song'}
              parW={'38px'}
              parH={'auto'}
              parFS={'0.7rem'}
            />
          </th>
          <th>Album(s)</th>
          <th>
            <ButtonKlein
              handleButton={() => sortByYear(songsInAlbum)}
              text={'Year'}
              parW={'38px'}
              parH={'auto'}
              parFS={'0.7rem'}
            />
          </th>
          <th>Vocal(s)</th>
          <th>
            <ButtonKlein
              handleButton={() => sortByString(songsInAlbum, 'duration')}
              text={'Duration'}
              parW={'55px'}
              parH={'auto'}
              parFS={'0.7rem'}
            />
          </th>
        </tr>
      </thead>

      <tbody className="tableBodySongs">
        {
          //  ATENCION HAGO EL CAMBIO AQUI DE ARRAY DE SONGS A SOLO LOS FILTRADOS
          songsInAlbum.map((song, index) => {
            return (
              <tr key={song.idSec} className="containerArticleItem" onDoubleClick={(id) => handlePlaySong(song._id)} >
                <td>{song.idSec}</td>
                <td>
                  <figure className="containerFigureTableResultSearch">
                    <ul className="UlImage" name={song.title} >
                      {song.image.length >= 0
                        ? song.image.map((img, index) => {
                          return (
                            <li className="liImage" key={index} value={song.album} >
                              <img className="imageTableResultSearch" src={`../src/images/theBeatles/portadas/${img}`} alt={song.title} />
                            </li>
                          )
                        })
                        : undefined
                      }
                    </ul>
                  </figure>
                </td>
                <td>{song.title}</td>
                <td>
                  <Accordion className="w-100 contAccordionAlbums">
                    <Accordion.Item key={index} className="ItemAccordionAlbums" eventKey="0">
                      <Accordion.Header className="w-100 headerAccordionAlbums">
                        <h6 className="albumsLabel w-100 fs-6"> </h6>
                      </Accordion.Header>
                      <Accordion.Body className="my-2 accordionBody">
                        {Array.isArray(song.album)
                          ? song.album.map((album, index) => {
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
                <td>{song.year}</td>
                <td>{song.vocals}</td>
                <td>{song.duration}</td>
              </tr>
            )
          })
        }
      </tbody >
    </table>
  )
}

export default TableSongsOfAlbum