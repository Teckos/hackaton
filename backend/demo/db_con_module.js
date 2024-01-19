const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "db",
    user: "user",
    password: "secret-pw",
    database: "hackaton",
    port: 3306
});

con.connect((err)=>{
    if (err) throw err;
    console.log('Connected!');
});