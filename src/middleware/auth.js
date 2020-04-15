const isAuthorized = request => {
  const cookie = request.headers.cookie
  return cookie && cookie.includes('accessToken=ministryOfSillyWalks')
}

const requiresAuthorization = request => {
  return request.url.includes('protected')
}

const isDataRoute = request => /.json$/g.test(request.url)

const redirectToLogin = response => {
  response.writeHead(302, { Location: '/' })
}

const setUnauthorized = response => {
  response.statusCode = 401
}

export default (request, response, next) => {
  console.log('')
  console.log(request.url)
  const loggedIn = isAuthorized(request)
  request.auth = { loggedIn }

  if (!requiresAuthorization(request)) {
    console.log('doesnt require auth')
    next()
    return
  }

  if (isAuthorized(request)) {
    console.log('authorized')
    next()
    return
  }

  // Route requires auth, but user isn't authorized.
  console.log('not authorized')
  if (isDataRoute(request)) {
    setUnauthorized(response)
  } else {
    redirectToLogin(response)
  }

  response.end()
}
