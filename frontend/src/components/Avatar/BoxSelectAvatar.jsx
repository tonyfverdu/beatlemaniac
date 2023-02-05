import React, { useState, useContext } from 'react'
import { MyScoreContext } from '../../context/MyContext.jsx'

import '../../sass/componentsSass/Avatar/BoxSelectAvatar.scss'


function BoxSelectAvatar() {
  const [theAvatar, setTheAvatar] = useState('')
  const [avatarPers, setAvatarPers] = useState('beatleArt4.jpg')
  const [isPerson, setIsPerson] = useState(false)
  const { imgPreview, setImgPreview, userCustomer, setUserCustomer } = useContext(MyScoreContext)


  function handleAvatar(ev) {
    setIsPerson(false)
    const { name, value } = ev.target

    setTheAvatar(value)
    setImgPreview(value)
    setUserCustomer({ ...userCustomer, [name]: value })
  }


  // Bilddatei in Base64 String umwandeln --  Convertir archivo de imagen en cadena Base64
  function handleAvatarPerson(ev) {
    setIsPerson(true)
    const imgSelect = ev.target.files[0]    // <<==  aus File us input auswählen -- Seleccion de la entrada File

    if (!imgSelect) return

    setAvatarPers(imgSelect.name)
    setTheAvatar(avatarPers)

    // umwandeln mit Filereader --  Convertir con Filereader
    const fileReader = new FileReader()
    // fileReader.readAsBinaryString(imgSelect)
    fileReader.readAsDataURL(imgSelect)
    fileReader.onloadend = (ev) => {
      setImgPreview(fileReader.result)
    }
  }

  return (
    <div className="contAllAvatar">
      <div className="containerSelectAvatar" >
        <header className="headerTitleBoxAvatar">
          <h4 className="titleBoxAvatar">
            You can add an avatar:
            <span className="resultAvatar">
              {isPerson ? avatarPers : theAvatar}
            </span>
          </h4>
        </header>
        <div className="contOfDefaultAvatars" onChange={handleAvatar} >
          <ul className="UlAvatar">
            <li className="liAvatar">
              <div className="rbutton_Img">
                <div className="containerRButton">
                  <label>
                    <input type="radio" id="Pauli" className="rbuttonBeatle" value="Pauli" name="avatar_url" />
                  </label>
                </div>
                <figure className="figImgAvatar">
                  <img className="imgAvatar" src={`../../src/images/theBeatles/Avatar/${'Paul-Avatar.jpg'}`} alt={'Paul Avatar'} />
                </figure>
              </div>
              <div className="txtAvatar">
                <span className="nameBeatle">Pauli</span>
              </div>
            </li>
            <li className="liAvatar">
              <div className="rbutton_Img">
                <div className="containerRButton">
                  <label>
                    <input type="radio" id="Georgi" className="rbuttonBeatle" value="Georgi"
                      name="avatar_url" />
                  </label>
                </div>
                <figure className="figImgAvatar">
                  <img className="imgAvatar" src={`../../src/images/theBeatles/Avatar/${'George-Avatar.jpg'}`} alt={'George Avatar'} />
                </figure>
              </div>
              <div className="txtAvatar">
                <span className="nameBeatle">Georgi</span>
              </div>
            </li>
            <li className="liAvatar">
              <div className="rbutton_Img">
                <div className="containerRButton">
                  <label>
                    <input type="radio" id="Johni" className="rbuttonBeatle" value="Johni"
                      name="avatar_url" />
                  </label>
                </div>
                <figure className="figImgAvatar">
                  <img className="imgAvatar" src={`../../src/images/theBeatles/Avatar/${'John-Avatar.jpg'}`} alt={'John Avatar'} />
                </figure>
              </div>
              <div className="txtAvatar">
                <span className="nameBeatle">Johni</span>
              </div>
            </li>
            <li className="liAvatar">
              <div className="rbutton_Img">
                <div className="containerRButton">
                  <label>
                    <input type="radio" id="Ringe" className="rbuttonBeatle" value="Ringe"
                      name="avatar_url" />
                  </label>
                </div>
                <figure className="figImgAvatar">
                  <img className="imgAvatar" src={`../../src/images/theBeatles/Avatar/${'Ringo-Avatar.jpg'}`} alt={'Ringo Avatar'} />
                </figure>
              </div>
              <div className="txtAvatar">
                <span className="nameBeatle">Ringe</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="contTextPersonAvatar" >
        <label className="txtPersonAvatar" htmlFor='avatar'>or upload your avatar image</label>
        <input type="file" id="avatar" className="personAvatar" name="avatar" accept=".jpg, .jpeg, .webp, .png, .gif"
          onChange={handleAvatarPerson} readOnly />
        <figure className="figImgAvatar">
          <img className="imgAvatar" src={`../../src/images/theBeatles/Avatar/${avatarPers}`} alt={'Person Avatar'} />
        </figure>
      </div>
    </div>

  )
}

export default BoxSelectAvatar