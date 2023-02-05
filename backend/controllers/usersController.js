// eslint-disable-next-line no-unused-vars
import colors from 'colors'
import createHttpError from 'http-errors'
import User from '../models/User.js'
import Cart from '../models/Cart.js'
import { v2 as cloudinary } from 'cloudinary'


/*
cloudinary.config({
  cloud_name: 'dofzwbtnh',
  api_key: '176412633152764'

production,
  api_secret: 'hn-dWD0E9AiELECaNpOrVgh7z9Y'
});
*/

// import sendMail from "../sendEmail.js"


//  || Server: "routing": Routes of "/users":  app.use('/users', userRouter); ===>>  {  || Controlers ||  }


// //    CONTROLLERS OF USERS-ROUTES       /////////////////////////////////////////////////////////////////////
//  1.-  Create a new user (register an user) in MongoDB  ==>>  registerUser
/** @type {import("express").RequestHandler} */
export async function createUser(req, resp, next) {
  let txt = ""
  let uploadAvatar = ''
  const urlRButton = {
    Pauli: "../../src/images/theBeatles/Avatar/Paul-Avatar.jpg",
    Georgi: "../../src/images/theBeatles/Avatar/George-Avatar.jpg",
    Johni: "../../src/images/theBeatles/Avatar/John-Avatar.jpg",
    Ringe: "../../src/images/theBeatles/Avatar/Ringo-Avatar.jpg"
  }
  const { avatar, ...userCustomer } = req.body
  console.log('avatar', avatar)
  console.log('userCustomer:  ', userCustomer)

  // Konfiguration of cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  })

  if (!(userCustomer.email || userCustomer.password)) {
    console.log(''.bgRed)
    console.error(" Error:  In the body of the object-request (req) does not contain the user's email and the password information.!!  ⛔ ".bgRed)
    console.log(''.bgRed)

    return resp.status(400).send({ error: "Data not formatted properly" })
  }

  switch (avatar) {
    case "Pauli":
      userCustomer.avatar_url = urlRButton.Pauli
      break
    case "Georgi":
      userCustomer.avatar_url = urlRButton.Georgi
      break
    case "Johni":
      userCustomer.avatar_url = urlRButton.Johni
      break
    case "Ringe":
      userCustomer.avatar_url = urlRButton.Ringe
      break
    default:
      uploadAvatar = await cloudinary.uploader.upload(avatar)
      userCustomer.avatar_url = uploadAvatar.secure_url
  }

  // 1.-  Creating a new "mongoose doc" from user data model: "User"
  // const userCreated = await User.create(userCustomer)
  const userCreated = new User(userCustomer)
  await userCreated.save()

  // 1.1.-  New shoppingCart for te new user created.  Cart für neuen User erstellen
  const cart = await Cart.create({ user: userCreated._id, records: [], orders: [] })  //  Acthung mit Orders !!

  // token für Email Validierung erzeugen
  const emailToken = userCreated.generateAuthToken("2h") // token für 2h erzeugen
  await userCreated.save()

  // Optionen für Cookie
  const cookieOptions = {
    httpOnly: true,     // cookie vom js im frontend verborgen
    secure: true,       // nur https Verbindungen
    sameSite: 'lax'     // "none", "lax" --> default, "strict"
  }

  // Email an User schicken mit Link
  // const mail = await sendMail(newUser.email, emailToken)
  // console.log(mail)

  if (!userCreated) {
    console.log('                                                                    '.bgRed)
    console.error(" Error: The new user data could not be saved in the database.  ⛔ ".bgRed)
    console.log('                                                                    '.bgRed)
    console.log('')
    console.log('')

    return next({ status: 401, message: 'Sorry, the new user data could not be saved in the database.  ⛔ ' })
  } else {
    //  Create a new user (data in the body of object req, before had been validate)
    console.log('                                                                      '.bgRed)
    console.log('    QUE PASA PENAAAAA  !!!!   REGISTER A DOCUMENT "USER" IN MONGODB   '.bgRed)
    console.log('                                                                      '.bgRed)
    console.log('')
    console.log('                                                                      '.bgWhite)
    console.log(` Create a new user "${userCreated.treament} ${userCreated.firstName} ${userCreated.lastName}" in MongoDb of the collection: "users" `.bgWhite)
    console.log('                                                                      '.bgWhite)
    console.log('')
    txt += `||  ************************************************************************** ||\n`
    txt += `||  "Document user" created in the collection of Database of MongoDB:          ||\n`
    txt += `||                                                                             ||\n`
    txt += `||  Name:  ${userCreated.treament} ${userCreated.firstName} ${userCreated.lastName}    Age: ${userCreated.age}   \n`
    txt += `||  Phone: ${userCreated.phoneNumber}    Email: ${userCreated.email}   \n`
    txt += `||  Adress: \n`
    txt += `||             Street: ${userCreated.street}, ${userCreated.streetNumber}    Codezip: ${userCreated.post_ZipCode}   \n`
    txt += `||             City:   ${userCreated.city}      Satate/province:  ${userCreated.state_Province}  Country: ${userCreated.country}   \n`
    txt += `||  ID: ${userCreated._id}        Date of register: ${userCreated.registrationDate}     \n`
    txt += `||                                                                             ||\n`
    txt += `||  ************************************************************************** ||\n`
    console.log(`${txt}`.bgWhite)
    console.log('')
    console.log(userCreated)

    resp
      .cookie('auth-token', emailToken, cookieOptions)
      .status(200)
      .send({
        message: `New User: "${userCreated.treament}  ${userCreated.firstName} ${userCreated.lastName}" created !!`,
        user: userCreated,
        cart
      })
  }

  // resp.status(200).send({
  //   message: `New User created !!`
  // })
}


