const https = require('https');

console.log(`start`);
async function index() {
    try{
        const response = await https.get('https://nodejs.org/dist/index.json');

        console.log(res.statusCode);
    } catch( error ){
        console.log(error);
    }
}

index();
console.log(`end`);