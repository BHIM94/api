const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function Auth(req, res, next) {
  const token = req.header("x-jwt-token");
  if (!token) return res.status(401).send("Access Denied. No Token Provided");
  try {
    const decodedPayload = jwt.verify(
      token,
      config.get("System.Api_Secret_Key")
    );
    req.user = decodedPayload;
    next();
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
};
