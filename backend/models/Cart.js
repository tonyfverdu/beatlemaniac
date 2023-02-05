import { Schema, model } from "mongoose"


const cartSchema = Schema({
  records: [
    {
      recordId: {
        type: Schema.Types.ObjectId, ref: 'Record'
      },
      // songId: { type: Schema.Types.ObjectId, ref: 'Song' },
      // movieId: { type: Schema.Types.ObjectId, ref: 'Movie' },
      amount: { type: Number, default: 1 }
    }
  ],
  orders: [
    {
      orderId: { type: Schema.Types.ObjectId, ref: 'Order' }
    }
  ],
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

/*    CREAR METODO DE INSTANCIA DE ENCONTAR PRODUCTO EN CART, ...

*/

// cartSchema.methods.toJSON = function () {
//   const cart = this
//   const result = {
//     _id: cart._id,
//     products: cart.products,
//     user: cart.user
//   }
//   return result
// }
cartSchema.methods.toJSON = function () {
  const cart = this
  const result = {
    _id: cart._id,
    records: cart.records,
    orders: cart.orders,
    user: cart.user
  }
  return result
}

const Cart = model('Cart', cartSchema, 'carts')
export default Cart