import React, { useEffect, useState, useContext } from 'react'
import { useLocation } from "react-router-dom"

import { MyScoreContext } from '../../../../context/MyContext.jsx'
import CompAudioPlay from './CompAudioPlay.jsx'
import CompProgressBar from './CompProgressBar.jsx'
import CompShowSong from './CompShowSong.jsx'
import CompAnotherSongs from './CompAnotherSongs.jsx'
import CompAnotherAlbums from './CompAnotherAlbums.jsx'

import { CgDuplicate } from 'react-icons/cg'

import apiClient from '../../spotify.js'

import '../../../../sass/componentsSass/Player/PlayerMusic/PlayerMusic.scss'

import randomNumber from '../../../../functions/randomNumber.js'


function PlayerMusic({ audioElem }) {
  const location = useLocation()
  const { indexCurrentSong, currentSong, setCurrentSong, recordsOfBeatles, songsOfBeatles } = useContext(MyScoreContext)

  function searchElementInArrayByName(parArrayBase, parName) {
    function checkAlbum(parAlbumName) {
      return parAlbumName === currentSong.album[0]
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
      console.error('Error:  The arguments of the function "searchElementInArrayByName" must be an array and a string !!')
      setSongsInAlbum(null)
    }
  }

  const [tracks, setTracks] = useState([])
  const [currentTrack, setCurrentTrack] = useState([])  //  <<==  No se que es esto

  //  1.-  Similar Songs
  const [another3SimilarSongs, setAnother3SimilarSongs] = useState([])
  const [allSimilarSongs, setAllSimilarSongs] = useState([])

  //  3.-  Show songs of albums
  const [songsInAlbum, setSongsInAlbum] = useState(songsOfBeatles)
  const [pageToShow, setPageToShow] = useState(1)
  let numPages = 0

  /*  Pages Show:  variables of pages  */
  function pagination(parArray, parItemsPerPage, parNumPageShow) {
    let itemsOfThePage = []

    if (Array.isArray(parArray) && Number.isInteger(parItemsPerPage) && Number.isInteger(parItemsPerPage)) {
      const totalOfItems = parArray.length
      numPages = Math.ceil(totalOfItems / parItemsPerPage)
      const itemsToSkip = (parNumPageShow - 1) * parItemsPerPage
      itemsOfThePage = parArray.slice(itemsToSkip, parItemsPerPage + itemsToSkip)
    } else {
      console.error('Error: The arguments of the function "pagination" must be array und two integers!!')
      itemsOfThePage = null
    }
    return itemsOfThePage
  }

  function handlerCont() {
    if (numPages > pageToShow) {
      setPageToShow(pageToShow + 1)
    } else {
      setPageToShow(1)
    }
  }

  // 4.-  useEffect(s) for API WEB Spotify
  useEffect(() => {
    if (location.state) {
      apiClient
        .get("playlists/" + location.state?.id + "/tracks")
        .then((res) => {
          setTracks(res.data.items)
          setCurrentTrack(res.data?.items[0]?.track)
        })
    }
  }, [location.state])

  useEffect(() => {
    setCurrentTrack(tracks[indexCurrentSong]?.track)
  }, [indexCurrentSong, tracks])

  // 5.- Another 3 similar songs
  useEffect(() => {
    //  Array initialization
    setAnother3SimilarSongs([])

    const filterSongs = songsOfBeatles.filter(song => song.album[0] !== currentSong.album[0])
    setAllSimilarSongs(filterSongs)
    //  Calculate only three similar songs ==> another3SimilarSongs = [ 1, 2, 3 ]
    const array3Songs = []
    for (let i = 0; i < 3; i++) {
      array3Songs.push(filterSongs[randomNumber(0, filterSongs.length - 1)])
    }
    setAnother3SimilarSongs(array3Songs)
  }, [currentSong])

  //  6.-  Search songs in album
  useEffect(() => {
    setSongsInAlbum(searchElementInArrayByName(songsOfBeatles, currentSong.album[0]))
  }, [currentSong])

  // 7.-  Function Change current song  (handlerSongPlay)
  function handlerSongPlay(parSong) {
    setCurrentSong(parSong)
  }

  // 8.- Calculate another 3 albums
  const [anothersAlbums, setAnotherAlbums] = useState(recordsOfBeatles)
  const [random3Records, setRandom3Records] = useState([])

  function calculateAnotherAlbums(parNameAlbum) {
    if (typeof parNameAlbum === 'string') {
      setAnotherAlbums(recordsOfBeatles.filter(album => album.title !== parNameAlbum))
    } else {
      console.error('Error: The argumenet of the function "calculateAnotherAlbums" must be a string !!')
      setAnotherAlbums(null)
    }
    return anothersAlbums
  }

  function random3Albums(parRecords) {
    const arrayIntermedio = []
    if (Array.isArray(parRecords)) {
      for (let i = 0; i < 3; i++) {
        arrayIntermedio.push(parRecords[randomNumber(0, parRecords.length - 1)])
      }
      setRandom3Records(arrayIntermedio)
    } else {
      console.error('Error:  The argument of the function "" must be an assay of strings!!')
      setRandom3Records(null)
    }
  }

  useEffect(() => {
    calculateAnotherAlbums(currentSong.album[0])
    random3Albums(anothersAlbums)
  }, [currentSong])


  return (
    <div className="contFunctionPlayer PlayerMusic">
      <section className="contTopPlayer">
        <div className="contLeftTopSide">
          <div className="contAudioPlayer">
            <div className="contProgressBar">
              <CompProgressBar />
            </div>
            <div className="contAudioPlayer">
              <CompAudioPlay
                audioElem={audioElem}
              />
            </div>
          </div>
        </div>
        <div className="contRightTopSide">
          <div className="contShowSide">
            <CompShowSong />
          </div>
        </div>
      </section>

      <section className="contDownPlayer">
        <div className="contDownSide">
          <div className="contCard cartSongs">
            <header className="headerCard">
              <h4 className="titleCard">Similar Songs</h4>
            </header>
            <div className="contBodyCard">
              <CompAnotherSongs
                another3Songs={another3SimilarSongs}
              />
            </div>
          </div>
        </div>
        <div className="contDownSide">
          <div className="contCard cartAlbums">
            <header className="headerCard">
              <h4 className="titleCard">Similar Albums</h4>
            </header>
            <div className="contBodyCard">
              <CompAnotherAlbums
                random3Records={random3Records}
              />
            </div>
          </div>
        </div>
        <div className="contRigthDownSide">
          <div className="contCard OtherSongsAlbum">
            <div className="contIco" onClick={handlerCont}>
              <CgDuplicate />
            </div>
            <header className="headerCard">
              <h4 className="titleCard">Other Songs from Album</h4>
            </header>
            <div className="contBodyCard">
              <div className="contTheAlbum">
                <div className="contlabelText">
                  <span className="album">Album:</span>
                  <span className="albumTitle">{currentSong.album[0]}</span>
                </div>
              </div>
              <div className="contTracksRealeased">
                <div className="contlabelText">
                  <span className="titleLabelTR">Tracks:</span>
                  <span className="InfoTR">{songsInAlbum.length}</span>
                </div>
                <div className="contlabelText">
                  <span className="titleLabelTR">Released:</span>
                  <span className="InfoTR">{songsInAlbum[0].year}</span>
                </div>
              </div>
              <div className="contSongs">
                {
                  pagination(songsInAlbum, 4, pageToShow).map(song => {
                    return (
                      <div key={song._id} className="contItemSong" onClick={() => handlerSongPlay(song)}>
                        <span className="titleSong">{song.title}</span>
                        <span className="duration">{song.duration}</span>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PlayerMusic
