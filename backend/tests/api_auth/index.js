const express = require('express');
const queryModule = require('./db_query_module');
const prepStatementModule = require("./db_prepared_statement_module");
const app = express();
const port = 3000;

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const {expressjwt} = require("express-jwt");
const JWTSecret = 'super_secret'
app.use(express.json());

//All routes but '/login' are protected
app.use(expressjwt({ secret: JWTSecret, algorithms: ['HS256'] }).unless({ path: ['/login'] }));

//Middleware that handles the roles
const checkRole = (roles) => (req, res, next) => {
    const {userId:currentUserId, userRole:currentUserRole} = req.auth;
    // const userRoles = req.user.roles;
    //const hasRole = userRoles.some(role => roles.includes(role));
    const hasRole = roles.includes(currentUserRole);
    if (!hasRole) {
        return res.status(403).send('Access forbidden');
    }
    next();
};

app.post('/user', checkRole(['ADMIN']), async(req, res) => {
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
});

app.post('/login', async (req, res) => {
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
        const token = jwt.sign({ userId: user.id, userRole: user.role }, JWTSecret, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch {
        res.status(500).send('Something happened...');
    }
});

app.get('/grade', checkRole(['ADMIN', 'USER']),async (req,res) => {
    const {userId:currentUserId, userRole:currentUserRole} = req.auth;
    console.log('logged in as',currentUserId, currentUserRole);

    const selectAll = "SELECT * FROM hackaton.rank";
    try {
        const result = await queryModule.executeQuery(selectAll);
        res.status(200).json(result);
    } catch(err) {
        console.log(err)
        res.status(500).send('Something happened...');
    }
});

// Handles JWT error
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Forbidden access');
    } else {
        next(err);
    }
});

app.listen(port, ()=> {
    console.log('API_AUTH, listening server @',port);
});