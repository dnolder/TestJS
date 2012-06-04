var http = require('http');
var url = require('url');
var exec = require('child_process').exec;
var formidable = require("formidable");
var querystring = require("querystring");
var fs = require("fs");
// var router = require("./router");
// var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = start;
handle["/start"] = start;
handle["/upload"] = upload;
handle["/execls"] = execls;
handle["/show"] = show;

function route(handle, pathname, response, postData) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, postData);
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('404 Not Found.\n');
    response.write('Server running under Node version: ' + process.version + '\n');
    response.end();
  }
}

function execls(response, postData) {
    console.log("Request handler 'start' was called.");
    exec("ls -lah", function (error, stdout, stderr) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(stdout + '\n');
        response.write('Server running under Node version: ' + process.version + '\n');
        response.end();
    });

}

function start(response, postData) {
    console.log("Request handler 'start' was called.");
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write("You've sent: " + postData + '\n');
    response.write('Server running under Node version: ' + process.version + '\n');
    response.end();
}

function show(response, postData) {
  console.log("Request handler 'show' was called.");
  fs.readFile("./nodester.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

http.createServer(function (request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log('Request for ' + pathname + ' received.');

    request.setEncoding("utf8");

    request.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
        console.log("Received POST data chunk '" + postDataChunk + "'.");
    });

    request.addListener("end", function() {
        route(handle,pathname, response, postData);
    });

}).listen(3001, '127.0.0.1');
    
console.log('Server running at http://127.0.0.1:3001/, Node version: ',process.version);
