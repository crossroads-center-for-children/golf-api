const mongoose = require("mongoose");

const { sendRegistrationEmail } = require("../services/email");

mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: String,
  golfers: [{ type: Schema.Types.ObjectId, ref: "Golfer" }],
  order: { type: Schema.Types.ObjectId, ref: "Order" },
});

TeamSchema.methods.sendRegistrationEmail = function ({ golfers, orderNumber }) {
  const team = this;

  sendRegistrationEmail({
    teamName: team.name,
    orderNumber,
    numGolfers: golfers.length,
    primary: golfers.shift(),
    otherGolfers: golfers,
  });
};

module.exports = mongoose.model("Team", TeamSchema);
