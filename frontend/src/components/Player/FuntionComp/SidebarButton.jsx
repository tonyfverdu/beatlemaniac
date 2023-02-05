import React, { useEffect, useContext } from 'react'
import { IconContext } from 'react-icons/lib'
import { MyScoreContext } from '../../../context/MyContext.jsx'

import '../../../sass/componentsSass/Player/Screen/SidebarButton.scss'


function SidebarButton({ icon, name }) {
  const { isFunction, setIsFunction } = useContext(MyScoreContext)

  function handlerButton() {
    setIsFunction(`${name}`)
  }

  return (
    <div className={`contSidebarButton ${isFunction === name ? "active" : ''}`} onClick={handlerButton}>
      <IconContext.Provider value={{ size: "20px", className: "icoReact" }}>
        <div className="contIcon">
          {icon}
        </div>
      </IconContext.Provider>

      <span className="nameIcon">{name}</span>
    </div>
  )
}

export default SidebarButton