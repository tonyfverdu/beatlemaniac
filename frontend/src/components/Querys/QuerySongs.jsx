import React, { useState, useEffect, useContext } from 'react'
import ButtonKlein from '../ButtonKlein.jsx'

import { MyScoreContext } from '../../context/MyContext.jsx'
import filterSearch from '../../functions/filterSearch.js'

import '../../sass/componentsSass/Querys/QuerySongs.scss'


function QuerySongs({ titleQuery }) {
  const iniRangeYear = {
    oldYear: 1965,
    newYear: 1985
  }
  const iniRangePrice = {
    minPrice: 1,
    maxPrice: 3
  }

  const [isToggleButton, setIsToggleButton] = useState(false)
  const [submitQuery, setSubmitQuery] = useState(false)
  const [errors, setErrors] = useState([])

  const [nameSong, setNameSong] = useState('')
  const [nameAlbum, setNameAlbum] = useState('')
  const [nameVocals, setNameVocals] = useState('')
  const [oldYear, setOlYear] = useState(iniRangeYear.oldYear)
  const [newYear, setNewYear] = useState(iniRangeYear.newYear)
  const [minPrice, setMinPrice] = useState(iniRangePrice.minPrice)
  const [maxPrice, setMaxPrice] = useState(iniRangePrice.maxPrice)

  const { songsOfBeatles, setSongsOfBeatles, setArticlesFilterd } = useContext(MyScoreContext)

  useEffect(() => {
    const resultArray = filterSearch('song', 'title', nameSong, songsOfBeatles)
    setArticlesFilterd(resultArray)
  }, [nameSong])

  useEffect(() => {
    const resultArray = filterSearch('song', 'album', nameAlbum, songsOfBeatles)
    setArticlesFilterd(resultArray)
  }, [nameAlbum])

  useEffect(() => {
    const resultArray = filterSearch('song', 'vocals', nameVocals, songsOfBeatles)
    setArticlesFilterd(resultArray)
  }, [nameVocals])

  async function fetchSubmitFormDatesQuerys(parQueryDate) {
    const urlQuerys = `?${'oldYear'}=${parQueryDate.oldYear}&${'newYear'}=${parQueryDate.newYear}`
    const urlCompleted = `http://127.0.0.1:3001/songs${urlQuerys}`

    const response = await fetch(urlCompleted, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => data.json())
    .catch(err => console.log('Error in fetch:  ', err))

    setSongsOfBeatles(response.songs)
    setArticlesFilterd(response.songs)

    if (response.status === 200) {
      // eslint-disable-next-line no-const-assign
      const dataSongs = response.songs.map(elem => elem)
      setSongsOfBeatles(dataSongs)
      setArticlesFilterd(dataSongs)
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
  async function fetchSubmitFormPricesQuerys(parQueryPrice) {
    const urlQuerys = `?${'minPrice'}=${parQueryPrice.minPrice}&${'maxPrice'}=${parQueryPrice.maxPrice}`
    const urlCompleted = `http://127.0.0.1:3001/songs${urlQuerys}`

    const response = await fetch(urlCompleted, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => data.json())
      .catch(err => console.log('Error in fetch:  ', err))

      setSongsOfBeatles(response.songs)
      setArticlesFilterd(response.songs)

    if (response.status === 200) {
      // eslint-disable-next-line no-const-assign
      const dataSongs = response.songs.map(elem => elem)
      setSongsOfBeatles(dataSongs)
      setArticlesFilterd(dataSongs)
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

  function toggleButtonSongs() {
    setIsToggleButton(!isToggleButton)
  }

  function handleSubmitFormQuerys(ev) {
    ev.preventDefault()
    // let resultArray = []
    // if (nameSong.length > 0) {
    //   resultArray = filterSearch('song', nameSong, songsOfBeatles)
    // } else if (nameSong.length > 0) {
    //   resultArray = filterSearch('song', nameAlbum, songsOfBeatles)
    // } else if (nameSong.length > 0) {
    //   resultArray = filterSearch('song', nameVocals, songsOfBeatles)
    // }
    // setArticlesFilterd(resultArray)
  }
  async function handleDelete() {
    setNameSong('')
    setNameAlbum('')
    setNameVocals('')
    setOlYear(iniRangeYear.oldYear)
    setNewYear(iniRangeYear.newYear)
    setMinPrice(iniRangePrice.minPrice)
    setMaxPrice(iniRangePrice.maxPrice)
    await fetchSubmitFormPricesQuerys({ minPrice: 0, maxPrice: 5 })
  }
  function handleQuery() {
    setSubmitQuery(!submitQuery)
  }

  function handleQueryOldYear(ev) {
    setOlYear(Number(ev.target.value))
  }
  function handleQueryNewYear(ev) {
    setNewYear(Number(ev.target.value))
  }

  async function handleQueryYear() {
    await fetchSubmitFormDatesQuerys({ oldYear, newYear })
  }

  function handleQueryMinPrice (ev) {
    setMinPrice(Number(ev.target.value))
  }
  function handleQueryMaxPrice (ev) {
    setMaxPrice(Number(ev.target.value))
  }

  async function handleQueryPrice() {
    await fetchSubmitFormPricesQuerys({ minPrice, maxPrice })
  }

  return (
    <>
      <button className={`contQueryBox ${!isToggleButton ? 'colorRed' : 'colorGreen'}`} onClick={toggleButtonSongs}>
        <header className="headerAccordion">
          <h4 className="titleAccordion">
            {titleQuery}
          </h4>
        </header>
      </button>
      {
        isToggleButton &&
        <div className="panelAccordion">
          <div className="contBodyQuerys">
            <form className="formQuerys" onSubmit={(ev) => handleSubmitFormQuerys(ev)}>
              <div className="contLine">
                <header className="headerTitleQuerys">
                  <h4 className="titleQuerys">Querys:</h4>
                </header>
                <div className="contInput">
                  <div className="container2Fields">
                    <label className="labelName" htmlform="nameOfSong">Song: </label>
                    <input type="text" className="nameOfSong" id="nameOfSong" name="nameOfSong" value={nameSong}
                      onChange={(ev => setNameSong(ev.target.value))} placeholder="Enter name of Song ..." maxLength={50} minLength={2}
                      autoComplete='on' />
                  </div>
                  <div className="container2Fields">
                    <label className="labelName" htmlform="nameOfAlbum">Album(s): </label>
                    <input type="text" className="nameOfAlbum" id="nameOfAlbum" name="nameOfAlbum" value={nameAlbum}
                      onChange={(ev => setNameAlbum(ev.target.value))} placeholder="Enter name of Album ..." maxLength={50} minLength={2}
                      autoComplete='on' />
                  </div>
                  <div className="container2Fields">
                    <label className="labelName" htmlform="nameOfVocal">Vocal(s): </label>
                    <input type="text" className="nameOfVocal" id="nameOfVocal" name="nameOfVocal" value={nameVocals}
                      onChange={(ev => setNameVocals(ev.target.value))} placeholder="Enter name of Vocal ..." maxLength={50} minLength={2}
                      autoComplete='on' />
                  </div>
                  <ButtonKlein
                    handleButton={handleQuery}
                    text={"Query"}
                    parW={'4.9rem'}
                    parH={'2.4rem'}
                    parFS={'1rem'}
                  />
                </div>
              </div>
              <div className="contLine">
                <header className="headerTitleQuerys">
                  <h4 className="titleQuerys">Year Released:</h4>
                </header>
                <div className="contInput">
                  <div className="container2Fields">
                    <label className="labelDate" htmlform="dateReleased">Older: </label>
                    <span className="textDate">{oldYear}</span>
                    <input type="range" id="dateReleased" className="rangeInput" min="1960" max="2023" step="1"
                      list="listYears" value={oldYear} onChange={(ev) => handleQueryOldYear(ev)} />
                    <datalist id="listYears">
                      <option value="1960" label="1960" />
                      <option value="1961" />
                      <option value="1962" />
                      <option value="1963" />
                      <option value="1964" />
                      <option value="1965" label="1965" />
                      <option value="1966" />
                      <option value="1967" />
                      <option value="1968" />
                      <option value="1969" />
                      <option value="1970" label="1970" />
                      <option value="1975" />
                      <option value="1980" label="1980" />
                      <option value="1985" />
                      <option value="1990" label="1990" />
                      <option value="1995" />
                      <option value="2000" label="2000" />
                      <option value="2005" />
                      <option value="2010" label="2010" />
                      <option value="2015" />
                      <option value="2020" label="2020" />
                    </datalist>
                  </div>
                </div>
                <div className="contInput">
                  <div className="container2Fields">
                    <label className="labelDate" htmlform="dateReleased">Recent: </label>
                    <span className="textDate">{newYear}</span>
                    <input type="range" id="dateReleased" className="rangeInput" min="1960" max="2023" step="1"
                      list="listYears" value={newYear} onChange={(ev) => handleQueryNewYear(ev)} />
                    <datalist id="listYears">
                      <option value="1960" label="1960" />
                      <option value="1961" />
                      <option value="1962" />
                      <option value="1963" />
                      <option value="1964" />
                      <option value="1965" label="1965" />
                      <option value="1966" />
                      <option value="1967" />
                      <option value="1968" />
                      <option value="1969" />
                      <option value="1970" label="1970" />
                      <option value="1975" />
                      <option value="1980" label="1980" />
                      <option value="1985" />
                      <option value="1990" label="1990" />
                      <option value="1995" />
                      <option value="2000" label="2000" />
                      <option value="2005" />
                      <option value="2010" label="2010" />
                      <option value="2015" />
                      <option value="2020" label="2020" />
                    </datalist>
                  </div>
                </div>
                <ButtonKlein
                  handleButton={handleQueryYear}
                  text={"Query"}
                  parW={'4.9rem'}
                  parH={'2.4rem'}
                  parFS={'1rem'}
                />

              </div>
              <div className="contLine">
                <header className="headerTitleQuerys headerPrice">
                  <h4 className="titleQuerys">Price:</h4>
                </header>
                <div className="contInput MinPrice">
                  <div className="container2Fields">
                    <label className="labelPrice" htmlForm="minPrice">Min Price: </label>
                    <span className="textDate">{minPrice}</span>
                    <input type="range" id="minPrice" className="rangeInput rangePrice" min="1" max="5" step="0.5"
                      list="listPrices" value={minPrice} onChange={(ev) => handleQueryMinPrice(ev)} />
                    <datalist id="listPrices">
                      <option value="1" label="1" />
                      <option value="1.5" />
                      <option value="2" label="2" />
                      <option value="2.5" />
                      <option value="3" label="3" />
                      <option value="3.5" />
                      <option value="4" label="4" />
                      <option value="4.5" />
                      <option value="5" label="5" />
                    </datalist>
                  </div>
                </div>
                <div className="contInput MaxPrice">
                  <div className="container2Fields">
                    <label className="labelPrice" htmlForm="maxPrice">Max Price: </label>
                    <span className="textDate">{maxPrice}</span>
                    <input type="range" id="maxPrice" className="rangeInput" min="1" max="5" step="0.5"
                      list="listPrices" value={maxPrice} onChange={(ev) => handleQueryMaxPrice(ev)} />
                  </div>
                </div>
                <div className="containerButtons">
                  <ButtonKlein
                    handleButton={handleQueryPrice}
                    text={"Query"}
                    parW={'4.9rem'}
                    parH={'2.4rem'}
                    parFS={'1rem'}
                  />
                  <ButtonKlein
                    handleButton={handleDelete}
                    text={"Delete"}
                    parW={'4.9rem'}
                    parH={'2.4rem'}
                    parFS={'1rem'}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  )
}

export default QuerySongs