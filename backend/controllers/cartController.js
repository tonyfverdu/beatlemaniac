// eslint-disable-next-line no-unused-vars
import colors from 'colors'
import createHttpError from 'http-errors'
import Cart from '../models/Cart.js'
import Order from '../models/Order.js'
import Record from '../models/Record.js'
import User from '../models/User.js'
// import addDays from '../utils/addDays.js'


//  0.-  addOrder "post" in route "/cart/addNewOrder"  => setter 1 new Order in cart (addNewOrder)
export async function addNewOrder(req, resp) {
  let txt = ""
  const { userId, invoceDate, dueDataDelivery, records, toPay } = req.body
  const userFound = await User.findById(userId)
  if (!userFound) {
    throw createHttpError.NotFound(`Keine User gefunden !!`)
  }

  // 1. Cart suchen mit "_id" von user
  const cartUser = await Cart.findOne().where('user').equals(userFound._id)

  if (!cartUser) {
    console.log('')
    console.log('             Keine cart gefunden !!                💀             '.bgRed)
    console.log('')
    throw createHttpError.NotFound(`Keine cart gefunden !!`)
  } else {
    // 2. Order in Carts tun
    // const order = await Order.findById(orderId)

    // if (!order) throw createHttpError.NotFound(`Keine order gefunden !!`)
    const newOrder = await Order.create({
      cartUser,
      invoceDate,
      dueDataDelivery,
      records,
      toPay
    })

    // const orderDetail = await Order.find().where('user').equals(userFound._id).populate("Record")

    // console.log('orderDetail: '.bgRed, orderDetail)

    cartUser.orders.push(newOrder)  //  <<==  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    console.log('')
    console.log('                                                                      '.bgRed)
    console.log(` QUE PASA PENAAAAA  !! PUSH OF PRODUCT IN THE CART: "${cartUser._id}", OF MONGODB `.bgRed)
    console.log('                                                                      '.bgRed)
    console.log('')
    console.log('                                                                      '.bgWhite)
    console.log('    Show document "cart" of the Mongodb (collection: "carts")         '.bgWhite)
    console.log('                                                                      '.bgWhite)
    console.log('')
    txt += `||  ************************************************************************** ||\n`
    // txt += `||  There are ${cart.orders.length} orders in the cart (Id: ${cart._id}):  ||\n`

    // for (let i = 0; i < cart.products.length; i++) {
    //   const record = cart.populate(`products.${i}.recordId`, '_id title')
    //   console.log('record:  ', record)
    //   txt += `||  N°: ${i + 1}    Article ID: ${cart.products.recordId}     \n`  //  Amount: ${cart.products[i].amount}
    //   txt += `||  Cart ID: ${cart._id}   Title: ${record.title}  Price of article: ${record.price} Euro    Stock: ${record.stock}  \n`
    //   txt += `||                                                                            ||\n`
    // }
    txt += `||  ************************************************************************** ||\n`
    console.log(`${txt}`.bgWhite)
    console.log('')

    await cartUser.save()

    resp.status(200).send({
      message: `Add Order: to SHOPPING CART": ${cartUser._id}" in MONGODB!`,
      newOrder
    })
  }
}

//  0.-  addArticle   "post"  in route "/cart/addArticle"  => setter 1 Article in cart (addArticle)
export async function addArticle(req, resp) {
  let txt = ""
  const { userId, idArticle, amount } = req.body
  const userFound = await User.findById(userId)
  if (!userFound) {
    throw createHttpError.NotFound(`Keine User gefunden !!`)
  }
  const articleBuy = await Record.findById(idArticle)
  if (!articleBuy) {
    throw createHttpError.NotFound(`Keine Article gefunden !!`)
  }

  // eventuell userid in ObjectId umwandeln  ==>>  eventualmente se puede convertir userid a ObjectId
  // const userId = mongoose.Types.ObjectId(user._id)

  // 1. Cart suchen mit "_id" von user
  const cart = await Cart.findOne().where('user').equals(userFound._id)

  // Wenn user die cartId verwaltet im Model
  // const cart = await Cart.findById(user.cart)

  if (!cart) {
    console.log('')
    console.log('             Keine cart gefunden !!                💀             '.bgRed)
    console.log('')
    throw createHttpError.NotFound(`Keine cart gefunden !!`)
  } else {
    // 2. Produkte in Carts tun
    const product = await Record.findById(idArticle)

    if (!product) throw createHttpError.NotFound(`Keine product gefunden !!`)

    cart.products.push({ product, amount })

    console.log('')
    console.log('                                                                      '.bgRed)
    console.log(` QUE PASA PENAAAAA  !! PUSH OF PRODUCT IN THE CART: "${cart._id}", OF MONGODB `.bgRed)
    console.log('                                                                      '.bgRed)
    console.log('')
    console.log('                                                                      '.bgWhite)
    console.log('    Show document "cart" of the Mongodb (collection: "carts")         '.bgWhite)
    console.log('                                                                      '.bgWhite)
    console.log('')
    txt += `||  ************************************************************************** ||\n`

    // for (let i = 0; i < cart.products.length; i++) {
    //   const record = cart.populate(`products.${i}.recordId`, '_id title')
    //   console.log('record:  ', record)
    //   txt += `||  N°: ${i + 1}    Article ID: ${cart.products.recordId}     \n`  //  Amount: ${cart.products[i].amount}
    //   txt += `||  Cart ID: ${cart._id}   Title: ${record.title}  Price of article: ${record.price} Euro    Stock: ${record.stock}  \n`
    //   txt += `||                                                                            ||\n`
    // }
    txt += `||  ************************************************************************** ||\n`
    console.log(`${txt}`.bgWhite)
    console.log('')

    await cart.save()
    resp.status(200).send({
      message: `Add Article: ${articleBuy.title} to SHOPPING CART in MONGODB: ${cart._id} `,
      cart
    })
  }
}

