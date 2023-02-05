import { validationResult } from "express-validator"
import httpErrors from 'http-errors'


//  Function of validation (validateInputs) of data from User (argument of rules)
export default function validateInputs(rules) {
  return [
    ...rules,
    (req, res, next) => {
      const errors = validationResult(req)
      if (errors.isEmpty()) return next()

      const shortErrors = errors.array().map((err) => { return { [err.param]: err.msg } })

      throw httpErrors.BadRequest(shortErrors)
    }
  ]
}


// export default function validate(req, res, next) {
//   const errors = validationResult(req)
//   if (errors.isEmpty()) return next()

//   const shortErrors = errors.array().map((err) => { return { [err.param]: err.msg } })

//   throw httpErrors.BadRequest(shortErrors)
// }