//  2.1.-  "getter" of all registerd users in MongoDB  ==>>  getAllUsers
export async function getAllUsers(req, resp) {
  let txt = ""

  //  1.-  Man erhalt allen Daten von collection "users" in DB von MongoDB
  const arrayUsers = await User.find()

  //  2.-  Die Blöcke der Abfragen des gestellten Querys werden definiert
  const { gender } = req.query  //  Ich erhalte die Daten aus der Abfrage im req-Objekt.

  // Query Block - filtering über Query-Params
  if (gender) arrayUsers = arrayUsers.where('gender').equals(gender)

  //  3.-  Ich führe die Abfrage der Dokumente in der collection mit den Querys
  // Query auflösen - disolver
  const usersFound = await arrayUsers.sort((a, b) => a.lastName.localeCompare(b.lastName))

  if (usersFound.length < 0) {     //  <<==  Es gibt keine Daten
    console.log('')
    console.log('                                                                     '.bgRed)
    console.log(' No registered users in MongoDB - Keine Users gefunden !!     😖     '.bgRed)
    console.log('                                                                     '.bgRed)
    console.log('')

    throw createHttpError.NotFound(' No registered users in MongoDB - Keine Users gefunden !!     😖     ')
  } else {
    console.log('')
    console.log('                                                                      '.bgRed)
    console.log(`    SHOW ALL USERS-DOCUMENT: "${usersFound.treament} ${usersFound.firstName} ${usersFound.lastName}" FOUND, IN MONGODB  `.bgRed)
    console.log('                                                                      '.bgRed)
    console.log('')
    console.log('                                                                      '.bgWhite)
    console.log('    Show all documents of the DB-Mongodb (collection: "users")        '.bgWhite)
    console.log('                                                                      '.bgWhite)
    console.log('')
    txt += `||  ************************************************************************** ||\n`
    txt += `||  Documents of the collection of Database of MongoDB:                        ||\n`

    for (let i = 0; i < usersFound.length; i++) {
      txt += `||  N°: ${i + 1}    Name: ${usersFound[i].treament} ${usersFound[i].firstName} ${usersFound[i].lastName}   Age: ${usersFound[i].age}   \n`
      txt += `||  Phone: ${usersFound[i].phoneNumber}    Email: ${usersFound[i].email}   \n`
      txt += `||  Adress: \n`
      txt += `||             Street: ${usersFound[i].street}, ${usersFound[i].streetNumber}    Codezip: ${usersFound[i].post_ZipCode}   \n`
      txt += `||             City: ${usersFound[i].city}     State/Province: ${usersFound[i].state_Province}    Country: ${usersFound[i].country}   \n`
      txt += `||  ID: ${usersFound[i]._id}        Date of register: ${usersFound[i].registrationDate}     \n`
      txt += `||                                                                            ||\n`
    }
    txt += `||  ************************************************************************** ||\n`
    console.log(`${txt}`.bgWhite)
    console.log('')

    resp.status(200).send({
      message: `Users founds: ${usersFound.length}  🙋, in the collection "users" in MongoDB !! `,
      users: usersFound
    })
  }
}

