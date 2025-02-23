const Supplier = require("../models/supplier.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Supplier Login
const loginSupplier = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if supplier exists
    const supplier = await Supplier.findOne({ email });
    if (!supplier) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, supplier.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const JWT_SECRET = "your_static_secret_key"; // Keep it consistent

    const token = jwt.sign({ id: supplier._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      supplier: { id: supplier._id, name: supplier.name, email: supplier.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginSupplier };
