const db = require('./db_con_module');
const executeQuery = async (sqlQuery) => {
    try {
        const con = await db.myCon();
        await con.connect();
        const [result] = await con.query(sqlQuery);
        console.log("Result: ", result);
        return result;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
    // finally {
    //     if (con) await con.end();
    // }
};
exports.executeQuery = executeQuery;

