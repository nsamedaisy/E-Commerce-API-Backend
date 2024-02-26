const Order = require("../models/order");
const router = require("express").Router();

//handler function
const respHandler = (res, order) => {
  console.log(order);
  return res.json({ status: "ok", book });
};

const errorHandler = (res, err) => {
  console.log("An error occured" + err);
  return res.json({ status: "An error occured" + err }).status(500);
};

//create order
router.post("/", async (req, res) => {
  order
    .save()
    .then((resp) => respHandler(res, resp))
    .catch((err) => errorHandler(res, err));
});

//delete an order
router.delete("/:id", function (req, res) {});

//get all order
router.get("/", function (req, res) {});

//get order
router.get("/:id", function (req, res) {});

//update
router.post("/:id", async function (req, res) {});
