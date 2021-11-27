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

async function updateAuction(req, res) {
  const { id } = req.params;
  const { title, itemName, images, startingPrice, currentPrice } = req.body;

  const auction = await Auction.findById(id);

  if (!auction) {
    return res.status(404).json({
      success: false,
      message: "Auction not found",
    });
  }

  auction.title = title;
  auction.itemName = itemName;
  auction.images = images.map((image) => {
    return {
      name: image.name,
      path: image.path,
    };
  });
  auction.startingPrice = startingPrice;
  auction.currentPrice = currentPrice;

  await auction.save();

  return res.status(200).json({
    success: true,
    message: "Auction updated successfully",
  });
}

async function deleteAuction(req, res) {
  const { id } = req.params;

  const auction = await Auction.findById(id);

  if (!auction) {
    return res.status(404).json({
      success: false,
      message: "Auction not found",
    });
  }

  await auction.remove();

  return res.status(200).json({
    success: true,
    message: "Auction deleted successfully",
  });
}

async function bid(req, res) {
  const { id } = req.params;
  const { bid } = req.body;

  const auction = await Auction.findById(id);

  if (!auction) {
    return res.status(404).json({
      success: false,
      message: "Auction not found",
    });
  }

  if (auction.currentPrice >= bid) {
    return res.status(400).json({
      success: false,
      message: "Bid must be greater than current price",
    });
  }

  auction.currentPrice = bid;

  await auction.save();

  return res.status(200).json({
    success: true,
    message: "Bid added successfully",
  });
}

module.exports = {
  createAuction,
  getAllAuctions,
  getAuctionById,
  updateAuction,
  deleteAuction,
};

module.exports = {
  createAuction,
  getAllAuctions,
  getAuctionById,
};
