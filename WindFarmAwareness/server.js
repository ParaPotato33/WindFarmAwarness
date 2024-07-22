const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const Splide = require('@splidejs/splide');

// Create an HTTP server that will respond to all requests
var server = http.createServer(function (req, res) {
    var filePath = path.join(__dirname, req.url);
    filePath = filePath.split('?')[0];
    
    fs.readFile(filePath, (err, content) => {

        if (req.method === 'PUT') {
            console.log("put request")
            var body = '';
    
            req.on('data', function(chunk) {
                body += chunk;
            });
            
            req.on('end', function() {
                if (req.url === '/src/users.json') {
                    fs.writeFile('src/users.json', body, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
                res.end();
            });
        } else if (req.url === '/') {
            fs.readFile('src/index.html', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal server error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        }

        else if (err) {
            console.log(filePath);
            if (err.code == 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Server Error');
            }
        } else {
            const contentType = mime.contentType(path.extname(filePath)) || 'text/plain';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    })
});
// Listen on port 3000
server.listen(3000);
// Log a message to the console to indicate that the server is running
console.log('Server running at http://localhost:3000/');