const http = require('http');
const fs = require('fs');

///Request Templaye
/* else if (req.url === '/') {
    fs.readFile('src/index.html', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal server error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
} */


var server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        var body = '';

        req.on('end', function() {
            if (req.url === '/') {
                console.log('Recieved message: ' + body);
            } else if (req.url == '/scheduled') {
                console.log('Recieved task ' + req.headers['x-aws-sqsd-taskname'] + ' scheduled at ' + req.headers['x-aws-sqsd-scheduled-at']);
            }
            res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
        })
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
    } else if (req.url === '/Data.html') {
        fs.readFile('src/Data.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal server error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/src/style.css') {
        fs.readFile('src/style.css', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal server error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    } else if (req.url === '/src/script.js') {
        fs.readFile('src/script.js', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal server error');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(data);
            }
        });
    } else if (req.url === '/src/database.json') {
        fs.readFile('src/database.json', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal server error');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/javascript' });
                res.end(data);
            }
        });
    } else if (req.url === '/Assets/WildlifeSurveys.png') {
        fs.readFile('Assets/WildlifeSurveys.png', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal server error');
            } else {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(data);
            }
        });
    } else if (req.url === '/Assets/Emissions.png') {
        fs.readFile('Assets/Emissions.png', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal server error');
            } else {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(data);
            }
        });
    } else if (req.url === '/Assets/GeophysicalSurveys.png') {
        fs.readFile('Assets/GeophysicalSurveys.png', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal server error');
            } else {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(data);
            }
        });
    } else if (req.url === '/Assets/ConstructionMonitoring.png') {
        fs.readFile('Assets/ConstructionMonitoring.png', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal server error');
            } else {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(data);
            }
        });
    } else if (req.url === '/Assets/WindFarm.jpg') {
        fs.readFile('Assets/WindFarm.jpg', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal server error');
            } else {
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(data);
            }
        });
    }
    else {
        console.log(req.url + ' not found');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Not found');
    } 
});

server.listen(3000);

console.log('Server running at http://localhost:3000/');