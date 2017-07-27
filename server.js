const FileServer = require('node-static').Server
const http = require('http')

const fileServer = new FileServer('./dist')
const port = 9000

const server = http.createServer((request, response) => {
  request.addListener('end', () => {
    fileServer.serve(request, response)
  }).resume()
})
server.listen(port)
console.log('Now listening on port ' + port)

process.on('SIGTERM', () => {
  console.log('got SIGTERM')
  closeServer()
})

process.on('SIGHUP', () => {
  console.log('got SIGHUP')
  closeServer()
})

function closeServer() {
  server.close(() => {
    process.exit(0)
  })
}