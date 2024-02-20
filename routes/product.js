const express = require("express");
const router = express.Router();

// Mock data
const products = [
  { id: 1, name: "Product 1", category: "Category 1", price: 10 },
  { id: 2, name: "Product 2", category: "Category 2", price: 20 },
  { id: 3, name: "Product 3", category: "Category 1", price: 30 },
];

// Get all products
router.get("/", (req, res) => {
  res.json(products);
});

// Get a single product by ID
router.get("/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

// Create a new product
router.post("/", (req, res) => {
  const { name, category, price } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    category,
    price,
  };

  products.push(newProduct);
  res.status(201).json({ message: "Product created successfully" });
});

// Update a product
router.put("/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, category, price } = req.body;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  product.name = name || product.name;
  product.category = category || product.category;
  product.price = price || product.price;

  res.json({ message: "Product updated successfully" });
});

// Delete a product
router.delete("/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  products.splice(productIndex, 1);
  res.json({ message: "Product deleted successfully" });
});

module.exports = router;

// // MySQL connection
// const mysql = require("mysql");
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "ecommerce_products",
//   port: 3307,
// });
// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL database:", err);
//     return;
//   }
//   console.log("Connected to MySQL database");
// });

// // Get all products
// router.get("/", (req, res) => {
//   const sql = "SELECT * FROM products";

//   connection.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error retrieving products from MySQL:", err);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//     res.json(results);
//   });
// });

// // Get a single product by ID
// router.get("/:id", (req, res) => {
//   const productId = req.params.id;
//   const sql = "SELECT * FROM products WHERE id = ?";

//   connection.query(sql, [productId], (err, results) => {
//     if (err) {
//       console.error("Error retrieving product from MySQL:", err);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//     if (results.length === 0) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     res.json(results[0]);
//   });
// });

// // Create a new product
// router.post("/", (req, res) => {
//   const { name, category, price } = req.body;
//   const sql = "INSERT INTO products (name, category, price) VALUES (?, ?, ?)";

//   connection.query(sql, [name, category, price], (err, results) => {
//     if (err) {
//       console.error("Error creating product in MySQL:", err);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//     res.status(201).json({ message: "Product created successfully" });
//   });
// });

// // Update a product
// router.put("/:id", (req, res) => {
//   const productId = req.params.id;
//   const { name, category, price } = req.body;
//   const sql =
//     "UPDATE products SET name = ?, category = ?, price = ? WHERE id = ?";

//   connection.query(sql, [name, category, price, productId], (err, results) => {
//     if (err) {
//       console.error("Error updating product in MySQL:", err);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//     if (results.affectedRows === 0) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     res.json({ message: "Product updated successfully" });
//   });
// });

// // Delete a product
// router.delete("/:id", (req, res) => {
//   const productId = req.params.id;
//   const sql = "DELETE FROM products WHERE id = ?";

//   connection.query(sql, [productId], (err, results) => {
//     if (err) {
//       console.error("Error deleting product from MySQL:", err);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//     if (results.affectedRows === 0) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     res.json({ message: "Product deleted successfully" });
//   });
// });

// module.exports = router;
