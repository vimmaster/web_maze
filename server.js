const http = require('http');
const url = require('url');
const fs = require('fs'); // file system

console.debug('Listening for connections...');
http.createServer(function (req, res) {
    const query = url.parse(req.url, true);
    switch(query.pathname) {
        case '/index.html':
        console.debug('A connection is established.');
        fs.readFile('index.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
        break;
        case '/style.css':
            fs.readFile('./style.css', function(err, data) {
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.write(data);
                return res.end();
            });
        break;
        case '/frontend.js':
            fs.readFile('./frontend.js', function(err, data) {
                res.writeHead(200, {'Content-Type': 'text/javascript'});
                res.write(data);
                return res.end();
            });
        break;
        default:
            res.writeHead(404, {'Content-Type' : 'text/plain'});
            res.end();
    }
}).listen(8080);