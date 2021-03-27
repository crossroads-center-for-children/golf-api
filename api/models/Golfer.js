const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const GolferSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
});

module.exports = mongoose.model("Golfer", GolferSchema);
