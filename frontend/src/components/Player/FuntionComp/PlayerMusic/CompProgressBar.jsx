import React from 'react'

import '../../../../sass/componentsSass/Player/PlayerMusic/CompProgressBar.scss'


function CompProgressBar({ percentage, isPlaying }) {
  return (
    <div className='contCompProgressBar'>
      <div className="progressCircle">
        <figure className="figureRecordSong">
          <img className="imgRecordSong imgActive" src="https://pngimg.com/uploads/vinyl/vinyl_PNG107.png" alt="Image of record" />
        </figure>
      </div>
    </div>
  )
}

export default CompProgressBar

/*
        <svg width={'6rem'} height={'6rem'}>
          <g>
            <Circle strokeWidth={"0.2rem"} color="#3B4F73" size={size} />
            <Circle strokeWidth={"0.2rem"} color={color} percentage={percentage} size={size} />
          </g>
          <defs>
            <clipPath id="myCircle">
              <circle cx="50%" cy="50%" r={size / 2 - 30} fill="#FFFFFF" />
            </clipPath>
            <clipPath id="myInnerCircle">
              <circle cx="50%" cy="50%" r={size / 2 - 100} fill="#FFFFFF" />
            </clipPath>
          </defs>
          <image
            className={isPlaying ? "active" : ""}
            x={30}
            y={30}
            width={2 * (size / 2 - 30)}
            height={2 * (size / 2 - 30)}
            href="https://pngimg.com/uploads/vinyl/vinyl_PNG107.png"
            clipPath="url(#myCircle)"
          />
          <image
            className={isPlaying ? "active" : ""}
            x={100}
            y={100}
            width={2 * (size / 2 - 100)}
            height={2 * (size / 2 - 100)}
            href={image}
            clipPath="url(#myInnerCircle)"
          />
        </svg>
*/