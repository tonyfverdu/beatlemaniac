// eslint-disable-next-line no-unused-vars
import colors from 'colors'
import createHttpError from "http-errors"
import Cart from '../models/Cart.js'
import Order from "../models/Order.js"
import User from '../models/User.js'


//  || Server: "routing": Routes of "/orders":  app.use('/orders', orderRouter); ===>>  {  || Controlers ||  }

//*    CONTROLLERS OF RECORDS-ROUTES       ///////////////////////////////////////////////////////////////////// **/
//  0.-  postNewOrder
//  0.-  "post"  in route "/orders/addOrder" => setter 1 Order in cart (postNewOrder)
/** @type {import("express").RequestHandler} */


//  1.-  getAllOrders (route: "get"  in route "/orders" => getter all orders (getAllOrders) )
/** @type {import("express").RequestHandler} */
export async function getAllOrders(req, resp) {
  let txt = ""
  const cartId = req.query

  //  1.-  Man erhalt allen Daten von collection "orders" in DB von MongoDB  (function mongoose "find()")
  let ordersSearch = await Order.find()
  console.log('ordersSearch:  '.bgRed, ordersSearch)
  console.log('Is Array??:  ', Array.isArray(ordersSearch), '  Legth?:  ', ordersSearch.length)

  if (cartId) {
    ordersSearch = ordersSearch.where('cart').equals(cartId)
  }

  const ordersFound = await ordersSearch
  if (!ordersFound) throw createHttpError.NotFound('Keine Order gefunden')

  if (ordersFound.length <= 0) {  //  <<==  Es gibt keine Daten
    console.log('')
    console.log('             Keine Orders gefunden !!                🎧             '.bgRed)
    console.log('')

    throw createHttpError.NotFound('Keine Order gefunden')
  }
  if (ordersSearch.length === 1) {
    console.log('')
    console.log('             There is only an Order found !!                🎧             '.bgRed)
    console.log('')

    resp.status(200).send({
      message: `There is ${ordersSearch.length} Order found in the shopping cart !!  🎧`,
      orders: ordersSearch
    })
  } else if (ordersSearch.length >= 1) {
    console.log('')
    console.log('                                                                      '.bgRed)
    console.log(`    QUE PASA PENAAAAA  !!!!   SHOW ALL DOCUMENTS: "${ordersSearch.length}", IN MONGODB    `.bgRed)
    console.log('                                                                      '.bgRed)
    console.log('')
    console.log('                                                                      '.bgWhite)
    console.log('    Show all documents of the DB-Mongodb (collection: "orders")      '.bgWhite)
    console.log('                                                                      '.bgWhite)
    console.log('')
    txt += `||  ************************************************************************** ||\n`
    txt += `||  Documents of the collection of Database of MongoDB:                        ||\n`

    for (let i = 0; i < ordersSearch.length; i++) {
      txt += `||  N°: ${i + 1}    Invoce Date: ${ordersSearch[i].invoceDate}   Due Data delivery: ${ordersSearch[i].dueDataDelivery}  \n`
      txt += `||  Order ID: ${ordersSearch[i]._id}          To Pay:  ${ordersSearch[i].toPay} Euro  \n`
      txt += `||                                                                            ||\n`
    }
    txt += `||  ************************************************************************** ||\n`
    console.log(`${txt}`.bgWhite)
    console.log('')

    resp.send({
      message: `SHOW ALL DOCUMENTS: "${ordersSearch.length}", IN MONGODB `,
      orders: ordersSearch
    })
  }
}


