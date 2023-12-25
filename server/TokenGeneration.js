const Jwt = require("jsonwebtoken");

const path = require("path");

const dotenvAbsolutePath = path.join(__dirname, '.env');

const dotenv = require('dotenv').config({ path: dotenvAbsolutePath});

const generatetoken = (user) => {
    const data = {username: user.username};
    return Jwt.sign(data, process.env.JWT_SECRATE_KEY, {expiresIn: '1h'});
}

module.exports = generatetoken;