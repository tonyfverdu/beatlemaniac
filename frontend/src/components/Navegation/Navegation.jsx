import React from 'react'
import ItemMenu from './ItemMenu.jsx'

import '../../sass/componentsSass/Navegation/Navegation.scss'


function Navegation() {
  const arrayItemsMenu = ['Home', 'About', 'Albums', 'Songs', 'Movies']
  // const objectItemMenu = {
  //   theWidth: '3rem',
  //   theHeigth: '6rem'
  // }
  return (
    <div className="menuNavegation">
      <ul className="ulNavBar">

        {
          arrayItemsMenu.map((item, index) => {
            return (
              <li key={index} className="linksNavbar">
                <span className="contItemMenu">
                  <ItemMenu
                    item={item}
                  />
                </span>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Navegation