"use strict";

const express = require("express");
const createError = require("http-errors");
const productRoutes = require("./routes/product");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

//Routes
app.use("/api/products", productRoutes);

// Error handling middleware
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;

// ("use strict");

// const express = require("express");
// const createError = require("http-errors");
// const productRoutes = require("./routes/product");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const mysql = require("mysql");

// require("dotenv").config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MySQL connection
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// connection.connect((error) => {
//   if (error) {
//     console.error("Error connecting to MySQL:", error);
//   } else {
//     console.log("Connected to MySQL");
//   }
// });

// // Routes
// app.use("/api/products", productRoutes);

// // Error handling middleware
// app.use((req, res, next) => {
//   next(createError(404));
// });

// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.send(err.message);
// });

// module.exports = app;
