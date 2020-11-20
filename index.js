var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var baseDirectory = __dirname;
var port = 7000;

http.createServer(function (request, response) {

    try {

        var requestUrl = url.parse(request.url);
        var fsPath = baseDirectory + path.normalize(requestUrl.pathname);
        var fileStream = fs.createReadStream(fsPath);

        console.log('baseDirectory : ' + baseDirectory);
        console.log('requestUrl : ' + requestUrl);
        console.log('fsPath : ' + fsPath);
        
        fileStream.pipe(response);
        
        fileStream.on('open', function() {
            
            response.writeHead(200);
        })
        
        fileStream.on('error', function(e) {
            
            response.writeHead(404);
            response.end();
        })
    } catch(err) {
        
        response.writeHead(500);
        response.end();
        console.log(err.stack);
    }

}).listen(port);

console.log('Listening on port: ' + port);
