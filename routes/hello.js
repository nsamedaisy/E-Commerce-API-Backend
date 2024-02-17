"use strict";
const { Router } = require("express");
const router = Router();

const hello = `<html>
<head>
<style>
body { background: #333; margin: 1.25rem }
a { color: yellow; font-size: 2rem; font-family: sans-serif }
</style>
</head>
<body>
<a href = '/hello'>Hello hello</a>
</body>
</html>`;
router.get("/", (req, res) => {
  res.send(hello);
});

module.exports = router;
