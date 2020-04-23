import { Auth } from '../Amplify'
import cookies from 'js-cookie'

const authCookie = {
  async refresh () {
    const { accessToken, idToken, refreshToken } = await Auth.currentSession()
    this.set(accessToken.jwtToken)
  },
  set (accessToken) {
    cookies.set('accessToken', accessToken)
  },
  delete () {
    cookies.remove('accessToken')
  }
}

const setAuthorizedOnSession = (session, authorized) => {
  session.update(currentSession => {
    return {
      ...currentSession,
      authorized
    }
  })
}

export const signIn = async (username, password, session) => {
  const user = await Auth.signIn(username, password)
  const accessToken = user.signInUserSession.accessToken.jwtToken
  authCookie.set(accessToken)
  setAuthorizedOnSession(session, true)
}

export const signOut = async session => {
  await Auth.signOut()
  authCookie.delete()
  setAuthorizedOnSession(session, false)
}
