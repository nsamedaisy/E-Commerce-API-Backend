"use strict";

const express = require("express");
const createError = require("http-errors");
const indexRoutes = require("./routes");
const helloRoutes = require("./routes/hello");
// const cors = require("cors");
// const bodyParser = require("body-parser");

const app = express();
// const port = process.env.PORT || 3001;

app.use("/", indexRoutes);
app.use("/hello", helloRoutes);

app.use((req, res, next) => {
  if (req.method !== "GET") {
    next(createError(405));
    return;
  }
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

// Middleware
// app.use(cors());
// app.use(bodyParser.json());

// app.get("/api", (req, res) => {
//   res.json({ message: "Am too busy to be bae!" });
// });

// Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}.`);
// });

module.exports = app;
