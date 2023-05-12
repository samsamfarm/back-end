const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors');

module.exports = VerifyToken = (req, res, next) => {
    try {
        const [bearer, token] = req.headers?.authorization?.split(' ');

        req.decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        return next();

    } catch(err) {
        if(err?.name == 'TokenExpiredError') {
            throw new Unauthorized("Expired Token");
        }

        throw new Unauthorized("Not Verified Token");
    }
}