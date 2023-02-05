import React, { useContext } from 'react'
import { IconContext } from "react-icons"
import { IoPlaySkipBack, IoPlaySkipForward, IoPlay, IoPause } from "react-icons/io5"
import { ImShuffle, ImLoop } from "react-icons/im"

import { MyScoreContext } from '../../../../context/MyContext.jsx'

import '../../../../sass/componentsSass/Player/PlayerMusic/ControlsPlay.scss'

function randomNumber(minPar, maxPar) {
  let resultRandomNumber = 0

  if ((typeof minPar === "number" && Number.isInteger(minPar)) && (typeof maxPar === "number" && Number.isInteger(maxPar))) {
    resultRandomNumber = Math.floor(Math.random() * (maxPar - minPar) + minPar)
  } else {
    console.error('Error:  The arguments of the function "randomNumber" muss be an integer number !!')
    resultRandomNumber = null
  }
  return resultRandomNumber
}


function ControlsPlay({ audioElem }) {
  const { indexCurrentSong, setCurrentSong, setIndexCurrentSong, songsOfBeatles, isPlaying, setIsPlaying,
    setMyCurrentTime, changeCurrentTime, setChangeCurrentTime } = useContext(MyScoreContext)

  function handleRandom() {
    let ramdomIndex = 0
    do {
      ramdomIndex = randomNumber(0, songsOfBeatles.length)
    } while (ramdomIndex === indexCurrentSong)
    setCurrentSong(songsOfBeatles[ramdomIndex])
    setIsPlaying(false)
  }

  function handlePrev() {
    if (indexCurrentSong === 0) {
      setIndexCurrentSong(songsOfBeatles.length - 1)
    } else {
      setIndexCurrentSong(indexCurrentSong - 1)
    }
    setCurrentSong(songsOfBeatles[indexCurrentSong])
    setIsPlaying(false)
  }

  function handleNext() {
    if (indexCurrentSong === songsOfBeatles.length - 1) {
      setIndexCurrentSong(0)
    } else {
      setIndexCurrentSong(indexCurrentSong + 1)
    }
    setCurrentSong(songsOfBeatles[indexCurrentSong])
    setIsPlaying(false)
  }

  function handleLoop() {
    console.log('Ay')
    setChangeCurrentTime(!changeCurrentTime)
    setMyCurrentTime(0)
    audioElem.current.currentTime = 0
  }


  return (
    <IconContext.Provider value={{ size: "2.8rem", padding: "2%", color: "rgb(92, 92, 95)" }}>
      <div className="contControlsPlay">
        <div className="actionButton" onClick={handleRandom}>
          <ImShuffle />
        </div>
        <div className="actionButton" onClick={handlePrev}>
          <IoPlaySkipBack />
        </div>
        <div className={!isPlaying ? "playActive" : "playPause"} onClick={() => setIsPlaying(!isPlaying)} >
          {!isPlaying ? <IoPlay /> : <IoPause />}
        </div>
        <div className="actionButton" onClick={handleNext}>
          <IoPlaySkipForward />
        </div>
        <div className="actionButton" onClick={handleLoop}>
          <ImLoop />
        </div>
      </div>
    </IconContext.Provider>
  )
}


export default ControlsPlay