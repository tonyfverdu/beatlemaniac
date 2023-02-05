import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { MyScoreContext } from '../../context/MyContext.jsx'
import ShoppingCart from '../ShoppingCart/ShoppingCart.jsx'
import Search from '../Search/Search.jsx'
import Navegation from './Navegation.jsx'

import { FaUserCircle, FaPlayCircle } from 'react-icons/fa'
import '../../sass/componentsSass/Navegation/Nav.scss'


function Nav() {
  const messagePlayMusic = {
    istNotPlay: 'Play'
  }
  const [togglePlay, setTogglePlay] = useState(false)
  const { isLoggedin, nameOfUserLogin, currentSong, setIsPlaying } = useContext(MyScoreContext)
  const navigate = useNavigate()

  function handleClickLogin() {
    if (!isLoggedin) {
      navigate(`/loginCustomer`, { replace: false })
    } else if (isLoggedin) {
      navigate(`/loginCustomer`, { replace: false })
    }
  }

  function handleClickPlay() {
    setTogglePlay(!togglePlay)
    if (!togglePlay) {
      setIsPlaying(false)
      navigate(`/loginCustomer`, { replace: false })
    } else if (togglePlay) {
      if (isLoggedin) setIsPlaying(true)
      navigate('/player', { replace: false })
    }
  }

  return (
    <div className="containerMenu">
      <div className="decriptionMenu">
        <nav className="navBar">
          <Navegation
          />
        </nav>
        <span className="RSMTitle">Beatlesmaniacs</span>
        <figure className="figureContainer">
          <img id="imgLogo1" src="./src/images/theBeatles/imageBeatle1.jpg" />
          <img id="imgLogo2" src="./src/images/theBeatles/beatlesLogo2.jpg" />
        </figure>
      </div>
      <div className='containerShoopingCart'>
        <ShoppingCart
        />
      </div>
      <div className={`contRegisterCustormer ${(nameOfUserLogin === undefined || nameOfUserLogin === "Login") ? 'redColorCont' : 'greenColorCont'}`} onClick={handleClickLogin}>
        <i className={`iconCustomer ${(nameOfUserLogin === undefined || nameOfUserLogin === "Login") ? 'redColor' : 'greenColor'}`}>
          <FaUserCircle />
        </i>
        <span className='textRegisterCustomer'>
          {nameOfUserLogin}
        </span>
      </div>
      <div className={`contRegisterPlayMusic ${(nameOfUserLogin === undefined || nameOfUserLogin === "Login") ? 'redColorCont' : 'greenColorCont'}`} onClick={handleClickPlay}>
        <i className={`iconPlay ${(nameOfUserLogin === undefined || nameOfUserLogin === "Login") ? 'redColor' : 'greenColor'}`}>
          <FaPlayCircle />
        </i>
        {isLoggedin ? <span className='textPlay'>
          {currentSong.title}
        </span>
          : <span className='textRegisterCustomer'>
            {messagePlayMusic.istNotPlay}
          </span>
        }
      </div>
      <div className='containerSearch'>
        <Search
        />
      </div>
    </div >
  )
}

export default Nav
