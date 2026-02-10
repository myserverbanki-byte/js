const http = require('http');
const server = http.createServer((req, res) => {
    console.log('Hello World');
    res.end('Hello World');
}

);
server.listen(3001)
console.log('Server Started');