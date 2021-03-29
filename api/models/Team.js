const mongoose = require("mongoose");

const { sendRegistrationEmail } = require("../services/email");

mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: String,
  golfers: [{ type: Schema.Types.ObjectId, ref: "Golfer" }],
  order: { type: Schema.Types.ObjectId, ref: "Order" },
});

TeamSchema.methods.sendRegistrationEmail = function ({
  teamName,
  golfers,
  orderNumber,
}) {
  const numGolfers = golfers.length;
  const primary = golfers[0];
  const otherGolfers = golfers.slice(1);

  sendRegistrationEmail({
    teamName,
    orderNumber,
    numGolfers,
    primary,
    otherGolfers,
  });
};

module.exports = mongoose.model("Team", TeamSchema);
