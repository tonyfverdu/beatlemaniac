// eslint-disable-next-line no-unused-vars
import colors from "colors"
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import { myMongoDBConnection } from '../server.js'
import dataSongsBeatles from './dataSongs.js'
import Song from '../models/Song.js'
dotenv.config()


export default async function functionCreateAllSongs(dataSongssBeatles) {
  console.log(process.env.DB_CONN)
  //  1.-  Connection a MongoDb from Mongoose, with the DB_URI definied in .env (but here I going to do changeconst objectJSONRecord
  //       the collection a "records2")
  mongoose.connect(myMongoDBConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log('         Datenbank läuft                                             '.bgBlue)
      console.log('                                                                     '.bgBlue)
      console.log(` ||==>>  Auf Deutch:  Acthung!  Datenbank läuft                      `.bgBlue)
      console.log('                                                                     '.bgBlue)
      console.log(` MONGOOSE=> MONGODB URI: ${myMongoDBConnection}   🌤️  `.bgCyan)
      console.log('                                                                     '.bgBlue)
      console.log('                                                                     '.bgBlue)
      console.log('   🫒      Successfully connected to DB MongoDB (DB = "task_special") '.bgWhite)
      console.log('                                                                     '.bgBlue)
      console.log('')
    })
    .catch((err) => {
      console.log('')
      console.log('            Datenbank Verbindung fehlgeschlagen      🌨️                    '.bgYellow)
      console.log('                                                                           '.bgRed)
      console.error(`   🍓     Error:  Not Successfully connected to Databse MongoDB: ${err}  `.bgRed)
      console.log('                                                                           '.bgRed)
      console.log('')
    })

  //  2.-  Create by means of a set of "promises" each record (document) of the records collection, only with the
  //       provided keys in "record"
  let objectJSONSong
  const arrayJSONSongs = []

  dataSongsBeatles.map((song, index) => {
    objectJSONSong = {
      "idSec": index + 1,
      "year": song.year,
      "image": song.image,
      "album": song.album,
      "title": song.title,
      "duration": song.duration,
      "vocals": song.vocals,
      "price": song.price,
      "mp3": song.mp3
    }
    arrayJSONSongs.push(objectJSONSong)
    return arrayJSONSongs
  })

  try {
    //  1.-  Delete ("drop") the collection of the database of MongoDB
    await Song.collection.drop()
    //  2.-  Create "register" (documents) in the model record (collection records)
    const songsOfBeatles = await Song.create(arrayJSONSongs)
    if (songsOfBeatles) {
      console.log('                                                                         '.bgGreen)
      console.log(`  Create ${songsOfBeatles.length} "songs" of the Beatles in MongoDB (collection "records")  !!`.bgGreen)
      console.log('                                                                         '.bgGreen)
      console.log('')
      console.log(` "${songsOfBeatles.length}" songs created `.bgRed)
      console.log('')
      mongoose.connection.close()
    }
  } catch (error) {
    console.error(`Error:  ${error} `.bgRed)
  }
}

functionCreateAllSongs(dataSongsBeatles)
