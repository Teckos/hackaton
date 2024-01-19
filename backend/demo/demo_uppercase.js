const http = require('http');

const server = http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    import('upper-case')
        .then(uc => {
            res.write(uc.upperCase("Hello World!"));
        })
        .catch(
            res.write('Pas trouvé uc')
        )
    res.end();
});
server.listen(3000);