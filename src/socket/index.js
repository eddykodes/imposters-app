import io from 'socket.io-client'

const SOCKET_URL = 'https://imposters-app.herokuapp.com/'

export const socket = io(SOCKET_URL, { transports: ['websocket', 'polling']})