const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productRoute);

// // Get all products
// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get single product by ID
// app.get("/api/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Create a new product
// app.post("/api/products", async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Update product
// app.put("/api/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!updatedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Delete product permanently
// app.delete("/api/products/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const product = await Product.findByIdAndDelete(id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.status(200).json({ message: "Product deleted successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Search and filter products
// app.get("/api/products/search", async (req, res) => {
//   try {
//     const { name, minPrice, maxPrice } = req.query;
//     let filter = {};

//     if (name) {
//       filter.name = { $regex: name, $options: "i" }; // Case-insensitive search
//     }

//     if (minPrice && maxPrice) {
//       filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
//     } else if (minPrice) {
//       filter.price = { $gte: parseFloat(minPrice) };
//     } else if (maxPrice) {
//       filter.price = { $lte: parseFloat(maxPrice) };
//     }

//     const products = await Product.find(filter);
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Insert multiple products at once
// app.post("/api/products/bulk", async (req, res) => {
//   try {
//     const products = await Product.insertMany(req.body);
//     res.status(201).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Pagination for products
// app.get("/api/products/page", async (req, res) => {
//   try {
//     const { page = 1, limit = 10 } = req.query;
//     const products = await Product.find({})
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit));
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get the total count of products
// app.get("/api/products/count", async (req, res) => {
//   try {
//     const count = await Product.countDocuments();
//     res.status(200).json({ totalProducts: count });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Sort products by price, quantity, or name
// app.get("/api/products/sort", async (req, res) => {
//   try {
//     const { field = "price", order = "asc" } = req.query;
//     const sortOrder = order === "asc" ? 1 : -1;

//     const products = await Product.find({}).sort({ [field]: sortOrder });
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Soft delete a product (mark inactive instead of deleting)
// app.patch("/api/products/:id/deactivate", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedProduct = await Product.findByIdAndUpdate(
//       id,
//       { isActive: false },
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Reduce stock after a purchase
// app.patch("/api/products/:id/reduce-stock", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { quantity } = req.body;

//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     if (product.quantity < quantity) {
//       return res.status(400).json({ message: "Not enough stock available" });
//     }

//     product.quantity -= quantity;
//     await product.save();
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Restore a soft deleted product
// app.patch("/api/products/:id/restore", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedProduct = await Product.findByIdAndUpdate(
//       id,
//       { isActive: true },
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get only active products
// app.get("/api/products/active", async (req, res) => {
//   try {
//     const products = await Product.find({ isActive: true });
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

mongoose
  .connect(
    " ",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
