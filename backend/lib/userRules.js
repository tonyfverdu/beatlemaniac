import { body } from 'express-validator'
import User from '../models/User.js'
import createHttpError from "http-errors"


//  1.-  "Rules of validation" of register of users
//  1.-   registerValidationUser  ==>>  Validation in the register of a new user - register (before of createUser)
export const registerValidationUser = [
  body('token').optional().isString().withMessage('The "token" of the user must be a string !!'),

  body('firstName')
    .isString().withMessage('The first users name is not a string !!')
    .not().isEmpty().trim().withMessage('The first user name can not be a empty string !!'),
  body('lastName')
    .isString().withMessage('The last users name is not a string !!')
    .not().isEmpty().trim().withMessage('The last user name can not be a empty string !!'),

  body('age').isNumeric().withMessage('The age of user mus be an integer !!'),

  body('phone')
    .optional().isNumeric().withMessage('Thew phone user must be a number !!'),

  body('email')
    .isEmail().withMessage('The email is not a correct Email !!')
    .custom(async (isEmail) => {
      let resultBoolean = 'false'
      const isUser = await User.findOne().where('email').equals(isEmail) //  Is There a user, thah the email-user is in DB?

      if (!isUser) {
        resultBoolean = true
      } else {
        resultBoolean = false
        throw createHttpError.BadRequest('Die Email existiert bereits.  User is yet ready in DB !!')
      }
      return resultBoolean
    })
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('You forgot to type your password')
    .isString().withMessage('The passwords user is not String !!')
    .isStrongPassword({
      minLength: 7,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      returnScore: false
    }).withMessage('The password must be: minlength: 7, minLowercase: 1, minUppercase: 1, minNumbers: 1 !!')
]

//  2.-  "Rules of validation" in login of users.
//        loginValidation      ==>>    validation of login of user mit input: (email, password)
export const loginValidation = [
  body('email').isString().isEmail().withMessage('The email is not a correct Email !!'),
  body('password')
    .notEmpty().trim().withMessage('You forgot to type your password')
    .isString().withMessage('The passwords user is not String !!')
]