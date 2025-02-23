const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/product.route.js");
const supplierRoute = require("./routes/supplier.route.js");
const customerRoute = require("./routes/customer.route.js"); // Import customer routes

const app = express();
const PORT = 3000;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/products", productRoute);
app.use("/api/suppliers", supplierRoute);
app.use("/api/customers", customerRoute); // Register customer routes

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://soumyojyotisaha2021:Soumyo%402001@cluster0.7g7yo.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
