import React, { useState, useEffect, useContext } from 'react'
import { MyScoreContext } from '../../context/MyContext.jsx'
import ButtonKlein from '../ButtonKlein.jsx'
import { MdAddShoppingCart } from "react-icons/md"
import { TbDiscount } from "react-icons/tb"

import randomNumber from '../../functions/randomNumber.js'
import currentDate from '../../functions/currentDate.js'
import '../../sass/componentsSass/Home/AlbumOfDay.scss'

const iniAlbumRandom = [{
  "id_sec": 0,
  "image": ["beatlesDico1.jpg"],
  "title": "The Beatles Album",
  "label": "",
  "released": currentDate(),
  "author_band": "The Beatles",
  "genre": "Pop-Rock",
  "description": "",
  "comments": "",
  "price": 0,
  "stock": 0
}]


function AlbumOfDay() {
  const { SC_State, setSC_State, totalArticlesInSC, setTotalArticlesInSC,
    recordsOfBeatles, setRecordsOfBeatles } = useContext(MyScoreContext)

  const arrayPorcentDiscount = [5, 10, 15, 20, 25]
  const [porcentDiscount, setPorcentDiscount] = useState(0)
  const [newPrice, setNewPrice] = useState(0)
  const [errors, setErrors] = useState([])
  const [pulseButton, setPulseButton] = useState(0)
  const [isCalculate, setIsCalculate] = useState(true)
  const [isToggleInfo, setIsToggleInfo] = useState(false)
  const [albumOfDay, setAlbumOfDay] = useState(iniAlbumRandom)

  async function fetchDataRecords() {
    const response = await fetch('http://127.0.0.1:3001/records', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => data.json())
      .catch(err => console.log('Error in fetch:  ', err))

    // setRecordsFound(response.records)
    setRecordsOfBeatles(response.records)

    if (response.status === 200) {
      // eslint-disable-next-line no-const-assign
      const dataRecords = response.recordsFound.map(elem => elem)
      setRecordsOfBeatles(dataRecords)
    } else if (response.status === 400) {
      const result = await response.json()
      for (const row of result.message) {
        for (const key in row) {
          errors.push(row[key])
        }
      }
      setErrors(errors)
    } else {
      setErrors(['Etwas ist schief gelaufen'])
    }
  }

  function handleCalculateRandom() {
    setIsCalculate(!isCalculate)
    setIsToggleInfo(!isToggleInfo)
    if (isCalculate && pulseButton < 1) {
      setPulseButton(pulseButton + 1)
      const numberRandom = randomNumber(0, recordsOfBeatles.length - 1)
      const elementRandom = recordsOfBeatles.filter((album, index) => index === numberRandom)
      const realDiscount = arrayPorcentDiscount[randomNumber(0, arrayPorcentDiscount.length - 1)]
      setPorcentDiscount(realDiscount)
      setAlbumOfDay(elementRandom)
      calculateNewPrice(realDiscount, elementRandom[0])
    } else {
      setIsCalculate(true)
      setIsToggleInfo(false)
    }
  }

  function calculateNewPrice(parDiscount, parArticle) {
    const resultNewPrice = parArticle.price * (1 - parDiscount / 100).toFixed(2)
    setNewPrice(resultNewPrice.toFixed(2))
  }

  useEffect(() => {
    fetchDataRecords()
  }, [pulseButton])

  function handleButtonAddToCart(parId) {
    const newAlbumIn_SC = recordsOfBeatles.find((album) => album._id === parId)
    const isIn_SC = SC_State.find((album) => album.articleInSC._id === parId)

    if (isIn_SC === undefined) {
      setSC_State([...SC_State, { articleInSC: newAlbumIn_SC, amountOfArticle: 1 }])
    } else {
      isIn_SC.amountOfArticle++
    }
    setTotalArticlesInSC(totalArticlesInSC + 1)
  }


  return (
    <div className="contAlbumDay">
      <div className="contSC">
        <i className='iconAddToShoopingCart' onClick={() => handleButtonAddToCart(albumOfDay[0]._id)}>
          <MdAddShoppingCart />
        </i>
      </div>
      <div className="contDiscount">
        <div className="line">
          <span className="firstColumn">
            <i><TbDiscount ></TbDiscount></i>
          </span>
          <span className="secondColumn">
            <span>{`${porcentDiscount}%`}</span>
          </span>
        </div>
        <div className="line">
          <span className="firstColumn">
            <span>New Price:</span>
          </span>
          <span className="secondColumn">
            <span>{newPrice}</span>
          </span>
        </div>
      </div>
      <header className="headerAlbumDay">
        <h4 className="albumDay">Album of the Day</h4>
      </header>
      <div className="contOfButton">
        <ButtonKlein
          handleButton={handleCalculateRandom}
          text={'Good Luck'}
          parW={'6rem'}
          parH={'2rem'}
          parFS={'0.9rem'}
        />
      </div>
      <header className="headerTitleAlbumDay">
        <h4 className="titleAlbum">{albumOfDay[0].title}</h4>
      </header>
      <div className="contHalf">
        <div className="conLeftSide">
          <div className="contInfoAlbum">
            <div className="contReleased">
              <span className='labelReleased'>Released:</span>
              <span className="valueReleased">{albumOfDay[0].released.slice(0, 10)}</span>
            </div>
            <div className="contReleased">
              <span className="valueLabel">{albumOfDay[0].label}</span>
            </div>
          </div>
          {(!isCalculate || !isToggleInfo) && pulseButton >= 1 &&
            <div className="commentAlbum">
              <span className="valueComment">{albumOfDay[0].comments}</span>
            </div>
          }

        </div>
        <div className="contRigthSide">
          <figure className="figureImgAlbum">
            <img className="imageArticle" src={`../src/images/theBeatles/portadas/${albumOfDay[0].image}`} alt={albumOfDay[0].title} />
          </figure>
        </div>
      </div>
    </div>
  )
}

export default AlbumOfDay