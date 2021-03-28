const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: String,
  golfers: [{ type: Schema.Types.ObjectId, ref: "Golfer" }],
  order: { type: Schema.Types.ObjectId, ref: "Order" },
});

module.exports = mongoose.model("Team", TeamSchema);
