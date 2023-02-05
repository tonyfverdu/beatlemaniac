function currentDate() {
  const date = new Date()
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString()
  const day = date.getDate().toString()
  const sekunden = date.getSeconds().toString()
  const minuten = date.getMinutes().toString()
  const uhr = date.getHours().toString()

  const todayIs = year + "-" + month + "-" + day + " || " + uhr + ":" + minuten + ":" + sekunden

  return todayIs
}

export default currentDate