// eslint-disable-next-line no-unused-vars
import colors from 'colors'
// Reads number of rows to be printed
const argumentNumber = parseInt(process.argv.splice(2)[0], 10)

function baum(parNumber) {
  const max = parNumber           // definimos la anchura máxima
  let j = 1
  let k = 1                       // variables de interación
  let txt = ""                    // contiene el resultado a mostrar

  if (typeof parNumber === 'number' && Number.isInteger(parNumber)) {
    for (let h = 1; h < 3; h++) {
      for (let i = k; i <= max; i += 2) {
        txt += ` ${(Array((1 + (Math.ceil(max / 2)) - j)).join(" ") + Array(i + 1).join("*"))}\n`
        j = j + 1
      }
      k = 5
      j = 3
    }
    // tronco
    if (max >= 7) {
      txt += ` ${(Array((1 + (Math.ceil(max / 2)) - 2)).join(" ") + Array(4).join("*"))}\n`
      txt += ` ${(Array((1 + (Math.ceil(max / 2)) - 2)).join(" ") + Array(4).join("*"))}\n`
    }
    console.log(`${txt}`.bgGreen)
    txt = ""
    for (let m = 0; m < 3; m++) {
      txt += ` ${(Array((1 + (Math.ceil(max / 2)) - 2)).join(" ") + Array(2).join("*"))}\n`
    }
    console.log(`${txt}`.bgMagenta)
  } else {
    console.error('Error:  Sorry man, you must be an integer argument write'.bgRed)
  }
  console.log('')
  console.log('                   '.bgBlue)
  console.log('  Merry Christmas  '.bgBlue)
  console.log('                   '.bgBlue)
}


baum(argumentNumber)

// ///////////////////////////