//  2.2.-  "getter" of user "by Token" in MongoDB  ==>>  getUser
/** @type {import("express").RequestHandler} */
export async function getUser(req, resp) {
  let txt = ""

  //  Acceder a la cookie almacenada en el header de la request:  req.cookies('token')
  const token = req.cookies.token   //  The "token" (created in the login) is stored in the header of the req object.
  console.log('req.cookies:  ', req.cookies)
  //  1.-  Search for a registered and logged-in user with stored token !!
  // const userFound = await User.findOne().where('token').equals(token)
  const userFound = await User.findByAuthToken(token)
  // const userFound = await User.findByEmail(email)

  if (!userFound) {
    console.log('')
    console.log('                                                                     '.bgRed)
    console.log('     No user found by token - Keine Users gefunden mit Token !!  😖  '.bgRed)
    console.log('                                                                     '.bgRed)
    console.log('')
    throw createHttpError.NotFound(' No user found by token - Keine Users gefunden mit Token !!  😖  You shall not pass!')
  } else {
    console.log('')
    console.log('                                                                      '.bgRed)
    console.log(`  SHOW USER-DOCUMENT FOUND BY TOKEN: "${userFound.treament} ${userFound.firstName} ${userFound.lastName}", IN MONGODB `.bgRed)
    console.log('                                                                      '.bgRed)
    console.log('')
    console.log('                                                                      '.bgWhite)
    console.log('   Show the user found "by Token", in Mongodb (collection: "users")   '.bgWhite)
    console.log('                                                                      '.bgWhite)
    console.log('')
    txt += `||  ************************************************************************** ||\n`
    txt += `||  Documents of the collection of Database of MongoDB:                        ||\n`
    txt += `||  Order Id: ${userFound[0].treament} ${userFound.firstName}  ${userFound.lastName}   Age: ${userFound.age}   \n`
    txt += `||  Phone: ${userFound.phoneNumber}    Email: ${userFound.email}   \n`
    txt += `||  Adress: \n`
    txt += `||             Street: ${userFound.street}, ${userFound.streetNumber}    Codezip: ${userFound.post_ZipCode}   \n`
    txt += `||             City: ${userFound.city}    State/Province: ${userFound.state_Province}     Country: ${userFound.country}   \n`
    txt += `||  ID: ${userFound._id}        Date of register: ${userFound.registrationDate}     \n`
    txt += `||                                                                            ||\n`
    txt += `||  ************************************************************************** ||\n`
    console.log(`${txt}`.bgWhite)
    console.log('')
    resp.status(200).send({
      message: 'User found by Token !!',
      user: userFound
    })
  }
}

//  2.3.-  "getter" of user "by Email" in MongoDB ==>>  getUserByEmail
export async function getUserByEmail(req, resp) {
  let txt = ""
  const email = req.params.email
  console.log('The parameter "email" is:  ', email)
  const userFound = await User.findByEmail(email)

  if (!userFound) {
    console.log('')
    console.log('                                                                     '.bgRed)
    console.log(` Email: ${email} - Keine Users gefunden mit email !!  😖  `.bgRed)
    console.log('                                                                     '.bgRed)
    console.log('')
    throw createHttpError.NotFound(' No user found by email - Keine Users gefunden mit email !!  😖  You shall not pass!')
  } else {
    console.log('')
    console.log('                                                                      '.bgRed)
    console.log(`  SHOW USER-DOCUMENT FOUND BY Email: "${userFound.treament} ${userFound.firstName} ${userFound.lastName}", IN MONGODB `.bgRed)
    console.log('                                                                      '.bgRed)
    console.log('')
    console.log('                                                                      '.bgWhite)
    console.log('   Show the user found "by Email", in Mongodb (collection: "users")   '.bgWhite)
    console.log('                                                                      '.bgWhite)
    console.log('')
    txt += `||  ************************************************************************** ||\n`
    txt += `||  Documents of the collection of Database of MongoDB:                        ||\n`
    txt += `||  Name: ${userFound.treament} ${userFound.firstName}  ${userFound.lastName}   Age: ${userFound.age}   \n`
    txt += `||  Phone: ${userFound.phoneNumber}    Email: ${userFound.email}   \n`
    txt += `||  Adress: \n`
    txt += `||             Street: ${userFound.street}, ${userFound.streetNumber}    Codezip: ${userFound.post_ZipCode}   \n`
    txt += `||             City: ${userFound.city}    State/Province: ${userFound.state_Province}     Country: ${userFound.country}   \n`
    txt += `||  ID: ${userFound._id}        Date of register: ${userFound.registrationDate}     \n`
    txt += `||                                                                            ||\n`
    txt += `||  ************************************************************************** ||\n`
    console.log(`${txt}`.bgWhite)
    console.log('')

    resp.status(200).send({
      message: 'User found by Email !!',
      user: userFound
    })
  }
}

