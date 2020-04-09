const isAuthorized = request => {
  const cookie = request.headers.cookie
  return cookie && cookie.includes('accessToken=ministryOfSillyWalks')
}

const requiresAuthorization = request => {
  return request.url.includes('protected.json')
}

export default (request, response, next) => {
  if (!requiresAuthorization(request)) {
    request.auth = {
      loggedIn: false
    }
    next()
    return
  }

  if (!isAuthorized(request)) {
    request.auth = {
      loggedIn: false
    }
    response.statusCode = 401
    response.end()
    return
  }

  request.auth = {
    loggedIn: false
  }
  next()
}
