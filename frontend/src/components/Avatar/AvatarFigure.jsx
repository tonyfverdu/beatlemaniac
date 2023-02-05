import React from 'react'

import '../../sass/componentsSass/Avatar/AvatarFigure.scss'


function AvatarFigure({ avatarURL, nameAvatar }) {
  console.log({ avatarURL, nameAvatar })
  return (
    <div className="contAvatar">
      <figure className="figImgAvatarRegister">
        <img className="imgAvatar" src={avatarURL} alt={'Figure user avatar'} />
      </figure>
      <span className="nameAvatar">{nameAvatar}</span>
    </div>

  )
}

export default AvatarFigure