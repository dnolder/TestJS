var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('This is it!\n');
}).listen(18190, '127.0.0.1');
console.log('Server running at http://127.0.0.1:18190/');