//  2.2.-  getCartByOrderId  (route: "get"  in route "/orders/orders_byuserid" => getter all orders (getAllOrders) )
export async function getCartByUserId(req, resp) {
  let txt = ''
  const { userId } = req.query

  const userByIdFound = await User.findById(userId)
  if (!userByIdFound) {
    console.log('                                                                       '.bgRed)
    console.log(" There is not any Users in MongoDB - Keine Benutzer gefunden !!   😖   ".bgRed)
    console.log('                                                                       '.bgRed)
    throw createHttpError.NotFound(" There is not any Users in MongoDB - Keine Benutzer gefunden !!  😖  ")
  }

  const cart = await Cart.findOne().where('user').equals(userByIdFound._id)
  if (!cart) {
    console.log('                                                                       '.bgRed)
    console.log(" There is not any Cart with thas User- Keine Warenkorb gefunden !  😖  ".bgRed)
    console.log('                                                                       '.bgRed)
    throw createHttpError.NotFound(" There is not any Users in MongoDB - Keine Benutzer gefunden !!  😖  ")
  }

  // Query definieren
  let ordersSearch = Order.find()

  // Query Block - filtering über Query-Params (estan en el query)
  if (userId) ordersSearch = ordersSearch.where('car').equals(cart._id)

  // Query auflösen
  const OrdersFound = await ordersSearch

  // const OrdersFound = cart.orders
  // console.log('OrdersFound:  ', OrdersFound)


  if (!OrdersFound) {
    throw createHttpError.NotFound('Keine Bestellung gefunden')
  }

  if (OrdersFound.length <= 0) {     //  <<==  Es gibt keine Daten
    console.log('')
    console.log('                                                                     '.bgRed)
    console.log(" There aren't any Orders MongoDB - Keine Bestellung gefunden !!  😖  ".bgRed)
    console.log('                                                                     '.bgRed)
    console.log('')

    throw createHttpError.NotFound(" There aren't any Orders in MongoDB - Keine Bestellung gefunden !!  😖  ")
  } else if (OrdersFound.length === 1) {
    console.log('')
    console.log('                                                                      '.bgRed)
    console.log(` SHOW ONLY 1 ORDERS-DOCUMENT: "${OrdersFound._id}" FOUND, IN MONGODB  `.bgRed)
    console.log('                                                                      '.bgRed)
    console.log('')
    console.log('                                                                      '.bgWhite)
    console.log('    Show all documents of the DB-Mongodb (collection: "orders")       '.bgWhite)
    console.log('                                                                      '.bgWhite)
    console.log('')
    txt += `||  ************************************************************************** ||\n`
    txt += `||  Document "order" of the collection of Database of MongoDB:                 ||\n`
    txt += `||  Order ID: ${OrdersFound[0]._id}    Cart ID: ${OrdersFound[0].cart}   User: ${userByIdFound.treament} ${userByIdFound.firstName} ${userByIdFound.lastName}\n`
    txt += `||  Invoce Date: ${OrdersFound[0].invoceDate}    Due date delivery: ${OrdersFound[0].dueDataDelivery}   \n`
    txt += `||  Products: \n`
    txt += `||             Articles: ${OrdersFound[0].records}   \n`
    txt += `||  To Pay:   \n`
    txt += `||  SubTotal: ${OrdersFound[0].toPay.subtotal}  VAT(19%): ${OrdersFound[0].toPay.VAT}  Delivery Cost:${OrdersFound[0].toPay.deliveryCost}  Discount:${OrdersFound[0].toPay.discount} \n`
    txt += `||                                                                            ||\n`
    txt += `||  Total to pay: ${OrdersFound[0].toPay.totalToPay}  \n`
    txt += `||                                                                            ||\n`
    txt += `||  ************************************************************************* ||\n`
    console.log(`${txt}`.bgWhite)
    console.log('')

    resp.status(200).send({
      message: `SHOW DOCUMENTS ORDERS BY USERID: ${userId}) || Order: ${OrdersFound[0]._id}, IN MONGODB `,
      orders: OrdersFound
    })
  } else {
    console.log('')
    console.log('                                                                      '.bgRed)
    console.log(` SHOW  "${OrdersFound.length}"  ORDERS-DOCUMENT FOUND, IN MONGODB     `.bgRed)
    console.log('                                                                      '.bgRed)
    console.log('')
    console.log('                                                                      '.bgWhite)
    console.log('    Show all documents of the DB-Mongodb (collection: "orders")       '.bgWhite)
    console.log('                                                                      '.bgWhite)
    console.log('')
    txt += `||  ************************************************************************** ||\n`
    txt += `||  Documents "order" of the collection of Database of MongoDB:                ||\n`

    for (let i = 0; i < OrdersFound.length; i++) {
      txt += `||  Order ID: ${OrdersFound[i]._id}    Cart ID: ${OrdersFound[i].cart}   User: ${userByIdFound.treament} ${userByIdFound.firstName} ${userByIdFound.lastName}\n`
      txt += `||  Invoce Date: ${OrdersFound[i].invoceDate}    Due date delivery: ${OrdersFound[i].dueDataDelivery}   \n`
      txt += `||  Products: \n`
      txt += `||             Articles: ${OrdersFound[i].records}   \n`
      txt += `||  To Pay:   \n`
      txt += `||  SubTotal: ${OrdersFound[i].toPay.subtotal}  VAT(19%): ${OrdersFound[i].toPay.VAT}  Delivery Cost:${OrdersFound[i].toPay.deliveryCost}  Discount:${OrdersFound[i].toPay.discount} \n`
      txt += `||                                                                            ||\n`
      txt += `||  Total to pay: ${OrdersFound[i].toPay.totalToPay}  \n`
      txt += `||                                                                            ||\n`
      txt += `||  ************************************************************************* ||\n`
    }
    console.log(`${txt}`.bgWhite)
    console.log('')

    resp.status(200).send({
      message: `SHOW DOCUMENTS ORDERS BY USERID: ${userId}) || Order: "${OrdersFound.length}" orders IN MONGODB `,
      orders: OrdersFound
    })
  }

  // resp.status(200).send({
  //   message: `'All OK'`
  // })
}

//  2.2.-  "getOrder" in route "/orders/order" => getter one order (getOrder)
export async function getOrder(req, resp) {
  let txt = ""

  const { orderId } = req.query

  //  Populate nicht funkcioniert, denn ich habe eine serach process in products
  const orderFound = await Order.findById(orderId).populate('records')

  if (!orderFound) {
    console.log('                                                                       '.bgRed)
    console.log(' There is not any Order in MongoDB with thas "orderId" - Keine Bestellung gefunden !!   😖   '.bgRed)
    console.log('                                                                       '.bgRed)
    throw createHttpError.NotFound(' There is not any Order in MongoDB with thas "orderId" - Keine Bestellung gefunden !!   😖   ')
  }

  console.log('orderFound:  '.bgRed, orderFound)

  // function sacarIdProducts() {
  //   return orderFound.products.map(elemt => {
  //     const idProduct = elemt._id.toString()
  //     return idProduct
  //   })
  // }
  // const idOfDetails = sacarIdProducts()
  // console.log('idOfDetails[0]:  '.bgRed, idOfDetails[0])

  // const unProductDetail = await Record.findOne().where('_id').equals(idOfDetails[0].toString())
  // console.log('unProductDetail:  '.bgGreen, unProductDetail)

  // const productDetails = idOfDetails.map(elemtId => {
  //   const detail = Record.findById(elemtId)
  //   return detail
  // })
  // console.log('productDetails:  '.bgRed, productDetails)
  // console.log('productsDetails:  '.bgRed, productsDetails)

  // console.log('orderFound:  ', orderFound)

  resp.status(200).send({
    message: `SHOW DOCUMENT ORDER: "${orderFound}" IN MONGODB `,
    orderFound
  })
}