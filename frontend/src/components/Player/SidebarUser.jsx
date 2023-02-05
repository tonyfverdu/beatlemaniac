import React, { useState, useEffect, useContext } from 'react'
import { MyScoreContext } from '../../context/MyContext.jsx'
import { useNavigate } from 'react-router-dom'

import '../../sass/componentsSass/Player/Screen/SidebarUser.scss'



function SidebarUser() {
  const { userCustomer, isLoggedin, nameOfUserLogin } = useContext(MyScoreContext)
  const userIni = {
    nameUser: nameOfUserLogin,
    imgUserAvatar: '../src/images/theBeatles/Avatar/Avatar-Transparent-Images.png'
  }
  const [user, setUser] = useState(userIni)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedin) {
      setUser({ nameUser: userCustomer.firstName, imgUserAvatar: userCustomer.avatar_url })
    } else {
      setUser(userIni)
    }
  }, [])

  function handleClickLogin() {
    if (!isLoggedin) {
      navigate(`/loginCustomer`, { replace: false })
    } else if (isLoggedin) {
      navigate(`/loginCustomer`, { replace: false })
    }
  }

  return (
    <div className="contSidebarUser">
      <div className="avatarUser">
      <figure className={`figAvatarUser ${isLoggedin ? 'userImgLogged' : 'userImgNotLogged'}`}>
        <img className={`imgAvatarUser`} src={`${user.imgUserAvatar}`} alt={`${user.nameUser}`} />
      </figure>
      <p className={`nameUser ${isLoggedin ? 'userLogged' : 'userNotLogged'}`} onClick={handleClickLogin} >
        {user.nameUser}
      </p>
      </div>
    </div>
  )
}

export default SidebarUser