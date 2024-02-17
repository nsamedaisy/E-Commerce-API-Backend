const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
// Implement your routes here

app.get("/api", (req, res) => {
  res.json({ message: "Am too busy to be bae!" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
