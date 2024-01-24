const mysql = require('mysql2/promise');
exports.myCon = async ()=>{

    const con = await mysql.createConnection({
        // host: "db",
        // user: "user",
        // password: "secret-pw",
        // database: "hackaton",
        host: "mysql-hackathon.alt-tools.tech",
        port: 3306,
        user: "niji",
        password: "d@[KL8zs7FlsgA6m",
    });
    return con;
};
