import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyScoreContext } from '../../context/MyContext.jsx'
import Table from 'react-bootstrap/Table'
import Button from '../Button.jsx'
import '../../sass/componentsSass/Orders/Orders.scss'


function Orders({ dropdownToggled2, setDropdownToggled2 }) {
  const messageOrders = {
    titelDataGeneral: ['Internal Registry Data', 'Customer Data', 'Delivery Data', 'Payment Method'],
    textUpdate: 'Update',
    textAccept: 'Accept',
    textDelete: 'Delete',
    textSubmit: 'Submit'
  }
  const [makeFetch, setMakeFetch] = useState(false)
  const [errors, setErrors] = useState([])
  const { userCustomer, order, setOrder } = useContext(MyScoreContext)

  const navigate = useNavigate()

  async function fecthDataGetOrder(parOrderId) {
    const orderId = parOrderId
    const urlQuery = `?${'orderId'}=${orderId}`
    const urlCompleted = `http://127.0.0.1:3001/orders/order${urlQuery}`

    const fetchDataQueryOrder = await fetch(urlCompleted, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const response = await fetchDataQueryOrder.json()
    const { message, orderFound } = response

    // console.log({ message, orderFound })

    if (response.status === 200 || response.status === undefined) {
      console.log('All OK:  ', message)
      setOrder(orderFound)
      navigate('/preInvoce', { replace: true })
    } else if (response.status === 400) {
      const result = await response.json()
      for (const row of result.message) {
        for (const key in row) {
          errors.push(row[key])
        }
      }
      setErrors(errors)
    } else {
      setErrors(['Etwas ist schief gelaufen'])
    }
  }

  async function fetchDataQueryOrders() {
    const userId = userCustomer._id
    const urlQuery = `?${'userId'}=${userId}`
    const urlCompleted = `http://127.0.0.1:3001/orders/orders_byuserid/${urlQuery}`
    console.log('Id del customer en el fecth:  urlCompleted: ', urlCompleted)

    const fetchDataQueryOrdersByUserId = await fetch(urlCompleted, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const response = await fetchDataQueryOrdersByUserId.json()
    const { message, orders } = response
    console.log('En el fetch de consulta de ordenes por usuario tenemos:  ')
    console.log({ message, orders })

    if (response.status === 200 || response.status === undefined) {
      console.log('All OK:  ', message)
      setOrder(orders)
    } else if (response.status === 400) {
      const result = await response.json()
      for (const row of result.message) {
        for (const key in row) {
          errors.push(row[key])
        }
      }
      setErrors(errors)
    } else {
      setErrors(['Etwas ist schief gelaufen'])
    }
  }

  useEffect(() => {
    setMakeFetch(!makeFetch)
    if (!makeFetch) fetchDataQueryOrders()
  }, [dropdownToggled2, order])

  function handleDClick(ev, parOrderId) {
    const orderId = parOrderId
    fecthDataGetOrder(orderId)
  }

  function handleButtonAccept(ev) {
    setDropdownToggled2(!dropdownToggled2)
  }

  return (
    <>
      <main className="mainTableOrders">
        <Table striped className="contTableOrders" >
          <thead className="theadTableOrders">
            <tr>
              <th>N°</th>
              <th>Ref.</th>
              <th>Order Placed</th>
              <th>Order Data</th>
              <th>State</th>
              <th>Total (€)</th>
            </tr>
          </thead>
          <tbody className="orderTableBody">
            {
              Array.isArray(order)
                ? order.map((element, index) => {
                  return (
                    <tr key={element._id} className="contArticleItem" onDoubleClick={(ev, parOrderId) => handleDClick(ev, element._id)}>
                      <td>{index + 1}</td>
                      <td>{element._id}</td>
                      <td>{element.invoceDate.substring(0, 10)}</td>
                      <td>{element.dueDataDelivery.substring(0, 10)}</td>
                      <td>{'pending delivery'}</td>
                      <td>{element.toPay.totalToPay}</td>
                    </tr>
                  )
                })
                : ''
            }
          </tbody>
          <tfoot className="orderTableFoot">
            <div className="contSpanText">
              <span className="spanText">Double click on the order you want to view details</span>
            </div>
            <div className="contButtons">
              <Button
                handleButton={handleButtonAccept}
                text={messageOrders.textAccept}
              />
            </div>
          </tfoot>
        </Table>
      </main>
    </>
  )
}

export default Orders