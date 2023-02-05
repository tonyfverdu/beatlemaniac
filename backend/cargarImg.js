import colors from 'colors'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dofzwbtnh',
  api_key: '176412633152764',
  api_secret: 'hn-dWD0E9AiELECaNpOrVgh7z9Y'
})

cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, function (error, result) { console.log('The result is:  ', result) })