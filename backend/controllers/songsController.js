// eslint-disable-next-line no-unused-vars
import colors from 'colors'
import createHttpError from "http-errors"
import Song from "../models/Song.js"
// import { myLocalHost, myPort, myMongoDBConnection, IDRANDOM_OF_SESSION } from "../server.js"

//  || Server: "routing": Routes of "/records":  app.use('/records', recordRouter); ===>>  {  || Controlers ||  }

//*    CONTROLLERS OF RECORDS-ROUTES       ///////////////////////////////////////////////////////////////////// **/
//  1.-  getAllSongs
/** @type {import("express").RequestHandler} */
export async function getAllSongs(req, resp) {
  let txt = ""

  //  1.-  Man erhalt allen Daten von collection "songs" in DB von MongoDB  (function mongoose "find()")
  let songsSearch = await Song.find()

  //  2.-  Die Blöcke der Abfragen des gestellten Querys werden definiert
  //       Se definen los bloques de las consultas del conjunto consulta
  const { oldYear, newYear, minPrice, maxPrice } = req.query  // Ich erhalte die Daten aus der Abfrage im req-Objekt. Obtengo los datos de la consulta en el objeto req.
  const minNumPrice = Number(minPrice)
  const maxNumPrice = Number(maxPrice)
  const oldNumYear = Number(oldYear)
  const newNumYear = Number(newYear)
  // Query Block - filtering über Query-Params (estan en el query)
  // if (minYear) songsSearch = songsSearch.where('year').lt(minYear)
  // if (maxYear) songsSearch = songsSearch.where('year').lt(maxYear)
  // if (stock) recordsSearch = recordsSearch.where('stock').gt(stock)
  // if (label) recordsSearch = recordsSearch.where('label').equals(label)
  if (minPrice && maxPrice) {
    songsSearch = songsSearch.filter(elem => {
      if (minNumPrice <= elem.price && maxNumPrice >= elem.price) {
        return elem
      }
    })
    console.log('songsSearch:  '.bgGreen, songsSearch)
  }
  if (oldYear && newYear) {
    songsSearch = songsSearch.filter(elem => {
      if (oldNumYear <= elem.year && newNumYear >= elem.year) {
        return elem
      }
    })
  }

  //  3.-  Ich führe die Abfrage der Dokumente in der collection mit den Querys
  //       Ejecuto la consulta (Query) de los documentos de la colección con las consultas
  // Query auflösen - disolver
  let songsFound = []
  if (songsSearch.length > 0) {
    songsFound = await songsSearch
  }

  if (songsFound.length < 1) {  //  <<==  Es gibt keine Daten
    console.log('')
    console.log('             Keine Songs gefunden !!                🎧             '.bgRed)
    console.log('')

    // resp.render("showAllSongs", {
    //   data: {},
    //   numdocuments: songsFound.length,
    //   title: "SHOW ALL SONGS OF MONGODB !!               ⏺️ ",
    //   description: 'List of all "documents (songs)" of the DB MongoDb in the collection: "songs"',
    //   text1: "The environment variables are:",
    //   // eslint-disable-next-line object-property-newline
    //   text2: "Localhost:", localHostIs: myLocalHost,
    //   text3: "Port:", portIs: myPort,
    //   text4: "MongoDB database connection:",
    //   text5: "URI(DB-Connection):", uriIs: myMongoDBConnection,
    //   text6: "IdRandom:", idIs: IDRANDOM_OF_SESSION
    // })
    resp.status(200).send({
      status: 200,
      message: `SHOW ALL DOCUMENTS: "${songsFound.length}", IN MONGODB `,
      songs: songsFound
    })
    // throw createHttpError.NotFound('Keine Records gefunden !!');
  } else {
    console.log('')
    console.log('                                                                      '.bgRed)
    console.log(`    QUE PASA PENAAAAA  !!!!   SHOW ALL DOCUMENTS: "${songsFound.length}", IN MONGODB    `.bgRed)
    console.log('                                                                      '.bgRed)
    console.log('')
    console.log('                                                                      '.bgWhite)
    console.log('    Show all documents of the DB-Mongodb (collection: "songs")        '.bgWhite)
    console.log('                                                                      '.bgWhite)
    console.log('')
    txt += `||  ************************************************************************** ||\n`
    txt += `||  Documents of the collection of Database of MongoDB:                        ||\n`

    for (let i = 0; i < songsFound.length; i++) {
      txt += `||  N°: ${i + 1}    Title: ${songsFound[i].title}   Year: ${songsFound[i].year}   Album(s): ${songsFound[i].album}    Duration(m): ${songsFound[i].duration}   \n`
      txt += `||  ID: ${songsFound[i]._id}                        Vocal(s): ${songsFound[i].vocals}   Price:  ${songsFound[i].price} Euro        \n`
      txt += `||                                                                            ||\n`
    }
    txt += `||  ************************************************************************** ||\n`
    console.log(`${txt}`.bgWhite)
    console.log('')

    resp.status(200).send({
      status: 200,
      message: `SHOW ALL DOCUMENTS: "${songsFound.length}", IN MONGODB `,
      songs: songsFound
    })
  }
}

