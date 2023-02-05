import React from 'react'
import '../../sass/componentsSass/Register/TitelData.scss'

function TitelData({ titel }) {
  return (
    <div className="contTitel">
      <header className='headerDataRegisterd'>
        <h3 className='titelDataRegisterd'>{titel}</h3>
      </header>
    </div>
  )
}

export default TitelData