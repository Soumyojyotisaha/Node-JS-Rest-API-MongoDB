const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  bulkInsertProducts,
  reduceStock,
} = require("../controllers/product.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js"); // Import auth middleware

const router = express.Router();

router.get("/search", searchProducts);
router.get("/", getProducts);
router.get("/:id", getProduct);

// Protected Routes (Only Suppliers Can Modify Data)
router.post("/", authMiddleware, createProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);
router.post("/bulk-insert", authMiddleware, bulkInsertProducts); // Protected: Bulk insert
router.put("/reduce-stock/:id", authMiddleware, reduceStock); // Protected: Reduce stock

module.exports = router;
