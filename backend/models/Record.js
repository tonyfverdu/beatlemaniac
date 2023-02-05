// eslint-disable-next-line no-unused-vars
import mongoose, { Schema, model } from 'mongoose'

/*  ////////////////////////////////////////////////////////////////////////////////////////  **/
//  1.-  Instantation of an object of the class "Schema" (a schema)
const recordSchema = Schema({
  idSec: { type: Number, required: true },
  collectionType: { type: String, enum: ['Single', 'Double', 'Collection'] },
  trackCount: Number,
  image: [String],
  videoBrand: String,
  title: { type: String, required: true },
  label: { type: String, required: false },
  released: { type: Date, default: Date.now, required: true },
  author_band: { type: String, required: true },
  genre: { type: String, enum: ['Soft-Rock', "Hard-Rock", "Normal-Rock", "Pop-Rock", "Soft-Pop", "Pop", "Hip-Hop", "Jaz", 'Classic', "Other"] },
  description: String,
  comments: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  copyright: String
})

recordSchema.methods.toJSON = function () {
  const record = this
  const result = {
    _id: record._id,
    idSec: record.idSec,
    collectionType: record.collectionType,
    trackCount: record.trackCount,
    image: record.image,
    videoBrand: record.videoBrand,
    title: record.title,
    label: record.label,
    released: record.released,
    author_band: record.author_band,
    genre: record.genre,
    description: record.description,
    comments: record.comments,
    price: record.price,
    stock: record.stock,
    copyright: record.copyright
  }
  return result
}

// 2.- Instantation of model "Record" from Class "Model" with the Schema:  "recordSchema"
const Record = model('Record', recordSchema, 'records')  //  ==>>  Colecction in "records"


export default Record
/*  ////////////////////////////////////////////////////////////////////////////////////////  **/