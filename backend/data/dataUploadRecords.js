// eslint-disable-next-line no-unused-vars
import colors from "colors"
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import { myMongoDBConnection } from '../server.js'
import dataRecordsBeatles from './dataRecords.js'
import Record from '../models/Record.js'
dotenv.config()


export default async function functionCreateAllRecords(dataRecordsBeatles) {
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
  let objectJSONRecord
  const arrayJSONRecords = []

  dataRecordsBeatles.map((record, index) => {
    objectJSONRecord = {
      "idSec": index + 1,
      "collectionType": record.collectionType,
      "trackCount": record.trackCount,
      "image": record.image,
      "videoBrand": record.videoBrand,
      "title": record.title,
      "label": record.label,
      "released": record.released,
      "author_band": record.author_band,
      "genre": record.genre,
      "description": record.description,
      "comments": record.comments,
      "price": record.price,
      "stock": record.stock,
      "copyright": record.copyright
    }
    arrayJSONRecords.push(objectJSONRecord)
    return arrayJSONRecords
  })

  try {
    //  1.-  Delete ("drop") the collection of the database of MongoDB
    await Record.collection.drop()
    //  2.-  Create "register" (documents) in the model record (collection records)
    const recordsOfBeatles = await Record.create(arrayJSONRecords)
    if (recordsOfBeatles) {
      console.log('                                                                         '.bgGreen)
      console.log(`  Create ${recordsOfBeatles.length} Records of the Beatles in MongoDB (collection "records")  !!`.bgGreen)
      console.log('                                                                         '.bgGreen)
      console.log('')
      console.log(` "${recordsOfBeatles.length}" records created `.bgRed)
      console.log('')
      mongoose.connection.close()
    }
  } catch (error) {
    console.error(`Error:  ${error} `.bgRed)
  }
}

functionCreateAllRecords(dataRecordsBeatles)