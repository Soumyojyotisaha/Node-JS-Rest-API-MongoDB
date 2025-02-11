const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  bulkInsertProducts,
  countProducts,
  reduceStock,
  bulkDeleteProducts,
} = require("../controllers/product.controller.js");

// Search route should be placed first to avoid conflicts
router.get("/search", searchProducts);

// Product CRUD operations
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// Additional features
router.post("/bulk", bulkInsertProducts);
router.get("/product-count", countProducts); // Updated route name to avoid conflicts
router.patch("/:id/reduce-stock", reduceStock);

// Bulk delete route
router.post("/bulk-delete", bulkDeleteProducts);

module.exports = router;
