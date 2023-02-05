import React, { useState, useEffect } from 'react'
import apiClient from './spotify.js'
import SidebarUser from './SidebarUser.jsx'
import SidebarButton from './FuntionComp/SidebarButton.jsx'

import { FcFeedIn, FcPositiveDynamic, FcStart, FcLike, FcLibrary, FcSettings } from 'react-icons/fc'
import '../../sass/componentsSass/Player/Screen/Sidebar.scss'


function Sidebar({ isFunction }) {
  const [imgSpotify, setImgSpotify] = useState("")
  const arraySidebarButton = [
    {
      Feed: {
        name: 'Feed',
        icon: <FcFeedIn />
      }
    },
    {
      Trending: {
        name: 'Trending',
        icon: <FcPositiveDynamic />
      }
    },
    {
      Player: {
        name: 'Player',
        icon: <FcStart />
      }
    },
    {
      Like: {
        name: 'Like',
        icon: <FcLike />
      }
    },
    {
      Library: {
        name: 'Library',
        icon: <FcLibrary />
      }
    },
    {
      Setting: {
        name: 'Setting',
        icon: <FcSettings />
      }
    }
  ]

  async function fetchGetme () {
    const response = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
headers: {
  
}

    })

  } 

  useEffect(() => {
    // apiClient.get("me").then(response => console.log('response:  ', response))
    
  }, [])


  return (
    <div className="contSidebar">
      <SidebarUser />

      <div className="containerSidebarButton">
        <SidebarButton
          icon={arraySidebarButton[0].Feed.icon}
          name={arraySidebarButton[0].Feed.name}
          isFunction={isFunction}
        />
        <SidebarButton
          icon={arraySidebarButton[1].Trending.icon}
          name={arraySidebarButton[1].Trending.name}
          isFunction={isFunction}
        />
        <SidebarButton
          icon={arraySidebarButton[2].Player.icon}
          name={arraySidebarButton[2].Player.name}
          isFunction={isFunction}
        />
        <SidebarButton
          icon={arraySidebarButton[3].Like.icon}
          name={arraySidebarButton[3].Like.name}
          isFunction={isFunction}
        />
        <SidebarButton
          icon={arraySidebarButton[4].Library.icon}
          name={arraySidebarButton[4].Library.name}
          isFunction={isFunction}
        />
      </div>
      <SidebarButton
        icon={arraySidebarButton[5].Setting.icon}
        name={arraySidebarButton[5].Setting.name}
        isFunction={isFunction}
      />
    </div>
  )
}

export default Sidebar