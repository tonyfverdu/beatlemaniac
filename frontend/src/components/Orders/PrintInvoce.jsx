import React, { useState, useRef } from "react"
import { Button } from "react-bootstrap"
import ReactToPrint from "react-to-print"
import PreInvoce from "../../pages/PreInvoce"

function PrintInvoce() {
  const componentRef = useRef()
  const [text, setText] = useState('Hola mundo')

  return (
    <>
      <div>
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <Button>Print this out!</Button>}
          content={() => componentRef.current}
        />

        {/* component to be printed */}
        <PreInvoce ref={componentRef} text={ text } />
      </div>
    </>
  )
}

export default PrintInvoce

/*
// <ComponentToPrint ref={componentRef} />
*/