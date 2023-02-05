import React, { useContext } from 'react'
import { MyScoreContext } from '../../../../context/MyContext.jsx'

import '../../../../sass/componentsSass/Player/PlayerMusic/CompAnotherSongs.scss'


function CompAnotherSongs({ another3Songs }) {
  const { setCurrentSong } = useContext(MyScoreContext)

  function handlerSongPlay(parSong) {
    setCurrentSong(parSong)
  }

  if (another3Songs) {
    return (
      <>
        {another3Songs.map(songSimilar => {
          return (
            <div key={songSimilar._id} className="contSong" onClick={() => handlerSongPlay(songSimilar)}>
              <figure className="figureSong">
                <img src={`./src/images/theBeatles/portadas/${songSimilar.image[0]}`} alt={`Album ${songSimilar.album[0]}`} className="imgSong" />
              </figure>
              <div className="contInfoSong">
                <span className="titleSong">{songSimilar.title}</span>
                <div className="contInfo2Song">
                  <span className="titleOfSong">{songSimilar.title}</span>
                  <div className="contRealeased">
                    <span className="labelReleased">Released</span>
                    <span className="realeased">{songSimilar.year}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })
        }
      </>
    )
  }
}

export default CompAnotherSongs