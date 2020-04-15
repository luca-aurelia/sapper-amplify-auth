export default function authenticate (context, preload, page, session) {
  if (!session.loggedIn) {
    this.error(401, 'Not authorized')
    return
  }

  return preload()
  // preload.call(context, page, session)
}
