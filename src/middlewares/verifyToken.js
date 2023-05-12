const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors');
require('dotenv').config();

module.exports = VerifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split('Bearer ')[1];

        req.decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        return next();

    }
    catch(error) {
        if(error.name == 'TokenExpiredError') {
            throw new Unauthorized("Expired Token");
        }
        else {
            throw new Unauthorized("Not Verified Token");
        }
    }
}