var sys = require('sys'), http = require('http');

http.CreateServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    var thing = null;
    req.addListener('data', function (data) {
        thing = data.toString();
    }).addListener('end', function() {
        res.end("Post data:"+thing);
    });
}).listen(8000);