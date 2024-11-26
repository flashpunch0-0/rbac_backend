const jwt = require("jsonwebtoken");
const { permissions } = require("../models/role");

function authorize(roles) {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "No token provided" });
      const decrypted = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decrypted;
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied" });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}

module.exports = { authorize };
