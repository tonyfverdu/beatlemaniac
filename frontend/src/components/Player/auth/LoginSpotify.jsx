import React, { useState } from 'react'
import ButtonKlein from "../../ButtonKlein.jsx"
import { loginEndPoint } from '../spotify.js'

import "../../../sass/componentsSass/Player/auth/LoginSpotify.scss"


function LoginSpotify() {
  const logoSpotify = {
    name: 'Logo Spotify',
    logo: 'logoSpotify1.png'
  }
  const [tokenSpotify, setTokenSpotify] = useState("")

  function handleButtonLoginSpotify() {
    console.log('Hay')
  }


  return (
    <div className="contLoginSpotify">
      <figure className="figureLogoSpotify">
        <img className="imgLogoSpotify" src={`../../src/images/logos/${logoSpotify.logo}`} alt={logoSpotify.name} />
      </figure>
      <a href={ loginEndPoint }>
        <ButtonKlein
          handleButton={handleButtonLoginSpotify}
          text={"Login"}
          parW={'6rem'}
          parH={'2rem'}
          parFS={'0.9rem'}
        />
      </a>
    </div>
  )
}

export default LoginSpotify