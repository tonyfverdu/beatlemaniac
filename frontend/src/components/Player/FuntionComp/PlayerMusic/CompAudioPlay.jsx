import React, { useState, useEffect, useContext, useRef } from 'react'
import CompWavesBar from './CompWavesBar.jsx'
import ControlsPlay from './ControlsPlay.jsx'
import CompVolume from './CompVolume.jsx'

import { MyScoreContext } from '../../../../context/MyContext.jsx'

import '../../../../sass/componentsSass/Player/PlayerMusic/CompAudioPlay.scss'


function CompAudioPlay({ audioElem }) {
  const { currentSong, myCurrentTime, setMyCurrentTime, totalDuration } = useContext(MyScoreContext)
  const [contIni, setContIni] = useState('0:00')
  const [contEnd, setContEnd] = useState(currentSong.duration)

  const progressElem = useRef()

  useEffect(() => {
    setMyCurrentTime(0)
  }, [])

  function handlerAudioClick(ev) {
    const widthSong = progressElem.current.clientWidth
    const offSet = ev.nativeEvent.offsetX
    audioElem.current.currentTime = (offSet / widthSong) * totalDuration * 60
  }

  return (
    <div className="contCompAudioPlay">
      <header className="headerTitleSong">
        <h4 className="titleSong">{currentSong.title}</h4>
      </header>
      <div className="contSongAlbum">
        <span className="labelSongAlbum">Song -- Album: </span>
        <span className="Song">{currentSong.title}</span>
        <span className="Album"> {`(from "${currentSong.album[0]}")`}</span>
      </div>
      <div className="contInfoDuration">
        <div className="contCounters">
          <div className="contCounters">
            <span className="counter ini">{contIni}</span>
            <span className="textInfoCounter">{`${(myCurrentTime * 100 / totalDuration).toFixed(2)} %`}</span>
            <span className="counter end">{contEnd}</span>
          </div>
          <progress className="contProgressBar" value={myCurrentTime / totalDuration} ref={progressElem}
            max="100%" onClick={(ev) => handlerAudioClick(ev)} >
          </progress>
        </div>
        <CompWavesBar />
      </div>
      <div className="contControls">
        <ControlsPlay
          audioElem={audioElem} />
        <CompVolume />
      </div>
    </div>
  )
}

export default CompAudioPlay