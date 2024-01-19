const db = require('./db_con_module');
// const selectAll = "SELECT * FROM test";
// const selectById = (id)=>{return "SELECT * FROM test WHERE id ="+id};
const testQuery = async (query) => {
    try {
        const con = await db.myCon();
        await con.connect();
        const [result] = await con.query(query);
        console.log("Result: ", result);
        return result;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
};
exports.testQuery = testQuery();
// testQuery(selectAll);
// testQuery(selectById(2));


