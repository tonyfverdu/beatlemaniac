import React from 'react'
import '../../sass/componentsSass/Register/UserName.scss'

function UserName({ titel, firstName, lastName }) {
  return (
    <>
      <header className='headerDataRegisterd'>
        <h3 className='titelDataRegisterd'>{titel}</h3>
      </header>
      <div className="containerdataCustomer">
        <div className="contLabelData">
          <span className="label">{titel}</span>
          <span className="Data">{firstName}</span>
          <span className="Data">{lastName}</span>
        </div>
      </div>
    </>
  )
}

export default UserName