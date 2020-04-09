const emoji = ['🍣', '🍥', '🍤']

export async function get (request, response) {
  response.setHeader('Content-Type', 'application/json')
  response.statusCode = 200
  response.end(JSON.stringify(emoji))
}
