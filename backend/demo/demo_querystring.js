const http = require ('http');
const url = require('url');

http.createServer(function (req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    let q = url.parse(req.url, true);
    let txt = q.query.year + " " + q.query.month;
    console.log(q.pathname);
    console.log(q.search);

    res.end(txt);
}).listen(3000)