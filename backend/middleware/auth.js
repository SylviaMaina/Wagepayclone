// middleware/auth.js

const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_jwt_secret"; // Replace with a strong, randomly generated secret

function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h", // Token expires in 1 hour
  });
}

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded; // Set decoded user object on request
    next();
  });
}

module.exports = {
  generateToken,
  verifyToken,
};
