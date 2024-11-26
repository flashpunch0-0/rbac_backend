const jwt = require("jsonwebtoken");

function authorize(roles) {
  return (req, res, next) => {
    try {
      const token = req.header("Authorization")?.split(" ")[1];

      if (!token) return res.status(401).json({ message: "No token provided" });
      const decrypted = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decrypted;

      if (!roles.includes(decrypted.role)) {
        return res.status(403).json({ message: "Access denied" });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}

module.exports = { authorize };
