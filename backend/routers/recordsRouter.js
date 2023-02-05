import express from 'express'
import * as controller from '../controllers/recordsController.js'

/**
 * dadurch brauchen wir kein try-catch mehr bei async middlewares
 */
import 'express-async-errors'

/**  Routes definition of "records" */
const router = express.Router()

//  1.-  "get"  in route "/records" => getter all records (getAllRecords)
router.get('/', controller.getAllRecords)

//  1.1-  "get" in route "/records/record" => getter one record (getRecord)
router.get('/record', controller.getRecord)

//  4.-  "post" in route "/records" => setter of a new record (createRecord)
//  5.-  "delete" in route "/records" => delete all records (deleteAllRecords)

// .post(controller.createRecord)

//  Nota in 5:  Weil niemand es weiß, stellt sich heraus, dass ein Formular-HTML nur mit den Methoden "get"
//              und "post" eine Übermittlung akzeptieren kann, "put" und "delete" umgehen sie
//              Porque nadie lo sabe, resulta que un formulario HTML sólo puede aceptar un envío con los métodos
//              "get" y "post" para aceptar un envío, los métodos "put" y "delete" los "evitan", aunque se
//              pueden usar.
// router.post('/delete', controller.deleteAllRecords)

//  2.-  "get" in route "/records/title/:title" => getter of one record by title (getRecordByTitle)
// router.get('/by-title/:title', controller.getRecordByTitle)

//  3.-  "get" in route "/records/:id => getter of one record by id(getRecordById)
// router.get('/:id', controller.getRecordById)

//  6.-  "post" in route "/records/addallrecords" => setter all records (createAllRecords)
// router.post('/addallrecords', controller.createAllRecords)

//  7.-  "post" in route "/records/searchById" => search (mit post) (postSearchRecordById)
// router.post('/searchById', controller.postSearchRecordById)

export default router