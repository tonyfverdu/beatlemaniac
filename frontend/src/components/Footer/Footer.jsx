import React from 'react'

import IconoComponent from './IconoComponent.jsx'
import { RiAliensLine } from 'react-icons/ri'

import '../../sass/componentsSass/Footer/Footer.scss'

const messageOfFooter = {
  copyrigth: '© 2022   Copyright.',
  contact: 'Jose Antonio Fernandez Verdu'
}
const images = {
  logo1: 'logo1.png'
}


function Footer() {
  return (
    // <!--  FOOTER MIT ICONS  --------------------------------------------------->
    <footer className="footerModul" >
       <div className="previousFooter">
        <div className="socialMedia">
          <IconoComponent
            urlDirection={"https://www.facebook.com"}
            icon={'TbBrandMeta'}
          />
          <IconoComponent
            urlDirection={"https://twitter.com"}
            icon={'FaTwitter'}
          />
          <IconoComponent
            urlDirection={"https://google.com"}
            icon={'FaGoogle'}
          />
          <IconoComponent
            urlDirection={"https://www.instagram.com/"}
            icon={'FaInstagramSquare'}
          />
          <IconoComponent
            urlDirection={"https://de.linkedin.com/"}
            icon={'FaLinkedin'}
          />
          <IconoComponent
            urlDirection={"https://github.com/"}
            icon={'FaGithub'}
          />
        </div>
      </div>
      <img className="logoFire" src={`../../src/images/theBeatles/${images.logo1}`} alt="Logo von The Beatles" />
      <div className="classCopyright">
        <span className="fs-6 m-t-2 fw-bold text-white mx-3">{messageOfFooter.copyrigth}</span>
        <a id="idmy" className="btn btn-white btn-floating" href="#" target="_blank" role="button">
          <i className="fa-solid fa-user-astronaut fa-flip">
            <RiAliensLine />
          </i>
        </a>
        <span className="fs-6 mt-2 fw-lighter text-white mx-3"><small>Contact: {messageOfFooter.contact}</small></span>
      </div>
    </footer >
  )
}

export default Footer