import React, { useState, useEffect, useContext } from 'react'
import { MyScoreContext } from '../../../context/MyContext.jsx'
import Accordion from 'react-bootstrap/Accordion'
import ButtonKlein from '../../ButtonKlein.jsx'
import { FcLike } from 'react-icons/fc'
import '../../../sass/componentsSass/Player/Screen/Like.scss'


function Like() {
  //  1.-  Songs Likes of user
  const { userCustomer, songsOfBeatles, currentSong } = useContext(MyScoreContext)
  const [errors, setErrors] = useState([])
  const [songsLikeMe, setSongsLikeMe] = useState([currentSong])
  const [songsInAlbum, setSongsInAlbum] = useState(songsOfBeatles)

  function getSongsLikes(parArrayIds) {
    parArrayIds.map(async (songID) => {
      console.log('song:  ', songID)
      await getDataSongsLikes(songID)
    })
    console.log('en la funcion songsLikesMe:  ', songsLikeMe)
  }

  async function getDataSongsLikes(parId) {
    const _id = parId
    const urlQuerys = `?${'_id'}=${_id}`
    const urlCompleted = `http://127.0.0.1:3001/songs/song/${urlQuerys}`

    const fetchDataSongsLike = await fetch(urlCompleted, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // .then(data => data.json())
    // .catch(err => console.log('Error in fetch:  ', err))
    const response = await fetchDataSongsLike.json()

    const { message, song } = response
    console.log({ message, song })
    console.log('song:  ', song)
    setSongsLikeMe([...songsLikeMe, song])
    if (response.status === 200 || response.status === 304) {
      // eslint-disable-next-line no-const-assign
      console.log('Alles gut:  ', message)
      // songsLikesMe.push(song)
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
    return song
  }


  useEffect(() => {
    console.log('userCustomer.songsLikes:  ', userCustomer.songsLikes)
    getSongsLikes(userCustomer.songsLikes)
    // setSongsLikeMe([...songsLikeMe, currentSong])
    // console.log(`The song is:  ${songsLikeMe}`)
  }, [])

  // async function findenSongsLikes() {
  //   const email = userCustomer.email
  //   const urlBackend = `http://127.0.0.1:3001/users/usersongslike/?email=${email}`
  //   console.log('urlBackend:  ', urlBackend)
  //   const fetchDataGETSongsLike = await fetch(urlBackend, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json;'
  //     }
  //   })

  //   const response = await fetchDataGETSongsLike.json()

  //   const { message, songsLike } = response

  //   if (response.status === 200) {
  //     setSongsLikesMe(songsLike)
  //     console.log(`All Ok. ${message}`)
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



  /*
  //  1.-  Instantation of an object of the class "Schema" (a schema)
  const songSchema = Schema({
  idSec: { type: Number, required: true },
  year: { type: Number, required: true },
  image: [{ type: String }],
  album: [{ type: String }],
  title: { type: String, required: true },
  duration: { type: String, required: true },
  vocals: [{ type: String, enum: ['George Harrison', 'John Lennon', 'Paul McCartney', 'Ringo Starr',  'Instrumental', 'George Martin & his Orchestra'] }],
  price: { type: Number, required: true },
  mp3: { type: String },
  reproductions: { type: Number, default: 0 },
  visualisations: { type: Number, default: 0 },
  likes: { type: Number, default: 0 }
  })
  */

  function handlePlaySong(parId) {
    console.log('Ay')
    // const itemOfArticle = articlesFilterd.find(elementArticle => elementArticle._id === parId)
    // const indexOfArticle = articlesFilterd.findIndex(elementArticle => elementArticle._id === parId)
    // setCurrentSong(itemOfArticle)
    // setIndexCurrentSong(indexOfArticle)
  }

  // /////////////////////////////
  function sortById(parArray) {
    console.log('Ay')
    // setToogleSortIdSec(!toggleSortIdSec)
    // let resultArraySort = []
    // if (Array.isArray(parArray)) {
    //   resultArraySort = parArray.sort((a, b) => {
    //     if (!toggleSortIdSec) {
    //       return (b.idSec - a.idSec)
    //     } else {
    //       return (a.idSec - b.idSec)
    //     }
    //   })
    // } else {
    //   console.error('The argument of the function "sortByIdSec" must be an array')
    // }
    // setSongsSorted(resultArraySort)
  }
  function sortByString(parArray, parKey) {
    console.log('ay')
    // setToogleSortString(!toggleSortString)
    // let resultArraySort = []
    // if (Array.isArray(parArray) || typeof parKey === 'string') {
    //   resultArraySort = parArray.sort((a, b) => {
    //     if (toggleSortString) {
    //       if (a[parKey].toLowerCase() > b[parKey].toLowerCase()) {
    //         return -1
    //       } else if (a[parKey].toLowerCase() < b[parKey].toLowerCase()) {
    //         return 1
    //       } else {
    //         return 0
    //       }
    //     } else {
    //       if (a[parKey].toLowerCase() < b[parKey].toLowerCase()) {
    //         return -1
    //       } else if (a[parKey].toLowerCase() > b[parKey].toLowerCase()) {
    //         return 1
    //       } else {
    //         return 0
    //       }
    //     }
    //   })
    // } else {
    //   return null
    // }
    // setSongsSorted(resultArraySort)
  }
  function sortByYear(parArray) {
    console.log('ay')
    // setToogleSortYear(!toggleSortYear)
    // let resultArraySort = []
    // if (Array.isArray(parArray)) {
    //   resultArraySort = parArray.sort((a, b) => {
    //     if (!toggleSortYear) {
    //       return (b.year - a.year)
    //     } else {
    //       return (a.year - b.year)
    //     }
    //   })
    // } else {
    //   console.error('The argument of the function "sortByYear" must be an array')
    // }
    // setSongsSorted(resultArraySort)
  }

  return (
    <div className="Like">
      <section className="headerListLike">
        <header className="headerLikes">
          <h4 className="titleLikes">{'Likes'}</h4>
          <div className="contOfLikes">
            <span className="contLikes">{songsLikeMe.length}</span>
            <div className="icoLikes">
              <FcLike />
            </div>
          </div>
        </header>
        <header className="headerLikes">
          <h4 className="titleLikes">{'Play List'}</h4>
        </header>
      </section>

      <section className="sectionCardSongs">
        <ul className="UL_ListCardSongs">
          {songsLikeMe.map((songLike, index) => {
            return (
              <li key={songLike._id} className="LI_ListCardSongs">
                <div className="contLike">
                  <span className="numLike">{index + 1}</span>
                </div>
                <div className="contCardSong">
                  <section className="topCardSong">
                    <header className="headerTitleSong">
                      <h4 className="titleSong">{songLike.title}</h4>
                      <div className="cont2Fields">
                        <span className="spanTitle">from</span>
                        <h6 className="titleAlbum">{songLike.album[0]}</h6>
                      </div>
                    </header>
                  </section>

                  <section className="halfCardSong">
                    <figure className="figureCardSongLike">
                      <img src={`./src/images/theBeatles/portadas/${songLike.image[0]}`} alt={songLike.title} className="imgSongLike" />
                    </figure>
                  </section>

                  <footer className="footerCardSong">
                    <div className="contField">
                      <span className="textInfoSongLike">{songLike.duration}</span>
                    </div>
                    <div className="contField">
                      <span className="labelInfoSongLike">Year:</span>
                      <span className="textInfoSongLike">{songLike.year}</span>
                    </div>
                  </footer>
                </div>
              </li>
            )
          })
          }
        </ul>
      </section>

      <section className="tableListSongsLike">
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
              songsLikeMe.map((song, index) => {
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
      </section>

    </div>
  )
}

export default Like