const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  number: String,
});

module.exports = mongoose.model("Order", OrderSchema);