//  3.-  Login of user (register before how an user) in MongoDB  ==>>  login
/** @type {import("express").RequestHandler} */
export async function login(req, resp, next) {
  let txt = ""
  const { email, password } = req.body

  //  1.-  Search user "by Email" with static method "findByEmail"
  const userLogin = await User.findByEmail(email)

  if (!userLogin) {
    console.log('')
    console.error('  Error:  Sorry, you shall not pass, the email is incorrect)   !!   '.bgCyan)
    console.log('                                                                      '.bgRed)
    console.log(`    QUE PASA PENAAAAA  !! LOGIN USER IN MONGODB 😓 is not possible !! `.bgRed)
    console.log('                                                                      '.bgRed)
    console.log(`    User with the email: ${userLogin.email} is not registered in DB!! `.bgRed)
    console.log('')

    return next({ status: 401, message: 'Sorry, you shall not pass (email is incorrect)!!' })
  } else {
    //  Hier, Die Email ist ricthing, dann vergleichet man das "Hash" in MongoDb (theHash_DB) mit das Rechnerd-Hash
    //  von "userLogin.password"

    //  2.-  Check password of searched user ("userLogin") with the static method "checkPassword"
    // const istEgal = await userLogin.checkPassword(password)
    // console.log('istEgal:  ', istEgal)

    const istEgal = await userLogin.checkPassword(password)

    if (!istEgal) {
      console.log('')
      console.error('  Error:  Sorry, you shall not pass, the password is false  !!      '.bgCyan)
      console.log('                                                                      '.bgRed)
      console.log(`    QUE PASA PENAAAAA  !! LOGIN USER IN MONGODB 😓 is not possible !! `.bgRed)
      console.log('                                                                      '.bgRed)
      console.log(`    User with email: ${userLogin.email} entered incorrect password !! `.bgRed)
      console.log('')

      return next({ status: 401, message: 'Sorry, you shall not pass (password is incorrect)!!' })
    } else {
      /** 3.-  Erstelle zufälligen token. z.b: "ug1j1"   */
      //       userLogin.token = Math.random().toString(36).slice(2, 7);
      //       await userLogin.save();
      const Thetoken = userLogin.generateAuthToken()
      await userLogin.save()

      // Optionen für Cookie
      const cookieOptions = {
        maxAge: 2 * 60 * 60 * 1000, // Das cookie dauert 2 Uhr
        httpOnly: true,     // cookie vom js im frontend verborgen
        secure: true,       // nur https Verbindungen
        sameSite: 'lax'     // "none", "lax" --> default, "strict"
      }

      console.log('')
      console.log('                                                                      '.bgGreen)
      console.log(`  QUE PASA PENAAAAA  !!!!  LOGIN USER: 😊 "${userLogin.treament} ${userLogin.firstName} ${userLogin.lastName}", IN MONGODB `.bgGreen)
      console.log('                                                                      '.bgGreen)
      console.log('')
      console.log('                                                                      '.bgGreen)
      console.log('  Show user "login-OK" of the DB-MongoDb in the collection: "users"   '.bgGreen)
      console.log('                                                                      '.bgGreen)
      console.log('')
      txt += `||  ************************************************************************** ||\n`
      txt += `||  "Document user" login in the collection of Database of MongoDB:            ||\n`
      txt += `||                                                                             ||\n`
      txt += `||  Name:  "${userLogin.treament} ${userLogin.firstName} ${userLogin.lastName}"    Email:${userLogin.email}   Id: ${userLogin._id} \n`
      txt += `||                                                                             ||\n`
      txt += `||  ************************************************************************** ||\n`
      console.log(`${txt}`.bgWhite)
      console.log('')

      resp
        .cookie('token', Thetoken, cookieOptions)
        .status(200)
        .send({
          message: "Congratulations, login OK. You are logged in'",
          token: Thetoken,
          user: userLogin
        })
    }
  }
}

