export default request =>
  new Promise((resolve, reject) => {
    let body = ''
    request.on('data', chunk => {
      body += chunk.toString()
    })
    request.on('end', () => {
      const parsed = JSON.parse(body)
      console.log(body)
      resolve(parsed)
    })
  })
