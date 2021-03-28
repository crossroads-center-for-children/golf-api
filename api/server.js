const asyncHandler = require("express-async-handler");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Golfer, Secret, Team, Order } = require("./models");

const db = process.env.MONGODB_URI;

const app = express();

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas.");
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully."))
  .catch((err) => console.log(err));

app.use(express.json());

app.use(cors());

app.post(
  "/golfers",
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email } = req.body;

    const golfer = await Golfer.create({ firstName, lastName, email });

    res.json({ golfer });
  })
);

app.post(
  "/teams",
  asyncHandler(async (req, res) => {
    const { teamName, golfers, order } = req.body;

    const team = await Team.create({ name: teamName, golfers, order });

    res.json({ team });
  })
);

app.get(
  "/secrets/:slug",
  asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const secret = await Secret.findOne({ slug });

    res.json({ secret });
  })
);

app.post(
  "/secrets",
  asyncHandler(async (req, res) => {
    const { slug, secret } = req.body;
    await Secret.create({ slug, secret });
    res.json(200);
  })
);

app.post(
  "/orders",
  asyncHandler(async (req, res) => {
    const { number } = req.body;
    const order = await Order.create({ number });
    res.json({ order });
  })
);

module.exports = app;
