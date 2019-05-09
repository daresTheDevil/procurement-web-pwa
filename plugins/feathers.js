import feathers from '@feathersjs/feathers'
import authentication from '@feathersjs/authentication-client'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

// const host = process.env.HOST || 'localhost'
// const port = process.env.PORT || '3030'
// const host = 'localhost'
// const port = '3030'

const api = 'http://localhost:3030'
// const api = process.env.apiUrl

const socket = io(api)
// const socket = io('http://0.0.0.0:3030')
// const socket = io('https://mde-procurement-api.azurewebsites.net/')

const app = feathers()
  .configure(socketio(socket))
  // .configure(hooks())
  .configure(authentication())

export default app
