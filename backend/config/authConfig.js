require('dotenv').config();

module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    saltRounds: process.env.SALT_ROUNDS
};