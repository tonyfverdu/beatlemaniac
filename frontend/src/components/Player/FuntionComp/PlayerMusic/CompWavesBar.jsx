import React, { useContext } from 'react'
// import { BsMusicNote } from 'react-icons/bs'

import { MyScoreContext } from '../../../../context/MyContext.jsx'

import '../../../../sass/componentsSass/Player/PlayerMusic/CompWavesBar.scss'


function CompWavesbar() {
  const { isPlaying } = useContext(MyScoreContext)
  const waveClass = isPlaying ? "box active" : "box"
  const colorBox = isPlaying ? "contCompWavesbar isActive" : "contCompWavesbar"


  return (
    <div className={`${colorBox}`} >
      <div className="contBoxes">
        <div className={`${waveClass} box1`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box2`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box3`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box4`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box5`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box6`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box7`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box8`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box2`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box1`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box4`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box3`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box6`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box8`}>
          {/* <BsMusicNote /> */}
        </div>

        <div className={`${waveClass} box7`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box5`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box1`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box2`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box3`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box5`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box6`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box7`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box8`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box5`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box8`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box7`}>
          {/* <BsMusicNote /> */}
        </div>
        <div className={`${waveClass} box1`}>
          {/* <BsMusicNote /> */}
        </div>
      </div>
    </div>
  )
}

export default CompWavesbar