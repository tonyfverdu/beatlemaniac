import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { BsXSquareFill } from 'react-icons/bs'

import Nav from "./components/Navegation/Nav.jsx"
import HeaderComponent from './components/HeaderComponent.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home.jsx'

// import Feed from './components/Player/Screen/Feed.jsx'
// import Treding from './components/Player/Screen/Treding.jsx'
// import PlayerMusic from './components/Player/Screen/PlayerMusic.jsx'
// import Favorites from './components/Player/Screen/Favorites.jsx'
// import Library from './components/Player/Screen/Library.jsx'

import Error from './pages/Error.jsx'
import Albums from './pages/Albums.jsx'
import Songs from './pages/Songs.jsx'
import ResultRecords from "./components/Search/ResultRecords.jsx"
import ResultSongs from './components/Search/ResultSongs.jsx'
import ArticleDetailPage from './pages/ArticleDetailPage.jsx'
import ViewShoppingCart from './pages/ViewShoppingCart.jsx'
import LoginOfCustomer from './pages/LoginOfCustomer.jsx'
import RegisterCustomer1 from './pages/RegisterCustomer1.jsx'
import HomePlayer from './components/Player/HomePlayer.jsx'
import CustomerRegistered from './pages/CustomerRegistered.jsx'
import OrderOfCustomer from './pages/OrderOfCustomer.jsx'
import PreInvocePage from './pages/PreIncovePage.jsx'

// import UserDetails from './components/UserDetails.jsx'
// import Register from './components/User/Register.jsx'
// import Login from './components/Login/Login.jsx'

import './sass/App.scss'

const initialToken = localStorage.getItem('login-token') //  <==  almacenamiento en "localStorage" del "initialToken" !!


function App() {
  const title = 'MERN App: Mongodb, Express, React and NodeJS'
  const titleMemoListHeader = 'Beatlemania Music Shop-online. "Only Beatles here !'
  const subtitleMemoListHeader = 'MERN App (Mongodb-Express-React-NodeJS!'
  const titleSite = 'The Music Shop Records online for "beatlemaniacs'

  // Usestates variables:  mode and token
  // const [token, setToken] = useState(initialToken)
  // const [mode, setMode] = useState('login')
  // const [loggedIn, setLoggedIn] = useState(false)
  const [toggleHeader, setToggleHeader] = useState(false)

  // useEffect(() => {
  //   fetch('http://localhost:3001/user/loggedIn', {
  //     method: 'GET',
  //     credentials: 'include'
  //   }).then((response) => {
  //     console.log(`Response of fetch: 'http://localhost:3001/user/loggedIn', is:  ${response}`)
  //     if (response.status === 200) {
  //       setLoggedIn(true)
  //     }
  //   })
  //     .catch((err) => console.error(`There is an error:  ${err}`))
  // }, [])

  function handleonClickExit(ev) {
    setToggleHeader(!toggleHeader)
  }


  return (
    <div className='containerApp'>
      <div className="contIconExit" onClick={(ev) => handleonClickExit(ev)}>
        <BsXSquareFill
        />
      </div>
      {toggleHeader &&
        <>
          <div className="containerLogos">
            <figure className="MERNFigure">
              <img className="imageLogo" src={`../src/images/logos/mongoDB.webp`} alt='Logo MongoDB' />
            </figure>
            <figure className="MERNFigure">
              <img className="imageLogo" src={`../src/images/logos/nodeJSExpress.png`} alt='Logo Express' />
            </figure>
            <figure className="MERNFigure">
              <img className="imageLogo" src={`../src/images/logos/React_logo.png`} alt='Logo React' />
            </figure>
            <figure className="MERNFigure">
              <img className="imageLogo" src={`../src/images/logos/NodeJS.png`} alt='Logo NodeJS' />
            </figure>
          </div>
          <div className="header-Principal">
            <h2>{title}</h2>
          </div>
          <HeaderComponent
            title={titleMemoListHeader}
            subtitle={subtitleMemoListHeader}
          />
        </>
      }
      <Nav
        titleSite={titleSite}
      />
      <nav className="containerNav">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/resultSearchRecords" element={<ResultRecords />} />
          <Route path="/resultSearchSongs" element={<ResultSongs />} />
          <Route path="/shop/articledetail:id" element={<ArticleDetailPage />} />
          <Route path="/viewShoppingCart" element={<ViewShoppingCart />} />
          <Route path="/loginCustomer" element={<LoginOfCustomer />} />
          <Route path="/registerOfCustomer" element={<RegisterCustomer1 />} />
          <Route path="/player" element={<HomePlayer />} />
          <Route path="/customerRegistered" element={<CustomerRegistered />} />
          <Route path="/purchaseorder" element={<OrderOfCustomer />} />
          <Route path="/preInvoce" element={<PreInvocePage />} />
          <Route path="*" element=
            {
              <Error
                messageError={'404. Page not found !!'}
              />
            }
          />
        </Routes>
      </nav>
      {/* <div>
        {
          mode === 'login' &&
          <Login
            onRegisterSwitch={() => setMode('register')}
            // setLoggedIn={setLoggedIn}
            setToken={setLoggedIn}
          />
        }
        {
          mode === 'register' &&
          <Register
            onLoginSwitch={() => setMode('login')}
          />
        }
      </div> */}
      <Footer />
    </div>
  )
}

export default App
// const initialToken = localStorage.getItem('login-token') //  <==  almacenamiento en "localStorage" del "initialToken" !!

// Usestates variables:  mode and token
// const [token, setToken] = useState(initialToken)
  //    const [mode, setMode] = useState('login')
  //    const [loggedIn, setLoggedIn] = useState(false)

/*
  if (loggedIn) {
    return (
      <div className='App'>
        <UserDetails
          setLoggedIn={setLoggedIn}
        />
      </div>
    )
  }
*/

/*
  // if (token) {
  //   return (
  //     <div className='App'>
  //       <UserDetails
  //         token={token}
  //         setToken={setToken}
  //       />
  //     </div>
  //   );
  // }
*/

// RETURN
/*
      <div>
        {
          mode === 'login' &&
          <Login
            onRegisterSwitch={() => setMode('register')}
            // setLoggedIn={setLoggedIn}
            setToken={setLoggedIn}
          />
        }
        {
          mode === 'register' &&
          <Register
            onLoginSwitch={() => setMode('login')}
          />
        }
      </div>
*/
