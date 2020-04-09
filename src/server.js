import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'
import auth from './middleware/auth.js'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

const sapperMiddleware = {
  session (request, response) {
    return request.auth
  }
}

polka() // You can also use Express
  .use(
    auth,
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware(sapperMiddleware)
  )
  .listen(PORT, err => {
    if (err) console.log('error', err)
  })
