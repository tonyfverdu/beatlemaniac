/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

import { IconContext } from "react-icons"
import { TbBrandMeta } from 'react-icons/tb'
import { FaTwitter, FaGoogle, FaInstagramSquare, FaLinkedin, FaGithub } from 'react-icons/fa'

import '../../sass/componentsSass/Footer/IconoComponent.scss'


function IconoComponent({ urlDirection, icon }) {
  let nameIcon = ''
  let colorBackground = ''

  function select_ComponentIcon(parNameIcon) {
    if (typeof parNameIcon === 'string') {
      switch (parNameIcon) {
        case 'TbBrandMeta':
          nameIcon = 'Meta'
          colorBackground = { colorBackground: '#3b5998' }
          return (
            <TbBrandMeta />
          )
        case 'FaTwitter':
          nameIcon = 'Twitter'
          colorBackground = { colorBackground: '#55acee' }
          return (
            <FaTwitter />
          )
        case 'FaGoogle':
          nameIcon = 'Google'
          colorBackground = '#dd4b39'
          return (
            <FaGoogle />
          )
        case 'FaInstagramSquare':
          nameIcon = 'Instagram'
          colorBackground = '#ac2bac'
          return (
            <FaInstagramSquare />
          )
        case 'FaLinkedin':
          nameIcon = 'Linkedin'
          colorBackground = '#0082ca'
          return (
            <FaLinkedin />
          )
        case 'FaGithub':
          nameIcon = 'Github'
          colorBackground = '#333333'
          return (
            < FaGithub />
          )
        default:
          alert('Error: The name of the paricon ist unknow!')
      }
    } else {
      alert('Error: The argument of the function "select_ComponentIcon" must be a string!')
      return null
    }
  }

  return (
    <IconContext.Provider value={{ className: "icon" }}>
      <div className="contIconComponent">
        <a
          className="linkIcons"
          href={urlDirection}
          target="_blank"
          role="button"
          style={{ colorBackground: 'red' }} rel="noreferrer"
        >
          <i className={"icon" && icon}>
            {
              select_ComponentIcon(icon)
            }
          </i>
        </a>
        <p className="textIcon">{nameIcon}</p>
      </div>
    </IconContext.Provider>
  )
}

export default IconoComponent
