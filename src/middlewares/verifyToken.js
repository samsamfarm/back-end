const jwt = require("jsonwebtoken");
const { Unauthorized } = require("../errors");

module.exports = verifyToken = (req, res, next) => {
  try {
    const headers = req.headers; 
    const authorization = headers?.authorization || headers?.Authorization || headers.AUTHORIZATION;
    if (authorization == null) {
      throw new Unauthorized({ token: "invalid_credentials" });
    }

    const [bearer, token] = authorization?.split(" ");

    const bearerList = ['Bearer', 'bearer', 'BEARER'];
    if (bearerList.include(bearer) === false) {
      throw new Unauthorized({ token: "invalid_credentials" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    if (err?.name == "TokenExpiredError") {
      throw new Unauthorized({ token: "expired" });
    }

    throw new Unauthorized({ token: "invalid_credentials" });
  }
};
