import React, { useState, useEffect, useContext } from 'react'
import { FaRegHeart } from 'react-icons/fa'

import { MyScoreContext } from '../../../../context/MyContext.jsx'

import '../../../../sass/componentsSass/Player/PlayerMusic/CompShowSong.scss'


function CompShowSong() {
  const messageLikes = {
    yesLike: "You like it!",
    frageLike: "Are do you like it?"
  }
  const { userCustomer, setUserCustomer, currentSong, setCurrentSong } = useContext(MyScoreContext)
  const [errors, setErrors] = useState([])
  const [isLike, setIsLike] = useState(false)
  const [songDataToModify, setSongDataToModify] = useState(currentSong)
  const [userDataToModify, setUserDataToModify] = useState(userCustomer)

  const [itLiked, setItLiked] = useState(false)

  function includesSong(parArraySongs, parSongId) {
    if (Array.isArray(parArraySongs) && typeof parSongId === 'string') {
      const resultado = parArraySongs.includes(parSongId)
      // console.log('Incuye ya la cancion en el arrary de canciones que te gustan?  ', resultado)
      setItLiked(resultado)
      setIsLike(resultado)
    } else {
      console.error('Error:  The arguments of the function "includesSong" must be an array and a string!')
      setItLiked(null)
    }
  }

  useEffect(() => {
    setSongDataToModify(currentSong)
    includesSong(userCustomer.songsLikes, currentSong._id)
    if (itLiked) {
      setIsLike(true)
    } else {
      setIsLike(false)
    }
    // console.log('itLiked:  ', itLiked)
    // console.log('isLike?:  ', isLike)
  }, [currentSong])

  useEffect(() => {
    console.log(' ******************************* ')
    console.log('songDataToModify:  ', songDataToModify)
    console.log(' ******************************* ')
    console.log('currentSong:  ', currentSong)
    console.log(' ******************************* ')
  }, [isLike])

  // async function fetchSongByIdLike() {
  //   const _id = currentSong._id
  //   const urlQuerySongId = `?_id=${_id}`
  //   const urlBackendSong = "http://127.0.0.1:3001/songs/song/"
  //   const urlCompletedQuery = `${urlBackendSong}${urlQuerySongId}`
  //   console.log('urlCompletedQuery:  ', urlCompletedQuery)

  //   const fetchDataSongLike = await fetch(urlCompletedQuery, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })

  //   const response = await fetchDataSongLike.json()
  //   const { message, song } = response

  //   if (fetchDataSongLike.status === 200 || fetchDataSongLike.status === 304) {
  //     console.log('All good:  ', message)
  //     setCurrentSong(song)
  //   } else if (fetchDataSongLike.status === 400) {
  //     const result = await fetchDataSongLike.json()
  //     for (const row of result.message) {
  //       for (const key in row) {
  //         errors.push(row[key])
  //       }
  //     }
  //     setErrors(errors)
  //   } else {
  //     setErrors(['Etwas ist schief gelaufen'])
  //   }
  // }

  async function fechtPATCH_ToSong() {
    const urlBackendUpdate = 'http://127.0.0.1:3001/songs/song'

    const fetchDataPATCHOfSong = await fetch(urlBackendUpdate,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ songDataToModify })
      })

    const response = await fetchDataPATCHOfSong.json()
    const { message, song } = response

    if (fetchDataPATCHOfSong.status === 200) {
      console.log('en la funcion la song es:  ', song)
      // setCurrentSong(song)
      console.log('All OK in the patch song:  ', message)
      return song
    } else if (fetchDataPATCHOfSong.status === 400) {
      const result = await fetchDataPATCHOfSong.json()
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

  async function fechtPATCH_ToUser() {
    const urlBackendUpdate = 'http://127.0.0.1:3001/users/user'

    const fetchDataPATCHOfUser = await fetch(urlBackendUpdate,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ userDataToModify })
      }
    )
    // console.log('fetchDataPATCHOfUser.status:  ', fetchDataPATCHOfUser.status)
    const response = await fetchDataPATCHOfUser.json()
    const { message, user } = response

    if (fetchDataPATCHOfUser.status === 200) {
      setUserCustomer(user)
      console.log(`All Ok. ${message}`)
    } else if (fetchDataPATCHOfUser.status === 400) {
      const result = await fetchDataPATCHOfUser.json()
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

  function handleLike() {
    if (isLike) {
      console.log('Entro con isLike a False?:  ', isLike)
      // console.log('Antes userCustomer.songsLike:  ', userCustomer.songsLike)
      // setUserCustomer({ ...userCustomer, 'songsLike': userCustomer.songsLike.push(currentSong._id) })
      // console.log('Despues userCustomer.songsLike:  ', userCustomer.songsLike)

      console.log('Antes songDataToModify.likes:  ', songDataToModify.likes)
      console.log('songDataToModify:  ', songDataToModify)
      setSongDataToModify({ ...songDataToModify, likes: songDataToModify.likes + 1 })
      console.log('Despues songDataToModify.likes:  ', songDataToModify.likes)
      fechtPATCH_ToSong()
      // setSongDataToModify({ ...songDataToModify, 'likes': songDataToModify.likes + 1 })

      // setUserDataToModify({ ...userDataToModify, songsLikes: userDataToModify.songsLikes.push(currentSong) })
      // fechtPATCH_ToUser()
    } else {
      console.log('Entro con isLike a True:  ', isLike)
      // const indexToChange = userCustomer.songsLike.indexOf(currentSong._id)
      // setUserCustomer({ ...userCustomer, 'songsLike': userCustomer.songsLike.splice(indexToChange, 1) })
      console.log('Voy hacer songDataToModify.likes  - 1.  Antes songDataToModify.likes:  ', songDataToModify.likes)
      setSongDataToModify({ ...songDataToModify, 'likes': songDataToModify.likes - 1 })
      console.log('Despues songDataToModify.likes:  ', songDataToModify.likes)
      fechtPATCH_ToSong()
      // setSongDataToModify({ ...songDataToModify, 'likes': songDataToModify.likes - 1 })
      // console.log(`Entro es isLike: ${isLike}.  Despues songDataToModify:`)

      // setUserDataToModify({ ...userDataToModify, songsLikes: userDataToModify.songsLikes.pop() })
      // fechtPATCH_ToUser()
    }
    console.log('En currentSong ahora:  currentSong.likes:  ', currentSong.likes)
    console.log('antes isLike', isLike)
    setIsLike(!isLike)
    console.log('despues isLike', isLike)
  }


  return (
    <div className="contCompShowSong">
      <figure className="figureAlbum">
        <img src={`./src/images/theBeatles/portadas/${currentSong.image[0]}`} alt={`image of Album "${currentSong.title}"`} className="imgAlbum" />
      </figure>
      <div className="contInfoAlbum">
        <span className="firstLine">
          <div className="contHidden">
            <span className="infoMov">{`${currentSong.vocals} - ${currentSong.title}`}</span>
          </div>
          <div className="contIcoFrage">
            {!isLike
              ? <>
                <div className="contIco contIcoInactive" onClick={handleLike}>
                  <FaRegHeart />
                </div>
                <span className="AreDoYouLikeIt">{messageLikes.frageLike}</span>
              </>
              : <>
                <div className="contIco contIcoActive" onClick={handleLike}>
                  <FaRegHeart />
                </div>
                <span className="yesItIsLike">{messageLikes.yesLike}</span>
              </>
            }
          </div>
        </span>
        <div className="contRealeased">
          <span className="secondLine">Released date: </span>
          <span className="thirdLine">{currentSong.year}</span>
        </div>
      </div>
    </div>
  )
}


export default CompShowSong