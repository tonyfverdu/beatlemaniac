import React from 'react'
import '../sass/componentsSass/Button.scss'

function Button({ handleButton, text }) {
  function ManageButton() {
    handleButton()
  }

  return (
    <div className="containerButton">
      <button
        type={`${text === 'Delete' || text === 'Return' || text === 'Exit' || text === 'Update'
        ? 'reset'
        : text === 'Submit' || text === 'Login' ? 'submit' : 'button'}`}

        value={`${text === 'Delete' || text === 'Exit' || text === 'Return' || text === 'Update'
        ? text
        : text === 'Submit' || text === 'Login' ? text : text}`}
        className={`button ${text === 'Delete' || text === 'Exit' || text === 'Return' || text === 'Update' ? 'buttonReset' : ''}`.trimEnd()}
        onClick={() => ManageButton()}>
        {text}
      </button>
    </div >
  )
}

export default Button