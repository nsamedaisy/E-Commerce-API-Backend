const Order = require("../models/order");
const router = require("express").Router();

// Handler function to handle successful response
const respHandler = (res, order) => {
  console.log(order);
  return res.json({ status: "ok", order });
};

// Handler function to handle errors
const errorHandler = (res, err) => {
  console.log("An error occurred: " + err);
  return res.status(500).json({ status: "An error occurred: " + err });
};

// Create a new order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    respHandler(res, savedOrder);
  } catch (err) {
    errorHandler(res, err);
  }
});

// Delete an order by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndRemove(req.params.id);
    respHandler(res, deletedOrder);
  } catch (err) {
    errorHandler(res, err);
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    respHandler(res, orders);
  } catch (err) {
    errorHandler(res, err);
  }
});

// Get an order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    respHandler(res, order);
  } catch (err) {
    errorHandler(res, err);
  }
});

// Update an order by ID
router.post("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    respHandler(res, updatedOrder);
  } catch (err) {
    errorHandler(res, err);
  }
});

module.exports = router;