//  1.-  getAllCart
export async function getAllCart(req, resp) {
  let txt = ""

  //  1.-  Man erhalt allen Daten von collection "carts" in DB von MongoDB  (function mongoose "find()")
  const cartsSearch = await Cart.find()

  if (cartsSearch.length < 1) {  //  <<==  Es gibt keine Daten
    console.log('')
    console.log('             Keine Warenkorbe gefunden !!                🧺              '.bgRed)
    console.log('')

    // resp.render("showAllCarts", {
    //   data: {},
    //   numdocuments: cartsSearch.length,
    //   title: "SHOW ALL CARTS OF DB MONGODB !!               ⏺️ ",
    //   description: 'List of all "documents (carts)" of the DB MongoDb in the collection: "carts"',
    //   text1: "The environment variables are:",
    //   // eslint-disable-next-line object-property-newline
    //   text2: "Localhost:", localHostIs: myLocalHost,
    //   text3: "Port:", portIs: myPort,
    //   text4: "MongoDB database connection:",
    //   text5: "URI(DB-Connection):", uriIs: myMongoDBConnection,
    //   text6: "IdRandom:", idIs: IDRANDOM_OF_SESSION
    // })
    throw createHttpError.NotFound('Keine Records gefunden !!')
  } else {
    console.log('')
    console.log('                                                                      '.bgRed)
    console.log(`    QUE PASA PENAAAAA  !!!!   SHOW ALL DOCUMENTS: "${cartsSearch.length}", IN MONGODB    `.bgRed)
    console.log('                                                                      '.bgRed)
    console.log('')
    console.log('                                                                      '.bgWhite)
    console.log('    Show all documents of the DB-Mongodb (collection: "carts")      '.bgWhite)
    console.log('                                                                      '.bgWhite)
    console.log('')
    txt += `||  ************************************************************************** ||\n`
    txt += `||  Documents of the collection of Database of MongoDB:                        ||\n`

    for (let i = 0; i < cartsSearch.length; i++) {
      txt += `||  N°: ${i + 1}    invoiceDate: ${cartsSearch[i].invoiceDate}   Total: ${cartsSearch[i].toPay.totalToPay} Euro\n`
      txt += `||  ID: ${cartsSearch[i]._id}          User: ${cartsSearch[i].user} \n`
      txt += `||                                                                            ||\n`
    }
    txt += `||  ************************************************************************** ||\n`
    console.log(`${txt}`.bgWhite)
    console.log('')

    resp.status(200).send({
      message: `SHOW ALL DOCUMENTS: "${cartsSearch.length}", IN MONGODB `,
      carts: cartsSearch
    })
  }
}

//  1.1.-  getCart
export async function getCart(req, resp) {
  const { cartId } = req.query

  // Suchen cart by cart_Id
  const cartFound = await Cart.findById(cartId)


  if (!cartFound) {
    console.log('')
    console.log('             Keine Warenkorb gefunden !!              🧺               '.bgRed)
    console.log('')

    throw createHttpError.NotFound('Keine Cart gefunden')
  } else {
    const { invoiceDate, records, toPay, user } = cartFound
    resp.status(200).send({
      message: `SHOW DOCUMENT CART: ${cartFound._id}, IN MONGODB `,
      invoiceDate,
      records,
      toPay,
      user
    })
  }
}
