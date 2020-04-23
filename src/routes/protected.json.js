const emoji = ['🍣', '🍥', '🍤']

export async function get (request, response) {
  console.log('Returning protected data.')

  response.setHeader('Content-Type', 'application/json')
  response.statusCode = 200
  response.end(JSON.stringify(emoji))
}
