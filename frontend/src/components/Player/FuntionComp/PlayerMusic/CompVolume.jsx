import React, { useState, useContext } from 'react'
import { IconContext } from "react-icons"
import { FcSpeaker } from 'react-icons/fc'
import { FaVolumeMute } from 'react-icons/fa'
import { MyScoreContext } from '../../../../context/MyContext.jsx'

import '../../../../sass/componentsSass/Player/PlayerMusic/CompVolume.scss'


function CompVolume() {
  const { theVolume, setTheVolume, theMuted, setTheMuted } = useContext(MyScoreContext)
  const [volumeHere, setVolumeHere] = useState(theVolume)

  function handlerVolume(ev) {
    const theVolumeHere = ev.target.value
    setVolumeHere(theVolumeHere)
    setTheVolume(theVolumeHere / 100)
  }

  function handlerMuted() {
    setTheMuted(!theMuted)
  }

  return (
    <IconContext.Provider value={{ size: "3.8rem", padding: "0.2%", color: "rgb(92, 92, 95)" }}>
      <div className="contControlsVolume">
        <div className="actionButton" onClick={handlerMuted} >
          {!theMuted
            ? <FcSpeaker
              onClick={handlerMuted} />
            : < FaVolumeMute
              onClick={handlerMuted} />
          }
        </div>
        <span className="valueVolumeReal">{`${(theVolume * 100).toFixed(2)}%`}</span>
        <span className="valueVolume">0%</span>
        <input type="range" className="barVolume" value={volumeHere} onChange={(ev) => handlerVolume(ev)} step='2' max="100" />
        <span className="valueVolume">100%</span>
      </div>
    </IconContext.Provider>
  )
}

export default CompVolume