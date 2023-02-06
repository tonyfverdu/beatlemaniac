import React, { useState, useEffect, useContext, useRef } from 'react'

import { MyScoreContext } from '../../context/MyContext.jsx'
import { setClientTokenSpotify } from './spotify.js'
import CompSideBarAlbum from './FuntionComp/PlayerMusic/CompSideBarAlbum.jsx'
import Sidebar from './Sidebar.jsx'
import Feed from './FuntionComp/Feed.jsx'
import Treding from './FuntionComp/Trending.jsx'
import PlayerMusic from './FuntionComp/PlayerMusic/PlayerMusic.jsx'
import Like from './FuntionComp/Like.jsx'
import Library from './FuntionComp/Library.jsx'
import Setting from './FuntionComp/Setting.jsx'
import LoginSpotify from './auth/LoginSpotify.jsx'
import CompLogin from '../Login/CompLogin.jsx'

// import probeSongs from './songs.js'  //  <<==  variar luego por la BBDD de songs
import '../../sass/componentsSass/Player/Screen/HomePlayer.scss'


function HomePlayer() {
  const [tokenSpotify, setTokenSpotify] = useState("")
  const [errors, setErrors] = useState([])

  const { isLoggedin, setRecordsOfBeatles, isFunction, isPlaying, currentSong, setCurrentSong,
    totalDuration, setTotalDuration, myCurrentTime, setMyCurrentTime, theVolume, theMuted,
    changeCurrentTime, songsReproductions, setSongsReproductions
  } = useContext(MyScoreContext)

  const audioElem = useRef()

  async function fetchDataRecords() {
    const fecthToGetAllRecords = await fetch('http://127.0.0.1:3001/records', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const response = await fecthToGetAllRecords.json()

    if (fecthToGetAllRecords.status === 200) {
      setRecordsOfBeatles(response.records)
    } else if (fecthToGetAllRecords.status === 400) {
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
    fetchDataRecords()
  }, [])

  useEffect(() => {
    const tokenSaved = window.localStorage.getItem("tokenSpotify")
    const hash = window.location.hash
    window.location.hash = ""

    if (!tokenSaved && hash) {
      const _tokenSpotify = hash.split("&")[0].split("=")[1]
      window.localStorage.setItem("tokenSpotify", _tokenSpotify)
      setTokenSpotify(_tokenSpotify)
      setClientTokenSpotify(_tokenSpotify)
    } else {
      setTokenSpotify(tokenSaved)
      setClientTokenSpotify(tokenSaved)
    }
  }, [])

  useEffect(() => {
    if (isPlaying) {
      setSongsReproductions([...songsReproductions, { song: currentSong, reproductions: songsReproductions.reproductions + 1 }])
    }
  }, [isPlaying])

  useEffect(() => {
    audioElem.current.volume = theVolume
  }, [theVolume])

  useEffect(() => {
    audioElem.current.muted = theMuted
  }, [theMuted])

  useEffect(() => {
    if (isPlaying) {
      audioElem.current.play()
    } else {
      audioElem.current.pause()
    }
  }, [isPlaying])


  function onPlaying() {
    setTotalDuration(audioElem.current.duration / 60) //  Duration in Minuten
    setMyCurrentTime(audioElem.current.currentTime / 60) //  Duration played in Minuten
  }

  return (
    <>
      <audio src={currentSong.mp3} ref={audioElem} type="audio/mp3" onTimeUpdate={onPlaying} />
      {!tokenSpotify &&
        <LoginSpotify />
      }
      <div className="contMainPlayer">
        <div className="contSideBarAlbums">
          <CompSideBarAlbum />
        </div>
        <div className="contPlayerMusic">
          <div className="contSidebar">
            <Sidebar
            />
          </div>
          {isLoggedin ? <div className="contFunctionPlayer">
            {
              isFunction === 'Feed' &&
              <Feed />
            }
            {
              isFunction === 'Trending' &&
              <Treding />
            }
            {
              isFunction === 'Player' &&
              <PlayerMusic
                audioElem={audioElem}
              />
            }
            {
              isFunction === 'Like' &&
              <Like />
            }
            {
              isFunction === 'Library' &&
              <Library />
            }
            {
              isFunction === 'Setting' &&
              <Setting />
            }
          </div>
            : <div className="contLogin">
              <CompLogin />
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default HomePlayer