import parseBody from '../helpers/parseBody.js'

const parseCredentials = async request => {
  const body = await parseBody(request)
  return {
    username: body && body.username,
    password: body && body.password
  }
}

const isAuthorized = (username, password) =>
  username === 'username' && password === 'password'

const authCookie = 'accessToken=ministryOfSillyWalks; HttpOnly'
const expirationDate = new Date(1).toUTCString()
const expireAuthCookie = authCookie + '; Expires=' + expirationDate

export async function post (request, response) {
  console.log('Logging in.')
  const { username, password } = await parseCredentials(request)

  if (!username || !password) {
    response.statusCode = 401
    response.setHeader('Content-Type', 'application/json')
    response.end(JSON.stringify({ message: 'Include username and password.' }))
    return
  }

  if (isAuthorized(username, password)) {
    console.log('authorization succeeded')
    response.setHeader('Set-Cookie', authCookie)

    response.statusCode = 204
    response.end()
    return
  }

  response.statusCode = 401
  response.statusMessage = 'Not authorized'
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify({ message: 'Wrong username or password.' }))
}

export async function del (request, response) {
  response.setHeader('Set-Cookie', expireAuthCookie)
  response.statusCode = 204
  response.end()
}
