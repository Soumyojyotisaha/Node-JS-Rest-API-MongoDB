const express = require("express");
const router = express.Router();
const { loginSupplier } = require("../controllers/supplier.controller.js");

router.post("/login", loginSupplier);

module.exports = router;
