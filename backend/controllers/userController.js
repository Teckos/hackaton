const bcrypt = require('bcrypt');
const prepStatementModule = require("../db/dbPrepStatement");
const jwt = require('jsonwebtoken');
const { jwtSecret, saltRounds } = require('../config/authConfig');

exports.login = async (req, res) => {
    //Verify that req.body contains the proper keys and its values are of the proper type.
    const { username, password } = req.body;
    if (typeof username !== 'string' || typeof password !== 'string') {
        return res.status(400).send('Wrong request body format');
    }
    //Proceed with checked body
    //Verify if the user exists
    const userArray = await prepStatementModule.executeQuery('SELECT * FROM user WHERE username = ?', [username]);
    const user = userArray[0];
    if (!user) {
        return res.status(401).send('Identifiants incorrects');
    }
    //If the user exists we check the hashed passwords
    try {
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send('Identifiants incorrects');
        }
        //A JWT token is created and sent in the response
        const token = jwt.sign({ userId: user.id, userRole: user.role }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch {
        res.status(500).send('Something happened...');
    }
};

exports.createUser = async (req, res) => {
    //Prep Statement query
    const insertQuery = "INSERT INTO user (username, password) VALUES (?, ?)";

    //Verify that req.body contains the proper keys and its values are of the proper type.
    const { username, password } = req.body;
    if (typeof username !== 'string' || typeof password !== 'string') {
        return res.status(400).send('Wrong request body format');
    }
    //Proceed with checked body
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const values = [username, hashedPassword];
        const result = await prepStatementModule.executeQuery(insertQuery, values);
        res.status(200).json(result);
    } catch(err) {
        console.log(err)
        res.status(500).send('Something happened...');
    }
};