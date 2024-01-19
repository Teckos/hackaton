import uc from "upper-case";
const http = require('http');

const server = http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(uc.upperCase("Hello World!"));
    res.end();
});
server.listen(3000);