//  4.-  Logout of user (login before how an user) in MongoDB  ==>>  logout
export async function logout(req, resp, next) {
  let txt = ""
  const userID = req.body._id
  const token = req.cookies.token

  const userLogout = await User.findById(userID)

  //  1.-  Filtering of tokens-users, returns an array of tokens of user with the tokens that meet the condition (!== token)
  const filteredTokens = userLogout.tokens.filter(el => el !== token)

  if (!filteredTokens) {
    console.log('')
    console.error('  Error:  Sorry, you shall not pass, the token is nicht correct !!  '.bgCyan)
    console.log('                                                                      '.bgRed)
    console.log(`    !! LOGOUT USER IN MONGODB 😓 is not possible !!                   `.bgRed)
    console.log('                                                                      '.bgRed)
    console.log(`    User with email: ${userLogout.email} hat an error of token !!      `.bgRed)
    console.log('')

    return next({ status: 401, message: 'Sorry, error in tokens (token is incorrect)!!' })
  } else {
    //  2.-  Delete the token of the array of token of user. Es egal than delete the token in the array of tokens
    userLogout.tokens = filteredTokens
    await userLogout.save()

    console.log('')
    console.log('                                                                      '.bgGreen)
    console.log(`  QUE PASA PENAAAAA  !!!!  LOGOUT USER: 🥺 "${userLogout.treament} ${userLogout.firstName} ${userLogout.lastName}", IN MONGODB `.bgGreen)
    console.log('                                                                      '.bgGreen)
    console.log('')
    console.log('                                                                      '.bgGreen)
    console.log('  Show user "logout-OK" of the DB-MongoDb in the collection: "users"  '.bgGreen)
    console.log('                                                                      '.bgGreen)
    console.log('')
    txt += `||  ************************************************************************** ||\n`
    txt += `||  "Document user" logout in the collection of Database of MongoDB:            ||\n`
    txt += `||                                                                             ||\n`
    txt += `||  Name:  "${userLogout.treament} ${userLogout.firstName} ${userLogout.lastName}"   Email:${userLogout.email}   Id: ${userLogout._id} \n`
    console.log(`${txt}`.bgWhite)
    console.log('')

    resp
      .clearCookie('token')
      .status(200)
      .send({
        message: "Congratulations, logout OK. You are logged out of Database !! '"
      })
  }
}

/* cart
  })
}
  user.tokens= filteredTokens
  await user.save()
  res
    .clearCookie('token')
    .status(200)
    .send('Logout erfolgreich')
}
*/

export async function isLoggedIn(req, res) {
  res.status(200).send(true)
}

//  5.-  update data of user (userDataToModify = new data of user) in MongoDB  ==>>  patchUser
export async function patchUser(req, resp) {
  let txt = ''
  const userDataToModify = req.body.userDataToModify

  const token = req.cookies.token
  console.log('token:  ', token)  //  <<==  me da undefined ???

  const userFound = await User.findById(userDataToModify._id)

  if (!userFound) {
    console.log('')
    console.log('                                                                     '.bgRed)
    console.log('     No user found by token - Keine Users gefunden mit Token !!  😖  '.bgRed)
    console.log('                                                                     '.bgRed)
    console.log('')
    throw createHttpError.NotFound(' No user found by token - Keine Users gefunden mit Token !!  😖  You shall not pass!')
  } if (userDataToModify._id !== userFound._id.toString()) {
    console.log('')
    console.log('                                                                     '.bgRed)
    console.log('     The "ids" of userFound and user in req.body are not equals - Error of ids!!  😖  '.bgRed)
    console.log('                                                                     '.bgRed)
    console.log('')
    throw createHttpError.NotFound(' The "ids" of userFound and user in req.body are not equals - Error of ids!!  😖  You shall not pass!')
  } else {
    // We make the changes (data of user => userFound) and save
    userFound.street = userDataToModify.street
    userFound.streetNumber = userDataToModify.streetNumber
    userFound.city = userDataToModify.city
    userFound.post_ZipCode = userDataToModify.post_ZipCode
    userFound.state_Province = userDataToModify.state_Province
    userFound.country = userDataToModify.country
    userFound.cardType = userDataToModify.cardType
    userFound.cardHolderFirstName = userDataToModify.cardHolderFirstName
    userFound.cardHolderLastName = userDataToModify.cardHolderLastName
    userFound.cardNumber = userDataToModify.cardNumber
    userFound.expirationData = userDataToModify.expirationData
    userFound.securityCode = userDataToModify.securityCode
    userFound.acceptPay = userDataToModify.acceptPay
    userFound.songsLikes = userDataToModify.songsLikes

    await userFound.save()

    console.log('')
    console.log('                                                                      '.bgRed)
    console.log(`  SHOW USER-DOCUMENT UPLOAD: "${userFound.treament} ${userFound.firstName} ${userFound.lastName}", IN MONGODB `.bgRed)
    console.log('                                                                      '.bgRed)
    console.log('')
    console.log('                                                                      '.bgWhite)
    console.log('   Show the user found upload, in Mongodb (collection: "users")       '.bgWhite)
    console.log('                                                                      '.bgWhite)
    console.log('')
    txt += `||  ************************************************************************** ||\n`
    txt += `||  Documents of the collection of Database of MongoDB:                        ||\n`
    txt += `||  Name: ${userFound.treament} ${userFound.firstName}  ${userFound.lastName}   Age: ${userFound.age}   \n`
    txt += `||  Phone: ${userFound.phoneNumber}    Email: ${userFound.email}   \n`
    txt += `||  Adress: \n`
    txt += `||             Street: ${userFound.street}, ${userFound.streetNumber}    Codezip: ${userFound.post_ZipCode}   \n`
    txt += `||             City: ${userFound.city}    State/Province: ${userFound.state_Province}     Country: ${userFound.country}   \n`
    txt += `||  ID: ${userFound._id}        Date of register: ${userFound.registrationDate}     \n`
    txt += `||                                                                            ||\n`
    txt += `||  ************************************************************************** ||\n`
    console.log(`${txt}`.bgWhite)
    console.log('')

    resp.status(200).send({
      message: 'User successfully modified !!',
      user: userFound
    })
  }
}

