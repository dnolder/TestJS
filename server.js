var http = require('http');
var url = require('url');

function start(route, handle) {
    
    http.createServer(function (request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log('Request for ' + pathname + ' received.');

        route(handle, pathname, response, request);

    }).listen(3001, '127.0.0.1');
    
    console.log('Server running at http://127.0.0.1:3001/, Node version: ',process.version);
}

exports.start = start;