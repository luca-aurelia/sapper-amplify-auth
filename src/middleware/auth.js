import CognitoExpress from 'cognito-express'
import pifyMethod from '../helpers/pifyMethod'
import cookie from 'cookie'
import awsConfig from '../aws-exports'

const cognitoExpress = new CognitoExpress({
  region: awsConfig.aws_project_region,
  cognitoUserPoolId: awsConfig.aws_user_pools_id,
  tokenUse: 'access', // Possible Values: access | id
  tokenExpiration: 3600000 // Up to default expiration of 1 hour (3600000 ms)
})

pifyMethod(cognitoExpress, 'validate')

const getAccessToken = request => {
  if (!request.headers.cookie) return null

  const { accessToken } = cookie.parse(request.headers.cookie)
  return accessToken
}

const isAuthorized = async request => {
  const accessToken = getAccessToken(request)
  if (!accessToken) return false

  const claims = await cognitoExpress.validate(accessToken)
  // console.log(claims)
  // return claims
  return true
}

const requiresAuthorization = request => {
  return request.url.includes('protected.json')
}

const setUnauthorized = response => {
  response.statusCode = 401
}

export default async (request, response, next) => {
  console.log('')
  console.log(request.url)
  const authorized = await isAuthorized(request)
  request.auth = { authorized }

  if (!requiresAuthorization(request)) {
    console.log('doesnt require auth')
    next()
    return
  }

  if (authorized) {
    console.log('authorized')
    next()
    return
  }

  // Route requires auth, but user isn't authorized.
  console.log('not authorized')
  setUnauthorized(response)

  response.end()
}
