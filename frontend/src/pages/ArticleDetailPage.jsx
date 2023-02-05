import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"

import { MyScoreContext } from '../context/MyContext.jsx'

import TableSearchSongs from '../components/Search/TableSearchSong.jsx'
import Accordion from 'react-bootstrap/Accordion'
import ButtonKlein from '../components/ButtonKlein.jsx'
import { FcHighBattery, FcFilmReel } from "react-icons/fc"
import { MdAddShoppingCart } from "react-icons/md"
import { IoCloseOutline } from "react-icons/io5"
import { BiLoaderAlt } from "react-icons/bi"

// import Swal from 'sweetalert2'

import '../sass/componentsSass/Articledetailpage.scss'


// let timerInterval = 0
// function windowsAlertProcessAddArticle() {
//   Swal.fire({
//     title: 'ShoppingCar: Add an article',
//     html: 'I will close in <b>0.5</b> seconds.',
//     timer: 500,
//     timerProgressBar: true,
//     width: 400,
//     position: 'top-end',
//     padding: '2em',
//     color: 'rgb(9, 9, 9)',
//     background: '#aaa url("../images/fondos/logoTransparent1.jpg")',
//     backdrop: `
//       rgba(0,0,123,0.4)
//       url("../images/fondos/logoBuy1.jpg")
//       left top
//       no-repeat
//     `,
//     showClass: {
//       popup: 'animate__animated animate__fadeInDown'
//     },
//     hideClass: {
//       popup: 'animate__animated animate__fadeOutUp'
//     },
//     icon: 'info',
//     imageUrl: 'https://unsplash.it/200/100',
//     imageWidth: 200,
//     imageHeight: 100,
//     imageAlt: 'Custom image',
//     showCloseButton: true,
//     didOpen: () => {
//       Swal.showLoading()
//       const b = Swal.getHtmlContainer().querySelector('b')
//       timerInterval = setInterval(() => {
//         b.textContent = Swal.getTimerLeft()
//       }, 100)
//     },
//     willClose: () => {
//       clearInterval(timerInterval)
//     }
//   }).then((result) => {
//     if (result.dismiss === Swal.DismissReason.timer) {
//       console.log('I was closed by the timer')
//     }
//   })
// }


