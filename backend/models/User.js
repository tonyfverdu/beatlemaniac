import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import createHttpError from 'http-errors'
import currentDate from '../utils/currentDate.js'

const superSecretKey = 'IchBinEinSuperSchweresUndUnknackbaresPasswort!'
const saltRounds = 10

const userSchema = Schema(
  {
    tokens: [String],
    registrationDate: { type: String, default: currentDate(), required: true },

    //  "personalData": { }
    treament: { type: String, enum: ['Mrs.', 'Mr.'], default: 'Mrs.' },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar_url: { type: String },
    age: { type: Number, default: 18 },
    phoneNumber: {
      type: String, validate: {
        validator: function (v) {
          return /\d{3}-\d{3}-\d{4}/.test(v)
        }, message: props => `${props.value} is not a valid phone number!`
      }, required: false
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    //  "deliveryData": { }
    street: { type: String },
    streetNumber: { type: Number, default: 0 },
    city: { type: String, default: 'Hamburg' },
    state_Province: { type: String, default: 'Hamburg' },
    post_ZipCode: { type: Number, default: 24380 },
    country: { type: String, default: 'Deutschland' },

    //  "paymentData": { }
    cardType: { type: String, enum: ['American Express', 'Master Card', 'VISA card', 'Giropay', 'PayPal'], default: 'American Express' },
    cardHolderFirstName: { type: String, required: true },
    cardHolderLastName: { type: String, required: true },
    cardNumber: { type: String, default: 'DE31-1345-6789-2345-0077-12', required: true },
    expirationData: { type: Date, default: Date.now },
    securityCode: { type: Number, default: 12345 },
    acceptPay: { type: String, enum: ['on', 'off'], default: 'off', required: true },

    // Songs likes
    songsLikes: [{ type: String }]
  })


// Static methods
userSchema.statics.findByEmail = function (parEmail) {
  const userFound = User.findOne().where("email").equals(parEmail)
  if (!userFound) throw createHttpError.NotFound(' No user found by Email - Keine Users gefunden mit Email !!  😖  You shall not pass!')

  return userFound
}
// Schema.statics.findByEmail = function (email) {
//   return User.findOne().where('email').equals(email)
// }

userSchema.statics.findByAuthToken = function (token) {
  const decode = jwt.verify(token, superSecretKey)
  return User.findById(decode._id).where('tokens').equals(token)
}


// Instance methods
userSchema.methods.generateAuthToken = function () {
  const user = this
  const token = jwt
    .sign({ _id: user._id }, superSecretKey, { expiresIn: '2h' })
    .toString()
  user.tokens.push(token)

  return token
}

userSchema.methods.checkPassword = async function (password) {
  const user = this
  return await bcrypt.compare(password, user.password)
}

userSchema.methods.toJSON = function () {
  const user = this
  const result = {
    _id: user._id,
    registrationDate: user.registrationDate,
    treament: user.treament,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar_url: user.avatar_url,
    age: user.age,
    phoneNumber: user.phoneNumber,
    email: user.email,

    street: user.street,
    streetNumber: user.streetNumber,
    city: user.city,
    state_Province: user.state_Province,
    post_ZipCode: user.post_ZipCode,
    country: user.country,

    cardType: user.cardType,
    cardHolderFirstName: user.cardHolderFirstName,
    cardHolderLastName: user.cardHolderLastName,
    cardNumber: user.cardNumber,
    expirationData: user.expirationData,
    securityCode: user.securityCode,
    acceptPay: user.acceptPay,

    password: user.password,
    tokens: user.tokens,

    songsLikes: user.songsLikes
  }
  return result
}


//  ***********   ACTHUNG !!  ==>>  Esto no influira en que hago dos veces el has al salvar la passwort?, creo que si
userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, saltRounds)
  }

  next()
})

//  Create Model
const User = model('User', userSchema, 'users')

export default User