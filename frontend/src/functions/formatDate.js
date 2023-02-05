function formatDate(parDate) {
let newFormatDate = ''
  if (parDate instanceof Date && !isNaN(parDate)) {
    const year = parDate.getFullYear().toString()
    const month = (parDate.getMonth() + 1).toString()
    const day = parDate.getDate().toString()
    const sekunden = parDate.getSeconds().toString()
    const minuten = parDate.getMinutes().toString()
    const uhr = parDate.getHours().toString()

    newFormatDate = year + "-" + month + "-" + day + " || " + uhr + ":" + minuten + ":" + sekunden
  } else {
    console.error('The argument of the function "formatDate" must be a date !!')
    newFormatDate = null
  }
  return newFormatDate
}

export default formatDate