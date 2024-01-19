const db = require('./db_con_module');
const executeQuery = async (sqlQuery, values) => {
    const con = await db.myCon();
    try {
        await con.connect();
        const [rows, fields] = await con.execute(sqlQuery, values);
        console.log("Result: ", rows);
        return rows;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    } finally {
        if (con) await con.end();
    }
};
exports.executeQuery = executeQuery;

