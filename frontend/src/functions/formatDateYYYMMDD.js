function formatDateYYYYMMDD(parDate) {
  let newFormatDate = ''
  if (parDate instanceof Date && !isNaN(parDate)) {
    const year = parDate.getFullYear().toString()
    const month = (parDate.getMonth() + 1).toString()
    const day = parDate.getDate().toString()

    newFormatDate = year + "-" + month + "-" + day
  } else {
    console.error('The argument of the function "formatDate" must be a date !!')
    newFormatDate = null
  }
  return newFormatDate
}

export default formatDateYYYYMMDD