const FileServer = require('node-static').Server
const http = require('http')

var fileServer = new FileServer('./dist')
var port = 9000

http.createServer(function (request, response) {
  request.addListener('end', function () {
    fileServer.serve(request, response)
  }).resume()
}).listen(port)
console.log('Now listening on port ' + port)
