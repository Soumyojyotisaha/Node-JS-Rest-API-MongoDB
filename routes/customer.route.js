const express = require("express");
const { registerCustomer, loginCustomer } = require("../controllers/customer.controller.js");

const router = express.Router();

// Route for customer registration
router.post("/register", registerCustomer);

// Route for customer login
router.post("/login", loginCustomer);

module.exports = router;
