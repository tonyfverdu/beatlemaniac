import mongoose from "mongoose"
import * as dotenv from 'dotenv'
import Record from './models/Record.js'
import { faker } from '@faker-js/faker'
dotenv.config()


mongoose.connect(process.env.DB_CONN)
  .then(() => console.log('Datenbank verbunden'))
  .catch((error) => console.log(error))

const recordPromises = Array(100).fill(null).map((el) => {
  const record = {
    title: faker.music.songName(),
    band: faker.animal.fish(),
    price: faker.commerce.price(5, 30)
  }
  return Record.create(record)
})

try {
  await Record.collection.drop()
  const recordCreated = await Promise.all(recordPromises)
  if (recordCreated) {
    console.log('100 Records created')
    mongoose.connection.close()
  }
} catch (error) {
  console.log(error)
}

