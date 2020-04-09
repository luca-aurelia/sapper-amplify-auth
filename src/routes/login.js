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

export async function post (request, response) {
  const { username, password } = await parseCredentials(request)

  if (!username || !password) {
    response.statusCode = 401
    response.setHeader('Content-Type', 'application/json')
    response.end(JSON.stringify({ message: 'Include username and password.' }))
    return
  }

  if (isAuthorized(username, password)) {
    response.setHeader(
      'Set-Cookie',
      'accessToken=ministryOfSillyWalks; HttpOnly'
    )

    response.statusCode = 204
    response.end()
    return
  }

  response.statusCode = 401
  response.statusMessage = 'Not authorized'
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify({ message: 'Wrong username or password.' }))
}
