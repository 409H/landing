const FileServer = require('node-static').Server
const http = require('http')

var fileServer = new FileServer('./dist')

http.createServer(function (request, response) {
  request.addListener('end', function () {
    fileServer.serve(request, response)
  }).resume()
}).listen(9000)