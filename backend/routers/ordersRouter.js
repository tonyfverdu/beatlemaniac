import express from 'express'
import * as controller from '../controllers/orderController.js'

/**
 * dadurch brauchen wir kein try-catch mehr bei async middlewares
 */
import 'express-async-errors'


/**  Routes definition of "orders" */
const router = express.Router()

//  0.-  "post"  in route "/orders/addOrder" => setter 1 Order in cart (addNewOrder)
// router.post('/addOrder', controller.addNewOrder)

//  1.-  "get"  in route "/orders" => getter all orders (getAllOrders)
router.get('/', controller.getAllOrders)

//  1.1-  "get" in route "/orders/order" => getter one order (getOrder)
router.get('/order', controller.getOrder)

//  1.2.  "get" in route "/orders/orders_byuserid" => getter with query of orders (array) () 
router.get('/orders_byuserid', controller.getCartByUserId)

export default router