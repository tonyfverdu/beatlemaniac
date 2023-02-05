import express from 'express'
import * as controller from '../controllers/songsController.js'

/**
 * dadurch brauchen wir kein try-catch mehr bei async middlewares
 */
import 'express-async-errors'


/**  Routes definition of "records" */
const router = express.Router()

//  1.-  "get"  in route "/songs" => getter all songs (getAllSongs)
router.get('/', controller.getAllSongs)

//  1.1-  "get" in route "/songs/song" => getter one song (getSong)
router.get('/song', controller.getSong)

//  2.- "path" in route "/songs/song" => patch of data song
router.patch('/song', controller.patchSong)


export default router