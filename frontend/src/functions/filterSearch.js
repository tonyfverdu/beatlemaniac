function filterSearch(parTypeArticle, parTypeText = "title", parSearchArticle, parBDOfArticles) {
  const resultSearch = []

  console.log({ parTypeArticle, parTypeText, parSearchArticle, parBDOfArticles })

  if (typeof parTypeArticle === 'string' &&  Array.isArray(parBDOfArticles)) {
    if (parTypeArticle === 'record') {
      parBDOfArticles.filter(art => {
        if (art.title.toLowerCase().includes(parSearchArticle.toLowerCase())) {
          resultSearch.push(art)
        }
      })
    } else if (parTypeArticle === 'song') {
      if (parTypeText === 'title') {
        parBDOfArticles.filter(art => {
          if (art.title.toLowerCase().includes(parSearchArticle.toLowerCase())) {
            resultSearch.push(art)
          }
        })
      } else if (parTypeText === 'album') {
        parBDOfArticles.filter(art => {
          if (art.album.some(elem => elem.toLowerCase().includes(parSearchArticle.toLowerCase()))) {
            resultSearch.push(art)
          }
        })
      } else if (parTypeText === 'vocals') {
        parBDOfArticles.filter(art => {
          if (art.vocals.some(elem => elem.toLowerCase().includes(parSearchArticle.toLowerCase()))) {
            resultSearch.push(art)
          }
        })
      }
    }
  } else {
    console.error('Error:  The arguments of the function "filterSearch" must be string and parArrayBD an array!!')
    return null
  }
  return resultSearch
}

export default filterSearch