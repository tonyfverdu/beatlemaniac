import React, { useState, useEffect, createContext } from 'react'

import currentDate from '../functions/currentDate.js'
import addDays from '../functions/addDays.js'
// import inicialCustomer from '../data/inicialCustomer.js'

export const MyScoreContext = createContext()

//  Nota.-  localStorage:  El objeto localStorage permite guardar pares clave/valor en el navegador. El objeto localStorage almacena datos sin fecha de vencimiento (persistencia)

//                         Los datos no se eliminan cuando se cierra el navegador y están disponibles para futuras sesiones.

//  Nota.-  sessionStorage:  objeto que almacena datos solamente en la sesion

/*  Establecer y recuperar el par 'key/value' de la interfaz: localStorage:
    window.localStorage  (devuelve in un objeto de localStorage - Un objeto de almacenamiento local.)

    Parametros ("key" - The name of a key, "value" - The value of the key)

        localStorage.setItem("lastname", "Smith");  //  Almacena los datos en almacenamiento local
        localStorage.getItem("lastname");           //  Recupera los datos de almacenamiento local de la "key" => "lastname"
        localStorage.removeItem(key);               //  Elimina datos de almacenamiento local
        localStorage.clear();                       //  Elimina todo los datos del localStorage
*/


function getDataOfSC() {
  const previousSC = JSON.parse(localStorage.getItem('SC_Storage'))
  return previousSC
}
function getNumberArticlesInSC() {
  const previousNumberArticleInSC = JSON.parse(localStorage.getItem('Number_ArticleInSC_Storage'))
  return previousNumberArticleInSC
}
function getDataOfCustomersRegisterd() {
  const previousCustomer = JSON.parse(localStorage.getItem('Customer_Storage'))
  return previousCustomer
}
// eslint-disable-next-line no-unused-vars
function getDataUserOnline() {
  const previousUserOnline = JSON.parse(sessionStorage.getItem('UserOnline_Storage'))
  return previousUserOnline
}

const iniOrder = {
  cart: '',
  invoceDate: Date.now(),
  dueDataDelivery: addDays(Date.now(), 3),
  products: [],
  toPay: {
    subtotal: 0,
    VAT: 0,
    deliveryCost: 0,
    discount: 0,
    totalToPay: 0
  }
}
const iniArticleMouseOver = {
  "id_sec": 0,
  "image": ["beatlesDico1.jpg"],
  "title": "The Beatles Album",
  "label": "",
  "released": {
    "$date": {
      "$numberLong": ""
    }
  },
  "author_band": "The Beatles",
  "genre": "Pop-Rock",
  "description": "",
  "comments": "",
  "price": 0,
  "stock": 0
}
const iniSongMouseOver = {
  "idSec": 0,
  "year": 0,
  "image": ["beatlesDico1.jpg"],
  "album": "The Beatles Album",
  "title": "The Beatles Song",
  "duration": "0:00",
  "vocals": "",
  "price": 0
}

function getDataSongsReproductions() {
  const prevSongsReproductions = JSON.parse(localStorage.getItem('Songs_Reproductions'))
  return prevSongsReproductions
}

