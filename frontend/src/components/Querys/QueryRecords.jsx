import React, { useState, useEffect, useContext } from 'react'
import ButtonKlein from '../ButtonKlein.jsx'

import { MyScoreContext } from '../../context/MyContext.jsx'

import filterSearch from '../../functions/filterSearch.js'
import '../../sass/componentsSass/Querys/QueryRecords.scss'

function QueryRecords({ titleQuery }) {
  const iniRangeDate = {
    oldDate: 1965,
    newDate: 1985
  }
  const iniRangePrice = {
    minPrice: 45,
    maxPrice: 195
  }
  const [isToggleButton, setIsToggleButton] = useState(false)
  const [submitQuery, setSubmitQuery] = useState(false)
  const [errors, setErrors] = useState([])

  const [nameAlbum, setNameAlbum] = useState('')
  const [oldDate, setOlDate] = useState(iniRangeDate.oldDate)
  const [newDate, setNewDate] = useState(iniRangeDate.newDate)
  const [minPrice, setMinPrice] = useState(iniRangePrice.minPrice)
  const [maxPrice, setMaxPrice] = useState(iniRangePrice.maxPrice)

  const { recordsOfBeatles, setRecordsOfBeatles, setArticlesFilterd } = useContext(MyScoreContext)


  //  Que cono pasa con las querys, no funcionan !!!!
  async function fetchSubmitFormDatesQuerys(parQueryDate) {
    const urlQuerys = `?${'oldDate'}=${parQueryDate.oldDate}&${'newDate'}=${parQueryDate.newDate}`
    const urlCompleted = `http://127.0.0.1:3001/records${urlQuerys}`

    const response = await fetch(urlCompleted, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => data.json())
    .catch(err => console.log('Error in fetch:  ', err))

    setRecordsOfBeatles(response.records)
    setArticlesFilterd(response.records)

    if (response.status === 200) {
      // eslint-disable-next-line no-const-assign
      const dataRecords = response.recordsFound.map(elem => elem)
      setRecordsOfBeatles(dataRecords)
      setArticlesFilterd(dataRecords)
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
    const urlCompleted = `http://127.0.0.1:3001/records${urlQuerys}`

    const response = await fetch(urlCompleted, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => data.json())
      .catch(err => console.log('Error in fetch:  ', err))

    setRecordsOfBeatles(response.records)
    setArticlesFilterd(response.records)

    if (response.status === 200) {
      // eslint-disable-next-line no-const-assign
      const dataRecords = response.recordsFound.map(elem => elem)
      setRecordsOfBeatles(dataRecords)
      setArticlesFilterd(dataRecords)
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

  //  ACHTUNG:  UTILIZAR ESTE USEEFFECT EN LA BUSQUEDA TEXTUAL DEL BUSCADOR (SEARCH) QUE QUEDA MUY BONITO
  useEffect(() => {
    const resultArray = filterSearch('record', "title", nameAlbum, recordsOfBeatles)
    setArticlesFilterd(resultArray)
  }, [nameAlbum])

  function handleSubmitFormQuerys(ev) {
    ev.preventDefault()
    const resultArray = filterSearch('record', "title", nameAlbum, recordsOfBeatles)
    setArticlesFilterd(resultArray)
  }

  async function handleDelete() {
    setNameAlbum('')
    setOlDate(iniRangeDate.oldDate)
    setNewDate(iniRangeDate.newDate)
    setMinPrice(iniRangePrice.minPrice)
    setMaxPrice(iniRangePrice.maxPrice)
    await fetchSubmitFormPricesQuerys({ minPrice: 0, maxPrice: 255 })
  }
  function handleQuery() {
    setSubmitQuery(!submitQuery)
  }
  function toggleButtonAlbums() {
    setIsToggleButton(!isToggleButton)
  }
  function handleQueryOldDate (ev) {
    setOlDate(Number(ev.target.value))
  }
  function handleQueryNewDate (ev) {
    setNewDate(Number(ev.target.value))
  }
  function handleQueryMinPrice(ev) {
    setMinPrice(Number(ev.target.value))
  }
  function handleQueryMaxPrice(ev) {
    setMaxPrice(Number(ev.target.value))
  }

  async function handleQueryDate() {
    await fetchSubmitFormDatesQuerys({ oldDate, newDate })
  }
  async function handleQueryPrice() {
    await fetchSubmitFormPricesQuerys({ minPrice, maxPrice })
  }

  return (
    <>
      <button className={`contQueryBox ${!isToggleButton ? 'colorRed' : 'colorGreen'}`} onClick={toggleButtonAlbums}>
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
                    <label className="labelName" htmlform="nameOfAlbum">Name of Album: </label>
                    <input type="text" className="nameOfAlbum" id="nameOfAlbum" name="nameOfAlbum" value={nameAlbum}
                      onChange={(ev => setNameAlbum(ev.target.value))} placeholder="Enter name of Album ..." maxLength={50} minLength={2}
                      autoComplete='on' />
                    <ButtonKlein
                      handleButton={handleQuery}
                      text={"Query"}
                      parW={'4.9rem'}
                      parH={'2.4rem'}
                      parFS={'1rem'}
                    />
                  </div>
                </div>
              </div>
              <div className="contLine">
                <header className="headerTitleQuerys">
                  <h4 className="titleQuerys">Date Released:</h4>
                </header>
                <div className="contInput">
                  <div className="container2Fields">
                    <label className="labelDate" htmlform="dateReleased">Older: </label>
                    <span className="textDate">{oldDate}</span>
                    <input type="range" id="dateReleased" className="rangeInput" min="1960" max="2023" step="1"
                      list="listYears" value={oldDate} onChange={(ev) => handleQueryOldDate(ev)} />
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
                    <span className="textDate">{newDate}</span>
                    <input type="range" id="dateReleased" className="rangeInput" min="1960" max="2023" step="1"
                      list="listYears" value={newDate} onChange={(ev) => handleQueryNewDate(ev)} />
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
                  handleButton={handleQueryDate}
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
                    <input type="range" id="minPrice" className="rangeInput" min="15" max="250" step="10"
                      list="listPrices" value={minPrice} onChange={(ev) => handleQueryMinPrice(ev)} />
                    <datalist id="listPrices">
                      <option value="15" label="15" />
                      <option value="30" />
                      <option value="45" />
                      <option value="60" label="60" />
                      <option value="75" />
                      <option value="90" />
                      <option value="105" label="105" />
                      <option value="120" />
                      <option value="135" />
                      <option value="150" label="150" />
                      <option value="165" />
                      <option value="180" />
                      <option value="195" label="195" />
                      <option value="210" />
                      <option value="225" />
                      <option value="240" label="240" />
                      <option value="255" />
                    </datalist>
                  </div>
                </div>
                <div className="contInput MaxPrice">
                  <div className="container2Fields">
                    <label className="labelPrice" htmlForm="maxPrice">Max Price: </label>
                    <span className="textDate">{maxPrice}</span>
                    <input type="range" id="maxPrice" className="rangeInput" min="15" max="255" step="10"
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

export default QueryRecords