function ArticleDetailPage({ idArticle }) {
  const text1 = 'Return'
  const text2 = 'Add'
  const imageLogo = 'BeatlesManic2.jpg'

  const [errors, setErrors] = useState([])
  const [modal, setModal] = useState(false)
  const [isToggleAccordion, setIsToggleAccordion] = useState(true)
  const [videoLoading, setVideoLoading] = useState(true)

  const { puchaseItemSelect, SC_State, setSC_State, totalArticlesInSC, setTotalArticlesInSC,
    recordsOfBeatles, songsOfBeatles, setSongsOfBeatles } = useContext(MyScoreContext)
  const [songsInAlbum, setSongsInAlbum] = useState(songsOfBeatles)

  const navigate = useNavigate()

  function handleButtonReturn() {
    navigate(-1)
  }

  function handleButtonAddArticleToSC(parId) {
    const newAlbumIn_SC = recordsOfBeatles.find((album) => album._id === parId)
    const isIn_SC = SC_State.find((album) => album.articleInSC._id === parId)

    if (isIn_SC === undefined) {
      setSC_State([...SC_State, { articleInSC: newAlbumIn_SC, amountOfArticle: 1 }])
    } else {
      isIn_SC.amountOfArticle++
    }
    setTotalArticlesInSC(totalArticlesInSC + 1)
  }

  function openModal() {
    setModal(!modal)
  }

  const spinner = () => {
    setVideoLoading(!videoLoading)
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
    function checkAlbum (parAlbumName) {
      return parAlbumName === puchaseItemSelect.title
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
      searchElementInArrayByName(songsOfBeatles, puchaseItemSelect.title)
    }
  }


  return (
    <div className="containerMainAlbumDetailItem">
      <div className="containerTopAlbum">
        <div className="TopLeftArticleBrand">
          <div className="contTopSide">
            <figure className="figureLogoBeatlesmaniac">
              <img className="imageLogo" src={`../src/images/theBeatles/BeatlesManiac/${imageLogo}`} alt="Image Logo Beatlesmaniacs" />
            </figure>
            <div className="contTopRigth">
              <div className="contTopTop">
                <div className="firstPart">
                  <span className="band">{puchaseItemSelect.author_band}</span>
                  <span className="theAlbum">Album</span>
                </div>
                <div className="contLabel">
                  <span className="labelLabel">Label: </span>
                  <span className="label">{puchaseItemSelect.label}</span>
                </div>
              </div>
              <div className="contTopDown">
                <h4 className="titleAlbum">{puchaseItemSelect.title}</h4>
                <div className="contTrack">
                  <span className="tracks">{puchaseItemSelect.trackCount}</span>
                  <span className="labelTracks">tracks</span>
                </div>
              </div>
            </div>
          </div>
          <div className="contDownSide">
            <div className="contTypeAlbum">
              <div className="contTypeGenre">
                <span className="labelTypeAlbum">Type Album:</span>
                <span className="collectionType">{puchaseItemSelect.collectionType}</span>
                <span className="genre">{puchaseItemSelect.genre}</span>
              </div>
              <div className="contReleased">
                <span className="labelReleased">Released:</span>
                <span className="released">{puchaseItemSelect.released.substring(0, 10)}</span>
              </div>
            </div>
            <div className="contCopyright">
              <span className="copyright">{puchaseItemSelect.copyright}</span>
            </div>
          </div>
        </div>
        <div className="TopHalftAlbum">
          <figure className="containerFigureAlbum">
            <img className="imageAlbum" src={`../src/images/theBeatles/portadas/${puchaseItemSelect.image}`} alt={puchaseItemSelect.title} />
          </figure>
        </div>
        <div className="TopRightAlbum">
          <div className="containerIcoButtonBrand">
            <h6 className="textVideo">Video</h6>
            <i><FcFilmReel /></i>
          </div>
          <div className="containerButtonVideo">
            <button className="titlelebel" onClick={openModal} >
              Play
              {modal ? (
                <section className="modal__bg">
                  <div className="modal__align">
                    <div className="modal__content" modal={modal}>
                      <IoCloseOutline
                        className="modal__close"
                        arial-label="Close modal"
                        onClick={setModal}
                      />
                      <div className="modal__video-align">
                        {videoLoading ? (
                          <div className="modal__spinner">
                            <BiLoaderAlt
                              className="modal__spinner-style"
                              fadeIn="none"
                            />
                          </div>
                        )
                          : null}
                        <iframe
                          className="modal__video-style"
                          onLoad={spinner}
                          loading="lazy"
                          width="450"
                          height="380"
                          src={`https://www.youtube.com/embed/${puchaseItemSelect.videoBrand}`}
                          title="YouTube video player"
                          frameBorder="1"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen="true"
                        >
                        </iframe>
                      </div>
                    </div>
                  </div>
                </section>
              ) : null}
            </button>
          </div>
        </div>
      </div>

      <div className="containerMiddleAlbum">
        <div className="containerDescriptionShort">
          <span className="spanDescriptionShort">{puchaseItemSelect.comments}</span>
        </div>
        <div className="containerAccordionAlbum" onClick={(ev) => handleClickAccordion(ev)}>
          <Accordion className="AccordionAlbum container" defaultActiveKey="1">
            <Accordion.Item className="AccordionItem container" eventKey="0">
              <Accordion.Header className="accordionHeader container"><span className="textOfImagesAlbums"><b>Tracks of {puchaseItemSelect.title}</b></span></Accordion.Header>
              <Accordion.Body className="accordionBody">
                <div className="contSongOfAlbum">
                  {/* <figure id="figureAlbum" className="imageFigureAlbum">
                    <img className="imgAlbumDetail" src={`../src/images/theBeatles/portadas/${puchaseItemSelect.image}`} alt={puchaseItemSelect.title} />
                  </figure> */}
                  <div className="contTableOfSongs">
                    <TableSearchSongs
                      parSongs={songsInAlbum}
                    />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="bodyAlbumDetail">
          <div className="descriptionLange">
            <span className="spanDescriptionLange">{puchaseItemSelect.description}</span>
          </div>
        </div>
      </div>

      <div className="containerBottonAlbum">
        <div className="footerRecordDetail ">
          <div className="stockOfRecord">
            <i><FcHighBattery /></i>
            <span className="stock">{puchaseItemSelect.stock}</span>
          </div>
          <div className="containerPriceTax">
            <div className="containerPT">
              <span className="Price">Price:</span><span className="priceValue">{puchaseItemSelect.price} (€)</span>
            </div>
            <div className="containerPT">
              <span className="Tax">VAT(19%)</span><span className="taxValue">{puchaseItemSelect.price * 0.19} (€)</span>
            </div>
          </div>
          <div className="gruppeButoms">
            <i><MdAddShoppingCart /></i>
            <div className="theButton">
              <ButtonKlein
                handleButton={handleButtonReturn}
                text={text1}
                parW={'5.5rem'}
                parH={'3rem'}
                parFS={'1.1rem'}
              />
            </div>
            <div className="theButton">
              <ButtonKlein
                handleButton={() => handleButtonAddArticleToSC(puchaseItemSelect._id)}
                text={text2}
                parW={'5.5rem'}
                parH={'3rem'}
                parFS={'1.1rem'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ArticleDetailPage