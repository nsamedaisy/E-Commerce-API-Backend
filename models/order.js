const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({});

const Order = mongoose.model("Order", orderSchema);

exports.Order = Order;
