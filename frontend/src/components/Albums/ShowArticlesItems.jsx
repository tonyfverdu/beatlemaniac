import React, { useState, useEffect, useContext } from 'react'
import ArticleItem from './ArticleItem'

import { MyScoreContext } from '../../context/MyContext'

import '../../sass/componentsSass/ShowArticlesItems.scss'

function ShowArticlesItems() {
  const [DBrecords, setDBrecords] = useState([])
  const { recordsOfBeatles, articlesFilterd } = useContext(MyScoreContext)  //  <<==  { recordsOfBeatles } is in context variables

  useEffect(() => {
    if (articlesFilterd.length >= 1) {
      setDBrecords(articlesFilterd)
    } else {
      setDBrecords(recordsOfBeatles)
    }
  }, [articlesFilterd])


  return (
    <div className="contMainArticles">
      {
        DBrecords.map(art => {
          return (
            <div key={art._id} className="contArticleItem">
              <ArticleItem
                idArticle={art._id}
              />
            </div>
          )
        })
      }
    </div>
  )
}

export default ShowArticlesItems