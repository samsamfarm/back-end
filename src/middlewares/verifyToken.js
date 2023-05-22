const jwt = require("jsonwebtoken");
const { Unauthorized } = require("../errors");

const verifyToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new Unauthorized({ token: "invalid_credentials" });
    }

    const [bearer, token] = authorization.split(" ");
    const bearerSet = new Set(["Bearer", "bearer", "BEARER"]);
    if (!bearerSet.has(bearer)) {
      throw new Unauthorized({ token: "invalid_credentials" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new Unauthorized({ token: "expired" });
    }

    throw new Unauthorized({ token: "invalid_credentials" });
  }
};

module.exports = verifyToken;
