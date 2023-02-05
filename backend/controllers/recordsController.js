// eslint-disable-next-line no-unused-vars
import colors from 'colors'
import createHttpError from "http-errors"
import Record from "../models/Record.js"
import { myLocalHost, myPort, myMongoDBConnection, IDRANDOM_OF_SESSION } from "../server.js"

//  || Server: "routing": Routes of "/records":  app.use('/records', recordRouter); ===>>  {  || Controlers ||  }


//*    CONTROLLERS OF RECORDS-ROUTES       ///////////////////////////////////////////////////////////////////// **/
//  1.-  getAllRecords
/** @type {import("express").RequestHandler} */
export async function getAllRecords(req, resp) {
  let txt = ""

  //  1.-  Man erhalt allen Daten von collection "records" in DB von MongoDB  (function mongoose "find()")
  let recordsSearch = await Record.find()

  //  2.-  Die Blöcke der Abfragen des gestellten Querys werden definiert
  //       Se definen los bloques de las consultas del conjunto consulta
  const { minPrice, maxPrice, oldDate, newDate } = req.query  // Ich erhalte die Daten aus der Abfrage im req-Objekt. Obtengo los datos de la consulta en el objeto req.
  const minNumPrice = Number(minPrice)
  const maxNumPrice = Number(maxPrice)
  const oldNumDate = Number(oldDate)
  const newNumDate = Number(newDate)

  // Query Block - filtering über Query-Params (estan en el query)
  // if (label) recordsSearch = recordsSearch.where('label').equals(label)
  // if (min) recordsSearch = recordsSearch.where('price').gt(minPrice)
  if (minPrice && maxPrice) {
    recordsSearch = recordsSearch.filter(elem => {
      if (minNumPrice <= elem.price && maxNumPrice >= elem.price) {
        return elem
      }
    })
  }
  if (oldDate && newDate) {
    recordsSearch = recordsSearch.filter(elem => {
      if (oldNumDate <= elem.released.getFullYear() && newNumDate >= elem.released.getFullYear()) {
        return elem
      }
    })
  }

  // if (stock) recordsSearch = recordsSearch.where('stock').gt(stock)

  // if (label) recordsSearch = recordsSearch.where('label').equals(label)


  //  3.-  Ich führe die Abfrage der Dokumente in der collection mit den Querys
  //       Ejecuto la consulta (Query) de los documentos de la colección con las consultas
  // Query auflösen - disolver
  const recordsFound = await recordsSearch

  if (recordsFound.length < 1) {  //  <<==  Es gibt keine Daten
    console.log('')
    console.log('             Keine Records gefunden !!                🎧             '.bgRed)
    console.log('')

    resp.render("showAllRecords", {
      data: {},
      numdocuments: recordsFound.length,
      title: "SHOW ALL RECORDS OF DB MONGODB !!               ⏺️ ",
      description: 'List of all "documents (records)" of the DB MongoDb in the collection: "records"',
      text1: "The environment variables are:",
      // eslint-disable-next-line object-property-newline
      text2: "Localhost:", localHostIs: myLocalHost,
      text3: "Port:", portIs: myPort,
      text4: "MongoDB database connection:",
      text5: "URI(DB-Connection):", uriIs: myMongoDBConnection,
      text6: "IdRandom:", idIs: IDRANDOM_OF_SESSION
    })
    // throw createHttpError.NotFound('Keine Records gefunden !!');
  } else {
    console.log('')
    console.log('                                                                      '.bgRed)
    console.log(`    QUE PASA PENAAAAA  !!!!   SHOW ALL DOCUMENTS: "${recordsFound.length}", IN MONGODB    `.bgRed)
    console.log('                                                                      '.bgRed)
    console.log('')
    console.log('                                                                      '.bgWhite)
    console.log('    Show all documents of the DB-Mongodb (collection: "records")      '.bgWhite)
    console.log('                                                                      '.bgWhite)
    console.log('')
    txt += `||  ************************************************************************** ||\n`
    txt += `||  Documents of the collection of Database of MongoDB:                        ||\n`

    for (let i = 0; i < recordsFound.length; i++) {
      txt += `||  N°: ${i + 1}    Title: ${recordsFound[i].title}   Author or Band: ${recordsFound[i].author_band}   Genre: ${recordsFound[i].genre}   \n`
      txt += `||  ID: ${recordsFound[i]._id}          Price:  ${recordsFound[i].price} Euro          Stock:  ${recordsFound[i].stock}  \n`
      txt += `||                                                                            ||\n`
    }
    txt += `||  ************************************************************************** ||\n`
    console.log(`${txt}`.bgWhite)
    console.log('')

    resp.status(200).send({
      message: `SHOW ALL DOCUMENTS: "${recordsFound.length}", IN MONGODB `,
      records: recordsFound
    })
  }
}


//  1.1.-  getRecord
export async function getRecord(req, resp) {
  const { _id, title } = req.query

  // Query definieren
  let recordsSearch = Record.find()

  // Query Block - filtering über Query-Params (estan en el query)
  if (_id) recordsSearch = recordsSearch.where('_id').equals(_id)
  if (title) recordsSearch = recordsSearch.where('title').equals(title)

  // Query auflösen
  const recordFound = await recordsSearch

  if (!recordFound) throw createHttpError.NotFound('Keine Record gefunden')

  resp.status(200).send({
    message: `SHOW DOCUMENTS: ${recordFound[0].title}, IN MONGODB `,
    record: recordFound[0]
  })
}