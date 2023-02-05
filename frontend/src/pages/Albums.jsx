import React, { useState, useEffect, useContext } from 'react'
import ShowArticlesItems from '../components/Albums/ShowArticlesItems.jsx'
import HeaderTypeArticle from '../components/Headers/HeaderTypeArticle.jsx'
import QueryRecords from '../components/Querys/QueryRecords.jsx'

import { MyScoreContext } from '../context/MyContext'

import '../sass/componentsSass/Albums.scss'


function Albums() {
  const textQuery = "Albums Querys"
  const arrayImag1 = ['AbbeyRoad.jpg', 'YellowSubmarine.jpg']
  const arrayImag2 = ['betlesMov2.gif', "SgtPepper.jpg"]
  // const [message, setMessage] = useState('')
  const [errors, setErrors] = useState([])
  const [isToggle, setIsToggle] = useState(false)

  const { recordsOfBeatles, setRecordsOfBeatles, setTypeArticle, setArticlesFilterd } = useContext(MyScoreContext)

  async function fetchDataRecords() {
    const response = await fetch('http://127.0.0.1:3001/records', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => data.json())
      .catch(err => console.log('Error in fetch:  ', err))

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

  const handleAlbums = async function fetchDataRecords() {
    setIsToggle(!isToggle)
    setArticlesFilterd(recordsOfBeatles)
  }

  useEffect(() => {
    setTypeArticle('record')
    fetchDataRecords()
  }, [])

  return (
    <div className="contShowRecords">
      <HeaderTypeArticle
        article={'Albums'}
        isToggle={isToggle}
        handleArticles={handleAlbums}
        arrayImgs={[arrayImag1, arrayImag2]}
      />
      {
        isToggle &&
        <>
          <QueryRecords
            titleQuery={textQuery}
          />
          <ShowArticlesItems
          />
        </>
      }
    </div>
  )
}

export default Albums