//  6.- get data od songsLikes of user in MongoDB ==>> getUserSongsLike
export async function getUserSongsLike(req, resp) {
  const { email } = req.query

  //  Acceder a la cookie almacenada en el header de la request:  req.cookies('token')
  // const token = req.cookies.token   //  The "token" (created in the login) is stored in the header of the req object.
  // console.log('req.cookies:  ', req.cookies)
  //  1.-  Search for a registered and logged-in user with stored token !!
  // const userFound = await User.findOne().where('token').equals(token)
  const userFound = await User.findByEmail(email)
  // const userFound = await User.findByEmail(email)

  //  Acceder a la cookie almacenada en el header de la request:  req.cookies('token')
  // const token = req.cookies.token   //  The "token" (created in the login) is stored in the header of the req object.
  // console.log('req.cookies:  ', req.cookies)
  //  1.-  Search for a registered and logged-in user with stored token !!
  // const userFound = await User.findOne().where('token').equals(token)

  if (!userFound) throw createHttpError.NotFound(' No user found by email - Keine Users gefunden mit Email !!  😖  You shall not pass!')

  const songsLikesUser = await userFound.populate('songsLikes')
  if (!songsLikesUser) songsLikesUser = []
  console.log('songsLikesUser:  ', songsLikesUser)

  resp.status(200).send({
    message: 'User found by Token !!',
    songsLike: songsLikesUser
  })
}

// ///////////////////////////   MANUEL CODE      //////////////////////////////////////////////

/*  1.-   export async function createUser(req, res) {

  const user = new User(req.body)
  await user.save()

  // Cart für neuen User erstellen
  const cart = await Cart.create({ user: user._id, products: [] })

  // User und Cart zurückschicken
  res.status(200).send({
    message: 'user created',
    user,
    cart
  })
} */

/*  2.-   export async function getUser(req, res) {
  const user = req.user
  res.send(user)
} */

/*  3.-   export async function login(req, res, next) {
  const { email, password } = req.body
  const user = await User.findByEmail(email)

  if (!user) {
       return next({ status: 401, message: 'You shall not pass!' })
    }

  const passwordsAreEqual = user.checkPassword(password)

  if (!passwordsAreEqual) {
      return next({ status: 401, message: 'Password is not equal:  You shall not pass!' })
    }

  const token = user.generateAuthToken()
  await user.save()

// Optionen für Cookie
  const cookieOptions = {
      httpOnly: true,     // cookie vom js im frontend verborgen
      secure: true,       // nur https Verbindungen
      sameSite: 'lax'     // "none", "lax" --> default, "strict"
  }

// Cookie erzeugen
  res
     .cookie('token', token, cookieOptions)
     .status(200)
     .send('Hello, you are logged in')
  } */

/*  4.-   export async function logout(req, res){
    const user = req.user
    const token = req.cookies.token

    const filteredTokens = user.tokens.filter( el => el !== token )

    user.tokens= filteredTokens
    await user.save()

    res
      .clearCookie('token')
      .status(200)
      .send('Logout erfolgreich')
}
*/