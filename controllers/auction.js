"use strict";
const Auction = require("../models/auction");

async function createAuction(req, res) {
  const { title, itemName, images, startingPrice, user } = req.body;
  const auction = new Auction({
    title,
    itemName,
    images: images.map((image) => {
      return {
        name: image.name,
        path: image.path,
      };
    }),
    startingPrice,
    currentPrice: startingPrice,
    user,
  });

  await auction.save();

  return res.status(200).json({
    success: true,
    message: "Auction created successfully",
  });
}

async function getAllAuctions(req, res) {
  const auctions = await Auction.find({});

  return res.status(200).json({
    success: true,
    value: {
      auctions,
    },
  });
}

async function getAuctionById(req, res) {
  const { id } = req.params;
  const auction = await Auction.findById(id);

  return res.status(200).json({
    success: true,
    value: {
      auction,
    },
  });
}

module.exports = {
  createAuction,
  getAllAuctions,
  getAuctionById,
};
