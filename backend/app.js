const express = require('express');
const userRoutes = require('./routes/userRoutes');
const rankRoutes = require('./routes/rankRoutes');
const userController = require('./controllers/userController');
const {expressjwt} = require("express-jwt");
const {jwtSecret} = require("./config/authConfig");

const app = express();
const port = 3000;

app.use(express.json());
//All routes but '/login' are protected
app.use(expressjwt({ secret: jwtSecret, algorithms: ['HS256'] }).unless({ path: ['/login'] }));

app.post('/login', userController.login);
app.use('/user', userRoutes);
app.use('/rank', rankRoutes);

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