import axios from 'axios'


const authEndPoint = 'https://accounts.spotify.com/authorize?'
const clientID = '740d1c93f0184020aa48ef6d21a6ede6'
const redirectURI = 'http://localhost:3000/player'
const scopes = ["user-library-read", "playlist-read-private"]

export const loginEndPoint = `${authEndPoint}client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/"
})

export const setClientTokenSpotify = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    console.log('estoy aqui, token:  ', token)
    config.headers.Authorization = 'Bearer' + token
    return config
  })
}

export default apiClient