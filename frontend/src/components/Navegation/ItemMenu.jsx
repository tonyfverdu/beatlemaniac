import React from 'react'
import { NavLink } from 'react-router-dom'

import '../../sass/componentsSass/Navegation/ItemMenu.scss'

function ItemMenu({ item }) {
  return (
    <NavLink to={`/${item}`} className={({ isActive }) => (isActive ? 'activeClassMenu' : 'inactiveClassMenu')}>
      <span className="textItem">
        {item}
      </span>
    </NavLink>
  )
}

export default ItemMenu