import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom"

import { MyScoreContext } from '../../context/MyContext.jsx'

import Button from '../Button'

import { FcSearch } from "react-icons/fc"
import { TbListSearch } from "react-icons/tb"

import '../../sass/componentsSass/Search/Search.scss'


function Search() {
  const { recordsOfBeatles, songsOfBeatles, typeArticle, setArticlesFilterd } = useContext(MyScoreContext)
  const textSearch = 'Search'
  const [searchFilter, setSearchFilter] = useState('')
  const [isToggleButton, setIsToggleButton] = useState(false)
  const [BD_Articles, setBD_Articles] = useState(songsOfBeatles)
  const [searchInput, setSearchInput] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    filterSearch()
  }, [typeArticle])

  function iniBBDD() {
    if (typeArticle === 'song') {
      setBD_Articles(songsOfBeatles)
    } else if (typeArticle === 'record') {
      setBD_Articles(recordsOfBeatles)
    } else {
      setBD_Articles(songsOfBeatles)
    }
  }

  const handleSearchInput = (ev) => {
    setSearchInput(ev.target.value)
  }

  function filterSearch() {
    iniBBDD()
    // eslint-disable-next-line array-callback-return
    const resultSearchFilter = BD_Articles.filter(art => {
      if (typeArticle === 'record') {
        if (
          art.title.toUpperCase().includes(searchInput) || art.title.toLowerCase().includes(searchInput) ||
          art.label.toUpperCase().includes(searchInput) || art.label.toLowerCase().includes(searchInput)
        ) {
          return art
        }
      } else if (typeArticle === 'song') {
        if (
          art.title.toUpperCase().includes(searchInput) || art.title.toLowerCase().includes(searchInput) ||
          art.album.some(vocal => vocal.toUpperCase().includes(searchInput) || vocal.toLowerCase().includes(searchInput)) ||
          art.vocals.some(vocal => vocal.toUpperCase().includes(searchInput) || vocal.toLowerCase().includes(searchInput))
        ) {
          return art
        }
      }
    })
    setSearchFilter(resultSearchFilter)
    setArticlesFilterd(resultSearchFilter)
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    setIsToggleButton(!isToggleButton)
  }

  function handleSearch() {
    filterSearch()
    if (typeArticle === 'record') {
      navigate(`/resultSearchRecords`, { replace: false })
    } else if (typeArticle === 'song') {
      navigate(`/resultSearchSongs`, { replace: false })
    }
    setSearchInput('')
  }


  return (
    <form className="formSearch" onSubmit={(ev) => handleSubmit(ev)} >
      <div className="contInputSearch">
        <i className="icoSearch"><TbListSearch /></i>
        <input id="elementSearch" className="inputSearch" type="text" value={searchInput} name="elementSearch" maxLength='35'
          placeholder={`Search ${typeArticle} ...`} onChange={(ev) => handleSearchInput(ev)} onDoubleClick={handleSearch} />
      </div>

      <div className="contButtonSearch">
        <i><FcSearch /></i>
        <Button
          handleButton={handleSearch}
          text={textSearch}
        />
      </div>
    </form>
  )
}

export default Search