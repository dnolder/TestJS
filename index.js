var server = require("./server");
var router = require("./router");
var requestHandler = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandler.textstart;
handle["/textstart"] = requestHandler.textstart;
handle["/filestart"] = requestHandler.filestart;
handle["/textupload"] = requestHandler.textupload;
handle["/fileupload"] = requestHandler.fileupload;
handle["/execls"] = requestHandler.execls;
handle["/show"] = requestHandler.show;

console.log('Starting server ...\n');

server.start(router.route, handle);