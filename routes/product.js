const { Product } = require("../models/products");
// const { isUser } = require("../middleware/auth");
const cloudinary = require("../utils/cloudinary");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const { name, brand, desc, price, image } = req.body;

  try {
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "online-shop",
      });

      if (uploadedResponse) {
        const product = new Product({
          name,
          brand,
          desc,
          price,
          image: uploadedResponse,
        });

        const savedProduct = await product.save();
        res.status(200).send(savedProduct);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//DELETE

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("Product has been deleted...");
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET ALL PRODUCTS

router.get("/", async (req, res) => {
  const qbrand = req.query.brand;
  try {
    let products;

    if (qbrand) {
      products = await Product.find({
        brand: qbrand,
      });
    } else {
      products = await Product.find();
    }

    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET PRODUCT

router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

//UPDATE

router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(500).send(error);
  }
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
