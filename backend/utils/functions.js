import { v4 as uuidv4 } from 'uuid'
import bcrypt, { compare } from 'bcrypt'
import colors from "colors"


function generateIDRandom() {
  const newIdRandom = uuidv4()

  return newIdRandom
}

function whatTimeIsIt() {
  const theTimeIs = new Date
  return theTimeIs
}

function randomNumber(minPar, maxPar) {
  let resultRandomNumber = 0

  if ((typeof minPar === "number" && Number.isInteger(minPar)) && (typeof maxPar === "number" && Number.isInteger(maxPar))) {
    resultRandomNumber = Math.floor(Math.random() * (maxPar - minPar) + minPar)
  } else {
    console.error('Error:  The arguments of the function "randomNumber" muss be an integer number !!')
    resultRandomNumber = null
  }
  return resultRandomNumber
}

async function compareHash(parPassword, parHash) {
  let areEquals = undefined

  try {
    areEquals = await compare(parPassword, parHash);

  } catch (error) {
    console.error(error)
    areEquals = null
  }

  // await compare(parPassword, parHash)
  //   .then(isEgal => {
  //     if (isEgal) {
  //       console.log('                       '.bgGreen);
  //       console.log(`  Is egal?:  ${isEgal}      `.bgGreen);
  //       console.log('                       '.bgGreen);
  //       console.log('');

  //       areEquals = true;
  //     } else {
  //       console.log('                       '.bgRed);
  //       console.log(`  Is egal?:  ${isEgal}     `.bgRed);
  //       console.log('                       '.bgRed);
  //       console.log('');

  //       areEquals = false;
  //     }
  //   })
  //   .catch(error => console.error(`Error:  ${error}`.bgRed))

  return areEquals
}


export { generateIDRandom, whatTimeIsIt, randomNumber, compareHash }