//  1.1.-  getSong
export async function getSong(req, resp) {
  const { _id, title } = req.query

  // Query definieren
  let songsSearch = Song.find()

  // Query Block - filtering über Query-Params (estan en el query)
  if (_id) songsSearch = Song.findById(_id)
  if (title) songsSearch = songsSearch.where('title').equals(title)

  // Query auflösen
  const songsFound = await songsSearch

  if (!songsFound) throw createHttpError.NotFound('Keine Song gefunden')

  console.log(`The songsFound: "${songsFound}`.bgRed)

  resp.status(200).send({
    message: `SHOW DOCUMENTS: ${songsFound}, IN MONGODB `,
    song: songsFound
  })
}

// 2.- set Song-Likes (method patch)
export async function patchSong(req, resp) {
  let txt = ''
  const songDataToModify = req.body.songDataToModify
  console.log('songDataToModify.likes:  '.bgMagenta, songDataToModify.likes)

  const songFound = await Song.findById(songDataToModify._id)

  if (!songFound) {
    console.log('')
    console.log('                                                                     '.bgRed)
    console.log('     No song found by _id - Kein Lied gefunden mit _id !!     😖     '.bgRed)
    console.log('                                                                     '.bgRed)
    console.log('')
    throw createHttpError.NotFound(' No song found by _id - Kein Lied gefunden mit _id !!     😖     !')
  } if (songDataToModify._id !== songFound._id.toString()) {
    console.log('')
    console.log('                                                                     '.bgRed)
    console.log(' The "ids" of songFound and song in req.body are not equals!!   😖   '.bgRed)
    console.log('                                                                     '.bgRed)
    console.log('')
    throw createHttpError.NotFound(' The "ids" of songFound and song in req.body are not equals - Error of ids!!  😖  !!')
  } else {
    // We make the changes (data of song => songFound) and save  (only the value of reproductions and likes)
    songFound.reproductions = songDataToModify.reproductions
    songFound.likes = songFound.likes + songDataToModify.likes

    await songFound.save()
    console.log('The songFound es salvado y es: '.bgRed,  songFound)

    console.log('')
    console.log('                                                                      '.bgRed)
    console.log(`  SHOW SONG-DOCUMENT UPLOAD: "${songFound.title} mit likes: ${songFound.likes}", IN MONGODB `.bgRed)
    console.log('                                                                      '.bgRed)
    console.log('')
    console.log('                                                                      '.bgWhite)
    console.log('   Show the user found upload, in Mongodb (collection: "users")       '.bgWhite)
    console.log('                                                                      '.bgWhite)
    console.log('')
    txt += `||  ************************************************************************** ||\n`
    txt += `||  Documents of the collection of Database of MongoDB:                        ||\n`
    txt += `||  Title: ${songFound.title}    Album(s): ${songFound.album}   Duration: ${songFound.duration}\n`
    txt += `||  Vocal(s): ${songFound.vocals}    Reproductions: ${songFound.reproductions}   likes: ${songFound.likes}\n`
    txt += `||                                                                             ||`
    txt += `||  ID: ${songFound._id}        Year: ${songFound.year}                        \n`
    txt += `||                                                                             ||\n`
    txt += `||  ************************************************************************** ||\n`
    console.log(`${txt}`.bgWhite)
    console.log('')

    resp.status(200).send({
      message: `Song "${songFound.title}" successfully modified !!`,
      song: songFound
    })
  }
}