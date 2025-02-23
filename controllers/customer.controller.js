const Customer = require("../models/customer.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = "your_static_secret_key"; // Fixed secret key

// Register Customer
const registerCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the customer already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new customer
    const newCustomer = new Customer({ name, email, password: hashedPassword });
    await newCustomer.save();

    res.status(201).json({ message: "Customer registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Customer Login
const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if customer exists
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: customer._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      message: "Login successful",
      token,
      customer: { id: customer._id, name: customer.name, email: customer.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerCustomer, loginCustomer };