function MyScoreContextProvider({ children }) {
  let date = new Date()
  date = new Date(date).toISOString().split('T')[0]
  const iniUserCustomer = {
    registrationDate: currentDate(),
    treament: 'Mrs.',
    firstName: '',
    lastName: '',
    avatar_url: '',
    age: 18,
    phoneNumber: '',
    email: '',
    password: '',
    street: '',
    streetNumber: 0,
    city: 'Hamburg',
    state_Province: 'Hamburg',
    post_ZipCode: '24380',
    country: 'Deutschland',
    cardType: 'American Express',
    cardHolderFirstName: '',
    cardHolderLastName: '',
    cardNumber: 'DE31-1345-6789-1111-0000-1111-12',
    expirationData: date,
    securityCode: 12345,
    acceptPay: 'on'
  }
  //  0.-  Text and messages of User
  const messageOfComponent = {
    titleOfFormular: 'Sign-in. Please login to your account:',
    textLogin: 'Login',
    titleOfRegisterNewCustomer: 'New with us?.  Create a new account.',
    textCreateNewCustomer: 'New account created',
    titelDataOfDelivery: 'Data for delivery order',
    titelAdressDelivery: 'Delivery address:',
    titelFormPayment: 'Form of payment:',
    textAcceptpay: 'I have read and accept termins and conditions',
    textWeAcceptCards: ' We accept:'
  }

  const messageFormularRegisterCustomer = {
    titelOfFormular: 'Registration form',
    subtitelCreateAcount: 'Create Account',
    customerTitel: 'Customer:',
    Mr: 'Mr.',
    Mrs: 'Mrs.',
    labelFirstName: 'First name:',
    placeHolderFirstName: 'Please. Enter your first name ...',
    labelLastName: 'Last name:',
    placeHolderLastName: 'Please. Enter your last name ...',
    labelPhoneNumber: 'Phone number:',
    labelEmail: 'Email:',
    placeHolderEmail: 'Please. Enter your email ...',
    labelPassword: 'Password:',
    placeHolderPassport: 'Please. Enter your password ...',
    labelConfirmPassword: 'Confirm Password:',
    placeHolderConfirmPassport: 'Please. Confirm your password ...',
    labelStreet: 'Street:',
    placeHolderStreet: 'Please. Enter your street addresse ...',
    labelOfStreetNumber: 'N°:',
    labelCity: 'City:',
    placeHolderCity: 'Enter your city here ...',
    labelState_Province: 'State/Provice:',
    placeholderState_Province: 'Enter your state ...',
    labelPost_ZipCode: 'Post/Zip Code:',
    labelCountry: 'Country:',
    placeholderCountry: 'Deutschland',

    labelCardHolder: 'Cardholder`s name:',
    placeholderCardHolder: ['', ''],
    labelCardNumber: 'Card number:',
    placeholderCardNumber: '',
    labelExpirationData: 'Expiration data:',
    placeholderExpirationData: currentDate(),
    labelSecurityCode: 'Security code:',
    placeholderSecurityCode: '*****',

    deleteButton: 'Delete',
    submitData: 'Continue',
    submitRegister: 'Register'
  }

  //  1.-  Data of records, songs and movies
  const [recordsOfBeatles, setRecordsOfBeatles] = useState([])
  const [songsOfBeatles, setSongsOfBeatles] = useState([])
  //  const [moviesOfBeatles, setMoviesOfBeatles] = useState([])

  const [typeArticle, setTypeArticle] = useState('song')

  //  2.-  Data of ShoppingCart (in localStorage)
  const [SC_State, setSC_State] = useState(getDataOfSC())            //  <<== Obtengo datos del localStorage, llamando a la funcion: "getDataOfShoppingCart()"
  // const [SC_State, setSC_State] = useState([{
  //   articleInSC: {
  //     "id_sec": 2,
  //     "image": "CoverLetItBe.jpg",
  //     "title": "Let It Be",
  //     "label": "Apple",
  //     "released": "1980-05-08",
  //     "author_band": "The Beatles",
  //     "genre": "Pop-Rock",
  //     "description": "The final Beatles album was first released on 8th May, 1970, just prior to the launch of the cinema film of the same name.Rehearsals and recording sessions for the album had taken place in January, 1969 first At Twickenham Film Studios and later in the basement and on the roof of their Apple headquarters in London's Savile Row. A single comprising of <<Get Back>> and <<Don't Let Me Down>> was released in April, 1969 but as The Beatles focussed their energies on a new album mainly recorded at Abbey Road, The <<Get Back>> album as it was then called remained unreleased.",
  //     "comments": "The album reached no. 1 for a three week stay during its 59 week chart stay. In the US, the album enjoyed a four week stay at #1 during an initial chart life of 55 weeks.",
  //     "price": 25,
  //     "stock": 6
  //   },
  //   amountOfArticle: 1
  // }])

  // CONTEX VARIABLES FOR INVOCE (MAN HABT NICHT REDUX HERE)
  const [stateArticlesOfOrder, setStateArticlesOfOrder] = useState([])
  const [stateTotalArticlesInOrder, setStateTotalArticlesInOrder] = useState(0)
  const [stateTotalOfOrder, setStateTotalOfOrder] = useState(0)

  //  //////////////////////////////////////////////////////////////////////////
  const [order, setOrder] = useState(iniOrder)
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [isEqual, setIsEqual] = useState(false)
  function isPasswordOk(parPassword, parPasswordConfirm) {
    if (typeof parPassword === "string" && typeof parPasswordConfirm === "string") {
      if (parPassword === parPasswordConfirm) {
        setIsEqual(true)
      }
    } else {
      console.error('Error:  The arguments of the function "isPasswordOk" must be string!!')
      setIsEqual(false)
    }
    return isEqual
  }

  const [totalArticlesInSC, setTotalArticlesInSC] = useState(getNumberArticlesInSC()) //  <<== Obtengo datos del numero total de articulos del localStorage
  const [totalOfPriceOfSC, setTotalOfPriceOfSC] = useState(0)        //  Total of price of SC  (calculate with function "calculateTotal(parSC_State)")
  const [resultDeliveryCost, setResultDeliveryCost] = useState(0)

  const [idOfSC, setIdOfSC] = useState(0)
  const [puchaseItemSelect, setPuchaseItemSelect] = useState([])

  //  3.-  Data of "search" (in file temporal with component "Search.jsx")
  const [articlesFilterd, setArticlesFilterd] = useState([])
  const [articleMouseOver, setArticleMouseOver] = useState(iniArticleMouseOver)
  const [songMouseOver, setSongOverMouse] = useState(iniSongMouseOver)

  //  4.-  Data of a User-Customer
  const [userCustomer, setUserCustomer] = useState(iniUserCustomer)

  const [imgPreview, setImgPreview] = useState(null)  //  <<==  Image preview of the avatar

  const [isLoggedin, setLoggedin] = useState(false)   // <<== The user is Loggin or not (array of user registred)
  const [nameOfUserLogin, setNameOfUserLogin] = useState('Login')

  const [registered, setRegistered] = useState(false)

  function calculateTotal(parSC_State) {
    let resultTotal = 0

    if (Array.isArray(parSC_State)) {
      resultTotal = SC_State.reduce((acum, valueAct) => {
        return parseInt(valueAct.articleInSC.price, 10) * valueAct.amountOfArticle + parseInt(acum, 10)
      }, 0)
    } else {
      console.log('Error: The argument of the function "calculateTotal" must be an array!!')
      resultTotal = null
    }
    return setTotalOfPriceOfSC(resultTotal)
  }

  //  5.-  State variables of Player Music
  const [isFunction, setIsFunction] = useState('feed')
  const [songs, setSongs] = useState([])
  const [currentSong, setCurrentSong] = useState({
    "id": 197,
    "year": 1969,
    "image": ["The_Beatles_1.jpg", "Beatles19671970.jpg"],
    "album": ["1 (2015 Version)", "1967-1970 (The Blue Album)"],
    "title": "The ballad of John and Yoko",
    "duration": "2:59",
    "vocals": ["John Lennon"],
    "price": 1.5,
    "mp3": "./src/assets/mp3/18 Others/The Ballad Of John And Yoko (Remastered 2015) (128 kbps).mp3"
  })
  const [selectedAlbum, setSelectedAlbum] = useState({
    "id_sec": 0,
    "image": ["beatlesDico1.jpg"],
    "title": "The Beatles Album",
    "label": "",
    "released": Date.now().toString(),
    "author_band": "The Beatles",
    "genre": "Pop-Rock",
    "description": "",
    "comments": "",
    "price": 0,
    "stock": 0
  })
  const [isPlaying, setIsPlaying] = useState(true)
  const [indexCurrentSong, setIndexCurrentSong] = useState(0)

  const [totalDuration, setTotalDuration] = useState(0)
  const [myCurrentTime, setMyCurrentTime] = useState(0)
  const [changeCurrentTime, setChangeCurrentTime] = useState(false)

  const [theVolume, setTheVolume] = useState(0)
  const [theMuted, setTheMuted] = useState(false)

  const iniSongsReproductions = {
    song: {
      "id": 188,
      "year": 1970,
      "image": ["CoverLetItBe.jpg", "The_Beatles_1.jpg", "Beatles19671970.jpg"],
      "album": ["Let It Be", "1 (2015 Version)", "1967-1970 (The Blue Album)"],
      "title": "Let it be",
      "duration": "4:03",
      "vocals": ["Paul McCartney"],
      "price": 2,
      "mp3": "./src/assets/mp3/14 Let It Be/The Beatles - Let It Be - 06 Let It Be.mp3",
      "visualisations": 0,
      "likes": 0
    },
    reproductions: parseInt(0, 10)
  }

  const [songsReproductions, setSongsReproductions] = useState([iniSongsReproductions])

  useEffect(() => {
    localStorage.setItem('Songs_Reproductions', JSON.stringify(songsReproductions))
  }, [isPlaying])

  useEffect(() => {
    calculateTotal(SC_State)
    localStorage.setItem('SC_Storage', JSON.stringify(SC_State))                     //  <<===  Set of LocalStorage for shoppingCartState
    localStorage.setItem('Number_ArticleInSC_Storage', JSON.stringify(totalArticlesInSC))      //  <<===  Set of LocalStorage for totalArticlesInSC
    // localStorage.setItem('Customer_Storage', JSON.stringify(stateCustomersRegisterd))          //  <<===  Set of LocalStorage for Customer
    // sessionStorage.setItem('UserOnline_Storage', JSON.stringify(customersRegistratedOnLine))   //  <<===  Set of SessionStorage for User online
  }, [SC_State, totalArticlesInSC])  //   [sC_State, totalArticlesInSC, stateCustomersRegisterd, customersRegistratedOnLine]

  const exportData = {

    iniUserCustomer, iniArticleMouseOver, iniSongMouseOver,

    messageFormularRegisterCustomer, messageOfComponent,

    recordsOfBeatles, setRecordsOfBeatles, songsOfBeatles, setSongsOfBeatles,

    SC_State, setSC_State, totalArticlesInSC, setTotalArticlesInSC, totalOfPriceOfSC, setTotalOfPriceOfSC,
    calculateTotal,

    //  CONTEXT VARIABLES FOR ORDER DATA
    stateArticlesOfOrder, setStateArticlesOfOrder,
    stateTotalArticlesInOrder, setStateTotalArticlesInOrder,
    stateTotalOfOrder, setStateTotalOfOrder,
    //  /////////////////////////////////////////////////////////////////////////////////////

    resultDeliveryCost, setResultDeliveryCost,

    passwordConfirm, setPasswordConfirm,  //  passwordEqual, setPasswordEqual,

    typeArticle, setTypeArticle,

    isEqual, setIsEqual, isPasswordOk,

    idOfSC, setIdOfSC, puchaseItemSelect, setPuchaseItemSelect, order, setOrder,

    articlesFilterd, setArticlesFilterd, articleMouseOver, setArticleMouseOver, songMouseOver, setSongOverMouse,

    userCustomer, setUserCustomer, imgPreview, setImgPreview, registered, setRegistered,

    isLoggedin, setLoggedin, nameOfUserLogin, setNameOfUserLogin,

    //  Para el audio Player MP3
    isFunction, setIsFunction,
    songs, setSongs,
    isPlaying, setIsPlaying, indexCurrentSong, setIndexCurrentSong,
    currentSong, setCurrentSong,
    selectedAlbum, setSelectedAlbum,
    totalDuration, setTotalDuration, myCurrentTime, setMyCurrentTime, theVolume, setTheVolume, theMuted, setTheMuted,
    changeCurrentTime, setChangeCurrentTime,
    songsReproductions, setSongsReproductions
  }

  return (
    <MyScoreContext.Provider value={exportData} >
      {children}
    </MyScoreContext.Provider>
  )
}

export default MyScoreContextProvider
