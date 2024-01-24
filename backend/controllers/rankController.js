const queryModule = require('../db/dbQuery');
const databaseName = process.env.DB_NAME

exports.getRanks = async (req, res) => {
    const {userId:currentUserId, userRole:currentUserRole} = req.auth;
    console.log('logged in as',currentUserId, currentUserRole);

    const selectAll = `SELECT * FROM ${databaseName}.rank`;
    try {
        const result = await queryModule.executeQuery(selectAll);
        res.status(200).json(result);
    } catch(err) {
        console.log(err)
        res.status(500).send('Something happened...');
    }
};