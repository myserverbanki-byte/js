const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    console.log(req.url);
    const body = req.url === '/style.css'
        ? fs.readFileSync('./style.html')
        : fs.readFileSync('./index.html');

    res.end(body);
}

);
server.listen(3002)
console.log('Server Started');