import React, { useState, useEffect, useContext, useRef } from 'react'
import { MyScoreContext } from '../../../../context/MyContext.jsx'

import ButtonKlein from '../../../ButtonKlein.jsx'
import Accordion from 'react-bootstrap/Accordion'
import TableSongsOfAlbum from './TableSongsOfAlbum.jsx'
import '../../../../sass/componentsSass/Player/PlayerMusic/CompSideBarAlbum.scss'


function CompSideBarAlbum() {
  const { currentSong, songsOfBeatles, setSongsOfBeatles, selectedAlbum, setSelectedAlbum } = useContext(MyScoreContext)
  const imageLogo = 'BeatlesManic2.jpg'
  const sideBarElem = useRef()
  const [errors, setErrors] = useState([])
  const [toggleBarElem, setToggleBarElem] = useState(false)
  const [isToggleAccordion, setIsToggleAccordion] = useState(true)
  const [songsInAlbum, setSongsInAlbum] = useState(songsOfBeatles)

  //  1.-  get Album of currentSong
  async function fetchDataRecord(parTitle) {
    const titleAlbum = parTitle
    const urlBacketget = 'http://127.0.0.1:3001/records/record'
    const fecthGetRecordByTitle = await fetch(`${urlBacketget}/?title=${titleAlbum}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const response = await fecthGetRecordByTitle.json()

    if (fecthGetRecordByTitle.status === 200) {
      setSelectedAlbum(response.record)
    } else if (fecthGetRecordByTitle.status === 400) {
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
    fetchDataRecord(currentSong.album[0])
  }, [])

  function toogleBarElem() {
    setToggleBarElem(!toggleBarElem)
    if (!toggleBarElem) {
      sideBarElem.current.style.width = "34%"
      sideBarElem.current.style.opacity = "1"
    } else if (toggleBarElem) {
      sideBarElem.current.style.width = "0%"
      sideBarElem.current.style.opacity = "0"
    }
  }

  // ///   Cambiar luego en un componente aparte
  async function fecthGetAllSongs() {
    const urlBackedQuery = 'http://127.0.0.1:3001/songs'
    const fetchDataSongs = await fetch(urlBackedQuery, {
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

  function searchElementInArrayByName(parArrayBase, parName) {
    function checkAlbum(parAlbumName) {
      return parAlbumName === currentSong.album[0].title
    }
    if (Array.isArray(parArrayBase) && typeof parName === 'string') {
      const elementsFounds = []
      parArrayBase.map(item => {
        //  algoritmo particular to Problem
        if (item.album.some(checkAlbum)) {
          elementsFounds.push(item)
          return item
        }
      })
      setSongsInAlbum(elementsFounds)
      return elementsFounds
    } else {
      console.error('Error:  The arguments of the function "" must be an array and a string !!')
      setSongsInAlbum(null)
    }
  }

  async function handleClickAccordion(ev) {
    setIsToggleAccordion(!isToggleAccordion)
    if (isToggleAccordion) {
      await fecthGetAllSongs()
      searchElementInArrayByName(songsOfBeatles, selectedAlbum.title)
    }
  }


  return (
    <>
      <div className="contSidePanel" ref={sideBarElem} style={{ width: "0px", opacity: '0' }}>
        <div className="contSPTopAlbum">
          <div className="TopLeftSPArticleBrand">
            <div className="contTopSideSP">
              <figure className="figureLogoBeatlesmaniac">
                <img className="imageLogo" src={`../src/images/theBeatles/BeatlesManiac/${imageLogo}`} alt="Image Logo Beatlesmaniacs" />
              </figure>
              <div className="contTopRigth">
                <div className="contTopTop">
                  <div className="firstPart">
                    <span className="band">{selectedAlbum.author_band}</span>
                    <span className="theAlbum">Album</span>
                  </div>
                  <div className="contLabel">
                    <span className="labelLabel">Label: </span>
                    <span className="label">{selectedAlbum.label}</span>
                  </div>
                </div>
                <div className="contTopDown">
                  <h4 className="titleAlbum">{selectedAlbum.title}</h4>
                  <div className="contTrack">
                    <span className="tracks">{selectedAlbum.trackCount}</span>
                    <span className="labelTracks">tracks</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="contDownSide">
              <div className="contTypeAlbum">
                <div className="contTypeGenre">
                  <span className="labelTypeAlbum">Type Album:</span>
                  <span className="collectionType">{selectedAlbum.collectionType}</span>
                  <span className="genre">{selectedAlbum.genre}</span>
                </div>
                <div className="contReleased">
                  <span className="labelReleased">Released:</span>
                  <span className="released">{selectedAlbum.released.slice(0, 10)}</span>
                </div>
              </div>
              <div className="contCopyright">
                <span className="copyright">{selectedAlbum.copyright}</span>
              </div>
            </div>
          </div>

          <div className="TopHalftSPAlbum">
            <figure className="contFigureAlbum">
              <img className="imageAlbum" src={`../src/images/theBeatles/portadas/${selectedAlbum.image[0]}`} alt={selectedAlbum.title} />
            </figure>
          </div>
        </div>

        <div className="contSPMiddleAlbum">
          <div className="contDescriptionShort">
            <span className="spanDescriptionShort">{selectedAlbum.comments}</span>
          </div>
          <div className="contAccordionAlbum" onClick={(ev) => handleClickAccordion(ev)}>
            <Accordion className="AccordionAlbum container" defaultActiveKey="1">
              <Accordion.Item className="AccordionItem container" eventKey="0">
                <Accordion.Header className="accordionHeader container"><span className="textOfImagesAlbums"><b>{`${selectedAlbum.trackCount} Tracks of ${selectedAlbum.title}`}</b></span></Accordion.Header>
                <Accordion.Body className="accordionBody">
                  <div className="contSongOfAlbum">
                    <div className="contTableSongsOfAlbum">
                      <TableSongsOfAlbum
                        parSongs={songsInAlbum}
                      />
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>

      <div className="contButtonToggle">
        <ButtonKlein
          handleButton={toogleBarElem}
          text={'Album'}
          parW={'4rem'}
          parH={'2rem'}
          parFS={'0.9rem'}
        />
      </div>
    </>
  )
}

export default CompSideBarAlbum