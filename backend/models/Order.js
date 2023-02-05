import { Schema, model } from 'mongoose'
import createHttpError from 'http-errors'


/*  ////////////////////////////////////////////////////////////////////////////////////////  **/
//  1.-  Instantation of an object of the class "Schema" (a schema)
const orderSchema = Schema({
  cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
  invoceDate: { type: Date, default: Date.now, required: true },
  dueDataDelivery: { type: Date },
  records: [
    {
      articleInSC: {
        "id_sec": { type: Number },
        "title": { type: String },
        "label": { type: String },
        "released": { type: Date, default: Date.now },
        "author_band": { type: String },
        "genre": { type: String, enum: ['Soft-Rock', "Hard-Rock", "Normal-Rock", "Pop-Rock", "Soft-Pop", "Pop", "Hip-Hop", "Jaz", 'Classic', "Other"] },
        "description": String,
        "comments": String,
        "price": { type: Number },
        "stock": { type: Number }
      },
      amountOfArticle: { type: Number, default: 1 }
    }
  ],
  toPay: {
    subtotal: { type: Number, default: 0, required: true },
    VAT: { type: Number, default: 0 },
    deliveryCost: { type: Number, dafault: 0, required: true },
    discount: { type: Number, default: 0 },
    totalToPay: { type: Number, default: 0, required: true }
  }
})

// 2.-  Static methods
orderSchema.statics.findByInvoceDate = function (parInvoceDate) {
  const orderFound = Order.findOne().where("invoceDate").equals(parInvoceDate)
  if (!orderFound) throw createHttpError.NotFound(' No invoce found by invoceDate - Keine Invoce gefunden mit invoceDate !!  😖  You shall not pass!')

  return orderFound
}

// orderSchema.statics.findByCartId = function (parCartId) {
//   const orders = Order.find()

//   Order.findOne().where(theCart._id).equals(parCartId)
//   if (!orderFound) throw createHttpError.NotFound(' No invoce found by parCartId - Keine Invoce gefunden mit parCartId !!  😖  You shall not pass!')

//   return orderFound
// }


orderSchema.methods.toJSON = function () {
  const order = this
  const result = {
    _id: order._id,
    cart: order.cart,
    invoceDate: order.invoceDate,
    dueDataDelivery: order.dueDataDelivery,
    records: order.records,
    toPay: order.toPay
  }
  return result
}


// 3.- Instantation of model "Invoce" from Class "Model" with the Schema:  "invoceSchema"
const Order = model('Order', orderSchema, 'orders')

export default Order