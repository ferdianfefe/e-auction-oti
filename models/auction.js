"use strict";

const mongoose = require("mongoose");
const ImageSchema = new mongoose.Schema({
  name: String,
  path: String,
});

const AuctionSchema = new mongoose.Schema({
  title: String,
  itemName: String,
  description: String,
  images: [ImageSchema],
  startingPrice: Number,
  currentPrice: Number,
  startDate: Date,
  endDate: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Auction", AuctionSchema);
