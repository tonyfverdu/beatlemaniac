import express from 'express'
import * as controller from '../controllers/cartController.js'
import auth from '../middlewares/auth.js'

/**
 * dadurch brauchen wir kein try-catch mehr bei async middlewares
 */
import 'express-async-errors'


//  Initialitation of un object of the class "Router", management the routes in express
/**  Routes definition of "carts" */
const router = express.Router()

//  0.-  "post"  in route "/cart/addArticle" => setter 1 Article in cart (addArticle)
router.post('/addArticle', controller.addArticle)
// router.post('/addArticle', auth, addArticle)

// 0.-  "post" in route "/cart/addNewOrder" => setter and create 1 new Order in cart (addNewOrder)
router.post('/addNewOrder', controller.addNewOrder)

// 1.- "get"  in route "/cart" => getter all Articles in cart (getAllCart)
router.get('/', controller.getAllCart)

//  1.1-  "get"  in route "/cart/cart" => getter 1 Article in cart (getCart)

router.get('/cart', auth, controller.getCart)
// router.delete('/delete', deleteCart)


export default router