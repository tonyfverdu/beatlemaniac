function addDays(parDate, parDays) {
  let resultDate = new Date()

  if (parDate instanceof Date && typeof parDays === 'number' && !Number.isNaN(parDays) && Number.isInteger(parDays) && parDays >= 0) {
    resultDate.setDate(parseInt(parDate.getDate(), 10) + parDays)
  } else {
    console.error('Error:  The arguments of the function "addDays" must be a "date" and an integer greater than zero!')
    resultDate = null
  }
  return resultDate
}

export default addDays

