import { body } from 'express-validator'
import validate from '../middlewares/validate.js'
import User from '../models/User.js'

export const register = [
  body('name').isString().optional().withMessage('Bitte gib deinen Namen ein'),
  body('password').isStrongPassword().withMessage('Wähle ein starkes Passwort'),
  body('email').isEmail().withMessage('Die Email ist nicht korrekt').custom(async (value) => {
    const user = await User.findByEmail(value)
    if (user) throw new Error('Die Email existiert bereits')
    return true
  }),
  validate
]

export const login = [
  body('password').isString(),
  body('email').isEmail().withMessage('email not valid'),
  validate
]


// //            express-validator
/*
     "express-validator" es un "conjunto de middleware express" que envuelve las funciones de validación y desinfección
     de validator.js .

     1.-  Instalación:  usando npm:  npm install --save express-validator

     2.-  Guia basica

          Comencemos escribiendo una ruta básica para crear un usuario en la base de datos:

              const express = require('express');
              const app = express();

              app.use(express.json());

              app.post('/user', (req, res) => {
                User.create({
                  username: req.body.username,
                  password: req.body.password,
                }).then(user => res.json(user));
              });


          Luego, querrá asegurarse de "validar la entrada" e informar cualquier error antes de crear el usuario:

              // ...rest of the initial code omitted for simplicity.
              const { body, validationResult } = require('express-validator');

              app.post(
                        '/user',
                        body('username').isEmail(),  // username must be an email
                        body('password').isLength({ min: 5 }),  // password must be at least 5 chars long

                        (req, res) => {
                        // Finds the validation errors in this request and wraps them in an object with handy functions
                        const errors = validationResult(req);
                        if (!errors.isEmpty()) {
                            return res.status(400).json({ errors: errors.array() });
                        }

              User.create({
                            username: req.body.username,
                            password: req.body.password,
                          }).then(user => res.json(user));
                          },
              );

          ¡Voila! Ahora, cada vez que se envíe una solicitud que incluya campos username o password no válidos, su servidor
          responderá así:

            {
              "errors": [
                         {
                           "location": "body",
                           "msg": "Invalid value",
                           "param": "username"
                         }
                        ]
            }


    Para ver todos los validadores disponibles en express-validator (al igual que sus opciones), eche un vistazo a
    los documentos de validator.js aquí.
*/
