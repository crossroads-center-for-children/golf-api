const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const SecretSchema = new Schema({
  slug: String,
  secret: String,
});

module.exports = mongoose.model("Secret", SecretSchema);
