import React, { useContext } from 'react'
import { MyScoreContext } from '../../../../context/MyContext.jsx'

import '../../../../sass/componentsSass/Player/PlayerMusic/CompAnotherAlbums.scss'

function CompAnotherAlbums({ random3Records }) {
const { selectedAlbum, setSelectedAlbum } = useContext((MyScoreContext))

  function handlerGoToAlbum(album) {
    setSelectedAlbum(album)
  }


  if (random3Records) {
    return (
      <>
        {random3Records.map((album, index) => {
          return (
            <div key={index} className="contAlbum" onClick={() => handlerGoToAlbum(album)}>
              <figure className="figureAlbum">
                <img src={`./src/images/theBeatles/portadas/${album.image[0]}`} alt={`Album ${album.title}`} className="imgAlbum" />
              </figure>
              <div className="contInfoAlbum">
                <span className="titleAlbum">{album.title}</span>
                <div className="contInfo2Album">
                  <span className="titleOfAlbum">{album.title}</span>
                  <div className="contRealeased">
                    <span className="labelReleased">Released</span>
                    <span className="realeased">{album.released}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })
        }
      </>
    )
  } else {
    return (
      <p>Error</p>
    )
  }
}

export default CompAnotherAlbums