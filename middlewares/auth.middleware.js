const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_static_secret_key"; // Use a fixed secret key

const authenticateSupplier = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token
  console.log("Extracted Token:", token); // Debugging

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify using fixed secret key
    console.log("Decoded Token:", decoded); // Debugging
    req.supplier = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error); // Debugging
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authenticateSupplier;
