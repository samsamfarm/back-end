const jwt = require("jsonwebtoken");
const { Unauthorized } = require("../errors");

module.exports = verifyToken = (req, res, next) => {
  try {
    const [bearer, token] = req.headers?.authorization?.split(" ");
    if (bearer !== "Bearer") {
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
