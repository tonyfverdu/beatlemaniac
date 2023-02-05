import React from 'react'
import '../../sass/componentsSass/Register/LabelData.scss'

function LabelData({ label, data }) {
  return (
    <>

      <div className="containerdataCustomer">
        <div className="contLabelData">
          <span className="label">{label}</span>
          <span className="data">{data}</span>
        </div>
      </div>
    </>
  )
}

export default LabelData