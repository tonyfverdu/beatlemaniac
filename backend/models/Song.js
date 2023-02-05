// eslint-disable-next-line no-unused-vars
import colors from 'colors'
import { Schema, model } from 'mongoose'
import createHttpError from 'http-errors'

/*  ////////////////////////////////////////////////////////////////////////////////////////  **/
//  1.-  Instantation of an object of the class "Schema" (a schema)
const songSchema = Schema({
  idSec: { type: Number, required: true },
  year: { type: Number, required: true },
  image: [{ type: String }],
  album: [{ type: String }],
  title: { type: String, required: true },
  duration: { type: String, required: true },
  vocals: [{ type: String, enum: ['George Harrison', 'John Lennon', 'Paul McCartney', 'Ringo Starr',  'Instrumental', 'George Martin & his Orchestra'] }],
  price: { type: Number, required: true },
  mp3: { type: String },
  reproductions: { type: Number, default: 0 },
  visualisations: { type: Number, default: 0 },
  likes: { type: Number, default: 0 }
})

// 2.-  Static methods
songSchema.statics.findByAlbum = function (parAlbum) {
  const songFound = Song.findOne().where("album").equals(parAlbum)
  if (!songFound) throw createHttpError.NotFound(' No song found by Album - Keine Lied gefunden mit Album !!  😖  ')

  return songFound
}

songSchema.statics.findByYear = function (parYear) {
  const songFound = Song.find().where("year").equals(parYear)
  if (!songFound) throw createHttpError.NotFound(' No song found by Year - Keine Lied gefunden mit Jahr!!  😖  ')

  return songFound
}

songSchema.methods.toJSON = function () {
  const song = this
  const result = {
    _id: song._id,
    idSec: song.idSec,
    year: song.year,
    image: song.image,
    album: song.album,
    title: song.title,
    duration: song.duration,
    vocals: song.vocals,
    price: song.price,
    mp3: song.mp3,
    reproductions: song.reproductions,
    visualisations: song.visualisations,
    likes: song.likes
  }
  return result
}

// 2.- Instantation of model "Song" from Class "Model" with the Schema:  "songSchema"
const Song = model('Song', songSchema, 'songs')  //  ==>>  Colecction in "songs"


export default Song