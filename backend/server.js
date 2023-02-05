// eslint-disable-next-line no-unused-vars
import colors from 'colors'
import morgan from 'morgan'
import express from 'express'
import mongoose from 'mongoose'

import 'express-async-errors'
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'

import recordsRouter from './routers/recordsRouter.js'
import songsRouter from './routers/songsRouter.js'
import usersRouter from './routers/usersRouter.js'
import cartRouter from './routers/cartRouter.js'
import ordersRouter from './routers/ordersRouter.js'

import constants from './config/constants.js'
import { generateIDRandom, whatTimeIsIt } from './utils/functions.js'

import * as dotenv from 'dotenv'
dotenv.config()

/** ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
const myLocalHost = process.env.LOCALHOST || constants.webServer.myLocal_Host
const myPort = process.env.PORT || constants.webServer.myPort
const myMongoDBConnection = process.env.DB_CONN || 'mongodb://localhost:27017/11_17_cookies2'
// const myCorsOptions = constants.corsOption
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const IDRANDOM_OF_SESSION = generateIDRandom()

/** MONGOOSE  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
//  Conection from Mongoose to DB MongoDB (URI: 'mongodb://localhost:27017/aufgabe_validation')
mongoose.connect(myMongoDBConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  // useCreateIndex: false,
})
  .then(() => {
    console.log('         Datenbank läuft                                             '.bgBlue)
    console.log('                                                                     '.bgBlue)
    console.log(' ||==>>  Auf Deutch:  Acthung!  Datenbank läuft                      '.bgBlue)
    console.log('                                                                     '.bgBlue)
    console.log(` MONGOOSE => DB_CONN: "${myMongoDBConnection}"  🌤️  `.bgCyan)
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

/** Instantation vom WebServer Express   /////////////////////////////////////////////////////////////////////////////////////// */
const app = express()

/** MIDDLEWARE  /////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
// Regelt die kommunikation zwischen BROWSER und Server. nur wenn die aktuelle
// url des Browsers gewhitelistet ist, darf der browser die antwort lesen
// Controla la comunicación entre el BROWSER y el servidor. Sólo si la url del navegador aparece en la lista,
// el navegador puede leer la respuesta.
app.use(cors({
  origin: 'http://localhost:3000', //  <<== url donde la politica cors del servidor es permitida
  credentials: true //  <<==  algo con las cookies
  // origin: '*'
}))

app.use(express.urlencoded({ extended: true })) //  <<==  Calling the express.urlencoded({ extended: true }) method //
//  middleware intern, for parsing
app.use(express.json({ limit: '50MB' })) //  <<==  Calling the express.json()
app.use(cookieParser()) //  <<==  Cookies are parsers
app.use(express.static('static'))
app.use(morgan('dev'))

/**  CONFIGURATION OF TEMPLATE ENGINE (EJS) AND VIEWS PAGES    ///////////////////////////////////////////////////////////// */
app.use(express.static(__dirname + '/public'))
app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

/**  ROUTER - ROUTES OF THE APPLICATION  /////////////////////////////////////////////////////////////////////////////////// */
app.use('/records', recordsRouter)
app.use('/songs', songsRouter)
app.use('/users', usersRouter)
app.use('/cart', cartRouter)
app.use('/orders', ordersRouter)


/**  MANAGEMENT OF ERRORS (MIDDElWARE)  /////////////////////////////////////////////////////////////////////////////////// */
app.use((req, res, next) => {
  next({
    status: 404,
    message: 'Page not-found'
  })
})

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    message: error.message
  })
})

/**  METHOD LISTEN OF WEBSERVER EXPRESS  ///////////////////////////////////////////////////////////////////////////////// */
app.listen(process.env.PORT, () => {
  console.clear()
  console.log('')
  console.log('                                                                     '.bgRed)
  console.log('                                                                     '.bgRed)
  console.log('                                                                     '.bgYellow)
  console.log(`   WebServer Express Listening, listening on: "${process.env.LOCALHOST}:${process.env.PORT}"       `.bgYellow)
  console.log('                                                                     '.bgYellow)
  console.log('                                                                     '.bgRed)
  console.log('                                                                     '.bgRed)
  console.log('')
  console.log(`  ${whatTimeIsIt()} `.bgRed)
  console.log('')
})

export { myLocalHost, myPort, myMongoDBConnection, IDRANDOM_OF_SESSION }
