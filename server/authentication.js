
const Jwt = require("jsonwebtoken");

const path = require("path");

const dotenvAbsolutePath = path.join(__dirname, '.env');

const dotenv = require('dotenv').config({ path: dotenvAbsolutePath});

const validateToken = (req, res, next)=>{

    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(' ')[1];

        Jwt.verify(token, process.env.JWT_SECRATE_KEY, (err, user) => {
            if(err){
               return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
    else{
        res.sendStatus(401);
    }


};

module.exports = validateToken;