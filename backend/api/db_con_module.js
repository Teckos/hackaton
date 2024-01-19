const mysql = require('mysql2/promise');
exports.myCon = async ()=>{

    const con = await mysql.createConnection({
        host: "db",
        user: "user",
        password: "secret-p",
        database: "hackaton",
        port: 3306
    });
    return con;
};
