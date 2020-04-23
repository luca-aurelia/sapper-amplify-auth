import { Auth } from '../Amplify'
import { stores } from '@sapper/app'

const authCookie = {
  async refresh () {
    const { accessToken, idToken, refreshToken } = await Auth.currentSession()
    this.set(accessToken.jwtToken)
  },
  set (accessToken) {
    document.cookie = `accessToken=${accessToken}`
  },
  async delete () {
    document.cookie = ''
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
  await authCookie.delete()
  setAuthorizedOnSession(session, false)
}
